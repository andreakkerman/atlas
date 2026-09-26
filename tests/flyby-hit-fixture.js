// Test-only inspection of prepared displayed pixels. No production hit-test calls.
async function flybyPixel(page,id,kind='body') {
 return page.evaluate(({id,kind})=>{
  const r=window.eval('ambientFlybyRuntime'),s=document.querySelector(`[data-ambient-flyby="${id}"]`),c=s.querySelector('[data-flyby-canvas]');
  const img=r.readiness.get(window.eval('level').id+':'+id).images[c?Number(c.dataset.frameIndex||0):(s.dataset.frame==='b'?1:0)];
  const t=document.createElement('canvas');t.width=c?.width||img.naturalWidth;t.height=c?.height||img.naturalHeight;const ctx=t.getContext('2d');ctx.drawImage(c||img,0,0);const p=ctx.getImageData(0,0,t.width,t.height).data;
  const b=s.getBoundingClientRect(),m=new DOMMatrix(getComputedStyle(s).transform);
  let found;for(let y=2;y<t.height-2&&!found;y++)for(let x=2;x<t.width-2;x++){
   const a=p[(y*t.width+x)*4+3];let matches=kind==='padding'?a===0:kind==='fringe'?a>0&&a<=32:a>220;
   if(kind==='body'&&matches)for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)if(p[((y+dy)*t.width+x+dx)*4+3]<220)matches=false;
   if(matches){const u=(x+.5)/t.width,v=(y+.5)/t.height,dx=(u-.5)*s.offsetWidth,dy=(v-.5)*s.offsetHeight,px=(b.left+b.right)/2+m.a*dx+m.c*dy,py=(b.top+b.bottom)/2+m.b*dx+m.d*dy;if(document.elementFromPoint(px,py)?.closest('[data-ambient-flyby]')!==s)continue;found={u,v,alpha:a};break;}
  }
  if(!found)throw new Error(`No ${kind} pixel in ${id}`);
  const dx=(found.u-.5)*s.offsetWidth,dy=(found.v-.5)*s.offsetHeight;
  return {...found,x:(b.left+b.right)/2+m.a*dx+m.c*dy,y:(b.top+b.bottom)/2+m.b*dx+m.d*dy};
 },{id,kind});
}
async function tapPixel(page,info,p){if(info.project.name.startsWith('ipad'))await page.touchscreen.tap(p.x,p.y);else await page.mouse.click(p.x,p.y);}
module.exports={flybyPixel,tapPixel};
