"""Replace only the existing shared grass primitive in an Atlas GLB.

Usage: python scripts/patch-atlas-grass.py baseline.glb blade.glb candidate.glb
Preserves all nodes, placements, materials, textures and other mesh payloads.
"""
import copy, hashlib, json, struct, sys
from pathlib import Path

def read(path):
    data=Path(path).read_bytes()
    assert data[:4]==b'glTF' and struct.unpack_from('<I',data,4)[0]==2
    size=struct.unpack_from('<I',data,12)[0]
    return json.loads(data[20:20+size]),data[28+size:]

def patch(baseline,blade,output):
    g,binary=read(baseline);c,cb=read(blade)
    before=copy.deepcopy(g)
    nodes=[n for n in g['nodes'] if n.get('extras',{}).get('curatedSource')=='grass2']
    assert len(nodes)==4000 and len({n['mesh'] for n in nodes})==1
    p=g['meshes'][nodes[0]['mesh']]['primitives'][0]
    q=c['meshes'][0]['primitives'][0]
    assert p['attributes'].keys()==q['attributes'].keys()
    assert c['materials'][q['material']]['pbrMetallicRoughness']==g['materials'][p['material']]['pbrMetallicRoughness']
    for name,old in {**p['attributes'],'indices':p['indices']}.items():
        new=q['indices'] if name=='indices' else q['attributes'][name]
        a=c['accessors'][new]
        assert all(g['accessors'][old].get(k)==a.get(k) for k in ['count','type','componentType'])
        g['accessors'][old]=copy.deepcopy(a)
    d=p['extensions']['KHR_draco_mesh_compression']
    other=q['extensions']['KHR_draco_mesh_compression']
    view=other['bufferView'];v=c['bufferViews'][view]
    replacement=cb[v.get('byteOffset',0):v.get('byteOffset',0)+v['byteLength']]
    target=d['bufferView'];d['attributes']=other['attributes']
    payload=bytearray();unchanged=0
    for i,v in enumerate(g['bufferViews']):
        old=before['bufferViews'][i]
        original=binary[old.get('byteOffset',0):old.get('byteOffset',0)+old['byteLength']]
        chunk=replacement if i==target else original
        while len(payload)%4:payload.append(0)
        v['byteOffset']=len(payload);v['byteLength']=len(chunk);payload.extend(chunk)
        if i!=target:
            assert bytes(payload[v['byteOffset']:v['byteOffset']+v['byteLength']])==original
            unchanged+=1
    g['buffers'][0]['byteLength']=len(payload)
    while len(payload)%4:payload.append(0)
    j=json.dumps(g,separators=(',',':')).encode()
    while len(j)%4:j+=b' '
    data=struct.pack('<4sII',b'glTF',2,28+len(j)+len(payload))+struct.pack('<I4s',len(j),b'JSON')+j+struct.pack('<I4s',len(payload),b'BIN\0')+payload
    assert g['nodes']==before['nodes'] and g['materials']==before['materials']
    assert len(data)<Path(baseline).stat().st_size+4096
    Path(output).write_bytes(data)
    report={'baselineSHA256':hashlib.sha256(Path(baseline).read_bytes()).hexdigest(),
        'candidateSHA256':hashlib.sha256(data).hexdigest(),'baselineBytes':Path(baseline).stat().st_size,
        'candidateBytes':len(data),'changedBufferView':target,'unchangedBufferViews':unchanged,
        'placementsUnchanged':True,'materialsUnchanged':True,'grassInstances':len(nodes),
        'grassTriangles':g['accessors'][p['indices']]['count']//3}
    Path(output).with_suffix('.audit.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report))

if __name__=='__main__':patch(*sys.argv[1:])
