const {test,expect}=require('@playwright/test');
const {inspect}=require('../scripts/atlas-grass-integrity.cjs');
const ledger=require('../Levels/LVL-0001/3d/atlas-grass-coverage-ledger.json');
test('fuller Atlas grass preserves all non-grass content and its geometry budget',()=>{
 const actual=inspect('Levels/LVL-0001/3d/atlas-3d.glb');
 expect(actual.grassInstances).toBe(4000);expect(actual.triangles).toBe(256);
 expect(actual.geometry).toEqual(ledger.baseline.geometry);
 expect(actual.protectedJsonSHA256).toBe(ledger.baseline.protectedJsonSHA256);
 expect(actual.nonGrassPayloadSHA256).toBe(ledger.baseline.nonGrassPayloadSHA256);
 expect(actual.bufferViews).toBe(ledger.baseline.bufferViews);
 expect(actual.bytes-ledger.baseline.bytes).toBeLessThanOrEqual(1024);
});
