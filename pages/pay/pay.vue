<template>
    <view class="container">
        <view class="total">
            <view class="label">订单金额</view>
            <view class="txt">{{ actualPrice }}元</view>
        </view>
        <view class="pay-list">
            <view class="h">请选择支付方式</view>
            <view class="b">
                <!--<view class="item">
                <view class="checkbox checked"></view>
                <view class="icon-alipay"></view>
                <view class="name">支付宝</view>
            </view>
            <view class="item">
                <view class="checkbox"></view>
                <view class="icon-net"></view>
                <view class="name">网易支付</view>
            </view>-->
                <view class="item">
                    <view class="checkbox checked"></view>
                    <image src="/static/static/images/wxpay.png" class="icon"></image>
                    <view class="name">微信支付</view>
                </view>
            </view>
        </view>
        <view class="tips">小程序只支持微信支付，如需其它支付方式，请在网页版支付</view>

        <view class="pay-btn" @tap="startPay">确定</view>
    </view>
</template>

<script>
var app = getApp();

var util = require('../../utils/util.js');

var api = require('../../config/api.js');

export default {
    data() {
        return {
            orderId: 0,
            actualPrice: 0
        };
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            orderId: options.orderId,
            actualPrice: options.actualPrice
        });
    },
    onReady: function () {},
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    methods: {
		
		// 判断是否是微信浏览器
		 isWx() {
			let uAgent = navigator?.userAgent?.toLowerCase && navigator.userAgent.toLowerCase();
			return /micromessenger/.test(uAgent) ? true : false;
		},
        //向服务请求支付参数
        requestPayParam() {
            let that = this;
            util.request(api.PayPrepayId, {
                orderId: that.orderId,
                payType: 1,
				isWx:that.isWx(),
            }).then(function (res) {
				console.log(res)
                if (res.errno === 0) {
                    let payParam = res.data;
                    uni.requestPayment({
                        timeStamp: payParam.timeStamp,
                        nonceStr: payParam.timeStamp,
                        package: payParam.nonceStr,
                        signType: payParam.signType,
                        paySign: payParam.paySign,
                        success: function (res) {
							util.request(api.PayPrepayId, {
							    orderId: that.orderId,
							    payType: 1,
								isWx:that.isWx(),
							})
                            uni.redirectTo({
                                url: '/pages/payResult/payResult?status=true'
                            });
                        },
                        fail: function (res) {
                            uni.redirectTo({
                                url: '/pages/payResult/payResult?status=false'
                            });
                        }
                    });
                }
            });
        },

        startPay() {
            this.requestPayParam();
        }
    }
};
</script>
<style>
page {
    min-height: 100%;
    width: 100%;
    background: #f4f4f4;
}

.container {
    padding-top: 20rpx;
}

.total {
    height: 104rpx;
    background: #fff;
    width: 100%;
    line-height: 104rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
}

.total .label {
    float: left;
}

.total .txt {
    float: right;
}

.pay-list {
    margin-top: 30rpx;
    height: auto;
    width: 100%;
    overflow: hidden;
}
.pay-list .h {
    width: 100%;
    height: 24rpx;
    line-height: 24rpx;
    margin-left: 31.25rpx;
    margin-bottom: 31.25rpx;
}

.pay-list .item {
    height: 108rpx;
    padding-left: 31.25rpx;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f4f4f4;
}

.pay-list .checkbox {
    background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/checkbox-sed825af9d3-a6b8540d42.png') 0 -448rpx no-repeat;
    background-size: 38rpx 486rpx;
    width: 40rpx;
    height: 40rpx;
    display: inline-block;
    vertical-align: middle;
    margin-right: 30rpx;
}

.pay-list .checkbox.checked {
    background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/checkbox-sed825af9d3-a6b8540d42.png') 0 -192rpx no-repeat;
    background-size: 38rpx 486rpx;
}

.pay-list .icon-alipay {
    display: inline-block;
    vertical-align: middle;
    background-image: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/payMethod-s3c1faebee4-d754da9c65.png');
    background-repeat: no-repeat;
    background-size: 56.25rpx 189.583rpx;
    margin-right: 10.5rpx;
    width: 56.25rpx;
    height: 56.25rpx;
}

.pay-list .icon-net {
    display: inline-block;
    vertical-align: middle;
    background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/payMethod-s3c1faebee4-d754da9c65.png') 0 -66.7rpx no-repeat;
    background-size: 56.25rpx 189.583rpx;
    margin-right: 10.5rpx;
    width: 56.25rpx;
    height: 56.25rpx;
}

.pay-list .icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10.5rpx;
    width: 56.25rpx;
    height: 56.25rpx;
}

.pay-list .name {
    display: inline-block;
    vertical-align: middle;
    height: 56.25rpx;
    line-height: 56.25rpx;
}

.pay-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100rpx;
    width: 100%;
    text-align: center;
    line-height: 100rpx;
    background: #b4282d;
    color: #fff;
    font-size: 30rpx;
}

.tips {
    height: 40rpx;
    width: 100%;
    font-size: 24rpx;
    color: #999;
    line-height: 40rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
}
</style>
