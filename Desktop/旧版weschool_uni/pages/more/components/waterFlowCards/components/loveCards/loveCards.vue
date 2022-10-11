<template>
    <script module="m1" lang="wxs">
        var getStar = function (item, openusername) {
          var starSrc = '../../images/zan1.png'
          if (item.Star_User) {
            item.Star_User.forEach(function (e) {

              if (e.username === openusername.username) {
                starSrc = '../../images/zan.png'
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
                <text class="text_title">哈哈哈</text>
            </span>
            <image :src="itemClone.iconUrl" class="text_user" />
            <span class="text_username">{{ itemClone.nickName }}</span>
            <div class="comment">
                <div style="margin-right: 6px">
                    <image :src="m1.getStar(itemClone, openusername)" @tap.stop.prevent="getStar_card" class="commentImg" :data-index="index" />
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

class cardFunction {}

export default {
    data() {
        return {
            Star_User: ''
        };
    },
    props: {
        item: {
            type: Object,
            default: () => []
        },
        openusername: {
            type: Object
        },
        type: {
            type: String,
            default: ''
        }
    },
    methods: {
        ShowContent: function (e) {
            //对数据进行更新
            var content = JSON.stringify(this.item);
            uni.navigateTo({
                url: '../../pages/more/pages/DetailContent/DetailContent?content=' + content
            });
        },

        //点击事件
        getStar_card(e) {
            //--------------------Starif：false:未点赞；true：已点赞
            var content = this.item;
            var args = uni.getStorageSync('args');
            var Star_User = content.Star_User; //初始点赞用户

            var openusername = this.openusername;

            if (!Star_User) {
                //判断点赞人有没有在数组里面
                Star_User = [];
            }

            var Starif = false; //判断是不是为点赞过的usernameid
            ///--------------------------------------取消点赞（48-54）

            for (var i = 0; i < Star_User.length; i++) {
                if (Star_User[i].username == openusername.username) {
                    Starif = true;
                    Star_User.splice(Star_User.indexOf(Star_User[i]), 1); //改变了 Star_User  --> content.Star_User

                    break;
                }
            }

            if (!Starif) {
                openusername.Star_time = new Date().getTime();
                Star_User.push(openusername); // 改变了 Star_User

                uni.showToast({
                    title: '点赞成功',
                    icon: 'none'
                });
            }

            var Star_count = Star_User.length; //点赞后对本地数据进行更新
            //点赞用户更新

            content.Star_User = Star_User; //点赞用户数更新

            content.Star = Star_count;
            let character = {
                // 处理得到点赞者信息
                userName: args.username,
                iconUrl: args.iconUrl,
                nickName: args.nickName
            };
            let be_character = {
                // 被点赞者信息
                userName: content.username,
                iconUrl: content.iconUrl,
                nickName: content.nickName
            };
            let starTime = new Date().getTime(); // 点赞时间

            app.globalData.allList.forEach((e) => {
                if (e._id === content._id) {
                    e.Star_count = Star_count;
                    e.Star_User = Star_User;
                }
            });
            var that = this; //点赞后对数据库数据进行更新

            wx.cloud
                .callFunction({
                    // 云函数更改点赞状态
                    name: 'CampusCircle',
                    data: {
                        type: 'StarControlLogs',
                        Time: content.Time,
                        Star: Star_count,
                        Star_User: Star_User,
                        character: character,
                        username: args.username,
                        be_character: be_character,
                        be_username: content.username,
                        createTime: starTime,
                        arcticle: content,
                        arcticle_id: content._id,
                        _id: content._id,
                        username: args.username
                    }
                })
                .then();
            that.setData({
                itemClone: { ...that.item, Star: Star_count },
                Star_User: Star_User
            }); // app.globalData.List = this.data.List
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
    width: 360rpx;
}

.right {
    width: 360rpx;
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
    margin-bottom: 10rpx;
    overflow: hidden;
    background-image: linear-gradient(#ffffff 75%, #fde2ec);
}
.text_title {
    color: #e5404f;
}
.pic_Label {
    /* color:rgb(252, 219, 129);
  margin-right: 5px;
  font-size: 24rpx; */
    color: white;
    background-color: rgb(230, 173, 173);
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
        filter: invert(0%) !important;
        background-image: linear-gradient(#ffffff 75%, #fde2ec);
        background-image: linear-gradient(#ffffff 90%, #ffffff);
    }
    .text_title {
        filter: invert(100%) !important;
        color: #cab3b4;
    }
    .pic_Label {
        filter: invert(100%) !important;
    }
}
</style>
