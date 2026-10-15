(function (global) {
  "use strict";
  const api = global.AtlasCinematicSettings;
  const label = key => key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());
  const presetHelp = {
    Steady:"Constant light for lanterns and quiet sources.", Fire:"Warm, irregular brightness for fire and braziers.", Arcane:"Colored surges for magical runes.", Beacon:"Slow broad pulses for beacons and signals.",
    Sunlight:"Broad warm illumination for outdoor compositions.", Moonlight:"Broad cool illumination; pair with warm local sources for night scenes.",
    Sand:"Fine Canvas 2D sand in a shallow ribbon. Uses the shared field controls; Count is capped at 480 grains before quality scaling.",
    Pollen:"Large soft motes drift slowly with light wind and almost no gravity.", Dust:"Fine, faint particles move slowly through a volume with little emission.",
    Embers:"Warm emissive particles rise from a small source, curl and fade quickly.", Snow:"Varied flakes fall slowly, with sideways wind and wandering motion.",
    "Light Snow":"Small, sparse flakes with a gentle breeze; keeps the artwork prominent.",
    "Fluffy Snow":"Larger soft flakes drift slowly with broad wandering motion.",
    "Windblown Snow":"Fine flakes sweep through coherent curved gusts and gentle local eddies. No trails or glow.",
    "Snow Squall":"Wind-carried snow curls into rolling plumes instead of falling. Gust Strength controls curl size; Turbulence spreads the streams. No fog or extra layers.",
    Blizzard:"A forceful storm with sweeping gusts, larger flakes and stronger eddies. One bounded field; no fog or glow.",
    Drizzle:"Fine, short downward streaks with moderate wind and density.", "Heavy Rain":"Dense, fast, long downward streaks with stronger sideways wind.",
    "Magic Motes":"Colored emissive motes wander and pulse smoothly."
  };
  const helpText = {
    grading: "Adjust overall color and brightness without blurring the illustration. Keep saturation near one to preserve painted color.",
    localLights: "Place a torch, lantern or rune spill. Radius sets its reach; intensity and falloff control how quickly light fades away.",
    areaLights: "Broad directional illumination for sun, moon or room bounce. Rotate the region to shape the light across the scene.",
    shafts: "A single local shaft for a window or opening. For a family of sun rays use the God Rays system.",
    godRays:"One light origin emits a structured fan of rays. Spread opens the fan; ray count and width shape its rhythm. Depth places rays behind nearer artwork.",
    gameplayCues:"Uses existing challenge and exit states. Cyan invites interaction, gold marks completion, green marks an open exit, and muted amber marks a locked exit. Does not change progression.",
    spread:"How widely rays fan outward from the source. Higher values cover a broader part of the scene.",
    rayCount:"Number of distinct rays in the fan. More rays create a finer rhythm; fewer create bold individual shafts.",
    rayWidth:"Width of each ray relative to the space between rays. Lower values leave larger dark gaps.",
    widthVariation:"Variation in ray widths. Higher values mix broad and fine rays instead of a uniform pattern.",
    spacingVariation:"Irregular spacing between rays. Higher values break up an evenly spaced fan while retaining one origin.",
    feather:"Soft fade at the far end of the rays. Higher values fade over more of their length.",
    breakup:"Soft interruptions along individual rays. Higher values make the air look more varied and alive.",
    sideLighting:"Strength of the illustrated side facing a light. Higher values separate the lit side from the far side without normal maps.",
    frontAtmosphere:"Amount of authored air in front of characters. Increase to embed them in mist while keeping their silhouettes readable.",
    atmosphere: "A soft volume of colored air. Depth keeps foreground objects clear while distant air accumulates haze. Use warm brown air in firelit interiors.",
    bloom: "A soft glow around the brightest sources. A higher threshold limits glow to brighter pixels; keep intensity controlled to retain painted detail.",
    particles: "One particle field for weather, dust or sparks. Position is its center; Width and Height follow Bounds Rotation. Direction controls particle travel independently. Presets change behavior without changing dimensions.",
    waterSurface: "Accentuates wave and reflection detail already present in the stable painted water with one evolving specular field. Scene depth keeps nearer artwork in front.",
    waterSparkles: "Adds discrete, clustered specular sparkles over authored water. Positions stay locked to world pixels while individual points twinkle; scene depth keeps foreground artwork in front.",
    characters: "Continuously blends scene light, depth tint and atmosphere into Sven, NPCs and animals, on top of their manual appearance.",
    wrap: "A restrained spill of nearby scene color onto sprite edges. Higher radius reaches farther into the silhouette.",
    rim: "A thin edge response facing nearby lights. Keep strength low enough to avoid outlining the entire character.",
    autoExposure: "Slow automatic brightness adjustment. Leave disabled for stable authored exposure; narrow limits prevent large brightness shifts.",
    finishing: "Darken outer corners or adjust final brightness and contrast. Does not blur the artwork.",
    depth: "Optional authored depthmap: black is far, white is near. Disable for A/B. Missing maps use ordinary flat compositing.",
    depthInfluence: "How strongly the depthmap separates this effect from nearer artwork. Zero ignores depth; one fully respects it.",
    depthBias: "Offsets automatic depth placement around the effect anchor. Leave near zero; adjust only when the source sits on a depth edge.",
    depthSoftness: "Feathers the distance comparison. Higher values soften occluder transitions; lower values separate depths more clearly.",
    filterRadius: "Smooths depth edges in source-image pixels. A small radius removes stair steps; large values can soften silhouettes too much.",
    perspective: "Restrained brightness and color separation in distant artwork. Zero preserves the original grade; higher values strengthen distance.",
    nearClear: "Depth at which haze clears away. Lower values clear more foreground and middle-distance objects.",
    farDensity: "Additional haze in distant areas. Higher values enrich the background air without filling the foreground floor.",
    depthCurve: "Controls how gradually haze builds with distance. Higher values concentrate haze farther back.",
    floorBias: "Moves atmosphere toward the floor (positive) or ceiling (negative). Zero leaves its vertical distribution unchanged.",
    atmosphereInfluence: "How much this light illuminates haze, or how much haze covers characters. Higher values make that interaction more visible.",
    colorSpill: "Keeps source color in the light contribution. Low values give neutral brightness; high values give stronger torch or rune color.",
    falloff: "How quickly light fades away from its source. Higher values concentrate it; lower values broaden the spill.",
    softness: "Feathers the outside of the region or beam. Higher values give a wider, softer edge.",
    decay: "Fades beams along their length. Higher values concentrate light near the origin.",
    noiseAmount: "Breaks beams into uneven strands. Zero is smooth; higher values add stronger moving variation.",
    noiseScale: "Size of the animated pattern. Higher values create finer detail; lower values create broad patches.",
    noiseSpeed: "Speed of beam breakup. Zero freezes the pattern; slow values keep broad rays calm.",
    noiseDetail: "Adds smaller details to the haze pattern. Lower values are broad and smooth; higher values are more textured.",
    scale: "Size of haze features. Higher values spread the pattern into larger clouds.",
    motion: "Falling uses the original particle trajectories. Wind Flow carries flakes along curling streams; Gust Strength shapes the curls, Turbulence widens the streams. Gravity and source emission apply only to Falling.",
    gustStrength: "Coherent curved gusts and local eddies. Zero removes the extra curls. Falling motion with zero preserves the original trajectories. Windblown Snow is subtle; Blizzard uses stronger gusts. No trails or additional fields.",
    turbulence: "Irregular drifting motion. Higher values create more wandering or curling movement.",
    streak: "Elongates particles in their travel direction. One makes motes; larger values make rain streaks.",
    wind: "Sideways particle drift. Negative moves left; positive moves right.",
    gravity: "Vertical acceleration. Positive falls downward; negative rises like embers.",
    distribution: "Volume fills the region; source emits from its center; ribbon draws fine blowing sand through Canvas 2D with a 480-grain cap before quality scaling.",
    boundsRotation: "Rotates the ellipse, rectangle or polygon and its editing handles without changing particle travel direction.",
    depthSpread: "Range of particle distances around the field depth. Higher values mix foreground and background particles.",
    pulse: "Smooth particle brightness variation. Zero is steady; higher values give a magical shimmer.",
    grounding: "Gently darkens the lower part of the sprite near contact. Higher values strengthen grounding without drawing a shadow rectangle.",
    groundingShadow: "Draws one grounding shadow for Sven and standard NPCs. Illustrated additionally requires Character Shadows in Preview. Ambient animals are unaffected.",
    shadowShape: "Chooses one Grounding Shadow shape. Silhouette derives a softened cast shape from the current displayed sprite alpha.",
    shadowStrength: "Artistic shadow intensity. One is a clear normal shadow; higher values progressively strengthen the result.",
    shadowOpacity: "Final master visibility from 0 to 100%. This does not change shape, grounding, lighting response or softness.",
    shadowLightSourceX: "World X position of the non-rendered source used only for Grounding Shadow direction.",
    shadowLightSourceY: "World Y position of the non-rendered source used only for Grounding Shadow direction.",
    shadowGroundlineOffset: "Adjusts the detected sole baseline before projection. Zero uses the measured visible shoe contact; positive values lower it and negative values raise it.",
    showShadowContactDebug: "Shows the two detected sole contacts and their shared projection base in blue for Cinematic verification.",
    shadowSoftness: "Diffuses the complete projected alpha. Higher values soften both internal silhouette detail and the outer edge.",
    shadowWidth: "Scales the single shadow across its authored direction.",
    shadowLength: "Scales the single shadow along its authored direction.",
    shadowOffsetX: "Global horizontal positioning offset in pixels relative to the character feet anchor.",
    shadowOffsetY: "Global vertical positioning offset in pixels relative to the character feet anchor.",
    shadowDirection: "Artistic angle correction added to the automatically calculated shadow direction.",
    shadowGlobalLightInfluence: "How strongly broad sun, moon and area lighting steers the automatic shadow direction.",
    shadowLocalLightInfluence: "How strongly nearby torches and local lights gently steer the automatic shadow direction.",
    shadowDirectionSmoothing: "Short stabilization time for nearby-light steering. Source geometry remains attached to the current feet position.",
    shadowDarkBackgroundSuppression: "Matches local shadow contribution to painted receiver darkness. Higher values prevent extra darkening without cutting the silhouette mask.",
    shadowAtmosphereSuppression: "How strongly local mist shortens the projected shadow. One preserves the authored atmosphere response.",
    shadowScale: "Scales the complete alpha-derived projection while preserving its detected sole anchor.",
    rayMotion: "Adds slow per-ray fading, width breathing and tiny movement. Zero keeps every ray completely stable.",
    motionSpeed: "Speed of the optional per-ray motion. Low values keep the fan calm and elegant.",
    fadeVariation: "Amount individual rays fade during Ray Motion. It has no effect when Ray Motion is zero.",
    depthTint: "Blends a little nearby scene color into distant characters. Higher values strengthen their relationship with the background.",
    directionalInfluence: "How much broad sun, moon and area light affects characters. Local light has a separate influence control.",
    intensityResponse: "Overall character response to scene lighting. Higher values make movement through lights more apparent.",
    threshold: "Minimum brightness that begins to bloom. Higher values isolate hot sources; lower values include more of the artwork.",
    softKnee: "Makes bloom begin gradually around its threshold. Higher values soften that transition.",
    layer: "Author this instance as environment, global lighting or a local effect. The layer controls its handles and master toggle.",
    behavior: "Steady is constant; fire varies irregularly; slow pulse breathes; arcane gives smooth magical surges.",
    randomness: "Variation between particles or light fluctuations. Higher values reduce uniform motion and rhythm.",
    flickerAmount: "How much the source varies around its authored brightness. Zero is constant; higher values strengthen the variation.",
    flickerSpeed: "Rate of the source's smooth brightness variation. This never changes the renderer's frame rate."
  };
  Object.assign(helpText, {
    enabled:"Preview this system without deleting its settings. Turning it back on restores the same authored look.",
    x:"Horizontal position in world pixels. Higher values move right; this stays anchored while the camera moves.",
    y:"Vertical position in world pixels. Higher values move down. Place lights over their painted source.",
    color:"Color of this light, haze or particle field. Pick colors that already belong to the illustration.",
    intensity:"Strength of the contribution. Zero removes it; middle values give a clear effect while preserving painted detail.",
    radius:"World-space reach of the light, or screen-space reach of bloom and edge spill. Higher values spread it farther.",
    aspect:"Horizontal stretch of the local light. One is circular; larger values make a wider pool.",
    width:"Horizontal size of a region, or the spread of a beam at its far end. Higher values cover more artwork.",
    height:"Vertical size of the region in world pixels. Higher values cover more of the scene's height.",
    length:"Distance the beam travels in world pixels. Higher values reach farther from its origin.",
    shape:"Ellipse gives a rounded region; rectangle fills a box; polygon follows the points you drag in the scene.",
    direction:"Direction in degrees: zero points right, 90 down, and -90 up. Rotates regions and beams or sets particle travel.",
    density:"Amount of visible air or beam medium. Higher values thicken the effect; depth can keep foreground objects clear.",
    driftSpeed:"How fast haze drifts in world pixels per second. Zero holds its position; higher values move it faster.",
    driftDirection:"Haze travel direction: zero is right, 90 is down and -90 is up.",
    count:"Particle count, or particles per 800 × 400 world-pixel region when Scale Count With Area is on. Limited to 20,000 rendered particles per field.",
    scaleCountWithArea:"Maintain density when resizing: Count × Width × Height / 320,000, capped at 20,000. At the cap, density decreases but the entire region still receives particles.",
    size:"Particle radius in world pixels. Higher values make larger motes or thicker rain streaks.",
    sizeVariation:"Difference in size between particles. Zero is uniform; higher values give a wider range of sizes.",
    speed:"Particle travel speed in world pixels per second. Use slow speeds for dust and high speeds for rain.",
    lifetime:"Seconds before a particle fades and renews. Longer lives travel farther; shorter lives keep emitters compact.",
    opacity:"Master blend strength for this effect.",
    shimmerStrength:"Brightness of the wave-bound specular response. The upper range allows near-white, strongly illustrated highlights.",
    shimmerCoverage:"How broadly the authored water polygon can participate. Low values localize activity; high values add subtle wave shimmer across nearly the full region without changing brightness or detail scale.",
    sparkleSize:"Size of the reflective detail: broad organic regions for Water Surface, or the radius of each discrete Water Sparkle.",
    sparkleStrength:"Brightness of the discrete sparkle layer. This changes intensity without changing how many sparkle positions exist.",
    sparkleDensity:"How many stable candidate points appear inside the water polygon. This changes quantity without enlarging the points.",
    twinkleSpeed:"How quickly individual sparkle points brighten and fade. Their world-space positions remain fixed.",
    twinkleVariation:"Difference in timing and brightness between neighboring sparkle points. Higher values avoid synchronized blinking.",
    clusterScale:"World-space size of broad sparkle groups. Lower values make compact islands; higher values create sweeping reflection fields.",
    clusterAmount:"How strongly sparkles gather into irregular groups. Zero distributes them evenly; one creates distinct busy and calm zones.",
    peakIntensity:"Additional brightness of rare near-white specular flashes, independent of the normal sparkle strength.",
    artworkInfluence:"How strongly painted ridges, troughs and water edges emphasize sparkle brightness. It guides rather than gates the effect.",
    anisotropy:"Horizontal stretch of the specular field. Higher values follow long water ripples; lower values create rounder sparkle regions.",
    shimmerSoftness:"Edge softness where reflective regions emerge and dissolve. Keep this controlled to avoid a foggy overlay.",
    evolutionSpeed:"Rate at which reflective regions merge, intensify, split and fade. The painted water pixels never move.",
    shimmerDirection:"Orientation of the specular flow, independent of the authored water polygon rotation.",
    highlightContrast:"Separation between bright wave peaks and untouched water. Higher values make the response tighter, whiter and punchier.",
    depthOcclusion:"How strongly scene depth protects foreground artwork from the water enhancement.",
    glow:"Particle emissive brightness, independent of size. Higher values suit hot embers or magic without enlarging them.",
    characterInfluence:"How much this local source lights characters. Zero affects the scenery only; higher values strengthen spill on sprites.",
    ambientInfluence:"How much nearby artwork color influences the sprite. Higher values help it inherit the scene palette.",
    localInfluence:"How strongly nearby local sources affect characters or their rim. Higher values strengthen torch and rune response.",
    strength:"Amount of edge spill or exposure adaptation. Start low and increase until the integration is readable without dominating.",
    colorInfluence:"Amount of source color in the glow. Low values are neutral; higher values retain the light's color.",
    colorResponse:"Color retained in sprite rim lighting. Low values are neutral; high values show warm or cool source color.",
    localContribution:"How much local light participates in bloom extraction. Higher values make nearby sources glow more readily.",
    exposure:"Overall brightness in stops. +1 doubles light; -1 halves it. Keep painted highlights readable.",
    contrast:"Separation of light and dark. One preserves contrast; higher values deepen shadows and brighten highlights.",
    saturation:"Color strength. One preserves the painted palette; higher values enrich color, while lower values mute it.",
    warmth:"Warm versus cool scene bias. Positive values favor warm light; negative values favor cool light.",
    tint:"Green versus magenta balance. Use small adjustments to match the scene palette.",
    highlights:"Brightness of lighter artwork. Positive values lift highlights; negative values retain more highlight detail.",
    shadows:"Brightness of darker artwork. Positive values open shadows; negative values deepen them.",
    blackPoint:"Dark-level cutoff. Higher values deepen blacks; use sparingly to avoid losing carved detail.",
    minExposure:"Lowest automatic exposure in stops. Keep it close to zero to avoid large darkening shifts.",
    maxExposure:"Highest automatic exposure in stops. Keep it close to zero to avoid lifting all shadows.",
    adaptationSpeed:"How quickly auto exposure approaches its target. Low values adapt gradually; high values react more quickly.",
    finalExposure:"Final display brightness in stops. Zero leaves it unchanged; positive values brighten the complete composite.",
    finalContrast:"Final display contrast. One leaves it unchanged; higher values strengthen light/dark separation."
  });
  const help = (key, section) => key === "depth" && section !== "depth" ? "Distance of this effect: zero is far, one is near. Nearer artwork softly occludes effects behind it." : helpText[key];
  const explainedFields=new Set(['depthInfluence','depthSoftness','depthBias','perspective','distribution','boundsRotation','scaleCountWithArea','count','groundingShadow','shadowLightSourceX','shadowLightSourceY','shadowGlobalLightInfluence','shadowAtmosphereSuppression','edgeSoftness','rayMotion','enabled']);
  const info = (key, section) => explainedFields.has(key) ? `<button type="button" class="editorInfoButton" data-cinematic-help data-help-section="${section}" data-help-key="${key}" aria-label="Information: ${label(key)}" title="About ${label(key)}">i</button>` : '';

  function createEditor(options) {
    const selection = new Map();
    const views = new Map();
    const view = () => { const id=options.getLevel()?.id; if(!views.has(id)) views.set(id,{layer:"environment",guides:"selected",system:"atmosphere",presets:{}});return views.get(id); };
    const inLayer = (key, item) => item.layer === view().layer;
    const visibleGroup = (key) => api.systems[key].layer === view().layer || api.systems[key].fields.layer?.includes(view().layer);
    let drag = null, suppressReleaseClick = false;
    const controlLabel=(section,key)=>section==="characters"?({groundingShadow:"Enabled",showShadowContactDebug:"Show Shadow Contact Debug",shadowLightSourceX:"Source X",shadowLightSourceY:"Source Y",shadowShape:"Shape",shadowGroundlineOffset:"Groundline / Sole Offset",shadowStrength:"Strength",shadowOpacity:"Opacity (%)",shadowSoftness:"Softness / Blur",shadowWidth:"Width",shadowLength:"Length",shadowScale:"Scale",shadowOffsetX:"Offset X",shadowOffsetY:"Offset Y",shadowDirection:"Direction Bias",shadowGlobalLightInfluence:"Global Light Influence",shadowLocalLightInfluence:"Local Light Influence",shadowDirectionSmoothing:"Direction Smoothing",shadowDarkBackgroundSuppression:"Receiver Darkness Matching",shadowAtmosphereSuppression:"Atmosphere Suppression"}[key]||label(key)):label(key);
    const get = () => api.normalize(options.getSettings());
    const selectionKey = key => `${options.getLevel()?.id}:${key}`;
    function selected(key, settings = get()) {
      const items=settings[key].items.filter(item=>inLayer(key,item));
      return items.find(i => i.id === selection.get(selectionKey(key))) || items[0];
    }
    function control(section, key, def, value) {
      const canvasDepth = section === "particles" && selected(section)?.distribution === "ribbon" && ["depthInfluence", "depthSoftness", "gustStrength", "motion"].includes(key);
      const windFlowInactive = section === "particles" && selected(section)?.motion === "windFlow" && ["gravity", "distribution", "randomness"].includes(key);
      const attrs = `data-cinematic-section="${section}" data-cinematic-setting="${key}" ${canvasDepth ? 'disabled title="Depth masking and gust motion require GPU particles; Sand uses Canvas 2D."' : windFlowInactive ? 'disabled title="Used by Falling motion; Wind Flow follows continuous wind streams."' : ""}`;
      if (typeof def === "boolean") return `<label class="atlasToggleField"><input type="checkbox" ${attrs} ${value ? "checked" : ""}> ${controlLabel(section,key)}</label>`;
      if (Array.isArray(def)) return `<label class="graphicsSelect">${controlLabel(section,key)}<select ${attrs}>${def.map(v => `<option value="${v}" ${value === v ? "selected" : ""}>${label(v)}</option>`).join("")}</select></label>`;
      if (typeof def === "string") return `<label class="graphicsSelect">${label(key)}<input type="color" ${attrs} value="${value}"></label>`;
      const position = ["x", "y", "width", "height", "length", "radius", "count", "shadowLightSourceX", "shadowLightSourceY"].includes(key);
      return `<label class="graphicsRange">${controlLabel(section,key)} <output>${Number(value).toFixed(def.step === 1 ? 0 : 2)}</output><input type="${position ? "number" : "range"}" ${attrs} min="${def.min}" max="${def.max}" step="${def.step}" value="${value}"></label>`;
    }
    const sourceFields = new Set(["shadowLightSourceX","shadowLightSourceY"]);
    const generalShadowFields = new Set(["groundingShadow","showShadowContactDebug","shadowShape"]);
    const groundingShadowFields = new Set(["shadowGroundlineOffset","shadowOffsetX","shadowOffsetY"]);
    const appearanceShadowFields = new Set(["shadowStrength","shadowOpacity","shadowSoftness","shadowLength","shadowWidth","shadowScale","shadowDarkBackgroundSuppression","shadowAtmosphereSuppression"]);
    const lightingShadowFields = new Set(["shadowLightSourceX","shadowLightSourceY","shadowDirection","shadowGlobalLightInfluence","shadowLocalLightInfluence","shadowDirectionSmoothing"]);
    const shadowFields = new Set([...generalShadowFields,...groundingShadowFields,...appearanceShadowFields,...lightingShadowFields]);
    function fields(key, value, include = () => true) { return Object.entries(api.systems[key].fields).filter(([field])=>include(field)).map(([field, def]) => `<div class="cinematicControl">${control(key, field, def, value[field])}${info(field,key)}</div>`).join(""); }
    function characterFields(value, include = () => true) {
      const groups=[['Grounding',new Set([...generalShadowFields,...groundingShadowFields])],['Shadow Light Source / Direction',lightingShadowFields],['Shadow appearance',appearanceShadowFields],['Character relighting',new Set(Object.keys(api.systems.characters.fields).filter(field=>!shadowFields.has(field)))]];
      return groups.map(([name,keys])=>'<fieldset class="cinematicShadowGroup"><legend>'+name+'</legend>'+fields('characters',value,field=>keys.has(field)&&include(field))+'</fieldset>').join('');
    }
    function instances(key, settings) {
      const item = selected(key, settings);
      return `<strong data-cinematic-selected="${item?.id || ''}">${item?.name || 'No instance selected'}</strong><div class="cinematicActions"><button type="button" data-cinematic-action="duplicate" data-section="${key}" ${item && settings[key].items.length < 12 ? '' : 'disabled'}>Duplicate</button><button type="button" data-cinematic-action="remove" data-section="${key}" ${item ? '' : 'disabled'}>Delete</button></div>
        ${item && api.presets[key] ? `<label class="graphicsSelect">Starting preset<select data-cinematic-preset="${key}"><option value="">Custom / choose a starting point</option>${Object.keys(api.presets[key]).map(name=>`<option value="${name}" title="${presetHelp[name]}">${api.presetLabel(name)}</option>`).join("")}</select></label><p class="cinematicHint" data-cinematic-preset-help>${presetHelp[view().presets[item.id]] || "Presets change behavior; placement stays put."} ${item.distribution === "ribbon" ? "Depth masking is GPU-only; the other field controls remain editable." : "All controls remain editable."}</p>` : ""}
        <div data-cinematic-instance="${key}">${item ? fields(key, item) : "<p>No instances. Use Add in the canvas toolbar.</p>"}</div>`;
    }
    function select(key, id) {
      if (!api.systems[key]) return;
      const item = get()[key].items?.find(item => item.id === id);
      view().layer = item?.layer || api.systems[key].layer;
      view().system = key;
      if (id) selection.set(selectionKey(key), id);
    }
    function availability(key) {
      const mode=options.getRenderer(),settings=get();
      if(mode==='cinematic')return 'Cinematic · authored world configuration';
      if(mode!=='illustrated')return 'Inactive in this preview renderer; saved settings remain editable.';
      const projected=api.forIllustrated(settings,options.getIllustratedFeatures?.());
      if(key==='particles')return projected.particles.enabled ? 'Active in Illustrated · Particle Fields, independently of Global Lighting. GPU particles and Canvas Sand use the same authored fields.' : 'Illustrated Particle Fields: inactive. Check Particle Fields in Preview, System enabled, instance Enabled and its layer.';
      if(key==='depth')return projected.depth.enabled ? 'Active in Illustrated: spatial guidance for lighting and/or particle masks. Particle masking can use depth with Global Lighting off; perspective requires Global Lighting and Scene Depth.' : 'Illustrated depth is inactive. Enable Depth and a lighting or depth-masked particle consumer. Flyby depth occlusion uses its own prepared depth map.';
      if(key==='characters')return (projected.characters.groundingShadow ? 'Grounding shadows active in Illustrated.' : 'Illustrated grounding shadows inactive: check Character Shadows in Preview, shadow Enabled and Characters layer.')+' Character relighting, wrap and rim remain Cinematic-only.';
      if(['grading','areaLights'].includes(key))return projected[key].enabled ? 'Active in Illustrated · Global Lighting and its feature gate are enabled.' : 'Inactive in Illustrated. Check Global Lighting, '+(key==='grading'?'Global Grading':'Area Directional Lights')+', system/instance Enabled and the authored layer.';
      return 'Cinematic-only contribution. Authored settings remain editable; switch Preview to see this system.';
    }
    const environmentGroups={particles:'Weather & atmosphere',atmosphere:'Weather & atmosphere',waterSurface:'Water',waterSparkles:'Water',localLights:'Lighting',areaLights:'Lighting',shafts:'Lighting',godRays:'Lighting',grading:'Color & grading',finishing:'Color & grading',characters:'Shadows & depth',depth:'Shadows & depth',bloom:'Lighting',wrap:'Advanced',rim:'Advanced',autoExposure:'Advanced',gameplayCues:'Advanced'};
    function creationFamilies() {
      const families = Object.entries(api.systems).filter(([,def])=>def.type).map(([key,def])=>({key:'cinematic:'+key,kind:'cinematic',id:key,name:({localLights:'Local light',areaLights:'Area / directional light',particles:'Particle field',atmosphere:'Haze volume'})[key] || def.label,category:environmentGroups[key],help:helpText[key],description:({particles:'Weather, dust or sparks in a positioned field.',localLights:'A local source for a torch, lantern or rune.',areaLights:'Broad illumination for sun, moon or room light.',atmosphere:'A positioned region of haze or mist.'})[key] || helpText[key],applicability:['particles','areaLights'].includes(key)?'Illustrated + Cinematic':'Cinematic preview; editable in every mode',variants:api.presets[key]?[{id:'',name:'Default'},...Object.keys(api.presets[key]).filter(name=>key!=='particles'||!api.snowPresets.includes(name)).map(name=>({id:name,name:api.presetLabel(name)}))]:[]}));
      families.find(f=>f.id==='particles').category='Particle Fields';
      families.push({key:'cinematic:snow',kind:'cinematic',id:'particles',name:'Snow',category:'Particle Fields',description:'One scene-wide snow field. Choose falling snow, a blizzard or curling wind streams.',help:'Snowfall preserves the original Snow preset. Snow Squall uses curling wind streams; all styles share the same renderer and depth controls.',applicability:'Illustrated + Cinematic',variants:api.snowPresets.map(name=>({id:name,name:api.presetLabel(name)}))});
      return families;
    }
    // Display priorities only: every control still comes from the existing schema and handler.
    const environmentQuickFields={depth:['enabled','filterRadius','perspective'],grading:['enabled','exposure','warmth'],characters:['groundingShadow','shadowStrength','enabled'],bloom:['enabled','intensity'],wrap:['enabled','strength'],rim:['enabled','strength'],autoExposure:['enabled','strength'],finishing:['enabled','intensity'],gameplayCues:['enabled','intensity']};
    function renderEnvironment() {
      const settings=get(),defaults=api.normalize(),mode=options.getRenderer(),effective=mode==='illustrated'?api.forIllustrated(settings,options.getIllustratedFeatures?.()):mode==='cinematic'?api.effective(settings):null;
      const rows=Object.entries(api.systems).map(([key,def])=>{
        const active=Boolean(effective && (effective[key].enabled || key==='characters'&&effective.characters.groundingShadow));
        const authored=def.type?settings[key].items.length>0:JSON.stringify(settings[key])!==JSON.stringify(defaults[key]);
        return {key,def,active,authored};
      }).sort((a,b)=>Number(b.active)-Number(a.active)||Number(b.authored)-Number(a.authored));
      const rowMarkup=rows.filter(r=>r.active||r.authored||editorWorkspace.environmentAll).map(({key,def,active,authored})=>{
        const name=({characters:'Character lighting & shadows',wrap:'Scene-wide light wrap',rim:'Scene-wide rim lighting'})[key] || def.label;
        const status=active?'Active':authored?'Authored · inactive':'Available';
        const quick=new Set(environmentQuickFields[key] || ['enabled']);
        const properties=def.type?'<label class="atlasToggleField"><input type="checkbox" data-cinematic-system="'+key+'" '+(settings[key].enabled?'checked':'')+'>Participate in this scene</label><p class="editorQuiet">'+settings[key].items.length+' instances · select an object in Scene to edit its shape and appearance.</p><button data-environment-find="'+def.label+'">Find instances in Scene</button>':fields(key,settings[key],field=>quick.has(field))+('<details data-editor-panel-key="environment-more-'+key+'"><summary>'+ (Object.keys(def.fields).some(field=>!quick.has(field))?'More '+name.toLowerCase()+' controls':'Reset '+name.toLowerCase()) +'</summary>'+(key==='characters'?characterFields(settings[key],field=>!quick.has(field)):fields(key,settings[key],field=>!quick.has(field)))+'<button data-cinematic-action="reset" data-section="'+key+'">Reset '+name.toLowerCase()+'</button></details>');
        return '<details class="editorEnvironmentSystem" data-environment-system="'+key+'" data-cinematic-group="'+key+'" data-editor-panel-key="environment-'+key+'" '+(active?'open':'')+'><summary>'+name+' <small>'+status+'</small></summary><p class="editorAvailability">'+(active?(mode==='illustrated'?'Illustrated':'Cinematic'):availability(key))+' '+renderEditorInfo(name,helpText[key]+' '+availability(key))+'</p>'+properties+'</details>';
      }).join('');
      const glow=emissiveGlowTuning(options.getLevel().id);
      const glowAuthored=JSON.stringify(glow)!==JSON.stringify(window.AtlasEmissiveGlow.normalizeSettings());
      const glowRow=glow.enabled||glowAuthored||editorWorkspace.environmentAll?'<section data-environment-system="emissive">'+renderEmissiveGlowControls(options.getLevel().id,{expanded:mode==='illustrated'&&glow.enabled&&!illustratedFeatures().globalLighting})+'</section>':'';
      const participation='<details data-environment-participation-panel data-editor-panel-key="environment-participation"><summary>Renderer & layer participation</summary><p>Illustrated gates · this level. Individual objects retain their own Enabled setting. These gates do not limit Cinematic.</p>'+renderIllustratedFeatureControls(options.getLevel().id)+'<label>Placement guides<select data-cinematic-guides>'+['selected','all','hidden'].map(mode=>'<option '+(mode===view().guides?'selected':'')+'>'+mode+'</option>').join('')+'</select></label><strong>Authored layers · both modes</strong>'+Object.entries(api.layers).map(([key,def])=>'<label class="atlasToggleField"><input type="checkbox" data-environment-layer="'+key+'" '+(settings.layers[key]?'checked':'')+'>'+def.label+'</label>').join('')+'</details>';
      return '<section data-environment-overview data-cinematic-editor><p class="editorQuiet">Scene-wide settings · this level. Active systems first.</p>'+participation+rowMarkup+glowRow+'<button data-environment-other aria-expanded="'+Boolean(editorWorkspace.environmentAll)+'">'+(editorWorkspace.environmentAll?'Hide unused systems':'Other environment systems')+'</button></section>';
    }
    function render(context = {}) {
      const settings = get();
      if (context.system && api.systems[context.system]?.type) {
        const key = context.system, def = api.systems[key];
        return `<section data-cinematic-editor class="cinematicEditor"><p class="editorAvailability" data-cinematic-availability>${availability(key)}</p><p>${helpText[key]}</p><label>Placement guides<select data-cinematic-guides>${['selected','all','hidden'].map(mode=>`<option ${mode===view().guides?'selected':''}>${mode}</option>`).join('')}</select></label><details open data-editor-panel-key="cinematic-${key}" data-cinematic-group="${key}"><summary>${def.label}</summary>${`<div data-cinematic-instances="${key}">${instances(key,settings)}</div>`}</details><button data-cinematic-action="reset" data-section="${key}">Reset section</button></section>`;
      }
      return renderEnvironment();
    }
    function updateFields() {
      const settings = get();
      const availabilityNode=document.querySelector('[data-cinematic-availability]');
      if(availabilityNode)availabilityNode.textContent=availability(view().system);
      const master=document.querySelector('[data-cinematic-layer-enabled]');if(master) master.checked=settings.layers[view().layer];
      document.querySelectorAll("[data-cinematic-setting]").forEach(input => {
        const key = input.dataset.cinematicSection; const field = input.dataset.cinematicSetting;
        const value = (api.systems[key].type ? selected(key, settings) : settings[key])?.[field];
        if (value === undefined) return;
        if (key === "particles") {
          const item = selected(key, settings);
          const canvasOnly = item?.distribution === "ribbon" && ["depthInfluence", "depthSoftness", "gustStrength", "motion"].includes(field);
          const flowInactive = item?.motion === "windFlow" && ["gravity", "distribution", "randomness"].includes(field);
          input.disabled = canvasOnly || flowInactive;
          input.title = canvasOnly ? "Depth masking and gust motion require GPU particles; Sand uses Canvas 2D." : flowInactive ? "Used by Falling motion; Wind Flow follows continuous wind streams." : "";
        }
        if (input.type === "checkbox") input.checked = value; else input.value = value;
        const output = input.parentElement.querySelector("output"); if (output) output.textContent = Number(value).toFixed(api.systems[key].fields[field].step === 1 ? 0 : 2);
      });
      document.querySelectorAll("[data-cinematic-system]").forEach(input => { input.checked = settings[input.dataset.cinematicSystem].enabled; });
      const silhouette=document.querySelector('[data-cinematic-shadow-group="silhouette"]');if(silhouette)silhouette.hidden=settings.characters.shadowShape!=="silhouette";
      updateGuides();
    }
    function updateInstances(key) { const node = document.querySelector(`[data-cinematic-instances="${key}"]`); if (node) node.innerHTML = instances(key, get()); updateGuides(); }
    function commit(settings) { options.setSettings(api.normalize(settings)); updateFields(); }
    function updateLayer() {
      document.querySelectorAll('[data-cinematic-layer]').forEach(node=>node.setAttribute('aria-selected',String(node.dataset.cinematicLayer===view().layer)));
      const hint=document.querySelector('[data-cinematic-layer-help]');if(hint)hint.textContent=api.layers[view().layer].help;
      document.querySelectorAll('[data-cinematic-group]').forEach(node=>{const key=node.dataset.cinematicGroup;if(api.systems[key].type)updateInstances(key);});
      updateFields();
    }
    function guideMarkup() {
      if(options.isEditing && !options.isEditing())return '';
      if ((!options.isEditing && !document.querySelector("[data-cinematic-editor]")) || view().guides === "hidden" || !["illustrated", "cinematic"].includes(options.getRenderer())) return "";
      const settings = get();
      const effectGuides=Object.entries(api.systems).filter(([key, def]) => def.type && (options.isEditing || visibleGroup(key)) && (options.getRenderer() === "cinematic" || ['particles','areaLights'].includes(key))).map(([key]) => settings[key].items.filter(item=>options.isEditing || inLayer(key,item)).map(item => {
        const w = item.radius ? item.radius*2*item.aspect : item.length || item.width, h = item.radius ? item.radius*2 : item.height || item.width*2;
        const attrs = `data-cinematic-handle="move" data-section="${key}" data-id="${item.id}"`;
        const active = view().system===key && selected(key, settings)?.id === item.id && (!options.isSelected || options.isSelected(key,item.id));
        const detailed = active || view().guides === "all";
        const marker = `<circle cx="${item.x}" cy="${item.y}" r="${active?10:7}" ${attrs}><title>${item.name}</title></circle>`;
        if(!detailed)return `<g class="cinematicGuide cinematicMarker" data-cinematic-marker="${item.id}">${marker}</g>`;
        const points = item.points?.map(p => `${item.x+p.x*w},${item.y+p.y*h}`).join(" ");
        const rotation=key === "particles" ? item.boundsRotation : item.direction;
        const angle=(rotation || 0)*Math.PI/180;
        const rotated=(x,y)=>({x:item.x+Math.cos(angle)*x-Math.sin(angle)*y,y:item.y+Math.sin(angle)*x+Math.cos(angle)*y});
        const fanWidth=key==="godRays"?Math.tan(item.spread*Math.PI/360)*item.length:item.width;
        const corner=rotated(item.length || w/2,item.length ? fanWidth : h/2);
        const transform=`rotate(${rotation || 0} ${item.x} ${item.y})`;
        const rotationHandle=rotated(0,-h/2-36);
        return `<g class="cinematicGuide ${active ? "selected" : ""}" data-cinematic-marker="${item.id}" opacity="${item.enabled && settings[key].enabled ? 1 : 0.4}">
          <g class="cinematicInfluence" data-cinematic-detail="${item.id}">${item.length ? `<polygon points="${item.x},${item.y} ${item.x+item.length},${item.y-fanWidth} ${item.x+item.length},${item.y+fanWidth}" transform="${transform}"/>` : points ? `<polygon points="${points}" transform="${transform}"/>` : item.shape === "rectangle" ? `<rect x="${item.x-w/2}" y="${item.y-h/2}" width="${w}" height="${h}" transform="${transform}"/>` : `<ellipse cx="${item.x}" cy="${item.y}" rx="${w/2}" ry="${h/2}" transform="${transform}"/>`}</g>
          ${marker}<text x="${item.x+16}" y="${item.y-16}">${item.name}</text>
          ${active ? `<rect x="${corner.x-9}" y="${corner.y-9}" width="18" height="18" data-cinematic-handle="size" data-section="${key}" data-id="${item.id}"/>` : ""}
          ${active && item.direction !== undefined ? `<line x1="${item.x}" y1="${item.y}" x2="${item.x+Math.cos(item.direction*Math.PI/180)*120}" y2="${item.y+Math.sin(item.direction*Math.PI/180)*120}"/><circle cx="${item.x+Math.cos(item.direction*Math.PI/180)*120}" cy="${item.y+Math.sin(item.direction*Math.PI/180)*120}" r="10" data-cinematic-handle="direction" data-section="${key}" data-id="${item.id}"/>` : ""}
          ${active && key === "particles" ? `<line x1="${item.x}" y1="${item.y}" x2="${rotationHandle.x}" y2="${rotationHandle.y}"/><circle cx="${rotationHandle.x}" cy="${rotationHandle.y}" r="11" data-cinematic-handle="boundsRotation" data-section="${key}" data-id="${item.id}"><title>Rotate bounds</title></circle>` : ""}
          ${active ? (item.points || []).map((p, i) => {const vertex=rotated(p.x*w,p.y*h);return `<circle cx="${vertex.x}" cy="${vertex.y}" r="9" data-cinematic-handle="vertex" data-index="${i}" data-section="${key}" data-id="${item.id}"/>`;}).join("") : ""}</g>`;
      }).join("")).join("");
      const source=settings.characters,showSource=options.getRenderer()==="cinematic"&&view().layer==="characters"&&view().system==="characters";
      const sourceGuide=showSource?`<g class="cinematicGuide selected cinematicShadowSourceGuide" data-cinematic-shadow-source><circle cx="${source.shadowLightSourceX}" cy="${source.shadowLightSourceY}" r="12" data-cinematic-handle="shadow-source" data-section="characters"><title>Shadow Light Source</title></circle><path d="M ${source.shadowLightSourceX-18} ${source.shadowLightSourceY} H ${source.shadowLightSourceX+18} M ${source.shadowLightSourceX} ${source.shadowLightSourceY-18} V ${source.shadowLightSourceY+18}"/><text x="${source.shadowLightSourceX+18}" y="${source.shadowLightSourceY-18}">Shadow Light Source</text></g>`:"";
      return effectGuides+sourceGuide;
    }
    function guideViewBox() { return `${options.getCameraX()} 0 ${options.getViewportWorldWidth() || options.getLevel().world.width} ${options.getLevel().world.height}`; }
    function renderGuides() { return options.getLevel()?.world ? `<svg class="cinematicGuides" data-cinematic-placement viewBox="${guideViewBox()}" preserveAspectRatio="none"></svg>` : ""; }
    function updateGuideCamera() { const svg = document.querySelector("[data-cinematic-placement]"); if (svg) svg.setAttribute("viewBox", guideViewBox()); }
    function updateGuides() { const svg = document.querySelector("[data-cinematic-placement]"); if (svg) { updateGuideCamera(); svg.innerHTML = guideMarkup(); } }
    function point(event, svg) { const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(svg.getScreenCTM().inverse()); return { x: p.x, y: p.y }; }
    document.addEventListener("input", event => {
      const input = event.target.closest("[data-cinematic-setting], [data-cinematic-system], [data-cinematic-guides], [data-cinematic-layer-enabled], [data-environment-layer]"); if (!input) return;
      event.stopImmediatePropagation();
      if (input.hasAttribute("data-cinematic-guides")) { view().guides=input.value;updateGuides(); return; }
      const settings = get();
      if(input.dataset.environmentLayer)settings.layers[input.dataset.environmentLayer]=input.checked;
      else if(input.hasAttribute('data-cinematic-layer-enabled')) settings.layers[view().layer]=input.checked;
      else if (input.dataset.cinematicSystem) settings[input.dataset.cinematicSystem].enabled = input.checked;
      else { const key = input.dataset.cinematicSection; const item = api.systems[key].type ? selected(key, settings) : settings[key]; item[input.dataset.cinematicSetting] = input.type === "checkbox" ? input.checked : ["number", "range"].includes(input.type) ? Number(input.value) : input.value; }
      view().system=input.dataset.cinematicSection||input.dataset.cinematicSystem||view().system;
      if(input.closest('[data-environment-overview]'))view().layer=api.systems[view().system].layer;
      commit(settings);
      if(input.closest('[data-environment-overview]'))refreshEditorWorkspace();
      if(input.dataset.cinematicSetting==='layer'){view().layer=input.value;updateLayer();}
    }, true);
    document.addEventListener("change", event => {
      const preset=event.target.closest('[data-cinematic-preset]');
      if(preset?.value){const key=preset.dataset.cinematicPreset,settings=get(),item=selected(key,settings),next=api.preset(key,preset.value,item);view().presets[item.id]=preset.value;settings[key].items[settings[key].items.indexOf(item)]=next;selection.set(selectionKey(key),next.id);view().layer=next.layer;view().system=key;commit(settings);updateLayer();}
      if (event.target.closest("[data-cinematic-editor]") && !event.target.closest("[data-environment-overview]")) event.stopImmediatePropagation();
    }, true);
    document.addEventListener("click", event => {
      if(suppressReleaseClick){suppressReleaseClick=false;event.preventDefault();event.stopImmediatePropagation();return;}
      const handle=event.target.closest('[data-cinematic-handle]');if(handle){event.preventDefault();event.stopImmediatePropagation();return;}
      const tip=event.target.closest('[data-cinematic-help]');if(tip){event.preventDefault();event.stopImmediatePropagation();openEditorInfo(tip,label(tip.dataset.helpKey),help(tip.dataset.helpKey,tip.dataset.helpSection)+' '+availability(tip.dataset.helpSection));return;}
      const summary=event.target.closest('[data-cinematic-group] summary');if(summary){select(summary.closest('[data-cinematic-group]').dataset.cinematicGroup);updateGuides();}
      const button = event.target.closest("[data-cinematic-action]");
      if (!button) return;
      event.preventDefault(); event.stopImmediatePropagation();
      const settings = get(); const action = button.dataset.cinematicAction, key = button.dataset.section;
      if (action === 'add') select(key);
      if (action === "reset-all") { commit(api.normalize()); Object.entries(api.systems).filter(([, def]) => def.type).forEach(([k]) => updateInstances(k)); return; }
      if (action === "reset") settings[key] = api.normalize()[key];
      if (action === "add" && settings[key].items.length < 12) {
        const world = options.getLevel().world; const id = `${key}-${Date.now().toString(36)}`;
        const item=api.instance(key, { id, layer:view().layer, x: options.getCameraX()+options.getViewportWorldWidth()/2, y: world.height*0.55 });
        const added=button.dataset.addCinematicPreset ? api.preset(key,button.dataset.addCinematicPreset,item) : item;
        if(key==='particles' && api.snowPresets.includes(button.dataset.addCinematicPreset)) {
          Object.assign(added,{name:api.presetLabel(button.dataset.addCinematicPreset),shape:'rectangle',x:world.width/2,y:world.height/2,width:world.width,height:world.height,boundsRotation:0});
        }
        settings[key].items.push(added);view().layer=added.layer;
        settings[key].enabled = true; selection.set(selectionKey(key), id);
      }
      if(action==='duplicate' && settings[key].items.length<12){const original=selected(key,settings);if(original){const id=`${key}-${global.crypto.randomUUID()}`,baseName=original.name.slice(0,80);let name=`${baseName} copy`,suffix=2;while(settings[key].items.some(item=>item.name===name))name=`${baseName} copy ${suffix++}`;settings[key].items.push(api.instance(key,{...api.clone(original),id,name,x:original.x+24,y:original.y+18}));selection.set(selectionKey(key),id);}}
      if (action === "remove") settings[key].items = settings[key].items.filter(i => i.id !== selected(key, settings)?.id);
      view().system=key;commit(settings); if (api.systems[key].type) updateInstances(key);
      if(button.closest('[data-environment-overview]'))refreshEditorWorkspace();
      else options.onSelect?.(key, selected(key)?.id || key);
    }, true);
    document.addEventListener("pointerdown", event => {
      const handle = event.target.closest("[data-cinematic-handle]"); if (!handle) return;
      event.preventDefault(); event.stopImmediatePropagation();
      const svg = handle.closest("svg"); const key = handle.dataset.section; view().system=key;
      if(handle.dataset.cinematicHandle==="shadow-source"){const characters=get().characters;drag={svg,key,type:"shadow-source",start:point(event,svg),item:{x:characters.shadowLightSourceX,y:characters.shadowLightSourceY},pointerId:event.pointerId};}
      else{select(key, handle.dataset.id);drag = { svg, key, id: handle.dataset.id, type: handle.dataset.cinematicHandle, index: Number(handle.dataset.index), start: point(event, svg), item: api.clone(selected(key)), pointerId: event.pointerId };}
      svg.setPointerCapture(event.pointerId); if(api.systems[key].type)updateInstances(key);
      options.onSelect?.(key, handle.dataset.id || key, { dragging: true });
    }, true);
    document.addEventListener("pointermove", event => {
      if (!drag || drag.pointerId !== event.pointerId) return; event.preventDefault(); event.stopImmediatePropagation();
      const p = point(event, drag.svg), settings = get(), start = drag.item;
      if(drag.type==="shadow-source"){settings.characters.shadowLightSourceX=start.x+p.x-drag.start.x;settings.characters.shadowLightSourceY=start.y+p.y-drag.start.y;commit(settings);return;}
      const item = settings[drag.key].items.find(i => i.id === drag.id);
      if (!item) return;
      const angle=(drag.key === "particles" ? item.boundsRotation : item.direction || 0)*Math.PI/180, dx=p.x-item.x, dy=p.y-item.y;
      const local={x:Math.cos(angle)*dx+Math.sin(angle)*dy,y:-Math.sin(angle)*dx+Math.cos(angle)*dy};
      if (drag.type === "move") { item.x = start.x+p.x-drag.start.x; item.y = start.y+p.y-drag.start.y; }
      if (drag.type === "size") { if (item.radius) item.radius = Math.max(1, Math.abs(local.x)/item.aspect); else if (item.length) { item.length = Math.max(1, Math.abs(local.x)); if(drag.key==="godRays")item.spread=Math.atan2(Math.abs(local.y),item.length)*360/Math.PI;else item.width = Math.max(1, Math.abs(local.y)); } else { item.width = Math.max(1, Math.abs(local.x)*2); item.height = Math.max(1, Math.abs(local.y)*2); } }
      if (drag.type === "boundsRotation") item.boundsRotation = ((Math.atan2(p.y-item.y,p.x-item.x)*180/Math.PI+90+540)%360)-180;
      if (drag.type === "direction") item.direction = Math.atan2(p.y-item.y,p.x-item.x)*180/Math.PI;
      if (drag.type === "vertex") item.points[drag.index] = { x: local.x/item.width, y: local.y/item.height };
      commit(settings);
    }, true);
    const endDrag = event => { if (!drag) return; event.preventDefault();event.stopImmediatePropagation(); const ended=drag;drag.svg.releasePointerCapture?.(drag.pointerId); drag = null;suppressReleaseClick=true;options.onSelect?.(ended.key,ended.id || ended.key);setTimeout(()=>{suppressReleaseClick=false;},0); };
    document.addEventListener("pointerup", endDrag, true); document.addEventListener("pointercancel", endDrag, true);
    return { render, renderEnvironment, creationFamilies, select, renderGuides, updateGuides, updateFields, updateGuideCamera };
  }
  global.AtlasCinematicEditor = { createEditor };
})(window);
