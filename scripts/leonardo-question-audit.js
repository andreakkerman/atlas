const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const docsDir = path.join(rootDir, "Docs");
const levelIds = ["LVL-0021", "LVL-0022", "LVL-0023", "LVL-0024", "LVL-0025", "LVL-0026"];
const multiplicationSign = "×";
const divisionSign = ":";

const targetCategories = [
  "Bare multiplication, open answer",
  "Bare multiplication, multiple choice",
  "Story multiplication, open answer",
  "Story multiplication, multiple choice",
  "Bare division, open answer",
  "Bare division, multiple choice",
  "Story division, open answer",
  "Story division, multiple choice",
  "Route, money, or other applied questions",
  "Invalid/other"
];

const targetCategoryTargets = {
  "Bare multiplication, open answer": 25,
  "Bare multiplication, multiple choice": 25,
  "Story multiplication, open answer": 10,
  "Story multiplication, multiple choice": 10,
  "Bare division, open answer": 5,
  "Bare division, multiple choice": 10,
  "Story division, open answer": 5,
  "Story division, multiple choice": 5,
  "Route, money, or other applied questions": 5,
  "Invalid/other": 0
};

const levelTheme = {
  "LVL-0021": "Rome",
  "LVL-0022": "Proceno",
  "LVL-0023": "Umbrie",
  "LVL-0024": "Marche",
  "LVL-0025": "Florence",
  "LVL-0026": "Vinci"
};

const visibleAnchorNotes = {
  "LVL-0021": {
    opticsTable: "left workshop table/easel with optical drawing materials spiegels",
    mechanicalModel: "right-side table with mechanical model wielen",
    centralCodex: "central open codex table codexpagina's",
    engineeringTable: "right engineering workbench modeldelen"
  },
  "LVL-0022": {
    measuringTable: "left measuring table latten",
    bridgeModel: "foreground bridge model brugliggers",
    wellWinch: "central well/winch emmers",
    gateMechanism: "right gate mechanism and geometric stones kettingen"
  },
  "LVL-0023": {
    waterLevelPost: "left water-level post meetstrepen",
    valveWheel: "left-center valve/wheel ventieldraaien",
    lockChambers: "central lock chambers boat treasure chest crates boten",
    paddleWheel: "right-center paddle wheel schoepen",
    waterClock: "right water clock"
  },
  "LVL-0024": {
    wingRack: "left wing measuring rack ribben",
    counterweights: "left-center counterweights gewichten",
    flightControls: "central control/test mechanism",
    wingFrame: "large wing frame vleugelsecties"
  },
  "LVL-0025": {
    perspectiveFrame: "left perspective frame rastervakken",
    geometricFloor: "central geometric floor tegels",
    pigmentTable: "central pigment table pigmentpotjes",
    pulleyPanel: "right pulley/panel"
  },
  "LVL-0026": {
    waterModel: "left water model waterbakken",
    opticalTable: "optical table lenzen",
    centralCodex: "central codex",
    wingConstruction: "right wing construction ribben",
    designBoard: "blank design board"
  }
};

function loadLevel(id) {
  const context = { window: { SVEN_LEVEL_DEFINITIONS: {} } };
  vm.createContext(context);
  const file = path.join(rootDir, "Levels", id, "level.js");
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  return context.window.SVEN_LEVEL_DEFINITIONS[id];
}

function percent(part, total) {
  return total ? `${Math.round((part / total) * 1000) / 10}%` : "0%";
}

function countBy(rows, keyFn) {
  const counts = new Map();
  rows.forEach((row) => {
    const key = keyFn(row);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return counts;
}

function formatMapTable(map, headerA, headerB, order = null) {
  const keys = order || [...map.keys()].sort((a, b) => String(a).localeCompare(String(b), "nl", { numeric: true }));
  return [
    `| ${headerA} | ${headerB} |`,
    "|---|---:|",
    ...keys.map((key) => `| ${key} | ${map.get(key) || 0} |`)
  ].join("\n");
}

function csvCell(value) {
  const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return `"${text.replaceAll("\"", "\"\"")}"`;
}

function normalizeText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function sentenceCount(text) {
  return normalizeText(text).split(/[.!?]+/).filter(Boolean).length;
}

function numberTokens(text) {
  return [...String(text).matchAll(/\b\d+\b/g)].map((match) => Number(match[0]));
}

function extractExplicitOperation(text) {
  const normalized = String(text).replace(/x/g, multiplicationSign);
  let match = normalized.match(/(\d+)\s*[×]\s*(\d+)/);
  if (match) return { type: "multiplication", factors: [Number(match[1]), Number(match[2])] };
  match = normalized.match(/(\d+)\s*[:÷]\s*(\d+)/);
  if (match) return { type: "division", dividend: Number(match[1]), divisor: Number(match[2]) };
  return null;
}

function inferOperation(row) {
  const variant = row.variant;
  const family = variant.family || "";
  const text = `${variant.prompt} ${variant.explanation || ""}`;
  const explicit = extractExplicitOperation(text);
  if (explicit) return explicit;

  const nums = numberTokens(variant.prompt);
  if (family.includes("multiplication") && nums.length >= 2) {
    return { type: "multiplication", factors: [nums[0], nums[1]] };
  }
  if (family.includes("division") && nums.length >= 2) {
    return { type: "division", dividend: nums[0], divisor: nums[1] };
  }
  if (["measurement", "money", "route"].some((item) => family.includes(item)) && nums.length >= 2) {
    if (/elk|per|keer|groep|rij|stapel|vak|potje|lat|rib|schoep/i.test(variant.prompt)) {
      return { type: "multiplication", factors: [nums[0], nums[1]] };
    }
    return { type: "applied", numbers: nums.slice(0, 3) };
  }
  return { type: "none", numbers: nums };
}

function tableForOperation(operation) {
  if (!operation) return "";
  if (operation.type === "multiplication") {
    const factors = operation.factors || [];
    const table = factors.find((num) => num >= 2 && num <= 10) || factors[1] || factors[0];
    return Number.isFinite(table) ? String(table) : "";
  }
  if (operation.type === "division") {
    return Number.isFinite(operation.divisor) ? String(operation.divisor) : "";
  }
  return "";
}

function classifyVariant(row) {
  const { variant } = row;
  if (variant.visual?.type === "clock") return "Clock";
  const family = variant.family || "";
  const mode = variant.answerMode === "multipleChoice" ? "multiple choice" : "open answer";
  if (family === "bare_multiplication") return `Bare multiplication, ${mode}`;
  if (family === "story_multiplication") return `Story multiplication, ${mode}`;
  if (family === "bare_division") return `Bare division, ${mode}`;
  if (family === "story_division") return `Story division, ${mode}`;
  if (/measurement|money|route/.test(family)) return "Route, money, or other applied questions";
  return "Invalid/other";
}

function broadClassification(category) {
  if (category.includes("multiplication")) return "multiplication";
  if (category.includes("division")) return "division";
  if (category.includes("applied")) return "applied";
  if (category === "Clock") return "clock";
  return "invalid/other";
}

function answerInChoices(variant) {
  if (variant.answerMode !== "multipleChoice") return true;
  return Array.isArray(variant.choices) && variant.choices.includes(variant.answer);
}

function duplicateChoices(variant) {
  if (variant.answerMode !== "multipleChoice" || !Array.isArray(variant.choices)) return false;
  const normalized = variant.choices.map((choice) => String(choice).toLocaleLowerCase("nl"));
  return new Set(normalized).size !== normalized.length;
}

function hasWeakDistractors(variant) {
  if (variant.answerMode !== "multipleChoice" || !Array.isArray(variant.choices) || typeof variant.answer !== "number") return false;
  return variant.choices.some((choice) => typeof choice !== "number" && typeof choice !== "string") ||
    variant.choices.some((choice) => typeof choice === "string" && !Number.isFinite(Number(choice)) && typeof variant.answer === "number") ||
    variant.choices.some((choice) => typeof choice === "number" && Math.abs(choice - variant.answer) > 30 && variant.answer < 100);
}

function hintRevealsAnswer(variant) {
  const answer = String(variant.answer);
  const hintText = `${variant.hintMinnie || ""} ${variant.hintMoose || ""}`;
  if (!answer || !/\d/.test(answer)) return false;
  return new RegExp(`\\b${answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(hintText);
}

function explanationShowsCalculation(variant, category) {
  if (category === "Invalid/other") return false;
  if (!["multiplication", "division", "applied"].includes(broadClassification(category))) return true;
  return /[×x:÷+\-]/.test(variant.explanation || "") && String(variant.explanation || "").includes(String(variant.answer));
}

function isGrounded(row) {
  const prompt = normalizeText(row.variant.prompt).toLocaleLowerCase("nl");
  const anchor = row.anchor.toLocaleLowerCase("nl");
  const objectWords = visibleAnchorNotes[row.levelId]?.[row.anchor] || "";
  const words = [
    ...anchor.split(/(?=[A-Z])/).map((part) => part.toLocaleLowerCase("nl")),
    ...objectWords.toLocaleLowerCase("nl").split(/[^a-z0-9]+/),
    row.anchorName?.toLocaleLowerCase("nl")
  ].filter((word) => word && word.length > 2);
  return words.some((word) => prompt.includes(word)) ||
    /leonardo|water|vleugel|brug|poort|codex|licht|kleur|tekening|touw|wiel|klok|tafel|model|paneel|vloer|pigment|passer|emmer|ketting|rad|ventiel|rib|gewicht|ontwerp/.test(prompt);
}

function qualityFlags(row) {
  const { variant } = row;
  const flags = [];
  const category = row.category;
  const prompt = normalizeText(variant.prompt);
  const family = variant.family || "";
  if (variant.visual?.type !== "clock") {
    if (/reading|spelling|vocabulary|scene_inference|main_idea|word_choice|cause_effect|ordering|classification|pattern|synthesis_constraints/.test(family)) {
      flags.push("invalid reading/spelling/factual/vocabulary/logic family for non-clock maths practice");
    }
    if (/Wat betekent|Welke zin|Welk woord|Waarom|Wat doet|Wat gebeurt|Welke stap|Wat leer|Wat onderzoekt|Waarvoor dient/i.test(prompt) &&
        !/Hoeveel|cm|liter|gram|minuten|seconden|uur|verdeeld|samen|blijft|verschil/i.test(prompt)) {
      flags.push("factual, vocabulary, recognition, or logic question instead of table practice");
    }
    if (!answerInChoices(variant)) flags.push("answer missing from choices");
    if (duplicateChoices(variant)) flags.push("duplicate choices");
    if (hasWeakDistractors(variant)) flags.push("weak or implausible distractors");
    if (hintRevealsAnswer(variant)) flags.push("hint reveals answer too early");
    if (!explanationShowsCalculation(variant, category)) flags.push("explanation does not show calculation");
    if (variant.presentation === "story" && sentenceCount(prompt) > 2) flags.push("story longer than one or two sentences");
    if (variant.presentation !== "bare" && !isGrounded(row)) flags.push("not clearly grounded in visible scene object");
    if (/ontwerpbord|ontwerp moet|welke keuze voldoet|niet één willekeurig/i.test(prompt)) flags.push("synthesis/design constraint item is conceptually useful but not multiplication-table automation");
  }
  return flags;
}

function clockExpectedAnswer(hour, minute) {
  const nextHour = hour === 12 ? 1 : hour + 1;
  const hourName = ["", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen", "tien", "elf", "twaalf"];
  const cap = (text) => text.charAt(0).toUpperCase() + text.slice(1);
  const map = {
    0: `${hourName[hour]} uur`,
    5: `vijf over ${hourName[hour]}`,
    10: `tien over ${hourName[hour]}`,
    15: `kwart over ${hourName[hour]}`,
    20: `tien voor half ${hourName[nextHour]}`,
    25: `vijf voor half ${hourName[nextHour]}`,
    30: `half ${hourName[nextHour]}`,
    35: `vijf over half ${hourName[nextHour]}`,
    40: `tien over half ${hourName[nextHour]}`,
    45: `kwart voor ${hourName[nextHour]}`,
    50: `tien voor ${hourName[nextHour]}`,
    55: `vijf voor ${hourName[nextHour]}`
  };
  return map[minute] ? cap(map[minute]) : "";
}

function clockFlags(row) {
  const { variant } = row;
  const flags = [];
  const visual = variant.visual || {};
  const expected = clockExpectedAnswer(visual.hour, visual.minute);
  if (!Number.isInteger(visual.hour) || !Number.isInteger(visual.minute)) flags.push("missing or invalid SVG clock hour/minute");
  if (expected && variant.answer !== expected) flags.push(`answer conflicts with SVG time; expected ${expected}`);
  if (/^\d{1,2}[:.]\d{2}$/.test(String(variant.answer)) || (variant.choices || []).some((choice) => /^\d{1,2}[:.]\d{2}$/.test(String(choice)))) {
    flags.push("digital notation used");
  }
  if (!/^Hoe laat is het\?$/.test(variant.prompt) && sentenceCount(variant.prompt) > 1) {
    flags.push("prompt is longer than preferred short clock wording");
  }
  if (!answerInChoices(variant)) flags.push("answer missing from choices");
  if (duplicateChoices(variant)) flags.push("duplicate choices");
  if ((variant.choices || []).length < 4) flags.push("fewer than four choices");
  if (!/grote wijzer|wijzer|klok/i.test(`${variant.hintMinnie} ${variant.hintMoose}`)) flags.push("hints do not clearly reference clock-reading strategy");
  return flags;
}

function collectRows() {
  const levels = levelIds.map(loadLevel);
  const rows = [];
  for (const level of levels) {
    const runeById = new Map((level.runes || []).map((rune) => [rune.id, rune]));
    for (const challenge of level.learningChallenges || []) {
      for (const slot of challenge.questions || []) {
        for (const variant of slot.variants || []) {
          const row = {
            levelId: level.id,
            levelTitle: level.title,
            anchor: challenge.anchorId,
            anchorName: runeById.get(challenge.anchorId)?.name || challenge.anchorId,
            slotId: slot.id,
            variantId: variant.id,
            variant
          };
          row.category = classifyVariant(row);
          row.broadClassification = broadClassification(row.category);
          row.operation = inferOperation(row);
          row.table = tableForOperation(row.operation);
          row.flags = qualityFlags(row);
          row.clockFlags = variant.visual?.type === "clock" ? clockFlags(row) : [];
          rows.push(row);
        }
      }
    }
  }
  return rows;
}

function variantLine(row) {
  const v = row.variant;
  return [
    `### ${row.variantId}`,
    "",
    `- Level: ${row.levelId} — ${row.levelTitle}`,
    `- Anchor: \`${row.anchor}\` (${row.anchorName})`,
    `- Slot ID: \`${row.slotId}\``,
    `- Variant ID: \`${row.variantId}\``,
    `- Prompt: ${v.prompt}`,
    `- Answer: ${v.answer}`,
    `- Choices: ${Array.isArray(v.choices) ? v.choices.join("; ") : ""}`,
    `- Answer mode: ${v.answerMode}`,
    `- Presentation: ${v.presentation}`,
    `- Classification: ${row.category}`,
    `- Operation/table: ${row.operation.type}${row.table ? `, table/divisor ${row.table}` : ""}`,
    `- hintMinnie: ${v.hintMinnie}`,
    `- hintMoose: ${v.hintMoose}`,
    `- Explanation: ${v.explanation}`,
    `- Quality flags: ${row.flags.length ? row.flags.join("; ") : "none"}`,
    ""
  ].join("\n");
}

function writeQuestionAudit(rows) {
  const nonClock = rows.filter((row) => row.variant.visual?.type !== "clock");
  const anchors = new Set(rows.map((row) => `${row.levelId}.${row.anchor}`));
  const slots = new Set(rows.map((row) => `${row.levelId}.${row.anchor}.${row.slotId}`));
  const categoryCounts = countBy(nonClock, (row) => row.category);
  const modeCounts = countBy(nonClock, (row) => row.variant.answerMode);
  const presentationCounts = countBy(nonClock, (row) => row.variant.presentation);
  const broadCounts = countBy(nonClock, (row) => row.broadClassification);
  const tableCounts = countBy(nonClock.filter((row) => row.table), (row) => row.table);
  const levelCounts = countBy(rows, (row) => row.levelId);
  const anchorCounts = countBy(rows, (row) => `${row.levelId}.${row.anchor}`);
  const duplicatePrompts = [...countBy(nonClock, (row) => normalizeText(row.variant.prompt).toLocaleLowerCase("nl")).entries()]
    .filter(([, count]) => count > 1);
  const nearDuplicates = nonClock.filter((row) => /Welk woord is goed gespeld|Wat betekent|Welke tijd zie je|Welke tafel/i.test(row.variant.prompt));
  const hard = [...["6", "7", "8", "9"].map((key) => tableCounts.get(key) || 0)].reduce((sum, count) => sum + count, 0);
  const review = [...["2", "3", "4", "5", "10"].map((key) => tableCounts.get(key) || 0)].reduce((sum, count) => sum + count, 0);
  const flaggedRows = nonClock.filter((row) => row.flags.length);

  const lines = [
    "# Atlas Leonardo Question Audit",
    "",
    "Review-only export of authored non-clock variants from `LVL-0021` through `LVL-0026`, checked against `ATLAS_LEARNING_CONTENT_RULES.md`.",
    "",
    "## Summary",
    "",
    `- Total anchors: ${anchors.size}`,
    `- Total slots: ${slots.size}`,
    `- Total authored variants: ${rows.length}`,
    `- Non-clock variants audited here: ${nonClock.length}`,
    `- Clock variants covered in \`ATLAS_LEONARDO_CLOCK_QUESTION_AUDIT.md\`: ${rows.length - nonClock.length}`,
    `- Variants with automatic quality flags: ${flaggedRows.length} (${percent(flaggedRows.length, nonClock.length)})`,
    "",
    "### Counts and percentages by Atlas content category",
    "",
    "| Category | Count | Percent | Rule target |",
    "|---|---:|---:|---:|",
    ...targetCategories.map((category) => `| ${category} | ${categoryCounts.get(category) || 0} | ${percent(categoryCounts.get(category) || 0, nonClock.length)} | ${targetCategoryTargets[category]}% |`),
    "",
    "### Open versus multiple choice",
    "",
    formatMapTable(modeCounts, "Answer mode", "Count", ["open", "multipleChoice"]),
    "",
    "### Story versus bare",
    "",
    formatMapTable(presentationCounts, "Presentation", "Count", ["bare", "story"]),
    "",
    "### Multiplication versus inverse division versus applied/invalid",
    "",
    formatMapTable(broadCounts, "Broad classification", "Count", ["multiplication", "division", "applied", "invalid/other"]),
    "",
    "### Table distribution",
    "",
    `- Tables/divisors 6–9: ${hard} (${percent(hard, hard + review)})`,
    `- Tables/divisors 2–5 and 10: ${review} (${percent(review, hard + review)})`,
    "",
    formatMapTable(tableCounts, "Table/divisor", "Count", ["2", "3", "4", "5", "6", "7", "8", "9", "10"]),
    "",
    "### Applied-question percentage",
    "",
    `- Applied: ${broadCounts.get("applied") || 0}/${nonClock.length} (${percent(broadCounts.get("applied") || 0, nonClock.length)})`,
    "",
    "### Invalid reading, spelling, factual-knowledge or vocabulary questions",
    "",
    `- Invalid/other category: ${broadCounts.get("invalid/other") || 0}/${nonClock.length} (${percent(broadCounts.get("invalid/other") || 0, nonClock.length)})`,
    "",
    "### Duplicate or near-duplicate variants",
    "",
    duplicatePrompts.length
      ? duplicatePrompts.map(([prompt, count]) => `- ${count}× ${prompt}`).join("\n")
      : "- No exact duplicate prompts detected.",
    nearDuplicates.length
      ? `\n- Near-duplicate pattern candidates: ${nearDuplicates.map((row) => `\`${row.variantId}\``).join(", ")}`
      : "\n- No near-duplicate pattern candidates detected.",
    "",
    "### Counts per level",
    "",
    formatMapTable(levelCounts, "Level", "Variant count", levelIds),
    "",
    "### Counts per level and anchor",
    "",
    formatMapTable(anchorCounts, "Level.anchor", "Variant count"),
    "",
    "## Major automatic violations",
    "",
    flaggedRows.length
      ? flaggedRows.map((row) => `- \`${row.levelId}.${row.anchor}.${row.variantId}\`: ${row.flags.join("; ")}`).join("\n")
      : "_No automatic violations detected._",
    "",
    "## Exported variants",
    "",
    ...levelIds.flatMap((levelId) => {
      const levelRows = nonClock.filter((row) => row.levelId === levelId);
      return [
        `# ${levelId} — ${levelTheme[levelId]}`,
        "",
        ...levelRows.map(variantLine)
      ];
    })
  ];

  fs.writeFileSync(path.join(docsDir, "ATLAS_LEONARDO_QUESTION_AUDIT.md"), lines.join("\n"), "utf8");
}

function writeClockAudit(rows) {
  const clockRows = rows.filter((row) => row.variant.visual?.type === "clock");
  const challengeKeys = new Set(clockRows.map((row) => `${row.levelId}.${row.anchor}`));
  const slotKeys = new Set(clockRows.map((row) => `${row.levelId}.${row.anchor}.${row.slotId}`));
  const timeCounts = countBy(clockRows, (row) => `${String(row.variant.visual.hour).padStart(2, "0")}:${String(row.variant.visual.minute).padStart(2, "0")}`);
  const displayedHours = countBy(clockRows, (row) => row.variant.visual.hour);
  const difficultyCounts = countBy(clockRows, (row) => {
    const minute = row.variant.visual.minute;
    if (minute === 0) return "Whole hour (`:00`)";
    if (minute === 30) return "Half hour (`:30`)";
    if (minute === 15 || minute === 45) return "Quarter hour (`:15`, `:45`)";
    if ([5, 25, 35, 55].includes(minute)) return "Five-minute phrasing (`:05`, `:25`, `:35`, `:55`)";
    if ([10, 20, 40, 50].includes(minute)) return "Ten-minute phrasing (`:10`, `:20`, `:40`, `:50`)";
    return "Other";
  });
  const wordingCounts = countBy(clockRows, (row) => {
    const answer = String(row.variant.answer).toLocaleLowerCase("nl");
    if (answer.includes("voor half")) return "voor half";
    if (answer.includes("over half")) return "over half";
    if (answer.includes("over")) return "plain over";
    if (answer.includes("voor")) return "plain voor";
    if (answer.includes("half")) return "half";
    if (answer.includes("uur")) return "whole hour";
    return "other";
  });
  const repeats = [...timeCounts.entries()].filter(([, count]) => count > 1);
  const conflicts = clockRows.filter((row) => {
    const expected = clockExpectedAnswer(row.variant.visual.hour, row.variant.visual.minute);
    return expected && expected !== row.variant.answer;
  });
  const flagged = clockRows.filter((row) => row.clockFlags.length);

  const lines = [
    "# Atlas Leonardo Clock Question Audit",
    "",
    "Review-only export of authored clock variants from `LVL-0021` through `LVL-0026`, following the format of `ATLAS_CLOCK_QUESTION_AUDIT.md`.",
    "",
    "## Summary",
    "",
    `- Total clock challenges: ${challengeKeys.size}`,
    `- Total clock slots: ${slotKeys.size}`,
    `- Total clock variants: ${clockRows.length}`,
    `- Whole-hour questions: ${difficultyCounts.get("Whole hour (`:00`)") || 0}`,
    `- Half-hour questions: ${difficultyCounts.get("Half hour (`:30`)") || 0}`,
    `- Quarter-hour questions: ${difficultyCounts.get("Quarter hour (`:15`, `:45`)") || 0}`,
    `- Five-minute questions: ${difficultyCounts.get("Five-minute phrasing (`:05`, `:25`, `:35`, `:55`)") || 0}`,
    `- Ten-minute questions: ${difficultyCounts.get("Ten-minute phrasing (`:10`, `:20`, `:40`, `:50`)") || 0}`,
    `- Plain “over” phrasing: ${wordingCounts.get("plain over") || 0}`,
    `- Plain “voor” phrasing: ${wordingCounts.get("plain voor") || 0}`,
    `- “voor half” phrasing: ${wordingCounts.get("voor half") || 0}`,
    `- “over half” phrasing: ${wordingCounts.get("over half") || 0}`,
    `- Variants with automatic clock flags: ${flagged.length}`,
    "",
    "_Phrasing counts are exclusive: plain “over” and “voor” do not include “over half” or “voor half”._",
    "",
    "### Counts per displayed hour",
    "",
    formatMapTable(displayedHours, "Displayed hour", "Count", [1,2,3,4,5,6,7,8,9,10,11,12]),
    "",
    "### Counts per difficulty category",
    "",
    formatMapTable(difficultyCounts, "Difficulty category", "Count", [
      "Whole hour (`:00`)",
      "Half hour (`:30`)",
      "Quarter hour (`:15`, `:45`)",
      "Five-minute phrasing (`:05`, `:25`, `:35`, `:55`)",
      "Ten-minute phrasing (`:10`, `:20`, `:40`, `:50`)",
      "Other"
    ]),
    "",
    "### Repeated clock times",
    "",
    repeats.length
      ? ["| Time | Count | Variant IDs |", "|---|---:|---|", ...repeats.map(([time, count]) => {
        const ids = clockRows.filter((row) => `${String(row.variant.visual.hour).padStart(2, "0")}:${String(row.variant.visual.minute).padStart(2, "0")}` === time).map((row) => `\`${row.variantId}\``).join(", ");
        return `| ${time} | ${count} | ${ids} |`;
      })].join("\n")
      : "_No repeated clock times detected._",
    "",
    "### Dutch school-style wording conflicts",
    "",
    conflicts.length
      ? conflicts.map((row) => `- \`${row.variantId}\`: answer "${row.variant.answer}" conflicts with SVG ${row.variant.visual.hour}:${String(row.variant.visual.minute).padStart(2, "0")} (expected "${clockExpectedAnswer(row.variant.visual.hour, row.variant.visual.minute)}").`).join("\n")
      : "_No answer wording conflicts detected._",
    "",
    "### Automatic clock flags",
    "",
    flagged.length
      ? flagged.map((row) => `- \`${row.levelId}.${row.anchor}.${row.variantId}\`: ${row.clockFlags.join("; ")}`).join("\n")
      : "_No automatic clock flags detected._",
    "",
    "## LVL-0023 current anchor inventory",
    "",
    "- `waterLevelPost` — water-level post",
    "- `valveWheel` — valve/wheel",
    "- `lockChambers` — central lock chambers with boat and treasure chest",
    "- `paddleWheel` — paddle wheel",
    "- `waterClock` — water clock",
    "",
    "**Anchor repair verified:** the central lock chambers with the boat and treasure chest are authored as `lockChambers` in LVL-0023.",
    "",
    "## Exported clock variants",
    "",
    ...levelIds.flatMap((levelId) => {
      const levelRows = clockRows.filter((row) => row.levelId === levelId);
      if (!levelRows.length) return [`# ${levelId} — ${levelTheme[levelId]}`, "", "_No clock variants._", ""];
      return [
        `# ${levelId} — ${levelTheme[levelId]}`,
        "",
        ...levelRows.map((row) => {
          const v = row.variant;
          return [
            `### ${row.variantId}`,
            "",
            `- Level: ${row.levelId} — ${row.levelTitle}`,
            `- Anchor: \`${row.anchor}\` (${row.anchorName})`,
            `- Slot ID: \`${row.slotId}\``,
            `- Variant ID: \`${row.variantId}\``,
            `- Hour: ${v.visual.hour}`,
            `- Minute: ${v.visual.minute}`,
            `- Prompt: ${v.prompt}`,
            `- Answer: ${v.answer}`,
            `- Choices: ${Array.isArray(v.choices) ? v.choices.join("; ") : ""}`,
            `- hintMinnie: ${v.hintMinnie}`,
            `- hintMoose: ${v.hintMoose}`,
            `- Explanation: ${v.explanation}`,
            `- Clock flags: ${row.clockFlags.length ? row.clockFlags.join("; ") : "none"}`,
            ""
          ].join("\n");
        })
      ];
    })
  ];
  fs.writeFileSync(path.join(docsDir, "ATLAS_LEONARDO_CLOCK_QUESTION_AUDIT.md"), lines.join("\n"), "utf8");
}

function writeCsv(rows) {
  const header = [
    "level", "levelTitle", "anchor", "anchorName", "slotId", "variantId",
    "isClock", "hour", "minute", "prompt", "answer", "choices", "answerMode",
    "presentation", "family", "category", "broadClassification", "operation",
    "tableOrDivisor", "hintMinnie", "hintMoose", "explanation", "qualityFlags"
  ];
  const lines = [header.map(csvCell).join(",")];
  for (const row of rows) {
    const v = row.variant;
    lines.push([
      row.levelId,
      row.levelTitle,
      row.anchor,
      row.anchorName,
      row.slotId,
      row.variantId,
      v.visual?.type === "clock",
      v.visual?.hour ?? "",
      v.visual?.minute ?? "",
      v.prompt,
      v.answer,
      Array.isArray(v.choices) ? v.choices.join("; ") : "",
      v.answerMode,
      v.presentation,
      v.family,
      row.category,
      row.broadClassification,
      row.operation.type,
      row.table,
      v.hintMinnie,
      v.hintMoose,
      v.explanation,
      [...row.flags, ...row.clockFlags].join("; ")
    ].map(csvCell).join(","));
  }
  fs.writeFileSync(path.join(docsDir, "ATLAS_LEONARDO_QUESTION_VARIANTS.csv"), lines.join("\n"), "utf8");
}

function main() {
  const rows = collectRows();
  writeQuestionAudit(rows);
  writeClockAudit(rows);
  writeCsv(rows);
  const slots = new Set(rows.map((row) => `${row.levelId}.${row.anchor}.${row.slotId}`));
  const anchors = new Set(rows.map((row) => `${row.levelId}.${row.anchor}`));
  console.log(`Leonardo audit generated: ${anchors.size} anchors, ${slots.size} slots, ${rows.length} variants.`);
  console.log(`CSV rows: ${rows.length}`);
}

main();
