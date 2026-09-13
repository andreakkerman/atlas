"""v172: compact temple-style path, selective supplied rocks and planted accents.
Run against the saved v171 authoring scene through Blender MCP.
"""
import bpy,bmesh,json,math,random
from pathlib import Path
from mathutils import Vector,Quaternion
from mathutils.bvhtree import BVHTree
R=Path('D:/DevProjects/SvenAdventure');D=R/'Levels/LVL-0001/3d';S=bpy.context.scene
assert S.get('atlas_path_v171') and not S.get('atlas_panorama_v172')
ledger=json.loads((D/'atlas-curated-ledger.json').read_text());rng=random.Random(172)
report={'path':[],'pathGrounding':[],'rocks':[],'plants':[],'protected':{o.name:[list(r) for r in o.matrix_world] for o in S.objects if o.name in ['forestRune','steen','templeGate door'] or o.name.startswith('Temple stair')}}
def surface(prefix):
 vs=[];faces=[]
 for o in S.objects:
  if o.type!='MESH' or not o.name.startswith(prefix):continue
  n=len(vs);vs.extend(o.matrix_world@v.co for v in o.data.vertices);faces.extend(tuple(n+i for i in p.vertices) for p in o.data.polygons)
 return BVHTree.FromPolygons(vs,faces)
def hit(bvh,x,y):return bvh.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))[:2]
terrain=surface(('Continuous forest terrain','Forest surrounding terrain'))
# The actual temple stone, including its UVs and shared material, is reused.
mesh=bpy.data.objects['Temple stair.004'].data
old=[o for o in S.objects if o.name.startswith('Atlas route stone')]
report['oldPathCount']=len(old)
for o in old:bpy.data.objects.remove(o,do_unlink=True)
route=json.loads((D/'route.json').read_text());ps=[Vector((p['position'][0],-p['position'][2])) for p in route['route']]
lengths=[(b-a).length for a,b in zip(ps,ps[1:])];total=sum(lengths)
def sample(t):
 for a,b,length in zip(ps,ps[1:],lengths):
  if t<=length:return a.lerp(b,t/length),(b-a).normalized()
  t-=length
 return ps[-1],(ps[-1]-ps[-2]).normalized()
row=0
while row*.60<total:
 center,tangent=sample(row*.60)
 if center.y>53.6:break
 side=Vector((tangent.y,-tangent.x));angle=math.atan2(-tangent.x,tangent.y)
 for col in [-1,0,1]:
  xy=center+side*(col*1.02);contact,normal=hit(terrain,*xy)
  o=bpy.data.objects.new('Atlas route stone',mesh);S.collection.objects.link(o)
  o.rotation_mode='QUATERNION';o.rotation_quaternion=Vector((0,0,1)).rotation_difference(normal)@Quaternion((0,0,1),angle)
  o.scale=(1.0,.67,.28);o.location=contact+normal*.075
  bpy.context.view_layer.update()
  # Extend the base into uneven banks while keeping the walking surface fixed.
  roots=[v.co for v in mesh.vertices if v.co.z<-.45]
  for _ in range(4):
   gaps=[(o.matrix_world@v).z-hit(terrain,(o.matrix_world@v).x,(o.matrix_world@v).y)[0].z for v in roots]
   if max(gaps)<=0:break
   extra=(max(gaps)+.015)/normal.z;o.scale.z+=extra;o.location-=normal*(extra/2);bpy.context.view_layer.update()
  o['pathSource']='temple-stair';o['pathRow']=row;o['pathColumn']=col
  baseGap=max((o.matrix_world@v).z-hit(terrain,(o.matrix_world@v).x,(o.matrix_world@v).y)[0].z for v in roots)
  assert baseGap<=0
  report['pathGrounding'].append({'name':o.name,'maxBaseGap':baseGap})
  report['path'].append({'name':o.name,'row':row,'column':col,'position':list(o.location)})
 row+=1
report['pathRowPitch']=.60;report['pathColumnPitch']=1.02;report['pathDimensions']=[1,.67,.28]
# Replace three poor shapes, retaining all other rock instances.
for name,source in [('Opening fractured moss boulder',1),('Atlas moss rock.294',2),('Atlas moss rock.017',3)]:
 o=bpy.data.objects[name];before=list(o.dimensions);oldtri=sum(len(p.vertices)-2 for p in o.data.polygons)
 replacement=bpy.data.objects['Atlas moss rock supplied '+str(source)]
 o.data=replacement.data;o.rotation_mode='XYZ';o.rotation_euler=(0,0,.65*source)
 o.scale=(1,1,1);bpy.context.view_layer.update()
 # Match the old overall scale, not its ugly elongated facets.
 factor=min(max(before[0],before[1])/max(o.dimensions.x,o.dimensions.y),before[2]/o.dimensions.z)
 o.scale=(factor,)*3;bpy.context.view_layer.update()
 points=[o.matrix_world@v.co for v in o.data.vertices];low=min(p.z for p in points)
 roots=[p for p in points if p.z<low+.12*o.dimensions.z]
 o.location.z-=max(p.z-hit(terrain,p.x,p.y)[0].z for p in roots)+.03
 o['replacementRock']='rock'+str(source)+'.glb'
 bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.0001)
 assert all(e.is_manifold for e in bm.edges);bm.free()
 report['rocks'].append({'name':name,'source':o['replacementRock'],'oldTriangles':oldtri,'newTriangles':sum(len(p.vertices)-2 for p in o.data.polygons),'closed':True})
# Free the complete second rune from the bank. All glow meshes translate together.
rune=bpy.data.objects['zon'];before=rune.location.copy();xy=Vector((11.4,42.5));contact,_=hit(terrain,*xy)
delta=Vector((xy.x-before.x,xy.y-before.y,1.46-before.z))
for o in S.objects:
 if o.name=='zon' or o.name.startswith('zon '):o.location+=delta
rune['atlasLandmark']='zon'
rune['atlasLandmarkPosition']=[route['landmarks']['zon'][0]+delta.x,route['landmarks']['zon'][1]+delta.z,route['landmarks']['zon'][2]-delta.y]
report['rune']={'from':list(before),'to':list(rune.location),'delta':list(delta),'target':list(rune['atlasLandmarkPosition']),
 'partsBefore':{o.name:[o.location.x-delta.x,o.location.z-delta.z,-o.location.y+delta.y] for o in S.objects if o.name=='zon' or o.name.startswith('zon ')}}
bpy.context.view_layer.update()
runePoints=[rune.matrix_world@v.co for v in rune.data.vertices];base=min(p.z for p in runePoints)
runeGaps=[p.z-hit(terrain,p.x,p.y)[0].z for p in runePoints if p.z<base+.005]
assert max(runeGaps)<=0
report['rune']['baseGapRange']=[min(runeGaps),max(runeGaps)]
# Remove the rejected jagged geometric horizon; panorama is one runtime texture.
bpy.data.objects.remove(bpy.data.objects['Atlas distant ridgeline'],do_unlink=True)
ground=surface(('Continuous forest terrain','Forest surrounding terrain','Atlas moss rock','Atlas moss cliff','Opening fractured moss boulder','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace'))
def distance(p):
 p=Vector(p[:2]);return min((p-a-(b-a)*max(0,min(1,(p-a).dot(b-a)/(b-a).length_squared))).length for a,b in zip(ps,ps[1:]))
def candidate(o,x,y,scale,angle):
 key=o['curatedSource'];p,normal=hit(ground,x,y)
 if p is None or normal.z<(.9 if key=='Pine1' else .8):return None
 if 11.5<x<26.5 and 56.5<y<68.5:return None
 if key!='Pine1' and distance((x,y))<2.6:return None
 q=(Quaternion() if key=='Pine1' else Vector((0,0,1)).rotation_difference(normal))@Quaternion((0,0,1),angle)
 h=max(v.co.z for v in o.data.vertices);roots=[v.co for v in o.data.vertices if (v.co.length<.25 if key=='Fern' else v.co.z<h*.015)]
 gaps=[]
 for v in roots:
  pt=p+q@(v*scale);contact,_=hit(ground,pt.x,pt.y)
  if contact is None:return None
  gaps.append(pt.z-contact.z)
 if max(gaps)-min(gaps)>(.24 if key=='Pine1' else .065):return None
 p.z-=max(gaps)+.008;depth=0
 for v in o.data.vertices:
  if key=='Pine1' and v.co.z*scale>1:continue
  pt=p+q@(v.co*scale);contact,_=hit(ground,pt.x,pt.y)
  if contact is None:return None
  depth=max(depth,contact.z-pt.z)
  if depth>(.27 if key=='Pine1' else .09):return None
 return p,q,min(gaps)-max(gaps)-.008,depth
def move(rec,o,result,scale):
 p,q,gap,depth=result;o.location=p;o.rotation_mode='QUATERNION';o.rotation_quaternion=q;o.scale=(scale,)*3;o['groundingVersion']=172
 rec.update(position=list(p),scale=scale,maxRootGap=-.008,minRootGap=gap,maxTerrainPenetration=depth)
# Occasional larger fronds, without changing source geometry/material.
ferns=[p for p in ledger['placements'] if p['source']=='Fern']
for rec in ferns[::9]:
 o=bpy.data.objects[rec['name']];scale=rec['scale']*1.3
 result=candidate(o,o.location.x,o.location.y,scale,o.rotation_quaternion.to_euler().z)
 if result:move(rec,o,result,scale);report['plants'].append({'name':o.name,'change':'larger fern'})
# Three selective midground groups. Twelve ferns and nine flowers, not a density multiplier.
centres=[(-1,24),(12.5,43),(7,50)]
for i in range(21):
 key='Fern' if i<12 else ['Flower1','Flower2','Flower3'][(i-12)%3]
 source=next(o for o in S.objects if o.get('curatedSource')==key);cx,cy=centres[i%3]
 scale=next(p['scale'] for p in ledger['placements'] if p['name']==source.name)*(rng.uniform(.9,1.15))
 for attempt in range(1200):
  x=cx+rng.uniform(-3,3);y=cy+rng.uniform(-3.5,3.5)
  if any(o.get('curatedSource')==key and (o.location.xy-Vector((x,y))).length<(.85 if key=='Fern' else .35) for o in S.objects):continue
  result=candidate(source,x,y,scale,rng.random()*math.tau)
  if result:
   o=source.copy();S.collection.objects.link(o);rec={'name':o.name,'source':key};move(rec,o,result,scale);ledger['placements'].append(rec)
   report['plants'].append({'name':o.name,'source':key,'change':'midground cluster'});break
 else:raise RuntimeError('No grounded cluster position: '+key)
bpy.context.view_layer.update()
# Revalidate and repair roots affected by the three changed rock surfaces.
report['regrounded']=[]
for rec in ledger['placements']:
 o=bpy.data.objects[rec['name']];h=max(v.co.z for v in o.data.vertices)
 roots=[v.co for v in o.data.vertices if (v.co.length<.25 if rec['source']=='Fern' else v.co.z<h*.015)]
 gaps=[(o.matrix_world@v).z-hit(ground,(o.matrix_world@v).x,(o.matrix_world@v).y)[0].z for v in roots]
 if max(gaps)>.0001 or min(gaps)<(-.25 if rec['source']=='Pine1' else -.085):
  result=candidate(o,o.location.x,o.location.y,rec['scale'],o.rotation_quaternion.to_euler().z)
  if result is None:
   for attempt in range(300):
    result=candidate(o,o.location.x+rng.uniform(-2,2),o.location.y+rng.uniform(-2,2),rec['scale'],rng.random()*math.tau)
    if result:break
  assert result is not None,o.name
  move(rec,o,result,rec['scale']);report['regrounded'].append(o.name)
bpy.context.view_layer.update()
for name,matrix in report['protected'].items():assert [list(r) for r in bpy.data.objects[name].matrix_world]==matrix
S['atlas_panorama_v172']=True
ledger['counts']={key:sum(p['source']==key for p in ledger['placements']) for key in ledger['counts']}
(D/'atlas-curated-ledger.json').write_text(json.dumps(ledger,indent=2));(D/'atlas-panorama-ledger.json').write_text(json.dumps(report,indent=2))
print('path',len(report['path']),'rocks',report['rocks'],'plants',len(report['plants']),'regrounded',report['regrounded'],'rune',report['rune'])
