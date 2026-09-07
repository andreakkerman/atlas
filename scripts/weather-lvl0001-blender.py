"""Weathered stone finish, shared PBR and geometric erosion."""
import bpy,random,math
from mathutils.noise import noise_vector
ns=bpy.app.driver_namespace['atlas_authoring'];sc=ns['SC'];bpy.context.window.scene=sc
m=bpy.data.materials['Living moss cushion']
# Use the same detailed lichen/stone family on the route and architecture.
for source in [ns['ROCK']]:
 p=source.node_tree.nodes.get('Principled BSDF')
 for kind,socket in [('Diffuse','Base Color'),('nor_gl','Normal'),('Rough','Roughness')]:
  n=source.node_tree.nodes.new('ShaderNodeTexImage');n.image=bpy.data.images.load(ns['OUT']+'/textures/mossy_rock_'+kind+'.jpg',check_existing=True)
  if kind!='Diffuse':n.image.colorspace_settings.name='Non-Color'
  if kind=='nor_gl':
   normal=source.node_tree.nodes.new('ShaderNodeNormalMap');normal.inputs['Strength'].default_value=1.25;source.node_tree.links.new(n.outputs['Color'],normal.inputs['Color']);source.node_tree.links.new(normal.outputs['Normal'],p.inputs[socket])
  else:source.node_tree.links.new(n.outputs['Color'],p.inputs[socket])
# Scatter the previously planar stone lips and risers with low-amplitude erosion.
for o in list(sc.objects):
 if not o.name.startswith('Connected route stair'):continue
 data=o.data
 for v in data.vertices:
  sample=o.matrix_world@v.co
  v.co.x+=noise_vector(sample*9).x*.032;v.co.y+=noise_vector(sample*9).y*.028;v.co.z+=noise_vector(sample*8).z*.027
# Reduce draw overhead: these static stair courses form one authored mesh.
stairs=[o for o in sc.objects if o.name.startswith('Connected route stair')]
if len(stairs)>1:
 bpy.ops.object.select_all(action='DESELECT')
 for o in stairs:o.select_set(True)
 bpy.context.view_layer.objects.active=stairs[0];bpy.ops.object.join();stairs[0].name='Connected route stair courses'
print('Weathered lichen stone and irregular stair lips applied')
