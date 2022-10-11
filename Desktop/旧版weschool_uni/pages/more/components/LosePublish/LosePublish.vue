<template>
    <view>
        <view class="find_lose">
            <view class="find_lose_type">失物类别</view>
            <scroll-view scroll-x class="choose_First">
                <!-- <Losetab ChooseTypes="{{choose_type}}" ></Losetab> -->
                <!-- 后续这部分也写成组件化现在不确定出现什么问题,现在这个代码是真的真的恶心，恶心到我了 -->
                <view class="choose_lose_bael">
                    <view
                        class="choose_lose_bael_item"
                        :id="index"
                        @tap="choose_typeFun"
                        :style="
                            'background-color:' +
                            (tapindex1 == index ? 'rgba(208,156,78,0.1)' : '') +
                            ';color:' +
                            (tapindex1 == index ? 'rgba(208,156,78)' : '') +
                            ';border:' +
                            (tapindex1 == index ? 'border:1rpx solid #17c0eb' : '')
                        "
                        v-for="(item, index) in choose_type"
                        :key="index"
                    >
                        {{ item }}
                    </view>
                </view>
            </scroll-view>
        </view>

        <view class="find_lose">
            <view class="find_lose_type">丢失地点</view>
            <scroll-view scroll-x @scroll="scroll" class="choose_First">
                <view class="choose_lose_bael">
                    <view
                        class="choose_lose_bael_item"
                        :id="index"
                        @tap="choose_campusFun"
                        :style="
                            'background-color:' +
                            (tapindex2 == index ? 'rgba(208,156,78,0.1)' : '') +
                            ';color:' +
                            (tapindex2 == index ? 'rgba(208,156,78)' : '') +
                            ';border:' +
                            (tapindex2 == index ? 'border:1rpx solid #17c0eb' : '')
                        "
                        v-for="(item, index) in choose_campus"
                        :key="index"
                    >
                        {{ item }}
                    </view>
                </view>
            </scroll-view>
        </view>
        <view class="find_lose">
            <view class="find_lose_type">丢失时间</view>
            <scroll-view scroll-x @scroll="scroll" class="choose_First">
                <view class="choose_lose_bael">
                    <view
                        class="choose_lose_bael_item"
                        :id="index"
                        @tap="choose_TimeFun"
                        :style="
                            'background-color:' +
                            (tapindex3 == index ? 'rgba(208,156,78,0.1)' : '') +
                            ';color:' +
                            (tapindex3 == index ? 'rgba(208,156,78)' : '') +
                            ';border:' +
                            (tapindex3 == index ? 'border:1rpx solid #17c0eb' : '')
                        "
                        v-for="(item, index) in choose_Time"
                        :key="index"
                    >
                        {{ item }}
                    </view>
                </view>
            </scroll-view>
        </view>
        <view class="find_lose">
            <view class="find_lose_type">是否悬赏</view>
            <scroll-view scroll-x @scroll="scroll" class="choose_First">
                <view class="choose_lose_bael">
                    <view
                        class="choose_lose_bael_item"
                        :id="index"
                        @tap="choose_OtherFun"
                        :style="
                            'background-color:' +
                            (tapindex4 == index ? 'rgba(208,156,78,0.1)' : '') +
                            ';color:' +
                            (tapindex4 == index ? 'rgba(208,156,78)' : '') +
                            ';border:' +
                            (tapindex4 == index ? 'border:1rpx solid #17c0eb' : '')
                        "
                        v-for="(item, index) in choose_Other"
                        :key="index"
                    >
                        {{ item }}
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
// components/LosePublish/LosePublish.js
export default {
    data() {
        return {
            //失物招领要的data
            choose_type: ['生活用品', '证件', '电子产品', '生活用品', '箱包', '校卡', '现金', '饰品', '其他'],
            choose_campus: '',
            //这个从缓存拿然后再添加一个校外后面在onload处理
            choose_Time: ['1周内', '1周-1个月', '1个月以上'],
            choose_Other: ['悬赏', '不悬赏'],
            tapindex1: -1,
            tapindex2: -1,
            tapindex3: -1,
            tapindex4: -1,
            detail: {
                type: '',
                campus: '',
                Time: '',
                Other: ''
            }
        };
    },
    beforeMount() {
        let res = uni.getStorageSync('args').Campus;
        res.push('校外');
        this.setData({
            choose_campus: uni.getStorageSync('args').Campus ? res : ['校内', '校外']
        });
    },
    methods: {
        choose_typeFun(e) {
            let tapindex1 = Number(e.currentTarget.id);
            let detail = this.detail;
            detail.type = this.choose_type[tapindex1];
            this.setData({
                detail,
                tapindex1
            });

            if (this.tapindex1 != -1 && this.tapindex2 != -1 && this.tapindex3 != -1 && this.tapindex4 != -1) {
                this.$emit('detail', {
                    detail: detail
                });
            }
        },

        choose_campusFun(e) {
            let tapindex2 = Number(e.currentTarget.id);
            let detail = this.detail;
            detail.campus = this.choose_campus[tapindex2];
            this.setData({
                tapindex2,
                detail
            });

            if (this.tapindex1 != -1 && this.tapindex2 != -1 && this.tapindex3 != -1 && this.tapindex4 != -1) {
                this.$emit('detail', {
                    detail: detail
                });
            }
        },

        choose_TimeFun(e) {
            let tapindex3 = Number(e.currentTarget.id);
            let detail = this.detail;
            detail.Time = this.choose_Time[tapindex3];
            this.setData({
                tapindex3,
                detail
            });

            if (this.tapindex1 != -1 && this.tapindex2 != -1 && this.tapindex3 != -1 && this.tapindex4 != -1) {
                this.$emit('detail', {
                    detail: detail
                });
            }
        },

        choose_OtherFun(e) {
            let tapindex4 = Number(e.currentTarget.id);
            let detail = this.detail;
            detail.Other = this.choose_Other[tapindex4];
            this.setData({
                tapindex4,
                detail
            });

            if (this.tapindex1 != -1 && this.tapindex2 != -1 && this.tapindex3 != -1 && this.tapindex4 != -1) {
                this.$emit('detail', {
                    detail: detail
                });
            }
        },

        scroll() {
            console.log('占位：函数 scroll 未声明');
        }
    }
};
</script>
<style>
/* components/LosePublish/LosePublish.wxss */
.test {
    font-size: 160rpx;
}
.choosenLabel {
    font-size: 30rpx;
    font-weight: 550;
    color: #2b2b2bd7;
}
.choose_lose_bael {
    display: flex;
    flex-wrap: nowrap;
    align-self: center;
    min-width: 1100rpx;
    width: auto;
    /* margin-right: 30rpx; */
    /* vertical-align: middle; */
    font-size: 24rpx;
    padding: 10rpx;
    color: rgba(16, 16, 16, 0.9);
}
.show_lose {
    height: 760rpx;
}
.find_lose {
    display: flex;
    white-space: nowrap;
    margin-bottom: 13rpx;
}
.find_lose_type {
    margin-left: 20rpx;
    font-size: 27rpx;
    font-weight: 600;
    color: rgba(16, 16, 16, 0.7);
    /* margin-bottom: 10rpx; */
    align-self: center;
}
.choose_lose_bael_item {
    padding: 10rpx;
    border-radius: 20rpx;
    white-space: nowrap;
    margin-right: 15rpx;
    background-color: rgba(247, 247, 247);
}
.choose_First {
    /* display: flex; */
    margin-left: 15rpx;
    width: 100%;

    border: 1 rpx solid rgba(236, 236, 236, 0.619);
}
.active {
}
@media (prefers-color-scheme: dark) {
    .choose_lose_bael_item {
        filter: invert(0%) !important;
        background-color: #fff;
    }
}
</style>
