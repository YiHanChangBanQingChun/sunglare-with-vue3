"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[7886],{89012:function(e,t,r){r.d(t,{P:function(){return u}});r(44114);var i=r(3133),s=r(4244),o=r(87993),n=r(36136),a=r(27014),l=r(76543),p=r(9540),d=r(91611);function u(e){const t=e?.origins??[void 0];return(r,i)=>{const s=c(e,r,i);for(const e of t){const t=(0,l.rM)(r,e,i);for(const e in s)t[e]=s[e]}}}function c(e,t,r){if("resource"===e?.type)return y(e,t,r);switch(e?.type??"other"){case"other":return{read:!0,write:!0};case"url":{const{read:e,write:t}=d.a;return{read:e,write:t}}}}function y(e,t,r){const o=(0,n.z4)(t,r);return{type:String,read:(e,t,r)=>{const i=(0,d.r)(e,t,r);return o.type===String?i:"function"==typeof o.type?new o.type({url:i}):void 0},write:{writer(t,n,l,p){if(!p||!p.resources)return"string"==typeof t?void(n[l]=(0,d.t)(t,p)):void(n[l]=t.write({},p));const u=b(t),c=(0,d.t)(u,{...p,verifyItemRelativeUrls:p&&p.verifyItemRelativeUrls?{writtenUrls:p.verifyItemRelativeUrls.writtenUrls,rootPath:void 0}:void 0},d.M.NO),y=o.type!==String&&(!(0,i.H)(this)||p&&p.origin&&this.originIdOf(r)>(0,a.aB)(p.origin)),m={object:this,propertyName:r,value:t,targetUrl:c,dest:n,targetPropertyName:l,context:p,params:e};p&&p.portalItem&&c&&!(0,s.oP)(c)?y?f(m):g(m):p&&p.portalItem&&(null==c||null!=(0,d.i)(c)||(0,s.w8)(c)||y)?h(m):n[l]=c}}}}function h(e){const{targetUrl:t,params:r,value:i,context:n,dest:a,targetPropertyName:l}=e;if(!n.portalItem)return;const u=(0,d.p)(t),c=u?.filename??(0,o.l)(),y=r?.prefix??u?.prefix,h=v(i,t,n),f=(0,s.fj)(y,c),g=`${f}.${(0,p.n)(h)}`,b=n.portalItem.resourceFromPath(g);(0,s.w8)(t)&&n.resources&&n.resources.pendingOperations.push(w(t).then((e=>{b.path=`${f}.${(0,p.n)(e)}`,a[l]=b.itemRelativeUrl})).catch((()=>{})));const _=r?.compress??!1;n.resources&&m({...e,resource:b,content:h,compress:_,updates:n.resources.toAdd}),a[l]=b.itemRelativeUrl}function f(e){const{context:t,targetUrl:r,params:i,value:o,dest:n,targetPropertyName:a}=e;if(!t.portalItem)return;const l=t.portalItem.resourceFromPath(r),d=v(o,r,t),u=(0,p.n)(d),c=(0,s.Zo)(l.path),y=i?.compress??!1;u===c?(t.resources&&m({...e,resource:l,content:d,compress:y,updates:t.resources.toUpdate}),n[a]=r):h(e)}function g({context:e,targetUrl:t,dest:r,targetPropertyName:i}){e.portalItem&&e.resources&&(e.resources.toKeep.push({resource:e.portalItem.resourceFromPath(t),compress:!1}),r[i]=t)}function m({object:e,propertyName:t,updates:r,resource:i,content:s,compress:o}){r.push({resource:i,content:s,compress:o,finish:r=>{_(e,t,r)}})}function v(e,t,r){return"string"==typeof e?{url:t}:new Blob([JSON.stringify(e.toJSON(r))],{type:"application/json"})}async function w(e){const t=(await Promise.resolve().then(r.bind(r,86039))).default,{data:i}=await t(e,{responseType:"blob"});return i}function b(e){return null==e?null:"string"==typeof e?e:e.url}function _(e,t,r){"string"==typeof e[t]?e[t]=r.url:e[t].url=r.url}},77886:function(e,t,r){r.r(t),r.d(t,{default:function(){return fe}});r(44114);var i=r(71457),s=r(11134),o=r(3035),n=(r(22070),r(118),r(92223),r(65907),r(71824),r(2882),r(65092),r(44829),r(11066),r(23928)),a=r(86039),l=r(67872),p=r(41879),d=r(47966),u=r(15114),c=r(40912),y=r(71120),h=r(87400),f=r(4244),g=r(76543),m=(r(37679),r(69292),r(51020),r(46528)),v=r(70681),w=r(29916),b=r(27014),_=r(71680),I=r(91740),A=r(71260),S=r(88409),L=r(25673),F=r(21107),j=r(99024),O=r(30935),M=r(75122),x=r(96979),Z=r(83256),E=r(93070),P=r(99126),T=r(61792),R=r(56408),D=r(27678),N=r(30104),U=r(921),G=r(23540),q=r(9259),C=r(10900),Q=r(28920);let k=class extends Q.oY{constructor(){super(...arguments),this.name=null,this.field=null,this.currentRangeExtent=null,this.fullRangeExtent=null,this.type="rangeInfo"}};(0,i._)([(0,g.MZ)({type:String,json:{read:!0,write:!0}})],k.prototype,"name",void 0),(0,i._)([(0,g.MZ)({type:String,json:{read:!0,write:!0}})],k.prototype,"field",void 0),(0,i._)([(0,g.MZ)({type:[Number],json:{read:!0,write:!0}})],k.prototype,"currentRangeExtent",void 0),(0,i._)([(0,g.MZ)({type:[Number],json:{read:!0,write:!0}})],k.prototype,"fullRangeExtent",void 0),(0,i._)([(0,g.MZ)({type:["rangeInfo"],readOnly:!0,json:{read:!1,write:!0}})],k.prototype,"type",void 0),k=(0,i._)([(0,w.$)("geoscene.layers.support.RangeInfo")],k);var V,$=r(57411),J=r(1834),z=r(89012),K=r(65536),W=r(9737),Y=r(78979);let B=V=class extends((0,Q.Te)(p.A.ofType(W.A))){constructor(e){super(e)}clone(){return new V(this.items.map((e=>e.clone())))}write(e,t){return this.toJSON(t)}toJSON(e){const t=e?.layer?.spatialReference;return t?this.toArray().map((r=>{if(!t.equals(r.spatialReference)){if(!(0,Y._q)(r.spatialReference,t))return e&&e.messages&&e.messages.push(new K.A("scenefilter:unsupported","Scene filters with incompatible spatial references are not supported",{modification:this,spatialReference:e.layer.spatialReference,context:e})),null;const i=new W.A;(0,Y.uk)(r,i,t),r=i}const i=r.toJSON(e);return delete i.spatialReference,i})).filter((e=>null!=e)):(e?.messages&&e.messages.push(new K.A("scenefilter:unsupported","Writing Scene filters without context layer is not supported",{modification:this,spatialReference:e.layer.spatialReference,context:e})),this.toArray().map((t=>t.toJSON(e))))}static fromJSON(e,t){const r=new V;return e.forEach((e=>r.add(W.A.fromJSON(e,t)))),r}};B=V=(0,i._)([(0,w.$)("geoscene.layers.support.PolygonCollection")],B);const H=B;var X,ee=r(91611);let te=X=class extends Q.oY{constructor(e){super(e),this.spatialRelationship="disjoint",this.geometries=new H,this._geometriesSource=null,this._handles=new $.A}initialize(){this._handles.add((0,h.on)((()=>this.geometries),"after-changes",(()=>this.geometries=this.geometries),h.OH))}destroy(){this._handles.destroy()}readGeometries(e,t,r){Array.isArray(e)?this.geometries=H.fromJSON(e,r):this._geometriesSource={url:(0,ee.f)(e,r),context:r}}async loadGeometries(e,t){if(null==this._geometriesSource)return;const{url:r,context:i}=this._geometriesSource,s=await(0,a["default"])(r,{responseType:"json",signal:t?.signal}),o=e.toJSON(),n=s.data.map((e=>({...e,spatialReference:o})));this.geometries=H.fromJSON(n,i),this._geometriesSource=null}clone(){const e=new X({geometries:(0,J.o8)(this.geometries),spatialRelationship:this.spatialRelationship});return e._geometriesSource=this._geometriesSource,e}};(0,i._)([(0,g.MZ)({type:["disjoint","contains"],nonNullable:!0,json:{write:!0}})],te.prototype,"spatialRelationship",void 0),(0,i._)([(0,g.MZ)({type:H,nonNullable:!0,json:{write:!0}}),(0,z.P)({origins:["web-scene","portal-item"],type:"resource",prefix:"geometries"})],te.prototype,"geometries",void 0),(0,i._)([(0,v.w)(["web-scene","portal-item"],"geometries")],te.prototype,"readGeometries",null),te=X=(0,i._)([(0,w.$)("geoscene.layers.support.SceneFilter")],te);const re=te;var ie=r(86103),se=r(81809),oe=r(58413),ne=r(55823),ae=r(42149),le=r(76035),pe=r(91813);const de=["3DObject","Point"],ue=(0,R.p)();let ce=class extends((0,S.w6)((0,O.w6)((0,A.b)((0,L.q)((0,F.A)((0,j.j)((0,c.P)((0,I.p)((0,l.O)(_.A)))))))))){constructor(...e){super(...e),this.featureReduction=null,this.rangeInfos=null,this.operationalLayerType="ArcGISSceneServiceLayer",this.type="scene",this.fields=null,this.floorInfo=null,this.outFields=null,this.nodePages=null,this.materialDefinitions=null,this.textureSetDefinitions=null,this.geometryDefinitions=null,this.serviceUpdateTimeStamp=null,this.excludeObjectIds=new p.A,this.definitionExpression=null,this.filter=null,this.path=null,this.labelsVisible=!0,this.labelingInfo=null,this.legendEnabled=!0,this.priority=null,this.semantic=null,this.cachedDrawingInfo={color:!1},this.popupEnabled=!0,this.popupTemplate=null,this.objectIdField=null,this.globalIdField=null,this._fieldUsageInfo={},this.screenSizePerspectiveEnabled=!0}normalizeCtorArgs(e,t){return"string"==typeof e?{url:e,...t}:e}destroy(){this._set("renderer",null)}getField(e){return this.fieldsIndex.get(e)}getFieldDomain(e,t){const r=this.getFeatureType(t?.feature)?.domains?.[e];return r&&"inherited"!==r.type?r:this.getField(e)?.domain??null}getFeatureType(e){return e&&this.associatedLayer?this.associatedLayer.getFeatureType(e):null}get types(){return this.associatedLayer?.types??[]}get typeIdField(){return this.associatedLayer?.typeIdField??null}get templates(){return this.associatedLayer?.templates??null}get formTemplate(){return this.associatedLayer?.formTemplate??null}get fieldsIndex(){return new D.A(this.fields)}readNodePages(e,t,r){return"Point"===t.layerType&&(e=t.pointNodePages),null==e||"object"!=typeof e?null:U.W4.fromJSON(e,r)}set elevationInfo(e){this._set("elevationInfo",e),this.loaded&&this._validateElevationInfo()}get geometryType(){return he[this.profile]||"mesh"}set renderer(e){(0,N.yp)(e,this.fieldsIndex),this._set("renderer",e)}readCachedDrawingInfo(e){return null!=e&&"object"==typeof e||(e={}),null==e.color&&(e.color=!1),e}get capabilities(){const e=this.associatedLayer?.capabilities??x.P,{query:t,editing:{supportsGlobalId:r,supportsRollbackOnFailure:i,supportsUploadWithItemId:s,supportsGeometryUpdate:o,supportsReturnServiceEditsInSourceSpatialReference:n},data:{supportsZ:a,supportsM:l,isVersioned:p,supportsAttachment:d},operations:{supportsEditing:u,supportsAdd:c,supportsUpdate:y,supportsDelete:h,supportsQuery:f,supportsQueryAttachments:g,supportsAsyncConvert3D:m}}=e,v=e.operations.supportsChangeTracking,w=!!this.associatedLayer?.infoFor3D&&(0,oe.Vo)();return{query:t,editing:{supportsGlobalId:r,supportsReturnServiceEditsInSourceSpatialReference:n,supportsRollbackOnFailure:i,supportsGeometryUpdate:w&&o,supportsUploadWithItemId:s},data:{supportsAttachment:d,supportsZ:a,supportsM:l,isVersioned:p},operations:{supportsQuery:f,supportsQueryAttachments:g,supportsEditing:u&&v,supportsAdd:w&&c&&v,supportsDelete:w&&h&&v,supportsUpdate:y&&v,supportsAsyncConvert3D:m}}}get editingEnabled(){return this._isOverridden("editingEnabled")?this._get("editingEnabled"):this.userHasEditingPrivileges}set editingEnabled(e){this._overrideIfSome("editingEnabled",e)}get infoFor3D(){return this.associatedLayer?.infoFor3D??null}get defaultPopupTemplate(){return this.associatedLayer||this.attributeStorageInfo?this.createPopupTemplate():null}readObjectIdField(e,t){return!e&&t.fields&&t.fields.some((t=>("esriFieldTypeOID"===t.type&&(e=t.name),!!e))),e||void 0}readGlobalIdField(e,t){return!e&&t.fields&&t.fields.some((t=>("esriFieldTypeGlobalID"===t.type&&(e=t.name),!!e))),e||void 0}get displayField(){return this.associatedLayer?.displayField??null}readProfile(e,t){const r=t.store.profile;return null!=r&&ye[r]?ye[r]:(u.A.getLogger(this).error("Unknown or missing profile",{profile:r,layer:this}),"mesh-pyramids")}load(e){const t=null!=e?e.signal:null,r=this.loadFromPortal({supportedTypes:["Scene Service"]},e).catch(y.QP).then((()=>this._fetchService(t))).then((()=>Promise.all([this._fetchIndexAndUpdateExtent(this.nodePages,t),this._setAssociatedFeatureLayer(t),this._loadFilterGeometries()]))).then((()=>this._validateElevationInfo())).then((()=>this._applyAssociatedLayerOverrides())).then((()=>this._populateFieldUsageInfo())).then((()=>(0,ie.L)(this,{origin:"service"},t))).then((()=>(0,N.yp)(this.renderer,this.fieldsIndex))).then((()=>this.finishLoadEditablePortalLayer(e)));return this.addResolvingPromise(r),Promise.resolve(this)}async beforeSave(){null!=this.filter&&(this.filter=this.filter.clone(),await this.load())}async _loadFilterGeometries(){if(this.filter)try{await this.filter.loadGeometries(this.spatialReference)}catch(e){u.A.getLogger(this).error("#_loadFilterGeometries()",this,"Failed to load filter geometries. Geometry filter will not be applied for this layer.",{error:e}),this.filter=null}}createQuery(){const e=new se.A;return"mesh"!==this.geometryType&&(e.returnGeometry=!0,e.returnZ=!0),e.where=this.definitionExpression||"1=1",e.sqlFormat="standard",e.outFields=["*"],e}queryExtent(e,t){return this._getAssociatedLayerForQuery().then((r=>r.queryExtent(e||this.createQuery(),t)))}queryFeatureCount(e,t){return this._getAssociatedLayerForQuery().then((r=>r.queryFeatureCount(e||this.createQuery(),t)))}queryFeatures(e,t){return this._getAssociatedLayerForQuery().then((r=>r.queryFeatures(e||this.createQuery(),t))).then((e=>{if(e?.features)for(const t of e.features)t.layer=this,t.sourceLayer=this;return e}))}async queryCachedAttributes(e,t){const r=(0,N.hL)(this.fieldsIndex,await(0,le.TO)(this,(0,le.D8)(this)));return(0,ae.s1)(this.parsedUrl.path,this.attributeStorageInfo??[],e,t,r)}async queryCachedFeature(e,t){const r=await this.queryCachedAttributes(e,[t]);if(!r||0===r.length)throw new d.A("scenelayer:feature-not-in-cached-data","Feature not found in cached data");const i=new s.A;return i.attributes=r[0],i.layer=this,i.sourceLayer=this,i}queryObjectIds(e,t){return this._getAssociatedLayerForQuery().then((r=>r.queryObjectIds(e||this.createQuery(),t)))}queryAttachments(e,t){return this._getAssociatedLayerForQuery().then((r=>r.queryAttachments(e,t)))}getFieldUsageInfo(e){const t={supportsLabelingInfo:!1,supportsRenderer:!1,supportsPopupTemplate:!1,supportsLayerQuery:!1};return this.loaded?this._fieldUsageInfo[e]||t:(u.A.getLogger(this).error("#getFieldUsageInfo()","Unavailable until layer is loaded"),t)}createPopupTemplate(e){return(0,ne.tn)(this,e)}_getAssociatedLayerForQuery(){const e=this.associatedLayer;return e?.loaded?Promise.resolve(e):this._loadAssociatedLayerForQuery()}async _loadAssociatedLayerForQuery(){if(await this.load(),!this.associatedLayer)throw new d.A("scenelayer:query-not-available","SceneLayer queries are not available without an associated feature layer",{layer:this});try{await this.associatedLayer.load()}catch(e){throw new d.A("scenelayer:query-not-available","SceneLayer associated feature layer could not be loaded",{layer:this,error:e})}return this.associatedLayer}hasCachedStatistics(e){return null!=this.statisticsInfo&&this.statisticsInfo.some((t=>t.name===e))}async queryCachedStatistics(e,t){if(await this.load(t),!this.statisticsInfo)throw new d.A("scenelayer:no-cached-statistics","Cached statistics are not available for this layer");const r=this.fieldsIndex.get(e);if(!r)throw new d.A("scenelayer:field-unexisting",`Field '${e}' does not exist on the layer`);for(const i of this.statisticsInfo)if(i.name===r.name){const e=(0,f.fj)(this.parsedUrl.path,i.href);return(0,a["default"])(e,{query:{f:"json",token:this.apiKey},responseType:"json",signal:t?t.signal:null}).then((e=>e.data))}throw new d.A("scenelayer:no-cached-statistics","Cached statistics for this attribute are not available")}async saveAs(e,t){return this._debouncedSaveOperations(O.Xh.SAVE_AS,{...t,getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"scene"},e)}async save(){const e={getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"scene"};return this._debouncedSaveOperations(O.Xh.SAVE,e)}async applyEdits(e,t){const{applyEdits:i}=await r.e(7312).then(r.bind(r,37312));if(await this.load(),!this.associatedLayer)throw new d.A(`${this.type}-layer:not-editable`,"Service is not editable");return await this.associatedLayer.load(),i(this,this.associatedLayer.source,e,t)}async uploadAssets(e,t){if(await this.load(),null==this.associatedLayer)throw new d.A(`${this.type}-layer:not-editable`,"Service is not editable");return await this.associatedLayer.load(),this.associatedLayer.uploadAssets(e,t)}on(e,t){return super.on(e,t)}validateLayer(e){if(e.layerType&&!de.includes(e.layerType))throw new d.A("scenelayer:layer-type-not-supported","SceneLayer does not support this layer type",{layerType:e.layerType});if(isNaN(this.version.major)||isNaN(this.version.minor))throw new d.A("layer:service-version-not-supported","Service version is not supported.",{serviceVersion:this.version.versionString,supportedVersions:"1.x, 2.x"});if(this.version.major>2)throw new d.A("layer:service-version-too-new","Service version is too new.",{serviceVersion:this.version.versionString,supportedVersions:"1.x, 2.x"});function t(e,t){let r=!1,i=!1;if(null==e)r=!0,i=!0;else{const s=t&&t.isGeographic;switch(e){case"east-north-up":case"earth-centered":r=!0,i=s;break;case"vertex-reference-frame":r=!0,i=!s;break;default:r=!1}}if(!r)throw new d.A("scenelayer:unsupported-normal-reference-frame","Normal reference frame is invalid.");if(!i)throw new d.A("scenelayer:incompatible-normal-reference-frame","Normal reference frame is incompatible with layer spatial reference.")}t(this.normalReferenceFrame,this.spatialReference)}_getTypeKeywords(){const e=[];if("points"===this.profile)e.push("Point");else{if("mesh-pyramids"!==this.profile)throw new d.A("scenelayer:unknown-profile","SceneLayer:save() encountered an unknown SceneLayer profile: "+this.profile);e.push("3DObject")}return e}_populateFieldUsageInfo(){if(this._fieldUsageInfo={},this.fields)for(const e of this.fields){const t=!(!this.attributeStorageInfo||!this.attributeStorageInfo.some((t=>t.name===e.name))),r=!!this.associatedLayer?.fields?.some((t=>t&&e.name===t.name)),i={supportsLabelingInfo:t,supportsRenderer:t,supportsPopupTemplate:t||r,supportsLayerQuery:r};this._fieldUsageInfo[e.name]=i}}_applyAssociatedLayerOverrides(){this._applyAssociatedLayerFieldsOverrides(),this._applyAssociatedLayerPopupOverrides(),this._applyAssociatedLayerExtentOverride()}_applyAssociatedLayerFieldsOverrides(){if(!this.associatedLayer?.fields)return;let e=null;for(const t of this.associatedLayer.fields){const r=this.getField(t.name);r?(!r.domain&&t.domain&&(r.domain=t.domain.clone()),r.editable=t.editable,r.nullable=t.nullable,r.length=t.length):(e||(e=this.fields?this.fields.slice():[]),e.push(t.clone()))}e&&this._set("fields",e)}_applyAssociatedLayerPopupOverrides(){if(!this.associatedLayer)return;const e=["popupTemplate","popupEnabled"],t=(0,m.oY)(this);for(let r=0;r<e.length;r++){const i=e[r],s=this.originIdOf(i),o=this.associatedLayer.originIdOf(i);s<o&&(o===b.Gr.SERVICE||o===b.Gr.PORTAL_ITEM)&&t.setAtOrigin(i,this.associatedLayer[i],o)}}_applyAssociatedLayerExtentOverride(){const e=this.associatedLayer?.editingInfo?.lastEditDate,t=this.associatedLayer?.serverGens,r=this.associatedLayer?.getAtOrigin("fullExtent","service");(0,oe.Vo)()&&null!=this.associatedLayer?.infoFor3D&&r&&(0,M.Wo)(this.associatedLayer?.url)&&e&&this.serviceUpdateTimeStamp?.lastUpdate!==e.getTime()&&(this.serviceUpdateTimeStamp||t?.minServerGen!==t?.serverGen)&&(0,m.oY)(this).setAtOrigin("fullExtent",r.clone(),b.Gr.SERVICE)}async _setAssociatedFeatureLayer(e){if(!["mesh-pyramids","points"].includes(this.profile))return;const t=new T.c(this.parsedUrl,this.portalItem,this.apiKey,e);try{this.associatedLayer=await t.fetch()}catch(r){(0,y.zf)(r)||this._logWarningOnPopupEnabled()}}async _logWarningOnPopupEnabled(){await(0,h.C_)((()=>this.popupEnabled&&null!=this.popupTemplate));const e=`this SceneLayer: ${this.title}`;null==this.attributeStorageInfo?u.A.getLogger(this).warn(`Associated FeatureLayer could not be loaded and no binary attributes found. Popups will not work on ${e}`):u.A.getLogger(this).info(`Associated FeatureLayer could not be loaded. Falling back to binary attributes for Popups on ${e}`)}_validateElevationInfo(){const e=this.elevationInfo;e&&("mesh-pyramids"===this.profile&&"relative-to-scene"===e.mode&&u.A.getLogger(this).warn(".elevationInfo=","Mesh scene layers don't support relative-to-scene elevation mode"),e.featureExpressionInfo&&"0"!==e.featureExpressionInfo.expression&&u.A.getLogger(this).warn(".elevationInfo=","Scene layers do not support featureExpressionInfo"))}};(0,i._)([(0,g.MZ)({types:{key:"type",base:E.c,typeMap:{selection:P.A}},json:{origins:{"web-scene":{name:"layerDefinition.featureReduction",write:!0},"portal-item":{name:"layerDefinition.featureReduction",write:!0}}}})],ce.prototype,"featureReduction",void 0),(0,i._)([(0,g.MZ)({type:[k],json:{read:!1,origins:{"web-scene":{name:"layerDefinition.rangeInfos",write:!0},"portal-item":{name:"layerDefinition.rangeInfos",write:!0}}}})],ce.prototype,"rangeInfos",void 0),(0,i._)([(0,g.MZ)({json:{read:!1}})],ce.prototype,"associatedLayer",void 0),(0,i._)([(0,g.MZ)({type:["show","hide"]})],ce.prototype,"listMode",void 0),(0,i._)([(0,g.MZ)({type:["ArcGISSceneServiceLayer"]})],ce.prototype,"operationalLayerType",void 0),(0,i._)([(0,g.MZ)({json:{read:!1},readOnly:!0})],ce.prototype,"type",void 0),(0,i._)([(0,g.MZ)({...ue.fields,readOnly:!0,json:{read:!1,origins:{service:{read:!0}}}})],ce.prototype,"fields",void 0),(0,i._)([(0,g.MZ)()],ce.prototype,"types",null),(0,i._)([(0,g.MZ)()],ce.prototype,"typeIdField",null),(0,i._)([(0,g.MZ)()],ce.prototype,"templates",null),(0,i._)([(0,g.MZ)()],ce.prototype,"formTemplate",null),(0,i._)([(0,g.MZ)({readOnly:!0})],ce.prototype,"fieldsIndex",null),(0,i._)([(0,g.MZ)({type:C.A,json:{read:{source:"layerDefinition.floorInfo"},write:{target:"layerDefinition.floorInfo"}}})],ce.prototype,"floorInfo",void 0),(0,i._)([(0,g.MZ)(ue.outFields)],ce.prototype,"outFields",void 0),(0,i._)([(0,g.MZ)({type:U.W4,readOnly:!0,json:{read:!1}})],ce.prototype,"nodePages",void 0),(0,i._)([(0,v.w)("service","nodePages",["nodePages","pointNodePages"])],ce.prototype,"readNodePages",null),(0,i._)([(0,g.MZ)({type:[U.uV],readOnly:!0})],ce.prototype,"materialDefinitions",void 0),(0,i._)([(0,g.MZ)({type:[U.Ot],readOnly:!0})],ce.prototype,"textureSetDefinitions",void 0),(0,i._)([(0,g.MZ)({type:[U.L0],readOnly:!0})],ce.prototype,"geometryDefinitions",void 0),(0,i._)([(0,g.MZ)({readOnly:!0})],ce.prototype,"serviceUpdateTimeStamp",void 0),(0,i._)([(0,g.MZ)({readOnly:!0})],ce.prototype,"attributeStorageInfo",void 0),(0,i._)([(0,g.MZ)({readOnly:!0})],ce.prototype,"statisticsInfo",void 0),(0,i._)([(0,g.MZ)({type:p.A.ofType(Number),nonNullable:!0,json:{origins:{service:{read:!1,write:!1}},name:"layerDefinition.excludeObjectIds",write:{enabled:!0}}})],ce.prototype,"excludeObjectIds",void 0),(0,i._)([(0,g.MZ)({type:String,json:{origins:{service:{read:!1,write:!1}},name:"layerDefinition.definitionExpression",write:{enabled:!0,allowNull:!0}}})],ce.prototype,"definitionExpression",void 0),(0,i._)([(0,g.MZ)({type:re,json:{name:"layerDefinition.polygonFilter",write:{enabled:!0,allowNull:!0},origins:{service:{read:!1,write:!1}}}})],ce.prototype,"filter",void 0),(0,i._)([(0,g.MZ)({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],ce.prototype,"path",void 0),(0,i._)([(0,g.MZ)(Z.Yj)],ce.prototype,"elevationInfo",null),(0,i._)([(0,g.MZ)({type:String})],ce.prototype,"geometryType",null),(0,i._)([(0,g.MZ)(Z.kF)],ce.prototype,"labelsVisible",void 0),(0,i._)([(0,g.MZ)({type:[G.A],json:{origins:{service:{name:"drawingInfo.labelingInfo",read:{reader:q.w},write:!1}},name:"layerDefinition.drawingInfo.labelingInfo",read:{reader:q.w},write:!0}})],ce.prototype,"labelingInfo",void 0),(0,i._)([(0,g.MZ)(Z.fV)],ce.prototype,"legendEnabled",void 0),(0,i._)([(0,g.MZ)({type:Number,json:{origins:{"web-document":{default:1,write:{enabled:!0,target:{opacity:{type:Number},"layerDefinition.drawingInfo.transparency":{type:Number}}},read:{source:["opacity","layerDefinition.drawingInfo.transparency"],reader(e,t){if("number"==typeof e&&e>=0&&e<=1)return e;const r=t.layerDefinition?.drawingInfo?.transparency;return void 0!==r?(0,pe.D)(r):void 0}}},"portal-item":{write:!0},service:{read:!1}}}})],ce.prototype,"opacity",void 0),(0,i._)([(0,g.MZ)({type:["Low","High"],readOnly:!0,json:{read:!1,origins:{service:{read:!0}}}})],ce.prototype,"priority",void 0),(0,i._)([(0,g.MZ)({type:["Labels"],readOnly:!0,json:{read:!1,origins:{service:{read:!0}}}})],ce.prototype,"semantic",void 0),(0,i._)([(0,g.MZ)({types:n.X,json:{origins:{service:{read:{source:"drawingInfo.renderer"}}},name:"layerDefinition.drawingInfo.renderer",write:!0},value:null})],ce.prototype,"renderer",null),(0,i._)([(0,g.MZ)({json:{read:!1}})],ce.prototype,"cachedDrawingInfo",void 0),(0,i._)([(0,v.w)("service","cachedDrawingInfo")],ce.prototype,"readCachedDrawingInfo",null),(0,i._)([(0,g.MZ)({readOnly:!0,json:{read:!1}})],ce.prototype,"capabilities",null),(0,i._)([(0,g.MZ)({type:Boolean,json:{read:!1}})],ce.prototype,"editingEnabled",null),(0,i._)([(0,g.MZ)({readOnly:!0,json:{write:!1,read:!1}})],ce.prototype,"infoFor3D",null),(0,i._)([(0,g.MZ)(Z.M6)],ce.prototype,"popupEnabled",void 0),(0,i._)([(0,g.MZ)({type:o.A,json:{name:"popupInfo",write:!0}})],ce.prototype,"popupTemplate",void 0),(0,i._)([(0,g.MZ)({readOnly:!0,json:{read:!1}})],ce.prototype,"defaultPopupTemplate",null),(0,i._)([(0,g.MZ)({type:String,json:{read:!1}})],ce.prototype,"objectIdField",void 0),(0,i._)([(0,v.w)("service","objectIdField",["objectIdField","fields"])],ce.prototype,"readObjectIdField",null),(0,i._)([(0,g.MZ)({type:String,json:{read:!1}})],ce.prototype,"globalIdField",void 0),(0,i._)([(0,v.w)("service","globalIdField",["globalIdField","fields"])],ce.prototype,"readGlobalIdField",null),(0,i._)([(0,g.MZ)({readOnly:!0,type:String,json:{read:!1}})],ce.prototype,"displayField",null),(0,i._)([(0,g.MZ)({type:String,json:{read:!1}})],ce.prototype,"profile",void 0),(0,i._)([(0,v.w)("service","profile",["store.profile"])],ce.prototype,"readProfile",null),(0,i._)([(0,g.MZ)({readOnly:!0,type:String,json:{origins:{service:{read:{source:"store.normalReferenceFrame"}}},read:!1}})],ce.prototype,"normalReferenceFrame",void 0),(0,i._)([(0,g.MZ)(Z.PY)],ce.prototype,"screenSizePerspectiveEnabled",void 0),ce=(0,i._)([(0,w.$)("geoscene.layers.SceneLayer")],ce);const ye={"mesh-pyramids":"mesh-pyramids",meshpyramids:"mesh-pyramids","features-meshes":"mesh-pyramids",points:"points","features-points":"points",lines:"lines","features-lines":"lines",polygons:"polygons","features-polygons":"polygons"},he={"mesh-pyramids":"mesh",points:"point",lines:"polyline",polygons:"polygon"},fe=ce},9540:function(e,t,r){r.d(t,{n:function(){return s}});var i=r(4244);function s(e){return a[o(e)]||p}function o(e){return e instanceof Blob?e.type:n(e.url)}function n(e){const t=(0,i.Zo)(e);return d[t]||l}const a={},l="text/plain",p=a[l],d={png:"image/png",jpeg:"image/jpeg",jpg:"image/jpg",bmp:"image/bmp",gif:"image/gif",json:"application/json",txt:"text/plain",xml:"application/xml",svg:"image/svg+xml",zip:"application/zip",pbf:"application/vnd.mapbox-vector-tile",gz:"application/gzip","bin.gz":"application/octet-stream"};for(const u in d)a[d[u]]=u}}]);
//# sourceMappingURL=7886.7394eaec.js.map