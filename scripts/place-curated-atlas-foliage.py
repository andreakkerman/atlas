"""v165: intact user-supplied foliage, shared meshes and audited terrain contact.

Run in Blender against the v164 Atlas scene. Source GLBs are never written.
Only import transforms/root translations are baked; no topology/UV/material edits.
"""
import bpy, math, random, json, hashlib
from pathlib import Path
from mathutils import Vector, Matrix, Quaternion
from mathutils.bvhtree import BVHTree

ROOT = Path('D:/DevProjects/SvenAdventure')
R = ROOT/'Levels/LVL-0001/3d'
S = bpy.context.scene
assert Path(bpy.data.filepath).name == 'lvl0001-stylized.blend'
assert not S.get('atlas_curated_v165'), 'Already applied'
rng = random.Random(165)
keys = ['Fern', 'Pine1', 'Flower1', 'Flower2', 'Flower3']
for key in keys:
    if not any(o.get('curatedSource') == key for o in S.objects):
        before = set(S.objects)
        bpy.ops.import_scene.gltf(filepath=str(ROOT/'3dmodels'/f'{key}.glb'))
        for o in set(S.objects)-before: o['curatedSource'] = key

oldferns = [o for o in S.objects if o.type == 'MESH' and o.data.name.startswith('Atlas paired fern')]
oldtrees = [o for o in S.objects if o.name.startswith(('Faceted mature fir', 'Faceted young fir'))]
oldflowers = [o for o in S.objects if o.type == 'MESH' and o.data.name.startswith('Atlas woodland blossom')]
fern_candidates = [o.matrix_world.translation.copy() for o in oldferns]
flower_candidates = [o.matrix_world.translation.copy() for o in oldflowers]
tree_candidates = [(o.matrix_world.translation.copy(), o.name.startswith('Faceted mature fir')) for o in oldtrees]
remove = [o for o in S.objects if o.type == 'MESH' and (o.data.name.startswith(('Atlas paired fern', 'Atlas calm groundleaf', 'Atlas calm shrub', 'Atlas woodland blossom', 'Atlas calm crown')) or o.name.startswith('Faceted planted root collar'))]
protected = {o.name: [list(row) for row in o.matrix_world] for o in S.objects if o not in remove and not o.get('curatedSource')}
ledger = {'sources': {}, 'removed': {}, 'placements': [], 'rejected': {}, 'protectedObjects': len(protected)}
for o in remove:
    family = 'ferns' if o in oldferns else 'pines' if o in oldtrees else 'flowers' if o in oldflowers else 'groundcover/shrubs/root-collars'
    ledger['removed'][family] = ledger['removed'].get(family, 0)+1
    bpy.data.objects.remove(o, do_unlink=True)

# Raycast against real transformed terrain and rocky planting shelves, not a flat
# height approximation. No gameplay path, terrain or rock geometry is modified.
support_names = ('Continuous forest terrain', 'Forest surrounding terrain', 'Atlas moss rock', 'Atlas moss cliff', 'Opening fractured moss boulder', 'Enclosure outcrop', 'Grounded scanned bank', 'Scanned woodland cliff shelf', 'Lower enclosure rock terrace')
vs, fs = [], []
for o in S.objects:
    if o.type != 'MESH' or not o.name.startswith(support_names): continue
    off = len(vs)
    vs.extend(o.matrix_world @ v.co for v in o.data.vertices)
    fs.extend(tuple(off+i for i in p.vertices) for p in o.data.polygons)
support = BVHTree.FromPolygons(vs, fs)
def hit(x, y): return support.ray_cast(Vector((x, y, 150)), Vector((0, 0, -1)))[:2]
route = json.loads((R/'route.json').read_text())
ps = [Vector((p['position'][0], -p['position'][2])) for p in route['route']]
def route_distance(p):
    p = Vector(p[:2])
    return min((p-a-(b-a)*max(0, min(1, (p-a).dot(b-a)/(b-a).length_squared))).length for a, b in zip(ps, ps[1:]))

masters, root_vertices = {}, {}
for key in keys:
    source = next(o for o in S.objects if o.type == 'MESH' and o.get('curatedSource') == key)
    mesh = source.data.copy()
    mesh.name = 'Curated source '+key
    mesh.transform(source.matrix_world)
    points = [v.co.copy() for v in mesh.vertices]
    low, high = min(v.z for v in points), max(v.z for v in points)
    base = [v for v in points if v.z < low+(high-low)*.015]
    # Fern's lowest vertex is a drooping leaf, NOT its root. The stems converge
    # at source origin. Trees/flowers use their actual bottom stem footprint.
    pivot = Vector((0, 0, 0)) if key == 'Fern' else Vector((sum(v.x for v in base)/len(base), sum(v.y for v in base)/len(base), low))
    mesh.transform(Matrix.Translation(-pivot))
    masters[key] = mesh
    root_vertices[key] = [v.co.copy() for v in mesh.vertices if (v.co.length < .25 if key == 'Fern' else v.co.z < (high-low)*.015)]
    assert root_vertices[key]
    # Preserve every vertex, polygon, UV layer and source material slot.
    assert len(mesh.vertices) == len(source.data.vertices)
    assert all((v.co-(source.matrix_world @ original.co-pivot)).length < 1e-5 for v, original in zip(mesh.vertices, source.data.vertices))
    ledger['sources'][key] = {'sha256': hashlib.sha256((ROOT/'3dmodels'/f'{key}.glb').read_bytes()).hexdigest(), 'triangles': sum(len(p.vertices)-2 for p in mesh.polygons), 'vertices': len(mesh.vertices), 'materials': [m.name for m in mesh.materials], 'pivotTranslation': list(-pivot), 'geometryUnchanged': True}
for o in list(S.objects):
    if o.get('curatedSource'): bpy.data.objects.remove(o, do_unlink=True)

placed_xy = {'Fern': [], 'Pine1': [], 'flowers': []}
def place(key, candidate, scale, angle):
    point, normal = hit(candidate.x, candidate.y)
    if point is None: return False
    tree = key == 'Pine1'
    if normal.z < (.90 if tree else .84): return False
    # Trees stay upright. Low plants follow the actual surface tangent.
    orientation = (Quaternion() if tree else Vector((0, 0, 1)).rotation_difference(normal)) @ Quaternion((0, 0, 1), angle)
    local_roots = [orientation @ (v*scale) for v in root_vertices[key]]
    gaps = []
    for v in local_roots:
        q, _ = hit(point.x+v.x, point.y+v.y)
        if q is None: return False
        gaps.append(point.z+v.z-q.z)
    limit = .24 if tree else .075
    if max(gaps)-min(gaps) > limit: return False
    # Sink the highest root edge by 8 mm, keeping all root contacts supported.
    offset = -max(gaps)-.008
    position = point+Vector((0, 0, offset))
    mesh = masters[key]
    worst_depth = 0
    for v in mesh.vertices:
        # Ignore pine canopy high above the ground, inspect every low vertex.
        if tree and v.co.z*scale > 1: continue
        world = position+orientation @ (v.co*scale)
        q, _ = hit(world.x, world.y)
        if q is None: return False
        depth = q.z-world.z
        worst_depth = max(worst_depth, depth)
        if depth > (.27 if tree else .095): return False
    family = key if key in ['Fern', 'Pine1'] else 'flowers'
    spacing = 3.2 if tree else 1.25 if key == 'Fern' else .7
    if any((position-previous).length < spacing for previous in placed_xy[family]): return False
    o = bpy.data.objects.new('Curated '+key, mesh)
    S.collection.objects.link(o)
    o.location = position; o.rotation_mode = 'QUATERNION'; o.rotation_quaternion = orientation; o.scale = (scale,)*3
    o['curatedSource'] = key; o['groundingVersion'] = 165
    placed_xy[family].append(position.copy())
    ledger['placements'].append({'name': o.name, 'source': key, 'position': list(position), 'scale': scale, 'maxRootGap': max(gaps)+offset, 'minRootGap': min(gaps)+offset, 'maxTerrainPenetration': worst_depth, 'slopeDegrees': math.degrees(math.acos(min(1, normal.z)))})
    return True

# Keep authored forest frames; search locally when a former root was on a cliff
# edge. Reject a bad location instead of hiding half a plant below the surface.
for p, mature in tree_candidates:
    scale = rng.uniform(1.75, 2.05) if mature else rng.uniform(.55, .76)
    success = False
    for attempt in range(49):
        a = attempt*2.399963; radius = 0 if attempt == 0 else .55*math.sqrt(attempt)
        q = p+Vector((math.cos(a)*radius, math.sin(a)*radius, 0))
        if route_distance(q) < (3.0 if mature else 2.25): continue
        if place('Pine1', q, scale, rng.uniform(0, math.tau)): success = True; break
    if not success: ledger['rejected']['Pine1'] = ledger['rejected'].get('Pine1', 0)+1
rng.shuffle(fern_candidates)
for p in fern_candidates:
    distance = route_distance(p)
    if not 1.9 < distance < 20: continue
    # Broad patch/gap rhythm, not a uniform carpet; use existing authored sites.
    if math.sin(p.x*.49+p.y*.19)+math.cos(p.y*.43-p.x*.17) < -.3: continue
    if len(placed_xy['Fern']) >= 360: break
    place('Fern', p, rng.uniform(.17, .23), rng.uniform(0, math.tau))
rng.shuffle(flower_candidates)
for i, p in enumerate(flower_candidates):
    if not 1.65 < route_distance(p) < 16: continue
    if len(placed_xy['flowers']) >= 90: break
    key = keys[2+i%3]
    height = max(v.co.z for v in masters[key].vertices)
    scale = rng.uniform(.38, .56)/height
    for attempt in range(5):
        q = p+Vector((math.sin(attempt*2.4)*attempt*.22, math.cos(attempt*2.4)*attempt*.22, 0))
        if place(key, q, scale, rng.uniform(0, math.tau)): break

bpy.context.view_layer.update()
for name, matrix in protected.items(): assert [list(row) for row in S.objects[name].matrix_world] == matrix, name
assert len(placed_xy['Fern']) >= 120
assert all(any(p['source'] == key for p in ledger['placements']) for key in keys)
ledger['counts'] = {key: sum(p['source'] == key for p in ledger['placements']) for key in keys}
ledger['realSHA256'] = hashlib.sha256((R/'real-3d.glb').read_bytes()).hexdigest()
ledger['routeSHA256'] = hashlib.sha256((R/'route.json').read_bytes()).hexdigest()
(R/'atlas-curated-ledger.json').write_text(json.dumps(ledger, indent=2))
S['atlas_curated_v165'] = True
bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'))
print(json.dumps({'counts': ledger['counts'], 'removed': ledger['removed'], 'rejected': ledger['rejected'], 'protected': len(protected)}))
