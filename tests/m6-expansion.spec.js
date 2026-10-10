const {test,expect}=require('@playwright/test');
const fs=require('node:fs'),crypto=require('node:crypto'),vm=require('node:vm');
const engine=require('../src/m6-bank'),support=require('../src/challenge-support'),learning=require('../src/learning-levels'),cap=require('../src/challenge-capabilities');
const {records,bank}=require('../src/content/m6');
const source=require('../scripts/m6-expansion-content.cjs');
const {expectedSupport}=require('./fixtures/m6-presentation-expectations.cjs');
const approved=source.readApproved().map(require('./helpers/time-approval.cjs').currentExpansion).map(require('./helpers/m6-targeted-review.cjs').currentExpansion),ids=source.expectedIds;
const load=id=>{const c={window:{}};vm.runInNewContext(fs.readFileSync(`Levels/${id}/level.js`,'utf8'),c);return c.window.SVEN_LEVEL_DEFINITIONS[id];};
const history=()=>engine.createHistory({getItem:()=>null,setItem(){}});

test('approved expansion inventory and every support word match the immutable source plus authorized surface corrections',()=>{
  const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p,'utf8').replaceAll('\r\n','\n')).digest('hex');
  expect(hash('scripts/content/atlas-m6-central-approved.md')).toBe('7598d543767a4ff85709dc456a701fbff84f9a7a58089b0619fe3705939dec53');
  expect(hash('scripts/content/atlas-m6-visual-addendum.md')).toBe('d5c0fd5461154acfdc86e75cc310606de9d8edb7b8e12384a6a420f9350c2da4');
  expect(hash('scripts/content/atlas-m6-expansion-visuals.cjs')).toBe('2d9221c1c5839ee9f51f826a1a4d4d3a8f1196877da54478c5a49c40bf19241e');
  expect(source.validateExpansion(records)).toEqual([]);
  expect(records).toHaveLength(159);expect(approved.map(q=>q.id)).toEqual(ids);
  expect(new Set(records.map(q=>q.id)).size).toBe(159);expect(records.some(q=>q.id.startsWith('TEST-'))).toBe(false);
  const audit=engine.audit(records.filter(q=>ids.includes(q.id)));
  expect(audit.difficulty).toEqual({1:34,2:29,3:12});expect(audit.domains).toEqual({numberSense:8,additionSubtraction:8,multiplicationDivision:10,fractionsRatios:10,money:8,time:18,measurementGeometry:7,dataPatterns:6});
  expect(audit.multipleSurfaces).toBe(33);expect(audit.duplicateIds).toEqual([]);expect(audit.duplicateEducationalCores).toEqual([]);
  for(const q of approved) {
    const record=bank.get(q.id);expect(record.surfaces).toHaveLength(q.surfaces.length);
    for(const surface of q.surfaces){const actual=bank.recover(q.id,surface.id);
      for(const key of ['answer','answerSpec','answerDisplay'])expect(actual[key],`${q.id}/${surface.id}/${key}`).toEqual(q[key]);
      for(const [key,value] of Object.entries(expectedSupport(q,surface.id)))expect(actual[key],`${q.id}/${surface.id}/${key}`).toEqual(value);
      expect(actual.prompt).toBe(surface.prompt);expect(actual.learningObjective).toBe(q.objective);expect(actual.reportLabel).toBe(q.reportLabel);
      expect(actual.visual.instructions).toEqual(q.instructions);expect(Object.keys(actual.visual.stages)).toEqual(support.STAGES);
      expect(support.validate(actual,p=>fs.existsSync(p))).toEqual([]);
      const frame=actual.visual.stages.question;
      if(q.clock)expect({hour:frame.hour,minute:frame.minute}).toEqual(q.clock);
      if(q.currencyItems.length)expect(frame.items).toEqual(q.currencyItems);
      if(actual.visual.type==='compactDataTable'){
        const rows=surface.prompt.split('\n').filter(line=>line.startsWith('|')).map(line=>line.split('|').slice(1,-1).map(cell=>cell.trim()));
        expect(frame.columns).toEqual(rows[0]);expect(frame.rows).toEqual(rows.slice(2));
        for(const stage of ['minnie','moose'])expect(actual.visual.stages[stage].rows).toEqual(rows.slice(2));
      }
    }
  }
});

test('all fixed answers independently agree with arithmetic, authored times, table data and money',()=>{
  const numeric={
    NS:[6247,Number([3,8,5,7].sort((a,b)=>b-a).join('')),600,7430+10,Math.round(6451/100)*100,Math.round(8620/1000)*1000,[9760,10140,9590,10420].sort((a,b)=>Math.abs(a-10000)-Math.abs(b-10000))[0],5000+200+70+4],
    AS:[430+260,1642-1633,4000-3760,728+742,468+257,624-178,1836+475,3203-1487],
    MD:[6*24,160/16,20*18,84/7,7*40,168/7,8*38,400/40,Math.ceil(29/6),7*6*8],
    FR:['3/8',18/2,28/4,12/2*4,18/3,60/3*2,12*3,450/3*7,14/2*5,28/4*9],
    MO:[2000+500+200+50,1000+200+100+50+10+5,300-270,850,2450,2000-1465,2000-735-480,5000-3675],
    ME:[300/100,18*10,100*10,1000/1000,2*100+35,6*250,2*100+35+100+80],
    DP:[2380+10,1175+25,21,156-132,5*6,50+20]
  };
  for(const [group,values] of Object.entries(numeric))values.forEach((answer,i)=>{
    const q=bank.recover(`M6-${group}-${String(i+1).padStart(3,'0')}`),canonical=q.answerSpec.type==='choice'&&group!=='FR'?Number(q.answer.replaceAll('.','').replace(' mm','')):q.answer;
    expect(canonical,q.id).toBe(answer);
  });
  const minute=s=>{const[h,m]=s.split(':').map(Number);return h*60+m;},time=n=>`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
  const times=[300/60,4*60,minute('15:20')-minute('14:31'),minute('16:39')-minute('15:42'),2*60+30,time(minute('08:45')+95),time(minute('15:10')-35),time(minute('17:10')-105),minute('14:05')-minute('13:42'),time(minute('10:35')+45+20+55)];
  times.forEach((answer,i)=>expect(bank.recover(`M6-TI-${String(i+9).padStart(3,'0')}`).answer).toBe(answer));
  const recalibrated=[time(minute('15:58')+4),time(minute('08:57')+8),minute('15:32')-minute('14:51'),minute('20:28')-minute('19:43'),minute('16:12')-minute('15:29'),minute('09:34')-minute('08:50'),time(minute('17:36')+48),time(minute('20:13')-47)];
  recalibrated.forEach((answer,i)=>expect(bank.recover(`M6-TI-${String(i+1).padStart(3,'0')}`).answer).toBe(answer));
});

test('clock semantics constrain the existing selector in several worlds, including full history exhaustion',()=>{
  for(const world of ['LVL-0003','LVL-0013','LVL-0023','LVL-0033']){
    const slots=load(world).learningChallenges.flatMap(c=>c.questions).filter(s=>learning.positionDomain(s.variants)==='time');
    expect(slots.length,world).toBeGreaterThan(0);
    const h=history(),p=learning.createPlanner(100,()=>0),used=[];
    for(const draw of [0,.6,.9]){
      const result=learning.selectPosition(slots[0].variants,p,bank,{random:()=>draw,history:h,used});
      expect(result.variant.educationalDomain).toBe('time');expect(result.deliveredDifficulty).toBe(result.requestedDifficulty);used.push(result.variant);
    }
    for(const r of records.filter(r=>r.educationalDomain==='time'))h.remember(r.id,r.surfaces[0].id);
    p.nextDifficulty=()=>1;
    const oldest=h.entries.find(e=>bank.get(e.id).educationalDomain==='time'&&bank.get(e.id).difficulty===1).id;
    const selected=learning.selectPosition(slots[0].variants,p,bank,{random:()=>0,history:h,used:records});
    expect(selected.variant.id).toBe(oldest);expect(selected.variant.educationalDomain).toBe('time');
    expect(slots.every(s=>s.variants.every(v=>v.learningLevel!=='M6'))).toBe(true);
  }
  const generic=[{id:'local',family:'bare_multiplication'}];
  expect(learning.selectPosition(generic,learning.createPlanner(100,()=>0),bank,{random:()=>0}).variant.educationalDomain).not.toBe('time');
  // A mixed local position with one duration story is not an explicit clock position.
  const mixed=load('LVL-0022').learningChallenges.find(c=>c.id==='bridgeModel').questions.find(s=>s.id==='bridge-model-slot-2');
  expect(learning.positionDomain(mixed.variants)).toBeUndefined();
  const clock=[{id:'clock',visual:{type:'clock',hour:3,minute:0}}];
  const emptyTime=engine.createBank(records.filter(r=>r.educationalDomain!=='time'));
  expect(learning.selectPosition(clock,learning.createPlanner(100,()=>0),emptyTime,{random:()=>0})).toMatchObject({delivered:'E5',fallback:true});
  expect(learning.DEFAULT_M6_PERCENTAGE).toBe(10);expect(learning.difficultyPolicy(100)).toEqual({1:50,2:35,3:15});
});

for(const [kind,variants,isTime] of [
  ['clock',[{id:'local-clock',visual:{type:'clock',hour:3,minute:0}}],true],
  ['generic',[{id:'local-math',family:'bare_multiplication'}],false]
]){
  const eligible=r=>(r.educationalDomain==='time')===isTime;
  test(`${kind} positions keep exclusive time eligibility through recent-history and used-ID exhaustion`,()=>{
    const allowed=records.filter(r=>eligible(r)&&r.difficulty===1).slice(0,2);
    const other=records.find(r=>!eligible(r)&&r.difficulty===1);
    // The forbidden domain comes first and remains unseen: repetition must win over crossing domains.
    const small=engine.createBank([other,...allowed]),h=history(),p=learning.createPlanner(100,()=>0),used=[];
    p.nextDifficulty=()=>1;
    for(let i=0;i<6;i++){
      const result=learning.selectPosition(variants,p,small,{random:()=>0,history:h,used});
      expect(result.variant.id).toBe(allowed[i%2].id);expect(eligible(result.variant)).toBe(true);
      expect(result).toMatchObject({delivered:'M6',requestedDifficulty:1,deliveredDifficulty:1,fallback:false});
      used.push(result.variant);
    }
    expect(h.entries.some(e=>e.id===other.id)).toBe(false);expect(p.selections).toBe(6);
    for(const [difficulty,draw] of [[1,0],[2,.6],[3,.9]]){
      // Fill the eligible bucket: the whole 159-ID bank exceeds the unchanged 128-ID history cap.
      const exhausted=history();for(const r of records.filter(r=>eligible(r)&&r.difficulty===difficulty))exhausted.remember(r.id,r.surfaces[0].id);
      p.nextDifficulty=()=>difficulty;
      const oldest=records.find(r=>eligible(r)&&r.difficulty===difficulty);
      const result=learning.selectPosition(variants,p,bank,{random:()=>draw,history:exhausted,used:records});
      expect(result.variant.id).toBe(oldest.id);expect(eligible(result.variant)).toBe(true);
      expect(result).toMatchObject({requestedDifficulty:difficulty,deliveredDifficulty:difficulty,difficultyFallback:false});
    }
  });
  test(`${kind} positions keep difficulty fallback within eligibility and leave E5 selection unchanged`,()=>{
    const allowed=[1,3].map(d=>records.find(r=>eligible(r)&&r.difficulty===d));
    const other=records.find(r=>!eligible(r)&&r.difficulty===2);
    const gap=engine.createBank([other,...allowed]),p=learning.createPlanner(100,()=>0);
    p.nextDifficulty=()=>2;
    for(const [used,difficulty] of [[[],1],[[allowed[0]],3]]){
      const result=learning.selectPosition(variants,p,gap,{random:()=>.6,used});
      expect(eligible(result.variant)).toBe(true);
      expect(result).toMatchObject({requestedDifficulty:2,deliveredDifficulty:difficulty,difficultyFallback:true});
    }
    expect(learning.selectPosition(variants,p,engine.createBank([other]),{random:()=>.6})).toMatchObject({variant:variants[0],delivered:'E5',fallback:true});
    const local=[...variants,{...variants[0],id:'second-local',learningLevel:'E5'}];
    const untouched={select(){throw new Error('E5 must not query the central bank');}};
    for(const draw of [0,.6,.99])expect(learning.selectPosition(local,learning.createPlanner(0,()=>0),untouched,{random:()=>draw})).toEqual(learning.selectVariant(local,learning.createPlanner(0,()=>0),()=>draw));
  });
}

test('new representations reject malformed data and preserve answer normalization boundaries',()=>{
  for(const [type,frame] of [['analogueClock',{hour:24,minute:0}],['compactDataTable',{columns:['A','B'],rows:[['x']]}],['compactDataTable',{columns:['A','B'],rows:[['x',1]],highlightCells:[[2,1]]}],['measurement',{sources:[{value:1,unit:'inch'}],targetUnit:'cm'}],['numberLine',{min:0,max:10,markers:[],jumps:[{from:0,to:11,label:'x'}]}]])expect(cap.validateFrame(type,frame).length).toBeGreaterThan(0);
  for(const id of ['M6-AS-004','M6-DP-002','M6-ME-006']){
    const q=bank.recover(id),digits=String(q.answer),dotted=digits.slice(0,-3)+'.'+digits.slice(-3);
    for(const raw of [digits,dotted,dotted.replace('.',' ')])expect(support.parseAnswer(q,raw)).toMatchObject({valid:true,correct:true});
    for(const raw of ['',dotted.replace('.',','),'1e3','-1','1. 470'])expect(support.parseAnswer(q,raw).valid).toBe(false);
    expect(support.parseAnswer(q,String(q.answer+1))).toMatchObject({valid:true,correct:false});
  }
  const q=bank.recover('M6-MO-008');
  for(const counts of [{1000:'1',200:'1',100:'1',10:'2',5:'1'},{500:'2',100:'3',5:'5'}])expect(support.parseAnswer(q,counts)).toMatchObject({valid:true,correct:true,interpreted:1325,rawCounts:counts});
  for(const raw of [{},{1000:'0'},{1000:'x'},{20:'1'}])expect(support.parseAnswer(q,raw).valid).toBe(false);
  expect(support.parseAnswer(q,{1000:'1'})).toMatchObject({valid:true,correct:false,interpreted:1000});
});

test('authored disclosure, addendum, fractions and tables reveal only the requested stage',()=>{
  const html=(id,stage)=>support.renderVisual(bank.recover(id).visual,stage);
  for(const id of ['M6-MD-002','M6-MD-003','M6-MD-004'])expect(Object.keys(bank.recover(id).visual.instructions)).toEqual(support.STAGES);
  expect(html('M6-MD-002','moose')).toContain('16 × ? = 160');expect(html('M6-MD-002','moose')).not.toContain('>10');
  expect(html('M6-MD-004','moose')).not.toContain('12');expect(html('M6-MD-004','explanation')).toContain('84 : 7 = 12');
  expect(html('M6-NS-005','question')).not.toContain('6.450');expect(html('M6-NS-005','minnie')).toContain('6.450');
  expect(html('M6-FR-006','question')).not.toContain('>20<');expect(html('M6-FR-006','moose')).toContain('60 : 3 = 20');expect(html('M6-FR-006','moose')).not.toContain('= 40');
  expect(html('M6-MO-008','question')).not.toContain('13,25');expect(html('M6-MO-008','moose')).not.toContain('13,25');expect(html('M6-MO-008','explanation')).toContain('13,25');
  expect(html('M6-TI-018','question')).not.toContain('11:20');expect(html('M6-TI-018','minnie')).toContain('11:20');expect(html('M6-TI-018','minnie')).not.toContain('11:40');expect(html('M6-TI-018','moose')).not.toContain('12:35');
  expect(html('M6-ME-003','question')).not.toContain('100');expect(html('M6-ME-003','minnie')).toContain('100 cm');expect(html('M6-ME-003','minnie')).not.toContain('10 mm');
  expect(html('M6-DP-004','minnie')).not.toContain('156 − 132');expect(html('M6-DP-004','moose')).toContain('156 − 132 = ?');expect(html('M6-DP-004','moose')).not.toContain('= 24');
  expect(html('M6-DP-005','moose')).not.toContain('>30<');expect(html('M6-DP-005','explanation')).toContain('>30<');
  expect(html('M6-DP-006','question')).not.toContain('+5');expect(html('M6-DP-006','minnie')).not.toContain('+15');
  expect(support.renderExplanation(bank.recover('M6-FR-006'))).toContain('aria-label="2 gedeeld door 3"');
  const table=cap.richText(bank.recover('M6-DP-003').promptParts);expect(table).toContain('scope="col"');expect(table).toContain('scope="row"');expect(table).toContain('Woensdag');
});
