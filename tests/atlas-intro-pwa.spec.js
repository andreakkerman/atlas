const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
const workerSource=require('node:fs').readFileSync(require('node:path').join(__dirname,'..','service-worker.js'),'utf8');
const currentCache=workerSource.match(/const CACHE_NAME = "([^"]+)"/)[1];
test.use({serviceWorkers:'allow'});
test('delayed boot registers PWA, upgrades cache, and reloads intro offline',async({page,context})=>{
 test.setTimeout(60000);
 // A disposable forwarding origin lets us test a real network outage against
 // the existing asset server. WebKit's setOffline navigation is broken upstream:
 // https://github.com/microsoft/playwright/issues/42775
 const http=require('node:http');
 const pending=new Set();
 const proxy=http.createServer((req,res)=>{
  const upstream=http.request(new URL(req.url,base),{method:req.method,headers:{...req.headers,host:new URL(base).host}},response=>{
   res.writeHead(response.statusCode,response.headers);response.pipe(res);
  });
  pending.add(upstream);upstream.on('close',()=>pending.delete(upstream));
  upstream.on('error',()=>{if(!res.headersSent)res.writeHead(502);res.end();});req.pipe(upstream);
 });
 await new Promise(resolve=>proxy.listen(0,'127.0.0.1',resolve));
 const origin='http://127.0.0.1:'+proxy.address().port;
 async function disconnect(){
  if(!proxy.listening)return;
  const closed=new Promise(resolve=>proxy.close(resolve));
  proxy.closeAllConnections();for(const request of pending)request.destroy();await closed;
 }
 try {
 // Exercise the actual worker/cache upgrade without consuming a second GPU.
 await page.addInitScript(()=>{Object.defineProperty(navigator,'gpu',{configurable:true,value:undefined});const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl2'?null:get.call(this,type,...args);};});
 await page.goto(origin);
 await page.evaluate(()=>caches.open('svenadventure-static-v217-compass-icons'));
 await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
 await expect(page.locator('.menuScreen')).toBeVisible();
 await expect.poll(()=>page.evaluate(()=>window.eval('audioState.music')?.paused)).toBe(false);
 await page.evaluate(()=>navigator.serviceWorker.ready);
 await expect.poll(()=>page.evaluate(()=>caches.keys())).toEqual([currentCache]);
 const introAssets=await page.evaluate(async cacheName=>{
  const cache=await caches.open(cacheName);
  return (await cache.keys()).map(r=>new URL(r.url).pathname).filter(p=>p.includes('/intro/')||p.endsWith('/bootstrap.js'));
 },currentCache);
 expect(introAssets).toHaveLength(10);
 await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
 await disconnect();
 await expect(context.request.get(origin)).rejects.toThrow();
 await page.reload();
 await expect(page.locator('#atlas-intro')).toHaveAttribute('data-state','complete');
 // Verify exact new icon bytes through the worker during a real origin outage,
 // including HTML's Safari touch icon and both favicon sizes.
 const iconAudit=await page.evaluate(async()=>{
  const manifestLink=document.querySelector('link[rel="manifest"]');
  const manifest=await (await fetch(manifestLink.href)).json();
  const icons=[...document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]')].map(link=>({src:link.getAttribute('href'),sizes:link.sizes.value}));
  icons.push(...manifest.icons);
  return Promise.all(icons.map(async icon=>{
   const response=await fetch(icon.src);
   const bytes=await response.arrayBuffer();
   const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(n=>n.toString(16).padStart(2,'0')).join('');
   const image=new Image();image.src=icon.src;await image.decode();
   return {...icon,status:response.status,mime:response.headers.get('content-type'),hash,width:image.naturalWidth,height:image.naturalHeight};
  }));
 });
 expect(iconAudit).toHaveLength(6);
 expect(new Set(iconAudit.map(icon=>icon.src)).size).toBe(6);
 const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
 for(const icon of iconAudit){
  expect(icon.src).toMatch(/\?v=atlas-compass-1$/);
  expect(icon.status).toBe(200);expect(icon.mime).toContain('image/png');
  expect(`${icon.width}x${icon.height}`).toBe(icon.sizes);
  const disk=fs.readFileSync(path.join(__dirname,'..',icon.src.split('?')[0]));
  expect(icon.hash).toBe(crypto.createHash('sha256').update(disk).digest('hex'));
  if(icon.src.includes('maskable'))expect(icon.purpose).toBe('maskable');
  else if(icon.width>=192)expect(icon.purpose).toBe('any');
 }
 await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
 await expect(page.locator('.menuScreen')).toBeVisible();
 } finally {await disconnect();}
});
