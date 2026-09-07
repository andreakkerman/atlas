"""Replace three conspicuous flat-canopy placements using existing scanned crowns."""
import bpy
from mathutils import Vector
sc=bpy.data.scenes['Atlas LVL-0001 First Person'];lib=bpy.data.scenes['Atlas source library'];bpy.context.window.scene=sc
parts={prefix:next(o.data for o in sc.objects if o.name.startswith(prefix)) for prefix in ['Scanned mature route fir','Solid scanned fir trunk','Lower natural fir boughs']}
for name in ['Layered forest conifer.048','Layered forest conifer.182','Layered forest conifer.274']:
 old=sc.objects.get(name)
 if not old:continue
 pos=old.location.copy();angle=old.rotation_euler.z;scale=old.scale.copy();height=max(v.co.z for v in old.data.vertices)*scale.z;scale.z=height/17
 for prefix,data in parts.items():
  o=bpy.data.objects.new(prefix,data);sc.collection.objects.link(o);o.location=pos;o.rotation_euler.z=angle;o.scale=scale;o['opening_canopy_replacement']=name
 for o in list(sc.objects):
  if o.name.startswith(('Layered forest conifer','Conifer crown infill')) and (o.location-pos).length<.02:
   lib.collection.objects.link(o)
   for c in list(o.users_collection):
    if c!=lib.collection:c.objects.unlink(o)
print('Three opening canopies replaced; prior geometry and rooted bases retained')
