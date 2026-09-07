"""Closed, stepped rock landforms for the rear forest composition."""
import bpy,math,random
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc;R=random.Random(4271)
terrain=sc.objects['Continuous forest terrain'];bvh=BVHTree.FromPolygons([v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons])
mat=ns['ROCK'].copy();mat.name='Weathered enclosure cliff'
for idx,(x,y,w,d,h) in enumerate([(-7,-10,8,6,5),(1,-19,11,7,6.5),(12,-14,8,6,5.5),(-11,22,9,7,5)]):
 v=[];f=[];n=40;layers=14;radial=[R.uniform(.94,1.06) for _ in range(n)]
 for layer in range(layers):
  t=layer/(layers-1);scale=1-.17*t;ledge=[0,.04,-.02,.03][layer%4];shiftx=math.sin(layer*1.4+idx)*.10;shifty=math.cos(layer*1.2)*.07
  for j in range(n):
   a=j*math.tau/n;c=math.cos(a);s=math.sin(a)
   px=math.copysign(abs(c)**.43,c)*(scale+ledge)*w*.5*radial[j]+shiftx
   py=math.copysign(abs(s)**.43,s)*(scale+ledge)*d*.5*radial[j]+shifty
   z=t*h+(.10*math.sin(j*1.8)+R.uniform(-.07,.07))*(.3+t*.7)
   v.append((px,py,z))
 for layer in range(layers-1):
  for j in range(n):f.append((layer*n+j,layer*n+(j+1)%n,(layer+1)*n+(j+1)%n,(layer+1)*n+j))
 f.append(tuple(reversed(range(n))));f.append(tuple((layers-1)*n+j for j in range(n)))
 o=ns['mesh']('Stratified forest outcrop',v,f,mat,False);ns['uv_world'](o,.32)
 hit=bvh.ray_cast(Vector((x,y,100)),Vector((0,0,-1)),200)[0];o.location=(x,y,(hit.z if hit else 0)-h*.30);o.rotation_euler.z=R.uniform(-.3,.3)
 bevel=o.modifiers.new('Weathered rock arrises','BEVEL');bevel.width=.075;bevel.segments=2
print('Composed four grounded stratified cliff masses')
