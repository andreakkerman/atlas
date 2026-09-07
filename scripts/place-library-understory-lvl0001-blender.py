"""Replace selected sparse authored saplings with distinct library silhouettes."""
import bpy,math,random
from mathutils import Vector
from mathutils.bvhtree import BVHTree
sc=bpy.data.scenes['Atlas LVL-0001 First Person'];lib=bpy.data.scenes['Atlas source library'];bpy.context.window.scene=sc
R=random.Random(73109)
terrain=sc.objects['Continuous forest terrain'];verts=[v.co.copy() for v in terrain.data.vertices];faces=[p.vertices[:] for p in terrain.data.polygons]
for o in sc.objects:
 if o.type=='MESH' and o.name.startswith(('Lower enclosure rock terrace','Scanned woodland cliff shelf')):
  off=len(verts);verts.extend(o.matrix_world@v.co for v in o.data.vertices);faces.extend(tuple(off+i for i in p.vertices) for p in o.data.polygons)
bvh=BVHTree.FromPolygons(verts,faces)
def replace(prefix,anchors,masters,label,heights):
 groups={}
 for o in sc.objects:
  if o.name.startswith(prefix):groups.setdefault(tuple(round(v,3) for v in o.location[:2]),[]).append(o)
 count=0
 for i,(x,y) in enumerate(anchors):
  if not groups:break
  pos=min(groups,key=lambda p:(p[0]-x)**2+(p[1]-y)**2)
  if math.hypot(pos[0]-x,pos[1]-y)>7:continue
  old=groups.pop(pos);master=bpy.data.objects[masters[i%len(masters)]]
  o=bpy.data.objects.new(label,master.data);sc.collection.objects.link(o)
  hit,n,_,_=bvh.ray_cast(Vector((pos[0],pos[1],100)),Vector((0,0,-1)),200)
  o.location=(pos[0],pos[1],hit.z-.05 if hit else old[0].location.z)
  height=max(v.co.z for v in master.data.vertices);s=R.uniform(*heights)/height;o.scale=(s,s,s);o.rotation_euler.z=R.random()*math.tau
  o['library_source']=master['source_asset'];o['replaced_placement']=prefix
  for previous in old:
   if previous.name not in lib.objects:lib.collection.objects.link(previous)
   for c in list(previous.users_collection):
    if c!=lib.collection:c.objects.unlink(previous)
  count+=1
 print(label,count)
replace('Juvenile forest fir',[(7,-8),(-1,-8),(6,3),(-5,16),(12,8),(13,26),(-11,27),(-7,30),(2,43),(-4,41),(14,42),(23,46),(-2,59),(24,70),(5,65)],['Atlas library fir_sapling_medium_'+s+'_LOD0' for s in 'abc'],'Library young forest fir',(3.7,5.8))
replace('Broadleaf hazel sapling',[(-6,-4),(9,-8),(-1,-12),(-7,10),(-6,20),(16,23),(18,33),(-4,40),(8,50),(25,56)],['Atlas library tree_small_02_LOD0'],'Library small broadleaf tree',(3.0,4.4))
