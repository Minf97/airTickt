<template>
    <view>
        <assoCard :item="item" v-for="(item, index) in content" :key="index"></assoCard>
        <view class="end_tip">--没有更多啦--</view>
    </view>
</template>

<script>
import assoCard from '../components/assoCard/assoCard';
// pages/association/allAsso/allAsso.js
const db = wx.cloud.database();
let school = '';
export default {
    components: {
        assoCard
    },
    data() {
        return {
            content: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let args = uni.getStorageSync('args');
        school = args.schoolName;
        this.getMess(school);
    },
    onReachBottom: function () {
        this.getMore();
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        getMess(school) {
            db.collection('associationApply')
                .where({
                    school
                })
                .get()
                .then((res) => {
                    this.setData({
                        content: res.data
                    });
                });
        },

        // 触底加载
        getMore() {
            if (this.content.length < 20) {
                uni.showToast({
                    title: '没有更多啦~',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {}
                });
            } else {
                db.collection('associationApply')
                    .where({
                        school
                    })
                    .skip(this.content.length)
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
                            this.content.push(...res.data);
                            this.setData({
                                content: this.content
                            });
                        }
                    });
            }
        }
    }
};
</script>
<style>
.end_tip {
    font-size: 32rpx;
    text-align: center;
    margin-top: 12rpx;
    color: #888888;
}
</style>
