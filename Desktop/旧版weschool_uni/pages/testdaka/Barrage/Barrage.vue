<template>
    <view class="Wish_Wall">
        <view class="head">
            <view class="head_btn">
                <view class="btn_2">许愿墙</view>
            </view>
            <view class="btn_3" @tap="want">我要许愿|还愿</view>
            <view v-if="click" class="apply">
                <textarea class="input" placeholder="在这里写下愿望" cols="30" rows="10"></textarea>
                <view class="apply_txt">通过审核后，将会随机进行展示</view>
                <view class="btn_apply" @tap="apply">许下愿望</view>
                <view class="btn_cancel" @tap="cancel">取消</view>
            </view>
        </view>
        <view class="container">
            <view class="top" :style="'top: ' + item.top + 'px; animation: dmAnimation2 ' + item.time + 's linear 0.5s forwards; '" v-for="(item, index) in danmuList" :key="index">
                <view class="dm">
                    <view class="container_Like">
                        <image v-if="item.zan" class="like" src="/static/images/zan.png"></image>
                        <image v-else class="like" src="/static/images/zan1.png"></image>
                    </view>
                    <text class="content">{{ item.text }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/Barrage/Barrage.js
var page = undefined;
export default {
    data() {
        return {
            // 需要渲染的弹幕数组
            click: false,

            zan: [true, false],
            cnt: ['50', '100', '150', '230', '260', '300', '360', '430', '460'],
            Data: [
                'sssd',
                'dsadfag',
                '弹幕需要设立审核机制',
                'sssd',
                '需要渲染的弹幕数组',
                'fasgasd',
                'fasgasd',
                'sssd',
                'dsadfag',
                'fasgasd',
                'sssd',
                '页面的初始数据',
                'fasgasd',
                'sssd',
                'dsadfag',
                'fasgasd',
                'sssd',
                '页面的初始数据',
                'fasgasd',
                'sssd',
                'dsadfag',
                'fasgasd',
                'sssd',
                'dsadfag',
                'fasgasd',
                '页面的初始数据',
                'dsadfag',
                'fasgasd',
                'sssd',
                'dsadfag',
                'fasgasd',
                'sssd',
                'dsadfag',
                'fasgasd',
                'sssd',
                'dsadfag',
                'fasgasd',
                '弹幕需要设立审核机制',
                'dsadfag',
                'fasgasd',
                'sssd',
                'dsadfag',
                '需要渲染的弹幕数组',
                'sssd',
                'dsadfag',
                '需要渲染的弹幕数组',
                'sssd',
                'dsadfag',
                'fasgasd',
                'sssd',
                'dsadfag',
                'fasgasd',
                'sssd',
                'dsadfag',
                '页面的初始数据',
                'sssd',
                'dsadfag',
                '弹幕需要设立审核机制',
                '需要渲染的弹幕数组',
                '需要渲染的弹幕数组',
                'fasgasd',
                'sssd',
                'dsadfag',
                'fasgasd'
            ],
            danmuList: [],
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            rectHeight: getApp().globalData.rectHeight,
            windowHeight: getApp().globalData.windowHeight,
            state: ''
        };
    },
    onLoad: function () {
        page = this;
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.begin();
    },
    methods: {
        want(e) {
            this.setData({
                click: true
            });
        },

        apply(e) {
            this.setData({
                click: false
            });
        },

        cancel(e) {
            this.setData({
                click: false
            });
        },

        // 开始计时
        begin() {
            this.start();
            this.timer = setInterval(this.start, 1600);
            this.setData({
                state: 'started'
            });
        },

        // end() {
        //     this.timer = setInterval(this.Remove, 1000);
        //     this.setData({
        //         state: 'started'
        //     })
        // },
        getRandomZan() {
            let randomZan = this.zan[Math.ceil(Math.random() * 2 + -1)];
            return randomZan;
        },

        start() {
            var that = this;
            var f = that.Data.length;
            var i = Math.ceil(Math.random() * 60 + 2).toFixed(0);
            danmulist.push(new Room(that.Data[i], this.cnt[Math.ceil(Math.random() * 2 + -1).toFixed(0)], Math.ceil(Math.random() * 2 + 4), that.getRandomZan()));
            i = Math.ceil(Math.random() * 60 + 2).toFixed(0);
            danmulist.push(new Room(that.Data[i], this.cnt[Math.ceil(Math.random() * 2 + 1).toFixed(0)], Math.ceil(Math.random() * 3 + 4), that.getRandomZan()));
            i = Math.ceil(Math.random() * 60 + 2).toFixed(0);
            danmulist.push(new Room(that.Data[i], this.cnt[Math.ceil(Math.random() * 2 + 3).toFixed(0)], Math.ceil(Math.random() * 3 + 4), that.getRandomZan()));
            i = Math.ceil(Math.random() * 60 + 2).toFixed(0);
            danmulist.push(new Room(that.Data[i], this.cnt[Math.ceil(Math.random() * 2 + 5).toFixed(0)], Math.ceil(Math.random() * 3 + 4), that.getRandomZan()));
            i = Math.ceil(Math.random() * 60 + 2).toFixed(0);
            danmulist.push(new Room(that.Data[i], this.cnt[Math.ceil(Math.random() * 2 + 7).toFixed(0)], Math.ceil(Math.random() * 3 + 4), that.getRandomZan()));

            if (danmulist.length >= 500) {
                danmulist = [];
            }

            this.setData({
                danmuList: danmulist
            });
        }
    }
};
var danmulist = [];
var id = 0;

class Room {
    constructor(text, top, time, zan) {
        this.text = text;
        this.top = top;
        this.time = time;
        this.zan = zan;
    }
}
</script>
<style>
page {
    background: -webkit-linear-gradient(#1b2347, #3c3e67, #615b8b, #8a7cb7);
    width: 100%;
    height: 100%;
}

.Wish_Wall {
    width: 100%;
    height: 100%;
}

.head {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 190px;
}

.head_btn {
    margin-top: 100px;
    display: flex;
    flex-direction: row;

    align-items: center;
    width: 200px;
    height: 28px;
    border-radius: 20px;
    margin-bottom: 10px;
}

.btn_2 {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #ffffff;
    height: 100%;
}

.btn_3 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    background: #ffffff;
    color: #004db5;
    border-radius: 20px;
    width: 150px;
    height: 24px;
    box-shadow: 0.1rpx 0.1rpx 10rpx 0.1rpx rgba(228, 228, 228, 0.384);
    border: 1px outset #ffffff;
}

.apply {
    margin-top: 150px;
    position: absolute;
    background: #ffffff;
    border-radius: 20px;
    height: 355px;
    z-index: 10;
}

.input {
    display: flex;
    text-align: center;
    align-items: center;
    background: #efefef;
    color: #bcbcbc;
    height: 180px;
    margin: 15px 10px 10px 10px;
    border-radius: 20px;
}

.apply_txt {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}

.btn_apply {
    margin: 20px 40px 10px 40px;
    background: #eff1fd;
    font-weight: bold;
    color: #8fbace;
    height: 40px;
    display: flex;
    justify-content: center;
    border-radius: 20px;
    align-items: center;
}

.btn_cancel {
    margin: 10px 40px 10px 40px;
    background: #eff1fd;
    font-weight: bold;
    color: #8fbace;
    height: 40px;
    display: flex;
    justify-content: center;
    border-radius: 20px;
    align-items: center;
}

.container {
    position: relative;
}

.top {
    /* position: absolute; */
    position: absolute;
    left: 100%;
    z-index: 10;
    width: 100%;
    animation-timing-function: linear;
    animation-fill-mode: none;
    transform: translateZ(0);
    white-space: nowrap;
    height: 60rpx;
}

.dm {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    position: relative;
    height: 50rpx;
    line-height: 50rpx;
    padding: 0 15rpx 0 15rpx;
    background: #ffffff25;
    border-radius: 20px;
    /* overflow: hidden; */
    font-size: 24rpx;
    /* color: #fff; */
}

.dm::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    bottom: -10rpx;
    left: 40rpx;
    border-left: 20rpx solid;
    opacity: 0.2;
    border-left: 20rpx solid #ffffff25;
    border-bottom: 10rpx solid transparent;
}

.dm::after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    bottom: -10rpx;
    left: 40rpx;
    border-left: 20rpx solid;
    opacity: 0.2;
    border-left: 20rpx solid #ffffff25;
    border-bottom: 10rpx solid transparent;
}

.dm .content {
    display: inline-block;
    color: #ffffff;
    max-width: 400rpx;
    height: 50rpx;
    line-height: 50rpx;
    margin-right: 10rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

container_Like {
    display: inline-block;
    max-width: 100rpx;
    height: 53rpx;
    font-size: 23rpx;
    line-height: 50rpx;
    margin-right: 10rpx;
    white-space: nowrap;
    border-radius: 50%;
    background: #ffffff;
}

.dm .like {
    margin-top: 15rpx;
    margin-right: 5rpx;
    width: 35rpx;
    height: 35rpx;
}

@keyframes dmAnimation2 {
    from {
        left: 100%;
    }

    to {
        left: -100%;
    }
}

@keyframes dmAnimation {
    from {
        left: 100%;
    }

    to {
        left: -100%;
    }
}

@media (prefers-color-scheme: dark) {
    .title .title_img {
        filter: brightness(2) !important;
    }
}
</style>
