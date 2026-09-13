"""Broad authored terrain colors; no added geometry, textures, or object transforms."""
import bpy,json,math
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];D=R/'Levels/LVL-0001/3d';S=bpy.context.scene
assert S.get('atlas_temple_planted_v175') and not S.get('atlas_cohesion_v176')
source=(R/'scripts/atlas-premium-pass.py').read_text()
exec(source[source.index('def surface('):source.index('# Existing six')])
report={'terrain':[],'protected':{o.name:[list(r) for r in o.matrix_world] for o in S.objects if o.get('curatedSource')=='Pine1' or o.name in ['forestRune','zon','steen','templeGate door']}}
for o in terrainObjects:
 colors=o.data.color_attributes.get('Color');assert colors
 values=[]
 for v in o.data.vertices:
  p=o.matrix_world@v.co;dist,q,t=route(p)
  wave=.5+.24*math.sin(p.x*.33+p.y*.20)+.20*math.sin(p.y*.47-p.x*.13)
  moss=max(0,min(1,(wave-.27)*1.55))
  # Keep an earthen margin under the paving; mix moss across the banks and hills.
  moss*=max(0,min(1,(dist-1.1)/2.2))
  soil=Vector((.40,.31,.21));green=Vector((.28,.46,.15))
  c=soil.lerp(green,moss)
  # Broad cool pockets alternate with warm clearings, instead of tiny noisy flecks.
  shade=(.5+.5*math.sin(p.x*.24-p.y*.32))**3*.22
  c=c.lerp(Vector((.19,.30,.22)),shade)
  values.append((*c,1))
 for loop in o.data.loops:colors.data[loop.index].color=values[loop.vertex_index]
 report['terrain'].append({'name':o.name,'vertices':len(o.data.vertices)})
# Make the authoring graph express the same texture times vertex-color intent used by glTF.
m=bpy.data.materials['forrest_ground_01'];nodes=m.node_tree.nodes;links=m.node_tree.links
mix=nodes['Mix (Legacy)'];mix.blend_type='MULTIPLY';mix.inputs[0].default_value=1
links.new(nodes['Atlas lightweight painted soil'].outputs['Color'],mix.inputs[1])
links.new(nodes['Atlas authored soil palette'].outputs['Color'],mix.inputs[2])
links.new(mix.outputs[0],nodes['Principled BSDF'].inputs['Base Color'])
S['atlas_cohesion_v176']=True
(D/'atlas-cohesion-v176-ledger.json').write_text(json.dumps(report,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(D/'lvl0001-stylized.blend'))
print('TERRAIN COLORS',report['terrain'])
