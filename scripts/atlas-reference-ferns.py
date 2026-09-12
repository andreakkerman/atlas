"""Replace only Atlas fern meshes with paired-leaf fronds from the supplied reference."""
import bpy,math,random,json,shutil
from pathlib import Path
from mathutils import Vector
R=Path('D:/DevProjects/SvenAdventure/Levels/LVL-0001/3d');S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
assert not S.get('atlas_reference_ferns_v164')
B=R.parents[2]/'output/atlas-fern-backup';B.mkdir(parents=True,exist_ok=True)
if not (B/'before.glb').exists():shutil.copy2(R/'atlas-3d.glb',B/'before.glb')
if not (B/'before.blend').exists():shutil.copy2(bpy.data.filepath,B/'before.blend')
old=sorted({o.data for o in S.objects if o.type=='MESH' and o.data.name.startswith('Atlas calm fan fern')},key=lambda m:m.name)
assert len(old)==2
report=[]
for variant,mesh in enumerate(old):
 verts=[];faces=[];colors=[];rng=random.Random(715+variant)
 def face(ps,c):
  start=len(verts);verts.extend(tuple(p) for p in ps);faces.append(tuple(range(start,len(verts))));colors.append(c)
 for j in range(5):
  angle=j*math.tau/5+rng.uniform(-.12,.12);d=Vector((math.cos(angle),math.sin(angle),0));side=Vector((-d.y,d.x,0))
  length=rng.uniform(.78,1.02);height=rng.uniform(.44,.58)
  def spine(t):return d*(length*t**1.22)+Vector((0,0,.015+math.sin(t*2.6)*height))
  c=(.115+j*.004,.235+j*.005,.042,1);previous=spine(0)
  for k,t in enumerate([.18,.30,.43,.56,.69,.82,1]):
   p=spine(t);w=.006*(1-t*.5)
   face([previous-side*w,previous+side*w,p+side*w,p-side*w],(.12,.20,.035,1));previous=p
   if t==1:continue
   reach=[.17,.23,.235,.20,.155,.095][k];width=reach*.42
   tangent=(spine(t+.02)-spine(t-.02)).normalized()
   for sign in [-1,1]:
    axis=side*sign;tip=p+axis*reach+tangent*.065
    # Broad attached pinnae: blunt shoulders and a short tip, not long needles.
    ps=[p,p+axis*reach*.37-tangent*width,p+axis*reach*.82-tangent*width*.72,tip,p+axis*reach*.54+tangent*width]
    if sign>0:ps.reverse()
    face(ps,c)
  p=spine(.84);tip=spine(1.04);mid=(p+tip)*.5
  face([p,mid-side*.025,tip,mid+side*.025],c)
 new=bpy.data.meshes.new('Atlas paired fern '+str(variant));new.from_pydata(verts,[],faces);new.materials.append(mesh.materials[0]);new.update()
 col=new.color_attributes.new(name='Color',type='BYTE_COLOR',domain='CORNER')
 for p,c in zip(new.polygons,colors):
  for i in p.loop_indices:col.data[i].color=c
 users=[o for o in S.objects if o.type=='MESH' and o.data==mesh]
 for o in users:o.data=new
 triangles=sum(len(p.vertices)-2 for p in new.polygons);assert triangles<=280
 report.append({'mesh':new.name,'instances':len(users),'triangles':triangles,'fronds':5,'pairsPerFrond':6})
(R/'atlas-fern-ledger.json').write_text(json.dumps(report,indent=2))
S['atlas_reference_ferns_v164']=True;bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'))
print(json.dumps(report))
