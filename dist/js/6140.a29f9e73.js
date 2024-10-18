"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[6140],{39932:function(e,t,s){s.d(t,{A:function(){return u}});s(16573),s(78100),s(77936),s(37467),s(44732),s(79577);var r,a=s(51020),i=s(12555);!function(e){e[e.varint=0]="varint",e[e.fixed64=1]="fixed64",e[e.delimited=2]="delimited",e[e.fixed32=5]="fixed32",e[e.unknown=99]="unknown"}(r||(r={}));const n=4294967296,o=new TextDecoder("utf-8"),c=(0,a.A)("safari")||(0,a.A)("ios")?6:(0,a.A)("ff")?12:32;class u{constructor(e,t,s=0,a=(e?e.byteLength:0)){this._tag=0,this._dataType=r.unknown,this._init(e,t,s,a)}_init(e,t,s,r){this._data=e,this._dataView=t,this._pos=s,this._end=r}asUnsafe(){return this}clone(){return new u(this._data,this._dataView,this._pos,this._end)}pos(){return this._pos}move(e){this._pos=e}nextTag(e){for(;;){if(this._pos===this._end)return!1;const t=this._decodeVarint();if(this._tag=t>>3,this._dataType=7&t,!e||e===this._tag)break;this.skip()}return!0}next(){if(this._pos===this._end)return!1;const e=this._decodeVarint();return this._tag=e>>3,this._dataType=7&e,!0}empty(){return this._pos>=this._end}tag(){return this._tag}getInt32(){return this._decodeVarint()}getInt64(){return this._decodeVarint()}getUInt32(){let e=4294967295;return e=(127&this._data[this._pos])>>>0,this._data[this._pos++]<128?e:(e=(e|(127&this._data[this._pos])<<7)>>>0,this._data[this._pos++]<128?e:(e=(e|(127&this._data[this._pos])<<14)>>>0,this._data[this._pos++]<128?e:(e=(e|(127&this._data[this._pos])<<21)>>>0,this._data[this._pos++]<128?e:(e=(e|(15&this._data[this._pos])<<28)>>>0,this._data[this._pos++]<128?e:void 0))))}getUInt64(){return this._decodeVarint()}getSInt32(){const e=this.getUInt32();if(void 0!==e)return e>>>1^-(1&e)}getSInt64(){return this._decodeSVarint()}getBool(){const e=0!==this._data[this._pos];return this._skip(1),e}getEnum(){return this._decodeVarint()}getFixed64(){const e=this._dataView,t=this._pos,s=e.getUint32(t,!0)+e.getUint32(t+4,!0)*n;return this._skip(8),s}getSFixed64(){const e=this._dataView,t=this._pos,s=e.getUint32(t,!0)+e.getInt32(t+4,!0)*n;return this._skip(8),s}getDouble(){const e=this._dataView.getFloat64(this._pos,!0);return this._skip(8),e}getFixed32(){const e=this._dataView.getUint32(this._pos,!0);return this._skip(4),e}getSFixed32(){const e=this._dataView.getInt32(this._pos,!0);return this._skip(4),e}getFloat(){const e=this._dataView.getFloat32(this._pos,!0);return this._skip(4),e}getString(){const e=this._getLength(),t=this._pos,s=this._toString(this._data,t,t+e);return this._skip(e),s}getBytes(){const e=this._getLength(),t=this._pos,s=this._toBytes(this._data,t,t+e);return this._skip(e),s}getLength(){return this._getLengthUnsafe()}processMessageWithArgs(e,t,s,r){const a=this.getMessage(),i=e(a,t,s,r);return a.release(),i}processMessage(e){const t=this.getMessage(),s=e(t);return t.release(),s}getMessage(){const e=this._getLength(),t=u.pool.acquire();return t._init(this._data,this._dataView,this._pos,this._pos+e),this._skip(e),t}release(){u.pool.release(this)}dataType(){return this._dataType}skip(){switch(this._dataType){case r.varint:this._decodeVarint();break;case r.fixed64:this._skip(8);break;case r.delimited:this._skip(this._getLength());break;case r.fixed32:this._skip(4);break;default:throw new Error("Invalid data type!")}}skipLen(e){this._skip(e)}_skip(e){if(this._pos+e>this._end)throw new Error("Attempt to skip past the end of buffer!");this._pos+=e}_decodeVarint(){const e=this._data;let t=this._pos,s=0,r=0;if(this._end-t>=10)do{if(r=e[t++],s|=127&r,0==(128&r))break;if(r=e[t++],s|=(127&r)<<7,0==(128&r))break;if(r=e[t++],s|=(127&r)<<14,0==(128&r))break;if(r=e[t++],s|=(127&r)<<21,0==(128&r))break;if(r=e[t++],s+=268435456*(127&r),0==(128&r))break;if(r=e[t++],s+=34359738368*(127&r),0==(128&r))break;if(r=e[t++],s+=4398046511104*(127&r),0==(128&r))break;if(r=e[t++],s+=562949953421312*(127&r),0==(128&r))break;if(r=e[t++],s+=72057594037927940*(127&r),0==(128&r))break;if(r=e[t++],s+=0x8000000000000000*(127&r),0==(128&r))break;throw new Error("Varint too long!")}while(0);else{let a=1;for(;t!==this._end&&(r=e[t],0!=(128&r));)++t,s+=(127&r)*a,a*=128;if(t===this._end)throw new Error("Varint overrun!");++t,s+=r*a}return this._pos=t,s}_decodeSVarint(){const e=this._data;let t=this._pos,s=0,r=0;const a=1&e[t];if(this._end-t>=10)do{if(r=e[t++],s|=127&r,0==(128&r))break;if(r=e[t++],s|=(127&r)<<7,0==(128&r))break;if(r=e[t++],s|=(127&r)<<14,0==(128&r))break;if(r=e[t++],s|=(127&r)<<21,0==(128&r))break;if(r=e[t++],s+=268435456*(127&r),0==(128&r))break;if(r=e[t++],s+=34359738368*(127&r),0==(128&r))break;if(r=e[t++],s+=4398046511104*(127&r),0==(128&r))break;if(r=e[t++],s+=562949953421312*(127&r),0==(128&r))break;if(r=e[t++],s+=72057594037927940*(127&r),0==(128&r))break;if(r=e[t++],s+=0x8000000000000000*(127&r),0==(128&r))break;throw new Error("Varint too long!")}while(0);else{let a=1;for(;t!==this._end&&(r=e[t],0!=(128&r));)++t,s+=(127&r)*a,a*=128;if(t===this._end)throw new Error("Varint overrun!");++t,s+=r*a}return this._pos=t,a?-(s+1)/2:s/2}_getLength(){if(this._dataType!==r.delimited)throw new Error("Not a delimited data type!");return this._decodeVarint()}_getLengthUnsafe(){return this.getUInt32()}_toString(e,t,s){if((s=Math.min(this._end,s))-t>c){const r=e.subarray(t,s);return o.decode(r)}let r="",a="";for(let i=t;i<s;++i){const t=e[i];128&t?a+="%"+t.toString(16):(r+=decodeURIComponent(a)+String.fromCharCode(t),a="")}return a.length&&(r+=decodeURIComponent(a)),r}_toBytes(e,t,s){return s=Math.min(this._end,s),new Uint8Array(e.buffer,t,s-t)}}u.pool=new i.A(u,void 0,(e=>{e._data=null,e._dataView=null}))},56291:function(e,t,s){s.d(t,{SH:function(){return x},ae:function(){return F},cn:function(){return k}});s(44114),s(16573),s(78100),s(77936),s(37467),s(44732),s(79577);var r=s(47966),a=s(39932),i=s(47086),n=s(91526);const o=["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeString","esriFieldTypeDate","esriFieldTypeOID","esriFieldTypeGeometry","esriFieldTypeBlob","esriFieldTypeRaster","esriFieldTypeGUID","esriFieldTypeGlobalID","esriFieldTypeXML","esriFieldTypeBigInteger","esriFieldTypeDateOnly","esriFieldTypeTimeOnly","esriFieldTypeTimestampOffset"],c=["sqlTypeBigInt","sqlTypeBinary","sqlTypeBit","sqlTypeChar","sqlTypeDate","sqlTypeDecimal","sqlTypeDouble","sqlTypeFloat","sqlTypeGeometry","sqlTypeGUID","sqlTypeInteger","sqlTypeLongNVarchar","sqlTypeLongVarbinary","sqlTypeLongVarchar","sqlTypeNChar","sqlTypeNVarchar","sqlTypeOther","sqlTypeReal","sqlTypeSmallInt","sqlTypeSqlXml","sqlTypeTime","sqlTypeTimestamp","sqlTypeTimestamp2","sqlTypeTinyInt","sqlTypeVarbinary","sqlTypeVarchar"],u=["upperLeft","lowerLeft"];function h(e){return e>=o.length?null:o[e]}function l(e){return e>=c.length?null:c[e]}function d(e){return e>=u.length?null:u[e]}function p(e,t){return t>=e.geometryTypes.length?null:e.geometryTypes[t]}function g(e,t,s){const r=3,a=e.asUnsafe(),i=t.createPointGeometry(s);for(;a.next();)switch(a.tag()){case r:{const e=a.getUInt32(),s=a.pos()+e;let r=0;for(;a.pos()<s;)t.addCoordinatePoint(i,a.getSInt64(),r++);break}default:a.skip()}return i}function f(e,t,s){const r=2,a=3,i=e.asUnsafe(),n=t.createGeometry(s),o=2+(s.hasZ?1:0)+(s.hasM?1:0);for(;i.next();)switch(i.tag()){case r:{const e=i.getUInt32(),s=i.pos()+e;let r=0;for(;i.pos()<s;)t.addLength(n,i.getUInt32(),r++);break}case a:{const e=i.getUInt32(),s=i.pos()+e;let r=0;for(t.allocateCoordinates(n);i.pos()<s;)t.addCoordinate(n,i.getSInt64(),r),r++,r===o&&(r=0);break}default:i.skip()}return n}function _(e){const t=1,s=2,r=3,a=e.asUnsafe(),o=new i.A;let c="esriGeometryPoint";for(;a.next();)switch(a.tag()){case s:{const e=a.getUInt32(),t=a.pos()+e;for(;a.pos()<t;)o.lengths.push(a.getUInt32());break}case r:{const e=a.getUInt32(),t=a.pos()+e;for(;a.pos()<t;)o.coords.push(a.getSInt64());break}case t:c=n.F[a.getEnum()];break;default:a.skip()}return{queryGeometry:o,queryGeometryType:c}}function y(e){const t=1,s=2,r=3,a=4,i=5,n=6,o=7,c=8,u=9,h=e.asUnsafe();for(;h.next();)switch(h.tag()){case t:return h.getString();case s:return h.getFloat();case r:return h.getDouble();case a:return h.getSInt32();case i:return h.getUInt32();case n:return h.getInt64();case o:return h.getUInt64();case c:return h.getSInt64();case u:return h.getBool();default:return h.skip(),null}return null}function k(e){const t=1,s=2,r=3,a=4,i=5,n=6,o=e.asUnsafe(),c={type:h(0)};for(;o.next();)switch(o.tag()){case t:c.name=o.getString();break;case s:c.type=h(o.getEnum());break;case r:c.alias=o.getString();break;case a:c.sqlType=l(o.getEnum());break;case i:o.skip();break;case n:c.defaultValue=o.getString();break;default:o.skip()}return c}function b(e){const t=1,s=2,r={},a=e.asUnsafe();for(;a.next();)switch(a.tag()){case t:r.name=a.getString();break;case s:r.isSystemMaintained=a.getBool();break;default:a.skip()}return r}function m(e,t,s,r){const a=1,i=2,n=4,o=t.createFeature(s);let c=0;for(;e.next();)switch(e.tag()){case a:{const t=r[c++].name;o.attributes[t]=e.processMessage(y);break}case i:o.geometry=e.processMessageWithArgs(f,t,s);break;case n:o.centroid=e.processMessageWithArgs(g,t,s);break;default:e.skip()}return o}function T(e){const t=1,s=2,r=3,a=4,i=[1,1,1,1],n=e.asUnsafe();for(;n.next();)switch(n.tag()){case t:i[0]=n.getDouble();break;case s:i[1]=n.getDouble();break;case a:i[2]=n.getDouble();break;case r:i[3]=n.getDouble();break;default:n.skip()}return i}function w(e){const t=1,s=2,r=3,a=4,i=[0,0,0,0],n=e.asUnsafe();for(;n.next();)switch(n.tag()){case t:i[0]=n.getDouble();break;case s:i[1]=n.getDouble();break;case a:i[2]=n.getDouble();break;case r:i[3]=n.getDouble();break;default:n.skip()}return i}function F(e){const t=1,s=2,r=3,a={originPosition:d(0)},i=e.asUnsafe();for(;i.next();)switch(i.tag()){case t:a.originPosition=d(i.getEnum());break;case s:a.scale=i.processMessage(T);break;case r:a.translate=i.processMessage(w);break;default:i.skip()}return a}function I(e){const t=1,s=2,r=3,a={},i=e.asUnsafe();for(;i.next();)switch(i.tag()){case t:a.shapeAreaFieldName=i.getString();break;case s:a.shapeLengthFieldName=i.getString();break;case r:a.units=i.getString();break;default:i.skip()}return a}function q(e,t){const s=1,r=2,a=3,i=4,n=5,o=t.createSpatialReference();for(;e.next();)switch(e.tag()){case s:o.wkid=e.getUInt32();break;case n:o.wkt=e.getString();break;case r:o.latestWkid=e.getUInt32();break;case a:o.vcsWkid=e.getUInt32();break;case i:o.latestVcsWkid=e.getUInt32();break;default:e.skip()}return o}function S(e,t){const s=1,r=2,a=3,i=4,n=5,o=7,c=8,u=9,h=10,l=11,d=12,g=13,f=15,_=t.createFeatureResult(),y=e.asUnsafe();_.geometryType=p(t,0);let T=!1;for(;y.next();)switch(y.tag()){case s:_.objectIdFieldName=y.getString();break;case a:_.globalIdFieldName=y.getString();break;case i:_.geohashFieldName=y.getString();break;case n:_.geometryProperties=y.processMessage(I);break;case o:_.geometryType=p(t,y.getEnum());break;case c:_.spatialReference=y.processMessageWithArgs(q,t);break;case h:_.hasZ=y.getBool();break;case l:_.hasM=y.getBool();break;case d:_.transform=y.processMessage(F);break;case u:{const e=y.getBool();_.exceededTransferLimit=e;break}case g:t.addField(_,y.processMessage(k));break;case f:T||(t.prepareFeatures(_),T=!0),t.addFeature(_,y.processMessageWithArgs(m,t,_,_.fields));break;case r:_.uniqueIdField=y.processMessage(b);break;default:y.skip()}return t.finishFeatureResult(_),_}function U(e,t){const s=1,r=4,a={};let i=null;for(;e.next();)switch(e.tag()){case r:i=e.processMessageWithArgs(_);break;case s:a.featureResult=e.processMessageWithArgs(S,t);break;default:e.skip()}return null!=i&&a.featureResult&&t.addQueryGeometry(a,i),a}function x(e,t){try{const s=2,r=new a.A(new Uint8Array(e),new DataView(e)),i={};for(;r.next();)r.tag()===s?i.queryResult=r.processMessageWithArgs(U,t):r.skip();return i}catch(o){throw new r.A("query:parsing-pbf","Error while parsing FeatureSet PBF payload",{error:o})}}},91526:function(e,t,s){s.d(t,{F:function(){return c},S:function(){return u}});s(44114);var r=s(79075),a=s(72465),i=s(32066),n=s(83412),o=s(47086);const c=["esriGeometryPoint","esriGeometryMultipoint","esriGeometryPolyline","esriGeometryPolygon"];class u{constructor(e){this._options=e,this.geometryTypes=c,this._coordinatePtr=0,this._vertexDimension=0}createFeatureResult(){return new n.A}prepareFeatures(e){this._vertexDimension=2,e.hasZ&&this._vertexDimension++,e.hasM&&this._vertexDimension++}finishFeatureResult(e){if(!e||!e.features||!e.hasZ||!this._options.sourceSpatialReference||!e.spatialReference||(0,a.aI)(e.spatialReference,this._options.sourceSpatialReference)||e.spatialReference.vcsWkid)return;const t=(0,r.G9)(this._options.sourceSpatialReference)/(0,r.G9)(e.spatialReference);if(1!==t)for(const s of e.features){if(!(0,i.N3)(s))continue;const e=s.geometry.coords;for(let s=2;s<e.length;s+=3)e[s]*=t}}addFeature(e,t){e.features.push(t)}createFeature(){return new i.Om}createSpatialReference(){return{wkid:0}}createGeometry(){return new o.A}addField(e,t){e.fields.push(t)}allocateCoordinates(e){e.coords.length=e.lengths.reduce(((e,t)=>e+t),0)*this._vertexDimension,this._coordinatePtr=0}addCoordinate(e,t){e.coords[this._coordinatePtr++]=t}addCoordinatePoint(e,t){e.coords.push(t)}addLength(e,t){e.lengths.push(t)}addQueryGeometry(e,t){e.queryGeometry=t.queryGeometry,e.queryGeometryType=t.queryGeometryType}createPointGeometry(){return new o.A}}},46140:function(e,t,s){s.d(t,{m:function(){return a}});var r=s(56291);function a(e,t){const s=(0,r.SH)(e,t),a=s.queryResult.featureResult,i=s.queryResult.queryGeometry,n=s.queryResult.queryGeometryType;if(a&&a.features&&a.features.length&&a.objectIdFieldName){const e=a.objectIdFieldName;for(const t of a.features)t.attributes&&(t.objectId=t.attributes[e])}return a&&(a.queryGeometry=i,a.queryGeometryType=n),a}}}]);
//# sourceMappingURL=6140.a29f9e73.js.map