(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-search-search"],{"006b":function(t,e,a){"use strict";(function(t){a("7a82");var i=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(a("ade3")),r=a("5426"),n=a("66ed"),d=(getApp(),{data:function(){var t;return t={keywrod:"",searchStatus:!1,goodsList:[],helpKeyword:[],historyKeyword:[],categoryFilter:!1,currentSortType:"default",currentSortOrder:"",filterCategory:[],defaultKeyword:{keyword:""},hotKeyword:[],page:1,size:20},(0,o.default)(t,"currentSortType","id"),(0,o.default)(t,"currentSortOrder","desc"),(0,o.default)(t,"categoryId",0),(0,o.default)(t,"keyword",""),(0,o.default)(t,"cate",0),(0,o.default)(t,"iindex",0),(0,o.default)(t,"iitem",{id:"",list_pic_url:"",name:"",retail_price:""}),t},onLoad:function(){this.getSearchKeyword()},methods:{closeSearch:function(){uni.navigateBack()},clearKeyword:function(){this.setData({keyword:"",searchStatus:!1})},getSearchKeyword:function(){var t=this;r.request(n.SearchIndex).then((function(e){0===e.errno&&t.setData({historyKeyword:e.data.historyKeywordList,defaultKeyword:e.data.defaultKeyword,hotKeyword:e.data.hotKeywordList})}))},inputChange:function(t){this.setData({keyword:t.detail.value,searchStatus:!1}),this.getHelpKeyword()},getHelpKeyword:function(){var t=this;r.request(n.SearchHelper,{keyword:t.keyword}).then((function(e){0===e.errno&&t.setData({helpKeyword:e.data})}))},inputFocus:function(){this.setData({searchStatus:!1,goodsList:[]}),this.keyword&&this.getHelpKeyword()},clearHistory:function(){this.setData({historyKeyword:[]}),r.request(n.SearchClearHistory,{},"POST").then((function(e){t("log","清除成功"," at pages/search/search.vue:207")}))},getGoodsList:function(){var t=this;r.request(n.GoodsList,{name:t.keyword,page:t.page,size:t.size,sort:t.currentSortType,order:t.currentSortOrder,categoryId:t.categoryId}).then((function(e){0===e.errno&&t.setData({searchStatus:!0,categoryFilter:!1,goodsList:e.data.data,filterCategory:e.data.filterCategory,page:e.data.currentPage,size:e.data.numsPerPage}),t.getSearchKeyword()}))},onKeywordTap:function(t){this.getSearchResult(t.target.dataset.keyword)},getSearchResult:function(t){this.setData({keyword:t,page:1,categoryId:0,goodsList:[]}),this.getGoodsList()},openSortFilter:function(t){var e=t.currentTarget.id;switch(e){case"categoryFilter":this.setData({categoryFilter:!this.categoryFilter,currentSortOrder:"asc"});break;case"priceSort":var a="asc";"asc"==this.currentSortOrder&&(a="desc"),this.setData({currentSortType:"price",currentSortOrder:a,categoryFilter:!1}),this.getGoodsList();break;default:this.setData({currentSortType:"default",currentSortOrder:"desc",categoryFilter:!1}),this.getGoodsList()}},selectCategory:function(t){var e=t.target.dataset.categoryIndex,a=this.filterCategory,i=null;for(var o in a)o==e?(a[o].selected=!0,i=a[o]):a[o].selected=!1;this.setData({filterCategory:a,categoryFilter:!1,categoryId:i.id,page:1,goodsList:[]}),this.getGoodsList()},onKeywordConfirm:function(t){this.getSearchResult(t.detail.value)}}});e.default=d}).call(this,a("0de9")["log"])},"1e27":function(t,e,a){var i=a("62de");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=a("4f06").default;o("4382bb71",i,!0,{sourceMap:!1,shadowMode:!1})},"42a1":function(t,e,a){"use strict";a.r(e);var i=a("006b"),o=a.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"61c1":function(t,e,a){"use strict";a.r(e);var i=a("f900"),o=a("42a1");for(var r in o)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(r);a("bfcc");var n=a("f0c5"),d=Object(n["a"])(o["default"],i["b"],i["c"],!1,null,"2a6d1b43",null,!1,i["a"],void 0);e["default"]=d.exports},"62de":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,"uni-page-body[data-v-2a6d1b43]{min-height:100%;background-color:#f4f4f4}body.?%PAGE?%[data-v-2a6d1b43]{background-color:#f4f4f4}.container[data-v-2a6d1b43]{min-height:100%;background-color:#f4f4f4}.search-header[data-v-2a6d1b43]{position:fixed;top:0;width:%?750?%;height:%?91?%;display:flex;background:#fff;border-bottom:1px solid rgba(0,0,0,.15);padding:0 %?31.25?%;font-size:%?29?%;color:#333}\n.search-header[data-v-2a6d1b43]{position:fixed;top:44px;width:100%;height:%?91?%;display:flex;background:#fff;border-bottom:1px solid rgba(0,0,0,.15);padding:0 %?31.25?%;font-size:%?29?%;color:#333\n\t/* box-sizing: border-box; */}\n.search-header .input-box[data-v-2a6d1b43]{position:relative;margin-top:%?16?%;float:left;width:0;flex:1;height:%?59?%;line-height:%?59?%;padding:0 %?20?%;background:#f4f4f4\n\t/* box-sizing: border-box; */}.search-header .icon[data-v-2a6d1b43]{position:absolute;top:%?14?%;left:%?20?%;width:%?31?%;height:%?31?%}.search-header .del[data-v-2a6d1b43]{position:absolute;top:%?3?%;right:%?10?%;width:%?53?%;height:%?53?%;z-index:10}.search-header .keywrod[data-v-2a6d1b43]{position:absolute;top:0;left:%?40?%;width:%?506?%;height:%?59?%;padding-left:%?30?%}.search-header .right[data-v-2a6d1b43]{margin-top:%?24?%;margin-left:%?31?%;margin-right:%?6?%;width:%?58?%;height:%?43?%;line-height:%?43?%;float:right}.no-search[data-v-2a6d1b43]{height:auto;overflow:hidden;margin-top:%?91?%}.serach-keywords[data-v-2a6d1b43]{background:#fff;width:%?750?%;height:auto;overflow:hidden;margin-bottom:%?20?%}.serach-keywords .h[data-v-2a6d1b43]{padding:0 %?31.25?%;height:%?93?%;line-height:%?93?%;width:100%;color:#999;font-size:%?29?%}.serach-keywords .title[data-v-2a6d1b43]{display:block;width:%?120?%;float:left}.serach-keywords .icon[data-v-2a6d1b43]{margin-top:%?19?%;float:right;display:block;margin-left:%?511?%;height:%?55?%;width:%?55?%}.serach-keywords .b[data-v-2a6d1b43]{width:%?750?%;height:auto;overflow:hidden;padding-left:%?31.25?%}.serach-keywords .item[data-v-2a6d1b43]{display:inline-block;width:auto;height:%?48?%;line-height:%?48?%;padding:0 %?15?%;border:1px solid #999;margin:0 %?31.25?% %?31.25?% 0;font-size:%?24?%;color:#333}.serach-keywords .item.active[data-v-2a6d1b43]{color:#b4282d;border:1px solid #b4282d}.shelper-list[data-v-2a6d1b43]{width:%?750?%;height:auto;overflow:hidden;background:#fff;padding:0 %?31.25?%}.shelper-list .item[data-v-2a6d1b43]{height:%?93?%;width:%?687.5?%;line-height:%?93?%;font-size:%?24?%;color:#333;border-bottom:1px solid #f4f4f4}.sort[data-v-2a6d1b43]{position:fixed;top:%?91?%;background:#fff;width:100%;height:%?78?%}.sort-box[data-v-2a6d1b43]{background:#fff;width:100%;height:%?78?%;overflow:hidden;padding:0 %?30?%;display:flex;border-bottom:1px solid #d9d9d9}.sort-box .item[data-v-2a6d1b43]{height:%?78?%;line-height:%?78?%;text-align:center;flex:1;color:#333;font-size:%?30?%}.sort-box .item .txt[data-v-2a6d1b43]{display:block;width:100%;height:100%;color:#333}.sort-box .item.active .txt[data-v-2a6d1b43]{color:#b4282d}.sort-box .item.by-price[data-v-2a6d1b43]{background:url(//yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png) %?155?% 50% no-repeat;background-size:%?15?% %?21?%}.sort-box .item.by-price.active.asc[data-v-2a6d1b43]{background:url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-636b92c0a5.png) %?155?% 50% no-repeat;background-size:%?15?% %?21?%}.sort-box .item.by-price.active.desc[data-v-2a6d1b43]{background:url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-95e035f3e5.png) %?155?% 50% no-repeat;background-size:%?15?% %?21?%}.sort-box-category[data-v-2a6d1b43]{background:#fff;width:100%;height:auto;overflow:hidden;padding:%?40?% %?40?% 0 0;border-bottom:1px solid #d9d9d9}.sort-box-category .item[data-v-2a6d1b43]{height:%?54?%;line-height:%?54?%;text-align:center;float:left;padding:0 %?16?%;margin:0 0 %?40?% %?40?%;border:1px solid #666;color:#333;font-size:%?24?%}.sort-box-category .item.active[data-v-2a6d1b43]{color:#b4282d;border:1px solid #b4282d}.cate-item[data-v-2a6d1b43]{margin-top:%?175?%;height:auto;overflow:hidden}.cate-item .h[data-v-2a6d1b43]{height:%?145?%;width:%?750?%;display:flex;flex-direction:column;align-items:center;justify-content:center}.cate-item .h .name[data-v-2a6d1b43]{display:block;height:%?35?%;margin-bottom:%?18?%;font-size:%?30?%;color:#333}.cate-item .h .desc[data-v-2a6d1b43]{display:block;height:%?24?%;font-size:%?24?%;color:#999}.cate-item .b[data-v-2a6d1b43]{width:%?750?%;padding:0 %?6.25?%;height:auto;overflow:hidden}.cate-item .list-filter[data-v-2a6d1b43]{height:%?80?%;width:100%;background:#fff;margin-bottom:%?6.25?%}.cate-item .b .item[data-v-2a6d1b43]{float:left;background:#fff;width:%?365?%;margin-bottom:%?6.25?%;padding-bottom:%?33.333?%;height:auto;overflow:hidden;text-align:center}.cate-item .b .item-b[data-v-2a6d1b43]{margin-left:%?6.25?%}.cate-item .item .img[data-v-2a6d1b43]{width:%?302?%;height:%?302?%}.cate-item .item .name[data-v-2a6d1b43]{display:block;width:%?365.625?%;height:%?35?%;margin:%?11.5?% 0 %?22?% 0;text-align:center;overflow:hidden;padding:0 %?20?%;font-size:%?30?%;color:#333}.cate-item .item .price[data-v-2a6d1b43]{display:block;width:%?365.625?%;height:%?30?%;text-align:center;font-size:%?30?%;color:#b4282d}.search-result-empty[data-v-2a6d1b43]{width:100%;height:100%;padding-top:%?300?%}.search-result-empty .icon[data-v-2a6d1b43]{margin:0 auto;display:block;width:%?240?%;height:%?240?%}.search-result-empty .text[data-v-2a6d1b43]{display:block;width:100%;height:%?40?%;font-size:%?28?%;text-align:center;color:#999}",""]),t.exports=e},bfcc:function(t,e,a){"use strict";var i=a("1e27"),o=a.n(i);o.a},f900:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-scroll-view",{staticClass:"container",staticStyle:{height:"100%"}},[a("v-uni-view",{staticClass:"search-header"},[a("v-uni-view",{staticClass:"input-box"},[a("v-uni-image",{staticClass:"icon",attrs:{src:"http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png"}}),a("v-uni-input",{staticClass:"keywrod",attrs:{name:"input",focus:!0,value:t.keyword,"confirm-type":"search",placeholder:t.defaultKeyword.keyword},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputChange.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.inputFocus.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onKeywordConfirm.apply(void 0,arguments)}}}),t.keyword?a("v-uni-image",{staticClass:"del",attrs:{src:"http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clearKeyword.apply(void 0,arguments)}}}):t._e()],1),a("v-uni-view",{staticClass:"right",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closeSearch.apply(void 0,arguments)}}},[t._v("取消")])],1),t.searchStatus?t._e():a("v-uni-view",{staticClass:"no-search"},[!t.keyword&&t.historyKeyword.length?a("v-uni-view",{staticClass:"serach-keywords search-history"},[a("v-uni-view",{staticClass:"h"},[a("v-uni-text",{staticClass:"title"},[t._v("历史记录")]),a("v-uni-image",{staticClass:"icon",attrs:{src:"http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/del1-93f0a4add4.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clearHistory.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"b"},t._l(t.historyKeyword,(function(e,i){return a("v-uni-view",{key:i,staticClass:"item",attrs:{"data-keyword":e,"hover-class":"navigator-hover"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onKeywordTap.apply(void 0,arguments)}}},[t._v(t._s(e))])})),1)],1):t._e(),t.keyword?t._e():a("v-uni-view",{staticClass:"serach-keywords search-hot"},[a("v-uni-view",{staticClass:"h"},[a("v-uni-text",{staticClass:"title"},[t._v("热门搜索")])],1),a("v-uni-view",{staticClass:"b"},t._l(t.hotKeyword,(function(e,i){return a("v-uni-view",{key:i,class:"item "+(1===e.is_hot?"active":""),attrs:{"hover-class":"navigator-hover","data-keyword":e.keyword},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onKeywordTap.apply(void 0,arguments)}}},[t._v(t._s(e.keyword))])})),1)],1),t.keyword?a("v-uni-view",{staticClass:"shelper-list"},t._l(t.helpKeyword,(function(e,i){return a("v-uni-view",{key:i,staticClass:"item",attrs:{"hover-class":"navigator-hover","data-keyword":e},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onKeywordTap.apply(void 0,arguments)}}},[t._v(t._s(e))])})),1):t._e()],1),t.searchStatus&&t.goodsList.length?a("v-uni-view",{staticClass:"search-result"},[a("v-uni-view",{staticClass:"sort"},[a("v-uni-view",{staticClass:"sort-box"},[a("v-uni-view",{class:"item "+("default"==t.currentSortType?"active":""),attrs:{id:"defaultSort"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openSortFilter.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"txt"},[t._v("综合")])],1),a("v-uni-view",{class:"item by-price "+("price"==t.currentSortType?"active":"")+" "+("asc"==t.currentSortOrder?"asc":"desc"),attrs:{id:"priceSort"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openSortFilter.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"txt"},[t._v("价格")])],1),a("v-uni-view",{class:"item "+("category"==t.currentSortType?"active":""),attrs:{id:"categoryFilter"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openSortFilter.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"txt"},[t._v("分类")])],1)],1),t.categoryFilter?a("v-uni-view",{staticClass:"sort-box-category"},t._l(t.filterCategory,(function(e,i){return a("v-uni-view",{key:t.cate-+e.id,class:"item "+(e.checked?"active":""),attrs:{"data-category-index":i},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.selectCategory.apply(void 0,arguments)}}},[t._v(t._s(e.name))])})),1):t._e()],1),a("v-uni-view",{staticClass:"cate-item"},[a("v-uni-view",{staticClass:"b"},t._l(t.goodsList,(function(e,i){return a("v-uni-navigator",{key:i,class:"item "+((i+1)%2==0?"item-b":""),attrs:{url:(1006003===e.primary_product_id?"/pages/goodsTicket/goodsTicket?id=":"/pages/goods/goods?id=")+e.id}},[a("v-uni-image",{staticClass:"img",attrs:{src:e.list_pic_url,"background-size":"cover"}}),a("v-uni-text",{staticClass:"name"},[t._v(t._s(e.name))]),a("v-uni-text",{staticClass:"price"},[t._v("￥"+t._s(e.retail_price))])],1)})),1)],1)],1):t._e(),!t.goodsList.length&&t.searchStatus?a("v-uni-view",{staticClass:"search-result-empty"},[a("v-uni-image",{staticClass:"icon",attrs:{src:"http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noSearchResult-7572a94f32.png"}}),a("v-uni-text",{staticClass:"text"},[t._v("您寻找的商品还未上架")])],1):t._e()],1)],1)},o=[]}}]);