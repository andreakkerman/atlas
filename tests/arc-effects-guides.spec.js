const { test, expect } = require('@playwright/test');
const path = require('path');
const root = path.join(__dirname, '..');
require('./editor-draft-fixture').preserveEditorDrafts(test, root);
const base = process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173';

async function select(page, id = 'LVL-0032') {
  await page.evaluate(async id => {
    await window.eval('selectLevel')(id, { startImmediately: true, recordStart: false });
    window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});
    window.eval('render')();
  }, id);
  await expect(page.locator('[data-actor="sven"]')).toBeVisible();
}
test('ARC portraits remain ARC during blinks and defaults return in other worlds', async ({page}, info) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => {if(m.type()==='error') errors.push(m.text());});
  await page.goto(base + '/');
  for (const id of ['LVL-0032','LVL-0001','LVL-0032']) {
    await select(page, id);
    for (const guide of ['minnie','moose']) {
      const expected = `assets/guides/${id==='LVL-0032'?'ARC_':''}${guide}.png`;
      const result = await page.evaluate(({guide,expected})=>{
        const image=document.querySelector(`[data-guide-image="${guide}"]`);
        window.eval('setGuideBlinkFrame')(guide,'closed');
        const closed=image.src;
        window.eval('setGuideBlinkFrame')(guide,'open');
        return {configured:window.eval('level').guides[guide].portrait,open:image.src,
          expected:window.eval('readyAssetSrc')(expected),closed,
          blink:window.eval('guideBlinkEnabled')(guide),loaded:image.complete&&image.naturalWidth>0};
      },{guide,expected});
      expect(result.configured).toBe(expected);
      expect(result.open).toBe(result.expected);
      expect(result.loaded).toBe(true);
      expect(result.blink).toBe(id!=='LVL-0032');
      if(id==='LVL-0032') expect(result.closed).toBe(result.open);
      const message = await page.locator('.teamMessage').textContent();
      await page.locator(`[data-purr-guide="${guide}"]`).click();
      await expect(page.locator(`[data-purr-guide="${guide}"]`)).toHaveClass(/teamPortraitPurring/);
      expect(await page.locator('.teamMessage').textContent()).toBe(message);
      // Finish playback before trying the other guide: purrs intentionally cannot overlap.
      await page.evaluate(()=>{
        const audio=window.eval('audioState').purr;
        audio.pause(); audio.dispatchEvent(new Event('ended'));
      });
    }
  }
  await page.screenshot({path:info.outputPath('arc-portraits.png')});
  expect(errors).toEqual([]);
});
