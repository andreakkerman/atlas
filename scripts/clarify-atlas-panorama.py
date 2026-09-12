"""Give scenic glades clear centres and keep mature crowns off their sightlines."""
import bpy,json,math
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1]/'Levels/LVL-0001/3d';S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
assert not S.get('atlas_clear_panorama_v162')
ledger=json.loads((R/'atlas-art-ledger.json').read_text())
glades=[(Vector(a),Vector(b)) for a,b in ledger['glades'][1:]]
route=json.loads((R/'route.json').read_text());route=[Vector((p['position'][0],-p['position'][2])) for p in route['route']]
def segment(p,a,b):
 d=b-a;t=max(0,min(1,(p-a).dot(d)/d.length_squared));q=a+d*t
 return (p-q).length,t,q
def routeDistance(p):return min(segment(p,a,b)[0] for a,b in zip(route,route[1:]))
terrain=S.objects['Continuous forest terrain'];ground=BVHTree.FromPolygons([terrain.matrix_world@v.co for v in terrain.data.vertices],[p.vertices[:] for p in terrain.data.polygons])
def h(p):
 hit=ground.ray_cast(Vector((p.x,p.y,150)),Vector((0,0,-1)))[0]
 return hit.z if hit is not None else None
removed=[]
for o in list(S.objects):
 if not o.name.startswith(('Grass','Path bank community','Rich route understory')):continue
 p=Vector(o.location[:2]);d,t,q=min((segment(p,a,b) for a,b in glades),key=lambda r:r[0])
 # Remove the tiny dots from the intended clear soil, leaving full plants at
 # the edges, flowers and fern groups intact. This is a composition mask.
 if .12<t<.95 and d<1.8+t*.6 and routeDistance(p)>2.6 and max(o.scale)<1.0:
  removed.append({'name':o.name,'mesh':o.data.name,'position':list(o.location),'rotation':list(o.rotation_euler),'scale':list(o.scale)})
  bpy.data.objects.remove(o,do_unlink=True)
moved=[];collars=[o for o in S.objects if o.name.startswith('Faceted planted root collar')]
for o in [o for o in S.objects if o.name.startswith('Faceted mature fir')]:
 p=Vector(o.location[:2]);d,t,q,a,b=min(((*segment(p,a,b),a,b) for a,b in glades),key=lambda r:r[0])
 if not(.2<t<.97 and d<9 and routeDistance(p)>2.6):continue
 side=Vector((-(b-a).y,(b-a).x)).normalized();sign=1 if (p-q).dot(side)>=0 else -1
 dest=q+side*sign*(9.0+(t*.8));height=h(dest)
 if height is None or routeDistance(dest)<3:continue
 # Nearby glades overlap: do not move a crown into another view's centre.
 if any(.1<st<.95 and sd<4 for sd,st,_ in (segment(dest,ga,gb) for ga,gb in glades)):continue
 old=list(o.location);collar=min(collars,key=lambda c:(c.location-o.location).length_squared)
 o.location=(dest.x,dest.y,height-.055)
 if (Vector(old)-collar.location).length<.4:collar.location=o.location.copy()
 moved.append({'name':o.name,'from':old,'to':list(o.location)})
ledger.update({'clearGladeRemovedDots':removed,'panoramaCrownFraming':moved,'objectsAfter':len(S.objects),'finalObjects':len(S.objects)})
(R/'atlas-art-ledger.json').write_text(json.dumps(ledger,indent=2))
S['atlas_clear_panorama_v162']=True
bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'))
print('Clear-centre small plants',len(removed),'mature crown frames',len(moved))
