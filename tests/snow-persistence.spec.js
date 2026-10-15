const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const {bootEditorTest,chooseCreation,selectSystem}=require('./editor-workspace-helpers');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4185',root=path.join(__dirname,'..'),file=path.join(root,'Levels/world-config.js');
require('./editor-draft-fixture').preserveEditorDrafts(test,root);
let saved;
test.beforeEach(({},info)=>{saved=fs.readFileSync(file);fs.mkdirSync(info.outputDir,{recursive:true});fs.writeFileSync(info.outputPath('world-config-before.js'),saved);});
test.afterEach(async({page})=>{
 await page.close();
 // Windows can briefly retain the server's atomic-save file handle.
 for(let attempt=0;attempt<4;attempt++){
  try{if(!fs.readFileSync(file).equals(saved))fs.writeFileSync(file,saved);break;}
  catch(error){if(attempt===3||!['UNKNOWN','EBUSY','EPERM'].includes(error.code))throw error;await new Promise(resolve=>setTimeout(resolve,100));}
 }
 expect(fs.readFileSync(file).equals(saved)).toBe(true);
});
for(const [preset,strength,motion] of [['Windblown Snow',.7,'falling'],['Snow Squall',1.2,'windFlow']])test(preset+' uses normal Apply, reload and Revert without replacing authored fields',async({page})=>{
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await bootEditorTest(page,base+'/?dev=editor&level=LVL-0036');await page.keyboard.press('Control+Shift+D');
 const fields=()=>page.evaluate(()=>AtlasCinematicSettings.normalize(window.eval('worldResolver').levelSettings('LVL-0036').cinematicLighting).particles.items);
 const original=await fields();await chooseCreation(page,'cinematic:snow');await page.locator('[data-add-variant]').selectOption(preset);await page.locator('[data-cinematic-action="add"]').click();
 const gust=page.locator('[data-cinematic-setting="gustStrength"]');await expect(gust).toHaveValue(String(strength));
 await gust.fill('0.9');await expect(gust.locator('..').locator('output')).toHaveText('0.90');
 await expect(page.locator('[data-cinematic-setting="motion"]')).toHaveValue(motion);
 if(motion==='windFlow'){
  const control=page.locator('[data-cinematic-setting="motion"]'),gravity=page.locator('[data-cinematic-setting="gravity"]');
  await expect(gravity).toBeDisabled();await control.selectOption('falling');await expect(gravity).toBeEnabled();
  await control.selectOption('windFlow');await expect(gravity).toBeDisabled();
 }
 const applied=await fields();expect(applied.at(-1).gustStrength).toBe(.9);expect(applied.at(-1).motion).toBe(motion);
 await expect.poll(()=>page.evaluate(()=>{const settings=window.eval('cinematicRenderer').getSettings();return settings.particles.items.at(-1).gustStrength;})).toBe(.9);
 expect(await page.evaluate(()=>AtlasCinematicRenderer.packEffects(window.eval('cinematicRenderer').getSettings()).filter(e=>e.key==='particles').at(-1).data[33])).toBeCloseTo(.9,5);expect(applied.slice(0,-1)).toEqual(original);
 await page.getByRole('button',{name:'Apply',exact:true}).click();await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Applied');
 await page.reload();await page.waitForFunction(()=>window.eval('typeof level')!=='undefined'&&window.eval('state.screen')==='scene');expect(await fields()).toEqual(applied);
 await page.keyboard.press('Control+Shift+D');await selectSystem(page,'particles');await page.locator('[data-cinematic-preset="particles"]').selectOption('Blizzard');expect(await fields()).not.toEqual(applied);
 await page.locator('[data-workspace-action="changes"]').click();await page.getByRole('button',{name:'Revert',exact:true}).click();await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Reverted');expect(await fields()).toEqual(applied);
});

