import {createRenderer} from './renderer.js';
import {defaults,timing} from './settings.js';

// Resolves only after normal teardown. No runtime object escapes into Atlas.
export function playIntro(root) {
 return new Promise(resolve=>{
  let canvas=root.querySelector('canvas'), button=root.querySelector('button');
  let renderer=null, raf=0, time=0, last=0, generation=0, destroyed=false, complete=false;
  let loading=null, timeout=0, suppressClick=false;
  const listeners=new AbortController(), end=timing(defaults).end;
  const listen=(target,type,fn,options={})=>target.addEventListener(type,fn,{...options,signal:listeners.signal});
  function stop(){cancelAnimationFrame(raf);raf=0;last=0;}
  function cancelLoad(){generation++;clearTimeout(timeout);timeout=0;loading?.abort();loading=null;}
  function dispose(lose=true){stop();renderer?.destroy(lose);renderer=null;root?.removeAttribute('data-rendered');}
  function finish(){
   if(destroyed)return;
   complete=true;time=end;root.dataset.state='complete';button.disabled=false;
   if(renderer){try{renderer.render(end);root.dataset.rendered='true';}catch(error){console.warn('[Atlas intro] Using static fallback:',error.message);fallback();}}
   else {cancelLoad();canvas.style.visibility='hidden';button.style.opacity='1';button.style.visibility='visible';}
  }
  function fallback(){
   if(destroyed)return;
   cancelLoad();dispose();complete=true;time=end;
   canvas.style.visibility='hidden';root.dataset.state='complete';button.disabled=false;
   button.style.opacity='1';button.style.visibility='visible';
  }
  function tick(now){
   raf=0;if(destroyed||document.hidden||!renderer)return;
   const dt=last?Math.min((now-last)/1000,.08):0;last=now;
   try{
    if(!complete){time=Math.min(end,time+dt);renderer.render(time);if(time>=end)finish();}
    else renderer.breathe(dt);
   }catch(error){console.warn('[Atlas intro] Using static fallback:',error.message);fallback();return;}
   if(renderer)raf=requestAnimationFrame(tick);
  }
  function loadImage(path,signal){
   return new Promise((resolveImage,reject)=>{
    const image=new Image();
    const cleanup=()=>{image.onload=null;image.onerror=null;signal.removeEventListener('abort',abort);};
    const abort=()=>{cleanup();image.src='';reject(new DOMException('Cancelled','AbortError'));};
    image.onload=()=>{cleanup();resolveImage(image);};
    image.onerror=()=>{cleanup();reject(new Error('Intro asset unavailable'));};
    signal.addEventListener('abort',abort,{once:true});
    image.src=new URL('../../assets/intro/'+path,import.meta.url).href;
   });
  }
  async function restart(){
   cancelLoad();dispose(false);if(destroyed||document.hidden)return;
   complete=false;time=0;root.dataset.state='loading';button.disabled=true;
   button.style.opacity='0';button.style.visibility='hidden';canvas.style.visibility='hidden';
   const token=generation;loading=new AbortController();
   timeout=setTimeout(fallback,8000);
   try{
    const images=await Promise.all(['atlas-reference-b.jpg','atlas-transparent.png','magic-reference-c.jpg'].map(p=>loadImage(p,loading.signal)));
    if(destroyed||token!==generation||document.hidden)return;
    clearTimeout(timeout);timeout=0;loading=null;
    renderer=createRenderer(canvas,button,images);
    canvas.style.visibility='visible';root.dataset.rendered='true';root.dataset.state='playing';
    renderer.render(0);
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)finish();
    else raf=requestAnimationFrame(tick);
   }catch(error){if(!destroyed&&token===generation){console.warn('[Atlas intro] Using static fallback:',error.message);fallback();}}
  }
  function destroy(){
   if(destroyed)return;
   destroyed=true;listeners.abort();cancelLoad();dispose();
   canvas.width=canvas.height=1;root.remove();canvas=button=root=null;
   resolve();
  }
  // Capture the first gesture, including its later click at the newly revealed
  // button. A fresh pointerdown (or keyboard click) can then activate Start.
  listen(root,'pointerdown',event=>{
   if(!complete){suppressClick=true;event.preventDefault();event.stopImmediatePropagation();finish();}
   else suppressClick=false;
  },{capture:true});
  listen(root,'click',event=>{
   if(suppressClick){suppressClick=false;event.preventDefault();event.stopImmediatePropagation();}
  },{capture:true});
  listen(button,'click',()=>{if(complete)destroy();});
  listen(root,'keydown',event=>{
   if(!complete&&(event.key==='Enter'||event.key===' ')){event.preventDefault();finish();button.focus();}
  });
  listen(window,'resize',()=>{if(renderer&&!document.hidden)try{renderer.resize();}catch(error){console.warn('[Atlas intro] Using static fallback:',error.message);fallback();}});
  listen(document,'visibilitychange',()=>{
   if(document.hidden){cancelLoad();stop();}else restart();
  });
  listen(window,'pagehide',()=>{cancelLoad();stop();});
  listen(window,'pageshow',event=>{if(event.persisted)restart();});
  listen(canvas,'webglcontextlost',event=>{event.preventDefault();fallback();});
  listen(canvas,'webglcontextrestored',()=>restart());
  restart();
 });
}
