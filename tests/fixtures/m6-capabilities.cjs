// TEST ONLY: exercises runtime capabilities; never loaded by production bootstrap.
const stageNames=['question','minnie','moose','explanation'];
function record(id, type, frames, contract = {answer:1,answerSpec:{type:'wholeNumber',allowedForms:['1']}}) {
  return {id:`TEST-M6-${id}`,contentVersion:1,learningLevel:'M6',difficulty:2,domain:'math',educationalDomain:type,
    learningObjective:`Test ${type}`,reportLabel:`Test · ${type}`,family:'test',presentation:'story',answerMode:contract.answerSpec.type==='currency'?'currencyCompose':'open',
    educationalCore:{values:{fixture:id},question:contract},surfaces:[{id:'fixture',prompt:`Test ${type}`,answerDisplay:String(contract.answer),hintMinnie:'Test Minnie',hintMoose:'Test Moose',explanation:'Test uitleg',authoredSupport:{explanationSteps:['Test uitleg']},
      visual:{type,stages:Object.fromEntries(stageNames.map((s,i)=>[s,{...frames[i],notes:[`Test stadium ${s}`]}]))}}]};
}
const count=record('CURRENCY-COUNT','currency',stageNames.map(()=>({mode:'count',items:[{denomination:2000,count:1},{denomination:500,count:1},{denomination:200,count:2},{denomination:50,count:1}]})),{answer:2950,answerSpec:{type:'euro',allowedForms:['29,50']}});
const composeSpec={type:'currency',mode:'compose',targetCents:2450,denominations:[2000,1000,500,200,100,50,20,10,5]};
const compose=record('CURRENCY-COMPOSE','currency',stageNames.map(()=>composeSpec),{answer:2450,answerSpec:composeSpec});
const changeSpec={type:'currency',mode:'change',priceCents:3675,paidCents:5000,denominations:[1000,500,200,100,50,20,10,5]};
const change=record('CURRENCY-CHANGE','currency',stageNames.map(()=>changeSpec),{answer:1325,answerSpec:changeSpec});
const clock=record('CLOCK','digitalClock',[{hour:2,minute:5},{hour:3,minute:15},{hour:4,minute:25},{hour:22,minute:25}]);
const numberLine=record('NUMBER-LINE','numberLine',stageNames.map((s,i)=>({min:9000,max:10000,markers:[{value:9000,label:'9000'},{value:10000,label:'10000'},...(i?[{value:9500,label:i===3?'9500':'?'}]:[])]})));
const measurement=record('MEASUREMENT','measurement',stageNames.map((s,i)=>({source:{value:300,unit:'cm'},targetUnit:'m',...(i===3?{targetLabel:'3'}:{})})));
const fractions=record('FRACTION','numberLine',stageNames.map(()=>({min:0,max:1,markers:[{value:0,label:'0'},{value:1,label:{numerator:2,denominator:3}}]})));
Object.assign(fractions.surfaces[0],{prompt:['Test ',{numerator:2,denominator:3}],hintMinnie:['Test Minnie ',{numerator:1,denominator:3}],hintMoose:['Test Moose ',{numerator:2,denominator:3}],authoredSupport:{explanationSteps:[['Test uitleg ',{numerator:2,denominator:3}]]}});
module.exports={record,fixtures:[count,compose,change,clock,numberLine,measurement,fractions]};
