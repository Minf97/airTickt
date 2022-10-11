<template>
    <view>
        <!-- 校园圈首页标签 -->
        <scroll-view
            :scroll-x="true"
            :scroll-with-animation="true"
            :scroll-into-view="'tabItem' + currentTab"
            v-if="type == '校友圈标签' && showTab"
            :enhanced="true"
            :show-scrollbar="false"
        >
            <view class="Choose_Label" :scroll-x="true">
                <!-- 下划线 -->
                <view class="underLineBox" :style="'width: ' + underLine_width[currentTab] + 'rpx; left:' + (offset || underLine_left[currentTab]) + 'rpx;'">
                    <view class="underLine" :style="'width: ' + (offset_width || underLine_width[currentTab] - 30) + 'rpx;'"></view>
                </view>

                <view
                    :class="'Label-text ' + (item.type == 1 ? 'activeTab' : '')"
                    :id="'tabItem' + (index + 2)"
                    :data-title="item.title"
                    :data-index="index"
                    @tap="setTab"
                    v-for="(item, index) in tabItem"
                    :key="index"
                >
                    <view class="Label_limit" :style="'width: ' + tabItemLength[index] * 18 + 'rpx;'">{{ item.title }}</view>
                </view>
            </view>
        </scroll-view>
        <!-- 发布页面标签 -->
        <scroll-view :scroll-x="true" :scroll-with-animation="true" :scroll-into-view="'tabItem' + currentTab" class="choose_First" v-if="type == '发布页面标签' && showTab">
            <view class="Choosen" :scroll-x="true" v-if="!hideHidden">
                <view class="Label-text" :id="'tabItem' + (index + 3)" :data-index="index" @tap="chooseTab" v-for="(item, index) in menu" :key="index">
                    <view class="Label_limit1">{{ item }}</view>
                </view>
            </view>
        </scroll-view>
        <!-- 游戏板块标签 -->
        <scroll-view
            class="Game_Scroll"
            v-if="type == '游戏标签' && showTab"
            scroll-y
            scroll-with-animation
            :scroll-into-view="'tabItem' + currentTab"
            :style="'height: ' + height + ';'"
        >
            <block class="Game_block" v-for="(item, index) in tabItem" :key="index">
                <view class="Game_box" :id="'tabItem' + (index + 2)" :data-index="index" @tap="Game_setTab">{{ item.title }}</view>
            </block>
        </scroll-view>
    </view>
</template>

<script>
// components/TabScroll/TabScroll.js
export default {
    data() {
        return {
            tabItemConfig: [],

            // 每个标签的字符长度
            currentTab: 0,

            // 当前被选中标签的下标
            offset: 0,

            // 下划线滑动时偏移量
            offset_width: 0,

            // 下划线滑动时宽度计算量
            underLine_left: [],

            // 下划线偏移
            // 下划线宽度
            underLine_width: [],

            tabItemLength: '',
            hideHidden: '',
            height: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        type: {
            // 调用组件类型
            type: String,
            default: ''
        },
        tabItem: {
            // 传入的标签数组
            type: Array,
            default: () => []
        },
        menu: {
            // 发布页面选择标签
            type: Array,
            default: () => []
        },
        showTab: {
            // 控制显隐
            type: Boolean
        }
    },
    mounted: function () {
        let tabItem = this.tabItem;
        let tabItemLength = [];
        let underLine_width = []; // 下划线宽度 = 字符数 * 单个字符宽度

        let underLine_left = []; // 下划线偏移 = (2n+1)*内间距 + 前n个宽度; n = 下标

        tabItem.map((item, index) => {
            // 正则匹配出 ‘单字节’‘双字节’‘表情’
            const SHUANG_ZI_JIE = item['title'].match(/[\u4e00-\u9fa5+]/g) || '';
            const DAN_ZI_JIE = item['title'].match(/[\w]/g) || '';
            const Emoji = item['title'].match(/[^\w\u4e00-\u9fa5+][^\s]/g) || ''; // 计算出每个标签的长度

            if (SHUANG_ZI_JIE || DAN_ZI_JIE) {
                tabItemLength[index] = SHUANG_ZI_JIE.length * 2 + DAN_ZI_JIE.length * 0.8 + Emoji.length * 0.8;
            } // 处理得到 underLine_width ------ 18是多次实验得到，30是内边距

            underLine_width[index] = tabItemLength[index] * 18 + 28; // 处理得到 underLine_left

            const accumulate_Width = () => {
                let accumulate_Width = 0;

                for (let i = 0; i < tabItemLength.length - 1; i++) {
                    accumulate_Width += tabItemLength[i] * 18 + 27;
                }

                return accumulate_Width;
            };

            underLine_left[index] = accumulate_Width();
        }); // 处理得到当前被选择的标签

        let currentTab;
        this.tabItem.forEach((e, index) => {
            if (e.type == 1) {
                currentTab = index;
            } else {
                ('');
            }
        });
        this.setData({
            tabItemLength,
            underLine_width,
            underLine_left,
            currentTab
        });
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 校园圈首页选择标签
        setTab(e) {
            this.setData({
                currentTab: e.currentTarget.dataset['index']
            });
            this.$emit('setTab', {
                detail: e
            });
        },

        // 发布页面选择标签
        chooseTab(e) {
            this.$emit('chooseTab', {
                detail: e
            });
        },

        Game_setTab() {
            console.log('占位：函数 Game_setTab 未声明');
        }
    }
};
</script>
<style>
.Choose_Label {
    position: relative;
    width: 100%;
    height: 29px;
    background-color: rgba(255, 255, 255, 0.363);
    display: flex;
    flex-direction: row;
    align-items: center;
}

.Choose_Label .underLineBox {
    height: 4rpx;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /* transition: all 0.1s ease 0s; */
}
.Choose_Label .underLine {
    height: 5rpx;
    background-color: #000;
    border-radius: 16rpx;
    /* transition: all 0.3s ease 0s; */
}
.Label-text {
    /* margin: 0rpx 45rpx 0rpx 0rpx; */
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: rgba(80, 80, 80, 0.938);
    font-size: 27rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.activeTab {
    height: 50rpx;
    color: rgba(46, 46, 46, 0.938);
    font-weight: 550;
    font-size: 30rpx;
}
.Label-text.activity {
    height: 50rpx;
    background-color: rgba(206, 206, 206, 0.267);
    color: rgba(46, 46, 46, 0.938);
    font-weight: 550;
    border-radius: 20rpx;
}
.Label_limit {
    width: auto;
    padding: 0 15rpx;
    /* height: 5rpx; */
    display: flex;
    align-items: center;
    white-space: nowrap;
    justify-content: center;
}

.Label_limit1 {
    width: auto;
    padding: 0 15rpx;
    /* height: 5rpx; */
    display: flex;
    align-items: center;
    white-space: nowrap;
    justify-content: center;
}

/* 发布页面标签 */
.choose_First {
    background-color: rgba(236, 236, 236, 0.219);
}
.Choosen {
    width: 100%;
    height: 68rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
}

/* 游戏板块 */
.Game_Scroll {
    background-color: rgba(236, 236, 236);
}
.Game_Scroll .Game_block {
    display: flex;
    flex-direction: column;
    width: 100rpx;
}
/* 暗黑 */
@media (prefers-color-scheme: dark) {
    .Choose_Label {
        filter: invert(100%) !important;
    }
    scroll-view {
        filter: invert(100%) !important;
    }

    .Label_limit {
        filter: invert(100%) !important;
        color: #fff;
    }

    .Label_limit1 {
        filter: invert(0%) !important;
        color: #fff;
    }

    /* 发布页面标签 */
    .choose_First {
        background-color: rgba(245, 245, 245) !important;
        filter: invert(0) !important;
    }
    .choose_First .Choosen {
        color: #fff;
        filter: invert(100%) !important;
    }
}
</style>
