(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/buyNew/buyNew"],{47:function(e,t,i){"use strict";(function(e,t){var n=i(4);i(26);n(i(25));var o=n(i(48));e.__webpack_require_UNI_MP_PLUGIN__=i,t(o.default)}).call(this,i(1)["default"],i(2)["createPage"])},48:function(e,t,i){"use strict";i.r(t);var n=i(49),o=i(51);for(var a in o)["default"].indexOf(a)<0&&function(e){i.d(t,e,(function(){return o[e]}))}(a);i(61);var r,s=i(34),u=Object(s["default"])(o["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],r);u.options.__file="pages/buyNew/buyNew.vue",t["default"]=u.exports},49:function(e,t,i){"use strict";i.r(t);var n=i(50);i.d(t,"render",(function(){return n["render"]})),i.d(t,"staticRenderFns",(function(){return n["staticRenderFns"]})),i.d(t,"recyclableRender",(function(){return n["recyclableRender"]})),i.d(t,"components",(function(){return n["components"]}))},50:function(e,t,i){"use strict";var n;i.r(t),i.d(t,"render",(function(){return o})),i.d(t,"staticRenderFns",(function(){return r})),i.d(t,"recyclableRender",(function(){return a})),i.d(t,"components",(function(){return n}));try{n={uniCalendar:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uni-calendar/components/uni-calendar/uni-calendar")]).then(i.bind(null,354))},fuiCheckboxGroup:function(){return i.e("components/firstui/fui-checkbox-group/fui-checkbox-group").then(i.bind(null,367))},fuiCheckbox:function(){return i.e("components/firstui/fui-checkbox/fui-checkbox").then(i.bind(null,372))},fuiDialog:function(){return i.e("components/firstui/fui-dialog/fui-dialog").then(i.bind(null,379))},fuiBottomPopup:function(){return i.e("components/firstui/fui-bottom-popup/fui-bottom-popup").then(i.bind(null,386))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,t=e.$createElement,i=(e._self._c,e.newArrayTourism.phone.length);e.$mp.data=Object.assign({},{$root:{g0:i}})},a=!1,r=[];o._withStripped=!0},51:function(e,t,i){"use strict";i.r(t);var n=i(52),o=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},52:function(e,t,i){"use strict";(function(e){var n=i(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(i(53)),a=n(i(55)),r=n(i(18)),s=n(i(5)),u=n(i(30)),c=n(i(31)),d=n(i(56)),l=(n(i(57)),function(){i.e("components/firstui/fui-dialog/fui-dialog").then(function(){return resolve(i(379))}.bind(null,i)).catch(i.oe)}),f=function(){i.e("components/firstui/fui-bottom-popup/fui-bottom-popup").then(function(){return resolve(i(386))}.bind(null,i)).catch(i.oe)},h=function(){i.e("components/firstui/fui-checkbox-group/fui-checkbox-group").then(function(){return resolve(i(367))}.bind(null,i)).catch(i.oe)},p=function(){i.e("components/firstui/fui-checkbox/fui-checkbox").then(function(){return resolve(i(372))}.bind(null,i)).catch(i.oe)},g={components:{fuiBottomPopup:f,fuiDialog:l,fuiCheckboxGroup:h,fuiCheckbox:p},data:function(){return{isShowDialog:!1,contentDialog:"",ticketInfo:{guigeArr:[],ticketTime:"",zp:"",ticketType:""},contactInfo:{name:"",phone:""},isValidPhone:!1,isValidArr:[],isValidTax:!1,checkedAddress:{id:0,name:"",is_default:0,mobile:"",full_region:"",address:""},addressId:0,couponId:0,invoices:{type:"",name:"",tax_number:""},isNeedCertification:0,isNeedTicket:!1,openAttr:!1,cartGoods:[],isShowXY:!1,isJieShow:!1,ticketCount:1,chooseDate:"请选择日期",isYinSi:!0,sexVal:"请选择性别",isShowPopup:!1,pickerColumn:["男","女"],goods:{},newArrayTourism:{name:"",phone:""}}},onLoad:function(e){this.setData({id:parseInt(e.id),itemId:null===e||void 0===e?void 0:e.itemId});var t=this;this.getGoodsInfo(),u.default.request(c.default.CartGoodsCount).then((function(e){0===e.errno&&t.setData({cartGoodsCount:e.data.cartTotal.goodsCount})}))},onShow:function(){var t=e.getStorageSync("addressId");t&&this.setData({addressId:t});var i=e.getStorageSync("couponId");i&&this.setData({couponId:i}),this.getCheckoutInfo()},computed:{certificationInfo:function(){var e=this.ticketInfo.guigeArr,t=[];return e.forEach((function(e){if(e.chooseCount>0&&e.goods_number>0)for(var i=e.chooseCount;i>0;i--)t.push(e)})),t.map((function(e){return{ticketTime:e.ticketTime,guiGe:e.guiGe,name:"",card:"",cardImgFront:"",cardImgBehind:"",cardImgElectron:""}}))},totalMoney:function(){return this.goods.retail_price*this.ticketCount}},methods:{curriculumTempItem:function(e){var t=this.id;this.reLoad(t,e.id)},reLoad:function(e,t){this.setData({itemId:t}),this.chooseDate="请选择日期",this.ticketCount=1;var i=this;this.getGoodsInfo(),u.default.request(c.default.CartGoodsCount).then((function(e){0===e.errno&&i.setData({cartGoodsCount:e.data.cartTotal.goodsCount})}))},confirm:function(e){console.log(e);var t=e.extraInfo;null!==t&&void 0!==t&&t.guiGe?(this.goods.name=t.guiGe,this.goods.retail_price=t.retail_price,this.chooseDate=t.date):u.default.showErrorToast("该日没有售票")},delNewArrayTourism:function(){this.newArrayTourism.name="",this.newArrayTourism.phone=""},onConfirmPicker:function(e){var t=e.detail,i=(t.picker,t.value);t.index;this.sexVal=i,this.isShowPopup=!1},onCancelPicker:function(e){var t=e.detail;t.picker,t.value,t.index;this.isShowPopup=!1},popSex:function(){this.isShowPopup=!this.isShowPopup,console.log(this.isShowPopup)},dialogClick:function(e){if(0==e.index)return this.isShowDialog=!1,this.sexVal="请选择性别",this.contactInfo.name="",this.contactInfo.phone="",void(this.isValidPhone=!1);this.isValidPhone||"请选择性别"==this.sexVal?u.default.showErrorToast("没填写完噢"):(this.newArrayTourism={name:this.contactInfo.name,phone:this.contactInfo.phone},this.isShowDialog=!1,this.sexVal="请选择性别",this.contactInfo.name="",this.contactInfo.phone="")},dialogClose:function(){this.isShowDialog=!1},showdialog:function(){this.isShowDialog=!0},onYinSi:function(e){var t=(0,s.default)(e.detail.value,1),i=t[0];this.isYinSi="false"==i,console.log(this.isYinSi)},jia:function(){this.ticketCount<5?this.ticketCount++:u.default.showErrorToast("限购五张门票哦")},jian:function(){this.ticketCount>1&&this.ticketCount--},open:function(){console.log(this.$refs.calendar),this.$refs.calendar.open()},getGoodsInfo:function(){var e=this;u.default.request(c.default.GoodsDetail,{id:e.id}).then((function(t){if(0===t.errno){t.data.info.goods_desc=t.data.info.goods_desc.match(/<p>(.*?)<\/p>/)[1],t.data.productList=t.data.productList.filter((function(e){return e.goods_specification_ids})),e.setData({goods:t.data.info,gallery:t.data.gallery,attribute:t.data.attribute,issueList:t.data.issue,comment:t.data.comment,brand:t.data.brand,specificationList:t.data.specificationList,productList:t.data.productList,userHasCollect:t.data.userHasCollect});var i={};null!==e&&void 0!==e&&e.itemId?(i=t.data.productList.filter((function(t){return t.id==(null===e||void 0===e?void 0:e.itemId)})),i.length>0&&(i=i[0])):i=e.productList[0];var n=t.data.productList;e.setData({tempItem:i,productListNew:n}),console.log(i,"slkdjfnkjlsdnvkj"),e.initTicketArr(),1==t.data.userHasCollect?e.setData({collectBackImage:e.hasCollectImage}):e.setData({collectBackImage:e.noCollectImage}),e.article_goodsDetail=e.escape2Html(t.data.info.goods_desc),e.getGoodsRelated(),console.log(i,"slkdjfnkjlsdnvkj"),console.log(e.guigeArr,e.gallery,23333)}}))},getguigeArr:function(){var e=this.ticketArr,t=this.ticketTypeArr,i=this.ticketTypeIndex,n=this.chooseDate,o=e.filter((function(e){return console.log(e.date,n),e.pz==t[i]&&e.date==n}));return o.map((function(e){return{id:e.id,chooseCount:e.goods_number>0?1:0,guiGe:e.guiGe,goods_number:e.goods_number,retail_price:e.retail_price}}))},initTicketArr:function(){var e=this,t=this,i=[],n=this.tempItem,o=n.goods_specification_ids.split("_"),a=[];n["guiGeInfo"]=[],t.specificationList.map((function(e){return a=[].concat((0,r.default)(a),(0,r.default)(e.valueList))}));var u={};o.map((function(t){a.map((function(i){if(t==i.id&&("规格"==i.name&&(u["guiGe"]=i.value),"日期"!=i.name&&"时间"!=i.name||(u["shiJian"]=i.value)),u["guiGe"]&&u["shiJian"]){var o=u.shiJian.split("&"),a=(0,s.default)(o,2),c=a[0],d=a[1],l=e.handleTime(c,d),f=l.map((function(t){return e.isWeekend(t)?{guiGe:u["guiGe"],shiJian:t,date:t,retail_price:n.weekend_price,goods_number:n.goods_number,id:n.id,info:"￥"+n.weekend_price}:{guiGe:u["guiGe"],shiJian:t,date:t,retail_price:n.retail_price,goods_number:n.goods_number,id:n.id,info:"￥"+n.retail_price}}));n["guiGeInfo"]=(0,r.default)(f),u={}}}))})),this.tempItem=n,t.productList.map((function(n){if(null!=n.goods_specification_ids&&n.id==t.tempItem.id){var o=n.goods_specification_ids.split("_"),a=[];t.specificationList.map((function(e){return a=[].concat((0,r.default)(a),(0,r.default)(e.valueList))})),console.log(a);var u={};o.map((function(t){a.map((function(o){if(t==o.id&&(console.log(o),"规格"==o.name&&(u["guiGe"]=o.value),"日期"!=o.name&&"时间"!=o.name||(u["shiJian"]=o.value)),u["guiGe"]&&u["shiJian"]){var a=u.shiJian.split("&"),c=(0,s.default)(a,2),d=c[0],l=c[1],f=e.handleTime(d,l),h=f.map((function(t){return e.isWeekend(t)?{guiGe:u["guiGe"],shiJian:t,date:t,retail_price:n.weekend_price,goods_number:n.goods_number,id:n.id,info:"￥"+n.weekend_price}:{guiGe:u["guiGe"],shiJian:t,date:t,retail_price:n.retail_price,goods_number:n.goods_number,id:n.id,info:"￥"+n.retail_price}}));i=[].concat((0,r.default)(i),(0,r.default)(h)),u={}}}))}))}}));var c=[];t.productListNew=t.productListNew.map((function(i){var n=i.goods_specification_ids.split("_"),o=[];t.specificationList.map((function(e){return o=[].concat((0,r.default)(o),(0,r.default)(e.valueList))})),console.log(o);var a={};return i["guiGeInfo"]=[],n.map((function(t){o.map((function(n){if(t==n.id&&(console.log(n),"规格"==n.name&&(a["guiGe"]=n.value),"日期"!=n.name&&"时间"!=n.name||(a["shiJian"]=n.value)),a["guiGe"]&&a["shiJian"]){var o=a.shiJian.split("&"),u=(0,s.default)(o,2),d=u[0],l=u[1],f=e.handleTime(d,l),h=f.map((function(t){return e.isWeekend(t)?{guiGe:a["guiGe"],shiJian:t,date:t,retail_price:i.weekend_price,goods_number:i.goods_number,id:i.id,info:"￥"+i.weekend_price}:{guiGe:a["guiGe"],shiJian:t,date:t,retail_price:i.retail_price,goods_number:i.goods_number,id:i.id,info:"￥"+i.retail_price}}));i["guiGeInfo"]=(0,r.default)(h),c=[].concat((0,r.default)(c),(0,r.default)(h)),a={}}}))})),i})),console.log(i,"清洗出来的票"),t.setData({ticketArr:i,ticketArr1:c})},isWeekend:function(e){var t=new Date(e).getDay();return 6===t||0===t},handleTime:function(e,t){var i=new Date(e),n=new Date(t),o=function(e){return e.toString().length>1?e:"0".concat(e)},a=[];while(i<=n){var r=i.getMonth()+1,s=i.getDate(),u=i.getFullYear();a.push("".concat(u,"-").concat(o(r),"-").concat(o(s))),i.setDate(i.getDate()+1)}return a},getCheckoutInfo:function(){var t=this;console.log(t.addressId,t.couponId),u.default.request(c.default.CartCheckout,{addressId:t.addressId,couponId:t.couponId}).then((function(i){0===i.errno&&(console.log(i.data),t.setData({checkedAddress:i.data.checkedAddress})),e.hideLoading()}))},getGoodsRelated:function(){var e=this;u.default.request(c.default.GoodsRelated,{id:e.id}).then((function(t){0===t.errno&&e.setData({relatedGoods:t.data.goodsList})}))},getIsValidArr:function(){this.isValidArr=this.certificationInfo.map((function(e){return!1}))},validCard:function(e){var t=this.certificationInfo[e].card,i=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;i.test(t)||this.$set(this.isValidArr,e,!0),i.test(t)&&this.$set(this.isValidArr,e,!1)},validPhone:function(){var e=this.contactInfo.phone;this.isValidPhone=!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(e)},onName:function(e){var t=e.detail.value;this.contactInfo.name=t},onPhone:function(e){var t=e.detail.value;this.contactInfo.phone=t},onCertiName:function(e){var t=e.detail.value,i=e.currentTarget.dataset.i;this.certificationInfo[i].name=t},onCertiCard:function(e){var t=e.detail.value,i=e.currentTarget.dataset.i;this.certificationInfo[i].card=t},onAdress:function(e){var t=e.detail.value;this.adressInfo.adress=t},onJieShow:function(e){var t=(0,s.default)(e.detail.value,1),i=t[0];this.isJieShow="false"==i,console.log(this.isJieShow)},needCertification:function(){this.isNeedCertification=!this.isNeedCertification},needTicket:function(){this.isNeedTicket=!this.isNeedTicket},imageUrl:function(e){return e?"/static/images/buy/dui-2.png":"/static/images/buy/dui.png"},showPopup:function(){this.isShowXY=!0},closePopup:function(){this.isShowXY=!1},buy:function(){var t=this;return(0,a.default)(o.default.mark((function i(){var n,a,r;return o.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(e.showLoading(),n=t.chooseDate,a=t.newArrayTourism,"请选择日期"!=n){i.next=6;break}return u.default.showErrorToast("请选择日期"),i.abrupt("return");case 6:if(0!=a.phone.length){i.next=9;break}return u.default.showErrorToast("请添加游客"),i.abrupt("return");case 9:return i.prev=9,i.next=12,t.productDlete();case 12:return i.next=14,t.goodsClear();case 14:return r={chooseCount:t.ticketCount,id:t.tempItem.id,category_id:t.goods.category_id,isWeekend:t.isWeekend(t.chooseDate)},i.next=17,t.addToCart(r);case 17:t.submitOrder(),i.next=23;break;case 20:i.prev=20,i.t0=i["catch"](9),u.default.showErrorToast(i.t0.errMsg);case 23:case"end":return i.stop()}}),i,null,[[9,20]])})))()},addToCart:function(t){var i=this;return(0,a.default)(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,u.default.request(c.default.CartAdd,{goodsId:i.id,number:t.chooseCount,productId:t.id,category_id:t.category_id,isWeekend:t.isWeekend,certification:JSON.stringify([{choosetime:i.chooseDate}])},"POST").then((function(t){var i=t;0==i.errno||e.showToast({image:"/static/static/images/icon_error.png",title:i.errmsg,mask:!0})}));case 2:case"end":return n.stop()}}),n)})))()},goodsClear:function(){return(0,a.default)(o.default.mark((function e(){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.default.request(c.default.goodsClear,{},"GET");case 2:case"end":return e.stop()}}),e)})))()},productDlete:function(){var e=this;return(0,a.default)(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.default.request(c.default.productDlete,{goods_id:e.id},"POST");case 2:case"end":return t.stop()}}),t)})))()},submitOrder:function(){u.default.request(c.default.OrderSubmit,{addressId:this.addressId,couponId:this.couponId,category_id:this.goods.category_id,name:this.newArrayTourism.name,phone:this.newArrayTourism.phone},"POST").then((function(t){if(0===t.errno){var i=t.data.orderInfo.id;d.default.payOrder(parseInt(i)).then((function(t){e.redirectTo({url:"/pages/payResult/payResult?status=1&orderId="+i})})).catch((function(t){e.redirectTo({url:"/pages/payResult/payResult?status=0&orderId="+i})}))}else u.default.showErrorToast("下单失败")})).catch((function(e){u.default.showErrorToast("下单失败")}))}}};t.default=g}).call(this,i(2)["default"])},61:function(e,t,i){"use strict";i.r(t);var n=i(62),o=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},62:function(e,t,i){}},[[47,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/buyNew/buyNew.js.map