const {test,expect}=require('@playwright/test');
const path=require('path');
require('./editor-draft-fixture').preserveEditorDrafts(test,path.join(__dirname,'..'));
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
for(const mode of ['illustrated','cinematic'])test(`Graphics reach ${mode} output and neutral legacy appearance is unchanged`,async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{window.flybyUploads=[];if(typeof GPUQueue!=='undefined'){const copy=GPUQueue.prototype.copyExternalImageToTexture;GPUQueue.prototype.copyExternalImageToTexture=function(src,dst,size){if(src.source?.hasAttribute?.('data-flyby-canvas'))window.flybyUploads.push({revision:src.source.dataset.revision,texture:dst.texture});return copy.call(this,src,dst,size);};}});
 await page.goto(base+'/?dev=editor');
 await page.evaluate(async mode=>{await window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});const r=window.eval('ambientFlybyRuntime');r.stopAll();const c={...window.eval('level').ambientFlybys[0],path:[{x:350,y:250},{x:750,y:250}],scale:.8,speed:10,depthOcclusion:false,soundTriggers:[],playback:'static',saturation:1,softness:0};for(const k of ['brightness','contrast','warmth','tint'])delete c[k];await window.eval('setLevelAmbientFlybys')([c]);window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('walkPathEditor').selectedObjectType='flyby';window.eval('walkPathEditor').selectedObjectId=c.id;window.eval('walkPathEditor').editorMode='graphics';window.eval('render')();},mode);
 await page.keyboard.press('Control+Shift+D');await page.evaluate(()=>window.eval('ambientFlybyRuntime').stopAll());
 if(mode==='cinematic'&&info.project.name==='desktop-chromium')await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);
 await page.locator('[data-debug-action="preview-flyby"]').first().click();await page.locator('[data-debug-action="preview-flyby"]').first().click();
 const pixels=()=>page.evaluate(()=>{const c=document.querySelector('[data-flyby-canvas]');return c.toDataURL();});
 const missing=await pixels();await page.evaluate(()=>{const id=window.eval('level').ambientFlybys[0].id;for(const [k,v]of Object.entries({brightness:1,contrast:1,warmth:0,tint:0}))window.eval('updateAmbientFlybySetting')(id,k,v);});expect(await pixels()).toEqual(missing);
 // Freeze every scene animation before comparing actual screen pixels.
 await page.clock.install();await page.clock.pauseAt(await page.evaluate(()=>new Date(Date.now()+100).toISOString()));
 await page.evaluate(()=>document.querySelector('[data-developer-tools]').style.visibility='hidden');
 const canvas=page.locator('[data-flyby-canvas]');const box=await canvas.boundingBox();const viewport=page.viewportSize();const clip={x:Math.max(0,box.x),y:Math.max(0,box.y),width:Math.min(box.width,viewport.width-Math.max(0,box.x)),height:Math.min(box.height,viewport.height-Math.max(0,box.y))};
 const before=await page.screenshot({clip});
 await page.evaluate(()=>window.eval('updateAmbientFlybySetting')(window.eval('level').ambientFlybys[0].id,'brightness',.25));
 await page.clock.runFor(64);const after=await page.screenshot({clip});
 // Decode screenshots, not source frames. Compare displayed image output.
 const difference=await page.evaluate(async({a,b})=>{const load=async s=>{const i=new Image();i.src='data:image/png;base64,'+s;await i.decode();const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const ctx=c.getContext('2d');ctx.drawImage(i,0,0);return ctx.getImageData(0,0,c.width,c.height).data;};const x=await load(a),y=await load(b);let changed=0;for(let i=0;i<x.length;i+=4)if(Math.abs(x[i]-y[i])+Math.abs(x[i+1]-y[i+1])+Math.abs(x[i+2]-y[i+2])>10)changed++;return changed;},{a:before.toString('base64'),b:after.toString('base64')});
 expect(difference).toBeGreaterThan(100);
 if(mode==='cinematic'&&info.project.name==='desktop-chromium'){
  expect(await page.evaluate(()=>{const c=document.querySelector('[data-flyby-canvas]');return flybyUploads.some(u=>u.revision===c.dataset.revision);})).toBe(true);
  expect(await page.evaluate(()=>new Set(flybyUploads.map(u=>u.texture)).size)).toBe(1);
 }
 expect(errors).toEqual([]);
});
