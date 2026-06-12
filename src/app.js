const app = document.querySelector("#app");
const { level } = window.SVEN_CONTENT;

const ACTOR_FALLBACK_SRC = "assets/sven-stage.png";
const ACTOR_ANIMATIONS = {
  idle: {
    folder: "assets/characters/sven/idle-right",
    frames: 12,
    fps: 8,
    loop: true
  },
  walk: {
    folder: "assets/characters/sven/walk-right",
    frames: 24,
    fps: 15,
    loop: true
  },
  interact: {
    folder: "assets/characters/sven/interact-right",
    frames: 12,
    fps: 12,
    loop: false,
    transitionTo: "idle"
  }
};

const actorPlayback = {
  requestedState: "idle",
  visualState: "idle",
  frameIndex: 0,
  lastFrameAt: 0,
  rafId: null,
  failedSources: new Set()
};

const state = {
  screen: "intro",
  introIndex: 0,
  currentVerb: "activate",
  worldX: level.player.startWorldX,
  svenMood: "idle",
  svenFacing: "right",
  moving: false,
  activeRuneId: null,
  questionIndex: 0,
  selectedWrong: false,
  questionTracked: false,
  completedRunes: new Set(),
  justCompletedRuneId: null,
  totalQuestions: level.runes.reduce((sum, rune) => sum + rune.questions.length, 0),
  answered: 0,
  firstTryCorrect: 0,
  attempts: 0,
  message: level.spiritLines.welcome,
  feedback: ""
};

function frameSrc(animationName, frameIndex) {
  const animation = ACTOR_ANIMATIONS[animationName] || ACTOR_ANIMATIONS.idle;
  const number = String(frameIndex + 1).padStart(2, "0");
  return `${animation.folder}/frame-${number}.png`;
}

function actorStateForMood() {
  if (state.svenMood === "walking") return "walk";
  if (["arrived", "activating", "looking", "talking"].includes(state.svenMood)) return "interact";
  return "idle";
}

function preloadActorAnimations() {
  Object.values(ACTOR_ANIMATIONS).forEach((animation) => {
    for (let index = 0; index < animation.frames; index += 1) {
      const image = new Image();
      image.src = frameSrc(Object.keys(ACTOR_ANIMATIONS).find((key) => ACTOR_ANIMATIONS[key] === animation), index);
    }
  });
}

function requestActorAnimation(animationName) {
  const next = ACTOR_ANIMATIONS[animationName] ? animationName : "idle";
  actorPlayback.requestedState = next;
  if (actorPlayback.visualState !== next) {
    actorPlayback.visualState = next;
    actorPlayback.frameIndex = 0;
    actorPlayback.lastFrameAt = 0;
  }
  if (!actorPlayback.rafId) {
    actorPlayback.rafId = window.requestAnimationFrame(updateActorAnimation);
  }
}

function setActorFrame() {
  const actor = document.querySelector("[data-actor='sven']");
  if (!actor) return;

  const src = frameSrc(actorPlayback.visualState, actorPlayback.frameIndex);
  actor.dataset.animation = actorPlayback.visualState;
  actor.dataset.frame = String(actorPlayback.frameIndex + 1);
  actor.src = actorPlayback.failedSources.has(src) ? ACTOR_FALLBACK_SRC : src;
}

function updateActorAnimation(timestamp) {
  actorPlayback.rafId = null;
  if (!document.querySelector("[data-actor='sven']")) return;

  const animation = ACTOR_ANIMATIONS[actorPlayback.visualState] || ACTOR_ANIMATIONS.idle;
  const frameDuration = 1000 / animation.fps;

  if (!actorPlayback.lastFrameAt) {
    actorPlayback.lastFrameAt = timestamp;
    setActorFrame();
  } else if (timestamp - actorPlayback.lastFrameAt >= frameDuration) {
    actorPlayback.lastFrameAt = timestamp;
    if (actorPlayback.frameIndex < animation.frames - 1) {
      actorPlayback.frameIndex += 1;
    } else if (animation.loop) {
      actorPlayback.frameIndex = 0;
    } else {
      requestActorAnimation(animation.transitionTo || "idle");
      return;
    }
    setActorFrame();
  }

  actorPlayback.rafId = window.requestAnimationFrame(updateActorAnimation);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getCameraX() {
  return clamp(state.worldX - 25, 0, 50);
}

function getAreaName() {
  const area = level.areas.find((item) => state.worldX >= item.start && state.worldX <= item.end);
  return area?.name || "Avontuur";
}

function setSvenWorldX(nextX) {
  state.svenFacing = nextX < state.worldX ? "left" : "right";
  state.worldX = nextX;
}

function runeById(id) {
  return level.runes.find((rune) => rune.id === id);
}

function hotspotById(id) {
  return level.hotspots.find((hotspot) => hotspot.id === id);
}

function answerFor(question) {
  return question.a * question.b;
}

function getStoredTableProgress() {
  try {
    return JSON.parse(localStorage.getItem(level.progressKey)) || { version: 1, tables: {} };
  } catch {
    return { version: 1, tables: {} };
  }
}

function saveStoredTableProgress(progress) {
  progress.updatedAt = new Date().toISOString();
  localStorage.setItem(level.progressKey, JSON.stringify(progress));
}

function updateTableProgress(question, result) {
  const table = String(question.a);
  const progress = getStoredTableProgress();
  progress.tables[table] ||= {
    questionsAsked: 0,
    attempts: 0,
    mistakes: 0,
    firstTryCorrect: 0
  };

  const stats = progress.tables[table];
  if (!state.questionTracked) {
    stats.questionsAsked += 1;
    state.questionTracked = true;
  }

  stats.attempts += 1;
  if (result === "mistake") stats.mistakes += 1;
  if (result === "firstTryCorrect") stats.firstTryCorrect += 1;
  saveStoredTableProgress(progress);
}

function getLearningHint(question) {
  const { a, b } = question;
  const low = Math.min(a, b);

  if (a === 9 || b === 9) {
    const other = a === 9 ? b : a;
    return `Bijna. 9 x ${other} is 10 x ${other} min ${other}.`;
  }

  if (a === 8 || b === 8) {
    const other = a === 8 ? b : a;
    return `Bijna. 8 x ${other}: denk aan 4 x ${other}, en dan dubbel.`;
  }

  if (low === 2) {
    return `Bijna. ${a} x ${b} is hetzelfde als ${b} x ${a}.`;
  }

  if (a === 5 || b === 5) {
    const other = a === 5 ? b : a;
    return `Bijna. Tel met sprongen van 5, ${other} keer.`;
  }

  if (a > b) {
    return `Bijna. ${a} groepjes van ${b}. Tel steeds ${b} erbij.`;
  }

  return `Bijna. ${b} groepjes van ${a} mag ook. Dat is dezelfde som.`;
}

function makeChoices(question) {
  const answer = answerFor(question);
  const raw = [
    answer,
    answer + question.a,
    Math.max(1, answer - question.b),
    answer + question.b + 2
  ];
  const unique = [...new Set(raw)].filter((value) => value > 0);

  while (unique.length < 4) {
    unique.push(answer + unique.length + 3);
  }

  return unique.sort((left, right) => {
    const leftKey = (left * 17 + question.a * 5 + question.b * 3) % 29;
    const rightKey = (right * 17 + question.a * 5 + question.b * 3) % 29;
    return leftKey - rightKey;
  });
}

function saveCompletion() {
  const payload = {
    levelId: level.id,
    completedAt: new Date().toISOString(),
    answered: state.answered,
    firstTryCorrect: state.firstTryCorrect,
    attempts: state.attempts
  };
  localStorage.setItem(level.storageKey, JSON.stringify(payload));
}

function getAccuracy() {
  if (state.totalQuestions === 0) return 0;
  return Math.round((state.firstTryCorrect / state.totalQuestions) * 100);
}

function continueIntro() {
  if (state.introIndex < level.intro.length - 1) {
    state.introIndex += 1;
  } else {
    state.screen = "scene";
    state.message = "Je bent in het bos. Kijk rond of volg het pad.";
  }
  render();
}

function selectVerb(verb) {
  state.currentVerb = verb;
  const label = level.verbs.find((item) => item.id === verb)?.label;
  state.message = `${label} gekozen. Tik op iets in de wereld.`;
  render();
}

function beginInteraction(target, kind) {
  if (state.moving) return;

  const verb = state.currentVerb;
  const verbs = kind === "rune" ? ["look", "activate"] : target.verbs;
  if (!verbs.includes(verb)) {
    state.svenMood = "thinking";
    state.message = `Daar kun je nu niet mee ${verb === "talk" ? "praten" : verb === "look" ? "kijken" : "activeren"}.`;
    render();
    return;
  }

  state.moving = true;
  state.svenMood = "walking";
  state.justCompletedRuneId = null;
  setSvenWorldX(target.approachX);
  state.message = `${level.spiritLines.moving} ${target.name}.`;
  render();

  window.setTimeout(() => {
    if (!state.moving) return;
    state.svenMood = verb === "look" ? "looking" : verb === "talk" ? "talking" : "activating";
    if (verb === "activate") {
      state.message =
        kind === "rune"
          ? `Sven raakt ${target.name} aan.`
          : target.id === "templePath"
            ? "Sven kijkt waar het pad heen gaat."
            : `Sven probeert ${target.name}.`;
    }
    render();

    window.setTimeout(() => {
      if (!state.moving) return;
      finishInteraction(target, kind, verb);
    }, verb === "activate" ? 720 : 520);
  }, 760);
}

function finishInteraction(target, kind, verb) {
  if (kind === "rune" && verb === "look") {
    state.moving = false;
    state.svenMood = "looking";
    state.message = state.completedRunes.has(target.id) ? target.solved : target.intro;
    render();
    return;
  }

  if (kind === "rune" && verb === "activate" && state.completedRunes.has(target.id)) {
    state.moving = false;
    state.svenMood = "looking";
    state.message = target.solved;
    render();
    return;
  }

  if (kind === "rune" && verb === "activate") {
    state.moving = false;
    openRuneChallenge(target.id);
    return;
  }

  if (target.id === "templePath" && verb === "activate") {
    travelToTemple(target);
    return;
  }

  if (target.id === "templeGate" && verb === "activate" && state.completedRunes.size === level.runes.length) {
    state.moving = false;
    showReward();
    return;
  }

  state.moving = false;
  state.svenMood = verb === "activate" ? "activating" : verb === "talk" ? "talking" : "looking";
  state.message = target[verb] || "Sven kijkt goed.";
  render();
}

function travelToTemple(pathHotspot) {
  state.svenMood = "walking";
  state.message = pathHotspot.activate;
  setSvenWorldX(pathHotspot.destinationX);
  render();

  window.setTimeout(() => {
    state.moving = false;
    state.svenMood = "idle";
    state.message = "Daar is de tempel. Activeer de drie runen.";
    render();
  }, 920);
}

function openRuneChallenge(id) {
  const rune = runeById(id);
  state.screen = "challenge";
  state.activeRuneId = id;
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.questionTracked = false;
  state.svenMood = "activating";
  state.message = rune.intro;
  state.feedback = rune.intro;
  render();
}

function answerQuestion(choice) {
  const rune = runeById(state.activeRuneId);
  const question = rune.questions[state.questionIndex];
  const correct = answerFor(question);
  state.attempts += 1;

  if (choice !== correct) {
    updateTableProgress(question, "mistake");
    state.selectedWrong = true;
    state.svenMood = "thinking";
    state.feedback = getLearningHint(question);
    render();
    return;
  }

  if (!state.selectedWrong) {
    state.firstTryCorrect += 1;
    updateTableProgress(question, "firstTryCorrect");
  } else {
    updateTableProgress(question, "correctAfterRetry");
  }

  state.answered += 1;
  state.svenMood = "celebrating";
  state.feedback = `Ja! ${question.a} x ${question.b} = ${correct}.`;
  state.screen = "correct";
  render();
}

function nextQuestion() {
  const rune = runeById(state.activeRuneId);

  if (state.questionIndex < rune.questions.length - 1) {
    state.questionIndex += 1;
    state.selectedWrong = false;
    state.questionTracked = false;
    state.svenMood = "idle";
    state.feedback = "De rune wil nog een som.";
    state.screen = "challenge";
    render();
    return;
  }

  state.completedRunes.add(rune.id);
  state.justCompletedRuneId = rune.id;
  state.activeRuneId = null;
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.questionTracked = false;
  state.svenMood = "celebrating";
  state.feedback = "";
  state.screen = "scene";

  if (state.completedRunes.size === level.runes.length) {
    state.message = level.spiritLines.allRunes;
  } else {
    state.message = rune.solved;
  }

  render();
}

function showReward() {
  state.screen = "reward";
  saveCompletion();
  render();
}

function restart() {
  state.screen = "intro";
  state.introIndex = 0;
  state.currentVerb = "activate";
  state.worldX = level.player.startWorldX;
  state.svenMood = "idle";
  state.svenFacing = "right";
  state.moving = false;
  state.activeRuneId = null;
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.questionTracked = false;
  state.completedRunes = new Set();
  state.justCompletedRuneId = null;
  state.answered = 0;
  state.firstTryCorrect = 0;
  state.attempts = 0;
  state.message = level.spiritLines.welcome;
  state.feedback = "";
  render();
}

function renderStatus() {
  const done = state.completedRunes.size;
  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">${getAreaName()}</p>
        <h1>${level.title}</h1>
      </div>
      <div class="progressPills" aria-label="Runen wakker">
        ${level.runes
          .map((rune) => `<span class="pill ${state.completedRunes.has(rune.id) ? "pillDone" : ""}">${rune.shortName}</span>`)
          .join("")}
      </div>
      <div class="counter">${done}/${level.runes.length} runen</div>
    </header>
  `;
}

function renderVerbBar() {
  return `
    <nav class="verbBar" aria-label="Acties">
      ${level.verbs
        .map((verb) => `
          <button class="verbButton ${state.currentVerb === verb.id ? "verbActive" : ""}" type="button" data-verb="${verb.id}">
            ${verb.label}
          </button>
        `)
        .join("")}
    </nav>
  `;
}

function renderWorldStage() {
  const camera = getCameraX();
  const svenClasses = [
    "svenInWorld",
    `sven-${state.svenMood}`,
    `sven-facing-${state.svenFacing}`
  ].join(" ");

  return `
    <section class="stageViewport" aria-label="Verbonden wereld">
      <div class="worldTrack" style="--camera:${camera}">
        ${level.areas
          .map((area) => `
            <section class="worldArea area-${area.id}" style="left:${area.start}%; width:${area.end - area.start}%">
              <img class="areaArt" src="${area.background}" alt="${area.name}" />
            </section>
          `)
          .join("")}
        <div class="forestMist"></div>
        ${level.hotspots.map(renderHotspot).join("")}
        ${level.runes.map(renderRuneHotspot).join("")}
        <img
          class="${svenClasses}"
          src="${frameSrc(actorStateForMood(), 0)}"
          alt="Sven"
          data-actor="sven"
          data-animation="${actorStateForMood()}"
          data-frame="1"
          style="left:${state.worldX}%; bottom:${level.player.ground}%"
        />
      </div>
    </section>
  `;
}

function renderHotspot(hotspot) {
  const disabled = state.moving || state.screen !== "scene";
  const label = hotspot.type === "path" ? "→" : hotspot.type === "character" ? "?" : hotspot.type === "gate" ? "⌂" : "ᚱ";
  return `
    <button
      class="worldHotspot hotspot-${hotspot.type}"
      style="left:${hotspot.x}%; top:${hotspot.y}%"
      type="button"
      data-hotspot="${hotspot.id}"
      aria-label="${hotspot.name}"
      ${disabled ? "disabled" : ""}
    >
      ${hotspot.type === "character" ? `<img src="assets/viking-spirit.png" alt="" />` : `<span>${label}</span>`}
      <strong>${hotspot.name}</strong>
    </button>
  `;
}

function renderRuneHotspot(rune) {
  const done = state.completedRunes.has(rune.id);
  const justCompleted = state.justCompletedRuneId === rune.id;
  const disabled = state.moving || state.screen !== "scene";
  return `
    <button
      class="runeHotspot ${done ? "runeDone" : ""} ${justCompleted ? "runeJustCompleted" : ""}"
      style="left:${rune.x}%; top:${rune.y}%"
      type="button"
      data-rune="${rune.id}"
      aria-label="${rune.name}"
      ${disabled ? "disabled" : ""}
    >
      <span>${rune.symbol}</span>
      <strong>${rune.shortName}</strong>
    </button>
  `;
}

function renderDialogue() {
  const canOpen = state.screen === "scene" && state.completedRunes.size === level.runes.length && state.worldX > 60;
  const verbLabel = level.verbs.find((verb) => verb.id === state.currentVerb)?.label || "Actie";
  return `
    <section class="dialogue" aria-live="polite">
      <img class="portrait" src="assets/viking-spirit.png" alt="De Runewachter" />
      <div class="speech">
        <p class="speaker">${level.spiritName}</p>
        <p>${state.message}</p>
      </div>
      ${
        canOpen
          ? `<button class="primaryButton" type="button" data-action="reward">Ga naar binnen</button>`
          : `<div class="miniHint">${verbLabel}: tik op iets.</div>`
      }
    </section>
  `;
}

function renderScene() {
  return `
    <main class="gameShell">
      ${renderStatus()}
      ${renderWorldStage()}
      ${renderVerbBar()}
      ${renderDialogue()}
    </main>
  `;
}

function renderIntro() {
  return `
    <main class="introScreen">
      <img class="introBackdrop" src="assets/forest-path.png" alt="Een oud bos met een pad naar de tempel" />
      <section class="introPanel">
        <p class="eyebrow">${level.id}</p>
        <h1>${level.title}</h1>
        <p>${level.intro[state.introIndex]}</p>
        <button class="primaryButton" type="button" data-action="intro-next">
          ${state.introIndex === 0 ? "Start avontuur" : state.introIndex === level.intro.length - 1 ? "Het bos in" : "Verder"}
        </button>
      </section>
    </main>
  `;
}

function renderChallenge() {
  const rune = runeById(state.activeRuneId);
  const question = rune.questions[state.questionIndex];
  const choices = makeChoices(question);
  const number = state.questionIndex + 1;
  const total = rune.questions.length;

  return `
    ${renderScene()}
    <section class="modalLayer runeLayer" role="dialog" aria-modal="true" aria-labelledby="challenge-title">
      <div class="challengeBox runeChallengeBox">
        <div class="challengeHeader">
          <img src="assets/rune-stones.png" alt="" />
          <div>
            <p class="eyebrow">Rune ${number}/${total}</p>
            <h2 id="challenge-title">${rune.name}</h2>
          </div>
        </div>
        <p class="feedback">${state.feedback}</p>
        <p class="sum">Hoeveel is ${question.a} x ${question.b}?</p>
        <p class="runeWhisper">Raak de juiste steen aan.</p>
        <div class="choices">
          ${choices.map((choice) => `<button class="answerStone" type="button" data-choice="${choice}">${choice}</button>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderCorrect() {
  const rune = runeById(state.activeRuneId);
  const lastQuestion = state.questionIndex === rune.questions.length - 1;

  return `
    ${renderScene()}
    <section class="modalLayer runeLayer" role="dialog" aria-modal="true" aria-labelledby="correct-title">
      <div class="challengeBox runeChallengeBox successBox">
        <div class="runeBurst">${rune.symbol}</div>
        <h2 id="correct-title">Goed zo!</h2>
        <p class="feedback">${state.feedback}</p>
        <button class="primaryButton" type="button" data-action="next-question">
          ${lastQuestion ? "Maak de rune wakker" : "Volgende som"}
        </button>
      </div>
    </section>
  `;
}

function renderReward() {
  return `
    <main class="rewardScreen">
      <img class="rewardArt" src="assets/reward.png" alt="Sven voor de geopende tempelpoort" />
      <section class="rewardPanel">
        <p class="eyebrow">${level.id}</p>
        <h1>${level.reward.title}</h1>
        <p>${level.reward.line}</p>
        <div class="badge">${level.reward.badge}</div>
        <div class="stats">
          <span>${state.answered} sommen</span>
          <span>${getAccuracy()}% in een keer goed</span>
          <span>${state.attempts} pogingen</span>
        </div>
        <button class="primaryButton" type="button" data-action="restart">Speel nog een keer</button>
      </section>
    </main>
  `;
}

function render() {
  if (state.screen === "intro") {
    app.innerHTML = renderIntro();
  } else if (state.screen === "challenge") {
    app.innerHTML = renderChallenge();
  } else if (state.screen === "correct") {
    app.innerHTML = renderCorrect();
  } else if (state.screen === "reward") {
    app.innerHTML = renderReward();
  } else {
    app.innerHTML = renderScene();
  }

  const actor = document.querySelector("[data-actor='sven']");
  if (actor) {
    actor.addEventListener("error", () => {
      actorPlayback.failedSources.add(actor.getAttribute("src"));
      actor.src = ACTOR_FALLBACK_SRC;
    });
    requestActorAnimation(actorStateForMood());
  } else if (actorPlayback.rafId) {
    window.cancelAnimationFrame(actorPlayback.rafId);
    actorPlayback.rafId = null;
  }
}

app.addEventListener("click", (event) => {
  const verbTarget = event.target.closest("[data-verb]");
  if (verbTarget) {
    selectVerb(verbTarget.dataset.verb);
    return;
  }

  const actionTarget = event.target.closest("[data-action]");
  if (actionTarget) {
    const action = actionTarget.dataset.action;
    if (action === "intro-next") continueIntro();
    if (action === "next-question") nextQuestion();
    if (action === "reward") showReward();
    if (action === "restart") restart();
    return;
  }

  const hotspotTarget = event.target.closest("[data-hotspot]");
  if (hotspotTarget) {
    beginInteraction(hotspotById(hotspotTarget.dataset.hotspot), "hotspot");
    return;
  }

  const runeTarget = event.target.closest("[data-rune]");
  if (runeTarget) {
    beginInteraction(runeById(runeTarget.dataset.rune), "rune");
    return;
  }

  const choiceTarget = event.target.closest("[data-choice]");
  if (choiceTarget) {
    answerQuestion(Number(choiceTarget.dataset.choice));
  }
});

preloadActorAnimations();
render();
