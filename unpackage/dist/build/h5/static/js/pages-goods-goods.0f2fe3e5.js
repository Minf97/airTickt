(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-goods-goods"],{"2aec":function(t,e,i){"use strict";i.r(e);var a=i("ac7e"),o=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=o.a},"58d0":function(t,e,i){"use strict";i.r(e);var a=i("a3e6"),o=i("2aec");for(var n in o)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(n);i("960e");var s=i("f0c5"),c=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"72e2047c",null,!1,a["a"],void 0);e["default"]=c.exports},7279:function(t,e,i){var a=i("ac35");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=i("4f06").default;o("33c2bd0a",a,!0,{sourceMap:!1,shadowMode:!1})},"960e":function(t,e,i){"use strict";var a=i("7279"),o=i.n(a);o.a},a3e6:function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return a}));var a={mpHtml:i("43bc").default},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"container"},[i("v-uni-swiper",{staticClass:"goodsimgs",attrs:{"indicator-dots":!0,autoplay:!0,interval:"3000",duration:"1000"}},t._l(t.gallery,(function(t,e){return i("v-uni-swiper-item",{key:t.id},[i("v-uni-image",{attrs:{src:t.img_url,"background-size":"cover"}})],1)})),1),i("v-uni-view",{staticClass:"goods-info"},[i("v-uni-view",{staticClass:"c"},[i("v-uni-text",{staticClass:"name"},[t._v(t._s(t.goods.name))]),i("v-uni-text",{staticClass:"desc"},[t._v(t._s(t.goods.goods_brief))]),i("v-uni-text",{staticClass:"price"},[t._v("￥"+t._s(t.goods.retail_price))]),t.brand.name?i("v-uni-view",{staticClass:"brand"},[i("v-uni-navigator",{attrs:{url:"../brandDetail/brandDetail?id="+t.brand.brandId}},[i("v-uni-text",[t._v(t._s(t.brand.name))])],1)],1):t._e()],1)],1),i("v-uni-view",{staticClass:"section-nav section-attr",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.switchAttrPop.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"t"},[t._v("请选择规格数量")]),i("v-uni-image",{staticClass:"i",attrs:{src:"/static/static/images/address_right.png","background-size":"cover"}})],1),t.comment.count>0?i("v-uni-view",{staticClass:"comments"},[i("v-uni-view",{staticClass:"h"},[i("v-uni-navigator",{attrs:{url:"../comment/comment?valueId="+t.goods.id+"&typeId=0"}},[i("v-uni-text",{staticClass:"t"},[t._v("评价("+t._s(t.comment.count>999?"999+":t.comment.count)+")")]),i("v-uni-text",{staticClass:"i"},[t._v("查看全部")])],1)],1),i("v-uni-view",{staticClass:"b"},[i("v-uni-view",{staticClass:"item"},[i("v-uni-view",{staticClass:"info"},[i("v-uni-view",{staticClass:"user"},[i("v-uni-image",{attrs:{src:t.comment.data.avatar}}),i("v-uni-text",[t._v(t._s(t.comment.data.nickname))])],1),i("v-uni-view",{staticClass:"time"},[t._v(t._s(t.comment.data.add_time))])],1),i("v-uni-view",{staticClass:"content"},[t._v(t._s(t.comment.data.content))]),t.comment.data.pic_list.length>0?i("v-uni-view",{staticClass:"imgs"},t._l(t.comment.data.pic_list,(function(t,e){return i("v-uni-image",{key:t.id,staticClass:"img",attrs:{src:t.pic_url}})})),1):t._e()],1)],1)],1):t._e(),i("v-uni-view",{staticClass:"goods-attr"},[i("v-uni-view",{staticClass:"t"},[t._v("商品参数")]),i("v-uni-view",{staticClass:"l"},t._l(t.attribute,(function(e,a){return i("v-uni-view",{key:e.name,staticClass:"item"},[i("v-uni-text",{staticClass:"left"},[t._v(t._s(e.name))]),i("v-uni-text",{staticClass:"right"},[t._v(t._s(e.value))])],1)})),1)],1),i("v-uni-view",{staticClass:"detail",staticStyle:{"background-color":"#fff"}},[i("mp-html",{attrs:{content:t.article_goodsDetail}})],1),i("v-uni-view",{staticClass:"common-problem"},[i("v-uni-view",{staticClass:"h"},[i("v-uni-view",{staticClass:"line"}),i("v-uni-text",{staticClass:"title"},[t._v("常见问题")])],1),i("v-uni-view",{staticClass:"b"},t._l(t.issueList,(function(e,a){return i("v-uni-view",{key:e.id,staticClass:"item"},[i("v-uni-view",{staticClass:"question-box"},[i("v-uni-text",{staticClass:"spot"}),i("v-uni-text",{staticClass:"question"},[t._v(t._s(e.question))])],1),i("v-uni-view",{staticClass:"answer"},[t._v(t._s(e.answer))])],1)})),1)],1),t.relatedGoods.length>0?i("v-uni-view",{staticClass:"related-goods"},[i("v-uni-view",{staticClass:"h"},[i("v-uni-view",{staticClass:"line"}),i("v-uni-text",{staticClass:"title"},[t._v("大家都在看")])],1),i("v-uni-view",{staticClass:"b"},t._l(t.relatedGoods,(function(e,a){return i("v-uni-view",{key:e.id,staticClass:"item"},[i("v-uni-navigator",{attrs:{url:"/pages/goods/goods?id="+e.id}},[i("v-uni-image",{staticClass:"img",attrs:{src:e.list_pic_url,"background-size":"cover"}}),i("v-uni-text",{staticClass:"name"},[t._v(t._s(e.name))]),i("v-uni-text",{staticClass:"price"},[t._v("￥"+t._s(e.retail_price))])],1)],1)})),1)],1):t._e()],1),t.openAttr?i("v-uni-view",{staticClass:"attr-pop-box"},[i("v-uni-view",{staticClass:"attr-pop"},[i("v-uni-view",{staticClass:"close",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closeAttr.apply(void 0,arguments)}}},[i("v-uni-image",{staticClass:"icon",attrs:{src:"/static/static/images/icon_close.png"}})],1),i("v-uni-view",{staticClass:"img-info"},[i("v-uni-image",{staticClass:"img",attrs:{src:t.gallery[0].img_url}}),i("v-uni-view",{staticClass:"info"},[i("v-uni-view",{staticClass:"c"},[i("v-uni-view",{staticClass:"p"},[t._v("价格：￥"+t._s(t.retail_price>0?(t.retail_price||t.goods.retail_price)*(t.number||1):t.retail_price))]),t.productList.length>0?i("v-uni-view",{staticClass:"a"},[t._v("已选择："+t._s(t.checkedSpecText))]):t._e()],1)],1)],1),i("v-uni-view",{staticClass:"spec-con"},[t._l(t.specificationList,(function(e,a){return i("v-uni-view",{key:e.specification_id,staticClass:"spec-item"},[i("v-uni-view",{staticClass:"name"},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"values"},t._l(e.valueList,(function(e,a){return i("v-uni-view",{key:e.id,class:"value "+(e.checked?"selected":""),attrs:{"data-value-id":e.id,"data-name-id":e.specification_id},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickSkuValue.apply(void 0,arguments)}}},[t._v(t._s(e.value))])})),1)],1)})),i("v-uni-view",{staticClass:"number-item"},[i("v-uni-view",{staticClass:"name"},[t._v("数量")]),i("v-uni-view",{staticClass:"selnum"},[i("v-uni-view",{staticClass:"cut",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.cutNumber.apply(void 0,arguments)}}},[t._v("-")]),i("v-uni-input",{staticClass:"number",attrs:{value:t.number,disabled:!0,type:"number"}}),i("v-uni-view",{staticClass:"add",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addNumber.apply(void 0,arguments)}}},[t._v("+")])],1)],1)],2)],1)],1):t._e(),i("v-uni-view",{staticClass:"bottom-btn"},[i("v-uni-view",{staticClass:"l l-collect",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addCannelCollect.apply(void 0,arguments)}}},[i("v-uni-image",{staticClass:"icon",attrs:{src:t.collectBackImage}})],1),i("v-uni-view",{staticClass:"l l-cart"},[i("v-uni-view",{staticClass:"box"},[i("v-uni-text",{staticClass:"cart-count"},[t._v(t._s(t.cartGoodsCount))]),i("v-uni-image",{staticClass:"icon",attrs:{src:"/static/static/images/ic_menu_shoping_nor.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openCartPage.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"r",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addToCart.apply(void 0,arguments)}}},[t._v("加入购物车")])],1)],1)},n=[]},ac35:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".container[data-v-72e2047c]{margin-bottom:%?100?%}.goodsimgs[data-v-72e2047c]{width:%?750?%;height:%?750?%}.goodsimgs uni-image[data-v-72e2047c]{width:%?750?%;height:%?750?%}.service-policy[data-v-72e2047c]{width:%?750?%;height:%?73?%;background:#f4f4f4;padding:0 %?31.25?%;display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between}.service-policy .item[data-v-72e2047c]{background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png) 0 no-repeat;background-size:%?10?%;padding-left:%?15?%;display:flex;align-items:center;font-size:%?25?%;color:#666}.goods-info[data-v-72e2047c]{width:%?750?%;height:%?306?%;overflow:hidden;background:#fff}.goods-info .c[data-v-72e2047c]{display:block;width:%?718.75?%;height:100%;margin-left:%?31.25?%;padding:%?38?% %?31.25?% %?38?% 0;border-bottom:1px solid #f4f4f4}.goods-info .c uni-text[data-v-72e2047c]{display:block;width:%?687.5?%;text-align:center}.goods-info .name[data-v-72e2047c]{height:%?41?%;margin-bottom:%?5.208?%;font-size:%?41?%;line-height:%?41?%}.goods-info .desc[data-v-72e2047c]{height:%?43?%;margin-bottom:%?41?%;font-size:%?24?%;line-height:%?36?%;color:#999}.goods-info .price[data-v-72e2047c]{height:%?35?%;font-size:%?35?%;line-height:%?35?%;color:#b4282d}.goods-info .brand[data-v-72e2047c]{margin-top:%?23?%;min-height:%?40?%;text-align:center}.goods-info .brand uni-text[data-v-72e2047c]{display:inline-block;width:auto;padding:2px %?30?% 2px %?10.5?%;line-height:%?35.5?%;border:1px solid #f48f18;font-size:%?25?%;color:#f48f18;border-radius:4px;background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/detailTagArrow-18bee52dab.png) 95% no-repeat;background-size:%?10.75?% %?18.75?%}.section-nav[data-v-72e2047c]{width:%?750?%;height:%?108?%;background:#fff;margin-bottom:%?20?%}.section-nav .t[data-v-72e2047c]{float:left;width:%?600?%;height:%?108?%;line-height:%?108?%;font-size:%?29?%;color:#333;margin-left:%?31.25?%}.section-nav .i[data-v-72e2047c]{float:right;width:%?52?%;height:%?52?%;margin-right:%?16?%;margin-top:%?28?%}.section-act .t[data-v-72e2047c]{float:left;display:flex;align-items:center;width:%?600?%;height:%?108?%;overflow:hidden;line-height:%?108?%;font-size:%?29?%;color:#999;margin-left:%?31.25?%}.section-act .label[data-v-72e2047c]{color:#999}.section-act .tag[data-v-72e2047c]{display:flex;align-items:center;padding:0 %?10?%;border-radius:3px;height:%?37?%;width:auto;color:#f48f18;overflow:hidden;border:1px solid #f48f18;font-size:%?25?%;margin:0 %?10?%}.section-act .text[data-v-72e2047c]{display:flex;align-items:center;height:%?37?%;width:auto;overflow:hidden;color:#f48f18;font-size:%?29?%}.comments[data-v-72e2047c]{width:100%;height:auto;padding-left:%?30?%;background:#fff;margin:%?20?% 0}.comments .h[data-v-72e2047c]{height:%?102.5?%;line-height:%?100.5?%;width:%?718.75?%;padding-right:%?16?%;border-bottom:1px solid #d9d9d9}.comments .h .t[data-v-72e2047c]{display:block;float:left;width:50%;font-size:%?38.5?%;color:#333}.comments .h .i[data-v-72e2047c]{display:block;float:right;width:%?164?%;height:%?100.5?%;line-height:%?100.5?%;background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/address-right-990628faa7.png) 100% no-repeat;background-size:%?52?%}.comments .b[data-v-72e2047c]{height:auto;width:%?720?%}.comments .item[data-v-72e2047c]{height:auto;width:%?720?%;overflow:hidden}.comments .info[data-v-72e2047c]{height:%?127?%;width:100%;padding:%?33?% 0 %?27?% 0}.comments .user[data-v-72e2047c]{float:left;width:auto;height:%?67?%;line-height:%?67?%;font-size:0}.comments .user uni-image[data-v-72e2047c]{float:left;width:%?67?%;height:%?67?%;margin-right:%?17?%;border-radius:50%}.comments .user uni-text[data-v-72e2047c]{display:inline-block;width:auto;height:%?66?%;overflow:hidden;font-size:%?29?%;line-height:%?66?%}.comments .time[data-v-72e2047c]{display:block;float:right;width:auto;height:%?67?%;line-height:%?67?%;color:#7f7f7f;font-size:%?25?%;margin-right:%?30?%}.comments .content[data-v-72e2047c]{width:%?720?%;padding-right:%?30?%;line-height:%?45.8?%;font-size:%?29?%;margin-bottom:%?24?%}.comments .imgs[data-v-72e2047c]{width:%?720?%;height:auto;margin-bottom:%?25?%}.comments .imgs .img[data-v-72e2047c]{height:%?150?%;width:%?150?%;margin-right:%?28?%}.comments .spec[data-v-72e2047c]{width:%?720?%;padding-right:%?30?%;line-height:%?30?%;font-size:%?24?%;color:#999;margin-bottom:%?30?%}.goods-attr[data-v-72e2047c]{width:%?750?%;height:auto;overflow:hidden;padding:0 %?31.25?% %?25?% %?31.25?%;background:#fff}.goods-attr .t[data-v-72e2047c]{width:%?687.5?%;height:%?104?%;line-height:%?104?%;font-size:%?38.5?%}.goods-attr .item[data-v-72e2047c]{width:%?687.5?%;height:%?68?%;padding:%?11?% %?20?%;margin-bottom:%?11?%;background:#f7f7f7;font-size:%?38.5?%}.goods-attr .left[data-v-72e2047c]{float:left;font-size:%?25?%;width:%?134?%;height:%?45?%;line-height:%?45?%;overflow:hidden;color:#999}.goods-attr .right[data-v-72e2047c]{float:left;font-size:%?36.5?%;margin-left:%?20?%;width:%?480?%;height:%?45?%;line-height:%?45?%;overflow:hidden;color:#333}.detail[data-v-72e2047c]{width:%?750?%;height:auto;overflow:hidden}.detail uni-image[data-v-72e2047c]{width:%?750?%;display:block}.common-problem[data-v-72e2047c]{width:%?750?%;height:auto;overflow:hidden}.common-problem .h[data-v-72e2047c]{position:relative;height:%?145.5?%;width:%?750?%;padding:%?56.25?% 0;background:#fff;text-align:center}.common-problem .h .line[data-v-72e2047c]{display:inline-block;position:absolute;top:%?72?%;left:0;z-index:2;height:1px;margin-left:%?225?%;width:%?300?%;background:#ccc}.common-problem .h .title[data-v-72e2047c]{display:inline-block;position:absolute;top:%?56.125?%;left:0;z-index:3;height:%?33?%;margin-left:%?285?%;width:%?180?%;background:#fff}.common-problem .b[data-v-72e2047c]{width:%?750?%;height:auto;overflow:hidden;padding:%?0?% %?30?%;background:#fff}.common-problem .item[data-v-72e2047c]{height:auto;overflow:hidden;padding-bottom:%?25?%}.common-problem .question-box .spot[data-v-72e2047c]{float:left;display:block;height:%?8?%;width:%?8?%;background:#b4282d;border-radius:50%;margin-top:%?11?%}.common-problem .question-box .question[data-v-72e2047c]{float:left;line-height:%?30?%;padding-left:%?8?%;display:block;font-size:%?26?%;padding-bottom:%?15?%;color:#303030}.common-problem .answer[data-v-72e2047c]{line-height:%?36?%;padding-left:%?16?%;font-size:%?26?%;color:#787878}.related-goods[data-v-72e2047c]{width:%?750?%;height:auto;overflow:hidden}.related-goods .h[data-v-72e2047c]{position:relative;height:%?145.5?%;width:%?750?%;padding:%?56.25?% 0;background:#fff;text-align:center;border-bottom:1px solid #f4f4f4}.related-goods .h .line[data-v-72e2047c]{display:inline-block;position:absolute;top:%?72?%;left:0;z-index:2;height:1px;margin-left:%?225?%;width:%?300?%;background:#ccc}.related-goods .h .title[data-v-72e2047c]{display:inline-block;position:absolute;top:%?56.125?%;left:0;z-index:3;height:%?33?%;margin-left:%?285?%;width:%?180?%;background:#fff}.related-goods .b[data-v-72e2047c]{width:%?750?%;height:auto;overflow:hidden}.related-goods .b .item[data-v-72e2047c]{float:left;background:#fff;width:%?375?%;height:auto;overflow:hidden;text-align:center;padding:%?15?% %?31.25?%;border-right:1px solid #f4f4f4;border-bottom:1px solid #f4f4f4}.related-goods .item .img[data-v-72e2047c]{width:%?311.45?%;height:%?311.45?%}.related-goods .item .name[data-v-72e2047c]{display:block;width:%?311.45?%;height:%?35?%;margin:%?11.5?% 0 %?15?% 0;text-align:center;overflow:hidden;font-size:%?30?%;color:#333}.related-goods .item .price[data-v-72e2047c]{display:block;width:%?311.45?%;height:%?30?%;text-align:center;font-size:%?30?%;color:#b4282d}.bottom-btn[data-v-72e2047c]{position:fixed;left:0;bottom:0;z-index:10;width:%?750?%;height:%?100?%;display:flex;background:#fff}.bottom-btn .l[data-v-72e2047c]{float:left;height:%?100?%;width:%?162?%;border:1px solid #f4f4f4;display:flex;align-items:center;justify-content:center}.bottom-btn .l.l-collect[data-v-72e2047c]{border-right:none;border-left:none;text-align:center}.bottom-btn .l.l-cart .box[data-v-72e2047c]{position:relative;height:%?60?%;width:%?60?%}.bottom-btn .l.l-cart .cart-count[data-v-72e2047c]{height:%?28?%;width:%?28?%;z-index:10;position:absolute;top:0;right:0;background:#b4282d;text-align:center;font-size:%?18?%;color:#fff;line-height:%?28?%;border-radius:50%}.bottom-btn .l.l-cart .icon[data-v-72e2047c]{position:absolute;top:%?10?%;left:0}.bottom-btn .l .icon[data-v-72e2047c]{display:block;height:%?44?%;width:%?44?%}.bottom-btn .c[data-v-72e2047c]{float:left;height:%?100?%;line-height:%?96?%;flex:1;text-align:center;color:#333;border-top:1px solid #f4f4f4;border-bottom:1px solid #f4f4f4}.bottom-btn .r[data-v-72e2047c]{border:1px solid #b4282d;background:#b4282d;float:left;height:%?100?%;line-height:%?96?%;flex:1;text-align:center;color:#fff}.attr-pop-box[data-v-72e2047c]{width:100%;height:100%;position:fixed;background:rgba(0,0,0,.5);z-index:8;bottom:0\r\n\t/* display: none; */}.attr-pop[data-v-72e2047c]{width:100%;height:auto;\r\n\t/* max-height: 780rpx; */padding:%?31.25?%;background:#fff;position:fixed;z-index:9;bottom:%?100?%}.attr-pop .close[data-v-72e2047c]{position:absolute;width:%?48?%;height:%?48?%;right:%?31.25?%;overflow:hidden;top:%?31.25?%}.attr-pop .close .icon[data-v-72e2047c]{width:%?48?%;height:%?48?%}.attr-pop .img-info[data-v-72e2047c]{width:%?750?%;height:%?177?%;\r\n\t/* overflow: hidden; */margin-bottom:%?41.5?%}.attr-pop .img[data-v-72e2047c]{float:left;height:%?177?%;width:%?177?%;background:#f4f4f4;margin-right:%?31.25?%}.attr-pop .info[data-v-72e2047c]{float:left;height:%?177?%;display:flex;align-items:center}.attr-pop .p[data-v-72e2047c]{font-size:%?33?%;color:#333;height:%?33?%;line-height:%?33?%;margin-bottom:%?10?%}.attr-pop .a[data-v-72e2047c]{font-size:%?29?%;color:#333;height:%?40?%;line-height:%?40?%}.spec-con[data-v-72e2047c]{width:100%;height:auto;overflow:hidden}.spec-con .name[data-v-72e2047c]{height:%?32?%;margin-bottom:%?22?%;font-size:%?29?%;color:#333}.spec-con .values[data-v-72e2047c]{height:auto;margin-bottom:%?31.25?%;font-size:0}.spec-con .value[data-v-72e2047c]{display:inline-block;height:%?62?%;padding:0 %?35?%;line-height:%?56?%;text-align:center;margin-right:%?25?%;margin-bottom:%?16.5?%;border:1px solid #333;font-size:%?25?%;color:#333}.spec-con .value.disable[data-v-72e2047c]{border:1px solid #ccc;color:#ccc}.spec-con .value.selected[data-v-72e2047c]{border:1px solid #b4282d;color:#b4282d}.number-item .selnum[data-v-72e2047c]{width:%?322?%;height:%?71?%;border:1px solid #ccc;display:flex}.number-item .cut[data-v-72e2047c]{width:%?93.75?%;height:100%;text-align:center;line-height:%?65?%}.number-item .number[data-v-72e2047c]{flex:1;height:100%;text-align:center;line-height:%?68.75?%;border-left:1px solid #ccc;border-right:1px solid #ccc;float:left}.number-item .add[data-v-72e2047c]{width:%?93.75?%;height:100%;text-align:center;line-height:%?65?%}",""]),t.exports=e},ac7e:function(t,e,i){"use strict";(function(t){i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("e25e"),i("d3b7"),i("d81d"),i("4de4"),i("e9c4"),i("4e82"),i("ac1f"),i("1276");getApp();var a=i("2e67"),o=i("2771"),n={data:function(){return{id:0,retail_price:"",goods:{name:"",goods_brief:"",retail_price:"",id:""},gallery:[],attribute:[],issueList:[],comment:[],brand:{name:"",brandId:""},specificationList:[],productList:[],relatedGoods:[],cartGoodsCount:0,userHasCollect:0,number:1,checkedSpecText:"请选择规格数量",openAttr:!1,noCollectImage:"/static/static/images/icon_collect.png",hasCollectImage:"/static/static/images/icon_collect_checked.png",collectBackImage:"/static/static/images/icon_collect.png",avatar:"",nickname:"",add_time:"",content:"",pic_list:[],article_goodsDetail:"",img_url:"",vitem:{checked:!1,id:"",specification_id:"",value:""}}},onLoad:function(t){this.setData({id:parseInt(t.id)});var e=this;this.getGoodsInfo(),a.request(o.CartGoodsCount).then((function(t){0===t.errno&&e.setData({cartGoodsCount:t.data.cartTotal.goodsCount})}))},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},methods:{getGoodsInfo:function(){var t=this;a.request(o.GoodsDetail,{id:t.id}).then((function(e){0===e.errno&&(t.setData({goods:e.data.info,gallery:e.data.gallery,attribute:e.data.attribute,issueList:e.data.issue,comment:e.data.comment,brand:e.data.brand,specificationList:e.data.specificationList,productList:e.data.productList,userHasCollect:e.data.userHasCollect}),1==e.data.userHasCollect?t.setData({collectBackImage:t.hasCollectImage}):t.setData({collectBackImage:t.noCollectImage}),t.article_goodsDetail=t.escape2Html(e.data.info.goods_desc),t.getGoodsRelated())}))},getGoodsRelated:function(){var t=this;a.request(o.GoodsRelated,{id:t.id}).then((function(e){0===e.errno&&t.setData({relatedGoods:e.data.goodsList})}))},clickSkuValue:function(t){for(var e=t.currentTarget.dataset.nameId,i=t.currentTarget.dataset.valueId,a=this.specificationList,o=0;o<a.length;o++)if(a[o].specification_id==e)for(var n=0;n<a[o].valueList.length;n++)a[o].valueList[n].id==i?a[o].valueList[n].checked?a[o].valueList[n].checked=!1:a[o].valueList[n].checked=!0:a[o].valueList[n].checked=!1;this.setData({specificationList:a}),this.changeSpecInfo()},getCheckedSpecValue:function(){var e=[];t("log",this.specificationList,234," at pages/goods/goods.vue:339");for(var i=this.specificationList,a=0;a<i.length;a++){for(var o={nameId:i[a].specification_id,valueId:0,valueText:""},n=0;n<i[a].valueList.length;n++)i[a].valueList[n].checked&&(o.valueId=i[a].valueList[n].id,o.valueText=i[a].valueList[n].value);e.push(o)}return e},setSpecValueStatus:function(){},isCheckedAllSpec:function(){return!this.getCheckedSpecValue().some((function(t){if(0==t.valueId)return!0}))},getCheckedSpecKey:function(){t("log",231,this.getCheckedSpecValue()," at pages/goods/goods.vue:375");var e=this.getCheckedSpecValue().map((function(t){return t.valueId}));return t("log",233,e," at pages/goods/goods.vue:379"),e.join("_")},changeSpecInfo:function(){var e=this.getCheckedSpecValue(),i=e.filter((function(t){return 0!=t.valueId})).map((function(t){return t.valueText}));this.retail_price="此类暂时没有";var a=this.getCheckedProductItem(this.getCheckedSpecKey());t("log",a," at pages/goods/goods.vue:403"),a.length>0&&(this.retail_price=a[0].retail_price),i.length>0?this.setData({checkedSpecText:i.join("　")}):this.setData({checkedSpecText:"请选择规格数量"})},getCheckedProductItem:function(e){return t("log",123,e," at pages/goods/goods.vue:422"),1===this.productList.length?this.productList:this.productList.filter((function(t){return!(!t.goods_specification_ids||JSON.stringify(t.goods_specification_ids.split("_").sort())!==JSON.stringify(e.split("_").sort()))}))},switchAttrPop:function(){0==this.openAttr&&this.setData({openAttr:!this.openAttr})},closeAttr:function(){this.setData({openAttr:!1})},addCannelCollect:function(){var t=this;a.request(o.CollectAddOrDelete,{typeId:0,valueId:this.id},"POST").then((function(e){var i=e;0==i.errno?"add"==i.data.type?t.setData({collectBackImage:t.hasCollectImage}):t.setData({collectBackImage:t.noCollectImage}):uni.showToast({image:"/static/static/images/icon_error.png",title:i.errmsg,mask:!0})}))},openCartPage:function(){uni.switchTab({url:"/pages/cart/cart"})},addToCart:function(){var e=this;if(!1===this.openAttr)this.setData({openAttr:!this.openAttr});else{if(!this.isCheckedAllSpec())return uni.showToast({image:"/static/static/images/icon_error.png",title:"请选择规格",mask:!0}),!1;var i=this.getCheckedProductItem(this.getCheckedSpecKey());if(t("log",i," at pages/goods/goods.vue:515"),!i||i.length<=0)return uni.showToast({image:"/static/static/images/icon_error.png",title:"库存不足",mask:!0}),!1;if(i.goods_number<this.number)return uni.showToast({image:"/static/static/images/icon_error.png",title:"库存不足",mask:!0}),!1;a.request(o.CartAdd,{goodsId:this.goods.id,number:this.number,productId:i[0].id},"POST").then((function(t){var i=t;0==i.errno?(uni.showToast({title:"添加成功"}),e.setData({openAttr:!e.openAttr,cartGoodsCount:i.data.cartTotal.goodsCount})):uni.showToast({image:"/static/static/images/icon_error.png",title:i.errmsg,mask:!0})}))}},cutNumber:function(){this.setData({number:this.number-1>1?this.number-1:1})},addNumber:function(){this.setData({number:this.number+1})}}};e.default=n}).call(this,i("0de9")["log"])}}]);