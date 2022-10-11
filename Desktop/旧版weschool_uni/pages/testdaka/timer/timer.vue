<template>
    <view>
        <view class="head"></view>
        <view class="Timer">
            <view class="Group_Name">{{ Group_Name }}</view>
            <view class="clock">{{ time }}</view>
        </view>
        <view class="tail">
            <view class="submit" v-if="state == 'ready'">
                <image class="submit_pic" src="/static/images/flag.png"></image>
            </view>
            <view class="start" v-if="state == 'ready'" @tap="begin">
                <image class="start_pic" src="/static/pages/testdaka/images/start.png"></image>
            </view>
            <view class="stop" v-if="state == 'started'" @tap="pause">
                <image class="stop_pic" src="/static/pages/testdaka/images/stop.png"></image>
            </view>
        </view>
    </view>
</template>

<script>
// pages/testdaka/timer/timer.js
export default {
    data() {
        return {
            Group_Name: '发际线与我作队',
            time: '00:00:00',
            state: 'ready',
            hour: 0,
            minutes: 0,
            seconds: 0
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {},
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
        // 开始计时
        begin() {
            this.timer = setInterval(this.startTimer, 1000);
            this.setData({
                state: 'started'
            });
        },

        startTimer() {
            var _seconds = this.seconds;
            var _minute = this.minutes;
            var _hour = this.hour;
            _seconds += 1;

            if (_seconds >= 60) {
                _seconds = 0;
                _minute = _minute + 1;
            }

            if (_minute >= 60) {
                _minute = 0;
                _hour = _hour + 1;
            }

            var ti = (_hour < 10 ? '0' + _hour : _hour) + ':' + (_minute < 10 ? '0' + _minute : _minute) + ':' + (_seconds < 10 ? '0' + _seconds : _seconds);
            this.setData({
                time: ti,
                seconds: _seconds,
                minutes: _minute,
                hour: _hour
            });
        },

        // 暂停倒计时
        pause() {
            if (this.timer) {
                clearInterval(this.timer); // this.timer = null
            }

            this.setData({
                state: 'ready'
            });
        }
    }
};
</script>
<style>
page {
    height: 100%;
    width: 100%;
}

.head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30%;
    width: 100%;
}

.Timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 30%;
    width: 100%;
}

.Group_Name {
    font-size: 20px;
}

.clock {
    margin-top: 20px;
    font-size: 50px;
}

.tail {
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30%;
    width: 100%;
}

.submit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    margin-right: 30px;
    background-color: #ffffff;
    box-shadow: 1rpx 1rpx 0rpx 3rpx rgb(228, 228, 228);
    border-radius: 50%;
}

.submit_pic {
    width: 40px;
    height: 40px;
    margin-left: 3px;
}

.start {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: #ffffff;
    box-shadow: 1rpx 1rpx 0rpx 3rpx rgb(228, 228, 228);
    border-radius: 50%;
}

.start_pic {
    width: 40px;
    height: 40px;
    margin-left: 8px;
}

.stop {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: #ffffff;
    box-shadow: 1rpx 1rpx 0rpx 3rpx rgb(228, 228, 228);
    border-radius: 50%;
}

.stop_pic {
    width: 40px;
    height: 40px;
}
</style>
