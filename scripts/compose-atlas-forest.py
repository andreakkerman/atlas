"""Atlas-only authored cleanup. Run in Blender MCP against the stylized checkpoint.
Keeps a before checkpoint, a category ledger, and gameplay transforms for verification.
Does not export until the authored scene has been inspected.
"""
import bpy, bmesh, math, random, json, hashlib, shutil
from pathlib import Path
from mathutils import Vector
ROOT=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d')
SC=bpy.data.scenes['Atlas LVL-0001 First Person'];bpy.context.window.scene=SC
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
assert not SC.get('atlas_composition_v161'), 'Already applied: reopen the before checkpoint to repeat'
backup=ROOT/'lvl0001-stylized-before-composition.blend'
if not backup.exists():shutil.copy2(bpy.data.filepath,backup)
real_hash=hashlib.sha256((ROOT/'real-3d.glb').read_bytes()).hexdigest()
route=json.loads((ROOT/'route.json').read_text())
points=[Vector((p['position'][0],-p['position'][2])) for p in route['route']]
def nearest(o):
 p=Vector((o.location.x,o.location.y));best=1e9
 for a,b in zip(points,points[1:]):
  d=b-a;t=max(0,min(1,(p-a).dot(d)/d.length_squared));best=min(best,(p-a-d*t).length)
 return best
def category(o):return o.name.split('.')[0]
def counts():
 from collections import Counter
 return dict(Counter(category(o) for o in SC.objects))
protected={o.name:[list(row) for row in o.matrix_world] for o in SC.objects if not o.name.startswith(('Grass','Path bank community','Atlas woodland fern','Rich route understory','Broad leaf community','Fern drift','Detailed woodland flower','Enclosure shrub','Library small broadleaf tree'))}
ledger={'before':counts(),'realSHA256':real_hash,'routeSHA256':hashlib.sha256((ROOT/'route.json').read_bytes()).hexdigest(),'removed':[], 'nearRouteBefore':{},'nearRouteAfter':{}}
mat=bpy.data.materials['Atlas painted nature']
greens=[(.11,.19,.035,1),(.16,.24,.045,1),(.22,.29,.055,1)]
class Shape:
 def __init__(self):self.v=[];self.f=[];self.c=[]
 def face(self,points,c):
  i=len(self.v);self.v.extend(points);self.f.append(tuple(range(i,i+len(points))));self.c.append(c)
 def leaf(self,a,b,width,c,tilt=.6):
  a,b=Vector(a),Vector(b);d=b-a
  side=Vector((-d.y,d.x,0)).normalized()*width;side.z=width*tilt
  middle=a+d*.48;ridge=middle+Vector((0,0,width*.24))
  for tri in [(a,middle-side,ridge),(a,ridge,middle+side),(ridge,middle-side,b),(middle+side,ridge,b)]:self.face(tri,c)
 def tube(self,a,b,r,c):
  a,b=Vector(a),Vector(b);d=(b-a).normalized();u=d.cross(Vector((0,1,0))).normalized()*r;v=d.cross(u)
  for k in range(5):
   q=k*math.tau/5;t=(k+1)*math.tau/5
   e=u*math.cos(q)+v*math.sin(q);f=u*math.cos(t)+v*math.sin(t)
   self.face([a+e,a+f,b+f*.35,b+e*.35],c)
 def mesh(self,name):
  m=bpy.data.meshes.new(name);m.from_pydata(self.v,[],self.f);m.materials.append(mat);m.update()
  colors=m.color_attributes.new(name='Color',type='BYTE_COLOR',domain='CORNER')
  for p,c in zip(m.polygons,self.c):
   for i in p.loop_indices:colors.data[i].color=c
  return m
ferns=[]
for variant in range(2):
 sh=Shape()
 for j in range(6):
  a=j*math.tau/6+variant*.3;d=Vector((math.cos(a),math.sin(a),0));side=Vector((-d.y,d.x,0));length=.48+(j%3)*.065
  previous=Vector((0,0,.02))
  for k in range(1,7):
   t=k/7;p=d*length*t+Vector((0,0,math.sin(t*2.15)*.57))
   # A narrow rib shares the inclined frond plane; broad folded leaflets carry
   # the silhouette. No cylinders for these sub-pixel plant stems.
   sh.face([previous-side*.004,previous+side*.004,p+side*.003,p-side*.003],greens[0]);previous=p
   for sign in [-1,1]:sh.leaf(p,p+side*sign*(1-t)*.22+d*.08+Vector((0,0,.035)),.031*(1-t)+.008,greens[(j+variant)%3],sign*.8)
  sh.leaf(previous,d*length+Vector((0,0,.38)),.035,greens[1])
 ferns.append(sh.mesh('Atlas readable fern '+str(variant)))
shrubs=[]
for variant in range(2):
 sh=Shape();r=random.Random(700+variant)
 for j in range(5):
  a=j*2.4;d=Vector((math.cos(a),math.sin(a),0));top=d*.32+Vector((0,0,.85+j%3*.18))
  sh.tube((0,0,0),top,.025,(.16,.08,.03,1))
  for k in range(4):
   p=top*(.35+k*.17);angle=a+k*2.4;branch=Vector((math.cos(angle),math.sin(angle),.25))*.36
   end=p+branch;sh.tube(p,end,.01,(.16,.08,.03,1))
   for sign in [-1,1]:
    for t in [.45,.8,1]:
     q=p+branch*t;sh.leaf(q,q+Vector((math.cos(angle+sign),math.sin(angle+sign),.3))*.24,.085,greens[(j+k)%3],sign*.5)
 shrubs.append(sh.mesh('Atlas coherent shrub '+str(variant)))
low=('Grass','Path bank community','Atlas woodland fern','Rich route understory','Broad leaf community','Fern drift','Detailed woodland flower')
for o in list(SC.objects):
 if o.type!='MESH':continue
 d=nearest(o);cat=category(o)
 if o.name.startswith(low):
  if d<5:ledger['nearRouteBefore'][cat]=ledger['nearRouteBefore'].get(cat,0)+1
  # Authored alternating patches, with deliberately open sightlines at bends.
  patch=(math.sin(o.location.x*1.7+math.sin(o.location.y*.7))+math.cos(o.location.y*1.35))*.25+.5
  rng=random.Random(o.name);keep=.95
  if d<2:keep=.10 if cat!='Detailed woodland flower' else .34
  elif d<5:keep=.24+.30*max(0,min(1,patch))
  elif d<8:keep=.65+.25*max(0,min(1,patch))
  # Clear the front/right boulder and reveal its foot rather than hide it in a carpet.
  if (Vector((o.location.x-4.6,o.location.y-10))).length<3.1:keep*=.4
  if rng.random()>keep:ledger['removed'].append(o.name);bpy.data.objects.remove(o,do_unlink=True);continue
  if d<5:ledger['nearRouteAfter'][cat]=ledger['nearRouteAfter'].get(cat,0)+1
 if o.name.startswith(('Atlas woodland fern','Fern drift')):
  # Shared physically sized fronds; never squeeze a fern to a source atlas-card AABB.
  o.data=ferns[sum(map(ord,o.name))%2];s=min(.95,max(.55,o.scale.x*.46));o.scale=(s,s,s)
 if o.name.startswith('Library small broadleaf tree'):
  o.data=shrubs[sum(map(ord,o.name))%2];s=1.65 if d>5 else 1.1;o.scale=(s,s,s)
 if o.name.startswith('Enclosure shrub') and d<5:
  o.data=shrubs[0];o.scale=(.9,.9,.9)
# The scan-derived rock has disconnected vertices: weld before collapse, otherwise
# the decimator cannot remove the many isolated facets. Retain its authored transform.
o=SC.objects['Opening fractured moss boulder'];m=o.data.copy();o.data=m
bm=bmesh.new();bm.from_mesh(m);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.0002);bm.to_mesh(m);bm.free()
bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
mod=o.modifiers.new('Atlas broad rock planes','DECIMATE');mod.ratio=min(1,320/len(m.polygons));mod.use_collapse_triangulate=True;bpy.ops.object.modifier_apply(modifier=mod.name)
if len(o.data.polygons)>1000:
 # Welding alone leaves many disconnected scan shells. A small voxel union
 # closes those internal fractures while retaining the outer rock volume.
 mod=o.modifiers.new('Close scan fractures','REMESH');mod.mode='VOXEL';mod.voxel_size=.045;mod.use_smooth_shade=False
 bpy.ops.object.modifier_apply(modifier=mod.name)
 mod=o.modifiers.new('Broad rock silhouette','DECIMATE');mod.ratio=min(1,320/len(o.data.polygons));mod.use_collapse_triangulate=True;bpy.ops.object.modifier_apply(modifier=mod.name)
for o in SC.objects:
 if o.type!='MESH' or not o.name.startswith(('Opening fractured moss boulder','Atlas moss rock','Atlas moss cliff','Enclosure outcrop','Scanned woodland cliff shelf','Grounded scanned bank','Lower enclosure rock terrace')):continue
 m=o.data
 if m.get('coherent_moss'):continue
 m['coherent_moss']=True;m.update();colors=m.color_attributes.get('Color')
 if not colors:colors=m.color_attributes.new(name='Color',type='BYTE_COLOR',domain='CORNER')
 lo=min(v.co.z for v in m.vertices);hi=max(v.co.z for v in m.vertices);span=max(.001,hi-lo)
 for p in m.polygons:
  height=(p.center.z-lo)/span
  moss=p.normal.z>.25 and height>.42+.09*math.sin(p.center.x*3)+.06*math.cos(p.center.y*4)
  c=(.16,.235,.045,1) if moss else (.145,.155,.17,1)
  for i in p.loop_indices:colors.data[i].color=c
assert all(name in SC.objects and [list(row) for row in SC.objects[name].matrix_world]==matrix for name,matrix in protected.items()),'Gameplay/landmark transforms changed'
assert hashlib.sha256((ROOT/'real-3d.glb').read_bytes()).hexdigest()==real_hash
ledger['after']=counts();ledger['boulderFaces']=len(SC.objects['Opening fractured moss boulder'].data.polygons)
ledger['fernFaces']=[len(m.polygons) for m in ferns];ledger['shrubFaces']=[len(m.polygons) for m in shrubs]
(ROOT/'atlas-composition-ledger.json').write_text(json.dumps(ledger,indent=2))
SC['atlas_composition_v161']=True
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'lvl0001-stylized.blend'))
print(json.dumps({k:v for k,v in ledger.items() if k!='removed'}))
