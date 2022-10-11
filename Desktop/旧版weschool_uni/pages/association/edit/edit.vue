<template>
    <view class="wrap">
        <view class="title">编辑资料</view>
        <form @submit="formSubmit">
            <view class="list_wrap">
                <view class="list" v-for="(item, index) in listObj" :key="index">
                    <view class="caption">{{ item.title }}</view>

                    <input :value="item.value" class="handle" @tap="item.tap" :name="item.name" />
                </view>
            </view>
            <view class="bt_wrap">
                <button class="certain" form-type="submit">保存修改</button>
            </view>
        </form>
    </view>
</template>

<script>
// pages/association/edit/edit.js
let count = '';
const db = wx.cloud.database();
export default {
    data() {
        return {
            listObj: []
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let count = options.count; // if (count != 'guest') {
        //   count = Number(options.count)
        // }

        let that = this;
        uni.showLoading({
            title: '查询中',
            mask: true,
            success: (result) => {
                // console.log(count);
                db.collection('associationApply')
                    .where({
                        count
                    })
                    .get()
                    .then((res) => {
                        // console.log(res);
                        let dataObj = res.data[0].hostMess;
                        that.setData({
                            listObj: [
                                {
                                    title: '社团名称',
                                    value: dataObj.association,
                                    tap: 'warnTip',
                                    name: 'association'
                                },
                                {
                                    title: '管理员学号',
                                    value: dataObj.card,
                                    tap: 'warnTip',
                                    name: 'card'
                                },
                                {
                                    title: '管理员姓名',
                                    value: dataObj.name,
                                    tap: 'getHandle',
                                    name: 'name'
                                },
                                {
                                    title: '管理员电话',
                                    value: dataObj.phone,
                                    tap: 'getHandle',
                                    name: 'phone'
                                }
                            ]
                        });
                        uni.hideLoading();
                    });
            }
        }); // console.log(options.count);
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
        // 不可修改警告
        warnTip() {
            uni.showToast({
                title: '不可修改',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {}
            });
        },

        // 提交表单
        formSubmit(e) {
            console.log(e);
            let newDate = e.detail.value;
            let that = this;
            uni.showLoading({
                title: '审核中',
                mask: true,
                success: (result) => {
                    if ((newDate.association == that.listObj[0].value) == false) {
                        uni.hideLoading();
                        uni.showModal({
                            title: '警告',
                            content: '社团名称不可修改,需要修改请联系负责人。是否继续提交其余修改内容',
                            showCancel: true,
                            cancelText: '取消',
                            cancelColor: '#000000',
                            confirmText: '确定',
                            confirmColor: '#3CC51F',
                            success: (result) => {
                                if (result.confirm) {
                                    // 提交
                                    search(newDate);
                                }
                            }
                        });
                    } else {
                        search(newDate);
                    }

                    function search(newDate) {
                        let card = newDate.card == that.listObj[1].value;
                        let name = newDate.name == that.listObj[2].value;
                        let phone = newDate.phone == that.listObj[3].value; // let that=this

                        if (card == true && name == true && phone == true) {
                            uni.hideLoading();
                            uni.showToast({
                                title: '成功',
                                icon: 'none',
                                image: '',
                                duration: 1500,
                                mask: false,
                                success: (result) => {}
                            });
                        } else {
                            // console.log(newDate.phone);
                            db.collection('associationApply')
                                .where({
                                    count: count
                                })
                                .update({
                                    data: {
                                        hostMess: {
                                            association: that.listObj[0].value,
                                            card: that.listObj[1].value,
                                            name: newDate.name,
                                            phone: newDate.phone
                                        }
                                    }
                                })
                                .then((res) => {
                                    // console.log(res);
                                    uni.hideLoading();
                                    uni.showToast({
                                        title: '修改成功',
                                        icon: 'none',
                                        image: '',
                                        duration: 1500,
                                        mask: false,
                                        success: (result) => {}
                                    });
                                });
                        }
                    }
                }
            }); // console.log(e);
        }
    }
};
</script>
<style>
page {
    background-color: #f6f6f6;
}
.wrap {
    padding: 24rpx;
    margin: 24rpx;
    border-radius: 24rpx;
    font-size: 32rpx;
    background-color: white;
}
.wrap .title {
    text-align: center;
    color: #63a1a0;
    font-weight: 700;
    font-size: 34rpx;
}
.wrap .list_wrap {
    padding-top: 12rpx;
}
.wrap .list_wrap .list {
    display: flex;
    flex-direction: row;
    padding-top: 28rpx;
    align-items: center;
}
.wrap .list_wrap .list .caption {
    display: flex;
    align-items: center;
    flex: 1;
}
.wrap .list_wrap .list .handle {
    flex: 3;
    background-color: rgba(245, 245, 245, 0.9);
    border-radius: 12rpx;
    display: flex;
    padding: 12rpx;
    align-items: center;
    color: rgba(16, 16, 16, 0.6);
}
.wrap .bt_wrap {
    display: flex;
    justify-content: center;
    padding-bottom: 24rpx;
    margin-top: 24rpx;
}
.wrap .bt_wrap .certain {
    font-size: 32rpx;
    text-align: center;
    background-color: #63a1a0;
    padding: 18rpx;
    margin-top: 24rpx;
    border-radius: 18rpx;
    color: white;
}
</style>
