(() => {
  const STORAGE_KEY = "atlas-session-report-v1";
  const CURRENT_KEY = "atlas-session-current-v1";
  const VERSION = 2;
  const ACTIVE_IDLE_MS = 2 * 60 * 1000;
  const SESSION_IDLE_MS = 10 * 60 * 1000;
  const MAX_SESSIONS = 3;
  const params = new URLSearchParams(window.location.search);
  const testOverride = params.get("atlasSessionTest") === "1";
  const disabled =
    params.get("dev") === "editor" ||
    (navigator.webdriver && !testOverride);

  let current = null;
  let resumeLevelInfo = null;
  let nowProvider = () => Date.now();
  let inactivityTimer = null;

  function now() {
    return Number(nowProvider());
  }

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function completedStore() {
    const stored = readJson(STORAGE_KEY, { version: VERSION, sessions: [] });
    return {
      version: VERSION,
      sessions: Array.isArray(stored.sessions) ? stored.sessions.slice(0, MAX_SESSIONS) : []
    };
  }

  function persistCurrent() {
    if (disabled || !current) return;
    current.updatedAt = new Date(now()).toISOString();
    writeJson(CURRENT_KEY, current);
  }

  function checkpoint(at = now()) {
    if (!current) return;
    const sinceLastActivity = Math.max(0, at - current.lastActivityAt);
    const activeUntil = current.lastActivityAt + Math.min(sinceLastActivity, ACTIVE_IDLE_MS);
    if (activeUntil > current.activeCheckpointAt) {
      current.activeMs += activeUntil - current.activeCheckpointAt;
      current.activeCheckpointAt = activeUntil;
    }
  }

  function scheduleInactivityEnd() {
    window.clearTimeout(inactivityTimer);
    if (!current || disabled) return;
    const delay = Math.max(0, current.lastActivityAt + SESSION_IDLE_MS - now());
    inactivityTimer = window.setTimeout(() => end("inactivity", current.lastActivityAt + SESSION_IDLE_MS), delay);
  }

  function recover() {
    if (disabled) return;
    current = readJson(CURRENT_KEY, null);
    if (!current || ![1, VERSION].includes(current.version)) {
      current = null;
      localStorage.removeItem(CURRENT_KEY);
      return;
    }
    // Archive interrupted v1 sessions as recorded; never backfill unobserved metadata.
    if (current.version === 1) { end("schema-upgrade"); return; }
    const recoveredLevel = current.levels?.[current.levels.length - 1];
    if (recoveredLevel) {
      resumeLevelInfo = {
        adventureId: current.adventureId,
        adventureTitle: current.adventureTitle,
        m6Percentage: current.m6Percentage ?? null,
        levelId: recoveredLevel.id,
        levelTitle: recoveredLevel.title
      };
    }
    if (now() - current.lastActivityAt >= SESSION_IDLE_MS) {
      end("inactivity", current.lastActivityAt + SESSION_IDLE_MS);
      return;
    }
    checkpoint();
    persistCurrent();
    scheduleInactivityEnd();
  }

  function createSession(levelInfo) {
    const startedAt = now();
    current = {
      version: VERSION,
      id: `atlas-${startedAt}-${Math.random().toString(36).slice(2, 8)}`,
      status: "active",
      adventureId: levelInfo.adventureId,
      adventureTitle: levelInfo.adventureTitle,
      m6Percentage: Number.isInteger(levelInfo.m6Percentage) ? levelInfo.m6Percentage : null,
      startedAt,
      lastActivityAt: startedAt,
      activeCheckpointAt: startedAt,
      activeMs: 0,
      levels: [],
      questions: [],
      currentQuestionKey: null
    };
    visitLevel(levelInfo);
    persistCurrent();
    scheduleInactivityEnd();
  }

  function startOrVisitLevel(levelInfo) {
    if (disabled || !levelInfo?.levelId) return;
    resumeLevelInfo = { ...levelInfo };
    if (!current) createSession(levelInfo);
    else visitLevel(levelInfo);
  }

  function visitLevel(levelInfo) {
    if (!current) return;
    const existing = current.levels.find((entry) => entry.id === levelInfo.levelId);
    if (!existing) {
      current.levels.push({
        id: levelInfo.levelId,
        title: levelInfo.levelTitle,
        visitedAt: now(),
        completedAt: null
      });
    }
    activity();
  }

  function completeLevel(levelId) {
    if (disabled || !current) return;
    const entry = current.levels.find((levelEntry) => levelEntry.id === levelId);
    if (entry && !entry.completedAt) entry.completedAt = now();
    activity();
  }

  function questionKey(context) {
    return [context.levelId, context.challengeId, context.slotId, context.variantId].join(":");
  }

  function classifyQuestion(question) {
    if (question.reportLabel) return { category: question.reportLabel.split(' · ')[0], detail: question.reportLabel };
    const family = String(question.family || "");
    const prompt = String(question.prompt || "");
    if (question.visual?.type === "clock") {
      const minute = Number(question.visual.minute);
      let subtype = "Vijf of tien minuten";
      if (minute === 0) subtype = "Hele uren";
      else if (minute === 30) subtype = "Halve uren";
      else if (minute === 15 || minute === 45) subtype = "Kwartieren";
      return { category: "Klokkijken", detail: subtype };
    }
    if (question.presentation === "story") {
      return { category: "Verhaalsommen", detail: family.includes("division") ? "Delen" : "Vermenigvuldigen" };
    }
    if (family.includes("division") || /\d+\s*:\s*\d+/.test(prompt)) {
      const divisor = prompt.match(/:\s*(\d+)/)?.[1];
      return { category: "Delen", detail: divisor ? `Delen door ${divisor}` : "Delen" };
    }
    const factors = [...prompt.matchAll(/\b(\d+)\s*[×x]\s*(\d+)\b/gi)][0];
    const table = factors ? Number(factors[2]) : null;
    return { category: "Tafels", detail: table >= 2 && table <= 10 ? `Tafel van ${table}` : "Tafels" };
  }

  function beginQuestion(question, context) {
    if (disabled || !current || !question || !context) return;
    const key = questionKey(context);
    let entry = current.questions.find((item) => item.key === key);
    const newlyShown = !entry;
    if (!entry) {
      const classification = classifyQuestion(question);
      entry = {
        key,
        levelId: context.levelId,
        levelTitle: context.levelTitle,
        challengeId: context.challengeId,
        challengeTitle: context.challengeTitle,
        slotId: context.slotId,
        variantId: context.variantId,
        prompt: question.prompt,
        family: question.family || null,
        presentation: question.presentation || null,
        answerMode: question.answerMode || null,
        contentVersion: question.contentVersion ?? null,
        ...(question.centralQuestionId ? {centralQuestionId:question.centralQuestionId, surfaceId:question.surfaceId,
          domain:question.domain, educationalDomain:question.educationalDomain,
          ...(question.promptParts ? {promptParts:JSON.parse(JSON.stringify(question.promptParts))} : {})} : {}),
        learningObjective: question.learningObjective ?? null,
        reportLabel: question.reportLabel ?? null,
        requestedLearningLevel: question.atlasLearningSelection?.requested ?? null,
        deliveredLearningLevel: question.atlasLearningSelection?.delivered ?? question.learningLevel ?? null,
        requestedDifficulty: question.atlasLearningSelection?.requestedDifficulty ?? null,
        deliveredDifficulty: question.atlasLearningSelection?.deliveredDifficulty ?? question.difficulty ?? null,
        correctAnswerDisplay: question.answerDisplay ?? question.answer ?? null,
        answerHistory: [],
        helpHistory: [],
        explanationShown: false,
        category: classification.category,
        detail: classification.detail,
        shownAt: now(),
        attempts: 0,
        firstTryCorrect: false,
        minnieHint: false,
        mooseHint: false,
        assisted: false,
        completedAt: null,
        responseMs: null,
        outcome: "incomplete"
      };
      current.questions.push(entry);
    }
    current.currentQuestionKey = key;
    // A question may remain on screen across the ten-minute session boundary.
    // Record support still visible on that screen before any new-session answer.
    if (newlyShown && context.supportStage === 'explanation') recordExplanation(question.authoredSupport.explanationSteps, 'continued-question');
    else if (newlyShown && ['minnie','moose'].includes(context.supportStage)) recordHint(context.supportStage, question[context.supportStage === 'minnie' ? 'hintMinnie' : 'hintMoose']);
    activity();
  }

  function activeQuestion() {
    return current?.questions.find((entry) => entry.key === current.currentQuestionKey) || null;
  }

  function recordAttempt(correct, answer = {}) {
    if (disabled || !current) return;
    const question = activeQuestion();
    if (!question || question.completedAt) return;
    question.answerHistory ||= [];
    question.answerHistory.push({ at: now(), raw: answer.raw ?? null, interpreted: answer.interpreted ?? null, unit: answer.unit ?? null, valid: answer.valid !== false, correct: answer.valid === false ? null : correct,
      ...(answer.rawFields ? {rawFields: {...answer.rawFields}, normalizedDisplay: answer.normalizedDisplay ?? null} : {}),
      ...(answer.rawCounts ? {rawCounts:{...answer.rawCounts}, targetCents:answer.targetCents} : {}) });
    if (answer.valid === false) { activity(); return; }
    question.attempts += 1;
    if (question.responseMs === null) question.responseMs = Math.max(0, now() - question.shownAt);
    if (correct) {
      question.firstTryCorrect = question.attempts === 1 && !question.minnieHint && !question.mooseHint && !question.explanationShown;
      question.completedAt = now();
      question.outcome = question.explanationShown ? "afterExplanation" : question.mooseHint
        ? "afterMoose"
        : question.minnieHint
          ? "afterMinnie"
          : question.firstTryCorrect ? "direct" : "afterRetry";
    }
    activity();
  }

  function recordHint(guide, text = null) {
    if (disabled || !current) return;
    const question = activeQuestion();
    if (!question || question.completedAt) return;
    if (guide === "minnie") question.minnieHint = true;
    if (guide === "moose") question.mooseHint = true;
    question.helpHistory ||= [];
    question.helpHistory.push({ stage: guide, at: now(), text });
    activity();
  }

  function recordExplanation(steps, source = "automatic") {
    if (disabled || !current) return;
    const question = activeQuestion();
    if (!question || question.completedAt) return;
    question.explanationShown = true;
    question.helpHistory ||= [];
    question.helpHistory.push({ stage: "explanation", at: now(), source, steps: Array.isArray(steps) ? [...steps] : [String(steps)] });
    activity();
  }

  function recordAssisted() {
    if (disabled || !current) return;
    const question = activeQuestion();
    if (!question || question.completedAt) return;
    question.assisted = true;
    question.completedAt = now();
    question.outcome = "assisted";
    activity();
  }

  function activity(at = now()) {
    if (disabled) return;
    if (!current && resumeLevelInfo) createSession(resumeLevelInfo);
    if (!current) return;
    checkpoint(at);
    current.lastActivityAt = at;
    current.activeCheckpointAt = at;
    persistCurrent();
    scheduleInactivityEnd();
  }

  function end(reason = "menu", endedAt = now()) {
    if (disabled) return null;
    if (!current) {
      if (reason !== "inactivity") resumeLevelInfo = null;
      return null;
    }
    checkpoint(endedAt);
    const finished = {
      ...current,
      status: "unchecked",
      endedAt,
      endReason: reason,
      elapsedMs: Math.max(0, endedAt - current.startedAt)
    };
    delete finished.activeCheckpointAt;
    delete finished.lastActivityAt;
    delete finished.updatedAt;
    delete finished.currentQuestionKey;
    const store = completedStore();
    if (store.sessions.length < MAX_SESSIONS) {
      store.sessions.unshift(finished);
      writeJson(STORAGE_KEY, store);
    }
    current = null;
    if (reason !== "inactivity") resumeLevelInfo = null;
    window.clearTimeout(inactivityTimer);
    localStorage.removeItem(CURRENT_KEY);
    return finished;
  }

  function discard() {
    current = null;
    resumeLevelInfo = null;
    window.clearTimeout(inactivityTimer);
    localStorage.removeItem(CURRENT_KEY);
  }

  function deleteSession(id) {
    const store = completedStore();
    const next = store.sessions.filter((session) => session.id !== id);
    if (next.length === store.sessions.length) return false;
    writeJson(STORAGE_KEY, { version: VERSION, sessions: next });
    return true;
  }

  function getSessions() {
    return completedStore().sessions.sort((left, right) => right.endedAt - left.endedAt);
  }

  function getCurrent() {
    return current ? JSON.parse(JSON.stringify(current)) : null;
  }

  function setNowForTest(value) {
    if (!testOverride) return;
    nowProvider = typeof value === "function" ? value : () => Number(value);
  }

  function resetNowForTest() {
    nowProvider = () => Date.now();
  }

  window.AtlasSessionReport = {
    storageKey: STORAGE_KEY,
    currentKey: CURRENT_KEY,
    disabled,
    startOrVisitLevel,
    completeLevel,
    beginQuestion,
    recordAttempt,
    recordHint,
    recordExplanation,
    recordAssisted,
    activity,
    end,
    discard,
    deleteSession,
    getSessions,
    getCurrent,
    classifyQuestion,
    setNowForTest,
    resetNowForTest
  };

  recover();
  ["pointerdown", "keydown", "input"].forEach((eventName) => {
    window.addEventListener(eventName, () => activity(), { passive: true });
  });
})();
