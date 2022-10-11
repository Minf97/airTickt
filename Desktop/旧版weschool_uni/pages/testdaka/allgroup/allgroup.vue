<template>
    <view>
        <!-- pages/testdaka/allgroup/allgroup.wxml -->
        <view class="selfstudy">
            <view :style="'height: ' + statusBarHeight + 'px;width: 100%;'"></view>
            <view class="selfstudy_bar" :style="'height: ' + lineHeight + 'px;line-height: ' + lineHeight + 'px;color: white;text-align: center;'">
                <view class="back" @tap="back"></view>
                <view class="allstudyroom">全部自习室</view>
            </view>
        </view>
        <view class="selfstudy_othergroup_longbox">
            <view class="selfstudy_othergroup_longbox_left"></view>
            <view class="selfstudy_othergroup_longbox_right"></view>
        </view>
        <view class="selfstudy_othergroup_lablegroup">
            <view
                class="selfstudy_othergroup_lablegroup_title"
                :style="'display: flex;flex-direction: row;margin: 0rpx auto;width: 660rpx;height:80rpx ;margin-bottom: 0;top: ' + (statusBarHeight + 38) + 'px;padding: 0 40rpx;'"
            >
                <view style="height: 80rpx; width: 50%; text-align: left; line-height: 80rpx; font-size: 28rpx; font-weight: 550">最近创建/the latest</view>
                <view style="height: 80rpx; width: 50%; text-align: right; line-height: 80rpx; font-size: 23rpx; color: gray" @tap="more"></view>
            </view>
            <scroll-view class="lablegroup_scrollview" :scroll-y="true">
                <view class="lablegroup_scrollview_data" style="display: inline-block" v-for="(item, index) in room" :key="index">
                    <view class="lablegroup_scrollview_data_image">
                        <image :src="item.imgUrl"></image>
                    </view>

                    <view class="lablegroup_scrollview_data_information">
                        <view class="lablegroup_scrollview_data_information_topbox">
                            <view class="lablegroup_scrollview_data_information_topbox_roomname">
                                {{ item.group_name }}
                            </view>
                            <view class="lablegroup_scrollview_data_information_topbox_roomintroduce">{{ item.introduce }}</view>
                        </view>
                        <view class="lablegroup_scrollview_data_information_bottombox">
                            <view class="lablegroup_scrollview_data_information_bottombox_left">
                                <view class="lablegroup_scrollview_data_information_bottombox_left_yuandia"></view>
                                <view class="lablegroup_scrollview_data_information_bottombox_left_ring"></view>
                            </view>
                            <view class="lablegroup_scrollview_data_information_bottombox_right">
                                <view class="information_bottombox_right_url">
                                    <view>
                                        <view class="information_bottombox_right_url_image" style="background: pink"></view>
                                        <view class="information_bottombox_right_url_image" style="background: powderblue"></view>
                                        <view class="information_bottombox_right_url_image" style="background: purple"></view>
                                        <view class="information_bottombox_right_url_image" style="background: rosybrown"></view>
                                        <view class="information_bottombox_right_url_image" style="background: royalblue"></view>
                                    </view>
                                </view>
                                <view class="information_bottombox_right_numper">{{ item.roomNum }}人</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view v-if="loadMore" style="margin: 10rpx 50rpx; width: 650rpx; height: auto; text-align: center">正在载入更多...</view>
                <view v-if="loadAll" style="margin: 10rpx 50rpx; width: 650rpx; height: auto; text-align: center">已加载全部</view>
            </scroll-view>
            <view style="width: 100%; height: 50rpx"></view>
        </view>
    </view>
</template>

<script>
// pages/testdaka/allgroup/allgroup.js
// let currentPage = 0 // 当前第几页,0代表第一页
let pageSize = 5; //每页显示多少数据

export default {
    data() {
        return {
            currentPage: 0,
            // 当前第几页,0代表第一页
            loadMore: false,
            //"上拉加载"的变量，默认false，隐藏
            loadAll: false,
            //“没有数据”的变量，默认false，隐藏
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            room: [
                // {group_name: "四级考试",
                // imgUrl: "cloud://cloud1-6gtqj1v4873bad50.636c-cloud1-6gtqj1v4873bad50-1307814679/img/1649602315348-328",
                // introduce: "广油学子四级考试",
                // notice: "",
                // qxbq: "学习",
                // roomNum: 20,
                // username: "20034480214",
                // uuid: "6duXrVKFiRIEixYs27dOHDhQIECB",
                // wxname: "Start from scratch",
                // wxurl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3o46ibDQPmdTZsm8DoKREXRw/132",
                // _id: "636050766252ef0d051b82d961b72423",
                // _openid: "oS03t5SyomLzhLSdSPde5aBFoNJ0"}
            ]
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        uni.showLoading({
            title: '加载中'
        });
        this.getData();
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
    onUnload: function () {
        // let currentPage = 0 // 当前第几页,0代表第一页this,set()
        this.setData({
            loadMore: false,
            //"上拉加载"的变量，默认false，隐藏
            loadAll: false //“没有数据”的变量，默认false，隐藏
        });
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log('上拉触底事件');
        let that = this;

        if (!that.loadMore && !that.loadAll) {
            that.setData({
                loadMore: true,
                //加载中
                loadAll: false //是否加载完所有数据
            }); //加载更多，这里做下延时加载

            setTimeout(function () {
                that.getData();
            }, 2000);
        } else {
            console.log('所有数据加载完');
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        back() {
            uni.navigateBack({
                delta: 1
            });
        },

        getData() {
            let that = this;
            let currentPage = this.currentPage;
            let loadAll = this.loadAll; //第一次加载数据

            if (currentPage == 1) {
                this.setData({
                    loadMore: true,
                    //把"上拉加载"的变量设为true，显示
                    loadAll: false //把“没有数据”设为false，隐藏
                });
            } //云数据的请求

            console.log('执行if');
            wx.cloud
                .database()
                .collection('data_group_information')
                .skip(currentPage * pageSize) //从第几个数据开始
                .limit(pageSize)
                .get({
                    success(res) {
                        console.log('请求了数据库'); // console.log(res.data);

                        if (res.data && res.data.length > 0) {
                            console.log('请求成功', res.data); //把新请求到的数据添加到dataList里

                            let list = that.room.concat(res.data);
                            currentPage++;
                            that.setData({
                                room: list,
                                //获取数据数组
                                loadMore: false,
                                //把"上拉加载"的变量设为false，显示
                                currentPage: currentPage
                            });

                            if (res.data.length < pageSize) {
                                that.setData({
                                    loadMore: false,
                                    //隐藏加载中。。
                                    loadAll: true //所有数据都加载完了
                                });
                                console.log('数据加载完了');
                            }
                        } else {
                            that.setData({
                                loadAll: true,
                                //把“没有数据”设为true，显示
                                loadMore: false //把"上拉加载"的变量设为false，隐藏
                            });
                        }

                        uni.hideLoading();
                    },

                    fail(res) {
                        console.log('请求失败', res);
                        that.setData({
                            loadAll: false,
                            loadMore: false
                        });
                    }
                });
        },

        more() {
            console.log('占位：函数 more 未声明');
        }
    }
};
</script>
<style>
/* pages/testdaka/allgroup/allgroup.wxss */
page {
    background-color: #f4f4f4;
}
.allstudyroom {
    margin-left: 28vw;
    width: auto;
    height: auto;
    font-size: 28rpx;
    color: #000000;
}
.back {
    margin-left: 41rpx;
    z-index: 99;
    width: 15rpx;
    height: 0rpx;
    border-width: 9px;
    border-style: solid;
    border-color: #7c66f5 #7c66f5 #fff #fff;
}
.selfstudy_bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #fff;
}
.selfstudy {
    position: sticky;
    top: 0rpx;
    z-index: 99;
    background: #fff;
}
.selfstudy_othergroup_longbox {
    margin: 20rpx auto;
    margin-top: 70rpx;
    margin-bottom: 0;
    width: 650rpx;
    height: 80rpx;
    display: flex;
    flex-direction: row;
}
.selfstudy_othergroup_longbox_left {
    width: 80%;
    height: 100%;
    background: white;
    border-radius: 20rpx;
}
.selfstudy_othergroup_longbox_right {
    width: 15%;
    height: 100%;
    background: #7c66f5;
    margin-left: 30rpx;
    border-radius: 20rpx;
}
.selfstudy_othergroup_lablegroup {
    margin-top: 41rpx;
}
.selfstudy_othergroup_lablegroup_title {
    position: sticky;
    background-color: #f4f4f4;
    z-index: 99;
}
.lablegroup_scrollview {
    height: auto;
    width: 100%;
    /* background: pink; */
    margin-top: 9rpx;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
}
.lablegroup_scrollview_data {
    margin: 10rpx 50rpx;
    margin-top: 32rpx;
    /* margin-left: 41rpx; */
    height: 190rpx;
    width: 650rpx;
    background: white;
    border-radius: 30rpx;
}
.lablegroup_scrollview_data_image {
    float: left;
    width: 25%;
    height: 100%;
    /* background: pink; */
}
.lablegroup_scrollview_data_image > image {
    width: 90%;
    height: 90%;
    margin: 10rpx;
    border-radius: 20rpx;
}

.lablegroup_scrollview_data_information {
    float: left;
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* background: gray; */
}
.lablegroup_scrollview_data_information_topbox {
    height: 75%;
    width: 100%;
    /* background: pink; */
    display: flex;
    flex-direction: column;
}
.lablegroup_scrollview_data_information_topbox_roomname {
    font-size: 20rpx;
    font-weight: 600;
    height: auto;
    width: auto;
    margin-top: 20rpx;
    margin-left: 25rpx;
}
.lablegroup_scrollview_data_information_topbox_roomintroduce {
    height: 100%;
    width: 87%;
    line-height: 25rpx;
    color: gray;
    margin-top: 20rpx;
    margin-left: 25rpx;
    font-size: 18rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    /* position: absolute; */
}
.lablegroup_scrollview_data_information_bottombox {
    height: 25%;
    width: 100%;
    display: flex;
    flex-direction: row;
    /* background: gray; */
}
.lablegroup_scrollview_data_information_bottombox_left {
    width: 25rpx;
    height: 25rpx;
    margin-left: 25rpx;
    border-radius: 50%;
    background: #7c66f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    position: relative;
}
.lablegroup_scrollview_data_information_bottombox_left_yuandia {
    /* width: 35%;
  height: 35%;
  border-radius: 50%;
  background: #FFFFFF; */
    width: 0px;
    height: 0px;
    border-width: 6px;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    margin-left: 5rpx;
}
.lablegroup_scrollview_data_information_bottombox_left_ring {
    width: 6rpx;
    height: 6rpx;
    border-radius: 50%;
    background: #ffffff;
    position: absolute;
    top: 5rpx;
    left: 7rpx;
}
.lablegroup_scrollview_data_information_bottombox_right {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 81%;
}
.information_bottombox_right_url {
    width: 82%;
    height: 100%;
    /* background: gray; */
    /* overflow: hidden; */
    /* padding-right: 10rpx; */
}
.information_bottombox_right_url > view {
    padding-right: 10rpx;
}
.information_bottombox_right_url_image {
    float: right;
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    margin-left: -8rpx;
    margin-top: -5rpx;
}
.information_bottombox_right_numper {
    /* margin-right: 20rpx; */
    text-align: right;
    width: 18%;
    height: 25rpx;
    line-height: 25rpx;
    font-size: 20rpx;
    color: rgb(56, 56, 56);
}
</style>
