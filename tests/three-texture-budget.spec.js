const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';

test('tablet texture resize preserves raw channels, alpha and shared source semantics',async({page})=>{
 await page.goto(base);
 const result=await page.evaluate(async()=>{
  const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=1024;
  const ctx=canvas.getContext('2d');ctx.fillStyle='rgba(64,128,192,0.5)';ctx.fillRect(0,0,2048,1024);
  const image=await createImageBitmap(canvas,{premultiplyAlpha:'none',colorSpaceConversion:'none'});
  const source={data:image},texture={source,colorSpace:'srgb',flipY:false,wrapS:1000,anisotropy:2};
  const variant={source,colorSpace:'',flipY:false};
  const budget=AtlasThreeTextureBudget.create(1024);
  await budget.resize(texture);await budget.resize(variant);
  const output=document.createElement('canvas');output.width=1024;output.height=512;
  const context=output.getContext('2d');context.drawImage(source.data,0,0);
  const pixel=Array.from(context.getImageData(100,100,1,1).data);
  const data={size:[source.data.width,source.data.height],originalClosed:image.width===0,pixel,stats:budget.snapshot(),colorSpace:texture.colorSpace,normalColorSpace:variant.colorSpace,flipY:texture.flipY,wrapS:texture.wrapS,anisotropy:texture.anisotropy};
  source.data.close();return data;
 });
 expect(result.size).toEqual([1024,512]);expect(result.originalClosed).toBe(true);
 for(let i=0;i<4;i++)expect(Math.abs(result.pixel[i]-[64,128,192,128][i])).toBeLessThanOrEqual(2);
 expect(result).toMatchObject({colorSpace:'srgb',normalColorSpace:'',flipY:false,wrapS:1000,anisotropy:2});
 expect(result.stats).toMatchObject({images:1,resized:1,sourceBytes:2048*1024*4,resizedBytes:1024*512*4,releasedSourceBytes:2048*1024*4});
});

test('texture cap never upscales and desktop preserves original pixels',async({page})=>{
 await page.goto(base);
 const result=await page.evaluate(async()=>{
  const api=AtlasThreeTextureBudget,small={source:{data:{width:300,height:200}}},large={source:{data:{width:4096,height:2048}}};
  const original=large.source.data,desktop=api.create(0),tablet=api.create(1024);
  await desktop.resize(large);await tablet.resize(small);
  return {small:small.source.data,desktopUntouched:large.source.data===original,desktop:desktop.snapshot(),portrait:api.dimensions(1000,3000,1024)};
 });
 expect(result.small).toEqual({width:300,height:200});expect(result.desktopUntouched).toBe(true);expect(result.desktop.images).toBe(0);
 expect(result.portrait).toEqual({width:341,height:1024});
});

test('HDR budget filters linear half float values and preserves texture metadata',async({page})=>{
 await page.goto(base);
 const result=await page.evaluate(async()=>{
  const {DataUtils}=await import('/assets/vendor/three/three.webgpu.min.js');
  const data=new Uint16Array(8*4*4);for(let i=0;i<data.length;i+=4){data[i]=DataUtils.toHalfFloat(i%8?4:2);data[i+1]=DataUtils.toHalfFloat(.5);data[i+2]=0;data[i+3]=DataUtils.toHalfFloat(1);}
  const texture={image:{width:8,height:4,data},colorSpace:'srgb-linear',type:1016};
  AtlasThreeTextureBudget.resizeHDR(texture,4,DataUtils);
  return {size:[texture.image.width,texture.image.height],values:Array.from(texture.image.data.slice(0,4),DataUtils.fromHalfFloat),colorSpace:texture.colorSpace,type:texture.type,sourceReplaced:texture.image.data!==data};
 });
 expect(result).toEqual({size:[4,2],values:[3,.5,0,1],colorSpace:'srgb-linear',type:1016,sourceReplaced:true});
});
