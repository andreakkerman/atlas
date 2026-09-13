"""Read-only authoring audit of a broader shared grass mesh against the path."""
import bpy,json,math
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[1];S=bpy.context.scene
source=(ROOT/'scripts/atlas-grass-coverage-candidates.py').read_text()
exec(source[source.index('def broaden('):source.index('scene=bpy.context.window.scene')])
source=(ROOT/'scripts/atlas-premium-pass.py').read_text()
R=ROOT;D=R/'Levels/LVL-0001/3d'
exec(source[source.index('def surface('):source.index('# Existing six')])
paving=surface([o for o in S.objects if o.type=='MESH' and o.get('organicPathVersion')==173])
grass=[o for o in S.objects if o.get('curatedSource')=='grass2']
original=grass[0].data
assert not original.get('atlasGrassCoverageVersion'), 'Audit from the pre-coverage checkpoint.'
assert len(grass)==4000 and all(o.data==original for o in grass)
factor=globals().get('FACTOR',3)
candidate=original.copy();broaden(candidate,factor)
roots=[]
for start in range(0,576,36):
    root=set(sorted(set(tuple(v.co) for v in list(original.vertices)[start:start+36]),key=lambda p:p[2])[:3])
    roots.extend(i for i in range(start,start+36) if tuple(original.vertices[i].co) in root)
assert all(original.vertices[i].co==candidate.vertices[i].co for i in roots)
report={'factor':factor,'instances':4000,'rootVertexChanges':0,'allVertexHeightsUnchanged':all(a.co.z==b.co.z for a,b in zip(original.vertices,candidate.vertices)),
        'pathConflictsBefore':[],'pathConflictsAfter':[],'runeConflictsBefore':[],'runeConflictsAfter':[]}
stones=[]
for name in ['forestRune','zon']:
    o=bpy.data.objects[name];bb=[Vector(v) for v in o.bound_box]
    stones.append((o.matrix_world.inverted(),[min(v[k] for v in bb) for k in range(3)],[max(v[k] for v in bb) for k in range(3)]))
try:
    for label,mesh in [('Before',original),('After',candidate)]:
        for o in grass:
            points=[o.matrix_world@v.co for v in mesh.vertices]
            if route(o.location)[0]<max(o.dimensions.x,o.dimensions.y)+3.1:
                probes=points+[(points[e.vertices[0]]+points[e.vertices[1]])*.5 for e in mesh.edges]
                if any(hit(paving,p.x,p.y) is not None for p in probes):report['pathConflicts'+label].append(o.name)
            for inv,lo,hi in stones:
                conflict=False
                for p in points:
                    q=inv@p
                    if lo[0]-.12<q.x<hi[0]+.12 and lo[1]-.22<q.y<hi[1]+.22 and lo[2]<q.z<hi[2]:conflict=True;break
                if conflict:report['runeConflicts'+label].append(o.name);break
finally:bpy.data.meshes.remove(candidate)
(ROOT/f'output/grass-coverage/grounding-{factor:g}.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report))
assert not report['pathConflictsAfter'] and not report['runeConflictsAfter'],report
