"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[9144],{82656:function(e,t,s){s.r(t),s.d(t,{default:function(){return H}});var a=s(56768),i=s(45130),l=s(24232),n=s(71132),r=s(91971),d=s(1774),o=s(65438);const h={class:"lu-jing-gui-hua"},c={class:"search-containers"},u={class:"revert-containers"},m={class:"swap-action"},g=["src"],p={class:"search-container start"},w={class:"search-box-img"},y={key:0,class:"search-results",ref:"searchResultsStart"},R=["onClick"],v={class:"search-container end"},S={class:"search-box-img"},E={key:0,class:"search-results",ref:"searchResultsEnd"},k=["onClick"],f=["src"],b={key:0,class:"loader-overlay"},L={key:0,class:"maploader-overlay"},x={class:"main-container"},T={class:"choose-time"},C={class:"form-group"},I=["min","max"];function D(e,t,D,N,_,B){return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.Lk)("div",h,[(0,a.Lk)("div",c,[(0,a.Lk)("div",u,[t[12]||(t[12]=(0,a.Lk)("div",{class:"car"},[(0,a.Lk)("img",{src:n})],-1)),(0,a.Lk)("div",m,[(0,a.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>B.swap&&B.swap(...e)),title:"切换起终点"},[(0,a.Lk)("img",{src:s(70697),alt:"",class:"revert"},null,8,g)])])]),(0,a.Lk)("div",p,[t[14]||(t[14]=(0,a.Lk)("div",{class:"search-icon-wrapper"},[(0,a.Lk)("img",{src:r,alt:"pink"})],-1)),(0,a.bo)((0,a.Lk)("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=e=>N.searchQueryStart=e),onInput:t[2]||(t[2]=e=>B.onSearchInputChange(e,!0)),placeholder:"请输入起点",class:"search-box search-box-start"},null,544),[[i.Jo,N.searchQueryStart]]),(0,a.Lk)("span",w,[(0,a.Lk)("div",{class:"delete",title:"清空",onClick:t[3]||(t[3]=(...e)=>B.clc1&&B.clc1(...e))},t[13]||(t[13]=[(0,a.Lk)("img",{src:d,alt:"delete1"},null,-1)]))]),_.searchResults.length&&N.searchQueryStart?((0,a.uX)(),(0,a.CE)("div",y,[(0,a.Lk)("ul",null,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(_.searchResults,((e,t)=>((0,a.uX)(),(0,a.CE)("li",{key:t,class:(0,l.C4)({highlighted:t===_.highlightedIndex}),onClick:t=>B.selectResult(e,!0)},(0,l.v_)(e.name),11,R)))),128))])],512)):(0,a.Q3)("",!0)]),(0,a.Lk)("div",v,[t[16]||(t[16]=(0,a.Lk)("div",{class:"search-icon-wrapper"},[(0,a.Lk)("img",{src:o,alt:"green"})],-1)),(0,a.bo)((0,a.Lk)("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=e=>N.searchQueryEnd=e),onInput:t[5]||(t[5]=e=>B.onSearchInputChange(e,!1)),placeholder:"请输入终点",class:"search-box search-box-end"},null,544),[[i.Jo,N.searchQueryEnd]]),(0,a.Lk)("span",S,[(0,a.Lk)("div",{class:"delete",title:"清空",onClick:t[6]||(t[6]=(...e)=>B.clc2&&B.clc2(...e))},t[15]||(t[15]=[(0,a.Lk)("img",{src:d,alt:"delete1"},null,-1)]))]),_.searchResultsEnd.length&&N.searchQueryEnd?((0,a.uX)(),(0,a.CE)("div",E,[(0,a.Lk)("ul",null,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(_.searchResultsEnd,((e,t)=>((0,a.uX)(),(0,a.CE)("li",{key:t,class:(0,l.C4)({highlighted:t===_.highlightedIndex}),onClick:t=>B.selectResult(e,!1)},(0,l.v_)(e.name),11,k)))),128))])],512)):(0,a.Q3)("",!0)]),(0,a.Lk)("div",{class:"search-action",onClick:t[7]||(t[7]=(...e)=>B.onSearch&&B.onSearch(...e)),title:"搜索"},[(0,a.Lk)("img",{src:s(91060),alt:"",class:"search"},null,8,f)]),_.isLoading?((0,a.uX)(),(0,a.CE)("div",b,t[17]||(t[17]=[(0,a.Lk)("div",{class:"loader"},null,-1)]))):(0,a.Q3)("",!0)])]),t[21]||(t[21]=(0,a.Lk)("div",{id:"viewDiv"},null,-1)),_.ismaploading?((0,a.uX)(),(0,a.CE)("div",L,t[18]||(t[18]=[(0,a.Lk)("div",{class:"maploader"},null,-1)]))):(0,a.Q3)("",!0),(0,a.Lk)("div",x,[(0,a.Lk)("div",T,[(0,a.Lk)("div",C,[t[19]||(t[19]=(0,a.Lk)("label",{for:"date-input"},"选择日期：",-1)),(0,a.bo)((0,a.Lk)("input",{id:"date-input",type:"date","onUpdate:modelValue":t[8]||(t[8]=e=>_.selectedDate=e),min:B.minDate,max:B.maxDate,class:(0,l.C4)({"invalid-date":B.isDateDisabled(_.selectedDate)}),onChange:t[9]||(t[9]=(...e)=>B.handleDateChange&&B.handleDateChange(...e))},null,42,I),[[i.Jo,_.selectedDate]]),t[20]||(t[20]=(0,a.Lk)("label",{for:"time-input"},"选择时间：",-1)),(0,a.bo)((0,a.Lk)("input",{id:"time-input",type:"time","onUpdate:modelValue":t[10]||(t[10]=e=>B.formattedTime=e),onInput:t[11]||(t[11]=(...e)=>B.onTimeInputChange&&B.onTimeInputChange(...e)),step:"600"},null,544),[[i.Jo,B.formattedTime]])])])])],64)}s(44114),s(14603),s(47566),s(98721);var N=s(7382),_=s(43487),B=s(11134),Q=s(74036),$=s(58423),j=s(94373),A=s(41759),J=s(90144),O=s(81387),U=s(57829),q=s(3949),M=s(95587),P=s(87923),K=s(44432),V=s(50346),X={name:"IntermediatePageView",setup(){const e=(0,J.KR)(""),t=(0,J.KR)(""),s=(0,J.KR)(null),a=(0,J.KR)(null),i=(0,O.rd)();return{searchQueryStart:e,searchQueryEnd:t,selectedResultStart:s,selectedResultEnd:a,router:i}},data(){return{searchResults:[],searchResultsEnd:[],isLoading:!1,ismaploading:!0,selectedDate:"",selectedTime:"",BasemapLayer:null,highlightedIndex:-1}},mounted(){this.$route.query.start&&(this.selectedResultStart=JSON.parse(this.$route.query.start)),this.$route.query.end&&(this.selectedResultEnd=JSON.parse(this.$route.query.end)),this.parseUrlParams(),this.initMap(),setInterval((()=>{this.updateTime()}),6e4),window.addEventListener("keydown",this.handleKeydown)},beforeUnmount(){window.removeEventListener("keydown",this.handleKeydown)},computed:{minDate(){return"2024-01-01"},maxDate(){return"2024-12-31"},formattedTime(){if(!this.selectedTime)return"";const[e,t]=this.selectedTime.split(":").map(Number),s=10*Math.floor(t/10);return`${String(e).padStart(2,"0")}:${String(s).padStart(2,"0")}`}},methods:{onTimeInputChange(e){const t=e.target.value,[s,a]=t.split(":").map(Number),i=10*Math.floor(a/10);this.selectedTime=`${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`},isDateDisabled(e){if(!e)return!1;const t=new Date(e),s=t.getMonth()+1,a=t.getDate();return s>=1&&s<=7&&15!==a||(8===s&&a<=25||((10===s||12===s)&&15!==a||11===s&&a>=9))},handleDateChange(e){const t=e.target.value;this.isDateDisabled(t)&&(alert("抱歉，选择的日期未进行模拟，请选择其他日期。可选日期为，9月1日-9月30日，11月1日到9日，以及其他月份的15日."),this.selectedDate="")},handleKeydown(e){if(this.searchResults.length&&this.searchQueryStart)switch(e.key){case"Escape":this.searchResults=[];break;case"Tab":e.preventDefault(),this.highlightedIndex=(this.highlightedIndex+1)%this.searchResults.length,(0,a.dY)((()=>{const e=this.$refs.searchResultsStart.querySelector("li.highlighted");e&&e.scrollIntoView({block:"nearest",behavior:"smooth"})}));break;case"Enter":this.highlightedIndex>=0&&this.highlightedIndex<this.searchResults.length&&this.selectResult(this.searchResults[this.highlightedIndex],!0);break}else if(this.searchResultsEnd.length&&this.searchQueryEnd)switch(e.key){case"Escape":this.searchResultsEnd=[];break;case"Tab":e.preventDefault(),this.highlightedIndex=(this.highlightedIndex+1)%this.searchResultsEnd.length,(0,a.dY)((()=>{const e=this.$refs.searchResultsEnd.querySelector("li.highlighted");e&&e.scrollIntoView({block:"nearest",behavior:"smooth"})}));break;case"Enter":this.highlightedIndex>=0&&this.highlightedIndex<this.searchResultsEnd.length&&this.selectResult(this.searchResultsEnd[this.highlightedIndex],!1);break}},updateTime(){const e=new Date,t=`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`;this.isTimeFromUrl&&this.selectedTime!==t||(this.selectedTime=t,this.isTimeFromUrl=!1)},clc1(){this.searchQueryStart=""},clc2(){this.searchQueryEnd=""},parseUrlParams(){const e=new URLSearchParams(window.location.search),t=e.get("start"),s=e.get("end"),a=e.get("date"),i=e.get("time");if(t)try{const e=JSON.parse(decodeURIComponent(t));e&&e.address&&(this.searchQueryStart=e.name)}catch(l){console.error("Error parsing start parameter:",l)}if(s)try{const e=JSON.parse(decodeURIComponent(s));e&&e.address&&(this.searchQueryEnd=e.name)}catch(l){console.error("Error parsing end parameter:",l)}a&&(this.selectedDate=a),i&&(this.selectedTime=i,this.isTimeFromUrl=!0),this.created()},swap(){const e=this.searchQueryStart;this.searchQueryStart=this.searchQueryEnd,this.searchQueryEnd=e;const t=this.selectedResultStart;this.selectedResultStart=this.selectedResultEnd,this.selectedResultEnd=t,this.router.push({path:"/lu-jing-gui-hua/result",query:{start:JSON.stringify(this.selectedResultStart),end:JSON.stringify(this.selectedResultEnd),date:this.selectedDate,time:this.selectedTime,BasemapLayer:this.BasemapName}})},onSearchInputChange(e,t){const s=e.target.value,a=t?"searchResults":"searchResultsEnd";s.includes("'")?console.log("输入法临时输入，不发送请求"):s.length>=2?fetch("http://172.30.114.151/sun-glare-project/api/search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({searchQueryStart:s})}).then((e=>e.json())).then((e=>{this[a]=e})).catch((e=>{console.error("错误:",e)})):this[a]=[]},selectResult(e,t=!0){const s={name:e.name,address:e.address,wgs84_latitude:e.wgs84_latitude,wgs84_longitude:e.wgs84_longitude,location:[e.wgs84_longitude,e.wgs84_latitude],baidu_index:e.baidu_index,baidu_latitude:e.baidu_latitude,baidu_longitude:e.baidu_longitude,id:e.id,label:e.label};let a=!1;const i=this.BasemapLayer;console.log("BasemapName:",i),t&&this.selectedResultStart?(a=!0,this.selectedResultStart=s,this.searchQueryStart=s.name,this.searchResults=[]):!t&&this.selectedResultEnd?(a=!0,this.selectedResultEnd=s,this.searchQueryEnd=s.name,this.searchResultsEnd=[]):t?(this.selectedResultStart=s,this.searchQueryStart=s.name,this.searchResults=[]):(this.selectedResultEnd=s,this.searchQueryEnd=s.name,this.searchResultsEnd=[]);const l=this.selectedResultStart||this.selectedResultEnd;this.selectedResultStart&&this.selectedResultEnd?this.navigateToResultPage():l&&this.navigateToIntermediatePage(t?"start":"end",s,a)},navigateToResultPage(){this.$router.push({path:"/lu-jing-gui-hua/result",query:{start:JSON.stringify({...this.selectedResultStart,location:[this.selectedResultStart.wgs84_longitude,this.selectedResultStart.wgs84_latitude]}),end:JSON.stringify({...this.selectedResultEnd,location:[this.selectedResultEnd.wgs84_longitude,this.selectedResultEnd.wgs84_latitude]}),date:this.selectedDate,time:this.selectedTime,BasemapLayer:this.BasemapName}})},navigateToIntermediatePage(e,t,s=!1){const a="/lu-jing-gui-hua/intermediate-page",i={[e]:JSON.stringify(t),date:this.selectedDate,time:this.selectedTime,BasemapLayer:this.BasemapName};s?this.$router.replace({path:a,query:i}).then((()=>{window.location.reload()})):this.$router.push({path:a,query:i})},onSearch(){if(this.selectedResultStart&&this.selectedResultEnd){this.isLoading=!0;const e={...this.selectedResultStart,location:[this.selectedResultStart.wgs84_longitude,this.selectedResultStart.wgs84_latitude]},t={...this.selectedResultEnd,location:[this.selectedResultEnd.wgs84_longitude,this.selectedResultEnd.wgs84_latitude]},s=5===this.selectedTime.length?`${this.selectedTime}:00`:this.selectedTime;console.log("Formatted Time:",s),j.A.post("http://172.30.114.151/sun-glare-project/api/route/plan",{start:e,end:t,date:this.selectedDate,time:s}).then((a=>{const i=a.data.default_id,l=a.data.time_based_id;console.log("默认路径规划结果ID:",i),console.log("基于时间的路径规划结果ID:",l),console.log("路径规划成功，时间日期是:",this.selectedDate,this.selectedTime),this.isLoading=!1,this.$router.push({path:"/lu-jing-gui-hua/route",query:{start:JSON.stringify(e),end:JSON.stringify(t),default_id:i,time_based_id:l,date:this.selectedDate,time:s,BasemapLayer:this.BasemapName}})})).catch((e=>{console.error(e),this.isLoading=!1,alert("路径规划失败，请稍后再试。")}))}else alert("请确保起点和终点都已选择。")},initMap(){const e=new N.A({basemap:this.BasemapName||"tianditu-vector"});this.map=e,this.view=new _.A({container:"viewDiv",map:e,center:[114.3,30.7],zoom:4,constraints:{geometry:{type:"extent",xmin:113.6,ymin:29.9,xmax:115,ymax:31.3},minScale:500,maxScale:2e6,rotationEnabled:!1,snapToZoom:!1}});const t=new U.A({view:this.view,source:{query:{title:'"Basemaps for Developers" AND owner:geoscenedev'}}});t.watch("activeBasemap",(e=>{this.handleBasemapChange(e)}));const s=new V.A({view:this.view}),a=new M.A({view:this.view}),i=new P.A({view:this.view,unit:"metric",style:"ruler"}),l=new K.A({view:this.view,unit:"metric",unitOptions:{metric:["kilometers","meters"],nonMetric:["miles","feet"]},iconClass:"esri-icon-measure-line"});this.view.ui.add(l,{position:"bottom-leading",index:0}),this.view.ui.add(t,{position:"bottom-right",index:0}),this.view.ui.add(s,{position:"bottom-right",index:1}),this.view.ui.move("zoom",{position:"bottom-left",index:1}),this.view.ui.add(a,{position:"bottom-left",index:2}),this.view.ui.add(i,{position:"bottom-left",index:3});const n=new $.A({title:"起点和终点"});e.add(n);const r=new q["default"]({url:"https://www.geosceneonline.cn/server/rest/services/Hosted/wuhan_village/FeatureServer",title:"武汉县区面",renderer:{type:"simple",symbol:{type:"simple-fill",color:[0,0,0,0],outline:{color:[0,0,0,1],width:1}}},popupTemplate:{content:[{type:"fields",fieldInfos:[{fieldName:"县区name",label:"县区名称"}]}]}});e.add(r),this.view.when((()=>{this.drawPoints(n),this.adjustView(),this.ismaploading=!1})).catch((e=>{console.error("MapView initialization error:",e)}))},adjustView(){if(this.selectedResultStart&&this.selectedResultEnd){const e=.01,t=new A.A({xmin:Math.min(this.selectedResultStart.location[0],this.selectedResultEnd.location[0])-10*e,ymin:Math.min(this.selectedResultStart.location[1],this.selectedResultEnd.location[1])-10*e,xmax:Math.max(this.selectedResultStart.location[0],this.selectedResultEnd.location[0])+10*e,ymax:Math.max(this.selectedResultStart.location[1],this.selectedResultEnd.location[1])+10*e});this.view.goTo(t).catch((e=>{console.error("Error adjusting view:",e)}))}else this.selectedResultStart?this.view.goTo({center:[this.selectedResultStart.location[0],this.selectedResultStart.location[1]],zoom:10}).catch((e=>{console.error("Error adjusting view:",e)})):this.selectedResultEnd&&this.view.goTo({center:[this.selectedResultEnd.location[0],this.selectedResultEnd.location[1]],zoom:10}).catch((e=>{console.error("Error adjusting view:",e)}))},drawPoints(e){if(this.selectedResultStart){const t=this.selectedResultStart,s=new Q.A({longitude:t.location[0],latitude:t.location[1]}),a=new B.A({geometry:s,symbol:{type:"simple-marker",color:"red",size:"20px"},popupTemplate:{title:"起点信息",content:[{type:"fields",fieldInfos:[{fieldName:"address",label:"地址"},{fieldName:"name",label:"名称"}]}]},attributes:t});e.add(a)}if(this.selectedResultEnd){const t=this.selectedResultEnd,s=new Q.A({longitude:t.location[0],latitude:t.location[1]}),a=new B.A({geometry:s,symbol:{type:"simple-marker",color:"green",size:"20px"},popupTemplate:{title:"终点信息",content:[{type:"fields",fieldInfos:[{fieldName:"address",label:"地址"},{fieldName:"name",label:"名称"}]}]},attributes:t});e.add(a)}},handleBasemapChange(e){const t={"天地图-矢量（球面墨卡托投影）":"tianditu-vector","天地图-影像（球面墨卡托投影）":"tianditu-image","天地图-地形（球面墨卡托投影）":"tianditu-topography"};t[e.title]?this.BasemapName=t[e.title]:this.BasemapName=e.title,console.log("Basemap changed:",this.BasemapName);const s=new URLSearchParams(window.location.search);s.set("BasemapLayer",this.BasemapName),window.history.replaceState({},"",`${window.location.pathname}?${s}`)},created(){const e=this.$route.query.BasemapLayer,t={"天地图-矢量（球面墨卡托投影）":"tianditu-vector","天地图-影像（球面墨卡托投影）":"tianditu-image","天地图-地形（球面墨卡托投影）":"tianditu-topography","天地图-矢量（含注记）（球面墨卡托投影）":"tianditu-vector"};e&&(t[e]?this.BasemapName=t[e]:this.BasemapName=e),console.log("BasemapLayer is update",this.BasemapName)}}},F=s(71241);const z=(0,F.A)(X,[["render",D]]);var H=z}}]);
//# sourceMappingURL=lu-jing-gui-hua-intermediate-page.43cba603.js.map