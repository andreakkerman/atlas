const {test,expect}=require('@playwright/test');
const learning=require('../src/learning-levels'),engine=require('../src/m6-bank');
const {records,bank}=require('../src/content/m6');
const expected={0:[0,0,0],10:[100,0,0],20:[100,0,0],30:[100,0,0],40:[85,15,0],50:[75,25,0],60:[65,35,0],70:[65,30,5],80:[60,30,10],90:[55,35,10],100:[50,35,15]};
const slots={generic:[{id:'local-math',family:'bare_multiplication'}],time:[{id:'local-clock',family:'clock_reading_five_minutes'}]};
const history=()=>engine.createHistory({getItem:()=>null,setItem(){}});
const inDomain=(q,domain)=>(q.educationalDomain==='time')===(domain==='time');

for(const [key,weights] of Object.entries(expected)){
  const percentage=Number(key);
  test(`${percentage}%: exact balanced difficulty cycles and unchanged E5/M6 request sequence`,()=>{
    expect(Object.values(learning.difficultyPolicy(percentage))).toEqual(weights);
    for(let offset=0;offset<20;offset++){
      let randomCalls=0;
      const p=learning.createPlanner(percentage,()=>{randomCalls++;return offset/20;});
      expect(randomCalls).toBe(1);
      const sequence=[];
      for(let i=0;i<400;i++){
        const position=(i+offset)%20,count=percentage/5;
        const level=Math.floor((position+1)*count/20)>Math.floor(position*count/20)?'M6':'E5';
        expect(p.next()).toBe(level);
        if(level==='M6')sequence.push(p.nextDifficulty());
      }
      expect(p.selections).toBe(400);expect(p.difficultySelections).toBe(percentage*4);
      expect(p.allowedDifficulties).toEqual([1,2,3].filter(d=>weights[d-1]>0));
      for(let i=0;i<sequence.length;i+=20)expect([1,2,3].map(d=>sequence.slice(i,i+20).filter(x=>x===d).length)).toEqual(weights.map(w=>w/5));
      if(percentage===0){expect(p.nextDifficulty()).toBeNull();expect(p.difficultySelections).toBe(0);}
    }
  });
  test(`${percentage}%: production selection obeys domain and difficulty limits even with exhausted history`,()=>{
    for(const [domain,variants] of Object.entries(slots)){
      const h=history(),p=learning.createPlanner(percentage,()=>.45),delivered=[];
      for(const r of records)h.remember(r.id,r.surfaces[0].id);
      for(let i=0;i<200;i++){
        const result=learning.selectPosition(variants,p,bank,{history:h,used:records,random:()=>.99});
        expect(result.fallback).toBe(false);
        if(result.requested==='M6'){
          expect(weights[result.requestedDifficulty-1]).toBeGreaterThan(0);
          expect(result.deliveredDifficulty).toBe(result.requestedDifficulty);
          expect(inDomain(result.variant,domain)).toBe(true);
          delivered.push(result.deliveredDifficulty);
        }else expect(result).toMatchObject({variant:variants[0],delivered:'E5',requestedDifficulty:null,deliveredDifficulty:null});
      }
      expect(delivered).toHaveLength(percentage*2);
      expect([1,2,3].map(d=>delivered.filter(x=>x===d).length)).toEqual(weights.map(w=>w*percentage/50));
    }
  });
}

for(const domain of Object.keys(slots))test(`${domain}: reuse allowed difficulty before unseen harder content; empty eligible set falls back without debt`,()=>{
  for(const percentage of [10,30,40,60]){
    const p=learning.createPlanner(percentage,()=>0),h=history();
    const allowed=records.filter(q=>inDomain(q,domain)&&q.difficulty===1).slice(0,2);
    const forbidden=records.filter(q=>inDomain(q,domain)&&!p.allowedDifficulties.includes(q.difficulty));
    const wrongDomain=records.filter(q=>!inDomain(q,domain)&&q.difficulty===1);
    const small=engine.createBank([...forbidden,...wrongDomain,...allowed]);
    for(const q of allowed)h.remember(q.id,q.surfaces[0].id);
    let m6=0;
    for(let i=0;i<100;i++){
      const result=learning.selectPosition(slots[domain],p,small,{history:h,used:allowed,random:()=>.99});
      if(result.requested==='M6'){
        expect(result.variant.id).toBe(allowed[m6++%2].id);
        expect(result.deliveredDifficulty).toBe(1);
        expect(result.difficultyFallback).toBe(result.requestedDifficulty!==1);
      }
    }
    expect(m6).toBe(percentage);expect(p.difficultySelections).toBe(percentage);
    const empty=engine.createBank([...forbidden,...wrongDomain]),before=p.difficultySelections;
    const results=Array.from({length:100},()=>learning.selectPosition(slots[domain],p,empty,{random:()=>.99}));
    const fallback=results.filter(r=>r.requested==='M6');expect(fallback).toHaveLength(percentage);
    for(const r of fallback)expect(r).toMatchObject({variant:slots[domain][0],delivered:'E5',deliveredDifficulty:null,fallback:true,difficultyFallback:false});
    expect(p.difficultySelections-before).toBe(percentage);expect(p.selections).toBe(200);
  }
});

test('local compatibility selector also honours zero-weight ceilings',()=>{
  for(const percentage of [10,30,60]){
    const p=learning.createPlanner(percentage,()=>0),e5={id:'e5'},variants=[e5,{id:'hard',learningLevel:'M6',difficulty:3}];
    const results=Array.from({length:100},()=>learning.selectVariant(variants,p,()=>.99));
    expect(results.filter(r=>r.requested==='M6')).toHaveLength(percentage);
    expect(results.every(r=>r.variant===e5&&r.delivered==='E5')).toBe(true);
    expect(results.filter(r=>r.requested==='M6').every(r=>p.allowedDifficulties.includes(r.requestedDifficulty))).toBe(true);
  }
});

test('slider changes rebuild the difficulty plan, update copy and retain honest report snapshots',async({page})=>{
  const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.goto(base+'/?atlasSessionTest=1');
  await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
  await page.getByLabel('Instellingen',{exact:true}).click();
  const slider=page.getByLabel('Niveau',{exact:true}),copy=page.locator('[data-learning-mix-explanation]');
  await expect(slider).toHaveValue('10');await expect(page.locator('[data-learning-mix-label]')).toHaveText('90% E5 · 10% M6');
  await expect(copy).toContainText('100% instap · 0% normaal · 0% uitdagend');
  for(const percentage of [100,70,60,30,10,0]){
    await page.evaluate(()=>{window.eval('learningPlanner = learningLevels.createPlanner(m6Percentage, () => 0)');window.eval('learningPlanner').nextDifficulty();});
    await slider.evaluate((el,value)=>{el.value=String(value);el.dispatchEvent(new Event('input',{bubbles:true}));},percentage);
    expect(await page.evaluate(()=>window.eval('learningPlanner'))).toBeNull();
    const evidence=await page.evaluate(({percentage,variants})=>{
      const l=window.AtlasLearningLevels,p=l.createPlanner(window.eval('m6Percentage'),()=>0),b=window.AtlasM6Content.bank,r=window.AtlasSessionReport;
      r.startOrVisitLevel({adventureId:'test',adventureTitle:'Test',levelId:'test',levelTitle:'Test',m6Percentage:percentage});
      const results=[];
      for(let i=0;i<200;i++){
        const result=l.selectPosition(variants,p,b,{random:()=>.99});
        results.push(result);
      }
      const selected=results.filter(x=>x.requested==='M6');
      if(selected.length){
        const record=selected[0];
        r.beginQuestion({...record.variant,atlasLearningSelection:record},{levelId:'test',challengeId:'test',slotId:String(percentage),variantId:record.variant.id});
      }
      return {m6:selected.map(x=>x.requestedDifficulty),report:r.getCurrent().questions.at(-1)};
    },{percentage,variants:slots.generic});
    expect(evidence.m6).toHaveLength(percentage*2);
    expect([1,2,3].map(d=>evidence.m6.filter(x=>x===d).length)).toEqual(expected[percentage].map(w=>w*percentage/50));
    if(percentage){
      await expect(copy).toContainText(`${expected[percentage][0]}% instap · ${expected[percentage][1]}% normaal · ${expected[percentage][2]}% uitdagend`);
      expect(evidence.report).toMatchObject({requestedLearningLevel:'M6',deliveredLearningLevel:'M6',requestedDifficulty:evidence.m6[0],deliveredDifficulty:evidence.m6[0]});
    }else await expect(copy).not.toContainText('Binnen M6:');
  }
  // A missing allowed difficulty records the requested D1 and delivered E5 honestly.
  const fallback=await page.evaluate(variants=>{
    const l=AtlasLearningLevels,p=l.createPlanner(10,()=>.45),b=AtlasM6Bank.createBank(AtlasM6Content.records.filter(q=>q.difficulty>1));
    const result=l.selectPosition(variants,p,b),r=AtlasSessionReport;
    r.beginQuestion({...result.variant,atlasLearningSelection:result},{levelId:'test',challengeId:'test',slotId:'fallback',variantId:result.variant.id});
    return r.getCurrent().questions.at(-1);
  },slots.generic);
  expect(fallback).toMatchObject({requestedLearningLevel:'M6',deliveredLearningLevel:'E5',requestedDifficulty:1,deliveredDifficulty:null});
});
