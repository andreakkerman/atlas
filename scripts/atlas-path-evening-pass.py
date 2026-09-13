"""v171: supplied path stones and restrained instance/palette adjustments."""
import bpy,bmesh,json,math,random,contextlib,io
from pathlib import Path
from mathutils import Vector,Quaternion
from mathutils.bvhtree import BVHTree
R=Path('D:/DevProjects/SvenAdventure');D=R/'Levels/LVL-0001/3d';S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend' and not S.get('atlas_path_v171')
rng=random.Random(171)
ledger=json.loads((D/'atlas-curated-ledger.json').read_text())
report={'pathSource':'rockpath3.glb','moved':[],'trees':[],'rocks':[],'protected':{o.name:[list(r) for r in o.matrix_world] for o in S.objects if o.name in ['forestRune','zon','steen','templeGate door'] or o.name.startswith('Temple stair')}}
def surface(prefix):
 vs=[];faces=[]
 for o in S.objects:
  if o.type!='MESH' or not o.name.startswith(prefix):continue
  start=len(vs);vs.extend(o.matrix_world@v.co for v in o.data.vertices);faces.extend(tuple(start+i for i in p.vertices) for p in o.data.polygons)
 return BVHTree.FromPolygons(vs,faces)
terrain=surface(('Continuous forest terrain','Forest surrounding terrain'))
def hit(bvh,x,y):return bvh.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))[:2]
# Import only the chosen set; never save the temporary comparison scene.
review=bpy.data.scenes.get('Path candidates review')
if review:
 for o in list(review.objects):bpy.data.objects.remove(o,do_unlink=True)
 bpy.data.scenes.remove(review)
before=set(bpy.data.objects)
with contextlib.redirect_stdout(io.StringIO()):bpy.ops.import_scene.gltf(filepath=str(R/'3dmodels/rockpath3.glb'))
source=next(o for o in set(bpy.data.objects)-before if o.type=='MESH')
source.data.transform(source.matrix_world);source.matrix_world.identity();source.parent=None
bm=bmesh.new();bm.from_mesh(source.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.00001);bm.to_mesh(source.data);bm.free()
mat=source.data.materials[0];mat.name='Atlas path palette'
bsdf=next(n for n in mat.node_tree.nodes if n.type=='BSDF_PRINCIPLED');bsdf.inputs['Metallic'].default_value=0;bsdf.inputs['Roughness'].default_value=.94
image=next(n.image for n in mat.node_tree.nodes if n.type=='TEX_IMAGE');image.scale(512,512);image.name='Atlas path palette 512';image.pack()
adj=[set() for v in source.data.vertices]
for e in source.data.edges:a,b=e.vertices;adj[a].add(b);adj[b].add(a)
groups=[];seen=set()
for v in source.data.vertices:
 if v.index in seen:continue
 todo=[v.index];group=set()
 while todo:
  x=todo.pop()
  if x in seen:continue
  seen.add(x);group.add(x);todo.extend(adj[x]-seen)
 groups.append(group)
assert len(groups)==18
variants=[]
for i,group in enumerate(groups):
 mesh=source.data.copy();mesh.name=f'Atlas rockpath3 stone {i+1:02}'
 bm=bmesh.new();bm.from_mesh(mesh);bm.verts.ensure_lookup_table();bmesh.ops.delete(bm,geom=[v for v in bm.verts if v.index not in group],context='VERTS');bm.to_mesh(mesh);bm.free()
 lo=Vector(tuple(min(v.co[k] for v in mesh.vertices) for k in range(3)));hi=Vector(tuple(max(v.co[k] for v in mesh.vertices) for k in range(3)))
 for v in mesh.vertices:v.co=Vector(((v.co.x-(lo.x+hi.x)/2)/(hi.x-lo.x),(v.co.y-(lo.y+hi.y)/2)/(hi.y-lo.y),(v.co.z-hi.z)/(hi.z-lo.z)))
 variants.append(mesh)
old=[o for o in S.objects if o.name.startswith(('Route broad flagstone','Path smaller infill stone'))]
report['oldPathCount']=len(old);report['oldPathTriangles']=sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in old)
report['path']=[]
for i,o in enumerate(old):
 lo=Vector(tuple(min(v.co[k] for v in o.data.vertices) for k in range(3)));hi=Vector(tuple(max(v.co[k] for v in o.data.vertices) for k in range(3)))
 n=bpy.data.objects.new('Atlas route stone',variants[i%18]);S.collection.objects.link(n)
 n.location=o.location;n.location.z+=hi.z*o.scale.z
 n.rotation_euler=o.rotation_euler;n.rotation_euler.z+=rng.uniform(-.13,.13)
 n.scale=((hi.x-lo.x)*o.scale.x*.95,(hi.y-lo.y)*o.scale.y*.95,(hi.z-lo.z)*o.scale.z)
 n['pathSource']='rockpath3.glb';bpy.context.view_layer.update()
 roots=[n.matrix_world@v.co for v in n.data.vertices if v.co.z<-.85]
 gaps=[p.z-hit(terrain,p.x,p.y)[0].z for p in roots]
 n.location.z-=max(0,max(gaps)+.02)
 report['path'].append({'name':n.name,'replaced':o.name,'position':list(n.location),'baseMaxGap':max(gaps)-max(0,max(gaps)+.02)})
 bpy.data.objects.remove(o,do_unlink=True)
bpy.data.objects.remove(source,do_unlink=True)
report['newPathTriangles']=sum(sum(len(p.vertices)-2 for p in bpy.data.objects[p['name']].data.polygons) for p in report['path'])
# Shared grass colours: retain two greens, remove the neon highlight.
grass=next(o.data for o in S.objects if o.get('curatedSource')=='grass2')
for d in grass.color_attributes['Color'].data:
 r,g,b,a=d.color;d.color=(r*.68+.025,g*.59,b*.70,a)
# A few exposed background boulders get a different existing orientation only.
foliage=[o for o in S.objects if o.get('curatedSource')]
for o in sorted([o for o in S.objects if o.type=='MESH' and o.name.startswith('Atlas moss rock.')],key=lambda o:o.dimensions.length,reverse=True):
 if len(report['rocks'])>=2:break
 radius=max(o.dimensions.x,o.dimensions.y)*.65
 if any((p.location.xy-o.location.xy).length<radius+1 for p in foliage):continue
 if o.location.y<25 or o.location.y>65:continue
 oldrot=list(o.rotation_euler);o.rotation_euler.z+=.46;bpy.context.view_layer.update()
 points=[o.matrix_world@v.co for v in o.data.vertices];low=min(p.z for p in points);height=max(p.z for p in points)-low
 roots=[p for p in points if p.z<low+height*.12];gaps=[p.z-hit(terrain,p.x,p.y)[0].z for p in roots]
 o.location.z-=max(gaps)+.025
 report['rocks'].append({'name':o.name,'oldRotation':oldrot,'rotation':list(o.rotation_euler)})
ground=surface(('Continuous forest terrain','Forest surrounding terrain','Atlas moss rock','Atlas moss cliff','Opening fractured moss boulder','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace'))
route=json.loads((D/'route.json').read_text());ps=[Vector((p['position'][0],-p['position'][2])) for p in route['route']]
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
 p,q,gap,depth=result;o.location=p;o.rotation_mode='QUATERNION';o.rotation_quaternion=q;o.scale=(scale,)*3;o['groundingVersion']=171
 rec.update(position=list(p),scale=scale,maxRootGap=-.008,minRootGap=gap,maxTerrainPenetration=depth)
# Rotate eight near-route pines; keep every trunk location and count intact.
for rec in sorted([p for p in ledger['placements'] if p['source']=='Pine1'],key=lambda p:distance(p['position']))[:8]:
 o=bpy.data.objects[rec['name']];old=list(o.rotation_quaternion);scale=rec['scale']
 for turn in [1.1,-.9,1.7,-1.4]:
  result=candidate(o,o.location.x,o.location.y,scale,o.rotation_quaternion.to_euler().z+turn)
  if result:
   move(rec,o,result,scale);report['trees'].append({'name':o.name,'oldRotation':old,'rotation':list(o.rotation_quaternion)});break
# Reallocate distant filler rather than increasing totals or drawing a carpet.
centres=[(-3.4,13),(6.4,22),(8.8,35),(8.1,48)]
for key,count in [('grass2',80),('Fern',10),('Flower1',2),('Flower2',2),('Flower3',2)]:
 records=sorted([p for p in ledger['placements'] if p['source']==key],key=lambda p:distance(p['position']),reverse=True)[:count]
 for i,rec in enumerate(records):
  o=bpy.data.objects[rec['name']];old=list(o.location);cx,cy=centres[i%len(centres)]
  for attempt in range(120):
   x=cx+rng.uniform(-1.8,1.8);y=cy+rng.uniform(-2.8,2.8)
   if key!='grass2' and any(p is not o and p.get('curatedSource')==key and (p.location.xy-Vector((x,y))).length<.8 for p in foliage):continue
   result=candidate(o,x,y,rec['scale'],rng.random()*math.tau)
   if result:
    move(rec,o,result,rec['scale']);report['moved'].append({'name':o.name,'source':key,'from':old,'to':list(o.location)});break
bpy.context.view_layer.update()
for name,matrix in report['protected'].items():assert [list(row) for row in bpy.data.objects[name].matrix_world]==matrix
S['atlas_path_v171']=True
(D/'atlas-curated-ledger.json').write_text(json.dumps(ledger,indent=2));(D/'atlas-path-evening-ledger.json').write_text(json.dumps(report,indent=2))
print({k:v for k,v in report.items() if k not in ['path','protected','moved']});print('relocated',len(report['moved']))
