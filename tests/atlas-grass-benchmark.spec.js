const {test,expect}=require('@playwright/test');
const fs=require('fs');
for(const candidate of ['grass1','grass2','grass2-light'])test(`grass source GPU comparison: ${candidate}`,async({page},info)=>{
 test.skip(process.env.ATLAS_GRASS_QA!=='1'||process.env.ATLAS_WEBGPU_QA!=='1'||info.project.name!=='desktop-chromium','Opt-in real WebGPU grass comparison');test.setTimeout(180000);
 await page.setViewportSize({width:1180,height:734});
 await page.goto('http://127.0.0.1:4173/');
 const fixture=JSON.parse(fs.readFileSync(`output/grass-v166/${candidate}.json`));
 const result=await page.evaluate(async({fixture,candidate})=>{
  const THREE=await import('/assets/vendor/three/three.webgpu.min.js');
  document.body.innerHTML='<canvas id="grass-review"></canvas>';document.body.style.margin='0';
  const canvas=document.getElementById('grass-review');const renderer=new THREE.WebGPURenderer({canvas,antialias:false});renderer.setPixelRatio(.75);renderer.setSize(1180,734);await renderer.init();
  if(!renderer.backend.isWebGPUBackend)throw Error('Native WebGPU required');
  const device=renderer.backend.device,errors=[];let disposing=false;device.addEventListener('uncapturederror',e=>errors.push(e.error.message));device.lost.then(e=>{if(!disposing)errors.push('device lost '+e.reason);});
  const scene=new THREE.Scene();scene.background=new THREE.Color('#b7cce6');
  const camera=new THREE.PerspectiveCamera(55,1180/734,.1,150);camera.position.set(15,13,23);camera.lookAt(0,0,0);
  scene.add(new THREE.HemisphereLight('#b7cce6','#283c22',2.2));const sun=new THREE.DirectionalLight('#ffcf8f',6);sun.position.set(-12,25,15);scene.add(sun);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(90,90),new THREE.MeshStandardMaterial({color:'#6c6034',roughness:1}));ground.rotation.x=-Math.PI/2;scene.add(ground);
  const geometry=new THREE.BufferGeometry();for(const key of ['position','normal','color'])geometry.setAttribute(key,new THREE.Float32BufferAttribute(fixture[key],3));geometry.rotateX(-Math.PI/2);
  const material=new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,metalness:0,side:THREE.DoubleSide});
  const mesh=new THREE.InstancedMesh(geometry,material,3000),matrix=new THREE.Matrix4(),rotation=new THREE.Quaternion(),scale=new THREE.Vector3(.9,.9,.9);mesh.castShadow=false;mesh.receiveShadow=true;
  let seed=166;const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
  for(let i=0;i<3000;i++){rotation.setFromAxisAngle(new THREE.Vector3(0,1,0),random()*Math.PI*2);matrix.compose(new THREE.Vector3((random()-.5)*50,0,(random()-.5)*50),rotation,scale);mesh.setMatrixAt(i,matrix);}mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();scene.add(mesh);
  const results=[];
  for(const count of [500,3000]){
   mesh.count=count;await renderer.compileAsync(scene,camera);
   for(let i=0;i<3;i++){renderer.render(scene,camera);await device.queue.onSubmittedWorkDone();}
   const samples=[];let previous=performance.now();
   for(let frame=0;frame<100;frame++){
    await new Promise(requestAnimationFrame);const start=performance.now(),interval=start-previous;previous=start;
    renderer.render(scene,camera);const submitted=performance.now();await device.queue.onSubmittedWorkDone();
    samples.push({interval,cpu:submitted-start,fence:performance.now()-submitted,draws:renderer.info.render.drawCalls,triangles:renderer.info.render.triangles});
   }
   const mean=k=>samples.slice(5).reduce((s,p)=>s+p[k],0)/95;results.push({count,fps:1000/mean('interval'),cpuMs:mean('cpu'),queueFenceMs:mean('fence'),draws:mean('draws'),triangles:mean('triangles')});
  }
  camera.position.set(2,1.2,2);camera.lookAt(0,0,0);renderer.render(scene,camera);await device.queue.onSubmittedWorkDone();
  window.grassBenchmarkDispose=()=>{disposing=true;geometry.dispose();material.dispose();ground.geometry.dispose();ground.material.dispose();renderer.dispose();device.destroy();};
  return {candidate,results,errors,notes:'One metre normalized source patches; shared vertex-color material, no textures, no grass shadows. Queue fence wall time is not hardware GPU timing.'};
 },{fixture,candidate});
 await page.screenshot({path:info.outputPath(candidate+'.png')});
 fs.writeFileSync(info.outputPath('metrics.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));expect(result.errors).toEqual([]);
 // One grass draw + floor + the renderer's background triangle.
 expect(result.results.every(r=>r.draws===3&&r.fps>0)).toBe(true);
 await page.evaluate(()=>window.grassBenchmarkDispose());
});
