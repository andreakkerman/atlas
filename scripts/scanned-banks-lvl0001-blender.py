"""Drape a reduced CC0 rock-ground scan over bare enclosure banks.

Preserve the imported source and route; each patch has its own conformed mesh.
"""
import bpy, math
from mathutils import Vector
from mathutils.bvhtree import BVHTree
sc=bpy.data.scenes['Atlas LVL-0001 First Person']
lib=bpy.data.scenes['Atlas source library']
bpy.context.window.scene=lib
source=bpy.data.objects['coast_land_rocks_04_LOD0']
master=source.copy();master.data=source.data.copy();lib.collection.objects.link(master)
master.name='Atlas scanned bank master'
bpy.context.view_layer.objects.active=master
mod=master.modifiers.new('Bank silhouette LOD','DECIMATE');mod.ratio=.08
bpy.ops.object.modifier_apply(modifier=mod.name)
# Bake the source transform into the derivative, then normalize around its floor.
master.data.transform(master.matrix_world);master.matrix_world.identity()
lo=Vector(tuple(min(v.co[i] for v in master.data.vertices) for i in range(3)))
hi=Vector(tuple(max(v.co[i] for v in master.data.vertices) for i in range(3)))
center=(lo+hi)*.5
for v in master.data.vertices:v.co-=Vector((center.x,center.y,lo.z))
for mat in master.data.materials:
 if mat:mat.name='Scanned rocky forest bank'
terrain=sc.objects['Continuous forest terrain']
bvh=BVHTree.FromPolygons([terrain.matrix_world@v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons])
ns=bpy.app.driver_namespace['atlas_authoring']
for x,y,s,a in [(-5,-6,.55,.2),(2,-11,.62,-.4),(10,-7,.5,1.2),(-9,15,.6,.8),(20,32,.65,-.2)]:
 o=bpy.data.objects.new('Grounded scanned bank',master.data.copy());sc.collection.objects.link(o)
 for v in o.data.vertices:
  px,py,pz=v.co;wx=x+s*(px*math.cos(a)-py*math.sin(a));wy=y+s*(px*math.sin(a)+py*math.cos(a))
  hit=bvh.ray_cast(Vector((wx,wy,100)),Vector((0,0,-1)),200)[0]
  # Sink the perimeter into soil; preserve the scan's actual rock relief.
  edge=max(abs(px)/(hi.x-lo.x)*2,abs(py)/(hi.y-lo.y)*2)
  sink=.08+max(0,(edge-.72)/.28)*.30
  v.co=(wx,wy,(hit.z if hit else 0)+pz*s-sink)
 o['source']='https://polyhaven.com/a/coast_land_rocks_04'
 a=o.data.attributes.get('custom_normal')
 if a:o.data.attributes.remove(a)
 for p in o.data.polygons:p.use_smooth=True
bpy.context.window.scene=sc
print('Placed five terrain-conforming scanned bank patches;',len(master.data.polygons),'faces per patch')
