<template>
	<view class="container">
		<view class="search">
			<navigator url="/pages/search/search" class="input">
				<image class="icon"></image>
				<text class="txt">商品搜索, 共{{ goodsCount }}款好物</text>
			</navigator>
		</view>
		<view class="catalog">
			<scroll-view class="nav" :scroll-y="true">
				<view :class="'item ' + (currentCategory.id == item.id ? 'active' : '')" :data-id="item.id"
					:data-index="index" @tap="switchCate" v-for="(item, index) in navList" :key="index">
					{{ item.name }}
				</view>
			</scroll-view>
			<scroll-view class="cate" :scroll-y="true">
				<navigator url="url" class="banner">
					<image class="image" :src="currentCategory.wap_banner_url"></image>
					<view class="txt">{{ currentCategory.front_name }}</view>
				</navigator>
				<view class="hd">
					<text class="line"></text>
					<text class="txt">{{ currentCategory.name }}分类</text>
					<text class="line"></text>
				</view>
				<view class="bd">
					<navigator :url="'/pages/category/category?id=' + item.id"
						:class="'item ' + ((index + 1) % 3 == 0 ? 'last' : '')"
						v-for="(item, index) in currentCategory.subCategoryList" :key="index">
						<image class="icon" :src="item.wap_banner_url" mode="aspectFill"></image>

						<text class="txt">{{ item.name }}</text>
					</navigator>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	var util = require('../../utils/util.js');

	var api = require('../../config/api.js');

	export default {
		data() {
			return {
				navList: [],
				categoryList: [],
				currentCategory: {
					id: '',
					wap_banner_url: '',
					front_name: '',
					name: '',
					subCategoryList: []
				},
				scrollLeft: 0,
				scrollTop: 0,
				goodsCount: 0,
				scrollHeight: 0
			};
		},
		onLoad: function(options) {
			this.getCatalog();
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
			getCatalog: function() {
				//CatalogList
				let that = this;
				uni.showLoading({
					title: '加载中...'
				});
				util.request(api.CatalogList).then(function(res) {
					that.setData({
						navList: res.data.categoryList,
						currentCategory: res.data.currentCategory
					});
					uni.hideLoading();
				});
				util.request(api.GoodsCount).then(function(res) {
					that.setData({
						goodsCount: res.data.goodsCount
					});
				});
			},

			getCurrentCategory: function(id) {
				let that = this;
				util.request(api.CatalogCurrent, {
					id: id
				}).then(function(res) {
					that.setData({
						currentCategory: res.data.currentCategory
					});
				});
			},

			getList: function() {
				var that = this;
				util.request(api.ApiRootUrl + 'api/catalog/' + that.currentCategory.cat_id).then(function(res) {
					that.setData({
						categoryList: res.data
					});
				});
			},

			switchCate: function(event) {
				var that = this;
				var currentTarget = event.currentTarget;

				if (this.currentCategory.id == event.currentTarget.dataset.id) {
					return false;
				}

				this.getCurrentCategory(event.currentTarget.dataset.id);
			}
		}
	};
</script>
<style>
	page {
		height: 100%;
	}

	.container {
		background: #f9f9f9;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.search {
		height: 88rpx;
		width: 100%;
		padding: 0 30rpx;
		background: #fff;
		display: flex;
		align-items: center;
	}

	.search .input {
		width: 690rpx;
		height: 56rpx;
		background: #ededed;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search .icon {
		background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png') center no-repeat;
		background-size: 100%;
		width: 28rpx;
		height: 28rpx;
	}

	.search .txt {
		height: 42rpx;
		line-height: 42rpx;
		color: #666;
		padding-left: 10rpx;
		font-size: 30rpx;
	}

	.catalog {
		flex: 1;
		width: 100%;
		background: #fff;
		display: flex;
		border-top: 1px solid #fafafa;
	}

	.catalog .nav {
		width: 162rpx;
		height: 100%;
	}

	.catalog .nav .item {
		text-align: center;
		line-height: 90rpx;
		width: 162rpx;
		height: 90rpx;
		color: #333;
		font-size: 28rpx;
		border-left: 6rpx solid #fff;
	}

	.catalog .nav .item.active {
		color: #ab2b2b;
		font-size: 36rpx;
		border-left: 6rpx solid #ab2b2b;
	}

	.catalog .cate {
		border-left: 1px solid #fafafa;
		flex: 1;
		height: 100%;
		padding: 0 30rpx 0 30rpx;
	}

	.banner {
		display: block;
		height: 222rpx;
		width: 100%;
		position: relative;
	}

	.banner .image {
		position: absolute;
		top: 30rpx;
		left: 0;
		border-radius: 4rpx;
		height: 192rpx;
		width: 100%;
	}

	.banner .txt {
		position: absolute;
		top: 30rpx;
		text-align: center;
		color: #fff;
		font-size: 28rpx;
		left: 0;
		height: 192rpx;
		line-height: 192rpx;
		width: 100%;
	}

	.catalog .hd {
		height: 108rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.catalog .hd .txt {
		font-size: 24rpx;
		text-align: center;
		color: #333;
		padding: 0 10rpx;
		width: auto;
	}

	.catalog .hd .line {
		width: 40rpx;
		height: 1px;
		background: #d9d9d9;
	}

	.catalog .bd {
		height: auto;
		width: 100%;
		overflow: hidden;
	}

	.catalog .bd .item {
		display: block;
		float: left;
		height: 216rpx;
		width: 144rpx;
		margin-right: 34rpx;
	}

	.catalog .bd .item.last {
		margin-right: 0;
	}

	.catalog .bd .item .icon {
		height: 144rpx;
		width: 144rpx;
	}

	.catalog .bd .item .txt {
		display: block;
		text-align: center;
		font-size: 24rpx;
		color: #333;
		height: 72rpx;
		width: 144rpx;
	}
</style>
