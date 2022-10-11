<template>
    <view class="edit" v-if="showModel">
        <view class="edit_background" @tap="add"></view>

        <view :class="'edit_contain ' + add_style">
            <view class="edit_Title">发布日常</view>
            <view class="Line"></view>

            <form @submit="formSubmit" @reset="formReset">
                <view class="img-button chooseImg-btn" @tap="chooseimage">
                    <image src="/static/images/Camera-3.png" class="Camera_Image"></image>
                    <swiper :indicator-dots="true" indicator-color="#fff" indicator-active-color="red" :current="current">
                        <block v-for="(item, index) in photo" :key="item.photo">
                            <swiper-item @longpress="deleteImage" @tap.stop.prevent="PreviewImage" :data-index="index">
                                <image :data-src="item" :src="item" mode="aspectFill" style="z-index: 11; width: 800rpx; height: 100%" />
                            </swiper-item>
                        </block>
                    </swiper>
                </view>

                <view class="MenuDiv">
                    <span class="rightimg-top" @tap.native="clickMenu">分类:</span>

                    <span class="choosenLabel">
                        {{ choosenLabel }}
                    </span>

                    <TabScroll class="TabScrollSub" type="发布页面标签" :menu="menu" @chooseTab="chooseTab" :showTab="showTab"></TabScroll>
                    <!-- 失物招领的需要在这里加一个标题 -->
                    <view v-if="choosenLabel == '寻物发布'">
                        <view class="edit_pic_Title">
                            <input placeholder="请输入失物物品" :value="Input_Title" name="formTitle" />
                        </view>
                    </view>

                    <view class="edit_pic_Text">
                        <textarea placeholder="添加正文" :value="Input_Text" name="formText" maxlength="-1"></textarea>
                    </view>
                </view>
                <view v-if="choosenLabel == '寻物发布'">
                    <LosePublish @type="typeFun" @campus="campusFun" @Time="TimeFun" @Other="OtherFun"></LosePublish>
                </view>

                <view>
                    <span v-if="nm" class="rightimg-top">
                        匿名:
                        <switch @change="switchChange" :checked="isNm" style="padding-left: 20rpx; padding-bottom: 10rpx"></switch>
                    </span>
                    <view class="Line"></view>

                    <view class="edit_Publish">
                        <button @tap="add" class="off-btn" hover-class="btn-hover">取消</button>
                        <button form-type="submit" class="Publish-btn" hover-class="btn-hover">发表内容</button>
                    </view>
                </view>
            </form>
        </view>
    </view>
</template>

<script>
import TabScroll from '.././TabScroll/TabScroll';
import LosePublish from '.././LosePublish/LosePublish';
//发布组件化
var moreUtil = require('../../utils/utils');

export default {
    components: {
        TabScroll,
        LosePublish
    },
    data() {
        return {
            showModel: false,

            // 控制显隐
            add_style: '',

            // 样式
            showTab: true,

            // 标签显隐
            nm: false,

            // 匿名开关
            isNm: '',

            // 匿名账号
            formTitle: ' ',

            formText: '',
            photo: [],

            // 照片
            choosenLabel: '',

            // 已选标签
            menu: ['日常', '表白墙🎯', '吐槽'],

            imageHeight: 0,
            imageWidth: 0,
            current: 0,

            // 单个第x张照片
            //存储寻物发布信息
            Time: '',

            type: '',
            campus: '',
            Other: '',
            Input_Title: '',
            Input_Text: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {},
    mounted() {
        let args = uni.getStorageSync('args');
        this.setData({
            nm: args.nm
        });
    },
    methods: {
        // 点击事件 - 组件显隐
        add(e) {
            var showModel = this.showModel;
            var that = this;

            if (showModel) {
                this.setData({
                    add_style: 'add_hide'
                });
                setTimeout(() => {
                    that.setData({
                        showModel: !showModel
                    });
                }, 200);
            } else {
                this.setData({
                    add_style: 'add_show',
                    showModel: !showModel
                });
            }
        },

        // 点击事件 - 标签显隐
        clickMenu(e) {
            this.setData({
                showTab: !this.showTab
            });
        },

        // 点击事件 - 匿名
        switchChange: function (res) {
            console.log(2323);
            this.setData({
                isNm: res.detail.value
            });
        },

        // 点击事件 - 选择标签
        chooseTab: function (e) {
            // 获取索引值
            let index = e.detail.currentTarget.dataset.index;
            this.setData({
                choosenLabel: this.menu[index]
            });
        },

        // 内部函数 -
        ReOnLoad() {
            this.$emit('ReOnLoad');
        },

        // 点击事件 - 发布
        formSubmit(e) {
            // 2.2 添加与存储 (发布点击事件)
            if (this.choosenLabel != '寻物发布') {
                this.setData({
                    Time: '',
                    type: '',
                    campus: '',
                    Other: ''
                });
            }

            let { formTitle, formText } = e.detail.value;
            let args = uni.getStorageSync('args');
            let { iconUrl, nickName, school } = args;

            if (!formTitle) {
                formTitle = '';
            }

            if (!formText) {
                formText = '';
            }

            console.log(this.choosenLabel);

            if (this.photo.length == 0) {
                uni.showToast({
                    title: '图片不能为空',
                    icon: 'none'
                });
            } else if (!this.choosenLabel) {
                uni.showToast({
                    title: '标签不能为空',
                    icon: 'none'
                });
            } else if (this.choosenLabel == '寻物发布' && !this.type) {
                uni.showToast({
                    title: '请选择失物类别',
                    icon: 'none'
                });
            } else if (this.choosenLabel == '寻物发布' && !this.campus) {
                uni.showToast({
                    title: '请选择学校校区',
                    icon: 'none'
                });
            } else if (this.choosenLabel == '寻物发布' && !this.Time) {
                uni.showToast({
                    title: '请选择丢失时间',
                    icon: 'none'
                });
            } else if (this.choosenLabel == '寻物发布' && !this.Other) {
                uni.showToast({
                    title: '请选择是否悬赏',
                    icon: 'none'
                });
            } else if (!nickName && !iconUrl) {
                uni.showToast({
                    title: '小主还没登录哟QwQ',
                    icon: 'none'
                });
            } else {
                if (this.isNm) {
                    iconUrl = '/static/pages/myself/images/logo.jpg';
                    nickName = '匿名账号';
                }

                let add = {
                    Cover: this.photo[0],
                    AllPhoto: JSON.parse(JSON.stringify(this.photo)),
                    Title: formTitle,
                    Text: formText,
                    CoverHeight: this.imageHeight,
                    CoverWidth: this.imageWidth,
                    Label: this.choosenLabel,
                    Time: new Date().getTime(),
                    nickName: nickName,
                    School: school,
                    iconUrl: iconUrl,
                    LoseTime: this.Time,
                    campus: this.campus,
                    Other: this.Other,
                    LoseType: this.type
                };
                console.log(add);
                console.log(getApp().globalData.allList); // 在“全部标签”中，加入该帖子

                let list = getApp().globalData.allList[0] || [];
                list.push(add);
                let NewData = list.length - 1; // 计算图片高度

                const CalculateImage = () => {
                    for (let i = 0; i < list.length; i++) {
                        // 计算高度
                        let height = parseInt(Math.round((list[i].CoverHeight * 370) / list[i].CoverWidth));

                        if (height) {
                            let currentItemHeight = parseInt(Math.round((list[i].CoverHeight * 370) / list[i].CoverWidth)); // 边界处理

                            if (currentItemHeight > 500) {
                                currentItemHeight = 500;
                            } else {
                                ('');
                            } // 赋值

                            list[i].ShowHeight = currentItemHeight;
                            list[i].CoverHeight = currentItemHeight + 'rpx'; // 因为xml文件中直接引用的该值作为高度，所以添加对应单位
                        }
                    }

                    return;
                }; // 将数据上传到数据库  (仅uploadPhoto内调用)

                const uploadData = (NewData, fileIDs) => {
                    let args = uni.getStorageSync('args');
                    var that = this;
                    console.log(fileIDs.length, list[NewData].AllPhoto.length);

                    if (fileIDs.length == list[NewData].AllPhoto.length) {
                        wx.cloud.callFunction({
                            name: 'CampusCircle',
                            data: {
                                // LoseTime:
                                Cover: fileIDs[0],
                                LoseTime: list[NewData].LoseTime ? list[NewData].LoseTime : '',
                                Other: list[NewData].Other ? list[NewData].Other : '',
                                LoseType: list[NewData].LoseType ? list[NewData].LoseType : '',
                                campus: list[NewData].campus ? list[NewData].campus : '',
                                AllPhoto: fileIDs,
                                Title: list[NewData].Title,
                                Text: list[NewData].Text,
                                CoverHeight: list[NewData].CoverHeight,
                                CoverWidth: list[NewData].CoverWidth,
                                Label: list[NewData].Label,
                                Time: list[NewData].Time,
                                ShowHeight: list[NewData].ShowHeight,
                                School: list[NewData].School,
                                nickName: list[NewData].nickName,
                                username: args.username,
                                iconUrl: list[NewData].iconUrl,
                                Star: 0,
                                type: 'write'
                            },
                            success: (res) => {
                                console.log('add', res);
                                uni.showToast({
                                    duration: 2000,
                                    title: '添加成功'
                                });
                                setTimeout(() => {
                                    moreUtil.setAllList(getApp().globalData.allList, '快速发布卡片');
                                }, 1000);
                            },
                            fail: (err) => {
                                uni.showToast({
                                    icon: 'none',
                                    title: '出错啦！请稍后重试'
                                });
                                console.error;
                            },

                            complete() {
                                // 初始化
                                that.setData({
                                    photo: [],
                                    Input_Title: '',
                                    Input_Text: '',
                                    choosenLabel: ' ',
                                    showModel: !that.showModel
                                });
                            }
                        });
                    }
                }; // 将本地图片上传到云存储，后续通过fileid进行图片展示

                const uploadPhoto = (NewData) => {
                    /**
                     * 图片上传逻辑
                     * 1. 判断条件，是否符合上传条件
                     * 2. 自定义函数上传图片到云存储
                     * 3. 将所有信息保存到数据库
                     */
                    uni.showLoading({
                        title: '加载中',
                        mask: true
                    });
                    var path = getApp().globalData.allList[0][NewData].AllPhoto;
                    var fileIDs = [];
                    console.log(path);

                    for (var i = 0; i < path.length; i++) {
                        console.log(1111);
                        console.log(path[i]);
                        uni.compressImage({
                            src: path[i],
                            // 图片路径
                            quality: 50,

                            // 压缩质量,
                            success(res) {
                                wx.cloud
                                    .uploadFile({
                                        cloudPath:
                                            'CampusCircle_images/' + new Date().getTime() + Math.floor(Math.random() * 150) + '/static/pages/more/components/QuickPublish/.png',
                                        filePath: res.tempFilePath
                                    })
                                    .then((res) => {
                                        fileIDs.push(res.fileID);
                                        uploadData(NewData, fileIDs);
                                    });
                            },

                            fail(err) {
                                console.log(err);
                            }
                        });
                    }
                };

                CalculateImage();
                uploadPhoto(NewData);
            }
        },

        // 点击事件 - 选择图片
        chooseimage: function () {
            var that = this;

            if (that.photo.length == 0) {
                uni.chooseImage({
                    count: 6,
                    sizeType: ['original', 'compressed'],
                    // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'],
                    // 可以指定来源是相册还是相机，默认二者都有
                    success: (res) => {
                        that.photo = res.tempFilePaths; // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

                        that.setData({
                            photo: that.photo
                        });
                        uni.getImageInfo({
                            src: that.photo[0],
                            success: function (res) {
                                that.imageHeight = res.height;
                                that.imageWidth = res.width;
                            }
                        });
                    }
                });
            }
        },

        // 点击事件 - 删除图片
        deleteImage: function (e) {
            var that = this;
            var index = e.currentTarget.dataset.index; //获取当前长按图片下标

            if (that.photo.length != 0) {
                uni.showModal({
                    title: '提示',
                    content: '确定要删除此图片吗？',
                    success: function (res) {
                        if (res.confirm) {
                            that.photo.splice(index, 1);
                        }

                        that.setData({
                            photo: that.photo,
                            current: 0
                        });
                        uni.getImageInfo({
                            src: that.photo[0],
                            success: function (res) {
                                that.imageHeight = res.height;
                                that.imageWidth = res.width;
                            }
                        });
                    }
                });
            }
        },

        // 点击事件 - 预览图片
        PreviewImage: function (e) {
            let index = e.currentTarget.dataset.index;
            var imgs = this.photo;

            if (imgs.length != 0) {
                uni.previewImage({
                    current: imgs[index],
                    urls: imgs
                });
            }
        },

        typeFun(e) {
            console.log(e.detail);
            this.setData({
                type: e.detail
            });
        },

        campusFun(e) {
            console.log(e.detail);
            this.setData({
                campus: e.detail
            });
        },

        OtherFun(e) {
            console.log(e.detail);
            this.setData({
                Other: e.detail
            }); // console.log(e.detail)
        },

        TimeFun(e) {
            console.log(e.detail);
            this.setData({
                Time: e.detail
            });
        },

        formReset() {
            console.log('占位：函数 formReset 未声明');
        }
    }
};
</script>
<style>
.edit,
.edit_background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    font-family: unset;
}
.edit_background {
    background-color: rgba(0, 0, 0, 0.712);
    opacity: 0.6;
    height: 100%;
}
.edit_contain {
    position: relative;
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 0;
    width: 100%;
    background-color: rgb(255, 255, 255);
    padding: 15rpx 0;
    z-index: 99999;
    border-radius: 20rpx;
}
.edit_Title {
    font-size: 35rpx;
    padding-bottom: 15rpx;
    font-weight: 550;
    display: flex;
    padding-left: 307rpx;
}
.MenuDiv {
    overflow: hidden;
    margin-top: 15rpx;
    margin-bottom: 15rpx;
}
.rightimg-top {
    font-size: 30rpx;
    margin-left: 10rpx;
    font-weight: 550;
    color: #2b2b2bd7;
}
.choosenLabel {
    font-size: 30rpx;
    font-weight: 550;
    color: #2b2b2bd7;
}
.choose_First {
    background-color: rgba(236, 236, 236, 0.219);
}
.Choosen {
    width: 100%;
    height: 68rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.Line {
    background: #9b9b9b48;
    width: 100%;
    height: 1rpx;
}
swiper {
    width: 100%;
    height: 380rpx;
}
swiper image {
    width: 100%;
    height: 100%;
}
swiper .wx-swiper-dot {
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    display: inline-flex;
    justify-content: space-between;
}
.img-button {
    display: flex;
    justify-content: center;
    align-items: center;
}
.chooseImg-btn {
    width: 100%;
    height: 380rpx;
    background-color: rgba(241, 229, 201, 0.26);
}
.Camera_Image {
    width: 90rpx;
    height: 90rpx;
    position: absolute;
    left: 330rpx;
}
.edit_pic_Title {
    width: 100%;
    height: 80rpx;
    display: flex;
    align-items: center;
    font-weight: 550;
    font-size: 30rpx;
    margin-left: 10rpx;
}
.edit_pic_Title input {
    width: 95%;
}
.edit_pic_Text {
    width: 100%;
    height: 340rpx;
    font-size: 30rpx;
    margin: 10rpx;
}
.edit_pic_Text textarea {
    width: 98%;
    height: 100%;
}
.edit_Publish {
    display: flex;
    flex-direction: row;
}
.Publish-btn {
    background-color: rgb(128, 190, 226);
    box-shadow: 0px 0px 4px 0px #c7c7c7;
    color: white;
    width: 530rpx !important;
    margin: 10rpx;
    margin: 0rpx 10rpx 0rpx 5rpx;
}
.off-btn {
    background-color: rgba(214, 214, 214, 0.37);
    box-shadow: 0px 0px 4px 0px #c7c7c7;
    color: rgb(0, 0, 0);
    width: 200rpx !important;
    margin: 0rpx 10rpx 0rpx 5rpx;
}
.btn-hover {
    position: relative;
    top: 3rpx;
    box-shadow: 0px 0px 4px rgba(153, 153, 153, 0.507) inset;
}
.add_show {
    animation: add_show 0.15s;
}
.add_hide {
    animation: add_hide 0.3s;
}
@media (prefers-color-scheme: dark) {
    .edit_contain {
        filter: invert(1) !important;
    }
    .choosenLabel {
        filter: invert(1) !important;
        color: rgb(174, 174, 174);
    }
    .MenuDiv textarea {
        filter: invert(1) !important;
    }
}
</style>
