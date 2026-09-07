"""Use a fractured library rock at the opening route's composition anchor."""
import bpy
from mathutils import Vector
from mathutils.bvhtree import BVHTree
sc=bpy.data.scenes['Atlas LVL-0001 First Person'];lib=bpy.data.scenes['Atlas source library'];bpy.context.window.scene=sc
source=bpy.data.objects['boulder_01'];data=source.data.copy();data.transform(source.matrix_world)
lo=Vector(tuple(min(v.co[i] for v in data.vertices) for i in range(3)));hi=Vector(tuple(max(v.co[i] for v in data.vertices) for i in range(3)))
for v in data.vertices:v.co-=Vector(((lo.x+hi.x)*.5,(lo.y+hi.y)*.5,lo.z))
for i,m in enumerate(data.materials):
 if m:data.materials[i]=m.copy();data.materials[i].name='Scanned woodland boulder'
old=sc.objects['Atlas moss cliff'];o=bpy.data.objects.new('Opening fractured moss boulder',data);sc.collection.objects.link(o)
o.scale=(4.18/(hi.x-lo.x),3.8/(hi.y-lo.y),3.703/(hi.z-lo.z));o.rotation_euler.z=-1.08
t=sc.objects['Continuous forest terrain'];bvh=BVHTree.FromPolygons([v.co for v in t.data.vertices],[p.vertices[:] for p in t.data.polygons]);hit=bvh.ray_cast(Vector((4.6,10,100)),Vector((0,0,-1)),200)[0]
o.location=(4.6,10,hit.z-.42);o['source']='https://polyhaven.com/a/boulder_01'
bpy.context.view_layer.update();points=[o.matrix_world@v.co for v in o.data.vertices];low=min(p.z for p in points);high=max(p.z for p in points);gaps=[]
for p in points[::8]:
 if p.z>low+(high-low)*.5:continue
 hit=bvh.ray_cast(Vector((p.x,p.y,100)),Vector((0,0,-1)),200)[0]
 if hit:gaps.append(p.z-hit.z)
gaps.sort();o.location.z-=max(0,gaps[int(len(gaps)*.8)]+.12)
lib.collection.objects.link(old)
for c in list(old.users_collection):
 if c!=lib.collection:c.objects.unlink(old)
print('Opening hero rock replaced; previous anchor retained in library')
