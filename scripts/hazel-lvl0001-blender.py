"""Distinct broad-leaf saplings with forked stems and folded photographed leaves."""
import bpy,math,random,requests,os
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc;R=random.Random(9356)
root=ns['OUT']+'/sources/shrub_01/textures/';path=root+'shrub_01_alpha_1k.png'
if not os.path.exists(path):
 f=requests.get('https://api.polyhaven.com/files/shrub_01',timeout=30).json();r=requests.get(f['Alpha']['1k']['png']['url'],timeout=60);r.raise_for_status();open(path,'wb').write(r.content)
mat=bpy.data.materials.new('Hazel broad leaves');mat.use_nodes=True;p=mat.node_tree.nodes['Principled BSDF'];p.inputs['Roughness'].default_value=.73
for file,socket in [('shrub_01_diff_1k.jpg','Base Color'),('shrub_01_alpha_1k.png','Alpha')]:
 n=mat.node_tree.nodes.new('ShaderNodeTexImage');n.image=bpy.data.images.load(root+file,check_existing=True)
 if socket=='Alpha':n.image.colorspace_settings.name='Non-Color'
 mat.node_tree.links.new(n.outputs['Color'],p.inputs[socket])
variants=[]
for k,h in enumerate([1.7,2.7,3.8]):
 v=[];f=[];lv=[];lf=[];uv=[]
 for stem in range(3):
  a=stem*2.1+R.random();direction=Vector((math.cos(a),math.sin(a),0));top=direction*h*.20+Vector((0,0,h*R.uniform(.78,1)))
  ns['tube_geo'](v,f,[tuple(top*(j/8)+direction*math.sin(j/8*math.pi)*.15) for j in range(9)],[.045*(1-j/9)+.004 for j in range(9)],7)
  for b in range(9):
   t=.25+b*.075;start=top*t;angle=a+b*2.4;d=Vector((math.cos(angle),math.sin(angle),.35));end=start+d*h*(.24+.12*math.sin(t*math.pi));end.z+=h*.15
   ns['tube_geo'](v,f,[tuple(start.lerp(end,j/5)+Vector((0,0,-.08*math.sin(j/5*math.pi)))) for j in range(6)],[.014*(1-j/6)+.002 for j in range(6)],5)
   for j in range(16):
    pos=start.lerp(end,.18+j*.049);theta=angle+(1 if j%2 else -1)*R.uniform(.7,1.7)
    along=Vector((math.cos(theta),math.sin(theta),R.uniform(-.4,.65))).normalized()*R.uniform(.13,.23)
    cross=Vector((-math.sin(theta),math.cos(theta),R.uniform(-.35,.35)))*along.length*.40
    i=len(lv);mid=pos+along*.53+Vector((0,0,.025));tip=pos+along
    lv.extend([tuple(pos-cross*.14),tuple(pos+cross*.14),tuple(mid-cross),tuple(mid+cross),tuple(tip-cross*.05),tuple(tip+cross*.05)])
    lf.extend([(i,i+1,i+3,i+2),(i+2,i+3,i+5,i+4)]);uv.extend([(.42,.63),(.72,.63),(.42,.805),(.72,.805),(.42,.98),(.72,.98)])
 wood=ns['mesh']('Hazel forked stems',v,f,ns['BARK'],True);ns['uv_world'](wood,1)
 leaf=ns['mesh']('Hazel folded leaves',lv,lf,mat,True);layer=leaf.data.uv_layers.new(name='UVMap')
 for p in leaf.data.polygons:
  for li in p.loop_indices:layer.data[li].uv=uv[leaf.data.loops[li].vertex_index]
 variants.append((wood.data,leaf.data));bpy.data.objects.remove(wood,do_unlink=True);bpy.data.objects.remove(leaf,do_unlink=True)
terrain=sc.objects['Continuous forest terrain'];bvh=BVHTree.FromPolygons([terrain.matrix_world@v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons])
anchors=[(-6,-7),(0,-12),(8,-10),(-8,8),(-8,20),(14,21),(18,33),(-4,42),(9,51),(25,55),(23,63)]
for index,(x,y) in enumerate(anchors):
 for j in range(5):
  px=x+R.uniform(-3.2,3.2);py=y+R.uniform(-3.2,3.2);d,_=ns['nearest_route'](px,py)
  if d<3.5:continue
  hit=bvh.ray_cast(Vector((px,py,100)),Vector((0,0,-1)),200)[0]
  if hit is None:continue
  angle=R.random()*math.tau;scale=R.uniform(.85,1.15)
  for data in variants[(index+j)%3]:
   o=bpy.data.objects.new('Broadleaf hazel sapling',data);sc.collection.objects.link(o);o.location=hit;o.location.z-=.035;o.rotation_euler.z=angle;o.scale=(scale,scale,scale)
print('Authored broadleaf sapling communities with three distinct stem structures')
