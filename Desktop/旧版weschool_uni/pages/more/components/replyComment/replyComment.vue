<template>
    <view class="ReplyCom">
        <view class="ReplyCom_background" @tap.stop.prevent="ReplyComment"></view>
        <view class="ReplyCom_contain">
            <view class="good-main">
                <input
                    placeholder="说点什么吧…"
                    :focus="true"
                    maxlength="-1"
                    @blur="replyComment.ctBlur"
                    auto-height
                    @focus="replyComment.ctFocus"
                    @linechange="ctLineChange"
                    @input=""
                    @confirm="replySubmit"
                    :show-confirm-bar="false"
                    :adjust-position="false"
                />
            </view>
        </view>
    </view>
</template>
<script module="replyComment" lang="wxs" src="./replyComment.wxs"></script>
<script>
// components/inform.js
var app = getApp();

var moreUtil = require('../../utils/utils');

export default {
    data() {
        return {
            Input: '',
            keyboard_h: '',
            edit_styleClone: '',
            comReplyClone: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        edit_style: {
            type: String,
            default: 'edit_hide'
        },
        comReply: {
            type: String,
            default: 'False'
        },
        outIndex: {
            type: Number,
            default: -1
        },
        inIndex: {
            type: Number,
            default: -1
        },
        CommentList: {
            type: Array,
            default: () => []
        },
        content: {
            type: Object,
            default: () => ({})
        }
    },
    /**
     * 组件的初始数据
     */
    beforeMount: function () {
        // 在组件实例进入页面节点树时执行
        this.popUp();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        popUp: function () {
            var edit_style = this.edit_style; // picker动画样式

            if (edit_style == undefined || edit_style == 'edit_hide') {
                edit_style = 'edit_show';
            } else {
                edit_style = 'edit_hide';
            }

            this.setData({
                edit_styleClone: edit_style
            });
        },

        ReplyComment: function () {
            setTimeout(() => {
                this.setData({
                    comReplyClone: !this.comReply
                });
            }, 200);
            this.$emit('sendEvent', {
                detail: {
                    comReply: this.comReply
                }
            });
        },

        callFunction: function (type, be_character, Input) {
            const args = uni.getStorageSync('args');
            var that = this;
            let character = {
                // 处理得到点赞者信息
                userName: args.username,
                iconUrl: args.iconUrl,
                nickName: args.nickName
            };
            wx.cloud.callFunction({
                name: 'CampusCircle',
                data: {
                    type: type,
                    character: character,
                    be_character: be_character,
                    username: args.username,
                    be_username: that.content.username,
                    content: Input,
                    createTime: new Date().getTime(),
                    arcticle: that.content,
                    arcticle_id: that.content._id,
                    _id: that.content._id
                },

                success(res) {
                    console.log(res, '调用评论云函数成功');
                },

                fail(e) {
                    if (type === 'ReplyCommentControlLogs') {
                        uni.showToast({
                            title: '回复评论失败',
                            icon: 'none'
                        });
                    }

                    if (type === 'CommentControlLogs') {
                        uni.showToast({
                            title: '评论失败',
                            icon: 'none'
                        });
                    }
                }
            });
        },

        isNull(str) {
            if (str == '') {
                return true;
            }

            var regu = '^[ ]+$';
            var re = new RegExp(regu);
            return re.test(str);
        },

        replySubmit: function (e) {
            var that = this;
            let res = that.isNull(e.detail.value);
            var outIndex = that.outIndex;
            var inIndex = that.inIndex;
            var type = 'replyComment';
            const args = uni.getStorageSync('args');

            if (res) {
                uni.showToast({
                    title: '内容不能为空',
                    icon: 'none'
                });
            } else {
                var add = {
                    InputReply: e.detail.value,
                    ReplyTime: new Date().getTime(),
                    iconUser: args.iconUrl,
                    nickName: args.nickName,
                    username: args.username,
                    Replied: '',
                    Star_User: []
                };

                if (outIndex === -1 && inIndex === -1) {
                    add = {
                        InputComment: e.detail.value,
                        CommentTime: new Date().getTime(),
                        iconUser: args.iconUrl,
                        nickName: args.nickName,
                        username: args.username,
                        Reply: [],
                        Star_User: []
                    };
                    var be_character = {
                        userName: that.content.username,
                        iconUrl: that.content.iconUrl,
                        nickName: that.content.nickName
                    };
                    type = 'writeComment';
                } else if (inIndex === -1 || inIndex === undefined) {
                    var be_character = {
                        userName: that.CommentList[outIndex].username,
                        iconUrl: that.CommentList[outIndex].iconUrl,
                        nickName: that.CommentList[outIndex].nickName
                    };
                    add.Replied = be_character.nickName;
                } else {
                    var be_character = {
                        userName: that.CommentList[outIndex].Reply[inIndex].username,
                        iconUrl: that.CommentList[outIndex].Reply[inIndex].iconUrl,
                        nickName: that.CommentList[outIndex].Reply[inIndex].nickName
                    };
                    add.Replied = be_character.nickName;
                }

                wx.cloud.callFunction({
                    name: 'NewCampusCircle',
                    data: {
                        url: 'CommentControl',
                        addData: add,
                        index: outIndex,
                        _id: that.content._id,
                        Time: that.content.Time,
                        username: args.username,
                        type: type
                    },
                    success: (res) => {
                        if (outIndex === -1 && inIndex === -1) {
                            that.CommentList.push(add);
                            app.globalData.allList.forEach((item) => {
                                item.forEach((e) => {
                                    if (e._id === that.content._id) {
                                        e['CommentList'] = that.CommentList;
                                    }
                                });
                            }); // 内外渲染一致

                            moreUtil.setAllList(app.globalData.allList, '评论');
                        } else {
                            that.CommentList[outIndex].Reply.push(add);
                        }

                        uni.hideLoading();
                        this.$emit('sendCom', {
                            detail: {
                                CommentList: that.CommentList
                            }
                        });
                    },
                    fail: (err) => {
                        uni.showToast({
                            title: '请求失败',
                            icon: 'none'
                        });
                        console.error;
                    }
                });
                that.setData({
                    Input: ''
                });

                if (outIndex === -1 && inIndex === -1) {
                    that.callFunction('CommentControlLogs', be_character, e.detail.value);
                } else {
                    that.callFunction('ReplyCommentControlLogs', be_character, e.detail.value);
                }

                that.ReplyComment();
            }

            that.outIndex = -1;
            that.inIndex = -1;
        },

        async ctFocus(e) {
            // 获取键盘高度
            let keyboard_h = e.detail.height;
            this.setData({
                keyboard_h
            });
        },

        ctLineChange() {
            console.log('占位：函数 ctLineChange 未声明');
        }
    },
    watch: {
        edit_style: {
            handler: function (newVal, oldVal) {
                this.edit_styleClone = newVal;
            },

            immediate: true
        },

        comReply: {
            handler: function (newVal, oldVal) {
                this.comReplyClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
.ReplyCom {
    transition: all 2s ease 0;
}

.ReplyCom_contain {
    position: absolute;
    bottom: -10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80rpx;
    padding: 0 15rpx;
    box-sizing: border-box;
    background-color: white;
    opacity: 0;
    transition: all 0.5s ease 0;
}
.good-main {
    width: 100%;
    height: 65rpx;
    border-radius: 15rpx;
}

.good-main input {
    width: 100%;
    height: 100%;
    padding-left: 20rpx;
    background-color: rgba(202, 202, 202, 0.164);
    border-radius: 15rpx;
    box-sizing: border-box;
    z-index: 9999;
}
.ReplyCom {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    font-family: unset;
}

.ReplyCom_background {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    font-family: unset;
    background-color: rgba(0, 0, 0, 0.171);
    opacity: 0.6;
}

.ReplyComment {
    width: 100%;
    height: 80rpx;
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    justify-content: center;
    align-items: center;
}

.ct-input input {
    background-color: #dadada42;
    height: 65rpx;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0rpx 30rpx;
    border-radius: 20rpx;
    flex: 1;
    font-size: 28rpx;
}

.edit_show {
    animation: edit_show 0.5s;
    opacity: 0;
}
.edit_hide {
    animation: edit_hide 0.5s;
    opacity: 0;
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
    input {
        color: white;
        filter: invert(100%) !important;
    }
}
</style>
