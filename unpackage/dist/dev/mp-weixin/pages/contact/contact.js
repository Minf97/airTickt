(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/contact/contact"],{199:function(t,e,n){"use strict";(function(t,e){var r=n(4);n(26);r(n(25));var o=r(n(200));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n(1)["default"],n(2)["createPage"])},200:function(t,e,n){"use strict";n.r(e);var r=n(201),o=n(203);for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n(205);var a,c=n(34),s=Object(c["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],a);s.options.__file="pages/contact/contact.vue",e["default"]=s.exports},201:function(t,e,n){"use strict";n.r(e);var r=n(202);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},202:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return o})),n.d(e,"staticRenderFns",(function(){return a})),n.d(e,"recyclableRender",(function(){return i})),n.d(e,"components",(function(){return r}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=!1,a=[];o._withStripped=!0},203:function(t,e,n){"use strict";n.r(e);var r=n(204),o=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},204:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(30),o=n(31),i={data:function(){return{navList:[],goodsList:[],id:0,currentCategory:{name:"",front_name:""},scrollLeft:0,scrollTop:0,scrollHeight:0,page:1,size:1e4,iindex:0,iitem:{id:"",list_pic_url:"",name:"",retail_price:""}}},onLoad:function(e){var n=this;e.id&&n.setData({id:parseInt(e.id)}),t.getSystemInfo({success:function(t){n.setData({scrollHeight:t.windowHeight})}}),this.getCategoryInfo()},onReady:function(){},onShow:function(){console.log(1)},onHide:function(){},onUnload:function(){},methods:{getCategoryInfo:function(){var t=this;r.request(o.GoodsCategory,{id:this.id}).then((function(e){if(0==e.errno){t.setData({navList:e.data.brotherCategory,currentCategory:e.data.currentCategory});for(var n=0,r=t.navList.length,o=0;o<r;o++)if(n+=1,t.navList[o].id==t.id)break;n>r/2&&r>5&&t.setData({scrollLeft:60*n}),t.getGoodsList()}}))},getGoodsList:function(){var t=this;r.request(o.GoodsList,{categoryId:t.id,page:t.page,size:t.size}).then((function(e){t.setData({goodsList:e.data.goodsList})}))},switchCate:function(t){if(this.id==t.currentTarget.dataset.id)return!1;var e=this,n=t.detail.x,r=t.currentTarget;n<60?e.setData({scrollLeft:r.offsetLeft-60}):n>330&&e.setData({scrollLeft:r.offsetLeft}),this.setData({id:t.currentTarget.dataset.id}),this.getCategoryInfo()}}};e.default=i}).call(this,n(2)["default"])},205:function(t,e,n){"use strict";n.r(e);var r=n(206),o=n.n(r);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},206:function(t,e,n){}},[[199,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/contact/contact.js.map