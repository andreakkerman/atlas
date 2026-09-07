"""Render an authored dense spruce spray for the existing folded canopy meshes."""
import bpy, math, random
from mathutils import Vector
R=random.Random(744)
main=bpy.data.scenes['Atlas LVL-0001 First Person']
sc=bpy.data.scenes.new('Atlas spruce spray bake');bpy.context.window.scene=sc
verts=[];faces=[];indices=[]
def strand(a,b,width,mi):
 a=Vector(a);b=Vector(b);d=(b-a).normalized();s=Vector((-d.y,d.x,0))*width
 k=len(verts);verts.extend([a-s,a+s,b+Vector((0,0,.004)),b-s*.12]);faces.extend([(k,k+1,k+2),(k,k+2,k+3)]);indices.extend([mi,mi])
strand((0,0,0),(0,1,0),.009,3)
for side in (-1,1):
 for j in range(10):
  y=.08+j*.083;length=(1-y)*.44+.045
  a=Vector((0,y,0));b=Vector((side*length,y+.15,R.uniform(-.012,.012)))
  strand(a,b,.004,3);direction=(b-a).normalized();perp=Vector((-direction.y,direction.x,0))
  for n in range(32):
   base=a.lerp(b,n/32)
   for sign in (-1,1):
    tip=base+(direction*.48+perp*sign*.82).normalized()*R.uniform(.035,.074)
    tip.z+=R.uniform(-.012,.012);strand(base,tip,R.uniform(.0024,.0043),R.randrange(3))
for j in range(55):
 for side in (-1,1):strand((0,j/55,0),(side*R.uniform(.027,.057),j/55+.045,.012),.003,R.randrange(3))
data=bpy.data.meshes.new('Authored spruce needle spray');data.from_pydata(verts,[],faces);data.update()
o=bpy.data.objects.new('Authored spruce needle spray',data);sc.collection.objects.link(o)
for color in [( .055,.105,.017,1),(.09,.16,.027,1),(.15,.22,.045,1),(.11,.065,.025,1)]:
 m=bpy.data.materials.new('Spruce spray bake pigment');m.diffuse_color=color;m.use_nodes=True;m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value=color;m.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value=.72;data.materials.append(m)
for p,mi in zip(data.polygons,indices):p.material_index=mi
camdata=bpy.data.cameras.new('Spruce orthographic bake');cam=bpy.data.objects.new(camdata.name,camdata);sc.collection.objects.link(cam);cam.location=(0,.52,3);camdata.type='ORTHO';camdata.ortho_scale=1.14;sc.camera=cam
lightdata=bpy.data.lights.new('Spruce soft bake light','AREA');lightdata.energy=160;lightdata.size=3;light=bpy.data.objects.new(lightdata.name,lightdata);sc.collection.objects.link(light);light.location=(-1,1,2)
sc.world=bpy.data.worlds.new('Spruce neutral bake world');sc.world.color=(.3,.3,.3)
sc.render.engine='CYCLES';sc.cycles.samples=24;sc.render.resolution_x=1024;sc.render.resolution_y=1024;sc.render.resolution_percentage=100;sc.render.film_transparent=True;sc.view_settings.view_transform='Standard'
path='D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d/textures/spruce-spray.png';sc.render.image_settings.file_format='PNG';sc.render.image_settings.color_mode='RGBA';sc.render.filepath=path;bpy.ops.render.render(write_still=True)
bpy.context.window.scene=main
image=bpy.data.images.load(path,check_existing=True);image.pack()
for m in bpy.data.materials:
 if m.name.startswith('Living fir twig'):
  p=m.node_tree.nodes.get('Principled BSDF');n=m.node_tree.nodes.new('ShaderNodeTexImage');n.image=image
  m.node_tree.links.new(n.outputs['Color'],p.inputs['Base Color']);m.node_tree.links.new(n.outputs['Alpha'],p.inputs['Alpha'])
  for link in list(p.inputs['Normal'].links):m.node_tree.links.remove(link)
for data in {o.data for o in main.objects if o.type=='MESH' and any(m and m.name.startswith('Living fir twig') for m in o.data.materials)}:
 if data.get('spruce_spray_uv'):continue
 for uv in data.uv_layers.active.data:uv.uv=((uv.uv.x-.66)/.33,(uv.uv.y-.61)/.38)
 data['spruce_spray_uv']=True
for obj in list(sc.objects):bpy.data.objects.remove(obj,do_unlink=True)
bpy.data.scenes.remove(sc)
print('Dense authored spruce spray applied to existing canopy geometry')
