import {groups,controls,defaults,presets,STORAGE_KEY,timeKeys,sanitize,normalize,timing} from './settings.js';

export function loadSettings(query){
 try {if(!query.has('baseline')){const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));if(saved?.version===1)return normalize(sanitize(saved.settings));}}catch{}
 return {...defaults};
}
export function attachTuning({settings,render,seek,replay,pause,state,query}){
 const $=id=>document.getElementById(id), fields=new Map();let saveTimer,snapshot=null,comparison=null;
 const status=message=>{$('settings-status').textContent=message;};
 const exportObject=()=>({lab:'Atlas intro',version:1,settings:{...settings}});
 const json=()=>JSON.stringify(exportObject(),null,2);
 function save(){clearTimeout(saveTimer);try{localStorage.setItem(STORAGE_KEY,json());status('Saved locally in this browser.');}catch{status('Local saving unavailable. Copy or export settings to keep them.');}}
 function sync(){
  for(const c of controls){const [range,number]=fields.get(c.key);range.value=settings[c.key];number.value=Number(settings[c.key].toFixed(5));}
  $('timeline').max=timing(settings).end;
  const phase=timing(settings);
  $('timing-summary').textContent=`Arrival ${phase.arrival.toFixed(2)} s · formation ${phase.formation.toFixed(2)}–${phase.formed.toFixed(2)} s · end ${phase.end.toFixed(2)} s`;
 }
 function changed(){sync();seek(Math.min(state().time,timing(settings).end),false);clearTimeout(saveTimer);saveTimer=setTimeout(save,180);}
 function set(key,value){
  const spec=controls.find(c=>c.key===key);if(!spec||!Number.isFinite(value))throw new Error('Unknown or invalid setting');
  value=Math.max(spec.min,Math.min(spec.max,value));
  if(key==='totalDuration'){const ratio=value/settings.totalDuration;for(const k of timeKeys)settings[k]*=ratio;}
  settings[key]=value;
  if(key==='finalHold')settings.totalDuration=timing(settings).contentEnd+value;
  normalize(settings);comparison=null;$('compare').textContent='Compare A';$('preset').value='custom';changed();
 }
 function apply(values){Object.assign(settings,normalize(sanitize(values)));comparison=null;$('compare').textContent='Compare A';changed();}
 for(const [name,rows] of groups){
  const section=document.createElement('details');section.open=name==='Global timing';
  const summary=document.createElement('summary');summary.textContent=name;section.append(summary);
  for(const c of rows){
   const row=document.createElement('div');row.className='control';
   const label=document.createElement('label');label.htmlFor=`number-${c.key}`;label.textContent=c.label;
   const number=document.createElement('input');Object.assign(number,{id:`number-${c.key}`,type:'number',min:c.min,max:c.max,step:c.step,value:settings[c.key]});number.setAttribute('aria-label',c.label);
   const range=document.createElement('input');Object.assign(range,{id:`tune-${c.key}`,type:'range',min:c.min,max:c.max,step:c.step,value:settings[c.key]});range.setAttribute('aria-label',c.label+' slider');
   range.addEventListener('input',()=>set(c.key,Number(range.value)));
   number.addEventListener('change',()=>{if(number.value!==''&&Number.isFinite(number.valueAsNumber))set(c.key,number.valueAsNumber);else sync();});
   row.append(label,number,range);section.append(row);fields.set(c.key,[range,number]);
  }
  $('sliders').append(section);
 }
 for(const name of Object.keys(presets)){const option=new Option(name,name);$('preset').add(option);}
 $('preset').value=controls.every(c=>settings[c.key]===defaults[c.key])?'Current':'custom';
 $('preset').onchange=()=>{const p=presets[$('preset').value];if(p)apply({...defaults,...p});};
 $('reset').onclick=()=>{apply(defaults);$('preset').value='Current';status('Current baseline restored and saved.');save();};
 $('store-a').onclick=()=>{snapshot={...settings};comparison=null;$('compare').disabled=false;$('compare').textContent='Compare A';status('A stored. Tune or choose a preset, then compare at this frame.');};
 $('compare').onclick=()=>{
  if(!snapshot)return;
  if(comparison){const b=comparison;apply(b);comparison=null;$('compare').textContent='Compare A';}
  else {const b={...settings};apply(snapshot);comparison=b;$('compare').textContent='Return to B';}
  $('preset').value='custom';
 };
 $('copy').onclick=async()=>{
  $('settings-json').value=json();$('export-area').hidden=false;
  try{await navigator.clipboard.writeText(json());$('copy').textContent='Copied ✓';setTimeout(()=>{$('copy').textContent='Copy Settings';},1800);status('Settings JSON copied. Paste it into this conversation.');}
  catch{$('settings-json').focus();$('settings-json').select();status('Select and copy the JSON below, or use Export JSON.');}
 };
 $('export').onclick=()=>{
  const url=URL.createObjectURL(new Blob([json()],{type:'application/json'})),a=document.createElement('a');
  a.href=url;a.download='atlas-intro-settings.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status('Exported atlas-intro-settings.json.');
 };
 $('close-export').onclick=()=>{$('export-area').hidden=true;};
 function show(open){
  $('tools').hidden=!open;document.body.classList.add('presentation');
  $('tools-toggle').setAttribute('aria-expanded',String(open));
  if(open)$('hide').focus();else document.activeElement?.blur();
 }
 const toggle=()=>show($('tools').hidden);
 $('tools-toggle').onclick=toggle;$('hide').onclick=()=>show(false);
 $('replay').onclick=replay;$('pause').onclick=pause;$('settled').onclick=()=>seek(timing(settings).end);
 $('timeline').oninput=e=>seek(Number(e.target.value));
 $('jump').onchange=()=>{
  const t=timing(settings),points={empty:t.arrival*.5,arrival:(t.arrival+t.formation)*.5,formation:t.formation+settings.formationDuration*.46,emblem:t.formed,ignition:settings.glyphStart+settings.glyphDuration,wordmark:settings.wordTime+settings.wordDuration*.5,handoff:t.handoff+settings.handoffDuration*.67,start:settings.buttonStart+settings.buttonDuration*.5,settled:t.end};
  seek(points[$('jump').value]);$('jump').value='';
 };
 addEventListener('keydown',e=>{
  if(e.target.closest('input,textarea,select,[contenteditable=true]')||e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.code==='KeyE'||e.code==='KeyH'){e.preventDefault();toggle();}
  else if(e.code==='Escape'){show(false);}
  else if(e.code==='KeyR'){e.preventDefault();replay();}
  else if(e.code==='Space'&&!e.target.closest('button')){e.preventDefault();pause();}
  else if(e.code==='ArrowLeft'||e.code==='ArrowRight'){e.preventDefault();seek(state().time+(e.code==='ArrowRight'?1:-1)*(e.shiftKey?.01:.1));}
 });
 addEventListener('pagehide',()=>{if(saveTimer)save();});
 if(query.has('clean'))document.body.classList.add('presentation');
 if(query.has('edit')||query.has('debug'))show(true);
 sync();
 status(query.has('baseline')?'Current baseline loaded; saved experiments were not applied.':'Changes save locally. Copy Settings to share your values.');
 return {set,exportObject,sync};
}
