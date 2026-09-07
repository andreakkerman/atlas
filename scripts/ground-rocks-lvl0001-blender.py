"""Seat scanned rock undersides into uneven terrain, then re-seat ledge shrubs."""
import bpy
from mathutils import Vector
from mathutils.bvhtree import BVHTree
sc=bpy.data.scenes['Atlas LVL-0001 First Person']
def surface(objects):
 verts=[];faces=[]
 for o in objects:
  offset=len(verts);verts.extend(o.matrix_world@v.co for v in o.data.vertices)
  faces.extend(tuple(offset+i for i in p.vertices) for p in o.data.polygons)
 return BVHTree.FromPolygons(verts,faces)
terrain=[sc.objects[n] for n in ('Continuous forest terrain','Forest surrounding terrain')]
bvh=surface(terrain)
rocks=[o for o in sc.objects if o.type=='MESH' and o.name.startswith(('Atlas moss rock','Atlas moss cliff','Enclosure outcrop'))]
changed=0
for o in rocks:
 points=[o.matrix_world@v.co for v in o.data.vertices]
 lo=min(v.z for v in points);hi=max(v.z for v in points);gaps=[]
 for p in points[::13]:
  if p.z>lo+(hi-lo)*.24:continue
  hit=bvh.ray_cast(Vector((p.x,p.y,100)),Vector((0,0,-1)),200)[0]
  if hit is not None:gaps.append(p.z-hit.z)
 if not gaps:continue
 gaps.sort();sink=max(0,gaps[int((len(gaps)-1)*.8)]+.10)
 if sink>.02:o.location.z-=min(sink,(hi-lo)*.5);changed+=1
bpy.context.view_layer.update()
bvh=surface(terrain+rocks)
for o in sc.objects:
 if o.name.startswith('Enclosure shrub'):
  hit,normal,_,_=bvh.ray_cast(Vector((o.location.x,o.location.y,100)),Vector((0,0,-1)),200)
  if hit is not None and normal.z>.3:o.location.z=hit.z-.035
print('Seated uneven rock undersides:',changed)
