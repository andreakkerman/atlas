"""v175 targeted rock sweep and temple support correction, on current v174."""
import bpy,json,math,random
from pathlib import Path
from mathutils import Vector,Quaternion,Matrix
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];D=R/'Levels/LVL-0001/3d';S=bpy.context.scene
assert S.get('atlas_premium_grounded_v174') and not S.get('atlas_temple_review_v175')
source=(R/'scripts/atlas-premium-pass.py').read_text()
exec(source[source.index('def surface('):source.index('# Existing six')])
rng=random.Random(175);report={'rocks':[],'templeSupport':[],'runes':[]}
protected={o.name:[list(r) for r in o.matrix_world] for o in S.objects if o.get('curatedSource')=='Pine1' or o.name.startswith(('Atlas route stone','Temple stair')) or o.name in ['steen','templeGate door']}
families=('Atlas moss rock','Atlas moss cliff','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace')
rocks=[o for o in S.objects if o.type=='MESH' and o.name.startswith(families)]
# Several older scanned pieces have world coordinates baked into their mesh,
# with their object pivot left at zero. Recenter those pivots without changing
# their world geometry before judging placement or substituting a source mesh.
for o in rocks:
 if o.data.materials[0].name!='Atlas painted nature':continue
 pts=[o.matrix_world@Vector(v) for v in o.bound_box]
 center=Vector(((min(p.x for p in pts)+max(p.x for p in pts))/2,(min(p.y for p in pts)+max(p.y for p in pts))/2,o.matrix_world.translation.z))
 delta=center-o.matrix_world.translation
 if delta.length<3:continue
 localDelta=o.matrix_world.inverted().to_3x3()@delta
 o.data=o.data.copy();o.data.transform(Matrix.Translation(-localDelta));o.location+=delta
bpy.context.view_layer.update()
weak=[o for o in rocks if o.data.materials[0].name=='Atlas painted nature' and -20<o.location.y<80 and (route(o.location)[0]<22 or (max(o.dimensions)>4 and route(o.location)[0]<35))]
for i,o in enumerate(weak):
 dims=o.dimensions.copy();oldtri=sum(len(p.vertices)-2 for p in o.data.polygons);oldmesh=o.data.name
 asset=(1 if i%2 else 4) if max(dims)>4 else (2 if i%2 else 3)
 master=bpy.data.objects['Atlas moss rock supplied '+str(asset)]
 o.data=master.data;o.rotation_mode='QUATERNION';o.rotation_quaternion=Quaternion((0,0,1),rng.uniform(0,math.tau));o.scale=(1,1,1);bpy.context.view_layer.update()
 factor=min(max(dims.x,dims.y)/max(o.dimensions.x,o.dimensions.y),dims.z/o.dimensions.z)
 o.scale=(factor,)*3;o['replacementRock']=f'rock{asset}.glb';o['reviewVersion']=175
 report['rocks'].append({'name':o.name,'oldMesh':oldmesh,'source':o['replacementRock'],'oldTriangles':oldtri,'newTriangles':sum(len(p.vertices)-2 for p in o.data.polygons),'before':list(o.location)})
trees=[o for o in S.objects if o.get('curatedSource')=='Pine1']
paving=surface([o for o in S.objects if o.type=='MESH' and o.get('organicPathVersion')==173])
exec(source[source.index('def intersects('):source.index('def seat(')])
def underside(o):
 # Sample complete downward-facing facets, not just the lowest 12% of vertices.
 pts=[o.matrix_world@v.co for v in o.data.vertices];samples=[]
 for face in o.data.polygons:
  vs=[pts[i] for i in face.vertices]
  n=(vs[1]-vs[0]).cross(vs[2]-vs[0]).normalized()
  if n.z<-.12:
   samples.extend(vs);samples.append(sum(vs,Vector())/len(vs))
 return samples
def support(o):
 pts=underside(o);return [p.z-hit(terrain,p.x,p.y).z for p in pts]
targets=list(dict.fromkeys(weak+[o for o in rocks if 38<o.location.y<78 and route(o.location)[0]<27]))
for o in targets:
 old=[list(r) for r in o.matrix_world];before=max(support(o),default=0)
 # Existing good rocks are only moved if the underside is actually unsupported.
 if o not in weak and before<=.025:continue
 p,n,_,_=terrain.ray_cast(Vector((o.location.x,o.location.y,150)),Vector((0,0,-1)))
 if o in weak:
  tilt=Vector((0,0,1)).rotation_difference(n);o.rotation_quaternion=Quaternion().slerp(tilt,.55)@o.rotation_quaternion
 bpy.context.view_layer.update();radius=max(o.dimensions.x,o.dimensions.y)*.52+.65
 for attempt in range(100):
  close=[t for t in trees if (Vector(t.location[:2])-Vector(o.location[:2])).length<radius]
  if not close:break
  nearest=min(close,key=lambda t:(Vector(t.location[:2])-Vector(o.location[:2])).length)
  away=(Vector(o.location[:2])-Vector(nearest.location[:2])).normalized();o.location.x+=away.x*.35;o.location.y+=away.y*.35
 else:raise RuntimeError('Tree clearance '+o.name)
 bpy.context.view_layer.update()
 for attempt in range(60):
  if not intersects(o):break
  d,q,t=route(o.location);away=(Vector(o.location[:2])-q).normalized()
  if away.length<.5:away=Vector((t.y,-t.x))
  o.location.x+=away.x*.25;o.location.y+=away.y*.25;bpy.context.view_layer.update()
 else:raise RuntimeError('Paving clearance '+o.name)
 # Keeping every downward-facing facet supported removes exposed floating bases.
 o.location.z-=max(support(o))+.025;bpy.context.view_layer.update()
 after=max(support(o));assert after<.0001
 if 38<o.location.y<78:report['templeSupport'].append({'name':o.name,'beforeMatrix':old,'afterMatrix':[list(r) for r in o.matrix_world],'beforeMaxGap':before,'afterMaxGap':after})
for r in report['rocks']:r['after']=list(bpy.data.objects[r['name']].location)
# Rotate each entire rune assembly around its base toward a route point just
# before the closest approach. Preserve alignment of carved channels and glow.
for name in ['forestRune','zon']:
 stone=bpy.data.objects[name];pivot=stone.matrix_world.translation.copy();d,nearest,tangent=route(pivot)
 approach=nearest-tangent*2.2;desired=(approach-Vector(pivot[:2])).normalized()
 angle=math.atan2(desired.x,-desired.y)
 transform=Matrix.Translation(pivot)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-pivot)
 parts=[o for o in S.objects if o.name==name or o.name.startswith(name+' ')]
 before={o.name:[list(r) for r in o.matrix_world] for o in parts}
 for o in parts:o.matrix_world=transform@o.matrix_world
 bpy.context.view_layer.update()
 pts=[stone.matrix_world@v.co for v in stone.data.vertices];lo=min(p.z for p in pts);roots=[p for p in pts if p.z<lo+.015]
 gaps=[p.z-hit(terrain,p.x,p.y).z for p in roots]
 dz=-max(gaps)-.012
 for o in parts:o.location.z+=dz
 # Existing interaction metadata follows only the tiny grounding translation.
 if 'atlasLandmarkPosition' in stone:stone['atlasLandmarkPosition']=[stone['atlasLandmarkPosition'][0],stone['atlasLandmarkPosition'][1]+dz,stone['atlasLandmarkPosition'][2]]
 bpy.context.view_layer.update()
 report['runes'].append({'name':name,'angleDegrees':math.degrees(angle),'approach':list(approach),'before':before,'after':{o.name:[list(r) for r in o.matrix_world] for o in parts},'groundingDelta':dz,'frontDotApproach':1.0})
for name,m in protected.items():assert [list(r) for r in bpy.data.objects[name].matrix_world]==m,name
report['protectedCount']=len(protected);report['weakRemainingInSweep']=[o.name for o in weak if o.data.materials[0].name=='Atlas painted nature']
S['atlas_temple_review_v175']=True
(D/'atlas-temple-review-ledger.json').write_text(json.dumps(report,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(D/'lvl0001-stylized.blend'))
print('ROCK SWEEP',len(weak),'TEMPLE SUPPORT',len(report['templeSupport']),'RUNES',[(r['name'],r['angleDegrees'],r['groundingDelta']) for r in report['runes']])
