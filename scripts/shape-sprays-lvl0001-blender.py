"""Shape existing foliage sprays; preserve mature and juvenile stem architectures."""
import bpy
sc=bpy.data.scenes['Atlas LVL-0001 First Person']
for data in {o.data for o in sc.objects if o.type=='MESH' and o.data.name.startswith('Mature conifer foliage')}:
 if data.get('drooping_sprays'):continue
 for i in range(0,len(data.vertices),6):
  start=(data.vertices[i].co+data.vertices[i+1].co)*.5
  tip=(data.vertices[i+4].co+data.vertices[i+5].co)*.5;axis=(tip-start).normalized()
  for j in range(6):
   v=data.vertices[i+j];delta=v.co-start;along=axis*delta.dot(axis)
   v.co=start+along*1.32+(delta-along)*1.65
   v.co.z-=max(0,delta.dot(axis))*(.38+(i%5)*.06)
 data['drooping_sprays']=True;data.update()
for data in {o.data for o in sc.objects if o.type=='MESH' and o.data.name.startswith('Juvenile fir twig')}:
 if data.get('filled_juvenile_sprays'):continue
 for i in range(0,len(data.vertices),6):
  base=(data.vertices[i].co+data.vertices[i+1].co)*.5
  for j in range(6):data.vertices[i+j].co=base+(data.vertices[i+j].co-base)*1.65
 data['filled_juvenile_sprays']=True;data.update()
