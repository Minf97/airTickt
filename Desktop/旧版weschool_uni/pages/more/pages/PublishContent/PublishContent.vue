<template>
    <view class="container">
        <!-- 头部 -->
        <view class="head" :style="'background-image: ' + (theme ? 'linear-gradient( #a5e6ff , #fff) ' : 'linear-gradient( #f6f6f6 , #f6f6f6)') + ';'">
            <!-- 状态栏 -->
            <view :style="'height: ' + statusBarHeight + 'px;'" />
            <!-- 导航栏 -->
            <view class="navigation" :style="'height: ' + lineHeight + 'px;'">
                <image class="navigationBack" src="/static/pages/more/pages/PublishContent/images/back.png" @tap="navigationBack"></image>
                发布动态
            </view>
        </view>
        <!-- 填充 -->
        <view :style="'position: relative; padding-top: ' + (3 + (statusBarHeight + lineHeight)) + 'px; width: 100%;'"></view>
        <view :style="'position: relative; padding-top: ' + (showscroll ? 140 : 0) + 'rpx; width: 100%;'"></view>

        <!-- 标签选择滚动栏 -->
        <view @tap="showTabFun">
            <!-- 没有选择标签时，出现这个 -->
            <view class="choose_Channel" v-if="!choosenLabel">
                <view class="left">
                    <image src="/static/pages/more/pages/PublishContent/images/sun.png"></image>
                    <text>选择频道发布</text>
                </view>
                <view class="right">
                    <text>合适的频道选择，会结识志同道合的人</text>
                    <image src="/static/pages/more/pages/PublishContent/images/right.png"></image>
                </view>
            </view>
            <!-- 选择标签后，出现这个 -->
            <view class="choose_Channel" v-if="choosenLabel">
                <view class="left">
                    <image src="/static/pages/more/pages/PublishContent/images/sun.png"></image>
                    <text>{{ choosenLabel }}</text>
                </view>
            </view>
        </view>
        <TabScroll type="发布页面标签" :menu="menu" @chooseTab="chooseTab" :showTab="showTab"></TabScroll>

        <form @submit="formSubmit" @reset="formReset">
            <!-- 主体 -->
            <view class="mainBody">
                <view class="mainTitle">
                    <!-- 标题 -->
                    <input placeholder="标题 闲聊/求助/组队/失物..." :value="Input_Title" name="formTitle" />
                </view>
                <view class="Line"></view>
                <view class="mainText">
                    <!-- 正文 -->
                    <textarea placeholder="记录这一刻...." :value="Input_Text" name="formText" maxlength="-1"></textarea>
                </view>
                <view class="chooseImageBox">
                    <block v-for="(item, index) in photo" :key="item.photoIndex">
                        <!-- 渲染已选择图片 -->

                        <view class="beChoosen_ImageBox">
                            <image class="beChoosen_Image" :src="item.tempFilePath" @tap="preViewImage" :data-index="index" mode="aspectFill"></image>
                            <view class="del_beChoosen_Image" @tap="del_beChoosen_Image" :data-index="index">
                                <image src="/static/pages/more/pages/PublishContent/images/close.png"></image>
                            </view>
                        </view>
                    </block>
                    <view class="chooseImage" @tap="chooseImage">
                        <!-- 放入图片 -->
                        <image src="/static/pages/more/pages/PublishContent/images/jia.png"></image>
                    </view>
                </view>
            </view>
            <view v-if="choosenLabel == '寻物发布'">
                <LosePublish @detail="detail"></LosePublish>
            </view>
            <!-- 发布按钮 -->
            <view class="publishBox">
                <button class="cancel" hover-class="btn_hover" @tap="cancel">
                    <text>取消</text>
                </button>
                <button class="publish" form-type="submit" hover-class="btn_hover">
                    <text>发布动态</text>
                </button>
            </view>
        </form>
    </view>
</template>

<script>
import LosePublish from '../../../../components/LosePublish/LosePublish';
import TabScroll from '../../components/TabScroll/TabScroll';
var app = getApp();

var moreUtil = require('../../utils/utils');

export default {
    components: {
        LosePublish,
        TabScroll
    },
    data() {
        return {
            text: '很多覅的宏观环境欧派的',
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            rectHeight: getApp().globalData.rectHeight,
            menu: [],

            // 标签
            showTab: false,

            // 控制标签显隐
            theme: false,

            // 是否开启主题
            choosenLabel: '',

            // 选中的标签
            formTitle: '',

            // 标题
            formText: '',

            // 正文
            photo: [],

            // 图片
            imageHeight: 0,

            imageWidth: 0,

            //存储寻物发布信息
            lose_detail: '',

            Input_Title: '',
            Input_Text: '',
            showModel: '',
            showscroll: false
        };
    },
    onLoad: function (options) {
        // 兼容打卡一键分享
        let photo = [
            {
                imageHeight: options.imageHeight,
                imageWidth: options.imageWidth,
                tempFilePath: options.tempFiles
            }
        ];
        console.log(options);
        console.log(photo);

        if (photo[0].tempFilePath) {
            let nickName = uni.getStorageSync('args').nickName;
            let Input_Title = nickName + ' 今天已打卡~';
            let Input_Text = '每天都要坚持打卡噢！';
            let choosenLabel = '打卡';
            this.setData({
                photo,
                Input_Title,
                Input_Text,
                choosenLabel
            });
        }

        let args = uni.getStorageSync('args');
        let theme = uni.getStorageSync('theme');
        let menu_ = args.tabitem; // menu_.push("寻物发布")
        // 兜底数据

        let menu = ['日常', '晒出课表🤣', '树洞👂', '2022新年Flag🚩', '2021回顾◀', '三行情书❤️', '故事屋⭐️', '寻物发布'];
        this.setData({
            menu: args.tabitem ? menu_ : menu,
            theme
        });
    },
    methods: {
        navigationBack() {
            uni.navigateBack({
                delta: 1
            });
        },

        // 点击事件 - 点击出现TabScroll
        showTabFun() {
            this.setData({
                showTab: !this.showTab
            });
        },

        // 点击事件 - 选择标签
        chooseTab(e) {
            // 获取索引值
            let index = e.detail.currentTarget.dataset.index;
            this.setData({
                choosenLabel: this.menu[index],
                showTab: false // 点击后，隐藏标签选择栏
            });
        },

        // 点击事件 - 选择图片
        chooseImage() {
            let that = this;
            uni.chooseMedia({
                // 上传图片
                count: 6,
                mediaType: 'image',
                sourceType: ['album', 'camera'],
                sizeType: ['original', 'compressed'],
                // 可选择原图、压缩图
                success: (res) => {
                    console.log(res);
                    let photo = that.photo.concat(res.tempFiles);
                    console.log(res.tempFiles);
                    uni.getImageInfo({
                        // 获得图片信息
                        src: photo[0].tempFilePath,
                        success: (res) => {
                            photo[0].imageHeight = res.height;
                            photo[0].imageWidth = res.width;
                            that.setData({
                                photo
                            });
                        }
                    });
                }
            });
        },

        // 点击事件 - 取消按钮
        cancel() {
            uni.navigateBack({
                delta: 1
            });
        },

        // 点击事件 - 发布
        formSubmit(e) {
            let { formTitle, formText } = e.detail.value;
            let args = uni.getStorageSync('args'); // 判空逻辑：1.标题 2.正文 3.选择标签 4.图片  => 缺一不可 //另加了寻物发布逻辑稍微有改变

            if (!formTitle.replace(/\s/g, '')) {
                uni.showToast({
                    title: '标题不能为空',
                    icon: 'none'
                });
            } else if (!formText.replace(/\s/g, '')) {
                uni.showToast({
                    title: '文字不能为空',
                    icon: 'none'
                });
            } else if (this.photo.length == 0) {
                uni.showToast({
                    title: '图片不能为空',
                    icon: 'none'
                });
            } else if (!this.choosenLabel) {
                uni.showToast({
                    title: '标签不能为空',
                    icon: 'none'
                });
            } else if (!args.nickName && !args.iconUrl) {
                uni.showToast({
                    title: '小主还没登录哟QwQ',
                    icon: 'none'
                });
            } //失物判断
            else if (this.choosenLabel == '寻物发布' && !this.lose_detail) {
                uni.showToast({
                    title: '寻物相关信息还未全部填写',
                    icon: 'none'
                });
            } else {
                let add = {
                    Cover: this.photo[0],
                    //
                    AllPhoto: JSON.parse(JSON.stringify(this.photo)),
                    //
                    Title: formTitle,
                    //标题
                    Text: formText,
                    //文本
                    CoverHeight: this.photo[0].imageHeight,
                    //
                    CoverWidth: this.photo[0].imageWidth,
                    //
                    Label: this.choosenLabel,
                    //标签
                    Time: new Date().getTime(),
                    //
                    nickName: args.nickName,
                    //wx名字
                    School: args.school,
                    iconUrl: args.iconUrl,
                    lose_detail: this.lose_detail
                };
                let list = app.globalData.allList[0] || [];
                list.push(add);
                let NewData = list.length - 1; // 计算图片高度

                const CalculateImage = () => {
                    for (let i = 0; i < list.length; i++) {
                        // 计算得到高度
                        let height = parseInt(Math.round((list[i].CoverHeight * 370) / list[i].CoverWidth));

                        if (height) {
                            let currentItemHeight = parseInt(Math.round((list[i].CoverHeight * 370) / list[i].CoverWidth)); // 边界处理

                            if (currentItemHeight > 500) {
                                currentItemHeight = 500;
                            } else {
                                ('');
                            }

                            list[i].ShowHeight = currentItemHeight;
                            list[i].CoverHeight = currentItemHeight + 'rpx'; // 因为xml文件中直接引用的该值作为高度，所以添加对应单位
                        }
                    }

                    return;
                }; // 将数据上传到数据库  (仅uploadPhoto内调用)

                const uploadData = (NewData, fileIDs) => {
                    //fileIds????
                    let that = this;
                    let args = uni.getStorageSync('args');

                    if (fileIDs.length == list[NewData].AllPhoto.length) {
                        console.log(app.globalData.allList, 2222);
                        wx.cloud.callFunction({
                            name: 'CampusCircle',
                            data: {
                                Cover: fileIDs[0],
                                //图片
                                AllPhoto: fileIDs,
                                //所有图片
                                Title: list[NewData].Title,
                                Text: list[NewData].Text,
                                CoverHeight: list[NewData].CoverHeight,
                                //图片
                                CoverWidth: list[NewData].CoverWidth,
                                //图片
                                Label: list[NewData].Label,
                                Time: list[NewData].Time,
                                ShowHeight: list[NewData].ShowHeight,
                                School: list[NewData].School,
                                nickName: list[NewData].nickName,
                                username: args.username,
                                iconUrl: list[NewData].iconUrl,
                                Other: list[NewData].lose_detail ? list[NewData].lose_detail.Other : '',
                                LoseTime: list[NewData].lose_detail ? list[NewData].lose_detail.Time : '',
                                LoseType: list[NewData].lose_detail ? list[NewData].lose_detail.type : '',
                                campus: list[NewData].lose_detail ? list[NewData].lose_detail.campus : '',
                                Star: 0,
                                type: 'write'
                            },
                            success: (res) => {
                                console.log('add', res);
                                uni.showToast({
                                    duration: 4000,
                                    title: '添加成功'
                                }); // 删除 addAft = 1
                            },
                            fail: (err) => {
                                uni.showToast({
                                    icon: 'none',
                                    title: '出错啦！请稍后重试'
                                });
                                console.error;
                            },

                            complete() {
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
                    let AllPhoto = app.globalData.allList[0][NewData].AllPhoto; //用户选的图片

                    let fileIDs = [];

                    for (var i = 0; i < AllPhoto.length; i++) {
                        uni.compressImage({
                            src: AllPhoto[i].tempFilePath,
                            // 图片路径
                            quality: 50,
                            // 压缩质量,
                            success: (res) => {
                                console.log(res);
                                wx.cloud
                                    .uploadFile({
                                        cloudPath: 'CampusCircle_images/' + new Date().getTime() + Math.floor(Math.random() * 150) + '/static/pages/more/pages/PublishContent/.png',
                                        filePath: res.tempFilePath
                                    })
                                    .then((res) => {
                                        fileIDs.push(res.fileID);
                                        uploadData(NewData, fileIDs); // 返回校园圈页面

                                        setTimeout(() => {
                                            moreUtil.setAllList(getApp().globalData.allList, '普通发布卡片');
                                        }, 1000);
                                    });
                            }
                        });
                    }

                    return;
                };

                CalculateImage();
                uploadPhoto(NewData);
            }
        },

        // 点击事件 - 删除照片
        del_beChoosen_Image(e) {
            let index = e.target.dataset.index; // 照片索引值

            let photo = this.photo.slice();
            photo.splice(index, 1); // 注意：splice返回值是删除的元素, 并改变原数组

            this.setData({
                photo
            });
        },

        // 点击已选图片 - 进行预览
        preViewImage(e) {
            let urls = this.photo.map((item) => {
                return item.tempFilePath;
            });
            let index = e.target.dataset.index;
            uni.previewImage({
                urls: urls,
                current: urls[index]
            });
        },

        detail(e) {
            this.setData({
                lose_detail: e.detail
            });
        },

        formReset() {
            console.log('占位：函数 formReset 未声明');
        }
    }
};
</script>
<style>
.container {
    letter-spacing: 2rpx;
}
/* 1. 头部 */
.head {
    width: 100%;
    position: fixed;
    z-index: 2;
    color: #000;
}
.navigation {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.navigationBack {
    position: absolute;
    left: 30rpx;
    top: 25rpx;
    width: 35rpx;
    height: 35rpx;
}
/* 2. 选择频道 */
.choose_Channel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 10rpx 20rpx;
    background-color: rgb(245, 245, 245);
}
.choose_Channel .left {
    display: flex;
    justify-content: center;
    align-items: center;
}
.choose_Channel .left image {
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
}
.choose_Channel .left text {
    font-size: 28rpx;
    font-weight: 550;
    color: rgb(119, 195, 173);
    letter-spacing: 3rpx;
}
.choose_Channel .right {
    width: 250rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.choose_Channel .right text {
    width: 200rpx;

    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: 24rpx;
    color: #ccc;
    letter-spacing: 2rpx;
}
.choose_Channel .right image {
    width: 30rpx;
    height: 30rpx;
    margin-left: 10rpx;
}
/* 3.主体 */
.mainBody {
    margin: 30rpx 20rpx;
}
.mainBody .mainTitle {
    margin: 15rpx;
    margin-left: 0;
    font-size: 30rpx;
    /* color: rgb(150, 150, 150); */
    color: rgb(24, 23, 23);
    caret-color: rgb(37, 37, 37);
}
.mainBody .mainText {
    margin: 20rpx;
    margin-left: 0;
}
.mainBody .mainText textarea {
    width: 98%;
    caret-color: rgb(37, 37, 37);
    color: rgb(24, 23, 23);
    /* color: rgb(150, 150, 150); */
    font-size: 26rpx;
}

.Line {
    background: #9b9b9b48;
    width: 100%;
    height: 1rpx;
}
.chooseImageBox {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.beChoosen_ImageBox {
    display: inline-block;
    position: relative;
    width: 150rpx;
    height: 150rpx;
    margin-right: 20rpx;
}
.beChoosen_Image {
    width: 150rpx;
    height: 150rpx;
    border-radius: 15rpx;
}
.del_beChoosen_Image {
    position: absolute;
    top: 5rpx;
    right: 5rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25rpx;
    height: 25rpx;
    border-radius: 50%;
    background-color: rgb(10, 10, 10, 0.3);
    font-size: 25rpx;
    color: #fff;
}
.beChoosen_ImageBox .del_beChoosen_Image image {
    width: 25rpx;
    height: 25rpx;
}
.chooseImage {
    width: 150rpx;
    height: 150rpx;
    background-color: rgb(245, 245, 245);
    border-radius: 15rpx;

    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.chooseImage image {
    display: inline-block;
    width: 60rpx;
    height: 60rpx;
}

/* 4.发布按钮 */

.publishBox {
    position: absolute;
    bottom: 30rpx;
    width: 100%;
    /* height: 100rpx; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 20rpx;
}
.cancel {
    background-color: rgba(214, 214, 214, 0.37);
    box-shadow: 0px 0px 4px 0px #c7c7c7;
    color: rgb(0, 0, 0);
    width: 200rpx !important;
    margin: 0rpx 10rpx 0rpx 5rpx;
}
.publish {
    background-color: rgb(172, 211, 254);
    box-shadow: 0px 0px 4px 0px #c7c7c7;
    color: white;
    width: 480rpx !important;
    margin: 10rpx;
    margin: 0rpx 10rpx 0rpx 5rpx;
}
.cancel text,
.publish text {
    font-size: 30rpx;
    font-weight: 550;
    letter-spacing: 5rpx;
}
.btn_hover {
    position: relative;
    top: 3rpx;
    box-shadow: 0px 0px 4px rgba(153, 153, 153, 0.507) inset;
}

/* 暗黑处理 */
@media (prefers-color-scheme: dark) {
    /* 头部 */
    .head {
        background-image: linear-gradient(#f6f6f6, #f6f6f6) !important;
    }
    .navigationBack {
        filter: invert(0) !important;
    }
    /* 频道 */
    .choose_Channel .left image,
    .choose_Channel .left text {
        filter: invert(1) !important;
    }
    .choose_Channel .right image,
    .choose_Channel .right text {
        filter: invert(0.3) !important;
    }
    .choose_First {
        filter: invert(0) !important;
    }
    /* 主体 */
    .mainBody .mainTitle input {
        filter: invert(1) !important;
        margin: 15rpx;
        margin-left: 0;
        font-size: 30rpx;
        /* color: rgb(150, 150, 150); */
        color: rgb(221, 222, 222);
        caret-color: rgb(37, 37, 37);
    }
    .mainBody .mainText textarea {
        filter: invert(1) !important;
        width: 98%;
        caret-color: rgb(218, 218, 218);
        color: rgb(221, 222, 222);
        /* color: rgb(150, 150, 150); */
        font-size: 26rpx;
    }
    .del_beChoosen_Image {
        filter: invert(1) !important;
    }
    /* 按钮 */
    .publish {
        filter: invert(1) !important;
    }
}
</style>
