"""Atlas-only v169 colour delta. No geometry, foliage or placement changes."""
import bpy, json
from pathlib import Path
R=Path('D:/DevProjects/SvenAdventure')
S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
assert not S.get('atlas_cohesion_v169')
prefixes=('Atlas moss rock','Atlas moss cliff','Enclosure outcrop','Opening fractured')
meshes={o.data for o in S.objects if o.type=='MESH' and o.name.startswith(prefixes)}
report={'meshes':len(meshes),'corners':0,'oldMoss':[.159,.235,.045],'newMoss':[.070,.120,.028]}
for mesh in meshes:
    # Shared sources must belong exclusively to rock instances.
    assert all(o.name.startswith(prefixes) for o in S.objects if o.type=='MESH' and o.data==mesh)
    attr=mesh.color_attributes.get('Color')
    if not attr: continue
    for d in attr.data:
        r,g,b,a=d.color
        if g>r*1.25 and g>b*2:
            d.color=(r*.44025,g*.51064,b*.62222,a)
            report['corners']+=1
S['atlas_cohesion_v169']=True
(R/'Levels/LVL-0001/3d/atlas-cohesion-ledger.json').write_text(json.dumps(report,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=bpy.data.filepath)
print(report)
