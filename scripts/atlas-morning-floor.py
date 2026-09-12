"""v167: one painted-style tiling base-color texture; no geometry or UV changes."""
import bpy, numpy as np, json, hashlib
from pathlib import Path
R=Path('D:/DevProjects/SvenAdventure');S=bpy.context.scene
assert Path(bpy.data.filepath).name=='lvl0001-stylized.blend'
assert S.get('atlas_grass_v166')
size=512;rng=np.random.default_rng(167)
y,x=np.mgrid[0:size,0:size]/size
def field(bands):
 out=np.zeros((size,size))
 for a,b,w in bands:out+=np.sin(2*np.pi*(a*x+b*y)+rng.uniform(0,2*np.pi))*w
 return out
cloud=field([(1,1,.45),(2,-1,.3),(1,3,.2),(4,2,.12),(5,-3,.06)])
detail=field([(9,5,.035),(13,-8,.022),(21,17,.014),(32,-19,.008)])
moss=np.clip((cloud+.12)*1.45,0,1)[...,None]
soil=np.array([.30,.235,.15]);green=np.array([.215,.275,.13])
rgb=soil*(1-moss)+green*moss
rgb*=1+(cloud*.32+detail)[...,None]
# Quiet broad flecks and short fallen-needle marks, wrapped across every edge.
for i in range(145):
 cx,cy=rng.random(2);angle=rng.uniform(0,np.pi)
 dx=(x-cx+.5)%1-.5;dy=(y-cy+.5)%1-.5
 u=dx*np.cos(angle)+dy*np.sin(angle);v=-dx*np.sin(angle)+dy*np.cos(angle)
 needle=i<100;length=rng.uniform(.009,.026) if needle else rng.uniform(.007,.018)
 width=rng.uniform(.0009,.0016) if needle else rng.uniform(.003,.006)
 mask=np.clip(1-(u/length)**2-(v/width)**2,0,1)[...,None]*rng.uniform(.18,.42)
 color=np.array([.43,.34,.20]) if needle else np.array([.19,.15,.09])
 rgb=rgb*(1-mask)+color*mask
rgba=np.concatenate([np.clip(rgb,0,1),np.ones((size,size,1))],axis=2).astype(np.float32)
name='Atlas morning woodland floor 512'
image=bpy.data.images.get(name) or bpy.data.images.new(name,width=size,height=size,alpha=False)
image.pixels.foreach_set(rgba.ravel());image.pack()
out=R/'assets/textures/atlas-woodland-floor-512.png';out.parent.mkdir(parents=True,exist_ok=True)
image.filepath_raw=str(out);image.file_format='PNG';image.save();image.pack()
m=bpy.data.materials['forrest_ground_01'];m.node_tree.nodes['Atlas lightweight painted soil'].image=image
m['atlasFloorVersion']='morning-v167';S['atlas_morning_floor_v167']=True
ledger={'image':name,'size':512,'maps':1,'roughness':.94,'geometryChanged':False,'uvChanged':False,'foliageChanged':False,'source':str(out.relative_to(R))}
(R/'Levels/LVL-0001/3d/atlas-morning-ledger.json').write_text(json.dumps(ledger,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(R/'Levels/LVL-0001/3d/lvl0001-stylized.blend'))
print(json.dumps(ledger))
