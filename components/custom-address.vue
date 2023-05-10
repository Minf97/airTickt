<template>
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
</template>

<script>
	export default {
		name: "custom-address",
		data() {
			return {

			};
		},
		methods: {
			selectAddress() {
				uni.navigateTo({
					url: '/pages/shopping/address/address'
				});
			},
			addAddress() {
				uni.navigateTo({
					url: '/pages/shopping/addressAdd/addressAdd'
				});
			}
			// addAddress

		}
	}
</script>

<style>
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
</style>
