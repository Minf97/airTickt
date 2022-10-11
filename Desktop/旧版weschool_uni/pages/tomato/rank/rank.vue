<template>
    <view>
        <view class="u-list">
            <view class="u-item" v-for="(item, index) in abc" :key="index">
                <image class="image" :src="item.touxiangurl" />

                <view class="content">
                    <view class="text">
                        <image
                            :class="index + 1 <= 3 ? 'cup_top' : 'cup_later'"
                            :src="index + 1 <= 3 ? '../../../images/tomato/cup.png' : '../../../images/tomato/latercup.png'"
                        ></image>
                        第
                        <text :class="index + 1 <= 3 ? 'cup_top_text' : 'cup_later_text'">{{ index + 1 }}</text>
                        名
                    </view>
                    <view class="name">{{ item.name }}</view>
                </view>

                <view class="toltaltime">{{ item.totalTime }}分钟</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/rank/rank.js
export default {
    data() {
        return {
            abc: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    //options
    onLoad: function () {
        // wx.cloud.database().collection('totaltime').aggregate().sort({totalTime: -1}).end()
        wx.cloud
            .database()
            .collection('totaltime')
            .orderBy('totalTime', 'desc')
            .get()
            .then((res) => {
                // console.log(res);
                this.setData({
                    abc: res.data
                });
            });
    },
    //监听下拉的函数
    onPullDownRefresh: function () {
        uni.showNavigationBarLoading();
        wx.cloud
            .database()
            .collection('totaltime')
            .orderBy('totalTime', 'desc')
            .get()
            .then((res) => {
                // console.log(res);
                this.setData({
                    abc: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            }); //模拟加载

        setTimeout(function () {
            uni.hideNavigationBarLoading();
            uni.stopPullDownRefresh();
        }, 1000);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {}
};
</script>
<style>
.u-list .u-item .image {
    float: left;
    height: 100rpx;
    width: 100rpx;
    border-radius: 100%;
    margin: 15rpx 15rpx 15rpx 15rpx;
}
.u-list .u-item .content {
    width: 400rpx;
    float: left;
    height: 1rpx;
    left: 1rpx;
    margin: 25rpx 0rpx 15rpx 25rpx;
    font-size: 28rpx;
}
.u-list .u-item {
    clear: left;
    top: 10rpx;
    border: 2rpx solid #d6d4d4;
}
.u-list .u-item .toltaltime {
    text-align: center;
    width: 170rpx;
    float: left;
    margin: 40rpx 5rpx 20rpx 0rpx;
    color: #f19684;
    font-size: 35.5rpx;
    font-weight: 350;
}
.u-list .u-item .content .text .cup_top {
    /* background-image: url("../../../static/images/cup.png");
    background-color: red; */
    width: 40rpx;
    height: 40rpx;
    position: relative;
    top: 6rpx;
}
.u-list .u-item .content .text .cup_later {
    width: 40rpx;
    height: 40rpx;
    position: relative;
    top: 6rpx;
}
.u-list .u-item .content .text .cup_top_text {
    color: #eec83f;
    font-weight: 800;
    font-size: large;
}
.u-list .u-item .content .text .cup_later_text {
    color: gray;
    font-size: large;
}
.u-list .u-item .content .name {
    color: gray;
}
@media (prefers-color-scheme: dark) {
    .u-list .u-item .toltaltime {
        filter: invert(1) !important;
        color: rgb(172, 211, 254);
    }
    .u-list .u-item .content .text .cup_top_text {
        filter: invert(1) !important;
        color: rgb(172, 211, 254);
    }
}
</style>
