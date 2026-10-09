(function (global) {
  'use strict';
  const TYPES = ['none', 'currency', 'digitalClock', 'analogueClock', 'numberLine', 'measurement', 'compactDataTable'];
  const DENOMINATIONS = Object.freeze([5,10,20,50,100,200,500,1000,2000,5000]);
  const UNITS = ['mm','cm','dm','m','g','kg'];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const amount = cents => `€${Math.floor(cents/100)},${String(cents%100).padStart(2,'0')}`;
  const validCents = value => Number.isSafeInteger(value) && value >= 0;
  const currencyAssetForCents = cents => {
    if (!DENOMINATIONS.includes(cents)) throw new Error(`Unsupported currency asset: ${cents} cents`);
    return `assets/ui/currency/${cents}.png`;
  };
  function fraction(value) {
    return `<span class="authoredFraction" role="img" aria-label="${escape(value.numerator)} gedeeld door ${escape(value.denominator)}"><span aria-hidden="true">${escape(value.numerator)}</span><span aria-hidden="true">${escape(value.denominator)}</span></span>`;
  }
  function richText(value) {
    if (Array.isArray(value)) return value.map(richText).join('');
    if (value?.strong) return `<strong>${richText(value.strong)}</strong>`;
    if (value?.table) return renderTable(value.table);
    if (value?.emphasis && 'numerator' in value) return `<strong>${fraction(value)}</strong>`;
    if (value && typeof value === 'object' && 'numerator' in value) return fraction(value);
    return escape(value).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }
  function text(value) {
    if (Array.isArray(value)) return value.map(text).join('');
    if (value?.strong) return `**${text(value.strong)}**`;
    if (value?.table) return value.source;
    if (value?.emphasis && 'numerator' in value) return `**${value.numerator}/${value.denominator}**`;
    if (value && typeof value === 'object' && 'numerator' in value) return `${value.numerator}/${value.denominator}`;
    return String(value ?? '');
  }
  function validateRich(value, errors) {
    if (Array.isArray(value)) value.forEach(v => validateRich(v, errors));
    else if (value && typeof value === 'object') {
      if ('numerator' in value || 'denominator' in value) {
        if (!Number.isInteger(value.numerator) || !Number.isInteger(value.denominator) || value.denominator <= 0) errors.push('fraction requires integer numerator and positive denominator');
      } else Object.values(value).forEach(v => validateRich(v, errors));
    }
  }
  function validateCurrency(data, errors, assetExists) {
    if (!['count','compose','change'].includes(data.mode)) errors.push('invalid currency mode');
    const denomination = n => {
      try { const asset = currencyAssetForCents(n); if (assetExists && !assetExists(asset)) errors.push(`Missing currency asset: ${asset}`); }
      catch(error) { errors.push(error.message); }
    };
    if (data.mode === 'count') {
      if (!Array.isArray(data.items) || !data.items.length) errors.push('currency count requires items');
      else data.items.forEach(item => { denomination(item.denomination); if (!Number.isInteger(item.count) || item.count < 1 || item.count > 20) errors.push('currency count must be 1–20'); });
    } else {
      if (!Array.isArray(data.denominations) || !data.denominations.length || new Set(data.denominations).size !== data.denominations.length) errors.push('currency requires unique denominations');
      else data.denominations.forEach(denomination);
      if (data.mode === 'compose' && (!validCents(data.targetCents) || data.targetCents === 0)) errors.push('invalid target cents');
      if (data.mode === 'change' && (!validCents(data.priceCents) || !validCents(data.paidCents) || data.paidCents <= data.priceCents)) errors.push('invalid price/paid cents');
    }
  }
  function validateFrame(type, frame, assetExists) {
    const errors = []; validateRich(frame, errors);
    if (type === 'currency') validateCurrency(frame, errors, assetExists);
    if (['digitalClock','analogueClock'].includes(type) && (!Number.isInteger(frame.hour) || frame.hour < 0 || frame.hour > 23 || !Number.isInteger(frame.minute) || frame.minute < 0 || frame.minute > 59)) errors.push('invalid clock');
    if (frame.highlightNumerals?.some(n=>!Number.isInteger(n)||n<1||n>12) || frame.referenceMinute!==undefined && (!Number.isInteger(frame.referenceMinute)||frame.referenceMinute<0||frame.referenceMinute>59)) errors.push('invalid clock emphasis');
    if (type === 'numberLine') {
      if (!Number.isFinite(frame.min) || !Number.isFinite(frame.max) || frame.min >= frame.max) errors.push('invalid number-line range');
      if (!Array.isArray(frame.markers) || frame.markers.some(m => !Number.isFinite(m.value) || m.value < frame.min || m.value > frame.max || m.label === undefined)) errors.push('invalid authored number-line markers');
      if (frame.jumps?.some(j=>![j.from,j.to].every(n=>Number.isFinite(n)&&n>=frame.min&&n<=frame.max)||j.from===j.to||typeof j.label!=='string')) errors.push('invalid authored number-line jumps');
    }
    if (type === 'measurement') {
      const sources=frame.sourceGroups?.flat()||frame.sources||(frame.source?[frame.source]:[]);
      if (!sources.length || sources.some(s=>!Number.isFinite(s.value)||!UNITS.includes(s.unit)) || !UNITS.includes(frame.targetUnit) || frame.multiplier!==undefined&&(!Number.isInteger(frame.multiplier)||frame.multiplier<1)) errors.push('invalid measurement value/units');
    }
    if (type === 'compactDataTable') {
      if (!Array.isArray(frame.columns)||frame.columns.length<2||!frame.columns.every(c=>typeof c==='string'&&c)||!Array.isArray(frame.rows)||!frame.rows.length||frame.rows.some(row=>!Array.isArray(row)||row.length!==frame.columns.length||row.some(v=>!['string','number'].includes(typeof v)))) errors.push('invalid authored table');
      const row=n=>Number.isInteger(n)&&n>=0&&n<frame.rows?.length, col=n=>Number.isInteger(n)&&n>=0&&n<frame.columns?.length;
      if (frame.highlightRows?.some(n=>!row(n))||frame.highlightCells?.some(p=>!Array.isArray(p)||p.length!==2||!row(p[0])||!col(p[1]))) errors.push('invalid table highlighting');
    }
    if (type==='currency' && frame.rows && (!Array.isArray(frame.rows)||frame.rows.flat().length!==frame.items?.length||new Set(frame.rows.flat()).size!==frame.items?.length||frame.rows.flat().some(i=>!Number.isInteger(i)||i<0||i>=frame.items.length))) errors.push('invalid currency grouping');
    return errors;
  }
  function renderTable(frame) {
    return `<table class="compactDataTable"><thead><tr>${frame.columns.map(c=>`<th scope="col">${richText(c)}</th>`).join('')}</tr></thead><tbody>${frame.rows.map((row,r)=>`<tr class="${frame.highlightRows?.includes(r)?'authoredFocus':''}">${row.map((cell,c)=>`<${c?'td':'th scope="row"'} class="${frame.highlightCells?.some(([ri,ci])=>ri===r&&ci===c)?'authoredFocus':''}">${richText(cell)}</${c?'td':'th'}>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
function renderClockVisual(visual) {
  if (visual?.type === 'digitalClock') return renderDigitalClock(visual);
  if (visual?.type !== "clock") return "";
  const hour = Number(visual.hour);
  const minute = Number(visual.minute);
  const minuteAngle = minute * 6;
  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const numerals = Array.from({ length: 12 }, (_, index) => {
    const value = index + 1;
    const angle = (value * 30 * Math.PI) / 180;
    const x = 120 + Math.sin(angle) * 88;
    const y = 120 - Math.cos(angle) * 88;
    return `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}">${value}</text>`;
  }).join("");

  return `
    <div
      class="authoredClock"
      data-clock-visual
      data-clock-hour="${hour}"
      data-clock-minute="${minute}"
      data-hour-angle="${hourAngle}"
      data-minute-angle="${minuteAngle}"
      role="img"
      aria-label="Analoge klok"
    >
      <svg viewBox="0 0 240 240" aria-hidden="true">
        <circle class="clockFace" cx="120" cy="120" r="112"></circle>
        <g class="clockNumerals">${numerals}</g>
        <line class="clockHand clockHourHand" x1="120" y1="120" x2="120" y2="64" transform="rotate(${hourAngle} 120 120)"></line>
        <line class="clockHand clockMinuteHand" x1="120" y1="120" x2="120" y2="34" transform="rotate(${minuteAngle} 120 120)"></line>
        <circle class="clockPin" cx="120" cy="120" r="7"></circle>
      </svg>
    </div>
  `;
}
  function render(type, frame) {
    if (type === 'currency') {
      const itemHTML=item=>`<div class="currencyGroup">${Array.from({length:item.count},()=>`<img src="${currencyAssetForCents(item.denomination)}" alt="${amount(item.denomination)}" class="currencyAsset ${item.denomination>=500?'currencyNote':'currencyCoin'}" />`).join('')}</div>`;
      return frame.mode === 'count' ? `<div class="currencyCollection">${frame.rows?frame.rows.map(row=>`<div class="currencyAuthoredRow">${row.map(i=>itemHTML(frame.items[i])).join('')}</div>`).join(''):frame.items.map(itemHTML).join('')}</div>` : (frame.label ? `<p>${richText(frame.label)}</p>` : '') + (frame.highlightDenominations||[]).map(d=>`<img class="currencyAsset authoredFocus" src="${currencyAssetForCents(d)}" alt="${amount(d)}" />`).join('');
    }
    if (type === 'compactDataTable') return renderTable(frame);
    if (type === 'digitalClock') return renderDigitalClock(frame);
    if (type === 'analogueClock') {
      let html=renderClockVisual({...frame,type:'clock'});
      if (frame.highlightHand) html=html.replace(frame.highlightHand==='minute'?'clockMinuteHand':'clockHourHand',`${frame.highlightHand==='minute'?'clockMinuteHand':'clockHourHand'} clockHandFocus`);
      for(const n of frame.highlightNumerals||[])html=html.replace(new RegExp(`<text ([^>]+)>${n}</text>`),`<text $1 class="clockNumeralFocus">${n}</text>`);
      if(frame.referenceMinute!==undefined)html=html.replace('</svg>',`<line class="clockReference" x1="120" y1="18" x2="120" y2="38" transform="rotate(${frame.referenceMinute*6} 120 120)"/></svg>`);
      return html+(frame.referenceLabel?`<p>${richText(frame.referenceLabel)}</p>`:'');
    }
    if (type === 'numberLine') {
      const position=n=>100*(n-frame.min)/(frame.max-frame.min);
      const jumps=(frame.jumps||[]).map(j=>{const a=position(j.from)*10,b=position(j.to)*10;return `<g><path d="M${a} 90 Q${(a+b)/2} 0 ${b} 90"/><text x="${(a+b)/2}" y="38">${escape(j.label)}</text></g>`;}).join('');
      return `<div class="authoredNumberLine ${frame.jumps?'stagedNumberLine':''}" role="img" aria-label="Getallenlijn">${jumps?`<svg class="numberLineJumps" viewBox="-25 0 1050 110" aria-hidden="true">${jumps}</svg>`:''}<div class="numberLineTrack">${frame.markers.map(m=>`<span class="numberLineMarker ${m.focus?'numberLineFocus':''}" style="--marker-position:${position(m.value)}%;--marker-lane:${m.lane||0}"><span>${richText(m.label)}</span></span>`).join('')}</div></div>`;
    }
    if (type === 'measurement') {
      const unit=s=>`${richText(s.value)} <strong>${escape(s.unit)}</strong>`;
      const source=frame.sourceGroups?frame.sourceGroups.map(g=>g.map(unit).join(' ')).join(' + '):(frame.sources||[frame.source]).map(unit).join(' ');
      return `<div class="authoredMeasurement"><span>${frame.multiplier?`${frame.multiplier} × `:''}${source}</span><span aria-hidden="true">→</span><span>${frame.targetLabel === undefined ? '?' : richText(frame.targetLabel)} <strong>${escape(frame.targetUnit)}</strong></span></div>${frame.pieces?`<div class="measurementPieces">${frame.pieces.map(p=>`<span>${richText(p)}</span>`).join('')}</div>`:''}`;
    }
    return '';
  }
  const usesCurrency = q => q.learningLevel === 'M6' && q.answerMode === 'currencyCompose' && q.answerSpec?.type === 'currency';
  const target = spec => spec.mode === 'change' ? spec.paidCents-spec.priceCents : spec.targetCents;
  function parseCurrency(question, raw) {
    const spec = question.answerSpec, rawCounts = raw && typeof raw === 'object' && !Array.isArray(raw) ? {...raw} : {};
    const allowed = spec.denominations.map(String);
    let valid = raw !== null && typeof raw === 'object' && !Array.isArray(raw) && Object.keys(raw).every(k => allowed.includes(k));
    let total = 0;
    for (const denomination of allowed) {
      const count = rawCounts[denomination] ?? '0';
      if (!(typeof count === 'string' && /^\d{1,3}$/.test(count)) || Number(count) > 99) valid = false;
      total += Number(count)*Number(denomination);
    }
    valid = valid && Number.isSafeInteger(total) && total > 0;
    return {raw:JSON.stringify(raw) ?? String(raw), rawCounts, interpreted:valid?total:null, targetCents:target(spec), unit:'cents', valid, correct:valid && total === target(spec)};
  }
  function renderCurrencyControls(spec, draft = {}) {
    return `<div class="currencyComposer" role="group" aria-label="Stel het bedrag samen">${spec.denominations.map(d=>`<div class="currencyCounter"><img class="currencyAsset ${d>=500?'currencyNote':'currencyCoin'}" src="${currencyAssetForCents(d)}" alt="${amount(d)}"/><div><button type="button" data-currency-step="-1" data-denomination="${d}" aria-label="Minder ${amount(d)}">−</button><input form="challenge-currency-answer" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" autocomplete="off" aria-label="Aantal ${amount(d)}" data-currency-count="${d}" value="${escape(draft[d] ?? '0')}"/><button type="button" data-currency-step="1" data-denomination="${d}" aria-label="Meer ${amount(d)}">+</button></div></div>`).join('')}</div>`;
  }
  // Physical seven-segment geometry, shared by flat E5 clock data and M6 stages.
  // No text font, SVG IDs, timers or raster assets; each instance scales independently.
  const DIGIT_SEGMENTS = ['abcdef','bc','abdeg','abcdg','bcfg','acdfg','acdefg','abc','abcdefg','abcdfg'];
  const SEGMENT_PATHS = {
    a:'M10 2H46L52 8 46 14H10L4 8Z',
    b:'M50 10 56 16V40L50 46 44 40V16Z',
    c:'M50 50 56 56V80L50 86 44 80V56Z',
    d:'M10 82H46L52 88 46 94H10L4 88Z',
    e:'M6 50 12 56V80L6 86 0 80V56Z',
    f:'M6 10 12 16V40L6 46 0 40V16Z',
    g:'M10 42H46L52 48 46 54H10L4 48Z'
  };
  function renderDigitalClock({hour,minute,highlightHours=false,highlightMinutes=false,compact=false}) {
    if (!Number.isInteger(hour)||hour<0||hour>23||!Number.isInteger(minute)||minute<0||minute>59) return '';
    const hours=String(hour).padStart(2,'0'),minutes=String(minute).padStart(2,'0');
    const digits=(hours+minutes).split('').map((digit,i)=>`<g data-clock-digit="${digit}" class="digitalClockDigit ${(i<2?highlightHours:highlightMinutes)?'digitalClockFocus':''}" transform="translate(${[4,70,174,240][i]},2)">${Object.entries(SEGMENT_PATHS).map(([segment,d])=>`<path data-segment="${segment}" class="digitalSegment ${DIGIT_SEGMENTS[Number(digit)].includes(segment)?'digitalSegmentOn':'digitalSegmentOff'}" d="${d}"/>`).join('')}</g>`).join('');
    return `<div class="authoredDigitalClock${compact?' digitalClockCompact':''}" data-clock-visual="digital" data-clock-hour="${hour}" data-clock-minute="${minute}" role="img" aria-label="Digitale klok: ${hours}:${minutes}"><div class="digitalClockDisplay"><svg viewBox="0 0 300 100" aria-hidden="true" focusable="false">${digits}<g class="digitalClockColon"><rect x="151" y="29" width="8" height="8" rx="1.5"/><rect x="151" y="63" width="8" height="8" rx="1.5"/></g></svg></div></div>`;
  }
  const api = {renderClockVisual,renderDigitalClock,TYPES,DENOMINATIONS,currencyAssetForCents,richText,text,validateRich,validateCurrency,validateFrame,render,usesCurrency,parseCurrency,renderCurrencyControls};
  if (typeof module !== 'undefined' && module.exports) module.exports=api;
  global.AtlasChallengeCapabilities=api;
})(typeof window !== 'undefined' ? window : globalThis);
