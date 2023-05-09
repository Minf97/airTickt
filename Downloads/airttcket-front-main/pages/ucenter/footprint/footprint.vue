<template>
    <view class="container">
        <view class="footprint">
            <view class="day-item" v-for="(item, index) in footprintList" :key="index">
                <view class="day-hd">{{ item[0].add_time }}</view>

                <view class="day-list">
                    <view class="item" :data-footprint="iitem" @touchstart="touchStart" @touchend="touchEnd" @tap="deleteItem" v-for="(iitem, index1) in item" :key="iitem.id">
                        <image class="img" :src="iitem.list_pic_url"></image>

                        <view class="info">
                            <view class="name">{{ iitem.name }}</view>
                            <view class="subtitle">{{ iitem.goods_brief }}</view>
                            <view class="price">￥{{ iitem.retail_price }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
var util = require('../../../utils/util.js');

var api = require('../../../config/api.js');

var app = getApp();
export default {
    data() {
        return {
            footprintList: [],
            touch_start: '',
            touch_end: '',

            iitem: {
                id: '',
                list_pic_url: '',
                name: '',
                goods_brief: '',
                retail_price: ''
            }
        };
    },
    onLoad: function (options) {
        this.getFootprintList();
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    methods: {
        getFootprintList() {
            let that = this;
            util.request(api.FootprintList).then(function (res) {
                if (res.errno === 0) {
                    console.log(res.data);
                    that.setData({
                        footprintList: res.data.data
                    });
                }
            });
        },

        deleteItem(event) {
            let that = this;
            let footprint = event.currentTarget.dataset.footprint;
            var touchTime = that.touch_end - that.touch_start;
            console.log(touchTime); //如果按下时间大于350为长按

            if (touchTime > 350) {
                uni.showModal({
                    title: '',
                    content: '要删除所选足迹？',
                    success: function (res) {
                        if (res.confirm) {
                            util.request(
                                api.FootprintDelete,
                                {
                                    footprintId: footprint.id
                                },
                                'POST'
                            ).then(function (res) {
                                if (res.errno === 0) {
                                    uni.showToast({
                                        title: '删除成功',
                                        icon: 'success',
                                        duration: 2000
                                    });
                                    that.getFootprintList();
                                }
                            });
                            console.log('用户点击确定');
                        }
                    }
                });
            } else {
                uni.navigateTo({
                    url: '/pages/goods/goods?id=' + footprint.goods_id
                });
            }
        },

        //按下事件开始
        touchStart: function (e) {
            let that = this;
            that.setData({
                touch_start: e.timeStamp
            });
            console.log(e.timeStamp + '- touch-start');
        },

        //按下事件结束
        touchEnd: function (e) {
            let that = this;
            that.setData({
                touch_end: e.timeStamp
            });
            console.log(e.timeStamp + '- touch-end');
        }
    }
};
</script>
<style>
page {
    background: #f4f4f4;
    min-height: 100%;
}

.container {
    background: #f4f4f4;
    min-height: 100%;
}

.footprint {
    height: auto;
    overflow: hidden;
    width: 100%;
    border-top: 1px solid #e1e1e1;
}

.day-item {
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-bottom: 20rpx;
}

.day-hd {
    height: 94rpx;
    width: 100%;
    line-height: 94rpx;
    background: #fff;
    padding-left: 30rpx;
    color: #333;
    font-size: 28rpx;
}

.day-list {
    width: 100%;
    height: auto;
    overflow: hidden;
    background: #fff;
    padding-left: 30rpx;
    border-top: 1px solid #e1e1e1;
}

.item {
    height: 212rpx;
    width: 720rpx;
    background: #fff;
    padding: 30rpx 30rpx 30rpx 0;
    border-bottom: 1px solid #e1e1e1;
}

.item:last-child {
    border-bottom: 1px solid #fff;
}

.item .img {
    float: left;
    width: 150rpx;
    height: 150rpx;
}

.item .info {
    float: right;
    width: 540rpx;
    height: 150rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20rpx;
}

.item .info .name {
    font-size: 28rpx;
    color: #333;
    line-height: 40rpx;
}

.item .info .subtitle {
    margin-top: 8rpx;
    font-size: 24rpx;
    color: #888;
    line-height: 40rpx;
}

.item .info .price {
    margin-top: 8rpx;
    font-size: 28rpx;
    color: #333;
    line-height: 40rpx;
}
</style>
