"""v173: source rockpath3 flagstones, staggered organic packing and matching steps.
Run in the current v172 Atlas authoring scene, never against Real 3D.
"""
import bpy, bmesh, json, math, random, hashlib
from pathlib import Path
from mathutils import Vector, Quaternion
from mathutils.bvhtree import BVHTree
R=Path('D:/DevProjects/SvenAdventure');D=R/'Levels/LVL-0001/3d';S=bpy.context.scene
assert S.get('atlas_panorama_v172') and not S.get('atlas_organic_path_v173')
rng=random.Random(173)
if not bpy.data.meshes.get('Atlas rockpath3 stone 01'):
 import contextlib,io
 before=set(bpy.data.objects)
 with contextlib.redirect_stdout(io.StringIO()):bpy.ops.import_scene.gltf(filepath=str(R/'3dmodels/rockpath3.glb'))
 imported=set(bpy.data.objects)-before;source=next(o for o in imported if o.type=='MESH')
 source.data.transform(source.matrix_world)
 bm=bmesh.new();bm.from_mesh(source.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.00001);bm.to_mesh(source.data);bm.free()
 mat=source.data.materials[0];mat.name='Atlas path palette'
 bsdf=next(n for n in mat.node_tree.nodes if n.type=='BSDF_PRINCIPLED');bsdf.inputs['Metallic'].default_value=0;bsdf.inputs['Roughness'].default_value=.94
 image=next(n.image for n in mat.node_tree.nodes if n.type=='TEX_IMAGE');image.scale(512,512);image.pack()
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
 for i,group in enumerate(groups):
  mesh=source.data.copy();mesh.name=f'Atlas rockpath3 stone {i+1:02}'
  bm=bmesh.new();bm.from_mesh(mesh);bm.verts.ensure_lookup_table();bmesh.ops.delete(bm,geom=[v for v in bm.verts if v.index not in group],context='VERTS');bm.to_mesh(mesh);bm.free()
  lo=Vector(tuple(min(v.co[k] for v in mesh.vertices) for k in range(3)));hi=Vector(tuple(max(v.co[k] for v in mesh.vertices) for k in range(3)))
  for v in mesh.vertices:v.co=Vector(((v.co.x-(lo.x+hi.x)/2)/(hi.x-lo.x),(v.co.y-(lo.y+hi.y)/2)/(hi.y-lo.y),(v.co.z-hi.z)/(hi.z-lo.z)))
 for o in imported:bpy.data.objects.remove(o,do_unlink=True)
variants=[bpy.data.meshes[f'Atlas rockpath3 stone {i:02}'] for i in [1,3,6,9,12,16]]
assert all(m.materials[0].name.startswith('Atlas path palette') for m in variants)
# These are the separated original source stones with their original UVs/facets.
# One shared opaque palette and six shared meshes, not per-stone copies.
report={'source':'3dmodels/rockpath3.glb','seed':173,'stones':[],'steps':[],
 'protected':{o.name:[list(r) for r in o.matrix_world] for o in S.objects if not o.name.startswith(('Atlas route stone','Temple stair','Irregular worn route stair courses'))}}
courses=bpy.data.objects['Irregular worn route stair courses']
cv=[courses.matrix_world@v.co for v in courses.data.vertices]
stairSurface=BVHTree.FromPolygons(cv,[tuple(p.vertices) for p in courses.data.polygons])
vs=[];faces=[]
for o in S.objects:
 if o.type=='MESH' and o.name.startswith(('Continuous forest terrain','Forest surrounding terrain')):
  n=len(vs);vs.extend(o.matrix_world@v.co for v in o.data.vertices);faces.extend(tuple(n+i for i in p.vertices) for p in o.data.polygons)
terrain=BVHTree.FromPolygons(vs,faces)
def hit(x,y):
 p,n,_,_=terrain.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))
 assert p is not None,(x,y)
 return p,n
old=[o for o in S.objects if o.name.startswith('Atlas route stone')]
report['beforeTriangles']=sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in old)
for o in old:bpy.data.objects.remove(o,do_unlink=True)
route=json.loads((D/'route.json').read_text())
ps=[Vector((p['position'][0],-p['position'][2])) for p in route['route']]
lengths=[(b-a).length for a,b in zip(ps,ps[1:])]
def sample(t):
 for a,b,l in zip(ps,ps[1:],lengths):
  if t<=l:return a.lerp(b,max(0,t)/l),(b-a).normalized()
  t-=l
 return ps[-1],(ps[-1]-ps[-2]).normalized()
def place(xy,w,d,angle,station):
 stair,_,_,_=stairSurface.ray_cast(Vector((xy.x,xy.y,150)),Vector((0,0,-1)))
 if stair is not None:return
 mesh=rng.choice(variants);o=bpy.data.objects.new('Atlas route stone',mesh);S.collection.objects.link(o)
 p,n=hit(*xy);q=Vector((0,0,1)).rotation_difference(n)@Quaternion((0,0,1),angle)
 o.rotation_mode='QUATERNION';o.rotation_quaternion=q;o.scale=(w,d,.24);o.location=p+n*rng.uniform(.065,.09)
 bpy.context.view_layer.update()
 roots=[v.co for v in mesh.vertices if v.co.z<-.82]
 # Deepen the underside only: source top is z=0, so top elevations stay put.
 for _ in range(4):
  gaps=[(o.matrix_world@v).z-hit((o.matrix_world@v).x,(o.matrix_world@v).y)[0].z for v in roots]
  if max(gaps)<=0:break
  o.scale.z+=(max(gaps)+.015)/(.82*n.z);bpy.context.view_layer.update()
 assert max(gaps)<=0
 o['pathSource']='rockpath3.glb';o['pathStation']=station;o['organicPathVersion']=173
 report['stones'].append({'name':o.name,'station':station,'position':list(o.location),'width':w,'depth':d,'angle':angle,'maxBaseGap':max(gaps),'mesh':mesh.name})
station=-.3
while station<sum(lengths):
 center,tangent=sample(station)
 if center.y>53.85:break
 side=Vector((tangent.y,-tangent.x));angle=math.atan2(-tangent.x,tangent.y)
 # Meandering edges stay inside the existing playable corridor. No route edits.
 center+=side*(.12*math.sin(station*.53)+.07*math.sin(station*1.31))
 width=3.05+.2*math.sin(station*.7)+max(0,center.y-51)*.35
 count=rng.choice([3,3,4]);weights=[rng.uniform(.75,1.25) for _ in range(count)]
 widths=[width*x/sum(weights) for x in weights];offset=-width/2
 for w in widths:
  xy=center+side*(offset+w/2)+tangent*rng.uniform(-.13,.13)
  place(xy,w+.36,rng.uniform(1.17,1.28),angle+rng.uniform(-.14,.14),station)
  offset+=w
 station+=rng.uniform(.66,.79)
# Retain step objects, positions, heights and the stair footprint; use source stone
# geometry for the tread/face instead of the former rectangular temple mesh.
for i,o in enumerate(sorted((o for o in S.objects if o.name.startswith('Temple stair')),key=lambda o:o.name)):
 oldtop=max((o.matrix_world@v.co).z for v in o.data.vertices)
 dims=o.dimensions.copy();pos=o.location.copy();o.data=variants[(i*7)%len(variants)]
 # The source stone has top z=0, bottom z=-1. Recenter mesh through a shared
 # centered variant so object/gameplay anchor transforms stay exactly unchanged.
 name=o.data.name+' centered'
 mesh=bpy.data.meshes.get(name)
 if mesh is None:
  mesh=o.data.copy();mesh.name=name
  for v in mesh.vertices:v.co.z+=.5
 o.data=mesh
 # Original steps were unit boxes; changing only source shape preserves top/base.
 o['pathSource']='rockpath3.glb';o['organicPathVersion']=173
 bpy.context.view_layer.update()
 assert abs(max((o.matrix_world@v.co).z for v in mesh.vertices)-oldtop)<.0001
 report['steps'].append({'name':o.name,'position':list(pos),'top':oldtop})
bm=bmesh.new();bm.from_mesh(courses.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.0001)
seen=set();report['courseStones']=[]
for v in bm.verts:
 if v in seen:continue
 todo=[v];points=[]
 while todo:
  p=todo.pop()
  if p in seen:continue
  seen.add(p);points.append(courses.matrix_world@p.co);todo.extend(e.other_vert(p) for e in p.link_edges)
 lo=Vector(tuple(min(p[k] for p in points) for k in range(3)));hi=Vector(tuple(max(p[k] for p in points) for k in range(3)))
 mesh=rng.choice(variants);o=bpy.data.objects.new('Atlas route stone stair',mesh);S.collection.objects.link(o)
 o.location=((lo.x+hi.x)/2,(lo.y+hi.y)/2,hi.z)
 o.scale=((hi.x-lo.x)*1.17,(hi.y-lo.y)*1.17,hi.z-lo.z)
 o.rotation_euler.z=rng.uniform(-.08,.08)
 o['pathSource']='rockpath3.glb';o['organicPathVersion']=173;o['pathCourse']=True
 report['courseStones'].append({'name':o.name,'position':list(o.location),'base':lo.z,'top':hi.z})
bm.free();bpy.data.objects.remove(courses,do_unlink=True)
for name,m in report['protected'].items():assert [list(r) for r in bpy.data.objects[name].matrix_world]==m,name
protected=report.pop('protected');report['protectedCount']=len(protected)
report['protectedTransformsSha256']=hashlib.sha256(json.dumps(protected,sort_keys=True).encode()).hexdigest()
report['triangles']=sum(sum(len(p.vertices)-2 for p in bpy.data.objects[r['name']].data.polygons) for r in report['stones'])
report['stoneCount']=len(report['stones']);report['stepCount']=len(report['steps'])
S['atlas_organic_path_v173']=True
(D/'atlas-organic-path-ledger.json').write_text(json.dumps(report,indent=2))
print({k:v for k,v in report.items() if k not in ['stones','steps','protected','courseStones']})
