(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/address/address"],{234:function(e,n,t){"use strict";(function(e,n){var r=t(4);t(26);r(t(25));var d=r(t(235));e.__webpack_require_UNI_MP_PLUGIN__=t,n(d.default)}).call(this,t(1)["default"],t(2)["createPage"])},235:function(e,n,t){"use strict";t.r(n);var r=t(236),d=t(238);for(var s in d)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return d[e]}))}(s);t(240);var a,o=t(34),u=Object(o["default"])(d["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],a);u.options.__file="pages/shopping/address/address.vue",n["default"]=u.exports},236:function(e,n,t){"use strict";t.r(n);var r=t(237);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},237:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return d})),t.d(n,"staticRenderFns",(function(){return a})),t.d(n,"recyclableRender",(function(){return s})),t.d(n,"components",(function(){return r}));var d=function(){var e=this,n=e.$createElement,t=(e._self._c,e.addressList.length),r=e.addressList.length;e.$mp.data=Object.assign({},{$root:{g0:t,g1:r}})},s=!1,a=[];d._withStripped=!0},238:function(e,n,t){"use strict";t.r(n);var r=t(239),d=t.n(r);for(var s in r)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(s);n["default"]=d.a},239:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t(30),d=t(31),s=(getApp(),{data:function(){return{addressList:[]}},onLoad:function(e){},onReady:function(){},onShow:function(){this.getAddressList()},onHide:function(){},onUnload:function(){},methods:{getAddressList:function(){var e=this;r.request(d.AddressList).then((function(n){0===n.errno&&e.setData({addressList:n.data})}))},addressAddOrUpdate:function(n){console.log(n),e.navigateTo({url:"/pages/shopping/addressAdd/addressAdd?id="+n.currentTarget.dataset.addressId})},selectAddress:function(n){console.log(n.currentTarget.dataset.addressId);try{e.setStorageSync("addressId",n.currentTarget.dataset.addressId)}catch(t){}e.navigateBack()}}});n.default=s}).call(this,t(2)["default"])},240:function(e,n,t){"use strict";t.r(n);var r=t(241),d=t.n(r);for(var s in r)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(s);n["default"]=d.a},241:function(e,n,t){}},[[234,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/address/address.js.map