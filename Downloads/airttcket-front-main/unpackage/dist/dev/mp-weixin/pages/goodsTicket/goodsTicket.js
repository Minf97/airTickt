(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodsTicket/goodsTicket"],{233:function(t,e,n){"use strict";(function(t){n(5);i(n(4));var e=i(n(234));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n(1)["createPage"])},234:function(t,e,n){"use strict";n.r(e);var i=n(235),r=n(237);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n(239);var a,c=n(13),s=Object(c["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],a);s.options.__file="pages/goodsTicket/goodsTicket.vue",e["default"]=s.exports},235:function(t,e,n){"use strict";n.r(e);var i=n(236);n.d(e,"render",(function(){return i["render"]})),n.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(e,"components",(function(){return i["components"]}))},236:function(t,e,n){"use strict";var i;n.r(e),n.d(e,"render",(function(){return r})),n.d(e,"staticRenderFns",(function(){return a})),n.d(e,"recyclableRender",(function(){return o})),n.d(e,"components",(function(){return i}));try{i={mpHtml:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/mp-html/components/mp-html/mp-html")]).then(n.bind(null,368))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var t=this,e=t.$createElement;t._self._c},o=!1,a=[];r._withStripped=!0},237:function(t,e,n){"use strict";n.r(e);var i=n(238),r=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=r.a},238:function(t,e,n){"use strict";(function(t){function i(t,e){return a(t)||o(t,e)||u(t,e)||r()}function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t,e){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var i,r,o=[],a=!0,c=!1;try{for(n=n.call(t);!(a=(i=n.next()).done);a=!0)if(o.push(i.value),e&&o.length===e)break}catch(s){c=!0,r=s}finally{try{a||null==n["return"]||n["return"]()}finally{if(c)throw r}}return o}}function a(t){if(Array.isArray(t))return t}function c(t){return d(t)||l(t)||u(t)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,e){if(t){if("string"===typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(t,e):void 0}}function l(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function d(t){if(Array.isArray(t))return h(t)}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;getApp();var f=n(9),g=n(10),p={data:function(){return{ticketSort:{gong:[],zhuan:[]},guigeArr:[],isZhuan:!1,ticketTypeIndex:0,ticketTimeIndex:0,ticketGuigeIndex:0,article_goodsDetail:"",chooseDate:"选择日期",ticketTimeArr:[]}},computed:{ticketArr:function(){return this.isZhuan?this.ticketSort["zhuan"]:this.ticketSort["gong"]},ticketRi:function(){var t="专业日：2022-11-08至2022-11-10；面向18岁以上成年人开放.",e="公众日：2022-11-11至2022-11-13；面向所有人开放.";return this.isZhuan?t:e},ticketTypeArr:function(){var t=this.ticketArr,e=[];return t.map((function(t){var n=t.pz;-1==e.indexOf(n)&&e.push(n)})),e},ticketTip:function(){var t=this.ticketTypeArr,e=this.ticketTypeIndex,n="实物票：凭门票和个人有效证件入场(顺丰包邮).",i="电子票：大陆居民刷“身份证”入场；港澳台居民凭“通行证”入场";return"实物票"==t[e]?n:i}},onLoad:function(t){this.setData({id:parseInt(t.id)}),0==this.ticketSort["gong"].length&&(this.isZhuan=!0);var e=this;this.getGoodsInfo(),f.request(g.CartGoodsCount).then((function(t){0===t.errno&&e.setData({cartGoodsCount:t.data.cartTotal.goodsCount})}))},methods:{choose:function(t){var e=this;this.ticketTimeArr.forEach((function(t,n){t["ischoose"]=!1,e.$set(e.ticketTimeArr,n,t)}));var n=this.ticketTimeArr[t];n["ischoose"]=!n["ischoose"],n["ischoose"]&&(this.chooseDate=n.date,this.guigeArr=this.getguigeArr()),this.$set(this.ticketTimeArr,t,n)},getTicketTimeArr:function(){var t=this.ticketArr,e=this.ticketTypeArr,n=this.ticketTypeIndex,i=Date.now();t.sort((function(t,e){var n=Math.abs(i-new Date(t.shiJian).getTime()),r=Math.abs(i-new Date(e.shiJian).getTime());return n-r}));var r=t.slice(0,9),o=r.filter((function(t){new Date(t.shiJian).getTime();return t.pz==e[n]}));return o.map((function(t){return Object.assign(t,{date:t.shiJian,info:"￥"+t.retail_price}),t}))},handleTime:function(t,e){var n=new Date(t),i=new Date(e),r=function(t){return t.toString().length>1?t:"0".concat(t)},o=[];while(n<=i){var a=n.getMonth()+1,c=n.getDate(),s=n.getFullYear();o.push("".concat(s,"-").concat(r(a),"-").concat(r(c))),n.setDate(n.getDate()+1)}return o},open:function(){console.log(this.$refs.calendar),this.$refs.calendar.open()},confirm:function(t){console.log(t),this.chooseDate=t.fulldate,this.guigeArr=this.getguigeArr()},getguigeArr:function(){var t=this.ticketArr,e=this.ticketTypeArr,n=this.ticketTypeIndex,i=this.chooseDate,r=t.filter((function(t){return console.log(t.date,i),t.pz==e[n]&&t.date==i}));return r.map((function(t){return{id:t.id,chooseCount:t.goods_number>0?1:0,guiGe:t.guiGe,goods_number:t.goods_number,retail_price:t.retail_price}}))},dingGou:function(){var e=this.guigeArr,n=this.ticketTypeArr,i=this.ticketTypeIndex,r=this.ticketTimeArr,o=this.ticketTimeIndex,a=this.isZhuan?"专业日":"公众日",c=e.filter((function(t){return t.chooseCount>0}));if(0!=c.length){var s={guigeArr:e,ticketType:n[i],ticketTime:r[o],zp:a,choosetime:this.chooseDate};t.setStorageSync("buyItem",JSON.stringify(s)),wx.navigateTo({url:"../buy/buy?id=".concat(this.id,"&category_id=").concat(this.goods.category_id)})}else f.showErrorToast("没有选择商品呢")},jian:function(e){var n=this.guigeArr;0!=n[e].chooseCount?(n[e].chooseCount-=1,this.$set(this.guigeArr,e,n[e])):t.showToast({title:"不能再减了噢~",duration:2e3,icon:"none"})},jia:function(e){var n=this.guigeArr,i=n[e];console.log(i.goods_number,i.chooseCount),i.goods_number<i.chooseCount+1?t.showToast({title:"库存不足",duration:2e3,icon:"none"}):(i.chooseCount+=1,this.$set(this.guigeArr,e,i))},toastNone:function(){t.showToast({title:"已售罄~",duration:2e3,icon:"none"})},changeZp:function(e){var n=this;this.ticketSort[e].length>0?(this.isZhuan="zhuan"==e,this.setData({ticketTypeIndex:0,ticketTimeIndex:0,ticketGuigeIndex:0},(function(){n.setData({guigeArr:n.getguigeArr()})}))):t.showToast({title:"没有了噢~",duration:2e3,icon:"none"})},changeTicketType:function(t){this.ticketTypeIndex=t,this.ticketTimeIndex=0},changeTicketTime:function(t){this.ticketTimeIndex=t},initTicketArr:function(){var t=this,e=this,n=[];e.productList.map((function(r){if(null!=r.goods_specification_ids){var o=r.goods_specification_ids.split("_"),a=[];e.specificationList.map((function(t){return a=[].concat(c(a),c(t.valueList))})),console.log(a);var s={};o.map((function(e){a.map((function(o){if(e==o.id&&(console.log(o),"规格"==o.name&&(s["guiGe"]=o.value),"日期"!=o.name&&"时间"!=o.name||(s["shiJian"]=o.value),"专业｜普通"==o.name&&(s["zp"]=o.value),"票种"==o.name&&(s["pz"]=o.value)),s["guiGe"]&&s["shiJian"]&&s["zp"]&&s["pz"]){var a=s.shiJian.split("&"),u=i(a,2),l=u[0],d=u[1],h=t.handleTime(l,d),f=h.map((function(e){return t.isWeekend(e)?{guiGe:s["guiGe"],shiJian:e,date:e,zp:s["zp"],pz:s["pz"],retail_price:r.weekend_price,goods_number:r.goods_number,id:r.id,info:"￥"+r.weekend_price}:{guiGe:s["guiGe"],shiJian:e,date:e,zp:s["zp"],pz:s["pz"],retail_price:r.retail_price,goods_number:r.goods_number,id:r.id,info:"￥"+r.retail_price}}));n=[].concat(c(n),c(f)),s={}}}))}))}}));var r={gong:[],zhuan:[]};n.map((function(t){"普通"==t.zp?r["gong"]=[].concat(c(r["gong"]),[t]):r["zhuan"]=[].concat(c(r["zhuan"]),[t])})),console.log(r,"清洗出来的票"),e.setData({ticketSort:r}),this.ticketTimeArr=e.getTicketTimeArr()},isWeekend:function(t){var e=new Date(t).getDay();return 6===e||0===e},getGoodsInfo:function(){var t=this;f.request(g.GoodsDetail,{id:t.id}).then((function(e){0===e.errno&&(t.setData({goods:e.data.info,gallery:e.data.gallery,attribute:e.data.attribute,issueList:e.data.issue,comment:e.data.comment,brand:e.data.brand,specificationList:e.data.specificationList,productList:e.data.productList,userHasCollect:e.data.userHasCollect}),t.initTicketArr(),1==e.data.userHasCollect?t.setData({collectBackImage:t.hasCollectImage}):t.setData({collectBackImage:t.noCollectImage}),t.article_goodsDetail=t.escape2Html(e.data.info.goods_desc),t.getGoodsRelated(),t.setData({guigeArr:t.getguigeArr()}),console.log(t.guigeArr,t.gallery,23333))}))},getGoodsRelated:function(){var t=this;f.request(g.GoodsRelated,{id:t.id}).then((function(e){0===e.errno&&t.setData({relatedGoods:e.data.goodsList})}))},clickSkuValue:function(t){for(var e=t.currentTarget.dataset.nameId,n=t.currentTarget.dataset.valueId,i=this.specificationList,r=0;r<i.length;r++)if(i[r].specification_id==e)for(var o=0;o<i[r].valueList.length;o++)i[r].valueList[o].id==n?i[r].valueList[o].checked?i[r].valueList[o].checked=!1:i[r].valueList[o].checked=!0:i[r].valueList[o].checked=!1;this.setData({specificationList:i}),this.changeSpecInfo()},getCheckedSpecValue:function(){for(var t=[],e=this.specificationList,n=0;n<e.length;n++){for(var i={nameId:e[n].specification_id,valueId:0,valueText:""},r=0;r<e[n].valueList.length;r++)e[n].valueList[r].checked&&(i.valueId=e[n].valueList[r].id,i.valueText=e[n].valueList[r].value);t.push(i)}return t},setSpecValueStatus:function(){},isCheckedAllSpec:function(){return!this.getCheckedSpecValue().some((function(t){if(0==t.valueId)return!0}))},getCheckedSpecKey:function(){var t=this.getCheckedSpecValue().map((function(t){return t.valueId}));return t.join("_")},changeSpecInfo:function(){var t=this.getCheckedSpecValue(),e=t.filter((function(t){return 0!=t.valueId})).map((function(t){return t.valueText}));e.length>0?this.setData({checkedSpecText:e.join("　")}):this.setData({checkedSpecText:"请选择规格数量"})},getCheckedProductItem:function(t){return this.productList.filter((function(e){return e.goods_specification_ids==t}))},switchAttrPop:function(){0==this.openAttr&&this.setData({openAttr:!this.openAttr})},closeAttr:function(){this.setData({openAttr:!1})},addCannelCollect:function(){var e=this;f.request(g.CollectAddOrDelete,{typeId:0,valueId:this.id},"POST").then((function(n){var i=n;0==i.errno?"add"==i.data.type?e.setData({collectBackImage:e.hasCollectImage}):e.setData({collectBackImage:e.noCollectImage}):t.showToast({image:"/static/static/images/icon_error.png",title:i.errmsg,mask:!0})}))},openCartPage:function(){t.switchTab({url:"/pages/cart/cart"})},addToCart:function(){var e=this;if(!1===this.openAttr)this.setData({openAttr:!this.openAttr});else{if(!this.isCheckedAllSpec())return t.showToast({image:"/static/static/images/icon_error.png",title:"请选择规格",mask:!0}),!1;var n=this.getCheckedProductItem(this.getCheckedSpecKey());if(!n||n.length<=0)return t.showToast({image:"/static/static/images/icon_error.png",title:"库存不足",mask:!0}),!1;if(n.goods_number<this.number)return t.showToast({image:"/static/static/images/icon_error.png",title:"库存不足",mask:!0}),!1;f.request(g.CartAdd,{goodsId:this.goods.id,number:this.number,productId:n[0].id},"POST").then((function(n){var i=n;0==i.errno?(t.showToast({title:"添加成功"}),e.setData({openAttr:!e.openAttr,cartGoodsCount:i.data.cartTotal.goodsCount})):t.showToast({image:"/static/static/images/icon_error.png",title:i.errmsg,mask:!0})}))}},cutNumber:function(){this.setData({number:this.number-1>1?this.number-1:1})},addNumber:function(){this.setData({number:this.number+1})}}};e.default=p}).call(this,n(1)["default"])},239:function(t,e,n){"use strict";n.r(e);var i=n(240),r=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=r.a},240:function(t,e,n){}},[[233,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/goodsTicket/goodsTicket.js.map