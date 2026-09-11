const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
function registry(signals={}){
 const window={navigator:signals,screen:{width:1180,height:734},location:{search:'?rendererPreset=desktop-high'},matchMedia:()=>({matches:false})};
 const context=vm.createContext({window,URLSearchParams});
 for(const file of ['three-presets','graphics-modes'])vm.runInContext(fs.readFileSync(`src/${file}.js`,'utf8'),context);
 return window.AtlasGraphicsModes;
}
test('Atlas quality is canonical across desktop, iPad and Android despite override',()=>{
 const devices=[{}, {platform:'MacIntel',maxTouchPoints:5},{userAgent:'Android',maxTouchPoints:5},{userAgent:'iPhone',maxTouchPoints:5}];
 const configs=devices.map(device=>registry(device).configuration('atlas-3d'));
 for(const config of configs){expect(config.preset).toEqual(configs[0].preset);expect(config.compact).toBe(true);expect(config.presentationSamples).toBe(1);expect(config.presentationDepth).toBe(false);}
 expect(configs[0].preset).toEqual({id:'atlas-canonical',name:'Atlas 3D',worldSamples:1,effectSamples:1,dprCap:.75,shadowSize:1024,volumeResolution:0,volumeSteps:0,gtao:false,bloom:false,anisotropy:2,textureCap:1024,environmentCap:512});
 expect(registry(devices[1]).configuration('3d')).toBeNull();expect(registry(devices[3]).configuration('3d')).toBeNull();
 expect(registry().configuration('3d').preset.id).toBe('desktop-high');
});
test('world outputs are independent and retain the verified content',()=>{
 const modes=registry(),real=modes.get('3d'),atlas=modes.get('atlas-3d');expect(real.asset).not.toBe(atlas.asset);
 const hash=path=>require('crypto').createHash('sha256').update(fs.readFileSync(path)).digest('hex');
 expect(hash(atlas.asset)).toBe('06210bcfd18c6cab583a7d0f4052fd91ff8021230faf0f60d8d6ab569d6f8129');
 expect(hash(real.asset)).toBe('57a2e0589df616d2d91a2d40e93169bd5ffea4d5281d06414c6e3096c2d8a086');
 const exportScript=fs.readFileSync('scripts/export-lvl0001-blender.py','utf8');
 expect(exportScript).toContain("'real-3d':('lvl0001.blend','real-3d.glb')");expect(exportScript).toContain("'atlas-3d':('lvl0001-stylized.blend','atlas-3d.glb')");
 expect(exportScript).not.toContain('save_as_mainfile');
 const html=fs.readFileSync('index.html','utf8'),worker=fs.readFileSync('service-worker.js','utf8');
 expect(html.indexOf('src/graphics-modes.js')).toBeLessThan(html.indexOf('src/voxel-renderer.js'));
 expect(worker).toContain('v159-world-modes');expect(worker).toContain('"src/graphics-modes.js"');
 // Large worlds are requested only on selection, never install-time precached.
 const core=worker.slice(0,worker.indexOf('self.addEventListener'));
 expect(core).not.toContain('real-3d.glb');expect(core).not.toContain('atlas-3d.glb');
});
for(const tablet of [false,true])test(`menu and direct guard: tablet ${tablet}`,async({page},info)=>{
 await page.addInitScript(tablet=>{
  Object.defineProperty(navigator,'userAgent',{get:()=>tablet?'Mozilla/5.0 (Macintosh) Safari':'Mozilla/5.0 (Windows NT 10.0) Chrome'});Object.defineProperty(navigator,'platform',{get:()=>tablet?'MacIntel':'Win32'});Object.defineProperty(navigator,'maxTouchPoints',{get:()=>tablet?5:0});
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:()=>new Promise(()=>{})}});
 },tablet);
 const heavy=[];page.on('request',r=>{if(r.url().endsWith('/real-3d.glb'))heavy.push(r.url());});
 await page.goto(base+'/?dev=editor&level=LVL-0001&rendererPreset=desktop-high');
 await page.locator('[data-graphics-action="toggle"]').click();
 const groups=page.locator('[data-graphics-settings] fieldset');
 await expect(groups.nth(0).locator('legend')).toHaveText('Renderer');await expect(groups.nth(0).locator('button')).toHaveText(['Illustrated','Cinematic']);
 await expect(groups.nth(1).locator('legend')).toHaveText('Experimental');
 await expect(groups.nth(1).locator('button')).toHaveText(['Voxel',tablet?'Real 3DDesktop only':'Real 3D','Atlas 3D']);
 const real=page.locator('[data-renderer-choice="3d"]');if(tablet)await expect(real).toBeDisabled();else await expect(real).toBeEnabled();
 await expect(page.locator('[data-renderer-choice="atlas-3d"]')).toBeEnabled();
 await page.screenshot({path:info.outputPath('graphics-menu.png')});
 await page.evaluate(()=>{document.querySelector('[data-renderer-choice="3d"]').dispatchEvent(new MouseEvent('click',{bubbles:true}));window.eval('voxelRenderer.updateSettings')({renderer:'3d'});window.eval('render')();});
 expect(await page.evaluate(()=>window.eval('voxelRenderer.getSettings')().renderer)).toBe(tablet?'illustrated':'3d');
 if(tablet){
  await expect(page.locator('[data-three-canvas]')).toHaveCount(0);expect(heavy).toEqual([]);
  const direct=await page.evaluate(async()=>{
   let requests=0;navigator.gpu.requestAdapter=async()=>{requests++;throw Error('Heavy mode reached GPU');};
   const canvas=document.createElement('canvas');canvas.dataset.threeCanvas='';document.body.append(canvas);
   const runtime=AtlasThreeRenderer.createRuntime({getRenderer:()=> '3d',getLevel:()=>({id:'LVL-0001'})});await runtime.sync();const status=runtime.snapshot().status;runtime.dispose();canvas.remove();return {requests,status};
  });expect(direct).toEqual({requests:0,status:'idle'});expect(heavy).toEqual([]);
 }
});
for(const tablet of [false,true])for(const saved of ['3d','atlas-3d'])test(`persistence ${saved}, tablet ${tablet}`,async({page})=>{
 await page.addInitScript(({tablet,saved})=>{
  Object.defineProperty(navigator,'userAgent',{get:()=>tablet?'Mozilla/5.0 (Macintosh) Safari':'Mozilla/5.0 (Windows NT 10.0) Chrome'});Object.defineProperty(navigator,'platform',{get:()=>tablet?'MacIntel':'Win32'});Object.defineProperty(navigator,'maxTouchPoints',{get:()=>tablet?5:0});
  localStorage.setItem('atlas.graphics.v1',JSON.stringify({renderer:saved}));
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:()=>new Promise(()=>{})}});
 },{tablet,saved});
 await page.goto(base+'/?dev=editor&level=LVL-0001');
 expect(await page.evaluate(()=>window.eval('voxelRenderer.getSettings')().renderer)).toBe(tablet&&saved==='3d'?'illustrated':saved);
 if(tablet&&saved==='3d')await expect(page.locator('[data-three-canvas]')).toHaveCount(0);
 if(saved==='atlas-3d')expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().configuration.preset.id)).toBe('atlas-canonical');
});
