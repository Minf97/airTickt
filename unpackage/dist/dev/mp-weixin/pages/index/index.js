(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{38:function(n,t,e){"use strict";(function(n,t){var o=e(4);e(26);o(e(25));var r=o(e(39));n.__webpack_require_UNI_MP_PLUGIN__=e,t(r.default)}).call(this,e(1)["default"],e(2)["createPage"])},39:function(n,t,e){"use strict";e.r(t);var o=e(40),r=e(42);for(var i in r)["default"].indexOf(i)<0&&function(n){e.d(t,n,(function(){return r[n]}))}(i);e(45);var a,d=e(34),u=Object(d["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],a);u.options.__file="pages/index/index.vue",t["default"]=u.exports},40:function(n,t,e){"use strict";e.r(t);var o=e(41);e.d(t,"render",(function(){return o["render"]})),e.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),e.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),e.d(t,"components",(function(){return o["components"]}))},41:function(n,t,e){"use strict";var o;e.r(t),e.d(t,"render",(function(){return r})),e.d(t,"staticRenderFns",(function(){return a})),e.d(t,"recyclableRender",(function(){return i})),e.d(t,"components",(function(){return o}));var r=function(){var n=this,t=n.$createElement,e=(n._self._c,n.newGoods.length),o=e>0?n.__map(n.newGoods,(function(t,e){var o=n.__get_orig(t),r=n.computedUrl(t.category_id,t.id);return{$orig:o,m0:r}})):null,r=n.hotGoods.length,i=n.__map(n.floorGoods,(function(t,e){var o=n.__get_orig(t),r=n.__map(t.goodsList,(function(t,e){var o=n.__get_orig(t),r=n.computedUrl(t.category_id,t.id);return{$orig:o,m1:r}}));return{$orig:o,l1:r}}));n.$mp.data=Object.assign({},{$root:{g0:e,l0:o,g1:r,l2:i}})},i=!1,a=[];r._withStripped=!0},42:function(n,t,e){"use strict";e.r(t);var o=e(43),r=e.n(o);for(var i in o)["default"].indexOf(i)<0&&function(n){e.d(t,n,(function(){return o[n]}))}(i);t["default"]=r.a},43:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=e(30),r=e(31),i=(e(44),getApp(),{data:function(){return{goodsCount:0,newGoods:[],hotGoods:[],topics:[],brands:[],floorGoods:[],banner:[],channel:[],brand:"",iitem:{id:"",list_pic_url:"",name:"",retail_price:""}}},onShareAppMessage:function(){return{title:"NideShop",desc:"仿网易严选微信小程序商城",path:"/pages/index/index"}},onLoad:function(n){var t=this;this.getIndexData(),o.request(r.GoodsCount).then((function(n){t.setData({goodsCount:n.data.goodsCount})}))},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},methods:{getIndexData:function(){var n=this;o.request(r.IndexUrl).then((function(t){0===t.errno&&n.setData({newGoods:t.data.newGoodsList,hotGoods:t.data.hotGoodsList,topics:t.data.topicList,brand:t.data.brandList,floorGoods:t.data.categoryList,banner:t.data.banner,channel:t.data.channel})}))},computedUrl:function(n,t){switch(n){case 1036009:return"../goodsTicket/goodsTicket?id="+t;case 1036012:return"../buyNew/buyNew?id="+t;default:return"../goods/goods?id="+t}}}});t.default=i},45:function(n,t,e){"use strict";e.r(t);var o=e(46),r=e.n(o);for(var i in o)["default"].indexOf(i)<0&&function(n){e.d(t,n,(function(){return o[n]}))}(i);t["default"]=r.a},46:function(n,t,e){}},[[38,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map