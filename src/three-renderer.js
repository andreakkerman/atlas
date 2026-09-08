(function (global) {
  'use strict';
  const SUPPORTED_LEVEL='LVL-0001',ROOT='Levels/LVL-0001/3d/';
  const DEBUG=new URLSearchParams(location.search).get('debug3d')==='1';
  const PREPARATION_STAGES=Object.freeze(['3D-engine starten…','Wereld en modellen laden…','Texturen en materialen voorbereiden…','WebGPU, licht en schaduwen opwarmen…','Eerste speelbare beeld afronden…']);
  let modules;
  const loadModules=()=>modules ||= Promise.all([import('../assets/vendor/three/three.webgpu.min.js'),import('../assets/vendor/three/loaders/GLTFLoader.js'),import('../assets/vendor/three/loaders/HDRLoader.js'),import('../assets/vendor/three/loaders/DRACOLoader.js')]);
  function createRuntime(options) {
    const compactPreparation=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
    const preparationStrategy=compactPreparation?'compact':'desktop';
    let lastCompletedOperation='',releasedImageBytes=0;
    function debugMark(operation,state='pending') {
      if(!DEBUG)return;
      gpuTrace?.checkpoint(operation,state);
      if(state==='complete')lastCompletedOperation=operation;
      const record={operation,state,lastCompleted:lastCompletedOperation,strategy:preparationStrategy,at:new Date().toISOString()};
      try{localStorage.setItem('atlas3d-debug-preparation-v1',JSON.stringify(record));}catch{}
      global.dispatchEvent(new CustomEvent('atlas-three-preparation',{detail:record}));
    }
    let THREE,renderer,scene,camera,canvas,route,sun,post,worldPass,ownedDevice;
    const postResources=[];
    let generation=0,loading=false,raf=0,last=0,frames=0,fps=0,averageMs=0,lifetime=null;
    let status='idle',error=null,yaw=-.08,pitch=.015,positionIndex=0,currentTarget=null,npc=null,npcPath=null,npcFrame=null;
    const keys=new Set(),textures=new Set(),flames=[];
    let preparation='',diagnostic='',warmupViews=0,warmupTotal=0,touchWalk=0,touchTurn=0,waitTimer=0,waitingSince=0;
    let preparationMs=null,lastReport=0;
    let preparationCompleted=0;
    let inputType=global.matchMedia('(any-pointer: coarse)').matches?'touch':'desktop';
    let visibleProfile=null,frameSampled=false,gpuTrace=null;
    const frameWindow=[];
    const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
    let movementEvidence={applied:0};
    const input=global.AtlasThreeInput.create({nativeTouch:compactPreparation,keys,canPlay,activate:options.activate,onInputType:setInputType,interact,
      onVector:(walk,turn)=>{touchWalk=walk;touchTurn=turn;},onLook:(dx,dy)=>{yaw-=dx*.0022;pitch=clamp(pitch-dy*.0022,-1.3,1.3);}});
    function snapshot() {
      return {status,error,ready:status==='ready',preparation,diagnostic,debug:DEBUG,preparationStrategy,releasedImageBytes,frameSampled,input:DEBUG?input.snapshot():undefined,movement:DEBUG?movementEvidence:undefined,visibleProfile:DEBUG?visibleProfile?.snapshot():undefined,gpuPreparation:gpuTrace?.snapshot(),preparationCompleted,preparationTotal:PREPARATION_STAGES.length,preparationMs,inputType,warmupViews,warmupTotal,fps,averageMs,backend:renderer?.backend?.isWebGPUBackend?'WebGPU':'uninitialized',firstPerson:true,levelId:SUPPORTED_LEVEL,source:ROOT+'lvl0001.glb',camera:camera?.position.toArray(),yaw,pitch,positionIndex,target:currentTarget,drawCalls:renderer?.info.render.drawCalls||0,triangles:renderer?.info.render.triangles||0,resolution:canvas?[canvas.width,canvas.height]:[0,0],frames};
    }
    function report(next=status,caught) {status=next;if(caught!==undefined)error=caught?String(caught.message||caught):null;else if(next!=='error')error=null;document.querySelector('.gameShell')?.classList.toggle('threeReady',status==='ready');options.onStatus?.(snapshot());if(DEBUG&&status==='ready')global.dispatchEvent(new CustomEvent('atlas-three-input',{detail:{...input.snapshot(),movement:movementEvidence,player:options.getPlayer(),guards:options.inputGuards?.()}}));}
    function setInputType(next) {if(inputType!==next){inputType=next;report();}}
    // Each boundary is reached only after the preceding work has completed.
    function preparationStage(completed,nextStatus) {preparationCompleted=completed;preparation=PREPARATION_STAGES[completed]||'';report(nextStatus);}
    function releasePointerLock() {
      // iPad Safari may expose neither API: undefined === an unset canvas is true.
      if(canvas && document.pointerLockElement===canvas && typeof document.exitPointerLock==='function')document.exitPointerLock();
    }
    function clearWaiting() {clearInterval(waitTimer);waitTimer=0;waitingSince=0;}
    async function observe(label,task,token,timeoutMs=0) {
      if(token!==generation)throw new DOMException('Voorbereiding gestopt','AbortError');
      if(lifetime?.signal.aborted)throw lifetime.signal.reason;
      clearWaiting();diagnostic=label;waitingSince=performance.now();debugMark(label);report();
      if(token!==generation)throw new DOMException('Voorbereiding gestopt','AbortError');
      const started=waitingSince;
      const timer=waitTimer=setInterval(()=>{if(token!==generation){clearInterval(timer);return;}const seconds=Math.floor((performance.now()-started)/1000);diagnostic=`${label} — wacht nog steeds (${seconds} s)`;report();},1000);
      const signal=lifetime?.signal;let deadline,cancel;
      if(signal?.aborted){clearWaiting();clearInterval(timer);throw signal.reason;}
      try {
        const interrupted=new Promise((_,reject)=>{
          cancel=()=>reject(signal.reason||new DOMException('Voorbereiding gestopt','AbortError'));
          signal?.addEventListener('abort',cancel,{once:true});
          if(signal?.aborted)cancel();
          if(timeoutMs)deadline=setTimeout(()=>reject(new DOMException(`${label} reageert niet na ${timeoutMs/1000} seconden. Kies Illustrated om verder te spelen.`,'TimeoutError')),timeoutMs);
        });
        const result=await Promise.race([task(),interrupted]);clearInterval(timer);
        if(token===generation)clearWaiting();
        if(token===generation){diagnostic=`${label} — gelukt`;debugMark(label,'complete');report();}
        return result;
      } catch(caught) {
        clearInterval(timer);
        if(token===generation){clearWaiting();const detail=`${caught?.name||'Error'}: ${caught?.message||caught}`;diagnostic=`${label} — mislukt: ${detail}`;debugMark(diagnostic,'error');report();}throw caught;
      } finally {clearTimeout(deadline);clearInterval(timer);signal?.removeEventListener('abort',cancel);}
    }
    const gpuWork=(label,task,token)=>observe(label,()=>gpuTrace&&(/renderer.init|compileren|renderer en post-processing/.test(label))?gpuTrace.scope(label,task):task(),token,90000);
    // Safari may suspend rAF during visibility/layout transitions. A UI yield
    // must not leave preparation waiting forever after the GPU has completed.
    const yieldFrame=()=>new Promise(resolve=>{let frame,timer;const done=()=>{cancelAnimationFrame(frame);clearTimeout(timer);resolve();};frame=requestAnimationFrame(done);timer=setTimeout(done,100);});
    async function prepareWork(label,task,token) {
      return observe(label,async()=>{await yieldFrame();if(token!==generation)throw new DOMException('Voorbereiding gestopt','AbortError');return task();},token);
    }
    function instrumentPreparationPass(name,node) {
      if(!DEBUG)return;
      node.atlasProfileName=name;
      const update=node.updateBefore;let previousSize='';
      node.updateBefore=function(frame){
        const size=`${canvas?.width}×${canvas?.height}`;
        const run=()=>gpuTrace?gpuTrace.withPass(name,()=>update.call(this,frame)):update.call(this,frame);
        if(status!=='warming'||size===previousSize)return run();
        debugMark(`${name}: renderresources voorbereiden (${size})`);
        const result=run();previousSize=size;
        debugMark(`${name}: GPU-opdrachten ingediend (${size})`,'complete');return result;
      };
    }
    async function loadWorld(GLTFLoader,DRACOLoader,token) {
      const draco=new DRACOLoader().setDecoderPath('assets/vendor/three/draco/').setDecoderConfig({type:'wasm'}).setWorkerLimit(compactPreparation?1:2);
      const loader=new GLTFLoader().setDRACOLoader(draco);
      const decodedMeshes=[],decodedTextures=[];let complete=false;
      // Preload through the parser's normal dependency cache, before scene loading
      // fans out. Preserve all source pixels and geometry, but avoid simultaneous
      // image decoding, Draco worker heaps and hundreds of outstanding mesh jobs.
      if(compactPreparation)loader.register(parser=>({name:'ATLAS_sequential_preparation',beforeRoot:async()=>{
        for(const type of ['texture','mesh']){
          const count=parser.json[type==='texture'?'textures':'meshes']?.length||0;
          for(let i=0;i<count;i++){const resource=await prepareWork(`${type==='texture'?'Textuur decoderen':'Draco-mesh voorbereiden'} ${i+1}/${count}`,()=>parser.getDependency(type,i),token);if(resource)(type==='texture'?decodedTextures:decodedMeshes).push(resource);}
        }
      }}));
      try {
        const gltf=await loader.loadAsync(ROOT+'lvl0001.glb');
        // Only the scene escapes this scope, not gltf.parser and its binary,
        // decoded bufferView and original-node caches throughout GPU warm-up.
        const root=gltf.scene;gltf.parser.cache.removeAll();complete=true;if(token!==generation)releaseRoot(root);return root;
      } finally {draco.dispose();if(!complete)releaseRoot({traverse:visit=>decodedMeshes.forEach(mesh=>mesh.traverse(visit))},decodedTextures);}
    }
    function resetInput() {
      input.reset('runtime stopped');
    }
    function canPlay() {return status==='ready'&&options.getRenderer()==='3d'&&options.canMove?.();}
    function stop() {cancelAnimationFrame(raf);raf=0;last=0;resetInput();}
    function safely(task) {try{task();}catch(caught){if(DEBUG)console.warn('3D cleanup:',caught);}}
    function releaseRoot(root,extraTextures=[]) {
      const geometries=new Set(),materials=new Set(),maps=new Set(extraTextures),images=new Set();
      root?.traverse(obj=>{if(obj.geometry)geometries.add(obj.geometry);for(const m of Array.isArray(obj.material)?obj.material:obj.material?[obj.material]:[])materials.add(m);});
      materials.forEach(mat=>{for(const value of Object.values(mat))if(value?.isTexture)maps.add(value);safely(()=>mat.dispose());});
      geometries.forEach(g=>safely(()=>g.dispose()));
      maps.forEach(t=>{if(typeof ImageBitmap!=='undefined'&&t.image instanceof ImageBitmap)images.add(t.image);safely(()=>t.dispose());});
      images.forEach(image=>safely(()=>image.close()));
    }
    function dispose(notify=true) {
      gpuTrace?.cleanup();
      safely(()=>visibleProfile?.stop());visibleProfile=null;frameWindow.length=0;frameSampled=false;
      if(loading)debugMark('Voorbereiding gestopt','cancelled');
      generation++;lifetime?.abort();lifetime=null;loading=false;releasedImageBytes=0;clearWaiting();safely(stop);safely(()=>input.dispose());
      safely(releasePointerLock);
      safely(()=>releaseRoot(scene,textures));textures.clear();
      postResources.splice(0).forEach(resource=>safely(()=>resource.dispose?.()));safely(()=>post?.dispose());post=null;
      safely(()=>renderer?.dispose());
      safely(()=>renderer?.backend?.context?.unconfigure());
      // The device is explicitly requested by Atlas, not owned by Three.js.
      // Always destroy it, even if an earlier disposer throws.
      safely(()=>ownedDevice?.destroy());ownedDevice=null;
      renderer=scene=camera=canvas=route=sun=npc=worldPass=null;flames.length=0;npcPath=null;npcFrame=null;frames=fps=averageMs=warmupViews=warmupTotal=preparationCompleted=0;preparation=diagnostic='';if(notify)report('idle');
    }
    function routePosition(atlasX) {
      const points=route.route;let i=0;while(i<points.length-2&&atlasX>points[i+1].atlas[0])i++;
      const a=points[i],b=points[i+1],t=clamp((atlasX-a.atlas[0])/(b.atlas[0]-a.atlas[0]),0,1);
      return {i,t,position:new THREE.Vector3().fromArray(a.position).lerp(new THREE.Vector3().fromArray(b.position),t),atlasY:a.atlas[1]+(b.atlas[1]-a.atlas[1])*t};
    }
    function move(dt) {
      if(!canPlay()){input.reset('movement guard');releasePointerLock();return;}
      const forward=clamp(Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'))+touchWalk,-1,1);
      yaw-=touchTurn*dt*1.3;
      if(keys.has('KeyA')||keys.has('ArrowLeft'))yaw+=dt*1.3;
      if(keys.has('KeyD')||keys.has('ArrowRight'))yaw-=dt*1.3;
      if(!forward)return;
      const x=options.getPlayer().x,{i}=routePosition(x),a=route.route[i],b=route.route[i+1];
      const length=new THREE.Vector3().fromArray(a.position).distanceTo(new THREE.Vector3().fromArray(b.position));
      const next=clamp(x+forward*dt*2.7*(b.atlas[0]-a.atlas[0])/length,route.route[0].atlas[0],route.route.at(-1).atlas[0]);
      options.setPlayer?.({x:next,y:routePosition(next).atlasY});
      if(DEBUG)movementEvidence={applied:movementEvidence.applied+1,from:x,to:options.getPlayer().x,forward,dt};
    }
    function interact() {if(!currentTarget||!canPlay())return;resetInput();releasePointerLock();options.interact?.(currentTarget);}
    function attachControls() {
      input.attach(canvas,document.querySelector('[data-three-move]'),document.querySelector('[data-three-interact]'));
    }
    function partitionWorld(root) {
      root.updateMatrixWorld(true);const cells=new Map(),remove=[];const matrix=new THREE.Matrix4();
      root.traverse(obj=>{
        if(!obj.isMesh)return;
        const add=(transform)=>{
          const p=new THREE.Vector3().setFromMatrixPosition(transform);
          const key=`${obj.geometry.uuid}/${obj.material.uuid}/${Math.floor(p.x/12)}/${Math.floor(p.z/12)}`;
          let cell=cells.get(key);if(!cell){cell={geometry:obj.geometry,material:obj.material,matrices:[],name:obj.name};cells.set(key,cell);}cell.matrices.push(transform.clone());
        };
        if(obj.isInstancedMesh){for(let i=0;i<obj.count;i++){obj.getMatrixAt(i,matrix);add(new THREE.Matrix4().multiplyMatrices(obj.matrixWorld,matrix));}}else add(obj.matrixWorld);
        remove.push(obj);
      });
      remove.forEach(obj=>obj.removeFromParent());
      for(const cell of cells.values()) {
        const object=new THREE.InstancedMesh(cell.geometry,cell.material,cell.matrices.length);cell.matrices.forEach((m,i)=>object.setMatrixAt(i,m));object.instanceMatrix.needsUpdate=true;object.computeBoundingSphere();object.name=cell.name;root.add(object);
      }
    }
    function buildLights() {
      scene.add(new THREE.HemisphereLight('#b6cfde','#344d2b',1.4));
      const bounce=new THREE.DirectionalLight('#ffdaa0',1.8);bounce.position.set(-30,18,25);scene.add(bounce);
      sun=new THREE.DirectionalLight('#ffca85',10);sun.position.set(-36,42,-24);sun.castShadow=true;
      sun.shadow.mapSize.set(4096,4096);Object.assign(sun.shadow.camera,{left:-27,right:27,top:27,bottom:-27,near:.5,far:130});
      sun.shadow.bias=-.00025;sun.shadow.normalBias=.025;scene.add(sun,sun.target);
      // Keep the world shadow layer independent of the atmosphere pass camera.
      // Three otherwise inherits layer 10 and replaces the map with an empty pass.
      sun.shadow.camera.layers.enable(1);
      sun.shadow.intensity=1;
      // All shadow-casting landscape geometry is static. Reuse its map while
      // looking around, and recenter it only after the player changes position.
      sun.shadow.autoUpdate=false;sun.shadow.needsUpdate=true;
      for(const [id,pos]of Object.entries(route.landmarks)){if(id==='wind')continue;const light=new THREE.PointLight('#37e6da',id==='templeGate'?2:.6,4,2);light.position.fromArray(pos);light.position.z+=.65;scene.add(light);}
      for(const x of [16.2,21.8]) {
        const light=new THREE.PointLight('#ffab37',12,8,2);light.position.set(x,6.7,-57.7);scene.add(light);
      }
    }
    async function buildAtmosphere(token) {
      const [tsl,{bayer16},{gaussianBlur},{bloom},{ao}]=await Promise.all([import('../assets/vendor/three/three.tsl.min.js'),import('../assets/vendor/three/tsl/math/Bayer.js'),import('../assets/vendor/three/tsl/display/GaussianBlurNode.js'),import('../assets/vendor/three/tsl/display/BloomNode.js'),import('../assets/vendor/three/tsl/display/GTAONode.js')]);
      if(token!==generation)return;
      const {pass,Fn,float,screenCoordinate,screenUV,uniform,uv,sin,time,vec3,mix,smoothstep,cameraPosition,distance}=tsl;
      // Blend the authored moss material continuously across rock surfaces.
      // World-space masks avoid hard polygon borders on the raised authoring patches.
      const {texture,positionWorld,positionLocal,normalWorldGeometry,mx_noise_float}=tsl;
      let mossSource;
      scene.traverse(o=>{if(o.isMesh&&o.material?.name==='Living moss cushion')mossSource=o.material;});
      if(mossSource?.map){
        const replacements=new Map();
        scene.traverse(o=>{
          if(!o.isMesh)return;
          if(/Raised.moss.mantle/.test(o.name)){o.visible=false;return;}
          const original=o.material;
          if(!/^(rock_moss_set_01|rock_face_01|rock_boulder_dry|Weathered enclosure cliff|Scanned rocky forest bank|Scanned woodland cliff shelf|Scanned woodland boulder|knotted_pine_bark|forrest_ground_01)$/.test(original?.name))return;
          let material=replacements.get(original);
          if(!material){
            material=new THREE.MeshStandardNodeMaterial();THREE.MeshStandardMaterial.prototype.copy.call(material,original);
            if(original.name==='forrest_ground_01'){
              const growth=mx_noise_float(positionWorld.mul(.32)).add(mx_noise_float(positionWorld.mul(9)).mul(.14));
              const coverage=smoothstep(-.2,.45,growth);
              const moss=texture(mossSource.map,positionWorld.xz.mul(.8)).rgb.mul(vec3(.42,.57,.20));
              material.colorNode=mix(texture(original.map).rgb,moss,coverage);
              replacements.set(original,material);o.material=material;return;
            }
            if(original.name==='knotted_pine_bark'){
              const base=smoothstep(4,.3,positionLocal.y).mul(.5);
              const damp=mx_noise_float(positionWorld.mul(1.7)).mul(.4).add(base).add(normalWorldGeometry.z.mul(.15));
              const coverage=smoothstep(.3,.65,damp);
              const moss=texture(mossSource.map,positionWorld.xy.mul(.65)).rgb.mul(vec3(.38,.52,.18));
              material.colorNode=mix(texture(original.map).rgb,moss,coverage);
              replacements.set(original,material);o.material=material;return;
            }
            if(original.name==='rock_boulder_dry'){
              const stone=texture(original.map).rgb;
              const grey=vec3(stone.dot(vec3(.2126,.7152,.0722)));
              material.colorNode=mix(stone,grey,.7);
              replacements.set(original,material);o.material=material;return;
            }
            const macro=mx_noise_float(positionWorld.mul(1.25)).mul(.48);
            const fine=mx_noise_float(positionWorld.mul(14)).mul(.11);
            const hero=original.name==='Scanned woodland boulder';
            const coverage=smoothstep(hero ? .05 : .35,hero ? .58 : .78,normalWorldGeometry.y.add(macro).add(fine)).mul(hero ? .9 : original.name.startsWith('Scanned ') ? .48 : 1);
            const mossColor=texture(mossSource.map,positionWorld.xz.mul(.65)).rgb.mul(vec3(.46,.63,.23));
            const stone=texture(original.map).rgb;
            const mineral=hero?mix(stone,vec3(stone.dot(vec3(.2126,.7152,.0722))),.45):stone;
            material.colorNode=mix(mineral,mossColor,coverage);
            material.roughnessNode=mix(texture(original.roughnessMap||original.map).g.mul(.72),float(.95),coverage);
            replacements.set(original,material);
          }
          o.material=material;
        });
        postResources.push(...replacements.keys());
      }
      // Crossed translucent flame sheets retain volume as the player looks around.
      const flameMaterial=new THREE.MeshBasicNodeMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});
      const flameUV=uv(),height=flameUV.y;
      const center=float(.5).add(sin(height.mul(13).sub(time.mul(5))).mul(height).mul(.15));
      const width=float(1).sub(height).mul(.36).add(.025);
      const edge=flameUV.x.sub(center).abs();
      const flicker=sin(height.mul(29).add(flameUV.x.mul(18)).sub(time.mul(9))).mul(.12).add(.88);
      flameMaterial.opacityNode=smoothstep(width,width.mul(.15),edge).mul(smoothstep(0,.13,height)).mul(smoothstep(1,.64,height)).mul(flicker);
      flameMaterial.colorNode=mix(vec3(2.8,.18,.008),vec3(5,3.5,.7),smoothstep(.68,.05,height).mul(smoothstep(width,.0,edge)));
      const flameGeometry=new THREE.PlaneGeometry(.74,1.05,1,1);
      for(const x of [16.2,21.8])for(let i=0;i<3;i++){
        const flame=new THREE.Mesh(flameGeometry,flameMaterial);flame.position.set(x,6.73,-57.7);flame.rotation.y=i*Math.PI/3;scene.add(flame);flames.push(flame);
      }
      const material=new THREE.VolumeNodeMaterial();material.steps=80;material.fog=false;material.offsetNode=bayer16(screenCoordinate);
      // Extend r180's volume model to scatter the existing directional sunlight.
      // Its default direct() deliberately excludes lights without a distance field.
      const baseLightingModel=material.setupLightingModel.bind(material);
      material.setupLightingModel=()=>{
        const model=baseLightingModel();
        model.direct=function({lightNode,lightColor},builder){
          this.scatteringLight(lightColor.xyz.mul(lightNode.shadowNode||float(1)),builder);
        };
        return model;
      };
      material.scatteringNode=Fn(({positionRay})=>{
        const towardSun=positionRay.sub(cameraPosition).normalize().dot(vec3(-36,42,-24).normalize());
        const phase=float(.7975).div(float(1.2025).sub(towardSun.mul(.9)).pow(1.5));
        return float(.28).mul(phase).mul(positionRay.y.mul(-.04).exp()).mul(smoothstep(2,8,distance(positionRay,cameraPosition)));
      });
      const volume=new THREE.Mesh(new THREE.BoxGeometry(90,38,140),material);volume.position.set(5,10,-32);volume.receiveShadow=true;volume.layers.set(10);scene.add(volume);sun.layers.enable(10);
      const scenePass=worldPass=pass(scene,camera),depth=scenePass.getTextureNode('depth');material.depthNode=depth.sample(screenUV);
      const layers=new THREE.Layers();layers.set(10);const fogPass=pass(scene,camera,{depthBuffer:false});fogPass.setLayers(layers);fogPass.setResolution(.25);
      const contact=ao(depth,null,camera);contact.resolutionScale=.5;contact.radius.value=.42;
      const blur=gaussianBlur(fogPass,uniform(.3),1),combined=scenePass.mul(mix(float(1),contact.getTextureNode().r,.3)).add(blur.mul(.3));
      const glow=bloom(combined,.16,.5,1.15);post=new THREE.PostProcessing(renderer);post.outputNode=new URLSearchParams(location.search).get('threeDebug')==='volume'?scenePass.mul(.000001).add(blur):combined.add(glow);
      for(const [name,node]of [['Wereld en schaduwen',scenePass],['Volumetrisch licht',fogPass],['GTAO',contact],['Volume-blur',blur],['Bloom',glow]])instrumentPreparationPass(name,node);
      postResources.push(scenePass,fogPass,contact,blur,glow);
    }
    function updateTarget() {
      currentTarget=null;let best=0;const direction=new THREE.Vector3();camera.getWorldDirection(direction);
      for(const [id,array]of Object.entries(route.landmarks)){
        if(options.isTargetActive&&!options.isTargetActive(id))continue;
        const delta=new THREE.Vector3().fromArray(array).sub(camera.position),distance=delta.length(),facing=direction.dot(delta.normalize());
        if(distance<12&&facing>.85&&facing>best){best=facing;currentTarget=id;}
      }
      const label=document.querySelector('[data-three-interact]');if(label){label.hidden=!currentTarget;label.textContent=currentTarget?options.targetLabel?.(currentTarget)||currentTarget:'';}
    }
    function updateNpc(source=document.querySelector('[data-npc-challenge="wind"] [data-npc-sprite]')) {
      // Keep the last decoded frame while Atlas changes the image's source.
      // A persistent canvas snapshots pixels before WebGPU uploads them; sharing
      // the mutable DOM image caused partially updated character textures.
      if(!source?.complete||!source.naturalWidth)return;
      if(!npc){
        npcFrame=document.createElement('canvas');npcFrame.width=source.naturalWidth;npcFrame.height=source.naturalHeight;
        const texture=new THREE.CanvasTexture(npcFrame);texture.colorSpace=THREE.SRGBColorSpace;textures.add(texture);
        npc=new THREE.Mesh(new THREE.PlaneGeometry(2*source.naturalWidth/source.naturalHeight,2),new THREE.MeshStandardMaterial({map:texture,alphaTest:.15,alphaToCoverage:true,side:THREE.DoubleSide,roughness:1}));npc.position.set(17.8,6.38,-57);npc.castShadow=true;scene.add(npc);sun.shadow.needsUpdate=true;
      }
      npc.visible=true;const path=source.currentSrc||source.src;
      if(path!==npcPath){const context=npcFrame.getContext('2d');context.clearRect(0,0,npcFrame.width,npcFrame.height);context.drawImage(source,0,0,npcFrame.width,npcFrame.height);npc.material.map.needsUpdate=true;npcPath=path;visibleProfile?.npc(npcFrame.width,npcFrame.height);}
      npc.rotation.y=Math.atan2(camera.position.x-npc.position.x,camera.position.z-npc.position.z);
    }
    function resize(preparing=false) {
      const bounds=canvas.getBoundingClientRect(),ratio=Math.min(global.devicePixelRatio||1,1.5,1920/Math.max(1,bounds.width));
      const scale=preparing&&compactPreparation?Math.min(1,512/Math.max(bounds.width*ratio,bounds.height*ratio)):1;
      const width=Math.max(2,Math.round(bounds.width*ratio*scale)),height=Math.max(2,Math.round(bounds.height*ratio*scale));
      if(canvas.width!==width||canvas.height!==height)renderer.setSize(width,height,false);
      camera.aspect=Math.max(1,bounds.width)/Math.max(1,bounds.height);camera.updateProjectionMatrix();
      return `${width}x${height}`;
    }
    function positionCamera(x,viewYaw=yaw,viewPitch=pitch) {
      const p=routePosition(x);positionIndex=p.i+p.t;camera.position.copy(p.position);camera.position.y+=route.eyeHeight;camera.rotation.set(viewPitch,viewYaw,0,'YXZ');
      camera.updateMatrixWorld();
      if(frames===0||sun.target.position.distanceToSquared(camera.position)>.16){
        sun.position.copy(camera.position).add(new THREE.Vector3(-36,42,-24));sun.target.position.copy(camera.position);sun.shadow.needsUpdate=true;
      }
    }
    async function warmup(token) {
      const activeRenderer=renderer,activePost=post;
      const valid=()=>token===generation&&canvas?.isConnected&&options.getRenderer()==='3d';
      resize(true);positionCamera(options.getPlayer().x);
      // Decode a stable NPC frame rather than waiting on its changing animation image.
      const source=document.querySelector('[data-npc-challenge="wind"] [data-npc-sprite]');
      if(source){const frame=new Image();frame.src=source.currentSrc||source.src;await prepareWork('NPC-frame decoderen',()=>frame.decode(),token);if(!valid())return false;updateNpc(frame);}
      // Compile the actual HDR scene-pass target, including objects behind the
      // initial camera. This also uploads their geometry and material textures.
      if(compactPreparation){
        const maps=new Set();scene.traverse(o=>{for(const mat of Array.isArray(o.material)?o.material:o.material?[o.material]:[])for(const value of Object.values(mat))if(value?.isTexture)maps.add(value);});
        maps.add(scene.environment);
        const sources=new Map();for(const map of maps){if(!sources.has(map.image))sources.set(map.image,[]);sources.get(map.image).push(map);}
        let uploaded=0;
        for(const [image,variants]of sources){
          for(const map of variants){if(!valid())return false;await prepareWork(`GPU-textuur uploaden ${++uploaded}/${maps.size}: ${map.name||'beeld'} (${image?.width}×${image?.height})`,async()=>{activeRenderer.initTexture(map);await gpuWork(`Textuur ${uploaded}: wachten op GPU`,()=>activeRenderer.waitForGPU(),token);},token);}
          if(!valid())return false;
          if(typeof ImageBitmap!=='undefined'&&image instanceof ImageBitmap){
            const {width,height}=image;
            debugMark(`Statische beeldpixels vrijgeven (${width}×${height})`);
            // All sampler/color-space variants sharing these pixels are resident.
            // r180 skips uploads at an unchanged Texture.version. Preserve image
            // dimensions for node sizing; only the redundant CPU pixels go away.
            // Static GLB maps never change after this point. A new renderer loads
            // the GLB anew; dynamic CanvasTextures and HDR DataTextures stay intact.
            for(const map of variants){map.source.data={width,height};map.source.dataReady=false;}
            image.close();releasedImageBytes+=width*height*4;debugMark(`Statische beeldpixels vrijgegeven (${width}×${height})`,'complete');
          }
        }
      }
      const culling=new Map();scene.traverse(o=>{if(o.isMesh){culling.set(o,{culled:o.frustumCulled,visible:o.visible});o.frustumCulled=false;}});
      try{
        if(compactPreparation){
          // Compile every original visible mesh, including off-camera geometry,
          // in bounded batches. All lights remain present in every batch.
          const meshes=[];for(const [o,original]of culling){o.visible=false;if(original.visible)meshes.push(o);}
          // Bound draw objects rather than geometry types: one fir geometry can
          // have hundreds of spatial cells, each needing renderer preparation.
          const batchSize=16,count=Math.ceil(meshes.length/batchSize);
          worldPass.renderTarget.samples=activeRenderer.samples;worldPass.renderTarget.texture.type=activeRenderer.getColorBufferType();
          for(let i=0;i<meshes.length;i+=batchSize){
            if(!valid())return false;const objects=meshes.slice(i,i+batchSize);objects.forEach(o=>o.visible=true);
            await prepareWork(`Wereldpipelines compileren ${i/batchSize+1}/${count} (schaduwvarianten volgen in warm-up)`,async()=>{await gpuWork(`Pipelinebatch ${i/batchSize+1}: compileren`,()=>worldPass.compileAsync(activeRenderer),token);await gpuWork(`Pipelinebatch ${i/batchSize+1}: wachten op GPU`,()=>activeRenderer.waitForGPU(),token);},token);
            objects.forEach(o=>o.visible=false);
          }
        }else await gpuWork('Volledige wereldpipelines compileren (schaduwvarianten volgen in warm-up)',()=>worldPass.compileAsync(activeRenderer),token);
      }finally{culling.forEach((value,o)=>{o.frustumCulled=value.culled;o.visible=value.visible;});}
      if(!valid())return false;
      // Rendering the complete post chain initializes AO, volume, bloom, shadow
      // maps and their pipelines. Cover route sections and every viewing direction.
      const points=route.route,anchors=[options.getPlayer().x,points[Math.floor(points.length/2)].atlas[0],points.at(-1).atlas[0]];
      const views=[[0,0],[Math.PI/2,0],[Math.PI,0],[-Math.PI/2,0],[0,1.25],[0,-1.25]];
      // Pipeline coverage comes from the complete compile above, not 18 camera
      // angles. Three route samples exercise the same AO/volume/bloom chain on
      // iPad, reusing small targets; desktop keeps its existing 18-view strategy.
      const samples=compactPreparation?anchors.map((x,i)=>{
        // Preserve the first view from the physically verified iPad build.
        if(i!==2)return [x,0,0];
        const p=routePosition(x).position,t=route.landmarks.templeGate,dx=t[0]-p.x,dz=t[2]-p.z;
        return [x,Math.atan2(-dx,-dz),Math.atan2(t[1]-p.y-route.eyeHeight,Math.hypot(dx,dz))];
      }):anchors.flatMap(x=>views.map(([h,t])=>[x,h,t]));
      warmupTotal=samples.length+1;warmupViews=0;
      preparationStage(3,'warming');
      for(const [x,heading,tilt]of samples){
        if(!valid())return false;
        await prepareWork(`Warm-up ${warmupViews+1}/${samples.length}: schaduwen, GTAO, volume en bloom`,async()=>{resize(true);positionCamera(x,heading,tilt);updateNpc();await gpuWork(`Beeld ${warmupViews+1}/${samples.length}: renderer en post-processing`,()=>activePost.renderAsync(),token);await gpuWork(`Beeld ${warmupViews+1}/${samples.length}: wachten op GPU`,()=>activeRenderer.waitForGPU(),token);},token);
        if(!valid())return false;warmupViews++;report('warming');
        // Yield to the loading UI and mode-switch controls, not a timed delay.
        await yieldFrame();
      }
      preparationStage(4,'warming');
      let size;
      do {
        if(!valid())return false;
        await prepareWork('Eerste speelbare frame op volledige resolutie + GPU afronden',async()=>{size=resize();positionCamera(options.getPlayer().x);updateNpc();updateTarget();await gpuWork('Eerste speelbare frame: renderer en post-processing',()=>activePost.renderAsync(),token);await gpuWork('Eerste speelbare frame: wachten op GPU',()=>activeRenderer.waitForGPU(),token);},token);
        if(!valid())return false;
      }while(size!==resize());
      warmupViews=warmupTotal;frames=1;last=0;preparation='';return true;
    }
    function draw(time) {
      raf=0;if(loading||status!=='ready'||!canvas?.isConnected||document.hidden||options.getRenderer()!=='3d')return;
      const start=performance.now(),interval=last?time-last:null,elapsed=interval===null?1/60:interval/1000,dt=Math.min(.05,elapsed);last=time;
      try {
        const movementStart=DEBUG?performance.now():0;
        resize();move(dt);positionCamera(options.getPlayer().x);
        if(DEBUG)visibleProfile?.phase('movement/DOM/camera',performance.now()-movementStart);
        updateTarget();updateNpc();
        flames.forEach((f,i)=>{f.scale.y=.94+Math.sin(time*.006+i*1.8)*.09;});
        const shadowRefresh=sun.shadow.needsUpdate;
        renderer.info.reset();if(post)post.render();else renderer.render(scene,camera);frames++;
        const cpu=performance.now()-start;
        if(interval!==null){
          frameWindow.push({interval,cpu});let duration=frameWindow.reduce((sum,f)=>sum+f.interval,0);
          while(frameWindow.length>1&&duration-frameWindow[0].interval>=500)duration-=frameWindow.shift().interval;
          fps=1000*frameWindow.length/Math.max(1,duration);averageMs=frameWindow.reduce((sum,f)=>sum+f.cpu,0)/frameWindow.length;frameSampled=true;
        }
        visibleProfile?.frame(interval,cpu,shadowRefresh);
        if(status!=='ready'||time-lastReport>=250){lastReport=time;report('ready');}raf=requestAnimationFrame(draw);
      }catch(caught){stop();report('error',caught);}
    }
    async function sync() {
      let token=generation,operation='3D-startpad controleren';
      const checkpoint=label=>{operation=diagnostic=label;debugMark(label);report();};
      try {
      const next=document.querySelector('[data-three-canvas]');
      if(options.getRenderer()!=='3d'||options.getLevel()?.id!==SUPPORTED_LEVEL||!next){if(renderer||loading||status!=='idle')dispose();return;}
      // UI redraws must neither retry a failed device nor reveal 2D underneath.
      if(status==='error'){report();return;}
      if(loading&&canvas!==next)throw new DOMException('3D-canvas vervangen tijdens voorbereiding. Kies Illustrated en probeer opnieuw.','AbortError');
      if(renderer&&canvas===next){if(status==='ready')attachControls();report();if(!loading&&!raf&&status==='ready'&&!document.hidden)raf=requestAnimationFrame(draw);return;}
      if(loading)return;
      checkpoint('3D-startpad gecontroleerd; vorige runtime opruimen');
      try{dispose();}finally{token=generation;}
      loading=true;gpuTrace=null;lifetime=new AbortController();const preparationStarted=performance.now();canvas=next;
      checkpoint('Vorige runtime opgeruimd; laadstatus voorbereiden');preparationStage(0,'loading');
        checkpoint('navigator.gpu controleren');
        const gpu=navigator.gpu;
        checkpoint(`navigator.gpu beschikbaar: ${gpu?'ja':'nee'}`);
        if(!gpu)throw new DOMException('navigator.gpu is niet beschikbaar in deze browser.','NotSupportedError');
        const adapter=await gpuWork('WebGPU-adapter aanvragen (navigator.gpu: ja)',()=>gpu.requestAdapter({powerPreference:'high-performance'}),token);
        if(token!==generation)return;if(!adapter)throw new DOMException('WebGPU heeft geen geschikte adapter teruggegeven.','NotSupportedError');
        diagnostic='WebGPU-adapter ontvangen';report();
        const device=await gpuWork('WebGPU-device aanvragen',async()=>{const acquired=await adapter.requestDevice();if(token===generation)ownedDevice=acquired;else safely(()=>acquired.destroy());return acquired;},token);
        if(token!==generation)return;diagnostic='WebGPU-device ontvangen';report();
        gpuTrace=global.AtlasThreeGpuDiagnostics?.create(device)||null;
        device.lost?.then(info=>{if(token===generation&&info.reason!=='destroyed')lifetime?.abort(new DOMException(`WebGPU-device verloren: ${info.message||info.reason}`,'OperationError'));});
        const [lib,{GLTFLoader},{HDRLoader},{DRACOLoader}]=await observe('Three.js WebGPU-modules laden',loadModules,token);
        if(token!==generation)return;checkpoint('Three.js WebGPU-modules geladen; module koppelen');THREE=lib;
        checkpoint('Three.js WebGPURenderer maken');
        renderer=new THREE.WebGPURenderer({canvas,antialias:true,powerPreference:'high-performance',device});
        gpuTrace?.attach(renderer);
        checkpoint('Three.js WebGPURenderer gemaakt');
        const initializingRenderer=renderer;
        await gpuWork('renderer.init uitvoeren',async()=>{try{await initializingRenderer.init();}finally{if(token!==generation){safely(()=>initializingRenderer.dispose());safely(()=>initializingRenderer.backend?.context?.unconfigure());}}},token);
        if(token!==generation)return;checkpoint('renderer.init gelukt; WebGPU-backend controleren');if(!renderer.backend.isWebGPUBackend)throw Error('WebGPU is required for first-person 3D.');
        checkpoint('WebGPU-backend bevestigd; engine gereed');
        preparationStage(1,'loading');
        const loadedRoute=await observe('Routegegevens laden',()=>fetch(ROOT+'route.json').then(r=>{if(!r.ok)throw Error('Route asset could not be loaded');return r.json();}),token);
        if(token!==generation)return;route=loadedRoute;
        renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;renderer.shadowMap.enabled=true;scene=new THREE.Scene();scene.fog=new THREE.FogExp2('#dbc294',.009);camera=new THREE.PerspectiveCamera(64,1,.06,220);
        const root=await observe('GLB downloaden en decoderen',()=>loadWorld(GLTFLoader,DRACOLoader,token),token);
        if(token!==generation){releaseRoot(root);return;}
        scene.add(root);
        await prepareWork('Wereld opdelen in ruimtelijke instanties',()=>{partitionWorld(root);},token);
        if(token!==generation)return;
        const prepared=new Set();root.traverse(obj=>{if(!obj.isMesh)return;obj.castShadow=true;obj.receiveShadow=true;for(const mat of Array.isArray(obj.material)?obj.material:[obj.material]){if(prepared.has(mat))continue;prepared.add(mat);mat.side=THREE.DoubleSide;if(mat.transparent){mat.transparent=false;mat.alphaTest=.35;mat.depthWrite=true;}if(/rock|stone|carved|relief/i.test(mat.name))mat.roughness*=.46;if(mat.name==='flower_heliophila')mat.color.setRGB(.84,.43,.9);if(mat.name.startsWith('Living fir twig')){mat.alphaTest=.12;mat.alphaToCoverage=true;}for(const value of Object.values(mat))if(value?.isTexture)value.anisotropy=8;}});
        const sky=await prepareWork('HDR laden en decoderen',async()=>{const loaded=await new HDRLoader().loadAsync(ROOT+'qwantani_sunset_puresky_2k.hdr');if(token!==generation)loaded.dispose();return loaded;},token);if(token!==generation)return;textures.add(sky);
        await prepareWork('HDR-omgeving en hemeldome voorbereiden',()=>{
          const environment=sky.clone();environment.mapping=THREE.EquirectangularReflectionMapping;environment.needsUpdate=true;textures.add(environment);scene.environment=environment;scene.environmentIntensity=.16;scene.environmentRotation.set(.2,1.55,0);
          const dome=new THREE.Mesh(new THREE.SphereGeometry(180,48,24),new THREE.MeshBasicMaterial({map:sky,color:new THREE.Color(.14,.16,.19),side:THREE.BackSide,depthWrite:false,fog:false}));dome.rotation.set(.20,1.55,0);dome.renderOrder=-100;scene.add(dome);
        },token);
        preparationStage(2,'warming');await prepareWork('Licht, moss-materialen en post-processing opbouwen',async()=>{buildLights();await buildAtmosphere(token);},token);if(token!==generation)return;
        if(!next.isConnected){dispose();sync();return;}
        if(!await warmup(token)||token!==generation)return;
        attachControls();loading=false;preparationMs=performance.now()-preparationStarted;
        gpuTrace?.stop();
        if(DEBUG)visibleProfile=global.AtlasThreeRuntimeDiagnostics?.start(renderer,postResources);
        preparationStage(PREPARATION_STAGES.length,'ready');debugMark('3D gereed','complete');if(options.canMove?.())canvas.focus({preventScroll:true});raf=requestAnimationFrame(draw);
      }catch(caught){if(token===generation){
        clearWaiting();loading=false;const detail=`${caught?.name||'Error'}: ${caught?.message||caught}`;
        diagnostic=diagnostic.includes('mislukt:')?diagnostic:`${diagnostic||operation} — mislukt: ${detail}`;
        const failure={diagnostic,preparation,preparationCompleted,warmupViews,warmupTotal};
        dispose(false);
        ({diagnostic,preparation,preparationCompleted,warmupViews,warmupTotal}=failure);
        try{report('error',caught);}catch(reportError){
          // Even a broken status callback must not strand the initial static loader.
          console.error('3D statusweergave:',reportError);
          const loader=document.querySelector('[data-three-loading]');
          if(loader){loader.hidden=false;loader.dataset.status='error';
            const title=loader.querySelector('[data-three-loading-title]'),message=loader.querySelector('[data-three-diagnostic]'),recovery=loader.querySelector('[data-three-recover]');
            if(title)title.textContent='3D kon niet worden gestart';if(message){message.textContent=diagnostic;message.hidden=false;}if(recovery)recovery.hidden=false;
          }
        }
      }}
    }
    return {sync,stop,dispose,snapshot,lookAt:(nextYaw,nextPitch=0)=>{yaw=nextYaw;pitch=clamp(nextPitch,-1.3,1.3);}};
  }
  global.AtlasThreeRenderer=Object.freeze({createRuntime,SUPPORTED_LEVEL,PREPARATION_STAGES});
})(window);




