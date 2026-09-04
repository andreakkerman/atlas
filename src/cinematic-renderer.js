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
        if (key === "particles") { v.set([item.count, item.speed, item.turbulence, item.lifetime], 16); v.set([item.opacity, item.glow, item.gravity, item.randomness], 20); }
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
  function createRuntime(options) {
    let device, context, canvas, pipeline, uniform, effectBuffer, exposureBuffer, sampler, group0, layout0, layout1;
    let background, levelId, loading, generation = 0, raf = 0, lastTime = 0, frame = 0, lastReport = 0;
    let status = "idle", error = null, averageMs = 0, fps = 0, targets = [], drawBuffers = [], drawCursor = 0;
    let settings = contract.normalize(), packed = [], settingsKey = "", uploaded = new Map(), effectTextures = new Map(), spriteFallbacks = new Map();
    let pendingPresentation = false, presented = false, lastSprites = 0, lastDraws = 0, lastShadowDraws = 0, lastGroundedSprites = 0, lastGrounding = [], initPromise, frameDt=1/60;
    let effective=contract.effective(settings), depthTexture, emptyDepth, depthStatus="none", depthPath=null, depthLoads=0, bindGroups=0, computeGroup;
    const depthCache=new Map(), bindings=new WeakMap(), shadowStates=new Map();
    const active = () => options.getRenderer() === "cinematic";
    const snapshot = () => ({ status, error, ready: presented, levelId, frame, averageMs, fps, sprites: lastSprites, drawCalls: lastDraws, shadowDraws: lastShadowDraws, groundedSprites:lastGroundedSprites, grounding:lastGrounding, shadowStates:[...shadowStates].map(([key,value])=>({key,...value})), particles: packed.filter(e => e.key === "particles" && e.data[1]).reduce((n, e) => n + e.item.count, 0), waterSurfaces: packed.filter(e => e.key === "waterSurface" && e.data[1]).length, waterSparkles: packed.filter(e => e.key === "waterSparkles" && e.data[1]).length, depthStatus, depthPath, depthLoads, depthCached:depthCache.size, bindGroups, resolution: canvas ? [canvas.width, canvas.height] : [0, 0], backend: "WebGPU" });
    function report() {
      document.querySelector(".gameShell")?.classList.toggle("cinematicReady", active() && presented);
      options.onStatus?.(snapshot());
    }
    function fail(caught, fallback = "frame-error") {
      stop(); error = caught?.message || String(caught); status = caught?.atlasWebGPUCategory || fallback; presented = false; report();
      // An in-scene error banner is intentional; do not silently claim a successful GPU fallback.
    }
    async function initialize() {
      if (pipeline) return;
      if (initPromise) return initPromise;
      initPromise = (async () => {
        status = "requesting-device"; report();
        device = await global.AtlasWebGPUCapabilities.requestDevice("cinematic");
        const currentDevice = device;
        device.addEventListener("uncapturederror", event => { if (active() && device === currentDevice) fail(event.error, "gpu-validation-error"); });
        device.lost.then(info => {
          if (device !== currentDevice) return;
          stop(); generation++; global.AtlasWebGPUCapabilities.forgetDevice(device);
          releaseLevel(false); uniform?.destroy(); effectBuffer?.destroy(); exposureBuffer?.destroy();
          releaseDepth();
          uniform=null;effectBuffer=null;exposureBuffer=null;pipeline=null;initPromise=null;context=null;canvas=null;
          if (active()) fail(new Error(`WebGPU device lost: ${info.message || info.reason}`), "device-lost");
        });
        status = "compiling-pipelines"; report();
        const module = device.createShaderModule({ label: "Atlas Cinematic shared fields", code: global.AtlasCinematicShaders.shared });
        const messages = await module.getCompilationInfo();
        const failures = messages.messages.filter(m => m.type === "error");
        if (failures.length) throw new Error(failures.map(m => `${m.lineNum}:${m.linePos} ${m.message}`).join("\n"));
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
        const result = await Promise.all([create("sprite", "quad", "rgba16float", alpha), create("field"), create("bloomExtract"), create("blur"), create("finish", "fullscreen", navigator.gpu.getPreferredCanvasFormat()), create("particleColor", "particle", "rgba16float", add)]);
        const nextPipeline = Object.fromEntries(["sprite", "field", "extract", "blur", "finish", "particle"].map((key, i) => [key, result[i]]));
        const adaptationModule = device.createShaderModule({ label: "Cinematic adaptation", code: global.AtlasCinematicShaders.autoExposure });
        const adaptationInfo = await adaptationModule.getCompilationInfo();
        const adaptationErrors = adaptationInfo.messages.filter(m => m.type === "error");
        if (adaptationErrors.length) throw new Error(adaptationErrors.map(m => `${m.lineNum}:${m.linePos} ${m.message}`).join("\n"));
        nextPipeline.adapt = await device.createComputePipelineAsync({ layout: "auto", compute: { module: adaptationModule, entryPoint: "adapt" } });
        uniform = device.createBuffer({ size: 512, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
        effectBuffer = device.createBuffer({ size: 128 * 256, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
        exposureBuffer = device.createBuffer({ size: 16, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
        sampler = device.createSampler({ minFilter: "linear", magFilter: "linear" });
        emptyDepth=texture(1,1);device.queue.writeTexture({texture:emptyDepth.texture},new Uint8Array([0,0,0,255]),{bytesPerRow:4},[1,1]);
        depthTexture=emptyDepth;bindDepth();
        pipeline = nextPipeline;
      })();
      try { await initPromise; } finally { initPromise = null; }
    }
    function texture(width, height, format = "rgba8unorm") {
      const tex = device.createTexture({ size: [width, height], format, usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT });
      return { texture: tex, view: tex.createView(), width, height };
    }
    function upload(image, old) {
      const width = image.naturalWidth || image.width, height = image.naturalHeight || image.height;
      const resource = old || texture(width, height);
      device.queue.copyExternalImageToTexture({ source: image }, { texture: resource.texture, premultipliedAlpha: false }, [width, height]);
      return resource;
    }
    function bindDepth() {
      group0=device.createBindGroup({layout:layout0,entries:[... [uniform,effectBuffer,exposureBuffer].map((buffer,binding)=>({binding,resource:{buffer}})),{binding:3,resource:depthTexture.view},{binding:4,resource:sampler}]});bindGroups++;
    }
    function releaseDepth() { for(const resource of depthCache.values()) resource?.texture.destroy();depthCache.clear();emptyDepth?.texture.destroy();emptyDepth=null;depthTexture=null;depthStatus="none";depthPath=null; }
    async function loadDepth(level, token) {
      // Every Atlas level owns the conventional assets/depthmap.png. An explicit
      // world.depthmap can still override that path for future special cases.
      const path=level.world.depthmap || `Levels/${level.id}/assets/depthmap.png`;
      depthPath=path;depthStatus=path?"loading":"none";depthTexture=emptyDepth;
      if(path && !depthCache.has(path)) {
        let resource=null;
        try { const img=new Image();img.src=path;await img.decode();if(token!==generation)return;resource=upload(img);depthLoads++; }
        catch { if(token!==generation)return; }
        depthCache.set(path,resource);
      }
      if(token!==generation)return;
      depthTexture=depthCache.get(path)||emptyDepth;depthStatus=depthTexture===emptyDepth?(path?"unavailable":"none"):"ready";
      bindDepth();
    }
    function releaseLevel(resetExposure = true) {
      background?.texture.destroy(); background = null;
      for (const item of uploaded.values()) item.texture.destroy(); uploaded.clear();
      spriteFallbacks.clear();
      for (const item of effectTextures.values()) item.texture.destroy(); effectTextures.clear();
      targets.forEach(t => t.texture.destroy()); targets = [];
      drawBuffers.forEach(b => b.destroy()); drawBuffers = [];
      settingsKey = ""; frame = 0; lastTime = 0; presented = false; pendingPresentation = false;
      shadowStates.clear();
      computeGroup=null;depthTexture=emptyDepth;depthStatus="none";depthPath=null;
      if (resetExposure && device && exposureBuffer) device.queue.writeBuffer(exposureBuffer, 0, new Float32Array(4));
    }
    function refreshSettings() {
      const value = options.getSettings(options.getLevel()?.id);
      const cues=options.getGameplayCues?.() || [];
      const key = JSON.stringify([value,cues]);
      if (key === settingsKey) return;
      settingsKey = key; settings = contract.normalize(value); effective=contract.effective(settings);packed = packEffects(settings);
      if(effective.gameplayCues.enabled) for(const cue of cues.slice(0,48)) {
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
      put(2, [level.world.width, packed.some(e => e.data[1] && (e.data[0] < 4 || e.data[0] === 6 || e.data[0] === 7 || e.data[0] === 8)) || s.bloom.enabled || graded ? 1 : 0, 0, 0]);
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
      let sources=bindings.get(buffer);if(!sources)bindings.set(buffer,sources=new WeakMap());
      let auxiliaries=sources.get(source);if(!auxiliaries)sources.set(source,auxiliaries=new WeakMap());
      let group=auxiliaries.get(aux);
      if(!group){group=device.createBindGroup({ layout: layout1, entries: [{ binding: 0, resource: source.view }, { binding: 1, resource: sampler }, { binding: 2, resource: aux.view }, { binding: 3, resource: { buffer } }] });auxiliaries.set(aux,group);bindGroups++;}
      pass.setBindGroup(1,group);
    }
    function resize() {
      // Bound fill rate on Retina/iPad. Editor geometry stays in world coordinates.
      const ratio = Math.min(global.devicePixelRatio || 1, 1.5);
      const width = Math.max(2, Math.min(1920, Math.round(canvas.clientWidth * ratio)));
      const height = Math.max(2, Math.min(1440, Math.round(canvas.clientHeight * ratio)));
      if (canvas.width === width && canvas.height === height && targets.length) return;
      canvas.width = width; canvas.height = height; targets.forEach(t => t.texture.destroy());
      targets = [texture(width, height, "rgba16float"), texture(width, height, "rgba16float"), ...Array.from({ length: 3 }, () => texture(Math.max(2, width >> 2), Math.max(2, height >> 2), "rgba16float"))];
      computeGroup=device.createBindGroup({layout:pipeline.adapt.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:uniform}},{binding:1,resource:targets[1].view},{binding:2,resource:{buffer:exposureBuffer}}]});bindGroups++;
    }
    function sprites(stage) {
      const entries = [];
      const add = (image, bounds, key, character = false, mirror = false) => {
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
        const cacheKey = source.currentSrc || source.src;
        let resource = uploaded.get(cacheKey);
        if (!resource && source.complete && source.naturalWidth) { resource = upload(source); uploaded.set(cacheKey, resource); }
        if (resource) spriteFallbacks.set(key, resource);
        else resource = spriteFallbacks.get(key);
        if (!resource) return;
        resource.used = frame;
        const animal=bounds.closest('.ambientAnimal,.ambientFlyby');
        const style=getComputedStyle(animal || bounds);
        const grounding=!animal&&character?displayedGrounding(analyzeSpriteGrounding(source),mirror):null;
        entries.push({ key, resource, grounding, rect: [(rect.left-stage.left)/stage.width, (rect.top-stage.top)/stage.height, rect.width/stage.width, rect.height/stage.height], flags: [+character, +mirror, +key.startsWith("flyby:"), 0], facing:key.startsWith("npc:")?(mirror?"mirrored":"native"):(image.dataset.resolvedFacing||"native"), opacity: animal ? Number(style.opacity) : 1, appearance: animal ? {saturation:Number(animal.dataset.saturation ?? (style.getPropertyValue('--flyby-saturation').trim() || 1))} : character ? options.getCharacterAppearance(key) : undefined, softness:animal ? Number(animal.dataset.softness ?? parseFloat(style.getPropertyValue('--flyby-softness')))||0 : 0, kind: key.startsWith("npc:") ? "npc" : "sven", shadow: !animal && settings.layers.characters !== false && effective.characters.groundingShadow && options.getGroundingShadow?.(key) !== false });
      };
      document.querySelectorAll(".ambientFlyby[data-active='true'][data-ready='true']").forEach(el => { const img = el.querySelector(el.dataset.frame === "b" ? ".ambientFlybyFrameB" : ".ambientFlybyFrameA"); add(img, img, `flyby:${el.dataset.ambientFlyby}`,true); });
      document.querySelectorAll(".ambientAnimal[data-ready='true']").forEach(el => add(el.querySelector(el.dataset.frame === "closed" ? ".ambientAnimalClosed" : ".ambientAnimalOpen"), el, `animal:${el.dataset.ambientAnimal}`, true, el.dataset.mirrorX === "true"));
      document.querySelectorAll("[data-npc-challenge] [data-npc-sprite]").forEach(img => { const el = img.closest("[data-npc-challenge]"); add(img, el, `npc:${el.dataset.npcChallenge}`, true, Number(el.dataset.npcFacingScale) < 0); });
      const actor = document.querySelector("[data-actor='sven']"); add(actor, actor, "actor:sven", true);
      if (uploaded.size > 96) for (const [key, resource] of uploaded) { if (resource.used < frame - 2 && ![...spriteFallbacks.values()].includes(resource)) { resource.texture.destroy(); uploaded.delete(key); } }
      return entries;
    }
    function renderFrame(timestamp) {
      raf = 0;
      if (!active() || !canvas?.isConnected || !background || document.hidden) return;
      try {
        const start = performance.now(); refreshSettings(); resize(); globals(timestamp); drawCursor = 0;
        const encoder = device.createCommandEncoder({ label: "Cinematic frame" });
        const begin = (view, loadOp = "clear") => encoder.beginRenderPass({ colorAttachments: [{ view, clearValue: [0, 0, 0, 0], loadOp, storeOp: "store" }] });
        const worldUV = [options.getCameraX()/options.getLevel().world.width, 0, (options.getViewportWorldWidth() || options.getLevel().world.width)/options.getLevel().world.width, 1];
        let pass = begin(targets[0].view); pass.setPipeline(pipeline.sprite);
        bind(pass, background, background, { uv: worldUV, appearance: options.getBackgroundAppearance?.() }); pass.draw(6);
        const drawLegacy = slot => {
          const retained = (options.getLevel().sceneEffects || []).some(effect => effect.enabled !== false && !contract.replacedPresets.has(effect.presetId) && (effect.layerSlot || global.AtlasSceneEffects.presetById(effect.presetId)?.layerSlot || "worldAtmosphere") === slot);
          if (!retained) return;
          const el = document.querySelector(`[data-scene-effects-canvas="${slot}"]`);
          if (!el?.width || !el.height) return;
          if (!el.getContext("2d")) return;
          let resource = effectTextures.get(slot);
          if (resource && (resource.width !== el.width || resource.height !== el.height)) { resource.texture.destroy(); resource = null; }
          resource = upload(el, resource); effectTextures.set(slot, resource);
          bind(pass, resource, background, { uv: worldUV }); pass.draw(6);
        };
        drawLegacy("backgroundAtmosphere"); drawLegacy("worldAtmosphere"); drawLegacy("worldLight");
        pass.end();
        const full = (type, target, source, auxiliary, config) => { const p = begin(target); p.setPipeline(pipeline[type]); bind(p, source, auxiliary, config); p.draw(3); p.end(); };
        full("field", targets[1].view, targets[0], background);
        // Characters sample the field themselves; a second scene-wide light multiply would
        // double-light sprites and defeat the character influence control.
        const entries = sprites(canvas.getBoundingClientRect()); lastSprites = entries.length;
        const shadowEntries=entries.filter(item => item.shadow);lastShadowDraws=shadowEntries.length;
        pass = begin(targets[1].view, "load"); pass.setPipeline(pipeline.sprite);
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
         pass.end();
         // Visible characters are deliberately isolated from the larger shadow
         // quads. A two-device-pixel transparent gutter keeps linear filtering
         // and raster coverage away from the exact frame edge without changing
         // the original sprite-to-screen mapping.
         pass = begin(targets[1].view, "load"); pass.setPipeline(pipeline.sprite);
         for (const entry of entries) {
           let visible=entry;
           if(entry.key==="actor:sven"||entry.key.startsWith("npc:")){
             const padX=2/canvas.width,padY=2/canvas.height,[x,y,w,h]=entry.rect,uvPadX=padX/Math.max(w,1/canvas.width),uvPadY=padY/Math.max(h,1/canvas.height);
             visible={...entry,rect:[x-padX,y-padY,w+padX*2,h+padY*2],uv:[-uvPadX,-uvPadY,1+uvPadX*2,1+uvPadY*2]};
           }
           bind(pass, entry.resource, background, visible); pass.draw(6);
         }
         if(effective.characters.showShadowContactDebug)for(const debug of contactDebug){bind(pass,background,background,{flags:[0,0,0,2],shadow:[debug.left.x,debug.left.y,debug.right.x,debug.right.y]});pass.draw(6);}
         drawLegacy("foregroundAtmosphere"); pass.end();
        const particleFields = packed.map((e, i) => ({ ...e, index: i })).filter(e => e.key === "particles" && e.data[1]);
        if (particleFields.length) { pass = begin(targets[1].view, "load"); pass.setPipeline(pipeline.particle); for (const e of particleFields) { bind(pass, background, background, { flags: [e.index, 0, 0, 0] }); pass.draw(6, e.item.count); } pass.end(); }
        if (effective.bloom.enabled) {
          full("extract", targets[2].view, targets[1], background);
          full("blur", targets[3].view, targets[2], background, { flags: [0, 0, 1/targets[2].width, 0] });
          full("blur", targets[4].view, targets[3], background, { flags: [0, 0, 0, 1/targets[3].height] });
        }
        const compute = encoder.beginComputePass(); compute.setPipeline(pipeline.adapt); compute.setBindGroup(0,computeGroup); compute.dispatchWorkgroups(1); compute.end();
        full("finish", context.getCurrentTexture().createView(), targets[1], targets[4]);
        device.queue.submit([encoder.finish()]); frame++; lastDraws = drawCursor;
        averageMs = averageMs ? averageMs*0.95+(performance.now()-start)*0.05 : performance.now()-start;
        if (!presented && !pendingPresentation) {
          pendingPresentation = true; const token = generation; const targetCanvas = canvas;
          device.queue.onSubmittedWorkDone().then(() => { if(token !== generation || targetCanvas !== canvas || !active()) return; pendingPresentation=false;presented=true;status="ready";report(); }).catch(caught => { if (token === generation && active()) fail(caught); });
        }
        if (timestamp-lastReport > 500) { lastReport=timestamp;report(); }
        raf = requestAnimationFrame(renderFrame);
      } catch (caught) { fail(caught); }
    }
    async function sync() {
      if (!active()) { stop(); generation++; presented = false; pendingPresentation=false; lastShadowDraws=0; status = "inactive"; report(); return; }
      const nextCanvas = document.querySelector("[data-cinematic-canvas]"); const level = options.getLevel();
      if (!nextCanvas || !level) { stop(); return; }
      if (loading?.level === level.id && loading.canvas === nextCanvas) return loading.promise;
      if (levelId === level.id && background && canvas === nextCanvas) {
        // render() retains this canvas but replaces .gameShell. Restore its presentation
        // state synchronously, before the browser paints, not on the 500ms metrics tick.
        document.querySelector(".gameShell")?.classList.toggle("cinematicReady", presented);
        refreshSettings(); if (!raf) raf=requestAnimationFrame(renderFrame); return;
      }
      const token = ++generation; stop(); presented=false;pendingPresentation=false;report();
      const promise = (async () => {
        try {
          await initialize(); if (token !== generation || !active()) return;
          if (levelId !== level.id || !background) {
            releaseLevel(); levelId=level.id; status="loading-artwork";report();
            const img = new Image(); img.src=level.world.background; await img.decode();
            if (token !== generation || !active()) return;
            background=upload(img);
            await loadDepth(level,token);if(token!==generation || !active())return;
          }
          canvas=nextCanvas; context=canvas.getContext("webgpu"); if (!context) throw new Error("WebGPU canvas context unavailable");
          context.configure({ device, format: navigator.gpu.getPreferredCanvasFormat(), alphaMode: "opaque" });
          refreshSettings(); error=null;status="rendering-first-frame";report();raf=requestAnimationFrame(renderFrame);
        } catch(caught) { if(token===generation) fail(caught,"renderer-initialization-failed"); }
      })();
      loading={level:level.id,canvas:nextCanvas,promise}; await promise; if(loading?.promise===promise) loading=null;
    }
    function stop() { if(raf)cancelAnimationFrame(raf);raf=0; }
    function dispose() { generation++;stop();releaseLevel();context?.unconfigure();context=null;canvas=null;levelId=null;status="idle";report(); }
    return { sync, stop, dispose, snapshot, refreshSettings, getSettings: () => contract.clone(settings) };
  }
  global.AtlasCinematicRenderer = { createRuntime, packEffects, shadowTarget, smoothShadow, receiverMatchedAlpha };
})(window);
