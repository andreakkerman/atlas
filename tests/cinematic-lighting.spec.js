const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const fs = require("fs");
const contract = require("../src/cinematic-settings");
const runtimeUrl = process.env.ATLAS_EDITOR_URL || `${pathToFileURL(path.join(__dirname, "..", "index.html"))}?dev=editor`;
async function scene(page, id = "LVL-0001") {
  await page.route("**/__dev/levels/*/editor-draft", route => route.fulfill({ json: {} }));
  await page.goto(runtimeUrl);
  await page.evaluate(async id => { await window.eval("selectLevel")(id, { startImmediately: true, recordStart: false }); }, id);
  await expect(page.locator('[data-actor="sven"]')).toBeVisible();
}
function decodePNG(buffer) {
  let offset=8,width,height,channels;const chunks=[];
  while(offset<buffer.length){const length=buffer.readUInt32BE(offset),type=buffer.toString("ascii",offset+4,offset+8),data=buffer.subarray(offset+8,offset+8+length);if(type==="IHDR"){width=data.readUInt32BE(0);height=data.readUInt32BE(4);channels=data[9]===6?4:3;}if(type==="IDAT")chunks.push(data);offset+=length+12;}
  const raw=require("zlib").inflateSync(Buffer.concat(chunks)), stride=width*channels, out=Buffer.alloc(height*stride);let cursor=0;
  for(let y=0;y<height;y++){const filter=raw[cursor++];for(let x=0;x<stride;x++){const at=y*stride+x,a=x>=channels?out[at-channels]:0,b=y?out[at-stride]:0,c=y&&x>=channels?out[at-stride-channels]:0,p=a+b-c;const pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);out[at]=(raw[cursor++]+(filter===1?a:filter===2?b:filter===3?Math.floor((a+b)/2):filter===4?(pa<=pb&&pa<=pc?a:pb<=pc?b:c):0))&255;}}
  return {data:out,channels,width,height};
}
function delta(a,b){a=decodePNG(a);b=decodePNG(b);expect(a.width).toBe(b.width);expect(a.height).toBe(b.height);let sum=0;for(let i=0;i<a.data.length;i+=a.channels)for(let c=0;c<3;c++)sum+=Math.abs(a.data[i+c]-b.data[i+c]);return sum/(a.width*a.height*3);}
function regionDelta(a,b,box){a=decodePNG(a);b=decodePNG(b);let sum=0,count=0;const x0=Math.max(0,Math.floor(box.x)),y0=Math.max(0,Math.floor(box.y)),x1=Math.min(a.width,Math.ceil(box.x+box.width)),y1=Math.min(a.height,Math.ceil(box.y+box.height));for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const at=(y*a.width+x)*a.channels;for(let c=0;c<3;c++){sum+=Math.abs(a.data[at+c]-b.data[at+c]);count++;}}return sum/Math.max(1,count);}
function differenceBounds(a,b,threshold=12){a=decodePNG(a);b=decodePNG(b);let minX=a.width,minY=a.height,maxX=-1,maxY=-1,count=0;for(let y=0;y<a.height;y++)for(let x=0;x<a.width;x++){const at=(y*a.width+x)*a.channels,d=Math.max(Math.abs(a.data[at]-b.data[at]),Math.abs(a.data[at+1]-b.data[at+1]),Math.abs(a.data[at+2]-b.data[at+2]));if(d<threshold)continue;minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);count++;}return {minX,minY,maxX,maxY,count};}
function bluePixels(buffer){const image=decodePNG(buffer);let count=0;for(let i=0;i<image.data.length;i+=image.channels)if(image.data[i+2]>image.data[i]+45&&image.data[i+2]>image.data[i+1]+18)count++;return count;}
function bluePixelsIn(buffer,box){const image=decodePNG(buffer);let count=0;for(let y=Math.max(0,Math.floor(box.y));y<Math.min(image.height,Math.ceil(box.y+box.height));y++)for(let x=Math.max(0,Math.floor(box.x));x<Math.min(image.width,Math.ceil(box.x+box.width));x++){const at=(y*image.width+x)*image.channels;if(image.data[at+2]>image.data[at]+45&&image.data[at+2]>image.data[at+1]+18)count++;}return count;}
async function nextFrames(page, count=3) { const frame=await page.evaluate(()=>window.eval("cinematicRenderer").snapshot().frame); await expect.poll(()=>page.evaluate(()=>window.eval("cinematicRenderer").snapshot().frame)).toBeGreaterThan(frame+count); }
async function openEditor(page) { await page.keyboard.press("Control+Shift+D"); await page.locator('[data-editor-mode="graphics"]').click(); await expect(page.locator("[data-cinematic-editor]")).toBeVisible(); }
async function pane(page,key) {
  await page.locator(`[data-cinematic-layer="${contract.systems[key].layer}"]`).click();
  const group=page.locator(`[data-cinematic-group="${key}"]`);
  if(!await group.evaluate(el=>el.open))await group.locator(':scope > summary').click();
}
async function mode(page, renderer) {
  await page.evaluate(renderer => { window.eval("voxelRenderer").updateSettings({ renderer }); window.eval("render")(); }, renderer);
}
async function settings(page, value) {
  await page.evaluate(value => { const id = window.eval("level").id; window.eval("worldResolver").updateLevelSettings(id, { cinematicLighting: window.AtlasCinematicSettings.normalize(value) }); window.eval("cinematicRenderer").sync(); }, value);
}
async function ready(page) {
  await expect.poll(async () => { const s = await page.evaluate(() => window.eval("cinematicRenderer").snapshot()); return s.error || s.status; }, { timeout: 25000 }).toBe("ready");
}
function errors(page) {
  const list = [];
  page.on("pageerror", e => list.push(e.message));
  page.on("console", m => { if (m.type() === "error") list.push(m.text()); });
  return list;
}
test("grounding shadow keeps four procedural shapes and adds one sprite-alpha silhouette",()=>{
  const shader=fs.readFileSync(path.join(__dirname,"../src/cinematic-shaders.js"),"utf8"),branch=shader.slice(shader.indexOf("if(d.flags.w>0.5)"),shader.indexOf("var uv=d.uv.xy"));
  const response=shader.slice(shader.indexOf("fn groundingShadowExposure"),shader.indexOf("@vertex fn fullscreen"));
  const renderer=fs.readFileSync(path.join(__dirname,"../src/cinematic-renderer.js"),"utf8");
  expect(contract.systems.characters.fields.shadowShape).toEqual(["silhouette","tapered","oval","capsule","wideSoft"]);expect(contract.systems.characters.fields.showShadowContactDebug).toBe(false);expect(Object.fromEntries(['shadowStrength','shadowOpacity','shadowGroundlineOffset','shadowScale','shadowSoftness','shadowLength','shadowLocalLightInfluence','shadowDirectionSmoothing'].map(key=>{const f=contract.systems.characters.fields[key];return [key,[f.min,f.max]];}))).toEqual({shadowStrength:[0,10],shadowOpacity:[0,100],shadowGroundlineOffset:[-30,30],shadowScale:[.5,3],shadowSoftness:[0,6],shadowLength:[.25,3],shadowLocalLightInfluence:[0,5],shadowDirectionSmoothing:[0,4]});expect(branch).toContain("shapeKind>3.5");expect(branch).toContain("let screen=g.v[0].xy");expect(branch).not.toContain("let screen=vec2f(g.v[2].x,g.v[1].x)");expect(branch).toContain("leftBase");expect(branch).toContain("rightBase");expect(branch).toContain("cross2(base,relative)");expect(branch).toContain("projectedSpriteAlpha(castUV");expect(branch).toContain("authoredMaximum");expect(branch).toContain("receiverAllowance");expect(branch).toContain("maxAllowedContribution");expect(branch).toContain("matchedContribution");expect(branch).not.toContain("authorFloor");expect(branch).toContain("localContribution");expect(branch).not.toContain("backgroundFade");expect(branch).not.toContain("castInside");expect(branch).not.toContain("projectedSpriteAlpha(contactUV");expect(branch).not.toContain("soleMask");expect(branch).not.toContain("contactBand");expect(branch).not.toContain("castBridge");expect(shader).not.toContain("@fragment fn silhouetteMask");expect(renderer).toContain("analyzeSpriteGrounding(source)");expect(renderer).toContain("getImageData(0,0,width,height)");expect(renderer).toContain("source.currentSrc||source.src");expect(renderer).toContain("displayedGrounding");expect(renderer).toContain("kernelPadX");expect(renderer).toContain("kernelPadY");expect(renderer).toContain("paddingX");expect(renderer).toContain("paddingY");expect(renderer).toContain("showShadowContactDebug");expect(renderer).not.toContain("silhouetteMasks");expect(branch).toContain("0.99");expect(renderer).toContain("Math.min(5,localInfluence)");expect(renderer).not.toContain("effective.characters.enabled && options.getGroundingShadow");
  expect(response).toContain("e.v[0].x!=2.0");expect(response).toContain("direct=max");expect(response).not.toContain("depthAt");expect(response).not.toContain("atmosphere");expect(response).not.toContain("rayField");
  expect(renderer).not.toContain('entry.kind==="npc"?.9:.96');expect(renderer).toContain('point.x-sourceX');expect(renderer).toContain('target.baseAngle+localOffset');expect(renderer).toContain('pass = begin(targets[1].view, "load")');expect(renderer).toContain('bind(pass,entry.resource,targets[0]');expect(renderer).toContain('const padX=2/canvas.width');expect(shader).toContain('sample.a*=sourceInside');expect(renderer).toContain('smoothShadow(shadowStates.get(entry.key)');expect(branch).toContain('let receiverUV=d.rect.xy+in.uv*d.rect.zw');expect(branch).toContain('let receiver=textureSampleLevel(auxiliary');expect(branch).not.toContain('projectedPoint/vec2f(g.v[2].x,g.v[1].x)');expect(branch).not.toContain('receiver=toLinear');expect(branch).toContain('receiverLuminance');expect(branch).toContain('minimumLightResponse');expect(branch).toContain('receiverAllowance');expect(branch).toContain('receiver*0.08*alpha');expect(branch).toContain('1.0-exp(-strength*0.505145)');expect(branch).toContain('*g.v[21].w');
  const migrated=contract.normalize({version:2,characters:{shadowStrength:2}});expect(migrated.version).toBe(3);expect(migrated.characters.shadowStrength).toBeCloseTo(.56/.505145,5);expect(migrated.characters.shadowOpacity).toBe(100);
});
test("receiver matching caps shadow alpha monotonically and remains finite",async({page})=>{
  await scene(page);
  const result=await page.evaluate(()=>{
    const match=window.AtlasCinematicRenderer.receiverMatchedAlpha,original=.77;
    const lumas=[0,0.005,.02,.04,.07,.10,.13,.16,.18,.6,1];
    return {disabled:lumas.map(luma=>match(original,luma,0)),enabled:lumas.map(luma=>match(original,luma,1)),partial:lumas.map(luma=>match(original,luma,.5)),invalid:[match(original,NaN,1),match(NaN,0,1),match(original,-Infinity,1)]};
  });
  expect(result.disabled.every(value=>value===result.disabled[0])).toBe(true);
  expect(result.disabled[0]).toBeCloseTo(.77,8);
  expect(result.enabled.every((value,index,values)=>Number.isFinite(value)&&value<=.77&&(!index||value>=values[index-1]))).toBe(true);
  expect(result.enabled[0]).toBe(0);expect(result.enabled.at(-1)).toBeCloseTo(.77,8);
  expect(result.partial.every((value,index)=>value>=result.enabled[index]&&value<=result.disabled[index])).toBe(true);
  expect(result.invalid.every(Number.isFinite)).toBe(true);
});
test("automatic shadow direction, bias, wrap smoothing and length remain bounded",async({page})=>{
  await scene(page);const result=await page.evaluate(()=>{
    const api=window.AtlasCinematicSettings,renderer=window.AtlasCinematicRenderer,point={x:500,y:570};
    const make=value=>api.effective(api.normalize(value));
    const global=make({characters:{shadowLightSourceX:100,shadowLightSourceY:100,shadowDirection:0,shadowLength:1},godRays:{enabled:true,items:[{enabled:true,x:900,y:300,intensity:1.5}]}}),left=renderer.shadowTarget(global,{x:500,y:570}),right=renderer.shadowTarget(global,{x:1700,y:570});
    const biased=renderer.shadowTarget(make({...global,characters:{...global.characters,shadowDirection:30}}),point);
    const basis=make({characters:{shadowLightSourceX:0,shadowLightSourceY:570,shadowDirection:0,shadowLength:1,shadowLocalLightInfluence:0.5},areaLights:{enabled:true,items:[{enabled:true,x:500,y:300,width:2000,height:1200,direction:45,intensity:1}]},localLights:{enabled:true,items:[{enabled:true,x:500,y:300,radius:500,intensity:2,falloff:1,characterInfluence:1}]}}),steered=renderer.shadowTarget(basis,point),unsteered=renderer.shadowTarget(make({...basis,characters:{...basis.characters,shadowLocalLightInfluence:0}}),point);
    const wrap=renderer.smoothShadow({angle:359*Math.PI/180,localOffset:359*Math.PI/180,length:1},{angle:1*Math.PI/180,baseAngle:0,localOffset:1*Math.PI/180,length:1},.1,.1),noLag=renderer.smoothShadow({angle:.1,localOffset:.1,length:1},{angle:1.1,baseAngle:1,localOffset:.1,length:1},1/60,.1);
    const strong=renderer.shadowTarget(global,point),diffuse=renderer.shadowTarget(make({characters:{shadowLength:1}}),point),mist=renderer.shadowTarget(make({...global,atmosphere:{enabled:true,items:[{enabled:true,x:500,y:570,width:1000,height:600,density:2}]}}),point);
    const localTwo=renderer.shadowTarget(make({...basis,characters:{...basis.characters,shadowLocalLightInfluence:2}}),point),localFive=renderer.shadowTarget(make({...basis,characters:{...basis.characters,shadowLocalLightInfluence:5}}),point);
    return {left:left.angle,right:right.angle,bias:Math.atan2(Math.sin(biased.angle-left.angle),Math.cos(biased.angle-left.angle)),steered:steered.angle,unsteered:unsteered.angle,localTwo:localTwo.angle,localFive:localFive.angle,wrap:wrap.angle*180/Math.PI,noLag:noLag.angle,strong:strong.length,diffuse:diffuse.length,mist:mist.length,maxStrength:api.systems.characters.fields.shadowStrength.max,maxLocal:api.systems.characters.fields.shadowLocalLightInfluence.max};
  });
  expect(result.left).toBeGreaterThan(result.right);expect(result.bias*180/Math.PI).toBeCloseTo(30,5);expect(result.steered).toBeGreaterThan(result.unsteered);expect(Math.abs(result.localFive-result.unsteered)).toBeGreaterThan(Math.abs(result.localTwo-result.unsteered));expect(result.wrap).toBeGreaterThan(359);expect(result.wrap).toBeLessThan(361);expect(result.noLag).toBeCloseTo(1.1,6);expect(result.strong).toBeGreaterThan(result.diffuse);expect(result.mist).toBeLessThan(result.strong);expect(result.maxStrength).toBe(10);expect(result.maxLocal).toBe(5);
});
test("GPU automatic shadow direction and length follow LVL-0001 through LVL-0003",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");const log=errors(page);
  const inspect=async(id,point)=>{await scene(page,id);await mode(page,'cinematic');await ready(page);let s=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());s.characters.groundingShadow=true;s.characters.shadowStrength=2;s.characters.shadowDirectionSmoothing=.08;await settings(page,s);await page.evaluate(point=>{const state=window.eval('state');state.worldX=point.x;state.worldY=point.y;state.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();},point);await nextFrames(page,20);await page.screenshot({path:info.outputPath(`${id}-automatic-shadow.png`)});return page.evaluate(({id,point})=>{const api=window.AtlasCinematicSettings,module=window.AtlasCinematicRenderer,runtime=window.eval('cinematicRenderer'),s=runtime.getSettings(),effective=api.effective(s),target=p=>module.shadowTarget(effective,p),withoutLocal=api.clone(effective),withoutMist=api.clone(effective);withoutLocal.characters.shadowLocalLightInfluence=0;withoutMist.atmosphere.enabled=false;const sample=target(point),localOff=module.shadowTarget(withoutLocal,point),mistOff=module.shadowTarget(withoutMist,point),trend=id==='LVL-0001'?[450,1050,1750].map(x=>target({x,y:570}).angle*180/Math.PI):[];return {sample,localOff,mistOff,trend,snapshot:runtime.snapshot()};},{id,point});};
  const strengthComparison=async()=>{await page.evaluate(()=>{const write=GPUQueue.prototype.writeBuffer;GPUQueue.prototype.writeBuffer=function(buffer,offset,data,...rest){if(data instanceof Float32Array&&data.length===128){data=data.slice();data[5]=10;}return write.call(this,buffer,offset,data,...rest);};});await page.addStyleTag({content:'*,*::before,*::after{animation-play-state:paused!important;transition:none!important}'});const actor=await page.locator('[data-actor="sven"]').boundingBox(),x=Math.max(0,actor.x-130),y=Math.max(0,actor.y+actor.height-55),clip={x,y,width:Math.min(300,1280-x),height:Math.min(110,800-y)};let s=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());s.characters.groundingShadow=true;s.characters.shadowOpacity=100;s.characters.shadowStrength=1;await settings(page,s);await nextFrames(page);const one=await page.screenshot({clip});s.characters.shadowStrength=2;await settings(page,s);await nextFrames(page);const two=await page.screenshot({clip,path:info.outputPath('LVL-0002-strength-2.png')});s.characters.shadowStrength=5;await settings(page,s);await nextFrames(page);const five=await page.screenshot({clip,path:info.outputPath('LVL-0002-strength-5.png')});s.characters.groundingShadow=false;await settings(page,s);await nextFrames(page);const off=await page.screenshot({clip});return {one:delta(one,off),two:delta(two,off),five:delta(five,off)};};
  const forest=await inspect('LVL-0001',{x:1200,y:515});expect(forest.trend[0]).toBeGreaterThan(forest.trend[1]);expect(forest.trend[1]).toBeGreaterThan(forest.trend[2]);expect(forest.trend[0]).toBeGreaterThan(40);expect(forest.trend[2]).toBeLessThan(50);
  const temple=await inspect('LVL-0002',{x:390,y:560}),templeStrength=await strengthComparison(),harbor=await inspect('LVL-0003',{x:360,y:560}),angleDelta=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b))*180/Math.PI);expect(angleDelta(temple.sample.angle,temple.localOff.angle)).toBeGreaterThan(.5);expect(angleDelta(temple.sample.angle,temple.localOff.angle)).toBeLessThan(40);expect(temple.sample.length).toBeLessThan(1.2);expect(templeStrength.two).toBeGreaterThan(templeStrength.one*1.15);expect(templeStrength.five).toBeGreaterThan(templeStrength.two*1.08);expect(angleDelta(harbor.sample.angle,harbor.localOff.angle)).toBeGreaterThan(.5);expect(angleDelta(harbor.sample.angle,harbor.localOff.angle)).toBeLessThan(40);expect(harbor.sample.length).toBeLessThanOrEqual(harbor.mistOff.length);for(const result of [forest,temple,harbor]){expect(result.snapshot.error).toBeNull();expect(result.snapshot.shadowDraws).toBeGreaterThan(0);expect(result.snapshot.shadowStates.every(v=>Number.isFinite(v.angle)&&Number.isFinite(v.length))).toBe(true);}await mode(page,'illustrated');expect(await page.locator('.cinematicViewportCanvas').count()).toBe(0);expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().shadowDraws)).toBe(0);console.log('AUTOMATIC_SHADOW_LEVELS',{forest,temple,templeStrength,harbor});expect(log).toEqual([]);
});
test("neutral schema, finite bounds, and explicit preservation classes", async ({ page }) => {
  await scene(page);
  const result = await page.evaluate(() => {
    const api = window.AtlasCinematicSettings;
    const defaults = api.normalize();
    const bad = api.normalize({ localLights: { enabled: true, items: [{ x: NaN, radius: Infinity, intensity: -100 }] }, autoExposure: { minExposure: 2, maxExposure: -2 } });
    const zeroDensity = window.AtlasCinematicRenderer.packEffects(api.normalize({shafts:{enabled:true,items:[{density:0}]}}))[0].data[14];
    return { defaults, bad, zeroDensity, packed: window.AtlasCinematicRenderer.packEffects(bad).every(e => Array.from(e.data).every(Number.isFinite)), preserved: ["water-surface", "water-shimmer", "bubbles-and-spray", "twinkling-stars", "surface-glint"].every(id => !api.replacedPresets.has(id)) };
  });
  expect(result.defaults.depth).toMatchObject({enabled:true});
  expect(result.defaults.gameplayCues).toMatchObject({enabled:true,intensity:1});
  expect(result.defaults.characters).toMatchObject({enabled:false,groundingShadow:true,shadowStrength:5,shadowLocalLightInfluence:2});
  expect(Object.entries(result.defaults).filter(([key,v]) => typeof v === "object" && !["depth","gameplayCues"].includes(key)).every(([,v]) => !v.enabled)).toBe(true);
  expect(result.bad.localLights.items[0]).toMatchObject({ x: 800, radius: 300, intensity: 0 });
  expect(result.bad.autoExposure.maxExposure).toBe(2);
  expect(result.packed).toBe(true); expect(result.preserved).toBe(true); expect(result.zeroDensity).toBe(0);
});

test("all 31 levels have intentional valid Cinematic authoring while Illustrated effects stay inventoried", () => {
  const vm=require("vm"),root=path.join(__dirname,".."),worldSource=fs.readFileSync(path.join(root,"Levels/world-config.js"),"utf8"),context={window:{}};
  vm.runInNewContext(worldSource,context,{filename:"Levels/world-config.js"});
  const levels=context.window.SVEN_WORLD_CONFIG.levels,ids=Array.from({length:31},(_,index)=>`LVL-${String(index+1).padStart(4,"0")}`);
  expect(ids.filter(id=>levels[id]?.cinematicLighting)).toEqual(ids);
  expect(worldSource).not.toContain('levels["LVL-0001"].cinematicLighting');
  expect(worldSource).not.toContain('levels["LVL-0002"].cinematicLighting');
  expect(worldSource).not.toContain('levels["LVL-0003"].cinematicLighting');
  const expectedIllustrated={
    "LVL-0001":{"focused-fog":1,"magical-glow":4,"sun-presence":1},"LVL-0002":{"light-source-enhancement":6},"LVL-0003":{"light-source-enhancement":6,"magical-glow":4},
    "LVL-0004":{"sun-presence":1,"light-source-enhancement":2,"water-shimmer":2,"focused-fog":1},"LVL-0005":{"light-source-enhancement":2,"bubbles-and-spray":1},"LVL-0006":{"light-source-enhancement":4},
    "LVL-0007":{"sun-presence":2,"water-shimmer":3},"LVL-0008":{"sparks-and-embers":3,"magical-glow":1},"LVL-0009":{"magical-glow":1,"sparks-and-embers":4},"LVL-0010":{},
    "LVL-0011":{"magical-glow":3,"sparks-and-embers":7},"LVL-0012":{"light-source-enhancement":3,"magical-glow":1},"LVL-0013":{"sun-presence":1,"water-shimmer":1},
    "LVL-0014":{"magical-glow":1,"water-shimmer":1},"LVL-0015":{"bubbles-and-spray":1},"LVL-0016":{"bubbles-and-spray":1},"LVL-0017":{"bubbles-and-spray":1},
    "LVL-0018":{"sun-presence":1,"focused-fog":1},"LVL-0019":{},"LVL-0020":{},"LVL-0021":{"sun-presence":1},"LVL-0022":{},"LVL-0023":{"water-shimmer":1},
    "LVL-0024":{"light-source-enhancement":1,"sparks-and-embers":1},"LVL-0025":{},"LVL-0026":{"twinkling-stars":1},"LVL-0027":{"light-source-enhancement":2},
    "LVL-0028":{"sun-presence":1},"LVL-0029":{"light-source-enhancement":3},"LVL-0030":{"sun-presence":1},"LVL-0031":{}
  };
  for(const id of ids){
    const levelContext={window:{SVEN_LEVEL_DEFINITIONS:{}}};
    vm.runInNewContext(fs.readFileSync(path.join(root,"Levels",id,"level.js"),"utf8"),levelContext,{filename:`${id}/level.js`});
    const levelDefinition=levelContext.window.SVEN_LEVEL_DEFINITIONS[id],depthBytes=fs.readFileSync(path.join(root,"Levels",id,"assets","depthmap.png"));
    expect(depthBytes.subarray(1,4).toString("ascii"),`${id} depthmap PNG`).toBe("PNG");
    expect([depthBytes.readUInt32BE(16),depthBytes.readUInt32BE(20)],`${id} depthmap dimensions`).toEqual([levelDefinition.world.width,levelDefinition.world.height]);
    const counts={};
    for(const effect of levelDefinition.sceneEffects||[])if(effect.enabled!==false)counts[effect.presetId]=(counts[effect.presetId]||0)+1;
    expect(counts,`${id} Illustrated effects changed`).toEqual(expectedIllustrated[id]);
    const normalized=contract.normalize(levels[id].cinematicLighting);
    expect(normalized.version).toBe(3);
    expect(normalized.characters).toMatchObject({groundingShadow:true,shadowStrength:5,shadowLocalLightInfluence:2});
    for(const [key,definition] of Object.entries(contract.systems)){
      const group=normalized[key];
      if(!definition.type)continue;
      expect(group.items.length,`${id}.${key} item cap`).toBeLessThanOrEqual(12);
      expect(new Set(group.items.map(item=>item.id)).size,`${id}.${key} IDs`).toBe(group.items.length);
      if(group.enabled)expect(group.items.length,`${id}.${key} enabled without authoring`).toBeGreaterThan(0);
      for(const item of group.items)for(const [field,schema] of Object.entries(definition.fields))if(!Array.isArray(schema)&&schema&&typeof schema==="object"&&"min" in schema){
        expect(Number.isFinite(item[field]),`${id}.${key}.${item.id}.${field} finite`).toBe(true);
        expect(item[field],`${id}.${key}.${item.id}.${field} min`).toBeGreaterThanOrEqual(schema.min);
        expect(item[field],`${id}.${key}.${item.id}.${field} max`).toBeLessThanOrEqual(schema.max);
      }
    }
  }
});

test("GPU all 31 authored levels load, render, ground Sven, and switch modes",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  test.setTimeout(300000);const log=errors(page),ids=Array.from({length:31},(_,index)=>`LVL-${String(index+1).padStart(4,"0")}`),results=[];
  await page.setViewportSize({width:1280,height:720});await scene(page,ids[0]);
  for(const [index,id] of ids.entries()){
    if(index)await page.evaluate(async levelId=>{await window.eval("selectLevel")(levelId,{startImmediately:true,recordStart:false});},id);
    await expect(page.locator('[data-actor="sven"]')).toBeVisible();
    await mode(page,"cinematic");await ready(page);await nextFrames(page,2);
    const snapshot=await page.evaluate(()=>window.eval("cinematicRenderer").snapshot());
    expect(snapshot.error,`${id} renderer error`).toBeNull();expect(snapshot.status,`${id} status`).toBe("ready");expect(snapshot.depthStatus,`${id} depth`).toBe("ready");expect(snapshot.depthPath,`${id} depth path`).toBe(`Levels/${id}/assets/depthmap.png`);expect(snapshot.drawCalls,`${id} draws`).toBeGreaterThan(0);expect(snapshot.shadowDraws,`${id} shadow`).toBeGreaterThan(0);
    await page.screenshot({path:info.outputPath(`${id}-cinematic.png`)});
    await mode(page,"illustrated");expect(await page.locator(".cinematicViewportCanvas").count(),`${id} Illustrated switch`).toBe(0);
    results.push({id,fps:snapshot.fps,drawCalls:snapshot.drawCalls,particles:snapshot.particles,shadowDraws:snapshot.shadowDraws,depthStatus:snapshot.depthStatus});
  }
  console.log("ALL_LEVEL_CINEMATIC_QA",results);expect(log).toEqual([]);
});
test("new depth, cue, ray-motion and simple shadow settings normalize and pack", async ({ page }) => {
  await scene(page);
  const result=await page.evaluate(()=>{
    const api=window.AtlasCinematicSettings;
    const explicit=api.normalize({depth:{enabled:false},gameplayCues:{enabled:false,intensity:0},characters:{groundingShadow:false,shadowShape:'capsule',shadowStrength:1.4,shadowSoftness:0.4,shadowWidth:1.2,shadowLength:1.3,shadowOffsetX:12,shadowOffsetY:-7,shadowDirection:35,shadowDarkBackgroundSuppression:0.8},localLights:{enabled:true,items:[{depthBias:-0.2}]},godRays:{enabled:true,items:[{rayMotion:0.4,motionSpeed:0.3,fadeVariation:0.5}]}});
    const packed=window.AtlasCinematicRenderer.packEffects(explicit);
    return {explicit,light:Array.from(packed.find(e=>e.key==='localLights').data),rays:Array.from(packed.find(e=>e.key==='godRays').data)};
  });
  expect(result.explicit.depth.enabled).toBe(false);expect(result.explicit.gameplayCues).toMatchObject({enabled:false,intensity:0});expect(result.explicit.characters).toMatchObject({groundingShadow:false,shadowShape:'capsule',shadowStrength:1.4,shadowSoftness:0.4,shadowWidth:1.2,shadowLength:1.3,shadowOffsetX:12,shadowOffsetY:-7,shadowDirection:35,shadowDarkBackgroundSuppression:0.8});
  expect(result.light[27]).toBeCloseTo(-0.2);expect(result.rays[30]).toBeCloseTo(0.4);expect(result.rays[31]).toBeCloseTo(0.3);expect(result.rays[33]).toBeCloseTo(0.5);
});
test("Experimental selection persists independently of Voxel", async ({ page }) => {
  await scene(page);
  await page.getByRole("button", { name: "Grafische instellingen" }).click();
  await expect(page.locator("fieldset").filter({ hasText: "Experimental" })).toContainText("Cinematic Lighting");
  await page.getByRole("button", { name: "Cinematic Lighting", exact: true }).click();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("atlas.graphics.v1")).renderer)).toBe("cinematic");
  await page.reload();
  expect(await page.evaluate(() => window.eval("voxelRenderer").getSettings().renderer)).toBe("cinematic");
});
test("gameplay cues share hotspot anchors and live pointer interaction", async ({ page }) => {
  await scene(page, "LVL-0001");
  const rune = page.locator("[data-rune]").first();
  const runeId = await rune.getAttribute("data-rune");
  const cueId = `challenge-${runeId}`;
  const snapshot = async () => page.evaluate(id => window.eval("cinematicGameplayCues")().find(cue => cue.id === id), cueId);
  const authored = await rune.evaluate(node => ({
    x: Number(node.dataset.worldCenterX),
    y: Number(node.dataset.worldCenterY)
  }));

  expect(await snapshot()).toMatchObject({ x: authored.x, y: authored.y, interaction: "idle" });
  await rune.hover();
  expect(await snapshot()).toMatchObject({ interaction: "hover" });
  await rune.dispatchEvent("pointerdown", { pointerId: 1, pointerType: "mouse", isPrimary: true });
  expect(await snapshot()).toMatchObject({ interaction: "pressed" });
  await page.evaluate(() => window.dispatchEvent(new PointerEvent("pointerup", { pointerId: 1, pointerType: "mouse", isPrimary: true })));
  expect(await snapshot()).toMatchObject({ interaction: "hover" });
  await page.mouse.move(1, 1);
  expect(await snapshot()).toMatchObject({ interaction: "idle" });

  await mode(page, "cinematic");
  expect(await rune.evaluate(node => getComputedStyle(node, "::after").content)).toBe("none");

  const exit = page.locator("[data-exit-hotspot]");
  const exitCue = await page.evaluate(() => window.eval("cinematicGameplayCues")().at(-1));
  expect(exitCue).toMatchObject({
    x: Number(await exit.getAttribute("data-world-center-x")),
    y: Number(await exit.getAttribute("data-world-center-y")),
    state: "locked"
  });
});
test("NPC grounding shadow defaults on and persists per character", async ({page})=>{
  await scene(page,"LVL-0001");
  const result=await page.evaluate(()=>{
    const challenge=window.eval('level').learningChallenges.find(item=>(item.presentationType||item.type)==='npc');
    const before=window.eval('npcConfigForChallenge')(challenge).groundingShadow;
    window.eval('updateChallengeNpcSetting')(challenge.id,'groundingShadow',false);
    const current=window.eval('level').learningChallenges.find(item=>item.id===challenge.id);
    return {name:current.npc.displayName,before,stored:current.npc.groundingShadow,after:window.eval('npcConfigForChallenge')(current).groundingShadow};
  });
  expect(result).toEqual({name:'Freya',before:true,stored:false,after:false});
});
test("GPU default Cinematic settings draw character shadows without enabling relighting",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  const log=errors(page);await scene(page,"LVL-0004");await mode(page,"cinematic");await ready(page);await nextFrames(page,5);
  const result=await page.evaluate(()=>({settings:window.eval('cinematicRenderer').getSettings().characters,snapshot:window.eval('cinematicRenderer').snapshot()}));
  expect(result.settings).toMatchObject({enabled:false,groundingShadow:true,shadowStrength:5,shadowLocalLightInfluence:2});
  expect(result.snapshot.shadowDraws).toBeGreaterThan(0);expect(result.snapshot.groundedSprites).toBeGreaterThan(0);expect(result.snapshot.error).toBeNull();expect(log).toEqual([]);
});
test("Cinematic Characters groups Grounding Shadow controls and conditionally shows Silhouette without remount",async({page})=>{
  await scene(page);await mode(page,'cinematic');await openEditor(page);await pane(page,'characters');const root=page.locator('[data-cinematic-group="characters"]');
  await root.evaluate(el=>el.dataset.qaIdentity='stable');
  for(const key of ['groundingShadow','showShadowContactDebug','shadowLightSourceX','shadowLightSourceY','shadowShape','shadowGroundlineOffset','shadowStrength','shadowOpacity','shadowSoftness','shadowWidth','shadowLength','shadowScale','shadowOffsetX','shadowOffsetY','shadowDirection','shadowGlobalLightInfluence','shadowLocalLightInfluence','shadowDirectionSmoothing','shadowDarkBackgroundSuppression','shadowAtmosphereSuppression'])await expect(root.locator(`[data-cinematic-section="characters"][data-cinematic-setting="${key}"]`)).toHaveCount(1);
  await expect(root.locator('[data-cinematic-setting="shadowStrength"]')).toHaveAttribute('max','10');await expect(root.locator('[data-cinematic-setting="shadowLocalLightInfluence"]')).toHaveAttribute('max','5');
  const shadow=root.locator('[data-cinematic-subsection="grounding-shadow"]'),relighting=root.locator('[data-cinematic-subsection="character-relighting"]');await expect(shadow.locator('summary')).toHaveText('Grounding Shadow');await expect(relighting.locator('summary')).toHaveText('Character Relighting');
  await expect(shadow).toContainText('General');await expect(shadow).toContainText('Grounding');await expect(shadow).toContainText('Direction / Lighting');await expect(shadow).toContainText('Appearance');await expect(shadow).toContainText('Shadow Light Source');await expect(shadow).toContainText('Groundline / Sole Offset');await expect(shadow).toContainText('Direction Bias');await expect(shadow).toContainText('Global Light Influence');await expect(shadow).toContainText('Local Light Influence');await expect(shadow).toContainText('Direction Smoothing');await expect(shadow).toContainText('Receiver Darkness Matching');await expect(shadow).toContainText('Atmosphere Suppression');await relighting.locator('summary').click();
  const placement=await page.evaluate(()=>{const state=window.eval('state');return {x:state.worldX,y:120,actor:{x:state.worldX,y:state.worldY}};});await root.locator('[data-cinematic-setting="shadowLightSourceX"]').fill(String(placement.x));await root.locator('[data-cinematic-setting="shadowLightSourceY"]').fill(String(placement.y));await expect(page.locator('[data-cinematic-handle="shadow-source"]')).toHaveCount(1);
  await root.locator('[data-cinematic-setting="shadowShape"]').selectOption('silhouette');await root.locator('[data-cinematic-setting="shadowScale"]').fill('1.4');await root.locator('[data-cinematic-setting="shadowShape"]').selectOption('wideSoft');await root.locator('[data-cinematic-setting="shadowStrength"]').fill('5');await root.locator('[data-cinematic-setting="shadowOpacity"]').fill('63');await root.locator('[data-cinematic-setting="shadowOffsetX"]').fill('24');await root.locator('[data-cinematic-setting="shadowOffsetY"]').fill('-9');
  const persisted=await page.evaluate(()=>({characters:window.eval('worldResolver').levelSettings('LVL-0001').cinematicLighting.characters,actor:{x:window.eval('state').worldX,y:window.eval('state').worldY}}));expect(persisted.characters).toMatchObject({shadowShape:'wideSoft',shadowStrength:5,shadowOpacity:63,shadowLightSourceX:placement.x,shadowLightSourceY:placement.y,shadowOffsetX:24,shadowOffsetY:-9,shadowScale:1.4});expect(persisted.actor).toEqual(placement.actor);
  await expect(root).toHaveAttribute('data-qa-identity','stable');await expect(root).toHaveJSProperty('open',true);await expect(shadow).toHaveJSProperty('open',true);await expect(relighting).toHaveJSProperty('open',false);
});

test("Graphics editor separates shared artwork appearance from Illustrated-only glow",async({page})=>{
  await scene(page);await openEditor(page);const panel=page.locator('[data-developer-tools]');
  const base=panel.locator('[data-editor-panel-key="simple-visual-controls"]'),glow=panel.locator('[data-editor-panel-key="emissive-glow"]');
  await expect(base.locator('summary')).toHaveText('Base artwork appearance');await expect(base).toContainText('Cinematic Global Grading is applied afterward');
  await expect(glow.locator('summary')).toHaveText('Emissive Glow (Illustrated)');await expect(glow).toContainText('used only by Illustrated Mode');
  expect(await page.evaluate(()=>{const heading=[...document.querySelectorAll('h3')].find(node=>node.textContent.trim()==='Illustrated effects'),glow=document.querySelector('[data-editor-panel-key="emissive-glow"]');return Boolean(heading&&glow&&(heading.compareDocumentPosition(glow)&Node.DOCUMENT_POSITION_FOLLOWING));})).toBe(true);
});
test("GPU Shadow Light Source marker drags without moving Sven",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");await scene(page);await mode(page,'cinematic');await ready(page);await openEditor(page);await pane(page,'characters');const root=page.locator('[data-cinematic-group="characters"]'),start=await page.evaluate(()=>{const state=window.eval('state');return {x:state.worldX,y:state.worldY};});await root.locator('[data-cinematic-setting="shadowLightSourceX"]').fill(String(start.x));await root.locator('[data-cinematic-setting="shadowLightSourceY"]').fill('120');const marker=page.locator('[data-cinematic-handle="shadow-source"]'),box=await marker.boundingBox(),before=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings().characters.shadowLightSourceX);await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+36,box.y+box.height/2+18,{steps:5});await page.mouse.up();const result=await page.evaluate(()=>({source:window.eval('cinematicRenderer').getSettings().characters.shadowLightSourceX,actor:{x:window.eval('state').worldX,y:window.eval('state').worldY}}));expect(result.source).toBeGreaterThan(before+20);expect(result.actor).toEqual(start);await expect(root).toHaveJSProperty('open',true);
});
test("GPU visible Sven preserves the complete current-frame alpha bounds",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");const log=errors(page);await page.setViewportSize({width:1800,height:900});await scene(page,"LVL-0001");await page.addStyleTag({content:'.adventureTeamBar{visibility:hidden!important}'});await mode(page,'cinematic');await ready(page);await page.evaluate(()=>{const state=window.eval('state');state.worldX=1200;state.worldY=570;state.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();});let s=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());for(const key of ['particles','atmosphere','shafts','godRays','localLights','bloom','autoExposure'])s[key].enabled=false;Object.assign(s.characters,{enabled:false,groundingShadow:false});await settings(page,s);await nextFrames(page,5);
  const actor=page.locator('[data-actor="sven"]'),box=await actor.boundingBox(),source=await actor.evaluate(img=>{const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;const context=canvas.getContext('2d',{willReadFrequently:true});context.drawImage(img,0,0);const data=context.getImageData(0,0,canvas.width,canvas.height).data;let minX=canvas.width,minY=canvas.height,maxX=-1,maxY=-1;for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++)if(data[(y*canvas.width+x)*4+3]>=48){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}return {src:img.currentSrc||img.src,width:canvas.width,height:canvas.height,minX,minY,maxX,maxY};}),clip={x:Math.max(0,box.x-8),y:Math.max(0,box.y-8),width:Math.min(1800-Math.max(0,box.x-8),box.width+16),height:Math.min(900-Math.max(0,box.y-8),box.height+16)},on=await page.screenshot({clip,path:info.outputPath('visible-sven-head-on.png')});await page.evaluate(()=>{window.__atlasOriginalQuerySelector=document.querySelector;document.querySelector=function(selector){if(selector==="[data-actor='sven']")return null;return window.__atlasOriginalQuerySelector.call(this,selector);};});await nextFrames(page,5);const off=await page.screenshot({clip});await page.evaluate(()=>{document.querySelector=window.__atlasOriginalQuerySelector;delete window.__atlasOriginalQuerySelector;});const visible=differenceBounds(on,off,8),expectedTop=8+source.minY/source.height*box.height,expectedBottom=8+(source.maxY+1)/source.height*box.height;console.log('VISIBLE_SVEN_BOUNDS',{box,source,visible,expectedTop,expectedBottom});expect(visible.count).toBeGreaterThan(100);expect(Math.abs(visible.minY-expectedTop)).toBeLessThan(3);expect(Math.abs((visible.maxY+1)-expectedBottom)).toBeLessThan(3);expect(log).toEqual([]);
});
test("GPU visible Sven head stays intact with large shadows, walking, facing and depth",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");const log=errors(page);test.setTimeout(60000);await page.setViewportSize({width:1800,height:900});await scene(page,'LVL-0001');await page.addStyleTag({content:'.adventureTeamBar{visibility:hidden!important}'});await mode(page,'cinematic');await ready(page);let s=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());Object.assign(s.characters,{enabled:true,groundingShadow:true,shadowShape:'silhouette',shadowStrength:5,shadowOpacity:100,shadowSoftness:6,shadowLength:3,shadowWidth:4,shadowScale:3});s.depth.enabled=true;await settings(page,s);const head=async name=>{await nextFrames(page,3);const actor=page.locator('[data-actor="sven"]');await expect(actor).toBeVisible();const box=await actor.boundingBox();expect(box).not.toBeNull();const clip={x:Math.max(0,box.x-12),y:Math.max(0,box.y-12),width:Math.min(1800-Math.max(0,box.x-12),box.width+24),height:Math.min(900-Math.max(0,box.y-12),box.height*.48)};return page.screenshot({clip,path:info.outputPath(`${name}.png`)});};
  for(const [index,x] of [700,1200,1650].entries()){await page.evaluate(x=>{const state=window.eval('state');state.worldX=x;state.worldY=570;state.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();},x);await head(`LVL-0001-idle-head-${index+1}`);}await page.evaluate(()=>{const state=window.eval('state');window.eval('walkRoute')([{x:state.worldX-500,y:state.worldY}],()=>{},window.eval('replaceMovementIntent')({type:'visible-head-qa-left'}));});for(let i=0;i<3;i++){await nextFrames(page,12);await head(`LVL-0001-walk-left-head-${i+1}`);}await page.evaluate(async()=>{const state=window.eval('state'),deadline=performance.now()+10000;while(state.movement&&performance.now()<deadline)await new Promise(requestAnimationFrame);window.eval('walkRoute')([{x:state.worldX+280,y:state.worldY}],()=>{},window.eval('replaceMovementIntent')({type:'visible-head-qa-right'}));});await nextFrames(page,18);await head('LVL-0001-walk-right-head');await page.evaluate(async()=>{const state=window.eval('state'),deadline=performance.now()+10000;while(state.movement&&performance.now()<deadline)await new Promise(requestAnimationFrame);});await head('LVL-0001-final-idle-head');
  await page.evaluate(async()=>window.eval('selectLevel')('LVL-0002',{startImmediately:true,recordStart:false}));await mode(page,'cinematic');await ready(page);s=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());Object.assign(s.characters,{enabled:true,groundingShadow:true,shadowShape:'silhouette',shadowStrength:5,shadowOpacity:100,shadowSoftness:6,shadowLength:3,shadowWidth:4,shadowScale:3});s.depth.enabled=true;await settings(page,s);await head('LVL-0002-idle-head');const snapshot=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot());expect(snapshot.error).toBeNull();expect(snapshot.groundedSprites).toBeGreaterThan(0);expect(log).toEqual([]);
});
test("GPU Silhouette shadow uses the live sprite alpha with stable realtime feet",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");const log=errors(page);await page.setViewportSize({width:1800,height:900});await scene(page,"LVL-0001");await page.addStyleTag({content:'.adventureTeamBar{visibility:hidden!important}'});await page.evaluate(()=>{for(const challenge of window.eval('level').learningChallenges||[])if(challenge.npc)challenge.npc.groundingShadow=false;});await mode(page,"cinematic");await ready(page);await page.evaluate(()=>{const state=window.eval('state');state.worldX=1200;state.worldY=570;state.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();});await nextFrames(page,10);
  const ground=await page.evaluate(()=>({x:window.eval('state').worldX,y:window.eval('state').worldY}));let s=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());Object.assign(s.characters,{groundingShadow:true,shadowShape:'silhouette',shadowGroundlineOffset:0,shadowStrength:5,shadowOpacity:100,shadowSoftness:.5,shadowLength:1.6,shadowWidth:1,shadowScale:1.3,shadowOffsetX:0,shadowOffsetY:0,shadowDirection:0,shadowLocalLightInfluence:0,shadowDarkBackgroundSuppression:0});await settings(page,s);await nextFrames(page,12);const direction=await page.evaluate(p=>{const c=window.eval('cinematicRenderer').getSettings().characters,t=window.AtlasCinematicRenderer.shadowTarget(window.AtlasCinematicSettings.effective(window.eval('cinematicRenderer').getSettings()),p);return {base:t.baseAngle,expected:Math.atan2(p.y-c.shadowLightSourceY,p.x-c.shadowLightSourceX),local:t.localOffset};},ground);expect(direction.base).toBeCloseTo(direction.expected,6);expect(direction.local).toBeCloseTo(0,6);
  const actor=await page.locator('[data-actor="sven"]').boundingBox(),clip={x:Math.max(0,actor.x-240),y:Math.max(0,actor.y-20),width:Math.min(720,1800-Math.max(0,actor.x-240)),height:Math.min(actor.height+340,900-Math.max(0,actor.y-20))},soles=await page.locator('[data-actor="sven"]').evaluate(img=>{const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0);const a=x.getImageData(0,0,c.width,c.height).data,half=(from,to)=>{let bottom=0;for(let py=0;py<c.height;py++)for(let px=Math.floor(c.width*from);px<Math.floor(c.width*to);px++)if(a[(py*c.width+px)*4+3]>48)bottom=py;let sum=0,count=0;for(let py=Math.max(0,bottom-5);py<=bottom;py++)for(let px=Math.floor(c.width*from);px<Math.floor(c.width*to);px++)if(a[(py*c.width+px)*4+3]>48){sum+=px;count++;}return {x:sum/Math.max(1,count)/c.width,y:bottom/c.height};};return [half(.1,.5),half(.5,.9)];});
  const grounding=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().grounding.find(item=>item.key==='actor:sven'));const base=await page.screenshot({clip,path:info.outputPath('bright-ground-facing-right.png')});s.characters.showShadowContactDebug=true;await settings(page,s);await nextFrames(page,3);const debug=await page.screenshot({clip,path:info.outputPath('bright-ground-contact-debug.png')});const debugBox=point=>({x:point.x*1800-clip.x-8,y:point.y*900-clip.y-8,width:16,height:16});expect(delta(debug,base)).toBeGreaterThan(.01);expect(bluePixels(debug)).toBeGreaterThan(bluePixels(base));expect(bluePixelsIn(debug,debugBox(grounding.left.point))).toBeGreaterThan(4);expect(bluePixelsIn(debug,debugBox(grounding.right.point))).toBeGreaterThan(4);s.characters.showShadowContactDebug=false;s.characters.groundingShadow=false;await settings(page,s);await nextFrames(page);const off=await page.screenshot({clip,path:info.outputPath('bright-ground-shadow-off.png')});expect(delta(base,off)).toBeGreaterThan(.15);const contact=sole=>regionDelta(base,off,{x:actor.x+actor.width*sole.x-clip.x-10,y:actor.y+actor.height*sole.y-clip.y-3,width:20,height:15}),leftContact=contact(soles[0]),rightContact=contact(soles[1]);console.log('SOLE_GROUNDING',{soles,grounding,leftContact,rightContact});expect(leftContact).toBeGreaterThan(.5);expect(rightContact).toBeGreaterThan(.5);s.characters.groundingShadow=true;
  for(const key of ['particles','atmosphere','shafts','godRays','localLights','bloom','autoExposure'])s[key].enabled=false;await settings(page,s);await nextFrames(page,5);const measureShadow=async(name)=>{await settings(page,s);await nextFrames(page,2);const on=await page.screenshot({clip,path:info.outputPath(`${name}.png`)});s.characters.groundingShadow=false;await settings(page,s);await nextFrames(page,2);const none=await page.screenshot({clip});s.characters.groundingShadow=true;return delta(on,none);};
  s.characters.shadowOpacity=100;const strengthDeltas=[];for(const strength of [0,1,2,5,10]){s.characters.shadowStrength=strength;strengthDeltas.push(await measureShadow(`strength-${strength}`));}expect(strengthDeltas[0]).toBeLessThan(.05);expect(strengthDeltas[1]).toBeGreaterThan(.1);expect(strengthDeltas[2]).toBeGreaterThan(strengthDeltas[1]*1.12);expect(strengthDeltas[3]).toBeGreaterThan(strengthDeltas[2]*1.08);expect(strengthDeltas[4]).toBeGreaterThan(strengthDeltas[3]*1.01);
  s.characters.shadowStrength=1;const opacityDeltas=[];for(const opacity of [0,25,50,75,100]){s.characters.shadowOpacity=opacity;opacityDeltas.push(await measureShadow(`opacity-${opacity}`));}expect(opacityDeltas[0]).toBeLessThan(.1);for(let i=1;i<opacityDeltas.length;i++)expect(opacityDeltas[i]).toBeGreaterThan(opacityDeltas[i-1]*.95);expect(opacityDeltas[4]).toBeGreaterThan(opacityDeltas[1]*1.5);s.characters.shadowStrength=5;s.characters.shadowOpacity=100;await settings(page,s);
  s.characters.shadowScale=.5;await settings(page,s);await nextFrames(page,6);const small=await page.screenshot({clip});s.characters.shadowScale=2.5;await settings(page,s);await nextFrames(page,6);const large=await page.screenshot({clip,path:info.outputPath('silhouette-large.png')});expect(delta(small,large)).toBeGreaterThan(.03);s.characters.shadowScale=1.3;
  s.characters.shadowSoftness=0;await settings(page,s);await nextFrames(page,5);const softness0=await page.screenshot({clip,path:info.outputPath('silhouette-softness-0.png')});s.characters.shadowSoftness=3;await settings(page,s);await nextFrames(page,5);const softness3=await page.screenshot({clip,path:info.outputPath('silhouette-softness-3.png')});s.characters.shadowSoftness=6;await settings(page,s);await nextFrames(page,5);const softness6=await page.screenshot({clip,path:info.outputPath('silhouette-softness-6.png')});const softness3Delta=delta(softness0,softness3),softness6Delta=delta(softness0,softness6);expect(softness3Delta).toBeGreaterThan(.01);expect(softness6Delta).toBeGreaterThan(softness3Delta*1.05);s.characters.shadowSoftness=.5;
  Object.assign(s.characters,{shadowStrength:5,shadowOpacity:100,shadowLength:3,shadowWidth:4,shadowScale:3,shadowSoftness:6});await settings(page,s);await nextFrames(page,5);await page.screenshot({path:info.outputPath('bounds-long-wide-soft-idle-right.png')});await page.evaluate(()=>{const state=window.eval('state');window.eval('walkRoute')([{x:state.worldX+500,y:state.worldY}],()=>{},window.eval('replaceMovementIntent')({type:'shadow-bounds-capture'}));});for(let i=0;i<3;i++){await nextFrames(page,16);await page.screenshot({path:info.outputPath(`bounds-long-wide-soft-walk-${i+1}.png`)});}await page.evaluate(async()=>{const state=window.eval('state'),deadline=performance.now()+10000;while(state.movement&&performance.now()<deadline)await new Promise(requestAnimationFrame);});Object.assign(s.characters,{shadowLength:.25,shadowWidth:1,shadowScale:1.2,shadowSoftness:0});await settings(page,s);await nextFrames(page,5);await page.screenshot({path:info.outputPath('bounds-short-crisp-idle.png')});Object.assign(s.characters,{shadowLength:1.6,shadowWidth:1,shadowScale:1.3,shadowSoftness:.5,shadowStrength:5,shadowDarkBackgroundSuppression:.9});await settings(page,s);
  const movement=await page.evaluate(async()=>{const state=window.eval('state'),start=state.worldX,positions=[],contacts=[];for(const x of [start-140,start-420]){window.eval('walkRoute')([{x,y:state.worldY}],()=>{},window.eval('replaceMovementIntent')({type:'grounded-shadow-qa'}));const deadline=performance.now()+10000;while(state.movement&&performance.now()<deadline){positions.push(state.worldX);const g=window.eval('cinematicRenderer').snapshot().grounding.find(item=>item.key==='actor:sven');if(g)contacts.push([g.left.center,g.left.bottom,g.right.center,g.right.bottom]);await new Promise(requestAnimationFrame);}}const tail=[];for(let i=0;i<14;i++){await new Promise(requestAnimationFrame);const snapshot=window.eval('cinematicRenderer').snapshot(),shadow=snapshot.shadowStates.find(item=>item.key==='actor:sven');tail.push([state.worldX,shadow?.angle||0]);}const range=index=>Math.max(...tail.map(v=>v[index]))-Math.min(...tail.map(v=>v[index])),contactRange=contacts.length?Math.max(...contacts.map(v=>v[0]))-Math.min(...contacts.map(v=>v[0])):0;return {count:positions.length,travel:Math.max(...positions)-Math.min(...positions),contactFrames:contacts.length,contactRange,postStopPositionRange:range(0),postStopAngleRange:range(1),facing:document.querySelector('[data-actor="sven"]').dataset.resolvedFacing,snapshot:window.eval('cinematicRenderer').snapshot()};});expect(movement.count).toBeGreaterThan(60);expect(movement.travel).toBeGreaterThan(.01);expect(movement.contactFrames).toBeGreaterThan(60);expect(movement.contactRange).toBeGreaterThan(.01);expect(movement.postStopPositionRange).toBeLessThan(.0001);expect(movement.postStopAngleRange).toBeLessThan(.0001);expect(movement.facing).toBe('left');expect(movement.snapshot.groundedSprites).toBeGreaterThan(0);expect(movement.snapshot.error).toBeNull();const captureSuppressed=async(name,x)=>{await page.evaluate(x=>{const state=window.eval('state');state.worldX=x;state.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();},x);await nextFrames(page,8);const box=await page.locator('[data-actor="sven"]').boundingBox(),area={x:Math.max(0,box.x-240),y:Math.max(0,box.y-20),width:Math.min(720,1800-Math.max(0,box.x-240)),height:Math.min(box.height+340,900-Math.max(0,box.y-20))};await page.screenshot({clip:area,path:info.outputPath(`${name}.png`)});};await captureSuppressed('bright-ground-suppressed-1',1200);await captureSuppressed('bright-ground-suppressed-2',900);await captureSuppressed('bright-ground-suppressed-3',600);
  await mode(page,'illustrated');expect(await page.locator('.cinematicViewportCanvas').count()).toBe(0);expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().shadowDraws)).toBe(0);console.log('GROUNDED_ALPHA_SHADOW',{leftContact,rightContact,strengthDeltas,opacityDeltas,softness3Delta,softness6Delta,movement,direction});expect(log).toEqual([]);
});
test("GPU alpha Grounding Shadow remains coherent in forest, mixed light, moonlight and on a standard NPC",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");const log=errors(page);test.setTimeout(60000);await page.setViewportSize({width:1800,height:900});await scene(page,"LVL-0001");await page.addStyleTag({content:'.adventureTeamBar{visibility:hidden!important}'});
  const levels=[];
  for(const id of ["LVL-0001","LVL-0002","LVL-0003"]){
    await page.evaluate(async id=>window.eval('selectLevel')(id,{startImmediately:true,recordStart:false}),id);await mode(page,'cinematic');await ready(page);let s=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());Object.assign(s.characters,{groundingShadow:true,shadowShape:'silhouette',shadowStrength:4,shadowSoftness:2,shadowScale:1.2,shadowLength:1.25,shadowDarkBackgroundSuppression:.35});await settings(page,s);await nextFrames(page,10);
    const actor=await page.locator('[data-actor="sven"]').boundingBox(),clip={x:Math.max(0,actor.x-220),y:Math.max(0,actor.y-25),width:Math.min(680,1800-Math.max(0,actor.x-220)),height:Math.min(actor.height+300,900-Math.max(0,actor.y-25))};const on=await page.screenshot({clip,path:info.outputPath(`${id}-grounding.png`)});s.characters.groundingShadow=false;await settings(page,s);await nextFrames(page,3);const off=await page.screenshot({clip});const difference=delta(on,off);expect(difference).toBeGreaterThan(.05);s.characters.groundingShadow=true;await settings(page,s);await nextFrames(page,2);const snapshot=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot());expect(snapshot.levelId).toBe(id);expect(snapshot.error).toBeNull();expect(snapshot.groundedSprites).toBeGreaterThan(0);levels.push({id,grounded:snapshot.groundedSprites,shadowDraws:snapshot.shadowDraws,difference,direction:snapshot.shadowStates.find(item=>item.key==='actor:sven')?.angle});
  }
  await page.evaluate(async()=>{await window.eval('selectLevel')('LVL-0001',{startImmediately:true,recordStart:false});const challenge=window.eval('level').learningChallenges.find(item=>item.npc);const p=window.eval('getApproachPoint')(challenge);const state=window.eval('state');state.worldX=p.x;state.worldY=p.y;state.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();});await mode(page,'cinematic');await ready(page);let s=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());Object.assign(s.characters,{groundingShadow:true,showShadowContactDebug:true,shadowShape:'silhouette',shadowStrength:5,shadowOpacity:100,shadowSoftness:1,shadowDarkBackgroundSuppression:0});await settings(page,s);await nextFrames(page,10);const npc=page.locator('[data-npc-challenge] [data-npc-sprite]:visible').first();await expect(npc).toBeVisible();const npcBox=await npc.boundingBox(),npcClip={x:Math.max(0,npcBox.x-180),y:Math.max(0,npcBox.y-20),width:Math.min(560,1800-Math.max(0,npcBox.x-180)),height:Math.min(npcBox.height+260,900-Math.max(0,npcBox.y-20))},npcGrounding=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().grounding.find(item=>item.key.startsWith('npc:')));const npcOn=await page.screenshot({clip:npcClip,path:info.outputPath('LVL-0001-standard-npc-grounding.png')}),npcDebugBox=point=>({x:point.x*1800-npcClip.x-8,y:point.y*900-npcClip.y-8,width:16,height:16});expect(bluePixelsIn(npcOn,npcDebugBox(npcGrounding.left.point))).toBeGreaterThan(4);expect(bluePixelsIn(npcOn,npcDebugBox(npcGrounding.right.point))).toBeGreaterThan(4);s.characters.groundingShadow=false;await settings(page,s);await nextFrames(page,3);const npcOff=await page.screenshot({clip:npcClip});const npcDifference=delta(npcOn,npcOff);expect(npcDifference).toBeGreaterThan(.05);s.characters.groundingShadow=true;await settings(page,s);await nextFrames(page,2);const npcSnapshot=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot());expect(npcSnapshot.grounding.some(item=>item.key.startsWith('npc:'))).toBe(true);expect(npcSnapshot.error).toBeNull();console.log('MULTI_LEVEL_GROUNDING',{levels,npcGrounded:npcSnapshot.grounding.filter(item=>item.key.startsWith('npc:')).length,npcDifference});expect(log).toEqual([]);
});
test("Illustrated keeps only its legacy CSS shadow and has zero Grounding draws",async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await scene(page);await page.addStyleTag({content:'*,*::before,*::after{animation-play-state:paused!important;transition:none!important}'});
  const check=async renderer=>{await mode(page,renderer);await page.waitForTimeout(50);const before=await page.screenshot();await page.evaluate(()=>{const id=window.eval('level').id,s=window.eval('worldResolver').levelSettings(id).cinematicLighting;s.characters.groundingShadow=!s.characters.groundingShadow;window.eval('worldResolver').updateLevelSettings(id,{cinematicLighting:s});window.eval('cinematicRenderer').sync();window.eval('render')();});const after=await page.screenshot();return {visual:delta(before,after),canvases:await page.locator('.cinematicViewportCanvas').count()};};
  for(const renderer of ['illustrated','voxel']){const result=await check(renderer);expect(result.canvases).toBe(0);if(renderer==='illustrated')expect(result.visual).toBeLessThan(0.1);expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().shadowDraws)).toBe(0);}
  await mode(page,'illustrated');expect(await page.locator('[data-actor-shell="sven"]').evaluate(el=>getComputedStyle(el).filter)).toContain('drop-shadow');
});
test("GPU pipelines compile and combined features render", async ({ page }, info) => {
  test.skip(!process.env.ATLAS_WEBGPU_QA || info.project.name !== "desktop-chromium", "HTTP Chromium WebGPU run required");
  const log = errors(page); await scene(page);
  const combined = contract.normalize();
  for (const [key, def] of Object.entries(contract.systems)) { combined[key].enabled = true; if (def.type) combined[key].items.push(contract.instance(key, { x: 450, y: 400, count: 2000 })); }
  await settings(page, combined); await mode(page, "cinematic"); await ready(page);
  await expect.poll(() => page.evaluate(() => window.eval("cinematicRenderer").snapshot().frame)).toBeGreaterThan(3);
  await page.screenshot({ path: info.outputPath("combined.png") });
  console.log("CINEMATIC_METRICS", await page.evaluate(() => window.eval("cinematicRenderer").snapshot()));
  expect(log).toEqual([]);
});

for (const key of Object.keys(contract.systems)) test(`GPU visible output and independent toggle: ${key}`, async ({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA || info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  const log=errors(page);await scene(page);await settings(page,{});await mode(page,"cinematic");await ready(page);
  const s=contract.normalize();let clip;
  if(["characters","wrap","rim"].includes(key)){
    const point=await page.evaluate(()=>({x:window.eval("state").worldX,y:window.eval("state").worldY-65}));
    s.localLights={enabled:true,items:[contract.instance("localLights",{...point,intensity:3,color:"#ff9040",radius:350,falloff:1})]};
    const box=await page.locator('[data-actor="sven"]').boundingBox();clip={x:box.x,y:box.y,width:box.width,height:box.height};
  }
  const def=contract.systems[key];
  if(def.type)s[key].items=[contract.instance(key,{x:420,y:330,width:850,height:500,length:800,radius:480,intensity:2,density:0.8,count:10000,opacity:0.8,size:2.5,direction:65})];
  if(key==="grading")Object.assign(s[key],{exposure:0.6,warmth:0.35,contrast:1.1});
  if(key==="bloom")Object.assign(s[key],{threshold:0.5,intensity:0.6,radius:12});
  if(key==="characters")Object.assign(s[key],{localInfluence:1.4,intensityResponse:1.2});
  if(key==="wrap")Object.assign(s[key],{strength:0.6,radius:5});
  if(key==="rim")Object.assign(s[key],{strength:0.8,width:4,localInfluence:1.8});
  if(key==="autoExposure")Object.assign(s[key],{minExposure:0.8,maxExposure:0.8,strength:1,adaptationSpeed:2});
  if(key==="finishing")Object.assign(s[key],{intensity:0.6,finalExposure:-0.2});
  if(key==="depth"){s.shafts={enabled:true,items:[contract.instance('shafts',{x:100,y:30,direction:55,length:1200,width:240,intensity:2,density:1.2})]};s.depth.perspective=0.2;}
  await settings(page,s);await nextFrames(page);const off=await page.screenshot({clip,path:info.outputPath(`${key}-off.png`)});
  s[key].enabled=true;await settings(page,s);await nextFrames(page,key==="autoExposure"?75:5);const on=await page.screenshot({clip,path:info.outputPath(`${key}-on.png`)});
  const difference=delta(off,on);console.log("PIXEL_DIFFERENCE",key,difference.toFixed(3));expect(difference).toBeGreaterThan(key==="rim"||key==="wrap"?0.01:0.05);
  s[key].enabled=false;await settings(page,s);await nextFrames(page);expect(await page.evaluate(key=>window.eval("cinematicRenderer").getSettings()[key].enabled,key)).toBe(false);
  expect(log).toEqual([]);
});

test("legacy suppression is selective and Illustrated data stays untouched",async({page})=>{
  await scene(page);const original=await page.evaluate(()=>JSON.stringify(window.eval("level").sceneEffects));
  const before=await page.evaluate(()=>window.eval("sceneEffectRuntime").resolved.map(e=>e.preset.id));expect(before).toContain("sun-presence");
  await mode(page,"cinematic");
  expect(await page.evaluate(()=>window.eval("sceneEffectRuntime").resolved.some(e=>window.AtlasCinematicSettings.replacedPresets.has(e.preset.id)))).toBe(false);
  await page.evaluate(()=>{const l=window.eval("level");for(const [i,id] of ["water-surface","water-shimmer","bubbles-and-spray","twinkling-stars","surface-glint"].entries())l.sceneEffects.push(window.AtlasSceneEffects.defaultInstance(id,null,l.world,i+30));window.eval("sceneEffectRuntime").prepareLevel(l);window.eval("render")();});
  const preserved=await page.evaluate(()=>window.eval("sceneEffectRuntime").resolved.map(e=>e.preset.id));expect(preserved).toEqual(expect.arrayContaining(["water-surface","water-shimmer","bubbles-and-spray","twinkling-stars","surface-glint"]));
  await expect(page.locator('[data-ambient-animal]')).not.toHaveCount(0);
  await page.evaluate(value=>{window.eval("level").sceneEffects=JSON.parse(value);window.eval("sceneEffectRuntime").prepareLevel(window.eval("level"));},original);
  await mode(page,"illustrated");expect(await page.evaluate(()=>JSON.stringify(window.eval("level").sceneEffects))).toBe(original);
  expect(await page.evaluate(()=>window.eval("sceneEffectRuntime").resolved.map(e=>e.preset.id))).toEqual(before);
});

test("editor controls retain DOM identity, focus, selection, scroll; reset and revert",async({page})=>{
  await scene(page);await openEditor(page);const root=page.locator('[data-cinematic-editor]');
  await pane(page,'localLights');
  await root.locator('[data-cinematic-action="add"][data-section="localLights"]').click();
  const input=root.locator('[data-cinematic-section="localLights"][data-cinematic-setting="intensity"]');
  await input.scrollIntoViewIfNeeded();await input.focus();
  const prior=await input.evaluate(el=>{window.cinematicIdentity={input:el,root:el.closest('[data-developer-tools]'),scroll:el.closest('[data-developer-tools]').scrollTop};return {scroll:window.cinematicIdentity.scroll,selected:document.querySelector('[data-cinematic-select="localLights"]').value};});
  await input.fill("1.21");
  expect(await input.evaluate(el=>({same:el===window.cinematicIdentity.input,panel:el.closest('[data-developer-tools]')===window.cinematicIdentity.root,focus:document.activeElement===el,scroll:el.closest('[data-developer-tools]').scrollTop}))).toEqual({same:true,panel:true,focus:true,scroll:prior.scroll});
  await expect(root.locator('[data-cinematic-select="localLights"]')).toHaveValue(prior.selected);
  await expect(page.locator('[data-developer-tools]')).toHaveAttribute('data-current-editor-mode','graphics');
  await pane(page,'atmosphere');
  await root.locator('[data-cinematic-action="add"][data-section="atmosphere"]').click();
  await root.locator('[data-cinematic-section="atmosphere"][data-cinematic-setting="density"]').fill('0.42');
  const animalsBeforeReset=await page.evaluate(()=>JSON.stringify(window.eval('level').ambientAnimals));
  await pane(page,'localLights');
  await root.locator('[data-cinematic-action="reset"][data-section="localLights"]').click();
  await expect(root.locator('[data-cinematic-system="localLights"]')).not.toBeChecked();
  expect(await page.evaluate(()=>JSON.stringify(window.eval('level').ambientAnimals))).toBe(animalsBeforeReset);
  const reset=await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0001').cinematicLighting);expect(reset.localLights).toEqual({enabled:false,items:[]});expect(reset.atmosphere.items.at(-1).density).toBe(0.42);
  await page.locator('[data-debug-action="revert-walkpath"]').click();
  await expect(page.locator('[data-editor-draft-status]')).toHaveText('Draft Status: Reverted');
  expect(await page.evaluate(()=>window.AtlasCinematicSettings.normalize(window.eval('worldResolver').levelSettings('LVL-0001').cinematicLighting).localLights.items.some(i=>i.id==='rune-spill'))).toBe(true);
});

test("Apply persists local lights and atmosphere per level over HTTP",async({page},info)=>{
  test.skip(!process.env.ATLAS_EDITOR_URL||info.project.name!=="desktop-chromium","Single desktop disk persistence test");
  const configPath=path.join(__dirname,'..','Levels','world-config.js'),original=fs.readFileSync(configPath,'utf8');
  try{
    await scene(page);await openEditor(page);const root=page.locator('[data-cinematic-editor]');
    await pane(page,'localLights');await root.locator('[data-cinematic-section="localLights"][data-cinematic-setting="intensity"]').fill('1.37');
    await pane(page,'atmosphere');await root.locator('[data-cinematic-section="atmosphere"][data-cinematic-setting="density"]').fill('0.37');
    await root.locator('[data-cinematic-layer-enabled]').uncheck();
    await pane(page,'depth');await root.locator('[data-cinematic-section="depth"][data-cinematic-setting="filterRadius"]').fill('2.25');
    await page.locator('[data-debug-action="apply-walkpath"]').click();await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Applied');
    await page.reload();const persisted=await page.evaluate(()=>window.SVEN_WORLD_CONFIG.levels['LVL-0001'].cinematicLighting);expect(persisted.localLights.items[0].intensity).toBe(1.37);expect(persisted.atmosphere.items[0].density).toBe(0.37);
    expect(persisted.layers.environment).toBe(false);expect(persisted.depth.filterRadius).toBe(2.25);expect(persisted.localLights.items[0].layer).toBe('effects');expect(persisted.localLights.items[0].name).toBeTruthy();
    expect(await page.evaluate(()=>window.SVEN_WORLD_CONFIG.levels['LVL-0002'].cinematicLighting.localLights.items[0].id)).toBe('left-brazier');
  }finally{fs.writeFileSync(configPath,original);}
});

test("GPU repeated renderer and level switching, resize, authored isolation",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");test.setTimeout(90000);
  const log=errors(page);await scene(page);
  for(const id of ['LVL-0001','LVL-0002','LVL-0004']){
    await page.evaluate(async id=>window.eval('selectLevel')(id,{startImmediately:true,recordStart:false}),id);
    // Voxel's pre-existing optional depth probe returns a 404 on LVL-0004. Keep that
    // independent path out of the depth-free Cinematic level-isolation check.
    for(const renderer of id==='LVL-0004'?['illustrated','cinematic','illustrated','cinematic']:['illustrated','cinematic','voxel','cinematic','illustrated','voxel','illustrated']){
      await mode(page,renderer);if(renderer==='cinematic'){await ready(page);expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().levelId)).toBe(id);if(id==='LVL-0004')expect(await page.evaluate(()=>window.eval('cinematicRenderer').getSettings().localLights.items.map(item=>item.id))).toEqual(['left-lantern','right-lantern']);}
      if(renderer==='voxel')await expect.poll(()=>page.evaluate(()=>window.eval('voxelRenderer').snapshot().status),{timeout:25000}).toBe('ready');
      await expect(page.locator('[data-cinematic-canvas]')).toHaveCount(renderer==='cinematic'?1:0);await expect(page.locator('[data-voxel-canvas]')).toHaveCount(renderer==='voxel'?1:0);
    }
  }
  await mode(page,'cinematic');await ready(page);await page.setViewportSize({width:1024,height:768});await nextFrames(page);await page.setViewportSize({width:768,height:1024});await nextFrames(page);
  expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().resolution)).toEqual([768,1024]);expect(log).toEqual([]);
  await page.evaluate(()=>{for(let i=0;i<12;i++){window.eval('voxelRenderer').updateSettings({renderer:i%2?'cinematic':'illustrated'});window.eval('render')();}});await ready(page);await expect(page.locator('[data-cinematic-canvas]')).toHaveCount(1);expect(log).toEqual([]);
});

test("unavailable WebGPU reports an explicit error without hiding source artwork",async({page})=>{
  await page.addInitScript(()=>Object.defineProperty(navigator,'gpu',{get:()=>undefined}));await scene(page);await mode(page,'cinematic');
  await expect(page.locator('[data-cinematic-error]')).toContainText('WebGPU API');await expect(page.locator('.gameShell')).not.toHaveClass(/cinematicReady/);await expect(page.locator('.worldArt')).toBeVisible();
});

test("GPU Sven and NPC relighting survives all poses, manual appearance and delayed images",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");test.setTimeout(90000);
  const log=errors(page);await scene(page);
  await page.evaluate(()=>{window.spriteDraws=[];const write=GPUQueue.prototype.writeBuffer;GPUQueue.prototype.writeBuffer=function(buffer,offset,data,...rest){if(data instanceof Float32Array&&data.length===20&&data[8]===1)window.spriteDraws.push([...data]);return write.call(this,buffer,offset,data,...rest);};});
  for(const fixture of [{levelId:'LVL-0001',runeId:'wind'},{levelId:'LVL-0003',runeId:'gateShield'}]){
    await page.evaluate(async({levelId,runeId})=>{await window.eval('selectLevel')(levelId,{startImmediately:true,recordStart:false});window.eval('walkPathEditor').apiAvailable=false;const state=window.eval('state'),p=window.eval('getApproachPoint')(window.eval('runeById')(runeId));state.worldX=p.x;state.worldY=p.y;state.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();},fixture);
    const point=await page.evaluate(()=>({x:window.eval('state').worldX,y:window.eval('state').worldY-75}));
    const s=contract.normalize({characters:{enabled:true,localInfluence:1.3,intensityResponse:1},wrap:{enabled:true},rim:{enabled:true},localLights:{enabled:true,items:[{...point,intensity:2,radius:600,color:'#ffaa55'}]}});
    await settings(page,s);await mode(page,'cinematic');await ready(page);
    await page.evaluate(({runeId})=>{window.eval('updateChallengeNpcSetting')(runeId,'brightness',1.23);window.eval('updateChallengeNpcSetting')(runeId,'warmth',0.4);window.eval('updateLevelSetting')(window.eval('level').id,'svenBrightness',1.23);window.eval('updateLevelSetting')(window.eval('level').id,'svenWarmth',0.4);},fixture);
    const animations=await page.evaluate(({levelId,runeId})=>{const entry=window.eval('npcAnimationRuntime').entries.get(`${levelId}:${runeId}`);return ['idle',...window.eval('npcIdleVariantNames')(entry.character),'idle_to_pass','completed'];},fixture);
    for(const animation of animations){
      await page.evaluate(({levelId,runeId,animation})=>{const e=window.eval('npcAnimationRuntime').entries.get(`${levelId}:${runeId}`);if(animation==='completed')window.eval('setNpcCompleted')(e);else{window.eval('setNpcAnimation')(e,animation,performance.now(),animation!=='idle');window.eval('setNpcFrame')(e);}window.spriteDraws=[];},{...fixture,animation});
      await nextFrames(page);const draws=await page.evaluate(()=>window.spriteDraws);expect(draws.length).toBeGreaterThan(1);expect(draws.every(d=>Math.abs(d[12]-1.23)<0.00001&&Math.abs(d[15]-0.056)<0.00001)).toBe(true);
      await page.screenshot({path:info.outputPath(`${fixture.levelId}-${animation}.png`)});
    }
    const near=await page.locator(`[data-npc-challenge='${fixture.runeId}']`).screenshot();s.localLights.items[0].x+=8000;await settings(page,s);await nextFrames(page);const away=await page.locator(`[data-npc-challenge='${fixture.runeId}']`).screenshot();expect(delta(near,away)).toBeGreaterThan(0.5);
    // A newly assigned HTMLImageElement src may be undecoded for a frame. Keep its last
    // valid GPU texture and the current per-instance appearance until the new upload is ready.
    await page.evaluate(({runeId})=>{window.eval('npcAnimationRuntime').entries.forEach(e=>{e.nextFrameAt=Infinity;});const img=document.querySelector(`[data-npc-challenge='${runeId}'] [data-npc-sprite]`);window.savedNpcSrc=img.src;img.dataset.assetPath='pending-qa-frame';Object.defineProperty(img,'complete',{configurable:true,get:()=>false});Object.defineProperty(img,'currentSrc',{configurable:true,get:()=>'/undecoded-next-frame.png'});window.spriteDraws=[];},fixture);
    await nextFrames(page);expect((await page.evaluate(()=>window.spriteDraws)).length).toBeGreaterThan(2);
    await page.evaluate(({runeId})=>{const img=document.querySelector(`[data-npc-challenge='${runeId}'] [data-npc-sprite]`);delete img.complete;delete img.currentSrc;},fixture);
    await mode(page,'voxel');await expect.poll(()=>page.evaluate(()=>window.eval('voxelRenderer').snapshot().status),{timeout:25000}).toBe('ready');await mode(page,'cinematic');await ready(page);
  }
  expect(log).toEqual([]);
});

test("GPU neutral grading preserves pixels and malformed shader failure is recoverable",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  await scene(page);await settings(page,{});await mode(page,'cinematic');await ready(page);const clip={x:450,y:80,width:400,height:300};const neutral=await page.screenshot({clip});
  await settings(page,{grading:{enabled:true}});await nextFrames(page);expect(delta(neutral,await page.screenshot({clip}))).toBeLessThan(0.1);
  await page.reload();await page.evaluate(async()=>{await window.eval('selectLevel')('LVL-0001',{startImmediately:true,recordStart:false});window.savedShader=window.AtlasCinematicShaders.autoExposure;window.AtlasCinematicShaders.autoExposure='invalid WGSL';});await mode(page,'cinematic');
  await expect(page.locator('[data-cinematic-error]')).toBeVisible();await expect(page.locator('.gameShell')).not.toHaveClass(/cinematicReady/);
  await mode(page,'illustrated');await page.evaluate(()=>{window.AtlasCinematicShaders.autoExposure=window.savedShader;});await mode(page,'cinematic');await ready(page);
});

test("GPU device loss is reported and a fresh device can recover",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  await scene(page);await mode(page,'cinematic');await ready(page);await page.evaluate(async()=>{const d=await window.AtlasWebGPUCapabilities.requestDevice('qa');d.destroy();});
  await expect(page.locator('[data-cinematic-error]')).toContainText('device lost');await expect(page.locator('.gameShell')).not.toHaveClass(/cinematicReady/);
  await mode(page,'illustrated');await mode(page,'cinematic');await ready(page);
});

test("GPU placement handles move lights and polygon regions without remounting the editor",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  await scene(page);await mode(page,'cinematic');await ready(page);await openEditor(page);
  await pane(page,'localLights');
  const handle=page.locator('[data-cinematic-handle="move"][data-id="rune-spill"]');const box=await handle.boundingBox();
  await page.locator('[data-developer-tools]').evaluate(el=>{el.dataset.qaIdentity='stable';});
  const actorBefore=await page.evaluate(()=>{const s=window.eval('state');return {x:s.worldX,y:s.worldY,camera:window.eval('getCameraX')()};});
  const before=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings().localLights.items[0].x);
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+45,box.y+box.height/2+20,{steps:6});await page.mouse.up();
  await expect(page.locator('[data-developer-tools]')).toHaveAttribute('data-qa-identity','stable');expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0001').cinematicLighting.localLights.items[0].x)).toBeGreaterThan(before+20);
  await pane(page,'atmosphere');
  await page.locator('[data-cinematic-section="atmosphere"][data-cinematic-setting="shape"]').selectOption('polygon');
  await page.locator('[data-cinematic-section="atmosphere"][data-cinematic-setting="x"]').fill('400');
  await page.locator('[data-cinematic-section="atmosphere"][data-cinematic-setting="width"]').fill('350');
  await page.locator('[data-cinematic-section="atmosphere"][data-cinematic-setting="direction"]').fill('30');
  const vertex=page.locator('[data-cinematic-handle="vertex"][data-section="atmosphere"][data-index="0"]'),vb=await vertex.boundingBox();
  await page.mouse.move(vb.x+vb.width/2,vb.y+vb.height/2);await page.mouse.down();await page.mouse.move(vb.x+vb.width/2+25,vb.y+vb.height/2+10,{steps:4});await page.mouse.up();
  expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0001').cinematicLighting.atmosphere.items[0].points[0].x)).toBeGreaterThan(-0.5);
  await pane(page,'godRays');const ray=page.locator('[data-cinematic-handle="move"][data-section="godRays"]').first(),rb=await ray.boundingBox();
  await page.mouse.move(rb.x+rb.width/2,rb.y+rb.height/2);await page.mouse.down();await page.mouse.move(rb.x+rb.width/2+18,rb.y+rb.height/2+12,{steps:3});await page.mouse.up();
  const actorAfter=await page.evaluate(()=>{const s=window.eval('state');return {x:s.worldX,y:s.worldY,camera:window.eval('getCameraX')(),moving:Boolean(s.movement)};});
  expect(actorAfter).toMatchObject({...actorBefore,moving:false});
  await expect(page.locator('[data-developer-tools]')).toHaveAttribute('data-qa-identity','stable');
});

test("GPU anchor-depth placement retains local light and foreground mist",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  const log=errors(page);await page.route('**/LVL-0001/assets/level-1-wide-world.png',route=>route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="2172" height="724"><rect width="100%" height="100%" fill="#485056"/></svg>'}));
  await scene(page);await page.addStyleTag({content:'[data-actor-shell],.ambientAnimal,.ambientFlyby,.npcChallengeHotspot {display:none!important}'});await mode(page,'cinematic');await ready(page);
  for(const key of ['localLights','atmosphere']){
    const item=key==='localLights'?{x:600,y:400,radius:280,intensity:3,color:'#20e8ff',falloff:0.8,depthInfluence:1,depthBias:0.06}:{x:600,y:400,width:460,height:300,density:0.9,color:'#80dfe5',driftSpeed:0,turbulence:0,depthInfluence:1,depthBias:0.06};
    const s=contract.normalize({[key]:{enabled:true,items:[item]},depth:{enabled:true}});await settings(page,s);await nextFrames(page);const on=await page.screenshot({path:info.outputPath(`${key}-depth-on.png`)});
    s.depth.enabled=false;await settings(page,s);await nextFrames(page);const off=await page.screenshot();
    s[key].enabled=false;s.depth.enabled=true;await settings(page,s);await nextFrames(page);const base=await page.screenshot();
    const retained=delta(on,base),unoccluded=delta(off,base);console.log('ANCHOR_DEPTH',key,{retained,unoccluded,ratio:retained/unoccluded});expect(retained).toBeGreaterThan(0.01);expect(retained/unoccluded).toBeGreaterThan(0.2);
  }
  expect(log).toEqual([]);
});

test("GPU Ray Motion zero is stable and motion remains subtle",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  const log=errors(page);await page.route('**/LVL-0001/assets/level-1-wide-world.png',route=>route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="2172" height="724"><rect width="100%" height="100%" fill="#20262c"/></svg>'}));await scene(page);await page.addStyleTag({content:'[data-actor-shell],.ambientAnimal,.ambientFlyby,.npcChallengeHotspot {display:none!important}'});await mode(page,'cinematic');await ready(page);
  const s=contract.normalize({godRays:{enabled:true,items:[{x:100,y:100,direction:35,spread:100,length:1400,rayCount:12,intensity:2,noiseAmount:0.5,noiseSpeed:1,rayMotion:0,motionSpeed:0.4,fadeVariation:0.5}]},depth:{enabled:false}});
  await settings(page,s);await nextFrames(page);const stillA=await page.screenshot();await nextFrames(page,25);const stillB=await page.screenshot();expect(delta(stillA,stillB)).toBeLessThan(0.002);
  s.godRays.items[0].rayMotion=0.55;await settings(page,s);await nextFrames(page);const movingA=await page.screenshot();await nextFrames(page,25);const movingB=await page.screenshot({path:info.outputPath('ray-motion.png')});const change=delta(movingA,movingB);console.log('RAY_MOTION_DELTA',change);expect(change).toBeGreaterThan(0.001);expect(change).toBeLessThan(2);expect(log).toEqual([]);
});

test("GPU grounding shadows are visible for Sven and Freya with live controls",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  const log=errors(page);await page.setViewportSize({width:2172,height:724});await scene(page);await mode(page,'cinematic');await ready(page);await page.evaluate(()=>{const write=GPUQueue.prototype.writeBuffer;GPUQueue.prototype.writeBuffer=function(buffer,offset,data,...rest){if(data instanceof Float32Array&&data.length===128){data=data.slice();data[5]=10;}return write.call(this,buffer,offset,data,...rest);};const state=window.eval('state');state.worldX=1200;state.worldY=570;state.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();});await nextFrames(page);
  let s=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());s.characters.groundingShadow=true;s.characters.shadowShape='tapered';s.characters.shadowStrength=2;s.characters.shadowDirectionSmoothing=.8;s.characters.shadowDarkBackgroundSuppression=0.9;await settings(page,s);await nextFrames(page,90);const finalValues=await page.evaluate(()=>{const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);},linear=v=>v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4),state=window.eval('state'),settings=window.eval('cinematicRenderer').getSettings(),c=settings.characters,p={x:state.worldX,y:state.worldY};let direct=0;for(const item of settings.areaLights.items){if(!settings.areaLights.enabled||item.enabled===false)continue;const angle=item.direction*Math.PI/180,dx=p.x-item.x,dy=p.y-item.y,qx=(Math.cos(angle)*dx+Math.sin(angle)*dy)/item.width,qy=(-Math.sin(angle)*dx+Math.cos(angle)*dy)/item.height,distance=Math.hypot(qx*2,qy*2),region=1-smooth(1-item.softness,1,distance),weight=region*Math.pow(Math.max(0,Math.min(1,.8-qy*.5)),item.falloff)*item.intensity;direct=Math.max(direct,weight);}const img=document.querySelector('.worldArt'),canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;const context=canvas.getContext('2d',{willReadFrequently:true});context.drawImage(img,0,0);const pixel=context.getImageData(Math.round(p.x),Math.round(p.y),1,1).data,receiver=.2126*linear(pixel[0]/255)+.7152*linear(pixel[1]/255)+.0722*linear(pixel[2]/255),receiverAllowance=smooth(.02,.18,receiver),lightMultiplier=.5+.5*smooth(0,.18,direct),authoredOpacity=1-Math.exp(-c.shadowStrength*.505145),finalOpacity=Math.min(authoredOpacity*c.shadowOpacity/100*lightMultiplier,authoredOpacity*c.shadowOpacity/100*receiverAllowance);return {enabled:c.groundingShadow,shape:c.shadowShape,width:c.shadowWidth,length:c.shadowLength,offsetX:c.shadowOffsetX,offsetY:c.shadowOffsetY,strength:c.shadowStrength,softness:c.shadowSoftness,direct,receiver,receiverAllowance,lightMultiplier,authoredOpacity,atmosphereMultiplier:1,finalOpacity,position:p};});expect(finalValues).toMatchObject({enabled:true,shape:'tapered',strength:2,atmosphereMultiplier:1});expect(finalValues.finalOpacity).toBeGreaterThan(.15);await page.screenshot({path:info.outputPath('LVL-0001-strength-2.png')});const clip={x:990,y:505,width:340,height:95};const tapered=await page.screenshot({clip,path:info.outputPath('simple-tapered-shadow.png')});s.characters.groundingShadow=false;await settings(page,s);await nextFrames(page);const off=await page.screenshot({clip,path:info.outputPath('simple-shadow-off.png')});const visibleDelta=delta(tapered,off);expect(visibleDelta).toBeGreaterThan(2);
  s.characters.groundingShadow=true;s.characters.shadowShape='wideSoft';await settings(page,s);await nextFrames(page);const wide=await page.screenshot({clip,path:info.outputPath('wide-soft-shadow.png')});expect(delta(tapered,wide)).toBeGreaterThan(0.0003);
  s.characters.groundingShadow=true;s.characters.shadowShape='tapered';s.characters.shadowSoftness=.61;s.characters.shadowWidth=1;s.characters.shadowLength=.95;s.characters.shadowDirectionSmoothing=.8;const strengths=[0,.5,1,1.5,2,3,4],strengthFrames=[];for(const strength of strengths){s.characters.shadowStrength=strength;await settings(page,s);await nextFrames(page);strengthFrames.push(await page.screenshot({clip,path:info.outputPath(`strength-${strength}.png`)}));}const strengthDeltas=strengthFrames.map(frame=>delta(strengthFrames[0],frame));expect(strengthDeltas[0]).toBe(0);for(let i=2;i<5;i++)expect(strengthDeltas[i]).toBeGreaterThan(strengthDeltas[i-1]*1.1);expect(strengthDeltas[6]).toBeGreaterThan(strengthDeltas[4]*1.12);expect(await page.evaluate(()=>window.eval('cinematicRenderer').getSettings().characters.shadowStrength)).toBe(4);const geometryClip={x:930,y:440,width:450,height:170};s.characters.shadowWidth=.25;await settings(page,s);await nextFrames(page);const narrow=await page.screenshot({clip:geometryClip});s.characters.shadowWidth=3;await settings(page,s);await nextFrames(page);const broad=await page.screenshot({clip:geometryClip});const widthDelta=delta(narrow,broad);s.characters.shadowWidth=1;s.characters.shadowLength=.2;await settings(page,s);await nextFrames(page,15);const short=await page.screenshot({clip:geometryClip});s.characters.shadowLength=2.25;await settings(page,s);await nextFrames(page,15);const long=await page.screenshot({clip:geometryClip});const lengthDelta=delta(short,long);s.characters.shadowLength=.95;s.characters.shadowSoftness=.05;await settings(page,s);await nextFrames(page);const defined=await page.screenshot({clip:geometryClip});s.characters.shadowSoftness=1;await settings(page,s);await nextFrames(page);const soft=await page.screenshot({clip:geometryClip});const softnessDelta=delta(defined,soft);s.characters.shadowSoftness=.61;s.characters.shadowDirection=-70;await settings(page,s);await nextFrames(page,15);const left=await page.screenshot({clip:geometryClip});s.characters.shadowDirection=70;await settings(page,s);await nextFrames(page,15);const right=await page.screenshot({clip:geometryClip});const directionDelta=delta(left,right);expect(widthDelta).toBeGreaterThan(.1);expect(lengthDelta).toBeGreaterThan(.1);expect(softnessDelta).toBeGreaterThan(.1);expect(directionDelta).toBeGreaterThan(.1);
  s.characters.shadowDirection=-10;s.characters.shadowWidth=1;s.characters.shadowLength=.95;s.characters.shadowSoftness=.61;await settings(page,s);const offset=await page.evaluate(async()=>{const positions=[],write=GPUQueue.prototype.writeBuffer;GPUQueue.prototype.writeBuffer=function(buffer,at,data,...rest){if(data instanceof Float32Array&&data.length===20&&data[11]===1)positions.push([data[0],data[1]]);return write.call(this,buffer,at,data,...rest);};const update=async(x,y)=>{const id=window.eval('level').id,s=window.eval('cinematicRenderer').getSettings();s.characters.shadowOffsetX=x;s.characters.shadowOffsetY=y;window.eval('worldResolver').updateLevelSettings(id,{cinematicLighting:s});window.eval('cinematicRenderer').sync();await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);return positions.at(-1);};const a=await update(0,0),b=await update(36,-18);GPUQueue.prototype.writeBuffer=write;return {dx:(b[0]-a[0])*2172,dy:(b[1]-a[1])*724};});expect(offset.dx).toBeCloseTo(36,1);expect(offset.dy).toBeCloseTo(-18,1);
  s=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());s.characters.shadowOffsetX=0;s.characters.shadowOffsetY=0;s.characters.groundingShadow=true;const authoredArea=structuredClone(s.areaLights);s.areaLights.enabled=false;await settings(page,s);await nextFrames(page);const diffuse=await page.screenshot({clip});s.characters.groundingShadow=false;await settings(page,s);await nextFrames(page);const diffuseOff=await page.screenshot({clip});const diffuseDelta=delta(diffuse,diffuseOff);
  s.areaLights=authoredArea;s.characters.groundingShadow=true;s.characters.shadowStrength=2;s.characters.shadowDarkBackgroundSuppression=0;await settings(page,s);await page.evaluate(()=>{const state=window.eval('state');state.worldX=150;state.worldY=570;state.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();});await nextFrames(page);const darkClip={x:175,y:540,width:145,height:40};const unsuppressed=await page.screenshot({clip:darkClip});s.characters.groundingShadow=false;await settings(page,s);await nextFrames(page);const darkOff=await page.screenshot({clip:darkClip});s.characters.groundingShadow=true;s.characters.shadowDarkBackgroundSuppression=1;await settings(page,s);await nextFrames(page);const suppressed=await page.screenshot({clip:darkClip,path:info.outputPath('dark-background-suppressed.png')});const darkUnsuppressedDelta=delta(unsuppressed,darkOff),darkSuppressedDelta=delta(suppressed,darkOff);expect(darkSuppressedDelta).toBeLessThan(darkUnsuppressedDelta*0.6);s.characters.shadowDarkBackgroundSuppression=.9;await settings(page,s);await page.evaluate(()=>{const state=window.eval('state');state.worldX=1200;state.worldY=570;state.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();});await nextFrames(page);const returned=await page.screenshot({clip});s.characters.groundingShadow=false;await settings(page,s);await nextFrames(page);const returnedOff=await page.screenshot({clip});const returnedDelta=delta(returned,returnedOff);expect(returnedDelta).toBeGreaterThan(darkSuppressedDelta*2);s.characters.groundingShadow=true;await settings(page,s);
  const walk=await page.evaluate(async()=>{let writes=0,frames=0,missing=0,lastSize='';const svenSizes=new Set();let previousAngle,previousLength,maxAngleStep=0,maxLengthStep=0;const write=GPUQueue.prototype.writeBuffer;GPUQueue.prototype.writeBuffer=function(buffer,offset,data,...rest){if(data instanceof Float32Array&&data.length===20&&data[11]===1){writes++;lastSize=`${data[2].toFixed(6)}:${data[3].toFixed(6)}`;}return write.call(this,buffer,offset,data,...rest);};const state=window.eval('state');window.eval('walkRoute')([{x:state.worldX+160,y:state.worldY}],()=>{},window.eval('replaceMovementIntent')({type:'shadow-smoke'}));while(state.movement&&frames<240){await new Promise(requestAnimationFrame);const shadow=window.eval('cinematicRenderer').snapshot().shadowStates.find(item=>item.key==='actor:sven');if(shadow&&previousAngle!==undefined){maxAngleStep=Math.max(maxAngleStep,Math.abs(Math.atan2(Math.sin(shadow.angle-previousAngle),Math.cos(shadow.angle-previousAngle))));maxLengthStep=Math.max(maxLengthStep,Math.abs(shadow.length-previousLength));}if(shadow){previousAngle=shadow.angle;previousLength=shadow.length;}frames++;if(!writes)missing++;else svenSizes.add(lastSize);writes=0;}const stopped=window.eval('cinematicRenderer').snapshot().shadowStates.find(item=>item.key==='actor:sven')?.angle;for(let i=0;i<12;i++)await new Promise(requestAnimationFrame);const settled=window.eval('cinematicRenderer').snapshot().shadowStates.find(item=>item.key==='actor:sven')?.angle,stopCatchup=Math.abs(Math.atan2(Math.sin(settled-stopped),Math.cos(settled-stopped)));GPUQueue.prototype.writeBuffer=write;return {frames,missing,sizes:svenSizes.size,maxAngleStep,maxLengthStep,stopCatchup,active:Boolean(state.movement)};});expect(walk.frames).toBeGreaterThan(10);expect(walk.missing).toBeLessThanOrEqual(1);expect(walk.sizes).toBeLessThanOrEqual(2);expect(walk.maxAngleStep).toBeLessThan(.03);expect(walk.maxLengthStep).toBeLessThan(.02);expect(walk.stopCatchup).toBeLessThan(.02);expect(walk.active).toBe(false);
  const counts=await page.evaluate(async()=>{let count=0;const write=GPUQueue.prototype.writeBuffer;GPUQueue.prototype.writeBuffer=function(buffer,offset,data,...rest){if(data instanceof Float32Array&&data.length===20&&data[11]===1)count++;return write.call(this,buffer,offset,data,...rest);};for(let i=0;i<3;i++)await new Promise(requestAnimationFrame);GPUQueue.prototype.writeBuffer=write;return count;});expect(counts).toBeGreaterThanOrEqual(6);await mode(page,'illustrated');expect(await page.locator('.cinematicViewportCanvas').count()).toBe(0);expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().shadowDraws)).toBe(0);await page.screenshot({path:info.outputPath('mode-return-illustrated.png')});await mode(page,'cinematic');await ready(page);await nextFrames(page);expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().shadowDraws)).toBeGreaterThan(0);await mode(page,'illustrated');expect(await page.locator('.cinematicViewportCanvas').count()).toBe(0);expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().shadowDraws)).toBe(0);console.log('SIMPLE_GROUNDING_SHADOW',{finalValues,visibleDelta,strengthDeltas,widthDelta,lengthDelta,softnessDelta,directionDelta,diffuseDelta,darkUnsuppressedDelta,darkSuppressedDelta,returnedDelta,offset,walk,counts});expect(log).toEqual([]);
});

test("Illustrated frame matches original HEAD and baseline editor opens Characters",async({page,browser},info)=>{
  test.skip(info.project.name!=="desktop-chromium","One original/current visual comparison");
  const oldPage=await browser.newPage({viewport:{width:1280,height:800},reducedMotion:'reduce'});
  const git=require('child_process').execFileSync;
  try{
    for(const file of ['index.html','src/app.js','src/scene-effects.js','src/styles.css','src/voxel-renderer.js','src/webgpu-capabilities.js','Levels/world-config.js']){
      const body=git('git',['show',`HEAD:${file}`],{cwd:path.join(__dirname,'..'),encoding:'utf8'});
      await oldPage.route(`**/${file}*`,route=>route.fulfill({body,contentType:file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'text/javascript'}));
    }
    // The root document is served as /, not /index.html.
    await oldPage.route('**/?dev=editor',route=>route.fulfill({body:git('git',['show','HEAD:index.html'],{cwd:path.join(__dirname,'..'),encoding:'utf8'}),contentType:'text/html'}));
    const freeze=async p=>{await scene(p);await mode(p,'illustrated');await p.evaluate(()=>{const runtime=window.eval('sceneEffectRuntime');runtime.pause();runtime.restart();window.eval('pauseAmbientAnimalTimers')();});};
    await page.emulateMedia({reducedMotion:'reduce'});await freeze(oldPage);await freeze(page);
    const clip={x:400,y:80,width:700,height:400};const before=await oldPage.screenshot({clip,path:info.outputPath('original-illustrated.png')}),after=await page.screenshot({clip,path:info.outputPath('current-illustrated.png')});
    expect(delta(before,after)).toBeLessThan(0.25);
    await oldPage.keyboard.press('Control+Shift+D');await expect(oldPage.locator('[data-developer-tools]')).toHaveAttribute('data-current-editor-mode','characters');await expect(oldPage.locator('[data-editor-panel-key="emissive-glow"]')).toHaveCount(0);
    expect(await oldPage.evaluate(()=>window.SVEN_WORLD_CONFIG.levels['LVL-0004'].emissiveGlow.enabled)).toBe(true);
  }finally{await oldPage.close();}
});

test("GPU illuminated haze interaction and all temporal light profiles",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  const log=errors(page);await scene(page);await mode(page,'cinematic');await ready(page);
  const s=contract.normalize({localLights:{enabled:true,items:[{x:350,y:400,radius:400,intensity:1.5,atmosphereInfluence:0,color:'#ffb36a'}]},atmosphere:{enabled:true,items:[{x:450,y:450,width:900,height:500,density:0.6,driftSpeed:0}]},shafts:{enabled:true,items:[{x:100,y:80,direction:60,length:700,width:120,intensity:1.5}]}});
  await settings(page,s);await nextFrames(page);const clip={x:240,y:200,width:550,height:350};const unlit=await page.screenshot({clip});s.localLights.items[0].atmosphereInfluence=2;await settings(page,s);await nextFrames(page);const lit=await page.screenshot({clip,path:info.outputPath('illuminated-haze.png')});expect(delta(unlit,lit)).toBeGreaterThan(0.1);
  for(const behavior of ['steady','fire','slowPulse','arcane']){s.localLights.items[0].behavior=behavior;s.localLights.items[0].flickerAmount=0.7;s.localLights.items[0].flickerSpeed=3;await settings(page,s);await nextFrames(page);const a=await page.screenshot({clip});await nextFrames(page,20);const b=await page.screenshot({clip,path:info.outputPath(`${behavior}.png`)});if(behavior!=='steady')expect(delta(a,b)).toBeGreaterThan(0.05);}
  expect(log).toEqual([]);
});

test("GPU bounded draw count with many lights and 40000 instanced particles",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");test.setTimeout(60000);
  const log=errors(page);await scene(page);await page.setViewportSize({width:1024,height:768});
  const s=contract.normalize({localLights:{enabled:true,items:Array.from({length:12},(_,i)=>({id:`stress-${i}`,x:i*150,y:300,radius:300,intensity:0.12}))},areaLights:{enabled:true,items:[{x:650,y:300,intensity:0.1}]},atmosphere:{enabled:true,items:[{x:600,y:450,density:0.1}]},shafts:{enabled:true,items:[{x:200,y:100,intensity:0.2}]},particles:{enabled:true,items:[{id:'dust-a',count:20000,x:500,y:350,size:0.6,opacity:0.1},{id:'dust-b',count:20000,x:1500,y:350,size:0.6,opacity:0.1}]},characters:{enabled:true},bloom:{enabled:true}});
  s.depth.enabled=true;
  s.godRays={enabled:true,items:[contract.instance('godRays',{x:150,y:80,intensity:1,rayCount:24})]};
  s.gameplayCues.enabled=true;
  await settings(page,s);const start=Date.now();await mode(page,'cinematic');await ready(page);const initializationMs=Date.now()-start;await nextFrames(page,45);
  const result=await page.evaluate(async()=>({runtime:window.eval('cinematicRenderer').snapshot(),adapter:(await navigator.gpu.requestAdapter()).info.toJSON?.()||{vendor:(await navigator.gpu.requestAdapter()).info.vendor}}));console.log('CINEMATIC_STRESS',{initializationMs,...result});
  expect(result.runtime.particles).toBe(40000);expect(result.runtime.drawCalls).toBeLessThan(20);expect(result.runtime.status).toBe('ready');expect(log).toEqual([]);
});

test("GPU presentation survives gameplay DOM rebuilds and walking reversals",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  const log=errors(page);await scene(page);await mode(page,'cinematic');await ready(page);
  const result=await page.evaluate(async()=>{
    const canvas=document.querySelector('[data-cinematic-canvas]'),samples=[];let configurations=0;
    const configure=GPUCanvasContext.prototype.configure;
    GPUCanvasContext.prototype.configure=function(...args){configurations++;return configure.apply(this,args);};
    const sample=()=>{const c=document.querySelector('[data-cinematic-canvas]');samples.push({same:c===canvas,visible:getComputedStyle(c).opacity==='1',ready:document.querySelector('.gameShell').classList.contains('cinematicReady')});};
    // The app also rebuilds the wrapper at animation/interaction boundaries.
    window.eval('render')();sample();
    const state=window.eval('state');
    for(const distance of [380,-300]){
      window.eval('walkRoute')([{x:state.worldX+distance,y:state.worldY}],()=>{},window.eval('replaceMovementIntent')({type:'presentation-regression'}));
      const deadline=performance.now()+10000;
      while(state.movement&&performance.now()<deadline){await new Promise(requestAnimationFrame);sample();}
      for(let i=0;i<8;i++){await new Promise(requestAnimationFrame);sample();}
    }
    GPUCanvasContext.prototype.configure=configure;
    return {samples,configurations,moving:Boolean(state.movement)};
  });
  console.log('CINEMATIC_PRESENTATION',{frames:result.samples.length,hidden:result.samples.filter(s=>!s.visible||!s.ready).length,configurations:result.configurations});
  expect(result.samples.length).toBeGreaterThan(60);expect(result.moving).toBe(false);
  expect(result.samples.filter(s=>!s.visible||!s.ready||!s.same)).toEqual([]);
  expect(result.configurations).toBe(0);expect(log).toEqual([]);
});

test("layer controls, scoped guides, duplicate, delete and touch help preserve authoring state",async({page},info)=>{
  await scene(page);await openEditor(page);const root=page.locator('[data-cinematic-editor]');
  await expect(root.locator('[data-cinematic-layer="environment"]')).toHaveAttribute('aria-selected','true');
  await expect(root.locator('[data-cinematic-guides]')).toHaveValue('selected');
  await expect(root.locator('[data-cinematic-group="localLights"]')).toBeHidden();
  await pane(page,'localLights');
  const initial=await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0001').cinematicLighting);
  await root.locator('[data-cinematic-section="localLights"][data-cinematic-setting="enabled"]').uncheck();
  await root.locator('[data-cinematic-action="duplicate"][data-section="localLights"]').click();
  const duplicate=await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0001').cinematicLighting.localLights.items.at(-1));
  expect(duplicate).toMatchObject({...initial.localLights.items[0],enabled:false,id:expect.any(String),name:expect.any(String),x:initial.localLights.items[0].x+24,y:initial.localLights.items[0].y+18});
  expect(duplicate.id).not.toBe(initial.localLights.items[0].id);expect(duplicate.name).not.toBe(initial.localLights.items[0].name);
  await expect(root.locator('[data-cinematic-select="localLights"]')).toHaveValue(duplicate.id);
  await root.locator('[data-cinematic-action="remove"][data-section="localLights"]').click();
  expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0001').cinematicLighting.localLights.items.length)).toBe(initial.localLights.items.length);
  await root.locator('[data-cinematic-layer-enabled]').uncheck();
  const off=await page.evaluate(()=>{const s=window.AtlasCinematicSettings.normalize(window.eval('worldResolver').levelSettings('LVL-0001').cinematicLighting);return {raw:s,effective:window.AtlasCinematicSettings.effective(s)};});
  expect(off.raw.localLights.enabled).toBe(true);expect(off.effective.localLights.items.every(i=>!i.enabled)).toBe(true);expect(off.effective.atmosphere.items.some(i=>i.enabled)).toBe(true);
  await root.locator('[data-cinematic-layer-enabled]').check();
  const tip=root.getByRole('button',{name:'Help: Depth Softness',exact:true}).first();await tip.click();await expect(tip).toHaveAttribute('aria-expanded','true');await expect(tip.locator('..').locator('[role="tooltip"]')).toBeVisible();
  await page.screenshot({path:info.outputPath('layer-editor-help.png')});
  expect(await root.locator('[data-cinematic-help]').evaluateAll(nodes=>nodes.every(n=>n.title&&!n.title.includes('undefined')))).toBe(true);
  const intensity=root.locator('[data-cinematic-section="localLights"][data-cinematic-setting="intensity"]');await intensity.focus();
  await page.evaluate(()=>window.eval('render')());await expect(root.locator('[data-cinematic-layer="effects"]')).toHaveAttribute('aria-selected','true');await expect(intensity).toBeFocused();
  if(process.env.ATLAS_WEBGPU_QA&&info.project.name==='desktop-chromium'){
    await mode(page,'cinematic');await ready(page);
    await expect(page.locator('[data-cinematic-handle="move"]')).toHaveCount(initial.localLights.items.length);
    await expect(page.locator('[data-cinematic-detail]')).toHaveCount(1);
    expect(await page.locator('[data-cinematic-handle]').evaluateAll(nodes=>nodes.every(n=>n.dataset.section==='localLights'))).toBe(true);
    await root.locator('[data-cinematic-guides]').selectOption('all');await expect(page.locator('[data-cinematic-handle="move"]')).toHaveCount(initial.localLights.items.length);
    await pane(page,'atmosphere');expect(await page.locator('[data-cinematic-handle]').evaluateAll(nodes=>nodes.every(n=>['atmosphere','particles'].includes(n.dataset.section)))).toBe(true);
    await page.locator('[data-cinematic-handle="move"][data-section="particles"]').click();
    await root.locator('[data-cinematic-guides]').selectOption('selected');
    await expect(page.locator('[data-cinematic-handle="move"]')).toHaveCount(initial.atmosphere.items.length+initial.particles.items.filter(i=>i.layer==='environment').length);
    await expect(page.locator('[data-cinematic-detail]')).toHaveCount(1);await expect(page.locator('.cinematicGuide.selected [data-cinematic-handle="move"]')).toHaveAttribute('data-section','particles');
    await root.locator('[data-cinematic-layer="characters"]').click();await expect(page.locator('[data-cinematic-handle]')).toHaveCount(0);
    await root.locator('[data-cinematic-guides]').selectOption('hidden');await pane(page,'localLights');await expect(page.locator('[data-cinematic-handle]')).toHaveCount(0);
  }
});

test("GPU particle presets change real motion parameters and remain editable",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  const log=errors(page);await scene(page);await mode(page,'cinematic');await ready(page);await openEditor(page);await pane(page,'particles');
  const outputs=[];
  for(const name of Object.keys(contract.presets.particles)){
    await page.locator('[data-cinematic-preset="particles"]').selectOption(name);await nextFrames(page);
    const item=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings().particles.items[0]);
    expect(item).toMatchObject(contract.presets.particles[name]);
    outputs.push(JSON.stringify([item.speed,item.gravity,item.wind,item.streak,item.lifetime,item.glow,item.distribution]));
    await page.screenshot({path:info.outputPath(`preset-${name}.png`)});
  }
  expect(new Set(outputs).size).toBe(7);
  await page.locator('[data-cinematic-section="particles"][data-cinematic-setting="wind"]').fill('27');
  expect(await page.evaluate(()=>window.eval('cinematicRenderer').getSettings().particles.items[0].wind)).toBe(27);expect(log).toEqual([]);
});

test("GPU depth cache follows levels and reuses every conventional level map",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");test.setTimeout(60000);
  const log=errors(page);await scene(page);await mode(page,'cinematic');await ready(page);
  for(const id of ['LVL-0002','LVL-0003','LVL-0001','LVL-0004']){
    await page.evaluate(async id=>window.eval('selectLevel')(id,{startImmediately:true,recordStart:false}),id);await ready(page);
    const result=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot());
    expect(result.levelId).toBe(id);expect(result.depthStatus).toBe('ready');
    expect(result.depthPath).toBe(`Levels/${id}/assets/depthmap.png`);
    if(id==='LVL-0001')expect(result.depthLoads).toBe(3);if(id==='LVL-0004')expect(result.depthLoads).toBe(4);
    await mode(page,'illustrated');await mode(page,'cinematic');await ready(page);
  }
  const before=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot());await nextFrames(page,35);
  const after=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot());expect(after.depthLoads).toBe(before.depthLoads);expect(after.bindGroups-before.bindGroups).toBeLessThan(12);expect(log).toEqual([]);
});

test("GPU delayed or missing depth never presents a partial or stale depth composite",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  let release,requested;const held=new Promise(resolve=>release=resolve),request=new Promise(resolve=>requested=resolve);
  await page.route('**/LVL-0001/assets/depthmap.png',async route=>{requested();await held;await route.continue();});
  await scene(page);await mode(page,'cinematic');await request;
  expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().ready)).toBe(false);
  await expect(page.locator('.gameShell')).not.toHaveClass(/cinematicReady/);
  await page.evaluate(async()=>window.eval('selectLevel')('LVL-0003',{startImmediately:true,recordStart:false}));release();await ready(page);
  expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().depthPath)).toContain('LVL-0003');
  await page.unroute('**/LVL-0001/assets/depthmap.png');
  await page.route('**/LVL-0002/assets/depthmap.png',route=>route.fulfill({status:200,contentType:'image/png',body:Buffer.from('invalid optional image')}));
  await page.evaluate(async()=>window.eval('selectLevel')('LVL-0002',{startImmediately:true,recordStart:false}));await ready(page);
  const missing=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot());expect(missing.depthStatus).toBe('unavailable');expect(missing.error).toBeNull();
});

for(const id of ['LVL-0001','LVL-0002','LVL-0003'])test(`GPU showcase depth A/B and gameplay presentation: ${id}`,async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  const log=errors(page);await scene(page,id);await mode(page,'cinematic');await ready(page);
  // Freeze only the shader clock for a controlled A/B image, not gameplay scheduling.
  await page.evaluate(()=>{const write=GPUQueue.prototype.writeBuffer;window.qaRestoreClock=()=>GPUQueue.prototype.writeBuffer=write;GPUQueue.prototype.writeBuffer=function(b,o,data,...rest){if(data instanceof Float32Array&&data.length===128){data=data.slice();data[5]=10;}return write.call(this,b,o,data,...rest);};});
  const authored=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());expect(authored.depth.enabled).toBe(true);
  await nextFrames(page);const on=await page.screenshot({path:info.outputPath(`${id}-depth-on.png`)});
  authored.depth.enabled=false;await settings(page,authored);await nextFrames(page);const off=await page.screenshot({path:info.outputPath(`${id}-depth-off.png`)});
  const difference=delta(on,off);console.log('DEPTH_AB',id,difference);expect(difference).toBeGreaterThan(0.25);
  authored.depth.enabled=true;await settings(page,authored);await page.evaluate(()=>window.qaRestoreClock());
  const motion=await page.evaluate(async()=>{const s=window.eval('state'),bad=[],frames=[];for(const dx of [550,-400]){
    window.eval('walkRoute')([{x:s.worldX+dx,y:s.worldY}],()=>{},window.eval('replaceMovementIntent')({type:'depth-showcase-walk'}));const deadline=performance.now()+10000;
    while(s.movement&&performance.now()<deadline){await new Promise(requestAnimationFrame);const snap=window.eval('cinematicRenderer').snapshot();frames.push(snap.frame);if(!snap.ready||!document.querySelector('.gameShell').classList.contains('cinematicReady')||getComputedStyle(document.querySelector('[data-cinematic-canvas]')).opacity!=='1')bad.push(snap);}
  }return {bad,frames:frames.length,active:Boolean(s.movement),snapshot:window.eval('cinematicRenderer').snapshot()};});
  expect(motion.bad).toEqual([]);expect(motion.frames).toBeGreaterThan(60);expect(motion.active).toBe(false);console.log('DEPTH_GAMEPLAY',id,motion);expect(log).toEqual([]);
});

for(const primitive of ['shafts','godRays'])test(`GPU authored forest depth strongly occludes ${primitive} on the upper-left tree`,async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  await page.setViewportSize({width:2172,height:724});await scene(page);await mode(page,'cinematic');await ready(page);
  const s=contract.normalize({[primitive]:{enabled:true,items:[{x:95,y:-40,direction:70,spread:90,rayCount:15,rayWidth:0.5,length:1000,width:360,intensity:2,density:1.4,decay:0.8,noiseSpeed:0,depth:0.65,depthSoftness:0.12}]},depth:{enabled:false}});
  await settings(page,s);await nextFrames(page);const off=decodePNG(await page.screenshot());
  s.depth.enabled=true;await settings(page,s);await nextFrames(page);const on=decodePNG(await page.screenshot({path:info.outputPath('tree-soft-occlusion.png')}));
  s[primitive].enabled=false;await settings(page,s);await nextFrames(page);const base=decodePNG(await page.screenshot());
  const mask=await page.evaluate(async()=>{const img=new Image();img.src='Levels/LVL-0001/assets/depthmap.png';await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);const pixels=ctx.getImageData(0,0,c.width,c.height).data;return Array.from(pixels.filter((_,i)=>i%4===0));});
  let blockedOn=0,blockedOff=0,farOn=0,farOff=0,nearCount=0,farCount=0;
  for(let y=80;y<430;y++)for(let x=100;x<550;x++){let a=0,b=0;for(let c=0;c<3;c++){const i=(y*on.width+x)*on.channels+c;a+=Math.max(0,on.data[i]-base.data[i]);b+=Math.max(0,off.data[i]-base.data[i]);}if(b<12)continue;const z=mask[y*2172+x]/255;if(z>0.83){blockedOn+=a;blockedOff+=b;nearCount++;}if(z<0.4){farOn+=a;farOff+=b;farCount++;}}
  console.log('TREE_OCCLUSION',{nearCount,farCount,nearTransmission:blockedOn/blockedOff,farTransmission:farOn/farOff});
  expect(nearCount).toBeGreaterThan(1000);expect(farCount).toBeGreaterThan(100);expect(blockedOn/blockedOff).toBeLessThan(0.18);expect(farOn/farOff).toBeGreaterThan(0.75);
});

test('GPU God Rays authoring retains all active-layer markers and accurate influence geometry',async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','HTTP Chromium WebGPU run required');
  const log=errors(page);await scene(page);await mode(page,'cinematic');await ready(page);await openEditor(page);await pane(page,'godRays');
  const root=page.locator('[data-cinematic-editor]');
  await root.locator('[data-cinematic-section="godRays"][data-cinematic-setting="spread"]').fill('82');
  const before=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());
  const count=before.areaLights.items.length+before.shafts.items.length+before.godRays.items.length;
  await expect(page.locator('[data-cinematic-handle="move"]')).toHaveCount(count);await expect(page.locator('[data-cinematic-detail]')).toHaveCount(1);
  await root.locator('[data-cinematic-action="duplicate"][data-section="godRays"]').click();
  const copy=await page.evaluate(()=>window.eval('cinematicRenderer').getSettings().godRays.items.at(-1));expect(copy.spread).toBe(82);expect(copy.id).not.toBe(before.godRays.items[0].id);
  await expect(page.locator('[data-cinematic-handle="move"]')).toHaveCount(count+1);
  await root.locator('[data-cinematic-action="remove"][data-section="godRays"]').click();
  await expect(page.locator('[data-cinematic-handle="move"]')).toHaveCount(count);
  await pane(page,'localLights');await root.locator('[data-cinematic-select="localLights"]').selectOption('rune-spill');
  const ellipse=page.locator('.cinematicGuide.selected ellipse');await expect(ellipse).toHaveAttribute('rx',String(before.localLights.items[0].radius*before.localLights.items[0].aspect));await expect(ellipse).toHaveAttribute('ry',String(before.localLights.items[0].radius));
  expect(await root.locator('[data-cinematic-help]').evaluateAll(nodes=>nodes.every(n=>n.title&&!n.title.includes('undefined')))).toBe(true);expect(log).toEqual([]);
});

for(const id of ['LVL-0001','LVL-0002','LVL-0003'])test(`GPU challenge and exit cues follow completion and reload: ${id}`,async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','HTTP Chromium WebGPU run required');
  const log=errors(page);await page.setViewportSize({width:2172,height:724});await scene(page,id);await mode(page,'cinematic');await ready(page);
  const before=await page.evaluate(()=>window.eval('cinematicGameplayCues')());expect(before.some(c=>c.state==='available')).toBe(true);expect(before.at(-1).state).toBe('locked');
  const beforeImage=await page.screenshot({path:info.outputPath(`${id}-cues-before.png`)});
  const result=await page.evaluate(()=>{const ids=window.eval('activeRunes')().map(r=>r.id),s=window.eval('state');for(const id of ids){window.eval('openRuneChallenge')(id);s.questionIndex=s.activeQuestions.length-1;window.eval('nextQuestion')();}return {ids,cues:window.eval('cinematicGameplayCues')(),ready:window.eval('isLevelExitReady')()};});
  expect(result.ready).toBe(true);expect(result.cues.filter(c=>c.state==='completed')).toHaveLength(result.ids.length);expect(result.cues.at(-1).state).toBe('open');
  await nextFrames(page);await expect(page.locator('[data-exit-hotspot]')).toHaveAttribute('data-exit-ready','true');const afterImage=await page.screenshot({path:info.outputPath(`${id}-cues-after.png`)});expect(delta(beforeImage,afterImage)).toBeGreaterThan(0.05);
  await page.reload();await page.evaluate(async id=>window.eval('selectLevel')(id,{startImmediately:true,recordStart:false}),id);await ready(page);
  expect(await page.evaluate(()=>window.eval('cinematicGameplayCues')())).toEqual(result.cues);expect(log).toEqual([]);
});

test('GPU local sprite lighting favors the side facing a cyan source',async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','HTTP Chromium WebGPU run required');
  const log=errors(page);await scene(page);await mode(page,'cinematic');await ready(page);
  const point=await page.evaluate(()=>({x:window.eval('state').worldX,y:window.eval('state').worldY-70}));
  const s=contract.normalize({characters:{enabled:true,ambientInfluence:0,localInfluence:1.4,intensityResponse:1,colorSpill:1,sideLighting:1},localLights:{enabled:true,items:[{x:point.x-100,y:point.y,radius:350,intensity:1.5,color:'#20e8ff',colorSpill:1,falloff:0.8}]}});
  const box=await page.locator('[data-actor="sven"]').boundingBox();const clip={x:box.x,y:box.y,width:box.width,height:box.height};
  await settings(page,s);await nextFrames(page);const left=decodePNG(await page.screenshot({clip,path:info.outputPath('sprite-left-light.png')}));
  s.localLights.items[0].x=point.x+100;await settings(page,s);await nextFrames(page);const right=decodePNG(await page.screenshot({clip,path:info.outputPath('sprite-right-light.png')}));
  // Measure opaque sprite art only, excluding the independently lit background.
  const mask=await page.evaluate(async({width,height})=>{const img=new Image();img.src=document.querySelector('[data-actor="sven"]').src;await img.decode();const c=document.createElement('canvas');c.width=width;c.height=height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0,width,height);return Array.from(ctx.getImageData(0,0,width,height).data.filter((_,i)=>i%4===3));},{width:left.width,height:left.height});
  expect(mask.filter(a=>a>245).length).toBeGreaterThan(100);
  let leftGain=0,rightGain=0;
  for(let y=0;y<left.height;y++)for(let x=0;x<left.width;x++){if(mask[y*left.width+x]<=245)continue;const at=(y*left.width+x)*left.channels;const diff=(left.data[at+1]+left.data[at+2])-(right.data[at+1]+right.data[at+2]);if(x<left.width*0.4)leftGain+=diff;if(x>left.width*0.6)rightGain-=diff;}
  console.log('SPRITE_SIDE_RESPONSE',{leftGain,rightGain});expect(leftGain).toBeGreaterThan(100);expect(rightGain).toBeGreaterThan(100);expect(log).toEqual([]);
});

test('GPU particle emission does not inflate world-space size across viewports',async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','HTTP Chromium WebGPU run required');
  const log=errors(page);
  await page.route('**/LVL-0001/assets/level-1-wide-world.png',route=>route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="2172" height="724"><rect width="100%" height="100%" fill="black"/></svg>'}));
  await scene(page);await mode(page,'cinematic');await ready(page);
  await page.addStyleTag({content:'[data-actor-shell],.ambientAnimal,.ambientFlyby,.npcChallengeHotspot { display:none !important; }'});
  await page.evaluate(()=>{const write=GPUQueue.prototype.writeBuffer;GPUQueue.prototype.writeBuffer=function(b,o,data,...rest){if(data instanceof Float32Array&&data.length===128){data=data.slice();data[5]=0;}return write.call(this,b,o,data,...rest);};});
  const s=contract.normalize({particles:{enabled:true,items:[{x:500,y:250,width:700,height:400,count:1,size:10,sizeVariation:0,speed:0,turbulence:0,wind:0,gravity:0,glow:0,opacity:0.08,color:'#ffffff',lifetime:30,distribution:'source'}]}});
  const footprints=[];
  for(const width of [1280,960]) {
    await page.setViewportSize({width,height:724});
    const measures=[];
    for(const glow of [0,3]) {
      s.particles.items[0].glow=glow;await settings(page,s);await nextFrames(page);
      const pixels=decodePNG(await page.screenshot({clip:{x:100,y:90,width:width-200,height:320}}));
      const linear=v=>{v/=255;return v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4;};
      let peak=0;for(let i=0;i<pixels.data.length;i+=pixels.channels)peak=Math.max(peak,linear(pixels.data[i]));
      let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
      for(let y=0;y<pixels.height;y++)for(let x=0;x<pixels.width;x++){if(linear(pixels.data[(y*pixels.width+x)*pixels.channels])>peak*0.2){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}}
      expect(peak).toBeGreaterThan(0.001);expect(maxX-minX).toBeGreaterThan(3);expect(maxY-minY).toBeLessThan(20);measures.push({width:maxX-minX+1,height:maxY-minY+1});
    }
    expect(Math.abs(measures[0].width-measures[1].width)).toBeLessThanOrEqual(1);expect(Math.abs(measures[0].height-measures[1].height)).toBeLessThanOrEqual(1);footprints.push(measures);
  }
  console.log('PARTICLE_FOOTPRINT',footprints);expect(log).toEqual([]);
});

test("GPU Sven walking frame handoffs and near/away light response remain stable",async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=="desktop-chromium","HTTP Chromium WebGPU run required");
  const log=errors(page);await scene(page);await mode(page,'cinematic');await ready(page);
  const motion=await page.evaluate(async()=>{
    let draws=0;const write=GPUQueue.prototype.writeBuffer;
    GPUQueue.prototype.writeBuffer=function(buffer,offset,data,...rest){if(data instanceof Float32Array&&data.length===20&&data[8]===1)draws++;return write.call(this,buffer,offset,data,...rest);};
    const state=window.eval('state'),target={x:state.worldX+520,y:state.worldY},samples=[];
    window.eval('walkRoute')([target],()=>{},window.eval('replaceMovementIntent')({type:'cinematic-handoff-test'}));
    let previous=window.eval('cinematicRenderer').snapshot().frame;const deadline=performance.now()+12000;
    while(state.movement&&performance.now()<deadline){
      await new Promise(requestAnimationFrame);const snapshot=window.eval('cinematicRenderer').snapshot();
      if(snapshot.frame!==previous){samples.push({draws,ready:snapshot.ready,src:document.querySelector('[data-actor="sven"]').dataset.assetPath,state:window.eval('locomotion').snapshot().state});previous=snapshot.frame;draws=0;}
    }
    GPUQueue.prototype.writeBuffer=write;
    return {samples,active:Boolean(state.movement),x:state.worldX,targetX:target.x};
  });
  expect(motion.active).toBe(false);expect(motion.x).toBeCloseTo(motion.targetX,1);
  expect(motion.samples.length).toBeGreaterThan(20);expect(motion.samples.every(s=>s.ready&&s.draws>0)).toBe(true);
  expect(new Set(motion.samples.map(s=>s.src)).size).toBeGreaterThan(8);expect(motion.samples.some(s=>s.state.endsWith('Loop'))).toBe(true);
  const point=await page.evaluate(()=>({x:window.eval('state').worldX,y:window.eval('state').worldY-65}));
  const s=contract.normalize({characters:{enabled:true,localInfluence:1,intensityResponse:1},localLights:{enabled:true,items:[{...point,intensity:1,radius:250,color:'#ffbc77'}]}});
  await settings(page,s);await nextFrames(page);const near=await page.locator('[data-actor="sven"]').screenshot();
  s.localLights.items[0].x+=8000;await settings(page,s);await nextFrames(page);const away=await page.locator('[data-actor="sven"]').screenshot();expect(delta(near,away)).toBeGreaterThan(0.5);expect(log).toEqual([]);
});
