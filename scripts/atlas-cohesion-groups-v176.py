"""Reuse off-route plants in readable mixed groups, preserving all counts and anchors."""
import bpy,json,math,random,numpy as np
from pathlib import Path
from mathutils import Vector,Quaternion
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];D=R/'Levels/LVL-0001/3d';S=bpy.context.scene
assert S.get('atlas_cohesion_v176') and not S.get('atlas_cohesion_groups_v176')
source=(R/'scripts/atlas-premium-pass.py').read_text();fix=(R/'scripts/atlas-premium-grounding.py').read_text()
exec(source[source.index('def surface('):source.index('# Existing six')])
exec(fix[fix.index('ground=surface('):fix.index('ledger=json.loads')])
planting=(R/'scripts/atlas-temple-planting.py').read_text()
exec(planting[planting.index('runestones='):planting.index('ledger=json.loads',planting.index('runestones='))])
ledger=json.loads((D/'atlas-curated-ledger.json').read_text());report=json.loads((D/'atlas-cohesion-v176-ledger.json').read_text());rng=random.Random(176)
ferns=[o for o in S.objects if o.get('curatedSource')=='Fern' and 2.8<route(o.location)[0]<8 and 0<o.location.y<56]
anchors=[]
for y in [4,12,21,30,39,48]:
 for sign in [-1,1]:
  candidates=[o for o in ferns if (o.location.x-route(o.location)[1].x)*sign>0]
  if not candidates:continue
  o=min(candidates,key=lambda o:abs(o.location.y-y)+route(o.location)[0]*.15)
  if all((o.location-a).length>3 for a in anchors):anchors.append(o.location.copy())
report['groups']=[list(p) for p in anchors];report['regrouped']=[]
for key,count,radius in [('grass2',240,2.6),('Fern',18,1.8),('Flower1',12,1.9),('Flower3',6,1.8)]:
 donors=[r for r in ledger['placements'] if r['source']==key and route(r['position'])[0]>(18 if key=='grass2' else 9)]
 donors=sorted(donors,key=lambda r:route(r['position'])[0],reverse=True)[:count]
 for i,rec in enumerate(donors):
  o=bpy.data.objects[rec['name']];old=list(o.location);oldscale=o.scale.x;center=anchors[i%len(anchors)]
  if key=='grass2':o.scale*=1.18
  for attempt in range(320):
   a=rng.uniform(0,math.tau);r=rng.uniform(.3,radius);result=candidate(o,center.x+math.cos(a)*r,center.y+math.sin(a)*r,rng.uniform(0,math.tau))
   if result is None:continue
   p,q,gap,depth=result;o.location=p;o.rotation_mode='QUATERNION';o.rotation_quaternion=q;bpy.context.view_layer.update()
   if intersects(o) or not runeClear(o):continue
   rec.update(position=list(p),rotation=list(q),scale=o.scale.x,maxRootGap=-.008,minRootGap=gap,maxTerrainPenetration=depth)
   report['regrouped'].append({'name':o.name,'source':key,'before':old,'after':list(p),'beforeScale':oldscale,'afterScale':o.scale.x});break
  else:raise RuntimeError('No cluster site '+o.name)
for name,m in report['protected'].items():assert [list(r) for r in bpy.data.objects[name].matrix_world]==m,name
plants=[bpy.data.objects[p['name']] for p in ledger['placements'] if p['source']!='Pine1'];assert not any(intersects(o) or not runeClear(o) for o in plants)
(D/'atlas-curated-ledger.json').write_text(json.dumps(ledger,indent=2))
exec(source[source.index('# Offline 1024-square'):source.index('for name,matrix in protected.items()')])
(D/'atlas-cohesion-v176-ledger.json').write_text(json.dumps(report,indent=2));S['atlas_cohesion_groups_v176']=True
bpy.ops.wm.save_as_mainfile(filepath=str(D/'lvl0001-stylized.blend'))
print('GROUPS',len(anchors),'REUSED',len(report['regrouped']))
