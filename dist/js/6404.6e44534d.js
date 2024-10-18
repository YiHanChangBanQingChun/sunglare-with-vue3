"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[6404],{34404:function(e,t,s){s.d(t,{H:function(){return n},L:function(){return i}});const i=1;function n(e,t){let s=0;for(const i of t){const t=i.attributes?.[e];"number"==typeof t&&isFinite(t)&&(s=Math.max(s,t))}return s}},6404:function(e,t,s){s.r(t),s.d(t,{default:function(){return _}});s(44114);var i=s(47966),n=s(55772),r=s(72465),a=s(41312),u=s(34404),o=s(29153),l=s(33292),d=s(86121),p=s(37238),c=s(59316),y=s(27678),f=s(65089),h=s(30104);const m=r.w5,g={xmin:-180,ymin:-90,xmax:180,ymax:90,spatialReference:r.w5},I={hasAttachments:!1,capabilities:"query, editing, create, delete, update",useStandardizedQueries:!0,supportsCoordinatesQuantization:!0,supportsReturningQueryGeometry:!0,advancedQueryCapabilities:{supportsQueryAttachments:!1,supportsStatistics:!0,supportsPercentileStatistics:!0,supportsReturningGeometryCentroid:!0,supportsQueryWithDistance:!0,supportsDistinct:!0,supportsReturningQueryExtent:!0,supportsReturningGeometryProperties:!1,supportsHavingClause:!0,supportsOrderBy:!0,supportsPagination:!0,supportsQueryWithResultType:!1,supportsSqlExpression:!0,supportsDisjointSpatialRel:!0}};function b(e){return(0,n.fT)(e)?null!=e.z:!!e.hasZ}function F(e){return(0,n.fT)(e)?null!=e.m:!!e.hasM}class _{constructor(){this._queryEngine=null,this._nextObjectId=null}destroy(){this._queryEngine&&this._queryEngine&&this._queryEngine.destroy(),this._queryEngine=this._fieldsIndex=this._createDefaultAttributes=null}async load(e){const t=[],{features:s}=e,n=this._inferLayerProperties(s,e.fields),r=e.fields||[],a=null!=e.hasM?e.hasM:!!n.hasM,c=null!=e.hasZ?e.hasZ:!!n.hasZ,b=!e.spatialReference&&!n.spatialReference,F=b?m:e.spatialReference||n.spatialReference,_=b?g:null,E=e.geometryType||n.geometryType,x=!E;let T=e.objectIdField||n.objectIdField,R=e.timeInfo;if(!x&&(b&&t.push({name:"feature-layer:spatial-reference-not-found",message:"Spatial reference not provided or found in features. Defaults to WGS84"}),!E))throw new i.A("feature-layer:missing-property","geometryType not set and couldn't be inferred from the provided features");if(!T)throw new i.A("feature-layer:missing-property","objectIdField not set and couldn't be found in the provided fields");if(n.objectIdField&&T!==n.objectIdField&&(t.push({name:"feature-layer:duplicated-oid-field",message:`Provided objectIdField "${T}" doesn't match the field name "${n.objectIdField}", found in the provided fields`}),T=n.objectIdField),T&&!n.objectIdField){let e=null;r.some((t=>t.name===T&&(e=t,!0)))?(e.type="esriFieldTypeOID",e.editable=!1,e.nullable=!1):r.unshift({alias:T,name:T,type:"esriFieldTypeOID",editable:!1,nullable:!1})}for(const u of r){if(null==u.name&&(u.name=u.alias),null==u.alias&&(u.alias=u.name),!u.name)throw new i.A("feature-layer:invalid-field-name","field name is missing",{field:u});if(u.name===T&&(u.type="esriFieldTypeOID"),!f.m.jsonValues.includes(u.type))throw new i.A("feature-layer:invalid-field-type",`invalid type for field "${u.name}"`,{field:u})}const j={};for(const i of r)if("esriFieldTypeOID"!==i.type&&"esriFieldTypeGlobalID"!==i.type){const e=(0,h.lD)(i);void 0!==e&&(j[i.name]=e)}if(this._fieldsIndex=new y.A(r),this._createDefaultAttributes=(0,p.Vx)(j,T),R){if(R.startTimeField){const e=this._fieldsIndex.get(R.startTimeField);e?(R.startTimeField=e.name,e.type="esriFieldTypeDate"):R.startTimeField=null}if(R.endTimeField){const e=this._fieldsIndex.get(R.endTimeField);e?(R.endTimeField=e.name,e.type="esriFieldTypeDate"):R.endTimeField=null}if(R.trackIdField){const e=this._fieldsIndex.get(R.trackIdField);e?R.trackIdField=e.name:(R.trackIdField=null,t.push({name:"feature-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:R}}))}R.startTimeField||R.endTimeField||(t.push({name:"feature-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing or invalid",details:{timeInfo:R}}),R=null)}const q={warnings:t,featureErrors:[],layerDefinition:{...I,drawingInfo:(0,p.F0)(E),templates:(0,p.e2)(j),extent:_,geometryType:E,objectIdField:T,fields:r,hasZ:c,hasM:a,timeInfo:R},assignedObjectIds:{}};if(this._queryEngine=new d.d({fields:r,geometryType:E,hasM:a,hasZ:c,objectIdField:T,spatialReference:F,featureStore:new o.A({geometryType:E,hasM:a,hasZ:c}),timeInfo:R,cacheSpatialQueries:!0}),!s||!s.length)return this._nextObjectId=u.L,q;const A=(0,u.H)(T,s);return this._nextObjectId=A+1,await(0,l.Nk)(s,F),this._loadInitialFeatures(q,s)}async applyEdits(e){const{spatialReference:t,geometryType:s}=this._queryEngine;return await Promise.all([(0,c.$1)(t,s),(0,l.Nk)(e.adds,t),(0,l.Nk)(e.updates,t)]),this._applyEdits(e)}queryFeatures(e,t={}){return this._queryEngine.executeQuery(e,t.signal)}queryFeatureCount(e,t={}){return this._queryEngine.executeQueryForCount(e,t.signal)}queryObjectIds(e,t={}){return this._queryEngine.executeQueryForIds(e,t.signal)}queryExtent(e,t={}){return this._queryEngine.executeQueryForExtent(e,t.signal)}querySnapping(e,t={}){return this._queryEngine.executeQueryForSnapping(e,t.signal)}_inferLayerProperties(e,t){let s,i,r=null,a=null,u=null;for(const o of e){const e=o.geometry;if(null!=e&&(r||(r=(0,n.$B)(e)),a||(a=e.spatialReference),null==s&&(s=b(e)),null==i&&(i=F(e)),r&&a&&null!=s&&null!=i))break}if(t&&t.length){let e=null;t.some((t=>{const s="esriFieldTypeOID"===t.type,i=!t.type&&t.name&&"objectid"===t.name.toLowerCase();return e=t,s||i}))&&(u=e.name)}return{geometryType:r,spatialReference:a,objectIdField:u,hasM:i,hasZ:s}}async _loadInitialFeatures(e,t){const{geometryType:s,hasM:i,hasZ:r,objectIdField:u,spatialReference:o,featureStore:d}=this._queryEngine,p=[];for(const a of t){if(null!=a.uid&&(e.assignedObjectIds[a.uid]=-1),a.geometry&&s!==(0,n.$B)(a.geometry)){e.featureErrors.push((0,c.Yx)("Incorrect geometry type."));continue}const t=this._createDefaultAttributes(),i=(0,c.MB)(this._fieldsIndex,t,a.attributes,!0,e.warnings);i?e.featureErrors.push(i):(this._assignObjectId(t,a.attributes,!0),a.attributes=t,null!=a.uid&&(e.assignedObjectIds[a.uid]=a.attributes[u]),null!=a.geometry&&(a.geometry=(0,l.Cv)(a.geometry,a.geometry.spatialReference,o)),p.push(a))}d.addMany((0,a.Di)([],p,s,r,i,u));const{fullExtent:y,timeExtent:f}=await this._queryEngine.fetchRecomputedExtents();if(e.layerDefinition.extent=y,f){const{start:t,end:s}=f;e.layerDefinition.timeInfo.timeExtent=[t,s]}return e}async _applyEdits(e){const{adds:t,updates:s,deletes:i}=e,n={addResults:[],deleteResults:[],updateResults:[],uidToObjectId:{}};if(t&&t.length&&this._applyAddEdits(n,t),s&&s.length&&this._applyUpdateEdits(n,s),i&&i.length){for(const e of i)n.deleteResults.push((0,c.bP)(e));this._queryEngine.featureStore.removeManyById(i)}const{fullExtent:r,timeExtent:a}=await this._queryEngine.fetchRecomputedExtents();return{extent:r,timeExtent:a,featureEditResults:n}}_applyAddEdits(e,t){const{addResults:s}=e,{geometryType:i,hasM:r,hasZ:u,objectIdField:o,spatialReference:d,featureStore:p}=this._queryEngine,y=[];for(const a of t){if(a.geometry&&i!==(0,n.$B)(a.geometry)){s.push((0,c.Yx)("Incorrect geometry type."));continue}const t=this._createDefaultAttributes(),r=(0,c.MB)(this._fieldsIndex,t,a.attributes);if(r)s.push(r);else{if(this._assignObjectId(t,a.attributes),a.attributes=t,null!=a.uid){const t=a.attributes[o];e.uidToObjectId[a.uid]=t}if(null!=a.geometry){const e=a.geometry.spatialReference??d;a.geometry=(0,l.Cv)((0,c.CR)(a.geometry,e),e,d)}y.push(a),s.push((0,c.bP)(a.attributes[o]))}}p.addMany((0,a.Di)([],y,i,u,r,o))}_applyUpdateEdits({updateResults:e},t){const{geometryType:s,hasM:i,hasZ:r,objectIdField:u,spatialReference:o,featureStore:d}=this._queryEngine;for(const p of t){const{attributes:t,geometry:y}=p,f=t&&t[u];if(null==f){e.push((0,c.Yx)(`Identifier field ${u} missing`));continue}if(!d.has(f)){e.push((0,c.Yx)(`Feature with object id ${f} missing`));continue}const h=(0,a.oN)(d.getFeature(f),s,r,i);if(null!=y){if(s!==(0,n.$B)(y)){e.push((0,c.Yx)("Incorrect geometry type."));continue}const t=y.spatialReference??o;h.geometry=(0,l.Cv)((0,c.CR)(y,t),t,o)}if(t){const s=(0,c.MB)(this._fieldsIndex,h.attributes,t);if(s){e.push(s);continue}}d.add((0,a.E2)(h,s,r,i,u)),e.push((0,c.bP)(f))}}_assignObjectId(e,t,s=!1){const i=this._queryEngine.objectIdField;s&&t&&isFinite(t[i])?e[i]=t[i]:e[i]=this._nextObjectId++}}},37238:function(e,t,s){s.d(t,{F0:function(){return u},Vx:function(){return d},e2:function(){return p},f:function(){return c}});var i=s(51020),n=s(1834),r=s(31004),a=s(25138);function u(e){return{renderer:{type:"simple",symbol:"esriGeometryPoint"===e||"esriGeometryMultipoint"===e?a.Cb:"esriGeometryPolyline"===e?a.yM:a.WR}}}const o=/^[_$a-zA-Z][_$a-zA-Z0-9]*$/;let l=1;function d(e,t){if((0,i.A)("geoscene-csp-restrictions"))return()=>({[t]:null,...e});try{let s=`this.${t} = null;`;for(const t in e)s+=`this${o.test(t)?`.${t}`:`["${t}"]`} = ${JSON.stringify(e[t])};`;const i=new Function(`\n      return class AttributesClass$${l++} {\n        constructor() {\n          ${s};\n        }\n      }\n    `)();return()=>new i}catch(s){return()=>({[t]:null,...e})}}function p(e={}){return[{name:"New Feature",description:"",prototype:{attributes:(0,n.o8)(e)}}]}function c(e,t){return{analytics:{supportsCacheHint:!1},attachment:null,data:{isVersioned:!1,supportsAttachment:!1,supportsM:!1,supportsZ:e},metadata:{supportsAdvancedFieldProperties:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:t,supportsDelete:t,supportsEditing:t,supportsChangeTracking:!1,supportsQuery:!0,supportsQueryAnalytics:!1,supportsQueryAttachments:!1,supportsQueryTopFeatures:!1,supportsResizeAttachments:!1,supportsSync:!1,supportsUpdate:t,supportsExceedsLimitStatistics:!0,supportsAsyncConvert3D:!1},query:r.F,queryRelated:{supportsCount:!0,supportsOrderBy:!0,supportsPagination:!0,supportsCacheHint:!1},queryTopFeatures:{supportsCacheHint:!1},editing:{supportsGeometryUpdate:t,supportsGlobalId:!1,supportsReturnServiceEditsInSourceSpatialReference:!1,supportsRollbackOnFailure:!1,supportsUpdateWithoutM:!1,supportsUploadWithItemId:!1,supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1,supportsAsyncApplyEdits:!1}}}}}]);
//# sourceMappingURL=6404.6e44534d.js.map