"""Break paving repetition with smaller infill stones, erosion and tiny joint plants."""
import bpy,random,math,requests,os
from mathutils import Vector
from mathutils.noise import noise_vector
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];R=random.Random(6218)
stones=[o for o in sc.objects if o.name.startswith('Route broad flagstone')]
for data in {o.data for o in stones}:
 if data.get('final_erosion'):continue
 for v in data.vertices:
  n=noise_vector(v.co*6.3);v.co.x+=n.x*.035;v.co.y+=n.y*.035;v.co.z+=n.z*.02
 data['final_erosion']=True;data.update()
for o in stones:
 if o.get('infill_checked'):continue
 o['infill_checked']=True
 if R.random()<.18:
  side=Vector((math.cos(o.rotation_euler.z),math.sin(o.rotation_euler.z),0));old=o.scale.x;o.scale.x*=.47;o.location-=side*old*.25
  n=bpy.data.objects.new('Path smaller infill stone',o.data);sc.collection.objects.link(n);n.location=o.location+side*old*.5;n.scale=o.scale;n.rotation_euler=o.rotation_euler
 if R.random()<.3:o.rotation_euler.z+=R.uniform(-.09,.09)
# Tiny sorrel colonies live in joints, at a completely different scale from shrubs.
asset='shrub_sorrel_01';path=ns['OUT']+'/sources/'+asset+'/textures/'+asset+'_alpha_1k.png'
if not os.path.exists(path):
 f=requests.get('https://api.polyhaven.com/files/'+asset,timeout=30).json();r=requests.get(f['Alpha']['1k']['png']['url'],timeout=60);r.raise_for_status();open(path,'wb').write(r.content)
variants=[]
for suffix in 'abcde':
 src=bpy.data.objects[asset+'_'+suffix];data=src.data.copy();lo=Vector(tuple(min(v.co[i] for v in data.vertices) for i in range(3)));hi=Vector(tuple(max(v.co[i] for v in data.vertices) for i in range(3)));center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
 for v in data.vertices:v.co-=center
 variants.append(data)
for m in {m for data in variants for m in data.materials}:
 n=m.node_tree.nodes.new('ShaderNodeTexImage');n.image=bpy.data.images.load(path,check_existing=True);n.image.colorspace_settings.name='Non-Color';m.node_tree.links.new(n.outputs['Color'],m.node_tree.nodes['Principled BSDF'].inputs['Alpha'])
for o in stones:
 if R.random()>.27:continue
 side=Vector((math.cos(o.rotation_euler.z),math.sin(o.rotation_euler.z),0));pos=o.location+side*o.scale.x*.5;pos.z+=.015
 plant=bpy.data.objects.new('Sorrel in paving joint',R.choice(variants));sc.collection.objects.link(plant);plant.location=pos;s=R.uniform(1.1,2);plant.scale=(s,s,s);plant.rotation_euler.z=R.random()*math.tau
print('Varied infill stones and tiny joint plants authored')
