<template>
	<view class="container">

		<view class="qrimg">
			<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit"
				:background="background" :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize"
				:lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
		</view>


		<div class="box2">
			<div class="tip">
				<text class="tit">方式一：</text> <text class="txt" @click="setClipboard">点击复制</text> ，在微信中打开链接
			</div>
			<div class="tip">
				<text class="tit">方式二：</text> 长按保存上方二维码，打开微信扫一扫，扫描图片从微信进入网页。
			</div>
		</div>
	</view>
</template>

<script>
	import tkiQrcode from "tki-qrcode"

	export default {
		data() {
			return {
				ifShow: true,
				val: window.location.origin + window.location.pathname, // 要生成的二维码值
				size: 200, // 二维码大小
				unit: 'upx', // 单位
				background: '#f4f4f4', // 背景色
				foreground: '', // 前景色
				pdground: '', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		components: {
			tkiQrcode
		},
		methods: {
			setClipboard() {
				console.log(window.location);
				uni.setClipboardData({
					data: window.location.origin + window.location.pathname,
					success: () => {
						uni.showToast({
							title: "复制成功",
							icon: "none"
						})
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.qrimg {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 10rpx 0;
	}

	.box2 {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		/* justify-content: center; */
		font-size: 20px;
	}

	.tip {
		margin-top: 20rpx;
	}

	.txt {
		font-size: 20px;
		text-decoration: underline;
		color: cornflowerblue;
	}

	.tit {
		font-size: 20px;
		font-weight: 700;
	}
</style>
