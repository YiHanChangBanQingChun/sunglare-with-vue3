"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[5995],{55995:function(e,t,a){a.r(t),a.d(t,{CalciteFlowItem:function(){return B},defineCustomElement:function(){return F}});var i=a(3882),n=a(80863),s=a(40799),o=a(29095),c=a(52441),l=a(80135),r=a(64156),d=a(80162),h=a(14194),u=a(10374),g=a(91798),m=a(40988),p=a(2221),b=a(45749);
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */
const f={actionBarContainer:"action-bar-container",backButton:"back-button",container:"container",header:"header",headerContainer:"header-container",headerContainerBorderEnd:"header-container--border-end",heading:"heading",summary:"summary",description:"description",headerContent:"header-content",headerActions:"header-actions",headerActionsEnd:"header-actions--end",headerActionsStart:"header-actions--start",contentWrapper:"content-wrapper",fabContainer:"fab-container",footer:"footer"},v={close:"x",menu:"ellipsis",backLeft:"chevron-left",backRight:"chevron-right",expand:"chevron-down",collapse:"chevron-up"},k={actionBar:"action-bar",headerActionsStart:"header-actions-start",headerActionsEnd:"header-actions-end",headerMenuActions:"header-menu-actions",headerContent:"header-content",fab:"fab",footer:"footer",footerActions:"footer-actions"},C=":host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-ui-text-2);color:var(--calcite-ui-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.container{margin:0px;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;background-color:var(--calcite-ui-background);padding:0px;transition:max-block-size var(--calcite-animation-timing), inline-size var(--calcite-animation-timing)}.container[hidden]{display:none}.header{z-index:var(--calcite-app-z-index-header);display:flex;flex-direction:column;background-color:var(--calcite-ui-foreground-1);border-block-end:var(--calcite-panel-header-border-block-end, 1px solid var(--calcite-ui-border-3))}.header-container{display:flex;inline-size:100%;flex-direction:row;align-items:stretch;justify-content:flex-start;flex:0 0 auto}.header-container--border-end{border-block-end:1px solid var(--calcite-ui-border-3)}.action-bar-container{inline-size:100%}.action-bar-container ::slotted(calcite-action-bar){inline-size:100%}.header-content{display:flex;flex-direction:column;overflow:hidden;padding-inline:0.75rem;padding-block:0.875rem;margin-inline-end:auto}.header-content .heading,.header-content .description{display:block;overflow-wrap:break-word;padding:0px}.header-content .heading{margin-inline:0px;margin-block:0px 0.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-medium)}.header-content .heading:only-child{margin-block-end:0px}.header-content .description{font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-ui-text-2)}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-ui-border-3);border-inline-end-width:1px}.header-actions{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:stretch}.header-actions--end{margin-inline-start:auto}.content-wrapper{display:flex;block-size:100%;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;overflow:auto;background-color:var(--calcite-ui-background)}.footer{display:flex;inline-size:100%;justify-content:space-evenly;background-color:var(--calcite-ui-foreground-1);flex:0 0 auto;padding:var(--calcite-panel-footer-padding, 0.5rem);border-block-start:1px solid var(--calcite-ui-border-3)}.fab-container{position:sticky;inset-block-end:0px;z-index:var(--calcite-app-z-index-sticky);margin-block:0px;margin-inline:auto;display:block;padding:0.5rem;inset-inline:0;inline-size:-moz-fit-content;inline-size:fit-content}:host([hidden]){display:none}[hidden]{display:none}",x=(0,i.w$)(class extends i.wt{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calcitePanelClose=(0,i.lh)(this,"calcitePanelClose",6),this.calcitePanelToggle=(0,i.lh)(this,"calcitePanelToggle",6),this.calcitePanelScroll=(0,i.lh)(this,"calcitePanelScroll",6),this.resizeObserver=(0,r.c)("resize",(()=>this.resizeHandler())),this.resizeHandler=()=>{const{panelScrollEl:e}=this;e&&"number"===typeof e.scrollHeight&&"number"===typeof e.offsetHeight&&(e.tabIndex=e.scrollHeight>e.offsetHeight?0:-1)},this.setContainerRef=e=>{this.containerEl=e},this.panelKeyDownHandler=e=>{this.closable&&"Escape"===e.key&&!e.defaultPrevented&&(this.close(),e.preventDefault())},this.close=()=>{this.closed=!0,this.calcitePanelClose.emit()},this.collapse=()=>{this.collapsed=!this.collapsed,this.calcitePanelToggle.emit()},this.panelScrollHandler=()=>{this.calcitePanelScroll.emit()},this.handleHeaderActionsStartSlotChange=e=>{this.hasStartActions=(0,n.e)(e)},this.handleHeaderActionsEndSlotChange=e=>{this.hasEndActions=(0,n.e)(e)},this.handleHeaderMenuActionsSlotChange=e=>{this.hasMenuItems=(0,n.e)(e)},this.handleActionBarSlotChange=e=>{const t=(0,n.s)(e).filter((e=>e?.matches("calcite-action-bar")));t.forEach((e=>e.layout="horizontal")),this.hasActionBar=!!t.length},this.handleHeaderContentSlotChange=e=>{this.hasHeaderContent=(0,n.e)(e)},this.handleFooterSlotChange=e=>{this.hasFooterContent=(0,n.e)(e)},this.handleFooterActionsSlotChange=e=>{this.hasFooterActions=(0,n.e)(e)},this.handleFabSlotChange=e=>{this.hasFab=(0,n.e)(e)},this.setPanelScrollEl=e=>{this.panelScrollEl=e,this.resizeObserver?.disconnect(),e&&(this.resizeObserver?.observe(e),this.resizeHandler())},this.closed=!1,this.disabled=!1,this.closable=!1,this.collapsed=!1,this.collapseDirection="down",this.collapsible=!1,this.headingLevel=void 0,this.loading=!1,this.heading=void 0,this.description=void 0,this.menuOpen=!1,this.messageOverrides=void 0,this.messages=void 0,this.hasStartActions=!1,this.hasEndActions=!1,this.hasMenuItems=!1,this.hasHeaderContent=!1,this.hasActionBar=!1,this.hasFooterContent=!1,this.hasFooterActions=!1,this.hasFab=!1,this.defaultMessages=void 0,this.effectiveLocale="",this.showHeaderContent=!1}onMessagesChange(){}connectedCallback(){(0,s.c)(this),(0,c.c)(this),(0,l.c)(this)}async componentWillLoad(){(0,o.a)(this),await(0,l.s)(this)}componentDidLoad(){(0,o.s)(this)}componentDidRender(){(0,s.u)(this)}disconnectedCallback(){(0,s.d)(this),(0,c.d)(this),(0,l.d)(this),this.resizeObserver?.disconnect()}effectiveLocaleChange(){(0,l.u)(this,this.effectiveLocale)}async setFocus(){await(0,o.c)(this),(0,n.f)(this.containerEl)}async scrollContentTo(e){this.panelScrollEl?.scrollTo(e)}renderHeaderContent(){const{heading:e,headingLevel:t,description:a,hasHeaderContent:n}=this,s=e?(0,i.h)(h.H,{class:f.heading,level:t},e):null,o=a?(0,i.h)("span",{class:f.description},a):null;return n||!s&&!o?null:(0,i.h)("div",{class:f.headerContent,key:"header-content"},s,o)}renderActionBar(){return(0,i.h)("div",{class:f.actionBarContainer,hidden:!this.hasActionBar},(0,i.h)("slot",{name:k.actionBar,onSlotchange:this.handleActionBarSlotChange}))}renderHeaderSlottedContent(){return(0,i.h)("div",{class:f.headerContent,hidden:!this.hasHeaderContent,key:"slotted-header-content"},(0,i.h)("slot",{name:k.headerContent,onSlotchange:this.handleHeaderContentSlotChange}))}renderHeaderStartActions(){const{hasStartActions:e}=this;return(0,i.h)("div",{class:{[f.headerActionsStart]:!0,[f.headerActions]:!0},hidden:!e,key:"header-actions-start"},(0,i.h)("slot",{name:k.headerActionsStart,onSlotchange:this.handleHeaderActionsStartSlotChange}))}renderHeaderActionsEnd(){const{hasEndActions:e,messages:t,closable:a,collapsed:s,collapseDirection:o,collapsible:c,hasMenuItems:l}=this,{collapse:r,expand:d,close:h}=t,u=[v.expand,v.collapse];"up"===o&&u.reverse();const g=c?(0,i.h)("calcite-action",{"aria-expanded":(0,n.t)(!s),"aria-label":r,"data-test":"collapse",icon:s?u[0]:u[1],onClick:this.collapse,text:r,title:s?d:r}):null,m=a?(0,i.h)("calcite-action",{"aria-label":h,"data-test":"close",icon:v.close,onClick:this.close,text:h,title:h}):null,p=(0,i.h)("slot",{name:k.headerActionsEnd,onSlotchange:this.handleHeaderActionsEndSlotChange}),b=e||g||m||l;return(0,i.h)("div",{class:{[f.headerActionsEnd]:!0,[f.headerActions]:!0},hidden:!b,key:"header-actions-end"},p,this.renderMenu(),g,m)}renderMenu(){const{hasMenuItems:e,messages:t,menuOpen:a}=this;return(0,i.h)("calcite-action-menu",{flipPlacements:["top","bottom"],hidden:!e,key:"menu",label:t.options,open:a,placement:"bottom-end"},(0,i.h)("calcite-action",{icon:v.menu,slot:d.S.trigger,text:t.options}),(0,i.h)("slot",{name:k.headerMenuActions,onSlotchange:this.handleHeaderMenuActionsSlotChange}))}renderHeaderNode(){const{hasHeaderContent:e,hasStartActions:t,hasEndActions:a,closable:n,collapsible:s,hasMenuItems:o,hasActionBar:c}=this,l=this.renderHeaderContent(),r=e||!!l||t||a||s||n||o;return this.showHeaderContent=r,(0,i.h)("header",{class:f.header,hidden:!(r||c)},(0,i.h)("div",{class:{[f.headerContainer]:!0,[f.headerContainerBorderEnd]:c},hidden:!r},this.renderHeaderStartActions(),this.renderHeaderSlottedContent(),l,this.renderHeaderActionsEnd()),this.renderActionBar())}renderFooterNode(){const{hasFooterContent:e,hasFooterActions:t}=this,a=e||t;return(0,i.h)("footer",{class:f.footer,hidden:!a},(0,i.h)("slot",{key:"footer-slot",name:k.footer,onSlotchange:this.handleFooterSlotChange}),(0,i.h)("slot",{key:"footer-actions-slot",name:k.footerActions,onSlotchange:this.handleFooterActionsSlotChange}))}renderContent(){return(0,i.h)("div",{class:f.contentWrapper,hidden:this.collapsible&&this.collapsed,onScroll:this.panelScrollHandler,ref:this.setPanelScrollEl},(0,i.h)("slot",null),this.renderFab())}renderFab(){return(0,i.h)("div",{class:f.fabContainer,hidden:!this.hasFab},(0,i.h)("slot",{name:k.fab,onSlotchange:this.handleFabSlotChange}))}render(){const{loading:e,panelKeyDownHandler:t,closed:a,closable:s}=this,o=(0,i.h)("article",{"aria-busy":(0,n.t)(e),class:f.container,hidden:a,onKeyDown:t,tabIndex:s?0:-1,ref:this.setContainerRef},this.renderHeaderNode(),this.renderContent(),this.renderFooterNode());return(0,i.h)(i.FK,null,e?(0,i.h)("calcite-scrim",{loading:e}):null,o)}static get assetsDirs(){return["assets"]}get el(){return this}static get watchers(){return{messageOverrides:["onMessagesChange"],effectiveLocale:["effectiveLocaleChange"]}}static get style(){return C}},[1,"calcite-panel",{closed:[1540],disabled:[516],closable:[516],collapsed:[516],collapseDirection:[1,"collapse-direction"],collapsible:[516],headingLevel:[514,"heading-level"],loading:[516],heading:[1],description:[1],menuOpen:[516,"menu-open"],messageOverrides:[1040],messages:[1040],hasStartActions:[32],hasEndActions:[32],hasMenuItems:[32],hasHeaderContent:[32],hasActionBar:[32],hasFooterContent:[32],hasFooterActions:[32],hasFab:[32],defaultMessages:[32],effectiveLocale:[32],showHeaderContent:[32],setFocus:[64],scrollContentTo:[64]}]);function w(){if("undefined"===typeof customElements)return;const e=["calcite-panel","calcite-action","calcite-action-menu","calcite-icon","calcite-loader","calcite-popover","calcite-scrim"];e.forEach((e=>{switch(e){case"calcite-panel":customElements.get(e)||customElements.define(e,x);break;case"calcite-action":customElements.get(e)||(0,u.d)();break;case"calcite-action-menu":customElements.get(e)||(0,d.d)();break;case"calcite-icon":customElements.get(e)||(0,g.d)();break;case"calcite-loader":customElements.get(e)||(0,m.d)();break;case"calcite-popover":customElements.get(e)||(0,p.d)();break;case"calcite-scrim":customElements.get(e)||(0,b.d)();break}}))}w();
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */
const y={backButton:"back-button"},S={backLeft:"chevron-left",backRight:"chevron-right"},E={actionBar:"action-bar",headerActionsStart:"header-actions-start",headerActionsEnd:"header-actions-end",headerMenuActions:"header-menu-actions",headerContent:"header-content",fab:"fab",footer:"footer",footerActions:"footer-actions"},A=":host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-ui-border-3);border-inline-end-width:1px}calcite-panel{--calcite-panel-footer-padding:var(--calcite-flow-item-footer-padding);--calcite-panel-header-border-block-end:var(--calcite-flow-item-header-border-block-end)}:host([hidden]){display:none}[hidden]{display:none}",z=(0,i.w$)(class extends i.wt{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calciteFlowItemBack=(0,i.lh)(this,"calciteFlowItemBack",7),this.calciteFlowItemScroll=(0,i.lh)(this,"calciteFlowItemScroll",6),this.calciteFlowItemClose=(0,i.lh)(this,"calciteFlowItemClose",6),this.calciteFlowItemToggle=(0,i.lh)(this,"calciteFlowItemToggle",6),this.handlePanelScroll=e=>{e.stopPropagation(),this.calciteFlowItemScroll.emit()},this.handlePanelClose=e=>{e.stopPropagation(),this.calciteFlowItemClose.emit()},this.handlePanelToggle=e=>{e.stopPropagation(),this.collapsed=e.target.collapsed,this.calciteFlowItemToggle.emit()},this.backButtonClick=()=>{this.calciteFlowItemBack.emit()},this.setBackRef=e=>{this.backButtonEl=e},this.setContainerRef=e=>{this.containerEl=e},this.closable=!1,this.closed=!1,this.collapsed=!1,this.collapseDirection="down",this.collapsible=!1,this.beforeBack=void 0,this.description=void 0,this.disabled=!1,this.heading=void 0,this.headingLevel=void 0,this.loading=!1,this.menuOpen=!1,this.messageOverrides=void 0,this.messages=void 0,this.showBackButton=!1,this.defaultMessages=void 0,this.effectiveLocale=""}onMessagesChange(){}connectedCallback(){(0,s.c)(this),(0,c.c)(this),(0,l.c)(this)}async componentWillLoad(){await(0,l.s)(this),(0,o.a)(this)}componentDidRender(){(0,s.u)(this)}disconnectedCallback(){(0,s.d)(this),(0,c.d)(this),(0,l.d)(this)}componentDidLoad(){(0,o.s)(this)}effectiveLocaleChange(){(0,l.u)(this,this.effectiveLocale)}async setFocus(){await(0,o.c)(this);const{backButtonEl:e,containerEl:t}=this;return e?e.setFocus():t?t.setFocus():void 0}async scrollContentTo(e){await(this.containerEl?.scrollContentTo(e))}renderBackButton(){const{el:e}=this,t="rtl"===(0,n.b)(e),{showBackButton:a,backButtonClick:s,messages:o}=this,c=o.back,l=t?S.backRight:S.backLeft;return a?(0,i.h)("calcite-action",{"aria-label":c,class:y.backButton,icon:l,key:"flow-back-button",onClick:s,scale:"s",slot:"header-actions-start",text:c,title:c,ref:this.setBackRef}):null}render(){const{collapsed:e,collapseDirection:t,collapsible:a,closable:n,closed:s,description:o,disabled:c,heading:l,headingLevel:r,loading:d,menuOpen:h,messages:u}=this;return(0,i.h)(i.xr,null,(0,i.h)("calcite-panel",{closable:n,closed:s,collapseDirection:t,collapsed:e,collapsible:a,description:o,disabled:c,heading:l,headingLevel:r,loading:d,menuOpen:h,messageOverrides:u,onCalcitePanelClose:this.handlePanelClose,onCalcitePanelScroll:this.handlePanelScroll,onCalcitePanelToggle:this.handlePanelToggle,ref:this.setContainerRef},this.renderBackButton(),(0,i.h)("slot",{name:E.actionBar,slot:k.actionBar}),(0,i.h)("slot",{name:E.headerActionsStart,slot:k.headerActionsStart}),(0,i.h)("slot",{name:E.headerActionsEnd,slot:k.headerActionsEnd}),(0,i.h)("slot",{name:E.headerContent,slot:k.headerContent}),(0,i.h)("slot",{name:E.headerMenuActions,slot:k.headerMenuActions}),(0,i.h)("slot",{name:E.fab,slot:k.fab}),(0,i.h)("slot",{name:E.footerActions,slot:k.footerActions}),(0,i.h)("slot",{name:E.footer,slot:k.footer}),(0,i.h)("slot",null)))}static get assetsDirs(){return["assets"]}get el(){return this}static get watchers(){return{messageOverrides:["onMessagesChange"],effectiveLocale:["effectiveLocaleChange"]}}static get style(){return A}},[1,"calcite-flow-item",{closable:[516],closed:[516],collapsed:[516],collapseDirection:[1,"collapse-direction"],collapsible:[516],beforeBack:[16],description:[1],disabled:[516],heading:[1],headingLevel:[514,"heading-level"],loading:[516],menuOpen:[516,"menu-open"],messageOverrides:[1040],messages:[1040],showBackButton:[4,"show-back-button"],defaultMessages:[32],effectiveLocale:[32],setFocus:[64],scrollContentTo:[64]}]);function H(){if("undefined"===typeof customElements)return;const e=["calcite-flow-item","calcite-action","calcite-action-menu","calcite-icon","calcite-loader","calcite-panel","calcite-popover","calcite-scrim"];e.forEach((e=>{switch(e){case"calcite-flow-item":customElements.get(e)||customElements.define(e,z);break;case"calcite-action":customElements.get(e)||(0,u.d)();break;case"calcite-action-menu":customElements.get(e)||(0,d.d)();break;case"calcite-icon":customElements.get(e)||(0,g.d)();break;case"calcite-loader":customElements.get(e)||(0,m.d)();break;case"calcite-panel":customElements.get(e)||w();break;case"calcite-popover":customElements.get(e)||(0,p.d)();break;case"calcite-scrim":customElements.get(e)||(0,b.d)();break}}))}H();const B=z,F=H},45749:function(e,t,a){a.d(t,{S:function(){return u},d:function(){return g}});var i=a(3882),n=a(52441),s=a(80135),o=a(64156),c=a(80863),l=a(40988);
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */
const r={scrim:"scrim",content:"content"},d={s:72,l:480},h=":host{position:absolute;inset:0px;z-index:var(--calcite-app-z-index-overlay);display:flex;block-size:100%;inline-size:100%;flex-direction:column;align-items:stretch}@keyframes calcite-scrim-fade-in{0%{--tw-bg-opacity:0}100%{--tw-text-opacity:1}}.scrim{position:absolute;inset:0px;display:flex;flex-direction:column;align-content:center;align-items:center;justify-content:center;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background, var(--calcite-scrim-background-internal))}.content{padding:1rem}:host([hidden]){display:none}[hidden]{display:none}",u=(0,i.w$)(class extends i.wt{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.resizeObserver=(0,o.c)("resize",(()=>this.handleResize())),this.handleDefaultSlotChange=e=>{this.hasContent=(0,c.w)(e)},this.storeLoaderEl=e=>{this.loaderEl=e,this.handleResize()},this.loading=!1,this.messages=void 0,this.messageOverrides=void 0,this.loaderScale=void 0,this.defaultMessages=void 0,this.effectiveLocale="",this.hasContent=!1}onMessagesChange(){}effectiveLocaleChange(){(0,s.u)(this,this.effectiveLocale)}connectedCallback(){(0,n.c)(this),(0,s.c)(this),this.resizeObserver?.observe(this.el)}async componentWillLoad(){await(0,s.s)(this)}disconnectedCallback(){(0,n.d)(this),(0,s.d)(this),this.resizeObserver?.disconnect()}render(){const{hasContent:e,loading:t,messages:a}=this;return(0,i.h)("div",{class:r.scrim},t?(0,i.h)("calcite-loader",{label:a.loading,scale:this.loaderScale,ref:this.storeLoaderEl}):null,(0,i.h)("div",{class:r.content,hidden:!e},(0,i.h)("slot",{onSlotchange:this.handleDefaultSlotChange})))}getScale(e){return e<d.s?"s":e>=d.l?"l":"m"}handleResize(){const{loaderEl:e,el:t}=this;e&&(this.loaderScale=this.getScale(Math.min(t.clientHeight,t.clientWidth)??0))}static get assetsDirs(){return["assets"]}get el(){return this}static get watchers(){return{messageOverrides:["onMessagesChange"],effectiveLocale:["effectiveLocaleChange"]}}static get style(){return h}},[1,"calcite-scrim",{loading:[516],messages:[1040],messageOverrides:[1040],loaderScale:[32],defaultMessages:[32],effectiveLocale:[32],hasContent:[32]}]);function g(){if("undefined"===typeof customElements)return;const e=["calcite-scrim","calcite-loader"];e.forEach((e=>{switch(e){case"calcite-scrim":customElements.get(e)||customElements.define(e,u);break;case"calcite-loader":customElements.get(e)||(0,l.d)();break}}))}g()}}]);
//# sourceMappingURL=5995.25b90a5b.js.map