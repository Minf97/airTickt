(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/address/address"],{217:function(n,e,t){"use strict";(function(n){t(5);r(t(4));var e=r(t(218));function r(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t(1)["createPage"])},218:function(n,e,t){"use strict";t.r(e);var r=t(219),d=t(221);for(var s in d)["default"].indexOf(s)<0&&function(n){t.d(e,n,(function(){return d[n]}))}(s);t(223);var a,o=t(13),u=Object(o["default"])(d["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],a);u.options.__file="pages/shopping/address/address.vue",e["default"]=u.exports},219:function(n,e,t){"use strict";t.r(e);var r=t(220);t.d(e,"render",(function(){return r["render"]})),t.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(e,"components",(function(){return r["components"]}))},220:function(n,e,t){"use strict";var r;t.r(e),t.d(e,"render",(function(){return d})),t.d(e,"staticRenderFns",(function(){return a})),t.d(e,"recyclableRender",(function(){return s})),t.d(e,"components",(function(){return r}));var d=function(){var n=this,e=n.$createElement;n._self._c},s=!1,a=[];d._withStripped=!0},221:function(n,e,t){"use strict";t.r(e);var r=t(222),d=t.n(r);for(var s in r)["default"].indexOf(s)<0&&function(n){t.d(e,n,(function(){return r[n]}))}(s);e["default"]=d.a},222:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t(9),d=t(10),s=(getApp(),{data:function(){return{addressList:[]}},onLoad:function(n){},onReady:function(){},onShow:function(){this.getAddressList()},onHide:function(){},onUnload:function(){},methods:{getAddressList:function(){var n=this;r.request(d.AddressList).then((function(e){0===e.errno&&n.setData({addressList:e.data})}))},addressAddOrUpdate:function(e){console.log(e),n.navigateTo({url:"/pages/shopping/addressAdd/addressAdd?id="+e.currentTarget.dataset.addressId})},selectAddress:function(e){console.log(e.currentTarget.dataset.addressId);try{n.setStorageSync("addressId",e.currentTarget.dataset.addressId)}catch(t){}n.navigateBack()}}});e.default=s}).call(this,t(1)["default"])},223:function(n,e,t){"use strict";t.r(e);var r=t(224),d=t.n(r);for(var s in r)["default"].indexOf(s)<0&&function(n){t.d(e,n,(function(){return r[n]}))}(s);e["default"]=d.a},224:function(n,e,t){}},[[217,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/address/address.js.map