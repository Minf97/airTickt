(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pay/pay"],{86:function(e,n,t){"use strict";(function(e){t(5);r(t(4));var n=r(t(87));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},87:function(e,n,t){"use strict";t.r(n);var r=t(88),a=t(90);for(var u in a)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return a[e]}))}(u);t(92);var o,i=t(13),c=Object(i["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],o);c.options.__file="pages/pay/pay.vue",n["default"]=c.exports},88:function(e,n,t){"use strict";t.r(n);var r=t(89);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},89:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return a})),t.d(n,"staticRenderFns",(function(){return o})),t.d(n,"recyclableRender",(function(){return u})),t.d(n,"components",(function(){return r}));var a=function(){var e=this,n=e.$createElement;e._self._c},u=!1,o=[];a._withStripped=!0},90:function(e,n,t){"use strict";t.r(n);var r=t(91),a=t.n(r);for(var u in r)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(u);n["default"]=a.a},91:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;getApp();var r=t(9),a=t(10),u={data:function(){return{orderId:0,actualPrice:0}},onLoad:function(e){this.setData({orderId:e.orderId,actualPrice:e.actualPrice})},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},methods:{isWx:function(){var e,n,t=(null===(e=navigator)||void 0===e||null===(n=e.userAgent)||void 0===n?void 0:n.toLowerCase)&&navigator.userAgent.toLowerCase();return!!/micromessenger/.test(t)},requestPayParam:function(){var n=this;r.request(a.PayPrepayId,{orderId:n.orderId,payType:1,isWx:n.isWx()}).then((function(t){if(console.log(t),0===t.errno){var u=t.data;e.requestPayment({timeStamp:u.timeStamp,nonceStr:u.timeStamp,package:u.nonceStr,signType:u.signType,paySign:u.paySign,success:function(t){r.request(a.PayPrepayId,{orderId:n.orderId,payType:1,isWx:n.isWx()}),e.redirectTo({url:"/pages/payResult/payResult?status=true"})},fail:function(n){e.redirectTo({url:"/pages/payResult/payResult?status=false"})}})}}))},startPay:function(){this.requestPayParam()}}};n.default=u}).call(this,t(1)["default"])},92:function(e,n,t){"use strict";t.r(n);var r=t(93),a=t.n(r);for(var u in r)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(u);n["default"]=a.a},93:function(e,n,t){}},[[86,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/pay/pay.js.map