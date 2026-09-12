"""Join static unique root meshes within 24m cells, preserving all surface data.
Only Atlas roots: no placement or polygon removal, and no Real source changes.
"""
import bpy, math, json
from pathlib import Path
from mathutils import Vector
root=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d')
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
s=bpy.data.scenes['Atlas LVL-0001 First Person'];bpy.context.window.scene=s
assert not any(o.name.startswith('Atlas static root cluster') for o in s.objects),'Root grouping already applied'
groups={};before=0
for o in s.objects:
 if o.type!='MESH' or not o.name.startswith('Buttress roots'):continue
 center=sum((o.matrix_world@Vector(v) for v in o.bound_box),Vector())/8
 key=(math.floor(center.x/24),math.floor(center.y/24),tuple(m.name for m in o.data.materials))
 groups.setdefault(key,[]).append(o);before+=len(o.data.polygons)
for objects in groups.values():
 bpy.ops.object.select_all(action='DESELECT')
 for o in objects:o.select_set(True)
 bpy.context.view_layer.objects.active=objects[0]
 if len(objects)>1:bpy.ops.object.join()
 objects[0].name='Atlas static root cluster'
after=sum(len(o.data.polygons) for o in s.objects if o.type=='MESH' and o.name.startswith('Atlas static root cluster'))
assert before==after
p=root/'atlas-composition-ledger.json';ledger=json.loads(p.read_text());ledger['rootBatching']={'beforeGroups':sum(map(len,groups.values())),'afterGroups':len(groups),'facesBefore':before,'facesAfter':after};p.write_text(json.dumps(ledger,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(root/'lvl0001-stylized.blend'))
print(ledger['rootBatching'])
