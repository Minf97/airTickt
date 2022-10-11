<template>
    <view class="bg">
        <view :style="'height: ' + statusBarHeight + 'px;width: 100vw;position: sticky;top: 0;'"></view>
        <view :style="'height: ' + lineHeight + 'px;width: 100vw;display: flex;align-items: center;position: sticky;top: ' + statusBarHeight + 'px;'">
            <view @tap="cancel" style="display: flex; align-items: center; justify-content: center; margin-left: 37rpx">
                <view style="width: 30rpx; height: 50rpx; color: white; font-size: 40rpx; line-height: 50rpx" @tap="back">＜</view>
            </view>
        </view>
        <view class="title">{{ challengename }}</view>
        <view class="aftertitle">
            <view class="aftertitle_left">
                <image class="aftertitle_left_image" src="/static/pages/testdaka/dakaChallenge/image/people.png"></image>
                <view class="aftertitle_left_view">{{ pernum }}人参加</view>
            </view>
            <view class="aftertitle_center">
                <image class="aftertitle_center_image" src="/static/pages/testdaka/dakaChallenge/image/daka.png"></image>
                <view class="aftertitle_center_view">{{ totaldegree }}次打卡</view>
            </view>
            <view class="aftertitle_right">
                <image class="aftertitle_center_image" src="/static/pages/testdaka/dakaChallenge/image/complete.png"></image>
                <view class="aftertitle_center_view">{{ isCompletePerNum }}人已完成打卡</view>
            </view>
        </view>
        <view class="infoBox">
            <view class="infoBox_guide">{{ challengeguide }}</view>
            <view class="infoBox_centerBox">
                <!-- <view class="infoBox_centerBox_leftBox">
      <view class="infoBox_centerBox_leftBox_top">
        <image class="infoBox_centerBox_leftBox_top_image" src="./image/rank.png"></image>
        <view class="infoBox_centerBox_leftBox_top_text">打卡排行榜</view>
        <view class="infoBox_centerBox_leftBox_top_jiantou">></view>
      </view>
      <view class="infoBox_centerBox_leftBox_bottom">
        <image class="infoBox_centerBox_leftBox_bottom_image" src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132"></image>
      </view>
    </view> -->
                <view class="infoBox_centerBox_rightBox">
                    <view class="infoBox_centerBox_rightBox_top">
                        <image class="infoBox_centerBox_rightBox_top_image" src="/static/pages/testdaka/dakaChallenge/image/totaldaka.png"></image>
                        <view class="infoBox_centerBox_rightBox_top_text">累计打卡</view>
                        <!-- <view class="infoBox_centerBox_rightBox_top_jiantou">></view> -->
                    </view>
                    <view class="infoBox_centerBox_rightBox_bottom">
                        <view class="infoBox_centerBox_rightBox_bottom_text">{{ totalday }}天</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="todayinfo">每天都要记得打卡噢！</view>
        <view class="textBox_post" :data-index="index" :data-item="item" @tap="intoPost" v-for="(item, index) in postarr" :key="index">
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
                    <image class="textBox_post_bottomBox_left" :src="item.mylike ? '../showPost/image/yidianzan.png' : '../myGroup/images/zan.png'"></image>
                    <view :style="'margin-left: ' + (item.likenum == 0 ? 0 : 10) + 'rpx;color:#efb336;'">{{ item.likenum == 0 ? '' : item.likenum }}</view>
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
        <view class="senddaka" @tap="gotoDaka">发打卡</view>
    </view>
</template>

<script>
// pages/testdaka/dakaChallenge/dakaChallenge.js
export default {
    data() {
        return {
            isupdate: false,
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,

            // 页面渲染数据
            // 说说表的数据
            postarr: [
                // {wxname:'Start from scratch',wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',usernum:"20034480214",text:'第一条个人动态',sendtime:'刚刚',mylike:true,likenum:1,likename:['名字1','名字2'],groupuuid:'小组id',comment:['跟数据库一样格式的评论'],challengename:'打卡挑战的名字',challengeid:'打卡挑战的id',_id:'数据库自动生成的id作为说说id使用',isleader:true}
            ],

            //打卡成员表的数据
            challengeguide: '',

            //打卡规则
            challengename: '',

            //打卡标题
            pernum: '',

            //多少人参加
            totalday: '',

            //累计打卡天数
            isCompletePerNum: '',

            //完成打卡人数
            //累计打卡次数
            totaldegree: '',

            args: '',
            thisChallenge: '',
            groupData: '',
            fromApply: '',
            postindex: '',
            newPost: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        var isupdate = options.isupdate;
        var postarr = JSON.parse(options.challengePostarr);
        var thisChallenge = JSON.parse(options.thisChallenge);
        var groupData = JSON.parse(options.thisGroupData);
        let fromApply = options.fromApply;
        let args = uni.getStorageSync('args');
        let usernum = args.username;
        let challengeid = thisChallenge.challengeid;
        this.setData({
            postarr,
            args,
            thisChallenge,
            groupData,
            fromApply,
            isupdate
        });
        this.getMyData(usernum, challengeid, thisChallenge);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if (this.postindex != null) {
            let updatePost = this.updatePost;
            let postindex = this.postindex;
            let postarr = this.postarr;
            postarr[postindex] = updatePost;
            console.log(postarr);
            this.setData({
                postarr,
                postindex: null,
                isupdate: true
            });
        }

        if (this.newPost != null) {
            console.log(this.newPost);
            let newPost = this.newPost;
            let postarr = this.postarr;
            postarr.push(newPost);
            this.setData({
                postarr,
                newPost: null,
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
        async getMyData(usernum, challengeid, thisChallenge) {
            this.setData({
                challengename: thisChallenge.challengename,
                challengeguide: thisChallenge.challengeguide,
                pernum: thisChallenge.peoplenum
            });
            wx.cloud
                .callFunction({
                    name: 'daka',
                    data: {
                        type: 'getMyDakaChallenge',
                        challengeuuid: challengeid,
                        usernum: usernum
                    }
                })
                .then((res) => {
                    console.log(res);
                    let data = res.result.data[0];
                    this.setData({
                        totalday: data.totalday,
                        //成员累计打卡天数
                        totaldegree: data.totaldegree //成员累计打卡次数
                    });
                });
            wx.cloud
                .callFunction({
                    name: 'daka',
                    data: {
                        type: 'getMyCompleteDakaChallenge',
                        challengeuuid: challengeid,
                        usernum: usernum
                    }
                })
                .then((options) => {
                    let isCompletePerNum = options.result.data.length;
                    this.setData({
                        isCompletePerNum: isCompletePerNum //完成挑战人数
                    });
                });
        },

        intoPost(e) {
            console.log(e);
            let postData = e.currentTarget.dataset.item;
            let index = e.currentTarget.dataset.index;
            var thisPostData = JSON.stringify(postData);
            uni.navigateTo({
                url: '../showPost/showPost?thisPostData=' + thisPostData + '&index=' + index
            });
        },

        gotoDaka() {
            let groupData = JSON.stringify(this.groupData);
            let thisChallenge = JSON.stringify(this.thisChallenge);
            uni.navigateTo({
                url: '../addDaka/addDaka?groupData=' + groupData + '&thisChallenge=' + thisChallenge
            });
        },

        back() {
            console.log(this.fromApply);

            if (this.fromApply) {
                console.log('进入了if');
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 3];
                console.log(prevPage);
                prevPage.setData({
                    isupdate: true
                });
                uni.navigateBack({
                    delta: 3
                });
            } else {
                console.log('进入了else');
                uni.navigateBack({
                    delta: 1
                });
            }
        },

        cancel() {
            console.log('占位：函数 cancel 未声明');
        }
    }
};
</script>
<style>
/* pages/testdaka/dakaChallenge/dakaChallenge.wxss */
/* page{
  background-image: linear-gradient(to bottom, #7c66f5 6%, #ffffff 38% , #ffffff 55%, #ffffff 100%);
} */
.bg {
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(to bottom, #7c66f5 6%, #ffffff 38%, #ffffff 55%, #ffffff 100%);
}
.title {
    color: #ffffff;
    margin-left: 37rpx;
    font-size: 35rpx;
}
.aftertitle {
    display: flex;
    flex-direction: row;
    margin: 30rpx auto 30rpx 37rpx;
    width: auto;
    height: auto;
}
.aftertitle_left {
    display: flex;
    flex-direction: row;
    width: auto;
    height: auto;
}
.aftertitle_left_image {
    width: 30rpx;
    height: 30rpx;
}
.aftertitle_left_view {
    font-size: 25rpx;
    margin-left: 12rpx;
    margin-right: 30rpx;
    color: #ffffff;
}
.aftertitle_center {
    display: flex;
    flex-direction: row;
    width: auto;
    height: auto;
}
.aftertitle_center_image {
    width: 30rpx;
    height: 30rpx;
}
.aftertitle_center_view {
    font-size: 25rpx;
    margin-left: 12rpx;
    margin-right: 30rpx;
    color: #ffffff;
}
.aftertitle_right {
    display: flex;
    flex-direction: row;
    width: auto;
    height: auto;
}
.aftertitle_center_image {
    width: 30rpx;
    height: 30rpx;
}
.aftertitle_center_view {
    font-size: 25rpx;
    margin-left: 12rpx;
    margin-right: 30rpx;
    color: #ffffff;
}
.infoBox {
    background: white;
    margin: 30rpx auto;
    border-radius: 20rpx;
    width: 620rpx;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 30rpx;
}
.infoBox_guide {
    font-size: 25rpx;
    letter-spacing: 3rpx;
    color: rgb(53, 53, 53);
}
.infoBox_centerBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* 要是添加排行榜，这个位置改回bettewn */
    margin: 0 45rpx;
    margin-top: 43rpx;
}
.infoBox_centerBox_leftBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.infoBox_centerBox_leftBox_top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}
.infoBox_centerBox_leftBox_top_image {
    width: 30rpx;
    height: 30rpx;
}
.infoBox_centerBox_leftBox_top_text {
    font-size: 25rpx;
    margin-left: 10rpx;
}
.infoBox_centerBox_leftBox_top_jiantou {
    font-size: 25rpx;
    margin-left: 15rpx;
}
.infoBox_centerBox_leftBox_bottom {
    display: flex;
    justify-content: center;
}
.infoBox_centerBox_leftBox_bottom_image {
    width: 30rpx;
    height: 30rpx;
    margin-top: 20rpx;
    border-radius: 50%;
}
.infoBox_centerBox_rightBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.infoBox_centerBox_rightBox_top {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.infoBox_centerBox_rightBox_top_image {
    width: 25rpx;
    height: 25rpx;
}
.infoBox_centerBox_rightBox_top_text {
    margin-left: 10rpx;
    font-size: 25rpx;
}
.infoBox_centerBox_rightBox_top_jiantou {
    margin-left: 15rpx;
    font-size: 25rpx;
}
.infoBox_centerBox_rightBox_bottom {
    display: flex;
    justify-content: center;
}
.infoBox_centerBox_rightBox_bottom_text {
    margin-top: 20rpx;
    font-size: 28rpx;
    letter-spacing: 5rpx;
}
.todayinfo {
    background: #f5f6f8;
    margin: 30rpx auto;
    width: 630rpx;
    height: auto;
    border-radius: 20rpx;
    padding: 25rpx;
    font-weight: 300rpx;
    letter-spacing: 5rpx;
    margin-top: 70rpx;
    color: #898a8d;
    font-size: 28rpx;
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
.senddaka {
    text-align: center;
    height: 80rpx;
    width: 500rpx;
    line-height: 80rpx;
    border-radius: 50rpx;
    margin: 0 130rpx;
    position: fixed;
    bottom: 110rpx;
    background: #7c66f5;
    color: white;
}
</style>
