"""Export only the current verified Atlas authoring scene (not another named scene)."""
import bpy,contextlib,io
from pathlib import Path
R=Path(__file__).resolve().parents[1];S=bpy.context.scene
assert S.get('atlas_premium_grounded_v174')
assert sum(o.get('curatedSource')=='grass2' for o in S.objects)==4000
with contextlib.redirect_stdout(io.StringIO()):
 bpy.ops.export_scene.gltf(filepath=str(R/'Levels/LVL-0001/3d/atlas-3d.glb'),export_format='GLB',use_active_scene=True,export_yup=True,export_apply=True,export_gpu_instances=True,export_lights=False,export_cameras=False,export_image_format='WEBP',export_image_quality=88,export_extras=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6,export_draco_position_quantization=18,export_draco_normal_quantization=12,export_draco_texcoord_quantization=16,export_draco_color_quantization=10)
print('EXPORTED',S.name,len(S.objects))
