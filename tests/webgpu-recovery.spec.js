const {test,expect}=require('@playwright/test');
const path=require('path');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
const brokerPath=process.env.ATLAS_BROKER_SOURCE||path.join(__dirname,'../src/webgpu-capabilities.js');
async function broker(page){await page.goto(base);await page.evaluate(()=>{delete window.__ATLAS_WEBGPU_SESSION__;});await page.addScriptTag({path:brokerPath});}

test('transient adapter failure recovers in the same shared acquisition',async({page})=>{
 await broker(page);
 const result=await page.evaluate(async()=>{
  let requests=0;const device={lost:new Promise(()=>{}),destroy(){}};
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>++requests<=2?null:{requestDevice:async()=>device}}});
  const b=AtlasWebGPUCapabilities;
  const outcomes=await Promise.allSettled([b.requestDevice('particles'),b.requestDevice('cinematic')]);
  return {requests,success:outcomes.every(x=>x.status==='fulfilled'),same:outcomes[0].value===outcomes[1].value};
 });
 expect(result).toEqual({requests:3,success:true,same:true});
});

for(const failure of ['adapter','device','unsupported'])test(`bounded ${failure} failure and final classification`,async({page})=>{
 await broker(page);await page.clock.install();
 await page.evaluate(failure=>{
  window.requests=0;window.devices=0;
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>{
   requests++;if(failure==='adapter')return null;
   return {features:new Set(),requestDevice:async()=>{devices++;throw Error('temporary device refusal');}};
  }}});
  window.result=AtlasWebGPUCapabilities.requestDevice('test',failure==='unsupported'?{requiredFeatures:['missing']}:{})
   .then(()=>({unexpected:true}),e=>({category:e.atlasWebGPUCategory}));
 },failure);
 await page.clock.runFor(3000);
 const result=await page.evaluate(async()=>({result:await window.result,requests,devices,snapshot:AtlasWebGPUCapabilities.snapshot()}));
 expect(result.requests).toBe(failure==='adapter'?8:failure==='device'?4:1);
 expect(result.devices).toBe(failure==='device'?4:0);
 expect(result.result.category).toBe(failure==='adapter'?'adapter-unavailable':failure==='device'?'device-initialization-failed':'renderer-capability-unavailable');
 expect(result.snapshot.status).toBe('failed');
 await page.evaluate(()=>AtlasWebGPUCapabilities.requestDevice('again').catch(()=>{}));
 expect(await page.evaluate(()=>requests)).toBe(result.requests);
});

test('hidden retry cancels and late devices cannot replace resumed devices',async({page})=>{
 await broker(page);
 const result=await page.evaluate(async()=>{
  const b=AtlasWebGPUCapabilities;let finish,requested=false,destroyed=0;
  const old={lost:new Promise(()=>{}),destroy(){destroyed++;}},fresh={lost:new Promise(()=>{}),destroy(){}};
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>({requestDevice:()=>{requested=true;return new Promise(r=>finish=r);}})}});
  const pending=b.requestDevice('old').catch(e=>e.atlasWebGPUCategory);
  while(!requested)await new Promise(r=>setTimeout(r,0));
  dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));
  const cancelled=await pending;
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>({requestDevice:async()=>fresh})}});
  dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));
  await b.requestDevice('new');finish(old);await new Promise(r=>setTimeout(r,0));
  return {cancelled,destroyed,fresh:__ATLAS_WEBGPU_SESSION__.device===fresh};
 });
 expect(result).toEqual({cancelled:'acquisition-cancelled',destroyed:1,fresh:true});
});

test('device loss invalidates broker and healthy suspension retains device',async({page})=>{
 await broker(page);
 const result=await page.evaluate(async()=>{
  const b=AtlasWebGPUCapabilities;let lose,requests=0,checks=0;
  const old={lost:new Promise(r=>lose=r),queue:{onSubmittedWorkDone:async()=>{checks++;}},destroy(){}};
  const fresh={lost:new Promise(()=>{}),destroy(){}};
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>({requestDevice:async()=>++requests===1?old:fresh})}});
  await b.requestDevice('test');b.suspend();b.resume();const retained=await b.requestDevice('test')===old;
  lose({reason:'unknown'});await new Promise(r=>setTimeout(r,0));
  const invalidated=!b.snapshot().deviceReady;await b.requestDevice('test');
  return {requests,checks,retained,invalidated,fresh:__ATLAS_WEBGPU_SESSION__.device===fresh};
 });
 expect(result).toEqual({requests:2,checks:1,retained:true,invalidated:true,fresh:true});
});

async function open(page,id='LVL-0034'){
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor');
 await page.evaluate(id=>window.eval('selectLevel')(id,{startImmediately:true,recordStart:false}),id);
}
const snap=page=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot());
const ready=page=>expect.poll(async()=>(await snap(page)).status,{timeout:30000}).toBe('ready');

for(const mode of ['illustrated','cinematic'])test(`real GPU ${mode} lost session recovers resources after background`,async({page},info)=>{
 test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Real WebGPU required');
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await open(page);await page.evaluate(mode=>{window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();},mode);await ready(page);
 const before=await snap(page);expect(before.depthStatus).toBe('ready');
 await page.evaluate(()=>{
  window.oldGPU=__ATLAS_WEBGPU_SESSION__.device;
  dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));oldGPU.destroy();
 });
 await expect.poll(async()=>(await snap(page)).buffers).toBe(0);
 expect(await page.evaluate(()=>AtlasWebGPUCapabilities.snapshot().deviceReady)).toBe(false);
 await page.evaluate(()=>{
  const original=navigator.gpu.requestAdapter.bind(navigator.gpu);window.resumeRequests=0;
  navigator.gpu.requestAdapter=async(...args)=>++resumeRequests<=2?null:original(...args);
  dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));
 });
 await expect(page.locator('[data-preparation-status]')).toHaveText('Grafische engine herstellen...');
 await ready(page);
 const after=await snap(page);expect(after.error).toBeNull();expect(after.depthStatus).toBe('ready');expect(after.particles).toBe(before.particles);
 expect(await page.evaluate(()=>__ATLAS_WEBGPU_SESSION__.device!==oldGPU)).toBe(true);
 await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
 expect(errors).toEqual([]);
 await page.evaluate(()=>window.eval('returnToMenu')());
 expect((await snap(page)).buffers).toBe(0);expect((await snap(page)).depthCached).toBe(0);
});

test('preparation statuses are truthful, cancellable and fit each layout',async({page},info)=>{
 let release;const blocked=new Promise(r=>release=r);
 await page.route('**/Levels/LVL-0034/level.js',async r=>{await blocked;await r.continue();});
 await page.goto(base+'/?dev=editor');
 await page.evaluate(()=>{window.pendingLevel=window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});});
 await expect(page.getByRole('heading',{name:'Avontuur voorbereiden...'})).toBeVisible();
 await expect(page.locator('[data-preparation-status]')).toHaveText('Level laden...');
 const dimensions=await page.locator('.atlasLoadingCard').evaluate(e=>{const b=e.getBoundingClientRect();return {left:b.left,right:b.right,width:innerWidth};});
 expect(dimensions.left).toBeGreaterThanOrEqual(0);expect(dimensions.right).toBeLessThanOrEqual(dimensions.width);
 await page.screenshot({path:info.outputPath('preparation-status.png')});
 await page.getByRole('button',{name:'Menu',exact:true}).click();release();await page.evaluate(()=>window.pendingLevel);
 await expect(page.locator('[data-preparation-status]')).toHaveCount(0);
 expect(await page.evaluate(()=>window.eval('state').screen)).toBe('menu');
});

test('hiding during retry delay stops further requests until a foreground acquisition',async({page})=>{
 await broker(page);await page.clock.install();
 await page.evaluate(()=>{
  window.requests=0;Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>{requests++;return null;}}});
  window.result=AtlasWebGPUCapabilities.requestDevice('test').catch(e=>e.atlasWebGPUCategory);
 });
 await expect.poll(()=>page.evaluate(()=>requests)).toBe(2);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
 expect(await page.evaluate(()=>window.result)).toBe('acquisition-cancelled');
 await page.clock.runFor(10000);expect(await page.evaluate(()=>requests)).toBe(2);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'));});
 expect(await page.evaluate(()=>AtlasWebGPUCapabilities.snapshot().suspended)).toBe(false);
});

test('transient device refusal retries with a fresh adapter',async({page})=>{
 await broker(page);
 const result=await page.evaluate(async()=>{
  let adapters=0,devices=0;const device={lost:new Promise(()=>{}),destroy(){}};
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>{adapters++;return {requestDevice:async()=>{if(++devices===1)throw Error('resume refusal');return device;}};}}});
  const got=await AtlasWebGPUCapabilities.requestDevice('test');return {adapters,devices,ready:got===device};
 });expect(result).toEqual({adapters:2,devices:2,ready:true});
});

test('Illustrated without active fields performs no GPU acquisition or GPU status',async({page})=>{
 await page.addInitScript(()=>{window.requests=0;Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>{requests++;return null;}}});});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base);
 await page.evaluate(async()=>{
  const resolver=window.eval('worldResolver');resolver.updateLevelSettings('LVL-0034',{cinematicLighting:{particles:{enabled:false}}});
  window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});
  await window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});
 });
 expect(await page.evaluate(()=>requests)).toBe(0);
 await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
 expect((await snap(page)).status).toBe('inactive');
});

test('final particle fallback appears only after bounded retries and keeps scene playable',async({page})=>{
 await page.addInitScript(()=>{window.requests=0;Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>{requests++;return null;}}});});
 await open(page);
 await expect(page.locator('[data-gpu-preparation]')).toBeVisible();
 await expect(page.locator('[data-cinematic-error]')).toBeHidden();
 await expect.poll(async()=>(await snap(page)).status).toBe('adapter-unavailable');
 expect(await page.evaluate(()=>requests)).toBe(8);
 await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
 await expect(page.locator('[data-cinematic-error]')).toContainText('Particle Fields unavailable');
 await expect(page.locator('.worldArt')).toBeVisible();
 await page.getByRole('button',{name:'Terug naar menu'}).click();
 expect(await page.evaluate(()=>window.eval('state').screen)).toBe('menu');
});

test('asset decode drives Sprites status and clears on success',async({page})=>{
 let release;const blocked=new Promise(r=>release=r);
 await page.route('**/Levels/LVL-0034/riventides.png',async r=>{await blocked;await r.continue();});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor');
 await page.evaluate(()=>{window.pendingLevel=window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});});
 await expect(page.locator('[data-preparation-status]')).toHaveText('Sprites laden...');
 release();await page.evaluate(()=>window.pendingLevel);
 await expect(page.locator('.gameShell')).toBeVisible();
 await expect(page.locator('[data-preparation-status]')).toHaveCount(0,{timeout:15000});
});

test('dynamic Flyby canvas is reused but GPU texture is replaced after loss',async({page},info)=>{
 test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Real WebGPU required');
 await page.addInitScript(()=>{
  window.flybyUploads=[];const copy=GPUQueue.prototype.copyExternalImageToTexture;
  GPUQueue.prototype.copyExternalImageToTexture=function(src,dst,size){if(src.source?.hasAttribute?.('data-flyby-canvas'))flybyUploads.push({canvas:src.source,texture:dst.texture});return copy.call(this,src,dst,size);};
 });
 // Use the real sequence and preload path, with in-memory authored test content.
 const fs=require('fs'),frames=fs.readdirSync('assets/ambient/flybys/bastion_walk').filter(f=>f.endsWith('.png')).sort().map(f=>'assets/ambient/flybys/bastion_walk/'+f);
 await page.route('**/Levels/LVL-0034/level.js',async r=>{const response=await r.fetch();await r.fulfill({response,body:(await response.text())+`\nwindow.SVEN_LEVEL_DEFINITIONS['LVL-0034'].ambientFlybys=[{id:'recovery-bastion',frames:${JSON.stringify(frames)},path:[{x:350,y:250},{x:700,y:250}],speed:1,scale:.8,startDelayMs:60000,intervalMinMs:60000,intervalMaxMs:60000,soundTriggers:[],softness:0}];`});});
 await open(page);await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'cinematic'});window.eval('render')();});await ready(page);
 await page.evaluate(()=>{
  const r=window.eval('ambientFlybyRuntime');r.stopAll();r.preview('recovery-bastion');
  window.preparedFrames=r.readiness.get('LVL-0034:recovery-bastion').images;
 });
 await expect.poll(()=>page.evaluate(()=>flybyUploads.length)).toBeGreaterThan(0);
 await page.evaluate(()=>{window.firstUpload=flybyUploads.at(-1);__ATLAS_WEBGPU_SESSION__.device.destroy();});
 await ready(page);
 await expect.poll(()=>page.evaluate(()=>flybyUploads.some(u=>u.texture!==firstUpload.texture))).toBe(true);
 expect(await page.evaluate(()=>{
  const current=flybyUploads.at(-1),images=window.eval('ambientFlybyRuntime').readiness.get('LVL-0034:recovery-bastion').images;
  return current.canvas===firstUpload.canvas && current.texture!==firstUpload.texture && images===preparedFrames;
 })).toBe(true);
});

test('a newer level owns the status and rejects a late old level result',async({page})=>{
 let release;const blocked=new Promise(r=>release=r);
 await page.route('**/Levels/LVL-0034/level.js',async r=>{await blocked;await r.continue();});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor');
 await page.evaluate(()=>{window.oldLoad=window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});window.oldSequence=window.eval('levelLoadSequence');});
 await expect(page.locator('[data-preparation-status]')).toHaveText('Level laden...');
 await page.evaluate(()=>window.eval('selectLevel')('LVL-0033',{startImmediately:true,recordStart:false}));
 release();expect(await page.evaluate(()=>window.oldLoad)).toBe(false);
 await page.evaluate(()=>window.eval('assetReadiness').setStatus(oldSequence,'stale status'));
 expect(await page.evaluate(()=>window.eval('level').id)).toBe('LVL-0033');
 expect(await page.evaluate(()=>window.eval('assetReadiness').status())).not.toBe('stale status');
});

test('missing API fails once without transient retries',async({page})=>{
 await broker(page);
 const result=await page.evaluate(async()=>{
  Object.defineProperty(navigator,'gpu',{configurable:true,value:undefined});
  const error=await AtlasWebGPUCapabilities.requestDevice('test').catch(e=>e.atlasWebGPUCategory);
  return {error,state:AtlasWebGPUCapabilities.snapshot()};
 });expect(result.error).toBe('api-unavailable');expect(result.state.status).toBe('failed');expect(result.state.attempts).toEqual([]);
});

test('a retained device with a stalled queue is replaced on revalidation',async({page})=>{
 await broker(page);await page.clock.install();
 await page.evaluate(()=>{
  window.destroyed=0;window.requests=0;
  const old={lost:new Promise(()=>{}),queue:{onSubmittedWorkDone:()=>new Promise(()=>{})},destroy(){destroyed++;}};
  window.freshDevice={lost:new Promise(()=>{}),destroy(){}};
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>({requestDevice:async()=>++requests===1?old:freshDevice})}});
  window.result=(async()=>{const b=AtlasWebGPUCapabilities;await b.requestDevice('test');b.suspend();b.resume();return await b.requestDevice('test')===freshDevice;})();
 });
 await page.clock.runFor(4100);
 expect(await page.evaluate(()=>window.result)).toBe(true);
 expect(await page.evaluate(()=>({destroyed,requests}))).toEqual({destroyed:1,requests:2});
});

test('menu and level replacement cancel pending GPU preparation without stale status',async({page},info)=>{
 test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Real WebGPU required');
 await page.addInitScript(()=>{
  const request=GPUAdapter.prototype.requestDevice;window.requests=0;window.destroyedLate=false;
  GPUAdapter.prototype.requestDevice=function(...args){
   if(++requests!==1)return request.apply(this,args);
   return new Promise(resolve=>{window.finishOldDevice=async()=>{
    const device=await request.apply(this,args);device.lost.then(()=>window.destroyedLate=true);resolve(device);
   };});
  };
 });
 await open(page);
 await expect.poll(()=>page.evaluate(()=>Boolean(window.finishOldDevice))).toBe(true);
 await expect(page.locator('[data-preparation-status]')).toHaveText('Grafische engine starten...');
 await expect(page.getByRole('heading',{name:'Avontuur voorbereiden...'})).toBeVisible();
 await page.getByRole('button',{name:'Terug naar menu'}).click();
 await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
 await page.evaluate(()=>window.eval('selectLevel')('LVL-0035',{startImmediately:true,recordStart:false}));await ready(page);
 await page.evaluate(()=>window.finishOldDevice());
 await expect.poll(()=>page.evaluate(()=>window.destroyedLate)).toBe(true);
 expect((await snap(page)).levelId).toBe('LVL-0035');expect((await snap(page)).error).toBeNull();
 await expect(page.locator('[data-preparation-status]')).toHaveCount(0);
});

test('selecting a renderer while hidden does not start GPU work until visible',async({page})=>{
 await page.addInitScript(()=>{window.requests=0;Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>{requests++;return null;}}});});
 await open(page,'LVL-0001');
 const before=await page.evaluate(()=>{
  Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));
  window.eval('voxelRenderer').updateSettings({renderer:'atlas-3d'});window.eval('render')();return requests;
 });
 await page.evaluate(()=>window.eval('threeRenderer').sync());
 expect(await page.evaluate(()=>requests)).toBe(before);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'));});
 await expect.poll(()=>page.evaluate(()=>requests)).toBeGreaterThan(before);
 await page.evaluate(()=>window.eval('returnToMenu')());
});

test('shared Voxel owner rebuilds its resources after device loss',async({page},info)=>{
 test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Real WebGPU required');
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await open(page);
 await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'voxel'});window.eval('render')();});
 await expect.poll(()=>page.evaluate(()=>window.eval('voxelRenderer').snapshot().status)).toBe('ready');
 await page.evaluate(()=>{window.oldVoxelDevice=__ATLAS_WEBGPU_SESSION__.device;oldVoxelDevice.destroy();});
 await expect.poll(()=>page.evaluate(()=>AtlasWebGPUCapabilities.snapshot().deviceReady&&__ATLAS_WEBGPU_SESSION__.device!==oldVoxelDevice)).toBe(true);
 await expect.poll(()=>page.evaluate(()=>window.eval('voxelRenderer').snapshot().status)).toBe('ready');
 expect(errors).toEqual([]);
 await page.evaluate(()=>window.eval('returnToMenu')());
});
