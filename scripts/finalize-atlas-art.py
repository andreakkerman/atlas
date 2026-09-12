"""Finish the Atlas-only art checkpoint after runtime visual review."""
import bpy,json,random
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1]/'Levels/LVL-0001/3d'
S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
assert not S.get('atlas_finish_v162')
o=bpy.data.objects.get('Atlas sunlight haze')
if o:bpy.data.objects.remove(o,do_unlink=True)
# Keep the actual authored palette connected to the export material.
m=bpy.data.materials['forrest_ground_01'];nodes=m.node_tree.nodes;links=m.node_tree.links
if not nodes.get('Atlas authored soil palette'):
 bs=next(n for n in nodes if n.type=='BSDF_PRINCIPLED');source=bs.inputs['Base Color'].links[0].from_socket
 color=nodes.new('ShaderNodeVertexColor');color.layer_name='Color';color.name='Atlas authored soil palette'
 mix=nodes.new('ShaderNodeMixRGB');mix.blend_type='MULTIPLY';mix.inputs[0].default_value=1
 links.new(source,mix.inputs[1]);links.new(color.outputs['Color'],mix.inputs[2]);links.new(mix.outputs[0],bs.inputs['Base Color'])
for m in [m for m in bpy.data.meshes if m.name.startswith('Atlas feather fern')]:
 for frond in range(6):
  for k in range(7):
   for start in [frond*208+k*28+4,frond*208+k*28+16]:
    mid=(m.vertices[start+1].co+m.vertices[start+5].co)*.5
    for i in [1,5,7,9]:m.vertices[start+i].co=mid+(m.vertices[start+i].co-mid)*1.5
 m.update()
terrain=S.objects['Continuous forest terrain'];verts=[terrain.matrix_world@v.co for v in terrain.data.vertices]
support=BVHTree.FromPolygons(verts,[list(p.vertices) for p in terrain.data.polygons])
shrubs=sorted([m for m in bpy.data.meshes if m.name.startswith('Atlas rounded bilberry')],key=lambda m:m.name)
changed=[]
for i,o in enumerate([o for o in S.objects if o.name.startswith('Broadleaf hazel sapling')]):
 o.data=shrubs[i%len(shrubs)];r=random.Random(920+i);scale=r.uniform(1.6,2.5);o.scale=(scale,scale,scale*1.15)
 hit=support.ray_cast(Vector((o.location.x,o.location.y,150)),Vector((0,0,-1)))[0]
 if hit is not None:o.location.z=hit.z-.025
 changed.append(o.name)
ledger=json.loads((R/'atlas-art-ledger.json').read_text())
ledger.update({'hazeRibbons':0,'hazeTriangles':0,'hazeMaterials':0,'hazeRejected':'Static ribbons rejected in runtime review; removed','replacedHazels':changed,'objectsAfter':len(S.objects)})
(R/'atlas-art-ledger.json').write_text(json.dumps(ledger,indent=2))
S['atlas_finish_v162']=True
bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'))
print('Replaced noisy hazels',len(changed))
