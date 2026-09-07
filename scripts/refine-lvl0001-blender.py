"""Blender composition pass using CC0 source scans; run after the base authoring stages."""
import bpy,math,random
from mathutils import Vector
R=random.Random(431)
SC=bpy.data.scenes['Atlas LVL-0001 First Person']
bpy.context.window.scene=SC
ns=bpy.app.driver_namespace['atlas_authoring']
ground=ns['ground'];nearest=ns['nearest_route']

def normalized(source,name):
    obj=bpy.data.objects.new(name,source.data.copy());SC.collection.objects.link(obj)
    coords=[v.co for v in obj.data.vertices]
    lo=Vector(tuple(min(p[i] for p in coords) for i in range(3)))
    hi=Vector(tuple(max(p[i] for p in coords) for i in range(3)))
    center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
    for v in obj.data.vertices:v.co-=center
    obj.location.z=-100
    return obj,hi-lo

tree=bpy.data.objects['Atlas fir optimized']
tree,dim=normalized(tree,'Fir detailed template')
for v in tree.data.vertices:v.co*=17/dim.z
ferns=[normalized(bpy.data.objects['fern_02_'+c],'Fern detailed template '+c)[0] for c in 'abcd']
rocks=[normalized(bpy.data.objects['rock_moss_set_01_rock0'+str(i)],'Moss rock template '+str(i))[0] for i in range(1,7)]
cliff,cliffDim=normalized(bpy.data.objects['rock_face_01'],'Cliff detailed template')

def inst(template,name,pos,scale,angle):
    o=bpy.data.objects.new(name,template.data);SC.collection.objects.link(o)
    o.location=pos;o.scale=scale;o.rotation_euler.z=angle;return o

# Replace each authored placement, retaining its position, silhouette and route clearance.
old=list(SC.objects)
for o in old:
    if o.name.startswith('Forest fir'):
        if o.data.name.startswith('Fir trunk'):
            inst(tree,'Atlas living fir',o.location,o.scale,o.rotation_euler.z)
        bpy.data.objects.remove(o,do_unlink=True)
    elif o.name.startswith('Fern.') or o.name=='Fern':
        s=o.scale.x*1.9
        inst(ferns[R.randrange(4)],'Atlas woodland fern',o.location,(s,s,s),o.rotation_euler.z)
        bpy.data.objects.remove(o,do_unlink=True)
    elif o.name.startswith('Forest rock') or o.name.startswith('Landmark cliff'):
        is_cliff=o.name.startswith('Landmark cliff')
        source=cliff if is_cliff and o.scale.z>3 else rocks[R.randrange(6)]
        dims=Vector(tuple(max(v.co[i] for v in source.data.vertices)-min(v.co[i] for v in source.data.vertices) for i in range(3)))
        s=Vector((o.scale.x*1.9/dims.x,o.scale.y*1.9/dims.y,o.scale.z*1.4/dims.z))
        x,y=o.location.x,o.location.y
        inst(source,'Atlas moss cliff' if is_cliff else 'Atlas moss rock',(x,y,ground(x,y)-.12),s,o.rotation_euler.z)
        bpy.data.objects.remove(o,do_unlink=True)
    elif o.name.startswith('Boulder moss crust'):
        bpy.data.objects.remove(o,do_unlink=True)

# Lower saplings, fallen stone and fern clusters connect the forest canopy to the floor.
for i in range(90):
    x=R.uniform(-17,32);y=R.uniform(-9,78);d,_=nearest(x,y)
    if d<4 or (11<x<26 and 49<y<68):continue
    s=R.uniform(.16,.38)
    inst(tree,'Young fir',(x,y,ground(x,y)),(s,s,s),R.random()*math.tau)

# Moss creeps over cornices and beside the gate, with trailing fronds of real leaves.
for i in range(145):
    x=R.uniform(12.8,25.1);z=R.uniform(5.5,12)
    if abs(x-19)<2.6 and z<11:continue
    inst(ferns[i%4],'Temple wall growth',(x,58.35,z),(.75,.60,.55),R.random()*math.tau)

for o in [tree,*ferns,*rocks,cliff,bpy.data.objects.get('Atlas fir optimized')]:
    if o and o.name in bpy.data.objects:bpy.data.objects.remove(o,do_unlink=True)
print('Detailed forest, moss rocks, cliffs and wall growth composed in Blender:',len(SC.objects))
