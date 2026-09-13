"""Keep the existing seven-metre pine-spacing gate after support corrections."""
import bpy,json,math,random,numpy as np
from pathlib import Path
from mathutils import Vector,Quaternion
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];D=R/'Levels/LVL-0001/3d';S=bpy.context.scene
text=(R/'scripts/atlas-temple-planting.py').read_text()
exec(text[text.index('source=(R/'):text.index('# Move a small number')].replace('length<1.8 for t in S.objects','length<7.05 for t in S.objects'))
rng=random.Random(1759)
for name in ['Curated Pine1.001','Curated Pine1.035','Curated Pine1.056','Curated Pine1.064']:
 o=bpy.data.objects[name];old=o.location.copy();rec=next(p for p in ledger['placements'] if p['name']==name)
 for i in range(36000):
  angle=rng.uniform(0,math.tau);radius=0 if i==0 else .2+math.sqrt(i/36000)*48
  result=pineCandidate(o,old.x+math.cos(angle)*radius,old.y+math.sin(angle)*radius)
  if result is None:continue
  p,q,gap,depth=result;o.location=p;bpy.context.view_layer.update()
  rec.update(position=list(p),rotation=list(q),maxRootGap=-.008,minRootGap=gap,maxTerrainPenetration=depth)
  print(name,list(old),'->',list(p));break
 else:raise RuntimeError('No spaced footing '+name)
# Reload the complete report because the helper setup initialized its lists.
report=json.loads((D/'atlas-temple-review-ledger.json').read_text())
for r in report['treeSupportCorrections']:r['after']=list(bpy.data.objects[r['name']].location)
for r in report['plants']:
 if r['name'].startswith('Curated Pine1'):r['after']=list(bpy.data.objects[r['name']].location)
pines=[o for o in S.objects if o.get('curatedSource')=='Pine1']
minimum=min((Vector(a.location[:2])-Vector(b.location[:2])).length for i,a in enumerate(pines) for b in pines[i+1:]);assert minimum>7
report['minimumPineSpacing']=minimum
(D/'atlas-curated-ledger.json').write_text(json.dumps(ledger,indent=2))
exec(source[source.index('# Offline 1024-square'):source.index('for name,matrix in protected.items()')])
(D/'atlas-temple-review-ledger.json').write_text(json.dumps(report,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(D/'lvl0001-stylized.blend'))
print('MINIMUM SPACING',minimum)
