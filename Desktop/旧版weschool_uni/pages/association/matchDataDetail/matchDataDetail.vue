<template>
    <view class="wrap">
        <view class="list_wrap">
            <view class="title">用户信息</view>
            <view class="list_item" v-for="(item, index) in content.userMess" :key="index">
                <view class="title_list">{{ index }}：</view>

                <view class="content_list">{{ item }}</view>
            </view>
            <view class="title">用户内容</view>
            <view class="list_item" v-for="(item, index) in content.matchDetail" :key="index">
                <view class="title_list">{{ index }}：</view>

                <view class="content_list">{{ item }}</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/association/matchDataDetail/matchDataDetail.js
const db = wx.cloud.database();
export default {
    data() {
        return {
            content: {
                userMess: [],
                matchDetail: []
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let content = JSON.parse(options.content);
        this.setData({
            content: content
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
            db.collection('assoMatchPush')
                .where({
                    _id
                })
                .update({
                    data: {
                        read: true
                    }
                });
        }
    }
};
</script>
<style>
page {
    background-color: #f3f3f3;
}
.wrap .list_wrap {
    margin: 24rpx;
    padding: 12rpx;
    background-color: white;
    border-radius: 12rpx;
}
.wrap .list_wrap .title {
    font-size: 32rpx;
    text-align: center;
    color: #63a1a0;
}
.wrap .list_wrap .list_item {
    display: flex;
    flex-direction: row;
    font-size: 32rpx;
}
</style>
