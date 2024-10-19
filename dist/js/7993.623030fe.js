"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[7993],{10374:function(t,e,i){i.d(e,{A:function(){return p},d:function(){return g}});var n=i(3882),a=i(80863),o=i(50250),r=i(40799),s=i(29095),c=i(52441),l=i(64156),d=i(200),u=i(80135),h=i(91798),f=i(40988);
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */
const m={button:"button",buttonTextVisible:"button--text-visible",buttonCompact:"button--compact",indicatorText:"indicator-text",iconContainer:"icon-container",slotContainer:"slot-container",slotContainerHidden:"slot-container--hidden",textContainer:"text-container",textContainerVisible:"text-container--visible",indicatorWithIcon:"indicator-with-icon",indicatorWithoutIcon:"indicator-without-icon"},b={tooltip:"tooltip"},v=':host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;background-color:transparent;--calcite-action-indicator-color:var(--calcite-ui-brand)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.button{position:relative;margin:0px;display:flex;inline-size:auto;cursor:pointer;align-items:center;justify-content:flex-start;border-style:none;background-color:var(--calcite-ui-foreground-1);fill:var(--calcite-ui-text-3);font-family:var(--calcite-sans-family);font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-3);outline-color:transparent;text-align:unset;flex:1 0 auto}.button:hover{background-color:var(--calcite-ui-foreground-2);fill:var(--calcite-ui-text-1);color:var(--calcite-ui-text-1)}.button:focus{background-color:var(--calcite-ui-foreground-2);fill:var(--calcite-ui-text-1);color:var(--calcite-ui-text-1);outline:2px solid var(--calcite-ui-focus-color, var(--calcite-ui-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-ui-focus-offset-invert),\n                1\n              )\n            )\n          )}.button:active{background-color:var(--calcite-ui-foreground-3)}.button .icon-container{pointer-events:none;margin:0px;display:flex;align-items:center;justify-content:center;min-inline-size:1rem;min-block-size:1rem}.button .text-container{margin:0px;inline-size:0px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.5rem;opacity:0;transition-property:opacity;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-property:margin;transition-property:inline-size}.button .text-container--visible{inline-size:auto;flex:1 1 auto;opacity:1}:host([scale=s]) .button{padding-inline:0.5rem;padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=s]) .button--text-visible .icon-container{margin-inline-end:0.5rem}:host([scale=m]) .button{padding-inline:1rem;padding-block:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=m]) .button--text-visible .icon-container{margin-inline-end:0.75rem}:host([scale=l]) .button{padding:1.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=l]) .button--text-visible .icon-container{margin-inline-end:1rem}:host([alignment=center]) .button{justify-content:center}:host([alignment=end]) .button{justify-content:flex-end}:host([alignment=center]) .button .text-container--visible,:host([alignment=end]) .button .text-container--visible{flex:0 1 auto}:host([scale=s][compact]) .button,:host([scale=m][compact]) .button,:host([scale=l][compact]) .button{padding-inline:0px}.slot-container{display:flex}.slot-container--hidden{display:none}.button--text-visible{inline-size:100%}:host([active]) .button,:host([active]) .button:hover,:host([active]) .button:focus,:host([active][loading]) .button{background-color:var(--calcite-ui-foreground-3);fill:var(--calcite-ui-text-1);color:var(--calcite-ui-text-1)}:host([active]) .button:active{background-color:var(--calcite-ui-foreground-1)}:host([appearance=transparent]) .button{background-color:transparent}:host([appearance=transparent][active]) .button,:host([appearance=transparent]) .button:hover,:host([appearance=transparent]) .button:focus{background-color:var(--calcite-button-transparent-hover)}:host([appearance=transparent]) .button:active{background-color:var(--calcite-button-transparent-press)}:host([appearance=transparent][disabled]) .button{background-color:transparent}:host([loading][appearance=solid]) .button,:host([loading][appearance=solid]) .button:hover,:host([loading][appearance=solid]) .button:focus{background-color:var(--calcite-ui-foreground-1)}:host([loading][appearance=solid]) .button .text-container,:host([loading][appearance=solid]) .button:hover .text-container,:host([loading][appearance=solid]) .button:focus .text-container{opacity:var(--calcite-ui-opacity-disabled)}:host([loading]) calcite-loader[inline]{color:var(--calcite-ui-text-3);margin-inline-end:0px}:host([disabled]) .button,:host([disabled]) .button:hover,:host([disabled]) .button:focus{cursor:default;background-color:var(--calcite-ui-foreground-1);opacity:var(--calcite-ui-opacity-disabled)}:host([disabled][active]) .button,:host([disabled][active]) .button:hover,:host([disabled][active]) .button:focus{background-color:var(--calcite-ui-foreground-3);opacity:var(--calcite-ui-opacity-disabled)}:host([appearance=transparent]) .button{background-color:transparent;transition-property:box-shadow;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.indicator-with-icon{position:relative}.indicator-with-icon::after{content:"";position:absolute;block-size:0.5rem;inline-size:0.5rem;border-radius:9999px;inset-block-end:-0.275rem;inset-inline-end:-0.275rem;background-color:var(--calcite-action-indicator-color)}.indicator-without-icon{margin-inline:0.25rem;inline-size:1rem;position:relative}.indicator-without-icon::after{content:"";position:absolute;block-size:0.5rem;inline-size:0.5rem;border-radius:9999px;inset-block-end:-0.275rem;inset-inline-end:-0.275rem;background-color:var(--calcite-action-indicator-color)}.indicator-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}',p=(0,n.w$)(class extends n.wt{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.mutationObserver=(0,l.c)("mutation",(()=>(0,n.$x)(this))),this.guid=`calcite-action-${(0,o.g)()}`,this.indicatorId=`${this.guid}-indicator`,this.buttonId=`${this.guid}-button`,this.handleTooltipSlotChange=t=>{const e=t.target.assignedElements({flatten:!0}).filter((t=>t?.matches("calcite-tooltip"))),i=e[0];i&&(i.referenceElement=this.buttonEl)},this.active=!1,this.alignment=void 0,this.appearance="solid",this.compact=!1,this.disabled=!1,this.icon=void 0,this.iconFlipRtl=!1,this.indicator=!1,this.label=void 0,this.loading=!1,this.scale="m",this.text=void 0,this.textEnabled=!1,this.messages=void 0,this.messageOverrides=void 0,this.effectiveLocale="",this.defaultMessages=void 0}onMessagesChange(){}effectiveLocaleChange(){(0,u.u)(this,this.effectiveLocale)}connectedCallback(){(0,r.c)(this),(0,c.c)(this),(0,u.c)(this),this.mutationObserver?.observe(this.el,{childList:!0,subtree:!0})}async componentWillLoad(){(0,s.a)(this),n.L2.isBrowser&&await(0,u.s)(this)}componentDidLoad(){(0,s.s)(this)}disconnectedCallback(){(0,r.d)(this),(0,c.d)(this),(0,u.d)(this),this.mutationObserver?.disconnect()}componentDidRender(){(0,r.u)(this)}async setFocus(){await(0,s.c)(this),this.buttonEl?.focus()}renderTextContainer(){const{text:t,textEnabled:e}=this,i={[m.textContainer]:!0,[m.textContainerVisible]:e};return t?(0,n.h)("div",{class:i,key:"text-container"},t):null}renderIndicatorText(){const{indicator:t,messages:e,indicatorId:i,buttonId:a}=this;return(0,n.h)("div",{"aria-labelledby":a,"aria-live":"polite",class:m.indicatorText,id:i,role:"region"},t?e.indicator:null)}renderIconContainer(){const{loading:t,icon:e,scale:i,el:a,iconFlipRtl:o,indicator:r}=this,s="l"===i?"l":"m",c=t?(0,n.h)("calcite-loader",{inline:!0,label:this.messages.loading,scale:s}):null,l=e?(0,n.h)("calcite-icon",{class:{[m.indicatorWithIcon]:r},flipRtl:o,icon:e,scale:(0,d.g)(this.scale)}):null,u=c||l,h=u||a.children?.length,f=(0,n.h)("div",{class:{[m.slotContainer]:!0,[m.slotContainerHidden]:t}},(0,n.h)("slot",null));return h?(0,n.h)("div",{"aria-hidden":"true",class:m.iconContainer,key:"icon-container"},u,f):null}render(){const{active:t,compact:e,disabled:i,icon:o,loading:r,textEnabled:s,label:c,text:l,indicator:d,indicatorId:u,buttonId:h,messages:f}=this,v=`${c||l}${d?` (${f.indicator})`:""}`,p={[m.button]:!0,[m.buttonTextVisible]:s,[m.buttonCompact]:e};return(0,n.h)(n.xr,null,(0,n.h)("button",{"aria-busy":(0,a.t)(r),"aria-controls":d?u:null,"aria-disabled":(0,a.t)(i),"aria-label":v,"aria-pressed":(0,a.t)(t),class:p,disabled:i,id:h,ref:t=>this.buttonEl=t},this.renderIconContainer(),this.renderTextContainer(),!o&&d&&(0,n.h)("div",{class:m.indicatorWithoutIcon,key:"indicator-no-icon"})),(0,n.h)("slot",{name:b.tooltip,onSlotchange:this.handleTooltipSlotChange}),this.renderIndicatorText())}static get assetsDirs(){return["assets"]}get el(){return this}static get watchers(){return{messageOverrides:["onMessagesChange"],effectiveLocale:["effectiveLocaleChange"]}}static get style(){return v}},[1,"calcite-action",{active:[516],alignment:[513],appearance:[513],compact:[516],disabled:[516],icon:[1],iconFlipRtl:[516,"icon-flip-rtl"],indicator:[516],label:[1],loading:[516],scale:[513],text:[1],textEnabled:[516,"text-enabled"],messages:[1040],messageOverrides:[1040],effectiveLocale:[32],defaultMessages:[32],setFocus:[64]}]);function g(){if("undefined"===typeof customElements)return;const t=["calcite-action","calcite-icon","calcite-loader"];t.forEach((t=>{switch(t){case"calcite-action":customElements.get(t)||customElements.define(t,p);break;case"calcite-icon":customElements.get(t)||(0,h.d)();break;case"calcite-loader":customElements.get(t)||(0,f.d)();break}}))}g()},200:function(t,e,i){
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */
function n(t){return"l"===t?"m":"s"}i.d(e,{g:function(){return n}})},91798:function(t,e,i){i.d(e,{I:function(){return f},d:function(){return m}});var n=i(3882),a=i(80863),o=i(64156);
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */
const r={icon:"icon",flipRtl:"flip-rtl"},s={},c={},l={s:16,m:24,l:32};async function d({icon:t,scale:e}){const i=l[e],a=u(t),o="F"===a.charAt(a.length-1),r=o?a.substring(0,a.length-1):a,d=`${r}${i}${o?"F":""}`;if(s[d])return s[d];c[d]||(c[d]=fetch((0,n.OX)(`./assets/icon/${d}.json`)).then((t=>t.json())).catch((()=>(console.error(`"${d}" is not a valid calcite-ui-icon name`),""))));const h=await c[d];return s[d]=h,h}function u(t){const e=!isNaN(Number(t.charAt(0))),i=t.split("-"),n=i.length>0;if(n){const e=/[a-z]/i;t=i.map(((t,i)=>t.replace(e,(function(t,e){const n=0===i&&0===e;return n?t:t.toUpperCase()})))).join("")}return e?`i${t}`:t}const h=":host{display:inline-flex;color:var(--calcite-ui-icon-color)}:host([scale=s]){inline-size:16px;block-size:16px;min-inline-size:16px;min-block-size:16px}:host([scale=m]){inline-size:24px;block-size:24px;min-inline-size:24px;min-block-size:24px}:host([scale=l]){inline-size:32px;block-size:32px;min-inline-size:32px;min-block-size:32px}.flip-rtl{transform:scaleX(-1)}.svg{display:block}:host([hidden]){display:none}[hidden]{display:none}",f=(0,n.w$)(class extends n.wt{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.icon=null,this.flipRtl=!1,this.scale="m",this.textLabel=void 0,this.pathData=void 0,this.visible=!1}connectedCallback(){this.waitUntilVisible((()=>{this.visible=!0,this.loadIconPathData()}))}disconnectedCallback(){this.intersectionObserver?.disconnect(),this.intersectionObserver=null}async componentWillLoad(){this.loadIconPathData()}render(){const{el:t,flipRtl:e,pathData:i,scale:o,textLabel:s}=this,c=(0,a.b)(t),d=l[o],u=!!s,h=[].concat(i||"");return(0,n.h)(n.xr,{"aria-hidden":(0,a.t)(!u),"aria-label":u?s:null,role:u?"img":null},(0,n.h)("svg",{"aria-hidden":"true",class:{[r.flipRtl]:"rtl"===c&&e,svg:!0},fill:"currentColor",height:"100%",viewBox:`0 0 ${d} ${d}`,width:"100%",xmlns:"http://www.w3.org/2000/svg"},h.map((t=>"string"===typeof t?(0,n.h)("path",{d:t}):(0,n.h)("path",{d:t.d,opacity:"opacity"in t?t.opacity:1})))))}async loadIconPathData(){const{icon:t,scale:e,visible:i}=this;if(!n.L2.isBrowser||!t||!i)return;const a=await d({icon:t,scale:e});t===this.icon&&(this.pathData=a)}waitUntilVisible(t){this.intersectionObserver=(0,o.c)("intersection",(e=>{e.forEach((e=>{e.isIntersecting&&(this.intersectionObserver.disconnect(),this.intersectionObserver=null,t())}))}),{rootMargin:"50px"}),this.intersectionObserver?this.intersectionObserver.observe(this.el):t()}static get assetsDirs(){return["assets"]}get el(){return this}static get watchers(){return{icon:["loadIconPathData"],scale:["loadIconPathData"]}}static get style(){return h}},[1,"calcite-icon",{icon:[513],flipRtl:[516,"flip-rtl"],scale:[513],textLabel:[1,"text-label"],pathData:[32],visible:[32]}]);function m(){if("undefined"===typeof customElements)return;const t=["calcite-icon"];t.forEach((t=>{switch(t){case"calcite-icon":customElements.get(t)||customElements.define(t,f);break}}))}m()},40799:function(t,e,i){i.d(e,{c:function(){return x},d:function(){return k},u:function(){return f}});var n=i(3882);
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */function a(){return navigator.userAgentData}function o(){if(!n.L2.isBrowser)return"";const t=a();return t?.brands?t.brands.map((({brand:t,version:e})=>`${t}/${e}`)).join(" "):navigator.userAgent}const r=/firefox/i.test(o()),s=r?new WeakMap:null;function c(){const{disabled:t}=this;t||HTMLElement.prototype.click.call(this)}function l(t){const e=t.target;if(r&&!s.get(e))return;const{disabled:i}=e;i&&t.preventDefault()}const d=["mousedown","mouseup","click"];function u(t){if(r&&!s.get(t.target))return;const{disabled:e}=t.target;e&&(t.stopImmediatePropagation(),t.preventDefault())}const h={capture:!0};function f(t,e=!1){if(t.disabled)return t.el.setAttribute("tabindex","-1"),t.el.setAttribute("aria-disabled","true"),t.el.contains(document.activeElement)&&document.activeElement.blur(),void m(t);p(t),"function"===typeof e?t.el.setAttribute("tabindex",e.call(t)?"0":"-1"):!0===e?t.el.setAttribute("tabindex","0"):!1===e&&t.el.removeAttribute("tabindex"),t.el.removeAttribute("aria-disabled")}function m(t){t.el.click=c,b(r?v(t):t.el)}function b(t){t&&(t.addEventListener("pointerdown",l,h),d.forEach((e=>t.addEventListener(e,u,h))))}function v(t){return s.get(t.el)}function p(t){delete t.el.click,g(r?v(t):t.el)}function g(t){t&&(t.removeEventListener("pointerdown",l,h),d.forEach((e=>t.removeEventListener(e,u,h))))}function x(t){if(!t.disabled||!r)return;const e=t.el.parentElement||t.el;s.set(t.el,e),m(t)}function k(t){r&&(s.delete(t.el),p(t))}},29095:function(t,e,i){i.d(e,{a:function(){return r},c:function(){return l},s:function(){return s}});var n=i(3882);
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */const a=new WeakMap,o=new WeakMap;function r(t){o.set(t,new Promise((e=>a.set(t,e))))}function s(t){a.get(t)()}function c(t){return o.get(t)}async function l(t){if(await c(t),n.L2.isBrowser)return(0,n.$x)(t),new Promise((t=>requestAnimationFrame((()=>t()))))}},40988:function(t,e,i){i.d(e,{d:function(){return s}});var n=i(3882),a=i(50250);
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */
const o='@charset "UTF-8";@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0}}:host{position:relative;margin-inline:auto;display:none;align-items:center;justify-content:center;opacity:1;min-block-size:var(--calcite-loader-size);font-size:var(--calcite-loader-font-size);stroke:var(--calcite-ui-brand);stroke-width:3;fill:none;transform:scale(1, 1);animation:loader-color-shift calc(var(--calcite-internal-animation-timing-slow) / var(--calcite-internal-duration-factor) * 2 / var(--calcite-internal-duration-factor)) alternate-reverse infinite linear;padding-block:var(--calcite-loader-padding, 4rem)}:host([scale=s]){--calcite-loader-font-size:var(--calcite-font-size--2);--calcite-loader-size:2rem;--calcite-loader-size-inline:0.75rem}:host([scale=m]){--calcite-loader-font-size:var(--calcite-font-size-0);--calcite-loader-size:4rem;--calcite-loader-size-inline:1rem}:host([scale=l]){--calcite-loader-font-size:var(--calcite-font-size-2);--calcite-loader-size:6rem;--calcite-loader-size-inline:1.5rem}:host([no-padding]){padding-block:0px}:host{display:flex}.loader__text{display:block;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;color:var(--calcite-ui-text-1);margin-block-start:calc(var(--calcite-loader-size) + 1.5rem)}.loader__percentage{position:absolute;display:block;text-align:center;color:var(--calcite-ui-text-1);font-size:var(--calcite-loader-font-size);inline-size:var(--calcite-loader-size);inset-inline-start:50%;margin-inline-start:calc(var(--calcite-loader-size) / 2 * -1);line-height:0.25;transform:scale(1, 1)}.loader__svgs{position:absolute;overflow:visible;opacity:1;inline-size:var(--calcite-loader-size);block-size:var(--calcite-loader-size);inset-inline-start:50%;margin-inline-start:calc(var(--calcite-loader-size) / 2 * -1);animation-iteration-count:infinite;animation-timing-function:linear;animation-duration:calc(var(--calcite-internal-animation-timing-slow) / var(--calcite-internal-duration-factor) * 6.66 / var(--calcite-internal-duration-factor));animation-name:loader-clockwise}.loader__svg{position:absolute;inset-block-start:0px;transform-origin:center;overflow:visible;inset-inline-start:0;inline-size:var(--calcite-loader-size);block-size:var(--calcite-loader-size);animation-iteration-count:infinite;animation-timing-function:linear}@supports (display: grid){.loader__svg--1{animation-name:loader-offset-1}.loader__svg--2{animation-name:loader-offset-2}.loader__svg--3{animation-name:loader-offset-3}}:host([type=determinate]){animation:none;stroke:var(--calcite-ui-border-3)}:host([type=determinate]) .loader__svgs{animation:none}:host([type=determinate]) .loader__svg--3{animation:none;stroke:var(--calcite-ui-brand);stroke-dasharray:150.79632;transform:rotate(-90deg);transition:all var(--calcite-internal-animation-timing-fast) linear}:host([inline]){position:relative;margin:0px;animation:none;stroke:currentColor;stroke-width:2;padding-block:0px;block-size:var(--calcite-loader-size-inline);min-block-size:var(--calcite-loader-size-inline);inline-size:var(--calcite-loader-size-inline);margin-inline-end:calc(var(--calcite-loader-size-inline) * 0.5);vertical-align:calc(var(--calcite-loader-size-inline) * -1 * 0.2)}:host([inline]) .loader__svgs{inset-block-start:0px;margin:0px;inset-inline-start:0;inline-size:var(--calcite-loader-size-inline);block-size:var(--calcite-loader-size-inline)}:host([inline]) .loader__svg{inline-size:var(--calcite-loader-size-inline);block-size:var(--calcite-loader-size-inline)}:host([complete]){opacity:0;transform:scale(0.75, 0.75);transform-origin:center;transition:opacity var(--calcite-internal-animation-timing-medium) linear 1000ms, transform var(--calcite-internal-animation-timing-medium) linear 1000ms}:host([complete]) .loader__svgs{opacity:0;transform:scale(0.75, 0.75);transform-origin:center;transition:opacity calc(180ms * var(--calcite-internal-duration-factor)) linear 800ms, transform calc(180ms * var(--calcite-internal-duration-factor)) linear 800ms}:host([complete]) .loader__percentage{color:var(--calcite-ui-brand);transform:scale(1.05, 1.05);transform-origin:center;transition:color var(--calcite-internal-animation-timing-medium) linear, transform var(--calcite-internal-animation-timing-medium) linear}.loader__svg--1{stroke-dasharray:27.9252444444 139.6262222222;animation-duration:calc(var(--calcite-internal-animation-timing-slow) / var(--calcite-internal-duration-factor) * 4.8 / var(--calcite-internal-duration-factor))}@keyframes loader-offset-1{0%{stroke-dasharray:27.9252444444 251.3272;stroke-dashoffset:0}50%{stroke-dasharray:139.6262222222 139.6262222222;stroke-dashoffset:-83.7757333333}100%{stroke-dasharray:27.9252444444 251.3272;stroke-dashoffset:-279.2524444444}}.loader__svg--2{stroke-dasharray:55.8504888889 139.6262222222;animation-duration:calc(var(--calcite-internal-animation-timing-slow) / var(--calcite-internal-duration-factor) * 6.4 / var(--calcite-internal-duration-factor))}@keyframes loader-offset-2{0%{stroke-dasharray:55.8504888889 223.4019555556;stroke-dashoffset:0}50%{stroke-dasharray:139.6262222222 139.6262222222;stroke-dashoffset:-97.7383555556}100%{stroke-dasharray:55.8504888889 223.4019555556;stroke-dashoffset:-279.2524444444}}.loader__svg--3{stroke-dasharray:13.9626222222 139.6262222222;animation-duration:calc(var(--calcite-internal-animation-timing-slow) / var(--calcite-internal-duration-factor) * 7.734 / var(--calcite-internal-duration-factor))}@keyframes loader-offset-3{0%{stroke-dasharray:13.9626222222 265.2898222222;stroke-dashoffset:0}50%{stroke-dasharray:139.6262222222 139.6262222222;stroke-dashoffset:-76.7944222222}100%{stroke-dasharray:13.9626222222 265.2898222222;stroke-dashoffset:-279.2524444444}}@keyframes loader-color-shift{0%{stroke:var(--calcite-ui-brand)}33%{stroke:var(--calcite-ui-brand-press)}66%{stroke:var(--calcite-ui-brand-hover)}100%{stroke:var(--calcite-ui-brand)}}@keyframes loader-clockwise{100%{transform:rotate(360deg)}}:host([hidden]){display:none}[hidden]{display:none}',r=(0,n.w$)(class extends n.wt{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.inline=!1,this.label=void 0,this.scale="m",this.type=void 0,this.value=0,this.text=""}render(){const{el:t,inline:e,label:i,scale:o,text:r,type:s,value:c}=this,l=t.id||(0,a.g)(),d=.45,u=e?this.getInlineSize(o):this.getSize(o),h=u*d,f=`0 0 ${u} ${u}`,m="determinate"===s,b=2*h*Math.PI,v=c/100*b,p=b-v,g=Math.floor(c),x={"aria-valuenow":g,"aria-valuemin":0,"aria-valuemax":100,complete:100===g},k={r:h,cx:u/2,cy:u/2},y={"stroke-dasharray":`${v} ${p}`};return(0,n.h)(n.xr,{"aria-label":i,id:l,role:"progressbar",...m?x:{}},(0,n.h)("div",{class:"loader__svgs"},(0,n.h)("svg",{"aria-hidden":"true",class:"loader__svg loader__svg--1",viewBox:f},(0,n.h)("circle",{...k})),(0,n.h)("svg",{"aria-hidden":"true",class:"loader__svg loader__svg--2",viewBox:f},(0,n.h)("circle",{...k})),(0,n.h)("svg",{"aria-hidden":"true",class:"loader__svg loader__svg--3",viewBox:f,...m?{style:y}:{}},(0,n.h)("circle",{...k}))),r&&(0,n.h)("div",{class:"loader__text"},r),m&&(0,n.h)("div",{class:"loader__percentage"},c))}getSize(t){return{s:32,m:56,l:80}[t]}getInlineSize(t){return{s:12,m:16,l:20}[t]}get el(){return this}static get style(){return o}},[1,"calcite-loader",{inline:[516],label:[1],scale:[513],type:[513],value:[2],text:[1]}]);function s(){if("undefined"===typeof customElements)return;const t=["calcite-loader"];t.forEach((t=>{switch(t){case"calcite-loader":customElements.get(t)||customElements.define(t,r);break}}))}s()}}]);
//# sourceMappingURL=7993.623030fe.js.map