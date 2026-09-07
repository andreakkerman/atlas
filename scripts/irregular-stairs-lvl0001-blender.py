"""Worn stair courses with varied masonry joints, preserving route elevations."""
import bpy, math, random
from mathutils import Vector
from mathutils.noise import noise_vector
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];lib=bpy.data.scenes['Atlas source library'];bpy.context.window.scene=sc
R=random.Random(8517)
for o in list(sc.objects):
 if o.name.startswith('Connected route stair'):
  lib.collection.objects.link(o)
  for c in list(o.users_collection):
   if c!=lib.collection:c.objects.unlink(o)
parts=[]
for a,b in zip(ns['ROUTE'],ns['ROUTE'][1:]):
 p,q=Vector(a[3]),Vector(b[3]);delta=q-p;length=math.hypot(delta.x,delta.y)
 if delta.z/length<.16:continue
 side=Vector((delta.y,-delta.x,0)).normalized();rows=math.ceil(delta.z/.19);run=length/rows
 for row in range(rows):
  center=p+delta*((row+.5)/rows);top=p.z+delta.z*(row+1)/rows-.07
  widths=[R.uniform(.65,1.3) for _ in range(R.choice([4,5,5,6]))];widths=[w/sum(widths)*4.2 for w in widths];left=-2.1
  for width in widths:
   pos=center+side*(left+width*.5);left+=width
   bottom=min(ns['ground'](pos.x,pos.y)-.3,top-.26);w=width*.5-.009;d=run*.56
   cut=R.uniform(.035,.07)
   outline=[(-w+cut,-d), (w-cut,-d),(w,-d+cut),(w,d-cut),(w-cut,d),(-w+cut,d),(-w,d-cut),(-w,-d+cut)]
   outline=[(x+R.uniform(-.023,.023),y+R.uniform(-.025,.025)) for x,y in outline]
   verts=[(x,y,z) for z in [bottom,top+R.uniform(-.016,.016)] for x,y in outline]
   faces=[tuple(reversed(range(8))),tuple(range(8,16))]+[(i,(i+1)%8,(i+1)%8+8,i+8) for i in range(8)]
   o=ns['mesh']('Worn irregular stair stone',verts,faces,ns['ROCK']);o.location=(pos.x,pos.y,0);o.rotation_euler.z=math.atan2(side.y,side.x)
   bpy.context.view_layer.objects.active=o
   bevel=o.modifiers.new('Rounded broken arrises','BEVEL');bevel.width=.055;bevel.segments=3;bpy.ops.object.modifier_apply(modifier=bevel.name)
   for v in o.data.vertices:
    n=noise_vector((o.matrix_world@v.co)*7);v.co+=Vector((n.x*.014,n.y*.014,n.z*.013))
   ns['uv_world'](o,.85);parts.append(o)
bpy.ops.object.select_all(action='DESELECT')
for o in parts:o.select_set(True)
bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();parts[0].name='Irregular worn route stair courses'
print('Replaced aligned stair seams with',len(parts),'varied worn stones; former courses retained')
