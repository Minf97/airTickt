<template>
    <view>
        <!-- template/template.wxml -->

        <!-- 
  templateName: navigate_item      // 模版名称
  fields:                          // 字段类型
    item:    Object
    click:   String
  param:                           // 参数说明
    click:   FunctionName          // 点击时触发的事件(禁冒泡)
    item:
      icon:  Url                   // 左方图标
      title: Text                  // 显示的文字
      right: Url                   // 右方显示的 '>' 符号 
  
  注: Url 相对路径是相对于 '引用文件' ，不是从模版出发的相对路径
  
  eg:
    <template is="navigate_item" data="{{ item, right:'images/right.png'}}"></template>

-->
        <template name="navigate_item">
            <view class="navigate_item" @tap.stop.prevent="item.click">
                <image :src="item.icon"></image>
                <text>{{ item.title }}</text>
                <image :src="right || '/pages/myself/images/right.png'"></image>
            </view>
        </template>

        <!-- 
  templateName: userInfo_item      // 模板名称
  fields:                          // 字段说明
    item: Object
    click: String
  param:                           // 参数说明
    click: FunctionName
    item:
      icon: Url                    // 图标位置
      title: text                  // 显示文字
      littleTitle: text            // 右侧文字
 -->
        <template name="userInfo_item">
            <view class="userInfo_item" @tap.stop.prevent="item.click">
                <image :src="item.icon"></image>
                <text class="title">{{ item.title }}</text>
                <text>{{ item.littleTitle }}</text>
            </view>
        </template>
    </view>
</template>

<style>
/* template/template.wxss */

.navigate_item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    line-height: 100rpx;
}
.navigate_item image:first-child {
    width: 50rpx;
    height: 50rpx;
    padding: 0 0 0 20rpx;
}
.navigate_item text {
    flex: 1;
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.navigate_item image:last-child {
    width: 30rpx;
    height: 30rpx;
    padding: 0 20rpx;
}
/* userInfo_item */
.userInfo_item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    line-height: 100rpx;
}
.userInfo_item image {
    width: 50rpx;
    height: 50rpx;
    padding: 0 0 0 20rpx;
}
/* 不知道为什么 .userInfo_item text:first-child 选不到它，只好加个类名了 */
.userInfo_item .title {
    flex: 1;
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.userInfo_item text:last-child {
    margin-right: 20rpx;
    font-size: 20rpx;
    color: rgb(186, 186, 186);
    letter-spacing: 2rpx;
}
</style>
