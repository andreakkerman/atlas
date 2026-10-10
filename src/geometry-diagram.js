(function(global){
  'use strict';
  const sides=['top','right','bottom','left'];
  const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function validate(frame){
    const errors=[];
    if(!['square','rectangle'].includes(frame.shape))errors.push('invalid geometry shape');
    if(!frame.sideLabels||Object.entries(frame.sideLabels).some(([side,label])=>!sides.includes(side)||typeof label!=='string'))errors.push('invalid geometry side labels');
    for(const field of ['unknownSides','highlightSides'])if(frame[field]&&(!Array.isArray(frame[field])||frame[field].some(s=>!sides.includes(s))))errors.push(`invalid geometry ${field}`);
    if(frame.grid&&['rows','columns'].some(k=>!Number.isInteger(frame.grid[k])||frame.grid[k]<1||frame.grid[k]>24))errors.push('invalid geometry grid');
    if(frame.opening&&(!sides.includes(frame.opening.side)||typeof frame.opening.label!=='string'||!frame.opening.label))errors.push('invalid geometry opening');
    if(frame.highlightRegion&&!['all',...Array.from({length:frame.grid?.rows||0},(_,i)=>`row:${i}`)].includes(frame.highlightRegion))errors.push('invalid geometry region');
    if(frame.partitions?.some(p=>!Number.isFinite(p.fraction)||p.fraction<=0||p.fraction>=1||typeof p.labelBefore!=='string'||typeof p.labelAfter!=='string'))errors.push('invalid geometry partition');
    if(frame.sidePairLabels&&Object.entries(frame.sidePairLabels).some(([key,value])=>!['horizontal','vertical'].includes(key)||typeof value!=='string'))errors.push('invalid geometry side pair');
    return errors;
  }
  function render(frame){
    // Fixed schematic bounds across stages. Labels/highlights never resize the shape.
    const x=frame.shape==='square'?170:110,y=65,w=frame.shape==='square'?180:300,h=180;
    const lines={top:[x,y,x+w,y],right:[x+w,y,x+w,y+h],bottom:[x,y+h,x+w,y+h],left:[x,y,x,y+h]};
    const labels={top:[x+w/2,y-20],right:[x+w+36,y+h/2],bottom:[x+w/2,y+h+28],left:[x-36,y+h/2]};
    const text=(value,px,py,cls='')=>`<text class="${cls}" x="${px}" y="${py}">${escape(value)}</text>`;
    const segment=(a,b,c,d,cls='')=>`<line class="${cls}" x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`;
    let body='';
    if(frame.highlightRegion){const row=frame.highlightRegion==='all'?null:Number(frame.highlightRegion.split(':')[1]);body+=`<rect class="geometryRegion" x="${x}" y="${row===null?y:y+row*h/frame.grid.rows}" width="${w}" height="${row===null?h:h/frame.grid.rows}"/>`;}
    if(frame.grid){
      for(let r=1;r<frame.grid.rows;r++)body+=segment(x,y+r*h/frame.grid.rows,x+w,y+r*h/frame.grid.rows,'geometryGrid');
      for(let c=1;c<frame.grid.columns;c++)body+=segment(x+c*w/frame.grid.columns,y,x+c*w/frame.grid.columns,y+h,'geometryGrid');
    }
    for(const side of sides){
      const [a,b,c,d]=lines[side],cls=`geometrySide ${frame.highlightSides?.includes(side)?'geometryFocus':''}`;
      if(frame.opening?.side===side){
        const point=t=>[a+(c-a)*t,b+(d-b)*t];
        body+=`<g data-geometry-opening="${side}">${segment(a,b,...point(.4),cls)}${segment(...point(.6),c,d,cls)}</g>`;
      }else body+=segment(a,b,c,d,cls);
      const value=frame.unknownSides?.includes(side)?'?':frame.sideLabels[side];
      if(value)body+=text(value,...labels[side],frame.unknownSides?.includes(side)?'geometryUnknown':'');
    }
    if(frame.opening){const side=frame.opening.side;body+=text(frame.opening.label,...labels[side],'geometryOpeningLabel');}
    for(const p of frame.partitions||[]){const split=x+w*p.fraction;body+=segment(split,y,split,y+h,'geometryPartition');body+=text(p.labelBefore,(x+split)/2,y+h/2)+text(p.labelAfter,(split+x+w)/2,y+h/2);}
    let pairs='';
    // Two parallel strokes identify a pair of sides, rather than a dimension arrow.
    if(frame.sidePairLabels?.horizontal)pairs+=`<div class="geometryPair geometryPairHorizontal"><svg viewBox="0 0 28 28" aria-hidden="true">${segment(3,8,25,8)}${segment(3,20,25,20)}</svg><span>${escape(frame.sidePairLabels.horizontal)}</span></div>`;
    if(frame.sidePairLabels?.vertical)pairs+=`<div class="geometryPair geometryPairVertical"><svg viewBox="0 0 28 28" aria-hidden="true">${segment(8,3,8,25)}${segment(20,3,20,25)}</svg><span>${escape(frame.sidePairLabels.vertical)}</span></div>`;
    const aria=[frame.shape==='square'?'Vierkant':'Rechthoek',...Object.entries(frame.sideLabels).map(([side,label])=>`${side}: ${label}`),...(frame.opening?[`opening: ${frame.opening.label}`]:[])].join(', ');
    return `<div class="geometryDiagram"><svg class="geometryShape" viewBox="0 0 520 300" role="img" aria-label="${escape(aria)}"><g>${body}</g></svg>${pairs}</div>`;
  }
  const api={validate,render};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  global.AtlasGeometryDiagram=api;
})(typeof window!=='undefined'?window:globalThis);
