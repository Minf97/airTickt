<script>
	import util from 'utils/util.js'
	import api from 'config/api.js'
	export default {
		data() {
			return {};
		},

		onLaunch: function() {
			/*#ifdef H5*/
			var iswx = this.isWx()
			if (iswx && !uni.getStorageSync('token')) {
				var code = this.getUrlParam('code'); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
				var local = encodeURIComponent(
					'http://static-3df7fbd1-8be5-4faa-affb-73c9463c6baa.bspapp.com/#/pages/ucenter/index/index'
				);
				let appid = 'wxafc235c48269a55c';


				if (code == null || code === '') {
					window.location.href =
						'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
						local + '&response_type=code&scope=snsapi_base&connect_redirect=1&state=#wechat_redirect';
				} else {
					this.getOpenId(code, {}); //把code传给后台获取用户信息
				}

			}
			/*#endif*/

			/*#ifdef MP*/
			this.onWechatLogin({
				isWx: false
			})
			/*#endif*/

			try {
				this.globalData.userInfo = JSON.parse(uni.getStorageSync('userInfo'));
				this.globalData.token = uni.getStorageSync('token');
			} catch (e) {
				console.log(e);
			}
		},
		methods: {
			// 解析URL 参数
			getUrlParam(name) {
				let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
				let r = window.location.search.substr(1).match(reg);
				if (r != null) {
					return unescape(r[2]);
				}
				return null;
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

		
						this.globalData.userInfo = res.data.userInfo;
						this.globalData.token = res.data.token;
						uni.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
						uni.setStorageSync('token', res.data.token);
					})
					.catch((err) => {
						console.log(err);
					});

			},

			isWx() {
				let uAgent = navigator?.userAgent?.toLowerCase && navigator.userAgent.toLowerCase();
				return /micromessenger/.test(uAgent) ? true : false;
			},
			onWechatLogin(e) {
		
				util.login()
					.then((res) => {
								console.log(123)
						return util.request(
							api.AuthLoginByWeixin, {
								code: res,
								userInfo: e
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

		
						this.globalData.userInfo = res.data.userInfo;
						this.globalData.token = res.data.token;
						uni.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
						uni.setStorageSync('token', res.data.token);
					})
					.catch((err) => {
						console.log(err);
					});
			},

		},
		globalData: {
			userInfo: {
				nickname: '点击登录',
				avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
			},
			token: ''
		}
	};
</script>
<style>
	@import "/wxcomponents/vant/dist/common/index.wxss";
	/**app.wxss**/
	.container {
		box-sizing: border-box;
		background-color: #f4f4f4;
		font-family: PingFangSC-Light, helvetica, 'Heiti SC';
	}

	view,
	image,
	text,
	navigator {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	view,
	text {
		font-family: PingFangSC-Light, helvetica, 'Heiti SC';
		font-size: 29rpx;
		color: #333;
	}
</style>
