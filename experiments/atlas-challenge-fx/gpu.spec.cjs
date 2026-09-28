const {test,expect}=require('@playwright/test');
const read=page=>page.evaluate(async()=>{const lab=await import('/lab.js');return {...lab.inspect(),gpu:lab.inspectGPU()};});
test.use({deviceScaleFactor:2});
async function gpu(page){await page.locator('#renderer-mode').selectOption('webgpu');await expect.poll(async()=>(await read(page)).gpu.status).toContain('living stardust');await expect.poll(async()=>(await read(page)).gpu.frames).toBeGreaterThan(2);await expect(page.locator('#fx-gpu')).toBeVisible();await expect(page.locator('#fx')).toBeHidden();}
async function seek(page,time){await page.locator('#scrub').evaluate((el,time)=>{el.value=time;el.dispatchEvent(new Event('input'));},time);await page.waitForTimeout(100);}

test('renderer setting persists, exports and falls back honestly without WebGPU',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(navigator,'gpu',{value:undefined,configurable:true}));
 await page.goto('/');await page.locator('#renderer-mode').selectOption('webgpu');await expect(page.locator('#renderer-status')).toContainText('Canvas fallback');
 await expect(page.locator('#fx')).toBeVisible();await expect(page.locator('#fx-gpu')).toBeHidden();
 const download=page.waitForEvent('download');await page.locator('#export').click();const file=await (await download).path();const settings=JSON.parse(require('node:fs').readFileSync(file,'utf8')).settings;
 expect(settings.renderer.mode).toBe('webgpu');await page.reload();await expect(page.locator('#renderer-mode')).toHaveValue('webgpu');await expect(page.locator('#renderer-status')).toContainText('Canvas fallback');
 await page.locator('#defaults').click();await expect(page.locator('#renderer-mode')).toHaveValue('canvas');
 // Earlier GPU exports migrate their finish control without changing Canvas tuning.
 const old=structuredClone(settings);delete old.renderer.richness;old.renderer.filaments=1.6;
 await page.locator('#file').setInputFiles({name:'old-gpu.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({schema:'atlas-challenge-fx/v1',settings:old}))});
 expect((await read(page)).settings.renderer.richness).toBe(1.6);expect((await read(page)).settings.flow).toEqual(settings.flow);
 await page.getByText('03 · Transfer flow',{exact:true}).click();await expect(page.getByLabel('Cloud width',{exact:true}).first()).toBeVisible();
 await page.getByText('05 · Exit response',{exact:true}).click();await expect(page.locator('input[id^="exit-line-"]')).toBeHidden();
 await page.locator('#renderer-mode').selectOption('canvas');await expect(page.getByLabel('Ribbon width',{exact:true}).first()).toBeVisible();await expect(page.locator('input[id^="exit-line-"]')).toBeHidden();
});

test('native GPU particle forms, dust and both exits render; switch retains the paused sequence',async({page,browserName},info)=>{
 test.skip(browserName!=='chromium','Native WebGPU validation runs in Chromium; WebKit exercises fallback.');
 const errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 await page.goto('/');await gpu(page);await expect.poll(async()=>(await read(page)).gpu.frames).toBeGreaterThan(2);
 expect((await page.evaluate(async()=>(await import('/lab.js')).readGPU([590,250,190,180]))).lit).toBe(0);
 await page.getByRole('button',{name:'Challenge 3',exact:true}).click();const q=(await read(page)).schedule;
 await seek(page,q.transfer+1.3);const before=await read(page);await page.locator('#stage').screenshot({path:info.outputPath('webgpu-transfer.png')});
 const pixels=await page.evaluate(async()=>(await import('/lab.js')).readGPU());expect(pixels.lit).toBeGreaterThan(3000);
 await page.locator('#renderer-mode').selectOption('canvas');await expect(page.locator('#fx')).toBeVisible();const canvas=await read(page);
 expect(canvas.time).toBe(before.time);expect(canvas.actor).toEqual(before.actor);expect(canvas.audio.starts).toBe(before.audio.starts);expect(canvas.settings.flow).toEqual(before.settings.flow);expect(canvas.gpu.targets).toBe(0);
 await page.locator('#stage').screenshot({path:info.outputPath('canvas-transfer.png')});await gpu(page);expect((await read(page)).time).toBe(before.time);
 await seek(page,q.absorb+.3);expect((await page.evaluate(async()=>(await import('/lab.js')).readGPU([335,447,90,90]))).lit).toBe(0);await page.locator('#stage').screenshot({path:info.outputPath('webgpu-after-arrival.png')});
 await page.locator('#reset').click();await page.getByText('05 · Exit response',{exact:true}).click();
 for(const style of ['orbital','spiral']){
  await page.getByLabel('Exit style',{exact:true}).selectOption(style);await page.locator('#exit-play').click();await page.waitForTimeout(750);await page.locator('#pause').click();
  expect((await page.evaluate(async()=>(await import('/lab.js')).readGPU([590,250,190,180]))).lit).toBeGreaterThan(3000);await page.locator('#stage').screenshot({path:info.outputPath('webgpu-'+style+'.png')});
 }
 await page.setViewportSize({width:820,height:1180});await page.waitForTimeout(150);const resized=await read(page);expect(resized.gpu.dimensions[0]*resized.gpu.dimensions[1]).toBeLessThanOrEqual(4000000);
 await page.locator('#reset').click();expect((await read(page)).exitTime).toBeNull();expect((await read(page)).gpu.error).toBeNull();expect(errors).toEqual([]);expect(requests.some(u=>/src\/|Levels\/|bootstrap|service-worker/.test(u))).toBe(false);
});

test('GPU follows moving Sven, unlocks from three distinct challenges and cleans up repeated switches',async({page,browserName})=>{
 test.skip(browserName!=='chromium','Native WebGPU validation runs in Chromium.');
 await page.goto('/');await gpu(page);await page.locator('#moving-transfer').click();await expect(page.locator('#phase')).toContainText('Transfer');const early=await read(page);await page.waitForTimeout(550);const late=await read(page);
 expect(late.chest[0]).toBeGreaterThan(early.chest[0]);expect(late.endpoint).toEqual(late.chest);expect(late.audio.starts).toBe(1);
 await page.locator('#reset').click();await page.getByText('06 · Global timing',{exact:true}).click();await page.locator('input[id^="timing-total-"]').fill('0.5');
 for(const id of [1,1,2,3]){await page.getByRole('button',{name:'Challenge '+id,exact:true}).click();await page.locator('#complete').click();await expect(page.locator('#phase')).toHaveText('Settled');expect((await read(page)).completed.length).toBe(id);}
 await expect(page.locator('#exit-status')).toHaveText('Exit ready · 3/3');await page.waitForTimeout(1500);expect((await read(page)).unlockedTime).toBeGreaterThan(1);
 for(let i=0;i<3;i++){await page.locator('#renderer-mode').selectOption('canvas');expect((await read(page)).gpu.targets).toBe(0);await gpu(page);await expect.poll(async()=>(await read(page)).gpu.targets).toBe(3);}
 expect((await read(page)).gpu.error).toBeNull();await expect(page.locator('#exit-status')).toHaveText('Exit ready · 3/3');
});

test('independent particle populations, no residual spot glow and visual review across stages',async({page,browserName},info)=>{
 test.skip(browserName!=='chromium','Native particle readback requires Chromium WebGPU.');
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await gpu(page);await page.locator('#pause').click();
 await page.getByText('08 · Particle finish',{exact:true}).click();
 const amount=async(cyan,gold)=>{for(const [key,value]of [['cyanParticles',cyan],['goldParticles',gold]])await page.locator(`input[id^="renderer-${key}-"]`).fill(String(value));await page.waitForTimeout(120);};
 const pixels=()=>page.evaluate(async()=>(await import('/lab.js')).readGPU());
 const shot=async name=>{await page.mouse.move(0,0);await page.locator('#stage').screenshot({path:info.outputPath(name+'.png')});};
 await shot('01-particle-idle');
 await amount(.3,0);const sparse=await pixels();expect(sparse.cyanPixels).toBeGreaterThan(1000);expect(sparse.goldPixels).toBe(0);await shot('02-sparse-cyan');
 await amount(1.6,0);const cyan=await pixels();expect(cyan.lit).toBeGreaterThan(sparse.lit*1.5);expect(cyan.goldPixels).toBe(0);await shot('03-cyan-only');
 await amount(0,.3);const sparseGold=await pixels();expect(sparseGold.goldPixels).toBeGreaterThan(500);expect(sparseGold.cyanPixels).toBe(0);
 await amount(0,2);const gold=await pixels();expect(gold.goldPixels).toBeGreaterThan(sparseGold.goldPixels*1.5);expect(gold.cyanPixels).toBe(0);await shot('04-gold-only');
 await amount(0,0);expect((await pixels()).lit).toBe(0);await shot('05-no-particles-no-glow');
 await amount(.45,2);await shot('06-gold-rich');
 const download=page.waitForEvent('download');await page.locator('#export').click();const data=JSON.parse(require('node:fs').readFileSync(await(await download).path(),'utf8'));
 expect(data.settings.renderer.cyanParticles).toBe(.45);expect(data.settings.renderer.goldParticles).toBe(2);
 await page.reload();await gpu(page);expect((await read(page)).settings.renderer.cyanParticles).toBe(.45);expect((await read(page)).settings.renderer.goldParticles).toBe(2);
 await page.getByText('08 · Particle finish',{exact:true}).click();await amount(1,1);
 await page.getByRole('button',{name:'Challenge 3',exact:true}).click();const q=(await read(page)).schedule;
 for(const [name,time]of [['07-transfer-early',q.transfer+.45],['08-transfer-late',q.transfer+1.3],['09-after-arrival',q.absorb+.3]]){
  await seek(page,time);await shot(name);expect((await pixels()).lit).toBeGreaterThan(3000);
  await amount(0,0);expect((await pixels()).lit).toBe(0);await amount(1,1);
 }
 await page.locator('#reset').click();await page.getByText('05 · Exit response',{exact:true}).click();
 for(const style of ['orbital','spiral']){
  await page.getByLabel('Exit style',{exact:true}).selectOption(style);await page.locator('#exit-play').click();await page.waitForTimeout(700);await page.locator('#pause').click();await shot('10-exit-'+style);
  await amount(0,0);expect((await pixels()).lit).toBe(0);await amount(1,1);
 }
 await page.setViewportSize({width:1180,height:734});await page.waitForTimeout(150);await shot('11-tablet-landscape');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.setViewportSize({width:820,height:1180});await page.waitForTimeout(150);await shot('12-tablet-portrait');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.locator('#defaults').click();expect((await read(page)).settings.renderer).toEqual({mode:'canvas',cyanParticles:1,goldParticles:1,bloom:.65,exposure:1.35,richness:1,moteSize:1,depth:1});
 await page.locator('#file').setInputFiles({name:'color-study.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});await gpu(page);expect((await read(page)).settings.renderer.goldParticles).toBe(2);expect((await read(page)).settings.renderer.cyanParticles).toBe(.45);expect(errors).toEqual([]);
});

test('challenge stardust itself travels to Sven and stays consumed until replay or reset',async({page,browserName},info)=>{
 test.skip(browserName!=='chromium','Native particle readback requires Chromium WebGPU.');
 await page.goto('/');await gpu(page);
 const source=[755,450,160,160],other=[100,410,160,160],travel=[520,350,190,170],chest=[335,447,90,90];
 const pixels=region=>page.evaluate(async region=>(await(await import('/lab.js')).readGPU(region)).lit,region);
 const shot=name=>page.locator('#stage').screenshot({path:info.outputPath(name+'.png')});
 expect(await pixels(source)).toBeGreaterThan(1000);expect(await pixels(travel)).toBe(0);
 await shot('01-idle');
 // Turn off supplementary transfer dust to prove that the idle motes themselves move.
 await page.getByText('03 · Transfer flow',{exact:true}).click();await page.locator('input[id^="flow-dust-"]').fill('0');
 await page.getByRole('button',{name:'Challenge 3',exact:true}).click();await page.locator('#complete').click();
 await expect(page.locator('#phase')).toContainText('Transfer');await page.locator('#pause').click();const q=(await read(page)).schedule;
 await seek(page,q.transfer+(q.arrive-q.transfer)*.58);
 expect(await pixels(source)).toBe(0);expect(await pixels(travel)).toBeGreaterThan(1000);expect(await pixels(other)).toBeGreaterThan(1000);await shot('02-original-motes-travelling');
 for(const delay of [.03,.3,1]){await seek(page,q.arrive+delay);expect(await pixels(source)).toBe(0);expect(await pixels(chest)).toBe(0);expect(await pixels(travel)).toBe(0);}
 await shot('03-no-absorb-after-arrival');
 await page.locator('#pause').click();await expect(page.locator('#phase')).toHaveText('Settled');
 expect((await read(page)).completed).toEqual([2]);expect((await read(page)).audio.starts).toBe(1);
 expect(await pixels(source)).toBe(0);expect(await pixels(chest)).toBe(0);expect(await pixels(travel)).toBe(0);expect(await pixels(other)).toBeGreaterThan(1000);await shot('04-consumed');
 await page.waitForTimeout(300);expect(await pixels(source)).toBe(0);
 // Starting a different challenge and recreating the GPU must not resurrect challenge 3.
 await page.getByRole('button',{name:'Challenge 1',exact:true}).click();expect(await pixels(source)).toBe(0);
 await page.locator('#renderer-mode').selectOption('canvas');await gpu(page);expect(await pixels(source)).toBe(0);
 await page.getByRole('button',{name:'Challenge 3',exact:true}).click();await expect.poll(()=>pixels(source)).toBeGreaterThan(1000);expect((await read(page)).completed).toEqual([2]);
 await page.locator('#reset').click();expect((await read(page)).completed).toEqual([]);expect(await pixels(source)).toBeGreaterThan(1000);expect(await pixels(other)).toBeGreaterThan(1000);await shot('05-reset');
 expect((await read(page)).gpu.error).toBeNull();
});
