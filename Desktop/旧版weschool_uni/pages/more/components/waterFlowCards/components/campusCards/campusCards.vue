<template>
    <script module="m1" lang="wxs">
        var getStar = function (item, character) {
          var starSrc = '../../../../../../images/zan1.png'
          if (item.Star_User) {
            item.Star_User.forEach(function (e) {
              if (e && e.username === character.userName) {
                console.log("e",e);
                starSrc = '../../../../../../images/zan.png'
              }

            })
          }

          return starSrc;
        }
        module.exports.getStar = getStar;
    </script>

    <view class="pic" @tap="ShowContent">
        <image
            class="Show_Image"
            lazy-load
            :src="itemClone.Cover"
            mode="aspectFill"
            :style="'height: ' + (itemClone.ShowHeight > 500 ? 500 + 'rpx' : itemClone.ShowHeight + 'rpx') + ';'"
            @error="binderrorimg"
            @load="onLazyLoad"
        ></image>
        <view>
            <span class="pic_Title">
                <text>{{ itemClone.Title || itemClone.Text }}</text>
            </span>
            <image :src="itemClone.iconUrl" class="text_user" />
            <span class="text_username">{{ itemClone.nickName }}</span>
            <div class="comment">
                <div style="margin-right: 6px">
                    <image :src="m1.getStar(itemClone, character)" @tap.stop.prevent="getStar_card" class="commentImg" :data-index="index" />
                    <span class="commentNum">{{ itemClone.Star_User ? itemClone.Star_User.length : 0 }}</span>
                </div>
                <div style="margin-right: 6px">
                    <image src="/static/images/comment.png" class="commentImg" />
                    <span class="commentNum">{{ itemClone.CommentList ? itemClone.CommentList.length : 0 }}</span>
                </div>
            </div>
        </view>
    </view>
</template>

<script>
var app = getApp();

var moreUtil = require('../../../../utils/utils');

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
        };
        this.setData({
            character,
            be_character
        });
    },
    methods: {
        ShowContent: function (e) {
            let content = {
                AllPhoto: this.item.AllPhoto,
                CommentList: this.item.CommentList,
                Cover: this.item.Cover,
                CoverHeight: this.item.CoverHeight,
                CoverWidth: this.item.CoverWidth,
                Label: this.item.Label,
                LoseTime: this.item.LoseTime,
                LoseType: this.item.LoseType,
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
            }; // 先对数据进行 JSON

            let jsonStr = JSON.stringify(content); // 对数据进行URI编码，防止数据被截断。少量数据没问题，如果对象较大则容易被截断，获取不到完整数据

            let data = encodeURIComponent(jsonStr); // wx.navigateTo({
            //   url: `./pages/DetailContent/DetailContent`,
            //   success: res => {
            //     res.eventChannel.emit('setContentData', content)
            //   },
            // })

            uni.navigateTo({
                // 从校园圈主页跳转
                url: `./pages/DetailContent/DetailContent?content=${data}`,

                // 从我的发布页面跳转
                fail() {
                    uni.navigateTo({
                        url: `../../pages/DetailContent/DetailContent?content=${data}`
                    });
                }
            });
        },

        //点击事件
        getStar_card(e) {
            var content = this.item;
            var args = uni.getStorageSync('args'); // 边界处理 - 初始化数组

            if (content.Star_User) {
                ('');
            } else {
                content.Star_User = [];
            } // 标志用户点赞状态   false:未点赞；true：已点赞

            var Starif = false; // 判断该用户是否已点过赞

            for (var i = 0; i < content.Star_User.length; i++) {
                if (content.Star_User[i].username == args.username) {
                    Starif = true;
                    content.Star_User.splice(content.Star_User.indexOf(args.username), 1);
                    break;
                }
            } // 若用户是未点赞状态，则 content.Star_User 新增该用户

            if (!Starif) {
                // let openusername = {
                //   username: args.username,
                //   iconUrl: args.iconUrl,
                //   nickName: args.nickName,
                //   Star_time: new Date().getTime()
                // };
                content.Star_User.push({
                    username: args.username
                });
                uni.showToast({
                    title: '点赞成功',
                    icon: 'none'
                });
            }

            var that = this;
            let starTime = new Date().getTime(); // 点赞时间
            // 对数据库数据进行更新

            wx.cloud
                .callFunction({
                    // 云函数更改点赞状态
                    name: 'CampusCircle',
                    data: {
                        type: 'StarControlLogs',
                        Star_User: content.Star_User,
                        // 旧云函数 starCount 要用到
                        character: that.character,
                        be_character: that.be_character,
                        createTime: starTime,
                        arcticle: content
                    }
                })
                .then(); // 赋值并重渲染本组件

            this.setData({
                itemClone: content
            }); // 变更全局数据 - 在当前页面中渲染出来

            let allList = app.globalData.allList;
            allList.forEach((item) => {
                item.forEach((e) => {
                    if (e._id === content._id) {
                        e.Star_User = content.Star_User;
                    }
                });
            });
            moreUtil.setAllList(allList, '点赞');
        },

        onLazyLoad(info) {},

        binderrorimg() {
            console.log('占位：函数 binderrorimg 未声明');
        }
    },
    watch: {
        item: {
            handler: function (newVal, oldVal) {
                this.itemClone = newVal;
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
.content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
    margin: 10rpx;
}

.left {
    width: 330rpx;
}

.right {
    width: 330rpx;
    margin-left: 10rpx;
}
.Show_Image {
    width: 360rpx;
    background-color: #ebebebd8;
}
.pic {
    border-radius: 10rpx;
    width: 360rpx;
    background-color: rgb(255, 255, 255);
    margin-bottom: 15rpx;
    overflow: hidden;
}
.pic_Label {
    /* color:rgb(252, 219, 129);
  margin-right: 5px;
  font-size: 24rpx; */
    color: white;
    background-color: rgba(230, 130, 130, 1);
    font-size: 20rpx;
    padding: 4rpx 8rpx;
    /* margin: 0rpx auto ; */
    margin-right: 10rpx;
    vertical-align: middle;
    border-radius: 5rpx;
}
.pic_Title {
    color: rgb(0, 0, 0);

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
.text_user {
    width: 35rpx;
    height: 35rpx;
    border-radius: 50rpx;
    margin: 15rpx 21rpx;
}
.text_username {
    font-size: 20rpx;
    position: relative;
    bottom: 22rpx;
    right: 10rpx;
    color: rgba(128, 128, 128, 0.8);
}
.comment {
    width: 20rpx;
    height: 20rpx;
    position: sticky;
    left: 240rpx;
    bottom: 13rpx;
}
.commentImg {
    width: 32rpx;
    height: 32rpx;
    /* position: relative;
  bottom: 10rpx;
  left: 150rpx; */
    /* margin: 10rpx 0rpx 10rpx 150rpx; */
}
.commentNum {
    font-size: 22rpx;
    position: relative;
    bottom: 8rpx;
    padding-top: 2rpx;
    left: 2rpx;
    color: rgba(0, 0, 0, 0.4);
}

@media (prefers-color-scheme: dark) {
    .pic {
        background-color: #f1eded;
        /* filter: invert(100%) !important; */
    }
    .pic_Label {
        filter: invert(100%) !important;
    }
    .pic_Title {
        color: #fff;
        filter: invert(100%) !important;
    }
}
</style>
