<template>
    <view class="container">
        <view class="post-comment">
            <view class="input-box">
                <textarea class="content" :focus="true" @input="bindInpuntValue" maxlength="140" placeholder="留言经过筛选后，对所有人可见" />
                <text class="count">{{ 140 - content.length }}</text>
            </view>
            <view class="btns">
                <view class="close" @tap="onClose">取消</view>
                <view class="post" @tap="onPost">发表</view>
            </view>
        </view>
    </view>
</template>

<script>
var app = getApp();

var util = require('../../utils/util.js');

var api = require('../../config/api.js');

export default {
    data() {
        return {
            typeId: 0,
            valueId: 0,
            content: ''
        };
    },
    onLoad: function (options) {
        var that = this;
        that.setData({
            typeId: parseInt(options.typeId),
            valueId: parseInt(options.valueId)
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
        onClose() {
            uni.navigateBack({
                delta: 1
            });
        },

        onPost() {
            let that = this;

            if (!this.content) {
                util.showErrorToast('请填写评论');
                return false;
            }

            util.request(
                api.CommentPost,
                {
                    typeId: that.typeId,
                    valueId: that.valueId,
                    content: that.content
                },
                'POST'
            ).then(function (res) {
                if (res.errno === 0) {
                    uni.showToast({
                        title: '评论成功',
                        complete: function () {
                            uni.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }

                console.log(res);
            });
        },

        bindInpuntValue(event) {
            let value = event.detail.value; //判断是否超过140个字符

            if (value && value.length > 140) {
                return false;
            }

            this.setData({
                content: event.detail.value
            });
            console.log(event.detail);
        }
    }
};
</script>
<style>
page,
.container {
    height: 100%;
    background: #f4f4f4;
}

.post-comment {
    width: 750rpx;
    height: auto;
    overflow: hidden;
    padding: 30rpx;
}

.post-comment .input-box {
    height: 337.5rpx;
    width: 690rpx;
    position: relative;
    background: #fff;
}

.post-comment .input-box .content {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    background: #fff;
    font-size: 29rpx;
    color: #333;
    height: 300rpx;
    width: 650rpx;
    padding: 20rpx;
}

.post-comment .input-box .count {
    position: absolute;
    bottom: 20rpx;
    right: 20rpx;
    display: block;
    height: 30rpx;
    width: 50rpx;
    font-size: 29rpx;
    color: #999;
}

.post-comment .btns {
    height: 108rpx;
}

.post-comment .close {
    float: left;
    height: 108rpx;
    line-height: 108rpx;
    text-align: left;
    color: #666;
    padding: 0 30rpx;
}

.post-comment .post {
    float: right;
    height: 108rpx;
    line-height: 108rpx;
    text-align: right;
    padding: 0 30rpx;
}
</style>
