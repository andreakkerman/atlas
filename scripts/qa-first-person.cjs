const { chromium } = require('@playwright/test');
const fs=require('fs');
(async()=>{
 const output=process.env.ATLAS_QA_DIR||'qa-screenshots/first-person';
 const browser=await chromium.launch({channel:'chromium',headless:true,args:['--enable-unsafe-webgpu']});
 try {
 const page=await browser.newPage({viewport:{width:1419,height:867},deviceScaleFactor:1});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001'+(process.env.ATLAS_QA_VOLUME==='1'?'&threeDebug=volume':''));
 await page.waitForFunction(()=>window.eval('state.screen')==='scene');
 await page.evaluate(()=>{window.eval('voxelRenderer.updateSettings')({renderer:'3d'});window.eval('render')();});
 await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),null,{timeout:90000});
 const initial=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());
 if(initial.status!=='ready')throw Error(initial.error||'3D did not become ready');
 await page.waitForFunction(()=>window.eval('threeRenderer.snapshot')().frames>160,null,{timeout:90000});
 fs.mkdirSync(output,{recursive:true});
 let metrics=[];
 const views=[['forest',175,-.12,0],['trail',885,-.2,0],['temple',1454,-.48,.03],['gate',1800,-.25,0]];
 if(process.env.ATLAS_QA_ALL)views.push(['forest-left',322,1.25,.08],['forest-back',322,3.14,0],['trail-right',1017,-1.5,.05],['ridge',1231,-.2,0],['ridge-back',1231,3.14,0],['temple-back',1697,2.9,0],['freya',1697,-.61,.267]);
 for(const [name,x,yaw,pitch]of views){
  await page.evaluate(({x,yaw,pitch})=>{window.eval('state').worldX=x;window.eval('threeRenderer.lookAt')(yaw,pitch);window.eval('updateWorldDom')();},{x,yaw,pitch});
  await page.waitForTimeout(1700);await page.screenshot({path:`${output}/${name}.jpg`,quality:90});
  metrics.push({name,...await page.evaluate(()=>window.eval('threeRenderer.snapshot')())});
 }
 console.log(JSON.stringify({metrics,errors},null,2));fs.writeFileSync(`${output}/metrics.json`,JSON.stringify({metrics,errors},null,2));
 if(errors.length)throw Error(`Runtime capture reported ${errors.length} errors: ${errors.join('; ')}`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
