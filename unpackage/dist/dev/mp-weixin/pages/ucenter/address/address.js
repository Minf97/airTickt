(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/address/address"],{265:function(e,n,t){"use strict";(function(e){t(5);r(t(4));var n=r(t(266));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},266:function(e,n,t){"use strict";t.r(n);var r=t(267),d=t(269);for(var s in d)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return d[e]}))}(s);t(271);var o,u=t(13),a=Object(u["default"])(d["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],o);a.options.__file="pages/ucenter/address/address.vue",n["default"]=a.exports},267:function(e,n,t){"use strict";t.r(n);var r=t(268);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},268:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return d})),t.d(n,"staticRenderFns",(function(){return o})),t.d(n,"recyclableRender",(function(){return s})),t.d(n,"components",(function(){return r}));var d=function(){var e=this,n=e.$createElement;e._self._c},s=!1,o=[];d._withStripped=!0},269:function(e,n,t){"use strict";t.r(n);var r=t(270),d=t.n(r);for(var s in r)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(s);n["default"]=d.a},270:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t(9),d=t(10),s=(getApp(),{data:function(){return{addressList:[]}},onLoad:function(e){this.getAddressList()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},methods:{getAddressList:function(){var e=this;r.request(d.AddressList).then((function(n){0===n.errno&&e.setData({addressList:n.data})}))},addressAddOrUpdate:function(n){console.log(n),e.navigateTo({url:"/pages/ucenter/addressAdd/addressAdd?id="+n.currentTarget.dataset.addressId})},deleteAddress:function(n){console.log(n.target);var t=this;return e.showModal({title:"",content:"确定要删除地址？",success:function(e){if(e.confirm){var s=n.target.dataset.addressId;r.request(d.AddressDelete,{id:s},"POST").then((function(e){0===e.errno&&t.getAddressList()})),console.log("用户点击确定")}}}),!1}}});n.default=s}).call(this,t(1)["default"])},271:function(e,n,t){"use strict";t.r(n);var r=t(272),d=t.n(r);for(var s in r)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(s);n["default"]=d.a},272:function(e,n,t){}},[[265,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/ucenter/address/address.js.map