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

  async function requestAdapter() {
    if (state.adapter) return state.adapter;
    if (state.adapterPromise) return state.adapterPromise;
    state.adapterPromise = (async () => {
      const gpu = api();
      const preferences = [{ powerPreference: "high-performance" }, undefined];
      for (const options of preferences) {
        try {
          state.attempts.push(options?.powerPreference || "default");
          const adapter = await gpu.requestAdapter(options);
          if (adapter) {
            state.adapter = adapter;
            return adapter;
          }
        } catch (error) {
          state.attempts.push(`${options?.powerPreference || "default"}:failed`);
        }
      }
      throw capabilityError("adapter-unavailable", "WebGPU could not provide a compatible adapter.");
    })().finally(() => { state.adapterPromise = null; });
    return state.adapterPromise;
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
    if (state.device) {
      validateRendererRequirements(state.device, requirements, source);
      return state.device;
    }
    if (state.devicePromise) return state.devicePromise;
    state.devicePromise = (async () => {
      const adapter = await requestAdapter();
      validateRendererRequirements(adapter, requirements, source);
      try {
        const descriptor = {};
        if (requirements.requiredFeatures?.length) descriptor.requiredFeatures = requirements.requiredFeatures;
        if (Object.keys(requirements.requiredLimits || {}).length) descriptor.requiredLimits = requirements.requiredLimits;
        const device = await adapter.requestDevice(descriptor);
        registerDevice(device, adapter, source);
        return device;
      } catch (error) {
        throw capabilityError("device-initialization-failed", `WebGPU adapter found, but device initialization failed: ${error?.message || error}`, error);
      }
    })().finally(() => { state.devicePromise = null; });
    return state.devicePromise;
  }

  function registerDevice(device, adapter = state.adapter, source = "unknown") {
    if (!device) throw capabilityError("device-initialization-failed", "Cannot register an empty WebGPU device.");
    state.device = device;
    state.adapter = adapter || state.adapter;
    state.initializedBy = source;
    state.apiObserved = true;
    return device;
  }

  function forgetDevice(device) {
    if (!device || state.device === device) {
      state.device = null;
      // Dawn adapters can be consumed after creating a device. Device-loss recovery
      // must acquire a fresh adapter as well, for either experimental renderer.
      state.adapter = null;
      state.initializedBy = null;
    }
  }

  function snapshot() {
    return {
      apiAvailable: Boolean(global.navigator?.gpu),
      apiObserved: state.apiObserved,
      adapterReady: Boolean(state.adapter),
      deviceReady: Boolean(state.device),
      initializedBy: state.initializedBy,
      attempts: [...state.attempts]
    };
  }

  global.AtlasWebGPUCapabilities = { capabilityError, requestAdapter, requestDevice, registerDevice, forgetDevice, snapshot, validateRendererRequirements };
})(window);
