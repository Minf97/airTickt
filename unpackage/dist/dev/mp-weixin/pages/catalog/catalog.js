(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/catalog/catalog"],{38:function(t,n,e){"use strict";(function(t){e(5);r(e(4));var n=r(e(39));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e(1)["createPage"])},39:function(t,n,e){"use strict";e.r(n);var r=e(40),a=e(42);for(var o in a)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e(44);var u,i=e(13),c=Object(i["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],u);c.options.__file="pages/catalog/catalog.vue",n["default"]=c.exports},40:function(t,n,e){"use strict";e.r(n);var r=e(41);e.d(n,"render",(function(){return r["render"]})),e.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),e.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),e.d(n,"components",(function(){return r["components"]}))},41:function(t,n,e){"use strict";var r;e.r(n),e.d(n,"render",(function(){return a})),e.d(n,"staticRenderFns",(function(){return u})),e.d(n,"recyclableRender",(function(){return o})),e.d(n,"components",(function(){return r}));var a=function(){var t=this,n=t.$createElement;t._self._c},o=!1,u=[];a._withStripped=!0},42:function(t,n,e){"use strict";e.r(n);var r=e(43),a=e.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return r[t]}))}(o);n["default"]=a.a},43:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=e(9),a=e(10),o={data:function(){return{navList:[],categoryList:[],currentCategory:{id:"",wap_banner_url:"",front_name:"",name:"",subCategoryList:[]},scrollLeft:0,scrollTop:0,goodsCount:0,scrollHeight:0}},onLoad:function(t){this.getCatalog()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},methods:{getCatalog:function(){var n=this;t.showLoading({title:"加载中..."}),r.request(a.CatalogList).then((function(e){n.setData({navList:e.data.categoryList,currentCategory:e.data.currentCategory}),t.hideLoading()})),r.request(a.GoodsCount).then((function(t){n.setData({goodsCount:t.data.goodsCount})}))},getCurrentCategory:function(t){var n=this;r.request(a.CatalogCurrent,{id:t}).then((function(t){n.setData({currentCategory:t.data.currentCategory})}))},getList:function(){var t=this;r.request(a.ApiRootUrl+"api/catalog/"+t.currentCategory.cat_id).then((function(n){t.setData({categoryList:n.data})}))},switchCate:function(t){t.currentTarget;if(this.currentCategory.id==t.currentTarget.dataset.id)return!1;this.getCurrentCategory(t.currentTarget.dataset.id)}}};n.default=o}).call(this,e(1)["default"])},44:function(t,n,e){"use strict";e.r(n);var r=e(45),a=e.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return r[t]}))}(o);n["default"]=a.a},45:function(t,n,e){}},[[38,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/catalog/catalog.js.map