<template>
    <view>
        <!-- pages/testdaka/record/record.wxml -->
        <form @submit="saveRecord">
            <view class="bg">
                <view class="dakatop">
                    <view class="dakatop_box">
                        <image class="dakatop_box_image" src="/static/pages/testdaka/images/renwu.png"></image>
                        <input name="task" class="dakatop_box_input" type="text" placeholder="请输入打卡任务" placeholder-class="dakatop_box_input_placeholder" />
                    </view>
                    <view class="dakatop_box1">
                        <image class="dakatop_box2_image" src="/static/pages/testdaka/images/dakatime.png"></image>
                        <view class="dakatop_box2_input">
                            <view class="dakatop_box2_input_left">
                                <picker mode="time" name="startTime" :value="starttime" @change="bindstattimeChange">
                                    <view class="picker" placeholder="请输入开始时间">{{ starttime }}</view>
                                </picker>
                            </view>

                            <image class="dakatop_box2_input_image" src="/static/pages/testdaka/images/start_end.png"></image>

                            <view class="dakatop_box2_input_rigt">
                                <picker mode="time" name="endTime" :value="endtime" @change="bindendtimeChange">
                                    <view class="picker2" placeholder="请输入结束时间">{{ endtime }}</view>
                                </picker>
                            </view>
                        </view>
                    </view>
                    <view class="dakatop_box2">
                        <image class="dakatop_cycle_image" src="/static/pages/testdaka/images/cycle.png"></image>
                        <!-- <input class="dakatop_box_input" type="text" placeholder="请选择周期"></input> -->
                        <view class="dakatop_box2_cycle">
                            <checkbox-group class="dakatop_box2_cycle_checkbox" name="cycle">
                                <label class="checkboxcycle" v-for="(item, index) in cycleitems" :key="index">
                                    <checkbox class="checkboxcycle" :value="item.value">{{ item.name }}</checkbox>
                                </label>
                            </checkbox-group>
                        </view>
                    </view>
                </view>
                <view class="dakacenter">
                    <view class="dakatop_box">
                        <image class="dakatop_box_image" src="/static/pages/testdaka/images/biaoqian.png"></image>
                        <!-- 选择标签 -->
                        <view class="dakatop_box_input_2">
                            <picker @change="bindPickerChange" name="lable1" :value="index" :range="array">
                                <view :class="bqshuru == 0 ? 'meibq' : 'bqpicker'">
                                    {{ qxbq }}
                                </view>
                            </picker>
                        </view>
                        <!-- <image class="dakacenter_tag_image" src="../images/add.png"></image>
        <image class="dakacenter_tag_image2" src="../images/selet.png"></image> -->
                    </view>
                    <view class="dakacenter_buttom">
                        <view class="dakacenter_buttom_topbox">
                            <image class="dakacenter_buttom_topbox_right" src="/static/pages/testdaka/images/hotrank.png"></image>
                            <view class="dakacenter_buttom_topbox_left">标签热度榜</view>
                        </view>
                        <view class="dakacenter_buttom_buttombox">
                            <view :data-id="index" :class="'checkbox' + (item.checked ? 'checkedActive' : '')" @tap="userCheck" v-for="(item, index) in items" :key="index">
                                {{ item.value }}
                            </view>
                        </view>
                    </view>
                </view>
                <view class="dakaconfirm"><button class="dakaconfirm_button_abc" formType="submit">确定</button></view>
                <!-- <button class="dakaconfirmabc" formType="submit">确定</button> -->
                <view class="dakacancel" @tap="cancel">取消</view>
            </view>
        </form>
    </view>
</template>

<script>
//开发者需注意：假如测试的时候把所对应的任务的在daka_status表里所对应的数据删除后，会出现bug打不了卡。但页面上仍有（因为渲染是根据daka_record表渲染的）
// 原理分析：打卡会操作daka_status表，删了会空指针报错
const _ = wx.cloud.database().command;
const db = wx.cloud.database();

const util = require('../../../utils/util');

export default {
    data() {
        return {
            starttime: '输入开始时间',

            //这个用户输入的开始时间，下面那个是结束时间
            endtime: '输入结束时间',

            cycleitems: [
                // { name: '每天', value: 'Everyday' },
                {
                    name: '周一',
                    value: '周一'
                },
                {
                    name: '周二',
                    value: '周二'
                },
                {
                    name: '周三',
                    value: '周三'
                },
                {
                    name: '周四',
                    value: '周四'
                },
                {
                    name: '周五',
                    value: '周五'
                },
                {
                    name: '周六',
                    value: '周六'
                },
                {
                    name: '周日',
                    value: '周日'
                }
            ],

            bqshuru: 0,
            array: ['学习', '工作', '阅读', '思考', '运动'],
            qxbq: '请点击选择标签',

            objectArray: [
                {
                    id: 0,
                    name: '请点击选择标签'
                },
                {
                    id: 1,
                    name: '学习'
                },
                {
                    id: 2,
                    name: '工作'
                },
                {
                    id: 3,
                    name: '阅读'
                },
                {
                    id: 4,
                    name: '思考'
                },
                {
                    id: 5,
                    name: '运动'
                }
            ],

            index: 0,

            items: [
                {
                    value: '四级'
                },
                {
                    value: '六级'
                },
                {
                    value: '跑步'
                },
                {
                    value: '篮球'
                }
            ],

            lable2: '',
            len: '',
            mydata: {}
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        uni.setNavigationBarTitle({
            title: 'We打卡'
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
        // this.saveRecord()
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
        bindPickerChange(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value);
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
                });
                console.log('bqshuru:', this.bqshuru);
            } else {
                console.log('erro!!!');
            }
        },

        userCheck: function (e) {
            //热榜标签复选框
            let index = e.currentTarget.dataset.id; //获取用户当前选中的索引值

            let checkBox = this.items;

            if (checkBox[index].checked) {
                this.items[index].checked = false;
            } else {
                this.items[index].checked = true;
            }

            this.setData({
                items: this.items
            });
            var reduArr = new Array(); //返回用户选中的值

            let value = checkBox.filter((item, index) => {
                if (item.checked == true) {
                    reduArr.push(item.value);
                }
            });
            this.lable2 = reduArr;
            console.log(reduArr);
        },

        bindstattimeChange: function (e) {
            //用户输入开始时间传参
            console.log('用户输入开始时间，携带值为', e.detail.value);
            this.setData({
                starttime: e.detail.value
            });
        },

        bindendtimeChange: function (e) {
            //用户结束开始时间传参
            console.log('用户输入结束时间，携带值为', e.detail.value);
            this.setData({
                endtime: e.detail.value
            });
        },

        //生成一个活着都不会出现重复的一大串字符
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
        },

        //节流
        saveRecord: util.throttle(function (res) {
            console.log(res);
            this.saveRecord_last(res);
        }, 500),

        async saveRecord_last(res) {
            console.log(res);
            let username = uni.getStorageSync('args').username;
            await db
                .collection('daka_record')
                .where({
                    username: username,
                    is_delete: false
                })
                .get()
                .then((res) => {
                    this.setData({
                        len: res.data.length
                    });
                })
                .catch((err) => {
                    uni.showToast({
                        title: '网络请求失败',
                        icon: 'none'
                    });
                });
            let len = this.len;
            console.log(len);
            var value = res[0].detail.value;
            console.log(value);
            let { cycle, endTime, lable1, startTime, task } = value;

            if (!task) {
                uni.showToast({
                    title: '任务不能为空~',
                    icon: 'none',
                    duration: 1000
                });
            } else if (task.length >= 8) {
                uni.showToast({
                    title: '任务名字不能过长噢~最多7个字',
                    icon: 'none',
                    duration: 1000
                });
            } else if (startTime == '输入开始时间') {
                uni.showToast({
                    title: '请选择您的开始时间~',
                    icon: 'none',
                    duration: 1000
                });
            } else if (endTime == '输入结束时间') {
                uni.showToast({
                    title: '请选择您的结束时间~',
                    icon: 'none',
                    duration: 1000
                });
            } else if (cycle.length == 0) {
                uni.showToast({
                    title: '打卡周期不能为空~',
                    icon: 'none',
                    duration: 1000
                });
            } else if (!lable1) {
                uni.showToast({
                    title: '请选择您的标签~',
                    icon: 'none',
                    duration: 1000
                });
            } else if (len >= 10) {
                uni.showToast({
                    title: '最多创建10个打卡噢，请返回删除多余打卡~',
                    icon: 'none',
                    duration: 1000
                });
            } else {
                uni.showLoading({
                    title: '提交数据中',
                    //防触摸
                    //防止一段时间内请求多次
                    mask: true
                }); // 获取学号

                console.log(res);
                let username = uni.getStorageSync('args').username; //给周期变中文名

                var cycleChinese = [];

                for (var i = 0; i < cycle.length; i++) {
                    cycleChinese.push(cycle[i]);
                } //获取lable1的真实值

                var realLable1;

                switch (value.lable1) {
                    case '0':
                        realLable1 = '未选择任何标签';

                    case '1':
                        realLable1 = '学习';

                    case '2':
                        realLable1 = '工作';

                    case '3':
                        realLable1 = '阅读';

                    case '4':
                        realLable1 = '思考';

                    case '5':
                        realLable1 = '运动';
                }

                var uid = this.guid(); //存入打卡任务记录表

                wx.cloud.callFunction({
                    name: 'daka',
                    data: {
                        type: 'save_dakaRecord',
                        task: value.task,
                        //
                        // 标签可以为空
                        lable1: realLable1,
                        lable2: this.lable2,
                        cycle: cycleChinese,
                        //
                        startTime: value.startTime,
                        //
                        endTime: value.endTime,
                        //
                        username: username,
                        hashId: this.hash(username + value.task + uid),
                        isDaka: false,
                        is_delete: false,
                        count: 0
                    },
                    success: (res) => {
                        console.log('add', res);
                        uni.showToast({
                            duration: 4000,
                            title: '添加成功'
                        });
                        var pages = getCurrentPages();
                        var prevPage = pages[pages.length - 2];
                        prevPage.setData({
                            mydata: {
                                count: 0,
                                task_name: value.task,
                                task_cycle: cycleChinese,
                                //
                                task_start_time: value.startTime,
                                //
                                task_end_time: value.endTime,
                                //
                                task_isDaka: false,
                                task_hashId: this.hash(username + value.task + uid)
                            }
                        });
                        uni.navigateBack({
                            delta: 1
                        });
                    },
                    fail: (err) => {
                        uni.showToast({
                            icon: 'none',
                            title: '出错啦！请稍后重试'
                        });
                        console.error;
                    }
                }); // .then(res=>{
                //   console.log(res);
                //   wx.hideLoading();
                // })
                //  .then(res=>{
                //   var pages = getCurrentPages()
                //   var prevPage = pages[pages.length - 2]
                //   prevPage.setData({
                //     mydata: {
                //         count:0,
                //         task_name:value.task,
                //         task_cycle: cycleChinese,//
                //         task_start_time: value.startTime,//
                //         task_end_time: value.endTime,//
                //         task_isDaka:false,
                //         task_hashId:this.hash(username+value.task+uid),
                //     }
                //   })
                //   wx.navigateBack({
                //     delta: 1
                //   })
                // })
            }
        },

        cancel() {
            uni.navigateBack({
                delta: 1
            });
        }
    }
};
</script>
<style>
page {
    background-color: #f4f4f4;
}
.bg {
    background-color: #f4f4f4;
    /* height:1450rpx; */
    height: 100vh;
    width: 100%;
    position: relative;
}
.dakatop {
    width: 690rpx;
    height: 500rpx;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 0rpx 30rpx 20rpx 30rpx;
    position: relative;
    top: 40rpx;
}
.dakatop_box {
    width: 630rpx;
    height: 151.3rpx;
    display: flex;
    margin-left: 30rpx;
    border-bottom: 2rpx solid #e5e5e5;
}
.dakatop_box1 {
    width: 630rpx;
    height: 151.3rpx;
    /* background: yellow; */
    position: absolute;
    top: 151.3rpx;
    left: 30rpx;
    border-bottom: 2rpx solid #e5e5e5;
}
.dakatop_box2 {
    width: 630rpx;
    height: 192.3rpx;
    /* background: yellow; */
    position: absolute;
    top: 303rpx;
    left: 30rpx;
}
.dakatop_box_image {
    float: left;
    width: 12.7%;
    height: 56rpx;
    width: 56rpx;
    padding: 47.65rpx 0 47.65rpx 30rpx;
}
.dakatop_box_input {
    float: left;
    margin: 53rpx auto 53rpx 30rpx;
    font-size: 31rpx;
    font-weight: 500;
}
.dakatop_box2_image {
    float: left;
    width: 12.7%;
    height: 56rpx;
    width: 56rpx;
    padding: 47.5rpx 0 30rpx 30rpx;
}
.dakatop_box2_input {
    float: left;
    width: auto;
    height: 100%;
    padding-left: 35rpx;
}
.dakatop_box2_input_left {
    float: left;
    width: 39.5%;
    padding: 50.65rpx 0;
}
.dakatop_box2_input_image {
    float: left;
    width: 19%;
    height: 26rpx;
    width: 50rpx;
    padding: 62.6rpx 23rpx;
}
.dakatop_box2_input_rigt {
    float: left;
    width: 40.5%;
    padding: 50.65rpx 0;
}
.picker {
    border: 2rpx solid #cccccc;
    height: 50rpx;
    width: 190rpx;
    float: right;
    font-size: 24rpx;
    font-weight: 400;
    text-align: center;
    line-height: 50rpx;
}
.picker2 {
    border: 2rpx solid #cccccc;
    height: 50rpx;
    width: 190rpx;
    font-size: 24rpx;
    font-weight: 400;
    text-align: center;
    line-height: 50rpx;
}
.dakatop_cycle_image {
    float: left;
    width: 12.7%;
    height: 56rpx;
    width: 56rpx;
    padding: 67.5rpx 0 67.5rpx 30rpx;
}
.dakatop_box2_cycle_checkbox {
    width: 110%;
}
.dakatop_box2_cycle {
    float: left;
    width: 80%;
    margin: 45rpx auto auto 16rpx;
    font-size: 27.9rpx;
    font-weight: 500;
}
.checkboxcycle {
    /* transform: scale(0.9,0.9); 宽，高 */
    zoom: 0.9;
    padding: 11rpx 10rpx;
}
checkbox .wx-checkbox-input {
    border-radius: 50%; /* 圆角 */
    width: 46rpx; /* 背景的宽 */
    height: 46rpx; /* 背景的高 */
}
/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked {
    border: 1rpx solid #74d5d3;
    background: #74d5d3;
}
/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
    border-radius: 50%; /* 圆角 */
    width: 40rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
    height: 40rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
    line-height: 40rpx;
    text-align: center;
    font-size: 30rpx; /* 对勾大小 30rpx */
    color: #fff; /* 对勾颜色 白色 */
    background: transparent;
    transform: translate(-50%, -50%) scale(1);
    -webkit-transform: translate(-50%, -50%) scale(1);
}
.dakacenter {
    width: 690rpx;
    height: 302.6rpx;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 0rpx 30rpx 20rpx 30rpx;
    position: relative;
    top: 40rpx;
}
.dakacenter_tag_image {
    float: left;
    height: 38rpx;
    width: 38rpx;
    padding: 54rpx 30rpx 50rpx 0;
}
.dakacenter_tag_image2 {
    float: left;
    height: 38rpx;
    width: 38rpx;
    padding: 54rpx 30rpx 50rpx 0;
}
.dakacenter_buttom {
    width: 630rpx;
    height: 151.3rpx;
    position: relative;
    left: 30rpx;
}
.dakacenter_buttom_topbox {
    position: relative;
    width: 100%;
    height: 50%;
}
.dakacenter_buttom_topbox_right {
    position: absolute;
    left: 1rpx;
    float: left;
    width: 31rpx;
    height: 38rpx;
    margin: 35.5rpx 0rpx auto 32rpx;
}
.dakacenter_buttom_topbox_left {
    position: absolute;
    left: 64rpx;
    float: left;
    font-size: 29rpx;
    font-weight: 400;
    width: auto;
    margin: 37rpx auto auto 12rpx;
}
.dakaconfirm {
    width: 600rpx;
    height: 80rpx;
    background: #74d5d3;
    border-radius: 40rpx;
    position: absolute;
    top: 925rpx;
    right: 80rpx;
}
.dakaconfirm_button {
    width: 100%;
    height: 100%;
    text-align: center;
    background: #74d5d3;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: 500;
    box-sizing: border-box;
}
.dakacancel {
    width: 600rpx;
    height: 80rpx;
    border: 2rpx solid #f77a7a;
    border-radius: 40rpx;
    position: absolute;
    top: 1045rpx;
    right: 80rpx;
    text-align: center;
    line-height: 80rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #f77a7a;
}
.dakacenter_buttom_buttombox {
    width: 550rpx;
    height: 50%;
    position: absolute;
    left: 80rpx;
}
.checkbox {
    display: inline-block;
    padding: 5rpx 10rpx 6rpx 10rpx;
    background: #eee;
    border-radius: 4px;

    padding: 5rpx 10rpx 6rpx 10rpx;
    margin: 10rpx auto auto 30rpx;
    font-weight: 500;
    font-size: 25rpx;
}
.checkboxcheckedActive {
    display: inline-block;
    padding: 5rpx 10rpx 6rpx 10rpx;
    background: #eee;
    border-radius: 4px;
    background: #f77a7a;
    color: #fff;

    margin: 10rpx auto auto 30rpx;
    font-weight: 500;
    font-size: 25rpx;
}
.dakatop_box_input_2 {
    float: left;
    width: auto;
    margin: 53rpx auto 53rpx 30rpx;
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

.dakaconfirm_button_abc {
    width: 600rpx;
    height: 100%;
    text-align: center;
    background: #74d5d3;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: 500;
    box-sizing: border-box;
    size: 100%;
    border-radius: 40rpx;
}
button:not([size='mini']) {
    margin-left: auto;
    margin-right: auto;
    width: 600rpx;
}
@media (prefers-color-scheme: dark) {
    .dakacancel {
        filter: invert(1) !important;
        color: gray;
        /* #74D5D3; */
        border: 2rpx solid gray;
    }
    /* #74D5D3 绿*/
    /* #F77A7A 红*/
    checkbox .wx-checkbox-input.wx-checkbox-input-checked {
        filter: invert(1) !important;
        border: 1rpx solid rgb(172, 211, 254);
        background: rgb(172, 211, 254);
        color: #fff;
    }
    .dakatop_box_input_placeholder {
        color: gray;
    }
    .dakaconfirm_button_abc {
        filter: invert(90%) !important;
        background: rgb(172, 211, 254);
    }
    .dakatop_box_input {
        filter: invert(1) !important;
        color: white;
        /* caret-color: red; */
    }
    checkbox .wx-checkbox-input {
        filter: invert(1) !important;
        background: gray;
    }
    .dakatop_box_image,
    .dakatop_box2_image,
    .dakatop_cycle_image {
        filter: invert(30%) !important;
    }
    .dakacenter_buttom_topbox_right {
        filter: invert(70%) !important;
    }
    .checkboxcheckedActive {
        filter: invert(90%) !important;
    }
    /* .dakatop_box_input{
        color: black;
    } */
}
</style>
