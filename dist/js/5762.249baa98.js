"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[5762],{44240:function(n,t,r){r.d(t,{lO:function(){return c}});var e=r(48585),o=r(12790),i=r(72465);const a=new o.A(e.fv),u=new o.A(e.FY),l=new o.A(e.LJ);new o.A(e.Ro);function c(n){return n&&((0,i.q8)(n)||(0,i.aI)(n,u))?u:n&&((0,i.KQ)(n)||(0,i.aI)(n,l))?l:a}},528:function(n,t,r){r.d(t,{A:function(){return m}});var e,o=r(71457),i=r(28920),a=r(76543),u=(r(37679),r(69292),r(51020),r(29916)),l=r(90183),c=r(26671),s=r(34350),f=r(71784),p=r(67886),g=r(456),y=r(12958);let h=e=class extends i.oY{constructor(n){super(n),this.translation=(0,g.c)(),this.rotationAxis=(0,g.g)(y.UP),this.rotationAngle=0,this.scale=(0,g.f)(1,1,1)}get rotation(){return(0,y.i4)(this.rotationAxis,this.rotationAngle)}set rotation(n){this.rotationAxis=(0,g.a)((0,y.yo)(n)),this.rotationAngle=(0,y.g7)(n)}get localMatrix(){const n=(0,c.c)();return(0,s.s)(A,(0,y.yo)(this.rotation),(0,y.$I)(this.rotation)),(0,l.g)(n,A,this.translation,this.scale),n}get localMatrixInverse(){return(0,l.a)((0,c.c)(),this.localMatrix)}applyLocal(n,t){return(0,p.m)(t,n,this.localMatrix)}applyLocalInverse(n,t){return(0,p.m)(t,n,this.localMatrixInverse)}equals(n){return this===n||null!=n&&(0,l.h)(this.localMatrix,n.localMatrix)}clone(){const n={translation:(0,g.a)(this.translation),rotationAxis:(0,g.a)(this.rotationAxis),rotationAngle:this.rotationAngle,scale:(0,g.a)(this.scale)};return new e(n)}};(0,o._)([(0,a.MZ)({type:[Number],nonNullable:!0,json:{write:!0}})],h.prototype,"translation",void 0),(0,o._)([(0,a.MZ)({type:[Number],nonNullable:!0,json:{write:!0}})],h.prototype,"rotationAxis",void 0),(0,o._)([(0,a.MZ)({type:Number,nonNullable:!0,json:{write:!0}})],h.prototype,"rotationAngle",void 0),(0,o._)([(0,a.MZ)({type:[Number],nonNullable:!0,json:{write:!0}})],h.prototype,"scale",void 0),(0,o._)([(0,a.MZ)()],h.prototype,"rotation",null),(0,o._)([(0,a.MZ)()],h.prototype,"localMatrix",null),(0,o._)([(0,a.MZ)()],h.prototype,"localMatrixInverse",null),h=e=(0,o._)([(0,u.$)("geoscene.geometry.support.MeshTransform")],h);const A=(0,f.a)(),m=h},12958:function(n,t,r){r.d(t,{$I:function(){return y},AU:function(){return f},UP:function(){return A},Zz:function(){return s},g7:function(){return g},i4:function(){return c},vt:function(){return l},yo:function(){return p}});var e=r(26011),o=r(34350),i=r(71784),a=r(67886),u=r(456);function l(n=A){return[n[0],n[1],n[2],n[3]]}function c(n,t,r=l()){return(0,a.c)(p(r),n),r[3]=t,r}function s(n,t,r=l()){return(0,o.s)(m,p(n),y(n)),(0,o.s)(x,p(t),y(t)),(0,o.m)(m,x,m),h(r,(0,e.KJ)((0,o.g)(p(r),m)))}function f(n,t,r,e=l()){return c(u.d,n,P),c(u.e,t,F),c(u.U,r,M),s(P,F,P),s(P,M,e),e}function p(n){return n}function g(n){return n[3]}function y(n){return(0,e.kU)(n[3])}function h(n,t){return n[3]=t,n}const A=[0,0,1,0],m=(0,i.a)(),x=(0,i.a)(),P=(l(),l()),F=l(),M=l()},29174:function(n,t,r){r.d(t,{D:function(){return o},O:function(){return i}});var e=r(15114);function o(n,t){return n.isGeographic||n.isWebMercator&&(t?.geographic??!0)}function i(n,t,r){const o=!n.isGeoreferenced;null!=r?.geographic&&r.geographic!==o&&e.A.getLogger(t).warnOnce(`Specifying the 'geographic' parameter (${r.geographic}) for a Mesh vertex space of type "${n.type}" is not supported. This parameter will be ignored.`)}},55762:function(n,t,r){r.d(t,{$y:function(){return F},YL:function(){return v},bA:function(){return M},h7:function(){return w},project:function(){return T},qD:function(){return d}});r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var e=r(79075),o=r(37072),i=r(90183),a=r(26671),u=r(67886),l=r(456),c=r(13030),s=r(39582),f=r(44240),p=r(35337),g=r(24580),y=r(90700),h=r(38943),A=r(528),m=r(9030),x=r(29174),P=r(25977);function F(n,t,r){return(0,x.D)(t.spatialReference,r)?R(n,t,r):_(n,t,r)}function M(n,t,r,e){const{position:o,normal:i,tangent:u}=n;if(!t.isRelative)return{position:o,normal:i,tangent:u};const l=r?.localMatrix??a.I;return F({position:(0,m.t)(new Float64Array(o.length),o,l),normal:null!=i?(0,P.qs)(i,new Float32Array(i.length),l):null,tangent:null!=u?(0,P.KM)(u,new Float32Array(u.length),l):null},t.getOriginPoint(e),{geographic:!t.isGeoreferenced})}function d(n,t,r){if(r?.useTransform){const{position:e,normal:o,tangent:i}=n,{x:a,y:u,z:c}=t,s=(0,l.f)(a,u,c??0);return{vertexAttributes:{position:e,normal:o,tangent:i},vertexSpace:r.geographic??1?new h.A({origin:s}):new g.A({origin:s}),transform:new A.A}}return{vertexAttributes:F(n,t,r),vertexSpace:new y.A,transform:null}}function v(n,t,r){return(0,x.D)(t.spatialReference,r)?I(n,t,r):j(n,t,r)}function w(n,t,r,e,o){if(!t.isRelative)return v(n,e,o);const{spatialReference:i}=e,a=M(n,t,r,i);return e.equals(t.getOriginPoint(i))?j(a,e,o):v(a,e,o)}function T({positions:n,transform:t,vertexSpace:r,inSpatialReference:e,outSpatialReference:o,outPositions:c,local:g}){const y=r.isRelative?r.origin:l.Z,h=r.isRelative?t?.localMatrix??a.I:a.I;if(r.isGeoreferenced){const t=c??(0,p.jh)(n.length);if((0,i.j)(h,a.I)?(0,p.s)(t,n):(0,m.t)(t,n,h),!(0,u.k)(y,l.Z)){const[n,r,e]=y;for(let o=0;o<t.length;o+=3)t[o]+=n,t[o+1]+=r,t[o+2]+=e}return(0,s.projectBuffer)(t,e,0,t,o,0,t.length/3),t}const A=(0,f.lO)(e),x=!g&&(0,s._q)(e,A)?A:e;(0,s.l)(e,y,q,x),(0,i.m)(q,q,h);const P=c??(0,p.jh)(n.length);return(0,m.t)(P,n,q),(0,s.projectBuffer)(P,x,0,P,o,0,P.length/3),P}function _(n,t,r){const e=new Float64Array(n.position.length),o=n.position,i=t.x,a=t.y,u=t.z??0,l=S(r?r.unit:null,t.spatialReference);for(let c=0;c<o.length;c+=3)e[c]=o[c]*l+i,e[c+1]=o[c+1]*l+a,e[c+2]=o[c+2]*l+u;return{position:e,normal:n.normal,tangent:n.tangent}}function R(n,t,r){const e=t.spatialReference,o=X(t,r,q),i=new Float64Array(n.position.length),a=C(n.position,o,e,i),u=(0,c.b)($,o);return{position:a,normal:O(a,i,n.normal,u,e),tangent:b(a,i,n.tangent,u,e)}}function C(n,t,r,e){(0,m.t)(e,n,t);const o=new Float64Array(n.length);return(0,P.$5)(e,o,r)}function O(n,t,r,e,o){if(null==r)return null;const i=new Float32Array(r.length);return(0,m.a)(i,r,e),(0,P.si)(i,n,t,o,i),i}function b(n,t,r,e,o){if(null==r)return null;const i=new Float32Array(r.length);(0,m.a)(i,r,e,4);for(let a=3;a<i.length;a+=4)i[a]=r[a];return(0,P.Mv)(i,n,t,o,i),i}function j(n,t,r){const e=new Float64Array(n.position.length),o=n.position,i=t.x,a=t.y,u=t.z??0,l=S(r?r.unit:null,t.spatialReference);for(let c=0;c<o.length;c+=3)e[c]=(o[c]-i)/l,e[c+1]=(o[c+1]-a)/l,e[c+2]=(o[c+2]-u)/l;return{position:e,normal:n.normal,tangent:n.tangent}}function I(n,t,r){const e=t.spatialReference;X(t,r,q);const o=(0,i.a)(L,q),a=new Float64Array(n.position.length),u=E(n.position,e,o,a),l=(0,c.b)($,o);return{position:u,normal:N(n.normal,n.position,a,e,l),tangent:Z(n.tangent,n.position,a,e,l)}}function X(n,t,r){(0,s.l)(n.spatialReference,[n.x,n.y,n.z??0],r,(0,f.lO)(n.spatialReference));const e=S(t?t.unit:null,n.spatialReference);return(0,i.k)(r,r,[e,e,e]),r}function E(n,t,r,e){const o=(0,P.gr)(n,t,e),i=new Float64Array(o.length);return(0,m.t)(i,o,r),i}function N(n,t,r,e,o){if(null==n)return null;const i=(0,P.X4)(n,t,r,e,new Float32Array(n.length));return(0,m.a)(i,i,o),i}function Z(n,t,r,e,o){if(null==n)return null;const i=(0,P.xA)(n,t,r,e,new Float32Array(n.length));return(0,m.a)(i,i,o,4),i}function S(n,t){if(null==n)return 1;const r=(0,e.KX)(t);return 1/(0,e.oU)(r,"meters",n)}const q=(0,a.c)(),L=(0,a.c)(),$=(0,o.c)()},25977:function(n,t,r){r.d(t,{$5:function(){return P},KM:function(){return M},Mv:function(){return v},X4:function(){return A},gr:function(){return x},qs:function(){return F},si:function(){return m},xA:function(){return d}});r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var e=r(15114),o=r(13030),i=r(37072),a=r(26671),u=r(67886),l=r(456),c=r(39582),s=r(44240),f=r(72465),p=r(30075),g=r(44050),y=r(9030);const h=e.A.getLogger("geoscene.geometry.support.meshUtils.normalProjection");function A(n,t,r,e,o){return T(e)?(w(C.TO_PCPF,g.xs.fromTypedArray(n),g.Xm.fromTypedArray(t),g.Xm.fromTypedArray(r),e,g.xs.fromTypedArray(o)),o):(h.error("Cannot convert spatial reference to PCPF"),o)}function m(n,t,r,e,o){return T(e)?(w(C.FROM_PCPF,g.xs.fromTypedArray(n),g.Xm.fromTypedArray(t),g.Xm.fromTypedArray(r),e,g.xs.fromTypedArray(o)),o):(h.error("Cannot convert to spatial reference from PCPF"),o)}function x(n,t,r){return(0,c.projectBuffer)(n,t,0,r,(0,s.lO)(t),0,n.length/3),r}function P(n,t,r){return(0,c.projectBuffer)(n,(0,s.lO)(r),0,t,r,0,n.length/3),t}function F(n,t,r){return(0,o.b)(I,r),(0,y.a)(t,n,I),(0,o.i)(I)||(0,y.n)(t,t),t}function M(n,t,r){if((0,o.b)(I,r),(0,y.a)(t,n,I,4),(0,o.i)(I)||(0,y.n)(t,t,4),n!==t)for(let e=3;e<n.length;e+=4)t[e]=n[e];return t}function d(n,t,r,e,o){if(!T(e))return h.error("Cannot convert spatial reference to PCPF"),o;w(C.TO_PCPF,g.xs.fromTypedArray(n,4*Float32Array.BYTES_PER_ELEMENT),g.Xm.fromTypedArray(t),g.Xm.fromTypedArray(r),e,g.xs.fromTypedArray(o,4*Float32Array.BYTES_PER_ELEMENT));for(let i=3;i<n.length;i+=4)o[i]=n[i];return o}function v(n,t,r,e,o){if(!T(e))return h.error("Cannot convert to spatial reference from PCPF"),o;w(C.FROM_PCPF,g.xs.fromTypedArray(n,16),g.Xm.fromTypedArray(t),g.Xm.fromTypedArray(r),e,g.xs.fromTypedArray(o,16));for(let i=3;i<n.length;i+=4)o[i]=n[i];return o}function w(n,t,r,e,i,a){if(!t)return;const l=r.count,f=(0,s.lO)(i);if(_(i))for(let s=0;s<l;s++)e.getVec(s,O),t.getVec(s,b),(0,c.l)(f,O,j,f),(0,o.f)(I,j),n===C.FROM_PCPF&&(0,o.t)(I,I),(0,u.t)(b,b,I),a.setVec(s,b);else for(let s=0;s<l;s++){e.getVec(s,O),t.getVec(s,b),(0,c.l)(f,O,j,f),(0,o.f)(I,j);const i=(0,p.jg)(r.get(s,1));let l=Math.cos(i);n===C.TO_PCPF&&(l=1/l),I[0]*=l,I[1]*=l,I[2]*=l,I[3]*=l,I[4]*=l,I[5]*=l,n===C.FROM_PCPF&&(0,o.t)(I,I),(0,u.t)(b,b,I),(0,u.n)(b,b),a.setVec(s,b)}return a}function T(n){return _(n)||R(n)}function _(n){return n.isWGS84||(0,f.x1)(n)||(0,f.q8)(n)||(0,f.KQ)(n)}function R(n){return n.isWebMercator}var C;!function(n){n[n.TO_PCPF=0]="TO_PCPF",n[n.FROM_PCPF=1]="FROM_PCPF"}(C||(C={}));const O=(0,l.c)(),b=(0,l.c)(),j=(0,a.c)(),I=(0,i.c)()}}]);
//# sourceMappingURL=5762.249baa98.js.map