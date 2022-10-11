<template>
    <view>
        <view class="imageBg" :style="'background-image: url(' + groupData.bgurl + ');'">
            <view :style="'height: ' + statusBarHeight + 'px;width: 100vw;position: sticky;top: 0;'"></view>
            <view :style="'height: ' + lineHeight + 'px;width: 100vw;display: flex;flex-direction: row;align-items: center;position: sticky;top:' + statusBarHeight + 'px;'">
                <image style="width: 43rpx; height: 43rpx; margin-left: 20rpx" @tap="back" src="/static/pages/testdaka/myGroup/images/back.png"></image>
                <image style="width: 39rpx; height: 43rpx; margin-left: 289rpx" src="/static/pages/testdaka/myGroup/images/rank.png"></image>
                <image style="width: 39rpx; height: 43rpx; margin-left: 33rpx" src="/static/pages/testdaka/myGroup/images/shousuo.png"></image>
                <image style="width: 43rpx; height: 43rpx; margin-left: 33rpx; transform: rotate(180deg)" src="/static/images/more.png"></image>
            </view>
            <view class="userUrl">
                <image :src="myurl"></image>
                <view style="margin-left: 15rpx; margin-right: 20rpx; font-size: 26rpx; color: rgb(241, 241, 241)">{{ myname }}</view>
            </view>
        </view>
        <view class="textBox">
            <view class="textBox_title">
                <view class="textBox_title_left">{{ groupData.groupName }}</view>
                <view class="textBox_title_right">分享</view>
            </view>
            <view class="textBox_tag"></view>
            <view class="textBox_daka">
                <view class="textBox_daka_daka" @tap="intoChallenge">
                    <image class="textBox_daka_daka_left" src="/static/pages/testdaka/myGroup/images/daka.png"></image>
                    <view class="textBox_daka_daka_center">打卡挑战</view>
                    <view class="textBox_daka_daka_right">去打卡</view>
                </view>
            </view>
            <view class="textBox_post" :data-index="index" @tap="intoPost" v-for="(item, index) in postarr" :key="index">
                <view class="textBox_post_topBox">
                    <view class="textBox_post_topBox_userUrl">
                        <image src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132"></image>
                    </view>
                    <view class="textBox_post_topBox_userInfo">
                        <view class="textBox_post_topBox_userInfo_name">
                            <view class="textBox_post_topBox_userInfo_name_name">{{ item.wxname }}</view>
                            <view class="textBox_post_topBox_userInfo_name_title" v-if="item.isleader">组长</view>
                        </view>
                        <view class="textBox_post_topBox_userInfo_time">{{ item.sendtime }}</view>
                    </view>
                    <view class="textBox_post_topBox_right"><view></view></view>
                </view>

                <view class="textBox_post_textBox">{{ item.text }}</view>

                <view class="textBox_post_bottomBox">
                    <view style="display: flex; flex-direction: row">
                        <image class="textBox_post_bottomBox_left" :src="item.mylike ? '../showPost/image/yidianzan.png' : './images/zan.png'"></image>
                        <view :style="'margin-left: ' + (item.likenum == 0 ? 0 : 10) + 'rpx;color:' + (item.mylike ? '#efb336' : '') + ';'">
                            {{ item.likenum == 0 ? '' : item.likenum }}
                        </view>
                    </view>
                    <view style="display: flex; flex-direction: row">
                        <image class="textBox_post_bottomBox_center" src="/static/pages/testdaka/myGroup/images/huifu.png"></image>
                        <view :style="'margin-left: ' + (item.comment.length == 0 ? 0 : 10) + 'rpx;'">{{ item.comment.length == 0 ? '' : item.comment.length }}</view>
                    </view>
                    <image class="textBox_post_bottomBox_right" src="/static/pages/testdaka/myGroup/images/zhuanfa.png"></image>
                </view>

                <view class="textBox_post_line"><view></view></view>
            </view>
            <view style="width: 100vw; height: auto; padding: 30rpx 0; text-align: center; letter-spacing: 2rpx; font-size: small; color: #b3b3b3">没有更多内容</view>
        </view>
        <view class="addText" @tap="addPost"><image src="/static/pages/testdaka/myGroup/images/xie.png"></image></view>
    </view>
</template>

<script>
// pages/testdaka/myGroup/myGroup.js
export default {
    data() {
        return {
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,

            //要渲染的数据
            groupname: '我的吃喝记录',

            groupData: {
                bgurl: '',
                groupName: ''
            },

            postarr: [
                // {wxname:'Start from scratch',wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:"20034480214",text:'第一条个人动态',sendtime:'刚刚',mylike:true,likenum:1,likename:['名字1','名字2'],groupuuid:'小组id',comment:['跟数据库一样格式的评论'],challengename:'打卡挑战的名字',challengeid:'打卡挑战的id',_id:'数据库自动生成的id作为说说id使用',isleader:true}
            ],

            myname: '',

            //名字
            //头像
            myurl: '',

            args: '',
            isupdate: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        // console.log(options);
        let args = uni.getStorageSync('args');
        var groupData = JSON.parse(options.thisGroupData); // console.log(groupData);

        this.setData({
            args,
            myname: args.nickName,
            myurl: args.iconUrl,
            groupData
        });
        this.getAllPost();
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

        if (this.isupdate) {
            this.getAllPost();
            this.setData({
                isupdate: false
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
        getAllPost() {
            uni.showLoading({
                title: '加载中'
            });
            let groupData = this.groupData;
            wx.cloud
                .callFunction({
                    name: 'daka',
                    data: {
                        type: 'getPostByGroupId',
                        groupId: groupData.uuid
                    }
                })
                .then((res) => {
                    // console.log(res);
                    let data = res.result.data;
                    let postarr = [];
                    let usernum = this.groupData.groupUsername;
                    console.log(data);

                    for (let i = 0; i < data.length; i++) {
                        //评论发送时间判断
                        let sendtime = data[i].sendtime;
                        let timestamp = new Date(sendtime).getTime();
                        let whenSend = this.timeShow(timestamp);
                        let isleader = usernum == data[i].usernum ? true : false;
                        let obj = {
                            wxname: data[i].wxname,
                            wxurl: data[i].wxurl,
                            text: data[i].text,
                            sendtime: whenSend,
                            mylike: data[i].mylike,
                            likenum: data[i].likenum,
                            likename: data[i].likename,
                            usernum: data[i].usernum,
                            groupuuid: data[i].groupuuid,
                            comment: data[i].comment,
                            challengename: data[i].challengename,
                            challengeid: data[i].challengeid,
                            _id: data[i]._id,
                            isleader: isleader,
                            postid: data[i].postid
                        };
                        postarr.push(obj);
                    }

                    this.setData({
                        postarr
                    });
                    uni.hideLoading();
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
        },

        intoPost(e) {
            console.log(e);
            let postData = this.postarr[e.currentTarget.dataset.index];
            var thisPostData = JSON.stringify(postData);
            uni.navigateTo({
                url: '../showPost/showPost?thisPostData=' + thisPostData
            });
        },

        abc() {
            uni.navigateTo({
                url: 'pages/testdaka/myGroup/myGroup'
            });
        },

        back() {
            uni.navigateBack({
                delta: 1
            });
        },

        addPost() {
            let groupData = this.groupData;
            var thisGroupData = JSON.stringify(groupData);
            let postarr = this.postarr;
            var thispostarr = JSON.stringify(postarr);
            uni.navigateTo({
                url: '../addPost/addPost?thisGroupData=' + thisGroupData + '&thispostarr=' + thispostarr
            });
        },

        intoChallenge() {
            let groupData = this.groupData;
            var thisGroupData = JSON.stringify(groupData);
            let postarr = this.postarr;
            var thispostarr = JSON.stringify(postarr);
            uni.navigateTo({
                url: '../allchallenge/allchallenge?thisGroupData=' + thisGroupData + '&thispostarr=' + thispostarr
            });
        }
    }
};
</script>
<style>
/* pages/testdaka/myGroup/myGroup.wxss */
.imageBg {
    width: 100vw;
    height: 500rpx;
    background-image: url('https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/%E5%BC%95%E5%AF%BC%E9%A1%B5%E5%9B%BE%E7%89%87/56d8e29adaff58e3d6700082f20728c.jpg?sign=255f3c8e89d20d6d3dc3a4f4dcbddf94&t=1652512976');
    background-size: 100% 100%;
}
.userUrl {
    background: rgba(0, 0, 0, 0.089);
    width: auto;
    height: 65rpx;
    border-radius: 100rpx;
    display: flex;
    position: absolute;
    align-items: center;
    left: 33rpx;
    margin-top: 120rpx;
    box-shadow: 0rpx 0rpx 3rpx 0.1rpx white;
}
.userUrl > image {
    width: 45rpx;
    height: 45rpx;
    border-radius: 50%;
    margin-left: 15rpx;
    border: 1rpx solid white;
}
.textBox {
    width: 100vw;
    height: 100vh;
    border-radius: 40rpx 40rpx 0 0;
    margin-top: -110rpx;
    background: white;
}
.textBox_title {
    width: 100vw;
    height: 120rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.textBox_title_left {
    font-size: 33rpx;
    margin-left: 30rpx;
}
.textBox_title_right {
    position: absolute;
    right: 30rpx;
    width: 90rpx;
    height: 45rpx;
    background: #eae6ff;
    color: #7c66f5;
    border-radius: 50rpx;
    text-align: center;
    line-height: 47rpx;
    font-size: 20rpx;
}
.textBox_tag {
}
.textBox_daka {
    width: 92.5%;
    height: 85rpx;
    margin: 0 auto;
    background: #f5f6f8;
    border-radius: 10rpx;
    margin-bottom: 10rpx;
}
.textBox_daka_daka {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.textBox_daka_daka_left {
    width: 35rpx;
    height: 35rpx;
    margin-left: 30rpx;
}
.textBox_daka_daka_center {
    margin-left: 20rpx;
    font-size: 26rpx;
    letter-spacing: 3rpx;
}
.textBox_daka_daka_right {
    margin-left: 350rpx;
    font-size: 20rpx;
    border-radius: 30rpx;
    background: white;
    width: 100rpx;
    height: 50rpx;
    text-align: center;
    line-height: 50rpx;
}
.textBox_post {
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
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
    right: 30rpx;
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
    width: auto;
    height: auto;
    margin-left: 110rpx;
    font-size: 26rpx;
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
    width: 660rpx;
    height: 1rpx;
    border-bottom: 1rpx solid #efefef;
}
.addText {
    background: #7c66f5;
    border-radius: 50%;
    width: 100rpx;
    height: 100rpx;
    position: fixed;
    bottom: 200rpx;
    right: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 3rpx 10rpx 18rpx 3rpx rgb(201, 201, 201);
}
.addText > image {
    width: 43rpx;
    height: 43rpx;
}
</style>
