(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/auth/login/login"],{70:function(n,t,e){"use strict";(function(n){e(5);a(e(4));var t=a(e(71));function a(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=e,n(t.default)}).call(this,e(1)["createPage"])},71:function(n,t,e){"use strict";e.r(t);var a=e(72),r=e(74);for(var o in r)["default"].indexOf(o)<0&&function(n){e.d(t,n,(function(){return r[n]}))}(o);e(76);var u,s=e(13),i=Object(s["default"])(r["default"],a["render"],a["staticRenderFns"],!1,null,null,null,!1,a["components"],u);i.options.__file="pages/auth/login/login.vue",t["default"]=i.exports},72:function(n,t,e){"use strict";e.r(t);var a=e(73);e.d(t,"render",(function(){return a["render"]})),e.d(t,"staticRenderFns",(function(){return a["staticRenderFns"]})),e.d(t,"recyclableRender",(function(){return a["recyclableRender"]})),e.d(t,"components",(function(){return a["components"]}))},73:function(n,t,e){"use strict";var a;e.r(t),e.d(t,"render",(function(){return r})),e.d(t,"staticRenderFns",(function(){return u})),e.d(t,"recyclableRender",(function(){return o})),e.d(t,"components",(function(){return a}));var r=function(){var n=this,t=n.$createElement;n._self._c},o=!1,u=[];r._withStripped=!0},74:function(n,t,e){"use strict";e.r(t);var a=e(75),r=e.n(a);for(var o in a)["default"].indexOf(o)<0&&function(n){e.d(t,n,(function(){return a[n]}))}(o);t["default"]=r.a},75:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=e(10),r=getApp(),o={data:function(){return{username:"",password:"",code:"",loginErrorCount:0}},onLoad:function(n){},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},methods:{startLogin:function(){var t=this;if(t.password.length<1||t.username.length<1)return n.showModal({title:"错误信息",content:"请输入用户名和密码",showCancel:!1}),!1;n.request({url:a.ApiRootUrl+"auth/login",data:{username:t.username,password:t.password},method:"POST",header:{"content-type":"application/json"},success:function(e){console.log(e.data),0===e.data.errno?(t.setData({loginErrorCount:0}),r.globalData.userInfo=e.data.data.userInfo,r.globalData.token=e.data.data.token,n.setStorageSync("userInfo",JSON.stringify(e.data.data.userInfo)),n.setStorageSync("token",e.data.data.token),n.switchTab({url:"/pages/ucenter/index/index"})):0!==e.data.errno?n.showModal({title:"错误信息",content:e.data.errmsg,showCancel:!1}):n.showModal({title:"未知错误",content:e.data.errmsg,showCancel:!1})}})},bindUsernameInput:function(n){this.setData({username:n.detail.value})},bindPasswordInput:function(n){this.setData({password:n.detail.value})},bindCodeInput:function(n){this.setData({code:n.detail.value})},clearInput:function(n){switch(n.currentTarget.id){case"clear-username":this.setData({username:""});break;case"clear-password":this.setData({password:""});break;case"clear-code":this.setData({code:""});break}}}};t.default=o}).call(this,e(1)["default"])},76:function(n,t,e){"use strict";e.r(t);var a=e(77),r=e.n(a);for(var o in a)["default"].indexOf(o)<0&&function(n){e.d(t,n,(function(){return a[n]}))}(o);t["default"]=r.a},77:function(n,t,e){}},[[70,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/auth/login/login.js.map