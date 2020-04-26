(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{439:function(e,t,n){(function(){var e,n,o,r,c={}.hasOwnProperty,l=[].slice;e={LF:"\n",NULL:"\0"},o=function(){var t;function n(e,t,body){this.command=e,this.headers=null!=t?t:{},this.body=null!=body?body:""}return n.prototype.toString=function(){var t,o,r,l,d;for(o in t=[this.command],(r=!1===this.headers["content-length"])&&delete this.headers["content-length"],d=this.headers)c.call(d,o)&&(l=d[o],t.push(o+":"+l));return this.body&&!r&&t.push("content-length:"+n.sizeOfUTF8(this.body)),t.push(e.LF+this.body),t.join(e.LF)},n.sizeOfUTF8=function(s){return s?encodeURI(s).match(/%..|./g).length:0},t=function(data){var body,t,o,r,c,l,i,d,h,line,f,v,m,S,y,k,w;for(r=data.search(RegExp(""+e.LF+e.LF)),o=(c=data.substring(0,r).split(e.LF)).shift(),l={},v=function(e){return e.replace(/^\s+|\s+$/g,"")},m=0,y=(k=c.reverse()).length;m<y;m++)d=(line=k[m]).indexOf(":"),l[v(line.substring(0,d))]=v(line.substring(d+1));if(body="",f=r+2,l["content-length"])h=parseInt(l["content-length"]),body=(""+data).substring(f,f+h);else for(t=null,i=S=f,w=data.length;(f<=w?S<w:S>w)&&(t=data.charAt(i))!==e.NULL;i=f<=w?++S:--S)body+=t;return new n(o,l,body)},n.unmarshall=function(n){var data;return function(){var o,r,c,l;for(l=[],o=0,r=(c=n.split(RegExp(""+e.NULL+e.LF+"*"))).length;o<r;o++)(null!=(data=c[o])?data.length:void 0)>0&&l.push(t(data));return l}()},n.marshall=function(t,o,body){return new n(t,o,body).toString()+e.NULL},n}(),n=function(){var t;function n(e){this.ws=e,this.ws.binaryType="arraybuffer",this.counter=0,this.connected=!1,this.heartbeat={outgoing:1e4,incoming:1e4},this.maxWebSocketFrameSize=16384,this.subscriptions={}}return n.prototype.debug=function(e){var t;return"undefined"!=typeof window&&null!==window&&null!=(t=window.console)?t.log(e):void 0},t=function(){return Date.now?Date.now():(new Date).valueOf},n.prototype._transmit=function(e,t,body){var n;for(n=o.marshall(e,t,body),"function"==typeof this.debug&&this.debug(">>> "+n);;){if(!(n.length>this.maxWebSocketFrameSize))return this.ws.send(n);this.ws.send(n.substring(0,this.maxWebSocketFrameSize)),n=n.substring(this.maxWebSocketFrameSize),"function"==typeof this.debug&&this.debug("remaining = "+n.length)}},n.prototype._setupHeartbeat=function(n){var o,c,l,d,h,f,v;if((h=n.version)===r.VERSIONS.V1_1||h===r.VERSIONS.V1_2)return c=(f=function(){var e,t,o,r;for(r=[],e=0,t=(o=n["heart-beat"].split(",")).length;e<t;e++)d=o[e],r.push(parseInt(d));return r}())[0],o=f[1],0!==this.heartbeat.outgoing&&0!==o&&(l=Math.max(this.heartbeat.outgoing,o),"function"==typeof this.debug&&this.debug("send PING every "+l+"ms"),this.pinger=r.setInterval(l,(v=this,function(){return v.ws.send(e.LF),"function"==typeof v.debug?v.debug(">>> PING"):void 0}))),0!==this.heartbeat.incoming&&0!==c?(l=Math.max(this.heartbeat.incoming,c),"function"==typeof this.debug&&this.debug("check PONG every "+l+"ms"),this.ponger=r.setInterval(l,function(e){return function(){var n;if((n=t()-e.serverActivity)>2*l)return"function"==typeof e.debug&&e.debug("did not receive server activity for the last "+n+"ms"),e.ws.close()}}(this))):void 0},n.prototype._parseConnect=function(){var e,t,n,o;switch(o={},(e=1<=arguments.length?l.call(arguments,0):[]).length){case 2:o=e[0],t=e[1];break;case 3:e[1]instanceof Function?(o=e[0],t=e[1],n=e[2]):(o.login=e[0],o.passcode=e[1],t=e[2]);break;case 4:o.login=e[0],o.passcode=e[1],t=e[2],n=e[3];break;default:o.login=e[0],o.passcode=e[1],t=e[2],n=e[3],o.host=e[4]}return[o,t,n]},n.prototype.connect=function(){var n,c,d,h,f;return n=1<=arguments.length?l.call(arguments,0):[],h=this._parseConnect.apply(this,n),d=h[0],this.connectCallback=h[1],c=h[2],"function"==typeof this.debug&&this.debug("Opening Web Socket..."),this.ws.onmessage=(f=this,function(n){var r,l,d,data,h,v,m,S,y,k,w,C;if(data="undefined"!=typeof ArrayBuffer&&n.data instanceof ArrayBuffer?(r=new Uint8Array(n.data),"function"==typeof f.debug&&f.debug("--- got data length: "+r.length),function(){var e,t,n;for(n=[],e=0,t=r.length;e<t;e++)l=r[e],n.push(String.fromCharCode(l));return n}().join("")):n.data,f.serverActivity=t(),data!==e.LF){for("function"==typeof f.debug&&f.debug("<<< "+data),C=[],y=0,k=(w=o.unmarshall(data)).length;y<k;y++)switch((h=w[y]).command){case"CONNECTED":"function"==typeof f.debug&&f.debug("connected to server "+h.headers.server),f.connected=!0,f._setupHeartbeat(h.headers),C.push("function"==typeof f.connectCallback?f.connectCallback(h):void 0);break;case"MESSAGE":S=h.headers.subscription,(m=f.subscriptions[S]||f.onreceive)?(d=f,v=h.headers["message-id"],h.ack=function(e){return null==e&&(e={}),d.ack(v,S,e)},h.nack=function(e){return null==e&&(e={}),d.nack(v,S,e)},C.push(m(h))):C.push("function"==typeof f.debug?f.debug("Unhandled received MESSAGE: "+h):void 0);break;case"RECEIPT":C.push("function"==typeof f.onreceipt?f.onreceipt(h):void 0);break;case"ERROR":C.push("function"==typeof c?c(h):void 0);break;default:C.push("function"==typeof f.debug?f.debug("Unhandled frame: "+h):void 0)}return C}"function"==typeof f.debug&&f.debug("<<< PONG")}),this.ws.onclose=function(e){return function(){var t;return t="Whoops! Lost connection to "+e.ws.url,"function"==typeof e.debug&&e.debug(t),e._cleanUp(),"function"==typeof c?c(t):void 0}}(this),this.ws.onopen=function(e){return function(){return"function"==typeof e.debug&&e.debug("Web Socket Opened..."),d["accept-version"]=r.VERSIONS.supportedVersions(),d["heart-beat"]=[e.heartbeat.outgoing,e.heartbeat.incoming].join(","),e._transmit("CONNECT",d)}}(this)},n.prototype.disconnect=function(e,t){return null==t&&(t={}),this._transmit("DISCONNECT",t),this.ws.onclose=null,this.ws.close(),this._cleanUp(),"function"==typeof e?e():void 0},n.prototype._cleanUp=function(){if(this.connected=!1,this.pinger&&r.clearInterval(this.pinger),this.ponger)return r.clearInterval(this.ponger)},n.prototype.send=function(e,t,body){return null==t&&(t={}),null==body&&(body=""),t.destination=e,this._transmit("SEND",t,body)},n.prototype.subscribe=function(e,t,n){var o;return null==n&&(n={}),n.id||(n.id="sub-"+this.counter++),n.destination=e,this.subscriptions[n.id]=t,this._transmit("SUBSCRIBE",n),o=this,{id:n.id,unsubscribe:function(){return o.unsubscribe(n.id)}}},n.prototype.unsubscribe=function(e){return delete this.subscriptions[e],this._transmit("UNSUBSCRIBE",{id:e})},n.prototype.begin=function(e){var t,n;return n=e||"tx-"+this.counter++,this._transmit("BEGIN",{transaction:n}),t=this,{id:n,commit:function(){return t.commit(n)},abort:function(){return t.abort(n)}}},n.prototype.commit=function(e){return this._transmit("COMMIT",{transaction:e})},n.prototype.abort=function(e){return this._transmit("ABORT",{transaction:e})},n.prototype.ack=function(e,t,n){return null==n&&(n={}),n["message-id"]=e,n.subscription=t,this._transmit("ACK",n)},n.prototype.nack=function(e,t,n){return null==n&&(n={}),n["message-id"]=e,n.subscription=t,this._transmit("NACK",n)},n}(),r={VERSIONS:{V1_0:"1.0",V1_1:"1.1",V1_2:"1.2",supportedVersions:function(){return"1.1,1.0"}},client:function(e,t){var o;return null==t&&(t=["v10.stomp","v11.stomp"]),o=new(r.WebSocketClass||WebSocket)(e,t),new n(o)},over:function(e){return new n(e)},Frame:o},null!==t&&(t.Stomp=r),"undefined"!=typeof window&&null!==window?(r.setInterval=function(e,t){return window.setInterval(t,e)},r.clearInterval=function(e){return window.clearInterval(e)},window.Stomp=r):t||(self.Stomp=r)}).call(this)},440:function(e,t,n){(function(e){var t=n(440);for(k in t)e[k]=t[k]}).call(this,n(14))},445:function(e,t,n){var o=n(439),r=n(448);e.exports=o.Stomp,e.exports.overTCP=r.overTCP,e.exports.overWS=r.overWS},448:function(e,t,n){(function(){var e,o,r,c,l,d;e=n(439),o=n(440),e.Stomp.setInterval=function(e,t){return setInterval(t,e)},e.Stomp.clearInterval=function(e){return clearInterval(e)},l=function(e,t){var n,r;return n=null,r={url:"tcp:// "+t+":"+e,send:function(e){return n.write(e)},close:function(){return n.end()}},(n=o.connect(e,t,(function(e){return r.onopen()}))).on("error",(function(e){return"function"==typeof r.onclose?r.onclose(e):void 0})),n.on("close",(function(e){return"function"==typeof r.onclose?r.onclose(e):void 0})),n.on("data",(function(data){var e;return e={data:data.toString()},r.onmessage(e)})),r},d=function(e){var t,o,r,c;return t=n(449).client,o=null,c={url:e,send:function(e){return o.sendUTF(e)},close:function(){return o.close()}},(r=new t).on("connect",(function(e){return o=e,c.onopen(),o.on("error",(function(e){return"function"==typeof c.onclose?c.onclose(e):void 0})),o.on("close",(function(){return"function"==typeof c.onclose?c.onclose():void 0})),o.on("message",(function(e){var t;if("utf8"===e.type)return t={data:e.utf8Data},c.onmessage(t)}))})),r.connect(e),c},r=function(t,n){var o;return o=l(n,t),e.Stomp.over(o)},c=function(t){var n;return n=d(t),e.Stomp.over(n)},t.overTCP=r,t.overWS=c}).call(this)},449:function(e,t,n){var o;try{o=n(450)}catch(e){}finally{if(o||"undefined"==typeof window||(o=window),!o)throw new Error("Could not determine global this")}var r=o.WebSocket||o.MozWebSocket,c=n(451);function l(e,t){return t?new r(e,t):new r(e)}r&&["CONNECTING","OPEN","CLOSING","CLOSED"].forEach((function(e){Object.defineProperty(l,e,{get:function(){return r[e]}})})),e.exports={w3cwebsocket:r?l:null,version:c}},450:function(e,t){var n=function(){if("object"==typeof self&&self)return self;if("object"==typeof window&&window)return window;throw new Error("Unable to resolve global `this`")};e.exports=function(){if(this)return this;if("object"==typeof globalThis&&globalThis)return globalThis;try{Object.defineProperty(Object.prototype,"__global__",{get:function(){return this},configurable:!0})}catch(e){return n()}try{return __global__||n()}finally{delete Object.prototype.__global__}}()},451:function(e,t,n){e.exports=n(452).version},452:function(e){e.exports=JSON.parse('{"_args":[["websocket@1.0.31","E:\\\\前端学习\\\\前端项目\\\\celestyles-front-end\\\\cele-live"]],"_from":"websocket@1.0.31","_id":"websocket@1.0.31","_inBundle":false,"_integrity":"sha512-VAouplvGKPiKFDTeCCO65vYHsyay8DqoBSlzIO3fayrfOgU94lQN5a1uWVnFrMLceTJw/+fQXR5PGbUVRaHshQ==","_location":"/websocket","_optional":true,"_phantomChildren":{"ms":"2.0.0"},"_requested":{"type":"version","registry":true,"raw":"websocket@1.0.31","name":"websocket","escapedName":"websocket","rawSpec":"1.0.31","saveSpec":null,"fetchSpec":"1.0.31"},"_requiredBy":["/stompjs"],"_resolved":"https://registry.npmjs.org/websocket/-/websocket-1.0.31.tgz","_spec":"1.0.31","_where":"E:\\\\前端学习\\\\前端项目\\\\celestyles-front-end\\\\cele-live","author":{"name":"Brian McKelvey","email":"theturtle32@gmail.com","url":"https://github.com/theturtle32"},"browser":"lib/browser.js","bugs":{"url":"https://github.com/theturtle32/WebSocket-Node/issues"},"config":{"verbose":false},"contributors":[{"name":"Iñaki Baz Castillo","email":"ibc@aliax.net","url":"http://dev.sipdoc.net"}],"dependencies":{"debug":"^2.2.0","es5-ext":"^0.10.50","nan":"^2.14.0","typedarray-to-buffer":"^3.1.5","yaeti":"^0.0.6"},"description":"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.","devDependencies":{"buffer-equal":"^1.0.0","faucet":"^0.0.1","gulp":"^4.0.2","gulp-jshint":"^2.0.4","jshint":"^2.0.0","jshint-stylish":"^2.2.1","tape":"^4.9.1"},"directories":{"lib":"./lib"},"engines":{"node":">=0.10.0"},"homepage":"https://github.com/theturtle32/WebSocket-Node","keywords":["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],"license":"Apache-2.0","main":"index","name":"websocket","repository":{"type":"git","url":"git+https://github.com/theturtle32/WebSocket-Node.git"},"scripts":{"gulp":"gulp","install":"(node-gyp rebuild 2> builderror.log) || (exit 0)","test":"faucet test/unit"},"version":"1.0.31"}')},453:function(e,t,n){var content=n(509);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(49).default)("31b7895c",content,!0,{sourceMap:!1})},508:function(e,t,n){"use strict";var o=n(453);n.n(o).a},509:function(e,t,n){(t=n(48)(!1)).push([e.i,"#video-box[data-v-2d2cada4]{padding:50px}",""]),e.exports=t},588:function(e,t,n){"use strict";n.r(t);n(51);var o=n(445),r=n.n(o),c={name:"videoPage",data:function(){return{isCaller:!1,toVideoUserId:"",localUserId:"",localOpenId:"",localAvatar:"",localNickname:"",localVideo:"",remoteVideo:"",audioInputSelect:"",audioOutputSelect:"",videoSelect:"",selectors:"",localStream:"",localVideoSender:"",localAudioSender:"",remoteStream:"",peerConnection:{},peerConnectionConfig:{iceServers:[{urls:"stun:stun.stunprotocol.org:3478"},{urls:"stun:stun.l.google.com:19302"},{urls:"turn:192.168.1.11",username:"ninefingers",credential:"youhavetoberealistic"}]},stompClient:{},privateClient:{}}},props:[],watch:{},computed:{},methods:{pageReady:function(){this.toVideoUserId=localStorage.toVideoUserId,this.localUserId=localStorage.userId,this.localOpenId=localStorage.openId,this.localAvatar=localStorage.avatar,this.localNickname=localStorage.nickname,this.localVideo=document.getElementById("localVideo"),this.remoteVideo=document.getElementById("remoteVideo"),this.audioInputSelect=document.querySelector("select#audioSource"),this.audioOutputSelect=document.querySelector("select#audioOutput"),this.videoSelect=document.querySelector("select#videoSource"),this.selectors=[this.audioInputSelect,this.audioOutputSelect,this.videoSelect],this.audioOutputSelect.disabled=!("sinkId"in HTMLMediaElement.prototype),navigator.mediaDevices.enumerateDevices().then(this.gotDevices).catch(this.handleError),this.audioInputSelect.onchange=this.start(),this.audioOutputSelect.onchange=this.attachSinkId(this.remoteVideo,this.audioOutputSelect.value),this.videoSelect.onchange=this.start(),this.start()},start:function(){var e=this.audioInputSelect.value,t=this.videoSelect.value,n={audio:{deviceId:e?{exact:e}:void 0},video:{deviceId:t?{exact:t}:void 0}};navigator.mediaDevices.getUserMedia(n).then(this.gotLocalMedia).then(this.gotDevices).catch(this.handleError)},gotDevices:function(e){var t=this.selectors.map((function(select){return select.value}));this.selectors.forEach((function(select){for(;select.firstChild;)select.removeChild(select.firstChild)}));for(var i=0;i!==e.length;++i){var n=e[i],option=document.createElement("option");option.value=n.deviceId,"audioinput"===n.kind?(option.text=n.label||"microphone ".concat(audioInputSelect.length+1),this.audioInputSelect.appendChild(option)):"audiooutput"===n.kind?(option.text=n.label||"speaker ".concat(audioOutputSelect.length+1),this.audioOutputSelect.appendChild(option)):"videoinput"===n.kind?(option.text=n.label||"camera ".concat(videoSelect.length+1),this.videoSelect.appendChild(option)):console.log("Some other kind of source/device: ",n)}this.selectors.forEach((function(select,e){Array.prototype.slice.call(select.childNodes).some((function(n){return n.value===t[e]}))&&(select.value=t[e])}))},attachSinkId:function(element,e){void 0!==element.sinkId?element.setSinkId(e).then((function(){console.log("Success, audio output device attached: ${sinkId}")})).catch((function(e){var t=e;"SecurityError"===e.name&&(t="You need to use HTTPS for selecting audio output device: ${error}"),console.error(t),audioOutputSelect.selectedIndex=0})):console.warn("Browser does not support output device selection.")},gotLocalMedia:function(e){var t=this;return this.localStream=e,this.localVideo.srcObject=e,console.log("changed localStreamTracks:",this.localStream.getTracks()),this.localStream.getTracks().forEach((function(track){"video"==track.kind&&t.localVideoSender&&t.localVideoSender.replaceTrack(track),"audio"==track.kind&&t.localAudioSender&&t.localAudioSender.replaceTrack(track)})),navigator.mediaDevices.enumerateDevices()},initWebRTC:function(){},videocall:function(e){var t=this;this.peerConnection=new RTCPeerConnection(this.peerConnectionConfig),this.peerConnection.onicecandidate=this.gotIceCandidate,this.peerConnection.ontrack=this.gotRemoteStream,console.log("localStreamTracks:",this.localStream.getTracks()),this.localStream.getTracks().forEach((function(track){"video"==track.kind&&(t.localVideoSender=t.peerConnection.addTrack(track)),"audio"==track.kind&&(t.localAudioSender=t.peerConnection.addTrack(track))})),e&&this.peerConnection.createOffer().then(this.createdDescription).catch(this.handleError)},createdDescription:function(e){var t=this;console.log("got description"),this.peerConnection.setLocalDescription(e).then((function(){var header={openId:t.localOpenId,userId:t.localUserId},data={senderId:t.localUserId,senderAvatar:t.localAvatar,senderNickname:t.localNickname,richMessage:JSON.stringify({sdp:t.peerConnection.localDescription,uuid:t.localUserId}),isPrivate:!0,atUserId:"9d7af4f9-5be6-4e8e-b7f4-88a6c428d421"!==t.localUserId?"9d7af4f9-5be6-4e8e-b7f4-88a6c428d421":"2c8f4d6f-feda-4430-ac6a-852a16ba54b6"};t.stompClient.send("/app/chat",header,JSON.stringify(data))})).catch(this.handleError)},gotIceCandidate:function(e){if(null!=e.candidate){var header={openId:this.localOpenId,userId:this.localUserId},data={senderId:this.localUserId,senderAvatar:this.localAvatar,senderNickname:this.localNickname,richMessage:JSON.stringify({ice:e.candidate,uuid:this.localUserId}),isPrivate:!0,atUserId:this.toVideoUserId};this.stompClient.send("/app/chat",header,JSON.stringify(data))}console.log("this.peerConnection.onicecandidate")},gotRemoteStream:function(e){var t=this;console.log("got remote stream"),console.log("remote stream:",e.streams[0]),console.log("remote track:",e.track),this.remoteStream||(this.remoteStream=new MediaStream,this.remoteVideo.srcObject=this.remoteStream,this.remoteVideo.play()),console.log(this.remoteStream),"video"==e.track.kind&&(this.remoteStream.getVideoTracks().forEach((function(track){return t.remoteStream.removeTrack(track)})),this.remoteStream.addTrack(e.track)),"audio"==e.track.kind&&(this.remoteStream.getAudioTracks().forEach((function(track){return t.remoteStream.removeTrack(track)})),this.remoteStream.addTrack(e.track)),console.log("video tracks:",this.remoteStream.getVideoTracks()),console.log("audio tracks:",this.remoteStream.getAudioTracks())},initWebSocket:function(){var e=this;this.stompClient=r.a.client("wss://www.celestyles.com/celes-websocket/websocket");this.stompClient.connect({Authorization:"Basic QW5vbnk6QW5vbnk="},(function(t){if(console.log("Connection successful"),e.localUserId){var n="/user/"+e.localUserId+"/";e.subscribePrivate(n)}else console.log("Not logged in")}),(function(e){console.error("Connect failed")}))},subscribePrivate:function(e){var t=this,n={userAvatar:this.localAvatar,userNickname:this.localNickname,userId:this.localUserId,openId:this.localOpenId};this.privateClient=this.stompClient.subscribe(e,(function(e){if(e.body){var data=JSON.parse(e.body);try{var n=data.comment.richMessage,o=JSON.parse(n);1===data.messageType&&o&&t.gotMessageFromServer(o)}catch(e){console.log("err:",e.message)}}}),n)},gotMessageFromServer:function(e){var t=this;console.log("this.peerConnection1:",this.peerConnection),this.peerConnection.setRemoteDescription||(console.log("this.peerConnection === {}"),this.videocall(!1));var n=e;n.uuid!=this.localUserId&&(console.log("this.peerConnection2:",this.peerConnection),n.sdp?this.peerConnection.setRemoteDescription(new RTCSessionDescription(n.sdp)).then((function(){"offer"==n.sdp.type&&t.peerConnection.createAnswer().then(t.createdDescription).catch(t.handleError)})).catch(this.handleError):n.ice&&this.peerConnection.addIceCandidate(new RTCIceCandidate(n.ice)).catch(this.handleError))},handleError:function(e){console.log("err:",e)}},components:{},beforeCreate:function(){},created:function(){},beforeMount:function(){this.initWebSocket()},mounted:function(){var e=this;this.$nextTick((function(){e.pageReady(),e.initWebRTC()}))},beforeUpdate:function(){},updated:function(){},activated:function(){},deactivated:function(){},beforeDestroy:function(){},destroyed:function(){},errorCaptured:function(){}},l=(n(508),n(38)),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"video-box"}},[n("video",{staticStyle:{width:"40%"},attrs:{id:"localVideo",autoplay:"",muted:"",controls:"controls"},domProps:{muted:!0}}),e._v(" "),n("video",{staticStyle:{width:"40%"},attrs:{id:"remoteVideo",autoplay:"",controls:"controls"}}),e._v(" "),e._m(0),e._v(" "),e._m(1),e._v(" "),e._m(2),e._v(" "),n("br"),e._v(" "),n("input",{attrs:{type:"button",id:"start",value:"Call"},on:{click:function(t){return e.videocall(!0)}}})])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"select"},[t("label",{attrs:{for:"audioSource"}},[this._v("Audio input device:")]),this._v(" "),t("select",{attrs:{id:"audioSource"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"select"},[t("label",{attrs:{for:"audioOutput"}},[this._v("Audio output device:")]),this._v(" "),t("select",{attrs:{id:"audioOutput"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"select"},[t("label",{attrs:{for:"videoSource"}},[this._v("Camera device:")]),this._v(" "),t("select",{attrs:{id:"videoSource"}})])}],!1,null,"2d2cada4",null);t.default=component.exports}}]);