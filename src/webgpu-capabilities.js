(function initAtlasWebGPUCapabilities(global) {
  "use strict";

  const state = global.__ATLAS_WEBGPU_SESSION__ ||= {
    adapter: null,
    device: null,
    adapterPromise: null,
    devicePromise: null,
    initializedBy: null,
    apiObserved: false,
    attempts: []
  };
  let generation = 0, suspended = false, acquisition = null, needsValidation = false;
  let status = "uninitialized", previouslyReady = false, failure = null, lastLoss = null;
  const listeners = new Set();
  const retryDelays = [0, 250, 750, 1500];
  const cancelled = () => capabilityError("acquisition-cancelled", "WebGPU preparation was cancelled.");
  function publish(value) { status = value; listeners.forEach(listener => listener(snapshot())); }
  function cancelPending({retryTransient = false} = {}) {
    generation++;
    if(retryTransient && failure && !["api-unavailable","renderer-capability-unavailable"].includes(failure.atlasWebGPUCategory))failure=null;
    acquisition?.abort();
    acquisition = null;
    state.devicePromise = null;
    state.adapterPromise = null;
    if (!state.device) { state.adapter = null; publish(failure ? "failed" : previouslyReady ? "stale" : "uninitialized"); }
  }
  // Native adapter/device promises cannot be aborted. Bound our wait and dispose
  // any late device, without letting it overwrite a newer acquisition.
  function bounded(operation, signal, discard = () => {}, timeout = 4000) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (fn, value) => { if(settled)return;settled=true;clearTimeout(timer);signal.removeEventListener("abort", abort);fn(value); };
      const abort = () => finish(reject, cancelled());
      const timer = setTimeout(() => finish(reject, capabilityError("acquisition-timeout", "WebGPU acquisition timed out.")), timeout);
      signal.addEventListener("abort", abort, { once: true });
      if(signal.aborted)abort();
      Promise.resolve(operation).then(value => settled ? discard(value) : finish(resolve,value), error => finish(reject,error));
    });
  }
  function waitForRetry(delay, signal) {
    return new Promise((resolve,reject)=>{
      const abort=()=>{clearTimeout(timer);signal.removeEventListener("abort",abort);reject(cancelled());};
      const timer=setTimeout(()=>{signal.removeEventListener("abort",abort);resolve();},delay);
      signal.addEventListener("abort",abort,{once:true});
      if(signal.aborted)abort();
    });
  }

  function capabilityError(category, message, cause) {
    const error = new Error(message, cause ? { cause } : undefined);
    error.atlasWebGPUCategory = category;
    return error;
  }

  function api() {
    const gpu = global.navigator?.gpu;
    if (!gpu) throw capabilityError("api-unavailable", "WebGPU API is not available in this browser.");
    state.apiObserved = true;
    return gpu;
  }

  async function requestAdapter(signal = new AbortController().signal) {
    if (state.adapter) return state.adapter;
    if (state.adapterPromise) return state.adapterPromise;
    const pending = (async () => {
      const gpu = api();
      const preferences = [{ powerPreference: "high-performance" }, undefined];
      for (const options of preferences) {
        try {
          state.attempts.push(options?.powerPreference || "default");
          const adapter = await bounded(gpu.requestAdapter(options), signal);
          if (adapter) {
            state.adapter = adapter;
            return adapter;
          }
        } catch (error) {
          if(signal.aborted)throw cancelled();
          state.attempts.push(`${options?.powerPreference || "default"}:failed`);
        }
      }
      throw capabilityError("adapter-unavailable", "WebGPU could not provide a compatible adapter.");
    })().finally(() => { if(state.adapterPromise===pending)state.adapterPromise = null; });
    state.adapterPromise=pending;
    return pending;
  }

  function validateRendererRequirements(target, requirements = {}, source = "renderer") {
    const requiredFeatures = [...(requirements.requiredFeatures || [])];
    const missingFeatures = requiredFeatures.filter((feature) => !target?.features?.has?.(feature));
    const unsupportedLimits = Object.entries(requirements.requiredLimits || {}).filter(([limit, requested]) => {
      const available = Number(target?.limits?.[limit]);
      return !Number.isFinite(available) || Number(requested) > available;
    });
    if (missingFeatures.length || unsupportedLimits.length) {
      const details = [
        missingFeatures.length ? `missing features: ${missingFeatures.join(", ")}` : "",
        unsupportedLimits.length ? `unsupported limits: ${unsupportedLimits.map(([name]) => name).join(", ")}` : ""
      ].filter(Boolean).join("; ");
      throw capabilityError("renderer-capability-unavailable", `${source} WebGPU requirements are unavailable (${details}).`);
    }
  }

  async function requestDevice(source = "unknown", requirements = {}) {
    if(suspended || global.document?.hidden)throw cancelled();
    if (state.device) {
      validateRendererRequirements(state.device, requirements, source);
      if(!needsValidation)return state.device;
    }
    if (state.devicePromise) {
      const shared = await state.devicePromise;
      validateRendererRequirements(shared, requirements, source);
      return shared;
    }
    if(failure)throw failure;
    const token = generation, controller = new AbortController();
    acquisition = controller;
    const pending = (async () => {
      if(state.device && needsValidation){
        const retained=state.device;
        publish("recovering");
        try {
          await bounded(retained.queue.onSubmittedWorkDone(),controller.signal);
          if(token!==generation)throw cancelled();
          if(state.device===retained){needsValidation=false;publish("ready");return retained;}
        } catch(error) {
          if(controller.signal.aborted || token!==generation)throw cancelled();
          forgetDevice(retained);retained.destroy();
        }
      }
      let lastError;
      for(const delay of retryDelays) {
        if(controller.signal.aborted || token!==generation)throw cancelled();
        publish(previouslyReady || delay ? "recovering" : "initializing");
        if(delay)await waitForRetry(delay,controller.signal);
        try {
          if(controller.signal.aborted || token!==generation)throw cancelled();
          const adapter = await requestAdapter(controller.signal);
          if(controller.signal.aborted || token!==generation)throw cancelled();
          validateRendererRequirements(adapter, requirements, source);
          try {
            const descriptor = {};
            if (requirements.requiredFeatures?.length) descriptor.requiredFeatures = requirements.requiredFeatures;
            if (Object.keys(requirements.requiredLimits || {}).length) descriptor.requiredLimits = requirements.requiredLimits;
            const device = await bounded(adapter.requestDevice(descriptor),controller.signal, late=>late?.destroy());
            if(token!==generation || controller.signal.aborted){device.destroy();throw cancelled();}
            registerDevice(device, adapter, source);
            return device;
          } catch (error) {
            if(controller.signal.aborted || token!==generation)throw cancelled();
            throw capabilityError("device-initialization-failed", `WebGPU adapter found, but device initialization failed: ${error?.message || error}`, error);
          }
        } catch(error) {
          if(controller.signal.aborted || token!==generation)throw cancelled();
          lastError=error;state.adapter=null;
          if(["api-unavailable","renderer-capability-unavailable"].includes(error.atlasWebGPUCategory))break;
        }
      }
      failure=lastError;publish("failed");throw lastError;
    })().finally(() => { if(state.devicePromise===pending){state.devicePromise=null;acquisition=null;} });
    state.devicePromise=pending;
    return pending;
  }

  function registerDevice(device, adapter = state.adapter, source = "unknown") {
    if (!device) throw capabilityError("device-initialization-failed", "Cannot register an empty WebGPU device.");
    state.device = device;
    state.adapter = adapter || state.adapter;
    state.initializedBy = source;
    state.apiObserved = true;
    previouslyReady = true;needsValidation=false;failure=null;publish("ready");
    device.lost?.then(info => {
      if(state.device!==device)return;
      lastLoss={reason:info?.reason,message:info?.message};
      forgetDevice(device);publish("lost");
    });
    return device;
  }

  function forgetDevice(device) {
    if (!device || state.device === device) {
      state.device = null;
      // Dawn adapters can be consumed after creating a device. Device-loss recovery
      // must acquire a fresh adapter as well, for either experimental renderer.
      state.adapter = null;
      state.initializedBy = null;
      needsValidation=false;
      publish(failure ? "failed" : previouslyReady ? "stale" : "uninitialized");
    }
  }

  function snapshot() {
    return {
      apiAvailable: Boolean(global.navigator?.gpu),
      apiObserved: state.apiObserved,
      adapterReady: Boolean(state.adapter),
      deviceReady: Boolean(state.device),
      initializedBy: state.initializedBy,
      status, previouslyReady, suspended, generation, needsValidation,
      failureCategory: failure?.atlasWebGPUCategory || null,
      lastLoss,
      attempts: [...state.attempts]
    };
  }

  async function releaseDevice(shouldRelease=()=>true) {
    // Experimental 2D renderers share this device. Finish acquisition before
    // relinquishing it so an in-flight request cannot repopulate the cache.
    if(state.devicePromise){try{await state.devicePromise;}catch{}}
    if(!shouldRelease())return;
    const device=state.device;
    forgetDevice();
    if(device){device.destroy();await device.lost;}
  }

  function suspend() {
    suspended=true;needsValidation=Boolean(state.device);
    // Owners must invalidate handoffs synchronously, before aborting the shared
    // promise can run a native lifecycle callback's microtask continuation.
    publish(status);
    cancelPending();
  }
  function resume() {
    suspended=false;
    // A retained healthy device is reused. Loss notification owns invalidation.
    // A new foreground visit may retry a previously exhausted transient failure.
    if(failure && !["api-unavailable","renderer-capability-unavailable"].includes(failure.atlasWebGPUCategory))failure=null;
    publish(state.device ? "ready" : failure ? "failed" : previouslyReady ? "stale" : "uninitialized");
  }
  global.addEventListener?.("pagehide",suspend);
  global.addEventListener?.("pageshow",resume);
  global.document?.addEventListener("visibilitychange",()=>global.document.hidden?suspend():resume());
  global.AtlasWebGPUCapabilities = { capabilityError, requestAdapter, requestDevice, registerDevice, forgetDevice, releaseDevice, snapshot, validateRendererRequirements, cancelPending, suspend, resume,
    subscribe: listener => {listeners.add(listener);return ()=>listeners.delete(listener);} };
})(window);
