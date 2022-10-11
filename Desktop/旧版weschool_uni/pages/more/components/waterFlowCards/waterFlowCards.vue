<template>
    <view>
        <scroll-view
            :scroll-y="true"
            :style="'height:' + height + '; background-color: rgba(153, 153, 153, 0.11);'"
            @scrolltolower="onReachBottom"
            lower-threshold="0"
            @scrolltoupper="onPullDownRefresh"
            upper-threshold="-10"
            enable-back-to-top
            fast-deceleration
            paging-enabled
        >
            <view class="content" :style="'opacity: ' + (listClone[0] ? 1 : 0) + ';'">
                <view class="left">
                    <view v-for="(item, index) in leftList" :key="item.leftList">
                        <block v-if="item.Label == '寻物发布'">
                            <LoseCard :item="item" type="left" :currentTab="currentTab"></LoseCard>
                        </block>

                        <block v-else-if="item.Label == '闲聊'">
                            <loveCards :item="item" type="left" @ShowContent="getBackData" />
                        </block>

                        <block v-else-if="item.Label == '社团招新'">
                            <freshman :item="item" type="left" :currentTab="currentTab" />
                        </block>

                        <block v-else-if="item.Label == '社团赛事'">
                            <match :item="item" type="left" :currentTab="currentTab" />
                        </block>

                        <block v-else>
                            <campusCards :item="item" type="left" :currentTab="currentTab" />
                        </block>
                    </view>
                </view>
                <view class="right">
                    <view v-for="(item, index) in rightList" :key="item.rightList">
                        <block v-if="item.Label == '寻物发布'">
                            <LoseCard :item="item" type="right" :currentTab="currentTab"></LoseCard>
                        </block>

                        <block v-else-if="item.Label == '社团招新'">
                            <freshman :item="item" type="fight" :currentTab="currentTab" />
                        </block>

                        <block v-else-if="item.Label == '社团赛事'">
                            <match :item="item" type="left" :currentTab="currentTab" />
                            、
                        </block>

                        <block v-else>
                            <campusCards :item="item" type="right" :currentTab="currentTab" />
                        </block>
                    </view>
                </view>
            </view>
            <!-- 边界处理 -->
            <view class="DataNull" v-if="loadAll">-无更多内容-</view>
            <!-- 边界处理 -->
            <view class="DataNull" v-if="listClone.length == 0">正在玩命加载数据...</view>
        </scroll-view>
    </view>
</template>

<script>
import campusCards from './components/campusCards/campusCards';
import LoseCard from '../LoseCard/LoseCard';
import loveCards from './components/loveCards/loveCards';
import match from './components/match/match';
import freshman from './components/freshman/freshman';
export default {
    components: {
        campusCards,
        LoseCard,
        loveCards,
        match,
        freshman
    },
    data() {
        return {
            currentPage: 0,

            // 当前第几页,0代表第一页
            loadAll: false,

            // 状态标志 - 是否加载完所有内容
            Label: '全部',

            // 当前标签
            leftList: [],

            // 左列表
            rightList: [],

            // 右列表
            leftH: 0,

            // 当前左列表高度
            // 当前右列表高度
            rightH: 0,

            listClone: []
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        // 用于滑动逻辑
        tabitem: {
            type: Array,
            default: () => []
        },
        height: {
            type: String,
            default: ''
        },
        // 当前组件需渲染的数据
        list: {
            type: Array,
            default: () => []
        },
        // 本组件的下标
        currentTab: {
            type: Number
        },
        // 控制可否滑动
        ifScroll: {
            type: Boolean,
            default: false
        }
    },
    beforeMount() {
        // this.RightLeftSolution(true)
    },
    mounted: function () {
        // console.log(this.data.list);
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onReachBottom() {
            console.log('瀑布流 - 上拉触底');
            this.$emit('onReachBottom');
        },

        onPullDownRefresh() {
            this.$emit('onPullDownRefresh');
        },

        getData() {
            let e = {
                currentPage: this.currentPage,
                // 本组件当前第几页
                currentTab: this.currentTab // 本组件索引 - 方便标签选择
            }; // 边界处理，拉到最底部时不允许再请求数据库

            if (this.loadAll) {
                return;
            }

            this.$emit('getData', {
                detail: e
            });
            console.log('getData');
        },

        //处理左右结构
        RightLeftSolution(empty = false) {
            if (empty) {
                this.setData({
                    currentPage: 0,
                    leftList: [],
                    rightList: [],
                    leftH: 0,
                    rightH: 0,
                    listClone: [null]
                });
                return;
            }

            let currentTab = this.currentTab;
            let list = this.list;
            console.log(list, '丢入瀑布流的数据'); // 边界处理

            if (list[0] == null) {
                return;
            } // 兼容 “我的发布” 页面，这个页面没有 currentTab

            if (currentTab) {
                // 边界条件 - 存在即赋值，不存在即初始化
                if (getApp().globalData.allList) {
                    getApp().globalData.allList[currentTab] = list;
                } else {
                    let allList = new Array(this.tabitem.length);
                    getApp().globalData.allList = allList;
                }
            }

            for (let i = 0; i < list.length; i++) {
                // 兼容点赞/评论
                this.leftList.forEach((e) => {
                    if (e._id === list[i]._id) {
                        e.Star_User = list[i].Star_User;
                        e.CommentList = list[i].CommentList;
                    }
                });
                this.rightList.forEach((e) => {
                    if (e._id === list[i]._id) {
                        e.Star_User = list[i].Star_User;
                        e.CommentList = list[i].CommentList;
                    }
                }); // 边界判断: 如果该数据在页面中已存在，则continue

                if (this.leftList || this.rightList) {
                    // 无法直接对比对象，因此拿到文章id进行比较
                    let leftListID = this.leftList.map((item) => {
                        return item._id;
                    });
                    let rightListID = this.rightList.map((item) => {
                        return item._id;
                    });

                    if (leftListID.includes(list[i]._id) || rightListID.includes(list[i]._id)) {
                        continue;
                    }
                } // 判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边

                if (this.leftH <= this.rightH) {
                    this.leftList.push(list[i]);
                    this.leftH += list[i].ShowHeight;
                } else {
                    this.rightList.push(list[i]);
                    this.rightH += list[i].ShowHeight;
                }
            }

            this.setData({
                leftList: this.leftList,
                rightList: this.rightList
            });
            console.log(this.leftList, this.rightList, '左右列表');
        },

        getBackData() {
            console.log('占位：函数 getBackData 未声明');
        }
    },
    watch: {
        list: {
            handler: function (newVal, oldVal) {
                this.listClone = newVal;
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
.content {
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    /* align-items: center; */
    overflow: hidden;
    margin: 10rpx;
    box-sizing: border-box;
    transition: all 0.3s ease 0s;
}

.left {
    width: 360rpx;
}

.right {
    width: 360rpx;
    margin-left: 10rpx;
}

.DataNull {
    font-size: 26rpx;
    color: #2c2c2cb4;
    display: flex;
    justify-content: center;
}
</style>
