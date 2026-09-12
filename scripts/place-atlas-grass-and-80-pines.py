"""v166: exactly 80 structural pines and generously instanced source grass."""
import bpy,math,json,random
from pathlib import Path
from mathutils import Vector,Quaternion
from mathutils.bvhtree import BVHTree
R=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d');S=bpy.context.scene
assert S.get('atlas_curated_v165') and not S.get('atlas_grass_v166')
rng=random.Random(166)
ledger=json.loads((R/'atlas-curated-ledger.json').read_text())
pine=next(o.data for o in S.objects if o.get('curatedSource')=='Pine1')
grass=bpy.data.meshes.get('Atlas shared grass2 patch') or bpy.data.meshes['Atlas grass benchmark grass2-light'];grass.name='Atlas shared grass2 patch'
oldtrees=[o for o in S.objects if o.get('curatedSource')=='Pine1' or o.name.startswith('Faceted distant fir')]
old_positions=[o.location.copy() for o in oldtrees if o.get('curatedSource')=='Pine1']
protected={o.name:[list(r) for r in o.matrix_world] for o in S.objects if o not in oldtrees}
for o in oldtrees:bpy.data.objects.remove(o,do_unlink=True)
ledger['placements']=[p for p in ledger['placements'] if p['source']!='Pine1']
surface_prefix=('Continuous forest terrain','Forest surrounding terrain','Atlas moss rock','Atlas moss cliff','Opening fractured moss boulder','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace')
vs=[];fs=[]
for o in S.objects:
 if o.type!='MESH' or not o.name.startswith(surface_prefix):continue
 off=len(vs);vs.extend(o.matrix_world@v.co for v in o.data.vertices);fs.extend(tuple(off+i for i in p.vertices) for p in o.data.polygons)
surface=BVHTree.FromPolygons(vs,fs)
def hit(x,y):return surface.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))[:2]
route=json.loads((R/'route.json').read_text());ps=[Vector((p['position'][0],-p['position'][2])) for p in route['route']]
def route_distance(p):
 p=Vector(p[:2]);return min((p-a-(b-a)*max(0,min(1,(p-a).dot(b-a)/(b-a).length_squared))).length for a,b in zip(ps,ps[1:]))
meshes={'Pine1':pine,'grass2':grass}
roots={k:[v.co.copy() for v in m.vertices if v.co.z<max(v.co.z for v in m.vertices)*.015] for k,m in meshes.items()}
def placement(key,x,y,scale,angle):
 point,normal=hit(x,y)
 if point is None or normal.z<(.9 if key=='Pine1' else .79):return None
 rotation=(Quaternion() if key=='Pine1' else Vector((0,0,1)).rotation_difference(normal))@Quaternion((0,0,1),angle)
 gaps=[]
 for v in roots[key]:
  v=rotation@(v*scale);p,_=hit(x+v.x,y+v.y)
  if p is None:return None
  gaps.append(point.z+v.z-p.z)
 if max(gaps)-min(gaps)>(.24 if key=='Pine1' else .04):return None
 offset=-max(gaps)-.008;position=point+Vector((0,0,offset));depth=0
 for v in meshes[key].vertices:
  if key=='Pine1' and v.co.z*scale>1:continue
  q=position+rotation@(v.co*scale);p,_=hit(q.x,q.y)
  if p is None:return None
  depth=max(depth,p.z-q.z)
  if depth>(.27 if key=='Pine1' else .055):return None
 return {'position':position,'rotation':rotation,'scale':scale,'maxRootGap':max(gaps)+offset,'minRootGap':min(gaps)+offset,'maxTerrainPenetration':depth,'slopeDegrees':math.degrees(math.acos(min(1,normal.z)))}
def create(key,p,zone=None):
 o=bpy.data.objects.new('Curated '+key,meshes[key]);S.collection.objects.link(o);o.location=p['position'];o.rotation_mode='QUATERNION';o.rotation_quaternion=p['rotation'];o.scale=(p['scale'],)*3;o['curatedSource']=key;o['groundingVersion']=166
 record={k:v for k,v in p.items() if k!='rotation'};record['position']=list(record['position']);record.update(name=o.name,source=key)
 if zone:record['zone']=zone;o['forestZone']=zone
 ledger['placements'].append(record)

# Farthest-point selection within depth zones covers the MAP, not a route ribbon.
# Random candidate sites and minimum spacing prevent rows and overlapping walls.
candidates={'foreground':[],'midground':[],'closure':[]}
for i in range(18000):
 if i<len(old_positions):x,y=old_positions[i].x,old_positions[i].y
 else:x,y=rng.uniform(-40,56),rng.uniform(-24,92)
 d=route_distance((x,y));zone='foreground' if 3.5<d<12 else 'midground' if 12<=d<28 else 'closure' if 28<=d<58 else None
 if not zone:continue
 scale=rng.uniform(1.6,1.95) if zone=='foreground' else rng.uniform(1.25,1.8) if zone=='midground' else rng.uniform(1.2,1.7)
 p=placement('Pine1',x,y,scale,rng.uniform(0,math.tau))
 if p:p['zone']=zone;candidates[zone].append(p)
chosen=[]
for zone,count in [('foreground',12),('closure',40),('midground',28)]:
 pool=candidates[zone]
 for _ in range(count):
  valid=[p for p in pool if all((Vector(p['position'][:2])-Vector(q['position'][:2])).length>7.5 for q in chosen)]
  if not valid:break
  def separation(p):return min((Vector(p['position'][:2])-Vector(q['position'][:2])).length for q in chosen) if chosen else -abs(p['position'].y-5)
  p=max(valid,key=separation);pool.remove(p);chosen.append(p);create('Pine1',p,zone)
while len(chosen)<80:
 pool=[p for values in candidates.values() for p in values]
 def separation(p):return min((Vector(p['position'][:2])-Vector(q['position'][:2])).length for q in chosen)
 p=max(pool,key=separation)
 assert separation(p)>6.5,('No remaining well-spaced site',len(chosen))
 candidates[p['zone']].remove(p);chosen.append(p);create('Pine1',p,p['zone'])
assert len(chosen)==80

# Preserve the fern/flower hierarchy. Grass is short, airy filler with large
# patch/gap rhythms; roots stay outside paths and fern/flower centres.
existing=[(Vector(p['position']),p['source'],p['scale']) for p in ledger['placements'] if p['source']!='Pine1']
grid={};grass_count=0
for attempt in range(100000):
 x,y=rng.uniform(-40,56),rng.uniform(-24,92);d=route_distance((x,y))
 if d<2.1 or d>37:continue
 density=math.sin(x*.43+y*.17)+math.cos(y*.34-x*.13)+.4*math.sin(y*1.5)
 if density<-.6 or (d>22 and rng.random()<.55):continue
 if any(math.hypot(x-p['position'].x,y-p['position'].y)<.9 for p in chosen):continue
 if any(math.hypot(x-p.x,y-p.y)<(.42 if k=='Fern' else .25) for p,k,s in existing):continue
 cell=(math.floor(x/.6),math.floor(y/.6))
 if any(math.hypot(x-q[0],y-q[1])<.57 for a in range(-1,2) for b in range(-1,2) for q in grid.get((cell[0]+a,cell[1]+b),[])):continue
 p=placement('grass2',x,y,rng.uniform(.64,.92),rng.uniform(0,math.tau))
 if not p:continue
 create('grass2',p);grid.setdefault(cell,[]).append((x,y));grass_count+=1
 if grass_count==4000:break
assert grass_count>=2500,grass_count
bpy.context.view_layer.update()
for name,matrix in protected.items():assert [list(r) for r in S.objects[name].matrix_world]==matrix,name
sources=json.loads((R.parents[2]/'output/grass-v166/sources.json').read_text())
ledger['sources']['grass2']={'sha256':sources['sourceFiles']['grass2'],'triangles':256,'sourceTriangles':2352,'sourceBladeCount':147,'selectedBladeCount':16,'materials':['Atlas shared grass'],'textures':0,'sourceBladeNames':sources['grass2-light']['sourceBladeNames'],'adjustments':'16 original blades, shared mesh, source colors stored as vertex colors, per-blade root height normalized before instancing'}
ledger['counts']={key:sum(p['source']==key for p in ledger['placements']) for key in ledger['sources']}
ledger['v166']={'pineZones':{zone:sum(p['zone']==zone for p in chosen) for zone in candidates},'oldDistantPinesRemoved':100,'grassCount':grass_count,'protectedObjects':len(protected),'minimumPineSeparation':min((Vector(a['position'][:2])-Vector(b['position'][:2])).length for i,a in enumerate(chosen) for b in chosen[i+1:])}
(R/'atlas-curated-ledger.json').write_text(json.dumps(ledger,indent=2));S['atlas_grass_v166']=True
bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'));print(json.dumps({'counts':ledger['counts'],'v166':ledger['v166']}))
