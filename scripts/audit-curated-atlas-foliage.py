"""Independent post-placement audit of actual Blender world-space root contacts."""
import bpy, json
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R = Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d')
S = bpy.context.scene
vs, faces = [], []
for o in S.objects:
    if o.type != 'MESH' or not o.name.startswith(('Continuous forest terrain', 'Forest surrounding terrain', 'Atlas moss rock', 'Atlas moss cliff', 'Opening fractured moss boulder', 'Enclosure outcrop', 'Grounded scanned bank', 'Scanned woodland cliff shelf', 'Lower enclosure rock terrace')): continue
    offset = len(vs); vs.extend(o.matrix_world @ v.co for v in o.data.vertices)
    faces.extend(tuple(offset+i for i in p.vertices) for p in o.data.polygons)
surface = BVHTree.FromPolygons(vs, faces)
results = []
for o in S.objects:
    key = o.get('curatedSource')
    if not key: continue
    assert o.type == 'MESH'
    assert max(o.scale)-min(o.scale) < 1e-6
    h = max(v.co.z for v in o.data.vertices)
    roots = [v for v in o.data.vertices if (v.co.length < .25 if key == 'Fern' else v.co.z < h*.015)]
    gaps = []
    for v in roots:
        p = o.matrix_world @ v.co
        contact = surface.ray_cast(Vector((p.x, p.y, 150)), Vector((0, 0, -1)))[0]
        assert contact is not None, o.name
        gaps.append(p.z-contact.z)
    assert max(gaps) <= .0001, (o.name, 'floating root', max(gaps))
    assert min(gaps) >= (-.25 if key == 'Pine1' else -.085), (o.name, 'buried root', min(gaps))
    results.append({'name': o.name, 'rootSamples': len(gaps), 'minGap': min(gaps), 'maxGap': max(gaps)})
ledger = json.loads((R/'atlas-curated-ledger.json').read_text())
assert len(results) == len(ledger['placements'])
report = {'objects': len(results), 'rootSamples': sum(r['rootSamples'] for r in results), 'maximumRootGap': max(r['maxGap'] for r in results), 'minimumRootGap': min(r['minGap'] for r in results), 'failures': 0, 'results': results}
(R/'atlas-curated-grounding.json').write_text(json.dumps(report, indent=2))
print(json.dumps({k:v for k,v in report.items() if k != 'results'}))
