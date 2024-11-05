"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[5285],{65285:function(e,t,i){i.r(t),i.d(t,{default:function(){return $}});var a=i(71457),l=i(86039),r=i(47966),s=i(79908),n=i(40912),o=i(71120),h=i(4244),c=i(76543),p=(i(37679),i(69292)),u=(i(51020),i(70681)),d=i(29916),f=i(59411),m=i(71680),v=i(24670),y=i(71260),_=i(25673),w=i(21107),g=i(83256);class b{constructor(e,t,i,a){this._hasNoDataValues=null,this._minValue=null,this._maxValue=null,"pixelData"in e?(this.values=e.pixelData,this.width=e.width,this.height=e.height,this.noDataValue=e.noDataValue):(this.values=e,this.width=t,this.height=i,this.noDataValue=a)}get hasNoDataValues(){if(null==this._hasNoDataValues){const e=this.noDataValue;this._hasNoDataValues=this.values.includes(e)}return this._hasNoDataValues}get minValue(){return this._ensureBounds(),this._minValue}get maxValue(){return this._ensureBounds(),this._maxValue}_ensureBounds(){if(null!=this._minValue)return;const{noDataValue:e,values:t}=this;let i=1/0,a=-1/0,l=!0;for(const r of t)r===e?this._hasNoDataValues=!0:(i=r<i?r:i,a=r>a?r:a,l=!1);l?(this._minValue=0,this._maxValue=0):(this._minValue=i,this._maxValue=a>-3e38?a:0)}}i(44114);var A=i(44199),D=i(15114),T=i(7533);class M{constructor(e,t,i,a,l={}){this._mainMethod=t,this._transferLists=i,this._listeners=[],this._promise=(0,T.ho)(e,{...l,schedule:a}).then((e=>{if(void 0===this._thread){this._thread=e,this._promise=null,l.hasInitialize&&this.broadcast({},"initialize");for(const e of this._listeners)this._connectListener(e)}else e.close()})),this._promise.catch((t=>D.A.getLogger("geoscene.core.workers.WorkerHandle").error(`Failed to initialize ${e} worker: ${t}`)))}on(e,t){const i={removed:!1,eventName:e,callback:t,threadHandle:null};return this._listeners.push(i),this._connectListener(i),(0,A.hA)((()=>{i.removed=!0,(0,p.TF)(this._listeners,i),this._thread&&null!=i.threadHandle&&i.threadHandle.remove()}))}destroy(){this._thread&&(this._thread.close(),this._thread=null),this._promise=null,this._listeners.length=0,this._transferLists={}}invoke(e,t){return this.invokeMethod(this._mainMethod,e,t)}invokeMethod(e,t,i){if(this._thread){const a=this._transferLists[e],l=a?a(t):[];return this._thread.invoke(e,t,{transferList:l,signal:i})}return this._promise?this._promise.then((()=>((0,o.Te)(i),this.invokeMethod(e,t,i)))):Promise.reject(null)}broadcast(e,t){return this._thread?Promise.all(this._thread.broadcast(t,e)).then((()=>{})):this._promise?this._promise.then((()=>this.broadcast(e,t))):Promise.reject()}get promise(){return this._promise}_connectListener(e){this._thread&&this._thread.on(e.eventName,e.callback).then((t=>{e.removed||(e.threadHandle=t)}))}}class O extends M{constructor(e=null){super("LercWorker","_decode",{_decode:e=>[e.buffer]},e,{strategy:"dedicated"}),this.schedule=e,this.ref=0}decode(e,t,i){return e&&0!==e.byteLength?this.invoke({buffer:e,options:t},i):Promise.resolve(null)}release(){--this.ref<=0&&(S.forEach(((e,t)=>{e===this&&S.delete(t)})),this.destroy())}}const S=new Map;function L(e=null){let t=S.get(e);return t||(null!=e?(t=new O((t=>e.immediate.schedule(t))),S.set(e,t)):(t=new O,S.set(null,t))),++t.ref,t}let x=class extends((0,v.f)((0,y.b)((0,_.q)((0,w.A)((0,n.P)(m.A)))))){constructor(...e){super(...e),this.capabilities={operations:{supportsTileMap:!1}},this.copyright=null,this.heightModelInfo=null,this.path=null,this.minScale=void 0,this.maxScale=void 0,this.opacity=1,this.operationalLayerType="ArcGISTiledElevationServiceLayer",this.sourceJSON=null,this.type="elevation",this.url=null,this.version=null,this._lercDecoder=L()}normalizeCtorArgs(e,t){return"string"==typeof e?{url:e,...t}:e}destroy(){this._lercDecoder=(0,s.Gz)(this._lercDecoder)}readCapabilities(e,t){const i=t.capabilities&&t.capabilities.split(",").map((e=>e.toLowerCase().trim()));return i?{operations:{supportsTileMap:i.includes("tilemap")}}:{operations:{supportsTileMap:!1}}}readVersion(e,t){let i=t.currentVersion;return i||(i=9.3),i}load(e){const t=null!=e?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Image Service"],supportsData:!1,validateItem:e=>{for(let t=0;t<e.typeKeywords.length;t++)if("elevation 3d layer"===e.typeKeywords[t].toLowerCase())return!0;throw new r.A("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}' ",{type:"Image Service",expectedType:"Image Service Elevation 3D Layer"})}},e).catch(o.QP).then((()=>this._fetchImageService(t)))),Promise.resolve(this)}fetchTile(e,t,i,a){const r=null!=(a=a||{signal:null}).signal?a.signal:a.signal=(new AbortController).signal,s={responseType:"array-buffer",signal:r},n={noDataValue:a.noDataValue,returnFileInfo:!0};return this.load().then((()=>this._fetchTileAvailability(e,t,i,a))).then((()=>(0,l["default"])(this.getTileUrl(e,t,i),s))).then((e=>this._lercDecoder.decode(e.data,n,r))).then((e=>new b(e)))}getTileUrl(e,t,i){const a=!this.capabilities.operations.supportsTileMap&&this.supportsBlankTile,l=(0,h.x0)({...this.parsedUrl.query,blankTile:!a&&null});return`${this.parsedUrl.path}/tile/${e}/${t}/${i}${l?"?"+l:""}`}async queryElevation(e,t){const{ElevationQuery:a}=await i.e(1042).then(i.bind(i,11042));return(0,o.Te)(t),(new a).query(this,e,t)}async createElevationSampler(e,t){const{ElevationQuery:a}=await i.e(1042).then(i.bind(i,11042));return(0,o.Te)(t),(new a).createSampler(this,e,t)}_fetchTileAvailability(e,t,i,a){return this.tilemapCache?this.tilemapCache.fetchAvailability(e,t,i,a):Promise.resolve("unknown")}async _fetchImageService(e){if(this.sourceJSON)return this.sourceJSON;const t={query:{f:"json",...this.parsedUrl.query},responseType:"json",signal:e},i=await(0,l["default"])(this.parsedUrl.path,t);i.ssl&&(this.url=this.url?.replace(/^http:/i,"https:")),this.sourceJSON=i.data,this.read(i.data,{origin:"service",url:this.parsedUrl})}get hasOverriddenFetchTile(){return!this.fetchTile[I]}};(0,a._)([(0,c.MZ)({readOnly:!0})],x.prototype,"capabilities",void 0),(0,a._)([(0,u.w)("service","capabilities",["capabilities"])],x.prototype,"readCapabilities",null),(0,a._)([(0,c.MZ)({json:{read:{source:"copyrightText"}}})],x.prototype,"copyright",void 0),(0,a._)([(0,c.MZ)({readOnly:!0,type:f.A})],x.prototype,"heightModelInfo",void 0),(0,a._)([(0,c.MZ)({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],x.prototype,"path",void 0),(0,a._)([(0,c.MZ)({type:["show","hide"]})],x.prototype,"listMode",void 0),(0,a._)([(0,c.MZ)({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}},readOnly:!0})],x.prototype,"minScale",void 0),(0,a._)([(0,c.MZ)({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}},readOnly:!0})],x.prototype,"maxScale",void 0),(0,a._)([(0,c.MZ)({json:{read:!1,write:!1,origins:{"web-document":{read:!1,write:!1}}}})],x.prototype,"opacity",void 0),(0,a._)([(0,c.MZ)({type:["ArcGISTiledElevationServiceLayer"]})],x.prototype,"operationalLayerType",void 0),(0,a._)([(0,c.MZ)()],x.prototype,"sourceJSON",void 0),(0,a._)([(0,c.MZ)({json:{read:!1},value:"elevation",readOnly:!0})],x.prototype,"type",void 0),(0,a._)([(0,c.MZ)(g.OZ)],x.prototype,"url",void 0),(0,a._)([(0,c.MZ)()],x.prototype,"version",void 0),(0,a._)([(0,u.w)("version",["currentVersion"])],x.prototype,"readVersion",null),x=(0,a._)([(0,d.$)("geoscene.layers.ElevationLayer")],x);const I=Symbol("default-fetch-tile");x.prototype.fetchTile[I]=!0;const $=x},24670:function(e,t,i){i.d(t,{f:function(){return p}});var a=i(71457),l=(i(2516),i(76543)),r=(i(37679),i(69292),i(51020),i(70681)),s=i(29916),n=i(2889),o=i(46913),h=i(64381),c=i(12790);const p=e=>{let t=class extends e{constructor(){super(...arguments),this.copyright=null,this.minScale=0,this.maxScale=0,this.spatialReference=null,this.tileInfo=null,this.tilemapCache=null}destroy(){this.tilemapCache?.destroy?.()}readMinScale(e,t){return null!=t.minLOD&&null!=t.maxLOD?e:0}readMaxScale(e,t){return null!=t.minLOD&&null!=t.maxLOD?e:0}get supportsBlankTile(){return this.version>=10.2}readTilemapCache(e,t,i){const a=t.capabilities?.includes("Tilemap");let{minLOD:l,maxLOD:r,minScale:s,maxScale:c}=t;if(null==l&&null==r&&0!==s&&0!==c){const e=e=>Math.round(1e4*e)/1e4;s=e(s||t.tileInfo.lods[0].scale),c=e(c||t.tileInfo.lods[t.tileInfo.lods.length-1].scale);for(const i of t.tileInfo.lods){const t=e(i.scale);l=t>=s?i.level:l,r=t>=c?i.level:r}}if(a)return new h.d({layer:this,minLOD:l,maxLOD:r});if(t.tileInfo){const e=new n.A;return e.read(t.tileInfo,i),new o.A(e,l,r)}return null}};return(0,a._)([(0,l.MZ)({json:{read:{source:"copyrightText"}}})],t.prototype,"copyright",void 0),(0,a._)([(0,l.MZ)()],t.prototype,"minScale",void 0),(0,a._)([(0,r.w)("service","minScale")],t.prototype,"readMinScale",null),(0,a._)([(0,l.MZ)()],t.prototype,"maxScale",void 0),(0,a._)([(0,r.w)("service","maxScale")],t.prototype,"readMaxScale",null),(0,a._)([(0,l.MZ)({type:c.A})],t.prototype,"spatialReference",void 0),(0,a._)([(0,l.MZ)({readOnly:!0})],t.prototype,"supportsBlankTile",null),(0,a._)([(0,l.MZ)({type:n.A})],t.prototype,"tileInfo",void 0),(0,a._)([(0,l.MZ)()],t.prototype,"tilemapCache",void 0),(0,a._)([(0,r.w)("service","tilemapCache",["capabilities","tileInfo"])],t.prototype,"readTilemapCache",null),(0,a._)([(0,l.MZ)()],t.prototype,"version",void 0),t=(0,a._)([(0,s.$)("geoscene.layers.mixins.ArcGISCachedService")],t),t}},46913:function(e,t,i){i.d(t,{A:function(){return r}});var a=i(47966),l=i(71120);class r{constructor(e,t=0,i=e.lods.length-1){this.tileInfo=e,this.minLOD=t,this.maxLOD=i}get effectiveMinLOD(){return this.minLOD??this.tileInfo.lods[0].level}get effectiveMaxLOD(){return this.maxLOD??this.tileInfo.lods[this.tileInfo.lods.length-1].level}getAvailability(e,t,i){const a=this.tileInfo?.lodAt(e);return!a||e<this.minLOD||e>this.maxLOD?"unavailable":a.cols&&a.rows?i>=a.cols[0]&&i<=a.cols[1]&&t>=a.rows[0]&&t<=a.rows[1]?"unknown":"unavailable":"unknown"}async fetchAvailability(e,t,i,r){await(0,l.NO)(r);const s=this.getAvailability(e,t,i);if("unavailable"===s)throw new a.A("tile-map:tile-unavailable","Tile is not available",{level:e,row:t,col:i});return s}async fetchAvailabilityUpsample(e,t,i,a,r){await(0,l.NO)(r),a.level=e,a.row=t,a.col=i;const s=this.tileInfo;return s.updateTileInfo(a),this.fetchAvailability(e,t,i,r).catch((e=>{if((0,l.zf)(e))throw e;if(s.upsampleTile(a))return this.fetchAvailabilityUpsample(a.level,a.row,a.col,a,r);throw e}))}}},64381:function(e,t,i){i.d(t,{d:function(){return O}});i(44114);var a,l=i(71457),r=i(86039),s=i(3734),n=i(92403),o=i(47966),h=i(44199),c=i(46795),p=i(42079),u=i(71120),d=i(87400),f=i(70864),m=i(4244),v=i(76543),y=(i(37679),i(69292)),_=(i(51020),i(29916)),w=i(79950),g=i(1834),b=i(48119);i(16573),i(78100),i(77936),i(37467),i(44732),i(79577);function A(e,t=!1){return e<=b.tt?t?new Array(e).fill(0):new Array(e):new Uint32Array(e)}class D{constructor(e){this._validateJSON(e);const{location:t,data:i}=e;this.location=Object.freeze((0,g.o8)(t));const a=this.location.width,l=this.location.height;let r=!0,s=!0;const n=Math.ceil(a*l/32),o=A(n);let h=0;for(let c=0;c<i.length;c++){const e=c%32;i[c]?(s=!1,o[h]|=1<<e):r=!1,31===e&&++h}s?(this._availability="unavailable",this.byteSize=40):r?(this._availability="available",this.byteSize=40):(this._availability=o,this.byteSize=40+(0,b.Ek)(o))}getAvailability(e,t){if("unavailable"===this._availability||"available"===this._availability)return this._availability;const i=(e-this.location.top)*this.location.width+(t-this.location.left),a=i%32,l=i>>5,r=this._availability;return l<0||l>r.length?"unknown":r[l]&1<<a?"available":"unavailable"}static fromDefinition(e,t){const i=e.service.request||r["default"],{row:a,col:l,width:s,height:n}=e,h={query:{f:"json"}};return t=t?{...h,...t}:h,i(M(e),t).then((e=>e.data)).catch((e=>{if(e&&e.details&&422===e.details.httpStatus)return{location:{top:a,left:l,width:s,height:n},valid:!0,data:(0,y.dY)(s*n,0)};throw e})).then((e=>{if(e.location&&(e.location.top!==a||e.location.left!==l||e.location.width!==s||e.location.height!==n))throw new o.A("tilemap:location-mismatch","Tilemap response for different location than requested",{response:e,definition:{top:a,left:l,width:s,height:n}});return D.fromJSON(e)}))}static fromJSON(e){return Object.freeze(new D(e))}_validateJSON(e){if(!e||!e.location)throw new o.A("tilemap:missing-location","Location missing from tilemap response");if(!1===e.valid)throw new o.A("tilemap:invalid","Tilemap response was marked as invalid");if(!e.data)throw new o.A("tilemap:missing-data","Data missing from tilemap response");if(!Array.isArray(e.data))throw new o.A("tilemap:data-mismatch","Data must be an array of numbers");if(e.data.length!==e.location.width*e.location.height)throw new o.A("tilemap:data-mismatch","Number of data items does not match width/height of tilemap")}}function T(e){return`${e.level}/${e.row}/${e.col}/${e.width}/${e.height}`}function M(e){let t;if(e.service.tileServers?.length){const i=e.service.tileServers;t=`${i&&i.length?i[e.row%i.length]:e.service.url}/tilemap/${e.level}/${e.row}/${e.col}/${e.width}/${e.height}`}else t=`${e.service.url}/tilemap/${e.level}/${e.row}/${e.col}/${e.width}/${e.height}`;const i=e.service.query;return i&&(t=`${t}?${i}`),t}let O=a=class extends s.A{constructor(e){super(e),this._pendingTilemapRequests={},this.request=r["default"],this.size=32,this._prefetchingEnabled=!0}initialize(){this._tilemapCache=new c.q(2*n.u.MEGABYTES),this.addHandles([(0,d.wB)((()=>{const{layer:e}=this;return[e?.parsedUrl,e?.tileServers,e?.apiKey,e?.customParameters]}),(()=>this._initializeTilemapDefinition()),d.Vh)])}get effectiveMinLOD(){return this.minLOD??this.layer.tileInfo.lods[0].level}get effectiveMaxLOD(){return this.maxLOD??this.layer.tileInfo.lods[this.layer.tileInfo.lods.length-1].level}fetchTilemap(e,t,i,a){if(!this.layer.tileInfo.lodAt(e)||e<this.effectiveMinLOD||e>this.effectiveMaxLOD)return Promise.reject(new o.A("tilemap-cache:level-unavailable",`Level ${e} is unavailable in the service`));const l=this._tmpTilemapDefinition,r=this._tilemapFromCache(e,t,i,l);if(r)return Promise.resolve(r);const s=a&&a.signal;return a={...a,signal:null},new Promise(((e,t)=>{(0,u.u7)(s,(()=>t((0,u.NK)())));const i=T(l);let r=this._pendingTilemapRequests[i];if(!r){r=D.fromDefinition(l,a).then((e=>(this._tilemapCache.put(i,e,e.byteSize),e)));const e=()=>delete this._pendingTilemapRequests[i];this._pendingTilemapRequests[i]=r,r.then(e,e)}r.then(e,t)}))}getAvailability(e,t,i){if(!this.layer.tileInfo.lodAt(e)||e<this.effectiveMinLOD||e>this.effectiveMaxLOD)return"unavailable";const a=this._tilemapFromCache(e,t,i,this._tmpTilemapDefinition);return a?a.getAvailability(t,i):"unknown"}fetchAvailability(e,t,i,a){return!this.layer.tileInfo.lodAt(e)||e<this.effectiveMinLOD||e>this.effectiveMaxLOD?Promise.reject(new o.A("tile-map:tile-unavailable","Tile is not available",{level:e,row:t,col:i})):this.fetchTilemap(e,t,i,a).catch((e=>e)).then((a=>{if(a instanceof D){const l=a.getAvailability(t,i);if("unavailable"===l)throw new o.A("tile-map:tile-unavailable","Tile is not available",{level:e,row:t,col:i});return l}if((0,u.zf)(a))throw a;return"unknown"}))}fetchAvailabilityUpsample(e,t,i,a,l){a.level=e,a.row=t,a.col=i;const r=this.layer.tileInfo;r.updateTileInfo(a);const s=this.fetchAvailability(e,t,i,l).catch((e=>{if((0,u.zf)(e))throw e;if(r.upsampleTile(a))return this.fetchAvailabilityUpsample(a.level,a.row,a.col,a,l);throw e}));return this._fetchAvailabilityUpsamplePrefetch(a.id,e,t,i,l,s),s}async _fetchAvailabilityUpsamplePrefetch(e,t,i,l,r,s){if(!this._prefetchingEnabled||null==e)return;const n=`prefetch-${e}`;if(this.hasHandles(n))return;const o=new AbortController;s.then((()=>o.abort()),(()=>o.abort()));let c=!1;const p=(0,h.hA)((()=>{c||(c=!0,o.abort())}));if(this.addHandles(p,n),await(0,f.md)(10,o.signal).catch((()=>{})),c||(c=!0,this.removeHandles(n)),(0,u.G4)(o))return;const d=new w.U(e,t,i,l),m={...r,signal:o.signal},v=this.layer.tileInfo;for(let h=0;a._prefetches.length<a._maxPrefetch&&v.upsampleTile(d);++h){const e=this.fetchAvailability(d.level,d.row,d.col,m);a._prefetches.push(e);const t=()=>{a._prefetches.removeUnordered(e)};e.then(t,t)}}_initializeTilemapDefinition(){if(!this.layer.parsedUrl)return;const{parsedUrl:e,apiKey:t,customParameters:i}=this.layer;this._tilemapCache.clear(),this._tmpTilemapDefinition={service:{url:e.path,query:(0,m.x0)({...e.query,...i,token:t??e.query?.token}),tileServers:this.layer.tileServers,request:this.request},width:this.size,height:this.size,level:0,row:0,col:0}}_tilemapFromCache(e,t,i,a){a.level=e,a.row=t-t%this.size,a.col=i-i%this.size;const l=T(a);return this._tilemapCache.get(l)}get test(){const e=this;return{get prefetchingEnabled(){return e._prefetchingEnabled},set prefetchingEnabled(t){e._prefetchingEnabled=t},hasTilemap:(t,i,a)=>!!e._tilemapFromCache(t,i,a,e._tmpTilemapDefinition)}}};O._maxPrefetch=4,O._prefetches=new p.A({initialSize:a._maxPrefetch}),(0,l._)([(0,v.MZ)({constructOnly:!0})],O.prototype,"layer",void 0),(0,l._)([(0,v.MZ)({constructOnly:!0})],O.prototype,"minLOD",void 0),(0,l._)([(0,v.MZ)({constructOnly:!0})],O.prototype,"maxLOD",void 0),(0,l._)([(0,v.MZ)({constructOnly:!0})],O.prototype,"request",void 0),(0,l._)([(0,v.MZ)({constructOnly:!0})],O.prototype,"size",void 0),O=a=(0,l._)([(0,_.$)("geoscene.layers.support.TilemapCache")],O)}}]);
//# sourceMappingURL=5285.6adc4127.js.map