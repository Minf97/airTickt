<template>
    <view>
        <scroll-view class="wrap">
            <!-- 招新海报 -->
            <view class="top_wrap">
                <view class="img" @tap="uploadImg" v-if="!imgUrl">
                    <image src="/static/images/Camera-3.png" />
                </view>
                <view class="img_1" v-else>
                    <swiper :indicator-dots="true" indicator-color="#fff" indicator-active-color="red" :current="current">
                        <block>
                            <swiper-item @longpress="changeImg">
                                <image :data-src="imgUrl" :src="imgUrl" mode="aspectFill" style="z-index: 11; width: 100%; height: 100%" @tap="previewImage" />
                            </swiper-item>
                        </block>
                    </swiper>
                </view>
                <view class="title">[招新海报]长按修改</view>
            </view>
            <!-- 招新标题 -->
            <view class="add_man_wrap">
                <view class="add_caption">社团/机构介绍(轻触修改)</view>
                <view class="inp_wrap">
                    <textarea class="handle_wrap" maxlength="-1" placeholder="xx社团/协会招新啦~" @input="getTitle" :value="add_title" style="height: 120rpx"></textarea>
                    <!-- <input placeholder="xx社团/协会招新啦~" bind:input="getTitle" value="{{add_title}}" /> -->
                    <view class="add_title" @tap="add_titleFun">保存</view>
                </view>
            </view>
            <!-- 问卷编辑 -->
            <view class="mess_item">
                <view class="title">招新问卷[{{ sendStatus == false ? '未发布' : '已发布' }}]</view>
                <view class="content_item" v-for="(item, index) in freshman" :key="index">
                    <view class="name">{{ index + 1 }}.{{ item.content }}</view>

                    <view class="operation">
                        <view class="delete" :data-item="item" @tap="deleteFun">删除</view>
                        <!-- <view class="write">编辑</view> -->
                    </view>
                </view>
                <view class="add" @tap="clickme">+</view>
            </view>
            <!-- 发布按钮 -->
            <view class="bt_wrap">
                <view class="send" @tap="send" :style="sendStatus == false ? 'background-color: #63A1A0;' : 'background-color: #8b538b;'">
                    {{ sendStatus == false ? '发布招新' : '撤回问卷' }}
                </view>
                <view class="changeTime">
                    <picker mode="date" :value="date" start="2022-2-01" end="2023-1-01" @change="changeDate" class="sends">
                        {{ date == null ? '截止时间' : '截至:' + date }}
                    </picker>
                </view>
            </view>
        </scroll-view>
        <view class="commodity_screen" @tap="hideModal" v-if="showModalStatus"></view>
        <!-- 弹出框 -->
        <view :animation="animationData" class="commodity_attr_box" v-if="showModalStatus">
            <view class="title">添加问题</view>
            <view class="input">
                <textarea maxlength="-1" placeholder="内容" @input="contentFun"></textarea>
            </view>
            <view class="bt_wrap">
                <view class="add" @tap="add_contentFun">添加</view>
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
            freshman: [],
            showModalStatus: false,
            add_content: '',
            sendStatus: false,

            //发布状态
            date: null,

            school: '',
            assoMess: '',
            imgUrl: '',
            CoverHeight: '',
            CoverWidth: '',
            ShowHeight: '',
            add_title: '',
            animationData: '',
            content: '',
            current: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let assoMess = JSON.parse(options.assoMess);
        let res = uni.getStorageSync('args');
        let school = res.school;
        let nickName = res.nickName;
        count = String(res.username);
        uni.showLoading({
            title: '加载中',
            mask: true,
            success: (result) => {
                db.collection('associationMess')
                    .where({
                        count: count
                    })
                    .get()
                    .then((res) => {
                        if (res.data.length == 0) {
                            db.collection('associationMess')
                                .add({
                                    data: {
                                        count: count,
                                        school: school,
                                        nickName: nickName,
                                        freshman: [],
                                        sendStatus: false,
                                        assoMess: assoMess,
                                        personArr: []
                                    }
                                })
                                .then((res) => {
                                    uni.hideLoading();
                                    this.setData({
                                        freshman: [],
                                        sendStatus: false,
                                        school: school,
                                        assoMess: assoMess
                                    });
                                });
                        } else {
                            db.collection('associationMess')
                                .where({
                                    count: count
                                })
                                .get()
                                .then((res) => {
                                    uni.hideLoading();
                                    this.setData({
                                        freshman: res.data[0].freshman,
                                        sendStatus: res.data[0].sendStatus,
                                        imgUrl: res.data[0].imgUrl,
                                        CoverHeight: res.data[0].CoverHeight,
                                        CoverWidth: res.data[0].CoverWidth,
                                        ShowHeight: res.data[0].ShowHeight,
                                        school: school,
                                        assoMess: assoMess,
                                        date: res.data[0].date,
                                        add_title: res.data[0].title
                                    });
                                });
                        }
                    });
            }
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
        // 弹窗
        clickme() {
            if (this.sendStatus == true) {
                uni.showModal({
                    title: '提示',
                    content: '已发布不可修改',
                    showCancel: true,
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
                this.showModal();
            }
        },

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
        hideModal: function () {
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

        // 输入内容
        contentFun(e) {
            this.setData({
                add_content: e.detail.value
            });
        },

        // 提交
        add_contentFun() {
            let content = this.add_content;
            let id = Date.parse(new Date());

            if (content == '') {
                uni.showToast({
                    title: '请输入内容',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {}
                });
            } else {
                let freshman = this.freshman;
                freshman.push({
                    content: content,
                    id: id
                });
                db.collection('associationMess')
                    .where({
                        count: count
                    })
                    .update({
                        data: {
                            freshman: freshman
                        }
                    })
                    .then((res) => {
                        uni.showToast({
                            title: '添加成功',
                            icon: 'none',
                            image: '',
                            duration: 1500,
                            mask: false,
                            success: (result) => {
                                this.setData({
                                    content: '',
                                    freshman: freshman
                                });
                                this.hideModal();
                            }
                        });
                    });
            }
        },

        // 删除内容
        deleteFun(e) {
            let id = e.currentTarget.dataset.item.id;
            let freshman = this.freshman;
            let newFreshman = [];

            for (let i = 0; i < freshman.length; i++) {
                if (freshman[i].id != id) {
                    newFreshman.push(freshman[i]);
                }
            }

            this.setData({
                freshman: newFreshman
            });
            uni.showToast({
                title: '删除成功',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {
                    db.collection('associationMess')
                        .where({
                            count: count
                        })
                        .update({
                            data: {
                                freshman: newFreshman
                            }
                        });
                }
            });
        },

        // 发布状态选择
        send() {
            let sendStatus = this.sendStatus;

            if (sendStatus == false) {
                if (this.date == null) {
                    uni.showModal({
                        title: '提示',
                        content: '设置截至时间',
                        showCancel: true,
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
                        content: '确定发布',
                        showCancel: true,
                        cancelText: '取消',
                        cancelColor: '#000000',
                        confirmText: '确定',
                        confirmColor: '#3CC51F',
                        success: (result) => {
                            if (result.confirm) {
                                uni.showLoading({
                                    title: '发布中...',
                                    mask: true,
                                    success: (result) => {
                                        wx.cloud
                                            .callFunction({
                                                name: 'associationSend',
                                                data: {
                                                    type: 0,
                                                    AllPhoto: [this.imgUrl],
                                                    Cover: this.imgUrl,
                                                    CoverHeight: this.CoverHeight,
                                                    CoverWidth: this.CoverWidth,
                                                    School: this.school,
                                                    ShowHeight: this.ShowHeight,
                                                    Title: this.add_title,
                                                    index: count + '社团',
                                                    endTime: this.date,
                                                    question: this.freshman,
                                                    association: this.assoMess
                                                }
                                            })
                                            .then((res) => {
                                                db.collection('associationMess')
                                                    .where({
                                                        count: count
                                                    })
                                                    .update({
                                                        data: {
                                                            sendStatus: true
                                                        }
                                                    })
                                                    .then((res) => {
                                                        uni.hideLoading();
                                                        uni.showToast({
                                                            title: '发布成功',
                                                            icon: 'none',
                                                            image: '',
                                                            duration: 1500,
                                                            mask: false,
                                                            success: (result) => {}
                                                        });
                                                        this.setData({
                                                            sendStatus: true
                                                        });
                                                    });
                                            });
                                    }
                                });
                            }
                        }
                    });
                }
            } else {
                uni.showModal({
                    title: '提示',
                    content: '撤回招新问卷',
                    showCancel: true,
                    cancelText: '取消',
                    cancelColor: '#000000',
                    confirmText: '确定',
                    confirmColor: '#3CC51F',
                    success: (result) => {
                        if (result.confirm) {
                            uni.showLoading({
                                title: '撤回中...',
                                mask: true,
                                success: (result) => {
                                    wx.cloud
                                        .callFunction({
                                            name: 'associationSend',
                                            data: {
                                                type: 1,
                                                count: count
                                            }
                                        })
                                        .then((res) => {
                                            uni.showToast({
                                                title: '已撤回',
                                                icon: 'none',
                                                image: '',
                                                duration: 1500,
                                                mask: false,
                                                success: (result) => {
                                                    this.setData({
                                                        sendStatus: false
                                                    });
                                                }
                                            });
                                        });
                                }
                            });
                        }
                    }
                });
            }
        },

        // 招新海报
        uploadImg() {
            let id = Date.parse(new Date());
            uni.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    wx.cloud
                        .uploadFile({
                            cloudPath: id + '/static/pages/association/freshman/.png',
                            filePath: res.tempFilePaths[0]
                        })
                        .then((res) => {
                            let imgUrl = res.fileID; // 计算图片

                            uni.getImageInfo({
                                src: imgUrl,
                                success: (res) => {
                                    let height = res.height > 500 ? 500 : res.height;
                                    let width = res.width < 370 ? 370 : res.width;
                                    let CoverHeight = height + 'rpx';
                                    let CoverWidth = width;
                                    let ShowHeight = height;
                                    db.collection('associationMess')
                                        .where({
                                            count: count
                                        })
                                        .update({
                                            data: {
                                                imgUrl: imgUrl,
                                                CoverHeight,
                                                CoverWidth,
                                                ShowHeight
                                            }
                                        })
                                        .then((res) => {
                                            uni.showToast({
                                                title: '上传成功',
                                                icon: 'none',
                                                image: '',
                                                duration: 1500,
                                                mask: false,
                                                success: (result) => {
                                                    console.log('成功');
                                                    this.setData({
                                                        imgUrl: imgUrl
                                                    });
                                                }
                                            });
                                        });
                                }
                            });
                        });
                }
            });
        },

        // 加载图片
        previewImage(e) {
            uni.previewImage({
                current: e.currentTarget.dataset.src,
                urls: [e.currentTarget.dataset.src],
                success: (result) => {}
            });
        },

        // 删除海报
        changeImg() {
            if (this.sendStatus == true) {
                uni.showModal({
                    title: '提示',
                    content: '已发布不可修改',
                    showCancel: true,
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
                this.uploadImg();
            }
        },

        // 选择时间
        changeDate(e) {
            if (this.sendStatus == true) {
                uni.showModal({
                    title: '提示',
                    content: '招新信息已发布,不可修改',
                    showCancel: true,
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
                db.collection('associationMess')
                    .where({
                        count: count
                    })
                    .update({
                        data: {
                            date: e.detail.value
                        }
                    })
                    .then((res) => {
                        this.setData({
                            date: e.detail.value
                        });
                    });
            }
        },

        // 招新标题
        getTitle(e) {
            this.setData({
                add_title: e.detail.value
            });
        },

        // 确认修改标题
        add_titleFun() {
            if (this.add_title == '') {
                uni.showToast({
                    title: '请输入标题',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {}
                });
            } else if (this.sendStatus == true) {
                uni.showModal({
                    title: '提示',
                    content: '发布后不可修改',
                    showCancel: true,
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
                uni.showLoading({
                    title: '修改中',
                    mask: true,
                    success: (result) => {
                        db.collection('associationMess')
                            .where({
                                count: count
                            })
                            .update({
                                data: {
                                    title: this.add_title
                                }
                            })
                            .then((res) => {
                                uni.showToast({
                                    title: '修改成功',
                                    icon: 'none',
                                    image: '',
                                    duration: 1500,
                                    mask: false,
                                    success: (result) => {
                                        uni.hideLoading();
                                    }
                                });
                            });
                    }
                });
            }
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
.wrap .mess_item {
    padding: 24rpx;
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 24rpx;
    border-radius: 24rpx;
    font-size: 32rpx;
}
.wrap .mess_item .title {
    text-align: center;
    font-weight: 700;
    padding: 12rpx;
    color: #63a1a0;
}
.wrap .mess_item .content_item {
    display: flex;
    flex-direction: row;
    margin: 12rpx;
}
.wrap .mess_item .content_item .name {
    flex: 4;
    background-color: #ebebeb;
    padding: 8rpx;
    border-radius: 12rpx;
}
.wrap .mess_item .content_item .operation {
    justify-content: center;
    align-items: center;
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
}
.wrap .mess_item .content_item .operation .delete {
    color: white;
    padding: 8rpx;
    border-radius: 12rpx;
    margin: 8rpx;
    background-color: #63a1a0;
}
.wrap .mess_item .content_item .operation .write {
    color: #d8d8d8;
    padding: 8rpx;
    border-radius: 12rpx;
    margin: 8rpx;
    background-color: royalblue;
}
.wrap .mess_item .add {
    border-radius: 42rpx;
    margin: 24rpx;
    font-size: 48rpx;
    text-align: center;
    color: #63a1a0;
    border: 1rpx solid #63a1a0;
}
.wrap .add_man_wrap {
    padding: 24rpx;
    font-size: 32rpx;
    background-color: white;
    margin: 24rpx;
    border-radius: 24rpx;
}
.wrap .add_man_wrap .add_caption {
    padding: 8rpx;
    color: #63a1a0;
}
.wrap .add_man_wrap .inp_wrap {
    display: flex;
    flex-direction: row;
}
.wrap .add_man_wrap .inp_wrap .handle_wrap {
    font-weight: 700;
    flex: 4;
    background-color: rgba(219, 219, 219, 0.425);
    padding: 12rpx;
    border-radius: 12rpx;
    color: #5f5f5f;
}
.wrap .add_man_wrap .inp_wrap .add_title {
    flex: 1;
    text-align: center;
    line-height: 120rpx;
    color: #63a1a0;
}
.wrap .bt_wrap {
    padding: 48rpx;
    font-size: 32rpx;
}
.wrap .bt_wrap .send {
    text-align: center;
    margin-left: 24rpx;
    margin-right: 24rpx;
    border-radius: 24rpx;
    padding: 12rpx;
    font-size: 34rpx;
    color: white;
}
.wrap .bt_wrap .changeTime {
    text-align: center;
    margin-left: 24rpx;
    margin-right: 24rpx;
    border-radius: 24rpx;
    color: white;
    margin-top: 24rpx;
    background-color: #63a1a0;
}
.wrap .bt_wrap .changeTime .sends {
    padding: 12rpx;
    font-size: 34rpx;
}
/*使屏幕变暗  */
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
    border-radius: 24rpx;
    width: 100%;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2000;
    background: #fff;
    padding-top: 20rpx;
    display: flex;
    flex-direction: column;
}
.commodity_attr_box .title {
    font-size: 32rpx;
    text-align: center;
    padding: 12rpx;
}
.commodity_attr_box .input {
    margin: 12rpx;
    padding: 12rpx;
}
.commodity_attr_box .input textarea {
    height: 200rpx;
    width: 100%;
}
.commodity_attr_box .bt_wrap {
    padding: 24rpx;
}
.commodity_attr_box .bt_wrap .add {
    border-radius: 24rpx;
    color: white;
    padding: 12rpx;
    font-size: 36rpx;
    text-align: center;
    background-color: #53538b;
}
</style>
