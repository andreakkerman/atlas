(function(global){
 'use strict';
 const device=global.AtlasThreePresets.session.device;
 const atlasPreset=Object.freeze({...global.AtlasThreePresets.presets['tablet-optimized'],id:'atlas-canonical',name:'Atlas 3D'});
 const modes=Object.freeze([
  {id:'illustrated',label:'Illustrated',group:'Renderer'},
  {id:'cinematic',label:'Cinematic',group:'Renderer'},
  {id:'voxel',label:'Voxel',group:'Experimental'},
  {id:'3d',label:'Real 3D',group:'Experimental',world:'real-3d',asset:'Levels/LVL-0001/3d/real-3d.glb',desktopOnly:true,preset:global.AtlasThreePresets.presets['desktop-high']},
  {id:'atlas-3d',label:'Atlas 3D',group:'Experimental',world:'atlas-3d',asset:'Levels/LVL-0001/3d/atlas-3d.glb',preset:atlasPreset}
 ].map(Object.freeze));
 const get=id=>modes.find(mode=>mode.id===id);
 const supported=(id,current=device)=>Boolean(get(id))&&(!get(id).desktopOnly||current.deviceClass==='desktop');
 const normalize=(id,current=device)=>supported(id,current)?id:'illustrated';
 const isThree=id=>Boolean(get(id)?.world);
 function configuration(id,current=device){
  const mode=get(id);if(!mode?.world||!supported(id,current))return null;
  const compact=id==='atlas-3d';
  return Object.freeze({device:current,preset:mode.preset,compact,presentationSamples:compact?1:4,presentationDepth:!compact,override:false});
 }
 const list=(selected,current=device)=>modes.map(mode=>({...mode,supported:supported(mode.id,current),enabled:supported(mode.id,current),selected:normalize(selected,current)===mode.id}));
 global.AtlasGraphicsModes=Object.freeze({modes,device,atlasPreset,get,supported,normalize,isThree,configuration,list});
})(window);
