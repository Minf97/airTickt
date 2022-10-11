<template>
    <view>
        <view class="info">
            <view class="create_RoomName">
                <view class="txt">自习室名称*</view>
                <view class="roomName">
                    <input type="text" placeholder="请输入自习室名称" :value="roomName" @input="write_Txt" id="name" />
                </view>
            </view>
            <view class="create_RoomBrief">
                <view class="txt">自习室简介</view>
                <view class="roomBrief">
                    <input type="text" placeholder="请输入自习室简介" :value="roomBrief" @input="write_Txt" id="Brief" />
                </view>
            </view>
            <view class="choose_RoomNmu">
                <view class="txt">人数限制</view>
                <view class="roomNmu">
                    <radio-group @change="radioChange">
                        <label class="label" v-for="(item, index) in numLimit" :key="item.value">
                            <view class="labe_Left">
                                <radio :value="item.value" :checked="true" />
                            </view>

                            <view class="label_Right">{{ item.name }}</view>
                        </label>
                    </radio-group>
                </view>
            </view>
            <view class="choose_RoomLabel">
                <view class="txt">自习室标签</view>
                <view class="RoomLabel">
                    <image class="label_image"></image>
                    <!-- 选择标签 -->
                    <view class="label_input">
                        <picker @change="bindPickerChange" name="lable1" :value="index" :range="array">
                            <view :class="bqshuru == 0 ? 'meibq' : 'bqpicker'">
                                {{ qxbq }}
                            </view>
                        </picker>
                    </view>
                    <view class="line"></view>
                </view>
            </view>
            <view class="choose_RoomPic">
                <view class="txt">选择照片</view>
                <view class="roomPic" @tap="browse">
                    <image class="Pic" :src="aimgurl"></image>
                </view>
            </view>
        </view>
        <view class="btn">
            <view class="btn_create" @tap="Save_and_Create">创建</view>
            <view class="cancel" @tap="cancel">取消</view>
        </view>
    </view>
</template>

<script>
// pages/roomCreate/roomCreate.js
const db = wx.cloud.database();
export default {
    data() {
        return {
            roomNum: 20,

            //人数限制
            qxbq: '请点击选择标签',

            //标签
            aimgurl: '',

            // //临时图片的路径
            bqshuru: 0,

            array: ['学习', '运动', '娱乐', '日常', '游戏', '其他'],
            countIndex: 1,

            // 可选图片剩余的数量
            imageData: [],

            // 所选上传的图片数据
            numLimit: [
                {
                    value: '5',
                    name: '5人'
                },
                {
                    value: '10',
                    name: '10人'
                },
                {
                    value: '15',
                    name: '15人'
                },
                {
                    value: '20',
                    name: '20人'
                }
            ],

            args: '',
            roomBrief: '',
            roomName: '',
            isupdate: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let args = uni.getStorageSync('args');
        this.setData({
            args
        });
    },
    methods: {
        write_Txt(e) {
            if (e.target.id == 'Brief') {
                this.setData({
                    roomBrief: e.detail.value
                });
            } else {
                this.setData({
                    roomName: e.detail.value
                });
            }
        },

        radioChange(e) {
            //console.log('radio发生change事件，携带value值为：', e.detail.value)
            this.setData({
                roomNum: e.detail.value
            }); //console.log(this.data.roomNum)
        },

        bindPickerChange(e) {
            //console.log('picker发送选择改变，携带值为', e.detail.value)
            let array = this.array;
            let index = e.detail.value;
            this.setData({
                index,
                qxbq: array[index]
            });
            let index1 = this.index;

            if (index1 != -1) {
                this.setData({
                    bqshuru: 1
                }); //console.log('bqshuru:',this.data.bqshuru)
            } else {
                console.log('erro!!!');
            }
        },

        /*图片浏览及上传 */
        browse: function (e) {
            let that = this;
            uni.showActionSheet({
                itemList: ['从相册中选择', '拍照'],
                itemColor: '#CED63A',
                success: function (res) {
                    if (!res.cancel) {
                        if (res.tapIndex == 0) {
                            that.chooseWxImage('album');
                        } else if (res.tapIndex == 1) {
                            that.chooseWxImage('camera');
                        }
                    }
                }
            });
        },

        /*打开相册、相机 */
        chooseWxImage: function (type) {
            let that = this;
            uni.chooseImage({
                count: that.countIndex,
                sizeType: ['original', 'compressed'],
                sourceType: [type],
                success: function (res) {
                    // 选择图片后的完成确认操作
                    console.log(res);
                    that.setData({
                        aimgurl: res.tempFilePaths
                    });
                }
            });
        },

        //保存方法
        Save_and_Create() {
            function totast(title) {
                uni.showToast({
                    title: '请输入' + title,
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {}
                });
            }

            if (!this.roomName) {
                totast('自习室名称');
            } else if (!this.roomBrief) {
                totast('简介');
            } else if (!this.index) {
                totast('请点击选择标签');
            } else if (this.aimgurl.length == 0) {
                totast('照片');
            } else {
                uni.showLoading({
                    title: '创建中',
                    mask: true,
                    success: (result) => {
                        let uid = this.guid();
                        let uuid = this.hash(this.args.username + this.roomName + uid);
                        wx.cloud.uploadFile({
                            cloudPath: 'img/' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000),
                            //云储存的路径及文件名
                            filePath: this.aimgurl[0],
                            //要上传的图片/文件路径 这里使用的是选择图片返回的临时地址
                            success: (res) => {
                                let imgUrl = res.fileID;
                                wx.cloud.getTempFileURL({
                                    fileList: [imgUrl],
                                    success: (res) => {
                                        console.log('获取url地址：', res.fileList[0].tempFileURL);
                                        let imghttpUrl = res.fileList[0].tempFileURL;
                                        db.collection('daka_group_member_information').add({
                                            data: {
                                                group_name: this.roomName,
                                                member_name: this.args.nickName,
                                                member_url: this.args.iconUrl,
                                                member_username: this.args.username,
                                                task: [],
                                                time_logs: [],
                                                totalTime: 0,
                                                bgurl: imghttpUrl,
                                                groupIntro: this.roomBrief,
                                                wxname: this.args.nickName,
                                                wxurl: this.args.iconUrl,
                                                uuid
                                            }
                                        });
                                        db.collection('data_group_information')
                                            .add({
                                                data: {
                                                    group_name: this.roomName,
                                                    introduce: this.roomBrief,
                                                    notice: '',
                                                    username: this.args.username,
                                                    uuid,
                                                    wxname: this.args.nickName,
                                                    wxurl: this.args.iconUrl,
                                                    imgUrl: imghttpUrl,
                                                    roomNum: Number(this.roomNum),
                                                    qxbq: this.qxbq,
                                                    creattime: new Date()
                                                }
                                            })
                                            .then((res) => {
                                                var pages = getCurrentPages();
                                                var prevPage = pages[pages.length - 2];
                                                prevPage.setData({
                                                    isupdate: true
                                                });
                                                uni.showToast({
                                                    title: '创建成功',
                                                    icon: 'none',
                                                    image: '',
                                                    duration: 1500,
                                                    mask: false,
                                                    success: (result) => {
                                                        setTimeout(() => {
                                                            uni.navigateBack({
                                                                delta: 1
                                                            });
                                                        }, 1000);
                                                    }
                                                });
                                            });
                                    },
                                    fail: console.error
                                });
                            }
                        });
                    }
                });
            }
        },

        cancel() {
            uni.navigateBack({
                delta: 1
            });
        },

        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0;
                var v = c == 'x' ? r : (r & 3) | 8;
                return v.toString(16);
            });
        },

        hash(input) {
            var I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');
            var hash = 5389;
            var i = input.length - 1;

            if (typeof input == 'string') {
                for (; i > -1; i--) {
                    hash += (hash << 5) + input.charCodeAt(i);
                }
            } else {
                for (; i > -1; i--) {
                    hash += (hash << 5) + input[i];
                }
            }

            var value = hash & 2147483647;
            var retValue = '';

            do {
                retValue += I64BIT_TABLE[value & 63];
            } while ((value >>= 1));

            return retValue;
        }
    }
};
</script>
<style>
/* pages/testdaka/createRoom/createRoom.wxss */
page {
    height: 100%;
    width: 100%;
    background-color: #f4f4f4;
}

.info {
    width: 90%;
    height: 90%;
    margin: 3% 5% 1% 5%;
    background-color: #f4f4f4;
}

.create_RoomName {
    height: 10%;
    width: 100%;
}

.txt {
    font-size: 24rpx;
    font-weight: 400;
}

.roomName {
    margin: 1% 1% 1% 1%;
    border-radius: 25rpx;
    height: 60%;
    width: 98%;
    background-color: #ffffff;
    box-shadow: 20rpx 20rpx 30rpx 0.1rpx rgb(228, 228, 228);
}

.roomName input {
    padding: 1% 1% 1% 1%;
    margin: 0% 5% 2% 5%;
    height: 60%;
    width: 88%;
    border-bottom: 2rpx solid #e5e5e5;
}

.create_RoomBrief {
    margin-top: 1%;
    height: 10%;
    width: 100%;
}

.roomBrief {
    margin: 1% 1% 1% 1%;
    border-radius: 25rpx;
    height: 60%;
    width: 98%;
    background-color: #ffffff;
    box-shadow: 20rpx 20rpx 30rpx 0.1rpx rgb(228, 228, 228);
}

.roomBrief input {
    padding: 1% 1% 1% 1%;
    margin: 0% 5% 2% 5%;
    height: 60%;
    width: 88%;
    border-bottom: 2rpx solid #e5e5e5;
}

.choose_RoomNmu {
    margin-top: 1%;
    height: 10%;
    width: 100%;
}

.roomNmu {
    margin: 1% 1% 1% 1%;
    border-radius: 25rpx;
    height: 60%;
    width: 98%;
    background-color: #ffffff;
    box-shadow: 20rpx 20rpx 30rpx 0.1rpx rgb(228, 228, 228);
}

.roomNmu radio-group {
    width: 92%;
    height: 90%;
    margin: 1% 4% 3% 4%;
    padding-top: 1%;
    display: flex;
    flex-direction: row;
}

.label {
    margin: 1% 20rpx 1% 1%;
    display: flex;
    flex-direction: row;
}

.choose_RoomLabel {
    margin-top: 1%;
    height: 13%;
    width: 100%;
}

.RoomLabel {
    margin: 1% 1% 1% 1%;
    border-radius: 25rpx;
    height: 70%;
    width: 98%;
    background-color: #ffffff;
    box-shadow: 20rpx 20rpx 30rpx 0.1rpx rgb(228, 228, 228);
}

.label_image {
    float: left;
    width: 12.7%;
    height: 56rpx;
    width: 9rpx;
    padding: 3% 1% 0% 3%;
}

.label_input {
    height: 60%;
    width: 98%;
    padding: 4% 0% 1% 1%;
}

.label_input {
    float: left;
    width: auto;
    font-size: 31rpx;
    font-weight: 500;
}

.bqpicker {
    height: 50rpx;
    float: right;
    font-size: 31rpx;
    font-weight: 400;
    line-height: 40rpx;
    width: 300rpx;
}
.meibq {
    height: 50rpx;
    float: right;
    font-size: 31rpx;
    font-weight: 400;
    line-height: 40rpx;
    width: 300rpx;
    color: gray;
}

.line {
    width: 75%;
    height: 1%;
    margin-left: 6%;
    padding-top: 12%;
    border-bottom: 2rpx solid #e5e5e5;
}

.choose_RoomPic {
    margin-top: 1%;
    height: 50%;
    width: 100%;
}

.roomPic {
    margin: 1% 1% 1% 1%;
    border-radius: 25rpx;
    height: 90%;
    width: 98%;
    background-color: #ffffff;
    box-shadow: 20rpx 20rpx 30rpx 0.1rpx rgb(228, 228, 228);
    border-style: outset;
}

.Pic {
    margin: 3% 0% 1% 4%;
    width: 90%;
    height: 90%;
    border-style: inset;
}

.btn {
    width: 90%;
    height: 9%;
    padding-bottom: 10%;
    margin: 1% 5% 1% 5%;
    display: flex;
    flex-direction: row;
}

.btn_create {
    color: #ffffff;
    display: flex;
    background-color: #7c66f5;
    box-shadow: 20rpx 20rpx 30rpx 0.1rpx rgb(228, 228, 228);
    align-items: center;
    justify-content: center;
    border-radius: 25rpx;
    width: 52%;
}

.cancel {
    margin-left: 6%;
    color: #ffffff;
    display: flex;
    background-color: palevioletred;
    box-shadow: 20rpx 20rpx 30rpx 0.1rpx rgb(228, 228, 228);
    align-items: center;
    justify-content: center;
    border-radius: 25rpx;
    width: 52%;
}
</style>
