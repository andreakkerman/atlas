"""Art-directed enclosure: terrain shoulders, embedded outcrops and mixed shrubs."""
import bpy,math,random,requests,os
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc;R=random.Random(3086)
for o in list(sc.objects):
 if o.name.startswith(('Surrounding mature fir','Enclosure outcrop','Enclosure shrub')):bpy.data.objects.remove(o,do_unlink=True)
# Broad terrain shoulders close sightlines without forming a vertical wall.
shoulders=[(-12,-8,4.5,6),(1,-20,7.5,8),(14,-13,6,7),(-15,18,5,9),(24,31,5,9),(-12,48,5,8)]
for name in ['Continuous forest terrain','Forest surrounding terrain']:
 o=sc.objects[name]
 if o.data.get('enclosure_shoulders'):continue
 for v in o.data.vertices:
  x,y=v.co.x,v.co.y;d,_=ns['nearest_route'](x,y);weight=max(0,min(1,(d-3)/5));rise=sum(h*math.exp(-((x-cx)**2+(y-cy)**2)/(r*r)) for cx,cy,h,r in shoulders)
  v.co.z+=rise*weight
 o.data['enclosure_shoulders']=True;o.data.update()
terrain=sc.objects['Continuous forest terrain'];bvh=BVHTree.FromPolygons([terrain.matrix_world@v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons]);bpy.app.driver_namespace['atlas_terrain_bvh']=bvh
for o in sc.objects:
 if o.name.startswith(('Grass','Fern drift','Atlas woodland fern','Rich route understory','Path bank community','Broad leaf community','Detailed woodland flower','Paving edge tuft','Layered forest conifer','Conifer crown infill','Atlas moss rock')):
  hit=bvh.ray_cast(Vector((o.location.x,o.location.y,80)),Vector((0,0,-1)),160)[0]
  if hit is not None:o.location.z=hit.z-(.12 if o.name.startswith('Atlas moss') else .015)
rocks=list({o.data for o in sc.objects if o.name.startswith('Atlas moss rock')})
anchors=[(-8,-6,7,5,4),(-3,-13,8,6,5),(7,-15,9,7,6),(15,-8,7,5,4),(-11,9,8,6,5),(-12,24,9,7,5),(20,28,7,5,4),(-7,43,8,6,5)]
for idx,(x,y,w,depth,h) in enumerate(anchors):
 for part in range(3):
  px=x+R.uniform(-w*.3,w*.3);py=y+R.uniform(-depth*.3,depth*.3);data=rocks[(idx+part)%len(rocks)]
  raw=Vector(tuple(max(v.co[i] for v in data.vertices)-min(v.co[i] for v in data.vertices) for i in range(3)))
  scale=1 if part==0 else R.uniform(.35,.65);o=bpy.data.objects.new('Enclosure outcrop',data);sc.collection.objects.link(o);o.scale=(w*scale/raw.x,depth*scale/raw.y,h*scale/raw.z);o.rotation_euler.z=R.uniform(-.7,.7)
  hit=bvh.ray_cast(Vector((px,py,80)),Vector((0,0,-1)),160)[0];o.location=(px,py,(hit.z if hit else ns['ground'](px,py))-h*scale*.32)
# Four different broad shrub structures complement existing small ground-cover species.
variants=[]
for suffix in 'abcd':
 src=bpy.data.objects['shrub_02_'+suffix];data=src.data.copy();lo=Vector(tuple(min(v.co[i] for v in data.vertices) for i in range(3)));hi=Vector(tuple(max(v.co[i] for v in data.vertices) for i in range(3)));center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
 for v in data.vertices:v.co-=center
 variants.append(data)
f=requests.get('https://api.polyhaven.com/files/shrub_02',timeout=30).json();path=ns['OUT']+'/sources/shrub_02/textures/shrub_02_alpha_1k.png'
if not os.path.exists(path):r=requests.get(f['Alpha']['1k']['png']['url'],timeout=60);r.raise_for_status();open(path,'wb').write(r.content)
for m in {m for data in variants for m in data.materials}:
 n=m.node_tree.nodes.new('ShaderNodeTexImage');n.image=bpy.data.images.load(path,check_existing=True);n.image.colorspace_settings.name='Non-Color';m.node_tree.links.new(n.outputs['Color'],m.node_tree.nodes['Principled BSDF'].inputs['Alpha'])
for idx,(x,y,w,depth,h) in enumerate(anchors):
 for part in range(12):
  px=x+R.uniform(-w*.7,w*.7);py=y+R.uniform(-depth*.7,depth*.7);d,_=ns['nearest_route'](px,py)
  if d<3:continue
  hit=bvh.ray_cast(Vector((px,py,80)),Vector((0,0,-1)),160)[0]
  if hit is None:continue
  o=bpy.data.objects.new('Enclosure shrub',variants[(idx+part)%4]);sc.collection.objects.link(o);o.location=hit;scale=R.uniform(.65,1.35);o.scale=(scale,scale,scale);o.rotation_euler.z=R.random()*math.tau
print('Terrain shoulders, embedded rock groups and varied shrubs composed')
