<template>
    <view>
        <!-- 单选/多选 -->
        <view class="dan_wrap" v-if="type != '填空'">
            <view class="wrap">
                <view class="top_wrap">
                    <view class="title">题目</view>
                    <input placeholder="请输入题目标题" @input="caption" :value="content.title" />
                </view>
                <view class="item_wrap">
                    <view class="item" v-for="(item, index) in content.arrLen" :key="index">
                        <view class="wrap">
                            <input placeholder="选项内容" :data-index="index" @input="inpContent" :value="content.arr[index]" />
                            <view class="delete" @tap="deleteFun" :data-index="index">删除</view>
                        </view>
                    </view>
                    <view class="add_content" @tap="addChange">+添加选项</view>
                </view>
            </view>
            <view class="changMust">
                <view class="title">此题目为必填</view>
                <switch class="changContent" :checked="mustChange" @change="mustChangeFun" />
            </view>
            <view class="bottom_wrap">
                <view class="certain" @tap="certain">保存</view>
            </view>
        </view>
        <!-- 填空类型 -->
        <view class="tian_wrap" v-else>
            <view class="wrap">
                <view class="top_wrap">
                    <view class="title">题目</view>
                    <input placeholder="请输入题目标题" @input="caption" :value="content.title" />
                </view>
            </view>
            <view class="changMust">
                <view class="title">此题目为必填</view>
                <switch class="changContent" :checked="mustChange" @change="mustChangeFun" />
            </view>
            <view class="bottom_wrap">
                <view class="certain" @tap="tian_certain">保存</view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/association/add_question/add_question.js
export default {
    data() {
        return {
            type: '',
            content: {
                title: '',
                arr: [],
                id: '',
                arrLen: 1,
                type: ''
            },
            mustChange: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        if (options.fiexed == 'true') {
            let content = JSON.parse(options.content);
            this.setData({
                content: content
            });
        }

        this.content.type = options.type;
        this.setData({
            content: this.content,
            type: options.type
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
        caption(e) {
            this.content.title = e.detail.value;
            this.setData({
                content: this.content
            });
        },

        // 增加选项
        addChange() {
            this.content.arrLen++;
            this.setData({
                content: this.content
            });
        },

        // 保存
        certain() {
            if (this.content.title == '' || this.content.arr.length != this.content.arrLen || this.content.arr.length == 0) {
                uni.showModal({
                    title: '提示',
                    content: '请输入标题或删除多余选项',
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
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];
                var data = this.content;
                this.content.id = Date.parse(new Date());
                this.content.must = this.mustChange;
                this.setData({
                    content: this.content
                });
                prevPage.setData({
                    content: data
                });
                uni.navigateBack({
                    //返回
                    delta: 1
                });
            }
        },

        // 内容
        inpContent(e) {
            // console.log(e);
            let index = e.currentTarget.dataset.index;
            let content = e.detail.value;
            this.content.arr[index] = content; // this.data.content.id=Date.parse(new Date())

            this.setData({
                content: this.content
            });
        },

        // 删除选项
        deleteFun(e) {
            let index = e.currentTarget.dataset.index;
            console.log(index); // let arr=this.data.content.arr

            this.content.arr.splice(index, 1);
            this.content.arrLen--;
            this.setData({
                content: this.content
            });
        },

        // 填空确定
        tian_certain() {
            if (this.content.title == '') {
                uni.showModal({
                    title: '提示',
                    content: '请输入题目',
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
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];
                var data = this.content;
                this.content.id = Date.parse(new Date());
                this.content.must = this.mustChange;
                this.setData({
                    content: this.content
                });
                prevPage.setData({
                    content: data
                });
                uni.navigateBack({
                    //返回
                    delta: 1
                });
            }
        },

        // 必选
        mustChangeFun(e) {
            this.setData({
                mustChange: e.detail.value
            });
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
}
.wrap .top_wrap {
    padding: 24rpx;
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 12rpx;
    border-radius: 24rpx;
}
.wrap .item_wrap {
    padding: 24rpx;
    margin: 12rpx;
    background-color: white;
    border-radius: 24rpx;
}
.wrap .item_wrap .item .wrap {
    display: flex;
    flex-direction: row;
}
.wrap .item_wrap .item .wrap input {
    flex: 5;
}
.wrap .item_wrap .item .wrap .delete {
    flex: 1;
    color: red;
}
.wrap .item_wrap .add_content {
    padding: 24rpx;
    text-align: center;
    color: blue;
}
.changMust {
    display: flex;
    flex-direction: row;
    background-color: white;
    padding: 24rpx;
    margin-top: 24rpx;
}
.changMust .title {
    flex: 1;
}
.changMust .changContent {
    zoom: 0.8;
    flex: 1;
    text-align: right;
}
.bottom_wrap {
    position: fixed;
    bottom: 0;
    width: 100%;
}
.bottom_wrap .certain {
    background-color: blue;
    margin: 24rpx;
    text-align: center;
    padding: 24rpx;
    color: white;
    border-radius: 24rpx;
}
</style>
