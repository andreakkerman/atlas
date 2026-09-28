(function () {
  'use strict';

  const BASE = window.AtlasChallengeFxSettings;
  if (!BASE) return;
  const stardustControls={richness:['Particle density',.15,3,1],cyanParticles:['Cyan particles',0,3,1],goldParticles:['Gold particles',0,3,1],moteSize:['Particle size',.3,3,1],bloom:['Particle bloom',0,3,.65]};
  const controls = {
    marker: {
      intensity: ['Intensity', 0, 8],
      size: ['Size', .1, 5],
      cyan: ['Cyan brightness', 0, 8],
      gold: ['Gold brightness', 0, 8],
      particles: ['Particles', 0, 6],
      glow: ['Particle radiance', 0, 8]
    },
    flow: {
      intensity: ['Intensity', 0, 8],
      width: ['Width', 0, 8],
      speed: ['Speed', .1, 6],
      dust: ['Gold particles', 0, 6],
      particleSize: ['Particle size', .1, 6],
      duration: ['Duration (s)', .2, 10]
    },
    exit: {
      pulse: ['Breathing', 0, 6],
      radius: ['Radius', 10, 200],
      gold: ['Gold', 0, 6],
      cyan: ['Cyan', 0, 3],
      particles: ['Particles', 0, 6],
      glow: ['Particle radiance', 0, 8],
      ellipse: ['Ellipse ratio', .2, 1.8],
      speed: ['Drift speed', -3, 3],
      turbulence: ['Wandering amount', 0, 3],
      wisps: ['Cloud drift', 0, 5]
    }
  };
  function normalize(value) {
    const input = value || {},
      mode=['legacy','canvas','webgpu'].includes(input.mode)?input.mode:input.enabled===true?'canvas':'legacy',
      out = {
        mode,enabled: mode!=='legacy',
        volume: Math.max(0, Math.min(1, Number.isFinite(input.volume) ? input.volume : 1))
      };
    for (const [g, fields] of Object.entries(controls)) {
      out[g] = {};
      for (const [k, [, min, max]] of Object.entries(fields)) {
        const n = input[g]?.[k];
        out[g][k] = Math.max(min, Math.min(max, Number.isFinite(n) ? n : BASE[g][k]));
      }
    }
    out.renderer={mode:'webgpu',exposure:1.35,depth:1};
    for(const [key,[,min,max,fallback]]of Object.entries(stardustControls)){const n=input.renderer?.[key];out.renderer[key]=Math.max(min,Math.min(max,Number.isFinite(n)?n:fallback));}
    return out;
  }
  function settings(value) {
    const out = structuredClone(BASE),
      n = normalize(value);
    for (const g of Object.keys(controls)) Object.assign(out[g], n[g]);
    out.renderer=n.renderer;
    return out;
  }
  function editor(value) {
    const n = normalize(value);
    const selector=`<label>Challenge effects<select aria-label="Challenge effects" data-challenge-fx="mode">${Object.entries({legacy:'Legacy',canvas:'Canvas 2D',webgpu:'WebGPU · Living Stardust'}).map(([id,label])=>`<option value="${id}" ${n.mode===id?'selected':''}>${label}</option>`).join('')}</select></label>`;
    const volume=`<label>Knowledge Transfer SFX Volume<input type="range" aria-label="Knowledge Transfer SFX Volume" data-challenge-fx="volume" min="0" max="1" step="0.01" value="${n.volume}"><output data-challenge-fx-value="volume">${n.volume}</output></label>`;
    if(n.mode!=='canvas')return `<details class="challengeFxControls" data-challenge-fx-controls><summary>Challenge effects</summary>${selector}${n.mode==='webgpu'?`<p data-challenge-fx-status role="status">Living Stardust · WebGPU, with Canvas fallback when unavailable</p>${Object.entries(stardustControls).map(([k,[label,min,max]])=>`<label>${label}<input type="range" aria-label="${label}" data-challenge-fx="renderer.${k}" min="${min}" max="${max}" step="0.01" value="${n.renderer[k]}"><output data-challenge-fx-value="renderer.${k}">${n.renderer[k]}</output></label>`).join('')}${volume}`:''}</details>`;
    return `<details class="challengeFxControls" data-challenge-fx-controls><summary>Challenge effects</summary>${selector}${Object.entries(controls).map(([g, fields]) => `<fieldset><legend>${{
      marker: 'Challenge particles',
      flow: 'Knowledge transfer',
      exit: 'Exit · Enchanted cloud'
    }[g]}</legend>${Object.entries(fields).map(([k, [label, min, max]]) => `<label>${label}<input type="number" aria-label="${g} ${label}" data-challenge-fx="${g}.${k}" min="${min}" max="${max}" step="0.01" value="${n[g][k]}"></label>`).join('')}</fieldset>`).join('')}<fieldset><legend>Particle finish · challenge & exit</legend>${Object.entries(stardustControls).map(([k,[label,min,max]])=>`<label>${label}<input type="number" aria-label="${label}" data-challenge-fx="renderer.${k}" min="${min}" max="${max}" step="0.01" value="${n.renderer[k]}"></label>`).join('')}</fieldset>${volume}</details>`;
  }
  function createRuntime(options) {
    let sequence = null,
      serial = 0,
      levelId = null,
      clock = 0,
      last = 0,
      failed = false,
      context = null,
      bufferPromise = null;
    const observed = new Set();
    let stardust=null,gpuPending=false,gpuGeneration=0,gpuStatus='Not started';
    function releaseGPU(){gpuGeneration++;stardust?.dispose();stardust=null;gpuPending=false;gpuStatus='Not started';}
    function notifyGPU(message){gpuStatus=message;document.querySelectorAll('[data-challenge-fx-status]').forEach(el=>el.textContent=message);}
    function prepareGPU(){
      if(stardust||gpuPending)return;
      gpuPending=true;const generation=gpuGeneration;notifyGPU('Starting Living Stardust…');
      import('./challenge-stardust/runtime.js').then(module=>{if(generation!==gpuGeneration)return;stardust=module.createRuntime(notifyGPU);}).catch(error=>{if(generation===gpuGeneration)notifyGPU('Canvas fallback · '+error.message);});
    }
    let starts = 0,
      frames = 0,
      maxDrawMs = 0;
    const enabled = () => !failed && options.enabled();
    function stopAudio(seq = sequence) {
      if (!seq) return;
      try {
        seq.voice?.stop?.();
        seq.voice?.pause?.();
        seq.voice?.disconnect?.();
        seq.gain?.disconnect?.();
      } catch {}
      seq.voice = null;
      seq.gain = null;
    }
    function cancel() {
      stopAudio();
      sequence = null;
      last = 0;
    }
    function dispose() {
      releaseGPU();
      cancel();
      observed.clear();
      levelId = null;
      clock = 0;
      failed = false;
      const old = context;
      context = null;
      bufferPromise = null;
      if (old) old.close().catch(() => {});
    }
    function unlockAudio() {
      if (!enabled()) return;
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      try {
        if (!context) {
          context = new Context();
          const current = context;
          bufferPromise = fetch(options.audioPath()).then(r => {
            if (!r.ok) throw Error('audio');
            return r.arrayBuffer();
          }).then(b => current.decodeAudioData(b));
          bufferPromise.catch(() => {});
        }
        context.resume().catch(() => {});
      } catch {
        context = null;
        bufferPromise = null;
      }
    }
    function startAudio(seq) {
      // Claim the only attempt BEFORE any asynchronous load/decode. Never called by draw/retarget.
      if (seq.audioAttempted) return;
      seq.audioAttempted = true;
      if (!options.audioUnlocked()) return;
      const volume = () => normalize(options.settings()).volume * options.masterVolume();
      if (context && bufferPromise) {
        const owner = context;
        bufferPromise.then(buffer => {
          if (sequence !== seq || !enabled() || document.hidden || owner !== context || seq.age >= seq.duration) return;
          const offset = seq.age,
            length = Math.min(buffer.duration - offset, seq.duration - offset);
          if (length <= 0) return;
          const source = owner.createBufferSource(),
            gain = owner.createGain();
          source.buffer = buffer;
          source.connect(gain);
          gain.connect(owner.destination);
          gain.gain.value = volume();
          seq.voice = source;
          seq.gain = gain;
          starts++;
          source.start(0, offset, length);
        }).catch(() => {});
      } else {
        try {
          const audio = new Audio(options.audioPath());
          audio.volume = volume();
          seq.voice = audio;
          starts++;
          audio.play().catch(() => {});
        } catch {}
      }
    }
    function sync() {
      if (!enabled() || !['scene', 'challenge', 'correct'].includes(options.screen()) || document.hidden) {
        cancel();
        return false;
      }
      const scene = options.scene();
      if (scene.id !== levelId) {
        cancel();
        observed.clear();
        levelId = scene.id;
        clock = 0;
      }
      for (const id of observed) if (!scene.completed.has(id)) observed.delete(id);
      if (sequence && !scene.completed.has(sequence.runeId)) cancel();
      return true;
    }
    function complete(runeId) {
      try {
        if (!sync()) return false;
        const scene = options.scene();
        if (!scene.completed.has(runeId) || observed.has(runeId)) return false;
        observed.add(runeId);
        const anchor = scene.anchors.find(a => a.id === runeId);
        if (!anchor) return false;
        cancel();
        const s = settings(options.settings());
        sequence = {
          id: ++serial,
          runeId,
          origin: [anchor.x, anchor.y],
          releaseMarker: anchor.idleMarker !== false,
          liveSource: anchor.liveSource === true,
          bend: [...scene.player],
          age: 0,
          duration: s.flow.duration,
          audioAttempted: false,
          voice: null,
          gain: null
        };
        startAudio(sequence);
        return true;
      } catch {
        cancel();
        return false;
      }
    }
    function draw(ctx, timestamp) {
      try {
        if (!sync()) return;
        const start = performance.now(),
          dt = last ? Math.max(0, (timestamp - last) / 1000) : 0;
        last = timestamp;
        clock += dt;
        const scene = options.scene(),
          s = settings(options.settings());
        if (sequence) {
          if (sequence.liveSource) {
            const source = scene.anchors.find(a => a.id === sequence.runeId);
            if (source) sequence.origin = [source.x, source.y];
          }
          sequence.age += dt;
          for (let i = 0; i < 2; i++) sequence.bend[i] += (scene.player[i] - sequence.bend[i]) * (1 - Math.exp(-dt * 5));
          if (sequence.age >= sequence.duration) stopAudio();else {
            const volume = normalize(options.settings()).volume * options.masterVolume();
            if (sequence.gain) sequence.gain.gain.value = volume;else if (sequence.voice) sequence.voice.volume = volume;
          }
          if (sequence.age >= sequence.duration + s.timing.absorbDuration + s.absorb.settle) cancel();
        }
        if (sequence) s.flow.duration = sequence.duration;
        const webgpu=normalize(options.settings()).mode==='webgpu';
        if(webgpu)prepareGPU();else if(stardust||gpuPending)releaseGPU();
        if(!webgpu||!stardust?.paint(ctx,s,scene,sequence,clock)){
          window.AtlasChallengeFxVisuals.paint(ctx,s,scene,webgpu&&sequence?.age>=sequence?.duration?null:sequence,clock);
        }
        if(webgpu)notifyGPU(gpuStatus);
        frames++;
        maxDrawMs = Math.max(maxDrawMs, performance.now() - start);
      } catch (error) {
        failed = true;
        cancel();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        document.querySelector('#app')?.setAttribute('data-challenge-fx-active', 'false');
        console.warn('[Atlas Challenge FX] Disabled after rendering failure:', error.message);
      }
    }
    function snapshot() {
      const scene = enabled() ? options.scene() : null;
      return {
        enabled: enabled(),
        mode:normalize(options.settings()).mode,
        gpu:{status:gpuStatus,...stardust?.snapshot()},
        markers: scene?.markers.map(m => m.id) || [],
        exit: !!scene?.exit,
        sequence: sequence ? {
          id: sequence.id,
          runeId: sequence.runeId,
          age: sequence.age,
          origin: sequence.origin,
          releaseMarker: sequence.releaseMarker,
          bend: [...sequence.bend],
          target: scene.player,
          absorbing: normalize(options.settings()).mode!=='webgpu'&&sequence.age >= sequence.duration,
          audioAttempted: sequence.audioAttempted,
          volume: sequence.gain?.gain.value ?? sequence.voice?.volume ?? null
        } : null,
        audioStarts: starts,
        frames,
        maxDrawMs
      };
    }
    return {
      enabled,
      sync,
      draw,
      complete,
      cancel,
      dispose,
      suspend(){cancel();releaseGPU();},
      readGPU:region=>stardust?.readback(region),
      unlockAudio,
      snapshot
    };
  }
  window.AtlasChallengeFx = {
    normalize,
    settings,
    editor,
    createRuntime
  };
})();
