<template>
    <!-- 新界面 1 -->
    <!-- 主页 -->
    <!-- <view class="bg" hidden="{{clockshow}}">
   <view class="backto" bindtap="backto">返回</view> -->
    <!-- 上部分背景图片35.3% -->
    <!-- <view class="bgimage"></view>
   <view class="nav-head1">
       <view class="img-button feedback-btn" bindtap="statistics">
       <image src="../../../images/tomato/tongji.png"></image>
       </view>
    </view>
    <view class="nav-head2">
       <view class="img-button feedback-btn" bindtap="rank">
       <image src="../../../images/tomato/rank.png"></image>
       </view>
    </view> -->
    <!-- 下部分选择任务 -->
    <!-- <view class="taskbox"> -->
    <!-- 时间选择 -->
    <!-- <view class="taskbox_choice_time">
         <image src="../../testdaka/images/tishi.png"></image>
         <slider class="taskbox_choice_time_slider" min="1" max="120" show-value activeColor="#96cddd"
      backgroundColor="#e5f2f6" value="{{time}}" bindchange="slideChange" block-color="#98ccde"></slider>
         
      </view>
      <view class="taskbox_text">在接下来的{{time}}分钟内，您将专注做这件事</view> -->
    <!-- 选择任务 -->
    <!-- <view class="taskbox_choice_time_task_blue" wx:key="cate" 
      bindtap="clickCate" data-index="{{index}}" wx:for="{{cateArr}}">
         <view class="taskbox_choice_time_task_leftbox">
            <view class="taskbox_choice_time_task_leftbox_icon">
               <image src="../../../images/tomato/{{item.icon}}.png"></image>
            </view>
            <view class="{{index == cateActive ? 'taskbox_choice_time_task_leftbox_icontextchoice' : 'taskbox_choice_time_task_leftbox_icontext'}}"><view>{{item.text}}</view></view>
         </view>
         <view class="taskbox_choice_time_task_rightbox">
            <image src="{{item.blue?'../../testdaka/images/blue.png':'../../testdaka/images/yellow.png'}}" bindtap="start">
               <view class="taskbox_choice_time_task_rightbox_text">开始</view>
            </image>
         </view>
      </view>
   </view>
</view> -->

    <!-- 新界面 2 -->
    <view :class="'timer ' + (isRuning ? 'timer--runing' : '')">
        <view class="topbox">
            <view class="topbox_topbar" :style="'height: ' + statusBarHeight + 'px;width: 100%;'"></view>
            <view class="topbox_bar" :style="'height: ' + lineHeight + 'px;'">
                <view :class="'topbox_bar_picker ' + (pickershow ? 'picker_bar' : '')">
                    <view @tap="clickpicker">{{ taskshow }}</view>
                    <view class="topbox_bar_picker_sanjiao" @tap="clickpicker"></view>
                    <view class="topbox_bar_picker_box">
                        <view class="topbox_bar_picker_box_data" @tap="pickerdata" :data-task="item.name" v-for="(item, index) in task" :key="index">{{ item.name }}</view>
                    </view>
                </view>
                <image src="/static/pages/testdaka/images/log.png" @tap="statistics"></image>
                <image src="/static/pages/testdaka/images/rank.png" @tap="rank"></image>
            </view>
            <view class="topbox_tips">
                <view style="margin-top: 10rpx; text-align: center; color: white; font-size: 26rpx">请滑动选择时间： {{ time }}分钟</view>
                <slider
                    class="topbox_tips_slider"
                    min="1"
                    max="120"
                    activeColor="#96cddd"
                    backgroundColor="#e5f2f6"
                    :value="time"
                    @change="slideChange"
                    block-color="#98ccde"
                ></slider>
                <view style="width: 80%; color: white; font-size: 26rpx; margin-top: 20rpx">Tips:</view>
                <view style="width: 80%; color: white; font-size: 26rpx">点击左上角可以切换番茄任务</view>
            </view>
            <view class="topbox_btn">
                <view class="topbox_btn_start" @tap="start">{{ isRuning ? '放弃' : '开始计时' }}</view>
                <view v-if="pauseShow" @tap="pause" class="topbox_btn_stop">暂停</view>
                <view v-if="continueCancelShow" @tap="continueFun" class="topbox_btn_ct">继续</view>
                <view v-if="okShow" @tap="ok" class="topbox_btn_complete">完成</view>
            </view>
        </view>
        <view :class="'bottombox ' + (isRuning ? 'bottomboxruning' : '') + ' '">
            <view class="bottombox_showtask">{{ taskshow }}</view>
            <view class="bottombox_clock">
                <canvas type="2d" id="bottombox_clock_bg" class="bottombox_clock_bg"></canvas>
                <canvas type="2d" id="bottombox_clock_active" class="bottombox_clock_active"></canvas>
                <view class="bottombox_clock_text" style="color: #5879fa">{{ timeStr }}</view>
            </view>
        </view>
    </view>
</template>

<script>
const util = require('../../../utils/util.js');

const app = getApp();
export default {
    data() {
        return {
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            logsa: {},

            //放云端的logs
            clockshow: false,

            clockHeight: 0,
            time: '5',
            mTime: 300000,
            timeStr: '05:00',
            timer: null,
            rate: '',
            taskshow: '番茄时钟',

            task: [
                {
                    name: '工作'
                },
                {
                    name: '学习'
                },
                {
                    name: '休息'
                },
                {
                    name: '睡觉'
                },
                {
                    name: '写bug'
                },
                {
                    name: '修bug'
                }
            ],

            cateActive: '0',
            okShow: false,
            pauseShow: false,
            continueCancelShow: false,
            userInfo: {},
            hasUserInfo: false,
            isRuning: false,
            pickershow: false,
            storageInfo: '',
            ctx: '',
            canvas: '',
            wpx: '',
            ctx2: '',
            canvas2: ''
        };
    }, //监听加载页
    onLoad: function () {
        console.log('w', uni.getSystemInfoSync().windowWidth);
        console.log('h', uni.getSystemInfoSync().windowHeight);
        var res = uni.getSystemInfoSync(); //获取设备的信息

        var rate = 750 / res.windowWidth; //console.log(rate);

        this.setData({
            rate: rate,
            clockHeight: rate * res.windowHeight
        });
        let that = this;
        uni.getStorage({
            key: 'args',

            success(res) {
                that.setData({
                    storageInfo: res.data
                });
            },

            fail(err) {
                console.log('失败失败失败');
            }
        });
        this.init_canvas();
        this.init_canvas2();
    },
    methods: {
        clickpicker() {
            console.log('clickpicker');
            let pickershow = this.pickershow;
            this.setData({
                pickershow: !pickershow
            });
        },

        pickerdata(e) {
            console.log(e);
            this.setData({
                taskshow: e.currentTarget.dataset.task,
                pickershow: false
            });
        },

        init_canvas() {
            let wpx = uni.getSystemInfoSync().windowWidth / 375;
            let iconurl = uni.getStorageSync('args').iconUrl;
            const query = uni.createSelectorQuery();
            query
                .select('#bottombox_clock_bg')
                .fields({
                    node: true,
                    size: true
                })
                .exec((res) => {
                    console.log(res);
                    const canvas = res[0].node;
                    const ctx = canvas.getContext('2d');
                    const dpr = uni.getSystemInfoSync().pixelRatio;
                    canvas.width = res[0].width * dpr;
                    canvas.height = res[0].height * dpr;
                    ctx.scale(dpr, dpr);
                    this.setData({
                        ctx,
                        canvas,
                        wpx
                    });
                    this.new_drawbg(ctx);
                });
        },

        init_canvas2() {
            let wpx = uni.getSystemInfoSync().windowWidth / 375;
            const query = uni.createSelectorQuery();
            query
                .select('#bottombox_clock_active')
                .fields({
                    node: true,
                    size: true
                })
                .exec((res) => {
                    const canvas2 = res[0].node;
                    const ctx2 = canvas2.getContext('2d');
                    const dpr = uni.getSystemInfoSync().pixelRatio;
                    canvas2.width = res[0].width * dpr;
                    canvas2.height = res[0].height * dpr;
                    ctx2.scale(dpr, dpr);
                    this.setData({
                        ctx2,
                        canvas2
                    });
                });
        },

        //更新开始键点击事件
        start: function () {
            console.log('start');
            let ctx2 = this.ctx2;
            let isRuning = this.isRuning;

            if (!isRuning) {
                //开始计时
                this.setData({
                    pauseShow: true,
                    isRuning: true,
                    mTime: this.time * 60 * 1000,
                    timeStr: parseInt(this.time) >= 10 ? this.time + ':00' : '0' + this.time + ':00'
                });
                this.drawActive();
            } else {
                //放弃
                ctx2.clearRect(0, 0, 600, 600);
                clearInterval(this.timer);
                this.setData({
                    isRuning: false,
                    pauseShow: false,
                    continueCancelShow: false,
                    okShow: false,
                    mTime: this.time * 60 * 1000,
                    timeStr: parseInt(this.time) >= 10 ? this.time + ':00' : '0' + this.time + ':00'
                });
            }
        },

        //动态画圆
        drawActive: function () {
            let ctx2 = this.ctx2;
            var that = this; //此this指向该页的page

            var timer = setInterval(function () {
                var angle = 1.5 + (2 * (that.time * 60 * 1000 - that.mTime)) / (that.time * 60 * 1000);
                var currentTime = that.mTime - 100;
                that.setData({
                    mTime: currentTime
                });

                if (angle < 3.5) {
                    if (currentTime % 1000 == 0) {
                        var timeStr1 = currentTime / 1000; //s

                        var timeStr2 = parseInt(timeStr1 / 60); //得到一个整的分钟数

                        var timeStr3 = timeStr1 - timeStr2 * 60 >= 10 ? timeStr1 - timeStr2 * 60 : '0' + (timeStr1 - timeStr2 * 60);
                        var timeStr2 = timeStr2 >= 10 ? timeStr2 : '0' + timeStr2;
                        that.setData({
                            timeStr: timeStr2 + ':' + timeStr3
                        });
                    }

                    var lineWidth = 13 / that.rate;
                    ctx2.lineWidth = Number(lineWidth);
                    ctx2.strokeStyle = '#5879fa';
                    ctx2.lineCap = 'round'; //形状

                    ctx2.beginPath(); //开新路径

                    ctx2.arc(600 / that.rate / 2, 600 / that.rate / 2, 600 / that.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false); //(圆心x，y，度数0，到2*math.PI,逆时针false)  一点一点得画

                    ctx2.stroke();
                } else {
                    uni.showLoading({
                        title: '上传数据中'
                    });
                    let logs = [
                        {
                            date: util.formatTime(new Date()),
                            cate: that.taskshow,
                            // Number(_this.data.cateActive),
                            time: Number(that.time)
                        }
                    ];
                    let date = util.formatTime(new Date());
                    let cate = that.taskshow; // _this.data.cateActive

                    let time = that.time;
                    let storageInfo = that.storageInfo;
                    let username = String(storageInfo.username);
                    wx.cloud
                        .database()
                        .collection('totaltime')
                        .where({
                            username: username
                        })
                        .get()
                        .then((res) => {
                            let name = storageInfo.nickName;
                            let touxiangurl = storageInfo.iconUrl;
                            let len = res.data.length;
                            let totaltime = wx.cloud.database().collection('totaltime');
                            let totalTime = 0; // let logs=_this.data.logsa

                            const _ = wx.cloud.database().command;

                            if (len == 0) {
                                //用学号username判断用户在数据库有没有数据
                                console.log('123');
                                totaltime
                                    .add({
                                        data: {
                                            totalTime,
                                            logs: logs,
                                            name,
                                            touxiangurl,
                                            username: String(username)
                                        }
                                    })
                                    .then((res) => {
                                        console.log(res);
                                        uni.hideLoading();
                                    });
                            } else {
                                totaltime
                                    .where({
                                        username: username
                                    })
                                    .update({
                                        data: {
                                            logs: _.push({
                                                date: date,
                                                cate: cate,
                                                time: that.time
                                            })
                                        }
                                    })
                                    .then((res) => {
                                        console.log('添加成功');
                                    });
                            }
                        });
                    that.setData({
                        timeStr: '00:00',
                        okShow: true,
                        pauseShow: false,
                        continueCancelShow: false
                    });
                    clearInterval(timer);
                    console.log(logs);
                    uni.hideLoading();
                }
            }, 100);
            that.setData({
                timer: timer
            });
        },

        new_drawbg(ctx) {
            var lineWidth = 13 / this.rate;
            ctx.lineWidth = Number(lineWidth);
            ctx.strokeStyle = '#d0dafd';
            ctx.lineCap = 'round'; //形状

            ctx.beginPath(); //开新路径

            ctx.arc(600 / this.rate / 2, 600 / this.rate / 2, 600 / this.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false); //(圆心x，y，度数0，到2*math.PI,逆时针false)

            ctx.stroke();
        },

        //更新滑动条时间
        slideChange: function (e) {
            this.setData({
                time: e.detail.value
            });
            this.setData({
                mTime: this.time * 60 * 1000,
                timeStr: parseInt(this.time) >= 10 ? this.time + ':00' : '0' + this.time + ':00'
            });
        },

        //更新点击选择做的事件获取index
        clickCate: function (e) {
            this.setData({
                cateActive: e.currentTarget.dataset.index
            });
            console.log(e);
        },

        //暂停
        pause: function () {
            clearInterval(this.timer);
            this.setData({
                pauseShow: false,
                //暂停框
                continueCancelShow: true,
                //继续放弃框
                okShow: false //返回框
            });
        },

        continueFun: function () {
            this.drawActive();
            this.setData({
                pauseShow: true,
                continueCancelShow: false,
                okShow: false
            });
        },

        ok: function () {
            let ctx2 = this.ctx2;
            ctx2.clearRect(0, 0, 600, 600);
            clearInterval(this.timer);
            this.setData({
                isRuning: false,
                pauseShow: false,
                continueCancelShow: false,
                okShow: false,
                clockshow: false
            });
        },

        // 事件处理函数
        bindViewTap() {
            uni.navigateTo({
                url: '../logs/logs'
            });
        },

        statistics: function () {
            uni.navigateTo({
                url: '../logs/logs'
            });
        },

        rank: function () {
            uni.navigateTo({
                url: '../rank/rank'
            });
        },

        text() {
            uni.navigateTo({
                url: '../text/text'
            });
        },

        changeType: function (e) {
            let username = uni.getStorageSync('args').username;
            wx.cloud
                .database()
                .collection('totaltime')
                .where({
                    username: username
                })
                .get()
                .then((res) => {
                    let logs = res.data[0].logs; //console.log(this.data.list)
                });
        },

        res(res) {
            console.log(res);
        },

        backto() {
            uni.navigateBack({
                delta: 1
            });
        }
    }
};
</script>
<style>
/**index.wxss**/

/* 新样式 1 */
.bg {
    position: relative;
    height: 100vh;
}
.backto {
    position: fixed;
    left: 20rpx;
    top: 60rpx;
    background-color: gray;
    width: 100rpx;
    width: 100rpx;
    z-index: 999;
}
.bgimage {
    height: 35.3%;
    background-image: url('https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E6%8F%92%E7%94%BB-%E7%99%BD%E5%A4%A9_%E7%94%BB%E6%9D%BF%201.png?sign=0889ed3e3511e85d4b9e7da22c8ec589&t=1647320383');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.taskbox {
    position: absolute;
    top: 400rpx;
    border-radius: 80rpx;
    background-color: #ffffff;
    width: 100%;
    height: 1300rpx;
    z-index: 99;
}
.taskbox_choice_time {
    /* background-color: gray; */
    width: 100%;
    height: 100rpx;
    margin-top: 60rpx;
    border-radius: 100rpx;
}
.taskbox_choice_time > image {
    float: right;
    width: 20%;
    height: 50rpx;
    width: 50rpx;
    margin: 20rpx 40rpx 20rpx 15rpx;
}
.taskbox_choice_time_slider {
    float: right;
    width: 80%;
    margin: 20rpx 0 20rpx 40rpx;
    /* background-color: black; */
}
wx-slider .wx-slider-handle-wrapper {
    height: 30rpx;
}
.taskbox_text {
    width: auto;
    height: auto;
    text-align: center;
    color: gray;
    font-size: 28rpx;
    margin-bottom: 60rpx;
}
.taskbox_choice_time_task_blue:nth-child(1n + 0) {
    margin: 30rpx auto;
    width: 700rpx;
    height: 150rpx;
    background-color: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0 0 20rpx 8rpx #e5f2f6;
}
.taskbox_choice_time_task_blue:nth-child(2n + 0) {
    margin: 30rpx auto;
    width: 700rpx;
    height: 150rpx;
    background-color: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0 0 20rpx 8rpx #fff4df;
}
.taskbox_choice_time_task_yellow {
    margin: 30rpx auto;
    width: 700rpx;
    height: 150rpx;
    background-color: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0 0 20rpx 8rpx #fff4df;
}
.taskbox_choice_time_task_leftbox {
    width: 70%;
    height: 100%;
    /* background-color: gray; */
    float: left;
}
.taskbox_choice_time_task_rightbox {
    width: 30%;
    height: 100%;
    /* background-color: pink; */
    float: left;
}
.taskbox_choice_time_task_rightbox > image:nth-child(1n + 0) {
    position: relative;
    /* background-color: yellow; */
    width: 75%;
    height: 90%;
    margin: 8rpx 0 0 50rpx;
}
.taskbox_choice_time_task_rightbox > image:nth-child(2n + 0) {
    position: relative;
    /* background-color: yellow; */
    width: 75%;
    height: 90%;
    margin: 8rpx 0 0 50rpx;
}
.taskbox_choice_time_task_rightbox_text {
    /* background-color: black; */
    position: absolute;
    top: 49rpx;
    right: 55rpx;
    width: auto;
    height: auto;
    color: #ffffff;
    z-index: 99;
    font-size: 28rpx;
    font-weight: 550;
}
.taskbox_choice_time_task_leftbox_icon {
    float: left;
    width: 30%;
    height: 100%;
    /* background-color: yellow; */
}
.taskbox_choice_time_task_leftbox_icon > image {
    width: 30%;
    height: 30%;
    background-color: #fff;
    margin: 55rpx 55rpx;
}
.taskbox_choice_time_task_leftbox_icontext {
    float: left;
    width: 60%;
    height: 100%;
    /* background-color: pink; */
}
.taskbox_choice_time_task_leftbox_icontextchoice {
    float: left;
    width: 60%;
    height: 100%;
    color: #e7624f;
}
.taskbox_choice_time_task_leftbox_icontextchoice,
.taskbox_choice_time_task_leftbox_icontext > view {
    background-color: #fff;
    width: auto;
    height: auto;
    /* text-align: center; */
    margin: 55rpx auto;
    font-weight: 500;
}
/* 新样式 2 */
.topbox {
    height: 40vh;
    width: 100%;
    background: linear-gradient(to bottom, #5677fc 45%, rgb(78, 78, 78));
    /* #5677fc; */
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    position: relative;
    transition: all 0.3s;
    border-radius: 0 0 10rpx 10rpx;
}
.topbox_bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    /* background:#fff; */
    align-items: center;
    color: #fff;
}
.topbox_bar > image {
    width: 50rpx;
    height: 50rpx;
    margin-right: 20rpx;
    transform: rotate(180deg);
    filter: invert(1) !important;
}
.topbox_bar_picker {
    margin-left: 20rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
}
.topbox_bar_picker_box {
    height: 0;
    position: absolute;
    left: -10rpx;
    top: 50rpx;
    width: 30vw;
    transition: all 0.5s;
    z-index: 99;
    overflow: hidden;
}
.topbox_bar_picker_box_data {
    height: 0;
    margin-top: 10rpx;
    padding-left: 15rpx;
    background: #fff;
    color: black;
    border-radius: 10rpx;
    transition: all 0.5s;
}
.picker_bar .topbox_bar_picker_box {
    height: auto;
    transition: all 0.5s;
}
.picker_bar .topbox_bar_picker_box_data {
    height: 50rpx;
    transition: all 0.5s;
}
.topbox_bar_picker_sanjiao {
    margin: 15rpx 20rpx 0 20rpx;
    width: 0px;
    height: 0px;
    border-width: 11rpx;
    border-top: 25rpx;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
}
.topbox_tips {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.topbox_tips_slider {
    width: 80%;
}
.topbox_btn {
    width: 100%;
    position: absolute;
    bottom: -40rpx;
    /* height: 80rpx; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.topbox_btn_start {
    width: 250rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    background: #5677fc;
    border-radius: 40rpx;
    color: white;
}
.bottombox {
    height: 60vh;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    transition: all 0.5s;
}
.bottombox_showtask {
    width: 500rpx;
    height: 1rpx;
    overflow: hidden;
}
.bottomboxruning .bottombox_showtask {
    text-align: center;
    width: 300rpx;
    background: #d0dafd;
    line-height: 80rpx;
    border-radius: 40rpx;
    height: 80rpx;
    transition: all 0.7s;
}

.bottombox_clock {
    flex: 1;
    width: 600rpx;
    height: 600rpx;
    margin: 7vh auto 0 auto;
    position: relative;
}
.bottomboxruning .bottombox_clock {
    margin: 3vh auto 0 auto;
}
.bottombox_clock_bg,
.bottombox_clock_active {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 600rpx;
    height: 600rpx;
}
.bottombox_clock_text {
    line-height: 60rpx;
    font-size: 90rpx;
    text-align: center;
    position: absolute;
    left: 190rpx;
    top: 250rpx;
}
.timer {
    height: calc(100% - 102rpx);
    transition: all 0.7s;
    display: flex;
    flex-direction: column;
}
.timer--runing .topbox {
    height: 10vh;
    transition: all 0.5s;
    background: white;
}
.timer--runing .bottombox {
    height: 90vh;
    transition: all 0.5s;
}
.timer--runing .topbox_bar {
    display: none;
}
.timer--runing .topbox_tips {
    display: none;
}
.timer--runing .topbox_topbar {
    background: white;
}
.timer--runing .topbox_btn {
    bottom: -1000rpx;
    z-index: 99;
}
.timer--runing .topbox_btn_start,
.timer--runing .topbox_btn_stop,
.timer--runing .topbox_btn_ct,
.timer--runing .topbox_btn_complete {
    margin-top: 4vh;
    width: 300rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    background: #5677fc;
    border-radius: 40rpx;
    color: white;
    transition: all 0.7s;
}
</style>
