"""Offline grass-width experiment. Keeps the active authoring scene untouched.

Run in Blender. Outputs one-mesh GLBs; splice only their grass Draco payload into
the current Atlas GLB with patch-atlas-grass.py. No runtime deformation or uploads.
"""
import bpy, json, contextlib, io
from pathlib import Path
from mathutils import Vector

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/grass-coverage'
OUT.mkdir(parents=True,exist_ok=True)
original=bpy.data.meshes['Atlas shared grass2 patch']
assert not original.get('atlasGrassCoverageVersion'), 'Open the pre-coverage checkpoint to reproduce candidates.'
assert len(original.vertices)==576 and len(original.polygons)==256
assert len(json.loads(original['sourceBladeNames']))==16

def broaden(mesh,factor):
    # The authored patch contains 16 independent 36-vertex blades. Welded,
    # each has three triangular cross sections and one tip. Keep the root and
    # tip exactly; widen the two upper cross sections in the horizontal plane.
    for start in range(0,576,36):
        vertices=list(mesh.vertices)[start:start+36]
        unique=sorted(set(tuple(v.co) for v in vertices),key=lambda p:p[2])
        assert len(unique)==10
        moved={}
        for row in [unique[3:6],unique[6:9]]:
            center=sum((Vector(p) for p in row),Vector())/3
            for p in row:
                moved[p]=(center.x+(p[0]-center.x)*factor,
                          center.y+(p[1]-center.y)*factor,p[2])
        for vertex in vertices:
            p=tuple(vertex.co)
            if p in moved:vertex.co=moved[p]
    mesh.update()

def area(mesh):
    mesh.calc_loop_triangles()
    return sum(t.area for t in mesh.loop_triangles)

scene=bpy.context.window.scene
report={'baselineArea':area(original),'candidates':[]}
for factor in [2.0,3.0]:
    mesh=original.copy();broaden(mesh,factor)
    temp=bpy.data.scenes.new('Grass coverage export')
    obj=bpy.data.objects.new('Grass coverage candidate',mesh);temp.collection.objects.link(obj)
    try:
        bpy.context.window.scene=temp
        with contextlib.redirect_stdout(io.StringIO()):
            bpy.ops.export_scene.gltf(filepath=str(OUT/f'blade-{factor:g}.glb'),
                export_format='GLB',use_active_scene=True,export_yup=True,
                export_apply=True,export_lights=False,export_cameras=False,
                export_extras=True,export_draco_mesh_compression_enable=True,
                export_draco_mesh_compression_level=6,export_draco_position_quantization=18,
                export_draco_normal_quantization=12,export_draco_texcoord_quantization=16,
                export_draco_color_quantization=10)
        report['candidates'].append({'factor':factor,'area':area(mesh),
            'areaRatio':area(mesh)/report['baselineArea'],
            'vertices':len(mesh.vertices),'triangles':len(mesh.loop_triangles),
            'heightUnchanged':all(a.co.z==b.co.z for a,b in zip(original.vertices,mesh.vertices)),
            'maxHorizontalDisplacement':max((a.co.xy-b.co.xy).length for a,b in zip(original.vertices,mesh.vertices))})
    finally:
        bpy.context.window.scene=scene
        bpy.data.objects.remove(obj,do_unlink=True)
        bpy.data.scenes.remove(temp)
        bpy.data.meshes.remove(mesh)
(OUT/'geometry.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report))
