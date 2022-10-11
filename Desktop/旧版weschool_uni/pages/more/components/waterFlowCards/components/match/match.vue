<template>
    <script module="m1" lang="wxs">
        var color=['#95c395', '#f7c1b7', '#779de6', '#6f429c']
        module.exports.message=color
    </script>

    <view class="pic" @tap="ShowContent" :data-index="index">
        <image
            class="Show_Image"
            lazy-load
            :src="item.Cover"
            mode="aspectFill"
            :style="'height: ' + (item.ShowHeight > 500 ? 500 + 'rpx' : item.ShowHeight + 'rpx') + ';'"
            @error="binderrorimg"
            @load="onLazyLoad"
        ></image>
        <view class="local_block">
            <view class="local">
                <!-- <text class="local_text" style="bottom:{{item.ShowHeight}}rpx">主办方 {{item.assoMess.association}}</text> -->
                <text class="local_text">主办方 {{ item.assoMess.association }}</text>
            </view>
            <view class="local2"></view>
        </view>
        <view class="content_wrap">
            <span class="pic_Title">
                <text>{{ item.Text }}</text>
            </span>
            <span class="match_wrap">
                <span class="tip_wrpa">
                    <view class="tip" :style="'background-color: ' + m1.message[index] + ';'" v-for="(item, index) in item.borderArr" :key="index">
                        {{ item }}
                    </view>
                </span>
                <view class="outTime" :style="'color:' + (tools.getDateTime(time, item.date) > 0 ? '' : '#a8dba8') + ';'">
                    {{ tools.getDateTime(time, item.date) > 0 ? '剩' + tools.getDateTime(time, item.date) + '天' : '已截止' }}
                </view>
                <!-- <view class="mess_wrap">
        <view class="time" style="color:{{tools.getDateTime(time,item.date)>0?'':'#a8dba8'}};">
          <view style="color:{{tools.getDateTime(time,item.date)>0?'':'#a8dba8'}};">
            {{tools.getDateTime(time,item.date)>0?tools.getDateTime(time,item.date):''}}{{tools.getDateTime(time,item.date)>0?'天后结束':'已截止'}}
          </view>
        </view>
      </view> -->
            </span>
        </view>
    </view>
</template>
<script module="tools" lang="wxs" src="./time.wxs"></script>
<script>
var app = getApp();
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
        },
        time: {
            type: Number,
            default: Date.now()
        } // endTime: {
        //   type: Number,
        //   value: new Date(date)
        // }
        // data:{
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
    beforeMount: function () {},
    methods: {
        ShowContent: function (e) {
            //对数据进行更新
            // var assoMess = JSON.stringify(this.data.item.assoMess)
            // var Title = this.data.item.Title
            // var Text = this.data.item.Text
            // this.setData({
            // })
            let content = {
                _id: this.item._id,
                assoMess: this.item.assoMess,
                Title: this.item.Title,
                Text: this.item.Text,
                borderArr: this.item.borderArr,
                question: this.item.question,
                date: this.item.date,
                match_id: this.item.match_id,
                AllPhoto: this.item.AllPhoto
            };
            let jsonStr = JSON.stringify(content); // 对数据进行URI编码，防止数据被截断。少量数据没问题，如果对象较大则容易被截断，获取不到完整数据

            let data = encodeURIComponent(jsonStr);
            uni.navigateTo({
                // 从校园圈主页跳转
                url: `./pages/Match/Match?content=${data}`,

                // 从我的发布页面跳转
                fail() {
                    uni.navigateTo({
                        url: `../../pages/Match/Match?content=${data}`
                    });
                }
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
    margin-bottom: 15rpx;
    overflow: hidden;
}
.pic .Show_Image {
    width: 360rpx;
    background-color: #ebebebd8;
}
.pic .local_block {
    height: 0rpx;
}
.pic .local_block .local {
    display: flex;
    align-items: center;
    z-index: 999;
    position: relative;
    bottom: 50rpx;
    left: 20rpx;
    font-size: 20rpx;
    color: white;
    padding: 3rpx;
    border-radius: 8rpx;
    vertical-align: middle;
    opacity: 1;
}
.pic .local_block .local .local_text {
    opacity: 1;
    font-size: 24rpx;
    line-height: 20rpx;
    color: white;
    padding: 5rpx 3rpx;
}
.pic .local_block .local2 {
    bottom: 110rpx;
    position: relative;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
    height: 74rpx;
    width: 100%;
    z-index: 1;
}
.pic .content_wrap .pic_Title {
    color: #000000;
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
.pic .content_wrap .match_wrap {
    display: flex;
    flex-direction: row;
    font-size: 22rpx;
    padding: 4rpx 8rpx;
}
.pic .content_wrap .match_wrap .tip_wrpa {
    padding: 10rpx 4rpx;
    display: flex;
    flex-direction: row;
    flex: 3;
}
.pic .content_wrap .match_wrap .tip_wrpa .tip {
    display: flex;
    color: white;
    padding: 4rpx;
    border-radius: 6rpx;
    margin-left: 12rpx;
    font-size: 18rpx;
    text-align: center;
    align-items: center;
    justify-content: center;
}
.pic .content_wrap .match_wrap .outTime {
    flex: 1;
    font-size: 20rpx;
    display: flex;
    align-items: center;
    text-align: center;
    color: #7a7a7a;
}
@media (prefers-color-scheme: dark) {
    .pic {
        background-color: black;
        filter: invert(100%) !important;
    }
    .Show_Image {
        filter: invert(0%) !important;
    }
    .pic_Label {
        filter: invert(100%) !important;
    }
    .content_wrap .pic_Title {
        color: white;
        filter: invert(100%) !important;
    }
    .content_wrap .match_wrap .mess_wrap {
        color: white;
        filter: invert(100%) !important;
    }
}
</style>
