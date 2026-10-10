(function (global) {
  'use strict';
  const STAGES = ['question', 'minnie', 'moose', 'explanation'];
  const capabilities = typeof module !== 'undefined' && module.exports ? require('./challenge-capabilities') : global.AtlasChallengeCapabilities;
  const VISUAL_TYPES = ['fractionStrip', 'calculationSteps', 'moneyReceipt', 'timeLine', ...capabilities.TYPES];
  const explanationLayouts = typeof module !== 'undefined' && module.exports ? require('./challenge-explanation-layouts') : global.AtlasChallengeExplanationLayouts;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  // Only the approved emphasis syntax is supported; never interpret authored HTML.
  const richText = capabilities.richText;
  const usesStructuredMoney = question => question.learningLevel === 'M6' && question.answerMode === 'open' && question.answerSpec?.type === 'euro';
  function parseMoneyAnswer(question, raw) {
    const rawFields = {euros: raw?.euros ?? null, cents: raw?.cents ?? null};
    const {euros, cents} = rawFields;
    const wellFormed = raw !== null && typeof raw === 'object' && !Array.isArray(raw) &&
      typeof euros === 'string' && typeof cents === 'string' &&
      /^\d*$/.test(euros) && /^\d{0,2}$/.test(cents) && (euros !== '' || cents !== '');
    const amount = wellFormed ? Number(euros || '0') * 100 + Number(cents || '0') : NaN;
    const valid = Number.isSafeInteger(amount) && amount >= 0;
    const normalizedDisplay = valid ? `€${Math.floor(amount / 100)},${String(amount % 100).padStart(2, '0')}` : null;
    return {raw: `${euros}|${cents}`, rawFields, interpreted: valid ? amount : null, normalizedDisplay,
      unit: 'cents', valid, correct: valid && amount === question.answer};
  }
  function parseAnswer(question, raw) {
    if (capabilities.usesCurrency(question)) return capabilities.parseCurrency(question, raw);
    return usesStructuredMoney(question) ? parseMoneyAnswer(question, raw) : parseTextAnswer(question, raw);
  }
  // Retained for non-M6 contracts and validation of the immutable source bundle's answer forms.
  function parseTextAnswer(question, raw) {
    const spec = question.answerSpec;
    if (!spec) return null; // Existing grading owns every question without an explicit contract.
    const text = String(raw).trim();
    let interpreted = null;
    if (spec.type === 'euro') {
      if (/^(?:0|[1-9]\d*)(?:[,.]\d{1,2})?$/.test(text)) {
        const [euros, cents = ''] = text.split(/[,.]/);
        interpreted = Number(euros) * 100 + Number(cents.padEnd(2,'0'));
      }
    } else if (spec.type === 'wholeNumber') {
      if (/^(?:0|[1-9]\d*)$/.test(text)) interpreted = Number(text);
      else if ((spec.grouping || spec.allowedForms?.some(form => /^\d{1,3}[. ]\d{3}$/.test(form))) && /^[1-9]\d{0,2}([. ])\d{3}(?:\1\d{3})*$/.test(text)) interpreted = Number(text.replace(/[. ]/g,''));
    } else if (spec.type === 'choice') {
      if (question.choices?.includes(text)) interpreted = text;
      else if (question.learningLevel === 'M6') interpreted = question.choices?.find(value => typeof value === 'number' && String(value) === text) ?? null;
    }
    const valid = interpreted !== null && (typeof interpreted === 'string' || Number.isSafeInteger(interpreted));
    return {raw:String(raw), interpreted:valid?interpreted:null, unit:spec.type==='euro'?'cents':spec.unit || null,
      valid, correct:valid && interpreted===question.answer && (spec.type==='choice' || spec.type==='wholeNumber'&&spec.grouping || spec.allowedForms.includes(text))};
  }
  function validate(question, assetExists) {
    const errors = [], fail = message => errors.push(`${question.id}: ${message}`);
    if (question.difficulty !== undefined && ![1,2,3].includes(question.difficulty)) fail('difficulty must be 1, 2 or 3');
    if (!question.authoredSupport) return errors;
    if (!(Number.isInteger(question.contentVersion) && question.contentVersion > 0) && !(typeof question.contentVersion === 'string' && question.contentVersion.trim())) fail('contentVersion is required for authored support');
    for (const key of ['learningObjective','reportLabel','hintMinnie','hintMoose','answerDisplay']) if (typeof question[key] !== 'string' || !question[key].trim()) fail(`${key} is required for authored support`);
    capabilities.validateRich(question, errors);
    const explanation = question.authoredSupport.explanationSteps;
    if (!Array.isArray(explanation) || !explanation.length || explanation.some(s=>typeof s !== 'string' || !s.trim()) || explanation.join('\n\n')!==question.explanation) fail('explanation steps must preserve the complete explanation');
    const spec = question.answerSpec;
    if (!spec || !['wholeNumber','euro','choice','currency'].includes(spec.type)) fail('missing answer contract');
    else if (spec.type === 'currency') {
      capabilities.validateCurrency(spec, errors, assetExists);
      if (!capabilities.usesCurrency(question) || !['compose','change'].includes(spec.mode)) fail('currency composition requires its M6 answer mode');
      const target = spec.mode === 'change' ? spec.paidCents-spec.priceCents : spec.targetCents;
      if (question.answer !== target) fail('currency answer must match the explicit target');
    } else if (spec.type!=='choice' && (!Array.isArray(spec.allowedForms) || !spec.allowedForms.length || spec.allowedForms.some(form=>!parseTextAnswer(question,form)?.correct))) fail('invalid allowed answer forms');
    const visual = question.visual;
    if (!visual || !VISUAL_TYPES.includes(visual.type)) { fail('unknown instructional visual'); return errors; }
    for (const stage of STAGES) {
      const frame = visual.stages?.[stage];
      if (!frame || typeof frame!=='object') { fail(`missing visual stage ${stage}`); continue; }
      if (capabilities.TYPES.includes(visual.type)) errors.push(...capabilities.validateFrame(visual.type, frame, assetExists).map(message=>`${question.id}/${stage}: ${message}`));
      if (visual.type==='fractionStrip') {
        const strips=frame.strips || [frame];
        if(!Array.isArray(strips)||!strips.length||strips.length>3) fail(`invalid fraction rows at ${stage}`);
        else for(const strip of strips){
          if(!Array.isArray(strip.segments) || strip.segments.length < (strip.partitioned===false?1:2) || strip.segments.length>12 || strip.segments.some(s=>typeof s.selected!=='boolean'||s.symbols!==undefined&&(!Number.isInteger(s.symbols)||s.symbols<0||s.symbols>20))) fail(`invalid fraction segments at ${stage}`);
          if((strip.groups||[]).some(g=>!Number.isInteger(g.from)||!Number.isInteger(g.count)||g.from<0||g.count<1||g.from+g.count>strip.segments?.length)) fail(`invalid fraction grouping at ${stage}`);
          if(strip.boundaries?.some(i=>!Number.isInteger(i)||i<1||i>=strip.segments?.length))fail(`invalid fraction boundary at ${stage}`);
        }
      }
      if (visual.type==='moneyReceipt' && (!Array.isArray(frame.items)||!frame.items.length||frame.paid!==undefined&&!frame.paid||frame.items.some(i=>!i.label||!i.amount))) fail(`invalid receipt at ${stage}`);
      if (visual.type==='calculationSteps' && !Array.isArray(frame.groups)) fail(`missing calculation groups at ${stage}`);
      if (frame.quantities?.some(q=>!Number.isInteger(q.count)||q.count<0||q.count>20||typeof q.label!=='string')) fail(`invalid quantity group at ${stage}`);
      if(frame.boxes&&(!Array.isArray(frame.boxes.labels)||!frame.boxes.labels.length||frame.boxes.labels.length>20||frame.boxes.labels.some(s=>typeof s!=='string')||frame.boxes.removed?.some(i=>!Number.isInteger(i)||i<0||i>=frame.boxes.labels.length)))fail(`invalid boxes at ${stage}`);
      if(frame.bars&&(!Array.isArray(frame.bars)||!frame.bars.length||frame.bars.some(b=>typeof b.label!=='string'||b.parts?.some(p=>typeof p.label!=='string'||!Number.isFinite(p.weight)||p.weight<=0))))fail(`invalid duration bars at ${stage}`);
      if (visual.type==='timeLine' && (!['forward','backward'].includes(frame.direction)||!Array.isArray(frame.nodes)||frame.nodes.length<2)) fail(`invalid timeline at ${stage}`);
      for (const sequence of [frame,...(frame.groups||[])]) if (sequence.nodes && (!Array.isArray(sequence.nodes)||!Array.isArray(sequence.jumps)||(sequence.jumps.length && sequence.jumps.length !== sequence.nodes.length-1))) fail(`invalid sequence at ${stage}`);
    }
    return errors;
  }
  function renderSequence(frame, timeline = false) {
    const backward = frame.direction === 'backward';
    return `<div class="learningSequence ${timeline?'learningTimeline':''} ${!timeline && frame.nodes.length>4?'learningSequenceVertical':''} ${backward?'learningBackward':''}">${frame.nodes.map((node,i)=>`${i?`<span class="learningJump"><span aria-hidden="true">${backward?'←':'→'}</span><span>${escape(frame.jumps?.[i-1]||'')}</span></span>`:''}<span class="learningNode ${node==='?'?'learningUnknown':''}${frame.digital?' digitalTimeNode':''}${frame.focusNodes?.includes(i)?' authoredFocus':''}">${escape(node)}</span>`).join('')}</div>`;
  }
  function renderGroups(groups = []) {
    return groups.map(group=>`<div class="learningStepGroup">${group.label?`<div class="learningStepLabel">${richText(group.label)}</div>`:''}${(group.lines||[]).map(line=>`<p>${richText(line)}</p>`).join('')}${group.nodes?renderSequence(group):''}</div>`).join('');
  }
  function symbolSvg(type) {
    return type==='shield'?'<svg viewBox="0 0 24 28" aria-hidden="true"><path d="M2 3 Q12 0 22 3 V14 Q20 22 12 26 Q4 22 2 14Z"/><path d="M12 3V24M3 11H21" class="symbolDetail"/></svg>':'<svg viewBox="0 0 28 22" aria-hidden="true"><path d="M3 5 13 1 25 6 26 18 15 21 2 17Z"/><path d="M3 5 15 9 25 6 M15 9V21" class="symbolDetail"/></svg>';
  }
  function renderVisual(visual, stage = 'question') {
    // Flat E5 clock data is rendered by the shared clock capability. Only
    // authored M6 frames participate in progressive visual disclosure here.
    if (!VISUAL_TYPES.includes(visual?.type) || !visual.stages) return '';
    const frame = visual.stages[STAGES.includes(stage)?stage:'question'];
    if (stage==='question' && frame.inPrompt) return ''; // The same authored table is already in the prompt.
    return renderVisualFrame(visual.type, frame, stage);
  }
  function renderVisualFrame(type, frame, stage) {
    const visual = {type};
    if (visual.type==='none' || visual.type==='calculationSteps' && !frame.groups.length && !frame.quantities?.length && !frame.boxes && !frame.bars) return '';
    let body = '';
    if (visual.type==='fractionStrip') {
      if(frame.strips) body=`<div class="fractionStripRows">${frame.strips.map(strip=>renderVisualFrame('fractionStrip',strip,stage)).join('')}</div>`;
      else {
      body = `<div class="fractionStrip ${frame.texture==='rope'?'fractionRope':''}" style="--parts:${frame.segments.length}">${frame.segments.map((part,i)=>`<div class="fractionPart ${part.selected?'fractionSelected':''} ${frame.focus?.includes(i)?'fractionFocus':''}${frame.joined?.includes(i)?' fractionJoined':''}">${part.symbols?`<div class="fractionSymbols">${Array.from({length:part.symbols},()=>symbolSvg(frame.symbol)).join('')}</div>`:''}${part.label?`<span>${richText(part.label)}</span>`:''}</div>`).join('')}</div><div class="fractionGroups" style="--parts:${frame.segments.length}">${(frame.groups||[]).map(g=>`<span style="grid-column:${g.from+1} / span ${g.count}">${richText(g.label)}</span>`).join('')}</div><p class="fractionTotal">${richText(frame.totalLabel)}</p>${frame.outsideSymbols?`<div class="fractionOutside">${Array.from({length:frame.outsideSymbols},()=>symbolSvg(frame.symbol)).join('')}</div>`:''}`;
        if(frame.boundaries)body=body.replace(/class="fractionPart /g,(()=>{let i=0;return ()=>`class="fractionPart ${frame.boundaries.includes(i++)?'fractionBoundary ':''}`;})());
      }
    } else if (visual.type==='moneyReceipt') {
      body = `<div class="learningReceipt">${frame.items.map((item,i)=>`<div${frame.highlight?.includes(i)?' class="authoredFocus"':''}><span>${escape(item.label)}</span><strong>${escape(item.amount)}</strong></div>`).join('')}${frame.paid!==undefined?`<div class="receiptPaid"><span>Betaald</span><strong>${escape(frame.paid)}</strong></div>`:''}${frame.change!==undefined?`<div class="receiptChange"><span>Wisselgeld</span><strong>${escape(frame.change)}</strong></div>`:''}</div>${renderGroups(frame.groups)}`;
    } else if (visual.type==='timeLine') body = renderSequence(frame,true);
    else if (capabilities.TYPES.includes(visual.type)) body = capabilities.render(visual.type,frame) + renderGroups(frame.groups);
    else body = renderGroups(frame.groups);
    if (frame.quantities) body+=`<div class="authoredQuantities">${frame.quantities.map(q=>`<div><span>${escape(q.label)}</span><span aria-hidden="true">${'●'.repeat(q.count)}</span></div>`).join('')}</div>`;
    if(frame.boxes)body+=`<div class="learningBoxes" role="group" aria-label="${escape(frame.boxes.label)}">${frame.boxes.labels.map((label,i)=>`<span class="learningBox${frame.boxes.removed?.includes(i)?' learningBoxRemoved':''}" aria-label="${frame.boxes.removed?.includes(i)?'weggehaald':'bak'}">${escape(label)}</span>`).join('')}<p>${escape(frame.boxes.label)}</p></div>`;
    if(frame.bars)body+=`<div class="learningDurationBars">${frame.bars.map(bar=>`<div class="learningDurationBar">${bar.label?`<span>${escape(bar.label)}</span>`:''}${bar.parts?`<div class="learningDurationParts">${bar.parts.map(part=>`<span style="flex:${part.weight}">${escape(part.label)}</span>`).join('')}</div>`:''}</div>`).join('')}</div>`;
    body += (frame.notes||[]).map(note=>`<p class="learningVisualNote">${richText(note)}</p>`).join('');
    return visualContainer(visual.type, stage, body);
  }
  function visualContainer(type, stage, body) {
    return `<div class="learningVisual" data-learning-visual="${type}" data-support-stage="${stage}">${body}</div>`;
  }
  function renderExplanation(question, heading = 'Volledige uitleg') {
    const steps = question.authoredSupport.explanationSteps;
    const layout = explanationLayouts?.[question.id];
    const visual = question.visual, frame = visual?.stages?.explanation;
    const fragments = steps.map(() => '');
    if (layout && frame && !validateExplanationLayout(question).length) {
      if (layout.shared !== undefined) fragments[layout.shared] = renderVisual(visual, 'explanation');
      else {
        if (layout.receipt !== undefined) fragments[layout.receipt] += renderVisualFrame(visual.type, {...frame, groups: [], notes: []}, 'explanation');
        steps.forEach((_, index) => {
          const groups = frame.groups.filter((_, group) => layout.groups[group] === index);
          if (groups.length) fragments[index] += visualContainer(visual.type, 'explanation', renderGroups(groups));
        });
        if (frame.notes?.length) fragments[steps.length - 1] += frame.notes.map(note=>`<p class="learningVisualNote">${escape(note)}</p>`).join('');
      }
    } else if (frame) fragments[steps.length - 1] = renderVisual(visual, 'explanation');
    return `<section class="authoredExplanation" aria-label="${escape(heading)}"><ol role="list">${steps.map((step,index)=>`<li><div class="explanationStepText">${richText(question.authoredSupport.stepParts?.[index] || step)}</div>${fragments[index]}</li>`).join('')}</ol></section>`;
  }
  function validateExplanationLayout(question) {
    const layout = explanationLayouts?.[question.id];
    if (!layout) return []; // Future content uses the complete shared visual fallback.
    const count = question.authoredSupport.explanationSteps.length;
    const validIndex = index => Number.isInteger(index) && index >= 0 && index < count;
    if (layout.shared !== undefined) return validIndex(layout.shared) ? [] : ['Invalid shared visual step'];
    return Array.isArray(layout.groups) && layout.groups.length === question.visual.stages.explanation.groups.length &&
      layout.groups.every(validIndex) && (layout.receipt === undefined || validIndex(layout.receipt)) ? [] : ['Invalid explanation group mapping'];
  }
  const api = {STAGES,VISUAL_TYPES,escape,richText,usesStructuredMoney,parseAnswer,validate,renderVisual,renderExplanation,validateExplanationLayout};
  if (typeof module!=='undefined' && module.exports) module.exports=api;
  global.AtlasChallengeSupport=api;
})(typeof window!=='undefined'?window:globalThis);
