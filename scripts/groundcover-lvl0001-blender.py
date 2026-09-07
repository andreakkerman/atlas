"""Route finishing pass: varied worn paving and botanically detailed ground cover."""
import bpy,math,random
from mathutils import Vector
ns=bpy.app.driver_namespace['atlas_authoring'];SC=ns['SC'];bpy.context.window.scene=SC
R=random.Random(9103);mesh=ns['mesh'];ground=ns['ground'];nearest=ns['nearest_route']

def template(name):
    src=bpy.data.objects[name];data=src.data.copy()
    lo=Vector(tuple(min(v.co[i] for v in data.vertices) for i in range(3)))
    hi=Vector(tuple(max(v.co[i] for v in data.vertices) for i in range(3)))
    center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
    for v in data.vertices:v.co-=center
    return data

grasses=[template('grass_medium_01_'+n+'_LOD0') for n in ['small_a','mid_b','tall_a','tall_b','tiny_a']]
flowers=[template('flower_heliophila_small'),template('flower_ursinia_b_LOD0'),template('flower_ursinia_c_LOD0')]
for o in list(SC.objects):
    if o.name.startswith('Woodland flower'):
        if 'Flower petals' in o.data.name:
            data=flowers[R.randrange(len(flowers))];n=bpy.data.objects.new('Detailed woodland flower',data);SC.collection.objects.link(n)
            n.location=o.location;n.scale=o.scale*1.6;n.rotation_euler=o.rotation_euler
        bpy.data.objects.remove(o,do_unlink=True)
    elif o.name=='Grass' or o.name.startswith('Grass.'):
        o.data=grasses[R.randrange(len(grasses))];o.scale*=R.uniform(1.4,2.4)
    elif o.name.startswith('Route flagstone'):
        bpy.data.objects.remove(o,do_unlink=True)

paving=[]
for k in range(18):
    outline=[(-.5,-.35),(-.31,-.5),(.32,-.5),(.5,-.30),(.5,.35),(.29,.5),(-.35,.5),(-.5,.30)]
    outline=[(x+R.uniform(-.065,.065),y+R.uniform(-.065,.065)) for x,y in outline]
    verts=[(x,y,z) for z in [-.17,0] for x,y in outline]
    faces=[tuple(reversed(range(8))),tuple(range(8,16))]+[(i,(i+1)%8,(i+1)%8+8,i+8) for i in range(8)]
    obj=mesh('Broad worn flagstone template',verts,faces,ns['ROCK'])
    bevel=obj.modifiers.new('Eroded edges','BEVEL');bevel.width=.035;bevel.segments=3
    bpy.context.view_layer.objects.active=obj;bpy.ops.object.modifier_apply(modifier=bevel.name)
    ns['uv_world'](obj,1.1);offset=Vector((R.random()*4,R.random()*4))
    for uv in obj.data.uv_layers.active.data:uv.uv+=offset
    obj.location.z=-100;paving.append(obj)

for a,b in zip(ns['ROUTE'],ns['ROUTE'][1:]):
    p,q=Vector(a[3]),Vector(b[3]);delta=q-p;length=math.hypot(delta.x,delta.y)
    steps=math.ceil(length/.85);side=Vector((delta.y,-delta.x,0)).normalized()
    for row in range(steps):
        for col in range(-2,3):
            t=max(.02,min(.98,(row+.5+(.32 if col%2 else -.12))/steps));pos=p+delta*t+side*(col*.83+R.uniform(-.055,.055));pos.z-=.085
            ns['instance'](paving[R.randrange(18)],'Route broad flagstone',pos,(R.uniform(.78,.91),R.uniform(.80,.98),1),math.atan2(side.y,side.x)+R.uniform(-.1,.1))
            if col in [-2,2] and row%3==0:
                n=bpy.data.objects.new('Paving edge tuft',grasses[R.randrange(4)]);SC.collection.objects.link(n);n.location=pos+side*(.3 if col>0 else -.3);n.scale=(.8,.8,.8);n.rotation_euler.z=R.random()*math.tau
for o in paving:bpy.data.objects.remove(o,do_unlink=True)
print('Worn broad paving, varied grasses and detailed flowers applied')
