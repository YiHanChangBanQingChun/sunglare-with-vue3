"use strict";(self["webpackChunksun_glare_project"]=self["webpackChunksun_glare_project"]||[]).push([[5774],{52727:function(e,t,r){r.d(t,{p:function(){return o}});r(44114),r(16573),r(78100),r(77936),r(37467),r(44732),r(79577),r(14603),r(47566),r(98721);var n,i,a=r(90185),s={exports:{}};s.exports,n=s,s.exports,i=function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}return r.m=e,r.c=t,r.p="",r(0)}([function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.isNotPNG=u,t.isNotAPNG=c,t.default=f;var n=a(r(1)),i=r(2);function a(e){return e&&e.__esModule?e:{default:e}}var s=new Error("Not a PNG"),o=new Error("Not an animated PNG");function u(e){return e===s}function c(e){return e===o}var l=new Uint8Array([137,80,78,71,13,10,26,10]);function f(e){var t=new Uint8Array(e);if(Array.prototype.some.call(l,(function(e,r){return e!==t[r]})))return s;var r=!1;if(h(t,(function(e){return!(r="acTL"===e)})),!r)return o;var n=[],a=[],u=null,c=null,f=0,d=new i.APNG;if(h(t,(function(e,t,r,s){var o=new DataView(t.buffer);switch(e){case"IHDR":u=t.subarray(r+8,r+8+s),d.width=o.getUint32(r+8),d.height=o.getUint32(r+12);break;case"acTL":d.numPlays=o.getUint32(r+8+4);break;case"fcTL":c&&(d.frames.push(c),f++),(c=new i.Frame).width=o.getUint32(r+8+4),c.height=o.getUint32(r+8+8),c.left=o.getUint32(r+8+12),c.top=o.getUint32(r+8+16);var l=o.getUint16(r+8+20),h=o.getUint16(r+8+22);0===h&&(h=100),c.delay=1e3*l/h,c.delay<=10&&(c.delay=100),d.playTime+=c.delay,c.disposeOp=o.getUint8(r+8+24),c.blendOp=o.getUint8(r+8+25),c.dataParts=[],0===f&&2===c.disposeOp&&(c.disposeOp=1);break;case"fdAT":c&&c.dataParts.push(t.subarray(r+8+4,r+8+s));break;case"IDAT":c&&c.dataParts.push(t.subarray(r+8,r+8+s));break;case"IEND":a.push(m(t,r,12+s));break;default:n.push(m(t,r,12+s))}})),c&&d.frames.push(c),0==d.frames.length)return o;var p=new Blob(n),y=new Blob(a);return d.frames.forEach((function(e){var t=[];t.push(l),u.set(g(e.width),0),u.set(g(e.height),4),t.push(v("IHDR",u)),t.push(p),e.dataParts.forEach((function(e){return t.push(v("IDAT",e))})),t.push(y),e.imageData=new Blob(t,{type:"image/png"}),delete e.dataParts,t=null})),d}function h(e,t){var r=new DataView(e.buffer),n=8,i=void 0,a=void 0,s=void 0;do{a=r.getUint32(n),s=t(i=d(e,n+4,4),e,n,a),n+=12+a}while(!1!==s&&"IEND"!=i&&n<e.length)}function d(e,t,r){var n=Array.prototype.slice.call(e.subarray(t,t+r));return String.fromCharCode.apply(String,n)}function p(e){for(var t=new Uint8Array(e.length),r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}function m(e,t,r){var n=new Uint8Array(r);return n.set(e.subarray(t,t+r)),n}var v=function(e,t){var r=e.length+t.length,i=new Uint8Array(r+8),a=new DataView(i.buffer);a.setUint32(0,t.length),i.set(p(e),4),i.set(t,8);var s=(0,n.default)(i,4,r);return a.setUint32(r+4,s),i},g=function(e){return new Uint8Array([e>>>24&255,e>>>16&255,e>>>8&255,255&e])}},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=-1,i=t,a=t+(arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.length-t);i<a;i++)n=n>>>8^r[255&(n^e[i])];return~n};for(var r=new Uint32Array(256),n=0;n<256;n++){for(var i=n,a=0;a<8;a++)i=0!=(1&i)?3988292384^i>>>1:i>>>1;r[n]=i}},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.Frame=t.APNG=void 0;var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=a(r(3));function a(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.APNG=function(){function e(){s(this,e),this.width=0,this.height=0,this.numPlays=0,this.playTime=0,this.frames=[]}return n(e,[{key:"createImages",value:function(){return Promise.all(this.frames.map((function(e){return e.createImage()})))}},{key:"getPlayer",value:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.createImages().then((function(){return new i.default(t,e,r)}))}}]),e}(),t.Frame=function(){function e(){s(this,e),this.left=0,this.top=0,this.width=0,this.height=0,this.delay=0,this.disposeOp=0,this.blendOp=0,this.imageData=null,this.imageElement=null}return n(e,[{key:"createImage",value:function(){var e=this;return this.imageElement?Promise.resolve():new Promise((function(t,r){var n=URL.createObjectURL(e.imageData);e.imageElement=document.createElement("img"),e.imageElement.onload=function(){URL.revokeObjectURL(n),t()},e.imageElement.onerror=function(){URL.revokeObjectURL(n),e.imageElement=null,r(new Error("Image creation error"))},e.imageElement.src=n}))}}]),e}()},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(e){function t(e,r,n){a(this,t);var i=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.playbackRate=1,i._currentFrameNumber=0,i._ended=!1,i._paused=!0,i._numPlays=0,i._apng=e,i.context=r,i.stop(),n&&i.play(),i}return o(t,e),n(t,[{key:"renderNextFrame",value:function(){this._currentFrameNumber=(this._currentFrameNumber+1)%this._apng.frames.length,this._currentFrameNumber===this._apng.frames.length-1&&(this._numPlays++,0!==this._apng.numPlays&&this._numPlays>=this._apng.numPlays&&(this._ended=!0,this._paused=!0)),this._prevFrame&&1==this._prevFrame.disposeOp?this.context.clearRect(this._prevFrame.left,this._prevFrame.top,this._prevFrame.width,this._prevFrame.height):this._prevFrame&&2==this._prevFrame.disposeOp&&this.context.putImageData(this._prevFrameData,this._prevFrame.left,this._prevFrame.top);var e=this.currentFrame;this._prevFrame=e,this._prevFrameData=null,2==e.disposeOp&&(this._prevFrameData=this.context.getImageData(e.left,e.top,e.width,e.height)),0==e.blendOp&&this.context.clearRect(e.left,e.top,e.width,e.height),this.context.drawImage(e.imageElement,e.left,e.top),this.emit("frame",this._currentFrameNumber),this._ended&&this.emit("end")}},{key:"play",value:function(){var e=this;this.emit("play"),this._ended&&this.stop(),this._paused=!1;var t=performance.now()+this.currentFrame.delay/this.playbackRate,r=function r(n){if(!e._ended&&!e._paused){if(n>=t){for(;n-t>=e._apng.playTime/e.playbackRate;)t+=e._apng.playTime/e.playbackRate,e._numPlays++;do{e.renderNextFrame(),t+=e.currentFrame.delay/e.playbackRate}while(!e._ended&&n>t)}requestAnimationFrame(r)}};requestAnimationFrame(r)}},{key:"pause",value:function(){this._paused||(this.emit("pause"),this._paused=!0)}},{key:"stop",value:function(){this.emit("stop"),this._numPlays=0,this._ended=!1,this._paused=!0,this._currentFrameNumber=-1,this.context.clearRect(0,0,this._apng.width,this._apng.height),this.renderNextFrame()}},{key:"currentFrameNumber",get:function(){return this._currentFrameNumber}},{key:"currentFrame",get:function(){return this._apng.frames[this._currentFrameNumber]}},{key:"paused",get:function(){return this._paused}},{key:"ended",get:function(){return this._ended}}]),t}(i(r(4)).default);t.default=u},function(e,t){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(e){return"function"==typeof e}function i(e){return"number"==typeof e}function a(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}e.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!i(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,r,i,o,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||a(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var l=new Error('Uncaught, unspecified "error" event. ('+t+")");throw l.context=t,l}if(s(r=this._events[e]))return!1;if(n(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:o=Array.prototype.slice.call(arguments,1),r.apply(this,o)}else if(a(r))for(o=Array.prototype.slice.call(arguments,1),i=(c=r.slice()).length,u=0;u<i;u++)c[u].apply(this,o);return!0},r.prototype.addListener=function(e,t){var i;if(!n(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,n(t.listener)?t.listener:t),this._events[e]?a(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,a(this._events[e])&&!this._events[e].warned&&(i=s(this._maxListeners)?r.defaultMaxListeners:this._maxListeners)&&i>0&&this._events[e].length>i&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){if(!n(t))throw TypeError("listener must be a function");var r=!1;function i(){this.removeListener(e,i),r||(r=!0,t.apply(this,arguments))}return i.listener=t,this.on(e,i),this},r.prototype.removeListener=function(e,t){var r,i,s,o;if(!n(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(s=(r=this._events[e]).length,i=-1,r===t||n(r.listener)&&r.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(a(r)){for(o=s;o-- >0;)if(r[o]===t||r[o].listener&&r[o].listener===t){i=o;break}if(i<0)return this;1===r.length?(r.length=0,delete this._events[e]):r.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n(r=this._events[e]))this.removeListener(e,r);else if(r)for(;r.length;)this.removeListener(e,r[r.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){return this._events&&this._events[e]?n(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(n(t))return 1;if(t)return t.length}return 0},r.listenerCount=function(e,t){return e.listenerCount(t)}}])},n.exports=i();const o=(0,a.g)(s.exports)},46656:function(e,t,r){r.d(t,{d:function(){return A},p:function(){return T}});r(44114),r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var n={},i={},a={};Object.defineProperty(a,"__esModule",{value:!0}),a.loop=a.conditional=a.parse=void 0;var s=function e(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:n;if(Array.isArray(r))r.forEach((function(r){return e(t,r,n,i)}));else if("function"==typeof r)r(t,n,i,e);else{var a=Object.keys(r)[0];Array.isArray(r[a])?(i[a]={},e(t,r[a],n,i[a])):i[a]=r[a](t,n,i,e)}return n};a.parse=s;var o=function(e,t){return function(r,n,i,a){t(r,n,i)&&a(r,e,n,i)}};a.conditional=o;var u=function(e,t){return function(r,n,i,a){for(var s=[],o=r.pos;t(r,n,i);){var u={};if(a(r,e,n,u),r.pos===o)break;o=r.pos,s.push(u)}return s}};a.loop=u;var c={};Object.defineProperty(c,"__esModule",{value:!0}),c.readBits=c.readArray=c.readUnsigned=c.readString=c.peekBytes=c.readBytes=c.peekByte=c.readByte=c.buildStream=void 0;var l=function(e){return{data:e,pos:0}};c.buildStream=l;var f=function(){return function(e){return e.data[e.pos++]}};c.readByte=f;var h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return function(t){return t.data[t.pos+e]}};c.peekByte=h;var d=function(e){return function(t){return t.data.subarray(t.pos,t.pos+=e)}};c.readBytes=d;var p=function(e){return function(t){return t.data.subarray(t.pos,t.pos+e)}};c.peekBytes=p;var m=function(e){return function(t){return Array.from(d(e)(t)).map((function(e){return String.fromCharCode(e)})).join("")}};c.readString=m;var v=function(e){return function(t){var r=d(2)(t);return e?(r[1]<<8)+r[0]:(r[0]<<8)+r[1]}};c.readUnsigned=v;var g=function(e,t){return function(r,n,i){for(var a="function"==typeof t?t(r,n,i):t,s=d(e),o=new Array(a),u=0;u<a;u++)o[u]=s(r);return o}};c.readArray=g;var y=function(e,t,r){for(var n=0,i=0;i<r;i++)n+=e[t+i]&&Math.pow(2,r-i-1);return n},_=function(e){return function(t){for(var r=f()(t),n=new Array(8),i=0;i<8;i++)n[7-i]=!!(r&1<<i);return Object.keys(e).reduce((function(t,r){var i=e[r];return i.length?t[r]=y(n,i.index,i.length):t[r]=n[i.index],t}),{})}};c.readBits=_,function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=a,r=c,n={blocks:function(e){for(var t=0,n=[],i=e.data.length,a=0,s=(0,r.readByte)()(e);s!==t&&s;s=(0,r.readByte)()(e)){if(e.pos+s>=i){var o=i-e.pos;n.push((0,r.readBytes)(o)(e)),a+=o;break}n.push((0,r.readBytes)(s)(e)),a+=s}for(var u=new Uint8Array(a),c=0,l=0;l<n.length;l++)u.set(n[l],c),c+=n[l].length;return u}},i=(0,t.conditional)({gce:[{codes:(0,r.readBytes)(2)},{byteSize:(0,r.readByte)()},{extras:(0,r.readBits)({future:{index:0,length:3},disposal:{index:3,length:3},userInput:{index:6},transparentColorGiven:{index:7}})},{delay:(0,r.readUnsigned)(!0)},{transparentColorIndex:(0,r.readByte)()},{terminator:(0,r.readByte)()}]},(function(e){var t=(0,r.peekBytes)(2)(e);return 33===t[0]&&249===t[1]})),s=(0,t.conditional)({image:[{code:(0,r.readByte)()},{descriptor:[{left:(0,r.readUnsigned)(!0)},{top:(0,r.readUnsigned)(!0)},{width:(0,r.readUnsigned)(!0)},{height:(0,r.readUnsigned)(!0)},{lct:(0,r.readBits)({exists:{index:0},interlaced:{index:1},sort:{index:2},future:{index:3,length:2},size:{index:5,length:3}})}]},(0,t.conditional)({lct:(0,r.readArray)(3,(function(e,t,r){return Math.pow(2,r.descriptor.lct.size+1)}))},(function(e,t,r){return r.descriptor.lct.exists})),{data:[{minCodeSize:(0,r.readByte)()},n]}]},(function(e){return 44===(0,r.peekByte)()(e)})),o=(0,t.conditional)({text:[{codes:(0,r.readBytes)(2)},{blockSize:(0,r.readByte)()},{preData:function(e,t,n){return(0,r.readBytes)(n.text.blockSize)(e)}},n]},(function(e){var t=(0,r.peekBytes)(2)(e);return 33===t[0]&&1===t[1]})),u=(0,t.conditional)({application:[{codes:(0,r.readBytes)(2)},{blockSize:(0,r.readByte)()},{id:function(e,t,n){return(0,r.readString)(n.blockSize)(e)}},n]},(function(e){var t=(0,r.peekBytes)(2)(e);return 33===t[0]&&255===t[1]})),l=(0,t.conditional)({comment:[{codes:(0,r.readBytes)(2)},n]},(function(e){var t=(0,r.peekBytes)(2)(e);return 33===t[0]&&254===t[1]})),f=[{header:[{signature:(0,r.readString)(3)},{version:(0,r.readString)(3)}]},{lsd:[{width:(0,r.readUnsigned)(!0)},{height:(0,r.readUnsigned)(!0)},{gct:(0,r.readBits)({exists:{index:0},resolution:{index:1,length:3},sort:{index:4},size:{index:5,length:3}})},{backgroundColorIndex:(0,r.readByte)()},{pixelAspectRatio:(0,r.readByte)()}]},(0,t.conditional)({gct:(0,r.readArray)(3,(function(e,t){return Math.pow(2,t.lsd.gct.size+1)}))},(function(e,t){return t.lsd.gct.exists})),{frames:(0,t.loop)([i,u,l,s,o],(function(e){var t=(0,r.peekByte)()(e);return 33===t||44===t}))}];e.default=f}(i);var w={};Object.defineProperty(w,"__esModule",{value:!0}),w.deinterlace=void 0;var b=function(e,t){for(var r=new Array(e.length),n=e.length/t,i=function(n,i){var a=e.slice(i*t,(i+1)*t);r.splice.apply(r,[n*t,t].concat(a))},a=[0,4,2,1],s=[8,8,4,2],o=0,u=0;u<4;u++)for(var c=a[u];c<n;c+=s[u])i(c,o),o++;return r};w.deinterlace=b;var x={};Object.defineProperty(x,"__esModule",{value:!0}),x.lzw=void 0;var k=function(e,t,r){var n,i,a,s,o,u,c,l,f,h,d,p,m,v,g,y,_=4096,w=-1,b=r,x=new Array(r),k=new Array(_),A=new Array(_),F=new Array(_+1);for(o=1+(i=1<<(h=e)),n=i+2,c=w,a=(1<<(s=h+1))-1,l=0;l<i;l++)k[l]=0,A[l]=l;for(d=p=m=v=g=y=0,f=0;f<b;){if(0===v){if(p<s){d+=t[y]<<p,p+=8,y++;continue}if(l=d&a,d>>=s,p-=s,l>n||l==o)break;if(l==i){a=(1<<(s=h+1))-1,n=i+2,c=w;continue}if(c==w){F[v++]=A[l],c=l,m=l;continue}for(u=l,l==n&&(F[v++]=m,l=c);l>i;)F[v++]=A[l],l=k[l];m=255&A[l],F[v++]=m,n<_&&(k[n]=c,A[n]=m,0==(++n&a)&&n<_&&(s++,a+=n)),c=u}v--,x[g++]=F[v],f++}for(f=g;f<b;f++)x[f]=0;return x};x.lzw=k,Object.defineProperty(n,"__esModule",{value:!0});var A=n.decompressFrames=n.decompressFrame=T=n.parseGIF=void 0,F=M(i),S=a,U=c,C=w,P=x;function M(e){return e&&e.__esModule?e:{default:e}}var B=function(e){var t=new Uint8Array(e);return(0,S.parse)((0,U.buildStream)(t),F.default)},T=n.parseGIF=B,L=function(e){for(var t=e.pixels.length,r=new Uint8ClampedArray(4*t),n=0;n<t;n++){var i=4*n,a=e.pixels[n],s=e.colorTable[a]||[0,0,0];r[i]=s[0],r[i+1]=s[1],r[i+2]=s[2],r[i+3]=a!==e.transparentIndex?255:0}return r},z=function(e,t,r){if(e.image){var n=e.image,i=n.descriptor.width*n.descriptor.height,a=(0,P.lzw)(n.data.minCodeSize,n.data.blocks,i);n.descriptor.lct.interlaced&&(a=(0,C.deinterlace)(a,n.descriptor.width));var s={pixels:a,dims:{top:e.image.descriptor.top,left:e.image.descriptor.left,width:e.image.descriptor.width,height:e.image.descriptor.height}};return n.descriptor.lct&&n.descriptor.lct.exists?s.colorTable=n.lct:s.colorTable=t,e.gce&&(s.delay=10*(e.gce.delay||10),s.disposalType=e.gce.extras.disposal,e.gce.extras.transparentColorGiven&&(s.transparentIndex=e.gce.transparentColorIndex)),r&&(s.patch=L(s)),s}console.warn("gif frame does not have associated image.")};n.decompressFrame=z;var I=function(e,t){return e.frames.filter((function(e){return e.image})).map((function(r){return z(r,e.gct,t)}))};A=n.decompressFrames=I},64507:function(e,t,r){r.d(t,{NH:function(){return a},ip:function(){return s},pR:function(){return u},sU:function(){return c},vG:function(){return l}});r(44114),r(16573),r(78100),r(77936),r(37467),r(44732),r(79577),r(64979),r(51020);var n=r(47966),i=r(4244);function a(e){const t=u(e);return null!=t?t.toDataURL():""}async function s(e){const t=u(e);if(null==t)throw new n.A("imageToArrayBuffer","Unsupported image type");const r=await o(e),i=await new Promise((e=>t.toBlob(e,r)));if(!i)throw new n.A("imageToArrayBuffer","Failed to encode image");return{data:await i.arrayBuffer(),type:r}}async function o(e){if(!(e instanceof HTMLImageElement))return"image/png";const t=e.src;if((0,i.DB)(t)){const e=(0,i.r$)(t);return"image/jpeg"===e?.mediaType?e.mediaType:"image/png"}return/\.png$/i.test(t)?"image/png":/\.(jpg|jpeg)$/i.test(t)?"image/jpeg":"image/png"}function u(e){if(e instanceof HTMLCanvasElement)return e;if(e instanceof HTMLVideoElement)return null;const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");return e instanceof HTMLImageElement?r.drawImage(e,0,0,e.width,e.height):e instanceof ImageData&&r.putImageData(e,0,0),t}function c(e){const t=[],r=new Uint8Array(e);for(let n=0;n<r.length;n++)t.push(String.fromCharCode(r[n]));return"data:application/octet-stream;base64,"+btoa(t.join(""))}function l(e){if(e.byteLength<8)return!1;const t=new Uint8Array(e);return 137===t[0]&&80===t[1]&&78===t[2]&&71===t[3]&&13===t[4]&&10===t[5]&&26===t[6]&&10===t[7]}},95551:function(e,t,r){r.d(t,{A:function(){return l}});r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var n=r(26011),i=r(75423),a=r(42937),s=r(46132),o=r(68683),u=r(95049);const c=512;class l{constructor(e){this._resourceManager=e,this._rasterizationCanvas=null}dispose(){this._rasterizationCanvas=null}rasterizeJSONResource(e,t,r){if(this._rasterizationCanvas||(this._rasterizationCanvas=document.createElement("canvas")),"simple-fill"===e.type||"esriSFS"===e.type){const[r,i,s]=(0,a.r)(this._rasterizationCanvas,e.style,t);return{size:[i,s],image:new Uint32Array(r.buffer),sdf:!1,simplePattern:!0,anchorX:0,anchorY:0,rasterizationScale:(0,n.yR)(Math.ceil(t))}}if("simple-line"===e.type||"esriSLS"===e.type||"line"===e.type&&e.dashTemplate){let t,r;if("simple-line"===e.type||"esriSLS"===e.type)switch(t=(0,i.BW)(e.style,e.cap),e.cap){case"butt":r="Butt";break;case"square":r="Square";break;default:r="Round"}else t=e.dashTemplate,r=e.cim.capStyle;const[n,s,o]=(0,a.k)(t,r);return{size:[s,o],image:new Uint32Array(n.buffer),sdf:!0,simplePattern:!0,anchorX:0,anchorY:0}}let u,c=null,l=null,f=1;if("simple-marker"===e.type||"esriSMS"===e.type||"line-marker"===e.type?(u=i.wp.fromSimpleMarker(e),l=(0,o.eR)(u)):e.cim&&"CIMHatchFill"===e.cim.type?(u=i.wp.fromCIMHatchFill(e.cim,t),c=new s.A(u.frame.xmin,-u.frame.ymax,u.frame.xmax-u.frame.xmin,u.frame.ymax-u.frame.ymin),f=t):e.cim.markerPlacement&&"CIMMarkerPlacementInsidePolygon"===e.cim.markerPlacement.type?(u=i.wp.fromCIMInsidePolygon(e.cim),c=new s.A(u.frame.xmin,-u.frame.ymax,u.frame.xmax-u.frame.xmin,u.frame.ymax-u.frame.ymin)):(u=e.cim,e.avoidSDFRasterization||(l=(0,o.eR)(u))),l&&!r){const[e,t,r]=(0,o.ce)(l);return e?{size:[t,r],image:new Uint32Array(e.buffer),sdf:!0,simplePattern:!0,anchorX:0,anchorY:0,rasterizationScale:f}:null}const[h,d,p,m,v]=i.wp.rasterize(this._rasterizationCanvas,u,c,this._resourceManager,!r);return h?{size:[d,p],image:new Uint32Array(h.buffer),sdf:!1,simplePattern:!1,anchorX:m,anchorY:v}:null}rasterizeImageResource(e,t,r,n){this._rasterizationCanvas||(this._rasterizationCanvas=document.createElement("canvas")),this._rasterizationCanvas.width=e,this._rasterizationCanvas.height=t;const i=this._rasterizationCanvas.getContext("2d");r instanceof ImageData?i.putImageData(r,0,0):(r.setAttribute("width",`${e}px`),r.setAttribute("height",`${t}px`),i.drawImage(r,0,0,e,t));const a=i.getImageData(0,0,e,t),s=new Uint8Array(a.data);if(n)for(const u of n)if(u&&u.oldColor&&4===u.oldColor.length&&u.newColor&&4===u.newColor.length){const[e,t,r,n]=u.oldColor,[i,a,o,c]=u.newColor;if(e===i&&t===a&&r===o&&n===c)continue;for(let u=0;u<s.length;u+=4)e===s[u]&&t===s[u+1]&&r===s[u+2]&&n===s[u+3]&&(s[u]=i,s[u+1]=a,s[u+2]=o,s[u+3]=c)}let o;for(let u=0;u<s.length;u+=4)o=s[u+3]/255,s[u]=s[u]*o,s[u+1]=s[u+1]*o,s[u+2]=s[u+2]*o;let l=s,f=e,h=t;const d=c;if(f>=d||h>=d){const r=f/h;r>1?(f=d,h=Math.round(d/r)):(h=d,f=Math.round(d*r)),l=new Uint8Array(4*f*h);const n=new Uint8ClampedArray(l.buffer);(0,u.Go)(s,e,t,n,f,h,!1)}return{size:[f,h],image:new Uint32Array(l.buffer),sdf:!1,simplePattern:!1,anchorX:0,anchorY:0}}}},42937:function(e,t,r){r.d(t,{k:function(){return o},r:function(){return s}});r(16573),r(78100),r(77936),r(37467),r(44732),r(79577);var n=r(94792),i=r(26011);const a=e=>"vertical"===e||"horizontal"===e||"cross"===e||"esriSFSCross"===e||"esriSFSVertical"===e||"esriSFSHorizontal"===e;function s(e,t,r){const n=(0,i.yR)(Math.ceil(r)),s=a(t)?8*n:16*n,o=2*n;e.width=s,e.height=s;const u=e.getContext("2d");u.strokeStyle="#FFFFFF",u.lineWidth=n,u.beginPath(),"vertical"!==t&&"cross"!==t&&"esriSFSCross"!==t&&"esriSFSVertical"!==t||(u.moveTo(s/2,-o),u.lineTo(s/2,s+o)),"horizontal"!==t&&"cross"!==t&&"esriSFSCross"!==t&&"esriSFSHorizontal"!==t||(u.moveTo(-o,s/2),u.lineTo(s+o,s/2)),"forward-diagonal"!==t&&"diagonal-cross"!==t&&"esriSFSDiagonalCross"!==t&&"esriSFSForwardDiagonal"!==t||(u.moveTo(-o,-o),u.lineTo(s+o,s+o),u.moveTo(s-o,-o),u.lineTo(s+o,o),u.moveTo(-o,s-o),u.lineTo(o,s+o)),"backward-diagonal"!==t&&"diagonal-cross"!==t&&"esriSFSBackwardDiagonal"!==t&&"esriSFSDiagonalCross"!==t||(u.moveTo(s+o,-o),u.lineTo(-o,s+o),u.moveTo(o,-o),u.lineTo(-o,o),u.moveTo(s+o,s-o),u.lineTo(s-o,s+o)),u.stroke();const c=u.getImageData(0,0,e.width,e.height),l=new Uint8Array(c.data);let f;for(let i=0;i<l.length;i+=4)f=l[i+3]/255,l[i]=l[i]*f,l[i+1]=l[i+1]*f,l[i+2]=l[i+2]*f;return[l,e.width,e.height]}function o(e,t){const r="Butt"===t,i="Square"===t,a=!r&&!i;e.length%2==1&&(e=[...e,...e]);const s=15.5,o=2*s;let u=0;for(const n of e)u+=n;const c=Math.round(u*s),l=new Float32Array(c*o),f=.5*s;let h=0,d=0,p=.5,m=!0;for(const n of e){for(h=d,d+=n*s;p<=d;){let e=.5;for(;e<o;){const t=(e-.5)*c+p-.5,n=a?(e-s)*(e-s):Math.abs(e-s);l[t]=m?r?Math.max(Math.max(h+f-p,n),Math.max(p-d+f,n)):n:a?Math.min((p-h)*(p-h)+n,(p-d)*(p-d)+n):i?Math.min(Math.max(p-h,n),Math.max(d-p,n)):Math.min(Math.max(p-h+f,n),Math.max(d+f-p,n)),e++}p++}m=!m}const v=l.length,g=new Uint8Array(4*v);for(let y=0;y<v;++y){const e=(a?Math.sqrt(l[y]):l[y])/s;(0,n.U)(e,g,4*y)}return[g,c,o]}}}]);
//# sourceMappingURL=5774.871b3c96.js.map