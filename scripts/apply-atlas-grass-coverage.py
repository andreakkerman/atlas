"""Apply the audited 2x upper-blade width to the existing Atlas authoring mesh."""
import bpy,json
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
scene=bpy.context.scene
assert scene.get('atlas_cohesion_groups_v176') and not scene.get('atlas_grass_coverage_v177')
original=bpy.data.meshes['Atlas shared grass2 patch']
assert not original.get('atlasGrassCoverageVersion')
assert len(original.vertices)==576 and len(original.polygons)==256
assert sum(o.get('curatedSource')=='grass2' for o in scene.objects)==4000
audit=json.loads((ROOT/'output/grass-coverage/grounding-2.json').read_text())
assert not audit['pathConflictsAfter'] and not audit['runeConflictsAfter'] and audit['rootVertexChanges']==0
before={o.name:tuple(tuple(row) for row in o.matrix_world) for o in scene.objects}
source=(ROOT/'scripts/atlas-grass-coverage-candidates.py').read_text()
exec(source[source.index('def broaden('):source.index('scene=bpy.context.window.scene')])
broaden(original,2)
original['atlasGrassCoverageVersion']=177
original['atlasGrassUpperWidth']=2.0
scene['atlas_grass_coverage_v177']=True
assert all(tuple(tuple(row) for row in o.matrix_world)==before[o.name] for o in scene.objects)
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'Levels/LVL-0001/3d/lvl0001-stylized.blend'))
print('Applied grass coverage v177; all object transforms preserved.')
