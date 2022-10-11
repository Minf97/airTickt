<template>
    <view class="page">
        <view class="contain">
            <view class="user">
                <image :src="content.iconUrl" class="user_iconUrl" />
                <span class="user_nickname">{{ content.nickName }}</span>
                <image src="/static/images/more.png" class="more" v-if="more == 1" @tap="More" />
                <view class="CardMore" v-if="showEdit">
                    <view class="CardMore_background" @tap="More"></view>
                    <view :class="'CardMore_contain ' + edit_style">
                        <view class="CardMore_Title">编辑卡片</view>
                        <view class="DelCard" @tap="DelCard">
                            <image src="/static/images/del.png" class="DelCard" />
                        </view>
                    </view>
                </view>
            </view>
            <swiper
                :indicator-dots="true"
                indicator-color="rgba(223, 223, 223, 0.39)"
                indicator-active-color="rgb(235, 21, 21)"
                :style="'height: ' + (content.ShowHeight > 300 ? 700 + 'rpx' : content.ShowHeight + 'px') + ';'"
            >
                <block class="photo" v-for="(item, index) in content.AllPhoto" :key="item.Photo">
                    <swiper-item class="photo">
                        <image :src="item" mode="aspectFill" style="z-index: 11" @tap="ShowImg" class="ShowImg" :data-index="index" />
                        <view class="image_tabar_local">
                            <image src="/static/pages/more/pages/LoseDetailContent/images/local.png"></image>
                            <text class="image_tabar_text">{{ content.campus }}</text>
                        </view>
                        <view class="image_tabar_local2"></view>
                    </swiper-item>
                </block>
            </swiper>
            <view class="content_first">
                <view class="content_Title">{{ content.Title }}</view>
                <text class="content_Text">{{ content.Text }}</text>
                <view class="content_LabelBox">
                    <!-- <view class="content_Label" >失物</view> -->
                    <view class="content_Label">{{ content.Label }}</view>
                    <view class="content_Label color1">{{ content.LoseType }}</view>
                    <view class="content_Label color2">{{ content.Other }}</view>
                    <span class="content_Label color3">{{ content.LoseTime }}</span>
                </view>
                <view class="content_sec">
                    <view class="content_Time">{{ Time }}</view>
                    <view class="content_Star" v-if="more == 1">
                        <switch :checked="switch1Checked" @change="switch1Change" />
                        <span :class="'content_switch ' + isactive">{{ switch1Checked ? '已找到' : '未找到' }}</span>
                    </view>
                </view>
            </view>
            <view class="Line"></view>
            <view class="comment">
                <view class="All_Comment" v-if="CommentNum != 0">共 {{ CommentNum }} 条评论</view>
                <view class="All_Comment" v-if="CommentNum == 0">这里还没有评论哟~</view>
                <view class="Send_Commend">
                    <image :src="iconUrl" class="text_user" />
                    <span class="old_Comment_second" @tap.native="ReplyComment">
                        <text>"来发句评论吧ヾ(≧▽≦*)o"</text>
                    </span>
                </view>
                <view class="Show_Commend" data-item="item" :data-index="index" v-for="(item, index) in ShowList" :key="item.kk">
                    <!-- bindtap从EditComment更改为obtainIndex -->

                    <view class="fatherComment" @tap="EditComment" :data-bigindex="index">
                        <image :src="item.iconUser" class="text_user" />
                        <span class="text_username">
                            <view class="comment_User">
                                <view class="comment_usename">{{ itemClone.nickName }}</view>
                            </view>
                            <view class="Comment_Content">
                                {{ item.InputContent }}
                                <span class="Comment_Time">{{ item.InputTime }}</span>
                            </view>
                        </span>
                    </view>

                    <view
                        class="showReply"
                        data-item="item"
                        :data-index="index1"
                        @tap="EditComment"
                        :data-bigindex="index"
                        :data-small="index1"
                        v-for="(item, index1) in item.Reply"
                        :key="item.hh"
                    >
                        <image :src="item.iconUser" class="reply_user" />

                        <span class="reply_username">
                            <view class="comment_User">
                                <view class="comment_usename">{{ itemClone.nickName }}</view>
                            </view>
                            <view class="reply_Content">
                                回复
                                <span class="replied">{{ item.Replied }}</span>
                                ：{{ item.InputReply }}
                                <span class="Comment_Time">{{ item.ReplyTime }}</span>
                            </view>
                        </span>
                    </view>

                    <view class="Line_Second"></view>
                </view>
            </view>
        </view>

        <view class="EditCom" v-if="comEdit">
            <view class="EditCom_background" @tap="EditComment"></view>
            <view :class="'EditCom_contain ' + edit_style">
                <view class="EditCom_Title">{{ CommentName }}: {{ CommentContent }}</view>
                <view class="Line"></view>
                <view class="ReplyComment" @tap="ReplyComment" style="color: rgba(0, 89, 255, 0.699)">回复</view>
                <view class="Line"></view>
                <view class="CopyComment" @tap="CopyComment" style="color: rgba(0, 89, 255, 0.699)">复制</view>
                <view class="Line"></view>
                <view class="DelComment" @tap="DelComment" v-if="ShowDelCom == 1" style="color: rgba(255, 0, 0, 0.753)">删除</view>
            </view>
        </view>
        <replyComment
            v-if="comReply"
            :comReply="comReply"
            :edit_style="edit_style"
            :outIndex="outIndex"
            :inIndex="inIndex"
            :CommentList="CommentList"
            :content="content"
            @sendEvent="xx"
            @sendCom="hh"
        ></replyComment>
    </view>
</template>

<script>
import replyComment from '../../components/replyComment/replyComment';
// const { isGeneratorFunction } = require("util/types")
var util = require('../../../../utils/util.js');

var moreUtil = require('../../utils/utils');

var app = getApp();
export default {
    components: {
        replyComment
    },
    data() {
        return {
            CommentList: [],
            showEdit: false,

            // 卡片区删除弹窗
            comEdit: false,

            // 评论区复制/删除弹窗
            comReply: false,

            //控制评论组件的出现
            inIndex: -1,

            //子评论的索引
            Commentindex: -1,

            //主评论的索引
            Starurl: '/static/images/zan1.png',

            //不知道这有啥用，注释掉的话会出现：从主页面取消点赞再进入详细页面，详细页面的点赞图标会没有
            sendCom: [],

            //接受从replyComment组件传递过来的数组，用于增加评论后的渲染
            isactive: 'noactive',

            switch1Checked: false,

            content: {
                iconUrl: '',
                nickName: '',
                ShowHeight: 0,
                AllPhoto: [],
                campus: '',
                Title: '',
                Text: '',
                Label: '',
                LoseType: '',
                Other: '',
                LoseTime: ''
            },

            args: '',
            CommentNum: 0,
            iconUrl: '',
            Time: '',
            more: '',
            edit_style: '',
            ShowDelCom: '',
            CommentName: '',
            CommentContent: '',
            isChecked: false,
            outIndex: '',
            ShowList: ''
        };
    },
    onLoad: function (options) {
        console.log(1111);
        var that = this;
        const args = uni.getStorageSync('args');
        let jsonStr = decodeURIComponent(options.content);
        var content = JSON.parse(jsonStr); // 将JSON帖子信息转成对象

        var more = 0;
        this.setData({
            content,
            args
        }); // 被评论者信息

        if (args.username === content.username) {
            more = 1;
        }

        var Time = util.timeago(that.content.Time, 'Y年M月D日');
        that.username = args.username; // var openusername = {
        //   username: args.username,
        //   iconUrl: args.iconUrl,
        //   nickName: args.nickName
        // }
        // this.data.Star = content.Star
        // this.data.ContentTime = content.Time
        // this.data.CardID = content._id

        wx.cloud.callFunction({
            name: 'CampusCircle',
            data: {
                username: that.username,
                Time: content.Time,
                _id: content._id,
                type: 'readComment'
            },
            success: (res) => {
                console.log(res);
                this.setData({
                    switch1Checked: res.result.data[0].LoseState
                });
                this.CommentList = res.result.data[0].CommentList;

                if (this.CommentList) {
                    this.setData({
                        content: content
                    });
                    this.ShowComment();
                } else {
                    this.CommentList = [];
                    content.CommentList = [];
                    this.setData({
                        CommentNum: 0,
                        content: content
                    });
                }
            }
        }); // 判空

        this.setData({
            iconUrl: args.iconUrl,
            Time: Time,
            more: more
        }); // console.log(content.LoseState)
        // this.setData({switch1Checked:content.LoseState})
    },
    //点赞
    onShow: function () {
        this.ShowComment();
    },
    methods: {
        switch1Change: function () {
            console.log(this.switch1Checked);

            if (this.switch1Checked) {
                this.setData({
                    switch1Checked: false
                });
            } else {
                this.setData({
                    switch1Checked: true
                });
            }

            this.setData({
                isactive: this.switch1Checked ? 'active' : 'noactive'
            }); //更新数据库

            wx.cloud.callFunction({
                name: 'CampusCircle',
                data: {
                    _id: this.content._id,
                    type: 'LoseStateLogs',
                    LoseState: this.switch1Checked
                },

                success(res) {
                    console.log(res);
                }
            }); // 更新全局

            app.globalData.allList.forEach((item) => {
                item.forEach((e) => {
                    // console.log(e._id)
                    console.log(this.content._id);

                    if (e._id === this.content._id) {
                        console.log('我是41行');
                        e.LoseState = this.switch1Checked;
                        console.log(e.LoseState);
                    }
                });
            });
            console.log(app.globalData.allList);
            moreUtil.setAllList(app.globalData.allList, '寻物发布'); // moreUtil.setAllList(app.globalData.allList,"点赞")
            // beforePage.setAllList(e);
            // this.ShowComment()

            console.log(app.globalData.allList);
        },

        callFunction_New: function (type, be_character, Input) {
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
                    _id: that.content._id,
                    Star_User: that.content.Star_User
                },

                success(res) {
                    console.log(res, '调用评论云函数成功');
                },

                fail(e) {
                    if (type === StarControlLogs) {
                        uni.showToast({
                            title: '点赞失败',
                            icon: 'none'
                        });
                    }
                }
            });
        },

        callFunction_Del: function (type, delData) {
            const args = uni.getStorageSync('args');
            var that = this;
            var outIndex = that.Commentindex;
            var inIndex = that.inIndex;
            wx.cloud.callFunction({
                name: 'NewCampusCircle',
                data: {
                    url: 'CommentControl',
                    type: type,
                    username: args.username,
                    _id: that.content._id,
                    index: outIndex,
                    index2: inIndex,
                    delData: delData
                },
                success: (res) => {
                    if (type === 'delComment' || type === 'delReply') {
                        var be_character = {
                            iconUrl: that.content.iconUrl,
                            nickName: that.content.nickName
                        };
                        var type2 = 'CancelCommentControlLogs';
                        that.CommentList.splice(outIndex, 1);
                        that.callFunction_New(type2, be_character);
                        that.ShowComment(); // 更新全局

                        app.globalData.allList.forEach((item, outIndex) => {
                            item.forEach((e, i) => {
                                if (e._id === that.content._id) {
                                    e.CommentList.pop();
                                }
                            });
                        }); // 内外渲染一致

                        moreUtil.setAllList(app.globalData.allList, '评论');
                    }
                },
                fail: (err) => {
                    console.error;
                }
            });
        },

        xx: function (e) {
            //接受从replyComment组件传递过来的值，控制评论组件出现
            setTimeout(() => {
                this.setData({
                    comReply: !e.detail.comReply
                });
            }, 200);
        },

        hh: function (e) {
            //接收从replyComment组件传递来的数组，用于渲染
            if (e.detail.CommentList) {
                this.sendCom = e.detail.CommentList;
                this.ShowComment();
            }
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

        More: function () {
            //控制卡片
            var showEdit = this.showEdit;
            this.popUp();
            this.setData({
                showEdit: !showEdit
            });
        },

        EditComment: function (e) {
            // 3-07 重构本函数
            const args = uni.getStorageSync('args');
            let outIndex = e.currentTarget.dataset.bigindex;
            let inIndex = e.currentTarget.dataset.small;
            var ShowDelCom = 0;
            this.Commentindex = outIndex;
            this.inIndex = inIndex;
            this.popUp();
            this.setData({
                comEdit: !this.comEdit
            });

            if (outIndex != undefined) {
                if (inIndex === undefined) {
                    var nickName = this.CommentList[outIndex].nickName; // 该评论的评论者

                    var username = this.CommentList[outIndex].username; // 该评论的评论者学号

                    var CommentContent = this.CommentList[outIndex].InputComment;
                } else {
                    var nickName = this.CommentList[outIndex].Reply[inIndex].nickName; // 该评论的评论者

                    var username = this.CommentList[outIndex].Reply[inIndex].username; // 该评论的评论者学号

                    var CommentContent = this.CommentList[outIndex].Reply[inIndex].InputReply;
                } // 判断是否本人的评论 -> 凭学号

                if (username === args.username) {
                    ShowDelCom = 1;
                }

                this.setData({
                    ShowDelCom,
                    CommentName: nickName,
                    CommentContent: CommentContent,
                    isChecked: true
                });
            }

            outIndex = 0;
        },

        ReplyComment: function () {
            //控制replyComment组件，并向组件传递数据
            this.popUp();
            this.setData({
                comEdit: false
            });
            setTimeout(() => {
                this.setData({
                    comReply: !this.comReply,
                    outIndex: this.Commentindex,
                    inIndex: this.inIndex,
                    CommentList: this.CommentList,
                    content: this.content
                });
            }, 200);
        },

        DelComment: function () {
            const args = uni.getStorageSync('args');
            var outIndex = this.Commentindex;
            var inIndex = this.inIndex;
            var that = this;
            var delData = that.CommentList[outIndex];
            var type1 = 'delComment';

            if (inIndex != undefined && inIndex != -1) {
                delData = that.CommentList[outIndex].Reply[inIndex];
                type1 = 'delReply';
            }

            uni.showModal({
                title: '提示',
                content: '确定删除?',

                success(res) {
                    that.setData({
                        ShowDelCom: 0
                    });

                    if (res.confirm) {
                        that.callFunction_Del(type1, delData);
                        that.setData({
                            comEdit: !that.comEdit
                        });
                    } else if (res.cancel) {
                        that.setData({
                            ShowDelCom: 1
                        });
                    }
                }
            }); // that.data.inIndex=-1
        },

        CopyComment: function () {
            uni.setClipboardData({
                //准备复制的数据
                data: this.CommentContent,
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

        //删除
        DelCard: function () {
            var that = this;
            const args = uni.getStorageSync('args');
            uni.showModal({
                title: '提示',
                content: '确定删除?',

                success(res) {
                    if (res.confirm) {
                        wx.cloud.callFunction({
                            name: 'CampusCircle',
                            data: {
                                _id: that.content._id,
                                username: args.username,
                                type: 'delCard'
                            },
                            success: (res) => {
                                that.setData({
                                    showEdit: !that.showEdit
                                }); // 更新全局

                                app.globalData.allList.forEach((item, index) => {
                                    item.forEach((e, i) => {
                                        if (e._id === that.content._id) {
                                            app.globalData.allList[index].splice(i, 1);
                                        }
                                    });
                                }); // 内外部渲染一致

                                moreUtil.setAllList(app.globalData.allList, '删除卡片');
                            },
                            fail: (err) => {
                                console.error;
                                that.setData({
                                    showEdit: !that.showEdit
                                });
                            }
                        });
                    }
                }
            });
        },

        // 评论内容判空 返回布尔值：false -> 非空; true -> 空/全是空格
        isNull(str) {
            if (str == '') {
                return true;
            }

            var regu = '^[ ]+$';
            var re = new RegExp(regu);
            return re.test(str);
        },

        ShowComment: function () {
            var Show = [];
            console.log(this.sendCom);

            if (this.sendCom.length != 0) {
                this.CommentList = this.sendCom;
            }

            var copyList = JSON.parse(JSON.stringify(this.CommentList));
            copyList.forEach(function (item) {
                if (item != null) {
                    var AftTime = util.timeago(item.CommentTime, 'Y年M月D日');

                    if (item.Reply != null) {
                        item.Reply.map(function (item2) {
                            item2.ReplyTime = util.timeago(item2.ReplyTime, 'Y年M月D日');
                        });
                    }

                    Show.push({
                        InputContent: item.InputComment,
                        InputTime: AftTime,
                        Star_User: item.Star_User,
                        iconUser: item.iconUser,
                        nickName: item.nickName,
                        username: item.username,
                        Reply: item.Reply
                    });
                }
            });
            app.globalData.allList.forEach((e) => {
                if (e) {
                    if (e._id === this.content._id) {
                        e.CommentList = this.CommentList;
                    }
                }
            });
            this.setData({
                ShowList: Show,
                CommentNum: this.CommentList.length
            });
            this.Commentindex = -1;
            this.inIndex = -1;
        },

        ShowImg: function (e) {
            var Photo = this.content.AllPhoto;
            var index = e.target.dataset.index;
            uni.previewImage({
                current: Photo[index],
                urls: Photo
            });
        }
    }
};
</script>
<style>
.page {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
}
.contain {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.ShowImg {
    z-index: 999;
    background-image: linear-gradient(#ffffff 90%, #c3e8ef);
    /* opacity:0.6; filter: alpha(opacity=60); */
}
.user {
    width: 100%;
    display: flex;
    padding: 10rpx;
}
.user_iconUrl {
    width: 58rpx;
    height: 58rpx;
    border-radius: 100rpx;
    margin-left: 15rpx;
}
.user_nickname {
    position: relative;
    bottom: 15rpx;
    left: 15rpx;
    top: 6rpx;
    color: rgba(128, 128, 128, 0.4);
    white-space: nowrap;
}
.more {
    width: 58rpx;
    height: 58rpx;
    margin-left: 550rpx;
    position: flex;
    /* top: 6rpx; */
}
swiper {
    width: 100%;
}
swiper image {
    width: 100%;
    height: 100%;
}
swiper .wx-swiper-dot {
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    display: inline-flex;
    justify-content: space-between;
}
.content_first {
    padding-top: 17rpx;
    width: 700rpx;
    line-height: 50rpx;
}
.content_Title {
    font-size: 33rpx;
    font-weight: 550;
}
.content_Text {
    font-size: 28rpx;
}
.content_LabelBox {
    display: block;
}
.content_Label {
    display: inline-block;
    color: white;
    background-color: rgba(230, 130, 130, 1);
    font-size: 22rpx;
    line-height: 40rpx;
    padding: 0 8rpx;
    margin-right: 5rpx;
    border-radius: 5rpx;
    opacity: 0.7;
    /* vertical-align: middle; */
    box-sizing: border-box;
}
.content_Time {
    font-size: 23rpx;
    color: rgba(78, 78, 78, 0.541);
    position: relative;
    top: 15rpx;
    margin-bottom: 35rpx;
}
.content_sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.content_Star {
    justify-content: right;
    /* display: none; */

    /* border:1rpx solid #e7e7e7; */
    font-size: 18rpx;
    padding: 10rpx;
    line-height: 10rpx;
    /* border-radius: 20rpx; */
}
.content_Star_img {
    width: 35rpx;
    height: 35rpx;
}
.Line {
    background: #9b9b9b48;
    width: 95%;
    height: 1rpx;
}
.comment {
    width: 100%;
}
.All_Comment {
    font-size: 23rpx;
    margin: 28rpx 20rpx;
    color: rgb(61, 61, 61);
}
.text_user {
    width: 55rpx;
    height: 55rpx;
    border-radius: 100rpx;
    margin-left: 21rpx;
}
.reply_user {
    width: 45rpx;
    height: 45rpx;
    border-radius: 100rpx;
    margin-left: 19rpx;
}
.old_Comment_second {
    width: 630rpx;
    min-height: 56rpx;
    background-color: rgba(202, 202, 202, 0.164);
    margin-top: 2rpx;
    color: rgb(63, 63, 63);
    border-radius: 40rpx;
    margin-left: 20rpx;
    padding-left: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.old_Comment_second textarea {
    width: 95%;
    font-size: 27rpx;
}
.new_Comment_second {
    width: 480rpx;
    min-height: 56rpx;
    background-color: rgba(202, 202, 202, 0.164);
    margin-top: 2rpx;
    color: rgb(63, 63, 63);
    padding-left: 15rpx;
    border-radius: 40rpx;
    margin-left: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.new_Comment_second textarea {
    width: 95%;
    font-size: 27rpx;
}
.Sending {
    color: rgba(63, 63, 63, 0.986);
    font-size: 26rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40rpx;
    background-color: rgba(38, 176, 255, 0.308);
    padding: 0rpx;
    box-shadow: 0px 0px 4px 0px #c7c7c7;
}
.Sending-hover {
    position: relative;
    top: 3rpx;
    box-shadow: 0px 0px 3px rgba(153, 153, 153, 0.507) inset;
}
.Pre_Send {
    height: 58rpx;
    width: 145rpx !important;
    display: flex;
    position: relative;
    left: 15rpx;
}

.Send_Commend {
    display: flex;
    padding-bottom: 20rpx;
    flex-direction: row;
    align-items: center;
}
.Show_Commend {
    position: relative;
    top: 35rpx;
}
.ReplyCom_contain .Send_Commend_Reply {
    width: 95%;
    display: flex;
    padding: 13rpx 0;
    flex-direction: row;
    justify-content: space-between;
}
.text_username {
    color: rgba(94, 94, 94, 0.541);
    font-size: 24rpx;
    position: relative;
    bottom: 68rpx;
    left: 90rpx;
    display: flex;
    flex-direction: column;
}
.reply_username {
    color: rgba(94, 94, 94, 0.541);
    font-size: 24rpx;
    position: relative;
    bottom: 60rpx;
    left: 78rpx;
    display: flex;
    flex-direction: column;
}
.Comment_Content {
    width: 85%;
    color: rgb(54, 54, 54);
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
}
.Line_Second {
    background: #9b9b9b48;
    width: 87%;
    height: 1rpx;
    margin-left: 90rpx;
    position: relative;
    bottom: 32rpx;
}
.Comment_Time {
    font-size: 20rpx;
    color: rgba(94, 94, 94, 0.541);
}
.EditCom,
.ReplyCom,
.EditCom_background,
.ReplyCom_background,
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
.CardMore_background {
    background-color: rgba(0, 0, 0, 0.712);
    opacity: 0.6;
    height: 100%;
}
.CardMore_contain {
    position: relative;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    bottom: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.856);
    padding: 15rpx 0;
    z-index: 99999;
    border-radius: 20rpx;
}
.CardMore_Title {
    position: relative;
    right: 307rpx;
    font-size: 27rpx;
    color: rgba(70, 70, 70, 0.952);
}
.DelCard {
    background-color: rgba(255, 255, 255, 0.966);
    width: 80rpx;
    height: 80rpx;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.DelCard image {
    width: 40rpx;
    height: 40rpx;
}
.EditCom_background,
.ReplyCom_background {
    background-color: rgba(0, 0, 0, 0.171);
    opacity: 0.6;
    height: 100%;
}
.ReplyCom_contain,
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
.CopyComment,
.DelComment,
.ReplyComment {
    width: 100%;
    height: 80rpx;
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    justify-content: center;
    align-items: center;
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

.ReplyCom_background {
    background-color: rgba(0, 0, 0, 0.171);
    opacity: 0.6;
    height: 100%;
}
.ReplyCom_contain {
    position: relative;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    bottom: 30rpx;
    width: 95%;
    padding: 0rpx;
    z-index: 99999;
}
.replycheck {
    width: 670rpx;
    display: flex;
    flex-direction: row;
}
.old_ReplyCom_input {
    width: 100%;
    min-height: 70rpx;
    color: rgb(63, 63, 63);
    background-color: rgb(244, 244, 244);
    border-radius: 10rpx;
    display: flex;
    align-items: center;
}

.old_ReplyCom_input textarea {
    font-size: 30rpx;
    width: 100%;
    height: 70rpx !important;
}
.new_ReplyCom_input {
    width: 520rpx;
    min-height: 56rpx;
    background-color: rgb(244, 244, 244);
    border-radius: 10rpx;
    color: rgb(63, 63, 63);
    display: flex;
    align-items: center;
}
.new_ReplyCom_input textarea {
    font-size: 30rpx;
    width: 100%;
    height: 70rpx !important;
}

.new_ReplyCom_input textarea {
    width: 100%;
    height: 70rpx !important;
}
.Reply_Sending {
    height: 100%;
    color: rgba(63, 63, 63, 0.986);
    font-size: 26rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40rpx;
    background-color: rgba(38, 176, 255, 0.308);
    padding: 0rpx;
    box-shadow: 0px 0px 4px 0px #c7c7c7;
}
.Reply_Sending-hover {
    position: relative;
    top: 3rpx;
    box-shadow: 0px 0px 3px rgba(153, 153, 153, 0.507) inset;
}
.Reply_Send {
    height: 60rpx;
    width: 130rpx !important;
    display: flex;
    align-items: center;
    position: relative;
    left: 32rpx;
}
.fatherComment {
    min-height: 110rpx;
}
.showReply {
    position: relative;
    left: 50rpx;
    bottom: 20rpx;
    min-height: 90rpx;
}
.ct-input {
    position: fixed;
    top: -110rpx;
    right: 0rpx;
    display: flex;
    justify-content: space-between;
    align-items: top;
    width: 100%;
    box-sizing: border-box;
    padding: 20rpx 15rpx;
    background: #f8f8f8;
    z-index: 1000;
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

.ct-input image {
    margin-left: 40rpx;
    width: 40rpx;
    height: 40rpx;
}

.tab-bottom {
    position: fixed;
    padding: 0 34rpx 0 70rpx;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 124rpx;
    background: #fff;
}

.tab-bottom .tb-buy {
    min-width: 210rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
    color: #ffffff;
    text-align: center;
    background: #21326a;
    border-radius: 8rpx;
}

.tab-bottom .tb-left {
    margin-right: 80rpx;
    flex: 1;
    display: flex;
    justify-content: space-between;
}

.tb-item {
    font-size: 0;
    text-align: center;
}

.tb-item image {
    margin-bottom: 16rpx;
    width: 40rpx;
    height: 40rpx;
}

.tb-item view {
    font-size: 20rpx;
    color: #050505;
}

.reply_Content {
    width: 80%;
    color: rgb(54, 54, 54);
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
}
.replied {
    color: rgba(94, 94, 94, 0.541);
}

.reply_show {
    animation: reply_show 0.5s;
}

.reply_hide {
    animation: reply_hide 0.5s;
}

@keyframes reply_show {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0%);
    }
}
@keyframes reply_hide {
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
    .wx-swiper-dot {
        filter: invert(100%) !important;
    }
    .ShowImg {
        filter: invert(1) !important;
    }
    .content_Title,
    .content_Text {
        color: #fff;
        filter: invert(100%) !important;
    }
    .EditCom_Title {
        filter: invert(100%) !important;
        color: white;
    }
    .ct-input input {
        color: #fff;
        background-color: rgba(39, 39, 39, 0.123);
    }
    .content_LabelBox {
        filter: invert(100%) !important;
    }
    .old_Comment_second textarea {
        color: #fff;
        filter: invert(1) !important;
    }
    .new_Comment_second textarea {
        color: #fff;
        filter: invert(1) !important;
    }
    .Comment_Content {
        color: #fff;
        filter: invert(100%) !important;
    }
    .Sending {
        color: #fff;
        filter: invert(100%) !important;
    }
    .EditCom_contain {
        filter: invert(0) !important;
    }
    .EditCom_contain .EditCom_Title,
    .EditCom_contain .ReplyComment,
    .EditCom_contain .CopyComment,
    .EditCom_contain .DelComment {
        filter: invert(1) !important;
        background-color: rgba(29, 29, 29, 0.267);
    }
}
.content_Label {
    display: inline-block;
    color: white;
    /* background-color: rgba(230,130,130,1); */
    background-color: rgba(60, 150, 240, 0.5);
    font-size: 22rpx;
    line-height: 40rpx;
    padding: 0 8rpx;
    margin-right: 5rpx;
    border-radius: 5rpx;
    /* vertical-align: middle; */
    box-sizing: border-box;
}
.content_switch {
    margin-left: 20rpx;
    color: white;
    float: right;
    margin-top: 10rpx;
    /* background-color: rgba(230,130,130,1); */
    font-size: 22rpx;
    line-height: 40rpx;
    padding: 0 8rpx;
    margin-right: 5rpx;
    border-radius: 5rpx;
    height: 40rpx;
    /* vertical-align: middle; */
    /* box-sizing: border-box; */
}
.image_tabar_local2 {
    position: absolute;
    bottom: 0rpx;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
    height: 160rpx;
    width: 100%;
    opacity: 0.25;
}
.comment {
    width: 100%;
}
.All_Comment {
    font-size: 23rpx;
    margin: 28rpx 20rpx;
    color: rgb(61, 61, 61);
}
.Send_Commend {
    display: flex;
    padding-bottom: 20rpx;
    flex-direction: row;
    align-items: center;
}
.text_user {
    width: 55rpx;
    height: 55rpx;
    border-radius: 100rpx;
    margin-left: 21rpx;
}
.reply_user {
    width: 45rpx;
    height: 45rpx;
    border-radius: 100rpx;
    margin-left: 19rpx;
}
.image_tabar_local {
    /* height: 0rpx; */
    position: absolute;
    font-size: 24rpx;
    color: white;
    /* height: 20rpx; */
    padding: 3rpx;
    /* background-color: rgba(105,105,105); */
    /* background-color: #fff; */
    /* opacity: 0.3; */
    z-index: 999;
    border-radius: 15rpx;
    bottom: 20rpx;
    /* color:white; */
    font-size: 24rpx;
    vertical-align: middle;
    margin-left: 20rpx;
}
.old_Comment_second {
    width: 630rpx;
    min-height: 56rpx;
    background-color: rgba(202, 202, 202, 0.164);
    margin-top: 2rpx;
    color: rgb(63, 63, 63);
    border-radius: 40rpx;
    margin-left: 20rpx;
    padding-left: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.old_Comment_second text {
    width: 95%;
    font-size: 27rpx;
    color: #4b4b4bbe;
}
.image_tabar_local image {
    width: 40rpx;
    height: 40rpx;
    vertical-align: middle;
    margin-right: 6rpx;
}
.image_tabar_text {
    vertical-align: middle;
    padding: 0rpx 10rpx;
}
.active {
    background-color: rgba(0, 206, 209, 0.6);
}
.noactive {
    background: rgba(200, 220, 190);
}
.color1 {
    background: rgba(90, 155, 155, 0.5);
}
.color2 {
    background: rgba(255, 215, 0, 0.5);
}
.color3 {
    background: (125, 95, 255, 0.1);
}
@media (prefers-color-scheme: dark) {
    .image_tabar_local {
        filter: invert(0%) !important;
        color: black;
    }
    .image_tabar_local2 {
        filter: invert(100%) !important;
    }
    .content_switch {
        filter: invert(100%) !important;
    }
    .noactive {
        /* filter: invert(100%) !important; */
        background-color: #ffb8b8;
    }
    .color1 {
        filter: invert(0%) !important;
        color: white;
        background: rgba(90, 155, 155, 0.8);
    }
    .color2 {
        background: rgba(255, 215, 0, 0.7);
    }
    .color3 {
        background: rgba(125, 95, 255, 0.6);
    }
    .old_Comment_second textarea {
        color: #fff;
        filter: invert(1) !important;
    }
}
</style>
