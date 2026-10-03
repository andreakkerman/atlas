// Read-only summarizer for the opt-in native browser captures.
const fs=require('fs'),path=require('path'),zlib=require('zlib');
const root=__dirname,rows=[],boundaries=[];
const sum=(xs)=>xs.reduce((a,b)=>a+b,0),round=x=>Number((x||0).toFixed(3));
for(const dir of ['matrix','lifecycle','visibility','native-visibility','native-browser']){
 if(!fs.existsSync(path.join(root,dir)))continue;
 if(process.argv.includes('--pack'))for(const file of fs.readdirSync(path.join(root,dir)).filter(x=>x.endsWith('.json'))){
  const source=path.join(root,dir,file);fs.writeFileSync(source+'.gz',zlib.gzipSync(fs.readFileSync(source)));fs.unlinkSync(source);
 }
 for(const file of fs.readdirSync(path.join(root,dir)).filter(x=>/\.json(\.gz)?$/.test(x))){
  const raw=fs.readFileSync(path.join(root,dir,file));
  const data=JSON.parse(file.endsWith('.gz')?zlib.gunzipSync(raw):raw),name=file.replace(/\.json(\.gz)?$/,'');
  for(const step of data.steps||[])for(const mode of ['stationary','walking']){
   const m=step[mode],s=m.snapshot,r=s.renderer,n=m.rows.length,totals={};
   for(const row of m.rows)for(const [k,v]of Object.entries(row.work))totals[k]=(totals[k]||0)+v;
   const match=p=>sum(Object.entries(totals).filter(([k])=>p(k)).map(([,v])=>v));
   const slow=m.rows.filter(x=>x.dt>25);
   rows.push({run:dir+'/'+name,step:step.label,level:s.level,mode,fullScene:r.illustratedScene,...Object.fromEntries(Object.entries(m.summary).map(([k,v])=>[k,round(v)])),
    textures:s.gpu.textures.length,buffers:s.gpu.buffers,targets:r.renderTargets,depthCache:r.depthCached,uploadedCache:r.auditCaches.uploaded,pendingUploads:r.auditCaches.pendingUploads,
    passes:round(totals.passes/n),draws:round(totals.draws/n),submissions:round(totals.submissions/n),rendererCPUms:round(match(k=>k.startsWith('cpu:renderFrame'))/n),effectsCPUms:round(match(k=>k.startsWith('cpu:draw#'))/n),
    canvasUploadsPerFrame:round(match(k=>k.startsWith('upload:canvas:'))/n),filteredCanvasUploads:totals['upload:spriteRaster']||0,detachedCanvasDraws:totals.detachedCanvasDraws||0,textureCreates:totals.TextureCreate||0,textureDestroys:totals.TextureDestroy||0,logicalMiB:round((totals.uploadBytes||0)/1048576),
    imageChangeFrames:m.rows.filter(x=>x.change==='image').length,positionChangeFrames:m.rows.filter(x=>x.change==='position').length,
    rafPending:sum(Object.values(s.raf)),effectsRAF:Number(s.effects.raf),producers:s.dom.canvases.filter(c=>c.slot&&/Atmosphere|worldLight/.test(c.slot)).length,particles:r.particles,effects:s.effects.resolved,
    owners:s.owners.length,timers:s.timers.timeouts.length+s.timers.intervals.length,pending:s.pending.length,playing:s.media.playing.length,flybys:s.ambient.active,flybyAudio:s.ambient.audio,images:s.caches.images,sounds:s.caches.sounds,decoded:s.caches.decodedSprites,decodedMiB:round(s.caches.decodedLogicalBytes/1048576),dom:s.dom.nodes,
    slowFrames:slow.length,slowWithImage:slow.filter(x=>x.change==='image').length,slowWithUpload:slow.filter(x=>x.work.uploads).length,slowWithAllocation:slow.filter(x=>x.work.TextureCreate).length,slowWithTimer:slow.filter(x=>x.work.timerCallbacks).length});
  }
  for(const s of [...(data.steps||[]).flatMap(x=>x.captures||[]),...(data.final?.captures||[])]){
   if(!s.gpu)continue;
   boundaries.push({run:dir+'/'+name,tag:s.tag,time:round(s.time),level:s.level||'',screen:s.screen,visibility:s.visibility,textures:s.gpu.textures.length,buffers:s.gpu.buffers,targets:s.renderer?.renderTargets||0,depth:s.renderer?.depthCached||0,renderer:s.renderer?.status,scheduled:s.renderer?.scheduled,raf:sum(Object.values(s.raf)),effectsRAF:s.effects?.raf,pending:s.pending.length,timers:s.timers.timeouts.length+s.timers.intervals.length,images:s.caches.images,decoded:s.caches.decodedSprites,flybys:s.ambient?.active,flybyAudio:s.ambient?.audio});
  }
 }
}
function csv(file,data){const keys=Object.keys(data[0]||{}),quote=x=>JSON.stringify(x??'');fs.writeFileSync(path.join(root,file),keys.join(',')+'\n'+data.map(r=>keys.map(k=>quote(r[k])).join(',')).join('\n')+'\n');}
csv('measurements.csv',rows);csv('transitions.csv',boundaries);fs.writeFileSync(path.join(root,'summary.json'),JSON.stringify(rows,null,2));
const perf=['Run / step','State','FPS','Median','p95','p99','Pass/draw','Canvas uploads/frame','Textures/buffers/depth'];
fs.writeFileSync(path.join(root,'TIMELINE.md'),'# Measured timeline\n\nIntervals are milliseconds. Native RAF cadence, not GPU completion time. See REPORT.md for method and limitations.\n\n| '+perf.join(' | ')+' |\n|'+perf.map(()=>'---').join('|')+'|\n'+rows.map(r=>'| '+[r.run+' / '+r.step,r.mode,r.fps,r.median,r.p95,r.p99,r.passes+'/'+r.draws,r.canvasUploadsPerFrame,r.textures+'/'+r.buffers+'/'+r.depthCache].join(' | ')+' |').join('\n')+'\n');
console.log(JSON.stringify({samples:rows.length,boundaries:boundaries.length,fps:[Math.min(...rows.map(x=>x.fps)),Math.max(...rows.map(x=>x.fps))],slowFrames:sum(rows.map(x=>x.slowFrames))}));
