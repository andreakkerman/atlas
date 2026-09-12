"""Third visual review: keep glade centres clear and repair exposed root collars."""
import bpy,json,math,random
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d');S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend' and S.get('atlas_glades_v162') and not S.get('atlas_framing_v162')
ledger=json.loads((R/'atlas-art-ledger.json').read_text());glades=[(Vector(a),Vector(b)) for a,b in ledger['glades']]
o=S.objects['Continuous forest terrain'];b=BVHTree.FromPolygons([v.co for v in o.data.vertices],[p.vertices[:] for p in o.data.polygons])
def height(p):
 hit=b.ray_cast(Vector((p.x,p.y,150)),Vector((0,0,-1)))[0];return hit.z if hit else None
def segment(p,a,b):
 d=b-a;t=max(0,min(1,(p-a).dot(d)/d.length_squared));q=a+d*t;return (p-q).length,t,q
reframed=[]
for o in S.objects:
 if not o.name.startswith(('Faceted mature fir','Faceted young fir','Atlas moss rock')):continue
 p=Vector(o.location[:2]);isrock=o.name.startswith('Atlas moss rock')
 for a,b2 in glades:
  d,t,q=segment(p,a,b2);width=(4.3 if isrock else 5.5)+t*2
  if .14<t<.93 and d<width:
   side=(p-q).normalized() if d>.01 else Vector((0,1));p=q+side*(width+.3)
   o.location.x,o.location.y=p.x,p.y;reframed.append(o.name);break
 z=height(p)
 if z is not None:
  if isrock:
   bottom=min((o.matrix_world@Vector(c)).z for c in o.bound_box)
   o.location.z+=z-bottom-.12
  else:o.location.z=z-.055
# Previously merged root surfaces cannot follow individually reframed trees.
# Replace them with shared simple planted collars; remove exposed old soil discs.
removed=[]
for o in list(S.objects):
 if o.name.startswith(('Atlas static root cluster','Root plate soil community')):removed.append(o.name);bpy.data.objects.remove(o,do_unlink=True)
mat=bpy.data.materials['Atlas painted nature'];v=[];f=[]
for k in range(8):
 a=k*math.tau/8;d=Vector((math.cos(a),math.sin(a),0));side=Vector((-d.y,d.x,0))*.11;i=len(v)
 v.extend([tuple(d*.32+Vector((0,0,.65))),tuple(d*.4+side),tuple(d*1.0),tuple(d*.4-side)])
 f.extend([(i,i+1,i+2),(i,i+2,i+3),(i+1,i+3,i+2)])
m=bpy.data.meshes.new('Atlas planted root buttresses');m.from_pydata(v,[],f);m.materials.append(mat);m.update();c=m.color_attributes.new(name='Color',type='BYTE_COLOR',domain='CORNER')
for p in m.polygons:
 for i in p.loop_indices:c.data[i].color=(.15,.09,.043,1)
for tree in [o for o in S.objects if o.name.startswith('Faceted mature fir')]:
 o=bpy.data.objects.new('Faceted planted root collar',m);S.collection.objects.link(o);o.location=tree.location.copy();o.rotation_euler.z=tree.rotation_euler.z;size=max(.6,min(1.4,tree.scale.x));o.scale=(size,)*3
# Anchor plants after moving their supporting rocks. Keep whole plant root on the
# actual surface; do not project decorative canopy/temple objects onto terrain.
bpy.context.view_layer.update();vs=[];fs=[]
for o in S.objects:
 if o.type!='MESH' or not o.name.startswith(('Continuous forest terrain','Forest surrounding terrain','Atlas moss rock','Atlas moss cliff','Opening fractured moss boulder','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace')):continue
 off=len(vs);vs.extend(o.matrix_world@v.co for v in o.data.vertices);fs.extend(tuple(off+i for i in p.vertices) for p in o.data.polygons)
support=BVHTree.FromPolygons(vs,fs)
for o in S.objects:
 if not o.name.startswith(('Grass','Path bank community','Rich route understory','Broad leaf community','Atlas woodland fern','Fern drift','Detailed woodland flower','Enclosure shrub','Library small broadleaf tree','Rock terrace broadleaf shrub','Broadleaf hazel sapling')):continue
 hit=support.ray_cast(Vector((o.location.x,o.location.y,150)),Vector((0,0,-1)))[0]
 if hit is not None:o.location.z=hit.z-.025
ledger['finalFramingMoved']=reframed;ledger['removedDetachedRootSurfaces']=removed;ledger['newSharedRootCollars']=175
(R/'atlas-art-ledger.json').write_text(json.dumps(ledger,indent=2));S['atlas_framing_v162']=True
bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'));print('Framing adjustments',len(reframed),'Replaced root surfaces',len(removed))
