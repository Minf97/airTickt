(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search"],{183:function(t,e,r){"use strict";(function(t,e){var a=r(4);r(26);a(r(25));var o=a(r(184));t.__webpack_require_UNI_MP_PLUGIN__=r,e(o.default)}).call(this,r(1)["default"],r(2)["createPage"])},184:function(t,e,r){"use strict";r.r(e);var a=r(185),o=r(187);for(var n in o)["default"].indexOf(n)<0&&function(t){r.d(e,t,(function(){return o[t]}))}(n);r(189);var s,i=r(34),c=Object(i["default"])(o["default"],a["render"],a["staticRenderFns"],!1,null,null,null,!1,a["components"],s);c.options.__file="pages/search/search.vue",e["default"]=c.exports},185:function(t,e,r){"use strict";r.r(e);var a=r(186);r.d(e,"render",(function(){return a["render"]})),r.d(e,"staticRenderFns",(function(){return a["staticRenderFns"]})),r.d(e,"recyclableRender",(function(){return a["recyclableRender"]})),r.d(e,"components",(function(){return a["components"]}))},186:function(t,e,r){"use strict";var a;r.r(e),r.d(e,"render",(function(){return o})),r.d(e,"staticRenderFns",(function(){return s})),r.d(e,"recyclableRender",(function(){return n})),r.d(e,"components",(function(){return a}));var o=function(){var t=this,e=t.$createElement,r=(t._self._c,t.searchStatus?null:!t.keyword&&t.historyKeyword.length),a=t.searchStatus&&t.goodsList.length,o=!t.goodsList.length&&t.searchStatus;t.$mp.data=Object.assign({},{$root:{g0:r,g1:a,g2:o}})},n=!1,s=[];o._withStripped=!0},187:function(t,e,r){"use strict";r.r(e);var a=r(188),o=r.n(a);for(var n in a)["default"].indexOf(n)<0&&function(t){r.d(e,t,(function(){return a[t]}))}(n);e["default"]=o.a},188:function(t,e,r){"use strict";(function(t){var a=r(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(r(11)),n=r(30),s=r(31),i=(getApp(),{data:function(){var t;return t={keywrod:"",searchStatus:!1,goodsList:[],helpKeyword:[],historyKeyword:[],categoryFilter:!1,currentSortType:"default",currentSortOrder:"",filterCategory:[],defaultKeyword:{keyword:""},hotKeyword:[],page:1,size:20},(0,o.default)(t,"currentSortType","id"),(0,o.default)(t,"currentSortOrder","desc"),(0,o.default)(t,"categoryId",0),(0,o.default)(t,"keyword",""),(0,o.default)(t,"cate",0),(0,o.default)(t,"iindex",0),(0,o.default)(t,"iitem",{id:"",list_pic_url:"",name:"",retail_price:""}),t},onLoad:function(){this.getSearchKeyword()},methods:{closeSearch:function(){t.navigateBack()},clearKeyword:function(){this.setData({keyword:"",searchStatus:!1})},getSearchKeyword:function(){var t=this;n.request(s.SearchIndex).then((function(e){0===e.errno&&t.setData({historyKeyword:e.data.historyKeywordList,defaultKeyword:e.data.defaultKeyword,hotKeyword:e.data.hotKeywordList})}))},inputChange:function(t){this.setData({keyword:t.detail.value,searchStatus:!1}),this.getHelpKeyword()},getHelpKeyword:function(){var t=this;n.request(s.SearchHelper,{keyword:t.keyword}).then((function(e){0===e.errno&&t.setData({helpKeyword:e.data})}))},inputFocus:function(){this.setData({searchStatus:!1,goodsList:[]}),this.keyword&&this.getHelpKeyword()},clearHistory:function(){this.setData({historyKeyword:[]}),n.request(s.SearchClearHistory,{},"POST").then((function(t){console.log("清除成功")}))},getGoodsList:function(){var t=this;n.request(s.GoodsList,{name:t.keyword,page:t.page,size:t.size,sort:t.currentSortType,order:t.currentSortOrder,categoryId:t.categoryId}).then((function(e){0===e.errno&&t.setData({searchStatus:!0,categoryFilter:!1,goodsList:e.data.data,filterCategory:e.data.filterCategory,page:e.data.currentPage,size:e.data.numsPerPage}),t.getSearchKeyword()}))},onKeywordTap:function(t){this.getSearchResult(t.target.dataset.keyword)},getSearchResult:function(t){this.setData({keyword:t,page:1,categoryId:0,goodsList:[]}),this.getGoodsList()},openSortFilter:function(t){var e=t.currentTarget.id;switch(e){case"categoryFilter":this.setData({categoryFilter:!this.categoryFilter,currentSortOrder:"asc"});break;case"priceSort":var r="asc";"asc"==this.currentSortOrder&&(r="desc"),this.setData({currentSortType:"price",currentSortOrder:r,categoryFilter:!1}),this.getGoodsList();break;default:this.setData({currentSortType:"default",currentSortOrder:"desc",categoryFilter:!1}),this.getGoodsList()}},selectCategory:function(t){var e=t.target.dataset.categoryIndex,r=this.filterCategory,a=null;for(var o in r)o==e?(r[o].selected=!0,a=r[o]):r[o].selected=!1;this.setData({filterCategory:r,categoryFilter:!1,categoryId:a.id,page:1,goodsList:[]}),this.getGoodsList()},onKeywordConfirm:function(t){this.getSearchResult(t.detail.value)}}});e.default=i}).call(this,r(2)["default"])},189:function(t,e,r){"use strict";r.r(e);var a=r(190),o=r.n(a);for(var n in a)["default"].indexOf(n)<0&&function(t){r.d(e,t,(function(){return a[t]}))}(n);e["default"]=o.a},190:function(t,e,r){}},[[183,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map