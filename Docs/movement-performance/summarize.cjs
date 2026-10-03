const fs=require('fs'),path=require('path');
const keys=['fps','p50','p95','p99'];
const counts=['raf:renderFrame','passes','draws','copy','copyMs','filteredSprite','filteredSpriteMB','legacy:worldLight','legacy:foregroundAtmosphere','geometryReads','geometryReadsMs','styleReads','styleReadMs','uniformWrite','bindGroup','textureCreate','textureDestroy','bufferCreate','bufferDestroy','submit'];
const rows=[['run','case','frames',...keys,...counts]];
for(const run of ['before','desktop','headed-chrome','level1']){
 const data=JSON.parse(fs.readFileSync(path.join(__dirname,run,'profile.json'),'utf8'));
 for(const [key,value] of Object.entries(data)){
  const s=value.summary;rows.push([run,key,s.frames,...keys.map(k=>s[k]),...counts.map(k=>s.perFrame[k]||0)]);
 }
}
fs.writeFileSync(path.join(__dirname,'summary.csv'),rows.map(row=>row.join(',')).join('\n')+'\n');
console.log(`${rows.length-1} measured cases summarized`);
