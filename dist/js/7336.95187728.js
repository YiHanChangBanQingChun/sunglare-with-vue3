"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[7336],{26671:function(t,e,n){n.d(e,{I:function(){return o},a:function(){return s},b:function(){return i},c:function(){return r}});n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);function r(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function i(t){return[t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10],t[11],t[12],t[13],t[14],t[15]]}function c(t,e,n,r,i,c,s,o,u,f,a,h,_,l,g,m){return[t,e,n,r,i,c,s,o,u,f,a,h,_,l,g,m]}function s(t,e){return new Float64Array(t,e,16)}const o=r();Object.freeze(Object.defineProperty({__proto__:null,IDENTITY:o,clone:i,create:r,createView:s,fromValues:c},Symbol.toStringTag,{value:"Module"}))},87637:function(t,e,n){n.d(e,{a:function(){return b},c:function(){return m},f:function(){return S},g:function(){return N},h:function(){return M},j:function(){return w},l:function(){return F}});n(51020);var r,i=n(15114),c=n(26011),s=n(90183),o=n(67886),u=n(456),f=n(22095),a=n(18439);!function(t){t[t.X=0]="X",t[t.Y=1]="Y",t[t.Z=2]="Z"}(r||(r={}));var h=n(96883),_=n(47148),l=n(56749);const g=m();function m(){return(0,a.c)()}function M(t,e=m()){return(0,f.c)(e,t)}function I(t,e){return(0,a.f)(t[0],t[1],t[2],e)}function d(t){return t}function P(t){t[0]=t[1]=t[2]=t[3]=0}function p(t,e){return t[0]=t[1]=t[2]=0,t[3]=e,t}function b(t){return t[3]}function N(t){return t}function S(t,e,n,r){return(0,a.f)(t,e,n,r)}function E(t,e,n){return t!==n&&(0,o.c)(n,t),n[3]=t[3]+e,n}function A(t,e,n){return i.A.getLogger("geoscene.geometry.support.sphere").error("sphere.setExtent is not yet supported"),t===n?n:M(t,n)}function B(t,e,n){if(null==e)return!1;const{origin:r,direction:i}=e,c=T;c[0]=r[0]-t[0],c[1]=r[1]-t[1],c[2]=r[2]-t[2];const s=i[0]*i[0]+i[1]*i[1]+i[2]*i[2];if(0===s)return!1;const o=2*(i[0]*c[0]+i[1]*c[1]+i[2]*c[2]),u=o*o-4*s*(c[0]*c[0]+c[1]*c[1]+c[2]*c[2]-t[3]*t[3]);if(u<0)return!1;const f=Math.sqrt(u);let a=(-o-f)/(2*s);const h=(-o+f)/(2*s);return(a<0||h<a&&h>0)&&(a=h),!(a<0)&&(n&&(n[0]=r[0]+i[0]*a,n[1]=r[1]+i[1]*a,n[2]=r[2]+i[2]*a),!0)}const T=(0,u.c)();function w(t,e){return B(t,e,null)}function y(t,e,n){if(B(t,e,n))return n;const r=v(t,e,l.rq.get());return(0,o.a)(n,e.origin,(0,o.g)(l.rq.get(),e.direction,(0,o.i)(e.origin,r)/(0,o.l)(e.direction))),n}function v(t,e,n){const r=l.rq.get(),i=l.Rc.get();(0,o.f)(r,e.origin,e.direction);const c=b(t);(0,o.f)(n,r,e.origin),(0,o.g)(n,n,1/(0,o.l)(n)*c);const u=q(t,e.origin),f=(0,_.g7)(e.origin,n);return(0,s.d)(i,f+u,r),(0,o.m)(n,n,i),n}function C(t,e,n){return B(t,e,n)?n:((0,h.oC)(e,N(t),n),Y(t,n,n))}function Y(t,e,n){const r=(0,o.b)(l.rq.get(),e,N(t)),i=(0,o.g)(l.rq.get(),r,t[3]/(0,o.l)(r));return(0,o.a)(n,i,N(t))}function j(t,e){const n=(0,o.b)(l.rq.get(),e,N(t)),r=(0,o.p)(n),i=t[3]*t[3];return Math.sqrt(Math.abs(r-i))}function q(t,e){const n=(0,o.b)(l.rq.get(),e,N(t)),r=(0,o.l)(n),i=b(t),s=i+Math.abs(i-r);return(0,c.XM)(i/s)}const O=(0,u.c)();function V(t,e,n,i){const s=(0,o.b)(O,e,N(t));switch(n){case r.X:{const t=(0,c.jU)(s,O)[2];return(0,o.s)(i,-Math.sin(t),Math.cos(t),0)}case r.Y:{const t=(0,c.jU)(s,O),e=t[1],n=t[2],r=Math.sin(e);return(0,o.s)(i,-r*Math.cos(n),-r*Math.sin(n),Math.cos(e))}case r.Z:return(0,o.n)(i,s);default:return}}function X(t,e){const n=(0,o.b)(L,e,N(t));return(0,o.l)(n)-t[3]}function z(t,e,n,i){const c=X(t,e),s=V(t,e,r.Z,L),u=(0,o.g)(L,s,n-c);return(0,o.a)(i,e,u)}function F(t,e){const n=(0,o.d)(N(t),e),r=b(t);return n<=r*r}function R(t,e,n=m()){const r=(0,o.i)(t,e),i=t[3],c=e[3];return r+c<i?((0,f.c)(n,t),n):r+i<c?((0,f.c)(n,e),n):((0,o.h)(n,t,e,(r+c-i)/(2*r)),n[3]=(r+i+c)/2,n)}const L=(0,u.c)(),G=m();Object.freeze(Object.defineProperty({__proto__:null,NullSphere:g,altitudeAt:X,angleToSilhouette:q,axisAt:V,clear:P,closestPoint:C,closestPointOnSilhouette:v,containsPoint:F,copy:M,create:m,distanceToSilhouette:j,elevate:E,fromCenterAndRadius:I,fromRadius:p,fromValues:S,getCenter:N,getRadius:b,intersectRay:B,intersectRayClosestSilhouette:y,intersectsRay:w,projectPoint:Y,setAltitudeAt:z,setExtent:A,tmpSphere:G,union:R,wrap:d},Symbol.toStringTag,{value:"Module"}))},92403:function(t,e,n){var r;n.d(e,{u:function(){return r}}),function(t){t[t.KILOBYTES=1024]="KILOBYTES",t[t.MEGABYTES=1048576]="MEGABYTES",t[t.GIGABYTES=1073741824]="GIGABYTES"}(r||(r={}))},51521:function(t,e,n){n.d(e,{I:function(){return i}});n(44114);var r=n(52826);class i{constructor(t){this._allocator=t,this._items=[],this._itemsPtr=0,this._grow()}get(){return 0===this._itemsPtr&&(0,r.d)((()=>this._reset())),this._itemsPtr===this._items.length&&this._grow(),this._items[this._itemsPtr++]}_reset(){const t=Math.min(3*Math.max(8,this._itemsPtr),this._itemsPtr+3*c);this._items.length=Math.min(t,this._items.length),this._itemsPtr=0}_grow(){for(let t=0;t<Math.max(8,Math.min(this._items.length,c));t++)this._items.push(this._allocator())}}const c=1024},67336:function(t,e,n){n(26011),n(67886);var r=n(456);n(87637),n(47148),n(56749);(0,r.c)(),(0,r.c)(),(0,r.c)(),(0,r.c)(),(0,r.c)();(0,r.c)(),(0,r.c)(),(0,r.c)(),(0,r.c)(),(0,r.c)();var i;!function(t){t[t.NONE=0]="NONE",t[t.CLAMP=1]="CLAMP",t[t.INFINITE_MIN=4]="INFINITE_MIN",t[t.INFINITE_MAX=8]="INFINITE_MAX"}(i||(i={}));i.INFINITE_MIN,i.INFINITE_MAX,i.INFINITE_MAX},96883:function(t,e,n){n.d(e,{LV:function(){return u},oC:function(){return f},vt:function(){return s}});n(69292);var r=n(51521),i=n(67886),c=n(456);n(56749);function s(t){return t?o((0,c.a)(t.origin),(0,c.a)(t.direction)):o((0,c.c)(),(0,c.c)())}function o(t,e){return{origin:t,direction:e}}function u(t,e){const n=a.get();return n.origin=t,n.direction=e,n}function f(t,e,n){const r=(0,i.e)(t.direction,(0,i.b)(n,e,t.origin));return(0,i.a)(n,t.origin,(0,i.g)(n,t.direction,r)),n}const a=new r.I((()=>s()))},47148:function(t,e,n){n.d(e,{g7:function(){return s}});var r=n(26011),i=n(67886),c=n(456);function s(t,e){const n=(0,i.e)(t,e)/((0,i.l)(t)*(0,i.l)(e));return-(0,r.XM)(n)}(0,c.c)(),(0,c.c)()},56749:function(t,e,n){n.d(e,{Rc:function(){return g},rq:function(){return l}});n(44114),n(16573),n(78100),n(77936);var r=n(92403),i=n(52826),c=n(37072),s=n(26671),o=n(71784),u=n(15329),f=n(456),a=n(18439);class h{constructor(t,e,n){this._itemByteSize=t,this._itemCreate=e,this._buffers=new Array,this._items=new Array,this._itemsPtr=0,this._itemsPerBuffer=Math.ceil(n/this._itemByteSize)}get(){0===this._itemsPtr&&(0,i.d)((()=>this._reset()));const t=Math.floor(this._itemsPtr/this._itemsPerBuffer);for(;this._buffers.length<=t;){const t=new ArrayBuffer(this._itemsPerBuffer*this._itemByteSize);for(let e=0;e<this._itemsPerBuffer;++e)this._items.push(this._itemCreate(t,e*this._itemByteSize));this._buffers.push(t)}return this._items[this._itemsPtr++]}_reset(){const t=2*(Math.floor(this._itemsPtr/this._itemsPerBuffer)+1);for(;this._buffers.length>t;)this._buffers.pop(),this._items.length=this._buffers.length*this._itemsPerBuffer;this._itemsPtr=0}static createVec2f64(t=_){return new h(16,u.c,t)}static createVec3f64(t=_){return new h(24,f.b,t)}static createVec4f64(t=_){return new h(32,a.a,t)}static createMat3f64(t=_){return new h(72,c.a,t)}static createMat4f64(t=_){return new h(128,s.a,t)}static createQuatf64(t=_){return new h(32,o.c,t)}get test(){return{size:this._buffers.length*this._itemsPerBuffer*this._itemByteSize}}}const _=4*r.u.KILOBYTES,l=(h.createVec2f64(),h.createVec3f64()),g=(h.createVec4f64(),h.createMat3f64(),h.createMat4f64());h.createQuatf64()}}]);
//# sourceMappingURL=7336.95187728.js.map