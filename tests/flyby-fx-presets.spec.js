const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path'),vm=require('vm');
const {bootEditorTest}=require('./editor-workspace-helpers');
const root=path.join(__dirname,'..'),base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
require('./editor-draft-fixture').preserveEditorDrafts(test,root);
const sprite='assets/ambient/flybys/arc_snitch/arc_snitch.png',sidecar=path.join(root,'assets/ambient/flybys/arc_snitch/fx.json');
const scope={window:{AtlasAmbientSystem:require('../src/ambient-system')}};
for(const name of ['scene-effects','flyby-fx'])vm.runInNewContext(fs.readFileSync(path.join(root,'src',name+'.js'),'utf8'),scope);
const E=scope.window.AtlasSceneEffects,FX=scope.window.AtlasFlybyFX;
function rig(){
 const doc=FX.empty(sprite,501,282);
 for(const id of ['orange-yellow-thruster','blue-white-spotlight']){
  const e=E.defaultInstance(id,null,doc.sourceSize,doc.effects.length);delete e.layerSlot;delete e.groupId;e.seed=53;e.plane='behind';
  Object.assign(e.geometry,{x:270,y:245});doc.effects.push(e);
 }
 return JSON.parse(JSON.stringify(doc));
}
test('new presets validate in V1; sweep bounds cover the whole arc and retain resource limits',()=>{
 const doc=rig();expect(FX.validate(doc,sprite,doc.sourceSize)).toEqual([]);
 const old=JSON.parse(fs.readFileSync(path.join(root,'assets/ambient/flybys/shredder/fx.json')));
 expect(FX.validate(old,'assets/ambient/flybys/shredder/shredder.png',old.sourceSize)).toEqual([]);
 for(const [field,value] of [['sweepEnabled',1],['sweepAmplitude',91],['sweepSpeed',-1],['sweepPhase',361]]){
  const invalid=structuredClone(doc);invalid.effects[1].overrides[field]=value;expect(FX.validate(invalid,sprite,doc.sourceSize).length).toBeGreaterThan(0);
 }
 const effect=doc.effects[1];effect.overrides={sweepAmplitude:90,sweepPhase:180};
 for(const direction of [-360,-137,0,47,90,220,360]){
  effect.geometry.directionDeg=direction;const r=E.resolve(effect,{}),box=FX.bounds(r),g=r.geometry;
  for(let offset=-90;offset<=90;offset+=3){
   const a=(direction+offset-90)*Math.PI/180,w=g.width/2+g.length*Math.tan(g.spreadDeg*Math.PI/360);
   for(const x of [-w,w]){const px=g.x+x*Math.cos(a)-g.length*Math.sin(a),py=g.y+x*Math.sin(a)+g.length*Math.cos(a);expect(px).toBeGreaterThan(box.x);expect(px).toBeLessThan(box.x+box.width);expect(py).toBeGreaterThan(box.y);expect(py).toBeLessThan(box.y+box.height);}
  }
 }
 Object.assign(effect.geometry,{length:1200,width:800,spreadDeg:120});expect(FX.validate(doc,sprite,doc.sourceSize).join(' ')).toContain('budget');
});

test('warm propulsion and soft scanning beam render at flyby scale, deterministically and without clipping',async({page},info)=>{
 await bootEditorTest(page,base+'/?dev=editor');
 const metrics=await page.evaluate(async doc=>{
  const E=AtlasSceneEffects,F=AtlasFlybyFX;
  const capture=(effect,time)=>{const d={...doc,effects:[effect]},fx=F.create(d,{quality:'balanced',reducedMotion:false});fx.draw(time,true);const p=fx.planes.find(p=>p.items.length),c=p.canvas,data=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let mass=0,cx=0,red=0,blue=0,edge=0;for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){const n=(y*c.width+x)*4,a=data[n+3];mass+=a;cx+=(x+p.box.x)*a;red+=data[n]*a;blue+=data[n+2]*a;if(x<2||y<2||x>=c.width-2||y>=c.height-2)edge+=a;}const result={mass,cx:cx/mass,red:red/mass,blue:blue/mass,edge,png:c.toDataURL(),box:p.box};fx.dispose();return result;};
  const warm=doc.effects[0],spot=doc.effects[1];spot.overrides={sweepAmplitude:30,sweepSpeed:.25,flickerAmount:0};
  const a=capture(spot,1),b=capture(spot,3),same=capture(spot,1);
  spot.overrides.sweepEnabled=false;const idle=capture(spot,0),idleLater=capture(spot,3);
  const warmStats=capture(warm,.5),blue=E.defaultInstance('blue-thruster',null,doc.sourceSize);delete blue.layerSlot;delete blue.groupId;blue.plane='behind';blue.seed=53;
  const blueStats=capture(blue,.5);spot.overrides.opacity=0;const invisible=capture(spot,1);delete spot.overrides.opacity;
  // Contact sheet: actual Snitch with a downward beam, plus both propulsion
  // styles at source size and 35%, against a daylight background.
  const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=850;canvas.style='position:fixed;inset:0;z-index:99999;width:1000px;height:850px';document.body.append(canvas);
  const ctx=canvas.getContext('2d'),bg=ctx.createLinearGradient(0,0,0,850);bg.addColorStop(0,'#527d99');bg.addColorStop(1,'#b5ccce');ctx.fillStyle=bg;ctx.fillRect(0,0,1000,850);
  ctx.font='18px sans-serif';ctx.fillStyle='#fff';ctx.fillText('Snitch searchlight · source size',30,30);ctx.fillText('35% flyby scale',685,30);
  const image=new Image();image.src='assets/ambient/flybys/arc_snitch/arc_snitch.png';await image.decode();
  for(const [x,y,scale] of [[20,50,.8],[700,75,.35]]){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);const fx=F.create({...doc,effects:[spot]},{reducedMotion:false});fx.draw(0,true);for(const p of fx.planes)if(p.items.length)ctx.drawImage(p.canvas,p.box.x,p.box.y);ctx.drawImage(image,0,0);ctx.restore();fx.dispose();}
  for(const [effect,x,label] of [[blue,550,'Blue'],[warm,730,'Orange / Yellow']]){ctx.fillStyle='#fff';ctx.fillText(label,x,440);for(const scale of [1,.35]){const e=structuredClone(effect);e.geometry.x=0;e.geometry.y=0;const fx=F.create({...doc,effects:[e]},{reducedMotion:false});fx.draw(.5,true);ctx.save();ctx.translate(x+(scale===1?25:90),480);ctx.scale(scale,scale);for(const p of fx.planes)if(p.items.length)ctx.drawImage(p.canvas,p.box.x,p.box.y);ctx.restore();fx.dispose();}}
  return {warm: warmStats.red-warmStats.blue,blue:blueStats.blue-blueStats.red,warmAnimated:warmStats.png!==capture(warm,.7).png,moving:a.png!==b.png,deterministic:a.png===same.png,idle:idle.png===idleLater.png,sweepLeft:a.cx,sweepRight:b.cx,edge:a.edge+b.edge,boxStable:JSON.stringify(a.box)===JSON.stringify(b.box),visible:a.mass,zero:invisible.mass};
 },rig());
 expect(metrics.warm).toBeGreaterThan(45);expect(metrics.blue).toBeGreaterThan(45);expect(metrics.warmAnimated).toBe(true);expect(metrics.moving).toBe(true);expect(metrics.deterministic).toBe(true);expect(metrics.idle).toBe(true);expect(metrics.sweepLeft).toBeLessThan(270);expect(metrics.sweepRight).toBeGreaterThan(270);expect(metrics.edge).toBe(0);expect(metrics.boxStable).toBe(true);expect(metrics.visible).toBeGreaterThan(100000);expect(metrics.zero).toBe(0);
 await page.screenshot({path:info.outputPath('new-flyby-presets.png')});
});

test('spotlight masks stay in sprite coordinates, reduced motion slows the sweep, and surfaces release',async({page})=>{
 await bootEditorTest(page,base+'/?dev=editor');
 const result=await page.evaluate(doc=>{
  const e=doc.effects[1];doc.effects=[e];e.overrides={sweepAmplitude:30,sweepSpeed:.25,flickerAmount:0};
  const full=AtlasFlybyFX.create(doc,{reducedMotion:false}),reduced=AtlasFlybyFX.create(doc,{reducedMotion:true});
  full.draw(.35,true);reduced.draw(1,true);const slowed=full.planes[0].canvas.toDataURL()===reduced.planes[0].canvas.toDataURL();
  full.draw(0,true);const p=full.planes[0],sample=plane=>plane.canvas.getContext('2d').getImageData(270-plane.box.x,340-plane.box.y,1,1).data[3],unmasked=sample(p);
  e.mask={includes:[],cutouts:[[{x:245,y:315},{x:295,y:315},{x:295,y:365},{x:245,y:365}]]};
  const masked=AtlasFlybyFX.create(doc,{reducedMotion:false});const alpha=[];
  for(const time of [0,.4,1,2,3]){masked.draw(time,true);alpha.push(sample(masked.planes[0]));}
  const owned=[...full.planes,...reduced.planes,...masked.planes].flatMap(p=>[p.canvas,...p.items.flatMap(r=>[r._maskCanvas,r._searchlightCanvas]).filter(Boolean)]);
  full.dispose();reduced.dispose();masked.dispose();return {slowed,unmasked,alpha,released:owned.every(c=>c.width===0&&c.height===0)};
 },rig());
 expect(result.slowed).toBe(true);expect(result.unmasked).toBeGreaterThan(20);expect(result.alpha).toEqual([0,0,0,0,0]);expect(result.released).toBe(true);
});

test('new preset controls use normal authoring, save, reload and revert on arc_snitch',async({page})=>{
 const original=fs.existsSync(sidecar)?fs.readFileSync(sidecar):null;
 try{
  await bootEditorTest(page,base+'/?dev=editor');await page.keyboard.press('Control+Shift+D');await page.getByRole('button',{name:'FX Editing',exact:true}).click();await expect(page.locator('[data-dimensions]')).toContainText('407');
  await page.locator('[data-asset]').selectOption('flybys/arc_snitch');await expect(page.locator('[data-dimensions]')).toHaveText('501 × 282 source pixels');
  for(const id of ['orange-yellow-thruster','blue-white-spotlight']){await page.locator('[data-preset]').selectOption(id);await page.locator('[data-action="add"]').click();}
  const sweep=page.getByRole('checkbox',{name:'Sweep enabled',exact:true});await expect(sweep).toBeChecked();await sweep.uncheck();
  await page.getByRole('spinbutton',{name:'Sweep amplitude (°)',exact:true}).fill('35');await page.getByRole('spinbutton',{name:'Sweep speed (cycles/s)',exact:true}).fill('0.2');await page.getByRole('spinbutton',{name:'Sweep phase (°)',exact:true}).fill('45');
  await page.locator('[data-property="plane"]').selectOption('front');await page.locator('[data-action="duplicate"]').click();await page.locator('[data-property="enabled"]').uncheck();
  const authored=await page.evaluate(()=>AtlasFlybyFXEditor.state.document);
  await page.locator('[data-action="save"]').click();await expect(page.locator('[data-status]')).toHaveText('Saved');expect(JSON.parse(fs.readFileSync(sidecar))).toEqual(authored);
  await sweep.check();await page.locator('[data-action="revert"]').click();await page.locator('[data-choice="discard"]').click();await expect(page.locator('[data-status]')).toHaveText('Saved');
  expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.document)).toEqual(authored);
  await page.locator(`[data-select="${authored.effects.at(-2).id}"]`).first().click();await expect(sweep).not.toBeChecked();await expect(page.getByRole('spinbutton',{name:'Sweep phase (°)',exact:true})).toHaveValue('45');
  await sweep.check();await page.locator('[data-action="play"]').click();await page.waitForFunction(()=>AtlasFlybyFXEditor.state.time>.1);await page.locator('[data-action="play"]').click();
  const frame=()=>page.evaluate(()=>{const s=AtlasFlybyFXEditor.state;return {time:s.time,pixels:s.composer.planes.map(p=>p.canvas.toDataURL())};});const frozen=await frame();await page.waitForTimeout(150);expect(await frame()).toEqual(frozen);
  await page.locator('[data-action="restart"]').click();await expect(page.locator('[data-action="play"]')).toHaveText('Pause');await page.locator('[data-action="stop"]').click();expect((await frame()).time).toBe(0);
 }finally{await page.close();if(original)fs.writeFileSync(sidecar,original);else if(fs.existsSync(sidecar))fs.unlinkSync(sidecar);}
});

for(const mode of ['illustrated','cinematic'])test(`new presets use the ${mode} flyby composition, clock, transforms and cleanup`,async({page,browserName})=>{
 const gpu=mode==='cinematic'&&browserName==='chromium'&&process.env.ATLAS_WEBGPU_QA==='1';
 if(gpu)await page.addInitScript(()=>{window.newPresetUploads=0;const copy=GPUQueue.prototype.copyExternalImageToTexture;GPUQueue.prototype.copyExternalImageToTexture=function(source,...args){if(source.source?.hasAttribute?.('data-flyby-fx-canvas'))newPresetUploads++;return copy.call(this,source,...args);};});
 const doc=rig();await page.route('**/arc_snitch/fx.json',r=>r.fulfill({json:doc}));await bootEditorTest(page,base+'/?dev=editor');
 await page.evaluate(async({sprite,mode})=>{
  await window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});
  const c={...window.eval('level').ambientFlybys[0],id:'new-fx-test',frameA:sprite,frameB:null,sound:'',soundTriggers:[],path:[{x:600,y:250},{x:1200,y:400}],scale:.35,speed:60,mirrorX:true,faceFlightDirection:false,rotateAlongPath:true,maxRotationDeg:20,depthOcclusion:false};delete c.frames;delete c.playback;
  await window.eval('setLevelAmbientFlybys')([c]);window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();window.eval('ambientFlybyRuntime').preview(c.id);
 },{sprite,mode});
 await page.waitForFunction(()=>window.eval('ambientFlybyRuntime').active.get('new-fx-test')?.elapsed>.2);
 if(gpu)await expect.poll(()=>page.evaluate(()=>newPresetUploads)).toBeGreaterThan(0);
 const snapshot=()=>page.evaluate(()=>{const i=window.eval('ambientFlybyRuntime').active.get('new-fx-test');return {time:i.elapsed,pixels:i.fx.planes.map(p=>p.canvas.toDataURL())};});
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').togglePreview('new-fx-test'));const paused=await snapshot();await page.waitForTimeout(150);expect(await snapshot()).toEqual(paused);
 expect(await page.locator('[data-ambient-flyby="new-fx-test"]').evaluate(n=>n.style.transform)).toContain('scaleX(-1)');
 const match=await page.evaluate(doc=>{const i=window.eval('ambientFlybyRuntime').active.get('new-fx-test'),fx=AtlasFlybyFX.create(doc,{quality:i.fx.quality});i.fx.draw(i.elapsed,true);fx.draw(i.elapsed,true);const same=fx.planes.every((p,k)=>p.canvas.toDataURL()===i.fx.planes[k].canvas.toDataURL());fx.dispose();return same;},doc);expect(match).toBe(true);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').togglePreview('new-fx-test'));await expect.poll(async()=>(await snapshot()).time).toBeGreaterThan(paused.time);
 // The shared FX cadence can skip the first sub-frame after Resume even
 // though the flight clock has advanced. Wait for an actual new FX frame.
 await expect.poll(async()=>(await snapshot()).pixels.some((png,i)=>png!==paused.pixels[i])).toBe(true);
 expect(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),planes=r.active.get('new-fx-test').fx.planes;r.releaseLevel();return {active:r.active.size,pixels:planes.reduce((n,p)=>n+p.canvas.width*p.canvas.height,0)};})).toEqual({active:0,pixels:0});
});
