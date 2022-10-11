<template>
    <view>
        <!-- pages/more/pages/saveBureau/myJoined/myJoined.wxml -->
        <view class="head">
            <view :style="'height: ' + statusBarHeight + 'px;'" />
            <view class="head_second" :style="'height: ' + lineHeight + 'px;'">
                <view class="arrow" @tap="back">
                    <image src="/static/images/arrow.png" />
                </view>
            </view>
            <scroll-view :scroll-x="true" class="categories">
                <view class="categoriesContent" @tap="chooseLabel" :id="index" v-for="(item, index) in arry" :key="index">
                    <view :class="'circle background-color_' + (index % 2) + ' circle' + index"></view>

                    <text>{{ item.name }}</text>
                </view>
            </scroll-view>
        </view>
        <view :style="'height: ' + (statusBarHeight + lineHeight + 50) + 'px;'"></view>
        <scroll-view>
            <view class="All">
                <view class="cards" :id="index" @tap="toLookcontent" v-for="(item, index) in copyList" :key="item.id">
                    <view class="cardsType">
                        <image :src="'../../../../../images/' + item.showLabel + '.png'" />
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
                <view class="loading" v-if="loading">玩命加载中...</view>
                <view class="none" v-if="none">- 无更多内容 -</view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
// pages/more/pages/saveBureau/myJoined/myJoined.js
var app = getApp();

var util = require('../../../../../utils/util.js');

export default {
    data() {
        return {
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            rectHeight: getApp().globalData.rectHeight,
            windowHeight: getApp().globalData.windowHeight,

            arry: [
                {
                    name: '全部',
                    type: 0
                },
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

            currentPage: 0,
            cardList: [],
            my_id: '',
            label: '',
            enterMe: false,
            loading: false,
            none: false,
            contentIndex: '',
            copyList: '',
            length: ''
        };
    },
    onLoad: function (options) {
        this.setData({
            arry: this.arry,
            label: '全部'
        });
        this.readData();
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
        console.log('index', index);

        if (this.manNum || this.womanNum) {
            this.cardList[index].manNum = this.manNum;
            this.cardList[index].womanNum = this.womanNum;
            this.cardList[index].commentList = this.commentList;
        }

        if (this.delCard === true || this.out === true) {
            this.my_id = this.cardList[index]._id;
            this.cardList.splice(index, 1);
        }

        if (this.addData) {
            this.addData._id = this.res;
            this.cardList.push(this.addData);
        }

        this.addData = null;
        this.transformTime();
    },
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
            enterMe: true
        });
    },
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
        /**
         * 生命周期函数--监听页面加载
         */
        back() {
            uni.navigateBack({
                delta: 1 // 返回上一级页面。
            });
        },

        chooseLabel(e) {
            var index = e.currentTarget.id;
            this.currentPage = 0; //----切换标签对页面进行初始化

            this.cardList = []; //----切换标签对页面进行初始化

            var getIndex = this.arry.findIndex((item) => item.type === 1); //---判断arry数组里面有没有标签已被选择，没有则getIndex=-1，有则返回已选择的标签索引

            if (getIndex === parseInt(index)) {
                return;
            }

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
            this.setData({
                label: this.arry[index].name
            });
            this.readData();
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
                        url: '../../saveBureau/bureauContent/bureauContent'
                    });
                }
            });
        },

        transformTime() {
            var copyList = JSON.parse(JSON.stringify(this.cardList));
            copyList.forEach((item) => {
                if (!!item) {
                    item.time = util.timeago(item.time, 'Y年M月D日');
                    var length = item.manNum.length + item.womanNum.length;
                    console.log(length);
                    console.log(item.manNum);
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
                    type: 'readMe',
                    currentPage: this.currentPage,
                    userName: args.username,
                    sex: args.sex,
                    label: this.label
                },
                success: (res) => {
                    if (res.result) {
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
        }
    }
};
</script>
<style>
/* pages/more/pages/saveBureau/myJoined/myJoined.wxss */
page {
    /* background-color: #ffedb7c2; */
    background-color: #fff3d0c2;
}
.head {
    position: fixed;
    background-color: #fff5d7;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 15rpx;
}
.categories {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    margin-top: 20rpx;
}
.categoriesContent {
    background-color: rgb(255, 255, 255);
    width: 138rpx;
    height: 60rpx;
    border-radius: 40rpx;
    border: 4rpx solid #f8931c;
    margin: 0 16rpx;
    display: inline-block;
    color: #6060d8;
    font-size: 32rpx;
    letter-spacing: 6rpx;
    box-shadow: 3px 3px #6b421140;
    font-weight: 550;
}
.categoriesContent text {
    position: absolute;
    margin-left: 35rpx;
    top: 13rpx;
}
.circle {
    width: 52rpx;
    height: 52rpx;
    border-radius: 23rpx;
    position: relative;
    margin-top: 5rpx;
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
    width: 230rpx;
    font-weight: 550;
    font-size: 28rpx;
    color: #0070bc;
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
        filter: invert(0) !important;
    }
    .All {
        filter: invert(0) !important;
    }
    .head {
        position: fixed;
        background-color: #0a0a0a;
    }
    scroll-view {
        filter: invert(100%) !important;
        z-index: 37 !important;
    }
    .categories {
        filter: invert(0) !important;
    }
    .cardsType {
        filter: invert(0) !important;
    }
}
</style>
