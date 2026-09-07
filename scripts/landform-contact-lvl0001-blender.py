"""Blend soil shoulders into rock groups without changing the walkable route."""
import bpy,math
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc
rocks=[]
for o in sc.objects:
 if o.type!='MESH' or not o.name.startswith(('Atlas moss cliff','Enclosure outcrop')):continue
 pts=[o.matrix_world@Vector(p) for p in o.bound_box];lo=Vector(tuple(min(p[i] for p in pts) for i in range(3)));hi=Vector(tuple(max(p[i] for p in pts) for i in range(3)))
 rocks.append(((lo.x+hi.x)*.5,(lo.y+hi.y)*.5,max(.7,(hi.x-lo.x)*.52),max(.7,(hi.y-lo.y)*.52),lo.z+(hi.z-lo.z)*.36))
for name in ('Continuous forest terrain','Forest surrounding terrain'):
 o=sc.objects[name]
 for v in o.data.vertices:
  x,y=v.co.x,v.co.y;d,_=ns['nearest_route'](x,y)
  if d<3.2:continue
  limit=min(1,(d-3.2)/2)
  for cx,cy,rx,ry,z in rocks:
   radius=math.sqrt(((x-cx)/rx)**2+((y-cy)/ry)**2)
   weight=max(0,min(1,(1.55-radius)/.65));weight=weight*weight*(3-2*weight)*limit
   if z>v.co.z:v.co.z+=(z-v.co.z)*weight
 o.data.update()
terrain=sc.objects['Continuous forest terrain'];bvh=BVHTree.FromPolygons([terrain.matrix_world@v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons]);ns['terrain_contact_bvh']=bvh
prefixes=('Grass','Fern drift','Atlas woodland fern','Rich route understory','Path bank community','Broad leaf community','Detailed woodland flower','Paving edge tuft','Layered forest conifer','Conifer crown infill','Juvenile forest fir','Broadleaf hazel sapling','Buttress roots','Enclosure shrub')
for o in sc.objects:
 if not o.name.startswith(prefixes):continue
 hit=bvh.ray_cast(Vector((o.location.x,o.location.y,100)),Vector((0,0,-1)),200)[0]
 if hit is not None:o.location.z=hit.z-.035
bpy.context.view_layer.update()
print('Blended soil shoulders around outcrops and re-seated vegetation')
