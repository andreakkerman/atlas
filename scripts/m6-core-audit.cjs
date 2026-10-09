// Offline audit only: compare numerical tasks, independently of narrative text,
// serialized core shape, ID, difficulty, surface and report label.
const numbers=s=>(s.match(/\d[\d.]*(?:,\d+)?/g)||[]).map(n=>Number(n.replaceAll('.','').replace(',','.')));
const cents=s=>Math.round(Number(s.replace('€','').replace(',','.'))*100);
const minutes=s=>{const[h,m]=s.split(':').map(Number);return h*60+m;};
const canonical=x=>Array.isArray(x)?x.map(canonical):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
function signature(r) {
  const v=r.educationalCore.values,q=r.educationalCore.question,s=r.surfaces[0],frame=s.visual?.stages.question;
  const authored=(v.authored||'').replaceAll('**',''),domain=r.educationalDomain;
  if(v.operands)return ['arithmetic',v.operation,...v.operands];
  if(domain==='additionSubtraction'||domain==='multiplicationDivision') {
    const match=authored.match(/^([\d.]+) ([+−×÷]) ([\d.]+) =/);
    if(match)return ['arithmetic',({'+':'addition','−':'subtraction','×':'multiplication','÷':'division'})[match[2]],...numbers(match[1]+' '+match[3])];
    return ['arithmetic',r.learningObjective,...numbers(authored)];
  }
  if(domain==='money') {
    if(v.pricesCents)return ['money-change',v.pricesCents,v.paidCents];
    if(s.visual.type==='moneyReceipt')return ['money-change',frame.items.map(i=>cents(i.amount)),cents(frame.paid)];
    if(q.answerSpec.mode==='change')return ['money-change',[q.answerSpec.priceCents],q.answerSpec.paidCents];
    if(q.answerSpec.mode==='compose')return ['money-compose',q.answerSpec.targetCents];
    if(frame.items)return ['money-count',frame.items.map(i=>[i.denomination,i.count]).sort((a,b)=>a[0]-b[0])];
    throw Error(`${r.id}: money core not audited`);
  }
  if(domain==='time') {
    if(v.operation)return ['time-conversion',v.operation,v.minutes||0,v.seconds||0];
    const times=authored.match(/\d{2}:\d{2}/g)||[];
    const duration=()=> {
      if(v.durationMinutes!==undefined)return v.durationMinutes;
      const withoutTimes=authored.replace(/\d{2}:\d{2}/g,'');
      return [...withoutTimes.matchAll(/(\d+)\s*(uur|hour|min)/g)].reduce((n,m)=>n+Number(m[1])*(m[2]==='min'?1:60),0);
    };
    if((v.end&&v.durationMinutes!==undefined)||r.learningObjective.startsWith('find_start_time'))return ['time-start',v.end||times[0],duration()];
    if((v.start&&v.durationMinutes!==undefined)||r.learningObjective.startsWith('find_end_time')||r.learningObjective==='multistep_schedule_end_time')return ['time-end',v.start||times[0],duration()];
    if(s.visual.type==='analogueClock'||s.visual.type==='digitalClock')return ['clock-reading',s.visual.type,frame.hour,frame.minute];
    const start=v.start||times[0],end=v.end||times[1];
    if(!start||!end)throw Error(`${r.id}: time core not audited`);
    return ['time-elapsed',minutes(start),minutes(end)];
  }
  if(v.fraction)return ['fraction-quantity',v.total,v.fraction.numerator,v.fraction.denominator,!!v.remainder];
  const fraction=authored.match(/^(\d+)\/(\d+) van (\d+)/);
  if(fraction)return ['fraction-quantity',Number(fraction[3]),Number(fraction[1]),Number(fraction[2]),false];
  // The other authored task types are distinguished by operation/objective and
  // all fixed numerical givens (including table cells/choices where relevant).
  return [domain,r.learningObjective,numbers(authored),q.answer,...(q.choices?[q.choices]:[])];
}
function auditCores(records) {
  const groups=new Map();
  for(const r of records){const key=JSON.stringify(canonical(signature(r)));if(!groups.has(key))groups.set(key,[]);groups.get(key).push(r.id);}
  return {audited:records.length,duplicates:[...groups.values()].filter(ids=>ids.length>1)};
}
module.exports={signature,auditCores};
