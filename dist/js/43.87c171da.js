"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[43],{70296:function(e,t,s){s.d(t,{A:function(){return l}});var r=s(71457),n=s(45477),o=s(76543),i=(s(37679),s(69292),s(51020),s(29916));let a=class extends n.a{initialize(){}destroy(){}get supportsTileUpdates(){return!1}get spatialReference(){const e=this.get("tileStore.tileScheme.spatialReference");return e&&e.toJSON()||null}};(0,r._)([(0,o.MZ)({readOnly:!0})],a.prototype,"supportsTileUpdates",null),(0,r._)([(0,o.MZ)({constructOnly:!0})],a.prototype,"remoteClient",void 0),(0,r._)([(0,o.MZ)({constructOnly:!0})],a.prototype,"service",void 0),(0,r._)([(0,o.MZ)()],a.prototype,"spatialReference",null),(0,r._)([(0,o.MZ)({constructOnly:!0})],a.prototype,"tileInfo",void 0),(0,r._)([(0,o.MZ)({constructOnly:!0})],a.prototype,"tileStore",void 0),a=(0,r._)([(0,i.$)("geoscene.views.2d.layers.features.processors.BaseProcessor")],a);const l=a},43:function(e,t,s){s.r(t),s.d(t,{default:function(){return y}});s(44114);var r=s(71457),n=(s(51020),s(79908)),o=(s(15114),s(37679),s(69292),s(47966),s(29916)),i=s(47161),a=s(3444),l=s(17),c=s(70296),d=s(9700);class u{constructor(e,t){this.offset=e,this.extent=t}}function p(e){const t=e.key,s=new Map,r=256,n=l.dn,o=e.tileInfoView.tileInfo.isWrappable;return s.set((0,d.K)(t,-1,-1,o).id,new u([-n,-n],[n-r,n-r,n,n])),s.set((0,d.K)(t,0,-1,o).id,new u([0,-n],[0,n-r,n,n])),s.set((0,d.K)(t,1,-1,o).id,new u([n,-n],[0,n-r,r,n])),s.set((0,d.K)(t,-1,0,o).id,new u([-n,0],[n-r,0,n,n])),s.set((0,d.K)(t,1,0,o).id,new u([n,0],[0,0,r,n])),s.set((0,d.K)(t,-1,1,o).id,new u([-n,n],[n-r,0,n,r])),s.set((0,d.K)(t,0,1,o).id,new u([0,n],[0,0,n,r])),s.set((0,d.K)(t,1,1,o).id,new u([n,n],[0,0,r,r])),s}let h=class extends c.A{constructor(){super(...arguments),this.type="heatmap",this._tileKeyToFeatureSets=new Map}initialize(){this.handles.add([this.tileStore.on("update",this.onTileUpdate.bind(this))])}async update(e,t){const s=t.schema.processors[0];"heatmap"===s.type&&(0,i.Ui)(this._schema,s)&&(e.mesh=!0,this._schema=s)}onTileUpdate(e){for(const t of e.removed)this._tileKeyToFeatureSets.delete(t.key.id)}onTileClear(e){const t={clear:!0};return this._tileKeyToFeatureSets.delete(e.key.id),this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:e.id,data:t})}async onTileMessage(e,t,s){this._tileKeyToFeatureSets.has(e.key.id)||this._tileKeyToFeatureSets.set(e.key.id,new Map);const r=this._tileKeyToFeatureSets.get(e.key.id);if(r&&null!=t.addOrUpdate&&t.addOrUpdate.hasFeatures&&r.set(t.addOrUpdate.instance,t),t.end){const t=[],r=p(e);this._tileKeyToFeatureSets.forEach(((s,o)=>{if(o===e.key.id)s.forEach((e=>(0,n.Rh)(e.addOrUpdate,(e=>t.push(e)))));else if(r.has(o)){const e=r.get(o),[i,a]=e.offset;s.forEach((e=>(0,n.Rh)(e.addOrUpdate,(e=>{const s=e.transform(i,a,1,1);t.push(s)}))))}}));const o=(0,a.oQ)(t,this._schema.mesh,512,512),i={tileKey:e.key.id,intensityInfo:o},l=[o.matrix];return this.remoteClient.invoke("tileRenderer.onTileData",i,{...s,transferList:l})}}onTileError(e,t,s){return this.remoteClient.invoke("tileRenderer.onTileError",{tileKey:e.id,error:t},s)}};h=(0,r._)([(0,o.$)("geoscene.views.2d.layers.features.processors.HeatmapProcessor")],h);const y=h},9700:function(e,t,s){function r(e,t,s,r){const n=e.clone(),o=1<<n.level,i=n.col+t,a=n.row+s;return r&&i<0?(n.col=i+o,n.world-=1):i>=o?(n.col=i-o,n.world+=1):n.col=i,n.row=a,n}s.d(t,{K:function(){return r}})}}]);
//# sourceMappingURL=43.87c171da.js.map