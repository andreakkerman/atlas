"""Independent terrain contact and route-surface sampling for the authoring scene."""
import bpy,json,math
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
D=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d');S=bpy.context.scene
def surface(objects):
 vs=[];faces=[]
 for o in objects:
  n=len(vs);vs.extend(o.matrix_world@v.co for v in o.data.vertices);faces.extend(tuple(n+i for i in p.vertices) for p in o.data.polygons)
 return BVHTree.FromPolygons(vs,faces)
bpy.context.view_layer.update()
stones=[o for o in S.objects if o.type=='MESH' and o.get('organicPathVersion')==173]
terrain=surface([o for o in S.objects if o.type=='MESH' and o.name.startswith(('Continuous forest terrain','Forest surrounding terrain'))])
paving=surface(stones)
def contact(bvh,x,y):return bvh.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))[0]
route=json.loads((D/'route.json').read_text())['route'];points=[Vector((p['position'][0],-p['position'][2])) for p in route]
samples=[]
for a,b in zip(points,points[1:]):
 t=(b-a).normalized();side=Vector((t.y,-t.x));n=math.ceil((b-a).length/.15)
 for j in range(n):
  for lateral in [-.9,-.6,-.3,0,.3,.6,.9]:
   p=a.lerp(b,j/n)+side*lateral
   if contact(paving,*p) is not None:samples.append(0);continue
   radius=.05
   while radius<.51:
    if any(contact(paving,p.x+radius*math.cos(k*math.tau/12),p.y+radius*math.sin(k*math.tau/12)) is not None for k in range(12)):break
    radius+=.05
   samples.append(radius)
report={'sampleCount':len(samples),'surfaceCoverage':sum(x==0 for x in samples)/len(samples),'maxJointRadius':max(samples),'mainStoneGrounding':[]}
for o in stones:
 if o.name.startswith('Temple stair') or o.get('pathCourse'):continue
 roots=[o.matrix_world@v.co for v in o.data.vertices if v.co.z<-.82]
 gaps=[p.z-contact(terrain,p.x,p.y).z for p in roots]
 report['mainStoneGrounding'].append({'name':o.name,'maxGap':max(gaps)})
assert max(x['maxGap'] for x in report['mainStoneGrounding'])<=.0001
(D/'atlas-organic-path-audit.json').write_text(json.dumps(report,indent=2))
print({k:v for k,v in report.items() if k!='mainStoneGrounding'})
