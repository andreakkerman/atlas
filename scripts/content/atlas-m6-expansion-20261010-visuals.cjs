// Literal stage transcription of atlas-m6-expansion-20261010-approved.md.
// These helpers assemble data only; they never calculate/disclose a learner's answer.
const clone=v=>JSON.parse(JSON.stringify(v));
const stages=(q,m,o,e)=>Object.fromEntries(['question','minnie','moose','explanation'].map((s,i)=>[s,clone([q,m,o,e][i])]));
const calc=(...lines)=>({groups:lines.map(line=>typeof line==='string'?{lines:[line]}:line)});
const sequence=(nodes,jumps=[])=>({nodes,jumps});
const line=(min,max,markers,jumps,extra={})=>({min,max,markers:markers.map(([value,label,focus,lane])=>({value,label,...(focus?{focus:true}:{}),...(lane?{lane}:{})})),...(jumps?{jumps:jumps.map(([from,to,label])=>({from,to,label}))}:{}),...extra});
const strip=(n,selected,totalLabel='',extra={})=>({segments:Array.from({length:n},(_,i)=>({selected:i<selected})),totalLabel,...extra});
const strips=(...rows)=>({strips:rows});
const sides=['top','right','bottom','left'];
const geometry=(sideLabels,extra={})=>({shape:'rectangle',sideLabels,...extra});
const records={};
const put=(id,...frames)=>records[`M6-${id}`]=stages(...frames);
const square=geometry({top:'6 m'},{shape:'square'});
put('ME-008',square,{...square,highlightSides:sides},{...square,sideLabels:Object.fromEntries(sides.map(s=>[s,'6 m']))},{...square,sideLabels:Object.fromEntries(sides.map(s=>[s,'6 m'])),notes:['4 × 6 = 24 m']});
const tiles=geometry({},{grid:{rows:4,columns:5}});
put('ME-009',tiles,{...tiles,highlightRegion:'row:0'},{...tiles,notes:['4 rijen × 5']},{...tiles,highlightRegion:'all',notes:['4 × 5 = 20']});
const garden=geometry({top:'12 m',right:'7 m'});
put('ME-010',garden,garden,{...garden,sidePairLabels:{horizontal:'24 m',vertical:'14 m'}},{...garden,sidePairLabels:{horizontal:'24 m',vertical:'14 m'},notes:['38 m']});
put('ME-011',garden,{...garden,grid:{rows:7,columns:12}},{...garden,partitions:[{fraction:10/12,labelBefore:'10 m',labelAfter:'2 m'}]},{...garden,partitions:[{fraction:10/12,labelBefore:'70 m²',labelAfter:'14 m²'}],notes:['70 m² + 14 m² = 84 m²']});
const opening=geometry({top:'14 m',right:'9 m'},{opening:{side:'bottom',label:'2 m'}});
put('ME-012',opening,opening,{...opening,sidePairLabels:{horizontal:'28 m',vertical:'18 m'}},{...opening,notes:['46 − 2 = 44']});
const unknown=geometry({top:'16 m',bottom:'16 m'},{unknownSides:['left','right']});
put('ME-013',unknown,unknown,{...unknown,sidePairLabels:{vertical:'50 − 32 = 18'}},geometry({top:'16 m',bottom:'16 m',left:'9 m',right:'9 m'}));

const dp8=(answer='?')=>line(2450,2850,[[2450,'2.450'],[2550,'2.550'],[2650,'2.650'],[2750,answer],[2850,'2.850']],[[2450,2550,'+100'],[2550,2650,'+100'],[2650,2750,'+100'],[2750,2850,'+100']]);
put('DP-008',dp8(),dp8(),dp8(),dp8('2.750'));
const dp10=(answer='?')=>line(100,240,[[100,'100'],[120,'120'],[160,'160'],[180,'180'],[220,'220'],[240,answer]],[[100,120,'+20'],[120,160,'+40'],[160,180,'+20'],[180,220,'+40']]);
put('DP-010',dp10(),dp10(),dp10(),dp10('240'));
const dp12=(answer='?')=>calc(sequence(['5','10','13','26','29','58',answer],['×2','+3','×2','+3','×2','+3']));
put('DP-012',dp12(),dp12(),dp12(),dp12('61'));

const groups25=()=>Array.from({length:6},()=>({lines:['25']}));
put('MD-011',{groups:groups25()},{groups:[{label:'100',nodes:['25','25','25','25'],jumps:[]},...groups25().slice(4)]},{groups:[{label:'100',nodes:['25','25','25','25'],jumps:[]},{label:'50',nodes:['25','25'],jumps:[]}],notes:['100 + 50 = ?']},calc('100 + 50 = 150'));
put('MD-012',calc(sequence(['240 totaal','6 gelijke bakjes','? per bakje'])),calc('240 = 24 tientallen'),calc('24 tientallen : 6 = 4 tientallen'),calc('4 tientallen = 40'));
put('MD-013',calc('7 × 46 = ?'),calc('46 = 40 + 6'),calc('7 × 40 = 280','7 × 6 = ?','280 + ?'),calc('7 × 40 = 280','7 × 6 = 42','280 + 42 = 322'));
put('MD-014',calc('252 : 6 = ?'),calc('252 = 240 + 12'),calc('240 : 6 = 40','12 : 6 = ?'),calc('240 : 6 = 40','12 : 6 = 2','40 + 2 = 42'));
put('MD-015',calc(sequence(['6 × 24','?'],['−38'])),calc('**6 × 24 = ?**'),calc('6 × 24 = 144','144 − 30 = 114','114 − 8 = ?'),calc('6 × 24 = 144','144 − 30 = 114','114 − 8 = 106'));
put('MD-016',{groups:[],boxes:{labels:Array(8).fill(''),removed:[5,6,7],label:'56 samen'}},calc('56 : 8 = ? per bak'),calc('56 : 8 = 7','8 − 3 = 5','5 × 7 = ?'),calc('5 × 7 = 35'));
const ns10=line(7650,8650,[[7650,'7.650'],[8650,'?']],[[7650,8650,'+1.000']]);
put('NS-010',ns10,{...ns10,notes:['**+1.000**']},{...ns10,notes:['7.000 + 1.000 = 8.000','+650']},line(7650,8650,[[7650,'7.650'],[8650,'8.650']],[[7650,8650,'+1.000']]));
put('NS-012',calc('3**6**.482 → 3**9**.482'),calc('3**6**.482 → 3**9**.482','6 → 9 duizendtallen'),calc('9 − 6 = 3 duizendtallen','3 × 1.000 = ?'),calc('3 × 1.000 = 3.000'));
const ns14=line(7000,9000,[[7000,'7.000'],[8000,'8.000'],[9000,'9.000']]);
const bounds=line(7000,9000,[[7000,'7.000'],[7500,'7.500'],[8000,'8.000'],[8500,'8.500'],[9000,'9.000']]);
put('NS-014',ns14,bounds,{...bounds,markers:bounds.markers.map(m=>({...m,focus:[7500,8500].includes(m.value)}))},{...bounds,ranges:[{from:7500,to:8499}],notes:['7.500 t/m 8.499']});

put('FR-011',strip(2,1,'1/2'),strip(4,2,'',{boundaries:[2]}),strip(4,2,'',{boundaries:[2]}),strip(4,2,'1/2 = 2/4'));
const eighths=strips(strip(8,3,'3/8'),strip(8,5,'5/8'));
put('FR-012',eighths,{...eighths,strips:eighths.strips.map(s=>({...s,focus:[0]}))},{...eighths,strips:eighths.strips.map(s=>({...s,focus:[0]}))},{...eighths,notes:['5/8 is het grootst']});
put('FR-013',calc('2 rood → 3 blauw','4 rood → ? blauw'),calc('2 rood → 4 rood','×2'),calc('3 × 2 = ?'),calc('4 rood → 6 blauw'));
const quarters=line(0,1,[[0,'0'],[.25,''],[.5,''],[.75,''],[1,'1']]);
const intervals=Array.from({length:4},(_,i)=>({from:i/4,to:(i+1)/4}));
put('FR-014',quarters,{...quarters,ranges:intervals},{...quarters,ranges:intervals,notes:['3 stappen vanaf 0']},line(0,1,[[0,'0'],[.25,''],[.5,''],[.75,'3/4',true],[1,'1']]));
const fifths=strips(strip(5,3),strip(10,0));
put('FR-015',fifths,{...fifths,notes:['5 → 10','×2']},{...fifths,notes:['3 × 2 = ?']},{strips:[strip(5,3),strip(10,6)],notes:['3/5 = 6/10']});
const compare=strips(strip(4,3,'3/4'),strip(8,5,'5/8'));
const compare8=strips(strip(8,6,'',{boundaries:[2,4,6]}),strip(8,5,'5/8'));
put('FR-016',compare,compare8,{...compare8,notes:['3/4 = 6/8']},{...compare8,notes:['6/8 > 5/8']});
put('FR-017',calc('3 groen → 2 blauw','9 groen → ? blauw'),calc('3 groen → 9 groen','×3'),calc('2 × 3 = ?'),calc('9 groen → 6 blauw'));
const cards=strip(6,5,'42 kaarten samen');
put('FR-018',cards,{...cards,focus:[0],notes:['42 : 6 = ?']},{...cards,segments:cards.segments.map((s,i)=>({...s,...(i===0?{label:'7'}:{})})),notes:['5 × 7 = ?']},{...cards,groups:[{from:0,count:5,label:'35'}]});
const compare3=strips(strip(3,2,'2/3'),strip(4,3,'3/4'),strip(6,3,'3/6'));
put('FR-019',compare3,{...compare3,notes:['3/6 = 1/2']},{strips:[strip(3,2,'2/3',{focus:[2],groups:[{from:2,count:1,label:'1/3'}]}),strip(4,3,'3/4',{focus:[3],groups:[{from:3,count:1,label:'1/4'}]}),strip(6,3,'3/6')]},{...compare3,notes:['3/4 is het grootst']});
const known=strip(8,3,'?',{groups:[{from:0,count:3,label:'24'}]});
put('FR-020',known,{...known,focus:[0,1,2]},{...known,segments:known.segments.map((s,i)=>({...s,...(i===0?{label:'8'}:{})}))},{...known,segments:known.segments.map(s=>({...s,label:'8'})),totalLabel:'64'});
put('FR-021',calc('6 dozen → 270','10 dozen → ?'),calc('6 dozen → 270','1 doos → ?','10 dozen → ?'),calc('270 : 6 = 45','10 × 45 = ?'),calc('10 × 45 = 450'));
const fifty=strip(5,3,'50 onderdelen');
put('FR-022',fifty,{...fifty,focus:[0,1,2]},strips(strip(5,3,'50 onderdelen',{groups:[{from:0,count:3,label:'30 gebruikt'},{from:3,count:2,label:'20 over'}]}),strip(2,0,'20 over')),{strips:[fifty,strip(2,1,'20',{groups:[{from:0,count:1,label:'opnieuw gebruikt'},{from:1,count:1,label:'10 over'}]})]});

put('MO-009',calc('€3,75 → ? cent'),calc('€1 = 100 cent'),calc('€3 = 300 cent','300 + 75 = ?'),calc('300 + 75 = 375 cent'));
put('MO-010',calc('460 cent → € ?'),calc(...Array(4).fill('100 cent')),calc('400 cent = €4,00','60 cent over'),calc('€4,00 + €0,60 = €4,60'));
const prices={items:[{label:'Rugzak',amount:'€12,80'},{label:'Rugzak',amount:'€9,45'}]};
put('MO-011',prices,{...prices,groups:[sequence(['€9,45','€12,80'])]},{...prices,groups:[sequence(['€9,45','€10,00','€12,80'],['+€0,55','+€2,80'])]},{...prices,notes:['€3,35 verschil']});
put('MO-012',calc(...Array(4).fill('€2,75')),calc('€2,75 = €2,00 + €0,75'),calc('€8,00','€3,00'),calc('€8,00 + €3,00 = €11,00'));
put('MO-013',calc('€25,00',...Array(3).fill('€6,75')),calc('3 × €6,75 = ?'),calc('€20,25','€25,00 − €20,25 = ?'),calc('€4,75 over'));
const offers=calc({label:'A',lines:['3 voor €8,40','extra €3,10']},{label:'B',lines:['€2,95 per schrift']});
put('MO-014',offers,{...offers,notes:['A = ?','B = ?']},calc('A = €11,50','B = 4 × €2,95 = ?'),calc('B = €11,80','€11,80 − €11,50 = €0,30'));

const bars=(...labels)=>({groups:[],bars:labels.map(label=>({label}))});
put('TI-019',calc('1 uur 20 min → ? min'),calc('1 uur = 60 min'),calc('60 + 20 = ?'),calc('80 min'));
put('TI-020',bars('95 min'),{...bars('95 min'),bars:[{label:'95 min',parts:[{label:'60 min = 1 uur',weight:60},{label:'',weight:35}]}]},{...bars('95 min'),bars:[{label:'95 min',parts:[{label:'60 min = 1 uur',weight:60},{label:'35 min',weight:35}]}]},calc('1 uur 35 min'));
put('TI-021',bars('1 u 10 min','75 min'),{...bars('1 u 10 min','75 min'),notes:['zelfde eenheid']},bars('70 min','75 min'),calc('5 min'));
put('TI-022',bars('2 u 15 min','50 min'),calc('15 + 50'),calc('65 min = 1 u 5 min'),calc('3 u 5 min'));
put('TI-023',bars('3 u 10 min','1 u 45 min'),calc('3 u 10 min → ? min','1 u 45 min → ? min'),calc('190 min','105 min','190 − 105 = ?'),calc('85 min = 1 u 25 min'));
const timeline={direction:'forward',nodes:['13:25','15:00'],jumps:[],bars:[{label:'',parts:[{label:'35 min',weight:35},{label:'40 min',weight:40}]}]};
put('TI-024',timeline,{...timeline,nodes:['13:25','14:00','15:00']},{...timeline,nodes:['13:25','14:00','15:00'],notes:['95 min beschikbaar','75 min opdrachten']},{...timeline,bars:[{label:'',parts:[{label:'35 min',weight:35},{label:'40 min',weight:40},{label:'20 min pauze',weight:20}]}]});

put('AS-009',calc('5.000 − 350 = ?'),calc('350 = 300 + 50'),calc('5.000 − 300 = 4.700','4.700 − 50 = ?'),calc('4.650'));
const gap=(start,middle,end,a,b,total)=>stages(line(start,end,[[start,start.toLocaleString('nl-NL')],[end,end.toLocaleString('nl-NL')]]),line(start,end,[[start,start.toLocaleString('nl-NL')],[middle,middle.toLocaleString('nl-NL'),false,2],[end,end.toLocaleString('nl-NL')]],[]),line(start,end,[[start,start.toLocaleString('nl-NL')],[middle,middle.toLocaleString('nl-NL'),false,2],[end,end.toLocaleString('nl-NL')]],[[start,middle,a],[middle,end,b]]),line(start,end,[[start,start.toLocaleString('nl-NL')],[end,end.toLocaleString('nl-NL')]],[[start,end,total]]));
records['M6-AS-010']=gap(4680,4700,5000,'+20','+300','+320');
put('AS-011',calc('12.500 − 2.300 = ?'),calc('2.300 = 2.000 + 300'),calc('10.500','10.500 − 300 = ?'),calc('10.200'));
put('AS-012',calc('5.203 − 487'),calc('487 = 400 + 80 + 7'),calc('5.203 − 400 = 4.803','4.803 − 80 = 4.723','4.723 − 7 = ?'),calc('5.203 − 400 = 4.803','4.803 − 80 = 4.723','4.723 − 7 = 4.716'));
records['M6-AS-013']=gap(2875,3000,4000,'+125','+1.000','+1.125');
put('AS-014',calc(sequence(['3.250','?','?'],['+875','−640'])),{...calc(sequence(['3.250','?','?'],['+875','−640'])),notes:['**+875**']},calc('3.250 + 875 = 4.125','4.125 − 600 = 3.525','3.525 − 40 = ?'),calc('3.250 + 875 = 4.125','4.125 − 600 = 3.525','3.525 − 40 = 3.485'));
const dl={source:{value:3,unit:'dl'},targetUnit:'cl'};
put('ME-014',dl,{...dl,notes:['1 dl = 10 cl']},{...dl,notes:['3 × 10 = ?']},{...dl,targetLabel:'30'});
const kg={sources:[{value:2,unit:'kg'},{value:500,unit:'g'}],targetUnit:'g'};
put('ME-015',kg,{...kg,notes:['1 kg = 1.000 g']},{...kg,notes:['2.000 g + 500 g = ?']},{...kg,targetLabel:'2.500'});
const bottles={sources:[{value:750,unit:'ml'},{value:750,unit:'ml'},{value:500,unit:'ml'}],targetUnit:'l',pieces:['750 ml','750 ml','500 ml'],hideConversion:true};
put('ME-016',bottles,{...bottles,notes:['totaal in ml → daarna liter']},{source:{value:2000,unit:'ml'},targetUnit:'l'},{source:{value:2000,unit:'ml'},targetUnit:'l',targetLabel:'2'});

module.exports=q=>{
  if(q.visualType==='none')return stages({},{},{},{});
  if(q.visualType==='compactDataTable'){
    const t=q.table;
    if(!t)throw Error(`${q.id}: missing approved table`);
    switch(q.id){
      case 'M6-DP-007':return stages(t,t,t,{...t,highlightRows:[2]});
      case 'M6-DP-009':return stages(t,{...t,highlightRows:[0,1]},{...t,notes:['125 + 100 = 225','225 + 48 = ?']},{...t,notes:['125 + 148 = 273']});
      case 'M6-DP-011':return stages(t,t,{...t,notes:['Dag A: 273','Dag B: 288']},{...t,notes:['288 − 273 = 15']});
      case 'M6-DP-013':return stages(t,{...t,highlightCells:t.rows.map((_,i)=>[i,1])},{...t,highlightCells:[[1,1],[3,1]]},{...t,highlightRows:[3]});
      case 'M6-DP-014':{
        const base={...t,notes:['Totaal = 500']};
        return stages(base,{...base,highlightRows:[0,1,3]},{...base,notes:['bekend samen = 380','500 − 380 = ?']},{...base,rows:t.rows.map((row,i)=>i===2?[row[0],'120']:row)});
      }
      case 'M6-DP-015':return stages({...t,notes:['bonus bij +20']},{...t,columns:[...t.columns,'Dagtotaal'],rows:t.rows.map(row=>[...row,'?'])},{...t,columns:[...t.columns,'Dagtotaal'],rows:t.rows.map((row,i)=>[...row,i===0?'275':'288']),notes:['verschil = 13']},{...t,notes:['20 − 13 = 7 tekort']});
      default:throw Error(`Untranscribed table ${q.id}`);
    }
  }
  if(!records[q.id])throw Error(`Untranscribed visual ${q.id}`);
  return clone(records[q.id]);
};
