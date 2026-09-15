# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cinematic-route-overlay.spec.js >> cinematic route overlay paints above presentation and follows editor visibility
- Location: tests\cinematic-route-overlay.spec.js:6:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 39
Received:   0
```

# Page snapshot

```yaml
- main [ref=e3]:
  - navigation "Spelbesturing" [ref=e4]:
    - button "Terug naar menu" [ref=e5] [cursor=pointer]: Menu
    - button "Grafische instellingen" [ref=e6] [cursor=pointer]: ◆Graphics
  - region "Verbonden wereld" [ref=e7]:
    - generic "WebGPU Cinematic"
    - generic [ref=e8]:
      - img "Een doorlopend bospad naar de Vikingtempel" [ref=e9]
      - button "Uil" [ref=e10]
      - img [ref=e12]:
        - generic [ref=e26]: forest-start
        - generic [ref=e29]: forest-rune-approach
        - generic [ref=e32]: center-trail
        - generic [ref=e35]: lower-trail
        - generic [ref=e38]: trail-rise-2
        - generic [ref=e41]: trail-top
        - generic [ref=e44]: sun-rune-approach
        - generic [ref=e47]: stone-rune-approach
        - generic [ref=e50]: temple-approach
        - generic [ref=e53]: gate-step-low
        - generic [ref=e56]: wind-rune-approach
        - generic [ref=e59]: gate-step-upper
        - generic [ref=e64]: forestRune
        - generic [ref=e69]: zon
        - generic [ref=e74]: steen
        - generic [ref=e79]: wind
        - generic [ref=e84]: templeGate
      - button "Bosrune" [ref=e85] [cursor=pointer]
      - button "Runenpoort" [ref=e86] [cursor=pointer]
      - button "Zonrune" [ref=e87] [cursor=pointer]
      - button "Steenrune" [ref=e88] [cursor=pointer]
      - button "Praat met Freya" [ref=e89] [cursor=pointer]
      - generic:
        - img "Sven"
    - img
    - complementary [ref=e91]:
      - generic [ref=e92]:
        - strong [ref=e93]: Developer Tools
        - button "Editorpaneel inklappen" [ref=e94] [cursor=pointer]: Minimize
      - generic [ref=e95]: "Current Mode: Level Editing"
      - generic [ref=e96]: "Draft Status: Clean"
      - navigation "Editor sections" [ref=e97]:
        - button "Characters" [ref=e98] [cursor=pointer]
        - button "Challenges" [ref=e99] [cursor=pointer]
        - button "Graphics" [ref=e100] [cursor=pointer]
      - paragraph [ref=e101]: Real files change only when Apply is pressed.
      - group [ref=e102]:
        - generic "Sven" [ref=e103] [cursor=pointer]
        - generic [ref=e104]:
          - group [ref=e105]:
            - generic "General" [ref=e106] [cursor=pointer]
            - generic [ref=e107]:
              - generic [ref=e108]:
                - generic [ref=e109]: Sprite Scale (Level)
                - spinbutton "Sprite Scale (Level)" [ref=e110]: "1.2"
              - generic [ref=e111]:
                - generic [ref=e112]: Movement Speed (Level)
                - spinbutton "Movement Speed (Level)" [ref=e113]: "250"
              - generic [ref=e114]:
                - generic [ref=e115]: Animation Speed (Level)
                - spinbutton "Animation Speed (Level)" [ref=e116]: "1"
          - group [ref=e117]:
            - generic "Visual controls" [ref=e118] [cursor=pointer]
            - generic [ref=e119]:
              - generic [ref=e120]: Brightness
              - slider "Brightness" [ref=e121]: "1"
              - status [ref=e122]: "1.00"
            - generic [ref=e123]:
              - generic [ref=e124]: Contrast
              - slider "Contrast" [ref=e125]: "1"
              - status [ref=e126]: "1.00"
            - generic [ref=e127]:
              - generic [ref=e128]: Saturation
              - slider "Saturation" [ref=e129]: "1"
              - status [ref=e130]: "1.00"
            - generic [ref=e131]:
              - generic [ref=e132]: Warmth
              - slider "Warmth" [ref=e133]: "0"
              - status [ref=e134]: "0.00"
            - generic [ref=e135]:
              - generic [ref=e136]: Tint
              - slider "Tint" [ref=e137]: "0"
              - status [ref=e138]: "0.00"
          - group [ref=e139]:
            - generic "Sven Locomotion" [ref=e140]
      - generic [ref=e141]:
        - strong [ref=e142]: NPC instances
        - paragraph [ref=e143]: Select an NPC challenge in Challenges to tune its character here.
      - generic [ref=e144]:
        - button "Refresh assets" [ref=e145] [cursor=pointer]
        - generic [ref=e146]: 12 afbeeldingen, 4 audiobestanden, 6 complete sets.
      - group [ref=e147]:
        - generic "Ambient animals 1" [ref=e148] [cursor=pointer]
        - button "Selecteer Uil" [ref=e150] [cursor=pointer]: Uil
        - generic [ref=e151]:
          - generic [ref=e152]:
            - strong [ref=e153]: forestOwl
            - generic [ref=e154]: Uil
          - generic [ref=e155]:
            - generic [ref=e156]: Schaal
            - slider "Schaal" [ref=e157]: "0.18"
            - status [ref=e158]: "0.18"
          - generic [ref=e159]:
            - generic [ref=e160]: Softness
            - slider "Softness" [ref=e161]: "0.3"
            - status [ref=e162]: "0.30"
          - generic [ref=e163]:
            - generic [ref=e164]: Saturation
            - slider "Saturation" [ref=e165]: "0.9"
            - status [ref=e166]: "0.92"
          - generic [ref=e167]:
            - generic [ref=e168]: Volume
            - slider "Volume" [ref=e169]: "0.65"
            - status [ref=e170]: 65%
          - generic [ref=e171]:
            - checkbox "Mirror horizontally" [ref=e172]
            - generic [ref=e173]: Mirror horizontally
          - generic [ref=e174]: x 274, y 123 · bottom-center
          - generic [ref=e175]:
            - button "Preview blink" [ref=e176] [cursor=pointer]
            - button "Preview sound" [ref=e177] [cursor=pointer]
            - button "Duplicate selected" [ref=e178] [cursor=pointer]
            - button "Delete" [ref=e179] [cursor=pointer]
        - group [ref=e180]:
          - generic "Add ambient animal" [ref=e181] [cursor=pointer]
          - option "Manual frames" [selected]
          - option "owl + sound"
          - option "raven + sound"
          - option "seagull + sound"
          - option "Choose asset" [selected]
          - option "owl-closed.png"
          - option "owl-open.png"
          - option "raven-closed.png"
          - option "raven-open.png"
          - option "seagull-closed.png"
          - option "seagull-open.png"
          - option "Choose asset" [selected]
          - option "owl-closed.png"
          - option "owl-open.png"
          - option "raven-closed.png"
          - option "raven-open.png"
          - option "seagull-closed.png"
          - option "seagull-open.png"
          - option "None" [selected]
          - option "owl-call.mp3"
          - option "raven-call.mp3"
          - option "seagull-call.mp3"
      - generic [ref=e182]:
        - button "Apply" [ref=e183] [cursor=pointer]
        - button "Revert" [ref=e184] [cursor=pointer]
      - paragraph [ref=e185]: Dev server actief.
  - generic [ref=e186]:
    - generic "Avonturenteam" [ref=e187]:
      - button "Minnie laten spinnen" [ref=e188] [cursor=pointer]:
        - img "Minnie"
        - generic [ref=e189]: Minnie
      - button "Moose laten spinnen" [ref=e190] [cursor=pointer]:
        - img "Moose"
        - generic [ref=e191]: Moose
    - generic:
      - paragraph: Minnie
      - paragraph: Kijk, blauwe tekens tussen de oude bomen.
      - paragraph: Bos - 0/3 opdrachten voltooid
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const base = process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173';
  3  | const realGpu = process.env.ATLAS_WEBGPU_QA === '1';
  4  | 
  5  | for (const renderer of ['cinematic', 'illustrated']) {
  6  |   test(renderer + ' route overlay paints above presentation and follows editor visibility', async ({ page }, info) => {
  7  |     let draft = {};
  8  |     await page.route('**/__dev/levels/*/editor-draft', route => {
  9  |       if (route.request().method() !== 'GET') draft = route.request().postDataJSON() || {};
  10 |       return route.fulfill({ json: draft });
  11 |     });
  12 |     await page.goto(base + '/?dev=editor&level=LVL-0001');
  13 |     if (renderer === 'cinematic') {
  14 |       await page.locator('[data-graphics-action="toggle"]').click();
  15 |       await page.locator('[data-renderer-choice="cinematic"]').click();
  16 |       await page.locator('[data-graphics-action="close"]').click();
  17 |       if (realGpu) {
  18 |         await expect.poll(() => page.evaluate(() => window.eval('cinematicRenderer').snapshot().ready), { timeout: 30000 }).toBe(true);
  19 |       } else {
  20 |         // Layout-only WebKit coverage: an opaque presentation canvas at its real CSS layer.
  21 |         await page.addStyleTag({ content: '.cinematicViewportCanvas { opacity:1; visibility:visible; background:#182d29; }' });
  22 |       }
  23 |     }
  24 |     await page.keyboard.press('Control+Shift+D');
  25 |     await expect(page.locator('[data-developer-tools]')).toBeVisible();
  26 |     const layering = await page.evaluate(() => {
  27 |       const svg = document.querySelector('[data-debug-overlay]');
  28 |       const stage = svg.closest('[data-world-stage]');
  29 |       let layer = svg;
  30 |       while (layer.parentElement !== stage) layer = layer.parentElement;
  31 |       return {
  32 |         layer: Number(getComputedStyle(layer).zIndex) || 0,
  33 |         canvas: Number(getComputedStyle(document.querySelector('[data-cinematic-canvas]') || document.querySelector('.worldArt')).zIndex),
  34 |         nodes: svg.querySelectorAll('[data-walkpath-index]').length,
  35 |         expectedNodes: window.eval('authoredWalkPathPoints')(window.eval('level')).length,
  36 |         edges: svg.querySelectorAll('.debugPathEdge').length
  37 |       };
  38 |     });
> 39 |     expect(layering.layer).toBeGreaterThan(layering.canvas);
     |                            ^ Error: expect(received).toBeGreaterThan(expected)
  40 |     expect(layering.nodes).toBe(layering.expectedNodes);
  41 |     expect(layering.edges).toBeGreaterThan(0);
  42 |     await page.locator('[data-debug-action="collapse-editor-panel"]').click();
  43 |     const node = page.locator('[data-walkpath-index] circle').first();
  44 |     const initial = await node.evaluate(circle => ({ x: Number(circle.getAttribute('cx')), y: Number(circle.getAttribute('cy')) }));
  45 |     const box = await node.boundingBox();
  46 |     await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  47 |     await page.mouse.down();
  48 |     await page.mouse.move(box.x + box.width / 2 + 20, box.y + box.height / 2 + 8, { steps: 3 });
  49 |     await page.mouse.up();
  50 |     const moved = await node.evaluate(circle => ({ x: Number(circle.getAttribute('cx')), y: Number(circle.getAttribute('cy')) }));
  51 |     expect(moved).not.toEqual(initial);
  52 |     await page.screenshot({ path: info.outputPath(renderer + '-route.png') });
  53 |     await page.keyboard.press('Control+Shift+D');
  54 |     await expect(page.locator('[data-debug-overlay]')).toHaveCount(0);
  55 |     await expect(page.locator('[data-walkpath-index]')).toHaveCount(0);
  56 |     await page.keyboard.press('Control+Shift+D');
  57 |     await expect(node).toBeVisible();
  58 |     expect(await node.evaluate(circle => ({ x: Number(circle.getAttribute('cx')), y: Number(circle.getAttribute('cy')) }))).toEqual(moved);
  59 |     // Camera updates use the same geometry as the world, without a separate route model.
  60 |     await page.evaluate(() => {
  61 |       window.eval('state.worldX = 1600');
  62 |       window.eval('state.cameraX = undefined');
  63 |       window.eval('updateWorldDom')();
  64 |     });
  65 |     const geometry = await page.evaluate(() => {
  66 |       const svg = document.querySelector('[data-debug-overlay]').getBoundingClientRect();
  67 |       const world = document.querySelector('.worldTrack').getBoundingClientRect();
  68 |       return { x: svg.x - world.x, y: svg.y - world.y, width: svg.width - world.width, height: svg.height - world.height };
  69 |     });
  70 |     for (const value of Object.values(geometry)) expect(Math.abs(value)).toBeLessThan(0.1);
  71 |   });
  72 | }
  73 | 
```