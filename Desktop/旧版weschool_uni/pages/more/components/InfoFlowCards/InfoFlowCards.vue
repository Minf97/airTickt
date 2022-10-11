<template>
    <view>
        <scroll-view scroll-y :style="'height: ' + height + 'px;'">
            <block v-for="(item, index) in list" :key="index">
                <view class="InfoCard">
                    <!-- 头部 -->
                    <view class="InfoCard_head">
                        <view class="avatar">
                            <image :src="iconUrl"></image>
                        </view>
                        <view class="head_text">
                            <view class="head_text_title">标题标题标题标题标题标题标题标题标题标题标题标题</view>
                            <view class="head_text_time">49分钟前</view>
                        </view>
                        <image src="/static/images/more.png" class="more"></image>
                    </view>
                    <!-- 内容主体 -->
                    <view class="InfoCard_body">
                        <view class="textBody">
                            <text>哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                            <view class="imageBox">
                                <image src=""></image>
                            </view>
                            <view class="bodyTab"></view>
                        </view>
                    </view>
                    <!-- 底部 -->
                    <view class="InfoCard_bottom">
                        <view>点赞</view>
                        <view>回复</view>
                        <view>浏览</view>
                    </view>
                </view>
            </block>
        </scroll-view>
    </view>
</template>

<script>
// pages/more/components/InfoFlowCards/InfoFlowCards.js
export default {
    data() {
        return {
            windowHeight: getApp().globalData.windowHeight,
            currentPage: 0,

            // 当前第几页,0代表第一页
            loadAll: false,

            // 状态标志 - 是否加载完所有内容
            // 当前标签
            Label: '全部',

            iconUrl: '',
            list: [],
            height: ''
        };
    },
    props: {},
    mounted() {
        const args = uni.getStorageSync('args');
        this.setData({
            iconUrl: args.iconUrl
        });
    },
    methods: {
        init() {
            this.setData({
                currentPage: 0,
                list: [null]
            });
        },

        getData() {
            let e = {
                currentPage: this.currentPage,
                // 本组件当前第几页
                currentTab: this.currentTab // 本组件索引 - 方便标签选择
            }; // 边界处理，拉到最底部时不允许再请求数据库

            if (this.loadAll) {
                return;
            }

            this.$emit('getData', {
                detail: e
            });
            console.log('getData');
        }
    }
};
</script>
<style>
.InfoCard {
    width: 100%;
    height: 400rpx;
    background-color: pink;
    padding: 20rpx;
    box-sizing: border-box;
}
.InfoCard .InfoCard_head {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    height: 100rpx;
    background-color: green;
}
/* 头像 */
.InfoCard .InfoCard_head .avatar {
    width: 80rpx;
    height: 80rpx;
    /* background-color: #fff; */
    margin-right: 20rpx;
}
.InfoCard .InfoCard_head .avatar image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    /* background-color: pink; */
}
/* 头部文本 */
.InfoCard .InfoCard_head .head_text {
    width: 70%;
    height: 80rpx;
    display: flex;
    flex-direction: column;
    background-color: blue;
}
.head_text .head_text_title {
    width: 100%;
    height: 40rpx;
    margin-bottom: 10rpx;
    background-color: pink;
    font-weight: 550;
    letter-spacing: 2rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.head_text .head_text_time {
    width: 100%;
    height: 30rpx;
    background-color: pink;
    font-size: 25rpx;
    color: #ccc;
}
/* 设置icon */
.InfoCard_head .more {
    position: absolute;
    top: 10rpx;
    right: 30rpx;
    width: 65rpx;
    height: 65rpx;
}
/* 主体内容 */
.InfoCard_body .textBody {
    position: relative;
    display: flex;
    flex-direction: row;
    margin-top: 30rpx;
}
.InfoCard_body .textBody text {
    min-width: 50%;
    max-height: 80rpx;
    margin-right: 15rpx;
    background-color: #fff;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 26rpx;
    color: #ccc;
}
.InfoCard_body .textBody .imageBox {
    width: 40%;
    height: 150rpx;
    background-color: green;
    border-radius: 15rpx;
}
.InfoCard_body .textBody .imageBox image {
    width: 100%;
    height: 150rpx;
}
.InfoCard_body .textBody .bodyTab {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100rpx;
    height: 40rpx;
    background-color: green;
}
/* 底部 */
.InfoCard_bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50rpx;
    margin-top: 30rpx;
    background-color: #fff;
    font-size: 26rpx;
    color: #ccc;
}
.InfoCard_bottom :first-child::after {
    content: '·';
    margin: 0 10rpx;
}
.InfoCard_bottom :nth-child(2)::after {
    content: '·';
    margin: 0 10rpx;
}
</style>
