"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[123],{45573:function(n,t,e){e.d(t,{A:function(){return T},B:function(){return b},C:function(){return A},D:function(){return _},E:function(){return j},F:function(){return L},G:function(){return I},H:function(){return V},I:function(){return k},J:function(){return C},K:function(){return H},L:function(){return O},M:function(){return q},N:function(){return B},a:function(){return c},b:function(){return s},c:function(){return o},d:function(){return f},e:function(){return u},f:function(){return a},g:function(){return X},h:function(){return l},i:function(){return g},j:function(){return G},k:function(){return x},l:function(){return M},m:function(){return y},n:function(){return w},o:function(){return d},p:function(){return R},q:function(){return Z},r:function(){return m},s:function(){return v},t:function(){return h},u:function(){return P},v:function(){return z},w:function(){return p},x:function(){return E},y:function(){return S},z:function(){return D}});var r=e(88574),i=e(85508);function u(n){return r.G.extendedSpatialReferenceInfo(n)}function o(n,t,e){return r.G.clip(i.g,n,t,e)}function c(n,t,e){return r.G.cut(i.g,n,t,e)}function s(n,t,e){return r.G.contains(i.g,n,t,e)}function f(n,t,e){return r.G.crosses(i.g,n,t,e)}function a(n,t,e,u){return r.G.distance(i.g,n,t,e,u)}function l(n,t,e){return r.G.equals(i.g,n,t,e)}function g(n,t,e){return r.G.intersects(i.g,n,t,e)}function h(n,t,e){return r.G.touches(i.g,n,t,e)}function p(n,t,e){return r.G.within(i.g,n,t,e)}function G(n,t,e){return r.G.disjoint(i.g,n,t,e)}function d(n,t,e){return r.G.overlaps(i.g,n,t,e)}function m(n,t,e,u){return r.G.relate(i.g,n,t,e,u)}function x(n,t){return r.G.isSimple(i.g,n,t)}function v(n,t){return r.G.simplify(i.g,n,t)}function M(n,t,e=!1){return r.G.convexHull(i.g,n,t,e)}function y(n,t,e){return r.G.difference(i.g,n,t,e)}function w(n,t,e){return r.G.symmetricDifference(i.g,n,t,e)}function R(n,t,e){return r.G.intersect(i.g,n,t,e)}function P(n,t,e=null){return r.G.union(i.g,n,t,e)}function Z(n,t,e,u,o,c,s){return r.G.offset(i.g,n,t,e,u,o,c,s)}function z(n,t,e,u,o=!1){return r.G.buffer(i.g,n,t,e,u,o)}function E(n,t,e,u,o,c,s){return r.G.geodesicBuffer(i.g,n,t,e,u,o,c,s)}function S(n,t,e,u=!0){return r.G.nearestCoordinate(i.g,n,t,e,u)}function D(n,t,e){return r.G.nearestVertex(i.g,n,t,e)}function T(n,t,e,u,o){return r.G.nearestVertices(i.g,n,t,e,u,o)}function b(n,t,e,i){if(null==t||null==i)throw new Error("Illegal Argument Exception");const u=r.G.rotate(t,e,i);return u.spatialReference=n,u}function A(n,t,e){if(null==t||null==e)throw new Error("Illegal Argument Exception");const i=r.G.flipHorizontal(t,e);return i.spatialReference=n,i}function _(n,t,e){if(null==t||null==e)throw new Error("Illegal Argument Exception");const i=r.G.flipVertical(t,e);return i.spatialReference=n,i}function j(n,t,e,u,o){return r.G.generalize(i.g,n,t,e,u,o)}function L(n,t,e,u){return r.G.densify(i.g,n,t,e,u)}function I(n,t,e,u,o=0){return r.G.geodesicDensify(i.g,n,t,e,u,o)}function V(n,t,e){return r.G.planarArea(i.g,n,t,e)}function k(n,t,e){return r.G.planarLength(i.g,n,t,e)}function C(n,t,e,u){return r.G.geodesicArea(i.g,n,t,e,u)}function H(n,t,e,u){return r.G.geodesicLength(i.g,n,t,e,u)}function O(n,t,e){return null==t||null==e?[]:r.G.intersectLinesToPoints(i.g,n,t,e)}function q(n,t){r.G.changeDefaultSpatialReferenceTolerance(n,t)}function B(n){r.G.clearDefaultSpatialReferenceTolerance(n)}const X=Object.freeze(Object.defineProperty({__proto__:null,buffer:z,changeDefaultSpatialReferenceTolerance:q,clearDefaultSpatialReferenceTolerance:B,clip:o,contains:s,convexHull:M,crosses:f,cut:c,densify:L,difference:y,disjoint:G,distance:a,equals:l,extendedSpatialReferenceInfo:u,flipHorizontal:A,flipVertical:_,generalize:j,geodesicArea:C,geodesicBuffer:E,geodesicDensify:I,geodesicLength:H,intersect:R,intersectLinesToPoints:O,intersects:g,isSimple:x,nearestCoordinate:S,nearestVertex:D,nearestVertices:T,offset:Z,overlaps:d,planarArea:V,planarLength:k,relate:m,rotate:b,simplify:v,symmetricDifference:w,touches:h,union:P,within:p},Symbol.toStringTag,{value:"Module"}))},85508:function(n,t,e){e.d(t,{g:function(){return r}});const r={convertToGEGeometry:i,exportPoint:o,exportPolygon:s,exportPolyline:a,exportMultipoint:g,exportExtent:p};function i(n,t){return null==t?null:n.convertJSONToGeometry(t)}class u{constructor(n,t,e){this.x=n,this.y=t,this.spatialReference=e,this.z=void 0,this.m=void 0}}function o(n,t,e){const r=new u(n.getPointX(t),n.getPointY(t),e),i=n.hasZ(t),o=n.hasM(t);return i&&(r.z=n.getPointZ(t)),o&&(r.m=n.getPointM(t)),r}class c{constructor(n,t,e,r){this.rings=n,this.spatialReference=t,this.hasZ=void 0,this.hasM=void 0,e&&(this.hasZ=e),r&&(this.hasM=r)}}function s(n,t,e){return new c(n.exportPaths(t),e,n.hasZ(t),n.hasM(t))}class f{constructor(n,t,e,r){this.paths=n,this.spatialReference=t,this.hasZ=void 0,this.hasM=void 0,e&&(this.hasZ=e),r&&(this.hasM=r)}}function a(n,t,e){return new f(n.exportPaths(t),e,n.hasZ(t),n.hasM(t))}class l{constructor(n,t,e,r){this.points=n,this.spatialReference=t,this.hasZ=void 0,this.hasM=void 0,e&&(this.hasZ=e),r&&(this.hasM=r)}}function g(n,t,e){return new l(n.exportPoints(t),e,n.hasZ(t),n.hasM(t))}class h{constructor(n,t,e,r,i){this.xmin=n,this.ymin=t,this.xmax=e,this.ymax=r,this.spatialReference=i,this.zmin=void 0,this.zmax=void 0,this.mmin=void 0,this.mmax=void 0}}function p(n,t,e){const r=n.hasZ(t),i=n.hasM(t),u=new h(n.getXMin(t),n.getYMin(t),n.getXMax(t),n.getYMax(t),e);if(r){const e=n.getZExtent(t);u.zmin=e.vmin,u.zmax=e.vmax}if(i){const e=n.getMExtent(t);u.mmin=e.vmin,u.mmax=e.vmax}return u}},40123:function(n,t,e){e.r(t),e.d(t,{executeGEOperation:function(){return i}});var r=e(45573);function i(n){return(0,r.g[n.operation])(...n.parameters)}}}]);
//# sourceMappingURL=123.c0b35d3c.js.map