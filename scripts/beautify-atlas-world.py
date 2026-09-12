"""Atlas B-reference art pass. Execute in the open Atlas checkpoint via Blender MCP.
No Real scene, gameplay transforms, renderer presets or source images are edited.
"""
import bpy, math, random, json, shutil, hashlib
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ROOT=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d')
S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
assert not S.get('atlas_art_v162'), 'Already applied; use the v161 backup to repeat'
backup=ROOT/'lvl0001-stylized-before-art-v162.blend'
if not backup.exists():shutil.copy2(bpy.data.filepath,backup)
route=json.loads((ROOT/'route.json').read_text());points=[Vector((p['position'][0],-p['position'][2])) for p in route['route']]
protected={o.name:[list(r) for r in o.matrix_world] for o in S.objects if o.name.startswith(('forestRune','zon','steen','Temple','temple','Guardian','Gate','fire_','Sven','Faceted'))}
ledger={'realSHA256':hashlib.sha256((ROOT/'real-3d.glb').read_bytes()).hexdigest(),'routeSHA256':hashlib.sha256((ROOT/'route.json').read_bytes()).hexdigest(),'grounded':[],'families':{},'addedFlowers':0}
mat=bpy.data.materials['Atlas painted nature']
greens=[(.065,.15,.025,1),(.10,.22,.034,1),(.18,.29,.055,1)]
class Shape:
 def __init__(self):self.v=[];self.f=[];self.c=[]
 def face(self,ps,c):
  i=len(self.v);self.v.extend([tuple(p) for p in ps]);self.f.append(tuple(range(i,i+len(ps))));self.c.append(c)
 def leaf(self,a,b,w,c):
  a,b=Vector(a),Vector(b);d=b-a;side=Vector((-d.y,d.x,0)).normalized()*w;mid=a+d*.48;ridge=mid+Vector((0,0,w*.23))
  for tri in [(a,mid-side,ridge),(a,ridge,mid+side),(ridge,mid-side,b),(mid+side,ridge,b)]:self.face(tri,c)
 def stem(self,a,b,w,c):
  a,b=Vector(a),Vector(b);side=Vector((w,0,0));self.face([a-side,a+side,b+side*.3,b-side*.3],c)
 def mesh(self,name):
  m=bpy.data.meshes.new(name);m.from_pydata(self.v,[],self.f);m.materials.append(mat);m.update();col=m.color_attributes.new(name='Color',type='BYTE_COLOR',domain='CORNER')
  for p,c in zip(m.polygons,self.c):
   for i in p.loop_indices:col.data[i].color=c
  return m
def fern(seed):
 r=random.Random(seed);sh=Shape()
 for j in range(6):
  a=j*math.tau/6+r.uniform(-.15,.15);d=Vector((math.cos(a),math.sin(a),0));side=Vector((-d.y,d.x,0));length=r.uniform(.64,.91);height=r.uniform(.43,.65)
  def spine(t):return d*(length*t**1.28)+Vector((0,0,math.sin(t*2.45)*height+.025))
  previous=spine(0)
  for k in range(1,8):
   t=k/9;p=spine(t);sh.stem(previous,p,.004,greens[1]);previous=p
   reach=math.sin(t*math.pi)**.65*(1-t*.45)*.23
   for sign in [-1,1]:
    sh.leaf(p,p+side*sign*reach+d*(.06+.045*t)+Vector((0,0,.022)),.028*(1-t*.65),greens[(j+k//3)%3])
  sh.leaf(previous,spine(1),.023,greens[2])
 return sh.mesh('Atlas feather fern '+str(seed))
ferns=[fern(311),fern(541)]
grasses=[];hostas=[];shrubs=[];flowers=[]
for variant in range(3):
 sh=Shape();r=random.Random(811+variant)
 for j in range(9):
  a=j*2.4;d=Vector((math.cos(a),math.sin(a),0));h=r.uniform(.12,.34);base=d*r.uniform(0,.065)
  sh.leaf(base,base+d*h*.85+Vector((0,0,h)),r.uniform(.012,.025),greens[j%3])
 grasses.append(sh.mesh('Atlas curved grass '+str(variant)))
 sh=Shape()
 for j in range(7):
  a=j*2.4;d=Vector((math.cos(a),math.sin(a),0));start=Vector((0,0,.035));end=d*(.25+(j%3)*.075)+Vector((0,0,.14+(j%3)*.08))
  sh.leaf(start,end,.075+(j%2)*.035,greens[j%3])
 hostas.append(sh.mesh('Atlas woodland rosette '+str(variant)))
 sh=Shape()
 for j in range(5):
  a=j*2.4;d=Vector((math.cos(a),math.sin(a),0));top=d*.32+Vector((0,0,.65+j%3*.18));sh.stem((0,0,0),top,.017,(.095,.052,.025,1))
  for k in range(4):
   p=top*(.36+k*.18);a2=a+k*2.4;branch=Vector((math.cos(a2),math.sin(a2),.4))*.22;tip=p+branch;sh.stem(p,tip,.005,(.10,.075,.035,1))
   for q in [p,tip]:
    for sign in [-1,1]:sh.leaf(q,q+Vector((math.cos(a2+sign*.7),math.sin(a2+sign*.7),.5))*.26,.095,greens[(j+k+variant)%3])
 shrubs.append(sh.mesh('Atlas rounded bilberry '+str(variant)))
 sh=Shape();petals=[(.72,.67,.47,1),(.46,.14,.34,1),(.64,.43,.55,1)]
 for j in range(3):
  a=j*2.4;p=Vector((math.cos(a)*.13,math.sin(a)*.13,.27+j*.075));sh.stem((p.x*.7,p.y*.7,0),p,.005,greens[1])
  sh.leaf((p.x*.7,p.y*.7,.10),(p.x+.12,p.y,.16),.034,greens[1])
  for k in range(5):
   a=k*math.tau/5;d=Vector((math.cos(a),math.sin(a),0));sh.leaf(p,p+d*.085+Vector((0,0,.017)),.036,petals[variant])
  sh.face([p+Vector((-.022,-.022,.014)),p+Vector((.025,-.015,.014)),p+Vector((0,.028,.014))],(.65,.36,.04,1))
 flowers.append(sh.mesh('Atlas woodland blossom '+str(variant)))
def bvh(objects):
 v=[];f=[]
 for o in objects:
  offset=len(v);v.extend(o.matrix_world@p.co for p in o.data.vertices);f.extend(tuple(offset+i for i in p.vertices) for p in o.data.polygons)
 return BVHTree.FromPolygons(v,f)
terrain=bvh([S.objects[n] for n in ['Continuous forest terrain','Forest surrounding terrain']])
def height(tree,x,y):
 p=tree.ray_cast(Vector((x,y,180)),Vector((0,0,-1)))[0];return p.z if p else None
def dist(x,y):
 p=Vector((x,y));return min((p-a-(b-a)*max(0,min(1,(p-a).dot(b-a)/(b-a).length_squared))).length for a,b in zip(points,points[1:]))
# Ground the actual terrain at the root/foot, not an unrelated terrain function.
# Rock feet are sampled over their footprint so sloped contact doesn't hover.
for o in S.objects:
 if o.type!='MESH' or not o.name.startswith(('Atlas moss rock','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace')):continue
 if dist(o.location.x,o.location.y)>18:continue
 bottom=min((o.matrix_world@Vector(p)).z for p in o.bound_box);h=height(terrain,o.location.x,o.location.y)
 if h is not None and bottom>h+.10:
  delta=h-bottom-.12;o.location.z+=delta;ledger['grounded'].append({'name':o.name,'dz':round(delta,4),'kind':'rock'})
bpy.context.view_layer.update()
support=bvh([o for o in S.objects if o.type=='MESH' and o.name.startswith(('Continuous forest terrain','Forest surrounding terrain','Atlas moss rock','Atlas moss cliff','Opening fractured moss boulder','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace'))])
for o in S.objects:
 name=o.name;r=random.Random(name+'art162');d=dist(o.location.x,o.location.y);family=None
 if name.startswith(('Atlas woodland fern','Fern drift')):family=ferns;size=r.uniform(.85,1.25)
 elif name.startswith('Grass'):family=grasses;size=r.uniform(.65,1.35)
 elif name.startswith(('Path bank community','Rich route understory')):family=hostas if r.random()<.32 else grasses;size=r.uniform(.65,1.25)
 elif name.startswith('Broad leaf community'):family=hostas;size=r.uniform(.8,1.45)
 elif name.startswith(('Library small broadleaf tree','Enclosure shrub','Rock terrace broadleaf shrub')):family=shrubs;size=r.uniform(.8,1.5) if d<7 else r.uniform(1.3,2.2)
 elif name.startswith('Detailed woodland flower'):family=flowers;size=r.uniform(.85,1.3)
 if family:
  o.data=family[r.randrange(len(family))];o.scale=(size,size,size);o.rotation_euler.x=0;o.rotation_euler.y=0
  ledger['families'][o.name.split('.')[0]]=ledger['families'].get(o.name.split('.')[0],0)+1
 if family or name.startswith('Broadleaf hazel sapling'):
  h=height(support,o.location.x,o.location.y)
  if h is not None:
   delta=h-.025-o.location.z
   if abs(delta)>.1:ledger['grounded'].append({'name':o.name,'dz':round(delta,4),'kind':'plant'})
   o.location.z=h-.025
# Soil/moss tint in exported vertex colours keeps the existing texture detail,
# source image files and GPU texture count; no new texture generation.
for name in ['Continuous forest terrain','Forest surrounding terrain']:
 o=S.objects[name];m=o.data;col=m.color_attributes.get('Color') or m.color_attributes.new(name='Color',type='BYTE_COLOR',domain='CORNER')
 for loop in m.loops:
  p=m.vertices[loop.vertex_index].co;patch=(math.sin(p.x*.39+math.sin(p.y*.21))*math.cos(p.y*.31)+1)*.5;near=dist(p.x,p.y)
  soil=(.24,.16,.085);moss=(.16,.24,.09);t=patch*(.45 if near<2.1 else 1)
  col.data[loop.index].color=tuple(soil[k]*(1-t)+moss[k]*t for k in range(3))+(1,)
 ground=o.data.materials[0];normal=next(n for n in ground.node_tree.nodes if n.type=='NORMAL_MAP');normal.inputs['Strength'].default_value=.45
# A few authored banks of flowers, separate from the walkable route and rune feet.
for ci,(x,y) in enumerate([(-2,10),(2.9,15),(1,23),(7.5,28),(5.5,37),(6,42),(8.2,48),(14.8,47)]):
 r=random.Random(401+ci)
 for j in range(8):
  px=x+r.uniform(-1.0,1.0);py=y+r.uniform(-1.1,1.1)
  if dist(px,py)<1.5:continue
  h=height(support,px,py)
  if h is None:continue
  o=bpy.data.objects.new('Detailed woodland flower art',flowers[0 if j%3 else 1+(ci%2)]);S.collection.objects.link(o);o.location=(px,py,h-.025);o.rotation_euler.z=r.random()*math.tau;size=r.uniform(.9,1.3);o.scale=(size,)*3;ledger['addedFlowers']+=1
# Low-poly panoramic mountain ring. Geometry is outside the gameplay corridor;
# softly varied blue-green facets read through existing fog, not a flat sky wall.
r=random.Random(672);sh=Shape();segments=44
for i in range(segments):
 a=i*math.tau/segments;b=(i+1)*math.tau/segments
 def point(angle,radius,z):return (math.cos(angle)*radius+8,math.sin(angle)*radius+30,z)
 peak=49+17*math.sin(a*3.0)+r.uniform(0,12);nextpeak=49+17*math.sin(b*3.0)+r.uniform(0,12)
 low=point(a,102,8);low2=point(b,102,8);top=point(a,127,peak);top2=point(b,127,nextpeak)
 sh.face([low,low2,top],(.13,.20,.21,1));sh.face([low2,top2,top],(.17,.24,.25,1));sh.face([top,top2,point((a+b)/2,157,12)],(.19,.25,.27,1))
o=bpy.data.objects.new('Atlas distant ridgeline',sh.mesh('Atlas panoramic ridge'));S.collection.objects.link(o)
# Two shared deliberately simple distant fir silhouettes, not scaled mature trees.
distant=[]
for variant in range(2):
 sh=Shape()
 for tier in range(5):
  z=tier*1.1;w=(5-tier)*.30
  for k in range(7):
   a=k*math.tau/7;b=(k+1)*math.tau/7;sh.face([(math.cos(a)*w,math.sin(a)*w,z),(math.cos(b)*w,math.sin(b)*w,z),(0,0,z+2.3)],(.065+variant*.025,.14+variant*.025,.10+variant*.03,1))
 distant.append(sh.mesh('Atlas distant fir mesh '+str(variant)))
for i in range(100):
 a=i*math.tau/100;r=random.Random(822+i);radius=r.uniform(54,90);x=8+math.cos(a)*radius;y=30+math.sin(a)*radius;h=height(terrain,x,y)
 if h is None:continue
 o=bpy.data.objects.new('Faceted distant fir',distant[i%2]);S.collection.objects.link(o);o.location=(x,y,h-.2);o.scale=(r.uniform(1,1.5),)*2+(r.uniform(1.4,2.6),)
assert all([list(r) for r in S.objects[name].matrix_world]==matrix for name,matrix in protected.items()),'Gameplay or trees moved'
assert hashlib.sha256((ROOT/'real-3d.glb').read_bytes()).hexdigest()==ledger['realSHA256']
ledger['fernTriangles']=[sum(len(p.vertices)-2 for p in m.polygons) for m in ferns];ledger['objectsAfter']=len(S.objects)
(ROOT/'atlas-art-ledger.json').write_text(json.dumps(ledger,indent=2));S['atlas_art_v162']=True
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'lvl0001-stylized.blend'))
print(json.dumps({k:v for k,v in ledger.items() if k!='grounded'}));print('Ground contact corrections',len(ledger['grounded']))
