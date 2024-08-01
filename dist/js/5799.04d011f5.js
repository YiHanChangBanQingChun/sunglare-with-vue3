"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[5799],{39537:function(e,t,i){i.d(t,{D:function(){return c}});var s=i(99359),h=i(45611),r=i(18298),a=i(82950);class n extends a.Y{constructor(e,t,i,s,h,a,n=null){super(e,t,i,s,h,a),this.bitmap=new r.mb(n),this.bitmap.coordScale=[h,a],this.bitmap.once("isReady",(()=>this.ready()))}destroy(){super.destroy(),this.bitmap.destroy()}beforeRender(e){super.beforeRender(e),this.bitmap.beforeRender(e)}afterRender(e){super.afterRender(e),this.bitmap.afterRender(e)}set stencilRef(e){this.bitmap.stencilRef=e}get stencilRef(){return this.bitmap.stencilRef}_createTransforms(){return{dvs:(0,h.c)(),tileMat3:(0,h.c)()}}setTransform(e){super.setTransform(e),this.bitmap.transforms.dvs=this.transforms.dvs}onAttach(){this.bitmap.stage=this.stage}onDetach(){this.bitmap&&(this.bitmap.stage=null)}}var l=i(55828),o=i(54069),u=i(28360);class c extends u.A{get requiresDedicatedFBO(){return this.children.some((e=>"additive"===e.bitmap.blendFunction))}createTile(e){const t=this._tileInfoView.getTileBounds((0,s.vt)(),e),i=this._tileInfoView.getTileResolution(e.level),[h,r]=this._tileInfoView.tileInfo.size;return new n(e,i,t[0],t[3],h,r)}prepareRenderPasses(e){const t=e.registerRenderPass({name:"bitmap (tile)",brushes:[l.d.bitmap],target:()=>this.children.map((e=>e.bitmap)),drawPhase:o.S5.MAP});return[...super.prepareRenderPasses(e),t]}doRender(e){this.visible&&e.drawPhase===o.S5.MAP&&super.doRender(e)}}},91938:function(e,t,i){i.d(t,{Y:function(){return a}});var s=i(71457),h=(i(15114),i(37679),i(69292),i(51020),i(47966),i(29916)),r=i(39537);const a=e=>{let t=class extends e{attach(){this.view.timeline.record(`${this.layer.title} (BitmapTileLayer) Attach`),this._bitmapView=new r.D(this._tileInfoView),this.container.addChild(this._bitmapView)}detach(){this.container.removeChild(this._bitmapView),this._bitmapView?.removeAllChildren()}};return t=(0,s._)([(0,h.$)("geoscene.views.2d.layers.BitmapTileLayerView2D")],t),t}},95799:function(e,t,i){i.r(t),i.d(t,{default:function(){return H}});i(44114);var s=i(71457),h=i(15114),r=i(71120),a=i(87400),n=i(76543),l=(i(37679),i(69292),i(51020),i(29916)),o=i(72465),u=i(41341),c=(i(47966),i(70864),i(86039),i(19470),i(52727),i(4244),i(46656),i(32322),i(25124),i(50221),i(50095),i(54069),i(32339),i(60824),i(62830),i(913),i(73719),i(82236),i(28161),i(11145),i(17),i(62735),i(76036),i(80249),i(72422),i(8792),i(75218),i(64632),i(99513),i(38153),i(69635),i(79925),i(448),i(29323),i(44077),i(15362),i(26011),i(45978),i(18972),i(78838),i(52036),i(396),i(79615),i(1505),i(94499),i(42835),i(44670),i(80155),i(31014),i(46896),i(80545),i(94792),i(29632),i(37459),i(81291),i(73884)),p=(i(28284),i(54923),i(45841),i(41312),i(79075),i(59384),i(67779),i(42638),i(40948),i(49067),i(94947),i(91938)),d=i(15235),f=i(94984),g=i(6463),m=i(78546),w=i(84339),_=i(12015),y=i(13590),v=i(48278),b=i(32245),I=i(8220),V=i(70568);const T=[0,0];let R=class extends((0,b.A)((0,p.Y)((0,d.e)(v.A)))){constructor(){super(...arguments),this._fetchQueue=null,this._highlightGraphics=new u.Y,this._highlightView=null,this._popupHighlightHelper=null,this._tileStrategy=null,this.layer=null}get resampling(){return!("resampling"in this.layer)||!1!==this.layer.resampling}get tilemapCache(){return"tilemapCache"in this.layer?this.layer.tilemapCache:null}update(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume(),this._highlightView?.processUpdate(e)}attach(){const e="tileServers"in this.layer?this.layer.tileServers:null,t=this.tilemapCache;if(this._tileInfoView=new m.A(this.layer.tileInfo,this.layer.fullExtent,t?.effectiveMinLOD,t?.effectiveMaxLOD),this._fetchQueue=new _.A({tileInfoView:this._tileInfoView,concurrency:e&&10*e.length||10,process:(e,t)=>this.fetchTile(e,t)}),this._tileStrategy=new y.A({cachePolicy:"keep",resampling:this.resampling,acquireTile:e=>this.acquireTile(e),releaseTile:e=>this.releaseTile(e),tileInfoView:this._tileInfoView}),(0,I.ox)(this,this.layer)){const e=this._highlightView=new c.A({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new f.A(this.view.featuresTilingScheme),defaultPointSymbolEnabled:!1});this.container.addChild(this._highlightView.container),this._popupHighlightHelper=new I.Uh({createFetchPopupFeaturesQueryGeometry:(e,t)=>(0,V.V)(e,t,this.view),highlightGraphics:this._highlightGraphics,highlightGraphicUpdated:(t,i)=>{e.graphicUpdateHandler({graphic:t,property:i})},layerView:this,updatingHandles:this.updatingHandles})}this.requestUpdate(),this.addAttachHandles((0,a.wB)((()=>this.resampling),(()=>{this.doRefresh()}))),super.attach()}detach(){super.detach(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),this._popupHighlightHelper?.destroy(),this._fetchQueue=this._tileStrategy=this._tileInfoView=this._popupHighlightHelper=null}async fetchPopupFeatures(e,t){return this._popupHighlightHelper?this._popupHighlightHelper.fetchPopupFeatures(e,t):[]}highlight(e){return this._popupHighlightHelper?this._popupHighlightHelper.highlight(e):{remove(){}}}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.requestUpdate()}supportsSpatialReference(e){return(0,o.aI)(this.layer.tileInfo?.spatialReference,e)}async doRefresh(){!this.attached||this.updateRequested||this.suspended||(this._fetchQueue.reset(),this._tileStrategy.refresh((e=>this._enqueueTileFetch(e))))}isUpdating(){return this._fetchQueue?.updating??!1}acquireTile(e){const t=this._bitmapView.createTile(e),i=t.bitmap;return[i.x,i.y]=this._tileInfoView.getTileCoords(T,t.key),i.resolution=this._tileInfoView.getTileResolution(t.key),[i.width,i.height]=this._tileInfoView.tileInfo.size,this._enqueueTileFetch(t),this._bitmapView.addChild(t),this.requestUpdate(),t}releaseTile(e){this._fetchQueue.abort(e.key.id),this._bitmapView.removeChild(e),e.once("detach",(()=>e.destroy())),this.requestUpdate()}async fetchTile(e,t={}){const i=this.tilemapCache,{signal:s,resamplingLevel:h=0}=t;if(!i)try{return await this._fetchImage(e,s)}catch(l){if(!(0,r.zf)(l)&&!this.resampling)return(0,g.G)(this._tileInfoView.tileInfo.size);if(h<3){const i=this._tileInfoView.getTileParentId(e.id);if(i){const s=new w.A(i),r=await this.fetchTile(s,{...t,resamplingLevel:h+1});return(0,g.t)(this._tileInfoView,r,s,e)}}throw l}const a=new w.A(0,0,0,0);let n;try{if(await i.fetchAvailabilityUpsample(e.level,e.row,e.col,a,{signal:s}),a.level!==e.level&&!this.resampling)return(0,g.G)(this._tileInfoView.tileInfo.size);n=await this._fetchImage(a,s)}catch(l){if((0,r.zf)(l))throw l;n=await this._fetchImage(e,s)}return this.resampling?(0,g.t)(this._tileInfoView,n,a,e):n}async _enqueueTileFetch(e){if(!this._fetchQueue.has(e.key.id)){try{const t=await this._fetchQueue.push(e.key);e.bitmap.source=t,e.bitmap.width=this._tileInfoView.tileInfo.size[0],e.bitmap.height=this._tileInfoView.tileInfo.size[1],e.requestRender(),e.once("attach",(()=>this.requestUpdate()))}catch(t){(0,r.zf)(t)||h.A.getLogger(this).error(t)}this.requestUpdate()}}async _fetchImage(e,t){return this.layer.fetchImageBitmapTile(e.level,e.row,e.col,{signal:t})}};(0,s._)([(0,n.MZ)()],R.prototype,"_fetchQueue",void 0),(0,s._)([(0,n.MZ)()],R.prototype,"resampling",null),(0,s._)([(0,n.MZ)()],R.prototype,"tilemapCache",null),R=(0,s._)([(0,l.$)("geoscene.views.2d.layers.TileLayerView2D")],R);const H=R},6463:function(e,t,i){function s(e){return e instanceof HTMLImageElement?e.naturalWidth:e.width}function h(e){return e instanceof HTMLImageElement?e.naturalHeight:e.height}function r(e,t,i,r){if(i.level===r.level)return t;const n=e.tileInfo.size,l=e.getTileResolution(i.level),o=e.getTileResolution(r.level);let u=e.getLODInfoAt(r.level);const c=u.getXForColumn(r.col),p=u.getYForRow(r.row);u=e.getLODInfoAt(i.level);const d=u.getXForColumn(i.col),f=u.getYForRow(i.row),g=s(t)/n[0],m=h(t)/n[1],w=Math.round(g*((c-d)/l)),_=Math.round(m*(-(p-f)/l)),y=Math.round(g*n[0]*(o/l)),v=Math.round(m*n[1]*(o/l)),b=a(n);return b.getContext("2d").drawImage(t,w,_,y,v,0,0,n[0],n[1]),b}function a(e){const t=document.createElement("canvas");return[t.width,t.height]=e,t}i.d(t,{G:function(){return a},t:function(){return r}})}}]);
//# sourceMappingURL=5799.04d011f5.js.map