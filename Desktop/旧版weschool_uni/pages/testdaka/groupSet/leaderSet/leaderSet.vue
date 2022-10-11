<template>
    <view>
        <view class="showgroup_box_userimage">
            <view>小组成员</view>
            <view class="showgroup_box_userimage_box">
                <!-- 成员 -->
                <view class="showgroup_box_userimage_groupMember" v-for="(item, index) in groupMember" :key="index">
                    <image class="showgroup_box_userimage_groupMember_image" :src="item.wxurl"></image>

                    <view></view>
                </view>
                <!-- 加号 -->
                <view class="showgroup_box_userimage_add" @tap="joinGroup">
                    <image class="showgroup_box_userimage_add_image" src="/static/pages/testdaka/images/addmember.png"></image>
                    <view></view>
                </view>
            </view>
        </view>
        <button class="bottomBox_button" @tap="showDayNum">
            <view class="bottomBox_button_box1">小组名片</view>
            <view class="bottomBox_button_box2">{{ myname }}</view>
            <view class="bottomBox_button_box3">></view>
        </button>
        <button class="bottomBox_button" @tap="showDayNum">
            <view class="bottomBox_button_box1">小组id</view>
            <view class="bottomBox_button_box2">{{ groupid }}</view>
            <view class="bottomBox_button_box3"></view>
        </button>
        <button class="bottomBox_button" @tap="showDayNum">
            <view class="bottomBox_button_box1">成员管理</view>
            <view class="bottomBox_button_box2"></view>
            <view class="bottomBox_button_box3">></view>
        </button>
        <button class="bottomBox_button" @tap="showDayNum">
            <view class="bottomBox_button_box1">打卡挑战管理</view>
            <view class="bottomBox_button_box2"></view>
            <view class="bottomBox_button_box3">></view>
        </button>
        <button class="bottomBox_button" @tap="showDayNum">
            <view class="bottomBox_button_box1">编辑资料</view>
            <view class="bottomBox_button_box2"></view>
            <view class="bottomBox_button_box3">></view>
        </button>
        <button class="bottomBox_button" @tap="showDayNum">
            <view class="bottomBox_button_box1">我的发布</view>
            <view class="bottomBox_button_box2"></view>
            <view class="bottomBox_button_box3">></view>
        </button>
        <button class="bottomBox_button" @tap="showDayNum">
            <view class="bottomBox_button_box1">分享小组</view>
            <view class="bottomBox_button_box2"></view>
            <view class="bottomBox_button_box3">></view>
        </button>
        <button class="bottomBox_button" @tap="transfer" style="margin-top: 25rpx">
            <view class="bottomBox_button_box1" style="color: skyblue">移交小组长</view>
            <view class="bottomBox_button_box2"></view>
            <view class="bottomBox_button_box3">></view>
        </button>
        <button class="bottomBox_button" @tap="secede" style="margin-top: 25rpx">
            <view class="bottomBox_button_box1" style="color: tomato">解散小组</view>
            <view class="bottomBox_button_box2"></view>
            <view class="bottomBox_button_box3">></view>
        </button>
    </view>
</template>

<script>
// pages/testdaka/groupSet/leaderSet/leaderSet.js
export default {
    data() {
        return {
            myname: '我的名字',
            groupid: 'abcdefghijklmn',
            groupMember: [
                {
                    wxurl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132'
                },
                {
                    wxurl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132'
                },
                {
                    wxurl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132'
                },
                {
                    wxurl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132'
                },
                {
                    wxurl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132'
                }
            ]
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {
        transfer() {
            uni.showToast({
                title: '转移小组长'
            });
        },

        secede() {
            uni.showToast({
                title: '退出小组'
            });
        },

        showDayNum() {
            uni.showToast({
                title: '开发中，敬请期待',
                icon: 'none'
            });
        },

        joinGroup() {
            uni.showToast({
                title: '开发中，敬请期待',
                icon: 'none'
            });
        }
    }
};
</script>
<style>
page {
    background: #f5f6f8;
}
.showgroup_box_userimage {
    /* background: blue; */
    height: 320rpx;
    width: 92%;
    font-size: 25rpx;
    padding: 10rpx 30rpx;
    display: flex;
    flex-direction: column;
}
.showgroup_box_userimage_box {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 95%;
    flex-wrap: wrap;
    align-content: flex-start;
    /* position: absolute;  */
}
.showgroup_box_userimage_groupMember {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-top: 20rpx;
    margin-right: 15rpx;
}
.showgroup_box_userimage_groupMember_image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}
.showgroup_box_userimage_add {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    margin-top: 15rpx;
    /* margin-left: 10rpx; */
}
.showgroup_box_userimage_add_image {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
}

button:not([size='mini']) {
    margin-left: auto;
    margin-right: auto;
    width: auto;
}
.bottomBox_button {
    background: white;
    /* height: 100rpx; */
    width: 100vw;
    display: flex;
    flex-direction: row;
    color: black;
    font-weight: 500;
    font-size: 27rpx;
    letter-spacing: 3rpx;
    line-height: 70rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    /* margin-left: 30rpx; */
    position: relative;
}
.bottomBox_button_box1 {
}
.bottomBox_button_box2 {
    position: absolute;
    right: 70rpx;
    color: gray;
}
.bottomBox_button_box3 {
    position: absolute;
    right: 30rpx;
    color: gray;
}
</style>
