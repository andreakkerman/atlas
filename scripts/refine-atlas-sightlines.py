"""Second visual review: bound foreground plant footprints and open three glades.
These are sightlines through undergrowth, not new gameplay routes.
"""
import bpy,json,random
from pathlib import Path
from mathutils import Vector
root=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d')
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
s=bpy.data.scenes['Atlas LVL-0001 First Person'];assert not s.get('atlas_sightlines_v161')
route=json.loads((root/'route.json').read_text());ps=[Vector((p['position'][0],-p['position'][2])) for p in route['route']]
def distance(p,a,b):
 delta=b-a;return (p-a-delta*max(0,min(1,(p-a).dot(delta)/delta.length_squared))).length
glades=[((3,21),(-5,26)),((9,40),(2,43)),((12,50),(8,44))]
ledger=json.loads((root/'atlas-composition-ledger.json').read_text());resized=[]
for o in list(s.objects):
 if o.type!='MESH' or not o.name.startswith(('Grass','Path bank community','Atlas woodland fern','Rich route understory','Broad leaf community','Fern drift','Detailed woodland flower')):continue
 p=Vector(o.location[:2]);d=min(distance(p,a,b) for a,b in zip(ps,ps[1:]));cat=o.name.split('.')[0]
 in_glade=min(distance(p,Vector(a),Vector(b)) for a,b in glades)<1.0
 if in_glade and random.Random(o.name+'glade').random()>.20:
  ledger['removed'].append(o.name);ledger['after'][cat]-=1
  if d<5:ledger['nearRouteAfter'][cat]-=1
  bpy.data.objects.remove(o,do_unlink=True);continue
 if d<4 and o.name.startswith(('Path bank community','Rich route understory','Broad leaf community')):
  width=max(o.dimensions.x,o.dimensions.y)
  if width>1.1:o.scale*=1.1/width;resized.append(o.name)
ledger['foregroundFootprintsReduced']=len(resized);ledger['gladeSightlines']=glades
(root/'atlas-composition-ledger.json').write_text(json.dumps(ledger,indent=2))
s['atlas_sightlines_v161']=True;bpy.ops.wm.save_as_mainfile(filepath=str(root/'lvl0001-stylized.blend'))
print('Foreground footprints reduced',len(resized))
