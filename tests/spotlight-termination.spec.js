const {test,expect}=require('@playwright/test');
const {bootEditorTest}=require('./editor-workspace-helpers');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';

test('spotlight terminates elliptically with a gradual alpha tail inside the full sweep bounds',async({page},info)=>{
 await bootEditorTest(page,base+'/?dev=editor');
 const metrics=await page.evaluate(async()=>{
  const E=AtlasSceneEffects,F=AtlasFlybyFX,doc=F.empty('arc_snitch.png',501,282);
  const e=E.defaultInstance('blue-white-spotlight',null,doc.sourceSize);delete e.layerSlot;delete e.groupId;e.plane='behind';e.seed=53;
  Object.assign(e.geometry,{x:270,y:245,directionDeg:90,length:620,width:12,spreadDeg:28});e.overrides={sweepEnabled:false,flickerAmount:0};doc.effects=[e];
  const profiles=[];
  for(const quality of ['high','balanced','reduced']){
   const fx=F.create(doc,{quality,reducedMotion:false});fx.draw(0,true);const p=fx.planes[0],ctx=p.canvas.getContext('2d'),data=ctx.getImageData(0,0,p.canvas.width,p.canvas.height).data;
   const alpha=(x,y)=>data[(Math.round(y-p.box.y)*p.canvas.width+Math.round(x-p.box.x))*4+3];
   const lastAt=x=>{let last=0;for(let y=0;y<620;y++)if(alpha(x,245+y)>=2)last=y;return last;};
   const tail=Array.from({length:Math.round(620*.4)},(_,i)=>alpha(270,245+Math.round(620*.6)+i));
   const half=12/2+620*Math.tan(28*Math.PI/360);
   const cached=p.items[0]._searchlightCanvas;fx.draw(.5,true);
   profiles.push({quality,center:lastAt(270),side:lastAt(270+half*.5),upper:alpha(270,245+62),tailStart:tail[0],tailEnd:tail.at(-1),maxStep:Math.max(...tail.slice(1).map((v,i)=>Math.abs(v-tail[i]))),maxRise:Math.max(...tail.slice(1).map((v,i)=>v-tail[i])),terminal:alpha(270,245+619),cacheReused:cached===p.items[0]._searchlightCanvas,cachePixels:cached.width*cached.height});fx.dispose();
  }
  // Compare cropped planes with an oversized direct draw at rotated sweep
  // poses: any lost pixel exposes insufficient allocation, not just a clear rim.
  let outside=0;
  for(const softness of [0,2])for(const direction of [-137,0,90,270])for(const phase of [-90,0,90]){
   e.geometry.directionDeg=direction;e.overrides={softness,sweepEnabled:true,sweepAmplitude:65,sweepPhase:phase,flickerAmount:0};
   const r=E.resolve(e,{}, {quality:'balanced'}),box=F.bounds(r),canvas=document.createElement('canvas');canvas.width=box.width+64;canvas.height=box.height+64;
   const c=canvas.getContext('2d');c.translate(32-box.x,32-box.y);E.drawResolved(c,r,0);const d=c.getImageData(0,0,canvas.width,canvas.height).data;
   for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++)if(x<32||y<32||x>=canvas.width-32||y>=canvas.height-32)outside+=d[(y*canvas.width+x)*4+3];canvas.width=canvas.height=0;r._searchlightCanvas.width=r._searchlightCanvas.height=0;
  }
  e.geometry.directionDeg=90;e.overrides={sweepEnabled:false,flickerAmount:0};
  const sheet=document.createElement('canvas');sheet.width=1000;sheet.height=760;sheet.style='position:fixed;inset:0;z-index:99999;width:1000px;height:760px';document.body.append(sheet);
  const c=sheet.getContext('2d'),img=new Image();img.src='assets/ambient/flybys/arc_snitch/arc_snitch.png';await img.decode();
  for(const [x,background] of [[0,'#527d99'],[500,'#15212c']]){
   c.fillStyle=background;c.fillRect(x,0,500,760);c.fillStyle='#fff';c.font='17px sans-serif';c.fillText('Soft beam termination · 75% and 35%',x+20,28);
   for(const [dx,dy,scale,phase] of [[0,45,.75,0],[300,75,.35,22]]){
    e.overrides.sweepEnabled=true;e.overrides.sweepAmplitude=22;e.overrides.sweepPhase=phase?90:0;
    const fx=F.create(doc,{reducedMotion:false});fx.draw(0,true);c.save();c.translate(x+dx,dy);c.scale(scale,scale);for(const p of fx.planes)if(p.items.length)c.drawImage(p.canvas,p.box.x,p.box.y);c.drawImage(img,0,0);c.restore();fx.dispose();
   }
  }
  return {profiles,outside};
 });
 await info.attach('alpha-profiles',{body:JSON.stringify(metrics,null,2),contentType:'application/json'});
 for(const profile of metrics.profiles){
  expect(profile.upper).toBeGreaterThan(100);expect(profile.tailStart).toBeGreaterThan(20);
  expect(profile.center-profile.side).toBeGreaterThan(620*.035);
  expect(profile.center).toBeGreaterThan(620*.8);expect(profile.center).toBeLessThan(620*.98);
  expect(profile.tailEnd).toBe(0);expect(profile.terminal).toBe(0);
  expect(profile.maxStep).toBeLessThanOrEqual(4);expect(profile.maxRise).toBeLessThanOrEqual(1);
  expect(profile.cacheReused).toBe(true);expect(profile.cachePixels).toBeLessThanOrEqual(256*512);
 }
 expect(metrics.outside).toBe(0);
 await page.screenshot({path:info.outputPath('spotlight-soft-termination.png')});
});
