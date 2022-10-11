<template>
    <view>
        <!-- pages/more/pages/saveBureau/bureauContent/bureauContent.wxml -->
        <view class="head">
            <view :style="'height: ' + statusBarHeight + 'px;'" />
            <view class="head_second" :style="'height: ' + lineHeight + 'px;'">
                <view class="arrow" @tap="back">
                    <image src="/static/images/arrow.png" />
                </view>
            </view>
        </view>
        <view :style="'height: ' + (statusBarHeight + lineHeight) + 'px;'"></view>
        <scroll-view>
            <view class="All">
                <view class="member">
                    <view class="memberTitle">局内成员</view>
                    <scroll-view :scroll-x="true" class="memberContent">
                        <view class="icon">
                            <view class="circle">
                                <image :src="iconUrl" class="directoricon" />
                            </view>
                            <view :class="'remake background-color_' + sex"><text>局长</text></view>
                        </view>
                        <view
                            class="icon"
                            @tap="joinIn"
                            :id="index"
                            data-sex="manNum"
                            @longpress="delNum"
                            @touchstart="bindTouchStart"
                            @touchend="bindTouchEnd"
                            v-for="(item, index) in manNum"
                            :key="item.id"
                        >
                            <view class="circle">
                                <image :src="item.iconUrl" class="usericon" v-if="item.iconUrl" />
                                <image src="/static/images/add-bold.png" class="add" v-else />
                            </view>

                            <view class="remake" style="background-color: #5d81cf"><text>成员</text></view>
                        </view>
                        <view
                            class="icon"
                            @tap="joinIn"
                            :id="index"
                            data-sex="womanNum"
                            @longpress="delNum"
                            @touchstart="bindTouchStart"
                            @touchend="bindTouchEnd"
                            v-for="(item, index) in womanNum"
                            :key="item.id"
                        >
                            <view class="circle">
                                <image :src="item.iconUrl" class="usericon" v-if="item.iconUrl" />
                                <image src="/static/images/add-bold.png" class="add" v-else />
                            </view>

                            <view class="remake" style="background-color: #ec7a73"><text>成员</text></view>
                        </view>
                    </scroll-view>
                </view>
                <view class="bureauContent" @tap="charBoxdel">
                    <view class="contentTop">
                        <view class="contentTitle">局情</view>
                        <view style="display: flex; flex-direction: column; position: relative; left: 500rpx">
                            <image src="/static/images/more.png" @tap.stop.prevent="showReport" />
                            <view class="charBox" v-if="charBox">
                                <view class="angle"></view>
                                <view class="report" v-if="args.username != userName" @tap.stop.prevent="report">
                                    <text style="font-weight: 550; font-size: 25rpx; letter-spacing: 3rpx">举报</text>
                                </view>
                                <view class="report" v-else @tap.stop.prevent="delCardFun"><text style="font-weight: 550; font-size: 25rpx; letter-spacing: 3rpx">删除</text></view>
                            </view>
                        </view>
                    </view>
                    <view class="iconAndname">
                        <view class="contentIcon">
                            <image :src="iconUrl" />
                        </view>
                        <view class="contentName">
                            <view class="userName">{{ nickName }}</view>
                            <view class="time">{{ time }}</view>
                        </view>
                    </view>
                    <view class="content">
                        <view class="text">{{ text }}</view>
                        <view class="location">{{ locationName }}</view>
                        <view class="contentImage">
                            <view class="img" v-for="(item, index) in photo" :key="item.id">
                                <image :src="item" mode="aspectFill" />
                            </view>
                        </view>
                        <view class="perch"></view>
                    </view>
                    <view class="contentBottom">
                        <view class="wantTogo" @tap="joinIn" @touchstart="bindTouchStart" @touchend="bindTouchEnd" hover-class="wantTogo2">我想去</view>
                        <button class="share" open-type="share">
                            <image src="/static/images/share(2).png" />
                        </button>
                    </view>
                </view>
                <view class="discussTitle">公开讨论</view>
                <scroll-view class="discuss" :scroll-y="true" enhanced :show-scrollbar="false">
                    <view style="margin-bottom: 20rpx" v-for="(item, index) in showComment" :key="item.id">
                        <view :id="index" @tap="editComment">
                            <view class="iconAndname">
                                <view class="discussIcon">
                                    <image :src="item.iconUrl" />
                                </view>
                                <view class="contentName">
                                    <view class="userName">{{ itemClone.nickName }}</view>
                                    <view class="time">{{ item.time }}</view>
                                </view>
                            </view>
                            <view class="discussContent">{{ item.input }}</view>
                        </view>

                        <view @tap="editComment" :data-in="index1" :data-out="index" v-for="(item, index1) in item.reply" :key="index1">
                            <view class="iconAndname" style="margin-left: 80rpx">
                                <view class="discussIcon" style="width: 65rpx; height: 65rpx">
                                    <image :src="item.iconUrl" />
                                </view>
                                <view class="contentName">
                                    <view class="userName">{{ itemClone.nickName }}</view>
                                    <view class="time">{{ item.time }}</view>
                                </view>
                            </view>

                            <view class="discussContent" style="margin-left: 168rpx">
                                回复
                                <text style="color: #4d7bae">{{ item.replyName }}</text>
                                : {{ item.input }}
                            </view>
                        </view>
                    </view>
                    <view v-if="none" class="none">- 这里什么也没有哦 -</view>
                </scroll-view>
                <view class="perch2"></view>
            </view>
        </scroll-view>
        <form @submit="obatinComment">
            <view class="sendComment">
                <view class="inputComment" @tap.stop.prevent="showInputFun">
                    <textarea
                        placeholder="在此输入公开讨论内容"
                        auto-height
                        @confirm="obatinComment"
                        name="textarea"
                        :focus="showInput"
                        :value="input"
                        confirm-type="send"
                        show-confirm-bar=""
                        cursor-spacing="40rpx"
                    />
                </view>
                <button class="send" form-type="submit" hover-class="send2">发送</button>
            </view>
        </form>
        <view class="EditCom" v-if="comEdit">
            <view class="EditCom_background" @tap="editComment"></view>
            <view :class="'EditCom_contain ' + edit_style">
                <view class="EditCom_Title">{{ CommentName }}: {{ CommentContent }}</view>
                <view class="Line"></view>
                <view class="ReplyComment" @tap="replyComment" style="color: rgba(0, 89, 255, 0.699)">回复</view>
                <view class="Line"></view>
                <view class="CopyComment" @tap="copyComment" style="color: rgba(0, 89, 255, 0.699)">复制</view>
                <view class="Line"></view>
                <view class="DelComment" @tap="delComment" v-if="ShowDelCom" style="color: rgba(255, 0, 0, 0.753)">删除</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/more/pages/saveBureau/bureauContent/bureauContent.js
var app = getApp();

var util = require('../../../../../utils/util.js');

export default {
    data() {
        return {
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            rectHeight: getApp().globalData.rectHeight,
            windowHeight: getApp().globalData.windowHeight,
            commentList: [],
            comEdit: false,

            // 评论区复制/删除弹窗
            charBox: false,

            delCard: false,
            iconUrl: '',
            sex: '',
            locationName: '',
            nickName: '',
            userName: '',
            photo: '',
            text: '',
            time: '',
            clone_id: '',

            args: {
                username: ''
            },

            out: '',
            manNum: '',
            womanNum: '',
            my_id: '',
            edit_style: '',
            showComment: '',
            none: false,
            showInput: false,
            inputComment: '',
            input: '',
            ShowDelCom: '',
            CommentName: '',
            CommentContent: '',
            inIndex: '',
            outIndex: '',
            com: false
        };
    },
    onLoad: function (options) {
        var content = uni.getStorageSync('content');
        const args = uni.getStorageSync('args');
        content.time = util.timeago(content.time, 'Y年M月D日');
        this.readContent(content._id);
        this.setData({
            iconUrl: content.iconUrl,
            sex: content.sex,
            locationName: content.locationName,
            nickName: content.nickName,
            userName: content.userName,
            photo: content.photo,
            text: content.text,
            time: content.time,
            clone_id: content._id,
            args
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
            out: this.out,
            manNum: this.manNum,
            womanNum: this.womanNum,
            commentList: this.commentList,
            delCard: this.delCard,
            my_id: this._id
        });
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var that = this;
        var text = that.text; //获取产品标题

        if (res.from === 'button') {
        } // 来自页面内转发按钮

        return {
            title: text,
            path: '/miniprogram/pages/more/pages//saveBureau/bureauContent/bureauContent'
        };
    },
    methods: {
        back() {
            uni.navigateBack({
                delta: 1 // 返回上一级页面。
            });
        },

        popUp: function () {
            //控制卡片/评论弹窗
            var edit_style = 'edit_hide'; // picker动画样式

            if (edit_style == undefined || edit_style == 'edit_hide') {
                edit_style = 'edit_show';
            } else {
                edit_style = 'edit_hide';
            }

            this.setData({
                edit_style
            });
        },

        /**
         * 生命周期函数--监听页面加载
         */
        joinIn(e) {
            //-----这代码写得太垃圾了，全是if else嵌套
            if (this.endTime - this.startTime < 350) {
                //----解决因长按事件与短按事件同时绑定而引发的冲突
                var result = true;
                var sex = e.currentTarget.dataset.sex;
                const args = uni.getStorageSync('args');
                console.log(args.sex);
                console.log(sex);

                if (e.currentTarget.id) {
                    var index = parseInt(e.currentTarget.id); //----直接获取的e.currentTarget.id类型为string，不能直接使用。需要转为number类型
                }

                var add = {
                    userName: args.username,
                    iconUrl: args.iconUrl,
                    nickName: args.nickName
                };

                if ((sex === 'manNum' && args.sex === 'woman') || (sex === 'womanNum' && args.sex === 'man')) {
                    //-----若点击事件的性别与绑定的性别不一致
                    uni.showToast({
                        title: '请正确选择性别',
                        icon: 'none'
                    });
                    return;
                } else if (this.userName === args.username) {
                    uni.showToast({
                        title: '您已经是局长',
                        icon: 'none'
                    });
                    return;
                } else if ((sex === 'manNum' && !!this.manNum[index].userName) || (sex === 'womanNum' && !!this.womanNum[index].userName)) {
                    uni.showToast({
                        title: '这里已经有人了',
                        icon: 'none'
                    });
                } else if (this.userName != args.username) {
                    //-----判断“我”是不是局长
                    this.manNum.forEach((item) => {
                        if (item.userName === args.username) {
                            uni.showToast({
                                title: '切勿重复加入',
                                icon: 'none'
                            });
                            result = false;
                        }
                    });
                    this.womanNum.forEach((item) => {
                        if (item.userName === args.username) {
                            uni.showToast({
                                title: '切勿重复加入',
                                icon: 'none'
                            });
                            result = false;
                        }
                    });

                    if (result === true) {
                        //-----通过判断用户args.sex，决定用户进男组还是女组
                        if (args.sex === 'man') {
                            if (index != undefined) {
                                this.manNum[index] = add;
                            } else {
                                this.manNum[this.manNum.length - 1] = add;
                            }
                        } else {
                            if (index != undefined) {
                                this.womanNum[index] = add;
                            } else {
                                this.womanNum[this.womanNum.length - 1] = add;
                            }
                        }

                        wx.cloud.callFunction({
                            name: 'saveBureau',
                            data: {
                                manNum: this.manNum,
                                womanNum: this.womanNum,
                                _id: this._id,
                                type: 'bureauMember'
                            },
                            success: (res) => {
                                uni.showToast({
                                    title: '入局成功',
                                    icon: 'none'
                                });
                            },
                            fail: (err) => {
                                console.error;
                            }
                        });
                    }
                }

                this.setData({
                    manNum: this.manNum,
                    womanNum: this.womanNum
                });
            }
        },

        charBoxdel() {
            this.setData({
                charBox: false
            });
        },

        showReport() {
            this.setData({
                charBox: !this.charBox
            });
            // #ifdef MP-WEIXIN
            this.$scope.animate(
                '.charBox',
                [
                    {
                        opacity: 0.3,
                        ease: 'linear'
                    },
                    {
                        opacity: 1,
                        ease: 'linear'
                    }
                ],
                1500
            );
            // #endif
            // #ifndef MP-WEIXIN
            this.animate(
                '.charBox',
                [
                    {
                        opacity: 0.3,
                        ease: 'linear'
                    },
                    {
                        opacity: 1,
                        ease: 'linear'
                    }
                ],
                1500
            );
            // #endif
        },

        report() {
            // wx.navigateTo({
            //   url: '../saveBureau/publishBureau/publishBureau',
            // })
            uni.showToast({
                title: '局长太牛逼了，举报不了',
                icon: 'none'
            });
        },

        delCardFun() {
            var that = this;
            uni.showModal({
                title: '确定删除？',

                success(res) {
                    if (res.confirm) {
                        wx.cloud.callFunction({
                            name: 'saveBureau',
                            data: {
                                _id: that._id,
                                type: 'delBureau'
                            },
                            success: (res) => {
                                uni.showToast({
                                    title: '删除成功!',
                                    icon: 'none'
                                });
                                that.setData({
                                    delCard: true
                                });
                                that.back();
                            },
                            fail: (err) => {
                                console.error;
                                uni.showToast({
                                    title: '删除失败!',
                                    icon: 'none'
                                });
                            }
                        });
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        },

        bindTouchStart: function (e) {
            this.startTime = e.timeStamp;
        },

        bindTouchEnd: function (e) {
            this.endTime = e.timeStamp;
        },

        delNum(e) {
            //----删除入局成员
            const args = uni.getStorageSync('args');
            var index = parseInt(e.currentTarget.id);
            var sex = e.currentTarget.dataset.sex;
            var show = 0;
            var that = this;

            if (sex === 'manNum') {
                if (that.manNum[index].userName === args.username) {
                    show = 1;
                }
            } else {
                if (that.womanNum[index].userName === args.username) {
                    show = 1;
                }
            }

            if (show === 1) {
                uni.showModal({
                    title: '确定删除？',

                    success(res) {
                        if (res.confirm) {
                            if (sex === 'manNum') {
                                that.manNum[index] = 1;
                            } else {
                                that.womanNum[index] = 1;
                            }

                            wx.cloud.callFunction({
                                name: 'saveBureau',
                                data: {
                                    manNum: that.manNum,
                                    womanNum: that.womanNum,
                                    _id: that._id,
                                    type: 'bureauMember'
                                },
                                success: (res) => {
                                    uni.showToast({
                                        title: '出局成功!',
                                        icon: 'none'
                                    });
                                    that.setData({
                                        manNum: that.manNum,
                                        womanNum: that.womanNum,
                                        out: true
                                    });
                                },
                                fail: (err) => {
                                    console.error;
                                    uni.showToast({
                                        title: '出局失败!',
                                        icon: 'none'
                                    });
                                }
                            });
                        }
                    }
                });
            }
        },

        transformTime() {
            var showComment = [];

            if (this.commentList.length != 0) {
                showComment = JSON.parse(JSON.stringify(this.commentList));
                showComment.map((item) => {
                    item.time = util.timeago(item.time, 'Y年M月D日');

                    if (item.reply) {
                        item.reply.map((item) => {
                            item.time = util.timeago(item.time, 'Y年M月D日');
                        });
                    }
                });
                this.setData({
                    showComment,
                    none: false
                });
            } else {
                this.setData({
                    showComment,
                    none: true
                });
            }
        },

        showInputFun() {
            this.setData({
                showInput: true
            });
        },

        obatinComment(e) {
            const args = uni.getStorageSync('args');
            var outIndex = this.outIndex;
            var inIndex = this.inIndex;
            var index = this.index;
            var type = '';
            var indexTemp = -1;

            if (e.detail.value.textarea != '' && e.detail.value != '') {
                this.setData({
                    inputComment: e.detail.value
                });

                if (e.detail.value.textarea) {
                    this.setData({
                        inputComment: e.detail.value.textarea
                    });
                }
            } else {
                uni.showToast({
                    title: '请填写内容！',
                    icon: 'none'
                });
                return;
            }

            var addData = {
                input: this.inputComment,
                userName: args.username,
                time: new Date().getTime(),
                iconUrl: args.iconUrl,
                nickName: args.nickName
            };

            if (outIndex >= 0 || index >= 0) {
                if (inIndex >= 0) {
                    addData.replyName = this.commentList[outIndex].reply[inIndex].nickName;
                } else {
                    if (outIndex >= 0) {
                        addData.replyName = this.commentList[outIndex].nickName;
                    } else {
                        addData.replyName = this.commentList[index].nickName;
                    }
                }

                if (outIndex >= 0) {
                    this.commentList[outIndex].reply.push(addData);
                } else {
                    this.commentList[index].reply.push(addData);
                }

                if (outIndex >= 0) {
                    indexTemp = outIndex;
                } else {
                    indexTemp = index;
                }

                type = 'replyComment';
            } else {
                addData.reply = [];
                this.commentList.push(addData);
                type = 'writeComment';
            }

            wx.cloud.callFunction({
                name: 'saveBureau',
                data: {
                    addData: addData,
                    index: indexTemp,
                    _id: this._id,
                    type: type
                },
                success: (res) => {
                    uni.showToast({
                        title: '评论成功',
                        icon: 'none'
                    });
                    this.transformTime();
                    this.setData({
                        input: '',
                        index: -1
                    });
                },
                fail: (err) => {
                    console.error;
                }
            });
        },

        editComment(e) {
            const args = uni.getStorageSync('args');
            var index = parseInt(e.currentTarget.id);
            var inIndex = e.currentTarget.dataset.in;
            var outIndex = e.currentTarget.dataset.out;
            var ShowDelCom = false;
            var CommentName = '';
            var CommentContent = '';
            this.popUp();

            if (!!this.commentList[index]) {
                if (this.commentList[index].userName === args.username) {
                    ShowDelCom = true;
                }

                CommentName = this.commentList[index].nickName;
                CommentContent = this.commentList[index].input;
            }

            if (!!this.commentList[outIndex]) {
                if (this.commentList[outIndex].reply[inIndex].userName === args.username) {
                    ShowDelCom = true;
                }

                CommentName = this.commentList[outIndex].reply[inIndex].nickName;
                CommentContent = this.commentList[outIndex].reply[inIndex].input;
            }

            this.setData({
                comEdit: !this.comEdit,
                ShowDelCom,
                CommentName,
                CommentContent,
                index,
                inIndex,
                outIndex
            });
        },

        replyComment() {
            this.popUp();
            this.setData({
                showInput: true,
                comEdit: !this.comEdit
            }); // this.obatinComment()
        },

        copyComment() {
            var index = this.index;
            uni.setClipboardData({
                //准备复制的数据
                data: this.commentList[index].input,
                success: function (res) {
                    uni.showToast({
                        title: '复制成功'
                    });
                }
            }); // 改变 edit_style

            this.popUp(); // 改变 comEdit

            this.setData({
                comEdit: !this.comEdit
            });
        },

        delComment() {
            var inIndex = this.inIndex;
            var outIndex = this.outIndex;
            var index = this.index;
            var delData = '';
            var type = '';
            var that = this;

            if (outIndex >= 0) {
                type = 'delReply';
                delData = that.commentList[outIndex].reply[inIndex];
            } else {
                type = 'delComment';
                delData = that.commentList[index];
            }

            uni.showModal({
                title: '确定删除？',

                success(res) {
                    if (res.confirm) {
                        wx.cloud.callFunction({
                            name: 'saveBureau',
                            data: {
                                delData: delData,
                                _id: that._id,
                                outIndex: outIndex,
                                type: type
                            },
                            success: (res) => {
                                if (outIndex >= 0) {
                                    that.commentList[outIndex].reply.splice(inIndex, 1);
                                } else {
                                    that.commentList.splice(index, 1);
                                }

                                that.transformTime();
                                uni.showToast({
                                    title: '删除成功!',
                                    icon: 'none'
                                });
                                that.popUp();
                                that.setData({
                                    comEdit: !that.comEdit,
                                    com: true
                                });
                            },
                            fail: (err) => {
                                console.error;
                                uni.showToast({
                                    title: '删除失败!',
                                    icon: 'none'
                                });
                            }
                        });
                    }
                }
            });
        },

        readContent(_id) {
            wx.cloud.callFunction({
                name: 'saveBureau',
                data: {
                    _id: _id,
                    type: 'readContent'
                },
                success: (res) => {
                    this.commentList = res.result.data[0].commentList;
                    this.transformTime();
                    this.setData({
                        manNum: res.result.data[0].manNum,
                        womanNum: res.result.data[0].womanNum
                    });
                },
                fail: (err) => {
                    console.error;
                    uni.showToast({
                        title: '未找到这张卡片，请刷新！',
                        icon: 'none'
                    });
                }
            });
        }
    },
    watch: {
        _id: {
            handler: function (newVal, oldVal) {
                this.clone_id = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
/* pages/more/pages/saveBureau/bureauContent/bureauContent.wxss */
page {
    background-color: #ffedb7c2;
}
.head {
    position: fixed;
    background-color: #fff2cb;
    z-index: 2;
    width: 100%;
    overflow-x: auto;
}
.head_second {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    width: 100vw;
}

.head image {
    width: 50rpx;
    height: 50rpx;
    margin-left: 34rpx;
    transform: rotate(90deg);
}
.All {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20rpx;
}
.member {
    width: 670rpx;
    height: 170rpx;
    border: 4rpx solid #f8921d;
    /* background-color: white; */
    background: linear-gradient(#ffffffc2, #fff7e1c2);
    border-radius: 20rpx;
    box-shadow: 3px 3px #6b421140;
    padding: 25rpx 0rpx 25rpx 0rpx;
}
.memberTitle {
    font-weight: 550;
    font-size: 30rpx;
    margin-left: 30rpx;
}
.memberContent {
    height: 125rpx;
    margin-top: 15rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    white-space: nowrap;
}
.icon {
    width: 93rpx;
    height: 93rpx;
    display: inline-block;
    margin: 0rpx 8rpx 0rpx 30rpx;
}

.circle {
    background-color: rgb(255, 255, 255);
    height: 100%;
    width: 100%;
    border-radius: 50rpx;
    border: 4rpx solid #df841c;
    box-shadow: 2px 2px #643e1065;
    overflow: hidden;
    position: relative;
}
.add,
.directoricon,
.usericon {
    height: 100%;
    width: 100%;
}
.remake {
    height: 38rpx;
    width: 70rpx;
    position: absolute;
    top: 82rpx;
    margin-left: 16rpx;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.remake text {
    color: white;
    font-size: 22rpx;
    font-weight: 550;
}
.bureauContent {
    width: 612rpx;
    margin-top: 20rpx;
    padding: 30rpx;
    background-color: white;
    border-radius: 20rpx;
    border: 4rpx solid #df841c;
    box-shadow: 2px 2px #643e1065;
    overflow: hidden;
}
.contentTop {
    display: flex;
    flex-direction: row;
}
.contentTop image {
    width: 50rpx;
    height: 50rpx;
}
.contentTitle {
    font-size: 30rpx;
    font-weight: 550;
}
.angle {
    display: flex;
    align-items: center;
    z-index: 2;
    position: absolute;
    top: 47rpx;
    left: 15rpx;
    background-color: rgb(255, 255, 255);
    border-left: 4rpx solid #df841c;
    border-top: 4rpx solid #df841c;
    width: 15rpx;
    height: 15rpx;
    /* margin-top: 26rpx; */
    transform: rotate(45deg);
}
.report {
    width: 125rpx;
    height: 63rpx;
    position: absolute;
    right: -20rpx;
    top: 55rpx;
    border-radius: 10rpx;
    border: 4rpx solid #df841c;
    box-shadow: 2px 2px #643e1065;
    display: flex;
    align-items: center;
    justify-content: center;
}
.iconAndname {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.contentIcon {
    width: 82rpx;
    height: 82rpx;
    border-radius: 50rpx;
    margin-top: 16rpx;
    border: 2rpx solid #df841c;
    overflow: hidden;
}
.contentIcon image {
    height: 100%;
    width: 100%;
}
.contentName {
    height: 82rpx;
    /* width: 510rpx; */
    margin: 16rpx 0rpx 0rpx 20rpx;
    display: flex;
    flex-direction: column;
    line-height: 42rpx;
}
.userName {
    font-weight: 550;
    font-size: 28rpx;
    color: #4d7bae;
}
.time {
    color: #808080;
    font-size: 24rpx;
}
.content {
    width: 612rpx;
    min-height: 100rpx;
    margin-top: 33rpx;
}
.text {
    font-weight: 550;
    font-size: 31rpx;
}
.location {
    font-weight: 550;
    font-size: 28rpx;
    color: #4d7bae;
    margin-top: 8rpx;
}
.contentImage {
    margin-top: 25rpx;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}
.img {
    width: 182rpx;
    height: 182rpx;
    margin: 8rpx;
    border: 4rpx solid #df841c;
}
.img image {
    width: 100%;
    height: 100%;
}
.perch {
    height: 60rpx;
}
.contentBottom {
    display: flex;
    flex-direction: row;
}
.wantTogo {
    height: 80rpx;
    width: 360rpx;
    background-color: #fe6a62;
    position: absolute;
    border-radius: 50rpx;
    margin-left: 58rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 550;
    font-size: 33rpx;
    letter-spacing: 3rpx;
    border: 6rpx solid #a3423dcc;
    box-shadow: inset -2px -3px 1px #d82016a2, inset 1px 3px 1px #fba9a2d3;
}
.wantTogo2 {
    height: 80rpx;
    width: 360rpx;
    background-color: #fe6a62;
    position: absolute;
    border-radius: 50rpx;
    margin-left: 58rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 550;
    font-size: 33rpx;
    letter-spacing: 3rpx;
    border: 6rpx solid #a3423dcc;
    box-shadow: 0px 0px 10px #91150ea2 inset;
}
.share {
    height: 93rpx !important;
    width: 145rpx !important;
    background-color: #fe6a62;
    position: absolute;
    margin-left: 443rpx !important;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 550;
    border: 6rpx solid #a3423dcc;
    box-shadow: inset -2px -3px 1px #d82016a2, inset 1px 3px 1px #fba9a2d3;
}
.share image {
    height: 40rpx;
    width: 40rpx;
}
::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
}
.discussTitle {
    width: 210rpx;
    height: 60rpx;
    background-color: white;
    border-top: 4rpx solid #df841c;
    border-left: 4rpx solid #df841c;
    border-right: 4rpx solid #df841c;
    box-shadow: 2px -1px #643e1065;
    margin-top: 100rpx;
    margin-right: 461rpx;
    position: relative;
    top: 4rpx;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 550;
    font-size: 30rpx;
}
.discuss {
    width: 81.5%;
    height: 70vh;
    padding: 0rpx 30rpx 30rpx 30rpx;
    background-color: white;
    border: 4rpx solid #df841c;
    box-shadow: 2px 2px #643e1065;
    border-top-right-radius: 20rpx;
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
}
.discussIcon {
    width: 75rpx;
    height: 75rpx;
    border-radius: 50rpx;
    margin-top: 13rpx;
    border: 2rpx solid #df841c;
    overflow: hidden;
}
.discussIcon image {
    width: 100%;
    height: 100%;
}
.discussContent {
    /* width: 620rpx; */
    margin-left: 98rpx;
    font-size: 30rpx;
    font-weight: 550;
    margin-top: 3rpx;
}
.none {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60rpx;
    color: #4b4b4b8c;
    font-size: 25rpx;
}
.perch2 {
    height: 180rpx;
}
.sendComment {
    width: 100%;
    min-height: 145rpx;
    background-color: #ffe69c;
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border-top: 4rpx solid #e68f2c91;
}
.inputComment {
    background-color: rgba(255, 255, 255, 0.842);
    min-height: 75rpx;
    width: 62%;
    border-radius: 60rpx;
    border: 3rpx solid #e68f2cbd;
    box-shadow: 2px 2px #643e1065;
    display: flex;
    align-items: center;
    padding: 10rpx 30rpx;
}
.inputComment textarea {
    width: 100%;
    font-size: 32rpx;
}
.send {
    height: 90rpx;
    width: 170rpx !important;
    background-color: #fe6a62;
    margin-left: 26rpx !important;
    margin-right: 0rpx !important;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 550;
    font-size: 30rpx;
    border: 6rpx solid #a3423dcc;
    box-shadow: inset -3px -3px 1px #d82016a2, inset 3px 3px 1px #fba9a2d3;
}
.send2 {
    height: 90rpx;
    width: 170rpx !important;
    background-color: #fe6a62;
    margin-left: 26rpx !important;
    margin-right: 0rpx !important;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 550;
    font-size: 30rpx;
    border: 6rpx solid #a3423dcc;
    box-shadow: 0px 0px 10px #91150ea2 inset;
}
.EditCom,
.EditCom_background,
.CardMore,
.CardMore_background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    font-family: unset;
    display: flex;
    align-items: center;
    justify-content: center;
}
.EditCom_background {
    background-color: rgba(0, 0, 0, 0.171);
    opacity: 0.6;
    height: 100%;
}
.EditCom_contain {
    position: relative;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    bottom: 30rpx;
    width: 95%;
    background-color: rgb(244, 244, 244);
    padding: 0rpx;
    z-index: 99999;
    border-radius: 20rpx;
}
.EditCom_Title {
    font-size: 27rpx;
    color: rgba(70, 70, 70, 0.952);
    padding: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
}
.ReplyComment,
.CopyComment,
.DelComment {
    width: 100%;
    height: 80rpx;
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    justify-content: center;
    align-items: center;
}
.background-color_man {
    background-color: #5d81cf;
}
.background-color_woman {
    background-color: #ec7a73;
}
.edit_show {
    animation: edit_show 0.5s;
}
.edit_hide {
    animation: edit_hide 0.5s;
}
@keyframes edit_show {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0%);
    }
}
@keyframes edit_hide {
    0% {
        opacity: 1;
        transform: translateY(0%);
    }
    100% {
        opacity: 0;
        transform: translateY(100%);
    }
}
@media (prefers-color-scheme: dark) {
    .head {
        filter: invert(1) !important;
    }
    image {
        filter: invert(0) !important;
    }
    scroll-view {
        filter: invert(100%) !important;
        z-index: 37 !important;
    }
    .All {
        filter: invert(0) !important;
    }
    .head {
        position: fixed;
        background-color: #0a0a0a;
    }
    .member {
        background: linear-gradient(#ffffff, #ffefc5);
    }
    .memberContent {
        filter: invert(1) !important;
    }
    .circle {
        filter: invert(1) !important;
    }
    .circle image {
        filter: invert(0) !important;
    }
    .background-color_woman {
        filter: invert(1) !important;
    }
    .background-color_man {
        filter: invert(1) !important;
    }
    .remake {
        filter: invert(1) !important;
    }
    .contentIcon image {
        filter: invert(0) !important;
    }
    .discussTitle {
        filter: invert(0) !important;
    }
    .discuss {
        filter: invert(0) !important;
    }
    .discussIcon image {
        filter: invert(0) !important;
    }
    .send {
        filter: invert(0) !important;
    }
    .contentTop image {
        filter: invert(0) !important;
    }
    .sendComment {
        filter: invert(1) !important;
        position: fixed;
    }
    .contentImage image {
        filter: invert(0) !important;
    }
    .share {
        filter: invert(0) !important;
    }
    .share image {
        filter: invert(0) !important;
    }
}
</style>
