<template>
    <view>
        <block>
            <view class="contain" @tap="ShowContent">
                <!-- 这里需要插入高度 -->
                <view class="contain-img">
                    <image :src="item.Cover" class="img" lazy-load :style="'height: ' + (item.ShowHeight > 500 ? 500 + 'rpx' : item.ShowHeight + 'rpx') + ';'"></image>
                    <view class="local_block">
                        <view class="local">
                            <image class="local_img" src="/static/pages/more/components/LoseCard/images/local.png"></image>
                            <text class="local_text">{{ item.campus }}</text>
                        </view>
                        <view class="local2"></view>
                    </view>
                </view>
                <view class="head">
                    <view class="head_top">
                        <!-- <view class="head_Label">{{item.Label}}</view> -->
                        <text class="head_title">{{ item.Title }}</text>
                    </view>
                </view>
                <view class="end">
                    <view class="end_left">
                        <view class="end_state">{{ item.Label }}</view>
                        <view class="end_reward" :style="'display:' + (item.Other == '悬赏' ? 'block' : 'none')">
                            {{ item.Other }}
                        </view>
                        <view class="end_state color1">{{ item.LoseType }}</view>
                    </view>
                    <view class="body color2" :style="'display:' + (item.LoseState ? 'block' : 'none')">已找到</view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
var app = getApp();

class cardFunction {}

export default {
    data() {
        return {
            character: {},
            be_character: {}
        };
    },
    props: {
        item: {
            type: Object,
            default: () => []
        },
        type: {
            type: String,
            default: ''
        },
        // 当前标签下标
        currentTab: {
            // 用于点赞逻辑
            type: Number
        }
    },
    mounted() {
        let content = this.item;
        let args = uni.getStorageSync('args');
        let character = {
            userName: args.username,
            iconUrl: args.iconUrl,
            nickName: args.nickName
        };
        let be_character = {
            userName: content.username,
            iconUrl: content.iconUrl,
            nickName: content.nickName
        }; // console.log(content);

        this.setData({
            character,
            be_character
        });
    },
    methods: {
        ShowContent: function (e) {
            console.log(this.item.LoseState); //对数据进行更新
            // var content = JSON.stringify(this.data.item)

            let content = {
                AllPhoto: this.item.AllPhoto,
                CommentList: this.item.CommentList,
                Cover: this.item.Cover,
                CoverHeight: this.item.CoverHeight,
                CoverWidth: this.item.CoverWidth,
                Label: this.item.Label,
                LoseTime: this.item.LoseTime,
                LoseType: this.item.LoseType,
                LoseState: this.item.LoseState,
                Other: this.item.Other,
                School: this.item.School,
                ShowHeight: this.item.ShowHeight,
                SortTime: this.item.SortTime,
                Star: this.item.Star,
                Star_User: this.item.Star_User,
                Text: this.item.Text,
                Time: this.item.Time,
                Title: this.item.Title,
                campus: this.item.campus,
                iconUrl: this.item.iconUrl,
                nickName: this.item.nickName,
                username: this.item.username,
                _id: this.item._id
            };
            console.log(content);
            let jsonStr = JSON.stringify(content);
            let data = encodeURIComponent(jsonStr);
            uni.navigateTo({
                url: `./pages/LoseDetailContent/LoseDetailContent?content=${data}`,

                fail() {
                    uni.navigateTo({
                        url: `../../pages/LoseDetailContent/LoseDetailContent?content=${data}`
                    });
                }
            });
        },

        onLazyLoad(info) {}
    }
};
</script>
<style>
/* components/LoseObjCards/LoseObjCards.wxss */
/* pages/index_copy/index_copy.wxss */

.img {
    width: 360rpx;
}
.contain {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* margin:10rpx; */
    width: 360rpx;
    overflow: hidden;
    border-radius: 10rpx;
    background-color: #fff;
    /* background-image:  linear-gradient( #ffffff 80% , #c3e8ef); */
    /* opacity: 0.4; */
    z-index: -1;
    margin-bottom: 10rpx;
}
.img {
    background-color: #ebebebd8;
    /* background-image:  linear-gradient( #ffffff 10% , #c3e8ef); */
    z-index: -1;
}
.head {
    /* font-size: 28rpx; */
    color: rgb(0, 0, 0);
    line-height: 22rpx;
    padding: 0rpx 21rpx 0rpx 21rpx;
    /* margin-top: 20rpx; */
}
.head_Label {
    font-size: 20rpx;
    /* padding:4rpx 8rpx; */

    display: flex;
    height: 20rpx;
    align-self: center;
    padding: 4rpx 8rpx;
    /* align-items: center; */
    /* height: 22rpx; */
    line-height: 24rpx;
    /* height: 26rpx; */
    /* padding:4rpx 8rpx; */
    background-color: #3c96f0;
    border-radius: 5rpx;
    margin-right: 15rpx;
    vertical-align: middle;
    color: white;
}
.head_top {
    display: flex;
    align-items: center;
    vertical-align: middle;
    margin-top: -20rpx;
}
.head_title {
    /* float: left */
    font-size: 26rpx;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.body {
    /* opacity: 0.6; */

    /* color: #3C96F0; */
    /* margin-top: 20rpx; */
    font-size: 18rpx;
    padding: 5rpx;
    padding-right: 7rpx;
    padding-left: 7rpx;
    color: white;
    border-radius: 10rpx;
}
.end_left {
    display: flex;
    flex-direction: row;
}
.end {
    display: flex;
    margin: 20rpx 21rpx;
    font-size: 18rpx;
    justify-content: space-between;
}
.end_state {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 7rpx;
    background-color: rgba(73, 160, 247, 0.45);
    padding: 5rpx;
    padding-left: 7rpx;
    padding-right: 7rpx;
    color: white;
    border-radius: 10rpx;
}
.end_reward {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 7rpx;
    /* background-color:#FFE1B0; */
    background-color: rgba(255, 212, 174, 0.7);
    color: white;
    border-radius: 10rpx;
    padding: 5rpx;
    padding-left: 7rpx;
    padding-right: 7rpx;
}
.local_img {
    width: 28rpx;
    height: 28rpx;
    vertical-align: middle;
    margin-right: 5rpx;
    /* padding-left: 10rpx; */
    z-index: 999;
}
.local {
    /* display: inline-block; */
    display: flex;
    align-items: center;
    z-index: 999;
    float: left;
    position: relative;
    bottom: 50rpx;
    left: 20rpx;
    font-size: 20rpx;
    color: white;
    /* height: 20rpx; */
    padding: 3rpx;
    border-radius: 8rpx;
    vertical-align: middle;
    /* z-index: 999; */
    /* background-color: red; */
    opacity: 1;
}
.local2 {
    position: relative;
    bottom: 80rpx;
    /* background-ime:  linear-gradient(rgba(255,255,255, 0) , rgba(0,0,0,0.9)); */
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
    height: 74rpx;
    /* height: 30%; */
    width: 100%;
    /* opacity: 0.2; */
    z-index: 1;
}
.local_block {
    height: 0rpx;
}
.local_text {
    opacity: 1;
    font-size: 24rpx;
    line-height: 20rpx;
    /* z-index: 3; */
    /* color:black; */
    color: white;
    padding: 5rpx 3rpx;
    /* font-weight: 800; */
}
.color2 {
    background: rgba(200, 220, 190);
}
.color1 {
    background: rgba(90, 155, 155, 0.45);
}
@media (prefers-color-scheme: dark) {
    .contain {
        filter: invert(0%) !important;
        background-color: rgba(255, 255, 255);
        /* background-image: linear-gradient(#ffffff 80% , #c3e8ef); */
        /* background-image:  linear-gradient( #ffffff 80% , #c3e8ef); */
    }
    .end_state {
        filter: invert(10%) !important;
        color: black;
        background-color: rgba(255, 121, 63, 0.5);
    }
    .end_reward {
        filter: invert(10%) !important;
        color: black;
        background-color: rgba(71, 71, 135, 0.5);
    }
    .body {
        filter: invert(10%) !important;
        color: black;
    }
    .color1 {
        background-color: rgba(255, 77, 77, 0.5);
    }
    .color2 {
        background-color: rgba(33, 140, 116, 0.5);
    }

    .local_text {
        filter: invert(100%) !important;
    }
    .local2 {
        filter: invert(100%) !important;
    }
}
</style>
