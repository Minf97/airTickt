(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ucenter-index-index"],{"0167":function(t,n,e){"use strict";var a=e("a778"),i=e.n(a);i.a},"22d0":function(t,n,e){e("d3b7");var a=e("5426"),i=e("66ed");t.exports={loginByWeixin:function(){var t=null;return new Promise((function(n,e){return a.login().then((function(n){return t=n.code,a.getUserInfo()})).then((function(o){a.request(i.AuthLoginByWeixin,{code:t,userInfo:o},"POST").then((function(t){0===t.errno?(uni.setStorageSync("userInfo",t.data.userInfo),uni.setStorageSync("token",t.data.token),n(t)):e(t)})).catch((function(t){e(t)}))})).catch((function(t){e(t)}))}))},checkLogin:function(){return new Promise((function(t,n){uni.getStorageSync("userInfo")&&uni.getStorageSync("token")?a.checkSession().then((function(){t(!0)})).catch((function(){n(!1)})):n(!1)}))}}},5248:function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,"uni-page-body[data-v-1f6abf0d]{height:100%;width:100%;background:#f4f4f4}body.?%PAGE?%[data-v-1f6abf0d]{background:#f4f4f4}.container[data-v-1f6abf0d]{background:#f4f4f4;height:auto;overflow:hidden;width:100%}.profile-info[data-v-1f6abf0d]{width:100%;height:%?280?%;display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-start;padding:0 %?30.25?%;background:#333}.profile-info .avatar[data-v-1f6abf0d]{height:%?148?%;width:%?148?%;border-radius:50%;border:%?4?% solid #fff}.profile-info .info[data-v-1f6abf0d]{flex:1;height:%?85?%;margin-left:%?30?%;display:flex;flex-direction:column;justify-content:center}.profile-info .name[data-v-1f6abf0d]{height:%?45?%;line-height:%?45?%;color:#fff;font-size:%?37.5?%}.profile-info .level[data-v-1f6abf0d]{height:%?30?%;line-height:%?30?%;margin-top:%?10?%;color:#7f7f7f;font-size:%?30?%}.profile-info .btn[data-v-1f6abf0d]{width:%?50?%;height:%?50?%;margin-left:%?10?%;border-radius:50%}.user-menu[data-v-1f6abf0d]{width:100%;height:auto;overflow:hidden;background:#fff}.user-menu .item[data-v-1f6abf0d]{float:left;width:33.33333%;height:%?187.5?%;border-right:1px solid rgba(0,0,0,.15);border-bottom:1px solid rgba(0,0,0,.15);text-align:center}.user-menu .item .a[data-v-1f6abf0d]{display:flex;width:100%;height:100%;flex-direction:column;align-items:center;justify-content:center}.user-menu .item.no-border[data-v-1f6abf0d]{border-right:0}.user-menu .item.item-bottom[data-v-1f6abf0d]{border-bottom:none}.user-menu .icon[data-v-1f6abf0d]{margin:0 auto;display:block;height:%?52.803?%;width:%?52.803?%;margin-bottom:%?16?%}.user-menu .icon.order[data-v-1f6abf0d]{background:url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 %?-437.5?% no-repeat;background-size:%?52.803?%}.user-menu .icon.coupon[data-v-1f6abf0d]{background:url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 %?-62.4997?% no-repeat;background-size:%?52.803?%}.user-menu .icon.gift[data-v-1f6abf0d]{background:url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 %?-187.5?% no-repeat;background-size:%?52.803?%}.user-menu .icon.address[data-v-1f6abf0d]{background:url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 0 no-repeat;background-size:%?52.803?%}.user-menu .icon.security[data-v-1f6abf0d]{background:url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 %?-500?% no-repeat;background-size:%?52.803?%}.user-menu .icon.kefu[data-v-1f6abf0d]{background:url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 %?-312.5?% no-repeat;background-size:%?52.803?%}.user-menu .icon.help[data-v-1f6abf0d]{background:url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 %?-250?% no-repeat;background-size:%?52.803?%}.user-menu .icon.feedback[data-v-1f6abf0d]{background:url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 %?-125?% no-repeat;background-size:%?52.803?%}.user-menu .txt[data-v-1f6abf0d]{display:block;height:%?24?%;width:100%;font-size:%?24?%;color:#333}.logout[data-v-1f6abf0d]{margin-top:%?50?%;height:%?101?%;width:100%;line-height:%?101?%;text-align:center;background:#fff;color:#333;font-size:%?30?%}.dialog-login[data-v-1f6abf0d]{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);display:flex;justify-content:center;align-items:center}.dialog-login .dialog-body[data-v-1f6abf0d]{width:%?540?%;height:auto;overflow:hidden;background:#fff;border-radius:5px;padding:%?40?%}.dialog-login .dialog-body .title[data-v-1f6abf0d]{width:100%;text-align:center;line-height:%?60?%}.dialog-login .dialog-body .content[data-v-1f6abf0d]{width:100%}.dialog-login .dialog-body uni-button[data-v-1f6abf0d]{margin-top:%?30?%}.contactBtn[data-v-1f6abf0d]{position:absolute;width:100%;height:100%;opacity:0}",""]),t.exports=n},6727:function(t,n,e){"use strict";e.r(n);var a=e("f248"),i=e("a26f");for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("0167");var s=e("f0c5"),r=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"1f6abf0d",null,!1,a["a"],void 0);n["default"]=r.exports},a26f:function(t,n,e){"use strict";e.r(n);var a=e("ca95"),i=e.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a},a778:function(t,n,e){var a=e("5248");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=e("4f06").default;i("390a03e4",a,!0,{sourceMap:!1,shadowMode:!1})},ca95:function(t,n,e){"use strict";(function(t){e("7a82"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("4d63"),e("c607"),e("ac1f"),e("2c3e"),e("25f0"),e("466d"),e("841c"),e("00b4"),e("e9c4");var a=e("5426"),i=e("66ed"),o=(e("22d0"),getApp()),s={data:function(){return{userInfo:{avatar:"",nickname:""},showLoginDialog:!1}},onLoad:function(t){var n=this.isWx();if(n&&!uni.getStorageSync("token")){var e=this.getUrlParam("code"),a=encodeURIComponent("https://static-mp-81d04c4e-5e21-4d71-9c75-68782e3aaed9.next.bspapp.com/#/pages/ucenter/index/index");null==e||""===e?window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7fe2ba6679e645d2&redirect_uri="+a+"&response_type=code&scope=snsapi_base&connect_redirect=1&state=#wechat_redirect":this.getOpenId(e,{})}},onReady:function(){},onShow:function(){this.setData({userInfo:o.globalData.userInfo})},onHide:function(){},onUnload:function(){},methods:{loginWithWx:function(){uni.getStorageSync("openid")&&void 0!=uni.getStorageSync("openid")||this.getWxUserInfoCode()},getUrlParam:function(t){var n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(n);return null!=e?unescape(e[2]):null},isWx:function(){var t,n,e=(null===(t=navigator)||void 0===t||null===(n=t.userAgent)||void 0===n?void 0:n.toLowerCase)&&navigator.userAgent.toLowerCase();return!!/micromessenger/.test(e)},onLogin:function(){var t=this.isWx();t||uni.navigateTo({url:"/pages/auth/login/login"})},getOpenId:function(n,e){var s=this;t("log",n,e," at pages/ucenter/index/index.vue:188");a.request(i.AuthLoginByWeixin,{code:n,userInfo:e},"POST").then((function(n){if(t("log",n," at pages/ucenter/index/index.vue:197"),0!==n.errno)return uni.showToast({title:"微信登录失败"}),!1;s.setData({userInfo:n.data.userInfo,showLoginDialog:!1}),o.globalData.userInfo=n.data.userInfo,o.globalData.token=n.data.token,uni.setStorageSync("userInfo",JSON.stringify(n.data.userInfo)),uni.setStorageSync("token",n.data.token)})).catch((function(n){t("log",n," at pages/ucenter/index/index.vue:216")}))},onUserInfoClick:function(){uni.getStorageSync("token")||this.showLoginDialogFun()},showLoginDialogFun:function(){this.setData({showLoginDialog:!0})},onCloseLoginDialog:function(){this.setData({showLoginDialog:!1})},onDialogBody:function(){},onWechatLogin:function(n){var e=this;if("getUserInfo:ok"!==n.detail.errMsg)return"getUserInfo:fail auth deny"===n.detail.errMsg||uni.showToast({title:"微信登录失败"}),!1;a.login().then((function(t){return a.request(i.AuthLoginByWeixin,{code:t,userInfo:n.detail},"POST")})).then((function(n){if(t("log",n," at pages/ucenter/index/index.vue:265"),0!==n.errno)return uni.showToast({title:"微信登录失败"}),!1;e.setData({userInfo:n.data.userInfo,showLoginDialog:!1}),o.globalData.userInfo=n.data.userInfo,o.globalData.token=n.data.token,uni.setStorageSync("userInfo",JSON.stringify(n.data.userInfo)),uni.setStorageSync("token",n.data.token)})).catch((function(n){t("log",n," at pages/ucenter/index/index.vue:284")}))},onOrderInfoClick:function(t){uni.navigateTo({url:"/pages/ucenter/order/order"})},onSectionItemClick:function(t){},exitLogin:function(){uni.showModal({title:"",confirmColor:"#b4282d",content:"退出登录？",success:function(t){t.confirm&&(uni.removeStorageSync("token"),uni.removeStorageSync("userInfo"),uni.switchTab({url:"/pages/index/index"}))}})}}};n.default=s}).call(this,e("0de9")["log"])},f248:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){}));var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",[e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"profile-info"},[e("v-uni-image",{staticClass:"avatar",attrs:{src:t.userInfo.avatar},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onUserInfoClick.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"info"},[e("v-uni-text",{staticClass:"name",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onUserInfoClick.apply(void 0,arguments)}}},[t._v(t._s(t.userInfo.nickname||"点击登录"))])],1),e("v-uni-image",{staticClass:"btn",attrs:{src:"/static/static/images/address_right.png"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onUserInfoClick.apply(void 0,arguments)}}})],1),e("v-uni-view",{staticClass:"user-menu"},[e("v-uni-view",{staticClass:"item"},[e("v-uni-navigator",{staticClass:"a",attrs:{url:"/pages/ucenter/order/order"}},[e("v-uni-text",{staticClass:"icon order"}),e("v-uni-text",{staticClass:"txt"},[t._v("我的订单")])],1)],1),e("v-uni-view",{staticClass:"item"},[e("v-uni-navigator",{staticClass:"a",attrs:{url:"/pages/ucenter/collect/collect"}},[e("v-uni-text",{staticClass:"icon address"}),e("v-uni-text",{staticClass:"txt"},[t._v("我的收藏")])],1)],1),e("v-uni-view",{staticClass:"item"},[e("v-uni-navigator",{staticClass:"a",attrs:{url:"/pages/ucenter/footprint/footprint"}},[e("v-uni-text",{staticClass:"icon security"}),e("v-uni-text",{staticClass:"txt"},[t._v("我的足迹")])],1)],1),e("v-uni-view",{staticClass:"item"},[e("v-uni-navigator",{staticClass:"a",attrs:{url:"../address/address"}},[e("v-uni-text",{staticClass:"icon address"}),e("v-uni-text",{staticClass:"txt"},[t._v("地址管理")])],1)],1),e("v-uni-view",{staticClass:"item",staticStyle:{position:"relative"}},[e("v-uni-button",{staticClass:"contactBtn",attrs:{type:"default","open-type":"contact"}}),e("v-uni-navigator",{staticClass:"a",attrs:{url:"url"}},[e("v-uni-text",{staticClass:"icon kefu"}),e("v-uni-text",{staticClass:"txt"},[t._v("联系客服")])],1)],1),e("v-uni-view",{staticClass:"item"},[e("v-uni-navigator",{staticClass:"a",attrs:{url:"/pages/ucenter/feedback/feedback"}},[e("v-uni-text",{staticClass:"icon feedback"}),e("v-uni-text",{staticClass:"txt"},[t._v("意见反馈")])],1)],1)],1)],1),t.showLoginDialog?e("v-uni-view",{staticClass:"dialog-login",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onCloseLoginDialog.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"dialog-body",on:{click:function(n){n.stopPropagation(),n.preventDefault(),arguments[0]=n=t.$handleEvent(n),t.onDialogBody.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"title"},[t._v("请选择登录方式")]),e("v-uni-view",{staticClass:"content"},[e("v-uni-button",{attrs:{type:"primary"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onLogin.apply(void 0,arguments)}}},[t._v("手机登录")])],1)],1)],1):t._e()],1)},i=[]}}]);