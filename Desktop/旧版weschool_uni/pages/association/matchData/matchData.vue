<template>
    <view>
        <view class="top_wrap">
            <picker @change="bindPickerChange" :value="index" :range="array">
                <view class="picker">当前选择:{{ array[index] }}</view>
            </picker>
        </view>
        <view class="wrap">
            <view class="caption">招新数据</view>
            <scroll-view class="item_wrap" v-for="(item, index) in contetn" :key="index">
                <view class="content_wrap" :data-item="item" @tap="godetail">
                    <view class="from">来自{{ item.userMess.name }}的比赛申请</view>
                    <view class="status" :style="'color:' + (item.read == false ? '#63A1A0' : '') + ';'">{{ item.read == false ? '未读' : '已读' }} ></view>
                </view>
            </scroll-view>
            <view class="tip">--没有更多啦--</view>
        </view>
    </view>
</template>

<script>
// pages/association/matchData/matchData.js
let count = '';
const db = wx.cloud.database();
export default {
    data() {
        return {
            array: ['1', '2'],
            index: 0,
            match_id: '',
            contetn: '',
            content: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let args = uni.getStorageSync('args');
        count = String(args.username);
        this.getMatch(count, 0);
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
        // 跳转
        godetail(e) {
            let content = e.currentTarget.dataset.item;
            content = JSON.stringify(content);
            uni.navigateTo({
                url: `/pages/association/matchDataDetail/matchDataDetail?content=${content}`
            });
        },

        // 获取赛事信息
        getMatch(count, index) {
            uni.showLoading({
                title: '查询中',
                mask: true,
                success: (result) => {
                    db.collection('associtaionMath')
                        .where({
                            count
                        })
                        .get()
                        .then((res) => {
                            console.log(res);

                            if (res.data.length == 0) {
                                uni.showToast({
                                    title: '暂无数据',
                                    icon: 'none'
                                });
                            } else {
                                let arr = [];

                                for (let i = 0; i < res.data.length; i++) {
                                    arr.push(res.data[i].senderMess.title);
                                }

                                let match_id = res.data[index]._id;
                                this.setData({
                                    array: arr,
                                    match_id: match_id
                                });
                                db.collection('assoMatchPush')
                                    .where({
                                        match_id
                                    })
                                    .get()
                                    .then((res) => {
                                        this.setData({
                                            contetn: res.data
                                        });
                                        uni.hideLoading();
                                    });
                            }
                        });
                }
            });
        },

        bindPickerChange(e) {
            let index = e.detail.value;
            this.setData({
                index
            });
            this.getMatch(count, index);
        },

        // 触底加载更多数据
        getMore() {
            let len = this.content.length; // let content=this.data.content

            if (len < 20) {
                uni.showToast({
                    title: '没有更多啦~',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {}
                });
            } else {
                db.collection('assoMatchPush')
                    .where({
                        count,
                        match_id: this.match_id
                    })
                    .skip(len)
                    .get()
                    .then((res) => {
                        if (!res.data) {
                            uni.showToast({
                                title: '没有更多啦~',
                                icon: 'none',
                                image: '',
                                duration: 1500,
                                mask: false,
                                success: (result) => {
                                    uni.showToast({
                                        title: '加载完成',
                                        icon: 'none',
                                        image: '',
                                        duration: 1500,
                                        mask: false,
                                        success: (result) => {}
                                    });
                                }
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
page {
    background-color: #f1f1f1;
}
.top_wrap {
    font-size: 32rpx;
    text-align: right;
    padding: 6rpx;
    color: #63a1a0;
    background-color: #63a1a034;
    border-radius: 8rpx;
}
.wrap {
    font-size: 32rpx;
}
.wrap .caption {
    text-align: center;
    color: #63a1a0;
    margin-top: 12rpx;
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
