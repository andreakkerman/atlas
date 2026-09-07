"""Prepare independent LOD masters from actual sapling and small-tree scans."""
import bpy
from mathutils import Vector
lib=bpy.data.scenes['Atlas source library'];bpy.context.window.scene=lib
specs=[('tree_small_02_LOD0',.10),('fir_sapling_medium_a_LOD0',.30),('fir_sapling_medium_b_LOD0',.30),('fir_sapling_medium_c_LOD0',.30)]
for name,ratio in specs:
 if bpy.data.objects.get('Atlas library '+name):continue
 source=bpy.data.objects[name];o=source.copy();o.data=source.data.copy();lib.collection.objects.link(o);o.name='Atlas library '+name
 bpy.context.view_layer.objects.active=o
 mod=o.modifiers.new('Understory silhouette LOD','DECIMATE');mod.ratio=ratio;bpy.ops.object.modifier_apply(modifier=mod.name)
 o.data.transform(o.matrix_world);o.matrix_world.identity()
 lo=Vector(tuple(min(v.co[i] for v in o.data.vertices) for i in range(3)));hi=Vector(tuple(max(v.co[i] for v in o.data.vertices) for i in range(3)))
 offset=Vector(((lo.x+hi.x)*.5,(lo.y+hi.y)*.5,lo.z))
 for v in o.data.vertices:v.co-=offset
 o['source_asset']=name;o['source_retained']=True
 print(o.name,len(o.data.polygons))
bpy.context.window.scene=bpy.data.scenes['Atlas LVL-0001 First Person']
