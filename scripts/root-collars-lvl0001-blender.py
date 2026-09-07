"""Small soil root plates join mature trunk bases to steep slopes."""
import bpy,math
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc;t=sc.objects['Continuous forest terrain'];t.data.calc_loop_triangles()
bvh=BVHTree.FromPolygons([v.co for v in t.data.vertices],[p.vertices[:] for p in t.data.loop_triangles],all_triangles=True)
for tree in list(sc.objects):
 if not tree.name.startswith('Layered forest conifer') or not tree.data.name.startswith('Mature conifer wood') or tree.get('soil_root_plate'):continue
 cx,cy,cz=tree.location;radius=tree.scale.x*.66;v=[(cx,cy,cz+.12)];f=[];n=24
 for ring in range(4):
  r=radius*(1.0+ring*.55)
  for j in range(n):
   a=j*math.tau/n;x=cx+math.cos(a)*r;y=cy+math.sin(a)*r;hit=bvh.ray_cast(Vector((x,y,100)),Vector((0,0,-1)),200)[0];ground=hit.z if hit else cz
   weight=max(0,1-ring/3);d,_=ns['nearest_route'](x,y)
   z=max(ground,cz+.10)*weight+ground*(1-weight)+.015
   if d<2.2:z=ground+.01
   v.append((x,y,z))
 for j in range(n):f.append((0,1+j,1+(j+1)%n))
 for ring in range(3):
  for j in range(n):f.append((1+ring*n+j,1+ring*n+(j+1)%n,1+(ring+1)*n+(j+1)%n,1+(ring+1)*n+j))
 o=ns['mesh']('Root plate soil',v,f,t.data.materials[0],True);ns['uv_world'](o,.32);tree['soil_root_plate']=True
print('Soil plates close the exposed underside of mature root systems')
