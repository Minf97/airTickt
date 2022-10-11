<template>
    <view class="pic">
        <view class="tip_wrap">
            <view class="tip_title" @tap="allAsso">we校园社团报名></view>
            <view class="tip_tip" @tap="ShowContent">2.8万同学在这里</view>
        </view>
        <image
            @tap="ShowContent"
            class="Show_Image"
            lazy-load
            :src="item.Cover"
            mode="aspectFill"
            :style="'height: ' + (item.ShowHeight > 500 ? 500 + 'rpx' : item.ShowHeight + 'rpx') + ';'"
            @error="binderrorimg"
            @load="onLazyLoad"
        ></image>
        <view class="back" @tap="ShowContent">
            <!-- 标签标题 -->
            <span class="pic_Title">
                <text>{{ item.Title || item.Text }}</text>
            </span>
            <!-- 活动信息 -->
            <span class="acivity_wrap">
                <!-- <span class="out_time">还剩:1天</span> -->
                <span class="association_wrap">
                    <span class="association_name">{{ item.association[0].detail }}</span>
                    <span class="person_num">{{ item.personArr.length == 0 ? '1' : item.personArr.length }}人参与</span>
                </span>
            </span>
        </view>
    </view>
</template>

<script>
var app = getApp();

class cardFunction {}

export default {
    data() {
        return {
            character: '',
            be_character: ''
        };
    },
    props: {
        item: {
            type: Object,
            default: () => []
        },
        List: {
            type: Array,
            default: () => []
        },
        openusername: {
            type: Object
        },
        direction: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        } // data:{
        //   openusername:{}
        // }
    },
    mounted() {
        let content = this.item;
        console.log(content);
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
    beforeMount: function () {
        // let time=Date(Date.now()).toString().split("")
        // console.log(time);
    },
    // attached(){
    //   console.log('666');
    // },
    methods: {
        ShowContent: function (e) {
            //对数据进行更新
            var content = JSON.stringify(this.item);

            try {
                content = JSON.parse(JSON.stringify(this.item));

                if (content.CommentList) {
                    delete content.CommentList;
                }

                content = JSON.stringify(content);
            } catch {}

            uni.navigateTo({
                url: './pages/Freshman/Freshman?content=' + content,

                fail() {
                    uni.navigateTo({
                        url: '../../pages/Freshman/Freshman?content=' + content
                    });
                }
            });
        },

        allAsso: function () {
            uni.navigateTo({
                // url: '../../../../pages/allAsso/allAsso',
                url: '/pages/association/allAsso/allAsso',
                success: (result) => {}
            });
        },

        onLazyLoad(info) {},

        binderrorimg() {
            console.log('占位：函数 binderrorimg 未声明');
        }
    }
};
</script>
<style>
.pic {
    border-radius: 10rpx;
    width: 360rpx;
    background-color: #ffffff;
    margin-bottom: 10rpx;
    overflow: hidden;
    background-image: linear-gradient(#ecf1fc, #f0f5ff);
}
.pic .Show_Image {
    width: 360rpx;
}
.pic .back .pic_Title {
    color: #000000;
    padding-top: 18rpx;
    font-size: 28rpx;
    font-family: 'Arial', 'Microsoft YaHei', '黑体', '宋体', sans-serif;
    line-height: 46rpx;
    padding: 8rpx 21rpx 0rpx 21rpx;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.pic .back .pic_Title .pic_Label {
    /* color:rgb(252, 219, 129);
        margin-right: 5px;
        font-size: 24rpx; */
    color: white;
    background-color: #e68282;
    font-size: 20rpx;
    padding: 4rpx 8rpx;
    /* margin       : 0rpx auto ; */
    margin-right: 10rpx;
    vertical-align: middle;
    border-radius: 5rpx;
}
.pic .back .acivity_wrap {
    font-size: 22rpx;
    display: flex;
    flex-direction: column;
    padding: 4rpx 8rpx;
}
.pic .back .acivity_wrap .out_time {
    padding: 4rpx 16rpx;
    color: #ff6565;
}
.pic .back .acivity_wrap .association_wrap {
    display: flex;
    padding: 4rpx 16rpx;
    padding-bottom: 24rpx;
}
.pic .back .acivity_wrap .association_wrap .association_name {
    flex: 2;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding: 2rpx;
    border-radius: 8rpx;
}
.pic .back .acivity_wrap .association_wrap .person_num {
    flex: 1;
    color: rgba(8, 8, 8, 0.4);
    text-align: right;
}
.pic .tip_wrap {
    padding-left: 24rpx;
    padding-top: 12rpx;
    padding-bottom: 12rpx;
}
.pic .tip_wrap .tip_title {
    font-size: 32rpx;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-weight: 700;
    padding-top: 12rpx;
}
.pic .tip_wrap .tip_tip {
    font-size: 28rpx;
    padding-top: 12rpx;
    padding-bottom: 12rpx;
}
@media (prefers-color-scheme: dark) {
    .pic {
        background-color: black;
        filter: invert(100%) !important;
    }
    .pic .tip_wrap {
        background-color: black;
        color: white;
    }
    .pic .Show_Image {
        filter: invert(0%) !important;
    }
    .pic .back {
        background-color: black;
        color: white;
    }
    .pic .back .pic_Title {
        color: white;
    }
    .pic .back .acivity_wrap .association_wrap .person_num {
        color: white;
    }
}
</style>
