"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[6017],{32569:function(e,i,t){t.d(i,{Z:function(){return a}});var s=t(6356),r=t(73719);class a extends s.A{constructor(){super(...arguments),this._prevFBO=void 0,this.requiresDedicatedFBO=!1}dispose(){}doRender(e){const i=this.createRenderParams(e),{context:t,painter:s,profiler:a}=i;this._prevFBO=t.getBoundFramebufferObject(),a.recordContainerStart(this.name);const l=this._getFbo(i),n=s.getRenderTarget();t.bindFramebuffer(l),s.setRenderTarget(l),t.setDepthWriteEnabled(!0),t.setColorMask(!0,!0,!0,!0),t.setClearColor(0,0,0,0),t.setClearDepth(1),t.clear(t.gl.COLOR_BUFFER_BIT|t.gl.DEPTH_BUFFER_BIT),t.setDepthWriteEnabled(!1);for(const r of this.children)r.beforeRender(e);for(const r of this.children)r.processRender(i);for(const r of this.children)r.afterRender(e);s.setRenderTarget(n),s.releaseFbo(l),t.bindFramebuffer(this._prevFBO),s.beforeRenderLayer(i,this._clippingInfos?255:0,this.computedOpacity),l.colorTexture&&(t.setStencilTestEnabled(!1),t.setStencilWriteMask(0),s.blitTexture(t,l.colorTexture,r.Cj.NEAREST)),s.compositeLayer(i,this.computedOpacity),a.recordContainerEnd()}createRenderParams(e){return{...super.createRenderParams(e),blendMode:this.blendMode,effects:this.computedEffects,globalOpacity:1}}_getFbo(e){const{context:i,painter:t}=e,{width:s,height:r}=i.getViewport();return t.acquireFbo(s,r)}}},26017:function(e,i,t){t.r(i),t.d(i,{default:function(){return b}});var s=t(71457),r=(t(15114),t(37679),t(69292),t(51020),t(47966),t(29916)),a=t(32569),l=t(15235),n=t(41879),h=t(89921),o=t(87400),d=t(76543),y=t(48278);let c=class extends y.A{constructor(e){super(e),this.type="group",this.layerViews=new n.A}destroy(){this.handles.removeAll(),this.layerViews.length=0}_allLayerViewVisibility(e){this.layerViews.forEach((i=>{i.visible=e}))}initialize(){this.handles.add([this.layerViews.on("change",(e=>this._layerViewsChangeHandler(e))),(0,o.wB)((()=>this.layer?.visibilityMode),(()=>{this.layer&&this._applyVisibility((()=>this._allLayerViewVisibility(this.visible)),(()=>this._applyExclusiveVisibility(null)))}),o.OH),(0,o.wB)((()=>this.visible),(e=>{this._applyVisibility((()=>this._allLayerViewVisibility(e)),(()=>{}))}),o.OH)],"grouplayerview"),this._layerViewsChangeHandler({target:null,added:this.layerViews.toArray(),removed:[],moved:[]})}set layerViews(e){this._set("layerViews",(0,h.V)(e,this._get("layerViews")))}get updatingProgress(){return 0===this.layerViews.length?1:this.layerViews.reduce(((e,i)=>e+i.updatingProgress),0)/this.layerViews.length}isUpdating(){return this.layerViews.some((e=>e.updating))}_hasLayerViewVisibleOverrides(){return this.layerViews.some((e=>e._isOverridden("visible")))}_findLayerViewForLayer(e){return e&&this.layerViews.find((i=>i.layer===e))}_firstVisibleOnLayerOrder(){const e=this.layer.layers.find((e=>{const i=this._findLayerViewForLayer(e);return!!i?.visible}));return e&&this._findLayerViewForLayer(e)}_applyExclusiveVisibility(e){null==e&&null==(e=this._firstVisibleOnLayerOrder())&&this.layerViews.length>0&&(e=this._findLayerViewForLayer(this.layer.layers.at(0))),this.layerViews.forEach((i=>{i.visible=i===e}))}_layerViewsChangeHandler(e){this.handles.remove("grouplayerview:visible"),this.handles.add(this.layerViews.map((e=>(0,o.wB)((()=>e.visible),(i=>this._applyVisibility((()=>{i!==this.visible&&(e.visible=this.visible)}),(()=>this._applyExclusiveVisibility(i?e:null)))),o.OH))).toArray(),"grouplayerview:visible");const i=e.added[e.added.length-1];this._applyVisibility((()=>this._allLayerViewVisibility(this.visible)),(()=>this._applyExclusiveVisibility(i?.visible?i:null)))}_applyVisibility(e,i){this._hasLayerViewVisibleOverrides()&&("inherited"===this.layer?.visibilityMode?e():"exclusive"===this.layer?.visibilityMode&&i())}};(0,s._)([(0,d.MZ)({cast:h.H})],c.prototype,"layerViews",null),(0,s._)([(0,d.MZ)({readOnly:!0})],c.prototype,"updatingProgress",null),(0,s._)([(0,d.MZ)()],c.prototype,"view",void 0),c=(0,s._)([(0,r.$)("geoscene.views.layers.GroupLayerView")],c);const p=c;let u=class extends((0,l.e)(p)){constructor(){super(...arguments),this.container=new a.Z}attach(){this._updateStageChildren(),this.addAttachHandles(this.layerViews.on("after-changes",(()=>this._updateStageChildren())))}detach(){this.container.removeAllChildren()}update(e){}moveStart(){}viewChange(){}moveEnd(){}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach(((e,i)=>this.container.addChildAt(e.container,i)))}};u=(0,s._)([(0,r.$)("geoscene.views.2d.layers.GroupLayerView2D")],u);const b=u}}]);
//# sourceMappingURL=6017.ae9fb1c5.js.map