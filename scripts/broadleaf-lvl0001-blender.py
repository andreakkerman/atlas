"""Broad-leaf periwinkle communities and trailing temple growth."""
import bpy,random,math
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc;R=random.Random(6101)
terrain=sc.objects['Continuous forest terrain'];bvh=BVHTree.FromPolygons([terrain.matrix_world@v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons])
variants=[]
for k in [3,4,5,6]:
 src=bpy.data.objects[f'periwinkle_plant_{k:02d}_LOD0'];data=src.data.copy();lo=Vector(tuple(min(v.co[i] for v in data.vertices) for i in range(3)));hi=Vector(tuple(max(v.co[i] for v in data.vertices) for i in range(3)))
 center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
 for v in data.vertices:v.co-=center
 variants.append(data)
for o in list(sc.objects):
 if o.name.startswith(('Broad leaf community','Trailing temple leaves','Temple vine')):bpy.data.objects.remove(o,do_unlink=True)
for i in range(3900):
 x=R.uniform(-9,29);y=R.uniform(-4,65);d,_=ns['nearest_route'](x,y)
 if d<2.2 or d>5.8 or (14<x<25 and 55<y<66):continue
 hit=bvh.ray_cast(Vector((x,y,50)),Vector((0,0,-1)),100)[0]
 if hit is None:continue
 o=bpy.data.objects.new('Broad leaf community',R.choice(variants));sc.collection.objects.link(o);o.location=hit;scale=R.uniform(1.3,2.5);o.scale=(scale,scale,scale);o.rotation_euler.z=R.random()*math.tau
for strand in range(27):
 x0=R.uniform(12.6,25.3);top=R.uniform(10.4,12.1);length=R.uniform(1.1,4.3)
 if abs(x0-19)<2.7:length=min(length,top-11)
 if length<.2:continue
 pts=[]
 for i in range(math.ceil(length/.13)):
  t=i*.13;x=x0+math.sin(t*2+strand)*.18;z=top-t;pts.append((x,58.22,z))
  o=bpy.data.objects.new('Trailing temple leaves',variants[-1]);sc.collection.objects.link(o);o.location=(x,58.10,z);scale=R.uniform(1,1.8);o.scale=(scale,scale,scale);o.rotation_euler=(math.pi/2,R.uniform(-.6,.6),R.uniform(-.7,.7))
 if len(pts)>1:ns['curve']('Temple vine',pts,.012,ns['BARK'])
print('Broad-leaf woodland and trailing temple growth authored')
