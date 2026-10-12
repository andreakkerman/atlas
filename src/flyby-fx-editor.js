(function(global){
  'use strict';
  const FX=global.AtlasFlybyFX, E=global.AtlasSceneEffects, Ambient=global.AtlasAmbientSystem;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let editor=null;
  function open(options){
    if(editor)return;
    const preview={scale:.35,speed:120,motionProfile:'smooth',wobble:14,speedVariation:.14,flutterFrequency:2.1,faceFlightDirection:false,mirrorX:false,rotateAlongPath:false,maxRotationDeg:15,soundVolume:.65,loopDuringFlyby:true};
    const previewNumber=field=>{const c=Ambient.previewControls[field];return `<label>${c.label}<input type="number" data-preview-setting="${field}" aria-label="Preview ${c.label}" min="${c.min}" max="${c.max}" step="${c.step}" value="${preview[field]}"></label>`;};
    const previewToggle=(field,label)=>`<label><input type="checkbox" data-preview-setting="${field}" ${preview[field]?'checked':''}> ${label}</label>`;
    const previewPanel=`<div class="fxPreviewSettings" id="fx-preview-settings" role="region" aria-label="Preview settings · Not saved" hidden><small>Preview settings · Not saved</small><fieldset data-preview-audio><legend>Audio</legend><p data-audio-source></p>${previewNumber('soundVolume')}<label><input type="checkbox" data-preview-mute> Mute</label>${previewToggle('loopDuringFlyby','Loop during flyby')}<p data-audio-status role="status"></p></fieldset><fieldset><legend>Movement</legend>${previewNumber('speed')}<label>Direction<select data-preview-direction><option value="1">Left to right</option><option value="-1">Right to left</option></select></label><label>Motion profile<select data-preview-setting="motionProfile"><option value="smooth">Smooth</option><option value="organic">Organic</option></select></label>${['wobble','speedVariation','flutterFrequency'].map(previewNumber).join('')}${previewToggle('faceFlightDirection','Face flight direction')}${previewToggle('rotateAlongPath','Rotate along path')}${previewNumber('maxRotationDeg')}</fieldset></div>`;
    const root=document.createElement('section');root.className='flybyFxEditor';root.dataset.flybyFxEditor='';root.setAttribute('aria-label','Flyby FX Editor');
    root.innerHTML=`<header><nav aria-label="Developer Tools sections"><button data-action="world">World Editing</button><button class="selected" aria-current="page">FX Editing</button></nav><strong>Flyby FX Editor</strong><span data-status></span><button data-action="save">Save asset FX</button><button data-action="revert">Revert</button><button data-action="close" aria-label="Close Developer Tools">×</button></header>
      <aside class="fxLibrary"><label>Flyby asset<select data-asset aria-label="Flyby asset"></select></label><p data-dimensions></p><label>Effect library<select data-preset>${FX.PRESETS.map(id=>`<option value="${id}">${E.presetById(id).name}</option>`).join('')}</select></label><button data-action="add">Add effect</button><ol data-effects></ol></aside>
      <main class="fxStage"><div class="fxToolbar"><div class="fxPlaybackControls" role="group" aria-label="Flyby preview"><button data-action="play">Play</button><button data-action="restart">Restart</button><button data-action="stop" disabled>Stop</button><label><input type="checkbox" data-movement> Movement</label><label><input type="checkbox" data-mirror> Mirror</label><label>Preview scale<select data-scale><option value="0.1">10%</option><option value="0.22">22%</option><option value="0.35" selected>35%</option><option value="0.5">50%</option><option value="1">100%</option><option value="2">200%</option></select></label><button data-action="preview-settings" aria-expanded="false" aria-controls="fx-preview-settings">Preview Settings</button>${previewPanel}</div><div class="fxCameraControls" role="group" aria-label="Canvas view"><button data-action="fit-sprite">Fit Sprite</button><button data-action="fit-effects">Fit Effects</button><button data-action="actual">100% view</button><label>Background<select data-background><option value="checker">Checkerboard</option><option value="dark">Dark</option><option value="light">Light</option></select></label><label><input type="checkbox" data-show-guides checked> Guides</label><small data-preview-view></small></div></div><div class="fxViewport" data-viewport data-background="checker"><canvas data-preview></canvas><svg data-guides aria-label="Effect geometry"><g data-guide-transform></g></svg></div><footer><span data-message role="status">Loading flyby assets…</span><span>Wheel: zoom · middle drag: pan · arrows: 1 px · Shift: 10 px · Alt: 0.1 px</span></footer></main>
      <aside class="fxInspector" data-inspector></aside><dialog data-unsaved><h2>Unsaved asset FX</h2><p>Save your changes before leaving this asset?</p><button data-choice="save">Save</button><button data-choice="discard">Discard</button><button data-choice="cancel">Cancel</button></dialog>`;
    // This workspace fully covers the menu. Inert alone still lets WebKit
    // repaint its expensive backdrop filters beneath every preview frame.
    const app=document.getElementById('app'),wasInert=app.inert,wasHidden=app.hidden;app.inert=true;app.hidden=true;
    root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.tabIndex=-1;
    document.body.append(root);root.focus();
    const q=s=>root.querySelector(s),canvas=q('[data-preview]'),viewport=q('[data-viewport]');
    const state={root,assets:[],asset:null,document:null,saved:null,revision:null,image:null,selected:null,composer:null,playing:false,time:0,zoom:1,x:0,y:0,movement:false,mirror:false,isolate:false,dirty:false,busy:false,token:0,polygon:null,drag:null,preview,muted:false,pose:null,audioBlocked:false};
    editor=state;
    const previewId='fx-workspace-preview';
    let previewLevel=null,config=null,direction=1,hiddenPaused=false;
    const runtime=state.runtime=Ambient.createFlybyRuntime({
      assetCache:options.assetCache,getLevel:()=>previewLevel,getScreen:()=>root.isConnected?'scene':'menu',isEditing:()=>true,
      getAudioUnlocked:()=>options.getAudioUnlocked?.()??false,getMasterVolume:()=>state.muted?0:(options.getMasterVolume?.()??1),
      loadAssetFX:false,pausePreviewAudio:true,stationaryPreview:()=>!state.movement,
      onPreviewFrame(instance,pose){state.time=instance.elapsed;state.pose=pose;draw();},
      onPreviewChange:transportStatus,
      onAudioError(){state.audioBlocked=true;q('[data-audio-status]').textContent='Audio could not play. Use Play / Resume or Restart to retry after a browser gesture.';},
      warn:text=>{q('[data-audio-status]').textContent=text;}
    });
    function transportStatus(){
      const status=runtime.previewState(previewId);state.playing=status==='playing';
      q('[data-action="play"]').textContent=status==='playing'?'Pause':status==='paused'?'Resume':'Play';
      q('[data-action="stop"]').disabled=status==='idle';
    }
    function startPreview(paused=false){
      if(!config)return;
      runtime.stopPreview();state.time=0;state.pose=null;state.audioBlocked=Boolean(config.sound&&!options.getAudioUnlocked?.());
      q('[data-audio-status]').textContent=state.audioBlocked?'Use Play / Resume or Restart to enable audio.':state.asset.sound&&!config.sound?'Audio could not load. Reselect the asset to retry.':'';
      runtime.preview(previewId);if(paused)runtime.togglePreview(previewId);
      runtime.refreshPreviews();draw(true);
    }
    function updatePreview(){
      if(!config)return;
      const previous=[{...config}];Object.assign(config,preview);
      config.path=[{x:-600*direction,y:0},{x:0,y:-80},{x:600*direction,y:0}];
      state.mirror=!preview.faceFlightDirection&&preview.mirrorX;
      q('[data-mirror]').disabled=preview.faceFlightDirection;
      runtime.updateLevel(previous);draw();guides();
    }
    const current=()=>state.document?.effects.find(e=>e.id===state.selected);
    // Release only cache entries introduced by this workspace. Images already
    // owned by the game/readiness coordinator remain in its shared cache.
    const ownedImages=new Map();
    const ownedAudio=new Map();
    function releaseAudio(){for(const [path,promise] of ownedAudio){if(options.assetCache.audio.get(path)!==promise)continue;options.assetCache.audio.delete(path);promise.then(audio=>{audio.pause();audio.removeAttribute('src');audio.load();}).catch(()=>{});}ownedAudio.clear();}
    function releaseImages(except){for(const [path,promise] of ownedImages){if(path===except)continue;if(options.assetCache.images.get(path)===promise)options.assetCache.releaseImages([path]);ownedImages.delete(path);}}
    const message=text=>{q('[data-message]').textContent=text;};
    const setDirty=()=>{state.dirty=JSON.stringify(state.document)!==JSON.stringify(state.saved);q('[data-status]').textContent=state.dirty?'Unsaved changes':'Saved';q('[data-action="save"]').disabled=!options.canSave||!state.dirty||state.busy;};
    async function api(url,init){const response=await fetch(url,{cache:'no-store',...init});const value=await response.json();if(!response.ok)throw new Error(value.error||'FX request failed.');return value;}
    function rebuild(){
      if(!state.document)return;
      setDirty();
      const errors=FX.validate(state.document,state.asset.frameA,state.document.sourceSize);
      if(errors.length){message(errors.join(' '));return;}
      state.composer?.dispose();state.composer=FX.create(state.document,{isolate:state.isolate?state.selected:null});
      message(options.canSave?'Save writes only this asset’s fx.json.':'Preview only. Open Atlas with ?dev=editor to save.');
      draw(true);guides();
    }
    function list(){q('[data-effects]').innerHTML=(state.document?.effects||[]).map(e=>`<li><button data-select="${esc(e.id)}" class="${e.id===state.selected?'selected':''}">${e.enabled===false?'○':'●'} ${esc(e.label||E.presetById(e.presetId).name)}<small>${esc(e.plane)}</small></button></li>`).join('');}
    function number(label,path,value,min,max,step=1){return `<label>${esc(label)}<input type="number" data-property="${path}" aria-label="${esc(label)}" value="${value}" min="${min}" max="${max}" step="${step}"></label>`;}
    function inspector(){
      const e=current();if(!e){q('[data-inspector]').innerHTML='<p>Select or add an effect.</p>';return;}
      const r=E.resolve(e,{}),p=E.presetById(e.presetId),g=e.geometry,indicator=p.glowStyle==='indicator';
      const geometryFields=indicator?[['X','x',-8192,8192,.1],['Y','y',-8192,8192,.1],['Rotation','directionDeg',-360,360,.1],['Width','width',1,800,.1],...(r.lightShape==='round'?[]:[['Height','height',1,800,.1]])]:[['X','x',-8192,8192,.1],['Y','y',-8192,8192,.1],['Direction','directionDeg',-360,360,.1],['Width','width',1,800,.1],['Length','length',1,1200,1],['Spread','spreadDeg',0,120,.1]];
      q('[data-inspector]').innerHTML=`<h2>${esc(p.name)}</h2><label>Name<input data-property="label" value="${esc(e.label||p.name)}"></label><div class="fxActions"><button data-action="duplicate">Duplicate</button><button data-action="delete">Delete</button><button data-action="up" aria-label="Move effect up">↑</button><button data-action="down" aria-label="Move effect down">↓</button></div><label><input type="checkbox" data-property="enabled" ${e.enabled!==false?'checked':''}> Enabled</label><label><input type="checkbox" data-isolate ${state.isolate?'checked':''}> Isolate selected effect</label><label>Plane<select data-property="plane"><option value="behind" ${e.plane==='behind'?'selected':''}>Behind sprite</option><option value="front" ${e.plane==='front'?'selected':''}>In front of sprite</option></select></label><fieldset><legend>Emitter · source pixels</legend>${geometryFields.map(([label,key,min,max,step])=>number(label,'geometry.'+key,g[key],min,max,step)).join('')}</fieldset>
      <fieldset><legend>Appearance & motion</legend>${(p.colorFields||['primaryColor','secondaryColor','glowColor']).map((key,i)=>`<label>${(p.colorLabels||['Core / near color','Vapor / outer color','Glow color'])[i]}<input type="color" data-property="overrides.${key}" value="${r[key]}"></label>`).join('')}${p.controls.map(key=>{const c=E.CONTROL_DEFS[key];return c.type==='select'?`<label>${esc(c.label)}<select data-property="overrides.${key}" aria-label="${esc(c.label)}">${Object.entries(c.options).map(([value,label])=>`<option value="${value}" ${r[key]===value?'selected':''}>${esc(label)}</option>`).join('')}</select></label>`:c.type==='checkbox'?`<label><input type="checkbox" data-property="overrides.${key}" ${r[key]?'checked':''}> ${esc(c.label)}</label>`:number(c.label,'overrides.'+key,r[key],c.min,key==='particleCap'?p.hardCap:c.max,c.step);}).join('')}<button data-action="reset">Reset appearance</button></fieldset><fieldset><legend>Visibility masks</legend><p>Draw a polygon; Enter or double-click closes it. Escape cancels. Drag its vertices to refine.</p><button data-action="include">Draw include</button><button data-action="cutout">Draw cutout</button><button data-action="clear-mask">Clear masks</button>${number('Mask feather','overrides.edgeFeatherPx',r.edgeFeatherPx,0,160,1)}</fieldset><button data-action="seed">New variation</button>`;
    }
    function point(g,distance,angle=g.directionDeg){const a=angle*Math.PI/180;return {x:g.x+Math.cos(a)*distance,y:g.y+Math.sin(a)*distance};}
    function guides(){
      const group=q('[data-guide-transform]');
      if(!state.document){group.innerHTML='';return;}
      const {width,height}=state.document.sourceSize;
      const handle=(x,y,kind,extra='')=>`<circle cx="${x}" cy="${y}" r="${5/state.zoom}" data-handle="${kind}" ${extra}/>`;
      group.innerHTML=`<rect class="fxSpriteBounds" x="0" y="0" width="${width}" height="${height}"/>`+state.document.effects.map(e=>{
        const g=e.geometry,indicator=E.presetById(e.presetId).glowStyle==='indicator',selected=e.id===state.selected;
        const end=point(g,indicator?Math.max(g.width,g.height)/2+24/state.zoom:g.length);
        if(indicator){const r=E.resolve(e,{}),h=r.lightShape==='round'?g.width:g.height,w=point(g,g.width/2),heightEnd=point(g,h/2,g.directionDeg+90);
          return `<g data-effect="${esc(e.id)}" class="${selected?'fxSelected':''}"><path d="M${g.x},${g.y} L${end.x},${end.y}"/><circle data-select="${esc(e.id)}" cx="${g.x}" cy="${g.y}" r="${7/state.zoom}"/>${selected?handle(end.x,end.y,'direction')+handle(w.x,w.y,'width')+(r.lightShape==='round'?'':handle(heightEnd.x,heightEnd.y,'height'))+handle(g.x,g.y,'position'):''}</g>`;
        }
        const widthEnd=point(g,g.width/2,g.directionDeg+90),spreadEnd=point(g,g.length*.65,g.directionDeg+g.spreadDeg/2);
        return `<g data-effect="${esc(e.id)}" class="${selected?'fxSelected':''}"><path d="M${g.x},${g.y} L${end.x},${end.y}"/><circle data-select="${esc(e.id)}" cx="${g.x}" cy="${g.y}" r="${7/state.zoom}"/>${selected?handle(end.x,end.y,'direction')+handle(widthEnd.x,widthEnd.y,'width')+handle(spreadEnd.x,spreadEnd.y,'spread')+handle(g.x,g.y,'position'):''}</g>`;
      }).join('')+(current()?.mask?['includes','cutouts'].map(kind=>(current().mask[kind]||[]).map((points,polygon)=>`<g class="fxMask ${kind}"><polygon points="${points.map(p=>`${p.x},${p.y}`).join(' ')}"/>${points.map((p,i)=>handle(p.x,p.y,'vertex',`data-mask-type="${kind}" data-polygon="${polygon}" data-vertex="${i}"`)).join('')}</g>`).join('')).join(''):'')+(state.polygon?`<polyline class="fxDraft" points="${state.polygon.points.map(p=>`${p.x},${p.y}`).join(' ')}"/>`:'');
    }
    function transform(){
      const {width=0,height=0}=state.document?.sourceSize||{},pose=state.pose;
      const facing=pose?.facing??(state.mirror?-1:1),camera=state.zoom/preview.scale;
      const shift=state.movement&&pose?pose.point:{x:0,y:0};
      return new DOMMatrix().translate(state.x+width*state.zoom*(state.mirror?-1:1)/2+shift.x*camera,state.y+height*state.zoom/2+shift.y*camera)
        .rotate(pose?.rotation||0).scale(state.zoom*facing,state.zoom).translate(-width/2,-height/2);
    }
    function draw(force=false){
      if(!state.image||!root.isConnected)return;
      const rect=viewport.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),w=Math.max(1,Math.round(rect.width*dpr)),h=Math.max(1,Math.round(rect.height*dpr));
      if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
      const ctx=canvas.getContext('2d'),t=transform();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,w,h);ctx.setTransform(t.a*dpr,t.b*dpr,t.c*dpr,t.d*dpr,t.e*dpr,t.f*dpr);
      state.composer?.draw(state.time,force);
      const paint=plane=>state.composer?.planes.filter(p=>p.plane===plane&&p.items.length).forEach(p=>ctx.drawImage(p.canvas,p.box.x,p.box.y));
      paint('behind');ctx.drawImage(state.image,0,0);paint('front');
      q('[data-guide-transform]').setAttribute('transform',`matrix(${t.a} ${t.b} ${t.c} ${t.d} ${t.e} ${t.f})`);
      q('[data-preview-view]').textContent=`Camera ${Math.round(state.zoom/preview.scale*100)}% · ${state.time.toFixed(1)} s`;
    }
    function fit(all=false){
      if(!state.document)return;
      const {width,height}=state.document.sourceSize;
      let box=all?FX.union([{x:0,y:0,width,height},...(state.composer?.planes.filter(p=>p.items.length).map(p=>p.box)||[])]):{x:0,y:0,width,height};
      if(state.movement&&config)box=FX.union(runtime.cacheFor(config).samples.map(p=>({...box,x:box.x+p.x/preview.scale*(state.mirror?-1:1),y:box.y+p.y/preview.scale})));
      const rect=viewport.getBoundingClientRect();state.zoom=Math.min((rect.width-100)/box.width,(rect.height-80)/box.height);
      state.x=rect.width/2-(box.x+box.width/2)*state.zoom*(state.mirror?-1:1);state.y=rect.height/2-(box.y+box.height/2)*state.zoom;guides();draw();
    }
    async function selectAsset(key){
      const token=++state.token,asset=state.assets.find(a=>a.key===key);if(!asset)return;
      hiddenPaused=false;runtime.releaseLevel();transportStatus();state.composer?.dispose();state.composer=null;state.pose=null;state.time=0;config=null;releaseAudio();q('[data-audio-status]').textContent='';
      state.busy=true;message('Loading sprite and saved FX…');
      try{
        const imageKey=options.assetCache.normalize(asset.frameA),cached=options.assetCache.images.has(imageKey);
        const imagePromise=options.assetCache.image(asset.frameA);if(!cached)ownedImages.set(imageKey,imagePromise);
        const [saved,image]=await Promise.all([api('/__dev/flyby-fx?asset='+encodeURIComponent(key)),imagePromise]);
        if(token!==state.token||editor!==state)return;
        const errors=FX.validate(saved.document,asset.frameA,{width:image.naturalWidth,height:image.naturalHeight});if(errors.length)throw new Error(errors.join(' '));
        state.asset=asset;state.image=image;state.document=saved.document;state.saved=FX.clone(saved.document);state.revision=saved.revision;state.selected=state.document.effects[0]?.id||null;state.time=0;state.polygon=null;
        releaseImages(imageKey);
        q('[data-asset]').value=key;q('[data-audio-source]').textContent=asset.sound||'No audio file in this asset.';
        let sound=asset.sound||'';
        if(sound){
          const audioKey=options.assetCache.normalize(sound),cached=options.assetCache.audio.has(audioKey),promise=options.assetCache.sound(sound);
          if(!cached)ownedAudio.set(audioKey,promise);
          try{await promise;}catch{sound='';q('[data-audio-status]').textContent='Audio could not load. Visual preview is available; reselect the asset to retry.';}
        }
        if(token!==state.token||editor!==state)return;
        q('[data-preview-audio]').disabled=!sound;
        config={...preview,id:previewId,frameA:asset.frameA,sound,soundTriggers:['during'],path:[{x:-600*direction,y:0},{x:0,y:-80},{x:600*direction,y:0}]};
        previewLevel={id:'fx-workspace',world:{width:1200,height:800},ambientFlybys:[config]};
        await runtime.prepareLevel(previewLevel);
        if(token!==state.token||editor!==state)return;
        state.busy=false;rebuild();list();inspector();fit(true);
        transportStatus();
        q('[data-dimensions]').textContent=`${image.naturalWidth} × ${image.naturalHeight} source pixels`;
      }catch(error){transportStatus();message(error.message);}finally{state.busy=false;}
    }
    async function save(){
      if(!options.canSave||!state.document||state.busy)return false;
      state.busy=true;setDirty();
      try{const result=await api('/__dev/flyby-fx?asset='+encodeURIComponent(state.asset.key),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({document:state.document,revision:state.revision})});state.saved=FX.clone(result.document);state.revision=result.revision;FX.invalidate(state.asset.frameA);message('Saved asset FX. Every use of this sprite loads this configuration.');return true;}catch(error){message(error.message);return false;}finally{state.busy=false;setDirty();}
    }
    async function leave(action){
      if(state.busy||state.leaving)return;
      state.leaving=true;
      try{
      if(state.dirty){
        const dialog=q('[data-unsaved]');dialog.showModal();
        const choice=await new Promise(resolve=>{const handler=e=>{const button=e.target.closest('[data-choice]');if(button){dialog.removeEventListener('click',handler);dialog.removeEventListener('cancel',cancel);dialog.close();resolve(button.dataset.choice);}};const cancel=e=>{e.preventDefault();dialog.removeEventListener('click',handler);dialog.removeEventListener('cancel',cancel);dialog.close();resolve('cancel');};dialog.addEventListener('click',handler);dialog.addEventListener('cancel',cancel);});
        if(choice==='cancel'||choice==='save'&&!await save())return;
      }
      action();
      }finally{state.leaving=false;}
    }
    function dispose(){++state.token;runtime.releaseLevel();releaseAudio();state.composer?.dispose();canvas.width=canvas.height=0;state.image=null;releaseImages();observer.disconnect();window.removeEventListener('keydown',key,true);window.removeEventListener('beforeunload',unload);document.removeEventListener('visibilitychange',visibility);root.remove();app.inert=wasInert;app.hidden=wasHidden;editor=null;}
    state.close=()=>leave(()=>{dispose();options.onClose();});state.dispose=dispose;
    function changed(refreshInspector=false){rebuild();list();if(refreshInspector)inspector();}
    function add(presetId){if(!state.document)return;const e=E.defaultInstance(presetId,null,state.document.sourceSize,state.document.effects.length);delete e.layerSlot;delete e.groupId;e.id='fx-'+crypto.randomUUID();e.plane=E.presetById(presetId).glowStyle==='indicator'?'front':'behind';state.document.effects.push(e);state.selected=e.id;changed(true);}
    function finishPolygon(){if(!state.polygon)return;const draft=state.polygon;if(draft.points.length<3){message('A mask needs at least three points.');return;}const errors=E.validateMask({includes:[],cutouts:[],[draft.kind]:[draft.points]});if(errors.length){message(errors.join(' '));return;}const e=current();e.mask||={includes:[],cutouts:[]};e.mask[draft.kind].push(draft.points);state.polygon=null;changed();}
    function previewSettings(open){q('.fxPreviewSettings').hidden=!open;q('[data-action="preview-settings"]').setAttribute('aria-expanded',String(open));}
    root.addEventListener('pointerdown',event=>{if(!event.target.closest('.fxPreviewSettings,[data-action="preview-settings"]'))previewSettings(false);});
    root.addEventListener('click',async event=>{
      if(event.target.closest('[data-action="preview-settings"]')){previewSettings(q('.fxPreviewSettings').hidden);return;}
      if(state.busy)return;
      const selected=event.target.closest('[data-select]');if(selected&&!state.polygon){state.selected=selected.dataset.select;changed(true);return;}
      const action=event.target.closest('[data-action]')?.dataset.action,e=current();
      if(action==='world')return leave(()=>{dispose();options.onWorld();});
      if(action==='close')return state.close();if(action==='save')return save();
      if(action==='revert')return leave(()=>selectAsset(state.asset.key));
      if(action==='add')return add(q('[data-preset]').value);
      if(action==='fit-sprite'||action==='fit-effects')return fit(action==='fit-effects');
      if(action==='actual'){state.zoom=preview.scale;fitCenter();return;}
      if(action==='play'){
        options.unlockAudio?.();
        if(runtime.previewState(previewId)==='idle')startPreview();else runtime.togglePreview(previewId);
        if(state.playing&&state.audioBlocked){state.audioBlocked=false;q('[data-audio-status]').textContent='';runtime.retryPreviewAudio(previewId);}
        return;
      }
      if(action==='restart'){options.unlockAudio?.();startPreview();return;}
      if(action==='stop'){runtime.stopPreview();state.time=0;state.pose=null;draw(true);return;}
      if(!e)return;
      if(action==='duplicate'){const copy=FX.clone(e);copy.id='fx-'+crypto.randomUUID();copy.label=(e.label||E.presetById(e.presetId).name)+' copy';copy.geometry.x+=12;state.document.effects.push(copy);state.selected=copy.id;}
      if(action==='delete'){state.document.effects=state.document.effects.filter(x=>x!==e);state.selected=state.document.effects[0]?.id;}
      if(action==='up'||action==='down'){const items=state.document.effects,i=items.indexOf(e),j=i+(action==='up'?-1:1);if(j>=0&&j<items.length)[items[i],items[j]]=[items[j],items[i]];}
      if(action==='reset')e.overrides={};if(action==='seed')e.seed=Math.floor(Math.random()*2147483647);
      if(action==='clear-mask')delete e.mask;
      if(action==='include'||action==='cutout'){state.polygon={kind:action==='include'?'includes':'cutouts',points:[]};message('Click polygon points. Enter finishes; Escape cancels.');guides();return;}
      if(action)changed(true);
    });
    function fitCenter(){if(!state.image)return;const rect=viewport.getBoundingClientRect();state.x=rect.width/2-state.image.naturalWidth*state.zoom/2*(state.mirror?-1:1);state.y=rect.height/2-state.image.naturalHeight*state.zoom/2;guides();draw();}
    root.addEventListener('input',event=>{
      if(event.target.dataset.previewSetting){changePreview(event.target);return;}
      if(event.target.matches('[data-preview-mute]')){state.muted=event.target.checked;updatePreview();return;}
      const input=event.target,path=input.dataset.property;if(!path||!current()||state.busy)return;
      if(input.type==='number'&&(input.value===''||!input.validity.valid))return;
      const parts=path.split('.'),e=current(),owner=parts.length===2?(e[parts[0]]||= {}):e;
      owner[parts.at(-1)]=input.type==='checkbox'?input.checked:input.type==='number'?Number(input.value):input.value;
      changed(path==='overrides.lightShape');
    });
    root.addEventListener('change',event=>{
      const input=event.target;
      if(input.matches('[data-asset]')){const next=input.value;input.value=state.asset?.key||'';leave(()=>selectAsset(next));}
      if(input.matches('[data-background]'))viewport.dataset.background=input.value;
      if(input.matches('[data-show-guides]'))q('[data-guides]').style.visibility=input.checked?'visible':'hidden';
      if(input.matches('[data-scale]')&&input.value){preview.scale=Number(input.value);state.zoom=preview.scale;updatePreview();fitCenter();}
      if(input.matches('[data-isolate]')){state.isolate=input.checked;rebuild();}
      if(input.matches('[data-movement]')){const status=runtime.previewState(previewId);state.movement=input.checked;options.unlockAudio?.();if(status!=='idle')startPreview(status==='paused');fit(true);}
      if(input.matches('[data-mirror]')){preview.mirrorX=input.checked;updatePreview();fitCenter();}
      if(input.matches('[data-preview-direction]')){direction=Number(input.value);updatePreview();fitCenter();}
    });
    function changePreview(input){
      if(state.busy||!config||input.type==='number'&&(input.value===''||!input.validity.valid))return;
      const field=input.dataset.previewSetting,status=runtime.previewState(previewId);
      preview[field]=input.type==='checkbox'?input.checked:input.type==='number'?Number(input.value):input.value;
      updatePreview();
      if(field==='loopDuringFlyby'){options.unlockAudio?.();if(status!=='idle')startPreview(status==='paused');}
      if(field==='faceFlightDirection')fitCenter();
    }
    function local(event){const rect=viewport.getBoundingClientRect();return new DOMPoint(event.clientX-rect.left,event.clientY-rect.top).matrixTransform(transform().inverse());}
    viewport.addEventListener('wheel',event=>{event.preventDefault();if(!state.image)return;const p=local(event),rect=viewport.getBoundingClientRect();state.zoom=Math.max(.02,Math.min(8,state.zoom*Math.exp(-event.deltaY*.001)));const screen=p.matrixTransform(transform());state.x+=event.clientX-rect.left-screen.x;state.y+=event.clientY-rect.top-screen.y;guides();draw();},{passive:false});
    viewport.addEventListener('pointerdown',event=>{
      if(state.busy||!state.image)return;
      const handle=event.target.closest('[data-handle]'),p=local(event);
      if(state.polygon&&event.button===0){event.preventDefault();state.polygon.points.push(p);guides();return;}
      if(event.button===1||event.button===0&&!handle&&!state.polygon&&!event.target.closest('[data-select]'))state.drag={kind:'pan',x:event.clientX,y:event.clientY,originX:state.x,originY:state.y};
      else if(handle){state.drag={kind:handle.dataset.handle,...handle.dataset,start:p,geometry:FX.clone(current().geometry)};}
      else return;
      event.preventDefault();viewport.setPointerCapture(event.pointerId);
    });
    viewport.addEventListener('pointermove',event=>{
      const drag=state.drag;if(!drag||state.busy)return;
      if(drag.kind==='pan'){state.x=drag.originX+event.clientX-drag.x;state.y=drag.originY+event.clientY-drag.y;draw();return;}
      const p=local(event),e=current(),g=e.geometry,dx=p.x-g.x,dy=p.y-g.y;
      if(drag.kind==='position'){g.x=Math.round((drag.geometry.x+p.x-drag.start.x)*10)/10;g.y=Math.round((drag.geometry.y+p.y-drag.start.y)*10)/10;}
      const indicator=E.presetById(e.presetId).glowStyle==='indicator';
      if(drag.kind==='direction'){g.directionDeg=Math.atan2(dy,dx)*180/Math.PI;if(!indicator)g.length=Math.max(1,Math.min(1200,Math.hypot(dx,dy)));}
      if(indicator&&(drag.kind==='width'||drag.kind==='height')){const a=(g.directionDeg+(drag.kind==='height'?90:0))*Math.PI/180;g[drag.kind]=Math.max(1,Math.min(800,Math.abs(dx*Math.cos(a)+dy*Math.sin(a))*2));}
      else if(drag.kind==='width')g.width=Math.max(1,Math.min(800,Math.abs(-dx*Math.sin(g.directionDeg*Math.PI/180)+dy*Math.cos(g.directionDeg*Math.PI/180))*2));
      if(drag.kind==='spread')g.spreadDeg=Math.max(0,Math.min(120,Math.abs(((Math.atan2(dy,dx)*180/Math.PI-g.directionDeg+540)%360)-180)*2));
      if(drag.kind==='vertex')e.mask[drag.maskType][Number(drag.polygon)][Number(drag.vertex)]={x:p.x,y:p.y};
      changed();for(const input of q('[data-inspector]').querySelectorAll('[data-property^="geometry."]'))input.value=g[input.dataset.property.split('.')[1]];
    });
    const release=()=>{state.drag=null;};viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',release);
    viewport.addEventListener('dblclick',()=>{if(state.polygon){state.polygon.points.pop();finishPolygon();}});
    function key(event){
      if(event.key==='Escape'&&!q('.fxPreviewSettings').hidden){event.preventDefault();event.stopImmediatePropagation();previewSettings(false);q('[data-action="preview-settings"]').focus();return;}
      if(event.ctrlKey&&event.shiftKey&&event.key.toLowerCase()==='d'){event.preventDefault();event.stopImmediatePropagation();if(!event.repeat)state.close();return;}
      if(!root.contains(document.activeElement)&&document.activeElement?.tagName==='INPUT')return;
      if(event.target.matches('input,select,textarea'))return;
      if(state.polygon&&['Enter','Escape','Backspace'].includes(event.key)){event.preventDefault();event.stopImmediatePropagation();if(event.key==='Enter')finishPolygon();if(event.key==='Escape')state.polygon=null;if(event.key==='Backspace')state.polygon?.points.pop();guides();return;}
      const directions={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
      if(current()&&directions[event.key]){event.preventDefault();event.stopImmediatePropagation();const [x,y]=directions[event.key],step=event.altKey ? 0.1 : event.shiftKey ? 10 : 1;current().geometry.x+=x*step;current().geometry.y+=y*step;changed(true);}
    }
    function unload(event){if(state.dirty){event.preventDefault();event.returnValue='';}}
    function visibility(){
      if(document.hidden){hiddenPaused=state.playing;if(hiddenPaused)runtime.togglePreview(previewId);}
      else if(hiddenPaused){hiddenPaused=false;runtime.togglePreview(previewId);}
    }
    window.addEventListener('keydown',key,true);window.addEventListener('beforeunload',unload);document.addEventListener('visibilitychange',visibility);
    const observer=new ResizeObserver(()=>draw());observer.observe(viewport);
    api('/__dev/flyby-assets').then(result=>{if(editor!==state)return;state.assets=result.assets;q('[data-asset]').innerHTML=result.assets.map(a=>`<option value="${esc(a.key)}">${esc(a.label)}</option>`).join('');if(result.assets.length)selectAsset(result.assets.find(a=>a.key==='flybys/shredder')?.key||result.assets[0].key);else message('No eligible single-PNG flybys found.');}).catch(error=>message(error.message));
  }
  global.AtlasFlybyFXEditor={open,get state(){return editor;},dispose(){editor?.dispose();}};
})(window);
