const {chromium}=require('@playwright/test');
(async()=>{
 const browser=await chromium.launch({channel:'chromium',args:['--enable-unsafe-webgpu']});
 try{
  const page=await browser.newPage({viewport:{width:1419,height:867}});
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001');
  await page.locator('[data-graphics-action="toggle"]').click();
  await page.locator('[data-renderer-choice="3d"]').click();
  await page.waitForFunction(()=>window.eval('threeRenderer.snapshot')().ready,null,{timeout:120000});
  async function state(){return page.evaluate(()=>({x:window.eval('state.worldX'),yaw:window.eval('threeRenderer.snapshot')().yaw,menu:window.eval('graphicsSettingsOpen'),moving:window.eval('state.moving'),focus:document.activeElement.tagName}));}
  const before=await state();
  await page.keyboard.down('w');await page.waitForTimeout(600);await page.keyboard.up('w');
  const openKeyboard=await state();
  await page.mouse.move(700,400);await page.mouse.down();await page.mouse.move(900,400,{steps:8});await page.mouse.up();
  const openMouse=await state();
  if(await page.locator('[data-graphics-action="close"]').count())await page.locator('[data-graphics-action="close"]').click();
  await page.keyboard.down('w');await page.waitForTimeout(600);await page.keyboard.up('w');
  console.log(JSON.stringify({before,openKeyboard,openMouse,closedKeyboard:await state()},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
