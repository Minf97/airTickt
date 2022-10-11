<template>
    <view class="wrap">
        <swiper
            :indicator-dots="true"
            indicator-color="rgba(223, 223, 223, 0.39)"
            indicator-active-color="rgb(235, 21, 21)"
            :style="'height: ' + (content.ShowHeight > 300 ? 370 + 'rpx' : content.ShowHeight + 'px') + ';'"
        >
            <block class="photo" v-for="(item, index) in content.AllPhoto" :key="item.Photo">
                <swiper-item>
                    <image :src="item" mode="aspectFill" style="z-index: 11" @tap="ShowImg" class="ShowImg" :data-index="index" />
                </swiper-item>
            </block>
        </swiper>
        <view class="endTime">截止时间:{{ content.endTime }}</view>
        <view class="mess_wrap">
            <view class="mess_caption">社团信息</view>
            <view class="mess_list">
                <view class="mess_item" v-for="(item, index) in content.association" :key="index">
                    <view class="title">{{ item.name }}</view>

                    <view class="content">{{ item.detail }}</view>
                </view>
            </view>
        </view>
        <form @submit="parseEventDynamicCode($event, apply == false ? (timeOut == true ? 'submit' : 'timeOut') : '')">
            <view class="apply">
                <view class="apply_caption">报名申请</view>
                <view class="input_list">
                    <view class="input_item" v-for="(item, index) in content.question" :key="index">
                        <view class="input_title">{{ item.content }}</view>

                        <input placeholder="请输入" class="input_content" :name="item.content" />
                    </view>
                </view>
            </view>
            <button
                class="end"
                form-type="submit"
                :style="'background-color:' + (apply == false ? (timeOut == true ? '' : '#777777') : '#777777')"
                @tap="parseEventDynamicCode($event, apply == true ? 'nosubmit' : '')"
            >
                {{ apply == false ? (timeOut == true ? '完成提交' : '已截止') : '已报名' }}
            </button>
        </form>
    </view>
</template>

<script>
// pages/more/pages/Freshman/Freshman.js
const db = wx.cloud.database();
let username = '';

var time = require('../../../../utils/time.js');

export default {
    data() {
        return {
            apply: false,

            //是否已经报名,
            //是否截止
            timeOut: false,

            content: {
                ShowHeight: 0,
                AllPhoto: [],
                endTime: '',
                association: [],
                question: []
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        // console.log(options);
        var date = new Date(Date.parse(new Date()));
        var Y = date.getFullYear(); //年

        var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; //月

        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); //日

        let nowTime = Y.toString() + '-' + M.toString() + '-' + D.toString();
        var content = JSON.parse(options.content); // console.log('后',content);
        // console.log('333',content);

        if (content.endTime > nowTime) {
            this.setData({
                timeOut: true
            });
        }

        let _id = content._id;
        let args = uni.getStorageSync('args');
        username = args.username;
        this.setData({
            content
        });
        wx.cloud
            .callFunction({
                name: 'associationSend',
                data: {
                    _id,
                    username,
                    type: 4
                }
            })
            .then((res) => {
                // console.log(res);
                this.getApplyStatus();
            });
    },
    // 查询是否已参与并操作
    // getPerson(){
    // },

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
        // 查询用户是否报名
        getApplyStatus() {
            let index = this.content.association[0].detail;
            db.collection('assoFreshApply')
                .where({
                    index,
                    username
                })
                .get()
                .then((res) => {
                    // console.log(res);
                    if (res.data.length >= 1) {
                        this.setData({
                            apply: true
                        });
                    }
                });
        },

        // 提交报名表单
        submit(e) {
            let formData = e.detail.value;
            let index = this.content.association[3].detail;
            uni.showLoading({
                title: '报名中',
                mask: true,
                success: (result) => {
                    db.collection('assoFreshApply')
                        .add({
                            data: {
                                username,
                                formData,
                                index,
                                read: false
                            }
                        })
                        .then((res) => {
                            uni.hideLoading();
                            uni.showToast({
                                title: '报名成功',
                                icon: 'none',
                                image: '',
                                duration: 1500,
                                mask: false,
                                success: (result) => {
                                    this.setData({
                                        apply: true
                                    });
                                }
                            });
                        });
                }
            });
        },

        // timeOut
        timeOutFun() {
            uni.showToast({
                title: '报名已截止',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {},
                fail: () => {},
                complete: () => {}
            });
        },

        // nosubm
        nosubmit() {
            uni.showToast({
                title: '你已报名',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {}
            });
        },

        ShowImg: function (e) {
            var Photo = this.content.AllPhoto;
            var index = e.target.dataset.index;
            uni.previewImage({
                current: Photo[index],
                urls: Photo
            });
        }
    }
};
</script>
<style>
page {
    background-color: #f6f6f6;
}
.wrap swiper {
    text-align: center;
}
.wrap .top {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: red;
}
.wrap .top .ShowImg {
    filter: invert(1) !important;
}
.wrap .endTime {
    background-color: white;
    margin: 24rpx;
    padding: 16rpx;
    border-radius: 24rpx;
    font-size: 32rpx;
    color: #63a1a0;
}
.wrap .mess_wrap {
    padding: 24rpx;
    font-size: 32rpx;
    margin: 24rpx;
    border-radius: 24rpx;
    background-color: white;
}
.wrap .mess_wrap .mess_caption {
    text-align: center;
    color: #63a1a0;
    font-weight: 700;
    padding: 12rpx;
}
.wrap .mess_wrap .mess_list {
    padding-top: 12rpx;
}
.wrap .mess_wrap .mess_list .mess_item {
    display: flex;
    flex-direction: row;
    padding: 18rpx;
}
.wrap .mess_wrap .mess_list .mess_item .title {
    flex: 1;
    display: flex;
    align-items: center;
}
.wrap .mess_wrap .mess_list .mess_item .content {
    flex: 3;
    background-color: #ececec;
    padding: 8rpx;
    border-radius: 12rpx;
    color: #929292;
}
.wrap .apply {
    padding: 24rpx;
    font-size: 32rpx;
    margin: 24rpx;
    border-radius: 24rpx;
    background-color: white;
}
.wrap .apply .apply_caption {
    text-align: center;
    color: #63a1a0;
    font-weight: 700;
    padding: 12rpx;
}
.wrap .apply .input_list .input_item {
    display: flex;
    flex-direction: row;
    padding: 18rpx;
}
.wrap .apply .input_list .input_item .input_title {
    flex: 1;
}
.wrap .apply .input_list .input_item .input_content {
    flex: 3;
    width: auto;
    margin-left: 12rpx;
    background-color: #ececec;
    padding: 8rpx;
    border-radius: 18rpx;
}
.wrap .end {
    background-color: #63a1a0;
    margin: 48rpx;
    text-align: center;
    border-radius: 24rpx;
    font-size: 32rpx;
    padding: 6rpx;
    margin-right: 20%;
    margin-left: 20%;
    color: white;
    width: 60%;
}
</style>
