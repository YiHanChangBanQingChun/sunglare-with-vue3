"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[7137,8512],{37510:function(e,a,t){t.d(a,{Q:function(){return n}});var r=t(31763);async function n(e,a){const t=await(0,r.V)(e,a);t.layers=t.layers.filter(i);const n={serviceJSON:t};if((t.currentVersion??0)<10.5)return n;const s=await(0,r.V)(e+"/layers",a);return n.layersJSON={layers:s.layers.filter(i),tables:s.tables},n}function i(e){return!e.type||"Feature Layer"===e.type}},37493:function(e,a,t){t.d(a,{S:function(){return r}});const r={BingMapsLayer:async()=>(await t.e(5171).then(t.bind(t,55171))).default,BuildingSceneLayer:async()=>(await Promise.all([t.e(935),t.e(5770),t.e(7336),t.e(3576),t.e(6032)]).then(t.bind(t,96032))).default,CSVLayer:async()=>(await t.e(958).then(t.bind(t,60958))).default,DimensionLayer:async()=>(await t.e(5343).then(t.bind(t,95343))).default,ElevationLayer:async()=>(await t.e(5285).then(t.bind(t,65285))).default,FeatureLayer:async()=>(await Promise.resolve().then(t.bind(t,3949))).default,GeoJSONLayer:async()=>(await t.e(3443).then(t.bind(t,63443))).default,GeoRSSLayer:async()=>(await t.e(8517).then(t.bind(t,58517))).default,GroupLayer:async()=>(await t.e(9801).then(t.bind(t,9801))).default,ImageryLayer:async()=>(await Promise.all([t.e(1312),t.e(6140),t.e(7826),t.e(2665),t.e(3652),t.e(4856),t.e(51)]).then(t.bind(t,10051))).default,ImageryTileLayer:async()=>(await Promise.all([t.e(7826),t.e(1982),t.e(2665),t.e(3652),t.e(9124),t.e(4856),t.e(368)]).then(t.bind(t,10368))).default,IntegratedMeshLayer:async()=>(await Promise.all([t.e(935),t.e(2068)]).then(t.bind(t,42068))).default,KMLLayer:async()=>(await t.e(9220).then(t.bind(t,19220))).default,LineOfSightLayer:async()=>(await t.e(6774).then(t.bind(t,46774))).default,LinkChartLayer:async()=>(await Promise.all([t.e(1312),t.e(8067),t.e(2508),t.e(2765),t.e(6121),t.e(7655)]).then(t.bind(t,87655))).default,MapImageLayer:async()=>(await Promise.all([t.e(1312),t.e(6140),t.e(2060),t.e(3495),t.e(3629)]).then(t.bind(t,63629))).default,MapNotesLayer:async()=>(await t.e(5165).then(t.bind(t,25165))).default,MediaLayer:async()=>(await t.e(3571).then(t.bind(t,3571))).default,OGCFeatureLayer:async()=>(await Promise.all([t.e(1312),t.e(3853),t.e(7876)]).then(t.bind(t,39465))).default,OpenStreetMapLayer:async()=>(await t.e(689).then(t.bind(t,50689))).default,OrientedImageryLayer:async()=>(await t.e(8784).then(t.bind(t,68784))).default,PointCloudLayer:async()=>(await Promise.all([t.e(935),t.e(7405)]).then(t.bind(t,67405))).default,RouteLayer:async()=>(await Promise.all([t.e(1705),t.e(8205)]).then(t.bind(t,98205))).default,SceneLayer:async()=>(await Promise.all([t.e(935),t.e(5770),t.e(7336),t.e(3576),t.e(7886)]).then(t.bind(t,77886))).default,StreamLayer:async()=>(await t.e(7003).then(t.bind(t,67003))).default,SubtypeGroupLayer:async()=>(await t.e(7801).then(t.bind(t,37801))).default,TileLayer:async()=>(await Promise.all([t.e(1312),t.e(6140),t.e(2060),t.e(3495),t.e(688)]).then(t.bind(t,10688))).default,UnknownLayer:async()=>(await t.e(3862).then(t.bind(t,23862))).default,UnsupportedLayer:async()=>(await t.e(3017).then(t.bind(t,93017))).default,VectorTileLayer:async()=>(await Promise.all([t.e(7739),t.e(8009),t.e(6938)]).then(t.bind(t,98807))).default,VoxelLayer:async()=>(await Promise.all([t.e(935),t.e(7223)]).then(t.bind(t,27223))).default,WFSLayer:async()=>(await Promise.all([t.e(6607),t.e(6415)]).then(t.bind(t,47778))).default,WMSLayer:async()=>(await t.e(6839).then(t.bind(t,76839))).default,WMTSLayer:async()=>(await t.e(2900).then(t.bind(t,32900))).default,WebTileLayer:async()=>(await t.e(8718).then(t.bind(t,68718))).default}},39664:function(e,a,t){t.d(a,{m:function(){return s},v:function(){return i}});var r=t(4244),n=t(67681);function i(e){return{origin:"portal-item",url:(0,r.An)(e.itemUrl),portal:e.portal||n.A.getDefault(),portalItem:e,readResourcePaths:[]}}function s(e){return{origin:"portal-item",messages:[],writtenProperties:[],url:e.itemUrl?(0,r.An)(e.itemUrl):null,portal:e.portal||n.A.getDefault(),portalItem:e}}},18512:function(e,a,t){t.d(a,{WZ:function(){return N},XH:function(){return T},bO:function(){return I},load:function(){return f},z8:function(){return F}});t(44114),t(14603),t(47566),t(98721);var r=t(47966),n=t(71680),i=t(75122),s=t(37510),l=t(67681),u=t(66476),o=t(39664),c=t(58131),y=t(86103),d=t(31763);async function f(e,a){const t=e.instance.portalItem;if(t&&t.id)return await t.load(a),p(e),m(e,a)}function p(e){const a=e.instance.portalItem;if(!a?.type||!e.supportedTypes.includes(a.type))throw new r.A("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}'",{type:a?.type,expectedType:e.supportedTypes.join(", ")})}async function m(e,a){const t=e.instance,r=t.portalItem;if(!r)return;const{url:n,title:i}=r,s=(0,o.v)(r);if("group"===t.type)return t.read({title:i},s),w(t,e);n&&t.read({url:n},s);const l=await g(e,a);return l&&t.read(l,s),t.resourceReferences={portalItem:r,paths:s.readResourcePaths??[]},"subtype-group"!==t.type&&t.read({title:i},s),(0,y.L)(t,s)}async function w(e,a){let t;const{portalItem:n}=e;if(!n)return;const i=n.type,s=a.layerModuleTypeMap,l=(0,c.Y)(n,"Oriented Imagery Layer")??!1;switch(i){case"Feature Service":t=l?s.OrientedImageryLayer:s.FeatureLayer;break;case"Stream Service":t=s.StreamLayer;break;case"Scene Service":t=s.SceneLayer;break;case"Feature Collection":t=s.FeatureLayer;break;default:throw new r.A("portal:unsupported-item-type-as-group",`The item type '${i}' is not supported as a 'IGroupLayer'`)}let[u,o]=await Promise.all([t(),g(a)]),y=()=>u;if("Feature Service"===i){if(o=n.url?await I(o,n.url):{},F(o).length){const e=s.SubtypeGroupLayer,a=await e();y=e=>"SubtypeGroupLayer"===e.layerType?a:u}return h(e,y,o,await V(n.url))}return T(o)>0?h(e,y,o):L(e,y)}async function L(e,a){const{portalItem:t}=e;if(!t?.url)return;const r=await(0,d.V)(t.url);r&&h(e,a,{layers:r.layers?.map(b),tables:r.tables?.map(b)})}function b(e){return{id:e.id,name:e.name}}function h(e,a,t,r){let n=t.layers||[];const i=t.tables||[];if("Feature Collection"===e.portalItem?.type&&(n.forEach((e=>{"Table"===e?.layerDefinition?.type&&i.push(e)})),n=n.filter((e=>"Table"!==e?.layerDefinition?.type))),"coverage"in t){const a=P(t);a&&e.add(a)}n.reverse().forEach((n=>{const i=r?.(n);if(i||!r){const r=S(e,a(n),t,n,i);e.add(r)}})),i.reverse().forEach((n=>{const i=r?.(n);if(i||!r){const r=S(e,a(n),t,n,i);e.tables.add(r)}}))}function S(e,a,t,r,n){const i=e.portalItem,s=new a({portalItem:i.clone(),layerId:r.id});if("sourceJSON"in s&&(s.sourceJSON=n),"subtype-group"!==s.type&&(s.sublayerTitleMode="service-name"),"Feature Collection"===i.type){const e={origin:"portal-item",portal:i.portal||l.A.getDefault()};s.read(r,e);const a=t.showLegend;null!=a&&s.read({showLegend:a},e)}return s}async function g(e,a){if(!1===e.supportsData)return;const t=e.instance,r=t.portalItem;if(!r)return;let n=null;try{n=await r.fetchData("json",a)}catch(i){}if(M(t)){let e=null,a=!0;if(n&&T(n)>0){if(null==t.layerId){const e=F(n);t.layerId="subtype-group"===t.type?e?.[0]:N(n)}e=v(n,t),e&&(1===T(n)&&(a=!1),null!=n.showLegend&&(e.showLegend=n.showLegend))}return a&&"sublayerTitleMode"in t&&"service-name"!==t.sublayerTitleMode&&(t.sublayerTitleMode="item-title-and-service-name"),e}return n}async function I(e,a){if(null==e?.layers||null==e?.tables){const t=await(0,d.V)(a);(e=e||{}).layers=e.layers||t?.layers,e.tables=e.tables||t?.tables}return e}function N(e){const a=e.layers;if(a&&a.length)return a[0].id;const t=e.tables;return t&&t.length?t[0].id:null}function v(e,a){const{layerId:t}=a,r=e.layers?.find((e=>e.id===t))||e.tables?.find((e=>e.id===t));return r&&G(r,a)?r:null}function T(e){return(e?.layers?.length??0)+(e?.tables?.length??0)}function M(e){return"stream"!==e.type&&"oriented-imagery"!==e.type&&"layerId"in e}function P(e){const{coverage:a}=e;if(!a)return null;const t=new URL(a);if(a.toLowerCase().includes("item.html")){const e=t.searchParams.get("id"),a=t.origin;return n.A.fromPortalItem({portalItem:new u["default"]({id:e,url:a})})}if((0,i.Fi)(a))return n.A.fromGeoSceneServerUrl({url:a});throw new r.A("portal:oriented-imagery-layer-coverage","the provided coverage url couldn't be loaded as a layer")}function F(e){const a=[];return e?.layers?.forEach((e=>{"SubtypeGroupLayer"===e.layerType&&a.push(e.id)})),a}function G(e,a){return!("feature"===a.type&&"layerType"in e&&"SubtypeGroupLayer"===e.layerType||"subtype-group"===a.type&&!("layerType"in e))}async function V(e){const{layersJSON:a}=await(0,s.Q)(e);if(!a)return null;const t=[...a.layers,...a.tables];return e=>t.find((a=>a.id===e.id))}},87137:function(e,a,t){t.d(a,{fromItem:function(){return c},n:function(){return d}});var r=t(47966),n=t(46759),i=t(37493),s=t(66476),l=t(18512),u=t(58131),o=t(31763);async function c(e){!e.portalItem||e.portalItem instanceof s["default"]||(e={...e,portalItem:new s["default"](e.portalItem)});const a=await y(e.portalItem);return new(0,a.constructor)({portalItem:e.portalItem,...a.properties})}async function y(e){return await e.load(),f(await d(e))}async function d(e){switch(e.type){case"Map Service":return p(e);case"Feature Service":return m(e);case"Feature Collection":return L(e);case"Scene Service":return w(e);case"Image Service":return b(e);case"Stream Service":return h();case"Vector Tile Service":return S();case"GeoJson":return g();case"CSV":return I();case"KML":return N();case"WFS":return v();case"WMTS":return M();case"WMS":return T();case"Feed":return P();default:throw new r.A("portal:unknown-item-type","Unknown item type '${type}'",{type:e.type})}}async function f(e){const a=e.className,t=i.S[a];return{constructor:await t(),properties:e.properties}}async function p(e){return await G(e)?{className:"TileLayer"}:{className:"MapImageLayer"}}async function m(e){if((0,u.Y)(e,"Oriented Imagery Layer"))return F(e);const a=await V(e);if("object"==typeof a){const e={};return null!=a.id&&(e.layerId=a.id),{className:a.className||"FeatureLayer",properties:e}}return{className:"GroupLayer"}}async function w(e){const a=await V(e);if("object"==typeof a){const t={};let r;if(null!=a.id?(t.layerId=a.id,r=`${e.url}/layers/${a.id}`):r=e.url,e.typeKeywords?.length)for(const a of Object.keys(n.XX))if(e.typeKeywords.includes(a))return{className:n.XX[a]};const i=await(0,o.V)(r);return{className:n.XX[i?.layerType]||"SceneLayer",properties:t}}if(!1===a){const a=await(0,o.V)(e.url);return"Voxel"===a?.layerType?{className:"VoxelLayer"}:{className:"GroupLayer"}}return{className:"GroupLayer"}}async function L(e){await e.load();const a=(0,u.Y)(e,"Map Notes"),t=(0,u.Y)(e,"Markup");if(a||t)return{className:"MapNotesLayer"};if((0,u.Y)(e,"Route Layer"))return{className:"RouteLayer"};const r=await e.fetchData();return 1===(0,l.XH)(r)?{className:"FeatureLayer"}:{className:"GroupLayer"}}async function b(e){await e.load();const a=e.typeKeywords?.map((e=>e.toLowerCase()))??[];if(a.includes("elevation 3d layer"))return{className:"ElevationLayer"};if(a.includes("tiled imagery"))return{className:"ImageryTileLayer"};const t=await e.fetchData(),r=t?.layerType;if("ArcGISTiledImageServiceLayer"===r)return{className:"ImageryTileLayer"};if("ArcGISImageServiceLayer"===r)return{className:"ImageryLayer"};const n=await(0,o.V)(e.url),i=n.cacheType?.toLowerCase(),s=n.capabilities?.toLowerCase().includes("tilesonly");return"map"===i||s?{className:"ImageryTileLayer"}:{className:"ImageryLayer"}}function h(){return{className:"StreamLayer"}}function S(){return{className:"VectorTileLayer"}}function g(){return{className:"GeoJSONLayer"}}function I(){return{className:"CSVLayer"}}function N(){return{className:"KMLLayer"}}function v(){return{className:"WFSLayer"}}function T(){return{className:"WMSLayer"}}function M(){return{className:"WMTSLayer"}}function P(){return{className:"StreamLayer"}}async function F(e){return await e.load(),{className:"OrientedImageryLayer",properties:await e.fetchData()}}async function G(e){return(await(0,o.V)(e.url)).tileInfo}async function V(e){const a=e.url;if(!a||/\/\d+$/.test(a))return{};await e.load();const t=await e.fetchData();if("Feature Service"===e.type){const e=O(await(0,l.bO)(t,a));if("object"==typeof e){const a=(0,l.z8)(t);e.className=null!=e.id&&a.includes(e.id)?"SubtypeGroupLayer":"FeatureLayer"}return e}return(0,l.XH)(t)>0?O(t):O(await(0,o.V)(a))}function O(e){return 1===(0,l.XH)(e)&&{id:(0,l.WZ)(e)}}},31763:function(e,a,t){t.d(a,{V:function(){return n}});var r=t(86039);async function n(e,a){const{data:t}=await(0,r["default"])(e,{responseType:"json",query:{f:"json",...a?.customParameters,token:a?.apiKey}});return t}}}]);
//# sourceMappingURL=7137.afe485db.js.map