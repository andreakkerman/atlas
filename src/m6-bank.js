(function (global) {
  'use strict';
  const support = typeof module !== 'undefined' && module.exports ? require('./challenge-support') : global.AtlasChallengeSupport;
  const capabilities = typeof module !== 'undefined' && module.exports ? require('./challenge-capabilities') : global.AtlasChallengeCapabilities;
  const HISTORY_KEY = 'atlas.learning.m6Recent';
  const HISTORY_LIMIT = 128;
  const clone = value => JSON.parse(JSON.stringify(value));
  function freeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      Object.values(value).forEach(freeze);
      Object.freeze(value);
    }
    return value;
  }
  // Substitution is literal and recursive, never a grammar or arithmetic generator.
  function renderTokens(value, tokens) {
    if (typeof value === 'string') return value.replace(/\{([A-Za-z][\w]*)\}/g, (_, key) => {
      if (!Object.hasOwn(tokens, key) || !['string', 'number'].includes(typeof tokens[key])) throw new Error(`Missing narrative token: ${key}`);
      const text = String(tokens[key]);
      if (/\{[A-Za-z][\w]*\}/.test(text)) throw new Error(`Unresolved narrative token: ${key}`);
      return text;
    });
    if (Array.isArray(value)) return value.map(item => renderTokens(item, tokens));
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, renderTokens(item, tokens)]));
    return value;
  }
  function instantiate(record, surfaceId = record.surfaces[0].id) {
    const surface = record.surfaces.find(item => item.id === surfaceId);
    if (!surface) throw new Error(`Unknown surface ${record.id}/${surfaceId}`);
    const {educationalCore, surfaces, ...metadata} = record;
    const {id, tokens: narrativeTokens = {}, ...copy} = surface;
    const coreTokens = educationalCore.tokens || {};
    if (Object.keys(narrativeTokens).some(key => Object.hasOwn(coreTokens,key))) throw new Error('Narrative bundle cannot override educational core tokens');
    const rendered = renderTokens(copy, {...coreTokens,...narrativeTokens});
    for (const key of ['prompt','hintMinnie','hintMoose']) if (Array.isArray(rendered[key])) {
      rendered[`${key}Parts`] = rendered[key]; rendered[key] = capabilities.text(rendered[key]);
    }
    if (rendered.authoredSupport?.explanationSteps.some(Array.isArray)) {
      rendered.authoredSupport.stepParts = rendered.authoredSupport.explanationSteps;
      rendered.authoredSupport.explanationSteps = rendered.authoredSupport.stepParts.map(capabilities.text);
      rendered.explanation = rendered.authoredSupport.explanationSteps.join('\n\n');
    }
    return freeze({...clone(metadata), ...clone(educationalCore.question), ...rendered,
      centralQuestionId: record.id, surfaceId: id, educationalCore: clone(educationalCore)});
  }
  function validateRecords(records, assetExists) {
    const errors = [], ids = new Set();
    if (!Array.isArray(records)) return ['M6 bank must be an array'];
    for (const record of records) {
      const fail = message => errors.push(`${record?.id || '<missing ID>'}: ${message}`);
      if (!record || typeof record !== 'object') { fail('record must be an object'); continue; }
      for (const key of ['id', 'domain', 'educationalDomain', 'learningObjective', 'reportLabel']) if (typeof record[key] !== 'string' || !record[key].trim()) fail(`${key} is required`);
      if (ids.has(record.id)) fail('duplicate ID'); ids.add(record.id);
      if (!(typeof record.contentVersion === 'string' && record.contentVersion.trim()) && !(Number.isInteger(record.contentVersion) && record.contentVersion > 0)) fail('contentVersion is required');
      if (record.learningLevel !== 'M6' || ![1,2,3].includes(record.difficulty)) fail('M6 and difficulty 1/2/3 required');
      for (const key of ['allowedLevels','allowedChallenges','worldId','worldIds','levelId','levelIds','challengeId','challengeIds','themeId']) if (key in record) fail(`${key} is not a content eligibility filter`);
      if (!record.educationalCore?.values || !record.educationalCore?.question) fail('explicit educationalCore values and question contract required');
      for (const key of Object.keys(record.educationalCore?.question || {})) if (!['answer','answerSpec','choices','choiceParts'].includes(key)) fail(`educationalCore.question cannot override ${key}`);
      const surfaces = record.surfaces;
      if (!Array.isArray(surfaces) || !surfaces.length) { fail('at least one authored surface required'); continue; }
      const surfaceIds = new Set();
      for (const surface of surfaces) {
        if (typeof surface?.id !== 'string' || !surface.id.trim() || surfaceIds.has(surface.id)) fail('missing or duplicate surface ID');
        surfaceIds.add(surface?.id);
        // Surfaces contain prose and staged illustration only. They cannot replace the core contract.
        const allowed = ['id','tokens','prompt','answerDisplay','hintMinnie','hintMoose','explanation','authoredSupport','visual'];
        for (const key of Object.keys(surface || {})) if (!allowed.includes(key)) fail(`surface cannot override ${key}`);
        try {
          const question = instantiate(record, surface.id);
          if (typeof question.prompt !== 'string' || !question.prompt.trim() || !question.authoredSupport) fail('prompt and authored support required');
          if (!['bare','story'].includes(question.presentation) || typeof question.family !== 'string' || !question.family) fail('authored presentation and family required');
          if (!(Number.isFinite(question.answer) || typeof question.answer === 'string' && question.answer.trim())) fail('canonical answer required');
          if (!['open','multipleChoice','currencyCompose'].includes(question.answerMode)) fail('unknown answerMode');
          const contracts = {open:['wholeNumber','euro'], multipleChoice:['choice'], currencyCompose:['currency']};
          if (!contracts[question.answerMode]?.includes(question.answerSpec?.type)) fail('answerMode and answer contract must agree');
          if (question.answerMode === 'multipleChoice' && (!Array.isArray(question.choices) || question.choices.length < 2 || new Set(question.choices.map(String)).size !== question.choices.length || !question.choices.includes(question.answer) || question.answerSpec?.type !== 'choice')) fail('invalid choices');
          if (question.choiceParts && Object.entries(question.choiceParts).some(([key,parts])=>!question.choices.includes(key)||capabilities.text(parts)!==key)) fail('choice presentation must preserve the canonical value');
          errors.push(...support.validate(question, assetExists), ...support.validateExplanationLayout(question));
        } catch (error) { fail(error.message); }
      }
    }
    return errors;
  }
  function createHistory(storage) {
    let entries = [];
    try {
      storage ||= global.localStorage;
      const raw = JSON.parse(storage?.getItem(HISTORY_KEY));
      if (Array.isArray(raw)) {
        const seen = new Set();
        entries = raw.slice(-HISTORY_LIMIT).reverse().filter(e => {
          if (!e || typeof e.id !== 'string' || !e.id || e.id.length > 160 || typeof e.surfaceId !== 'string' || !e.surfaceId || e.surfaceId.length > 160 || seen.has(e.id)) return false;
          seen.add(e.id); return true;
        }).reverse().map(({id,surfaceId}) => ({id,surfaceId}));
      }
    } catch { /* A corrupt or unavailable history never blocks play. */ }
    return {
      get entries() { return entries.map(e => ({...e})); },
      remember(id, surfaceId) {
        entries = entries.filter(e => e.id !== id);
        entries.push({id, surfaceId}); entries = entries.slice(-HISTORY_LIMIT);
        try { storage?.setItem(HISTORY_KEY, JSON.stringify(entries)); } catch { /* Keep bounded memory history. */ }
      },
      clear() { entries = []; try { storage?.removeItem(HISTORY_KEY); } catch { /* memory still cleared */ } }
    };
  }
  function createBank(records, {assetExists} = {}) {
    const errors = validateRecords(records, assetExists);
    if (errors.length) throw new Error(errors.join('\n'));
    const byId = new Map(), byDifficulty = new Map(), byDomain = new Map(), byObjective = new Map();
    const add = (map, key, record) => { if (!map.has(key)) map.set(key, []); map.get(key).push(record); };
    for (const record of records) {
      freeze(record); byId.set(record.id, record);
      add(byDifficulty, record.difficulty, record); add(byDomain, record.educationalDomain, record); add(byObjective, record.learningObjective, record);
    }
    const metadata = Object.freeze([...byId.values()].map(r => Object.freeze({id:r.id, difficulty:r.difficulty, domain:r.educationalDomain, objective:r.learningObjective})));
    return Object.freeze({
      size: byId.size, metadata,
      get: id => byId.get(id),
      recover: (id, surfaceId) => byId.has(id) ? instantiate(byId.get(id), surfaceId) : null,
      idsFor: (field, value) => (field === 'difficulty' ? byDifficulty : field === 'domain' ? byDomain : byObjective).get(value)?.map(r => r.id) || [],
      select(difficulty, {used = [], history, random = Math.random, domain, excludeDomain, allowedDifficulties} = {}) {
        const usedIds = new Set(used.map(q => q.centralQuestionId || q.id));
        let eligible = domain ? byDomain.get(domain)||[] : null;
        if (excludeDomain) eligible = (eligible || [...byId.values()]).filter(r => r.educationalDomain !== excludeDomain);
        if (allowedDifficulties) eligible = (eligible || [...byId.values()]).filter(r => allowedDifficulties.includes(r.difficulty));
        // Domain and difficulty limits also apply when used IDs or recent history are exhausted.
        const difficulties = [...(eligible?new Set(eligible.map(r=>r.difficulty)):byDifficulty.keys())].sort((a,b) => Math.abs(a-difficulty)-Math.abs(b-difficulty) || a-b);
        const bucket = d => eligible?eligible.filter(r=>r.difficulty===d):byDifficulty.get(d);
        // Distinct IDs win over an exhausted difficulty bucket; never reroll a whole challenge.
        let pool;
        for (const d of difficulties) { const available = bucket(d).filter(r => !usedIds.has(r.id)); if (available.length) { pool=available; break; } }
        pool ||= bucket(difficulties[0]);
        if (!pool?.length) return null;
        const recent = history?.entries || [], recency = new Map(recent.map((e,i) => [e.id,i]));
        const unseen = pool.filter(r => !recency.has(r.id));
        if (unseen.length) pool = unseen;
        else { const oldest = Math.min(...pool.map(r => recency.get(r.id))); pool = pool.filter(r => recency.get(r.id) === oldest); }
        const objectives = new Set(used.map(q => q.learningObjective)), domains = new Map();
        used.forEach(q => domains.set(q.educationalDomain, (domains.get(q.educationalDomain)||0)+1));
        const score = r => (objectives.has(r.learningObjective) ? 10 : 0) + ((domains.get(r.educationalDomain)||0) >= 2 ? 4 : 0);
        const best = Math.min(...pool.map(score)); pool = pool.filter(r => score(r) === best);
        const record = pool[Math.min(pool.length-1, Math.floor(random()*pool.length))];
        const previous = recent.find(e => e.id === record.id)?.surfaceId;
        const alternatives = record.surfaces.filter(s => s.id !== previous);
        const surfaces = alternatives.length ? alternatives : record.surfaces;
        const surface = surfaces[Math.min(surfaces.length-1, Math.floor(random()*surfaces.length))];
        const question = instantiate(record, surface.id);
        history?.remember(record.id, surface.id);
        return question;
      }
    });
  }
  function audit(records) {
    const result = {total:records.length, difficulty:{}, domains:{}, objectives:{}, visualTypes:{}, missingReportLabels:[], duplicateIds:[], duplicateEducationalCores:[], singleSurface:0, multipleSurfaces:0};
    const ids = new Set(), cores = new Map();
    const count = (group, key) => { group[key] = (group[key]||0)+1; };
    for (const r of records) {
      count(result.difficulty,r.difficulty); count(result.domains,r.educationalDomain); count(result.objectives,r.learningObjective);
      if (!r.reportLabel) result.missingReportLabels.push(r.id);
      if (ids.has(r.id)) result.duplicateIds.push(r.id); ids.add(r.id);
      const canonical = value => value && typeof value === 'object' ? Array.isArray(value) ? value.map(canonical) : Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])])) : value;
      const core = JSON.stringify(canonical({domain:r.educationalDomain,values:r.educationalCore?.values}));
      if (cores.has(core)) result.duplicateEducationalCores.push([cores.get(core),r.id]); else cores.set(core,r.id);
      if (r.surfaces?.length === 1) result.singleSurface++; else if (r.surfaces?.length > 1) result.multipleSurfaces++;
      for (const type of new Set((r.surfaces||[]).map(s=>s.visual?.type).filter(Boolean))) count(result.visualTypes,type);
    }
    return result;
  }
  const api = {HISTORY_KEY,HISTORY_LIMIT,instantiate,validateRecords,createHistory,createBank,audit};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AtlasM6Bank = api;
})(typeof window !== 'undefined' ? window : globalThis);
