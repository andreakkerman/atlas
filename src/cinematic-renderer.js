(function (global) {
  "use strict";
  const contract = global.AtlasCinematicSettings;
  const radians = value => value * Math.PI / 180;
  const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const clamp01 = value => Math.max(0, Math.min(1, value));
  function receiverMatchedAlpha(existingAlpha, receiverLuminance, matching = 1) {
    const alpha=clamp01(Number.isFinite(existingAlpha)?existingAlpha:0);
    const luma=clamp01(Number.isFinite(receiverLuminance)?receiverLuminance:0);
    const amount=clamp01(Number.isFinite(matching)?matching:0);
    const t=clamp01((luma-.02)/.16),allowance=t*t*(3-2*t);
    return alpha*((1-amount)+amount*allowance);
  }
  const groundingCache = new WeakMap();
  const percentile = (values, amount) => {
    if (!values.length) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor((sorted.length - 1) * amount)))];
  };
  function analyzeSpriteGrounding(source) {
    const width = source.naturalWidth || source.width, height = source.naturalHeight || source.height;
    const cacheKey=`${source.currentSrc||source.src||source.dataset?.assetPath||""}|${width}x${height}`;
    const cached = groundingCache.get(source);
    if (cached?.key===cacheKey) return cached.value;
    const invalid = { valid:false, center:0.5, split:0.5, left:{ center:0.35, bottom:1 }, right:{ center:0.65, bottom:1 } };
    if (!width || !height) return invalid;
    try {
      const canvas = document.createElement("canvas");canvas.width=width;canvas.height=height;
      const context=canvas.getContext("2d",{willReadFrequently:true});context.drawImage(source,0,0,width,height);
      const rgba=context.getImageData(0,0,width,height).data,alpha=(x,y)=>rgba[(y*width+x)*4+3];
      const threshold=48,lowerStart=Math.floor(height*.65),bottoms=new Int32Array(width);bottoms.fill(-1);
      for(let x=0;x<width;x++)for(let y=height-1;y>=lowerStart;y--){
        const value=alpha(x,y);if(value<threshold)continue;
        const horizontal=Math.max(alpha(Math.max(0,x-1),y),alpha(Math.min(width-1,x+1),y));
        const vertical=alpha(x,Math.max(0,y-1));
        if(horizontal>=threshold||vertical>=threshold){bottoms[x]=y;break;}
      }
      const sole=(from,to)=>{
        const first=Math.max(0,Math.floor(width*from)),last=Math.min(width,Math.ceil(width*to));
        const present=[];for(let x=first;x<last;x++)if(bottoms[x]>=0)present.push(bottoms[x]);
        if(!present.length)return null;
        const lower=percentile(present,.82),band=Math.max(2,Math.round(height*.035));
        const groups=[];let group=null,gap=0;
        for(let x=first;x<last;x++){
          const contact=bottoms[x]>=lower-band;
          if(contact){if(!group){group=[];groups.push(group);}group.push(x);gap=0;}
          else if(group&&gap++<1)group.push(x);else{group=null;gap=0;}
        }
        const usable=groups.filter(item=>item.filter(x=>bottoms[x]>=0).length>=Math.max(2,Math.round(width*.012)));
        const best=(usable.length?usable:groups).sort((a,b)=>b.filter(x=>bottoms[x]>=0).length-a.filter(x=>bottoms[x]>=0).length)[0];
        if(!best)return null;
        const columns=best.filter(x=>bottoms[x]>=0),contactBottom=percentile(columns.map(x=>bottoms[x]),.8);
        let weightedX=0,weight=0;for(const x of columns){const value=alpha(x,bottoms[x]);weightedX+=x*value;weight+=value;}
        return {center:(weight?weightedX/weight:columns.reduce((a,b)=>a+b,0)/columns.length)/(width-1),bottom:contactBottom/(height-1)};
      };
      let left=sole(.08,.52),right=sole(.48,.92);
      if(!left&&!right)return invalid;
      left ||= {center:Math.max(.2,right.center-.24),bottom:right.bottom};right ||= {center:Math.min(.8,left.center+.24),bottom:left.bottom};
      const result={valid:true,left,right,center:(left.center+right.center)*.5,split:(left.center+right.center)*.5};groundingCache.set(source,{key:cacheKey,value:result});return result;
    } catch { groundingCache.set(source,{key:cacheKey,value:invalid});return invalid; }
  }
  function displayedGrounding(value, mirrored) {
    if(!mirrored)return value;
    return {...value,center:1-value.center,split:1-value.split,left:{center:1-value.right.center,bottom:value.right.bottom},right:{center:1-value.left.center,bottom:value.left.bottom}};
  }
  const fieldWeight = (item, point) => {
    const angle = radians(item.direction || 0), dx = point.x-item.x, dy = point.y-item.y;
    const x = Math.cos(angle)*dx+Math.sin(angle)*dy, y = -Math.sin(angle)*dx+Math.cos(angle)*dy;
    const distance = Math.hypot(x/Math.max(1,(item.width || item.radius || 1)*0.5),y/Math.max(1,(item.height || item.radius || 1)*0.5));
    return Math.pow(clamp01(1-distance), item.falloff || 1);
  };
  function shadowTarget(settings, point) {
    let globalMagnitude=0,lx=0,ly=0,localMagnitude=0,mist=0;
    if(settings.godRays.enabled) for(const item of settings.godRays.items) if(item.enabled)globalMagnitude+=item.intensity;
    if(settings.areaLights.enabled) for(const item of settings.areaLights.items) if(item.enabled)globalMagnitude+=item.intensity;
    if(settings.localLights.enabled) for(const item of settings.localLights.items) if(item.enabled){const dx=point.x-item.x,dy=point.y-item.y,distance=Math.max(1,Math.hypot(dx,dy)),reach=clamp01(1-distance/Math.max(1,item.radius));if(reach>0){const weight=item.intensity*(item.characterInfluence ?? 1)*Math.pow(reach,item.falloff || 1);lx+=dx/distance*weight;ly+=dy/distance*weight;localMagnitude+=weight;}}
    if(settings.atmosphere.enabled) for(const item of settings.atmosphere.items) if(item.enabled) mist+=item.density*fieldWeight(item,point);
    const sourceX=settings.characters.shadowLightSourceX,sourceY=settings.characters.shadowLightSourceY,sourceDx=point.x-sourceX,sourceDy=point.y-sourceY;
    const sourceAngle=Math.atan2(sourceDy,sourceDx),baseAngle=sourceAngle+radians(settings.characters.shadowDirection),basisWeight=Math.max(0.15,settings.characters.shadowGlobalLightInfluence);
    const localInfluence=settings.characters.shadowLocalLightInfluence;lx*=localInfluence;ly*=localInfluence;
    const localVector=Math.hypot(lx,ly),localLimit=basisWeight*(.25+.2*Math.min(5,localInfluence));
    if(localVector>localLimit){const scale=localLimit/localVector;lx*=scale;ly*=scale;}
    const steeredAngle=Math.atan2(Math.sin(baseAngle)*basisWeight+ly,Math.cos(baseAngle)*basisWeight+lx),localOffset=Math.atan2(Math.sin(steeredAngle-baseAngle),Math.cos(steeredAngle-baseAngle));
    const globalCast=clamp01(globalMagnitude/0.8),localCast=clamp01(localMagnitude/1.5),mistCover=clamp01(mist);
    const length=settings.characters.shadowLength*Math.max(0.55,Math.min(1.2,0.72+globalCast*0.42-localCast*0.12-mistCover*0.18*settings.characters.shadowAtmosphereSuppression));
    return {angle:baseAngle+localOffset,baseAngle,localOffset,length,globalMagnitude,localMagnitude,mist};
  }
  function smoothShadow(current,target,dt,seconds) {
    if(!current)return {angle:target.angle,localOffset:target.localOffset,length:target.length,targetAngle:target.angle,targetLength:target.length};
    const unchanged=Math.abs(Math.atan2(Math.sin(target.angle-current.targetAngle),Math.cos(target.angle-current.targetAngle)))<1e-6&&Math.abs(target.length-current.targetLength)<1e-6;
    if(unchanged)return {angle:target.angle,localOffset:target.localOffset,length:target.length,targetAngle:target.angle,targetLength:target.length};
    const response=seconds<=0?1:1-Math.exp(-Math.min(0.1,Math.max(0,dt))/Math.max(0.01,seconds)),delta=Math.atan2(Math.sin(target.localOffset-current.localOffset),Math.cos(target.localOffset-current.localOffset)),localOffset=current.localOffset+delta*response;
    return {angle:target.baseAngle+localOffset,localOffset,length:current.length+(target.length-current.length)*response,targetAngle:target.angle,targetLength:target.length};
  }
  function packEffects(settings) {
    settings = contract.effective(settings);
    const records = [];
    for (const [key, def] of Object.entries(contract.systems)) {
      if (!def.type) continue;
      for (const item of settings[key].items) {
        const v = new Float32Array(64);
        v.set([def.type, settings[key].enabled && item.enabled ? 1 : 0, ["ellipse", "rectangle", "polygon"].indexOf(item.shape), records.length + 1]);
        v.set([item.x, item.y, item.radius || item.length || item.width, item.aspect || item.height || item.width || 1], 4);
        v.set([...rgb(item.color), item.intensity ?? item.density ?? 1], 8);
        v.set([radians(item.direction || 0), item.softness, item.falloff ?? item.scale ?? item.density ?? item.size ?? 1, item.decay ?? item.sizeVariation ?? 0], 12);
        if (key === "localLights") { v.set([item.flickerAmount, item.flickerSpeed, item.randomness, ["steady", "fire", "slowPulse", "arcane"].indexOf(item.behavior)], 16); v.set([item.colorSpill, item.characterInfluence, item.atmosphereInfluence, 0], 20); }
        if (key === "shafts") v.set([item.noiseAmount, item.noiseScale, item.noiseSpeed, 0], 16);
        if (key === "atmosphere") { v.set([item.driftSpeed, radians(item.driftDirection), item.turbulence, item.noiseScale], 16); v[20] = item.noiseDetail; }
        if (key === "particles") { v.set([contract.particleCount(item), item.speed, item.turbulence, item.lifetime], 16); v.set([item.opacity, item.glow, item.gravity, item.randomness], 20); }
        v.set([item.depth ?? 0.65, item.depthInfluence ?? 0, item.depthSoftness ?? 0.12, item.depthBias ?? item.depthSpread ?? 0], 24);
        if(key === "atmosphere") v.set([item.nearClear, item.farDensity, item.depthCurve, item.floorBias],28);
        if(key === "particles") v.set([item.wind, item.streak, item.pulse, item.distribution === "source" ? 1 : 0],28);
        if(key === "shafts") v[32] = item.atmosphereInfluence;
        if(key === "godRays") { v.set([item.noiseAmount,item.noiseScale,item.noiseSpeed,item.breakup],16);v.set([radians(item.spread),item.rayCount,item.rayWidth,item.widthVariation],20);v.set([item.spacingVariation,item.feather,item.rayMotion,item.motionSpeed],28);v[15]=item.decay;v[32]=item.atmosphereInfluence;v[33]=item.fadeVariation; }
        if(key === "waterSurface") { v.set([item.shimmerStrength,item.shimmerCoverage,item.sparkleSize,item.anisotropy],16);v.set([item.shimmerSoftness,item.evolutionSpeed,item.highlightContrast,radians(item.shimmerDirection)],20);v.set([item.depth,item.depthOcclusion,item.depthSoftness,0],24); }
        if(key === "waterSparkles") { v.set([item.sparkleStrength,item.sparkleDensity,item.sparkleSize,item.sizeVariation],16);v.set([item.twinkleSpeed,item.twinkleVariation,item.clusterScale,item.clusterAmount],20);v.set([item.depth,item.depthOcclusion,item.depthSoftness,item.artworkInfluence],24);v.set([item.peakIntensity,item.anisotropy,0,0],28); }
        v[40] = item.points?.length || 0;
        item.points?.forEach((p, i) => v.set([p.x, p.y], 44 + i * 2));
        records.push({ key, item, data: v });
      }
    }
    return records;
  }
  function requiresGPU(mode, value, features) {
    if(mode === "cinematic")return true;
    const s=contract.forIllustrated(value, features);
    return mode === "illustrated" && (s.grading.enabled || s.areaLights.enabled && s.areaLights.items.some(item=>item.enabled) ||
      s.depth.enabled && s.depth.perspective > 0 || s.characters.groundingShadow || s.particles.enabled && s.particles.items.some(item=>item.enabled));
  }
  function createRuntime(options) {
    let device, context, canvas, pipeline, uniform, effectBuffer, exposureBuffer, sampler, group0, layout0, layout1;
    let background, levelId, loading, generation = 0, raf = 0, lastTime = 0, frame = 0, lastReport = 0;
    let status = "idle", error = null, averageMs = 0, fps = 0, targets = [], drawBuffers = [], drawCursor = 0;
    let settings = contract.normalize(), packed = [], settingsKey = "", uploaded = new Map(), pendingUploads = new Map(), effectTextures = new Map(), spriteFallbacks = new Map();
    let pendingPresentation = false, presented = false, lastSprites = 0, lastDraws = 0, lastShadowDraws = 0, lastGroundedSprites = 0, lastGrounding = [], initPromise, frameDt=1/60;
    let effective=contract.effective(settings), depthTexture, emptyDepth, depthStatus="none", depthPath=null, depthLoads=0, bindGroups=0, computeGroup;
    const depthCache=new Map(), bindings=new WeakMap(), shadowStates=new Map(), uploadDiagnostics=new Map(), observedDevices=new WeakSet();
    // One owner/device/RAF. Classic Illustrated keeps the direct particle path;
    // selected world contributions reuse only the required shared scene passes.
    let mode = null, illustratedScene = false, shadowOverlay = false, recipe = "", shadowCanvas, shadowContext;
    const particleOnly = () => mode === "illustrated" && !illustratedScene && !shadowOverlay;
    const active = () => options.getRenderer() === mode && (mode === "cinematic" || mode === "illustrated");
    const snapshot = () => ({ status, error, mode, illustratedScene, shadowOverlay, effective:contract.clone(effective), pipelines:Object.keys(pipeline || {}), renderTargets:targets.length, buffers:(uniform?1:0)+(effectBuffer?1:0)+(exposureBuffer?1:0)+drawBuffers.length, scheduled:Boolean(raf), ready: presented, levelId, frame, averageMs, fps, sprites: lastSprites, drawCalls: lastDraws, shadowDraws: lastShadowDraws, groundedSprites:lastGroundedSprites, grounding:lastGrounding, shadowStates:[...shadowStates].map(([key,value])=>({key,...value})), particles: packed.filter(e => e.key === "particles" && e.data[1]).reduce((n, e) => n + e.data[16], 0), waterSurfaces: packed.filter(e => e.key === "waterSurface" && e.data[1]).length, waterSparkles: packed.filter(e => e.key === "waterSparkles" && e.data[1]).length, depthStatus, depthPath, depthLoads, depthCached:depthCache.size, textureUploads:[...uploadDiagnostics.values()], bindGroups, resolution: canvas ? [canvas.width, canvas.height] : [0, 0], backend: "WebGPU" });
    function report() {
      document.querySelector(".gameShell")?.classList.toggle("cinematicReady", active() && mode === "cinematic" && presented);
      document.querySelector(".gameShell")?.classList.toggle("illustratedSceneReady", active() && mode === "illustrated" && illustratedScene && presented);
      document.querySelector(".gameShell")?.classList.toggle("particleFieldsReady", active() && (particleOnly() || shadowOverlay) && presented);
      document.querySelector(".gameShell")?.classList.toggle("illustratedShadowsReady", active() && shadowOverlay && presented);
      options.onStatus?.(snapshot());
    }
    function fail(caught, fallback = "frame-error") {
      if(caught?.atlasWebGPUCategory === "acquisition-cancelled")return;
      stop(); error = caught?.message || String(caught); status = caught?.atlasWebGPUCategory || fallback; presented = false; report();
      // An in-scene error banner is intentional; do not silently claim a successful GPU fallback.
    }
    async function initialize(token) {
      if (pipeline) return;
      if (initPromise) {
        await initPromise;
        if(token!==generation || pipeline)return;
      }
      initPromise = (async () => {
        status = "requesting-device"; report();
        const acquiredDevice = await global.AtlasWebGPUCapabilities.requestDevice("cinematic");
        if(token!==generation)return;
        if(device && device!==acquiredDevice)releaseDepth();
        device=acquiredDevice;
        const currentDevice = device;
        if(!observedDevices.has(device)) {
        observedDevices.add(device);
        device.addEventListener("uncapturederror", event => { if (active() && (pipeline || loading) && device === currentDevice) fail(event.error, "gpu-validation-error"); });
        device.lost.then(info => {
          if (device !== currentDevice) return;
          const wasActive=active() && Boolean(pipeline || loading);
          global.AtlasWebGPUCapabilities.forgetDevice(currentDevice);
          dispose();device=null;
          if(wasActive){status="recovering";report();if(!document.hidden && !global.AtlasWebGPUCapabilities.snapshot().suspended)sync();}
        });
        }
        status = "compiling-pipelines"; report();
        const module = device.createShaderModule({ label: "Atlas Cinematic shared fields", code: global.AtlasCinematicShaders.shared });
        const messages = await module.getCompilationInfo();
        if(token!==generation)return;
        const failures = messages.messages.filter(m => m.type === "error");
        if (failures.length) throw new Error(failures.map(m => `${m.lineNum}:${m.linePos} ${m.message}`).join("\n"));
        if(particleOnly()) {
          const particle = await device.createRenderPipelineAsync({label:"Atlas shared Particle Fields",layout:"auto",vertex:{module,entryPoint:"particle"},fragment:{module,entryPoint:"particleColor",targets:[{format:navigator.gpu.getPreferredCanvasFormat(),blend:{color:{srcFactor:"one",dstFactor:"one"},alpha:{srcFactor:"zero",dstFactor:"one"}}}]},primitive:{topology:"triangle-list"}});
          if(token!==generation)return;
          layout0=particle.getBindGroupLayout(0);layout1=particle.getBindGroupLayout(1);
          uniform=device.createBuffer({size:512,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});
          effectBuffer=device.createBuffer({size:128*256,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});
          sampler=device.createSampler({minFilter:"linear",magFilter:"linear"});
          emptyDepth=texture(1,1);device.queue.writeTexture({texture:emptyDepth.texture},new Uint8Array([0,0,0,255]),{bytesPerRow:4},[1,1]);
          depthTexture=emptyDepth;bindDepth();pipeline={particle};return;
        }
        layout0 = device.createBindGroupLayout({ entries: [
          { binding: 0, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: "uniform" } },
          { binding: 1, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: "read-only-storage" } },
          { binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: { type: "read-only-storage" } },
          { binding: 3, visibility: GPUShaderStage.FRAGMENT, texture: {} },
          { binding: 4, visibility: GPUShaderStage.FRAGMENT, sampler: {} }
        ] });
        layout1 = device.createBindGroupLayout({ entries: [
          { binding: 0, visibility: GPUShaderStage.FRAGMENT, texture: {} },
          { binding: 1, visibility: GPUShaderStage.FRAGMENT, sampler: {} },
          { binding: 2, visibility: GPUShaderStage.FRAGMENT, texture: {} },
          { binding: 3, visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT, buffer: { type: "uniform" } }
        ] });
        const layout = device.createPipelineLayout({ bindGroupLayouts: [layout0, layout1] });
        const create = (fragment, vertex = "fullscreen", format = "rgba16float", blend) => device.createRenderPipelineAsync({ label: `Cinematic ${fragment}`, layout, vertex: { module, entryPoint: vertex }, fragment: { module, entryPoint: fragment, targets: [{ format, ...(blend ? { blend } : {}) }] }, primitive: { topology: "triangle-list" } });
        const alpha = { color: { srcFactor: "one", dstFactor: "one-minus-src-alpha" }, alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha" } };
        const add = { color: { srcFactor: "one", dstFactor: "one" }, alpha: { srcFactor: "zero", dstFactor: "one" } };
        const selected = mode === "illustrated" ? contract.forIllustrated(options.getSettings(options.getLevel()?.id), options.getFeatures?.(options.getLevel()?.id)) : null;
        const names = shadowOverlay ? ["sprite", "shadow", ...(selected.particles.enabled ? ["particle"] : [])] : ["sprite", ...(!selected || selected.areaLights.enabled ? ["field"] : []), ...(!selected ? ["extract", "blur"] : []), "finish", ...(!selected || selected.particles.enabled ? ["particle"] : [])];
        const factories = {sprite:()=>create("sprite","quad","rgba16float",alpha),shadow:()=>create("sprite","quad",navigator.gpu.getPreferredCanvasFormat(),alpha),field:()=>create("field"),extract:()=>create("bloomExtract"),blur:()=>create("blur"),finish:()=>create("finish","fullscreen",navigator.gpu.getPreferredCanvasFormat()),particle:()=>create("particleColor","particle",shadowOverlay ? navigator.gpu.getPreferredCanvasFormat() : "rgba16float",add)};
        const result = await Promise.all(names.map(name=>factories[name]()));
        if(token!==generation)return;
        const nextPipeline = Object.fromEntries(names.map((key, i) => [key, result[i]]));
        if(mode === "cinematic") {
        const adaptationModule = device.createShaderModule({ label: "Cinematic adaptation", code: global.AtlasCinematicShaders.autoExposure });
        const adaptationInfo = await adaptationModule.getCompilationInfo();
        const adaptationErrors = adaptationInfo.messages.filter(m => m.type === "error");
        if (adaptationErrors.length) throw new Error(adaptationErrors.map(m => `${m.lineNum}:${m.linePos} ${m.message}`).join("\n"));
        nextPipeline.adapt = await device.createComputePipelineAsync({ layout: "auto", compute: { module: adaptationModule, entryPoint: "adapt" } });
        }
        if(token!==generation)return;
        uniform = device.createBuffer({ size: 512, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
        effectBuffer = device.createBuffer({ size: 128 * 256, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
        exposureBuffer = device.createBuffer({ size: 16, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
        sampler = device.createSampler({ minFilter: "linear", magFilter: "linear" });
        emptyDepth=texture(1,1);device.queue.writeTexture({texture:emptyDepth.texture},new Uint8Array([0,0,0,255]),{bytesPerRow:4},[1,1]);
        depthTexture=emptyDepth;bindDepth();
        pipeline = nextPipeline;
      })();
      const pending=initPromise;
      try { await pending; } finally { if(initPromise===pending)initPromise = null; }
    }
    function texture(width, height, format = "rgba8unorm") {
      const tex = device.createTexture({ size: [width, height], format, usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT });
      return { texture: tex, view: tex.createView(), width, height };
    }
    function externalSourceDetails(source, metadata = {}) {
      const type = source?.constructor?.name || typeof source;
      const width = Number(source?.naturalWidth || source?.videoWidth || source?.width || 0);
      const height = Number(source?.naturalHeight || source?.videoHeight || source?.height || 0);
      const path = metadata.path || source?.dataset?.assetPath || source?.currentSrc || source?.src || "inline/dynamic";
      return { type, width, height, purpose: metadata.purpose || "cinematic texture", path };
    }
    function uploadFailure(details, stage, caught) {
      const message = caught?.message || String(caught);
      return new Error(`Cinematic texture upload failed (${stage}): purpose=${details.purpose}; source=${details.type}; dimensions=${details.width}x${details.height}; asset=${details.path}; ${message}`, { cause: caught });
    }
    function rasterizedSource(source, details) {
      const canvas = document.createElement("canvas"); canvas.width = details.width; canvas.height = details.height;
      const context = canvas.getContext("2d", { alpha: true });
      if (!context) throw uploadFailure(details, "canvas preparation", new Error("2D canvas context unavailable"));
      context.clearRect(0, 0, details.width, details.height); context.drawImage(source, 0, 0, details.width, details.height);
      return canvas;
    }
    async function preparedExternalSource(source, metadata = {}) {
      let details = externalSourceDetails(source, metadata);
      if (typeof HTMLImageElement !== "undefined" && source instanceof HTMLImageElement) {
        try { await source.decode(); } catch (caught) { throw uploadFailure(details, "image decode", caught); }
        details = externalSourceDetails(source, metadata);
        if (!source.complete || details.width <= 0 || details.height <= 0) throw uploadFailure(details, "image validation", new Error("HTMLImageElement is not fully decoded"));
        if (typeof createImageBitmap === "function") {
          try {
            const bitmap = await createImageBitmap(source, { premultiplyAlpha: "none", colorSpaceConversion: "default" });
            return { source: bitmap, details: externalSourceDetails(bitmap, metadata), release: () => bitmap.close?.() };
          } catch (bitmapError) {
            console.warn(uploadFailure(details, "ImageBitmap preparation", bitmapError).message);
          }
        }
        return { source: rasterizedSource(source, details), details: { ...details, type: "HTMLCanvasElement fallback" }, fallback: true };
      }
      if (details.width <= 0 || details.height <= 0) throw uploadFailure(details, "source validation", new Error("ExternalImageSource has invalid dimensions"));
      return { source, details };
    }
    function copyPreparedExternalSource(prepared, old) {
      const { details } = prepared;
      const resource = old && old.width === details.width && old.height === details.height ? old : texture(details.width, details.height);
      if (old && resource !== old) old.texture.destroy();
      try {
        device.queue.copyExternalImageToTexture({ source: prepared.source }, { texture: resource.texture, premultipliedAlpha: false }, [details.width, details.height]);
        uploadDiagnostics.set(details.purpose,{...details,fallback:Boolean(prepared.fallback)});
      } catch (caught) {
        try {
          const fallback = rasterizedSource(prepared.source, details);
          device.queue.copyExternalImageToTexture({ source: fallback }, { texture: resource.texture, premultipliedAlpha: false }, [details.width, details.height]);
          uploadDiagnostics.set(details.purpose,{...details,sourceType:details.type,type:fallback.constructor.name,fallback:true});
        } catch (fallbackError) {
          if (!old || resource !== old) resource.texture.destroy();
          throw uploadFailure(details, "ImageBitmap and canvas fallback", new Error(`primary=${caught?.message||caught}; fallback=${fallbackError?.message||fallbackError}`));
        }
      }
      return resource;
    }
    async function upload(source, old, metadata) {
      const token=generation;
      const prepared = await preparedExternalSource(source, metadata);
      try {
        if(token!==generation)throw new DOMException("Texture upload canceled", "AbortError");
        return copyPreparedExternalSource(prepared, old);
      }
      finally { prepared.release?.(); }
    }
    function uploadDynamicCanvas(source, old, metadata) {
      const details = externalSourceDetails(source, metadata);
      if (details.width <= 0 || details.height <= 0) throw uploadFailure(details, "canvas validation", new Error("Canvas has invalid dimensions"));
      return copyPreparedExternalSource({ source, details }, old);
    }
    function bindDepth() {
      group0=device.createBindGroup({layout:layout0,entries:[... (particleOnly()?[uniform,effectBuffer]:[uniform,effectBuffer,exposureBuffer]).map((buffer,binding)=>({binding,resource:{buffer}})),{binding:3,resource:depthTexture.view},{binding:4,resource:sampler}]});bindGroups++;
    }
    function releaseDepth(retainCached = false) { if(!retainCached){for(const resource of depthCache.values()) resource?.texture.destroy();depthCache.clear();}emptyDepth?.texture.destroy();emptyDepth=null;depthTexture=null;depthStatus="none";depthPath=null; }
    function imageFor(path) {
      const prepared=options.getPreparedImage?.(path);
      if(prepared)return prepared;
      const image=new Image();image.src=path;return Promise.resolve(image);
    }
    async function loadDepth(level, token) {
      // Every Atlas level owns the conventional assets/depthmap.png. An explicit
      // world.depthmap can still override that path for future special cases.
      const path=global.AtlasAmbientSystem.depthPathFor(level);
      depthPath=path;depthStatus=path?"loading":"none";depthTexture=emptyDepth;
      if(path && !depthCache.has(path)) {
        let resource=null;
        try { const img=await imageFor(path);if(token!==generation)return;resource=await upload(img,null,{purpose:"scene depthmap",path});if(token!==generation){resource.texture.destroy();return;}depthLoads++; }
        catch(caught) { if(token!==generation)return;console.warn(caught?.message||caught); }
        depthCache.set(path,resource);
      }
      if(token!==generation)return;
      depthTexture=depthCache.get(path)||emptyDepth;depthStatus=depthTexture===emptyDepth?(path?"unavailable":"none"):"ready";
      bindDepth();
    }
    function releaseLevel(resetExposure = true) {
      background?.texture.destroy(); background = null;
      for (const item of uploaded.values()) item.texture.destroy(); uploaded.clear();
      pendingUploads.clear();
      spriteFallbacks.clear();
      for (const item of effectTextures.values()) item.texture.destroy(); effectTextures.clear();
      uploadDiagnostics.clear();
      targets.forEach(t => t.texture.destroy()); targets = [];
      drawBuffers.forEach(b => b.destroy()); drawBuffers = [];
      settingsKey = ""; frame = 0; lastTime = 0; presented = false; pendingPresentation = false;
      shadowStates.clear();
      computeGroup=null;depthTexture=emptyDepth;depthStatus="none";depthPath=null;
      if (resetExposure && device && exposureBuffer) device.queue.writeBuffer(exposureBuffer, 0, new Float32Array(4));
    }
    function refreshSettings() {
      const value = options.getSettings(options.getLevel()?.id);
      const features=options.getFeatures?.(options.getLevel()?.id);
      const cues=mode === "illustrated"?[]:options.getGameplayCues?.() || [];
      const key = JSON.stringify([value,features,cues]);
      if (key === settingsKey) return;
      // Keep the authored record indices in both modes: the particle shader
      // derives its deterministic seeds from them. Only dispatch is mode-specific.
      settingsKey = key; settings = contract.normalize(value); effective=mode === "illustrated" ? contract.forIllustrated(value,features) : contract.effective(settings);packed = packEffects(effective);
      if(mode === "cinematic" && effective.gameplayCues.enabled) for(const cue of cues.slice(0,48)) {
        const interaction=cue.interaction==="pressed"?2:cue.interaction==="hover"?1:0,boost=interaction===2?1.55:interaction===1?1.28:1;
        const item=contract.instance("localLights",{id:cue.id,x:cue.x,y:cue.y,radius:Math.max(70,cue.radius*2.5)*(interaction?1.08:1),color:cue.color,intensity:cue.intensity*effective.gameplayCues.intensity*0.2*boost,falloff:1,depthInfluence:0.35,characterInfluence:effective.gameplayCues.characterInfluence,behavior:cue.state==="available"||cue.state==="open"?"slowPulse":"steady",flickerAmount:0.12});
        const single=contract.normalize({localLights:{enabled:true,items:[item]}});const record=packEffects(single)[0];record.key="gameplayCues";record.data[36]=cue.state==="available"?Math.max(44,cue.radius):cue.state==="open"?Math.max(70,cue.radius):cue.radius;record.data[37]=cue.state==="locked"?1:cue.state==="completed"?2:cue.state==="open"?3:4;record.data[38]=interaction;record.data[3]=packed.length+1;packed.push(record);
      }
      const data = new Float32Array(128 * 64);
      packed.forEach((e, i) => data.set(e.data, i * 64));
      device.queue.writeBuffer(effectBuffer, 0, data);
    }
    function globals(timestamp) {
      const level = options.getLevel(); const data = new Float32Array(128); const put = (i, values) => data.set(values, i * 4);
      const dt = lastTime ? (timestamp - lastTime) / 1000 : 1 / 60;frameDt=dt;
      put(0, [canvas.width, canvas.height, options.getCameraX(), options.getViewportWorldWidth() || level.world.width]);
      put(1, [level.world.height, timestamp / 1000, packed.length, dt]);
      const s = effective;
      const graded = s.grading.enabled && (s.grading.exposure !== 0 || s.grading.highlights !== 0 || s.grading.shadows !== 0 || s.grading.warmth !== 0 || s.grading.tint !== 0);
      put(2, [level.world.width, packed.some(e => e.data[1] && (e.data[0] < 4 || e.data[0] === 6 || e.data[0] === 7 || e.data[0] === 8)) || s.bloom.enabled || graded ? 1 : 0, +shadowOverlay, 0]);
      put(3, [+s.grading.enabled, s.grading.exposure, s.grading.contrast, s.grading.saturation]);
      put(4, [s.grading.highlights, s.grading.shadows, 0, s.grading.warmth]); put(5, [s.grading.tint, s.grading.blackPoint, 0, 0]);
      put(7, [+s.characters.enabled, s.characters.ambientInfluence, s.characters.localInfluence, s.characters.colorSpill]); put(8, [s.characters.intensityResponse, s.characters.directionalInfluence, s.characters.atmosphereInfluence, s.characters.depthTint]);
      put(9, [+s.wrap.enabled, s.wrap.strength, s.wrap.radius, s.wrap.colorInfluence]);
      put(10, [+s.rim.enabled, s.rim.strength, s.rim.width, s.rim.colorResponse]); put(11, [s.rim.localInfluence, s.rim.ambientInfluence, 0, 0]);
      put(12, [+s.bloom.enabled, s.bloom.intensity, s.bloom.threshold, s.bloom.softKnee]); put(13, [s.bloom.radius, s.bloom.colorInfluence, s.bloom.localContribution, s.bloom.falloff]);
      put(14, [+s.autoExposure.enabled, s.autoExposure.minExposure, s.autoExposure.maxExposure, s.autoExposure.adaptationSpeed]); put(15, [s.autoExposure.strength, 0, 0, 0]);
      put(16, [+s.finishing.enabled, s.finishing.intensity, s.finishing.softness, s.finishing.finalExposure]); put(17, [s.finishing.finalContrast, 0, 0, 0]);
      put(18,[+(s.depth.enabled && depthStatus==="ready"),s.depth.filterRadius,s.depth.perspective,s.characters.grounding]);
      put(19,[s.characters.sideLighting,s.characters.frontAtmosphere,0,0]);
      put(20,[s.characters.shadowStrength,s.characters.shadowSoftness,s.characters.shadowWidth,s.characters.shadowLength]);
      put(21,[["tapered","oval","capsule","wideSoft","silhouette"].indexOf(s.characters.shadowShape),radians(s.characters.shadowDirection),s.characters.shadowDarkBackgroundSuppression,s.characters.shadowOpacity/100]);
      put(22,[s.characters.shadowGroundlineOffset,s.characters.shadowScale,0,0]);
      if (!data.every(Number.isFinite)) throw new Error("Invalid cinematic uniforms");
      // Secondary render-loop diagnostic only; the shared HUD samples gameplay RAF.
      device.queue.writeBuffer(uniform, 0, data); lastTime = timestamp; fps = fps ? fps * 0.95 + 0.05 / Math.max(dt, 0.001) : 1 / dt;
    }
    function bind(pass, source, aux = background, config = {}) {
      let buffer = drawBuffers[drawCursor];
      if (!buffer) drawBuffers[drawCursor] = buffer = device.createBuffer({ size: 80, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
      drawCursor++;
      const data = new Float32Array(20);
      data.set(config.rect || [0, 0, 1, 1]); data.set(config.uv || [0, 0, 1, 1], 4); data.set(config.flags || [0, 0, 0, 0], 8);
      const appearance = global.AtlasCharacterAppearance.filterParameters(config.appearance, config.kind);
      data.set(appearance.slice(0, 4), 12); data[16] = radians(appearance[4]);
      if(Array.isArray(config.shadow)){data.set(config.shadow,12);data.set(config.extra||[0,0,0,0],16);}
      else {data[17] = config.opacity ?? 1;data[18]=(config.softness || 0)/Math.max(1,(config.rect?.[2] || 1)*canvas.clientWidth);data[19]=(config.softness || 0)/Math.max(1,(config.rect?.[3] || 1)*canvas.clientHeight);}
      device.queue.writeBuffer(buffer, 0, data);
      pass.setBindGroup(0, group0);
      if(particleOnly()) {
        let group=bindings.get(buffer);
        if(!group){group=device.createBindGroup({layout:layout1,entries:[{binding:3,resource:{buffer}}]});bindings.set(buffer,group);bindGroups++;}
        pass.setBindGroup(1,group);return;
      }
      let sources=bindings.get(buffer);if(!sources)bindings.set(buffer,sources=new WeakMap());
      let auxiliaries=sources.get(source);if(!auxiliaries)sources.set(source,auxiliaries=new WeakMap());
      let group=auxiliaries.get(aux);
      if(!group){group=device.createBindGroup({ layout: layout1, entries: [{ binding: 0, resource: source.view }, { binding: 1, resource: sampler }, { binding: 2, resource: aux.view }, { binding: 3, resource: { buffer } }] });auxiliaries.set(aux,group);bindGroups++;}
      pass.setBindGroup(1,group);
    }
    function resize() {
      // Characters share these targets with the scene. A sub-display-resolution
      // target loses sprite detail before CSS upscales the final composite.
      // Only the device limit may reduce resolution, uniformly on both axes.
      const ratio = Math.min(global.devicePixelRatio || 1,
        device.limits.maxTextureDimension2D / Math.max(1, canvas.clientWidth, canvas.clientHeight));
      const width = Math.max(2, Math.round(canvas.clientWidth * ratio));
      const height = Math.max(2, Math.round(canvas.clientHeight * ratio));
      if (canvas.width === width && canvas.height === height && (particleOnly() || targets.length)) return;
      canvas.width = width; canvas.height = height; targets.forEach(t => t.texture.destroy());
      if(particleOnly())return;
      if(shadowCanvas){shadowCanvas.width=width;shadowCanvas.height=height;}
      targets = [texture(width, height, "rgba16float"), ...(!shadowOverlay ? [texture(width, height, "rgba16float")] : []), ...(mode === "cinematic" ? Array.from({ length: 3 }, () => texture(Math.max(2, width >> 2), Math.max(2, height >> 2), "rgba16float")) : [])];
      if(pipeline.adapt){computeGroup=device.createBindGroup({layout:pipeline.adapt.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:uniform}},{binding:1,resource:targets[1].view},{binding:2,resource:{buffer:exposureBuffer}}]});bindGroups++;}
    }
    function sprites(stage) {
      const entries = [];
      for(const [key,resource] of uploaded)if(key instanceof HTMLCanvasElement && !key.isConnected){resource.texture.destroy();uploaded.delete(key);for(const [id,fallback] of spriteFallbacks)if(fallback===resource)spriteFallbacks.delete(id);}
      const add = (image, bounds, key, character = false, mirror = false) => {
        if(shadowOverlay && key !== "actor:sven" && !key.startsWith("npc:"))return;
        if (!image || !bounds) return;
        let rect = bounds.getBoundingClientRect();
        if (!rect.width || !rect.height || rect.right < stage.left || rect.left > stage.right) return;
        const path = image.dataset.assetPath || image.getAttribute("src");
        const decoded = global.AtlasLocomotion?.decodedImages?.get(path);
        const source = decoded?.complete && decoded.naturalWidth ? decoded : image;
        if (source.naturalWidth && getComputedStyle(image).objectFit === "contain") {
          const scale = Math.min(rect.width/source.naturalWidth, rect.height/source.naturalHeight);
          const width = source.naturalWidth*scale, height = source.naturalHeight*scale;
          rect = { ...rect.toJSON(), left: rect.left+(rect.width-width)/2, top: rect.bottom-height, width, height };
        }
        const dynamic = image.hasAttribute('data-flyby-canvas');
        const cacheKey = dynamic ? image : source.currentSrc || source.src;
        const fallbackKey = image.dataset.characterId ? `${key}:${image.dataset.characterId}` : key;
        let resource = uploaded.get(cacheKey);
        if(dynamic && (!resource || resource.revision!==image.dataset.revision)) {
          resource=uploadDynamicCanvas(image,resource,{purpose:`sprite ${key}`,path:`prepared flyby ${key}`});
          resource.revision=image.dataset.revision;uploaded.set(cacheKey,resource);
        }
        if (!resource && source.complete && source.naturalWidth && !pendingUploads.has(cacheKey)) {
          const uploadGeneration = generation;
          const pending = upload(source,null,{purpose:`sprite ${key}`,path})
            .then(created => {
              if(uploadGeneration!==generation){created.texture.destroy();return null;}
              uploaded.set(cacheKey,created);spriteFallbacks.set(fallbackKey,created);return created;
            })
            .catch(caught => { if(uploadGeneration===generation)console.warn(caught?.message||caught);return null; })
            .finally(() => { pendingUploads.delete(cacheKey); });
          pendingUploads.set(cacheKey,pending);
        }
        if (resource) spriteFallbacks.set(fallbackKey, resource);
        else resource = spriteFallbacks.get(fallbackKey);
        if (!resource) return;
        resource.used = frame;
        const animal=bounds.closest('.ambientAnimal,.ambientFlyby');
        const style=getComputedStyle(animal || bounds);
        let flybyUV;
        if(dynamic){
          const m=new DOMMatrix(style.transform),det=m.a*m.d-m.b*m.c;
          flybyUV=[m.d*rect.width/det/image.width,-m.b*rect.width/det/image.height,-m.c*rect.height/det/image.width,m.a*rect.height/det/image.height];
        }
        const grounding=!animal&&character&&effective.characters.groundingShadow?displayedGrounding(analyzeSpriteGrounding(source),mirror):null;
        entries.push({ key, resource, grounding, uv:flybyUV, rect: [(rect.left-stage.left)/stage.width, (rect.top-stage.top)/stage.height, rect.width/stage.width, rect.height/stage.height], flags: [+character, +mirror, dynamic?2:+key.startsWith("flyby:"), 0], facing:key.startsWith("npc:")?(mirror?"mirrored":"native"):(image.dataset.resolvedFacing||"native"), opacity: animal ? Number(style.opacity) : 1, appearance: animal ? {saturation:Number(animal.dataset.saturation ?? (style.getPropertyValue('--flyby-saturation').trim() || 1))} : character ? options.getCharacterAppearance(key) : undefined, softness:animal ? Number(animal.dataset.softness ?? parseFloat(style.getPropertyValue('--flyby-softness')))||0 : 0, kind: key.startsWith("npc:") ? "npc" : "sven", shadow: !animal && settings.layers.characters !== false && effective.characters.groundingShadow && options.getGroundingShadow?.(key) !== false });
      };
      document.querySelectorAll(".ambientFlyby[data-active='true'][data-ready='true']").forEach(el => { const img = el.querySelector('[data-flyby-canvas]') || el.querySelector(el.dataset.frame === "b" ? ".ambientFlybyFrameB" : ".ambientFlybyFrameA"); add(img, img, `flyby:${el.dataset.ambientFlyby}`,true); });
      document.querySelectorAll(".ambientAnimal[data-ready='true']").forEach(el => add(el.querySelector(el.dataset.frame === "closed" ? ".ambientAnimalClosed" : ".ambientAnimalOpen"), el, `animal:${el.dataset.ambientAnimal}`, true, el.dataset.mirrorX === "true"));
      document.querySelectorAll("[data-npc-challenge] [data-npc-sprite]").forEach(img => { const el = img.closest("[data-npc-challenge]"); add(img, el, `npc:${el.dataset.npcChallenge}`, true, Number(el.dataset.npcFacingScale) < 0); });
      const actor = document.querySelector("[data-actor='sven']"); add(actor, actor, "actor:sven", true);
      if (uploaded.size > 96) for (const [key, resource] of uploaded) { if (resource.used < frame - 2 && ![...spriteFallbacks.values()].includes(resource)) { resource.texture.destroy(); uploaded.delete(key); } }
      return entries;
    }
    function drawShadows(pass, shadowEntries) {
        lastGroundedSprites=0;lastGrounding=[];const contactDebug=[];
         for (const entry of shadowEntries) {
          const [x,y,w,h]=entry.rect;
          const grounding=entry.grounding;if(!grounding?.valid)continue;lastGroundedSprites++;
          const soleShift=effective.characters.shadowGroundlineOffset/Math.max(1,h*canvas.clientHeight);
          const leftBottom=clamp01(grounding.left.bottom+soleShift),rightBottom=clamp01(grounding.right.bottom+soleShift),groundline=(leftBottom+rightBottom)*.5;
          const offsetX=effective.characters.shadowOffsetX/canvas.clientWidth,offsetY=effective.characters.shadowOffsetY/canvas.clientHeight,leftPoint={x:x+w*grounding.left.center+offsetX,y:y+h*leftBottom+offsetY},rightPoint={x:x+w*grounding.right.center+offsetX,y:y+h*rightBottom+offsetY};
          lastGrounding.push({key:entry.key,left:{...grounding.left,bottom:leftBottom,point:leftPoint},right:{...grounding.right,bottom:rightBottom,point:rightPoint},center:grounding.center,split:grounding.split,groundline});contactDebug.push({left:leftPoint,right:rightPoint});
          const centerX=x+w*grounding.center+effective.characters.shadowOffsetX/canvas.clientWidth;
          const footY=y+h*groundline+effective.characters.shadowOffsetY/canvas.clientHeight;
          const point={x:options.getCameraX()+(x+w*grounding.center)*(options.getViewportWorldWidth()||options.getLevel().world.width),y:(y+h*groundline)*options.getLevel().world.height};
          const target=shadowTarget(effective,point),state=smoothShadow(shadowStates.get(entry.key),target,frameDt,effective.characters.shadowDirectionSmoothing);shadowStates.set(entry.key,state);
          if(effective.characters.shadowShape==="silhouette"){
             const screenWidth=canvas.width,screenHeight=canvas.height,heightPixels=h*screenHeight,left=[leftPoint.x*screenWidth,leftPoint.y*screenHeight],right=[rightPoint.x*screenWidth,rightPoint.y*screenHeight],base=[right[0]-left[0],right[1]-left[1]],baseLength=Math.max(.001,Math.hypot(...base)),baseDirection=[base[0]/baseLength,base[1]/baseLength],baseNormal=[-baseDirection[1],baseDirection[0]],rawAxis=[Math.cos(state.angle),Math.sin(state.angle)],tangent=rawAxis[0]*baseDirection[0]+rawAxis[1]*baseDirection[1];let normal=rawAxis[0]*baseNormal[0]+rawAxis[1]*baseNormal[1];if(Math.abs(normal)<.08)normal=(normal<0?-1:1)*.08;const axisLength=Math.hypot(tangent,normal),axis=[(baseDirection[0]*tangent+baseNormal[0]*normal)/axisLength,(baseDirection[1]*tangent+baseNormal[1]*normal)/axisLength],castLength=.46*state.length*effective.characters.shadowScale*heightPixels,cast=[axis[0]*castLength,axis[1]*castLength],span=Math.max(.04,grounding.right.center-grounding.left.center),fullWidth=[base[0]/span,base[1]/span],q0=-grounding.left.center/span,q1=(1-grounding.left.center)/span,widthFactor=Math.max(.25,effective.characters.shadowWidth),topU0=grounding.center+(0-grounding.center)*widthFactor,topU1=grounding.center+(1-grounding.center)*widthFactor,tq0=(topU0-grounding.left.center)/span,tq1=(topU1-grounding.left.center)/span,at=q=>[left[0]+base[0]*q,left[1]+base[1]*q],bottom0=at(q0),bottom1=at(q1),top0=at(tq0),top1=at(tq1);top0[0]+=cast[0]*leftBottom;top0[1]+=cast[1]*leftBottom;top1[0]+=cast[0]*rightBottom;top1[1]+=cast[1]*rightBottom;const blurPixels=effective.characters.shadowSoftness*1.4,blurU=blurPixels/Math.max(heightPixels*(w/h),1),blurV=blurPixels/Math.max(heightPixels,1),blurWidth=Math.max(1,widthFactor),kernelPadX=Math.abs(fullWidth[0])*blurU*blurWidth+Math.abs(cast[0])*blurV,kernelPadY=Math.abs(fullWidth[1])*blurU*blurWidth+Math.abs(cast[1])*blurV,paddingX=kernelPadX*2+4,paddingY=kernelPadY*2+4,points=[bottom0,bottom1,top0,top1],minX=Math.min(...points.map(p=>p[0]))-paddingX,maxX=Math.max(...points.map(p=>p[0]))+paddingX,minY=Math.min(...points.map(p=>p[1]))-paddingY,maxY=Math.max(...points.map(p=>p[1]))+paddingY;
            bind(pass,entry.resource,targets[0],{rect:[minX/screenWidth,minY/screenHeight,(maxX-minX)/screenWidth,(maxY-minY)/screenHeight],uv:[grounding.left.center,grounding.right.center,leftBottom,rightBottom],flags:[heightPixels,entry.flags[1],grounding.center,1],shadow:[state.angle,state.length,w/h,effective.characters.shadowScale],extra:[leftPoint.x,leftPoint.y,rightPoint.x,rightPoint.y]});
          }else{const extent=h*2.4;bind(pass,entry.resource,targets[0],{rect:[centerX-extent*.5,footY-extent*.5,extent,extent],flags:[groundline,entry.flags[1],grounding.center,1],shadow:[state.angle,state.length,w/h,effective.characters.shadowScale],extra:[leftBottom,rightBottom,grounding.split,0]});}
           pass.draw(6);
         }

      return contactDebug;
    }
    function renderFrame(timestamp) {
      raf = 0;
      if (!active() || !canvas?.isConnected || (!particleOnly() && !background) || document.hidden) return;
      try {
        const start = performance.now(); refreshSettings(); resize(); globals(timestamp); drawCursor = 0;
        const encoder = device.createCommandEncoder({ label: "Cinematic frame" });
        const begin = (view, loadOp = "clear") => encoder.beginRenderPass({ colorAttachments: [{ view, clearValue: [0, 0, 0, 0], loadOp, storeOp: "store" }] });
        if(particleOnly() || shadowOverlay) {
          if(!shadowOverlay && !packed.some(e=>e.key==="particles"&&e.data[1])){dispose();return;}
          if(shadowOverlay) {
            let receiver=begin(targets[0].view);receiver.setPipeline(pipeline.sprite);
            bind(receiver,background,background,{uv:[options.getCameraX()/options.getLevel().world.width,0,(options.getViewportWorldWidth()||options.getLevel().world.width)/options.getLevel().world.width,1],appearance:options.getBackgroundAppearance?.()});receiver.draw(6);receiver.end();
            const entries=sprites(canvas.getBoundingClientRect()).filter(entry=>entry.shadow);lastSprites=entries.length;lastShadowDraws=entries.length;
            const shadows=begin(shadowContext.getCurrentTexture().createView());shadows.setPipeline(pipeline.shadow);drawShadows(shadows,entries);shadows.end();
          }
          // Black is neutral under the canvas's screen composite. This preserves
          // the shader's additive light (including glow) without dark alpha halos.
          const pass=encoder.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:[0,0,0,1],loadOp:"clear",storeOp:"store"}]});
          if(pipeline.particle){pass.setPipeline(pipeline.particle);
          packed.forEach((e,index)=>{if(e.key==="particles"&&e.data[1]){bind(pass,shadowOverlay?background:null,shadowOverlay?background:null,{flags:[index,0,0,0]});pass.draw(6,e.data[16]);}});}
          pass.end();device.queue.submit([encoder.finish()]);frame++;lastDraws=drawCursor;
          averageMs=averageMs?averageMs*.95+(performance.now()-start)*.05:performance.now()-start;
          if(!presented&&!pendingPresentation&&pendingUploads.size===0){pendingPresentation=true;const token=generation;device.queue.onSubmittedWorkDone().then(()=>{if(token!==generation||!active())return;pendingPresentation=false;presented=true;status="ready";report();}).catch(caught=>{if(token===generation)fail(caught);});}
          if(timestamp-lastReport>500){lastReport=timestamp;report();}
          raf=requestAnimationFrame(renderFrame);return;
        }
        const worldUV = [options.getCameraX()/options.getLevel().world.width, 0, (options.getViewportWorldWidth() || options.getLevel().world.width)/options.getLevel().world.width, 1];
        let pass = begin(targets[0].view); pass.setPipeline(pipeline.sprite);
        bind(pass, background, background, { uv: worldUV, appearance: options.getBackgroundAppearance?.() }); pass.draw(6);
        const drawLegacy = slot => {
          const retained = mode === "illustrated" || (options.getLevel().sceneEffects || []).some(effect => effect.enabled !== false && !contract.replacedPresets.has(effect.presetId) && (effect.layerSlot || global.AtlasSceneEffects.presetById(effect.presetId)?.layerSlot || "worldAtmosphere") === slot);
          if (!retained) return;
          const el = document.querySelector(`[data-scene-effects-canvas="${slot}"]`);
          if (!el?.width || !el.height) return;
          if (!el.getContext("2d")) return;
          let resource = effectTextures.get(slot);
          if (resource && (resource.width !== el.width || resource.height !== el.height)) { resource.texture.destroy(); resource = null; }
          resource = uploadDynamicCanvas(el, resource, {purpose:`legacy scene effects ${slot}`,path:`canvas:${slot}`}); effectTextures.set(slot, resource);
          bind(pass, resource, background, { uv: worldUV }); pass.draw(6);
        };
        drawLegacy("backgroundAtmosphere");
        if(mode === "cinematic"){drawLegacy("worldAtmosphere"); drawLegacy("worldLight");}
        pass.end();
        const full = (type, target, source, auxiliary, config) => { const p = begin(target); p.setPipeline(pipeline[type]); bind(p, source, auxiliary, config); p.draw(3); p.end(); };
        if(pipeline.field) full("field", targets[1].view, targets[0], background);
        else { pass=begin(targets[1].view);pass.setPipeline(pipeline.sprite);bind(pass,targets[0],background,{flags:[0,0,0,3]});pass.draw(6);pass.end(); }
        // Characters sample the field themselves; a second scene-wide light multiply would
        // double-light sprites and defeat the character influence control.
        const entries = sprites(canvas.getBoundingClientRect()); lastSprites = entries.length;
        const shadowEntries=entries.filter(item => item.shadow);lastShadowDraws=shadowEntries.length;
        pass = begin(targets[1].view, "load"); pass.setPipeline(pipeline.sprite);
        const contactDebug=mode === "cinematic" ? drawShadows(pass,shadowEntries) : [];
         pass.end();
         // Visible characters are deliberately isolated from the larger shadow
         // quads. A two-device-pixel transparent gutter keeps linear filtering
         // and raster coverage away from the exact frame edge without changing
         // the original sprite-to-screen mapping.
         pass = begin(targets[1].view, "load"); pass.setPipeline(pipeline.sprite);
         let illustratedLayer=0;
         const advanceIllustratedLayers = next => {
           if(mode !== "illustrated")return;
           if(illustratedLayer<1 && next>=1)drawLegacy("worldAtmosphere");
           if(illustratedLayer<2 && next>=2){drawLegacy("worldLight");contactDebug.push(...drawShadows(pass,shadowEntries));}
           illustratedLayer=next;
         };
         for (const entry of entries) {
           advanceIllustratedLayers(entry.key.startsWith("flyby:") ? 0 : entry.key.startsWith("animal:") ? 1 : 2);
           let visible=entry;
           if(entry.key==="actor:sven"||entry.key.startsWith("npc:")){
             const padX=2/canvas.width,padY=2/canvas.height,[x,y,w,h]=entry.rect,uvPadX=padX/Math.max(w,1/canvas.width),uvPadY=padY/Math.max(h,1/canvas.height);
             visible={...entry,rect:[x-padX,y-padY,w+padX*2,h+padY*2],uv:[-uvPadX,-uvPadY,1+uvPadX*2,1+uvPadY*2]};
           }
           bind(pass, entry.resource, background, visible); pass.draw(6);
         }
         advanceIllustratedLayers(2);
         if(effective.characters.showShadowContactDebug)for(const debug of contactDebug){bind(pass,background,background,{flags:[0,0,0,2],shadow:[debug.left.x,debug.left.y,debug.right.x,debug.right.y]});pass.draw(6);}
         drawLegacy("foregroundAtmosphere"); pass.end();
        const particleFields = packed.map((e, i) => ({ ...e, index: i })).filter(e => e.key === "particles" && e.data[1]);
        if (particleFields.length) { pass = begin(targets[1].view, "load"); pass.setPipeline(pipeline.particle); for (const e of particleFields) { bind(pass, background, background, { flags: [e.index, 0, 0, 0] }); pass.draw(6, e.data[16]); } pass.end(); }
        if (effective.bloom.enabled) {
          full("extract", targets[2].view, targets[1], background);
          full("blur", targets[3].view, targets[2], background, { flags: [0, 0, 1/targets[2].width, 0] });
          full("blur", targets[4].view, targets[3], background, { flags: [0, 0, 0, 1/targets[3].height] });
        }
        if(pipeline.adapt){const compute = encoder.beginComputePass(); compute.setPipeline(pipeline.adapt); compute.setBindGroup(0,computeGroup); compute.dispatchWorkgroups(1); compute.end();}
        full("finish", context.getCurrentTexture().createView(), targets[1], targets[4] || background);
        device.queue.submit([encoder.finish()]); frame++; lastDraws = drawCursor;
        averageMs = averageMs ? averageMs*0.95+(performance.now()-start)*0.05 : performance.now()-start;
        if (!presented && !pendingPresentation && pendingUploads.size===0) {
          pendingPresentation = true; const token = generation; const targetCanvas = canvas;
          device.queue.onSubmittedWorkDone().then(() => { if(token !== generation || targetCanvas !== canvas || !active()) return; pendingPresentation=false;presented=true;status="ready";report(); }).catch(caught => { if (token === generation && active()) fail(caught); });
        }
        if (timestamp-lastReport > 500) { lastReport=timestamp;report(); }
        raf = requestAnimationFrame(renderFrame);
      } catch (caught) { fail(caught); }
    }
    async function sync() {
      if(document.hidden || global.AtlasWebGPUCapabilities.snapshot().suspended)return;
      const nextMode=options.getRenderer();
      if(nextMode!==mode){dispose();mode=nextMode;}
      const selected=contract.forIllustrated(options.getSettings(options.getLevel()?.id),options.getFeatures?.(options.getLevel()?.id));
      const scene=Boolean(selected.grading.enabled || selected.areaLights.enabled && selected.areaLights.items.some(item=>item.enabled) || selected.depth.enabled && selected.depth.perspective>0);
      const overlay=!scene && selected.characters.groundingShadow;
      const nextRecipe=JSON.stringify([scene,overlay,selected.areaLights.enabled,selected.particles.enabled,selected.depth.enabled]);
      if(mode === "illustrated" && recipe!==nextRecipe){dispose(true);illustratedScene=scene;shadowOverlay=overlay;recipe=nextRecipe;}
      if(mode !== "illustrated"){illustratedScene=false;shadowOverlay=false;recipe="";}
      if (!active() || !requiresGPU(mode,options.getSettings(options.getLevel()?.id),options.getFeatures?.(options.getLevel()?.id))) { if(pipeline||loading||depthCache.size)dispose();status="inactive";report();return; }
      const nextCanvas = document.querySelector(mode === "illustrated"?"[data-particle-fields-canvas]":"[data-cinematic-canvas]"); const level = options.getLevel();
      // Level loading temporarily removes the canvas. Keep the established
      // per-device depth cache, but cancel presentation and pending level work.
      // Menu navigation and renderer switches explicitly dispose the owner.
      if (!nextCanvas || !level) { stop();generation++;loading=null;initPromise=null;return; }
      if(global.AtlasWebGPUCapabilities.snapshot().needsValidation){
        const token=generation;status="recovering";presented=false;report();
        try{await global.AtlasWebGPUCapabilities.requestDevice("cinematic");}
        catch(caught){if(token===generation)fail(caught);return;}
        if(token!==generation)return;
      }
      if (loading?.level === level.id && loading.canvas === nextCanvas) return loading.promise;
      if (levelId === level.id && (background || particleOnly()) && pipeline && canvas === nextCanvas) {
        // render() retains this canvas but replaces .gameShell. Restore its presentation
        // state synchronously, before the browser paints, not on the 500ms metrics tick.
        report();
        refreshSettings(); if (!raf) raf=requestAnimationFrame(renderFrame); return;
      }
      const token = ++generation; stop(); presented=false;pendingPresentation=false;report();
      const promise = (async () => {
        try {
          await initialize(token); if (token !== generation || !active()) return;
          if (levelId !== level.id || (!particleOnly() && !background) || depthStatus==="loading" || depthStatus==="none") {
            releaseLevel(); levelId=level.id; status="loading-artwork";report();
            if(!particleOnly()) {
            const img = await imageFor(level.world.background);if(token!==generation)return;
            const uploadedBackground=await upload(img,null,{purpose:"level artwork",path:level.world.background});
            if (token !== generation || !active()) {uploadedBackground.texture.destroy();return;}
            background=uploadedBackground;
            }
            if(mode === "cinematic" || selected.depth.enabled) await loadDepth(level,token);
            else {depthStatus="unused";bindDepth();}
            if(token!==generation || !active())return;
          }
          if(canvas && canvas!==nextCanvas)context?.unconfigure();
          canvas=nextCanvas; context=canvas.getContext("webgpu"); if (!context) throw new Error("WebGPU canvas context unavailable");
          context.configure({ device, format: navigator.gpu.getPreferredCanvasFormat(), alphaMode: "opaque" });
          if(shadowOverlay){const nextShadow=document.querySelector('[data-illustrated-shadow-canvas]');if(shadowCanvas && shadowCanvas!==nextShadow)shadowContext?.unconfigure();shadowCanvas=nextShadow;shadowContext=shadowCanvas.getContext('webgpu');shadowContext.configure({device,format:navigator.gpu.getPreferredCanvasFormat(),alphaMode:'premultiplied'});}
          refreshSettings(); error=null;status="rendering-first-frame";report();raf=requestAnimationFrame(renderFrame);
        } catch(caught) { if(token===generation) fail(caught,"renderer-initialization-failed"); }
      })();
      loading={level:level.id,canvas:nextCanvas,promise}; await promise; if(loading?.promise===promise) loading=null;
    }
    function stop() { if(raf)cancelAnimationFrame(raf);raf=0;lastTime=0;fps=0;averageMs=0;lastReport=0;report(); }
    function dispose(retainDepth = false) { generation++;stop();releaseLevel(false);releaseDepth(retainDepth);uniform?.destroy();effectBuffer?.destroy();exposureBuffer?.destroy();uniform=null;effectBuffer=null;exposureBuffer=null;pipeline=null;initPromise=null;loading=null;group0=null;layout0=null;layout1=null;sampler=null;shadowContext?.unconfigure();shadowContext=null;shadowCanvas=null;context?.unconfigure();context=null;canvas=null;levelId=null;lastSprites=0;lastShadowDraws=0;lastGroundedSprites=0;lastGrounding=[];lastDraws=0;packed=[];error=null;status="idle";report(); }
    function suspend() { if(loading || initPromise)dispose();else stop(); }
    global.AtlasWebGPUCapabilities.subscribe(value=>{
      if(["requesting-device","recovering"].includes(status) && value.status==="recovering"){status="recovering";report();}
    });
    global.addEventListener("pagehide",suspend);
    global.addEventListener("pageshow",()=>sync());
    document.addEventListener("visibilitychange",()=>{if(document.hidden)suspend();});
    return { sync, stop, dispose, snapshot, refreshSettings, getSettings: () => contract.clone(settings) };
  }
  global.AtlasCinematicRenderer = { createRuntime, requiresGPU, packEffects, shadowTarget, smoothShadow, receiverMatchedAlpha };
})(window);
