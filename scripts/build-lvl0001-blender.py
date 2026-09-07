"""Atlas LVL-0001: reproducible Blender authoring. Execute stages through Blender MCP.
Blender coordinates are X/right, Y/along the route, Z/up; glTF converts to Y/up.
Existing unrelated Blender scenes are preserved.
"""
import bpy, math, random, json, os, shutil
from mathutils import Vector
from mathutils.noise import noise_vector
ROOT = 'D:/DevProjects/SvenAdventure'
OUT = ROOT + '/Levels/LVL-0001/3d'
os.makedirs(OUT + '/textures', exist_ok=True)
R = random.Random(12791)
ROUTE = [
 ('forest-start',175,635,(0,0,0)), ('forest-rune-approach',322,625,(0,5,.35)),
 ('center-trail',885,609,(3,21,.91)), ('lower-trail',1017,615,(5,26,.70)),
 ('trail-rise-2',1155,575,(7,32,2.10)), ('trail-top',1231,532,(8,36,3.605)),
 ('sun-rune-approach',1322,565,(9,40,2.45)), ('stone-rune-approach',1454,601,(10,45,1.19)),
 ('temple-approach',1617,594,(12,50,1.435)), ('gate-step-low',1679,579,(14,51,1.96)),
 ('wind-rune-approach',1697,536,(15,53,3.465)), ('gate-step-upper',1847,481,(18,56,5.39))]

def mesh(name, verts, faces, mat, smooth=False):
    data=bpy.data.meshes.new(name); data.from_pydata(verts,[],faces); data.update()
    obj=bpy.data.objects.new(name,data); SC.collection.objects.link(obj)
    if mat: data.materials.append(mat)
    for p in data.polygons: p.use_smooth=smooth
    return obj

def uv_world(obj, scale=1):
    uv=obj.data.uv_layers.new(name='UVMap')
    for p in obj.data.polygons:
        n=p.normal; axis=max(range(3),key=lambda i:abs(n[i])); axes=[i for i in range(3) if i!=axis]
        for li in p.loop_indices:
            v=obj.data.vertices[obj.data.loops[li].vertex_index].co
            uv.data[li].uv=(v[axes[0]]*scale,v[axes[1]]*scale)

def plain(name,color,rough=.85,emit=0):
    m=bpy.data.materials.new(name); m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*color,1)
    p.inputs['Roughness'].default_value=rough
    if emit:
        p.inputs['Emission Color'].default_value=(*color,1); p.inputs['Emission Strength'].default_value=emit
    m.diffuse_color=(*color,1); return m

def instance(template,name,pos,scale=(1,1,1),rotation=0):
    obj=bpy.data.objects.new(name,template.data); SC.collection.objects.link(obj)
    obj.location=pos; obj.scale=scale; obj.rotation_euler.z=rotation; return obj

def tube_geo(verts,faces,points,radii,sides=7):
    start=len(verts)
    for i,p in enumerate(points):
        p=Vector(p); tangent=Vector(points[min(len(points)-1,i+1)])-Vector(points[max(0,i-1)])
        tangent.normalize(); u=tangent.cross(Vector((0,1,0)))
        if u.length<.1: u=tangent.cross(Vector((1,0,0)))
        u.normalize(); v=tangent.cross(u)
        for j in range(sides): verts.append(tuple(p+(u*math.cos(j*math.tau/sides)+v*math.sin(j*math.tau/sides))*radii[i]))
    for i in range(len(points)-1):
        for j in range(sides):
            a=start+i*sides+j; b=start+i*sides+(j+1)%sides
            faces.append((a,b,b+sides,a+sides))
    faces.append(tuple(start+j for j in reversed(range(sides))))
    faces.append(tuple(start+(len(points)-1)*sides+j for j in range(sides)))

def curve(name,pts,radius,mat,closed=False):
    v=[];f=[]
    if closed: pts=pts+[pts[0]]
    tube_geo(v,f,pts,[radius]*len(pts),6)
    obj=mesh(name,v,f,mat,True); uv_world(obj); return obj

def nearest_route(x,y):
    best=(1e10,0)
    for a,b in zip(ROUTE,ROUTE[1:]):
        p,q=a[3],b[3]; dx=q[0]-p[0]; dy=q[1]-p[1]
        t=max(0,min(1,((x-p[0])*dx+(y-p[1])*dy)/(dx*dx+dy*dy)))
        d=math.hypot(x-p[0]-t*dx,y-p[1]-t*dy)
        if d<best[0]: best=(d,p[2]+t*(q[2]-p[2]))
    return best

def ground(x,y):
    d,h=nearest_route(x,y)
    hill=max(0,x-12)*.34+max(0,y-57)*.14
    noise=math.sin(x*.19+y*.1)*1.6+math.sin(y*.34-x*.12)*.8
    weight=min(1,max(0,(d-2.5)/8))
    return h+weight*(hill+noise)-.16

def stage_setup():
    global SC, BARK, ROCK, SOIL, WALL, MOSS, NEEDLES, LEAF, GOLD, DARK, RUNE
    existing=bpy.data.scenes.get('Atlas LVL-0001 First Person')
    if existing:
        for o in list(existing.objects): bpy.data.objects.remove(o,do_unlink=True)
        SC=existing
    else: SC=bpy.data.scenes.new('Atlas LVL-0001 First Person')
    bpy.context.window.scene=SC
    BARK=bpy.data.materials['knotted_pine_bark']; ROCK=bpy.data.materials['rock_boulder_dry']
    SOIL=bpy.data.materials['forrest_ground_01']; WALL=bpy.data.materials['mossy_stone_wall']
    for m in [BARK,ROCK,SOIL,WALL]:
        for i,n in enumerate(m.node_tree.nodes):
            if n.type=='TEX_IMAGE' and n.image:
                dst=OUT+'/textures/'+m.name+'_'+str(i)+'.jpg'
                if os.path.abspath(bpy.path.abspath(n.image.filepath))!=os.path.abspath(dst): shutil.copyfile(bpy.path.abspath(n.image.filepath),dst)
                n.image.filepath=dst
        # glTF requires a direct tangent-space Normal Map node, not a Cycles bump chain.
        normal=next((n for n in m.node_tree.nodes if n.type=='TEX_IMAGE' and n.image and 'nor_gl' in n.image.name),None)
        if normal:
            normal.image.colorspace_settings.name='Non-Color'
            nm=m.node_tree.nodes.new('ShaderNodeNormalMap');nm.inputs['Strength'].default_value=.8
            m.node_tree.links.new(normal.outputs['Color'],nm.inputs['Color'])
            m.node_tree.links.new(nm.outputs['Normal'],m.node_tree.nodes.get('Principled BSDF').inputs['Normal'])
    MOSS=plain('Moss velvet',(.115,.16,.025)); LEAF=plain('Fern living green',(.13,.21,.028))
    NEEDLES=plain('Fir needles',(.035,.105,.043)); GOLD=plain('Stone incisions',(.23,.18,.095))
    DARK=plain('Deep carved channels',(.08,.10,.075)); RUNE=plain('Turquoise rune light',(.005,.48,.40),.38,.9)
    # Real texture variation on leaves and moss, generated in Blender and exported.
    import numpy as np
    for m,base in [(MOSS,(.39,.46,.12)),(LEAF,(.37,.53,.13)),(NEEDLES,(.24,.39,.19))]:
        n=256; yy,xx=np.mgrid[0:n,0:n]; rng=np.random.default_rng(91)
        detail=.6+.22*np.sin(xx*.19)*np.sin(yy*.16)+.3*rng.random((n,n))
        pixels=np.ones((n,n,4),dtype=np.float32)
        for c in range(3): pixels[:,:,c]=base[c]*detail
        im=bpy.data.images.new(m.name+' albedo',width=n,height=n); im.pixels.foreach_set(pixels.ravel()); im.filepath_raw=OUT+'/textures/'+m.name.replace(' ','_')+'.png'; im.file_format='PNG';im.save()
        tex=m.node_tree.nodes.new('ShaderNodeTexImage');tex.image=im
        m.node_tree.links.new(tex.outputs['Color'],m.node_tree.nodes.get('Principled BSDF').inputs['Base Color'])
    SC.world=bpy.data.worlds.new('Atlas golden evening'); SC.world.use_nodes=True
    SC.world.node_tree.nodes['Background'].inputs['Color'].default_value=(.33,.45,.57,1)
    SC.world.node_tree.nodes['Background'].inputs['Strength'].default_value=.4
    SC.render.engine='CYCLES'; SC.cycles.samples=32
    SC.view_settings.view_transform='AgX'
    print('Dedicated scene and source PBR materials prepared')

def stage_terrain():
    global BLOCK, ROCKS
    v=[];f=[];nx=100;ny=120
    for j in range(ny+1):
        y=-26+j*1.
        for i in range(nx+1):
            x=-42+i*1.;v.append((x,y,ground(x,y)))
    for j in range(ny):
        for i in range(nx):
            a=j*(nx+1)+i;f.append((a,a+1,a+nx+2,a+nx+1))
    obj=mesh('Continuous forest terrain',v,f,SOIL,True);uv_world(obj,.22)
    # Eight irregular, bevel-worn rock solids, shared by boulders and cliff faces.
    ROCKS=[]
    for k in range(8):
        bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3,radius=1)
        o=bpy.context.object;o.name='Boulder master '+str(k);o.data.materials.append(ROCK)
        for vert in o.data.vertices:
            p=vert.co; n=noise_vector(p*2.1+Vector((k*7,0,0)))
            p*=1+n.x*.24; p.z*=.8; p.x+=n.y*.12
        for poly in o.data.polygons: poly.use_smooth=True
        uv_world(o,.6);o.location=(0,0,-100);ROCKS.append(o)
    bpy.ops.mesh.primitive_cube_add(size=1)
    BLOCK=bpy.context.object;BLOCK.name='Hand dressed stone master';BLOCK.data.materials.append(ROCK)
    bevel=BLOCK.modifiers.new('Worn stone edges','BEVEL');bevel.width=.07;bevel.segments=3
    bpy.context.view_layer.objects.active=BLOCK;bpy.ops.object.modifier_apply(modifier=bevel.name)
    uv_world(BLOCK,1.4);BLOCK.location=(0,0,-100)
    # Worn, irregular eight-sided flagstones, with individually varied shoulders.
    paving=[]
    for k in range(12):
        outline=[(-.5,-.33),(-.33,-.5),(.33,-.5),(.5,-.32),(.5,.32),(.32,.5),(-.32,.5),(-.5,.32)]
        outline=[(x+R.uniform(-.055,.055),y+R.uniform(-.055,.055)) for x,y in outline]
        verts=[(x,y,z) for z in [-.15,0] for x,y in outline]
        faces=[tuple(reversed(range(8))),tuple(range(8,16))]+[(i,(i+1)%8,(i+1)%8+8,i+8) for i in range(8)]
        obj=mesh('Worn flagstone master',verts,faces,ROCK)
        bevel=obj.modifiers.new('Chipped flagstone corners','BEVEL');bevel.width=.045;bevel.segments=2
        bpy.context.view_layer.objects.active=obj;bpy.ops.object.modifier_apply(modifier=bevel.name)
        uv_world(obj,1.2);obj.location.z=-100;paving.append(obj)
    # Individual flagstones follow the authored route, including its changes of elevation.
    for a,b in zip(ROUTE,ROUTE[1:]):
        p,q=Vector(a[3]),Vector(b[3]); d=q-p; length=math.hypot(d.x,d.y); steps=math.ceil(length/.65)
        side=Vector((d.y,-d.x,0)).normalized()
        for row in range(steps):
            t=(row+.5)/steps; center=p+d*t
            for col in range(-3,4):
                pos=center+side*(col*.63+R.uniform(-.09,.09));pos.z-=.08+R.uniform(0,.025)
                instance(paving[R.randrange(12)],'Route flagstone',pos,(R.uniform(.60,.71),R.uniform(.62,.77),1), math.atan2(side.y,side.x)+R.uniform(-.18,.18))
    # Composition anchors from the Atlas artwork: forest boulder, right cliff,
    # upper rune shelf and gate enclosure. Scatter keeps the route clear.
    for x,y,sx,sy,sz in [(4.6,10,2.2,2,2.3),(-5,3,1.4,2,1),(10,16,3,4,4),(14,24,3,4,5),(16,31,3,3,6),(18,36,3,4,5),(20,42,3,4,4),(27,49,3,4,6),(29,62,3,5,8),(-6,43,3,3,2.7)]:
        instance(ROCKS[R.randrange(8)],'Landmark cliff', (x,y,ground(x,y)+sz*.35),(sx,sy,sz),R.random()*6.28)
    for i in range(360):
        x=R.uniform(-22,37);y=R.uniform(-10,80);d,h=nearest_route(x,y)
        if d<3.1 or (11<x<26 and 49<y<68):continue
        s=R.uniform(.2,1.5) if d<7 else R.uniform(.8,3)
        o=instance(ROCKS[i%8],'Forest rock',(x,y,ground(x,y)+s*.22),(s,s*.8,s*.65),R.random()*6.28)
        # Separate moss crust geometry clings to upward rock faces.
        if i%3==0:
            verts=[];faces=[]
            for poly in o.data.polygons:
                if poly.normal.z<.5:continue
                start=len(verts)
                verts.extend([tuple(o.data.vertices[j].co*1.009) for j in poly.vertices]);faces.append(tuple(range(start,len(verts))))
            m=mesh('Boulder moss crust',verts,faces,MOSS,True);uv_world(m,3);m.location=o.location;m.scale=o.scale;m.rotation_euler=o.rotation_euler
    print('Terrain, flagstones, boulders and cliffs authored')

def blade(v,f,base,tip,width):
    b,t=Vector(base),Vector(tip); d=t-b;side=d.cross(Vector((0,0,1)))
    if side.length<.01:side=Vector((1,0,0))
    side.normalize();i=len(v); mid=b+d*.48
    v.extend([tuple(b),tuple(mid+side*width),tuple(t),tuple(mid-side*width),tuple(mid+Vector((0,0,width*.15)))])
    f.extend([(i,i+1,i+4),(i+1,i+2,i+4),(i+2,i+3,i+4),(i+3,i,i+4)])

def stage_forest():
    global PINES, FERN, GRASS
    PINES=[]
    for variant in range(3):
        v=[];f=[];nv=[];nf=[]; height=15+variant*2
        trunk=[(.10*math.sin(i*.5),.07*math.cos(i*.6),i*height/18) for i in range(19)]
        tube_geo(v,f,trunk,[.40*(1-i/19)**.85+.025 for i in range(19)],12)
        for tier in range(18):
            z=height*(.30+tier*.037); reach=(height-z)*.32
            for branch in range(7):
                angle=branch*math.tau/7+tier*2.4+R.uniform(-.15,.15);dx,dy=math.cos(angle),math.sin(angle)
                length=reach*R.uniform(.8,1.15)
                points=[(dx*length*j/5,dy*length*j/5,z-.5*math.sin(j/5*math.pi)+j*.02) for j in range(6)]
                tube_geo(v,f,[(0,0,z)]+points[1:],[.08,.07,.05,.035,.02,.005],5)
                for twig in range(1,8):
                    t=twig/8; pos=Vector((dx*length*t,dy*length*t,z-.48*math.sin(t*math.pi)))
                    for sign in [-1,1]:
                        tangent=Vector((dx*.4-sign*dy*.9,dy*.4+sign*dx*.9,.15))
                        for j in range(5):
                            seed=pos+tangent*(j*.13)
                            for side in [-1,1]:
                                tip=seed+Vector((dx*.26-side*dy*.22,dy*.26+side*dx*.22,.08))
                                blade(nv,nf,seed,tip,.065*(1-t*.35))
        trunkObj=mesh('Fir trunk '+str(variant),v,f,BARK,True);uv_world(trunkObj,.35);trunkObj.location.z=-100
        needles=mesh('Fir branches '+str(variant),nv,nf,NEEDLES,True);uv_world(needles,2);needles.location.z=-100
        PINES.append((trunkObj,needles))
    placements=[(-4,-1,1.5),(3.9,14,1.3),(-7,10,1.15),(9,24,1.2),(-5,27,.9)]
    for i in range(190):
        x=R.uniform(-38,48);y=R.uniform(-23,90)
        if nearest_route(x,y)[0]<6.5:continue
        if -21<x<-6 and 0<y<25:continue
        if 10<x<29 and 48<y<67:continue
        placements.append((x,y,R.uniform(.65,1.3)))
    for i,(x,y,s) in enumerate(placements):
        angle=R.random()*6.28
        for template in PINES[i%3]: instance(template,'Forest fir',(x,y,ground(x,y)),(s,s,s),angle)
    v=[];f=[]
    for frond in range(9):
        a=frond*math.tau/9;direction=Vector((math.cos(a),math.sin(a),0));length=R.uniform(.65,1.05)
        for j in range(1,16):
            t=j/16;base=direction*(t*length);base.z=.05+.65*math.sin(t*math.pi*.7)
            width=.19*math.sin(t*math.pi)**.7
            for side in [-1,1]:
                tip=base+Vector((-direction.y*side*width,direction.x*side*width,-.035))+direction*.09
                blade(v,f,base,tip,.053*(1-t*.5))
    FERN=mesh('Fern compound fronds master',v,f,LEAF,True);uv_world(FERN,4);FERN.location.z=-100
    v=[];f=[]
    for i in range(11):
        a=R.random()*6.28;b=(R.uniform(-.12,.12),R.uniform(-.12,.12),0)
        blade(v,f,b,(math.cos(a)*.2,math.sin(a)*.2,R.uniform(.18,.46)),.014)
    GRASS=mesh('Grass blades master',v,f,MOSS,True);uv_world(GRASS,5);GRASS.location.z=-100
    for i in range(15500):
        x=R.uniform(-19,33);y=R.uniform(-8,73);d,_=nearest_route(x,y)
        if d<2.0 or (d>9 and R.random()<.65):continue
        template=FERN if i%3==0 else GRASS;s=R.uniform(.70,1.5)
        instance(template,'Fern' if i%4==0 else 'Grass',(x,y,ground(x,y)+.02),(s,s,s),R.random()*6.28)
    # Petaled woodland flowers, modeled in volume rather than billboard clumps.
    for color in [(.42,.09,.34),(.64,.60,.34),(.13,.29,.52)]:
        mat=plain('Wildflower '+str(color),color,.7);v=[];f=[]
        tube_geo(v,f,[(0,0,0),(.01,0,.3),(.025,.01,.48)],[.01,.007,.004],4)
        stem=mesh('Flower stem master',v,f,LEAF,True);uv_world(stem);stem.location.z=-100
        v=[];f=[]
        for j in range(5):
            a=j*math.tau/5;blade(v,f,(.025,.01,.48),(.025+math.cos(a)*.095,.01+math.sin(a)*.095,.51),.035)
        flower=mesh('Flower petals master',v,f,mat,True);flower.location.z=-100
        for i in range(110):
            x=R.uniform(-6,24);y=R.uniform(-2,58);d,_=nearest_route(x,y)
            if not 2.2<d<5.8:continue
            s=R.uniform(.7,1.4);a=R.random()*6.28
            for template in [stem,flower]:instance(template,'Woodland flower',(x,y,ground(x,y)),(s,s,s),a)
    print('Volumetric fir trees, ferns, grass and woodland flowers authored')

def rune_stone(name,pos,height=3,width=1.3,glowing=True):
    v=[];f=[];rings=14;sides=14
    for j in range(rings):
        z=j/(rings-1)*height;cap=math.sqrt(max(.035,1-max(0,(j/(rings-1)-.65)/.35)**2))
        for k in range(sides):
            a=k*math.tau/sides;v.append((math.cos(a)*width*.5*cap,math.sin(a)*width*.25*cap,z))
    for j in range(rings-1):
        for k in range(sides):
            a=j*sides+k;b=j*sides+(k+1)%sides;f.append((a,b,b+sides,a+sides))
    f.append(tuple(reversed(range(sides))));f.append(tuple((rings-1)*sides+i for i in range(sides)))
    stone=mesh(name,v,f,ROCK,True);uv_world(stone,1);stone.location=pos
    # Relief knotwork and incised diamond channels wrap the solid monolith.
    def front(x,z):
        cap=math.sqrt(max(.035,1-max(0,(z/height-.65)/.35)**2))
        return pos[1]-width*.25*cap*math.sqrt(max(.01,1-(x/(width*.5*cap))**2))-.012
    for z in [.20*height,.72*height,.87*height]:
        for sign in [-1,1]:
            pts=[]
            for j in range(33):
                t=j/32*math.tau;xx=math.sin(t)*width*.16+sign*width*.12;zz=z+math.sin(t*2)*height*.06
                pts.append((pos[0]+xx,front(xx,zz),pos[2]+zz))
            curve(name+' knot carving',pts,.011,GOLD)
    if not glowing:return stone
    cy=height*.47;sz=height*.19
    for mul,mat,radius in [(1.12,DARK,.029),(1,RUNE,.018)]:
        points=[]
        corners=[(0,cy+sz*mul),(sz*.6*mul,cy),(0,cy-sz*mul),(-sz*.6*mul,cy)]
        for a,b in zip(corners,corners[1:]+corners[:1]):
            for j in range(9):
                t=j/9;xx=a[0]+(b[0]-a[0])*t;zz=a[1]+(b[1]-a[1])*t;points.append((pos[0]+xx,front(xx,zz)-.008,pos[2]+zz))
        curve(name+' diamond',points,radius,mat,True)
    curve(name+' inner rune',[(pos[0],pos[1]-width*.27,pos[2]+cy+sz*.46),(pos[0]+sz*.25,pos[1]-width*.27,pos[2]+cy),(pos[0],pos[1]-width*.27,pos[2]+cy-sz*.46)],.026,RUNE)
    return stone

def stage_temple():
    rune_stone('forestRune',(-2.8,5,.0),3.1,1.55)
    rune_stone('zon',(12.8,35,6.1),4.8,1.4)
    rune_stone('steen',(13.3,46,2.7),3.8,1.35)
    cx,cy,base=19,59,5.35
    # Modular masonry surrounds a real arched doorway. The building has side,
    # rear walls and a roof, so looking around never reveals a one-sided facade.
    for side in [-1,1]:
        for row in range(11):
            for col in range(4):
                x=cx+side*(2.7+col*1.1);z=base+.33+row*.63
                instance(BLOCK,'Temple facade masonry',(x,cy,z),(1.04,.95,.60),R.uniform(-.018,.018))
    for row in range(10):
        for col in range(12):
            for side in [-1,1]:instance(BLOCK,'Temple side masonry',(cx+side*6.2,cy+col*.72,base+.3+row*.63),(.9,.68,.60))
            instance(BLOCK,'Temple rear masonry',(cx-6+col*1.05,cy+8,base+.3+row*.63),(1.0,.9,.6))
    instance(BLOCK,'Temple roof',(cx,cy+4,base+6.5),(13,9,.7))
    # Voussoir arch, each stone has radial side faces and beveled edges.
    for j in range(17):
        a=j/16*math.pi;x=cx+math.cos(a)*2.6;z=base+3.55+math.sin(a)*2.6
        o=instance(BLOCK,'Arch keystone',(x,cy-.18,z),(.65,1.25,.87));o.rotation_euler.y=a-math.pi/2
    # Solid double gate with an arched upper profile and raised concentric carvings.
    for half in [-1,1]:
        verts=[]
        outline=[(0,0),(half*2.18,0),(half*2.18,3.55)]
        angles=[(0+i/12*math.pi/2) if half==1 else (math.pi-i/12*math.pi/2) for i in range(13)]
        outline.extend([(math.cos(a)*2.18,3.55+math.sin(a)*2.18) for a in angles]);outline.append((0,0))
        for yy in [cy-.30,cy+.05]:verts.extend([(cx+x,yy,base+z) for x,z in outline])
        n=len(outline);faces=[tuple(reversed(range(n))),tuple(range(n,n*2))]
        for i in range(n-1):faces.append((i,i+1,i+1+n,i+n))
        obj=mesh('templeGate door',verts,faces,WALL);uv_world(obj,.3)
    for radius in [1.35,1.72,2.08]:
        pts=[(cx+math.cos(j/96*math.tau)*radius,cy-.36,base+2.95+math.sin(j/96*math.tau)*radius) for j in range(97)]
        curve('Door concentric carved border',pts,.035,GOLD)
    for j in range(16):
        a=j*math.tau/16;x=cx+math.cos(a)*1.75;z=base+2.95+math.sin(a)*1.75
        pts=[(x+math.sin(t/16*math.tau)*.19,cy-.4,z+math.sin(t/16*math.tau*2)*.22) for t in range(17)]
        curve('Door interlaced knot',pts,.022,GOLD)
    for size,mat,r in [(1.12,DARK,.15),(.95,RUNE,.045),(.52,RUNE,.038)]:
        curve('Gate diamond sigil',[(cx,cy-.49,base+2.95+size),(cx+size*.65,cy-.49,base+2.95),(cx,cy-.49,base+2.95-size),(cx-size*.65,cy-.49,base+2.95)],r,mat,True)
    # Guardian pillars: sculptural helmet, brow, nose, braided beard and arm panels.
    for side in [-1,1]:
        x=cx+side*3.30
        instance(BLOCK,'Guardian plinth',(x,cy-.6,base+.3),(1.65,1.6,.6))
        rune_stone('Guardian carved column',(x,cy-.72,base+.55),4.85,1.4,False)
        bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=16,location=(x,cy-.88,base+4.90))
        head=bpy.context.object;head.name='Guardian face';head.scale=(.57,.40,.72);head.data.materials.append(ROCK);uv_world(head)
        for vx in head.data.vertices:
            if vx.co.y<-.25:
                vx.co.y-=.25*math.exp(-vx.co.x**2*38-(vx.co.z+.1)**2*4)
        for b in range(9):
            ox=(b-4)*.105;pts=[]
            for j in range(15):
                t=j/14;pts.append((x+ox*(1-t*.7)+math.sin(t*13+b)*.045,cy-1.25+math.sin(t*9+b)*.025,base+4.7-t*1.6))
            curve('Guardian braided beard',pts,.060,ROCK)
        for sign in [-1,1]:
            curve('Guardian heavy brow',[(x+sign*.08,cy-1.3,base+5.06),(x+sign*.27,cy-1.28,base+5.13),(x+sign*.44,cy-1.18,base+5.05)],.062,GOLD)
        bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=12,location=(x,cy-.90,base+5.42))
        helmet=bpy.context.object;helmet.name='Guardian helmet';helmet.scale=(.63,.47,.57);helmet.data.materials.append(WALL);uv_world(helmet)
        curve('Helmet band',[(x+math.cos(t/40*math.tau)*.63,cy-.9+math.sin(t/40*math.tau)*.47,base+5.35) for t in range(41)],.075,GOLD)
    for row in range(8):
        for col in range(10):
            x=cx-4.9+col*1.04;y=cy-4.8+row*.55;top=base-.82+row*.125;bottom=min(ground(x,y)-.2,top-.24)
            instance(BLOCK,'Temple stair',(x,y,(top+bottom)*.5),(1,.64,top-bottom))
    # Wall moss and living plants break the masonry silhouette.
    for i in range(210):
        x=R.uniform(cx-6,cx+6);z=R.uniform(base,base+6.8)
        if abs(x-cx)<2.45 and z<base+5.8:continue
        instance(GRASS,'Masonry moss',(x,cy-.72,z),(R.uniform(.6,1.1),.7,.45),R.random()*6.28)
    for side in [-1,1]:
        x=cx+side*2.8
        bpy.ops.mesh.primitive_uv_sphere_add(segments=20,ring_count=12,location=(x,cy-1.3,base+.75))
        bowl=bpy.context.object;bowl.name='Brazier stone bowl';bowl.scale=(.5,.5,.20);bowl.data.materials.append(ROCK);uv_world(bowl)
        marker=bpy.data.objects.new('fire_'+str(side),None);SC.collection.objects.link(marker);marker.location=(x,cy-1.3,base+1)
    print('Solid runestones, temple enclosure, carved gates and guardians authored')

def stage_export():
    # Vertex-painted moss weathering is exported with every shared rock mesh.
    for obj in ROCKS:
        colors=obj.data.color_attributes.get('Moss weathering') or obj.data.color_attributes.new(name='Moss weathering',type='FLOAT_COLOR',domain='POINT')
        obj.data.color_attributes.active_color=colors
        for vert in obj.data.vertices:
            n=noise_vector(vert.co*9).x
            cover=max(0,min(1,(vert.normal.z-.30+n*.35)*2.6))
            colors.data[vert.index].color=(1-cover*.63,1-cover*.44,1-cover*.86,1)
    # The authoring scene uses the same sunset environment as the browser.
    env=next((n for n in SC.world.node_tree.nodes if n.type=='TEX_ENVIRONMENT'),None) or SC.world.node_tree.nodes.new('ShaderNodeTexEnvironment')
    env.image=bpy.data.images.load(OUT+'/qwantani_sunset_puresky_2k.hdr',check_existing=True)
    SC.world.node_tree.links.new(env.outputs['Color'],SC.world.node_tree.nodes['Background'].inputs['Color'])
    # Delete only our hidden template objects; instances retain their shared meshes.
    for obj in list(SC.objects):
        if obj.location.z < -90:bpy.data.objects.remove(obj,do_unlink=True)
    route_data=[]
    for name,x,y,pos in ROUTE:route_data.append({'id':name,'atlas':[x,y],'position':[pos[0],pos[2],-pos[1]]})
    landmarks={'forestRune':[-2.8,1.5,-5],'zon':[12.8,8.3,-35],'steen':[13.3,4.5,-46],'wind':[17.8,6.9,-57],'templeGate':[19,8.3,-58.5]}
    with open(OUT+'/route.json','w') as f:json.dump({'levelId':'LVL-0001','eyeHeight':1.58,'route':route_data,'landmarks':landmarks},f,indent=2)
    # A real authored Blender camera/light rig accompanies the game-ready asset.
    sun=SC.objects.get('Golden hour sun')
    if sun is None:
        ld=bpy.data.lights.new('Golden hour sun','SUN');sun=bpy.data.objects.new('Golden hour sun',ld);SC.collection.objects.link(sun)
    sun.data.energy=7.5;sun.data.angle=.055;sun.rotation_euler=Vector((32,25,-42)).to_track_quat('-Z','Y').to_euler()
    cam=SC.objects.get('Sven eyes')
    if cam is None:
        cd=bpy.data.cameras.new('Sven eyes');cam=bpy.data.objects.new('Sven eyes',cd);SC.collection.objects.link(cam)
    cam.location=(0,0,1.58);cam.rotation_euler=(Vector((1,12,2))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.lens=24;SC.camera=cam
    SC.render.resolution_x=1419;SC.render.resolution_y=867;SC.render.resolution_percentage=100
    # Pack image dependencies so the editable checkpoint survives moving the repo.
    used_images=set()
    for obj in SC.objects:
        if obj.type!='MESH':continue
        for mat in obj.data.materials:
            if mat and mat.use_nodes:
                for node in mat.node_tree.nodes:
                    if node.type=='TEX_IMAGE' and node.image:used_images.add(node.image)
    for image in used_images:
        if not image.packed_file:image.pack()
    if not env.image.packed_file:env.image.pack()
    bpy.ops.wm.save_as_mainfile(filepath=OUT+'/lvl0001.blend')
    bpy.ops.export_scene.gltf(filepath=OUT+'/lvl0001.glb',export_format='GLB',use_active_scene=True,export_yup=True,export_apply=True,export_gpu_instances=True,export_lights=False,export_cameras=False,export_image_format='WEBP',export_image_quality=88,export_extras=True)
    print({'objects':len(SC.objects),'glb_bytes':os.path.getsize(OUT+'/lvl0001.glb')})

if __name__ == '__main__':
    stage_setup();stage_terrain();stage_forest();stage_temple();stage_export()
