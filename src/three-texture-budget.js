(function(global){
 'use strict';
 function dimensions(width,height,cap){
  const scale=cap>0?Math.min(1,cap/Math.max(width,height)):1;
  return {width:Math.max(1,Math.round(width*scale)),height:Math.max(1,Math.round(height*scale))};
 }
 function create(cap){
  const pending=new WeakMap();
  const stats={sourceBytes:0,resizedBytes:0,releasedSourceBytes:0,images:0,resized:0,maxLongEdge:0};
  async function resize(texture){
   if(!cap)return texture;
   const source=texture.source;
   if(!pending.has(source))pending.set(source,(async()=>{
    const image=source.data,{width,height}=image,size=dimensions(width,height,cap);
    stats.images++;stats.sourceBytes+=width*height*4;
    stats.resizedBytes+=size.width*size.height*4;
    stats.maxLongEdge=Math.max(stats.maxLongEdge,size.width,size.height);
    if(size.width===width&&size.height===height)return;
    // Resize raw channels, including alpha and packed normal/PBR maps. Material
    // color-space interpretation, samplers, flipY and UV transforms stay intact.
    const replacement=await createImageBitmap(image,{resizeWidth:size.width,resizeHeight:size.height,resizeQuality:'high',premultiplyAlpha:'none',colorSpaceConversion:'none'});
    if(replacement.width!==size.width||replacement.height!==size.height){replacement.close();throw new Error('Browser did not apply the tablet texture resize budget.');}
    source.data=replacement;source.needsUpdate=true;
    image.close?.();stats.resized++;stats.releasedSourceBytes+=width*height*4;
   })());
   await pending.get(source);return texture;
  }
  return {resize,snapshot:()=>({...stats,cap})};
 }
 function resizeHDR(texture,cap,dataUtils){
  const image=texture.image,{width,height,data}=image,size=dimensions(width,height,cap);
  if(size.width===width&&size.height===height)return;
  const channels=data.length/(width*height),output=new data.constructor(size.width*size.height*channels);
  const half=data instanceof Uint16Array;
  // Box filtering in linear HDR space; never reinterpret half-float bits as color.
  for(let y=0;y<size.height;y++)for(let x=0;x<size.width;x++){
   const x0=Math.floor(x*width/size.width),x1=Math.floor((x+1)*width/size.width),y0=Math.floor(y*height/size.height),y1=Math.floor((y+1)*height/size.height);
   for(let c=0;c<channels;c++){
    let sum=0;for(let sy=y0;sy<y1;sy++)for(let sx=x0;sx<x1;sx++){const v=data[(sy*width+sx)*channels+c];sum+=half?dataUtils.fromHalfFloat(v):v;}
    const value=sum/((x1-x0)*(y1-y0));output[(y*size.width+x)*channels+c]=half?dataUtils.toHalfFloat(value):value;
   }
  }
  texture.image={...image,width:size.width,height:size.height,data:output};texture.needsUpdate=true;
 }
 global.AtlasThreeTextureBudget=Object.freeze({dimensions,create,resizeHDR});
})(window);
