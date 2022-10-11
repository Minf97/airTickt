<template>
    <view>
        <!-- parse <template is="head-block" :data="type: headerType, index, array, title:title , text: text">
  
</template> -->
        <block name="head-block">
            <view class="head">
                <view class="head-left" v-if="headerType == 'picker'">
                    <picker @change="bindPickerChange" :value="index" :range="array">
                        <label class="weui-input">{{ array[index] }}</label>
                        <text class="iconfont icon-open"></text>
                    </picker>
                </view>

                <view class="head-left" v-if="headerType == 'text'">
                    <view class="weui-input">{{ girl.bmi.title }}</view>
                </view>

                <view class="head-right">
                    <view v-for="(item, index) in text" :key="item.key">{{ item }}</view>
                </view>
            </view>
            <view class="head-padding"></view>
        </block>

        <view class="main">
            <view class="wx-isclass" v-if="msg">{{ msg }}</view>
            <view class="list">
                <block v-for="(item, index) in list" :key="item.id">
                    <!-- parse <template is="card" :data="fontSize:fontSize, line: lineSwitch, color: color[index], index: index, title: item.title, score: item.score, text: item.text">
      </template> -->
                    <block name="card">
                        <view class="data">
                            <view class="data-adj">
                                <view class="upWard" :style="'background-color:' + (!lineSwitch | !index ? '#fffcfc' : '#e2e5f2')"></view>
                                <view class="dot" :style="'background-color:' + color[index]"></view>
                                <view class="offWard" :style="'background-color: ' + (lineSwitch ? '' : '#fffcfc') + ';'"></view>
                            </view>
                            <view class="grade" @tap.stop.prevent="catchtap" :id="index">
                                <view class="grade-title">
                                    <view class="grade-column">{{ girl.bmi.title }}</view>
                                    <view class="grade-rum">
                                        <text v-for="(content, index) in item.text" :key="content.key">{{ content }}</text>
                                    </view>
                                </view>
                                <view class="data-score" :style="'color:' + color[index] + '; font-size:' + fontSize + ';'">{{ item.score }}</view>
                            </view>
                        </view>
                    </block>
                </block>
            </view>
            <text>\n</text>
        </view>

        <web-view v-if="htmlSrc" :src="htmlSrc" @message="getMessage"></web-view>
    </view>
</template>

<script>
//index.js
//获取应用实例
var app = getApp();
export default {
    data() {
        return {
            htmlText: '',
            foodList: [],
            htmlSrc: '',
            headerType: '',
            array: [],

            girl: {
                bmi: {
                    title: ''
                }
            },

            text: [],
            msg: '',
            list: [],
            lineSwitch: 0,

            content: {
                key: ''
            },

            fontSize: ''
        };
    }, //事件处理函数
    onLoad: function (options) {
        var that = this;
        console.log(options);
        var args = uni.getStorageSync('args');

        if (options.type === 'web') {
            that.setData({
                htmlSrc: options.url + '?argsData=' + options.argsData + '&username' + args.username + '&password' + args.password
            });
        } else if (options.type === 'small') {
            uni.navigateToMiniProgram({
                appId: options.id,
                path: 'pages/index/index',
                extraData: {
                    xuehao: getApp().globalData.xuehao
                },
                envVersion: 'release',

                success(res) {
                    uni.navigateBack({
                        delta: 1
                    });
                    console.log('跳转成功');
                },

                fail: function (err) {
                    uni.navigateBack({
                        delta: 1
                    });
                }
            });
        } else if (options.type === 'commonPage') {
            if (args) {
                try {
                    var onload = app.globalData.jsRun(args, args.otherPageCode[options.content]);
                    onload(that);
                } catch (e) {
                    console.log(e);
                }
            }
        } else {
            uni.showToast({
                title: '内容出错',
                icon: 'none'
            });
        }
    },
    onShareAppMessage: function (res) {
        return {
            title: 'We广油'
        };
    },
    methods: {
        getMessage: function (res) {
            var that = this;
            var args = uni.getStorageSync('args');
            console.log(res.detail.data);
            var run = app.globalData.jsRun(args, res.detail.data);
            var returnUrl = run(that);

            if (returnUrl) {
                that.setData({
                    htmlSrc: returnUrl
                });
            }
        },

        bindPickerChange() {
            console.log('占位：函数 bindPickerChange 未声明');
        },

        catchtap() {
            console.log('占位：函数 catchtap 未声明');
        }
    }
};
</script>
<style>
@import '../../template/showCommonPage/template.css';

page {
    background-color: #ffffff;
}

.main {
    margin: 0 26rpx 30rpx 20rpx;
}

.wx-isclass {
    text-align: center;
    font-size: 40rpx;
    color: #1cbbb4;
    margin-top: 30rpx;
}

.list {
    margin-bottom: 30rpx;
}

.icon-open {
    margin-left: 20rpx;
}
/* 
.data-score {
  font-size: 30rpx;
} */

@media (prefers-color-scheme: dark) {
    page {
        min-height: 100vh;
        filter: invert(90%) !important;
        background-color: rgb(25, 25, 25) !important;
        color: rgb(25, 25, 25);
    }
}
</style>
