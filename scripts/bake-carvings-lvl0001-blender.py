"""Bake tangent-space relief from authored carving textures through Blender Cycles."""
import bpy
ns=bpy.app.driver_namespace['atlas_authoring'];main=ns['SC']
scene=bpy.data.scenes.new('Atlas carving normal bake');bpy.context.window.scene=scene
scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=1
try:
 for material_name,outname,width,height in [('Atlas interlaced carved stone','runestone-carved-normal',1024,2048),('Atlas gate dragon relief','gate-carved-normal',1024,1280)]:
  source=bpy.data.materials[material_name];mat=source.copy();p=mat.node_tree.nodes['Principled BSDF'];albedo=next(n for n in mat.node_tree.nodes if n.type=='TEX_IMAGE' and n.image and 'albedo' in n.image.name)
  bump=mat.node_tree.nodes.new('ShaderNodeBump');bump.inputs['Distance'].default_value=.035;bump.inputs['Strength'].default_value=.65;mat.node_tree.links.new(albedo.outputs['Color'],bump.inputs['Height']);mat.node_tree.links.new(bump.outputs['Normal'],p.inputs['Normal'])
  image=bpy.data.images.new(outname,width=width,height=height,alpha=False);image.colorspace_settings.name='Non-Color'
  target=mat.node_tree.nodes.new('ShaderNodeTexImage');target.image=image;mat.node_tree.nodes.active=target
  bpy.ops.mesh.primitive_plane_add(size=2);plane=bpy.context.object;plane.scale.y=height/width;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);plane.data.materials.append(mat)
  scene.render.bake.use_selected_to_active=False;scene.render.bake.margin=4;bpy.ops.object.bake(type='NORMAL')
  image.filepath_raw=ns['OUT']+'/textures/'+outname+'.png';image.file_format='PNG';image.save();image.pack()
  normal=source.node_tree.nodes.new('ShaderNodeNormalMap');normal.inputs['Strength'].default_value=.9;tex=source.node_tree.nodes.new('ShaderNodeTexImage');tex.image=image;source.node_tree.links.new(tex.outputs['Color'],normal.inputs['Color']);source.node_tree.links.new(normal.outputs['Normal'],source.node_tree.nodes['Principled BSDF'].inputs['Normal'])
  bpy.data.objects.remove(plane,do_unlink=True);bpy.data.materials.remove(mat)
  print('Baked',outname)
finally:
 bpy.context.window.scene=main;bpy.data.scenes.remove(scene)
