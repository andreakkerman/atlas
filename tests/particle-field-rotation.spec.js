const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const contract=require('../src/cinematic-settings');
const root=path.join(__dirname,'..'),worldPath=path.join(root,'Levels/world-config.js');
require('./editor-draft-fixture').preserveEditorDrafts(test,root);
let original;
test.beforeEach(()=>{original=fs.readFileSync(worldPath);});
test.afterEach(async({page})=>{await page.close();fs.writeFileSync(worldPath,original);});
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];

test('particle presets preserve independent bounds and migrate legacy direction',()=>{
 const old=contract.instance('particles',{direction:90,width:720,height:2100});
 expect(old.boundsRotation).toBe(90);
 for(const preset of Object.keys(contract.presets.particles)) {
  const next=contract.preset('particles',preset,{...old,boundsRotation:37});
  expect(next.boundsRotation).toBe(37);expect(next.width).toBe(720);expect(next.height).toBe(2100);
 }
 const sand=contract.preset('particles','Sand',old);
 expect(sand.distribution).toBe('ribbon');expect(sand.depthInfluence).toBe(0);
 const pollen=contract.preset('particles','Pollen',sand);
 expect(pollen.distribution).toBe('volume');expect(pollen.depthInfluence).toBe(1);
 const gpu=contract.gpuOnly(contract.normalize({particles:{enabled:true,items:[sand]}}));
 expect(gpu.particles.enabled).toBe(false);expect(gpu.particles.items[0].enabled).toBe(false);
 expect(sand.enabled).toBe(true);
});

test('Canvas sand uses shared regions, rotation, controls and lifecycle',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.setContent('<canvas data-scene-effects-canvas="worldAtmosphere"></canvas>');
 for(const file of ['cinematic-settings.js','scene-effects.js'])await page.addScriptTag({path:path.join(root,'src',file)});
 const data=await page.evaluate(()=>{
  let callback;window.requestAnimationFrame=fn=>{callback=fn;return 1;};window.cancelAnimationFrame=()=>{callback=null;};
  const api=AtlasCinematicSettings,fx=AtlasSceneEffects;
  let field=api.preset('particles','Sand',api.instance('particles',{id:'test',x:400,y:350,width:500,height:100}));
  const level={id:'test',world:{width:800,height:700},sceneEffects:[]};
  const runtime=fx.createRuntime({getLevel:()=>level,getScreen:()=> 'scene',getParticleFields:()=>[field]});
  const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d');
  let grains=0;const fill=ctx.fillRect.bind(ctx);ctx.fillRect=(...args)=>{grains++;fill(...args);};
  const scan=()=>{
   const p=ctx.getImageData(0,0,800,700).data;let painted=0,outside=0,sum=0;
   const a=field.boundsRotation*Math.PI/180;
   for(let y=0;y<700;y++)for(let x=0;x<800;x++)if(p[(y*800+x)*4+3]>2){
    painted++;sum+=p[(y*800+x)*4+3]*(x+y*800);
    const dx=x-field.x,dy=y-field.y,lx=Math.cos(a)*dx+Math.sin(a)*dy,ly=-Math.sin(a)*dx+Math.cos(a)*dy;
    if(Math.abs(lx)>field.width/2+2||Math.abs(ly)>field.height/2+2)outside++;
   }
   return {painted,outside,sum};
  };
  const counts=[];
  for(const tier of ['high','balanced','reduced']) {document.documentElement.dataset.effectsQuality=tier;grains=0;runtime.prepareLevel(level);counts.push(grains);}
  const shapes=[];
  for(const shape of ['rectangle','ellipse','polygon'])for(const rotation of [-45,0,90]){
   field=api.instance('particles',{...field,shape,boundsRotation:rotation});runtime.sync();shapes.push(scan());
  }
  const first=scan();callback(performance.now()+3000);const later=scan();
  field.opacity=0;runtime.sync();const transparent=scan().painted;
  field.enabled=false;runtime.sync();const disabled={raf:runtime.rafId,count:runtime.particleFields.length};
  runtime.dispose();return {counts,shapes,first,later,transparent,disabled,disposed:runtime.particleFields.length};
 });
 expect(data.counts).toEqual([480,326,182]);
 for(const shape of data.shapes){expect(shape.painted).toBeGreaterThan(200);expect(shape.outside).toBe(0);}
 expect(data.first.sum).not.toBe(data.later.sum);expect(data.transparent).toBe(0);
 expect(data.disabled).toEqual({raf:null,count:0});expect(data.disposed).toBe(0);
});

test('Sand shares dropdown, rotation handles, presets and Apply/reload on every shape',async({page},info)=>{
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor&level=LVL-0033');
 await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');
 await expect(page.locator('[data-actor="sven"]')).toBeVisible();
 await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
 await page.keyboard.press('Control+Shift+D');await page.getByRole('button',{name:'Graphics',exact:true}).click();
 const group=page.locator('[data-cinematic-group="particles"]');
 if(!await group.evaluate(e=>e.open))await group.locator('summary').click();
 const preset=group.locator('[data-cinematic-preset="particles"]'),field=key=>group.locator(`[data-cinematic-setting="${key}"]`);
 await expect(page.getByRole('button',{name:'Add Sand',exact:true})).toHaveCount(0);
 await expect(page.locator('[data-effect-preset-card="windblown-sand"]')).toHaveCount(0);
 await group.locator('[data-cinematic-select="particles"]').selectOption('buried-city-sand');
 const value=()=>page.evaluate(()=>AtlasCinematicSettings.normalize(window.eval('worldResolver').levelSettings('LVL-0033').cinematicLighting).particles.items.find(i=>i.id==='buried-city-sand'));
 expect(await value()).toMatchObject({x:974,y:514,width:2226,height:218,distribution:'ribbon'});
 for(const [key,v] of Object.entries({x:180,y:220,width:180,height:80}))await field(key).fill(String(v));
 expect(await value()).toMatchObject({x:180,y:220,width:180,height:80});
 for(const shape of ['ellipse','rectangle','polygon']){
  await field('shape').selectOption(shape);
  await field('boundsRotation').fill('35');await field('direction').fill('-15');
  expect(await value()).toMatchObject({shape,boundsRotation:35,direction:-15});
  const marker='[data-cinematic-marker="buried-city-sand"]';
  await expect(page.locator(marker+' .cinematicInfluence > *')).toHaveAttribute('transform',/rotate\(35 /);
  await page.locator(marker+' [data-cinematic-handle="boundsRotation"]').hover();
  const start=await page.locator(marker+' [data-cinematic-handle="boundsRotation"]').boundingBox();
  const end=await page.evaluate(()=>{const svg=document.querySelector('[data-cinematic-placement]'),p=new DOMPoint(380,220).matrixTransform(svg.getScreenCTM());return {x:p.x,y:p.y};});
  await page.mouse.move(start.x+start.width/2,start.y+start.height/2);await page.mouse.down();await page.mouse.move(end.x,end.y,{steps:5});await page.mouse.up();
  expect((await value()).boundsRotation).toBeCloseTo(90,0);expect((await value()).direction).toBe(-15);
 }
 for(const name of ['Pollen','Dust','Embers','Snow','Drizzle','Heavy Rain','Magic Motes','Sand']){
  await preset.selectOption(name);
  expect((await value()).boundsRotation).toBeCloseTo(90,0);
 }
 await field('opacity').fill('0.35');await field('speed').fill('32');
 await expect.poll(()=>page.evaluate(()=>window.eval('sceneEffectRuntime').particleFields.find(f=>f.id==='buried-city-sand')?.opacity)).toBe(.35);
 const expected=await value();
 await page.screenshot({path:info.outputPath('shared-sand-controls.png')});
 await page.getByRole('button',{name:'Apply',exact:true}).click();
 await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor.status'))).toBe('Applied');
 await page.reload();await page.waitForFunction(()=>window.eval('typeof level')!=='undefined'&&window.eval('level?.id')==='LVL-0033');
 expect(await value()).toEqual(expected);
});

test('adding Sand to an empty scene mounts shared canvas without requiring GPU particles',async({page})=>{
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor&level=LVL-0033');
 await expect(page.locator('[data-actor="sven"]')).toBeVisible();
 await page.evaluate(()=>{
  window.eval('level').sceneEffects=[];
  window.eval('worldResolver').updateLevelSettings('LVL-0033',{cinematicLighting:AtlasCinematicSettings.normalize(),illustratedFeatures:{globalLighting:false,characterShadows:false,particleFields:true}});
  window.eval('render')();
 });
 await expect(page.locator('[data-scene-effects-canvas="worldAtmosphere"]')).toHaveCount(0);
 await page.keyboard.press('Control+Shift+D');await page.getByRole('button',{name:'Graphics',exact:true}).click();
 const group=page.locator('[data-cinematic-group="particles"]');
 if(!await group.evaluate(e=>e.open))await group.locator('summary').click();
 await group.locator('[data-cinematic-action="add"]').click();
 await group.locator('[data-cinematic-preset="particles"]').selectOption('Sand');
 await expect(page.locator('[data-scene-effects-canvas="worldAtmosphere"]')).toHaveCount(1);
 expect(await page.evaluate(()=>{
  const settings=window.eval('worldResolver').levelSettings('LVL-0033');
  return {fields:window.eval('sceneEffectRuntime').particleFields.length,gpu:AtlasCinematicRenderer.requiresGPU('illustrated',settings.cinematicLighting,settings.illustratedFeatures)};
 })).toEqual({fields:1,gpu:false});
 await group.locator('[data-cinematic-system="particles"]').uncheck();
 expect(await page.evaluate(()=>window.eval('sceneEffectRuntime').particleFields.length)).toBe(0);
 await group.locator('[data-cinematic-system="particles"]').check();
 expect(await page.evaluate(()=>window.eval('sceneEffectRuntime').particleFields.length)).toBe(1);
});
