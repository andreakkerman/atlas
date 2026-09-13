"""v174 review correction: slope-fit moved plants, preserve established tree bases."""
import bpy,json,math,random,contextlib,io,bmesh
import numpy as np
from pathlib import Path
from mathutils import Vector,Quaternion
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];D=R/'Levels/LVL-0001/3d';S=bpy.context.scene
assert S.get('atlas_premium_v174') and not S.get('atlas_premium_grounded_v174')
source=(R/'scripts/atlas-premium-pass.py').read_text()
exec(source[source.index('def surface('):source.index('# Existing six')])
report=json.loads((D/'atlas-premium-ledger.json').read_text());rng=random.Random(1742)
protected={o.name:[list(r) for r in o.matrix_world] for o in S.objects if o.name in ['forestRune','zon','steen','templeGate door'] or o.name.startswith(('Temple stair','Faceted mature fir')) or o.get('curatedSource')=='Pine1'}
for name in ['Atlas moss rock.094','Atlas moss rock.254']:
 o=bpy.data.objects[name];tree=bpy.data.objects['Curated Pine1.004'];v=Vector(o.location[:2])-Vector(tree.location[:2]);v.normalize();o.location.x+=v.x*1.4;o.location.y+=v.y*1.4
# A few retained border boulders also have the rejected painted faces.
extra=[o for o in S.objects if o.type=='MESH' and o.name.startswith('Enclosure outcrop') and route(o.location)[0]<16 and -10<o.location.y<56]
extra += [bpy.data.objects[n] for n in ['Atlas moss cliff.001','Atlas moss cliff.009']]
for i,o in enumerate(extra):
 dims=o.dimensions.copy();oldmesh=o.data.name;oldtri=sum(len(p.vertices)-2 for p in o.data.polygons);asset=1 if i%2 else 4
 o.data=bpy.data.objects['Atlas moss rock supplied '+str(asset)].data;o.rotation_mode='XYZ';o.rotation_euler=(0,0,rng.uniform(0,math.tau));o.scale=(1,1,1);bpy.context.view_layer.update()
 factor=min(max(dims.x,dims.y)/max(o.dimensions.x,o.dimensions.y),dims.z/o.dimensions.z);o.scale=(factor,)*3
 o['replacementRock']=f'rock{asset}.glb';o['premiumVersion']=174
 report['rocks'].append({'name':o.name,'oldMesh':oldmesh,'source':o['replacementRock'],'oldTriangles':oldtri,'newTriangles':342,'closed':True})
trees=[o for o in S.objects if o.get('curatedSource')=='Pine1' or o.name.startswith('Faceted mature fir')]
for o in [o for o in S.objects if o.get('premiumVersion')==174]:
 bpy.context.view_layer.update();radius=max(o.dimensions.x,o.dimensions.y)*.55+.7
 for attempt in range(100):
  close=[t for t in trees if (Vector(t.location[:2])-Vector(o.location[:2])).length<radius]
  if not close:break
  nearest=min(close,key=lambda t:(Vector(t.location[:2])-Vector(o.location[:2])).length)
  away=Vector(o.location[:2])-Vector(nearest.location[:2]);away.normalize()
  o.location.x+=away.x*.4;o.location.y+=away.y*.4
 else:raise RuntimeError('No tree clearance for '+o.name)
 bpy.context.view_layer.update();pts=[o.matrix_world@v.co for v in o.data.vertices];lo=min(p.z for p in pts);roots=[p for p in pts if p.z<lo+.12*o.dimensions.z]
 o.location.z-=max(p.z-hit(terrain,p.x,p.y).z for p in roots)+.035
bpy.context.view_layer.update()
ground=surface([o for o in S.objects if o.type=='MESH' and o.name.startswith(('Continuous forest terrain','Forest surrounding terrain','Atlas moss rock','Atlas moss cliff','Opening fractured moss boulder','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace'))])
paving=surface([o for o in S.objects if o.type=='MESH' and o.get('organicPathVersion')==173])
exec(source[source.index('def intersects('):source.index('# Reuse 180')])
def roots(o):
 h=max(v.co.z for v in o.data.vertices)
 return [v.co for v in o.data.vertices if (v.co.length<.25 if o.get('curatedSource')=='Fern' else v.co.z<h*.015)]
def gaps(o):
 pts=[o.matrix_world@v for v in roots(o)]
 return [p.z-hit(ground,p.x,p.y).z for p in pts]
def candidate(o,x,y,angle):
 key=o['curatedSource'];p,n,_,_=ground.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))
 if p is None or n.z<.8 or route((x,y))[0]<2.6:return None
 if 11.5<x<26.5 and 56.5<y<68.5:return None
 q=Vector((0,0,1)).rotation_difference(n)@Quaternion((0,0,1),angle);scale=o.scale.x
 values=[]
 for v in roots(o):
  pt=p+q@(v*scale);contact=hit(ground,pt.x,pt.y)
  if contact is None:return None
  values.append(pt.z-contact.z)
 if max(values)-min(values)>.065:return None
 p.z-=max(values)+.008;depth=0
 for v in o.data.vertices:
  pt=p+q@(v.co*scale);contact=hit(ground,pt.x,pt.y)
  if contact is None:return None
  depth=max(depth,contact.z-pt.z)
  if depth>.09:return None
 return p,q,min(values)-max(values)-.008,depth
ledger=json.loads((D/'atlas-curated-ledger.json').read_text());fixed=[]
for rec in ledger['placements']:
 o=bpy.data.objects[rec['name']];values=gaps(o);key=rec['source']
 insideTemple=11.5<o.location.x<26.5 and 56.5<o.location.y<68.5
 if max(values)<=.0001 and min(values)>=(-.25 if key=='Pine1' else -.085) and not insideTemple:continue
 assert key!='Pine1',('Tree still intersects replacement rock',o.name,min(values))
 old=o.location.copy();oldq=o.rotation_quaternion.copy()
 for i in range(360):
  a=rng.uniform(0,math.tau);radius=0 if i==0 else .2+math.sqrt(i/360)*5
  result=candidate(o,old.x+math.cos(a)*radius,old.y+math.sin(a)*radius,oldq.to_euler().z)
  if result is None:continue
  p,q,gap,depth=result;o.location=p;o.rotation_mode='QUATERNION';o.rotation_quaternion=q;bpy.context.view_layer.update()
  if intersects(o):continue
  rec.update(position=list(p),rotation=list(q),maxRootGap=-.008,minRootGap=gap,maxTerrainPenetration=depth)
  fixed.append({'name':o.name,'before':list(old),'after':list(p)});break
 else:raise RuntimeError('No seated footprint '+o.name)
report['slopeCorrections']=fixed
plants=[o for o in S.objects if o.type=='MESH' and (o.get('curatedSource') in ['Fern','grass2','Flower1','Flower2','Flower3'] or o.name.startswith(('Grass','Paving edge tuft','Sorrel in paving joint','Path bank community','Rich route understory')))]
assert not any(intersects(o) for o in plants)
# Existing ground vertex colors gain broad, restrained olive islands around
# fern/grass clusters, tying bare soil to the same vegetation palette.
anchors=[o.location.copy() for o in plants if o.get('curatedSource')=='Fern' and 3<route(o.location)[0]<15]
for o in terrainObjects:
 colors=o.data.color_attributes.get('Color')
 if not colors:continue
 factors=[]
 for v in o.data.vertices:
  p=o.matrix_world@v.co;d=min(((p.x-a.x)**2+(p.y-a.y)**2 for a in anchors),default=100)
  factors.append(max(0,1-d/12)*.22)
 for loop in o.data.loops:
  f=factors[loop.vertex_index];c=colors.data[loop.index].color
  colors.data[loop.index].color=(c[0]*(1+f*.05),c[1]*(1+f*.65),c[2]*(1-f*.15),c[3])
report['floorVertexClusterTint']=True
S['atlas_premium_grounded_v174']=True
# Re-bake the static contact map and export using the first pass's exact settings.
exec(source[source.index('# Offline 1024-square'):])
print('SLOPE CORRECTIONS',len(fixed),'extra rocks',len(extra))
