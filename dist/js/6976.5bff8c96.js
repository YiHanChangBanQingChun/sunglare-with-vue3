"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[6976],{6976:function(n,t,e){e.r(t),e.d(t,{registerFunctions:function(){return o}});e(44114);var r=e(28531),a=e(93618),u=e(72842),i=e(32508);async function c(n,t,e,r,c,o){if(1===r.length){if((0,a.m)(r[0]))return(0,u.t)(n,r[0],(0,a.D)(r[1],-1));if((0,a.o)(r[0]))return(0,u.t)(n,r[0].toArray(),(0,a.D)(r[1],-1))}else if(2===r.length){if((0,a.m)(r[0]))return(0,u.t)(n,r[0],(0,a.D)(r[1],-1));if((0,a.o)(r[0]))return(0,u.t)(n,r[0].toArray(),(0,a.D)(r[1],-1));if((0,a.r)(r[0])){const e=await r[0].load(),u=await s(i.WhereClause.create(r[1],e.getFieldsIndex()),o,c);return r[0].calculateStatistic(n,u,(0,a.D)(r[2],1e3),t.abortSignal)}}else if(3===r.length&&(0,a.r)(r[0])){const e=await r[0].load(),u=await s(i.WhereClause.create(r[1],e.getFieldsIndex()),o,c);return r[0].calculateStatistic(n,u,(0,a.D)(r[2],1e3),t.abortSignal)}return(0,u.t)(n,r,-1)}async function s(n,t,e){const r=n.getVariables();if(r.length>0){const a=[];for(let n=0;n<r.length;n++){const u={name:r[n]};a.push(await t.evaluateIdentifier(e,u))}const u={};for(let n=0;n<r.length;n++)u[r[n]]=a[n];return n.parameters=u,n}return n}function o(n){"async"===n.mode&&(n.functions.stdev=function(t,e){return n.standardFunctionAsync(t,e,((e,r,a)=>c("stdev",e,r,a,t,n)))},n.functions.variance=function(t,e){return n.standardFunctionAsync(t,e,((e,r,a)=>c("variance",e,r,a,t,n)))},n.functions.average=function(t,e){return n.standardFunctionAsync(t,e,((e,r,a)=>c("mean",e,r,a,t,n)))},n.functions.mean=function(t,e){return n.standardFunctionAsync(t,e,((e,r,a)=>c("mean",e,r,a,t,n)))},n.functions.sum=function(t,e){return n.standardFunctionAsync(t,e,((e,r,a)=>c("sum",e,r,a,t,n)))},n.functions.min=function(t,e){return n.standardFunctionAsync(t,e,((e,r,a)=>c("min",e,r,a,t,n)))},n.functions.max=function(t,e){return n.standardFunctionAsync(t,e,((e,r,a)=>c("max",e,r,a,t,n)))},n.functions.count=function(t,e){return n.standardFunctionAsync(t,e,((n,u,i)=>{if((0,a.C)(i,1,1,t,e),(0,a.r)(i[0]))return i[0].count(n.abortSignal);if((0,a.m)(i[0])||(0,a.c)(i[0]))return i[0].length;if((0,a.o)(i[0]))return i[0].length();throw new r.D$(t,r.TX.InvalidParameter,e)}))})}}}]);
//# sourceMappingURL=6976.5bff8c96.js.map