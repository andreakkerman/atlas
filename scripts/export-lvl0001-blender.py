"""Export the current Atlas scene only. No scene reconstruction or object deletion."""
import bpy,contextlib,io,os
sc=bpy.data.scenes['Atlas LVL-0001 First Person'];bpy.context.window.scene=sc
out='D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d'
used=set()
for o in sc.objects:
 if o.type!='MESH':continue
 for m in o.data.materials:
  if m and m.use_nodes:
   for n in m.node_tree.nodes:
    if n.type=='TEX_IMAGE' and n.image:used.add(n.image)
for im in used:
 if not im.packed_file:im.pack()
for n in sc.world.node_tree.nodes:
 if n.type=='TEX_ENVIRONMENT' and n.image and not n.image.packed_file:n.image.pack()
bpy.ops.wm.save_as_mainfile(filepath=out+'/lvl0001.blend')
capture=io.StringIO()
with contextlib.redirect_stdout(capture):
 bpy.ops.export_scene.gltf(filepath=out+'/lvl0001.glb',export_format='GLB',use_active_scene=True,export_yup=True,export_apply=True,export_gpu_instances=True,export_lights=False,export_cameras=False,export_image_format='WEBP',export_image_quality=88,export_extras=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6,export_draco_position_quantization=18,export_draco_normal_quantization=12,export_draco_texcoord_quantization=16,export_draco_color_quantization=10)
print('Exported existing Atlas scene:',len(sc.objects),'objects;',os.path.getsize(out+'/lvl0001.glb'),'bytes')
