<template>
	<view class="container">
		<view class="brand-list">
			<navigator :url="'../brandDetail/brandDetail?id=' + item.id" class="item" v-for="(item, index) in brandList"
				:key="item.id">
				<view class="img-bg">
					<image :src="item.app_list_pic_url" background-size="cover"></image>
				</view>

				<view class="txt-box">
					<view class="line">
						<text class="name">{{ item.name }}</text>
						<text class="s">|</text>
						<text class="price">{{ item.floor_price }}元起</text>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	var util = require('../../utils/util.js');

	var api = require('../../config/api.js');

	var app = getApp();
	export default {
		data() {
			return {
				brandList: [],
				page: 1,
				size: 10,
				totalPages: 1
			};
		},
		onLoad: function(options) {
			// 页面初始化 options为页面跳转所带来的参数
			this.getBrandList();
		},
		onReachBottom() {
			if (this.totalPages > this.page) {
				this.setData({
					page: this.page + 1
				});
			} else {
				return false;
			}

			this.getBrandList();
		},
		onReady: function() {},
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
			getBrandList: function() {
				uni.showLoading({
					title: '加载中...'
				});
				let that = this;
				util.request(api.BrandList, {
					page: that.page,
					size: that.size
				}).then(function(res) {
					if (res.errno === 0) {
						that.setData({
							brandList: that.brandList.concat(res.data.data),
							totalPages: res.data.totalPages
						});
					}

					uni.hideLoading();
				});
			}
		}
	};
</script>
<style>
	.brand-list .item {
		display: block;
		width: 750rpx;
		height: 416rpx;
		position: relative;
		margin-bottom: 4rpx;
	}

	.brand-list .item .img-bg {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
		width: 750rpx;
		height: 417rpx;
		overflow: hidden;
	}

	.brand-list .item .img-bg image {
		width: 750rpx;
		height: 416rpx;
	}

	.brand-list .item .txt-box {
		position: absolute;
		left: 0;
		top: 0;
		display: table;
		z-index: 0;
		width: 750rpx;
		height: 417rpx;
	}

	.brand-list .item .line {
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		height: 63rpx;
		line-height: 63rpx;
	}

	.brand-list .item .line text {
		font-size: 35rpx;
		font-weight: 700;
		text-shadow: 1rpx 1rpx rgba(0, 0, 0, 0.32);
		color: #fff;
	}

	.brand-list .item .line .s {
		padding: 0 10rpx;
		font-size: 40rpx;
	}
</style>
