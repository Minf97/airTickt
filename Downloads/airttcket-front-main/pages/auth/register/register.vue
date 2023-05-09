<template>
	<view class="container">
		<view class="form-box">
			<view class="form-item">
				<input class="username" :value="username" @input="bindUsernameInput" placeholder="用户名" auto-focus />
				<image v-if="username.length > 0" id="clear-username" class="clear"
					src="/static/static/images/clear_input.png" @tap.stop.prevent="clearInput"></image>
			</view>

			<view class="form-item">
				<input class="password" :value="password" password @input="bindPasswordInput" placeholder="密码" />
				<image class="clear" id="clear-password" v-if="password.length > 0"
					src="/static/static/images/clear_input.png" @tap.stop.prevent="clearInput"></image>
			</view>

			<view class="form-item">
				<input class="password" :value="confirmPassword" password @input="bindConfirmPasswordInput"
					placeholder="确认密码" />
				<image class="clear" id="clear-confirm-password" v-if="confirmPassword.length > 0"
					src="/static/static/images/clear_input.png" @tap.stop.prevent="clearInput"></image>
			</view>

			<!--            <view class="form-item-code">
                <view class="form-item code-item">
                    <input class="code" :value="code" @input="bindCodeInput" placeholder="验证码" />
                    <image class="clear" id="clear-code" v-if="code.length > 0" src="/static/static/images/clear_input.png" @tap.stop.prevent="clearInput"></image>
                </view>
                <image class="code-img" src="https://dl.reg.163.com/cp?pd=yanxuan_web&pkid=SkeBZeG&random=1489903563234"></image>
            </view> -->

			<button type="default" class="login-btn" @tap="startRegister">注册</button>
		</view>
	</view>
</template>

<script>
	var api = require('../../../config/api');

	var app = getApp();
	export default {
		data() {
			return {
				username: '',
				password: '',
				confirmPassword: '',
				code: '',
				loginErrorCount: 0
			};
		},
		onLoad: function(options) {
			// 页面初始化 options为页面跳转所带来的参数
			// 页面渲染完成
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
			startRegister: function() {
				var that = this;

				if (that.password.length < 3 || that.username.length < 3) {
					uni.showModal({
						title: '错误信息',
						content: '用户名和密码不得少于3位',
						showCancel: false
					});
					return false;
				}

				if (that.password != that.confirmPassword) {
					uni.showModal({
						title: '错误信息',
						content: '确认密码不一致',
						showCancel: false
					});
					return false;
				}

				uni.request({
					url: api.ApiRootUrl + 'auth/register',
					data: {
						username: that.username,
						password: that.password
					},
					method: 'POST',
					header: {
						'content-type': 'application/json'
					},
					success: function(res) {
						console.log(123, res.data.token)
						if (res.data.errno === 0) {
							that.setData({
								loginErrorCount: 0
							});
							app.globalData.userInfo = res.data.data.userInfo;
							app.globalData.token = res.data.data.token;
							uni.setStorageSync('userInfo', JSON.stringify(res.data.data.userInfo));
							uni.setStorageSync('token', res.data.data.token);
							uni.switchTab({
								url: '/pages/ucenter/index/index'
							});
						} else if (res.data.errno !== 0) {
							uni.showModal({
								title: '错误信息',
								content: res.data.errmsg,
								showCancel: false
							});
						} else {
							uni.showModal({
								title: '未知错误',
								content: res.data.errmsg,
								showCancel: false
							});
						}

						// console.log(res.data.data.token);
					}
				});
			},

			bindUsernameInput: function(e) {
				this.setData({
					username: e.detail.value
				});
			},

			bindPasswordInput: function(e) {
				this.setData({
					password: e.detail.value
				});
			},

			bindConfirmPasswordInput: function(e) {
				this.setData({
					confirmPassword: e.detail.value
				});
			},

			bindCodeInput: function(e) {
				this.setData({
					code: e.detail.value
				});
			},

			clearInput: function(e) {
				switch (e.currentTarget.id) {
					case 'clear-username':
						this.setData({
							username: ''
						});
						break;

					case 'clear-password':
						this.setData({
							password: ''
						});
						break;

					case 'clear-confirm-password':
						this.setData({
							confirmPassword: ''
						});
						break;

					case 'clear-code':
						this.setData({
							code: ''
						});
						break;
				}
			}
		}
	};
</script>
<style>
	.form-box {
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 0 40rpx;
		margin-top: 96rpx;
		background: #fff;
	}

	.form-item {
		position: relative;
		background: #fff;
		height: 96rpx;
		border-bottom: 1px solid #d9d9d9;
	}

	.form-item .username,
	.form-item .password,
	.form-item .code {
		position: absolute;
		top: 26rpx;
		left: 0;
		display: block;
		width: 100%;
		height: 44rpx;
		background: #fff;
		color: #333;
		font-size: 30rpx;
	}

	.form-item-code {
		margin-top: 32rpx;
		height: auto;
		overflow: hidden;
		width: 100%;
	}

	.form-item-code .form-item {
		float: left;
		width: 350rpx;
	}

	.form-item-code .code-img {
		float: right;
		margin-top: 4rpx;
		height: 88rpx;
		width: 236rpx;
	}

	.form-item .clear {
		position: absolute;
		top: 26rpx;
		right: 18rpx;
		z-index: 2;
		display: block;
		background: #fff;
		height: 44rpx;
		width: 44rpx;
	}

	.login-btn {
		margin: 60rpx 0 40rpx 0;
		height: 96rpx;
		line-height: 96rpx;
		color: #fff;
		font-size: 30rpx;
		width: 100%;
		background: #b4282d;
		border-radius: 6rpx;
	}

	.form-item-text {
		height: 35rpx;
		width: 100%;
	}

	.form-item-text .register {
		display: block;
		height: 34rpx;
		float: left;
		font-size: 28rpx;
		color: #999;
	}

	.form-item-text .reset {
		display: block;
		height: 34rpx;
		float: right;
		font-size: 28rpx;
		color: #999;
	}
</style>
