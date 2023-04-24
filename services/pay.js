/**
 * 支付相关服务
 */
const util = require('../utils/util.js');

const api = require('../config/api.js');

/**
 * 判断用户是否登录
 */

// 判断是否是微信浏览器
function isWx() {
	let uAgent = navigator?.userAgent?.toLowerCase && navigator.userAgent.toLowerCase();
	return /micromessenger/.test(uAgent) ? true : false;
}

function payOrder(orderId) {
	return new Promise(function(resolve, reject) {

		util.request(api.PayPrepayId, {
			orderId: orderId,
			isWx: isWx(),
		}).then((res) => {
			console.log(res);

			if (res.errno === 0) {
				const payParam = res.data;

				// jWeixin.config({
				// 	debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				// 	appId: 'wxf84451020f439de9', // 必填，公众号的唯一标识
				// 	timestamp: payParam.timeStamp, // 必填，生成签名的时间戳
				// 	nonceStr: payParam.nonceStr, // 必填，生成签名的随机串
				// 	signature: payParam.signType, // 必填，签名，见附录1
				// 	jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				// })


				/*#ifdef H5*/

				const jWeixin = require('jweixin-module');

				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						appId: 'wxafc235c48269a55c', //公众号名称，由商户传入
						timeStamp: payParam.timeStamp, //时间戳，自1970年以来的秒数
						nonceStr: payParam.nonceStr, //随机串
						package: payParam.package,
						signType: payParam.signType, //微信签名方式：
						paySign: payParam.paySign //微信签名
					},
					function(res) {
						uni.showModal({
							title: '错误信息',
							content: res,
							showCancel: false
						});
						console.log(233, res)
						if (res.err_msg == 'get_brand_wcpay_request:ok') {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
							//支付成功回调
							resolve(res);


							/* if (res.err_msg == 'get_brand_wcpay_request:cancel') */
						} else {
							//支付失败回调

							reject(res);
						}
					}
				)
				/*#endif*/
				/*#ifdef MP*/

				uni.requestPayment({
					timeStamp: payParam.timeStamp,
					nonceStr: payParam.nonceStr,
					package: payParam.package,
					signType: payParam.signType,
					paySign: payParam.paySign,
					success: function(res) {
						resolve(res);
					},
					fail: function(res) {
						reject(res);
					},
					complete: function(res) {
						reject(res);
					}
				});
				/*#endif*/
			} else {
				reject(res);
			}
		});
	});
}

module.exports = {
	payOrder
};
