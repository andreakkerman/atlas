"""Distinct juvenile fir structures: fine stems, open whorls and irregular leaders."""
import bpy,math,random
from mathutils import Vector,Quaternion
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc;R=random.Random(9405)
leafmat=next(m for m in bpy.data.materials if m.name.startswith('Living fir twig clusters'))
variants=[]
for k,height in enumerate([3.2,4.6,5.7]):
 v=[];f=[];lv=[];lf=[];uvs=[]
 trunk=[(.06*math.sin(j*.7+k),.05*math.sin(j*.4),height*j/15) for j in range(16)]
 ns['tube_geo'](v,f,trunk,[.075*(1-j/16)+.009 for j in range(16)],8)
 for tier in range(7+k):
  z=.45+tier*(height-.85)/(7+k);reach=(height-z)*R.uniform(.25,.35)
  for branch in range(4+(tier%2)):
   a=branch*math.tau/(4+tier%2)+tier*2.4+R.uniform(-.2,.2);d=Vector((math.cos(a),math.sin(a),0));side=Vector((-d.y,d.x,0));length=reach*R.uniform(.65,1.15)
   pts=[tuple(d*length*j/4+Vector((0,0,z-.14*math.sin(j/4*math.pi)+.10*(j/4)**2))) for j in range(5)]
   ns['tube_geo'](v,f,pts,[.022*(1-j/4)+.003 for j in range(5)],5)
   for j in range(1,6):
    base=d*length*j/6+Vector((0,0,z-.10*math.sin(j/6*math.pi)))
    for sign in [-1,1]:
     direction=(d*.55+side*.7*sign+Vector((0,0,R.uniform(-.15,.25)))).normalized();extent=R.uniform(.25,.46);across=direction.cross(Vector((0,0,1))).normalized()*extent*.33;tip=base+direction*extent;middle=(base+tip)*.5+Vector((0,0,.04));i=len(lv)
     lv.extend([tuple(base-across*.4),tuple(base+across*.4),tuple(middle-across),tuple(middle+across),tuple(tip-across*.2),tuple(tip+across*.2)]);lf.extend([(i,i+1,i+3,i+2),(i+2,i+3,i+5,i+4)]);uvs.extend([(.66,.61),(.99,.61),(.66,.8),(.99,.8),(.66,.99),(.99,.99)])
 wood=ns['mesh']('Juvenile fir stem variant',v,f,ns['BARK'],True);ns['uv_world'](wood,1)
 for i in range(0,len(lv),6):
  base=(Vector(lv[i])+Vector(lv[i+1]))*.5;tip=(Vector(lv[i+4])+Vector(lv[i+5]))*.5;rotation=Quaternion((tip-base).normalized(),((i//6)%7-3)*.36)
  for j in range(6):lv[i+j]=tuple(base+(rotation@(Vector(lv[i+j])-base))*1.35)
 leaf=ns['mesh']('Juvenile fir twig variant',lv,lf,leafmat,True);layer=leaf.data.uv_layers.new(name='UVMap')
 for p in leaf.data.polygons:
  for li in p.loop_indices:layer.data[li].uv=uvs[leaf.data.loops[li].vertex_index]
 variants.append((wood.data,leaf.data));bpy.data.objects.remove(wood,do_unlink=True);bpy.data.objects.remove(leaf,do_unlink=True)
positions=[]
for o in list(sc.objects):
 if o.name.startswith('Layered forest conifer') and o.scale.z<.5:
  if o.data.name.startswith('Mature conifer wood'):positions.append((o.location.copy(),o.rotation_euler.z))
  bpy.data.objects.remove(o,do_unlink=True)
 elif o.name.startswith('Conifer crown infill') and o.scale.z<.55:bpy.data.objects.remove(o,do_unlink=True)
for i,(pos,angle) in enumerate(positions):
 for data in variants[i%3]:
  o=bpy.data.objects.new('Juvenile forest fir',data);sc.collection.objects.link(o);o.location=pos;o.rotation_euler.z=angle;s=R.uniform(.85,1.12);o.scale=(s,s,s)
print('Replaced',len(positions),'miniature mature firs with distinct juvenile structures')
