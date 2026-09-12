"""v168 delta: current curated scene only; shared supplied rocks and targeted contacts."""
import bpy, json, math, contextlib, io
from pathlib import Path
from mathutils import Vector, Quaternion, Matrix
from mathutils.bvhtree import BVHTree
R=Path('D:/DevProjects/SvenAdventure');D=R/'Levels/LVL-0001/3d';S=bpy.context.scene
assert S.get('atlas_grass_v166') and not S.get('atlas_evening_v168')
ledger=json.loads((D/'atlas-curated-ledger.json').read_text())
report={'moved':[],'rocks':[],'protected':{o.name:[list(row) for row in o.matrix_world] for o in S.objects if o.name in ['forestRune','zon','steen','templeGate door'] or o.name.startswith('Temple stair')}}
def surface(prefix):
 vs=[];fs=[]
 for o in S.objects:
  if o.type!='MESH' or not o.name.startswith(prefix):continue
  off=len(vs);vs.extend(o.matrix_world@v.co for v in o.data.vertices);fs.extend(tuple(off+i for i in p.vertices) for p in o.data.polygons)
 return BVHTree.FromPolygons(vs,fs)
terrain=surface(('Continuous forest terrain','Forest surrounding terrain'))
def hit(bvh,x,y):return bvh.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))[0]
# One common opaque 512px palette; supplied geometry stays intact.
sources=[]
for i in range(1,5):
 before=set(bpy.data.objects)
 with contextlib.redirect_stdout(io.StringIO()):bpy.ops.import_scene.gltf(filepath=str(R/f'3dmodels/rock{i}.glb'))
 sources.append(next(o for o in set(bpy.data.objects)-before if o.type=='MESH'))
mat=sources[0].data.materials[0];mat.name='Atlas boulder palette'
bsdf=next(n for n in mat.node_tree.nodes if n.type=='BSDF_PRINCIPLED');bsdf.inputs['Metallic'].default_value=0;bsdf.inputs['Roughness'].default_value=.94
im=next(n.image for n in mat.node_tree.nodes if n.type=='TEX_IMAGE');im.scale(512,512);im.name='Atlas shared boulder palette 512';im.pack()
# Replace weak existing stones, retaining the established route-side composition.
targets=['Atlas moss rock.009','Atlas moss rock.003','Atlas moss rock.013','Atlas moss rock.016']
sites=[(9.06,5,1.05),(-.5,18,.85),(1.6,31.3,.9),(8.3,50,.8)]
for i,(o,target) in enumerate(zip(sources,targets),1):
 old=bpy.data.objects[target];x,y,scale=sites[i-1]
 transform=o.matrix_world.copy();o.data.transform(transform);o.parent=None;o.matrix_world=Matrix.Identity(4)
 o.data.materials.clear();o.data.materials.append(mat)
 o.name=f'Atlas moss rock supplied {i}';o['suppliedRock']=f'rock{i}.glb'
 for polygon in o.data.polygons:polygon.use_smooth=False
 o.scale=(scale,)*3;o.rotation_euler.z=i*.73;o.location=(x,y,0);bpy.context.view_layer.update()
 points=[o.matrix_world@v.co for v in o.data.vertices];low=min(p.z for p in points);high=max(p.z for p in points)
 base=[p for p in points if p.z<low+(high-low)*.22]
 offsets=[hit(terrain,p.x,p.y).z-p.z for p in base]
 o.location.z=min(offsets)-.035;bpy.context.view_layer.update()
 report['rocks'].append({'name':o.name,'source':o['suppliedRock'],'replaced':target,'position':list(o.location),'triangles':sum(len(p.vertices)-2 for p in o.data.polygons),'baseMaximumGap':-.035})
 bpy.data.objects.remove(old,do_unlink=True)
report['removedOverlappingRocks']=['Atlas moss rock.011','Atlas moss rock.034','Atlas moss rock.105','Atlas moss rock.114']
for name in report['removedOverlappingRocks']:bpy.data.objects.remove(bpy.data.objects[name],do_unlink=True)
prefix=('Continuous forest terrain','Forest surrounding terrain','Atlas moss rock','Atlas moss cliff','Opening fractured moss boulder','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace')
ground=surface(prefix)
route=json.loads((D/'route.json').read_text());ps=[Vector((p['position'][0],-p['position'][2])) for p in route['route']]
def route_distance(p):
 p=Vector(p[:2]);return min((p-a-(b-a)*max(0,min(1,(p-a).dot(b-a)/(b-a).length_squared))).length for a,b in zip(ps,ps[1:]))
heroes=[bpy.data.objects[n].matrix_world.translation.copy() for n in ['forestRune','zon','steen']]
pines=[o for o in S.objects if o.get('curatedSource')=='Pine1']
def candidate(o,x,y):
 key=o['curatedSource'];p,n,_,_=ground.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))
 if p is None or n.z<(.9 if key=='Pine1' else .8):return None
 if 11.5<x<26.5 and 56.5<y<68.5:return None
 if route_distance((x,y))< (3.5 if key=='Pine1' else .9):return None
 if any((p.xy-h.xy).length<(3.1 if key=='Pine1' else 1.1) for h in heroes):return None
 if key=='Pine1' and any(t!=o and (p.xy-t.location.xy).length<7.05 for t in pines):return None
 q=o.rotation_quaternion.copy() if key=='Pine1' else Vector((0,0,1)).rotation_difference(n)
 h=max(v.co.z for v in o.data.vertices);roots=[v.co for v in o.data.vertices if (v.co.length<.25 if key=='Fern' else v.co.z<h*.015)]
 gaps=[]
 for v in roots:
  pt=p+q@(v*o.scale.x);contact=hit(ground,pt.x,pt.y)
  if contact is None:return None
  gaps.append(pt.z-contact.z)
 if max(gaps)-min(gaps)>(.23 if key=='Pine1' else .065):return None
 p.z-=max(gaps)+.008
 depth=0
 for v in o.data.vertices:
  if key=='Pine1' and v.co.z*o.scale.x>1:continue
  pt=p+q@(v.co*o.scale.x);contact=hit(ground,pt.x,pt.y)
  if contact is None:return None
  depth=max(depth,contact.z-pt.z)
  if depth>(.27 if key=='Pine1' else .09):return None
 return p,q,min(gaps)-max(gaps)-.008,depth
for rec in ledger['placements']:
 o=bpy.data.objects[rec['name']];key=o['curatedSource'];h=max(v.co.z for v in o.data.vertices)
 roots=[o.matrix_world@v.co for v in o.data.vertices if (v.co.length<.25 if key=='Fern' else v.co.z<h*.015)]
 gaps=[p.z-hit(ground,p.x,p.y).z for p in roots]
 intersects=(key=='Pine1' and any((o.location.xy-h.xy).length<3.1 for h in heroes)) or (11.5<o.location.x<26.5 and 56.5<o.location.y<68.5)
 if not intersects and max(gaps)<=.0001 and min(gaps)>=(-.25 if key=='Pine1' else -.085):continue
 old=list(o.location);result=None
 for radius in ([3,4,5,6,8,10,12,15,18,22,28,35,45] if key=='Pine1' else [.5,1,1.5,2,3,4,5,6,8,10,12]):
  for a in range(24):
   angle=a*math.tau/24;result=candidate(o,old[0]+math.cos(angle)*radius,old[1]+math.sin(angle)*radius)
   if result:break
  if result:break
 if not result and key=='Pine1':
  sites=sorted(((x,y) for x in range(-65,66) for y in range(-35,111)),key=lambda xy:(xy[0]-old[0])**2+(xy[1]-old[1])**2)
  for x,y in sites:
   result=candidate(o,x,y)
   if result:break
 assert result,('no safe site',o.name)
 p,q,gap,depth=result;o.location=p;o.rotation_mode='QUATERNION';o.rotation_quaternion=q;o['groundingVersion']=168
 rec.update(position=list(p),maxRootGap=-.008,minRootGap=gap,maxTerrainPenetration=depth)
 reason='temple footprint clearance' if 11.5<old[0]<26.5 and 56.5<old[1]<68.5 else 'rune trunk clearance' if intersects else 'changed rock surface contact'
 report['moved'].append({'name':o.name,'before':old,'after':list(p),'reason':reason})
bpy.context.view_layer.update()
for name,matrix in report['protected'].items():assert [list(row) for row in bpy.data.objects[name].matrix_world]==matrix
# Replace the existing map, retaining one 512px base color and existing UVs.
im=bpy.data.images.load(str(R/'output/evening-v168-backup/woodland-source.png'),check_existing=False);im.scale(512,512);im.name='Atlas evening floor v168';im.colorspace_settings.name='sRGB'
im.filepath_raw=str(R/'assets/textures/atlas-evening-floor-512.png');im.file_format='PNG';im.save();im.pack()
m=bpy.data.materials['forrest_ground_01'];m.node_tree.nodes['Atlas lightweight painted soil'].image=im;m['atlasFloorVersion']='evening-v168'
S['atlas_evening_v168']=True
(D/'atlas-curated-ledger.json').write_text(json.dumps(ledger,indent=2));(D/'atlas-evening-ledger.json').write_text(json.dumps(report,indent=2))
print(json.dumps({'rocks':report['rocks'],'moved':report['moved']}))

