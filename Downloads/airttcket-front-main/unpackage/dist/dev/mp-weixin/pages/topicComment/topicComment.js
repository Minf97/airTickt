(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/topicComment/topicComment"],{134:function(t,e,n){"use strict";(function(t){n(5);a(n(4));var e=a(n(135));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n(1)["createPage"])},135:function(t,e,n){"use strict";n.r(e);var a=n(136),o=n(138);for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n(140);var s,u=n(13),c=Object(u["default"])(o["default"],a["render"],a["staticRenderFns"],!1,null,null,null,!1,a["components"],s);c.options.__file="pages/topicComment/topicComment.vue",e["default"]=c.exports},136:function(t,e,n){"use strict";n.r(e);var a=n(137);n.d(e,"render",(function(){return a["render"]})),n.d(e,"staticRenderFns",(function(){return a["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return a["recyclableRender"]})),n.d(e,"components",(function(){return a["components"]}))},137:function(t,e,n){"use strict";var a;n.r(e),n.d(e,"render",(function(){return o})),n.d(e,"staticRenderFns",(function(){return s})),n.d(e,"recyclableRender",(function(){return i})),n.d(e,"components",(function(){return a}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=!1,s=[];o._withStripped=!0},138:function(t,e,n){"use strict";n.r(e);var a=n(139),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},139:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;getApp();var a=n(9),o=n(10),i={data:function(){return{comments:[],allCommentList:[],picCommentList:[],typeId:0,valueId:0,showType:0,allCount:0,hasPicCount:0,allPage:1,picPage:1,size:20,pitem:{pic_url:"",id:""}}},onLoad:function(t){this.setData({typeId:t.typeId,valueId:t.valueId}),this.getCommentCount(),this.getCommentList()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onReachBottom:function(){if(console.log("onPullDownRefresh"),0==this.showType){if(this.allCount/this.size<this.allPage)return!1;this.setData({allPage:this.allPage+1})}else{if(this.hasPicCount/this.size<this.picPage)return!1;this.setData({picPage:this.picPage+1})}this.getCommentList()},methods:{getCommentCount:function(){var t=this;a.request(o.CommentCount,{valueId:t.valueId,typeId:t.typeId}).then((function(e){0===e.errno&&t.setData({allCount:e.data.allCount,hasPicCount:e.data.hasPicCount})}))},getCommentList:function(){var t=this;a.request(o.CommentList,{valueId:t.valueId,typeId:t.typeId,size:t.size,page:0==t.showType?t.allPage:t.picPage,showType:t.showType}).then((function(e){if(0===e.errno)if(0==t.showType){e.data.data;t.setData({allCommentList:t.allCommentList.concat(e.data.data),allPage:e.data.currentPage,comments:t.allCommentList.concat(e.data.data)})}else t.setData({picCommentList:t.picCommentList.concat(e.data.data),picPage:e.data.currentPage,comments:t.picCommentList.concat(e.data.data)})}))},switchTab:function(){this.setData({showType:1==this.showType?0:1}),this.getCommentList()}}};e.default=i},140:function(t,e,n){"use strict";n.r(e);var a=n(141),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},141:function(t,e,n){}},[[134,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/topicComment/topicComment.js.map