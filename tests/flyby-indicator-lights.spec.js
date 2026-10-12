const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path'),vm=require('vm');
const {bootEditorTest}=require('./editor-workspace-helpers');
const root=path.join(__dirname,'..'),base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
require('./editor-draft-fixture').preserveEditorDrafts(test,root);
const ids=['blue-light','green-light','orange-light','red-light'];
const sprite='assets/ambient/flybys/arc_snitch/arc_snitch.png',sidecar=path.join(root,'assets/ambient/flybys/arc_snitch/fx.json');
const scope={window:{AtlasAmbientSystem:require('../src/ambient-system')}};
for(const name of ['scene-effects','flyby-fx'])vm.runInNewContext(fs.readFileSync(path.join(root,'src',name+'.js'),'utf8'),scope);
const E=scope.window.AtlasSceneEffects,F=scope.window.AtlasFlybyFX;
function rig(){const doc=F.empty(sprite,501,282);for(const [i,id] of ids.entries()){const e=E.defaultInstance(id,null,doc.sourceSize,i);delete e.layerSlot;delete e.groupId;e.seed=53;e.plane=i%2?'behind':'front';Object.assign(e.geometry,{x:200+i*30,y:150,width:36,height:16,directionDeg:i*20});e.overrides={pulseAmount:.3};doc.effects.push(e);}return JSON.parse(JSON.stringify(doc));}

test('indicator V1 presets validate shapes, dimensions and independent colors',()=>{
 const doc=rig();expect(F.validate(doc,sprite,doc.sourceSize)).toEqual([]);
 expect(ids.map(id=>E.presetById(id).name)).toEqual(['Blue Light','Green Light','Orange Light','Red Light']);
 for(const e of doc.effects){
  expect(F.PRESETS).toContain(e.presetId);expect(E.presetById(e.presetId).hiddenFromLibrary).toBe(true);
  for(const lightShape of ['round','square','oval']){e.overrides.lightShape=lightShape;expect(F.validate(doc,sprite,doc.sourceSize)).toEqual([]);}
  const glow=E.resolve(e,{}).glowColor;e.overrides.primaryColor='#112233';expect(E.resolve(e,{}).glowColor).toBe(glow);
  e.overrides.glowColor='#445566';expect(E.resolve(e,{}).primaryColor).toBe('#112233');
 }
 for(const [group,key,value] of [['overrides','lightShape','triangle'],['overrides','glowRadius',161],['overrides','pulseAmount',2],['geometry','height',0],['geometry','width',801],['geometry','directionDeg',361],['geometry','directionDeg',null]]){
  const invalid=structuredClone(doc);invalid.effects[0][group][key]=value;expect(F.validate(invalid,sprite,doc.sourceSize).length).toBeGreaterThan(0);
 }
});

test('indicator shapes have colored cores, smooth clear halos and unclipped rotated bounds',async({page},info)=>{
 await bootEditorTest(page,base+'/?dev=editor');
 const results=await page.evaluate(({doc,ids})=>{
  const F=AtlasFlybyFX,E=AtlasSceneEffects,results=[];
  const sheet=document.createElement('canvas');sheet.width=960;sheet.height=640;sheet.style='position:fixed;inset:0;z-index:99999;width:960px;height:640px';document.body.append(sheet);
  const c=sheet.getContext('2d');c.fillStyle='#1c2c3b';c.fillRect(0,0,960,640);c.font='18px sans-serif';c.fillStyle='#fff';c.fillText('Indicator lights · 100% and 35% flyby scale',24,32);
  for(const [i,id] of ids.entries())for(const [j,shape] of ['round','square','oval'].entries()){
   const e=structuredClone(doc.effects[i]);Object.assign(e.geometry,{x:0,y:0,width:36,height:16});e.overrides={lightShape:shape,pulseAmount:0};
   let outside=0;const pngs=[];
   for(const angle of [0,45,90,137]){
    e.geometry.directionDeg=angle;const r=E.resolve(e,{}),box=F.bounds(r),canvas=document.createElement('canvas');canvas.width=box.width+32;canvas.height=box.height+32;
    const ctx=canvas.getContext('2d');ctx.translate(16-box.x,16-box.y);E.drawResolved(ctx,r,0);const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
    for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++)if(x<18||y<18||x>=canvas.width-18||y>=canvas.height-18)outside+=pixels[(y*canvas.width+x)*4+3];
    pngs.push(canvas.toDataURL());canvas.width=canvas.height=0;
   }
   e.geometry.directionDeg=0;const fx=F.create({...doc,effects:[e]},{reducedMotion:false});fx.draw(0,true);const p=fx.planes.find(p=>p.items.length),ctx=p.canvas.getContext('2d');
   const sample=(x,y)=>Array.from(ctx.getImageData(Math.round(x-p.box.x),Math.round(y-p.box.y),1,1).data);
   const center=sample(0,0),corner=sample(15,6),tail=Array.from({length:22},(_,k)=>sample(25+k,0)[3]);
   for(const [scale,dx] of [[1,0],[.35,105]]){c.save();c.translate(95+j*310+dx,125+i*145);c.scale(scale,scale);c.drawImage(p.canvas,p.box.x,p.box.y);c.restore();}
   c.fillStyle='#fff';c.fillText(E.presetById(id).name+' · '+shape,25+j*310,185+i*145);
   const tiny=document.createElement('canvas');tiny.width=tiny.height=60;const tc=tiny.getContext('2d');tc.translate(30,30);tc.scale(.35,.35);tc.drawImage(p.canvas,p.box.x,p.box.y);
   results.push({id,shape,outside,center,corner,rotates:pngs[0]!==pngs[2],tailEnd:tail.at(-1),maxStep:Math.max(...tail.slice(1).map((v,k)=>Math.abs(v-tail[k]))),tiny:tc.getImageData(30,30,1,1).data[3]});fx.dispose();
  }
  // Complete transparency, deterministic pulse and reduced motion share the normal renderer.
  const e=doc.effects[0],capture=(time,reducedMotion=false)=>{const fx=F.create({...doc,effects:[e]},{reducedMotion});fx.draw(time,true);const p=fx.planes.find(p=>p.items.length),png=p.canvas.toDataURL(),mass=p.canvas.getContext('2d').getImageData(0,0,p.canvas.width,p.canvas.height).data.filter((_,i)=>i%4===3).reduce((a,b)=>a+b,0);fx.dispose();return {png,mass};};
  const a=capture(0),b=capture(.6),same=capture(0),reduced=capture(0,true);e.overrides.opacity=0;const invisible=capture(0);e.overrides.opacity=1;e.overrides.intensity=0;const dark=capture(0);
  e.overrides.intensity=1;e.mask={includes:[],cutouts:[[{x:190,y:140},{x:210,y:140},{x:210,y:160},{x:190,y:160}]]};
  const masked=F.create({...doc,effects:[e]}),p=masked.planes.find(p=>p.items.length);masked.draw(0,true);
  const maskedAlpha=p.canvas.getContext('2d').getImageData(200-p.box.x,150-p.box.y,1,1).data[3],maskCanvas=p.items[0]._maskCanvas;masked.dispose();
  return {results,pulse:a.png!==b.png,deterministic:a.png===same.png,reduced:reduced.png!==a.png,invisible:invisible.mass,dark:dark.mass,maskedAlpha,maskReleased:maskCanvas.width===0&&maskCanvas.height===0};
 },{doc:rig(),ids});
 for(const r of results.results){expect(r.outside).toBe(0);expect(r.center[3]).toBeGreaterThan(220);expect(r.tiny).toBeGreaterThan(150);expect(r.tailEnd).toBe(0);expect(r.maxStep).toBeLessThan(12);if(r.shape!=='round')expect(r.rotates).toBe(true);}
 for(const id of ids){const shapes=results.results.filter(r=>r.id===id);expect(shapes[1].corner[3]).toBeGreaterThan(shapes[2].corner[3]);}
 const colors=results.results.filter(r=>r.shape==='square').map(r=>r.center);expect(colors[0][2]).toBeGreaterThan(colors[0][0]);expect(colors[1][1]).toBeGreaterThan(colors[1][0]);expect(colors[2][0]).toBeGreaterThan(colors[2][2]);expect(colors[3][0]).toBeGreaterThan(colors[3][1]);
 expect(results.pulse).toBe(true);expect(results.deterministic).toBe(true);expect(results.reduced).toBe(true);expect(results.invisible).toBe(0);expect(results.dark).toBe(0);
 expect(results.maskedAlpha).toBe(0);expect(results.maskReleased).toBe(true);
 await page.screenshot({path:info.outputPath('indicator-lights.png')});
});

test('indicator inspector rotates with existing handles and preserves Save/Revert and duplication',async({page})=>{
 const original=fs.existsSync(sidecar)?fs.readFileSync(sidecar):null;
 const shredder=fs.readFileSync(path.join(root,'assets/ambient/flybys/shredder/fx.json'));
 try{
  await bootEditorTest(page,base+'/?dev=editor');await page.keyboard.press('Control+Shift+D');await page.getByRole('button',{name:'FX Editing',exact:true}).click();await expect(page.locator('[data-dimensions]')).toContainText('407');
  await page.locator('[data-asset]').selectOption('flybys/arc_snitch');await expect(page.locator('[data-dimensions]')).toHaveText('501 × 282 source pixels');
  while(await page.locator('[data-effects] li').count())await page.locator('[data-action="delete"]').click();
  for(const id of ids){await page.locator('[data-preset]').selectOption(id);await page.locator('[data-action="add"]').click();}
  await page.locator('[data-scale]').selectOption('1');await page.getByRole('spinbutton',{name:'Width',exact:true}).fill('60');await page.getByRole('spinbutton',{name:'Height',exact:true}).fill('20');
  for(const shape of ['square','oval']){
   await page.getByRole('combobox',{name:'Shape',exact:true}).selectOption(shape);
   // WebKit delivers integer mouse coordinates. Align the test camera's
   // center column to that grid so a vertical drag really means exactly 90°.
   await page.evaluate(()=>{const s=AtlasFlybyFXEditor.state,e=s.document.effects.find(e=>e.id===s.selected),m=document.querySelector('[data-guide-transform]').getScreenCTM(),p=new DOMPoint(e.geometry.x,e.geometry.y).matrixTransform(m);s.x+=Math.round(p.x)-p.x;});
   await page.getByRole('spinbutton',{name:'Rotation',exact:true}).fill('0');
   const handle=page.locator('.fxSelected [data-handle="direction"]'),box=await handle.boundingBox();
   const end=await page.evaluate(()=>{const s=AtlasFlybyFXEditor.state,e=s.document.effects.find(e=>e.id===s.selected),m=document.querySelector('[data-guide-transform]').getScreenCTM();return new DOMPoint(e.geometry.x,e.geometry.y+90).matrixTransform(m).toJSON();});
   await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(end.x,end.y);await page.mouse.up();
   expect(Number(await page.getByRole('spinbutton',{name:'Rotation',exact:true}).inputValue())).toBeCloseTo(90,1);
   await expect(page.getByRole('spinbutton',{name:'Width',exact:true})).toHaveValue('60');await expect(page.getByRole('spinbutton',{name:'Height',exact:true})).toHaveValue('20');await page.locator('[data-mirror]').check();
  }
  await page.getByRole('spinbutton',{name:'Rotation',exact:true}).fill('37');await page.locator('[data-property="overrides.primaryColor"]').fill('#00ccff');await page.locator('[data-property="overrides.glowColor"]').fill('#5533ff');
  await page.locator('[data-action="duplicate"]').click();await page.locator('[data-property="plane"]').selectOption('behind');await page.locator('[data-action="up"]').click();
  const authored=await page.evaluate(()=>AtlasFlybyFXEditor.state.document);expect(authored.effects.every(e=>!Object.hasOwn(e.geometry,'length'))).toBe(true);
  await page.locator('[data-action="save"]').click();await expect(page.locator('[data-status]')).toHaveText('Saved');expect(JSON.parse(fs.readFileSync(sidecar))).toEqual(authored);
  await page.getByRole('combobox',{name:'Shape',exact:true}).selectOption('round');await expect(page.getByRole('spinbutton',{name:'Height',exact:true})).toHaveCount(0);
  await page.locator('[data-action="revert"]').click();await page.locator('[data-choice="discard"]').click();await expect(page.locator('[data-status]')).toHaveText('Saved');expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.document)).toEqual(authored);
  expect(fs.readFileSync(path.join(root,'assets/ambient/flybys/shredder/fx.json')).equals(shredder)).toBe(true);
 }finally{await page.close();if(original)fs.writeFileSync(sidecar,original);else if(fs.existsSync(sidecar))fs.unlinkSync(sidecar);}
});

for(const mode of ['illustrated','cinematic'])test(`indicator ${mode} runtime matches preview under movement, mirroring and pause`,async({page})=>{
 const doc=rig();await page.route('**/arc_snitch/fx.json',r=>r.fulfill({json:doc}));await bootEditorTest(page,base+'/?dev=editor');
 await page.evaluate(async({sprite,mode})=>{
  await window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});
  const c={...window.eval('level').ambientFlybys[0],id:'indicator-test',frameA:sprite,frameB:null,sound:'',soundTriggers:[],path:[{x:600,y:250},{x:1200,y:400}],scale:.35,speed:60,mirrorX:true,faceFlightDirection:false,rotateAlongPath:true,maxRotationDeg:20,depthOcclusion:false};delete c.frames;delete c.playback;
  await window.eval('setLevelAmbientFlybys')([c]);window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();window.eval('ambientFlybyRuntime').preview(c.id);
 },{sprite,mode});
 await page.waitForFunction(()=>window.eval('ambientFlybyRuntime').active.get('indicator-test')?.elapsed>.2);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').togglePreview('indicator-test'));
 const snapshot=()=>page.evaluate(()=>{const i=window.eval('ambientFlybyRuntime').active.get('indicator-test');return {time:i.elapsed,pixels:i.fx.planes.map(p=>p.canvas.toDataURL())};});
 const paused=await snapshot();await page.waitForTimeout(150);expect(await snapshot()).toEqual(paused);
 expect(await page.locator('[data-ambient-flyby="indicator-test"]').evaluate(n=>n.style.transform)).toContain('scaleX(-1)');
 expect(await page.evaluate(doc=>{const i=window.eval('ambientFlybyRuntime').active.get('indicator-test'),fx=AtlasFlybyFX.create(doc,{quality:i.fx.quality});i.fx.draw(i.elapsed,true);fx.draw(i.elapsed,true);const same=fx.planes.every((p,k)=>p.canvas.toDataURL()===i.fx.planes[k].canvas.toDataURL());fx.dispose();return same;},doc)).toBe(true);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').togglePreview('indicator-test'));await expect.poll(async()=>(await snapshot()).pixels).not.toEqual(paused.pixels);
 expect(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),planes=r.active.get('indicator-test').fx.planes;r.releaseLevel();return {active:r.active.size,pixels:planes.reduce((n,p)=>n+p.canvas.width*p.canvas.height,0)};})).toEqual({active:0,pixels:0});
});
