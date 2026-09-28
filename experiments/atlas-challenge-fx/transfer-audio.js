// One disposable voice, synchronized to the lab's existing sequence clock.
export function createTransferAudio(report) {
 let context,buffer,source,gain,loading,voiceKey,voiceOffset=0,voiceStart=0,starts=0;
 const Context=globalThis.AudioContext||globalThis.webkitAudioContext;
 const media=Context?null:new Audio('./assets/magical-knowledge-transfer.mp3');
 let primed=false,pending=false;
 if(media){media.preload='auto';media.addEventListener('error',()=>report('Transfer sound could not load.'));}
 const bytes=fetch('./assets/magical-knowledge-transfer.mp3').then(response=>{
  if(!response.ok)throw new Error(`HTTP ${response.status}`);
  return response.arrayBuffer();
 });
 // Handle fetch rejection immediately, including when nobody has interacted yet.
 bytes.catch(()=>report('Transfer sound could not load. Visual preview remains available.'));
 async function unlock(){
  try{
   if(media){if(!primed){primed=true;media.muted=true;await media.play();media.pause();media.muted=false;}return;}
   if(!context){context=new Context();loading=bytes.then(data=>context.decodeAudioData(data)).then(decoded=>{buffer=decoded;});loading.catch(()=>report('Transfer sound could not decode.'));}
   if(context.state!=='running')await context.resume();
  }catch{primed=false;report('Transfer sound is blocked. Click a lab control to enable audio.');}
 }
 function stop(){if(media)media.pause();if(source){source.onended=null;source.stop();source.disconnect();gain.disconnect();source=null;gain=null;}voiceKey=null;}
 function sync(key,offset,remaining){
  if(key===null||remaining<=0){stop();return;}
  if(media){
   if(!primed||media.readyState<2||offset>=media.duration)return;
   if(voiceKey===key&&(pending||!media.paused)){media.volume=Math.min(1,remaining/.025);return;}
   media.currentTime=offset;media.volume=Math.min(1,remaining/.025);voiceKey=key;starts++;pending=true;
   media.play().catch(()=>report('Transfer sound playback was blocked.')).finally(()=>{pending=false;});return;
  }
  if(!context||context.state!=='running'||!buffer)return;
  if(source&&voiceKey===key&&Math.abs(voiceOffset+context.currentTime-voiceStart-offset)<.15)return;
  stop();
  if(offset>=buffer.duration)return;
  const duration=Math.min(remaining,buffer.duration-offset);
  if(duration<=.005)return;
  source=context.createBufferSource();gain=context.createGain();source.buffer=buffer;
  source.connect(gain);gain.connect(context.destination);
  const now=context.currentTime,fade=Math.min(.025,duration/3);
  gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(1,now+fade);
  gain.gain.setValueAtTime(1,now+duration-fade);gain.gain.linearRampToValueAtTime(0,now+duration);
  voiceKey=key;voiceOffset=offset;voiceStart=now;starts++;
  const current=source;source.onended=()=>{if(source===current){current.disconnect();gain.disconnect();source=null;gain=null;}};
  source.start(now,offset,duration);
 }
 function inspect(){if(media)return{ready:media.readyState>=2,duration:media.duration||0,state:primed?'running':'locked',playing:voiceKey!==null&&voiceKey!==undefined&&!media.paused,starts,offset:media.currentTime};return{ready:!!buffer,duration:buffer?.duration||0,state:context?.state||'locked',playing:!!source,starts,offset:source?voiceOffset+context.currentTime-voiceStart:0};}
 return{unlock,stop,sync,inspect};
}
