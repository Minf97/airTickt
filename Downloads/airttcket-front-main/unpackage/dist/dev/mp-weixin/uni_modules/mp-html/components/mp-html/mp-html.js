(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/mp-html/components/mp-html/mp-html"],{368:function(e,t,n){"use strict";n.r(t);var o=n(369),r=n(371);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n(374);var l,c=n(13),a=Object(c["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],l);a.options.__file="uni_modules/mp-html/components/mp-html/mp-html.vue",t["default"]=a.exports},369:function(e,t,n){"use strict";n.r(t);var o=n(370);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},370:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return l})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return o}));var r=function(){var e=this,t=e.$createElement;e._self._c},i=!1,l=[];r._withStripped=!0},371:function(e,t,n){"use strict";n.r(t);var o=n(372),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},372:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(373));function r(e){return e&&e.__esModule?e:{default:e}}var i=function(){n.e("uni_modules/mp-html/components/mp-html/node/node").then(function(){return resolve(n(390))}.bind(null,n)).catch(n.oe)},l=[],c={name:"mp-html",data:function(){return{nodes:[]}},props:{containerStyle:{type:String,default:""},content:{type:String,default:""},copyLink:{type:[Boolean,String],default:!0},domain:String,errorImg:{type:String,default:""},lazyLoad:{type:[Boolean,String],default:!1},loadingImg:{type:String,default:""},pauseVideo:{type:[Boolean,String],default:!0},previewImg:{type:[Boolean,String],default:!0},scrollTable:[Boolean,String],selectable:[Boolean,String],setTitle:{type:[Boolean,String],default:!0},showImgMenu:{type:[Boolean,String],default:!0},tagStyle:Object,useAnchor:[Boolean,Number]},components:{node:i},watch:{content:function(e){this.setContent(e)}},created:function(){this.plugins=[];for(var e=l.length;e--;)this.plugins.push(new l[e](this))},mounted:function(){this.content&&!this.nodes.length&&this.setContent(this.content)},beforeDestroy:function(){this._hook("onDetached"),clearInterval(this._timer)},methods:{in:function(e,t,n){e&&t&&n&&(this._in={page:e,selector:t,scrollTop:n})},navigateTo:function(t,n){var o=this;return new Promise((function(r,i){if(o.useAnchor){n=n||parseInt(o.useAnchor)||0;var l=" ";l=">>>";var c=e.createSelectorQuery().in(o._in?o._in.page:o).select((o._in?o._in.selector:"._root")+(t?"".concat(l,"#").concat(t):"")).boundingClientRect();o._in?c.select(o._in.selector).scrollOffset().select(o._in.selector).boundingClientRect():c.selectViewport().scrollOffset(),c.exec((function(t){if(t[0]){var l=t[1].scrollTop+t[0].top-(t[2]?t[2].top:0)+n;o._in?o._in.page[o._in.scrollTop]=l:e.pageScrollTo({scrollTop:l,duration:300}),r()}else i(Error("Label not found"))}))}else i(Error("Anchor is disabled"))}))},getText:function(e){var t="";return function e(n){for(var o=0;o<n.length;o++){var r=n[o];if("text"===r.type)t+=r.text.replace(/&amp;/g,"&");else if("br"===r.name)t+="\n";else{var i="p"===r.name||"div"===r.name||"tr"===r.name||"li"===r.name||"h"===r.name[0]&&r.name[1]>"0"&&r.name[1]<"7";i&&t&&"\n"!==t[t.length-1]&&(t+="\n"),r.children&&e(r.children),i&&"\n"!==t[t.length-1]?t+="\n":"td"!==r.name&&"th"!==r.name||(t+="\t")}}}(e||this.nodes),t},getRect:function(){var t=this;return new Promise((function(n,o){e.createSelectorQuery().in(t).select("#_root").boundingClientRect().exec((function(e){return e[0]?n(e[0]):o(Error("Root label not found"))}))}))},pauseMedia:function(){for(var e=(this._videos||[]).length;e--;)this._videos[e].pause()},setContent:function(e,t){var n=this;t&&this.imgList||(this.imgList=[]);var r,i=new o.default(this).parse(e);this.$set(this,"nodes",t?(this.nodes||[]).concat(i):i),this._videos=[],this.$nextTick((function(){n._hook("onLoad"),n.$emit("load")})),clearInterval(this._timer),this._timer=setInterval((function(){n.getRect().then((function(e){e.height===r&&(n.$emit("ready",e),clearInterval(n._timer)),r=e.height})).catch((function(){}))}),350)},_hook:function(e){for(var t=l.length;t--;)this.plugins[t][e]&&this.plugins[t][e]()}}};t.default=c}).call(this,n(1)["default"])},374:function(e,t,n){"use strict";n.r(t);var o=n(375),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},375:function(e,t,n){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/mp-html/components/mp-html/mp-html.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/mp-html/components/mp-html/mp-html-create-component',
    {
        'uni_modules/mp-html/components/mp-html/mp-html-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(368))
        })
    },
    [['uni_modules/mp-html/components/mp-html/mp-html-create-component']]
]);