<template>
    <view>
        <!-- 导航条 -->
        <view class="nav">
            <view @tap="navSwitch" data-index="0" :class="navState == 0 ? 'nav-switch-style' : ''">页面一</view>
            <view @tap="navSwitch" data-index="1" :class="navState == 1 ? 'nav-switch-style' : ''">页面二</view>
            <view @tap="navSwitch" data-index="2" :class="navState == 2 ? 'nav-switch-style' : ''">页面三</view>
        </view>
        <!-- 不可滑动页 -->
        <view>
            <view v-if="navState == 0" class="style-default">
                <!-- <ec-canvas type="2d" id="mychart-dom-pie" canvas-id="mychart-pie" ec="{{ ec }}"></ec-canvas> -->
            </view>
            <view v-else-if="navState == 1" class="style-default">
                <!-- <ec-canvas type="2d" id="mychart-dom-multi-bar" canvas-id="mychart-multi-bar" ec="{{ ecBar }}"></ec-canvas> -->
            </view>
            <view v-else-if="navState == 2" class="style-default">3</view>
        </view>
        <!-- 滑动页 -->
        <swiper @change="bindchange" :current="navState" class="box" duration="500">
            <swiper-item :style="'width: ' + canvas_width + 'px;height: ' + (canvas_width + 30) + 'px;'">
                <view class="style-roll">
                    <ec-canvas type="2d" id="mychart-dom-pie" canvas-id="mychart-pie" :ec="ec"></ec-canvas>
                    <text>左右可滑动1</text>
                </view>
            </swiper-item>

            <swiper-item :style="'width: ' + canvas_width + 'px;height: ' + (canvas_width + 30) + 'px;'">
                <view class="style-roll">
                    <ec-canvas type="2d" id="mychart-dom-multi-bar" canvas-id="mychart-multi-bar" :ec="ecBar"></ec-canvas>
                    <text>左右可滑动2</text>
                </view>
            </swiper-item>

            <swiper-item>
                <view class="style-roll">
                    <text>左右可滑动3</text>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
import ecCanvas from '../ec-canvas/ec-canvas';
import * as echarts from '../ec-canvas/echarts';

function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);
    var option = {
        backgroundColor: '',
        series: [
            {
                label: {
                    normal: {
                        fontSize: 14
                    }
                },
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['20%', '40%'],
                data: [
                    {
                        value: 55,
                        name: '北京'
                    },
                    {
                        value: 20,
                        name: '武汉'
                    },
                    {
                        value: 10,
                        name: '杭州'
                    },
                    {
                        value: 20,
                        name: '广州'
                    },
                    {
                        value: 38,
                        name: '上海'
                    }
                ]
            }
        ]
    };
    chart.setOption(option);
    return chart;
}

function getBarOption() {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['热度', '正面', '负面']
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 15,
            top: 40,
            containLabel: true
        },
        xAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#999'
                    }
                },
                axisLabel: {
                    color: '#666'
                }
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: {
                    show: false
                },
                data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
                axisLine: {
                    lineStyle: {
                        color: '#999'
                    }
                },
                axisLabel: {
                    color: '#666'
                }
            }
        ],
        series: [
            {
                name: '热度',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: [300, 270, 340, 344, 300, 320, 310]
            },
            {
                name: '正面',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true
                    }
                },
                data: [120, 102, 141, 174, 190, 250, 220]
            },
            {
                name: '负面',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'left'
                    }
                },
                data: [-20, -32, -21, -34, -90, -130, -110]
            }
        ]
    };
}

export default {
    components: {
        ecCanvas
    },
    data() {
        return {
            ec: {
                onInit: initChart
            },

            ecBar: {
                onInit: function (canvas, width, height, dpr) {
                    const barChart = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(barChart);
                    barChart.setOption(getBarOption());
                    return barChart;
                }
            },

            //导航状态
            navState: 0,

            canvas_width: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    methods: {
        //监听滑块
        bindchange(e) {
            console.log(e.detail.current);
            let index = e.detail.current;
            this.setData({
                navState: index
            });
        },

        //点击导航
        navSwitch: function (e) {
            //console.log(e.currentTarget.dataset)
            let index = e.currentTarget.dataset.index;
            this.setData({
                navState: index
            });
        }
    }
};
</script>
<style>
.nav {
    display: flex;
    justify-content: space-around;
    padding: 20rpx;
    background-color: rgb(129, 241, 55);
    font-size: 30rpx;
}
.nav-switch-style {
    color: snow;
}
.style-default {
    background-color: rgb(247, 229, 130);
    text-align: center;
    height: 500rpx;
    width: 100%;
}
.box {
    height: 1200rpx;
    width: 100%;
}
.style-roll {
    background-color: rgb(130, 177, 247);
    text-align: center;
    height: 800rpx;
    width: 100%;
    overflow-x: scroll;
}
.textbox {
    height: 90rpx;
    width: 100%;
    background-color: red;
}
.style-roll .swiperbox {
    height: 100%;
    width: 100%;
}
.style-roll .swiperbox2 {
    height: 100%;
    width: 100%;
}
</style>
