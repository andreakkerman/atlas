# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: session-report.spec.js >> Atlas Session Report v0.1 >> does not collect in ordinary Playwright, editor, or debug completion
- Location: tests\session-report.spec.js:175:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-menu-tile="LVL-0001"]')
    - locator resolved to <button type="button" aria-pressed="false" data-level="LVL-0001" data-menu-tile="LVL-0001" class="levelTile supportingLevelTile">…</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - button "Voortgang" [ref=e5] [cursor=pointer]
    - group [ref=e6]:
      - generic "Instellingen" [ref=e7] [cursor=pointer]:
        - img [ref=e8]
  - generic [ref=e11]:
    - heading "Kies een avontuur" [level=1] [ref=e12]
    - paragraph [ref=e13]: Wat ga je vandaag ontdekken?
  - region "Beschikbare avonturen" [ref=e14]:
    - generic [ref=e15]:
      - button "Vorig avontuur" [ref=e16] [cursor=pointer]: ‹
      - button "ARC Atlas starten" [ref=e17] [cursor=pointer]:
        - generic: Nieuw
        - generic [ref=e19]:
          - generic [ref=e20]: 4 plaatsen · 12 opdrachten
          - strong [ref=e21]: ARC Atlas
          - generic [ref=e22]: Verken Dam Battlegrounds, Buried City, Riven Tides en Stella Montis met Valente.
          - generic [ref=e23]: ">Tik om te starten"
      - button "Volgend avontuur" [ref=e24] [cursor=pointer]: ›
    - generic "Avontuur kiezen" [ref=e25]:
      - button "Toon avontuur 1" [ref=e26] [cursor=pointer]
      - button "Toon avontuur 2" [ref=e27] [cursor=pointer]
      - button "Toon avontuur 3" [ref=e28] [cursor=pointer]
      - button "Toon avontuur 4" [ref=e29] [cursor=pointer]
      - button "Toon avontuur 5" [ref=e30] [cursor=pointer]
      - button "Toon avontuur 6" [ref=e31] [cursor=pointer]
      - button "Toon avontuur 7" [ref=e32] [cursor=pointer]
      - button "Toon avontuur 8" [ref=e33] [cursor=pointer]
    - generic [ref=e34]:
      - button "3 plaatsen · 11 opdrachten De Runenpoort Verken een vergeten Vikingtempel en ontdek het geheim van de oude runen." [ref=e35] [cursor=pointer]:
        - generic [ref=e37]:
          - generic [ref=e38]: 3 plaatsen · 11 opdrachten
          - strong [ref=e39]: De Runenpoort
          - generic [ref=e40]: Verken een vergeten Vikingtempel en ontdek het geheim van de oude runen.
      - button "4 plaatsen · 12 opdrachten De Nautilus Duik in een geheim avontuur met de Nautilus." [ref=e41] [cursor=pointer]:
        - generic [ref=e43]:
          - generic [ref=e44]: 4 plaatsen · 12 opdrachten
          - strong [ref=e45]: De Nautilus
          - generic [ref=e46]: Duik in een geheim avontuur met de Nautilus.
      - button "Nieuw 4 plaatsen · 12 opdrachten ARC Atlas Verken Dam Battlegrounds, Buried City, Riven Tides en Stella Montis met Valente." [pressed] [ref=e47] [cursor=pointer]:
        - generic: Nieuw
        - generic [ref=e49]:
          - generic [ref=e50]: 4 plaatsen · 12 opdrachten
          - strong [ref=e51]: ARC Atlas
          - generic [ref=e52]: Verken Dam Battlegrounds, Buried City, Riven Tides en Stella Montis met Valente.
      - button "5 plaatsen · 14 opdrachten De Reis door Europa Reis door zeven Europese landen" [ref=e53] [cursor=pointer]:
        - generic [ref=e55]:
          - generic [ref=e56]: 5 plaatsen · 14 opdrachten
          - strong [ref=e57]: De Reis door Europa
          - generic [ref=e58]: Reis door zeven Europese landen
      - button "4 plaatsen · 12 opdrachten Leonardo’s onvoltooide atlas Reis door Italië en ontdek hoe Leonardo keek, mat, onderzocht en ontwierp." [ref=e59] [cursor=pointer]:
        - generic [ref=e61]:
          - generic [ref=e62]: 4 plaatsen · 12 opdrachten
          - strong [ref=e63]: Leonardo’s onvoltooide atlas
          - generic [ref=e64]: Reis door Italië en ontdek hoe Leonardo keek, mat, onderzocht en ontwierp.
      - button "5 plaatsen · 11 opdrachten Cairo Museum Een stille zaal met een sarcofaag die Sven naar oud Egypte trekt." [ref=e65] [cursor=pointer]:
        - generic [ref=e67]:
          - generic [ref=e68]: 5 plaatsen · 11 opdrachten
          - strong [ref=e69]: Cairo Museum
          - generic [ref=e70]: Een stille zaal met een sarcofaag die Sven naar oud Egypte trekt.
      - button "1 plaats · 0 opdrachten Cinematic FX Lab Developer benchmark voor Atlas Cinematic/WebGPU-effecten." [ref=e71] [cursor=pointer]:
        - generic [ref=e73]:
          - generic [ref=e74]: 1 plaats · 0 opdrachten
          - strong [ref=e75]: Cinematic FX Lab
          - generic [ref=e76]: Developer benchmark voor Atlas Cinematic/WebGPU-effecten.
      - button "4 plaatsen · 12 opdrachten De Blokkenpoort Ontdek vijf blokkenkamers en vind de weg terug naar huis." [ref=e77] [cursor=pointer]:
        - generic [ref=e79]:
          - generic [ref=e80]: 4 plaatsen · 12 opdrachten
          - strong [ref=e81]: De Blokkenpoort
          - generic [ref=e82]: Ontdek vijf blokkenkamers en vind de weg terug naar huis.
```

# Test source

```ts
  1   | // @ts-check
  2   | const { test, expect } = require("@playwright/test");
  3   | const path = require("path");
  4   | const { pathToFileURL } = require("url");
  5   | 
  6   | const gameUrl = process.env.ATLAS_EDITOR_URL || pathToFileURL(path.join(__dirname, "..", "index.html")).toString();
  7   | const testUrl = `${gameUrl}?atlasSessionTest=1`;
  8   | 
  9   | async function cleanOpen(page, url = testUrl) {
  10  |   await page.goto(url);
  11  |   await page.evaluate(() => localStorage.clear());
  12  |   await page.reload();
  13  |   await enterMenu(page);
  14  | }
  15  | 
  16  | async function enterMenu(page) {
  17  |   if (!(await page.locator('.menuScreen').count())) {
  18  |     await page.getByRole("button", { name: "Start avontuur", exact: true }).click();
  19  |   }
  20  |   await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
  21  | }
  22  | 
  23  | async function startHeroAdventure(page) {
> 24  |   await page.locator('[data-menu-tile="LVL-0001"]').click();
      |                                                     ^ Error: locator.click: Test timeout of 30000ms exceeded.
  25  | }
  26  | 
  27  | async function createSyntheticSession(page, start, title = "De Runenpoort") {
  28  |   return page.evaluate(({ start, title }) => {
  29  |     const report = window.AtlasSessionReport;
  30  |     report.setNowForTest(start);
  31  |     report.startOrVisitLevel({
  32  |       adventureId: "LVL-0001",
  33  |       adventureTitle: title,
  34  |       levelId: `LVL-${start}`,
  35  |       levelTitle: "Testplek"
  36  |     });
  37  |     report.setNowForTest(start + 1000);
  38  |     return report.end("menu").id;
  39  |   }, { start, title });
  40  | }
  41  | 
  42  | test.describe("Atlas Session Report v0.1", () => {
  43  |   test("starts on adventure selection and ends on return to menu", async ({ page }) => {
  44  |     await cleanOpen(page);
  45  |     await enterMenu(page);
  46  |     await startHeroAdventure(page);
  47  |     await expect(page.getByRole("heading", { name: "De Runenpoort" })).toBeVisible();
  48  | 
  49  |     const active = await page.evaluate(() => window.AtlasSessionReport.getCurrent());
  50  |     expect(active.adventureId).toBe("LVL-0001");
  51  |     expect(active.levels.map((entry) => entry.id)).toEqual(["LVL-0001"]);
  52  | 
  53  |     await page.getByRole("button", { name: "Terug" }).click();
  54  |     const result = await page.evaluate(() => ({
  55  |       current: window.AtlasSessionReport.getCurrent(),
  56  |       sessions: window.AtlasSessionReport.getSessions()
  57  |     }));
  58  |     expect(result.current).toBeNull();
  59  |     expect(result.sessions).toHaveLength(1);
  60  |     expect(result.sessions[0].endReason).toBe("menu");
  61  |   });
  62  | 
  63  |   test("pauses active time after two minutes without activity", async ({ page }) => {
  64  |     await cleanOpen(page);
  65  |     const timing = await page.evaluate(() => {
  66  |       const report = window.AtlasSessionReport;
  67  |       report.setNowForTest(0);
  68  |       report.startOrVisitLevel({
  69  |         adventureId: "LVL-0001",
  70  |         adventureTitle: "De Runenpoort",
  71  |         levelId: "LVL-0001",
  72  |         levelTitle: "De Runenpoort"
  73  |       });
  74  |       report.setNowForTest(60_000);
  75  |       report.activity();
  76  |       report.setNowForTest(300_000);
  77  |       report.activity();
  78  |       report.setNowForTest(600_000);
  79  |       const session = report.end("menu");
  80  |       return { activeMs: session.activeMs, elapsedMs: session.elapsedMs };
  81  |     });
  82  | 
  83  |     expect(timing).toEqual({ activeMs: 300_000, elapsedMs: 600_000 });
  84  |   });
  85  | 
  86  |   test("maps tables, division, stories and clocks to the four report categories", async ({ page }) => {
  87  |     await cleanOpen(page);
  88  |     const categories = await page.evaluate(() => {
  89  |       const classify = window.AtlasSessionReport.classifyQuestion;
  90  |       return [
  91  |         classify({ family: "bare_multiplication", presentation: "bare", prompt: "7 × 8 = ?" }),
  92  |         classify({ family: "bare_division", presentation: "bare", prompt: "56 : 8 = ?" }),
  93  |         classify({ family: "story_division", presentation: "story", prompt: "Een route heeft 4 stukken." }),
  94  |         classify({ family: "money", presentation: "story", prompt: "Wat kost het samen?" }),
  95  |         classify({ family: "clock_reading", presentation: "bare", prompt: "Hoe laat?", visual: { type: "clock", minute: 45 } })
  96  |       ];
  97  |     });
  98  | 
  99  |     expect(categories).toEqual([
  100 |       { category: "Tafels", detail: "Tafel van 8" },
  101 |       { category: "Delen", detail: "Delen door 8" },
  102 |       { category: "Verhaalsommen", detail: "Delen" },
  103 |       { category: "Verhaalsommen", detail: "Vermenigvuldigen" },
  104 |       { category: "Klokkijken", detail: "Kwartieren" }
  105 |     ]);
  106 |   });
  107 | 
  108 |   test("records attempts, hints, assistance and response time from the learning flow", async ({ page }) => {
  109 |     await cleanOpen(page);
  110 |     const question = await page.evaluate(() => {
  111 |       const report = window.AtlasSessionReport;
  112 |       report.setNowForTest(1000);
  113 |       report.startOrVisitLevel({
  114 |         adventureId: "LVL-0001",
  115 |         adventureTitle: "De Runenpoort",
  116 |         levelId: "LVL-0001",
  117 |         levelTitle: "De Runenpoort"
  118 |       });
  119 |       report.beginQuestion(
  120 |         { id: "v1", family: "story_division", presentation: "story", answerMode: "open", prompt: "Verdeel 24 runen over 6 schilden." },
  121 |         { levelId: "LVL-0001", levelTitle: "De Runenpoort", challengeId: "zon", challengeTitle: "Zonrune", slotId: "s1", variantId: "v1" }
  122 |       );
  123 |       report.setNowForTest(4000);
  124 |       report.recordAttempt(false);
```