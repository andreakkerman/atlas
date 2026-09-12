"""Soften the Atlas distant ridgeline after runtime composition review."""
import bpy
from pathlib import Path
R=Path(__file__).resolve().parents[1]/'Levels/LVL-0001/3d'
S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
assert not S.get('atlas_backdrop_v162') and not S.get('atlas_haze_v162')
o=S.objects['Atlas distant ridgeline']
for v in o.data.vertices:
 if v.co.z>0:v.co.z*=.73
o.data.update();S['atlas_backdrop_v162']=True
bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'))
