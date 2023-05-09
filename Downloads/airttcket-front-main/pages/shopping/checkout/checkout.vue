<template>
	<view class="container">
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
				couponId: 0
			};
		},
		onLoad: function(options) {
			// 页面初始化 options为页面跳转所带来的参数
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
		},
		onReady: function() {
			// 页面渲染完成
		},
		onShow: function() {
			// 页面显示
			uni.showLoading({
				title: '加载中...'
			});
			this.getCheckoutInfo();
		},
		onHide: function() {
			// 页面隐藏
		},
		onUnload: function() {
			// 页面关闭
		},
		methods: {
			getCheckoutInfo: function() {
				let that = this;
				util.request(api.CartCheckout, {
					addressId: that.addressId,
					couponId: that.couponId
				}).then(function(res) {
					if (res.errno === 0) {
						console.log(res.data);
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
					url: '/pages/shopping/addressAdd/addressAdd'
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

				util.request(
					api.OrderSubmit, {
						addressId: this.addressId,
						couponId: this.couponId
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
	page {
		height: 100%;
		background: #f4f4f4;
	}

	.address-box {
		width: 100%;
		height: 166.55rpx;
		/* background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png') 0 0 repeat-x; */
		background-size: 62.5rpx 10.5rpx;
		margin-bottom: 20rpx;
		padding-top: 10.5rpx;
	}

	.address-item {
		display: flex;
		height: 155.55rpx;
		background: #fff;
		padding: 41.6rpx 0 41.6rpx 31.25rpx;
	}

	.address-item.address-empty {
		line-height: 75rpx;
		text-align: center;
	}

	.address-box .l {
		width: 125rpx;
		height: 100%;
	}

	.address-box .l .name {
		margin-left: 6.25rpx;
		margin-top: -7.25rpx;
		display: block;
		width: 125rpx;
		height: 43rpx;
		line-height: 43rpx;
		font-size: 30rpx;
		color: #333;
		margin-bottom: 5rpx;
	}

	.address-box .l .default {
		margin-left: 6.25rpx;
		display: block;
		width: 62rpx;
		height: 33rpx;
		border-radius: 5rpx;
		border: 1px solid #b4282d;
		font-size: 20.5rpx;
		text-align: center;
		line-height: 29rpx;
		color: #b4282d;
	}

	.address-box .m {
		flex: 1;
		height: 72.25rpx;
		color: #999;
	}

	.address-box .mobile {
		display: block;
		height: 29rpx;
		line-height: 29rpx;
		margin-bottom: 6.25rpx;
		font-size: 30rpx;
		color: #333;
	}

	.address-box .address {
		display: block;
		height: 37.5rpx;
		line-height: 37.5rpx;
		font-size: 25rpx;
		color: #666;
	}

	.address-box .r {
		width: 77rpx;
		height: 77rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-box .r image {
		width: 52.078rpx;
		height: 52.078rpx;
	}

	.coupon-box {
		width: 100%;
		height: auto;
		overflow: hidden;
		background: #fff;
	}

	.coupon-box .coupon-item {
		width: 100%;
		height: 108.3rpx;
		overflow: hidden;
		background: #fff;
		display: flex;
		padding-left: 31.25rpx;
	}

	.coupon-box .l {
		flex: 1;
		height: 43rpx;
		line-height: 43rpx;
		padding-top: 35rpx;
	}

	.coupon-box .l .name {
		float: left;
		font-size: 30rpx;
		color: #666;
	}

	.coupon-box .l .txt {
		float: right;
		font-size: 30rpx;
		color: #666;
	}

	.coupon-box .r {
		margin-top: 15.5rpx;
		width: 77rpx;
		height: 77rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.coupon-box .r image {
		width: 52.078rpx;
		height: 52.078rpx;
	}

	.order-box {
		margin-top: 20rpx;
		width: 100%;
		height: auto;
		overflow: hidden;
		background: #fff;
	}

	.order-box .order-item {
		height: 104.3rpx;
		overflow: hidden;
		background: #fff;
		display: flex;
		margin-left: 31.25rpx;
		padding-right: 31.25rpx;
		padding-top: 26rpx;
		border-bottom: 1px solid #d9d9d9;
	}

	.order-box .order-item .l {
		float: left;
		height: 52rpx;
		width: 50%;
		line-height: 52rpx;
		overflow: hidden;
	}

	.order-box .order-item .r {
		float: right;
		text-align: right;
		width: 50%;
		height: 52rpx;
		line-height: 52rpx;
		overflow: hidden;
	}

	.order-box .order-item.no-border {
		border-bottom: none;
	}

	.goods-items {
		margin-top: 20rpx;
		width: 100%;
		height: auto;
		overflow: hidden;
		background: #fff;
		padding-left: 31.25rpx;
		margin-bottom: 120rpx;
	}

	.goods-items .item {
		height: 192rpx;
		padding-right: 31.25rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	}

	.goods-items .item.no-border {
		border-bottom: none;
	}

	.goods-items .item:last-child {
		border-bottom: none;
	}

	.goods-items .img {
		height: 145.83rpx;
		width: 145.83rpx;
		background-color: #f4f4f4;
		margin-right: 20rpx;
	}

	.goods-items .img image {
		height: 145.83rpx;
		width: 145.83rpx;
	}

	.goods-items .info {
		flex: 1;
		height: 145.83rpx;
		padding-top: 5rpx;
	}

	.goods-items .t {
		height: 33rpx;
		line-height: 33rpx;
		margin-bottom: 10rpx;
		overflow: hidden;
		font-size: 30rpx;
		color: #333;
	}

	.goods-items .t .name {
		display: block;
		float: left;
	}

	.goods-items .t .number {
		display: block;
		float: right;
		text-align: right;
	}

	.goods-items .m {
		height: 29rpx;
		overflow: hidden;
		line-height: 29rpx;
		margin-bottom: 25rpx;
		font-size: 25rpx;
		color: #666;
	}

	.goods-items .b {
		height: 41rpx;
		overflow: hidden;
		line-height: 41rpx;
		font-size: 30rpx;
		color: #333;
	}

	.order-total {
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100rpx;
		width: 100%;
		display: flex;
	}

	.order-total .l {
		flex: 1;
		height: 100rpx;
		line-height: 100rpx;
		color: #b4282d;
		background: #fff;
		font-size: 33rpx;
		padding-left: 31.25rpx;
		border-top: 1rpx solid rgba(0, 0, 0, 0.2);
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.2);
	}

	.order-total .r {
		width: 233rpx;
		height: 100rpx;
		background: #b4282d;
		border: 1px solid #b4282d;
		line-height: 100rpx;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
	}
</style>
