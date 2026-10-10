// Workspace state contains UI references only; authored data stays in its owning
// level/world stores and all property controls use the existing handlers.
const editorWorkspace = {
  selection: { kind: "level", id: "level" }, levelId: null,
  browserOpen: false, inspectorOpen: true, focus: false, search: "",
  addOpen: false, changesOpen: false, toolsOpen: false, playtest: false,
  browserWidth: 220, inspectorWidth: 340, views: new Map(),
  camera: null, pan: null, placement: null
};
try {
  const saved=JSON.parse(localStorage.getItem('atlas.editor.workspace.v1') || 'null');
  if(saved) {
    for(const key of ['browserOpen','inspectorOpen'])if(typeof saved[key]==='boolean')editorWorkspace[key]=saved[key];
    for(const [key,min,max] of [['browserWidth',180,360],['inspectorWidth',280,500]])if(Number.isFinite(saved[key]))editorWorkspace[key]=Math.max(min,Math.min(max,saved[key]));
  }
} catch { /* Browser storage is optional; editing still works. */ }
function saveWorkspaceLayout() {
  const {browserOpen,inspectorOpen,browserWidth,inspectorWidth}=editorWorkspace;
  try {localStorage.setItem('atlas.editor.workspace.v1',JSON.stringify({browserOpen,inspectorOpen,browserWidth,inspectorWidth}));} catch { /* Keep the current in-memory layout. */ }
}
function desktopEditorActive() {
  return EDITOR_DEV_MODE && debugOverlayEnabled && Boolean(level) && state.screen === "scene";
}
function editorPreviewRenderer() {
  const renderer=voxelRenderer.getSettings().renderer;
  return window.AtlasGraphicsModes.isThree(renderer) && level?.id!=='LVL-0001' ? 'illustrated' : renderer;
}
function editorEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function editorSceneItems(source = level) {
  const items = [{ kind: "player", id: "player", name: mainCharacterId(source), type: "Playable character" }];
  for (const rune of source.runes || []) {
    const challenge = npcChallengeForRune(rune,source);
    if (challenge) items.push({ kind: "npc", id: rune.id, name: npcDisplayName(challenge, npcCharacterForChallenge(challenge)), type: `NPC challenge · ${rune.name || rune.id}` });
    else items.push({ kind: "challenge", id: rune.id, name: rune.name || rune.id, type: "Challenge" });
  }
  for (const object of source.interactiveObjects || []) if(!(source.runes || []).some(rune=>rune.objectId===object.id)) items.push({ kind: "object", id: object.id, name: object.label || object.id, type: "Interaction geometry" });
  for (const [kind, collection] of [["animal", source.ambientAnimals], ["flyby", source.ambientFlybys], ["effect", source.sceneEffects]]) {
    for (const item of collection || []) items.push({kind, id:item.id, name:item.label || item.id, type:kind === "effect" ? "Procedural effect" : kind});
  }
  const settings = window.AtlasCinematicSettings.normalize(worldResolver.levelSettings(source.id).cinematicLighting);
  for (const [system, def] of Object.entries(window.AtlasCinematicSettings.systems)) {
    if (def.type) for (const item of settings[system].items) items.push({kind:"cinematic", id:item.id, system, name:item.name || item.id, type:def.label});
  }
  return items;
}
function selectWorkspaceItem(kind, id, system) {
  // Changing the inspected entity cancels only the uncommitted polygon preview.
  // Committed geometry is already owned by the existing draft handlers.
  walkPathEditor.effectPolygonDraft = null;
  if(editorWorkspace.selection.kind==='flyby' && editorWorkspace.selection.id!==id)ambientFlybyRuntime.stopPreview();
  if(editorWorkspace.selection.kind!==kind || editorWorkspace.selection.id!==id) { walkPathEditor.pathMode=false;walkPathEditor.effectGeometryMode=false; }
  editorWorkspace.selection = { kind, id, system };
  editorWorkspace.addOpen = false;
  if (!editorWorkspace.focus) editorWorkspace.inspectorOpen = true;
  if (kind === "effect") {
    walkPathEditor.selectedEffectId = id;
    walkPathEditor.editorMode = "graphics";
    sceneEffectRuntime.setVisibility(walkPathEditor.effectVisibility, id);
  } else if (kind === "animal" || kind === "flyby") {
    walkPathEditor.selectedObjectType = kind;
    walkPathEditor.selectedObjectId = id;
    walkPathEditor.editorMode = kind === "animal" ? "characters" : "graphics";
  } else if (kind === "npc" || kind === "challenge") {
    walkPathEditor.selectedChallengeId = id;
    walkPathEditor.editorMode = "challenges";
  } else if (kind === "object") {
    walkPathEditor.currentObject = level.interactiveObjects.find(item => item.id === id);
  } else if (kind === "cinematic") cinematicEditor.select(system, id);
  render();
}
function workspaceItemSelected(item) {
  const selected=editorWorkspace.selection;
  if(item.kind===selected.kind && item.id===selected.id)return item.kind!=='cinematic' || item.system===selected.system;
  if(['challenge','npc'].includes(item.kind)) {
    if(['challenge','npc'].includes(selected.kind))return item.id===selected.id;
    if(selected.kind==='object')return runeById(item.id)?.objectId===selected.id;
  }
  return false;
}
function renderWorkspaceBrowser() {
  const search = editorWorkspace.search.toLowerCase();
  return `<header><strong>Scene</strong><button data-workspace-action="browser" title="Collapse scene browser" aria-label="Collapse scene browser">‹</button></header>
    <nav>${[["level","Level settings"],["environment","Environment"],["shared","Shared Settings"],["audio","Audio"]].map(([kind,name]) => `<button data-workspace-kind="${kind}" data-workspace-id="${kind}">${name}</button>`).join('')}</nav>
    <label class="editorSearchLabel">Find objects <kbd>Ctrl K</kbd><input type="search" data-editor-search placeholder="Name, type or ID" value="${editorEscape(editorWorkspace.search)}"></label>
    <div class="editorSceneList">${editorSceneItems().map(item => `<button data-workspace-kind="${item.kind}" data-workspace-id="${editorEscape(item.id)}" data-workspace-system="${item.system || ''}" ${item.kind==='challenge' ? `data-select-challenge="${editorEscape(item.id)}" class="${isRuneActive(runeById(item.id))?'':'editorChallengeInactive'}"` : item.kind==='effect' ? `data-select-effect="${editorEscape(item.id)}"` : ['animal','flyby'].includes(item.kind) ? `data-select-ambient-type="${item.kind}" data-select-ambient-id="${editorEscape(item.id)}"` : ''} data-search-text="${editorEscape(`${item.name} ${item.id} ${item.type}`.toLowerCase())}" ${`${item.name} ${item.id} ${item.type}`.toLowerCase().includes(search) ? '' : 'hidden'} aria-pressed="${workspaceItemSelected(item)}"><strong>${editorEscape(item.name)}</strong><small>${editorEscape(item.type)} · ${editorEscape(item.id)}</small></button>`).join('')}</div>`;
}
function renderWorkspaceInspector() {
  const {kind, id, system} = editorWorkspace.selection;
  const item = editorSceneItems().find(item => item.kind === kind && item.id === id && (kind!=='cinematic' || item.system===system)) || (kind==='challenge' ? {name:runeById(id)?.name,type:'Challenge'} : kind==='object' ? {name:level.interactiveObjects.find(item=>item.id===id)?.label || id,type:'Interaction geometry'} : null);
  let content = "";
  if (kind === "player") content = renderLevelTuningControls(level.id, {scope:"characters"});
  if (kind === "level") content = renderLevelTuningControls(level.id);
  if (kind === "shared") {
    const profile=editorWorkspace.sharedProfile || mainCharacterId(null,level.id);
    content=`<p>Selecting a profile does not change the level’s playable character.</p><label class="editorCompactField">Character profile<select data-shared-profile>${Object.entries(window.AtlasPlayableCharacters.characters).map(([id,name])=>`<option value="${id}" ${id===profile?'selected':''}>${name}</option>`).join('')}</select></label>${renderLocomotionControls(level.id,profile,true)}`;
  }
  if (kind === "audio") content = `<p>Audio includes shared and level-specific values. Apply writes the shared audio file.</p>${renderAudioEditorControls()}`;
  if (kind === "npc") content = `<button data-workspace-kind="challenge" data-workspace-id="${editorEscape(id)}">Linked challenge</button>${renderNpcCharacterEditorControls()}`;
  if (kind === "challenge") content = `<button data-workspace-kind="object" data-workspace-id="${editorEscape(runeById(id)?.objectId)}">Edit interaction geometry</button>${npcChallengeForRune(runeById(id)) ? `<button data-workspace-kind="npc" data-workspace-id="${editorEscape(id)}">NPC appearance</button>` : ''}${renderChallengeEditorControls()}`;
  if (kind === "animal" || kind === "flyby") content = renderAmbientEditorControls({animals:kind === "animal",flybys:kind === "flyby"});
  if (kind === "effect") {
    const inactive = editorPreviewRenderer() === "cinematic" && window.AtlasCinematicSettings.replacedPresets.has(selectedSceneEffect()?.presetId);
    content = `${inactive ? '<p class="editorAvailability">Authored but inactive in Cinematic. Saved settings remain editable. <button data-renderer-choice="illustrated">Preview Illustrated</button></p>' : ''}${renderSceneEffectsEditorControls()}`;
  }
  if (kind === "environment") content = cinematicEditor.renderEnvironment();
  if (kind === "cinematic") content = `${!window.AtlasCinematicSettings.systems[system].type ? '<button data-workspace-kind="environment" data-workspace-id="environment">← Environment</button>' : ''}${cinematicEditor.render({system})}`;
  if(kind === "emissive") content = `<button data-workspace-kind="environment" data-workspace-id="environment">← Environment</button>${renderEmissiveGlowControls(level.id)}`;
  if (kind === "object") {
    const object = level.interactiveObjects.find(item => item.id === id);
    const linkedRune=(level.runes || []).find(rune=>rune.objectId===id);
    if (object) content = `${linkedRune ? `<button data-workspace-kind="challenge" data-workspace-id="${editorEscape(linkedRune.id)}">Challenge settings</button>` : ""}<p>Drag the center or radius handle in the canvas. Coordinates are authored world pixels.</p>${['x','y','radius'].map(key => `<label class="editorField">${key}<input type="number" data-workspace-object-field="${key}" value="${key === 'radius' ? object.radius : object.center[key]}"></label>`).join('')}`;
  }
  return `<header><div><strong>${editorEscape(item?.name || ({level:'Level settings',environment:'Environment',shared:'Shared Settings',audio:'Audio'})[kind] || id)}</strong><small>${kind==='shared'?'All levels and worlds':`${editorEscape(item?.type || (kind==='audio'?'Mixed scope':'This level'))} · ${editorEscape(level.id)}`}</small></div><button data-workspace-action="inspector" aria-label="Collapse inspector" title="Collapse inspector">›</button></header>${content || '<p>This item is no longer available. Select another item in Scene.</p>'}`;
}
function editorPendingScopes() {
  const payload=persistedLevelEditorPayload(),current=worldResolver.getConfig(),saved=worldEditor.persistedConfig;
  const changed=key=>[...new Set([...Object.keys(current[key]||{}),...Object.keys(saved[key]||{})])].filter(id=>!editorValuesEqual(current[key]?.[id],saved[key]?.[id]));
  const scopes=[],sections=Object.keys(payload).filter(key=>key!=='audioConfig');
  if(sections.length)scopes.push('Level content ('+level.id+'): '+sections.join(', '));
  for(const [key,label] of [['levels','Level settings'],['worlds','World settings'],['characterLocomotion','Shared character profiles']]){const ids=changed(key);if(ids.length)scopes.push(label+': '+ids.join(', '));}
  if(payload.audioConfig)scopes.push('Audio: shared file (shared volumes and level-keyed settings)');
  return scopes;
}
function renderEditorWorkspace() {
  if (!desktopEditorActive()) return "";
  if (editorWorkspace.levelId !== level.id) {
    editorWorkspace.levelId = level.id;
    editorWorkspace.selection = {kind:"level",id:"level"};
    editorWorkspace.camera = null;
    editorWorkspace.playtest=false;editorWorkspace.addOpen=false;editorWorkspace.changesOpen=false;
    editorWorkspace.placement = null;
  }
  const w = editorWorkspace, geometry = walkPathEditor.pathMode || walkPathEditor.effectGeometryMode;
  const panelsHidden = w.focus || w.playtest || geometry;
  const disabled = !walkPathEditor.apiAvailable || walkPathEditor.busy ? 'disabled' : '';
  return `<section class="atlasEditorWorkspace" data-editor-workspace data-editor-placement="${Boolean(w.placement)}" data-focus="${w.focus}" style="--browser-width:${w.browserWidth}px;--inspector-width:${w.inspectorWidth}px">
    <div class="editorCanvasToolbar" role="toolbar" aria-label="Canvas editing controls">
      <select data-workspace-level aria-label="Level" title="Select level">${levelCatalog.map(entry=>`<option value="${editorEscape(entry.id)}" ${entry.id===level.id?'selected':''}>${editorEscape(entry.title || entry.id)}</option>`).join('')}</select>
      <button data-workspace-action="browser" aria-pressed="${w.browserOpen && !panelsHidden}" title="Scene browser · Ctrl+K">☷ Scene</button>
      <button data-workspace-action="add" aria-expanded="${w.addOpen}">＋ Add</button>
      <button data-workspace-action="fit" ${geometry ? 'hidden' : ''} ${window.AtlasGraphicsModes.isThree(editorPreviewRenderer()) ? 'disabled' : ''} title="Frame the full level">Fit level</button>
      <button data-workspace-action="zoom-out" ${geometry ? 'hidden' : ''} ${window.AtlasGraphicsModes.isThree(editorPreviewRenderer()) ? 'disabled' : ''} title="Zoom out">−</button><button data-workspace-action="zoom-in" ${geometry ? 'hidden' : ''} ${window.AtlasGraphicsModes.isThree(editorPreviewRenderer()) ? 'disabled' : ''} title="Zoom in">＋</button>
      <button data-workspace-action="inspector" aria-pressed="${w.inspectorOpen && !panelsHidden}">Inspector</button>
      <button class="editorFocusToggle" data-workspace-action="focus" aria-pressed="${w.focus}" title="${w.focus ? 'Restore previous panel arrangement' : 'Hide panels; keep selection and canvas tools'} · Ctrl+Shift+F"><span aria-hidden="true">${w.focus ? '▣' : '⛶'}</span> ${w.focus ? 'Exit Focus' : 'Focus Mode'}</button>
      <button data-workspace-action="playtest" aria-pressed="${w.playtest}">${w.playtest ? 'Return to editing' : 'Playtest'}</button>
      <button data-graphics-action="toggle" title="Renderer and preview preferences">Preview: ${editorEscape(voxelRenderer.getSettings().renderer)}</button>
      <button data-workspace-action="tools" aria-expanded="${w.toolsOpen}" title="Assets, diagnostics and menu">Tools</button>
      <button data-workspace-action="changes" data-editor-draft-status>Changes: ${editorSaveStatus()}</button>
      <button data-debug-action="apply-walkpath" ${disabled}>Apply</button>
    </div>
    <aside class="editorSceneBrowser" data-editor-browser ${!w.browserOpen || panelsHidden ? 'hidden' : ''}>${renderWorkspaceBrowser()}<div class="editorPanelResize" data-editor-resize="browser" role="separator" aria-label="Resize scene browser" tabindex="0"></div></aside>
    <aside class="walkPathEditorPanel editorInspector" data-developer-tools data-current-editor-mode="${walkPathEditor.editorMode}" data-editor-view="${editorEscape(`${level.id}:${w.selection.kind}:${w.selection.id}${w.selection.system ? ":"+w.selection.system : ""}`)}" ${!w.inspectorOpen || panelsHidden ? 'hidden' : ''}>${renderWorkspaceInspector()}<div class="editorPanelResize" data-editor-resize="inspector" role="separator" aria-label="Resize inspector" tabindex="0"></div><p>${editorEscape(walkPathEditor.message)}</p></aside>
    ${w.addOpen ? renderWorkspaceAdd() : ''}
    ${w.changesOpen ? `<section class="editorChanges" role="status"><strong>Changes: ${editorSaveStatus()}</strong><p>${editorPendingScopes().map(editorEscape).join('<br>') || 'No unapplied authored changes.'}</p>${worldEditor.dirty ? '<p data-editor-world-pending>World configuration pending, including shared staged settings. Not stored in the level draft.</p>' : ''}<p>Level/audio and world configuration are separate writes. Effect-only drafts last while the server runs. Asset uploads write immediately. Preview preferences are stored separately.</p><p>Revert discards all pending current-level, world/character and audio changes, restoring saved files. Previously applied changes, other levels’ drafts, uploaded assets and preview preferences are kept.</p><button data-debug-action="revert-walkpath" ${walkPathEditor.busy ? 'disabled' : ''}>Revert</button><button data-workspace-action="changes">Close</button></section>` : ''}
    ${w.toolsOpen ? `<section class="editorChanges"><strong>Tools</strong><p><button data-debug-action="refresh-assets">Refresh assets</button> <button data-display-toggle="fps">FPS</button> <button data-display-toggle="debug">Debug</button> <button data-action="menu">Back to menu</button></p>${renderAssetWarnings()}<p>${editorEscape(walkPathEditor.assetMessage)}</p><p>Pan: middle-button drag · Scene search: Ctrl+K · Focus Mode: Ctrl+Shift+F. Tab navigates controls.</p><button data-workspace-action="tools">Close</button></section>` : ''}
    ${window.AtlasGraphicsModes.isThree(voxelRenderer.getSettings().renderer) && level.id!=='LVL-0001' ? '<p class="editorContextToolbar">This level uses Illustrated fallback. Authored settings remain available.</p>' : ''}
    ${w.placement ? '<div class="editorContextToolbar">Click the scene to place the effect · Escape cancels</div>' : w.focus && !geometry ? `<div class="editorContextToolbar">${editorEscape(editorSceneItems().find(item => item.kind === w.selection.kind && item.id === w.selection.id)?.name || w.selection.id)}${w.selection.kind === 'effect' ? '<button data-debug-action="edit-effect-geometry">Edit geometry</button>' : ''}${w.selection.kind === 'flyby' ? `<button data-debug-action="edit-flight-path" data-flyby-id="${editorEscape(w.selection.id)}">Edit flight path</button>` : ''}</div>` : ''}
  </section>`;
}

function layoutEditorWorkspace() {
  layoutEditorSurfaces();
  if(document.querySelector('[data-add-results]') && !document.querySelector('[data-add-family], [data-add-empty]'))updateWorkspaceAdd();
  const stage = document.querySelector('[data-world-stage]');
  if (!desktopEditorActive() || !stage || editorWorkspace.playtest || window.AtlasGraphicsModes.isThree(editorPreviewRenderer())) return;
  const w = editorWorkspace, hidden = w.focus || walkPathEditor.pathMode || walkPathEditor.effectGeometryMode;
  const left = !hidden && w.browserOpen ? w.browserWidth : 0;
  const right = !hidden && w.inspectorOpen ? w.inspectorWidth : 0;
  const width = Math.max(200, innerWidth - left - right), height = innerHeight - 54;
  if (!w.camera) w.camera = { center:level.world.width/2, scale:Math.min(width/level.world.width,height/level.world.height), y:0 };
  Object.assign(stage.style, {left:`${left}px`,right:'auto',width:`${width}px`,height:`${w.camera.scale*level.world.height}px`,top:`${54+(height-w.camera.scale*level.world.height)/2+w.camera.y}px`,bottom:'auto'});
  stage.dataset.editorViewport='true';
  stage.style.setProperty('--editor-actor-scale',String(w.camera.scale*level.world.height/innerHeight));
  state.viewportWorldWidth = width / w.camera.scale;
  state.worldScale = level.world.width / state.viewportWorldWidth;
  state.cameraX = w.camera.center - state.viewportWorldWidth/2;
}
function refreshEditorWorkspace() {
  const current = document.querySelector('[data-editor-workspace]');
  if (!current) { render(); return; }
  const saved = captureEditorUiState();
  const template = document.createElement('template');
  template.innerHTML = renderEditorWorkspace();
  patchEditorDom(current,template.content.firstElementChild);
  layoutEditorWorkspace();
  updateWorldDom();
  cinematicEditor.updateGuides();
  ambientFlybyRuntime.refreshPreviews();
  restoreEditorUiState(saved);
}
function workspaceAction(action) {
  const w = editorWorkspace;
  const leaveGeometry = ['search','browser','inspector','add'].includes(action) && (walkPathEditor.pathMode || walkPathEditor.effectGeometryMode);
  if(leaveGeometry) {walkPathEditor.pathMode=false;walkPathEditor.effectGeometryMode=false;walkPathEditor.effectPolygonDraft=null;}
  if (action === 'focus') {w.focus = !w.focus;w.addOpen=false;w.changesOpen=false;w.toolsOpen=false;}
  if (action === 'browser') { if(w.focus) {w.focus=false;w.browserOpen=true;} else w.browserOpen=!w.browserOpen; }
  if (action === 'inspector') { if(w.focus) {w.focus=false;w.inspectorOpen=true;} else w.inspectorOpen=!w.inspectorOpen; }
  if (action === 'search') { w.focus=false;w.browserOpen=true;walkPathEditor.effectPolygonDraft=null;walkPathEditor.pathMode=false;walkPathEditor.effectGeometryMode=false; }
  const popupAction=['add','changes','tools'].includes(action), closeGraphics=popupAction && graphicsSettingsOpen;
  if(popupAction) {
    const key=action+'Open',open=!w[key];
    w.addOpen=w.changesOpen=w.toolsOpen=false;w[key]=open;
    graphicsSettingsOpen=false;
  }
  saveWorkspaceLayout();
  if (action === 'fit') w.camera=null;
  if (action === 'zoom-in' || action === 'zoom-out') { if(w.camera)w.camera.scale=clamp(w.camera.scale*(action==='zoom-in'?1.2:1/1.2),0.1,4); }
  if (action === 'playtest') {
    w.playtest=!w.playtest;
    if(w.playtest) { walkPathEditor.effectPolygonDraft=null;walkPathEditor.effectGeometryMode=false;walkPathEditor.pathMode=false; }
    render();return;
  }
  if(leaveGeometry || closeGraphics)render();else refreshEditorWorkspace();
  if(action==='search') { const input=document.querySelector('[data-editor-search]');input?.focus();input?.select(); }
}

// Reconcile only an already-open editor scene. Runtime screen transitions keep
// their existing renderer lifecycle. Stable canvas/actor mounts never detach for
// an inspector refresh or drag; there is no shadow copy of authored state.
function patchEditorDom(current, next) {
  const key = node => {
    if (node.nodeType !== 1) return `#${node.nodeType}`;
    const identity = ['id','data-world-stage','data-editor-workspace','data-actor-mount','data-actor-shell','data-ambient-flyby','data-rune','data-hotspot','data-scene-effects-canvas','data-debug-object','data-effect-guide','data-workspace-id','data-editor-panel-key','data-level-setting','data-locomotion-setting','data-effect-override','data-cinematic-setting'].find(name=>node.hasAttribute(name));
    return `${node.tagName}:${identity ? `${identity}:${node.getAttribute(identity)}` : node.getAttribute('class') || ''}`;
  };
  if (current.nodeType !== next.nodeType || current.nodeName !== next.nodeName) { current.replaceWith(next); return; }
  if (current.nodeType !== 1) { if(current.nodeValue!==next.nodeValue)current.nodeValue=next.nodeValue;return; }
  // Canvas backing dimensions and presentation styles belong to the renderer.
  // Removing width/height would clear a retained canvas even without detaching it.
  if(current.matches('[data-add-results]') && current.childNodes.length && !next.childNodes.length)return;
  if(current.matches('canvas')) {
    for(const attr of next.attributes)if(!['width','height','style'].includes(attr.name) && current.getAttribute(attr.name)!==attr.value)current.setAttribute(attr.name,attr.value);
    if(!next.hasAttribute('hidden'))current.removeAttribute('hidden');
    return;
  }
  for (const attr of [...current.attributes]) if (!next.hasAttribute(attr.name)) current.removeAttribute(attr.name);
  for (const attr of next.attributes) if(current.getAttribute(attr.name)!==attr.value)current.setAttribute(attr.name,attr.value);
  if(current.matches('canvas,[data-actor-mount]'))return;
  if(current instanceof HTMLInputElement && current!==document.activeElement) {current.value=next.value;current.checked=next.checked;}
  let cursor=current.firstChild;
  for(const desired of [...next.childNodes]) {
    let match=cursor;
    if(!match || key(match)!==key(desired)) match=[...current.childNodes].slice(cursor?[...current.childNodes].indexOf(cursor):current.childNodes.length).find(node=>key(node)===key(desired));
    if(!match) {current.insertBefore(desired,cursor);continue;}
    if(match!==cursor)current.insertBefore(match,cursor);
    patchEditorDom(match,desired);cursor=match.nextSibling;
  }
  while(cursor) {const remove=cursor;cursor=cursor.nextSibling;remove.remove();}
}


function renderEditorInfo(title, body) {
  return `<button type="button" class="editorInfoButton" data-editor-info="${editorEscape(body)}" data-info-title="${editorEscape(title)}" aria-label="Information: ${editorEscape(title)}" title="About ${editorEscape(title)}">i</button>`;
}
function closeEditorInfo(returnFocus=false) {
  const popup=document.querySelector('[data-editor-info-popup]');
  if(!popup)return;
  const trigger=popup.infoTrigger;popup.remove();
  trigger?.setAttribute('aria-expanded','false');
  if(returnFocus && trigger?.isConnected)trigger.focus({preventScroll:true});
}
function openEditorInfo(trigger, title, body) {
  closeEditorInfo();
  const popup=document.createElement('section');
  popup.className='editorInfoPopup';popup.dataset.editorInfoPopup='';
  popup.setAttribute('role','dialog');popup.setAttribute('aria-label',title);
  popup.innerHTML=`<header><strong>${editorEscape(title)}</strong><button type="button" data-close-editor-info aria-label="Close information">×</button></header><p>${editorEscape(body)}</p>`;
  popup.infoTrigger=trigger;document.body.append(popup);trigger.setAttribute('aria-expanded','true');
  const rect=trigger.getBoundingClientRect();
  popup.style.left=`${Math.max(12,Math.min(innerWidth-popup.offsetWidth-12,rect.right-popup.offsetWidth))}px`;
  popup.style.top=`${Math.max(12,Math.min(innerHeight-popup.offsetHeight-12,rect.bottom+8))}px`;
  popup.querySelector('button').focus({preventScroll:true});
}
document.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-editor-info]');
  if(trigger){event.preventDefault();event.stopImmediatePropagation();openEditorInfo(trigger,trigger.dataset.infoTitle,trigger.dataset.editorInfo);return;}
  if(event.target.closest('[data-close-editor-info]')) {event.preventDefault();closeEditorInfo(true);return;}
  if(!event.target.closest('[data-editor-info-popup], [data-cinematic-help]'))closeEditorInfo();
},true);
document.addEventListener('keydown',event=>{if(event.key==='Escape' && document.querySelector('[data-editor-info-popup]')){event.preventDefault();event.stopImmediatePropagation();closeEditorInfo(true);}},true);

// This catalog is a view over existing definitions, never persisted scene data.
const workspaceAdd = { category:'All', query:'', family:'', variant:'' };
function workspaceCreationCatalog() {
  const effects=Object.values(window.AtlasSceneEffects.PRESETS).filter(p=>!p.hiddenFromLibrary).map(p=>({
    key:'effect:'+p.id,kind:'effect',id:p.id,name:p.name,
    category:({'Light and fire':'Lighting','Atmosphere':'Weather & atmosphere','Water':'Water','Nature':'Nature'})[p.category] || p.category,
    description:p.description,help:[p.description,'Best for: '+p.bestFor,'Avoid for: '+p.avoidFor,'Looks like: '+p.visualSignature,'Placement: '+p.geometryTypes.join(' / ')].join(' '),
    applicability:editorPreviewRenderer()==='cinematic' && window.AtlasCinematicSettings.replacedPresets.has(p.id)?'Preview in Illustrated; inactive in Cinematic':'Illustrated + Cinematic',
    variants:p.variants.filter(v=>!v.hiddenFromLibrary).map(v=>({id:v.id,name:v.name}))
  }));
  const ambient=['animal','flyby'].flatMap(kind=>[...discoveredAssetSets(kind).map(set=>({key:kind+':'+set.key,kind,id:set.key,name:set.label || set.key,category:kind==='animal'?'Animals':'Flybys',description:kind==='animal'?'Ambient animal with paired frames and optional sound.':'Animated or static flyby with an editable flight path.',applicability:'Shared scene instance',variants:[]})),{key:kind+':manual',kind,id:'',name:'Custom frames',category:kind==='animal'?'Animals':'Flybys',description:'Choose individual frames and optional sound.',applicability:'Shared scene instance',variants:[]}]);
  return [...effects,...cinematicEditor.creationFamilies(),...ambient];
}
function renderWorkspaceAdd() {
  const categories=[...new Set(workspaceCreationCatalog().map(f=>f.category))];
  return '<section class="editorAddPicker" data-editor-add><header><strong>Add to scene</strong><button data-workspace-action="add" aria-label="Close Add">×</button></header><label class="editorCompactField">Category<select data-add-category>'+['All',...categories].map(c=>'<option '+(c===workspaceAdd.category?'selected':'')+'>'+editorEscape(c)+'</option>').join('')+'</select></label><label class="editorSearchLabel">Find an asset or effect<input type="search" data-editor-add-search value="'+editorEscape(workspaceAdd.query)+'" placeholder="Search names, variants or descriptions"></label><div data-add-results></div></section>';
}
function updateWorkspaceAdd() {
  const root=document.querySelector('[data-add-results]');if(!root)return;
  const terms=workspaceAdd.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const families=workspaceCreationCatalog().filter(f=>(workspaceAdd.category==='All'||f.category===workspaceAdd.category)&&terms.every(t=>[f.name,f.category,f.description,f.id,...f.variants.map(v=>v.name)].join(' ').toLowerCase().includes(t)));
  if(!families.some(f=>f.key===workspaceAdd.family)){workspaceAdd.family=families[0]?.key || '';workspaceAdd.variant='';}
  const family=families.find(f=>f.key===workspaceAdd.family);
  if(!family){root.innerHTML='<p data-add-empty role="status">No creation options match this search.</p>';return;}
  if(!family.variants.some(v=>v.id===workspaceAdd.variant))workspaceAdd.variant=family.variants[0]?.id || '';
  const matchingVariant=family.variants.find(v=>terms.length && terms.every(t=>v.name.toLowerCase().includes(t)));
  if(matchingVariant)workspaceAdd.variant=matchingVariant.id;
  root.innerHTML='<label class="editorCompactField">Asset or effect<select size="'+Math.min(5,Math.max(2,families.length))+'" data-add-family aria-label="Asset or effect">'+families.map(f=>'<option value="'+editorEscape(f.key)+'" '+(f.key===family.key?'selected':'')+'>'+editorEscape(f.name)+' · '+editorEscape(f.category)+'</option>').join('')+'</select></label><div class="editorCreationDetail"><strong>'+editorEscape(family.name)+'</strong> '+renderEditorInfo(family.name,(family.help || family.description)+' '+family.applicability)+'<p>'+editorEscape(family.description)+'</p><small>'+editorEscape(family.applicability)+'</small>'+(family.variants.length?'<label class="editorCompactField">Variant<select data-add-variant '+(family.kind==='effect'?'data-effect-library-variant="'+family.id+'"':'')+'>'+family.variants.map(v=>'<option value="'+editorEscape(v.id)+'" '+(v.id===workspaceAdd.variant?'selected':'')+'>'+editorEscape(v.name)+'</option>').join('')+'</select></label>':'')+(family.kind==='effect'?'<button data-add-effect="'+family.id+'">Place in scene</button>':family.kind==='cinematic'?'<button data-cinematic-action="add" data-section="'+family.id+'" data-add-cinematic-preset="'+editorEscape(workspaceAdd.variant)+'">Add to scene</button>':renderAmbientAddForm(family.kind))+'</div>';
  if(['animal','flyby'].includes(family.kind)) {
    const form=root.querySelector('form'),set=discoveredAssetSetByKey(family.kind,family.id);
    form.elements.assetSet.value=family.id;form.elements.assetSet.closest('label').hidden=true;
    if(set) {
      for(const key of ['openFrame','closedFrame','frameA','frameB','sound'])if(form.elements[key])form.elements[key].value=set[key] || '';
      const used=new Set([...(level.ambientAnimals || []),...(level.ambientFlybys || [])].map(i=>i.id));
      const base=(family.id.split('/').pop() || family.kind).replace(/[^A-Za-z0-9_-]/g,'-');let n=1;while(used.has(base+'-'+n))n++;
      form.elements.id.value=base+'-'+n;form.elements.label.value=family.name;
      if(family.kind==='flyby')form.elements.assetSet.dispatchEvent(new Event('change',{bubbles:true}));
      // Frame overrides remain available on demand; the existing form owns all values.
      const details=document.createElement('details');details.innerHTML='<summary>Frames and sound</summary>';
      for(const key of ['openFrame','closedFrame','frameA','frameB','sound'])if(form.elements[key])details.append(form.elements[key].closest('label'));
      form.insertBefore(details,form.querySelector('button'));
    }
    form.querySelector('button').textContent='Add to scene';
  }
}
function filterWorkspaceAdd(query) {workspaceAdd.query=query;workspaceAdd.family='';workspaceAdd.variant='';updateWorkspaceAdd();}
document.addEventListener('change',event=>{
  if(event.target.matches('[data-add-category]')){workspaceAdd.category=event.target.value;workspaceAdd.family='';updateWorkspaceAdd();}
  if(event.target.matches('[data-add-family]')){workspaceAdd.family=event.target.value;workspaceAdd.variant='';updateWorkspaceAdd();document.querySelector('[data-add-family]')?.focus({preventScroll:true});}
  if(event.target.matches('[data-add-variant]')){workspaceAdd.variant=event.target.value;const button=document.querySelector('[data-add-results] [data-cinematic-action="add"]');if(button)button.dataset.addCinematicPreset=event.target.value;}
});
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-environment-find]');if(!button)return;
  editorWorkspace.search=button.dataset.environmentFind;workspaceAction('search');
});
function layoutEditorSurfaces() {
  if(!desktopEditorActive())return;
  const w=editorWorkspace,hidden=w.focus||w.playtest||walkPathEditor.pathMode||walkPathEditor.effectGeometryMode;
  const left=!hidden&&w.browserOpen?w.browserWidth:0,right=!hidden&&w.inspectorOpen?w.inspectorWidth:0;
  for(const surface of document.querySelectorAll('[data-graphics-settings], [data-editor-add], .editorChanges')) {
    const width=Math.min(surface.matches('[data-editor-add]')?420:372,innerWidth-left-right-24);
    Object.assign(surface.style,{left:`${left+12}px`,right:'auto',width:`${Math.max(180,width)}px`});
  }
}

document.addEventListener('click',event=>{if(event.target.closest('[data-environment-participation]')){event.preventDefault();event.stopImmediatePropagation();graphicsSettingsOpen=false;selectWorkspaceItem('environment','environment');const panel=document.querySelector('[data-environment-participation-panel]');if(panel){panel.open=true;panel.scrollIntoView({block:'nearest'});}}},true);

document.addEventListener('click',event=>{if(event.target.closest('[data-environment-other]')){editorWorkspace.environmentAll=!editorWorkspace.environmentAll;refreshEditorWorkspace();}});

document.addEventListener('change',event=>{if(event.target.matches('[data-shared-profile]')){editorWorkspace.sharedProfile=event.target.value;refreshEditorWorkspace();}});
