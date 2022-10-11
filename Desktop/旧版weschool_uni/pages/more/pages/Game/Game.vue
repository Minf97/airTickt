<template>
    <view>
        <scroll-view scroll-y style="height: 100vh">
            <!-- 顶部banner -->
            <swiper class="banner">
                <block v-for="(item, index) in imageList" :key="index">
                    <swiper-item>
                        <image :src="item" mode="widthFix"></image>
                    </swiper-item>
                </block>
            </swiper>

            <view class="head">
                <view :style="'height: ' + statusBarHeight + 'px;'" />

                <view class="head_second" :style="'height: ' + lineHeight + 'px;'">
                    <view class="back" @tap="backToMore">
                        <image src="/static/pages/more/pages/Game/images/left.png" />
                    </view>
                    <view>电子游戏板块</view>
                </view>
            </view>
            <!-- 标签 -->
            <TabScroll type="校友圈标签" :tabItem="tabItem" :showTab="true" />
            <!-- 信息流 -->
            <swiper :current="currentTab" @change="waterChange">
                <block v-for="(item, index) in allList_Game" :key="index">
                    <swiper-item>
                        <InfoFlowCards
                            :id="'InfoFlowCards' + index"
                            :list="item"
                            @getData="getData($event, { tagId: 'InfoFlowCards' + index })"
                            @onReachBottom="onReachBottom($event, { tagId: 'InfoFlowCards' + index })"
                            @onPullDownRefresh="onPullDownRefresh($event, { tagId: 'InfoFlowCards' + index })"
                        />
                    </swiper-item>
                </block>
            </swiper>
        </scroll-view>
    </view>
</template>
<script module="Game" lang="wxs" src="./Game.wxs"></script>
<script>
import TabScroll from '../../components/TabScroll/TabScroll';
import InfoFlowCards from '../../components/InfoFlowCards/InfoFlowCards';
export default {
    components: {
        TabScroll,
        InfoFlowCards
    },
    data() {
        return {
            statusBarHeight: getApp().globalData.statusBarHeight,
            lineHeight: getApp().globalData.lineHeight,
            rectHeight: getApp().globalData.rectHeight,
            windowHeight: getApp().globalData.windowHeight,

            tabItem: [
                {
                    title: '全部',
                    type: 0
                },
                {
                    title: '王者荣耀',
                    type: 0
                },
                {
                    title: '和平精英',
                    type: 0
                }
            ],

            imageList: ['/static/pages/more/pages/Game/images/LOL1.jpg', '/static/pages/more/pages/Game/images/LOL2.jpg'],

            // 渲染总数据
            allList_Game: [],

            // 当前选中标签
            currentTab: 0,

            currentPage: 0,
            loadAll: false,
            allList: '',
            leftList: [],
            rightList: [],
            list: []
        };
    },
    onLoad: function (options) {
        this.init();
    },
    onReady: function () {},
    onShow: function () {},
    // 下拉刷新
    onPullDownRefresh() {
        // 在标题栏中显示加载
        uni.showNavigationBarLoading(); // 重置组件内的 currentPage 和 loadAll

        let currentTab = this.currentTab;
        this.$mp.page.selectComponent(`#InfoFlowCards${currentTab}`).setData({
            currentPage: 0
        });
        this.$mp.page.selectComponent(`#InfoFlowCards${currentTab}`).setData({
            loadAll: false
        }); // 定时器防抖

        this.TimeOut = setTimeout(() => {
            console.log('下拉刷新'); // 清空信息流内容，并再次请求数据库

            this.$mp.page.selectComponent(`#InfoFlowCards${currentTab}`).init();
            this.$mp.page.selectComponent(`#InfoFlowCards${currentTab}`).getData(); // 在标题栏中停止加载

            uni.hideNavigationBarLoading(); // 停止下拉刷新

            uni.stopPullDownRefresh();
        }, 1000);
    },
    onReachBottom: function () {},
    onShareAppMessage: function () {},
    methods: {
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
                    const currComponent = that.$mp.page.selectComponent(`#InfoFlowCards${currentTab}`); // 数据存在时

                    if (res.result && res.result.data.length > 0) {
                        // 页数++
                        currComponent.setData({
                            currentPage: ++currentPage
                        });
                        let allList = that.allList; // 添加新数据到 allList[currentTab] 里

                        allList[currentTab] = allList[currentTab].concat(res.result.data); // 赋值全局变量

                        app.globalData.allList = allList;
                        console.log(allList);
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

        // 初始化函数
        init() {
            const args = uni.getStorageSync('args'); // 判断登录

            app.loginState(); // 初始化标签

            let tabItem = args.tabitem
                ? args.tabItem.map((e, index) => {
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
                : this.tabItem; // 初始化 allList

            let allList_Game = tabitem.map((item, index) => {
                let allList_Game = [];
                return (allList_Game[index] = []);
            });
            this.setData({
                tabItem,
                allList_Game,
                currentTab: 0 // 初始化选中第一个标签
            });
        },

        backToMore() {
            console.log('占位：函数 backToMore 未声明');
        },

        waterChange() {
            console.log('占位：函数 waterChange 未声明');
        },

        onReachBottom(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 onReachBottom 未声明');
        },

        onPullDownRefresh(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 onPullDownRefresh 未声明');
        }
    }
};
</script>
<style>
/* 头部banner */
swiper-item image {
    width: 100%;
    height: 200rpx;
}
/* 头部 */
.head .head_second {
    display: flex;
    justify-content: center;
    align-items: center;
}
.head_second .back {
    position: absolute;
    left: 20rpx;
    width: 40rpx;
    height: 40rpx;
}
.head_second .back image {
    width: 40rpx;
    height: 40rpx;
}

.test {
    display: flex;
    flex-direction: row;
}
@media (prefers-color-scheme: dark) {
    .head_second .back image {
        filter: invert(0) !important;
    }
}
</style>
