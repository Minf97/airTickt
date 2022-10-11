<template>
    <view>
        <!-- index.wxml -->
        <view
            class="head"
            :style="
                '  background-image: ' +
                (dark == 'dark' ? 'linear-gradient( #fff , #fff) ' : theme ? 'linear-gradient( #b4e6fb , #b6e7fb) ' : 'linear-gradient( #f6f6f6 , #f6f6f6)') +
                ';'
            "
        >
            <!-- 状态栏 -->
            <view :style="'  height: ' + statusBarHeight + 'px;'"></view>

            <!-- 导航栏 -->
            <view :style="'width:750rpx; height: ' + lineHeight + 'px;  justify-content: center;flex-direction: row; display: flex; align-items: center;'">
                <switch :checked="theme" @change="switch1Change" :color="dark == 'dark' ? '#000' : '#88d5f3'" style="position: absolute; left: 20rpx; font-size: 30rpx"></switch>
                <view style="height: 18rpx"></view>

                <text class="weSchool">We校园</text>
            </view>
        </view>
        <scroll-view @scrolltoupper="onPullDownRefresh" upper-threshold="1" :scroll-y="true" :style="'height: ' + windowHeight + 'px;'" class="container">
            <view
                class="mask"
                :style="
                    ' height: ' +
                    (statusBarHeight + lineHeight + 320) +
                    'px; ' +
                    (dark == 'dark' ? 'linear-gradient( #fff , #fff) ' : theme ? '  background-image: linear-gradient( #a5e6ff , #a4dff6); ' : '')
                "
            ></view>
            <view
                class="mask2"
                :style="
                    'top: ' +
                    (statusBarHeight + lineHeight + 320) +
                    'px; ' +
                    (dark == 'dark' ? 'linear-gradient( #fff , #fff) ' : theme ? '  background-image: linear-gradient(  #a4dff6, #f6f6f6);' : '')
                "
            ></view>

            <view class="adContainer" :style="'padding-top: ' + (statusBarHeight + lineHeight) + 'px;'">
                <ad unit-id="adunit-f9948326373ca9ac" @close="adClose" v-if="ad"></ad>
                <image @tap="adGo" v-else-if="otherAd.adSrc" :src="otherAd.adSrc" :style="'width: 100%; height: ' + otherAd.adHeight + 'rpx;'"></image>
            </view>

            <!-- 弹窗 -->
            <view
                class="dialogAdd"
                :style="
                    ' display: ' +
                    (activityDialog.status == 0 ? 'flex' : 'none') +
                    '; background-image: url(' +
                    activityDialog.dialogAdd_bgc +
                    ');width: ' +
                    activityDialog.width +
                    'rpx;height: ' +
                    activityDialog.height +
                    'rpx;'
                "
                :animation="slideupshow"
            >
                <!-- 点击参与按钮 bindtap:activity 在动态JS里 -->
                <view
                    class="dialogAdd_btn"
                    :style="
                        'background-image: url(' +
                        activityDialog.dialogAdd_btn.picUrl +
                        ');width: ' +
                        activityDialog.dialogAdd_btn.width +
                        'rpx;height: ' +
                        activityDialog.dialogAdd_btn.height +
                        'rpx;top: ' +
                        activityDialog.dialogAdd_btn.top * 1.82 +
                        'rpx;left: ' +
                        activityDialog.dialogAdd_btn.left * 1.82 +
                        'rpx;'
                    "
                    @tap="activity"
                ></view>
                <!-- 点击关闭 bindtap:closeDialogAdd 在动态JS里 -->
                <view
                    class="dialogAdd_close"
                    :style="
                        'background-image: url(' +
                        activityDialog.dialogAdd_close.picUrl +
                        '); width: ' +
                        activityDialog.dialogAdd_close.width +
                        'rpx; height: ' +
                        activityDialog.dialogAdd_close.height +
                        'rpx; top: ' +
                        activityDialog.dialogAdd_close.top +
                        'rpx;left: ' +
                        activityDialog.dialogAdd_close.left +
                        'rpx;'
                    "
                    @tap="closeDialogAdd"
                ></view>
            </view>

            <view style="margin-left: 20rpx; margin-top: 10rpx">
                <iconBar :iconList="iconList"></iconBar>
            </view>
            <!-- 通知拦 -->
            <view v-if="inform" style="margin-top: 17rpx">
                <inform :inform="inform"></inform>
            </view>

            <!-- 上课提醒 -->
            <view class="wx-remind" style="margin-top: 17rpx">
                <view class="wx-remind-header">
                    <view class="wx-remind-title">
                        <text>上课提醒</text>
                        <text>{{ time.month + 1 }}-{{ time.date }} 周{{ time.day != 0 ? time.day : 7 }}</text>
                    </view>
                    <view class="wx-remind-detail" @tap="setClass">
                        <text>课程表</text>
                    </view>
                </view>
                <view class="wx-remind-body margin-top">
                    <view class="wx-remind-class margin-top:100rpx;" @tap="setClass" v-for="(item, index) in course" :key="item.id">
                        <view :class="'wx-class-time color_' + (index % 2) + ' background-color_' + (index % 2)">
                            <text>{{ item.day }}</text>
                            <text>{{ item.time }}</text>
                        </view>

                        <view :class="'wx-class-title color_' + (index % 2) + ' background-color_' + (index % 2)">
                            <text>{{ item.name }}</text>
                            <text>
                                <text class="iconfont icon-dingwei"></text>
                                {{ item.site }}
                            </text>
                        </view>
                    </view>
                    <view v-if="msg" class="wx-isclass">
                        <text>{{ msg }}</text>
                    </view>
                </view>
            </view>

            <!-- 其他功能 -->
            <!-- <view class="other">
    <view class="other_daka_topbox">
      <view class="other_daka_topbox_left">
        <view class="other_daka_topbox_left_title">
          <view class="other_daka_topbox_left_title_text">每日打卡</view>
        </view>
        <view class="other_daka_topbox_left_dakadata">
          <scroll-view scroll-y="true" class="other_daka_topbox_left_dakadata_scroll_view">
            <view class="other_daka_topbox_left_dakadata_task" wx:for="{{dakaArr}}">
              <image class="other_daka_topbox_left_dakadata_task_yuan" src="../testdaka/images/white_ring.png"></image>
              <view class="other_daka_topbox_left_dakadata_task_text">{{item.task_name}}</view>
            </view>
          </scroll-view>
        </view>
      </view>
      <view class="other_daka_topbox_right">
        <view class="other_daka_topbox_right_dakaimage">
          <view class="small_ring"></view>
          <view class="outer_ring"></view>
          <view class="inner_circle"></view>
          <view class="other_daka_topbox_right_dakaday">本周已打卡0天</view>
          <image class="image_pic" src="{{modle_display}}" mode = "widthFix"></image>
        </view>
      </view>
    </view>
    
    <view class="other_daka_bottombox">
      <view class="other_daka_bottombox_left">今日有xxx人打卡</view>
      <view class="other_daka_bottombox_center" bindtap="daka">去打卡</view>
      <image class="other_daka_bottombox_right" bindtap="daka" src="../testdaka/images/turn_right.png"></image>
    </view>
  </view> -->
            <!-- 原代码 -->
            <!-- <view class="countdown" style="border-color:{{theme ?' rgba(135,206,235, 0.13)': '#fcfbfb'}};">

      <view class="wx-remind-mask">
        <view class="otherkp">
          <view>
            <view class="kpt">xx<text style="margin-top:50rpx; font-size: 30rpx">天</text></view>
          </view>
        </view>
        <view class="zt">
          （点进设置倒数日哟）
          <view style="font-size: 24rpx; color: #a9a9a9; margin-top:40rpx">
            2022-0x-0x
          </view>
          <view style="font-size: 24rpx;color: #a9a9a9; ">
            星期六
          </view>
        </view>
      </view>
    </view> -->
            <!-- <view class="countdown" style="border-color:{{theme?' rgba(135,206,235, 0.13)': 
    '#fcfbfb'}};">
      <view class="wx-remind-mask">
        <view class="zt">
          打卡
          <view style="font-size: 24rpx; color: #a9a9a9; margin-top:10rpx">
            今日任务（dsd行
            <text style="color: #35e6f3;"> 未打卡</text>
          </view>
          <view style="font-size: 24rpx; color: #a9a9a9; margin-top:10rpx">
            今日任务倒时（撒打... 
            <text style="color: #35e6f3;"> 未计时</text>
          </view>
          <view style="font-size: 24rpx; color: #a9a9a9; margin-top:10rpx">
            今日任务倒时（好是... 
            <text style="color: #4afa61;"> 20分钟</text>
          </view>
        </view>
      </view> 
    </view> -->
        </scroll-view>
    </view>
</template>

<script>
import iconBar from '@/components/iconBar/iconBar';
import inform from '@/components/inform/inform';
// index.js
const util = require('../../utils/util'); // 获取应用实例

const app = getApp();
export default {
    components: {
        iconBar,
        inform
    },
    data() {
        return {
            modle: [
                'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%83%8F%E7%B4%A0%E7%94%BB%E4%BA%BA%E7%89%A92.png?sign=312a73ffb6956314699bb6dd723524b6&t=1647683154',
                'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%83%8F%E7%B4%A0%E7%94%BB%E4%BA%BA%E7%89%A94.png?sign=a60a5b2426a09e42f4511405b033cacb&t=1647683175',
                'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%83%8F%E7%B4%A0%E7%94%BB%E4%BA%BA%E7%89%A96.png?sign=fcca8d7a1f445cb3882ac003423b1f15&t=1647683193',
                'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%83%8F%E7%B4%A0%E7%94%BB%E4%BA%BA%E7%89%A95.png?sign=95ee702d75515ef883087580402b42cc&t=1647683205'
            ],
            modle_display: '',
            dakaArr: [],
            theme: true,
            dark: uni.getSystemInfoSync().theme,

            time: {
                date: new Date().getDate(),
                month: new Date().getMonth(),
                day: new Date().getDay()
            },

            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            windowHeight: getApp().globalData.windowHeight,
            ad: true,
            adSrc: '',
            adHeight: '280',

            otherAd: {
                adSrc: '',
                adHeight: ''
            },

            msg: '',

            activityDialog: {
                status: 0,
                dialogAdd_bgc: '',
                width: '',
                height: '',

                dialogAdd_btn: {
                    picUrl: '',
                    width: '',
                    height: '',
                    top: 0,
                    left: 0
                },

                dialogAdd_close: {
                    picUrl: '',
                    width: '',
                    height: '',
                    top: '',
                    left: ''
                }
            },

            slideupshow: '',
            iconList: [],
            inform: [],
            course: []
        };
    },
    onPullDownRefresh() {
        uni.showNavigationBarLoading(); //在标题栏中显示加载

        console.log('下拉刷新');
        var that = this;
        setTimeout(function () {
            var args = uni.getStorageSync('args');

            if (args) {
                try {
                    var onload = app.globalData.jsRun(args, args.jsCode);
                    onload(that);
                } catch (e) {
                    console.log(e);
                }
            }

            uni.hideNavigationBarLoading(); //完成停止加载

            uni.stopPullDownRefresh(); //停止下拉刷新
        }, 1500);
        console.log('over');
    },
    async onLoad(options) {
        let dakaArr = uni.getStorageSync('dakaArr');
        let num = Math.floor(Math.random() * (this.modle.length - 1));
        let res = this.modle[num];
        this.setData({
            modle_display: res
        });
        var that = this;
        uni.onThemeChange(function (e) {
            that.setData({
                dark: e.theme
            });
        });

        if (uni.getStorageSync('theme') !== undefined) {
            that.setData({
                theme: uni.getStorageSync('theme')
            });
        }

        var args = uni.getStorageSync('args');
        this.setData({
            ad: args.ad,
            otherAd: args.otherAd,
            dakaArr
        });

        if (args && options?.goin !== 'login') {
            try {
                console.log('进入主页兜底');
                var onload = app.globalData.jsRun(args, args.jsCode);
                onload(that, options);
            } catch (e) {
                console.log(e);
            }
        }

        wx.cloud.callFunction({
            name: 'api',
            data: {
                url: 'indexLoading',
                jsVersion: args.jsVersion
            },
            success: (res) => {
                var new_args = res.result;
                console.log('获取到数据');
                new_args = { ...args, ...new_args };

                if (options?.goin == 'login' || !(JSON.stringify(new_args) === JSON.stringify(uni.getStorageSync('args')))) {
                    console.log('进入函数更新');
                    uni.setStorageSync('args', new_args);
                    var onload = app.globalData.jsRun(new_args, new_args.jsCode);

                    try {
                        onload(that, options);
                    } catch (e) {
                        console.log(e);
                        that.setData({
                            msg: '有超级bug，请联系开发查看函数'
                        });
                    }
                }
            },
            fail: (res) => {
                console.log(res);
                uni.showToast({
                    icon: 'none',
                    title: '模版请求错误'
                });
            }
        });
    },
    // onShow() {
    //   console.log("onshow");
    //   let dakaArr=wx.getStorageSync('dakaArr');
    //   if(dakaArr==[]){
    //     this.daka=[{task_name:"无打卡任务",task_isDaka:"false"}]
    //   }
    //   this.setData({
    //     dakaArr
    //   })
    // },
    onShareAppMessage: function (res) {
        return {
            title: 'WE校园'
        };
    },
    onShareTimeline: function (res) {
        return {
            title: 'WE校园'
        };
    },
    methods: {
        switch1Change: function (res) {
            uni.setStorageSync('theme', res.detail.value);
            this.setData({
                theme: res.detail.value
            });
        },

        adClose() {
            console.log('adClose');
            this.setData({
                ad: false
            });
        },

        adGo() {
            var that = this;
            uni.navigateTo({
                url: that.otherAd.adUrl
            });
        },

        daka() {
            uni.navigateTo({
                url: '../testdaka/index/index'
            });
        },

        onPullDownRefresh() {
            console.log('占位：函数 onPullDownRefresh 未声明');
        },

        activity() {
            console.log('占位：函数 activity 未声明');
        },

        closeDialogAdd() {
            console.log('占位：函数 closeDialogAdd 未声明');
        },

        setClass() {
            console.log('占位：函数 setClass 未声明');
        }
    }
};
</script>
<style>
/**index.wxss**/
page {
    background-color: #f6f6f6;
    font-family: Helvetica Neue, Helvetica, sans-serif;
}

.adContainer {
    margin-left: 21rpx;
    width: 94%;
    /* background-color: #f6f6f6; */
}
.head {
    position: fixed;
    z-index: 2;
    /* background-image: linear-gradient(#b5e9fd , #b4e6fb); */
}
.weSchool {
    color: #164870;
}
.kpt {
    height: 130rpx;
    display: flex;
    justify-content: center;
    width: 180rpx;
    font-size: 92rpx;
    color: #c5ddbc;
}
.mask {
    position: absolute;
    width: 100%;
    z-index: -1;
    opacity: 0.8;
    background-color: #f6f6f6;
}
.mask2 {
    position: absolute;
    width: 100%;
    opacity: 0.8;
    height: 500rpx;
    z-index: -1;
    background-color: #f6f6f6;
}
/* 弹窗 */
.dialogAdd {
    position: absolute;
    top: -400px;
    left: 100rpx;
    width: 600rpx;
    height: 800rpx;
    border-radius: 90rpx;
    z-index: 999;
    opacity: 0;
    background-image: url('https://s4.ax1x.com/2021/12/24/Tta1PJ.png');
    background-size: auto 100%;
    background-repeat: no-repeat;
}
.dialogAdd_btn {
    position: absolute;
    z-index: 99999;
    opacity: 1;
    background-size: auto 100%;
    background-repeat: no-repeat;
}
.dialogAdd_close {
    position: absolute;
    opacity: 1;
    background-size: auto 100%;
    background-repeat: no-repeat;
}
/* 弹窗 ↑ */
.wx-remind {
    background-color: rgba(255, 255, 255, 0.7);
    padding: 20rpx 31rpx 50rpx 31rpx;
    border-radius: 20rpx;
    margin-left: 20rpx;
    margin-top: 17rpx;
    width: 650rpx;
}

.wx-remind-header {
    display: flex;
}

.wx-remind-title {
    z-index: 100;
    flex: 1;
}

.wx-remind-title text:nth-child(1) {
    display: block;
    font-size: 32rpx;
    /* padding-bottom:2rpx; */
    color: #5480b1;
}

.wx-remind-title text:nth-child(2) {
    font-size: 28rpx;
    color: #dfe0e2;
}

.wx-remind-detail {
    justify-content: space-between;
    align-items: center;
    display: flex;
}

.wx-remind-detail text {
    padding: 7rpx 10rpx;
    border: 4rpx solid #acebe3;
    color: #acebe3;
    font-size: 30rpx;
    border-radius: 20rpx;
}

.wx-remind-class {
    display: flex;
    margin-top: 15rpx;
    color: #28cbb8;
}

.wx-class-time {
    /* width: 62rpx; */
    padding: 8px 15px;
    border-radius: 20rpx;
    margin-right: 20rpx;
    text-align: center;
    background-color: #e6f9f7;
    font-size: 13px;
}

.wx-class-time text:nth-child(1) {
    display: block;
}

.wx-class-title {
    justify-content: space-between;
    display: flex;
    font-size: 13px;
    align-items: center;
    border-radius: 20rpx;
    flex: 1;
    padding: 0.5px 11px;
    background-color: #e6f9f7;
}

.wx-class-title text:nth-child(1) {
    /* width:320rpx; */
    font-size: 32rpx;
}

.show {
    display: show;
}

.wx-isclass {
    text-align: center;
    font-size: 35rpx;
    color: #1cbbb4;
    margin-top: 30rpx;
}

.color_0 {
    color: #28cbb8;
}

.color_1 {
    color: #ffca43;
}

.background-color_0 {
    background-color: #e6f9f7;
}

.background-color_1 {
    background-color: #fef7e5;
}

.model {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 20%;
    width: 70%;
    height: 60%;
    left: 15%;
    border-radius: 15%;
    background-color: rgb(85, 120, 33);
}
.model_close {
    position: absolute;
    top: 0;
    right: 0;
    width: 50rpx;
    height: 50rpx;
}
.model text:nth-child(1) {
    color: rgb(255, 255, 255);
    font-size: 18px;
    letter-spacing: 1rpx;
    margin-bottom: 20rpx;
}
.model text:nth-last-child(1) {
    color: rgb(255, 255, 255);
    font-size: 10px;
    letter-spacing: 1rpx;
    position: relative;
    top: 8%;
}
.model_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(241, 244, 80);
    height: 70rpx;
    width: 250rpx;
    border-radius: 80rpx;
    font-size: 14px;
    color: rgb(128, 128, 126);
    margin: 25rpx;
}
.model_padding {
    width: 400rpx;
    height: 400rpx;
}
.model_pic {
    position: absolute;
    bottom: 0;
    width: 120%;
    height: 80%;
    /* background-color: rgb(255, 255, 255); */
}

.wx-remind-mask {
    position: absolute;
    height: 70rpx;
    width: 48.7%;
    border-radius: 13rpx;
    z-index: 100;
}
.countdown {
    border-style: solid;
    width: 45.8%;
    margin-right: 15rpx;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20rpx;
    height: 200rpx;
}
.zt {
    font-size: 30rpx;
    margin-left: 20rpx;
    margin-top: 25rpx;
    color: #393939;
}
.otherkp {
    position: absolute;
    margin-left: 170rpx;
    margin-top: 75rpx;
}
.other {
    border-radius: 20rpx;
    margin: 17rpx 20rpx 17rpx 20rpx;
    display: flex;
    flex-direction: column;
    height: 400rpx;
    width: 712rpx;
    background: #a3a3c5;
    /* #646485 ;  */
    /* #343458; */
    overflow: hidden;
    /* #343458 背景黑
  #626076 打卡标题灰
  #66637e 底部背景灰
  #bdbbd1 底部浅白
  #a4a3b5 数据浅白
  #59c3c1 绿
  #18bdac 课表绿 */
}
.other_daka_topbox {
    height: 77%;
    border-radius: 20rpx 20rpx 0 0;
    display: flex;
    flex-direction: row;
}
.other_daka_topbox_left {
    width: 50%;
    /* background-color: green; */
    border-radius: 20rpx 0rpx 0 0;
    display: flex;
    flex-direction: column;
}
.other_daka_topbox_left_title {
    height: 18%;
    /* background-color: gray; */
    border-radius: 20rpx 0rpx 0 0;
}
.other_daka_topbox_left_title_text {
    height: 88%;
    width: 38%;
    border-radius: 20rpx;
    background-color: #8585a3;
    text-align: center;
    font-size: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}
.other_daka_topbox_left_dakadata {
    height: 82%;
}

.other_daka_topbox_right {
    width: 50%;
    border-radius: 0rpx 20rpx 0 0;
    display: flex;
    flex-direction: column;
    position: relative;
}
.other_daka_topbox_right_dakaday {
    position: absolute;
    top: 20rpx;
    right: 42rpx;
    float: right;
    width: auto;
    height: 18%;
    text-align: center;
    /* background: gray; */
    z-index: 99;
    font-size: 20rpx;
    color: #fff;
}
.image_pic {
    float: right;
    position: absolute;
    top: 40rpx;
    right: -68rpx;
}
.other_daka_topbox_right_dakaimage {
    float: none;
    /* height: 82%; */
    /* background: #000; */
}
.other_daka_topbox_right_dakaimage > image {
    /* height: 130%; */
    width: 100%;
}
.other_daka_topbox_left_dakadata_task {
    margin: 20rpx auto 0rpx 0rpx;
    display: flex;
    flex-direction: row;
}
.other_daka_topbox_left_dakadata_task_yuan {
    filter: invert(1) !important;
    width: 11%;
    height: 30rpx;
    padding: 2rpx 20rpx 2rpx 0rpx;
}
.other_daka_topbox_left_dakadata_task_text {
    /* 打卡内容的字 */
    width: auto;
    color: #494c6b;
    /* #a4a3b5 ; */
}
.other_daka_topbox_left_dakadata_task_true {
    width: 80%;
    margin: 20rpx auto 0rpx 0rpx;
    display: flex;
    flex-direction: row;
    border: 2rpx solid #59c3c1;
    border-radius: 40rpx;
}
.other_daka_topbox_left_dakadata_task_modle {
    width: 12%;
    height: 35rpx;
}
.other_daka_topbox_left_dakadata_scroll_view {
    width: 80%;
    height: 85%;
    margin: 4rpx 0 10rpx 35rpx;
    font-size: 25rpx;
}
.small_ring {
    position: absolute;
    top: 125rpx;
    right: 248rpx;
    background-color: #fff;
    border-radius: 50%;
    width: 20rpx;
    height: 20rpx;
    z-index: 2;
}
.outer_ring {
    position: absolute;
    right: -68rpx;
    top: 60rpx;
    border-radius: 50%;
    width: 350rpx;
    height: 350rpx;
    border: 6rpx solid #8585a3;
    z-index: 0;
}
.inner_circle {
    position: absolute;
    top: 90rpx;
    right: -40rpx;
    border-radius: 50%;
    height: 300rpx;
    width: 300rpx;
    border-radius: 50%;
    background-color: #8585a3;
    z-index: 0;
}
.other_daka_bottombox {
    height: 23%;
    width: auto;
    background-color: #9c9cbe;
    /* #8585a3 ; */
    border-radius: 0 0 20rpx 20rpx;
    z-index: 99;
    display: flex;
    flex-direction: row;
}
.other_daka_bottombox_left {
    /* display: flex; */
    /* align-items: center; */
    width: 70%;
    height: 35%;
    color: rgb(211, 211, 211);
    /* #a4a3b5 ; */
    font-size: 27rpx;
    margin: 26.5rpx 0rpx 20rpx 0;
    padding: 0rpx 0rpx 0rpx 40rpx;
}
.other_daka_bottombox_center {
    width: 21.5%;
    color: #fff;
    margin: 25rpx 0rpx 20rpx 0rpx;
    padding: 0rpx 16rpx 0rpx 0rpx;
    text-align: right;
    font-size: 28rpx;
    font-weight: 550;
}
.other_daka_bottombox_right {
    width: 8.5%;
    height: 55rpx;
    margin: 17rpx 0rpx 10rpx 0rpx;
    padding: 0rpx 22rpx 0rpx 0rpx;
}
@media (prefers-color-scheme: dark) {
    .wx-remind-mask {
        filter: invert(100%) !important;
        /* background-image: linear-gradient( #324349 , #0d0d0d); */
    }
    .wx-remind-body .icon-dingwei {
        filter: invert(0) !important;
    }
    .adContainer ad {
        filter: invert(90%) !important;
    }

    .wx-class-title {
        filter: invert(95%) !important;
    }

    .wx-class-time {
        filter: invert(95%) !important;
        color: #fff !important;
    }

    .color_0 {
        /* color: #28cbb8 !important; */
        color: #fff !important;
    }

    .color_1 {
        color: #fff !important;
    }

    .background-color_0 {
        filter: invert(90%) !important;
        background-color: #237b87 !important;
    }

    .background-color_1 {
        filter: invert(90%) !important;
        background-color: #a0c8e1 !important;
    }

    .wx-remind-class text {
        color: rgb(0, 0, 0);
    }

    page {
        background-color: #fff;
    }
    .countdown {
        border-color: rgba(103, 135, 148, 0.04);
        margin-right: 10rpx;
        background-color: rgba(246, 244, 244, 0.7);
        border-radius: 20rpx;
        height: 200rpx;
    }

    .zt {
        color: #fff;
    }
    .wx-remind {
        background-color: #f5f4f4;
    }
    .mask {
        background-color: #fff;
    }
    .mask2 {
        background-color: #fff;
    }
    .container {
        filter: invert(0%) !important;
        background-color: #fff;
    }

    .wx-remind text {
        filter: invert(90%) !important;
    }

    .wx-remind-title {
        filter: invert(90%) !important;
    }

    .kpt {
        color: #49a8a5;
    }
    .other {
        filter: invert(1) !important;
        background-color: #343458;
    }
    .other_daka_topbox_left_title_text {
        background-color: #626076;
    }
    .image_pic {
        filter: invert(0) !important;
    }
    .small_ring {
        background-color: #fff;
    }
    .outer_ring {
        border: 6rpx solid #494c6b;
    }
    .inner_circle {
        background-color: #494c6b;
    }
    .other_daka_topbox_left_dakadata_task_text {
        filter: invert(1) !important;
        color: #a4a3b5;
    }
    .other_daka_bottombox {
        background-color: #626076;
    }
    .other_daka_bottombox_left {
        color: #a4a3b5;
    }
}
</style>
