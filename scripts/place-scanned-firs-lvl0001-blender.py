"""Use detailed scanned mature trees at selected route compositions."""
import bpy,numpy as np,math
sc=bpy.data.scenes['Atlas LVL-0001 First Person'];library=bpy.data.scenes['Atlas source library'];master=bpy.data.objects['Atlas scanned fir A detailed LOD'];bpy.context.window.scene=library
if not master.get('atlas_finished_lod'):
 if master.data.users>1:master.data=master.data.copy()
 bpy.ops.object.select_all(action='DESELECT');master.select_set(True);bpy.context.view_layer.objects.active=master;mod=master.modifiers.get('Balanced detailed crown') or master.modifiers.new('Balanced detailed crown','DECIMATE');mod.ratio=.67;mod.use_collapse_triangulate=True;bpy.ops.object.modifier_apply(modifier=mod.name)
 co=np.empty(len(master.data.vertices)*3,dtype=np.float32);master.data.vertices.foreach_get('co',co);co=co.reshape(-1,3);r=np.sqrt(co[:,0]**2+co[:,1]**2);factor=np.full(len(co),1.25,dtype=np.float32);mask=(r<.55)&(co[:,2]<6);factor[mask]*=1+np.clip(1-co[mask,2]/6,0,1)*1.5;co[:,:2]*=factor[:,None];master.data.vertices.foreach_set('co',co.reshape(-1));master.data.update();master['atlas_finished_lod']=True
bpy.context.window.scene=sc
anchors=[(-4,-1),(6,8),(-5,11),(7,26),(10,38),(17,48),(-2,-10),(-8,-8),(12,-8),(-7,18),(25,55),(5,45),(18,28),(0,24),(28,44),(23,62)]
selected=[];candidates=[o for o in sc.objects if o.type=='MESH' and o.name.startswith('Layered forest conifer') and o.data.name.startswith('Mature conifer wood')]
for x,y in anchors:
 choices=[o for o in candidates if o not in selected]
 if not choices:break
 tree=min(choices,key=lambda o:(o.location.x-x)**2+(o.location.y-y)**2)
 if (tree.location.x-x)**2+(tree.location.y-y)**2<100:selected.append(tree)
for index,tree in enumerate(selected):
 pos=tree.location.copy();scale=tree.scale.copy();angle=tree.rotation_euler.z;oldheight=max(v.co.z for v in tree.data.vertices);scale.z*=oldheight/18.925
 for o in list(sc.objects):
  if o.name.startswith(('Layered forest conifer','Conifer crown infill','Buttress roots')) and abs(o.location.x-pos.x)<.01 and abs(o.location.y-pos.y)<.01:bpy.data.objects.remove(o,do_unlink=True)
 o=bpy.data.objects.new('Scanned mature route fir',master.data);sc.collection.objects.link(o);o.location=pos;o.scale=scale;o.rotation_euler.z=angle
print('Replaced',len(selected),'selected mature trees with detailed scanned branching;',len(master.data.polygons),'faces per tree')
