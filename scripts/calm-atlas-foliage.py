"""Atlas-only silhouette revision, applied through Blender MCP to the v162 scene."""
import bpy, math, random, json, shutil, hashlib
from pathlib import Path
from mathutils import Vector
R=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d'); S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
assert not S.get('atlas_calm_v163'), 'Already applied'
if not (R/'lvl0001-stylized-before-calm-v163.blend').exists():shutil.copy2(bpy.data.filepath,R/'lvl0001-stylized-before-calm-v163.blend')
B=R.parents[2]/'output/atlas-calm-backup/atlas-before-calm-v163.glb';B.parent.mkdir(parents=True,exist_ok=True)
if not B.exists():shutil.copy2(R/'atlas-3d.glb',B)
mat=bpy.data.materials['Atlas painted nature']
ledger={'beforeSHA256':hashlib.sha256(B.read_bytes()).hexdigest(),'meshes':[],'removedGroundcover':[]}
protected={o.name:[list(r) for r in o.matrix_world] for o in S.objects}
class Shape:
 def __init__(self):self.v=[];self.f=[];self.c=[]
 def face(self,ps,c):
  i=len(self.v);self.v.extend(tuple(p) for p in ps);self.f.append(tuple(range(i,i+len(ps))));self.c.append(c)
 def mesh(self,name):
  m=bpy.data.meshes.new(name);m.from_pydata(self.v,[],self.f);m.materials.append(mat);m.update()
  col=m.color_attributes.new(name='Color',type='BYTE_COLOR',domain='CORNER')
  for p,c in zip(m.polygons,self.c):
   for i in p.loop_indices:col.data[i].color=c
  return m
 def blade(self,a,d,length,width,height,color,lobed=False):
  a=Vector(a);d=Vector(d);side=Vector((-d.y,d.x,0)).normalized()
  # A continuous broad folded frond, with shallow rounded lobes, not detached needles.
  ts=[0,.13,.19,.23,.31,.38,.42,.50,.57,.61,.69,.76,.80,.90,1] if lobed else [0,.28,.65,.90,1]
  widths=[.04,.7,.72,.12,1,1,.18,.92,.88,.15,.65,.56,.13,.24,.02] if lobed else [.06,.8,1,.55,.08]
  rows=[]
  for t,w in zip(ts,widths):
   p=a+d*(length*t)+Vector((0,0,math.sin(t*2.25)*height));rows.append((p-side*width*w,p+Vector((0,0,width*.10)),p+side*width*w))
  for q,n in zip(rows,rows[1:]):
   self.face([q[0],n[0],n[1],q[1]],color);self.face([q[1],n[1],n[2],q[2]],color)
 def mass(self,center,radii,color,segments=8):
  center=Vector(center);rings=[]
  for z,r in [(-.65,.40),(-.28,.95),(.38,.82),(.88,.28)]:
   rings.append([center+Vector((math.cos(k*math.tau/segments)*r*radii[0],math.sin(k*math.tau/segments)*r*radii[1],z*radii[2])) for k in range(segments)])
  for a,b in zip(rings,rings[1:]):
   for k in range(segments):j=(k+1)%segments;self.face([a[k],a[j],b[j],b[k]],color)
  self.face(list(reversed(rings[0])),color);self.face(rings[-1],color)
def replace(old,new):
 before=sum(len(p.vertices)-2 for p in old.polygons);after=sum(len(p.vertices)-2 for p in new.polygons)
 assert after<=before,(old.name,before,after)
 users=[o for o in S.objects if o.type=='MESH' and o.data==old]
 for o in users:o.data=new
 ledger['meshes'].append({'old':old.name,'new':new.name,'instances':len(users),'trianglesBefore':before,'trianglesAfter':after})
green=(.105,.215,.042,1)
# Preserve the exact trunk/root faces and every tree transform. Replace only green canopy faces.
seen=set()
for o in list(S.objects):
 if o.type!='MESH' or not o.name.startswith(('Faceted mature fir','Faceted young fir')) or o.data in seen:continue
 old=o.data;seen.add(old);col=old.color_attributes['Color'];sh=Shape();fol=[]
 for p in old.polygons:
  c=tuple(col.data[p.loop_start].color);ps=[old.vertices[i].co for i in p.vertices]
  if c[1]>c[0]*1.12:fol.extend(ps)
  else:sh.face(ps,c)
 young=o.name.startswith('Faceted young');lo=min(v.z for v in fol);hi=max(v.z for v in fol);radius=max(math.hypot(v.x,v.y) for v in fol)*.88
 tiers=4 if young else 5; span=hi-lo
 for tier in range(tiers):
  t=tier/tiers;z=lo+span*t;w=radius*(1-t*.86);h=span/(tiers-1)*1.18
  rings=[];n=9;phase=tier*.39
  for dz,rr in [(0,.72),(.12,1),(.48,.70),(.95,.12)]:
   rings.append([Vector((math.cos(k*math.tau/n+phase)*w*rr*(1+.08*math.sin(k*2.1+tier)),math.sin(k*math.tau/n+phase)*w*rr*.93,z+dz*h)) for k in range(n)])
  c=(green[0]*(1+t*.15),green[1]*(1+t*.1),green[2],1)
  for a,b in zip(rings,rings[1:]):
   for k in range(n):j=(k+1)%n;sh.face([a[k],a[j],b[j],b[k]],c)
  sh.face(list(reversed(rings[0])),c);sh.face(rings[-1],c)
 new=sh.mesh('Atlas calm crown '+old.name);replace(old,new);seen.add(new)
for old in list(bpy.data.meshes):
 if not old.users:continue
 sh=Shape();r=random.Random(old.name)
 if old.name.startswith('Atlas feather fern'):
  for j in range(5):
   a=j*math.tau/5+.14;sh.blade((0,0,.025),(math.cos(a),math.sin(a),0),r.uniform(.65,.88),.16,r.uniform(.48,.58),green,True)
  replace(old,sh.mesh('Atlas calm fan fern '+old.name[-3:]))
 elif old.name.startswith(('Atlas curved grass','Faceted grass','Atlas woodland rosette')):
  rosette='rosette' in old.name
  # Broad folded half-leaf polygons retain the smaller original mesh budget.
  slim=Shape()
  for j in range(3):
   a=j*math.tau/3;d=Vector((math.cos(a),math.sin(a),0));side=Vector((-d.y,d.x,0));L=.43 if rosette else .24;w=.12 if rosette else .06;h=.21 if rosette else .11
   root=Vector((0,0,0));tip=d*L+Vector((0,0,h*.72));mid=d*L*.55+Vector((0,0,h))
   for sign in [-1,1]:slim.face([root,d*L*.25+side*w*.8*sign+Vector((0,0,h*.62)),d*L*.72+side*w*sign+Vector((0,0,h*.96)),tip,mid] if sign<0 else [mid,tip,d*L*.72+side*w*sign+Vector((0,0,h*.96)),d*L*.25+side*w*.8*sign+Vector((0,0,h*.62)),root],green)
  replace(old,slim.mesh('Atlas calm groundleaf '+old.name))
 elif old.name.startswith('Atlas rounded bilberry'):
  for j in range(3):
   a=j*2.4;sh.mass((math.cos(a)*.22,math.sin(a)*.22,.24+j*.12),(.34,.30,.38),(.085+j*.009,.17+j*.018,.038,1))
  replace(old,sh.mesh('Atlas calm shrub '+old.name[-1]))
# Retain planting groups, but remove isolated groundcover dots between the groups.
for o in list(S.objects):
 if o.type!='MESH' or not o.data.name.startswith(('Atlas calm groundleaf','Atlas calm fan fern')):continue
 x,y=o.location.x,o.location.y;patch=math.sin(x*.74+math.sin(y*.43))*math.cos(y*.66-x*.18)
 if (patch<-.12 and o.name.startswith(('Grass','Path bank community','Rich route understory'))) or (patch<-.4 and o.name.startswith(('Atlas woodland fern','Fern drift'))):
  ledger['removedGroundcover'].append(o.name);bpy.data.objects.remove(o,do_unlink=True)
for o in S.objects:assert [list(r) for r in o.matrix_world]==protected[o.name],o.name
ledger['weightedTriangleReduction']=sum((m['trianglesBefore']-m['trianglesAfter'])*m['instances'] for m in ledger['meshes'])
ledger['objectsAfter']=len(S.objects);(R/'atlas-foliage-ledger.json').write_text(json.dumps(ledger,indent=2))
S['atlas_calm_v163']=True;bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'))
print(json.dumps({'meshes':len(ledger['meshes']),'removedGroundcover':len(ledger['removedGroundcover']),'triangleReduction':ledger['weightedTriangleReduction']}))
