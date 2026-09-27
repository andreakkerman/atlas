const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
test.use({reducedMotion:'no-preference'});
async function activate(page,locator){if(test.info().project.name.startsWith('ipad-'))await locator.tap();else await locator.click();}
async function instrument(page){
 await page.addInitScript(()=>{
  window.introAudit={allocations:0,deletions:0,frames:0,pending:new Set(),signals:[],lost:0};
  const a=window.introAudit,request=window.requestAnimationFrame,cancel=window.cancelAnimationFrame;
  window.requestAnimationFrame=fn=>{let id=request.call(window,t=>{a.pending.delete(id);a.frames++;fn(t);});a.pending.add(id);return id;};
  window.cancelAnimationFrame=id=>{a.pending.delete(id);cancel.call(window,id);};
  const add=EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener=function(type,fn,options){if(options?.signal)a.signals.push(options.signal);return add.call(this,type,fn,options);};
  const get=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(type,...args){
   const gl=get.call(this,type,...args);if(type!=='webgl2'||!gl||gl.audited)return gl;
   gl.audited=true;window.introGL=gl;
   const names=new Map(),location=gl.getUniformLocation.bind(gl),uniform=gl.uniform1f.bind(gl);
   gl.getUniformLocation=(program,name)=>{const loc=location(program,name);names.set(loc,name);return loc;};
   gl.uniform1f=(loc,value)=>{if(names.get(loc)==='time')a.time=value;return uniform(loc,value);};
   for(const kind of ['Program','Shader','Buffer','Texture','Framebuffer','VertexArray']){
    const create=gl['create'+kind].bind(gl),del=gl['delete'+kind].bind(gl);
    gl['create'+kind]=(...args)=>{const value=create(...args);if(value)a.allocations++;return value;};
    gl['delete'+kind]=value=>{if(value)a.deletions++;return del(value);};
   }
   this.addEventListener('webglcontextlost',()=>a.lost++);
   return gl;
  };
 });
}
async function started(page){await activate(page,page.locator('#atlas-intro-start'));await expect(page.locator('.menuScreen')).toBeVisible();await expect(page.locator('#atlas-intro')).toHaveCount(0);}

test('approved five-second reveal completes naturally and hands off with complete teardown',async({page},info)=>{
 await instrument(page);
 const errors=[],failed=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 await page.goto(base);
 await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','playing');
 expect(await page.evaluate(()=>typeof window.AtlasThreeRenderer)).toBe('undefined');
 expect(await page.locator('script[src="src/app.js"]').count()).toBe(0);
 await expect.poll(()=>page.evaluate(()=>({state:document.querySelector('#atlas-intro').dataset.state,rendered:document.querySelector('#atlas-intro').dataset.rendered,enabled:!document.querySelector('#atlas-intro-start').disabled,time:introAudit.time})),{timeout:12000}).toEqual({state:'complete',rendered:'true',enabled:true,time:5});
 await expect(page.getByRole('img',{name:'ATLAS',exact:true})).toBeVisible();
 await expect(page.locator('#atlas-intro-start')).toBeEnabled();
 await page.screenshot({path:info.outputPath('intro-complete.png')});
 // Capture only intro work, before the application's independent RAF begins.
 await page.route('**/Levels/manifest.js',async route=>{
  const audit=await page.evaluate(()=>({pending:introAudit.pending.size,allocated:introAudit.allocations,deleted:introAudit.deletions,signals:introAudit.signals.every(s=>s.aborted),lost:introGL.isContextLost()}));
  expect(audit.allocated).toBeGreaterThan(10);expect(audit.deleted).toBe(audit.allocated);expect(audit.pending).toBe(0);expect(audit.signals).toBe(true);expect(audit.lost).toBe(true);
  await route.continue();
 });
 await started(page);expect(await page.evaluate(()=>window.eval('audioState.unlocked'))).toBe(true);await expect.poll(()=>page.evaluate(()=>window.eval('audioState.music')?.paused)).toBe(false);expect(errors).toEqual([]);expect(failed).toEqual([]);
 await activate(page,page.locator('.menuSettings summary'));await expect(page.locator('[data-action="reset-local-atlas"]')).toBeVisible();
});

test('first gesture at the future Start position finishes without entering Atlas',async({page})=>{
 await instrument(page);
 await page.goto(base);await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','playing');
 await page.waitForFunction(()=>introAudit.time>.25&&introAudit.time<3&&document.querySelector('#atlas-intro').dataset.state==='playing');
 const pos=await page.locator('#atlas-intro-start').evaluate(b=>{const r=b.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};});
 if(test.info().project.name.startsWith('ipad-'))await page.touchscreen.tap(pos.x,pos.y);else await page.mouse.click(pos.x,pos.y);
 await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','complete');
 await expect(page.locator('#atlas-intro')).toHaveAttribute('data-rendered','true');
 await expect(page.locator('.menuScreen')).toHaveCount(0);
 await started(page);
});

for(const failure of ['unavailable','shader','allocation','asset','module'])test(failure+' failure leaves Start usable',async({page})=>{
 if(['shader','allocation'].includes(failure))await instrument(page);
 if(failure==='allocation')await page.addInitScript(()=>{const create=WebGL2RenderingContext.prototype.createTexture;let count=0;WebGL2RenderingContext.prototype.createTexture=function(){return ++count===3?null:create.call(this);};});
 if(failure==='unavailable')await page.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl2'?null:get.call(this,type,...args);};});
 if(failure==='shader')await page.addInitScript(()=>{WebGL2RenderingContext.prototype.getShaderParameter=()=>false;});
 if(failure==='asset')await page.route('**/assets/intro/magic-reference-c.jpg',route=>route.abort());
 if(failure==='module')await page.route('**/src/intro/renderer.js',route=>route.abort());
 await page.goto(base);await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','complete',{timeout:12000});
 if(['shader','allocation'].includes(failure)){const a=await page.evaluate(()=>({allocated:introAudit.allocations,deleted:introAudit.deletions}));expect(a.allocated).toBeGreaterThan(0);expect(a.deleted).toBe(a.allocated);}
 await started(page);
});

test('pending image load can be completed immediately and cannot resurrect after Start',async({page})=>{
 await page.route('**/assets/intro/magic-reference-c.jpg',()=>{});
 await page.goto(base,{waitUntil:'domcontentloaded'});
 await activate(page,page.locator('#atlas-intro'));
 await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','complete');await started(page);
});

test('visibility restarts and real context loss recovers or remains startable',async({page})=>{
 await instrument(page);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','playing');
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
 expect(await page.evaluate(()=>introAudit.pending.size)).toBe(0);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});
 await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','playing');
 await page.evaluate(()=>(window.lossExtension=introGL.getExtension('WEBGL_lose_context')).loseContext());
 await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','complete');
 await page.evaluate(()=>lossExtension.restoreContext());
 await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','playing');
 await activate(page,page.locator('#atlas-intro canvas'));await started(page);expect(errors).toEqual([]);
});


test('a stalled module download times out and its late completion cannot restart the intro',async({page})=>{
 await page.clock.install();
 let release;
 const held=new Promise(resolve=>{release=resolve;});
 await page.route('**/src/intro/renderer.js',async route=>{await held;await route.continue();});
 await page.goto(base,{waitUntil:'domcontentloaded'});
 await page.clock.fastForward(8000);
 await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','complete');
 await started(page);
 release();
 await page.waitForResponse('**/src/intro/renderer.js');
 await expect(page.locator('#atlas-intro')).toHaveCount(0);
 await expect(page.locator('.menuScreen')).toBeVisible();
});


test('reduced motion shows the final artwork without an idle animation loop',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await instrument(page);
 await page.goto(base);
 await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','complete');
 expect(await page.evaluate(()=>introAudit.time)).toBe(5);
 expect(await page.evaluate(()=>introAudit.pending.size)).toBe(0);
 await started(page);
});
