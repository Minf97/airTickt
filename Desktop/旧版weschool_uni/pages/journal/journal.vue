<template>
    <view>
        <view class="title">
            <text>更新日志</text>
        </view>

        <view class="main">
            <!-- 延伸出来一小截线 -->
            <view class="smallLine"></view>

            <block v-for="(listItem, index) in dataList" :key="index">
                <view class="box">
                    <view class="line"></view>
                    <view class="card">
                        <view class="head">
                            <view class="verse">{{ listItem.verse }}</view>
                            <view class="time">{{ listItem.time }}</view>
                        </view>
                        <view class="content" v-for="(contentItem, index1) in listItem.content" :key="index1">
                            <text>{{ contentItem }}</text>
                        </view>
                    </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
var app = getApp();
const db = wx.cloud.database();
const journal = db.collection('journal');
var currentPage = 0; // 当前第几页,0代表第一页

var pageSize = 10; //每页显示多少数据

export default {
    data() {
        return {
            dataList: [],

            //放置返回数据的数组
            loadMore: false,

            //"上拉加载"的变量，默认false，隐藏
            //“没有数据”的变量，默认false，隐藏
            loadAll: false,

            listItem: {
                verse: '',
                time: '',
                content: []
            },

            contentItem: ''
        };
    }, //页面显示的事件
    onShow() {
        this.getData();
    },
    onLoad() {
        currentPage = 0;
        pageSize = 10;
    },
    //页面上拉触底事件的处理函数
    onReachBottom: function () {
        console.log('上拉触底事件');

        if (!this.loadMore) {
            this.setData({
                loadMore: true,
                //加载中
                loadAll: false //是否加载完所有数据
            });
            this.getData();
        }
    },
    methods: {
        //访问网络,请求数据
        getData() {
            let that = this; //第一次加载数据

            if (currentPage == 1) {
                this.setData({
                    loadMore: true,
                    //把"上拉加载"的变量设为true，显示
                    loadAll: false //把“没有数据”设为false，隐藏
                });
            } //云数据的请求

            wx.cloud
                .database()
                .collection('journal')
                .orderBy('_updateTime', 'desc')
                .skip(currentPage * pageSize) //从第几个数据开始
                .limit(pageSize)
                .get({
                    success(res) {
                        if (res.data && res.data.length > 0) {
                            console.log('请求成功', res.data);
                            currentPage++; //把新请求到的数据添加到dataList里

                            let list = that.dataList.concat(res.data);
                            that.setData({
                                dataList: list,
                                //获取数据数组
                                loadMore: false //把"上拉加载"的变量设为false，显示
                            });

                            if (res.data.length < pageSize) {
                                that.setData({
                                    loadMore: false,
                                    //隐藏加载中。。
                                    loadAll: true //所有数据都加载完了
                                });
                            }
                        } else {
                            that.setData({
                                loadAll: true,
                                //把“没有数据”设为true，显示
                                loadMore: false //把"上拉加载"的变量设为false，隐藏
                            });
                        }
                    },

                    fail(res) {
                        console.log('请求失败', res);
                        that.setData({
                            loadAll: false,
                            loadMore: false
                        });
                    }
                });
        }
    }
};
</script>
<style>
page {
    padding: 30rpx;
}
/* 标题部分 */
.title::before {
    width: 8rpx;
    height: 8rpx;
    background-color: #bbb;
    margin-right: 5rpx;
    content: 'l';
    font-size: 28rpx;
    border-radius: 10rpx;
    color: #bbb;
}
.title {
    font-size: 33rpx;
    font-weight: 500;
    color: rgb(102, 102, 102);
}
.title text {
    margin-left: 20rpx;
}
/* 一小截线 */
.smallLine {
    flex-flow: column;
    align-items: center;
    padding: 0 2rpx;
    margin: 30rpx 0 0 35rpx;
}
.smallLine::before {
    border-left: 1rpx solid #bbb;
    content: '';
    flex-grow: 1;
    margin: 3rpx 0;
}
/* 卡片部分 */
.box {
    display: flex;
}
.line {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 0 2rpx;
    margin-left: 25rpx;
    margin-top: 10rpx;
}
.line::before {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    content: '';
    background: #bbb;
}
.line::after {
    border-left: 1rpx solid #bbb;
    content: '';
    flex-grow: 1;
    margin: 3rpx 0;
}
.card {
    box-sizing: border-box;
    width: 80%;
    margin: 0 30rpx 50rpx 40rpx;
    padding: 30rpx 30rpx;
    background-color: rgb(241, 241, 241);
    border-radius: 10rpx;
}

.card .head {
    display: inline-flex;
    justify-content: space-between;
    border: 1rpx solid rgb(23, 152, 217);
    border-radius: 7rpx;
    margin-bottom: 20rpx;
}
.card .head .verse {
    display: flex;
    width: 100rpx;
    justify-content: center;
    align-items: center;
    line-height: 50rpx;
    font-size: 26rpx;
    color: #fff;
    background-color: rgb(23, 152, 217);
}
.card .head .time {
    display: flex;
    width: 170rpx;
    justify-content: center;
    align-items: center;
    line-height: 50rpx;
    font-size: 26rpx;
    color: rgb(23, 152, 217);
}
.card .content text {
    line-height: 45rpx;
    letter-spacing: 2rpx;
    font-size: 28rpx;
    color: rgb(51, 51, 51);
}

@media (prefers-color-scheme: dark) {
    .head {
        filter: invert(90%) !important;
    }
}
</style>
