const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.join(__dirname,'..');
require('./editor-draft-fixture').preserveEditorDrafts(test,root);
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
function contract(){
  let callback;
  const window={performance:{now:()=>1000},requestAnimationFrame:cb=>(callback=cb,1),cancelAnimationFrame(){},setTimeout:()=>1,clearTimeout(){}};
  const context=vm.createContext({window,console});
  for(const file of ['assets/characters/manifest.js','src/playable-characters.js','src/locomotion.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
  return {window,tick:time=>callback(time)};
}
test('sprite sets discover independent frames and share all ten animation states',()=>{
  const {window:w,tick}=contract();
  for(const id of ['sven','sven_arc']){
    const set=w.AtlasLocomotion.animationSet(id),frames=[];
    const controller=w.AtlasLocomotion.createController({characterId:id,onFrame:(state,index,src)=>frames.push({state,index,src})});
    for(const [state,animation] of Object.entries(set)){
      const disk=fs.readdirSync(path.join(root,'assets/characters',id,animation.folder)).filter(f=>/\.png$/i.test(f));
      expect(animation.frames).toBe(disk.length);
      expect(animation.urls.every(src=>src.startsWith(`assets/characters/${id}/`))).toBe(true);
      controller.transition(state,1,1000);
      expect(frames.at(-1).src).toBe(animation.urls[0]);
      const duration=controller.stateDuration(state);
      if(state!=='idle'){
        tick(1000+duration-0.1);
        expect(frames.at(-1).index).toBe(animation.frames-1);
        if(animation.loop){tick(1000+duration+0.1);expect(frames.at(-1).index).toBe(0);}
        else {tick(1000+duration+0.1);expect(controller.snapshot().state).not.toBe(state);}
      }
    }
  }
  expect(w.AtlasLocomotion.animationSet('sven_arc').idleBlink.frames).toBe(10);
  expect(w.AtlasLocomotion.animationSet('sven').idleBlink.frames).toBe(13);
  expect(w.AtlasPlayableCharacters.selected({player:{}})).toBe('sven');
  expect(()=>w.AtlasPlayableCharacters.validateId('missing')).toThrow();
  expect(()=>w.AtlasPlayableCharacters.validateBank({missing:{}})).toThrow();
  expect(()=>w.AtlasPlayableCharacters.validateBank({sven_arc:{spriteScale:99}})).toThrow();
  expect(()=>w.AtlasPlayableCharacters.validateBank({sven_arc:{locomotion:{blinkMinimumInterval:5000,blinkMaximumInterval:1000}}})).toThrow();
  const switched=w.AtlasLocomotion.createController();
  switched.startTransitionWindow('fromIdle','left',{frameStart:10,frameLimit:18});
  switched.setCharacter('sven_arc');
  expect(switched.snapshot()).toMatchObject({characterId:'sven_arc',state:'idle',desiredDirection:null,frameIndex:0,frameStart:0,frameLimit:null});
  const arc=w.ATLAS_CHARACTER_MANIFEST.playableCharacters.find(c=>c.id==='sven_arc');
  arc.animations.idle_blink=[];
  expect(()=>w.AtlasLocomotion.animationSet('sven_arc')).toThrow(/missing required animation idle_blink/);
});

async function enter(page,id='LVL-0032',editor=false){
  await page.route('**/__dev/levels/*/editor-draft',route=>route.fulfill({json:{}}));
  await page.goto(base+(editor?'/?dev=editor':'/'));
  await page.evaluate(async id=>window.eval('selectLevel')(id,{startImmediately:true,recordStart:false}),id);
  await expect(page.locator('[data-actor="sven"]')).toBeVisible();
}
test('world inspector resolves character defaults before a level has been played',async({page})=>{
  await page.goto(base+'/?dev=editor');
  await page.evaluate(async()=>{
    window.eval('state').screen='menu';
    await window.eval('prepareWorldEditor')();
    window.eval('worldEditor').selectedWorldId='LVL-0032';
    window.eval('worldEditor').selectedLevelId='LVL-0032';
    window.eval('render')();
  });
  await expect(page.locator('[data-main-character="LVL-0032"]')).toHaveValue('sven_arc');
  await page.evaluate(()=>{
    window.eval('worldEditor').selectedWorldId='LVL-0001';
    window.eval('worldEditor').selectedLevelId='LVL-0001';
    window.eval('render')();
  });
  await expect(page.locator('[data-main-character="LVL-0001"]')).toHaveValue('sven');
});
test('ARC initializes its own sprite set and old levels retain standard Sven',async({page},info)=>{
  const errors=[],requests=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('request',r=>{if(r.url().includes('/characters/sven/'))requests.push(r.url());});
  await enter(page);
  await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id','sven_arc');
  expect(requests).toEqual([]);
  expect(await page.evaluate(()=>window.AtlasLocomotion.allFrameUrls('sven_arc').every(src=>{
    const image=window.AtlasLocomotion.decodedImages.get(src);return image?.complete&&image.naturalWidth>0;
  }))).toBe(true);
  await page.screenshot({path:info.outputPath('arc-player.png')});
  await page.evaluate(async()=>window.eval('selectLevel')('LVL-0001',{startImmediately:true,recordStart:false}));
  await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id','sven');
  expect(await page.evaluate(()=>window.eval('levelTuning')().spriteScale)).toBe(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0001').spriteScale||1));
  expect(errors).toEqual([]);
});

test('both sprite sets walk, reverse and arrive idle through the same player controller',async({page})=>{
  await enter(page);
  for(const id of ['sven_arc','sven']){
    await page.evaluate(async id=>window.eval('selectMainCharacter')('LVL-0032',id),id);
    for(const direction of [1,-1]){
      const result=await page.evaluate(async direction=>{
        const game=window.eval('state'),controller=window.eval('locomotion');
        const start=game.worldX,target={x:start+direction*350,y:game.worldY};
        await new Promise(resolve=>window.eval('walkRoute')([target],resolve,window.eval('replaceMovementIntent')({type:'character-test'})));
        return {x:game.worldX,target:target.x,state:controller.snapshot().state,character:controller.snapshot().characterId,src:document.querySelector('[data-actor="sven"]').dataset.assetPath};
      },direction);
      expect(result.x).toBeCloseTo(result.target,1);
      expect(result.state).toBe('idle');
      expect(result.character).toBe(id);
      expect(result.src).toContain(`/characters/${id}/idle/`);
    }
  }
});

test('editor selection keeps every player control in independent saved character banks',async({page})=>{
  const config=path.join(root,'Levels/world-config.js'),original=fs.readFileSync(config),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  try {
    await enter(page,'LVL-0032',true);
    await page.keyboard.press('Control+Shift+D');
    await page.locator('[data-editor-mode="characters"]').click();
    const select=page.locator('[data-main-character="LVL-0032"]');
    await expect(select).toHaveValue('sven_arc');
    expect(await select.locator('option').allTextContents()).toEqual(['Sven','ARC Sven']);
    const values={sven:{spriteScale:0.85,movementSpeed:210,animationSpeed:0.8,svenBrightness:0.7,svenContrast:0.9,svenSaturation:0.5,svenWarmth:-0.3,svenTint:-0.2},sven_arc:{spriteScale:1.35,movementSpeed:280,animationSpeed:1.3,svenBrightness:1.2,svenContrast:1.1,svenSaturation:1.4,svenWarmth:0.3,svenTint:0.2}};
    for(const id of ['sven','sven_arc']){
      await select.selectOption(id);
      await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id',id);
      await page.locator('[data-level-setting="spriteScale"]').fill(String(values[id].spriteScale));
      // Exercise every shared tuning handler, including the expanded locomotion controls.
      await page.evaluate(({id,values})=>{
        for(const [key,value] of Object.entries(values))window.eval('updateLevelSetting')('LVL-0032',key,value);
        const ranges=window.AtlasPlayableCharacters.locomotionRanges;
        for(const [key,[min,max]] of Object.entries(ranges))window.eval('updateLocomotionSetting')(key,min+(max-min)*(id==='sven'?0.3:0.6),'LVL-0032');
      },{id,values:values[id]});
    }
    const expected=await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0032').mainCharacterSettings);
    const profiles=await page.evaluate(()=>window.eval('worldResolver').getConfig().characterLocomotion);
    for(const id of ['sven','sven_arc']){
      await select.selectOption(id);
      await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id',id);
      expect(await page.evaluate(()=>window.eval('levelTuning')())).toMatchObject(values[id]);
      expect(await page.evaluate(()=>window.eval('locomotionTuning')())).toEqual(profiles[id]);
      await expect(page.locator('[data-level-setting="spriteScale"]')).toHaveValue(String(values[id].spriteScale));
    }
    await page.locator('[data-debug-action="apply-walkpath"]').click();
    await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Applied');
    await enter(page,'LVL-0032',true);
    await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id','sven_arc');
    expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0032').mainCharacterSettings)).toEqual(expected);
    await page.keyboard.press('Control+Shift+D');
    await page.locator('[data-editor-mode="characters"]').click();
    await select.selectOption('sven');
    await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id','sven');
    expect(await page.evaluate(()=>window.eval('levelTuning')())).toMatchObject(values.sven);
    expect(await page.evaluate(()=>window.eval('worldResolver').getConfig().characterLocomotion)).toEqual(profiles);
    expect(errors).toEqual([]);
  }finally{await page.close();fs.writeFileSync(config,original);}
});

for(const mode of ['cinematic','voxel'])test(`${mode} switches sprite textures without borrowing the previous character`,async({page},info)=>{
  test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1','Requires real WebGPU.');
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await enter(page);
  await page.evaluate(async mode=>{
    await window.eval('selectMainCharacter')('LVL-0032','sven');
    window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();
  },mode);
  const snapshot=()=>page.evaluate(mode=>window.eval(mode==='cinematic'?'cinematicRenderer':'voxelRenderer').snapshot(),mode);
  await expect.poll(async()=>(await snapshot()).status,{timeout:30000}).toBe('ready');
  await expect.poll(async()=>(await snapshot()).sprites).toBe(1);
  await page.evaluate(()=>{
    const original=window.createImageBitmap;
    window.pendingPlayerUploads=[];
    window.createImageBitmap=async function(source,...args){
      if(source?.src?.includes('/characters/sven_arc/'))await new Promise(resolve=>window.pendingPlayerUploads.push(resolve));
      return original.call(window,source,...args);
    };
    window.releasePlayerUploads=()=>{window.createImageBitmap=original;window.pendingPlayerUploads.splice(0).forEach(resolve=>resolve());};
  });
  await page.evaluate(()=>window.eval('selectMainCharacter')('LVL-0032','sven_arc'));
  await expect.poll(()=>page.evaluate(()=>window.pendingPlayerUploads.length)).toBeGreaterThan(0);
  // While the selected texture is pending, the previous character must not be drawn.
  await expect.poll(async()=>(await snapshot()).sprites).toBe(0);
  await page.evaluate(()=>window.releasePlayerUploads());
  await expect.poll(async()=>(await snapshot()).sprites).toBe(1);
  if(mode==='cinematic')expect((await snapshot()).textureUploads.find(item=>item.purpose==='sprite actor:sven').path).toContain('/characters/sven_arc/');
  await page.screenshot({path:info.outputPath(`${mode}-arc-player.png`)});
  await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});window.eval('render')();});
  await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id','sven_arc');
  expect(errors).toEqual([]);
});
