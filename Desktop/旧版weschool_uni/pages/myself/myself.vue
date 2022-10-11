<template>
    <view class="container">
        <!-- 头部 -->
        <view class="head">
            <!-- 状态栏 -->
            <view :style="'height: ' + statusBarHeight + 'px;'"></view>
            <!-- 导航栏 -->
            <view :style="'height: ' + lineHeight + 'px;'"></view>
        </view>

        <!-- 用户信息区域 -->
        <view class="info">
            <view class="userInfo">
                <!-- 头像 -->
                <view class="userInfo_avatar">
                    <image v-if="isLogin" :src="storageInfo.iconUrl" />
                    <image src="/static/pages/myself/images/logo.jpg"></image>
                </view>

                <view class="userInfo_text" @tap="school">
                    <view class="left">
                        <!-- 姓名 -->
                        <view>
                            <text>{{ isLogin ? storageInfo.nickName : '你还没登录哟!' }}</text>
                        </view>
                        <!-- 学号 -->
                        <view>
                            <text v-if="!isLogin">点击登录账号</text>
                            <view v-else>学号：{{ storageInfo.username }}</view>
                        </view>
                    </view>

                    <view class="right" v-if="isLogin">
                        <view>{{ studyDate }}</view>
                        <view>{{ studyWeek }}</view>
                    </view>
                </view>
            </view>
        </view>

        <view class="blocks">
            <!-- 中间待定功能/学校模块 -->
            <view class="moduleAdd">
                <view class="firstModule moduleItem">
                    <view class="text">0</view>
                    <view class="fundamention">待定功能</view>
                </view>
                <view class="secondModule moduleItem">
                    <view class="text">{{ storageInfo.school ? storageInfo.school : '暂未登录' }}</view>
                    <view class="fundamention">学校</view>
                </view>
            </view>

            <!-- 学校/学号Dialog -->
            <view class="demoBox">
                <!-- 学校 -->
                <view class="demoUser" @tap.stop.prevent="school">
                    <view class="left">
                        <image src="/static/pages/myself/images/class.png"></image>
                        <text class="title">学校</text>
                    </view>
                    <view class="right">
                        <text>{{ isLogin ? storageInfo.school : '暂未登录' }}</text>
                    </view>
                </view>
                <!-- 学号 -->
                <view class="demoUser" @tap.stop.prevent="academy">
                    <view class="left">
                        <image src="/static/pages/myself/images/academy.png"></image>
                        <text class="title">学号</text>
                    </view>
                    <view class="right">
                        <text>{{ isLogin ? storageInfo.username : '暂未登录' }}</text>
                    </view>
                </view>
            </view>

            <!-- 关于我们...Dialog -->
            <view class="more">
                <block v-for="(item, index) in list" :key="index">
                    <button class="more_item" @tap.stop.prevent="item.click" :open-type="item.id == 4 ? 'share' : ''" hover-class="btn_hover">
                        <view class="left">
                            <image :src="item.icon"></image>
                            <text class="title">{{ item.title }}</text>
                        </view>
                        <view class="right">
                            <text>{{ item.intro }}</text>
                            <image class="jt" :src="right || '/pages/myself/images/right.png'"></image>
                        </view>
                    </button>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
// index.js
// 获取应用实例
var util = require('../../utils/util.js');

export default {
    data() {
        return {
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            isLogin: false,
            userInfo: [],

            time: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: new Date().getDay()
            },

            list: '',

            storageInfo: {
                iconUrl: '',
                nickName: '',
                username: '',
                school: false
            },

            studyWeek: '',
            studyDate: '',
            right: ''
        };
    },
    onLoad() {
        var that = this;
        var myselfData = uni.getStorageSync('myselfData');

        if (myselfData) {
            that.setData({
                list: myselfData.list
            });
        }

        wx.cloud
            .database()
            .collection('myself')
            .orderBy('myself_Id', 'asc')
            .get()
            .then((res) => {
                console.log(res.data);
                uni.setStorageSync('myselfData', {
                    list: res.data
                });
                that.setData({
                    list: res.data
                });
            });
        let args = uni.getStorageSync('args'); // 如果 args 里有 username 字段，则是已登录状态

        console.log(args.username);

        if (args.username) {
            that.setData({
                storageInfo: args,
                isLogin: true
            });
        }

        this.handleStudyDate();
        this.handleStudyWeek();
    },
    onShareAppMessage: function (res) {
        return {
            title: 'WE校园'
        };
    },
    methods: {
        school(e) {
            if (!this.isLogin) {
                uni.navigateTo({
                    url: '/pages/login/login'
                });
            } // else {
            //   wx.showToast({
            //     icon:'none',
            //     title: '你的学校哟!',
            //   })
            // }
        },

        academy(e) {
            if (!this.isLogin) {
                uni.navigateTo({
                    url: '/pages/login/login'
                });
            } // else {
            //   wx.showToast({
            //     icon:'none',
            //     title: '你的学号哟!',
            //   })
            // }
        },

        about(e) {
            uni.navigateTo({
                url: '/pages/about/about'
            });
        },

        journal(e) {
            uni.navigateTo({
                url: '/pages/journal/journal'
            });
        },

        login(e) {
            // if (this.data.isLogin) {
            uni.showModal({
                title: '提示',
                content: '请确定是否注销/登录',

                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                        uni.redirectTo({
                            url: '/pages/login/login'
                        });
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            }); // }
        },

        association(e) {
            uni.navigateTo({
                url: '/pages/association/association'
            });
        },

        handleStudyWeek() {
            const day = this.time.day;
            const currWeek = util.getweekString();
            var date = '';

            switch (day) {
                case 0:
                    date = '日';
                    break;

                case 1:
                    date = '一';
                    break;

                case 2:
                    date = '二';
                    break;

                case 3:
                    date = '三';
                    break;

                case 4:
                    date = '四';
                    break;

                case 5:
                    date = '五';
                    break;

                case 6:
                    date = '六';
                    break;

                default:
                    break;
            }

            this.setData({
                studyWeek: '第' + currWeek + '周' + '--' + '星期' + date
            });
        },

        handleStudyDate() {
            var semester = '';
            const time = this.time;
            const nextYear = time.year + 1;

            if (8 <= time.month <= 12 || time.momnth == 1) {
                semester = '1';
            } else {
                semester = '2';
            }

            this.setData({
                studyDate: time.year + '-' + nextYear + '学年 第' + semester + '学期'
            });
        }
    }
};
</script>
<style>
page {
    background-color: rgb(249, 249, 249);
}

.container {
    position: absolute;
    animation: blinds 0.6s ease-in-out 1 normal;
    width: 100%;
}

@keyframes blinds {
    0% {
        top: -500px;
        opacity: 0;
    }
    100% {
        top: 0px;
        opacity: 1;
    }
}

/* 头部 */
.head {
    background-color: rgb(122, 159, 204);
}

.info {
    /* position: fixed; */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150rpx;
    background-color: rgb(122, 159, 204);
}

.userInfo {
    display: flex;
    justify-content: space-between;
    width: 95%;
}

/* 头像 */
.userInfo_avatar {
    border: 5rpx solid rgba(171, 199, 233, 0.6);
}
.userInfo_avatar,
.userInfo_avatar image {
    overflow: hidden;
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
}

/* 角色信息text */
.userInfo_text {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 0.96;
    color: rgb(233, 253, 253);
}
.userInfo_text .left > view:nth-child(1) {
    margin-bottom: 10rpx;
}
.userInfo_text .left > view:nth-child(2) {
    font-size: 23rpx;
    color: rgb(212, 223, 238);
}
.userInfo_text .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 40rpx;
    font-size: 23rpx;
    color: rgb(212, 223, 238);
}
.userInfo_text .right > view:nth-child(1) {
    margin-bottom: 10rpx;
    margin-top: 8rpx;
}

.blocks {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15rpx 20rpx;
}
.moduleAdd,
.demoBox,
.more {
    width: 100%;
    margin: 10rpx 0;
}

/* ModuleAdd模块 */
.moduleAdd {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-radius: 15rpx;
}
.moduleAdd .firstModule {
    border-right: 1rpx solid #ccc;
}
.moduleAdd .moduleItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    margin: 30rpx 0 30rpx 0;
}
.moduleAdd .moduleItem .text {
    font-size: 24rpx;
    color: black;
    font-weight: 700;
    margin-bottom: 10rpx;
}
.moduleAdd .moduleItem .fundamention {
    font-size: 28rpx;
    font-weight: 400;
    color: rgb(164, 163, 165);
}

/* demo */
.demoBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15rpx;
    background-color: #fff;
}
.demoUser {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 650rpx;
    height: 100rpx;
    border-bottom: 1rpx solid rgb(122, 159, 204, 0.3);
}
.demoUser:last-child {
    border-bottom: 0;
}
.demoUser .left image {
    width: 50rpx;
    height: 50rpx;
    padding-right: 10rpx;
}
.demoUser .left {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.demoUser .left .title {
    font-size: 25rpx;
    color: black;
}
.demoUser .right {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.demoUser .right text {
    font-size: 25rpx;
    color: rgb(164, 163, 165);
    letter-spacing: 2rpx;
}
.demoUser image:last-child {
    width: 30rpx;
    height: 30rpx;
    margin-top: 2rpx;
}

/* more -> 第二个Dialog */
.more {
    border-radius: 15rpx;
    background-color: #fff;
}
.more_item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 650rpx;
    height: 100rpx;
    /* border-bottom: 1rpx solid rgb(122, 159, 204, 0.0); */
}
.more_item:last-child {
    border-bottom: 0;
}
.more_item .left {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.more_item .left image {
    width: 50rpx;
    height: 50rpx;
    padding-right: 10rpx;
}
.more_item .left .title {
    font-size: 25rpx;
    color: black;
}
.more_item .right {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.more_item .right text {
    font-size: 25rpx;
    color: rgb(164, 163, 165);
    letter-spacing: 2rpx;
}
.more_item image:last-child {
    width: 30rpx;
    height: 30rpx;
    margin-top: 2rpx;
}

button {
    font-size: 32rpx;
    color: rgba(52, 144, 248, 1);
    height: 100%;
    line-height: 100rpx;
    background: transparent;
    /* background-color:#fff; */
    border-radius: 0;
}

button::after {
    border-color: transparent;
}
.btn_hover {
    border-radius: 10rpx;
    background-color: rgb(240, 238, 238);
}

.more_item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 650rpx !important;
    height: 100rpx;
    border-bottom: 1rpx solid rgb(122, 159, 204, 0.3);
    margin-left: 30rpx;
    padding: 0 !important;
    font-weight: 400 !important;
    transition: background-color 0.2s ease 0s;
}

@media (prefers-color-scheme: dark) {
    .container {
        background-color: #fff;
        filter: invert(2%) !important;
    }
    page {
        min-height: 100vh;
        background-color: #fff;
        color: rgb(25, 25, 25);
    }

    .moduleAdd {
        background-color: rgba(246, 244, 244, 0.7);
    }

    .demoBox {
        background-color: rgba(246, 244, 244, 0.7);
    }

    .more {
        background-color: rgba(246, 244, 244, 0.7);
    }

    .info,
    .head {
        filter: invert(100%) !important;
        background-color: rgba(122, 159, 204, 0.7);
    }
    .more_item {
        filter: invert(0%) !important;
    }
    .info image {
        filter: invert(0%) !important;
    }

    image {
        filter: invert(100%) !important;
    }

    .jt {
        filter: invert(10%) !important;
    }
}
</style>
