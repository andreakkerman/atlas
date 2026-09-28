const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';

test('handoff particles trace the Start contour and disappear at completion',async({page},info)=>{
 // Render exact production frames without adding a production scrub/debug API.
 await page.route('**/src/bootstrap.js',route=>route.fulfill({contentType:'text/javascript',body:''}));
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(base);
 await page.evaluate(async()=>{
  const canvas=document.querySelector('#atlas-intro canvas'),button=document.querySelector('#atlas-intro-start');
  document.querySelector('#atlas-intro').dataset.state='playing';
  const gl=canvas.getContext('webgl2',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'high-performance',preserveDrawingBuffer:true});
  window.flowParticles=[];window.flowHead=null;let vertices;
  const bufferData=gl.bufferData.bind(gl),drawArrays=gl.drawArrays.bind(gl);
  gl.bufferData=(target,data,...rest)=>{
   if(data instanceof Float32Array){
    vertices=data;
    // First back ribbon's last cross-section straddles the carrier head.
    if(data.length===51000)window.flowHead=[(data[5080]+data[5095])/2,(data[5081]+data[5096])/2];
   }
   return bufferData(target,data,...rest);
  };
  gl.drawArrays=(mode,...args)=>{if(mode===gl.POINTS)window.flowParticles.push(...vertices);return drawArrays(mode,...args);};
  const images=await Promise.all(['atlas-reference-b.jpg','atlas-transparent.png','magic-reference-c.jpg'].map(name=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src='/assets/intro/'+name;})));
  const {createRenderer}=await import('/src/intro/renderer.js');
  window.flowRenderer=createRenderer(canvas,button,images);
 });
 const arrival=await page.evaluate(()=>[4.14,4.16,4.18,4.2].map(time=>{flowRenderer.render(time);return [...flowHead];}));
 const distances=arrival.slice(1).map((point,index)=>Math.hypot(point[0]-arrival[index][0],point[1]-arrival[index][1]));
 // Arrival must not ease to a standstill before the border sweep starts.
 expect(distances[2]/distances[0]).toBeGreaterThan(.65);
 for(const time of [3.8,4.18,4.35,4.55,4.75,5]){
  await page.evaluate(time=>{window.flowParticles=[];window.flowRenderer.render(time);},time);
  await page.screenshot({path:info.outputPath(`flow-${time.toFixed(2)}.png`)});
  if(time===4.75){
   // The advancing head has completed its first lap by this frame.
   const edges=await page.evaluate(time=>{
    const rect=document.querySelector('#atlas-intro-start').getBoundingClientRect();
    const size=Math.min(innerHeight*.89,innerWidth*1.03),left=(innerWidth-size)/2+Math.sin(time*.18)*.3*.003*size,top=(innerHeight-size*.99)/2-innerHeight*.035;
    const counts={top:0,right:0,bottom:0,left:0};
    for(let i=0;i<flowParticles.length;i+=5){
     const x=left+flowParticles[i]*size,y=top+flowParticles[i+1]*size;
     if(flowParticles[i+3]<.015)continue;
     if(x>=rect.left-9&&x<=rect.right+9){if(Math.abs(y-(rect.top-4))<7)counts.top++;if(Math.abs(y-(rect.bottom+4))<7)counts.bottom++;}
     if(y>=rect.top-9&&y<=rect.bottom+9){if(Math.abs(x-(rect.left-4))<7)counts.left++;if(Math.abs(x-(rect.right+4))<7)counts.right++;}
    }
    return counts;
   },time);
   for(const count of Object.values(edges))expect(count).toBeGreaterThan(20);
  }
  if(time===5)expect(await page.evaluate(()=>flowParticles.length)).toBe(0);
 }
 await page.evaluate(()=>window.flowRenderer.destroy());
 expect(errors).toEqual([]);
});
