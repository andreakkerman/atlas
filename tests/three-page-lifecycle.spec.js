const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';

test('pagehide cancels a late device and prevents restart until pageshow',async({page})=>{
 await page.addInitScript(()=>{
  window.adapterRequests=0;window.deviceRequested=false;window.destroyed=0;
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>{
   window.adapterRequests++;return {requestDevice:()=>{window.deviceRequested=true;return new Promise(resolve=>window.resolveDevice=resolve);}};
  }}});
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor&level=LVL-0001');
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="3d"]').click();
 await expect.poll(()=>page.evaluate(()=>window.deviceRequested)).toBe(true);
 await page.evaluate(()=>{
  dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));
  window.resolveDevice({destroy:()=>window.destroyed++});
 });
 await expect.poll(()=>page.evaluate(()=>window.destroyed)).toBe(1);
 await page.evaluate(async()=>{window.eval('render')();await window.eval('threeRenderer.sync')();});
 expect(await page.evaluate(()=>window.adapterRequests)).toBe(1);
 expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().status)).toBe('idle');
 await page.evaluate(()=>dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));
 await expect.poll(()=>page.evaluate(()=>window.adapterRequests)).toBe(2);
 await page.locator('[data-three-recover]').click();
 await expect(page.locator('.worldArt')).toBeVisible();
 await page.getByRole('button',{name:'Terug naar menu'}).click();
 await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
});

test('real navigation destroys the ready device and permits a new 3D session',async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1','Requires real WebGPU; not physical Safari.');
 test.setTimeout(300000);
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});
  const destroy=GPUDevice.prototype.destroy;
  GPUDevice.prototype.destroy=function(...args){localStorage.setItem('qa-destroyed',String(Number(localStorage.getItem('qa-destroyed')||0)+1));return Reflect.apply(destroy,this,args);};
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor&level=LVL-0001');
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="3d"]').click();
 await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status),{timeout:240000}).toBe('ready');
 await page.goto('about:blank');
 await page.goto(base+'/?dev=editor&level=LVL-0001');
 expect(await page.evaluate(()=>Number(localStorage.getItem('qa-destroyed')))).toBeGreaterThanOrEqual(1);
 await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status),{timeout:240000}).toBe('ready');
 await expect(page.locator('[data-three-canvas]')).toBeVisible();
 await page.getByRole('button',{name:'Terug naar menu'}).click();
 await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
});
