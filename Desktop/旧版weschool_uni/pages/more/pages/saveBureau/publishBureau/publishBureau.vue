<template>
    <view>
        <!-- pages/more/pages/saveBureau/publishBureau/publishBureau.wxml -->
        <view class="head">
            <view :style="'height: ' + statusBarHeight + 'px;'" />
            <view class="head_second" :style="'height: ' + lineHeight + 'px;'">
                <view class="arrow" @tap="back">
                    <image src="/static/images/arrow.png" />
                </view>
            </view>
        </view>
        <view :style="'height: ' + (statusBarHeight + lineHeight) + 'px;'"></view>

        <view class="All">
            <view class="activityTheme">活动主题</view>
            <view class="categories">
                <view v-for="(item, index) in arry" :key="item.id">
                    <view class="categoriesContent" @tap="chooseLabel" :id="index">
                        <view :class="'circle background-color_' + (index % 2) + ' circle' + index"></view>
                        <text>{{ item.name }}</text>
                    </view>
                </view>
            </view>
            <view class="activityDetails">活动详情</view>
            <form @submit="submit">
                <view class="inputContent">
                    <view class="inputTitle">
                        <textarea placeholder="在此输入活动详情，如时间、地点和活动内容，禁止以任何形式拉群或宣传群聊" name="textarea" show-confirm-bar=""></textarea>
                    </view>

                    <view class="inputImg">
                        <view v-for="(item, index) in photo" :key="item.id">
                            <view class="delImg" :id="index" @tap="delImg">×</view>

                            <view class="Img">
                                <image :src="item.tempFilePath" mode="aspectFill" />
                            </view>
                        </view>
                        <view class="Img2" @tap="addImg">
                            <image src="/static/images/photo.png" />
                        </view>
                    </view>
                </view>
                <view class="position">位置信息</view>
                <view class="choosePosition" @tap="choosePosition">
                    <text>{{ locationName ? locationName : '选择位置' }}</text>
                </view>
                <view class="totalNum">总人数</view>
                <view class="controlNum">
                    <view class="man">
                        <text>男</text>
                        <image src="/static/images/sexm.png" />
                        <view class="manNum">
                            <view class="reduceNum" data-sex="man" @tap="reduceNum">-</view>
                            <view class="num">{{ manNum.length }}</view>
                            <view class="addNum" data-sex="man" @tap="addNum">+</view>
                        </view>
                    </view>
                    <view class="woman">
                        <text>女</text>
                        <image src="/static/images/sexw.png" />
                        <view class="womanNum">
                            <view class="reduceNum" data-sex="woman" @tap="reduceNum">-</view>
                            <view class="num">{{ womanNum.length }}</view>
                            <view class="addNum" data-sex="woman" @tap="addNum">+</view>
                        </view>
                    </view>
                </view>
                <button class="submit" form-type="submit">
                    <text class="sure">确定</text>
                    （需消耗100人品）
                </button>
            </form>
        </view>
    </view>
</template>

<script>
// pages/more/pages/saveBureau/publishBureau/publishBureau.js
var app = getApp();
export default {
    data() {
        return {
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            rectHeight: getApp().globalData.rectHeight,
            windowHeight: getApp().globalData.windowHeight,

            arry: [
                {
                    name: '自习',
                    type: 0
                },
                {
                    name: '电影',
                    type: 0
                },
                {
                    name: '聚餐',
                    type: 0
                },
                {
                    name: '拼车',
                    type: 0
                },
                {
                    name: '拼单',
                    type: 0
                },
                {
                    name: '运动',
                    type: 0
                },
                {
                    name: '游戏',
                    type: 0
                },
                {
                    name: '其他',
                    type: 0
                }
            ],

            photo: [],
            womanNum: [1, 1],
            manNum: [1, 1],
            lastTime: 0,
            label: '',
            addData: '',
            res: '',
            locationName: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.setData({
            arry: this.arry
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        back() {
            uni.navigateBack({
                delta: 1 // 返回上一级页面。
            });
        },

        chooseLabel(e) {
            var index = e.currentTarget.id;
            var getIndex = this.arry.findIndex((item) => item.type === 1); //---判断arry数组里面有没有标签已被选择，没有则getIndex=-1，有则返回已选择的标签索引

            if (getIndex === parseInt(index)) {
                return;
            }

            if (getIndex != -1) {
                //----将前面已选择的标签取消“选择”样式
                this.animate(
                    '.circle' + getIndex,
                    [
                        {
                            width: '100%'
                        },
                        {
                            width: '52rpx'
                        }
                    ],
                    200
                );
                this.arry[getIndex].type = 0;
            }

            this.animate(
                '.circle' + index,
                [
                    {
                        //----给选定标签“选择”样式
                        width: '52rpx'
                    },
                    {
                        width: '100%'
                    }
                ],
                200
            );
            this.arry[index].type = 1;
            this.setData({
                label: this.arry[index].name
            });
        },

        addImg() {
            var that = this;
            uni.chooseMedia({
                // 上传图片
                count: 9,
                mediaType: 'image',
                sourceType: ['album', 'camera'],
                sizeType: ['original', 'compressed'],
                // 可选择原图、压缩图
                success: (res) => {
                    var photo = that.photo.concat(res.tempFiles);
                    that.setData({
                        photo
                    });
                }
            });
        },

        delImg(e) {
            if (!!this.photo.length) {
                this.photo.splice(e.currentTarget.id, 1);
                this.setData({
                    photo: this.photo
                });
            }
        },

        // choosePosition(){
        //   var that = this
        //   var getPosition = ""
        //   wx.getLocation({
        //     isHighAccuracy: true, // 开启地图精准定位
        //     type: 'gcj02', // 地图类型写这个
        //     success: function (res) {
        //       getPosition = res
        //     }
        //   })
        //   wx.chooseLocation({
        //     latitude: getPosition.latitude,
        //     longitude: getPosition.longitude,
        //     success(res) {
        //       that.setData({
        //         locationName:res.name
        //       })
        //     },
        //     fail(res){
        //       console.log(res)
        //       wx.showToast({
        //         title: '请求失败！',
        //         icon: 'none',
        //       })
        //     }
        //   })
        // },
        addNum(e) {
            var sex = e.currentTarget.dataset.sex;

            if (sex === 'man') {
                this.manNum.push(1);
                this.setData({
                    manNum: this.manNum
                });
            } else {
                this.womanNum.push(1);
                this.setData({
                    womanNum: this.womanNum
                });
            }
        },

        reduceNum(e) {
            var sex = e.currentTarget.dataset.sex;

            if (sex === 'man' && this.manNum.length >= 1) {
                this.manNum.pop();
                this.setData({
                    manNum: this.manNum
                });
            } else if (sex === 'woman' && this.womanNum.length >= 1) {
                this.womanNum.pop();
                this.setData({
                    womanNum: this.womanNum
                });
            }
        },

        submit(e) {
            const args = uni.getStorageSync('args');
            var fileIDs = [];

            if (this.label === undefined) {
                uni.showToast({
                    title: '请选择主题！',
                    icon: 'none'
                });
            } else if (e.detail.value.textarea === undefined) {
                uni.showToast({
                    title: '请填写内容！',
                    icon: 'none'
                });
            } else {
                var addData = {
                    text: e.detail.value.textarea,
                    label: this.label,
                    locationName: this.locationName,
                    womanNum: this.womanNum,
                    manNum: this.manNum,
                    time: new Date().getTime(),
                    userName: args.username,
                    iconUrl: args.iconUrl,
                    nickName: args.nickName,
                    school: args.school,
                    commentList: [],
                    sex: args.sex
                };

                const upLoaddata = (addData) => {
                    console.log('enter');
                    wx.cloud.callFunction({
                        name: 'saveBureau',
                        data: {
                            addData: addData,
                            type: 'addCard'
                        },
                        success: (res) => {
                            let pages = getCurrentPages();
                            let prevPage = pages[pages.length - 2];
                            prevPage.setData({
                                addData,
                                res: res.result._id
                            });
                            uni.navigateBack({
                                delta: 1 // 返回上一级页面。
                            });
                        },
                        fail: (err) => {
                            console.error;
                        }
                    });
                };

                const antiShake = () => {
                    if (new Date().getTime() - this.lastTime > 3500) {
                        upLoaddata(addData);
                    }

                    this.lastTime = new Date().getTime();
                };

                if (this.photo.length != 0) {
                    this.photo.forEach((item) => {
                        uni.compressImage({
                            src: item.tempFilePath,
                            // 图片路径
                            quality: 50,
                            // 压缩质量,
                            success: (res) => {
                                wx.cloud
                                    .uploadFile({
                                        cloudPath: 'saveBureau_images/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png',
                                        filePath: res.tempFilePath
                                    })
                                    .then((res) => {
                                        fileIDs.push(res.fileID);
                                        addData.photo = fileIDs;
                                        antiShake();
                                    });
                            }
                        });
                    });
                } else {
                    antiShake();
                }
            }
        },

        choosePosition() {
            console.log('占位：函数 choosePosition 未声明');
        }
    }
};
</script>
<style>
/* pages/more/pages/saveBureau/publishBureau/publishBureau.wxss */
page {
    /* background-color: #ffedb7c2; */
    background: linear-gradient(#fff3d0c2, #ffe8a4c2);
}
.head {
    position: fixed;
    background-color: #fff5d7;
    z-index: 2;
    width: 100%;
    overflow-x: auto;
}
.head_second {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    width: 100vw;
}

.head image {
    width: 50rpx;
    height: 50rpx;
    margin-left: 34rpx;
    transform: rotate(90deg);
}
.All {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 15rpx;
}
.activityTheme {
    margin-left: 10rpx;
    font-size: 33rpx;
    font-weight: 550;
    letter-spacing: 3rpx;
    margin-right: 550rpx;
}
.categories {
    height: 190rpx;
    border-radius: 20rpx;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
.categoriesContent {
    background-color: rgb(255, 255, 255);
    width: 138rpx;
    height: 60rpx;
    border-radius: 40rpx;
    border: 4rpx solid #f8931c;
    margin: 0 12rpx;
    display: flex;
    align-items: center;
    color: #6060d8;
    font-size: 32rpx;
    letter-spacing: 6rpx;
    box-shadow: 3px 3px #6b421140;
}
.circle {
    width: 52rpx;
    height: 52rpx;
    border-radius: 23rpx;
    position: relative;
}
.categoriesContent text {
    position: absolute;
    margin-left: 35rpx;
}
.activityDetails {
    margin-left: 10rpx;
    font-size: 33rpx;
    font-weight: 550;
    letter-spacing: 3rpx;
    margin-top: 20rpx;
    margin-right: 550rpx;
}
.inputContent {
    width: 684rpx;
    min-height: 335rpx;
    background-color: white;
    margin-top: 18rpx;
    padding: 10rpx;
    border-radius: 20rpx;
    border: 4rpx solid #f8931c;
    display: flex;
    flex-direction: column;
    box-shadow: 3px 3px #6b421140;
}
.inputTitle {
    height: 160rpx;
    width: 95%;
    margin-top: 10rpx;
    margin-left: 18rpx;
}
.inputTitle textarea {
    width: 100%;
    height: 100%;
}
.inputImg {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 7rpx;
}
.Img2 {
    width: 140rpx;
    height: 140rpx;
    margin: 8rpx 8rpx;
    border: 4rpx solid #f8931c;
    display: flex;
    align-items: center;
    justify-content: center;
}
.Img {
    width: 140rpx;
    height: 140rpx;
    margin: 8rpx 8rpx;
    border: 4rpx solid #f8931c;
    display: flex;
    position: relative;
}
.Img image {
    width: 100%;
    height: 100%;
}
.Img2 image {
    width: 37rpx;
    height: 32rpx;
}
.delImg {
    height: 43rpx;
    width: 43rpx;
    background-color: black;
    border-radius: 50rpx;
    z-index: 2;
    position: absolute;
    margin-left: 120rpx;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}
.position {
    margin-left: 10rpx;
    font-size: 33rpx;
    font-weight: 550;
    letter-spacing: 3rpx;
    margin-top: 38rpx;
    margin-right: 550rpx;
}
.choosePosition {
    background-color: white;
    width: 650rpx;
    height: 50rpx;
    padding: 15rpx 28rpx;
    border-radius: 20rpx;
    border: 4rpx solid #f8931c;
    margin-top: 18rpx;
    box-shadow: 3px 3px #6b421140;
    display: flex;
    align-items: center;
}
.choosePosition text {
    font-size: 30rpx;
    font-weight: 550;
}
.totalNum {
    margin-left: 10rpx;
    font-size: 33rpx;
    font-weight: 550;
    letter-spacing: 3rpx;
    margin-top: 35rpx;
    margin-right: 590rpx;
}
.controlNum {
    width: 710rpx;
    height: 78rpx;
    margin-top: 18rpx;
    display: flex;
    flex-direction: row;
}
.woman,
.man {
    height: 100%;
    width: 300rpx;
    background-color: white;
    border-radius: 20rpx;
    border: 4rpx solid #f8931c;
    box-shadow: 3px 3px #6b421140;
    padding-left: 30rpx;
    padding-right: 15rpx;
    /* padding: 0 30rpx; */
    display: flex;
    align-items: center;
    flex-direction: row;
}
.woman {
    margin-left: 25rpx;
}
.woman image,
.man image {
    width: 32rpx;
    height: 32rpx;
    margin-left: 8rpx;
}
.man text,
.woman text {
    font-weight: 550;
    font-size: 30rpx;
}
.womanNum,
.manNum {
    width: 130rpx;
    height: 50rpx;
    margin-left: 97rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.reduceNum {
    height: 30rpx;
    width: 30rpx;
    background-color: white;
    border-radius: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-weight: 550;
    border: 4rpx solid #f8931c;
}
.num {
    margin-left: 15rpx;
    margin-top: 3rpx;
    font-size: 30rpx;
    font-weight: 550;
}
.addNum {
    height: 30rpx;
    width: 30rpx;
    background-color: white;
    border-radius: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-weight: 550;
    border: 4rpx solid #f8931c;
    margin-left: 17rpx;
}
.submit {
    background-color: #fe6a62;
    width: 710rpx !important;
    height: 82rpx !important;
    margin-top: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50rpx;
    border: 4rpx solid #a3423dcc;
    box-shadow: inset -2px -3px 1px #d82016a2, inset 1px 3px 1px #fba9a2d3;
    color: white;
    font-size: 28rpx;
}
.sure {
    font-size: 36rpx;
    font-weight: 550;
    margin-right: 5rpx;
}
.background-color_0 {
    background-color: #ddc6a4;
}
.background-color_1 {
    background-color: #94d4ae;
}
@media (prefers-color-scheme: dark) {
    .head {
        filter: invert(0) !important;
    }
    /* image{
    filter: invert(1) !important;
  } */
    .All {
        filter: invert(1) !important;
    }
    .head {
        position: fixed;
        background-color: #faf9f900;
    }
    page {
        filter: invert(1) !important;
        background-color: #242424c2;
    }
    .submit {
        filter: invert(0) !important;
    }
}
</style>
