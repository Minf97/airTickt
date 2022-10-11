<template>
    <view class="inform">
        <image class="inform-images" src="/static/components/inform/images/inform.png"></image>
        <swiper class="swiper-disabled" :autoplay="true" interval="3500" duration="1000" :circular="true" :vertical="true">
            <swiper-item @tap="setFrom" :id="item.title" v-for="(item, index) in inform" :key="item.id">
                <view class="inform-comment" :style="'min-width: ' + item.comment.length * 20 + 'rpx;'">{{ item.comment }}</view>

                <view class="inform-name">
                    <text>{{ item.name }}</text>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
// components/inform.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        inform: {
            type: Array,
            default: () => []
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        setFrom() {
            console.log('占位：函数 setFrom 未声明');
        }
    }
};
</script>
<style>
.inform {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 90rpx;
    background-color: rgba(255, 255, 255, 0.7);
    margin: 0 20rpx 10rpx 20rpx;
    padding: 0 20rpx;
    border-radius: 20rpx;
}
.inform-images {
    width: 60rpx;
    height: 60rpx;
}
.inform swiper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    max-height: 60rpx;
}
.inform swiper-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 60rpx;
    overflow: hidden;
}
.inform-comment {
    display: flex;
    align-items: center;
    padding: 9rpx 15rpx;
    margin: 0rpx 20rpx;
    border-radius: 30rpx 0 30rpx 30rpx;
    background-color: #e54d42;
    font-size: 20rpx;
    color: #fff;
}
.inform-name {
    display: flex;
    align-items: center;
    overflow: hidden;
}
.inform-name text {
    color: #f37b1d;
    font-size: 27rpx;
    width: 100%;
    /* white-space: nowrap; */
    overflow: hidden;
    text-overflow: ellipsis;
    /* 显示超过两行后 显示省略号... */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

@media (prefers-color-scheme: dark) {
    .swiper-disabled {
        filter: invert(100%) !important;
    }
    .inform {
        background-color: #f5f4f4;
    }
}
</style>
