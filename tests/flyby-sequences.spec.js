const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
require('./editor-draft-fixture').preserveEditorDrafts(test,path.join(__dirname,'..'));
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
test.beforeEach(async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error' && !(info.title.startsWith('required frame failure') && /404|frame_035\.png/.test(m.text())))errors.push(m.text());});
 info.sequenceErrors=errors;
});
test.afterEach(async({},info)=>{expect(info.sequenceErrors).toEqual([]);});
const frames=set=>fs.readdirSync(`assets/ambient/flybys/${set}`).filter(f=>f.endsWith('.png')).sort((a,b)=>a.localeCompare(b,'en',{numeric:true})).map(f=>`assets/ambient/flybys/${set}/${f}`);
function config(set,extra={}){return {id:set,label:set,frames:frames(set),frameA:frames(set)[0],frameB:null,sound:`assets/ambient/flybys/${set}/bastion.mp3`,soundTriggers:[],path:[{x:1100,y:300},{x:1300,y:300}],scale:.5,speed:20,flapFrequencyHz:7,faceFlightDirection:false,mirrorX:false,rotateAlongPath:false,maxRotationDeg:0,intervalMinMs:60000,intervalMaxMs:60000,startDelayMs:0,softness:0,saturation:1,soundVolume:.7,playback:'loop',animationFps:24,endBehavior:'despawn',...extra};}
async function enter(page,configs,options={}){
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.route('**/Levels/LVL-0032/level.js*',async r=>{const response=await r.fetch();await r.fulfill({response,body:(await response.text())+`\nwindow.SVEN_LEVEL_DEFINITIONS['LVL-0032'].ambientFlybys=${JSON.stringify(configs)};`});});
 await page.addInitScript(()=>{
  window.sequenceRequests=[];window.sequenceDecodes=[];window.actionCalls=[];
  const fetch=window.fetch;window.fetch=function(url,...args){if(String(url).includes('/bastion_'))window.sequenceRequests.push(String(url));return fetch.call(this,url,...args);};
  const decode=HTMLImageElement.prototype.decode;HTMLImageElement.prototype.decode=function(){const src=this.src;return decode.call(this).then(value=>{window.sequenceDecodes.push(src);return value;});};
 });
 await page.goto(base+(options.editor?'/?dev=editor':''));
 expect(await page.evaluate(()=>window.sequenceRequests.length)).toBe(0);
 await page.evaluate(async()=>{if(!await window.eval('selectLevel')('LVL-0032',{startImmediately:true,recordStart:false}))return;const s=window.eval('state');s.worldX=1100;s.cameraX=window.eval('getDesiredCameraX')();window.eval('ambientFlybyRuntime').stopAll();window.eval('render')();});
 await expect.poll(()=>page.evaluate(()=>{
  const s=window.eval('cinematicRenderer').snapshot();
  return window.eval('state').screen!=='scene'||s.ready||Boolean(s.error)||s.status==='inactive';
 })).toBe(true);
}
async function spawn(page,id){await page.evaluate(id=>window.eval('ambientFlybyRuntime').preview(id),id);}
async function tap(page,id,info){await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);const b=await page.locator(`[data-ambient-flyby="${id}"]`).boundingBox();if(info.project.name.startsWith('ipad'))await page.touchscreen.tap(b.x+b.width/2,b.y+b.height/2);else await page.mouse.click(b.x+b.width/2,b.y+b.height/2);}

test('discovery reports both complete, naturally ordered independent sequences',async({request})=>{
 const data=await(await request.get(base+'/__dev/levels/LVL-0032/ambient-assets')).json();
 for(const [set,count]of [['bastion_walk',73],['bastion_walk_aim',101]]){
  const found=data.flybys.find(s=>s.key==='flybys/'+set);expect(found.frames).toEqual(frames(set));expect(found.frames).toHaveLength(count);expect(new Set(found.frames).size).toBe(count);expect(found.sound).toBe(`assets/ambient/flybys/${set}/bastion.mp3`);expect(found.frameB).toBeNull();
  expect(found.frames.map(p=>p.split('/').at(-1))).toEqual(Array.from({length:count},(_,i)=>`frame_${String(i+1).padStart(3,'0')}.png`));
 }
});
test('discovery orders unpadded numeric frames and accepts unnamed pairs',async({request})=>{
 const root=path.resolve('assets/ambient/flybys'),dir=fs.mkdtempSync(path.join(root,'codex-sequence-'));
 try{
  for(const name of ['frame_10.png','frame_2.png','frame_1.png'])fs.copyFileSync(frames('bastion_walk')[0],path.join(dir,name));
  const discover=async()=>{const payload=await(await request.get(base+'/__dev/levels/LVL-0032/ambient-assets')).json();return payload.flybys.find(s=>s.key==='flybys/'+path.basename(dir));};
  expect((await discover()).frames.map(p=>p.split('/').at(-1))).toEqual(['frame_1.png','frame_2.png','frame_10.png']);
  fs.unlinkSync(path.join(dir,'frame_1.png'));
  const pair=await discover();expect(pair.frames.map(p=>p.split('/').at(-1))).toEqual(['frame_2.png','frame_10.png']);expect(pair.frameB).toBe(pair.frames[1]);
 }finally{if(!dir.startsWith(root+path.sep))throw new Error('Invalid fixture directory');fs.rmSync(dir,{recursive:true});}
});
for(const sets of [[],['bastion_walk'],['bastion_walk_aim'],['bastion_walk','bastion_walk_aim']])test(`cold readiness decodes only current-level sequences: ${sets.join('+')||'neither'}`,async({page})=>{
 await enter(page,sets.map(s=>config(s)));
 const result=await page.evaluate(()=>{const plan=window.eval('assetReadiness').snapshot(),r=window.eval('ambientFlybyRuntime');return {ready:window.eval('state').criticalAssetsReady,paths:[...plan.images.keys()].filter(p=>p.includes('/bastion_')),prepared:[...r.readiness.values()].map(s=>s.images.length),decoded:[...plan.images].filter(([p])=>p.includes('/bastion_')).every(([,img])=>img.complete&&img.naturalWidth&&window.sequenceDecodes.includes(img.src))};});
 expect(result.ready).toBe(true);expect(result.paths.sort()).toEqual(sets.flatMap(frames).sort());expect(result.decoded).toBe(true);expect(result.prepared).toEqual(sets.map(s=>frames(s).length));
 await page.evaluate(()=>window.eval('returnToMenu')());expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').readiness.size)).toBe(0);
});
test('Loop uses all frames in order, wraps, keeps speed independent and performs no playback decode',async({page})=>{
 await enter(page,[config('bastion_walk')]);await page.clock.install();await spawn(page,'bastion_walk');
 const pending=page.evaluate(async()=>{
  const r=window.eval('ambientFlybyRuntime'),instance=r.active.get('bastion_walk'),canvas=document.querySelector('[data-flyby-canvas]'),sources=new Set(r.readiness.get('LVL-0032:bastion_walk').images.map(i=>i.src));
  const before=window.sequenceDecodes.filter(s=>sources.has(s)).length,requests=window.sequenceRequests.length,seen=[0];
  await new Promise((resolve,reject)=>{const deadline=performance.now()+8000;const sample=()=>{const n=Number(canvas.dataset.frameIndex);if(n!==seen.at(-1))seen.push(n);if(seen.length>=75)resolve();else if(performance.now()>deadline)reject(new Error('Loop did not wrap '+JSON.stringify({seen,elapsed:instance.elapsed,step:instance.animationStep,hidden:document.hidden,active:r.active.size})));else requestAnimationFrame(sample);};sample();});
  return {seen,elapsed:instance.elapsed,distance:instance.distance,decodeDelta:window.sequenceDecodes.filter(s=>sources.has(s)).length-before,requestDelta:window.sequenceRequests.length-requests,active:r.active.get('bastion_walk')===instance};
 });
 await page.clock.runFor(3300);const result=await pending;expect(result.seen.slice(0,75)).toEqual([...Array(73).keys(),0,1]);expect(result.distance).toBeCloseTo(result.elapsed*20,4);expect(result.elapsed).toBeGreaterThanOrEqual(74/24-.1);expect(result.decodeDelta).toBe(0);expect(result.requestDelta).toBe(0);expect(result.active).toBe(true);
});
test('Once reaches its endpoint at Movement End Frame, fires once, holds and remains tappable',async({page},info)=>{
 await enter(page,[config('bastion_walk_aim',{playback:'once',movementEndFrame:45,endBehavior:'hold',actions:{onTap:'testTap',onAnimationComplete:'testComplete'},soundTriggers:['tap']})]);
 await page.evaluate(()=>{window.AtlasAmbientSystem.registerAction('testTap',e=>window.actionCalls.push({trigger:e.trigger,frame:e.instance.frameIndex}));window.AtlasAmbientSystem.registerAction('testComplete',e=>window.actionCalls.push({trigger:e.trigger,frame:e.instance.frameIndex}));});
 await page.clock.install();await spawn(page,'bastion_walk_aim');
 const pending=page.evaluate(async()=>{
  const r=window.eval('ambientFlybyRuntime'),instance=r.active.get('bastion_walk_aim'),canvas=document.querySelector('[data-flyby-canvas]'),seen=[0],samples=[],requests=window.sequenceRequests.length;
  const sources=new Set(r.readiness.get('LVL-0032:bastion_walk_aim').images.map(i=>i.src)),decodes=window.sequenceDecodes.filter(s=>sources.has(s)).length;
  await new Promise((resolve,reject)=>{const deadline=performance.now()+10000;const sample=()=>{const frame=instance.frameIndex||0;if(frame!==seen.at(-1)){seen.push(frame);samples.push({frame,progress:instance.progress});}if(instance.held)resolve();else if(performance.now()>deadline)reject(new Error('Once did not hold'));else requestAnimationFrame(sample);};sample();});
  window.heldRef=instance;window.heldCanvas=canvas;
  return {seen,samples,progress:instance.progress,actions:window.actionCalls,timers:r.timers.size,revision:canvas.dataset.revision,requestDelta:window.sequenceRequests.length-requests,decodeDelta:window.sequenceDecodes.filter(s=>sources.has(s)).length-decodes};
 });
 await page.clock.runFor(4300);const result=await pending;expect(result.seen).toEqual([...Array(101).keys()]);expect(result.samples.find(s=>s.frame===43).progress).toBeLessThan(1);expect(result.samples.filter(s=>s.frame>=44).every(s=>s.progress===1)).toBe(true);expect(result.progress).toBe(1);expect(result.actions).toEqual([{trigger:'onAnimationComplete',frame:100}]);expect(result.timers).toBe(0);
 expect(result.requestDelta).toBe(0);expect(result.decodeDelta).toBe(0);
 await page.screenshot({path:`output/flyby-held-${info.project.name}.png`});
 await page.waitForTimeout(150);expect(await page.locator('[data-flyby-canvas]').getAttribute('data-revision')).toBe(result.revision);
 await page.evaluate(()=>{
  Object.defineProperty(document,'hidden',{configurable:true,get:()=>window.flybyTestHidden});
  window.flybyTestHidden=true;document.dispatchEvent(new Event('visibilitychange'));
 });
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').active.get('bastion_walk_aim')===window.heldRef)).toBe(true);
 await page.evaluate(()=>{window.flybyTestHidden=false;document.dispatchEvent(new Event('visibilitychange'));});
 expect(await page.locator('[data-flyby-canvas]').getAttribute('data-revision')).toBe(result.revision);
 await tap(page,'bastion_walk_aim',info);expect(await page.evaluate(()=>window.actionCalls.filter(a=>a.trigger==='onTap').length)).toBe(1);
 await expect.poll(()=>page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(1);
 await page.evaluate(()=>{window.eval('state').worldX+=30;window.eval('render')();});
 expect(await page.evaluate(()=>document.querySelector('[data-flyby-canvas]')===window.heldCanvas&&window.eval('ambientFlybyRuntime').active.get('bastion_walk_aim')===window.heldRef)).toBe(true);
 expect(await page.evaluate(()=>window.actionCalls.filter(a=>a.trigger==='onAnimationComplete').length)).toBe(1);
 await page.mouse.click(10,400);expect(await page.evaluate(()=>window.actionCalls.filter(a=>a.trigger==='onTap').length)).toBe(1);
 await page.evaluate(()=>window.eval('returnToMenu')());expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').active.size)).toBe(0);expect(await page.locator('[data-flyby-canvas]').count()).toBe(0);
});
test('first sequence playback retains a nonblank canvas through native Sven movement and idle rerenders',async({page})=>{
 await enter(page,[config('bastion_walk',{speed:1})]);await spawn(page,'bastion_walk');
 await page.evaluate(()=>{
  const r=window.eval('ambientFlybyRuntime'),node=document.querySelector('[data-ambient-flyby="bastion_walk"]'),canvas=node.querySelector('canvas'),instance=r.active.get('bastion_walk');
  window.sequenceContinuity={faults:[],frames:new Set(),states:new Set(),cameras:[]};
  const sample=()=>{
   const q=window.sequenceContinuity,current=document.querySelector('[data-ambient-flyby="bastion_walk"]'),style=getComputedStyle(node);
   q.frames.add(canvas.dataset.frameIndex);q.states.add(window.eval('locomotion').snapshot().state);q.cameras.push(window.eval('state').cameraX);
   if(current!==node||!canvas.isConnected||current.querySelector('canvas')!==canvas||r.active.get('bastion_walk')!==instance||node.dataset.active!=='true'||style.opacity!=='1')q.faults.push('visual/instance discontinuity');
   const pixels=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;
   let alpha=false;for(let i=3;i<pixels.length;i+=4)if(pixels[i]){alpha=true;break;}
   if(!alpha)q.faults.push('blank frame');q.raf=requestAnimationFrame(sample);
  };sample();
 });
 for(const distance of [160,-100]){
  await page.evaluate(distance=>{const s=window.eval('state');window.eval('beginFreeWalk')({x:s.worldX+distance,y:s.worldY});},distance);
  await expect.poll(()=>page.evaluate(()=>window.eval('state').movement===null),{timeout:10000}).toBe(true);
 }
 const result=await page.evaluate(()=>{const q=window.sequenceContinuity;cancelAnimationFrame(q.raf);return {faults:q.faults,frames:q.frames.size,states:[...q.states],cameraRange:Math.max(...q.cameras)-Math.min(...q.cameras)};});
 expect(result.faults).toEqual([]);expect(result.frames).toBeGreaterThan(2);expect(result.states).toContain('idle');expect(result.states.some(s=>s.startsWith('walk'))).toBe(true);expect(result.cameraRange).toBeGreaterThan(10);
});
for(const playback of ['static','loop','once'])test(`actions without sound use real ${playback} hit testing`,async({page},info)=>{
 await enter(page,[config('bastion_walk',{playback,actions:{onTap:'testTap'}})]);
 await page.evaluate(()=>window.AtlasAmbientSystem.registerAction('testTap',()=>window.actionCalls.push('tap')));await spawn(page,'bastion_walk');await tap(page,'bastion_walk',info);expect(await page.evaluate(()=>window.actionCalls)).toEqual(['tap']);expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
});
test('sequence validation rejects corrupt options before Apply',async({request})=>{
 for(const extra of [{frames:[]},{frames:['x','x']},{animationFps:0},{movementEndFrame:200},{playback:'auto'},{endBehavior:'restart'},{depthBias:2},{actions:{onExit:'bad'}}]){
  const response=await request.post(base+'/__dev/levels/LVL-0032/apply-editor',{data:{ambientFlybys:[config('bastion_walk',extra)]}});expect(response.status()).toBe(400);
 }
});
for(const playback of ['loop','once'])test(`${playback} despawns before recurrence and never overlaps itself`,async({page})=>{
 const c=config('bastion_walk',{playback,frames:frames('bastion_walk').slice(0,3),animationFps:4,path:[{x:1100,y:300},{x:1120,y:300}],speed:20,intervalMinMs:1000,intervalMaxMs:1000});
 await page.clock.install();await enter(page,[c]);await page.evaluate(()=>window.eval('ambientFlybyRuntime').stopAll());await spawn(page,c.id);
 await page.evaluate(()=>window.firstFlight=window.eval('ambientFlybyRuntime').active.get('bastion_walk'));
 if(playback==='once'){
  await page.clock.runFor(600);
  expect(await page.evaluate(()=>{const i=window.eval('ambientFlybyRuntime').active.get('bastion_walk');return {frame:i?.frameIndex,active:document.querySelector('[data-ambient-flyby="bastion_walk"]').dataset.active};})).toEqual({frame:2,active:'true'});
  await page.clock.runFor(200);
 }else await page.clock.runFor(1100);
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').active.size)).toBe(0);
 await page.clock.runFor(1000);
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').active.size)).toBe(0);
 await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');r.stopPreview();r.sync();});
 await page.clock.runFor(1000);
 expect(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');return r.active.size===1&&r.active.get('bastion_walk')!==window.firstFlight;})).toBe(true);
 await page.evaluate(async()=>{const c=window.eval('level').ambientFlybys[0];c.enabled=false;await window.eval('setLevelAmbientFlybys')([c]);});
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').active.size)).toBe(0);expect(await page.locator('[data-flyby-canvas]').count()).toBe(0);
});
test('required frame failure prevents gameplay and reports the exact asset',async({page})=>{
 await page.route('**/bastion_walk/frame_035.png',r=>r.fulfill({status:404,body:'missing test frame'}));
 await enter(page,[config('bastion_walk')]);
 expect(await page.evaluate(()=>window.eval('state').screen)).toBe('menu');
 expect(await page.evaluate(()=>window.eval('state').error)).toContain('frame_035.png');
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').active.size)).toBe(0);
 expect(await page.evaluate(()=>window.eval('selectLevel')('LVL-0016',{startImmediately:true,recordStart:false}))).toBe(true);
});
test('level preparation waits for the last required sequence frame',async({page})=>{
 let release;const gate=new Promise(resolve=>release=resolve);
 await page.route('**/bastion_walk/frame_073.png',async r=>{await gate;await r.continue();});
 const requested=page.waitForRequest('**/bastion_walk/frame_073.png');
 const pending=enter(page,[config('bastion_walk')]);
 try {await requested;expect(await page.evaluate(()=>window.eval('state').screen)).toBe('loading');expect(await page.evaluate(()=>Boolean(window.eval('state').criticalAssetsReady))).toBe(false);}
 finally {release();await pending;}
 expect(await page.evaluate(()=>window.eval('state').criticalAssetsReady)).toBe(true);
});
test('shared prepared images are reused across instances and released on repeated level exit',async({page})=>{
 const c=config('bastion_walk');await enter(page,[c,{...c,id:'second'}]);
 for(let i=0;i<3;i++){
  if(i)await page.evaluate(()=>window.eval('selectLevel')('LVL-0032',{startImmediately:true,recordStart:false}));
  expect(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');return r.readiness.get('LVL-0032:bastion_walk').images.every((img,i)=>img===r.readiness.get('LVL-0032:second').images[i]);})).toBe(true);
  await spawn(page,'bastion_walk');await page.evaluate(()=>window.eval('returnToMenu')());
  expect(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');return [r.active.size,r.readiness.size,r.timers.size,r.pathCaches.size];})).toEqual([0,0,0,0]);
 }
});
for(const mode of ['illustrated','cinematic'])test(`depth masks prepared frames and stays active when held in ${mode}`,async({page},info)=>{
 const png=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=2172;c.height=724;const ctx=c.getContext('2d');ctx.fillStyle='rgb(51,51,51)';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='rgb(230,230,230)';ctx.fillRect(0,0,1200,300);return c.toDataURL().split(',')[1];});
 await page.route('**/Levels/LVL-0032/depthmap.png',r=>r.fulfill({contentType:'image/png',body:Buffer.from(png,'base64')}));
 const c=config('bastion_walk_aim',{playback:'once',animationFps:60,movementEndFrame:45,endBehavior:'hold',path:[{x:1600,y:300},{x:1101,y:300}]});
 await enter(page,[{...c,id:'baseline'},{...c,id:'masked',depthOcclusion:true,depthBias:0},{...c,id:'bias',depthOcclusion:true,depthBias:1}]);
 await page.evaluate(mode=>{window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();},mode);
 await page.clock.install();for(const id of ['baseline','masked','bias'])await spawn(page,id);
 const pixels=()=>page.evaluate(()=>[...document.querySelectorAll('[data-flyby-canvas]')].map(c=>{const p=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let alpha=0;for(let i=3;i<p.length;i+=4)alpha+=p[i];return {id:c.closest('[data-ambient-flyby]').dataset.ambientFlyby,alpha};}));
 const initial=Object.fromEntries((await pixels()).map(p=>[p.id,p.alpha]));expect(initial.masked).toBe(initial.baseline);
 await page.clock.runFor(2000);
 await expect.poll(()=>page.evaluate(()=>[...window.eval('ambientFlybyRuntime').active.values()].every(i=>i.held))).toBe(true);
 const first=await pixels(),values=Object.fromEntries(first.map(p=>[p.id,p.alpha]));
 expect(values.masked).toBeGreaterThan(0);expect(values.masked).toBeLessThan(values.baseline*.9);expect(values.bias).toBe(values.baseline);
 await page.evaluate(()=>{window.eval('state').worldX+=80;window.eval('render')();});expect(await pixels()).toEqual(first);
 if(mode==='cinematic'&&info.project.name==='desktop-chromium'){
  await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);
  await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().textureUploads.filter(u=>u.path.startsWith('prepared flyby')).length)).toBe(3);
  expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().error)).toBeFalsy();
 }
});
test('editor Add, sequence controls and Apply/reload keep both independent definitions',async({page},info)=>{
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));await page.goto(base+'/?dev=editor');
 await page.evaluate(()=>window.eval('selectLevel')('LVL-0032',{startImmediately:true,recordStart:false}));
 await page.keyboard.press('Control+Shift+D');await page.locator('[data-editor-mode="graphics"]').click();
 for(const [set,playback,count]of [['bastion_walk','loop',73],['bastion_walk_aim','once',101]]){
  const details=page.locator('details').filter({has:page.locator('summary').filter({hasText:/^Add ambient flyby$/})}).last();if(await details.getAttribute('open')===null)await details.locator('summary').first().click();
  const form=page.locator('[data-add-flyby-form]');await form.locator('[name="assetSet"]').selectOption('flybys/'+set);await expect(form.locator('[data-flyby-sequence-summary]')).toContainText(`Frames: ${count}`);
  await expect(form.locator('[name="playback"]')).toHaveValue('');await form.locator('[name="playback"]').selectOption(playback);await form.locator('[name="id"]').fill(set);await form.locator('[name="label"]').fill(set);await form.locator('[data-debug-action="add-flyby"]').click();
  await expect(page.locator(`[data-flyby-editor-id="${set}"]`)).toBeVisible();
  if(playback==='once'){
   await page.locator(`[data-flyby-id="${set}"][data-flyby-setting="movementEndFrame"]`).fill('45');await page.locator(`[data-flyby-id="${set}"][data-flyby-setting="movementEndFrame"]`).dispatchEvent('change');
   await page.locator(`[data-flyby-id="${set}"][data-flyby-setting="endBehavior"]`).selectOption('hold');
   await page.locator(`[data-flyby-id="${set}"][data-flyby-setting="depthOcclusion"]`).check();
  }
 }
 await page.screenshot({path:`output/flyby-editor-${info.project.name}.png`});
 await page.getByRole('button',{name:'Apply',exact:true}).click();await expect(page.getByText('Draft Status: Applied',{exact:true})).toBeVisible();await page.reload();await page.evaluate(()=>window.eval('selectLevel')('LVL-0032',{startImmediately:true,recordStart:false}));
 const stored=await page.evaluate(()=>window.eval('level').ambientFlybys.filter(f=>f.id.startsWith('bastion_')));
 expect(stored.map(c=>c.frames.length)).toEqual([73,101]);expect(stored[0].playback).toBe('loop');expect(stored[1]).toMatchObject({playback:'once',movementEndFrame:45,endBehavior:'hold',depthOcclusion:true});
});
