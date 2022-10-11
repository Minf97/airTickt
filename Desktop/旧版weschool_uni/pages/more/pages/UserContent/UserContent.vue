<template>
    <view>
        <!-- index.wxml -->
        <!-- 用户头像和昵称 -->
        <!-- <image class="background" src="https://s2.loli.net/2022/02/09/nsT8MXBPzRrbxfW.png"></image> -->
        <!-- <view class="all">
    <view class="zhong">
        <view class="zz">

            <view class="header">
                <view class="user-pic">
                    <open-data type="userAvatarUrl"></open-data>
                </view>
                <view class="user-name">
                    <view>
                        <open-data type="userNickName"></open-data>
                    </view>
                    <text class="name">小红书号:4962265877</text>
                </view>
            </view>

            <view class="zh">
                {{item}}
            </view>

            <view class="zh2">
                <view wx:for="{{array}}" wx:for-item="item">
                    <view class="zh2-1">{{item.biaoqian}}</view>
                </view>
            </view>
            <view class="zh3">
                <view class="zz2">
                    <view class="zh3-1">
                        <view class="zh3-1-1">1</view>
                        <view class="zh3-1-2">关注</view>
                    </view>
                    <view class="zh3-1">
                        <view class="zh3-1-1">1</view>
                        <view class="zh3-1-2">关注</view>
                    </view>
                    <view class="zh3-1">
                        <view class="zh3-1-1">456</view>
                        <view class="zh3-1-2">关注与收藏</view>
                    </view>
                </view>

                <view class="zz3">
                    <view class="zh3-2">
                        关注
                    </view>
                    <view class="zh3-3">
                        <image src="images/l.png" style="width:50rpx;height: 50rpx;"></image>
                    </view>
                </view>
            </view>

        </view>
    </view>
</view> -->

        <!-- <Loading wx:if="{{showLoading == 0}}"></Loading> -->
        <waterFlowCards
            id="waterFlowCards"
            :list="list"
            height="100vh"
            @getData="getData($event, { tagId: 'waterFlowCards' })"
            @testFnc="onReachBottom($event, { tagId: 'waterFlowCards' })"
            @onPullDownRefresh="onPullDownRefresh($event, { tagId: 'waterFlowCards' })"
        ></waterFlowCards>
    </view>
</template>

<script>
import waterFlowCards from '../../components/waterFlowCards/waterFlowCards';
import Loading from '../../components/Loading/Loading';
export default {
    components: {
        waterFlowCards,
        Loading
    },
    data() {
        return {
            // 丢入瀑布流的数据
            list: [],

            item: '一半山河一般啊,江河一半山河一般啊,江河,一半山河一般啊,江河一半山河一般啊,江河,',

            array: [
                {
                    biaoqian: '张三'
                },
                {
                    biaoqian: '李四'
                },
                {
                    biaoqian: '王五'
                }
            ],

            // 动画显示
            showLoading: 1,

            currentPage: 0,
            loadAll: false,
            leftList: [],
            rightList: []
        };
    },
    onLoad: function (options) {
        this.init();
        this.onPullDownRefresh();
    },
    // 下拉刷新
    onPullDownRefresh() {
        // 在标题栏中显示加载
        uni.showNavigationBarLoading(); // 初始化定时器

        clearTimeout(this.TimeOut); // 开启动画

        this.setData({
            showLoading: 0
        }); // 重置组件内的 currentPage 和 loadAll

        this.$mp.page.selectComponent(`#waterFlowCards`).setData({
            currentPage: 0
        });
        this.$mp.page.selectComponent(`#waterFlowCards`).setData({
            loadAll: false
        });
        this.TimeOut = setTimeout(() => {
            console.log('下拉刷新');
            this.$mp.page.selectComponent(`#waterFlowCards`).RightLeftSolution(true);
            this.$mp.page.selectComponent(`#waterFlowCards`).getData(); // 完成停止加载

            uni.hideNavigationBarLoading(); // 停止动画

            this.setData({
                showLoading: 1
            });
        }, 1000);
    },
    // 上拉触底改变状态
    onReachBottom() {
        console.log(123);
        uni.showLoading({
            title: '加载更多中',
            mask: true
        });
        this.$mp.page.selectComponent(`#waterFlowCards`).getData();
        uni.hideLoading();
    },
    methods: {
        onLazyLoad(info) {
            console.log(info);
        },

        getData(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            //分页加载数据
            let args = uni.getStorageSync('args');
            let currentPage = e.detail.currentPage;
            console.log(currentPage, 'currentPage'); // 拉取数据

            let that = this;
            let list = this.list;
            wx.cloud.callFunction({
                name: 'CampusCircle',
                data: {
                    type: 'readUser',
                    currentPage: currentPage,
                    username: args.username
                },

                success(res) {
                    console.log(res);
                    const currComponent = that.$mp.page.selectComponent(`#waterFlowCards`); // 数据存在时

                    if (res.result && res.result.data.length > 0) {
                        // 页数++
                        currComponent.setData({
                            currentPage: ++currentPage
                        }); // 添加新数据到 list 里

                        list = list.concat(res.result.data);
                        console.log(list, 'list');
                        that.setData({
                            list
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
                                rightList: []
                            });
                        }

                        currComponent.setData({
                            loadAll: true,
                            list: [null]
                        });
                    }
                },

                fail(res) {
                    console.log('请求失败', res);
                }
            });
        },

        init() {
            let list = [];
            this.setData({
                list
            });
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
@media (prefers-color-scheme: dark) {
    scroll-view {
        filter: invert(0) !important;
    }
}

/**index.wxss**/

.all {
    background-image: url('https://s2.loli.net/2022/02/09/nsT8MXBPzRrbxfW.png');

    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: -1;
    height: 70%;
}

.zhong {
    background-color: rgba(41, 39, 39, 0.6);
    height: 70%;
}

.user-pic {
    /*头像*/

    overflow: hidden;
    width: 150rpx;
    height: 150rpx;
    margin-right: 20rpx;
    border: solid 3rpx white;
    border-radius: 100%;
}

.user-name {
    /*昵称*/
    color: white;
    font-size: 20px;
    font-weight: 600;
}

.name {
    font-style: normal;
    font-size: 25rpx;
    color: rgba(255, 255, 255, 0.7);
}

.header {
    margin-top: 180rpx;
    display: flex;

    align-items: center;
    /* background-color: cornflowerblue; */

    background-image: url('../../../../static/images/1.png');
}

.zz {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-bottom: 60rpx;

    margin-left: 30rpx;
}

.zh {
    width: 65%;
    margin-top: 25rpx;
    font-size: 30rpx;
    color: rgba(255, 255, 255, 0.8);
    /* background-color:cadetblue; */
    display: -webkit-box;

    overflow: hidden;

    text-overflow: ellipsis;

    word-wrap: break-word;

    white-space: normal !important;

    -webkit-line-clamp: 2;

    -webkit-box-orient: vertical;
}

.zh2 {
    width: 80%;
    height: 40rpx;
    /* background-color: chocolate; */
    margin-top: 25rpx;
    display: flex;
    justify-content: flex-start;
}

.zh2-1 {
    height: 80%;
    font-size: 25rpx;
    border-radius: 10px;
    color: white;
    background-color: rgba(167, 160, 160, 0.5);
    padding: 5rpx 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20rpx;
}

.zh2-1 image {
    width: 100rpx;
    height: 200rpx;
}

.zh3 {
    /* background-color:darkgray;  */
    display: flex;
    margin-top: 35rpx;
    margin-bottom: 35rpx;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.zz2 {
    width: 40%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 26rpx;
    /* background-color: darkkhaki; */
    justify-content: space-between;
}

.zh3-1 {
    display: flex;
    flex-direction: column;

    color: rgba(255, 255, 255, 0.9);
}

.zh3-1-1 {
    font-weight: 600;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.zh3-1-2 {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.zz3 {
    width: 60%;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: flex-end;
}

.zh3-2 {
    height: 100%;
    width: 180rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    border-radius: 50rpx;
    background-color: hsla(12, 97%, 48%, 0.97);
    color: white;
    margin-right: 20rpx;
    padding: 5px;
}

.zh3-3 {
    border: 1rpx solid rgb(231, 224, 224);

    margin-right: 20rpx;
    border-radius: 30rpx;
    background-color: rgba(167, 160, 160, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1px 5px;
}

page {
}

.f {
    border-radius: 50%;
}

.case-page {
    padding: 20rpx;
    background-color: rgba(255, 255, 255);
    border-radius: 20rpx;
    box-shadow: 0 -4px 5px -3px rgb(243, 237, 237);
    background-color: white;
    position: absolute;
    top: 420rpx;
}

.top {
    margin-bottom: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    border-radius: 50rpx;
}

.z1 {
    margin-right: 10rpx;
}

.z2 {
    margin-left: 70rpx;
}

/* .list-masonry{
    column-count: 2;
    column-gap: 10rpx;
    border-top: solid 1rpx rgba(167, 160, 160, 0.5);
  }
  .item-masonry{
    background-color:white;
    break-inside: avoid;
    box-sizing: border-box; 
    padding: 20rpx;
    margin-bottom:20rpx;
  }
  .item-masonry image {
    width: 100%;
    border-radius: 5%;
  } 
  */
.bottom {
    height: 500rpx;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
}

.b1 {
    background-color: sienna;
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

.content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
    margin: 10rpx;
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

.content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
    margin: 10rpx;
}
</style>
