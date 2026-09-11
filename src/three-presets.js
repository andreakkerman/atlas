(function(global){
 'use strict';
 const presets=Object.freeze({
  'desktop-high':Object.freeze({id:'desktop-high',name:'Desktop High',worldSamples:4,effectSamples:4,dprCap:1.5,shadowSize:4096,volumeResolution:.25,volumeSteps:80,gtao:true,bloom:true,anisotropy:8}),
  // WebGPU only supports sample counts 1 and 4. Two samples are not a valid
  // intermediate setting; use one for this deliberately conservative baseline.
  'tablet-optimized':Object.freeze({id:'tablet-optimized',name:'Tablet Optimized',worldSamples:1,effectSamples:1,dprCap:.75,shadowSize:1024,volumeResolution:0,volumeSteps:0,gtao:false,bloom:false,anisotropy:2,textureCap:1024,environmentCap:512})
 });
 function detectDevice(s){
  const ua=s.userAgent||'',platform=s.platform||'',touch=(s.maxTouchPoints||0)>1;
  const appleTouch=/iPad|iPhone|iPod/.test(ua)||(touch&&/Mac/.test(platform));
  let deviceClass='desktop',reason='desktop input';
  const sizes=[s.screenWidth,s.screenHeight].every(n=>n>0)?[s.screenWidth,s.screenHeight]:[s.width||0,s.height||0];
  const large=Math.min(...sizes)>=600;
  if(/iPad/.test(ua)||(touch&&/Mac/.test(platform))){deviceClass='tablet';reason='iPad / touch-capable Mac platform';}
  else if(s.formFactors?.includes('Tablet')){deviceClass='tablet';reason='browser form factor';}
  else if(touch&&/Android/.test(ua)&&(!/Mobile/.test(ua)||large)){deviceClass='tablet';reason='Android tablet and touch';}
  else if(touch&&s.coarse&&!s.hover&&large){deviceClass='tablet';reason='large touch-first screen';}
  else if(/iPhone|iPod/.test(ua)||(touch&&(/Mobile/.test(ua)||s.mobile))){deviceClass='phone';reason='handheld touch device';}
  return Object.freeze({deviceClass,reason,nativeTouch:appleTouch});
 }
 function select(signals,override){
  const device=detectDevice(signals),forced=Object.hasOwn(presets,override)?presets[override]:null,preset=forced||presets[device.deviceClass==='desktop'?'desktop-high':'tablet-optimized'];
  const compact=device.deviceClass!=='desktop'||preset.id==='tablet-optimized';
  return Object.freeze({device,preset,compact,presentationSamples:compact?1:4,presentationDepth:!compact,override:Boolean(forced)});
 }
 const nav=global.navigator||{},screen=global.screen||{};
 const session=select({userAgent:nav.userAgent,platform:nav.platform||nav.userAgentData?.platform,maxTouchPoints:nav.maxTouchPoints,mobile:nav.userAgentData?.mobile,formFactors:nav.userAgentData?.formFactors,screenWidth:screen.width,screenHeight:screen.height,width:global.innerWidth,height:global.innerHeight,coarse:global.matchMedia?.('(pointer: coarse)').matches,hover:global.matchMedia?.('(hover: hover)').matches},new URLSearchParams(global.location?.search).get('rendererPreset'));
 function describe(config=session){const {device,preset:p,presentationSamples}=config;return `${device.deviceClass} · ${p.name}\nMSAA wereld ${p.worldSamples}× / effecten ${p.effectSamples}× / presentatie ${presentationSamples}× · DPR-cap ${p.dprCap}\nSchaduw ${p.shadowSize}² · GTAO ${p.gtao?'aan':'uit'} · Volume ${p.volumeSteps?`${p.volumeResolution*100}% / ${p.volumeSteps} stappen`:"uit"}\nBloom ${p.bloom?'aan':'uit'} · Anisotropie ${p.anisotropy} · Textuur-cap ${p.textureCap||"origineel"}\nOmgeving ${p.environmentCap?`HDR ${p.environmentCap}×${p.environmentCap/2} / PMREM ${p.environmentCap*.75}×${p.environmentCap}`:"HDR 2048×1024 / PMREM 1536×2048"}`;}
 global.AtlasThreePresets=Object.freeze({presets,detectDevice,select,session,describe});
})(window);
