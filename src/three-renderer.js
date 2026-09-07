(function (global) {
  'use strict';
  const SUPPORTED_LEVEL='LVL-0001',ROOT='Levels/LVL-0001/3d/';
  const PREPARATION_STAGES=Object.freeze(['3D-engine starten…','Wereld en modellen laden…','Texturen en materialen voorbereiden…','WebGPU, licht en schaduwen opwarmen…','Eerste speelbare beeld afronden…']);
  let modules;
  const loadModules=()=>modules ||= Promise.all([import('../assets/vendor/three/three.webgpu.min.js'),import('../assets/vendor/three/loaders/GLTFLoader.js'),import('../assets/vendor/three/loaders/HDRLoader.js'),import('../assets/vendor/three/loaders/DRACOLoader.js')]);
  function createRuntime(options) {
    let THREE,renderer,scene,camera,canvas,route,sun,abort,post,worldPass;
    const postResources=[];
    let generation=0,loading=false,raf=0,last=0,frames=0,fps=0,averageMs=0;
    let status='idle',error=null,yaw=-.08,pitch=.015,dragging=false,positionIndex=0,currentTarget=null,npc=null,npcPath=null,npcFrame=null;
    const keys=new Set(),textures=new Set(),flames=[];
    let preparation='',warmupViews=0,warmupTotal=0,lookPointer=null,movePointer=null,touchWalk=0,touchTurn=0;
    let preparationMs=null,lastReport=0;
    let preparationCompleted=0;
    let inputType=global.matchMedia('(any-pointer: coarse)').matches?'touch':'desktop';
    const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
    function snapshot() {
      return {status,error,ready:status==='ready',preparation,preparationCompleted,preparationTotal:PREPARATION_STAGES.length,preparationMs,inputType,warmupViews,warmupTotal,fps,averageMs,backend:renderer?.backend?.isWebGPUBackend?'WebGPU':'uninitialized',firstPerson:true,levelId:SUPPORTED_LEVEL,source:ROOT+'lvl0001.glb',camera:camera?.position.toArray(),yaw,pitch,positionIndex,target:currentTarget,drawCalls:renderer?.info.render.drawCalls||0,triangles:renderer?.info.render.triangles||0,resolution:canvas?[canvas.width,canvas.height]:[0,0],frames};
    }
    function report(next=status,caught) {status=next;if(caught!==undefined)error=caught?String(caught.message||caught):null;else if(next!=='error')error=null;document.querySelector('.gameShell')?.classList.toggle('threeReady',status==='ready');options.onStatus?.(snapshot());}
    function setInputType(next) {if(inputType!==next){inputType=next;report();}}
    // Each boundary is reached only after the preceding work has completed.
    function preparationStage(completed,nextStatus) {preparationCompleted=completed;preparation=PREPARATION_STAGES[completed]||'';report(nextStatus);}
    function resetInput() {
      keys.clear();dragging=false;lookPointer=movePointer=null;touchWalk=touchTurn=0;
      document.querySelector('[data-three-stick]')?.style.removeProperty('transform');
    }
    function canPlay() {return status==='ready'&&options.getRenderer()==='3d'&&options.canMove?.();}
    function stop() {cancelAnimationFrame(raf);raf=0;last=0;resetInput();}
    function dispose() {
      generation++;loading=false;stop();abort?.abort();abort=null;
      if(document.pointerLockElement===canvas)document.exitPointerLock();
      const geometries=new Set(),materials=new Set();
      scene?.traverse(obj=>{if(obj.geometry)geometries.add(obj.geometry);for(const m of Array.isArray(obj.material)?obj.material:obj.material?[obj.material]:[])materials.add(m);});
      materials.forEach(mat=>{for(const value of Object.values(mat))if(value?.isTexture)textures.add(value);mat.dispose();});
      geometries.forEach(g=>g.dispose());textures.forEach(t=>t.dispose());textures.clear();
      postResources.splice(0).forEach(resource=>resource.dispose?.());post?.dispose();post=null;
      renderer?.dispose();renderer=scene=camera=canvas=route=sun=npc=worldPass=null;flames.length=0;npcPath=null;npcFrame=null;frames=fps=averageMs=warmupViews=warmupTotal=preparationCompleted=0;preparation='';report('idle');
    }
    function routePosition(atlasX) {
      const points=route.route;let i=0;while(i<points.length-2&&atlasX>points[i+1].atlas[0])i++;
      const a=points[i],b=points[i+1],t=clamp((atlasX-a.atlas[0])/(b.atlas[0]-a.atlas[0]),0,1);
      return {i,t,position:new THREE.Vector3().fromArray(a.position).lerp(new THREE.Vector3().fromArray(b.position),t),atlasY:a.atlas[1]+(b.atlas[1]-a.atlas[1])*t};
    }
    function move(dt) {
      if(!canPlay()){resetInput();if(document.pointerLockElement===canvas)document.exitPointerLock();return;}
      const forward=clamp(Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'))+touchWalk,-1,1);
      yaw-=touchTurn*dt*1.3;
      if(keys.has('KeyA')||keys.has('ArrowLeft'))yaw+=dt*1.3;
      if(keys.has('KeyD')||keys.has('ArrowRight'))yaw-=dt*1.3;
      if(!forward)return;
      const x=options.getPlayer().x,{i}=routePosition(x),a=route.route[i],b=route.route[i+1];
      const length=new THREE.Vector3().fromArray(a.position).distanceTo(new THREE.Vector3().fromArray(b.position));
      const next=clamp(x+forward*dt*2.7*(b.atlas[0]-a.atlas[0])/length,route.route[0].atlas[0],route.route.at(-1).atlas[0]);
      options.setPlayer?.({x:next,y:routePosition(next).atlasY});
    }
    function interact() {if(!currentTarget||!canPlay())return;resetInput();if(document.pointerLockElement===canvas)document.exitPointerLock();options.interact?.(currentTarget);}
    function attachControls() {
      abort=new AbortController();const opts={signal:abort.signal};
      canvas.addEventListener('pointerdown',e=>{
        if(e.button!==0||status!=='ready')return;e.stopPropagation();options.activate?.();
        if(!canPlay()||lookPointer)return;
        setInputType(e.pointerType==='touch'||e.pointerType==='pen'?'touch':'desktop');
        dragging=true;lookPointer={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.focus({preventScroll:true});canvas.setPointerCapture?.(e.pointerId);
      },opts);
      canvas.addEventListener('click',e=>e.stopPropagation(),opts);
      canvas.addEventListener('dblclick',e=>{e.stopPropagation();if(canPlay()&&e.pointerType!=='touch')canvas.requestPointerLock?.()?.catch?.(()=>{});},opts);
      // Delegate controls because Atlas replaces the HUD when dialogs close.
      document.addEventListener('pointerdown',e=>{
        const pad=e.target.closest?.('[data-three-move]');if(!pad||!canPlay()||movePointer)return;
        setInputType('touch');
        e.preventDefault();e.stopPropagation();const rect=pad.getBoundingClientRect();
        movePointer={id:e.pointerId,x:rect.x+rect.width/2,y:rect.y+rect.height/2};pad.setPointerCapture?.(e.pointerId);
      },{...opts,capture:true});
      // Restrict Safari gesture suppression to the gameplay surface. Menus,
      // challenge forms and the rest of Atlas retain normal browser behavior.
      const gameplayGesture=e=>{
        if(!canPlay())return;
        if(e.target===canvas||e.target.closest?.('[data-three-move]'))e.preventDefault();
      };
      for(const name of ['touchmove','gesturestart','gesturechange'])document.addEventListener(name,gameplayGesture,{...opts,passive:false});
      document.addEventListener('click',e=>{
        if(!e.target.closest?.('[data-three-interact],[data-three-move]'))return;
        e.preventDefault();e.stopPropagation();if(e.target.closest('[data-three-interact]'))interact();
      },{...opts,capture:true});
      global.addEventListener('pointermove',e=>{
        if(!canPlay()){resetInput();return;}
        if(movePointer?.id===e.pointerId){
          const x=clamp((e.clientX-movePointer.x)/40,-1,1),y=clamp((e.clientY-movePointer.y)/40,-1,1);
          const axis=v=>Math.abs(v)<.15?0:Math.sign(v)*(Math.abs(v)-.15)/.85;
          touchWalk=-axis(y);touchTurn=axis(x);
          const stick=document.querySelector('[data-three-stick]');if(stick)stick.style.transform=`translate(${x*32}px,${y*32}px)`;
          return;
        }
        const locked=document.pointerLockElement===canvas;if(!locked&&lookPointer?.id!==e.pointerId)return;
        const dx=locked?e.movementX:e.clientX-lookPointer.x,dy=locked?e.movementY:e.clientY-lookPointer.y;
        yaw-=dx*.0022;pitch=clamp(pitch-dy*.0022,-1.30,1.30);
        if(lookPointer){lookPointer.x=e.clientX;lookPointer.y=e.clientY;}
      },opts);
      const release=e=>{
        if(lookPointer?.id===e.pointerId){lookPointer=null;dragging=false;}
        if(movePointer?.id===e.pointerId){movePointer=null;touchWalk=touchTurn=0;document.querySelector('[data-three-stick]')?.style.removeProperty('transform');}
      };
      for(const name of ['pointerup','pointercancel','lostpointercapture'])global.addEventListener(name,release,opts);
      global.addEventListener('blur',resetInput,opts);
      document.addEventListener('visibilitychange',resetInput,opts);
      document.addEventListener('pointerlockchange',resetInput,opts);
      const keyCode=e=>e.code||({w:'KeyW',s:'KeyS',a:'KeyA',d:'KeyD',e:'KeyE'}[e.key?.toLowerCase()]||e.key);
      global.addEventListener('keydown',e=>{
        if(!canPlay()||e.ctrlKey||e.metaKey||e.altKey||e.target.closest?.('input,textarea,select,[contenteditable="true"],[role="dialog"]'))return;
        const code=keyCode(e);
        if(['KeyW','KeyS','KeyA','KeyD','KeyE','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(code))setInputType('desktop');
        if(['KeyW','KeyS','KeyA','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(code)){e.preventDefault();keys.add(code);}
        if(code==='KeyE'&&!e.repeat){e.preventDefault();interact();}
      },opts);
      global.addEventListener('keyup',e=>keys.delete(keyCode(e)),opts);canvas.tabIndex=0;
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
    async function buildAtmosphere() {
      const [tsl,{bayer16},{gaussianBlur},{bloom},{ao}]=await Promise.all([import('../assets/vendor/three/three.tsl.min.js'),import('../assets/vendor/three/tsl/math/Bayer.js'),import('../assets/vendor/three/tsl/display/GaussianBlurNode.js'),import('../assets/vendor/three/tsl/display/BloomNode.js'),import('../assets/vendor/three/tsl/display/GTAONode.js')]);
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
      if(path!==npcPath){const context=npcFrame.getContext('2d');context.clearRect(0,0,npcFrame.width,npcFrame.height);context.drawImage(source,0,0,npcFrame.width,npcFrame.height);npc.material.map.needsUpdate=true;npcPath=path;}
      npc.rotation.y=Math.atan2(camera.position.x-npc.position.x,camera.position.z-npc.position.z);
    }
    function resize() {
      const bounds=canvas.getBoundingClientRect(),ratio=Math.min(global.devicePixelRatio||1,1.5,1920/Math.max(1,bounds.width));
      const width=Math.max(2,Math.round(bounds.width*ratio)),height=Math.max(2,Math.round(bounds.height*ratio));
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
      resize();positionCamera(options.getPlayer().x);
      // Decode a stable NPC frame rather than waiting on its changing animation image.
      const source=document.querySelector('[data-npc-challenge="wind"] [data-npc-sprite]');
      if(source){const frame=new Image();frame.src=source.currentSrc||source.src;await frame.decode();if(!valid())return false;updateNpc(frame);}
      // Compile the actual HDR scene-pass target, including objects behind the
      // initial camera. This also uploads their geometry and material textures.
      const culling=new Map();scene.traverse(o=>{if(o.isMesh){culling.set(o,o.frustumCulled);o.frustumCulled=false;}});
      try{await worldPass.compileAsync(activeRenderer);}finally{culling.forEach((value,o)=>o.frustumCulled=value);}
      if(!valid())return false;
      // Rendering the complete post chain initializes AO, volume, bloom, shadow
      // maps and their pipelines. Cover route sections and every viewing direction.
      const points=route.route,anchors=[options.getPlayer().x,points[Math.floor(points.length/2)].atlas[0],points.at(-1).atlas[0]];
      const views=[[0,0],[Math.PI/2,0],[Math.PI,0],[-Math.PI/2,0],[0,1.25],[0,-1.25]];
      warmupTotal=anchors.length*views.length+1;warmupViews=0;
      preparationStage(3,'warming');
      for(const x of anchors)for(const [heading,tilt]of views){
        if(!valid())return false;resize();positionCamera(x,heading,tilt);updateNpc();
        await activePost.renderAsync();await activeRenderer.waitForGPU();
        if(!valid())return false;warmupViews++;report('warming');
        // Yield to the loading UI and mode-switch controls, not a timed delay.
        await new Promise(resolve=>requestAnimationFrame(resolve));
      }
      preparationStage(4,'warming');
      let size;
      do {
        if(!valid())return false;size=resize();positionCamera(options.getPlayer().x);updateNpc();updateTarget();
        await activePost.renderAsync();await activeRenderer.waitForGPU();
        if(!valid())return false;
      }while(size!==resize());
      warmupViews=warmupTotal;frames=1;last=0;preparation='';return true;
    }
    function draw(time) {
      raf=0;if(!canvas?.isConnected||document.hidden||options.getRenderer()!=='3d')return;
      const start=performance.now(),elapsed=last?(time-last)/1000:1/60,dt=Math.min(.05,elapsed);last=time;
      try {
        resize();move(dt);positionCamera(options.getPlayer().x);
        updateTarget();updateNpc();
        flames.forEach((f,i)=>{f.scale.y=.94+Math.sin(time*.006+i*1.8)*.09;});
        renderer.info.reset();if(post)post.render();else renderer.render(scene,camera);frames++;fps=fps*.95+.05/Math.max(.001,elapsed);averageMs=averageMs*.95+(performance.now()-start)*.05;if(status!=='ready'||time-lastReport>=250){lastReport=time;report('ready');}raf=requestAnimationFrame(draw);
      }catch(caught){stop();report('error',caught);}
    }
    async function sync() {
      const next=document.querySelector('[data-three-canvas]');
      if(options.getRenderer()!=='3d'||options.getLevel()?.id!==SUPPORTED_LEVEL||!next){if(renderer||loading)dispose();return;}
      if(renderer&&canvas===next){report();if(!loading&&!raf&&status==='ready'&&!document.hidden)raf=requestAnimationFrame(draw);return;}
      if(loading)return;dispose();loading=true;const token=generation,preparationStarted=performance.now();canvas=next;preparationStage(0,'loading');
      try {
        const [[lib,{GLTFLoader},{HDRLoader},{DRACOLoader}],data]=await Promise.all([loadModules(),fetch(ROOT+'route.json').then(r=>{if(!r.ok)throw Error('Route asset could not be loaded');return r.json();})]);
        if(token!==generation)return;THREE=lib;route=data;renderer=new THREE.WebGPURenderer({canvas,antialias:true,powerPreference:'high-performance'});await renderer.init();
        if(token!==generation)return;if(!renderer.backend.isWebGPUBackend)throw Error('WebGPU is required for first-person 3D.');
        renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;renderer.shadowMap.enabled=true;scene=new THREE.Scene();scene.fog=new THREE.FogExp2('#dbc294',.009);camera=new THREE.PerspectiveCamera(64,1,.06,220);
        const draco=new DRACOLoader().setDecoderPath('assets/vendor/three/draco/').setDecoderConfig({type:'wasm'}).setWorkerLimit(2);
        preparationStage(1,'loading');
        let gltf;try{gltf=await new GLTFLoader().setDRACOLoader(draco).loadAsync(ROOT+'lvl0001.glb');}finally{draco.dispose();}
        if(token!==generation){gltf.scene.traverse(o=>o.geometry?.dispose());return;}partitionWorld(gltf.scene);scene.add(gltf.scene);
        const prepared=new Set();gltf.scene.traverse(obj=>{if(!obj.isMesh)return;obj.castShadow=true;obj.receiveShadow=true;for(const mat of Array.isArray(obj.material)?obj.material:[obj.material]){if(prepared.has(mat))continue;prepared.add(mat);mat.side=THREE.DoubleSide;if(mat.transparent){mat.transparent=false;mat.alphaTest=.35;mat.depthWrite=true;}if(/rock|stone|carved|relief/i.test(mat.name))mat.roughness*=.46;if(mat.name==='flower_heliophila')mat.color.setRGB(.84,.43,.9);if(mat.name.startsWith('Living fir twig')){mat.alphaTest=.12;mat.alphaToCoverage=true;}for(const value of Object.values(mat))if(value?.isTexture)value.anisotropy=8;}});
        const sky=await new HDRLoader().loadAsync(ROOT+'qwantani_sunset_puresky_2k.hdr');if(token!==generation){sky.dispose();return;}textures.add(sky);
        const environment=sky.clone();environment.mapping=THREE.EquirectangularReflectionMapping;environment.needsUpdate=true;textures.add(environment);scene.environment=environment;scene.environmentIntensity=.16;scene.environmentRotation.set(.2,1.55,0);
        const dome=new THREE.Mesh(new THREE.SphereGeometry(180,48,24),new THREE.MeshBasicMaterial({map:sky,color:new THREE.Color(.14,.16,.19),side:THREE.BackSide,depthWrite:false,fog:false}));dome.rotation.set(.20,1.55,0);dome.renderOrder=-100;scene.add(dome);
        preparationStage(2,'warming');buildLights();await buildAtmosphere();if(token!==generation)return;
        if(!next.isConnected){dispose();sync();return;}
        if(!await warmup(token)||token!==generation)return;
        attachControls();loading=false;preparationMs=performance.now()-preparationStarted;preparationStage(PREPARATION_STAGES.length,'ready');if(options.canMove?.())canvas.focus({preventScroll:true});raf=requestAnimationFrame(draw);
      }catch(caught){if(token===generation){loading=false;report('error',caught);}}
    }
    return {sync,stop,dispose,snapshot,lookAt:(nextYaw,nextPitch=0)=>{yaw=nextYaw;pitch=clamp(nextPitch,-1.3,1.3);}};
  }
  global.AtlasThreeRenderer=Object.freeze({createRuntime,SUPPORTED_LEVEL,PREPARATION_STAGES});
})(window);




