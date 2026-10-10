const {test,expect}=require('@playwright/test');
const fs=require('node:fs'),crypto=require('node:crypto');
const {PNG}=require('playwright-core/lib/utilsBundle');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';

test('source alpha has no outer circle and the production logo pass adds none',async({page},info)=>{
 const source=fs.readFileSync('assets/intro/atlas-transparent.png'),png=PNG.sync.read(source);
 expect(crypto.createHash('sha256').update(source).digest('hex')).toBe('be3f5477482ba9fa938bedfcc6b582fcd4d8193de80cee39286775ea77bc82fb');
 let maxAlpha=0,samples=0;
 for(let y=0;y<png.height;y++)for(let x=0;x<png.width;x++){
  const dx=((x+.5)/png.width-.5)*.88,dy=((y+.5)/png.height-.4043)*.88;
  if(Math.abs(Math.hypot(dx,dy)-.293)<.003&&Math.min(Math.abs(dx),Math.abs(dy))>.035){
   samples++;maxAlpha=Math.max(maxAlpha,png.data[(y*png.width+x)*4+3]);
  }
 }
 expect(samples).toBeGreaterThan(19000);expect(maxAlpha).toBeLessThanOrEqual(1);
 // Capture before/after the actual logo draw, keeping the real texture upload,
 // mipmaps, shader, premultiplied blend and surrounding magic passes intact.
 await page.route('**/src/bootstrap.js',r=>r.fulfill({contentType:'text/javascript',body:''}));
 await page.goto(base);
 await page.evaluate(async()=>{
  const canvas=document.querySelector('#atlas-intro canvas'),button=document.querySelector('#atlas-intro-start');
  document.querySelector('#atlas-intro').dataset.state='playing';
  const gl=canvas.getContext('webgl2',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'high-performance',preserveDrawingBuffer:true});
  if(!gl)throw new Error('Real intro WebGL2 is required');
  const draw=gl.drawArrays.bind(gl);
  gl.drawArrays=(...args)=>{
   const p=gl.getParameter(gl.CURRENT_PROGRAM),emblem=gl.getUniformLocation(p,'emblem');
   if(!emblem)return draw(...args);
   const w=canvas.width,h=canvas.height,before=new Uint8Array(w*h*4),after=new Uint8Array(w*h*4);
   gl.readPixels(0,0,w,h,gl.RGBA,gl.UNSIGNED_BYTE,before);draw(...args);
   gl.readPixels(0,0,w,h,gl.RGBA,gl.UNSIGNED_BYTE,after);
   const [left,top,size]=gl.getUniform(p,gl.getUniformLocation(p,'placement'));
   let ringMax=0,ringSamples=0,logoPixels=0;
   for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const dx=((x+.5)*innerWidth/w-left)/size-.5,dy=((h-y-.5)*innerHeight/h-top)/size-.375;
    const radius=Math.hypot(dx,dy),i=(y*w+x)*4;
    const delta=Math.max(...[0,1,2].map(c=>Math.abs(after[i+c]-before[i+c])));
    if(Math.abs(radius-.293)<.003&&Math.min(Math.abs(dx),Math.abs(dy))>.035){ringSamples++;ringMax=Math.max(ringMax,delta);}
    if(radius<.285&&delta>20)logoPixels++;
   }
   window.logoProbe={ringMax,ringSamples,logoPixels};
  };
  const images=await Promise.all(['atlas-reference-b.jpg','atlas-transparent.png','magic-reference-c.jpg'].map(name=>new Promise((resolve,reject)=>{
   const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src='/assets/intro/'+name;
  })));
  window.logoRenderer=(await import('/src/intro/renderer.js')).createRenderer(canvas,button,images);
 });
 for(const time of [1.5,2.3,5]){
  const result=await page.evaluate(time=>{logoRenderer.render(time);return logoProbe;},time);
  expect(result.ringSamples).toBeGreaterThan(1000);
  expect(result.ringMax,`outer circle at ${time}s`).toBeLessThanOrEqual(1);
  expect(result.logoPixels,`logo visible at ${time}s`).toBeGreaterThan(1000);
 }
 await page.screenshot({path:info.outputPath('intro-logo-complete.png')});
 await page.evaluate(()=>logoRenderer.destroy());
});
