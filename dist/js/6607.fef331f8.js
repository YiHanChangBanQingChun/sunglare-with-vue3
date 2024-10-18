"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[6607],{95477:function(e,t,n){n.d(t,{BM:function(){return v},bd:function(){return R},sO:function(){return E},xD:function(){return u}});n(44114),n(17642),n(58004),n(33853),n(45876),n(32475),n(15024),n(31698);var r=n(47966),o=n(32066),i=n(47086),a=n(30104);const s={LineString:"esriGeometryPolyline",MultiLineString:"esriGeometryPolyline",MultiPoint:"esriGeometryMultipoint",Point:"esriGeometryPoint",Polygon:"esriGeometryPolygon",MultiPolygon:"esriGeometryPolygon"};function u(e){return s[e]}function*c(e){switch(e.type){case"Feature":yield e;break;case"FeatureCollection":for(const t of e.features)t&&(yield t)}}function*l(e){if(e)switch(e.type){case"Point":yield e.coordinates;break;case"LineString":case"MultiPoint":yield*e.coordinates;break;case"MultiLineString":case"Polygon":for(const t of e.coordinates)yield*t;break;case"MultiPolygon":for(const t of e.coordinates)for(const e of t)yield*e}}function*p(e,t={}){const{geometryType:n,objectIdField:r}=t;for(const a of e){const{geometry:e,properties:s,id:c}=a;if(e&&u(e.type)!==n)continue;const l=s||{};let p;r&&(p=l[r],null==c||p||(l[r]=p=c));const f=new o.Om(e?w(new i.A,e,t):null,l,null,p??void 0);yield f}}function f(e){for(const t of e)if(t.length>2)return!0;return!1}function y(e){return!m(e)}function d(e){return m(e)}function m(e){let t=0;for(let n=0;n<e.length;n++){const r=e[n],o=e[(n+1)%e.length];t+=r[0]*o[1]-o[0]*r[1]}return t<=0}function g(e){const t=e[0],n=e[e.length-1];return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]||e.push(t),e}function w(e,t,n){switch(t.type){case"LineString":return h(e,t,n);case"MultiLineString":return b(e,t,n);case"MultiPoint":return F(e,t,n);case"MultiPolygon":return T(e,t,n);case"Point":return S(e,t,n);case"Polygon":return A(e,t,n)}}function h(e,t,n){return P(e,t.coordinates,n),e}function b(e,t,n){for(const r of t.coordinates)P(e,r,n);return e}function F(e,t,n){return P(e,t.coordinates,n),e}function T(e,t,n){for(const r of t.coordinates){x(e,r[0],n);for(let t=1;t<r.length;t++)C(e,r[t],n)}return e}function S(e,t,n){return k(e,t.coordinates,n),e}function A(e,t,n){const r=t.coordinates;x(e,r[0],n);for(let o=1;o<r.length;o++)C(e,r[o],n);return e}function x(e,t,n){const r=g(t);y(r)?N(e,r,n):P(e,r,n)}function C(e,t,n){const r=g(t);d(r)?N(e,r,n):P(e,r,n)}function P(e,t,n){for(const r of t)k(e,r,n);e.lengths.push(t.length)}function N(e,t,n){for(let r=t.length-1;r>=0;r--)k(e,t[r],n);e.lengths.push(t.length)}function k(e,t,n){const[r,o,i]=t;e.coords.push(r,o),n.hasZ&&e.coords.push(i||0)}function G(e){switch(typeof e){case"string":return"esriFieldTypeString";case"number":return"esriFieldTypeDouble";default:return"unknown"}}function E(e){if(!e)throw new r.A("geojson-layer:empty","GeoJSON data is empty");if("Feature"!==e.type&&"FeatureCollection"!==e.type)throw new r.A("geojson-layer:unsupported-geojson-object","missing or not supported GeoJSON object type",{data:e});const{crs:t}=e;if(!t)return;const n="string"==typeof t?t:"name"===t.type?t.properties.name:"EPSG"===t.type?t.properties.code:null,o=new RegExp(".*(CRS84H?|4326)$","i");if(!n||!o.test(n))throw new r.A("geojson-layer:unsupported-crs","unsupported GeoJSON 'crs' member",{crs:t})}function v(e,t={}){const n=[],r=new Set,o=new Set;let i,s=!1,p=null,y=!1,{geometryType:d=null}=t,m=!1;for(const w of c(e)){const{geometry:e,properties:t,id:c}=w;if((!e||(d||(d=u(e.type)),u(e.type)===d))&&(s||(s=f(l(e))),y||(y=null!=c,y&&(i=typeof c,t&&(p=Object.keys(t).filter((e=>t[e]===c))))),t&&p&&y&&null!=c&&(p.length>1?p=p.filter((e=>t[e]===c)):1===p.length&&(p=t[p[0]]===c?p:[])),!m&&t)){let e=!0;for(const i in t){if(r.has(i))continue;const s=t[i];if(null==s){e=!1,o.add(i);continue}const u=G(s);if("unknown"===u){o.add(i);continue}o.delete(i),r.add(i);const c=(0,a.rS)(i);c&&n.push({name:c,alias:i,type:u})}m=e}}const g=(0,a.rS)(1===p?.length&&p[0]||null)??void 0;if(g)for(const u of n)if(u.name===g&&(0,a.WA)(u)){u.type="esriFieldTypeOID";break}return{fields:n,geometryType:d,hasZ:s,objectIdFieldName:g,objectIdFieldType:i,unknownFields:Array.from(o)}}function R(e,t){return Array.from(p(c(e),t))}},66607:function(e,t,n){n.d(t,{hs:function(){return S},mG:function(){return $},Fu:function(){return M},x$:function(){return B},O8:function(){return V},YW:function(){return _}});n(44114),n(17642),n(58004),n(33853),n(45876),n(32475),n(15024),n(31698),n(2516);var r=n(86039),o=n(47966),i=n(8091),a=n(71120),s=n(4244),u=n(39582),c=n(72465),l=n(11894),p=n(95477);function f(e){return d(e)??y(e)}function y(e){const t=new Date(e).getTime();return Number.isNaN(t)?null:t}function d(e){const t=m.exec(e);if(!t?.groups)return null;const n=t.groups,r=+n.year,o=+n.month-1,i=+n.day,a=+(n.hours??"0"),s=+(n.minutes??"0"),u=+(n.seconds??"0");if(a>23)return null;if(s>59)return null;if(u>59)return null;const c=n.ms??"0",l=c?+c.padEnd(3,"0").substring(0,3):0;let p;if(n.isUTC)p=Date.UTC(r,o,i,a,s,u,l);else if(n.offsetSign){const e=+n.offsetHours,t=+n.offsetMinutes;p=6e4*("+"===n.offsetSign?-1:1)*(60*e+t)+Date.UTC(r,o,i,a,s,u,l)}else p=new Date(r,o,i,a,s,u,l).getTime();return Number.isNaN(p)?null:p}const m=/^(?:(?<year>-?\d{4,})-(?<month>\d{2})-(?<day>\d{2}))(?:T(?<hours>\d{2}):(?<minutes>\d{2}):(?<seconds>\d{2})(?:\.(?<ms>\d+))?)?(?:(?<isUTC>Z)|(?:(?<offsetSign>\+|-)(?<offsetHours>\d{2}):(?<offsetMinutes>\d{2})))?$/;var g=n(5255),w=n(81937),h=n(12790),b=n(41759);const F="xlink:href",T="2.0.0",S="__esri_wfs_id__",A="wfs-layer:getWFSLayerTypeInfo-error",x="wfs-layer:empty-service",C="wfs-layer:feature-type-not-found",P="wfs-layer:geojson-not-supported",N="wfs-layer:kvp-encoding-not-supported",k="wfs-layer:malformed-json",G="wfs-layer:unknown-geometry-type",E="wfs-layer:unknown-field-type",v="wfs-layer:unsupported-spatial-reference",R="wfs-layer:unsupported-wfs-version";async function M(e,t){const n=j((await(0,r["default"])(e,{responseType:"text",query:{SERVICE:"WFS",REQUEST:"GetCapabilities",VERSION:T,...t?.customParameters},signal:t?.signal})).data);return O(e,n),n}function j(e){const t=Z(e);ee(t),te(t);const n=t.firstElementChild,r=(0,i.PP)(L(n));return{operations:I(n),get featureTypes(){return Array.from(r())},readFeatureTypes:r}}const D=new Set(["json","application/json","geojson","application/json; subtype=geojson"]);function I(e){let t=!1;const n={GetCapabilities:{url:""},DescribeFeatureType:{url:""},GetFeature:{url:"",outputFormat:null,supportsPagination:!1}};if((0,g.p)(e,{OperationsMetadata:{Operation:e=>{switch(e.getAttribute("name")){case"GetCapabilities":return{DCP:{HTTP:{Get:e=>{n.GetCapabilities.url=e.getAttribute(F)}}}};case"DescribeFeatureType":return{DCP:{HTTP:{Get:e=>{n.DescribeFeatureType.url=e.getAttribute(F)}}}};case"GetFeature":return{DCP:{HTTP:{Get:e=>{n.GetFeature.url=e.getAttribute(F)}}},Parameter:e=>{if("outputFormat"===e.getAttribute("name"))return{AllowedValues:{Value:e=>{const t=e.textContent;t&&D.has(t.toLowerCase())&&(n.GetFeature.outputFormat=t)}}}}}}},Constraint:e=>{switch(e.getAttribute("name")){case"KVPEncoding":return{DefaultValue:e=>{t="true"===e.textContent.toLowerCase()}};case"ImplementsResultPaging":return{DefaultValue:e=>{n.GetFeature.supportsPagination="true"===e.textContent.toLowerCase()}}}}}}),!t)throw new o.A(N,"WFS service doesn't support key/value pair (KVP) encoding");if(null==n.GetFeature.outputFormat)throw new o.A(P,"WFS service doesn't support GeoJSON output format");return n}function O(e,t){(0,s.m3)(e)&&((0,s.FX)(e,t.operations.DescribeFeatureType.url,!0)&&(t.operations.DescribeFeatureType.url=(0,s.lM)(t.operations.DescribeFeatureType.url)),(0,s.FX)(e,t.operations.GetFeature.url,!0)&&(t.operations.GetFeature.url=(0,s.lM)(t.operations.GetFeature.url)))}function L(e){return(0,g.i)(e,{FeatureTypeList:{FeatureType:e=>{const t={typeName:"undefined:undefined",name:"",title:"",description:"",extent:null,namespacePrefix:"",namespaceUri:"",supportedSpatialReferences:[]},n=new Set([4326]),r=e=>{const t=parseInt(e.textContent?.match(/(?<wkid>\d+$)/i)?.groups?.wkid??"",10);Number.isNaN(t)||n.add(t)};return(0,g.p)(e,{Name:e=>{const{name:n,prefix:r}=K(e.textContent);t.typeName=`${r}:${n}`,t.name=n,t.namespacePrefix=r,t.namespaceUri=e.lookupNamespaceURI(r)},Abstract:e=>{t.description=e.textContent},Title:e=>{t.title=e.textContent},WGS84BoundingBox:e=>{t.extent=U(e)},DefaultSRS:r,DefaultCRS:r,OtherSRS:r,OtherCRS:r}),t.title||(t.title=t.name),t.supportedSpatialReferences.push(...n),t}}})}function U(e){let t,n,r,o;for(const i of e.children)switch(i.localName){case"LowerCorner":[t,n]=i.textContent.split(" ").map((e=>Number.parseFloat(e)));break;case"UpperCorner":[r,o]=i.textContent.split(" ").map((e=>Number.parseFloat(e)))}return{xmin:t,ymin:n,xmax:r,ymax:o,spatialReference:c.w5}}function $(e,t,n){return(0,i.I6)(e,(e=>n?e.name===t&&e.namespaceUri===n:e.typeName===t||e.name===t))}async function V(e,t,n,r={}){const{featureType:o,extent:i}=await W(e,t,n,r),{fields:a,geometryType:s,swapXY:u,objectIdField:c,geometryField:l}=await X(e,o.typeName,r);return{url:e.operations.GetCapabilities.url,name:o.name,namespaceUri:o.namespaceUri,fields:a,geometryField:l,geometryType:s,objectIdField:c,spatialReference:r.spatialReference??h.A.WGS84,extent:i,swapXY:u,wfsCapabilities:e,customParameters:r.customParameters}}async function W(e,t,n,r={}){const{spatialReference:i=h.A.WGS84}=r,a=e.readFeatureTypes(),s=t?$(a,t,n):a.next().value;if(null==s)throw t?new o.A(C,`The type '${t}' could not be found in the service`):new o.A(x,"The service is empty");let l=new b.A({...s.extent,spatialReference:i});if(!(0,c.aI)(i,c.w5))try{await(0,u.initializeProjection)(c.w5,i,void 0,r),l=(0,u.Cv)(l,c.w5)}catch{throw new o.A(v,"Projection not supported")}return{extent:l,spatialReference:i,featureType:s}}async function X(e,t,n={}){const[r,i]=await(0,a.Lx)([Y(e.operations.DescribeFeatureType.url,t,n),z(e,t,n)]);if(r.error||i.error)throw new o.A(A,`An error occurred while getting info about the feature type '${t}'`,{error:r.error||i.error});const{fields:s,errors:u}=r.value??{},c=r.value?.geometryType||i.value?.geometryType,l=i.value?.swapXY??!1;if(null==c)throw new o.A(G,`The geometry type could not be determined for type '${t}`,{typeName:t,geometryType:c,fields:s,errors:u});return{..._(s??[]),geometryType:c,swapXY:l}}function _(e){const t=e.find((e=>"geometry"===e.type));let n=e.find((e=>"oid"===e.type));return e=e.filter((e=>"geometry"!==e.type)),n||(n=new w.A({name:S,type:"oid",alias:S}),e.unshift(n)),{geometryField:t?.name??null,objectIdField:n.name,fields:e}}async function z(e,t,n={}){let o,i=!1;const[a,s]=await Promise.all([B(e.operations.GetFeature.url,t,e.operations.GetFeature.outputFormat,{...n,count:1}),(0,r["default"])(e.operations.GetFeature.url,{responseType:"text",query:Q(t,void 0,{...n,count:1}),signal:n?.signal})]),u="FeatureCollection"===a.type&&a.features[0]?.geometry;if(u){let e;switch(o=l.g.fromJSON((0,p.xD)(u.type)),u.type){case"Point":e=u.coordinates;break;case"LineString":case"MultiPoint":e=u.coordinates[0];break;case"MultiLineString":case"Polygon":e=u.coordinates[0][0];break;case"MultiPolygon":e=u.coordinates[0][0][0]}const t=/<[^>]*pos[^>]*> *(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/.exec(s.data);if(t){const n=e[0].toFixed(3),r=e[1].toFixed(3),o=parseFloat(t[1]).toFixed(3);n===parseFloat(t[2]).toFixed(3)&&r===o&&(i=!0)}}return{geometryType:o,swapXY:i}}async function Y(e,t,n){return J(t,(await(0,r["default"])(e,{responseType:"text",query:{SERVICE:"WFS",REQUEST:"DescribeFeatureType",VERSION:T,TYPENAME:t,...n?.customParameters},signal:n?.signal})).data)}function J(e,t){const{name:n}=K(e),r=Z(t);te(r);const a=(0,i.I6)((0,g.i)(r.firstElementChild,{element:e=>({name:e.getAttribute("name"),typeName:K(e.getAttribute("type")).name})}),(({name:e})=>e===n));if(null!=a){const e=(0,i.I6)((0,g.i)(r.firstElementChild,{complexType:e=>e}),(e=>e.getAttribute("name")===a.typeName));if(null!=e)return H(e)}throw new o.A(C,`Type '${e}' not found in document`,{document:(new XMLSerializer).serializeToString(r)})}const q=new Set(["objectid","fid"]);function H(e){const t=[],n=[];let r;const i=(0,g.i)(e,{complexContent:{extension:{sequence:{element:e=>e}}}});for(const a of i){const i=a.getAttribute("name");if(!i)continue;let s,u;if(a.hasAttribute("type")?s=K(a.getAttribute("type")).name:(0,g.p)(a,{simpleType:{restriction:e=>(s=K(e.getAttribute("base")).name,{maxLength:e=>{u=+e.getAttribute("value")}})}}),!s)continue;const c="true"===a.getAttribute("nillable");let l=!1;switch(s.toLowerCase()){case"integer":case"nonpositiveinteger":case"negativeinteger":case"long":case"int":case"short":case"byte":case"nonnegativeinteger":case"unsignedlong":case"unsignedint":case"unsignedshort":case"unsignedbyte":case"positiveinteger":n.push(new w.A({name:i,alias:i,type:"integer",nullable:c}));break;case"float":case"double":case"decimal":n.push(new w.A({name:i,alias:i,type:"double",nullable:c}));break;case"boolean":case"string":case"gyearmonth":case"gyear":case"gmonthday":case"gday":case"gmonth":case"anyuri":case"qname":case"notation":case"normalizedstring":case"token":case"language":case"idrefs":case"entities":case"nmtoken":case"nmtokens":case"name":case"ncname":case"id":case"idref":case"entity":case"duration":case"time":n.push(new w.A({name:i,alias:i,type:"string",nullable:c,length:u??255}));break;case"datetime":case"date":n.push(new w.A({name:i,alias:i,type:"date",nullable:c,length:u??36}));break;case"pointpropertytype":r="point",l=!0;break;case"multipointpropertytype":r="multipoint",l=!0;break;case"curvepropertytype":case"multicurvepropertytype":case"multilinestringpropertytype":r="polyline",l=!0;break;case"surfacepropertytype":case"multisurfacepropertytype":case"multipolygonpropertytype":r="polygon",l=!0;break;case"geometrypropertytype":case"multigeometrypropertytype":l=!0,t.push(new o.A(G,`geometry type '${s}' is not supported`,{type:(new XMLSerializer).serializeToString(e)}));break;default:t.push(new o.A(E,`Unknown field type '${s}'`,{type:(new XMLSerializer).serializeToString(e)}))}l&&n.push(new w.A({name:i,alias:i,type:"geometry",nullable:c}))}for(const o of n)if("integer"===o.type&&!o.nullable&&q.has(o.name.toLowerCase())){o.type="oid";break}return{geometryType:r,fields:n,errors:t}}async function B(e,t,n,i){let{data:a}=await(0,r["default"])(e,{responseType:"text",query:Q(t,n,i),signal:i?.signal});a=a.replaceAll(/": +(-?\d+),(\d+)(,)?/g,'": $1.$2$3');try{if(i?.dateFields?.length){const e=new Set(i.dateFields);return JSON.parse(a,((t,n)=>e.has(t)?f(n):n))}return JSON.parse(a)}catch(s){throw new o.A(k,"Error while parsing the response",{response:a,error:s})}}function Q(e,t,n){return{SERVICE:"WFS",REQUEST:"GetFeature",VERSION:T,TYPENAMES:e,OUTPUTFORMAT:t,SRSNAME:"EPSG:4326",STARTINDEX:n?.startIndex,COUNT:n?.count,...n?.customParameters}}function Z(e){return(new DOMParser).parseFromString(e.trim(),"text/xml")}function K(e){const[t,n]=e.split(":");return{prefix:n?t:"",name:n??t}}function ee(e){const t=e.firstElementChild?.getAttribute("version");if(t&&t!==T)throw new o.A(R,`Unsupported WFS version ${t}. Supported version: ${T}`)}function te(e){let t="",n="";if((0,g.p)(e.firstElementChild,{Exception:e=>(t=e.getAttribute("exceptionCode"),{ExceptionText:e=>{n=e.textContent}})}),t)throw new o.A(`wfs-layer:${t}`,n)}},5255:function(e,t,n){function r(e,t){if(e&&t)for(const n of e.children)if(n.localName in t){const e=t[n.localName];if("function"==typeof e){const t=e(n);t&&r(n,t)}else r(n,e)}}function*o(e,t){for(const n of e.children)if(n.localName in t){const e=t[n.localName];"function"==typeof e?yield e(n):yield*o(n,e)}}n.d(t,{i:function(){return o},p:function(){return r}})}}]);
//# sourceMappingURL=6607.fef331f8.js.map