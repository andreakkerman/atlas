const {test,expect}=require('@playwright/test');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
test.use({reducedMotion:'no-preference'});
const hero=page=>page.locator('.heroLevelTile');
async function open(page,worlds){
 await page.clock.install();await page.goto(base);
 if(worlds)await page.evaluate(worlds=>{const r=window.eval('worldResolver'),c=r.getConfig();for(const w of Object.values(c.worlds))delete w.isNew;for(const l of Object.values(c.levels))delete l.isNew;for(const id of worlds)c.worlds[id]={...c.worlds[id],isNew:true};r.setConfig(c);},worlds);
 await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
 await page.waitForFunction(()=>window.eval('menuAdventureStats.loaded'));
 await page.mouse.move(0,0);
}
async function stays(page,id){
 await page.clock.fastForward(31000);
 await expect(hero(page)).toHaveAttribute('data-featured-level',id);
 expect(await page.evaluate(()=>window.eval('menuCarouselRuntime').timer)).toBeNull();
}
async function activate(page,selector){
 // Let the existing 620ms reveal finish under the mocked clock before the next tap.
 await page.clock.runFor(700);
 const button=page.locator(selector);if(test.info().project.name.startsWith('ipad-'))await button.tap();else await button.click();
}
test('Nieuw hero defaults to ARC, stays put, preserves manual selection and resets only on fresh menu',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await open(page);
 await expect(hero(page)).toHaveAttribute('data-featured-level','LVL-0032');
 await expect(hero(page).locator('.levelNewBadge')).toHaveText('Nieuw');
 const order=await page.locator('[data-menu-tile]').evaluateAll(nodes=>nodes.map(n=>n.dataset.menuTile));
 expect(new Set(order).size).toBe(order.length);
 await stays(page,'LVL-0032');
 await activate(page,'[data-action="menu-next"]');await stays(page,order[3]);
 await activate(page,'[data-action="menu-previous"]');await stays(page,'LVL-0032');
 await activate(page,'[data-menu-index="0"]');await stays(page,'LVL-0001');
 await page.evaluate(()=>window.eval('render')());await stays(page,'LVL-0001');
 await expect(page.locator('[data-menu-index="0"]')).toHaveAttribute('aria-current','true');
 await expect(page.locator('[data-menu-tile="LVL-0001"]')).toHaveAttribute('aria-pressed','true');
 expect(await page.locator('[data-menu-tile]').evaluateAll(nodes=>nodes.map(n=>n.dataset.menuTile))).toEqual(order);
 await page.evaluate(()=>window.eval('returnToMenu')());await expect(hero(page)).toHaveAttribute('data-featured-level','LVL-0032');
 await page.screenshot({path:info.outputPath('nieuw-hero.png')});
 await activate(page,'[data-action="menu-previous"]');
 await page.reload();await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
 await expect(hero(page)).toHaveAttribute('data-featured-level','LVL-0032');await stays(page,'LVL-0032');
 expect(errors).toEqual([]);
});
for(const worlds of [['LVL-0004'],['LVL-0032','LVL-0004']])for(const direction of [1,-1])test(`generic initial Nieuw hero follows menu order: ${worlds.join(',')} direction ${direction}`,async({page})=>{
 await open(page,worlds);await expect(hero(page)).toHaveAttribute('data-featured-level','LVL-0004');await stays(page,'LVL-0004');
 const order=await page.locator('[data-menu-tile]').evaluateAll(nodes=>nodes.map(n=>n.dataset.menuTile));
 // Two bounded directional runs together visit every enabled world, including wraparound.
 let index=1;
 for(let step=0;step<Math.ceil(order.length/2);step++){index=(index+direction+order.length)%order.length;await activate(page,`[data-action="menu-${direction===1?'next':'previous'}"]`);await expect(hero(page)).toHaveAttribute('data-featured-level',order[index]);await expect(page.locator(`[data-menu-index="${index}"]`)).toHaveAttribute('aria-current','true');}
 await stays(page,order[index]);
 // Disabling the earlier new world removes it from the default candidates.
 await page.evaluate(()=>{const r=window.eval('worldResolver');for(const e of r.enabledEntries('LVL-0004'))r.setEnabled('LVL-0004',e.id,false);window.eval('returnToMenu')();});
 await expect(hero(page)).toHaveAttribute('data-featured-level',worlds.length===2?'LVL-0032':'LVL-0001');
});
