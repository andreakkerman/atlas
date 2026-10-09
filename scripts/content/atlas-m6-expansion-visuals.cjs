// Authored visual transcription. Helpers serialize geometry only; every displayed
// value and intermediate step below is fixed approved content, never inferred.
const V={};
const stageNames=['question','minnie','moose','explanation'];
const put=(id,type,frames)=>V[`M6-${id}`]={type,stages:Object.fromEntries(stageNames.map((s,i)=>[s,frames[i]]))};
const groups=lines=>({groups:lines.length?[{lines}]:[]});
const calc=(id,...frames)=>put(id,'calculationSteps',frames.map(f=>Array.isArray(f)?groups(f):f));
const line=(min,max,markers,jumps=[],notes=[])=>({min,max,markers:markers.map(([value,label,focus=false,lane=0])=>({value,label,focus,lane})),jumps:jumps.map(([from,to,label])=>({from,to,label})),notes});
const fraction=(totalLabel,labels,selected=[],extra={})=>({totalLabel,segments:labels.map((label,i)=>({label,selected:selected.includes(i)})),...extra});
const frac=(numerator,denominator)=>({numerator,denominator});
const timeline=(nodes,jumps=[],extra={})=>({direction:'forward',nodes,jumps,...extra});
const notes=(frame,...notes)=>({...frame,notes});
for(const id of ['NS-001','NS-002','NS-003'])put(id,'none',[{},{},{},{}]);
put('NS-004','numberLine',[
 line(7420,7460,[[7420,'7.420'],[7430,'7.430'],[7440,'?'],[7450,'7.450'],[7460,'7.460']]),
 line(7420,7460,[[7420,'7.420',true],[7430,'7.430',true],[7440,'?'],[7450,'7.450'],[7460,'7.460']],[[7420,7430,'']]),
 line(7420,7460,[[7420,'7.420'],[7430,'7.430'],[7440,'?'],[7450,'7.450'],[7460,'7.460']],[[7420,7430,'+10'],[7430,7440,'+10']]),
 line(7420,7460,[[7420,'7.420'],[7430,'7.430'],[7440,'7.440',true],[7450,'7.450'],[7460,'7.460']],[[7420,7430,'+10'],[7430,7440,'+10'],[7440,7450,'+10'],[7450,7460,'+10']])]);
put('NS-005','numberLine',[
 line(6400,6500,[[6400,'6.400'],[6451,'6.451',true],[6500,'6.500']]),
 line(6400,6500,[[6400,'6.400'],[6450,'6.450',false,1],[6451,'6.451',true],[6500,'6.500']]),
 line(6400,6500,[[6400,'6.400'],[6450,'6.450',false,1],[6451,'6.451',true],[6500,'6.500']],[],['6.451 = 6.450 + 1']),
 line(6400,6500,[[6400,'6.400'],[6450,'6.450',false,1],[6451,'6.451'],[6500,'6.500',true]])]);
put('NS-006','numberLine',[
 line(8000,9000,[[8000,'8.000'],[8620,'8.620'],[9000,'9.000']]),
 line(8000,9000,[[8000,'8.000'],[8500,'8.500',false,1],[8620,'8.620'],[9000,'9.000']]),
 line(8000,9000,[[8000,'8.000'],[8500,'8.500',false,1],[8620,'8.620',true],[9000,'9.000']],[[8000,8620,''],[8620,9000,'']]),
 line(8000,9000,[[8000,'8.000'],[8500,'8.500',false,1],[8620,'8.620'],[9000,'9.000',true]])]);
const near=[[9590,'9.590'],[9760,'9.760',false,1],[10000,'10.000',true],[10140,'10.140',false,1],[10420,'10.420']];
put('NS-007','numberLine',[line(9590,10420,near),line(9590,10420,near,[[9590,10000,''],[9760,10000,''],[10000,10140,''],[10000,10420,'']]),line(9590,10420,near,[],['10.140 → 140 boven 10.000','9.760 → 240 onder 10.000']),line(9590,10420,near,[],['9.760 → 240','10.140 → 140','9.590 → 410','10.420 → 420'])]);
calc('NS-008',['5 duizendtallen','2 honderdtallen','7 tientallen','4 eenheden'],['5 — duizendtallen','2 — honderdtallen','7 — tientallen','4 — eenheden'],['5.000 + 200 + 70 + 4 = ?'],['5.000 + 200 + 70 + 4 = 5.274']);
calc('AS-001',[],['260 = 200 + 60'],['430 + 200 = 630','630 + 60 = ?'],['430 + 200 = 630','630 + 60 = 690']);
put('AS-002','numberLine',[line(1633,1642,[[1633,'1.633'],[1642,'1.642']]),line(1633,1642,[[1633,'1.633'],[1640,'1.640'],[1642,'1.642']]),line(1633,1642,[[1633,'1.633'],[1640,'1.640'],[1642,'1.642']],[[1633,1640,'+7'],[1640,1642,'+2']]),line(1633,1642,[[1633,'1.633'],[1640,'1.640'],[1642,'1.642']],[[1633,1640,'+7'],[1640,1642,'+2']],['7 + 2 = 9'])]);
put('AS-003','numberLine',[line(3760,4000,[[3760,'3.760'],[4000,'4.000']]),line(3760,4000,[[3760,'3.760'],[3800,'3.800',false,1],[4000,'4.000']]),line(3760,4000,[[3760,'3.760'],[3800,'3.800',false,1],[4000,'4.000']],[[3760,3800,'+40'],[3800,4000,'+200']]),line(3760,4000,[[3760,'3.760'],[3800,'3.800',false,1],[4000,'4.000']],[[3760,3800,'+40'],[3800,4000,'+200']],['40 + 200 = 240'])]);
calc('AS-004',['728','742'],['742 = 700 + 40 + 2'],['728 + 700 = 1.428','1.428 + 40 = ?','+2'],['728 + 700 = 1.428','1.428 + 40 = 1.468','1.468 + 2 = 1.470']);
calc('AS-005',[],['257 = 200 + 50 + 7'],['468 + 200 = 668','668 + 50 = 718','718 + 7 = ?'],['468 + 200 = 668','668 + 50 = 718','718 + 2 = 720','720 + 5 = 725']);
calc('AS-006',[],['178 = 100 + 70 + 8'],['624 − 100 = 524','524 − 70 = 454','454 − 8 = ?'],['624 − 100 = 524','524 − 70 = 454','454 − 4 = 450','450 − 4 = 446']);
calc('AS-007',[],['475 = 400 + 70 + 5'],['1.836 + 400 = 2.236','2.236 + 70 = 2.306','2.306 + 5 = ?'],['1.836 + 400 = 2.236','2.236 + 70 = 2.306','2.306 + 5 = 2.311']);
calc('AS-008',[],['1.487 = 1.000 + 400 + 80 + 7'],['3.203 − 1.000 = 2.203','2.203 − 400 = 1.803','1.803 − 80 = 1.723','1.723 − 7 = ?'],['3.203 − 1.000 = 2.203','2.203 − 400 = 1.803','1.803 − 80 = 1.723','1.723 − 3 = 1.720','1.720 − 4 = 1.716']);
calc('MD-001',[],['24 = 20 + 4'],['6 × 20 = 120','6 × 4 = ?'],['6 × 20 = 120','6 × 4 = 24','120 + 24 = 144']);
// The three missing stage descriptions were supplied in the approved addendum.
calc('MD-002',['160 totaal','16 per groep','? groepen'],['160 totaal','16 per groep','? groepen','160 → groepjes van 16 → ? groepen'],['16 × ? = 160'],['16 × 10 = 160','160 : 16 = 10','10 groepen']);
calc('MD-003',['20 × 18 = ?'],['20 = 10 + 10','10 × 18','10 × 18'],['10 × 18 = 180','20 × 18 = 180 + 180','180 + 180 = ?'],['10 × 18 = 180','180 + 180 = 360','20 × 18 = 360']);
calc('MD-004',['84 totaal','7 gelijke groepen','? per groep'],['84 totaal','7 gelijke groepen','? per groep','84 : 7 = ?'],['7 × ? = 84','7 × 10 = 70','84 − 70 = ?'],['7 × 10 = 70','84 − 70 = 14','7 × 2 = 14','10 + 2 = 12','84 : 7 = 12']);
calc('MD-005',[],['40 = 4 tientallen'],['7 × 4 = 28','28 tientallen = ?'],['7 × 4 = 28','28 tientallen = 280']);
calc('MD-006',[],['168 = 140 + 28'],['140 : 7 = 20','28 : 7 = ?'],['140 : 7 = 20','28 : 7 = 4','20 + 4 = 24']);
calc('MD-007',[],['38 = 30 + 8'],['8 × 30 = 240','8 × 8 = 64'],['8 × 30 = 240','8 × 8 = 64','240 + 64 = 304']);
calc('MD-008',[],['40 × ? = 400'],['4 × ? = 40'],['40 × 10 = 400','400 : 40 = 10']);
calc('MD-009',['29','6 per groep'],['6 × 4 = 24'],{groups:[{lines:['29 − 24 = 5']}],quantities:[{label:'?',count:0}]},{groups:[],quantities:[{label:'6',count:6},{label:'6',count:6},{label:'6',count:6},{label:'6',count:6},{label:'5',count:5}]});
calc('MD-010',['7 × 6 × 8'],['6 × 8'],['6 × 8 = 48','7 × 48 = ?'],['6 × 8 = 48','7 × 40 = 280','7 × 8 = 56','280 + 56 = 336']);
put('FR-001','fractionStrip',[
 fraction('',Array(8).fill(''),[0,1,2]),fraction('8 delen in totaal',Array(8).fill(''),[0,1,2],{focus:[0,1,2,3,4,5,6,7]}),fraction('8 delen in totaal',Array(8).fill(''),[0,1,2],{focus:[0,1,2],notes:['3 gekleurd']}),fraction('8 delen in totaal',Array(8).fill(''),[0,1,2],{notes:[[frac(3,8)],'teller: 3 gekleurd','noemer: 8 delen in totaal']})]);
put('FR-002','fractionStrip',[fraction('18',[''],[],{partitioned:false,notes:[[frac(1,2)]]}),fraction('18',['','']),fraction('18',['',''],[],{notes:['18 : 2 = ?']}),fraction('18',['9','9'],[0])]);
put('FR-003','fractionStrip',[fraction('28',[''],[],{partitioned:false,notes:[[frac(1,4)]]}),fraction('28',['','','','']),fraction('28',['','','',''],[],{notes:['28 : 4 = ?']}),fraction('28',['7','7','7','7'],[0])]);
calc('FR-004',['2 → 12','4 → ?'],['2 × 2 = 4'],{groups:[{nodes:['2','4'],jumps:['×2']},{nodes:['12','?'],jumps:['×2']}]},['12 × 2 = 24']);
calc('FR-005',['3 groepen → 18','1 groep → ?'],{groups:[{lines:['18']}],quantities:[{label:'?',count:0},{label:'?',count:0},{label:'?',count:0}]},['18 : 3 = ?'],{groups:[{lines:['18 : 3 = 6']}],quantities:[{label:'6',count:6},{label:'6',count:6},{label:'6',count:6}]});
put('FR-006','fractionStrip',[fraction('60',[''],[],{partitioned:false,notes:[[frac(2,3)]]}),fraction('60',['','','']),fraction('60',['20','',''],[0,1],{notes:['60 : 3 = 20']}),fraction('60',['20','20','20'],[0,1],{notes:['20 + 20 = 40']})]);
put('FR-007','fractionStrip',[fraction('',['12','',''],[0]),fraction('',['12','',''],[0],{focus:[0,1,2],notes:[[frac(1,3)]]}),fraction('',['12','12','12'],[0],{notes:['12 + 12 + 12 = ?']}),fraction('',['12','12','12'],[0],{notes:['3 × 12 = 36']})]);
calc('FR-008',['3 → 450 g','7 → ?'],['3 → 450 g','1 → ?','7 → ?'],['450 : 3 = 150 g','7 × 150 = ?'],['450 : 3 = 150 g','7 × 150 = 1.050 g']);
put('FR-009','fractionStrip',[fraction('',['','','','',''],[0,1],{joined:[0],groups:[{from:0,count:2,label:'14'}]}),fraction('',['','','','',''],[0,1],{groups:[{from:0,count:2,label:'14'}],focus:[0,1]}),fraction('',['7','','','',''],[0,1],{notes:['14 : 2 = 7']}),fraction('',['7','7','7','7','7'],[0,1],{notes:['5 × 7 = 35']})]);
calc('FR-010',['4 → 28','9 → ?'],['4 → 28','1 → ?','9 → ?'],['28 : 4 = 7','9 × 7 = ?'],['28 : 4 = 7','9 × 7 = 63']);
const count=items=>({mode:'count',items:items.map(denomination=>({denomination,count:1}))});
const countA=count([2000,500,200,50]),countB=count([1000,200,100,50,10,5]);
put('MO-001','currency',[countA,{...countA,rows:[[0,1,2],[3]]},notes({...countA,rows:[[0,1,2],[3]]},'€20 + €5 + €2 = €27'),notes(countA,'€27 + €0,50 = €27,50')]);
put('MO-002','currency',[countB,{...countB,rows:[[0,1,2],[3,4,5]]},notes({...countB,rows:[[0,1,2],[3,4,5]]},'€10 + €2 + €1 = €13','50 + 10 + 5 = 65 cent'),notes(countB,'€13,65')]);
const receipt=(amounts,paid,lines=[],change='?',highlight=[])=>({items:amounts.map(amount=>({label:'Prijs',amount})),paid,change,highlight,...groups(lines)});
put('MO-003','moneyReceipt',[receipt(['€3,20'],'€4,00'),receipt(['€3,20'],'€4,00',['€3,50']),receipt(['€3,20'],'€4,00',['€3,20 → €3,50 = €0,30','€3,50 → €4,00 = €0,50']),receipt(['€3,20'],'€4,00',['€0,30 + €0,50 = €0,80'],'€0,80')]);
const composeA={mode:'compose',targetCents:850,denominations:[500,200,100,50]},composeB={mode:'compose',targetCents:2450,denominations:[2000,1000,500,200,100,50]};
put('MO-004','currency',[{...composeA,label:'€8,50'},{...composeA,label:'€8,50',highlightDenominations:[500]},notes(composeA,'Begin bijvoorbeeld met €5. Dan moet je nog €3,50 maken.'),notes(composeA,'€5 + €2 + €1 + €0,50 = €8,50','Elke andere gekozen combinatie die precies **€8,50** vormt, is ook correct.')]);
put('MO-005','currency',[{...composeB,label:'€24,50'},{...composeB,label:'€24,50',highlightDenominations:[2000]},notes(composeB,'Begin bijvoorbeeld met €20. Dan ontbreekt nog €4,50.'),notes(composeB,'€20 + €2 + €2 + €0,50 = €24,50','Elke andere combinatie die precies **€24,50** vormt, is ook correct.')]);
put('MO-006','moneyReceipt',[receipt(['€12,40'],'€20,00'),receipt(['€12,40'],'€20,00',['€13,00']),receipt(['€12,40'],'€20,00',['€12,40 → €13,00 = €0,60','€13,00 → €20,00 = €7,00']),receipt(['€12,40'],'€20,00',['€0,60 + €7,00 = €7,60'],'€7,60')]);
put('MO-007','moneyReceipt',[receipt(['€7,35','€4,80'],'€20,00'),receipt(['€7,35','€4,80'],'€20,00',['€7,35 + €4,80 = ?'],'?',[0,1]),receipt(['€7,35','€4,80'],'€20,00',['€7,35 + €4,80 = €12,15','€12,15 → €13,00 = €0,85','€13,00 → €20,00 = €7,00']),receipt(['€7,35','€4,80'],'€20,00',['€7,35 + €4,80 = €12,15','€0,85 + €7,00 = €7,85'],'€7,85')]);
const change={mode:'change',priceCents:3675,paidCents:5000,denominations:[1000,500,200,100,50,10,5]};
put('MO-008','currency',[notes(change,'€36,75 → €50,00'),notes(change,'€36,75 → ? → €50,00'),notes(change,'€36,75 → €40,00 = €3,25','€40,00 → €50,00 = €10,00'),notes(change,'€3,25 + €10,00 = €13,25','€10 + €2 + €1 + €0,10 + €0,10 + €0,05 = €13,25')]);
const clock=(hour,minute,extra={})=>({hour,minute,...extra});
put('TI-001','analogueClock',[clock(8,15),clock(8,15,{highlightHand:'minute',highlightNumerals:[3]}),notes(clock(8,15),'15 minuten na 8 uur'),notes(clock(8,15),'08:15 = kwart over acht')]);
put('TI-002','analogueClock',[clock(16,30),clock(16,30,{highlightHand:'minute',highlightNumerals:[6]}),clock(16,30,{highlightHand:'hour',highlightNumerals:[4,5]}),notes(clock(16,30),'16:30 = half vijf')]);
put('TI-003','analogueClock',[clock(10,25),clock(10,25,{highlightHand:'minute',highlightNumerals:[5]}),notes(clock(10,25,{referenceMinute:30}),'nog 5 minuten tot half elf'),notes(clock(10,25),'10:25 = vijf voor half elf')]);
put('TI-004','analogueClock',[clock(13,40),clock(13,40,{referenceMinute:30,referenceLabel:'13:30'}),notes(clock(13,40,{referenceMinute:30}),'13:30 → 13:40 = 10 minuten'),notes(clock(13,40),'13:30 = half twee','13:40 = tien over half twee')]);
put('TI-005','digitalClock',[clock(14,15),clock(14,15,{highlightMinutes:true}),notes(clock(14,15),'15 minuten na 14:00',"14:00 = twee uur 's middags"),notes(clock(14,15),'14:15 = kwart over twee')]);
put('TI-006','digitalClock',[clock(9,30),clock(9,30,{highlightMinutes:true}),notes(clock(9,30),'30 minuten na 9 uur','09:30 → 10:00'),notes(clock(9,30),'09:30 = half tien')]);
put('TI-007','digitalClock',[clock(22,25),clock(22,25,{highlightMinutes:true}),notes(clock(22,25),'22:25 → 22:30 = 5 minuten','22:30 = half elf'),notes(clock(22,25),'22:25 = vijf voor half elf')]);
put('TI-008','digitalClock',[clock(17,40),notes(clock(17,40),'17:30'),notes(clock(17,40),'17:30 → 17:40 = 10 minuten','17:30 = half zes'),notes(clock(17,40),'17:40 = tien over half zes')]);
put('TI-009','timeLine',[timeline(['10:10','10:35']),timeline(['10:10','10:30','10:35']),timeline(['10:10','10:30','10:35'],['20 min','5 min']),notes(timeline(['10:10','10:30','10:35'],['20 min','5 min']),'20 + 5 = 25 minuten')]);
put('TI-010','timeLine',[timeline(['09:20','09:50']),timeline(['09:20','09:50'],[],{focusNodes:[0,1]}),notes(timeline(['09:20','09:50']),'50 − 20 = ?'),notes(timeline(['09:20','09:50']),'50 − 20 = 30 minuten')]);
put('TI-011','timeLine',[timeline(['14:31','15:20']),timeline(['14:31','15:00','15:20']),timeline(['14:31','15:00','15:20'],['29 min','20 min']),notes(timeline(['14:31','15:00','15:20'],['29 min','20 min']),'29 + 20 = 49 minuten')]);
put('TI-012','timeLine',[timeline(['15:42','16:39']),timeline(['15:42','16:00','16:39']),timeline(['15:42','16:00','16:39'],['18 min','39 min']),notes(timeline(['15:42','16:00','16:39'],['18 min','39 min']),'18 + 39 = 57 minuten')]);
put('TI-013','timeLine',[timeline(['13:20','?'],['+30 minuten'],{digital:true}),timeline(['13:20','13:30','?'],['+10 min','+20 min']),timeline(['13:20','13:40','?'],['+20 min','+10 min']),timeline(['13:20','13:40','13:50'],['+20 min','+10 min'],{digital:true})]);
put('TI-014','timeLine',[timeline(['13:50','?'],['+1 uur 25 minuten'],{digital:true}),timeline(['13:50','?','?'],['+1 uur','+25 minuten']),timeline(['13:50','14:50','?'],['+1 uur','+25 min']),timeline(['13:50','14:50','15:00','15:15'],['+1 uur','+10 min','+15 min'],{digital:true})]);
put('TI-015','timeLine',[timeline(['15:10','?'],['−35 minuten'],{direction:'backward',digital:true}),timeline(['15:10','15:00','?'],[],{direction:'backward'}),timeline(['15:10','15:00','?'],['−10 min','−25 min'],{direction:'backward'}),timeline(['15:10','15:00','14:35'],['−10 min','−25 min'],{direction:'backward',digital:true})]);
put('TI-016','timeLine',[timeline(['16:20','?'],['−1 uur 35 minuten'],{direction:'backward',digital:true}),timeline(['16:20','?','?'],['−1 uur','−35 minuten'],{direction:'backward'}),timeline(['16:20','15:20','?'],['−1 uur','−35 min'],{direction:'backward'}),timeline(['16:20','15:20','15:00','14:45'],['−1 uur','−20 min','−15 min'],{direction:'backward',digital:true})]);
put('TI-017','timeLine',[timeline(['13:42','14:05']),timeline(['13:42','14:00','14:05']),timeline(['13:42','14:00','14:05'],['18 min','5 min']),notes(timeline(['13:42','14:00','14:05'],['18 min','5 min']),'18 + 5 = 23 minuten')]);
put('TI-018','timeLine',[timeline(['10:35','?','?','?'],['45 min','20 min pauze','55 min']),timeline(['10:35','11:20','?','?'],['45 min','20 min pauze','55 min']),timeline(['10:35','11:20','11:40','?'],['45 min','20 min pauze','55 min']),timeline(['10:35','11:20','11:40','12:35'],['45 min','20 min pauze','55 min'])]);
const measure=(value,unit,targetUnit,extra={})=>({source:{value,unit},targetUnit,...extra});
put('ME-001','measurement',[measure(300,'cm','m'),notes(measure(300,'cm','m'),'100 cm = 1 m'),measure(300,'cm','m',{pieces:['100 cm','100 cm','100 cm']}),notes(measure(300,'cm','m',{targetLabel:'3'}),'300 : 100 = 3 m')]);
put('ME-002','measurement',[measure(18,'m','dm'),notes(measure(18,'m','dm'),'1 m = 10 dm'),notes(measure(18,'m','dm'),'18 × 10 = ?'),notes(measure(18,'m','dm',{targetLabel:'180'}),'18 × 10 = 180 dm')]);
put('ME-003','measurement',[measure(1,'m','mm'),notes(measure(1,'m','mm'),'1 m = 100 cm'),notes(measure(1,'m','mm'),'1 m = 100 cm','1 cm = 10 mm','100 × 10 = ?'),notes(measure(1,'m','mm',{targetLabel:'1.000'}),'1 m = 100 cm = 1.000 mm')]);
const weights={sources:[{value:500,unit:'g'},{value:500,unit:'g'}],targetUnit:'kg'};
put('ME-004','measurement',[{...weights,pieces:['500 g','500 g']},notes(weights,'500 g + 500 g = ? g'),notes(weights,'500 + 500 = 1.000 g','1.000 g = ? kg'),notes({...weights,targetLabel:'1'},'1.000 g = 1 kg')]);
const mixed={sources:[{value:2,unit:'m'},{value:35,unit:'cm'}],targetUnit:'cm'};
put('ME-005','measurement',[mixed,notes(mixed,'2 m = 200 cm'),notes(mixed,'200 cm + 35 cm = ?'),{...mixed,targetLabel:'235'}]);
put('ME-006','measurement',[measure(250,'g','g',{multiplier:6}),notes(measure(250,'g','g',{multiplier:6}),'250 = 200 + 50'),notes(measure(250,'g','g',{multiplier:6}),'6 × 200 = 1.200','6 × 50 = 300'),notes(measure(250,'g','g',{multiplier:6,targetLabel:'1.500'}),'1.200 + 300 = 1.500 g')]);
const lengths={sourceGroups:[[{value:2,unit:'m'},{value:35,unit:'cm'}],[{value:1,unit:'m'},{value:80,unit:'cm'}]],targetUnit:'cm'};
put('ME-007','measurement',[lengths,notes(lengths,'2 m 35 cm = 235 cm'),notes(lengths,'2 m 35 cm = 235 cm','1 m 80 cm = 180 cm','235 + 180 = ?'),notes({...lengths,targetLabel:'415'},'235 + 180 = 415 cm')]);
const seqA=[[2360,'2.360'],[2370,'2.370'],[2380,'2.380'],[2390,'?'],[2400,'2.400']],seqB=[[1125,'1.125'],[1150,'1.150'],[1175,'1.175'],[1200,'?'],[1225,'1.225']];
put('DP-001','numberLine',[line(2360,2400,seqA),line(2360,2400,seqA,[[2360,2370,'']]),line(2360,2400,seqA,[[2360,2370,'+10'],[2370,2380,'+10'],[2380,2390,'+10']]),line(2360,2400,[[2360,'2.360'],[2370,'2.370'],[2380,'2.380'],[2390,'2.390',true],[2400,'2.400']],[[2360,2370,'+10'],[2370,2380,'+10'],[2380,2390,'+10'],[2390,2400,'+10']])]);
put('DP-002','numberLine',[line(1125,1225,seqB),line(1125,1225,seqB,[[1125,1150,'']]),line(1125,1225,seqB,[[1125,1150,'+25'],[1150,1175,'+25']]),line(1125,1225,[[1125,'1.125'],[1150,'1.150'],[1175,'1.175'],[1200,'1.200',true],[1225,'1.225']],[[1125,1150,'+25'],[1150,1175,'+25'],[1175,1200,'+25'],[1200,1225,'+25']])]);
const tableA={columns:['Dag','Aantal'],rows:[['Maandag','18'],['Dinsdag','24'],['Woensdag','21'],['Donderdag','27']]},tableB={columns:['Route','Afstand'],rows:[['A','138'],['B','156'],['C','149'],['D','132']]},tableC={columns:['Dozen','Onderdelen'],rows:[['1','6'],['2','12'],['3','18'],['5','?']]};
put('DP-003','compactDataTable',[{...tableA,inPrompt:true},{...tableA,highlightRows:[2]},{...tableA,highlightCells:[[2,1]]},notes({...tableA,highlightCells:[[2,1]]},'Woensdag → 21')]);
put('DP-004','compactDataTable',[{...tableB,inPrompt:true},{...tableB,highlightRows:[1,3]},notes({...tableB,highlightRows:[1,3]},'156 − 132 = ?'),notes(tableB,'156 − 132 = 24')]);
put('DP-005','compactDataTable',[{...tableC,inPrompt:true},{...tableC,highlightRows:[0]},notes(tableC,'5 × 6 = ?'),{...tableC,rows:[['1','6'],['2','12'],['3','18'],['5','30']],highlightCells:[[3,1]]}]);
calc('DP-006',[],{groups:[{nodes:['20','25','35','50','?'],jumps:['+5','+10','','']}]},{groups:[{nodes:['20','25','35','50','?'],jumps:['+5','+10','+15','+20']}],notes:['volgende sprong = +20']},['50 + 20 = 70']);
module.exports=V;
