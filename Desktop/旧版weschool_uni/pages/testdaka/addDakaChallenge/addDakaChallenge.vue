<template>
    <view>
        <view class="topBox">
            <view class="topBox_view">标题</view>
            <input class="topBox_input" @input="titleInputFun" placeholder="为打卡挑战定一个清晰的目标吧..." type="text" />
        </view>
        <view class="centerBox">
            <view class="centerBox_view">规则</view>
            <textarea class="centerBox_text" @input="textInputFun" placeholder="参与本次打卡挑战有哪些规则？" :maxlength="maxlength"></textarea>
        </view>
        <view class="centerBoxNumber">
            <view class="centerBoxNumber_view">({{ inputNum }}/{{ maxlength }})</view>
        </view>
        <view class="bottomBox">
            <button class="bottomBox_button" @tap="showDayNumFun">
                <view class="bottomBox_button_box1">累计打卡</view>
                <view class="bottomBox_button_box2">{{ checkboxValueFun }}</view>
                <view class="bottomBox_button_box3">></view>
            </button>
            <button class="bottomBox_button" @tap="showDeadLineFun">
                <view class="bottomBox_button_box1">打卡截止时间</view>
                <view class="bottomBox_button_box2">{{ DeadLineValue }}</view>
                <view class="bottomBox_button_box3">></view>
            </button>
        </view>
        <view class="send" @tap="send">发布</view>
        <!-- 累计打卡弹窗 -->
        <view :class="showDayNum ? 'showDayNum' : 'showDayNum_close'">
            <view :class="showDayNum ? 'showDayNum_box' : 'showDayNum_box_close'">
                <view class="showDayNum_box_title">
                    <view class="showDayNum_box_title_cancel" @tap="tuiShowDayNum">取消</view>
                    <view class="showDayNum_box_title_title">累计打卡</view>
                    <view class="showDayNum_box_title_confirm" @tap="showDayNuConfirm">确定</view>
                </view>
                <view class="showDayNum_box_changer">
                    <radio-group class="showDayNum_box_changeBox" @change="checkboxValueFun">
                        <label class="showDayNum_box_changer_radio" v-for="(item, index) in checkboxarr" :key="index">
                            <radio :value="item.value" :checked="checked" :disabled="disabled" color="#7c66f5" />

                            <view>{{ item.name }}天</view>
                        </label>
                    </radio-group>
                </view>
                <view style="height: auto; width: auto; display: flex; flex-direction: row; margin: 0 auto">
                    <input
                        class="showDayNum_box_inputDay"
                        :value="inputDayValue"
                        @input="inputDayinput"
                        @focus="inputDayfocus"
                        @blur="inputDayblur"
                        :placeholder="inputDayPlaceholder"
                        type="text"
                    />
                    <view style="margin-top: 63rpx; color: gray" v-if="!showDay">天</view>
                </view>
                <view class="showDayNum_box_line"></view>
            </view>
        </view>
        <!-- 打卡截止时间弹窗 -->
        <view :class="showDeadLine ? 'showDeadLine' : 'showDeadLine_close'">
            <view :class="showDeadLine ? 'showDeadLine_box' : 'showDeadLine_box_close'">
                <view class="showDeadLine_box_title">
                    <view>打卡截止时间</view>
                </view>
                <radio-group @change="bindChangeRadio">
                    <view class="showDeadLine_box_check">
                        <radio style="margin: 30rpx 0" value="longtime" color="#7c66f5"></radio>
                        <view style="margin-top: 30rpx; margin-left: 30rpx; letter-spacing: 5rpx">长期有效</view>
                    </view>
                    <view style="background-color: rgb(231, 231, 231); width: 100%; height: 1rpx"></view>
                    <view class="showDeadLine_box_input">
                        <view class="showDeadLine_box_input_check">
                            <radio style="margin: 30rpx 0" value="shorttime" color="#7c66f5"></radio>
                            <view style="margin-top: 30rpx; margin-left: 30rpx; letter-spacing: 3rpx">指定截止时间</view>
                        </view>
                        <input
                            class="showDeadLine_box_input_input"
                            @input="showDeadLineInputFun"
                            :disabled="showDeadLineDisabled"
                            :value="showDeadLineInput"
                            placeholder="例:2022年05月20日"
                            type="text"
                            name=""
                            id=""
                        />
                        <view class="showDeadLine_box_input_line"></view>
                    </view>
                </radio-group>
                <view class="showDeadLine_box_bottombox">
                    <view class="showDeadLine_box_bottombox_cancel" @tap="tuiShowDeadLine">取消</view>
                    <view class="showDeadLine_box_bottombox_confirm" @tap="confirmShowDeadLine">确定</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/testdaka/addDakaChallenge/addDakaChallenge.js
export default {
    data() {
        return {
            inputNum: 0,
            maxlength: 500,
            showDayNum: false,
            showDeadLine: false,

            checkboxarr: [
                {
                    name: '7',
                    value: '7'
                },
                {
                    name: '14',
                    value: '14'
                },
                {
                    name: '21',
                    value: '21'
                },
                {
                    name: '30',
                    value: '30'
                },
                {
                    name: '60',
                    value: '60'
                },
                {
                    name: '90',
                    value: '90'
                },
                {
                    name: '180',
                    value: '180'
                },
                {
                    name: '365',
                    value: '365'
                }
            ],

            disabled: false,
            inputDayPlaceholder: '自定义天数',
            showDay: true,
            checked: false,
            inputDayValue: '',
            showDeadLineDisabled: true,
            showDeadLineInput: '',

            //缓存
            args: '',

            // 最后需要上传的数据在这里
            titleInput: '',

            textInput: '',
            checkboxValue: '请选择天数',
            DeadLine: '',
            DeadLineValue: '请填写时间',
            groupData: '',
            isupdate: false,
            newChallenge: '',
            checkboxValueFun: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        var groupData = JSON.parse(options.thisGroupData); // console.log(isupdate);

        let args = uni.getStorageSync('args');
        this.setData({
            args,
            groupData
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
        //发布
        send(e) {
            console.log(e);
            let challengename = this.titleInput; //标题

            let challengeguide = this.textInput; //规则

            let str = this.checkboxValue;
            let lct = str.length - 1;
            let afterStr = str.substr(0, lct);
            let totalday = Number(afterStr); //累计打卡天数

            let deadline = this.DeadLine; //长期有效还是截止时间

            let date = this.DeadLineValue;
            let deadlinetime = this.change(date); //指定截止时间时要填写

            let uid = this.guid();
            let challengeid = this.hash(this.args.username + uid); //打卡挑战id

            let wxurl = this.args.iconUrl; //头像

            let wxname = this.args.nickName; //名字

            let usernum = this.args.username; //学号

            let ispastdue = false; //是否过期

            let groupid = this.groupData.uuid; //小组id

            let challengeMemberArr = [
                {
                    memberName: wxname,
                    memberUrl: wxurl,
                    memberUsernum: usernum,
                    dakalog: []
                }
            ];

            if (challengename == '') {
                uni.showToast({
                    title: '请填写标题',
                    icon: 'none'
                });
            } else if (challengeguide == '') {
                uni.showToast({
                    title: '请填写规则',
                    icon: 'none'
                });
            } else if (totalday == '请选择天数') {
                uni.showToast({
                    title: '请选择累计打卡天数',
                    icon: 'none'
                });
            } else if (deadline == '') {
                uni.showToast({
                    title: '请填写打卡截止时间',
                    icon: 'none'
                });
            } else if (deadlinetime == '') {
                uni.showToast({
                    title: '请填写打卡截止时间',
                    icon: 'none'
                });
            } else {
                uni.showLoading({
                    title: '发布中'
                });
                let newChallenge = {
                    challengename: challengename,
                    deadlinetime: deadlinetime,
                    isdaka: false,
                    isexist: true,
                    peoplenum: 1,
                    totalday: totalday,
                    wxurl: wxurl,
                    challengeid: challengeid,
                    challengeguide: challengeguide,
                    dakalog: []
                };
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];
                console.log(prevPage);
                prevPage.setData({
                    isupdate: true,
                    newChallenge
                });
                console.log('数据填写完成');
                wx.cloud
                    .database()
                    .collection('dakaChallenge_information')
                    .add({
                        data: {
                            challengeguide,
                            challengeid,
                            challengename,
                            deadline,
                            deadlinetime,
                            ispastdue,
                            totalday,
                            usernum,
                            wxname,
                            wxurl,
                            groupid,
                            challengeMemberArr
                        }
                    })
                    .then((res) => {
                        wx.cloud
                            .database()
                            .collection('dakaChallenge_member')
                            .add({
                                data: {
                                    challengename: challengename,
                                    challengeuuid: challengeid,
                                    dakalog: [],
                                    dayrequire: totalday,
                                    iscomplete: false,
                                    totalday: 0,
                                    //累计打卡天数
                                    totaldegree: 0,
                                    //累计打卡次数
                                    usernum: usernum,
                                    wxname: wxname,
                                    wxurl: wxurl
                                }
                            })
                            .then((res) => {
                                uni.hideLoading({
                                    success: (res) => {
                                        uni.navigateBack({
                                            delta: 1
                                        });
                                    }
                                });
                            }); //上传数据库
                    });
            }
        },

        change(date) {
            if (date == '长期有效') {
                let str = '长期有效';
                return str;
            } else {
                let str = date;
                let year = str.slice(0, 4);
                let month = str.slice(5, 7);
                let day = str.slice(8, 10);

                if (month == '01') {
                    month = 'Jan';
                } else if (month == '02') {
                    month = 'Feb';
                } else if (month == '03') {
                    month = 'Mar';
                } else if (month == '04') {
                    month = 'Apr';
                } else if (month == '05') {
                    month = 'May';
                } else if (month == '07') {
                    month = 'Jul';
                } else if (month == '08') {
                    month = 'Aug';
                } else if (month == '09') {
                    month = 'Sep';
                } else if (month == '10') {
                    month = 'Oct';
                } else if (month == '11') {
                    month = 'Nov';
                } else if (month == '12') {
                    month = 'Dec';
                } // Fri May 25 2022 00:00:00 GMT+0800 (中国标准时间)

                let deadline = 'Mon' + ' ' + month + ' ' + day + ' ' + year + ' ' + '00:00:00' + ' ' + 'GMT+0800 (中国标准时间)'; //使用
                // let time = new Date(deadline);

                return deadline;
            }
        },

        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0;
                var v = c == 'x' ? r : (r & 3) | 8;
                return v.toString(16);
            });
        },

        hash(input) {
            var I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');
            var hash = 5389;
            var i = input.length - 1;

            if (typeof input == 'string') {
                for (; i > -1; i--) {
                    hash += (hash << 5) + input.charCodeAt(i);
                }
            } else {
                for (; i > -1; i--) {
                    hash += (hash << 5) + input[i];
                }
            }

            var value = hash & 2147483647;
            var retValue = '';

            do {
                retValue += I64BIT_TABLE[value & 63];
            } while ((value >>= 1));

            return retValue;
        },

        //标题输入
        titleInputFun(e) {
            this.setData({
                titleInput: e.detail.value
            });
        },

        //规则输入
        textInputFun(e) {
            console.log(e);
            this.setData({
                textInput: e.detail.value,
                inputNum: e.detail.cursor
            });
        },

        // 打卡截止时间弹窗
        bindChangeRadio(e) {
            console.log(e.detail.value);

            if (e.detail.value == 'longtime') {
                this.setData({
                    DeadLine: e.detail.value,
                    showDeadLineInput: '',
                    showDeadLineDisabled: true
                });
            } else if (e.detail.value == 'shorttime') {
                this.setData({
                    DeadLine: e.detail.value,
                    showDeadLineDisabled: false
                });
            }
        },

        showDeadLineInputFun(e) {
            console.log(e.detail.value);
            this.setData({
                showDeadLineInput: e.detail.value
            });
        },

        confirmShowDeadLine() {
            let DeadLine = this.DeadLine;
            let showDeadLineInput = this.showDeadLineInput;
            console.log(showDeadLineInput);

            if (DeadLine == 'longtime') {
                this.setData({
                    DeadLineValue: '长期有效',
                    showDeadLine: false
                });
            } else if (DeadLine == 'shorttime' && showDeadLineInput != '') {
                //这里判断输入数据的合法性
                this.setData({
                    DeadLineValue: this.showDeadLineInput,
                    showDeadLine: false
                });
            } else if (showDeadLineInput == '' && DeadLine == 'shorttime') {
                uni.showToast({
                    title: '请填写指定截止时间',
                    icon: 'none'
                });
            }
        },

        tuiShowDeadLine() {
            this.setData({
                showDeadLine: false
            });
        },

        // 累计打卡天数弹窗
        inputDayinput(e) {
            console.log(e.detail.value);
            this.setData({
                inputDayValue: Number(e.detail.value)
            });
        },

        inputDayfocus() {
            this.setData({
                inputDayPlaceholder: '输入1-336',
                // disabled:true,
                showDay: false,
                checked: false
            });
        },

        inputDayblur() {
            this.setData({
                inputDayPlaceholder: '自定义天数',
                disabled: false // showDay:true
            });
            console.log(this.inputDayValue);
            console.log(typeof this.inputDayValue);

            if (this.inputDayValue == '' || this.inputDayValue == null) {
                this.setData({
                    showDay: true
                });
            }
        },

        checkboxValueFun(e) {
            this.setData({
                inputDayValue: '',
                checkboxValue: e.detail.value + '天',
                showDay: true
            });
            console.log(e.detail.value);
        },

        showDayNumFun() {
            this.setData({
                showDayNum: true
            });
        },

        showDeadLineFun() {
            this.setData({
                showDeadLine: true
            });
        },

        showDayNuConfirm() {
            if (this.inputDayValue != '' && (this.inputDayValue > 366 || this.inputDayValue < 1)) {
                uni.showToast({
                    title: '请输入1-366',
                    icon: 'none'
                });
            } else {
                this.setData({
                    showDayNum: false
                });

                if (this.inputDayValue != '') {
                    this.setData({
                        checkboxValue: this.inputDayValue + '天'
                    });
                }
            }
        },

        tuiShowDayNum() {
            this.setData({
                showDayNum: false
            });
        }
    }
};
</script>
<style>
/* pages/testdaka/addDakaChallenge/addDakaChallenge.wxss */
page {
    background: #f6f6f6;
}
.topBox {
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 30rpx;
    height: 160rpx;
}
.topBox_view {
}
.topBox_input {
}
.centerBox {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* padding: 0 30rpx; */
    margin-top: 20rpx;
    background: white;
    height: 500rpx;
}
.centerBox_view {
    margin-left: 30rpx;
}
.centerBox_text {
    width: 700rpx;
    margin: 0 auto;
    height: 390rpx;
}
.centerBoxNumber {
    width: 100vw;
    height: 45rpx;
    margin-top: 10rpx;
    background: white;
    padding-left: 30rpx;
    letter-spacing: 3rpx;
    color: gray;
    font-size: 26rpx;
}
.centerBoxNumber_view {
}
.bottomBox {
    width: 100vw;
    /* height: 300rpx; */
    margin-top: 30rpx;
    background: white;
    position: relative;
}
button:not([size='mini']) {
    margin-left: auto;
    margin-right: auto;
    width: auto;
}
.bottomBox_button {
    background: white;
    /* height: 100rpx; */
    width: 100vw;
    display: flex;
    flex-direction: row;
    color: black;
    font-weight: 500;
    font-size: 27rpx;
    letter-spacing: 3rpx;
    line-height: 70rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    /* margin-left: 30rpx; */
    position: relative;
}
.bottomBox_button_box1 {
}
.bottomBox_button_box2 {
    position: absolute;
    right: 70rpx;
    color: gray;
}
.bottomBox_button_box3 {
    position: absolute;
    right: 30rpx;
    color: gray;
}
/* 累计打卡弹窗 */
.showDayNum_close {
    overflow: hidden;
    height: 10rpx;
    width: 100vw;
    transition: all 0.7s;
    position: fixed;
    bottom: 0;
}

.showDayNum_box_close {
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
.showDayNum {
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
.showDayNum_box {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 550rpx;
    background: white;
    border-radius: 20rpx 20rpx 0 0;
    display: flex;
    flex-direction: column;
    transition: all 0.5s;
}
.showDayNum_box_title {
    /* background: pink; */
    /* font-weight: 600; */
    height: 110rpx;
    width: 90%;
    margin: 0 auto;
    line-height: 120rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.showDayNum_box_title_cancel {
    font-size: 27rpx;
    letter-spacing: 3rpx;
    color: gray;
}
.showDayNum_box_title_title {
    letter-spacing: 3rpx;
}
.showDayNum_box_title_confirm {
    font-size: 27rpx;
    letter-spacing: 3rpx;
    color: #7c66f5;
}
.showDayNum_box_changeBox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
    justify-content: space-between;
    margin-top: 10rpx;
}
.showDayNum_box_changer_radio {
    display: flex;
    flex-direction: row;
    padding: 20rpx 0rpx;
    width: 143rpx;
}
.showDayNum_box_changer {
}
.showDayNum_box_inputDay {
    width: 150rpx;
    height: auto;
    border-bottom: gray;
    /* background: #000; */
    margin: 0 auto;
    margin-top: 60rpx;
}
.showDayNum_box_line {
    width: 300rpx;
    height: 20rpx;
    border-bottom: gray;
    /* background: #000; */
    margin: 0 auto;
    border-bottom: 1rpx solid gray;
}

/* 弹窗结束 */

/* 打卡截止时间弹窗 */
.showDeadLine_close {
    overflow: hidden;
    height: 10rpx;
    width: 100vw;
    transition: all 0.7s;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.showDeadLine_box_close {
    overflow: hidden;
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 1rpx;
    background: white;
    border-radius: 20rpx 20rpx 0 0;
    display: flex;
    flex-direction: column;
    /* transition: all 0.6s; */
    align-items: center;
    justify-content: center;
}
.showDeadLine {
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
    display: flex;
    /* justify-self:end; */
    align-items: center;
    justify-content: center;
}
.showDeadLine_box {
    width: 83vw;
    /* margin: 0 auto; */
    height: auto;
    background: white;
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    transition: all 0.5s;
    padding: 43rpx;
}
.showDeadLine_box_title {
    height: auto;
    width: auto;
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
}
.showDeadLine_box_check {
    display: flex;
    flex-direction: row;
}
.showDeadLine_box_input {
    display: flex;
    flex-direction: column;
}

.showDeadLine_box_input_check {
    display: flex;
    flex-direction: row;
}
.showDeadLine_box_input_input {
    width: 260rpx;
    height: auto;
    border-bottom: gray;
    /* background: #000; */
    margin: 0 auto;
    margin-top: 60rpx;
}
.showDeadLine_box_input_line {
    width: 500rpx;
    height: 20rpx;
    border-bottom: gray;
    /* background: #000; */
    margin: 0 auto;
    border-bottom: 1rpx solid gray;
}
.showDeadLine_box_bottombox {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    /* margin:150rpx; */
    margin-top: 60rpx;
}
.showDeadLine_box_bottombox_cancel {
    color: #7c66f5;
}
.showDeadLine_box_bottombox_confirm {
    color: #7c66f5;
}
/* 弹窗结束 */
.send {
    margin-top: 30rpx;
    background: white;
    width: 100vw;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    letter-spacing: 5rpx;
    font-size: 28rpx;
}
</style>
