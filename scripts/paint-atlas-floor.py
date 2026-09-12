"""Small, tileable painted soil/moss texture for the Atlas authoring scene."""
import bpy,math,random,json
from pathlib import Path
R=Path(__file__).resolve().parents[1]/'Levels/LVL-0001/3d'
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
assert not bpy.context.scene.get('atlas_painted_floor_v162')
size=256;pixels=[];r=random.Random(516)
for y in range(size):
 for x in range(size):
  u=x/size*math.tau;v=y/size*math.tau
  patch=(math.sin(u+math.sin(v)*.8)+math.cos(2*v-u)*.45+math.sin(3*u+2*v)*.23)/1.68
  moss=max(0,min(1,(patch+.25)*.9));grain=r.uniform(-.012,.012)
  soil=(.37,.285,.175);green=(.28,.32,.13)
  pixels.extend([soil[k]*(1-moss)+green[k]*moss+grain for k in range(3)]+[1])
image=bpy.data.images.new('Atlas painted woodland soil 256',width=size,height=size,alpha=False)
image.pixels.foreach_set(pixels);image.pack()
m=bpy.data.materials['forrest_ground_01'];nodes=m.node_tree.nodes;links=m.node_tree.links
bs=next(n for n in nodes if n.type=='BSDF_PRINCIPLED')
tex=nodes.new('ShaderNodeTexImage');tex.image=image;tex.name='Atlas lightweight painted soil'
old=next((n for n in nodes if n.type=='TEX_IMAGE' and n!=tex and n.inputs['Vector'].links),None)
if old:links.new(old.inputs['Vector'].links[0].from_socket,tex.inputs['Vector'])
for socket in ['Base Color','Normal','Roughness']:
 for link in list(bs.inputs[socket].links):links.remove(link)
links.new(tex.outputs['Color'],bs.inputs['Base Color']);bs.inputs['Roughness'].default_value=.94
ledger=json.loads((R/'atlas-art-ledger.json').read_text());ledger['floorTexture']={'size':256,'maps':1,'normalMap':False,'roughness':.94}
(R/'atlas-art-ledger.json').write_text(json.dumps(ledger,indent=2))
bpy.context.scene['atlas_painted_floor_v162']=True
bpy.ops.wm.save_as_mainfile(filepath=str(R/'lvl0001-stylized.blend'))
