<template>
    <view>
        <view :style="'height: ' + statusBarHeight + 'px;width: 100vw;'"></view>
        <view :style="'height: ' + lineHeight + 'px;width: 100vw;display: flex;align-items: center;'">
            <view
                @tap="cancel"
                style="
                    width: 38rpx;
                    height: 38rpx;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.548);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 37rpx;
                "
            >
                <view style="color: white; font-size: 23rpx; line-height: 25rpx" @tap="back">x</view>
            </view>
        </view>
        <view class="topBox">
            <image class="topBox_image" src="/static/pages/testdaka/images/rili.png"></image>
            <view class="topBox_day">{{ dayRequire }}天打卡挑战</view>
        </view>
        <view class="centerBox">
            <view class="centerBox_title">{{ girl.bmi.title }}</view>
            <view class="centerBox_tap">
                <view class="centerBox_tap_leftBox"></view>
                <view class="centerBox_tap_rightBox">打卡规则</view>
            </view>
            <textarea class="centerBox_textarea" :disabled="true" :value="guide"></textarea>
        </view>
        <view class="bottomBox" @tap="apply">我已准备好</view>
    </view>
</template>

<script>
// pages/testdaka/applyChallenge/app;yChallenge.js
export default {
    data() {
        return {
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,

            // 需要渲染的数据页面携带值传参获得
            dayRequire: '',

            title: '',
            guide: '',

            //缓存
            args: '',

            //上传数据库需要的数据
            //数据需要页面携带值传参获得
            total: 0,

            dayrequire: 0,
            challengeuuid: '',
            challengename: '',
            postarr: '',
            thisChallenge: '',
            groupData: '',

            girl: {
                bmi: {
                    title: ''
                }
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        var postarr = JSON.parse(options.challengePostarr);
        var thisChallenge = JSON.parse(options.thisChallenge);
        var groupData = JSON.parse(options.thisGroupData);
        let args = uni.getStorageSync('args');
        let usernum = args.username;
        let challengeid = thisChallenge.challengeid;
        this.setData({
            postarr,
            args,
            thisChallenge,
            groupData,
            title: thisChallenge.challengename,
            guide: thisChallenge.challengeguide,
            dayRequire: thisChallenge.totalday
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
    methods: {
        send() {
            let wxurl = this.args.iconUrl;
            let wxname = this.args.nickName;
            let usernum = this.args.username;
            let total = this.total;
            let iscomplete = false;
            let dayrequire = this.dayrequire;
            let dakalog = [];
            let challengeuuid = this.challengeuuid;
            let challengename = this.challengename; //这些就是报名一个挑战需要上传到dakaChallenge_member的数据
        },

        back() {
            uni.navigateBack({
                delta: 1
            });
        },

        apply() {
            uni.showLoading({
                title: '报名中',
                mask: true
            });
            let challenge = this.thisChallenge;
            let groupData = this.groupData;
            let challengeid = this.thisChallenge.challengeid;
            let challengeMemberArr = {
                dakalog: [],
                memberName: this.args.nickName,
                memberUrl: this.args.iconUrl,
                memberUsernum: this.args.username
            };
            const _ = wx.cloud.database().command;
            wx.cloud
                .database()
                .collection('dakaChallenge_information')
                .where({
                    challengeid: challengeid
                })
                .update({
                    data: {
                        challengeMemberArr: _.push(challengeMemberArr)
                    }
                })
                .then((res) => {
                    wx.cloud
                        .database()
                        .collection('dakaChallenge_member')
                        .add({
                            data: {
                                challengename: challenge.challengename,
                                challengeuuid: challenge.challengeid,
                                dakalog: [],
                                dayrequire: challenge.totalday,
                                iscomplete: false,
                                totalday: 0,
                                //累计打卡天数
                                totaldegree: 0,
                                //累计打卡次数
                                usernum: this.args.username,
                                wxname: this.args.nickName,
                                wxurl: this.args.iconUrl,
                                name: '测试报名'
                            }
                        });
                })
                .then((res) => {
                    uni.hideLoading({
                        success: (res) => {
                            let groupData = this.groupData;
                            let thisPostarr = this.postarr;
                            let challenge = this.thisChallenge;
                            var challengePostarr = JSON.stringify(thisPostarr);
                            var thisChallenge = JSON.stringify(challenge);
                            var thisGroupData = JSON.stringify(groupData);
                            let fromApply = true;
                            uni.navigateTo({
                                url:
                                    '../dakaChallenge/dakaChallenge?challengePostarr=' +
                                    challengePostarr +
                                    '&thisChallenge=' +
                                    thisChallenge +
                                    '&thisGroupData=' +
                                    thisGroupData +
                                    '&fromApply=' +
                                    fromApply
                            });
                        }
                    });
                });
        },

        cancel() {
            console.log('占位：函数 cancel 未声明');
        }
    }
};
</script>
<style>
/* pages/testdaka/applyChallenge/app;yChallenge.wxss */
page {
    background-image: linear-gradient(to bottom, #7c66f5 6%, #ffffff 38%, #ffffff 55%, #ffffff 100%);
    /* background-image: linear-gradient(to bottom, #7c66f5 10%, #d6d4f9 35% , #e1f0f5 75%, #e9e1f8 100%); */
}
.topBox {
    width: 270rpx;
    height: 70rpx;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    background: white;
    border-radius: 18rpx;
    margin-left: 37rpx;
}
.topBox_image {
    width: 41rpx;
    height: 41rpx;
}
.topBox_day {
    font-size: 27rpx;
    letter-spacing: 2rpx;
}
.centerBox {
    height: 68vh;
    width: 620rpx;
    background: white;
    border-radius: 18rpx;
    margin: 0 auto;
    /* margin-left: 37rpx; */
    margin-top: 25rpx;
    padding: 30rpx;
}
.centerBox_title {
    letter-spacing: 5rpx;
    font-size: 41rpx;
}
.centerBox_tap {
    width: auto;
    height: auto;
    margin-top: 30rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.centerBox_tap_leftBox {
    width: 6rpx;
    height: 27rpx;
    border-radius: 20rpx;
    background: orange;
    margin-left: 5rpx;
}
.centerBox_tap_rightBox {
    margin-left: 20rpx;
    color: orange;
    /* line-height: 27rpx; */
    font-size: 28rpx;
    letter-spacing: 3rpx;
}
.centerBox_textarea {
    margin-top: 20rpx;
    font-size: 28rpx;
    color: rgb(85, 85, 85);
    letter-spacing: 3rpx;
}
.bottomBox {
    background: #7c66f5;
    width: 620rpx;
    padding: 30rpx;
    margin: 0 auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    border-radius: 18rpx;
}
</style>
