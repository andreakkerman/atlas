"""Close side-view cliff gaps and extend the surrounding forest in real geometry."""
import bpy,math,random
from mathutils import Vector
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc;R=random.Random(887)
rocks=list({o.data for o in sc.objects if o.name.startswith('Atlas moss rock')})
# Open scan sheets are useful source material, but exposed outcrops need closed volume.
for o in list(sc.objects):
 if not o.name.startswith('Atlas moss cliff') or not o.data.name.startswith('rock_face'):continue
 dims=o.dimensions.copy();o.data=R.choice(rocks);raw=Vector(tuple(max(v.co[i] for v in o.data.vertices)-min(v.co[i] for v in o.data.vertices) for i in range(3)))
 o.scale=Vector((dims.x/raw.x,dims.y/raw.y,dims.z/raw.z));o.location.z=ns['ground'](o.location.x,o.location.y)-.7
for o in list(sc.objects):
 if o.name.startswith(('Forest surrounding terrain','Surrounding mature fir','Distant forest silhouette')):bpy.data.objects.remove(o,do_unlink=True)
# A connected skirt extends beyond every original terrain boundary.
v=[];f=[];nx=150;ny=160
for j in range(ny+1):
 y=-126+j*2
 for i in range(nx+1):x=-142+i*2;v.append((x,y,ns['ground'](x,y)))
for j in range(ny):
 for i in range(nx):
  x=-142+i*2;y=-126+j*2
  if -42<=x<58 and -26<=y<94:continue
  a=j*(nx+1)+i;f.append((a,a+1,a+nx+2,a+nx+1))
o=ns['mesh']('Forest surrounding terrain',v,f,ns['SOIL'],True);ns['uv_world'](o,.22)
print('Closed outcrops and surrounding terrain authored; enclosure planting is composed separately')
