"""Real-time conifer canopies: solid trunks/branches and folded, textured twig clusters."""
import bpy,math,random
from mathutils import Vector
ns=bpy.app.driver_namespace['atlas_authoring'];SC=ns['SC'];R=random.Random(838)
bpy.context.window.scene=SC
mesh=ns['mesh'];tube=ns['tube_geo'];uv_world=ns['uv_world']
root=ns['OUT']+'/sources/fir_tree_01/textures/'
mat=bpy.data.materials.new('Living fir twig clusters');mat.use_nodes=True
p=mat.node_tree.nodes.get('Principled BSDF');p.inputs['Roughness'].default_value=.87
for filename,socket in [('fir_tree_01_twig_diff_2k.jpg','Base Color'),('twig_alpha_2k.png','Alpha')]:
    node=mat.node_tree.nodes.new('ShaderNodeTexImage');node.image=bpy.data.images.load(root+filename,check_existing=True)
    if socket=='Alpha':node.image.colorspace_settings.name='Non-Color'
    mat.node_tree.links.new(node.outputs['Color'],p.inputs[socket])
mat.surface_render_method='DITHERED'
variants=[]
for variant in range(3):
    height=17+variant*1.5;v=[];f=[];lv=[];lf=[];uvs=[]
    trunk=[(.13*math.sin(i*.6),.11*math.sin(i*.4),height*i/24) for i in range(25)]
    tube(v,f,trunk,[.60*(1-i/25)**1.1+.025 for i in range(25)],16)
    for tier in range(19):
        z=height*(.27+tier*.037);reach=(height-z)*.30
        for b in range(8):
            a=b*math.tau/8+tier*2.7+R.uniform(-.18,.18);d=Vector((math.cos(a),math.sin(a),0));side=Vector((-d.y,d.x,0))
            length=reach*R.uniform(.8,1.18)
            points=[tuple(d*length*j/7+Vector((0,0,z-.45*math.sin(j/7*math.pi)))) for j in range(8)]
            tube(v,f,points,[.085*(1-j/7)+.006 for j in range(8)],6)
            for j in range(1,9):
                t=j/9;base=d*length*t+Vector((0,0,z-.42*math.sin(t*math.pi)))
                for sign in [-1,1]:
                    direction=(d*.40+side*sign*.85+Vector((0,0,R.uniform(-.10,.22)))).normalized()
                    extent=R.uniform(.95,1.45)*(1-t*.22)
                    across=(direction.cross(Vector((0,0,1))).normalized()*math.cos(j*.8)+Vector((0,0,math.sin(j*.8)))).normalized()*extent*.38
                    start=base-direction*.08;tip=base+direction*extent
                    middle=(start+tip)*.5+Vector((0,0,extent*.11))
                    i=len(lv);lv.extend([tuple(start-across*.45),tuple(start+across*.45),tuple(middle-across),tuple(middle+across),tuple(tip-across*.25),tuple(tip+across*.25)])
                    # Use the isolated right-hand twig in the photographed atlas.
                    u0,u1=.66,.99;v0,v1=.61,.99
                    uvs.extend([(u0,v0),(u1,v0),(u0,(v0+v1)/2),(u1,(v0+v1)/2),(u0,v1),(u1,v1)])
                    lf.extend([(i,i+1,i+3,i+2),(i+2,i+3,i+5,i+4)])
    wood=mesh('Mature conifer wood '+str(variant),v,f,ns['BARK'],True);uv_world(wood,.35)
    leaves=mesh('Mature conifer foliage '+str(variant),lv,lf,mat,True)
    layer=leaves.data.uv_layers.new(name='UVMap')
    for poly in leaves.data.polygons:
        for li in poly.loop_indices:layer.data[li].uv=uvs[leaves.data.loops[li].vertex_index]
    wood.location.z=leaves.location.z=-100;variants.append((wood,leaves))

placements=[]
for o in list(SC.objects):
    if o.name.startswith(('Atlas living fir','Young fir')) or (o.name.startswith('Layered forest conifer') and o.data.name.startswith('Mature conifer wood')):
        placements.append((o.location.copy(),o.scale.copy(),o.rotation_euler.z))
        bpy.data.objects.remove(o,do_unlink=True)
    elif o.name.startswith('Layered forest conifer'):
        bpy.data.objects.remove(o,do_unlink=True)
for i,(pos,scale,angle) in enumerate(placements):
    for template in variants[i%3]:
        o=bpy.data.objects.new('Layered forest conifer',template.data);SC.collection.objects.link(o);o.location=pos;o.scale=scale;o.rotation_euler.z=angle
for pair in variants:
    for o in pair:bpy.data.objects.remove(o,do_unlink=True)
print('Fuller mature canopies and thick trunks:',len(placements))
