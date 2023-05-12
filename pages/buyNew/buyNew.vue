<template>
	<view>
		<view class="container">

			<!-- 购票推荐 -->
			<scroll-view class="contentScroll box" :scroll-x="true">

				<view class="contentScrollItem" v-for="item in productListNew" @click="curriculumTempItem(item)">
					<div class="contentScrollItemTxt">{{item.guiGeInfo[0].guiGe}}</div>
					<image src="/static/images/buyNew/ticketImg.png" mode="aspectFit"></image>
				</view>

			</scroll-view>

			<!-- 入园须知 -->
			<view class="box">
				<view class="bb" style="padding-top: 20rpx; border-bottom: none; margin-bottom: 20rpx;">
					<view class="tt1">
						<view>入园须知</view>
					</view>

					<view class="content" style="border-bottom: none;">
						<view class="cc">1.每日营业时间：10：00-18:00,17:30分后停止入场。（如遇特殊情况闭馆则另行通知）</view>
						<view class="cc">2.入场方式：凭二维码在道闸处扫码入场，无需换票。</view>
						<view class="cc">3.游客参观全程需佩戴口罩，做好个人防护，文明参观。</view>
						<view class="cc">4.每日门票数量有限，售完即止。</view>
						<view class="cc">5.惠民票一经出售不退不换。</view>
					</view>
				</view>
			</view>

			<!-- 标题盒子1 -->
			<view class="box">
				<view class="piaobox">
					<view class="contentScrollItem" style="width: 100rpx;height: 100rpx;">
						<div class="contentScrollItemTxt1" style="font-size: 16rpx;">{{tempItem.guiGeInfo[0].guiGe}}
						</div>
						<image src="/static/images/buyNew/ticketImg.png" mode="aspectFit"
							style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="textboxp">
						<view class="ttp">{{tempItem.guiGeInfo[0].guiGe}}</view>
						<view class="tttipp">{{goods.goods_desc}}</view>
					</view>
					<view class="pricep">￥{{ price || goods.retail_price}}</view>
				</view>
				<!-- 购票数量 -->
				<view class="bb" style="border-bottom: none;">
					<view class="tt1 pppmount" style="margin-bottom: 20px;">
						<view>购票数量：</view>
						<view class="pd3">
							<view class="jian" @click="jian">-</view>
							<view class="count">{{ticketCount}}</view>
							<view class="jia" @click="jia">+</view>
						</view>
					</view>


					<view class="tt1" style="margin-bottom: 20px;flex-direction: column;align-items: flex-start;">
						<view>选择日期：</view>
						<uni-calendar ref="calendar" :selected="ticketArr" :insert="false" @confirm="confirm" />
						<view class="chooseDate" @click="open">{{chooseDate}}</view>
					</view>
				</view>
			</view>

			<!-- 联系信息 -->
			<view class="box">
				<view style="width: 100%; height: 10px;"></view>
				<view class="bb" style="border-bottom: none;">
					<view class="tt1 tt1New">
						<view>游客信息</view>
						<view class="valNew" style="color: #5695cd;">1个电话号码限购5张门票</view>
					</view>
				</view>

				<view class="addTorism" @click="showdialog" v-if="newArrayTourism.phone.length == 0">
					<image src="/static/images/buyNew/jia.png" mode="aspectFit"></image>
					<view class="addTorText">添加游客</view>
				</view>
				<view class="addTorismHas" style="margin-bottom: 10rpx;" v-else>
					<image @click="delNewArrayTourism" src="/static/images/buyNew//forbit.png" mode="aspectFit"></image>
					<view class="newArrayTourismLine">
						<div class="newArrayTourismName">{{newArrayTourism.name}}</div>
						<div class="newArrayTourismPhone">{{newArrayTourism.phone}}</div>
					</view>
				</view>

				<view class="userYinSi">
					<fui-checkbox-group class="demo" name="checkbox" v-model="vals" @change="change">
						<view class="fui-list__item">
							<view class="fui-align__center">
								<fui-checkbox value="1" checked borderRadius="5rpx"></fui-checkbox>
							</view>
						</view>
					</fui-checkbox-group>
					勾选同意《用户隐私条约》
				</view>

				<fui-dialog :show="isShowDialog" :content="contentDialog" maskClosable @click="dialogClick"
					@close="dialogClose">
					<template #default>
						<view class="inp">
							<view class="tit">姓名</view>
							<input type="text" v-show="isShowDialog" :value="contactInfo.name" @input="onName"
								placeholder="请输入姓名" placeholder-style="font-size: 14px;">
						</view>
						<view class="inp" style="border-bottom: 30px;">
							<view class="tit">电话</view>
							<input type="number" v-show="isShowDialog" :value="contactInfo.phone" @input="onPhone"
								@blur="validPhone" placeholder="联系人手机" placeholder-style="font-size: 14px;">
						</view>

						<view class="er" v-if="isValidPhone">*电话号码填写错误，请重新填写</view>

						<view class="inp" style="border-bottom: 30px;">
							<!-- <view class="tit">性别</view>
							<view class="valInp" @click="popSex">
								<view class="valval">{{sexVal}}</view>
								<image src="../../static/static/images/go.png" mode="aspectFit"></image>
							</view> -->
							<!-- <van-cell title-style="text-align:left;" style="width: 100%;" title="性别" is-link value="请选择性别" @click="popSex" /> -->
						</view>
					</template>
				</fui-dialog>
			</view>

			<fui-bottom-popup :show="isShowPopup" @close="closePopup">
				<!-- <view class="fui-custom__wrap">
					
				</view> -->
				<!-- 		<van-picker :columns="pickerColumn" @confirm="onConfirmPicker" @cancel="onCancelPicker"
					:show-toolbar="true"></van-picker> -->
			</fui-bottom-popup>

			<!-- 入园须知 -->
			<view class="box">
				<view class="bb" style="padding-top: 20rpx; border-bottom: none; margin-bottom: 20rpx;">
					<view class="tt1">
						<view>入园须知</view>
					</view>

					<view class="content" style="border-bottom: none;">
						<view class="cc gg">1、身高1米（含）以下的儿童免票（需测量身高）。</view>
						<view class="cc gg">2、现役军人、军队离退休干部、本市户籍退役军人、烈属、残疾人凭本人有效证件免票。</view>
						<view class="cc gg">3、在职、退休、残疾消防救援人员和消防救援院校学员凭本人有效证件免票。</view>
						<view class="cc gg">4、民政部门确认的最低生活保障对象、特困人员和本市户籍的享受抚恤补助的优抚对象凭有效证件免票。</view>
					</view>
				</view>
			</view>

			<!-- 退改说明 -->
			<view class="box">
				<view class="bb" style="padding-top: 20rpx; border-bottom: none; margin-bottom: 20rpx;">
					<view class="tt1">
						<view>退改说明</view>
					</view>

					<view class="content" style="border-bottom: none;">
						<view class="cc gg">1、游客不可再现修改入园人信息</view>
						<view class="cc gg">2、退票规则</view>
						<view class="cc gg">
							<image src="/static/images/buyNew/1.png" mode="aspectFit"></image>
						</view>
						<view class="cc gg"> (1).使用日期前1天的15时00分（含）之前申请取消，可免费取消。</view>
						<view class="cc gg"> (2).使用日期前1天的15时00分（含）之后无法申请退票，可在使用日期当天18:00（含）之前申请免费改期。</view>
						<view class="cc gg">3、改期规则：</view>
						<view class="cc gg">
							<image src="/static/images/buyNew/2.png" mode="aspectFit"></image>
						</view>
						<view class="cc gg"> (1).使用日期当天的18时00分（含）之前申请改期，可免费改期。</view>
					</view>
				</view>
			</view>

			<view class="detail" style="background-color: #fff;">
				<!-- <template is="wxParse" :data="wxParseData:goodsDetail.nodes"/> -->
				<mp-html :content="article_goodsDetail"></mp-html>
			</view>

			<!-- fix框 -->
			<view class="fffix" style="z-index: 10;">
				<view class="mon">总额 <view class="monVal">￥{{totalMoney}}</view>
				</view>
				<view class="ffright">
					<view class="mx">明细</view>
					<view class="ljyd" @click="buy">立即支付</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	// import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue"
	// import customAddress from "@/components/custom-address.vue"
	import util from "../../utils/util.js"
	import api from "../../config/api.js"
	import pay from "../../services/pay.js"
	// 上传
	import upload from './uploadImg.js'

	import fuiDialog from "@/components/firstui/fui-dialog/fui-dialog.vue"
	import fuiBottomPopup from "@/components/firstui/fui-bottom-popup/fui-bottom-popup.vue"
	import fuiCheckboxGroup from "@/components/firstui/fui-checkbox-group/fui-checkbox-group.vue"
	import fuiCheckbox from "@/components/firstui/fui-checkbox/fui-checkbox.vue"

	export default {
		components: {
			fuiBottomPopup,
			fuiDialog,
			fuiCheckboxGroup,
			fuiCheckbox
		},
		data() {
			return {
				// options: ['最新车讯', '降价排行', 'SUV', '违章罚单', '提车试驾', '测评体验', '选车指南', '美女车模', '加油优惠卡', '维修保养'],
				// tag: '请选择',
				// tagShow: false,
				isShowDialog: false,
				contentDialog: '',
				productListNew: [{
					guiGeInfo: [{
						guiGe: ''
					}],
				}],
				tempItem: {
					guiGeInfo: [{
						guiGe: '',
					}]
				},
				// 要购买的票信息
				ticketInfo: {
					// 成人票/儿童票等等
					guigeArr: [],
					// 时间 YY-MM-DD
					ticketTime: "",
					// 专业票/公众日
					zp: "",
					// 实物票/电子票
					ticketType: ""
				},
				price: '',
				article_goodsDetail: '',
				// 联系信息
				contactInfo: {
					name: "",
					phone: '',
				},
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
					address: ''
				},
				addressId: 0,
				couponId: 0,

				// 发票
				invoices: {
					type: "",
					name: "",
					tax_number: ""
				},

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
				isJieShow: false,

				ticketCount: 1,
				chooseDate: '请选择日期',
				isYinSi: true,

				sexVal: "请选择性别",
				isShowPopup: false,
				pickerColumn: ['男', '女'],
				goods: {},
				newArrayTourism: {
					name: "",
					phone: ""
				}
			}
		},
		onLoad(options) {

			this.setData({
				id: parseInt(options.id), // id: 1181000,
				itemId: options?.itemId,
			});

			var that = this;
			this.getGoodsInfo();
			util.request(api.CartGoodsCount).then(function(res) {
				if (res.errno === 0) {
					that.setData({
						cartGoodsCount: res.data.cartTotal.goodsCount
					});
				}
			});


		},

		onShow() {
			var addressId = uni.getStorageSync('addressId');
			if (addressId) {
				this.setData({
					addressId: addressId
				});
			}

			var couponId = uni.getStorageSync('couponId');
			if (couponId) {
				this.setData({
					couponId: couponId
				});
			}
			this.getCheckoutInfo();
		},


		computed: {

			// 证件信息
			certificationInfo() {
				const guiGeArr = this.ticketInfo.guigeArr;
				const filterArr = [];

				guiGeArr.forEach(item => {

					if (item.chooseCount > 0 && item.goods_number > 0) {
						for (let i = item.chooseCount; i > 0; i--) {
							filterArr.push(item);
						}
					}
					// return item.chooseCount > 0 && item.goods_number > 0
				})


				return filterArr.map(item => {

					return {
						ticketTime: item.ticketTime,
						guiGe: item.guiGe,
						name: "",
						card: "",
						cardImgFront: "",
						cardImgBehind: "",
						cardImgElectron: ""
					}
				})
			},
			// 总额
			totalMoney() {
				return this.price * this.ticketCount;
			}
		},
		methods: {
			curriculumTempItem(product) {
				const id = this.id;
				this.reLoad(id, product.id)
			},
			reLoad(id, itemId) {
				this.setData({
					itemId: itemId,
				});
				this.chooseDate = "请选择日期";
				this.ticketCount = 1;

				var that = this;
				this.getGoodsInfo();
				util.request(api.CartGoodsCount).then(function(res) {
					if (res.errno === 0) {
						that.setData({
							cartGoodsCount: res.data.cartTotal.goodsCount
						});
					}
				});
			},
			confirm(e) {
				console.log(e);
				const {
					extraInfo
				} = e;
				if (!extraInfo?.guiGe) {
					util.showErrorToast('该日没有售票');
					return;
				}
				this.goods.name = extraInfo.guiGe;
				this.goods.retail_price = extraInfo.retail_price;
				this.chooseDate = extraInfo.date;
			},
			delNewArrayTourism() {
				this.newArrayTourism.name = "";
				this.newArrayTourism.phone = "";
			},
			onConfirmPicker(event) {
				const {
					picker,
					value,
					index
				} = event.detail;
				this.sexVal = value;
				this.isShowPopup = false;
			},
			onCancelPicker(event) {
				const {
					picker,
					value,
					index
				} = event.detail;
				this.isShowPopup = false;
			},
			popSex() {
				this.isShowPopup = !this.isShowPopup;
				console.log(this.isShowPopup);
			},
			dialogClick(e) {
				if (e.index == 0) {
					// 初始化
					this.isShowDialog = false;
					this.sexVal = '请选择性别';
					this.contactInfo.name = "";
					this.contactInfo.phone = "";
					this.isValidPhone = false;
					return;
				}
				// 判空
				// if (
				// 	this.isValidPhone ||
				// 	this.sexVal == '请选择性别'
				// ) {
				// 	util.showErrorToast('没填写完噢');
				// 	return;
				// }
				// push进去
				this.newArrayTourism = {
					name: this.contactInfo.name,
					phone: this.contactInfo.phone
				}
				// 初始化
				this.isShowDialog = false;
				this.sexVal = '请选择性别';
				this.contactInfo.name = "";
				this.contactInfo.phone = "";
			},
			dialogClose() {
				this.isShowDialog = false;
			},
			showdialog() {
				this.isShowDialog = true;
			},
			onYinSi(e) {
				const {
					detail: {
						value: [value]
					}
				} = e;
				// console.log(e.detail)
				this.isYinSi = value == "false" ? true : false;
				console.log(this.isYinSi)
			},
			jia() {
				if (this.ticketCount < 5) {
					this.ticketCount++;
				} else {
					util.showErrorToast('限购五张门票哦')
				}
			},
			jian() {
				if (this.ticketCount > 1) {
					this.ticketCount--;
				}
			},
			open() {
				console.log(this.$refs.calendar);
				this.$refs.calendar.open();
			},
			getGoodsInfo: function() {
				let that = this;
				util.request(api.GoodsDetail, {
					id: that.id
				}).then(function(res) {
					if (res.errno === 0) {
						that.article_goodsDetail = that.escape2Html(res.data.info.goods_desc);

						res.data.info.goods_desc = res.data.info.goods_desc.match(/<p>(.*?)<\/p>/)[1];
						res.data.productList = res.data.productList.filter(item => item
							.goods_specification_ids)


						that.setData({
							goods: res.data.info,
							gallery: res.data.gallery,
							attribute: res.data.attribute,
							issueList: res.data.issue,
							comment: res.data.comment,
							brand: res.data.brand,
							specificationList: res.data.specificationList,
							productList: res.data.productList,
							userHasCollect: res.data.userHasCollect,
						});

						var tempItem = {};
						// 如果有itemid，就去productlist里找
						if (that?.itemId) {
							tempItem = res.data.productList.filter(item => {
								return item.id == that?.itemId
							})
							if (tempItem.length > 0) tempItem = tempItem[0]
						} else {
							tempItem = that.productList[0]
						}
						let productListNew = res.data.productList

						that.setData({
							// guigeArr: that.getguigeArr(),
							tempItem: tempItem,
							productListNew: productListNew
						})
						console.log(tempItem, "slkdjfnkjlsdnvkj");
						that.initTicketArr();

						if (res.data.userHasCollect == 1) {
							that.setData({
								collectBackImage: that.hasCollectImage
							});
						} else {
							that.setData({
								collectBackImage: that.noCollectImage
							});
						}

						//WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that)

						that.getGoodsRelated();


						console.log(tempItem, "slkdjfnkjlsdnvkj");
						console.log(that.guigeArr, that.gallery, 23333)
					}
				});
			},
			// 计算得到规格数组
			getguigeArr() {
				const ticketArr = this.ticketArr;
				const ticketTypeArr = this.ticketTypeArr;
				const ticketTypeIndex = this.ticketTypeIndex;
				const chooseDate = this.chooseDate;

				let arr = ticketArr.filter(item => {
					console.log(item.date, chooseDate);
					return item.pz == ticketTypeArr[ticketTypeIndex] && item.date == chooseDate
				})
				return arr = arr.map(item => {

					return {
						id: item.id,
						chooseCount: item.goods_number > 0 ? 1 : 0,
						guiGe: item.guiGe,
						goods_number: item.goods_number,
						retail_price: item.retail_price
					}
				})
			},
			initTicketArr() {
				let that = this;
				let ticketArr = [];

				let tempItem = this.tempItem;
				let idsArr = tempItem.goods_specification_ids.split("_");
				let valArr = [];
				tempItem["guiGeInfo"] = []

				that.specificationList.map(sf => valArr = [...valArr, ...sf.valueList]);
				let obj = {};
				// 对数组遍历寻找到对应的数据
				idsArr.map(ids => {
					valArr.map(val => {
						if (ids == val.id) {
							if (val.name == "规格") {
								obj["guiGe"] = val.value;
							}

							if (val.name == "日期" || val.name == "时间") {
								obj["shiJian"] = val.value;
							}
						}

						if (
							obj["guiGe"] &&
							obj["shiJian"]
						) {
							const [day1, day2] = obj.shiJian.split("&");
							const timearr = this.handleTime(day1, day2);
							const tmpArr = timearr.map(e => {
								if (this.isWeekend(e)) {
									return {
										guiGe: obj["guiGe"],
										shiJian: e,
										date: e,
										retail_price: tempItem.weekend_price,
										goods_number: tempItem.goods_number,
										id: tempItem.id,
										info: ("￥" + tempItem.weekend_price)
									}
								} else {
									return {
										guiGe: obj["guiGe"],
										shiJian: e,
										date: e,
										retail_price: tempItem.retail_price,
										goods_number: tempItem.goods_number,
										id: tempItem.id,
										info: ("￥" + tempItem.retail_price)
									}
								}
							})
							tempItem["guiGeInfo"] = [...tmpArr];
							obj = {};
						}
					})
				})
				this.tempItem = tempItem;



				that.productList.map(item => {
					// 将 goods_specification_ids 变成数组
					if (item.goods_specification_ids == null || item.id != that.tempItem.id) {
						return;
					}

					let idsArr = item.goods_specification_ids.split("_");
					let valArr = [];

					that.specificationList.map(sf => valArr = [...valArr, ...sf.valueList]);
					console.log(valArr)
					let obj = {};
					console.log(233)
					if (this.isWeekend(new Date())) {
						that.price = item.weekend_price
					} else {
						that.price = item.retail_price
					}
					console.log(that.price, 233)
					// 对数组遍历寻找到对应的数据
					idsArr.map(ids => {
						valArr.map(val => {

							if (ids == val.id) {
								console.log(val)

								if (val.name == "规格") {
									obj["guiGe"] = val.value;
								}

								if (val.name == "日期" || val.name == "时间") {
									obj["shiJian"] = val.value;
								}
							}


							if (
								obj["guiGe"] &&
								obj["shiJian"]
							) {

								const [day1, day2] = obj.shiJian.split("&");
								const timearr = this.handleTime(day1, day2);
								const tmpArr = timearr.map(e => {
									if (this.isWeekend(e)) {
										return {
											guiGe: obj["guiGe"],
											shiJian: e,
											date: e,
											retail_price: item.weekend_price,
											goods_number: item.goods_number,
											id: item.id,
											info: ("￥" + item.weekend_price)
										}
									} else {
										return {
											guiGe: obj["guiGe"],
											shiJian: e,
											date: e,
											retail_price: item.retail_price,
											goods_number: item.goods_number,
											id: item.id,
											info: ("￥" + item.retail_price)
										}
									}
								})
								ticketArr = [...ticketArr, ...tmpArr];
								obj = {};
							}
						})
					})
				})

				let ticketArr1 = [];
				// console.log(that.productListNew)
				that.productListNew = that.productListNew.map(item => {

					let idsArr = item.goods_specification_ids.split("_");
					let valArr = [];

					that.specificationList.map(sf => valArr = [...valArr, ...sf.valueList]);
					console.log(valArr)
					let obj = {};
					// 对数组遍历寻找到对应的数据
					item["guiGeInfo"] = []
					idsArr.map(ids => {
						valArr.map(val => {
							if (ids == val.id) {
								console.log(val)

								if (val.name == "规格") {
									obj["guiGe"] = val.value;
								}

								if (val.name == "日期" || val.name == "时间") {
									obj["shiJian"] = val.value;
								}
							}


							if (
								obj["guiGe"] &&
								obj["shiJian"]
							) {

								const [day1, day2] = obj.shiJian.split("&");
								const timearr1 = this.handleTime(day1, day2);
								const tmpArr1 = timearr1.map(e => {
									if (this.isWeekend(e)) {
										return {
											guiGe: obj["guiGe"],
											shiJian: e,
											date: e,
											retail_price: item.weekend_price,
											goods_number: item.goods_number,
											id: item.id,
											info: ("￥" + item.weekend_price)
										}
									} else {
										return {
											guiGe: obj["guiGe"],
											shiJian: e,
											date: e,
											retail_price: item.retail_price,
											goods_number: item.goods_number,
											id: item.id,
											info: ("￥" + item.retail_price)
										}
									}
								})
								item["guiGeInfo"] = [...tmpArr1];
								ticketArr1 = [...ticketArr1, ...tmpArr1];
								obj = {};
							}
						})
					})
					return item
				})
				console.log(that.productListNew, 2)
				console.log(ticketArr, "清洗出来的票")
				that.setData({
					ticketArr,
					ticketArr1
				});
			},
			isWeekend(date) {
				const dayOfWeek = new Date(date).getDay();
				return dayOfWeek === 6 || dayOfWeek === 0;
			},
			handleTime(a, b) {
				let start = new Date(a);
				let end = new Date(b);
				const handle = (n) => {
					return n.toString().length > 1 ? n : `0${n}`
				}

				let result = [];
				while (start <= end) {
					let month = start.getMonth() + 1;
					let date = start.getDate();
					let year = start.getFullYear();
					result.push(`${year}-${handle(month)}-${handle(date)}`);
					start.setDate(start.getDate() + 1);
				}

				return result
				// console.log(result);

			},
			getCheckoutInfo() {
				let that = this;
				console.log(that.addressId, that.couponId);
				util.request(api.CartCheckout, {
					addressId: that.addressId,
					couponId: that.couponId
				}).then(function(res) {
					if (res.errno === 0) {
						console.log(res.data);
						that.setData({
							// checkedGoodsList: res.data.checkedGoodsList,
							checkedAddress: res.data.checkedAddress,
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
			getGoodsRelated: function() {
				let that = this;
				util.request(api.GoodsRelated, {
					id: that.id
				}).then(function(res) {
					if (res.errno === 0) {
						that.setData({
							relatedGoods: res.data.goodsList
						});
					}
				});
			},
			getIsValidArr() {
				this.isValidArr = this.certificationInfo.map(item => item = false);
			},
			// 校验身份证
			validCard(index) {
				const card = this.certificationInfo[index].card;

				const id =
					/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;

				if (!id.test(card)) {
					this.$set(this.isValidArr, index, true)
				}
				if (id.test(card)) {
					this.$set(this.isValidArr, index, false)
				}
			},

			validPhone() {
				const phone = this.contactInfo.phone
				this.isValidPhone = !/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone)
			},
			// 联系信息
			onName(e) {
				const {
					detail: {
						value
					}
				} = e;
				this.contactInfo.name = value;
			},
			onPhone(e) {
				const {
					detail: {
						value
					}
				} = e;
				this.contactInfo.phone = value;
			},
			// 证件信息
			onCertiName(e) {
				const {
					detail: {
						value
					},
					currentTarget: {
						dataset: {
							i
						}
					}
				} = e;
				// console.log(e)
				this.certificationInfo[i].name = value;
			},
			onCertiCard(e) {
				const {
					detail: {
						value
					},
					currentTarget: {
						dataset: {
							i
						}
					}
				} = e;
				// console.log(e);
				this.certificationInfo[i].card = value;
			},
			// 邮寄地址
			onAdress(e) {
				const {
					detail: {
						value
					}
				} = e;
				this.adressInfo.adress = value;
			},

			onJieShow(e) {
				const {
					detail: {
						value: [value]
					}
				} = e;
				// console.log(e.detail)
				this.isJieShow = value == "false" ? true : false;
				console.log(this.isJieShow)
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
			needCertification() {
				this.isNeedCertification = !this.isNeedCertification;
			},
			// 是否需要发票
			needTicket() {
				this.isNeedTicket = !this.isNeedTicket;
			},

			imageUrl(isDui) {
				return isDui ? '/static/images/buy/dui-2.png' : '/static/images/buy/dui.png'
			},

			showPopup() {
				this.isShowXY = true
			},

			closePopup() {
				this.isShowXY = false
			},

			async buy() {
				uni.showLoading();
				const chooseDate = this.chooseDate;
				const newArrayTourism = this.newArrayTourism;
				if (chooseDate == '请选择日期') {
					util.showErrorToast('请选择日期');
					return;
				}
				if (newArrayTourism.phone.length == 0) {
					util.showErrorToast('请添加游客');
					return;
				}
				// return;
				try {
					// 删除购物车中的票类商品
					await this.productDlete();
					// 购物车置空
					await this.goodsClear();
					// 加入购物车
					let ticket = {
						chooseCount: this.ticketCount,
						id: this.tempItem.id,
						category_id: this.goods.category_id,
						isWeekend: this.isWeekend(this.chooseDate)
					}
					await this.addToCart(ticket);
					// 调起支付
					this.submitOrder();
				} catch (err) {
					util.showErrorToast(err.errMsg)
				}

			},


			// 加入购物车
			async addToCart(ticket) {

				await util.request(
					api.CartAdd, {
						goodsId: this.id,
						// 该票的张数
						number: ticket.chooseCount,
						// 该票的id
						productId: ticket.id,
						// category_id??
						category_id: ticket.category_id,
						// 是否周末  true: false
						isWeekend: ticket.isWeekend,
						certification: JSON.stringify([{
							choosetime: this.chooseDate
						}])
					},
					'POST'
				).then(res => {
					let _res = res;

					if (_res.errno == 0) {} else {
						uni.showToast({
							image: '/static/static/images/icon_error.png',
							title: _res.errmsg,
							mask: true
						});
					}
				});
			},

			// 购物车置空
			async goodsClear() {
				await util.request(
					api.goodsClear, {},
					'GET'
				)
			},

			// 删除购物车中的票类商品
			async productDlete() {
				await util.request(
					api.productDlete, {
						goods_id: this.id
					},
					'POST'
				)
			},

			// 调起支付
			submitOrder() {
				// if (this.addressId <= 0) {
				// 	util.showErrorToast('请选择收货地址');
				// 	return false;
				// }

				util.request(
					api.OrderSubmit, {
						isNoNeedAddress: true,
						addressId: this.addressId,
						couponId: this.couponId,
						// category_id??
						category_id: this.goods.category_id,
						// 联系信息
						name: this.newArrayTourism.name,
						phone: this.newArrayTourism.phone,
					},
					'POST'
				).then((res) => {
					if (res.errno === 0) {
						const orderId = res.data.orderInfo.id;
						pay.payOrder(parseInt(orderId))
							.then((res) => {
								uni.redirectTo({
									url: '/pages/payResult/payResult?status=1&orderId=' +
										orderId
								});
							})
							.catch((res) => {
								uni.redirectTo({
									url: '/pages/payResult/payResult?status=0&orderId=' +
										orderId
								});
							});
					} else {
						util.showErrorToast('下单失败');
					}
				}).catch(err => {
					util.showErrorToast('下单失败');
				})
			},
		}

	}
</script>

<style>
	@import url("./buyNew.css");
</style>
