<template>
    <!-- pages/more/News/News.wxml -->
    <view class="container">
        <block v-for="(item, index) in dataList" :key="index">
            <view class="demo" @tap="naviToDetail" :data-content="item.arcticle">
                <image :src="item.character.iconUrl"></image>
                <view class="text">
                    <view class="firstLine">
                        <text class="name">{{ item.character.nickName }}</text>
                        <text v-if="item.type == '点赞'">赞了我的{{ item.arcticle.Label }}</text>
                        <text v-if="item.type == '评论'">评论了我的{{ item.arcticle.Label }}</text>
                        <text v-if="item.type == '回复'">回复了我的评论</text>
                        <text v-if="item.type == '关注'">关注了我</text>
                    </view>
                    <view class="body">
                        <!-- 点赞 -->
                        <image class="zan" src="/static/images/love.png" v-if="item.type == '点赞'"></image>
                        <!-- 评论内容 -->
                        <text class="comment" v-if="item.type == '评论'">
                            <text class="zzz">"</text>
                            {{ item.content }}
                            <text class="zzz">"</text>
                        </text>
                        <!-- 回复内容 -->
                        <text class="comment" v-if="item.type == '回复'">
                            <text class="zzz">"</text>
                            {{ item.content }}
                            <text class="zzz">"</text>
                        </text>
                    </view>
                    <view class="time">{{ item.createTime }}</view>
                </view>
                <image class="picture" :src="item.arcticle.AllPhoto[0]" mode="aspectFill"></image>
            </view>
        </block>
        <view class="DataNull" v-if="loadAll">-无更多内容-</view>
    </view>
</template>

<script>
const util = require('../../../../utils/util');

const args = uni.getStorageSync('args');
export default {
    data() {
        return {
            dataList: [],
            // 放置返回数据的数组
            oldDataList: [],
            // 历史消息   -- ------- --- ------- -------暂时没用
            loadAll: false,
            // “没有数据”的变量，默认false，隐藏
            currentPage: 0,
            pageSize: 10
        };
    }, //页面显示的事件
    onShow() {},
    onLoad() {
        this.onLoadClone3389();
    },
    onPullDownRefresh() {
        uni.showLoading({
            title: '刷新中...'
        });
        this.onLoadClone3389({});
        uni.hideLoading();
    },
    //页面上拉触底事件的处理函数
    onReachBottom: function () {
        console.log('上拉触底事件'); // 边界处理

        if (this.loadAll) {
            return;
        }

        this.getData();
    },
    methods: {
        onLoadClone3389() {
            // 初始化
            this.currentPage = 0;
            this.pageSize = 10;
            this.dataList = []; // 获取数据

            this.getData();
        },

        naviToDetail(e) {
            var jsonStr = JSON.stringify(e.currentTarget.dataset.content); // 对数据进行URI编码，防止数据被截断。少量数据没问题，如果对象较大则容易被截断，获取不到完整数据

            let data = encodeURIComponent(jsonStr);
            uni.navigateTo({
                url: `../DetailContent/DetailContent?content=${data}`
            });
        },

        //访问网络,请求数据
        getData() {
            uni.showLoading({
                title: '加载中',
                mask: true
            });
            let that = this;
            wx.cloud.callFunction({
                name: 'CampusCircle',
                data: {
                    be_username: args.username,
                    currentPage: that.currentPage,
                    pageSize: that.pageSize,
                    type: 'ReadControlLogs'
                },

                success(res) {
                    console.log(res.result.data);
                    uni.hideLoading();

                    if (res.result.data && res.result.data.length > 0) {
                        that.currentPage++; // 处理每个数据的时间

                        for (let i = 0; i < res.result.data.length; i++) {
                            res.result.data[i].createTime = util.timeago(res.result.data[i].createTime, 'Y年M月D日');
                        } // 拿新数据

                        let list = that.dataList.concat(res.result.data);
                        that.setData({
                            dataList: list
                        }); // 边界处理

                        if (res.result.data.length < that.pageSize) {
                            that.setData({
                                loadAll: true
                            });
                        }
                    } else {
                        // 没有数据时
                        that.setData({
                            loadAll: true
                        });
                    }
                },

                fail(res) {
                    uni.showToast({
                        title: '请求失败',
                        icon: 'none'
                    });
                    console.log('请求失败', res);
                    that.setData({
                        loadAll: true
                    });
                }
            });
            console.log(this.dataList);
        }
    }
};
</script>
<style>
.demo {
    display: flex;
    width: 100%;
    padding: 20rpx 0 0 20rpx;
    border-bottom: 1rpx solid #ccc;
    box-sizing: border-box;
    /* justify-content: space-between; */
}
.demo .picture {
    width: 100rpx;
    height: 100rpx;
    /* background-color: yellow; */
}
.demo .text {
    width: 500rpx;
}
.body {
    max-height: 60rpx;
    width: 430rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* line-height: 40rpx; */
}
.demo image {
    width: 80rpx;
    height: 80rpx;
    margin-right: 20rpx;
    border-radius: 10rpx;
}
.demo image:first-child {
    border-radius: 50%;
}
.demo .text .name {
    /* font-weight: 700; */
    font-size: 28rpx;
    color: black;
}
.text .firstLine {
    line-height: 40rpx;
}
.text .firstLine text:last-child {
    margin-left: 10rpx;
    font-size: 26rpx;
    color: rgb(102, 100, 100);
}
.demo .text .time {
    line-height: 40rpx;
    font-size: 25rpx;
    color: rgb(137, 137, 136);
}
.demo .zan {
    width: 35rpx;
    height: 35rpx;
}
.comment {
    font-size: 27rpx;
    color: rgb(29, 26, 26);
    letter-spacing: 1rpx;
}
.zzz {
    font-size: 26rpx;
    color: rgb(148, 147, 147);
}
.DataNull {
    font-size: 26rpx;
    color: #2c2c2cb4;
    display: flex;
    justify-content: center;
    margin-top: 15rpx;
}

@media (prefers-color-scheme: dark) {
    .firstLine {
        filter: invert(1) !important;
    }
    .firstLine .name {
        filter: invert(1) !important;
    }
}
</style>
