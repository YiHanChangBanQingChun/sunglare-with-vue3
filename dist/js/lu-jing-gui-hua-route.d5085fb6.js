"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[7922],{29190:function(e,t,s){s.r(t),s.d(t,{default:function(){return re}});var i=s(56768),a=s(45130),l=s(24232);const n={class:"lu-jing-gui-hua"},r={class:"search-containers"},o={class:"revert-containers"},d=(0,i.Lk)("div",{class:"car"},[(0,i.Lk)("img",{src:"https://wx3.sinaimg.cn/orj360/008tIcISgy1hsgyr8gzsjj300o00odfl.jpg"})],-1),c={class:"swap-action"},h=(0,i.Lk)("img",{src:"https://wx1.sinaimg.cn/orj360/008tIcISgy1hsiz7qtw48j301s01sq2p.jpg",alt:"revert",style:{width:"22px",height:"25px"}},null,-1),u=[h],g={class:"search-container start"},p=(0,i.Lk)("div",{class:"search-icon-wrapper"},[(0,i.Lk)("img",{src:"https://wx1.sinaimg.cn/orj360/008tIcISgy1hsgyr8gv8dj300f00f0oh.jpg",alt:"pink"})],-1),m={class:"search-box-img"},y=(0,i.Lk)("img",{src:"https://wx2.sinaimg.cn/orj360/008tIcISgy1hsnss2ckv4j300k00k0m1.jpg",alt:"delete1"},null,-1),w=[y],b={key:0,class:"search-results",ref:"searchResultsStart"},f=["onClick"],k={class:"search-container end"},v=(0,i.Lk)("div",{class:"search-icon-wrapper"},[(0,i.Lk)("img",{src:"https://wx4.sinaimg.cn/orj360/008tIcISgy1hsgyr8got8j300f00f0o9.jpg",alt:"green"})],-1),S={class:"search-box-img"},R=(0,i.Lk)("img",{src:"https://wx2.sinaimg.cn/orj360/008tIcISgy1hsnss2ckv4j300k00k0m1.jpg",alt:"delete1"},null,-1),E=[R],L={key:0,class:"search-results",ref:"searchResultsEnd"},_=["onClick"],x=(0,i.Lk)("img",{src:"https://wx4.sinaimg.cn/mw2000/008tIcISgy1hsq1fw9ob9j300w00w3ya.jpg",alt:"search"},null,-1),I=[x],D={key:0,class:"loader-overlay"},T=(0,i.Lk)("div",{class:"loader"},null,-1),j=[T],C=(0,i.Lk)("div",{id:"viewDiv"},null,-1),N={class:"main-container"},M={class:"choose-time"},Q={class:"form-group"},$=(0,i.Lk)("label",{for:"date-input"},"选择日期：",-1),q=["min","max"],A=(0,i.Lk)("label",{for:"time-input"},"选择时间：",-1),J={class:"routelist"},O={class:"cardlist"},G={class:"route","data-index":"0"},U={class:"intro"},z=(0,i.Lk)("span",null,"总时长：",-1),F=(0,i.Lk)("span",null,"总距离：",-1),P={class:"route","data-index":"1"},V={class:"intro"},X=(0,i.Lk)("span",null,"总时长：",-1),H=(0,i.Lk)("span",null,"总距离：",-1);function Z(e,t,s,h,y,R){return(0,i.uX)(),(0,i.CE)(i.FK,null,[(0,i.Lk)("div",n,[(0,i.Lk)("div",r,[(0,i.Lk)("div",o,[d,(0,i.Lk)("div",c,[(0,i.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>R.swap&&R.swap(...e)),title:"切换起终点"},u)])]),(0,i.Lk)("div",g,[p,(0,i.bo)((0,i.Lk)("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=e=>y.searchQueryStart=e),onInput:t[2]||(t[2]=e=>R.onSearchInputChange(e,!0)),placeholder:"请输入起点",class:"search-box search-box-start"},null,544),[[a.Jo,y.searchQueryStart]]),(0,i.Lk)("span",m,[(0,i.Lk)("div",{class:"delete",title:"清空",onClick:t[3]||(t[3]=(...e)=>R.clc1&&R.clc1(...e))},w)]),y.searchResults.length&&y.searchQueryStart?((0,i.uX)(),(0,i.CE)("div",b,[(0,i.Lk)("ul",null,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(y.searchResults,((e,t)=>((0,i.uX)(),(0,i.CE)("li",{key:t,class:(0,l.C4)({highlighted:t===y.highlightedIndex}),onClick:t=>R.selectResult(e,!0)},(0,l.v_)(e.name),11,f)))),128))])],512)):(0,i.Q3)("",!0)]),(0,i.Lk)("div",k,[v,(0,i.bo)((0,i.Lk)("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=e=>y.searchQueryEnd=e),onInput:t[5]||(t[5]=e=>R.onSearchInputChange(e,!1)),placeholder:"请输入终点",class:"search-box search-box-end"},null,544),[[a.Jo,y.searchQueryEnd]]),(0,i.Lk)("span",S,[(0,i.Lk)("div",{class:"delete",title:"清空",onClick:t[6]||(t[6]=(...e)=>R.clc2&&R.clc2(...e))},E)]),y.searchResultsEnd.length&&y.searchQueryEnd?((0,i.uX)(),(0,i.CE)("div",L,[(0,i.Lk)("ul",null,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(y.searchResultsEnd,((e,t)=>((0,i.uX)(),(0,i.CE)("li",{key:t,class:(0,l.C4)({highlighted:t===y.highlightedIndex}),onClick:t=>R.selectResult(e,!1)},(0,l.v_)(e.name),11,_)))),128))])],512)):(0,i.Q3)("",!0)]),(0,i.Lk)("div",{class:"search-action",onClick:t[7]||(t[7]=(...e)=>R.onSearch&&R.onSearch(...e)),title:"搜索"},I),y.isLoading?((0,i.uX)(),(0,i.CE)("div",D,j)):(0,i.Q3)("",!0)])]),C,(0,i.Lk)("div",N,[(0,i.Lk)("div",M,[(0,i.Lk)("div",Q,[$,(0,i.bo)((0,i.Lk)("input",{id:"date-input",type:"date","onUpdate:modelValue":t[8]||(t[8]=e=>y.selectedDate=e),min:R.minDate,max:R.maxDate,class:(0,l.C4)({"invalid-date":R.isDateDisabled(y.selectedDate)}),onChange:t[9]||(t[9]=(...e)=>R.handleDateChange&&R.handleDateChange(...e))},null,42,q),[[a.Jo,y.selectedDate]]),A,(0,i.bo)((0,i.Lk)("input",{id:"time-input",type:"time","onUpdate:modelValue":t[10]||(t[10]=e=>R.formattedTime=e),onInput:t[11]||(t[11]=(...e)=>R.onTimeInputChange&&R.onTimeInputChange(...e)),step:"600"},null,544),[[a.Jo,R.formattedTime]])])]),(0,i.Lk)("div",J,[(0,i.Lk)("ul",O,[(0,i.Lk)("div",G,[(0,i.Lk)("div",{class:"introduction",style:(0,l.Tr)({color:R.getColor(0)})},"无眩光路径",4),(0,i.Lk)("p",U,[z,(0,i.Lk)("span",null,(0,l.v_)(y.noGlareTotalHours)+"小时"+(0,l.v_)(y.noGlareTotalMinutes)+"分钟",1),F,(0,i.Lk)("span",null,(0,l.v_)(y.noGlareTotalDistance),1)])]),(0,i.Lk)("div",P,[(0,i.Lk)("div",{class:"introduction",style:(0,l.Tr)({color:R.getColor(1)})},"常规路径",4),(0,i.Lk)("p",V,[X,(0,i.Lk)("span",null,(0,l.v_)(y.totalHours)+"小时"+(0,l.v_)(y.totalMinutes)+"分钟",1),H,(0,i.Lk)("span",null,(0,l.v_)(y.totalDistance),1)])])])])])],64)}s(44114),s(14603),s(47566),s(98721);var K=s(7382),W=s(56906),Y=s(11134),B=s(74036),ee=s(58423),te=s(3949),se=s(41759),ie=s(94373),ae={name:"RouteView",data(){return{searchQueryStart:"",searchQueryEnd:"",selectedResultStart:null,selectedResultEnd:null,searchResults:[],searchResultsEnd:[],isLoading:!1,totalHours:0,totalMinutes:0,totalDistance:"0千米",selectedDate:"",selectedTime:"",noGlareTotalHours:0,noGlareTotalMinutes:0,highlightedIndex:-1,noGlareTotalDistance:"0千米"}},mounted(){this.initMap(),this.$route.query.start&&this.$route.query.end&&(this.selectedResultStart=JSON.parse(this.$route.query.start),this.selectedResultEnd=JSON.parse(this.$route.query.end)),this.parseUrlParams(),window.addEventListener("keydown",this.handleKeydown)},beforeUnmount(){window.removeEventListener("keydown",this.handleKeydown)},computed:{minDate(){return"2024-01-01"},maxDate(){return"2024-12-31"},formattedTime(){if(!this.selectedTime)return"";const[e,t]=this.selectedTime.split(":").map(Number),s=10*Math.floor(t/10);return`${String(e).padStart(2,"0")}:${String(s).padStart(2,"0")}`}},methods:{getColor(e){return 0===e?"rgb(25, 202, 173)":1===e?"rgb(244, 96, 108)":"black"},onTimeInputChange(e){const t=e.target.value,[s,i]=t.split(":").map(Number),a=10*Math.floor(i/10);this.selectedTime=`${String(s).padStart(2,"0")}:${String(a).padStart(2,"0")}`},isDateDisabled(e){if(!e)return!1;const t=new Date(e),s=t.getMonth()+1,i=t.getDate();return s>=1&&s<=7&&15!==i||(8===s&&i<=20||s>=10&&s<=12&&15!==i)},handleDateChange(e){const t=e.target.value;this.isDateDisabled(t)&&(alert("选择的日期未进行模拟，请选择其他日期。可选日期为，1-7月的15日，8月20日-9月30日，10-12月的15日。"),this.selectedDate="")},handleKeydown(e){if(this.searchResults.length&&this.searchQueryStart)switch(e.key){case"Escape":this.searchResults=[];break;case"Tab":e.preventDefault(),this.highlightedIndex=(this.highlightedIndex+1)%this.searchResults.length,(0,i.dY)((()=>{const e=this.$refs.searchResultsStart.querySelector("li.highlighted");e&&e.scrollIntoView({block:"nearest",behavior:"smooth"})}));break;case"Enter":this.highlightedIndex>=0&&this.highlightedIndex<this.searchResults.length&&this.selectResult(this.searchResults[this.highlightedIndex],!0);break}else if(this.searchResultsEnd.length&&this.searchQueryEnd)switch(e.key){case"Escape":this.searchResultsEnd=[];break;case"Tab":e.preventDefault(),this.highlightedIndex=(this.highlightedIndex+1)%this.searchResultsEnd.length,(0,i.dY)((()=>{const e=this.$refs.searchResultsEnd.querySelector("li.highlighted");e&&e.scrollIntoView({block:"nearest",behavior:"smooth"})}));break;case"Enter":this.highlightedIndex>=0&&this.highlightedIndex<this.searchResultsEnd.length&&this.selectResult(this.searchResultsEnd[this.highlightedIndex],!1);break}},updateTime(){const e=new Date,t=`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`;this.isTimeFromUrl&&this.selectedTime!==t||(this.selectedTime=t,this.isTimeFromUrl=!1)},clc1(){this.searchQueryStart=""},clc2(){this.searchQueryEnd=""},swap(){this.isSwapping=!0;const e=this.searchQueryStart;this.searchQueryStart=this.searchQueryEnd,this.searchQueryEnd=e;const t=this.selectedResultStart;this.selectedResultStart=this.selectedResultEnd,this.selectedResultEnd=t,this.onSearch().then((()=>{this.parseUrlParams(),this.initMap(),this.isSwapping=!1}))},parseUrlParams(){const e=new URLSearchParams(window.location.search),t=e.get("start"),s=e.get("end"),i=e.get("date"),a=e.get("time"),l=e.get("default_id"),n=e.get("time_based_id");if(t)try{const e=JSON.parse(decodeURIComponent(t));e&&e.address&&(this.searchQueryStart=e.name)}catch(r){console.error("Error parsing start parameter:",r)}if(s)try{const e=JSON.parse(decodeURIComponent(s));e&&e.address&&(this.searchQueryEnd=e.name)}catch(r){console.error("Error parsing end parameter:",r)}i&&(this.selectedDate=i),a&&(this.selectedTime=a,this.isTimeFromUrl=!0),l&&(this.defaultRouteId=l),n&&(this.timeBasedRouteId=n)},onSearchInputChange(e,t){const s=e.target.value,i=t?"searchResults":"searchResultsEnd";s.includes("'")?console.log("输入法临时输入，不发送请求"):s.length>=2?fetch("http://112.125.122.56/sun-glare-project/api/search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({searchQueryStart:s})}).then((e=>e.json())).then((e=>{this[i]=e})).catch((e=>{console.error("错误:",e)})):this[i]=[]},selectResult(e,t=!0){console.log("用户选择了搜索结果:",e);const s={name:e.name,address:e.address,wgs84_latitude:e.wgs84_latitude,wgs84_longitude:e.wgs84_longitude,location:[e.wgs84_longitude,e.wgs84_latitude],baidu_index:e.baidu_index,baidu_latitude:e.baidu_latitude,baidu_longitude:e.baidu_longitude,id:e.id,label:e.label};let i=this.selectedResultStart?JSON.stringify(this.selectedResultStart):null,a=this.selectedResultEnd?JSON.stringify(this.selectedResultEnd):null;t?(this.selectedResultStart=s,this.searchQueryStart=s.name,this.searchResults=[],i=JSON.stringify(s)):(this.selectedResultEnd=s,this.searchQueryEnd=s.name,this.searchResultsEnd=[],a=JSON.stringify(s)),this.$router.push({path:"/lu-jing-gui-hua/Intermediate-page",query:{start:i,end:a,date:this.selectedDate,time:this.selectedTime}})},onSearch(){return new Promise(((e,t)=>{if(this.selectedResultStart&&this.selectedResultEnd){this.isLoading=!0;const s={...this.selectedResultStart,location:[this.selectedResultStart.wgs84_longitude,this.selectedResultStart.wgs84_latitude]},i={...this.selectedResultEnd,location:[this.selectedResultEnd.wgs84_longitude,this.selectedResultEnd.wgs84_latitude]},a=5===this.selectedTime.length?`${this.selectedTime}:00`:this.selectedTime;console.log("Formatted Time:",a),ie.A.post("http://112.125.122.56/sun-glare-project/api/route/plan",{start:s,end:i,date:this.selectedDate,time:a}).then((t=>{const l=t.data.default_id,n=t.data.time_based_id;console.log("默认路径规划结果ID:",l),console.log("基于时间的路径规划结果ID:",n),console.log("路径规划成功，时间日期是:",this.selectedDate,this.selectedTime),this.isLoading=!1,this.$router.push({path:"/lu-jing-gui-hua/route",query:{start:JSON.stringify(s),end:JSON.stringify(i),default_id:l,time_based_id:n,date:this.selectedDate,time:a}}),this.isSwapping||(this.searchQueryStart=s.name,this.searchQueryEnd=i.name),e()})).catch((e=>{console.error(e),this.isLoading=!1,alert("路径规划失败，请稍后再试。"),t(e)}))}else alert("请确保起点和终点都已选择。"),t(new Error("请确保起点和终点都已选择。"))}))},initMap(){const e=new K.A({basemap:"tianditu-vector"});this.map=e,this.view=new W.A({container:"viewDiv",map:e,center:[114.3,30.7],zoom:4,constraints:{geometry:{type:"extent",xmin:113.6,ymin:29.9,xmax:115,ymax:31.3},minScale:500,maxScale:2e6,rotationEnabled:!1,snapToZoom:!1}}),this.view.ui.move("zoom","bottom-left");const t=new ee.A;e.add(t),this.view.when((()=>{this.drawPoints(t),this.adjustView(),this.drawRoutes(e)})).catch((e=>{console.error("MapView initialization error:",e)}))},adjustView(){if(this.selectedResultStart&&this.selectedResultEnd){const e=.01,t=new se.A({xmin:Math.min(this.selectedResultStart.location[0],this.selectedResultEnd.location[0])-10*e,ymin:Math.min(this.selectedResultStart.location[1],this.selectedResultEnd.location[1])-10*e,xmax:Math.max(this.selectedResultStart.location[0],this.selectedResultEnd.location[0])+10*e,ymax:Math.max(this.selectedResultStart.location[1],this.selectedResultEnd.location[1])+10*e});this.view.goTo(t).catch((e=>{console.error("Error adjusting view:",e)}))}else this.selectedResultStart?this.view.goTo({center:[this.selectedResultStart.location[0],this.selectedResultStart.location[1]],zoom:10}).catch((e=>{console.error("Error adjusting view:",e)})):this.selectedResultEnd&&this.view.goTo({center:[this.selectedResultEnd.location[0],this.selectedResultEnd.location[1]],zoom:10}).catch((e=>{console.error("Error adjusting view:",e)}))},drawPoints(e){if(!this.$route.query.start||!this.$route.query.end)return void console.error("Start or end point is undefined.");const t=JSON.parse(this.$route.query.start),s=JSON.parse(this.$route.query.end);if(!t.location||!s.location)return void console.error("Start or end point does not have a location.");const i=new B.A({longitude:t.location[0],latitude:t.location[1]}),a=new B.A({longitude:s.location[0],latitude:s.location[1]}),l=new Y.A({geometry:i,symbol:{type:"simple-marker",color:"red",size:"20px"},popupTemplate:{title:"起点信息",content:[{type:"fields",fieldInfos:[{fieldName:"address",label:"地址"},{fieldName:"name",label:"名称"},{fieldName:"wgs84_latitude",label:"WGS84纬度"},{fieldName:"wgs84_longitude",label:"WGS84经度"},{fieldName:"baidu_index",label:"百度索引"},{fieldName:"baidu_latitude",label:"百度纬度"},{fieldName:"baidu_longitude",label:"百度经度"},{fieldName:"id",label:"ID"},{fieldName:"label",label:"标签"}]}]},attributes:t}),n=new Y.A({geometry:a,symbol:{type:"simple-marker",color:"green",size:"20px"},popupTemplate:{title:"终点信息",content:[{type:"fields",fieldInfos:[{fieldName:"address",label:"地址"},{fieldName:"name",label:"名称"},{fieldName:"wgs84_latitude",label:"WGS84纬度"},{fieldName:"wgs84_longitude",label:"WGS84经度"},{fieldName:"baidu_index",label:"百度索引"},{fieldName:"baidu_latitude",label:"百度纬度"},{fieldName:"baidu_longitude",label:"百度经度"},{fieldName:"id",label:"ID"},{fieldName:"label",label:"标签"}]}]},attributes:s});e.addMany([l,n])},drawRoutes(e){const t=this.$route.query.default_id,s=this.$route.query.time_based_id;t||s?(t&&this.fetchAndDrawRoute(e,t,[25,202,173],!0),s&&this.fetchAndDrawRoute(e,s,[244,96,108])):console.error("Route IDs are undefined.")},fetchAndDrawRoute(e,t,s,i=!1){const a=`http://112.125.122.56/sun-glare-project/api/get_geojson/${t}`;fetch(a).then((e=>e.json())).then((t=>{let a=0,l=0;const n=new te["default"]({source:t.features.map(((e,t)=>(a+=e.properties.length,l+=e.properties.cost,{geometry:{type:"polyline",paths:e.geometry.coordinates},attributes:{...e.properties,id:t}}))),renderer:{type:"simple",symbol:{type:"simple-line",color:s,width:i?5:3}},objectIdField:"id",fields:[{name:"id",type:"oid"},{name:"seq",type:"integer"},{name:"path_seq",type:"integer"},{name:"node",type:"integer"},{name:"edge",type:"integer"},{name:"cost",type:"double"},{name:"agg_cost",type:"double"},{name:"length",type:"double"}]});e.layers.add(n);const r=Math.floor(l/3600),o=Math.floor(l%3600/60);let d;d=a<1e3?`${a.toFixed(2)}米`:`${(a/1e3).toFixed(2)}千米`,i?(this.noGlareTotalHours=r,this.noGlareTotalMinutes=o,this.noGlareTotalDistance=d):(this.totalHours=r,this.totalMinutes=o,this.totalDistance=d)})).catch((e=>console.error("Error loading the geojson file:",e)))}}},le=s(71241);const ne=(0,le.A)(ae,[["render",Z]]);var re=ne},58423:function(e,t,s){s.d(t,{A:function(){return g}});var i=s(71457),a=s(76543),l=(s(37679),s(69292),s(51020),s(29916)),n=s(46626),r=s(71680),o=s(79366),d=s(99024),c=s(41341),h=s(9693);let u=class extends((0,o.d)((0,d.j)(r.A))){constructor(e){super(e),this.elevationInfo=null,this.graphics=new c.Y,this.screenSizePerspectiveEnabled=!0,this.type="graphics",this.internal=!1}destroy(){this.removeAll(),this.graphics.destroy()}add(e){return this.graphics.add(e),this}addMany(e){return this.graphics.addMany(e),this}removeAll(){return this.graphics.removeAll(),this}remove(e){this.graphics.remove(e)}removeMany(e){this.graphics.removeMany(e)}on(e,t){return super.on(e,t)}graphicChanged(e){this.emit("graphic-update",e)}};(0,i._)([(0,a.MZ)({type:h.A})],u.prototype,"elevationInfo",void 0),(0,i._)([(0,a.MZ)((0,n.C)(c.Y,"graphics"))],u.prototype,"graphics",void 0),(0,i._)([(0,a.MZ)({type:["show","hide"]})],u.prototype,"listMode",void 0),(0,i._)([(0,a.MZ)()],u.prototype,"screenSizePerspectiveEnabled",void 0),(0,i._)([(0,a.MZ)({readOnly:!0})],u.prototype,"type",void 0),(0,i._)([(0,a.MZ)({constructOnly:!0})],u.prototype,"internal",void 0),u=(0,i._)([(0,l.$)("geoscene.layers.GraphicsLayer")],u);const g=u}}]);
//# sourceMappingURL=lu-jing-gui-hua-route.d5085fb6.js.map