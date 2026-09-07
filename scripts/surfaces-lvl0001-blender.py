"""Geometric bark and surface moss finish; preserves authored object placements."""
import bpy,math,random
from mathutils import Vector
from mathutils.noise import noise_vector
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc
R=random.Random(718)
# Cylindrical trunk coordinates preserve bark grain around the full trunk.
for data in {o.data for o in sc.objects if o.name.startswith('Layered forest conifer') and o.data.name.startswith('Mature conifer wood')}:
 if data.get('atlas_bark_finish'):continue
 data['atlas_bark_finish']=True
 uv=data.uv_layers.active
 for poly in data.polygons:
  if max(data.loops[li].vertex_index for li in poly.loop_indices)>=400:continue
  angles=[math.atan2(data.vertices[data.loops[li].vertex_index].co.y,data.vertices[data.loops[li].vertex_index].co.x)/math.tau for li in poly.loop_indices]
  wrap=max(angles)-min(angles)>.5
  for li,a in zip(poly.loop_indices,angles):
   v=data.vertices[data.loops[li].vertex_index];uv.data[li].uv=((a+(1 if wrap and a<0 else 0))*2.2,v.co.z*.42)
 for v in list(data.vertices)[:400]:
  a=math.atan2(v.co.y,v.co.x);factor=1+.06*math.sin(a*7+v.co.z*.8)+.08*math.exp(-v.co.z*1.7)*(1+math.sin(a*5))
  v.co.x*=factor;v.co.y*=factor
# Moss has its own raised surface; stones retain their scanned base and normal maps.
moss=bpy.data.materials.get('Living moss cushion') or ns['plain']('Living moss cushion',(.09,.145,.025),.94)
p=moss.node_tree.nodes.get('Principled BSDF')
normal=next((n for n in ns['ROCK'].node_tree.nodes if n.type=='TEX_IMAGE' and n.image and 'nor' in n.image.name),None)
if normal and not any(n.type=='NORMAL_MAP' for n in moss.node_tree.nodes):
 n=moss.node_tree.nodes.new('ShaderNodeTexImage');n.image=normal.image
 bump=moss.node_tree.nodes.new('ShaderNodeNormalMap');bump.inputs['Strength'].default_value=.75
 moss.node_tree.links.new(n.outputs['Color'],bump.inputs['Color']);moss.node_tree.links.new(bump.outputs['Normal'],p.inputs['Normal'])
for o in list(sc.objects):
 if o.name.startswith('Raised moss mantle'):bpy.data.objects.remove(o,do_unlink=True)
masters={}
for source in list(sc.objects):
 if not source.name.startswith('Atlas moss'):continue
 if source.data not in masters:
  verts=[];faces=[];data=source.data
  for poly in data.polygons:
   center=poly.center;n=noise_vector(center*3.4).x
   if poly.normal.z<.58+n*.25 or noise_vector(center*1.4).y<-.25:continue
   face=[]
   for vi in poly.vertices:
    v=data.vertices[vi];face.append(len(verts));verts.append(tuple(v.co+v.normal*(.012+.014*(1+noise_vector(v.co*15).x))))
   faces.append(face)
  template=ns['mesh']('Raised moss mantle',verts,faces,moss,True);ns['uv_world'](template,2.5)
  colors=template.data.color_attributes.new(name='Moss variation',type='FLOAT_COLOR',domain='POINT');template.data.color_attributes.active_color=colors
  for v in template.data.vertices:
   f=.55+(noise_vector(v.co*5).x+1)*.5;colors.data[v.index].color=(f,f,.65+f*.2,1)
  masters[source.data]=template.data;bpy.data.objects.remove(template,do_unlink=True)
 o=bpy.data.objects.new('Raised moss mantle',masters[source.data]);sc.collection.objects.link(o);o.matrix_world=source.matrix_world.copy()
print('Bark grain and raised patchy moss applied to',len(masters),'shared rock variants')
