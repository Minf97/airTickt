(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ucenter-express-express"],{2771:function(e,t){var i="http://192.168.1.114:8360/api/";e.exports={ApiRootUrl:i,IndexUrl:i+"index/index",CatalogList:i+"catalog/index",CatalogCurrent:i+"catalog/current",AuthLoginByWeixin:i+"auth/loginByWeixin",GoodsCount:i+"goods/count",GoodsList:i+"goods/list",GoodsCategory:i+"goods/category",GoodsDetail:i+"goods/detail",GoodsNew:i+"goods/new",GoodsHot:i+"goods/hot",GoodsRelated:i+"goods/related",BrandList:i+"brand/list",BrandDetail:i+"brand/detail",CartList:i+"cart/index",CartAdd:i+"cart/add",CartUpdate:i+"cart/update",CartDelete:i+"cart/delete",CartChecked:i+"cart/checked",CartGoodsCount:i+"cart/goodscount",CartCheckout:i+"cart/checkout",OrderSubmit:i+"order/submit",PayPrepayId:i+"pay/prepay",CollectList:i+"collect/list",CollectAddOrDelete:i+"collect/addordelete",CommentList:i+"comment/list",CommentCount:i+"comment/count",CommentPost:i+"comment/post",TopicList:i+"topic/list",TopicDetail:i+"topic/detail",TopicRelated:i+"topic/related",SearchIndex:i+"search/index",SearchResult:i+"search/result",SearchHelper:i+"search/helper",SearchClearHistory:i+"search/clearhistory",AddressList:i+"address/list",AddressDetail:i+"address/detail",AddressSave:i+"address/save",AddressDelete:i+"address/delete",RegionList:i+"region/list",OrderList:i+"order/list",OrderDetail:i+"order/detail",OrderCancel:i+"order/cancel",OrderExpress:i+"order/express",FootprintList:i+"footprint/list",FootprintDelete:i+"footprint/delete"}},"2e67":function(e,t,i){(function(t){i("d81d"),i("d401"),i("d3b7"),i("25f0");var o=i("2771");function n(e){return e=e.toString(),e[1]?e:"0"+e}function r(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";return new Promise((function(d,c){uni.request({url:e,data:i,method:n,header:{"Content-Type":"application/json","X-Nideshop-Token":uni.getStorageSync("token")},success:function(e){if(t("log","success"," at utils/util.js:32"),200==e.statusCode){if(401==e.data.errno){var i=null;return s().then((function(e){return i=e.code,a()})).then((function(e){r(o.AuthLoginByWeixin,{code:i,userInfo:e},"POST").then((function(e){0===e.errno?(uni.setStorageSync("userInfo",e.data.userInfo),uni.setStorageSync("token",e.data.token),d(e)):c(e)})).catch((function(e){c(e)}))})).catch((function(e){c(e)}))}d(e.data)}else c(e.errMsg)},fail:function(e){c(e),t("log","failed"," at utils/util.js:79")}})}))}function s(){return new Promise((function(e,t){uni.login({success:function(i){i.code?e(i.code):t(i)},fail:function(e){t(e)}})}))}function a(){return new Promise((function(e,t){uni.getUserInfo({withCredentials:!0,success:function(i){"getUserInfo:ok"===i.detail.errMsg?e(i):t(i)},fail:function(e){t(e)}})}))}e.exports={formatTime:function(e){var t=e.getFullYear(),i=e.getMonth()+1,o=e.getDate(),r=e.getHours(),s=e.getMinutes(),a=e.getSeconds();return[t,i,o].map(n).join("-")+" "+[r,s,a].map(n).join(":")},request:r,get:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r(e,t,"GET")},post:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r(e,t,"POST")},redirect:function(e){uni.redirectTo({url:e})},showErrorToast:function(e){uni.showToast({title:e,image:"/static/static/images/icon_error.png"})},checkSession:function(){return new Promise((function(e,t){uni.checkSession({success:function(){e(!0)},fail:function(){t(!1)}})}))},login:s,getUserInfo:a}}).call(this,i("0de9")["log"])},"3f8cb":function(e,t,i){"use strict";i("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i("2e67"),n=i("2771"),r=(getApp(),{data:function(){return{orderId:1,expressInfo:{logistic_code:"",shipper_name:"",request_time:"",isFinish:0},expressTraces:[]}},onLoad:function(e){this.setData({orderId:e.id}),this.getExpressInfo()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},methods:{getExpressInfo:function(){var e=this;o.request(n.OrderExpress,{orderId:e.orderId}).then((function(t){0===t.errno&&e.setData({expressInfo:t.data,expressTraces:t.data.traces})}))},updateExpress:function(){this.getExpressInfo()}}});t.default=r},5265:function(e,t,i){"use strict";i.r(t);var o=i("7edc"),n=i("a2cd");for(var r in n)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(r);i("afbb");var s=i("f0c5"),a=Object(s["a"])(n["default"],o["b"],o["c"],!1,null,"ce0505d4",null,!1,o["a"],void 0);t["default"]=a.exports},"7edc":function(e,t,i){"use strict";i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){}));var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"express-header"},[i("v-uni-view",{staticClass:"left"},[i("v-uni-view",{staticClass:"txt"},[e._v("物流单号："+e._s(e.expressInfo.logistic_code))]),i("v-uni-view",{staticClass:"txt"},[e._v("物流公司："+e._s(e.expressInfo.shipper_name))]),i("v-uni-view",{staticClass:"txt"},[e._v("更新时间："+e._s(e.expressInfo.request_time))])],1),1===e.expressInfo.isFinish?i("v-uni-view",{staticClass:"right"},[i("v-uni-view",{staticClass:"update-btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.updateExpress.apply(void 0,arguments)}}},[e._v("更新物流")])],1):e._e()],1),i("v-uni-view",{staticClass:"express-body"},[i("v-uni-view",{staticClass:"current-icon"}),e._l(e.expressTraces,(function(t,o){return i("v-uni-view",{key:t.key,class:"express-item item-"+o},[i("v-uni-view",{staticClass:"left"}),i("v-uni-view",{staticClass:"right"},[i("v-uni-view",{staticClass:"info"},[e._v(e._s(t.content))]),i("v-uni-view",{staticClass:"time"},[e._v(e._s(t.datetime))])],1)],1)}))],2)],1)},n=[]},a2cd:function(e,t,i){"use strict";i.r(t);var o=i("3f8cb"),n=i.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return o[e]}))}(r);t["default"]=n.a},afbb:function(e,t,i){"use strict";var o=i("b6fc"),n=i.n(o);n.a},b6fc:function(e,t,i){var o=i("f542");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=i("4f06").default;n("d516a75c",o,!0,{sourceMap:!1,shadowMode:!1})},f542:function(e,t,i){var o=i("24fb");t=o(!1),t.push([e.i,"uni-page-body[data-v-ce0505d4]{height:100%;width:100%;background:#f4f4f4}body.?%PAGE?%[data-v-ce0505d4]{background:#f4f4f4}.container[data-v-ce0505d4]{height:100%;width:100%}.express-header[data-v-ce0505d4]{border-top:1px solid #d9d9d9;width:100%;height:auto;overflow:hidden;background:#fff;display:flex;padding:%?20?% %?30?%}.express-header .left[data-v-ce0505d4]{flex:1;height:100%}.express-header .left .txt[data-v-ce0505d4]{height:%?50?%;line-height:%?50?%;overflow:hidden;width:100%}.express-header .right[data-v-ce0505d4]{width:%?160?%;height:100%;display:flex}.express-header .update-btn[data-v-ce0505d4]{margin-top:%?47?%;width:%?158?%;height:%?56?%;line-height:%?54?%;overflow:hidden;text-align:center;border-radius:%?8?%;color:#333;border:1px solid #666}.express-body[data-v-ce0505d4]{margin-top:%?20?%;width:100%;height:auto;overflow:hidden;background:#fff;padding:%?30?%;position:relative}.current-icon[data-v-ce0505d4]{height:%?24?%;width:%?24?%;position:absolute;top:%?30?%;left:%?50?%;background:#b4282d;border-radius:%?24?%}.express-item[data-v-ce0505d4]{height:auto;width:100%;overflow:hidden;display:flex;margin-left:%?30?%;border-left:1px solid #d9d9d9}.express-item .left[data-v-ce0505d4]{width:%?44?%;height:100%;overflow:hidden}.express-item .right[data-v-ce0505d4]{flex:1;height:100%;margin-left:%?10?%;padding:%?20?% 0;border-bottom:1px solid #f1f2f4}.express-item.item-0 .right[data-v-ce0505d4]{padding-top:%?0?%}.express-item:last-child .right[data-v-ce0505d4]{border-bottom:none;padding-bottom:%?0?%}.express-item .right .info[data-v-ce0505d4]{min-height:%?42?%;height:auto;overflow:hidden;padding-right:%?30?%;line-height:%?42?%;color:#999}.express-item.item-0 .right .info[data-v-ce0505d4]{color:#b4282d}.express-item .right .time[data-v-ce0505d4]{min-height:%?42?%;height:auto;overflow:hidden;line-height:%?42?%;color:#999}.express-item.item-0 .right .time[data-v-ce0505d4]{color:#b4282d}",""]),e.exports=t}}]);