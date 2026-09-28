const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
const read=page=>page.evaluate(()=>window.eval('challengeFx').snapshot());
async function start(page){await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));await page.goto(base+'/?dev=editor&level=LVL-0001');await expect(page.locator('[data-actor="sven"]')).toBeVisible();}
async function menu(page){await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-challenge-fx-controls] summary').click();}
async function choose(page,mode){await menu(page);await page.locator('[data-challenge-fx="mode"]').selectOption(mode);await page.locator('[data-graphics-action="close"]').click();}
async function solve(page,id){
 await page.evaluate(id=>{const r=window.eval('runeById')(id),p=window.eval('getApproachPoint')(r),s=window.eval('state');s.worldX=p.x;s.worldY=p.y;window.eval('updateWorldDom')();window.eval('openRuneChallenge')(id);},id);
 const count=await page.evaluate(()=>window.eval('currentChallengeQuestions')().length);expect(count).toBeGreaterThan(0);
 for(let i=0;i<count;i++){const answer=await page.evaluate(()=>String(window.eval('answerFor')(window.eval('currentChallengeQuestions')()[window.eval('state').questionIndex])));
  if(await page.locator('[data-open-answer]').count()){await page.locator('[data-open-answer]').fill(answer);await page.locator('[data-open-answer]').press('Enter');}else await page.locator(`[data-choice="${answer}"]`).click();
  await expect(page.locator('[data-action="next-question"]')).toBeVisible();await page.locator('[data-action="next-question"]').press('Enter');
 }
}
test('three choices, compact controls, persisted tuning and honest unsupported fallback',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(navigator,'gpu',{value:undefined,configurable:true}));await start(page);
 expect((await read(page)).mode).toBe('legacy');await choose(page,'webgpu');
 await expect.poll(async()=>(await read(page)).gpu.status).toContain('Canvas fallback');
 await menu(page);await expect(page.locator('[data-challenge-fx]')).toHaveCount(7);
 await page.locator('[data-challenge-fx="renderer.goldParticles"]').fill('2');await page.reload();
 expect((await read(page)).mode).toBe('webgpu');expect(await page.evaluate(()=>window.eval('voxelRenderer').getSettings().challengeFx.renderer.goldParticles)).toBe(2);
 await choose(page,'canvas');expect((await read(page)).mode).toBe('canvas');await choose(page,'legacy');await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
 const migrated=await page.evaluate(()=>[window.AtlasChallengeFx.normalize({enabled:true}).mode,window.AtlasChallengeFx.normalize({enabled:false}).mode]);expect(migrated).toEqual(['canvas','legacy']);
});
test('native stardust replaces cues, transfers real completions without absorb, and releases GPU',async({page,browserName},info)=>{
 test.skip(browserName!=='chromium','Native WebGPU is exercised in Chromium.');
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await start(page);await choose(page,'webgpu');
 await expect.poll(async()=>(await read(page)).gpu.frames||0).toBeGreaterThan(3);
 expect((await read(page)).gpu.error).toBeNull();expect((await read(page)).markers).toEqual(['zon','steen']);
 await menu(page);await page.screenshot({path:info.outputPath('stardust-graphics-controls.png')});await page.locator('[data-graphics-action="close"]').click();
 await page.evaluate(()=>{const p=window.eval('getApproachPoint')(window.eval('runeById')('zon')),s=window.eval('state');s.worldX=p.x;s.worldY=p.y;window.eval('updateWorldDom')();});
 await expect(page.locator('[data-rune="zon"]')).toHaveAttribute('data-hotspot-cue','none');
 const ink=await page.locator('[data-challenge-fx-canvas]').evaluate(c=>c.getContext('2d').getImageData(0,0,c.width,c.height).data.some((v,i)=>i%4===3&&v>0));expect(ink).toBe(true);
 await page.screenshot({path:info.outputPath('runenpoort-stardust.png')});
 await solve(page,'zon');let snap=await read(page);expect(snap.sequence.runeId).toBe('zon');expect(snap.markers).not.toContain('zon');
 await page.evaluate(()=>{window.eval('state').worldX+=35;window.eval('updateWorldDom')();});
 await expect.poll(async()=>(await read(page)).sequence?.target[0]).toBeGreaterThan(snap.sequence.target[0]);
 await expect.poll(async()=>(await read(page)).audioStarts).toBe(1);await page.screenshot({path:info.outputPath('stardust-transfer.png')});
 await expect.poll(async()=>(await read(page)).sequence?.age||0).toBeGreaterThan(1.7);expect((await read(page)).sequence.absorbing).toBe(false);
 await expect.poll(async()=>(await read(page)).sequence).toBeNull();expect((await read(page)).markers).not.toContain('zon');
 await page.screenshot({path:info.outputPath('after-transfer.png')});
 await page.setViewportSize({width:1180,height:734});await expect.poll(async()=>(await read(page)).gpu.frames).toBeGreaterThan(10);
 const size=(await read(page)).gpu.dimensions;expect(size[0]*size[1]).toBeLessThanOrEqual(8000000);
 await choose(page,'canvas');expect((await read(page)).gpu.targets||0).toBe(0);await choose(page,'webgpu');await expect.poll(async()=>(await read(page)).gpu.frames||0).toBeGreaterThan(2);
 await page.evaluate(()=>window.eval('returnToMenu')());expect((await read(page)).gpu.targets||0).toBe(0);expect(errors).toEqual([]);
});
test('Freya has no idle motes but transfers from her live torso; exit remains ready',async({page,browserName},info)=>{
 test.skip(browserName!=='chromium','Native WebGPU is exercised in Chromium.');await start(page);
 await page.evaluate(()=>{for(const r of window.eval('activeRunes')())if(r.id!=='wind')window.eval('state').completedRunes.add(r.id);window.eval('render')();});
 await choose(page,'webgpu');await expect.poll(async()=>(await read(page)).gpu.frames||0).toBeGreaterThan(2);expect((await read(page)).markers).toEqual([]);
 expect((await page.evaluate(()=>window.eval('challengeFx').readGPU())).lit).toBe(0);
 await solve(page,'wind');expect((await read(page)).sequence.releaseMarker).toBe(false);await expect.poll(async()=>(await read(page)).audioStarts).toBe(1);
 await page.screenshot({path:info.outputPath('freya-transfer.png')});await expect.poll(async()=>(await read(page)).sequence).toBeNull();expect((await read(page)).exit).toBe(true);
 await page.waitForTimeout(500);expect((await page.evaluate(()=>window.eval('challengeFx').readGPU())).lit).toBeGreaterThan(1000);await page.screenshot({path:info.outputPath('exit-stardust.png')});
});

test('native stardust is masked by Sven alpha and device loss falls back without breaking play',async({page,browserName})=>{
 test.skip(browserName!=='chromium','Native WebGPU is exercised in Chromium.');
 await page.addInitScript(()=>{const request=GPUAdapter.prototype.requestDevice;GPUAdapter.prototype.requestDevice=async function(...args){const device=await Reflect.apply(request,this,args);window.lastFxDevice=device;return device;};});
 await start(page);
 await page.evaluate(async()=>{
  const {createRuntime}=await import('/src/challenge-stardust/runtime.js');window.maskRuntime=createRuntime(()=>{});
  const world=window.eval('level').world,img=document.querySelector('[data-actor="sven"]'),r=img.getBoundingClientRect(),track=document.querySelector('.worldTrack').getBoundingClientRect();
  const o={image:img,x:(r.left-track.left)*world.width/track.width,y:(r.top-track.top)*world.height/track.height,width:r.width*world.width/track.width,height:r.height*world.height/track.height};
  const x=o.x+o.width*.5,y=o.y+o.height*.55;
  window.maskScene={world,anchors:[{id:'mask-probe',x,y,idleMarker:true}],completed:new Set(),player:[x,y],exit:null,occluder:o};
  window.maskSettings=window.AtlasChallengeFx.settings({mode:'webgpu'});
 });
 await expect.poll(()=>page.evaluate(()=>window.maskRuntime.snapshot().status)).toContain('living stardust');
 const result=await page.evaluate(()=>{
  const scene=window.maskScene,{world,occluder:o}=scene;
  function surface(){const c=document.createElement('canvas');c.width=world.width;c.height=world.height;return c.getContext('2d');}
  const plain=surface(),masked=surface(),mask=surface();
  window.maskRuntime.paint(plain,window.maskSettings,{...scene,occluder:null},null,0);
  window.maskRuntime.paint(masked,window.maskSettings,scene,null,0);
  mask.drawImage(o.image,o.x,o.y,o.width,o.height);
  const a=plain.getImageData(0,0,world.width,world.height).data,b=masked.getImageData(0,0,world.width,world.height).data,m=mask.getImageData(0,0,world.width,world.height).data;
  let removed=0,leaked=0,outsideChanged=0;
  for(let i=3;i<a.length;i+=4){if(m[i]===255&&a[i]>20){removed++;if(b[i]>1)leaked++;}if(m[i]===0&&a[i]!==b[i])outsideChanged++;}
  window.maskRuntime.dispose();return {removed,leaked,outsideChanged};
 });
 expect(result.removed).toBeGreaterThan(10);expect(result.leaked).toBe(0);expect(result.outsideChanged).toBe(0);
 await choose(page,'webgpu');await expect.poll(async()=>(await read(page)).gpu.frames||0).toBeGreaterThan(2);
 await page.evaluate(()=>window.lastFxDevice.destroy());await expect.poll(async()=>(await read(page)).gpu.status).toContain('Canvas fallback');
 expect((await read(page)).enabled).toBe(true);expect((await read(page)).gpu.targets).toBe(0);await solve(page,'zon');expect((await read(page)).markers).not.toContain('zon');
});

test.describe('tablet density',()=>{
 test.use({viewport:{width:1180,height:734},deviceScaleFactor:2});
 test('DPR 2 bounds and independent cyan/gold populations respond live',async({page,browserName},info)=>{
  test.skip(browserName!=='chromium','Native WebGPU is exercised in Chromium.');
  await start(page);await choose(page,'webgpu');await expect.poll(async()=>(await read(page)).gpu.frames||0).toBeGreaterThan(2);
  const dimensions=(await read(page)).gpu.dimensions;
  expect(dimensions[0]*dimensions[1]).toBeLessThanOrEqual(8000000);
  expect(dimensions).toEqual(await page.locator('[data-challenge-fx-canvas]').evaluate(c=>[c.width,c.height]));
  await menu(page);
  const pixels=()=>page.evaluate(()=>window.eval('challengeFx').readGPU());
  await page.locator('[data-challenge-fx="renderer.cyanParticles"]').fill('0');
  await expect.poll(async()=>(await pixels()).cyanPixels).toBe(0);expect((await pixels()).goldPixels).toBeGreaterThan(100);
  await page.locator('[data-challenge-fx="renderer.goldParticles"]').fill('0');
  await expect.poll(async()=>(await pixels()).lit).toBe(0);
  await page.locator('[data-challenge-fx="renderer.cyanParticles"]').fill('1');
  await expect.poll(async()=>(await pixels()).cyanPixels).toBeGreaterThan(100);expect((await pixels()).goldPixels).toBe(0);
  await page.screenshot({path:info.outputPath('tablet-stardust-controls.png')});
 });
});
