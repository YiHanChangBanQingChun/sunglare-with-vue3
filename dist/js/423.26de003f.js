"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[423],{37072:function(e,t,n){n.d(t,{a:function(){return c},c:function(){return r},f:function(){return i}});n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);function r(){return[1,0,0,0,1,0,0,0,1]}function o(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]]}function i(e,t,n,r,o,i,c,s,u){return[e,t,n,r,o,i,c,s,u]}function c(e,t){return new Float64Array(e,t,9)}Object.freeze(Object.defineProperty({__proto__:null,clone:o,create:r,createView:c,fromValues:i},Symbol.toStringTag,{value:"Module"}))},26671:function(e,t,n){n.d(t,{I:function(){return s},a:function(){return c},b:function(){return o},c:function(){return r}});n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);function r(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function o(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]]}function i(e,t,n,r,o,i,c,s,u,f,a,l,d,h,g,y){return[e,t,n,r,o,i,c,s,u,f,a,l,d,h,g,y]}function c(e,t){return new Float64Array(e,t,16)}const s=r();Object.freeze(Object.defineProperty({__proto__:null,IDENTITY:s,clone:o,create:r,createView:c,fromValues:i},Symbol.toStringTag,{value:"Module"}))},71784:function(e,t,n){n.d(t,{I:function(){return s},a:function(){return r},b:function(){return o},c:function(){return c}});n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);function r(){return[0,0,0,1]}function o(e){return[e[0],e[1],e[2],e[3]]}function i(e,t,n,r){return[e,t,n,r]}function c(e,t){return new Float64Array(e,t,4)}const s=r();Object.freeze(Object.defineProperty({__proto__:null,IDENTITY:s,clone:o,create:r,createView:c,fromValues:i},Symbol.toStringTag,{value:"Module"}))},57488:function(e,t,n){n.d(t,{a:function(){return M},c:function(){return y},f:function(){return A},g:function(){return S},h:function(){return m},j:function(){return O},l:function(){return V}});n(51020);var r=n(15114),o=n(26011),i=n(90183),c=n(67886),s=n(456),u=n(22095),f=n(18439),a=n(22426),l=n(96883),d=n(47148),h=n(56749);const g=y();function y(){return(0,f.c)()}function m(e,t=y()){return(0,u.c)(t,e)}function p(e,t){return(0,f.f)(e[0],e[1],e[2],t)}function _(e){return e}function b(e){e[0]=e[1]=e[2]=e[3]=0}function w(e,t){return e[0]=e[1]=e[2]=0,e[3]=t,e}function M(e){return e[3]}function S(e){return e}function A(e,t,n,r){return(0,f.f)(e,t,n,r)}function v(e,t,n){return e!==n&&(0,c.c)(n,e),n[3]=e[3]+t,n}function P(e,t,n){return r.A.getLogger("geoscene.geometry.support.sphere").error("sphere.setExtent is not yet supported"),e===n?n:m(e,n)}function E(e,t,n){if(null==t)return!1;const{origin:r,direction:o}=t,i=B;i[0]=r[0]-e[0],i[1]=r[1]-e[1],i[2]=r[2]-e[2];const c=o[0]*o[0]+o[1]*o[1]+o[2]*o[2];if(0===c)return!1;const s=2*(o[0]*i[0]+o[1]*i[1]+o[2]*i[2]),u=s*s-4*c*(i[0]*i[0]+i[1]*i[1]+i[2]*i[2]-e[3]*e[3]);if(u<0)return!1;const f=Math.sqrt(u);let a=(-s-f)/(2*c);const l=(-s+f)/(2*c);return(a<0||l<a&&l>0)&&(a=l),!(a<0)&&(n&&(n[0]=r[0]+o[0]*a,n[1]=r[1]+o[1]*a,n[2]=r[2]+o[2]*a),!0)}const B=(0,s.c)();function O(e,t){return E(e,t,null)}function R(e,t,n){if(E(e,t,n))return n;const r=I(e,t,h.rq.get());return(0,c.a)(n,t.origin,(0,c.g)(h.rq.get(),t.direction,(0,c.i)(t.origin,r)/(0,c.l)(t.direction))),n}function I(e,t,n){const r=h.rq.get(),o=h.Rc.get();(0,c.f)(r,t.origin,t.direction);const s=M(e);(0,c.f)(n,r,t.origin),(0,c.g)(n,n,1/(0,c.l)(n)*s);const u=F(e,t.origin),f=(0,d.g7)(t.origin,n);return(0,i.d)(o,f+u,r),(0,c.m)(n,n,o),n}function T(e,t,n){return E(e,t,n)?n:((0,l.oC)(t,S(e),n),L(e,n,n))}function L(e,t,n){const r=(0,c.b)(h.rq.get(),t,S(e)),o=(0,c.g)(h.rq.get(),r,e[3]/(0,c.l)(r));return(0,c.a)(n,o,S(e))}function x(e,t){const n=(0,c.b)(h.rq.get(),t,S(e)),r=(0,c.p)(n),o=e[3]*e[3];return Math.sqrt(Math.abs(r-o))}function F(e,t){const n=(0,c.b)(h.rq.get(),t,S(e)),r=(0,c.l)(n),i=M(e),s=i+Math.abs(i-r);return(0,o.XM)(i/s)}const N=(0,s.c)();function C(e,t,n,r){const i=(0,c.b)(N,t,S(e));switch(n){case a._.X:{const e=(0,o.jU)(i,N)[2];return(0,c.s)(r,-Math.sin(e),Math.cos(e),0)}case a._.Y:{const e=(0,o.jU)(i,N),t=e[1],n=e[2],s=Math.sin(t);return(0,c.s)(r,-s*Math.cos(n),-s*Math.sin(n),Math.cos(t))}case a._.Z:return(0,c.n)(r,i);default:return}}function j(e,t){const n=(0,c.b)(z,t,S(e));return(0,c.l)(n)-e[3]}function U(e,t,n,r){const o=j(e,t),i=C(e,t,a._.Z,z),s=(0,c.g)(z,i,n-o);return(0,c.a)(r,t,s)}function V(e,t){const n=(0,c.d)(S(e),t),r=M(e);return n<=r*r}function Y(e,t,n=y()){const r=(0,c.i)(e,t),o=e[3],i=t[3];return r+i<o?((0,u.c)(n,e),n):r+o<i?((0,u.c)(n,t),n):((0,c.h)(n,e,t,(r+i-o)/(2*r)),n[3]=(r+o+i)/2,n)}const z=(0,s.c)(),D=y();Object.freeze(Object.defineProperty({__proto__:null,NullSphere:g,altitudeAt:j,angleToSilhouette:F,axisAt:C,clear:b,closestPoint:T,closestPointOnSilhouette:I,containsPoint:V,copy:m,create:y,distanceToSilhouette:x,elevate:v,fromCenterAndRadius:p,fromRadius:w,fromValues:A,getCenter:S,getRadius:M,intersectRay:E,intersectRayClosestSilhouette:R,intersectsRay:O,projectPoint:L,setAltitudeAt:U,setExtent:P,tmpSphere:D,union:Y,wrap:_},Symbol.toStringTag,{value:"Module"}))},9030:function(e,t,n){n.d(t,{a:function(){return s},b:function(){return c},c:function(){return o},d:function(){return a},e:function(){return u},n:function(){return l},s:function(){return f},t:function(){return i}});var r=n(28672);function o(e,t,n){i(e.typedBuffer,t.typedBuffer,n,e.typedBufferStride,t.typedBufferStride)}function i(e,t,n,o=3,i=o){if(e.length/o!==Math.ceil(t.length/i))return r.J.error("source and destination buffers need to have the same number of elements"),e;const c=e.length/o,s=n[0],u=n[1],f=n[2],a=n[4],l=n[5],d=n[6],h=n[8],g=n[9],y=n[10],m=n[12],p=n[13],_=n[14];let b=0,w=0;for(let r=0;r<c;r++){const n=t[b],r=t[b+1],c=t[b+2];e[w]=s*n+a*r+h*c+m,e[w+1]=u*n+l*r+g*c+p,e[w+2]=f*n+d*r+y*c+_,b+=i,w+=o}return e}function c(e,t,n){s(e.typedBuffer,t.typedBuffer,n,e.typedBufferStride,t.typedBufferStride)}function s(e,t,n,o=3,i=o){if(e.length/o!==Math.ceil(t.length/i))return void r.J.error("source and destination buffers need to have the same number of elements");const c=e.length/o,s=n[0],u=n[1],f=n[2],a=n[3],l=n[4],d=n[5],h=n[6],g=n[7],y=n[8];let m=0,p=0;for(let r=0;r<c;r++){const n=t[m],r=t[m+1],c=t[m+2];e[p]=s*n+a*r+h*c,e[p+1]=u*n+l*r+g*c,e[p+2]=f*n+d*r+y*c,m+=i,p+=o}}function u(e,t,n){f(e.typedBuffer,t,n,e.typedBufferStride)}function f(e,t,n,r=3){const o=Math.min(e.length/r,t.count),i=t.typedBuffer,c=t.typedBufferStride;let s=0,u=0;for(let f=0;f<o;f++)e[u]=n*i[s],e[u+1]=n*i[s+1],e[u+2]=n*i[s+2],s+=c,u+=r}function a(e,t){l(e.typedBuffer,t.typedBuffer,e.typedBufferStride,t.typedBufferStride)}function l(e,t,n=3,r=n){const o=Math.min(e.length/n,t.length/r);let i=0,c=0;for(let s=0;s<o;s++){const o=t[i],s=t[i+1],u=t[i+2],f=o*o+s*s+u*u;if(f>0){const t=1/Math.sqrt(f);e[c]=t*o,e[c+1]=t*s,e[c+2]=t*u}i+=r,c+=n}}function d(e,t,n){const r=Math.min(e.count,t.count),o=e.typedBuffer,i=e.typedBufferStride,c=t.typedBuffer,s=t.typedBufferStride;let u=0,f=0;for(let a=0;a<r;a++)o[f]=c[u]>>n,o[f+1]=c[u+1]>>n,o[f+2]=c[u+2]>>n,u+=s,f+=i}Object.freeze(Object.defineProperty({__proto__:null,normalize:l,normalizeView:a,scale:f,scaleView:u,shiftRight:d,transformMat3:s,transformMat3View:c,transformMat4:i,transformMat4View:o},Symbol.toStringTag,{value:"Module"}))},92403:function(e,t,n){var r;n.d(t,{u:function(){return r}}),function(e){e[e.KILOBYTES=1024]="KILOBYTES",e[e.MEGABYTES=1048576]="MEGABYTES",e[e.GIGABYTES=1073741824]="GIGABYTES"}(r||(r={}))},51521:function(e,t,n){n.d(t,{I:function(){return o}});n(44114);var r=n(52826);class o{constructor(e){this._allocator=e,this._items=[],this._itemsPtr=0,this._grow()}get(){return 0===this._itemsPtr&&(0,r.d)((()=>this._reset())),this._itemsPtr===this._items.length&&this._grow(),this._items[this._itemsPtr++]}_reset(){const e=Math.min(3*Math.max(8,this._itemsPtr),this._itemsPtr+3*i);this._items.length=Math.min(e,this._items.length),this._itemsPtr=0}_grow(){for(let e=0;e<Math.max(8,Math.min(this._items.length,i));e++)this._items.push(this._allocator())}}const i=1024},22426:function(e,t,n){var r;n.d(t,{_:function(){return r}}),function(e){e[e.X=0]="X",e[e.Y=1]="Y",e[e.Z=2]="Z"}(r||(r={}))},35337:function(e,t,n){n.d(t,{Ns:function(){return u},jh:function(){return o},l5:function(){return c},s:function(){return s},xm:function(){return i}});n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);var r=n(48119);function o(e,t=!1){return e<=r.tt?t?new Array(e).fill(0):new Array(e):new Float64Array(e)}function i(e){return((0,r.cy)(e)?e.length:e.byteLength/8)<=r.tt?Array.from(e):new Float64Array(e)}function c(e,t,n){return Array.isArray(e)?e.slice(t,t+n):e.subarray(t,t+n)}function s(e,t){for(let n=0;n<t.length;++n)e[n]=t[n];return e}function u(e){return Array.isArray(e)?new Float64Array(e):e}},24580:function(e,t,n){n.d(t,{A:function(){return d}});var r=n(71457),o=n(67872),i=n(28920),c=n(76543),s=(n(37679),n(69292),n(51020),n(42267)),u=n(29916),f=n(456),a=n(74036);let l=class extends((0,o.O)(i.oY)){constructor(e){super(e),this.type="georeferenced-relative",this.isRelative=!0,this.isGeoreferenced=!0,this.origin=(0,f.c)()}getOriginPoint(e){const[t,n,r]=this.origin;return new a.A({x:t,y:n,z:r,spatialReference:e})}setOriginFormPoint({x:e,y:t,z:n}){this.origin=(0,f.f)(e,t,n??0)}};(0,r._)([(0,s.e)({georeferencedRelative:"georeferenced-relative"},{readOnly:!0})],l.prototype,"type",void 0),(0,r._)([(0,c.MZ)({type:[Number],nonNullable:!0,json:{write:!0}})],l.prototype,"origin",void 0),l=(0,r._)([(0,u.$)("geoscene.geometry.support.MeshGeoreferencedRelativeVertexSpace")],l);const d=l},90700:function(e,t,n){n.d(t,{A:function(){return f}});var r=n(71457),o=n(67872),i=n(28920),c=(n(15114),n(37679),n(69292),n(51020),n(47966),n(42267)),s=n(29916);let u=class extends((0,o.O)(i.oY)){constructor(){super({}),this.type="georeferenced",this.isRelative=!1,this.isGeoreferenced=!0}};(0,r._)([(0,c.e)({georeferenced:"georeferenced"},{readOnly:!0})],u.prototype,"type",void 0),u=(0,r._)([(0,s.$)("geoscene.geometry.support.MeshGeoreferencedVertexSpace")],u);const f=u},38943:function(e,t,n){n.d(t,{A:function(){return d}});var r=n(71457),o=n(67872),i=n(28920),c=n(76543),s=(n(37679),n(69292),n(51020),n(42267)),u=n(29916),f=n(456),a=n(74036);let l=class extends((0,o.O)(i.oY)){constructor(e){super(e),this.type="local",this.isRelative=!0,this.isGeoreferenced=!1,this.origin=(0,f.c)()}getOriginPoint(e){const[t,n,r]=this.origin;return new a.A({x:t,y:n,z:r,spatialReference:e})}setOriginFormPoint({x:e,y:t,z:n}){this.origin=(0,f.f)(e,t,n??0)}};(0,r._)([(0,s.e)({local:"local"},{readOnly:!0})],l.prototype,"type",void 0),(0,r._)([(0,c.MZ)({type:[Number],nonNullable:!0,json:{write:!0}})],l.prototype,"origin",void 0),l=(0,r._)([(0,u.$)("geoscene.geometry.support.MeshLocalVertexSpace")],l);const d=l},28672:function(e,t,n){n.d(t,{J:function(){return o}});var r=n(15114);const o=r.A.getLogger("geoscene.views.3d.support.buffer.math")},96883:function(e,t,n){n.d(t,{LV:function(){return u},oC:function(){return f},vt:function(){return c}});n(69292);var r=n(51521),o=n(67886),i=n(456);n(56749);function c(e){return e?s((0,i.a)(e.origin),(0,i.a)(e.direction)):s((0,i.c)(),(0,i.c)())}function s(e,t){return{origin:e,direction:t}}function u(e,t){const n=a.get();return n.origin=e,n.direction=t,n}function f(e,t,n){const r=(0,o.e)(e.direction,(0,o.b)(n,t,e.origin));return(0,o.a)(n,e.origin,(0,o.g)(n,e.direction,r)),n}const a=new r.I((()=>c()))},47148:function(e,t,n){n.d(t,{g7:function(){return s},gr:function(){return c}});var r=n(26011),o=n(67886),i=n(456);function c(e,t){return(0,o.e)(e,t)/(0,o.l)(e)}function s(e,t){const n=(0,o.e)(e,t)/((0,o.l)(e)*(0,o.l)(t));return-(0,r.XM)(n)}(0,i.c)(),(0,i.c)()},56749:function(e,t,n){n.d(t,{Rc:function(){return g},rq:function(){return h}});n(44114),n(16573),n(78100),n(77936);var r=n(92403),o=n(52826),i=n(37072),c=n(26671),s=n(71784),u=n(15329),f=n(456),a=n(18439);class l{constructor(e,t,n){this._itemByteSize=e,this._itemCreate=t,this._buffers=new Array,this._items=new Array,this._itemsPtr=0,this._itemsPerBuffer=Math.ceil(n/this._itemByteSize)}get(){0===this._itemsPtr&&(0,o.d)((()=>this._reset()));const e=Math.floor(this._itemsPtr/this._itemsPerBuffer);for(;this._buffers.length<=e;){const e=new ArrayBuffer(this._itemsPerBuffer*this._itemByteSize);for(let t=0;t<this._itemsPerBuffer;++t)this._items.push(this._itemCreate(e,t*this._itemByteSize));this._buffers.push(e)}return this._items[this._itemsPtr++]}_reset(){const e=2*(Math.floor(this._itemsPtr/this._itemsPerBuffer)+1);for(;this._buffers.length>e;)this._buffers.pop(),this._items.length=this._buffers.length*this._itemsPerBuffer;this._itemsPtr=0}static createVec2f64(e=d){return new l(16,u.c,e)}static createVec3f64(e=d){return new l(24,f.b,e)}static createVec4f64(e=d){return new l(32,a.a,e)}static createMat3f64(e=d){return new l(72,i.a,e)}static createMat4f64(e=d){return new l(128,c.a,e)}static createQuatf64(e=d){return new l(32,s.c,e)}get test(){return{size:this._buffers.length*this._itemsPerBuffer*this._itemByteSize}}}const d=4*r.u.KILOBYTES,h=(l.createVec2f64(),l.createVec3f64()),g=(l.createVec4f64(),l.createMat3f64(),l.createMat4f64());l.createQuatf64()},90423:function(e,t,n){n.r(t),n.d(t,{destroyContext:function(){return B},dracoDecompressPointCloudData:function(){return M},filterObbsForModifications:function(){return S},filterObbsForModificationsSync:function(){return x},initialize:function(){return C},interpretObbModificationResults:function(){return L},process:function(){return w},project:function(){return P},setLegacySchema:function(){return v},setModifications:function(){return A},setModificationsSync:function(){return I},test:function(){return j},transformNormals:function(){return E}});n(44114),n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);var r,o,i=n(12790),c=n(35337),s=n(24580),u=n(90700),f=n(38943),a=n(9030);!function(e){e[e.None=0]="None",e[e.Int16=1]="Int16",e[e.Int32=2]="Int32"}(r||(r={})),function(e){e[e.Replace=0]="Replace",e[e.Outside=1]="Outside",e[e.Inside=2]="Inside",e[e.Finished=3]="Finished"}(o||(o={}));var l=n(8281);function d(){return g||(g=new Promise((e=>n.e(8528).then(n.bind(n,98528)).then((e=>e.i)).then((({default:t})=>{const n=t({locateFile:h,onRuntimeInitialized:()=>e(n)});delete n.then})))).catch((e=>{throw e}))),g}function h(e){return(0,l.s)(`geoscene/libs/i3s/${e}`)}let g;var y,m,p,_,b;n(57488);!function(e){e[e.Unmodified=0]="Unmodified",e[e.Culled=1]="Culled",e[e.NotChecked=2]="NotChecked"}(y||(y={})),function(e){e[e.Unmodified=0]="Unmodified",e[e.PotentiallyModified=1]="PotentiallyModified",e[e.Culled=2]="Culled",e[e.Unknown=3]="Unknown",e[e.NotChecked=4]="NotChecked"}(m||(m={}));!function(e){e[e.Unknown=0]="Unknown",e[e.Uncached=1]="Uncached",e[e.Cached=2]="Cached"}(p||(p={})),function(e){e[e.None=0]="None",e[e.MaxScreenThreshold=1]="MaxScreenThreshold",e[e.ScreenSpaceRelative=2]="ScreenSpaceRelative",e[e.RemovedFeatureDiameter=3]="RemovedFeatureDiameter",e[e.DistanceRangeFromDefaultCamera=4]="DistanceRangeFromDefaultCamera"}(_||(_={})),function(e){e[e.Hole=0]="Hole",e[e.Leaf=1]="Leaf"}(b||(b={}));async function w(e){await C();const t=[e.geometryBuffer];return{result:T(e,t),transferList:t}}async function M(e){await C();const t=[e.geometryBuffer],{geometryBuffer:n}=e,r=n.byteLength,o=R._malloc(r),i=new Uint8Array(R.HEAPU8.buffer,o,r);i.set(new Uint8Array(n));const c=R.dracoDecompressPointCloudData(o,i.byteLength);if(R._free(o),c.error.length>0)throw new Error(`i3s.wasm: ${c.error}`);const s=c.featureIds?.length>0?c.featureIds.slice():null,u=c.positions.slice();return s&&t.push(s.buffer),t.push(u.buffer),{result:{positions:u,featureIds:s},transferList:t}}async function S(e){await C(),x(e);const t={buffer:e.buffer};return{result:t,transferList:[t.buffer]}}async function A(e){await C(),I(e)}async function v(e){await C(),R.setLegacySchema(e.context,e.jsonSchema)}async function P(e){const{localMatrix:t,origin:r,positions:o,vertexSpace:a,local:l}=e,d=i.A.fromJSON(e.inSpatialReference),h=i.A.fromJSON(e.outSpatialReference),g={georeferenced:u.A,georeferencedRelative:s.A,local:f.A}[a.type].fromJSON(a);let y;if("georeferenced"===g.type){const{projectBuffer:e,initializeProjection:t}=await Promise.resolve().then(n.bind(n,39582));await t(d,h),y=new Float64Array(o.length),e(o,d,0,y,h,0,y.length/3)}else{const{project:e}=await Promise.all([n.e(4050),n.e(5762)]).then(n.bind(n,55762));y=(0,c.Ns)(e({positions:o,transform:t?{localMatrix:t}:void 0,vertexSpace:g,inSpatialReference:d,outSpatialReference:h,local:l}))}const m=y.length,[p,_,b]=r;for(let n=0;n<m;n+=3)y[n]-=p,y[n+1]-=_,y[n+2]-=b;return{result:{projected:y,original:o},transferList:[y.buffer,o.buffer]}}async function E({normalMatrix:e,normals:t}){const n=new Float32Array(t.length);return(0,a.a)(n,t,e),(0,a.n)(n,n),{result:{transformed:n,original:t},transferList:[n.buffer,t.buffer]}}function B(e){F(e)}let O,R;function I(e){const t=e.modifications,n=R._malloc(8*t.length),r=new Float64Array(R.HEAPU8.buffer,n,t.length);for(let o=0;o<t.length;++o)r[o]=t[o];R.setModifications(e.context,n,t.length,e.isGeodetic),R._free(n)}function T(e,t){if(!R)return null;const{context:n,localOrigin:o,globalTrafo:i,mbs:c,obb:s,elevationOffset:u,geometryBuffer:f,geometryDescriptor:a,indexToVertexProjector:l,vertexToRenderProjector:d}=e,h=R._malloc(f.byteLength),g=33,y=R._malloc(g*Float64Array.BYTES_PER_ELEMENT),m=new Uint8Array(R.HEAPU8.buffer,h,f.byteLength);m.set(new Uint8Array(f));const p=new Float64Array(R.HEAPU8.buffer,y,g);N(p,o);let _=p.byteOffset+3*p.BYTES_PER_ELEMENT,b=new Float64Array(p.buffer,_);N(b,i),_+=16*p.BYTES_PER_ELEMENT,b=new Float64Array(p.buffer,_),N(b,c),_+=4*p.BYTES_PER_ELEMENT,null!=s&&(b=new Float64Array(p.buffer,_),N(b,s.center),_+=3*p.BYTES_PER_ELEMENT,b=new Float64Array(p.buffer,_),N(b,s.halfSize),_+=3*p.BYTES_PER_ELEMENT,b=new Float64Array(p.buffer,_),N(b,s.quaternion));const w=a,M={isDraco:!1,isLegacy:!1,color:e.layouts.some((e=>e.some((e=>"color"===e.name)))),normal:e.needNormals&&e.layouts.some((e=>e.some((e=>"normalCompressed"===e.name)))),uv0:e.layouts.some((e=>e.some((e=>"uv0"===e.name)))),uvRegion:e.layouts.some((e=>e.some((e=>"uvRegion"===e.name)))),featureIndex:w.featureIndex},S=R.process(n,!!e.obb,h,m.byteLength,w,M,y,u,l,d,e.normalReferenceFrame);if(R._free(y),R._free(h),S.error.length>0)throw new Error(`i3s.wasm: ${S.error}`);if(S.discarded)return null;const A=S.componentOffsets.length>0?S.componentOffsets.slice():null,v=S.featureIds.length>0?S.featureIds.slice():null,P=S.anchorIds.length>0?Array.from(S.anchorIds):null,E=S.anchors.length>0?Array.from(S.anchors):null,B=S.interleavedVertedData.slice().buffer,O=S.indicesType===r.Int16?new Uint16Array(S.indices.buffer,S.indices.byteOffset,S.indices.byteLength/2).slice():new Uint32Array(S.indices.buffer,S.indices.byteOffset,S.indices.byteLength/4).slice(),I=S.positions.slice(),T=S.positionIndicesType===r.Int16?new Uint16Array(S.positionIndices.buffer,S.positionIndices.byteOffset,S.positionIndices.byteLength/2).slice():new Uint32Array(S.positionIndices.buffer,S.positionIndices.byteOffset,S.positionIndices.byteLength/4).slice(),L={layout:e.layouts[0],interleavedVertexData:B,indices:O,hasColors:S.hasColors,hasModifications:S.hasModifications,positionData:{data:I,indices:T}};return v&&t.push(v.buffer),A&&t.push(A.buffer),t.push(B),t.push(O.buffer),t.push(I.buffer),t.push(T.buffer),{componentOffsets:A,featureIds:v,anchorIds:P,anchors:E,transformedGeometry:L,obb:S.obb}}function L(e){return 0===e?m.Unmodified:1===e?m.PotentiallyModified:2===e?m.Culled:m.Unknown}function x(e){const{context:t,buffer:n}=e,r=R._malloc(n.byteLength),o=n.byteLength/Float64Array.BYTES_PER_ELEMENT,i=new Float64Array(R.HEAPU8.buffer,r,o),c=new Float64Array(n);i.set(c),R.filterOBBs(t,r,o),c.set(i),R._free(r)}function F(e){R&&(R.destroy(e),R=null)}function N(e,t){for(let n=0;n<t.length;++n)e[n]=t[n]}function C(){return R?Promise.resolve():(O||(O=d().then((e=>{R=e,O=null}))),O)}const j={transform:T,destroy:F}}}]);
//# sourceMappingURL=423.26de003f.js.map