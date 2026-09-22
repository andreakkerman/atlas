const {test,expect}=require('@playwright/test');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];
for(const asset of ['arc_wasp','arc_snitch','common-swift'])test(`${asset} remains continuous through walks, turns and camera settling`,async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base);
 await page.evaluate(async asset=>{
  await window.eval('selectLevel')('LVL-0032',{startImmediately:true,recordStart:false});
  window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});
  const s=window.eval('state'),r=window.eval('ambientFlybyRuntime'),c=window.eval('level').ambientFlybys[0];
  s.worldX=1100;s.cameraX=window.eval('getDesiredCameraX')();
  c.frameA=`assets/ambient/flybys/${asset}/${asset==='arc_wasp'?'awc_wasp.png':asset==='arc_snitch'?'arc_snitch.png':'common-swift-a.png'}`;
  c.frameB=asset==='common-swift'?'assets/ambient/flybys/common-swift/common-swift-b.png':null;
  c.soundTriggers=[];c.speed=1;c.startDelayMs=0;c.path=[{x:1200,y:250},{x:1700,y:250}];
  await r.prepareLevel(window.eval('level'));r.stopAll();window.eval('render')();r.preview(c.id);
  await new Promise(requestAnimationFrame);
  const node=document.querySelector('[data-ambient-flyby]'),img=node.querySelector('img'),instance=r.active.get(c.id);
  window.continuity={samples:[],faults:[],node,img,instance,id:c.id};
  const sample=()=>{
   const q=window.continuity,n=document.querySelector('[data-ambient-flyby]'),a=r.active.get(c.id),state=window.eval('state');
   if(!n){q.faults.push({missing:true});return;}
   const css=getComputedStyle(n),b=n.getBoundingClientRect();
   const row={locomotion:window.eval('locomotion').snapshot().state,camera:state.cameraX,progress:a?.progress,elapsed:a?.elapsed,active:n.dataset.active,opacity:css.opacity,transform:css.transform,x:b.x,y:b.y,worldScreenX:b.x+state.cameraX*a.scaleX,visibleFrame:[...n.querySelectorAll('img')].some(img=>getComputedStyle(img).visibility==='visible'),src:n.querySelector('img')?.src,sameNode:n===node,sameImage:n.querySelector('img')===img,sameInstance:a===instance};
   const prev=q.samples.at(-1);q.samples.push(row);
   if(!row.sameNode||!row.sameImage||!row.sameInstance||!row.visibleFrame||row.active!=='true'||row.opacity!=='1'||row.transform==='none'||(prev&&(row.progress<prev.progress||Math.abs(row.worldScreenX-prev.worldScreenX)>2)))q.faults.push(row);
  };
  window.continuity.observer=new MutationObserver(sample);window.continuity.observer.observe(document.getElementById('app'),{childList:true,subtree:true});
  const frame=()=>{sample();window.continuity.raf=requestAnimationFrame(frame);};frame();
 },asset);
 for(const distance of [220,-180,20]){
  await page.evaluate(distance=>{const s=window.eval('state');window.eval('beginFreeWalk')({x:s.worldX+distance,y:s.worldY});},distance);
  await expect.poll(()=>page.evaluate(()=>window.eval('state').movement===null),{timeout:10000}).toBe(true);
 }
 // Reverse while walking: changing direction from idle does not use a turn clip.
 await page.evaluate(()=>{const s=window.eval('state');window.eval('beginFreeWalk')({x:s.worldX+400,y:s.worldY});});
 await expect.poll(()=>page.evaluate(()=>window.eval('locomotion').snapshot().state)).toBe('walkRightLoop');
 await page.evaluate(()=>{const s=window.eval('state');window.eval('beginFreeWalk')({x:s.worldX-180,y:s.worldY});});
 await expect.poll(()=>page.evaluate(()=>window.eval('state').movement===null),{timeout:10000}).toBe(true);
 const result=await page.evaluate(()=>{const q=window.continuity;q.observer.disconnect();cancelAnimationFrame(q.raf);return {faults:[q.faults.find(s=>s.locomotion==="idle" && s.opacity==="0"),...q.faults.slice(0,2)].filter(Boolean),states:[...new Set(q.samples.map(s=>s.locomotion))],cameras:[Math.min(...q.samples.map(s=>s.camera)),Math.max(...q.samples.map(s=>s.camera))],srcs:[...new Set(q.samples.map(s=>s.src))],frames:q.node.querySelectorAll('img').length};});
 expect(result.faults).toEqual([]);
 expect(result.states).toContain('idle');expect(result.states.some(s=>s.endsWith('ToIdle')),JSON.stringify(result.states)).toBe(true);expect(result.states.some(s=>s.startsWith('turn')),JSON.stringify(result.states)).toBe(true);
 expect(result.cameras[1]-result.cameras[0]).toBeGreaterThan(10);
 expect(result.srcs).toHaveLength(1);expect(result.frames).toBe(asset==='common-swift'?2:1);expect(errors).toEqual([]);
 await page.evaluate(()=>window.eval('returnToMenu')());
 expect(await page.evaluate(()=>window.continuity.node.isConnected)).toBe(false);
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').active.size)).toBe(0);
});
