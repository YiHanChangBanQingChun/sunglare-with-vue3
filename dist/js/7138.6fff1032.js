"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[7138],{32322:function(t,e,i){i.d(e,{$B:function(){return d}});i(44114);var n=i(71457),s=i(3734),r=i(51020),o=i(1834),h=i(15114),l=i(76543),u=(i(37679),i(29916)),a=i(21249),c=i(78189);const f=-1;let d=class extends s.A{constructor(t){super(t),this._from=null,this._to=null,this._final=null,this._current=[],this._time=0,this.duration=(0,r.A)("mapview-transitions-duration"),this.effects=[]}set effect(t){if(this._get("effect")!==(t=t||"")){this._set("effect",t);try{this._transitionTo(_(t))}catch(e){this._transitionTo([]),h.A.getLogger(this).warn("Invalid Effect",{effect:t,error:e})}}}get hasEffects(){return this.transitioning||!!this.effects.length}set scale(t){this._updateForScale(t)}get transitioning(){return null!==this._to}canTransitionTo(t){try{return this.scale>0&&p(this._current,_(t),this.scale)}catch{return!1}}transitionStep(t,e){this._applyTimeTransition(t),this._updateForScale(e)}endTransitions(){this._applyTimeTransition(this.duration)}_transitionTo(t){this.scale>0&&p(this._current,t,this.scale)?(this._final=t,this._to=(0,o.o8)(t),g(this._current,this._to,this.scale),this._from=(0,o.o8)(this._current),this._time=0):(this._from=this._to=this._final=null,this._current=t),this._set("effects",this._current[0]?(0,o.o8)(this._current[0].effects):[])}_applyTimeTransition(t){if(!(this._to&&this._from&&this._current&&this._final))return;this._time+=t;const e=Math.min(1,this._time/this.duration);for(let i=0;i<this._current.length;i++){const t=this._current[i],n=this._from[i],s=this._to[i];t.scale=m(n.scale,s.scale,e);for(let i=0;i<t.effects.length;i++){const r=t.effects[i],o=n.effects[i],h=s.effects[i];r.interpolate(o,h,e)}}1===e&&(this._current=this._final,this._set("effects",this._current[0]?(0,o.o8)(this._current[0].effects):[]),this._from=this._to=this._final=null)}_updateForScale(t){if(this._set("scale",t),0===this._current.length)return;const e=this._current,i=this._current.length-1;let n,s,r=1;if(1===e.length||t>=e[0].scale)s=n=e[0].effects;else if(t<=e[i].scale)s=n=e[i].effects;else for(let o=0;o<i;o++){const i=e[o],h=e[o+1];if(i.scale>=t&&h.scale<=t){r=(t-i.scale)/(h.scale-i.scale),n=i.effects,s=h.effects;break}}for(let o=0;o<this.effects.length;o++)this.effects[o].interpolate(n[o],s[o],r)}};function _(t){const e=(0,a.q)(t)||[];return v(e)?[{scale:f,effects:e}]:e}function p(t,e,i){return!t[0]?.effects||!e[0]?.effects||!((t[0]?.scale===f||e[0]?.scale===f)&&(t.length>1||e.length>1)&&i<=0)&&(0,c.mj)(t[0].effects,e[0].effects)}function g(t,e,i){const n=t.length>e.length?t:e,s=t.length>e.length?e:t,r=s[s.length-1],o=r?.scale??i,h=r?.effects??[];for(let l=s.length;l<n.length;l++)s.push({scale:o,effects:[...h]});for(let l=0;l<n.length;l++)s[l].scale=s[l].scale===f?i:s[l].scale,n[l].scale=n[l].scale===f?i:n[l].scale,(0,c.O9)(s[l].effects,n[l].effects)}function m(t,e,i){return t+(e-t)*i}function v(t){const e=t[0];return!!e&&"type"in e}(0,n._)([(0,l.MZ)()],d.prototype,"_to",void 0),(0,n._)([(0,l.MZ)()],d.prototype,"duration",void 0),(0,n._)([(0,l.MZ)({value:""})],d.prototype,"effect",null),(0,n._)([(0,l.MZ)({readOnly:!0})],d.prototype,"effects",void 0),(0,n._)([(0,l.MZ)({readOnly:!0})],d.prototype,"hasEffects",null),(0,n._)([(0,l.MZ)({value:0})],d.prototype,"scale",null),(0,n._)([(0,l.MZ)({readOnly:!0})],d.prototype,"transitioning",null),d=(0,n._)([(0,u.$)("geoscene.layers.effects.EffectView")],d)},57138:function(t,e,i){i.d(e,{m:function(){return h}});i(44114),i(17642),i(58004),i(33853),i(45876),i(32475),i(15024),i(31698);var n=i(45611),s=i(32322),r=i(25124),o=i(50221);class h extends r.q{constructor(){super(...arguments),this._childrenSet=new Set,this._needsSort=!1,this.children=[],this._effectView=null,this._highlightOptions=null,this._highlightGradient=null}get blendMode(){return this._blendMode}set blendMode(t){this._blendMode=t,this.requestRender()}get clips(){return this._clips}set clips(t){this._clips=t,this.children.forEach((e=>e.clips=t))}get computedEffects(){return this._effectView?.effects??null}get effect(){return this._effectView?.effect??""}set effect(t){(this._effectView||t)&&(this._effectView||(this._effectView=new s.$B),this._effectView.effect=t,this.requestRender())}get highlightOptions(){return this._highlightOptions}set highlightOptions(t){if(!t)return this._highlightOptions=null,void(this._highlightGradient&&(this._highlightGradient.destroy(),this._highlightGradient=null,this.requestRender()));this._highlightOptions&&this._highlightOptions.equals(t)||(this._highlightOptions=t,this._highlightGradient||(this._highlightGradient=new o.A),this._highlightGradient.setHighlightOptions(t),this.requestRender())}updateTransitionProperties(t,e){super.updateTransitionProperties(t,e),this._effectView&&(this._effectView.transitionStep(t,e),this._effectView.transitioning&&this.requestRender())}doRender(t){const e=this.createRenderParams(t);this.renderChildren(e)}addChild(t){return this.addChildAt(t,this.children.length)}addChildAt(t,e=this.children.length){if(!t)return t;if(this.contains(t))return t;this._needsSort=!0;const i=t.parent;return i&&i!==this&&i.removeChild(t),e>=this.children.length?this.children.push(t):this.children.splice(e,0,t),this._childrenSet.add(t),t.parent=this,t.stage=this.stage,this!==this.stage&&(t.clips=this.clips),this.requestRender(),t}contains(t){return this._childrenSet.has(t)}endTransitions(){super.endTransitions(),this._effectView&&(this._effectView.endTransitions(),this.requestRender())}removeAllChildren(){this._childrenSet.clear(),this._needsSort=!0;for(const t of this.children)this!==this.stage&&(t.clips=null),t.stage=null,t.parent=null;this.children.length=0}removeChild(t){return this.contains(t)?this.removeChildAt(this.children.indexOf(t)):t}removeChildAt(t){if(t<0||t>=this.children.length)return null;this._needsSort=!0;const e=this.children.splice(t,1)[0];return this._childrenSet.delete(e),this!==this.stage&&(e.clips=null),e.stage=null,e.parent=null,e}sortChildren(t){this._needsSort&&(this.children.sort(t),this._needsSort=!1)}beforeRender(t){super.beforeRender(t);for(const e of this.children)e.beforeRender(t)}afterRender(t){super.afterRender(t);for(const e of this.children)e.afterRender(t)}_createTransforms(){return{dvs:(0,n.c)()}}onAttach(){super.onAttach();const t=this.stage;for(const e of this.children)e.stage=t}onDetach(){super.onDetach();for(const t of this.children)t.stage=null}renderChildren(t){for(const e of this.children)e.processRender(t)}createRenderParams(t){return{...t,blendMode:this.blendMode,effects:this.computedEffects,globalOpacity:t.globalOpacity*this.computedOpacity,inFadeTransition:this.inFadeTransition,highlightGradient:this._highlightGradient||t.highlightGradient}}}},25124:function(t,e,i){i.d(e,{q:function(){return h}});var n=i(20573),s=i(51020),r=i(71120);const o=1/(0,s.A)("mapview-transitions-duration");class h extends n.A{constructor(){super(...arguments),this._fadeOutResolver=null,this._fadeInResolver=null,this._clips=null,this.computedVisible=!0,this.computedOpacity=1,this.fadeTransitionEnabled=!1,this.inFadeTransition=!1,this._isReady=!1,this._opacity=1,this.parent=null,this._stage=null,this._visible=!0}get clips(){return this._clips}set clips(t){this._clips=t,this.requestRender()}get isReady(){return this._isReady}get opacity(){return this._opacity}set opacity(t){this._opacity!==t&&(this._opacity=Math.min(1,Math.max(t,0)),this.requestRender())}get stage(){return this._stage}set stage(t){if(this._stage===t)return;const e=this._stage;this._stage=t,t?this._stage?.untrashDisplayObject(this)||(this.onAttach(),this.emit("attach")):e?.trashDisplayObject(this)}get transforms(){return this._getTransforms()}_getTransforms(){return null==this._transforms&&(this._transforms=this._createTransforms()),this._transforms}get visible(){return this._visible}set visible(t){this._visible!==t&&(this._visible=t,this.requestRender())}fadeIn(){return this._fadeInResolver||(this._fadeOutResolver&&(this._fadeOutResolver(),this._fadeOutResolver=null),this.opacity=1,this.computedOpacity=0,this.fadeTransitionEnabled=!0,this._fadeInResolver=(0,r.Tw)(),this.requestRender()),this._fadeInResolver.promise}fadeOut(){return this._fadeOutResolver||(this.opacity=0,this._fadeInResolver&&(this._fadeInResolver(),this._fadeInResolver=null),this.fadeTransitionEnabled=!0,this._fadeOutResolver=(0,r.Tw)(),this.requestRender()),this._fadeOutResolver.promise}endTransitions(){this._fadeInResolver?.(),this._fadeInResolver=null,this._fadeOutResolver?.(),this._fadeOutResolver=null,this.computedOpacity=this.visible?this.opacity:0,this.requestRender()}beforeRender(t){this.updateTransitionProperties(t.deltaTime,t.state.scale)}afterRender(t){this._fadeInResolver&&this.computedOpacity===this.opacity?(this._fadeInResolver(),this._fadeInResolver=null):this._fadeOutResolver&&0===this.computedOpacity&&(this._fadeOutResolver(),this._fadeOutResolver=null)}remove(){this.parent?.removeChild(this)}setTransform(t){}processRender(t){this.stage&&this.computedVisible&&this.doRender(t)}requestRender(){this.stage&&this.stage.requestRender()}processDetach(){this._fadeInResolver&&(this._fadeInResolver(),this._fadeInResolver=null),this._fadeOutResolver&&(this._fadeOutResolver(),this._fadeOutResolver=null),this.onDetach(),this.emit("detach")}updateTransitionProperties(t,e){if(this.fadeTransitionEnabled){const e=this._fadeOutResolver||!this.visible?0:this.opacity,i=this.computedOpacity;if(i===e)this.computedVisible=this.visible;else{const n=t*o;this.computedOpacity=i>e?Math.max(e,i-n):Math.min(e,i+n),this.computedVisible=this.computedOpacity>0;const s=e===this.computedOpacity;this.inFadeTransition=!s,s||this.requestRender()}}else this.computedOpacity=this.opacity,this.computedVisible=this.visible}onAttach(){}onDetach(){}doRender(t){}ready(){this._isReady||(this._isReady=!0,this.emit("isReady"),this.requestRender())}}},17:function(t,e,i){i.d(e,{Aq:function(){return U},D8:function(){return Y},ER:function(){return W},EU:function(){return at},GW:function(){return v},Ge:function(){return G},HX:function(){return R},Ig:function(){return z},Jn:function(){return it},MB:function(){return J},ML:function(){return I},MO:function(){return nt},OZ:function(){return a},Ot:function(){return b},Oz:function(){return y},QK:function(){return g},Qf:function(){return V},R6:function(){return k},R9:function(){return m},Rs:function(){return S},S_:function(){return u},Sy:function(){return ut},T4:function(){return B},Tp:function(){return P},UQ:function(){return M},Vb:function(){return C},Vw:function(){return T},Z:function(){return x},_Q:function(){return X},_p:function(){return et},aQ:function(){return O},ah:function(){return s},b$:function(){return N},bu:function(){return Q},c7:function(){return L},cj:function(){return p},dn:function(){return o},eS:function(){return rt},ev:function(){return c},ft:function(){return l},hx:function(){return A},jG:function(){return st},k3:function(){return _},k6:function(){return lt},kn:function(){return ht},lE:function(){return $},lt:function(){return d},lx:function(){return ot},mZ:function(){return D},oQ:function(){return K},of:function(){return E},pK:function(){return H},qd:function(){return h},qj:function(){return f},rr:function(){return F},sg:function(){return w},st:function(){return j},ts:function(){return tt},vl:function(){return Z},xL:function(){return r},xd:function(){return q}});var n=i(51020);const s=1e-30,r=4294967295,o=512,h=128,l=511,u=16777216,a=8,c=10,f=29,d=24,_=8,p={metrics:{width:15,height:17,left:0,top:-7,advance:14}},g=0,m=0,v=0,R=1,y=2,C=3,O=4,T=5,b=6,w=12,M=5,x=6,q=5,W=6,A=0,S=1,V=2,H=3,I=4,k=2,D=1,P=2,E=4,G=1.05,Z=(0,n.A)("featurelayer-force-marker-text-draw-order")?.5:3,Y=5,j=6,F=1.15,Q=2,L=128-2*Q,U=8,$=500,B=10,K=1024,X=2,z=0,J=1,N=4,tt=8,et=16,it=4,nt=1,st=4,rt=8,ot=32,ht=64,lt=128,ut=4,at=2},50221:function(t,e,i){i.d(e,{A:function(){return f}});i(16573),i(78100),i(77936),i(37467),i(44732),i(79577);var n=i(15114),s=i(17),r=i(58805),o=i(73719),h=i(69635),l=i(54703);const u=n.A.getLogger("geoscene.views.2d.engine.webgl.painter.highlight.HighlightGradient");function a(t,e){e.fillColor[0]=t.color.r/255,e.fillColor[1]=t.color.g/255,e.fillColor[2]=t.color.b/255,e.fillColor[3]=t.color.a,t.haloColor?(e.outlineColor[0]=t.haloColor.r/255,e.outlineColor[1]=t.haloColor.g/255,e.outlineColor[2]=t.haloColor.b/255,e.outlineColor[3]=t.haloColor.a):(e.outlineColor[0]=e.fillColor[0],e.outlineColor[1]=e.fillColor[1],e.outlineColor[2]=e.fillColor[2],e.outlineColor[3]=e.fillColor[3]),e.fillColor[3]*=t.fillOpacity,e.outlineColor[3]*=t.haloOpacity,e.fillColor[0]*=e.fillColor[3],e.fillColor[1]*=e.fillColor[3],e.fillColor[2]*=e.fillColor[3],e.outlineColor[0]*=e.outlineColor[3],e.outlineColor[1]*=e.outlineColor[3],e.outlineColor[2]*=e.outlineColor[3],e.outlineWidth=r.Yk.outlineWidth,e.outerHaloWidth=r.Yk.outerHaloWidth,e.innerHaloWidth=r.Yk.innerHaloWidth,e.outlinePosition=r.Yk.outlinePosition}const c=[0,0,0,0];class f{constructor(){this._convertedHighlightOptions={fillColor:[.2*.75,.6*.75,.675,.75],outlineColor:[.2*.9,.54,.81,.9],outlinePosition:r.Yk.outlinePosition,outlineWidth:r.Yk.outlineWidth,innerHaloWidth:r.Yk.innerHaloWidth,outerHaloWidth:r.Yk.outerHaloWidth},this._shadeTexChanged=!0,this._texelData=new Uint8Array(4*r.o8),this._minMaxDistance=[0,0]}setHighlightOptions(t){const e=this._convertedHighlightOptions;a(t,e);const i=e.outlinePosition-e.outlineWidth/2-e.outerHaloWidth,n=e.outlinePosition-e.outlineWidth/2,s=e.outlinePosition+e.outlineWidth/2,o=e.outlinePosition+e.outlineWidth/2+e.innerHaloWidth,h=Math.sqrt(Math.PI/2)*r.y_,l=Math.abs(i)>h?Math.round(10*(Math.abs(i)-h))/10:0,f=Math.abs(o)>h?Math.round(10*(Math.abs(o)-h))/10:0;let d;l&&!f?u.error("The outer rim of the highlight is "+l+"px away from the edge of the feature; consider reducing some width values or shifting the outline position towards positive values (inwards)."):!l&&f?u.error("The inner rim of the highlight is "+f+"px away from the edge of the feature; consider reducing some width values or shifting the outline position towards negative values (outwards)."):l&&f&&u.error("The highlight is "+Math.max(l,f)+"px away from the edge of the feature; consider reducing some width values.");const _=[void 0,void 0,void 0,void 0];function p(t,e,i){_[0]=(1-i)*t[0]+i*e[0],_[1]=(1-i)*t[1]+i*e[1],_[2]=(1-i)*t[2]+i*e[2],_[3]=(1-i)*t[3]+i*e[3]}const{_texelData:g}=this;for(let u=0;u<r.o8;++u)d=i+u/(r.o8-1)*(o-i),d<i?(_[4*u]=0,_[4*u+1]=0,_[4*u+2]=0,_[4*u+3]=0):d<n?p(c,e.outlineColor,(d-i)/(n-i)):d<s?[_[0],_[1],_[2],_[3]]=e.outlineColor:d<o?p(e.outlineColor,e.fillColor,(d-s)/(o-s)):[_[4*u],_[4*u+1],_[4*u+2],_[4*u+3]]=e.fillColor,g[4*u]=255*_[0],g[4*u+1]=255*_[1],g[4*u+2]=255*_[2],g[4*u+3]=255*_[3];this._minMaxDistance[0]=i,this._minMaxDistance[1]=o,this._shadeTexChanged=!0}applyHighlightOptions(t,e){if(!this._shadeTex){const e=new l.R;e.wrapMode=o.pF.CLAMP_TO_EDGE,e.width=r.o8,e.height=1,this._shadeTex=new h.g(t,e)}this._shadeTexChanged&&(this._shadeTex.updateData(0,0,0,r.o8,1,this._texelData),this._shadeTexChanged=!1),t.bindTexture(this._shadeTex,s.Z),e.setUniform2fv("u_minMaxDistance",this._minMaxDistance)}destroy(){this._shadeTex?.dispose(),this._shadeTex=null}}},58805:function(t,e,i){i.d(e,{Yk:function(){return h},im:function(){return r},o8:function(){return o},oX:function(){return s},y_:function(){return n}});const n=1,s=[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],r=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],o=256,h={outlineWidth:1.3,outerHaloWidth:.4,innerHaloWidth:.4,outlinePosition:0}}}]);
//# sourceMappingURL=7138.6fff1032.js.map