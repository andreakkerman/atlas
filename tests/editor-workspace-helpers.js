async function selectSceneItem(page, kind, id) {
  if(!await page.locator('[data-editor-workspace]').count())await page.keyboard.press('Control+Shift+D');
  await page.keyboard.press('Control+k');
  await page.locator('[data-editor-search]').fill('');
  await page.locator(`[data-editor-browser] [data-workspace-kind="${kind}"][data-workspace-id="${id}"]`).click();
  await page.getByRole('button',{name:'Collapse scene browser',exact:true}).click();
}
async function chooseCreation(page,key) {
  if(!await page.locator('[data-editor-add]').count())await page.locator('[data-workspace-action="add"]').click();
  await page.locator('[data-add-category]').selectOption('All');await page.locator('[data-editor-add-search]').fill('');
  await page.locator('[data-add-family]').selectOption(key);
}
async function addEffect(page,preset='light-source-enhancement') {
  await chooseCreation(page,'effect:'+preset);await page.locator('[data-add-effect]').click();
  const stage=await page.locator('[data-world-stage]').boundingBox();await page.mouse.click(stage.x+stage.width*.35,stage.y+stage.height*.3);
}
async function selectSystem(page,system) {
  const spatial=await page.evaluate(system=>!!window.AtlasCinematicSettings.systems[system].type,system);
  if(spatial) {
    await page.keyboard.press('Control+k');await page.locator('[data-editor-search]').fill('');
    const item=page.locator('[data-editor-browser] [data-workspace-system="'+system+'"]');
    if(!await item.count())throw new Error('Select an existing '+system+' instance, or create one first.');
    await item.first().click();await page.getByRole('button',{name:'Collapse scene browser',exact:true}).click();
  } else {
    await selectSceneItem(page,'environment','environment');
    const group=page.locator('[data-environment-system="'+system+'"]');
    if(!await group.count())await page.locator('[data-environment-other]').click();
    if(!await group.evaluate(n=>n.open))await group.locator(':scope > summary').click();
    const more=group.locator('[data-editor-panel-key="environment-more-'+system+'"]');
    if(await more.count() && !await more.evaluate(n=>n.open))await more.locator('summary').click();
  }
}
async function addCinematic(page,system) {
  await chooseCreation(page,'cinematic:'+system);await page.locator('[data-cinematic-action="add"]').click();
}
async function selectEmissive(page) {
  await selectSceneItem(page,'environment','environment');
  const glow=page.locator('[data-editor-panel-key="emissive-glow"]');
  if(!await glow.count())await page.locator('[data-environment-other]').click();
  if(!await glow.evaluate(n=>n.open))await glow.locator('summary').click();
}
async function bootEditorTest(page,url) {
  const target=new URL(url);target.searchParams.set('dev','editor');
  await page.goto(target.href);
  if(!new URL(url).searchParams.get('level')) {
    await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
    await page.locator('.menuScreen').waitFor();
  }
  await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');
  const id=new URL(url).searchParams.get('level');
  if(id)await page.waitForFunction(id=>window.eval('state.screen')==='scene'&&window.eval('level.id')===id,id);
}
module.exports={selectSceneItem,addEffect,selectSystem,addCinematic,bootEditorTest,chooseCreation,selectEmissive};
