"""Dense path-bank plant communities placed against the final terrain mesh."""
import bpy,random,math
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];R=random.Random(5563)
terrain=sc.objects['Continuous forest terrain'];bvh=BVHTree.FromPolygons([terrain.matrix_world@v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons])
ferns=list({o.data for o in sc.objects if o.name.startswith('Fern drift')})
grasses=list({o.data for o in sc.objects if o.name.startswith('Grass') and o.type=='MESH'})
flowers=list({o.data for o in sc.objects if o.name.startswith('Detailed woodland flower')})
for o in list(sc.objects):
 if o.name.startswith('Path bank community'):bpy.data.objects.remove(o,do_unlink=True)
count=0
for i in range(19000):
 x=R.uniform(-9,29);y=R.uniform(-4,65);d,_=ns['nearest_route'](x,y)
 if d<2.08 or d>6.2 or (14<x<25 and 55<y<66):continue
 hit=bvh.ray_cast(Vector((x,y,50)),Vector((0,0,-1)),100)[0]
 if hit is None:continue
 f=R.random();data=R.choice(ferns if f<.5 else flowers if f>.94 and flowers else grasses)
 scale=R.uniform(.85,1.85) if data in ferns else R.uniform(1.7,3.4)
 o=bpy.data.objects.new('Path bank community',data);sc.collection.objects.link(o);o.location=hit;o.location.z-=.015;o.scale=(scale,scale,scale*R.uniform(.8,1.1));o.rotation_euler.z=R.random()*math.tau;count+=1
print('Dense bank community:',count,'plants')
