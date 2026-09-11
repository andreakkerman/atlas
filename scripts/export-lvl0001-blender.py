"""Export exactly one preserved world checkpoint; never save over a source.
blender --background --python scripts/export-lvl0001-blender.py -- real-3d
blender --background --python scripts/export-lvl0001-blender.py -- atlas-3d
"""
import bpy, contextlib, io, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]/'Levels/LVL-0001/3d'
WORLDS={'real-3d':('lvl0001.blend','real-3d.glb'),'atlas-3d':('lvl0001-stylized.blend','atlas-3d.glb')}
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
if len(args)!=1 or args[0] not in WORLDS: raise RuntimeError('Specify exactly real-3d or atlas-3d after --')
mode=args[0];source,target=WORLDS[mode]
bpy.ops.wm.open_mainfile(filepath=str(ROOT/source))
sc=bpy.data.scenes['Atlas LVL-0001 First Person'];bpy.context.window.scene=sc
faceted=sum(o.name.startswith('Faceted mature fir') for o in sc.objects)
if (mode=='atlas-3d') != (faceted>0): raise RuntimeError('Wrong authoring state; export refused')
with contextlib.redirect_stdout(io.StringIO()):
 bpy.ops.export_scene.gltf(filepath=str(ROOT/target),export_format='GLB',use_active_scene=True,export_yup=True,export_apply=True,export_gpu_instances=True,export_lights=False,export_cameras=False,export_image_format='WEBP',export_image_quality=88,export_extras=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6,export_draco_position_quantization=18,export_draco_normal_quantization=12,export_draco_texcoord_quantization=16,export_draco_color_quantization=10)
print(mode,source,target,len(sc.objects),'objects',(ROOT/target).stat().st_size,'bytes')
