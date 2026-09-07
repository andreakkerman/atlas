"""Conform existing root flares to their local hillside."""
import bpy,math
from mathutils import Vector
from mathutils.bvhtree import BVHTree
sc=bpy.data.scenes['Atlas LVL-0001 First Person'];terrain=sc.objects['Continuous forest terrain']
bvh=BVHTree.FromPolygons([v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons])
for o in sc.objects:
 if not o.name.startswith('Buttress roots') or o.get('terrain_roots'):continue
 o.data=o.data.copy();inverse=o.matrix_world.inverted()
 for v in o.data.vertices:
  p=o.matrix_world@v.co;hit=bvh.ray_cast(Vector((p.x,p.y,100)),Vector((0,0,-1)),200)[0]
  if hit is None:continue
  weight=max(0,min(1,(math.hypot(v.co.x,v.co.y)-.55)/.55))
  if p.z>hit.z+.06:p.z+=(hit.z+.06-p.z)*weight;v.co=inverse@p
 o.data.update();o['terrain_roots']=True
