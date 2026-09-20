const { test, expect } = require('@playwright/test');
const fs = require('fs'), path = require('path'), vm = require('vm');
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
const image = 'assets/ambient/flybys/arc_wasp/awc_wasp.png';
const sound = 'assets/ambient/flybys/arc_wasp/arc_wasp.mp3';
const config = {id:'testWasp',label:'ARC Wasp',frameA:image,frameB:null,sound,path:[{x:400,y:160},{x:900,y:160}],scale:0.2,speed:1,flapFrequencyHz:0,faceFlightDirection:true,mirrorX:false,intervalMinMs:60000,intervalMaxMs:60000,syncKey:'',startDelayMs:0,softness:0,saturation:1,soundVolume:0.6,rotateAlongPath:false,maxRotationDeg:0,soundTrigger:'tap'};
async function setup(page, trigger = 'tap') {
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base);
 await page.evaluate(async c=>{
  await window.eval('selectLevel')('LVL-0032',{startImmediately:true});
  window.eval('level').ambientFlybys=[c];
  await window.eval('ambientFlybyRuntime').prepareLevel(window.eval('level'));
  window.eval('audioState').unlocked=true;
  window.eval('render')();
 }, {...config,soundTrigger:trigger});
 await expect.poll(()=>page.evaluate(()=>window.eval('ambientFlybyRuntime').readiness.get('LVL-0032:testWasp')?.sound)).toBe(true);
}
test('single-frame ARC Wasp discovery and unmodified transparent/audio assets decode',async({page})=>{
 await page.goto(base);
 const result=await page.evaluate(async ({image,sound})=>{
  const discovery=await (await fetch('/__dev/levels/LVL-0032/ambient-assets')).json();
  const img=await window.eval('assetCache').image(image);
  const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;
  const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);
  const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
  const audio=await window.eval('assetCache').sound(sound);
  return {entry:discovery.flybys.find(x=>x.key==='flybys/arc_wasp'),width:img.naturalWidth,height:img.naturalHeight,transparent:pixels.some((v,i)=>i%4===3&&v===0),opaque:pixels.some((v,i)=>i%4===3&&v>0),audioReady:audio.readyState,duration:audio.duration};
 },{image,sound});
 expect(result.entry).toMatchObject({frameA:image,frameB:null,sound});
 expect(result.width).toBeGreaterThan(0);expect(result.height).toBeGreaterThan(0);
 expect(result.transparent).toBe(true);expect(result.opaque).toBe(true);
 expect(result.audioReady).toBeGreaterThanOrEqual(2);expect(result.duration).toBeGreaterThan(0);
});
test('tap-only slow flyby uses bounded mouse/touch input, master volume and lifecycle cleanup',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await setup(page);
 await page.evaluate(()=>{
  window.flybyPlays=[];const play=HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play=function(){if(this.src.includes('arc_wasp.mp3'))window.flybyPlays.push(this);return play.call(this);};
  window.eval('audioConfig').volumes.master=0.5;
  window.eval('ambientFlybyRuntime').preview('testWasp');
 });
 const shell=page.locator('[data-ambient-flyby="testWasp"]');
 await expect(shell.locator('img')).toHaveCount(1);
 await expect(shell.locator('.ambientFlybyFrameB')).toHaveCount(0);
 await expect(shell).toHaveAttribute('data-active','true');
 await expect.poll(()=>shell.evaluate(n=>n.getBoundingClientRect().x)).toBeGreaterThan(0);
 expect(await page.evaluate(()=>window.flybyPlays.length)).toBe(0);
 const before=await page.evaluate(()=>({x:window.eval('state.worldX'),d:window.eval('ambientFlybyRuntime').active.get('testWasp').distance}));
 // Coordinate clicks/taps avoid requiring a moving element to become stationary.
 const click=async()=>{const b=await shell.boundingBox();const x=b.x+b.width/2,y=b.y+b.height/2;if(info.project.name.startsWith('ipad'))await page.touchscreen.tap(x,y);else await page.mouse.click(x,y);};
 await click();await click();
 expect(await page.evaluate(()=>window.flybyPlays.length)).toBe(1);
 expect(await page.evaluate(()=>window.flybyPlays[0].volume)).toBeCloseTo(0.3);
 expect(await page.evaluate(()=>window.eval('state.worldX'))).toBe(before.x);
 await page.evaluate(()=>{window.eval('audioConfig').volumes.master=0;});
 await expect.poll(()=>page.evaluate(()=>window.flybyPlays[0].volume)).toBe(0);
 const size=await shell.evaluate(n=>{const r=n.getBoundingClientRect(),img=n.querySelector('img');return {ratio:r.width/r.height,natural:img.naturalWidth/img.naturalHeight};});
 expect(size.ratio).toBeCloseTo(size.natural,5);
 await expect(shell).toHaveCSS('opacity','1');
 await page.screenshot({path:info.outputPath('slow-wasp.png')});
 const b=await shell.boundingBox();await page.mouse.click(b.x+b.width+15,b.y+b.height/2);
 expect(await page.evaluate(()=>window.flybyPlays.length)).toBe(1);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').stopAll());
 await expect(shell).toHaveAttribute('data-active','false');
 expect(await shell.evaluate(n=>getComputedStyle(n).pointerEvents)).toBe('none');
 expect(await page.evaluate(()=>window.flybyPlays[0].paused)).toBe(true);
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').tap('testWasp'))).toBe(false);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').preview('testWasp'));
 await expect(shell).toHaveAttribute('data-active','true');await click();
 expect(await page.evaluate(()=>window.flybyPlays.length)).toBe(2);
 await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');r.active.get('testWasp').distance=r.cacheFor(window.eval('level').ambientFlybys[0]).totalLength;});
 await expect(shell).toHaveAttribute('data-active','false');
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').preview('testWasp'));
 await expect(shell).toHaveAttribute('data-active','true');await click();
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
 await expect(shell).toHaveAttribute('data-active','false');
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
 await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
 await page.evaluate(()=>window.eval('returnToMenu')());
 await expect(shell).toHaveCount(0);
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
 expect(errors).toEqual([]);
});
test('synchronized legacy audio still deduplicates and fades; tap members stay silent',async({page})=>{
 await setup(page,'during');
 const result=await page.evaluate(async()=>{
  const l=window.eval('level'),r=window.eval('ambientFlybyRuntime'),c=l.ambientFlybys[0];
  c.syncKey='pair';delete c.soundTrigger;
  l.ambientFlybys.push({...c,id:'second',soundVolume:0.8},{...c,id:'silent',soundTrigger:'tap'});
  await r.prepareLevel(l);window.eval('render')();
  // All members use the already decoded same audio path.
  await Promise.resolve();r.previewSync('pair');
  return {audio:r.activeAudio.size,volume:[...r.activeAudio.values()][0].maxVolume,envelope:[0,.1,.5,.9,1].map(window.AtlasAmbientSystem.volumeEnvelope)};
 });
 expect(result.audio).toBe(1);expect(result.volume).toBe(0.8);
 expect(result.envelope).toEqual([0,0.5,1,expect.closeTo(0.5,8),0]);
});
for(const trigger of [undefined,'during'])test(`automatic sound retains legacy trigger timing: ${trigger}`,async({page})=>{
 await setup(page,trigger);
 if(trigger===undefined)await page.evaluate(()=>delete window.eval('level').ambientFlybys[0].soundTrigger);
 const state=await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');r.preview('testWasp');return {audio:r.activeAudio.size,speed:window.eval('level').ambientFlybys[0].speed};});
 expect(state).toEqual({audio:1,speed:1});
});
test('actual runtime integrates slow and normal speeds consistently at 30/60/120 Hz',async()=>{
 const simulate=async(speed,fps)=>{
  let raf;const shell={dataset:{},style:{}};const window={AtlasAmbientSystem:null,matchMedia:()=>({matches:false}),setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:fn=>(raf=fn,1),cancelAnimationFrame(){}};
  const level={id:'unit',world:{width:1000,height:500},ambientFlybys:[{...config,speed,sound:'',path:[{x:0,y:100},{x:10000,y:100}]}]};
  const document={hidden:false,querySelector:selector=>selector==='.worldTrack'?{getBoundingClientRect:()=>({width:1000,height:500})}:shell};
  vm.runInNewContext(fs.readFileSync('src/ambient-system.js','utf8'),{window,document,CSS:{escape:x=>x}});
  const runtime=window.AtlasAmbientSystem.createFlybyRuntime({getLevel:()=>level,getScreen:()=> 'scene',assetCache:{image:async()=>({}),normalize:x=>x}});
  await runtime.prepareLevel(level);runtime.preview('testWasp');raf(100);
  let previous=0;for(let i=1;i<=fps*2;i++){raf(100+i*1000/fps);const d=runtime.active.get('testWasp').distance;expect(d).toBeGreaterThan(previous);previous=d;}
  runtime.stopAll();return previous;
 };
 for(const speed of [1,20,820])for(const fps of [30,60,120])expect(await simulate(speed,fps)).toBeCloseTo(speed*2,8);
});
test('editor can add single-frame Wasp and Apply/reload slow tap settings',async({page})=>{
 const levelFile=path.resolve('Levels/LVL-0016/level.js'),draftFile=path.resolve('Levels/LVL-0016/editor.draft.json');
 const original=fs.readFileSync(levelFile),draft=fs.existsSync(draftFile)?fs.readFileSync(draftFile):null;
 try{
  await page.goto(base+'/?dev=editor');
  await page.evaluate(()=>window.eval('selectLevel')('LVL-0016',{startImmediately:true}));
  await page.keyboard.press('Control+Shift+D');
  await page.getByRole('button',{name:'Graphics',exact:true}).click();
  await page.locator('summary').filter({hasText:/^Add ambient flyby$/}).click();
  const form=page.locator('[data-add-flyby-form]');
  await form.locator('[name="assetSet"]').selectOption('flybys/common-swift');
  await expect(form.locator('[name="frameA"]')).toHaveValue('assets/ambient/flybys/common-swift/common-swift-a.png');
  await expect(form.locator('[name="frameB"]')).toHaveValue('assets/ambient/flybys/common-swift/common-swift-b.png');
  await expect(form.locator('[name="sound"]')).toHaveValue('assets/ambient/flybys/common-swift/common-swift-call.mp3');
  await form.locator('[name="assetSet"]').selectOption('flybys/arc_wasp');
  await expect(form.locator('[name="frameA"]')).toHaveValue(image);
  await expect(form.locator('[name="frameB"]')).toHaveValue('');
  await expect(form.locator('[name="frameB"]')).toBeDisabled();
  await expect(form.locator('[name="frameB"] option:checked')).toHaveText('N/A');
  await expect(form.locator('[name="sound"]')).toHaveValue(sound);
  await form.locator('[name="id"]').fill('testWasp');await form.locator('[name="label"]').fill('ARC Wasp');
  await form.locator('[data-debug-action="add-flyby"]').click();
  const speed=page.locator('[data-flyby-id="testWasp"][data-flyby-setting="speed"]');
  await expect(speed).toHaveAttribute('min','1');await speed.fill('1');await speed.dispatchEvent('change');
  await page.locator('[data-flyby-editor-id="testWasp"] summary').filter({hasText:/^Audio$/}).click();
  await page.locator('[data-flyby-id="testWasp"][data-flyby-setting="soundTrigger"]').selectOption('tap');
  await page.getByRole('button',{name:'Apply',exact:true}).click();
  await expect(page.getByText('Draft Status: Applied',{exact:true})).toBeVisible();
  await page.reload();await page.evaluate(()=>window.eval('selectLevel')('LVL-0016',{startImmediately:true}));
  expect(await page.evaluate(()=>window.eval('level').ambientFlybys.find(x=>x.id==='testWasp'))).toMatchObject({speed:1,soundTrigger:'tap',frameA:image,frameB:null,sound});
 }finally{fs.writeFileSync(levelFile,original);if(draft===null){if(fs.existsSync(draftFile))fs.unlinkSync(draftFile);}else fs.writeFileSync(draftFile,draft);}
});

