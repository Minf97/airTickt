<template>
    <view>
        <view class="wrap">
            <view class="top_wrap">
                <view class="img">
                    <image src="/static/images/Camera-3.png" v-if="!imgUrl" @tap="addImg" />
                </view>
                <view class="img_1">
                    <swiper :indicator-dots="true" indicator-color="#fff" indicator-active-color="red" :current="current" v-if="imgUrl">
                        <block>
                            <swiper-item>
                                <image @longpress="changeImg" :data-src="imgUrl" :src="imgUrl" mode="aspectFill" style="z-index: 11; width: 100%; height: 100%" class="imgUrl" />
                            </swiper-item>
                        </block>
                    </swiper>
                </view>
                <view class="title">[宣传海报]长按修改</view>
            </view>
            <view class="content_wrap">
                <view class="top_wrap_top">
                    <view class="title_top">标题</view>
                    <input maxlength="-1" placeholder="赛事标题" @input="titleFun" :value="title" />
                </view>
                <view class="mid_wrap">
                    <view class="title_top">描述</view>
                    <textarea class="handle_top" maxlength="-1" placeholder="赛事内容描述" @input="detail" :value="contentDetail" style="height: 120rpx"></textarea>
                </view>
            </view>
            <!-- 奖励 -->
            <view class="reward_wrap">
                <view class="title">
                    比赛奖励
                    <text class="title_tip">如:素拓分、综合分</text>
                </view>
                <view class="reward_item">
                    <view class="row_item" :style="'color:' + color[index] + ';border:1rpx solid ' + color[index]" v-for="(item, index) in borderArr" :key="index">
                        {{ item }}
                    </view>
                    <view class="add_rewrad" @tap="addBorder">添加</view>
                </view>
            </view>
            <view class="question_wrap">
                <view class="title">问题列表/报名信息</view>
                <view class="item_wrap">
                    <view class="item" v-for="(item, index) in tempContent" :key="index">
                        <view class="list_1" @tap="toFixed" :data-item="item">{{ index + 1 }}.{{ item.must == true ? '*' : '' }}{{ item.title }}</view>

                        <view class="list_2" @tap="deleteFun" :data-index="index">删除</view>
                    </view>
                    <view class="add_question" @tap="clickme">+添加问题</view>
                </view>
            </view>
            <view class="bt_wrap">
                <view class="keep" @tap="hold" :data-status="false">保存</view>
                <!-- 选择时间 -->
                <view class="change_time">
                    <picker mode="date" :value="date" start="2022-03-01" end="2024-09-01" @change="bindDateChange">
                        <view class="picker">截止日期:{{ date }}</view>
                    </picker>
                </view>
            </view>
        </view>
        <!-- 弹窗 -->
        <view class="commodity_screen" @tap="hideModal" v-if="showModalStatus"></view>
        <!-- 弹出框 -->
        <view :animation="animationData" class="commodity_attr_box" v-if="showModalStatus">
            <view class="title">题目类型</view>
            <view class="change_wrap">
                <view class="item" :data-item="item" @tap="goAdd" v-for="(item, index) in changeArr" :key="index">
                    <view class="img">
                        <image :src="item.src" />
                    </view>

                    <view class="change_title">{{ item.name }}</view>
                </view>
            </view>
        </view>
        <!-- 输入奖励弹窗 -->
        <view class="commodity_screen" @tap="hideModal_1" v-if="addBorderModal"></view>
        <view :animation="animationData" class="commodity_attr_box_1" v-if="addBorderModal">
            <view class="border_title">输入奖励</view>
            <view class="handle_wrap">
                <input placeholder="素拓分" class="handle_border" @input="borderContent" />
                <view class="border_end" @tap="borderEnd">确定</view>
            </view>
        </view>
    </view>
</template>

<script>
let db = wx.cloud.database();
let count = '';
export default {
    data() {
        return {
            changeArr: [
                {
                    src: '/static/pages/association/img/dan_change.png',
                    name: '单选'
                },
                {
                    src: '/static/pages/association/img/duo_change.png',
                    name: '多选'
                },
                {
                    src: '/static/pages/association/img/tian.png',
                    name: '填空'
                }
            ],

            title: '',
            contentDetail: '',
            tempContent: [],
            content: '',
            weatherChange: false,
            id: '',
            addBorderModal: false,
            color: ['#066fd8', '#6fd806', '#d8066f', '#6f06d8'],
            borderArr: [],
            date: '',
            imgUrl: '',
            assoMess: '',
            animationData: '',
            showModalStatus: false,
            tempBorder: '',
            current: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let id = options.id;
        let args = uni.getStorageSync('args');
        count = String(args.username);

        if (id) {
            db.collection('associtaionMath')
                .where({
                    _id: id
                })
                .get()
                .then((res) => {
                    let data = res.data[0];
                    this.setData({
                        title: data.senderMess.title,
                        contentDetail: data.senderMess.contentDetail,
                        tempContent: data.question,
                        imgUrl: data.imgUrl,
                        weatherChange: true,
                        id: id,
                        date: data.date,
                        borderArr: data.borderArr
                    });
                });
        } // 查询社团信息

        db.collection('associationApply')
            .where({
                count: count
            })
            .get()
            .then((res) => {
                this.setData({
                    assoMess: res.data[0].hostMess
                });
            });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // console.log(this.data.tempContent);
        if (this.content) {
            this.tempContent.push(this.content);
            this.setData({
                tempContent: this.tempContent
            });
        }
    },
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
        // 修改海报
        changeImg() {
            this.addImg();
        },

        // 时间选择
        bindDateChange(e) {
            this.setData({
                date: e.detail.value
            });
        },

        clickme() {
            this.showModal();
        },

        // 弹窗
        //显示对话框
        showModal: function () {
            // 显示遮罩层
            var animation = uni.createAnimation({
                duration: 200,
                timingFunction: 'linear',
                delay: 0
            });
            this.animation = animation;
            animation.translateY(300).step();
            this.setData({
                animationData: animation.export(),
                showModalStatus: true
            });
            setTimeout(
                function () {
                    animation.translateY(0).step();
                    this.setData({
                        animationData: animation.export()
                    });
                }.bind(this),
                200
            );
        },

        //隐藏对话框
        hideModal: function (modal) {
            // 隐藏遮罩层
            var animation = uni.createAnimation({
                duration: 200,
                timingFunction: 'linear',
                delay: 0
            });
            this.animation = animation;
            animation.translateY(300).step();
            this.setData({
                animationData: animation.export()
            });
            setTimeout(
                function () {
                    animation.translateY(0).step();
                    this.setData({
                        animationData: animation.export(),
                        showModalStatus: false
                    });
                }.bind(this),
                200
            );
        },

        //显示对话框
        showModal_1: function () {
            // 显示遮罩层
            var animation = uni.createAnimation({
                duration: 200,
                timingFunction: 'linear',
                delay: 0
            });
            this.animation = animation;
            animation.translateY(300).step();
            this.setData({
                animationData: animation.export(),
                addBorderModal: true
            });
            setTimeout(
                function () {
                    animation.translateY(0).step();
                    this.setData({
                        animationData: animation.export()
                    });
                }.bind(this),
                200
            );
        },

        //隐藏对话框
        hideModal_1: function (modal) {
            // 隐藏遮罩层
            var animation = uni.createAnimation({
                duration: 200,
                timingFunction: 'linear',
                delay: 0
            });
            this.animation = animation;
            animation.translateY(300).step();
            this.setData({
                animationData: animation.export()
            });
            setTimeout(
                function () {
                    animation.translateY(0).step();
                    this.setData({
                        animationData: animation.export(),
                        addBorderModal: false
                    });
                }.bind(this),
                200
            );
        },

        // 详情页
        goAdd(e) {
            let type = e.currentTarget.dataset.item.name;
            uni.navigateTo({
                url: '/pages/association/add_question/add_question?type=' + type
            });
            this.setData({
                content: ''
            });
        },

        titleFun(e) {
            this.setData({
                title: e.detail.value
            });
        },

        detail(e) {
            console.log(e);
            this.setData({
                contentDetail: e.detail.value
            });
        },

        // 删除
        deleteFun(e) {
            // console.log(e);
            let index = e.currentTarget.dataset.index;
            this.tempContent.splice(index, 1);
            this.setData({
                tempContent: this.tempContent
            });
        },

        // 保存
        hold(e) {
            let status = e.currentTarget.dataset.status; // console.log(status);

            if (this.title == '' || this.detail == '') {
                uni.showToast({
                    title: '完善标题和内容',
                    icon: 'none'
                });
            } else if (this.tempContent.length == 0) {
                uni.showToast({
                    title: '请添加问题',
                    icon: 'none'
                });
            } else if (this.imgUrl == '') {
                uni.showToast({
                    title: '请添加图片',
                    icon: 'none'
                });
            } else if (this.borderArr.length <= 0) {
                uni.showToast({
                    title: '请添加奖励',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {}
                });
            } else if (!this.date) {
                uni.showToast({
                    title: '请选择截止时间',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {}
                });
            } else {
                uni.showLoading({
                    title: '保存中',
                    mask: true,
                    success: (result) => {
                        let imgUrl = this.imgUrl;
                        let userInfo = uni.getStorageSync('args');
                        let senderMess = {
                            title: this.title,
                            contentDetail: this.contentDetail
                        };
                        let question = this.tempContent; // 计算图片

                        uni.getImageInfo({
                            src: imgUrl,
                            success: (res) => {
                                console.log(res);
                                let tempHeight = res.height > 500 ? 500 : res.height;
                                let tempWidth = res.width < 370 ? 370 : res.width;
                                let CoverHeight = tempHeight + 'rpx';
                                let CoverWidth = tempWidth;
                                let ShowHeight = tempHeight;

                                if (this.weatherChange == false) {
                                    db.collection('associtaionMath')
                                        .add({
                                            data: {
                                                count: String(userInfo.username),
                                                schoolName: userInfo.schoolName,
                                                senderMess,
                                                question,
                                                imgUrl,
                                                time: Date.now(),
                                                sendStatus: status,
                                                CoverHeight,
                                                CoverWidth,
                                                ShowHeight,
                                                assoMess: this.assoMess,
                                                borderArr: this.borderArr,
                                                date: this.date
                                            }
                                        })
                                        .then((res) => {
                                            uni.hideLoading();
                                            uni.showToast({
                                                title: '保存成功',
                                                icon: 'none',
                                                duration: 1500,
                                                mask: false,
                                                success: (result) => {
                                                    uni.navigateBack({
                                                        delta: 2
                                                    });
                                                }
                                            });
                                        });
                                } else {
                                    db.collection('associtaionMath')
                                        .where({
                                            _id: this.id
                                        })
                                        .update({
                                            data: {
                                                count: userInfo.username,
                                                schoolName: userInfo.schoolName,
                                                senderMess,
                                                question,
                                                imgUrl,
                                                time: Date.now(),
                                                sendStatus: status,
                                                CoverHeight,
                                                CoverWidth,
                                                ShowHeight,
                                                assoMess: this.assoMess,
                                                borderArr: this.borderArr,
                                                date: this.date
                                            }
                                        })
                                        .then((res) => {
                                            uni.hideLoading();
                                            uni.showToast({
                                                title: '保存成功',
                                                icon: 'none',
                                                duration: 1500,
                                                mask: false,
                                                success: (result) => {
                                                    uni.navigateBack({
                                                        delta: 2
                                                    });
                                                }
                                            });
                                        });
                                }
                            }
                        });
                    }
                });
            }
        },

        // 保存并发布
        holdSend(e) {
            this.hold(e);
        },

        // 上传图片
        addImg() {
            uni.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    let tempUrl = res.tempFilePaths[0];
                    wx.cloud
                        .uploadFile({
                            cloudPath: 'association/' + Date.now() + '/static/pages/association/match_detail/.jpg',
                            filePath: tempUrl
                        })
                        .then((res) => {
                            // console.log(res);
                            let imgUrl = res.fileID;
                            this.setData({
                                imgUrl: imgUrl
                            });
                        });
                }
            });
        },

        // 添加奖励
        addBorder() {
            if (this.borderArr.length >= 3) {
                uni.showToast({
                    title: '只能添加三个',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {}
                });
            } else {
                this.showModal_1();
            }
        },

        // 奖励内容
        borderContent(e) {
            // console.log(e.detail.value);
            this.setData({
                tempBorder: e.detail.value
            });
        },

        // 确认添加奖励
        borderEnd() {
            if (!this.tempBorder) {
                uni.showToast({
                    title: '请输入内容',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {}
                });
            } else {
                this.borderArr.push(this.tempBorder);
                this.setData({
                    borderArr: this.borderArr,
                    tempBorder: ''
                });
                this.hideModal_1();
                uni.showToast({
                    title: '添加成功',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {}
                });
            }
        },

        // 编辑
        toFixed(e) {
            // console.log(e);
            let content = e.currentTarget.dataset.item;
            let type = content.type;
            uni.navigateTo({
                url: '/pages/association/add_question/add_question?type=' + type + '&fiexed=' + true + '&content=' + JSON.stringify(content),
                success: (result) => {
                    this.setData({
                        content: ''
                    });
                }
            });
        }
    }
};
</script>
<style>
page {
    background-color: #f6f6f6;
}
.wrap .top_wrap {
    border-radius: 24rpx;
    padding: 24rpx;
    background-color: white;
    margin: 24rpx;
}
.wrap .top_wrap .img {
    background-color: rgba(241, 229, 201, 0.26);
    text-align: center;
    justify-content: center;
    align-content: center;
}
.wrap .top_wrap .img image {
    padding: 96rpx;
    width: 90rpx;
    height: 90rpx;
}
.wrap .top_wrap .title {
    text-align: center;
    padding: 12rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: #63a1a0;
}
.wrap .content_wrap {
    padding: 24rpx;
    font-size: 30rpx;
    background-color: white;
    margin: 24rpx;
    border-radius: 24rpx;
}
.wrap .content_wrap .top_wrap_top {
    padding: 12rpx;
}
.wrap .content_wrap .top_wrap_top .title_top {
    color: #63a1a0;
    padding: 12rpx;
}
.wrap .content_wrap .top_wrap_top input {
    background-color: #f6f6f6;
    padding: 12rpx;
    border-radius: 12rpx;
}
.wrap .content_wrap .mid_wrap {
    padding: 12rpx;
}
.wrap .content_wrap .mid_wrap .title_top {
    padding: 12rpx;
    color: #63a1a0;
}
.wrap .content_wrap .mid_wrap .handle_top {
    width: 100%;
    padding: 12rpx;
    background-color: #f6f6f6;
    border-radius: 12rpx;
}
.wrap .reward_wrap {
    font-size: 28rpx;
    background-color: white;
    margin: 24rpx;
    padding: 12rpx;
    border-radius: 12rpx;
}
.wrap .reward_wrap .title {
    padding: 12rpx;
    color: #63a1a0;
}
.wrap .reward_wrap .title .title_tip {
    color: #8b8b8b;
    padding-left: 48rpx;
}
.wrap .reward_wrap .reward_item {
    display: flex;
    flex-direction: row;
}
.wrap .reward_wrap .reward_item .row_item {
    margin-left: 12rpx;
    border-radius: 8rpx;
    padding: 2rpx;
}
.wrap .reward_wrap .reward_item .add_rewrad {
    margin-left: 12rpx;
    padding: 2rpx;
    color: #63a1a0;
    font-weight: 700;
}
.wrap .question_wrap {
    font-size: 30rpx;
    padding: 24rpx;
    margin: 12rpx;
    background-color: white;
    border-radius: 24rpx;
}
.wrap .question_wrap .title {
    color: #63a1a0;
}
.wrap .question_wrap .item_wrap .item {
    display: flex;
    flex-direction: row;
    padding: 6rpx;
}
.wrap .question_wrap .item_wrap .item .list_1 {
    flex: 5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.wrap .question_wrap .item_wrap .item .list_2 {
    flex: 1;
    color: red;
}
.wrap .question_wrap .item_wrap .add_question {
    padding: 8rpx;
    text-align: center;
    color: #63a1a0;
    font-weight: 700;
}
.wrap .bt_wrap {
    display: flex;
    flex-direction: column;
    font-size: 32rpx;
    color: white;
}
.wrap .bt_wrap .keep {
    text-align: center;
    margin-left: 24rpx;
    margin-right: 24rpx;
    background-color: #63a1a0;
    padding: 12rpx;
    border-radius: 24rpx;
}
.wrap .bt_wrap .change_time {
    background-color: #63a1a0;
    margin: 24rpx;
    padding: 12rpx;
    text-align: center;
    border-radius: 24rpx;
}
.wrap .bt_wrap .send {
    background-color: rebeccapurple;
    text-align: center;
    margin-left: 24rpx;
    margin-right: 24rpx;
    margin-top: 8rpx;
    padding: 12rpx;
    border-radius: 24rpx;
}
.commodity_screen {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.2;
    overflow: hidden;
    z-index: 1000;
    color: #fff;
}
/*对话框 */
.commodity_attr_box {
    height: 300rpx;
    width: 100%;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2000;
    background: #fff;
    padding-top: 20rpx;
    border-radius: 24rpx;
}
.commodity_attr_box .title {
    text-align: center;
    color: #3bb3e2;
    font-size: 30rpx;
}
.commodity_attr_box .change_wrap {
    display: flex;
    flex-direction: row;
}
.commodity_attr_box .change_wrap .item {
    flex: 1;
}
.commodity_attr_box .change_wrap .item .img {
    text-align: center;
}
.commodity_attr_box .change_wrap .item .img image {
    height: 120rpx;
    width: 120rpx;
    padding: 24rpx;
}
.commodity_attr_box .change_wrap .item .change_title {
    text-align: center;
    font-size: 30rpx;
}
.commodity_attr_box_1 {
    height: 200rpx;
    width: 100%;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2000;
    background: #fff;
    padding-top: 20rpx;
    border-radius: 24rpx;
    font-size: 32rpx;
}
.commodity_attr_box_1 .border_title {
    text-align: center;
    font-weight: 700;
}
.commodity_attr_box_1 .handle_wrap {
    display: flex;
    flex-direction: row;
    padding: 24rpx;
}
.commodity_attr_box_1 .handle_wrap .handle_border {
    flex: 4;
    border-bottom: 1rpx solid #808080;
    padding-left: 12rpx;
}
.commodity_attr_box_1 .handle_wrap .border_end {
    flex: 1;
}
</style>
