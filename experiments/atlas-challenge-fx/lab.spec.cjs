const {test,expect}=require('@playwright/test');
const readLab=page=>page.evaluate(async()=> (await import('/lab.js')).inspect());
const markerInk=(page,index)=>page.evaluate(async index=>{
 const {settings:s}= (await import('/lab.js')).inspect(),c=document.querySelector('#fx'),ctx=c.getContext('2d');
 const x=s.layout[`c${index+1}X`]/100*c.width,y=s.layout[`c${index+1}Y`]/100*c.height,r=56*c.width/1007;
 const d=ctx.getImageData(x-r,y-r,r*2,r*2).data;let sum=0;for(let i=3;i<d.length;i+=4)sum+=d[i];return sum;
},index);
async function seek(page,t){await page.locator('#scrub').evaluate((e,t)=>{e.value=t;e.dispatchEvent(new Event('input'));},t);await page.waitForTimeout(60);}

test('Canvas seeded challenge particles depart, arrive and stay consumed while other challenges remain',async({page},info)=>{
 await page.goto('/');const q=(await readLab(page)).schedule;
 await expect.poll(()=>markerInk(page,0)).toBeGreaterThan(1000);
 await page.locator('#stage').screenshot({path:info.outputPath('canvas-idle.png')});
 // Identity and convergence check: the rendered motes themselves use the live carrier.
 const continuity=await page.evaluate(async()=>{
  const {challengeMotes}=await import('/canvas-particles.js'),s=(await import('/lab.js')).inspect().settings;
  const source=[181,492],target=[540,490],carrier=u=>[source[0]+(target[0]-source[0])*u,source[1]+(target[1]-source[1])*u];
  const args=[s.marker,s.renderer,0,source,3];
  const idle=challengeMotes(...args,-1),start=challengeMotes(...args,0,1,carrier),late=challengeMotes(...args,.98,1,carrier),end=challengeMotes(...args,1,1,carrier);
  return {same:JSON.stringify(idle)===JSON.stringify(start),count:idle.length,lateDistance:Math.max(...late.map(p=>Math.hypot(p.x-target[0],p.y-target[1]))),endDistance:Math.max(...end.map(p=>Math.hypot(p.x-target[0],p.y-target[1]))),endGain:Math.max(...end.map(p=>p.gain)),consumed:challengeMotes(...args,2).length};
 });
 expect(continuity.same).toBe(true);expect(continuity.count).toBeGreaterThan(100);expect(continuity.lateDistance).toBeLessThan(12);expect(continuity.endDistance).toBe(0);expect(continuity.endGain).toBe(0);expect(continuity.consumed).toBe(0);
 await page.locator('[data-trigger="0"]').click();await page.locator('#complete').click();
 await seek(page,q.transfer+.4);await page.locator('#stage').screenshot({path:info.outputPath('canvas-departure.png')});
 await seek(page,q.arrive-.15);await page.locator('#stage').screenshot({path:info.outputPath('canvas-arrival.png')});
 await seek(page,q.absorb+.25);expect(await markerInk(page,0)).toBe(0);expect(await markerInk(page,1)).toBeGreaterThan(1000);
 await page.locator('#stage').screenshot({path:info.outputPath('canvas-absorb-preserved.png')});
 await seek(page,q.end);await page.locator('#pause').click();await expect.poll(async()=>(await readLab(page)).completed).toEqual([0]);
 await page.locator('[data-trigger="1"]').click();expect(await markerInk(page,0)).toBe(0);
 await page.locator('#reset').click();await expect.poll(()=>markerInk(page,0)).toBeGreaterThan(1000);
});

test('Canvas challenge and exit use only motes, and color amounts remove every residual glow',async({page},info)=>{
 await page.addInitScript(()=>{
  window.canvasShapes={stroke:0,fillRect:0};for(const name of ['stroke','fillRect']){const original=CanvasRenderingContext2D.prototype[name];CanvasRenderingContext2D.prototype[name]=function(...args){if(this.canvas.id==='fx')window.canvasShapes[name]++;return Reflect.apply(original,this,args);};}
 });
 await page.goto('/');await page.locator('#exit-play').click();await page.waitForTimeout(900);await page.locator('#pause').click();
 await page.locator('#stage').screenshot({path:info.outputPath('canvas-enchanted-exit.png')});
 expect(await page.evaluate(()=>window.canvasShapes)).toEqual({stroke:0,fillRect:0});
 await page.getByText('08 · Particle finish',{exact:true}).click();
 await page.locator('input[id^="renderer-cyanParticles-"]').fill('0');await page.locator('input[id^="renderer-goldParticles-"]').fill('0');
 const ink=()=>page.locator('#fx').evaluate(c=>c.getContext('2d').getImageData(0,0,c.width,c.height).data.some((v,i)=>i%4===3&&v>0));
 await expect.poll(ink).toBe(false);
 await page.locator('input[id^="renderer-goldParticles-"]').fill('1');await expect.poll(ink).toBe(true);
 await page.getByText('05 · Exit response',{exact:true}).click();await page.getByLabel('Exit style',{exact:true}).selectOption('spiral');
 await page.locator('#stage').screenshot({path:info.outputPath('canvas-wandering-embers.png')});
 expect(await page.evaluate(()=>window.canvasShapes)).toEqual({stroke:0,fillRect:0});
});
test('real transfer SFX follows completion, pause, resume, arrival and reset',async({page})=>{
 await page.goto('/');const audio=()=>page.evaluate(async()=> (await import('/lab.js')).inspect().audio);
 await page.getByRole('button',{name:'Challenge 1',exact:true}).click();await expect.poll(async()=> (await audio()).ready).toBe(true);
 expect((await audio()).duration).toBeGreaterThan(.5);expect((await audio()).playing).toBe(false);
 await page.locator('#complete').click();expect((await audio()).playing).toBe(false);
 await expect.poll(async()=> (await audio()).playing).toBe(true);const first=await audio();expect(first.state).toBe('running');expect(first.starts).toBe(1);
 await page.waitForTimeout(180);await page.locator('#pause').click();await expect.poll(async()=> (await audio()).playing).toBe(false);
 const time=await page.locator('#clock').textContent();await page.waitForTimeout(100);expect(await page.locator('#clock').textContent()).toBe(time);
 await page.locator('#pause').click();await expect.poll(async()=> (await audio()).playing).toBe(true);expect((await audio()).offset).toBeGreaterThan(first.offset);
 await expect(page.locator('#phase')).toContainText('Absorb');await expect.poll(async()=> (await audio()).playing).toBe(false);
 await page.locator('#replay').click();expect((await audio()).playing).toBe(false);await page.locator('#complete').click();await expect.poll(async()=> (await audio()).playing).toBe(true);
 await page.locator('#reset').click();await expect.poll(async()=> (await audio()).playing).toBe(false);
 await page.locator('#exit-play').click();await page.waitForTimeout(150);expect((await audio()).playing).toBe(false);
});
for(const style of ['orbital','spiral'])test(`${style} exit unlocks only after three unique completions and remains continuously visible`,async({page},info)=>{
 await page.goto('/');await page.getByText('06 · Global timing',{exact:true}).click();await page.locator('input[id^="timing-total-"]').fill('0.5');
 await page.getByText('05 · Exit response',{exact:true}).click();await page.getByLabel('Exit style',{exact:true}).selectOption(style);
 const read=()=>page.evaluate(async()=> (await import('/lab.js')).inspect());
 for(const i of [1,1,2,3]){await page.getByRole('button',{name:`Challenge ${i}`,exact:true}).click();await page.locator('#complete').click();await expect(page.locator('#phase')).toHaveText('Settled');const state=await read();expect(state.completed.length).toBe(i);if(i<3)expect(state.unlockedTime).toBeNull();}
 await expect(page.locator('#exit-status')).toHaveText('Exit ready · 3/3');
 const energies=await page.evaluate(async()=>{const c=document.querySelector('#fx'),ctx=c.getContext('2d'),values=[];for(let n=0;n<18;n++){await new Promise(r=>setTimeout(r,180));const d=ctx.getImageData(c.width*.59,c.height*.34,c.width*.18,c.height*.26).data;let alpha=0;for(let i=3;i<d.length;i+=4)alpha+=d[i];values.push(alpha);}return values;});
 expect(Math.min(...energies)).toBeGreaterThan(1000);expect((await read()).unlockedTime).toBeGreaterThan(2.6);await page.screenshot({path:info.outputPath('persistent-exit.png')});
 await page.locator('#exit-reset').click();await expect(page.locator('#exit-status')).toHaveText('Exit ready · 3/3');await page.getByRole('button',{name:'Challenge 1',exact:true}).click();expect((await read()).unlockedTime).not.toBeNull();
 await page.locator('#reset').click();expect((await read()).completed).toEqual([]);expect((await read()).unlockedTime).toBeNull();await expect(page.locator('#exit-status')).toHaveText('Exit locked · 0/3');
});
test('exit styles switch live, export, import, persist and restore defaults',async({page},info)=>{
 await page.goto('/');await page.getByText('05 · Exit response',{exact:true}).click();const selector=page.getByLabel('Exit style',{exact:true});await expect(selector).toHaveValue('orbital');
 await page.locator('#exit-play').click();await page.waitForTimeout(750);await page.locator('#pause').click();const read=()=>page.evaluate(async()=> (await import('/lab.js')).inspect());const before=await read();
 const orbital=await page.locator('#fx').evaluate(c=>c.toDataURL());await page.locator('#stage').screenshot({path:info.outputPath('orbital.png')});
 await selector.selectOption('spiral');await page.waitForTimeout(80);const after=await read();expect(after.exitTime).toBe(before.exitTime);expect(after.time).toBe(before.time);expect(after.settings.flow).toEqual(before.settings.flow);expect(after.audio.starts).toBe(before.audio.starts);
 expect(await page.locator('#fx').evaluate(c=>c.toDataURL())).not.toBe(orbital);await page.locator('#stage').screenshot({path:info.outputPath('spiral.png')});await expect(page.getByLabel('Flow direction',{exact:true})).toBeVisible();await expect(page.getByLabel('Counter-rotation',{exact:true})).toBeHidden();
 const downloadPromise=page.waitForEvent('download');await page.locator('#export').click();const download=await downloadPromise;const file=await download.path();const json=JSON.parse(require('node:fs').readFileSync(file,'utf8'));expect(json.settings.exit.style).toBe('spiral');
 await page.reload();expect((await read()).settings.exit.style).toBe('spiral');await page.locator('#defaults').click();expect((await read()).settings.exit.style).toBe('orbital');
 await page.locator('#file').setInputFiles({name:'settings.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(json))});await expect.poll(async()=> (await read()).settings.exit.style).toBe('spiral');
 await page.locator('#exit-replay').click();await expect(page.locator('#exit-status')).toHaveText('Exit preview');await page.locator('#reset').click();expect((await read()).exitTime).toBeNull();await expect(page.locator('#exit-status')).toHaveText('Exit locked · 0/3');
});
test('complete visual sequence, pause, reset and isolated assets',async({page},info)=>{
 const errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));await page.goto('/');await expect(page.locator('.anchor')).toHaveCount(5);await expect(page.locator('#stage')).toHaveAttribute('data-phase','Idle vessels');
 expect(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0))).toBe(true);
 const q=await page.evaluate(async()=> (await import('/lab.js')).inspect().schedule);
 await page.getByRole('button',{name:'Challenge 1',exact:true}).click();await expect(page.locator('#popup')).toBeVisible({timeout:500});await page.waitForTimeout(1500);await expect(page.locator('#phase')).toContainText('Awaiting completion');await page.locator('#complete').click();await expect(page.locator('#phase')).toContainText('Close');
 expect(q.transfer).toBe(q.release);expect(q.transfer-q.close).toBeCloseTo(.6);
 await seek(page,q.transfer+.03);await expect(page.locator('#popup')).toBeHidden();await expect(page.locator('#phase')).toContainText('Transfer');await seek(page,q.transfer+.8);await page.screenshot({path:info.outputPath('transfer.png'),fullPage:true});
 const pixels=await page.locator('#fx').evaluate(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;return d.reduce((n,v,i)=>n+(i%4===3&&v>0?1:0),0);});expect(pixels).toBeGreaterThan(2000);
 const clock=await page.locator('#clock').textContent();await page.waitForTimeout(150);expect(await page.locator('#clock').textContent()).toBe(clock);
 await seek(page,q.absorb+.2);await expect(page.locator('#phase')).toContainText('Absorb');await page.screenshot({path:info.outputPath('absorb.png'),fullPage:true});await seek(page,q.gate+.2);await expect(page.locator('#phase')).toContainText('Gate');await seek(page,q.end);await expect(page.locator('#phase')).toHaveText('Settled');await page.locator('#reset').click();await expect(page.locator('#phase')).toHaveText('Idle vessels');
 expect(errors).toEqual([]);expect(requests.some(u=>/src\/|Levels\/|bootstrap|service-worker/.test(u))).toBe(false);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('chosen baseline, moving live chest target and independent gold exit',async({page},info)=>{
 await page.goto('/');const read=()=>page.evaluate(async()=> (await import('/lab.js')).inspect());
 const baseline=await page.evaluate(async()=> (await import('/baseline.js')).default);const {renderer,...chosen}= (await read()).settings;expect(chosen).toEqual(baseline);expect(renderer).toEqual({mode:"canvas",cyanParticles:1,goldParticles:1,bloom:.65,exposure:1.35,richness:1,moteSize:1,depth:1});
 await page.locator('#moving-transfer').click();await expect(page.locator('#phase')).toContainText('Transfer');
 // Collect consecutive rendered frames while the real test movement is running.
 const samplesPromise=page.evaluate(async()=>{const {inspect}=await import('/lab.js'),samples=[];await new Promise(resolve=>{const start=performance.now();function collect(){samples.push(inspect());if(performance.now()-start>1800)resolve();else requestAnimationFrame(collect);}requestAnimationFrame(collect);});return samples;});
 await page.waitForTimeout(300);await page.screenshot({path:info.outputPath('moving-early.png')});await page.waitForTimeout(400);await page.screenshot({path:info.outputPath('moving-late.png')});const samples=await samplesPromise;
 const moving=samples.filter(x=>x.phase.includes('Transfer'));expect(moving.length).toBeGreaterThan(8);expect(moving.at(-1).actor[0]-moving[0].actor[0]).toBeGreaterThan(100);
 for(let i=0;i<samples.length;i++){const x=samples[i];expect(Math.hypot(x.endpoint[0]-x.chest[0],x.endpoint[1]-x.chest[1])).toBeLessThan(.0001);if(i){expect(x.time).toBeGreaterThanOrEqual(samples[i-1].time);const dt=x.time-samples[i-1].time;expect(Math.hypot(x.middle[0]-samples[i-1].middle[0],x.middle[1]-samples[i-1].middle[1])).toBeLessThan(900*dt+2);}}
 await expect(page.locator('#phase')).toContainText('Absorb');const absorbed=await read();expect(absorbed.chest[0]).toBeGreaterThan(baseline.layout.svenX/100*1007+180);await page.screenshot({path:info.outputPath('moving-absorb.png')});
 await page.locator('#reset').click();await page.locator('#exit-play').click();await page.waitForTimeout(400);await page.locator('#pause').click();await expect(page.locator('#popup')).toBeHidden();await expect(page.locator('#phase')).toHaveText('Idle vessels');await expect(page.locator('#exit-status')).toHaveText('Exit preview');await page.screenshot({path:info.outputPath('exit-gold.png')});
 const color=await page.locator('#fx').evaluate(c=>{const x=c.width*.68,y=c.height*.47,r=c.width*.09,d=c.getContext('2d').getImageData(x-r,y-r,r*2,r*2).data;let red=0,blue=0;for(let i=0;i<d.length;i+=4){red+=d[i]*d[i+3];blue+=d[i+2]*d[i+3];}return{red,blue};});expect(color.red).toBeGreaterThan(color.blue*1.3);
 await page.locator('#exit-replay').click();expect((await read()).exitTime).toBeLessThan(.2);await page.locator('#exit-reset').click();expect((await read()).exitTime).toBeNull();await expect(page.locator('#exit-status')).toHaveText('Exit locked · 0/3');
});
test('shared timing controls, persistence, export, drag and sequence queue',async({page},info)=>{
 await page.goto('/');await page.getByText('02 · Challenge screen',{exact:true}).click();const show=page.locator('input[id^="screen-show-"]');await show.first().fill('0.2');await page.getByText('06 · Global timing',{exact:true}).click();await expect(show.last()).toHaveValue('0.2');await page.reload();await expect(show.first()).toHaveValue('0.2');
 await page.getByText('07 · Layout / anchors',{exact:true}).click();await page.getByLabel('Drag anchors in scene',{exact:true}).check();const anchor=page.locator('.anchor').first();await anchor.scrollIntoViewIfNeeded();const box=await anchor.boundingBox();await page.mouse.move(box.x+24,box.y+24);await page.mouse.down();await page.mouse.move(box.x+55,box.y+30,{steps:5});await page.mouse.up();const x=Number(await page.locator('input[id^="layout-c1X-"]').inputValue());expect(x).toBeGreaterThan(18);
 const downloadPromise=page.waitForEvent('download');await page.locator('#export').click();const download=await downloadPromise;expect(download.suggestedFilename()).toBe('atlas-challenge-fx.json');
 await page.locator('#editor-toggle').click();await expect(page.locator('#editor')).toBeHidden();await page.locator('#editor-toggle').click();await expect(page.locator('#editor')).toBeVisible();
 await page.locator('#defaults').click();await page.getByText('06 · Global timing',{exact:true}).click();await page.locator('input[id^="timing-total-"]').fill('0.5');await page.locator('#sequential').click();await expect(page.locator('#phase')).toContainText('Challenge 2',{timeout:2500});await expect(page.locator('#phase')).toContainText('Challenge 3',{timeout:2500});await expect(page.locator('#phase')).toHaveText('Settled',{timeout:2500});
 await page.screenshot({path:info.outputPath('layout.png'),fullPage:true});
});

