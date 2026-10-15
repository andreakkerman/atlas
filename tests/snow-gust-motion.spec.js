const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const before=require('./fixtures/snow-preset-only.json'),api=require('../src/cinematic-settings');
const {bootEditorTest}=require('./editor-workspace-helpers');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4185';
test('record before and after coherent snow gusts',async({browser})=>{
 test.skip(process.env.ATLAS_WEBGPU_QA!=='1','Real GPU required');
 const dir=path.join(__dirname,'../output/snow-gusts');fs.mkdirSync(dir,{recursive:true});
 const context=await browser.newContext({viewport:{width:1280,height:800},serviceWorkers:'block',recordVideo:{dir,size:{width:1280,height:800}}});
 const page=await context.newPage(),video=page.video();
 try{
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await bootEditorTest(page,base+'/?dev=editor&level=LVL-0036');
 await page.evaluate(()=>{window.eval('playGraphicsFeatures=null');window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});window.eval('render')();const tag=document.createElement('div');tag.id='snow-demo-label';Object.assign(tag.style,{position:'fixed',right:'20px',top:'20px',zIndex:99999,color:'white',background:'#112438',padding:'12px',font:'bold 20px sans-serif'});document.body.append(tag);});
 await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');
 for(const [name,preset] of [['Windblown before',before['Windblown Snow']],['Windblown after',api.presets.particles['Windblown Snow']],['Blizzard before',before.Blizzard],['Blizzard after',api.presets.particles.Blizzard]]){
 await page.evaluate(({name,preset})=>{const r=window.eval('worldResolver'),s=AtlasCinematicSettings.normalize(r.levelSettings('LVL-0036').cinematicLighting);s.particles.items=[AtlasCinematicSettings.instance('particles',{...s.particles.items[0],gustStrength:0,...preset,x:1086,y:362,width:2172,height:724,boundsRotation:0,shape:'rectangle'})];r.updateLevelSettings('LVL-0036',{cinematicLighting:s});window.eval('cinematicRenderer').sync();document.querySelector('#snow-demo-label').textContent=AtlasCinematicSettings.presetLabel(name);},{name,preset});
 for(let i=0;i<4;i++){await page.waitForTimeout(1000);await page.screenshot({path:path.join(dir,`motion-${name.replaceAll(' ','-')}-${i}.png`)});}
 }
 }finally{await context.close();}
 await video.saveAs(path.join(dir,'gust-comparison.webm'));
});
