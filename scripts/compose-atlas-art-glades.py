"""Second B-reference review: sculpt scenic openings, then reground their foliage."""
import bpy,math,json,random
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d');S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend' and S.get('atlas_art_v162')
assert not S.get('atlas_glades_v162')
route=json.loads((R/'route.json').read_text());ps=[Vector((p['position'][0],-p['position'][2])) for p in route['route']]
glades=[(Vector((0,5)),Vector((11,23)),.3,1.5),(Vector((5,26)),Vector((-21,29)),.6,1.2),(Vector((9,40)),Vector((-20,43)),2.3,1.0),(Vector((12,50)),Vector((-23,55)),1.3,.2)]
def segment(p,a,b):
 d=b-a;t=max(0,min(1,(p-a).dot(d)/d.length_squared));return (p-a-d*t).length,t,a+d*t
def routeDistance(p):return min(segment(p,a,b)[0] for a,b in zip(ps,ps[1:]))
terrain=S.objects['Continuous forest terrain'];modified=0
for v in terrain.data.vertices:
 p=Vector(v.co[:2]);rd=routeDistance(p)
 if rd<2.1:continue
 for a,b,z1,z2 in glades:
  d,t,_=segment(p,a,b);width=2.5+2.5*t
  if d>width+4 or t<.045:continue
  influence=min(1,max(0,(width+4-d)/4))*min(1,(rd-2.1)/2)*min(1,t*7)
  target=z1*(1-t)+z2*t+.12*math.sin(p.x*.7)*math.cos(p.y*.7)
  if v.co.z>target:v.co.z=v.co.z*(1-influence)+target*influence;modified+=1
terrain.data.update()
verts=[v.co.copy() for v in terrain.data.vertices];faces=[p.vertices[:] for p in terrain.data.polygons];ground=BVHTree.FromPolygons(verts,faces)
def h(x,y):
 hit=ground.ray_cast(Vector((x,y,150)),Vector((0,0,-1)))[0];return hit.z if hit else None
moved=[];pruned={}
for o in S.objects:
 if not o.name.startswith(('Faceted mature fir','Faceted young fir')):continue
 p=Vector(o.location[:2]);rd=routeDistance(p)
 if rd<2.5:continue
 for a,b,_,_ in glades:
  d,t,closest=segment(p,a,b)
  if .08<t<.98 and d<2.3:
   side=(p-closest).normalized() if d>.01 else Vector((0,1));p=closest+side*(3.8+1.8*t)
   o.location.x,o.location.y=p.x,p.y;z=h(p.x,p.y)
   if z is not None:o.location.z=z-.08
   moved.append(o.name);break
 # Open the near-route crowns without changing the characteristic tree language.
 if rd<12 and o.name.startswith('Faceted mature fir'):
  old=o.data
  if old.name not in pruned:
   m=old.copy();m.name='Atlas open crown '+old.name;col=m.color_attributes.get('Color');foliage=set()
   if col:
    for loop in m.loops:
     c=col.data[loop.index].color
     if c[1]>c[0]*1.12:foliage.add(loop.vertex_index)
   for i in foliage:m.vertices[i].co.x*=.77;m.vertices[i].co.y*=.77
   m.update();pruned[old.name]=m
  o.data=pruned[old.name]
# Ground plant roots against the new terrain; avoid the intentional rock-top plants.
rocks=[o for o in S.objects if o.type=='MESH' and o.name.startswith(('Atlas moss rock','Atlas moss cliff','Opening fractured moss boulder','Enclosure outcrop','Grounded scanned bank','Scanned woodland cliff shelf','Lower enclosure rock terrace'))]
for o in rocks:
 p=Vector(o.location[:2]);rd=routeDistance(p)
 if rd<2:continue
 if min(segment(p,a,b)[0] for a,b,_,_ in glades)<6:
  z=h(p.x,p.y)
  if z is not None:
   bottom=min((o.matrix_world@Vector(q)).z for q in o.bound_box)
   if bottom>z+.06:o.location.z+=z-bottom-.15
bpy.context.view_layer.update();vs=list(verts);fs=list(faces)
for o in rocks:
 off=len(vs);vs.extend(o.matrix_world@v.co for v in o.data.vertices);fs.extend(tuple(off+i for i in p.vertices) for p in o.data.polygons)
support=BVHTree.FromPolygons(vs,fs);regrounded=0
for o in S.objects:
 if o.type!='MESH' or not o.name.startswith(('Grass','Path bank community','Rich route understory','Broad leaf community','Atlas woodland fern','Fern drift','Detailed woodland flower','Enclosure shrub','Library small broadleaf tree','Rock terrace broadleaf shrub','Broadleaf hazel sapling')):continue
 p=Vector(o.location[:2]);near=min(segment(p,a,b)[0] for a,b,_,_ in glades)
 if near>11:continue
 hit=support.ray_cast(Vector((p.x,p.y,150)),Vector((0,0,-1)))[0]
 if hit is not None:o.location.z=hit.z-.025;regrounded+=1
 # Deliberate open centre and clustered edges; retain the groundcover family.
 if near<1.3 and routeDistance(p)>2 and not o.name.startswith('Detailed woodland flower'):
  o.scale*=.55
 # Wider fern leaflets are legible at the canonical tablet pixel density.
for m in [m for m in bpy.data.meshes if m.name.startswith('Atlas feather fern')]:
 # The four-triangle folded leaf construction is kept; expand across the blade,
 # not the whole frond (which would recreate a broad horizontal band).
 for frond in range(6):
  for k in range(7):
   for start in [frond*208+k*28+4,frond*208+k*28+16]:
    mid=(m.vertices[start+1].co+m.vertices[start+5].co)*.5
    for i in [1,5,7,9]:m.vertices[start+i].co=mid+(m.vertices[start+i].co-mid)*1.65
 m.update()
# Tree bases moved only as scenic frames; gameplay route/landmarks are untouched.
ledger=json.loads((R/'atlas-art-ledger.json').read_text());ledger.update({'sculptedTerrainVertices':modified,'reframedTrees':moved,'openCrownVariants':len(pruned),'gladeRegroundedPlants':regrounded,'glades':[[list(a),list(b)] for a,b,_,_ in glades]})
(R/'atlas-art-ledger.json').write_text(json.dumps(ledger,indent=2));S['atlas_glades_v162']=True
bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'));print('Terrain vertices',modified,'Reframed trees',len(moved),'Plants regrounded',regrounded)
