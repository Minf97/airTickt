<template>
	<view class="container">
		<view class="cate-nav">
			<scroll-view :scroll-x="true" class="cate-nav-body" style="width: 750rpx" :scroll-left="scrollLeft">
				<view :class="'item ' + (id == item.id ? 'active' : '')" :data-id="item.id" :data-index="index"
					@tap="switchCate" v-for="(item, index) in navList" :key="index">
					<view class="name">{{ item.name }}</view>
				</view>
			</scroll-view>
		</view>
		<scroll-view :scroll-y="true" :scroll-top="scrollTop" :style="'height:' + scrollHeight + ';'">
			<view class="cate-item">
				<view class="h">
					<text class="name">{{ currentCategory.name }}</text>
					<text class="desc">{{ currentCategory.front_name }}</text>
				</view>
				<view class="b">
					<navigator :class="'item ' + ((iindex + 1) % 2 == 0 ? 'item-b' : '')"
						:url="iitem.category_id == 1036009 ? '../goodsTicket/goodsTicket?id=' + iitem.id : '../goods/goods?id=' + iitem.id"
						v-for="(iitem, iindex) in goodsList" :key="iindex">
						<image class="img" :src="iitem.list_pic_url" background-size="cover"></image>

						<text class="name">{{ iitem.name }}</text>

						<text class="price">￥{{ iitem.retail_price }}</text>
					</navigator>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	var util = require('../../utils/util.js');

	var api = require('../../config/api.js');

	export default {
		data() {
			return {
				// text:"这是一个页面"
				navList: [],

				goodsList: [],
				id: 0,

				currentCategory: {
					name: '',
					front_name: ''
				},

				scrollLeft: 0,
				scrollTop: 0,
				scrollHeight: 0,
				page: 1,
				size: 10000,
				iindex: 0,

				iitem: {
					id: '',
					list_pic_url: '',
					name: '',
					retail_price: ''
				}
			};
		},
		onLoad: function(options) {
			// 页面初始化 options为页面跳转所带来的参数
			var that = this;

			if (options.id) {
				that.setData({
					id: parseInt(options.id)
				});
			}

			uni.getSystemInfo({
				success: function(res) {
					that.setData({
						scrollHeight: res.windowHeight
					});
				}
			});
			this.getCategoryInfo();
		},
		onReady: function() {
			// 页面渲染完成
		},
		onShow: function() {
			// 页面显示
			console.log(1);
		},
		onHide: function() {
			// 页面隐藏
		},
		onUnload: function() {
			// 页面关闭
		},
		methods: {
			getCategoryInfo: function() {
				let that = this;
				util.request(api.GoodsCategory, {
					id: this.id
				}).then(function(res) {
					if (res.errno == 0) {
						that.setData({
							navList: res.data.brotherCategory,
							currentCategory: res.data.currentCategory
						}); //nav位置

						let currentIndex = 0;
						let navListCount = that.navList.length;

						for (let i = 0; i < navListCount; i++) {
							currentIndex += 1;

							if (that.navList[i].id == that.id) {
								break;
							}
						}

						if (currentIndex > navListCount / 2 && navListCount > 5) {
							that.setData({
								scrollLeft: currentIndex * 60
							});
						}

						that.getGoodsList();
					} else {
						//显示错误信息
					}
				});
			},

			getGoodsList: function() {
				var that = this;
				util.request(api.GoodsList, {
					categoryId: that.id,
					page: that.page,
					size: that.size
				}).then(function(res) {
					that.setData({
						goodsList: res.data.goodsList
					});
				});
			},

			switchCate: function(event) {
				if (this.id == event.currentTarget.dataset.id) {
					return false;
				}

				var that = this;
				var clientX = event.detail.x;
				var currentTarget = event.currentTarget;

				if (clientX < 60) {
					that.setData({
						scrollLeft: currentTarget.offsetLeft - 60
					});
				} else if (clientX > 330) {
					that.setData({
						scrollLeft: currentTarget.offsetLeft
					});
				}

				this.setData({
					id: event.currentTarget.dataset.id
				});
				this.getCategoryInfo();
			}
		}
	};
</script>
<style>
	.container {
		background: #f9f9f9;
	}

	.cate-nav {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1000;
	}

	.cate-nav-body {
		height: 84rpx;
		white-space: nowrap;
		background: #fff;
		border-top: 1px solid rgba(0, 0, 0, 0.15);
		overflow: hidden;
	}

	.cate-nav .item {
		display: inline-block;
		height: 84rpx;
		min-width: 130rpx;
		padding: 0 15rpx;
	}

	.cate-nav .item .name {
		display: block;
		height: 84rpx;
		padding: 0 20rpx;
		line-height: 84rpx;
		color: #333;
		font-size: 30rpx;
		width: auto;
	}

	.cate-nav .item.active .name {
		color: #ab2b2b;
		border-bottom: 2px solid #ab2b2b;
	}

	.cate-item {
		margin-top: 94rpx;
		height: auto;
		overflow: hidden;
	}

	.cate-item .h {
		height: 145rpx;
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.cate-item .h .name {
		display: block;
		height: 35rpx;
		margin-bottom: 18rpx;
		font-size: 30rpx;
		color: #333;
	}

	.cate-item .h .desc {
		display: block;
		height: 24rpx;
		font-size: 24rpx;
		color: #999;
	}

	.cate-item .b {
		width: 750rpx;
		padding: 0 6.25rpx;
		height: auto;
		overflow: hidden;
	}

	.cate-item .b .item {
		float: left;
		background: #fff;
		width: 365rpx;
		margin-bottom: 6.25rpx;
		padding-bottom: 33.333rpx;
		height: auto;
		overflow: hidden;
		text-align: center;
	}

	.cate-item .b .item-b {
		margin-left: 6.25rpx;
	}

	.cate-item .item .img {
		width: 302rpx;
		height: 302rpx;
	}

	.cate-item .item .name {
		display: block;
		width: 365.625rpx;
		height: 35rpx;
		margin: 11.5rpx 0 22rpx 0;
		text-align: center;
		overflow: hidden;
		padding: 0 20rpx;
		font-size: 30rpx;
		color: #333;
	}

	.cate-item .item .price {
		display: block;
		width: 365.625rpx;
		height: 30rpx;
		text-align: center;
		font-size: 30rpx;
		color: #b4282d;
	}
</style>
