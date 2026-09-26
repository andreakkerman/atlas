(function () {
  "use strict";

  const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);
  const AUDIO_EXTENSIONS = new Set([".mp3", ".ogg", ".wav"]);
  const FLYBY_HIT_ALPHA_THRESHOLD = 32;

  const actions = new Map();
  function registerAction(id, handler) {
    if (!/^[\w-]+$/.test(id) || typeof handler !== "function") throw new Error("Invalid flyby action registration.");
    actions.set(id, handler);
    return () => { if (actions.get(id) === handler) actions.delete(id); };
  }
  function framesFor(config) { return Array.isArray(config.frames) ? config.frames : [config.frameA, config.frameB].filter(Boolean); }
  function playbackFor(config) { return config.playback || (config.frames ? "static" : config.frameB ? "legacy" : "static"); }
  const graphicsControls = {
    brightness: {label:'Brightness', min:0, max:2, step:0.01, neutral:1, help:'1 = neutral'},
    contrast: {label:'Contrast', min:0, max:2, step:0.01, neutral:1, help:'1 = neutral'},
    saturation: {label:'Saturation', min:0, max:2, step:0.01, neutral:1, help:'1 = neutral; 0 = grayscale'},
    warmth: {label:'Warmth', min:-1, max:1, step:0.01, neutral:0, help:'Negative = cooler; positive = warmer'},
    tint: {label:'Tint', min:-1, max:1, step:0.01, neutral:0, help:'Negative = greener; positive = more magenta'},
    softness: {label:'Softness', min:0, max:8, step:0.25, neutral:0, help:'Blur in pixels; 0 = neutral'}
  };
  function graphicsFor(config) {
    return Object.fromEntries(Object.entries(graphicsControls).map(([key,control])=>[key,
      Number.isFinite(config[key]) ? Math.max(control.min,Math.min(['softness','saturation'].includes(key)?Infinity:control.max,config[key])) : control.neutral]));
  }
  function hasColorAdjustment(config) {
    const g=graphicsFor(config);
    return g.brightness!==1 || g.contrast!==1 || g.warmth!==0 || g.tint!==0;
  }
  function canvasVisual(config) { return Boolean(config.frames || config.depthOcclusion || config.playback || hasColorAdjustment(config)); }
  // Process only the current frame, in straight-alpha sRGB. Never modify alpha or
  // retained source images. Temperature/tint offsets have zero Rec.709 luminance.
  function adjustGraphics(pixels, config) {
    const g=graphicsFor(config), data=pixels.data;
    const rShift=0.12*g.warmth+0.08*g.tint, bShift=-0.12*g.warmth+0.08*g.tint;
    const gShift=-(0.2126*rShift+0.0722*bShift)/0.7152;
    for(let i=0;i<data.length;i+=4) if(data[i+3]) {
      data[i]=255*((data[i]/255*g.brightness-0.5)*g.contrast+0.5+rShift);
      data[i+1]=255*((data[i+1]/255*g.brightness-0.5)*g.contrast+0.5+gShift);
      data[i+2]=255*((data[i+2]/255*g.brightness-0.5)*g.contrast+0.5+bShift);
    }
    return pixels;
  }
  function depthPathFor(level) { return level.world.depthmap || `Levels/${level.id}/assets/depthmap.png`; }
  function sequenceErrors(config) {
    const errors = [], frames = framesFor(config);
    for(const [field,control] of Object.entries(graphicsControls)) {
      const max=['softness','saturation'].includes(field)?Infinity:control.max;
      if(config[field]!==undefined && (!Number.isFinite(config[field]) || config[field]<control.min || config[field]>max))errors.push(`${field} must be finite and between ${control.min} and ${max}`);
    }
    if (config.frames !== undefined && (!Array.isArray(config.frames) || !frames.length || frames.some(p => typeof p !== "string" || !p) || new Set(frames).size !== frames.length)) errors.push("frames must be a nonempty unique ordered array of image paths");
    if (config.playback !== undefined && !["static", "loop", "once"].includes(config.playback)) errors.push("invalid playback");
    if (config.animationFps !== undefined && (!Number.isFinite(config.animationFps) || config.animationFps < 1 || config.animationFps > 60)) errors.push("animationFps must be 1–60");
    if (config.movementEndFrame !== undefined && (!Number.isInteger(config.movementEndFrame) || config.movementEndFrame < 1 || config.movementEndFrame > frames.length)) errors.push("movementEndFrame must identify a frame (1-based)");
    if (config.endBehavior !== undefined && !["despawn", "hold"].includes(config.endBehavior)) errors.push("invalid endBehavior");
    if (config.depthOcclusion !== undefined && typeof config.depthOcclusion !== "boolean") errors.push("depthOcclusion must be boolean");
    if (config.enabled !== undefined && typeof config.enabled !== "boolean") errors.push("enabled must be boolean");
    if (config.depthBias !== undefined && (!Number.isFinite(config.depthBias) || Math.abs(config.depthBias) > 1)) errors.push("depthBias must be -1–1");
    if (config.actions !== undefined && (!config.actions || typeof config.actions !== "object" || Array.isArray(config.actions) || Object.entries(config.actions).some(([k,v]) => !["onTap", "onAnimationComplete"].includes(k) || (v !== null && (typeof v !== "string" || !/^[\w-]+$/.test(v)))))) errors.push("actions must map onTap/onAnimationComplete to action IDs or null");
    return errors;
  }

  function soundTriggers(config = {}) {
    return Array.isArray(config.soundTriggers)
      ? ["during", "tap"].filter(trigger => config.soundTriggers.includes(trigger))
      : [config.soundTrigger === "tap" ? "tap" : "during"];
  }

  function validSoundTriggers(config = {}) {
    if (config.soundTriggers !== undefined) return Array.isArray(config.soundTriggers)
      && config.soundTriggers.every(trigger => ["during", "tap"].includes(trigger))
      && new Set(config.soundTriggers).size === config.soundTriggers.length;
    return config.soundTrigger === undefined || ["during", "tap"].includes(config.soundTrigger);
  }

  function normalizedAssetPath(value) {
    return String(value || "").trim().replace(/\\/g, "/").replace(/^\.\//, "");
  }

  function extensionFor(value) {
    const path = normalizedAssetPath(value).split(/[?#]/)[0];
    const dot = path.lastIndexOf(".");
    return dot === -1 ? "" : path.slice(dot).toLowerCase();
  }

  function createAssetCache(options = {}) {
    const images = new Map();
    const audio = new Map();
    const warn = options.warn || (() => {});

    function image(path) {
      const key = normalizedAssetPath(path);
      if (!key) return Promise.reject(new Error("Missing image path."));
      if (!IMAGE_EXTENSIONS.has(extensionFor(key))) {
        return Promise.reject(new Error(`Unsupported image: ${key}`));
      }
      if (images.has(key)) return images.get(key);
      const decodeSource = (source, objectUrl = null) => new Promise((resolve, reject) => {
        const element = new Image();
        let settled = false;
        const fail = () => {
          if (settled) return;
          settled = true;
          reject(new Error(`Image failed: ${key}`));
        };
        const finish = async () => {
          if (settled) return;
          try {
            if (typeof element.decode === "function") await element.decode();
            if (!element.complete || !element.naturalWidth) throw new Error(`Image decoded without renderable pixels: ${key}`);
            settled = true;
            if (objectUrl) element._atlasObjectUrl = objectUrl;
            resolve(element);
          } catch {
            fail();
          }
        };
        element.decoding = "sync";
        element.addEventListener("load", finish, { once: true });
        element.addEventListener("error", fail, { once: true });
        element.src = source;
        if (element.complete && element.naturalWidth) finish();
      });
      const useObjectUrl = window.location?.protocol === "http:" || window.location?.protocol === "https:";
      const promise = (useObjectUrl
        ? window.fetch(key).then((response) => {
          if (!response.ok) throw new Error(`Image request failed (${response.status}): ${key}`);
          return response.blob();
        }).then((blob) => {
          const objectUrl = window.URL.createObjectURL(blob);
          return decodeSource(objectUrl, objectUrl).catch((error) => {
            window.URL.revokeObjectURL(objectUrl);
            throw error;
          });
        })
        : decodeSource(key)
      ).catch((error) => {
        warn(error.message);
        throw error;
      });
      images.set(key, promise);
      return promise;
    }

    function sound(path) {
      const key = normalizedAssetPath(path);
      if (!key) return Promise.resolve(null);
      if (!AUDIO_EXTENSIONS.has(extensionFor(key))) {
        return Promise.reject(new Error(`Unsupported audio: ${key}`));
      }
      if (audio.has(key)) return audio.get(key);
      const promise = new Promise((resolve, reject) => {
        const element = new Audio();
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          resolve(element);
        };
        const fail = () => {
          if (settled) return;
          settled = true;
          reject(new Error(`Audio failed: ${key}`));
        };
        element.preload = "auto";
        element.addEventListener("canplaythrough", finish, { once: true });
        element.addEventListener("loadeddata", finish, { once: true });
        element.addEventListener("error", fail, { once: true });
        element.src = key;
        if (typeof element.load === "function") element.load();
        window.setTimeout(finish, 1800);
      }).catch((error) => {
        warn(error.message);
        throw error;
      });
      audio.set(key, promise);
      return promise;
    }

    function releaseImage(path) {
      const promise = images.get(path);
      images.delete(path);
      promise?.then((element) => {
        if (element?._atlasObjectUrl) window.URL.revokeObjectURL(element._atlasObjectUrl);
      }).catch(() => {});
    }

    function invalidate(paths = []) {
      paths.map(normalizedAssetPath).filter(Boolean).forEach((path) => {
        releaseImage(path);
        audio.delete(path);
      });
    }

    function releaseImages(paths = []) {
      paths.map(normalizedAssetPath).filter(Boolean).forEach(releaseImage);
    }

    return { images, audio, image, sound, invalidate, releaseImages, normalize: normalizedAssetPath };
  }

  function smoothControlPoints(points, iterations = 3) {
    let route = (points || []).map((point) => ({ x: Number(point.x), y: Number(point.y) }));
    if (route.length < 2) return route;
    for (let pass = 0; pass < iterations; pass += 1) {
      const next = [route[0]];
      for (let index = 0; index < route.length - 1; index += 1) {
        const from = route[index];
        const to = route[index + 1];
        next.push(
          { x: from.x * 0.75 + to.x * 0.25, y: from.y * 0.75 + to.y * 0.25 },
          { x: from.x * 0.25 + to.x * 0.75, y: from.y * 0.25 + to.y * 0.75 }
        );
      }
      next.push(route[route.length - 1]);
      route = next;
    }
    return route;
  }

  function flybyMotionProfile(config = {}) {
    return String(config.motionProfile || "smooth").toLowerCase() === "organic" ? "organic" : "smooth";
  }

  function organicFlybyOptions(config = {}) {
    const organic = flybyMotionProfile(config) === "organic";
    return {
      profile: organic ? "organic" : "smooth",
      wobble: organic ? Math.max(0, Number(config.wobble ?? 14) || 0) : 0,
      speedVariation: organic ? Math.max(0, Math.min(0.45, Number(config.speedVariation ?? 0.14) || 0)) : 0,
      flutterFrequency: organic ? Math.max(0.1, Number(config.flutterFrequency ?? 2.1) || 2.1) : 0
    };
  }

  function organicPhase(seed = "") {
    let hash = 0;
    for (const char of String(seed)) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return (hash % 6283) / 1000;
  }

  function organicPathSamples(samples, options, seed = "") {
    if (options.profile !== "organic" || samples.length < 3 || !options.wobble) return samples;
    const phase = organicPhase(seed);
    return samples.map((point, index) => {
      if (index === 0 || index === samples.length - 1) return point;
      const before = samples[index - 1];
      const after = samples[index + 1];
      const dx = after.x - before.x;
      const dy = after.y - before.y;
      const length = Math.max(0.0001, Math.hypot(dx, dy));
      const progress = index / Math.max(1, samples.length - 1);
      const envelope = Math.sin(progress * Math.PI);
      const wave = Math.sin(progress * Math.PI * 2 * options.flutterFrequency + phase);
      const flutter = Math.sin(progress * Math.PI * 9 + phase * 0.7) * 0.28;
      const offset = options.wobble * envelope * (wave + flutter);
      return {
        x: point.x + (-dy / length) * offset * 0.45,
        y: point.y + (dx / length) * offset
      };
    });
  }

  function buildPathCache(points, config = {}) {
    const options = organicFlybyOptions(config);
    const samples = organicPathSamples(smoothControlPoints(points), options, config.id);
    const cumulative = [0];
    let totalLength = 0;
    for (let index = 1; index < samples.length; index += 1) {
      totalLength += Math.hypot(
        samples[index].x - samples[index - 1].x,
        samples[index].y - samples[index - 1].y
      );
      cumulative.push(totalLength);
    }
    return { samples, cumulative, totalLength, motionProfile: options.profile };
  }

  function organicSpeedFactor(config = {}, elapsed = 0, progress = 0) {
    const options = organicFlybyOptions(config);
    if (options.profile !== "organic" || !options.speedVariation) return 1;
    const phase = organicPhase(config.id);
    const wave = Math.sin(elapsed * options.flutterFrequency * Math.PI * 2 + phase);
    const drift = Math.sin(progress * Math.PI * 4 + phase * 0.5) * 0.35;
    return Math.max(0.55, Math.min(1.45, 1 + options.speedVariation * (wave + drift)));
  }

  function pointAtDistance(cache, distance) {
    if (!cache?.samples?.length) return { x: 0, y: 0, angle: 0, progress: 0 };
    if (cache.samples.length === 1 || cache.totalLength <= 0) {
      return { ...cache.samples[0], angle: 0, progress: 1 };
    }
    const target = Math.max(0, Math.min(cache.totalLength, distance));
    let low = 1;
    let high = cache.cumulative.length - 1;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (cache.cumulative[mid] < target) low = mid + 1;
      else high = mid;
    }
    const index = low;
    const from = cache.samples[index - 1];
    const to = cache.samples[index];
    const segmentStart = cache.cumulative[index - 1];
    const segmentLength = Math.max(0.0001, cache.cumulative[index] - segmentStart);
    const t = (target - segmentStart) / segmentLength;
    return {
      x: from.x + (to.x - from.x) * t,
      y: from.y + (to.y - from.y) * t,
      angle: Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI,
      progress: target / cache.totalLength
    };
  }

  function volumeEnvelope(progress) {
    const smooth = (value) => value * value * (3 - 2 * value);
    if (progress <= 0.2) return smooth(progress / 0.2);
    if (progress >= 0.8) return smooth((1 - progress) / 0.2);
    return 1;
  }

  function createFlybyRuntime(options) {
    const getLevel = options.getLevel;
    const getScreen = options.getScreen;
    const assetCache = options.assetCache;
    const warn = options.warn || (() => {});
    const getAudioUnlocked = options.getAudioUnlocked || (() => false);
    const getMasterVolume = options.getMasterVolume || (() => 1);
    const readiness = new Map();
    const pathCaches = new Map();
    const timers = new Map();
    const active = new Map();
    let hitCanvas = null;

    function displayedFrame(id) {
      const shell=document.querySelector(`[data-ambient-flyby="${CSS.escape(id)}"]`), instance=active.get(id);
      if(!shell || !instance || shell.dataset.active!=='true' || !readiness.get(keyFor(id))?.ready)return null;
      const canvas=shell.querySelector('[data-flyby-canvas]');
      const index=canvas?Number(canvas.dataset.frameIndex||0):(shell.dataset.frame==='b'?1:0);
      const image=readiness.get(keyFor(id)).images?.[index];
      if(!image)return null;
      return {shell,instance,canvas,image,width:canvas?.width||image.naturalWidth,height:canvas?.height||image.naturalHeight};
    }

    // Interaction-only, bounded current-frame readback; never prepare a hitmask
    // per animation frame. Debug overlays are replaced with source × depth alpha.
    function hitAlpha(id, u, v) {
      const frame=displayedFrame(id), config=configById(id);
      if(!frame || !config || !Number.isFinite(u+v) || u<0 || v<0 || u>=1 || v>=1)return 0;
      const {canvas,image,width,height,instance,shell}=frame, x=Math.floor(u*width), y=Math.floor(v*height);
      const debug=depthDebug && config.depthOcclusion && instance.mask;
      const source=canvas&&!debug?canvas:image;
      const read=(sx,sy,w,h)=>{
        const scratch=hitCanvas||(hitCanvas=document.createElement('canvas'));
        if(scratch.width!==w||scratch.height!==h){scratch.width=w;scratch.height=h;}
        const ctx=scratch.getContext('2d',{willReadFrequently:true});ctx.clearRect(0,0,w,h);ctx.drawImage(source,-sx,-sy);
        if(debug){ctx.globalCompositeOperation='destination-in';ctx.drawImage(instance.mask,-sx,-sy);ctx.globalCompositeOperation='source-over';}
        return ctx.getImageData(0,0,w,h).data;
      };
      const softness=graphicsFor(config).softness;
      if(!softness)return read(x,y,1,1)[3];
      // Match the existing Cinematic five-tap alpha blur. Illustrated CSS blur
      // is Gaussian in frame-local CSS pixels (bounded to a 129×129 readback).
      if(document.querySelector('.gameShell.cinematicReady')){
        const rect=(canvas||shell.querySelector('.ambientFlybyFrame')).getBoundingClientRect();
        const dx=softness*width/Math.max(1,rect.width),dy=softness*height/Math.max(1,rect.height);
        const sample=(px,py)=>read(Math.floor(Math.max(0,Math.min(width-1,px))),Math.floor(Math.max(0,Math.min(height-1,py))),1,1)[3];
        return sample(x,y)*.4+(sample(x-dx,y)+sample(x+dx,y)+sample(x,y-dy)+sample(x,y+dy))*.15;
      }
      const sigma=Math.min(softness*width/Math.max(1,shell.offsetWidth),64/3),radius=Math.ceil(sigma*3),size=radius*2+1;
      const pixels=read(x-radius,y-radius,size,size);let sum=0,weight=0;
      for(let py=-radius;py<=radius;py++)for(let px=-radius;px<=radius;px++){
        const w=Math.exp(-(px*px+py*py)/(2*sigma*sigma));weight+=w;sum+=pixels[((py+radius)*size+px+radius)*4+3]*w;
      }
      return sum/weight;
    }

    function hitTest(id, clientX, clientY) {
      const frame=displayedFrame(id);if(!frame)return null;
      const {shell,instance}=frame,rect=shell.getBoundingClientRect();
      if(clientX<rect.left||clientX>=rect.right||clientY<rect.top||clientY>=rect.bottom||!rect.width||!rect.height)return null;
      // The world track translates for the camera; viewport sizing is already
      // reflected in the current rect. Invert the sprite's scale/mirror/rotation
      // around its centre, independent of authored path or previous RAF state.
      const m=new DOMMatrix(getComputedStyle(shell).transform),det=m.a*m.d-m.b*m.c;
      if(!Number.isFinite(det)||Math.abs(det)<1e-9)return null;
      const dx=clientX-(rect.left+rect.right)/2,dy=clientY-(rect.top+rect.bottom)/2;
      const u=((m.d*dx-m.c*dy)/det)/shell.offsetWidth+.5;
      const v=((-m.b*dx+m.a*dy)/det)/shell.offsetHeight+.5;
      return hitAlpha(id,u,v)>FLYBY_HIT_ALPHA_THRESHOLD?{id,triggerId:instance.triggerId,u,v}:null;
    }

    function validateHit(hit) {
      return Boolean(hit && active.has(hit.id) && active.get(hit.id).triggerId===hit.triggerId && hitAlpha(hit.id,hit.u,hit.v)>FLYBY_HIT_ALPHA_THRESHOLD);
    }
    const pendingStarts = new Map();
    const activeAudio = new Map();
    let levelId = null;
    let rafId = null;
    let triggerSequence = 0;
    let preparation = 0;
    let depth = null;
    let depthDebug = false;
    const previewIds = new Set();
    let editVersion = 0;
    let depthPreparation = null;
    const assetPreparations = new Map();
    const preparingStates = new Map();

    function previewState(id) {
      const instance=active.get(id);
      return instance?.preview ? (instance.paused ? 'paused' : 'playing') : 'idle';
    }

    function stopPreview(id) {
      for (const key of id ? [id] : [...previewIds]) {
        const instance=active.get(key);
        if(instance?.preview) {
          for(const [audioKey,value] of activeAudio) if(value.triggerId===instance.triggerId){value.audio.pause();activeAudio.delete(audioKey);}
          cancelActive(key);
        }
        previewIds.delete(key);
      }
      if(![...active.values()].some(item=>!item.held&&!item.paused)&&!activeAudio.size){window.cancelAnimationFrame(rafId);rafId=null;}
      options.onPreviewChange?.();
    }

    function togglePreview(id) {
      const instance=active.get(id);
      if(instance&&!instance.preview){
        stopPreview();instance.preview=true;
        const config=configById(id);
        instance.legacyPhase=(instance.distance/Math.max(1,Number(config.speed)||260))*Math.max(0,Number(config.flapFrequencyHz)||0)*2;
        if(playbackFor(config)==='legacy')instance.frameIndex=Math.floor(instance.legacyPhase)%framesFor(config).length;
        previewIds.add(id);options.onPreviewChange?.();return true;
      }
      if(!instance?.preview){stopPreview();return preview(id);}
      instance.paused=!instance.paused;
      instance.lastTime=0;
      if(instance.paused && ![...active.values()].some(item=>!item.held&&!item.paused)&&!activeAudio.size){window.cancelAnimationFrame(rafId);rafId=null;}
      else ensureRaf();
      options.onPreviewChange?.();
      return true;
    }

    function refreshPreviews() {
      for(const runtime of active.values()) if((runtime.preview || runtime.held) && !runtime.rebuilding) {
        const config=configById(runtime.id);if(!config)continue;
        const cache=cacheFor(config),point=pointAtDistance(cache,runtime.distance);
        const facing=config.faceFlightDirection===false?(config.mirrorX?-1:1):(cache.samples.at(-1).x>=cache.samples[0].x?1:-1);
        const rotation=config.rotateAlongPath?Math.max(-Math.abs(Number(config.maxRotationDeg)||0),Math.min(Math.abs(Number(config.maxRotationDeg)||0),point.angle)):0;
        const shell=document.querySelector(`[data-ambient-flyby="${CSS.escape(runtime.id)}"]`);
        if(!shell)continue;
        shell.style.setProperty('--flyby-softness',`${Math.max(0,Number(config.softness)||0)}px`);
        shell.style.setProperty('--flyby-saturation',String(Math.max(0,Number(config.saturation??1))));
        shell.style.transform=`translate3d(${point.x*runtime.scaleX}px, ${point.y*runtime.scaleY}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${Number(config.scale)||0.2}) scaleX(${facing})`;
        shell.dataset.active='true';
        drawPreparedFrame(config,runtime,shell,point,rotation,facing);
      }
    }

    async function prepareDepth(selectedLevel) {
      if(depth)return;
      if(depthPreparation)return depthPreparation;
      const token=preparation;
      depthPreparation=(async()=>{
        const img=await assetCache.image(depthPathFor(selectedLevel));
        if(token!==preparation)return;
        const surface=document.createElement('canvas');surface.width=img.naturalWidth;surface.height=img.naturalHeight;
        const ctx=surface.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);
        depth={data:ctx.getImageData(0,0,surface.width,surface.height).data,width:surface.width,height:surface.height};
        surface.width=surface.height=0;
      })();
      try{await depthPreparation;}finally{if(token===preparation)depthPreparation=null;}
    }

    async function updateLevel(previous) {
      if(levelId!==getLevel()?.id)return prepareLevel(getLevel());
      const version=++editVersion, token=preparation, tasks=[];
      const old=new Map(previous.map(c=>[c.id,c]));
      for(const key of timers.keys())if(key.startsWith('one:')||key.startsWith('sync:'))clearTimer(key);
      for(const config of previous)if(!configById(config.id)||configById(config.id).enabled===false){readiness.delete(keyFor(config.id));pathCaches.delete(keyFor(config.id));}
      for(const [id,runtime] of active)if(!configById(id)||configById(id).enabled===false){if(runtime.preview)stopPreview(id);else cancelActive(id);}
      for(const config of getLevel().ambientFlybys||[]) {
        if(config.enabled===false)continue;
        const before=old.get(config.id),runtime=active.get(config.id);
        const assetsChanged=!before || JSON.stringify(framesFor(before))!==JSON.stringify(framesFor(config)) || !readiness.get(keyFor(config.id))?.ready || assetPreparations.has(keyFor(config.id));
        if(runtime && before){
          for(const sound of activeAudio.values())if(sound.triggerId===runtime.triggerId)sound.maxVolume=Number(config.soundVolume??1);
          if(JSON.stringify([before.path,before.motionProfile,before.wobble])!==JSON.stringify([config.path,config.motionProfile,config.wobble]))runtime.distance=runtime.progress*cacheFor(config).totalLength;
          if(playbackFor(before)!==playbackFor(config)||assetsChanged){
            runtime.animationTime=playbackFor(config)==='once'?runtime.progress*Math.max(0,(config.movementEndFrame??framesFor(config).length)-1):0;
            runtime.animationStep=Math.floor(runtime.animationTime);runtime.frameIndex=runtime.animationStep%framesFor(config).length;runtime.animationComplete=false;runtime.held=false;
            runtime.drawKey=null;
          }
          if(assetsChanged)runtime.rebuilding=true;
        }
        if(assetsChanged)tasks.push(prepareOne(config));
        else if(before?.sound!==config.sound && config.sound){readiness.get(keyFor(config.id)).sound=false;tasks.push(assetCache.sound(config.sound).then(()=>{const ready=readiness.get(keyFor(config.id));if(ready)ready.sound=true;}));}
      }
      if((getLevel().ambientFlybys||[]).some(c=>c.enabled!==false&&c.depthOcclusion)&&!depth)tasks.push(prepareDepth(getLevel()));
      // Compatible changes with prepared assets are synchronous, including paused masks.
      if(!tasks.length){refreshPreviews();scheduleAll();return;}
      try{await Promise.all(tasks);}catch(error){warn(`[Atlas] Flyby preview update failed: ${error.message}`);}
      if(version!==editVersion||token!==preparation)return;
      for(const runtime of active.values()) {runtime.rebuilding=false;runtime.lastTime=0;runtime.drawKey=null;}
      refreshPreviews();ensureRaf();scheduleAll();
    }

    function setDepthDebug(enabled) {
      depthDebug = Boolean(enabled && options.canDebug?.());
      for (const runtime of active.values()) {
        runtime.drawKey = null;
        if (runtime.lastDraw) {
          const {point,rotation,facing}=runtime.lastDraw;
          const shell=document.querySelector(`[data-ambient-flyby="${CSS.escape(runtime.id)}"]`);
          drawPreparedFrame(configById(runtime.id),runtime,shell,point,rotation,facing);
        }
      }
      return depthDebug;
    }

    function keyFor(id) {
      return `${levelId || getLevel()?.id}:${id}`;
    }

    function configById(id) {
      return (getLevel()?.ambientFlybys || []).find((item) => item.id === id);
    }

    function cacheFor(config) {
      const key = keyFor(config.id);
      const signature = JSON.stringify({
        path: config.path || [],
        motionProfile: flybyMotionProfile(config),
        wobble: config.wobble,
        speedVariation: config.speedVariation,
        flutterFrequency: config.flutterFrequency
      });
      const cached = pathCaches.get(key);
      if (cached?.signature === signature) return cached.value;
      const value = buildPathCache(config.path || [], config);
      pathCaches.set(key, { signature, value });
      return value;
    }

    function invalidatePath(id) {
      pathCaches.delete(keyFor(id));
    }

    function prepareOne(config) {
      const key=keyFor(config.id),signature=JSON.stringify([framesFor(config),canvasVisual(config),config.sound]);
      const pending=assetPreparations.get(key);
      if(pending?.signature===signature)return pending.promise;
      const entry={signature};
      entry.promise=prepareOneAssets(config).finally(()=>{if(assetPreparations.get(key)===entry)assetPreparations.delete(key);});
      assetPreparations.set(key,entry);
      return entry.promise;
    }

    async function prepareOneAssets(config) {
      const token = preparation;
      const key = keyFor(config.id);
      const state = { frameA: false, frameB: false, sound: false, ready: false };
      preparingStates.set(key,state);
      if(!readiness.has(key))readiness.set(key, state);
      try {
        const errors = sequenceErrors(config);
        if (errors.length) throw new Error(errors.join("; "));
        if (canvasVisual(config)) {
          state.images = [];
          for (const path of framesFor(config)) {
            const image = await assetCache.image(path);
            if (token !== preparation) return state;
            state.images.push(image);
          }
          if (state.images.some(img => img.naturalWidth !== state.images[0].naturalWidth || img.naturalHeight !== state.images[0].naturalHeight)) throw new Error("Sequence frame dimensions must match");
        } else state.images=[await assetCache.image(config.frameA)];
        state.frameA = true;
      } catch (error) {
        state.images = null;
        state.error = error.message;
        if(token===preparation&&preparingStates.get(key)===state)readiness.set(key,state);
        warn(`[Atlas] ${levelId} flyby "${config.id}": ${error.message}`);
        return state;
      }
      if (!canvasVisual(config) && config.frameB) try {
        state.images.push(await assetCache.image(config.frameB));
        state.frameB = true;
      } catch {
        warn(`[Atlas] ${levelId} flyby "${config.id}" flap frame disabled: ${config.frameB}`);
      }
      if (config.sound) {
        assetCache.sound(config.sound).then(() => {
          state.sound = true;
        }).catch(() => {
          warn(`[Atlas] ${levelId} flyby "${config.id}" sound disabled: ${config.sound}`);
        });
      }
      if (token !== preparation || preparingStates.get(key)!==state || configById(config.id)?.enabled===false) return state;
      state.ready = true;
      readiness.set(key,state);
      preparingStates.delete(key);
      const shell = document.querySelector(`[data-ambient-flyby="${CSS.escape(config.id)}"]`);
      if (shell) shell.dataset.ready = "true";
      sync();
      return state;
    }

    async function prepareLevel(selectedLevel) {
      stopAll();
      const token = ++preparation;
      ++editVersion;depthPreparation=null;assetPreparations.clear();preparingStates.clear();
      depth = null;
      levelId = selectedLevel?.id || null;
      readiness.clear();
      pathCaches.clear();
      if ((selectedLevel?.ambientFlybys || []).some(c => c.enabled!==false && c.depthOcclusion)) {
        try {
          await prepareDepth(selectedLevel);
          if (token !== preparation) return;
        } catch (error) { warn(`[Atlas] Flyby depth preparation failed: ${error.message}`); return; }
      }
      return Promise.all((selectedLevel?.ambientFlybys || []).filter(c=>c.enabled!==false).map(prepareOne));
    }

    function dispatch(config, trigger, instance) {
      const id = config.actions?.[trigger];
      if (!id) return;
      const handler = actions.get(id);
      if (!handler) { warn(`[Atlas] Unknown flyby action: ${id}`); return; }
      try { handler({trigger, flybyId:config.id, levelId, instance, config}); }
      catch (error) { warn(`[Atlas] Flyby action ${id}: ${error.message}`); }
    }

    function clearTimer(key) {
      window.clearTimeout(timers.get(key));
      timers.delete(key);
    }

    function groups() {
      const result = new Map();
      for (const config of getLevel()?.ambientFlybys || []) {
        if(config.enabled===false)continue;
        const key = String(config.syncKey || "").trim();
        if (!key) continue;
        if (!result.has(key)) result.set(key, []);
        result.get(key).push(config);
      }
      return result;
    }

    function randomDelay(config) {
      const min = Math.max(0, Number(config.intervalMinMs) || 18000);
      const max = Math.max(min, Number(config.intervalMaxMs) || min);
      return min + Math.round(Math.random() * (max - min));
    }

    function canRun() {
      return Boolean(
        getLevel() &&
        getLevel().id === levelId &&
        ["scene", "challenge", "correct"].includes(getScreen()) &&
        !document.hidden &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }

    function scheduleIndependent(config) {
      if(config.enabled===false||previewIds.has(config.id))return;
      const key = `one:${config.id}`;
      if (timers.has(key) || isBusy(config.id) || !readiness.get(keyFor(config.id))?.ready) return;
      timers.set(key, window.setTimeout(() => {
        timers.delete(key);
        if (!canRun() || options.isEditing?.() || previewIds.has(config.id)) return;
        startTrigger([config], false);
      }, randomDelay(config)));
    }

    function scheduleGroup(syncKey, members) {
      if(members.some(c=>previewIds.has(c.id)))return;
      const key = `sync:${syncKey}`;
      if (timers.has(key) || members.some((item) => isBusy(item.id))) return;
      if (!members.every((item) => readiness.get(keyFor(item.id))?.ready)) return;
      timers.set(key, window.setTimeout(() => {
        timers.delete(key);
        if (!canRun() || options.isEditing?.() || members.some(c=>previewIds.has(c.id))) return;
        startTrigger(members, false);
      }, randomDelay(members[0])));
    }

    function scheduleAll() {
      if (!canRun() || options.isEditing?.()) return;
      const syncGroups = groups();
      for (const config of getLevel().ambientFlybys || []) {
        if (!String(config.syncKey || "").trim()) scheduleIndependent(config);
      }
      syncGroups.forEach((members, syncKey) => scheduleGroup(syncKey, members));
    }

    function playTriggerAudio(members, triggerId) {
      if (!getAudioUnlocked()) return;
      const byPath = new Map();
      for (const config of members) {
        const ready = readiness.get(keyFor(config.id));
        if (!soundTriggers(config).includes("during") || !config.sound || !ready?.sound) continue;
        const path = assetCache.normalize(config.sound);
        const previous = byPath.get(path);
        if (!previous || Number(config.soundVolume || 0) > Number(previous.soundVolume || 0)) {
          byPath.set(path, config);
        }
      }
      byPath.forEach((config, path) => {
        const key = `${triggerId}:${path}`;
        playAudio(config, path, key, triggerId);
      });
    }

    function playAudio(config, path, key, triggerId, instanceId = null) {
      // Both trigger sources share ownership of an already playing clip.
      if ([...activeAudio.values()].some(state => state.path === path)) return;
      const audio = new Audio(path);
      const state = { audio, path, triggerId, instanceId, maxVolume: Number(config.soundVolume ?? 1) };
      audio.volume = instanceId ? Math.max(0, Math.min(1, getMasterVolume() * state.maxVolume)) : 0;
      activeAudio.set(key, state);
      ensureRaf();
      const finish = () => { if (activeAudio.get(key) === state) activeAudio.delete(key); };
      audio.addEventListener("ended", finish, { once: true });
      audio.addEventListener("error", finish, { once: true });
      audio.play().catch(finish);
    }

    function tap(id, hit) {
      if(!hit || hit.id!==id || !validateHit(hit))return false;
      const config = configById(id), instance = active.get(id);
      const shell = document.querySelector(`[data-ambient-flyby="${CSS.escape(id)}"]`);
      if (!instance || getScreen() !== "scene" || document.hidden || shell?.dataset.active !== "true") return false;
      const bounds = shell.getBoundingClientRect();
      if (!bounds.width || !bounds.height || bounds.right <= 0 || bounds.bottom <= 0 ||
          bounds.left >= window.innerWidth || bounds.top >= window.innerHeight) return false;
      dispatch(config, "onTap", instance);
      if (!soundTriggers(config).includes("tap") || !config.sound || !getAudioUnlocked() || !readiness.get(keyFor(id))?.sound) return Boolean(config.actions?.onTap);
      const path = assetCache.normalize(config.sound);
      // Ignore repeated taps while this sound is playing, including another instance of it.
      if ([...activeAudio.values()].some((state) => state.path === path)) return true;
      playAudio(config, path, `tap:${path}`, instance.triggerId, id);
      return true;
    }

    function isBusy(id) {
      return active.has(id) || pendingStarts.has(id);
    }

    function startTrigger(members, preview) {
      // Preview and automatic triggers share ownership. Ignore a retrigger until done.
      if (members.some((config) => isBusy(config.id))) return false;
      const triggerId = `flyby-${++triggerSequence}`;
      members.forEach((config) => {
        clearTimer(`one:${config.id}`);
        if (config.syncKey) clearTimer(`sync:${String(config.syncKey).trim()}`);
        pendingStarts.set(config.id, { triggerId, preview });
      });
      const startsByDelay = new Map();
      members.forEach((config) => {
        const delay = preview ? 0 : Math.max(0, Number(config.startDelayMs) || 0);
        if (!startsByDelay.has(delay)) startsByDelay.set(delay, []);
        startsByDelay.get(delay).push(config);
      });
      startsByDelay.forEach((starting, delay) => {
        const start = () => {
          const started = starting.filter(config => {
            pendingStarts.delete(config.id);
            return startOne(config, triggerId, preview);
          });
          // Atmospheric audio belongs to actual flight start, including offscreen
          // starts. No camera, sprite bounds or player distance is consulted.
          playTriggerAudio(started, triggerId);
          finishTriggerIfDone(triggerId, preview);
        };
        if (delay) {
          const key = `start:${triggerId}:${delay}`;
          timers.set(key, window.setTimeout(() => {
            timers.delete(key);
            start();
          }, delay));
        } else {
          start();
        }
      });
      return triggerId;
    }

    function startOne(config, triggerId, preview) {
      if(config.enabled===false)return false;
      if (active.has(config.id)) return false;
      if (!preview && !canRun()) return false;
      if (!readiness.get(keyFor(config.id))?.ready) return false;
      const cache = cacheFor(config);
      if (cache.totalLength <= 0) return false;
      active.set(config.id, {
        id: config.id,
        triggerId,
        preview,
        distance: 0,
        elapsed: 0,
        lastTime: 0,
        progress: 0,
        scaleX: (document.querySelector(".worldTrack")?.getBoundingClientRect().width || getLevel().world.width) / getLevel().world.width,
        scaleY: (document.querySelector(".worldTrack")?.getBoundingClientRect().height || getLevel().world.height) / getLevel().world.height
      });
      const shell = document.querySelector(`[data-ambient-flyby="${CSS.escape(config.id)}"]`);
      if (shell) {
        if (canvasVisual(config)) {
          const runtime=active.get(config.id),point=pointAtDistance(cache,0);
          const facing=config.faceFlightDirection===false?(config.mirrorX?-1:1):(cache.samples.at(-1).x>=cache.samples[0].x?1:-1);
          const rotation=config.rotateAlongPath?Math.max(-Math.abs(Number(config.maxRotationDeg)||0),Math.min(Math.abs(Number(config.maxRotationDeg)||0),point.angle)):0;
          shell.style.transform=`translate3d(${point.x*runtime.scaleX}px, ${point.y*runtime.scaleY}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${Number(config.scale)||0.2}) scaleX(${facing})`;
          drawPreparedFrame(config,runtime,shell,point,rotation,facing);
        }
        shell.dataset.active = "true";
        shell.style.willChange = "transform";
      }
      ensureRaf();
      return true;
    }

    function preview(id) {
      const config = configById(id);
      if (!config) return false;
      previewIds.add(id);
      const started=Boolean(startTrigger([config], true));
      options.onPreviewChange?.();
      return started;
    }

    function previewSync(syncKey) {
      const members = groups().get(syncKey) || [];
      if (!members.length) return false;
      members.forEach(c=>previewIds.add(c.id));
      return Boolean(startTrigger(members, true));
    }

    function cancelActive(id) {
      active.delete(id);
      for (const [key, state] of activeAudio) {
        if (state.instanceId !== id) continue;
        state.audio.pause();
        activeAudio.delete(key);
      }
      const shell = document.querySelector(`[data-ambient-flyby="${CSS.escape(id)}"]`);
      if (shell) {
        shell.dataset.active = "false";
        shell.style.willChange = "";
      }
    }

    function finishTriggerIfDone(triggerId, preview) {
      if ([...active.values()].some((item) => item.triggerId === triggerId)) return;
      if ([...pendingStarts.values()].some((item) => item.triggerId === triggerId)) return;
      for (const [key, state] of activeAudio) {
        if (state.triggerId !== triggerId) continue;
        state.audio.pause();
        activeAudio.delete(key);
      }
      if(preview)options.onPreviewChange?.();
      else scheduleAll();
    }

    function updateAudio() {
      for (const state of activeAudio.values()) {
        const progresses = [...active.values()]
          .filter((item) => item.triggerId === state.triggerId)
          .map((item) => item.progress);
        const progress = progresses.length ? Math.max(...progresses) : 1;
        // A short call can finish before a slow flight clears its fade-in.
        // Keep the same envelope, bounded by both the flight and the clip:
        // whichever finishes first owns the fade. Tap sounds remain unfaded.
        const clipProgress = Number.isFinite(state.audio.duration) && state.audio.duration > 0
          ? state.audio.currentTime / state.audio.duration : 0;
        state.audio.volume = Math.max(0, Math.min(1,
          getMasterVolume() * state.maxVolume * (state.instanceId ? 1 : volumeEnvelope(Math.max(progress, clipProgress)))
        ));
      }
    }

    function drawPreparedFrame(config, runtime, shell, point, rotation, facing) {
      const canvas = shell?.querySelector?.('[data-flyby-canvas]');
      const images = readiness.get(keyFor(config.id))?.images;
      if (!canvas || !images?.length) return;
      const image = images[runtime.frameIndex || 0];
      if (options.canDebug?.()) runtime.lastDraw = {point,rotation,facing};
      const width = image.naturalWidth, height = image.naturalHeight;
      if (canvas.width !== width || canvas.height !== height) {canvas.width=width;canvas.height=height;runtime.drawKey=null;}
      const g=graphicsFor(config);
      const debug=depthDebug && config.depthOcclusion && depth;
      shell.style.setProperty('--flyby-softness',`${debug?0:g.softness}px`);
      shell.style.setProperty('--flyby-saturation',String(debug?1:g.saturation));
      const key = [runtime.frameIndex || 0, config.scale, config.depthBias, depthDebug, ...Object.values(g), ...(config.depthOcclusion ? [point.x,point.y,rotation,facing] : [])].join(':');
      if (runtime.drawCanvas === canvas && runtime.drawKey === key) return;
      runtime.drawCanvas=canvas;runtime.drawKey=key;
      const ctx=canvas.getContext('2d');ctx.clearRect(0,0,width,height);ctx.drawImage(image,0,0);
      if(!debug && hasColorAdjustment(config))ctx.putImageData(adjustGraphics(ctx.getImageData(0,0,width,height),config),0,0);
      if (config.depthOcclusion && depth) {
        const world=getLevel().world, scale=Number(config.scale)||0.2, angle=rotation*Math.PI/180, cos=Math.cos(angle),sin=Math.sin(angle);
        const sample=(x,y)=>depth.data[(Math.max(0,Math.min(depth.height-1,Math.round(y/world.height*(depth.height-1))))*depth.width+Math.max(0,Math.min(depth.width-1,Math.round(x/world.width*(depth.width-1)))))*4]/255;
        const groundY=height*0.46*scale;
        const actorDepth=Math.max(0,Math.min(1,sample(point.x-sin*groundY/runtime.scaleX,point.y+cos*groundY/runtime.scaleY)+Number(config.depthBias||0)));
        const mask=runtime.mask || (runtime.mask=document.createElement('canvas'));
        if(mask.width!==width||mask.height!==height){mask.width=width;mask.height=height;runtime.maskPixels=null;}
        const maskCtx=mask.getContext('2d'),pixels=runtime.maskPixels || (runtime.maskPixels=maskCtx.createImageData(width,height));
        const maskKey=[point.x,point.y,rotation,facing,scale,config.depthBias].join(':');
        if(runtime.maskKey!==maskKey){
        for(let y=0;y<height;y++)for(let x=0;x<width;x++){
          const dx=(x+0.5-width/2)*scale*facing,dy=(y+0.5-height/2)*scale;
          const scene=sample(point.x+(cos*dx-sin*dy)/runtime.scaleX,point.y+(sin*dx+cos*dy)/runtime.scaleY);
          pixels.data[(y*width+x)*4+3]=Math.round(255*Math.max(0,Math.min(1,(actorDepth-scene)/0.01+1)));
        }
        maskCtx.putImageData(pixels,0,0);runtime.maskKey=maskKey;
        }
        ctx.globalCompositeOperation='destination-in';ctx.drawImage(mask,0,0);ctx.globalCompositeOperation='source-over';
        if (depthDebug) {
          const foot = {x:point.x-sin*groundY/runtime.scaleX,y:point.y+cos*groundY/runtime.scaleY};
          const rawDepth = sample(foot.x,foot.y);
          runtime.depthDebug = {world:{x:point.x,y:point.y},foot,
            uv:{x:foot.x/world.width,y:foot.y/world.height},
            pixel:{x:Math.max(0,Math.min(depth.width-1,Math.round(foot.x/world.width*(depth.width-1)))),y:Math.max(0,Math.min(depth.height-1,Math.round(foot.y/world.height*(depth.height-1))))},
            rawDepth,bias:Number(config.depthBias||0),actorDepth};
          // Diagnostics intentionally show the original silhouette, including hidden pixels.
          ctx.clearRect(0,0,width,height);ctx.drawImage(image,0,0);
          const overlay=ctx.getImageData(0,0,width,height);
          for(let i=0;i<overlay.data.length;i+=4){
            const visible=pixels.data[i+3]/255;
            overlay.data[i]=Math.round(255*(1-visible));overlay.data[i+1]=Math.round(220*visible);overlay.data[i+2]=0;
          }
          ctx.putImageData(overlay,0,0);
          ctx.save();ctx.translate(width/2,height*.96);ctx.scale(facing,1);
          ctx.strokeStyle='white';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-8,0);ctx.lineTo(8,0);ctx.moveTo(0,-8);ctx.lineTo(0,8);ctx.stroke();
          ctx.font='14px monospace';ctx.fillStyle='black';ctx.fillRect(-155,-65,310,20);ctx.fillStyle='white';
          ctx.fillText(`${rawDepth.toFixed(3)} + ${Number(config.depthBias||0).toFixed(3)} = ${actorDepth.toFixed(3)}`,-150,-50);ctx.restore();
        } else delete runtime.depthDebug;
      }
      canvas.dataset.frameIndex=String(runtime.frameIndex||0);
      canvas.dataset.revision=String(Number(canvas.dataset.revision||0)+1);
    }

    function tick(timestamp) {
      rafId = null;
      const completed = [];
      for (const [id, runtime] of active) {
        const config = configById(id);
        if (!config) {
          completed.push([runtime, id]);
          continue;
        }
        if (runtime.held || runtime.paused || runtime.rebuilding) continue;
        if (!runtime.lastTime) runtime.lastTime = timestamp;
        const delta = Math.max(0, Math.min(0.1, (timestamp - runtime.lastTime) / 1000));
        runtime.lastTime = timestamp;
        const cache = cacheFor(config);
        runtime.elapsed += delta;
        const frames=framesFor(config), playback=playbackFor(config), fps=Number(config.animationFps)||24;
        // Never omit an authored pose after a slow frame. FPS is the target;
        // under load animation and Once movement slow together rather than skip.
        const animationTime=Math.min((runtime.animationTime||0)+delta*fps+1e-7,(runtime.animationStep||0)+1);
        runtime.animationTime=animationTime;
        const animationFrame=Math.floor(animationTime);
        runtime.animationStep=animationFrame;
        runtime.frameIndex=playback==='loop'?animationFrame%frames.length:playback==='once'?Math.min(frames.length-1,animationFrame):0;
        if(playback==='legacy'&&runtime.preview){runtime.legacyPhase=(runtime.legacyPhase||0)+delta*Math.max(0,Number(config.flapFrequencyHz)||0)*2;runtime.frameIndex=Math.floor(runtime.legacyPhase)%frames.length;}
        if (playback==='once') {
          const end=Math.max(0,(config.movementEndFrame ?? frames.length)-1);
          runtime.distance=cache.totalLength*(end?Math.min(1,animationTime/end):1);
        } else runtime.distance += Math.max(1, Number(config.speed) || 260)
          * organicSpeedFactor(config, runtime.elapsed, runtime.progress) * delta;
        const point = pointAtDistance(cache, runtime.distance);
        runtime.progress = point.progress;
        const shell = document.querySelector(`[data-ambient-flyby="${CSS.escape(id)}"]`);
        if (shell) {
          shell.dataset.active = "true";
          shell.style.willChange = "transform";
          const overallDirection = cache.samples.at(-1).x >= cache.samples[0].x ? 1 : -1;
          const facing = config.faceFlightDirection === false
            ? (config.mirrorX ? -1 : 1)
            : overallDirection;
          const rotation = config.rotateAlongPath
            ? Math.max(-Math.abs(Number(config.maxRotationDeg) || 0), Math.min(Math.abs(Number(config.maxRotationDeg) || 0), point.angle))
            : 0;
          shell.style.transform =
            `translate3d(${point.x * runtime.scaleX}px, ${point.y * runtime.scaleY}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${Number(config.scale) || 0.2}) scaleX(${facing})`;
          const ready = readiness.get(keyFor(id));
          if ((canvasVisual(config) || runtime.preview) && shell.querySelector('[data-flyby-canvas]')) {
            if (playback==='legacy' && frames.length>1 && !runtime.preview) runtime.frameIndex=Math.floor((runtime.distance/Math.max(1,Number(config.speed)||260))*Math.max(0,Number(config.flapFrequencyHz)||0)*2)%2;
            drawPreparedFrame(config,runtime,shell,point,rotation,facing);
          } else if (config.frameB && ready?.frameB) {
            const flapHz = Math.max(0, Number(config.flapFrequencyHz) || 0);
            const frame = runtime.preview ? (runtime.frameIndex%2?'b':'a') : flapHz > 0
              ? (Math.floor((runtime.distance / Math.max(1, Number(config.speed) || 260)) * flapHz * 2) % 2 ? "b" : "a")
              : "a";
            shell.dataset.frame = frame;
          }
          shell.dataset.progress = point.progress.toFixed(4);
          shell.dataset.rotation = rotation.toFixed(3);
        }
        const animationComplete=playback==='once' && runtime.frameIndex===frames.length-1;
        if (animationComplete && !runtime.animationComplete) {
          runtime.animationComplete=true;
          dispatch(config,'onAnimationComplete',runtime);
        }
        // Despawn only after the last pose has had its display interval. Hiding
        // it in the same tick that draws it would skip that pose on screen.
        if (playback==='once' ? animationComplete && (config.endBehavior==='hold' || animationTime>=frames.length) : runtime.distance>=cache.totalLength) {
          if(config.endBehavior==='hold')runtime.held=true;
          else completed.push([runtime,id]);
        }
      }
      updateAudio();
      completed.forEach(([runtime, id]) => {
        cancelActive(id);
        finishTriggerIfDone(runtime.triggerId, runtime.preview);
      });
      ensureRaf();
    }

    function ensureRaf() {
      if (!rafId && ([...active.values()].some(item=>!item.held&&!item.paused&&!item.rebuilding) || activeAudio.size)) rafId = window.requestAnimationFrame(tick);
    }

    function stopAll({preserveHeld=false,preservePreviews=false} = {}) {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      pendingStarts.clear();
      active.forEach((instance, id) => { if(!(preserveHeld&&instance.held) && !(preservePreviews&&instance.preview)) cancelActive(id); });
      if(!preservePreviews)previewIds.clear();
      activeAudio.forEach((value,key) => {
        if(preservePreviews&&[...active.values()].some(i=>i.preview&&i.triggerId===value.triggerId))return;
        value.audio.pause();activeAudio.delete(key);
      });
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = null;
    }

    function sync() {
      if (!canRun()) {
        const sameScene=getLevel()?.id===levelId && ["scene","challenge","correct"].includes(getScreen());
        stopAll({preserveHeld:sameScene,preservePreviews:sameScene&&!document.hidden});
        ensureRaf();
        return;
      }
      scheduleAll();
    }

    function releaseLevel() {stopAll();++preparation;++editVersion;assetPreparations.clear();preparingStates.clear();depthPreparation=null;readiness.clear();pathCaches.clear();depth=null;hitCanvas=null;levelId=null;}

    return {
      readiness,
      setDepthDebug,
      pathCaches,
      timers,
      active,
      activeAudio,
      prepareLevel,
      updateLevel,previewState,togglePreview,stopPreview,refreshPreviews,
      cacheFor,
      invalidatePath,
      preview,
      previewSync,
      tap,
      hitTest, hitAlpha, validateHit,
      sync,
      stopAll,
      releaseLevel,
      buildPathCache,
      pointAtDistance
    };
  }

  const api = {
    framesFor, playbackFor, canvasVisual, depthPathFor, sequenceErrors, registerAction,
    graphicsControls, graphicsFor, adjustGraphics, FLYBY_HIT_ALPHA_THRESHOLD,
    actionIds: () => [...actions.keys()],
    soundTriggers,
    validSoundTriggers,
    IMAGE_EXTENSIONS,
    AUDIO_EXTENSIONS,
    normalizedAssetPath,
    extensionFor,
    createAssetCache,
    smoothControlPoints,
    buildPathCache,
    pointAtDistance,
    organicFlybyOptions,
    organicSpeedFactor,
    volumeEnvelope,
    createFlybyRuntime
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else window.AtlasAmbientSystem = api;
})();
