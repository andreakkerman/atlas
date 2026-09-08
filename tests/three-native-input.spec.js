const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
test.use({hasTouch:true});
test('WebKit native touch IDs drive movement and look independently of pointer capture',async({page})=>{
 await page.goto(base);await page.waitForFunction(()=>Boolean(window.AtlasThreeInput));
 await page.evaluate(()=>{
  document.body.innerHTML='<button id="menu">Menu</button><input id="answer"><canvas id="view" style="width:400px;height:250px;touch-action:none"></canvas><div id="pad" style="width:112px;height:112px;touch-action:none"><span data-three-stick></span></div><button id="action">Actie</button>';
  const canvas=document.querySelector('#view'),pad=document.querySelector('#pad'),action=document.querySelector('#action');
  window.evidence={x:0,yaw:0,actions:0,menu:0,allowed:true,walk:0};
  const e=window.evidence;
  window.controls=window.AtlasThreeInput.create({nativeTouch:true,canPlay:()=>e.allowed,onVector:w=>e.walk=w,onLook:dx=>e.yaw+=dx,onInputType:()=>{},interact:()=>e.actions++});
  window.bind=()=>window.controls.attach(canvas,pad,action);window.bind();
  document.querySelector('#menu').onclick=()=>e.menu++;
  const tick=()=>{if(e.allowed)e.x+=e.walk;else window.controls.reset('guard');requestAnimationFrame(tick);};requestAnimationFrame(tick);
  const active=new Map();
  window.touch=(type,role,id,dx=0,dy=0)=>{
   const target=document.querySelector(role==='move'?'#pad':'#view'),r=target.getBoundingClientRect();
   const touch={identifier:id,target,clientX:r.left+r.width/2+dx,clientY:r.top+r.height/2+dy};
   if(type==='touchend'||type==='touchcancel')active.delete(id);else active.set(id,touch);
   // WebKit exposes Touch without a public constructor. Model the multi-touch
   // sequence separately from the real browser tap checked below.
   const event=new Event(type,{bubbles:true,cancelable:true});
   Object.defineProperties(event,{touches:{value:[...active.values()]},targetTouches:{value:[...active.values()].filter(t=>t.target===target)},changedTouches:{value:[touch]}});
   return target.dispatchEvent(event);
  };
 });
 // Native browser tap reaches the same touch listener (no custom capture API).
 await page.locator('#pad').tap();expect(await page.evaluate(()=>window.controls.snapshot().counts.down)).toBeGreaterThan(0);
 await page.evaluate(()=>{window.touch('touchstart','move',41);window.touch('touchmove','move',41,0,-40);window.touch('touchstart','look',77);window.touch('touchmove','look',77,35,5);});
 await expect.poll(()=>page.evaluate(()=>window.evidence.x)).toBeGreaterThan(3);
 expect(await page.evaluate(()=>window.evidence.yaw)).toBe(35);
 await page.evaluate(()=>{for(let i=0;i<5;i++)window.bind();window.dispatchEvent(new PointerEvent('lostpointercapture',{pointerId:41}));window.dispatchEvent(new PointerEvent('pointercancel',{pointerId:41}));});
 const state=await page.evaluate(()=>window.controls.snapshot());
 expect(state.moveId).toBe(41);expect(state.lookId).toBe(77);expect(state.walk).toBe(1);expect(state.counts.rebind).toBe(1);
 await page.evaluate(()=>window.touch('touchend','look',77));expect(await page.evaluate(()=>window.controls.snapshot().walk)).toBe(1);
 await page.evaluate(()=>window.touch('touchcancel','move',41));expect(await page.evaluate(()=>window.controls.snapshot().walk)).toBe(0);
 const stopped=await page.evaluate(()=>window.evidence.x);await page.waitForTimeout(100);expect(await page.evaluate(()=>window.evidence.x)).toBe(stopped);
 await page.locator('#action').tap();expect(await page.evaluate(()=>window.evidence.actions)).toBe(1);
 await page.locator('#menu').tap();expect(await page.evaluate(()=>window.evidence.menu)).toBe(1);
 await page.locator('#answer').tap();await page.locator('#answer').fill('42');await expect(page.locator('#answer')).toHaveValue('42');
 await page.evaluate(()=>{window.touch('touchstart','move',90);window.touch('touchmove','move',90,0,-40);window.evidence.allowed=false;});
 await expect.poll(()=>page.evaluate(()=>window.controls.snapshot().walk)).toBe(0);
 expect(await page.evaluate(()=>document.querySelector('#menu').dispatchEvent(new Event('touchmove',{bubbles:true,cancelable:true})))).toBe(true);
 await page.evaluate(()=>window.controls.dispose());
 await page.locator('#menu').tap();expect(await page.evaluate(()=>window.evidence.menu)).toBe(2);
});
