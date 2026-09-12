const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm');
const sandbox={window:{},URLSearchParams};vm.runInNewContext(fs.readFileSync('src/atlas-world-policy.js','utf8'),sandbox);
const policy=sandbox.window.AtlasWorldPolicy;
test('Atlas FXAA is canonical by default, and overrides require explicit debug mode',()=>{
 for(const q of ['','?atlasFxaa=0','?debug3d=0&atlasFxaa=0','?debug3d=1&atlasFxaa=1'])expect(policy.fxaa(q)).toBe(true);
 expect(policy.fxaa('?debug3d=1&atlasFxaa=0')).toBe(false);
 const [x,y,z]=policy.lighting.sunOffset,altitude=Math.atan2(y,Math.hypot(x,z))*180/Math.PI;
 expect(altitude).toBeGreaterThan(10);expect(altitude).toBeLessThan(25);
});
test('forest-floor export is a single 512px map without displacement or extra PBR maps',()=>{
 const png=fs.readFileSync('assets/textures/atlas-evening-floor-512.png');expect(png.readUInt32BE(16)).toBe(512);expect(png.readUInt32BE(20)).toBe(512);
 const b=fs.readFileSync('Levels/LVL-0001/3d/atlas-3d.glb'),g=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)));
 const m=g.materials.find(m=>m.name===policy.forestFloor.name);expect(m.extras.atlasFloorVersion).toBe('evening-v168');
 expect(m.pbrMetallicRoughness.baseColorTexture).toBeDefined();expect(m.normalTexture).toBeUndefined();expect(m.pbrMetallicRoughness.metallicRoughnessTexture).toBeUndefined();
});
for(const enabled of [false,true])test(`FXAA ${enabled}: real target budget, preparation and explicit cleanup`,async({page},info)=>{
 test.skip(process.env.ATLAS_WEBGPU_QA!=='1'||info.project.name!=='desktop-chromium','Real GPU acceptance');test.setTimeout(180000);
 await page.setViewportSize({width:1180,height:734});await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.addInitScript(()=>{
  window.fxaaTextures=[];const create=GPUDevice.prototype.createTexture,destroy=GPUTexture.prototype.destroy;const tracked=new WeakMap();
  GPUDevice.prototype.createTexture=function(d){const t=Reflect.apply(create,this,[d]);if(d.label==='Atlas FXAA sRGB'){const item={size:d.size,samples:d.sampleCount||1,format:d.format,destroyed:false};fxaaTextures.push(item);tracked.set(t,item);}return t;};
  GPUTexture.prototype.destroy=function(){const item=tracked.get(this);if(item)item.destroyed=true;return Reflect.apply(destroy,this,[]);};
 });
 await page.goto(`http://127.0.0.1:4173/?dev=editor&level=LVL-0001&debug3d=1&atlasFxaa=${enabled?1:0}`);
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="atlas-3d"]').click();
 await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status),{timeout:120000}).toBe('ready');
 const s=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());expect(s.actualEffects.fxaa).toBe(enabled);expect(s.actualEffects.forestFloor).toBe(true);expect(s.warmupViews).toBe(4);
 const allocations=await page.evaluate(()=>fxaaTextures);if(enabled){expect(allocations.length).toBeGreaterThan(0);for(const t of allocations){expect(t.samples).toBe(1);expect(t.format).toBe('rgba8unorm');}}else expect(allocations).toHaveLength(0);
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="illustrated"]').click();
 await expect.poll(()=>page.evaluate(()=>fxaaTextures.every(t=>t.destroyed))).toBe(true);
 await info.attach('fxaa-texture-lifetime',{body:JSON.stringify(await page.evaluate(()=>fxaaTextures)),contentType:'application/json'});
});
