(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/index/index"],{102:function(n,e,t){"use strict";(function(n){t(5);o(t(4));var e=o(t(103));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t(1)["createPage"])},103:function(n,e,t){"use strict";t.r(e);var o=t(104),r=t(106);for(var i in r)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return r[n]}))}(i);t(108);var a,c=t(13),u=Object(c["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],a);u.options.__file="pages/ucenter/index/index.vue",e["default"]=u.exports},104:function(n,e,t){"use strict";t.r(e);var o=t(105);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))},105:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return r})),t.d(e,"staticRenderFns",(function(){return a})),t.d(e,"recyclableRender",(function(){return i})),t.d(e,"components",(function(){return o}));var r=function(){var n=this,e=n.$createElement;n._self._c},i=!1,a=[];r._withStripped=!0},106:function(n,e,t){"use strict";t.r(e);var o=t(107),r=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(i);e["default"]=r.a},107:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t(9),r=t(10),i=(t(23),getApp()),a={data:function(){return{userInfo:{avatar:"",nickname:""},showLoginDialog:!1}},onLoad:function(e){var t=this.isWx();if(t&&!n.getStorageSync("token")){var o=this.getUrlParam("code"),r=encodeURIComponent("http://static-3df7fbd1-8be5-4faa-affb-73c9463c6baa.bspapp.com/#/pages/ucenter/index/index"),i="wxafc235c48269a55c";null==o||""===o?window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+i+"&redirect_uri="+r+"&response_type=code&scope=snsapi_base&connect_redirect=1&state=#wechat_redirect":this.getOpenId(o,{})}},onReady:function(){},onShow:function(){this.setData({userInfo:i.globalData.userInfo})},onHide:function(){},onUnload:function(){},methods:{loginWithWx:function(){n.getStorageSync("openid")&&void 0!=n.getStorageSync("openid")||this.getWxUserInfoCode()},getUrlParam:function(n){var e=new RegExp("(^|&)"+n+"=([^&]*)(&|$)"),t=window.location.search.substr(1).match(e);return null!=t?unescape(t[2]):null},isWx:function(){var n,e,t=(null===(n=navigator)||void 0===n||null===(e=n.userAgent)||void 0===e?void 0:e.toLowerCase)&&navigator.userAgent.toLowerCase();return!!/micromessenger/.test(t)},onLogin:function(){var e=this.isWx();e||n.navigateTo({url:"/pages/auth/login/login"})},getOpenId:function(e,t){var a=this;console.log(e,t);o.request(r.AuthLoginByWeixin,{code:e,userInfo:t},"POST").then((function(e){if(console.log(e),0!==e.errno)return n.showToast({title:"微信登录失败"}),!1;a.setData({userInfo:e.data.userInfo,showLoginDialog:!1}),i.globalData.userInfo=e.data.userInfo,i.globalData.token=e.data.token,n.setStorageSync("userInfo",JSON.stringify(e.data.userInfo)),n.setStorageSync("token",e.data.token)})).catch((function(n){console.log(n)}))},onUserInfoClick:function(){n.getStorageSync("token")||this.showLoginDialogFun()},showLoginDialogFun:function(){this.setData({showLoginDialog:!0})},onCloseLoginDialog:function(){this.setData({showLoginDialog:!1})},onDialogBody:function(){},onWechatLogin:function(e){var t=this;if("getUserInfo:ok"!==e.detail.errMsg)return"getUserInfo:fail auth deny"===e.detail.errMsg||n.showToast({title:"微信登录失败"}),!1;o.login().then((function(n){return o.request(r.AuthLoginByWeixin,{code:n,userInfo:e.detail},"POST")})).then((function(e){if(console.log(e),0!==e.errno)return n.showToast({title:"微信登录失败"}),!1;t.setData({userInfo:e.data.userInfo,showLoginDialog:!1}),i.globalData.userInfo=e.data.userInfo,i.globalData.token=e.data.token,n.setStorageSync("userInfo",JSON.stringify(e.data.userInfo)),n.setStorageSync("token",e.data.token)})).catch((function(n){console.log(n)}))},onOrderInfoClick:function(e){n.navigateTo({url:"/pages/ucenter/order/order"})},onSectionItemClick:function(n){},exitLogin:function(){n.showModal({title:"",confirmColor:"#b4282d",content:"退出登录？",success:function(e){e.confirm&&(n.removeStorageSync("token"),n.removeStorageSync("userInfo"),n.switchTab({url:"/pages/index/index"}))}})}}};e.default=a}).call(this,t(1)["default"])},108:function(n,e,t){"use strict";t.r(e);var o=t(109),r=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(i);e["default"]=r.a},109:function(n,e,t){}},[[102,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/ucenter/index/index.js.map