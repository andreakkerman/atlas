// Keep application evaluation, renderer creation and preloads behind the intro.
(async () => {
 const root=document.querySelector('#atlas-intro');
 const query=new URLSearchParams(location.search);
 if(query.get('dev')==='editor'&&query.get('level'))root.remove();
 else {
  // A failed module download must still expose the static Start screen.
  let moduleTimeout;
  try {
   const {playIntro}=await Promise.race([
    import('./intro/intro.js'),
    new Promise((_,reject)=>{moduleTimeout=setTimeout(()=>reject(new Error('Intro module timeout')),8000);})
   ]);
   clearTimeout(moduleTimeout);await playIntro(root);
  }
  catch {
   clearTimeout(moduleTimeout);
   root.dataset.state='complete';
   const button=root.querySelector('button');button.disabled=false;
   await new Promise(resolve=>button.addEventListener('click',resolve,{once:true}));
   root.remove();
  }
 }
 if(!(query.get('dev')==='editor'&&query.get('level')))document.querySelector('#app').dataset.introEntered='true';
 for(const source of document.querySelectorAll('script[data-atlas-src]')){
  await new Promise((resolve,reject)=>{
   const script=document.createElement('script');script.src=source.dataset.atlasSrc;
   script.onload=resolve;script.onerror=()=>source.hasAttribute('data-atlas-optional')?resolve():reject(new Error('Atlas script unavailable: '+script.src));
   document.head.append(script);
  });
 }
})().catch(error=>{console.error(error);document.querySelector('#app').textContent='Atlas kon niet laden. Probeer de pagina opnieuw te openen.';});
