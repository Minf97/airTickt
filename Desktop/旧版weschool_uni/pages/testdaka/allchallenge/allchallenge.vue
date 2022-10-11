<template>
    <view>
        <!-- 导航条 -->
        <view class="nav">
            <view class="nav_box">
                <view @tap="navSwitch" data-index="0" :class="navState == 0 ? 'nav-switch-style' : 'nav-switch-style-close'">进行中</view>
                <view :class="navState == 0 ? 'bottomline' : 'bottomline_close'"></view>
            </view>
            <view class="nav_box">
                <view @tap="navSwitch" data-index="1" :class="navState == 1 ? 'nav-switch-style' : 'nav-switch-style-close'">已结束</view>
                <view :class="navState == 1 ? 'bottomline' : 'bottomline_close'"></view>
            </view>
        </view>
        <!-- 滑动页 -->
        <swiper @change="bindchange" :current="navState" class="box" duration="500">
            <swiper-item class="swiperitem">
                <view class="style-roll">
                    <view class="showgroup_card">
                        <scroll-view class="scrollView" :scroll-y="true">
                            <view class="scrollView_card" v-for="(item, index) in challengeArr" :key="index">
                                <view class="scrollView_card_box1">{{ item.totalday }} 天打卡挑战</view>

                                <view class="scrollView_card_box2">{{ item.challengename }}</view>

                                <view class="scrollView_card_box3">{{ item.deadlinetime }}</view>

                                <view class="scrollView_card_box4">
                                    <view class="scrollView_card_box4_leftBox">{{ item.peoplenum }} 人已报名</view>
                                    <view class="scrollView_card_box4_rightBox"><image :src="item.wxurl"></image></view>
                                </view>

                                <view v-if="!item.isexist" @tap="applyChallenge" :data-item="item" class="scrollView_card_box5">去报名</view>

                                <view v-if="item.isexist" @tap="dakaChallenge" :data-item="item" class="scrollView_card_box5">{{ item.isdaka ? '今日已打卡' : '去打卡' }}</view>
                            </view>
                            <view style="width: 100vw; height: 130rpx"></view>
                        </scroll-view>
                    </view>
                    <view class="showgroup_box_turninto">
                        <view @tap="addDaka">发布打卡挑战</view>
                    </view>
                </view>
            </swiper-item>

            <swiper-item class="swiperitem">
                <view class="style-roll">
                    <view class="showgroup_card">
                        <scroll-view class="scrollView" :scroll-y="true">
                            <view class="scrollView_card" v-for="(item, index) in isdeadchallengeArr" :key="index">
                                <view class="scrollView_card_box1">{{ item.totalday }} 天打卡挑战</view>

                                <view class="scrollView_card_box2">{{ item.challengename }}</view>

                                <view class="scrollView_card_box3">{{ item.deadlinetime }}</view>

                                <view class="scrollView_card_box4">
                                    <view class="scrollView_card_box4_leftBox">{{ item.peoplenum }} 人已报名</view>
                                    <view class="scrollView_card_box4_rightBox"><image :src="item.wxurl"></image></view>
                                </view>

                                <!-- <view wx:if="{{!item.isexist}}" class="scrollView_card_box5">去报名</view> -->

                                <view class="scrollView_card_box5">已结束</view>
                            </view>
                        </scroll-view>
                    </view>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
// pages/testdaka/allchallenge/allchallenge.js
export default {
    data() {
        return {
            isupdate: false,
            navState: 0,

            //导航状态
            challengeArr: [
                // {totalday:21,challengename:"打卡挑战标题",deadlinetime:'长期有效',peoplenum:10,wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',isexist:true,isdaka:false,ispastdue:false}
            ],

            isdeadchallengeArr: [
                {
                    totalday: 21,
                    challengename: '打卡挑战标题',
                    deadlinetime: '长期有效',
                    peoplenum: 10,
                    wxurl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',
                    isexist: true,
                    isdaka: false,
                    ispastdue: true
                }
            ],

            args: '',
            groupData: '',
            groupname: '',
            postarr: '',
            newChallenge: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        var groupData = JSON.parse(options.thisGroupData);
        var postarr = JSON.parse(options.thispostarr); // console.log(postarr);
        // console.log(groupData);

        let args = uni.getStorageSync('args');
        this.setData({
            args,
            groupData,
            groupname: groupData.groupName,
            postarr
        });
        let groupid = groupData.uuid;
        let usernum = args.username;
        this.getChallenge(groupid, usernum);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log(this.isupdate);
        console.log(this.newChallenge);

        if (this.newChallenge != null) {
            console.log(this.newChallenge);
            let newChallenge = this.newChallenge;
            let challengeArr = this.challengeArr;
            challengeArr.push(newChallenge);
            this.setData({
                challengeArr,
                newChallenge: null,
                isupdate: true
            });
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        // console.log("监听页面卸载");
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({
            isupdate: this.isupdate
        });
    },
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
        //判断小组过期
        judgePastdue(deadline, deadlinetime, challengeid) {
            if (deadline == 'longtime') {
                console.log('长期有效');
                return false;
            } else if (deadline == 'shorttime') {
                let nowTime = new Date();
                let deadTime = new Date(deadlinetime);
                let [nowYear, nowMonth, nowDate] = [nowTime.getFullYear(), nowTime.getMonth() + 1, nowTime.getDate()];
                let [deadYear, deadMonth, deadDate] = [deadTime.getFullYear(), deadTime.getMonth() + 1, deadTime.getDate()];

                if (nowYear == deadYear) {
                    //年份判断
                    if (nowMonth == deadMonth) {
                        if (nowDate == deadDate) {
                            console.log('没过期');
                            return false;
                        } else if (nowDate > deadDate) {
                            this.upPastdue(challengeid);
                            console.log('过期');
                            return true;
                        } else if (nowDate < deadDate) {
                            console.log('没过期');
                            return false;
                        }
                    } else if (nowMonth < deadMonth) {
                        console.log('没有过期');
                        return false;
                    } else if (nowMonth > deadMonth) {
                        console.log('过期了');
                        this.upPastdue(challengeid);
                        return true;
                    }
                } else if (nowYear > deadYear) {
                    console.log('过期了');
                    this.upPastdue(challengeid);
                    return true;
                } else if (nowYear < deadYear) {
                    console.log('没有过期');
                    return false;
                }
            }
        },

        //获取打卡挑战
        getChallenge(groupid, usernum) {
            uni.showLoading({
                title: '加载中',
                mask: true
            });
            wx.cloud
                .callFunction({
                    name: 'daka',
                    data: {
                        type: 'getAllChallenge',
                        groupId: groupid
                    }
                })
                .then((res) => {
                    console.log(res);
                    let resData = res.result.data;
                    let DATA = this.judegeChallengePastDue(resData);
                    console.log(DATA);
                    let data = DATA.nowChallenge;
                    let psData = DATA.pastDueChallenge;
                    let challengeArr = [];
                    let isdeadchallengeArr = [];

                    for (let i = 0; i < data.length; i++) {
                        let arr = data[i].challengeMemberArr;
                        let isdaka = false;
                        let isexist = false;
                        let ispastdue = this.judgePastdue(data[i].deadline, data[i].deadlinetime, data[i].challengeid);
                        console.log(ispastdue);

                        if (ispastdue == false) {
                            for (let k = 0; k < arr.length; k++) {
                                if (arr[k].memberUsernum == usernum) {
                                    isdaka = arr[k].isDaka;
                                    isexist = true;
                                }
                            }

                            let myDakaLog = this.judgeIsdaka(data[i].challengeMemberArr);
                            let date = data[i].deadlinetime;
                            let deadlinetime = this.timeDue(date);
                            let obj = {
                                totalday: data[i].totalday,
                                challengename: data[i].challengename,
                                deadlinetime: deadlinetime,
                                peoplenum: data[i].challengeMemberArr.length,
                                wxurl: data[i].wxurl,
                                isexist: isexist,
                                isdaka: myDakaLog.isdaka,
                                challengeid: data[i].challengeid,
                                challengeguide: data[i].challengeguide,
                                dakalog: myDakaLog.myDakaLog
                            };
                            challengeArr.push(obj);
                        }
                    }

                    for (let j = 0; j < psData.length; j++) {
                        let arr = psData[j].challengeMemberArr;
                        let isdaka = false;
                        let isexist = false; // for (let k = 0; k < arr.length; k++) {
                        //   if (arr[k].memberUsernum == usernum) {
                        //     isdaka = arr[k].isDaka
                        //     isexist = true
                        //   }
                        // }
                        // let myDakaLog = this.judgeIsdaka(psData[i].challengeMemberArr);

                        let date = psData[j].deadlinetime;
                        let deadlinetime = this.timeDue(date);
                        let obj = {
                            totalday: psData[j].totalday,
                            challengename: psData[j].challengename,
                            deadlinetime: deadlinetime,
                            peoplenum: psData[j].challengeMemberArr.length,
                            wxurl: psData[j].wxurl,
                            isexist: isexist,
                            isdaka: false,
                            challengeid: psData[j].challengeid,
                            challengeguide: psData[j].challengeguide,
                            dakalog: ''
                        };
                        isdeadchallengeArr.push(obj);
                    }

                    this.setData({
                        challengeArr,
                        isdeadchallengeArr
                    });
                })
                .then((res) => {
                    uni.hideLoading();
                });
        },

        // 分出进行中和已结束的打卡挑战
        judegeChallengePastDue(data) {
            let nowChallenge = [];
            let pastDueChallenge = [];

            for (let i = 0; i < data.length; i++) {
                if (data[i].ispastdue == true) {
                    pastDueChallenge.push(data[i]);
                } else if (data[i].ispastdue == false) {
                    nowChallenge.push(data[i]);
                }
            }

            let DATA = {
                nowChallenge: nowChallenge,
                pastDueChallenge: pastDueChallenge
            };
            return DATA;
        },

        //判断我今天是否打卡
        judgeIsdaka(challengeMemberArr) {
            let usernum = this.args.username;
            let nowTime = new Date();
            let [nowYear, nowMonth, nowDate] = [nowTime.getFullYear(), nowTime.getMonth() + 1, nowTime.getDate()];
            let isdaka = false;
            let myDakaLog = [];

            for (let i = 0; i < challengeMemberArr.length; i++) {
                if (usernum == challengeMemberArr[i].memberUsernum) {
                    myDakaLog = challengeMemberArr[i].dakalog; // console.log(challengeMemberArr[k]);

                    for (let k = 0; k < challengeMemberArr[i].dakalog.length; k++) {
                        let dakaTime = new Date(challengeMemberArr[i].dakalog[k]);
                        let [dakaYear, dakaMonth, dakaDate] = [dakaTime.getFullYear(), dakaTime.getMonth() + 1, dakaTime.getDate()];

                        if (nowYear == dakaYear && nowMonth == dakaMonth && nowDate == dakaDate) {
                            isdaka = true;
                        }
                    }
                }
            }

            let mydaka = {
                myDakaLog: myDakaLog,
                isdaka: isdaka
            }; // console.log(mydaka);

            return mydaka;
        },

        //显示时间处理
        timeDue(date) {
            if (date == '长期有效') {
                let time = '长期有效';
                return time;
            } else {
                let time = new Date(date);
                let deadline = '至' + String(time.getFullYear()) + '年' + String(time.getMonth() + 1) + '月' + String(time.getDate()) + '日';
                return deadline;
            }
        },

        //处理过期的打卡挑战
        upPastdue(challengeid) {
            wx.cloud
                .database()
                .collection('dakaChallenge_information')
                .where({
                    challengeid: challengeid
                })
                .update({
                    data: {
                        ispastdue: true
                    }
                });
        },

        //ispastdue是用来拉数据之后for循环分类出两个数组
        //1、一个ispastdue为false的放在challengeArr
        //2、一个ispastdue为true的放在isdeadchallengeArr
        addDaka() {
            let groupData = this.groupData;
            var thisGroupData = JSON.stringify(groupData);
            uni.navigateTo({
                url: '../addDakaChallenge/addDakaChallenge?thisGroupData=' + thisGroupData
            });
        },

        applyChallenge(e) {
            console.log(e);
            let challengeid = e.currentTarget.dataset.item.challengeid;
            let challenge = e.currentTarget.dataset.item;
            let postarr = this.postarr;
            let thisPostarr = [];

            for (let i = 0; i < postarr.length; i++) {
                if (challengeid == postarr[i].challengeid) {
                    thisPostarr.push(postarr[i]);
                }
            }

            var challengePostarr = JSON.stringify(thisPostarr);
            var thisChallenge = JSON.stringify(challenge);
            let groupData = this.groupData;
            var thisGroupData = JSON.stringify(groupData);
            uni.navigateTo({
                url: '../applyChallenge/applyChallenge?challengePostarr=' + challengePostarr + '&thisChallenge=' + thisChallenge + '&thisGroupData=' + thisGroupData
            });
        },

        dakaChallenge(e) {
            console.log(e);
            let challengeid = e.currentTarget.dataset.item.challengeid;
            let challenge = e.currentTarget.dataset.item;
            let postarr = this.postarr;
            let thisPostarr = [];

            for (let i = 0; i < postarr.length; i++) {
                if (challengeid == postarr[i].challengeid) {
                    thisPostarr.push(postarr[i]);
                }
            }

            var challengePostarr = JSON.stringify(thisPostarr);
            var thisChallenge = JSON.stringify(challenge);
            let groupData = this.groupData;
            var thisGroupData = JSON.stringify(groupData);
            let isupdate = this.isupdate;
            uni.navigateTo({
                url:
                    '../dakaChallenge/dakaChallenge?challengePostarr=' +
                    challengePostarr +
                    '&thisChallenge=' +
                    thisChallenge +
                    '&thisGroupData=' +
                    thisGroupData +
                    '&isupdate=' +
                    isupdate
            });
        },

        // 顶部导航栏
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
page {
    background: #f5f6f8;
}
.nav {
    display: flex;
    justify-content: space-around;
    padding: 20rpx;
    font-size: 30rpx;
}
.nav_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.bottomline {
    width: 41rpx;
    height: 5rpx;
    background: #000;
    border-radius: 50rpx;
    margin: 15rpx auto;
}
.bottomline_close {
    width: 41rpx;
    height: 5rpx;
    /* background: #000; */
    border-radius: 20rpx;
    margin: 15rpx auto;
}
.nav-switch-style {
    color: black;
    font-size: 28rpx;
    letter-spacing: 3rpx;
}
.nav-switch-style-close {
    color: gray;
}
.box {
    height: 90vh;
    width: 100%;
}
.style-roll {
    height: auto;
    width: 100%;
    overflow-x: scroll;
}
.swiperitem {
    height: auto;
    width: 100vw;
}
/* .textbox{
  height: 90rpx;
  width: 100%;
  background-color: red;
} */
.style-roll .swiperbox {
    height: 100%;
    width: 100%;
}
.style-roll .swiperbox2 {
    height: 100%;
    width: 100%;
}
.showgroup_card {
    width: 100vw;
    height: 90vh;
    margin-top: 8rpx;
}
.scrollView {
    width: 100vw;
    height: 100%;
}
.scrollView_card {
    background: white;
    margin: 0 auto;
    /* height: 375rpx; */
    height: auto;
    margin-bottom: 30rpx;
    width: 79%;
    border-radius: 15rpx;
    padding: 39rpx;
    display: flex;
    flex-direction: column;
}
.scrollView_card_box1 {
    width: 178rpx;
    height: 43rpx;
    background: #f6f6f6;
    border-radius: 23rpx 23rpx 23rpx 0rpx;
    font-size: 22rpx;
    letter-spacing: 3rpx;
    text-align: center;
    line-height: 45rpx;
    color: #a4a5a7;
    margin-top: 10rpx;
}
.scrollView_card_box2 {
    font-size: 38rpx;
    letter-spacing: 5rpx;
    margin-top: 25rpx;
    margin-bottom: 35rpx;
}
.scrollView_card_box3 {
    color: #a4a5a7;
    font-size: 23rpx;
    margin-bottom: 20rpx;
}
.scrollView_card_box4 {
    color: #a4a5a7;
    font-size: 25rpx;
    margin-bottom: 35rpx;
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
}
.scrollView_card_box4_leftBox {
    color: #a4a5a7;
    width: auto;
    height: auto;
}
.scrollView_card_box4_rightBox {
    overflow: hidden;
    width: auto;
    height: auto;
    position: absolute;
    right: 0;
}
.scrollView_card_box4_rightBox > image {
    width: 41rpx;
    height: 41rpx;
    border-radius: 50%;
}
.scrollView_card_box5 {
    background: #f7f5ff;
    width: auto;
    height: 95rpx;
    text-align: center;
    line-height: 100rpx;
    color: #7c66f5;
    border-radius: 10rpx;
}
.showgroup_box_turninto {
    position: absolute;
    bottom: 30rpx;
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.showgroup_box_turninto > view {
    height: 98rpx;
    width: 450rpx;
    border-radius: 80rpx;
    text-align: center;
    line-height: 98rpx;
    background: #7c66f5;
    color: white;
}
</style>
