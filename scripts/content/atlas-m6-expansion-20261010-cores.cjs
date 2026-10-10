// Independent numerical audit transcription. Signatures exclude wording, ID,
// surface, difficulty and answer, and use the existing audit's operation keys.
const entries={};
const add=(group,start,rows)=>rows.forEach(([core,answer],i)=>entries[`M6-${group}-${String(start+i).padStart(3,'0')}`]={core,answer});
const permutations=digits=>digits.length?digits.flatMap((digit,i)=>permutations(digits.filter((_,j)=>i!==j)).map(rest=>[digit,...rest])):[[]];
add('ME',8,[
  [['geometry-perimeter','square',6],4*6],
  [['geometry-area','array',4,5],4*5],
  [['geometry-perimeter','rectangle',12,7],2*(12+7)],
  [['geometry-area','rectangle',12,7],12*7],
  [['geometry-perimeter-opening',14,9,2],2*(14+9)-2],
  [['geometry-missing-side',50,16],(50-2*16)/2],
  [['measure-convert',3,'dl','cl'],3*10],
  [['measure-convert',[[2,'kg'],[500,'g']],'g'],2*1000+500],
  [['measure-convert',[[750,'ml'],[750,'ml'],[500,'ml']],'l'],(750+750+500)/1000]
]);
add('DP',7,[
  [['table-minimum',[145,160,138,152]],'Route '+['A','B','C','D'][[145,160,138,152].indexOf(Math.min(145,160,138,152))]],
  [['sequence-missing',[2450,2550,2650,null,2850]],2650+100],
  [['table-sum',[125,148]],125+148],
  [['sequence-missing',[100,120,160,180,220,null]],220+20],
  [['table-total-difference',[[145,128],[132,156]]],132+156-(145+128)],
  [['sequence-missing',[5,10,13,26,29,58,null]],58+3],
  [['table-maximum',[36,42,39,47]],['Maandag','Dinsdag','Woensdag','Donderdag'][[36,42,39,47].indexOf(Math.max(36,42,39,47))]],
  [['table-missing-from-total',500,[125,138,null,117]],500-125-138-117],
  [['table-target-difference',[[128,147],[136,152]],20],20-(136+152-(128+147))]
]);
add('MD',11,[
  [['arithmetic','multiplication',6,25],6*25],
  [['arithmetic','division',240,6],240/6],
  [['arithmetic','multiplication',7,46],7*46],
  [['arithmetic','division',252,6],252/6],
  [['multiply-then-subtract',6,24,38],6*24-38],
  [['equal-groups-remove',56,8,3],56/8*(8-3)]
]);
add('NS',9,[
  [['number-maximum',[24680,24608]],Math.max(24680,24608)],
  [['arithmetic','addition',7650,1000],7650+1000],
  [['number-order',[31450,30950,31540,31405]], [31450,30950,31540,31405].sort((a,b)=>a-b).map(n=>n.toLocaleString('nl-NL')).join(' → ')],
  [['place-value-difference',36482,39482],39482-36482],
  [['digit-order-below',[4,8,1,9,6],50000],Math.max(...permutations([4,8,1,9,6]).map(d=>Number(d.join(''))).filter(n=>n<50000)).toLocaleString('nl-NL')],
  [['reverse-rounding',8000,1000],`${(8000-500).toLocaleString('nl-NL')} t/m ${(8000+499).toLocaleString('nl-NL')}`]
]);
add('FR',11,[
  [['fraction-equivalent',1,2,4],`${1*(4/2)}/4`],
  [['fraction-compare',[[3,8],[5,8]]],3/8<5/8?'5/8':'3/8'],
  [['ratio-scale',2,3,4],3*(4/2)],
  [['fraction-unit-location',3,4],'Derde streepje na 0'],
  [['fraction-equivalent-numerator',3,5,10],String(3*(10/5))],
  [['fraction-compare',[[3,4],[5,8]]],3/4>5/8?'3/4':'5/8'],
  [['ratio-scale',3,2,9],2*(9/3)],
  [['fraction-quantity',42,5,6,false],42/6*5],
  [['fraction-compare',[[2,3],[3,4],[3,6]]],['2/3','3/4','3/6'][[2/3,3/4,3/6].indexOf(Math.max(2/3,3/4,3/6))]],
  [['fraction-find-whole',24,3,8],24/3*8],
  [['ratio-scale',6,270,10],270/6*10],
  [['fraction-remainder-then-fraction',50,3,5,1,2],(50-50*3/5)*(1-1/2)]
]);
add('MO',9,[
  [['money-to-cents',3,75],3*100+75],
  [['money-from-cents',460],`€${Math.floor(460/100)},${460%100}`],
  [['money-price-difference',1280,945],1280-945],
  [['money-multiply',4,275],4*275],
  [['money-budget-multiply',2500,3,675],2500-3*675],
  [['money-offers',4,[3,840,310],295],4*295-(840+310)]
]);
const duration=n=>`${Math.floor(n/60)} uur ${n%60} minuten`;
add('TI',19,[
  [['time-conversion','hoursMinutesToMinutes',1,20],60+20],
  [['time-conversion','minutesToHoursMinutes',95],duration(95)],
  [['time-duration-difference',70,75],75-(60+10)],
  [['time-duration-add',135,50],duration(2*60+15+50)],
  [['time-duration-subtract',190,105],duration(3*60+10-(60+45))],
  [['time-schedule-rest',13*60+25,15*60,[35,40]],15*60-(13*60+25)-35-40]
]);
add('AS',9,[
  [['arithmetic','subtraction',5000,350],5000-350],
  [['arithmetic','subtraction',5000,4680],5000-4680],
  [['arithmetic','subtraction',12500,2300],12500-2300],
  [['arithmetic','subtraction',5203,487],5203-487],
  [['arithmetic','subtraction',4000,2875],4000-2875],
  [['add-then-subtract',3250,875,640],3250+875-640]
]);
module.exports=entries;
