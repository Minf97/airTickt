(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ucenter-order-order"],{2771:function(t,e){var o="http://192.168.1.114:8360/api/";t.exports={ApiRootUrl:o,IndexUrl:o+"index/index",CatalogList:o+"catalog/index",CatalogCurrent:o+"catalog/current",AuthLoginByWeixin:o+"auth/loginByWeixin",GoodsCount:o+"goods/count",GoodsList:o+"goods/list",GoodsCategory:o+"goods/category",GoodsDetail:o+"goods/detail",GoodsNew:o+"goods/new",GoodsHot:o+"goods/hot",GoodsRelated:o+"goods/related",BrandList:o+"brand/list",BrandDetail:o+"brand/detail",CartList:o+"cart/index",CartAdd:o+"cart/add",CartUpdate:o+"cart/update",CartDelete:o+"cart/delete",CartChecked:o+"cart/checked",CartGoodsCount:o+"cart/goodscount",CartCheckout:o+"cart/checkout",OrderSubmit:o+"order/submit",PayPrepayId:o+"pay/prepay",CollectList:o+"collect/list",CollectAddOrDelete:o+"collect/addordelete",CommentList:o+"comment/list",CommentCount:o+"comment/count",CommentPost:o+"comment/post",TopicList:o+"topic/list",TopicDetail:o+"topic/detail",TopicRelated:o+"topic/related",SearchIndex:o+"search/index",SearchResult:o+"search/result",SearchHelper:o+"search/helper",SearchClearHistory:o+"search/clearhistory",AddressList:o+"address/list",AddressDetail:o+"address/detail",AddressSave:o+"address/save",AddressDelete:o+"address/delete",RegionList:o+"region/list",OrderList:o+"order/list",OrderDetail:o+"order/detail",OrderCancel:o+"order/cancel",OrderExpress:o+"order/express",FootprintList:o+"footprint/list",FootprintDelete:o+"footprint/delete"}},"2e67":function(t,e,o){(function(e){o("d81d"),o("d401"),o("d3b7"),o("25f0");var i=o("2771");function n(t){return t=t.toString(),t[1]?t:"0"+t}function r(t){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";return new Promise((function(d,c){uni.request({url:t,data:o,method:n,header:{"Content-Type":"application/json","X-Nideshop-Token":uni.getStorageSync("token")},success:function(t){if(e("log","success"," at utils/util.js:32"),200==t.statusCode){if(401==t.data.errno){var o=null;return a().then((function(t){return o=t.code,s()})).then((function(t){r(i.AuthLoginByWeixin,{code:o,userInfo:t},"POST").then((function(t){0===t.errno?(uni.setStorageSync("userInfo",t.data.userInfo),uni.setStorageSync("token",t.data.token),d(t)):c(t)})).catch((function(t){c(t)}))})).catch((function(t){c(t)}))}d(t.data)}else c(t.errMsg)},fail:function(t){c(t),e("log","failed"," at utils/util.js:79")}})}))}function a(){return new Promise((function(t,e){uni.login({success:function(o){o.code?t(o.code):e(o)},fail:function(t){e(t)}})}))}function s(){return new Promise((function(t,e){uni.getUserInfo({withCredentials:!0,success:function(o){"getUserInfo:ok"===o.detail.errMsg?t(o):e(o)},fail:function(t){e(t)}})}))}t.exports={formatTime:function(t){var e=t.getFullYear(),o=t.getMonth()+1,i=t.getDate(),r=t.getHours(),a=t.getMinutes(),s=t.getSeconds();return[e,o,i].map(n).join("-")+" "+[r,a,s].map(n).join(":")},request:r,get:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r(t,e,"GET")},post:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r(t,e,"POST")},redirect:function(t){uni.redirectTo({url:t})},showErrorToast:function(t){uni.showToast({title:t,image:"/static/static/images/icon_error.png"})},checkSession:function(){return new Promise((function(t,e){uni.checkSession({success:function(){t(!0)},fail:function(){e(!1)}})}))},login:a,getUserInfo:s}}).call(this,o("0de9")["log"])},"4a0f":function(t,e,o){"use strict";o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return n})),o.d(e,"a",(function(){}));var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"container"},[o("v-uni-view",{staticClass:"orders"},t._l(t.orderList,(function(e,i){return o("v-uni-navigator",{key:e.id,staticClass:"order",attrs:{url:"../orderDetail/orderDetail?id="+e.id}},[o("v-uni-view",{staticClass:"h"},[o("v-uni-view",{staticClass:"l"},[t._v("订单编号："+t._s(e.order_sn))]),o("v-uni-view",{staticClass:"r"},[t._v(t._s(e.order_status_text))])],1),t._l(e.goodsList,(function(e,i){return o("v-uni-view",{key:e.id,staticClass:"goods"},[o("v-uni-view",{staticClass:"img"},[o("v-uni-image",{attrs:{src:e.list_pic_url}})],1),o("v-uni-view",{staticClass:"info"},[o("v-uni-text",{staticClass:"name"},[t._v(t._s(e.goods_name))]),o("v-uni-text",{staticClass:"number"},[t._v("共"+t._s(e.number)+"件商品")])],1),o("v-uni-view",{staticClass:"status"})],1)})),o("v-uni-view",{staticClass:"b"},[o("v-uni-view",{staticClass:"l"},[t._v("实付：￥"+t._s(e.actual_price))]),o("v-uni-view",{staticClass:"r"},[e.handleOption.pay?o("v-uni-button",{staticClass:"btn",attrs:{"data-order-index":i},on:{click:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.payOrder.apply(void 0,arguments)}}},[t._v("去付款")]):t._e()],1)],1)],2)})),1)],1)},n=[]},"5b6c":function(t,e,o){"use strict";var i=o("e9f5"),n=o.n(i);n.a},"69c8":function(t,e,o){"use strict";o.r(e);var i=o("dd4f"),n=o.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},"8a1c":function(t,e,o){"use strict";o.r(e);var i=o("4a0f"),n=o("69c8");for(var r in n)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(r);o("5b6c");var a=o("f0c5"),s=Object(a["a"])(n["default"],i["b"],i["c"],!1,null,"6eb62f62",null,!1,i["a"],void 0);e["default"]=s.exports},dd4f:function(t,e,o){"use strict";(function(t){o("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o("2e67"),n=o("2771"),r={data:function(){return{orderList:[],gitem:{id:"",list_pic_url:"",goods_name:"",number:""}}},onLoad:function(t){this.getOrderList()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},methods:{getOrderList:function(){var e=this;i.request(n.OrderList).then((function(o){0===o.errno&&(t("log",o.data," at pages/ucenter/order/order.vue:73"),e.setData({orderList:o.data.data}))}))},payOrder:function(){uni.redirectTo({url:"/pages/pay/pay"})}}};e.default=r}).call(this,o("0de9")["log"])},e7a9:function(t,e,o){var i=o("24fb");e=i(!1),e.push([t.i,"uni-page-body[data-v-6eb62f62]{height:100%;width:100%;background:#f4f4f4}body.?%PAGE?%[data-v-6eb62f62]{background:#f4f4f4}.orders[data-v-6eb62f62]{height:auto;width:100%;overflow:hidden}.order[data-v-6eb62f62]{margin-top:%?20?%;background:#fff}.order .h[data-v-6eb62f62]{height:%?83.3?%;line-height:%?83.3?%;margin-left:%?31.25?%;padding-right:%?31.25?%;border-bottom:1px solid #f4f4f4;font-size:%?30?%;color:#333}.order .h .l[data-v-6eb62f62]{float:left}.order .h .r[data-v-6eb62f62]{float:right;color:#b4282d;font-size:%?24?%}.order .goods[data-v-6eb62f62]{display:flex;align-items:center;height:%?199?%;margin-left:%?31.25?%}.order .goods .img[data-v-6eb62f62]{height:%?145.83?%;width:%?145.83?%;background:#f4f4f4}.order .goods .img uni-image[data-v-6eb62f62]{height:%?145.83?%;width:%?145.83?%}.order .goods .info[data-v-6eb62f62]{height:%?145.83?%;flex:1;padding-left:%?20?%}.order .goods .name[data-v-6eb62f62]{margin-top:%?30?%;display:block;height:%?44?%;line-height:%?44?%;color:#333;font-size:%?30?%}.order .goods .number[data-v-6eb62f62]{display:block;height:%?37?%;line-height:%?37?%;color:#666;font-size:%?25?%}.order .goods .status[data-v-6eb62f62]{width:%?105?%;color:#b4282d;font-size:%?25?%}.order .b[data-v-6eb62f62]{height:%?103?%;line-height:%?103?%;margin-left:%?31.25?%;padding-right:%?31.25?%;border-top:1px solid #f4f4f4;font-size:%?30?%;color:#333}.order .b .l[data-v-6eb62f62]{float:left}.order .b .r[data-v-6eb62f62]{float:right}.order .b .btn[data-v-6eb62f62]{margin-top:%?19?%;height:%?64.5?%;line-height:%?64.5?%;text-align:center;padding:0 %?20?%;border-radius:%?5?%;font-size:%?28?%;color:#fff;background:#b4282d}",""]),t.exports=e},e9f5:function(t,e,o){var i=o("e7a9");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=o("4f06").default;n("a1543756",i,!0,{sourceMap:!1,shadowMode:!1})}}]);