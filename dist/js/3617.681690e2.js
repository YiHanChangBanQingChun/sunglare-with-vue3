"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[3617],{23617:function(e,t,n){n.r(t),n.d(t,{createConnection:function(){return O}});n(44114);var r=n(71457),o=(n(2516),n(86039)),s=n(47966),i=n(15114),a=n(71120),c=n(4244),u=(n(37679),n(69292),n(51020),n(29916)),l=n(76543),d=n(70755),f=n(20573);let h=class extends f.A.EventedAccessor{destroy(){this.emit("destroy")}get connectionError(){return this.errorString?new s.A("stream-connection",this.errorString):null}onFeature(e){this.emit("data-received",e)}onMessage(e){this.emit("message-received",e)}};(0,r._)([(0,l.MZ)({readOnly:!0})],h.prototype,"connectionError",null),h=(0,r._)([(0,u.$)("geoscene.layers.support.StreamConnection")],h);const y=h;var g;!function(e){e[e.CONNECTING=0]="CONNECTING",e[e.OPEN=1]="OPEN",e[e.CLOSING=2]="CLOSING",e[e.CLOSED=3]="CLOSED"}(g||(g={}));let p=class extends y{constructor(e){super(),this._outstandingMessages=[],this.errorString=null;const{geometryType:t,spatialReference:n,sourceSpatialReference:r}=e;this._config=e,this._featureZScaler=(0,d.N)(t,r,n),this._open()}async _open(){await this._tryCreateWebSocket(),this.destroyed||await this._handshake()}destroy(){super.destroy(),null!=this._websocket&&(this._websocket.onopen=null,this._websocket.onclose=null,this._websocket.onerror=null,this._websocket.onmessage=null,this._websocket.close()),this._websocket=null}get connectionStatus(){if(null==this._websocket)return"disconnected";switch(this._websocket.readyState){case g.CONNECTING:case g.OPEN:return"connected";case g.CLOSING:case g.CLOSED:return"disconnected"}}sendMessageToSocket(e){null!=this._websocket?this._websocket.send(JSON.stringify(e)):this._outstandingMessages.push(e)}sendMessageToClient(e){this._onMessage(e)}updateCustomParameters(e){this._config.customParameters=e,null!=this._websocket&&this._websocket.close()}async _tryCreateWebSocket(e=this._config.source.path,t=1e3,n=0){try{if(this.destroyed)return;const t=(0,c.a6)(e,this._config.customParameters??{});this._websocket=await this._createWebSocket(t),this.notifyChange("connectionStatus")}catch(h){const o=t/1e3;return this._config.maxReconnectionAttempts&&n>=this._config.maxReconnectionAttempts?(i.A.getLogger(this).error(new s.A("websocket-connection","Exceeded maxReconnectionAttempts attempts. No further attempts will be made")),void this.destroy()):(i.A.getLogger(this).error(new s.A("websocket-connection",`Failed to connect. Attempting to reconnect in ${o}s`,h)),await(0,a.Pl)(t),this._tryCreateWebSocket(e,Math.min(1.5*t,1e3*this._config.maxReconnectionInterval),n+1))}}_setWebSocketJSONParseHandler(e){e.onmessage=e=>{try{const t=JSON.parse(e.data);this._onMessage(t)}catch(t){return void i.A.getLogger(this).error(new s.A("websocket-connection","Failed to parse message, invalid JSON",{error:t}))}}}_createWebSocket(e){return new Promise(((t,n)=>{const r=new WebSocket(e);r.onopen=()=>{if(r.onopen=null,this.destroyed)return r.onclose=null,void r.close();r.onclose=e=>this._onClose(e),r.onerror=e=>this._onError(e),this._setWebSocketJSONParseHandler(r),t(r)},r.onclose=e=>{r.onopen=r.onclose=null,n(e)}}))}async _handshake(e=1e4){const t=this._websocket;if(null==t)return;const n=(0,a.Tw)(),r=t.onmessage,{filter:o,outFields:c,spatialReference:u}=this._config;return n.timeout(e),t.onmessage=e=>{let a=null;try{a=JSON.parse(e.data)}catch(g){}a&&"object"==typeof a||(i.A.getLogger(this).error(new s.A("websocket-connection","Protocol violation. Handshake failed - malformed message",e.data)),n.reject(),this.destroy()),a.spatialReference?.wkid!==u?.wkid&&(i.A.getLogger(this).error(new s.A("websocket-connection",`Protocol violation. Handshake failed - expected wkid of ${u.wkid}`,e.data)),n.reject(),this.destroy()),"json"!==a.format&&(i.A.getLogger(this).error(new s.A("websocket-connection","Protocol violation. Handshake failed - format is not set",e.data)),n.reject(),this.destroy()),o&&a.filter!==o&&i.A.getLogger(this).error(new s.A("websocket-connection","Tried to set filter, but server doesn't support it")),c&&a.outFields!==c&&i.A.getLogger(this).error(new s.A("websocket-connection","Tried to set outFields, but server doesn't support it")),t.onmessage=r;for(const n of this._outstandingMessages)t.send(JSON.stringify(n));this._outstandingMessages=[],n.resolve()},t.send(JSON.stringify({filter:o,outFields:c,format:"json",spatialReference:{wkid:u.wkid}})),n.promise}_onMessage(e){if(this.onMessage(e),"type"in e)switch(e.type){case"features":case"featureResult":for(const t of e.features)null!=this._featureZScaler&&this._featureZScaler(t.geometry),this.onFeature(t)}}_onError(e){const t="Encountered an error over WebSocket connection";this._set("errorString",t),i.A.getLogger(this).error("websocket-connection",t)}_onClose(e){this._websocket=null,this.notifyChange("connectionStatus"),1e3!==e.code&&i.A.getLogger(this).error("websocket-connection",`WebSocket closed unexpectedly with error code ${e.code}`),this.destroyed||this._open()}};(0,r._)([(0,l.MZ)()],p.prototype,"connectionStatus",null),(0,r._)([(0,l.MZ)()],p.prototype,"errorString",void 0),p=(0,r._)([(0,u.$)("geoscene.layers.graphics.sources.connections.WebSocketConnection")],p);var m=n(39321),_=n(81809),S=n(55772),w=n(12790);const b=1e4,k={maxQueryDepth:5,maxRecordCountFactor:3};let v=class extends p{constructor(e){super({...k,...e}),this._buddyServicesQuery=null,this._relatedFeatures=null}async _open(){const e=await this._fetchServiceDefinition(this._config.source);e.timeInfo.trackIdField||i.A.getLogger(this).warn("GeoEvent service was configured without a TrackIdField. This may result in certain functionality being disabled. The purgeOptions.maxObservations property will have no effect.");const t=this._fetchWebSocketUrl(e.streamUrls,this._config.spatialReference);this._buddyServicesQuery||(this._buddyServicesQuery=this._queryBuddyServices()),await this._buddyServicesQuery,await this._tryCreateWebSocket(t);const{filter:n,outFields:r}=this._config;this.destroyed||this._setFilter(n,r)}_onMessage(e){if("attributes"in e){let n;try{n=this._enrich(e),null!=this._featureZScaler&&this._featureZScaler(n.geometry)}catch(t){return void i.A.getLogger(this).error(new s.A("geoevent-connection","Failed to parse message",t))}this.onFeature(n)}else this.onMessage(e)}async _fetchServiceDefinition(e){const t={f:"json",...this._config.customParameters},n=(0,o["default"])(e.path,{query:t,responseType:"json"}),r=(await n).data;return this._serviceDefinition=r,r}_fetchWebSocketUrl(e,t){const n=e[0],{urls:r,token:o}=n,s=this._inferWebSocketBaseUrl(r);return(0,c.a6)(`${s}/subscribe`,{outSR:""+t.wkid,token:o})}_inferWebSocketBaseUrl(e){if(1===e.length)return e[0];for(const t of e)if(t.includes("wss"))return t;return i.A.getLogger(this).error(new s.A("geoevent-connection","Unable to infer WebSocket url",e)),null}async _setFilter(e,t){const n=this._websocket;if(null==n||null==e&&null==t)return;const r=JSON.stringify({filter:this._serializeFilter(e,t)});let o=!1;const c=(0,a.Tw)(),u=()=>{o||(this.destroyed||this._websocket!==n||i.A.getLogger(this).error(new s.A("geoevent-connection","Server timed out when setting filter")),c.reject())},l=e=>{const t=JSON.parse(e.data);t.filter&&(t.error&&(i.A.getLogger(this).error(new s.A("geoevent-connection","Failed to set service filter",t.error)),this._set("errorString",`Could not set service filter - ${t.error}`),c.reject(t.error)),this._setWebSocketJSONParseHandler(n),o=!0,c.resolve())};return n.onmessage=l,n.send(r),setTimeout(u,b),c.promise}_serializeFilter(e,t){const n={};if(null==e&&null==t)return n;if(null!=e&&e.geometry)try{const t=(0,S.rS)(e.geometry);if("extent"!==t.type)throw new s.A(`Expected extent but found type ${t.type}`);n.geometry=JSON.stringify(t.shiftCentralMeridian())}catch(y){i.A.getLogger(this).error(new s.A("geoevent-connection","Encountered an error when setting connection geometryDefinition",y))}return null!=e&&e.where&&"1 = 1"!==e.where&&"1=1"!==e.where&&(n.where=e.where),null!=t&&(n.outFields=t.join(",")),n}_enrich(e){if(!this._relatedFeatures)return e;const t=this._serviceDefinition.relatedFeatures.joinField,n=e.attributes[t],r=this._relatedFeatures.get(n);if(!r)return i.A.getLogger(this).warn("geoevent-connection","Feature join failed. Is the join field configured correctly?",e),e;const{attributes:o,geometry:a}=r;for(const s in o)e.attributes[s]=o[s];return a&&(e.geometry=a),e.geometry||e.centroid||i.A.getLogger(this).error(new s.A("geoevent-connection","Found malformed feature - no geometry found",e)),e}async _queryBuddyServices(){try{const{relatedFeatures:e,keepLatestArchive:t}=this._serviceDefinition,n=this._queryRelatedFeatures(e),r=this._queryArchive(t);await n;const o=await r;if(!o)return;for(const s of o.features)this.onFeature(this._enrich(s))}catch(e){i.A.getLogger(this).error(new s.A("geoevent-connection","Encountered an error when querying buddy services",{error:e}))}}async _queryRelatedFeatures(e){if(!e)return;const t=await this._queryBuddy(e.featuresUrl);this._addRelatedFeatures(t)}async _queryArchive(e){if(e)return this._queryBuddy(e.featuresUrl)}async _queryBuddy(e){const t=new((await Promise.resolve().then(n.bind(n,3949))).default)({url:e}),{capabilities:r}=await t.load(),o=r.query.supportsMaxRecordCountFactor,s=r.query.supportsPagination,i=r.query.supportsCentroid,a=this._config.maxRecordCountFactor,c=t.capabilities.query.maxRecordCount,u=o?c*a:c,l=new _.A;if(l.outFields=this._config.outFields??["*"],l.where=this._config.filter?.where??"1=1",l.returnGeometry=!0,l.returnExceededLimitFeatures=!0,l.outSpatialReference=w.A.fromJSON(this._config.spatialReference),i&&(l.returnCentroid=!0),o&&(l.maxRecordCountFactor=a),s)return l.num=u,t.destroy(),this._queryPages(e,l);const d=await(0,m.eW)(e,l,this._config.sourceSpatialReference);return t.destroy(),d.data}async _queryPages(e,t,n=[],r=0){t.start=null!=t.num?r*t.num:null;const{data:o}=await(0,m.eW)(e,t,this._config.sourceSpatialReference);return o.exceededTransferLimit&&r<(this._config.maxQueryDepth??0)?(o.features.forEach((e=>n.push(e))),this._queryPages(e,t,n,r+1)):(n.forEach((e=>o.features.push(e))),o)}_addRelatedFeatures(e){const t=new Map,n=e.features,r=this._serviceDefinition.relatedFeatures.joinField;for(const o of n){const e=o.attributes[r];t.set(e,o)}this._relatedFeatures=t}};v=(0,r._)([(0,u.$)("geoscene.layers.graphics.sources.connections.GeoEventConnection")],v);const x=v;let F=class extends y{constructor(e){super(),this.connectionStatus="connected",this.errorString=null;const{geometryType:t,spatialReference:n,sourceSpatialReference:r}=e;this._featureZScaler=(0,d.N)(t,r,n)}updateCustomParameters(e){}sendMessageToSocket(e){}sendMessageToClient(e){if("type"in e)switch(e.type){case"features":case"featureResult":for(const t of e.features)null!=this._featureZScaler&&this._featureZScaler(t.geometry),this.onFeature(t)}this.onMessage(e)}};function O(e,t,n,r,o,s,i,a){const c={source:e,sourceSpatialReference:t,spatialReference:n,geometryType:r,filter:o,maxReconnectionAttempts:s,maxReconnectionInterval:i,customParameters:a};return e?e.path.startsWith("wss://")||e.path.startsWith("ws://")?new p(c):new x(c):new F(c)}(0,r._)([(0,l.MZ)()],F.prototype,"connectionStatus",void 0),(0,r._)([(0,l.MZ)()],F.prototype,"errorString",void 0),F=(0,r._)([(0,u.$)("geoscene.layers.support.ClientSideConnection")],F)},85612:function(e,t,n){function r(e){const t={};for(const n in e){if("declaredClass"===n)continue;const o=e[n];if(null!=o&&"function"!=typeof o)if(Array.isArray(o)){t[n]=[];for(let e=0;e<o.length;e++)t[n][e]=r(o[e])}else"object"==typeof o?o.toJSON&&(t[n]=JSON.stringify(o)):t[n]=o}return t}n.d(t,{z:function(){return r}})},39321:function(e,t,n){n.d(t,{IJ:function(){return y},Jf:function(){return _},Pk:function(){return p},eW:function(){return h},gW:function(){return m},kS:function(){return g}});var r=n(86039),o=n(4244),s=n(55772),i=n(42638),a=n(85612),c=n(46140),u=n(27745);const l="Layer does not support extent calculation.";function d(e,t){if(t&&"extent"===e.type)return`${e.xmin},${e.ymin},${e.xmax},${e.ymax}`;if(t&&"point"===e.type)return`${e.x},${e.y}`;const n=e.toJSON();return delete n.spatialReference,JSON.stringify(n)}function f(e,t){const n=e.geometry,r=e.toJSON();delete r.compactGeometryEnabled,delete r.defaultSpatialReferenceEnabled;const o=r;let i,a,c;if(null!=n&&(a=n.spatialReference,c=n.spatialReference.wkid||JSON.stringify(n.spatialReference),o.geometryType=(0,s.$B)(n),o.geometry=d(n,e.compactGeometryEnabled),o.inSR=c),r.groupByFieldsForStatistics&&(o.groupByFieldsForStatistics=r.groupByFieldsForStatistics.join(",")),r.objectIds&&(o.objectIds=r.objectIds.join(",")),r.orderByFields&&(o.orderByFields=r.orderByFields.join(",")),!r.outFields||!r.returnDistinctValues&&(t?.returnCountOnly||t?.returnExtentOnly||t?.returnIdsOnly)?delete o.outFields:r.outFields.includes("*")?o.outFields="*":o.outFields=r.outFields.join(","),r.outSR?(o.outSR=r.outSR.wkid||JSON.stringify(r.outSR),i=e.outSpatialReference):n&&(r.returnGeometry||r.returnCentroid)&&(o.outSR=o.inSR,i=a),r.returnGeometry&&delete r.returnGeometry,r.outStatistics&&(o.outStatistics=JSON.stringify(r.outStatistics)),r.fullText&&(o.fullText=JSON.stringify(r.fullText)),r.pixelSize&&(o.pixelSize=JSON.stringify(r.pixelSize)),r.quantizationParameters&&(e.defaultSpatialReferenceEnabled&&null!=a&&null!=e.quantizationParameters&&null!=e.quantizationParameters.extent&&a.equals(e.quantizationParameters.extent.spatialReference)&&delete r.quantizationParameters.extent.spatialReference,o.quantizationParameters=JSON.stringify(r.quantizationParameters)),r.parameterValues&&(o.parameterValues=JSON.stringify(r.parameterValues)),r.rangeValues&&(o.rangeValues=JSON.stringify(r.rangeValues)),r.dynamicDataSource&&(o.layer=JSON.stringify({source:r.dynamicDataSource}),delete r.dynamicDataSource),r.timeExtent){const e=r.timeExtent,{start:t,end:n}=e;null==t&&null==n||(o.time=t===n?t:`${t??"null"},${n??"null"}`),delete r.timeExtent}return e.defaultSpatialReferenceEnabled&&null!=a&&null!=i&&a.equals(i)&&(o.defaultSR=o.inSR,delete o.inSR,delete o.outSR),o}async function h(e,t,n,r){const o=null!=t.timeExtent&&t.timeExtent.isEmpty?{data:{features:[]}}:await S(e,t,"json",r);return(0,u.q)(t,n,o.data),o}async function y(e,t,n,r){if(null!=t.timeExtent&&t.timeExtent.isEmpty)return{data:n.createFeatureResult()};const o=await g(e,t,r),s=o;return s.data=(0,c.m)(o.data,n),s}function g(e,t,n){return S(e,t,"pbf",n)}function p(e,t,n){return null!=t.timeExtent&&t.timeExtent.isEmpty?Promise.resolve({data:{objectIds:[]}}):S(e,t,"json",n,{returnIdsOnly:!0})}function m(e,t,n){return null!=t.timeExtent&&t.timeExtent.isEmpty?Promise.resolve({data:{count:0}}):S(e,t,"json",n,{returnIdsOnly:!0,returnCountOnly:!0})}async function _(e,t,n){if(null!=t.timeExtent&&t.timeExtent.isEmpty)return{data:{count:0,extent:null}};const r=await S(e,t,"json",n,{returnExtentOnly:!0,returnCountOnly:!0}),o=r.data;if(o.hasOwnProperty("extent"))return r;if(o.features)throw new Error(l);if(o.hasOwnProperty("count"))throw new Error(l);return r}async function S(e,t,n,s={},c={}){const u="string"==typeof e?(0,o.An)(e):e,l=t.geometry?[t.geometry]:[];s.responseType="pbf"===n?"array-buffer":"json";const d=await(0,i.el)(l,null,s),h=d&&d[0];null!=h&&((t=t.clone()).geometry=h);const y=(0,a.z)({...u.query,f:n,...c,...f(t,c)});return(0,r["default"])((0,o.fj)(u.path,w(t,c)?"query3d":"query"),{...s,query:{...y,...s.query}})}function w(e,t){return null!=e.formatOf3DObjects&&!(t.returnCountOnly||t.returnExtentOnly||t.returnIdsOnly)}}}]);
//# sourceMappingURL=3617.681690e2.js.map