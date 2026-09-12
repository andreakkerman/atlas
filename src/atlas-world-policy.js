(function(global){
 'use strict';
 // World batching, not a device-quality preset: identical on PC and tablet.
 const repeated=/^(Curated|Faceted|Atlas moss rock|Grass|Path bank community|Atlas woodland fern|Rich route understory|Broad leaf community|Fern drift|Enclosure shrub)/;
 const groundcover=/^(Curated grass2|Curated Fern|Curated Flower|Grass|Path bank community|Atlas woodland fern|Rich route understory|Broad leaf community|Fern drift|Detailed woodland flower|Paving edge tuft|Sorrel in paving joint)/;
 const name=o=>o.name.replace(/_/g,' ');
 global.AtlasWorldPolicy=Object.freeze({
  cellSize(object){return !Array.isArray(object.material)&&!object.material.transparent&&!object.material.alphaTest&&repeated.test(name(object))?32:12;},
  castsShadow(object){return !groundcover.test(name(object))&&!/^(Atlas distant ridgeline|Faceted distant fir)/.test(name(object));},
  shadowRecenterDistance:.8,
  fxaa(search=''){const q=new URLSearchParams(search);return !(q.get('debug3d')==='1'&&q.get('atlasFxaa')==='0');},
  forestFloor:Object.freeze({name:'forrest_ground_01',texture:'Atlas evening floor v168',size:512}),
  // Art direction shared by Atlas on every device; no extra render passes.
  lighting:Object.freeze({mode:'golden-evening',sun:'#ffd49a',sunIntensity:7,sunOffset:Object.freeze([-38,24,-52]),
   sky:'#b6c7d8',ground:'#403a27',hemisphere:1.9,bounce:'#e7bd8c',bounceIntensity:.8,
   exposure:1.12,shadowIntensity:.75,fog:'#dbc5a1',fogDensity:.0115,
   sunRadiusDegrees:.65,sunHaloDegrees:4,skyTint:Object.freeze([.24,.27,.32])})
 });
})(window);
