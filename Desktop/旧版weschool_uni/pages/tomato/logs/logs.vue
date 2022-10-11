<template>
    <view>
        <!-- logs.wxml -->
        <view class="sum">
            <view class="sum_item" v-for="(item, index) in sum" :key="item.sum">
                <view class="sum_item_title">{{ item.title }}</view>

                <view class="sum_item_val">{{ item.val }}</view>
            </view>
        </view>

        <view class="nav">
            <view @tap="navSwitch" data-index="0" :class="navState == 0 ? 'nav-switch-style' : ''">番茄记录</view>
            <view @tap="navSwitch" data-index="1" :class="navState == 1 ? 'nav-switch-style' : ''">统计图</view>
        </view>

        <view v-if="navState == 0" class="detail">
            <view class="detail_title">
                <view class="detail_title_text">分类统计</view>
                <view class="detail_title_type">
                    <text :class="activeIndex == 0 ? 'active' : ''" data-index="0" @tap="changeType">今日</text>
                    <text :class="activeIndex == 1 ? 'active' : ''" data-index="1" @tap="changeType">历史</text>
                </view>
            </view>

            <view class="detail_list" v-if="list.length > 0">
                <view class="list_item" v-for="(item, index) in list" :key="index">
                    <view class="list_item_date">{{ item.date }}</view>

                    <view class="list_item_text">{{ item.cate }}</view>

                    <view class="list_item_time">{{ item.time }}分钟</view>
                </view>
            </view>
        </view>

        <view v-if="navState == 1" class="ec_page">
            <view class="ec_box1" style="margin-top: 150rpx">
                <ec-canvas id="mychart-dom" canvas-id="mychart" :ec="ec"></ec-canvas>
            </view>
        </view>
    </view>
</template>

<script>
import ecCanvas from '../ec-canvas/ec-canvas';
// logs.js
const util = require('../../../utils/util.js');

const app = getApp(); //全局变量

import * as echarts from '../ec-canvas/echarts';
export default {
    components: {
        ecCanvas
    },
    data() {
        return {
            ec: {
                lazyLoad: true
            },

            navState: 0,

            //导航状态
            logsa: [
                {
                    a: 1
                },
                {
                    b: 2
                }
            ],

            total: 0,
            totalTime: 0,
            downloaddata: {},
            storageInfo: {},
            logs: [],
            activeIndex: 0,
            dayList: [],
            list: [],
            totaltime123: 0,
            total123: 0,
            userInfo: {},
            hasUserInfo: false,

            sum: [
                {
                    title: '今日番茄次数',
                    val: '0'
                },
                {
                    title: '累计番茄次数',
                    val: '0'
                },
                {
                    title: '今日专注时长',
                    val: '0分钟'
                },
                {
                    title: '累计专注时长',
                    val: '0分钟'
                }
            ],

            val: ''
        };
    },
    onShow: function () {
        let username = uni.getStorageSync('args').username;
        wx.cloud
            .database()
            .collection('totaltime')
            .where({
                username: username
            })
            .get()
            .then((res) => {
                var logs = res.data[0].logs;
                var day = 0;
                var total = logs.length;
                var dayTime = 0;
                var totalTime = 0;
                var dayList = [];

                if (logs.length > 0) {
                    for (var i = 0; i < logs.length; i++) {
                        //if (!isNaN(logs[i].time)) {
                        if (logs[i].date.substr(0, 10) == util.formatTime(new Date()).substr(0, 10)) {
                            day = day + 1;
                            dayTime = dayTime + parseInt(logs[i].time);
                            dayList.push(logs[i]);
                            this.setData({
                                dayList: dayList,
                                list: dayList
                            });
                        } // }

                        totalTime = totalTime + parseInt(logs[i].time);
                    }

                    this.setData({
                        'sum[0].val': day,
                        'sum[1].val': total,
                        'sum[2].val': dayTime + '分钟',
                        'sum[3].val': totalTime + '分钟',
                        totaltime123: totalTime,
                        total123: total
                    });
                    this.updata();
                }
            });
    },
    onLoad() {
        let that = this;
        uni.getStorage({
            key: 'args',

            success(res) {
                that.setData({
                    storageInfo: res.data
                });
            },

            fail(err) {
                console.log('学号获取失败失败失败');
            }
        });
    },
    methods: {
        //echarts数据可视化
        setOption(chart, echarr) {
            var option = {
                title: {
                    text: '统计图',
                    subtext: '任务时间占比',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right'
                },
                series: [
                    {
                        name: '分钟',
                        type: 'pie',
                        radius: '50%',
                        data: echarr,
                        //  [
                        //   { value: 1048, name: '学习' },
                        //   { value: 735, name: '阅读' },
                        //   { value: 580, name: '娱乐' },
                        //   { value: 484, name: '思考' },
                        //   { value: 300, name: '运动' }
                        // ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            chart.setOption(option);
        },

        echarts_opt(echarr) {
            //echart库有代码
            let ecComponent = this.$mp.page.selectComponent('#mychart-dom');
            ecComponent.init((canvas, width, height, dpr) => {
                // 获取组件的 canvas、width、height 后的回调函数
                // 在这里初始化图表
                const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                }); //调用设定EChart报表状态的函数，并且把从后端拿到的数据传过去

                this.setOption(chart, echarr); // 注意这里一定要返回 chart 实例，否则会影响事件处理等

                return chart;
            });
        },

        get_data() {
            let that = this;
            let username = String(uni.getStorageSync('args').username);
            wx.cloud
                .database()
                .collection('totaltime')
                .where({
                    username: username
                })
                .get()
                .then((abc) => {
                    let b = abc.data[0].logs;
                    let dict = {};
                    let echarr = [];
                    let a = b.map((i) => {
                        return i.cate;
                    });
                    a = Array.from(new Set(a));
                    a.forEach((et) => {
                        dict = {
                            name: '',
                            value: 0
                        };
                        b.forEach((e) => {
                            if (e.cate == et) {
                                dict.name = e.cate;
                                dict.value = dict.value + e.time;
                            }
                        });
                        echarr.push(dict);
                    });
                    console.log(echarr);
                    that.echarts_opt(echarr);
                });
        },

        abc() {},

        def() {
            let a = [];
            a = [
                {
                    休息: [
                        {
                            cate: '休息',
                            time: 1
                        },
                        {
                            cate: '休息',
                            time: 2
                        }
                    ]
                },
                {
                    修bug: [
                        {
                            cate: '修bug',
                            time: 3
                        },
                        {
                            cate: '修bug',
                            time: 5
                        }
                    ]
                }
            ];
            let res = [];
            a.forEach((item, index) => {
                let dict = {
                    name: '',
                    value: 0
                };
                dict.name = Object.keys(item)[0];
                let temp = item[Object.keys(item)];
                temp.forEach((e, i) => {
                    dict['value'] += e.time;
                });
                res.push(dict);
            });
            console.log(res);
        },

        updata() {
            uni.showLoading({
                title: '加载数据中'
            });
            let username = String(uni.getStorageSync('args').username);
            wx.cloud
                .database()
                .collection('totaltime')
                .where({
                    username: username
                })
                .get()
                .then((res) => {
                    let totaltime = wx.cloud.database().collection('totaltime');
                    let len = res.data.length;

                    if (len == 0) {
                        console.log('数据库无数据');
                        uni.showToast({
                            title: '您还没有数据',
                            icon: 'none'
                        });
                        uni.hideLoading();
                    } else {
                        let totalTime = this.totaltime123;
                        totaltime
                            .where({
                                username: username
                            })
                            .update({
                                data: {
                                    totalTime
                                }
                            })
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        uni.hideLoading();
                    }
                });
        },

        changeType: function (e) {
            var index = e.currentTarget.dataset.index;

            if (index == 0) {
                this.setData({
                    list: this.dayList
                });
            } else if (index == 1) {
                let username = uni.getStorageSync('args').username;
                wx.cloud
                    .database()
                    .collection('totaltime')
                    .where({
                        username: username
                    })
                    .get()
                    .then((res) => {
                        let logs = res.data[0].logs;
                        this.setData({
                            list: logs
                        });
                    });
            }

            this.setData({
                activeIndex: index
            });
        },

        navSwitch: function (e) {
            let index = e.currentTarget.dataset.index;

            if (index == 1) {
                uni.showLoading({
                    title: '加载中',
                    mask: true
                }).then((res) => {
                    this.get_data();
                    uni.hideLoading();
                });
            }

            this.setData({
                navState: index
            });
        }
    }
};
</script>
<style>
.sum {
    display: flex;
    flex-wrap: wrap;
    width: 750rpx;
    height: 350rpx;
    border: 10rpx solid #eeeeee;
}

.sum .sum_item {
    width: 375rpx;
    height: 160;
    text-align: center;
}

.sum .sum_item .sum_item_title {
    height: 120rpx;
    line-height: 120rpx;
    font-size: 30rpx;
    color: #6b747e;
}

.sum .sum_item .sum_item_val {
    height: 40rpx;
    line-height: 40rpx;
    color: #e7624f;
}

.detail {
    width: 700rpx;
    margin: 0 auto;
}

.detail_title {
    display: flex;
    height: 60rpx;
    line-height: 60rpx;
}

.detail_title .detail_title_text {
    flex: 1;
    font-size: 35rpx;
}

.detail_title .detail_title_type {
    flex: 1;
    text-align: right;
    font-size: 30rpx;
}

.detail_title .detail_title_type text {
    margin-left: 10rpx;
}

.active {
    color: #e7624f;
}

.list_item {
    width: 100%;
    display: flex;
    height: 60rpx;
    line-height: 60rpx;
    margin-top: 30rpx;
}

/* .list_item > view{
  width: 200rpx;
} */

.list_item .list_item_date {
    width: 40%;
    font-size: 30rpx;
    text-align: left;
}
.list_item .list_item_time {
    width: 17%;
    font-size: 35rpx;
    text-align: right;
}
.list_item .list_item_text {
    width: 43%;
    text-align: right;
}
.start {
    width: 280rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    margin: 40rpx auto;
    border: 2rpx solid #e7624f;
    color: #e7624f;
    border-radius: 20rpx;
    position: absolute;
    bottom: 125rpx;
    left: 235rpx;
}
.start2 {
    width: 280rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    margin: 40rpx auto;
    border: 2rpx solid #e7624f;
    color: #e7624f;
    border-radius: 20rpx;
    position: absolute;
    bottom: 0rpx;
    left: 235rpx;
}
.nav {
    display: flex;
    justify-content: space-around;
    padding: 20rpx;
    background-color: white;
    font-size: 30rpx;
}
.nav-switch-style {
    color: #e7624f;
}
.ec_page .ec_box1 {
    height: 800rpx;
    width: 100%;
}
.ec_page .ec_box2 {
    height: 800rpx;
    width: 100%;
}
/* ec-canvas {
    width: 800rpx;
    height: 800rpx;
    background-color: #E7624F;
  } */
@media (prefers-color-scheme: dark) {
    .sum .sum_item .sum_item_val,
    .active,
    .nav-switch-style {
        filter: invert(1) !important;
        color: rgb(172, 211, 254);
    }
}
</style>
