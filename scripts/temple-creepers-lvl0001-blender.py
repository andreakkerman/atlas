"""Ground wall creepers on the actual masonry surfaces and roof edges."""
import bpy,math,random
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc;R=random.Random(1392)
verts=[];faces=[]
for o in sc.objects:
 if o.type=='MESH' and ('masonry' in o.name.lower() or o.name=='Temple roof'):
  offset=len(verts);verts.extend(o.matrix_world@v.co for v in o.data.vertices);faces.extend(tuple(offset+i for i in p.vertices) for p in o.data.polygons)
bvh=BVHTree.FromPolygons(verts,faces);lv=[];lf=[];uv=[]
for strand in range(55):
 side=strand<24;s=R.uniform(59,65) if side else R.choice([R.uniform(12.6,16.1),R.uniform(22,25.2)])
 top=R.uniform(11.6,12.25);length=R.uniform(1.3,5.5);pts=[]
 for j in range(int(length/.13)):
  z=top-j*.13;walk=s+math.sin(j*.32+strand)*.18
  origin=Vector((10,walk,z)) if side else Vector((walk,56,z));direction=Vector((1,0,0)) if side else Vector((0,1,0))
  hit,normal,_,_=bvh.ray_cast(origin,direction,20)
  if hit is None:continue
  pos=hit+normal*.035;pts.append(tuple(pos))
  horizontal=Vector((0,1,0)) if side else Vector((1,0,0))
  for k in range(3):
   base=pos+horizontal*R.uniform(-.14,.14);along=(horizontal*R.choice([-1,1])*.7+Vector((0,0,-.7))).normalized()*R.uniform(.18,.32);across=normal.cross(along).normalized()*along.length*.46
   mid=base+along*.52+normal*.045;tip=base+along;idx=len(lv)
   lv.extend([tuple(base-across*.1),tuple(base+across*.1),tuple(mid-across),tuple(mid+across),tuple(tip-across*.05),tuple(tip+across*.05)]);lf.extend([(idx,idx+1,idx+3,idx+2),(idx+2,idx+3,idx+5,idx+4)]);uv.extend([(.42,.63),(.72,.63),(.42,.805),(.72,.805),(.42,.98),(.72,.98)])
 if len(pts)>1:ns['curve']('Masonry rooted creeper',pts,.009,ns['BARK'])
o=ns['mesh']('Masonry creeper leaves',lv,lf,bpy.data.materials['Hazel broad leaves'],True);layer=o.data.uv_layers.new(name='UVMap')
for p in o.data.polygons:
 for li in p.loop_indices:layer.data[li].uv=uv[o.data.loops[li].vertex_index]
print('Wall creeper leaves:',len(lv)//6)
