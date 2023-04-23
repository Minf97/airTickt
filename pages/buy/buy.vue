<template>
	<view>
		<view class="container">
			<!-- 标题盒子1 -->
			<view class="box">
				<view class="tt">2022珠海航展 - {{ticketInfo.zp}}门票</view>
				<view class="bb">
					<view class="tt1">
						<image src="../../static/images/buy/aixin.png" mode="aspectFill"></image>
						<view>温馨提示</view>
					</view>

					<view class="content">
						<view class="cc">1.入场方式：实物票凭“门票+有效证件”入场.</view>
						<view class="cc">2.有效证件：指“身份证、户口簿、通行证、护照”</view>
						<view class="cc">3.友情提示：专业日门票一经预定，不支持退改.</view>
					</view>
				</view>

				<!-- 出行日期 -->
				<view class="bb" style="border-bottom: none;">
					<view class="tt1">
						<image src="../../static/images/buy/riqi_o.png" mode=""></image>
						<view>出行日期：</view>
						<view class="val">{{ticketInfo.ticketTime.shiJian}}</view>
					</view>
				</view>

				<!-- 票种信息 -->
				<view class="bb" style="border-bottom: none;">
					<view class="tt1">
						<image src="../../static/images/buy/piaoju.png"></image>
						<view>票种信息：</view>
						<view class="val">{{ticketInfo.ticketType}}</view>
					</view>
				</view>

				<!-- 购票数量 -->
				<view class="bb" style="border-bottom: none;">
					<view class="tt1" style="margin-bottom: 20px;">
						<image src="../../static/images/buy/shujukanban.png" mode=""></image>
						<view>购票数量：</view>
					</view>
					<view class="amount" v-for="(item,index) in ticketInfo.guigeArr"
						v-if="item.chooseCount != 0 && item.goods_number != 0">
						<view class="left">
							<view class="square"></view>
							<view class="vvvv">{{item.guiGe}}</view>
						</view>
						<view class="right">￥{{item.retail_price}} *{{item.chooseCount}}张</view>
					</view>
				</view>
			</view>

			<!-- 联系信息 -->
			<view class="box">
				<view style="width: 100%; height: 10px;"></view>
				<view class="bb" style="border-bottom: none;">
					<view class="tt1">
						<image src="../../static/images/buy/yonghu.png"></image>
						<view>联系信息</view>
						<view class="val" style="color: #5695cd;">请仔细填写并核对手机号</view>
					</view>
				</view>
				<view class="inp">
					<view class="tit">姓名</view>
					<input type="text" :value="contactInfo.name" @input="onName" placeholder="请输入姓名"
						placeholder-style="font-size: 13px;">
				</view>
				<view class="inp" style="border-bottom: 30px;">
					<view class="tit">电话</view>
					<input type="number" :value="contactInfo.phone" @input="onPhone" @blur="validPhone"
						placeholder="联系人手机" placeholder-style="font-size: 13px;">
				</view>
				<view class="er" v-if="isValidPhone">*电话号码填写错误，请重新填写</view>
			</view>

			<!-- 证件信息 -->
			<view class="box">
				<view style="width: 100%; height: 10px;"></view>
				<view class="bb" style="border-bottom: none;">
					<view class="tt1">
						<image src="../../static/images/buy/shenfenzheng.png"></image>
						<view>证件信息</view>
						<!-- <view class="val" style="color: #ccc;">
							暂不填写-稍后提供
							<image :src="imageUrl(isNeedCertification)" mode="aspectFill" @click="needCertification"
								style="margin-left: 5px;"></image>
						</view> -->
					</view>
				</view>

				<view class="inpBox" v-for="(item, index) in certificationInfo">
					<view class="inp">
						<view class="tit">{{indexToNumber(index)}}证件姓名</view>
						<input type="text" :value="item.name" @input="onCertiName" :data-i="index"
							:placeholder="'证件姓名【' + item.guiGe + '】'" placeholder-style="font-size: 13px;">
					</view>
					<view class="inp" style="border-bottom: 1px solid #ddd; margin-bottom: 10px">
						<view class="tit">{{indexToNumber(index)}}身份证</view>
						<input type="text" :value="item.card" @input="onCertiCard" @blur="validCard(index)"
							:data-i="index" :placeholder="'证件号码【' + item.guiGe + '】'"
							placeholder-style="font-size: 13px;">
					</view>

					<view class="er" v-if="isValidArr[index]">*证件号码填写错误，请重新填写</view>

					<view class="inp zyr" v-if="ticketInfo.zp == '专业日'">
						<view class="tit">身份证照片(上传正反面)</view>
						<view class="imgBoxbox">
							<view class="imgBox">
								<image :src="item.cardImgFront" v-if="item.cardImgFront" mode="aspectFill" class="sfz"
									style="width: 50px; height: 50px;" @click="previewCardImgFront(index)"></image>
								<image src="/static/images/buy/jia.png" v-else @click="onCardImgFront(index)"
									mode="aspectFill" class="sfz"></image>
							</view>
							<view class="imgBox">
								<image :src="item.cardImgBehind" v-if="item.cardImgBehind" mode="aspectFill" class="sfz"
									style="width: 50px; height: 50px;" @click="previewCardImgBehind(index)"></image>
								<image src="/static/images/buy/jia.png" v-else @click="onCardImgBehind(index)"
									mode="aspectFill" class="sfz"></image>
							</view>
						</view>
					</view>

					<view class="inp zyr" v-if="ticketInfo.zp == '专业日'"
						style="border-bottom: 1px solid #ddd; margin-bottom: 10px">
						<view class="tit">电子证件照</view>
						<view class="imgBox">
							<image :src="item.cardImgElectron" v-if="item.cardImgElectron" mode="aspectFill" class="sfz"
								style="width: 50px; height: 50px;" @click="previewCardImgElectron(index)"></image>
							<image src="/static/images/buy/jia.png" v-else @click="onCardImgElectron(index)"
								mode="aspectFill" class="sfz"></image>
						</view>
					</view>
				</view>

			</view>


			<!-- 邮寄地址 -->
			<view class="box" v-if="ticketInfo.ticketType == '实物票'">
				<view style="width: 100%; height: 10px;"></view>
				<view class="bb" style="border-bottom: none;">
					<view class="tt1">
						<image src="../../static/images/buy/youjiziliao.png"></image>
						<view>邮寄地址</view>
						<view class="val" style="color: #5695cd;">[全国顺丰包邮]</view>
					</view>
				</view>

				<!-- 地址选择 -->
				<view class="address-box">
					<view class="address-item" @tap="selectAddress" v-if="checkedAddress.id > 0">
						<view class="l">
							<text class="name">{{ checkedAddress.name }}</text>
							<text class="default" v-if="checkedAddress.is_default === 1">默认</text>
						</view>
						<view class="m">
							<text class="mobile">{{ checkedAddress.mobile }}</text>
							<text class="address">{{ checkedAddress.full_region + checkedAddress.address }}</text>
						</view>
						<view class="r">
							<!-- <image src="/static/static/images/address_right.png"></image> -->
						</view>
					</view>

					<view class="address-item address-empty" @tap="addAddress" v-if="!checkedAddress.id > 0">
						<view class="m">还没有收货地址，去添加</view>
						<view class="r">
							<image src="/static/static/images/address_right.png"></image>
						</view>
					</view>
				</view>

			</view>

			<!-- 需要发票 -->
			<view class="box">
				<view style="width: 100%; height: 10px;"></view>
				<view class="bb" style="border-bottom: none;">
					<view class="tt1">
						<image src="../../static/images/buy/fapiao.png"></image>
						<view>需要发票</view>
						<view class="val" style="color: #5695cd;">
							<image :src="imageUrl(isNeedTicket)" mode="aspectFill" @click="needTicket"></image>
						</view>
					</view>
				</view>

				<view style="width: 100%; display: flex; flex-direction: column; align-items:center;"
					v-if="isNeedTicket">
					<view class="inp">
						<view class="tit">抬头类型</view>
						<input type="text" :value="invoices.type" @input="onTypeInvoices" placeholder="请输入抬头类型"
							placeholder-style="font-size: 13px;">
					</view>
					<view class="inp" style="border-bottom: 30px; border-bottom: 1px dotted #ddd;">
						<view class="tit">抬头名称</view>
						<input type="text" :value="invoices.name" @input="onNameInvoices" placeholder="请输入抬头名称"
							placeholder-style="font-size: 13px;">
					</view>
					<view class="inp" style="border-bottom: 30px;">
						<view class="tit">抬头税号</view>
						<input type="text" :value="invoices.tax_number" @input="onTaxInvoices" @blur="validTax_Invoices"
							placeholder="请输入抬头税号" placeholder-style="font-size: 13px;">
					</view>
				</view>


				<view class="er" v-if="isValidTax">*抬头税号填写错误，请重新填写</view>

				<view class="nnnn">
					提供航展专用发票，成功购票后到'订单中心'申请发票！
				</view>
			</view>


			<!-- 协议 -->
			<view class="xy">
				<checkbox-group @change="onJieShow">
					<checkbox :value="isJieShow" />
				</checkbox-group>
				<view class="mmmm">已阅读并接受 <view class="asA" @click="showPopup">“珠海票务网”中国航展门票委托订票协议</view>
				</view>
			</view>

			<!-- fix框 -->
			<view class="fffix" style="z-index: 10;">
				<view class="mon">总额: <view class="monVal">￥{{totalMoney}}</view>
				</view>
				<view class="ffright">
					<view class="mx">明细</view>

					<view style="position: relative;">
						<button type="default" open-type="contact" class="contactBtn"></button>
						<image src="/static/images/buy/kefu.png" mode="aspectFill"></image>
					</view>
					<view class="ljyd" @click="buy">立即预订</view>
				</view>
			</view>

			<!-- 协议弹出层 -->
			<!-- <fui-Bottom-Popup :show="isShowXY" @close="closePopup">
				<view class="fui-custom__wrap">协议内容区</view>
			</fui-Bottom-Popup> -->
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
	// import qiniu from 'qiniu'


	export default {
		components: {
			// fuiBottomPopup,

		},
		data() {
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
					ticketType: ""
				},

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
			}
		},
		onLoad(options) {
			const {
				id,
				category_id
			} = options;

			const ticketInfo = uni.getStorageSync('buyItem');
			this.ticketInfo = JSON.parse(ticketInfo);
			this.getIsValidArr();
			this.setData({
				id: id,
				category_id: category_id
			})
			console.log(id, category_id)

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
				let money = 0;
				this.ticketInfo.guigeArr.forEach(item => {
					// 单价*数量
					money += item.retail_price * item.chooseCount;
				})
				return money
			}
		},
		methods: {
			indexToNumber(index) {
				switch (index + 1) {
					case 1:
						return '①'
						break;
					case 2:
						return '②'
						break;
					case 3:
						return '③'
						break;
					case 4:
						return '④'
						break;
					case 5:
						return '⑤'
						break;
					case 6:
						return '⑥'
						break;
					case 7:
						return '⑦'
						break;
					case 8:
						return '⑧'
						break;
					case 9:
						return '⑨'
						break;
					case 10:
						return '⑩'
						break;
					default:
						return index;
						break;
				}
			},
			onCardImgElectron(index) {
				const item = this.certificationInfo[index];
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success: res => {
						const tempFilePaths = res.tempFilePaths;
						item.cardImgElectron = tempFilePaths;
						uni.showLoading({
							title: "正在上传...",
							mask: true
						});

						// 获取七牛token
						let uptoken = '';
						util.request('http://81.70.16.7:8360/api/user/uptoken').then(response => {
							// console.log(res)
							uptoken = response.uptoken;

							let img = res.tempFilePaths[0]; //拿到里面的
							//下面的key是自己拿时间戳和随机数组成的key值
							let key = new Date().getTime();
							uni.uploadFile({
								url: "https://up-z2.qiniup.com", //华南地区上传
								filePath: img,
								name: 'file',
								method: "POST",
								formData: {
									'key': key, //key值
									'token': uptoken //七牛云token值
								},
								success: uploadFileRes => {
									//uploadFileRes 返回了data是一个json字符串 
									//拿到里面的key拼接上域名，再反出去就ok了
									let strToObj = JSON.parse(uploadFileRes.data),
										backUrl =
										'http://rnwwnc95c.hn-bkt.clouddn.com/' +
										strToObj.key;
									console.log(backUrl)
									// data.success(backUrl); //反出去链接
									uni.hideLoading();
								},
								fail: fail => {
									uni.showToast({
										title: "网络错误",
										icon: "none"
									});
									console.log(fail)
									// data.fail(fail); //反出去错误信息
									uni.hideLoading();
								}
							})
						})
						// return;

					}
				})
			},
			previewCardImgElectron(index) {
				const item = this.certificationInfo[index];
				uni.previewImage({
					current: 1,
					urls: item.cardImgElectron,
					success: res => {
						console.log(res)
					},
					fail: err => {
						console.log(err)
					}
				})
			},

			previewCardImgFront(index) {
				const item = this.certificationInfo[index];
				uni.previewImage({
					current: 1,
					urls: item.cardImgFront,
					success: res => {
						console.log(res)
					},
					fail: err => {
						console.log(err)
					}
				})
			},
			onCardImgFront(index) {
				const item = this.certificationInfo[index];
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success: res => {
						const tempFilePaths = res.tempFilePaths;
						item.cardImgFront = tempFilePaths;
						uni.showLoading({
							title: "正在上传...",
							mask: true
						});

						// 获取七牛token
						let uptoken = '';
						util.request(api.uploadImg).then(response => {
							// console.log(res)
							uptoken = response.uptoken;

							let img = res.tempFilePaths[0]; //拿到里面的
							//下面的key是自己拿时间戳和随机数组成的key值
							let key = new Date().getTime();
							uni.uploadFile({
								url: api.qiniuyunUrl, //华南地区上传
								filePath: img,
								name: 'file',
								method: "POST",
								formData: {
									'key': key, //key值
									'token': uptoken //七牛云token值
								},
								success: uploadFileRes => {
									//uploadFileRes 返回了data是一个json字符串 
									//拿到里面的key拼接上域名，再反出去就ok了
									let strToObj = JSON.parse(uploadFileRes.data),
										backUrl =
										api.qiniuyunBackUrl +
										strToObj.key;
									console.log(backUrl)
									// data.success(backUrl); //反出去链接
									uni.hideLoading();
								},
								fail: fail => {
									uni.showToast({
										title: "网络错误",
										icon: "none"
									});
									console.log(fail)
									// data.fail(fail); //反出去错误信息
									uni.hideLoading();
								}
							})
						})
						// return;
					}
				})
			},
			previewCardImgBehind(index) {
				const item = this.certificationInfo[index];
				uni.previewImage({
					urls: item.CardImgBehind
				})
			},
			onCardImgBehind(index) {
				const item = this.certificationInfo[index];
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success: res => {
						const tempFilePaths = res.tempFilePaths;
						item.cardImgBehind = tempFilePaths;
						uni.showLoading({
							title: "正在上传...",
							mask: true
						});

						// 获取七牛token
						let uptoken = '';
						util.request(api.uploadImg).then(response => {
							// console.log(res)
							uptoken = response.uptoken;

							let img = res.tempFilePaths[0]; //拿到里面的
							//下面的key是自己拿时间戳和随机数组成的key值
							let key = new Date().getTime();
							uni.uploadFile({
								url: api.qiniuyunUrl, //华南地区上传
								filePath: img,
								name: 'file',
								method: "POST",
								formData: {
									'key': key, //key值
									'token': uptoken //七牛云token值
								},
								success: uploadFileRes => {
									//uploadFileRes 返回了data是一个json字符串 
									//拿到里面的key拼接上域名，再反出去就ok了
									let strToObj = JSON.parse(uploadFileRes.data),
										backUrl =
										api.qiniuyunBackUrl +
										strToObj.key;
									console.log(backUrl)
									console.log(item.cardImgBehind)
									// data.success(backUrl); //反出去链接
									uni.hideLoading();
								},
								fail: fail => {
									uni.showToast({
										title: "网络错误",
										icon: "none"
									});
									console.log(fail)
									// data.fail(fail); //反出去错误信息
									uni.hideLoading();
								}
							})
						})
						// return;


					}
				})
			},
			onTypeInvoices(e) {
				const {
					detail: {
						value
					}
				} = e;
				this.invoices.type = value;
			},
			onNameInvoices(e) {
				const {
					detail: {
						value
					}
				} = e;
				this.invoices.name = value;
			},
			onTaxInvoices(e) {
				const {
					detail: {
						value
					}
				} = e;
				this.invoices.tax_number = value;
			},
			validTax_Invoices() {
				const tax_number = this.invoices.tax_number;
				this.isValidTax = !util.checkTax(tax_number);
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
			selectAddress() {
				uni.navigateTo({
					url: '/pages/shopping/address/address'
				});
			},
			addAddress() {
				uni.navigateTo({
					url: '/pages/shopping/addressAdd/addressAdd'
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
				// 校验表单
				if (!this.isCheckedAllSpec()) {
					return;
				}
				// return;
				try {
					// 删除购物车中的票类商品
					await this.productDlete();
					// 购物车置空
					await this.goodsClear();
					// 加入购物车
					let guigeArr = this.ticketInfo.guigeArr;
					let isWeekend = this.isWeekend(this.ticketInfo.choosetime);
					guigeArr = guigeArr.filter(item => item.chooseCount);
					for (let i = 0; i < guigeArr.length; i++) {
						await this.addToCart(guigeArr[i], i, isWeekend);
					}
					// 调起支付
					this.submitOrder();
				} catch (err) {
					util.showErrorToast(err.errMsg)
				}

			},
			isWeekend(date) {
				const dayOfWeek = new Date(date).getDay();
				return dayOfWeek === 6 || dayOfWeek === 0;
			},

			// 校验
			isCheckedAllSpec() {
				const isValidPhone = this.isValidPhone;
				const isValidArr = this.isValidArr;
				const card = this.certificationInfo.map(item => item = item.card);
				const cardImgFront = this.certificationInfo.map(item => item = item.cardImgFront);
				const cardImgBehind = this.certificationInfo.map(item => item = item.cardImgBehind);
				const cardImgElectron = this.certificationInfo.map(item => item = item.cardImgElectron);
				const phone = this.contactInfo.phone;
				const isJieShow = this.isJieShow;
				const ticketInfo = this.ticketInfo;

				// 如果还有表单未校验成功
				if (
					isValidPhone == true ||
					isValidArr.indexOf(true) != -1 ||
					card.filter(item => item.length == 0 ? true : false).length > 0 ||
					phone.length == 0 ||
					// 身份证图片上传
					(
						ticketInfo.zp == '专业日' &&
						(
							cardImgFront.filter(item => item.length == 0 ? true : false).length > 0 ||
							cardImgBehind.filter(item => item.length == 0 ? true : false).length > 0 ||
							cardImgElectron.filter(item => item.length == 0 ? true : false).length > 0
						)
					)
				) {
					uni.showToast({
						image: '/static/static/images/icon_error.png',
						title: '请填写完整',
						mask: true
					});
					return false
				}

				console.log(isJieShow);

				if (isJieShow == false) {
					uni.showToast({
						image: '/static/static/images/icon_error.png',
						title: '请勾选协议',
						mask: true
					});
					return false
				}
				return true
			},

			// 加入购物车
			async addToCart(ticket, index, isWeekend) {

				this.certificationInfo[index]["choosetime"] = this.ticketInfo.choosetime;
				console.log(this.certificationInfo[index]);
				await util.request(
					api.CartAdd, {
						goodsId: this.id,
						// 该票的张数
						number: ticket.chooseCount,
						// 该票的id
						productId: ticket.id,
						// category_id??
						category_id: this.category_id,
						certification: JSON.stringify([this.certificationInfo[index]]),
						isWeekend
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
						invoices: JSON.stringify(this.invoices)
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
	@import url("./buy.css");
</style>
