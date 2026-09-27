const {test,expect}=require('@playwright/test');
const path=require('node:path');
const fs=require('node:fs');
async function pixelsAt(page,t){
 return page.evaluate(t=>{
  atlasLab.seek(t);const source=document.getElementById('scene'),c=document.createElement('canvas');c.width=source.width;c.height=source.height;
  const ctx=c.getContext('2d');ctx.drawImage(source,0,0);const pixels=ctx.getImageData(0,0,c.width,c.height).data;
  const [ox,oy,size]=atlasLab.state.layout,dpr=c.width/innerWidth;
  function mean(x1,y1,x2,y2,channel){let sum=0,count=0;for(let y=Math.ceil((oy+size*y1)*dpr);y<(oy+size*y2)*dpr;y++)for(let x=Math.ceil((ox+size*x1)*dpr);x<(ox+size*x2)*dpr;x++){sum+=pixels[(y*c.width+x)*4+channel];count++;}return sum/count;}
  const letters=[[.19,.31],[.335,.45],[.465,.575],[.59,.705],[.735,.81]];
  const offset=atlasLab.state.wordmarkOffset;
  return {glyph:mean(.42,.287,.58,.46,1),letters:letters.map(([a,b])=>mean(a,.715+offset,b,.815+offset,0)),lowerCyan:mean(.49,.875,.61,.95,1)-mean(.49,.875,.61,.95,0)};
 },t);
}
test('deterministic art direction captures and timeline',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto('/?clean&t=0');await page.waitForFunction(()=>window.atlasLab?.ready);
 const signatures={};
 // Approved default starts arrival immediately; only t=0 is an empty frame.
 for(const [name,t] of [['empty',0],['arrival',.9],['formation',1.65],['emblem',2.34],['glyph',2.53],['wordmark',3.35],['continuation',3.95],['start',4.4],['settled',5]]){
  await page.evaluate(t=>atlasLab.seek(t),t);
  await page.screenshot({path:path.join(__dirname,'captures',`${info.project.name}-${name}.png`)});
  await expect(page.locator('#error')).toBeHidden();
  expect(await page.evaluate(()=>atlasLab.ready)).toBe(true);
  expect(await page.evaluate(()=>atlasLab.state.time)).toBe(t);
  signatures[name]=await page.evaluate(()=>{
   atlasLab.seek(atlasLab.state.time);
   const source=document.getElementById('scene'),copy=document.createElement('canvas');copy.width=source.width;copy.height=source.height;
   const ctx=copy.getContext('2d');ctx.drawImage(source,0,0);const data=ctx.getImageData(0,0,copy.width,copy.height).data;
   let gold=0,cyan=0,r=0,g=0,b=0;
   for(let i=0;i<data.length;i+=4){const [red,green,blue]=data.subarray(i,i+3);r+=red;g+=green;b+=blue;if(red>95&&green>65&&red>blue*1.7)gold++;if(green>100&&blue>100&&green>red*1.4)cyan++;}
   return {gold,cyan,r,g,b};
  });
 }
 expect(signatures.empty.gold).toBe(0);expect(signatures.empty.cyan).toBe(0);expect(signatures.empty.g).toBeGreaterThan(signatures.empty.r*3);
 expect(signatures.arrival.cyan).toBeGreaterThan(1000);expect(signatures.formation.gold).toBeGreaterThan(1000);
 expect(signatures.settled.gold).toBeGreaterThan(signatures.formation.gold*1.5);expect(signatures.formation.cyan).toBeGreaterThan(signatures.settled.cyan*1.5);
 await page.evaluate(()=>atlasLab.seek(1.65));const first=await page.locator('#scene').screenshot();await page.evaluate(()=>{atlasLab.seek(.9);atlasLab.seek(1.65);});const second=await page.locator('#scene').screenshot();if(!second.equals(first)){fs.writeFileSync(path.join(__dirname,'captures','repeat-first.png'),first);fs.writeFileSync(path.join(__dirname,'captures','repeat-second.png'),second);}expect(second.equals(first), 'Repeated timeline capture is byte-identical').toBe(true);await page.evaluate(()=>atlasLab.seek(5));
 await expect(page.locator('#start')).toBeVisible();
 await expect(page.locator('#start')).toHaveAttribute('aria-disabled','true');
 await page.keyboard.press('h');await expect(page.locator('#tools')).toBeVisible();
 await page.locator('#replay').click();await expect.poll(()=>page.evaluate(()=>atlasLab.state.time)).toBeGreaterThan(.2);
 await page.locator('#pause').click();const paused=await page.evaluate(()=>atlasLab.state.time);await page.waitForTimeout(100);expect(await page.evaluate(()=>atlasLab.state.time)).toBe(paused);
 await page.locator('#settled').click();expect(await page.evaluate(()=>atlasLab.state.stage)).toBe('Settled');
 expect(errors).toEqual([]);
});

test('five-second polish beats, unified wordmark and clean contours',async({page,browser},info)=>{
 await page.goto('/?clean&t=0');await page.waitForFunction(()=>atlasLab?.ready);
 const quiet=await pixelsAt(page,2.34),peak=await pixelsAt(page,2.53),settled=await pixelsAt(page,5);
 expect(peak.glyph).toBeGreaterThan(quiet.glyph*1.5);
 // User-selected peak=1, final=1.3 intentionally makes the settled glyph brighter.
 expect(settled.glyph).toBeGreaterThan(peak.glyph*1.08);
 const before=await pixelsAt(page,3.05),mid=await pixelsAt(page,3.35),after=await pixelsAt(page,3.65);
 const ratios=mid.letters.map((v,i)=>(v-before.letters[i])/(after.letters[i]-before.letters[i]));
 for(const ratio of ratios){expect(ratio).toBeGreaterThan(.43);expect(ratio).toBeLessThan(.57);}
 expect(Math.max(...ratios)-Math.min(...ratios)).toBeLessThan(.06);
 const continuation=await pixelsAt(page,4.25);expect(continuation.lowerCyan).toBeGreaterThan(settled.lowerCyan+1);
 await page.evaluate(()=>atlasLab.seek(4.1));await expect(page.locator('#start')).toBeHidden();
 await page.evaluate(()=>atlasLab.seek(4.4));expect(Number(await page.locator('#start').evaluate(e=>getComputedStyle(e).opacity))).toBeCloseTo(.5,1);
 await page.evaluate(()=>atlasLab.seek(4.6));await expect(page.locator('#start')).toHaveCSS('opacity','1');
 // Matching desktop and Retina contour crops for inspection, without changing geometry.
 for(const dpr of [1,2]){
  const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:dpr,reducedMotion:'no-preference'});
  const detail=await context.newPage();await detail.goto('http://127.0.0.1:4186/?clean&t=5');await detail.waitForFunction(()=>atlasLab?.ready);
  await detail.screenshot({path:path.join(__dirname,'captures',`${info.project.name}-contour-dpr${dpr}.png`),clip:{x:480,y:85,width:480,height:465}});
  await detail.evaluate(()=>atlasLab.seek(1.65));await detail.screenshot({path:path.join(__dirname,'captures',`${info.project.name}-deposit-dpr${dpr}.png`),clip:{x:480,y:85,width:480,height:465}});
  await expect(detail.locator('#error')).toBeHidden();await context.close();
 }
 fs.writeFileSync(path.join(__dirname,'captures',`${info.project.name}-polish.json`),JSON.stringify({quiet:quiet.glyph,ignition:peak.glyph,settled:settled.glyph,wordmarkMidpointRatios:ratios,lowerCyan:{continuation:continuation.lowerCyan,settled:settled.lowerCyan}},null,2));
});

test('transparent emblem respects authored coverage and composites alpha exactly once',async({page})=>{
 // Replace only the incoming emblem texture with known coverage. An RGB mask,
 // discarded alpha, or a straight/premultiplied blend mismatch fails this check.
 const fixtures=await page.evaluate(()=>[0,128,255].map(alpha=>{
  const canvas=document.createElement('canvas');canvas.width=canvas.height=16;
  const ctx=canvas.getContext('2d'),data=ctx.createImageData(16,16);
  for(let i=0;i<data.data.length;i+=4)data.data.set([80,96,64,alpha],i);
  ctx.putImageData(data,0,0);return canvas.toDataURL().split(',')[1];
 }));
 let fixture=0,requests=0;
 await page.route('**/assets/atlas-transparent.png',route=>{
  requests++;return route.fulfill({contentType:'image/png',body:Buffer.from(fixtures[fixture],'base64')});
 });
 const samples=[];
 for(fixture=0;fixture<3;fixture++){
  await page.goto('/?clean&t=5');await page.waitForFunction(()=>atlasLab?.ready);
  samples.push(await page.evaluate(()=>{
   atlasLab.seek(5);const source=document.getElementById('scene'),c=document.createElement('canvas');c.width=source.width;c.height=source.height;
   const ctx=c.getContext('2d');ctx.drawImage(source,0,0);
   const [x,y,size]=atlasLab.state.layout,dpr=c.width/innerWidth;
   const drift=Math.sin(5*.18)*atlasLab.state.settings.drift*.003*size;
   return [[.30,.45],[.67,.48]].map(([u,v])=>Array.from(ctx.getImageData(Math.floor((x+drift+size*u)*dpr),Math.floor((y+size*v)*dpr),1,1).data).slice(0,3));
  }));
 }
 expect(requests).toBe(3);
 for(let site=0;site<2;site++)for(let channel=0;channel<3;channel++){
  expect(Math.abs(samples[2][site][channel]-[80,96,64][channel])).toBeLessThanOrEqual(1);
  const expected=samples[2][site][channel]*128/255+samples[0][site][channel]*127/255;
  expect(Math.abs(samples[1][site][channel]-expected)).toBeLessThan(2);
 }
});

test('sustained playback at desktop and Retina tablet sizes',async({browser},info)=>{
 const results=[];
 for(const [label,width,height,dpr]of [['desktop',1440,900,1],['tablet-landscape',1180,734,2],['tablet-portrait',820,1180,2]]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:dpr,hasTouch:dpr===2,reducedMotion:'no-preference'});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto('http://127.0.0.1:4186/?debug&t=0');await page.waitForFunction(()=>window.atlasLab?.ready);
  if(dpr===2)await page.locator('#replay').tap();else await page.locator('#replay').click();
  await page.waitForFunction(()=>atlasLab.state.time>2.25);
  results.push({label,viewport:[width,height],dpr,...await page.evaluate(()=>atlasLab.performance)});
  await page.waitForFunction(()=>atlasLab.state.time===5&&!atlasLab.state.playing);
  expect(await page.evaluate(()=>atlasLab.state.stage)).toBe('Settled');
  await expect(page.locator('#error')).toBeHidden();expect(errors).toEqual([]);
  if(dpr===2){await page.locator('#replay').tap();await page.locator('#pause').tap();await page.locator('#settled').tap();await page.locator('#hide').tap();await expect(page.locator('#tools')).toBeHidden();}
  await page.evaluate(()=>atlasLab.seek(5));
  await page.screenshot({path:path.join(__dirname,'captures',`${info.project.name}-${label}-retina.png`)});
  expect(await page.evaluate(()=>atlasLab.state.resolution)).toEqual([width*dpr,height*dpr]);
  if(info.project.name==='webkit'&&dpr===2){
   await page.goto('about:blank');
   results.at(-1).clearOnlyBaseline=await page.evaluate(async({width,height,dpr})=>{
    const c=document.createElement('canvas');c.width=width*dpr;c.height=height*dpr;c.style.width=`${width}px`;c.style.height=`${height}px`;document.body.style.margin='0';document.body.append(c);
    const gl=c.getContext('webgl2',{alpha:false,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:true}),times=[];
    let last=0;await new Promise(resolve=>{function tick(now){if(last)times.push(now-last);last=now;gl.clearColor(.015,.1,.08,1);gl.clear(gl.COLOR_BUFFER_BIT);if(times.length<90)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});
    return 1000/(times.reduce((a,b)=>a+b,0)/times.length);
   },{width,height,dpr});
  }
  await context.close();
 }
 fs.writeFileSync(path.join(__dirname,'captures',`${info.project.name}-performance.json`),JSON.stringify(results,null,2));
 console.log(JSON.stringify(results));
});
test('tablet composition in both orientations and reduced motion',async({page},info)=>{
 for(const [name,w,h]of [['landscape',1180,734],['portrait',820,1180]]){
  await page.setViewportSize({width:w,height:h});await page.goto('/?clean&t=5');await page.waitForFunction(()=>window.atlasLab?.ready);
  const box=await page.locator('#start').boundingBox();expect(Math.abs(box.x+box.width/2-w/2)).toBeLessThan(1);expect(box.y+box.height).toBeLessThan(h-15);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(w);
  await page.screenshot({path:path.join(__dirname,'captures',`${info.project.name}-${name}.png`)});
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/?clean');await page.waitForFunction(()=>window.atlasLab?.ready);expect(await page.evaluate(()=>atlasLab.state.stage)).toBe('Settled');
});

test('Edit controls, persistence, comparison, export and clean presentation',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/?edit&t=1.65');await page.waitForFunction(()=>atlasLab?.ready);
 await expect(page.locator('#tools')).toBeVisible();await expect(page.locator('#sliders details')).toHaveCount(9);
 const original=await page.evaluate(()=>document.querySelector('canvas').toDataURL());
 await page.getByText('Magic flow',{exact:true}).click();
 await page.locator('#number-ribbonWidth').fill('1.5');await page.locator('#number-ribbonWidth').press('Tab');
 expect(await page.evaluate(()=>atlasLab.state.settings.ribbonWidth)).toBe(1.5);
 await expect(page.locator('#tune-ribbonWidth')).toHaveValue('1.5');
 expect(await page.evaluate(()=>document.querySelector('canvas').toDataURL())).not.toBe(original);
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('atlas.intro-lab.settings.v1'))?.settings.ribbonWidth)).toBe(1.5);
 await page.reload();await page.waitForFunction(()=>atlasLab?.ready);expect(await page.evaluate(()=>atlasLab.state.settings.ribbonWidth)).toBe(1.5);
 await page.locator('#store-a').click();await page.locator('#preset').selectOption('Subtle');
 expect(await page.evaluate(()=>atlasLab.state.settings.ribbonWidth)).toBe(1);
 await page.locator('#compare').click();expect(await page.evaluate(()=>atlasLab.state.settings.ribbonWidth)).toBe(1.5);
 await page.locator('#compare').click();expect(await page.evaluate(()=>atlasLab.state.settings.magicIntensity)).toBe(.65);
 await page.locator('#copy').click();await expect(page.locator('#export-area')).toBeVisible();
 const copied=JSON.parse(await page.locator('#settings-json').inputValue());expect(copied.version).toBe(1);expect(copied.settings.magicIntensity).toBe(.65);
 await page.locator('#settings-json').focus();await page.keyboard.press('r');expect(await page.evaluate(()=>atlasLab.state.playing)).toBe(false);
 const downloadPromise=page.waitForEvent('download');await page.locator('#export').click();const download=await downloadPromise;
 expect(download.suggestedFilename()).toBe('atlas-intro-settings.json');
 await download.saveAs(path.join(__dirname,'captures',`${info.project.name}-settings-export.json`));
 expect(JSON.parse(fs.readFileSync(path.join(__dirname,'captures',`${info.project.name}-settings-export.json`),'utf8'))).toEqual(copied);
 await page.locator('#close-export').click();await page.locator('#reset').click();
 expect(await page.evaluate(()=>atlasLab.state.settings.totalDuration)).toBe(5);
 expect(await page.evaluate(()=>document.querySelector('canvas').toDataURL())).toBe(original);
 await page.locator('#number-totalDuration').fill('8');await page.locator('#number-totalDuration').press('Tab');
 expect(await page.evaluate(()=>atlasLab.state.timing.end)).toBe(8);
 expect(await page.evaluate(()=>atlasLab.state.settings.wordTime)).toBeCloseTo(4.96,5);
 await page.locator('#jump').selectOption('start');expect(Number(await page.locator('#start').evaluate(e=>getComputedStyle(e).opacity))).toBeCloseTo(.5,1);
 await page.locator('#reset').click();await page.evaluate(()=>atlasLab.seek(1.65));
 await page.getByText('Magic flow',{exact:true}).click();
 await page.screenshot({path:path.join(__dirname,'captures',`${info.project.name}-edit-desktop.png`)});
 await page.locator('#hide').click();await expect(page.locator('#tools')).toBeHidden();await expect(page.locator('#tools-toggle')).toBeHidden();
 await page.keyboard.press('e');await expect(page.locator('#tools')).toBeVisible();await page.keyboard.press('Escape');
 await page.keyboard.press('ArrowRight');expect(await page.evaluate(()=>atlasLab.state.time)).toBeCloseTo(1.75,5);
 await page.keyboard.press('r');await expect.poll(()=>page.evaluate(()=>atlasLab.state.time)).toBeLessThan(1);
 await page.keyboard.press('Space');expect(await page.evaluate(()=>atlasLab.state.playing)).toBe(false);
 await page.setViewportSize({width:820,height:1180});await page.keyboard.press('e');
 await page.locator('#jump').selectOption('formation');await page.screenshot({path:path.join(__dirname,'captures',`${info.project.name}-edit-tablet.png`)});
 const box=await page.locator('#tools').boundingBox();expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(820);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(820);
 expect(errors).toEqual([]);
});

test('each visual group changes the live renderer and Current restores the baseline',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto('/?edit&t=0');await page.waitForFunction(()=>atlasLab?.ready);
 for(const [key,value,t]of [['magicIntensity',0,.9],['density',0,1.65],['formationStart',1.6,1.65],['glyphFinal',.5,5],['wordOpacity',0,3.65],['handoffIntensity',0,4.1],['tealBrightness',1.5,.3]]){
  await page.locator('#reset').click();
  const before=await page.evaluate(t=>{atlasLab.seek(t);return document.querySelector('canvas').toDataURL();},t);
  await page.evaluate(([key,value])=>atlasLab.set(key,value),[key,value]);
  const after=await page.evaluate(()=>document.querySelector('canvas').toDataURL());expect(after,key+' affects rendered pixels').not.toBe(before);
  await page.locator('#reset').click();expect(await page.evaluate(()=>document.querySelector('canvas').toDataURL()),key+' reset is exact').toBe(before);
 }
 await page.evaluate(()=>{atlasLab.seek(5);atlasLab.set('buttonGold',1.5);});await expect(page.locator('#start')).toHaveCSS('color','rgb(255, 255, 249)');
 await page.locator('#preset').selectOption('More Magic');await page.evaluate(()=>{atlasLab.set('density',3);atlasLab.set('ribbonCount',30);atlasLab.set('ambientParticles',1);atlasLab.seek(1.65);});
 await expect(page.locator('#error')).toBeHidden();
 await page.locator('#reset').click();
 await page.evaluate(()=>localStorage.setItem('atlas.intro-lab.settings.v1','broken JSON'));await page.reload();await page.waitForFunction(()=>atlasLab?.ready);
 expect(await page.evaluate(()=>atlasLab.state.settings.totalDuration)).toBe(5);
 expect(errors).toEqual([]);
});
