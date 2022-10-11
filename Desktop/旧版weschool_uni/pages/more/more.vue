<template>
    <view>
        <!-- <wxs module="more" src="./more.wxs"></wxs> -->

        <view class="head">
            <!-- 状态栏 -->
            <view :style="'height: ' + statusBarHeight + 'px;'" />
            <!-- 导航栏 -->
            <view class="head_second" :style="'height: ' + lineHeight + 'px;'">
                <!-- 头像 -->
                <view class="avatarBox">
                    <image :src="iconUrl" @tap.stop.prevent="navigate" id="myself"></image>
                </view>
                <!-- 搜索框 -->
                <view class="searchFrame">
                    <image src="/static/images/search.png" />
                    <input :value="search" @input="search_Input" />
                </view>
                <!-- 消息列表 -->
                <view class="newInfo">
                    <image src="/static/images/information.png" @tap="navigate" id="NewInfo"></image>
                    <!-- 消息提示 - 数字 -->
                    <view class="newInfo_redPoint" id="NewInfo" @tap.stop.prevent="navigate" v-if="NewInfo">
                        <text>{{ NewInfo }}</text>
                    </view>
                </view>
            </view>
        </view>
        <!-- 填充 -->
        <view :style="'height: ' + (statusBarHeight + lineHeight) + 'px;'"></view>

        <scroll-view
            class="container"
            :style="'height: ' + (windowHeight - (statusBarHeight + lineHeight)) + 'px;'"
            scroll-y
            :enhanced="true"
            :show-scrollbar="false"
            @scrolltoupper="onPullDownRefresh"
            upper-threshold="0"
            @scrolltolower="onReachBottom"
            lower-threshold="200"
        >
            <!-- 标签 -->
            <TabScroll style="z-index: 2" type="校友圈标签" :tabItem="tabitem" @setTab="setCurrentTab($event, { tagId: 'TabScroll' })" id="TabScroll" :showTab="true" />
            <!-- 瀑布流 -->
            <scroll-view @scrolltoupper="onPullDownRefresh" upper-threshold="0" @scrolltolower="onReachBottom" lower-threshold="200" v-if="campus_account != true" class="page">
                <!-- 加载 -->
                <Loading v-if="showLoading == 0" />

                <swiper :current="currentTab" @change="waterChange" :style="' height: ' + (windowHeight - statusBarHeight - lineHeight - 28) + 'px;'">
                    <block v-for="(item, index) in allList" :key="item.body">
                        <swiper-item>
                            <waterFlowCards
                                :height="windowHeight - (statusBarHeight + lineHeight) - 28 + 'px;'"
                                :id="'waterFlowCards' + index"
                                :list="item"
                                :tabitem="tabitem"
                                :currentTab="index"
                                @getData="getData($event, { tagId: 'waterFlowCards' + index })"
                                @onReachBottom="onReachBottom($event, { tagId: 'waterFlowCards' + index })"
                                @onPullDownRefresh="onPullDownRefresh($event, { tagId: 'waterFlowCards' + index })"
                                @setAllList="setAllList($event, { tagId: 'waterFlowCards' + index })"
                            ></waterFlowCards>
                        </swiper-item>
                    </block>
                </swiper>

                <!-- 攒局按钮 -->

                <!-- <button bindtap="navigateSave" id="saveBureau" style="background-color: aqua; position: absolute;top: 0;">攒局</button> -->
                <!-- 发布按钮 -->
                <view class="img-button content_btn content_btn_add" :style="'display:' + (school == '游客登录' ? 'none' : 'fixed')" @tap="showPopUpsFun" id="PublishContent">
                    <image src="/static/images/btn_feed@2x.png"></image>
                </view>
                <!-- 我的发布按钮 -->
                <view class="img-button content_btn content_btn_user" @tap="navigate" :style="'display:' + (school == '游客登录' ? 'none' : 'fixed')" id="UserContent">
                    <image src="/static/images/User.png"></image>
                </view>

                <!-- 弹窗 -->
                <view :style="'position: absolute; height: ' + (windowHeight - statusBarHeight - lineHeight - 28) + 'px;'" :class="'popUps ' + (showPopUps ? 'popUpsActive' : '')">
                    <!-- <view class="mengban {{showPopUps ? 'mengbanActive' : ''}}"></view> -->
                    <!-- 点击事件 -->
                    <view class="bindBoxFlex">
                        <view class="bindBox" @tap="show_PublishContent">
                            <view class="imageBox" style="background-color: rgb(236, 158, 200)">
                                <image src="/static/pages/more/images/course.png"></image>
                            </view>
                            <text>快速发布</text>
                        </view>

                        <view class="bindBox" @tap="navigate" id="PublishContent">
                            <view class="imageBox" style="background-color: rgb(125, 222, 200)">
                                <image src="/static/pages/more/images/child.png"></image>
                            </view>
                            <text>其 他</text>
                        </view>
                    </view>

                    <!-- 取消 -->
                    <view class="cancelBox">
                        <view class="cancel" @tap="showPopUpsFun">
                            <image src="/static/pages/more/images/close.png"></image>
                        </view>
                    </view>
                </view>

                <!-- 快速发布组件 -->
                <QuickPublish id="QuickPublish" :showModel="showModel" @ReOnLoad="onLoad($event, { tagId: 'QuickPublish' })"></QuickPublish>
            </scroll-view>
        </scroll-view>
    </view>
</template>

<script>
import TabScroll from './components/TabScroll/TabScroll';
import waterFlowCards from './components/waterFlowCards/waterFlowCards';
import QuickPublish from './components/QuickPublish/QuickPublish';
import Loading from './components/Loading/Loading';
let args = uni.getStorageSync('args');
var app = getApp(); // 旋转初始化

const _ANIMATION_TIME = 400; // 动画播放一次的时长ms

var _animation = uni.createAnimation({
    duration: _ANIMATION_TIME,
    timingFunction: 'linear',
    delay: 0,
    transformOrigin: '50% 50% 0'
});

var _animationIndex = 0; // 动画执行次数index（当前执行了多少次）

var _animationIntervalId = -1; // 动画定时任务id，通过setInterval来达到无限旋转，记录id，用于结束定时任务

export default {
    components: {
        TabScroll,
        waterFlowCards,
        QuickPublish,
        Loading
    },
    data() {
        return {
            // 配置
            statusBarHeight: getApp().globalData.statusBarHeight,

            lineHeight: getApp().globalData.lineHeight,
            rectHeight: getApp().globalData.rectHeight,
            windowHeight: getApp().globalData.windowHeight,

            tabitem: [
                // 标签兜底
                {
                    title: '全部',
                    type: 0
                },
                {
                    title: '日常',
                    type: 0
                },
                {
                    title: '晒出课表🤣',
                    type: 0
                },
                {
                    title: '树洞👂',
                    type: 0
                },
                {
                    title: '2022新年Flag🚩',
                    type: 0
                },
                {
                    title: '2021回顾◀',
                    type: 0
                },
                {
                    title: '三行情书❤️',
                    type: 0
                },
                {
                    title: '故事屋⭐️',
                    type: 0
                }
            ],

            allList: [[], [], [], [], [], [], [], []],

            // 列表兜底
            currentTab: 0,

            // 当前 swiper-item
            iconUrl: '',

            // 头像地址
            school: '',

            // 判断游客用
            // 控制动画
            showLoading: 0,

            // 动画显隐
            animation: '',

            scrollTop: 0,

            // 校园圈滑动高度
            // 发布
            showPopUps: false,

            // 弹窗显隐
            // 快速发布显隐
            showModel: false,

            TimeOut: 1,
            timeId: 0,
            currentPage: 0,
            loadAll: false,
            ifScroll: false,
            NewInfo: '',
            leftList: [],
            rightList: [],
            list: [],
            campus_account: '',
            search: ''
        };
    },
    onLoad: function () {
        this.init();
        this.onPullDownRefresh();
    },
    onShow: function () {
        let currentTab = this.currentTab;
        this.$mp.page.selectComponent(`#waterFlowCards${currentTab}`).RightLeftSolution(); //  获取新消息提醒   ------ - 不应每次show该页面时都请求，应每隔一段时间请求一次。

        this.getNewInfo();
    },
    // 下拉刷新
    onPullDownRefresh() {
        // 在标题栏中显示加载
        uni.showNavigationBarLoading();
        clearTimeout(this.TimeOut); // 开启动画

        this.setData({
            showLoading: 0
        }); // 重置组件内的 currentPage 和 loadAll

        let currentTab = this.currentTab;
        this.$mp.page.selectComponent(`#waterFlowCards${currentTab}`).setData({
            currentPage: 0
        });
        this.$mp.page.selectComponent(`#waterFlowCards${currentTab}`).setData({
            loadAll: false
        }); // 加载动画

        this.startAnimationInterval(); // 定时器防抖

        this.TimeOut = setTimeout(() => {
            console.log('下拉刷新'); // 清空瀑布流内容，并再次请求数据库

            this.$mp.page.selectComponent(`#waterFlowCards${currentTab}`).RightLeftSolution(true);
            this.$mp.page.selectComponent(`#waterFlowCards${currentTab}`).getData(); // 在标题栏中停止加载

            uni.hideNavigationBarLoading(); // 停止动画

            this.setData({
                showLoading: 1
            }); // 停止下拉刷新

            uni.stopPullDownRefresh();
        }, 1000);
    },
    // 上拉触底
    onReachBottom() {
        uni.showLoading({
            title: '加载更多中',
            mask: true
        }); // 得到当前组件索引

        let currentTab = this.currentTab; // 请求数据库

        this.$mp.page.selectComponent(`#waterFlowCards${currentTab}`).getData();
        uni.hideLoading();
    },
    onShareAppMessage: function (res) {
        return {
            title: 'WE校园'
        };
    },
    methods: {
        canWaterScroll() {
            console.log(123);
            let allList = this.allList;

            for (let i in allList) {
                this.$mp.page.selectComponent(`#waterFlowCards${i}`).setData({
                    ifScroll: true
                });
            }
        },

        cannotWaterScroll() {
            console.log(123);
            let allList = this.allList;

            for (let i in allList) {
                this.$mp.page.selectComponent(`#waterFlowCards${i}`).setData({
                    ifScroll: false
                });
            }
        },

        // 卡片内外部渲染一致
        setAllList(e, type, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            const allList = e.detail;
            this.setData({
                allList
            }); // 点赞和评论不刷新瀑布流

            console.log(type);

            if (type == '点赞和评论') {
                for (let i in allList) {
                    this.$mp.page.selectComponent(`#waterFlowCards${i}`).RightLeftSolution();
                }
            } else {
                // 新增和删除卡片要刷新瀑布流
                for (let i in allList) {
                    this.$mp.page.selectComponent(`#waterFlowCards${i}`).RightLeftSolution(true);
                    this.$mp.page.selectComponent(`#waterFlowCards${i}`).RightLeftSolution();
                }
            }
        },

        showPopUpsFun() {
            let showPopUps = !this.showPopUps;
            this.setData({
                showPopUps
            });
        },

        //
        show_PublishContent(e) {
            // 控制快速发布显隐
            this.$mp.page.selectComponent('#QuickPublish').add(); // 隐藏弹窗

            this.showPopUpsFun();
        },

        // 获取新消息通知数量
        getNewInfo() {
            var that = this;
            let args = uni.getStorageSync('args'); // 边界处理 - 未登录时

            if (!args.username) {
                return;
            } // args.username = Number(args.username);
            // console.log(args.username);

            wx.cloud
                .database()
                .collection('New-Information')
                .where({
                    'be_character.userName': args.username,
                    status: 0
                })
                .count()
                .then((res) => {
                    that.setData({
                        NewInfo: res.total
                    });
                });
        },

        // 1. 跳转页面
        navigate(e) {
            let url = e.currentTarget.id;

            switch (url) {
                case 'myself':
                    uni.switchTab({
                        url: '../myself/myself'
                    });
                    break;

                default:
                    uni.navigateTo({
                        url: `pages/${url}/${url}`
                    });
                    break;
            }
        },

        navigateSave(e) {
            uni.navigateTo({
                url: './pages/saveBureau/saveBureau'
            });
        },

        // 滑动切换标签时
        waterChange(e) {
            let currentTab = e.detail.current;
            console.log(currentTab);
            this.switchTab(currentTab);
        },

        // 下面是未来修左右滑动动效用到的代码
        // waterTransition(e) {
        //   // dx 表示左右滑动 : dx < 0 表示滑到上一个标签
        //   const dx = e.detail.dx;
        //   // console.log(e.detail);
        //   const currentTab = this.data.currentTab;
        //   const underLine_left = this.selectComponent("#TabScroll").data.underLine_left;
        //   const underLine_width = this.selectComponent("#TabScroll").data.underLine_width;
        //   // 公式计算：滑动屏幕百分比 * 下一段偏移度
        //   console.log(dx/this.data.windowWidth);
        //   let offset,offset_width;
        //   if(dx/this.data.windowWidth > 0) {
        //     offset = (dx/this.data.windowWidth) * (underLine_left[currentTab+1] - underLine_left[currentTab]) + underLine_left[currentTab];
        //     offset_width = (dx/this.data.windowWidth) * (underLine_width[currentTab+1] - underLine_width[currentTab]) + underLine_width[currentTab];
        //   }else if( dx/this.data.windowWidth < 0) {
        //     offset = (dx/this.data.windowWidth) * (underLine_left[currentTab] - underLine_left[currentTab-1]) + underLine_left[currentTab];
        //     offset_width = (dx/this.data.windowWidth) * (underLine_width[currentTab] - underLine_width[currentTab-1]) + underLine_width[currentTab];
        //   }
        //   this.selectComponent("#TabScroll").setData({offset,offset_width})
        // },
        // waterAnimationFinish(e) {
        //   const {current:currentTab,source} = e.detail;
        //   console.log(e.detail,23333);
        //   this.setTab(currentTab);
        //   console.log(currentTab);
        //   // 更新标签组件里的下划线参数
        //   this.selectComponent("#TabScroll").setData({currentTab,offset:null,offset_width:null})
        // },
        // 2. 操作数据库
        getData(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            //分页加载数据
            let args = uni.getStorageSync('args');
            let { currentPage, currentTab } = e.detail; // 当前选择的标签名字

            let ShowId = this.tabitem[currentTab].title; // 边界处理 - 用户没登录时

            let School = args.schoolName ? (args.schoolName == '游客登录' ? '广东石油化工学院' : args.schoolName) : '广东石油化工学院'; // 拉取数据

            let that = this;
            wx.cloud.callFunction({
                name: 'NewCampusCircle',
                data: {
                    type: 'read',
                    url: 'Card',
                    currentPage,
                    ShowId,
                    School
                },

                success(res) {
                    console.log('getData-more-成功');
                    const currComponent = that.$mp.page.selectComponent(`#waterFlowCards${currentTab}`); // 数据存在时

                    if (res.result && res.result.data.length > 0) {
                        // 页数++
                        currComponent.setData({
                            currentPage: ++currentPage
                        });
                        let allList = that.allList; // 添加新数据到 allList[currentTab] 里

                        allList[currentTab] = allList[currentTab].concat(res.result.data); // 赋值全局变量

                        app.globalData.allList = allList;
                        that.setData({
                            allList
                        }); // 数据少于一页时

                        if (res.result.data.length < 10) {
                            currComponent.setData({
                                loadAll: true
                            });
                        } // 新数据进行左右处理

                        currComponent.RightLeftSolution();
                    } else {
                        // 不存在数据时
                        app.globalData.allList = that.allList;

                        if (currComponent.data.leftH == 0 && currComponent.data.rightH == 0) {
                            currComponent.setData({
                                leftList: [],
                                rightList: [],
                                list: [null],
                                // 避免显示“玩命加载数据”
                                loadAll: true // 显示“暂无数据”
                            });
                        }
                    }
                },

                fail(res) {
                    console.log('请求失败', res);
                }
            });
        },

        // 3. 搜索框逻辑
        search_Input: function (e) {
            const { value } = e.detail; //拿到输入框中的值

            var that = this;
            let waterComponent = that.$mp.page.selectComponent(`#waterFlowCards0`);
            const args = uni.getStorageSync('args'); // 初始化定时器

            clearTimeout(this.timeId);
            this.timeId = setTimeout(() => {
                search(value); //发送请求，间隔时间为1s
            }, 500);

            const search = (value) => {
                if (value) {
                    uni.hideNavigationBarLoading();
                    wx.cloud.callFunction({
                        name: 'NewCampusCircle',
                        data: {
                            url: 'Card',
                            username: args.username,
                            type: 'search',
                            School: args.schoolName == '游客登录' ? '广东石油化工学院' : args.schoolName,
                            searchKey: value
                        },
                        success: (res) => {
                            // 回到第一个标签
                            that.switchTab(0); // 搜索有结果时

                            if (res.result.data.length != 0) {
                                // 清空瀑布流数据
                                waterComponent.RightLeftSolution(true); // 处理搜索结果

                                let allList = that.allList;
                                allList[0] = res.result.data;
                                that.setData({
                                    allList,
                                    tabitem: that.tabitem
                                });
                                waterComponent.RightLeftSolution();
                            } else {
                                uni.showToast({
                                    icon: 'none',
                                    title: '什么都找不到哟'
                                });
                                waterComponent.RightLeftSolution(true); // 显示“暂无数据”，不显示“玩命加载数据”

                                waterComponent.setData({
                                    loadAll: true,
                                    list: [1]
                                });
                            }
                        },
                        fail: (err) => {
                            console.error;
                        },
                        complete: (e) => {
                            uni.hideNavigationBarLoading();
                        }
                    });
                } else {
                    // 清空瀑布流内容
                    waterComponent.RightLeftSolution(true); // 重新加载数据

                    that.onPullDownRefresh();
                }
            };
        },

        // 4. 动效
        rotateAni: function (n) {
            // 实现image旋转动画，每次旋转 120*n度
            _animation.rotate(120 * n).step();

            this.setData({
                animation: _animation.export()
            });
        },

        // 开始旋转
        startAnimationInterval: function () {
            let that = this;
            that.rotateAni(++_animationIndex); // 进行一次旋转

            _animationIntervalId = setInterval(function () {
                that.rotateAni(++_animationIndex);
            }, _ANIMATION_TIME); // 每间隔_ANIMATION_TIME进行一次旋转

            console.log('begin旋转');
        },

        // 停止旋转
        stopAnimationInterval: function () {
            if (_animationIntervalId > 0) {
                clearInterval(_animationIntervalId);
                _animationIntervalId = 0;
                console.log('stop旋转');
            }
        },

        // 滑动选择标签   (与下方 setTab 不可合并，选择标签同时会滑动屏幕，导致连续两次请求数据库)
        switchTab: function (e) {
            // 获取索引值
            var currentTab = e; // 初始化 - 全部置零

            this.tabitem.forEach((item, index) => {
                item.type = 0;

                if (index == currentTab) {
                    item.type = 1;
                }
            });
            this.setData({
                tabitem: this.tabitem,
                currentTab
            });
            this.$mp.page.selectComponent(`#TabScroll`).setData({
                currentTab
            }); // 新页面获取数据 - 没有东西时才获取数据

            if (app.globalData.allList[currentTab].length) {
                console.log('页面已经有数据了，不请求数据库');
                return;
            } else {
                this.$mp.page.selectComponent(`#waterFlowCards${currentTab}`).getData();
            }
        },

        // 点击选择标签
        setCurrentTab: function (e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            var currentTab = e.detail.currentTarget.dataset.index; // 初始化标签

            this.tabitem.forEach((item, index) => {
                item.type = 0;

                if (index == currentTab) {
                    item.type = 1;
                }
            }); // 赋值currentTab后，就会触发switchTab函数。这样避免了连续两次请求

            this.setData({
                tabitem: this.tabitem,
                currentTab
            });
        },

        // 初始化函数
        init() {
            let args = uni.getStorageSync('args'); // 判断登录

            app.globalData.loginState(); // 初始化标签

            let tabitem = args.tabitem
                ? args.tabitem.map((e, index) => {
                      if (index == 0) {
                          return {
                              title: e,
                              type: 1
                          };
                      }

                      return {
                          title: e,
                          type: 0
                      };
                  })
                : this.tabitem; // 兜底数据
            // 初始化封号

            var campus_account = args.campus_account ? args.campus_account : false;
            var describe = args.describe ? args.describe : false;

            if (campus_account === true) {
                uni.showModal({
                    title: '提示',
                    content: describe,
                    showCancel: false,

                    success(res) {
                        if (res.confirm) {
                            uni.reLaunch({
                                url: '/pages/index/index'
                            });
                        }
                    }
                });
            } // 初始化 allList

            let allList = tabitem.map((item, index) => {
                let allList = [];
                return (allList[index] = []);
            });
            this.setData({
                currentTab: 0,
                // 返回到第一个标签
                showPopUps: false,
                // 关闭弹窗
                ifScroll: false,
                // 初始化瀑布流滑动
                tabitem,
                // 初始化标签
                campus_account,
                // 初始化封号
                allList,
                // 初始化allList
                iconUrl: args.iconUrl,
                // 获取头像
                school: args.school // 获取学校
            });

            for (let i in tabitem) {
                this.$mp.page.selectComponent(`#waterFlowCards${i}`).setData({
                    loadAll: false
                });
            }
        },

        onPullDownRefresh(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 onPullDownRefresh 未声明');
        },

        onReachBottom(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 onReachBottom 未声明');
        },

        onLoad(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 onLoad 未声明');
        }
    }
};
</script>
<style>
/* pages/more/more.wxss */
.container {
    /* overflow: hidden; */
}
.TabScroll_Fixed {
    position: fixed;
}
.page {
    width: 100%;
    margin: 0;
}
.head {
    position: fixed;
    background-color: white;
    z-index: 2;
    width: 100%;
    overflow-x: auto;
}
.head_second {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    width: 100vw;
}
.avatarBox {
    display: flex;
    align-items: center;
    padding-left: 20rpx;
}
.avatarBox image {
    width: 65rpx;
    height: 65rpx;
    border-radius: 50%;
}
/* 更多模块 */
.naviModule_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.naviModule {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.module {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 330rpx;
    height: 50px;
    margin: 7.5px;
    border-radius: 20rpx;
    border: 1rpx solid #ccc;
}
.leaderBoard {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 690rpx;
    height: 100rpx;
    border-radius: 20rpx;
    border: 1rpx solid #ccc;
}
.searchFrame {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50rpx;
    width: 47%;
    font-size: 25rpx;
    border-radius: 15rpx;
    background-color: rgba(202, 202, 202, 0.342);
    margin-left: 20rpx;
}
.searchFrame image {
    margin: 10rpx;
    width: 30rpx;
    height: 30rpx;
}
.searchFrame input {
    width: 95%;
    padding: 0rpx 3rpx;
    color: rgb(142, 142, 142);
}

.newInfo {
    position: relative;
    display: flex;
    margin-left: 10rpx;
}

.Line {
    background: #9b9b9b48;
    width: 100%;
    height: 1rpx;
}
/* 新消息提醒 */
.newInfo image {
    width: 50rpx;
    height: 50rpx;
}
.newInfo_redPoint {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    background-color: rgba(230, 130, 130, 1);
}
.newInfo_redPoint text {
    font-size: 20rpx;
    color: #fff;
}
/* 小圆圈加载 */
.showLoading {
    width: 45rpx;
    height: 45rpx;
    position: relative;
    left: 355rpx;
}

.img-button {
    display: flex;
    justify-content: center;
    align-items: center;
}

.content_btn {
    position: fixed;
    width: 105rpx;
    height: 80rpx;
    right: 0rpx;
    box-shadow: 0px 0px 4px 0px #c7c7c7;
    border-top-left-radius: 40rpx;
    border-bottom-left-radius: 40rpx;
    background-color: rgba(255, 255, 255, 0.685);
}
.content_btn_add {
    bottom: 180rpx;
    /* display: none; */
}
.content_btn_user {
    bottom: 80rpx;
}
.content_btn_add image {
    width: 48rpx;
    height: 48rpx;
}
.content_btn_user image {
    width: 54rpx;
    height: 54rpx;
}
.content_btn_save image {
    width: 54rpx;
    height: 54rpx;
}

.chooseImg-btn {
    width: 100%;
    height: 380rpx;
    background-color: rgba(241, 229, 201, 0.26);
}
.swiper_ {
    height: auto !important;
    min-height: 100vh;
    z-index: 5;
}
.swiperItem {
    height: auto !important;
}
/* 弹窗 */
.popUps {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    transition: all 0.15s ease 0s;
    z-index: -1;
    opacity: 0;
}
/* .mengban {
  width: 100%;
  height: 100%;
  background-color: rgb(15, 15, 15);
  opacity: 0;
  transition: all 0.3s ease 0s;
}
.mengbanActive {
  opacity: 0.7;
} */
.popUpsActive {
    z-index: 999 !important;
    opacity: 1 !important;
}
/* 点击盒子 */
.bindBoxFlex {
    width: 100%;
    position: absolute;
    bottom: 40%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20rpx;
    box-sizing: border-box;
}
.bindBoxFlex .bindBox {
    width: 150rpx;
    height: 150rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: purple; */
}
.bindBoxFlex .bindBox .imageBox {
    width: 100rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: pink;
    border-radius: 50%;
}
.bindBoxFlex .bindBox text {
    margin-top: 20rpx;
    font-size: 26rpx;
    letter-spacing: 2rpx;
}
.bindBoxFlex .bindBox .imageBox image {
    width: 70rpx;
    height: 70rpx;
}
/* 关闭 */
.popUps .cancelBox {
    width: 100%;
    position: absolute;
    bottom: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.popUps .cancelBox .cancel {
    width: 60rpx;
    height: 60rpx;
    background-color: rgb(229, 229, 229);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.popUps .cancelBox .cancel image {
    width: 50rpx;
    height: 50rpx;
}

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

@media (prefers-color-scheme: dark) {
    .container {
        filter: invert(0) !important;
    }
    image {
        filter: invert(1) !important;
    }
    .content_btn {
        filter: invert(1) !important;
    }
    .head {
        position: fixed;
        background-color: #faf9f9;
    }
    scroll-view {
        filter: invert(100%) !important;
    }

    .newInfo_redPoint {
        filter: invert(100%) !important;
    }
    /* 发布页面 */

    .choosenLabel {
        color: #fff;
        filter: invert(100%) !important;
    }
    .edit_pic_Title,
    .edit_background,
    .edit_pic_Text {
        color: #fff;
        filter: invert(100%) !important;
    }
    /* 弹窗 */
    .popUps {
        background-color: rgb(13, 13, 13);
    }
    .popUps .bindBoxFlex .bindBox text {
        color: #fff;
    }
    .popUps .cancelBox .cancel {
        filter: invert(100%) !important;
    }
}
</style>
