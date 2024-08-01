"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[688],{92403:function(e,t,i){var r;i.d(t,{u:function(){return r}}),function(e){e[e.KILOBYTES=1024]="KILOBYTES",e[e.MEGABYTES=1048576]="MEGABYTES",e[e.GIGABYTES=1073741824]="GIGABYTES"}(r||(r={}))},10688:function(e,t,i){i.r(t),i.d(t,{default:function(){return q}});i(44114);var r,l=i(71457),a=i(86039),n=i(47966),s=i(45477),o=i(82755),c=i(40912),h=i(71120),p=i(4244),u=i(76543),f=i(22113),d=(i(69292),i(51020),i(70681)),v=i(29916),y=i(51253),m=i(12790),_=i(71680),g=i(91740),w=i(24670),b=i(76706),S=i(71260),A=i(79366),T=i(52084),O=i(25673),M=i(21107),D=i(8197),L=i(99024),I=i(1133),x=i(75122),$=i(83256),C=i(33690),Z=i(26550);const P=["Canvas/World_Dark_Gray_Base","Canvas/World_Dark_Gray_Reference","Canvas/World_Light_Gray_Base","Canvas/World_Light_Gray_Reference","Elevation/World_Hillshade","Elevation/World_Hillshade_Dark","Ocean/World_Ocean_Base","Ocean/World_Ocean_Reference","Ocean_Basemap","Reference/World_Boundaries_and_Places","Reference/World_Boundaries_and_Places_Alternate","Reference/World_Transportation","World_Imagery","World_Street_Map","World_Topo_Map"];let U=r=class extends((0,A.d)((0,L.j)((0,I.I)((0,w.f)((0,b.V)((0,O.q)((0,M.A)((0,S.b)((0,c.P)((0,s.$)((0,D.J)((0,g.p)((0,T.d)(_.A)))))))))))))){constructor(...e){super(...e),this.listMode="show",this.isReference=null,this.operationalLayerType="ArcGISTiledMapServiceLayer",this.resampling=!0,this.sourceJSON=null,this.spatialReference=null,this.path=null,this.sublayers=null,this.type="tile",this.url=null}normalizeCtorArgs(e,t){return"string"==typeof e?{url:e,...t}:e}load(e){const t=null!=e?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).catch(h.QP).then((()=>this._fetchService(t)))),Promise.resolve(this)}get attributionDataUrl(){const e=this.parsedUrl?.path.toLowerCase();return e?this._getDefaultAttribution(this._getMapName(e)):null}readSpatialReference(e,t){return(e=e||t.tileInfo&&t.tileInfo.spatialReference)&&m.A.fromJSON(e)}writeSublayers(e,t,i,r){if(!this.loaded||!e)return;const l=e.slice().reverse().flatten((({sublayers:e})=>e&&e.toArray().reverse())).toArray(),a=[],n={writeSublayerStructure:!1,...r};l.forEach((e=>{const t=e.write({},n);a.push(t)})),a.some((e=>Object.keys(e).length>1))&&(t.layers=a)}get tileServers(){return this._getDefaultTileServers(this.parsedUrl?.path)}castTileServers(e){return Array.isArray(e)?e.map((e=>(0,p.An)(e).path)):null}fetchTile(e,t,i,r={}){const{signal:l}=r,n=this.getTileUrl(e,t,i),s={responseType:"image",signal:l,query:{...this.refreshParameters}};return(0,a["default"])(n,s).then((e=>e.data))}async fetchImageBitmapTile(e,t,i,l={}){const{signal:n}=l;if(this.fetchTile!==r.prototype.fetchTile){const r=await this.fetchTile(e,t,i,l);return(0,C.C)(r,e,t,i,n)}const s=this.getTileUrl(e,t,i),o={responseType:"blob",signal:n,query:{...this.refreshParameters}},{data:c}=await(0,a["default"])(s,o);return(0,C.C)(c,e,t,i,n)}getTileUrl(e,t,i){const r=!this.capabilities.operations.supportsTileMap&&this.supportsBlankTile,l=(0,p.x0)({...this.parsedUrl?.query,blankTile:!r&&null,...this.customParameters,token:this.apiKey}),a=this.tileServers;return`${a&&a.length?a[t%a.length]:this.parsedUrl?.path}/tile/${e}/${t}/${i}${l?"?"+l:""}`}loadAll(){return(0,o.g)(this,(e=>{e(this.allSublayers)}))}_fetchService(e){return new Promise(((t,i)=>{if(this.sourceJSON){if(null!=this.sourceJSON.bandCount&&null!=this.sourceJSON.pixelSizeX)throw new n.A("tile-layer:unsupported-url","use ImageryTileLayer to open a tiled image service");return void t({data:this.sourceJSON})}if(!this.parsedUrl)throw new n.A("tile-layer:undefined-url","layer's url is not defined");const r=(0,x.qg)(this.parsedUrl.path);if(null!=r&&"ImageServer"===r.serverType)throw new n.A("tile-layer:unsupported-url","use ImageryTileLayer to open a tiled image service");(0,a["default"])(this.parsedUrl.path,{query:{f:"json",...this.parsedUrl.query,...this.customParameters,token:this.apiKey},responseType:"json",signal:e}).then(t,i)})).then((t=>{let i=this.url;if(t.ssl&&(i=this.url=i.replace(/^http:/i,"https:")),this.sourceJSON=t.data,this.read(t.data,{origin:"service",url:this.parsedUrl}),10.1===this.version&&!(0,x.Wo)(i))return this._fetchServerVersion(i,e).then((e=>{this.read({currentVersion:e})})).catch((()=>{}))}))}_fetchServerVersion(e,t){if(!(0,x.Fi)(e))return Promise.reject();const i=e.replace(/(.*\/rest)\/.*/i,"$1")+"/info";return(0,a["default"])(i,{query:{f:"json",...this.customParameters,token:this.apiKey},responseType:"json",signal:t}).then((e=>{if(e.data&&e.data.currentVersion)return e.data.currentVersion;throw new n.A("tile-layer:version-not-available")}))}_getMapName(e){const t=e.match(/^(?:https?:)?\/\/(server\.arcgisonline\.com|services\.arcgisonline\.com|ibasemaps-api\.arcgis\.com)\/arcgis\/rest\/services\/([^\/]+(\/[^\/]+)*)\/mapserver/i);return t?t[2]:void 0}_getDefaultAttribution(e){if(null==e)return null;let t;e=e.toLowerCase();for(let i=0,r=P.length;i<r;i++)if(t=P[i],t.toLowerCase().includes(e))return(0,p.s2)("//static.arcgis.com/attribution/"+t);return null}_getDefaultTileServers(e){if(null==e)return[];const t=-1!==e.search(/^(?:https?:)?\/\/server\.arcgisonline\.com/i),i=-1!==e.search(/^(?:https?:)?\/\/services\.arcgisonline\.com/i);return t||i?[e,e.replace(t?/server\.arcgisonline/i:/services\.arcgisonline/i,t?"services.arcgisonline":"server.arcgisonline")]:[]}get hasOverriddenFetchTile(){return!this.fetchTile[k]}};(0,l._)([(0,u.MZ)({readOnly:!0})],U.prototype,"attributionDataUrl",null),(0,l._)([(0,u.MZ)({type:["show","hide","hide-children"]})],U.prototype,"listMode",void 0),(0,l._)([(0,u.MZ)({json:{read:!0,write:!0}})],U.prototype,"blendMode",void 0),(0,l._)([(0,u.MZ)({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],U.prototype,"isReference",void 0),(0,l._)([(0,u.MZ)({readOnly:!0,type:["ArcGISTiledMapServiceLayer"]})],U.prototype,"operationalLayerType",void 0),(0,l._)([(0,u.MZ)({type:Boolean})],U.prototype,"resampling",void 0),(0,l._)([(0,u.MZ)()],U.prototype,"sourceJSON",void 0),(0,l._)([(0,u.MZ)({type:m.A})],U.prototype,"spatialReference",void 0),(0,l._)([(0,d.w)("spatialReference",["spatialReference","tileInfo"])],U.prototype,"readSpatialReference",null),(0,l._)([(0,u.MZ)({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],U.prototype,"path",void 0),(0,l._)([(0,u.MZ)({readOnly:!0})],U.prototype,"sublayers",void 0),(0,l._)([(0,y.K)("sublayers",{layers:{type:[Z.A]}})],U.prototype,"writeSublayers",null),(0,l._)([(0,u.MZ)({json:{read:!1,write:!1}})],U.prototype,"popupEnabled",void 0),(0,l._)([(0,u.MZ)()],U.prototype,"tileServers",null),(0,l._)([(0,f.w)("tileServers")],U.prototype,"castTileServers",null),(0,l._)([(0,u.MZ)({readOnly:!0,json:{read:!1}})],U.prototype,"type",void 0),(0,l._)([(0,u.MZ)($.OZ)],U.prototype,"url",void 0),U=r=(0,l._)([(0,v.$)("geoscene.layers.TileLayer")],U);const k=Symbol("default-fetch-tile");U.prototype.fetchTile[k]=!0;const q=U},24670:function(e,t,i){i.d(t,{f:function(){return p}});var r=i(71457),l=(i(2516),i(76543)),a=(i(37679),i(69292),i(51020),i(70681)),n=i(29916),s=i(2889),o=i(46913),c=i(64381),h=i(12790);const p=e=>{let t=class extends e{constructor(){super(...arguments),this.copyright=null,this.minScale=0,this.maxScale=0,this.spatialReference=null,this.tileInfo=null,this.tilemapCache=null}destroy(){this.tilemapCache?.destroy?.()}readMinScale(e,t){return null!=t.minLOD&&null!=t.maxLOD?e:0}readMaxScale(e,t){return null!=t.minLOD&&null!=t.maxLOD?e:0}get supportsBlankTile(){return this.version>=10.2}readTilemapCache(e,t,i){const r=t.capabilities?.includes("Tilemap");let{minLOD:l,maxLOD:a,minScale:n,maxScale:h}=t;if(null==l&&null==a&&0!==n&&0!==h){const e=e=>Math.round(1e4*e)/1e4;n=e(n||t.tileInfo.lods[0].scale),h=e(h||t.tileInfo.lods[t.tileInfo.lods.length-1].scale);for(const i of t.tileInfo.lods){const t=e(i.scale);l=t>=n?i.level:l,a=t>=h?i.level:a}}if(r)return new c.d({layer:this,minLOD:l,maxLOD:a});if(t.tileInfo){const e=new s.A;return e.read(t.tileInfo,i),new o.A(e,l,a)}return null}};return(0,r._)([(0,l.MZ)({json:{read:{source:"copyrightText"}}})],t.prototype,"copyright",void 0),(0,r._)([(0,l.MZ)()],t.prototype,"minScale",void 0),(0,r._)([(0,a.w)("service","minScale")],t.prototype,"readMinScale",null),(0,r._)([(0,l.MZ)()],t.prototype,"maxScale",void 0),(0,r._)([(0,a.w)("service","maxScale")],t.prototype,"readMaxScale",null),(0,r._)([(0,l.MZ)({type:h.A})],t.prototype,"spatialReference",void 0),(0,r._)([(0,l.MZ)({readOnly:!0})],t.prototype,"supportsBlankTile",null),(0,r._)([(0,l.MZ)({type:s.A})],t.prototype,"tileInfo",void 0),(0,r._)([(0,l.MZ)()],t.prototype,"tilemapCache",void 0),(0,r._)([(0,a.w)("service","tilemapCache",["capabilities","tileInfo"])],t.prototype,"readTilemapCache",null),(0,r._)([(0,l.MZ)()],t.prototype,"version",void 0),t=(0,r._)([(0,n.$)("geoscene.layers.mixins.ArcGISCachedService")],t),t}},46913:function(e,t,i){i.d(t,{A:function(){return a}});var r=i(47966),l=i(71120);class a{constructor(e,t=0,i=e.lods.length-1){this.tileInfo=e,this.minLOD=t,this.maxLOD=i}get effectiveMinLOD(){return this.minLOD??this.tileInfo.lods[0].level}get effectiveMaxLOD(){return this.maxLOD??this.tileInfo.lods[this.tileInfo.lods.length-1].level}getAvailability(e,t,i){const r=this.tileInfo?.lodAt(e);return!r||e<this.minLOD||e>this.maxLOD?"unavailable":r.cols&&r.rows?i>=r.cols[0]&&i<=r.cols[1]&&t>=r.rows[0]&&t<=r.rows[1]?"unknown":"unavailable":"unknown"}async fetchAvailability(e,t,i,a){await(0,l.NO)(a);const n=this.getAvailability(e,t,i);if("unavailable"===n)throw new r.A("tile-map:tile-unavailable","Tile is not available",{level:e,row:t,col:i});return n}async fetchAvailabilityUpsample(e,t,i,r,a){await(0,l.NO)(a),r.level=e,r.row=t,r.col=i;const n=this.tileInfo;return n.updateTileInfo(r),this.fetchAvailability(e,t,i,a).catch((e=>{if((0,l.zf)(e))throw e;if(n.upsampleTile(r))return this.fetchAvailabilityUpsample(r.level,r.row,r.col,r,a);throw e}))}}},64381:function(e,t,i){i.d(t,{d:function(){return M}});i(44114);var r,l=i(71457),a=i(86039),n=i(3734),s=i(92403),o=i(47966),c=i(44199),h=i(46795),p=i(42079),u=i(71120),f=i(87400),d=i(70864),v=i(4244),y=i(76543),m=(i(37679),i(69292)),_=(i(51020),i(29916)),g=i(79950),w=i(1834),b=i(48119);i(16573),i(78100),i(77936),i(37467),i(44732),i(79577);function S(e,t=!1){return e<=b.tt?t?new Array(e).fill(0):new Array(e):new Uint32Array(e)}class A{constructor(e){this._validateJSON(e);const{location:t,data:i}=e;this.location=Object.freeze((0,w.o8)(t));const r=this.location.width,l=this.location.height;let a=!0,n=!0;const s=Math.ceil(r*l/32),o=S(s);let c=0;for(let h=0;h<i.length;h++){const e=h%32;i[h]?(n=!1,o[c]|=1<<e):a=!1,31===e&&++c}n?(this._availability="unavailable",this.byteSize=40):a?(this._availability="available",this.byteSize=40):(this._availability=o,this.byteSize=40+(0,b.Ek)(o))}getAvailability(e,t){if("unavailable"===this._availability||"available"===this._availability)return this._availability;const i=(e-this.location.top)*this.location.width+(t-this.location.left),r=i%32,l=i>>5,a=this._availability;return l<0||l>a.length?"unknown":a[l]&1<<r?"available":"unavailable"}static fromDefinition(e,t){const i=e.service.request||a["default"],{row:r,col:l,width:n,height:s}=e,c={query:{f:"json"}};return t=t?{...c,...t}:c,i(O(e),t).then((e=>e.data)).catch((e=>{if(e&&e.details&&422===e.details.httpStatus)return{location:{top:r,left:l,width:n,height:s},valid:!0,data:(0,m.dY)(n*s,0)};throw e})).then((e=>{if(e.location&&(e.location.top!==r||e.location.left!==l||e.location.width!==n||e.location.height!==s))throw new o.A("tilemap:location-mismatch","Tilemap response for different location than requested",{response:e,definition:{top:r,left:l,width:n,height:s}});return A.fromJSON(e)}))}static fromJSON(e){return Object.freeze(new A(e))}_validateJSON(e){if(!e||!e.location)throw new o.A("tilemap:missing-location","Location missing from tilemap response");if(!1===e.valid)throw new o.A("tilemap:invalid","Tilemap response was marked as invalid");if(!e.data)throw new o.A("tilemap:missing-data","Data missing from tilemap response");if(!Array.isArray(e.data))throw new o.A("tilemap:data-mismatch","Data must be an array of numbers");if(e.data.length!==e.location.width*e.location.height)throw new o.A("tilemap:data-mismatch","Number of data items does not match width/height of tilemap")}}function T(e){return`${e.level}/${e.row}/${e.col}/${e.width}/${e.height}`}function O(e){let t;if(e.service.tileServers?.length){const i=e.service.tileServers;t=`${i&&i.length?i[e.row%i.length]:e.service.url}/tilemap/${e.level}/${e.row}/${e.col}/${e.width}/${e.height}`}else t=`${e.service.url}/tilemap/${e.level}/${e.row}/${e.col}/${e.width}/${e.height}`;const i=e.service.query;return i&&(t=`${t}?${i}`),t}let M=r=class extends n.A{constructor(e){super(e),this._pendingTilemapRequests={},this.request=a["default"],this.size=32,this._prefetchingEnabled=!0}initialize(){this._tilemapCache=new h.q(2*s.u.MEGABYTES),this.addHandles([(0,f.wB)((()=>{const{layer:e}=this;return[e?.parsedUrl,e?.tileServers,e?.apiKey,e?.customParameters]}),(()=>this._initializeTilemapDefinition()),f.Vh)])}get effectiveMinLOD(){return this.minLOD??this.layer.tileInfo.lods[0].level}get effectiveMaxLOD(){return this.maxLOD??this.layer.tileInfo.lods[this.layer.tileInfo.lods.length-1].level}fetchTilemap(e,t,i,r){if(!this.layer.tileInfo.lodAt(e)||e<this.effectiveMinLOD||e>this.effectiveMaxLOD)return Promise.reject(new o.A("tilemap-cache:level-unavailable",`Level ${e} is unavailable in the service`));const l=this._tmpTilemapDefinition,a=this._tilemapFromCache(e,t,i,l);if(a)return Promise.resolve(a);const n=r&&r.signal;return r={...r,signal:null},new Promise(((e,t)=>{(0,u.u7)(n,(()=>t((0,u.NK)())));const i=T(l);let a=this._pendingTilemapRequests[i];if(!a){a=A.fromDefinition(l,r).then((e=>(this._tilemapCache.put(i,e,e.byteSize),e)));const e=()=>delete this._pendingTilemapRequests[i];this._pendingTilemapRequests[i]=a,a.then(e,e)}a.then(e,t)}))}getAvailability(e,t,i){if(!this.layer.tileInfo.lodAt(e)||e<this.effectiveMinLOD||e>this.effectiveMaxLOD)return"unavailable";const r=this._tilemapFromCache(e,t,i,this._tmpTilemapDefinition);return r?r.getAvailability(t,i):"unknown"}fetchAvailability(e,t,i,r){return!this.layer.tileInfo.lodAt(e)||e<this.effectiveMinLOD||e>this.effectiveMaxLOD?Promise.reject(new o.A("tile-map:tile-unavailable","Tile is not available",{level:e,row:t,col:i})):this.fetchTilemap(e,t,i,r).catch((e=>e)).then((r=>{if(r instanceof A){const l=r.getAvailability(t,i);if("unavailable"===l)throw new o.A("tile-map:tile-unavailable","Tile is not available",{level:e,row:t,col:i});return l}if((0,u.zf)(r))throw r;return"unknown"}))}fetchAvailabilityUpsample(e,t,i,r,l){r.level=e,r.row=t,r.col=i;const a=this.layer.tileInfo;a.updateTileInfo(r);const n=this.fetchAvailability(e,t,i,l).catch((e=>{if((0,u.zf)(e))throw e;if(a.upsampleTile(r))return this.fetchAvailabilityUpsample(r.level,r.row,r.col,r,l);throw e}));return this._fetchAvailabilityUpsamplePrefetch(r.id,e,t,i,l,n),n}async _fetchAvailabilityUpsamplePrefetch(e,t,i,l,a,n){if(!this._prefetchingEnabled||null==e)return;const s=`prefetch-${e}`;if(this.hasHandles(s))return;const o=new AbortController;n.then((()=>o.abort()),(()=>o.abort()));let h=!1;const p=(0,c.hA)((()=>{h||(h=!0,o.abort())}));if(this.addHandles(p,s),await(0,d.md)(10,o.signal).catch((()=>{})),h||(h=!0,this.removeHandles(s)),(0,u.G4)(o))return;const f=new g.U(e,t,i,l),v={...a,signal:o.signal},y=this.layer.tileInfo;for(let c=0;r._prefetches.length<r._maxPrefetch&&y.upsampleTile(f);++c){const e=this.fetchAvailability(f.level,f.row,f.col,v);r._prefetches.push(e);const t=()=>{r._prefetches.removeUnordered(e)};e.then(t,t)}}_initializeTilemapDefinition(){if(!this.layer.parsedUrl)return;const{parsedUrl:e,apiKey:t,customParameters:i}=this.layer;this._tilemapCache.clear(),this._tmpTilemapDefinition={service:{url:e.path,query:(0,v.x0)({...e.query,...i,token:t??e.query?.token}),tileServers:this.layer.tileServers,request:this.request},width:this.size,height:this.size,level:0,row:0,col:0}}_tilemapFromCache(e,t,i,r){r.level=e,r.row=t-t%this.size,r.col=i-i%this.size;const l=T(r);return this._tilemapCache.get(l)}get test(){const e=this;return{get prefetchingEnabled(){return e._prefetchingEnabled},set prefetchingEnabled(t){e._prefetchingEnabled=t},hasTilemap:(t,i,r)=>!!e._tilemapFromCache(t,i,r,e._tmpTilemapDefinition)}}};M._maxPrefetch=4,M._prefetches=new p.A({initialSize:r._maxPrefetch}),(0,l._)([(0,y.MZ)({constructOnly:!0})],M.prototype,"layer",void 0),(0,l._)([(0,y.MZ)({constructOnly:!0})],M.prototype,"minLOD",void 0),(0,l._)([(0,y.MZ)({constructOnly:!0})],M.prototype,"maxLOD",void 0),(0,l._)([(0,y.MZ)({constructOnly:!0})],M.prototype,"request",void 0),(0,l._)([(0,y.MZ)({constructOnly:!0})],M.prototype,"size",void 0),M=r=(0,l._)([(0,_.$)("geoscene.layers.support.TilemapCache")],M)}}]);
//# sourceMappingURL=688.f17bb18c.js.map