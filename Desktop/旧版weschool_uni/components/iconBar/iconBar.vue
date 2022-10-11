<template>
    <view class="iconnBar">
        <view class="iconn" v-for="(item, index) in iconListClone" :key="item.key">
            <view class="iconn_item" :id="item.url">
                <navigator :url="item.url" class="iconn_item_url" :open-type="item.type === 'tab跳转' ? 'switchTab' : 'navigate'">
                    <image class="iconn_item_image" :src="item.icon"></image>
                    <text>{{ item.name }}</text>
                </navigator>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            iconListClone: []
        };
    },
    props: {
        iconList: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        _onRefresh(newVal, oldVal) {
            //这里只要父级值改变，就会执行
            var newiconList = uni.getStorageSync('configData').iconList || [];
            var other_btn = uni.getStorageSync('other_btn');
            var other_iconList = other_btn.other_iconList || []; // 处理旧数据
            // console.log(other_iconList, 2)

            other_iconList = other_iconList.filter((e) => other_iconList.every((e1) => e1.id === e.id));
            console.log(other_iconList);
            newiconList = newiconList.filter((e) => {
                var a = false;

                if (other_iconList.every((e1) => e1.id === e.id)) {
                    a = true;
                }

                console.log(a);
                return a;
            });
            newiconList = newiconList.filter((e) => other_iconList.every((e1) => e1.name !== e.name));
            newiconList.forEach((e, index) => {
                if (e.name === '更多') {
                    newiconList[index] = newiconList.splice(newiconList.length - 1, 1, newiconList[index])[0];
                }
            });
            console.log(newiconList, 1);
            var other_btn = {
                other_iconList: other_iconList,
                iconList: newiconList
            };

            if (JSON.stringify(this.iconList) != JSON.stringify(newiconList)) {
                this.setData({
                    iconListClone: newiconList
                });
            }

            uni.setStorageSync('other_btn', other_btn);
        }
    },
    watch: {
        iconList: {
            handler: function (newVal, oldVal) {
                this.iconListClone = this.deepClone(this.iconList);
                //这里只要父级值改变，就会执行
                var newiconList = uni.getStorageSync('configData').iconList || [];
                var other_btn = uni.getStorageSync('other_btn');
                var other_iconList = other_btn.other_iconList || []; // 处理旧数据
                // console.log(other_iconList, 2)

                other_iconList = other_iconList.filter((e) => other_iconList.every((e1) => e1.id === e.id));
                console.log(other_iconList);
                newiconList = newiconList.filter((e) => {
                    var a = false;

                    if (other_iconList.every((e1) => e1.id === e.id)) {
                        a = true;
                    }

                    console.log(a);
                    return a;
                });
                newiconList = newiconList.filter((e) => other_iconList.every((e1) => e1.name !== e.name));
                newiconList.forEach((e, index) => {
                    if (e.name === '更多') {
                        newiconList[index] = newiconList.splice(newiconList.length - 1, 1, newiconList[index])[0];
                    }
                });
                console.log(newiconList, 1);
                var other_btn = {
                    other_iconList: other_iconList,
                    iconList: newiconList
                };

                if (JSON.stringify(this.iconList) != JSON.stringify(newiconList)) {
                    this.setData({
                        iconListClone: newiconList
                    });
                }

                uni.setStorageSync('other_btn', other_btn);
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
.iconnBar {
    flex-direction: row;
    display: flex;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20rpx;
    width: 710rpx;
    /* height: 300rpx; */
    flex-wrap: wrap;
}

.iconn_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* width: 25%; */
    width: 142rpx;
    padding: 17rpx 0 10rpx 0;
    height: calc(150rpx - 30rpx);
}

.iconn_item_url {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 120rpx;
}

.iconn_item_url image {
    width: 80rpx;
    height: 80rpx;
    display: block;
}

.iconn_item_url text {
    display: block;
    color: #888;
    margin-top: 10rpx;
    line-height: 30rpx;
    font-size: 26rpx;
    text-align: center;
}

@media (prefers-color-scheme: dark) {
    .iconnBar {
        background-color: #f5f4f4;
    }
}
</style>
