"""B-reference finishing: hero fern/flower clusters and a faceted mountain skyline."""
import bpy,math,json,random
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d');S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend' and not S.get('atlas_dressing_v162')
ledger=json.loads((R/'atlas-art-ledger.json').read_text());glades=[(Vector(a),Vector(b)) for a,b in ledger['glades']]
terrain=S.objects['Continuous forest terrain'];ground=BVHTree.FromPolygons([v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons])
def h(x,y):
 hit=ground.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))[0];return hit.z if hit else 0
reframed=[]
for o in S.objects:
 if not o.name.startswith(('Atlas moss rock','Atlas moss cliff','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace')):continue
 if not o.name.startswith('Atlas moss rock'):
  p=Vector(o.location[:2])
  for a,b in glades:
   d=b-a;t=max(0,min(1,(p-a).dot(d)/d.length_squared));q=a+d*t;gap=(p-q).length
   if .15<t<.9 and gap<4:
    side=(p-q).normalized() if gap>.01 else Vector((0,1));p=q+side*(6+max(o.dimensions.x,o.dimensions.y)*.4);o.location.x,o.location.y=p.x,p.y;reframed.append(o.name);break
 # Sink the silhouette into the slope; a bbox corner touching ground is not
 # convincing contact for a wide irregular faceted rock.
 bottom=min((o.matrix_world@Vector(v)).z for v in o.bound_box);target=h(o.location.x,o.location.y)-min(1.2,o.dimensions.z*.23)
 if abs(o.location.x)<48 and -10<o.location.y<95:o.location.z+=target-bottom
for o in list(S.objects):
 if o.name=='Atlas distant ridgeline':bpy.data.objects.remove(o,do_unlink=True)
mat=bpy.data.materials['Atlas painted nature'];verts=[];faces=[];colors=[]
# Overlapping distinct peaks, not a discontinuous circular curtain.
for i,(x,y,w,z) in enumerate([(-85,-25,37,60),(-96,10,34,75),(-92,49,33,63),(-82,82,37,73),(-44,113,32,71),(3,133,34,84),(48,116,39,67),(88,72,35,72),(93,14,34,66),(61,-48,35,64),(8,-75,37,75),(-43,-65,34,63)]):
 r=random.Random(930+i);base=len(verts)
 for ring in [0,1]:
  for k in range(9):
   a=k*math.tau/9;radius=w*(1 if ring==0 else .49)*r.uniform(.83,1.15);verts.append((x+math.cos(a)*radius,y+math.sin(a)*radius,(-3 if ring==0 else z*.38+r.uniform(-5,5))))
 verts.append((x+w*.12,y-w*.11,z))
 for k in range(9):
  n=(k+1)%9;faces.extend([(base+k,base+n,base+9+k),(base+n,base+9+n,base+9+k),(base+9+k,base+9+n,base+18)])
  colors.extend([(.15,.22,.25,1),(.18,.25,.27,1),(.22,.29,.30,1)])
m=bpy.data.meshes.new('Atlas distant mountain peaks');m.from_pydata(verts,[],faces);m.materials.append(mat);m.update();c=m.color_attributes.new(name='Color',type='BYTE_COLOR',domain='CORNER')
for p,color in zip(m.polygons,colors):
 for i in p.loop_indices:c.data[i].color=color
o=bpy.data.objects.new('Atlas distant ridgeline',m);S.collection.objects.link(o)
bpy.context.view_layer.update();vs=[];fs=[]
for o in S.objects:
 if o.type!='MESH' or not o.name.startswith(('Continuous forest terrain','Forest surrounding terrain','Atlas moss rock','Atlas moss cliff','Opening fractured moss boulder','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace')):continue
 off=len(vs);vs.extend(o.matrix_world@v.co for v in o.data.vertices);fs.extend(tuple(off+i for i in p.vertices) for p in o.data.polygons)
support=BVHTree.FromPolygons(vs,fs)
def plant(o):
 hit=support.ray_cast(Vector((o.location.x,o.location.y,150)),Vector((0,0,-1)))[0]
 if hit is not None:o.location.z=hit.z-.025
for o in S.objects:
 if o.name.startswith(('Grass','Path bank community','Rich route understory','Broad leaf community','Atlas woodland fern','Fern drift','Detailed woodland flower','Enclosure shrub','Library small broadleaf tree','Rock terrace broadleaf shrub','Broadleaf hazel sapling')):plant(o)
centres=[(2.1,6.8),(-1.3,8.0),(2.8,27.7),(3.4,24.4),(7.1,38.4),(6.5,42.0),(9.4,48.1),(9.5,52.2)]
for i,(x,y) in enumerate(centres):
 r=random.Random(690+i)
 for j in range(3):
  o=bpy.data.objects.new('Atlas woodland fern art hero',bpy.data.meshes['Atlas feather fern '+str(311 if j%2 else 541)]);S.collection.objects.link(o);o.location=(x+r.uniform(-.45,.45),y+r.uniform(-.4,.4),0);o.rotation_euler.z=r.random()*math.tau;o.scale=(r.uniform(1.35,1.85),)*3;plant(o)
 for j in range(4):
  o=bpy.data.objects.new('Detailed woodland flower art hero',bpy.data.meshes['Atlas woodland blossom '+str(0 if j%3 else 2)]);S.collection.objects.link(o);o.location=(x+r.uniform(-.8,.8),y+r.uniform(-.7,.7),0);o.rotation_euler.z=r.random()*math.tau;o.scale=(r.uniform(1.0,1.4),)*3;plant(o)
ledger.update({'landformFraming':reframed,'heroFerns':24,'heroFlowers':32,'mountainPeaks':12,'mountainTriangles':len(faces),'finalObjects':len(S.objects)})
(R/'atlas-art-ledger.json').write_text(json.dumps(ledger,indent=2));S['atlas_dressing_v162']=True
bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'));print('Landforms framed',len(reframed),'Hero fern groups',24,'mountain triangles',len(faces))
