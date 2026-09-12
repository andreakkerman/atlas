"""Unify canopy colours; let shape/light, rather than random paint, create facets."""
import bpy,json
from pathlib import Path
R=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d');S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend' and not S.get('atlas_palette_v162')
seen=set();painted=0
for o in S.objects:
 if o.type!='MESH' or not o.name.startswith(('Faceted mature fir','Faceted young fir')) or o.data in seen:continue
 seen.add(o.data);m=o.data;col=m.color_attributes.get('Color')
 if not col:continue
 for p in m.polygons:
  for i in p.loop_indices:
   c=col.data[i].color
   if c[1]>c[0]*1.12:
    # Compress the former 2.75:1 painted-value range. Natural normals retain
    # the deliberate low-poly silhouette and directional-light variation.
    factor=.91+min(.22,c[1]*.55);col.data[i].color=(.125*factor,.23*factor,.043*factor,1);painted+=1
ledger=json.loads((R/'atlas-art-ledger.json').read_text());ledger['harmonizedCanopyMeshes']=len(seen)
(R/'atlas-art-ledger.json').write_text(json.dumps(ledger,indent=2));S['atlas_palette_v162']=True
bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'));print('Canopy meshes',len(seen),'painted corners',painted)
