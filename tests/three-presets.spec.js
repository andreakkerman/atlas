const {test,expect}=require('@playwright/test');
const vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync('src/three-presets.js','utf8');
function api(){const window={navigator:{},location:{search:''},screen:{}};vm.runInNewContext(source,{window,URLSearchParams});return window.AtlasThreePresets;}
const desktop={platform:'Win32',maxTouchPoints:0,screenWidth:1920,screenHeight:1080,coarse:false,hover:true};
const touch={maxTouchPoints:5,screenWidth:1180,screenHeight:820,coarse:true,hover:false};
for(const [name,signals,kind]of [
 ['Windows desktop',desktop,'desktop'],
 ['Mac laptop',{...desktop,platform:'MacIntel'},'desktop'],
 ['Windows touchscreen laptop',{...desktop,maxTouchPoints:10},'desktop'],
 ['iPad UA',{...touch,userAgent:'Mozilla iPad Safari'},'tablet'],
 ['iPad desktop Safari',{...touch,platform:'MacIntel',userAgent:'Mozilla Macintosh Safari'},'tablet'],
 ['iPad trackpad and narrow split view',{...touch,platform:'MacIntel',coarse:false,hover:true,width:400,height:800},'tablet'],
 ['Android tablet',{...touch,userAgent:'Mozilla Android Chrome Safari'},'tablet'],
 ['Android tablet mobile UA',{...touch,userAgent:'Mozilla Android Mobile Chrome'},'tablet'],
 ['Windows slate',{...touch,platform:'Win32'},'tablet'],
 ['ChromeOS touch-first',{...touch,platform:'Linux armv8l'},'tablet'],
 ['browser form factor',{...desktop,formFactors:['Tablet']},'tablet'],
 ['viewport fallback',{...touch,screenWidth:0,screenHeight:0,width:800,height:1100},'tablet'],
 ['Android phone',{...touch,userAgent:'Android Mobile',screenWidth:390,screenHeight:844},'phone'],
 ['iPhone',{...touch,userAgent:'iPhone Safari',screenWidth:390,screenHeight:844},'phone'],
 ['small desktop window',{...desktop,width:390,height:844},'desktop']
])test(`preset detection: ${name}`,()=>{
 const config=api().select(signals);
 expect(config.device.deviceClass).toBe(kind);
 expect(config.preset.name).toBe(kind==='desktop'?'Desktop High':'Tablet Optimized');
});
test('preset settings use valid WebGPU sample counts, not unsupported 2x',()=>{
 const {presets,select}=api(),p=presets['tablet-optimized'];
 expect(JSON.parse(JSON.stringify(p))).toEqual({id:'tablet-optimized',name:'Tablet Optimized',worldSamples:1,effectSamples:1,dprCap:.75,shadowSize:1024,volumeResolution:0,volumeSteps:0,gtao:false,bloom:false,anisotropy:2,textureCap:1024,environmentCap:512});
 const high=presets['desktop-high'];expect(high.worldSamples).toBe(4);expect(high.effectSamples).toBe(4);expect(high.dprCap).toBe(1.5);expect(high.shadowSize).toBe(4096);expect(high.volumeSteps).toBe(80);expect(high.gtao).toBe(true);expect(high.anisotropy).toBe(8);
 const forced=select(desktop,'tablet-optimized');expect(forced.compact).toBe(true);expect(forced.presentationSamples).toBe(1);expect(forced.presentationDepth).toBe(false);
 const ipadHigh=select({...touch,platform:'MacIntel'},'desktop-high');expect(ipadHigh.preset).toBe(high);expect(ipadHigh.presentationSamples).toBe(1);
 expect(select(desktop,'invalid').preset).toBe(high);
 expect(select(desktop,'__proto__').preset).toBe(high);
});

test('browser signals retain iPad MacIntel identity and support query overrides',()=>{
 const window={navigator:{platform:'MacIntel',maxTouchPoints:5,userAgentData:{platform:'Windows'}},location:{search:''},screen:{width:1180,height:820}};
 vm.runInNewContext(source,{window,URLSearchParams});
 expect(window.AtlasThreePresets.session.device.deviceClass).toBe('tablet');
 expect(window.AtlasThreePresets.session.preset.id).toBe('tablet-optimized');
 window.location.search='?rendererPreset=desktop-high';vm.runInNewContext(source,{window,URLSearchParams});
 expect(window.AtlasThreePresets.session.preset.id).toBe('desktop-high');
 expect(window.AtlasThreePresets.session.presentationSamples).toBe(1);
});
test('session selection stays stable after viewport and input changes',()=>{
 const window={navigator:{platform:'MacIntel',maxTouchPoints:5},location:{search:''},screen:{width:1180,height:820}};
 vm.runInNewContext(source,{window,URLSearchParams});const before=window.AtlasThreePresets.session;
 window.navigator.maxTouchPoints=0;window.screen.width=1920;window.location.search='?rendererPreset=desktop-high';
 expect(window.AtlasThreePresets.session).toBe(before);expect(before.preset.id).toBe('tablet-optimized');expect(Object.isFrozen(before.preset)).toBe(true);
});
