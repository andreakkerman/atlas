const app = document.querySelector("#app");
const { level } = window.SVEN_CONTENT;

const state = {
  screen: "intro",
  introIndex: 0,
  activeRuneId: null,
  questionIndex: 0,
  selectedWrong: false,
  completedRunes: new Set(),
  totalQuestions: level.runes.reduce((sum, rune) => sum + rune.questions.length, 0),
  answered: 0,
  firstTryCorrect: 0,
  attempts: 0,
  message: level.spiritLines.welcome,
  feedback: ""
};

function runeById(id) {
  return level.runes.find((rune) => rune.id === id);
}

function answerFor(question) {
  return question.a * question.b;
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
    state.message = level.spiritLines.chooseRune;
  }
  render();
}

function startRune(id) {
  if (state.completedRunes.has(id)) return;
  const rune = runeById(id);
  state.screen = "challenge";
  state.activeRuneId = id;
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.feedback = rune.intro;
  render();
}

function answerQuestion(choice) {
  const rune = runeById(state.activeRuneId);
  const question = rune.questions[state.questionIndex];
  const correct = answerFor(question);
  state.attempts += 1;

  if (choice !== correct) {
    state.selectedWrong = true;
    state.feedback = `Bijna. Denk aan ${question.a} groepjes van ${question.b}.`;
    render();
    return;
  }

  if (!state.selectedWrong) {
    state.firstTryCorrect += 1;
  }

  state.answered += 1;
  state.feedback = `Ja! ${question.a} x ${question.b} = ${correct}.`;
  state.screen = "correct";
  render();
}

function nextQuestion() {
  const rune = runeById(state.activeRuneId);

  if (state.questionIndex < rune.questions.length - 1) {
    state.questionIndex += 1;
    state.selectedWrong = false;
    state.feedback = "De rune wil nog een som.";
    state.screen = "challenge";
    render();
    return;
  }

  state.completedRunes.add(rune.id);
  state.activeRuneId = null;
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.feedback = "";

  if (state.completedRunes.size === level.runes.length) {
    state.screen = "gate";
    state.message = level.spiritLines.allRunes;
  } else {
    state.screen = "scene";
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
  state.activeRuneId = null;
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.completedRunes = new Set();
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
        <p class="eyebrow">Vikingavontuur</p>
        <h1>${level.title}</h1>
      </div>
      <div class="progressPills" aria-label="Runen wakker">
        ${level.runes
          .map(
            (rune) => `
              <span class="pill ${state.completedRunes.has(rune.id) ? "pillDone" : ""}">
                ${rune.shortName}
              </span>
            `
          )
          .join("")}
      </div>
      <div class="counter">${done}/${level.runes.length} runen</div>
    </header>
  `;
}

function renderScene() {
  const gateOpen = state.screen === "gate" || state.screen === "reward";
  return `
    <main class="gameShell">
      ${renderStatus()}
      <section class="stage ${gateOpen ? "stageOpen" : ""}" aria-label="Vikingtempel">
        <img class="stageArt" src="assets/viking-temple.png" alt="Een oude Vikingtempel met een gesloten poort" />
        <div class="sunGlow"></div>
        <button class="gate ${gateOpen ? "gateIsOpen" : ""}" type="button" aria-label="Runenpoort">
          <span>${gateOpen ? "open" : "dicht"}</span>
        </button>
        ${level.runes
          .map((rune) => {
            const done = state.completedRunes.has(rune.id);
            return `
              <button
                class="runeHotspot ${done ? "runeDone" : ""}"
                style="left:${rune.position.x}%; top:${rune.position.y}%"
                type="button"
                data-rune="${rune.id}"
                aria-label="${rune.name}"
                ${done || state.screen === "gate" ? "disabled" : ""}
              >
                <span>${rune.symbol}</span>
              </button>
            `;
          })
          .join("")}
        <img class="svenToken" src="assets/sven.png" alt="Sven" />
      </section>
      ${renderDialogue()}
    </main>
  `;
}

function renderDialogue() {
  const canOpen = state.screen === "gate";
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
          : `<div class="miniHint">Tik op een rune.</div>`
      }
    </section>
  `;
}

function renderIntro() {
  return `
    <main class="introScreen">
      <img class="introBackdrop" src="assets/temple-gate.png" alt="De gesloten Runenpoort" />
      <section class="introPanel">
        <p class="eyebrow">LVL-0001</p>
        <h1>${level.title}</h1>
        <p>${level.intro[state.introIndex]}</p>
        <button class="primaryButton" type="button" data-action="intro-next">
          ${state.introIndex === 0 ? "Start avontuur" : state.introIndex === level.intro.length - 1 ? "Naar de tempel" : "Verder"}
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
    <section class="modalLayer" role="dialog" aria-modal="true" aria-labelledby="challenge-title">
      <div class="challengeBox">
        <div class="challengeHeader">
          <img src="assets/rune-stones.png" alt="" />
          <div>
            <p class="eyebrow">Rune ${number}/${total}</p>
            <h2 id="challenge-title">${rune.name}</h2>
          </div>
        </div>
        <p class="feedback">${state.feedback}</p>
        <p class="sum">Hoeveel is ${question.a} x ${question.b}?</p>
        <div class="choices">
          ${choices.map((choice) => `<button type="button" data-choice="${choice}">${choice}</button>`).join("")}
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
    <section class="modalLayer" role="dialog" aria-modal="true" aria-labelledby="correct-title">
      <div class="challengeBox successBox">
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
}

app.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  if (actionTarget) {
    const action = actionTarget.dataset.action;
    if (action === "intro-next") continueIntro();
    if (action === "next-question") nextQuestion();
    if (action === "reward") showReward();
    if (action === "restart") restart();
    return;
  }

  const runeTarget = event.target.closest("[data-rune]");
  if (runeTarget) {
    startRune(runeTarget.dataset.rune);
    return;
  }

  const choiceTarget = event.target.closest("[data-choice]");
  if (choiceTarget) {
    answerQuestion(Number(choiceTarget.dataset.choice));
  }
});

render();
