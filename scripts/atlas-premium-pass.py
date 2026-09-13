"""Targeted v174 delta. Run on the preserved v173 Blender scene; never Real 3D."""
import bpy,bmesh,json,math,random,contextlib,io
import numpy as np
from pathlib import Path
from mathutils import Vector,Quaternion
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];D=R/'Levels/LVL-0001/3d';S=bpy.context.scene
assert S.get('atlas_step_caps_v173') and not S.get('atlas_premium_v174')
rng=random.Random(174);report={'rocks':[],'edges':[],'plants':[]}
protected={o.name:[list(r) for r in o.matrix_world] for o in S.objects if o.name in ['forestRune','zon','steen','templeGate door'] or o.name.startswith(('Temple stair','Faceted mature fir')) or o.get('curatedSource')=='Pine1'}
def surface(objects):
 vs=[];fs=[]
 for o in objects:
  n=len(vs);vs.extend(o.matrix_world@v.co for v in o.data.vertices);fs.extend(tuple(n+i for i in p.vertices) for p in o.data.polygons)
 return BVHTree.FromPolygons(vs,fs)
terrainObjects=[o for o in S.objects if o.type=='MESH' and o.name.startswith(('Continuous forest terrain','Forest surrounding terrain'))]
terrain=surface(terrainObjects)
def hit(bvh,x,y):return bvh.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))[0]
ps=[Vector((p['position'][0],-p['position'][2])) for p in json.loads((D/'route.json').read_text())['route']]
def route(p):
 p=Vector(p[:2]);out=[]
 for a,b in zip(ps,ps[1:]):
  d=b-a;q=a+d*max(0,min(1,(p-a).dot(d)/d.length_squared));out.append(((p-q).length,q,d.normalized()))
 return min(out,key=lambda x:x[0])
# Existing six source meshes remain shared. Only the outer row moves outwards,
# preserving the compact interior and original source top elevations.
for o in [o for o in S.objects if o.type=='MESH' and o.name.startswith('Atlas route stone') and not o.get('pathCourse')]:
 distance,q,tangent=route(o.location)
 if distance<.85:continue
 old=list(o.location);side=(Vector(o.location[:2])-q).normalized()
 amount=.035+.075*(.5+.5*math.sin(o.get('pathStation',0)*1.7+(1 if side.x>0 else 3)))
 o.location.x+=side.x*amount;o.location.y+=side.y*amount
 o.rotation_quaternion=o.rotation_quaternion@Quaternion((0,0,1),rng.uniform(-.025,.025))
 bpy.context.view_layer.update()
 roots=[o.matrix_world@v.co for v in o.data.vertices if v.co.z<-.82]
 gap=max(p.z-hit(terrain,p.x,p.y).z for p in roots)
 if gap>-.005:o.scale.z+=gap+.015
 report['edges'].append({'name':o.name,'before':old,'after':list(o.location),'outward':amount})
paving=surface([o for o in S.objects if o.type=='MESH' and o.get('organicPathVersion')==173])
# Rank only the rejected painted asset family in the visible corridor. Preserve
# every previously supplied/scanned rock, cliffs and all gameplay rune objects.
weak=[o for o in S.objects if o.type=='MESH' and o.name.startswith('Atlas moss rock') and o.data.materials and o.data.materials[0].name=='Atlas painted nature' and -8<o.location.y<56]
large=sorted([o for o in weak if max(o.dimensions)>3 and route(o.location)[0]<14],key=lambda o:route(o.location)[0])[:24]
small=sorted([o for o in weak if max(o.dimensions)<=3 and route(o.location)[0]<5],key=lambda o:route(o.location)[0])[:10]
for i,o in enumerate(large+small):
 source=2 if i%3 else 3;master=bpy.data.objects['Atlas moss rock supplied '+str(source)]
 oldtri=sum(len(p.vertices)-2 for p in o.data.polygons);dims=o.dimensions.copy();oldmesh=o.data.name
 o.data=master.data;o.rotation_mode='XYZ';o.rotation_euler=(0,0,rng.uniform(0,math.tau));o.scale=(1,1,1);bpy.context.view_layer.update()
 factor=min(max(dims.x,dims.y)/max(o.dimensions.x,o.dimensions.y),dims.z/o.dimensions.z)
 o.scale=(factor,)*3;bpy.context.view_layer.update()
 # Relocate old stones which themselves poked through the paving.
 if route(o.location)[0]<2.2:
  distance,q,t=route(o.location);side=(Vector(o.location[:2])-q).normalized();xy=q+side*(2.3+max(o.dimensions.x,o.dimensions.y)*.5);o.location.x=xy.x;o.location.y=xy.y
 bpy.context.view_layer.update();pts=[o.matrix_world@v.co for v in o.data.vertices];low=min(p.z for p in pts)
 roots=[p for p in pts if p.z<low+.12*o.dimensions.z]
 o.location.z-=max(p.z-hit(terrain,p.x,p.y).z for p in roots)+.035
 o['replacementRock']=f'rock{source}.glb';o['premiumVersion']=174
 bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.0001);closed=all(e.is_manifold for e in bm.edges);bm.free();assert closed
 report['rocks'].append({'name':o.name,'oldMesh':oldmesh,'source':o['replacementRock'],'oldTriangles':oldtri,'newTriangles':sum(len(p.vertices)-2 for p in o.data.polygons),'closed':closed})
bpy.context.view_layer.update()
ground=surface([o for o in S.objects if o.type=='MESH' and o.name.startswith(('Continuous forest terrain','Forest surrounding terrain','Atlas moss rock','Atlas moss cliff','Opening fractured moss boulder','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace'))])
plants=[o for o in S.objects if o.type=='MESH' and (o.get('curatedSource') in ['Fern','grass2','Flower1','Flower2','Flower3'] or o.name.startswith(('Grass','Paving edge tuft','Sorrel in paving joint','Path bank community','Rich route understory')))]
def intersects(o):
 # Conservative world footprint includes leaf tips, and edge midpoints, rather
 # than checking only the pivot against an approximate route centre line.
 if route(o.location)[0]>max(o.dimensions.x,o.dimensions.y)+3:return False
 pts=[o.matrix_world@v.co for v in o.data.vertices]
 for p in pts:
  if hit(paving,p.x,p.y) is not None:return True
 for e in o.data.edges:
  a,b=(pts[k] for k in e.vertices)
  for j in range(1,max(2,math.ceil((a-b).length/.18))):
   p=a.lerp(b,j/max(2,math.ceil((a-b).length/.18)))
   if hit(paving,p.x,p.y) is not None:return True
 return False
def seat(o):
 p=hit(ground,o.location.x,o.location.y)
 if p is None:return False
 o.location.z=p.z;bpy.context.view_layer.update()
 local=list(o.data.vertices);top=max(v.co.z for v in local);bottom=min(v.co.z for v in local)
 roots=[o.matrix_world@v.co for v in local if (v.co.length<.25 if o.get('curatedSource')=='Fern' else v.co.z<bottom+(top-bottom)*.025)]
 if not roots:roots=[o.matrix_world@min(local,key=lambda v:v.co.z).co]
 gaps=[v.z-hit(ground,v.x,v.y).z for v in roots if hit(ground,v.x,v.y) is not None]
 o.location.z-=max(gaps)+.012;bpy.context.view_layer.update();return True
# Reuse 180 distant grass instances in readable groups around established ferns.
anchors=[o for o in plants if o.get('curatedSource')=='Fern' and 4<route(o.location)[0]<13 and 0<o.location.y<53]
donors=[o for o in plants if o.get('curatedSource')=='grass2' and route(o.location)[0]>24][:180]
for i,o in enumerate(donors):
 anchor=anchors[(i//9)%len(anchors)];old=list(o.location);angle=rng.uniform(0,math.tau);radius=rng.uniform(.65,2.4)
 o.location.x=anchor.location.x+math.cos(angle)*radius;o.location.y=anchor.location.y+math.sin(angle)*radius
 o.scale*=1.2;seat(o);report['plants'].append({'name':o.name,'before':old,'after':list(o.location),'reason':'fern grass cluster'})
for o in plants:
 bpy.context.view_layer.update()
 if not intersects(o):continue
 old=list(o.location);d,q,t=route(o.location);side=(Vector(o.location[:2])-q).normalized()
 if side.length<.5:side=Vector((t.y,-t.x))
 for attempt in range(32):
  o.location.x+=side.x*.25;o.location.y+=side.y*.25;seat(o)
  if not intersects(o):break
 else:raise RuntimeError('No clean path footprint: '+o.name)
 report['plants'].append({'name':o.name,'before':old,'after':list(o.location),'reason':'full plant footprint clear of paving'})
# Re-seat plants displaced by changed rock surfaces, including retained fern
# groups growing on top of the old rocks.
for o in plants:
 if any((Vector(o.location[:2])-Vector(bpy.data.objects[r['name']].location[:2])).length<max(bpy.data.objects[r['name']].dimensions)+2 for r in report['rocks']):seat(o)
assert not any(intersects(o) for o in plants)
report['pathFootprintConflictsAfter']=0
# Offline 1024-square contact mask. White outside the playable terrain; gentle
# max-composition prevents overlapping plants accumulating black halos.
size=1024;mask=np.ones((size,size),dtype=np.float32);contacts=[]
for o in S.objects:
 if o.type!='MESH':continue
 fern=o.get('curatedSource')=='Fern';tree=o.get('curatedSource')=='Pine1' or o.name.startswith('Faceted mature fir')
 rock=o.name.startswith(('Atlas moss rock','Opening fractured moss boulder','Enclosure outcrop'));temple=o.name.startswith('Temple') and not o.get('pathSource')
 if not(fern or tree or rock or temple):continue
 x,y=o.location.x,o.location.y
 if not(-48<x<48 and -28<y<88):continue
 p=hit(terrain,x,y)
 if p is None:continue
 pts=[o.matrix_world@Vector(v) for v in o.bound_box];low=min(v.z for v in pts)
 if low-p.z>1.5:continue
 rx,ry=(.8,.8) if tree else (.5,.5) if fern else (min(3,o.dimensions.x*.52+.3),min(3,o.dimensions.y*.52+.3))
 strength=.13 if fern else .23
 cx=(x+50)/100*size;cy=(y+30)/120*size;px=rx/100*size;py=ry/120*size
 x0=max(0,int(cx-px));x1=min(size,int(cx+px)+1);y0=max(0,int(cy-py));y1=min(size,int(cy+py)+1)
 yy,xx=np.mgrid[y0:y1,x0:x1];r2=((xx-cx)/px)**2+((yy-cy)/py)**2
 fade=np.maximum(0,1-r2)**2;mask[y0:y1,x0:x1]=np.minimum(mask[y0:y1,x0:x1],1-strength*fade)
 contacts.append({'name':o.name,'position':[x,y],'radius':[rx,ry],'strength':strength})
im=bpy.data.images.new('Atlas baked contact v174',width=size,height=size,alpha=True);im.colorspace_settings.name='Non-Color'
rgba=np.ones((size,size,4),dtype=np.float32);rgba[:,:,:3]=mask[:,:,None];im.pixels.foreach_set(rgba.ravel());im.filepath_raw=str(R/'assets/textures/atlas-contact-v174.png');im.file_format='PNG';im.save();bpy.data.images.remove(im)
report['contacts']=contacts;report['contactMask']={'size':size,'bounds':[-50,-30,100,120],'minimum':float(mask.min())}
for name,matrix in protected.items():assert [list(r) for r in bpy.data.objects[name].matrix_world]==matrix,name
report['protectedTransforms']=len(protected)
ledger=json.loads((D/'atlas-curated-ledger.json').read_text())
for rec in ledger['placements']:
 o=bpy.data.objects[rec['name']];rec['position']=list(o.location);rec['scale']=o.scale.x
(D/'atlas-curated-ledger.json').write_text(json.dumps(ledger,indent=2))
S['atlas_premium_v174']=True
(D/'atlas-premium-ledger.json').write_text(json.dumps(report,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(D/'lvl0001-stylized.blend'))
with contextlib.redirect_stdout(io.StringIO()):
 bpy.ops.export_scene.gltf(filepath=str(D/'atlas-3d.glb'),export_format='GLB',use_active_scene=True,export_yup=True,export_apply=True,export_gpu_instances=True,export_lights=False,export_cameras=False,export_image_format='WEBP',export_image_quality=88,export_extras=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6,export_draco_position_quantization=18,export_draco_normal_quantization=12,export_draco_texcoord_quantization=16,export_draco_color_quantization=10)
print('PREMIUM',len(report['rocks']),'rocks',len(report['edges']),'edges',len(report['plants']),'plant moves',len(contacts),'contacts')
