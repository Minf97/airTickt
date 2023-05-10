<template>
    <view class="container">
        <view class="form-box">
            <view class="form-item">
                <input class="username" :value="username" @input="bindUsernameInput" placeholder="请输入账号" auto-focus />
                <image v-if="username.length > 0" id="clear-username" class="clear" src="/static/static/images/clear_input.png" @tap.stop.prevent="clearInput"></image>
            </view>

    <!--        <view class="form-item-code">
                <view class="form-item code-item">
                    <input class="code" :value="code" @input="bindCodeInput" placeholder="验证码" />
                    <image class="clear" id="clear-code" v-if="code.length > 0" src="/static/static/images/clear_input.png" @tap.stop.prevent="clearInput"></image>
                </view>
                <image class="code-img" src="https://dl.reg.163.com/cp?pd=yanxuan_web&pkid=SkeBZeG&random=1489903563234"></image>
            </view> -->

            <button type="default" class="login-btn" @tap="startNext">下一步</button>
        </view>
    </view>
</template>

<script>
var app = getApp();
export default {
    data() {
        return {
            username: '',
            code: ''
        };
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        // 页面渲染完成
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
        startLogin: function () {
            var that = this;
        },

        bindUsernameInput: function (e) {
            this.setData({
                username: e.detail.value
            });
        },

        bindCodeInput: function (e) {
            this.setData({
                code: e.detail.value
            });
        },

        clearInput: function (e) {
            switch (e.currentTarget.id) {
                case 'clear-username':
                    this.setData({
                        username: ''
                    });
                    break;

                case 'clear-code':
                    this.setData({
                        code: ''
                    });
                    break;
            }
        },

        startNext() {
            console.log('占位：函数 startNext 未声明');
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
</style>
