(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/address/address"],{282:function(e,n,t){"use strict";(function(e,n){var r=t(4);t(26);r(t(25));var d=r(t(283));e.__webpack_require_UNI_MP_PLUGIN__=t,n(d.default)}).call(this,t(1)["default"],t(2)["createPage"])},283:function(e,n,t){"use strict";t.r(n);var r=t(284),d=t(286);for(var s in d)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return d[e]}))}(s);t(288);var o,a=t(34),u=Object(a["default"])(d["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],o);u.options.__file="pages/ucenter/address/address.vue",n["default"]=u.exports},284:function(e,n,t){"use strict";t.r(n);var r=t(285);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},285:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return d})),t.d(n,"staticRenderFns",(function(){return o})),t.d(n,"recyclableRender",(function(){return s})),t.d(n,"components",(function(){return r}));var d=function(){var e=this,n=e.$createElement,t=(e._self._c,e.addressList.length),r=e.addressList.length;e.$mp.data=Object.assign({},{$root:{g0:t,g1:r}})},s=!1,o=[];d._withStripped=!0},286:function(e,n,t){"use strict";t.r(n);var r=t(287),d=t.n(r);for(var s in r)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(s);n["default"]=d.a},287:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t(30),d=t(31),s=(getApp(),{data:function(){return{addressList:[]}},onLoad:function(e){this.getAddressList()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},methods:{getAddressList:function(){var e=this;r.request(d.AddressList).then((function(n){0===n.errno&&e.setData({addressList:n.data})}))},addressAddOrUpdate:function(n){console.log(n),e.navigateTo({url:"/pages/ucenter/addressAdd/addressAdd?id="+n.currentTarget.dataset.addressId})},deleteAddress:function(n){console.log(n.target);var t=this;return e.showModal({title:"",content:"确定要删除地址？",success:function(e){if(e.confirm){var s=n.target.dataset.addressId;r.request(d.AddressDelete,{id:s},"POST").then((function(e){0===e.errno&&t.getAddressList()})),console.log("用户点击确定")}}}),!1}}});n.default=s}).call(this,t(2)["default"])},288:function(e,n,t){"use strict";t.r(n);var r=t(289),d=t.n(r);for(var s in r)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(s);n["default"]=d.a},289:function(e,n,t){}},[[282,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/ucenter/address/address.js.map