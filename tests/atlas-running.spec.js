const {test,expect}=require('@playwright/test');
test('Left Shift running is opt-in, releases cleanly and does not capture Right Shift',async({page})=>{
 await page.goto(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173');
 await page.evaluate(()=>{
  document.body.innerHTML='<canvas id="view"></canvas><input id="answer">';
  const keys=window.runKeys=new Set();window.runAllowed=true;
  window.runInput=AtlasThreeInput.create({keys,canPlay:()=>true,canRun:()=>window.runAllowed,onVector:()=>{},onLook:()=>{},onInputType:()=>{},interact:()=>{}});
  runInput.attach(document.querySelector('#view'));
 });
 await page.keyboard.down('ShiftRight');expect(await page.evaluate(()=>runKeys.size)).toBe(0);await page.keyboard.up('ShiftRight');
 await page.keyboard.down('ShiftLeft');expect(await page.evaluate(()=>runKeys.has('ShiftLeft'))).toBe(true);
 await page.keyboard.up('ShiftLeft');expect(await page.evaluate(()=>runKeys.size)).toBe(0);
 await page.keyboard.down('ShiftLeft');await page.evaluate(()=>window.dispatchEvent(new Event('blur')));expect(await page.evaluate(()=>runKeys.size)).toBe(0);await page.keyboard.up('ShiftLeft');
 await page.evaluate(()=>window.runAllowed=false);await page.keyboard.down('ShiftLeft');expect(await page.evaluate(()=>runKeys.size)).toBe(0);await page.keyboard.up('ShiftLeft');
 await page.evaluate(()=>window.runAllowed=true);await page.locator('#answer').focus();await page.keyboard.down('ShiftLeft');expect(await page.evaluate(()=>runKeys.size)).toBe(0);await page.keyboard.up('ShiftLeft');
 await page.evaluate(()=>runInput.dispose());
});
test('only the ready Atlas hint disappears after five seconds, including reduced motion',async({page})=>{
 await page.goto(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173');
 await page.evaluate(()=>{document.body.innerHTML='<div class="threeReady"><section data-renderer="atlas-3d"><div class="threeControls" id="atlas">Atlas hint</div></section><section data-renderer="3d"><div class="threeControls" id="other">Other hint</div></section></div>';});
 await expect(page.locator('#atlas')).toBeVisible();await expect(page.locator('#other')).toBeVisible();
 await page.waitForTimeout(1500);await expect(page.locator('#atlas')).toBeVisible();
 await expect(page.locator('#atlas')).toBeHidden({timeout:5000});await expect(page.locator('#other')).toBeVisible();
});
test('non-iPad Atlas walks normally, runs only with Left Shift and returns to walking',async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1');test.setTimeout(180000);
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto((process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173')+'/?dev=editor&level=LVL-0001&debug3d=1');
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="atlas-3d"]').click();
 const snap=()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')());
 await expect.poll(async()=>(await snap()).status,{timeout:120000}).toBe('ready');
 const start=await snap();await page.keyboard.down('w');
 await expect.poll(async()=>(await snap()).movement.speed).toBe(2.7);
 await page.keyboard.down('ShiftRight');await page.waitForTimeout(100);expect((await snap()).movement.speed).toBe(2.7);await page.keyboard.up('ShiftRight');
 await page.keyboard.down('ShiftLeft');await expect.poll(async()=>(await snap()).movement.speed).toBe(4.8);
 await page.keyboard.up('ShiftLeft');await expect.poll(async()=>(await snap()).movement.speed).toBe(2.7);
 await page.keyboard.up('w');expect((await snap()).camera[2]).toBeLessThan(start.camera[2]);
 await page.waitForTimeout(100);const stopped=await snap();await page.waitForTimeout(150);expect((await snap()).camera).toEqual(stopped.camera);
 await expect(page.locator('.threeControls')).toBeHidden({timeout:6000});
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="illustrated"]').click();
});
