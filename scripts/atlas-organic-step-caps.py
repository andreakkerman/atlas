"""Keep supplied stone caps shallow; deepen only their supporting undersides.
Bake the static stair surface together to avoid unique per-height draw calls.
"""
import bpy,json,random
from pathlib import Path
D=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d');S=bpy.context.scene
assert S.get('atlas_organic_path_v173') and not S.get('atlas_step_caps_v173')
duplicates=[o for o in S.objects if o.type=='MESH' and o.name.startswith('Temple stair')]
anchors={o.name:(o.matrix_world.copy(),dict(o.items())) for o in duplicates}
# These broad old terraces cross the actual rising route one metre above its
# walking surface. Keep their historical anchors, but remove the duplicate skin.
for o in duplicates:bpy.data.objects.remove(o,do_unlink=True)
variants=[bpy.data.meshes[f'Atlas rockpath3 stone {i:02}'] for i in [1,3,6,9,12,16]]
rng=random.Random(1739)
for row in range(3):
 for col in range(4):
  o=bpy.data.objects.new('Atlas route stone landing',variants[(row*3+col)%6]);S.collection.objects.link(o)
  o.location=(18.7+row*.12+(col-1.5)*.82+rng.uniform(-.04,.04),57.45+row*.55+rng.uniform(-.03,.03),5.35)
  o.scale=(1.03,.88,.22);o.rotation_euler.z=rng.uniform(-.1,.1)
  o['pathCourse']=True;o['pathSource']='rockpath3.glb';o['organicPathVersion']=173
steps=[o for o in S.objects if o.type=='MESH' and o.get('pathCourse')]
for o in steps:
 centered=o.name.startswith('Temple stair');depth=o.scale.z
 o.data=o.data.copy()
 for v in o.data.vertices:
  z=v.co.z-(.5 if centered else 0)
  # The upper 65% of the source remains an approximately 12-cm cap. Only
  # lower side faces extend to the existing base, rather than stretching bevels.
  cap=min(depth,.18)
  relative=z*cap if z>=-.65 else -.65*cap+(z+.65)*(depth-.65*cap)/.35
  v.co.z=relative/depth+(.5 if centered else 0)
 o.data.update()
bpy.ops.object.select_all(action='DESELECT')
for o in steps:o.select_set(True)
bpy.context.view_layer.objects.active=steps[0]
bpy.ops.object.join();joined=bpy.context.view_layer.objects.active
joined.name='Atlas route stone stair surface';joined['pathCourse']=True;joined['organicPathVersion']=173;joined['pathSource']='rockpath3.glb';joined['stoneCount']=len(steps)
for name,(matrix,props) in anchors.items():
 o=bpy.data.objects.new(name,None);S.collection.objects.link(o);o.matrix_world=matrix
 for key,value in props.items():o[key]=value
S['atlas_step_caps_v173']=True
ledger=json.loads((D/'atlas-organic-path-ledger.json').read_text())
ledger['stairSurface']={'name':joined.name,'stoneCount':len(steps),'landingCount':12,'removedDuplicateSteps':80,'capDepth':.18,'triangles':sum(len(p.vertices)-2 for p in joined.data.polygons)}
(D/'atlas-organic-path-ledger.json').write_text(json.dumps(ledger,indent=2))
print(ledger['stairSurface'])
