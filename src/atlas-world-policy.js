(function(global){
 'use strict';
 // World batching, not a device-quality preset: identical on PC and tablet.
 const repeated=/^(Faceted|Atlas moss rock|Grass|Path bank community|Atlas woodland fern|Rich route understory|Broad leaf community|Fern drift|Enclosure shrub)/;
 const groundcover=/^(Grass|Path bank community|Atlas woodland fern|Rich route understory|Broad leaf community|Fern drift|Detailed woodland flower|Paving edge tuft|Sorrel in paving joint)/;
 const name=o=>o.name.replace(/_/g,' ');
 global.AtlasWorldPolicy=Object.freeze({
  cellSize(object){return !Array.isArray(object.material)&&!object.material.transparent&&!object.material.alphaTest&&repeated.test(name(object))?32:12;},
  castsShadow(object){return !groundcover.test(name(object));},
  shadowRecenterDistance:.8
 });
})(window);
