"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[3495],{2262:function(e,t,r){r.d(t,{A:function(){return E}});r(44114);var i=r(71457),s=r(3734),a=r(47966),o=r(51020),n=r(71120),l=r(4244),u=r(76543),y=(r(37679),r(69292),r(29916)),p=r(15433),d=r(46553),c=r(42116),f=r(45443),h=(r(2516),r(39321)),b=r(81809),m=r(41759);async function g(e,t,r){const i=(0,c.Dl)(e);return(0,h.Jf)(i,b.A.from(t),{...r}).then((e=>({count:e.data.count,extent:m.A.fromJSON(e.data.extent)})))}var S=r(52578),I=r(14611),v=r(45819),w=r(84619);let _=class extends s.A{constructor(e){super(e),this.dynamicDataSource=null,this.fieldsIndex=null,this.gdbVersion=null,this.infoFor3D=null,this.pbfSupported=!1,this.queryAttachmentsSupported=!1,this.sourceSpatialReference=null,this.url=null}get parsedUrl(){return(0,l.An)(this.url)}async execute(e,t){const r=await this.executeJSON(e,t);return this.featureSetFromJSON(e,r,t)}async executeJSON(e,t){const r=this._normalizeQuery(e),i=null!=e.outStatistics?.[0],s=(0,o.A)("featurelayer-pbf-statistics"),a=!i||s;let n;if(this.pbfSupported&&a)try{n=await(0,v.S)(this.url,r,t)}catch(l){if("query:parsing-pbf"!==l.name)throw l;this.pbfSupported=!1}return this.pbfSupported&&a||(n=await(0,I.e)(this.url,r,t)),this._normalizeFields(n.fields),n}async featureSetFromJSON(e,t,i){if(!this._queryIs3DObjectFormat(e)||null==this.infoFor3D||!t.features)return w.A.fromJSON(t);const{meshFeatureSetFromJSON:s}=await(0,n.qr)(Promise.all([r.e(4050),r.e(5762),r.e(1752)]).then(r.bind(r,55474)),i);return s(e,this.infoFor3D,t)}executeForCount(e,t){return(0,f.I)(this.url,this._normalizeQuery(e),t)}executeForExtent(e,t){return g(this.url,this._normalizeQuery(e),t)}executeForIds(e,t){return(0,S.V)(this.url,this._normalizeQuery(e),t)}async executeRelationshipQuery(e,t){const[{default:i},{executeRelationshipQuery:s}]=await(0,n.qr)(Promise.all([Promise.resolve().then(r.bind(r,83427)),r.e(3228).then(r.bind(r,73228))]),t);return e=i.from(e),(this.gdbVersion||this.dynamicDataSource)&&((e=e.clone()).gdbVersion=e.gdbVersion||this.gdbVersion,e.dynamicDataSource=e.dynamicDataSource||this.dynamicDataSource),s(this.url,e,t)}async executeRelationshipQueryForCount(e,t){const[{default:i},{executeRelationshipQueryForCount:s}]=await(0,n.qr)(Promise.all([Promise.resolve().then(r.bind(r,83427)),r.e(3228).then(r.bind(r,73228))]),t);return e=i.from(e),(this.gdbVersion||this.dynamicDataSource)&&((e=e.clone()).gdbVersion=e.gdbVersion||this.gdbVersion,e.dynamicDataSource=e.dynamicDataSource||this.dynamicDataSource),s(this.url,e,t)}async executeAttachmentQuery(e,t){const{executeAttachmentQuery:i,fetchAttachments:s,processAttachmentQueryResult:a}=await(0,n.qr)(r.e(6063).then(r.bind(r,36063)),t),o=(0,c.Dl)(this.url);return a(o,await(this.queryAttachmentsSupported?i(o,e,t):s(o,e,t)))}async executeTopFeaturesQuery(e,t){const{executeTopFeaturesQuery:i}=await(0,n.qr)(r.e(7469).then(r.bind(r,67469)),t);return i(this.parsedUrl,e,this.sourceSpatialReference,t)}async executeForTopIds(e,t){const{executeForTopIds:i}=await(0,n.qr)(r.e(2217).then(r.bind(r,12217)),t);return i(this.parsedUrl,e,t)}async executeForTopExtents(e,t){const{executeForTopExtents:i}=await(0,n.qr)(r.e(9310).then(r.bind(r,39310)),t);return i(this.parsedUrl,e,t)}async executeForTopCount(e,t){const{executeForTopCount:i}=await(0,n.qr)(r.e(3288).then(r.bind(r,83288)),t);return i(this.parsedUrl,e,t)}_normalizeQuery(e){let t=b.A.from(e);t.sourceSpatialReference=t.sourceSpatialReference||this.sourceSpatialReference,(this.gdbVersion||this.dynamicDataSource)&&(t=t===e?t.clone():t,t.gdbVersion=e.gdbVersion||this.gdbVersion,t.dynamicDataSource=e.dynamicDataSource?d.L.from(e.dynamicDataSource):this.dynamicDataSource);const{infoFor3D:r}=this;if(null!=r&&this._queryIs3DObjectFormat(e)){t=t===e?t.clone():t,t.formatOf3DObjects=null;const{supportedFormats:i,queryFormats:s}=r,o=(0,p.R_)("model/gltf-binary",i)??(0,p.E1)("glb",i),n=(0,p.R_)("model/gltf+json",i)??(0,p.E1)("gtlf",i);for(const e of s){if(e===o){t.formatOf3DObjects=e;break}e!==n||t.formatOf3DObjects||(t.formatOf3DObjects=e)}if(!t.formatOf3DObjects)throw new a.A("query:unsupported-3d-query-formats","Could not find any supported 3D object query format. Only supported formats are 3D_glb and 3D_gltf");if(null==t.outFields||!t.outFields.includes("*")){t=t===e?t.clone():t,null==t.outFields&&(t.outFields=[]);const{originX:i,originY:s,originZ:a,translationX:o,translationY:n,translationZ:l,scaleX:u,scaleY:y,scaleZ:p,rotationX:d,rotationY:c,rotationZ:f,rotationDeg:h}=r.transformFieldRoles;t.outFields.push(i,s,a,o,n,l,u,y,p,d,c,f,h)}}return t}_normalizeFields(e){if(null!=this.fieldsIndex&&null!=e)for(const t of e){const e=this.fieldsIndex.get(t.name);e&&Object.assign(t,e.toJSON())}}_queryIs3DObjectFormat(e){return null!=this.infoFor3D&&!0===e.returnGeometry&&"xyFootprint"!==e.multipatchOption&&!e.outStatistics}};(0,i._)([(0,u.MZ)({type:d.L})],_.prototype,"dynamicDataSource",void 0),(0,i._)([(0,u.MZ)()],_.prototype,"fieldsIndex",void 0),(0,i._)([(0,u.MZ)()],_.prototype,"gdbVersion",void 0),(0,i._)([(0,u.MZ)()],_.prototype,"infoFor3D",void 0),(0,i._)([(0,u.MZ)({readOnly:!0})],_.prototype,"parsedUrl",null),(0,i._)([(0,u.MZ)()],_.prototype,"pbfSupported",void 0),(0,i._)([(0,u.MZ)()],_.prototype,"queryAttachmentsSupported",void 0),(0,i._)([(0,u.MZ)()],_.prototype,"sourceSpatialReference",void 0),(0,i._)([(0,u.MZ)({type:String})],_.prototype,"url",void 0),_=(0,i._)([(0,y.$)("geoscene.tasks.QueryTask")],_);const E=_},76706:function(e,t,r){r.d(t,{V:function(){return g}});var i=r(71457),s=r(86039),a=r(16225),o=r(71120),n=r(4244),l=r(39752),u=r(76543),y=(r(37679),r(69292),r(51020),r(70681)),p=r(29916),d=r(27014),c=r(41759),f=r(12790),h=r(75122),b=r(83256),m=r(58131);const g=e=>{let t=class extends e{constructor(){super(...arguments),this.capabilities=void 0,this.copyright=null,this.fullExtent=null,this.legendEnabled=!0,this.spatialReference=null,this.version=void 0,this._allLayersAndTablesMap=null}readCapabilities(e,t){const r=t.capabilities&&t.capabilities.split(",").map((e=>e.toLowerCase().trim()));if(!r)return{operations:{supportsExportMap:!1,supportsExportTiles:!1,supportsIdentify:!1,supportsQuery:!1,supportsTileMap:!1},exportMap:null,exportTiles:null};const i=this.type,s="tile"!==i&&!!t.supportsDynamicLayers,a=r.includes("query"),o=r.includes("map"),n=!!t.exportTilesAllowed,u=r.includes("tilemap"),y=r.includes("data"),p="tile"!==i&&(!t.tileInfo||s),d="tile"!==i&&(!t.tileInfo||s),c="tile"!==i,f=t.cimVersion&&l.R.parse(t.cimVersion),h=f?.since(1,4)??!1,b=f?.since(2,0)??!1;return{operations:{supportsExportMap:o,supportsExportTiles:n,supportsIdentify:a,supportsQuery:y,supportsTileMap:u},exportMap:o?{supportsArcadeExpressionForLabeling:h,supportsSublayersChanges:c,supportsDynamicLayers:s,supportsSublayerVisibility:p,supportsSublayerDefinitionExpression:d,supportsCIMSymbols:b}:null,exportTiles:n?{maxExportTilesCount:+t.maxExportTilesCount}:null}}readVersion(e,t){let r=t.currentVersion;return r||(r=t.hasOwnProperty("capabilities")||t.hasOwnProperty("tables")?10:t.hasOwnProperty("supportedImageFormatTypes")?9.31:9.3),r}async fetchRelatedService(e){const t=this.portalItem;if(!t||!(0,m.bK)(t))return null;this._relatedFeatureServicePromise||(this._relatedFeatureServicePromise=t.fetchRelatedItems({relationshipType:"Service2Service",direction:"reverse"},e).then((e=>e.find((e=>"Feature Service"===e.type))??null),(()=>null)));const r=await this._relatedFeatureServicePromise;return(0,o.Te)(e),r?{itemId:r.id,url:r.url}:null}async fetchSublayerInfo(e,t){const{source:r}=e;if(this?.portalItem&&"tile"===this.type&&"map-layer"===r?.type&&(0,m.bK)(this.portalItem)&&e.originIdOf("url")<d.Gr.SERVICE){const i=await this.fetchRelatedService(t);i&&(e.url=(0,n.fj)(i.url,r.mapLayerId.toString()),e.layerItemId=i.itemId)}const{url:i}=e;let a;if("data-layer"===r.type)a=(await(0,s["default"])(i,{responseType:"json",query:{f:"json",...this.customParameters,token:this.apiKey},...t})).data;else if(i&&e.originIdOf("url")>d.Gr.SERVICE)try{a=(await this._fetchAllLayersAndTablesFromService(i)).get(r.mapLayerId)}catch{}else{let i=e.id;"map-layer"===r?.type&&(i=r.mapLayerId);try{a=(await this.fetchAllLayersAndTables(t)).get(i)}catch{}}return a}async fetchAllLayersAndTables(e){return this._fetchAllLayersAndTablesFromService(this.parsedUrl?.path,e)}async _fetchAllLayersAndTablesFromService(e,t){await this.load(t),this._allLayersAndTablesMap||=new Map;const r=(0,h.qg)(e),i=(0,a.tE)(this._allLayersAndTablesMap,r?.url.path,(()=>(0,s["default"])((0,n.fj)(r?.url.path,"/layers"),{responseType:"json",query:{f:"json",...this.customParameters,token:this.apiKey}}).then((e=>{const t=new Map;for(const r of e.data.layers)t.set(r.id,r);return{result:t}}),(e=>({error:e}))))),l=await i;if((0,o.Te)(t),"result"in l)return l.result;throw l.error}};return(0,i._)([(0,u.MZ)({readOnly:!0})],t.prototype,"capabilities",void 0),(0,i._)([(0,y.w)("service","capabilities",["capabilities","exportTilesAllowed","maxExportTilesCount","supportsDynamicLayers","tileInfo"])],t.prototype,"readCapabilities",null),(0,i._)([(0,u.MZ)({json:{read:{source:"copyrightText"}}})],t.prototype,"copyright",void 0),(0,i._)([(0,u.MZ)({type:c.A})],t.prototype,"fullExtent",void 0),(0,i._)([(0,u.MZ)(b.id)],t.prototype,"id",void 0),(0,i._)([(0,u.MZ)({type:Boolean,json:{origins:{service:{read:{enabled:!1}}},read:{source:"showLegend"},write:{target:"showLegend"}}})],t.prototype,"legendEnabled",void 0),(0,i._)([(0,u.MZ)(b.M6)],t.prototype,"popupEnabled",void 0),(0,i._)([(0,u.MZ)({type:f.A})],t.prototype,"spatialReference",void 0),(0,i._)([(0,u.MZ)({readOnly:!0})],t.prototype,"version",void 0),(0,i._)([(0,y.w)("version",["currentVersion","capabilities","tables","supportedImageFormatTypes"])],t.prototype,"readVersion",null),t=(0,i._)([(0,p.$)("geoscene.layers.mixins.ArcGISMapService")],t),t}},1133:function(e,t,r){r.d(t,{I:function(){return S}});r(17642),r(58004),r(33853),r(45876),r(32475),r(15024),r(31698);var i=r(71457),s=r(41879),a=r(80941),o=r(47966),n=r(15114),l=r(87400),u=r(76543),y=(r(37679),r(69292),r(51020),r(46528)),p=r(29916),d=r(27014),c=r(26550),f=r(12809);const h=n.A.getLogger("geoscene.layers.TileLayer");function b(e,t){const r=[],i={};return e?(e.forEach((e=>{const s=new c.A;if(s.read(e,t),i[s.id]=s,null!=e.parentLayerId&&-1!==e.parentLayerId){const t=i[e.parentLayerId];t.sublayers||(t.sublayers=[]),t.sublayers.unshift(s)}else r.unshift(s)})),r):r}const m=s.A.ofType(c.A);function g(e,t){e&&e.forEach((e=>{t(e),e.sublayers&&e.sublayers.length&&g(e.sublayers,t)}))}const S=e=>{let t=class extends e{constructor(...e){super(...e),this.allSublayers=new a.A({getCollections:()=>[this.sublayers],getChildrenFunction:e=>e.sublayers}),this.sublayersSourceJSON={[d.Gr.SERVICE]:{},[d.Gr.PORTAL_ITEM]:{},[d.Gr.WEB_SCENE]:{},[d.Gr.WEB_MAP]:{}},this.addHandles((0,l.wB)((()=>this.sublayers),((e,t)=>this._handleSublayersChange(e,t)),l.OH))}destroy(){this.allSublayers.destroy()}readSublayers(e,t){if(!t||!e)return;const{sublayersSourceJSON:r}=this,i=(0,d.aB)(t.origin);if(i<d.Gr.SERVICE)return;if(r[i]={context:t,visibleLayers:e.visibleLayers||r[i].visibleLayers,layers:e.layers||r[i].layers},i>d.Gr.SERVICE)return;this._set("serviceSublayers",this.createSublayersForOrigin("service").sublayers);const{sublayers:s,origin:a}=this.createSublayersForOrigin("web-document"),o=(0,y.oY)(this);o.setDefaultOrigin(a),this._set("sublayers",new m(s)),o.setDefaultOrigin("user")}findSublayerById(e){return this.allSublayers.find((t=>t.id===e))}createServiceSublayers(){return this.createSublayersForOrigin("service").sublayers}createSublayersForOrigin(e){const t=(0,d.aB)("web-document"===e?"web-map":e);let r=d.Gr.SERVICE,i=this.sublayersSourceJSON[d.Gr.SERVICE].layers,s=this.sublayersSourceJSON[d.Gr.SERVICE].context,a=null;const o=[d.Gr.PORTAL_ITEM,d.Gr.WEB_SCENE,d.Gr.WEB_MAP].filter((e=>e<=t));for(const d of o){const e=this.sublayersSourceJSON[d];(0,f._X)(e.layers)&&(r=d,i=e.layers,s=e.context,e.visibleLayers&&(a={visibleLayers:e.visibleLayers,context:e.context}))}const n=[d.Gr.PORTAL_ITEM,d.Gr.WEB_SCENE,d.Gr.WEB_MAP].filter((e=>e>r&&e<=t));let l=null;for(const d of n){const{layers:e,visibleLayers:t,context:r}=this.sublayersSourceJSON[d];e&&(l={layers:e,context:r}),t&&(a={visibleLayers:t,context:r})}const u=b(i,s),y=new Map,p=new Set;if(l)for(const d of l.layers)y.set(d.id,d);if(a?.visibleLayers)for(const d of a.visibleLayers)p.add(d);return g(u,(e=>{l&&e.read(y.get(e.id),l.context),a&&e.read({defaultVisibility:p.has(e.id)},a.context)})),{origin:(0,d.OL)(r),sublayers:new m({items:u})}}read(e,t){super.read(e,t),this.readSublayers(e,t)}_handleSublayersChange(e,t){t&&(t.forEach((e=>{e.parent=null,e.layer=null})),this.removeHandles("sublayers-owner")),e&&(e.forEach((e=>{e.parent=this,e.layer=this})),this.addHandles([e.on("after-add",(({item:e})=>{e.parent=this,e.layer=this})),e.on("after-remove",(({item:e})=>{e.parent=null,e.layer=null}))],"sublayers-owner"),"tile"===this.type&&this.addHandles(e.on("before-changes",(e=>{h.error(new o.A("tilelayer:sublayers-non-modifiable","ISublayer can't be added, moved, or removed from the layer's sublayers",{layer:this})),e.preventDefault()})),"sublayers-owner"))}};return(0,i._)([(0,u.MZ)({readOnly:!0})],t.prototype,"allSublayers",void 0),(0,i._)([(0,u.MZ)({readOnly:!0,type:s.A.ofType(c.A)})],t.prototype,"serviceSublayers",void 0),(0,i._)([(0,u.MZ)({value:null,type:m,json:{read:!1,write:{allowNull:!0,ignoreOrigin:!0}}})],t.prototype,"sublayers",void 0),(0,i._)([(0,u.MZ)({readOnly:!0})],t.prototype,"sublayersSourceJSON",void 0),t=(0,i._)([(0,p.$)("geoscene.layers.mixins.SublayersOwner")],t),t}},26550:function(e,t,r){r.d(t,{A:function(){return Y}});r(17642),r(58004),r(33853),r(45876),r(32475),r(15024),r(31698);var i,s=r(71457),a=(r(2516),r(3035)),o=(r(22070),r(118),r(92223),r(65907),r(71824),r(2882),r(65092),r(44829),r(11066),r(23928)),n=r(86039),l=r(85092),u=r(41879),y=r(47966),p=r(45477),d=r(51020),c=r(49778),f=r(1834),h=r(71926),b=r(15114),m=r(40912),g=r(2256),S=r(4244),I=r(76543),v=r(22113),w=r(70681),_=r(29916),E=r(51253),A=r(37679),x=r(27014),O=r(46528),D=r(2262),F=r(82571),L=r(81937),M=r(27678),T=r(23540),P=r(9259),V=r(10900),j=r(35771),Z=r(46553),C=r(46505),q=r(20254),N=r(81809),R=r(55823),G=r(41759),k=r(11894);function Q(e){return null!=e&&"esriSMS"===e.type}function U(e,t,r){const i=this.originIdOf(t)>=(0,x.aB)(r.origin);return{ignoreOrigin:!0,allowNull:i,enabled:!!r&&"map-image"===r.layer?.type&&(r.writeSublayerStructure||i)}}function B(e,t,r){return{enabled:!!r&&"tile"===r.layer?.type&&(r.origin&&this.originIdOf(t)>=(0,x.aB)(r.origin)||this._isOverridden(t))}}function J(e,t,r){return{ignoreOrigin:!0,enabled:r&&r.writeSublayerStructure||!1}}function $(e,t,r){return{ignoreOrigin:!0,enabled:!!r&&(r.writeSublayerStructure||this.originIdOf(t)>=(0,x.aB)(r.origin))}}let z=0;const K=new Set;K.add("layer"),K.add("parent"),K.add("loaded"),K.add("loadStatus"),K.add("loadError"),K.add("loadWarnings");let X=i=class extends((0,p.$)((0,m.P)((0,c.sA)(h.A)))){constructor(e){super(e),this.capabilities=void 0,this.fields=null,this.fullExtent=null,this.geometryType=null,this.globalIdField=null,this.legendEnabled=!0,this.objectIdField=null,this.parent=null,this.popupEnabled=!0,this.popupTemplate=null,this.sourceJSON=null,this.title=null,this.typeIdField=null,this.types=null,this._lastParsedUrl=null}async load(e){return this.addResolvingPromise((async()=>{const{layer:t,url:r}=this;if(!t&&!r)throw new y.A("sublayer:missing-layer","Sublayer can't be loaded without being part of a layer",{sublayer:this});const i=t?await t.fetchSublayerInfo(this,e):(await(0,n["default"])(r,{responseType:"json",query:{f:"json"},...e})).data;i&&(this.sourceJSON=i,this.read({layerDefinition:i},{origin:"service"}))})()),this}readCapabilities(e,t){t=t.layerDefinition||t;const{operations:{supportsQuery:r,supportsQueryAttachments:i},query:{supportsFormatPBF:s},data:{supportsAttachment:a}}=(0,j.S)(t,this.url);return{exportMap:{supportsModification:!!t.canModifyLayer},operations:{supportsQuery:r,supportsQueryAttachments:i},data:{supportsAttachment:a},query:{supportsFormatPBF:s}}}get defaultPopupTemplate(){return this.createPopupTemplate()}set definitionExpression(e){this._setAndNotifyLayer("definitionExpression",e)}get effectiveScaleRange(){const{minScale:e,maxScale:t}=this;return{minScale:e,maxScale:t}}get fieldsIndex(){return new M.A(this.fields||[])}set floorInfo(e){this._setAndNotifyLayer("floorInfo",e)}readGlobalIdFieldFromService(e,t){if((t=t.layerDefinition||t).globalIdField)return t.globalIdField;if(t.fields)for(const r of t.fields)if("esriFieldTypeGlobalID"===r.type)return r.name}get id(){const e=this._get("id");return e??z++}set id(e){this._get("id")!==e&&(!1!==this.layer?.capabilities?.exportMap?.supportsDynamicLayers?this._set("id",e):this._logLockedError("id","capability not available 'layer.capabilities.exportMap.supportsDynamicLayers'"))}set labelingInfo(e){this._setAndNotifyLayer("labelingInfo",e)}writeLabelingInfo(e,t,r,i){e&&e.length&&(t.layerDefinition={drawingInfo:{labelingInfo:e.map((e=>e.write({},i)))}})}set labelsVisible(e){this._setAndNotifyLayer("labelsVisible",e)}set layer(e){this._set("layer",e),this.sublayers&&this.sublayers.forEach((t=>t.layer=e))}set listMode(e){this._set("listMode",e)}set minScale(e){this._setAndNotifyLayer("minScale",e)}readMinScale(e,t){return t.minScale||t.layerDefinition&&t.layerDefinition.minScale||0}set maxScale(e){this._setAndNotifyLayer("maxScale",e)}readMaxScale(e,t){return t.maxScale||t.layerDefinition&&t.layerDefinition.maxScale||0}readObjectIdFieldFromService(e,t){if((t=t.layerDefinition||t).objectIdField)return t.objectIdField;if(t.fields)for(const r of t.fields)if("esriFieldTypeOID"===r.type)return r.name}set opacity(e){this._setAndNotifyLayer("opacity",e)}readOpacity(e,t){const r=t.layerDefinition;return 1-.01*((null!=r?.transparency?r.transparency:r?.drawingInfo?.transparency)??0)}writeOpacity(e,t,r,i){t.layerDefinition={drawingInfo:{transparency:100-100*e}}}writeParent(e,t){this.parent&&this.parent!==this.layer?t.parentLayerId=(0,A.Vr)(this.parent.id):t.parentLayerId=-1}get queryTask(){if(!this.layer)return null;const{spatialReference:e}=this.layer,t="gdbVersion"in this.layer?this.layer.gdbVersion:void 0,{capabilities:r,fieldsIndex:i}=this,s=(0,d.A)("featurelayer-pbf")&&r?.query.supportsFormatPBF,a=r?.operations?.supportsQueryAttachments??!1;return new D.A({url:this.url,pbfSupported:s,fieldsIndex:i,gdbVersion:t,sourceSpatialReference:e,queryAttachmentsSupported:a})}set renderer(e){if(e)for(const t of e.getSymbols())if((0,l.wk)(t)){b.A.getLogger(this).warn("Sublayer renderer should use 2D symbols");break}this._setAndNotifyLayer("renderer",e)}get source(){return this._get("source")||new C.f({mapLayerId:this.id})}set source(e){this._setAndNotifyLayer("source",e)}set sublayers(e){this._handleSublayersChange(e,this._get("sublayers")),this._set("sublayers",e)}castSublayers(e){return(0,A.dp)(u.A.ofType(i),e)}writeSublayers(e,t,r){this.sublayers?.length&&(t[r]=this.sublayers.map((e=>e.id)).toArray().reverse())}readTypeIdField(e,t){let r=(t=t.layerDefinition||t).typeIdField;if(r&&t.fields){r=r.toLowerCase();const e=t.fields.find((e=>e.name.toLowerCase()===r));e&&(r=e.name)}return r}get url(){const e=this.layer?.parsedUrl??this._lastParsedUrl,t=this.source;if(!e)return null;if(this._lastParsedUrl=e,"map-layer"===t?.type)return`${e.path}/${t.mapLayerId}`;const r={layer:JSON.stringify({source:this.source})};return`${e.path}/dynamicLayer?${(0,S.x0)(r)}`}set url(e){this._overrideIfSome("url",e)}set visible(e){this._setAndNotifyLayer("visible",e)}writeVisible(e,t,r,i){t[r]=this.getAtOrigin("defaultVisibility","service")||e}clone(){const{store:e}=(0,O.oY)(this),t=new i;return(0,O.oY)(t).store=e.clone(K),this.commitProperty("url"),t._lastParsedUrl=this._lastParsedUrl,t}createPopupTemplate(e){return(0,R.tn)(this,e)}createQuery(){return new N.A({returnGeometry:!0,where:this.definitionExpression||"1=1"})}async createFeatureLayer(){if(this.hasOwnProperty("sublayers"))return null;const{layer:e}=this,t=e?.parsedUrl,i=new(0,(await Promise.resolve().then(r.bind(r,3949))).default)({url:t?.path});return t&&this.source&&("map-layer"===this.source.type?i.layerId=this.source.mapLayerId:i.dynamicDataSource=this.source),null!=e?.refreshInterval&&(i.refreshInterval=e.refreshInterval),this.definitionExpression&&(i.definitionExpression=this.definitionExpression),this.floorInfo&&(i.floorInfo=(0,f.o8)(this.floorInfo)),this.originIdOf("labelingInfo")>x.Gr.SERVICE&&(i.labelingInfo=(0,f.o8)(this.labelingInfo)),this.originIdOf("labelsVisible")>x.Gr.DEFAULTS&&(i.labelsVisible=this.labelsVisible),this.originIdOf("legendEnabled")>x.Gr.DEFAULTS&&(i.legendEnabled=this.legendEnabled),this.originIdOf("visible")>x.Gr.DEFAULTS&&(i.visible=this.visible),this.originIdOf("minScale")>x.Gr.DEFAULTS&&(i.minScale=this.minScale),this.originIdOf("maxScale")>x.Gr.DEFAULTS&&(i.maxScale=this.maxScale),this.originIdOf("opacity")>x.Gr.DEFAULTS&&(i.opacity=this.opacity),this.originIdOf("popupTemplate")>x.Gr.DEFAULTS&&(i.popupTemplate=(0,f.o8)(this.popupTemplate)),this.originIdOf("renderer")>x.Gr.SERVICE&&(i.renderer=(0,f.o8)(this.renderer)),"data-layer"===this.source?.type&&(i.dynamicDataSource=this.source.clone()),this.originIdOf("title")>x.Gr.DEFAULTS&&(i.title=this.title),"map-image"===e?.type&&e.originIdOf("customParameters")>x.Gr.DEFAULTS&&(i.customParameters=e.customParameters),"tile"===e?.type&&e.originIdOf("customParameters")>x.Gr.DEFAULTS&&(i.customParameters=e.customParameters),i}getField(e){return this.fieldsIndex.get(e)}getFeatureType(e){const{typeIdField:t,types:r}=this;if(!t||!e)return null;const i=e.attributes?e.attributes[t]:void 0;if(null==i)return null;let s=null;return r?.some((e=>{const{id:t}=e;return null!=t&&(t.toString()===i.toString()&&(s=e),!!s)})),s}getFieldDomain(e,t){const r=t&&t.feature,i=this.getFeatureType(r);if(i){const t=i.domains&&i.domains[e];if(t&&"inherited"!==t.type)return t}return this._getLayerDomain(e)}async queryAttachments(e,t){await this.load(),e=q.A.from(e);const r=this.capabilities;if(!r?.data?.supportsAttachment)throw new y.A("queryAttachments:not-supported","this layer doesn't support attachments");const{attachmentTypes:i,objectIds:s,globalIds:a,num:o,size:n,start:l,where:u}=e;if(!r?.operations?.supportsQueryAttachments&&(i?.length>0||a?.length>0||n?.length>0||o||l||u))throw new y.A("queryAttachments:option-not-supported","when 'capabilities.operations.supportsQueryAttachments' is false, only objectIds is supported",e);if(!(s?.length||a?.length||u))throw new y.A("queryAttachments:invalid-query","'objectIds', 'globalIds', or 'where' are required to perform attachment query",e);return this.queryTask.executeAttachmentQuery(e,t)}async queryFeatures(e=this.createQuery(),t){if(await this.load(),!this.capabilities.operations.supportsQuery)throw new y.A("queryFeatures:not-supported","this layer doesn't support queries.");if(!this.url)throw new y.A("queryFeatures:not-supported","this layer has no url.");const r=await this.queryTask.execute(e,{...t,query:{...this.layer?.customParameters,token:this.layer?.apiKey}});if(r?.features)for(const i of r.features)i.sourceLayer=this;return r}toExportImageJSON(e){const t={id:this.id,source:this.source?.toJSON()||{mapLayerId:this.id,type:"mapLayer"}},r=(0,g.m)(e,this.definitionExpression);null!=r&&(t.definitionExpression=r);const i=["renderer","labelingInfo","opacity","labelsVisible"].reduce(((e,t)=>(e[t]=this.originIdOf(t),e)),{}),s=Object.keys(i).some((e=>i[e]>x.Gr.SERVICE));if(s){const e=t.drawingInfo={};if(i.renderer>x.Gr.SERVICE&&(e.renderer=this.renderer?this.renderer.toJSON():null),i.labelsVisible>x.Gr.SERVICE&&(e.showLabels=this.labelsVisible),this.labelsVisible&&i.labelingInfo>x.Gr.SERVICE){!this.loaded&&this.labelingInfo.some((e=>!e.labelPlacement))&&b.A.getLogger(this).warnOnce(`A Sublayer (title: ${this.title}, id: ${this.id}) has an undefined 'labelPlacement' and so labels cannot be displayed. Either define a valid 'labelPlacement' or call Sublayer.load() to use a default value based on geometry type.`,{sublayer:this});let t=this.labelingInfo;null!=this.geometryType&&(t=(0,P.z)(this.labelingInfo,k.g.toJSON(this.geometryType))),e.labelingInfo=t.filter((e=>e.labelPlacement)).map((e=>e.toJSON({origin:"service",layer:this.layer}))),e.showLabels=!0}i.opacity>x.Gr.SERVICE&&(e.transparency=100-100*this.opacity),this._assignDefaultSymbolColors(e.renderer)}return t}_assignDefaultSymbolColors(e){this._forEachSimpleMarkerSymbols(e,(e=>{e.color||"esriSMSX"!==e.style&&"esriSMSCross"!==e.style||(e.outline&&e.outline.color?e.color=e.outline.color:e.color=[0,0,0,0])}))}_forEachSimpleMarkerSymbols(e,t){if(e){const r=("uniqueValueInfos"in e?e.uniqueValueInfos:"classBreakInfos"in e?e.classBreakInfos:null)??[];for(const e of r)Q(e.symbol)&&t(e.symbol);"symbol"in e&&Q(e.symbol)&&t(e.symbol),"defaultSymbol"in e&&Q(e.defaultSymbol)&&t(e.defaultSymbol)}}_setAndNotifyLayer(e,t){const r=this.layer,i=this._get(e);let s,a;switch(e){case"definitionExpression":case"floorInfo":s="supportsSublayerDefinitionExpression";break;case"minScale":case"maxScale":case"visible":s="supportsSublayerVisibility";break;case"labelingInfo":case"labelsVisible":case"opacity":case"renderer":case"source":s="supportsDynamicLayers",a="supportsModification"}const o=(0,O.oY)(this).getDefaultOrigin();if("service"!==o){if(s&&!1===this.layer?.capabilities?.exportMap?.[s])return void this._logLockedError(e,`capability not available 'layer.capabilities.exportMap.${s}'`);if(a&&!1===this.capabilities?.exportMap[a])return void this._logLockedError(e,`capability not available 'capabilities.exportMap.${a}'`)}"source"!==e||"not-loaded"===this.loadStatus?(this._set(e,t),"service"!==o&&i!==t&&r&&r.emit&&r.emit("sublayer-update",{propertyName:e,target:this})):this._logLockedError(e,"'source' can't be changed after calling sublayer.load()")}_handleSublayersChange(e,t){t&&(t.forEach((e=>{e.parent=null,e.layer=null})),this.handles.removeAll()),e&&(e.forEach((e=>{e.parent=this,e.layer=this.layer})),this.handles.add([e.on("after-add",(({item:e})=>{e.parent=this,e.layer=this.layer})),e.on("after-remove",(({item:e})=>{e.parent=null,e.layer=null})),e.on("before-changes",(e=>{const t=this.layer?.capabilities?.exportMap?.supportsSublayersChanges;null==t||t||(b.A.getLogger(this).error(new y.A("sublayer:sublayers-non-modifiable","Sublayer can't be added, moved, or removed from the layer's sublayers",{sublayer:this,layer:this.layer})),e.preventDefault())}))]))}_logLockedError(e,t){const{layer:r,declaredClass:i}=this;b.A.getLogger(i).error(new y.A("sublayer:locked",`Property '${String(e)}' can't be changed on Sublayer from the layer '${r?.id}'`,{reason:t,sublayer:this,layer:r}))}_getLayerDomain(e){const t=this.fieldsIndex.get(e);return t?t.domain:null}};X.test={isMapImageLayerOverridePolicy:e=>e===J||e===U,isTileImageLayerOverridePolicy:e=>e===B},(0,s._)([(0,I.MZ)({readOnly:!0})],X.prototype,"capabilities",void 0),(0,s._)([(0,w.w)("service","capabilities",["layerDefinition.canModifyLayer","layerDefinition.capabilities"])],X.prototype,"readCapabilities",null),(0,s._)([(0,I.MZ)()],X.prototype,"defaultPopupTemplate",null),(0,s._)([(0,I.MZ)({type:String,value:null,json:{name:"layerDefinition.definitionExpression",write:{allowNull:!0,overridePolicy:U}}})],X.prototype,"definitionExpression",null),(0,s._)([(0,I.MZ)({readOnly:!0})],X.prototype,"effectiveScaleRange",null),(0,s._)([(0,I.MZ)({type:[L.A],json:{origins:{service:{read:{source:"layerDefinition.fields"}}}}})],X.prototype,"fields",void 0),(0,s._)([(0,I.MZ)({readOnly:!0})],X.prototype,"fieldsIndex",null),(0,s._)([(0,I.MZ)({type:V.A,value:null,json:{name:"layerDefinition.floorInfo",read:{source:"layerDefinition.floorInfo"},write:{target:"layerDefinition.floorInfo",overridePolicy:U},origins:{"web-scene":{read:!1,write:!1}}}})],X.prototype,"floorInfo",null),(0,s._)([(0,I.MZ)({type:G.A,json:{read:{source:"layerDefinition.extent"}}})],X.prototype,"fullExtent",void 0),(0,s._)([(0,I.MZ)({type:k.g.apiValues,json:{origins:{service:{name:"layerDefinition.geometryType",read:{reader:k.g.read}}}}})],X.prototype,"geometryType",void 0),(0,s._)([(0,I.MZ)({type:String})],X.prototype,"globalIdField",void 0),(0,s._)([(0,w.w)("service","globalIdField",["layerDefinition.globalIdField","layerDefinition.fields"])],X.prototype,"readGlobalIdFieldFromService",null),(0,s._)([(0,I.MZ)({type:A.jz,json:{write:{ignoreOrigin:!0}}})],X.prototype,"id",null),(0,s._)([(0,I.MZ)({value:null,type:[T.A],json:{read:{source:"layerDefinition.drawingInfo.labelingInfo"},write:{target:"layerDefinition.drawingInfo.labelingInfo",overridePolicy:J}}})],X.prototype,"labelingInfo",null),(0,s._)([(0,E.K)("labelingInfo")],X.prototype,"writeLabelingInfo",null),(0,s._)([(0,I.MZ)({type:Boolean,value:!0,json:{read:{source:"layerDefinition.drawingInfo.showLabels"},write:{target:"layerDefinition.drawingInfo.showLabels",overridePolicy:J}}})],X.prototype,"labelsVisible",null),(0,s._)([(0,I.MZ)({value:null})],X.prototype,"layer",null),(0,s._)([(0,I.MZ)({type:String,json:{write:{overridePolicy:B}}})],X.prototype,"layerItemId",void 0),(0,s._)([(0,I.MZ)({type:Boolean,value:!0,json:{origins:{service:{read:{enabled:!1}}},read:{source:"showLegend"},write:{target:"showLegend",overridePolicy:$}}})],X.prototype,"legendEnabled",void 0),(0,s._)([(0,I.MZ)({type:["show","hide","hide-children"],value:"show",json:{read:!1,write:!1,origins:{"web-scene":{read:!0,write:!0}}}})],X.prototype,"listMode",null),(0,s._)([(0,I.MZ)({type:Number,value:0,json:{write:{overridePolicy:J}}})],X.prototype,"minScale",null),(0,s._)([(0,w.w)("minScale",["minScale","layerDefinition.minScale"])],X.prototype,"readMinScale",null),(0,s._)([(0,I.MZ)({type:Number,value:0,json:{write:{overridePolicy:J}}})],X.prototype,"maxScale",null),(0,s._)([(0,w.w)("maxScale",["maxScale","layerDefinition.maxScale"])],X.prototype,"readMaxScale",null),(0,s._)([(0,I.MZ)({type:String})],X.prototype,"objectIdField",void 0),(0,s._)([(0,w.w)("service","objectIdField",["layerDefinition.objectIdField","layerDefinition.fields"])],X.prototype,"readObjectIdFieldFromService",null),(0,s._)([(0,I.MZ)({type:Number,value:1,json:{write:{target:"layerDefinition.drawingInfo.transparency",overridePolicy:J}}})],X.prototype,"opacity",null),(0,s._)([(0,w.w)("opacity",["layerDefinition.drawingInfo.transparency","layerDefinition.transparency"])],X.prototype,"readOpacity",null),(0,s._)([(0,E.K)("opacity")],X.prototype,"writeOpacity",null),(0,s._)([(0,I.MZ)({json:{type:A.jz,write:{target:"parentLayerId",writerEnsuresNonNull:!0,overridePolicy:J}}})],X.prototype,"parent",void 0),(0,s._)([(0,E.K)("parent")],X.prototype,"writeParent",null),(0,s._)([(0,I.MZ)({type:Boolean,value:!0,json:{read:{source:"disablePopup",reader:(e,t)=>!t.disablePopup},write:{target:"disablePopup",overridePolicy:$,writer(e,t,r){t[r]=!e}}}})],X.prototype,"popupEnabled",void 0),(0,s._)([(0,I.MZ)({type:a.A,json:{read:{source:"popupInfo"},write:{target:"popupInfo",overridePolicy:$}}})],X.prototype,"popupTemplate",void 0),(0,s._)([(0,I.MZ)({readOnly:!0})],X.prototype,"queryTask",null),(0,s._)([(0,I.MZ)({types:o.H,value:null,json:{name:"layerDefinition.drawingInfo.renderer",write:{overridePolicy:J},origins:{"web-scene":{types:o.X,name:"layerDefinition.drawingInfo.renderer",write:{overridePolicy:J}}}}})],X.prototype,"renderer",null),(0,s._)([(0,I.MZ)({types:{key:"type",base:null,typeMap:{"data-layer":Z.L,"map-layer":C.f}},cast(e){if(e){if("mapLayerId"in e)return(0,A.PZ)(C.f,e);if("dataSource"in e)return(0,A.PZ)(Z.L,e)}return e},json:{name:"layerDefinition.source",write:{overridePolicy:J}}})],X.prototype,"source",null),(0,s._)([(0,I.MZ)()],X.prototype,"sourceJSON",void 0),(0,s._)([(0,I.MZ)({value:null,json:{type:[A.jz],write:{target:"subLayerIds",allowNull:!0,overridePolicy:J}}})],X.prototype,"sublayers",null),(0,s._)([(0,v.w)("sublayers")],X.prototype,"castSublayers",null),(0,s._)([(0,E.K)("sublayers")],X.prototype,"writeSublayers",null),(0,s._)([(0,I.MZ)({type:String,json:{name:"name",write:{overridePolicy:$}}})],X.prototype,"title",void 0),(0,s._)([(0,I.MZ)({type:String})],X.prototype,"typeIdField",void 0),(0,s._)([(0,w.w)("typeIdField",["layerDefinition.typeIdField"])],X.prototype,"readTypeIdField",null),(0,s._)([(0,I.MZ)({type:[F.A],json:{origins:{service:{read:{source:"layerDefinition.types"}}}}})],X.prototype,"types",void 0),(0,s._)([(0,I.MZ)({type:String,json:{name:"layerUrl",write:{overridePolicy:B}}})],X.prototype,"url",null),(0,s._)([(0,I.MZ)({type:Boolean,value:!0,json:{read:{source:"defaultVisibility"},write:{target:"defaultVisibility",overridePolicy:J}}})],X.prototype,"visible",null),(0,s._)([(0,E.K)("visible")],X.prototype,"writeVisible",null),X=i=(0,s._)([(0,_.$)("geoscene.layers.support.Sublayer")],X);const Y=X},33690:function(e,t,r){r.d(t,{C:function(){return o},m:function(){return a}});var i=r(47966),s=r(71120);async function a(e,t,r){let a;try{a=await createImageBitmap(e)}catch(o){throw new i.A("request:server",`Unable to load ${t}`,{url:t,error:o})}return(0,s.Te)(r),a}async function o(e,t,r,a,o){let n;try{n=await createImageBitmap(e)}catch(l){throw new i.A("request:server",`Unable to load tile ${t}/${r}/${a}`,{error:l,level:t,row:r,col:a})}return(0,s.Te)(o),n}},12809:function(e,t,r){r.d(t,{Sk:function(){return a},Zx:function(){return s},_X:function(){return n}});var i=r(27014);function s(e,t,r){const i=t.flatten((({sublayers:e})=>e)).length;return i!==e.length||(!!e.some((e=>e.originIdOf("minScale")>r||e.originIdOf("maxScale")>r||e.originIdOf("renderer")>r||e.originIdOf("labelingInfo")>r||e.originIdOf("opacity")>r||e.originIdOf("labelsVisible")>r||e.originIdOf("source")>r))||!o(e,t))}function a(e,t,r){return!!e.some((e=>{const t=e.source;return!(!t||"map-layer"===t.type&&t.mapLayerId===e.id&&(null==t.gdbVersion||t.gdbVersion===r))||e.originIdOf("renderer")>i.Gr.SERVICE||e.originIdOf("labelingInfo")>i.Gr.SERVICE||e.originIdOf("opacity")>i.Gr.SERVICE||e.originIdOf("labelsVisible")>i.Gr.SERVICE}))||!o(e,t)}function o(e,t){if(!e||!e.length||null==t)return!0;const r=t.slice().reverse().flatten((({sublayers:e})=>e&&e.toArray().reverse())).map((e=>e.id)).toArray();if(e.length>r.length)return!1;let i=0;const s=r.length;for(const{id:a}of e){for(;i<s&&r[i]!==a;)i++;if(i>=s)return!1}return!0}function n(e){return!!e&&e.some((e=>null!=e.minScale||e.layerDefinition&&null!=e.layerDefinition.minScale))}}}]);
//# sourceMappingURL=3495.734cbe7a.js.map