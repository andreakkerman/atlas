const {test,expect}=require('@playwright/test');
test.use({hasTouch:true});
test('Atlas dual sticks retain independent touch IDs, continuous look and safe reset',async({page})=>{
 await page.goto(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173');
 await page.evaluate(()=>{
  document.body.innerHTML='<canvas id="view"></canvas><div id="move"><span data-three-stick></span></div><div id="look"><span data-three-stick></span></div><button id="action">Actie</button><button id="menu">Menu</button>';
  const e=window.e={walk:0,side:0,lx:0,ly:0,allowed:true,actions:0};
  const q=id=>document.getElementById(id);
  window.input=AtlasThreeInput.create({nativeTouch:true,canPlay:()=>e.allowed,onInputType:()=>{},onVector:(w,s)=>{e.walk=w;e.side=s;},onLook:()=>{},onLookVector:(x,y)=>{e.lx=x;e.ly=y;},interact:()=>e.actions++});
  window.bind=()=>input.attach(q('view'),q('move'),q('action'),q('look'));bind();
  window.touch=(role,type,id,dx=0,dy=0)=>{
   const target=q(role),r=target.getBoundingClientRect(),event=new Event(type,{bubbles:true,cancelable:true});
   Object.defineProperty(event,'changedTouches',{value:[{target,identifier:id,clientX:r.left+r.width/2+dx,clientY:r.top+r.height/2+dy}]});target.dispatchEvent(event);
  };
 });
 await page.evaluate(()=>{touch('move','touchstart',1,40,-40);touch('look','touchstart',2,40,-20);});
 expect(await page.evaluate(()=>e.walk)).toBe(1);expect(await page.evaluate(()=>e.side)).toBe(1);
 expect(await page.evaluate(()=>e.lx)).toBeGreaterThan(.8);expect(await page.evaluate(()=>e.ly)).toBeLessThan(0);
 await page.waitForTimeout(100);expect(await page.evaluate(()=>e.lx)).toBeGreaterThan(.8);
 await page.evaluate(()=>{bind();window.dispatchEvent(new PointerEvent('pointercancel',{pointerId:2}));});
 expect(await page.evaluate(()=>input.snapshot().lookId)).toBe(2);
 await page.evaluate(()=>touch('look','touchend',2));expect(await page.evaluate(()=>[e.walk,e.lx,e.ly])).toEqual([1,0,0]);
 await page.evaluate(()=>touch('look','touchstart',3,-40,0));
 await page.evaluate(()=>touch('move','touchcancel',1));expect(await page.evaluate(()=>[e.walk,e.side])).toEqual([0,0]);expect(await page.evaluate(()=>e.lx)).toBe(-1);
 await page.evaluate(()=>window.dispatchEvent(new Event('blur')));expect(await page.evaluate(()=>[e.walk,e.side,e.lx,e.ly])).toEqual([0,0,0,0]);
 await page.locator('#action').tap();expect(await page.evaluate(()=>e.actions)).toBe(1);
 expect(await page.evaluate(()=>document.querySelector('#menu').dispatchEvent(new Event('touchmove',{bubbles:true,cancelable:true})))).toBe(true);
 await page.evaluate(()=>{touch('look','touchstart',4,40,0);e.allowed=false;touch('look','touchmove',4,40,0);});
 expect(await page.evaluate(()=>e.lx)).toBe(0);
 await page.evaluate(()=>input.dispose());
});
