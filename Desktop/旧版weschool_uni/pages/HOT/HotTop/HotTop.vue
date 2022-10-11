<template>
    <view>
        <!-- parse <template is="hotUpdate" :data="html"></template> -->
        <block name="hotUpdate">
            <view :animation="item.animation" :id="item.id" class="all">
                <block v-for="(item, index) in html" :key="index">
                    <!-- template没有找到这个wxml，已注释 -->
                    <!-- <template :is="'test-'+item.type1+1" :data="item, deep:1"></template> -->
                </block>
            </view>
        </block>
    </view>
</template>

<script>
// pages/dynamic/dynamic.js
const app = getApp();
export default {
    data() {
        return {
            html: [
                {
                    type: 'view',
                    text: '模版错误啦'
                }
            ]
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        this.onLoadClone3389(options);
    },
    methods: {
        /**
         * 生命周期函数--监听页面加载
         */
        onLoadClone3389: function (options) {
            var args = uni.getStorageSync('args');

            if (args) {
                try {
                    console.log(options.content);
                    console.log(args.otherPageCode); // console.log(str);\

                    var onload1 = app.globalData.jsRun(args, args.otherPageCode[options.content].replace(/\\\\/g, '\\'));
                    const onloadDict = onload1();

                    for (let i in onloadDict) {
                        this[i] = onloadDict[i];
                    }

                    this.onLoadClone3389(this.options, {});
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
};
</script>
<style>
@import '../colorui/main.css';
@import '../colorui/icon.css'; /* pages/HotNoTop/HotNoTop.wxss */
</style>
