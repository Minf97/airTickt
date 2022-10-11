<template>
    <view class="edit" v-if="showModelClone">
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
                <view class="MenuDiv" @tap="clickMenu">
                    <span class="rightimg-top">分类:</span>
                    <span class="choosenLabel">
                        {{ choosenLabel }}
                    </span>
                    <scroll-view :scroll-x="true" class="choose_First">
                        <view class="Choosen" :scroll-x="true" v-if="!hideHidden">
                            <view class="Label-text" :data-index="index" @tap.stop.prevent="clickMenuSecond" v-for="(item, index) in menu" :key="index">
                                <view class="Label_limit">{{ item }}</view>
                            </view>
                        </view>
                    </scroll-view>
                </view>
                <view class="Line"></view>
                <view class="edit_pic_Title">
                    <input placeholder="标题 闲聊/求助/组队..." :value="Input_Title" name="formTitle" />
                </view>
                <view class="Line"></view>
                <view class="edit_pic_Text">
                    <textarea placeholder="添加正文" :value="Input_Text" name="formText" maxlength="-1"></textarea>
                </view>
                <view class="edit_Publish">
                    <button @tap="add" class="off-btn" hover-class="btn-hover">取消</button>
                    <button form-type="submit" class="Publish-btn" hover-class="btn-hover">发表内容</button>
                </view>
            </form>
        </view>
    </view>
</template>

<script>
var app = getApp();

class cardFunction {}

export default {
    data() {
        return {
            add_style: '',
            photo: '',
            current: 0,
            choosenLabel: '',
            hideHidden: '',
            menu: [],
            Input_Title: '',
            Input_Text: '',
            showModelClone: ''
        };
    },
    props: {
        showModel: {
            type: String,
            default: ''
        }
    },
    methods: {
        add() {
            var showModel = this.showModel;
            var that = this;

            if (showModel) {
                this.setData({
                    add_style: 'add_hide'
                });
                setTimeout(() => {
                    that.setData({
                        showModelClone: !showModel
                    });
                }, 200);
            } else {
                this.setData({
                    add_style: 'add_show',
                    showModelClone: !showModel
                });
            }
        },

        formSubmit(e) {
            // 2.2 添加与存储 (发布点击事件)
            let { formTitle, formText } = e.detail.value;

            if (!formTitle) {
                uni.showToast({
                    title: '标题不能为空',
                    icon: 'none'
                });
            } else if (!formText) {
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
            } else if (!this.nickname && !this.iconUrl) {
                uni.showToast({
                    title: '小主还没登录哟QwQ',
                    icon: 'none'
                });
            } else {
                let add = {
                    Cover: this.photo[0],
                    AllPhoto: JSON.parse(JSON.stringify(this.photo)),
                    Title: formTitle,
                    Text: formText,
                    CoverHeight: this.imageHeight,
                    CoverWidth: this.imageWidth,
                    Label: this.choosenLabel,
                    Time: new Date().getTime(),
                    nickName: this.nickname,
                    School: this.school,
                    iconUrl: this.iconUrl
                };
                console.log('this.data.nickname-Input', this.nickname);
                this.allList.push(add);
                let NewData = this.allList.length - 1;
                this.CalculateImage(); // 将本地图片上传到云存储，后续通过fileid进行图片展示

                let that = this;

                (function (NewData) {
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
                    var path = that.allList[NewData].AllPhoto;
                    console.log(path);
                    var fileIDs = [];

                    for (var i = 0; i < path.length; i++) {
                        uni.compressImage({
                            src: path[i],
                            // 图片路径
                            quality: 20,

                            // 压缩质量,
                            success(res) {
                                console.log(res);
                                wx.cloud
                                    .uploadFile({
                                        cloudPath: 'CampusCircle_images/' + new Date().getTime() + Math.floor(Math.random() * 150) + '/static/components/publishCards/.png',
                                        filePath: res.tempFilePath
                                    })
                                    .then((res) => {
                                        fileIDs.push(res.fileID);
                                        console.log(fileIDs);
                                        that.uploadData(NewData, fileIDs);
                                    });
                            }
                        });
                    }
                })(NewData);
            }
        },

        chooseimage: function () {
            var that = this;

            if (that.photo.length == 0) {
                uni.chooseImage({
                    count: 2,
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

        // ShowContent: function (e) {
        //   //对数据进行更新
        //   var content = JSON.stringify(this.data.item)
        //   wx.navigateTo({
        //     url: "../../pages/more/pages/DetailContent/DetailContent?content=" + content,
        //   })
        // },
        // //点击事件
        // getStar_card(e) { //--------------------Starif：false:未点赞；true：已点赞
        //   var content = this.data.item
        //   var args = wx.getStorageSync('args')
        //   var Star_User = content.Star_User //初始点赞用户
        //   var openusername = this.properties.openusername
        //   if (!Star_User) { //判断点赞人有没有在数组里面
        //     Star_User = []
        //   }
        //   var Starif = false
        //   //判断是不是为点赞过的usernameid
        //   ///--------------------------------------取消点赞（48-54）
        //   for (var i = 0; i < Star_User.length; i++) {
        //     if (Star_User[i].username == openusername.username) {
        //       Starif = true
        //       Star_User.splice(Star_User.indexOf(Star_User[i]), 1) //改变了 Star_User  --> content.Star_User
        //       break
        //     }
        //   }
        //   if (!Starif) {
        //     openusername.Star_time = new Date().getTime()
        //     Star_User.push(openusername) // 改变了 Star_User
        //     wx.showToast({
        //       title: '点赞成功',
        //       icon: "none"
        //     })
        //   }
        //   var Star_count = Star_User.length
        //   //点赞后对本地数据进行更新
        //   //点赞用户更新
        //   content.Star_User = Star_User
        //   //点赞用户数更新
        //   content.Star = Star_count
        //   let character = { // 处理得到点赞者信息
        //     userName: args.username,
        //     iconUrl: args.iconUrl,
        //     nickName: args.nickName
        //   }
        //   let be_character = { // 被点赞者信息
        //     userName: content.username,
        //     iconUrl: content.iconUrl,
        //     nickName: content.nickName
        //   }
        //   let starTime = new Date().getTime(); // 点赞时间
        //   app.globalData.allList.forEach(e => {
        //     if (e._id === content._id) {
        //       e.Star_count = Star_count
        //       e.Star_User = Star_User
        //     }
        //   })
        //   var that = this
        //   //点赞后对数据库数据进行更新
        //   wx.cloud.callFunction({ // 云函数更改点赞状态
        //     name: "CampusCircle",
        //     data: {
        //       type: "StarControlLogs",
        //       Time: content.Time,
        //       Star: Star_count,
        //       Star_User: Star_User,
        //       character: character,
        //       username: args.username,
        //       be_character: be_character,
        //       be_username: content.username,
        //       createTime: starTime,
        //       arcticle: content,
        //       arcticle_id: content._id,
        //       _id: content._id,
        //       username: args.username
        //     }
        //   }).then( )
        //   that.setData({
        //     item : {
        //       ...that.data.item,
        //       Star: Star_count,
        //     },
        //     Star_User: Star_User,
        //   })
        //   // app.globalData.List = this.data.List
        // },
        // onLazyLoad(info) {},
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

        formReset() {
            console.log('占位：函数 formReset 未声明');
        },

        clickMenu() {
            console.log('占位：函数 clickMenu 未声明');
        },

        clickMenuSecond() {
            console.log('占位：函数 clickMenuSecond 未声明');
        }
    },
    watch: {
        showModel: {
            handler: function (newVal, oldVal) {
                this.showModelClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style></style>
