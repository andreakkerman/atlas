"""v175: re-seat existing plants after the rock sweep and dress the temple bank."""
import bpy,json,math,random,numpy as np
from pathlib import Path
from mathutils import Vector,Quaternion
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];D=R/'Levels/LVL-0001/3d';S=bpy.context.scene
assert S.get('atlas_temple_review_v175') and not S.get('atlas_temple_planted_v175')
source=(R/'scripts/atlas-premium-pass.py').read_text();fix=(R/'scripts/atlas-premium-grounding.py').read_text()
exec(source[source.index('def surface('):source.index('# Existing six')])
exec(fix[fix.index('ground=surface('):fix.index('ledger=json.loads')])
baseCandidate=candidate
runestones=[bpy.data.objects[n] for n in ['forestRune','zon']]
def runeClear(o):
 pts=[o.matrix_world@v.co for v in o.data.vertices]
 for stone in runestones:
  # Keep the entire plant footprint out of the readable stone/glow envelope.
  inv=stone.matrix_world.inverted();bb=[Vector(v) for v in stone.bound_box]
  lo=Vector(tuple(min(p[k] for p in bb) for k in range(3)));hi=Vector(tuple(max(p[k] for p in bb) for k in range(3)))
  for p in pts:
   q=inv@p
   if lo.x-.12<q.x<hi.x+.12 and lo.y-.22<q.y<hi.y+.22 and lo.z<q.z<hi.z:return False
 return True
ledger=json.loads((D/'atlas-curated-ledger.json').read_text());report=json.loads((D/'atlas-temple-review-ledger.json').read_text());rng=random.Random(1751)
report['plants']=[];report['hillClusters']=[];report['treeSupportCorrections']=[]
def pineCandidate(o,x,y):
 p,n,_,_=ground.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))
 if p is None or n.z<.9 or route((x,y))[0]<3.5:return None
 if 11.5<x<26.5 and 56.5<y<68.5:return None
 if any((Vector((x,y))-Vector(s.location[:2])).length<3.3 for s in runestones):return None
 if any(t!=o and t.get('curatedSource')=='Pine1' and (Vector((x,y))-Vector(t.location[:2])).length<1.8 for t in S.objects):return None
 q=o.rotation_quaternion;values=[]
 for v in roots(o):
  pt=p+q@(v*o.scale.x);contact=hit(ground,pt.x,pt.y)
  if contact is None:return None
  values.append(pt.z-contact.z)
 if max(values)-min(values)>.23:return None
 p.z-=max(values)+.008;depth=0
 for v in o.data.vertices:
  if v.co.z*o.scale.x>1:continue
  pt=p+q@(v.co*o.scale.x);contact=hit(ground,pt.x,pt.y)
  if contact is None:return None
  depth=max(depth,contact.z-pt.z)
  if depth>.27:return None
 return p,q,min(values)-max(values)-.008,depth
# Move a small number of distant instances into five readable bank groups.
sites=[(14.0,47.2),(19.0,48.6),(22.5,51.0),(23.0,54.5),(10.2,53.0)]
for key,count in [('Fern',15),('grass2',60),('Flower1',5)]:
 donors=[p for p in ledger['placements'] if p['source']==key and route(p['position'])[0]>14 and p['position'][1]<38][:count]
 for i,rec in enumerate(donors):
  o=bpy.data.objects[rec['name']];cx,cy=sites[i%len(sites)];old=o.location.copy()
  for attempt in range(250):
   a=rng.uniform(0,math.tau);r=rng.uniform(.3,3.8);result=baseCandidate(o,cx+math.cos(a)*r,cy+math.sin(a)*r,rng.uniform(0,math.tau))
   if result is None:continue
   p,q,gap,depth=result;o.location=p;o.rotation_mode='QUATERNION';o.rotation_quaternion=q;bpy.context.view_layer.update()
   if intersects(o) or not runeClear(o):continue
   rec.update(position=list(p),rotation=list(q),maxRootGap=-.008,minRootGap=gap,maxTerrainPenetration=depth)
   report['hillClusters'].append({'name':o.name,'source':key,'before':list(old),'after':list(p)});break
  else:raise RuntimeError('No hill cluster position '+o.name)
# Detect root failures and material penetration against the changed surfaces.
for rec in ledger['placements']:
 o=bpy.data.objects[rec['name']];values=gaps(o);key=rec['source'];old=o.location.copy()
 intersectsRune=key!='Pine1' and not runeClear(o)
 if max(values)<=.0001 and min(values)>=(-.25 if key=='Pine1' else -.085) and not intersectsRune:continue
 oldq=o.rotation_quaternion.copy()
 attempts=1600 if key=='Pine1' else 600
 for i in range(attempts):
  a=rng.uniform(0,math.tau);r=0 if i==0 else .2+math.sqrt(i/attempts)*(16 if key=='Pine1' else 7)
  x=old.x+math.cos(a)*r;y=old.y+math.sin(a)*r
  result=pineCandidate(o,x,y) if key=='Pine1' else baseCandidate(o,x,y,oldq.to_euler().z)
  if result is None:continue
  p,q,gap,depth=result;o.location=p;o.rotation_mode='QUATERNION';o.rotation_quaternion=q;bpy.context.view_layer.update()
  if key!='Pine1' and (intersects(o) or not runeClear(o)):continue
  rec.update(position=list(p),rotation=list(q),maxRootGap=-.008,minRootGap=gap,maxTerrainPenetration=depth)
  report['plants'].append({'name':o.name,'before':list(old),'after':list(p),'reason':'rune clearance' if intersectsRune else 'changed rock support'});break
 else:raise RuntimeError('No grounded placement '+o.name)
 if key=='Pine1':report['treeSupportCorrections'].append({'name':o.name,'before':list(old),'after':list(o.location)})
plants=[bpy.data.objects[p['name']] for p in ledger['placements'] if p['source']!='Pine1']
assert not any(intersects(o) or not runeClear(o) for o in plants)
# Broad, low-frequency olive mineral/moss patches across the existing hill
# vertices. No extra terrain mesh, repeating decal or texture.
for o in terrainObjects:
 colors=o.data.color_attributes.get('Color')
 if not colors:continue
 weights=[]
 for v in o.data.vertices:
  p=o.matrix_world@v.co
  envelope=max(0,1-((p.x-19)/12)**4)*max(0,1-((p.y-51)/13)**4)
  pattern=(.5+.5*math.sin(p.x*.72+p.y*.25+math.sin(p.y*.53)))**2
  weights.append(envelope*pattern*.38)
 for loop in o.data.loops:
  w=weights[loop.vertex_index];c=colors.data[loop.index].color
  colors.data[loop.index].color=(c[0]*(1-w*.18),c[1]*(1+w*.52),c[2]*(1-w*.05),c[3])
report['hillVertexColorBreakup']=True
(D/'atlas-curated-ledger.json').write_text(json.dumps(ledger,indent=2))
exec(source[source.index('# Offline 1024-square'):source.index('for name,matrix in protected.items()')])
(D/'atlas-temple-review-ledger.json').write_text(json.dumps(report,indent=2))
S['atlas_temple_planted_v175']=True
bpy.ops.wm.save_as_mainfile(filepath=str(D/'lvl0001-stylized.blend'))
print('HILL CLUSTERS',len(report['hillClusters']),'SUPPORT/CLEARANCE CORRECTIONS',len(report['plants']))
