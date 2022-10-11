<template>
    <view>
        <block name="card">
            <view class="data">
                <view class="data-adj">
                    <view class="upWard" :style="'background-color:' + (!lineSwitch | !index ? '#fffcfc' : '#e2e5f2')"></view>
                    <view class="dot" :style="'background-color:' + color[index]"></view>
                    <view class="offWard" :style="'background-color: ' + (lineSwitch ? '' : '#fffcfc') + ';'"></view>
                </view>
                <view class="grade" @tap.stop.prevent="catchtap" :id="index">
                    <view class="grade-title">
                        <view class="grade-column">{{ girl.bmi.title }}</view>
                        <view class="grade-rum">
                            <text v-for="(content, index) in item.text" :key="content.key">{{ content }}</text>
                        </view>
                    </view>
                    <view class="data-score" :style="'color:' + color[index] + '; font-size:' + fontSize + ';'">{{ item.score }}</view>
                </view>
            </view>
        </block>

        <!-- 
  var maskDetail = [
    {field: '活动名称：', text: show.ktmc }, 
    {field: '获得学分：', text: show.hdxf + '(' + show.ckxf + ')' }, 
    {field: '状态：', text: show.shztmc, color: show.shztmc=='审核通过'?'rgb(0,230,0)':'red' }, 
    {field: '时间：', text: show.kzsj }
  ]
  
  <template wx:if="{{mask}}" is="mask-toast" data="{{ item: maskDetail }}"></template>
-->
        <template name="mask-toast">
            <view class="toast" @touchmove.stop.prevent="return_true" @tap.stop.prevent="hideMask">
                <view class="toast_contain" @tap.stop.prevent="return_false">
                    <block v-for="(item, index) in item" :key="index">
                        <view class="toast_block">
                            <label>{{ item.field }}</label>
                            <text :style="'color: ' + item.color + ';'">{{ item.text }}</text>
                        </view>
                    </block>
                </view>
            </view>
        </template>

        <!-- 
name: head-block
desc: 头部栏设定， 固定
param: 
  type: String  [ picker | text ] 
  index: Number
  array: Array
  text: Array
  title: String
fields:
  type:   左上角采用 选择器 或 仅文字（ 必填 ）
  index:  picker的下标值        （当 type='picker' 时必填）
  array:  picker用来range的内容 （当 type='picker' 时必填）
  text:   右上角显示的内容
  title:  左上角显示的内容       （当 type='text' 时必填）

eg:
  <template is="head-block" data="{{ type: 'picker', index, array, text: [] }}"></template>
  <template is="head-block" data="{{ type: 'text', title:'', text:[] }}"></template>
-->
        <block name="head-block">
            <view class="head">
                <view class="head-left" v-if="headerType == 'picker'">
                    <picker @change="bindPickerChange" :value="index" :range="array">
                        <label class="weui-input">{{ array[index] }}</label>
                        <text class="iconfont icon-open"></text>
                    </picker>
                </view>

                <view class="head-left" v-if="headerType == 'text'">
                    <view class="weui-input">{{ girl.bmi.title }}</view>
                </view>

                <view class="head-right">
                    <view v-for="(item, index) in template.text" :key="item.key">{{ item }}</view>
                </view>
            </view>
            <view class="head-padding"></view>
        </block>
    </view>
</template>

<style>
/* 卡片列表 */
.list {
    margin-bottom: 30rpx;
}
.data {
    display: flex;
}
.data-adj {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70rpx;
}
.dot {
    margin: auto;
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
}
.upWard {
    margin: auto;
    width: 7rpx;
    height: 95rpx;
    background-color: #000000;
}
.offWard {
    margin: auto;
    width: 7rpx;
    height: 60rpx;
    background-color: #e2e5f2;
}

.data-score {
    flex: 1;
    margin: auto;
    text-align: right;
    font-size: 52rpx;
    white-space: nowrap;
    width: 50rpx;
    text-overflow: ellipsis;
}
.grade {
    display: flex;
    flex: 1;
    margin-top: 35rpx;
    padding: 20rpx 35rpx;
    border-radius: 40rpx;
    background-color: #fff;
    box-shadow: 0rpx 0rpx 17rpx #e2e2e2;
}
.grade-column {
    font-size: 31rpx;
    font-weight: 500;
    line-height: 60rpx;
    width: 470rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.grade-rum {
    margin-top: 10rpx;
    font-size: 24rpx;
    line-height: 30rpx;
}
.grade-rum text {
    margin-right: 28rpx;
    color: #8a8a8a;
}

/* 蒙版toast */
.mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.5;
    background-color: gray;
    z-index: 99;
}
.toast {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: -10vh;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
}
.toast_contain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    padding: 20rpx 30rpx;
    line-height: 60rpx;
    border-radius: 25rpx;
    font-size: 13px;
    background-color: rgba(30, 30, 30, 0.7);
    color: rgb(230, 230, 230);
}
.toast_block {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.toast_block text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@media (prefers-color-scheme: dark) {
    page {
        filter: unset !important;
    }
    .toast_contain {
        background-color: rgb(45, 45, 45);
    }
}

/* 头部 */
.head-padding {
    padding: 35rpx;
}

.head {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    padding: 10rpx 25rpx;
    line-height: 45rpx;
    right: 0;
    left: 0;
    box-shadow: 0px 0px 10px #e2e2e2;
    background-color: #fff;
    z-index: 9;
}
.head-left {
    font-size: 30rpx;
    font-weight: 600;
}

.head-right {
    flex: 1;
    text-align: right;
    color: coral;
    padding-right: 1rpx;
}
.head-right view {
    display: inline-block;
    font-size: 25rpx;
    margin-left: 25rpx;
}

.icon-open {
    margin-left: 20rpx;
}
</style>
