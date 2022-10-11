<template>
    <view class="detail_wrap">
        <view class="img">
            <image :src="item.logoUrl" :lazy-load="true" />
        </view>
        <view class="mess_wrap">
            <view class="name">#{{ item.hostMess.association }}</view>
            <view class="detail">
                <view class="activity">{{ item.activityCount }}个活动</view>
                <view class="tip">|</view>
                <view class="hot_num">{{ item.activityCount + item.personCount }}人参与</view>
            </view>
        </view>
        <view class="bt_wrap">
            <navigator class="go" @tap="go" :data-assoIndex="item.count">去参与</navigator>
        </view>
    </view>
</template>

<script>
// pages/association/components/assoCard/assoCard.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        item: {
            type: Object,
            default: () => []
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        go(e) {
            let count = e.currentTarget.dataset.assoindex;
            uni.showLoading({
                title: '查询中',
                mask: true,
                success: (result) => {
                    wx.cloud
                        .database()
                        .collection('associationMess')
                        .where({
                            count
                        })
                        .get()
                        .then((res) => {
                            if (res.data[0].sendStatus == false) {
                                uni.showToast({
                                    title: '该社团不在报名时间',
                                    icon: 'none',
                                    image: '',
                                    duration: 1500,
                                    mask: false,
                                    success: (result) => {
                                        uni.hideLoading();
                                    }
                                });
                            } else {
                                wx.cloud
                                    .callFunction({
                                        name: 'associationSend',
                                        data: {
                                            type: 7,
                                            index: count + '社团'
                                        }
                                    })
                                    .then((res) => {
                                        // console.log('222',res);
                                        uni.hideLoading();
                                        var content = JSON.stringify(res.result.data[0]);

                                        try {
                                            content = JSON.parse(JSON.stringify(res.result.data[0]));

                                            if (content.CommentList) {
                                                delete content.CommentList;
                                            }

                                            content = JSON.stringify(content);
                                        } catch {}

                                        uni.navigateTo({
                                            url: '/pages/more/pages/Freshman/Freshman?content=' + content,

                                            fail() {
                                                uni.navigateTo({
                                                    url: '/pages/more/pages/Freshman/Freshman?content=' + content
                                                });
                                            }
                                        });
                                    });
                            }
                        });
                }
            });
        }
    }
};
</script>
<style>
.detail_wrap {
    display: flex;
    flex-direction: row;
    font-size: 28rpx;
    padding: 12rpx 8rpx 8rpx 8rpx;
    height: 120rpx;
}
.detail_wrap .img {
    flex: 1;
    padding-left: 12rpx;
    text-align: center;
    padding-top: 10rpx;
}
.detail_wrap .img image {
    height: 100rpx;
    width: 100rpx;
    border-radius: 24rpx;
}
.detail_wrap .mess_wrap {
    flex: 3;
}
.detail_wrap .mess_wrap .name {
    line-height: 60rpx;
    font-size: 32rpx;
    font-weight: 700;
}
.detail_wrap .mess_wrap .detail {
    display: flex;
    flex-direction: row;
    line-height: 60rpx;
    color: #4d4d4d;
}
.detail_wrap .mess_wrap .detail .tip {
    padding: 0 12rpx 0 12rpx;
}
.detail_wrap .bt_wrap {
    text-align: center;
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
}
.detail_wrap .bt_wrap .go {
    padding: 12rpx;
    border-radius: 24rpx;
    color: #022b2b;
    background-color: #63a1a0;
    font-size: 30rpx;
    font-weight: 700;
}
</style>
