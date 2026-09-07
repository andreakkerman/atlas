const {chromium}=require('@playwright/test');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({channel:'chromium',args:['--enable-unsafe-webgpu']});
 const output='qa-screenshots/usability';fs.mkdirSync(output,{recursive:true});
 try{
  const page=await browser.newPage({viewport:{width:1419,height:867},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001');
  await page.locator('[data-graphics-action="toggle"]').click();
  const started=Date.now();await page.locator('[data-renderer-choice="3d"]').click();
  await page.evaluate(()=>{
   window.__firstFrames=[];window.__preparation=[];let last=0;
   function sample(time){
    const state=window.eval('threeRenderer.snapshot')();
    if(window.__preparation.at(-1)?.stage!==state.preparation)window.__preparation.push({stage:state.preparation,time});
    if(state.ready){if(last)window.__firstFrames.push(time-last);last=time;}
    if(window.__firstFrames.length<180)requestAnimationFrame(sample);
   }requestAnimationFrame(sample);
  });
  await page.screenshot({path:`${output}/loading.jpg`,quality:90});
  await page.waitForFunction(()=>window.eval('threeRenderer.snapshot')().ready,null,{timeout:120000});
  const loadMs=Date.now()-started;
  // Start actual input immediately: no extra frames or sleep to hide warm-up.
  const before=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());
  await page.keyboard.down('w');
  await page.mouse.move(700,350);await page.mouse.down();await page.mouse.move(1100,430,{steps:35});await page.mouse.up();
  await page.waitForTimeout(800);await page.keyboard.up('w');
  const after=await page.evaluate(()=>({x:window.eval('state.worldX'),...window.eval('threeRenderer.snapshot')()}));
  await page.screenshot({path:`${output}/first-movement.jpg`,quality:90});
  await page.waitForFunction(()=>window.__firstFrames.length>=120);
  const samples=await page.evaluate(()=>({frameMs:window.__firstFrames.slice(0,120),stages:window.__preparation}));
  const sorted=[...samples.frameMs].sort((a,b)=>a-b);
  const result={loadMs,before,after,first120Frames:{p95:sorted[Math.floor(sorted.length*.95)],max:Math.max(...sorted),over50ms:sorted.filter(v=>v>50).length},...samples,errors};
  fs.writeFileSync(`${output}/desktop.json`,JSON.stringify(result,null,2));console.log(JSON.stringify({...result,frameMs:undefined},null,2));
  if(errors.length||after.x<=175||after.yaw>=before.yaw)throw Error('Browser usability check failed');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
