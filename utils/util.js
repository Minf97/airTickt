var api = require('../config/api.js');

function formatTime(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n;
}
/**
 * 封封微信的的request
 */

function request(url, data = {}, method = 'GET') {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: url,
			data: data,
			method: method,
			header: {
				'Content-Type': 'application/json',
				'X-Nideshop-Token': uni.getStorageSync('token')
			},
			success: function(res) {
				console.log('success');

				if (res.statusCode == 200) {
					if (res.data.errno == 401) {
						//需要登录后才可以操作
						let code = null;
						return login()
							.then((res) => {
								code = res.code;
								return getUserInfo();
							})
							.then((userInfo) => {
								//登录远程服务器
								request(
										api.AuthLoginByWeixin, {
											code: code,
											userInfo: userInfo
										},
										'POST'
									)
									.then((res) => {
										if (res.errno === 0) {
											//存储用户信息
											uni.setStorageSync('userInfo', res.data
												.userInfo);
											uni.setStorageSync('token', res.data.token);
											resolve(res);
										} else {
											reject(res);
										}
									})
									.catch((err) => {
										reject(err);
									});
							})
							.catch((err) => {
								reject(err);
							});
					} else {
						resolve(res.data);
					}
				} else {
					reject(res.errMsg);
				}
			},
			fail: function(err) {
				reject(err);
				console.log('failed');
			}
		});
	});
}

function get(url, data = {}) {
	return request(url, data, 'GET');
}

function post(url, data = {}) {
	return request(url, data, 'POST');
}
/**
 * 检查微信会话是否过期
 */

function checkSession() {
	return new Promise(function(resolve, reject) {
		uni.checkSession({
			success: function() {
				resolve(true);
			},
			fail: function() {
				reject(false);
			}
		});
	});
}
/**
 * 调用微信登录
 */

function login() {
	return new Promise(function(resolve, reject) {
		uni.login({
			success: function(res) {
				if (res.code) {
					resolve(res.code);
				} else {
					reject(res);
				}
			},
			fail: function(err) {
				reject(err);
			}
		});
	});
}

function getUserInfo() {
	return new Promise(function(resolve, reject) {
		uni.getUserInfo({
			withCredentials: true,
			success: function(res) {
				if (res.detail.errMsg === 'getUserInfo:ok') {
					resolve(res);
				} else {
					reject(res);
				}
			},
			fail: function(err) {
				reject(err);
			}
		});
	});
}

function redirect(url) {
	//判断页面是否需要登录
	if (false) {
		uni.redirectTo({
			url: '/pages/auth/login/login'
		});
		return false;
	} else {
		uni.redirectTo({
			url: url
		});
	}
}

function showErrorToast(msg) {
	uni.showToast({
		title: msg,
		image: '/static/static/images/icon_error.png'
	});
}


/**
 * 验证税号
 * 15或者17或者18或者20位字母、数字组成
 * @param obj
 * @returns {Boolean}
 */
function checkTax(obj) {
	if (/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(obj)) {
		return true;
	}

}

module.exports = {
	formatTime,
	request,
	get,
	post,
	redirect,
	showErrorToast,
	checkSession,
	login,
	getUserInfo,
	checkTax,
};
