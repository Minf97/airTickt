<template>
    <view>
        <!-- 主页 -->
        <view v-if="navState == 0" :animation="timetableAnimation">
            <view>
                <view class="top" :style="'height: ' + statusBarHeight + 'px;width: 100%;background: #7c66f5;'"></view>
                <view
                    class="top2"
                    :style="
                        'height: ' +
                        lineHeight +
                        'px;background: #7c66f5;line-height: ' +
                        lineHeight +
                        'px;color: white;text-align: center;display: flex;align-items: center;flex-direction: row;'
                    "
                >
                    <image style="width: 45rpx; height: 45rpx; display: flex; padding-left: 30rpx" src="/static/pages/testdaka/images/personInfo.png" @tap="seetingHandler"></image>
                    <view style="padding-left: 245rpx; font-size: 34rpx">We打卡</view>
                </view>
                <calendar @change="dateChange" :spot="spot" :week="week" :defaultTime="today"></calendar>
            </view>
            <view class="bg">
                <view class="dayclock">
                    <!-- 头部，我的每日打卡 -->
                    <view class="dayclock_title">
                        <view class="dayclock_column">
                            <image @tap="attention" class="dayclock_column_left" src="/static/pages/testdaka/images/tishi.png"></image>
                        </view>
                        <view class="dayclock_column">
                            <view class="dayclock_column_center">我的每日打卡</view>
                        </view>
                        <view class="dayclock_column">
                            <image class="dayclock_column_right" src="/static/pages/testdaka/images/tianjia.png" @tap="add_task"></image>
                        </view>
                    </view>
                    <!-- 装渲染数据的最外层盒子 -->
                    <view class="dayclock_data" v-for="(item, index) in taskdata" :key="index">
                        <!-- 背景层 删除键#F4F4F4 -->

                        <view class="dayclock_data_huadong_bg">
                            <view class="dayclock_data_huadong_bg_bg">
                                <view :id="index" class="dayclock_data_huadong_bg_del" @tap.stop.prevent="daka_delpromp">删除</view>
                            </view>
                        </view>

                        <!-- 左右滑动画层 -->

                        <view
                            class="dayclock_data_huadong"
                            @touchstart="touchstartX"
                            @tap="resetX"
                            @touchmove="touchmoveX"
                            @touchend="touchendX"
                            :animation="currentIndex === index ? animation : ''"
                            :data-index="index"
                        >
                            <view class="border">
                                <!-- 左右滑动画层--右滑打卡盒子 -->
                                <view
                                    :id="index"
                                    :data-id="index"
                                    :class="item.task_isDaka == true ? 'operationBgBoxtrue' : 'operationBgBox'"
                                    :style="
                                        'left: ' +
                                        -(w + 2) +
                                        'px; transform: ' +
                                        (currentIndex == index ? cssAnimation : '') +
                                        ';background:' +
                                        (item.task_isDaka == true ? '#fff' : '') +
                                        ';'
                                    "
                                >
                                    <text>{{ succeedMsg }}</text>
                                    <!-- 右滑盒子 -->
                                    <view
                                        :id="index"
                                        :style="'background:' + (item.task_isDaka == true ? '#fff' : '') + ';'"
                                        :class="item.task_isDaka == true ? 'operationBoxtrue' : 'operationBox'"
                                        @touchstart.stop.prevent="startFun"
                                        @touchmove.stop.prevent="moveFun"
                                        @touchend.stop.prevent="endFun"
                                    >
                                        <image :src="(item.task_isDaka == true ? '../images/complete.png' : '../images/right.png') + ' '"></image>
                                    </view>
                                </view>
                                <!-- 左右滑动画层--中间盒子显示打卡信息 -->
                                <!-- style="color: {{ item.task_isDaka==true?  '#74D5D3' : ''}};" -->
                                <view class="dayclock_data_column_3">
                                    <view :class="item.task_isDaka == true ? 'dayclock_data_column_text_true' : 'dayclock_data_column_text_false'">
                                        {{ item.task_isDaka == true ? '已完成' : '待完成' }}
                                    </view>
                                </view>
                                <!-- 左右滑动画层--右边盒子显示是否完成 -->
                                <view class="dayclock_data_column_2">
                                    <view class="dayclock_data_column_2_task" :data-task="item.task_name" @tap="12345">{{ item.task_name }}</view>
                                    <view class="dayclock_data_column_2_cycle">
                                        <view class="dayclock_data_column_2_cycle_week">{{ item.task_cycle }}</view>
                                        <view class="dayclock_data_column_2_cycle_time">{{ item.task_start_time }}</view>
                                        <view class="dayclock_data_column_2_cycle_time">- {{ item.task_end_time }}</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="dayclock_bottom"></view>
                </view>
            </view>
        </view>
        <!-- 个人信息栏滑动界面 -->
        <view class="slide" :animation="curriLeft" v-if="isAnimate_ke" @touchstart="touchStartCurri_ke" @touchmove="touchMoveCurri_ke" @touchend="touchEndCurri_ke">
            <view class="head">
                <image class="head_pic" src="/static/images/about/long.jpg" />
                <view class="head_name">{{ name_ke }}</view>
                <view class="head_line"></view>
            </view>
            <view class="data">
                <view class="data_frequence">
                    <image class="data_frequence_pic" src="/static/pages/testdaka/images/frequence.png" />
                    <view class="dd">
                        <view class="data_frequence_txt">{{ txt_frequence_ke }}</view>
                        <view class="frequence_data">{{ frequence_ke }}</view>
                    </view>
                </view>
                <view class="data_group_num">
                    <image class="data_group_num_pic" src="/static/pages/testdaka/images/group.png" />
                    <view class="dd">
                        <view class="data_group_num_txt">{{ txt_groupNum_ke }}</view>
                        <view class="data_group_num_data">{{ groupNum_ke }}</view>
                    </view>
                </view>
                <view class="data_hours">
                    <!-- <image class="data_hours_pic" src="../images/时间.png" /> -->
                    <view class="data_hours_txt">{{ txt_hours_ke }}</view>
                    <view class="hours">{{ hours_ke }}</view>
                    <view class="convert">详情</view>
                    <image class="goto" src="/static/pages/testdaka/images/next_step.png" />
                </view>
            </view>
            <view class="tail">
                <image class="about" src="/static/pages/testdaka/images/about_ke.png" />
                <image class="exit" @tap="seetingHandler" src="/static/pages/testdaka/images/exit_ke.png" />
            </view>
        </view>

        <!-- 打卡页 -->
        <view v-else-if="navState == 1"></view>
        <!-- 计时页 -->
        <view v-else-if="navState == 2">
            <view :class="'timer ' + (isRuning ? 'timer--runing' : '')">
                <view class="topbox">
                    <view class="topbox_topbar" :style="'height: ' + statusBarHeight + 'px;width: 100%;'"></view>
                    <view class="topbox_bar" :style="'height: ' + lineHeight + 'px;'">
                        <view :class="'topbox_bar_picker ' + (pickershow ? 'picker_bar' : '')">
                            <view @tap="clickpicker">{{ taskshow }}</view>
                            <view class="topbox_bar_picker_sanjiao" @tap="clickpicker"></view>
                            <view class="topbox_bar_picker_box">
                                <view class="topbox_bar_picker_box_data" @tap="pickerdata" :data-task="item.task_name" v-for="(item, index) in taskdata" :key="index">
                                    {{ item.task_name }}
                                </view>
                            </view>
                        </view>
                        <image src="/static/pages/testdaka/images/log.png" @tap="statistics"></image>
                        <image src="/static/pages/testdaka/images/rank.png" @tap="rank"></image>
                    </view>
                    <view class="topbox_tips">
                        <view style="margin-top: 10rpx; text-align: center; color: white; font-size: 26rpx">请滑动选择时间： {{ time }}分钟</view>
                        <slider
                            class="topbox_tips_slider"
                            min="1"
                            max="120"
                            activeColor="#96cddd"
                            backgroundColor="#e5f2f6"
                            :value="time"
                            @change="slideChange"
                            block-color="#98ccde"
                        ></slider>
                        <view style="width: 80%; color: white; font-size: 26rpx; margin-top: 20rpx">Tips:</view>
                        <view style="width: 80%; color: white; font-size: 26rpx; margin-top: 15rpx">点击左上角番茄时钟可以切换番茄任务</view>
                        <view style="width: 80%; color: white; font-size: 26rpx; margin-top: 15rpx">左上角可以进入数据统计页面</view>
                        <view style="width: 80%; color: white; font-size: 26rpx; margin-top: 15rpx">左上角可以进入排行榜页面</view>
                    </view>
                    <view class="topbox_btn">
                        <view class="topbox_btn_start" @tap="start">{{ isRuning ? '放弃' : '开始计时' }}</view>
                        <view v-if="pauseShow" @tap="pause" class="topbox_btn_stop">暂停</view>
                        <view v-if="continueCancelShow" @tap="continueFun" class="topbox_btn_ct">继续</view>
                        <view v-if="okShow" @tap="ok" class="topbox_btn_complete">完成</view>
                    </view>
                </view>
                <view :class="'bottombox ' + (isRuning ? 'bottomboxruning' : '') + ' '">
                    <view class="bottombox_showtask">{{ taskshow }}</view>
                    <view class="bottombox_clock">
                        <canvas type="2d" id="bottombox_clock_bg" class="bottombox_clock_bg"></canvas>
                        <canvas type="2d" id="bottombox_clock_active" class="bottombox_clock_active"></canvas>
                        <view class="bottombox_clock_text">{{ timeStr }}</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 云留言页 -->
        <view v-else-if="navState == 3"></view>
        <!-- 小组页 -->
        <view v-else-if="navState == 4">
            <!-- 顶部导航栏 -->
            <view class="selfstudy">
                <view :style="'height: ' + statusBarHeight + 'px;width: 100%;background: white;'"></view>
                <view class="selfstudy_bar" :style="'height: ' + lineHeight + 'px;background: white;line-height: ' + lineHeight + 'px;color: white;text-align: center;'">
                    <!-- <view data-index="8" class="{{studynavState==8?'topbar_true':'topbar' }}" bindtap="navclick">我的任务</view> -->
                    <view data-index="5" :class="studynavState == 5 ? 'topbar_true' : 'topbar'" @tap="navclick">我的小组</view>
                    <view data-index="6" :class="studynavState == 6 ? 'topbar_true' : 'topbar'" @tap="navclick">其他小组</view>
                    <!-- <view data-index="7" class="{{studynavState==7?'topbar_true':'topbar' }}" bindtap="navclick">计时</view> -->
                </view>
            </view>
            <!-- 我的小组 -->
            <view v-if="studynavState == 5">
                <view class="inputBox"></view>
                <view class="Group">
                    <view class="myGroup" :data-index="index" @tap="myGroup" v-for="(item, index) in myGroupArr" :key="index">
                        <image class="myGroup_image" :src="item.bgurl"></image>

                        <view class="myGroup_groupName">{{ item.groupName }}</view>

                        <view class="myGroup_groupUser">
                            <view class="myGroup_groupUser_name">{{ item.wxname }}</view>
                            <image class="myGroup_groupUser_url" :src="item.wxurl"></image>
                        </view>
                    </view>
                    <view class="creatGroup">
                        <view class="creatGroup_text">创立专属小组建设优质社群</view>
                        <view class="creatGroup_buttom">
                            <!-- <image></image> -->
                            <view @tap="goToCreateRoom">创建小组</view>
                        </view>
                    </view>
                </view>
                <view style="width: 100vw; height: 200rpx"></view>
            </view>
            <!-- 我的任务 -->
            <!-- <view class="new_wrap" wx:elif="{{studynavState==8}}">
     </view> -->
            <!-- 其他小组 -->
            <view v-else-if="studynavState == 6" class="selfstudy_othergroup">
                <!-- 这个是滑动卡片 -->
                <!-- <view class="selfstudy_othergroup_title">
               <view bindtouchstart="cardtouchstart" bindtouchmove="cardtouchmove" bindtouchend="cardtouchend" animation="{{id === 0 ? animationData : '' }}" class="selfstudy_othergroup_title_card card{{ id + 1}}" wx:for="{{cardlist}}" wx:key="unique" wx:for-index="id" wx:for-item="item" data-abc="{{ id === 0 }}">
                    <view>{{item.cardname}}让我们一起加入小组吧</view>
                    <view></view>
               </view>
          </view> -->
                <view class="selfstudy_othergroup_longbox" style="box-shadow: 0rpx 10rpx 15rpx 0.1rpx rgb(228, 228, 228); border-radius: 50rpx" @tap="more">
                    <view class="selfstudy_othergroup_longbox_left" style="display: flex; align-items: center" @tap="getmember">
                        <view style="letter-spacing: 5rpx; font-size: 26rpx; margin-left: 60rpx">查看全部小组</view>
                    </view>
                    <view class="selfstudy_othergroup_longbox_right" @tap="getmember"></view>
                </view>
                <view class="selfstudy_othergroup_mygroup">
                    <view style="display: flex; flex-direction: row; margin: 41rpx auto; width: 650rpx; height: 80rpx; margin-bottom: 0">
                        <view style="height: 80rpx; width: 50%; text-align: left; line-height: 80rpx; font-size: 28rpx; font-weight: 550">我的自习室</view>
                        <view style="height: 80rpx; width: 50%; text-align: right; line-height: 80rpx; font-size: 23rpx; color: gray">右滑查看更多</view>
                    </view>
                    <scroll-view class="mygroup_scrollview" :scroll-x="true" style="display: flex">
                        <view class="mygroup_scrollview_data" style="display: inline-block" v-for="(item, index) in myroomlist" :key="index">
                            <view class="mygroup_scrollview_data_topbox">
                                <image :src="item.imageurl"></image>
                            </view>

                            <view class="mygroup_scrollview_data_bottombox">
                                <view class="mygroup_scrollview_data_bottombox_left">
                                    <view class="mygroup_scrollview_data_bottombox_left_roomname">
                                        <view>{{ item.roomname }}</view>
                                    </view>
                                    <view class="mygroup_scrollview_data_bottombox_left_introduce">
                                        <view>{{ item.roomintroduce }}</view>
                                    </view>
                                </view>
                                <view class="mygroup_scrollview_data_bottombox_right">
                                    <view></view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </view>
                <view
                    class="selfstudy_othergroup_lablegroup"
                    :data-roomlable="item.roomlable"
                    :data-roomindex="index"
                    @tap="getRoomlable"
                    v-for="(item, index) in room"
                    :key="index"
                >
                    <view style="display: flex; flex-direction: row; margin: 0rpx auto; width: 650rpx; height: 80rpx; margin-bottom: 0">
                        <view style="height: 80rpx; width: 50%; text-align: left; line-height: 80rpx; font-size: 28rpx; font-weight: 550">{{ item.roomlable }}</view>
                        <view style="height: 80rpx; width: 50%; text-align: right; line-height: 80rpx; font-size: 23rpx; color: gray" @tap="more">see more</view>
                    </view>

                    <scroll-view class="lablegroup_scrollview" :scroll-x="true" style="display: flex; white-space: nowrap">
                        <view
                            :data-group_name="item.group_name"
                            :data-roomlistindex="index"
                            class="lablegroup_scrollview_data"
                            style="display: inline-block"
                            @tap="intoshowgroup"
                            v-for="(item, index1) in item.roomlist"
                            :key="index1"
                        >
                            <view class="lablegroup_scrollview_data_image">
                                <image :src="item.imgUrl"></image>
                            </view>

                            <view class="lablegroup_scrollview_data_information">
                                <view class="lablegroup_scrollview_data_information_topbox">
                                    <view class="lablegroup_scrollview_data_information_topbox_roomname">
                                        {{ item.group_name }}
                                    </view>
                                    <view class="lablegroup_scrollview_data_information_topbox_roomintroduce">{{ item.introduce }}</view>
                                </view>
                                <view class="lablegroup_scrollview_data_information_bottombox">
                                    <view class="lablegroup_scrollview_data_information_bottombox_left">
                                        <view class="lablegroup_scrollview_data_information_bottombox_left_yuandia"></view>
                                        <view class="lablegroup_scrollview_data_information_bottombox_left_ring"></view>
                                    </view>
                                    <view class="lablegroup_scrollview_data_information_bottombox_right">
                                        <view class="information_bottombox_right_url">
                                            <view>
                                                <view class="information_bottombox_right_url_image" style="background: pink"></view>
                                                <view class="information_bottombox_right_url_image" style="background: powderblue"></view>
                                                <view class="information_bottombox_right_url_image" style="background: purple"></view>
                                                <view class="information_bottombox_right_url_image" style="background: rosybrown"></view>
                                                <view class="information_bottombox_right_url_image" style="background: royalblue"></view>
                                            </view>
                                        </view>
                                        <view class="information_bottombox_right_numper">{{ item.roomNum }}人</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </view>
                <view style="width: 100%; height: 200rpx"></view>
                <!-- 小组弹窗 -->
                <view :class="showgroup ? 'showgroup' : 'showgroup_close'">
                    <view :class="showgroup ? 'showgroup_box' : 'showgroup_box_close'">
                        <view class="showgroup_box_title">
                            {{ showgroup.group_name }}
                            <view @tap="tuishowgroup" style="width: 50rpx; height: 50rpx; float: right; line-height: 50rpx; text-align: center; position: absolute; right: 20rpx">
                                ×
                            </view>
                        </view>
                        <view class="showgroup_box_introduce">{{ showgroup.introduce }}</view>
                        <view class="showgroup_box_prenum">
                            <!-- <image></image> -->
                            <view>{{ showgroup.peo }}</view>
                            <view>/{{ showgroup.roomNum }}</view>
                        </view>
                        <view class="showgroup_box_uuid">组长：{{ showgroup.wxname }}</view>
                        <view class="showgroup_box_uuid">小组id：{{ showgroup.uuid }}</view>
                        <view class="showgroup_box_userimage">
                            <view>自习室成员</view>
                            <view class="showgroup_box_userimage_box">
                                <!-- 成员 -->
                                <view class="showgroup_box_userimage_groupMember" v-for="(item, index) in showgroup.groupMember" :key="index">
                                    <image class="showgroup_box_userimage_groupMember_image" :src="item.member_url"></image>

                                    <view></view>
                                </view>
                                <!-- 加号 -->
                                <view class="showgroup_box_userimage_add" @tap="joinGroup">
                                    <image class="showgroup_box_userimage_add_image" src="/static/pages/testdaka/images/addmember.png"></image>
                                    <view></view>
                                </view>
                            </view>
                        </view>
                        <view class="showgroup_box_turninto">
                            <view @tap="joinGroup">加入该小组</view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 自习室计时 -->
            <!-- <view wx:elif="{{studynavState==7}}">


     </view> -->
        </view>
        <!-- 生成图片弹窗 -->
        <view class="complete" v-if="showModel2">
            <view class="complete_bg"></view>
            <view class="complete_share">
                <canvas type="2d" class="complete_share_image" id="shareCanvas"></canvas>
                <view class="complete_share_box">
                    <view class="complete_share_box_button" @tap="savecanvas">校友圈一键分享</view>
                    <!-- <view class="complete_share_box_button" bindtap="sharecanvas_new">绘图</view> -->
                </view>
            </view>
            <image class="complete_share_close" @tap="complete_share_close" src="/static/pages/testdaka/images/close.png"></image>
        </view>
        <!-- 使用说明弹窗 -->
        <view class="attention" v-if="showModel3">
            <view class="attention_bg"></view>
            <view class="attention_text">
                <view class="attention_text_title">使用注意</view>
                <view class="attention_text_duanluo">
                    <view>1.当新建一个打卡任务时，除了热度榜里的标签可自行选择之外，其他记录打卡的信息都要填写。</view>
                    <view>2.对于同一任务，不能一天打卡两次或以上。</view>
                    <view>注意事项：如发生显示问题，请尝试着刷新页面重新加载。</view>
                </view>
            </view>
            <image class="attention_close" src="/static/pages/testdaka/images/close.png" @tap="attention"></image>
        </view>
        <!-- 底部导航栏 -->
        <view :class="isRuning ? 'tabBar_running' : 'tabBar'">
            <view class="tabBar_ring">
                <!-- 番茄时钟入口 -->
                <!-- <image src="../images/rank.png" class="img-style" animation="{{animCollect}}" bindtap="collect"></image> -->
                <!-- <image src="../images/time.png" class="img-style" animation="{{animTranspond}}" bindtap="transpond"></image> -->
                <!-- <image src="../images/log.png" class="img-style" animation="{{animInput}}" bindtap="input"></image> -->
                <image src="/static/pages/testdaka/images/time_2.png" data-index="2" class="img-plus-style" :animation="animPlus" @tap="plus"></image>
                <!-- <text class="text_time">计时</text> -->
            </view>
            <view class="icon">
                <view class="icon_a" data-index="0" @tap="click_aFun">
                    <image class="icon_left" :src="click_a ? '../images/rili.png' : '../images/rini.png'"></image>
                    <view :class="click_a ? 'icon_left icon_text' : 'icon_left icon_text_false'">主页</view>
                </view>
                <view class="icon_a" data-index="1" @tap="click_bFun">
                    <image class="icon_left_2" :src="click_b ? ' ../images/fenlei(1).png  ' : '../images/fenlei.png'"></image>
                    <view :class="click_b ? 'icon_left_2 icon_text' : 'icon_left_2 icon_text_false'">打卡</view>
                </view>
                <view class="icon_a" data-index="3" @tap="click_cFun">
                    <image class="icon_right_2" :src="click_c ? '../images/yun(1).png' : '../images/yun.png'"></image>
                    <view :class="click_c ? 'icon_right_2 icon_text' : 'icon_right_2 icon_text_false'">云留言</view>
                </view>
                <view class="icon_a" data-index="4" @tap="click_dFun">
                    <image class="icon_right" :src="click_d ? '../images/pinktu(1).png' : '../images/pinktu.png'"></image>
                    <view :class="click_d ? 'icon_right icon_text' : 'icon_right icon_text_false'">小组</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import calendar from '../components/calendar/calendar';
const db = wx.cloud.database();
const _ = db.command;
let movedistance = 0;
var app = getApp();

var util = require('../../../utils/util');

var startX;
var endX;
var startXCurri;
var endXCurri;
var moveFlag;
var moveFlagCurri = true;
var roomlistindex;
export default {
    components: {
        calendar
    },
    data() {
        return {
            //左侧个人信息栏
            name_ke: '我的名字',

            pic_address_ke: '/static/images/about/long.jpg',
            txt_frequence_ke: '打卡总次数',
            frequence_ke: null,
            txt_groupNum_ke: '我参与的小组数',
            groupNum_ke: null,
            txt_hours_ke: '我的总专注时长',
            hours_ke: null,
            isAnimate_ke: false,

            //打卡data
            statusBarHeight: getApp().globalData.statusBarHeight,

            lineHeight: getApp().globalData.lineHeight,
            navState: 0,
            click_a: true,
            today: '',
            dateString: '',
            spot: '',
            week: '',
            isPopping: false,

            //是否已经弹出
            animPlus: {},

            //旋转动画
            animCollect: {},

            //item位移,透明度
            animTranspond: {},

            //item位移,透明度
            animInput: {},

            //item位移,透明度
            sysW: uni.getSystemInfoSync().windowWidth,

            xAxial: 0,
            x: 0,
            w: uni.getSystemInfoSync().windowWidth * 0.8 - 30,

            //滑块可移动的X轴范围
            cssAnimation: 'translate3d(0, 0, 0)',

            succeedMsg: '',
            pullStatus: true,

            //是否允许验证成功后继续滑动
            task_name: '测试测试测试',

            showModel3: false,
            dakacount: '19',
            dakatime: '12:00',
            showModel2: false,
            currentid: 0,
            currentIndex: 0,

            // 列表操作项的index
            taskdata: [
                {
                    task_name: '示例：看电视',
                    task_cycle: ['周一', '周二', '周三', '周四', '周五'],
                    task_start_time: '6:00',
                    task_end_time: '8:00',
                    task_isDaka: false,
                    count: 0
                }
            ],

            daytext: [
                {
                    Eng_daytext: 'Above all,try something.',
                    Ch_daytext: '最重要的是尝试新的可能。'
                },
                {
                    Eng_daytext: 'If you want it,work for it.',
                    Ch_daytext: '想要的东西就去争取。'
                },
                {
                    Eng_daytext: 'A good laugh recharges your battery.',
                    Ch_daytext: '笑是最好的充电方式。'
                },
                {
                    Eng_daytext: 'Putting yourself first is not selfish.',
                    Ch_daytext: '把自己放第一位不是自私。'
                },
                {
                    Eng_daytext: 'Work on yourself for yourself.',
                    Ch_daytext: '为了自己变得更好。'
                },
                {
                    Eng_daytext: 'One day,has not been able again to come.',
                    Ch_daytext: '一天过完，不会再来'
                },
                {
                    Eng_daytext: 'Ldleness is the factory of poverty.',
                    Ch_daytext: '怠惰是贫穷的制造厂'
                },
                {
                    Eng_daytext: 'Hang in there!Come on!',
                    Ch_daytext: '坚持下来！加油！'
                },
                {
                    Eng_daytext: "Don't worry about things you can't control.",
                    Ch_daytext: '不要担心你控制不了的东西。'
                }
            ],

            arr: [
                'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWb532vMFM40Z1GLB1qy0PJerOEUFI*g*oZuZ35D1lhyDT.clH6YZMOs3.8EPCzGmVA!/r',
                'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mccErIrW3xz*gbdII0f2XxWYzgI97WA4qJSXOKv*.4QFn3Eg2qYyEPp*FEqQ324LfbLGZlnl2rr4FS5hFO8u0ZTs!/r',
                'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL02oENRjq4FgVYfJRGAQkUFIHqSHOgKJN7PwN8eneBAJ3Xuao69KnlIiWFTLek*xbA!/r',
                'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL0U9WK413d9yuItDSS6iVc8eijth7NxjoSIIegtYx1e5ge50x9TYGSoI1tspf4Eo4Y!/r',
                'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL3iIKgpjMwyrYqipU5hEly9ayItSyv33FzZ4ib5F9ve2AlY40CT8VGvo4aYHsf4PaI!/r',
                'http://m.qpic.cn/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcWo.8232YNIC*jkUYG2CaL1gQqPp*29X8poNeV1JgSwuGeLqduMlr1RfAksUAUYIEPN37EwlqtdvxQ8SPnTaRYw!/b&bo=OAQFBTgEBQUBKQ4!&rf=viewer_4',
                'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8Mn1xgktufw23sOXfGiwfYDceE0Sm9dtSOJoxNd6a7mGPCV7NonZqctFYy6dWw2wn8!/r',
                'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8OEqMkdr*5dA3.jQ3lK3l3d1xwMgnjGXM*Y9JKOWn5MTRAO1dRfUGwgWxQMZXcIruI!/r',
                'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8OSyjf8imUzh5VQeto*9CH6YmXSw9chNfjsZZaZbpwP1*tcOKZUfgBNpQu6qOdbkn8!/r',
                'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcddykwK5pChyfjlr.MGCQ8MmLdH4z*DD*NoKPNIx.71uvCzHA4Lbvag7wPzA.B9B1LLHvxmZlw5RV9ozcVBUx1w!/r'
            ],

            // 计时的data
            statusBarHeight: getApp().globalData.statusBarHeight,

            lineHeight: getApp().globalData.lineHeight,
            logsa: {},

            //放云端的logs
            clockshow: false,

            clockHeight: 0,
            time: '5',
            mTime: 300000,
            timeStr: '05:00',
            timer: null,
            rate: '',
            taskshow: '番茄时钟',

            task: [
                {
                    name: '工作'
                },
                {
                    name: '学习'
                },
                {
                    name: '休息'
                },
                {
                    name: '睡觉'
                },
                {
                    name: '写bug'
                },
                {
                    name: '修bug'
                }
            ],

            cateActive: '0',
            okShow: false,
            pauseShow: false,
            continueCancelShow: false,
            userInfo: {},
            hasUserInfo: false,
            isRuning: false,
            pickershow: false,

            // 自习室的data
            studynavState: 5,

            room: [
                {
                    roomlable: '学习',
                    roomlist: [
                        {
                            group_name: '六级',
                            introduce: '每天50个单词',
                            roomNum: '99',
                            imgUrl: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334166.jpg?sign=2c62d981969547d39dd8963604d4d644&t=1649941917'
                        }
                    ]
                },
                {
                    roomlable: '运动',
                    roomlist: [
                        {
                            group_name: '跑步',
                            introduce: '每天两公里',
                            roomNum: '99',
                            imgUrl: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'
                        }
                    ]
                },
                {
                    roomlable: '娱乐',
                    roomlist: [
                        {
                            group_name: '六级',
                            introduce: '每天50个单词',
                            roomNum: '99',
                            imgUrl: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334168.jpg?sign=e827576c04b49178377da50924629615&t=1649942001'
                        }
                    ]
                },
                {
                    roomlable: '日常',
                    roomlist: [
                        {
                            group_name: '六级',
                            introduce: '每天50个单词',
                            roomNum: '99',
                            imgUrl: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'
                        }
                    ]
                },
                {
                    roomlable: '游戏',
                    roomlist: [
                        {
                            group_name: '六级',
                            introduce: '每天50个单词',
                            roomNum: '99',
                            imgUrl: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'
                        }
                    ]
                },
                {
                    roomlable: '其他',
                    roomlist: [
                        {
                            group_name: '六级',
                            introduce: '每天50个单词',
                            roomNum: '99',
                            imgUrl: 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'
                        }
                    ]
                }
            ],

            cardlist: [
                {
                    cardname: '卡片一'
                },
                {
                    cardname: '卡片二'
                },
                {
                    cardname: '卡片三'
                }
            ],

            myroomlist: [
                // {roomname:'四级必过',roomintroduce:'每天打卡一小时单词',imageurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/tomato_daka/%E5%9B%BE%E7%89%87/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_202204022334164.jpg?sign=620bbc816e83dea9b521e516814b7af2&t=1649941236'},
            ],

            showgroup: {
                introduce: '',
                peo: '',
                roomNum: '',
                wxname: '',
                uuid: '',
                groupMember: []
            },

            animationData: {},
            showgroup: false,

            //我的小组数据渲染
            myGroupArr: [
                // {bgurl:'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/%E5%BC%95%E5%AF%BC%E9%A1%B5%E5%9B%BE%E7%89%87/56d8e29adaff58e3d6700082f20728c.jpg?sign=bf77187b01bd0933542d057881f3b6dc&t=1652459417',groupName:'一个进化中的编程星球',wxname:'名字',wxurl:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKKOWAmUxaHaIukl0M80BT6eIw8zW30E3muSOWLmEfhU60syBGHnGx3PJxIFPFt1tn9cwh45ibZ1Qg/132',groupIntro:"介绍"}
            ],

            storageInfo: '',
            isupdate: false,
            timetableAnimation: '',
            curriLeft: '',
            memberarr: '',
            datalength: '',
            isExist: '',
            translateY: '',
            ctx: '',
            canvas: '',
            wpx: '',
            ctx2: '',
            canvas2: '',
            click_b: false,
            click_c: false,
            click_d: false,
            animation: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    //监听加载页
    onLoad() {
        // 判断登录
        app.globalData.loginState();
        var res = uni.getSystemInfoSync(); //获取设备的信息

        var rate = 750 / res.windowWidth;
        this.setData({
            rate: rate,
            clockHeight: rate * res.windowHeight
        });
        let that = this;
        uni.getStorage({
            key: 'args',

            success(res) {
                that.setData({
                    storageInfo: res.data
                });
            },

            fail(err) {
                console.log('失败失败失败');
            }
        });
        let username = uni.getStorageSync('args').username;
        console.log(username);
        this.todayFun();
        this.getDaka_record();
        this.getgroupdata().then((res) => {
            uni.hideLoading();
        });
        uni.setNavigationBarTitle({
            title: 'We打卡'
        });
        movedistance = 0; // 解决切换到其它页面再返回该页面动画失效的问题
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let dakaArr = this.dakaArr;
        uni.setStorageSync('dakaArr', dakaArr);
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1]; //当前页面

        let json = currPage.data.mydata;

        if (json) {
            this.taskdata.push(json);
            console.log(this.taskdata);
            this.setData({
                taskdata: this.taskdata
            });
            currPage.data.mydata = null;
            console.log(currPage.data.mydata);
        }

        console.log(this.isupdate);

        if (this.isupdate) {
            this.getgroupdata().then((res) => {
                uni.hideLoading();
            });
            this.setData({
                isupdate: false
            });
        }
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
    onPullDownRefresh: function () {
        uni.showLoading({
            title: '加载中',
            mask: true
        });
        this.getDaka_record().then((res) => {
            uni.hideLoading();
        });
        setTimeout(function () {
            uni.hideNavigationBarLoading();
            uni.stopPullDownRefresh();
        }, 1000);
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    // 计时js开始
    //计时js结束
    onShareAppMessage: function () {},
    methods: {
        getMyGroupArr() {
            let args = uni.getStorageSync('args');
            wx.cloud
                .callFunction({
                    name: 'daka',
                    data: {
                        type: 'getMyGroupByUserNum',
                        usernum: args.username
                    }
                })
                .then((res) => {
                    console.log(res.result);
                    let data = res.result.data;
                    let length = data.length;
                    let myGroup = [];
                    let myGroup1 = [];

                    for (let i = 0; i < length; i++) {
                        let group = {
                            bgurl: data[i].bgurl,
                            groupName: data[i].group_name,
                            wxname: data[i].wxname,
                            wxurl: data[i].wxurl,
                            groupIntro: data[i].groupIntro,
                            uuid: data[i].uuid,
                            groupUsername: data[i].groupUsername
                        };
                        let group1 = {
                            roomname: data[i].group_name,
                            roomintroduce: data[i].groupIntro,
                            imageurl: data[i].bgurl,
                            uuid: data[i].uuid,
                            groupUsername: data[i].groupUsername
                        };
                        myGroup.push(group);
                        myGroup1.push(group1);
                    }

                    this.setData({
                        myGroupArr: myGroup
                    });
                    this.setData({
                        myroomlist: myGroup1
                    });
                });
        },

        //个人信息栏滑动方法
        // 弹出 - 设置页面
        seetingHandler: function (e) {
            console.log('已点击设置按钮'); // 封装 timetable 和 curriLeft 的动画

            const animationFunc = (px, scale, opacity1, opacity2, height, width) => {
                var timetableAnimation = uni
                    .createAnimation({
                        duration: 500,
                        timingFunction: 'ease',
                        delay: 100
                    })
                    .translateX(px)
                    .scale(scale)
                    .opacity(opacity1)
                    .height(height)
                    .step()
                    .export();
                var curriLeft = uni
                    .createAnimation({
                        duration: 500,
                        timingFunction: 'ease',
                        delay: 1000
                    })
                    .translateX(px)
                    .translateY(-20)
                    .opacity(opacity2)
                    .step()
                    .export();
                this.setData({
                    timetableAnimation,
                    curriLeft,
                    isAnimate_ke: !this.isAnimate_ke
                }); // this.data.isAnimate = !this.data.isAnimate;     // 更新 isAnimate 状态
            };

            if (this.isAnimate_ke) {
                animationFunc('none', 1, 1, 0, '100%', '100%');
            } else {
                animationFunc(270, 0.88, 0.7, 1, '100%', 150);
            }
        },

        // 触摸开始事件
        touchStartCurri_ke: function (e) {
            startXCurri = e.touches[0].pageX; // 获取触摸时的原点

            moveFlagCurri = true;
        },

        // 触摸移动事件
        touchMoveCurri_ke: function (e) {
            endXCurri = e.touches[0].pageX; // 获取触摸时的原点

            if (moveFlagCurri) {
                if (startXCurri - endXCurri > 50) {
                    moveFlagCurri = false;
                    this.seetingHandler();
                    moveFlagCurri = true;
                }
            }
        },

        // 触摸结束事件
        touchEndCurri_ke: function (e) {
            moveFlagCurri = true; // 回复滑动事件
        },

        //自习室小组的js
        myGroup(e) {
            console.log(e);
            let groupData = this.myGroupArr[e.currentTarget.dataset.index];
            console.log(groupData);
            var thisGroupData = JSON.stringify(groupData);
            uni.navigateTo({
                url: '../myGroup/myGroup?thisGroupData=' + thisGroupData
            });
        },

        //创建小组
        goToCreateRoom() {
            uni.navigateTo({
                url: '../createRoom/createRoom'
            });
        },

        //获取小组信息数据
        async getmember() {
            //heng
            let result = await wx.cloud.callFunction({
                name: 'daka',
                data: {
                    type: 'getmember'
                }
            });
            console.log(result);
            this.setData({
                memberarr: result.result.data
            });
            console.log(this.memberarr); //heng

            let result1 = await wx.cloud.callFunction({
                name: 'daka',
                data: {
                    type: 'getmember'
                }
            });
            let res = result1.result;
            console.log(res);
            this.setData({
                memberarr: res.data
            });
            console.log(this.memberarr); // wx.cloud.database().collection('daka_group_member_information').get().then(res =>{
            //   // console.log(res);
            //   this.setData({
            //     memberarr:res.data
            //   })
            //   console.log(this.data.memberarr);
            // })
        },

        async getgroupdata() {
            uni.showLoading({
                title: '加载中',
                mask: true
            });
            console.log('触发'); //heng

            let result = await wx.cloud.callFunction({
                name: 'daka',
                data: {
                    type: 'getgroupdata'
                }
            });
            let res = result.result;
            let a = res.data;
            this.processingData(a);
            this.getmember();
            this.getMyGroupArr(); // wx.hideLoading();
            //heng
            // let result1 = await wx.cloud.callFunction({
            //   name:"daka",
            //   data:{
            //     type:"getgroupdata",
            //   }
            // })
            // let res1 = result1.result;
            // console.log(res1);
            // let b = res1.data;
            // this.processingData(b);
            // this.getmember();
            // wx.hideLoading();
            // wx.cloud.database().collection('data_group_information').get().then(res =>{
            //   console.log(res);
            //   let a = res.data;
            //   this.processingData(a);
            //   this.getmember();
            //   wx.hideLoading();
            // })
        },

        processingData(a) {
            var sum = [];
            let c = [];
            let res = {};

            for (var i = 0; i < a.length; i++) {
                if (res[a[i]['qxbq']] == undefined) {
                    let re = [];
                    re.push(a[i]);
                    res[a[i]['qxbq']] = re;
                } else {
                    c = res[a[i]['qxbq']];
                    var sum = 0;
                    c.push(a[i]);
                    res[a[i]['qxbq']] = c;
                }
            }

            let room = [];

            for (var key in res) {
                let obj = {
                    roomlable: String(key),
                    roomlist: res[key]
                };
                room.push(obj);
            }

            console.log(room);
            this.setData({
                room: room
            });
        },

        //渲染小组弹窗数据
        getRoomlable(e) {
            // console.log(e);
            let roomindex = e.currentTarget.dataset.roomindex;
            let memberarr = this.memberarr;
            let groupMember = [];
            console.log(memberarr);

            for (let i = 0; i < memberarr.length; i++) {
                if (memberarr[i].uuid == this.room[roomindex].roomlist[roomlistindex].uuid) {
                    if (groupMember.length <= 13) {
                        let arr = memberarr[i];
                        groupMember.push(arr);
                    } else {
                        break;
                    }
                }
            }

            console.log(this.room[roomindex].roomlist[roomlistindex]);
            let showgroup = {
                wxname: this.room[roomindex].roomlist[roomlistindex].wxname,
                group_name: this.room[roomindex].roomlist[roomlistindex].group_name,
                introduce: this.room[roomindex].roomlist[roomlistindex].introduce,
                peo: groupMember.length,
                roomNum: this.room[roomindex].roomlist[roomlistindex].roomNum,
                uuid: this.room[roomindex].roomlist[roomlistindex].uuid,
                groupMember: groupMember,
                bgurl: this.room[roomindex].roomlist[roomlistindex].imgUrl,
                wxurl: this.room[roomindex].roomlist[roomlistindex].wxurl,
                groupUsername: this.room[roomindex].roomlist[roomlistindex].username
            };
            console.log(showgroup);
            this.setData({
                showgroup
            });
        },

        intoshowgroup(e) {
            // console.log(e);
            roomlistindex = e.currentTarget.dataset.roomlistindex;
            this.setData({
                showgroup: true
            });
        },

        tuishowgroup() {
            this.setData({
                showgroup: false
            });
        },

        //加入小组
        joinGroup() {
            var args = uni.getStorageSync('args');
            var uuid = this.showgroup.uuid;
            var username = args.username;
            var roomNum = this.showgroup.roomNum;
            var group_name = this.showgroup.group_name;
            uni.showLoading({
                title: '加入中',
                mask: true
            }); // var datalength = 0;

            console.log(uuid); //heng

            wx.cloud
                .callFunction({
                    name: 'daka',
                    data: {
                        type: 'getGroupMemberByUUID',
                        uuid: uuid
                    }
                })
                .then((res) => {
                    // let res = result.result;
                    // wx.cloud.database().collection('daka_group_member_information').where({uuid:uuid}).get()
                    // .then(res =>{
                    console.log(res);
                    var datalength = res.result.data.length;
                    var isExist = false;

                    for (let i = 0; i < res.result.data.length; i++) {
                        if (res.result.data[i].member_username == username) {
                            isExist = true;
                        }
                    }

                    this.setData({
                        datalength: datalength,
                        isExist: isExist
                    });
                    console.log(datalength);
                    console.log(isExist);
                })
                .then((res) => {
                    let bgurl = this.showgroup.bgurl;
                    let wxname = this.showgroup.wxname;
                    let wxurl = this.showgroup.wxurl;
                    let groupIntro = this.showgroup.introduce; // console.log(bgurl,wxname,wxurl,groupIntro);

                    let isExisted = this.isExist;
                    let datalength1 = this.datalength;
                    let groupUsername = this.showgroup.groupUsername; // 弹窗学号

                    if (!isExisted && datalength1 < roomNum) {
                        //heng
                        wx.cloud
                            .database()
                            .collection('daka_group_member_information')
                            .add({
                                data: {
                                    group_name: group_name,
                                    member_name: args.nickName,
                                    member_url: args.iconUrl,
                                    member_username: args.username,
                                    task: [],
                                    time_logs: [],
                                    totalTime: 0,
                                    uuid,
                                    bgurl: bgurl,
                                    wxname: wxname,
                                    wxurl: wxurl,
                                    groupIntro: groupIntro,
                                    groupUsername
                                }
                            })
                            .then((res) => {
                                let data = {
                                    group_name: group_name,
                                    member_name: args.nickName,
                                    member_url: args.iconUrl,
                                    member_username: args.username,
                                    task: [],
                                    time_logs: [],
                                    totalTime: 0,
                                    uuid
                                };
                                let showgroup = this.showgroup;
                                let memberarr = this.memberarr;
                                showgroup.groupMember.push(data);
                                memberarr.push(data);
                                this.setData({
                                    showgroup: showgroup,
                                    memberarr: memberarr
                                });
                                console.log(this.showgroup.groupMember);
                                uni.hideLoading({
                                    success: (res) => {
                                        uni.showToast({
                                            title: '加入成功',
                                            icon: 'none'
                                        });
                                    }
                                });
                            });
                    } else {
                        uni.hideLoading({
                            success: (res) => {
                                uni.showToast({
                                    title: '加入失败，已加入或已满人',
                                    icon: 'none'
                                });
                            }
                        });
                    }
                }); // })
        },

        // 卡片动画
        cardtouchstart(e) {
            console.log(e); // 获取触摸Y坐标

            this.recordY = e.touches[0].clientY;
            console.log(e.touches[0].clientY);
        },

        // 手指触摸后移动
        cardtouchmove(e) {
            let currentY = e.touches[0].clientY;
            console.log(currentY);
            movedistance = currentY - this.recordY; // 获取移动距离

            console.log(movedistance);
            this.cardslideAnimation(movedistance, 300); //右边的数字是移动速度
        },

        //手指触摸结束
        cardtouchend() {
            var self = this;
            var animation = uni.createAnimation({
                duration: 300,
                timingFunction: 'liner'
            });
            this.animation = animation;
            let recordY;

            if (movedistance >= 200) {
                // 移动达到距离就动画显示全部操作项
                this.animation.translateY(-220).rotate(-5).translateX(0).step(); //第一次动画 离开

                this.animation.translateY(0).translateX(0).rotate(0).step(); //第二次动画 复位

                this.setData({
                    animationData: this.animation.export() //.export清除动画
                });
                setTimeout(function () {
                    var cardlist = self.cardlist;
                    var slidethis = self.cardlist.shift(); //删掉第一个卡片

                    self.cardlist.push(slidethis); //把删掉的卡片加到最后

                    self.setData({
                        cardlist: self.cardlist,
                        animationData: {}
                    });
                }, 400);
                movedistance = 0; //滑动后右边显示的范围
            } else if (200 > movedistance) {
                // 移动未达到距离即还原
                recordY = 0;
                this.cardslideAnimation(recordY, 500);
            }
        },

        // 滑动动画
        cardslideAnimation(recordY, time) {
            console.log('触发cardslideAnimation');
            console.log(recordY);
            var animation = uni.createAnimation({
                duration: time,
                timingFunction: 'liner'
            });
            this.setData({
                translateY: recordY
            });
            this.animation = animation;
            this.animation.translateY(recordY).step(); // translate(0, recordY + 'rpx').step()

            this.setData({
                animationData: this.animation.export()
            });
        },

        navclick(e) {
            let studynavState = e.currentTarget.dataset.index;
            this.setData({
                studynavState
            });
        },

        more() {
            uni.navigateTo({
                url: '../allgroup/allgroup'
            });
        },

        // 计时的js
        clickpicker() {
            console.log('clickpicker');
            let pickershow = this.pickershow;
            this.setData({
                pickershow: !pickershow
            });
        },

        pickerdata(e) {
            console.log(e);
            this.setData({
                taskshow: e.currentTarget.dataset.task,
                pickershow: false
            });
        },

        init_canvas() {
            let wpx = uni.getSystemInfoSync().windowWidth / 375;
            let iconurl = uni.getStorageSync('args').iconUrl;
            const query = uni.createSelectorQuery();
            query
                .select('#bottombox_clock_bg')
                .fields({
                    node: true,
                    size: true
                })
                .exec((res) => {
                    console.log(res);
                    const canvas = res[0].node;
                    const ctx = canvas.getContext('2d');
                    const dpr = uni.getSystemInfoSync().pixelRatio;
                    canvas.width = res[0].width * dpr;
                    canvas.height = res[0].height * dpr;
                    ctx.scale(dpr, dpr);
                    this.setData({
                        ctx,
                        canvas,
                        wpx
                    });
                    this.new_drawbg(ctx);
                });
        },

        init_canvas2() {
            let wpx = uni.getSystemInfoSync().windowWidth / 375;
            const query = uni.createSelectorQuery();
            query
                .select('#bottombox_clock_active')
                .fields({
                    node: true,
                    size: true
                })
                .exec((res) => {
                    const canvas2 = res[0].node;
                    const ctx2 = canvas2.getContext('2d');
                    const dpr = uni.getSystemInfoSync().pixelRatio;
                    canvas2.width = res[0].width * dpr;
                    canvas2.height = res[0].height * dpr;
                    ctx2.scale(dpr, dpr);
                    this.setData({
                        ctx2,
                        canvas2
                    });
                });
        },

        //更新开始键点击事件
        start: function () {
            console.log('start');
            let ctx2 = this.ctx2;
            let isRuning = this.isRuning;

            if (!isRuning) {
                //开始计时
                this.setData({
                    pauseShow: true,
                    isRuning: true,
                    mTime: this.time * 60 * 1000,
                    timeStr: parseInt(this.time) >= 10 ? this.time + ':00' : '0' + this.time + ':00'
                });
                this.drawActive();
            } else {
                //放弃
                ctx2.clearRect(0, 0, 600, 600);
                clearInterval(this.timer);
                this.setData({
                    isRuning: false,
                    pauseShow: false,
                    continueCancelShow: false,
                    okShow: false,
                    mTime: this.time * 60 * 1000,
                    timeStr: parseInt(this.time) >= 10 ? this.time + ':00' : '0' + this.time + ':00'
                });
            }
        },

        //动态画圆
        async drawActive() {
            let ctx2 = this.ctx2;

            var _this = this; //此this指向该页的page

            var timer = setInterval(async function () {
                var angle = 1.5 + (2 * (_this.time * 60 * 1000 - _this.mTime)) / (_this.time * 60 * 1000);
                var currentTime = _this.mTime - 100;

                _this.setData({
                    mTime: currentTime
                });

                if (angle < 3.5) {
                    if (currentTime % 1000 == 0) {
                        var timeStr1 = currentTime / 1000; //s

                        var timeStr2 = parseInt(timeStr1 / 60); //得到一个整的分钟数

                        var timeStr3 = timeStr1 - timeStr2 * 60 >= 10 ? timeStr1 - timeStr2 * 60 : '0' + (timeStr1 - timeStr2 * 60);
                        var timeStr2 = timeStr2 >= 10 ? timeStr2 : '0' + timeStr2;

                        _this.setData({
                            timeStr: timeStr2 + ':' + timeStr3
                        });
                    }

                    var lineWidth = 13 / _this.rate;
                    ctx2.lineWidth = Number(lineWidth);
                    ctx2.strokeStyle = '#5879fa';
                    ctx2.lineCap = 'round'; //形状

                    ctx2.beginPath(); //开新路径

                    ctx2.arc(600 / _this.rate / 2, 600 / _this.rate / 2, 600 / _this.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false); //(圆心x，y，度数0，到2*math.PI,逆时针false)  一点一点得画

                    ctx2.stroke();
                } else {
                    uni.showLoading({
                        title: '上传数据中'
                    });
                    let logs = [
                        {
                            date: util.formatTime(new Date()),
                            cate: _this.taskshow,
                            // Number(_this.data.cateActive),
                            time: parseInt(_this.time)
                        }
                    ];
                    console.log(logs);
                    let date = util.formatTime(new Date());
                    let cate = _this.taskshow; // _this.data.cateActive

                    let storageInfo = _this.storageInfo;
                    let username = String(storageInfo.username); //heng

                    let result = await wx.cloud.callFunction({
                        name: 'daka',
                        data: {
                            type: 'getTotalTime_ByUserName'
                        }
                    });
                    let res = result.result; // wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{

                    let name = storageInfo.nickName;
                    let touxiangurl = storageInfo.iconUrl;
                    let len = res.data.length;
                    let totaltime = wx.cloud.database().collection('totaltime');
                    let totalTime = 0; // let logs=_this.data.logsa

                    const _ = wx.cloud.database().command;

                    if (len == 0) {
                        //用学号username判断用户在数据库有没有数据
                        console.log('123');
                        totaltime
                            .add({
                                data: {
                                    totalTime,
                                    logs: logs,
                                    name,
                                    touxiangurl,
                                    username: String(username)
                                }
                            })
                            .then((res) => {
                                console.log(res);
                                uni.hideLoading();
                            });
                    } else {
                        totaltime
                            .where({
                                username: username
                            })
                            .update({
                                data: {
                                    logs: _.push({
                                        date: date,
                                        cate: cate,
                                        time: parseInt(_this.time)
                                    })
                                }
                            })
                            .then((res) => {
                                console.log('添加成功');
                            });
                    } // })

                    _this.setData({
                        timeStr: '00:00',
                        okShow: true,
                        pauseShow: false,
                        continueCancelShow: false
                    });

                    clearInterval(timer);
                    uni.hideLoading();
                }
            }, 100);

            _this.setData({
                timer: timer
            });
        },

        new_drawbg(ctx) {
            var lineWidth = 13 / this.rate;
            ctx.lineWidth = Number(lineWidth);
            ctx.strokeStyle = '#d0dafd';
            ctx.lineCap = 'round'; //形状

            ctx.beginPath(); //开新路径

            ctx.arc(600 / this.rate / 2, 600 / this.rate / 2, 600 / this.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false); //(圆心x，y，度数0，到2*math.PI,逆时针false)

            ctx.stroke();
        },

        //更新滑动条时间
        slideChange: function (e) {
            this.setData({
                time: e.detail.value
            });
            this.setData({
                mTime: this.time * 60 * 1000,
                timeStr: parseInt(this.time) >= 10 ? this.time + ':00' : '0' + this.time + ':00'
            });
        },

        //更新点击选择做的事件获取index
        clickCate: function (e) {
            this.setData({
                cateActive: e.currentTarget.dataset.index
            });
            console.log(e);
        },

        //暂停
        pause: function () {
            clearInterval(this.timer);
            this.setData({
                pauseShow: false,
                //暂停框
                continueCancelShow: true,
                //继续放弃框
                okShow: false //返回框
            });
        },

        continueFun: function () {
            this.drawActive();
            this.setData({
                pauseShow: true,
                continueCancelShow: false,
                okShow: false
            });
        },

        ok: function () {
            let ctx2 = this.ctx2;
            ctx2.clearRect(0, 0, 600, 600);
            clearInterval(this.timer);
            this.setData({
                isRuning: false,
                pauseShow: false,
                continueCancelShow: false,
                okShow: false,
                clockshow: false
            });
        },

        // 事件处理函数
        bindViewTap() {
            uni.navigateTo({
                url: '../logs/logs'
            });
        },

        statistics: function () {
            uni.navigateTo({
                url: '../../tomato/logs/logs'
            });
        },

        rank: function () {
            uni.navigateTo({
                url: '../../tomato/rank/rank'
            });
        },

        text() {
            uni.navigateTo({
                url: '../text/text'
            });
        },

        async changeType(e) {
            let username = uni.getStorageSync('args').username; //heng

            let result = await wx.cloud.callFunction({
                name: 'daka',
                data: {
                    type: 'getTotalTime_ByUserName'
                }
            });
            let res = result.result; // wx.cloud.database().collection("totaltime").where({username:username}).get().then(res=>{

            let logs = res.data[0].logs; //console.log(this.data.list)
            // })
        },

        res(res) {
            console.log(res);
        },

        backto() {
            uni.navigateBack({
                delta: 1
            });
        },

        // tabbar js
        click_aFun: function (e) {
            //检验，如果处在侧栏信息栏，则划回
            if (this.isAnimate_ke) {
                this.seetingHandler();
            } //

            let navState = e.currentTarget.dataset.index;
            console.log('主页', navState);
            console.log(navState);
            this.setData({
                click_a: true,
                click_b: false,
                click_c: false,
                click_d: false,
                navState
            });
        },

        click_bFun: function (e) {
            //检验，如果处在侧栏信息栏，则划回
            if (this.isAnimate_ke) {
                this.seetingHandler();
            } //

            uni.showToast({
                title: '开发中，敬请期待',
                icon: 'none'
            });
            let navState = e.currentTarget.dataset.index;
            console.log('打卡页', navState);
            this.setData({
                click_a: false,
                click_b: true,
                click_c: false,
                click_d: false // navState
            });
        },

        click_cFun: function (e) {
            //检验，如果处在侧栏信息栏，则划回
            if (this.isAnimate_ke) {
                this.seetingHandler();
            } //

            uni.showToast({
                title: '开发中，敬请期待',
                icon: 'none'
            });
            let navState = e.currentTarget.dataset.index;
            console.log('云留言页', navState);
            this.setData({
                click_a: false,
                click_b: false,
                click_c: true,
                click_d: false // navState
            });
        },

        click_dFun: function (e) {
            //检验，如果处在侧栏信息栏，则划回
            if (this.isAnimate_ke) {
                this.seetingHandler();
            } //
            // wx.showToast({
            //   title: '开发中，敬请期待',
            //   icon: 'none',
            // })

            let navState = e.currentTarget.dataset.index;
            console.log('小组页', navState);
            this.setData({
                click_a: false,
                click_b: false,
                click_c: false,
                click_d: true,
                navState
            });
        },

        //日历初始化
        zero: function (i) {
            return i >= 10 ? i : '0' + i;
        },

        todayFun: function () {
            let DATE = this.defaultValue ? new Date(this.defaultValue) : new Date();
            let year = DATE.getFullYear();
            let month = DATE.getMonth() + 1;
            let date = DATE.getDate();
            let today = year + '/' + this.zero(month) + '/' + this.zero(date);
            let dayarr = [today];
            var weekArray = new Array('日', '一', '二', '三', '四', '五', '六');
            var week = weekArray[new Date(today).getDay()];
            console.log(week);
            console.log('今天周', week);
            console.log(today);
            this.setData({
                today,
                spot: dayarr,
                week
            });
        },

        dateChange(e) {
            console.log('选中日期变了,现在日期是', e.detail.dateString);
            this.setData({
                dateString: e.detail.dateString
            });
        },

        //下面是打卡js
        //计时入口动画
        plus: function (e) {
            //检验，如果处在侧栏信息栏，则划回
            if (this.isAnimate_ke) {
                this.seetingHandler();
            } //

            let navState = e.currentTarget.dataset.index;
            console.log('计时页', navState);
            uni.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#ff0000',
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            });
            this.setData({
                click_a: false,
                click_b: false,
                click_c: false,
                click_d: false,
                navState
            });

            if (this.isPopping) {
                //缩回动画
                this.popp();
                this.setData({
                    isPopping: false
                });
            } else if (!this.isPopping) {
                //弹出动画
                this.takeback();
                this.setData({
                    isPopping: true
                });
            }

            this.init_canvas();
            this.init_canvas2();
        },

        input: function () {
            uni.navigateTo({
                url: '../../tomato/logs/logs'
            });
        },

        transpond: function () {
            uni.navigateTo({
                url: '../../tomato/index/index'
            });
        },

        collect: function () {
            uni.navigateTo({
                url: '../../tomato/rank/rank'
            });
        },

        //弹出动画
        popp: function () {
            //plus顺时针旋转
            var animationPlus = uni.createAnimation({
                duration: 500,
                timingFunction: 'ease-out'
            });
            var animationcollect = uni.createAnimation({
                duration: 500,
                timingFunction: 'ease-out'
            });
            var animationTranspond = uni.createAnimation({
                duration: 500,
                timingFunction: 'ease-out'
            });
            var animationInput = uni.createAnimation({
                duration: 500,
                timingFunction: 'ease-out'
            });
            animationPlus.rotateZ(135).step();
            animationcollect.translate(-100, -100).rotateZ(180).opacity(1).step();
            animationTranspond.translate(-140, 0).rotateZ(180).opacity(1).step();
            animationInput.translate(-100, 100).rotateZ(180).opacity(1).step();
            this.setData({
                animPlus: animationPlus.export(),
                animCollect: animationcollect.export(),
                animTranspond: animationTranspond.export(),
                animInput: animationInput.export()
            });
        },

        //收回动画
        takeback: function () {
            //plus逆时针旋转
            var animationPlus = uni.createAnimation({
                duration: 500,
                timingFunction: 'ease-out'
            });
            var animationcollect = uni.createAnimation({
                duration: 500,
                timingFunction: 'ease-out'
            });
            var animationTranspond = uni.createAnimation({
                duration: 500,
                timingFunction: 'ease-out'
            });
            var animationInput = uni.createAnimation({
                duration: 500,
                timingFunction: 'ease-out'
            });
            animationPlus.rotateZ(-45).step();
            animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
            animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
            animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
            this.setData({
                animPlus: animationPlus.export(),
                animCollect: animationcollect.export(),
                animTranspond: animationTranspond.export(),
                animInput: animationInput.export()
            });
        },

        //一键分享校园圈
        savecanvas: function () {
            let that = this;
            let w = uni.getSystemInfoSync().windowWidth / 375;
            let args = uni.getStorageSync('args');
            uni.canvasToTempFilePath({
                canvas: that.canvas,
                width: that.canvasWidth,
                height: that.canvasHeight,
                destHeight: that.canvasHeight * 4,
                destWidth: that.canvasWidth * 4,
                quality: 1,
                success: function (res) {
                    // wx.saveImageToPhotosAlbum({
                    //     filePath: res.tempFilePath,
                    //     success(result){
                    //       wx.showToast({
                    //         title: '图片保存成功',
                    //         icon: 'success',
                    //         duration: 2000
                    //       })
                    //     }
                    //   })
                    uni.getImageInfo({
                        src: res.tempFilePath
                    }).then((res) => {
                        console.log(res);
                        let photo = {
                            tempFiles: res.path,
                            imageHeight: res.height,
                            imageWidth: res.width
                        };

                        if (app.globalData.allList) {
                            uni.navigateTo({
                                url:
                                    '/pages/more/pages/PublishContent/PublishContent?tempFiles=' +
                                    photo.tempFiles +
                                    '&imageHeight=' +
                                    photo.imageHeight +
                                    '&imageWidth=' +
                                    photo.imageWidth
                            });
                        } else {
                            // 标签兜底
                            if (args.tabitem) {
                                args.tabitem;
                            } else {
                                args['tabitem'] = ['全部', '日常', '开学季', '打卡'];
                            } // 初始化allList

                            let allList = args.tabitem.map((item, index) => {
                                let allList = [];
                                return (allList[index] = []);
                            });
                            app.globalData.allList = allList;
                            uni.navigateTo({
                                url:
                                    '/pages/more/pages/PublishContent/PublishContent?tempFiles=' +
                                    photo.tempFiles +
                                    '&imageHeight=' +
                                    photo.imageHeight +
                                    '&imageWidth=' +
                                    photo.imageWidth
                            });
                        }
                    });
                }
            });
        },

        //canvas初始化
        sharecanvas_new() {
            uni.showLoading({
                title: '生成中',
                mask: true
            });
            let that = this;
            let wpx = uni.getSystemInfoSync().windowWidth / 375;
            let iconurl = uni.getStorageSync('args').iconUrl;
            const query = uni.createSelectorQuery();
            query
                .select('#shareCanvas')
                .fields({
                    node: true,
                    size: true
                })
                .exec((res) => {
                    const canvas = res[0].node;
                    const ctx = canvas.getContext('2d');
                    const dpr = uni.getSystemInfoSync().pixelRatio;
                    console.log(canvas);
                    canvas.width = res[0].width * dpr;
                    canvas.height = res[0].height * dpr;
                    ctx.scale(dpr, dpr);
                    this.setData({
                        ctx,
                        canvas,
                        wpx
                    });
                    this.draw_new_bg(ctx, canvas, wpx); //开始画图
                });
        },

        draw_new_bg(ctx, canvas, wpx) {
            let num = Math.floor(Math.random() * 9);
            let inum = Math.floor(Math.random() * 7);
            let Wetext = '—— We校园每日分享';
            let nickName = uni.getStorageSync('args').nickName;
            let bgurl = this.arr[num];
            const bgimg = canvas.createImage();
            bgimg.src = bgurl;

            bgimg.onload = () => {
                //底层背景色块
                ctx.save();
                ctx.beginPath(); //开始创建一个路径

                this.roundRect(ctx, 0 * wpx, 0 * wpx, this.canvas.width * wpx, this.canvas.height * wpx, 2); //圆角

                ctx.fillStyle = '#379d88';
                ctx.fillRect(0 * wpx, 0 * wpx, this.canvas.width * wpx, this.canvas.height * wpx);
                ctx.clip(); //裁剪

                ctx.closePath();
                ctx.restore(); //上面背景

                ctx.save();
                ctx.beginPath(); //开始创建一个路径

                this.roundRect(ctx, 10 * wpx, 10 * wpx, 260 * wpx, 50 * wpx, 5, wpx); //圆角

                ctx.clip(); //裁剪

                ctx.fillStyle = '#f4f6f5';
                ctx.fillRect(0 * wpx, 0 * wpx, this.canvas.width * wpx, this.canvas.height * wpx);
                ctx.closePath();
                ctx.restore(); //下面背景

                ctx.save();
                ctx.beginPath(); //开始创建一个路径

                this.roundRect(ctx, 10 * wpx, 60 * wpx, 260 * wpx, 280 * wpx, 5, wpx); //圆角

                ctx.clip(); //裁剪

                ctx.fillStyle = '#fff';
                ctx.fillRect(0 * wpx, 0 * wpx, this.canvas.width * wpx, this.canvas.height * wpx); // ctx.drawImage(bgimg,10*wpx,10*wpx,260*wpx,330*wpx);//画背景

                ctx.closePath();
                ctx.restore();
                this.draw_we_iconurl(ctx, canvas, wpx); //We校园图标

                this.drawiconurl(ctx, canvas, wpx); //画头像

                ctx.fillStyle = 'black';
                ctx.font = String(15 * wpx) + 'px Arial';
                ctx.fillText('We 打卡', 66 * wpx, 40 * wpx);
                ctx.font = String(13 * wpx) + 'px Arial';
                ctx.fillText(nickName, 64 * wpx, 274 * wpx); //画wx名字

                ctx.font = String(11 * wpx) + 'px Arial';
                ctx.fillText(this.daytext[inum].Eng_daytext, 20 * wpx, 88 * wpx); //英文语句

                ctx.font = String(9 * wpx) + 'px Arial';
                ctx.fillText(this.daytext[inum].Ch_daytext, 20 * wpx, 110 * wpx); //中文语句

                ctx.fillStyle = 'gray';
                ctx.font = String(9 * wpx) + 'px Arial ';
                ctx.fillText(Wetext, 172 * wpx, 120 * wpx); //we校园每日分享
                //图片

                ctx.save();
                ctx.beginPath(); //开始创建一个路径

                this.roundRect(ctx, 10 * wpx, 133 * wpx, 260 * wpx, 113 * wpx, 1); //圆角

                ctx.clip(); //裁剪

                ctx.drawImage(bgimg, 10 * wpx, 10 * wpx, 260 * wpx, 330 * wpx); //这个要与上面背景位置大小保持一致

                ctx.globalAlpha = '0';
                ctx.fillStyle = '#ffff';
                ctx.fillRect(10 * wpx, 228 * wpx, 260 * wpx, 113 * wpx); //色块

                ctx.closePath();
                ctx.restore(); //透明色块里面的字体

                ctx.fillStyle = 'black';
                ctx.globalAlpha = '1'; // ctx.font='30px Arial'

                ctx.font = String(11 * wpx) + 'px Arial';
                ctx.fillText(this.task_name, 16 * wpx, 310 * wpx); //任务名字

                ctx.font = String(9 * wpx) + 'px Arial';
                ctx.fillStyle = 'gray';
                ctx.fillText('任务', 18 * wpx, 330 * wpx); //任务

                ctx.fillText('打卡时间', 83 * wpx, 330 * wpx);
                ctx.font = String(11 * wpx) + 'px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText(this.dakatime, 83 * wpx, 310 * wpx); //打卡时间

                ctx.font = String(9 * wpx) + 'px Arial';
                ctx.fillStyle = 'gray';
                ctx.fillText('坚持天数', 155 * wpx, 330 * wpx); //坚持天数

                ctx.font = String(11 * wpx) + 'px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText(this.dakacount, 155 * wpx, 310 * wpx); //打卡天数
                //两个圆模拟打孔

                ctx.save();
                ctx.beginPath(); //开始创建一个路径

                ctx.arc(10 * wpx, 60 * wpx, 10 * wpx, 0, Math.PI * 2, false);
                ctx.arc(270 * wpx, 60 * wpx, 10 * wpx, 0, Math.PI * 2, false);
                ctx.clip(); //裁剪

                ctx.fillStyle = '#379d88';
                ctx.fillRect(0 * wpx, 0 * wpx, this.canvas.width * wpx, this.canvas.height * wpx);
                ctx.closePath();
                ctx.restore(); //模拟裁剪虚线

                ctx.strokeStyle = 'gray';
                ctx.setLineDash([3, 5]);
                ctx.lineDashOffset = 1;
                ctx.beginPath();
                ctx.moveTo(20 * wpx, 60 * wpx);
                ctx.lineTo(260 * wpx, 60 * wpx);
                ctx.stroke();
                uni.hideLoading(); //二维码

                this.draw_we_codeurl(ctx, canvas, wpx);
            };
        },

        drawiconurl(ctx, canvas, wpx) {
            console.log('drawiconurl');
            let iconurl = uni.getStorageSync('args').iconUrl;
            const headerImg = canvas.createImage();
            headerImg.src = iconurl;

            headerImg.onload = () => {
                ctx.save();
                ctx.beginPath(); //开始创建一个路径

                ctx.arc(31 * wpx, 270 * wpx, 14 * wpx, 0, 2 * Math.PI, false); //画一个圆形裁剪区域

                ctx.clip(); //裁剪

                ctx.fillStyle = '#389e89';
                ctx.fillRect(0 * wpx, 0 * wpx, this.canvas.width * wpx, this.canvas.height * wpx);
                ctx.drawImage(headerImg, 17.7 * wpx, 257 * wpx, 27 * wpx, 27 * wpx);
                ctx.closePath();
                ctx.restore();
            };
        },

        draw_we_iconurl(ctx, canvas, wpx) {
            console.log('drawiconurl');
            let we_iconurl =
                'http://r.photo.store.qq.com/psc?/V54MznzN3PdMk03thBUu1QsVIG3pK07u/45NBuzDIW489QBoVep5mcVSbqQOOiiPu97WXvRV9QiIZBX1umL4FZZY5hDkMBOsWWiaOGBzThG76xs176TsOiBBWM50wNm7v1AfDmY5EuRg!/r';
            const headerImg = canvas.createImage();
            headerImg.src = we_iconurl;

            headerImg.onload = () => {
                ctx.drawImage(headerImg, 20 * wpx, 18 * wpx, 33 * wpx, 33 * wpx);
            };
        },

        draw_we_codeurl(ctx, canvas, wpx) {
            console.log('drawiconurl');
            let we_iconurl = 'https://636c-cloud1-6gtqj1v4873bad50-1307814679.tcb.qcloud.la/gh_2927abcc72c9_258.jpg?sign=b685101cc1b9e449b4ae4ef0700028f2&t=1647171838';
            const headerImg = canvas.createImage();
            headerImg.src = we_iconurl;

            headerImg.onload = () => {
                ctx.drawImage(headerImg, 220 * wpx, 292.5 * wpx, 40 * wpx, 40 * wpx);
            };
        },

        roundRect(ctx, x, y, w, h, r, wpx) {
            // 开始绘制
            ctx.beginPath(); // 因为边缘描边存在锯齿，最好指定使用 transparent 填充

            ctx.setFillStyle = 'transparent';
            ctx.setStrokeStyle = 'transparent'; // 绘制左上角圆弧

            ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false); // 绘制border-top

            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.lineTo(x + w, y + r); // 绘制右上角圆弧

            ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2); // 绘制border-right

            ctx.lineTo(x + w, y + h - r);
            ctx.lineTo(x + w - r, y + h); // 绘制右下角圆弧

            ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5); // 绘制border-bottom

            ctx.lineTo(x + r, y + h);
            ctx.lineTo(x, y + h - r); // 绘制左下角圆弧

            ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI); // 绘制border-left

            ctx.lineTo(x, y + r);
            ctx.lineTo(x + r, y);
            ctx.closePath(); // 剪切

            ctx.clip();
        },

        startFun: function (e) {
            console.log(e.currentTarget.id);
            this.setData({
                currentIndex: e.currentTarget.id
            });
            console.log(this.currentid);
        },

        //滑块移动中执行的事件
        moveFun: function (e) {
            //如果验证成功后仍允许滑动，则执行下面代码块（初始值默认为允许）
            if (this.pullStatus) {
                this.x = e.changedTouches[0].clientX - (this.sysW * 0.1 + 25);

                if (this.x >= this.w) {
                    this.xAxial = this.w;
                } else {
                    this.xAxial = this.x;
                }

                if (this.x < 25) {
                    this.xAxial = 0;
                }

                this.cssAnimation = 'translate3d(' + this.xAxial + 'px, 0, 0)';
                this.setData({
                    cssAnimation: this.cssAnimation
                });
            }
        },

        endFun: function (res) {
            let id = res.currentTarget.id;
            var detail = {};
            let isDaka = this.taskdata;
            isDaka = isDaka[id].task_isDaka; //如果触摸的X轴坐标大于等于限定的可移动范围，则验证成功

            if (this.x >= this.w && !isDaka) {
                this.xAxial = this.w;
                this.succeedMsg = '';
                detail.msg = true;
                this.daka_prompt(res);
                console.log(res);
                this.xAxial = 0;
                this.setData({
                    x: 0
                });
            } else {
                this.xAxial = 0;
                this.succeedMsg = '';
                detail.msg = false;
            }

            this.$emit('myevent', {
                detail: detail
            }); //根据获取到的X轴坐标进行动画演示

            this.cssAnimation = 'translate3d(' + this.xAxial + 'px, 0, 0)';
            this.setData({
                succeedMsg: this.succeedMsg,
                cssAnimation: this.cssAnimation
            });
        },

        complete_share_close() {
            this.setData({
                showModel2: false
            });
        },

        attention() {
            let showModal3 = this.showModel3;

            if (!showModal3) {
                this.setData({
                    showModel3: true
                });
            } else {
                this.setData({
                    showModel3: false
                });
            }
        },

        // 手指触摸动作开始
        touchstartX(e) {
            this.setData({
                currentIndex: e.currentTarget.dataset.index
            });
            console.log(e.currentTarget.dataset.index); // 获取触摸X坐标

            this.recordX = e.touches[0].clientX;
        },

        // 点击操作
        resetX() {
            this.slideAnimation(0, 500); //（点击后距左边距离，到达点击后距左边距离的速度越小越快）
        },

        // 手指触摸后移动
        touchmoveX(e) {
            let currentX = e.touches[0].clientX;
            movedistance = currentX - this.recordX; // 获取移动距离

            this.slideAnimation(movedistance, 500); //右边的数字是移动速度
        },

        // 手指触摸动作结束
        touchendX() {
            let recordX;

            if (movedistance <= -50) {
                // 移动达到距离就动画显示全部操作项
                recordX = -130; //滑动后右边显示的范围
            } else if (-50 < movedistance) {
                // 移动未达到距离即还原
                recordX = 0;
            }

            this.slideAnimation(recordX, 500);
        },

        // 滑动动画
        slideAnimation(recordX, time) {
            let animation = uni.createAnimation({
                duration: time,
                timingFunction: 'liner'
            });
            animation.translate(recordX + 'rpx', 0).step();
            this.setData({
                animation: animation.export()
            });
        },

        add_task() {
            uni.navigateTo({
                url: '../record/record'
            });
        },

        // 获取当天时间，看是否可以打卡
        // 注意：当滑动时执行：故不用进行判断是否重复打卡
        async allowDaka(res) {
            let dakatime = util.dakaTime(new Date());
            console.log(dakatime);
            this.setData({
                dakatime: dakatime
            });
            console.log(res);
            var id = Number(res.currentTarget.id);
            console.log(id);
            var taskdata = this.taskdata;
            var data = taskdata[id];
            console.log(data);
            var nowDate = new Date();
            var day = nowDate.getDay();
            console.log('今天星期' + day); //1.获取res的里面的关于打卡学号、周期、任务的信息

            let hashid = data.task_hashId;
            var cycle = data.task_cycle; //2.看今日day是否在cycle里面
            //由于页面渲染的数据来源于username，故不用判断

            if (cycle.length == 1 && cycle[0] == '每天') {
                this.daka(hashid);
                console.log('真打卡好了');
                let tasktemp = this.taskdata;
                tasktemp[id].task_isDaka = true;
                this.setData({
                    taskdata: tasktemp
                });
                uni.setStorageSync('dakaArr', tasktemp);
                return;
            } //先判断周期能不能打再进行是否二次打卡判断

            for (var i = 0; i < cycle.length; i++) {
                if (cycle[i] == '周一' && day == 1) {
                    this.daka(hashid);
                    console.log('真打卡好了');
                    let tasktemp = this.taskdata;
                    tasktemp[id].task_isDaka = true;
                    this.setData({
                        taskdata: tasktemp
                    });
                    uni.setStorageSync('dakaArr', tasktemp);
                    return;
                } else if (cycle[i] == '周二' && day == 2) {
                    this.daka(hashid);
                    console.log('真打卡好了');
                    let tasktemp = this.taskdata;
                    tasktemp[id].task_isDaka = true;
                    this.setData({
                        taskdata: tasktemp
                    });
                    uni.setStorageSync('dakaArr', tasktemp);
                    return;
                } else if (cycle[i] == '周三' && day == 3) {
                    this.daka(hashid);
                    console.log('真打卡好了');
                    let tasktemp = this.taskdata;
                    tasktemp[id].task_isDaka = true;
                    this.setData({
                        taskdata: tasktemp
                    });
                    uni.setStorageSync('dakaArr', tasktemp);
                    return;
                } else if (cycle[i] == '周四' && day == 4) {
                    this.daka(hashid);
                    console.log('真打卡好了');
                    let tasktemp = this.taskdata;
                    tasktemp[id].task_isDaka = true;
                    this.setData({
                        taskdata: tasktemp
                    });
                    uni.setStorageSync('dakaArr', tasktemp);
                    return;
                } else if (cycle[i] == '周五' && day == 5) {
                    this.daka(hashid);
                    console.log('真打卡好了');
                    let tasktemp = this.taskdata;
                    tasktemp[id].task_isDaka = true;
                    this.setData({
                        taskdata: tasktemp
                    });
                    uni.setStorageSync('dakaArr', tasktemp);
                    return;
                } else if (cycle[i] == '周六' && day == 6) {
                    this.daka(hashid);
                    console.log('真打卡好了');
                    let tasktemp = this.taskdata;
                    tasktemp[id].task_isDaka = true;
                    this.setData({
                        taskdata: tasktemp
                    });
                    uni.setStorageSync('dakaArr', tasktemp);
                    return;
                } else if (cycle[i] == '周日' && day == 0) {
                    this.daka(hashid);
                    console.log('真打卡好了');
                    let tasktemp = this.taskdata;
                    tasktemp[id].task_isDaka = true;
                    this.setData({
                        taskdata: tasktemp
                    });
                    uni.setStorageSync('dakaArr', tasktemp);
                    return;
                }
            }

            await uni.showToast({
                title: '根据任务开放时间，今日不能打卡~',
                icon: 'none',
                duration: 2000
            });
        },

        async daka(hashid) {
            let dakatime = util.formatTime(new Date());
            console.log(dakatime);
            let result = await wx.cloud
                .callFunction({
                    name: 'daka',
                    data: {
                        type: 'getDakaRecord_ByHashId',
                        hashId: hashid
                    }
                })
                .catch((err) => {
                    uni.showToast({
                        title: '网络请求失败',
                        icon: 'none'
                    });
                });
            console.log(result); //细节坑：预防第一次打卡没有daka_lastTime的情况

            var daka_lastTime = new Date(result.result.data[0].daka_lastTime); // console.log(daka_lastTime);

            if (daka_lastTime != null) {
                console.log(daka_lastTime); //获取最后一次打卡的日期

                var lastTime_year = daka_lastTime.getFullYear();
                var lastTime_month = daka_lastTime.getMonth() + 1;
                var lastTime_day = daka_lastTime.getDate(); // console.log("最后一次打卡时间是几号："+lastTime_day);
                //获取当天日期

                var nowDate = new Date();
                var nowYear = nowDate.getFullYear();
                var nowMonth = nowDate.getMonth() + 1;
                var nowDay = nowDate.getDate(); // console.log("今天是" + nowDay + "号");

                if (lastTime_year == nowYear && lastTime_month == nowMonth && lastTime_day == nowDay) {
                    uni.showToast({
                        title: '您今儿个打过卡了',
                        icon: 'none',
                        duration: 2000
                    });
                    return;
                }
            }

            wx.cloud.callFunction({
                name: 'daka',
                data: {
                    type: 'updateDakaRedord_ByHashId',
                    hashId: hashid
                },
                fail: (err) => {
                    uni.showToast({
                        icon: 'none',
                        title: '出错啦！请稍后重试'
                    });
                }
            }); //要是能成功打卡就打开弹窗可以选择分享

            this.setData({
                showModel2: true
            });
            this.sharecanvas_new(); // console.log('今日真打卡成功了！');
        },

        //打卡提示
        daka_prompt(res) {
            this.xAxial = 0; //打卡次数本地增加1 渲染到弹窗

            let id = res.currentTarget.id;
            let task_name = this.taskdata;
            task_name = task_name[id].task_name;
            console.log(task_name);
            let dakacount = this.taskdata;
            dakacount = dakacount[id].count + 1;
            this.setData({
                dakacount: dakacount,
                task_name: task_name
            });
            let that = this;
            console.log(res); // this.data.sharecanvas();

            uni.showModal({
                title: '提示',
                content: '是否确定打卡？',

                success(abc) {
                    if (abc.confirm) {
                        that.allowDaka(res);
                        that.slideAnimation(0, 500);
                    } else if (abc.cancel) {
                        console.log('用户点击取消');
                        that.pullStatus = true;
                    }
                }
            });
        },

        //打卡删除提示
        daka_delpromp(res) {
            console.log(res.currentTarget.id);
            let that = this;
            uni.showModal({
                title: '提示',
                content: '是否删除该打卡任务？',

                success(abc) {
                    if (abc.confirm) {
                        that.delDaka(res);
                        that.taskdata.splice(res.currentTarget.id, 1);
                        console.log(that.taskdata);
                        that.setData({
                            taskdata: that.taskdata
                        });
                        that.slideAnimation(0, 500);
                    } else if (abc.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        },

        //滑动删除
        delDaka(res) {
            var id = Number(res.currentTarget.id);
            var taskdata = this.taskdata;
            var data = taskdata[id];
            var hashid = data.task_hashId;
            wx.cloud
                .callFunction({
                    name: 'daka',
                    data: {
                        type: 'delDakaRecord_ByHashId',
                        hashId: hashid
                    }
                })
                .catch((err) => {
                    uni.showToast({
                        title: '网络请求失败',
                        icon: 'none'
                    });
                });
            console.log('删除：', id);
        },

        //获取数据交与页面渲染
        async getDaka_record() {
            let that = this;
            let username = uni.getStorageSync('args').username;

            if (username) {
                //用username查找uuid
                var dakaArr = []; //根据username获取到该用户的所有打卡记录

                const res = await wx.cloud
                    .callFunction({
                        name: 'daka',
                        data: {
                            type: 'getAllDakaRecord',
                            username: username,
                            is_delete: false
                        }
                    })
                    .catch((err) => {
                        uni.showToast({
                            icon: 'none',
                            title: '出错啦！请稍后重试'
                        });
                    });
                let data = res.result.data;

                for (var i = 0; i < data.length; i++) {
                    var hashid = data[i].hashId;
                    var obj = {
                        task_name: data[i].task,
                        task_cycle: data[i].cycle,
                        task_start_time: data[i].startTime,
                        task_end_time: data[i].endTime,
                        task_hashId: hashid,
                        task_lable1: data[i].lable1,
                        task_lable2: data[i].lable2,
                        count: data[i].count
                    }; //判断该数据是否打卡的状态

                    let task_isDakaTemp = data[i].isDaka;
                    let daka_lastTime = new Date(data[i].daka_lastTime); //为了防止第一次打卡没有daka_lastTime

                    if (daka_lastTime != null) {
                        //获取最后一次打卡的日期
                        var lastTime_year = daka_lastTime.getFullYear();
                        var lastTIme_month = daka_lastTime.getMonth() + 1;
                        var lastTime_day = daka_lastTime.getDate(); //获取当天日期

                        var nowDate = new Date();
                        var nowYear = nowDate.getFullYear();
                        var nowMonth = nowDate.getMonth() + 1;
                        var nowDay = nowDate.getDate();

                        if (lastTime_year != nowYear || lastTIme_month != nowMonth || lastTime_day != nowDay) {
                            //将该数据的是否打卡渲染值改变为task_isDakaTemp = false,则可以避免再次请求数据库拿该属性
                            task_isDakaTemp = false;
                            wx.cloud
                                .callFunction({
                                    name: 'daka',
                                    data: {
                                        type: 'updateIsDaka',
                                        hashId: hashid,
                                        isDaka: false
                                    }
                                })
                                .catch((err) => {
                                    uni.showToast({
                                        title: '网络请求失败',
                                        icon: 'none'
                                    });
                                });
                        }
                    }

                    obj.task_isDaka = task_isDakaTemp;
                    dakaArr.push(obj);
                }

                console.log(dakaArr);
                this.setData({
                    taskdata: dakaArr
                }); //放入缓存

                uni.setStorageSync('dakaArr', dakaArr); // wx.getStorageSync('dakaArr');
            }
        },

        12345() {
            console.log('占位：函数 12345 未声明');
        }
    }
};
</script>
<style>
/* pages/testdaka/index/index.wxss */
page {
    /* background-color: #F4F4F4; */
}

.date-string {
    margin-top: 20rpx;
    background-color: #fff;
    font-size: 28rpx;
    padding: 0 30rpx;
    line-height: 60rpx;
}

.bg {
    /* background-color: #F4F4F4; */

    /* height: 100vh; */
    height: auto;
    /* height: 130vh; */
    width: 100%;
    /* position:fixed; */
}

.dayclock {
    width: 690rpx;
    height: auto;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 0rpx 30rpx 20rpx 30rpx;
    position: relative;
    top: 20rpx;
    box-shadow: 0rpx 0rpx 40rpx 0.1rpx rgb(228, 228, 228);
}

.dayclock .dayclock_title {
    width: 100%;
    height: 109rpx;
    border-bottom: 2rpx solid #e5e5e5;
}

.dayclock_bottom {
    height: 30rpx;
}

/* 个人信息栏右滑动 头*/
.slide {
    position: absolute;
    left: -270px;
    top: 20px;
    z-index: 9;
    background: -webkit-linear-gradient(#1b2347, #3c3e67, #615b8b, #8a7cb7);
    width: 100%;
    height: 100%;
}

.head {
    height: 32%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.head_pic {
    margin-top: 10%;
    border-radius: 50%;
    width: 100px;
    height: 100px;
}

.head_name {
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;
    color: #ffffff;
    margin-bottom: 25px;
}

.head_line {
    width: 90%;
    height: 2rpx;
    background: #ffffff;
    margin-top: 2%;
}

.data {
    margin-top: 5%;
    flex-direction: column;
    display: flex;
    align-items: center;
    height: 40%;
    width: 100%;
}

.data_frequence {
    margin-top: 2%;
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 60%;
}

.dd {
    width: 100%;
}

.data_frequence_pic {
    margin-right: 10px;
    width: 30px;
    height: 30px;
}

.data_frequence_txt {
    color: #ffffff;
    font-size: 15px;
    font-weight: normal;
    font-family: 'Courier New', Courier, monospace;
    margin-right: 3%;
}

.frequence_data {
    margin-top: 5px;
    color: #ffffff;
    font-size: 12px;
    font-family: 'Courier New', Courier, monospace;
}

.data_group_num {
    margin-top: 4%;
    height: 15%;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 60%;
}

.data_group_num_pic {
    margin-right: 10px;
    width: 30px;
    height: 30px;
}

.data_group_num_txt {
    color: #ffffff;
    font-size: 15px;
    font-weight: normal;
    font-family: 'Courier New', Courier, monospace;
    margin-right: 3%;
}

.data_group_num_data {
    margin-top: 5px;
    color: #ffffff;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
}

.data_hours {
    position: relative;
    margin-top: 8%;
    background: #8880b4;
    border-radius: 25rpx;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 60%;
}

.data_hours_pic {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 25px;
    height: 25px;
}

.data_hours_txt {
    position: absolute;
    color: #ffffff;
    font-size: 15px;
    font-family: 'Courier New', Courier, monospace;
    left: 20px;
    top: 14px;
}

.hours {
    position: absolute;
    top: 43px;
    color: #ffffff;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    left: 20px;
}

.convert {
    position: absolute;
    color: #ffffff;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    right: 27px;
    width: 30px;
    height: 13px;
}

.goto {
    position: absolute;
    right: 10px;
    width: 20px;
    height: 20px;
}

.tail {
    margin-top: 6%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 10%;
    width: 100%;
}

.about {
    width: 25px;
    height: 25px;
    margin-right: 5%;
}

.exit {
    margin-left: 5%;
    width: 25px;
    height: 25px;
}
/* 个人信息栏右滑动 底*/

.dayclock_column {
    float: left;
    width: 33.3%;
    height: 100%;
}

.dayclock_column_left {
    height: 40rpx;
    width: 40rpx;
    padding: 35rpx 0 35rpx 26rpx;
}

.dayclock_column_center {
    padding: 35rpx 0;
    text-align: center;
    font-size: 32rpx;
    font-weight: 549;
    color: #666666;
}

.dayclock_column_right {
    height: 40rpx;
    width: 40rpx;
    padding: 35rpx 35rpx 35rpx 0;
    float: right;
}

.dayclock_column_right_more {
    height: 40rpx;
    width: 40rpx;
    padding: 35rpx 30rpx 35rpx 14rpx;
}

.dayclock_data {
    /* padding:10rpx 0 10rpx 0; */
    position: relative;
    height: 120rpx;
    width: 100%;
    background-color: rgb(255, 255, 255);
    overflow: hidden;
}

.dayclock_data .border:after {
    content: '';
    position: absolute;
    left: 157rpx;
    bottom: 0rpx;
    height: 2rpx;
    width: 531rpx;
    background-color: #e5e5e5;
}

.dayclock_data_column_1 {
    float: left;
    width: 21.9%;
    height: 100rpx;
}

.dayclock_data_column_2 {
    float: right;
    width: 55%;
    height: 100rpx;
}

.dayclock_data_column_3 {
    /* padding: 10rpx 0 10rpx 0; */
    float: right;
    width: 22.9%;
    height: 100rpx;
}

.dayclock_data_slide {
    margin: 5rpx 0;
    width: 145rpx;
    height: 90rpx;
    background: #74d5d3;
    border-radius: 0px 45px 45px 0px;
}

.dayclock_data_slide_image {
    float: right;
    margin: 10rpx 10rpx 10rpx auto;
    height: 70rpx;
    width: 70rpx;
}

.dayclock_data_column_text {
    font-size: 38rpx;
    font-weight: 800;
    color: #f7ecce;
    /* padding: 31rpx 0; */
    /* height: 100rpx; */
    line-height: 100rpx;
    /* padding: 24rpx 0; */
}

.dayclock_data_column_2_task {
    margin: 13rpx auto 0 22rpx;
    font-size: 25rpx;
    font-family: Source Han Sans CN;
    font-weight: 600;
    color: #666666;
}

.dayclock_data_column_2_cycle {
    margin: 6rpx auto 6rpx 22rpx;
    padding: 6rpx auto 6rspx 22rpx;
    font-size: 18rpx;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #666666;
}

.dayclock_data_column_2_cycle_week {
    float: left;
    width: auto;
    padding-right: 20rpx;
    color: #a8a8a8;
}

.dayclock_data_column_2_cycle_time {
    float: left;
    width: auto;
    color: #a8a8a8;
}

.dayclock_data_column_2_cycle_time_start {
    height: 22.4rpx;
    width: 32rpx;
}

.operation {
    border-radius: 50%;
    position: absolute;
    top: 4rpx;
    left: -130rpx;
    height: 90rpx;
    text-align: center;
    line-height: 152rpx;
    display: flex;
    padding: 20rpx;
    box-sizing: border-box;
    align-items: center;
}

.operation view {
    width: 100rpx;
}

.operation2 {
    border-radius: 50%;
    position: absolute;
    top: 4rpx;
    right: -130rpx;
    height: 85rpx;
    text-align: center;
    /* background-color: #FFFFFF; */
    line-height: 152rpx;
    display: flex;
    padding: 20rpx;
    box-sizing: border-box;
    align-items: center;
}

.operation2 view {
    width: 100rpx;
}

.operation_daka_image {
    height: 45rpx;
    width: 45rpx;
}

.operation2_del_image {
    height: 40rpx;
    width: 45rpx;
}

.complete,
.complete_bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    font-family: unset;
}

.complete_bg {
    background-color: rgba(0, 0, 0, 0.349);
    opacity: 0.6;
    height: 100%;
}

.complete_share {
    z-index: 99999;
    position: fixed;
    /* top: 350rpx; */
    margin-top: 350rpx;
    left: 93rpx;
    /* 93rpx; */
    width: 560rpx;
    /* 520rpx; */
    height: 705rpx;
    /* 600rpx; */
    /* background-color: rgba(0, 0, 0, 0.116); */
    /* background-color: gray; */
    /* border-radius: 40rpx; */
}

.complete_share_close {
    height: 70rpx;
    width: 70rpx;
    position: fixed;
    /* top: 1060rpx; */
    margin-top: 1230rpx;
    /* 981rpx; */
    left: 338rpx;
    z-index: 99999;
}

.complete_share_image {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 40rpx;
}

.complete_share_box {
    width: 100%;
    height: 23%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.complete_share_box > view {
    margin: 10rpx;
    width: 450rpx;
    height: 90rpx;
    text-align: center;
    line-height: 90rpx;
}

/* .complete_share_box{
    width: 100%;
    height: 41.7%;
    display: flex;
    flex-direction:column ;
    align-items: center;
    justify-content: center;
}
.complete_share_box > view{
  margin: 10rpx;
  width: 450rpx;
  height: 90rpx;  
  text-align: center;
  line-height: 90rpx;
} */
.complete_share_box_button {
    border-radius: 50rpx;
    color: #fff;
    background-color: #dadada;
    /* opacity: 1; #74d5d3*/
    /* opacity: 0.75; */
}

/* .complete_share_box_button{
    border-radius: 50rpx;
    color: #fff;
    background-color: #74d5d3;
  } */
.attention_bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    font-family: unset;
    background-color: rgba(0, 0, 0, 0.349);
    opacity: 0.6;
    height: 100%;
}

.attention_text {
    z-index: 99999;
    position: fixed;
    top: 350rpx;
    left: 88rpx;
    width: 570rpx;
    /* height: 700rpx; */
    background-color: #fff;
    border-radius: 40rpx;
    padding-bottom: 30rpx;
}

.attention_close {
    height: 70rpx;
    width: 70rpx;
    position: fixed;
    top: 1000rpx;
    left: 338rpx;
    z-index: 99999;
}

.operationBgBox {
    float: left;
    height: 90rpx;
    width: 100%;
    background-color: #74d5d3;
    border-radius: 0px 45px 45px 0px;
    overflow: hidden;
    position: absolute;
    /* top: 0; */
    color: #fff;
    margin: 7rpx 0;
}

.operationBgBoxtrue {
    float: left;
    height: 90rpx;
    width: 100%;
    background-color: #fff;
    border-radius: 0px 45px 45px 0px;
    overflow: hidden;
    position: absolute;
    /* top: 0; */
    color: #fff;
    margin: 7rpx 0;
}

.operationBox {
    width: 145rpx;
    height: 90rpx;
    background: #74d5d3;
    border-radius: 0px 45px 45px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
}

.operationBoxtrue {
    width: 145rpx;
    height: 90rpx;
    background: #fff;
    border-radius: 0px 45px 45px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
}

.operationBox image,
.operationBoxtrue image {
    /* width: 50%;
    height: 50%; */
    float: right;
    margin: 10rpx 10rpx 10rpx auto;
    height: 70rpx;
    width: 70rpx;
}

.graybg {
    position: relative;
    height: 100rpx;
    width: 100%;
    background-color: gray;
    z-index: -99999;
}

.dayclock_data_huadong {
    padding: 10rpx 0 10rpx 0;
    position: absolute;
    height: 100rpx;
    width: 100%;
    background-color: #fff;
    z-index: 999;
}

/* 删除键背景 */
.dayclock_data_huadong_bg {
    position: absolute;
    height: 120rpx;
    width: 100%;
    /* background-color:#E7624F; */
    /* background-color: rgba(255, 0, 0, 0.582); */
    z-index: 0;
}

/* #FFFFFF */
/* 删除键 */
.dayclock_data_huadong_bg_bg {
    /* border-radius: 50%; */
    position: absolute;
    /* top: 0rpx; */
    right: 0rpx;
    height: 118rpx;
    text-align: center;
    /* background-color: rgba(221, 221, 221, 0.349); */
    line-height: 152rpx;
    display: flex;
    padding-right: 33rpx;
    padding-left: 33rpx;
    box-sizing: border-box;
    align-items: center;
    color: white;
    background-color: rgba(255, 0, 0, 0.582);
}

.dayclock_data_huadong_bg_image {
    height: 40rpx;
    width: 45rpx;
}

.dayclock_data_column_text_true {
    font-size: 38rpx;
    font-weight: 800;
    color: #74d5d3;
    line-height: 100rpx;
}

.dayclock_data_column_text_false {
    font-size: 36rpx;
    font-weight: 800;
    color: #f7ecce;
    line-height: 100rpx;
}

/* pages/3menu/3menu.wxss */
.img-plus-style {
    height: 100rpx;
    width: 100rpx;
    transform: rotate(-45deg);
    /* padding-top: 20rpx; */
    /* margin-top: 20rpx; */
    display: flex;
    align-items: center;
    justify-content: center;
}

.img-style {
    height: 100rpx;
    width: 100rpx;
    position: fixed;
    bottom: 300rpx;
    right: 25rpx;
    opacity: 0;
    z-index: 999;
}

.text_time {
    position: fixed;
    bottom: 250rpx;
    right: 70rpx;
}

.attention_text_title {
    margin: 40rpx auto;
    text-align: center;
}

.attention_text_duanluo {
    margin: 10rpx 40rpx;
    text-align: justify;
}

.attention_text_duanluo > view {
    line-height: 75rpx;
}

.tabBar_running {
    height: 20rpx;
    width: 100rpx;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0rpx;
    border-radius: 50%;
    z-index: 999;
    margin: 25rpx;
    overflow: hidden;
    transition: all 0.5s;
}

.tabBar {
    height: 120rpx;
    width: 703rpx;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0rpx;
    border-radius: 45rpx;
    z-index: 999;
    margin: 25rpx;
    transition: all 0.5s;
    box-shadow: 0rpx 10rpx 20rpx 0.1rpx rgb(228, 228, 228);
}

.tabBar_ring {
    height: 160rpx;
    width: 160rpx;
    border-radius: 110rpx 0rpx;
    transform: rotate(45deg);
    background: #fff;
    position: fixed;
    bottom: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    /* box-shadow: 0rpx 10rpx 20rpx 0.1rpx rgb(228, 228, 228); */
}

.icon {
    height: 100%;
    width: 690rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.icon_a {
    height: auto;
    /* width: 22%; */
    width: 22%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.icon_a > image {
    transition: all 0.7s;
    height: 50rpx;
    width: 50rpx;
}

.icon_text_false {
    transition: all 0.5s;
    height: 0rpx;
    width: 2rpx;
    overflow: hidden;
    font-size: 1rpx;
    width: 100%;
}

.icon_text {
    width: 100%;
    padding-top: 10rpx;
    font-size: 20rpx;
    color: #7c66f5;
    transition: all 0.5s;
    text-align: center;
}

.icon_left {
    /* padding-right: 10rpx; */
    margin-right: 65rpx;
    /* transition: all .5s; */
}

.icon_right {
    /* padding-left: 10rpx; */
    margin-left: 65rpx;
    /* transition: all .5s; */
}

.icon_left_2 {
    /* padding-right: 10rpx; */
    margin-right: 130rpx;
    /* transition: all .5s; */
}

.icon_right_2 {
    /* padding-left: 10rpx; */
    margin-left: 130rpx;
    /* transition: all .5s; */
}

/* 计时样式 */
.topbox {
    height: 40vh;
    width: 100%;
    background: linear-gradient(to bottom, #5677fc 45%, rgb(78, 78, 78));
    /* #5677fc; */
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    position: relative;
    transition: all 0.3s;
    border-radius: 0 0 10rpx 10rpx;
}

.topbox_bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    /* background:#fff; */
    align-items: center;
    color: #fff;
}

.topbox_bar > image {
    width: 50rpx;
    height: 50rpx;
    margin-right: 20rpx;
    transform: rotate(180deg);
    filter: invert(1) !important;
}

.topbox_bar_picker {
    margin-left: 40rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
}

.topbox_bar_picker_box {
    height: 0;
    position: absolute;
    left: -10rpx;
    top: 50rpx;
    width: 30vw;
    transition: all 0.5s;
    z-index: 99;
    overflow: hidden;
}

.topbox_bar_picker_box_data {
    height: 0;
    margin-top: 10rpx;
    padding-left: 15rpx;
    background: #fff;
    color: black;
    border-radius: 10rpx;
    transition: all 0.5s;
}

.picker_bar .topbox_bar_picker_box {
    height: auto;
    transition: all 0.5s;
}

.picker_bar .topbox_bar_picker_box_data {
    height: 50rpx;
    transition: all 0.5s;
}

.topbox_bar_picker_sanjiao {
    margin: 15rpx 20rpx 0 20rpx;
    width: 0px;
    height: 0px;
    border-width: 11rpx;
    border-top: 25rpx;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
}

.topbox_tips {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.topbox_tips_slider {
    width: 80%;
}

wx-slider .wx-slider-handle-wrapper {
    height: 30rpx;
}

.topbox_btn {
    width: 100%;
    position: absolute;
    bottom: -40rpx;
    /* height: 80rpx; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.topbox_btn_start {
    width: 250rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    background: #5677fc;
    border-radius: 40rpx;
    color: white;
}

.bottombox {
    height: 60vh;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    transition: all 0.5s;
}

.bottombox_showtask {
    width: 500rpx;
    height: 1rpx;
    overflow: hidden;
}

.bottomboxruning .bottombox_showtask {
    text-align: center;
    width: 300rpx;
    background: #d0dafd;
    line-height: 80rpx;
    border-radius: 40rpx;
    height: 80rpx;
    transition: all 0.7s;
}

.bottombox_clock {
    flex: 1;
    width: 600rpx;
    height: 600rpx;
    margin: 7vh auto 0 auto;
    position: relative;
}

.bottomboxruning .bottombox_clock {
    margin: 3vh auto 0 auto;
}

.bottombox_clock_bg,
.bottombox_clock_active {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    /* bottom: 250rpx; */
    width: 600rpx;
    height: 600rpx;
    margin-top: -50rpx;
}
.timer--runing .bottombox_clock_bg,
.timer--runing .bottombox_clock_active {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    /* bottom: 270rpx; */
    width: 600rpx;
    height: 600rpx;
    margin-top: 0rpx;
}
.bottombox_clock_text {
    color: #5879fa;
    line-height: 60rpx;
    font-size: 90rpx;
    text-align: center;
    position: absolute;
    left: 190rpx;
    top: 215rpx;
}
.timer--runing .bottombox_clock_text {
    color: #5879fa;
    line-height: 60rpx;
    font-size: 90rpx;
    text-align: center;
    position: absolute;
    left: 190rpx;
    top: 250rpx;
}
.timer {
    height: calc(100% - 102rpx);
    transition: all 0.7s;
    display: flex;
    flex-direction: column;
}

.timer--runing .topbox {
    height: 10vh;
    transition: all 0.5s;
    background: white;
}

.timer--runing .bottombox {
    height: 90vh;
    transition: all 0.5s;
    background: white;
}

.timer--runing .topbox_bar {
    display: none;
}

.timer--runing .topbox_tips {
    display: none;
}

.timer--runing .topbox_topbar {
    background: white;
}

.timer--runing .topbox_btn {
    bottom: -1000rpx;
    z-index: 99;
}

.timer--runing .topbox_btn_start,
.timer--runing .topbox_btn_stop,
.timer--runing .topbox_btn_ct,
.timer--runing .topbox_btn_complete {
    margin-top: 4vh;
    width: 300rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    background: #5677fc;
    border-radius: 40rpx;
    color: white;
    transition: all 0.7s;
}

/* 计时样式结束 */
/* 自习室css */
.selfstudy_bar {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.selfstudy {
    position: sticky;
    top: 0rpx;
    z-index: 99;
}

.topbar_true {
    margin-left: 35rpx;
    color: #7c66f5;
    transition: all 0.7s;
    font-size: 33rpx;
}
.topbar {
    color: black;
    margin-left: 38rpx;
    font-size: 25rpx;
    transition: all 0.7s;
}
/* 其他自习室css开始 */
.selfstudy_othergroup_title {
    width: 650rpx;
    height: 350rpx;
    margin: 70rpx auto;
    margin-bottom: 0rpx;
    position: relative;
}
.selfstudy_othergroup_title > view {
    /* margin-top: 20rpx; */
    /* font-size: 60rpx; */
    /* font-weight: 600; */
    width: 100%;
    height: 350rpx;
    background: pink;
    border-radius: 20rpx;
    position: absolute;
}
.selfstudy_othergroup_title_card {
}
.selfstudy_othergroup_title_card.card1 {
    background: white;
    z-index: 3;
}
.selfstudy_othergroup_title_card.card2 {
    z-index: 2;
    transform: translateY(20rpx) translateX(33rpx);
    width: 90%;
    background: rgb(231, 231, 231);
    /* box-shadow: 6px 13px 60px 10px #ccc; */
}
.selfstudy_othergroup_title_card.card3 {
    transform: translateY(40rpx) translateX(67rpx);
    width: 80%;
    z-index: 1;
    background: rgb(253, 253, 253);
    /* box-shadow: 6px 23px 50px 10px #ccc; */
}
.selfstudy_othergroup_longbox {
    margin: 20rpx auto;
    margin-top: 100rpx;
    margin-bottom: 0;
    width: 650rpx;
    height: 80rpx;
    display: flex;
    flex-direction: row;
}
.selfstudy_othergroup_longbox_left {
    width: 80%;
    height: 100%;
    background: white;
    border-radius: 20rpx;
}
.selfstudy_othergroup_longbox_right {
    width: 15%;
    height: 100%;
    background: #7c66f5;
    margin-left: 30rpx;
    border-radius: 20rpx;
}
.mygroup_scrollview {
    height: 500rpx;
    width: auto;
    margin-top: 41rpx;
    display: flex;
    white-space: nowrap;
}
.mygroup_scrollview_data {
    height: 90%;
    width: 310rpx;
    background: white;
    border-radius: 70rpx;
    margin-left: 51rpx;
    display: flex;
    flex-direction: column;
    box-shadow: 20rpx 20rpx 30rpx 0.1rpx rgb(228, 228, 228);
    margin-top: 2rpx;
}
.mygroup_scrollview_data_topbox {
    width: 100%;
    height: 65%;
}
.mygroup_scrollview_data_topbox > image {
    width: 90%;
    height: 98%;
    margin: 17rpx;
    margin-bottom: 0;
    border-radius: 55rpx;
    box-shadow: 5rpx 15rpx 20rpx 0.5rpx rgb(228, 228, 228);
}
.mygroup_scrollview_data_bottombox {
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: row;
    /* background: blue; */
}
.mygroup_scrollview_data_bottombox_left {
    width: 78%;
    height: 100%;
    /* background: pink; */
}
.mygroup_scrollview_data_bottombox_right {
    width: 22%;
    height: 100%;
    /* background: gray; */
}
.mygroup_scrollview_data_bottombox_left_roomname {
    width: 100%;
    height: 30%;
    /* background: pink; */
}
.mygroup_scrollview_data_bottombox_left_roomname > view {
    padding-top: 28rpx;
    padding-left: 30rpx;
    font-size: 20rpx;
    font-weight: 550;
}
.mygroup_scrollview_data_bottombox_left_introduce {
    width: 100%;
    height: 70%;
    /* background:yellow; */
}
.mygroup_scrollview_data_bottombox_left_introduce > view {
    color: gray;
    padding-left: 30rpx;
    padding-top: 15rpx;
    font-size: 18rpx;
}
.mygroup_scrollview_data_bottombox_right > view {
    background: #7c66f5;
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    margin-top: 45rpx;
}
.lablegroup_scrollview {
    height: 233rpx;
    width: auto;
    /* background: pink; */
    margin-top: 39rpx;
}
.lablegroup_scrollview_data {
    box-shadow: 0rpx 10rpx 30rpx 0.1rpx rgb(228, 228, 228);
    margin-top: 2rpx;
    margin-left: 41rpx;
    height: 190rpx;
    width: 403rpx;
    background: white;
    border-radius: 30rpx;
}
.lablegroup_scrollview_data_image {
    float: left;
    width: 35%;
    height: 100%;
    /* background: pink; */
}
.lablegroup_scrollview_data_image > image {
    width: 90%;
    height: 90%;
    margin: 10rpx;
    border-radius: 20rpx;
}

.lablegroup_scrollview_data_information {
    float: left;
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* background: gray; */
}
.lablegroup_scrollview_data_information_topbox {
    height: 75%;
    width: 100%;
    /* background: pink; */
    display: flex;
    flex-direction: column;
}
.lablegroup_scrollview_data_information_topbox_roomname {
    font-size: 20rpx;
    font-weight: 600;
    height: auto;
    width: auto;
    margin-top: 20rpx;
    margin-left: 25rpx;
}
.lablegroup_scrollview_data_information_topbox_roomintroduce {
    height: 100%;
    width: 82%;
    line-height: 25rpx;
    color: gray;
    margin-top: 20rpx;
    margin-left: 25rpx;
    font-size: 18rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    /* position: absolute; */
}
.lablegroup_scrollview_data_information_bottombox {
    height: 25%;
    width: 100%;
    display: flex;
    flex-direction: row;
    /* background: gray; */
}
.lablegroup_scrollview_data_information_bottombox_left {
    width: 25rpx;
    height: 25rpx;
    margin-left: 25rpx;
    border-radius: 50%;
    background: #7c66f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    position: relative;
}
.lablegroup_scrollview_data_information_bottombox_left_yuandia {
    /* width: 35%;
  height: 35%;
  border-radius: 50%;
  background: #FFFFFF; */
    width: 0px;
    height: 0px;
    border-width: 6px;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    margin-left: 5rpx;
}
.lablegroup_scrollview_data_information_bottombox_left_ring {
    width: 6rpx;
    height: 6rpx;
    border-radius: 50%;
    background: #ffffff;
    position: absolute;
    top: 5rpx;
    left: 7rpx;
}
.lablegroup_scrollview_data_information_bottombox_right {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 81%;
}
.information_bottombox_right_url {
    width: 72%;
    height: 100%;
    /* background: gray; */
    overflow: hidden;
    /* padding-right: 10rpx; */
}
.information_bottombox_right_url > view {
    padding-right: 10rpx;
}
.information_bottombox_right_url_image {
    float: right;
    width: 25rpx;
    height: 25rpx;
    border-radius: 50%;
    margin-left: -6rpx;
}
.information_bottombox_right_numper {
    /* margin-right: 20rpx; */
    width: 28%;
    height: 25rpx;
    line-height: 25rpx;
    font-size: 15rpx;
    color: rgb(56, 56, 56);
}
/* 弹窗 */
.showgroup_close {
    overflow: hidden;
    height: 10rpx;
    width: 100vw;
    transition: all 0.7s;
    position: fixed;
    bottom: 0;
}

.showgroup_box_close {
    overflow: hidden;
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 1rpx;
    background: white;
    border-radius: 20rpx 20rpx 0 0;
    display: flex;
    flex-direction: column;
    transition: all 0.6s;
}
.showgroup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    font-family: unset;
    background-color: rgba(0, 0, 0, 0.164);
    /* opacity: 0.6; */
    height: 100vh;
    width: 100vw;
    /* transition: all 0.7s; */
}
.showgroup_box {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 770rpx;
    background: white;
    border-radius: 20rpx 20rpx 0 0;
    display: flex;
    flex-direction: column;
    transition: all 0.5s;
}
.showgroup_box_title {
    /* background: pink; */
    /* font-weight: 600; */
    height: 110rpx;
    width: 100%;
    line-height: 120rpx;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
}
.showgroup_box_introduce {
    /* background: gray; */
    height: 50rpx;
    line-height: 50rpx;
    padding: 0 30rpx;
    font-size: 25rpx;
    width: 100%;
    color: rgb(48, 48, 48);
}
.showgroup_box_prenum {
    display: flex;
    /* background: pink; */
    flex-direction: row;
    height: 50rpx;
    line-height: 50rpx;
    padding: 0 30rpx;
    font-size: 25rpx;
    width: 100%;
    color: rgb(48, 48, 48);
}
.showgroup_box_uuid {
    /* background: orange; */
    height: 50rpx;
    line-height: 50rpx;
    padding: 0 30rpx;
    font-size: 25rpx;
    width: 100%;
    color: rgb(48, 48, 48);
}
.showgroup_box_userimage {
    /* background: blue; */
    height: 320rpx;
    width: 92%;
    font-size: 25rpx;
    padding: 10rpx 30rpx;
    display: flex;
    flex-direction: column;
}
.showgroup_box_userimage_box {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 95%;
    flex-wrap: wrap;
    align-content: flex-start;
    /* position: absolute;  */
}
.showgroup_box_userimage_groupMember {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-top: 20rpx;
    margin-right: 15rpx;
}
.showgroup_box_userimage_groupMember_image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}
.showgroup_box_userimage_add {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    margin-top: 15rpx;
    /* margin-left: 10rpx; */
}
.showgroup_box_userimage_add_image {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
}
.showgroup_box_turninto {
    /* background: pink; */
    height: 100rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.showgroup_box_turninto > view {
    height: 80rpx;
    width: 450rpx;
    border-radius: 40rpx;
    text-align: center;
    line-height: 80rpx;
    background: #7c66f5;
    color: white;
}
/* 其他自习室css结束 */
.self_wrap {
    padding: 24rpx;
}
/* 我的小组css开始 */
.inputBox {
    width: 680rpx;
    height: 75rpx;
    border-radius: 10rpx;
    background: rgba(233, 233, 233, 0.507);
    margin: 0 auto;
    margin-top: 6rpx;
}
.Group {
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.myGroup {
    width: 320rpx;
    height: 403rpx;
    background: rgba(233, 233, 233, 0.507);
    border-radius: 10rpx;
    overflow: hidden;
    margin-left: 39.5rpx;
    margin-top: 36rpx;
    display: flex;
    flex-direction: column;
}
.myGroup_image {
    width: 100%;
    height: 293rpx;
}
.myGroup_groupName {
    margin: 13rpx;
    margin-bottom: 0rpx;
    letter-spacing: 2rpx;
    font-size: 28rpx;
    margin-top: 15rpx;
}
.myGroup_groupUser {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 3rpx;
}
.myGroup_groupUser_name {
    padding: 13rpx;
    font-size: 23rpx;
    width: 79%;
    color: rgb(117, 117, 117);
}
.myGroup_groupUser_url {
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
}
.creatGroup {
    width: 320rpx;
    height: 403rpx;
    border-radius: 10rpx;
    overflow: hidden;
    margin-left: 39.5rpx;
    margin-top: 36rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    box-shadow: inset 0 0 40px 20px rgba(255, 255, 255, 0.9);
    background-image: linear-gradient(to right, #dfd5f8 25%, #d6d4f9 35%, #e1f0f5 75%, #e9e1f8 100%);
}
.creatGroup_text {
    width: 120rpx;
    height: 25%;
    font-size: 20rpx;
    color: #a89bf3b9;
}
.creatGroup_buttom {
    width: 195rpx;
    height: 58rpx;
    border-radius: 30rpx;
    background: #7c66f5;
    margin-top: 60rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.creatGroup_buttom > image {
}
.creatGroup_buttom > view {
    font-size: 23rpx;
    line-height: 58rpx;
    color: white;
    letter-spacing: 2rpx;
}
/* 我的小组css结束 */
@keyframes add_show {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0%);
    }
}
@keyframes add_hide {
    0% {
        opacity: 1;
        transform: translateY(0%);
    }
    100% {
        opacity: 0;
        transform: translateY(100%);
    }
}
/* 自习室css结束 */
@media (prefers-color-scheme: dark) {
    .complete_share_box_button {
        filter: invert(90%) !important;
        background: rgb(172, 211, 254);
        color: #fff;
    }

    .operationBgBox {
        filter: invert(90%) !important;
        background: rgb(172, 211, 254);
        /* background: #F77A7A; */
        /* background: rgb(167, 167, 86); */
    }

    .operationBox {
        filter: invert(0) !important;
        background-color: rgb(172, 211, 254);
    }

    .operationBox image {
        filter: invert(0) !important;
    }

    .dayclock_data_column_text_true {
        filter: invert(90%) !important;
        color: rgb(172, 211, 254);
        /* color: rgb(167, 167, 86); */
    }

    .dayclock_data_column_text_false {
        color: gray;
        /* color: rgb(167, 167, 86); */
    }

    .img-plus-style {
        filter: invert(1) !important;
        height: 100rpx;
        width: 100rpx;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .img-style {
        filter: invert(0) !important;
        color: blanchedalmond;
        position: fixed;
        bottom: 600rpx;
        right: 25rpx;
        opacity: 0;
        z-index: 999;
    }

    .dayclock_data_huadong_bg_bg {
        filter: invert(90%) !important;
        background-color: #fc9090;
        /* background-color: gray; */
        color: #fff;
    }

    .complete_share_image {
        filter: invert(1) !important;
    }

    .text_time {
        position: fixed;
        bottom: 550rpx;
        right: 70rpx;
    }

    .attention_bg {
        filter: invert(90%) !important;
    }

    .operationBoxtrue image {
        filter: invert(60%) !important;
    }

    .dayclock_column_right {
        filter: invert(60%) !important;
    }

    .dayclock_column_left {
        filter: invert(80%) !important;
    }

    .dayclock_data_column_2_task {
        filter: invert(1) !important;
        color: #fff;
    }

    .dayclock_column_center {
        filter: invert(1) !important;
        color: #fff;
    }

    .complete_bg {
        filter: invert(90%) !important;
    }
    .icon_a > image {
        filter: invert(0) !important;
    }

    .top {
        filter: invert(80%) !important;
        background: rgb(172, 211, 254);
    }

    .top2 {
        filter: invert(80%) !important;
        background: rgb(172, 211, 254);
    }

    .topbox {
        filter: invert(1) !important;
        background: linear-gradient(to bottom, rgb(172, 211, 254) 35%, rgb(0, 0, 0));
    }
    .topbox_btn_start {
        filter: invert(0) !important;
        background: rgb(172, 211, 254);
    }
    .bottombox_clock_text {
        filter: invert(1) !important;
        color: rgb(172, 211, 254);
    }
    .timer--runing .topbox {
        filter: invert(1) !important;
        transition: all 0.5s;
        background: rgb(172, 211, 254);
        background: #000;
    }
    .timer--runing .topbox_topbar {
        background: #000000;
    }
    .bottomboxruning .bottombox_showtask {
        filter: invert(1) !important;
        background: rgb(172, 211, 254);
    }
    .timer--runing .topbox_btn_start,
    .timer--runing .topbox_btn_stop,
    .timer--runing .topbox_btn_ct,
    .timer--runing .topbox_btn_complete {
        filter: invert(0) !important;
        background: rgb(172, 211, 254);
        z-index: 99;
    }
    .timer--runing .topbox_btn {
        bottom: -1000rpx;
        flex: 0.5;
    }
    .bottomboxruning .bottombox_clock {
        margin: 3vh auto 0 auto;
        height: 100rpx;
        z-index: 0;
        flex: 0.5;
    }
    .bottombox_clock_bg,
    .bottombox_clock_active {
        filter: invert(1) !important;
    }
}
</style>
