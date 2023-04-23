<template>
	<view class="container">
		<view class="order-info">
			<view class="item-a">下单时间：{{ orderInfo.add_time }}</view>
			<view class="item-b">订单编号：{{ orderInfo.order_sn }}</view>
			<view class="item-c">
				<view class="l">
					实付：
					<text class="cost">￥{{ orderInfo.actual_price }}</text>
				</view>
				<view class="r">
					<!-- <view v-if="orderInfo.order_status_text === '未付款'" class="btn" @tap="cancelOrder">取消订单</view> -->
					<view v-if="orderInfo.order_status_text === '未付款'" class="btn active" @tap="payOrder">去付款</view>
				</view>
			</view>
		</view>

		<view class="order-goods">

			<!-- 商品信息 -->
			<view class="h">
				<view class="label">商品信息</view>
				<view class="status">{{ orderInfo.order_status_text }}</view>
			</view>
			<view class="goods">
				<view class="item" v-for="(item, index) in orderGoods" :key="item.id">
					<!-- 商品信息 -->
					<view class="itemBox">
						<view class="img">
							<image :src="item.list_pic_url"></image>
						</view>

						<view class="info">
							<view class="t">
								<text class="name">{{ item.goods_name }}</text>
								<text class="number">x{{ item.number }}</text>
							</view>
							<view class="attr" style="margin-bottom: 0;">{{ item.goods_specifition_name_value_new }}
							</view>
							<view class="attr" v-if="item.category_id == 1036009">{{contactInfo.name}};
								{{contactInfo.phone}}
							</view>
							<view class="price">￥{{ item.retail_price }}</view>
						</view>
					</view>

					<!-- 证件信息 -->
					<!-- 票务 -->
					<view class="cItemBox" v-if="item.category_id == 1036009">
						<view class="cItem">
							<view>姓名：</view>
							<view>{{item.certification[0].name}}</view>
						</view>
						<view class="cItem" style="margin-bottom: 40rpx;">
							<view>身份证号：</view>
							<view>{{item.certification[0].card}}</view>
						</view>
					</view>

					<!-- 酒店 -->
					<view class="cItemBox" v-if="item.category_id == 1036010">
						<view class="cItem">
							<view>姓名：</view>
							<view>{{orderInfo.certification[0].name}}</view>
						</view>
						<view class="cItem" style="margin-bottom: 40rpx;">
							<view>身份证号：</view>
							<view>{{orderInfo.certification[0].card}}</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 联系信息 -->
			<!-- <view class="h">
				<view class="label">联系信息</view>
			</view>
			<view class="contactBox">
				<view class="cItem">
					<view>姓名：</view>
					<view>{{contactInfo.name}}</view>
				</view>
				<view class="cItem">
					<view>电话：</view>
					<view>{{contactInfo.phone}}</view>
				</view>
			</view> -->

			<!-- 证件信息 -->
			<!-- <view class="certiBox" v-for="item in certification">

				<view class="cItem">
					<view>姓名：</view>
					<view>{{item.name}}</view>
				</view>
				<view class="cItem">
					<view>身份证号：</view>
					<view>{{item.card}}</view>
				</view>
			</view> -->
		</view>

		<view class="order-bottom">
			<view class="address" v-if="!isNoNeedAddress">
				<view class="t">
					<text class="name">{{ orderInfo.consignee }}</text>
					<text class="mobile">{{ orderInfo.mobile }}</text>
				</view>
				<view class="b">{{ orderInfo.full_region + orderInfo.address }}</view>
			</view>
			<view class="total">
				<view class="t">
					<text class="label">商品合计：</text>
					<text class="txt">￥{{ orderInfo.goods_price }}</text>
				</view>
				<view class="t">
					<text class="label">运费：</text>
					<text class="txt">￥{{ orderInfo.freight_price }}</text>
				</view>
			</view>
			<view class="pay-fee">
				<text class="label">实付：</text>
				<text class="txt">￥{{ orderInfo.actual_price }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	var util = require('../../../utils/util.js');

	var api = require('../../../config/api.js');

	export default {
		data() {
			return {
				orderId: 0,
				orderInfo: {
					add_time: '',
					order_sn: '',
					actual_price: '',
					order_status_text: '',
					consignee: '',
					mobile: '',
					full_region: '',
					address: '',
					goods_price: '',
					freight_price: ''
				},
				orderGoods: [],
				handleOption: {},
				////////////////////
				// 证件信息
				certification: [],
				// 联系信息
				contactInfo: {
					name: "ddd",
					phone: "18938878019"
				},
				// 发票
				isNeedTicket: true,
				// 需要地址
				isNoNeedAddress: true,
			};
		},
		onLoad: function(options) {
			// 页面初始化 options为页面跳转所带来的参数
			this.setData({
				orderId: options.id
			});
			this.getOrderDetail();
		},
		onReady: function() {
			// 页面渲染完成
		},
		onShow: function() {
			// 页面显示
		},
		onHide: function() {
			// 页面隐藏
		},
		onUnload: function() {
			// 页面关闭
		},
		methods: {
			getOrderDetail() {
				let that = this;
				util.request(api.OrderDetail, {
					orderId: that.orderId
				}).then(function(res) {
					if (res.errno === 0) {
						console.log(res.data);

						const orderInfo = res.data.orderInfo;
						try {
							orderInfo.certification = JSON.parse(orderInfo.certification);
						} catch (err) {}

						const orderGoods = res.data.orderGoods.map(item => {
							item.certification = JSON.parse(item.certification);

							let certification = [];
							if (orderInfo.certification) {
								certification = orderInfo.certification;
							} else {
								certification = item.certification;
							}

							console.log(certification);
							
							let newValue = "";
							if(!certification?.length) {}
							else {
								newValue = certification[0]?.choosetime
							}
							console.log(newValue);
							
							let arr = item.goods_specifition_name_value.split(';');
							arr.forEach((item, index) => {
								if (item.includes('&')) {
									arr[index] = newValue || arr[index];
								}
							});
							item["goods_specifition_name_value_new"] = arr.join(';');

							return item;
						});
						
						that.setData({
							orderInfo: orderInfo,
							orderGoods: orderGoods,
							handleOption: res.data.handleOption,
							contactInfo: {
								name: res.data.orderInfo.name,
								phone: res.data.orderInfo.phone
							},

						}); //that.payTimer();
					}
				});

			},

			payTimer() {
				let that = this;
				let orderInfo = that.orderInfo;
				setInterval(() => {
					console.log(orderInfo);
					orderInfo.add_time -= 1;
					that.setData({
						orderInfo: orderInfo
					});
				}, 1000);
			},

			// 判断是否是微信浏览器
			isWx() {
				let uAgent = navigator?.userAgent?.toLowerCase && navigator.userAgent.toLowerCase();
				return /micromessenger/.test(uAgent) ? true : false;
			},
			payOrder() {
				let that = this;
				util.request(api.PayPrepayId, {
					orderId: that.orderId || 15,
					isWx: that.isWx(),
				}).then(function(res) {
					if (res.errno === 0) {
						const payParam = res.data;
						uni.requestPayment({
							timeStamp: payParam.timeStamp,
							nonceStr: payParam.nonceStr,
							package: payParam.package,
							signType: payParam.signType,
							paySign: payParam.paySign,
							success: function(res) {
								console.log(res);
							},
							fail: function(res) {
								console.log(res);
							}
						});
					}
				});
			},

			cancelOrder() {
				console.log('占位：函数 cancelOrder 未声明');
			}
		}
	};
</script>

<style>
	page {
		height: 100%;
		width: 100%;
		background: #f4f4f4;
	}

	.order-info {
		padding-top: 25rpx;
		background: #fff;
		height: auto;
		overflow: hidden;
	}

	.item-a {
		padding-left: 31.25rpx;
		height: 42.5rpx;
		padding-bottom: 12.5rpx;
		line-height: 30rpx;
		font-size: 30rpx;
		color: #666;
	}

	.item-b {
		padding-left: 31.25rpx;
		height: 29rpx;
		line-height: 29rpx;
		margin-top: 12.5rpx;
		margin-bottom: 41.5rpx;
		font-size: 30rpx;
		color: #666;
	}

	.item-c {
		margin-left: 31.25rpx;
		border-top: 1px solid #f4f4f4;
		height: 103rpx;
		line-height: 103rpx;
	}

	.item-c .l {
		float: left;
	}

	.item-c .r {
		height: 103rpx;
		float: right;
		display: flex;
		align-items: center;
		padding-right: 16rpx;
	}

	.item-c .r .btn {
		float: right;
	}

	.item-c .cost {
		color: #b4282d;
	}

	.item-c .btn {
		line-height: 66rpx;
		border-radius: 5rpx;
		text-align: center;
		margin: 0 15rpx;
		padding: 0 20rpx;
		height: 66rpx;
	}

	.item-c .btn.active {
		background: #b4282d;
		color: #fff;
	}

	.order-goods {
		margin-top: 20rpx;
		background: #fff;
	}

	.order-goods .h {
		height: 93.75rpx;
		line-height: 93.75rpx;
		margin-left: 31.25rpx;
		border-bottom: 1px solid #f4f4f4;
		padding-right: 31.25rpx;
	}

	.order-goods .h .label {
		float: left;
		font-size: 30rpx;
		color: #333;
	}

	.order-goods .h .status {
		float: right;
		font-size: 30rpx;
		color: #b4282d;
	}

	.order-goods .item {
		display: flex;
		flex-direction: column;
		min-height: 192rpx;
		margin-left: 31.25rpx;
		padding-right: 31.25rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.itemBox {
		display: flex;
		align-items: center;
		min-height: 192rpx;
	}

	.order-goods .item:last-child {
		border-bottom: none;
	}

	.order-goods .item .img {
		height: 145.83rpx;
		width: 145.83rpx;
		background: #f4f4f4;
	}

	.order-goods .item .img image {
		height: 145.83rpx;
		width: 145.83rpx;
	}

	.order-goods .item .info {
		flex: 1;
		height: 145.83rpx;
		margin-left: 20rpx;
	}

	.order-goods .item .t {
		margin-top: 8rpx;
		height: 33rpx;
		line-height: 33rpx;
		margin-bottom: 10.5rpx;
	}

	.order-goods .item .t .name {
		display: block;
		float: left;
		height: 33rpx;
		line-height: 33rpx;
		color: #333;
		font-size: 30rpx;
	}

	.order-goods .item .t .number {
		display: block;
		float: right;
		height: 33rpx;
		text-align: right;
		line-height: 33rpx;
		color: #333;
		font-size: 30rpx;
	}

	.order-goods .item .attr {
		height: 29rpx;
		line-height: 29rpx;
		color: #666;
		margin-bottom: 25rpx;
		font-size: 25rpx;
	}

	.order-goods .item .price {
		height: 30rpx;
		line-height: 30rpx;
		color: #333;
		font-size: 30rpx;
	}

	.order-bottom {
		margin-top: 20rpx;
		padding-left: 31.25rpx;
		height: auto;
		overflow: hidden;
		background: #fff;
	}

	.order-bottom .address {
		height: 128rpx;
		padding-top: 25rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.order-bottom .address .t {
		height: 35rpx;
		line-height: 35rpx;
		margin-bottom: 7.5rpx;
	}

	.order-bottom .address .name {
		display: inline-block;
		height: 35rpx;
		width: 140rpx;
		line-height: 35rpx;
		font-size: 25rpx;
	}

	.order-bottom .address .mobile {
		display: inline-block;
		height: 35rpx;
		line-height: 35rpx;
		font-size: 25rpx;
	}

	.order-bottom .address .b {
		height: 35rpx;
		line-height: 35rpx;
		font-size: 25rpx;
	}

	.order-bottom .total {
		height: 106rpx;
		padding-top: 20rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.order-bottom .total .t {
		height: 25rpx;
		line-height: 25rpx;
		margin-bottom: 7.5rpx;
		display: flex;
	}

	.order-bottom .total .label {
		width: 140rpx;
		display: inline-block;
		height: 35rpx;
		line-height: 35rpx;
		font-size: 25rpx;
	}

	.order-bottom .total .txt {
		flex: 1;
		display: inline-block;
		height: 35rpx;
		line-height: 35rpx;
		font-size: 25rpx;
	}

	.order-bottom .pay-fee {
		height: 81rpx;
		line-height: 81rpx;
	}

	.order-bottom .pay-fee .label {
		display: inline-block;
		width: 140rpx;
		color: #b4282d;
	}

	.order-bottom .pay-fee .txt {
		display: inline-block;
		width: 140rpx;
		color: #b4282d;
	}

	.contactBox {
		display: flex;
		flex-direction: column;
		margin-top: 40rpx;
	}

	.cItem {
		display: flex;
		flex-direction: row;
		/* margin-left: 40rpx; */
		line-height: 40rpx;
	}

	.cItem view:first-child {
		flex: 1;
	}

	.cItem view:last-child {
		color: #666;
		flex: 3;
	}

	.certiBox {
		display: flex;
		flex-direction: column;
		margin-top: 40rpx;
		padding-bottom: 30rpx;
	}
</style>
