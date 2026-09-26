const {test,expect}=require('@playwright/test');
const path=require('path');
const {flybyPixel,tapPixel}=require('./flyby-hit-fixture');
require('./editor-draft-fixture').preserveEditorDrafts(test,path.join(__dirname,'..'));
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
const frame=(set,n)=>`assets/ambient/flybys/${set}/frame_${String(n).padStart(3,'0')}.png`;
async function enter(page,extra={},mode='illustrated'){
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor');
 await page.evaluate(async({extra,mode})=>{await window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});const r=window.eval('ambientFlybyRuntime');r.stopAll();const c={...window.eval('level').ambientFlybys[0],id:'hit-test',frameA:'assets/ambient/flybys/bastion_walk/frame_001.png',frames:['assets/ambient/flybys/bastion_walk/frame_001.png'],playback:'static',path:[{x:350,y:250},{x:700,y:250}],scale:.5,speed:1,depthOcclusion:false,brightness:1,contrast:1,warmth:0,tint:0,softness:0,saturation:1,mirrorX:false,faceFlightDirection:false,rotateAlongPath:false,soundTriggers:['tap'],actions:{onTap:'alpha-test'},...extra};delete c.movementEndFrame;await window.eval('setLevelAmbientFlybys')([c]);window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('state').worldX=350;window.eval('state').cameraX=window.eval('getDesiredCameraX')();window.calls=[];window.audioHits=0;window.AtlasAmbientSystem.registerAction('alpha-test',({flybyId})=>calls.push(flybyId));window.eval('audioState').unlocked=true;window.Audio=class {constructor(src){this.src=src;this.duration=2;this.currentTime=0;}addEventListener(){}play(){if(this.src?.includes('/flybys/'))audioHits++;return Promise.resolve();}pause(){}};window.eval('render')();}, {extra,mode});
 if(await page.evaluate(()=>Boolean(navigator.gpu)))await expect(page.locator('.gameShell')).toHaveClass(mode==='cinematic'?/cinematicReady/:/particleFieldsReady/);
 // Freeze animation only after the shared GPU's first presented frame; otherwise
 // the preparation cover is correctly still blocking hit-test input.
 await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
 await page.clock.install();await page.clock.pauseAt(await page.evaluate(()=>new Date(Date.now()+100).toISOString()));
 await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');r.stopAll();r.preview('hit-test');r.togglePreview('hit-test');window.eval('render')();});
}
const alpha=(page,p)=>page.evaluate(p=>window.eval('ambientFlybyRuntime').hitAlpha('hit-test',p.u,p.v),p);
test.beforeEach(async({page},info)=>{info.hitErrors=[];page.on('pageerror',e=>info.hitErrors.push(e.message));});
test.afterEach(async({},info)=>expect(info.hitErrors).toEqual([]));
test('real Bastion padding and faint fringe miss; body taps fire sound and action',async({page},info)=>{
 await enter(page);const body=await flybyPixel(page,'hit-test'),padding=await flybyPixel(page,'hit-test','padding'),fringe=await flybyPixel(page,'hit-test','fringe');
 for(const p of [padding,fringe]){expect(await alpha(page,p)).toBeLessThanOrEqual(32);await tapPixel(page,info,p);}expect(await page.evaluate(()=>[calls.length,audioHits])).toEqual([0,0]);
 expect(await alpha(page,body)).toBeGreaterThan(32);await tapPixel(page,info,body);expect(await page.evaluate(()=>[calls.length,audioHits])).toEqual([1,1]);
});
test('scale mirror rotation camera and exact threshold map current pixels',async({page})=>{
 await enter(page);for(const [scale,mirror,rotation]of [[.3,false,0],[.7,true,27],[.4,false,-30]]){
  await page.evaluate(({scale,mirror,rotation})=>{const s=document.querySelector('[data-ambient-flyby]');s.style.transform=`translate3d(350px,250px,0) translate(-50%,-50%) rotate(${rotation}deg) scale(${scale}) scaleX(${mirror?-1:1})`;document.querySelector('.worldTrack').style.transform='translateX(-40px)';},{scale,mirror,rotation});
  for(const kind of ['body','padding','fringe']){const p=await flybyPixel(page,'hit-test',kind);expect(await page.evaluate(p=>!!window.eval('ambientFlybyRuntime').hitTest('hit-test',p.x,p.y),p)).toBe(kind==='body');}
 }
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').hitTest('hit-test',-999,-999))).toBeNull();
 expect(await page.evaluate(()=>{const c=document.querySelector('[data-flyby-canvas]'),ctx=c.getContext('2d'),r=window.eval('ambientFlybyRuntime');return [31,32,33].map(a=>{const p=ctx.createImageData(1,1);p.data.set([0,0,0,a]);ctx.putImageData(p,10,10);const hit={id:'hit-test',triggerId:r.active.get('hit-test').triggerId,u:10.5/c.width,v:10.5/c.height};return r.validateHit(hit);});})).toEqual([false,false,true]);
});
for(const mode of ['illustrated','cinematic'])test(`real container depth, paused preview and debug remain alpha aware in ${mode}`,async({page},info)=>{
 await enter(page,{path:[{x:350,y:499},{x:1200,y:499}],scale:1,depthOcclusion:true,depthBias:-.025},mode);
 const points=await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),c=document.querySelector('[data-flyby-canvas]'),i=r.active.get('hit-test'),img=r.readiness.get('LVL-0034:hit-test').images[0],t=document.createElement('canvas');t.width=c.width;t.height=c.height;const ctx=t.getContext('2d');ctx.drawImage(img,0,0);const raw=ctx.getImageData(0,0,t.width,t.height).data;let visible,hidden;
  for(const bias of [-.1,-.075,-.05,-.025,-.01]){window.eval('updateAmbientFlybySetting')('hit-test','depthBias',bias);const p=c.getContext('2d').getImageData(0,0,c.width,c.height).data;visible=null;hidden=null;for(let n=0;n<p.length;n+=4)if(raw[n+3]>220){const uv={u:((n/4)%c.width+.5)/c.width,v:(Math.floor(n/4/c.width)+.5)/c.height};if(p[n+3]>220)visible=uv;if(p[n+3]===0)hidden=uv;if(visible&&hidden)break;}if(visible&&hidden)break;}return {visible,hidden,frame:i.frameIndex||0,distance:i.distance};});
 expect(points.visible).toBeTruthy();expect(points.hidden).toBeTruthy();expect(await alpha(page,points.visible)).toBeGreaterThan(32);expect(await alpha(page,points.hidden)).toBe(0);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').setDepthDebug(true));expect(await alpha(page,points.hidden)).toBe(0);await page.evaluate(()=>window.eval('ambientFlybyRuntime').setDepthDebug(false));
 await page.evaluate(()=>window.eval('updateAmbientFlybySetting')('hit-test','depthBias',1));expect(await alpha(page,points.hidden)).toBeGreaterThan(32);
 expect(await page.evaluate(()=>{const i=window.eval('ambientFlybyRuntime').active.get('hit-test');return [i.frameIndex||0,i.distance,i.paused];})).toEqual([points.frame,points.distance,true]);
 // Explicit editor preview remains tappable with its panel minimized.
 await page.keyboard.press('Control+Shift+D');await page.locator('[data-debug-action=collapse-editor-panel]').click();await tapPixel(page,info,await flybyPixel(page,'hit-test'));expect(await page.evaluate(()=>calls)).toEqual(['hit-test']);
});
test('current sequence and held final frame determine alpha without decode or frame caches',async({page})=>{
 const frames=[frame('bastion_walk',1),frame('bastion_walk',40),frame('bastion_walk_aim',60),frame('bastion_walk_aim',101)];await enter(page,{frames,playback:'once',endBehavior:'hold'});
 expect(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),i=r.active.get('hit-test'),c=document.querySelector('[data-flyby-canvas]');let count=0;const decode=HTMLImageElement.prototype.decode;HTMLImageElement.prototype.decode=function(){count++;return decode.call(this);};const snapshots=[];
  for(let f=0;f<4;f++){i.frameIndex=f;i.held=f===3;r.refreshPreviews();const p=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let mismatches=0,occupied=0;for(let y=5;y<c.height;y+=47)for(let x=5;x<c.width;x+=47){const a=p[(y*c.width+x)*4+3];if(a>32)occupied++;if((r.hitAlpha(i.id,(x+.5)/c.width,(y+.5)/c.height)>32)!==(a>32))mismatches++;}snapshots.push({mismatches,occupied});}return {snapshots,decodes:count,held:i.held};})).toMatchObject({snapshots:[{mismatches:0},{mismatches:0},{mismatches:0},{mismatches:0}],decodes:0,held:true});
});
test('transparent top candidate falls through to visible lower Flyby',async({page},info)=>{
 await enter(page);await page.evaluate(async()=>{const c=window.eval('level').ambientFlybys[0];await window.eval('setLevelAmbientFlybys')([c,{...c,id:'top',frames:['assets/ambient/flybys/bastion_walk_aim/frame_101.png']}]);const r=window.eval('ambientFlybyRuntime');r.preview('top');r.togglePreview('top');window.eval('render')();});
 const p=await page.evaluate(()=>{const a=document.querySelector('[data-ambient-flyby="hit-test"]'),b=document.querySelector('[data-ambient-flyby="top"]'),ac=a.querySelector('canvas'),bc=b.querySelector('canvas'),ap=ac.getContext('2d').getImageData(0,0,ac.width,ac.height).data,bp=bc.getContext('2d').getImageData(0,0,bc.width,bc.height).data;for(let y=4;y<ac.height-4;y++)for(let x=4;x<ac.width-4;x++)if(ap[(y*ac.width+x)*4+3]>240&&bp[(y*ac.width+x)*4+3]===0){let stable=true;for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++)if(ap[((y+dy)*ac.width+x+dx)*4+3]<220||bp[((y+dy)*ac.width+x+dx)*4+3]!==0)stable=false;if(!stable)continue;const rect=a.getBoundingClientRect(),m=new DOMMatrix(getComputedStyle(a).transform),dx=x+.5-ac.width/2,dy=y+.5-ac.height/2;return {x:(rect.left+rect.right)/2+m.a*dx+m.c*dy,y:(rect.top+rect.bottom)/2+m.b*dx+m.d*dy};}throw new Error('No overlapping alpha difference');});
 await tapPixel(page,info,p);expect(await page.evaluate(()=>calls)).toEqual(['hit-test']);
});
test('captured press follows motion but rejects despawn and newly hidden alpha',async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium','Mouse hold timing; touch taps covered separately');await enter(page);
 let p=await flybyPixel(page,'hit-test');await page.mouse.move(p.x,p.y);await page.mouse.down();await page.evaluate(()=>document.querySelector('[data-ambient-flyby]').style.translate='100px 0');await page.mouse.up();expect(await page.evaluate(()=>calls.length)).toBe(1);
 p=await flybyPixel(page,'hit-test');await page.mouse.move(p.x,p.y);await page.mouse.down();await page.evaluate(()=>{const c=document.querySelector('[data-flyby-canvas]');c.getContext('2d').clearRect(0,0,c.width,c.height);});await page.mouse.up();expect(await page.evaluate(()=>calls.length)).toBe(1);
 await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');r.active.get('hit-test').drawKey=null;r.refreshPreviews();});p=await flybyPixel(page,'hit-test');await page.mouse.move(p.x,p.y);await page.mouse.down();await page.evaluate(()=>window.eval('ambientFlybyRuntime').stopAll());await page.mouse.up();expect(await page.evaluate(()=>calls.length)).toBe(1);
});

test('legacy A/B selection and softness use displayed alpha; interaction never decodes assets',async({page})=>{
 await enter(page,{frames:undefined,playback:undefined,frameB:frame('bastion_walk_aim',101)});
 const result=await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),s=document.querySelector('[data-ambient-flyby]'),ready=r.readiness.get('LVL-0034:hit-test');let reads=0,decodes=0,requests=0;const read=CanvasRenderingContext2D.prototype.getImageData;CanvasRenderingContext2D.prototype.getImageData=function(...a){reads++;return read.apply(this,a);};const decode=HTMLImageElement.prototype.decode;HTMLImageElement.prototype.decode=function(){decodes++;return decode.call(this);};const fetch=window.fetch;window.fetch=function(...a){if(String(a[0]).includes('/flybys/'))requests++;return fetch.apply(this,a);};const alphas=[];
  for(const tag of ['a','b']){s.dataset.frame=tag;const img=ready.images[tag==='b'?1:0],c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);const pixels=ctx.getImageData(0,0,c.width,c.height).data;let mismatch=0,count=0;for(let y=4;y<c.height;y+=47)for(let x=4;x<c.width;x+=47){const alpha=pixels[(y*c.width+x)*4+3];count+=alpha>32?1:0;if(r.hitAlpha('hit-test',(x+.5)/c.width,(y+.5)/c.height)!==alpha)mismatch++;}alphas.push({mismatch,count});}
  window.hitReads=()=>reads;return {alphas,decodes,requests};});
 expect(result.decodes).toBe(0);expect(result.requests).toBe(0);expect(result.alphas.map(x=>x.mismatch)).toEqual([0,0]);expect(result.alphas[0].count).not.toBe(result.alphas[1].count);
 const reads=await page.evaluate(()=>hitReads());await page.evaluate(()=>window.eval('ambientFlybyRuntime').togglePreview('hit-test'));await page.clock.runFor(200);expect(await page.evaluate(()=>hitReads())).toBe(reads);
});
test('softness samples alpha without RGB influence or debug-overlay hits',async({page})=>{
 await enter(page);expect(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),c=document.querySelector('[data-flyby-canvas]'),ctx=c.getContext('2d'),config=window.eval('level').ambientFlybys[0];ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle='white';ctx.fillRect(20,20,30,30);const u=19.5/c.width,v=35.5/c.height;const hard=r.hitAlpha('hit-test',u,v);config.softness=2;const soft=r.hitAlpha('hit-test',u,v);config.brightness=0;config.tint=-1;return {hard,soft,rgbInvariant:r.hitAlpha('hit-test',u,v)===soft};})).toMatchObject({hard:0,rgbInvariant:true,soft:expect.any(Number)});
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').hitAlpha('hit-test',19.5/640,35.5/360))).toBeGreaterThan(32);
});
