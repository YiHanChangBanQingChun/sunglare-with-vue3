"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[3073],{90627:function(e,t,n){n.d(t,{B:function(){return p},GP:function(){return a},qg:function(){return d}});n(44114);var i=n(79547),r=n(77728);const s={ar:[".",","],bg:[","," "],bs:[",","."],ca:[",","."],cs:[","," "],da:[",","."],de:[",","."],"de-ch":[".","’"],el:[",","."],en:[".",","],"en-au":[".",","],es:[",","."],"es-mx":[".",","],et:[","," "],fi:[","," "],fr:[","," "],"fr-ch":[","," "],he:[".",","],hi:[".",",","#,##,##0.###"],hr:[",","."],hu:[","," "],id:[",","."],it:[",","."],"it-ch":[".","’"],ja:[".",","],ko:[".",","],lt:[","," "],lv:[","," "],mk:[",","."],nb:[","," "],nl:[",","."],pl:[","," "],pt:[",","."],"pt-pt":[","," "],ro:[",","."],ru:[","," "],sk:[","," "],sl:[",","."],sr:[",","."],sv:[","," "],th:[".",","],tr:[",","."],uk:[","," "],vi:[",","."],zh:[".",","]};function o(e=(0,r.JK)()){let t=(e=e.toLowerCase())in s;if(!t){const n=e.split("-");n.length>1&&n[0]in s&&(e=n[0],t=!0),t||(e="en")}const[n,i,o="#,##0.###"]=s[e];return{decimal:n,group:i,pattern:o}}function a(e,t){const n=o((t={...t}).locale);t.customs=n;const i=t.pattern||n.pattern;return isNaN(e)||Math.abs(e)===1/0?null:u(e,i,t)}const l=/[#0,]*[#0](?:\.0*#*)?/;function u(e,t,n){const i=(n=n||{}).customs.group,r=n.customs.decimal,s=t.split(";"),o=s[0];if((t=s[e<0?1:0]||"-"+o).includes("%"))e*=100;else if(t.includes("‰"))e*=1e3;else{if(t.includes("¤"))throw new Error("currency notation not supported");if(t.includes("E"))throw new Error("exponential notation not supported")}const a=l,u=o.match(a);if(!u)throw new Error("unable to find a number expression in pattern: "+t);return!1===n.fractional&&(n.places=0),t.replace(a,c(e,u[0],{decimal:r,group:i,places:n.places,round:n.round}))}function c(e,t,n){!0===(n=n||{}).places&&(n.places=0),n.places===1/0&&(n.places=6);const i=t.split("."),r="string"==typeof n.places&&n.places.indexOf(",");let s=n.places;r?s=n.places.substring(r+1):+s>=0||(s=(i[1]||[]).length),n.round<0||(e=Number(e.toFixed(Number(s))));const o=String(Math.abs(e)).split("."),a=o[1]||"";if(i[1]||n.places){r&&(n.places=n.places.substring(0,r));const e=void 0!==n.places?n.places:i[1]&&i[1].lastIndexOf("0")+1;+e>a.length&&(o[1]=a.padEnd(Number(e),"0")),+s<a.length&&(o[1]=a.substr(0,Number(s)))}else o[1]&&o.pop();const l=i[0].replace(",","");let u=l.indexOf("0");-1!==u&&(u=l.length-u,u>o[0].length&&(o[0]=o[0].padStart(u,"0")),l.includes("#")||(o[0]=o[0].substr(o[0].length-u)));let c,p,d=i[0].lastIndexOf(",");if(-1!==d){c=i[0].length-d-1;const e=i[0].substr(0,d);d=e.lastIndexOf(","),-1!==d&&(p=e.length-d-1)}const f=[];for(let h=o[0];h;){const e=h.length-c;f.push(e>0?h.substr(e):h),h=e>0?h.slice(0,e):"",p&&(c=p,p=void 0)}return o[0]=f.reverse().join(n.group||","),o.join(n.decimal||".")}function p(e){const t=o((e=e||{}).locale),n=e.pattern||t.pattern,r=t.group,s=t.decimal;let a=1;if(n.includes("%"))a/=100;else if(n.includes("‰"))a/=1e3;else if(n.includes("¤"))throw new Error("currency notation not supported");const u=n.split(";");1===u.length&&u.push("-"+u[0]);const c=m(u,(t=>(t="(?:"+(0,i.Cj)(t,".")+")").replace(l,(t=>{const n={signed:!1,separator:e.strict?r:[r,""],fractional:e.fractional,decimal:s,exponent:!1},i=t.split(".");let o=e.places;1===i.length&&1!==a&&(i[1]="###"),1===i.length||0===o?n.fractional=!1:(void 0===o&&(o=e.pattern?i[1].lastIndexOf("0")+1:1/0),o&&null==e.fractional&&(n.fractional=!0),!e.places&&+o<i[1].length&&(o+=","+i[1].length),n.places=o);const l=i[0].split(",");return l.length>1&&(n.groupSize=l.pop().length,l.length>1&&(n.groupSize2=l.pop().length)),"("+f(n)+")"}))),!0);return{regexp:c.replaceAll(/[\xa0 ]/g,"[\\s\\xa0]"),group:r,decimal:s,factor:a}}function d(e,t){const n=p(t),i=new RegExp("^"+n.regexp+"$").exec(e);if(!i)return NaN;let r=i[1];if(!i[1]){if(!i[2])return NaN;r=i[2],n.factor*=-1}return r=r.replaceAll(new RegExp("["+n.group+"\\s\\xa0]","g"),"").replace(n.decimal,"."),Number(r)*n.factor}function f(e){"places"in(e=e||{})||(e.places=1/0),"string"!=typeof e.decimal&&(e.decimal="."),"fractional"in e&&!/^0/.test(String(e.places))||(e.fractional=[!0,!1]),"exponent"in e||(e.exponent=[!0,!1]),"eSigned"in e||(e.eSigned=[!0,!1]);const t=h(e),n=m(e.fractional,(t=>{let n="";return t&&0!==e.places&&(n="\\"+e.decimal,e.places===1/0?n="(?:"+n+"\\d+)?":n+="\\d{"+e.places+"}"),n}),!0);let i=t+n;return n&&(i="(?:(?:"+i+")|(?:"+n+"))"),i+m(e.exponent,(t=>t?"([eE]"+h({signed:e.eSigned})+")":""))}function h(e){return"signed"in(e=e||{})||(e.signed=[!0,!1]),"separator"in e?"groupSize"in e||(e.groupSize=3):e.separator="",m(e.signed,(e=>e?"[-+]":""),!0)+m(e.separator,(t=>{if(!t)return"(?:\\d+)";" "===(t=(0,i.Cj)(t))?t="\\s":" "===t&&(t="\\s\\xa0");const n=e.groupSize,r=e.groupSize2;if(r){const e="(?:0|[1-9]\\d{0,"+(r-1)+"}(?:["+t+"]\\d{"+r+"})*["+t+"]\\d{"+n+"})";return n-r>0?"(?:"+e+"|(?:0|[1-9]\\d{0,"+(n-1)+"}))":e}return"(?:0|[1-9]\\d{0,"+(n-1)+"}(?:["+t+"]\\d{"+n+"})*)"}),!0)}const m=(e,t,n)=>{if(!(e instanceof Array))return t(e);const i=[];for(let r=0;r<e.length;r++)i.push(t(e[r]));return g(i.join("|"),Boolean(n))},g=(e,t)=>"("+(t?"?:":"")+e+")"},33073:function(e,t,n){n.r(t),n.d(t,{default:function(){return W}});n(44114),n(2516);var i=n(86039),r=n(49067),s=n(47966),o=n(15114),a=n(71120),l=n(4244),u=n(39582),c=n(85508),p=n(72465),d=n(30075),f=n(32066),h=n(47086),m=n(29153),g=n(33292),y=n(86121),w=(n(17642),n(58004),n(33853),n(45876),n(32475),n(15024),n(31698),n(90627)),F=n(30104);const x=/^\s*"([\S\s]*)"\s*$/,b=/""/g,I="\n",_=[","," ",";","|","\t"];function*N(e,t,n){let i=0;for(;i<=e.length;){const r=e.indexOf(t,i),s=e.substring(i,r>-1?r:void 0);i+=s.length+t.length,n&&!s.trim()||(yield s)}}function E(e){const t=e.includes("\r\n")?"\r\n":I;return N(e,t,!0)}function S(e,t){return N(e,t,!1)}function T(e,t,n){e=e.trim(),t=t?.trim();const i=[],r=Array.from(new Set([n?.delimiter,..._])).filter((e=>null!=e));for(const o of r){const n=O(e,o).length,r=O(t,o).length??n;n>1&&i.push({weight:Math.min(n,r),delimiter:o})}const s=i.sort((({weight:e},{weight:t})=>t-e)).map((({delimiter:e})=>e));for(const o of s){const t=k(C(e,o).names,n?.longitudeField,n?.latitudeField);if(t.longitudeFieldName&&t.latitudeFieldName)return{delimiter:o,locationInfo:t}}return{delimiter:s[0],locationInfo:null}}function*A(e,t,n,i=()=>Object.create(null)){const r=E(e);r.next();let s="",o="",a=0,l=i(),u=0;e:for(const c of r){const e=S(c,n);for(const r of e)if(s+=o+r,o="",a+=v(r),a%2==0){if(a>0){const e=x.exec(s);if(!e){l=i(),u=0,s="",a=0;continue e}l[t[u]]=e[1].replaceAll(b,'"'),u++}else l[t[u]]=s,u++;s="",a=0}else o=n;0===a?(yield l,l=i(),u=0):o=I}}function C(e,t){const n=O(e,t).filter((e=>null!=e)),i=n.map((e=>(0,F.rS)(e)));for(let r=i.length-1;r>=0;r--)i[r]||(i.splice(r,1),n.splice(r,1));return{names:i,aliases:n}}function O(e,t){if(!e?.length)return[];const n=[];let i="",r="",s=0;const o=S(e,t);for(const a of o)if(i+=r+a,r="",s+=v(a),s%2==0){if(s>0){const e=x.exec(i);e&&n.push(e[1].replaceAll(b,'"'))}else n.push(i);i="",s=0}else r=t;return n}function v(e){let t=0,n=0;for(n=e.indexOf('"',n);n>=0;)t++,n=e.indexOf('"',n+1);return t}function k(e,t,n){t=(0,F.rS)(t)?.toLowerCase(),n=(0,F.rS)(n)?.toLowerCase();const i=e.map((e=>e.toLowerCase())),r=t?e[i.indexOf(t)]:null,s=n?e[i.indexOf(n)]:null;return{longitudeFieldName:r||e[i.indexOf(G.find((e=>i.includes(e))))],latitudeFieldName:s||e[i.indexOf(V.find((e=>i.includes(e))))]}}function q(e,t,n,i,r){const s=[],o=A(e,n,t),a=[];for(const l of o){if(10===a.length)break;a.push(l)}for(let l=0;l<n.length;l++){const e=n[l],t=i[l];if(e===r.longitudeFieldName||e===r.latitudeFieldName)s.push({name:e,type:"esriFieldTypeDouble",alias:t});else{let n,i;switch(j(a.map((t=>t[e])))){case"integer":n="esriFieldTypeInteger";break;case"double":n="esriFieldTypeDouble";break;case"date":n="esriFieldTypeDate",i=36;break;default:n="esriFieldTypeString",i=255}s.push({name:e,type:n,alias:t,length:i})}}return s}function j(e){if(!e.length)return"string";const t=/[^+-.,0-9]/;return e.map((e=>{let n=!1;if(""!==e){if(t.test(e))n=!0;else{let t=R(e);if(!isNaN(t))return/[.,]/.test(e)||!Number.isInteger(t)||t>214783647||t<-214783648?"double":"integer";if(e.includes("E")){if(t=Number(e),!isNaN(t))return"double";if(e.includes(",")){if(e=e.replace(",","."),t=Number(e),!isNaN(t))return"double";n=!0}else n=!0}else n=!0}return n?/^[-]?\d*[.,]?\d*$/.test(e)?"string":D(new Date(e),e)?"date":"string":"string"}})).reduce(((e,t)=>void 0===e?t:void 0===t?e:e===t?t:"string"===e||"string"===t?"string":"double"===e||"double"===t?"double":void 0))}function D(e,t){if(!e||"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))return!1;let n=!0;if(!$&&/\d+\W*$/.test(t)){const e=t.match(/[a-zA-Z]{2,}/);if(e){let t=!1,i=0;for(;!t&&i<=e.length;)t=!P.test(e[i]),i++;n=!t}}return n}const R=function(){const e=(0,w.B)(),t=new RegExp("^"+e.regexp+"$"),n=new RegExp("["+e.group+"\\s\\xa0]","g"),i=e.factor;return r=>{const s=t.exec(r);if(e.factor=i,!s)return NaN;let o=s[1];if(!s[1]){if(!s[2])return NaN;o=s[2],e.factor*=-1}return o=o.replace(n,"").replace(e.decimal,"."),+o*e.factor}}(),P=/^((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may)|(jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?)|(am)|(pm)|(gmt)|(utc))$/i,$=Number.isNaN(new Date("technology 10").getTime()),V=["lat","latitude","latitude83","latdecdeg","lat_dd","y","ycenter","point_y"],G=["lon","lng","long","longitude","longitude83","longdecdeg","long_dd","x","xcenter","point_x"];var z=n(37238),L=n(27678),M=n(12790);const Q=(0,z.F0)("esriGeometryPoint"),B=["csv"],U=[0,0];class Z{constructor(e,t){this.x=e,this.y=t}}class W{constructor(){this._queryEngine=null,this._snapshotFeatures=async e=>{const t=await this._fetch(e);return this._createFeatures(t)}}destroy(){this._queryEngine?.destroy(),this._queryEngine=null}async load(e,t={}){this._loadOptions=e;const[n]=await Promise.all([this._fetch(t.signal),this._checkProjection(e?.parsingOptions?.spatialReference)]),i=J(n,e);this._locationInfo=i.locationInfo,this._delimiter=i.delimiter,this._queryEngine=this._createQueryEngine(i);const r=await this._createFeatures(n);this._queryEngine.featureStore.addMany(r);const{fullExtent:s,timeExtent:o}=await this._queryEngine.fetchRecomputedExtents();if(i.layerDefinition.extent=s,o){const{start:e,end:t}=o;i.layerDefinition.timeInfo.timeExtent=[e,t]}return i}async applyEdits(){throw new s.A("csv-layer:editing-not-supported","applyEdits() is not supported on CSVLayer")}async queryFeatures(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQuery(e,t.signal)}async queryFeatureCount(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForCount(e,t.signal)}async queryObjectIds(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForIds(e,t.signal)}async queryExtent(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForExtent(e,t.signal)}async querySnapping(e,t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForSnapping(e,t.signal)}async refresh(e){this._loadOptions.customParameters=e,this._snapshotTask?.abort(),this._snapshotTask=(0,r.UT)(this._snapshotFeatures),this._snapshotTask.promise.then((e=>{this._queryEngine.featureStore.clear(),e&&this._queryEngine.featureStore.addMany(e)}),(e=>{this._queryEngine.featureStore.clear(),(0,a.zf)(e)||o.A.getLogger("geoscene.layers.CSVLayer").error(new s.A("csv-layer:refresh","An error occurred during refresh",{error:e}))})),await this._waitSnapshotComplete();const{fullExtent:t,timeExtent:n}=await this._queryEngine.fetchRecomputedExtents();return{extent:t,timeExtent:n}}async _waitSnapshotComplete(){if(this._snapshotTask&&!this._snapshotTask.finished){try{await this._snapshotTask.promise}catch{}return this._waitSnapshotComplete()}}async _fetch(e){const{url:t,customParameters:n}=this._loadOptions;if(!t)throw new s.A("csv-layer:invalid-source","url not defined");const r=(0,l.An)(t);return(await(0,i["default"])(r.path,{query:{...r.query,...n},responseType:"text",signal:e})).data}_createQueryEngine(e){const{objectIdField:t,fields:n,extent:i,timeInfo:r}=e.layerDefinition,s=new m.A({geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1});return new y.d({fields:n,geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1,timeInfo:r,objectIdField:t,spatialReference:i.spatialReference||{wkid:4326},cacheSpatialQueries:!0,featureStore:s})}async _createFeatures(e){const{latitudeFieldName:t,longitudeFieldName:n}=this._locationInfo,{objectIdField:i,fieldsIndex:r,spatialReference:s}=this._queryEngine;let o=[];const a=[],l=r.fields.filter((e=>e.name!==i)).map((e=>e.name));let m=0;const g={};for(const u of r.fields)if("esriFieldTypeOID"!==u.type&&"esriFieldTypeGlobalID"!==u.type){const e=(0,F.lD)(u);void 0!==e&&(g[u.name]=e)}const y=A(e,l,this._delimiter,(0,z.Vx)(g,i));for(const u of y){const e=this._parseCoordinateValue(u[t]),s=this._parseCoordinateValue(u[n]);if(null!=s&&null!=e&&!isNaN(e)&&!isNaN(s)){u[t]=e,u[n]=s;for(const e in u)if(e!==t&&e!==n)if(r.isDateField(e)){const t=new Date(u[e]);u[e]=D(t,u[e])?t.getTime():null}else if(r.isNumericField(e)){const t=R(u[e]);isNaN(t)?u[e]=null:u[e]=t}u[i]=m,m++,o.push(new Z(s,e)),a.push(u)}}if(!(0,p.aI)({wkid:4326},s))if((0,p.K8)(s))for(const u of o)[u.x,u.y]=(0,d.je)(u.x,u.y,U);else o=(0,u.lK)(c.g,o,M.A.WGS84,s,null,null);const w=[];for(let u=0;u<o.length;u++){const{x:e,y:t}=o[u],n=a[u];n[i]=u+1,w.push(new f.Om(new h.A([],[e,t]),n,null,n[i]))}return w}_parseCoordinateValue(e){if(null==e||""===e)return null;let t=R(e);return(isNaN(t)||Math.abs(t)>181)&&(t=parseFloat(e)),t}async _checkProjection(e){try{await(0,g.Nk)(p.w5,e)}catch{throw new s.A("csv-layer:projection-not-supported","Projection not supported")}}}function J(e,t){const n=t.parsingOptions||{},i={delimiter:n.delimiter,layerDefinition:null,locationInfo:{latitudeFieldName:n.latitudeField,longitudeFieldName:n.longitudeField}},r=i.layerDefinition={name:(0,l.e7)(t.url,B)||"csv",drawingInfo:Q,geometryType:"esriGeometryPoint",objectIdField:null,fields:[],timeInfo:n.timeInfo,extent:{xmin:Number.POSITIVE_INFINITY,ymin:Number.POSITIVE_INFINITY,xmax:Number.NEGATIVE_INFINITY,ymax:Number.NEGATIVE_INFINITY,spatialReference:n.spatialReference||{wkid:4326}}},o=E(e),a=o.next().value?.trim(),u=o.next().value?.trim();if(!a)throw new s.A("csv-layer:empty-csv","CSV is empty",{csv:e});const{delimiter:c,locationInfo:p}=T(a,u,n);if(!c)throw new s.A("csv-layer:invalid-delimiter","Unable to detect the delimiter from CSV",{firstLine:a,secondLine:u,parsingOptions:n});if(!p)throw new s.A("csv-layer:location-fields-not-found","Unable to identify latitude and longitude fields from the CSV file",{firstLine:a,secondLine:u,parsingOptions:n});i.locationInfo=p,i.delimiter=c;const{names:d,aliases:f}=C(a,c),h=q(e,i.delimiter,d,f,i.locationInfo);if(n.fields?.length){const e=new L.A(n.fields);for(const t of h){const n=e.get(t.name);n&&Object.assign(t,n)}}if(!h.some((e=>"esriFieldTypeOID"===e.type&&(r.objectIdField=e.name,!0)))){const e={name:"__OBJECTID",alias:"__OBJECTID",type:"esriFieldTypeOID",editable:!1,nullable:!1};r.objectIdField=e.name,h.unshift(e)}r.fields=h;const m=new L.A(r.fields);if(i.locationInfo&&(i.locationInfo.latitudeFieldName=m.get(i.locationInfo.latitudeFieldName).name,i.locationInfo.longitudeFieldName=m.get(i.locationInfo.longitudeFieldName).name),r.timeInfo){const e=r.timeInfo;if(e.startTimeField){const t=m.get(e.startTimeField);t?(e.startTimeField=t.name,t.type="esriFieldTypeDate"):e.startTimeField=null}if(e.endTimeField){const t=m.get(e.endTimeField);t?(e.endTimeField=t.name,t.type="esriFieldTypeDate"):e.endTimeField=null}if(e.trackIdField){const t=m.get(e.trackIdField);e.trackIdField=t?t.name:null}e.startTimeField||e.endTimeField||(r.timeInfo=null)}return i}},37238:function(e,t,n){n.d(t,{F0:function(){return a},Vx:function(){return c},e2:function(){return p},f:function(){return d}});var i=n(51020),r=n(1834),s=n(31004),o=n(25138);function a(e){return{renderer:{type:"simple",symbol:"esriGeometryPoint"===e||"esriGeometryMultipoint"===e?o.Cb:"esriGeometryPolyline"===e?o.yM:o.WR}}}const l=/^[_$a-zA-Z][_$a-zA-Z0-9]*$/;let u=1;function c(e,t){if((0,i.A)("geoscene-csp-restrictions"))return()=>({[t]:null,...e});try{let n=`this.${t} = null;`;for(const t in e)n+=`this${l.test(t)?`.${t}`:`["${t}"]`} = ${JSON.stringify(e[t])};`;const i=new Function(`\n      return class AttributesClass$${u++} {\n        constructor() {\n          ${n};\n        }\n      }\n    `)();return()=>new i}catch(n){return()=>({[t]:null,...e})}}function p(e={}){return[{name:"New Feature",description:"",prototype:{attributes:(0,r.o8)(e)}}]}function d(e,t){return{analytics:{supportsCacheHint:!1},attachment:null,data:{isVersioned:!1,supportsAttachment:!1,supportsM:!1,supportsZ:e},metadata:{supportsAdvancedFieldProperties:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:t,supportsDelete:t,supportsEditing:t,supportsChangeTracking:!1,supportsQuery:!0,supportsQueryAnalytics:!1,supportsQueryAttachments:!1,supportsQueryTopFeatures:!1,supportsResizeAttachments:!1,supportsSync:!1,supportsUpdate:t,supportsExceedsLimitStatistics:!0,supportsAsyncConvert3D:!1},query:s.F,queryRelated:{supportsCount:!0,supportsOrderBy:!0,supportsPagination:!0,supportsCacheHint:!1},queryTopFeatures:{supportsCacheHint:!1},editing:{supportsGeometryUpdate:t,supportsGlobalId:!1,supportsReturnServiceEditsInSourceSpatialReference:!1,supportsRollbackOnFailure:!1,supportsUpdateWithoutM:!1,supportsUploadWithItemId:!1,supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1,supportsAsyncApplyEdits:!1}}}}}]);
//# sourceMappingURL=3073.b123bc7e.js.map