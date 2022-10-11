<template>
    <view class="all">
        <view class="container">
            <view class="head">
                <!-- 状态栏 -->
                <view :style="'height: ' + statusBarHeight + 'px;'" />
                <!-- 导航栏 -->
                <view class="cur-week" :style="'height: ' + lineHeight + 'px;'">
                    <view @tap="back" style="display: flex; align-items: center; margin-left: 30rpx; color: #fff; font-size: 55rpx">{{ '<' }}</view>
                </view>
            </view>
            <view class="title">
                <view class="title_bg"></view>

                <view class="title_text">
                    <text>We校园</text>
                </view>
            </view>

            <view class="hd">
                <image class="logo" src="/static/pages/login/image/logo.jpg"></image>
                <image class="wave" src="/static/pages/login/image/wave.png" mode="aspectFill"></image>
                <image class="wave wave-bg" src="/static/pages/login/image/wave.png" mode="aspectFill"></image>
            </view>

            <view class="login">
                <picker style="width: 100%" @change="bindPickerChange" :value="index" :range="school">
                    <view class="login_school">
                        <label>学校</label>
                        <view class="picker" :style="'color: ' + (school[index] ? '#000' : 'rgb(141,141,141)') + ';'">
                            {{ school[index] || '请选择学校' }}
                        </view>
                        <image src="/static/pages/login/image/箭头 下.png" class="arrow" />
                    </view>
                </picker>

                <view class="login_user">
                    <label>帐号</label>
                    <input type="text" id="user" placeholder="请输入学号" :value="user" @input="input" />
                </view>

                <view class="login_pwd">
                    <label>密码</label>
                    <input type="text" id="pwd" :password="true" :value="pwd" placeholder="请输入教务系统密码" @input="input" />
                </view>
            </view>

            <view class="help">
                <text @tap="showHelp">帮助</text>
                <icon type="info_circle" size="30rpx" @tap="showHelp"></icon>
            </view>

            <button class="btn" @tap="login">确认登录</button>
        </view>

        <view class="help_model" id="help_model" v-if="help_status" @tap="tapHelp">
            <view class="box">
                <view class="box-hd">
                    <text class="box-title">帮助</text>
                </view>
                <view class="box-bd">
                    <view class="help-q">1、账号和密码是什么？</view>
                    <view class="help-a">
                        <text>账号：账号就是您的学号。</text>
                        <text>密码：您设定的教务系统的登录密码。</text>
                    </view>
                    <view class="help-q">2、忘记密码？</view>
                    <view class="help-a">
                        <view>
                            <text>忘记密码请到教务系统</text>
                            <text class="url_text" @tap.stop.prevent="copy">网站为：{{ url }}重置找回密码</text>
                            <text>。</text>
                        </view>
                        <text>找回后使用教务系统密码登录即可。</text>
                    </view>
                    <view class="help-q">3、大一新生？不知道密码😥</view>
                    <view class="help-a">
                        <text>请耐心等待教务通知。(初始密码可能是身份证后6位)</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
//index.js
//获取应用实例
const db = wx.cloud.database();
const schoolLoading = db.collection('schoolLoading');
const app = getApp();
export default {
    data() {
        return {
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            rectHeight: getApp().globalData.rectHeight,
            user: '',
            pwd: '',
            school: [],
            url: '',
            urls: [],
            res: '',
            help_status: false
        };
    },
    async onLoad() {
        uni.showLoading({
            title: '加载基础信息中',
            mask: true
        }); // 注意！这个只能拉100个学校，我也希望未来我们能超过100个

        var that = this;
        var res = (
            await schoolLoading
                .field({
                    //显示哪些字段
                    schoolName: true,
                    //默认显示_id，这个隐藏
                    url: true,
                    location: true,
                    open: true,
                    open_yk: true
                })
                .get()
        ).data;
        var open = false;
        var open_yk = false;
        res.forEach((e) => {
            if (e.open === true) {
                open = true;
            }

            if (e.open_yk === true) {
                open_yk = true;
            }

            if ((e.schoolName !== '空') | '游客登录') {
                this.school.push(e.schoolName);
                this.urls.push(e.url);
            }
        });

        if (open) {
            res = [
                {
                    schoolName: '广东石油化工学院'
                }
            ];
            this.school = ['广东石油化工学院'];
        }

        if (open_yk) {
            res = [
                {
                    schoolName: '游客模式'
                }
            ];
            this.school = ['游客模式'];
        }

        this.setData({
            res: res,
            school: that.school
        });
        console.log(this.school);
        uni.hideLoading();
        uni.showLoading({
            title: '地点获取中',
            mask: true
        });
        uni.getLocation({
            type: 'wgs84',

            success(res) {
                const Rad = (d) => {
                    //根据经纬度判断距离
                    return (d * Math.PI) / 180;
                };

                const getDistance = (lat1 = 0, lng1 = 0, lat2 = 0, lng2 = 0) => {
                    var radLat1 = Rad(lat1);
                    var radLat2 = Rad(lat2);
                    var a = radLat1 - radLat2;
                    var b = Rad(lng1) - Rad(lng2);
                    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
                    s = s * 6378.137;
                    s = Math.round(s * 10000) / 10000;
                    s = s.toFixed(2); //保留两位小数
                    // console.log('经纬度计算的距离:' + s)

                    return s;
                };

                that.res.forEach((e) => {
                    e.distance = Number(getDistance(res.latitude, res.longitude, e.location ? e.location.latitude : 0, e.location ? e.location.longitude : 0));
                });
                that.res.sort(function (a, b) {
                    return a.distance - b.distance;
                }); // that.data.res.reverse()

                console.log(that.res);
                that.school = [];
                that.urls = [];
                that.res.forEach((e) => {
                    if ((e.schoolName !== '空') | '游客登录') {
                        that.school.push(e.schoolName);
                        that.urls.push(e.url);
                    }
                });
                that.setData({
                    school: that.school
                });
            },

            fail(res) {
                console.log(res);
            },

            complete() {
                uni.hideLoading({
                    success: (res) => {}
                });
            }
        });
    },
    methods: {
        back: function (params) {
            uni.switchTab({
                url: '/pages/myself/myself'
            });
        },

        bindPickerChange: function (e) {
            var that = this;
            this.setData({
                index: e.detail.value,
                url: that.urls[e.detail.value]
            });
            console.log(this.school[this.index]);

            if (this.school[this.index] == '游客登录') {
                that.setData({
                    user: 'guest',
                    pwd: 'test'
                });
            } else {
                that.setData({
                    user: '',
                    pwd: ''
                });
            }
        },

        login: function (e) {
            var that = this;

            if (this.user.length == 0 || this.pwd.length == 0) {
                uni.showToast({
                    title: '帐号及密码不能为空',
                    icon: 'none'
                });
                return -1;
            }

            uni.showLoading({
                title: '刷新中',
                mask: true
            });
            var that = this;
            uni.showLoading({
                title: '登录中',
                mask: true
            });
            uni.getUserProfile({
                desc: '获取头像和信息',
                // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    console.log(res.userInfo);
                    console.log(that.school[that.index]);
                    app.globalData.school = that.school[that.index];
                    wx.cloud.callFunction({
                        name: 'api',
                        data: {
                            url: 'login',
                            username: that.user,
                            password: that.pwd,
                            nickName: res.userInfo.nickName,
                            iconUrl: res.userInfo.avatarUrl,
                            school: that.school[that.index]
                        },
                        success: (res) => {
                            uni.clearStorageSync(); // 清除缓存

                            uni.setStorageSync('time', null);

                            if (res.result.msg == 'welcome') {
                                console.log(res.result);
                                uni.reLaunch({
                                    url: '/pages/index/index?goin=login'
                                });
                            } else {
                                console.log(res.result);
                                uni.showToast({
                                    icon: 'none',
                                    title: res.result.msg
                                });
                            }
                        },
                        fail: (err) => {
                            wx.cloud.callFunction({
                                name: 'api',
                                data: {
                                    url: 'coverBottom',
                                    username: that.user,
                                    password: that.pwd,
                                    nickName: res.userInfo.nickName,
                                    iconUrl: res.userInfo.avatarUrl,
                                    school: that.school[that.index]
                                },
                                success: (res) => {
                                    if (res.result.msg == 'welcome') {
                                        console.log(res.result);
                                        uni.reLaunch({
                                            url: '/pages/index/index'
                                        });
                                    } else {
                                        console.log(res.result);
                                        uni.showToast({
                                            icon: 'none',
                                            title: res.result.msg
                                        });
                                    }
                                },
                                fail: (err) => {
                                    uni.showToast({
                                        icon: 'none',
                                        title: '校园网关闭或者服务器异常'
                                    });
                                }
                            });
                        }
                    });
                },
                fail: (res) => {
                    uni.showToast({
                        icon: 'none',
                        title: '授权失败'
                    });
                }
            });
        },

        input: function (e) {
            this.setData({
                [e.target.id]: e.detail.value
            });
        },

        // 帮助弹窗
        tapHelp: function (e) {
            if (e.target.id == 'help_model') {
                this.hideHelp();
            }
        },

        showHelp: function (e) {
            this.setData({
                help_status: true
            });
        },

        hideHelp: function (e) {
            this.setData({
                help_status: false
            });
        },

        copy() {
            uni.setClipboardData({
                data: this.url,

                success() {
                    uni.showToast({
                        title: '已成功复制地址，快用浏览器打开吧',
                        icon: 'none'
                    });
                }
            });
        }
    }
};
</script>
<style>
/**index.wxss**/

/* @media (prefers-color-scheme: dark) {
  page{
    min-height: 100vh;
    filter: invert(90%) !important;
    background-color: rgb(25, 25, 25) !important;
    color: rgb(25, 25, 25) ; 
  }

  button,
  image,
  .title_text,
  .title_bg{
    filter: invert(90%) !important;
  } 
  
  input{
    color: black;
  }
  .hd{
    overflow: hidden;
  }

} */

.head {
    width: 100%;
    background-color: #5a94a0;
}
.all {
    height: 100vh;
    opacity: 0.9;
    display: block;
    background-color: rgba(245, 245, 245, 0.9);
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    height: 100vh;
}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    /* height: 17%; */
}
.title_bg {
    position: absolute;
    /* background-color: #58dfab;
  background-image: linear-gradient( #58dfab 90%, #ffffff);默认方向自下向上 */
    background-color: #5a94a0;
    /* background-color: rgba(85,85,180,0.8); */
    /* background-color: #483D8B; */
    /* background-image:linear-gradient(to left,rgba(85,85,180,0.3) 15%  , rgba(85,90,120,0.5) 50%,  rgba(85,90,120,0.5) 0%,rgba(85,85,120,0.3) 85%); */
    /* background-image: linear-gradient( to right ,red 10%, yellow); */
    height: 30%;
    width: 100%;
}
.title_text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 80%;
}
.title_text text {
    text-align: center;
    font-style: italic;
    font-size: 50rpx;
    letter-spacing: 2rpx;
    color: whitesmoke;
    font-weight: 900;
}

.login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: 90%;
    margin-top: 30%;
    top: 15.5vh;
    overflow: hidden;
}
.login_school,
.login_user,
.login_pwd {
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    background-color: white;
    padding: 30rpx 20rpx;
}
.login_school label,
.login_user label,
.login_pwd label {
    text-align: center;
    padding-right: 10rpx;
    border-right: 2rpx solid rgb(185, 185, 185);
    width: 20%;
}

.login_school picker {
    margin-left: 20rpx;
    width: 80%;
}

.picker {
    padding-left: 15rpx;
    color: rgb(141, 141, 141);
}

.login_user input,
.login_pwd input {
    margin-left: 20rpx;
    width: 80%;
}
.login_pwd {
    margin-top: 50rpx;
}
.login_user {
    margin-top: 50rpx;
}

.arrow {
    width: 35rpx;
    /* z-index: -1; */
    height: 35rpx;
    margin-top: 5rpx;
    position: absolute;
    padding-left: 580rpx;
}

.help {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 90%;
    padding-top: 20rpx;
    position: relative;
    top: 17.5vh;
}
.help text {
    /* color: rgb(45, 165, 230); */
    /* color: rgba(85,85,180,0.8);
    background-color: #9370DB; */
    color: #4169e1;
    padding-right: 5rpx;
}

.btn {
    position: absolute;
    bottom: 5%;
    width: 90%;
    /* background-color: rgb(88, 223, 171); */
    /* background-color: rgb(45, 165, 230); */
    /* background-color: rgba(85,85,180,0.8); */
    background-color: #5a94a0;
    color: white;
    border: none;
    outline: none;
    letter-spacing: 5rpx;
}

/* 悬浮的校徽+波浪 */
.hd {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 20%;
    width: 100%;
    transition: all 0.35s ease;
    z-index: 1;
}
.logo {
    width: 180rpx;
    height: 180rpx;
    animation: sway 10s ease-in-out infinite;
    opacity: 0.95;
    border-radius: 200rpx;
}
.wave {
    max-width: unset;
    position: absolute;
    top: 50%;
    right: 0;
    opacity: 0.725;
    height: 260rpx;
    width: 2250rpx;
    animation: wave 10s linear infinite;
}
.wave-bg {
    z-index: 3;
    animation: wave-bg 10.25s linear infinite;
}

@keyframes sway {
    0% {
        transform: translate3d(0, 20rpx, 0) rotate(-15deg);
    }
    17% {
        transform: translate3d(0, 0rpx, 0) rotate(25deg);
    }
    34% {
        transform: translate3d(0, -20rpx, 0) rotate(-20deg);
    }
    50% {
        transform: translate3d(0, -10rpx, 0) rotate(15deg);
    }
    67% {
        transform: translate3d(0, 10rpx, 0) rotate(-25deg);
    }
    84% {
        transform: translate3d(0, 15rpx, 0) rotate(15deg);
    }
    100% {
        transform: translate3d(0, 20rpx, 0) rotate(-15deg);
    }
}
@keyframes wave {
    from {
        transform: translate3d(125rpx, 0, 0);
    }
    to {
        transform: translate3d(1125rpx, 0, 0);
    }
}
@keyframes wave-bg {
    from {
        transform: translate3d(375rpx, 0, 0);
    }
    to {
        transform: translate3d(1375rpx, 0, 0);
    }
}

/* 帮助弹窗 */
.help_model {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
}
.box {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 80%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 50px rgba(22, 22, 22, 0.35);
    /* transform: translate3d(0,-400rpx,0); */
}
.box-hd {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100rpx;
    border-bottom: 1px solid #eee;
}
.box-title {
    font-size: 13pt;
}
.box-close {
    position: absolute;
    right: 20rpx;
    width: 35px;
    height: 35px;
    padding: 15rpx;
}
.box-bd {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 15rpx 40rpx 30rpx;
}
.help-q {
    color: #999;
    font-size: 11pt;
    line-height: 200%;
    margin-top: 10rpx;
}
.help-a {
    text-indent: 1em;
    line-height: 160%;
    display: flex;
    flex-direction: column;
}
.help-a text {
    word-break: break-all;
}
.url_text {
    color: rgb(45, 165, 230);
}
@media (prefers-color-scheme: dark) {
    .head {
        filter: invert(90%) !important;
    }

    input {
        filter: invert(100%) !important;
        color: white;
    }
    .title_bg {
        filter: invert(90%) !important;
    }
    .title_text {
        filter: invert(100%) !important;
    }
    .help {
        filter: invert(60%) !important;
    }
    .url_text {
        filter: invert(90%) !important;
    }
    .wave {
        filter: invert(0%) !important;
    }
    .help-q {
        filter: invert(100%) !important;
    }
    .box {
        filter: invert(0%) !important;
        background-color: #dddcdc;
        box-shadow: 0 0 50px rgba(255, 255, 255, 0.35);
    }
}
</style>
