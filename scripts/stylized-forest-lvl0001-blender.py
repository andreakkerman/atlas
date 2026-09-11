"""Continue the authored world with shared opaque, faceted nature meshes.
Run against the existing lvl0001.blend; save a separate editable checkpoint.
No renderer, route, challenge or temple reconstruction.
"""
import bpy, math, random, json, os, contextlib, io
from mathutils import Vector
SC=bpy.data.scenes['Atlas LVL-0001 First Person']
bpy.context.window.scene=SC
OUT='D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d'
if any(o.name.startswith('Faceted mature fir') for o in SC.objects):raise RuntimeError('Run the stylization pipeline against the original heavy checkpoint only')
before={'objects':len(SC.objects),'faces':sum(len(o.data.polygons) for o in SC.objects if o.type=='MESH')}
mat=bpy.data.materials.new('Atlas painted nature');mat.use_nodes=True
bs=mat.node_tree.nodes.get('Principled BSDF');bs.inputs['Roughness'].default_value=.92
col=mat.node_tree.nodes.new('ShaderNodeVertexColor');col.layer_name='Color'
mat.node_tree.links.new(col.outputs['Color'],bs.inputs['Base Color'])
greens=[(.11,.19,.035,1),(.16,.24,.045,1),(.22,.29,.055,1),(.08,.145,.03,1)]
barks=[(.15,.077,.036,1),(.21,.105,.05,1),(.12,.06,.032,1)]

def mesh(name,v,f,colors):
 m=bpy.data.meshes.new(name);m.from_pydata(v,[],f);m.materials.append(mat);m.update()
 c=m.color_attributes.new(name='Color',type='BYTE_COLOR',domain='CORNER')
 for p,color in zip(m.polygons,colors):
  p.use_smooth=False
  for i in p.loop_indices:c.data[i].color=color
 return m

class Shape:
 def __init__(self):self.v=[];self.f=[];self.c=[]
 def poly(self,points,color):
  i=len(self.v);self.v.extend(points);self.f.append(tuple(range(i,i+len(points))));self.c.append(color)
 def leaf(self,start,end,width,color):
  a,b=Vector(start),Vector(end);d=b-a;side=Vector((-d.y,d.x,0)).normalized()*width
  middle=a+d*.5;ridge=middle+Vector((0,0,width*.24))
  self.poly([a,middle-side,ridge],color);self.poly([a,ridge,middle+side],color)
  self.poly([ridge,middle-side,b],color);self.poly([middle+side,ridge,b],color)
 def data(self,name):return mesh(name,self.v,self.f,self.c)

def conifer(seed,young=False):
 r=random.Random(seed);s=Shape();h=5 if young else 18;rad=1.6 if young else 4.3
 # Broad trunk facets and a flared foot, rather than needle-atlas geometry.
 levels=[(0,.76),(.6,.54),(h*.4,.34),(h*.75,.18),(h,.025)]
 if young:levels=[(z,rr*.28) for z,rr in levels]
 sides=9
 for j in range(len(levels)-1):
  z0,r0=levels[j];z1,r1=levels[j+1]
  for k in range(sides):
   a=k*math.tau/sides;b=(k+1)*math.tau/sides
   s.poly([(math.cos(a)*r0,math.sin(a)*r0,z0),(math.cos(b)*r0,math.sin(b)*r0,z0),(math.cos(b)*r1,math.sin(b)*r1,z1),(math.cos(a)*r1,math.sin(a)*r1,z1)],barks[k%3])
 tiers=8 if young else 11;bottom=.12 if young else .28
 for tier in range(tiers):
  t=tier/(tiers-1);z=h*(bottom+(1-bottom)*t*.93);reach=rad*(1-t*.86)*r.uniform(.92,1.07)
  # Closed irregular cores keep the crown full without transparent overdraw.
  top=Vector((0,0,min(h,z+h*.17)));ring=[]
  for k in range(12):
   a=k*math.tau/12+tier*2.4;rr=reach*(.40 if k%2 else .65)
   ring.append(Vector((math.cos(a)*rr,math.sin(a)*rr,z-r.uniform(0,h*.035))))
  for k in range(12):
   color=greens[(k+tier+seed)%len(greens)]
   s.poly([top,ring[k],ring[(k+1)%12]],color)
   s.poly([(0,0,z-.08),ring[(k+1)%12],ring[k]],greens[3])
  # Pointed folded fans give each tier a branching silhouette, not round cones.
  for k in range(7):
   a=k*math.tau/7+tier*2.4;d=Vector((math.cos(a),math.sin(a),0));side=Vector((-d.y,d.x,0))
   for sign in [-1,1]:
    start=d*reach*.25+Vector((0,0,z+h*.035))
    end=d*reach*1.13+side*sign*reach*.21+Vector((0,0,z-h*.025))
    s.leaf(start,end,reach*.34,greens[(k+tier)%4])
 return s.data(('Juvenile' if young else 'Mature')+' faceted conifer '+str(seed))

mature=[conifer(i) for i in range(4)];young=[conifer(30+i,True) for i in range(3)]
anchors=[]
for o in list(SC.objects):
 if o.type!='MESH':continue
 if (o.name.startswith('Layered forest conifer') and o.data.name.startswith('Mature conifer wood')) or o.name.startswith('Solid scanned fir trunk'):
  anchors.append((o.location.copy(),o.rotation_euler.z,o.dimensions.z,False))
 elif (o.name.startswith('Juvenile forest fir') and 'stem' in o.data.name) or o.name.startswith('Library young forest fir'):
  anchors.append((o.location.copy(),o.rotation_euler.z,o.dimensions.z,True))
 if o.name.startswith(('Layered forest conifer','Conifer crown infill','Scanned mature route fir','Solid scanned fir trunk','Lower natural fir boughs','Juvenile forest fir','Library young forest fir')):
  bpy.data.objects.remove(o,do_unlink=True)
for i,(pos,angle,height,isyoung) in enumerate(anchors):
 data=(young if isyoung else mature)[i%(3 if isyoung else 4)]
 o=bpy.data.objects.new('Faceted young fir' if isyoung else 'Faceted mature fir',data);SC.collection.objects.link(o)
 o.location=pos;o.rotation_euler.z=angle;scale=height/(5 if isyoung else 18);o.scale=(scale,scale,scale)

def plant(seed,kind):
 r=random.Random(seed);s=Shape()
 if kind in ('tree','flower'):
  count=9 if kind=='tree' else 5
  for j in range(count):
   a=j*2.4;d=Vector((math.cos(a),math.sin(a),0));end=d*r.uniform(.15,.45)+Vector((0,0,r.uniform(.45,1)))
   side=Vector((-d.y,d.x,0))*(.015 if kind=='tree' else .006)
   s.poly([-side,side,end+side,end-side],barks[1] if kind=='tree' else greens[0])
   for k in range(3):
    center=end*(.45+k*.18)
    for sign in [-1,1]:s.leaf(center,center+Vector((side.x*sign*10,side.y*sign*10,.05)),.065 if kind=='tree' else .025,greens[(j+k)%4])
   if kind=='flower':
    color=[(.55,.19,.32,1),(.65,.55,.35,1),(.38,.15,.43,1)][seed%3]
    for k in range(5):
     a=k*math.tau/5;petal=Vector((math.cos(a)*.055,math.sin(a)*.055,.015));s.leaf(end,end+petal,.025,color)
 elif kind=='grass':
  for i in range(9):
   a=i*2.4;d=Vector((math.cos(a),math.sin(a),0));s.leaf((0,0,0),d*r.uniform(.2,.5)+Vector((0,0,r.uniform(.4,1))),.035,greens[i%4])
 elif kind=='fern':
  for j in range(7):
   a=j*math.tau/7;d=Vector((math.cos(a),math.sin(a),0));side=Vector((-d.y,d.x,0))
   for k in range(1,8):
    t=k/8;p=d*t*.55+Vector((0,0,math.sin(t*math.pi*.8)*.55));length=(1-t)*.25
    for sign in [-1,1]:s.leaf(p,p+side*sign*length+d*.10,.025*(1-t)+.012,greens[(j+k)%3])
 else:
  for j in range(9):
   a=j*2.4;d=Vector((math.cos(a),math.sin(a),0));start=d*.1+Vector((0,0,j%3*.2));end=d*r.uniform(.3,.55)+Vector((0,0,.3+j%3*.22))
   s.leaf(start,end,.14,greens[j%4])
 return s

# Preserve existing placements and footprints; reduce geometry and texture load.
plant_cache={}
for o in list(SC.objects):
 if o.type!='MESH':continue
 name=o.name
 kind=('tree' if name.startswith('Library small broadleaf tree') else 'flower' if name.startswith('Detailed woodland flower') else 'grass' if name.startswith(('Grass','Paving edge tuft')) else 'fern' if name.startswith(('Atlas woodland fern','Fern drift')) else 'broad' if name.startswith(('Path bank community','Broad leaf community','Rich route understory','Enclosure shrub','Trailing temple leaves','Temple wall growth','Rock terrace broadleaf shrub','Sorrel in paving joint')) else None)
 if not kind:continue
 key=(o.data.name,kind)
 if key not in plant_cache:
  old=o.data;mins=[min(v.co[k] for v in old.vertices) for k in range(3)];maxs=[max(v.co[k] for v in old.vertices) for k in range(3)]
  sh=plant(len(plant_cache)+10,kind)
  low=[min(v[k] for v in sh.v) for k in range(3)];high=[max(v[k] for v in sh.v) for k in range(3)]
  sh.v=[tuple(mins[k]+(v[k]-low[k])/max(.001,high[k]-low[k])*(maxs[k]-mins[k]) for k in range(3)) for v in sh.v]
  plant_cache[key]=sh.data('Faceted '+kind+' '+str(len(plant_cache)))
 o.data=plant_cache[key]

# Retain authored fractured contours and ground contact; remove scan microdetail.
rock_cache={}
for o in list(SC.objects):
 if o.type!='MESH':continue
 if o.name.startswith('Raised moss mantle'):
  bpy.data.objects.remove(o,do_unlink=True);continue
 if not o.name.startswith(('Atlas moss rock','Atlas moss cliff','Enclosure outcrop','Scanned woodland cliff shelf','Grounded scanned bank','Lower enclosure rock terrace','Opening fractured moss boulder','Route broad flagstone','Path smaller infill stone')):continue
 key=o.data.name
 if key not in rock_cache:
  o.data=o.data.copy();bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
  target=1200 if 'cliff' in o.name.lower() or 'terrace' in o.name.lower() else 180 if 'boulder' in o.name.lower() else 80
  mod=o.modifiers.new('Broad faceted contour','DECIMATE');mod.ratio=min(1,target/max(1,len(o.data.polygons)));mod.use_collapse_triangulate=True
  bpy.ops.object.modifier_apply(modifier=mod.name)
  m=o.data;m.materials.clear();m.materials.append(mat)
  for attr in list(m.color_attributes):m.color_attributes.remove(attr)
  colors=m.color_attributes.new(name='Color',type='BYTE_COLOR',domain='CORNER');r=random.Random(47)
  for p in m.polygons:
   p.use_smooth=False;p.material_index=0
   moss=p.normal.z>.35 and r.random()<.7 and not o.name.startswith(('Route','Path'))
   color=greens[r.randrange(3)] if moss else (.12+r.random()*.04,.135+r.random()*.04,.15+r.random()*.04,1)
   for li in p.loop_indices:colors.data[li].color=color
  rock_cache[key]=m
 else:o.data=rock_cache[key]

after={'objects':len(SC.objects),'faces':sum(len(o.data.polygons) for o in SC.objects if o.type=='MESH'),'treePlacements':len(anchors)}
bpy.ops.wm.save_as_mainfile(filepath=OUT+'/lvl0001-stylized.blend')
with contextlib.redirect_stdout(io.StringIO()):
 bpy.ops.export_scene.gltf(filepath=OUT+'/atlas-3d.glb',export_format='GLB',use_active_scene=True,export_yup=True,export_apply=True,export_gpu_instances=True,export_lights=False,export_cameras=False,export_image_format='WEBP',export_image_quality=88,export_extras=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6,export_draco_position_quantization=18,export_draco_normal_quantization=12,export_draco_texcoord_quantization=16,export_draco_color_quantization=10)
after['glbBytes']=os.path.getsize(OUT+'/atlas-3d.glb')
with open(OUT+'/stylized-budget.json','w') as f:json.dump({'before':before,'after':after},f,indent=2)
print(json.dumps({'before':before,'after':after}))
