"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[1662],{37072:function(t,e,n){n.d(e,{a:function(){return s},c:function(){return r},f:function(){return o}});n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);function r(){return[1,0,0,0,1,0,0,0,1]}function i(t){return[t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8]]}function o(t,e,n,r,i,o,s,a,c){return[t,e,n,r,i,o,s,a,c]}function s(t,e){return new Float64Array(t,e,9)}Object.freeze(Object.defineProperty({__proto__:null,clone:i,create:r,createView:s,fromValues:o},Symbol.toStringTag,{value:"Module"}))},26671:function(t,e,n){n.d(e,{I:function(){return a},a:function(){return s},b:function(){return i},c:function(){return r}});n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);function r(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function i(t){return[t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10],t[11],t[12],t[13],t[14],t[15]]}function o(t,e,n,r,i,o,s,a,c,l,h,u,f,d,m,p){return[t,e,n,r,i,o,s,a,c,l,h,u,f,d,m,p]}function s(t,e){return new Float64Array(t,e,16)}const a=r();Object.freeze(Object.defineProperty({__proto__:null,IDENTITY:a,clone:i,create:r,createView:s,fromValues:o},Symbol.toStringTag,{value:"Module"}))},71784:function(t,e,n){n.d(e,{I:function(){return a},a:function(){return r},b:function(){return i},c:function(){return s}});n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);function r(){return[0,0,0,1]}function i(t){return[t[0],t[1],t[2],t[3]]}function o(t,e,n,r){return[t,e,n,r]}function s(t,e){return new Float64Array(t,e,4)}const a=r();Object.freeze(Object.defineProperty({__proto__:null,IDENTITY:a,clone:i,create:r,createView:s,fromValues:o},Symbol.toStringTag,{value:"Module"}))},9030:function(t,e,n){n.d(e,{a:function(){return a},b:function(){return s},c:function(){return i},d:function(){return h},e:function(){return c},n:function(){return u},s:function(){return l},t:function(){return o}});var r=n(28672);function i(t,e,n){o(t.typedBuffer,e.typedBuffer,n,t.typedBufferStride,e.typedBufferStride)}function o(t,e,n,i=3,o=i){if(t.length/i!==Math.ceil(e.length/o))return r.J.error("source and destination buffers need to have the same number of elements"),t;const s=t.length/i,a=n[0],c=n[1],l=n[2],h=n[4],u=n[5],f=n[6],d=n[8],m=n[9],p=n[10],_=n[12],x=n[13],g=n[14];let y=0,M=0;for(let r=0;r<s;r++){const n=e[y],r=e[y+1],s=e[y+2];t[M]=a*n+h*r+d*s+_,t[M+1]=c*n+u*r+m*s+x,t[M+2]=l*n+f*r+p*s+g,y+=o,M+=i}return t}function s(t,e,n){a(t.typedBuffer,e.typedBuffer,n,t.typedBufferStride,e.typedBufferStride)}function a(t,e,n,i=3,o=i){if(t.length/i!==Math.ceil(e.length/o))return void r.J.error("source and destination buffers need to have the same number of elements");const s=t.length/i,a=n[0],c=n[1],l=n[2],h=n[3],u=n[4],f=n[5],d=n[6],m=n[7],p=n[8];let _=0,x=0;for(let r=0;r<s;r++){const n=e[_],r=e[_+1],s=e[_+2];t[x]=a*n+h*r+d*s,t[x+1]=c*n+u*r+m*s,t[x+2]=l*n+f*r+p*s,_+=o,x+=i}}function c(t,e,n){l(t.typedBuffer,e,n,t.typedBufferStride)}function l(t,e,n,r=3){const i=Math.min(t.length/r,e.count),o=e.typedBuffer,s=e.typedBufferStride;let a=0,c=0;for(let l=0;l<i;l++)t[c]=n*o[a],t[c+1]=n*o[a+1],t[c+2]=n*o[a+2],a+=s,c+=r}function h(t,e){u(t.typedBuffer,e.typedBuffer,t.typedBufferStride,e.typedBufferStride)}function u(t,e,n=3,r=n){const i=Math.min(t.length/n,e.length/r);let o=0,s=0;for(let a=0;a<i;a++){const i=e[o],a=e[o+1],c=e[o+2],l=i*i+a*a+c*c;if(l>0){const e=1/Math.sqrt(l);t[s]=e*i,t[s+1]=e*a,t[s+2]=e*c}o+=r,s+=n}}function f(t,e,n){const r=Math.min(t.count,e.count),i=t.typedBuffer,o=t.typedBufferStride,s=e.typedBuffer,a=e.typedBufferStride;let c=0,l=0;for(let h=0;h<r;h++)i[l]=s[c]>>n,i[l+1]=s[c+1]>>n,i[l+2]=s[c+2]>>n,c+=a,l+=o}Object.freeze(Object.defineProperty({__proto__:null,normalize:u,normalizeView:h,scale:l,scaleView:c,shiftRight:f,transformMat3:a,transformMat3View:s,transformMat4:o,transformMat4View:i},Symbol.toStringTag,{value:"Module"}))},69843:function(t,e,n){n.d(e,{w:function(){return a}});n(44114);var r=n(69292),i=n(79908),o=n(42079),s=n(10434);class a{constructor(t=9,e){this._compareMinX=u,this._compareMinY=f,this._toBBox=t=>t,this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),e&&("function"==typeof e?this._toBBox=e:this._initFormat(e)),this.clear()}destroy(){this.clear(),M.prune(),B.prune(),w.prune(),Y.prune()}all(t){this._all(this._data,t)}search(t,e){let n=this._data;const r=this._toBBox;if(g(t,n))for(M.clear();n;){for(let i=0,o=n.children.length;i<o;i++){const o=n.children[i],s=n.leaf?r(o):o;g(t,s)&&(n.leaf?e(o):x(t,s)?this._all(o,e):M.push(o))}n=M.pop()}}collides(t){let e=this._data;const n=this._toBBox;if(!g(t,e))return!1;for(M.clear();e;){for(let r=0,i=e.children.length;r<i;r++){const i=e.children[r],o=e.leaf?n(i):i;if(g(t,o)){if(e.leaf||x(t,o))return!0;M.push(i)}}e=M.pop()}return!1}load(t){if(!t.length)return this;if(t.length<this._minEntries){for(let e=0,n=t.length;e<n;e++)this.insert(t[e]);return this}let e=this._build(t.slice(0,t.length),0,t.length-1,0);if(this._data.children.length)if(this._data.height===e.height)this._splitRoot(this._data,e);else{if(this._data.height<e.height){const t=this._data;this._data=e,e=t}this._insert(e,this._data.height-e.height-1,!0)}else this._data=e;return this}insert(t){return t&&this._insert(t,this._data.height-1),this}clear(){return this._data=new v([]),this}remove(t){if(!t)return this;let e,n=this._data,o=null,s=0,a=!1;const c=this._toBBox(t);for(w.clear(),Y.clear();n||w.length>0;){if(n||(n=(0,i.jg)(w.pop()),o=w.data[w.length-1],s=Y.pop()??0,a=!0),n.leaf&&(e=(0,r.qh)(n.children,t,n.children.length,n.indexHint),-1!==e))return n.children.splice(e,1),w.push(n),this._condense(w),this;a||n.leaf||!x(n,c)?o?(s++,n=o.children[s],a=!1):n=null:(w.push(n),Y.push(s),s=0,o=n,n=n.children[0])}return this}toJSON(){return this._data}fromJSON(t){return this._data=t,this}_all(t,e){let n=t;for(B.clear();n;){if(!0===n.leaf)for(const t of n.children)e(t);else B.pushArray(n.children);n=B.pop()??null}}_build(t,e,n,r){const i=n-e+1;let o=this._maxEntries;if(i<=o){const r=new v(t.slice(e,n+1));return c(r,this._toBBox),r}r||(r=Math.ceil(Math.log(i)/Math.log(o)),o=Math.ceil(i/o**(r-1)));const s=new A([]);s.height=r;const a=Math.ceil(i/o),l=a*Math.ceil(Math.sqrt(o));y(t,e,n,l,this._compareMinX);for(let c=e;c<=n;c+=l){const e=Math.min(c+l-1,n);y(t,c,e,a,this._compareMinY);for(let n=c;n<=e;n+=a){const i=Math.min(n+a-1,e);s.children.push(this._build(t,n,i,r-1))}}return c(s,this._toBBox),s}_chooseSubtree(t,e,n,r){for(;r.push(e),!0!==e.leaf&&r.length-1!==n;){let n,r=1/0,i=1/0;for(let o=0,s=e.children.length;o<s;o++){const s=e.children[o],a=d(s),c=p(t,s)-a;c<i?(i=c,r=a<r?a:r,n=s):c===i&&a<r&&(r=a,n=s)}e=n||e.children[0]}return e}_insert(t,e,n){const r=this._toBBox,i=n?t:r(t);w.clear();const o=this._chooseSubtree(i,this._data,e,w);for(o.children.push(t),h(o,i);e>=0&&w.data[e].children.length>this._maxEntries;)this._split(w,e),e--;this._adjustParentBBoxes(i,w,e)}_split(t,e){const n=t.data[e],r=n.children.length,i=this._minEntries;this._chooseSplitAxis(n,i,r);const o=this._chooseSplitIndex(n,i,r);if(!o)return void console.log("  Error: assertion failed at PooledRBush._split: no valid split index");const s=n.children.splice(o,n.children.length-o),a=n.leaf?new v(s):new A(s);a.height=n.height,c(n,this._toBBox),c(a,this._toBBox),e?t.data[e-1].children.push(a):this._splitRoot(n,a)}_splitRoot(t,e){this._data=new A([t,e]),this._data.height=t.height+1,c(this._data,this._toBBox)}_chooseSplitIndex(t,e,n){let r,i,o;r=i=1/0;for(let s=e;s<=n-e;s++){const e=l(t,0,s,this._toBBox),a=l(t,s,n,this._toBBox),c=_(e,a),h=d(e)+d(a);c<r?(r=c,o=s,i=h<i?h:i):c===r&&h<i&&(i=h,o=s)}return o}_chooseSplitAxis(t,e,n){const r=t.leaf?this._compareMinX:u,i=t.leaf?this._compareMinY:f;this._allDistMargin(t,e,n,r)<this._allDistMargin(t,e,n,i)&&t.children.sort(r)}_allDistMargin(t,e,n,r){t.children.sort(r);const i=this._toBBox,o=l(t,0,e,i),s=l(t,n-e,n,i);let a=m(o)+m(s);for(let c=e;c<n-e;c++){const e=t.children[c];h(o,t.leaf?i(e):e),a+=m(o)}for(let c=n-e-1;c>=e;c--){const e=t.children[c];h(s,t.leaf?i(e):e),a+=m(s)}return a}_adjustParentBBoxes(t,e,n){for(let r=n;r>=0;r--)h(e.data[r],t)}_condense(t){for(let e=t.length-1;e>=0;e--){const n=t.data[e];if(0===n.children.length)if(e>0){const i=t.data[e-1],o=i.children;o.splice((0,r.qh)(o,n,o.length,i.indexHint),1)}else this.clear();else c(n,this._toBBox)}}_initFormat(t){const e=["return a"," - b",";"];this._compareMinX=new Function("a","b",e.join(t[0])),this._compareMinY=new Function("a","b",e.join(t[1])),this._toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")}}function c(t,e){l(t,0,t.children.length,e,t)}function l(t,e,n,r,i){i||(i=new v([])),i.minX=1/0,i.minY=1/0,i.maxX=-1/0,i.maxY=-1/0;for(let o,s=e;s<n;s++)o=t.children[s],h(i,t.leaf?r(o):o);return i}function h(t,e){t.minX=Math.min(t.minX,e.minX),t.minY=Math.min(t.minY,e.minY),t.maxX=Math.max(t.maxX,e.maxX),t.maxY=Math.max(t.maxY,e.maxY)}function u(t,e){return t.minX-e.minX}function f(t,e){return t.minY-e.minY}function d(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function m(t){return t.maxX-t.minX+(t.maxY-t.minY)}function p(t,e){return(Math.max(e.maxX,t.maxX)-Math.min(e.minX,t.minX))*(Math.max(e.maxY,t.maxY)-Math.min(e.minY,t.minY))}function _(t,e){const n=Math.max(t.minX,e.minX),r=Math.max(t.minY,e.minY),i=Math.min(t.maxX,e.maxX),o=Math.min(t.maxY,e.maxY);return Math.max(0,i-n)*Math.max(0,o-r)}function x(t,e){return t.minX<=e.minX&&t.minY<=e.minY&&e.maxX<=t.maxX&&e.maxY<=t.maxY}function g(t,e){return e.minX<=t.maxX&&e.minY<=t.maxY&&e.maxX>=t.minX&&e.maxY>=t.minY}function y(t,e,n,r,o){const a=[e,n];for(;a.length;){const e=(0,i.jg)(a.pop()),n=(0,i.jg)(a.pop());if(e-n<=r)continue;const c=n+Math.ceil((e-n)/r/2)*r;(0,s.q)(t,c,n,e,o),a.push(n,c,c,e)}}const M=new o.A,B=new o.A,w=new o.A,Y=new o.A({deallocator:void 0});class b{constructor(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0}}class X extends b{constructor(){super(...arguments),this.height=1,this.indexHint=new r.vW}}class v extends X{constructor(t){super(),this.children=t,this.leaf=!0}}class A extends X{constructor(t){super(),this.children=t,this.leaf=!1}}},35337:function(t,e,n){n.d(e,{Ns:function(){return c},jh:function(){return i},l5:function(){return s},s:function(){return a},xm:function(){return o}});n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);var r=n(48119);function i(t,e=!1){return t<=r.tt?e?new Array(t).fill(0):new Array(t):new Float64Array(t)}function o(t){return((0,r.cy)(t)?t.length:t.byteLength/8)<=r.tt?Array.from(t):new Float64Array(t)}function s(t,e,n){return Array.isArray(t)?t.slice(e,e+n):t.subarray(e,e+n)}function a(t,e){for(let n=0;n<e.length;++n)t[n]=e[n];return t}function c(t){return Array.isArray(t)?new Float64Array(t):t}},24580:function(t,e,n){n.d(e,{A:function(){return f}});var r=n(71457),i=n(67872),o=n(28920),s=n(76543),a=(n(37679),n(69292),n(51020),n(42267)),c=n(29916),l=n(456),h=n(74036);let u=class extends((0,i.O)(o.oY)){constructor(t){super(t),this.type="georeferenced-relative",this.isRelative=!0,this.isGeoreferenced=!0,this.origin=(0,l.c)()}getOriginPoint(t){const[e,n,r]=this.origin;return new h.A({x:e,y:n,z:r,spatialReference:t})}setOriginFormPoint({x:t,y:e,z:n}){this.origin=(0,l.f)(t,e,n??0)}};(0,r._)([(0,a.e)({georeferencedRelative:"georeferenced-relative"},{readOnly:!0})],u.prototype,"type",void 0),(0,r._)([(0,s.MZ)({type:[Number],nonNullable:!0,json:{write:!0}})],u.prototype,"origin",void 0),u=(0,r._)([(0,c.$)("geoscene.geometry.support.MeshGeoreferencedRelativeVertexSpace")],u);const f=u},90700:function(t,e,n){n.d(e,{A:function(){return l}});var r=n(71457),i=n(67872),o=n(28920),s=(n(15114),n(37679),n(69292),n(51020),n(47966),n(42267)),a=n(29916);let c=class extends((0,i.O)(o.oY)){constructor(){super({}),this.type="georeferenced",this.isRelative=!1,this.isGeoreferenced=!0}};(0,r._)([(0,s.e)({georeferenced:"georeferenced"},{readOnly:!0})],c.prototype,"type",void 0),c=(0,r._)([(0,a.$)("geoscene.geometry.support.MeshGeoreferencedVertexSpace")],c);const l=c},38943:function(t,e,n){n.d(e,{A:function(){return f}});var r=n(71457),i=n(67872),o=n(28920),s=n(76543),a=(n(37679),n(69292),n(51020),n(42267)),c=n(29916),l=n(456),h=n(74036);let u=class extends((0,i.O)(o.oY)){constructor(t){super(t),this.type="local",this.isRelative=!0,this.isGeoreferenced=!1,this.origin=(0,l.c)()}getOriginPoint(t){const[e,n,r]=this.origin;return new h.A({x:e,y:n,z:r,spatialReference:t})}setOriginFormPoint({x:t,y:e,z:n}){this.origin=(0,l.f)(t,e,n??0)}};(0,r._)([(0,a.e)({local:"local"},{readOnly:!0})],u.prototype,"type",void 0),(0,r._)([(0,s.MZ)({type:[Number],nonNullable:!0,json:{write:!0}})],u.prototype,"origin",void 0),u=(0,r._)([(0,c.$)("geoscene.geometry.support.MeshLocalVertexSpace")],u);const f=u},28672:function(t,e,n){n.d(e,{J:function(){return i}});var r=n(15114);const i=r.A.getLogger("geoscene.views.3d.support.buffer.math")},16351:function(t,e,n){n.r(e),n.d(e,{default:function(){return s}});n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);var r=n(51020),i=n(69843),o=n(55762);class s{async createIndex(t,e){const n=new Array;if(!t.vertexAttributes||!t.vertexAttributes.position)return new i.w;const r=this._createMeshData(t),o=null!=e?await e.invoke("createIndexThread",r,{transferList:n}):this.createIndexThread(r).result;return this._createPooledRBush().fromJSON(o)}createIndexThread(t){const e=new Float64Array(t.position),n=this._createPooledRBush();return t.components?this._createIndexComponentsThread(n,e,t.components.map((t=>new Uint32Array(t)))):this._createIndexAllThread(n,e)}_createIndexAllThread(t,e){const n=new Array(e.length/9);let r=0;for(let i=0;i<e.length;i+=9)n[r++]=a(e,i,i+3,i+6);return t.load(n),{result:t.toJSON()}}_createIndexComponentsThread(t,e,n){let r=0;for(const s of n)r+=s.length/3;const i=new Array(r);let o=0;for(const s of n)for(let t=0;t<s.length;t+=3)i[o++]=a(e,3*s[t],3*s[t+1],3*s[t+2]);return t.load(i),{result:t.toJSON()}}_createMeshData(t){const e=(t.vertexSpace.isRelative?(0,o.bA)({position:t.vertexAttributes.position,normal:null,tangent:null},t.vertexSpace,t.transform,t.spatialReference).position:t.vertexAttributes.position).buffer;return!t.components||t.components.some((t=>!t.faces))?{position:e}:{position:e,components:t.components.map((t=>t.faces))}}_createPooledRBush(){return new i.w(9,(0,r.A)("geoscene-csp-restrictions")?t=>t:[".minX",".minY",".maxX",".maxY"])}}function a(t,e,n,r){return{minX:Math.min(t[e],t[n],t[r]),maxX:Math.max(t[e],t[n],t[r]),minY:Math.min(t[e+1],t[n+1],t[r+1]),maxY:Math.max(t[e+1],t[n+1],t[r+1]),p0:[t[e],t[e+1],t[e+2]],p1:[t[n],t[n+1],t[n+2]],p2:[t[r],t[r+1],t[r+2]]}}}}]);
//# sourceMappingURL=1662.2df0706e.js.map