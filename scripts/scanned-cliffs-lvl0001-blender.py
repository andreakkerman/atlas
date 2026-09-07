"""Replace stretched cliff proxies with CC0 scanned shelves; retain originals."""
import bpy,math
from mathutils import Vector
from mathutils.bvhtree import BVHTree
sc=bpy.data.scenes['Atlas LVL-0001 First Person'];lib=bpy.data.scenes['Atlas source library']
bpy.context.window.scene=lib
source=bpy.data.objects['coastal_cliff_04'];master=source.copy();master.data=source.data.copy();lib.collection.objects.link(master)
master.name='Atlas scanned cliff shelf master';bpy.context.view_layer.objects.active=master
mod=master.modifiers.new('Shelf silhouette LOD','DECIMATE');mod.ratio=.06;bpy.ops.object.modifier_apply(modifier=mod.name)
master.data.transform(master.matrix_world);master.matrix_world.identity()
lo=Vector(tuple(min(v.co[i] for v in master.data.vertices) for i in range(3)));hi=Vector(tuple(max(v.co[i] for v in master.data.vertices) for i in range(3)))
for v in master.data.vertices:v.co-=Vector(((lo.x+hi.x)*.5,(lo.y+hi.y)*.5,lo.z))
for m in master.data.materials:
 if m:m.name='Scanned woodland cliff shelf'
terrain=sc.objects['Continuous forest terrain'];bvh=BVHTree.FromPolygons([v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons])
for name in ['Atlas moss cliff.007','Atlas moss cliff.008']+[o.name for o in sc.objects if o.name.startswith('Stratified forest outcrop')]:
 o=sc.objects.get(name)
 if o:
  if o.name not in lib.objects:lib.collection.objects.link(o)
  for c in list(o.users_collection):
   if c!=lib.collection:c.objects.unlink(o)
for x,y,s,sz,a in [(-2,-14,.24,.38,math.pi),(-12,17,.19,.4,math.pi/2),(27,51,.16,.42,-math.pi/2),(29,61,.19,.42,-math.pi/2),(11,-12,.15,.32,2.7)]:
 o=bpy.data.objects.new('Scanned woodland cliff shelf',master.data.copy());sc.collection.objects.link(o)
 hit=bvh.ray_cast(Vector((x,y,100)),Vector((0,0,-1)),200)[0];base=(hit.z if hit else 0)-.8
 for v in o.data.vertices:
  px,py,pz=v.co;wx=x+s*(px*math.cos(a)-py*math.sin(a));wy=y+s*(px*math.sin(a)+py*math.cos(a))
  v.co=(wx,wy,base+pz*sz)
 o['source']='https://polyhaven.com/a/coastal_cliff_04'
 a=o.data.attributes.get('custom_normal')
 if a:o.data.attributes.remove(a)
 for p in o.data.polygons:p.use_smooth=True
# Seat remaining individual stones using the broad underside, not just the lowest tip.
count=0
for o in sc.objects:
 if not o.name.startswith(('Atlas moss rock','Enclosure outcrop')) or o.get('broad_contact'):continue
 o['broad_contact']=True;o['before_broad_contact_z']=o.location.z
 points=[o.matrix_world@v.co for v in o.data.vertices];low=min(p.z for p in points);high=max(p.z for p in points);gaps=[]
 for p in points[::13]:
  if p.z>low+(high-low)*.5:continue
  hit=bvh.ray_cast(Vector((p.x,p.y,100)),Vector((0,0,-1)),200)[0]
  if hit:gaps.append(p.z-hit.z)
 if gaps:
  gaps.sort();sink=max(0,gaps[int((len(gaps)-1)*.9)]+.12)
  if sink>.02:o.location.z-=sink;count+=1
bpy.context.window.scene=sc
print('Five scanned cliff shelves;',count,'rock contacts corrected; original proxies retained in library')
