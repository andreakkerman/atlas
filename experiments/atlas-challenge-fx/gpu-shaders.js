export {magic} from './gpu-particles.js';
export const post = /* wgsl */`
struct Params { v:array<vec4f,22> }
@group(0) @binding(0) var<uniform> p:Params;
@group(0) @binding(1) var source:texture_2d<f32>;
@group(0) @binding(2) var bloom:texture_2d<f32>;
@group(0) @binding(3) var samp:sampler;
struct Out {@builtin(position) pos:vec4f,@location(0) uv:vec2f}
@vertex fn screen(@builtin(vertex_index) i:u32)->Out {
 let q=array<vec2f,3>(vec2f(-1.,-1.),vec2f(3.,-1.),vec2f(-1.,3.))[i];var o:Out;o.pos=vec4f(q,0.,1.);o.uv=vec2f(q.x*.5+.5,.5-q.y*.5);return o;
}
fn blur(uv:vec2f,axis:vec2f)->vec4f {
 let d=axis/vec2f(textureDimensions(source));var c=textureSample(source,samp,uv).rgb*.227027;
 c+=(textureSample(source,samp,uv+d*1.384615).rgb+textureSample(source,samp,uv-d*1.384615).rgb)*.316216;
 c+=(textureSample(source,samp,uv+d*3.230769).rgb+textureSample(source,samp,uv-d*3.230769).rgb)*.070270;
 return vec4f(c,0.);
}
@fragment fn horizontal(o:Out)->@location(0) vec4f {return blur(o.uv,vec2f(4.,0.));}
@fragment fn vertical(o:Out)->@location(0) vec4f {return blur(o.uv,vec2f(0.,1.));}
@fragment fn finish(o:Out)->@location(0) vec4f {
 let hdr=textureSample(source,samp,o.uv).rgb+textureSample(bloom,samp,o.uv).rgb*p.v[17].x;
 let col=vec3f(1.)-exp(-hdr*p.v[17].y);let alpha=max(col.r,max(col.g,col.b));return vec4f(col,alpha);
}
`;
