<template>
    <view>
        <!-- <wxs src="time.wxs" module="tools"></wxs> -->
        <!-- 开始比赛 -->
        <view class="wrap" v-if="html == 0">
            <view class="match_caption">社团比赛</view>
            <form @submit="subMatch">
                <view class="match_list_wrap" v-for="(item, index) in content.question" :key="index">
                    <!-- 单选盒子 -->

                    <view class="dan_wrap" v-if="item.type == '单选'">
                        <view class="match_title">{{ index + 1 }}.{{ item.title }}{{ item.must == true ? '(必填)' : '' }}</view>
                        <view class="chang_item">
                            <radio-group :name="item.title">
                                <label class="weui_cell" v-for="(item, index1) in item.arr" :key="index1">
                                    <view class="weui_cell__hd">
                                        <radio :value="item" />
                                    </view>

                                    <view class="weui_cell__bd">{{ item }}</view>
                                </label>
                            </radio-group>
                        </view>
                    </view>

                    <!-- 多选盒子 -->

                    <view class="dan_wrap" v-if="item.type == '多选'">
                        <view class="match_title">{{ index + 1 }}.{{ item.title }}{{ item.must == true ? '(必填)' : '' }}</view>
                        <view class="chang_item">
                            <checkbox-group :name="item.title">
                                <label class="weui_cell" v-for="(item, index1) in item.arr" :key="index1">
                                    <view class="weui_cell__hd">
                                        <checkbox :value="item" :checked="item.checked" />
                                    </view>

                                    <view class="weui_cell__bd">{{ item }}</view>
                                </label>
                            </checkbox-group>
                        </view>
                    </view>

                    <!-- 填空盒子 -->

                    <view class="tian_wrap" v-if="item.type == '填空'">
                        <view class="tian_title">{{ index + 1 }}.{{ item.title }}{{ item.must == true ? '(必填)' : '' }}</view>
                        <textarea class="handle" :name="item.title"></textarea>
                    </view>

                    <!-- <button class="submit">提交</button> -->
                </view>
                <button class="submit" form-type="submit">提交</button>
            </form>
        </view>
        <!-- 信息展示 -->
        <view v-if="html == 1">
            <!-- 顶部轮播 -->
            <swiper
                :indicator-dots="true"
                indicator-color="rgba(223, 223, 223, 0.39)"
                indicator-active-color="rgb(235, 21, 21)"
                :style="'height: ' + (content.ShowHeight > 300 ? 700 + 'rpx' : content.ShowHeight + 'px') + ';'"
            >
                <block class="photo" v-for="(item, index) in content.AllPhoto" :key="item.Photo">
                    <swiper-item>
                        <image :src="item" mode="aspectFill" style="z-index: 11" @tap="ShowImg" class="ShowImg" :data-index="index" />
                    </swiper-item>
                </block>
            </swiper>
            <!-- 信息详情 -->
            <view class="match_wrap">
                <view class="match_caption">主办信息</view>
                <view class="match_list_wrap">
                    <view class="list">
                        <view class="title">社团</view>
                        <view class="content">{{ content.assoMess.association }}</view>
                    </view>
                    <view class="list">
                        <view class="title">负责人</view>
                        <view class="content">{{ content.assoMess.name }}</view>
                    </view>
                    <view class="list">
                        <view class="title">联系方式</view>
                        <view class="content">{{ content.assoMess.phone }}</view>
                    </view>
                </view>
            </view>
            <!-- 比赛信息 -->
            <view class="rule_wrap">
                <view class="rule_caption">比赛信息</view>
                <view class="rule_list_wrap">
                    <view class="rule_list">
                        <view class="rule_title">标题</view>
                        <view class="rule_detail">{{ content.Title }}</view>
                    </view>
                    <view class="rule_list">
                        <view class="rule_title">详情</view>
                        <text class="rule_detail">{{ content.Text }}</text>
                    </view>
                </view>
            </view>
            <!-- 报名按钮 -->
            <view
                class="bt_wrap"
                :style="matchStatus == false ? 'background-color: #4d4d4d;' : tools.getDateTime(time, date) > 0 ? 'background-color: #63A1A0' : 'background-color: #6f8569'"
                @tap="parseEventDynamicCode($event, matchStatus == false ? 'matched' : tools.getDateTime(time, date) > 0 ? 'timeOut' : 'clickme')"
            >
                <view class="bt">{{ matchStatus == false ? '您已参与' : tools.getDateTime(time, date) > 0 ? '已截止' : '立即报名' }}</view>
            </view>
        </view>
        <!-- 报名弹窗 -->
        <view class="commodity_screen" @tap="hideModal" v-if="showModalStatus"></view>
        <!-- 弹出框 -->
        <view :animation="animationData" class="commodity_attr_box" v-if="showModalStatus">
            <view class="sing_title">信息填写</view>
            <form @submit="submitMess">
                <view class="input_wrap" v-for="(item, index) in formMess" :key="index">
                    <view class="input_title">{{ item.title }}</view>

                    <input :placeholder="item.placeholder" class="input_content" :name="item.name" />
                </view>
                <!-- 提示 -->
                <view class="tip_wrap">*以上信息用于主办方登记，请如实填写</view>
                <!-- 提交按钮 -->
                <button class="bt" form-type="submit">提交</button>
            </form>
        </view>
    </view>
</template>

<script>
// pages/more/pages/Match/Match.js
let count = '';
const db = wx.cloud.database();
export default {
    data() {
        return {
            showModalStatus: false,

            formMess: [
                {
                    title: '姓名',
                    placeholder: '输入姓名',
                    name: '姓名'
                },
                {
                    title: '学号',
                    placeholder: '输入学号',
                    name: '学号'
                },
                {
                    title: '性别',
                    placeholder: '输入有效性别',
                    name: '性别'
                },
                {
                    title: '班级',
                    placeholder: '如:生工20-3',
                    name: '班级'
                },
                {
                    title: '校区',
                    placeholder: '如无分校则不填',
                    name: '校区'
                }
            ],

            html: 1,

            content: {
                question: [],
                ShowHeight: 0,
                AllPhoto: [],

                assoMess: {
                    association: '',
                    name: '',
                    phone: ''
                },

                Title: '',
                Text: ''
            },

            matchStatus: false,

            //false不能参与  true能参与
            time: Date.now(),

            animationData: ''
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let jsonStr = decodeURIComponent(options.content);
        var content = JSON.parse(jsonStr); // 将JSON帖子信息转成对象

        this.setData({
            content
        });
        let args = uni.getStorageSync('args');
        count = args.username; // 比赛状态

        this.judgeMatch(count, content.match_id); //查询点击状态

        wx.cloud
            .callFunction({
                name: 'associationSend',
                data: {
                    type: 4,
                    username: count,
                    _id: content._id
                }
            })
            .then((res) => {
                // console.log(res);
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
        // 验证是否已经参三
        judgeMatch(count, _id) {
            db.collection('assoMatchPush')
                .where({
                    match_id: _id,
                    pusherCount: count
                })
                .get()
                .then((res) => {
                    if (res.data.length == 0) {
                        this.setData({
                            matchStatus: true
                        });
                    } else {
                        this.setData({
                            matchStatus: false
                        });
                    }
                });
        },

        // 已参与
        matched() {
            uni.showToast({
                title: '您已参与',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {}
            });
        },

        // 弹窗
        //点击我显示底部弹出框
        clickme: function () {
            // this.showModal();
            // this.submitMess()
            uni.showLoading({
                title: '加载中',
                mask: true,
                success: (result) => {
                    this.setData({
                        html: 0
                    });
                    uni.hideLoading();
                }
            });
        },

        // 已截止
        timeOut() {
            uni.showToast({
                title: '已截止',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {}
            });
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

        // 提交表单
        submitMess(e) {
            // 效验信息-->保存信息
            // let data = e.detail.value
            // if (!data.班级 || !data.学号 || !data.姓名 || !data.性别) {
            //   wx.showToast({
            //     title: '请检查信息完整',
            //     icon: 'none',
            //     image: '',
            //     duration: 1500,
            //     mask: false,
            //     success: (result) => {
            //     },
            //   });
            // }
            // else {
            uni.showLoading({
                title: '加载中',
                mask: true,
                success: (result) => {
                    // this.hideModal()
                    this.setData({
                        // userMess: data,
                        html: 0
                    });
                    uni.hideLoading();
                }
            }); // }
        },

        // 提交答案
        subMatch(e) {
            let matchDetail = e.detail.value;
            let that = this;
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
                                let res = this.testMust(that.content.question, matchDetail);

                                if (res == true) {
                                    let data = that;
                                    wx.cloud
                                        .callFunction({
                                            name: 'associationSend',
                                            data: {
                                                type: 5,
                                                userMess: data.userMess,
                                                matchDetail: matchDetail,
                                                assoName: data.content.assoMess.association,
                                                assoCount: data.content.assoMess.card,
                                                pusherCount: count,
                                                CampusCircle_id: data.content._id,
                                                index: data.content.assoMess.card,
                                                match_id: data.content.match_id
                                            }
                                        })
                                        .then((res) => {
                                            console.log(res);
                                            uni.showToast({
                                                title: '提交成功',
                                                icon: 'none',
                                                image: '',
                                                duration: 1500,
                                                mask: false,
                                                success: (result) => {
                                                    uni.navigateBack({
                                                        delta: 1
                                                    });
                                                }
                                            });
                                        });
                                } else {
                                    uni.hideLoading({});
                                }
                            }
                        });
                    }
                }
            }); // console.log(e);
        },

        ShowImg(e) {
            var Photo = this.content.AllPhoto;
            var index = e.target.dataset.index;
            uni.previewImage({
                current: Photo[index],
                urls: Photo
            });
        },

        testMust(question, matchDetail) {
            let len = question.length;
            let i = 0;

            while (i < len) {
                let key = question[i].title;

                if (question[i].must == true && (matchDetail[key] == '' || matchDetail[key].length == 0)) {
                    uni.showModal({
                        title: '提示',
                        content: key + '必填',
                        success: (res) => {}
                    });
                    break;
                }

                i++;
            }

            if (i == len) {
                return true;
            }
        }
    }
};
</script>
<style>
page {
    background-color: #f6f6f6;
}
.wrap {
    font-size: 32rpx;
    padding: 24rpx;
}
.wrap .match_caption {
    text-align: center;
    color: #63a1a0;
    font-weight: 700;
}
.wrap .match_list_wrap .dan_wrap {
    padding-top: 12rpx;
}
.wrap .match_list_wrap .dan_wrap .chang_item .weui_cell {
    display: flex;
    flex-direction: row;
    padding-top: 8rpx;
}
.wrap .match_list_wrap .dan_wrap .chang_item .weui_cell .weui_cell__hd {
    zoom: 0.6;
    padding-top: 8rpx;
}
.wrap .match_list_wrap .dan_wrap .chang_item .weui_cell .weui_cell__bd {
    padding-left: 8rpx;
}
.wrap .match_list_wrap .tian_wrap {
    padding-top: 12rpx;
}
.wrap .match_list_wrap .tian_wrap .handle {
    background-color: #8181813f;
    height: 120rpx;
    margin-top: 12rpx;
    border-radius: 12rpx;
    padding: 8rpx;
    width: 98%;
}
.wrap .submit {
    background-color: #63a1a0;
    font-size: 32rpx;
    margin-top: 24rpx;
    border-radius: 28rpx;
    color: white;
}
swiper {
    text-align: center;
}
.match_wrap {
    display: flex;
    padding: 24rpx;
    margin: 24rpx;
    font-size: 32rpx;
    border-radius: 24rpx;
    flex-direction: column;
    background-color: white;
}
.match_wrap .match_caption {
    text-align: center;
    color: #63a1a0;
    font-weight: 700;
}
.match_wrap .match_list_wrap {
    padding-top: 12rpx;
}
.match_wrap .match_list_wrap .list {
    display: flex;
    flex-direction: row;
    padding-top: 12rpx;
}
.match_wrap .match_list_wrap .list .title {
    flex: 1;
}
.match_wrap .match_list_wrap .list .content {
    flex: 3;
    background-color: #f0f0f0;
    padding: 6rpx;
    padding-left: 12rpx;
    border-radius: 12rpx;
}
.rule_wrap {
    display: flex;
    padding: 24rpx;
    margin: 24rpx;
    font-size: 32rpx;
    border-radius: 24rpx;
    flex-direction: column;
    background-color: white;
}
.rule_wrap .rule_caption {
    text-align: center;
    color: #63a1a0;
    font-weight: 700;
}
.rule_wrap .rule_list_wrap {
    padding-top: 12rpx;
}
.rule_wrap .rule_list_wrap .rule_list {
    display: flex;
    flex-direction: row;
    padding-top: 12rpx;
}
.rule_wrap .rule_list_wrap .rule_list .rule_title {
    flex: 1;
}
.rule_wrap .rule_list_wrap .rule_list .rule_detail {
    flex: 3;
    background-color: #f0f0f0;
    padding: 6rpx;
    padding-left: 12rpx;
    border-radius: 12rpx;
}
.bt_wrap {
    display: flex;
    margin: 42rpx;
    font-size: 32rpx;
    justify-content: center;
    background-color: #6f8569;
    margin-right: 20%;
    margin-left: 20%;
    border-radius: 32rpx;
    padding: 16rpx;
}
.bt_wrap .bt {
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
    width: 100%;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2000;
    background: #fff;
    padding-top: 20rpx;
    font-size: 32rpx;
    border-radius: 24rpx;
}
.commodity_attr_box .sing_title {
    text-align: center;
    padding: 12rpx;
    color: #63a1a0;
    font-weight: 700;
}
.commodity_attr_box .input_wrap {
    display: flex;
    flex-direction: column;
    padding-left: 24rpx;
    padding-top: 8rpx;
}
.commodity_attr_box .input_wrap .input_title {
    padding: 12rpx;
}
.commodity_attr_box .input_wrap .input_content {
    border: 1rpx solid #4b4b4b;
    border-radius: 12rpx;
    padding: 12rpx;
    margin-right: 24rpx;
}
.commodity_attr_box .tip_wrap {
    font-size: 24rpx;
    color: #63a1a0;
    padding: 24rpx;
}
.commodity_attr_box .bt {
    background-color: #63a1a0;
    color: white;
    font-size: 32rpx;
    margin-bottom: 24rpx;
    border-radius: 28rpx;
}
@media (prefers-color-scheme: dark) {
    input {
        filter: invert(100%) !important;
        color: white;
    }
}
</style>
