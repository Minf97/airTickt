(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-goodsTicket-goodsTicket"],{"0626":function(t,e,i){"use strict";i.r(e);var o=i("246f"),a=i("e8e1");for(var d in a)["default"].indexOf(d)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(d);i("4ebb");var n=i("f0c5"),r=Object(n["a"])(a["default"],o["b"],o["c"],!1,null,"74fd4f62",null,!1,o["a"],void 0);e["default"]=r.exports},"246f":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"container"},[i("v-uni-swiper",{staticClass:"goodsimgs",attrs:{"indicator-dots":!0,autoplay:!0,interval:"3000",duration:"1000"}},t._l(t.gallery,(function(t,e){return i("v-uni-swiper-item",{key:t.id},[i("v-uni-image",{attrs:{src:t.img_url,"background-size":"cover"}})],1)})),1),i("v-uni-view",{staticClass:"box"},[i("v-uni-view",{staticClass:"b1"},[i("v-uni-view",{staticClass:"gong"},[t._v("公众日门票")]),i("v-uni-view",{staticClass:"zhuan"},[t._v("专业日门票")])],1),i("v-uni-view",{staticClass:"zhuanTip"},[i("v-uni-view",{staticClass:"colorbox"}),i("v-uni-view",{staticClass:"contenttip"},[t._v(t._s(t.ticketRi))])],1),i("v-uni-view",{staticClass:"pType"},[i("v-uni-view",[t._v("票 种")]),t._l(t.ticketType,(function(e){return i("v-uni-view",{staticClass:"active"},[t._v("实物票")])}))],2),i("v-uni-view",{staticClass:"zhuanTip"},[i("v-uni-view",{staticClass:"colorbox"}),i("v-uni-view",{staticClass:"contenttip"},[t._v(t._s(t.ticketTip))])],1),i("v-uni-view",{staticClass:"pType"},[i("v-uni-view",[t._v("日期")]),i("v-uni-view",{staticClass:"noActive"},[t._v("2022-11-09")]),i("v-uni-view",{staticClass:"active"},[t._v("2022-11-10")]),i("v-uni-view",{staticClass:"noActive"},[t._v("2022-11-08")])],1),i("v-uni-view",{staticClass:"pDan"},[i("v-uni-view",{staticClass:"pd"},[i("v-uni-view",{staticClass:"pd1"},[i("v-uni-view",[t._v("单日单次票")]),i("v-uni-image",{attrs:{src:"",mode:""}})],1),i("v-uni-view",{staticClass:"pd2"},[t._v("￥1200.00")]),i("v-uni-view",{staticClass:"pd3"},[i("v-uni-view",{staticClass:"j"},[t._v("-")]),i("v-uni-view",{staticClass:"count"},[t._v("1")]),i("v-uni-view",{staticClass:"j"},[t._v("+")])],1)],1),i("v-uni-view",{staticClass:"pd"},[i("v-uni-view",{staticClass:"pd1"},[i("v-uni-view",[t._v("多日多次票")]),i("v-uni-image",{attrs:{src:"",mode:""}})],1),i("v-uni-view",{staticClass:"pd2"},[t._v("￥2200.00")]),i("v-uni-view",{staticClass:"pd3"},[i("v-uni-view",{staticClass:"j"},[t._v("-")]),i("v-uni-view",{staticClass:"count"},[t._v("1")]),i("v-uni-view",{staticClass:"j"},[t._v("+")])],1)],1)],1),i("v-uni-view",{staticClass:"buy"},[t._v("立即订购")])],1)],1)],1)},a=[]},2771:function(t,e){var i="http://192.168.1.114:8360/api/";t.exports={ApiRootUrl:i,IndexUrl:i+"index/index",CatalogList:i+"catalog/index",CatalogCurrent:i+"catalog/current",AuthLoginByWeixin:i+"auth/loginByWeixin",GoodsCount:i+"goods/count",GoodsList:i+"goods/list",GoodsCategory:i+"goods/category",GoodsDetail:i+"goods/detail",GoodsNew:i+"goods/new",GoodsHot:i+"goods/hot",GoodsRelated:i+"goods/related",BrandList:i+"brand/list",BrandDetail:i+"brand/detail",CartList:i+"cart/index",CartAdd:i+"cart/add",CartUpdate:i+"cart/update",CartDelete:i+"cart/delete",CartChecked:i+"cart/checked",CartGoodsCount:i+"cart/goodscount",CartCheckout:i+"cart/checkout",OrderSubmit:i+"order/submit",PayPrepayId:i+"pay/prepay",CollectList:i+"collect/list",CollectAddOrDelete:i+"collect/addordelete",CommentList:i+"comment/list",CommentCount:i+"comment/count",CommentPost:i+"comment/post",TopicList:i+"topic/list",TopicDetail:i+"topic/detail",TopicRelated:i+"topic/related",SearchIndex:i+"search/index",SearchResult:i+"search/result",SearchHelper:i+"search/helper",SearchClearHistory:i+"search/clearhistory",AddressList:i+"address/list",AddressDetail:i+"address/detail",AddressSave:i+"address/save",AddressDelete:i+"address/delete",RegionList:i+"region/list",OrderList:i+"order/list",OrderDetail:i+"order/detail",OrderCancel:i+"order/cancel",OrderExpress:i+"order/express",FootprintList:i+"footprint/list",FootprintDelete:i+"footprint/delete"}},2909:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return(0,o.default)(t)||(0,a.default)(t)||(0,d.default)(t)||(0,n.default)()};var o=r(i("6005")),a=r(i("db90")),d=r(i("06c5")),n=r(i("3427"));function r(t){return t&&t.__esModule?t:{default:t}}},"2e67":function(t,e,i){(function(e){i("d81d"),i("d401"),i("d3b7"),i("25f0");var o=i("2771");function a(t){return t=t.toString(),t[1]?t:"0"+t}function d(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";return new Promise((function(s,f){uni.request({url:t,data:i,method:a,header:{"Content-Type":"application/json","X-Nideshop-Token":uni.getStorageSync("token")},success:function(t){if(e("log","success"," at utils/util.js:32"),200==t.statusCode){if(401==t.data.errno){var i=null;return n().then((function(t){return i=t.code,r()})).then((function(t){d(o.AuthLoginByWeixin,{code:i,userInfo:t},"POST").then((function(t){0===t.errno?(uni.setStorageSync("userInfo",t.data.userInfo),uni.setStorageSync("token",t.data.token),s(t)):f(t)})).catch((function(t){f(t)}))})).catch((function(t){f(t)}))}s(t.data)}else f(t.errMsg)},fail:function(t){f(t),e("log","failed"," at utils/util.js:79")}})}))}function n(){return new Promise((function(t,e){uni.login({success:function(i){i.code?t(i.code):e(i)},fail:function(t){e(t)}})}))}function r(){return new Promise((function(t,e){uni.getUserInfo({withCredentials:!0,success:function(i){"getUserInfo:ok"===i.detail.errMsg?t(i):e(i)},fail:function(t){e(t)}})}))}t.exports={formatTime:function(t){var e=t.getFullYear(),i=t.getMonth()+1,o=t.getDate(),d=t.getHours(),n=t.getMinutes(),r=t.getSeconds();return[e,i,o].map(a).join("-")+" "+[d,n,r].map(a).join(":")},request:d,get:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return d(t,e,"GET")},post:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return d(t,e,"POST")},redirect:function(t){uni.redirectTo({url:t})},showErrorToast:function(t){uni.showToast({title:t,image:"/static/static/images/icon_error.png"})},checkSession:function(){return new Promise((function(t,e){uni.checkSession({success:function(){t(!0)},fail:function(){e(!1)}})}))},login:n,getUserInfo:r}}).call(this,i("0de9")["log"])},3427:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},i("d9e2"),i("d401")},"4c31":function(t,e,i){var o=i("24fb");e=o(!1),e.push([t.i,".container[data-v-74fd4f62]{margin-bottom:%?100?%}.goodsimgs[data-v-74fd4f62]{width:%?750?%;height:%?750?%}.goodsimgs uni-image[data-v-74fd4f62]{width:%?750?%;height:%?750?%}.service-policy[data-v-74fd4f62]{width:%?750?%;height:%?73?%;background:#f4f4f4;padding:0 %?31.25?%;display:flex;flex-flow:row nowrap;align-items:center;justify-content:space-between}.service-policy .item[data-v-74fd4f62]{background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png) 0 no-repeat;background-size:%?10?%;padding-left:%?15?%;display:flex;align-items:center;font-size:%?25?%;color:#666}.goods-info[data-v-74fd4f62]{width:%?750?%;height:%?306?%;overflow:hidden;background:#fff}.goods-info .c[data-v-74fd4f62]{display:block;width:%?718.75?%;height:100%;margin-left:%?31.25?%;padding:%?38?% %?31.25?% %?38?% 0;border-bottom:1px solid #f4f4f4}.goods-info .c uni-text[data-v-74fd4f62]{display:block;width:%?687.5?%;text-align:center}.goods-info .name[data-v-74fd4f62]{height:%?41?%;margin-bottom:%?5.208?%;font-size:%?41?%;line-height:%?41?%}.goods-info .desc[data-v-74fd4f62]{height:%?43?%;margin-bottom:%?41?%;font-size:%?24?%;line-height:%?36?%;color:#999}.goods-info .price[data-v-74fd4f62]{height:%?35?%;font-size:%?35?%;line-height:%?35?%;color:#b4282d}.goods-info .brand[data-v-74fd4f62]{margin-top:%?23?%;min-height:%?40?%;text-align:center}.goods-info .brand uni-text[data-v-74fd4f62]{display:inline-block;width:auto;padding:2px %?30?% 2px %?10.5?%;line-height:%?35.5?%;border:1px solid #f48f18;font-size:%?25?%;color:#f48f18;border-radius:4px;background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/detailTagArrow-18bee52dab.png) 95% no-repeat;background-size:%?10.75?% %?18.75?%}.section-nav[data-v-74fd4f62]{width:%?750?%;height:%?108?%;background:#fff;margin-bottom:%?20?%}.section-nav .t[data-v-74fd4f62]{float:left;width:%?600?%;height:%?108?%;line-height:%?108?%;font-size:%?29?%;color:#333;margin-left:%?31.25?%}.section-nav .i[data-v-74fd4f62]{float:right;width:%?52?%;height:%?52?%;margin-right:%?16?%;margin-top:%?28?%}.section-act .t[data-v-74fd4f62]{float:left;display:flex;align-items:center;width:%?600?%;height:%?108?%;overflow:hidden;line-height:%?108?%;font-size:%?29?%;color:#999;margin-left:%?31.25?%}.section-act .label[data-v-74fd4f62]{color:#999}.section-act .tag[data-v-74fd4f62]{display:flex;align-items:center;padding:0 %?10?%;border-radius:3px;height:%?37?%;width:auto;color:#f48f18;overflow:hidden;border:1px solid #f48f18;font-size:%?25?%;margin:0 %?10?%}.section-act .text[data-v-74fd4f62]{display:flex;align-items:center;height:%?37?%;width:auto;overflow:hidden;color:#f48f18;font-size:%?29?%}.comments[data-v-74fd4f62]{width:100%;height:auto;padding-left:%?30?%;background:#fff;margin:%?20?% 0}.comments .h[data-v-74fd4f62]{height:%?102.5?%;line-height:%?100.5?%;width:%?718.75?%;padding-right:%?16?%;border-bottom:1px solid #d9d9d9}.comments .h .t[data-v-74fd4f62]{display:block;float:left;width:50%;font-size:%?38.5?%;color:#333}.comments .h .i[data-v-74fd4f62]{display:block;float:right;width:%?164?%;height:%?100.5?%;line-height:%?100.5?%;background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/address-right-990628faa7.png) 100% no-repeat;background-size:%?52?%}.comments .b[data-v-74fd4f62]{height:auto;width:%?720?%}.comments .item[data-v-74fd4f62]{height:auto;width:%?720?%;overflow:hidden}.comments .info[data-v-74fd4f62]{height:%?127?%;width:100%;padding:%?33?% 0 %?27?% 0}.comments .user[data-v-74fd4f62]{float:left;width:auto;height:%?67?%;line-height:%?67?%;font-size:0}.comments .user uni-image[data-v-74fd4f62]{float:left;width:%?67?%;height:%?67?%;margin-right:%?17?%;border-radius:50%}.comments .user uni-text[data-v-74fd4f62]{display:inline-block;width:auto;height:%?66?%;overflow:hidden;font-size:%?29?%;line-height:%?66?%}.comments .time[data-v-74fd4f62]{display:block;float:right;width:auto;height:%?67?%;line-height:%?67?%;color:#7f7f7f;font-size:%?25?%;margin-right:%?30?%}.comments .content[data-v-74fd4f62]{width:%?720?%;padding-right:%?30?%;line-height:%?45.8?%;font-size:%?29?%;margin-bottom:%?24?%}.comments .imgs[data-v-74fd4f62]{width:%?720?%;height:auto;margin-bottom:%?25?%}.comments .imgs .img[data-v-74fd4f62]{height:%?150?%;width:%?150?%;margin-right:%?28?%}.comments .spec[data-v-74fd4f62]{width:%?720?%;padding-right:%?30?%;line-height:%?30?%;font-size:%?24?%;color:#999;margin-bottom:%?30?%}.goods-attr[data-v-74fd4f62]{width:%?750?%;height:auto;overflow:hidden;padding:0 %?31.25?% %?25?% %?31.25?%;background:#fff}.goods-attr .t[data-v-74fd4f62]{width:%?687.5?%;height:%?104?%;line-height:%?104?%;font-size:%?38.5?%}.goods-attr .item[data-v-74fd4f62]{width:%?687.5?%;height:%?68?%;padding:%?11?% %?20?%;margin-bottom:%?11?%;background:#f7f7f7;font-size:%?38.5?%}.goods-attr .left[data-v-74fd4f62]{float:left;font-size:%?25?%;width:%?134?%;height:%?45?%;line-height:%?45?%;overflow:hidden;color:#999}.goods-attr .right[data-v-74fd4f62]{float:left;font-size:%?36.5?%;margin-left:%?20?%;width:%?480?%;height:%?45?%;line-height:%?45?%;overflow:hidden;color:#333}.detail[data-v-74fd4f62]{width:%?750?%;height:auto;overflow:hidden}.detail uni-image[data-v-74fd4f62]{width:%?750?%;display:block}.common-problem[data-v-74fd4f62]{width:%?750?%;height:auto;overflow:hidden}.common-problem .h[data-v-74fd4f62]{position:relative;height:%?145.5?%;width:%?750?%;padding:%?56.25?% 0;background:#fff;text-align:center}.common-problem .h .line[data-v-74fd4f62]{display:inline-block;position:absolute;top:%?72?%;left:0;z-index:2;height:1px;margin-left:%?225?%;width:%?300?%;background:#ccc}.common-problem .h .title[data-v-74fd4f62]{display:inline-block;position:absolute;top:%?56.125?%;left:0;z-index:3;height:%?33?%;margin-left:%?285?%;width:%?180?%;background:#fff}.common-problem .b[data-v-74fd4f62]{width:%?750?%;height:auto;overflow:hidden;padding:%?0?% %?30?%;background:#fff}.common-problem .item[data-v-74fd4f62]{height:auto;overflow:hidden;padding-bottom:%?25?%}.common-problem .question-box .spot[data-v-74fd4f62]{float:left;display:block;height:%?8?%;width:%?8?%;background:#b4282d;border-radius:50%;margin-top:%?11?%}.common-problem .question-box .question[data-v-74fd4f62]{float:left;line-height:%?30?%;padding-left:%?8?%;display:block;font-size:%?26?%;padding-bottom:%?15?%;color:#303030}.common-problem .answer[data-v-74fd4f62]{line-height:%?36?%;padding-left:%?16?%;font-size:%?26?%;color:#787878}.related-goods[data-v-74fd4f62]{width:%?750?%;height:auto;overflow:hidden}.related-goods .h[data-v-74fd4f62]{position:relative;height:%?145.5?%;width:%?750?%;padding:%?56.25?% 0;background:#fff;text-align:center;border-bottom:1px solid #f4f4f4}.related-goods .h .line[data-v-74fd4f62]{display:inline-block;position:absolute;top:%?72?%;left:0;z-index:2;height:1px;margin-left:%?225?%;width:%?300?%;background:#ccc}.related-goods .h .title[data-v-74fd4f62]{display:inline-block;position:absolute;top:%?56.125?%;left:0;z-index:3;height:%?33?%;margin-left:%?285?%;width:%?180?%;background:#fff}.related-goods .b[data-v-74fd4f62]{width:%?750?%;height:auto;overflow:hidden}.related-goods .b .item[data-v-74fd4f62]{float:left;background:#fff;width:%?375?%;height:auto;overflow:hidden;text-align:center;padding:%?15?% %?31.25?%;border-right:1px solid #f4f4f4;border-bottom:1px solid #f4f4f4}.related-goods .item .img[data-v-74fd4f62]{width:%?311.45?%;height:%?311.45?%}.related-goods .item .name[data-v-74fd4f62]{display:block;width:%?311.45?%;height:%?35?%;margin:%?11.5?% 0 %?15?% 0;text-align:center;overflow:hidden;font-size:%?30?%;color:#333}.related-goods .item .price[data-v-74fd4f62]{display:block;width:%?311.45?%;height:%?30?%;text-align:center;font-size:%?30?%;color:#b4282d}.bottom-btn[data-v-74fd4f62]{position:fixed;left:0;bottom:0;z-index:10;width:%?750?%;height:%?100?%;display:flex;background:#fff}.bottom-btn .l[data-v-74fd4f62]{float:left;height:%?100?%;width:%?162?%;border:1px solid #f4f4f4;display:flex;align-items:center;justify-content:center}.bottom-btn .l.l-collect[data-v-74fd4f62]{border-right:none;border-left:none;text-align:center}.bottom-btn .l.l-cart .box[data-v-74fd4f62]{position:relative;height:%?60?%;width:%?60?%}.bottom-btn .l.l-cart .cart-count[data-v-74fd4f62]{height:%?28?%;width:%?28?%;z-index:10;position:absolute;top:0;right:0;background:#b4282d;text-align:center;font-size:%?18?%;color:#fff;line-height:%?28?%;border-radius:50%}.bottom-btn .l.l-cart .icon[data-v-74fd4f62]{position:absolute;top:%?10?%;left:0}.bottom-btn .l .icon[data-v-74fd4f62]{display:block;height:%?44?%;width:%?44?%}.bottom-btn .c[data-v-74fd4f62]{float:left;height:%?100?%;line-height:%?96?%;flex:1;text-align:center;color:#333;border-top:1px solid #f4f4f4;border-bottom:1px solid #f4f4f4}.bottom-btn .r[data-v-74fd4f62]{border:1px solid #b4282d;background:#b4282d;float:left;height:%?100?%;line-height:%?96?%;flex:1;text-align:center;color:#fff}.attr-pop-box[data-v-74fd4f62]{width:100%;height:100%;position:fixed;background:rgba(0,0,0,.5);z-index:8;bottom:0\r\n\t/* display: none; */}.attr-pop[data-v-74fd4f62]{width:100%;height:auto;max-height:%?780?%;padding:%?31.25?%;background:#fff;position:fixed;z-index:9;bottom:%?100?%}.attr-pop .close[data-v-74fd4f62]{position:absolute;width:%?48?%;height:%?48?%;right:%?31.25?%;overflow:hidden;top:%?31.25?%}.attr-pop .close .icon[data-v-74fd4f62]{width:%?48?%;height:%?48?%}.attr-pop .img-info[data-v-74fd4f62]{width:%?687.5?%;height:%?177?%;overflow:hidden;margin-bottom:%?41.5?%}.attr-pop .img[data-v-74fd4f62]{float:left;height:%?177?%;width:%?177?%;background:#f4f4f4;margin-right:%?31.25?%}.attr-pop .info[data-v-74fd4f62]{float:left;height:%?177?%;display:flex;align-items:center}.attr-pop .p[data-v-74fd4f62]{font-size:%?33?%;color:#333;height:%?33?%;line-height:%?33?%;margin-bottom:%?10?%}.attr-pop .a[data-v-74fd4f62]{font-size:%?29?%;color:#333;height:%?40?%;line-height:%?40?%}.spec-con[data-v-74fd4f62]{width:100%;height:auto;overflow:hidden}.spec-con .name[data-v-74fd4f62]{height:%?32?%;margin-bottom:%?22?%;font-size:%?29?%;color:#333}.spec-con .values[data-v-74fd4f62]{height:auto;margin-bottom:%?31.25?%;font-size:0}.spec-con .value[data-v-74fd4f62]{display:inline-block;height:%?62?%;padding:0 %?35?%;line-height:%?56?%;text-align:center;margin-right:%?25?%;margin-bottom:%?16.5?%;border:1px solid #333;font-size:%?25?%;color:#333}.spec-con .value.disable[data-v-74fd4f62]{border:1px solid #ccc;color:#ccc}.spec-con .value.selected[data-v-74fd4f62]{border:1px solid #b4282d;color:#b4282d}.number-item .selnum[data-v-74fd4f62]{width:%?322?%;height:%?71?%;border:1px solid #ccc;display:flex}.number-item .cut[data-v-74fd4f62]{width:%?93.75?%;height:100%;text-align:center;line-height:%?65?%}.number-item .number[data-v-74fd4f62]{flex:1;height:100%;text-align:center;line-height:%?68.75?%;border-left:1px solid #ccc;border-right:1px solid #ccc;float:left}.number-item .add[data-v-74fd4f62]{width:%?93.75?%;height:100%;text-align:center;line-height:%?65?%}.container[data-v-74fd4f62]{position:relative}.box[data-v-74fd4f62]{position:absolute;top:300px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);width:95%;border-radius:10px;background-color:#fff;border:1px solid #666;display:flex;flex-direction:column;\r\n\t/* justify-content: center; */align-items:center;overflow:hidden}.b1[data-v-74fd4f62]{width:100%;display:flex;flex-direction:row;text-align:center}.gong[data-v-74fd4f62]{width:50%;background-color:#444548;color:#fff;padding:10px 0}.zhuan[data-v-74fd4f62]{width:50%;background-color:#fff;color:#000;padding:10px 0}.zhuanTip[data-v-74fd4f62]{width:95%;border-bottom:1px solid #ddd;font-size:14px;display:flex;flex-direction:row;align-items:center;\r\n\t/* justify-content: center; */color:#666;padding:4px 0}.colorbox[data-v-74fd4f62]{width:4px;height:12px;background-color:#e9c751;border-radius:5px;margin-right:10px}.pType[data-v-74fd4f62]{width:95%;display:flex;flex-direction:row;align-items:center;margin-top:15px;margin-left:10px}.pType uni-view[data-v-74fd4f62]:first-child{font-size:18px;font-weight:700;margin-right:10px}.pType .noActive[data-v-74fd4f62]{font-size:15px;padding:8px 20px;background-color:#fff;border-radius:5px;color:#000;border:1px solid #ddd;margin-right:10px}.pType .active[data-v-74fd4f62]{font-size:15px;padding:8px 20px;background-color:#e4a34d;border-radius:5px;color:#fff;margin-right:10px\r\n\t/* border: 1px solid #ddd; */}.pDan[data-v-74fd4f62]{width:95%;display:flex;flex-direction:column;border-bottom:1px solid #ddd}.pd[data-v-74fd4f62]{width:100%;display:flex;flex-direction:row;\r\n\t/* justify-content: space-around; */margin-top:20px}.pd[data-v-74fd4f62]:last-child{margin-bottom:20px}.pd1[data-v-74fd4f62]{display:flex;flex-direction:row;margin-left:10px;flex:2}.pd1 uni-view[data-v-74fd4f62]:first-child{font-size:16px}.pd1 uni-image[data-v-74fd4f62]{width:15px;height:15px}.pd2[data-v-74fd4f62]{font-size:14px;color:#e4a34d;flex:3}.pd3[data-v-74fd4f62]{display:flex;flex-direction:row;justify-content:center;align-items:center;border:1px solid #ddd;border-radius:5px;height:20px;margin-right:5px\r\n\t/* flex: 1; */}.pd3 .j[data-v-74fd4f62]{\r\n\t/* font-size: 15px; */display:flex;align-items:center;justify-content:center;font-weight:700;color:#e4a34d;padding:2px 5px}.count[data-v-74fd4f62]{padding:0 10px;font-size:15px;border-left:1px solid #ddd;border-right:1px solid #ddd}.buy[data-v-74fd4f62]{text-align:center;width:90%;font-size:16px;line-height:40px;background-color:#e4a34d;border-radius:5px;color:#fff;margin:10px 0}",""]),t.exports=e},"4ebb":function(t,e,i){"use strict";var o=i("d577"),a=i.n(o);a.a},6005:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){if(Array.isArray(t))return(0,o.default)(t)};var o=function(t){return t&&t.__esModule?t:{default:t}}(i("6b75"))},"8b08":function(t,e,i){"use strict";(function(t){i("7a82");var o=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(i("2909"));i("e25e"),i("d81d"),i("ac1f"),i("1276"),i("99af"),i("d3b7"),i("4de4");getApp();var d=i("2e67"),n=i("2771"),r={data:function(){return{id:0,dd:0,productList:[],specificationList:[],ticketType:[]}},computed:{ticketTip:function(){return"电子票：大陆居民刷“身份证”入场；港澳台居民凭“通行证”入场"},ticketRi:function(){return"专业日：2022-11-08至2022-11-10；面向18岁以上成年人开放."}},onLoad:function(t){this.setData({id:parseInt(t.id)});var e=this;this.getGoodsInfo(),d.request(n.CartGoodsCount).then((function(t){0===t.errno&&e.setData({cartGoodsCount:t.data.cartTotal.goodsCount})}))},methods:{getGoodsInfo:function(){var e=this;d.request(n.GoodsDetail,{id:e.id}).then((function(i){if(0===i.errno){e.setData({goods:i.data.info,gallery:i.data.gallery,attribute:i.data.attribute,issueList:i.data.issue,comment:i.data.comment,brand:i.data.brand,specificationList:i.data.specificationList,productList:i.data.productList,userHasCollect:i.data.userHasCollect});var o=[];t("log",e.productList," at pages/goodsTicket/goodsTicket.vue:161"),e.productList.map((function(i){if(null!=i.goods_specification_ids){var d=i.goods_specification_ids.split("_"),n=[];e.specificationList.map((function(t){return n=[].concat((0,a.default)(n),(0,a.default)(t.valueList))})),t("log",n," at pages/goodsTicket/goodsTicket.vue:172"),d.map((function(t){n.map((function(e){t==e.id&&o.push(e)}))})),t("log",o," at pages/goodsTicket/goodsTicket.vue:181")}})),e.setData({ticketArr:o}),t("log",o," at pages/goodsTicket/goodsTicket.vue:186"),1==i.data.userHasCollect?e.setData({collectBackImage:e.hasCollectImage}):e.setData({collectBackImage:e.noCollectImage}),e.article_goodsDetail=e.escape2Html(i.data.info.goods_desc),e.getGoodsRelated()}}))},getGoodsRelated:function(){var t=this;d.request(n.GoodsRelated,{id:t.id}).then((function(e){0===e.errno&&t.setData({relatedGoods:e.data.goodsList})}))},clickSkuValue:function(t){for(var e=t.currentTarget.dataset.nameId,i=t.currentTarget.dataset.valueId,o=this.specificationList,a=0;a<o.length;a++)if(o[a].specification_id==e)for(var d=0;d<o[a].valueList.length;d++)o[a].valueList[d].id==i?o[a].valueList[d].checked?o[a].valueList[d].checked=!1:o[a].valueList[d].checked=!0:o[a].valueList[d].checked=!1;this.setData({specificationList:o}),this.changeSpecInfo()},getCheckedSpecValue:function(){for(var t=[],e=this.specificationList,i=0;i<e.length;i++){for(var o={nameId:e[i].specification_id,valueId:0,valueText:""},a=0;a<e[i].valueList.length;a++)e[i].valueList[a].checked&&(o.valueId=e[i].valueList[a].id,o.valueText=e[i].valueList[a].value);t.push(o)}return t},setSpecValueStatus:function(){},isCheckedAllSpec:function(){return!this.getCheckedSpecValue().some((function(t){if(0==t.valueId)return!0}))},getCheckedSpecKey:function(){var t=this.getCheckedSpecValue().map((function(t){return t.valueId}));return t.join("_")},changeSpecInfo:function(){var t=this.getCheckedSpecValue(),e=t.filter((function(t){return 0!=t.valueId})).map((function(t){return t.valueText}));e.length>0?this.setData({checkedSpecText:e.join("　")}):this.setData({checkedSpecText:"请选择规格数量"})},getCheckedProductItem:function(t){return this.productList.filter((function(e){return e.goods_specification_ids==t}))},switchAttrPop:function(){0==this.openAttr&&this.setData({openAttr:!this.openAttr})},closeAttr:function(){this.setData({openAttr:!1})},addCannelCollect:function(){var t=this;d.request(n.CollectAddOrDelete,{typeId:0,valueId:this.id},"POST").then((function(e){var i=e;0==i.errno?"add"==i.data.type?t.setData({collectBackImage:t.hasCollectImage}):t.setData({collectBackImage:t.noCollectImage}):uni.showToast({image:"/static/static/images/icon_error.png",title:i.errmsg,mask:!0})}))},openCartPage:function(){uni.switchTab({url:"/pages/cart/cart"})},addToCart:function(){var t=this;if(!1===this.openAttr)this.setData({openAttr:!this.openAttr});else{if(!this.isCheckedAllSpec())return uni.showToast({image:"/static/static/images/icon_error.png",title:"请选择规格",mask:!0}),!1;var e=this.getCheckedProductItem(this.getCheckedSpecKey());if(!e||e.length<=0)return uni.showToast({image:"/static/static/images/icon_error.png",title:"库存不足",mask:!0}),!1;if(e.goods_number<this.number)return uni.showToast({image:"/static/static/images/icon_error.png",title:"库存不足",mask:!0}),!1;d.request(n.CartAdd,{goodsId:this.goods.id,number:this.number,productId:e[0].id},"POST").then((function(e){var i=e;0==i.errno?(uni.showToast({title:"添加成功"}),t.setData({openAttr:!t.openAttr,cartGoodsCount:i.data.cartTotal.goodsCount})):uni.showToast({image:"/static/static/images/icon_error.png",title:i.errmsg,mask:!0})}))}},cutNumber:function(){this.setData({number:this.number-1>1?this.number-1:1})},addNumber:function(){this.setData({number:this.number+1})}}};e.default=r}).call(this,i("0de9")["log"])},d577:function(t,e,i){var o=i("4c31");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=i("4f06").default;a("33da6cbd",o,!0,{sourceMap:!1,shadowMode:!1})},db90:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},i("a4d3"),i("e01a"),i("d3b7"),i("d28b"),i("3ca3"),i("ddb0"),i("a630")},e8e1:function(t,e,i){"use strict";i.r(e);var o=i("8b08"),a=i.n(o);for(var d in o)["default"].indexOf(d)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(d);e["default"]=a.a}}]);