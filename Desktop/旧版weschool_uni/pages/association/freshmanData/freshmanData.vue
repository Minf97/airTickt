<template>
    <view class="wrap">
        <view class="caption">招新数据</view>
        <scroll-view class="item_wrap" v-for="(item, index) in freshData" :key="index">
            <view class="content_wrap" :data-item="item" @tap="godetail">
                <view class="from">来自{{ item.username }}的萌新申请</view>
                <view class="status" :style="'color:' + (item.read == false ? '#63A1A0' : '') + ';'">{{ item.read == false ? '未读' : '已读' }} ></view>
            </view>
        </scroll-view>
        <view class="tip">--没有更多啦--</view>
    </view>
</template>

<script>
// pages/association/freshmanData/freshmanData.js
const db = wx.cloud.database();
let count = '';
export default {
    data() {
        return {
            freshData: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        count = uni.getStorageSync('args').username;
        count = String(count);
        this.getDate(count);
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
    onReachBottom: function () {
        this.getMore();
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        // 查询招新数据
        getDate(count) {
            uni.showLoading({
                title: '加载中'
            }).then((res) => {
                db.collection('assoFreshApply')
                    .where({
                        index: count
                    })
                    .get()
                    .then((res) => {
                        uni.hideLoading();
                        this.setData({
                            freshData: res.data
                        });
                    });
            });
        },

        // 触底加载
        getMore() {
            let dataLen = this.freshData.length;

            if (dataLen < 20) {
                uni.showToast({
                    title: '没有更多啦~',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {}
                });
            } else {
                db.collection('assoFreshApply')
                    .where({
                        index: count
                    })
                    .skip(dataLen)
                    .get()
                    .then((res) => {
                        if (res.data.length == 0) {
                            uni.showToast({
                                title: '没有更多啦~',
                                icon: 'none',
                                image: '',
                                duration: 1500,
                                mask: false,
                                success: (result) => {}
                            });
                        } else {
                            this.freshData.push(...res.data);
                        }
                    });
            }
        },

        // 详情页
        godetail(e) {
            let content = e.currentTarget.dataset.item;
            content = JSON.stringify(content);
            uni.navigateTo({
                url: `/pages/association/freshmanDetail/freshmanDetail?content=${content}`
            }); // console.log(e.currentTarget.dataset.item);
        }
    }
};
</script>
<style>
page {
    background-color: #f1f1f1;
}
.wrap {
    font-size: 32rpx;
}
.wrap .caption {
    text-align: center;
    color: #63a1a0;
}
.wrap .item_wrap .content_wrap {
    display: flex;
    flex-direction: row;
    background-color: white;
    padding: 12rpx;
    margin: 12rpx;
    border-radius: 12rpx;
}
.wrap .item_wrap .content_wrap .from {
    flex: 3;
}
.wrap .item_wrap .content_wrap .status {
    flex: 1;
}
.wrap .tip {
    text-align: center;
    margin-top: 24rpx;
    color: #7c7c7c;
}
</style>
