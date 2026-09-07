"""Final route-scale finish. Run in the existing authored Blender scene."""
import bpy, math, random
from mathutils import Vector
from mathutils.noise import noise_vector
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc
R=random.Random(12091)
# Replace scattered pavers on steep grades with connected, deep stone stair courses.
for o in list(sc.objects):
 if o.name.startswith('Connected route stair'):bpy.data.objects.remove(o,do_unlink=True)
for a,b in zip(ns['ROUTE'],ns['ROUTE'][1:]):
 p,q=Vector(a[3]),Vector(b[3]);delta=q-p;length=math.hypot(delta.x,delta.y)
 if delta.z/length<.16:continue
 side=Vector((delta.y,-delta.x,0)).normalized();forward=Vector((delta.x,delta.y,0)).normalized()
 for o in list(sc.objects):
  if not o.name.startswith('Route broad flagstone'):continue
  d=o.location-p;t=d.dot(forward)
  if -.12<t<length+.12 and abs(d.dot(side))<2.5:bpy.data.objects.remove(o,do_unlink=True)
 rows=math.ceil(delta.z/.19);run=length/rows
 for row in range(rows):
  t=(row+.5)/rows;center=p+delta*t;top=p.z+delta.z*(row+1)/rows-.07
  for col in range(5):
   pos=center+side*((col-2)*.84+R.uniform(-.025,.025));bottom=min(ns['ground'](pos.x,pos.y)-.3,top-.25)
   verts=[(x,y,z) for z in [bottom,top] for x,y in [(-.415,-run*.56),(.415,-run*.56),(.415,run*.56),(-.415,run*.56)]]
   faces=[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]
   o=ns['mesh']('Connected route stair',verts,faces,ns['ROCK']);o.location=(pos.x,pos.y,0);o.rotation_euler.z=math.atan2(side.y,side.x)
   bevel=o.modifiers.new('Worn stair lips','BEVEL');bevel.width=.045;bevel.segments=3;bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=bevel.name);ns['uv_world'](o,1.1)
# Closely layered ground cover, including small fern colonies between larger plants.
ferns=list({o.data for o in sc.objects if o.name.startswith('Fern drift')})
grasses=list({o.data for o in sc.objects if o.name.startswith('Grass') and o.type=='MESH'})
for o in list(sc.objects):
 if o.name.startswith('Rich route understory'):bpy.data.objects.remove(o,do_unlink=True)
for i in range(4400):
 x=R.uniform(-15,34);y=R.uniform(-7,72);near=ns['nearest_route'](x,y)
 distance=near[0]
 if distance<2.12 or distance>10 or (14<x<25 and 55<y<66):continue
 data=R.choice(ferns if R.random()<.60 else grasses)
 o=bpy.data.objects.new('Rich route understory',data);sc.collection.objects.link(o);o.location=(x,y,ns['ground'](x,y)-.02)
 scale=R.uniform(.9,2.3) if data in ferns else R.uniform(2.3,4.5)
 o.scale=(scale,scale,scale*R.uniform(.7,1.1));o.rotation_euler.z=R.random()*math.tau
print('Continuous stone stairs and layered route understory authored')

# Snap plant bases to the actual tessellated terrain, not its analytic precursor.
from mathutils.bvhtree import BVHTree
terrain=sc.objects['Continuous forest terrain']
bvh=BVHTree.FromPolygons([terrain.matrix_world@v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons])
for o in sc.objects:
 if not o.name.startswith(('Rich route understory','Fern drift','Grass','Atlas woodland fern','Detailed woodland flower','Paving edge tuft')):continue
 hit=bvh.ray_cast(Vector((o.location.x,o.location.y,50)),Vector((0,0,-1)),100)[0]
 if hit is not None:o.location.z=hit.z-.015
