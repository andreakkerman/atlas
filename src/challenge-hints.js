(function (global) {
  "use strict";

  const arcLevels = new Set(["LVL-0032", "LVL-0033", "LVL-0034", "LVL-0035"]);
  const isArcLevel = (id) => arcLevels.has(id);
  // Exact production IDs; explicit authored stages still preserve inactive banks/drafts.
  const reusableLevels = new Set(Array.from({ length: 35 }, (_, i) => `LVL-${String(i + 1).padStart(4, "0")}`));
  const usesReusableHints = (id) => reusableLevels.has(id);

  function multiplication(a, b) {
    // Priority is intentional; either operand may supply the easier table.
    const multiplier = [10, 2, 4, 11, 12, 5, 9, 6, 7, 8, 3].find(n => a === n || b === n);
    const other = a === multiplier ? b : a;
    switch (multiplier) {
      case 10: return `Bij × 10 komt er een nul achter ${other}.`;
      case 2: return `Verdubbel ${other}.`;
      case 4: return `Verdubbel ${other} en verdubbel de uitkomst nog een keer.`;
      case 11: return `Reken eerst ${other} × 10 en tel er nog ${other} bij.`;
      case 12: return `Reken eerst ${other} × 10 en ${other} × 2 en tel die uitkomsten op.`;
      case 5: return `Reken ${other} × 10 en neem daar de helft van.`;
      case 9: return `Reken eerst ${other} × 10 en haal er één groepje van ${other} af.`;
      case 6: return `Reken eerst ${other} × 5 en tel er nog ${other} bij.`;
      case 7: return `Reken eerst ${other} × 5 en tel er nog twee groepjes van ${other} bij.`;
      case 8: return `Reken eerst ${other} × 4 en verdubbel die uitkomst.`;
      case 3: return `Neem drie groepjes van ${other}: ${other} + ${other} + ${other}.`;
      default: throw new Error(`No approved multiplication strategy for ${a} × ${b}; author an explicit hint override.`);
    }
  }

  function stepwise(a, b, subtract, unit) {
    const amount = n => `${n}${unit ? ` ${n === 1 && unit === "minuten" ? "minuut" : unit}` : ""}`;
    const tens = Math.floor(b / 10) * 10, ones = b % 10;
    const parts = [tens, ones].filter(n => n > 0);
    const verb = subtract ? "Trek" : "Tel", direction = subtract ? "af" : "erbij";
    const steps = parts.length === 2
      ? `${verb} eerst ${amount(parts[0])} ${direction} en daarna ${amount(parts[1])}.`
      : `${verb} ${amount(parts[0])} ${direction}.`;
    return `Begin met ${amount(a)}. ${steps}`;
  }

  function clock(minute, fiveMinuteLanguage = false) {
    if (!Number.isInteger(minute) || minute < 0 || minute > 55 || minute % 5) {
      throw new Error("Clock hints require a five-minute clock input.");
    }
    if (fiveMinuteLanguage) {
      const relationships = {
        10: "De grote wijzer staat op de 2: dat is tien minuten over. Kijk nu naar de kleine wijzer.",
        20: "De grote wijzer staat op de 4: dat is tien voor half. Kijk naar welk uur de kleine wijzer onderweg is.",
        25: "De grote wijzer staat op de 5: dat is vijf voor half. Kijk naar welk uur de kleine wijzer onderweg is.",
        35: "De grote wijzer staat op de 7: dat is vijf over half. Kijk naar welk uur de kleine wijzer onderweg is.",
        40: "De grote wijzer staat op de 8: dat is tien over half. Kijk naar welk uur de kleine wijzer onderweg is.",
        50: "De grote wijzer staat op de 10: dat is tien voor. Kijk welk uur eraan komt.",
        5: "Elke stap van de grote wijzer is 5 minuten. Op de 1 is dat vijf over.",
        55: "De grote wijzer staat op de 11: dat is vijf voor. Kijk welk uur eraan komt."
      };
      if (relationships[minute]) return relationships[minute];
    }
    switch (minute) {
      case 0: return "De grote wijzer staat op de 12: het is precies een heel uur. Kijk nu naar de kleine wijzer.";
      case 15: return "De grote wijzer staat op de 3: dat is kwart over. Kijk nu naar de kleine wijzer.";
      case 30: return "De grote wijzer staat op de 6: dat is half. Kijk naar welk uur de kleine wijzer onderweg is.";
      case 45: return "De grote wijzer staat op de 9: dat is kwart voor. Kijk welk uur eraan komt.";
      default: return "Elke stap van de grote wijzer is 5 minuten. Tel vanaf de 12 tot waar hij staat.";
    }
  }

  function resolve(levelId, question, speaker) {
    if (!["minnie", "moose"].includes(speaker)) throw new Error("Unknown hint speaker.");
    const key = speaker === "minnie" ? "hintMinnie" : "hintMoose";
    // Unmigrated worlds retain their exact authored strings. Migrated questions
    // can override either stage independently, including old editor drafts.
    if (!usesReusableHints(levelId) || question[key] !== undefined) return question[key];
    const first = speaker === "minnie";
    if (question.family === "spelling") {
      return first ? "Lees de woorden rustig. Welke spelling herken je?"
        : "Vergelijk de woorden letter voor letter. Kijk waar ze van elkaar verschillen.";
    }
    if (["clock_reading", "clock_reading_quarter", "clock_reading_half_hour", "clock_reading_five_minutes"].includes(question.family)) {
      if (question.visual?.type !== "clock") throw new Error("Missing clock visual.");
      const strategy = clock(question.visual.minute, question.family === "clock_reading_five_minutes");
      return first ? "Kijk eerst naar de grote wijzer." : strategy;
    }
    // Authored semantic order: groups/each, dividend/divisor, count/price,
    // or length/parts. Never infer these roles by parsing Dutch prose.
    const { a, b, strategy = question.family, currency, unit } = question.hintParameters || {};
    if (![a, b].every(n => Number.isInteger(n) && n > 0)) {
      throw new Error(`Missing positive integer hint operands for ${question.id}.`);
    }
    switch (strategy) {
      case "addition":
        return first ? "Kijk welke twee aantallen je bij elkaar moet optellen." : stepwise(a, b, false);
      case "subtraction":
        return first ? "Kijk hoeveel er van het begingetal afgaat." : stepwise(a, b, true);
      case "duration_addition":
        if (!unit) throw new Error("Duration hints require an authored unit.");
        return first ? "Tel de twee tijdsduren bij elkaar op." : stepwise(a, b, false, unit);
      case "bare_multiplication":
        return first ? `Denk aan ${a} groepjes van ${b}.` : multiplication(a, b);
      case "bare_division":
        return first ? `Welke keersom met ${b} helpt je bij ${a} : ${b}?`
          : `Zoek in de tafel van ${b} welk getal precies op ${a} uitkomt.`;
      case "story_multiplication":
        return first ? "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?"
          : `Je hebt ${a} groepjes van ${b}. Reken ${a} × ${b}.`;
      case "story_division":
        return first ? "Wat wordt verdeeld? En over hoeveel gelijke groepjes?"
          : `Je verdeelt ${a} over ${b} gelijke groepjes. Reken ${a} : ${b}.`;
      case "money":
        if (!["euro", "munten"].includes(currency)) throw new Error("Money hints require a supported authored currency.");
        return first ? "Hoeveel keer betaal je hetzelfde bedrag?"
          : `Je betaalt ${a} keer ${b} ${currency}. Reken ${a} × ${b}.`;
      case "route":
        return first ? "In hoeveel gelijke stukken wordt de totale lengte verdeeld?"
          : `Verdeel ${a} door ${b}. Reken ${a} : ${b}.`;
      default: throw new Error(`Unsupported hint strategy: ${strategy}.`);
    }
  }

  const api = { isArcLevel, usesReusableHints, resolve, multiplication };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.AtlasChallengeHints = api;
})(typeof window !== "undefined" ? window : globalThis);
