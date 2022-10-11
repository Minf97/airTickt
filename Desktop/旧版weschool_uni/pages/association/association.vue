<template>
    <view>
        <view class="wrap" v-if="HtmlStatus == 0">
            <view class="caption">
                <view class="title">社团/协会负责人信息</view>
                <view class="tip">·请填写真实信息</view>
                <view class="tip">·个人信息不用于展示</view>
            </view>
            <view class="list_wrap">
                <form @submit="formSubmit">
                    <view class="list_item" v-for="(item, index) in list" :key="index">
                        <view class="left">{{ item.title }}</view>

                        <input :placeholder="item.placeholder" class="rigth" :name="item.id" :type="item.type" :value="item.value" />
                    </view>
                    <view class="list_item">
                        <view class="left">上传logo</view>
                        <view class="add_logo" @tap="parseEventDynamicCode($event, img == false ? 'add_logo' : 'showTip')">{{ img == false ? '+' : '已上传' }}</view>
                    </view>
                    <button class="submit" size="mini" formType="submit">提交</button>
                </form>
            </view>
        </view>
        <view class="test_wrap" v-else-if="HtmlStatus == 1">
            <view class="test_img">
                <image src="/static/images/testing.png" />
            </view>
            <view class="test_tip">资料审核中...</view>
        </view>
        <view class="test_wrap" v-else-if="HtmlStatus == 3">
            <view class="test_img">
                <image src="/static/images/delete.png" />
            </view>
            <view class="test_tip">账号注销中...</view>
        </view>
        <view class="asso_wrap" v-else-if="HtmlStatus == 2">
            <view class="mess_item">
                <view class="mess_wrap" v-for="(item, index) in assoMess" :key="index">
                    <view class="title">{{ item.name }}</view>

                    <view class="mess">{{ item.detail }}</view>
                </view>
            </view>
            <!-- 我的社团 -->
            <view class="bt_list">
                <view class="bt_title_wrap">
                    <view class="bt_title">我的社团</view>
                    <view class="bt_tip">开始发布活动吧</view>
                </view>
                <view class="bt_list_wrap">
                    <view class="act_bt" @tap="item.tapName" v-for="(item, index) in index_list" :key="index">
                        <image :src="item.img" />

                        <view class="tip_content">{{ item.name }}</view>
                    </view>
                </view>
                <view class="data_title_wrap">
                    <view class="data_title">社团数据</view>
                    <view class="data_tip">我的数据看板</view>
                </view>
                <view class="bt_list_wrap">
                    <view class="act_bt" @tap="item.tap" v-for="(item, index) in data_list" :key="index">
                        <image :src="item.img" />

                        <view class="tip_content">{{ item.name }}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/association/association.js
let school = '';
let db = wx.cloud.database();
let card = ''; //学号

export default {
    data() {
        return {
            list: [
                {
                    title: '联系人',
                    placeholder: '负责人姓名',
                    type: 'text',
                    value: '',
                    id: 'name'
                },
                {
                    title: '联系方式',
                    placeholder: '电话号码',
                    type: 'number',
                    value: '',
                    id: 'phone'
                },
                {
                    title: '社团/机构',
                    placeholder: '输入名称',
                    type: 'text',
                    value: '',
                    id: 'association'
                },
                {
                    title: '学号',
                    placeholder: '输入学号',
                    type: 'number',
                    value: '',
                    id: 'card'
                }
            ],

            index_list: [
                {
                    img: '/static/pages/association/img/freshman.png',
                    name: '招新报名',
                    tapName: 'freshman'
                },
                {
                    img: '/static/pages/association/img/match.png',
                    name: '赛事发布',
                    tapName: 'match'
                },
                {
                    img: '/static/pages/association/img/change.png',
                    name: '编辑资料',
                    tapName: 'edit'
                },
                {
                    img: '/static/pages/association/img/delete.png',
                    name: '注销身份',
                    tapName: 'delete'
                }
            ],

            data_list: [
                {
                    img: '/static/pages/association/img/freshman_data.png',
                    name: '招新数据',
                    tap: 'goFreshmanData'
                },
                {
                    img: '/static/pages/association/img/match_data.png',
                    name: '赛事反馈',
                    tap: 'goMatchData'
                },
                {
                    img: '/static/pages/association/img/more.png',
                    name: '推广数据',
                    tap: 'loading'
                },
                {
                    img: '/static/pages/association/img/more.png',
                    name: '创作中心',
                    tap: 'loading'
                }
            ],

            HtmlStatus: 0,

            //0为申请 1审核中 2审核通过  3注销中
            assoMess: '',

            photoStatus: false,
            img: false,
            imgUrl: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let res = uni.getStorageSync('args');
        let list = this.list;
        card = String(res.username);
        school = res.school;
        list[3].value = card;
        this.setData({
            list: list
        });
        this.search(card);
        this.updateCount(card);
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
        // 赛事反馈
        goMatchData() {
            uni.navigateTo({
                url: '/pages/association/matchData/matchData',
                success: (result) => {},
                fail: () => {},
                complete: () => {}
            });
        },

        // 查询用户状态
        search(card) {
            // if (card != 'guest') {
            //   card = Number(card)
            // }
            card = String(card);
            db.collection('associationApply')
                .where({
                    count: card
                })
                .get()
                .then((res) => {
                    console.log(res);

                    if (res.data.length == 0) {
                        this.setData({
                            HtmlStatus: 0
                        });
                    } else {
                        // console.log(res.data[0].status);
                        // console.log(res.data[0].status===false);
                        if (res.data[0].status === false) {
                            this.setData({
                                HtmlStatus: 1
                            });
                        } else if (res.data[0].status == 0) {
                            this.setData({
                                HtmlStatus: 3
                            });
                        } else {
                            // 社团操作，发布
                            let assoMess = [
                                {
                                    name: '社团/机构',
                                    detail: res.data[0].hostMess.association
                                },
                                {
                                    name: '联系方式',
                                    detail: res.data[0].hostMess.phone
                                },
                                {
                                    name: '联系人',
                                    detail: res.data[0].hostMess.name
                                },
                                {
                                    name: '学号',
                                    detail: res.data[0].hostMess.card
                                }
                            ];
                            this.setData({
                                HtmlStatus: 2,
                                assoMess: assoMess
                            });
                        }
                    }
                });
        },

        // 招新数据
        goFreshmanData() {
            uni.navigateTo({
                url: '/pages/association/freshmanData/freshmanData',
                success: (result) => {}
            });
        },

        // 开发中
        loading() {
            uni.showToast({
                title: '功能开发中',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {},
                fail: () => {},
                complete: () => {}
            });
        },

        formSubmit(e) {
            console.log(e);
            let data = e.detail.value;

            if (data.association == '' || data.card == '' || data.name == '' || data.phone == '' || !this.imgUrl) {
                uni.showModal({
                    title: '提示',
                    content: '请输入完整信息',
                    showCancel: false,
                    cancelText: '取消',
                    cancelColor: '#000000',
                    confirmText: '确定',
                    confirmColor: '#3CC51F',
                    success: (result) => {
                        if (result.confirm) {
                        }
                    }
                });
            } else {
                uni.showModal({
                    title: '提示',
                    content: '确认提交',
                    showCancel: true,
                    cancelText: '取消',
                    cancelColor: '#000000',
                    confirmText: '确定',
                    confirmColor: '#3CC51F',
                    success: (result) => {
                        if (result.confirm) {
                            uni.showLoading({
                                title: '提交中',
                                mask: true,
                                success: (result) => {
                                    db.collection('associationApply')
                                        .add({
                                            data: {
                                                status: false,
                                                hostMess: data,
                                                count: String(data.card),
                                                logoUrl: this.imgUrl,
                                                activityCount: 1,
                                                personCount: 1,
                                                school: school
                                            }
                                        })
                                        .then((res) => {
                                            this.setData({
                                                HtmlStatus: 1
                                            });
                                            uni.hideLoading();
                                        });
                                }
                            });
                        }
                    }
                });
            }
        },

        // 赛事
        match() {
            uni.navigateTo({
                url: '/pages/association/match/match?count=' + card,
                success: (result) => {}
            });
        },

        // 注销社团
        deleteFun() {
            uni.showModal({
                title: '警告',
                content: '注销负责人身份',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        uni.showLoading({
                            title: '注销中',
                            mask: true,
                            success: (res) => {
                                db.collection('associationApply')
                                    .where({
                                        count: card
                                    })
                                    .update({
                                        data: {
                                            status: 0
                                        }
                                    })
                                    .then((res) => {
                                        uni.hideLoading();
                                        this.setData({
                                            HtmlStatus: 3
                                        });
                                    });
                            }
                        });
                    }
                }
            });
        },

        // 编辑资料
        edit() {
            uni.navigateTo({
                url: '/pages/association/edit/edit?count=' + card
            });
        },

        // 跳转
        freshman() {
            let assoMess = this.assoMess;
            assoMess = JSON.stringify(assoMess);
            uni.navigateTo({
                url: '/pages/association/freshman/freshman?assoMess=' + assoMess,
                success: (result) => {}
            });
        },

        // 上传logo
        add_logo() {
            uni.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    let tempUel = res.tempFilePaths[0];
                    wx.cloud
                        .uploadFile({
                            cloudPath: 'association/' + Date.now() + 'jpg',
                            filePath: tempUel
                        })
                        .then((res) => {
                            let imgUrl = res.fileID;
                            uni.showToast({
                                title: '上传成功',
                                icon: 'none',
                                image: '',
                                duration: 1500,
                                mask: false,
                                success: (res) => {
                                    this.setData({
                                        img: true,
                                        imgUrl: imgUrl
                                    });
                                }
                            });
                        });
                }
            });
        },

        showTip() {
            uni.showToast({
                title: '审核后可修改',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {},
                fail: () => {},
                complete: () => {}
            });
        },

        // 更新人数活动数量
        updateCount(count) {
            wx.cloud
                .callFunction({
                    name: 'associationSend',
                    data: {
                        type: 6,
                        count
                    }
                })
                .then((res) => {
                    console.log(res);
                });
        }
    }
};
</script>
<style>
page {
    background-color: #ffffff;
}
.wrap {
    background-image: linear-gradient(#232774, #ffe7e7);
}
.wrap .caption {
    height: 200rpx;
    padding: 24rpx;
}
.wrap .caption .title {
    padding-top: 20rpx;
    font-weight: 700;
    text-align: center;
    color: white;
}
.wrap .caption .tip {
    padding-top: 25rpx;
    font-size: 28rpx;
    color: #e0e0e0;
}
.wrap .list_wrap {
    padding: 24rpx;
    padding-top: 30rpx;
    background-color: white;
    border-top-right-radius: 32rpx;
    border-top-left-radius: 32rpx;
}
.wrap .list_wrap .list_item {
    display: flex;
    flex-direction: row;
    padding: 8rpx;
    margin-top: 24rpx;
}
.wrap .list_wrap .list_item .left {
    align-items: center;
    display: flex;
    font-size: 30rpx;
    /* flex: 1; */
    width: 150rpx;
}
.wrap .list_wrap .list_item .add_logo {
    justify-content: center;
    align-items: center;
    /* flex: 3; */
    display: flex;
    font-size: 40rpx;
    color: #808080;
    background-color: #eeeeee;
    border-radius: 5rpx;
    width: 170rpx;
    height: 170rpx;
    /* padding: 12rpx 0 12rpx 24rpx; */
}
.wrap .list_wrap .list_item .rigth {
    flex: 3;
    background-color: #eeeeee;
    border-radius: 9rpx;
    font-size: 26rpx;
    display: flex;
    align-items: center;
    /* height: 30rpx; */
    line-height: 20rpx;
    padding: 12rpx 0 9rpx 24rpx;
}
.wrap .list_wrap .submit {
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    border-radius: 15rpx;
    margin-top: 52rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 35rpx;
    width: 70%;
    color: white;
    background-color: #3188c3;
}
.test_wrap {
    padding-top: 20%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
}
.test_wrap .test_img image {
    height: 180rpx;
    width: 180rpx;
}
.asso_wrap .mess_item {
    padding: 24rpx;
    margin-left: 12rpx;
    margin-right: 12rpx;
    border-radius: 24rpx;
    margin-top: 24rpx;
    background-color: white;
}
.asso_wrap .mess_item .mess_wrap {
    display: flex;
    flex-direction: row;
    padding: 6rpx;
    padding-top: 12rpx;
    font-size: 30rpx;
}
.asso_wrap .mess_item .mess_wrap .title {
    flex: 1;
    display: flex;
    align-items: center;
    font-weight: 600;
}
.asso_wrap .mess_item .mess_wrap .mess {
    padding: 16rpx;
    padding-left: 24rpx;
    flex: 3;
    color: #858585;
    background-color: #f1f1f1;
    border-radius: 15rpx;
    justify-content: center;
    align-items: center;
    line-height: 32rpx;
}
.asso_wrap .bt_list {
    font-size: 32rpx;
    padding: 24rpx;
    background-color: white;
    margin-top: 24rpx;
    border-radius: 24rpx;
    border-top: 1rpx solid #dfdfdf;
    margin: 12rpx;
}
.asso_wrap .bt_list .bt_title_wrap {
    display: flex;
    flex-direction: row;
    margin-top: 30rpx;
}
.asso_wrap .bt_list .bt_title_wrap .bt_title {
    flex: 3;
    font-weight: 700;
    font-size: 30rpx;
    padding-left: 24rpx;
}
.asso_wrap .bt_list .bt_title_wrap .bt_tip {
    flex: 2;
    color: #c7c7c7;
    text-align: right;
    padding-right: 44rpx;
    font-size: 28rpx;
}
.asso_wrap .bt_list .bt_list_wrap {
    display: flex;
    flex-direction: row;
    text-align: center;
    padding: 24rpx;
    border-radius: 24rpx;
}
.asso_wrap .bt_list .bt_list_wrap .act_bt {
    flex: 1;
    font-size: 30rpx;
    color: rgb(56, 56, 56);
}
.asso_wrap .bt_list .bt_list_wrap .act_bt image {
    height: 80rpx;
    width: 80rpx;
}
.asso_wrap .bt_list .bt_list_wrap .race_bt {
    flex: 1;
}
.asso_wrap .bt_list .bt_list_wrap .race_bt image {
    height: 100rpx;
    width: 100rpx;
}
.asso_wrap .bt_list .bt_list_wrap .delete_bt {
    flex: 1;
}
.asso_wrap .bt_list .bt_list_wrap .delete_bt image {
    height: 100rpx;
    width: 100rpx;
}
.asso_wrap .bt_list .data_title_wrap {
    display: flex;
    flex-direction: row;
    margin-top: 30rpx;
}
.asso_wrap .bt_list .data_title_wrap .data_title {
    flex: 3;
    font-weight: 700;
    font-size: 30rpx;
    padding-left: 24rpx;
}
.asso_wrap .bt_list .data_title_wrap .data_tip {
    flex: 2;
    color: #c7c7c7;
    font-size: 28rpx;
    text-align: right;
    padding-right: 40rpx;
}
.asso_wrap .dele_list {
    display: flex;
    flex-direction: column;
    padding-left: 24rpx;
    padding-right: 24rpx;
    margin-left: 12rpx;
    margin-right: 12rpx;
    font-size: 34rpx;
}
.asso_wrap .dele_list .del_bt {
    text-align: center;
    margin-top: 24rpx;
    margin-left: 24rpx;
    margin-right: 24rpx;
    border-radius: 24rpx;
    background-color: #b02e2e;
    padding: 8rpx;
    color: white;
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
    position: relative;
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 0;
    width: 100%;
    padding: 15rpx 0;
    z-index: 99999;
    border-radius: 20rpx;
    background-color: white;
    font-size: 34rpx;
}
.commodity_attr_box .list_wrap {
    text-align: center;
}
.commodity_attr_box .list_wrap .list {
    margin-left: 24rpx;
    margin-right: 24rpx;
    padding-top: 12rpx;
}
</style>
