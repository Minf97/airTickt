(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/orderDetail/orderDetail"],{314:function(e,n,t){"use strict";(function(e,n){var r=t(4);t(26);r(t(25));var o=r(t(315));e.__webpack_require_UNI_MP_PLUGIN__=t,n(o.default)}).call(this,t(1)["default"],t(2)["createPage"])},315:function(e,n,t){"use strict";t.r(n);var r=t(316),o=t(318);for(var i in o)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(i);t(320);var a,c=t(34),d=Object(c["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],a);d.options.__file="pages/ucenter/orderDetail/orderDetail.vue",n["default"]=d.exports},316:function(e,n,t){"use strict";t.r(n);var r=t(317);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},317:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return a})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return r}));var o=function(){var e=this,n=e.$createElement;e._self._c},i=!1,a=[];o._withStripped=!0},318:function(e,n,t){"use strict";t.r(n);var r=t(319),o=t.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},319:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t(30),o=t(31),i={data:function(){return{orderId:0,orderInfo:{add_time:"",order_sn:"",actual_price:"",order_status_text:"",consignee:"",mobile:"",full_region:"",address:"",goods_price:"",freight_price:""},orderGoods:[],handleOption:{},certification:[],contactInfo:{name:"ddd",phone:"18938878019"},isNeedTicket:!0,isNoNeedAddress:!0}},onLoad:function(e){this.setData({orderId:e.id}),this.getOrderDetail()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},methods:{getOrderDetail:function(){var e=this;r.request(o.OrderDetail,{orderId:e.orderId}).then((function(n){if(0===n.errno){console.log(n.data);var t=n.data.orderInfo;try{t.certification=JSON.parse(t.certification)}catch(o){}var r=n.data.orderGoods.map((function(e){var n;e.certification=JSON.parse(e.certification);var r=[];r=t.certification?t.certification:e.certification,console.log(r);var o,i="";null!==(n=r)&&void 0!==n&&n.length&&(i=null===(o=r[0])||void 0===o?void 0:o.choosetime);console.log(i);var a=e.goods_specifition_name_value.split(";");return a.forEach((function(e,n){e.includes("&")&&(a[n]=i||a[n])})),e["goods_specifition_name_value_new"]=a.join(";"),e}));e.setData({orderInfo:t,orderGoods:r,handleOption:n.data.handleOption,contactInfo:{name:n.data.orderInfo.name,phone:n.data.orderInfo.phone}})}}))},payTimer:function(){var e=this,n=e.orderInfo;setInterval((function(){console.log(n),n.add_time-=1,e.setData({orderInfo:n})}),1e3)},isWx:function(){var e,n,t=(null===(e=navigator)||void 0===e||null===(n=e.userAgent)||void 0===n?void 0:n.toLowerCase)&&navigator.userAgent.toLowerCase();return!!/micromessenger/.test(t)},payOrder:function(){var n=this;r.request(o.PayPrepayId,{orderId:n.orderId||15,isWx:n.isWx()}).then((function(n){if(0===n.errno){var t=n.data;e.requestPayment({timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,signType:t.signType,paySign:t.paySign,success:function(e){console.log(e)},fail:function(e){console.log(e)}})}}))},cancelOrder:function(){console.log("占位：函数 cancelOrder 未声明")}}};n.default=i}).call(this,t(2)["default"])},320:function(e,n,t){"use strict";t.r(n);var r=t(321),o=t.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},321:function(e,n,t){}},[[314,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/ucenter/orderDetail/orderDetail.js.map