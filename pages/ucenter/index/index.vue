<template>
	<view>
		<view class="container">
			<view class="profile-info">
				<image @tap="onUserInfoClick" class="avatar" :src="userInfo.avatar"></image>
				<view class="info">
					<text class="name" @tap="onUserInfoClick">{{ userInfo.nickname || '点击登录' }}</text>
					<!-- <text class='level' bindtap='onUserInfoClick'></text> -->
				</view>
				<image @tap="onUserInfoClick" class="btn" src="/static/static/images/address_right.png"></image>
			</view>

			<view class="user-menu">
				<view class="item">
					<navigator url="/pages/ucenter/order/order" class="a">
						<text class="icon order"></text>
						<text class="txt">我的订单</text>
					</navigator>
				</view>
				<!-- <view class="item">
					<navigator url="/pages/ucenter/coupon/coupon" class="a">
						<text class="icon coupon"></text>
						<text class="txt">优惠券</text>
					</navigator>
				</view> -->
				<!-- <view class="item no-border">
					<navigator url="url" class="a">
						<text class="icon gift"></text>
						<text class="txt">礼品卡</text>
					</navigator>
				</view> -->
				<view class="item">
					<navigator url="/pages/ucenter/collect/collect" class="a">
						<text class="icon address"></text>
						<text class="txt">我的收藏</text>
					</navigator>
				</view>
				<view class="item">
					<navigator url="/pages/ucenter/footprint/footprint" class="a">
						<text class="icon security"></text>
						<text class="txt">我的足迹</text>
					</navigator>
				</view>
				<!-- <view class="item no-border">
					<navigator url="url" class="a">
						<text class="icon kefu"></text>
						<text class="txt">会员福利</text>
					</navigator>
				</view> -->
				<view class="item">
					<navigator url="../address/address" class="a">
						<text class="icon address"></text>
						<text class="txt">地址管理</text>
					</navigator>
				</view>
				<!-- <view class="item">
					<navigator url="url" class="a">
						<text class="icon security"></text>
						<text class="txt">账号安全</text>
					</navigator>
				</view> -->
				<view class="item" style="position: relative;">
					<button type="default" open-type="contact" class="contactBtn"></button>
					<navigator url="url" class="a">
						<text class="icon kefu"></text>
						<text class="txt">联系客服</text>
					</navigator>
				</view>
				<!-- <view class="item item-bottom">
					<navigator url="url" class="a">
						<text class="icon help"></text>
						<text class="txt">帮助中心</text>
					</navigator>
				</view> -->
				<view class="item">
					<navigator url="/pages/ucenter/feedback/feedback" class="a">
						<text class="icon feedback"></text>
						<text class="txt">意见反馈</text>
					</navigator>
				</view>
			</view>

			<!-- <view class="logout" bindtap="exitLogin">退出登录</view> -->
		</view>

		<view class="dialog-login" v-if="showLoginDialog" @tap="onCloseLoginDialog">
			<view class="dialog-body" @tap.stop.prevent="onDialogBody">
				<view class="title">请选择登录方式</view>
				<view class="content">
					<!-- #ifdef H5 -->
					<button type="primary" @click="onLogin">手机登录</button>
					<!-- #endif -->
					<!-- #ifdef MP -->
					<button type="primary" open-type="getUserInfo" @getuserinfo="onWechatLogin">微信登录</button>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const util = require('../../../utils/util.js');

	const api = require('../../../config/api.js');

	const user = require('../../../services/user.js');

	const app = getApp();
	export default {
		data() {
			return {
				userInfo: {
					avatar: '',
					nickname: ''
				},
				showLoginDialog: false
			};
		},
		onLoad: function(options) {
			var iswx = this.isWx()
			if (iswx && !uni.getStorageSync('token')) {
				var code = this.getUrlParam('code'); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
				var local = encodeURIComponent(
					'http://static-3df7fbd1-8be5-4faa-affb-73c9463c6baa.bspapp.com/#/pages/ucenter/index/index'
				);
				let appid = 'wxb316fcad56ffb1ce';


				if (code == null || code === '') {
					window.location.href =
						'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
						local + '&response_type=code&scope=snsapi_base&connect_redirect=1&state=#wechat_redirect';
				} else {
					this.getOpenId(code, {}); //把code传给后台获取用户信息
				}

			}
			// 页面初始化 options为页面跳转所带来的参数
		},
		onReady: function() {},
		onShow: function() {
			this.setData({
				userInfo: app.globalData.userInfo
			});
		},
		onHide: function() {
			// 页面隐藏
		},
		onUnload: function() {
			// 页面关闭
		},
		methods: {
			loginWithWx: function() {
				if (!uni.getStorageSync('openid') || uni.getStorageSync('openid') == undefined) {
					this.getWxUserInfoCode();
				}
			},

			// 解析URL 参数
			getUrlParam(name) {
				let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
				let r = window.location.search.substr(1).match(reg);
				if (r != null) {
					return unescape(r[2]);
				}
				return null;
			},
			// 判断是否是微信浏览器
			isWx() {
				let uAgent = navigator?.userAgent?.toLowerCase && navigator.userAgent.toLowerCase();
				return /micromessenger/.test(uAgent) ? true : false;
			},

			onLogin: function() {
				var iswx = this.isWx()
				if (iswx) {

				} else {
					uni.navigateTo({
						url: '/pages/auth/login/login'
					});
				}


			},
			getOpenId(code, userInfo) {
				console.log(code, userInfo)
				var _this = this;
				util.request(
						api.AuthLoginByWeixin, {
							code: code,
							userInfo: userInfo
						},
						'POST'
					).then((res) => {
						console.log(res);

						if (res.errno !== 0) {
							uni.showToast({
								title: '微信登录失败'
							});
							return false;
						} // 设置用户信息

						this.setData({
							userInfo: res.data.userInfo,
							showLoginDialog: false
						});
						app.globalData.userInfo = res.data.userInfo;
						app.globalData.token = res.data.token;
						uni.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
						uni.setStorageSync('token', res.data.token);
					})
					.catch((err) => {
						console.log(err);
					});
			},
			onUserInfoClick: function() {
				if (uni.getStorageSync('token')) {} else {
					this.showLoginDialogFun();
				}
			},


			showLoginDialogFun() {
				this.setData({
					showLoginDialog: true
				});
			},

			onCloseLoginDialog() {
				this.setData({
					showLoginDialog: false
				});
			},

			onDialogBody() {
				// 阻止冒泡
			},

			onWechatLogin(e) {
				if (e.detail.errMsg !== 'getUserInfo:ok') {
					if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
						return false;
					}

					uni.showToast({
						title: '微信登录失败'
					});
					return false;
				}

				util.login()
					.then((res) => {
						return util.request(
							api.AuthLoginByWeixin, {
								code: res,
								userInfo: e.detail
							},
							'POST'
						);
					})
					.then((res) => {
						console.log(res);

						if (res.errno !== 0) {
							uni.showToast({
								title: '微信登录失败'
							});
							return false;
						} // 设置用户信息

						this.setData({
							userInfo: res.data.userInfo,
							showLoginDialog: false
						});
						app.globalData.userInfo = res.data.userInfo;
						app.globalData.token = res.data.token;
						uni.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
						uni.setStorageSync('token', res.data.token);
					})
					.catch((err) => {
						console.log(err);
					});
			},

			onOrderInfoClick: function(event) {
				uni.navigateTo({
					url: '/pages/ucenter/order/order'
				});
			},

			onSectionItemClick: function(event) {},

			// TODO 移到个人信息页面
			exitLogin: function() {
				uni.showModal({
					title: '',
					confirmColor: '#b4282d',
					content: '退出登录？',
					success: function(res) {
						if (res.confirm) {
							uni.removeStorageSync('token');
							uni.removeStorageSync('userInfo');
							uni.switchTab({
								url: '/pages/index/index'
							});
						}
					}
				});
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

	.container {
		background: #f4f4f4;
		height: auto;
		overflow: hidden;
		width: 100%;
	}

	.profile-info {
		width: 100%;
		height: 280rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		padding: 0 30.25rpx;
		background: #333;
	}

	.profile-info .avatar {
		height: 148rpx;
		width: 148rpx;
		border-radius: 50%;
		border: 4rpx solid #fff;
	}

	.profile-info .info {
		flex: 1;
		height: 85rpx;
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.profile-info .name {
		height: 45rpx;
		line-height: 45rpx;
		color: #fff;
		font-size: 37.5rpx;
	}

	.profile-info .level {
		height: 30rpx;
		line-height: 30rpx;
		margin-top: 10rpx;
		color: #7f7f7f;
		font-size: 30rpx;
	}

	.profile-info .btn {
		width: 50rpx;
		height: 50rpx;
		margin-left: 10rpx;
		border-radius: 50%;
	}

	.user-menu {
		width: 100%;
		height: auto;
		overflow: hidden;
		background: #fff;
	}

	.user-menu .item {
		float: left;
		width: 33.33333%;
		height: 187.5rpx;
		border-right: 1px solid rgba(0, 0, 0, 0.15);
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
		text-align: center;
	}

	.user-menu .item .a {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.user-menu .item.no-border {
		border-right: 0;
	}

	.user-menu .item.item-bottom {
		border-bottom: none;
	}

	.user-menu .icon {
		margin: 0 auto;
		display: block;
		height: 52.803rpx;
		width: 52.803rpx;
		margin-bottom: 16rpx;
	}

	.user-menu .icon.order {
		background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png') 0 -437.5rpx no-repeat;
		background-size: 52.803rpx;
	}

	.user-menu .icon.coupon {
		background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png') 0 -62.4997rpx no-repeat;
		background-size: 52.803rpx;
	}

	.user-menu .icon.gift {
		background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png') 0 -187.5rpx no-repeat;
		background-size: 52.803rpx;
	}

	.user-menu .icon.address {
		background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png') 0 0 no-repeat;
		background-size: 52.803rpx;
	}

	.user-menu .icon.security {
		background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png') 0 -500rpx no-repeat;
		background-size: 52.803rpx;
	}

	.user-menu .icon.kefu {
		background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png') 0 -312.5rpx no-repeat;
		background-size: 52.803rpx;
	}

	.user-menu .icon.help {
		background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png') 0 -250rpx no-repeat;
		background-size: 52.803rpx;
	}

	.user-menu .icon.feedback {
		background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png') 0 -125rpx no-repeat;
		background-size: 52.803rpx;
	}

	.user-menu .txt {
		display: block;
		height: 24rpx;
		width: 100%;
		font-size: 24rpx;
		color: #333;
	}

	.logout {
		margin-top: 50rpx;
		height: 101rpx;
		width: 100%;
		line-height: 101rpx;
		text-align: center;
		background: #fff;
		color: #333;
		font-size: 30rpx;
	}

	.dialog-login {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dialog-login .dialog-body {
		width: 540rpx;
		height: auto;
		overflow: hidden;
		background: #fff;
		border-radius: 5px;
		padding: 40rpx;
	}

	.dialog-login .dialog-body .title {
		width: 100%;
		text-align: center;
		line-height: 60rpx;
	}

	.dialog-login .dialog-body .content {
		width: 100%;
	}

	.dialog-login .dialog-body button {
		margin-top: 30rpx;
	}

	.contactBtn {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
