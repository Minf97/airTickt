<template>
    <view>
        <view class="textBox_post">
            <view class="textBox_post_topBox">
                <view class="textBox_post_topBox_userUrl">
                    <image src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132"></image>
                </view>
                <view class="textBox_post_topBox_userInfo">
                    <view class="textBox_post_topBox_userInfo_name">
                        <view class="textBox_post_topBox_userInfo_name_name">{{ post.wxname }}</view>
                        <view class="textBox_post_topBox_userInfo_name_title" v-if="post.isleader">组长</view>
                    </view>
                    <view class="textBox_post_topBox_userInfo_time">{{ post.sendtime }}</view>
                </view>
                <view class="textBox_post_topBox_right"><view></view></view>
            </view>
            <view class="textBox_post_textBox">
                <!-- <view style="color: #6f7f8f;margin-right: 10rpx;">#打卡</view> -->
                <view>{{ post.text }}</view>
            </view>
            <view class="textBox_post_zan" v-if="!(post.likenum == 0 ? true : false)">
                <image class="textBox_post_zan_image" src="/static/pages/testdaka/showPost/image/yidianzan.png"></image>
                <view class="textBox_post_zan_name" v-for="(item, index) in post.likename" :key="index">{{ item }}</view>
            </view>
            <view class="textBox_post_bigZan" @tap="clickLike">
                <image class="textBox_post_bigZan_image" :src="post.mylike ? './image/yidianzan.png' : './image/weidianzan.png'"></image>
            </view>
            <view style="margin: 20rpx 30rpx; color: gray; font-size: 26rpx">评论({{ post.comment.length }})</view>
            <view class="textBox_post_line"><view></view></view>
        </view>
        <view class="comment" v-for="(item, index) in post.comment" :key="index">
            <view class="textBox_post_topBox">
                <view class="textBox_post_topBox_userUrl">
                    <image src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132"></image>
                </view>
                <view class="textBox_post_topBox_userInfo">
                    <view class="textBox_post_topBox_userInfo_name">
                        <view class="textBox_post_topBox_userInfo_name_name" style="color: rgb(141, 141, 180)">{{ item.name }}</view>
                        <view class="textBox_post_topBox_userInfo_name_title" v-if="item.isleader">组长</view>
                    </view>
                    <view class="textBox_post_topBox_userInfo_time">{{ item.time }}</view>
                </view>
                <!-- <view class="textBox_post_topBox_right"><view></view></view> -->
            </view>

            <view class="comment_comment">
                <view>{{ item.text }}</view>
            </view>
        </view>
        <view style="height: 170rpx; width: 100vw; display: flex; justify-content: center; font-size: 25rpx; letter-spacing: 5rpx; line-height: 60rpx">无更多评论</view>
        <!-- 工具栏 -->
        <view class="toolbar" :style="'position: fixed;bottom: ' + keyboardHight + 'px;'">
            <!-- 字数显示和任务显示 -->
            <!-- <view class="numberShow">
        <view class="numberShow_text">({{cursor}}/{{maxlength}})</view>
    </view> -->
            <!-- 工具栏 -->
            <view
                :style="
                    'width: 100vw;height: ' +
                    toolbarHight +
                    'rpx;display: flex;flex-direction: row;border-top: 1rpx solid #f0f0f0;align-items: center;justify-content: center;background-color: white;'
                "
            >
                <input
                    class="toolbar_input"
                    placeholder-style="margin-left:25rpx"
                    placeholder='"来发句评论吧ヾ(≧▽≦*)o"'
                    :value="text"
                    :adjust-position="false"
                    type="text"
                    @input="input"
                />
                <view class="toolbar_send" @tap="addcomment">发送</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/testdaka/showPost/showPost.js
export default {
    data() {
        return {
            isupdate: false,
            zanArr: [1],
            mylike: false,

            // 渲染数据
            value: '',

            toolbarHight: 110,
            keyboardHight: 0,

            // 还要小组的信息
            post: {
                comment: '',
                mylike: false,
                likename: '',
                likenum: '',
                wxname: '',
                isleader: '',
                sendtime: '',
                text: ''
            },

            // {wxname:'Start from scratch',wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:"20034480214",text:'第一条个人动态',sendtime:'刚刚',mylike:true,likenum:1,likename:['名字1','名字2'],groupuuid:'小组id',comment:[{name:'微信名',text:'评论内容',time:'刚刚',url:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:'20034480214',isleader:true}],challengename:'打卡挑战的名字',challengeid:'打卡挑战的id',_id:'数据库自动生成的id作为说说id使用',isleader:true},
            //输入框获取
            text: '',

            args: '',
            myname: '',
            myurl: '',
            updatePost: '',
            postindex: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        var post = JSON.parse(options.thisPostData);
        let args = uni.getStorageSync('args');
        var index = options.index;
        this.trimPostData(post);
        this.setData({
            args,
            myname: args.nickName,
            myurl: args.iconUrl,
            index
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
        let updatePost = this.post; // console.log("监听页面卸载");

        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.setData({
            isupdate: this.isupdate,
            updatePost,
            postindex: this.index
        }); //注意主页post和打卡挑战post是否会相互影响
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
        //发布评论
        addcomment() {
            if (this.text == '') {
                uni.showToast({
                    title: '请输入评论',
                    icon: 'error'
                });
            } else {
                let name = this.args.nickName;
                let text = this.text;
                let time = new Date();
                let url = this.args.iconUrl;
                let usernum = this.args.username;
                let postid = this.post.postid; //数据库索引

                let addcomment = {
                    name: name,
                    text: text,
                    time: time,
                    url: url,
                    usernum: usernum
                }; //下面是setdata的

                let comment = this.post.comment;
                let timeStamp = time.getTime();
                let whenSend = this.timeShow(timeStamp);
                let addComment = {
                    name: name,
                    text: text,
                    time: time,
                    url: url,
                    usernum: usernum
                };
                addComment.time = whenSend;
                uni.showLoading({
                    title: '发送中',
                    mask: true
                });
                comment.push(addComment);
                this.setData({
                    'post.comment': comment,
                    text: '',
                    isupdate: true
                });
                const _ = wx.cloud.database().command;
                wx.cloud
                    .database()
                    .collection('personalDynamic')
                    .where({
                        postid: postid
                    })
                    .update({
                        data: {
                            comment: _.push(addcomment)
                        }
                    })
                    .then((res) => {
                        uni.hideLoading();
                    });
            }
        },

        input(e) {
            // console.log(e);
            let text = e.detail.value;
            console.log(text);
            this.setData({
                text
            });
        },

        //点赞
        clickLike() {
            uni.showLoading({
                title: '点赞中',
                mask: true
            });
            console.log('点赞');
            let myname = this.args.nickName;
            let likenameArr = this.post.likename;
            let mylike = this.post.mylike;
            let postid = this.post.postid;
            const _ = wx.cloud.database().command;

            if (mylike) {
                // 已经点赞
                likenameArr.splice(likenameArr.length - 1, 1);
                this.setData({
                    'post.mylike': false,
                    'post.likename': likenameArr,
                    'post.likenum': this.post.likenum - 1,
                    isupdate: true
                });
                wx.cloud
                    .database()
                    .collection('personalDynamic')
                    .where({
                        postid: postid
                    })
                    .update({
                        data: {
                            mylike: false,
                            likename: _.pop(myname),
                            likenum: _.inc(-1)
                        }
                    })
                    .then((res) => {
                        uni.hideLoading();
                    });
            } else {
                //未点赞
                likenameArr.push(myname);
                this.setData({
                    'post.mylike': true,
                    'post.likename': likenameArr,
                    'post.likenum': this.post.likenum + 1,
                    isupdate: true
                });
                wx.cloud
                    .database()
                    .collection('personalDynamic')
                    .where({
                        postid: postid
                    })
                    .update({
                        data: {
                            mylike: true,
                            likename: _.push(myname),
                            likenum: _.inc(+1)
                        }
                    })
                    .then((res) => {
                        uni.hideLoading();
                    });
            }
        },

        trimPostData(postData) {
            let comment = postData.comment;
            console.log(comment);

            for (let i = 0; i < comment.length; i++) {
                //评论发送时间判断
                let sendtime = comment[i].time;
                let timestamp = new Date(sendtime).getTime();
                console.log(timestamp);
                let whenSend = this.timeShow(timestamp);
                comment[i].time = whenSend;
                console.log(comment[i].time);
            }

            let post = {
                wxname: postData.wxname,
                wxurl: postData.wxurl,
                usernum: postData.usernum,
                text: postData.text,
                sendtime: postData.sendtime,
                mylike: postData.mylike,
                likenum: postData.likenum,
                groupuuid: postData.groupuuid,
                comment: postData.comment,
                challengename: postData.challengename,
                challengeid: postData.challengeid,
                _id: postData._id,
                isleader: postData.isleader,
                likename: postData.likename,
                postid: postData.postid
            };
            this.setData({
                post
            });
        },

        //获取评论/帖子时间 参数：时间戳
        timeShow(timestamp) {
            // 保留原始的时间
            let result = ''; //把分，时，天，周，半个月，一个月用毫秒表示

            let minute = 1000 * 60;
            let hour = minute * 60;
            let day = hour * 24;
            let week = day * 7;
            let halfamonth = day * 15;
            let month = day * 30; //获取当前时间毫秒

            let now = new Date().getTime(); //时间差

            let diffValue = now - timestamp; // 超过当前时间,直接return

            if (diffValue < 0) {
                return result;
            } //计算时间差的分，时，天，周，月

            let minC = diffValue / minute;
            let hourC = diffValue / hour;
            let dayC = diffValue / day;
            let weekC = diffValue / week;
            let monthC = diffValue / month;

            if (monthC >= 1 && monthC <= 3) {
                result = parseInt(monthC) + '月前';
            } else if (weekC >= 1 && weekC <= 3) {
                result = parseInt(weekC) + '周前';
            } else if (dayC >= 1 && dayC <= 6) {
                result = parseInt(dayC) + '天前';
            } else if (hourC >= 1 && hourC <= 23) {
                result = parseInt(hourC) + '小时前';
            } else if (minC >= 1 && minC <= 59) {
                result = parseInt(minC) + '分钟前';
            } else if (diffValue >= 0 && diffValue <= minute) {
                result = '刚刚';
            } else {
                // 时间太久
                result = timestamp;
            } // 最后return出来

            return result;
        }
    }
};
</script>
<style>
/* pages/testdaka/showPost/showPost.wxss */
.textBox_post {
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    margin-top: 30rpx;
}
.textBox_post_topBox {
    width: 100%;
    height: auto;
    /* background: gray;  */
    display: flex;
    flex-direction: row;
    margin-top: 30rpx;
}
.textBox_post_topBox_userUrl {
    width: 15%;
    height: auto;
    display: flex;
    justify-content: center;
    /* background: pink; */
}
.textBox_post_topBox_userUrl > image {
    width: 55rpx;
    height: 55rpx;
    border-radius: 50%;
    /* margin-top: 30rpx; */
}
.textBox_post_topBox_userInfo {
    display: flex;
    flex-direction: column;
    /* margin-top: 30rpx; */
}
.textBox_post_topBox_userInfo_name {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.textBox_post_topBox_userInfo_name_name {
    color: #fda959;
    font-size: 27rpx;
    letter-spacing: 2rpx;
}
.textBox_post_topBox_userInfo_name_title {
    background: #fda959;
    color: white;
    width: 60rpx;
    height: 30rpx;
    border-radius: 10rpx;
    margin-left: 15rpx;
    font-size: 18rpx;
    text-align: center;
    line-height: 30rpx;
    letter-spacing: 2rpx;
}
.textBox_post_topBox_userInfo_time {
    color: #b3b3b3;
    font-size: 18rpx;
    letter-spacing: 1rpx;
}
.textBox_post_topBox_right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 35rpx;
}
.textBox_post_topBox_right > view {
    width: 0px;
    height: 0px;
    border-width: 4px;
    border-style: solid;
    border-color: #b3b3b3 transparent transparent transparent;
    /* margin-left: 365rpx; */
}
.textBox_post_textBox {
    display: flex;
    flex-wrap: wrap;
    margin-top: 15rpx;
    width: 670rpx;
    height: auto;
    margin: 50rpx auto;
    font-size: 26rpx;
    flex-wrap: wrap;
}
.textBox_post_bottomBox {
    width: 100%;
    height: 130rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    /* background: pink; */
    align-items: center;
    /* margin-left: 110rpx;  */
}
.textBox_post_bottomBox_left {
    width: 35rpx;
    height: 35rpx;
}
.textBox_post_bottomBox_center {
    width: 35rpx;
    height: 35rpx;
}
.textBox_post_bottomBox_right {
    width: 35rpx;
    height: 35rpx;
}
.textBox_post_line {
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: center;
}
.textBox_post_line > view {
    width: 700rpx;
    height: 1rpx;
    border-bottom: 1rpx solid #efefef;
}
.textBox_post_zan {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 670rpx;
    margin: 0 auto;
    flex-wrap: wrap;
}
.textBox_post_zan_image {
    width: 30rpx;
    height: 30rpx;
}
.textBox_post_zan_name {
    font-size: 25rpx;
    margin-left: 10rpx;
    color: #fda959;
}
.textBox_post_bigZan {
    width: 300rpx;
    height: 80rpx;
    background: #f6f6f6;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50rpx auto;
}
.textBox_post_bigZan_image {
    width: 50rpx;
    height: 50rpx;
}
.comment {
}
.comment_comment {
    margin: 15rpx 115rpx;
    width: auto;
    height: auto;
    flex-wrap: wrap;
    font-size: 26rpx;
    letter-spacing: 3rpx;
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
.toolbar_send {
    margin-left: 30rpx;
    font-size: 28rpx;
    letter-spacing: 5rpx;
}
.toolbar_input {
    background: #f6f6f6;
    width: 75vw;
    height: 50rpx;
    border-radius: 10rpx;
    padding: 5rpx;
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
</style>
