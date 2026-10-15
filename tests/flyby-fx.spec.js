const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {bootEditorTest,selectSceneItem}=require('./editor-workspace-helpers');
require('./editor-draft-fixture').preserveEditorDrafts(test,path.join(__dirname,'..'));
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
const rigPath=path.join(__dirname,'../assets/ambient/flybys/shredder/fx.json');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../assets/ambient/flybys/shredder/',file))).digest('hex');
const shredderEffects=[
  ['shredder-jetwash','jetwash','behind'],
  ['shredder-left-jet','blue-thruster','behind'],
  ['shredder-right-jet','blue-thruster','behind'],
  ['shredder-center-jet','blue-thruster','behind'],
  ['fx-83f160b9-2ee6-4dab-8f67-096946a4e75d','blue-light','front']
];
test('attachment schema rejects incompatible sprites, duplicate IDs and excessive surfaces',()=>{
  const vm=require('vm'),scope={window:{AtlasAmbientSystem:require('../src/ambient-system')}};
  for(const file of ['scene-effects','flyby-fx'])vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../src/'+file+'.js'),'utf8'),scope);
  const fx=scope.window.AtlasFlybyFX,source=JSON.parse(fs.readFileSync(rigPath)),sprite='assets/ambient/flybys/shredder/shredder.png',size={width:407,height:543};
  // Preserve the complete authored rig, including its later front indicator.
  expect(crypto.createHash('sha256').update(JSON.stringify(source)).digest('hex')).toBe('6aa9ba8a611564ddc5da92a80905f439ccc94ac08299c516b6c6cfb1bacc4211');
  expect(source.effects.map(e=>[e.id,e.presetId,e.plane])).toEqual(shredderEffects);
  expect(fx.validate(source,sprite,size)).toEqual([]);
  for(const mutate of [d=>d.version=2,d=>d.sourceSize.width=408,d=>d.sprite='different.png',d=>d.effects[1].id=d.effects[0].id,d=>d.effects[0].plane='worldAtmosphere',d=>d.effects[0].geometry.length=1201,d=>{d.effects[0].geometry.width=800;d.effects[0].geometry.length=1200;d.effects[0].geometry.spreadDeg=120;}]){
    const doc=structuredClone(source);mutate(doc);expect(fx.validate(doc,sprite,size).length).toBeGreaterThan(0);
  }
  expect(fx.eligible({frames:[sprite],playback:'static'})).toBe(true);expect(fx.eligible({frames:[sprite,sprite],playback:'loop'})).toBe(false);
});
async function editor(page){
  await bootEditorTest(page,base+'/?dev=editor');await page.keyboard.press('Control+Shift+D');await page.getByRole('button',{name:'FX Editing',exact:true}).click();
  await expect(page.locator('[data-dimensions]')).toHaveText('407 × 543 source pixels');await expect(page.locator('[data-effects] li')).toHaveCount(5);
  expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.document.effects.map(e=>[e.id,e.presetId,e.plane]))).toEqual(shredderEffects);
}
test('dedicated workspace edits real Shredder with precise geometry and unsaved protection',async({page},info)=>{
  test.skip(info.project.name!=='desktop-chromium','Desktop authoring workspace');
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await editor(page);
  await expect(page.locator('[data-action="play"]')).toHaveText('Play');
  await page.locator('[data-select="shredder-left-jet"]').first().click();
  await page.locator('[data-scale]').selectOption('1');
  const before=await page.evaluate(()=>AtlasFlybyFXEditor.state.document.effects.find(e=>e.id==='shredder-left-jet').geometry);
  const handle=page.locator('[data-effect="shredder-left-jet"] [data-handle="position"]');const rect=await handle.boundingBox();
  await page.mouse.move(rect.x+rect.width/2,rect.y+rect.height/2);await page.mouse.down();await page.mouse.move(rect.x+rect.width/2+17,rect.y+rect.height/2+9);await page.mouse.up();
  await expect(page.getByRole('spinbutton',{name:'X',exact:true})).toHaveValue(String(before.x+17));
  await expect(page.getByRole('spinbutton',{name:'Y',exact:true})).toHaveValue(String(before.y+9));
  await page.locator('[data-scale]').selectOption('0.35');await page.locator('[data-mirror]').check();
  const mirrored=await handle.boundingBox();await page.mouse.move(mirrored.x+mirrored.width/2,mirrored.y+mirrored.height/2);await page.mouse.down();await page.mouse.move(mirrored.x+mirrored.width/2+7,mirrored.y+mirrored.height/2+7);await page.mouse.up();
  await expect(page.getByRole('spinbutton',{name:'X',exact:true})).toHaveValue(String(before.x-3));await expect(page.getByRole('spinbutton',{name:'Y',exact:true})).toHaveValue(String(before.y+29));
  await page.getByRole('spinbutton',{name:'Intensity',exact:true}).fill('2.5');
  await page.locator('[data-action="duplicate"]').click();await expect(page.locator('[data-effects] li')).toHaveCount(6);
  await page.locator('[data-action="up"]').click();await page.locator('[data-property="plane"]').selectOption('front');
  await page.locator('[data-action="delete"]').click();await expect(page.locator('[data-effects] li')).toHaveCount(5);
  await page.locator('[data-preset]').selectOption('blue-thruster');await page.locator('[data-action="add"]').click();await expect(page.locator('[data-effects] li')).toHaveCount(6);
  await page.evaluate(()=>{window.closedFX={root:AtlasFlybyFXEditor.state.root,planes:AtlasFlybyFXEditor.state.composer.planes.map(p=>p.canvas),preview:document.querySelector('[data-preview]')};});
  await page.locator('[data-action="world"]').click();await expect(page.locator('[data-unsaved]')).toBeVisible();await page.locator('[data-choice="discard"]').click();await expect(page.locator('[data-world-editor]')).toBeVisible();expect(errors).toEqual([]);expect(await page.evaluate(()=>({attached:closedFX.root.isConnected,pixels:closedFX.planes.reduce((n,c)=>n+c.width*c.height,0),preview:closedFX.preview.width}))).toEqual({attached:false,pixels:0,preview:0});
});
test('asset Save/Revert, reload, conflict validation and unchanged source bytes',async({page,request},info)=>{
  test.skip(info.project.name!=='desktop-chromium','Serial asset authoring');
  const source=fs.readFileSync(rigPath),hashes=[hash('shredder.png'),hash('shredder.mp3')];
  try{
    await editor(page);await page.locator('[data-property="label"]').fill('Jetwash saved in test');await page.locator('[data-action="save"]').click();await expect(page.locator('[data-status]')).toHaveText('Saved');
    expect(JSON.parse(fs.readFileSync(rigPath)).effects[0].label).toBe('Jetwash saved in test');
    await page.locator('[data-property="label"]').fill('Unsaved');await page.locator('[data-action="revert"]').click();await page.locator('[data-choice="discard"]').click();await expect(page.locator('[data-property="label"]')).toHaveValue('Jetwash saved in test');
    const url=base+'/__dev/flyby-fx?asset=flybys%2Fshredder',saved=await (await request.get(url)).json();
    const invalid=structuredClone(saved.document);invalid.sourceSize.width=999;
    expect((await request.post(url,{data:{revision:saved.revision,document:invalid}})).status()).toBe(400);
    expect((await request.post(url,{data:{revision:'stale',document:saved.document}})).status()).toBe(409);
    expect((await request.post(base+'/__dev/flyby-fx?asset=..%2F..%2Fsrc',{data:{}})).status()).toBe(400);
    await page.reload();await page.getByRole('button',{name:'Start avontuur',exact:true}).click();await page.locator('.menuScreen').waitFor();await page.keyboard.press('Control+Shift+D');await page.getByRole('button',{name:'FX Editing',exact:true}).click();await expect(page.locator('[data-property="label"]')).toHaveValue('Jetwash saved in test');
    expect([hash('shredder.png'),hash('shredder.mp3')]).toEqual(hashes);
    const current=await (await request.get(url)).json();
    const competing=['First concurrent edit','Second concurrent edit'].map(label=>{const doc=structuredClone(current.document);doc.effects[0].label=label;return request.post(url,{data:{revision:current.revision,document:doc}});});
    expect((await Promise.all(competing)).map(r=>r.status()).sort()).toEqual([200,409]);
  }finally{fs.writeFileSync(rigPath,source);}
});
test('shared composition is animated, masked, unclipped and readable at flyby scale',async({page},info)=>{
  await bootEditorTest(page,base+'/?dev=editor');
  const metrics=await page.evaluate(async()=>{
    const doc=await (await fetch('assets/ambient/flybys/shredder/fx.json')).json();
    const fx=AtlasFlybyFX.create(doc,{quality:'balanced',reducedMotion:false});fx.draw(.5,true);
    const p=fx.planes[0],ctx=p.canvas.getContext('2d');const first=ctx.getImageData(0,0,p.canvas.width,p.canvas.height).data.slice();fx.draw(.8,true);const second=ctx.getImageData(0,0,p.canvas.width,p.canvas.height).data;
    let changed=0,painted=0;for(let i=3;i<second.length;i+=4){if(second[i]>20)painted++;if(second[i]!==first[i])changed++;}
    const small=document.createElement('canvas');small.width=Math.ceil(p.canvas.width*.22);small.height=Math.ceil(p.canvas.height*.22);small.getContext('2d').drawImage(p.canvas,0,0,small.width,small.height);const pixels=small.getContext('2d').getImageData(0,0,small.width,small.height).data;let luminous=0;for(let i=0;i<pixels.length;i+=4)if(pixels[i+2]>180&&pixels[i+3]>100)luminous++;
    const one=structuredClone(doc);one.effects=[one.effects[3]];one.effects[0].mask={includes:[[{x:100,y:490},{x:260,y:490},{x:260,y:660},{x:100,y:660}]],cutouts:[[{x:180,y:550},{x:205,y:550},{x:205,y:580},{x:180,y:580}]]};const masked=AtlasFlybyFX.create(one);masked.draw(.5,true);const plane=masked.planes[0],at=(x,y)=>plane.canvas.getContext('2d').getImageData(x-plane.box.x,y-plane.box.y,1,1).data[3];
    one.effects[0].mask.includes=[];const cutoutOnly=AtlasFlybyFX.create(one);cutoutOnly.draw(.5,true);const cp=cutoutOnly.planes[0],sample=(x,y)=>cp.canvas.getContext('2d').getImageData(x-cp.box.x,y-cp.box.y,1,1).data[3];
    const result={changed,painted,luminous,extends:p.box.y+p.box.height>543,maskCutout:at(190,565),maskVisible:at(190,540),cutoutOnly:sample(190,565),outsideCutout:sample(190,540)};fx.dispose();masked.dispose();cutoutOnly.dispose();return result;
  });
  expect(metrics.changed).toBeGreaterThan(100);expect(metrics.painted).toBeGreaterThan(1000);expect(metrics.luminous).toBeGreaterThan(20);expect(metrics.extends).toBe(true);expect(metrics.maskCutout).toBe(0);expect(metrics.maskVisible).toBeGreaterThan(20);expect(metrics.cutoutOnly).toBe(0);expect(metrics.outsideCutout).toBeGreaterThan(20);
  if(info.project.name==='desktop-chromium'){await page.keyboard.press('Control+Shift+D');await page.getByRole('button',{name:'FX Editing',exact:true}).click();await expect(page.locator('[data-dimensions]')).toContainText('407');await page.locator('[data-action="fit-sprite"]').click();await page.screenshot({path:'qa-screenshots/flyby-fx-editor.png'});await page.locator('[data-scale]').selectOption('0.22');await page.locator('[data-show-guides]').uncheck();await page.screenshot({path:'qa-screenshots/flyby-fx-small.png'});}
});
async function runtime(page,mode='illustrated',expectFX=true){
  await bootEditorTest(page,base+'/?dev=editor');
  await page.evaluate(async mode=>{
    await window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});
    const original=window.eval('level').ambientFlybys[0];
    const c={...original,id:'fx-test',label:'FX test',frameA:'assets/ambient/flybys/shredder/shredder.png',frameB:null,path:[{x:600,y:370},{x:1300,y:450}],scale:.35,speed:60,sound:'',soundTriggers:[],faceFlightDirection:false,mirrorX:true,rotateAlongPath:true,maxRotationDeg:20};
    delete c.frames;delete c.playback;delete c.movementEndFrame;c.depthOcclusion=false;
    await window.eval('setLevelAmbientFlybys')([c]);window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();window.eval('ambientFlybyRuntime').preview(c.id);
  },mode);
  await expect(page.locator('[data-ambient-flyby="fx-test"]')).toHaveAttribute('data-active','true');
  await expect(page.locator('[data-flyby-fx-canvas]')).toHaveCount(expectFX?2:0);
  expect(await page.locator('[data-flyby-fx-canvas]').evaluateAll(nodes=>nodes.map(n=>[n.dataset.flybyFxCanvas,n.style.zIndex]))).toEqual(expectFX?[['behind','0'],['front','2']]:[]);
}
for(const mode of ['illustrated','cinematic'])test(`runtime ${mode}: auto sidecar, transforms, pause, sprite hits, lifecycle`,async({page},info)=>{
  if(mode==='cinematic'&&info.project.name==='desktop-chromium'&&process.env.ATLAS_WEBGPU_QA==='1')await page.addInitScript(()=>{
    window.fxUploads=[];const copy=GPUQueue.prototype.copyExternalImageToTexture;
    GPUQueue.prototype.copyExternalImageToTexture=function(source,destination,size){if(source.source?.hasAttribute?.('data-flyby-fx-canvas'))window.fxUploads.push({plane:source.source.dataset.flybyFxCanvas,revision:source.source.dataset.revision,width:source.source.width,height:source.source.height});return Reflect.apply(copy,this,arguments);};
  });
  await runtime(page,mode);
  if(mode==='cinematic'&&info.project.name==='desktop-chromium'&&process.env.ATLAS_WEBGPU_QA==='1'){
    await expect.poll(()=>page.evaluate(()=>window.fxUploads.length)).toBeGreaterThan(0);
    await expect.poll(()=>page.evaluate(()=>[...new Set(window.fxUploads.map(upload=>upload.plane))].sort())).toEqual(['behind','front']);
  }
  await page.waitForFunction(()=>window.eval('ambientFlybyRuntime').active.get('fx-test')?.elapsed>.3);
  const result=await page.evaluate(()=>{
    const r=window.eval('ambientFlybyRuntime'),active=r.active.get('fx-test'),shell=document.querySelector('[data-ambient-flyby="fx-test"]');
    r.togglePreview('fx-test');return {width:shell.offsetWidth,height:shell.offsetHeight,fxWidths:active.fx.planes.map(p=>p.canvas.width),transparentHit:r.hitAlpha('fx-test',.03,.03),elapsed:active.elapsed,revisions:[...shell.querySelectorAll('[data-flyby-fx-canvas]')].map(n=>n.dataset.revision),transform:shell.style.transform};
  });
  expect(result.width).toBe(407);expect(result.height).toBe(543);for(const width of result.fxWidths)expect(width).toBeGreaterThan(100);expect(result.transparentHit).toBe(0);expect(result.transform).toContain('scaleX(-1)');
  await page.waitForTimeout(150);expect(await page.locator('[data-flyby-fx-canvas]').evaluateAll(nodes=>nodes.map(n=>n.dataset.revision))).toEqual(result.revisions);
  await page.evaluate(()=>window.eval('ambientFlybyRuntime').togglePreview('fx-test'));
  for(const [i,plane] of ['behind','front'].entries())await expect.poll(()=>page.locator(`[data-flyby-fx-canvas="${plane}"]`).getAttribute('data-revision')).not.toBe(result.revisions[i]);
  if(info.project.name==='desktop-chromium')await page.screenshot({path:`qa-screenshots/flyby-fx-runtime-${mode}.png`});
  const stats=await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),canvases=r.active.get('fx-test').fx.planes.map(p=>p.canvas);r.releaseLevel();return {planes:canvases.map(c=>({width:c.width,height:c.height,connected:c.isConnected})),size:r.active.size};});expect(stats).toEqual({planes:[{width:0,height:0,connected:false},{width:0,height:0,connected:false}],size:0});
});
test('missing and invalid sidecars preserve the static sprite',async({page})=>{
  await page.route('**/shredder/fx.json',route=>route.fulfill({status:200,contentType:'application/json',body:'{"version":999}'}));await runtimeMissing(page);
  await page.unroute('**/shredder/fx.json');await page.route('**/shredder/fx.json',route=>route.fulfill({status:404,body:''}));await runtimeMissing(page);
});
async function runtimeMissing(page){await runtime(page,'illustrated',false);expect(await page.evaluate(()=>{const ready=window.eval('ambientFlybyRuntime').readiness.get('LVL-0034:fx-test');return {fx:ready.fx,ready:ready.ready,width:ready.images[0].naturalWidth};})).toEqual({fx:null,ready:true,width:407});}

test('attached planes share scene depth while source dimensions and contact stay unchanged',async({page})=>{
  await runtime(page);await page.evaluate(async()=>{const r=window.eval('ambientFlybyRuntime');r.togglePreview('fx-test');await window.eval('setLevelAmbientFlybys')([{...window.eval('level').ambientFlybys[0],depthOcclusion:true,depthBias:1}]);});
  const alpha=()=>page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),i=r.active.get('fx-test');const sum=c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let n=0;for(let j=3;j<d.length;j+=4)n+=d[j];return n;};return {fx:Object.fromEntries(i.fx.planes.map(p=>[p.plane,sum(p.canvas)])),body:sum(document.querySelector('[data-flyby-canvas]')),height:document.querySelector('[data-flyby-canvas]').height};});
  const visible=await alpha();for(const plane of ['behind','front'])expect(visible.fx[plane]).toBeGreaterThan(10000);expect(visible.body).toBeGreaterThan(10000);expect(visible.height).toBe(543);
  await page.evaluate(async()=>{await window.eval('setLevelAmbientFlybys')([{...window.eval('level').ambientFlybys[0],depthBias:-1}]);});const hidden=await alpha();for(const plane of ['behind','front'])expect(hidden.fx[plane]).toBeLessThan(visible.fx[plane]*.05);expect(hidden.body).toBeLessThan(visible.body*.05);expect(hidden.height).toBe(543);
});

test('mask vertices, front plane and isolated preview use editable source geometry',async({page},info)=>{
  test.skip(info.project.name!=='desktop-chromium','Desktop geometry controls');await editor(page);await expect(page.locator('[data-action="play"]')).toHaveText('Play');await page.locator('[data-select="shredder-center-jet"]').first().click();await page.locator('[data-action="fit-effects"]').click();
  await page.locator('[data-action="cutout"]').click();
  const points=await page.evaluate(()=>{const group=document.querySelector('[data-guide-transform]'),m=group.getScreenCTM();return [[170,535],[215,535],[215,590],[170,590]].map(([x,y])=>{const p=new DOMPoint(x,y).matrixTransform(m);return {x:p.x,y:p.y};});});
  for(const p of points)await page.mouse.click(p.x,p.y);await page.keyboard.press('Enter');
  expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.document.effects[3].mask.cutouts[0].length)).toBe(4);
  await page.locator('[data-property="plane"]').selectOption('front');await page.locator('[data-isolate]').check();
  expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.composer.planes.map(p=>p.items.length))).toEqual([0,1]);
  const vertex=page.locator('[data-handle="vertex"]').first(),box=await vertex.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+12,box.y+box.height/2+8);await page.mouse.up();
  expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.document.effects[3].mask.cutouts[0][0].x)).toBeGreaterThan(170);
});

test('Shredder native loop wraps, pauses, resumes, permits one-shot taps and stops on held completion',async({page})=>{
  await runtime(page);await page.evaluate(async()=>{
    const r=window.eval('ambientFlybyRuntime');r.stopPreview();
    const c={...window.eval('level').ambientFlybys[0],sound:'assets/ambient/flybys/shredder/shredder.mp3',soundTriggers:['during','tap'],loopDuringFlyby:true,startDelayMs:150,endBehavior:'hold',path:[{x:150,y:300},{x:450,y:300}],speed:10};
    await window.eval('setLevelAmbientFlybys')([c]);
  });
  await expect.poll(()=>page.evaluate(()=>window.eval('ambientFlybyRuntime').readiness.get('LVL-0034:fx-test').sound)).toBe(true);
  // Preview intentionally starts immediately; scheduler delay is covered separately.
  await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');r.preview('fx-test');window.rapidLoop=[...r.activeAudio.values()][0].audio;r.togglePreview('fx-test');r.togglePreview('fx-test');});
  await expect.poll(()=>page.evaluate(()=>[...window.eval('ambientFlybyRuntime').activeAudio.values()].filter(a=>a.loop&&!a.audio.paused).length)).toBe(1);
  expect(await page.evaluate(()=>[...window.eval('ambientFlybyRuntime').activeAudio.values()][0].audio===rapidLoop)).toBe(true);
  await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');r.active.get('fx-test').distance=r.cacheFor(window.eval('level').ambientFlybys[0]).totalLength*.4;window.testLoop=[...r.activeAudio.values()][0].audio;});
  await expect.poll(()=>page.evaluate(()=>Number.isFinite(window.testLoop.duration)&&window.testLoop.duration>0)).toBe(true);
  await expect.poll(()=>page.evaluate(()=>window.testLoop.currentTime)).toBeGreaterThan(.05);
  const wrapVolume=await page.evaluate(()=>testLoop.volume);expect(wrapVolume).toBeGreaterThan(0);
  await page.evaluate(()=>window.testLoop.currentTime=window.testLoop.duration-.05);
  await expect.poll(()=>page.evaluate(()=>window.testLoop.currentTime<1)).toBe(true);
  expect(await page.evaluate(()=>window.testLoop.loop)).toBe(true);expect(await page.evaluate(()=>testLoop.volume)).toBeCloseTo(wrapVolume,3);
  await page.evaluate(()=>window.eval('ambientFlybyRuntime').togglePreview('fx-test'));
  const paused=await page.evaluate(()=>({paused:testLoop.paused,time:testLoop.currentTime}));expect(paused.paused).toBe(true);await page.waitForTimeout(150);expect(await page.evaluate(()=>testLoop.currentTime)).toBeCloseTo(paused.time,2);
  await page.evaluate(()=>window.eval('ambientFlybyRuntime').togglePreview('fx-test'));await expect.poll(()=>page.evaluate(()=>testLoop.paused)).toBe(false);
  const tapBounds=await page.locator('[data-ambient-flyby="fx-test"]').boundingBox();expect(tapBounds.x+tapBounds.width).toBeGreaterThan(0);expect(tapBounds.x).toBeLessThan(page.viewportSize().width);
  await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),i=r.active.get('fx-test');r.tap('fx-test',{id:'fx-test',triggerId:i.triggerId,u:.5,v:.5});});
  expect(await page.evaluate(()=>[...window.eval('ambientFlybyRuntime').activeAudio.values()].filter(a=>!a.loop&&a.instanceId==='fx-test').length)).toBe(1);
  await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');r.active.get('fx-test').distance=r.cacheFor(window.eval('level').ambientFlybys[0]).totalLength;});
  await expect.poll(()=>page.evaluate(()=>window.eval('ambientFlybyRuntime').active.get('fx-test').held)).toBe(true);expect(await page.evaluate(()=>testLoop.paused)).toBe(true);expect(await page.evaluate(()=>[...window.eval('ambientFlybyRuntime').activeAudio.values()].some(a=>a.loop))).toBe(false);
  await page.evaluate(()=>window.eval('ambientFlybyRuntime').releaseLevel());expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
});

test('Loop during flyby uses the existing inspector and draft persistence',async({page},info)=>{
  test.skip(info.project.name!=='desktop-chromium','Desktop inspector');await runtime(page);await selectSceneItem(page,'flyby','fx-test');
  const audio=page.locator('[data-flyby-setting="loopDuringFlyby"]');await audio.evaluate(n=>n.closest('details').open=true);await expect(audio).not.toBeChecked();await audio.check();
  const payload=await page.evaluate(()=>window.eval('persistedLevelEditorPayload')());expect(payload.ambientFlybys[0].loopDuringFlyby).toBe(true);
  const endpoint=base+'/__dev/levels/LVL-0034/editor-draft';const response=await page.request.post(endpoint,{data:payload});expect(response.ok()).toBe(true);const saved=await (await page.request.get(endpoint)).json();expect(saved.ambientFlybys[0].loopDuringFlyby).toBe(true);
});

test('scheduled loops respect start delays, share one clip and release on visibility cancellation',async({page})=>{
  await runtime(page);await page.emulateMedia({reducedMotion:'no-preference'});
  await page.evaluate(async()=>{
    const r=window.eval('ambientFlybyRuntime');r.stopPreview();
    const c={...window.eval('level').ambientFlybys[0],sound:'assets/ambient/flybys/shredder/shredder.mp3',soundTriggers:['during'],loopDuringFlyby:true,startDelayMs:800,intervalMinMs:200,intervalMaxMs:200,syncKey:'fx-loop-pair'};
    await window.eval('setLevelAmbientFlybys')([c,{...c,id:'fx-second',startDelayMs:900}]);
    r.stopAll();window.eval('render')();
  });
  await expect.poll(()=>page.evaluate(()=>[...window.eval('ambientFlybyRuntime').timers.keys()].some(k=>k.startsWith('start:')))).toBe(true);
  expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
  await expect.poll(()=>page.evaluate(()=>[...window.eval('ambientFlybyRuntime').activeAudio.values()][0]?.owners.size)).toBe(2);
  expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(1);
  await page.evaluate(async()=>{window.scheduledLoop=[...window.eval('ambientFlybyRuntime').activeAudio.values()][0].audio;await window.eval('setLevelAmbientFlybys')([window.eval('level').ambientFlybys[0]]);});
  expect(await page.evaluate(()=>[...window.eval('ambientFlybyRuntime').activeAudio.values()][0].owners.size)).toBe(1);
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
  expect(await page.evaluate(()=>({paused:scheduledLoop.paused,audio:window.eval('ambientFlybyRuntime').activeAudio.size,active:window.eval('ambientFlybyRuntime').active.size}))).toEqual({paused:true,audio:0,active:0});
});

test.describe('tablet attachment budget',()=>{
  test.use({viewport:{width:1180,height:734},deviceScaleFactor:2,hasTouch:true});
  test('real WebGPU renders the Shredder with shared tablet quality and bounded uploads',async({page},info)=>{
    test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1','Requires real Chromium WebGPU; physical Safari remains separate.');
    await page.addInitScript(()=>{
      Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});
      window.tabletFXUploads=0;const copy=GPUQueue.prototype.copyExternalImageToTexture;
      GPUQueue.prototype.copyExternalImageToTexture=function(source,destination,size){if(source.source?.hasAttribute?.('data-flyby-fx-canvas'))window.tabletFXUploads++;return Reflect.apply(copy,this,arguments);};
    });
    await runtime(page,'cinematic');
    await expect.poll(()=>page.evaluate(()=>tabletFXUploads)).toBeGreaterThan(0);
    const budget=await page.evaluate(()=>{const fx=window.eval('ambientFlybyRuntime').active.get('fx-test').fx;return {quality:fx.quality,pixels:fx.planes.reduce((n,p)=>n+p.canvas.width*p.canvas.height,0)};});
    expect(budget.quality).toBe('balanced');expect(budget.pixels).toBeLessThan(1000000);
    await page.evaluate(()=>window.eval('ambientFlybyRuntime').togglePreview('fx-test'));await page.waitForTimeout(100);
    const uploads=await page.evaluate(()=>tabletFXUploads);await page.waitForTimeout(150);expect(await page.evaluate(()=>tabletFXUploads)).toBe(uploads);
    await page.evaluate(()=>window.eval('returnToMenu')());expect(await page.locator('[data-flyby-fx-canvas]').count()).toBe(0);
  });
});
