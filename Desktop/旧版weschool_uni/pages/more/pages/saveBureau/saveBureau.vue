<template>
    <view>
        <!-- pages/more/pages/saveBureau/saveBureau.wxml -->
        <view class="head">
            <view :style="'height: ' + statusBarHeight + 'px;'" />
            <view class="head_second" :style="'height: ' + lineHeight + 'px;'">
                <view class="savedNumber" :style="'top: ' + lineHeight + 'px;'">
                    <image src="/static/images/people.png"></image>
                    <!-- 已攒<text>  99117 </text>人 -->
                    <text>99117</text>
                </view>
            </view>
        </view>
        <view :style="'height: ' + (statusBarHeight + lineHeight) + 'px;'"></view>

        <!-- <scroll-view> -->
        <view class="All">
            <scroll-view style="position: relative; left: 47rpx">
                <view class="manual">
                    <!-- <view class="manualText">攒局速成手册</view>
    <view class="manualText">萌新必看</view> -->
                    <view class="topTitle">
                        <image src="/static/images/title.png"></image>
                    </view>
                    <view class="manualImg">
                        <image src="/static/images/saveBureau.png" />
                    </view>

                    <view class="manualBotton">
                        <view class="myJoining" @tap="toMyjoined">
                            <image src="/static/images/join.png" />
                        </view>
                        <view class="myLaunch" @tap="toSavepublish">
                            <image src="/static/images/publish.png" />
                        </view>
                    </view>
                </view>
            </scroll-view>
            <view class="categories" :style="'top: ' + (statusBarHeight + 40) + 'px'">
                <view v-for="(item, index) in arry" :key="item.id">
                    <view class="categoriesContent" @tap="chooseLabel" :id="index">
                        <view :class="'circle background-color_' + (index % 2) + ' circle' + index"></view>
                        <text>{{ item.name }}</text>
                    </view>
                </view>
            </view>
            <scroll-view style="position: relative; left: 47rpx">
                <view class="cards" :id="index" @tap="toLookcontent" v-for="(item, index) in copyList" :key="item.id">
                    <view class="cardsType">
                        <image :src="'../../../../images/' + item.showLabel + '.png'" />
                    </view>

                    <view class="cardsContent">
                        <view class="title">{{ item.text }}</view>
                        <view class="bottom">
                            <view class="leader">局长： {{ item.nickName }}</view>
                            <view class="time">{{ item.time }}</view>
                        </view>
                        <view class="progress">
                            <progress :percent="item.process" stroke-width="5" backgroundColor="#E29E8F" color="#94D3AE" border-radius="30rpx" active />
                        </view>
                    </view>
                </view>
                <view class="loading" v-if="loading" style="margin-left: 250rpx">玩命加载中...</view>
                <view class="none" v-if="none" style="margin-left: 250rpx">- 无更多内容 -</view>
            </scroll-view>
        </view>

        <!-- <scroll-view>
<view class="head">
  <view style="height: {{statusBarHeight}}px;" />
  <view class="head_second" style="height: {{lineHeight}}px;">
    <view class="savedNumber" style="top: {{lineHeight}}px;">
      已攒<text>  99117 </text>人
    </view>
  </view>
</view>
<view style="height: {{(statusBarHeight + lineHeight)}}px;"></view>
</scroll-view> -->
    </view>
</template>

<script>
// pages/more/pages/saveBureau/saveBureau.js
var app = getApp();

var util = require('../../../../utils/util.js');

export default {
    data() {
        return {
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            rectHeight: getApp().globalData.rectHeight,
            windowHeight: getApp().globalData.windowHeight,

            arry: [
                {
                    name: '自习',
                    type: 0
                },
                {
                    name: '电影',
                    type: 0
                },
                {
                    name: '聚餐',
                    type: 0
                },
                {
                    name: '拼车',
                    type: 0
                },
                {
                    name: '拼单',
                    type: 0
                },
                {
                    name: '运动',
                    type: 0
                },
                {
                    name: '游戏',
                    type: 0
                },
                {
                    name: '其他',
                    type: 0
                }
            ],

            cardList: [],
            currentPage: 0,
            label: null,
            contentIndex: 0,
            enterMe: false,
            loading: false,
            none: false,
            copyList: '',
            length: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        const args = uni.getStorageSync('args');
        this.setData({
            arry: this.arry
        });

        if (!args.sex) {
            this.chooseSex();
        } else {
            this.readData();
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var index = this.contentIndex;

        if (this.enterMe === true) {
            this.cardList = [];
            this.currentPage = 0;
            this.readData();
            this.enterMe = null;
        } else {
            if (this.addData) {
                this.addData._id = this.res;
                this.cardList.push(this.addData);
                console.log('this.data.cardList', this.cardList);
            } else {
                if (this.manNum || this.womanNum) {
                    this.cardList[index].manNum = this.manNum;
                    this.cardList[index].womanNum = this.womanNum;
                    this.cardList[index].commentList = this.commentList;
                }

                if (this.delCard === true) {
                    this.cardList.splice(index, 1);
                    this.delCard = false;
                }
            }

            this.addData = null;
        }

        this.transformTime();
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.cardList = [];
        this.currentPage = 0;
        this.readData();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            loading: true,
            none: false
        });
        this.readData();
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        toMyjoined() {
            this.setData({
                enterMe: true
            });
            uni.navigateTo({
                url: '../saveBureau/myJoined/myJoined'
            });
        },

        toSavepublish() {
            uni.navigateTo({
                url: '../saveBureau/publishBureau/publishBureau'
            });
        },

        chooseLabel(e) {
            var index = parseInt(e.currentTarget.id);
            var getIndex = this.arry.findIndex((item) => item.type === 1); //---判断arry数组里面有没有标签已被选择，没有则getIndex=-1，有则返回已选择的标签索引

            this.currentPage = 0; //----切换标签对页面进行初始化

            this.cardList = []; //----切换标签对页面进行初始化

            if (getIndex != -1) {
                //----将前面已选择的标签取消“选择”样式
                this.animate(
                    '.circle' + getIndex,
                    [
                        {
                            width: '100%'
                        },
                        {
                            width: '52rpx'
                        }
                    ],
                    200
                );
                this.arry[getIndex].type = 0;
                this.label = null;

                if (getIndex === index) {
                    this.readData();
                    return;
                }
            }

            this.animate(
                '.circle' + index,
                [
                    {
                        //----给选定标签“选择”样式
                        width: '52rpx'
                    },
                    {
                        width: '100%'
                    }
                ],
                200
            );
            this.arry[index].type = 1;
            this.label = this.arry[index].name;
            this.readData();
        },

        transformTime() {
            var copyList = JSON.parse(JSON.stringify(this.cardList));
            copyList.forEach((item) => {
                if (!!item) {
                    item.time = util.timeago(item.time, 'Y年M月D日');
                    var length = item.manNum.length + item.womanNum.length;
                    var man2 = item.manNum.filter((num) => {
                        return num != 1;
                    });
                    var woman2 = item.womanNum.filter((num) => {
                        return num != 1;
                    });
                    var process = ((man2.length + woman2.length) * 100) / length;
                    item.process = process;
                }
            });
            copyList.map((item) => {
                var hh = item.label;
                item.showLabel = encodeURI(hh).replace(/%/g, '');
            });
            this.setData({
                copyList,
                length: copyList.length
            });
        },

        readData() {
            const args = uni.getStorageSync('args');
            wx.cloud.callFunction({
                name: 'saveBureau',
                data: {
                    type: 'readCard',
                    school: args.school,
                    currentPage: this.currentPage,
                    label: this.label
                },
                success: (res) => {
                    uni.hideLoading();

                    if (res.result) {
                        console.log('res', res);
                        this.cardList = this.cardList.concat(res.result.data);
                        this.currentPage++;
                        this.transformTime();
                    }

                    if (!res.result || res.result.data.length < 10) {
                        this.setData({
                            none: true,
                            loading: false
                        });
                    }
                },
                fail: (err) => {
                    uni.showToast({
                        title: '请求失败！',
                        icon: 'none'
                    });
                    console.error;
                }
            });
        },

        chooseSex() {
            const args = uni.getStorageSync('args');
            var that = this;
            uni.showModal({
                title: '请选择您的性别',
                content: '*确定后不能更改，请谨慎选择',
                cancelText: '男生',
                cancelColor: '#5D81CF',
                confirmText: '女生',
                confirmColor: '#EC7A73',

                success(res) {
                    if (res.confirm) {
                        args.sex = 'woman';
                    } else if (res.cancel) {
                        args.sex = 'man';
                    }

                    uni.setStorage({
                        key: 'args',
                        data: args
                    });
                    that.readData();
                }
            });
        },

        toLookcontent(e) {
            var index = e.currentTarget.id;
            uni.setStorage({
                key: 'content',
                data: this.cardList[index],
                success: (res) => {
                    this.setData({
                        contentIndex: index
                    });
                    uni.navigateTo({
                        url: '../saveBureau/bureauContent/bureauContent'
                    });
                }
            });
        }
    }
};
</script>
<style>
/* pages/more/pages/saveBureau/saveBureau.wxss */
page {
    background-color: #fff3d0c2;
}
.head {
    position: fixed;
    background-color: #fff5d7;
    z-index: 2 !important;
    width: 100%;
    overflow-x: auto;
    top: 0;
}
.head_second {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    width: 100vw;
}
.savedNumber {
    font-size: 38rpx;
    font-weight: 550;
    color: #4c4945;
    margin-left: 50rpx;
    top: 102rpx;
}
.savedNumber text {
    color: #e18d77;
    font-size: 40rpx;
    position: absolute;
    left: 175rpx;
    bottom: 7px;
    z-index: 2;
}
.savedNumber image {
    margin-top: 15rpx;
    width: 320rpx;
    height: 90rpx;
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

.manual {
    background-color: #94d3ae;
    width: 650rpx;
    height: 290rpx;
    border-radius: 45rpx;
    display: flex;
    align-items: center;
    border: 4rpx solid #f8921d;
    flex-direction: column;
    box-shadow: 3px 3px #6b421140;
}
.topTitle {
    margin-top: 10rpx;
    height: 130rpx;
    width: 630rpx;
}
.topTitle image {
    width: 60%;
    height: 100%;
}
.manualImg {
    position: relative;
    left: 180rpx;
    bottom: 130rpx;
    width: 240rpx;
    height: 240rpx;
}
.manualImg image {
    width: 100%;
    height: 100%;
}
.manualText {
    font-size: 45rpx;
    color: white;
    position: relative;
    top: 32rpx;
    right: 130rpx;
    width: 320rpx;
    font-weight: 550;
    line-height: 60rpx;
    letter-spacing: 8rpx;
}
.manualBotton {
    width: 92%;
    height: 150rpx;
    position: relative;
    /* bottom: 214rpx; */
    bottom: 246rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.myJoining {
    width: 330rpx;
    height: 105%;
}
.myJoining image {
    height: 100%;
    width: 320rpx;
    margin-top: 6rpx;
    margin-left: 10rpx;
}
.myLaunch {
    width: 330rpx;
    height: 105%;
}
.myLaunch image {
    height: 100%;
    width: 320rpx;
}
.categories {
    height: 200rpx;
    margin-top: 22rpx;
    border-radius: 20rpx;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: sticky;
    z-index: 2;
    background-color: #fff5d7;
}
.categoriesContent {
    background-color: rgb(255, 255, 255);
    width: 138rpx;
    height: 60rpx;
    border-radius: 40rpx;
    border: 4rpx solid #f8931c;
    margin: 0 12rpx;
    display: flex;
    align-items: center;
    color: #6060d8;
    font-size: 32rpx;
    letter-spacing: 6rpx;
    box-shadow: 3px 3px #6b421140;
}
.circle {
    width: 52rpx;
    height: 52rpx;
    border-radius: 23rpx;
    position: relative;
    /* right: 35rpx;
  top: 1rpx; */
}
.categoriesContent text {
    position: absolute;
    margin-left: 35rpx;
    font-weight: 550;
    font-family: math;
}
.cards {
    height: 200rpx;
    width: 626rpx;
    background-color: rgb(255, 255, 255);
    border-radius: 45rpx;
    border: 4rpx solid #f8931c;
    margin-top: 22rpx;
    padding: 16rpx;
    display: flex;
    align-items: center;
    flex-direction: row;
    overflow: hidden;
    box-shadow: 3px 3px #6b421140;
}
.cardsType {
    width: 140rpx;
    height: 210rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.cardsType image {
    width: 100%;
    height: 100%;
}
.cardsContent {
    height: 195rpx;
    width: 454rpx;
    margin-left: 16rpx;
    display: flex;
    flex-direction: column;
}
.title {
    margin-left: 18rpx;
    font-weight: 550;
    position: relative;
    top: 10rpx;
    font-size: 28rpx;
    height: 78rpx;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.bottom {
    margin-left: 18rpx;
    position: relative;
    top: 60rpx;
    font-weight: 550;
    font-size: 30rpx;
    height: 40rpx;
}
.leader {
    font-weight: 550;
    font-size: 28rpx;
    color: #0070bc;
    width: 230rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.time {
    color: #4b4b4b;
    float: right;
    position: relative;
    bottom: 35rpx;
    font-size: 25rpx;
}
.progress {
    position: relative;
    top: 70rpx;
    width: 455rpx;
}
.loading {
    margin-top: 30rpx;
    color: #4b4b4b8c;
    font-size: 25rpx;
}
.none {
    margin-top: 30rpx;
    color: #4b4b4b8c;
    font-size: 25rpx;
}
.background-color_0 {
    background-color: #ddc6a4;
}
.background-color_1 {
    background-color: #94d4ae;
}
@media (prefers-color-scheme: dark) {
    .head {
        filter: invert(1) !important;
    }
    image {
        filter: invert(1) !important;
    }
    .All {
        filter: invert(0) !important;
        z-index: 0 !important;
    }
    .head {
        position: fixed;
        background-color: #0a0a0a;
    }
    scroll-view {
        filter: invert(100%) !important;
        z-index: 37 !important;
    }
    .manual {
        background-color: #94d3ae;
    }
    .manualImg {
        filter: invert(1) !important;
    }
    .manualBotton {
        filter: invert(1) !important;
    }
    .categories {
        background-color: #0e0e0e;
    }

    .background-color_0 {
        background-color: #ddc6a4;
    }
    .background-color_1 {
        background-color: #94d4ae;
    }
    .cardsType {
        filter: invert(100) !important;
    }
}
</style>
