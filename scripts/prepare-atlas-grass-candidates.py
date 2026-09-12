"""Merge source grass for a fair GPU comparison; no source files are changed."""
import bpy, json, math, hashlib, contextlib, io
from pathlib import Path
from mathutils import Vector
R=Path('D:/DevProjects/SvenAdventure');S=bpy.context.scene
out=R/'output/grass-v166';out.mkdir(parents=True,exist_ok=True)
report={}
for key in ['grass1','grass2']:
 if not any(o.get('grassCandidate')==key for o in S.objects):
  before=set(S.objects)
  with contextlib.redirect_stdout(io.StringIO()):bpy.ops.import_scene.gltf(filepath=str(R/'3dmodels'/(key+'.glb')))
  for o in set(S.objects)-before:o['grassCandidate']=key
material=bpy.data.materials.new('Atlas shared grass');material.use_nodes=True
bs=material.node_tree.nodes.get('Principled BSDF');bs.inputs['Roughness'].default_value=1;bs.inputs['Metallic'].default_value=0
color=material.node_tree.nodes.new('ShaderNodeVertexColor');color.layer_name='Color';material.node_tree.links.new(color.outputs['Color'],bs.inputs['Base Color'])
def build(key,objects,level_roots=False):
 vertices=[];faces=[];colors=[]
 for o in objects:
  pts=[o.matrix_world@v.co for v in o.data.vertices];lo=min(v.z for v in pts)
  if level_roots:
   for v in pts:v.z-=lo
  off=len(vertices);vertices.extend(pts)
  for p in o.data.polygons:
   faces.append(tuple(off+i for i in p.vertices));m=o.data.materials[p.material_index]
   c=m.node_tree.nodes.get('Principled BSDF').inputs['Base Color'].default_value[:]
   colors.append(c)
 lo=Vector(tuple(min(v[i] for v in vertices) for i in range(3)));hi=Vector(tuple(max(v[i] for v in vertices) for i in range(3)))
 centre=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
 # All comparison patches have a one-metre long edge: equal coverage, not equal
 # arbitrary source-unit scales. Production instances vary this uniformly.
 width=max(hi.x-lo.x,hi.y-lo.y)
 mesh=bpy.data.meshes.new('Atlas grass benchmark '+key);mesh.from_pydata([(v-centre)/width for v in vertices],[],faces);mesh.materials.append(material);mesh.update()
 attr=mesh.color_attributes.new(name='Color',type='FLOAT_COLOR',domain='CORNER')
 for p,c in zip(mesh.polygons,colors):
  for i in p.loop_indices:attr.data[i].color=c
 mesh.calc_loop_triangles()
 # Direct render-data fixture preserves every source triangle and its face color.
 position=[];normal=[];rgb=[]
 for t in mesh.loop_triangles:
  for vi,li in zip(t.vertices,t.loops):
   position.extend(mesh.vertices[vi].co);normal.extend(t.normal);rgb.extend(attr.data[li].color[:3])
 (out/(key+'.json')).write_text(json.dumps({'position':position,'normal':normal,'color':rgb}))
 report[key]={'triangles':len(mesh.loop_triangles),'sourceObjects':len(objects),'mergedMaterials':1,'textures':0,'sourceWidth':width,'height':(hi.z-lo.z)/width,'rootLevelled':level_roots}
 return mesh
for key in ['grass1','grass2']:
 obs=sorted([o for o in S.objects if o.get('grassCandidate')==key and o.type=='MESH'],key=lambda o:o.name)
 build(key,obs)
 if key=='grass2':
  # An airy, repeatable patch uses 16 distributed ORIGINAL blades, not a new
  # procedural blade or destructive decimation. Keep their shape and colors.
  def centre(o):return sum((o.matrix_world@v.co for v in o.data.vertices),Vector())/len(o.data.vertices)
  candidates=[o for o in obs if max((o.matrix_world@v.co).z for v in o.data.vertices)>.13]
  chosen=[min(candidates,key=lambda o:centre(o).length)]
  while len(chosen)<16:
   chosen.append(max((o for o in candidates if o not in chosen),key=lambda o:min((centre(o)-centre(p)).length for p in chosen)))
  mesh=build('grass2-light',chosen,True);mesh['sourceBladeNames']=json.dumps([o.name for o in chosen])
  bpy.data.libraries.write(str(out/'prepared-grass.blend'),{mesh})
  report['grass2-light']['sourceBladeNames']=[o.name for o in chosen]
for o in list(S.objects):
 if o.get('grassCandidate'):bpy.data.objects.remove(o,do_unlink=True)
report['sourceFiles']={k:hashlib.sha256((R/'3dmodels'/(k+'.glb')).read_bytes()).hexdigest() for k in ['grass1','grass2']}
(out/'sources.json').write_text(json.dumps(report,indent=2));print(json.dumps(report))
