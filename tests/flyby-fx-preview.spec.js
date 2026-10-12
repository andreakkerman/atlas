const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const {bootEditorTest}=require('./editor-workspace-helpers');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
const rigPath=path.join(__dirname,'../assets/ambient/flybys/shredder/fx.json');
test.beforeEach(async({page},info)=>{info.fxErrors=[];page.on('pageerror',e=>info.fxErrors.push(e.message));});
test.afterEach(async({},info)=>expect(info.fxErrors).toEqual([]));

async function open(page){
  await bootEditorTest(page,base+'/?dev=editor');
  await page.keyboard.press('Control+Shift+D');
  await page.getByRole('button',{name:'FX Editing',exact:true}).click();
  await expect(page.locator('[data-dimensions]')).toHaveText('407 × 543 source pixels');
  await stopped(page);
}
async function settings(page){if(await page.locator('.fxPreviewSettings').isHidden())await page.getByRole('button',{name:'Preview Settings',exact:true}).click();}
async function stopped(page){
  await expect(page.locator('[data-action="play"]')).toHaveText('Play');
  await expect(page.locator('[data-action="stop"]')).toBeDisabled();
  expect(await page.evaluate(()=>{const s=AtlasFlybyFXEditor.state;return {time:s.time,playing:s.playing,pose:s.pose,active:s.runtime.active.size,audio:s.runtime.activeAudio.size,timers:s.runtime.timers.size};})).toEqual({time:0,playing:false,pose:null,active:0,audio:0,timers:0});
}
async function audio(page){
  await expect.poll(()=>page.evaluate(()=>AtlasFlybyFXEditor.state.runtime.activeAudio.size)).toBe(1);
  await page.evaluate(()=>window.previewAudio=[...AtlasFlybyFXEditor.state.runtime.activeAudio.values()][0].audio);
  await expect.poll(()=>page.evaluate(()=>previewAudio.currentTime)).toBeGreaterThan(.05);
}
async function snapshot(page){return page.evaluate(()=>{
  const s=AtlasFlybyFXEditor.state,i=s.runtime.active.get('fx-workspace-preview');
  // Compare the animated surfaces, independently of toolbar/layout repainting
  // when Pause becomes Resume. Pose/distance below separately cover movement.
  let hash=2166136261;
  // PNG snapshots retain the native canvas backing mode; repeated getImageData
  // reads can make Chromium switch a GPU canvas to CPU rasterization mid-test.
  for(const {canvas,items} of s.composer.planes){if(!items.length)continue;const png=canvas.toDataURL();for(let n=0;n<png.length;n++)hash=Math.imul(hash^png.charCodeAt(n),16777619);}
  return {time:s.time,distance:i?.distance,pose:s.pose,audio:previewAudio.currentTime,pixels:hash};
});}
async function frozen(page){const before=await snapshot(page);await page.waitForTimeout(180);const after=await snapshot(page);expect(after.time).toBe(before.time);expect(after.distance).toBe(before.distance);expect(after.pose).toEqual(before.pose);expect(after.pixels).toBe(before.pixels);expect(after.audio).toBeCloseTo(before.audio,2);return before;}

test('opening and reopening the workspace shows a stable editing frame without attempting audio',async({page})=>{
  await page.addInitScript(()=>{window.flybyPlayCalls=0;const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(this.src.includes('/flybys/'))window.flybyPlayCalls++;return play.call(this);};});
  await open(page);await page.evaluate(()=>window.previewAudio={currentTime:0});await frozen(page);await stopped(page);
  expect(await page.evaluate(()=>flybyPlayCalls)).toBe(0);
  expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.composer.planes.some(p=>p.items.length&&p.canvas.width>0))).toBe(true);
  await page.locator('[data-action="close"]').click();await page.keyboard.press('Control+Shift+D');await page.getByRole('button',{name:'FX Editing',exact:true}).click();
  await expect(page.locator('[data-dimensions]')).toHaveText('407 × 543 source pixels');await stopped(page);await frozen(page);
  expect(await page.evaluate(()=>flybyPlayCalls)).toBe(0);
});

test('toolbar settings preserve layout, camera, selection and playback without rebuilding or drawing FX',async({page},info)=>{
  await open(page);
  await expect(page.locator('.fxLibrary [data-preview-setting],.fxLibrary details')).toHaveCount(0);
  await expect(page.locator('.fxPreviewSettings details')).toHaveCount(0);
  for(const selector of ['[data-movement]','[data-mirror]','[data-scale]','[data-preview-mute]','[data-preview-direction]',...['soundVolume','loopDuringFlyby','speed','motionProfile','wobble','speedVariation','flutterFrequency','faceFlightDirection','rotateAlongPath','maxRotationDeg'].map(f=>`[data-preview-setting="${f}"]`)])await expect(page.locator('.fxToolbar '+selector)).toHaveCount(1);
  const layout=()=>page.evaluate(()=>['.fxLibrary','.fxToolbar','[data-viewport]'].map(selector=>document.querySelector(selector).getBoundingClientRect().toJSON()));
  const before=await layout();
  // Let the workspace's initial ResizeObserver delivery settle before counting
  // draws caused by settings interactions (WebKit can deliver it after load).
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await page.evaluate(()=>{const s=AtlasFlybyFXEditor.state;window.settingsBefore={composer:s.composer,selected:s.selected,zoom:s.zoom,x:s.x,y:s.y,document:JSON.stringify(s.document)};window.settingsDraws=[];const draw=s.composer.draw;s.composer.draw=function(...args){settingsDraws.push({stack:new Error().stack,args});return draw.apply(this,args);};});
  await settings(page);await expect(page.getByRole('region',{name:'Preview settings · Not saved'})).toBeVisible();
  expect(await layout()).toEqual(before);
  await page.screenshot({path:info.outputPath('preview-settings.png')});
  const panel=await page.locator('.fxPreviewSettings').boundingBox(),screen=page.viewportSize();
  expect(panel.x).toBeGreaterThanOrEqual(0);expect(panel.x+panel.width).toBeLessThanOrEqual(screen.width);expect(panel.y+panel.height).toBeLessThanOrEqual(screen.height);
  // Escape works even from a control, restoring focus to the toolbar button.
  await page.locator('[data-preview-setting="soundVolume"]').focus();await page.keyboard.press('Escape');
  await expect(page.locator('.fxPreviewSettings')).toBeHidden();await expect(page.locator('[data-action="preview-settings"]')).toBeFocused();
  await settings(page);await page.locator('[data-dimensions]').click();await expect(page.locator('.fxPreviewSettings')).toBeHidden();
  await settings(page);await page.locator('[data-action="preview-settings"]').click();
  await page.waitForTimeout(100);expect(await layout()).toEqual(before);
  expect(await page.evaluate(()=>{const s=AtlasFlybyFXEditor.state,b=settingsBefore;return {composer:s.composer===b.composer,selected:s.selected===b.selected,zoom:s.zoom===b.zoom,x:s.x===b.x,y:s.y===b.y,document:JSON.stringify(s.document)===b.document,draws:settingsDraws};})).toEqual({composer:true,selected:true,zoom:true,x:true,y:true,document:true,draws:[]});
  await stopped(page);
  await page.locator('[data-movement]').check();await page.locator('[data-action="play"]').click();await audio(page);
  const first=await snapshot(page);
  await settings(page);await page.keyboard.press('Escape');await settings(page);await page.locator('[data-action="preview-settings"]').click();
  const after=await snapshot(page);expect(after.time).toBeGreaterThan(first.time);expect(after.distance).toBeGreaterThan(first.distance);expect(after.audio).toBeGreaterThan(first.audio);
  expect(await page.evaluate(()=>[...AtlasFlybyFXEditor.state.runtime.activeAudio.values()][0].audio===previewAudio)).toBe(true);
  await page.locator('[data-action="play"]').click();await settings(page);await frozen(page);await page.keyboard.press('Escape');await frozen(page);
});

test('FX transport synchronizes native looping audio, movement and effects; volume, mute, restart and stop',async({page})=>{
  await open(page);await expect(page.locator('#app')).toBeHidden();
  await expect(page.locator('[data-audio-source]')).toContainText('shredder/shredder.mp3');
  await expect(page.locator('[data-preview-setting="loopDuringFlyby"]')).toBeChecked();
  await page.locator('[data-movement]').check();await stopped(page);await page.locator('[data-action="play"]').click();await audio(page);
  await page.waitForFunction(()=>AtlasFlybyFXEditor.state.time>.25);
  const first=await snapshot(page);await page.waitForFunction(time=>AtlasFlybyFXEditor.state.time>time+.1,first.time);const second=await snapshot(page);
  expect(second.time).toBeGreaterThan(first.time);expect(second.distance).toBeGreaterThan(first.distance);expect(second.audio).toBeGreaterThan(first.audio);expect(second.pixels).not.toBe(first.pixels);
  await settings(page);await page.locator('[data-preview-setting="soundVolume"]').fill('0.4');
  await expect.poll(()=>page.evaluate(()=>{const s=AtlasFlybyFXEditor.state,i=s.runtime.active.get('fx-workspace-preview');return Math.abs(previewAudio.volume-window.eval('audioMasterVolume')()*.4*AtlasAmbientSystem.volumeEnvelope(i.progress));})).toBeLessThan(.0001);
  await page.locator('[data-preview-mute]').check();await expect.poll(()=>page.evaluate(()=>previewAudio.volume)).toBe(0);
  await page.locator('[data-preview-mute]').uncheck();await expect.poll(()=>page.evaluate(()=>previewAudio.volume)).toBeGreaterThan(0);
  await page.locator('[data-action="play"]').click();await expect(page.locator('[data-action="play"]')).toHaveText('Resume');
  expect(await page.evaluate(()=>previewAudio.paused)).toBe(true);const paused=await frozen(page);
  await page.locator('[data-action="play"]').click();await expect.poll(()=>page.evaluate(()=>previewAudio.currentTime)).toBeGreaterThan(paused.audio);
  expect(await page.evaluate(()=>[...AtlasFlybyFXEditor.state.runtime.activeAudio.values()][0].audio===previewAudio)).toBe(true);
  await page.evaluate(()=>{window.nativeLoopWrap=false;let last=previewAudio.currentTime;previewAudio.addEventListener('timeupdate',()=>{if(previewAudio.currentTime<last-.1)window.nativeLoopWrap=true;last=previewAudio.currentTime;});previewAudio.playbackRate=4;});
  await expect.poll(()=>page.evaluate(()=>nativeLoopWrap)).toBe(true);expect(await page.evaluate(()=>previewAudio.loop)).toBe(true);
  await page.locator('[data-action="restart"]').click();expect(await page.evaluate(()=>previewAudio.paused)).toBe(true);
  await audio(page);expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.time)).toBeLessThan(1);
  await page.locator('[data-action="stop"]').click();await expect(page.locator('[data-action="play"]')).toHaveText('Play');
  expect(await page.evaluate(()=>({audio:AtlasFlybyFXEditor.state.runtime.activeAudio.size,active:AtlasFlybyFXEditor.state.runtime.active.size,paused:previewAudio.paused,time:AtlasFlybyFXEditor.state.time}))).toEqual({audio:0,active:0,paused:true,time:0});
  await page.waitForTimeout(150);expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.time)).toBe(0);
  await page.locator('[data-action="play"]').click();await audio(page);
  await page.evaluate(()=>window.closedRuntime=AtlasFlybyFXEditor.state.runtime);
  await page.locator('[data-action="close"]').click();
  expect(await page.evaluate(()=>({audio:closedRuntime.activeAudio.size,active:closedRuntime.active.size,ready:closedRuntime.readiness.size,paused:previewAudio.paused}))).toEqual({audio:0,active:0,ready:0,paused:true});
  await expect(page.locator('#app')).toBeVisible();expect(await page.locator('#app').evaluate(app=>app.inert)).toBe(false);
});

test('one-shot sound pauses with FX and visibility, resumes without rewinding, and does not replay after ending',async({page})=>{
  await open(page);await settings(page);await page.locator('[data-preview-setting="loopDuringFlyby"]').uncheck();await page.locator('[data-action="play"]').click();await audio(page);
  expect(await page.evaluate(()=>previewAudio.loop)).toBe(false);
  await page.locator('[data-action="play"]').click();await frozen(page);
  await settings(page);await page.locator('[data-preview-setting="soundVolume"]').fill('0.25');await frozen(page);
  await page.locator('[data-action="play"]').click();await expect.poll(()=>page.evaluate(()=>previewAudio.paused)).toBe(false);
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
  expect(await page.evaluate(()=>previewAudio.paused)).toBe(true);const paused=await frozen(page);
  await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
  await expect.poll(()=>page.evaluate(()=>previewAudio.currentTime)).toBeGreaterThan(paused.audio);
  await page.evaluate(()=>previewAudio.playbackRate=4);
  await expect.poll(()=>page.evaluate(()=>AtlasFlybyFXEditor.state.runtime.activeAudio.size)).toBe(0);
  await page.locator('[data-action="play"]').click();await page.locator('[data-action="play"]').click();
  expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.runtime.activeAudio.size)).toBe(0);
});

test('asset switching releases owned audio and no-audio assets keep a working visual preview',async({page})=>{
  await open(page);await page.locator('[data-action="play"]').click();await audio(page);
  const next=await page.evaluate(()=>AtlasFlybyFXEditor.state.assets.find(a=>a.key!=='flybys/shredder').key);
  // Exercise the optional-audio discovery contract without creating any assets.
  await page.evaluate(key=>{AtlasFlybyFXEditor.state.assets.find(a=>a.key===key).sound='';},next);
  await page.locator('[data-asset]').selectOption(next);
  await expect(page.locator('[data-audio-source]')).toHaveText('No audio file in this asset.');
  await expect.poll(()=>page.evaluate(()=>AtlasFlybyFXEditor.state.busy)).toBe(false);
  await stopped(page);
  expect(await page.evaluate(()=>previewAudio.paused)).toBe(true);
  await expect(page.locator('[data-preview-setting="soundVolume"]')).toBeDisabled();
  await page.locator('[data-action="play"]').click();await expect.poll(()=>page.evaluate(()=>AtlasFlybyFXEditor.state.time)).toBeGreaterThan(.1);
  expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.runtime.activeAudio.size)).toBe(0);
  await page.locator('[data-asset]').selectOption('flybys/shredder');await expect.poll(()=>page.evaluate(()=>AtlasFlybyFXEditor.state.busy)).toBe(false);await stopped(page);await page.locator('[data-action="play"]').click();await audio(page);
  await expect(page.locator('[data-preview-setting="soundVolume"]')).toBeEnabled();
});

test('browser playback rejection is visible and Restart retries from a user gesture without leaked audio',async({page})=>{
  await page.addInitScript(()=>{
    const play=HTMLMediaElement.prototype.play;window.blockPreviewAudio=true;
    HTMLMediaElement.prototype.play=function(){if(this.src.includes('/shredder/')&&window.blockPreviewAudio)return Promise.reject(new DOMException('User gesture required','NotAllowedError'));return play.call(this);};
  });
  await open(page);await expect(page.locator('[data-audio-status]')).toBeEmpty();await page.locator('[data-action="play"]').click();await settings(page);await expect(page.locator('[data-audio-status]')).toContainText('Audio could not play');
  expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.runtime.activeAudio.size)).toBe(0);
  await page.evaluate(()=>window.blockPreviewAudio=false);await page.locator('[data-action="restart"]').click();await audio(page);
  await expect(page.locator('[data-audio-status]')).toBeEmpty();
});

test('preview controls share level limits, retain source-pixel editing under rotation, and never enter saved FX',async({page})=>{
  const source=fs.readFileSync(rigPath),writes=[];
  page.on('request',request=>{if(request.method()==='POST')writes.push({url:request.url(),data:request.postDataJSON()});});
  try{
    await open(page);await settings(page);
    for(const field of ['speed','wobble','speedVariation','flutterFrequency','maxRotationDeg','soundVolume']){
      const control=page.locator(`[data-preview-setting="${field}"]`),definition=await page.evaluate(f=>AtlasAmbientSystem.previewControls[f],field);
      await expect(control).toHaveAttribute('min',String(definition.min));await expect(control).toHaveAttribute('max',String(definition.max));await expect(control).toHaveAttribute('step',String(definition.step));
    }
    await page.locator('[data-movement]').check();await settings(page);await page.locator('[data-preview-setting="motionProfile"]').selectOption('organic');
    await page.locator('[data-preview-setting="rotateAlongPath"]').check();await page.locator('[data-preview-setting="faceFlightDirection"]').check();
    await page.locator('[data-preview-direction]').selectOption('-1');await expect(page.locator('[data-mirror]')).toBeDisabled();
    await page.locator('[data-action="play"]').click();
    await page.waitForFunction(()=>AtlasFlybyFXEditor.state.time>.1);await page.locator('[data-action="play"]').click();
    expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.pose.facing)).toBe(-1);
    await expect(page.locator('[data-status]')).toHaveText('Saved');expect(writes).toEqual([]);
    // Center the paused moving sprite, then edit through the actual rotated SVG transform.
    await page.locator('[data-select="shredder-left-jet"]').first().click();
    await page.locator('[data-scale]').selectOption('0.35');
    await page.evaluate(()=>{const s=AtlasFlybyFXEditor.state;s.x-=s.pose.point.x;s.y-=s.pose.point.y;window.dispatchEvent(new Event('resize'));s.runtime.refreshPreviews();});
    const target=await page.evaluate(()=>{
      const s=AtlasFlybyFXEditor.state,e=s.document.effects.find(e=>e.id==='shredder-left-jet'),m=s.root.querySelector('[data-guide-transform]').getScreenCTM();
      const p=new DOMPoint(e.geometry.x,e.geometry.y).matrixTransform(m),to=new DOMPoint(e.geometry.x+20,e.geometry.y+10).matrixTransform(m);
      // WebKit quantizes mouse coordinates. Send integer CSS pixels and assert
      // the exact source displacement those inputs represent under rotation.
      const start=new DOMPoint(Math.round(p.x),Math.round(p.y)),end=new DOMPoint(Math.round(to.x),Math.round(to.y));
      const a=start.matrixTransform(m.inverse()),b=end.matrixTransform(m.inverse());
      return {start:start.toJSON(),end:end.toJSON(),x:Math.round((e.geometry.x+b.x-a.x)*10)/10,y:Math.round((e.geometry.y+b.y-a.y)*10)/10};
    });
    await page.mouse.move(target.start.x,target.start.y);await page.mouse.down();await page.mouse.move(target.end.x,target.end.y);await page.mouse.up();
    await expect(page.getByRole('spinbutton',{name:'X',exact:true})).toHaveValue(String(target.x));
    await expect(page.getByRole('spinbutton',{name:'Y',exact:true})).toHaveValue(String(target.y));
    const document=await page.evaluate(()=>AtlasFlybyFXEditor.state.document);
    await page.locator('[data-action="save"]').click();await expect(page.locator('[data-status]')).toHaveText('Saved');
    expect(writes).toHaveLength(1);expect(writes[0].url).toContain('/__dev/flyby-fx?');expect(writes[0].data.document).toEqual(document);
    expect(JSON.parse(fs.readFileSync(rigPath))).toEqual(document);
    for(const key of ['preview','speed','scale','sound','soundVolume','loopDuringFlyby','path'])expect(document).not.toHaveProperty(key);
  }finally{fs.writeFileSync(rigPath,source);}
});

test('a moving preview ends with its native audio and does not schedule a new flight',async({page})=>{
  await open(page);await settings(page);
  await page.locator('[data-preview-setting="speed"]').fill('2000');await page.locator('[data-movement]').check();await page.locator('[data-action="play"]').click();await audio(page);
  await expect(page.locator('[data-action="play"]')).toHaveText('Play');
  expect(await page.evaluate(()=>({paused:previewAudio.paused,active:AtlasFlybyFXEditor.state.runtime.active.size,audio:AtlasFlybyFXEditor.state.runtime.activeAudio.size,timers:AtlasFlybyFXEditor.state.runtime.timers.size}))).toEqual({paused:true,active:0,audio:0,timers:0});
  const time=await page.evaluate(()=>AtlasFlybyFXEditor.state.time);await page.waitForTimeout(180);expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.time)).toBe(time);
});

test('Stop remains stopped when changing settings or assets; paused asset switches also stop',async({page})=>{
  await open(page);await page.locator('[data-action="play"]').click();await audio(page);await page.locator('[data-action="stop"]').click();
  await page.locator('[data-movement]').check();await settings(page);await page.locator('[data-preview-setting="loopDuringFlyby"]').uncheck();
  await expect(page.locator('[data-action="play"]')).toHaveText('Play');
  const next=await page.evaluate(()=>AtlasFlybyFXEditor.state.assets.find(a=>a.key!=='flybys/shredder').key);
  await page.locator('[data-asset]').selectOption(next);await expect.poll(()=>page.evaluate(()=>AtlasFlybyFXEditor.state.busy)).toBe(false);
  await expect(page.locator('[data-action="play"]')).toHaveText('Play');
  expect(await page.evaluate(()=>({active:AtlasFlybyFXEditor.state.runtime.active.size,audio:AtlasFlybyFXEditor.state.runtime.activeAudio.size}))).toEqual({active:0,audio:0});
  await page.locator('[data-asset]').selectOption('flybys/shredder');await expect.poll(()=>page.evaluate(()=>AtlasFlybyFXEditor.state.busy)).toBe(false);
  await page.locator('[data-action="play"]').click();await audio(page);await page.locator('[data-action="play"]').click();
  await page.locator('[data-asset]').selectOption(next);await expect.poll(()=>page.evaluate(()=>AtlasFlybyFXEditor.state.busy)).toBe(false);
  await stopped(page);expect(await page.evaluate(()=>previewAudio.paused)).toBe(true);
  const time=await page.evaluate(()=>AtlasFlybyFXEditor.state.time);await page.waitForTimeout(150);expect(await page.evaluate(()=>AtlasFlybyFXEditor.state.time)).toBe(time);
});
