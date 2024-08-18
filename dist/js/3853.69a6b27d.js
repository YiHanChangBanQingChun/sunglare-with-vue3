"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[3853],{95477:function(e,t,n){n.d(t,{BM:function(){return C},bd:function(){return M},sO:function(){return v},xD:function(){return u}});n(44114),n(43375),n(39225),n(13972),n(99209),n(25714),n(17561),n(66197);var r=n(47966),o=n(32066),i=n(47086),s=n(30104);const a={LineString:"esriGeometryPolyline",MultiLineString:"esriGeometryPolyline",MultiPoint:"esriGeometryMultipoint",Point:"esriGeometryPoint",Polygon:"esriGeometryPolygon",MultiPolygon:"esriGeometryPolygon"};function u(e){return a[e]}function*l(e){switch(e.type){case"Feature":yield e;break;case"FeatureCollection":for(const t of e.features)t&&(yield t)}}function*c(e){if(e)switch(e.type){case"Point":yield e.coordinates;break;case"LineString":case"MultiPoint":yield*e.coordinates;break;case"MultiLineString":case"Polygon":for(const t of e.coordinates)yield*t;break;case"MultiPolygon":for(const t of e.coordinates)for(const e of t)yield*e}}function*p(e,t={}){const{geometryType:n,objectIdField:r}=t;for(const s of e){const{geometry:e,properties:a,id:l}=s;if(e&&u(e.type)!==n)continue;const c=a||{};let p;r&&(p=c[r],null==l||p||(c[r]=p=l));const d=new o.Om(e?h(new i.A,e,t):null,c,null,p??void 0);yield d}}function d(e){for(const t of e)if(t.length>2)return!0;return!1}function f(e){return!m(e)}function y(e){return m(e)}function m(e){let t=0;for(let n=0;n<e.length;n++){const r=e[n],o=e[(n+1)%e.length];t+=r[0]*o[1]-o[0]*r[1]}return t<=0}function g(e){const t=e[0],n=e[e.length-1];return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]||e.push(t),e}function h(e,t,n){switch(t.type){case"LineString":return w(e,t,n);case"MultiLineString":return b(e,t,n);case"MultiPoint":return F(e,t,n);case"MultiPolygon":return I(e,t,n);case"Point":return A(e,t,n);case"Polygon":return j(e,t,n)}}function w(e,t,n){return S(e,t.coordinates,n),e}function b(e,t,n){for(const r of t.coordinates)S(e,r,n);return e}function F(e,t,n){return S(e,t.coordinates,n),e}function I(e,t,n){for(const r of t.coordinates){k(e,r[0],n);for(let t=1;t<r.length;t++)T(e,r[t],n)}return e}function A(e,t,n){return x(e,t.coordinates,n),e}function j(e,t,n){const r=t.coordinates;k(e,r[0],n);for(let o=1;o<r.length;o++)T(e,r[o],n);return e}function k(e,t,n){const r=g(t);f(r)?P(e,r,n):S(e,r,n)}function T(e,t,n){const r=g(t);y(r)?P(e,r,n):S(e,r,n)}function S(e,t,n){for(const r of t)x(e,r,n);e.lengths.push(t.length)}function P(e,t,n){for(let r=t.length-1;r>=0;r--)x(e,t[r],n);e.lengths.push(t.length)}function x(e,t,n){const[r,o,i]=t;e.coords.push(r,o),n.hasZ&&e.coords.push(i||0)}function G(e){switch(typeof e){case"string":return"esriFieldTypeString";case"number":return"esriFieldTypeDouble";default:return"unknown"}}function v(e){if(!e)throw new r.A("geojson-layer:empty","GeoJSON data is empty");if("Feature"!==e.type&&"FeatureCollection"!==e.type)throw new r.A("geojson-layer:unsupported-geojson-object","missing or not supported GeoJSON object type",{data:e});const{crs:t}=e;if(!t)return;const n="string"==typeof t?t:"name"===t.type?t.properties.name:"EPSG"===t.type?t.properties.code:null,o=new RegExp(".*(CRS84H?|4326)$","i");if(!n||!o.test(n))throw new r.A("geojson-layer:unsupported-crs","unsupported GeoJSON 'crs' member",{crs:t})}function C(e,t={}){const n=[],r=new Set,o=new Set;let i,a=!1,p=null,f=!1,{geometryType:y=null}=t,m=!1;for(const h of l(e)){const{geometry:e,properties:t,id:l}=h;if((!e||(y||(y=u(e.type)),u(e.type)===y))&&(a||(a=d(c(e))),f||(f=null!=l,f&&(i=typeof l,t&&(p=Object.keys(t).filter((e=>t[e]===l))))),t&&p&&f&&null!=l&&(p.length>1?p=p.filter((e=>t[e]===l)):1===p.length&&(p=t[p[0]]===l?p:[])),!m&&t)){let e=!0;for(const i in t){if(r.has(i))continue;const a=t[i];if(null==a){e=!1,o.add(i);continue}const u=G(a);if("unknown"===u){o.add(i);continue}o.delete(i),r.add(i);const l=(0,s.rS)(i);l&&n.push({name:l,alias:i,type:u})}m=e}}const g=(0,s.rS)(1===p?.length&&p[0]||null)??void 0;if(g)for(const u of n)if(u.name===g&&(0,s.WA)(u)){u.type="esriFieldTypeOID";break}return{fields:n,geometryType:y,hasZ:a,objectIdFieldName:g,objectIdFieldType:i,unknownFields:Array.from(o)}}function M(e,t){return Array.from(p(l(e),t))}},37238:function(e,t,n){n.d(t,{F0:function(){return a},Vx:function(){return c},e2:function(){return p},f:function(){return d}});var r=n(51020),o=n(1834),i=n(31004),s=n(25138);function a(e){return{renderer:{type:"simple",symbol:"esriGeometryPoint"===e||"esriGeometryMultipoint"===e?s.Cb:"esriGeometryPolyline"===e?s.yM:s.WR}}}const u=/^[_$a-zA-Z][_$a-zA-Z0-9]*$/;let l=1;function c(e,t){if((0,r.A)("geoscene-csp-restrictions"))return()=>({[t]:null,...e});try{let n=`this.${t} = null;`;for(const t in e)n+=`this${u.test(t)?`.${t}`:`["${t}"]`} = ${JSON.stringify(e[t])};`;const r=new Function(`\n      return class AttributesClass$${l++} {\n        constructor() {\n          ${n};\n        }\n      }\n    `)();return()=>new r}catch(n){return()=>({[t]:null,...e})}}function p(e={}){return[{name:"New Feature",description:"",prototype:{attributes:(0,o.o8)(e)}}]}function d(e,t){return{analytics:{supportsCacheHint:!1},attachment:null,data:{isVersioned:!1,supportsAttachment:!1,supportsM:!1,supportsZ:e},metadata:{supportsAdvancedFieldProperties:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:t,supportsDelete:t,supportsEditing:t,supportsChangeTracking:!1,supportsQuery:!0,supportsQueryAnalytics:!1,supportsQueryAttachments:!1,supportsQueryTopFeatures:!1,supportsResizeAttachments:!1,supportsSync:!1,supportsUpdate:t,supportsExceedsLimitStatistics:!0,supportsAsyncConvert3D:!1},query:i.F,queryRelated:{supportsCount:!0,supportsOrderBy:!0,supportsPagination:!0,supportsCacheHint:!1},queryTopFeatures:{supportsCacheHint:!1},editing:{supportsGeometryUpdate:t,supportsGlobalId:!1,supportsReturnServiceEditsInSourceSpatialReference:!1,supportsRollbackOnFailure:!1,supportsUpdateWithoutM:!1,supportsUploadWithItemId:!1,supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1,supportsAsyncApplyEdits:!1}}}},13853:function(e,t,n){n.d(t,{GA:function(){return A},GL:function(){return w},I:function(){return T},J0:function(){return j},Ki:function(){return I},Px:function(){return F},QE:function(){return h},bV:function(){return b},bW:function(){return k},vJ:function(){return g}});n(2516);var r=n(86039),o=n(47966),i=n(15114),s=n(72465),a=n(30075),u=n(41312),l=n(83412),c=n(95477),p=n(37238),d=n(27678),f=n(65089),y=n(12790);const m=i.A.getLogger("geoscene.layers.graphics.sources.ogcfeature"),g="http://www.opengis.net/def/crs/",h=`${g}OGC/1.3/CRS84`;async function w(e,t,n={},i=5){const{links:s}=e,a=O(s,"items","application/geo+json")||O(s,"http://www.opengis.net/def/rel/ogc/1.0/items","application/geo+json");if(null==a)throw new o.A("ogc-feature-layer:missing-items-page","Missing items url");const{data:u}=await(0,r["default"])(a.href,{signal:n.signal,query:{limit:i,...n.customParameters,token:n.apiKey},headers:{accept:"application/geo+json"}});await(0,c.sO)(u);const l=(0,c.BM)(u,{geometryType:t.geometryType}),y=t.fields||l.fields||[],g=null!=t.hasZ?t.hasZ:l.hasZ,h=l.geometryType,w=t.objectIdField||l.objectIdFieldName||"OBJECTID";let b=t.timeInfo;const F=y.find((({name:e})=>e===w));if(F)F.editable=!1,F.nullable=!1;else{if(!l.objectIdFieldType)throw new o.A("ogc-feature-layer:missing-feature-id","Collection geojson require a feature id as a unique identifier");y.unshift({name:w,alias:w,type:"number"===l.objectIdFieldType?"esriFieldTypeOID":"esriFieldTypeString",editable:!1,nullable:!1})}if(w!==l.objectIdFieldName){const e=y.find((({name:e})=>e===l.objectIdFieldName));e&&(e.type="esriFieldTypeInteger")}y===l.fields&&l.unknownFields.length>0&&m.warn({name:"ogc-feature-layer:unknown-field-types",message:"Some fields types couldn't be inferred from the features and were dropped",details:{unknownFields:l.unknownFields}});for(const r of y){if(null==r.name&&(r.name=r.alias),null==r.alias&&(r.alias=r.name),"esriFieldTypeOID"!==r.type&&"esriFieldTypeGlobalID"!==r.type&&(r.editable=null==r.editable||!!r.editable,r.nullable=null==r.nullable||!!r.nullable),!r.name)throw new o.A("ogc-feature-layer:invalid-field-name","field name is missing",{field:r});if(!f.m.jsonValues.includes(r.type))throw new o.A("ogc-feature-layer:invalid-field-type",`invalid type for field "${r.name}"`,{field:r})}if(b){const e=new d.A(y);if(b.startTimeField){const t=e.get(b.startTimeField);t?(b.startTimeField=t.name,t.type="esriFieldTypeDate"):b.startTimeField=null}if(b.endTimeField){const t=e.get(b.endTimeField);t?(b.endTimeField=t.name,t.type="esriFieldTypeDate"):b.endTimeField=null}if(b.trackIdField){const t=e.get(b.trackIdField);t?b.trackIdField=t.name:(b.trackIdField=null,m.warn({name:"ogc-feature-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:b}}))}b.startTimeField||b.endTimeField||(m.warn({name:"ogc-feature-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing",details:{timeInfo:b}}),b=null)}return{drawingInfo:h?(0,p.F0)(h):null,extent:M(e),geometryType:h,fields:y,hasZ:!!g,objectIdField:w,timeInfo:b}}async function b(e,t={}){const{links:n}=e,i=O(n,"data","application/json")||O(n,"http://www.opengis.net/def/rel/ogc/1.0/data","application/json");if(null==i)throw new o.A("ogc-feature-layer:missing-collections-page","Missing collections url");const{apiKey:s,customParameters:a,signal:u}=t,{data:l}=await(0,r["default"])(i.href,{signal:u,headers:{accept:"application/json"},query:{...a,token:s}});return l}async function F(e,t={}){const{links:n}=e,i=O(n,"conformance","application/json")||O(n,"http://www.opengis.net/def/rel/ogc/1.0/conformance","application/json");if(null==i)throw new o.A("ogc-feature-layer:missing-conformance-page","Missing conformance url");const{apiKey:s,customParameters:a,signal:u}=t,{data:l}=await(0,r["default"])(i.href,{signal:u,headers:{accept:"application/json"},query:{...a,token:s}});return l}async function I(e,t={}){const{apiKey:n,customParameters:o,signal:i}=t,{data:s}=await(0,r["default"])(e,{signal:i,headers:{accept:"application/json"},query:{...o,token:n}});return s}async function A(e,t={}){const n="application/vnd.oai.openapi+json;version=3.0",o=O(e.links,"service-desc",n);if(null==o)return m.warn("ogc-feature-layer:missing-openapi-page","The OGC API-Features server does not have an OpenAPI page."),null;const{apiKey:i,customParameters:s,signal:a}=t,{data:u}=await(0,r["default"])(o.href,{signal:a,headers:{accept:n},query:{...s,token:i}});return u}function j(e){const t=/^http:\/\/www\.opengis.net\/def\/crs\/(?<authority>.*)\/(?<version>.*)\/(?<code>.*)$/i.exec(e),n=t?.groups;if(!n)return null;const{authority:r,code:o}=n;switch(r.toLowerCase()){case"ogc":switch(o.toLowerCase()){case"crs27":return y.A.GCS_NAD_1927.wkid;case"crs83":return 4269;case"crs84":case"crs84h":return y.A.WGS84.wkid;default:return null}case"esri":case"epsg":{const e=Number.parseInt(o,10);return Number.isNaN(e)?null:e}default:return null}}async function k(e,t,n){const r=await T(e,t,n);return(0,u.ZF)(r)}async function T(e,t,n){const{collection:i,layerDefinition:p,maxRecordCount:d,queryParameters:{apiKey:f,customParameters:m},spatialReference:g,supportedCrs:h}=e,{links:w}=i,b=O(w,"items","application/geo+json")||O(w,"http://www.opengis.net/def/rel/ogc/1.0/items","application/geo+json");if(null==b)throw new o.A("ogc-feature-layer:missing-items-page","Missing items url");const{geometry:F,num:I,start:A,timeExtent:j,where:k}=t;if(t.objectIds)throw new o.A("ogc-feature-layer:query-by-objectids-not-supported","Queries with objectids are not supported");const T=y.A.fromJSON(g),S=t.outSpatialReference??T,x=S.isWGS84?null:P(S,h),M=C(F,h),$=G(j),N=v(k),R=I??(null!=A&&void 0!==A?10:d),{data:q}=await(0,r["default"])(b.href,{...n,query:{...m,...M,crs:x,datetime:$,query:N,limit:R,startindex:A,token:f},headers:{accept:"application/geo+json"}});let D=!1;if(q.links){const e=q.links.find((e=>"next"===e.rel));D=!!e}!D&&Number.isInteger(q.numberMatched)&&Number.isInteger(q.numberReturned)&&(D=q.numberReturned<q.numberMatched);const{fields:W,geometryType:Z,hasZ:L,objectIdField:J}=p,E=(0,c.bd)(q,{geometryType:Z,hasZ:L,objectIdField:J});if(!x&&S.isWebMercator)for(const r of E)if(null!=r.geometry&&null!=Z){const e=(0,u.zv)(r.geometry,Z,L,!1);e.spatialReference=y.A.WGS84,r.geometry=(0,u.Ux)((0,a.Cv)(e,S))}for(const r of E)r.objectId=r.attributes[J];const B=x||!x&&S.isWebMercator?S.toJSON():s.w5,_=new l.A;return _.exceededTransferLimit=D,_.features=E,_.fields=W,_.geometryType=Z,_.hasZ=L,_.objectIdFieldName=J,_.spatialReference=B,_}function S(e){return null!=e&&"extent"===e.type}function P(e,t){const{isWebMercator:n,wkid:r}=e;if(!r)return null;const o=n?t[3857]??t[102100]??t[102113]??t[900913]:t[e.wkid];return o?`${g}${o}`:null}function x(e){if(null==e)return"";const{xmin:t,ymin:n,xmax:r,ymax:o}=e;return`${t},${n},${r},${o}`}function G(e){if(null==e)return null;const{start:t,end:n}=e;return`${null!=t?t.toISOString():".."}/${null!=n?n.toISOString():".."}`}function v(e){return null!=e&&e&&"1=1"!==e?e:null}function C(e,t){if(!S(e))return null;const{spatialReference:n}=e;if(!n||n.isWGS84)return{bbox:x(e)};const r=P(n,t);return null!=r?{bbox:x(e),"bbox-crs":r}:n.isWebMercator?{bbox:x((0,a.Cv)(e,y.A.WGS84))}:null}function M(e){const t=e.extent?.spatial;if(!t)return null;const n=t.bbox[0],r=4===n.length,o=n[0],i=n[1],s=r?void 0:n[2];return{xmin:o,ymin:i,xmax:r?n[2]:n[3],ymax:r?n[3]:n[4],zmin:s,zmax:r?void 0:n[5],spatialReference:y.A.WGS84.toJSON()}}function O(e,t,n){return e.find((e=>e.rel===t&&e.type===n))||e.find((e=>e.rel===t&&!e.type))}}}]);
//# sourceMappingURL=3853.69a6b27d.js.map