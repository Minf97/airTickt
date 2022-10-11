<template>
    <view class="wrap">
        <view class="caption">编辑赛事</view>
        <view class="item_wrap">
            <view class="match_wrap" v-for="(item, index) in mathObj" :key="index">
                <view class="left_Wrap" @tap="changDetail" :data-item="item">
                    <view class="name">
                        {{ item.senderMess.title }}
                        <text :class="item.sendStatus == false ? 'tip' : 'tip_1'">状态:{{ item.sendStatus == false ? '未发布' : '已发布' }}</text>
                    </view>
                </view>

                <view class="right_wrap">
                    <view class="change" @tap="changeStatus" :data-item="item" :data-index="index">{{ item.sendStatus == false ? '发布' : '取消' }}</view>
                    <view class="delete" @tap="deleteFun" :data-item="item" :data-index="index">删除</view>
                </view>
            </view>
            <view class="add" @tap="goDetail">+</view>
        </view>
    </view>
</template>

<script>
// pages/association/match/match.js
const db = wx.cloud.database();
var count = '';
export default {
    data() {
        return {
            mathObj: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        count = String(options.count);
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
                        this.setData({
                            mathObj: res.data
                        });
                        uni.hideLoading();
                    });
            }
        });
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
        // 详情页
        goDetail() {
            uni.navigateTo({
                url: '/pages/association/match_detail/match_detail?',
                success: (result) => {}
            });
        },

        changDetail(e) {
            let id = e.currentTarget.dataset.item._id;
            uni.navigateTo({
                url: '/pages/association/match_detail/match_detail?id=' + id,
                success: (result) => {}
            });
        },

        // 修改状态
        changeStatus(e) {
            let item = e.currentTarget.dataset.item;
            let id = item._id;
            let index = e.currentTarget.dataset.index;

            if (item.sendStatus == true) {
                uni.showModal({
                    title: '提示',
                    content: '确认取消发布',
                    showCancel: true,
                    cancelText: '取消',
                    cancelColor: '#000000',
                    confirmText: '确定',
                    confirmColor: '#3CC51F',
                    success: (result) => {
                        if (result.confirm) {
                            wx.cloud
                                .callFunction({
                                    name: 'associationSend',
                                    data: {
                                        type: 3,
                                        index: item.count + '比赛'
                                    }
                                })
                                .then((res) => {
                                    db.collection('associtaionMath')
                                        .where({
                                            _id: id
                                        })
                                        .update({
                                            data: {
                                                sendStatus: false
                                            }
                                        })
                                        .then((res) => {
                                            this.mathObj[index].sendStatus = false;
                                            this.setData({
                                                mathObj: this.mathObj
                                            });
                                        });
                                });
                        }
                    }
                });
            } else {
                uni.showModal({
                    title: '提示',
                    content: '确认发布',
                    showCancel: true,
                    cancelText: '取消',
                    cancelColor: '#000000',
                    confirmText: '确定',
                    confirmColor: '#3CC51F',
                    success: (result) => {
                        if (result.confirm) {
                            wx.cloud
                                .callFunction({
                                    name: 'associationSend',
                                    data: {
                                        type: 2,
                                        AllPhoto: [item.imgUrl],
                                        Cover: item.imgUrl,
                                        CoverHeight: item.CoverHeight,
                                        CoverWidth: item.CoverWidth,
                                        School: item.schoolName,
                                        ShowHeight: item.ShowHeight,
                                        Text: item.senderMess.contentDetail,
                                        Title: item.senderMess.title,
                                        index: item.count + '比赛',
                                        question: item.question,
                                        assoMess: item.assoMess,
                                        borderArr: item.borderArr,
                                        date: item.date,
                                        match_id: id
                                    }
                                })
                                .then((res) => {
                                    db.collection('associtaionMath')
                                        .where({
                                            _id: id
                                        })
                                        .update({
                                            data: {
                                                sendStatus: true
                                            }
                                        })
                                        .then((res) => {
                                            this.mathObj[index].sendStatus = true;
                                            this.setData({
                                                mathObj: this.mathObj
                                            });
                                        });
                                });
                        }
                    }
                });
            }
        },

        // 删除
        deleteFun(e) {
            let item = e.currentTarget.dataset.item;
            let id = item._id;
            let index = e.currentTarget.dataset.index;
            uni.showModal({
                title: '警告',
                content: '删除后无法恢复',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        db.collection('associtaionMath')
                            .where({
                                _id: id
                            })
                            .remove()
                            .then((res) => {
                                this.mathObj.splice(index, 1);
                                this.setData({
                                    mathObj: this.mathObj
                                });
                            });
                    }
                }
            });
        }
    }
};
</script>
<style>
page {
    background-color: #f6f6f6;
}
.wrap {
    font-size: 32rpx;
}
.wrap .caption {
    text-align: center;
    padding: 12rpx;
}
.wrap .item_wrap .match_wrap {
    display: flex;
    flex-direction: row;
    padding: 12rpx;
    background-color: white;
    margin: 12rpx;
    border-radius: 12rpx;
}
.wrap .item_wrap .match_wrap .left_Wrap {
    flex: 4;
}
.wrap .item_wrap .match_wrap .left_Wrap .name {
    font-weight: 700;
}
.wrap .item_wrap .match_wrap .left_Wrap .name .tip {
    font-weight: 500;
    background-color: #4b4b4b;
    padding: 6rpx;
    margin-left: 3rpx;
    color: white;
    border-radius: 8rpx;
}
.wrap .item_wrap .match_wrap .left_Wrap .name .tip_1 {
    font-weight: 500;
    background-color: #37cd32;
    padding: 6rpx;
    margin-left: 3rpx;
    color: white;
    border-radius: 8rpx;
}
.wrap .item_wrap .match_wrap .right_wrap {
    flex: 1;
    color: white;
    text-align: center;
    align-items: center;
    justify-content: center;
}
.wrap .item_wrap .match_wrap .right_wrap .change {
    background-color: blue;
    width: 100rpx;
    margin: 6rpx;
    border-radius: 8rpx;
}
.wrap .item_wrap .match_wrap .right_wrap .delete {
    background-color: #fa2323;
    width: 100rpx;
    margin: 6rpx;
    border-radius: 8rpx;
}
.wrap .add {
    text-align: center;
    padding: 24rpx;
    background-color: #dddddd;
    margin: 12rpx;
    border-radius: 12rpx;
    font-size: 36rpx;
}
</style>
