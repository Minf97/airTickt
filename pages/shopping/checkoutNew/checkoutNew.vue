<template>
	<view class="container">
		<view class="address-box">
			<view class="address-item" style="margin-left: 0%;" @tap="selectAddress" v-if="checkedAddress.id > 0">
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

		<!-- 证件信息 -->
		<view class="box" v-if="category_id == 1036010">
			<view style="width: 100%; height: 10px;"></view>
			<view class="bb" style="border-bottom: none;">
				<view class="tt1">
					<image src="/static/images/buy/shenfenzheng.png"></image>
					<view>证件信息</view>
					<!-- <view class="val" style="color: #ccc;">
						暂不填写-稍后提供
						<image :src="imageUrl(isNeedCertification)" mode="aspectFill" @click="needCertification"
							style="margin-left: 5px;"></image>
					</view> -->
				</view>
			</view>

			<view class="inpBox" v-for="(item, index) in checkedGoodsList">
				<view class="inp">
					<view class="tit">{{indexToNumber(index)}}证件姓名</view>
					<input type="text" :value="certificationInfo.name" @input="onCertiName" :data-i="index"
						placeholder="证件姓名" placeholder-style="font-size: 13px;">
				</view>
				<view class="inp" style="border-bottom: 1px solid #ddd; margin-bottom: 10px">
					<view class="tit">{{indexToNumber(index)}}身份证</view>
					<input type="text" :value="certificationInfo.card" @input="onCertiCard" @blur="validCard"
						:data-i="index" placeholder="证件号码" placeholder-style="font-size: 13px;">
				</view>

				<view class="er" v-if="isValidCertification">*证件号码填写错误，请重新填写</view>

				<!-- <view class="inp zyr" v-if="ticketInfo.zp == '专业日'">
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
				</view> -->

				<!-- <view class="inp zyr" v-if="ticketInfo.zp == '专业日'"
					style="border-bottom: 1px solid #ddd; margin-bottom: 10px">
					<view class="tit">电子证件照</view>
					<view class="imgBox">
						<image :src="item.cardImgElectron" @click="onCardImgElectron" mode="aspectFill" class="sfz">
						</image>
					</view>
				</view> -->
			</view>

		</view>

		<!--        <view class="coupon-box">
            <view class="coupon-item">
                <view class="l">
                    <text class="name">请选择优惠券</text>
                    <text class="txt">{{ couponList.length }}张</text>
                </view>
                <view class="r">
                    <image src="/static/static/images/address_right.png"></image>
                </view>
            </view>
        </view> -->

		<view class="order-box">
			<view class="order-item">
				<view class="l">
					<text class="name">商品合计</text>
				</view>
				<view class="r">
					<text class="txt">￥{{ goodsTotalPrice }}</text>
				</view>
			</view>
			<view class="order-item">
				<view class="l">
					<text class="name">运费</text>
				</view>
				<view class="r">
					<text class="txt">￥{{ freightPrice }}</text>
				</view>
			</view>
			<view class="order-item no-border">
				<view class="l">
					<text class="name">优惠券</text>
				</view>
				<view class="r">
					<text class="txt">-￥{{ couponPrice }}</text>
				</view>
			</view>
		</view>

		<view class="goods-items">
			<view class="item" v-for="(item, index) in checkedGoodsList" :key="item.id">
				<view class="img">
					<image :src="item.list_pic_url"></image>
				</view>

				<view class="info">
					<view class="t">
						<text class="name">{{ item.goods_name }}</text>
						<text class="number">x{{ item.number }}</text>
					</view>
					<view class="m">{{ item.goods_specifition_name_value }}</view>
					<view class="b">￥{{ item.retail_price }}</view>
				</view>
			</view>
		</view>

		<view class="order-total">
			<view class="l">实付：￥{{ actualPrice }}</view>
			<view class="r" @tap="submitOrder">去付款</view>
		</view>
	</view>
</template>

<script>
	var util = require('../../../utils/util.js');

	var api = require('../../../config/api.js');

	const pay = require('../../../services/pay.js');

	var app = getApp();
	export default {
		data() {
			return {
				checkedGoodsList: [],
				checkedAddress: {
					id: 0,
					name: '',
					is_default: 0,
					mobile: '',
					full_region: '',
					address: ''
				},
				checkedCoupon: [],
				couponList: [],
				goodsTotalPrice: 0,
				//商品总价
				freightPrice: 0,
				//快递费
				couponPrice: 0,
				//优惠券的价格
				orderTotalPrice: 0,
				//订单总价
				actualPrice: 0,
				//实际需要支付的总价
				addressId: 0,
				couponId: 0,
				// 身份证
				certificationInfo: {
					name: '',
					card: '',
				},
				// 身份证校验标志位
				isValidCertification: false,
				choosetime: "",
			};
		},
		onLoad: function(options) {
			const choosetime = options.choosetime;
			// 页面初始化 options为页面跳转所带来的参数
			this.setData({
				category_id: Number(options.category_id),
				choosetime: choosetime
			})
		},
		onReady: function() {
			// 页面渲染完成
		},
		onShow: function() {
			// 页面显示
			uni.showLoading({
				title: '加载中...'
			});
			try {
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
			} catch (e) {
				// Do something when catch error
			}
			this.getCheckoutInfo();
		},
		onHide: function() {
			// 页面隐藏
		},
		onUnload: function() {
			// 页面关闭
		},
		methods: {
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
				this.certificationInfo.name = value;
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
				this.certificationInfo.card = value;
			},
			validCard() {
				const card = this.certificationInfo.card;

				const id =
					/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;

				if (!id.test(card)) {
					this.isValidCertification = true;
				}
				if (id.test(card)) {
					this.isValidCertification = false;
				}
			},
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
			getCheckoutInfo: function() {
				let that = this;
				util.request(api.CartCheckout, {
					addressId: that.addressId,
					couponId: that.couponId
				}).then(function(res) {
					if (res.errno === 0) {
						console.log(res.data.checkedAddress);
						that.setData({
							checkedGoodsList: res.data.checkedGoodsList,
							checkedAddress: res.data.checkedAddress,
							actualPrice: res.data.actualPrice,
							checkedCoupon: res.data.checkedCoupon,
							couponList: res.data.couponList,
							couponPrice: res.data.couponPrice,
							freightPrice: res.data.freightPrice,
							goodsTotalPrice: res.data.goodsTotalPrice,
							orderTotalPrice: res.data.orderTotalPrice
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
					url: '/pages/shopping/address/address'
				});
			},
			// 判断是否是微信浏览器
			isWx() {
				let uAgent = navigator?.userAgent?.toLowerCase && navigator.userAgent.toLowerCase();
				return /micromessenger/.test(uAgent) ? true : false;
			},

			submitOrder: function() {
				// if (this.addressId <= 0) {
				// 	util.showErrorToast('请选择收货地址');
				// 	return false;
				// }
				const isValid = this.isValidCertification;
				const card = this.certificationInfo.card;
				this.certificationInfo["choosetime"] = this.choosetime;
				console.log(this.choosetime);

				if ((isValid == true || card.length == 0) && this.category_id == 1036010) {
					util.showErrorToast('身份证填写不正确噢');
					return;
				}

				util.request(
					api.OrderSubmit, {
						addressId: this.addressId,
						couponId: this.couponId,
						certification: JSON.stringify([this.certificationInfo]),
						category_id: this.category_id,
					},
					'POST'
				).then((res) => {
					if (res.errno === 0) {
						const orderId = res.data.orderInfo.id;
						pay.payOrder(parseInt(orderId))
							.then((res) => {
								uni.redirectTo({
									url: '/pages/payResult/payResult?status=1&orderId=' + orderId
								});
							})
							.catch((res) => {
								uni.redirectTo({
									url: '/pages/payResult/payResult?status=0&orderId=' + orderId
								});
							});
					} else {
						util.showErrorToast('下单失败');
					}
				});
			}
		}
	};
</script>


<style>
	@import url("@/pages/buy/buy.css");
	@import url("checkoutNew.css");
</style>
