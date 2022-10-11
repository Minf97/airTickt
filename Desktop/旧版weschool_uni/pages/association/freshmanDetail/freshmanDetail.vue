<template>
    <view class="wrap">
        <view class="list_wrap">
            <view class="caption">数据详情</view>
            <view class="list_item" v-for="(item, index) in content.formData" :key="index">
                <view class="title_list">{{ index }}：</view>

                <view class="content_list">{{ item }}</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/association/freshmanDetail/freshmanDetail.js
const db = wx.cloud.database();
export default {
    data() {
        return {
            content: {
                formData: []
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        // console.log(options);
        let content = JSON.parse(options.content);
        this.setData({
            content
        });
        this.updateStatus(content._id);
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
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        // 标记状态
        updateStatus(_id) {
            db.collection('assoFreshApply')
                .where({
                    _id
                })
                .update({
                    data: {
                        read: true
                    }
                });
        },

        // 复制
        copy() {}
    }
};
</script>
<style>
page {
    background-color: #f3f3f3;
}
.wrap .list_wrap {
    margin: 24rpx;
    padding: 12rpx 12rpx 24rpx 12rpx;
    background-color: white;
    border-radius: 12rpx;
}
.wrap .list_wrap .caption {
    color: #63a1a0;
    font-weight: 700;
    padding-top: 12rpx;
    text-align: center;
    font-size: 32rpx;
}
.wrap .list_wrap .list_item {
    display: flex;
    flex-direction: row;
    font-size: 32rpx;
}
</style>
