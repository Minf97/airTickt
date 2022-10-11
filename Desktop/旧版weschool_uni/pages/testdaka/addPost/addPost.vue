<template>
    <view>
        <!-- 顶部 -->
        <view>
            <view :style="'height: ' + statusBarHeight + 'px;width: 100vw;position: sticky;top: 0;'"></view>
            <view :style="'height: ' + lineHeight + 'px;width: 100vw;display: flex;flex-direction: row;align-items: center;position: sticky;top:' + statusBarHeight + 'px;'">
                <view style="color: gray; font-size: 26rpx; position: absolute; left: 40rpx" @tap="cancel">取消</view>
                <view style="font-size: 28rpx; margin: 0 auto">{{ groupname }}</view>
            </view>
            <view style="width: 100vw; height: 1rpx; border-bottom: 1rpx solid #e2e2e2"></view>
        </view>
        <!-- 输入 -->
        <view>
            <textarea
                :maxlength="maxlength"
                :show-confirm-bar="false"
                confirm-type="send"
                @blur="inputblur"
                :value="value"
                @focus="inputfocus"
                @input="inputText"
                class="ql-container"
                placeholder="点击此处说点什么..."
            ></textarea>
        </view>
        <!-- 工具栏 -->
        <view class="toolbar" :style="'position: absolute;bottom: ' + keyboardHight + 'px;'">
            <!-- 字数显示和任务显示 -->
            <view class="numberShow" v-if="!numberShow">
                <view class="numberShow_text">({{ cursor }}/{{ maxlength }})</view>
            </view>
            <view class="functionShow" v-if="!functionShow">
                <view class="functionShow_list" @tap="showPunch">
                    <image src="/static/pages/testdaka/images/dakaadd.png"></image>
                    <view>打卡</view>
                </view>
                <view class="functionShow_list">
                    <image src="/static/pages/testdaka/images/work.png"></image>
                    <view>作业</view>
                </view>
            </view>
            <!-- 工具栏 -->
            <view :style="'width: 100vw;height: ' + toolbarHight + 'rpx;display: flex;flex-direction: row;border-top: 1rpx solid #f0f0f0;'">
                <image class="toolbar_image1" style="margin-top: 25rpx; margin-left: 35rpx" src="/static/pages/testdaka/images/pictrue.png"></image>
                <image class="toolbar_image1" style="margin-top: 20rpx; margin-left: 45rpx; width: 55rpx; height: 55rpx" src="/static/pages/testdaka/images/wenjianjia.png"></image>
                <image class="toolbar_image1" style="margin-top: 25rpx; margin-left: 45rpx" src="/static/pages/testdaka/images/biaoqing.png"></image>
                <image
                    class="toolbar_image1"
                    style="margin-top: 28rpx; margin-left: 45rpx; width: 37rpx; height: 37rpx"
                    src="/static/pages/testdaka/images/jinghao.png"
                    @tap="tap"
                ></image>
                <view class="toolbar_send" @tap="judge">发送</view>
            </view>
            <!-- 隐藏的底部功能渲染 -->
            <view class="toolbar_showOther" v-if="!showOther">
                <view class="toolbar_showOther_tap">
                    <view class="toolbar_showOther_tao_title">请点击选择打卡标签（标签选择后不能更改）</view>
                    <view class="toolbar_showOther_tap_text"></view>
                    <view class="showDayNum_box_changer">
                        <radio-group class="showDayNum_box_changeBox" @change="checkboxValue">
                            <label class="showDayNum_box_changer_radio" :data-name="item.name" @tap="radio" v-for="(item, index) in checkboxarr" :key="index">
                                <radio :value="item.value" :checked="checked" color="#7c66f5" />

                                <view>{{ item.name }}</view>
                            </label>
                        </radio-group>
                    </view>
                    <view style="width: 100vw; height: 190rpx; display: flex; justify-content: center; align-items: center" v-if="checkboxarr == '' ? true : false">
                        暂无标签，快去创建一个打卡挑战吧
                    </view>
                    <view class="toolbar_showOther_tap_addconfirm" style="bottom: 110rpx; height: 80rpx; line-height: 80rpx" @tap="checkboxconfirm">确定</view>
                    <view class="toolbar_showOther_tap_add" @tap="checkboxcancel">取消</view>
                </view>
                <view></view>
                <view></view>
            </view>
        </view>
        <!-- 打卡弹窗 -->
        <view :class="showgroup ? 'showgroup' : 'showgroup_close'">
            <view :class="showgroup ? 'showgroup_box' : 'showgroup_box_close'">
                <view class="showgroup_box_title">
                    <view style="display: flex">选择打卡挑战</view>
                    <view @tap="closePunch" style="width: 50rpx; height: 50rpx; float: right; line-height: 50rpx; text-align: center; position: absolute; right: 20rpx">×</view>
                </view>
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

                            <view v-if="!item.isexist" :data-item="item" @tap="applyChallenge" class="scrollView_card_box5">去报名</view>

                            <view v-if="item.isexist" :data-item="item" @tap="dakaChallenge" class="scrollView_card_box5">{{ item.isdaka ? '今日已打卡' : '去打卡' }}</view>
                        </view>
                    </scroll-view>
                </view>
                <view class="showgroup_box_turninto">
                    <view @tap="addDaka">发布打卡挑战</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/testdaka/addPost/addPost.js
export default {
    data() {
        return {
            isupdate: false,
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            keyboardHight: 0,
            showOther: true,
            toolbarHight: 120,
            numberShow: true,
            functionShow: false,
            cursor: 0,
            maxlength: 500,
            showgroup: false,
            checked: false,
            challengeid_excessive: '',

            //打卡挑战的数据
            dakachalleng: {},

            //该小组的全部数据
            groupData: {},

            //缓存
            args: {},

            //需要渲染的数据
            abc: false,

            checkboxarr: [
                {
                    name: '标签一',
                    value: 'uuid'
                },
                {
                    name: '标签二',
                    value: 'uuid'
                },
                {
                    name: '标签三',
                    value: 'uuid'
                },
                {
                    name: '标签四',
                    value: 'uuid'
                },
                {
                    name: '标签五',
                    value: 'uuid'
                },
                {
                    name: '标签六',
                    value: 'uuid'
                }
            ],

            // '',空字符串的时候显示暂无标签
            challengeArr: [
                {
                    totalday: 21,
                    challengename: '打卡挑战标题',
                    deadlinetime: '长期有效',
                    peoplenum: 10,
                    wxurl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',
                    isexist: true,
                    isdaka: false
                }
            ],

            groupname: '小组名字',
            value: '',

            //选择的打卡挑战
            challenge: {},

            // 下面数据是提交到数据库的
            challengeid: '',

            challengename: '',
            postarr: '',
            newChallenge: '',
            bqname: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        var groupData = JSON.parse(options.thisGroupData);
        var postarr = JSON.parse(options.thispostarr);
        console.log(postarr); // console.log(groupData);

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
        uni.onKeyboardHeightChange((res) => {
            console.log('wx.onKeyboardHeightChange的res', res);
            this.setData({
                keyboardHight: res.height
            });

            if (res.height > 0) {
                this.setData({
                    toolbarHight: 90
                });
            }
        });
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
        console.log('监听页面卸载');
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        console.log(this.isupdate);
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
        //还有小组过期逻辑
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

        //获取未过期打卡挑战
        getChallenge(groupid, usernum) {
            wx.cloud
                .callFunction({
                    name: 'daka',
                    data: {
                        type: 'getChallenge',
                        groupId: groupid,
                        ispastdue: false
                    }
                })
                .then((res) => {
                    console.log(res);
                    let data = res.result.data;
                    let challengeArr = [];

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

                    this.setData({
                        challengeArr
                    });
                });
        },

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

        judge() {
            if (this.value == '') {
                uni.showToast({
                    title: '请输入内容',
                    icon: 'error'
                });
            } else {
                uni.showLoading({
                    title: '发送中'
                });
                this.send();
            }
        },

        send() {
            console.log(this.args);
            let args = this.args;
            let wxurl = args.iconUrl;
            let wxname = args.nickName;
            let usernum = args.username;
            let text = this.value;
            let sendtime = String(new Date()); //要这个发送时间

            let mylike = false;
            let likenum = 0;
            let likename = [];
            let groupuuid = this.groupData.uuid; //要改

            let comment = [];
            let challengeid = this.challengeid; //选择的打卡挑战的id

            let challengename = this.challengename; //选择的打卡挑战的名字
            //上传数据库

            let challengeuuid = this.challengeid; //选择的打卡挑战的id

            let userNum = args.username; //学号

            let timelog = new Date(); //这三个是更新打卡数据的

            wx.cloud
                .database()
                .collection('personalDynamic')
                .add({
                    data: {
                        challengeid,
                        challengename,
                        comment,
                        groupuuid,
                        likename,
                        likenum,
                        mylike,
                        sendtime,
                        text,
                        usernum,
                        wxname,
                        wxurl
                    }
                })
                .then((res) => {
                    this.setData({
                        isupdate: true
                    });
                    console.log(res);
                    uni.hideLoading({
                        success: (res) => {
                            uni.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }); //这个时间要push到打卡成员表的dakalog
            //打卡成员表里面的打卡总次数加一
            //打卡成员表里面的打卡总天数根据isdaka状态来判断能不能加一
            // let isdaka = 选择的打卡挑战的打卡状态
            //学号加打卡挑战的id寻找对应的打卡挑战成员表，
        },

        //添加标签
        checkboxValue(e) {
            console.log(e.detail.value);
            console.log();
            this.setData({
                challengeid_excessive: e.detail.value
            });
        },

        radio(e) {
            console.log(e.currentTarget.dataset.name);
            this.setData({
                bqname: e.currentTarget.dataset.name
            });
        },

        checkboxconfirm() {
            let bqname = this.bqname;
            let challengeid = this.challengeid;
            let challengeid_excessive = this.challengeid_excessive;

            if (challengeid_excessive == '') {
                uni.showToast({
                    title: '请选择标签',
                    icon: 'none'
                });
            } else {
                if (challengeid == '') {
                    this.setData({
                        value: this.value + '#' + bqname,
                        challengeid: this.challengeid_excessive
                    });
                } else {
                    uni.showToast({
                        title: '标签选择后不能更改噢',
                        icon: 'none'
                    });
                }
            }
        },

        checkboxcancel() {
            this.setData({
                checked: false,
                challengeid_excessive: '',
                showOther: true
            });
        },

        //添加打卡挑战的跳转
        addDaka() {
            let groupData = this.groupData;
            var thisGroupData = JSON.stringify(groupData);
            uni.navigateTo({
                url: '../addDakaChallenge/addDakaChallenge?thisGroupData=' + thisGroupData
            });
        },

        //显示打卡弹窗
        showPunch() {
            this.setData({
                showgroup: true
            });
        },

        //隐藏弹窗
        closePunch() {
            this.setData({
                showgroup: false
            });
        },

        //输入框不聚焦
        inputblur() {
            this.setData({
                toolbarHight: 120,
                functionShow: false,
                numberShow: true
            });
        },

        //输入框聚焦
        inputfocus() {
            this.setData({
                showOther: true,
                functionShow: true,
                numberShow: false
            });
        },

        inputText(e) {
            console.log(e.detail.value);
            console.log(e);
            this.setData({
                cursor: e.detail.cursor,
                value: e.detail.value
            });
        },

        cancel() {
            uni.navigateBack({
                delta: 1
            });
        },

        tap() {
            this.setData({
                showOther: !this.showOther
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
        }
    }
};
</script>
<style>
/* pages/testdaka/addPost/addPost.wxss */

.ql-container {
    box-sizing: border-box;
    width: 100vw;
    height: 43vh;
    font-size: 16px;
    line-height: 1.5;
    overflow: auto;
    padding: 25rpx 39rpx;
    /* border: 1px solid #ECECEC; */
    -webkit-overflow-scrolling: touch; /* 惯性滚动 */
}
.toolbar {
    width: 100vw;
    height: auto;
    /* background: #808080; */
    display: flex;
    flex-direction: column;
    transition: all 0.3s;
}
.toolbar_image1 {
    width: 45rpx;
    height: 45rpx;
    margin-top: 20rpx;
    margin-left: 20rpx;
}
.toolbar_send {
    margin-top: 27rpx;
    margin-left: 290rpx;
    font-size: 28rpx;
    letter-spacing: 5rpx;
}
.toolbar_showOther {
    width: 100vw;
    height: 480rpx;
    position: relative;
}
.toolbar_showOther_tap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
}
.toolbar_showOther_tao_title {
    font-size: 23rpx;
    color: gray;
    margin-left: 35rpx;
    letter-spacing: 3rpx;
}
.toolbar_showOther_tap_add {
    width: 100%;
    height: 100rpx;
    border-top: 1rpx solid gray;
    text-align: center;
    line-height: 100rpx;
    letter-spacing: 5rpx;
    /* position: absolute; */
    /* bottom: 10rpx; */
    font-size: 25rpx;
    margin-top: 0rpx;
}
.toolbar_showOther_tap_addconfirm {
    width: 100%;
    height: 100rpx;
    border-top: 1rpx solid gray;
    text-align: center;
    line-height: 100rpx;
    letter-spacing: 5rpx;
    /* position: absolute; */
    /* bottom: 10rpx; */
    font-size: 25rpx;
    margin-top: 80rpx;
}
.functionShow {
    width: 100vw;
    height: 120rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.functionShow_list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 30rpx;
    width: 150rpx;
    height: 60rpx;
    border: 1rpx solid #e2e2e2;
    border-radius: 50rpx;
}
.functionShow_list > image {
    width: 36rpx;
    height: 36rpx;
}
.functionShow_list > view {
    font-size: 27rpx;
    margin-left: 10rpx;
    letter-spacing: 5rpx;
    line-height: 60rpx;
}
.numberShow {
    width: 100vw;
    height: 90rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.numberShow_text {
    letter-spacing: 5rpx;
    margin-left: 30rpx;
    font-size: 28rpx;
}
/* 弹窗 */
.showgroup_close {
    overflow: hidden;
    height: 10rpx;
    width: 100vw;
    transition: all 0.7s;
    position: fixed;
    bottom: 0;
}

.showgroup_box_close {
    overflow: hidden;
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 1rpx;
    background: white;
    border-radius: 20rpx 20rpx 0 0;
    display: flex;
    flex-direction: column;
    transition: all 0.6s;
}
.showgroup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    font-family: unset;
    background-color: rgba(0, 0, 0, 0.164);
    /* opacity: 0.6; */
    height: 100vh;
    width: 100vw;
    /* transition: all 0.7s; */
}
.showgroup_box {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 1300rpx;
    background: #f6f6f6;
    border-radius: 30rpx 30rpx 0 0;
    display: flex;
    flex-direction: column;
    transition: all 0.5s;
}
.showgroup_box_title {
    /* background: pink; */
    /* font-weight: 600; */
    height: 110rpx;
    width: 100%;
    line-height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.showgroup_box_introduce {
    /* background: gray; */
    height: 50rpx;
    line-height: 50rpx;
    padding: 0 30rpx;
    font-size: 25rpx;
    width: 100%;
    color: rgb(48, 48, 48);
}
.showgroup_box_turninto {
    /* background: pink; */
    margin-top: 100rpx;
    /* height: 100rpx; */
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
.showgroup_card {
    width: 100vw;
    height: 920rpx;
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
/* 标签选择 */
.showDayNum_box_changeBox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
    margin-top: 10rpx;
}
.showDayNum_box_changer_radio {
    display: flex;
    flex-direction: row;
    padding: 20rpx 10rpx;
    width: auto;
}
.showDayNum_box_changer {
}
</style>
