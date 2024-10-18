"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[3571],{37072:function(e,t,n){n.d(t,{a:function(){return r},c:function(){return i},f:function(){return o}});n(16573),n(78100),n(77936),n(37467),n(44732),n(79577);function i(){return[1,0,0,0,1,0,0,0,1]}function s(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]]}function o(e,t,n,i,s,o,r,l,a){return[e,t,n,i,s,o,r,l,a]}function r(e,t){return new Float64Array(e,t,9)}Object.freeze(Object.defineProperty({__proto__:null,clone:s,create:i,createView:r,fromValues:o},Symbol.toStringTag,{value:"Module"}))},69843:function(e,t,n){n.d(t,{w:function(){return l}});n(44114);var i=n(69292),s=n(79908),o=n(42079),r=n(10434);class l{constructor(e=9,t){this._compareMinX=u,this._compareMinY=d,this._toBBox=e=>e,this._maxEntries=Math.max(4,e||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),t&&("function"==typeof t?this._toBBox=t:this._initFormat(t)),this.clear()}destroy(){this.clear(),v.prune(),P.prune(),w.prune(),M.prune()}all(e){this._all(this._data,e)}search(e,t){let n=this._data;const i=this._toBBox;if(g(e,n))for(v.clear();n;){for(let s=0,o=n.children.length;s<o;s++){const o=n.children[s],r=n.leaf?i(o):o;g(e,r)&&(n.leaf?t(o):x(e,r)?this._all(o,t):v.push(o))}n=v.pop()}}collides(e){let t=this._data;const n=this._toBBox;if(!g(e,t))return!1;for(v.clear();t;){for(let i=0,s=t.children.length;i<s;i++){const s=t.children[i],o=t.leaf?n(s):s;if(g(e,o)){if(t.leaf||x(e,o))return!0;v.push(s)}}t=v.pop()}return!1}load(e){if(!e.length)return this;if(e.length<this._minEntries){for(let t=0,n=e.length;t<n;t++)this.insert(e[t]);return this}let t=this._build(e.slice(0,e.length),0,e.length-1,0);if(this._data.children.length)if(this._data.height===t.height)this._splitRoot(this._data,t);else{if(this._data.height<t.height){const e=this._data;this._data=t,t=e}this._insert(t,this._data.height-t.height-1,!0)}else this._data=t;return this}insert(e){return e&&this._insert(e,this._data.height-1),this}clear(){return this._data=new B([]),this}remove(e){if(!e)return this;let t,n=this._data,o=null,r=0,l=!1;const a=this._toBBox(e);for(w.clear(),M.clear();n||w.length>0;){if(n||(n=(0,s.jg)(w.pop()),o=w.data[w.length-1],r=M.pop()??0,l=!0),n.leaf&&(t=(0,i.qh)(n.children,e,n.children.length,n.indexHint),-1!==t))return n.children.splice(t,1),w.push(n),this._condense(w),this;l||n.leaf||!x(n,a)?o?(r++,n=o.children[r],l=!1):n=null:(w.push(n),M.push(r),r=0,o=n,n=n.children[0])}return this}toJSON(){return this._data}fromJSON(e){return this._data=e,this}_all(e,t){let n=e;for(P.clear();n;){if(!0===n.leaf)for(const e of n.children)t(e);else P.pushArray(n.children);n=P.pop()??null}}_build(e,t,n,i){const s=n-t+1;let o=this._maxEntries;if(s<=o){const i=new B(e.slice(t,n+1));return a(i,this._toBBox),i}i||(i=Math.ceil(Math.log(s)/Math.log(o)),o=Math.ceil(s/o**(i-1)));const r=new A([]);r.height=i;const l=Math.ceil(s/o),c=l*Math.ceil(Math.sqrt(o));y(e,t,n,c,this._compareMinX);for(let a=t;a<=n;a+=c){const t=Math.min(a+c-1,n);y(e,a,t,l,this._compareMinY);for(let n=a;n<=t;n+=l){const s=Math.min(n+l-1,t);r.children.push(this._build(e,n,s,i-1))}}return a(r,this._toBBox),r}_chooseSubtree(e,t,n,i){for(;i.push(t),!0!==t.leaf&&i.length-1!==n;){let n,i=1/0,s=1/0;for(let o=0,r=t.children.length;o<r;o++){const r=t.children[o],l=p(r),a=f(e,r)-l;a<s?(s=a,i=l<i?l:i,n=r):a===s&&l<i&&(i=l,n=r)}t=n||t.children[0]}return t}_insert(e,t,n){const i=this._toBBox,s=n?e:i(e);w.clear();const o=this._chooseSubtree(s,this._data,t,w);for(o.children.push(e),h(o,s);t>=0&&w.data[t].children.length>this._maxEntries;)this._split(w,t),t--;this._adjustParentBBoxes(s,w,t)}_split(e,t){const n=e.data[t],i=n.children.length,s=this._minEntries;this._chooseSplitAxis(n,s,i);const o=this._chooseSplitIndex(n,s,i);if(!o)return void console.log("  Error: assertion failed at PooledRBush._split: no valid split index");const r=n.children.splice(o,n.children.length-o),l=n.leaf?new B(r):new A(r);l.height=n.height,a(n,this._toBBox),a(l,this._toBBox),t?e.data[t-1].children.push(l):this._splitRoot(n,l)}_splitRoot(e,t){this._data=new A([e,t]),this._data.height=e.height+1,a(this._data,this._toBBox)}_chooseSplitIndex(e,t,n){let i,s,o;i=s=1/0;for(let r=t;r<=n-t;r++){const t=c(e,0,r,this._toBBox),l=c(e,r,n,this._toBBox),a=_(t,l),h=p(t)+p(l);a<i?(i=a,o=r,s=h<s?h:s):a===i&&h<s&&(s=h,o=r)}return o}_chooseSplitAxis(e,t,n){const i=e.leaf?this._compareMinX:u,s=e.leaf?this._compareMinY:d;this._allDistMargin(e,t,n,i)<this._allDistMargin(e,t,n,s)&&e.children.sort(i)}_allDistMargin(e,t,n,i){e.children.sort(i);const s=this._toBBox,o=c(e,0,t,s),r=c(e,n-t,n,s);let l=m(o)+m(r);for(let a=t;a<n-t;a++){const t=e.children[a];h(o,e.leaf?s(t):t),l+=m(o)}for(let a=n-t-1;a>=t;a--){const t=e.children[a];h(r,e.leaf?s(t):t),l+=m(r)}return l}_adjustParentBBoxes(e,t,n){for(let i=n;i>=0;i--)h(t.data[i],e)}_condense(e){for(let t=e.length-1;t>=0;t--){const n=e.data[t];if(0===n.children.length)if(t>0){const s=e.data[t-1],o=s.children;o.splice((0,i.qh)(o,n,o.length,s.indexHint),1)}else this.clear();else a(n,this._toBBox)}}_initFormat(e){const t=["return a"," - b",";"];this._compareMinX=new Function("a","b",t.join(e[0])),this._compareMinY=new Function("a","b",t.join(e[1])),this._toBBox=new Function("a","return {minX: a"+e[0]+", minY: a"+e[1]+", maxX: a"+e[2]+", maxY: a"+e[3]+"};")}}function a(e,t){c(e,0,e.children.length,t,e)}function c(e,t,n,i,s){s||(s=new B([])),s.minX=1/0,s.minY=1/0,s.maxX=-1/0,s.maxY=-1/0;for(let o,r=t;r<n;r++)o=e.children[r],h(s,e.leaf?i(o):o);return s}function h(e,t){e.minX=Math.min(e.minX,t.minX),e.minY=Math.min(e.minY,t.minY),e.maxX=Math.max(e.maxX,t.maxX),e.maxY=Math.max(e.maxY,t.maxY)}function u(e,t){return e.minX-t.minX}function d(e,t){return e.minY-t.minY}function p(e){return(e.maxX-e.minX)*(e.maxY-e.minY)}function m(e){return e.maxX-e.minX+(e.maxY-e.minY)}function f(e,t){return(Math.max(t.maxX,e.maxX)-Math.min(t.minX,e.minX))*(Math.max(t.maxY,e.maxY)-Math.min(t.minY,e.minY))}function _(e,t){const n=Math.max(e.minX,t.minX),i=Math.max(e.minY,t.minY),s=Math.min(e.maxX,t.maxX),o=Math.min(e.maxY,t.maxY);return Math.max(0,s-n)*Math.max(0,o-i)}function x(e,t){return e.minX<=t.minX&&e.minY<=t.minY&&t.maxX<=e.maxX&&t.maxY<=e.maxY}function g(e,t){return t.minX<=e.maxX&&t.minY<=e.maxY&&t.maxX>=e.minX&&t.maxY>=e.minY}function y(e,t,n,i,o){const l=[t,n];for(;l.length;){const t=(0,s.jg)(l.pop()),n=(0,s.jg)(l.pop());if(t-n<=i)continue;const a=n+Math.ceil((t-n)/i/2)*i;(0,r.q)(e,a,n,t,o),l.push(n,a,a,t)}}const v=new o.A,P=new o.A,w=new o.A,M=new o.A({deallocator:void 0});class R{constructor(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0}}class I extends R{constructor(){super(...arguments),this.height=1,this.indexHint=new i.vW}}class B extends I{constructor(e){super(),this.children=e,this.leaf=!0}}class A extends I{constructor(e){super(),this.children=e,this.leaf=!1}}},41997:function(e,t,n){n.d(t,{O:function(){return p},W:function(){return d}});var i=n(13030),s=n(37072),o=n(28589),r=n(67886),l=n(456);const a=(0,l.c)(),c=(0,s.c)(),h=(0,s.c)(),u=(0,s.c)();function d(e,t,n){return(0,r.s)(a,t[0],t[1],1),(0,r.t)(a,a,(0,i.t)(c,n)),0===a[2]?(0,o.s)(e,a[0],a[1]):(0,o.s)(e,a[0]/a[2],a[1]/a[2])}function p(e,t,n){return m(h,t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7]),m(u,n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7]),(0,i.m)(e,(0,i.a)(h,h),u),0!==e[8]&&(e[0]/=e[8],e[1]/=e[8],e[2]/=e[8],e[3]/=e[8],e[4]/=e[8],e[5]/=e[8],e[6]/=e[8],e[7]/=e[8],e[8]/=e[8]),e}function m(e,t,n,s,o,l,h,u,d){(0,i.s)(e,t,s,l,n,o,h,1,1,1),(0,r.s)(a,u,d,1),(0,i.a)(c,e);const[p,m,f]=(0,r.t)(a,a,(0,i.t)(c,c));return(0,i.s)(c,p,0,0,0,m,0,0,0,f),(0,i.m)(e,c,e)}},43166:function(e,t,n){n.d(t,{j7:function(){return r},kS:function(){return a},kd:function(){return l},r8:function(){return c}});var i=n(68491),s=n(12790),o=n(55772);const r={102100:{maxX:20037508.342788905,minX:-20037508.342788905,plus180Line:new i.A({paths:[[[20037508.342788905,-20037508.342788905],[20037508.342788905,20037508.342788905]]],spatialReference:s.A.WebMercator}),minus180Line:new i.A({paths:[[[-20037508.342788905,-20037508.342788905],[-20037508.342788905,20037508.342788905]]],spatialReference:s.A.WebMercator})},4326:{maxX:180,minX:-180,plus180Line:new i.A({paths:[[[180,-180],[180,180]]],spatialReference:s.A.WGS84}),minus180Line:new i.A({paths:[[[-180,-180],[-180,180]]],spatialReference:s.A.WGS84})}};function l(e,t){return Math.ceil((e-t)/(2*t))}function a(e,t){const n=c(e);for(const i of n)for(const e of i)e[0]+=t;return e}function c(e){return(0,o.Bi)(e)?e.rings:e.paths}},70620:function(e,t,n){n.d(t,{b3:function(){return h},jZ:function(){return c}});n(44114);var i=n(99359),s=n(84509),o=n(55040),r=n(55772),l=n(43166),a=n(72465);function c(e){return u(e,!0)}function h(e){return u(e,!1)}function u(e,t){if(null==e)return null;const n=e.spatialReference,i=(0,a.Vp)(n),o="toJSON"in e?e.toJSON():e;if(!i)return o;const c=(0,a.K8)(n)?102100:4326,h=l.j7[c].maxX,u=l.j7[c].minX;if((0,r.fT)(o))return p(o,h,u);if((0,r.U9)(o))return o.points=o.points.map((e=>p(e,h,u))),o;if((0,r.ZC)(o))return d(o,i);if((0,r.Bi)(o)||(0,r.Rg)(o)){const e=(0,s.Rg)(v,o),n={xmin:e[0],ymin:e[1],xmax:e[2],ymax:e[3]},i=(0,l.kd)(n.xmin,u)*(2*h),r=0===i?o:(0,l.kS)(o,i);return n.xmin+=i,n.xmax+=i,n.xmax>h?g(r,h,t):n.xmin<u?g(r,u,t):r}return o}function d(e,t){if(!t)return e;const n=m(e,t).map((e=>e.extent));return n.length<2?n[0]||e:n.length>2?(e.xmin=t.valid[0],e.xmax=t.valid[1],e):{rings:n.map((e=>[[e.xmin,e.ymin],[e.xmin,e.ymax],[e.xmax,e.ymax],[e.xmax,e.ymin],[e.xmin,e.ymin]]))}}function p(e,t,n){if(Array.isArray(e)){const i=e[0];if(i>t){const n=(0,l.kd)(i,t);e[0]=i+n*(-2*t)}else if(i<n){const t=(0,l.kd)(i,n);e[0]=i+t*(-2*n)}}else{const i=e.x;if(i>t){const n=(0,l.kd)(i,t);e.x+=n*(-2*t)}else if(i<n){const t=(0,l.kd)(i,n);e.x+=t*(-2*n)}}return e}function m(e,t){const n=[],{ymin:i,ymax:s,xmin:o,xmax:r}=e,l=e.xmax-e.xmin,[a,c]=t.valid,{x:h,frameId:u}=f(e.xmin,t),{x:d,frameId:p}=f(e.xmax,t),m=h===d&&l>0;if(l>2*c){const e={xmin:o<r?h:d,ymin:i,xmax:c,ymax:s},t={xmin:a,ymin:i,xmax:o<r?d:h,ymax:s},l={xmin:0,ymin:i,xmax:c,ymax:s},m={xmin:a,ymin:i,xmax:0,ymax:s},f=[],x=[];_(e,l)&&f.push(u),_(e,m)&&x.push(u),_(t,l)&&f.push(p),_(t,m)&&x.push(p);for(let n=u+1;n<p;n++)f.push(n),x.push(n);n.push(new y(e,[u]),new y(t,[p]),new y(l,f),new y(m,x))}else h>d||m?n.push(new y({xmin:h,ymin:i,xmax:c,ymax:s},[u]),new y({xmin:a,ymin:i,xmax:d,ymax:s},[p])):n.push(new y({xmin:h,ymin:i,xmax:d,ymax:s},[u]));return n}function f(e,t){const[n,i]=t.valid,s=2*i;let o,r=0;return e>i?(o=Math.ceil(Math.abs(e-i)/s),e-=o*s,r=o):e<n&&(o=Math.ceil(Math.abs(e-n)/s),e+=o*s,r=-o),{x:e,frameId:r}}function _(e,t){const{xmin:n,ymin:i,xmax:s,ymax:o}=t;return x(e,n,i)&&x(e,n,o)&&x(e,s,o)&&x(e,s,i)}function x(e,t,n){return t>=e.xmin&&t<=e.xmax&&n>=e.ymin&&n<=e.ymax}function g(e,t,n=!0){const i=!(0,r.Rg)(e);if(i&&(0,o.m3)(e),n)return(new P).cut(e,t);const s=i?e.rings:e.paths,l=i?4:2,a=s.length,c=-2*t;for(let o=0;o<a;o++){const e=s[o];if(e&&e.length>=l){const t=[];for(const n of e)t.push([n[0]+c,n[1]]);s.push(t)}}return i?e.rings=s:e.paths=s,e}class y{constructor(e,t){this.extent=e,this.frameIds=t}}const v=(0,i.vt)();class P{constructor(){this._linesIn=[],this._linesOut=[]}cut(e,t){let n;if(this._xCut=t,e.rings)this._closed=!0,n=e.rings,this._minPts=4;else{if(!e.paths)return null;this._closed=!1,n=e.paths,this._minPts=2}for(const s of n){if(!s||s.length<this._minPts)continue;let e=!0;for(const t of s)e?(this.moveTo(t),e=!1):this.lineTo(t);this._closed&&this.close()}this._pushLineIn(),this._pushLineOut(),n=[];for(const s of this._linesIn)s&&s.length>=this._minPts&&n.push(s);const i=-2*this._xCut;for(const s of this._linesOut)if(s&&s.length>=this._minPts){for(const e of s)e[0]+=i;n.push(s)}return this._closed?e.rings=n:e.paths=n,e}moveTo(e){this._pushLineIn(),this._pushLineOut(),this._prevSide=this._side(e[0]),this._moveTo(e[0],e[1],this._prevSide),this._prevPt=e,this._firstPt=e}lineTo(e){const t=this._side(e[0]);if(t*this._prevSide==-1){const n=this._intersect(this._prevPt,e);this._lineTo(this._xCut,n,0),this._prevSide=0,this._lineTo(e[0],e[1],t)}else this._lineTo(e[0],e[1],t);this._prevSide=t,this._prevPt=e}close(){const e=this._firstPt,t=this._prevPt;e[0]===t[0]&&e[1]===t[1]||this.lineTo(e),this._checkClosingPt(this._lineIn),this._checkClosingPt(this._lineOut)}_moveTo(e,t,n){this._closed?(this._lineIn.push([n<=0?e:this._xCut,t]),this._lineOut.push([n>=0?e:this._xCut,t])):(n<=0&&this._lineIn.push([e,t]),n>=0&&this._lineOut.push([e,t]))}_lineTo(e,t,n){this._closed?(this._addPolyVertex(this._lineIn,n<=0?e:this._xCut,t),this._addPolyVertex(this._lineOut,n>=0?e:this._xCut,t)):n<0?(0===this._prevSide&&this._pushLineOut(),this._lineIn.push([e,t])):n>0?(0===this._prevSide&&this._pushLineIn(),this._lineOut.push([e,t])):this._prevSide<0?(this._lineIn.push([e,t]),this._lineOut.push([e,t])):this._prevSide>0&&(this._lineOut.push([e,t]),this._lineIn.push([e,t]))}_addPolyVertex(e,t,n){const i=e.length;i>1&&e[i-1][0]===t&&e[i-2][0]===t?e[i-1][1]=n:e.push([t,n])}_checkClosingPt(e){const t=e.length;t>3&&e[0][0]===this._xCut&&e[t-2][0]===this._xCut&&e[1][0]===this._xCut&&(e[0][1]=e[t-2][1],e.pop())}_side(e){return e<this._xCut?-1:e>this._xCut?1:0}_intersect(e,t){const n=(this._xCut-e[0])/(t[0]-e[0]);return e[1]+n*(t[1]-e[1])}_pushLineIn(){this._lineIn&&this._lineIn.length>=this._minPts&&this._linesIn.push(this._lineIn),this._lineIn=[]}_pushLineOut(){this._lineOut&&this._lineOut.length>=this._minPts&&this._linesOut.push(this._lineOut),this._lineOut=[]}}},3571:function(e,t,n){n.r(t),n.d(t,{default:function(){return Ne}});var i=n(71457),s=n(41879),o=n(47966),r=n(15114),l=n(40912),a=n(76543),c=n(22113),h=(n(69292),n(51020),n(70681)),u=n(29916),d=n(51253),p=n(71680),m=n(79366),f=n(25673),_=n(99024),x=(n(44114),n(86039)),g=n(4244),y=n(87993),v=(n(37679),n(49778)),P=n(28920),w=n(71926),M=n(3734),R=n(41997),I=n(18513),B=n(13030),A=n(37072),b=n(28589),S=n(15329),O=n(74036),X=n(9737),j=n(39582),L=n(12790),Y=n(67872);let T=class extends Y.P{projectOrWarn(e,t){if(null==e)return e;const{geometry:n,pending:i}=(0,j.bS)(e,t);return i?null:i||n?n:(r.A.getLogger(this).warn("geometry could not be projected to the spatial reference",{georeference:this,geometry:e,sourceSpatialReference:e.spatialReference,targetSpatialReference:t}),null)}};T=(0,i._)([(0,u.$)("geoscene.layers.support.GeoreferenceBase")],T);const Z=T,C=(0,A.c)(),E=(0,S.a)();let V=class extends M.A{constructor(){super(...arguments),this.sourcePoint=null,this.mapPoint=null}};(0,i._)([(0,a.MZ)()],V.prototype,"sourcePoint",void 0),(0,i._)([(0,a.MZ)({type:O.A})],V.prototype,"mapPoint",void 0),V=(0,i._)([(0,u.$)("geoscene.layers.support.ControlPoint")],V);let W=class extends((0,P.Te)(Z)){constructor(e){super(e),this.controlPoints=null,this.height=0,this.type="control-points",this.width=0}readControlPoints(e,t){const n=L.A.fromJSON(t.spatialReference),i=(0,A.f)(...t.coefficients,1);return e.map((e=>((0,b.s)(E,e.x,e.y),(0,R.W)(E,E,i),{sourcePoint:e,mapPoint:new O.A({x:E[0],y:E[1],spatialReference:n})})))}writeControlPoints(e,t,n,i){if(null!=this.transform)null!=e&&z(e[0])&&(t.controlPoints=e.map((e=>{const t=e.sourcePoint;return{x:t.x,y:t.y}})),t.spatialReference=e[0].mapPoint.spatialReference.toJSON(),t.coefficients=this.transform.slice(0,8));else{const e=new o.A("web-document-write:invalid-georeference","Invalid 'controlPoints', 'width', 'height' configuration.",{layer:i?.layer,georeference:this});i?.messages?i.messages.push(e):r.A.getLogger(this).error(e.name,e.message)}}get coords(){if(null==this.controlPoints)return null;const e=this._updateTransform(C);if(null==e||!z(this.controlPoints[0]))return null;const t=this.controlPoints[0].mapPoint.spatialReference;return oe(e,this.width,this.height,t)}set coords(e){if(null==this.controlPoints||!z(this.controlPoints[0]))return;const t=this.controlPoints[0].mapPoint.spatialReference;if(null==(e=this.projectOrWarn(e,t)))return;const{width:n,height:i}=this,{rings:[[s,o,r,l]]}=e,a={sourcePoint:(0,I.tc)(0,i),mapPoint:new O.A({x:s[0],y:s[1],spatialReference:t})},c={sourcePoint:(0,I.tc)(0,0),mapPoint:new O.A({x:o[0],y:o[1],spatialReference:t})},h={sourcePoint:(0,I.tc)(n,0),mapPoint:new O.A({x:r[0],y:r[1],spatialReference:t})},u={sourcePoint:(0,I.tc)(n,i),mapPoint:new O.A({x:l[0],y:l[1],spatialReference:t})};z(a)&&z(c)&&z(h)&&z(u)&&(ee(C,a,c,h,u),this.controlPoints=this.controlPoints.map((({sourcePoint:e})=>((0,b.s)(E,e.x,e.y),(0,R.W)(E,E,C),{sourcePoint:e,mapPoint:new O.A({x:E[0],y:E[1],spatialReference:t})}))))}get inverseTransform(){return null==this.transform?null:(0,B.e)((0,A.c)(),this.transform)}get transform(){return this._updateTransform()}toMap(e){if(null==e||null==this.transform||null==this.controlPoints||!z(this.controlPoints[0]))return null;(0,b.s)(E,e.x,e.y);const t=this.controlPoints[0].mapPoint.spatialReference;return(0,R.W)(E,E,this.transform),new O.A({x:E[0],y:E[1],spatialReference:t})}toSource(e){if(null==e||null==this.inverseTransform||null==this.controlPoints||!z(this.controlPoints[0]))return null;const t=this.controlPoints[0].mapPoint.spatialReference;return e=e.normalize(),null==(e=(0,j.bS)(e,t).geometry)?null:((0,b.s)(E,e.x,e.y),(0,R.W)(E,E,this.inverseTransform),(0,I.tc)(E[0],E[1]))}_updateTransform(e){const{controlPoints:t,width:n,height:i}=this;if(!(null!=t&&n>0&&i>0))return null;const[s,o,r,l]=t;if(!z(s))return null;const a=s.mapPoint.spatialReference,c=this._projectControlPoint(o,a),h=this._projectControlPoint(r,a),u=this._projectControlPoint(l,a);if(!c.valid||!h.valid||!u.valid)return null;if(!z(c.controlPoint))return null;null==e&&(e=(0,A.c)());let d=null;return d=z(h.controlPoint)&&z(u.controlPoint)?ee(e,s,c.controlPoint,h.controlPoint,u.controlPoint):z(h.controlPoint)?Q(e,s,c.controlPoint,h.controlPoint):U(e,s,c.controlPoint),d.every((e=>0===e))?null:d}_projectControlPoint(e,t){if(!z(e))return{valid:!0,controlPoint:e};const{sourcePoint:n,mapPoint:i}=e,{geometry:s,pending:o}=(0,j.bS)(i,t);return o?{valid:!1,controlPoint:null}:o||s?{valid:!0,controlPoint:{sourcePoint:n,mapPoint:s}}:(r.A.getLogger(this).warn("map point could not be projected to the spatial reference",{georeference:this,controlPoint:e,sourceSpatialReference:i.spatialReference,targetSpatialReference:t}),{valid:!1,controlPoint:null})}};function z(e){return null!=e&&null!=e.sourcePoint&&null!=e.mapPoint}(0,i._)([(0,a.MZ)({type:[V],json:{write:{allowNull:!1,isRequired:!0}}})],W.prototype,"controlPoints",void 0),(0,i._)([(0,h.w)("controlPoints")],W.prototype,"readControlPoints",null),(0,i._)([(0,d.K)("controlPoints")],W.prototype,"writeControlPoints",null),(0,i._)([(0,a.MZ)()],W.prototype,"coords",null),(0,i._)([(0,a.MZ)({json:{write:!0}})],W.prototype,"height",void 0),(0,i._)([(0,a.MZ)({readOnly:!0})],W.prototype,"inverseTransform",null),(0,i._)([(0,a.MZ)({readOnly:!0})],W.prototype,"transform",null),(0,i._)([(0,a.MZ)({json:{write:!0}})],W.prototype,"width",void 0),W=(0,i._)([(0,u.$)("geoscene.layers.support.ControlPointsGeoreference")],W);const k=(0,S.a)(),H=(0,S.a)(),N=(0,S.a)(),$=(0,S.a)(),F=(0,S.a)(),G=(0,S.a)(),J=(0,S.a)(),q=(0,S.a)(),D=Math.PI/2;function K(e,t,n){(0,b.s)(e,n.sourcePoint.x,n.sourcePoint.y),(0,b.s)(t,n.mapPoint.x,n.mapPoint.y)}function U(e,t,n){return K(k,F,t),K(H,G,n),(0,b.r)(N,H,k,D),(0,b.r)($,k,H,D),(0,b.r)(J,G,F,-D),(0,b.r)(q,F,G,-D),se(e,k,H,N,$,F,G,J,q)}function Q(e,t,n,i){return K(k,F,t),K(H,G,n),K(N,J,i),(0,b.l)($,k,H,.5),(0,b.r)($,N,$,Math.PI),(0,b.l)(q,F,G,.5),(0,b.r)(q,J,q,Math.PI),se(e,k,H,N,$,F,G,J,q)}function ee(e,t,n,i,s){return K(k,F,t),K(H,G,n),K(N,J,i),K($,q,s),se(e,k,H,N,$,F,G,J,q)}const te=new Array(8).fill(0),ne=new Array(8).fill(0);function ie(e,t,n,i,s){return e[0]=t[0],e[1]=t[1],e[2]=n[0],e[3]=n[1],e[4]=i[0],e[5]=i[1],e[6]=s[0],e[7]=s[1],e}function se(e,t,n,i,s,o,r,l,a){return(0,R.O)(e,ie(te,t,n,i,s),ie(ne,o,r,l,a))}function oe(e,t,n,i){const s=(0,S.f)(0,n),o=(0,S.f)(0,0),r=(0,S.f)(t,0),l=(0,S.f)(t,n);return(0,R.W)(s,s,e),(0,R.W)(o,o,e),(0,R.W)(r,r,e),(0,R.W)(l,l,e),new X.A({rings:[[s,o,r,l,s]],spatialReference:i})}const re=W;let le=class extends Z{constructor(e){super(e),this.bottomLeft=null,this.bottomRight=null,this.topLeft=null,this.topRight=null,this.type="corners"}get coords(){let{topLeft:e,topRight:t,bottomLeft:n,bottomRight:i}=this;if(null==e||null==t||null==n||null==i)return null;const s=e.spatialReference;return t=this.projectOrWarn(t,s),n=this.projectOrWarn(n,s),i=this.projectOrWarn(i,s),null==t||null==n||null==i?null:new X.A({rings:[[[n.x,n.y],[e.x,e.y],[t.x,t.y],[i.x,i.y],[n.x,n.y]]],spatialReference:s})}set coords(e){const{topLeft:t}=this;if(null==t)return;const n=t.spatialReference;if(null==(e=this.projectOrWarn(e,n)))return;const{rings:[[i,s,o,r]]}=e;this.bottomLeft=new O.A({x:i[0],y:i[1],spatialReference:n}),this.topLeft=new O.A({x:s[0],y:s[1],spatialReference:n}),this.topRight=new O.A({x:o[0],y:o[1],spatialReference:n}),this.bottomRight=new O.A({x:r[0],y:r[1],spatialReference:n})}};(0,i._)([(0,a.MZ)()],le.prototype,"coords",null),(0,i._)([(0,a.MZ)({type:O.A})],le.prototype,"bottomLeft",void 0),(0,i._)([(0,a.MZ)({type:O.A})],le.prototype,"bottomRight",void 0),(0,i._)([(0,a.MZ)({type:O.A})],le.prototype,"topLeft",void 0),(0,i._)([(0,a.MZ)({type:O.A})],le.prototype,"topRight",void 0),le=(0,i._)([(0,u.$)("geoscene.layers.support.CornersGeoreference")],le);const ae=le;var ce=n(26011),he=n(4276),ue=n(41759);let de=class extends Z{constructor(e){super(e),this.extent=null,this.rotation=0,this.type="extent-and-rotation"}get coords(){if(null==this.extent)return null;const{xmin:e,ymin:t,xmax:n,ymax:i,spatialReference:s}=this.extent;let o;if(this.rotation){const{x:s,y:r}=this.extent.center,l=pe(s,r,this.rotation);o=[l(e,t),l(e,i),l(n,i),l(n,t)],o.push(o[0])}else o=[[e,t],[e,i],[n,i],[n,t],[e,t]];return new X.A({rings:[o],spatialReference:s})}set coords(e){if(null==e||null==this.extent)return;const t=this.extent.spatialReference;if(null==(e=this.projectOrWarn(e,t))||null==e.extent)return;const{rings:[[n,i,s]],extent:{center:{x:o,y:r}}}=e,l=(0,ce.KJ)(Math.PI/2-Math.atan2(i[1]-n[1],i[0]-n[0])),a=pe(o,r,-l),[c,h]=a(n[0],n[1]),[u,d]=a(s[0],s[1]);this.extent=new ue.A({xmin:c,ymin:h,xmax:u,ymax:d,spatialReference:t}),this.rotation=l}};function pe(e,t,n){const i=(0,he.t)(n),s=Math.cos(i),o=Math.sin(i);return(n,i)=>[s*(n-e)+o*(i-t)+e,s*(i-t)-o*(n-e)+t]}(0,i._)([(0,a.MZ)()],de.prototype,"coords",null),(0,i._)([(0,a.MZ)({type:ue.A})],de.prototype,"extent",void 0),(0,i._)([(0,a.MZ)({type:Number})],de.prototype,"rotation",void 0),de=(0,i._)([(0,u.$)("geoscene.layers.support.ExtentAndRotationGeoreference")],de);const me=de,fe={key:"type",base:Z,typeMap:{"control-points":re,corners:ae,"extent-and-rotation":me}};let _e=class extends((0,v.PH)((0,P.Te)(w.A))){constructor(e){super(e),this.georeference=null,this.opacity=1}readGeoreference(e){return re.fromJSON(e)}};(0,i._)([(0,a.MZ)({types:fe,json:{write:!0}})],_e.prototype,"georeference",void 0),(0,i._)([(0,h.w)("georeference")],_e.prototype,"readGeoreference",null),(0,i._)([(0,a.MZ)()],_e.prototype,"opacity",void 0),_e=(0,i._)([(0,u.$)("geoscene.layers.support.MediaElementBase")],_e);const xe=_e;var ge=n(9540),ye=n(91611);let ve=class extends xe{constructor(e){super(e),this.content=null,this.image=null,this.type="image",this.image=null}load(){const e=this.image;if("string"==typeof e){const t=(0,x["default"])(e,{responseType:"image"}).then((({data:e})=>{this._set("content",e)}));this.addResolvingPromise(t)}else if(e instanceof HTMLImageElement){const t=e.decode().then((()=>{this._set("content",e)}));this.addResolvingPromise(t)}else e?this._set("content",e):this.addResolvingPromise(Promise.reject(new o.A("image-element:invalid-image-type","Invalid image type",{image:e})));return Promise.resolve(this)}readImage(e,t,n){return(0,ye.f)(t.url,n)}writeImage(e,t,n,i){if(null==e)return;const s=i?.portalItem,o=i?.resources;if(!s||!o)return void("string"==typeof e&&(t[n]=(0,ye.t)(e,i)));const r="string"!=typeof e||(0,g.DB)(e)||(0,g.w8)(e)?null:e;if(r){if(null==(0,ye.i)(r))return void(t[n]=r);const e=(0,ye.t)(r,{...i,verifyItemRelativeUrls:i&&i.verifyItemRelativeUrls?{writtenUrls:i.verifyItemRelativeUrls.writtenUrls,rootPath:void 0}:void 0},ye.M.NO);if(s&&e&&!(0,g.oP)(e))return o.toKeep.push({resource:s.resourceFromPath(e),compress:!1}),void(t[n]=e)}t[n]="<pending>",o.pendingOperations.push(we(e).then((e=>{const i=Re(e,s);t[n]=i.itemRelativeUrl,o.toAdd.push({resource:i,content:e,compress:!1,finish:e=>{this.image=e.url}})})))}};(0,i._)([(0,a.MZ)({readOnly:!0})],ve.prototype,"content",void 0),(0,i._)([(0,a.MZ)({json:{name:"url",type:String}})],ve.prototype,"image",void 0),(0,i._)([(0,h.w)("image",["url"])],ve.prototype,"readImage",null),(0,i._)([(0,d.K)("image")],ve.prototype,"writeImage",null),(0,i._)([(0,a.MZ)({readOnly:!0,json:{name:"mediaType"}})],ve.prototype,"type",void 0),ve=(0,i._)([(0,u.$)("geoscene.layers.support.ImageElement")],ve);const Pe=ve;async function we(e){if("string"==typeof e){if((0,g.w8)(e)){const{data:t}=await(0,x["default"])(e,{responseType:"blob"});return t}return(0,g.DB)(e)?(0,g.N9)(e):we((await(0,x["default"])(e,{responseType:"image"})).data)}return new Promise((t=>Me(e).toBlob(t)))}function Me(e){if(e instanceof HTMLCanvasElement)return e;const t=e instanceof HTMLImageElement?e.naturalWidth:e.width,n=e instanceof HTMLImageElement?e.naturalHeight:e.height,i=document.createElement("canvas"),s=i.getContext("2d");return i.width=t,i.height=n,e instanceof HTMLImageElement?s.drawImage(e,0,0,e.width,e.height):e instanceof ImageData&&s.putImageData(e,0,0),i}function Re(e,t){const n=(0,y.l)(),i=`${(0,g.fj)("media",n)}.${(0,ge.n)(e)}`;return t.resourceFromPath(i)}n(2516);var Ie=n(89921),Be=n(20573),Ae=n(45477),be=n(80473),Se=n(71120),Oe=n(87400),Xe=n(99359),je=n(66340),Le=n(72465),Ye=n(79202),Te=n(13176);let Ze=class extends xe{constructor(e){super(e),this.content=null,this.type="video"}load(){const e=this.video;if("string"==typeof e){const t=document.createElement("video");t.src=e,t.crossOrigin="anonymous",t.autoplay=!0,t.muted=!0,t.loop=!0,this.addResolvingPromise(this._loadVideo(t).then((()=>{this._set("content",t)})))}else e instanceof HTMLVideoElement?this.addResolvingPromise(this._loadVideo(e).then((()=>{this._set("content",e)}))):this.addResolvingPromise(Promise.reject(new o.A("video-element:invalid-video-type","Invalid video type",{video:e})));return Promise.resolve(this)}set video(e){"not-loaded"===this.loadStatus?this._set("video",e):r.A.getLogger(this).error("#video","video cannot be changed after the element is loaded.")}_loadVideo(e){return new Promise(((t,n)=>{e.oncanplay=()=>{e.oncanplay=null,e.play().then(t,n)},"anonymous"!==e.crossOrigin&&(e.crossOrigin="anonymous",e.src=e.src)}))}};(0,i._)([(0,a.MZ)({readOnly:!0})],Ze.prototype,"content",void 0),(0,i._)([(0,a.MZ)()],Ze.prototype,"video",null),Ze=(0,i._)([(0,u.$)("geoscene.layers.support.VideoElement")],Ze);const Ce=Ze,Ee={key:"type",defaultKeyValue:"image",base:xe,typeMap:{image:Pe,video:Ce}},Ve=s.A.ofType(Ee);let We=class extends(w.A.LoadableMixin((0,be.g)((0,Ae.$)(Be.A.EventedAccessor)))){constructor(e){super(e),this._index=new Ye.F,this._elementViewsMap=new Map,this._elementsIndexes=new Map,this._elementsChangedHandler=e=>{for(const n of e.removed){const e=this._elementViewsMap.get(n);this._elementViewsMap.delete(n),this._index.delete(e),this.handles.remove(e),e.destroy(),this.notifyChange("fullExtent")}const{spatialReference:t}=this;for(const n of e.added){if(this._elementViewsMap.get(n))continue;const e=new Te._({spatialReference:t,element:n});this._elementViewsMap.set(n,e);const i=(0,Oe.wB)((()=>e.coords),(()=>this._updateIndexForElement(e,!1)));this._updateIndexForElement(e,!0),this.handles.add(i,e)}this._elementsIndexes.clear(),this.elements.forEach(((e,t)=>this._elementsIndexes.set(e,t))),this.emit("refresh")},this.elements=new Ve}async load(e){if((0,Se.Te)(e),!this.spatialReference){const e=this.elements.find((e=>null!=e.georeference&&null!=e.georeference.coords));this._set("spatialReference",e?e.georeference.coords.spatialReference:L.A.WGS84)}return this._elementsChangedHandler({added:this.elements.items,removed:[]}),this.handles.add(this.elements.on("change",this._elementsChangedHandler)),this}destroy(){this._index.clear(),this._elementViewsMap.clear(),this._elementsIndexes.clear()}set elements(e){this._set("elements",(0,Ie.V)(e,this._get("elements"),Ve))}get fullExtent(){if("not-loaded"===this.loadStatus)return null;const e=this._index.fullBounds;return null==e?null:new ue.A({xmin:e[0],ymin:e[1],xmax:e[2],ymax:e[3],spatialReference:this.spatialReference})}set spatialReference(e){"not-loaded"===this.loadStatus?this._set("spatialReference",e):r.A.getLogger(this).error("#spatialReference","spatialReference cannot be changed after the source is loaded.")}async queryElements(e,t){await this.load(),await(0,j.initializeProjection)(e.spatialReference,this.spatialReference,null,t);const n=(0,Le.aI)(e.spatialReference,this.spatialReference)?e:(0,j.Cv)(e,this.spatialReference);if(!n)return[];const i=n.normalize(),s=[];for(const o of i)this._index.forEachInBounds((0,Xe.VY)(o),(({normalizedCoords:e,element:t})=>{null!=e&&(0,je.fA)(o,e)&&s.push(t)}));return s.sort(((e,t)=>this._elementsIndexes.get(e)-this._elementsIndexes.get(t))),s}_updateIndexForElement(e,t){const n=e.normalizedBounds,i=this._index.has(e),s=null!=n;this._index.delete(e),s&&this._index.set(e,n),this.notifyChange("fullExtent"),t||(i!==s?this.emit("refresh"):this.emit("change",{element:e.element}))}};(0,i._)([(0,a.MZ)()],We.prototype,"elements",null),(0,i._)([(0,a.MZ)({readOnly:!0})],We.prototype,"fullExtent",null),(0,i._)([(0,a.MZ)()],We.prototype,"spatialReference",null),We=(0,i._)([(0,u.$)("geoscene.layers.support.LocalMediaElementSource")],We);const ze=We;function ke(e){return"object"==typeof e&&null!=e&&"type"in e}let He=class extends((0,m.d)((0,_.j)((0,f.q)((0,l.P)(p.A))))){constructor(e){super(e),this.effectiveSource=null,this.copyright=null,this.operationalLayerType="MediaLayer",this.spatialReference=null,this.type="media",this.source=new ze}load(e){const t=this.source;if(!t)return this.addResolvingPromise(Promise.reject(new o.A("media-layer:source-missing","Set 'MediaLayer.source' before loading the layer."))),Promise.resolve(this);const n=ke(t)?new ze({elements:new s.A([t])}):t;this._set("effectiveSource",n),this.spatialReference&&(n.spatialReference=this.spatialReference);const i=n.load(e).then((()=>{this.spatialReference=n.spatialReference}));return this.addResolvingPromise(i),Promise.resolve(this)}destroy(){this.effectiveSource?.destroy(),this.source?.destroy()}get fullExtent(){return this.loaded?this.effectiveSource.fullExtent:null}set source(e){"not-loaded"===this.loadStatus?this._set("source",e):r.A.getLogger(this).error("#source","source cannot be changed after the layer is loaded.")}castSource(e){return e?Array.isArray(e)?new ze({elements:new s.A(e)}):e instanceof s.A?new ze({elements:e}):e:null}readSource(e,t,n){const i="image"===t.mediaType?new Pe:"video"===t.mediaType?new Ce:null;return i?.read(t,n),i}writeSource(e,t,n,i){e&&ke(e)&&"image"===e.type?e.write(t,i):i?.messages&&i?.messages?.push(new o.A("media-layer:unsupported-source","source must be an 'ImageElement'"))}};(0,i._)([(0,a.MZ)({readOnly:!0})],He.prototype,"effectiveSource",void 0),(0,i._)([(0,a.MZ)({type:String})],He.prototype,"copyright",void 0),(0,i._)([(0,a.MZ)({readOnly:!0})],He.prototype,"fullExtent",null),(0,i._)([(0,a.MZ)({type:["MediaLayer"]})],He.prototype,"operationalLayerType",void 0),(0,i._)([(0,a.MZ)({type:["show","hide"]})],He.prototype,"listMode",void 0),(0,i._)([(0,a.MZ)({nonNullable:!0,json:{write:{enabled:!0,allowNull:!1}}})],He.prototype,"source",null),(0,i._)([(0,c.w)("source")],He.prototype,"castSource",null),(0,i._)([(0,h.w)("source",["url"])],He.prototype,"readSource",null),(0,i._)([(0,d.K)("source")],He.prototype,"writeSource",null),(0,i._)([(0,a.MZ)()],He.prototype,"spatialReference",void 0),(0,i._)([(0,a.MZ)({readOnly:!0})],He.prototype,"type",void 0),He=(0,i._)([(0,u.$)("geoscene.layers.MediaLayer")],He);const Ne=He},79202:function(e,t,n){n.d(t,{F:function(){return h}});n(44114),n(17642),n(58004),n(33853),n(45876),n(32475),n(15024),n(31698);var i=n(51020),s=n(69843),o=n(99359);const r=5e4,l={minX:0,minY:0,maxX:0,maxY:0};function a(e){l.minX=e[0],l.minY=e[1],l.maxX=e[2],l.maxY=e[3]}function c(e,t,n){a(t),e.search(l,n)}class h{constructor(){this._indexInvalid=!1,this._boundsToLoad=[],this._boundsById=new Map,this._idByBounds=new Map,this._index=new s.w(9,(0,i.A)("geoscene-csp-restrictions")?e=>({minX:e[0],minY:e[1],maxX:e[2],maxY:e[3]}):["[0]","[1]","[2]","[3]"]),this._loadIndex=()=>{if(this._indexInvalid){const e=new Array(this._idByBounds.size);let t=0;this._idByBounds.forEach(((n,i)=>{e[t++]=i})),this._indexInvalid=!1,this._index.clear(),this._index.load(e)}else this._boundsToLoad.length&&(this._index.load(Array.from(new Set(this._boundsToLoad.filter((e=>this._idByBounds.has(e)))))),this._boundsToLoad.length=0)}}get fullBounds(){if(!this._boundsById.size)return null;const e=(0,o.Ie)();for(const t of this._boundsById.values())t&&(e[0]=Math.min(t[0],e[0]),e[1]=Math.min(t[1],e[1]),e[2]=Math.max(t[2],e[2]),e[3]=Math.max(t[3],e[3]));return e}get valid(){return!this._indexInvalid}clear(){this._indexInvalid=!1,this._boundsToLoad.length=0,this._boundsById.clear(),this._idByBounds.clear(),this._index.clear()}delete(e){const t=this._boundsById.get(e);this._boundsById.delete(e),t&&(this._idByBounds.delete(t),this._indexInvalid||this._index.remove(t))}forEachInBounds(e,t){this._loadIndex(),c(this._index,e,(e=>t(this._idByBounds.get(e))))}get(e){return this._boundsById.get(e)}has(e){return this._boundsById.has(e)}invalidateIndex(){this._indexInvalid||(this._indexInvalid=!0,this._boundsToLoad.length=0)}set(e,t){if(!this._indexInvalid){const t=this._boundsById.get(e);t&&(this._index.remove(t),this._idByBounds.delete(t))}this._boundsById.set(e,t),t&&(this._idByBounds.set(t,e),this._indexInvalid||(this._boundsToLoad.push(t),this._boundsToLoad.length>r&&this._loadIndex()))}}},13176:function(e,t,n){n.d(t,{_:function(){return u}});var i=n(71457),s=n(3734),o=n(76543),r=(n(37679),n(69292),n(51020),n(29916)),l=n(9737),a=n(39582),c=n(99359),h=n(70620);let u=class extends s.A{constructor(e){super(e)}get bounds(){const e=this.coords;return null==e||null==e.extent?null:(0,c.VY)(e.extent)}get coords(){const e=this.element.georeference?.coords;return(0,a.bS)(e,this.spatialReference).geometry}get normalizedCoords(){return l.A.fromJSON((0,h.jZ)(this.coords))}get normalizedBounds(){const e=null!=this.normalizedCoords?this.normalizedCoords.extent:null;return null!=e?(0,c.VY)(e):null}};(0,i._)([(0,o.MZ)()],u.prototype,"spatialReference",void 0),(0,i._)([(0,o.MZ)()],u.prototype,"element",void 0),(0,i._)([(0,o.MZ)()],u.prototype,"bounds",null),(0,i._)([(0,o.MZ)()],u.prototype,"coords",null),(0,i._)([(0,o.MZ)()],u.prototype,"normalizedCoords",null),(0,i._)([(0,o.MZ)()],u.prototype,"normalizedBounds",null),u=(0,i._)([(0,r.$)("geoscene.layers.support.MediaElementView")],u)},9540:function(e,t,n){n.d(t,{n:function(){return s}});var i=n(4244);function s(e){return l[o(e)]||c}function o(e){return e instanceof Blob?e.type:r(e.url)}function r(e){const t=(0,i.Zo)(e);return h[t]||a}const l={},a="text/plain",c=l[a],h={png:"image/png",jpeg:"image/jpeg",jpg:"image/jpg",bmp:"image/bmp",gif:"image/gif",json:"application/json",txt:"text/plain",xml:"application/xml",svg:"image/svg+xml",zip:"application/zip",pbf:"application/vnd.mapbox-vector-tile",gz:"application/gzip","bin.gz":"application/octet-stream"};for(const u in h)l[h[u]]=u}}]);
//# sourceMappingURL=3571.413b4eee.js.map