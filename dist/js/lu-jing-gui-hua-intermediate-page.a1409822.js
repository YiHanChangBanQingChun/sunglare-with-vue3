"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[9144],{75526:function(e,t,s){s.r(t),s.d(t,{default:function(){return ne}});var a=s(56768),i=s(45130),l=s(24232),n=s(71132),r=s(91971),h=s(1774),o=s(65438);const d={class:"lu-jing-gui-hua"},c={class:"search-containers"},A={class:"revert-containers"},u=(0,a.Lk)("div",{class:"car"},[(0,a.Lk)("img",{src:n})],-1),g={class:"swap-action"},m=["src"],p={class:"search-container start"},f=(0,a.Lk)("div",{class:"search-icon-wrapper"},[(0,a.Lk)("img",{src:r,alt:"pink"})],-1),E={class:"search-box-img"},R=(0,a.Lk)("img",{src:h,alt:"delete1"},null,-1),w=[R],y={key:0,class:"search-results",ref:"searchResultsStart"},S=["onClick"],v={class:"search-container end"},k=(0,a.Lk)("div",{class:"search-icon-wrapper"},[(0,a.Lk)("img",{src:o,alt:"green"})],-1),Q={class:"search-box-img"},b=(0,a.Lk)("img",{src:h,alt:"delete1"},null,-1),z=[b],D={key:0,class:"search-results",ref:"searchResultsEnd"},L=["onClick"],C=["src"],x={key:0,class:"loader-overlay"},B=(0,a.Lk)("div",{class:"loader"},null,-1),O=[B],I=(0,a.Lk)("div",{id:"viewDiv"},null,-1),q={key:0,class:"maploader-overlay"},T=(0,a.Lk)("div",{class:"maploader"},null,-1),Z=[T],P={class:"main-container"},U={class:"choose-time"},J={class:"form-group"},V=(0,a.Lk)("label",{for:"date-input"},"选择日期：",-1),M=["min","max"],N=(0,a.Lk)("label",{for:"time-input"},"选择时间：",-1);function j(e,t,n,r,h,o){return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.Lk)("div",d,[(0,a.Lk)("div",c,[(0,a.Lk)("div",A,[u,(0,a.Lk)("div",g,[(0,a.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>o.swap&&o.swap(...e)),title:"切换起终点"},[(0,a.Lk)("img",{src:s(81542),alt:"",class:"revert"},null,8,m)])])]),(0,a.Lk)("div",p,[f,(0,a.bo)((0,a.Lk)("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=e=>r.searchQueryStart=e),onInput:t[2]||(t[2]=e=>o.onSearchInputChange(e,!0)),placeholder:"请输入起点",class:"search-box search-box-start"},null,544),[[i.Jo,r.searchQueryStart]]),(0,a.Lk)("span",E,[(0,a.Lk)("div",{class:"delete",title:"清空",onClick:t[3]||(t[3]=(...e)=>o.clc1&&o.clc1(...e))},w)]),h.searchResults.length&&r.searchQueryStart?((0,a.uX)(),(0,a.CE)("div",y,[(0,a.Lk)("ul",null,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(h.searchResults,((e,t)=>((0,a.uX)(),(0,a.CE)("li",{key:t,class:(0,l.C4)({highlighted:t===h.highlightedIndex}),onClick:t=>o.selectResult(e,!0)},(0,l.v_)(e.name),11,S)))),128))])],512)):(0,a.Q3)("",!0)]),(0,a.Lk)("div",v,[k,(0,a.bo)((0,a.Lk)("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=e=>r.searchQueryEnd=e),onInput:t[5]||(t[5]=e=>o.onSearchInputChange(e,!1)),placeholder:"请输入终点",class:"search-box search-box-end"},null,544),[[i.Jo,r.searchQueryEnd]]),(0,a.Lk)("span",Q,[(0,a.Lk)("div",{class:"delete",title:"清空",onClick:t[6]||(t[6]=(...e)=>o.clc2&&o.clc2(...e))},z)]),h.searchResultsEnd.length&&r.searchQueryEnd?((0,a.uX)(),(0,a.CE)("div",D,[(0,a.Lk)("ul",null,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(h.searchResultsEnd,((e,t)=>((0,a.uX)(),(0,a.CE)("li",{key:t,class:(0,l.C4)({highlighted:t===h.highlightedIndex}),onClick:t=>o.selectResult(e,!1)},(0,l.v_)(e.name),11,L)))),128))])],512)):(0,a.Q3)("",!0)]),(0,a.Lk)("div",{class:"search-action",onClick:t[7]||(t[7]=(...e)=>o.onSearch&&o.onSearch(...e)),title:"搜索"},[(0,a.Lk)("img",{src:s(91060),alt:"",class:"search"},null,8,C)]),h.isLoading?((0,a.uX)(),(0,a.CE)("div",x,O)):(0,a.Q3)("",!0)])]),I,h.ismaploading?((0,a.uX)(),(0,a.CE)("div",q,Z)):(0,a.Q3)("",!0),(0,a.Lk)("div",P,[(0,a.Lk)("div",U,[(0,a.Lk)("div",J,[V,(0,a.bo)((0,a.Lk)("input",{id:"date-input",type:"date","onUpdate:modelValue":t[8]||(t[8]=e=>h.selectedDate=e),min:o.minDate,max:o.maxDate,class:(0,l.C4)({"invalid-date":o.isDateDisabled(h.selectedDate)}),onChange:t[9]||(t[9]=(...e)=>o.handleDateChange&&o.handleDateChange(...e))},null,42,M),[[i.Jo,h.selectedDate]]),N,(0,a.bo)((0,a.Lk)("input",{id:"time-input",type:"time","onUpdate:modelValue":t[10]||(t[10]=e=>o.formattedTime=e),onInput:t[11]||(t[11]=(...e)=>o.onTimeInputChange&&o.onTimeInputChange(...e)),step:"600"},null,544),[[i.Jo,o.formattedTime]])])])])],64)}s(44114),s(14603),s(47566),s(98721);var H=s(7382),K=s(27583),F=s(11134),Y=s(74036),X=s(58423),G=s(94373),W=s(41759),_=s(90144),$=s(81387),ee=s(57829),te=s(3949),se=s(95587),ae={name:"IntermediatePageView",setup(){const e=(0,_.KR)(""),t=(0,_.KR)(""),s=(0,_.KR)(null),a=(0,_.KR)(null),i=(0,$.rd)();return{searchQueryStart:e,searchQueryEnd:t,selectedResultStart:s,selectedResultEnd:a,router:i}},data(){return{searchResults:[],searchResultsEnd:[],isLoading:!1,ismaploading:!0,selectedDate:"",selectedTime:"",highlightedIndex:-1}},mounted(){this.initMap(),this.$route.query.start&&(this.selectedResultStart=JSON.parse(this.$route.query.start)),this.$route.query.end&&(this.selectedResultEnd=JSON.parse(this.$route.query.end)),this.parseUrlParams(),setInterval((()=>{this.updateTime()}),6e4),window.addEventListener("keydown",this.handleKeydown)},beforeUnmount(){window.removeEventListener("keydown",this.handleKeydown)},computed:{minDate(){return"2024-01-01"},maxDate(){return"2024-12-31"},formattedTime(){if(!this.selectedTime)return"";const[e,t]=this.selectedTime.split(":").map(Number),s=10*Math.floor(t/10);return`${String(e).padStart(2,"0")}:${String(s).padStart(2,"0")}`}},methods:{onTimeInputChange(e){const t=e.target.value,[s,a]=t.split(":").map(Number),i=10*Math.floor(a/10);this.selectedTime=`${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`},isDateDisabled(e){if(!e)return!1;const t=new Date(e),s=t.getMonth()+1;return 9===s},handleDateChange(e){const t=e.target.value;this.isDateDisabled(t)&&(alert("抱歉，选择的日期未进行模拟，请选择其他日期。可选日期为，9月1日-9月30日."),this.selectedDate="")},handleKeydown(e){if(this.searchResults.length&&this.searchQueryStart)switch(e.key){case"Escape":this.searchResults=[];break;case"Tab":e.preventDefault(),this.highlightedIndex=(this.highlightedIndex+1)%this.searchResults.length,(0,a.dY)((()=>{const e=this.$refs.searchResultsStart.querySelector("li.highlighted");e&&e.scrollIntoView({block:"nearest",behavior:"smooth"})}));break;case"Enter":this.highlightedIndex>=0&&this.highlightedIndex<this.searchResults.length&&this.selectResult(this.searchResults[this.highlightedIndex],!0);break}else if(this.searchResultsEnd.length&&this.searchQueryEnd)switch(e.key){case"Escape":this.searchResultsEnd=[];break;case"Tab":e.preventDefault(),this.highlightedIndex=(this.highlightedIndex+1)%this.searchResultsEnd.length,(0,a.dY)((()=>{const e=this.$refs.searchResultsEnd.querySelector("li.highlighted");e&&e.scrollIntoView({block:"nearest",behavior:"smooth"})}));break;case"Enter":this.highlightedIndex>=0&&this.highlightedIndex<this.searchResultsEnd.length&&this.selectResult(this.searchResultsEnd[this.highlightedIndex],!1);break}},updateTime(){const e=new Date,t=`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`;this.isTimeFromUrl&&this.selectedTime!==t||(this.selectedTime=t,this.isTimeFromUrl=!1)},clc1(){this.searchQueryStart=""},clc2(){this.searchQueryEnd=""},parseUrlParams(){const e=new URLSearchParams(window.location.search),t=e.get("start"),s=e.get("end"),a=e.get("date"),i=e.get("time");if(t)try{const e=JSON.parse(decodeURIComponent(t));e&&e.address&&(this.searchQueryStart=e.name)}catch(l){console.error("Error parsing start parameter:",l)}if(s)try{const e=JSON.parse(decodeURIComponent(s));e&&e.address&&(this.searchQueryEnd=e.name)}catch(l){console.error("Error parsing end parameter:",l)}a&&(this.selectedDate=a),i&&(this.selectedTime=i,this.isTimeFromUrl=!0)},swap(){const e=this.searchQueryStart;this.searchQueryStart=this.searchQueryEnd,this.searchQueryEnd=e;const t=this.selectedResultStart;this.selectedResultStart=this.selectedResultEnd,this.selectedResultEnd=t,this.router.push({path:"/lu-jing-gui-hua/result",query:{start:JSON.stringify(this.selectedResultStart),end:JSON.stringify(this.selectedResultEnd),date:this.selectedDate,time:this.selectedTime}})},onSearchInputChange(e,t){const s=e.target.value,a=t?"searchResults":"searchResultsEnd";s.includes("'")?console.log("输入法临时输入，不发送请求"):s.length>=2?fetch("http://112.125.122.56/sun-glare-project/api/search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({searchQueryStart:s})}).then((e=>e.json())).then((e=>{this[a]=e})).catch((e=>{console.error("错误:",e)})):this[a]=[]},selectResult(e,t=!0){const s={name:e.name,address:e.address,wgs84_latitude:e.wgs84_latitude,wgs84_longitude:e.wgs84_longitude,location:[e.wgs84_longitude,e.wgs84_latitude],baidu_index:e.baidu_index,baidu_latitude:e.baidu_latitude,baidu_longitude:e.baidu_longitude,id:e.id,label:e.label};let a=!1;t&&this.selectedResultStart?(a=!0,this.selectedResultStart=s,this.searchQueryStart=s.name,this.searchResults=[]):!t&&this.selectedResultEnd?(a=!0,this.selectedResultEnd=s,this.searchQueryEnd=s.name,this.searchResultsEnd=[]):t?(this.selectedResultStart=s,this.searchQueryStart=s.name,this.searchResults=[]):(this.selectedResultEnd=s,this.searchQueryEnd=s.name,this.searchResultsEnd=[]);const i=this.selectedResultStart||this.selectedResultEnd;this.selectedResultStart&&this.selectedResultEnd?this.navigateToResultPage():i&&this.navigateToIntermediatePage(t?"start":"end",s,a)},navigateToResultPage(){this.$router.push({path:"/lu-jing-gui-hua/result",query:{start:JSON.stringify({...this.selectedResultStart,location:[this.selectedResultStart.wgs84_longitude,this.selectedResultStart.wgs84_latitude]}),end:JSON.stringify({...this.selectedResultEnd,location:[this.selectedResultEnd.wgs84_longitude,this.selectedResultEnd.wgs84_latitude]}),date:this.selectedDate,time:this.selectedTime}})},navigateToIntermediatePage(e,t,s=!1){const a="/lu-jing-gui-hua/intermediate-page",i={[e]:JSON.stringify(t),date:this.selectedDate,time:this.selectedTime};s?this.$router.replace({path:a,query:i}).then((()=>{window.location.reload()})):this.$router.push({path:a,query:i})},onSearch(){if(this.selectedResultStart&&this.selectedResultEnd){this.isLoading=!0;const e={...this.selectedResultStart,location:[this.selectedResultStart.wgs84_longitude,this.selectedResultStart.wgs84_latitude]},t={...this.selectedResultEnd,location:[this.selectedResultEnd.wgs84_longitude,this.selectedResultEnd.wgs84_latitude]},s=5===this.selectedTime.length?`${this.selectedTime}:00`:this.selectedTime;console.log("Formatted Time:",s),G.A.post("http://112.125.122.56/sun-glare-project/api/route/plan",{start:e,end:t,date:this.selectedDate,time:s}).then((a=>{const i=a.data.default_id,l=a.data.time_based_id;console.log("默认路径规划结果ID:",i),console.log("基于时间的路径规划结果ID:",l),console.log("路径规划成功，时间日期是:",this.selectedDate,this.selectedTime),this.isLoading=!1,this.$router.push({path:"/lu-jing-gui-hua/route",query:{start:JSON.stringify(e),end:JSON.stringify(t),default_id:i,time_based_id:l,date:this.selectedDate,time:s}})})).catch((e=>{console.error(e),this.isLoading=!1,alert("路径规划失败，请稍后再试。")}))}else alert("请确保起点和终点都已选择。")},initMap(){const e=new H.A({basemap:"tianditu-vector"});this.map=e,this.view=new K.A({container:"viewDiv",map:e,center:[114.3,30.7],zoom:4,constraints:{geometry:{type:"extent",xmin:113.6,ymin:29.9,xmax:115,ymax:31.3},minScale:500,maxScale:2e6,rotationEnabled:!1,snapToZoom:!1}});const t=new ee.A({view:this.view,source:{query:{title:'"Basemaps for Developers" AND owner:geoscenedev'}}}),s=new se.A({view:this.view});this.view.ui.add(t,"bottom-right"),this.view.ui.move("zoom","bottom-left"),this.view.ui.add(s,"bottom-left");const a=new X.A;e.add(a);const i=new te["default"]({url:"https://www.geosceneonline.cn/server/rest/services/Hosted/wuhan_village/FeatureServer",renderer:{type:"simple",symbol:{type:"simple-fill",color:[0,0,0,0],outline:{color:[0,0,0,1],width:1}}},popupTemplate:{content:[{type:"fields",fieldInfos:[{fieldName:"县区name",label:"县区名称"}]}]}});e.add(i),this.view.when((()=>{this.drawPoints(a),this.adjustView(),this.ismaploading=!1})).catch((e=>{console.error("MapView initialization error:",e)}))},adjustView(){if(this.selectedResultStart&&this.selectedResultEnd){const e=.01,t=new W.A({xmin:Math.min(this.selectedResultStart.location[0],this.selectedResultEnd.location[0])-10*e,ymin:Math.min(this.selectedResultStart.location[1],this.selectedResultEnd.location[1])-10*e,xmax:Math.max(this.selectedResultStart.location[0],this.selectedResultEnd.location[0])+10*e,ymax:Math.max(this.selectedResultStart.location[1],this.selectedResultEnd.location[1])+10*e});this.view.goTo(t).catch((e=>{console.error("Error adjusting view:",e)}))}else this.selectedResultStart?this.view.goTo({center:[this.selectedResultStart.location[0],this.selectedResultStart.location[1]],zoom:10}).catch((e=>{console.error("Error adjusting view:",e)})):this.selectedResultEnd&&this.view.goTo({center:[this.selectedResultEnd.location[0],this.selectedResultEnd.location[1]],zoom:10}).catch((e=>{console.error("Error adjusting view:",e)}))},drawPoints(e){if(this.selectedResultStart){const t=this.selectedResultStart,s=new Y.A({longitude:t.location[0],latitude:t.location[1]}),a=new F.A({geometry:s,symbol:{type:"simple-marker",color:"red",size:"20px"},popupTemplate:{title:"起点信息",content:[{type:"fields",fieldInfos:[{fieldName:"address",label:"地址"},{fieldName:"name",label:"名称"}]}]},attributes:t});e.add(a)}if(this.selectedResultEnd){const t=this.selectedResultEnd,s=new Y.A({longitude:t.location[0],latitude:t.location[1]}),a=new F.A({geometry:s,symbol:{type:"simple-marker",color:"green",size:"20px"},popupTemplate:{title:"终点信息",content:[{type:"fields",fieldInfos:[{fieldName:"address",label:"地址"},{fieldName:"name",label:"名称"}]}]},attributes:t});e.add(a)}}}},ie=s(71241);const le=(0,ie.A)(ae,[["render",j]]);var ne=le},1774:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAt1BMVEUAAAD///+qqqqAgICZmZmVlZWenp6Xl5eZmZmbm5uenp6ZmZmcnJyYmJiampqZmZmbm5uYmJiampqbm5uZmZmampqYmJiampqbm5uZmZmampqZmZmampqbm5ubm5uampqampqZmZmampqZmZmampqbm5uampqZmZmampqampqampqampqbm5uampqampqampqZmZmampqampqZmZmampqampqampqampqampqampqampqampqampqw7qK0AAAAPHRSTlMAAQMEBQwVFhkhIiMkJSYtLi8wRUZHSElKS3x9fn+Wl5iZmp6foKGjpLS1tre4wtLT1tfY2dvt7u/6+/wzxdzZAAAAAWJLR0QB/wIt3gAAAOdJREFUGNNVkF1XglAQRTcS3DSQlEoyv0rTtLKbGsLl/P/f1QPqwnmbvdZZc2ZDPX4/y3o+zekuC0k6LuIL8sZO2q03e8m9eCf2ITdpA3SmTquajlWk51BaaATQdS4lCAHCgLRyMbDUhGBrDRi7DZhpATeF2oRW1hgrG3Kn3KevX8BYWStrgL3uedaamtaMLz0x0AYg/JF2twDfeqSn3XX8oAT/qE7zUKS8Be+aNiu9ag7EZZU1yrsyAhg13nwoNKyFrORmHYDorToLwRs56bD5/JPKoXcxGi9yScrn0ZV7P8kGSeu0/AOgQSGjf0LSLgAAAABJRU5ErkJggg=="},71132:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABBUlEQVR4nO2TQWoCQRBFWzcGNEcQhCQbFyZMZ+UmV0ju4iYqDDpVhJBVTuIlXMaFNzEEQrLQF3poVzrTLYMgwYJaNPxf//+ubmPOdZJllWkifFuFmM6xwiRq+H1G2wqb2OF228Lm9oVOUCDJGHjCzEAtSICaw+ZJMgYx17Pwrh6jIjtTwpM39VE+POMqd6J8PqRcxApcv9Owwspx76bclLkf+6XNTUo9VsBhHccnHxcLCMuDl6s7y16WJVhXFlDWZQLbd/3ce6OZKMOIP7CDDQp0U1ru3H/lMiSwDxtOoAwd0QqjYII92KBA1Tb/WuDXv+WfQlAVrhXUKl+JIoWgI3DPZY5af/ThJlHmC57YAAAAAElFTkSuQmCC"},65438:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAABRUlEQVQokaWRTU4CQRCFv2qQlTvQ4F4lRG+gmHgHI3oBDBBJPABMg0cQ8Ap6DSGu3Jrgz1qIuGDhSp1uF8yMHZwIiW9Xr+rret0N/5DMGvpR7xljKkAByABjoK9EtXVO92Ph0l1pKbucvQBO/lh2qYaqpvf1F0AydBcAAcp2zVqgCqDCqC4oVq5UQm2N3kcp69tt4DrsWWxFP+jdaHNwxwhs5pvHzrZ74MgbeGKxhwAGUwH6KhgoRHBSzuPyGt+0osJO50M4EzU+eI6DJ6mJ66+48Ftkp1iPg9Of6Q2nHLtwz4nX+EVaxFe+F5aC3EDwYFZsR6wUg17RG3hifNNKkHhC2PQffE+Qgwi20pkeEqgxaHSBclxkVyLSbuaap25s1FDVBOnOA+VFzn7iz6g+qO+ISDX4jlXgFaGnjGrrvL6dl2xhfQOqgmx7UWxefQAAAABJRU5ErkJggg=="},91971:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAABLElEQVQokaWS0U0CURBFz7xV/gG1AvVHO8C1CmO0AgNk2diAEOxgWTB0oJYBhA780goEtgHMjh9LllHWQOL8zX3vZO59b+AfJb8FjeNLVBuADxwAM2CCc7E0m5NCWIfDfZbLHqp3f45SfSJJWtLpfAHs5QfbQACROtWqAk0AZ6xa8BnVM0qlEiLnwIs5a2i/f7GenGXMQQmCW9O/ATcaRYLINQBp2gAmbnXBN7keCy071zWdn9sme9WskuSjEE5Tqx9aeJ7LlcpxIax6YrqZhce5LPKwyangeW0jjWD1zxpFPiIjc/sV57rM5++Uy6d4XhvVKxOhJmE4XS9JFA0QqRda/lmxBEFgbUOStIDBNpDF4j5PuJGv16uRbZAPHAGfwJg0jSUMpzs4262+ARvYazC3hlvBAAAAAElFTkSuQmCC"},81542:function(e){e.exports="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABAAEADABEAAREBAhEB/8QAGwAAAgMBAQEAAAAAAAAAAAAABAYAAQcFAgP/xAAqEAABBAEDAwIGAwAAAAAAAAABAAIDBAURUWESNXMhMQYTIjJBcRQjQv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMAAAERAhEAPwDZkEQUgtBEEQRBEEQcrN5uLFQ9LdH2Hj6GbcnhArY/PW6d51iR7pmynWVpP3cjYoHirahu12zwPD2O/O3BQfZAjZbLZCHK2Y47krWNkIDQ70AQNuJkfNiq0kji57owS4+5KAxAHlLU1PHyzwQmV7R6Dbk/pBnsss1qd8sjnSSO1c4oPDWlx0aCTsEHSwWQt0rzY67HTNlOjoh/rngoH5Bnma7zb8pQO2F7NU8QQHIKQcfIYunTx2QnghDXyxnU7cDZAqYXvNTyhA8VcXTp2JZ4IQ18p9TtwNkBiDO813m35SgdsL2ap4ggOQRADmuzW/EUCThe81PKEGiIKQZ5mu82/KUDthezVPEEByCIAc12a34igScL3mp5Qg0NAi5fL35Mp1O66xru/rj1+3k76oObasOt2ZLDwA6Q9R09tUH3flbZ/jdEpjFZoEYb+OUD1i7U1zHxTzwmJ7h6jfkftAYgBzXZrfiKBJwveanlCDREHKzeEiysPU3Rlhg+h+/B4QI08EtaZ0MzCyRh0LSgYvh74e+b03brPo944yPu5PCBrQWg8SRsmjdHI0PY4aOafYhANHicfDI2SOnE17TqHBvqCgMQRAHaxdO7YinnhDnxH0O/B3CAtBaD/9k="},91060:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABAlBMVEUAAAAA//8AgP9Vqv9AgP9AgP85gP82hv8zgP8xhv8ugP8xif83if81hP81h/80g/8zhf8yh/80hP8yhP80hv8xhP81hv81g/80hf8yhP80hv80hv8yhP8yhP8yhf8yhv80hf8yhf8zhP8zhv8zhP8yhf8yhf8zhv8zhf8yhv80hf8zhv80hf8zhv8yhf80hf8zhf80hf8zhv8zhf8zhv80hP8zhf8yhf80hf8zhP8zhf8zhv8yhf80hf8zhf8zhf8zhf8zhP8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhf8zhv8zhf8zhf8zhf////8f5maRAAAAVHRSTlMAAQIDBAgSExQVFhocHSInMjM2ODs+P0RFTU5UV1tcYWJmaGlqa3V4eXp7fIqNjpSVo6SlpqapsbK5ur/AwcLDz9Da3t/g4uPo7/Lz9PX2+/z8/f6zDptbAAAAAWJLR0RVkwS4MwAAARJJREFUGBm9wek6AmEAhuE3k11FdjOmkH3LTihblO0b9Zz/sZh0Vd9Efrnct/5TLL25f7S3NKafOZkyX+qFCf1g8JK2+nZM3YbusOXVxbki9Ha4urhepCGnqAyhi1E1zFWA5xHZ+spAIa6mVBXYkW0SeB9TSw54kG0DOFRb/wuQlCUP5NRxDczIcgD46jgH5mXZBdbVcQukZVkGSmpL1CAYlCVRB2bVcgSUFFEAKik1rRHKKmK8BlRX+iUlTgg9OYraouG1eHZToyHwFBXLE2U8dVl5puXxAwh8dRneuScUlLKOa4DA1zfJ6YX0gEKuAQJfvbkGCHz15hnAeOrNM4CZUm+ugdO4fuGZY0e/mnL0Jz4BcBxPYxuSuGYAAAAASUVORK5CYII="},58423:function(e,t,s){s.d(t,{A:function(){return u}});var a=s(71457),i=s(76543),l=(s(37679),s(69292),s(51020),s(29916)),n=s(46626),r=s(71680),h=s(79366),o=s(99024),d=s(41341),c=s(9693);let A=class extends((0,h.d)((0,o.j)(r.A))){constructor(e){super(e),this.elevationInfo=null,this.graphics=new d.Y,this.screenSizePerspectiveEnabled=!0,this.type="graphics",this.internal=!1}destroy(){this.removeAll(),this.graphics.destroy()}add(e){return this.graphics.add(e),this}addMany(e){return this.graphics.addMany(e),this}removeAll(){return this.graphics.removeAll(),this}remove(e){this.graphics.remove(e)}removeMany(e){this.graphics.removeMany(e)}on(e,t){return super.on(e,t)}graphicChanged(e){this.emit("graphic-update",e)}};(0,a._)([(0,i.MZ)({type:c.A})],A.prototype,"elevationInfo",void 0),(0,a._)([(0,i.MZ)((0,n.C)(d.Y,"graphics"))],A.prototype,"graphics",void 0),(0,a._)([(0,i.MZ)({type:["show","hide"]})],A.prototype,"listMode",void 0),(0,a._)([(0,i.MZ)()],A.prototype,"screenSizePerspectiveEnabled",void 0),(0,a._)([(0,i.MZ)({readOnly:!0})],A.prototype,"type",void 0),(0,a._)([(0,i.MZ)({constructOnly:!0})],A.prototype,"internal",void 0),A=(0,a._)([(0,l.$)("geoscene.layers.GraphicsLayer")],A);const u=A}}]);
//# sourceMappingURL=lu-jing-gui-hua-intermediate-page.a1409822.js.map