<template>
    <view class="container page">
        <view class="content">
            <view class="version">
                <view class="version-title">
                    <text class="title-name">We校园</text>
                    <!-- <text class="version-text">{{version}}</text> -->
                </view>
            </view>
            <view class="describe">
                <text class="desc-title">简介</text>
                <text class="desc-content" style="text-indent: 2em">
                    “We校园”是一款面向全国高校的非学校官方微信小程序，致力于帮助我们各学校师生更方便的查询教务信息，以及浏览学校校历，校园圈等功能。
                </text>
                <text class="desc-content" style="text-indent: 2em">
                    “We校园”目前以广东石油化工学院以及茂名职业技术学院作为试点高校，也欢迎更多高校学生与我们参与合作打造校园生态，我们将有一系列新的功能正在我们的开发计划中。“你想要的，都在这里！”
                </text>
                <text class="desc-content" style="text-indent: 2em">我们保证信息安全，不会获取任何个人信息。</text>
                <text class="desc-title">数据来源</text>
                <text class="desc-content">* 课表、成绩等数据来自教务处官网；\r\n* 前端代码来自GitHub各位大佬的开源代码；\r\n* 校历、各系部联系电话来自于学院官方网站；</text>
                <text class="desc-title">开发贡献</text>
                <view class="avatarGroup">
                    <view class="oneAvatar" v-for="(item, index) in coder" :key="item.coderkey">
                        <view class="userinfo-avatar">
                            <image :src="item.avatar" style="width: 110rpx; height: 110rpx"></image>
                        </view>

                        <view class="coperatorName">{{ item.nickName }}</view>
                    </view>
                </view>

                <!-- <text class="desc-title">咨询客服</text>
      <view class='avatarGroup'>
        <view class='oneAvatar' wx:for="{{servicer}}" wx:key="serverkey">
          <view class="userinfo-avatar">
            <image src='{{item.avatar}}' style='width:110rpx;height:110rpx;'></image>
          </view>
          <view class="coperatorName">{{item.nickName}}</view>
        </view>
      </view> -->
                <!-- <text class="desc-title">关联We广油</text>
      <text class="desc-content" style='text-indent:2em;'>若您或者您的朋友在运营与本校相关的公众号（学生组织/社团/校园自媒体等），「WE广油」诚挚地欢迎您的公众号关联我们的小程序，并期待合作！\r\n \r\n \r\n  </text>

      <text class="desc-content" style='text-indent:2em;'>忘记密码和修改密码都是在教务处网站修改！\r\n  </text>

      <view class="button-sp-area">
      </view> -->

                <button
                    class="weui-btn"
                    type="primary"
                    :plain="true"
                    :session-from="'{'nickName':''+(userInfo.nickName)+'', 'avatarUrl':''+(userInfo.avatarUrl)+'''"
                    open-type="contact"
                >
                    联系客服
                </button>
            </view>
        </view>

        <view class="footer">
            <view class="footer-beingshawn"></view>
            <text>WE校园</text>
            <text>Copyright @ 2021</text>
        </view>
    </view>
</template>

<script>
// pages/features/about.js
var app = getApp();
export default {
    data() {
        return {
            width: '100%',
            height: '',

            // servicer: [{
            //   avatar: '/images/about/zw.jpg',
            //   nickName: 'u.'
            // },
            // {
            //   avatar: '/images/about/yq.jpg',
            //   nickName: 'Grace'
            // },
            // {
            //   avatar: '/images/about/zt.jpg',
            //   nickName: '騰丶'
            // },
            // {
            //   avatar: '/images/about/lin.jpg',
            //   nickName: '小排骨'
            // },
            // {
            //   avatar: '/images/about/yan.jpg',
            //   nickName: '云崖呀呀'
            // }
            // ],
            coder: [
                {
                    avatar: '/static/images/about/zw.jpg',
                    nickName: 'u.'
                },
                {
                    avatar: '/static/images/about/xld.jpg',
                    nickName: '细粒丁'
                },
                {
                    avatar: '/static/images/about/yq.jpg',
                    nickName: 'Grace'
                },
                {
                    avatar: '/static/images/about/zt.jpg',
                    nickName: '騰丶'
                },
                {
                    avatar: '/static/images/about/sx.jpg',
                    nickName: 'Minf'
                },
                {
                    avatar: '/static/images/about/yue.jpg',
                    nickName: '恩佐'
                },
                {
                    avatar: '/static/images/about/juan.jpg',
                    nickName: '自然卷'
                },
                {
                    avatar: '/static/images/about/long.jpg',
                    nickName: '智阝章龙'
                },
                {
                    avatar: '/static/images/about/bing.jpg',
                    nickName: '.'
                }
            ],

            version: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        var that = this;
        console.log(app.globalData.verse);
        that.setData({
            width: uni.getSystemInfoSync().windowWidth * 0.9 + 'px',
            height: uni.getSystemInfoSync().windowWidth * 0.9 * 0.5625 + 'px',
            version: app.globalData.verse
        });
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        copyID: function () {
            uni.setClipboardData({
                data: 'wxd1eacf33b4ed0195'
            });
            uni.showToast({
                title: '已复制到粘贴版',
                duration: 1000
            });
        }
    }
};
</script>
<style>
/* pages/features/about.wxss */

.page {
    background-color: #7acfa6;
}

.container {
    background: #f4f4f4;
    padding: 0;
    font-size: 11pt;
}

.content {
    flex: 1;
}

.version {
    border-radius: 20rpx;
    height: 100rpx;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 45rpx;
    box-sizing: border-box;
    font-size: 13pt;
    color: #666;
    border-bottom: 1px #e5e5e5 solid;
}

.version-title {
    flex: 1;
    display: flex;
    align-items: center;
}

.title-name {
    padding-right: 10rpx;
}

.version-text {
    font-size: 10pt;
    line-height: 100%;
    color: #7acfa6;
    border: 1px solid #7acfa6;
    padding: 5rpx 10rpx;
    border-radius: 5rpx;
    margin-left: 10rpx;
    text-align: center;
}

.version-log-link {
    position: relative;
    font-size: 12pt;
    color: #7acfa6;
}

.version-log-link:active {
    opacity: 0.8;
}

.describe {
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx 45rpx 30rpx;
    display: flex;
    flex-flow: column nowrap;
    color: #545454;
    line-height: 175%;
    background: #fff;
    margin-top: 15rpx;
    border-top: 1px #e5e5e5 solid;
    border-bottom: 1px #e5e5e5 solid;
    border-radius: 25rpx;
}

.desc-title {
    display: flex;
    font-size: 13pt;
    line-height: 200%;
    margin-bottom: 15rpx;
}

.desc-v {
    flex: 1;
}

.desc-time {
    font-size: 11pt;
    color: #888;
}

.desc-list {
    display: flex;
    flex-direction: column;
    border-left: 8rpx solid #ddd;
    padding-left: 15rpx;
    color: #777;
    margin-bottom: 15rpx;
    font-size: 10pt;
}

.desc-content {
    padding-bottom: 15rpx;
}

.footer {
    display: flex;
    flex-direction: column;
    font-size: 9pt;
    line-height: 150%;
    text-align: center;
    margin-bottom: 15rpx;
    color: #c2c2c2;
}

.footer-beingshawn {
    font-size: 10pt;
    height: 10pt;
    line-height: 10pt;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8rpx;
}

.footer-beingshawn image {
    width: 10pt;
    height: 10pt;
    margin-right: 5rpx;
}

.userinfo-avatar {
    border-radius: 50rpx;
    clip-path: circle(50% at center);
    width: 110rpx;
    height: 110rpx;
    box-shadow: 5rpx 5rpx 15rpx #ccc;
}

.avatarGroup {
    margin-bottom: 15rpx;
}

.oneAvatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    float: left;
    width: 20%;
    height: 170rpx;
    font-size: 26rpx;
}

.button-sp-area {
    padding: 30rpx 35rpx;
}

button[type='primary'][plain] {
    color: #fff;
    border: 1px solid #96deda;
    background-image: linear-gradient(-45deg, #7acfa6 0%, #7acfa6 50%);
    border-radius: 50px;
}

.button-hover[type='primary'][plain] {
    color: #fff;
    border-color: #96deda;
    opacity: 0.6;
}

button[type='default'][plain] {
    color: #fff;
    border: 1px solid #fbc2eb;
    background-image: linear-gradient(-45deg, #7acfa6 0%, #7acfa6 50%);
}

.button-hover[type='default'][plain] {
    color: #fff;
    border-color: #fbc2eb;
    opacity: 0.6;
}
</style>
