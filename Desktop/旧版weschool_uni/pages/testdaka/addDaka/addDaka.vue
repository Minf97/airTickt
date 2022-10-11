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
            <view class="numberShow">
                <view class="numberShow_text">({{ cursor }}/{{ maxlength }})</view>
            </view>
            <!-- 工具栏 -->
            <view :style="'width: 100vw;height: ' + toolbarHight + 'rpx;display: flex;flex-direction: row;border-top: 1rpx solid #f0f0f0;align-items: center;'">
                <view class="toolbar_send" style="margin: 0 auto" @tap="judge">发送打卡</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/testdaka/addPost/addPost.js
export default {
    data() {
        return {
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
            groupdata: {},

            //缓存
            args: {},

            //需要渲染的数据
            groupname: '',

            //选择的打卡挑战
            challenge: {},

            // 下面数据是提交到数据库的
            challengeid: '',

            challengename: '',
            groupuuid: '',
            value: '',
            groupData: '',
            thisChallenge: '',
            newPost: '',
            isupdate: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        var groupData = JSON.parse(options.groupData);
        var thisChallenge = JSON.parse(options.thisChallenge);
        let args = uni.getStorageSync('args');
        this.setData({
            args,
            groupData,
            thisChallenge,
            groupname: groupData.groupName,
            value: '#' + thisChallenge.challengename + '  '
        });
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
    onShow() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        console.log('监听页面卸载');
        console.log(this.newPost);
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({
            newPost: this.newPost,
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
        judge() {
            if (this.value == '') {
                uni.showToast({
                    title: '不能发送空内容',
                    icon: 'error'
                });
            } else {
                this.send();
            }
        },

        abc() {
            const _ = wx.cloud.database().command;
            let challengeid = this.thisChallenge.challengeid; //选择的打卡挑战的id

            let usernum = this.args.username;
            let sendtime = String(new Date());
            wx.cloud
                .database()
                .collection('dakaChallenge_information')
                .where({
                    challengeid: challengeid,
                    'challengeMemberArr.memberUsernum': usernum
                })
                .update({
                    data: {
                        'challengeMemberArr.$.dakalog': _.push(sendtime)
                    }
                });
        },

        send() {
            uni.showLoading({
                title: '发送中',
                mask: true
            }); //上传说说表

            console.log(this.args);
            let args = this.args;
            let wxurl = args.iconUrl;
            let wxname = args.nickName;
            let usernum = args.username;
            let text = this.value;
            let time = new Date(); //获取现在时间

            let sendtime = String(time); //要这个发送时间

            let mylike = false;
            let likenum = 0;
            let likename = [];
            let groupuuid = this.groupData.uuid;
            let comment = [];
            let challengeid = this.thisChallenge.challengeid; //选择的打卡挑战的id

            let challengename = this.thisChallenge.challengename; //选择的打卡挑战的名字

            let uid = this.guid();
            let postid = this.hash(challengeid + uid); //说说的id

            const _ = wx.cloud.database().command;
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
                        wxurl,
                        postid
                    }
                })
                .then((res) => {
                    let myUsernum = this.args.username;
                    let groupUsernum = this.groupData.groupUsername;
                    let isleader = groupUsernum == myUsernum ? true : false;
                    let newPost = {
                        challengeid,
                        challengename,
                        comment,
                        groupuuid,
                        isleader: isleader,
                        likename,
                        likenum,
                        mylike,
                        sendtime: '刚刚',
                        text,
                        usernum,
                        wxname,
                        wxurl,
                        postid
                    }; // console.log(newPost);

                    this.setData({
                        newPost,
                        isupdate: true
                    });
                    wx.cloud
                        .database()
                        .collection('dakaChallenge_information')
                        .where({
                            challengeid: challengeid,
                            'challengeMemberArr.memberUsernum': usernum
                        })
                        .update({
                            data: {
                                'challengeMemberArr.$.dakalog': _.push(sendtime)
                            }
                        });

                    if (this.thisChallenge.isdaka == true) {
                        wx.cloud
                            .database()
                            .collection('dakaChallenge_member')
                            .where({
                                challengeuuid: challengeid,
                                usernum: usernum
                            })
                            .update({
                                data: {
                                    dakalog: _.push(sendtime),
                                    totaldegree: _.inc(+1)
                                }
                            });
                    } else {
                        wx.cloud
                            .database()
                            .collection('dakaChallenge_member')
                            .where({
                                challengeuuid: challengeid,
                                usernum: usernum
                            })
                            .update({
                                data: {
                                    dakalog: _.push(sendtime),
                                    totaldegree: _.inc(+1),
                                    totalday: _.inc(+1)
                                }
                            });
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
                });
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

        //添加标签
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
        }
    }
};
</script>
<style>
/* pages/testdaka/addDaka/addDaka.wxss */
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
