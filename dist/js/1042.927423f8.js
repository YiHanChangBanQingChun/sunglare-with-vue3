"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[1042],{11042:function(e,t,i){i.d(t,{ElevationQuery:function(){return M}});i(44114),i(43375),i(39225),i(13972),i(99209),i(25714),i(17561),i(66197);var n=i(49067),s=i(47966),l=i(79908),a=i(71120),o=i(79075),r=i(42346),c=i(74036),u=i(68491),h=i(78979),p=i(99359),m=(i(2516),i(51020),i(15114)),f=i(30075);const d=m.A.getLogger("geoscene.layers.support.ElevationSampler");class y{queryElevation(e){return T(e.clone(),this)}on(){return E}projectIfRequired(e,t){return w(e,t)}}class x extends y{get spatialReference(){return this.extent.spatialReference}constructor(e,t,i){super(),this.tile=e,this.noDataValue=i;const n=e.tile.extent;this.extent=(0,p.w1)(n,t.spatialReference),this.extent.zmin=e.zmin,this.extent.zmax=e.zmax,this._aaExtent=n;const s=(0,o.GA)(t.spatialReference),l=t.lodAt(e.tile.level).resolution*s;this.demResolution={min:l,max:l}}contains(e){const t=this.projectIfRequired(e,this.spatialReference);return null!=t&&this.containsAt(t.x,t.y)}containsAt(e,t){return(0,p.Rj)(this._aaExtent,e,t)}elevationAt(e,t){if(!this.containsAt(e,t)){const i=this.extent,n=`${i.xmin}, ${i.ymin}, ${i.xmax}, ${i.ymax}`;return d.warn("#elevationAt()",`Point used to sample elevation (${e}, ${t}) is outside of the sampler extent (${n})`),this.noDataValue}return this.tile.sample(e,t)??this.noDataValue}}class v extends y{get spatialReference(){return this.extent.spatialReference}constructor(e,t,i){let n;super(),"number"==typeof t?(this.noDataValue=t,n=null):(n=t,this.noDataValue=i),this.samplers=n?e.map((e=>new x(e,n,this.noDataValue))):e;const s=this.samplers[0];if(s){this.extent=s.extent.clone();const{min:e,max:t}=s.demResolution;this.demResolution={min:e,max:t};for(let i=1;i<this.samplers.length;i++){const e=this.samplers[i];this.extent.union(e.extent),this.demResolution.min=Math.min(this.demResolution.min,e.demResolution.min),this.demResolution.max=Math.max(this.demResolution.max,e.demResolution.max)}}else this.extent=(0,p.w1)((0,p.vt)(),n.spatialReference),this.demResolution={min:0,max:0}}elevationAt(e,t){for(const i of this.samplers)if(i.containsAt(e,t))return i.elevationAt(e,t);return d.warn("#elevationAt()",`Point used to sample elevation (${e}, ${t}) is outside of the sampler`),this.noDataValue}}function T(e,t){const i=w(e,t.spatialReference);if(!i)return null;switch(e.type){case"point":g(e,i,t);break;case"polyline":_(e,i,t);break;case"multipoint":R(e,i,t)}return e}function w(e,t){if(null==e)return null;const i=e.spatialReference;if(i.equals(t))return e;const n=(0,f.Cv)(e,t);return n||d.error(`Cannot project geometry spatial reference (wkid:${i.wkid}) to elevation sampler spatial reference (wkid:${t.wkid})`),n}function g(e,t,i){e.z=i.elevationAt(t.x,t.y)}function _(e,t,i){A.spatialReference=t.spatialReference;const n=e.hasM&&!e.hasZ;for(let s=0;s<e.paths.length;s++){const l=e.paths[s],a=t.paths[s];for(let e=0;e<l.length;e++){const t=l[e],s=a[e];A.x=s[0],A.y=s[1],n&&(t[3]=t[2]),t[2]=i.elevationAt(A.x,A.y)}}e.hasZ=!0}function R(e,t,i){A.spatialReference=t.spatialReference;const n=e.hasM&&!e.hasZ;for(let s=0;s<e.points.length;s++){const l=e.points[s],a=t.points[s];A.x=a[0],A.y=a[1],n&&(l[3]=l[2]),l[2]=i.elevationAt(A.x,A.y)}e.hasZ=!0}const A=new c.A,E={remove(){}};class q{constructor(e,t){this.data=e,this.safeWidth=.99999999*(e.width-1),this.dx=(e.width-1)/(t[2]-t[0]),this.dy=(e.width-1)/(t[3]-t[1]),this.x0=t[0],this.y1=t[3]}}class D{constructor(e,t=null){if(this.tile=e,null!=t&&null!=e){const i=e.extent;this._samplerData=new q(t,i)}}get zmin(){return null!=this._samplerData?this._samplerData.data.minValue:0}get zmax(){return null!=this._samplerData?this._samplerData.data.maxValue:0}sample(e,t){if(null==this._samplerData)return;const{safeWidth:i,data:n,dx:s,dy:l,y1:a,x0:o}=this._samplerData,{width:r,values:c,noDataValue:u}=n,h=I(l*(a-t),0,i),p=I(s*(e-o),0,i),m=Math.floor(h),f=Math.floor(p),d=m*r+f,y=d+r,x=c[d],v=c[y],T=c[d+1],w=c[y+1];if(x!==u&&v!==u&&T!==u&&w!==u){const e=p-f,t=x+(T-x)*e;return t+(v+(w-v)*e-t)*(h-m)}}}function I(e,t,i){return e<t?t:e>i?i:e}var C=i(79950);class M{async queryAll(e,t,i){if(!(e=i&&i.ignoreInvisibleLayers?e.filter((e=>e.visible)):e.slice()).length)throw new s.A("elevation-query:invalid-layer","Elevation queries require at least one elevation layer to fetch tiles from");const n=z.fromGeometry(t);let l=!1;i&&i.returnSampleInfo||(l=!0);const a={...L,...i,returnSampleInfo:!0},o=await this.query(e[e.length-1],n,a),r=await this._queryAllContinue(e,o,a);return r.geometry=r.geometry.export(),l&&delete r.sampleInfo,r}async query(e,t,i){if(!e)throw new s.A("elevation-query:invalid-layer","Elevation queries require an elevation layer to fetch tiles from");if(!t||!(t instanceof z)&&"point"!==t.type&&"multipoint"!==t.type&&"polyline"!==t.type)throw new s.A("elevation-query:invalid-geometry","Only point, polyline and multipoint geometries can be used to query elevation");const n={...L,...i},l=new b(e,t.spatialReference,n),a=n.signal;return await e.load({signal:a}),await this._createGeometryDescriptor(l,t,a),await this._selectTiles(l,a),await this._populateElevationTiles(l,a),this._sampleGeometryWithElevation(l),this._createQueryResult(l,a)}async createSampler(e,t,i){if(!e)throw new s.A("elevation-query:invalid-layer","Elevation queries require an elevation layer to fetch tiles from");if(!t||"extent"!==t.type)throw new s.A("elevation-query:invalid-extent","Invalid or undefined extent");const n={...L,...i};return this._createSampler(e,t,n)}async createSamplerAll(e,t,i){if(!(e=i&&i.ignoreInvisibleLayers?e.filter((e=>e.visible)):e.slice()).length)throw new s.A("elevation-query:invalid-layer","Elevation queries require at least one elevation layer to fetch tiles from");if(!t||"extent"!==t.type)throw new s.A("elevation-query:invalid-extent","Invalid or undefined extent");const n={...L,...i,returnSampleInfo:!0},l=await this._createSampler(e[e.length-1],t,n);return this._createSamplerAllContinue(e,t,l,n)}async _createSampler(e,t,i,n){const s=i.signal;await e.load({signal:s});const l=t.spatialReference,a=e.tileInfo.spatialReference;l.equals(a)||(await(0,h.initializeProjection)([{source:l,dest:a}],{signal:s}),t=(0,h.Cv)(t,a));const o=new S(e,t,i,n);return await this._selectTiles(o,s),await this._populateElevationTiles(o,s),new v(o.elevationTiles,o.layer.tileInfo,o.options.noDataValue)}async _createSamplerAllContinue(e,t,i,n){if(e.pop(),!e.length)return i;const s=i.samplers.map((e=>(0,p.VY)(e.extent))),l=await this._createSampler(e[e.length-1],t,n,s);if(0===l.samplers.length)return i;const a=i.samplers.concat(l.samplers),o=new v(a,n.noDataValue);return this._createSamplerAllContinue(e,t,o,n)}async _queryAllContinue(e,t,i){const n=e.pop(),s=t.geometry.coordinates,a=t.sampleInfo;(0,l.Lw)(a);const o=[],r=[];for(let l=0;l<s.length;l++){const t=a[l];t.demResolution>=0?t.source||(t.source=n):e.length&&(o.push(s[l]),r.push(l))}if(!e.length||0===o.length)return t;const c=t.geometry.clone(o),u=await this.query(e[e.length-1],c,i),h=u.sampleInfo;if(!h)throw new Error("no sampleInfo");return r.forEach(((e,t)=>{s[e].z=u.geometry.coordinates[t].z,a[e].demResolution=h[t].demResolution})),this._queryAllContinue(e,t,i)}async _createQueryResult(e,t){const i=await e.geometry.project(e.outSpatialReference,t);(0,l.Lw)(i);const n={geometry:i.export(),noDataValue:e.options.noDataValue};return e.options.returnSampleInfo&&(n.sampleInfo=this._extractSampleInfo(e)),e.geometry.coordinates.forEach((e=>{e.tile=null,e.elevationTile=null})),n}async _createGeometryDescriptor(e,t,i){let n;const l=e.layer.tileInfo.spatialReference;if(t instanceof z?n=await t.project(l,i):(await(0,h.initializeProjection)([{source:t.spatialReference,dest:l}],{signal:i}),n=(0,h.Cv)(t,l)),!n)throw new s.A("elevation-query:spatial-reference-mismatch",`Cannot query elevation in '${t.spatialReference.wkid}' on an elevation service in '${l.wkid}'`);e.geometry=z.fromGeometry(n)}async _selectTiles(e,t){"geometry"===e.type&&this._preselectOutsideLayerExtent(e);const i=e.options.demResolution;if("number"==typeof i)this._selectTilesClosestResolution(e,i);else if("finest-contiguous"===i)await this._selectTilesFinestContiguous(e,t);else{if("auto"!==i)throw new s.A("elevation-query:invalid-dem-resolution",`Invalid dem resolution value '${i}', expected a number, "finest-contiguous" or "auto"`);await this._selectTilesAuto(e,t)}}_preselectOutsideLayerExtent(e){if(null==e.layer.fullExtent)return;const t=new D(null);t.sample=()=>e.options.noDataValue,e.outsideExtentTile=t;const i=e.layer.fullExtent;e.geometry.coordinates.forEach((e=>{const n=e.x,s=e.y;(n<i.xmin||n>i.xmax||s<i.ymin||s>i.ymax)&&(e.elevationTile=t)}))}_selectTilesClosestResolution(e,t){const i=this._findNearestDemResolutionLODIndex(e,t);e.selectTilesAtLOD(i)}_findNearestDemResolutionLODIndex(e,t){const{tileInfo:i,tilemapCache:n}=e.layer,s=t/(0,o.GA)(i.spatialReference),l=$(i,n);let a=l[0],r=0;for(let o=1;o<l.length;o++){const e=l[o];Math.abs(e.resolution-s)<Math.abs(a.resolution-s)&&(a=e,r=o)}return r}async _selectTilesFinestContiguous(e,t){const{tileInfo:i,tilemapCache:n}=e.layer,s=V(i,n,e.options.minDemResolution);await this._selectTilesFinestContiguousAt(e,s,t)}async _selectTilesFinestContiguousAt(e,t,i){const n=e.layer;if(e.selectTilesAtLOD(t),t<0)return;const l=n.tilemapCache,o=e.getTilesToFetch();try{if(l&&!O(l))await(0,a.qr)(Promise.all(o.map((e=>l.fetchAvailability(e.level,e.row,e.col,{signal:i})))),i);else if(await this._populateElevationTiles(e,i),!e.allElevationTilesFetched())throw e.clearElevationTiles(),new s.A("elevation-query:has-unavailable-tiles")}catch(v){(0,a.QP)(v),await this._selectTilesFinestContiguousAt(e,t-1,i)}}async _populateElevationTiles(e,t){const i=e.getTilesToFetch(),n={},s=e.options.cache,l=e.options.noDataValue,o=i.map((async i=>{if(null==i.id)return;const a=`${e.layer.uid}:${i.id}:${l}`,o=null!=s?s.get(a):null,r=null!=o?o:await e.layer.fetchTile(i.level,i.row,i.col,{noDataValue:l,signal:t});null!=s&&s.put(a,r),n[i.id]=new D(i,r)}));await(0,a.qr)((0,a.Lx)(o),t),e.populateElevationTiles(n)}async _selectTilesAuto(e,t){this._selectTilesAutoFinest(e),this._reduceTilesForMaximumRequests(e);const i=e.layer.tilemapCache;if(!i||O(i))return this._selectTilesAutoPrefetchUpsample(e,t);const s=e.getTilesToFetch(),l={},o=s.map((async e=>{const s=new C.U(null,0,0,0,(0,p.vt)()),o=await(0,n.Ke)(i.fetchAvailabilityUpsample(e.level,e.row,e.col,s,{signal:t}));!1!==o.ok?null!=e.id&&(l[e.id]=s):(0,a.QP)(o.error)}));await(0,a.qr)(Promise.all(o),t),e.remapTiles(l)}_reduceTilesForMaximumRequests(e){const t=e.layer.tileInfo;let i=0;const n={},s=e=>{null!=e.id&&(e.id in n?n[e.id]++:(n[e.id]=1,i++))},l=e=>{if(null==e.id)return;const t=n[e.id];1===t?(delete n[e.id],i--):n[e.id]=t-1};e.forEachTileToFetch(s,l);let a=!0;for(;a&&(a=!1,e.forEachTileToFetch((n=>{i<=e.options.maximumAutoTileRequests||(l(n),t.upsampleTile(n)&&(a=!0),s(n))}),l),a););}_selectTilesAutoFinest(e){const{tileInfo:t,tilemapCache:i}=e.layer,n=V(t,i,e.options.minDemResolution);e.selectTilesAtLOD(n,e.options.maximumAutoTileRequests)}async _selectTilesAutoPrefetchUpsample(e,t){const i=e.layer.tileInfo;await this._populateElevationTiles(e,t);let n=!1;e.forEachTileToFetch(((e,t)=>{i.upsampleTile(e)?n=!0:t()})),n&&await this._selectTilesAutoPrefetchUpsample(e,t)}_sampleGeometryWithElevation(e){e.geometry.coordinates.forEach((t=>{const i=t.elevationTile;let n=e.options.noDataValue;if(i){const e=i.sample(t.x,t.y);null!=e?n=e:t.elevationTile=null}t.z=n}))}_extractSampleInfo(e){const t=e.layer.tileInfo,i=(0,o.GA)(t.spatialReference);return e.geometry.coordinates.map((n=>{let s=-1;return n.elevationTile&&n.elevationTile!==e.outsideExtentTile&&(s=t.lodAt(n.elevationTile.tile.level).resolution*i),{demResolution:s}}))}}class z{export(){return this._exporter(this.coordinates,this.spatialReference)}clone(e){const t=new z;return t.geometry=this.geometry,t.spatialReference=this.spatialReference,t.coordinates=e||this.coordinates.map((e=>e.clone())),t._exporter=this._exporter,t}async project(e,t){if(this.spatialReference.equals(e))return this.clone();await(0,h.initializeProjection)([{source:this.spatialReference,dest:e}],{signal:t});const i=new r.A({spatialReference:this.spatialReference,points:this.coordinates.map((e=>[e.x,e.y]))}),n=(0,h.Cv)(i,e);if(!n)return null;const s=this.coordinates.map(((e,t)=>{const i=e.clone(),s=n.points[t];return i.x=s[0],i.y=s[1],i})),l=this.clone(s);return l.spatialReference=e,l}static fromGeometry(e){const t=new z;if(t.geometry=e,t.spatialReference=e.spatialReference,e instanceof z)t.coordinates=e.coordinates.map((e=>e.clone())),t._exporter=(t,i)=>{const n=e.clone(t);return n.spatialReference=i,n};else switch(e.type){case"point":{const i=e,{hasZ:n,hasM:s}=i;t.coordinates=n&&s?[new F(i.x,i.y,i.z,i.m)]:n?[new F(i.x,i.y,i.z)]:s?[new F(i.x,i.y,null,i.m)]:[new F(i.x,i.y)],t._exporter=(t,i)=>e.hasM?new c.A(t[0].x,t[0].y,t[0].z,t[0].m,i):new c.A(t[0].x,t[0].y,t[0].z,i);break}case"multipoint":{const i=e,{hasZ:n,hasM:s}=i;t.coordinates=n&&s?i.points.map((e=>new F(e[0],e[1],e[2],e[3]))):n?i.points.map((e=>new F(e[0],e[1],e[2]))):s?i.points.map((e=>new F(e[0],e[1],null,e[2]))):i.points.map((e=>new F(e[0],e[1]))),t._exporter=(t,i)=>e.hasM?new r.A({points:t.map((e=>[e.x,e.y,e.z,e.m])),hasZ:!0,hasM:!0,spatiaReference:i}):new r.A(t.map((e=>[e.x,e.y,e.z])),i);break}case"polyline":{const i=e,n=[],s=[],{hasZ:l,hasM:a}=e;let o=0;for(const e of i.paths)if(s.push([o,o+e.length]),o+=e.length,l&&a)for(const t of e)n.push(new F(t[0],t[1],t[2],t[3]));else if(l)for(const t of e)n.push(new F(t[0],t[1],t[2]));else if(a)for(const t of e)n.push(new F(t[0],t[1],null,t[2]));else for(const t of e)n.push(new F(t[0],t[1]));t.coordinates=n,t._exporter=(t,i)=>{const n=e.hasM?t.map((e=>[e.x,e.y,e.z,e.m])):t.map((e=>[e.x,e.y,e.z])),l=s.map((e=>n.slice(e[0],e[1])));return new u.A({paths:l,hasM:e.hasM,hasZ:!0,spatialReference:i})};break}}return t}}class F{constructor(e,t,i=null,n=null,s=null,l=null){this.x=e,this.y=t,this.z=i,this.m=n,this.tile=s,this.elevationTile=l}clone(){return new F(this.x,this.y,this.z,this.m)}}class k{constructor(e,t){this.layer=e,this.options=t}}class b extends k{constructor(e,t,i){super(e,i),this.outSpatialReference=t,this.type="geometry"}selectTilesAtLOD(e){if(e<0)this.geometry.coordinates.forEach((e=>e.tile=null));else{const{tileInfo:t,tilemapCache:i}=this.layer,n=$(t,i)[e].level;this.geometry.coordinates.forEach((e=>e.tile=t.tileAt(n,e.x,e.y)))}}allElevationTilesFetched(){return!this.geometry.coordinates.some((e=>!e.elevationTile))}clearElevationTiles(){for(const e of this.geometry.coordinates)e.elevationTile!==this.outsideExtentTile&&(e.elevationTile=null)}populateElevationTiles(e){for(const t of this.geometry.coordinates)!t.elevationTile&&t.tile?.id&&(t.elevationTile=e[t.tile.id])}remapTiles(e){for(const t of this.geometry.coordinates){const i=t.tile?.id;t.tile=i?e[i]:null}}getTilesToFetch(){const e={},t=[];for(const i of this.geometry.coordinates){const n=i.tile;if(!n)continue;const s=i.tile?.id;i.elevationTile||!s||e[s]||(e[s]=n,t.push(n))}return t}forEachTileToFetch(e){for(const t of this.geometry.coordinates)t.tile&&!t.elevationTile&&e(t.tile,(()=>{t.tile=null}))}}class S extends k{constructor(e,t,i,n){super(e,i),this.type="extent",this.elevationTiles=[],this._candidateTiles=[],this._fetchedCandidates=new Set,this.extent=t.intersection(e.fullExtent),this.maskExtents=n}selectTilesAtLOD(e,t){const i=this._maximumLodForRequests(t),n=Math.min(i,e);n<0?this._candidateTiles.length=0:this._selectCandidateTilesCoveringExtentAt(n)}_maximumLodForRequests(e){const{tileInfo:t,tilemapCache:i}=this.layer,n=$(t,i);if(!e)return n.length-1;const s=this.extent;if(null==s)return-1;for(let l=n.length-1;l>=0;l--){const i=n[l],a=i.resolution*t.size[0],o=i.resolution*t.size[1];if(Math.ceil(s.width/a)*Math.ceil(s.height/o)<=e)return l}return-1}allElevationTilesFetched(){return this._candidateTiles.length===this.elevationTiles.length}clearElevationTiles(){this.elevationTiles.length=0,this._fetchedCandidates.clear()}populateElevationTiles(e){for(const t of this._candidateTiles){const i=t.id&&e[t.id];i&&(this._fetchedCandidates.add(t),this.elevationTiles.push(i))}}remapTiles(e){this._candidateTiles=this._uniqueNonOverlappingTiles(this._candidateTiles.map((t=>e[t.id])))}getTilesToFetch(){return this._candidateTiles}forEachTileToFetch(e,t){const i=this._candidateTiles;this._candidateTiles=[],i.forEach((i=>{if(this._fetchedCandidates.has(i))return void(t&&t(i));let n=!1;e(i,(()=>n=!0)),n?t&&t(i):this._candidateTiles.push(i)})),this._candidateTiles=this._uniqueNonOverlappingTiles(this._candidateTiles,t)}_uniqueNonOverlappingTiles(e,t){const i={},n=[];for(const l of e){const e=l.id;e&&!i[e]?(i[e]=l,n.push(l)):t&&t(l)}const s=n.sort(((e,t)=>e.level-t.level));return s.filter(((e,i)=>{for(let n=0;n<i;n++){const i=s[n].extent;if(i&&e.extent&&(0,p.gR)(i,e.extent))return t&&t(e),!1}return!0}))}_selectCandidateTilesCoveringExtentAt(e){this._candidateTiles.length=0;const t=this.extent;if(null==t)return;const{tileInfo:i,tilemapCache:n}=this.layer,s=$(i,n)[e],l=i.tileAt(s.level,t.xmin,t.ymin),a=l.extent;if(null==a)return;const o=s.resolution*i.size[0],r=s.resolution*i.size[1],c=Math.ceil((t.xmax-a[0])/o),u=Math.ceil((t.ymax-a[1])/r);for(let h=0;h<u;h++)for(let e=0;e<c;e++){const t=new C.U(null,l.level,l.row-h,l.col+e);i.updateTileInfo(t),this._tileIsMasked(t)||this._candidateTiles.push(t)}}_tileIsMasked(e){return!!this.maskExtents&&this.maskExtents.some((t=>e.extent&&(0,p.gR)(t,e.extent)))}}function V(e,t,i=0){const n=$(e,t);let s=n.length-1;if(i>0){const t=i/(0,o.GA)(e.spatialReference),l=n.findIndex((e=>e.resolution<t));0===l?s=0:l>0&&(s=l-1)}return s}const L={maximumAutoTileRequests:20,noDataValue:0,returnSampleInfo:!1,demResolution:"auto",minDemResolution:0};function $(e,t){const i=e.lods;if(O(t)){const{effectiveMinLOD:e,effectiveMaxLOD:n}=t;return i.filter((t=>t.level>=e&&t.level<=n))}return i}function O(e){return null!=e?.tileInfo}}}]);
//# sourceMappingURL=1042.927423f8.js.map