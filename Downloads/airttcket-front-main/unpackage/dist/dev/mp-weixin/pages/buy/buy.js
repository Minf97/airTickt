(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/buy/buy"],{

/***/ 209:
/*!******************************************************************************************!*\
  !*** /Users/macbook/Downloads/airttcket-front-main/main.js?{"page":"pages%2Fbuy%2Fbuy"} ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 5);


var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _buy = _interopRequireDefault(__webpack_require__(/*! ./pages/buy/buy.vue */ 210));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;createPage(_buy.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 210:
/*!***********************************************************************!*\
  !*** /Users/macbook/Downloads/airttcket-front-main/pages/buy/buy.vue ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _buy_vue_vue_type_template_id_63838ed8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buy.vue?vue&type=template&id=63838ed8& */ 211);
/* harmony import */ var _buy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buy.vue?vue&type=script&lang=js& */ 213);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _buy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _buy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _buy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buy.vue?vue&type=style&index=0&lang=css& */ 218);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 13);

var renderjs





/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _buy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _buy_vue_vue_type_template_id_63838ed8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _buy_vue_vue_type_template_id_63838ed8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _buy_vue_vue_type_template_id_63838ed8___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/buy/buy.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 211:
/*!******************************************************************************************************!*\
  !*** /Users/macbook/Downloads/airttcket-front-main/pages/buy/buy.vue?vue&type=template&id=63838ed8& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_template_id_63838ed8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./buy.vue?vue&type=template&id=63838ed8& */ 212);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_template_id_63838ed8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_template_id_63838ed8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_template_id_63838ed8___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_template_id_63838ed8___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 212:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/macbook/Downloads/airttcket-front-main/pages/buy/buy.vue?vue&type=template&id=63838ed8& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.certificationInfo, function(item, index) {
    var $orig = _vm.__get_orig(item)

    var m0 = _vm.indexToNumber(index)
    var m1 = _vm.indexToNumber(index)
    return {
      $orig: $orig,
      m0: m0,
      m1: m1
    }
  })

  var m2 = _vm.imageUrl(_vm.isNeedTicket)
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        m2: m2
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 213:
/*!************************************************************************************************!*\
  !*** /Users/macbook/Downloads/airttcket-front-main/pages/buy/buy.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./buy.vue?vue&type=script&lang=js& */ 214);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 214:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/macbook/Downloads/airttcket-front-main/pages/buy/buy.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 40));




























































































































































































































































var _util = _interopRequireDefault(__webpack_require__(/*! ../../utils/util.js */ 9));
var _api = _interopRequireDefault(__webpack_require__(/*! ../../config/api.js */ 10));
var _pay = _interopRequireDefault(__webpack_require__(/*! ../../services/pay.js */ 43));

var _uploadImg = _interopRequireDefault(__webpack_require__(/*! ./uploadImg.js */ 215));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
// import qiniu from 'qiniu'
var _default =

{
  components: {
    // fuiBottomPopup,
  },

  data: function data() {
    return {
      // options: ['最新车讯', '降价排行', 'SUV', '违章罚单', '提车试驾', '测评体验', '选车指南', '美女车模', '加油优惠卡', '维修保养'],
      // tag: '请选择',
      // tagShow: false,

      // 要购买的票信息
      ticketInfo: {
        // 成人票/儿童票等等
        guigeArr: [],
        // 时间 YY-MM-DD
        ticketTime: "",
        // 专业票/公众日
        zp: "",
        // 实物票/电子票
        ticketType: "" },


      // 联系信息
      contactInfo: {
        name: "",
        phone: '' },

      isValidPhone: false,

      isValidArr: [],
      isValidTax: false,

      // 邮寄地址
      checkedAddress: {
        id: 0,
        name: '',
        is_default: 0,
        mobile: '',
        full_region: '',
        address: '' },

      addressId: 0,
      couponId: 0,

      // 发票
      invoices: {
        type: "",
        name: "",
        tax_number: "" },

      certificationInfo: [],

      // 
      isNeedCertification: 0,
      isNeedTicket: false,
      // 组件标志位
      openAttr: false,
      // 购物车列表
      cartGoods: [],

      // 是否展示弹窗
      isShowXY: false,
      // 是否接受协议
      isJieShow: false };

  },
  onLoad: function onLoad(options) {var

    id =

    options.id,category_id = options.category_id;

    var ticketInfo = uni.getStorageSync('buyItem');
    this.ticketInfo = JSON.parse(ticketInfo);
    this.getIsValidArr();
    this.setData({
      id: id,
      category_id: category_id });

    console.log(id, category_id);

    // try {
    // 	var addressId = uni.getStorageSync('addressId');

    // 	if (addressId) {
    // 		this.setData({
    // 			addressId: addressId
    // 		});
    // 	}

    // 	var couponId = uni.getStorageSync('couponId');

    // 	if (couponId) {
    // 		this.setData({
    // 			couponId: couponId
    // 		});
    // 	}
    // 	this.getCheckoutInfo();
    // } catch (e) {
    // 	console.log(e)
    // 	// Do something when catch error
    // }


    // console.log(this.ticketInfo)
    // console.log(this.isValidArr);
  },

  onShow: function onShow() {
    var addressId = uni.getStorageSync('addressId');
    if (addressId) {
      this.setData({
        addressId: addressId });

    }

    var couponId = uni.getStorageSync('couponId');
    if (couponId) {
      this.setData({
        couponId: couponId });

    }
    this.getCheckoutInfo();
    this.getCertificationInfo();
  },


  computed: {
    // 总额
    totalMoney: function totalMoney() {
      var money = 0;
      this.ticketInfo.guigeArr.forEach(function (item) {
        // 单价*数量
        money += item.retail_price * item.chooseCount;
      });
      return money;
    } },

  methods: {
    getCertificationInfo: function getCertificationInfo() {
      var guiGeArr = this.ticketInfo.guigeArr;
      var filterArr = [];

      guiGeArr.forEach(function (item) {
        if (item.chooseCount > 0 && item.goods_number > 0) {
          for (var i = item.chooseCount; i > 0; i--) {
            filterArr.push(item);
          }
        }
        // return item.chooseCount > 0 && item.goods_number > 0
      });
      this.certificationInfo = filterArr.map(function (item) {
        return {
          ticketTime: item.ticketTime,
          guiGe: item.guiGe,
          name: "",
          card: "",
          cardImgFront: "",
          cardImgBehind: "",
          cardImgElectron: "" };

      });
    },
    indexToNumber: function indexToNumber(index) {
      switch (index + 1) {
        case 1:
          return '①';
          break;
        case 2:
          return '②';
          break;
        case 3:
          return '③';
          break;
        case 4:
          return '④';
          break;
        case 5:
          return '⑤';
          break;
        case 6:
          return '⑥';
          break;
        case 7:
          return '⑦';
          break;
        case 8:
          return '⑧';
          break;
        case 9:
          return '⑨';
          break;
        case 10:
          return '⑩';
          break;
        default:
          return index;
          break;}

    },
    onCardImgElectron: function onCardImgElectron(index) {
      var item = this.certificationInfo[index];
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], //从相册选择
        success: function success(res) {
          var tempFilePaths = res.tempFilePaths;
          item.cardImgElectron = tempFilePaths;
          uni.showLoading({
            title: "正在上传...",
            mask: true });


          // 获取七牛token
          var uptoken = '';
          _util.default.request('https://beijing.biubbmk.cn/airshow/api/user/uptoken').then(function (response) {
            // console.log(res)
            uptoken = response.uptoken;

            var img = res.tempFilePaths[0]; //拿到里面的
            //下面的key是自己拿时间戳和随机数组成的key值
            var key = new Date().getTime();
            uni.uploadFile({
              url: "https://up-z2.qiniup.com", //华南地区上传
              filePath: img,
              name: 'file',
              method: "POST",
              formData: {
                'key': key, //key值
                'token': uptoken //七牛云token值
              },
              success: function success(uploadFileRes) {
                //uploadFileRes 返回了data是一个json字符串 
                //拿到里面的key拼接上域名，再反出去就ok了
                var strToObj = JSON.parse(uploadFileRes.data),
                backUrl =
                'http://rnwwnc95c.hn-bkt.clouddn.com/' +
                strToObj.key;
                console.log(backUrl);
                item.cardImgElectron = backUrl;
                // data.success(backUrl); //反出去链接
                uni.hideLoading();
              },
              fail: function fail(_fail) {
                uni.showToast({
                  title: "网络错误",
                  icon: "none" });

                console.log(_fail);
                // data.fail(fail); //反出去错误信息
                uni.hideLoading();
              } });

          });
          // return;

        } });

    },
    previewCardImgElectron: function previewCardImgElectron(index) {
      var item = this.certificationInfo[index];
      uni.previewImage({
        current: 1,
        urls: item.cardImgElectron,
        success: function success(res) {
          console.log(res);
        },
        fail: function fail(err) {
          console.log(err);
        } });

    },

    previewCardImgFront: function previewCardImgFront(index) {
      var item = this.certificationInfo[index];
      uni.previewImage({
        current: 1,
        urls: item.cardImgFront,
        success: function success(res) {
          console.log(res);
        },
        fail: function fail(err) {
          console.log(err);
        } });

    },
    onCardImgFront: function onCardImgFront(index) {
      var item = this.certificationInfo[index];
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], //从相册选择
        success: function success(res) {
          var tempFilePaths = res.tempFilePaths;
          item.cardImgFront = tempFilePaths;
          console.log(tempFilePaths);
          // this.setData({
          // 	[`certificationInfo[${index}].cardImgFront`]: tempFilePaths
          // })
          uni.showLoading({
            title: "正在上传...",
            mask: true });


          // 获取七牛token
          var uptoken = '';
          _util.default.request(_api.default.uploadImg).then(function (response) {
            // console.log(res)
            uptoken = response.uptoken;

            var img = res.tempFilePaths[0]; //拿到里面的
            //下面的key是自己拿时间戳和随机数组成的key值
            var key = new Date().getTime();
            uni.uploadFile({
              url: _api.default.qiniuyunUrl, //华南地区上传
              filePath: img,
              name: 'file',
              method: "POST",
              formData: {
                'key': key, //key值
                'token': uptoken //七牛云token值
              },
              success: function success(uploadFileRes) {
                //uploadFileRes 返回了data是一个json字符串 
                //拿到里面的key拼接上域名，再反出去就ok了
                var strToObj = JSON.parse(uploadFileRes.data);
                var backUrl = _api.default.qiniuyunBackUrl + strToObj.key;
                console.log(backUrl);
                item.cardImgFront = backUrl;
                // data.success(backUrl); //反出去链接
                uni.hideLoading();
              },
              fail: function fail(_fail2) {
                uni.showToast({
                  title: "网络错误",
                  icon: "none" });

                console.log(_fail2);
                // data.fail(fail); //反出去错误信息
                uni.hideLoading();
              } });

          });
          // return;
        } });

    },
    previewCardImgBehind: function previewCardImgBehind(index) {
      var item = this.certificationInfo[index];
      uni.previewImage({
        current: 1,
        urls: item.CardImgBehind });

    },
    onCardImgBehind: function onCardImgBehind(index) {
      var item = this.certificationInfo[index];
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], //从相册选择
        success: function success(res) {
          var tempFilePaths = res.tempFilePaths;
          item.cardImgBehind = tempFilePaths;
          uni.showLoading({
            title: "正在上传...",
            mask: true });


          // 获取七牛token
          var uptoken = '';
          _util.default.request(_api.default.uploadImg).then(function (response) {
            // console.log(res)
            uptoken = response.uptoken;

            var img = res.tempFilePaths[0]; //拿到里面的
            //下面的key是自己拿时间戳和随机数组成的key值
            var key = new Date().getTime();
            uni.uploadFile({
              url: _api.default.qiniuyunUrl, //华南地区上传
              filePath: img,
              name: 'file',
              method: "POST",
              formData: {
                'key': key, //key值
                'token': uptoken //七牛云token值
              },
              success: function success(uploadFileRes) {
                //uploadFileRes 返回了data是一个json字符串 
                //拿到里面的key拼接上域名，再反出去就ok了
                var strToObj = JSON.parse(uploadFileRes.data),
                backUrl =
                _api.default.qiniuyunBackUrl +
                strToObj.key;
                console.log(backUrl);
                console.log(item.cardImgBehind);
                item.cardImgBehind = backUrl;
                // data.success(backUrl); //反出去链接
                uni.hideLoading();
              },
              fail: function fail(_fail3) {
                uni.showToast({
                  title: "网络错误",
                  icon: "none" });

                console.log(_fail3);
                // data.fail(fail); //反出去错误信息
                uni.hideLoading();
              } });

          });
          // return;


        } });

    },
    onTypeInvoices: function onTypeInvoices(e) {var


      value =

      e.detail.value;
      this.invoices.type = value;
    },
    onNameInvoices: function onNameInvoices(e) {var


      value =

      e.detail.value;
      this.invoices.name = value;
    },
    onTaxInvoices: function onTaxInvoices(e) {var


      value =

      e.detail.value;
      this.invoices.tax_number = value;
    },
    validTax_Invoices: function validTax_Invoices() {
      var tax_number = this.invoices.tax_number;
      this.isValidTax = !_util.default.checkTax(tax_number);
    },
    getCheckoutInfo: function getCheckoutInfo() {
      var that = this;
      console.log(that.addressId, that.couponId);
      _util.default.request(_api.default.CartCheckout, {
        addressId: that.addressId,
        couponId: that.couponId }).
      then(function (res) {
        if (res.errno === 0) {
          console.log(res.data);
          that.setData({
            // checkedGoodsList: res.data.checkedGoodsList,
            checkedAddress: res.data.checkedAddress
            // actualPrice: res.data.actualPrice,
            // checkedCoupon: res.data.checkedCoupon,
            // couponList: res.data.couponList,
            // couponPrice: res.data.couponPrice,
            // freightPrice: res.data.freightPrice,
            // goodsTotalPrice: res.data.goodsTotalPrice,
            // orderTotalPrice: res.data.orderTotalPrice
          });
        }

        uni.hideLoading();
      });
    },
    selectAddress: function selectAddress() {
      uni.navigateTo({
        url: '/pages/shopping/address/address' });

    },
    addAddress: function addAddress() {
      uni.navigateTo({
        url: '/pages/shopping/addressAdd/addressAdd' });

    },
    getIsValidArr: function getIsValidArr() {
      this.isValidArr = this.certificationInfo.map(function (item) {return item = false;});
    },
    // 校验身份证
    validCard: function validCard(index) {
      var card = this.certificationInfo[index].card;

      var id =
      /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;

      if (!id.test(card)) {
        this.$set(this.isValidArr, index, true);
      }
      if (id.test(card)) {
        this.$set(this.isValidArr, index, false);
      }
    },

    validPhone: function validPhone() {
      var phone = this.contactInfo.phone;
      this.isValidPhone = !/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone);
    },
    // 联系信息
    onName: function onName(e) {var


      value =

      e.detail.value;
      this.contactInfo.name = value;
    },
    onPhone: function onPhone(e) {var


      value =

      e.detail.value;
      this.contactInfo.phone = value;
    },
    // 证件信息
    onCertiName: function onCertiName(e) {var


      value =






      e.detail.value,i = e.currentTarget.dataset.i;
      // console.log(e)
      this.certificationInfo[i].name = value;
    },
    onCertiCard: function onCertiCard(e) {var


      value =






      e.detail.value,i = e.currentTarget.dataset.i;
      // console.log(e);
      this.certificationInfo[i].card = value;
    },
    // 邮寄地址
    onAdress: function onAdress(e) {var


      value =

      e.detail.value;
      this.adressInfo.adress = value;
    },

    onJieShow: function onJieShow(e) {
      var value = e.detail.value;
      if (value.length > 0) {
        this.isJieShow = true;
      } else {
        this.isJieShow = false;
      }

      console.log(this.isJieShow);
    },



    // tagTap() {
    // 	this.$refs.ddmTag.show()
    // 	this.tagShow = true;
    // },
    // tagItemClick(e) {
    // 	console.log(e)
    // 	this.tag = e.text
    // 	this.tagClose()
    // },
    // tagClose() {
    // 	this.tagShow = false;
    // },


    // 是否稍后填写证件
    needCertification: function needCertification() {
      this.isNeedCertification = !this.isNeedCertification;
    },
    // 是否需要发票
    needTicket: function needTicket() {
      this.isNeedTicket = !this.isNeedTicket;
    },

    imageUrl: function imageUrl(isDui) {
      return isDui ? '/static/images/buy/dui-2.png' : '/static/images/buy/dui.png';
    },

    showPopup: function showPopup() {
      this.isShowXY = true;
    },

    closePopup: function closePopup() {
      this.isShowXY = false;
    },

    buy: function buy() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var guigeArr, isWeekend, i;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                uni.showLoading();
                // 校验表单
                if (_this.isCheckedAllSpec()) {_context.next = 3;break;}return _context.abrupt("return");case 3:_context.prev = 3;_context.next = 6;return (





                  _this.productDlete());case 6:_context.next = 8;return (

                  _this.goodsClear());case 8:
                // 加入购物车
                guigeArr = _this.ticketInfo.guigeArr;
                isWeekend = _this.isWeekend(_this.ticketInfo.choosetime);
                guigeArr = guigeArr.filter(function (item) {return item.chooseCount;});
                i = 0;case 12:if (!(i < guigeArr.length)) {_context.next = 18;break;}_context.next = 15;return (
                  _this.addToCart(guigeArr[i], i, isWeekend));case 15:i++;_context.next = 12;break;case 18:

                // 调起支付
                _this.submitOrder();_context.next = 24;break;case 21:_context.prev = 21;_context.t0 = _context["catch"](3);

                _util.default.showErrorToast(_context.t0.errMsg);case 24:case "end":return _context.stop();}}}, _callee, null, [[3, 21]]);}))();


    },
    isWeekend: function isWeekend(date) {
      var dayOfWeek = new Date(date).getDay();
      return dayOfWeek === 6 || dayOfWeek === 0;
    },

    // 校验
    isCheckedAllSpec: function isCheckedAllSpec() {
      var isValidPhone = this.isValidPhone;
      var isValidArr = this.isValidArr;
      var card = this.certificationInfo.map(function (item) {return item = item.card;});
      var cardImgFront = this.certificationInfo.map(function (item) {return item = item.cardImgFront;});
      var cardImgBehind = this.certificationInfo.map(function (item) {return item = item.cardImgBehind;});
      var cardImgElectron = this.certificationInfo.map(function (item) {return item = item.cardImgElectron;});
      var phone = this.contactInfo.phone;
      var isJieShow = this.isJieShow;
      var ticketInfo = this.ticketInfo;

      // 如果还有表单未校验成功
      if (
      isValidPhone == true ||
      isValidArr.indexOf(true) != -1 ||
      card.filter(function (item) {return item.length == 0 ? true : false;}).length > 0 ||
      phone.length == 0 ||
      // 身份证图片上传

      ticketInfo.zp == '专业日' && (

      cardImgFront.filter(function (item) {return item.length == 0 ? true : false;}).length > 0 ||
      cardImgBehind.filter(function (item) {return item.length == 0 ? true : false;}).length > 0 ||
      cardImgElectron.filter(function (item) {return item.length == 0 ? true : false;}).length > 0))


      {
        uni.showToast({
          image: '/static/static/images/icon_error.png',
          title: '请填写完整',
          mask: true });

        return false;
      }

      console.log(isJieShow);

      if (isJieShow == false) {
        uni.showToast({
          image: '/static/static/images/icon_error.png',
          title: '请勾选协议',
          mask: true });

        return false;
      }
      return true;
    },

    // 加入购物车
    addToCart: function addToCart(ticket, index, isWeekend) {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:

                _this2.certificationInfo[index]["choosetime"] = _this2.ticketInfo.choosetime;
                console.log(_this2.certificationInfo[index]);_context2.next = 4;return (
                  _util.default.request(
                  _api.default.CartAdd, {
                    goodsId: _this2.id,
                    // 该票的张数
                    number: ticket.chooseCount,
                    // 该票的id
                    productId: ticket.id,
                    // category_id??
                    category_id: _this2.category_id,
                    certification: JSON.stringify([_this2.certificationInfo[index]]),
                    isWeekend: isWeekend },

                  'POST').
                  then(function (res) {
                    var _res = res;

                    if (_res.errno == 0) {} else {
                      uni.showToast({
                        image: '/static/static/images/icon_error.png',
                        title: _res.errmsg,
                        mask: true });

                    }
                  }));case 4:case "end":return _context2.stop();}}}, _callee2);}))();
    },

    // 购物车置空
    goodsClear: function goodsClear() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                  _util.default.request(
                  _api.default.goodsClear, {},
                  'GET'));case 2:case "end":return _context3.stop();}}}, _callee3);}))();

    },

    // 删除购物车中的票类商品
    productDlete: function productDlete() {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                  _util.default.request(
                  _api.default.productDlete, {
                    goods_id: _this3.id },

                  'POST'));case 2:case "end":return _context4.stop();}}}, _callee4);}))();

    },

    // 调起支付
    submitOrder: function submitOrder() {
      // if (this.addressId <= 0) {
      // 	util.showErrorToast('请选择收货地址');
      // 	return false;
      // }

      _util.default.request(
      _api.default.OrderSubmit, {
        addressId: this.addressId,
        couponId: this.couponId,
        // category_id??
        category_id: this.category_id,
        // 是否需要地址
        isNoNeedAddress: this.ticketInfo.ticketType == '电子票' ? true : false,
        // 联系信息
        name: this.contactInfo.name,
        phone: this.contactInfo.phone,
        // 证件信息
        // certification: JSON.stringify(this.certificationInfo),
        // 需要发票
        isNeedTicket: this.isNeedTicket,
        // 发票信息
        invoices: JSON.stringify(this.invoices) },

      'POST').
      then(function (res) {
        if (res.errno === 0) {
          var orderId = res.data.orderInfo.id;
          _pay.default.payOrder(parseInt(orderId)).
          then(function (res) {
            uni.redirectTo({
              url: '/pages/payResult/payResult?status=1&orderId=' +
              orderId });

          }).
          catch(function (res) {
            uni.redirectTo({
              url: '/pages/payResult/payResult?status=0&orderId=' +
              orderId });

          });
        } else {
          _util.default.showErrorToast('下单失败');
        }
      }).catch(function (err) {
        _util.default.showErrorToast('下单失败');
      });
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 218:
/*!********************************************************************************************************!*\
  !*** /Users/macbook/Downloads/airttcket-front-main/pages/buy/buy.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./buy.vue?vue&type=style&index=0&lang=css& */ 219);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_buy_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 219:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/macbook/Downloads/airttcket-front-main/pages/buy/buy.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[209,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/buy/buy.js.map