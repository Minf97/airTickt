(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/buyNew/buyNew"],{34:function(t,e,n){"use strict";(function(t){n(5);o(n(4));var e=o(n(35));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n(1)["createPage"])},35:function(t,e,n){"use strict";n.r(e);var o=n(36),r=n(38);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n(44);var a,u=n(13),c=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],a);c.options.__file="pages/buyNew/buyNew.vue",e["default"]=c.exports},36:function(t,e,n){"use strict";n.r(e);var o=n(37);n.d(e,"render",(function(){return o["render"]})),n.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(e,"components",(function(){return o["components"]}))},37:function(t,e,n){"use strict";var o;n.r(e),n.d(e,"render",(function(){return r})),n.d(e,"staticRenderFns",(function(){return a})),n.d(e,"recyclableRender",(function(){return i})),n.d(e,"components",(function(){return o}));try{o={uniCalendar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-calendar/components/uni-calendar/uni-calendar")]).then(n.bind(null,337))},fuiCheckboxGroup:function(){return n.e("components/firstui/fui-checkbox-group/fui-checkbox-group").then(n.bind(null,350))},fuiCheckbox:function(){return n.e("components/firstui/fui-checkbox/fui-checkbox").then(n.bind(null,355))},fuiDialog:function(){return n.e("components/firstui/fui-dialog/fui-dialog").then(n.bind(null,362))},fuiBottomPopup:function(){return n.e("components/firstui/fui-bottom-popup/fui-bottom-popup").then(n.bind(null,369))},mpHtml:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/mp-html/components/mp-html/mp-html")]).then(n.bind(null,376))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var t=this,e=t.$createElement;t._self._c},i=!1,a=[];r._withStripped=!0},38:function(t,e,n){"use strict";n.r(e);var o=n(39),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},39:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n(9)),r=a(n(10)),i=a(n(40));a(n(41));function a(t){return t&&t.__esModule?t:{default:t}}function u(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */u=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},r=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",a=o.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(C){c=function(t,e,n){return t[e]=n}}function s(t,e,n,o){var r=e&&e.prototype instanceof f?e:f,i=Object.create(r.prototype),a=new x(o||[]);return i._invoke=function(t,e,n){var o="suspendedStart";return function(r,i){if("executing"===o)throw new Error("Generator is already running");if("completed"===o){if("throw"===r)throw i;return L()}for(n.method=r,n.arg=i;;){var a=n.delegate;if(a){var u=_(a,n);if(u){if(u===l)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===o)throw o="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o="executing";var c=d(t,e,n);if("normal"===c.type){if(o=n.done?"completed":"suspendedYield",c.arg===l)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(o="completed",n.method="throw",n.arg=c.arg)}}}(t,n,a),i}function d(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(C){return{type:"throw",arg:C}}}t.wrap=s;var l={};function f(){}function h(){}function p(){}var m={};c(m,r,(function(){return this}));var g=Object.getPrototypeOf,v=g&&g(g(G([])));v&&v!==e&&n.call(v,r)&&(m=v);var y=p.prototype=f.prototype=Object.create(m);function w(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function o(r,i,a,u){var c=d(t[r],t,i);if("throw"!==c.type){var s=c.arg,l=s.value;return l&&"object"==typeof l&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){o("next",t,a,u)}),(function(t){o("throw",t,a,u)})):e.resolve(l).then((function(t){s.value=t,a(s)}),(function(t){return o("throw",t,a,u)}))}u(c.arg)}var r;this._invoke=function(t,n){function i(){return new e((function(e,r){o(t,n,e,r)}))}return r=r?r.then(i,i):i()}}function _(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,_(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var o=d(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,l;var r=o.arg;return r?r.done?(e[t.resultName]=r.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):r:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function G(t){if(t){var e=t[r];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function e(){for(;++o<t.length;)if(n.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:L}}function L(){return{value:void 0,done:!0}}return h.prototype=p,c(y,"constructor",p),c(p,"constructor",h),h.displayName=c(p,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,c(t,a,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},w(b.prototype),c(b.prototype,i,(function(){return this})),t.AsyncIterator=b,t.async=function(e,n,o,r,i){void 0===i&&(i=Promise);var a=new b(s(e,n,o,r),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(y),c(y,a,"Generator"),c(y,r,(function(){return this})),c(y,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var o=e.pop();if(o in t)return n.value=o,n.done=!1,n}return n.done=!0,n}},t.values=G,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(I),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(n,o){return a.type="throw",a.arg=t,e.next=n,o&&(e.method="next",e.arg=void 0),!!o}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],a=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var o=this.tryEntries.length-1;o>=0;--o){var r=this.tryEntries[o];if(r.tryLoc<=this.prev&&n.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),I(n),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var o=n.completion;if("throw"===o.type){var r=o.arg;I(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:G(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},t}function c(t,e,n,o,r,i,a){try{var u=t[i](a),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(o,r)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var i=t.apply(e,n);function a(t){c(i,o,r,a,u,"next",t)}function u(t){c(i,o,r,a,u,"throw",t)}a(void 0)}))}}function d(t){return h(t)||f(t)||g(t)||l()}function l(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function f(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function h(t){if(Array.isArray(t))return v(t)}function p(t,e){return w(t)||y(t,e)||g(t,e)||m()}function m(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function g(t,e){if(t){if("string"===typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(t,e):void 0}}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function y(t,e){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,i=[],a=!0,u=!1;try{for(n=n.call(t);!(a=(o=n.next()).done);a=!0)if(i.push(o.value),e&&i.length===e)break}catch(c){u=!0,r=c}finally{try{a||null==n["return"]||n["return"]()}finally{if(u)throw r}}return i}}function w(t){if(Array.isArray(t))return t}var b=function(){n.e("components/firstui/fui-dialog/fui-dialog").then(function(){return resolve(n(362))}.bind(null,n)).catch(n.oe)},_=function(){n.e("components/firstui/fui-bottom-popup/fui-bottom-popup").then(function(){return resolve(n(369))}.bind(null,n)).catch(n.oe)},k=function(){n.e("components/firstui/fui-checkbox-group/fui-checkbox-group").then(function(){return resolve(n(350))}.bind(null,n)).catch(n.oe)},I=function(){n.e("components/firstui/fui-checkbox/fui-checkbox").then(function(){return resolve(n(355))}.bind(null,n)).catch(n.oe)},x={components:{fuiBottomPopup:_,fuiDialog:b,fuiCheckboxGroup:k,fuiCheckbox:I},data:function(){return{isShowDialog:!1,contentDialog:"",productListNew:[{guiGeInfo:[{guiGe:""}]}],tempItem:{guiGeInfo:[{guiGe:""}]},ticketInfo:{guigeArr:[],ticketTime:"",zp:"",ticketType:""},price:"",article_goodsDetail:"",contactInfo:{name:"",phone:""},isValidPhone:!1,isValidArr:[],isValidTax:!1,checkedAddress:{id:0,name:"",is_default:0,mobile:"",full_region:"",address:""},addressId:0,couponId:0,invoices:{type:"",name:"",tax_number:""},isNeedCertification:0,isNeedTicket:!1,openAttr:!1,cartGoods:[],isShowXY:!1,isJieShow:!1,ticketCount:1,chooseDate:"请选择日期",isYinSi:!0,sexVal:"请选择性别",isShowPopup:!1,pickerColumn:["男","女"],goods:{},newArrayTourism:{name:"",phone:""}}},onLoad:function(t){this.setData({id:parseInt(t.id),itemId:null===t||void 0===t?void 0:t.itemId});var e=this;this.getGoodsInfo(),o.default.request(r.default.CartGoodsCount).then((function(t){0===t.errno&&e.setData({cartGoodsCount:t.data.cartTotal.goodsCount})}))},onShow:function(){var e=t.getStorageSync("addressId");e&&this.setData({addressId:e});var n=t.getStorageSync("couponId");n&&this.setData({couponId:n}),this.getCheckoutInfo()},computed:{certificationInfo:function(){var t=this.ticketInfo.guigeArr,e=[];return t.forEach((function(t){if(t.chooseCount>0&&t.goods_number>0)for(var n=t.chooseCount;n>0;n--)e.push(t)})),e.map((function(t){return{ticketTime:t.ticketTime,guiGe:t.guiGe,name:"",card:"",cardImgFront:"",cardImgBehind:"",cardImgElectron:""}}))},totalMoney:function(){return this.goods.retail_price*this.ticketCount}},methods:{curriculumTempItem:function(t){var e=this.id;this.reLoad(e,t.id)},reLoad:function(t,e){this.setData({itemId:e}),this.chooseDate="请选择日期",this.ticketCount=1;var n=this;this.getGoodsInfo(),o.default.request(r.default.CartGoodsCount).then((function(t){0===t.errno&&n.setData({cartGoodsCount:t.data.cartTotal.goodsCount})}))},confirm:function(t){console.log(t);var e=t.extraInfo;null!==e&&void 0!==e&&e.guiGe?(this.goods.name=e.guiGe,this.goods.retail_price=e.retail_price,this.chooseDate=e.date):o.default.showErrorToast("该日没有售票")},delNewArrayTourism:function(){this.newArrayTourism.name="",this.newArrayTourism.phone=""},onConfirmPicker:function(t){var e=t.detail,n=(e.picker,e.value);e.index;this.sexVal=n,this.isShowPopup=!1},onCancelPicker:function(t){var e=t.detail;e.picker,e.value,e.index;this.isShowPopup=!1},popSex:function(){this.isShowPopup=!this.isShowPopup,console.log(this.isShowPopup)},dialogClick:function(t){if(0==t.index)return this.isShowDialog=!1,this.sexVal="请选择性别",this.contactInfo.name="",this.contactInfo.phone="",void(this.isValidPhone=!1);this.newArrayTourism={name:this.contactInfo.name,phone:this.contactInfo.phone},this.isShowDialog=!1,this.sexVal="请选择性别",this.contactInfo.name="",this.contactInfo.phone=""},dialogClose:function(){this.isShowDialog=!1},showdialog:function(){this.isShowDialog=!0},onYinSi:function(t){var e=p(t.detail.value,1),n=e[0];this.isYinSi="false"==n,console.log(this.isYinSi)},jia:function(){this.ticketCount<5?this.ticketCount++:o.default.showErrorToast("限购五张门票哦")},jian:function(){this.ticketCount>1&&this.ticketCount--},open:function(){console.log(this.$refs.calendar),this.$refs.calendar.open()},getGoodsInfo:function(){var t=this;o.default.request(r.default.GoodsDetail,{id:t.id}).then((function(e){if(0===e.errno){t.article_goodsDetail=t.escape2Html(e.data.info.goods_desc),e.data.info.goods_desc=e.data.info.goods_desc.match(/<p>(.*?)<\/p>/)[1],e.data.productList=e.data.productList.filter((function(t){return t.goods_specification_ids})),t.setData({goods:e.data.info,gallery:e.data.gallery,attribute:e.data.attribute,issueList:e.data.issue,comment:e.data.comment,brand:e.data.brand,specificationList:e.data.specificationList,productList:e.data.productList,userHasCollect:e.data.userHasCollect});var n={};null!==t&&void 0!==t&&t.itemId?(n=e.data.productList.filter((function(e){return e.id==(null===t||void 0===t?void 0:t.itemId)})),n.length>0&&(n=n[0])):n=t.productList[0];var o=e.data.productList;t.setData({tempItem:n,productListNew:o}),console.log(n,"slkdjfnkjlsdnvkj"),t.initTicketArr(),1==e.data.userHasCollect?t.setData({collectBackImage:t.hasCollectImage}):t.setData({collectBackImage:t.noCollectImage}),t.getGoodsRelated(),console.log(n,"slkdjfnkjlsdnvkj"),console.log(t.guigeArr,t.gallery,23333)}}))},getguigeArr:function(){var t=this.ticketArr,e=this.ticketTypeArr,n=this.ticketTypeIndex,o=this.chooseDate,r=t.filter((function(t){return console.log(t.date,o),t.pz==e[n]&&t.date==o}));return r.map((function(t){return{id:t.id,chooseCount:t.goods_number>0?1:0,guiGe:t.guiGe,goods_number:t.goods_number,retail_price:t.retail_price}}))},initTicketArr:function(){var t=this,e=this,n=[],o=this.tempItem,r=o.goods_specification_ids.split("_"),i=[];o["guiGeInfo"]=[],e.specificationList.map((function(t){return i=[].concat(d(i),d(t.valueList))}));var a={};r.map((function(e){i.map((function(n){if(e==n.id&&("规格"==n.name&&(a["guiGe"]=n.value),"日期"!=n.name&&"时间"!=n.name||(a["shiJian"]=n.value)),a["guiGe"]&&a["shiJian"]){var r=a.shiJian.split("&"),i=p(r,2),u=i[0],c=i[1],s=t.handleTime(u,c),l=s.map((function(e){return t.isWeekend(e)?{guiGe:a["guiGe"],shiJian:e,date:e,retail_price:o.weekend_price,goods_number:o.goods_number,id:o.id,info:"￥"+o.weekend_price}:{guiGe:a["guiGe"],shiJian:e,date:e,retail_price:o.retail_price,goods_number:o.goods_number,id:o.id,info:"￥"+o.retail_price}}));o["guiGeInfo"]=d(l),a={}}}))})),this.tempItem=o,e.productList.map((function(o){if(null!=o.goods_specification_ids&&o.id==e.tempItem.id){var r=o.goods_specification_ids.split("_"),i=[];e.specificationList.map((function(t){return i=[].concat(d(i),d(t.valueList))})),console.log(i);var a={};console.log(233),t.isWeekend(new Date)?e.price=o.weekend_price:e.price=o.retail_price,console.log(e.price,233),r.map((function(e){i.map((function(r){if(e==r.id&&(console.log(r),"规格"==r.name&&(a["guiGe"]=r.value),"日期"!=r.name&&"时间"!=r.name||(a["shiJian"]=r.value)),a["guiGe"]&&a["shiJian"]){var i=a.shiJian.split("&"),u=p(i,2),c=u[0],s=u[1],l=t.handleTime(c,s),f=l.map((function(e){return t.isWeekend(e)?{guiGe:a["guiGe"],shiJian:e,date:e,retail_price:o.weekend_price,goods_number:o.goods_number,id:o.id,info:"￥"+o.weekend_price}:{guiGe:a["guiGe"],shiJian:e,date:e,retail_price:o.retail_price,goods_number:o.goods_number,id:o.id,info:"￥"+o.retail_price}}));n=[].concat(d(n),d(f)),a={}}}))}))}}));var u=[];e.productListNew=e.productListNew.map((function(n){var o=n.goods_specification_ids.split("_"),r=[];e.specificationList.map((function(t){return r=[].concat(d(r),d(t.valueList))})),console.log(r);var i={};return n["guiGeInfo"]=[],o.map((function(e){r.map((function(o){if(e==o.id&&(console.log(o),"规格"==o.name&&(i["guiGe"]=o.value),"日期"!=o.name&&"时间"!=o.name||(i["shiJian"]=o.value)),i["guiGe"]&&i["shiJian"]){var r=i.shiJian.split("&"),a=p(r,2),c=a[0],s=a[1],l=t.handleTime(c,s),f=l.map((function(e){return t.isWeekend(e)?{guiGe:i["guiGe"],shiJian:e,date:e,retail_price:n.weekend_price,goods_number:n.goods_number,id:n.id,info:"￥"+n.weekend_price}:{guiGe:i["guiGe"],shiJian:e,date:e,retail_price:n.retail_price,goods_number:n.goods_number,id:n.id,info:"￥"+n.retail_price}}));n["guiGeInfo"]=d(f),u=[].concat(d(u),d(f)),i={}}}))})),n})),console.log(e.productListNew,2),console.log(n,"清洗出来的票"),e.setData({ticketArr:n,ticketArr1:u})},isWeekend:function(t){var e=new Date(t).getDay();return 6===e||0===e},handleTime:function(t,e){var n=new Date(t),o=new Date(e),r=function(t){return t.toString().length>1?t:"0".concat(t)},i=[];while(n<=o){var a=n.getMonth()+1,u=n.getDate(),c=n.getFullYear();i.push("".concat(c,"-").concat(r(a),"-").concat(r(u))),n.setDate(n.getDate()+1)}return i},getCheckoutInfo:function(){var e=this;console.log(e.addressId,e.couponId),o.default.request(r.default.CartCheckout,{addressId:e.addressId,couponId:e.couponId}).then((function(n){0===n.errno&&(console.log(n.data),e.setData({checkedAddress:n.data.checkedAddress})),t.hideLoading()}))},getGoodsRelated:function(){var t=this;o.default.request(r.default.GoodsRelated,{id:t.id}).then((function(e){0===e.errno&&t.setData({relatedGoods:e.data.goodsList})}))},getIsValidArr:function(){this.isValidArr=this.certificationInfo.map((function(t){return!1}))},validCard:function(t){var e=this.certificationInfo[t].card,n=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;n.test(e)||this.$set(this.isValidArr,t,!0),n.test(e)&&this.$set(this.isValidArr,t,!1)},validPhone:function(){var t=this.contactInfo.phone;this.isValidPhone=!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(t)},onName:function(t){var e=t.detail.value;this.contactInfo.name=e},onPhone:function(t){var e=t.detail.value;this.contactInfo.phone=e},onCertiName:function(t){var e=t.detail.value,n=t.currentTarget.dataset.i;this.certificationInfo[n].name=e},onCertiCard:function(t){var e=t.detail.value,n=t.currentTarget.dataset.i;this.certificationInfo[n].card=e},onAdress:function(t){var e=t.detail.value;this.adressInfo.adress=e},onJieShow:function(t){var e=p(t.detail.value,1),n=e[0];this.isJieShow="false"==n,console.log(this.isJieShow)},needCertification:function(){this.isNeedCertification=!this.isNeedCertification},needTicket:function(){this.isNeedTicket=!this.isNeedTicket},imageUrl:function(t){return t?"/static/images/buy/dui-2.png":"/static/images/buy/dui.png"},showPopup:function(){this.isShowXY=!0},closePopup:function(){this.isShowXY=!1},buy:function(){var e=this;return s(u().mark((function n(){var r,i,a;return u().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.showLoading(),r=e.chooseDate,i=e.newArrayTourism,"请选择日期"!=r){n.next=6;break}return o.default.showErrorToast("请选择日期"),n.abrupt("return");case 6:if(0!=i.phone.length){n.next=9;break}return o.default.showErrorToast("请添加游客"),n.abrupt("return");case 9:return n.prev=9,n.next=12,e.productDlete();case 12:return n.next=14,e.goodsClear();case 14:return a={chooseCount:e.ticketCount,id:e.tempItem.id,category_id:e.goods.category_id,isWeekend:e.isWeekend(e.chooseDate)},n.next=17,e.addToCart(a);case 17:e.submitOrder(),n.next=23;break;case 20:n.prev=20,n.t0=n["catch"](9),o.default.showErrorToast(n.t0.errMsg);case 23:case"end":return n.stop()}}),n,null,[[9,20]])})))()},addToCart:function(e){var n=this;return s(u().mark((function i(){return u().wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,o.default.request(r.default.CartAdd,{goodsId:n.id,number:e.chooseCount,productId:e.id,category_id:e.category_id,isWeekend:e.isWeekend,certification:JSON.stringify([{choosetime:n.chooseDate}])},"POST").then((function(e){var n=e;0==n.errno||t.showToast({image:"/static/static/images/icon_error.png",title:n.errmsg,mask:!0})}));case 2:case"end":return i.stop()}}),i)})))()},goodsClear:function(){return s(u().mark((function t(){return u().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o.default.request(r.default.goodsClear,{},"GET");case 2:case"end":return t.stop()}}),t)})))()},productDlete:function(){var t=this;return s(u().mark((function e(){return u().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.default.request(r.default.productDlete,{goods_id:t.id},"POST");case 2:case"end":return e.stop()}}),e)})))()},submitOrder:function(){o.default.request(r.default.OrderSubmit,{addressId:this.addressId,couponId:this.couponId,category_id:this.goods.category_id,name:this.newArrayTourism.name,phone:this.newArrayTourism.phone},"POST").then((function(e){if(0===e.errno){var n=e.data.orderInfo.id;i.default.payOrder(parseInt(n)).then((function(e){t.redirectTo({url:"/pages/payResult/payResult?status=1&orderId="+n})})).catch((function(e){t.redirectTo({url:"/pages/payResult/payResult?status=0&orderId="+n})}))}else o.default.showErrorToast("下单失败")})).catch((function(t){o.default.showErrorToast("下单失败")}))}}};e.default=x}).call(this,n(1)["default"])},44:function(t,e,n){"use strict";n.r(e);var o=n(45),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},45:function(t,e,n){}},[[34,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/buyNew/buyNew.js.map