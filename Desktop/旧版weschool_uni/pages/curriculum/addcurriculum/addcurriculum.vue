<template>
    <view>
        <!-- parse <template is="head-block" :data="type: template.type, index, array, text: template.text">
</template> -->
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

        <view class="all">
            <view class="container" v-if="index == 0">
                <view class="block" :id="index" @tap="change" v-for="(item, index) in kcmc" :key="item.key">
                    <label class="block_kcmc">{{ item }}</label>

                    <view class="block_bottom" v-if="school == '广东石油化工学院'">
                        <label class="block_teacher">{{ ll[item]['data'][0].teaxms }}</label>
                        <label class="block_skcs">剩余{{ ll[item]['data'].length }}次课</label>
                    </view>

                    <view class="block_bottom" v-else>
                        <label class="block_teacher">{{ ll[item]['data'][0].teaxms }}</label>
                        <label class="block_skcs">共{{ ll[item]['data'].length }}次课</label>
                    </view>
                </view>
            </view>

            <view class="container" v-if="index == 1">
                <view class="self_tip" :style="'display: ' + (wlist.length == 0 ? '' : 'none') + ';'">木有自增课程</view>
                <view class="block" style="flex-direction: row" v-for="(item, id) in wlist" :key="item.key">
                    <view class="grade-title">
                        <!-- 课程名称 -->
                        <view class="grade-column">{{ wlist[id].kcmc }}</view>
                        <!-- 周-星期-节次 -->
                        <view class="grade-rum">
                            <text style="color: #11c1f3">{{ wlist[id].zs }}</text>
                            <text style="color: #11c1f3">{{ wlist[id].xqj }}</text>
                            <text style="color: #11c1f3">{{ wlist[id].skjc }}</text>
                        </view>
                    </view>

                    <view class="grade-score" @tap="set1" :data-bean="id">
                        <label>删除</label>
                    </view>
                </view>
            </view>
        </view>

        <view class="add" v-if="block_show">
            <!-- 背景蒙版 -->
            <view class="add_background" @tap="block_showFun"></view>

            <view :class="'add_contain ' + add_style">
                <view class="add_title">
                    <text>课程详情</text>
                </view>

                <!-- 课程名称 -->
                <view class="add_block">
                    <label>课程名</label>
                    <view>{{ showDetail.course }}</view>
                </view>
                <!-- 教室 -->
                <view class="add_block">
                    <label>教室</label>
                    <view>{{ showDetail.place }}</view>
                </view>
                <!-- 老师 -->
                <view class="add_block">
                    <label>老师</label>
                    <view>{{ showDetail.teacher }}</view>
                </view>

                <!-- 上课周数 -->
                <view class="add_week_title">
                    <label>周-星期-节次（点亮即代表显示）</label>
                </view>
                <view class="add_week">
                    <view class="add_weekBtn" v-for="(item, index) in showDetail.week" :key="item.key">
                        <label :id="index" @tap="changeWB" :class="item[1] ? 'add_weekBtn_select' : 'add_weekBtn_noSelect'">
                            {{ item[0] }}
                        </label>
                    </view>
                </view>

                <!-- 按钮 -->
                <view class="add_btn">
                    <button @tap="block_showFun">取 消</button>
                    <button @tap="addSubmit" :class="addSubmitStyle ? 'cansubmit' : ''" :disabled="!addSubmitStyle">保 存</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/grade/show/show.js
Array.prototype.remove = function (val) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i]) {
            continue;
        }

        if (this[i].kcmc == val.kcmc && this[i].zc == val.zc && this[i].xq == val.xq && this[i].jcdm == val.jcdm) {
            this.splice(i, 1);
        }
    }
};

const app = getApp();
export default {
    data() {
        return {
            template: {
                type: 'picker',
                text: ['注意！', '（可以选择自增课程和学校课程）']
            },

            array: ['学校课程', '自增课程'],
            index: '0',
            decurriculum: [],

            //二维数组，长度是多少是几列
            wlist: [],

            block_show: false,
            addSubmitStyle: false,
            ll: '',
            kcmc: '',
            school: '',

            showDetail: {
                course: '',
                place: '',
                teacher: '',
                week: []
            },

            add_style: '',
            headerType: '',

            girl: {
                bmi: {
                    title: ''
                }
            },

            teaxms: '',
            zs: '',
            xqj: '',
            skjc: '',
            id: ''
        };
    },
    onLoad: function () {
        this.onLoadClone3389();
    },
    methods: {
        onLoadClone3389: function () {
            this.add();
            this.init();
        },

        bindPickerChange(e) {
            if (e.detail.value == '1') {
                this.setData({
                    index: e.detail.value
                });
                this.add();
            } else {
                this.setData({
                    index: e.detail.value
                });
                this.de();
            }
        },

        set1: function (e) {
            uni.showLoading({
                title: '处理中',
                mask: true
            }); // 更新缓存

            let args = uni.getStorageSync('args');
            let wlist = this.wlist;
            args.addCurriculumLogs.splice(e.currentTarget.dataset.bean, 1);
            wlist.splice(e.currentTarget.dataset.bean, 1);
            let that = this; // 更新数据库并重渲染页面

            wx.cloud.callFunction({
                name: 'curriculum',
                data: {
                    addCurriculumLogs: args.addCurriculumLogs,
                    username: args.username,
                    type: 'addCurriculumLogs'
                },
                success: (res) => {
                    uni.showToast({
                        title: '删除成功',
                        icon: 'none'
                    });
                    this.add();
                    uni.setStorageSync('args', args);
                    that.setData({
                        wlist
                    });
                },
                fail: (err) => {
                    uni.showToast({
                        title: '删除失败(校园网关闭或者服务器异常)',
                        icon: 'none'
                    });
                }
            });
        },

        changeCurriculum: function (addCurriculum, deCurriculum) {
            // console.log("进入函数");
            let allCurriculum = uni.getStorageSync('personalInformation').curriculum;

            for (var i = 0; i < addCurriculum.length; i++) {
                allCurriculum.push(addCurriculum[i]);
            }

            for (var i = 0; i < deCurriculum.length; i++) {
                for (var g = 0; g < allCurriculum.length; g++) {
                    if (!deCurriculum[i]) {
                        continue;
                    }

                    if (deCurriculum[i].zc == '全部') {
                        if (allCurriculum[g].kcmc == deCurriculum[i].kcmc) {
                            allCurriculum.splice(g, 1);
                            g--;
                        }
                    } else {
                        if (
                            allCurriculum[g].kcmc == deCurriculum[i].kcmc &&
                            allCurriculum[g].jcdm == deCurriculum[i].jcdm &&
                            allCurriculum[g].zc == deCurriculum[i].zc &&
                            allCurriculum[g].xq == deCurriculum[i].xq
                        ) {
                            allCurriculum.splice(g, 1);
                            g--;
                        }
                    }
                }
            }

            return allCurriculum;
        },

        // 得到用户已添加课程，并赋值给 wlist
        add: function () {
            let args = uni.getStorageSync('args');
            let wlist = [];
            let pd1 = /(.*?),/g;

            for (let i = 0; i < args.addCurriculumLogs.length; i++) {
                wlist.push({
                    zs: '第' + args.addCurriculumLogs[i].zc + '周',
                    xqj: '星期' + args.addCurriculumLogs[i].xq,
                    skjc: '第' + args.addCurriculumLogs[i].jcdm + '节',
                    kcmc: args.addCurriculumLogs[i].kcmc
                });
            }

            console.log('add函数内', wlist);
            this.setData({
                wlist
            });
        },

        // 得到用户删除课程 并赋值给 wlist
        de: function () {
            let args = uni.getStorageSync('args');
            let wlist = [];
            let pd1 = /(.*?),/g;

            if (args.ConcealCurriculumLogs) {
                for (let i in args.ConcealCurriculumLogs) {
                    let zs = '';
                    let xqj = '';
                    let skjc = '';

                    if (args.ConcealCurriculumLogs[i].zc != '全部') {
                        zs = '第' + args.ConcealCurriculumLogs[i].zc + '周';
                        xqj = '星期' + args.ConcealCurriculumLogs[i].xq;
                        skjc = '第' + args.ConcealCurriculumLogs[i].jcdm + '节';
                    } else {
                        zs = args.ConcealCurriculumLogs[i].zc;
                        xqj = args.ConcealCurriculumLogs[i].zc;
                        skjc = args.ConcealCurriculumLogs[i].zc;
                    }

                    wlist.push({
                        zs: zs,
                        xqj: xqj,
                        skjc: skjc,
                        kcmc: args.ConcealCurriculumLogs[i].kcmc
                    });
                }
            }

            console.log('de函数内', wlist);
            this.setData({
                wlist
            });
        },

        // 兼容茂职
        jianRongMaoZhi() {
            console.log('eee');
            var lesson = uni.getStorageSync('personalInformation').curriculum; // 按上课时间排序先

            if (!lesson) {
                return;
            }

            lesson.sort((a, b) => {
                return new Date(a.pkrq).getTime() - new Date(b.pkrq).getTime();
            });
            var ll = {};
            var kcmc = []; // 处理数据=>以'课程名称'为字段 的对象数组

            for (let i = 0; i < lesson.length; i++) {
                let index = kcmc.indexOf(lesson[i].kcmc);

                if (index == -1) {
                    kcmc.push(lesson[i].kcmc);
                    ll[lesson[i].kcmc] = [];
                    ll[lesson[i].kcmc].push(lesson[i]);
                } else {
                    ll[lesson[i].kcmc].push(lesson[i]);
                }
            } // 处理数据，将已经上过的剔除 区分已经屏蔽过的

            var _de = uni.getStorageSync('args').ConcealCurriculumLogs;

            for (let i = 0; i < kcmc.length; i++) {
                var arr = ll[kcmc[i]];
                var obj = {};
                obj['data'] = [];
                obj['zcxq'] = []; // 列出该课程所有的 周次-星期-节次

                obj['jxcd'] = []; // 教学场地，这门课上课的地点

                for (let k = 0; k < arr.length; k++) {
                    obj['data'].push(arr[k]);
                    console.log(obj['data']); // 在这里要判断是否已经屏蔽过了，屏蔽了的塞false进去

                    let flag = true;

                    if (_de) {
                        for (let p = 0; p < _de.length; p++) {
                            if (!_de[p]) {
                                continue;
                            }

                            if (_de[p].kcmc == kcmc[i] && _de[p].zc == arr[k].zc && _de[p].xq == arr[k].xq && _de[p].jcdm == arr[k].jcdm) {
                                flag = false;
                            }
                        }
                    }

                    obj['zcxq'].push([arr[k].zc + '-' + arr[k].xq + '-' + arr[k].jcdm, flag]); // 找出该门课的上课场地

                    if (!obj['jxcd'].includes(arr[k].jxcdmc)) {
                        obj['jxcd'].push(arr[k].jxcdmc);
                    }
                }

                ll[kcmc[i]] = obj;
            }

            this.setData({
                ll,
                kcmc
            });
        },

        // 显示详情 初始化
        init() {
            var args = uni.getStorageSync('args');
            this.setData({
                school: args.school == '游客登录' ? '广东石油化工学院' : args.school
            });

            if (args.school != '广东石油化工学院') {
                this.jianRongMaoZhi();
                return;
            }

            var lesson = uni.getStorageSync('personalInformation').curriculum; // 按上课时间排序先

            if (!lesson) {
                return;
            }

            lesson.sort((a, b) => {
                return new Date(a.pkrq).getTime() - new Date(b.pkrq).getTime();
            });
            var ll = {};
            var kcmc = []; // 处理数据=>以'课程名称'为字段 的对象数组

            for (let i = 0; i < lesson.length; i++) {
                let index = kcmc.indexOf(lesson[i].kcmc);

                if (index == -1) {
                    kcmc.push(lesson[i].kcmc);
                    ll[lesson[i].kcmc] = [];
                    ll[lesson[i].kcmc].push(lesson[i]);
                } else {
                    ll[lesson[i].kcmc].push(lesson[i]);
                }
            } // 处理数据，将已经上过的剔除 区分已经屏蔽过的

            var nowtime = new Date().getTime();
            var _de = uni.getStorageSync('args').ConcealCurriculumLogs;

            for (let i = 0; i < kcmc.length; i++) {
                var arr = ll[kcmc[i]];
                var obj = {};
                obj['data'] = [];
                obj['zcxq'] = []; // 列出该课程所有的 周次-星期-节次

                obj['jxcd'] = []; // 教学场地，这门课上课的地点

                for (let k = 0; k < arr.length; k++) {
                    console.log(arr[k]); // 除了广油，很多学校没有 pkrq 字段

                    if (nowtime < new Date(arr[k].pkrq).getTime()) {
                        obj['data'].push(arr[k]);
                        console.log(obj['data']); // 在这里要判断是否已经屏蔽过了，屏蔽了的塞false进去

                        let flag = true;

                        if (_de) {
                            for (let p = 0; p < _de.length; p++) {
                                if (!_de[p]) {
                                    continue;
                                }

                                if (_de[p].kcmc == kcmc[i] && _de[p].zc == arr[k].zc && _de[p].xq == arr[k].xq && _de[p].jcdm == arr[k].jcdm) {
                                    flag = false;
                                }
                            }
                        }

                        obj['zcxq'].push([arr[k].zc + '-' + arr[k].xq + '-' + arr[k].jcdm, flag]); // 找出该门课的上课场地

                        if (!obj['jxcd'].includes(arr[k].jxcdmc)) {
                            obj['jxcd'].push(arr[k].jxcdmc);
                        }
                    }
                }

                ll[kcmc[i]] = obj;
            }

            this.setData({
                ll,
                kcmc
            });
        },

        // 设置'课程详情'显示的课程
        change(e) {
            this.block_showFun();
            var id = e.currentTarget.id;
            let ll = JSON.parse(JSON.stringify(this.ll[this.kcmc[id]])); // 深拷贝

            var showDetail = {
                course: this.kcmc[id],
                place: ll.jxcd,
                teacher: ll.data[0].teaxms,
                week: ll.zcxq
            };
            this.setData({
                showDetail
            });
            this.flushbtn();
        },

        // 改变按钮选择
        changeWB(e) {
            var id = e.currentTarget.id;
            var ll = this.ll;
            var showDetail = this.showDetail;
            showDetail.week[id][1] = !showDetail.week[id][1];
            console.log(showDetail);
            this.setData({
                showDetail
            });
            this.flushbtn();
        },

        // 刷新'保存'按钮
        flushbtn() {
            var ll = this.ll;
            var showDetail = this.showDetail;

            if (JSON.stringify(showDetail.week) == JSON.stringify(ll[showDetail.course].zcxq)) {
                this.setData({
                    addSubmitStyle: false
                });
            } else {
                this.setData({
                    addSubmitStyle: true
                });
            }
        },

        // 用来控制'课程详情'显示
        block_showFun() {
            var block_show = this.block_show;
            var that = this;

            if (block_show) {
                this.setData({
                    add_style: 'add_hide'
                });
                setTimeout(() => {
                    that.setData({
                        block_show: !block_show
                    });
                }, 200);
            } else {
                this.setData({
                    add_style: 'add_show',
                    block_show: !block_show
                });
            }
        },

        // 点击保存
        addSubmit() {
            console.log('点击保存');
            var kcmc = this.showDetail.course;
            var oldweek = this.ll[kcmc].zcxq;
            var newweek = this.showDetail.week; // console.log(oldweek,newweek)

            var add = []; // 存放'取消屏蔽'的

            var del = []; // 存放'屏蔽'的
            // 筛选出'屏蔽'和'取消屏蔽'的

            for (let i = 0; i < newweek.length; i++) {
                if (oldweek[i][1] ^ newweek[i][1]) {
                    var str = newweek[i][0].split('-'); // 0：周    1：星期     2：节次

                    var de = {
                        kcmc: kcmc,
                        zc: str[0],
                        xq: str[1],
                        jcdm: str[2]
                    }; // 旧的true 新的false （屏蔽）

                    if (oldweek[i][1] > newweek[i][1]) {
                        del.push(de);
                    } // 旧的false 新的true （取消屏蔽）
                    else if (oldweek[i][1] < newweek[i][1]) {
                        add.push(de);
                    }
                }
            }

            var addstr = '';
            var delstr = ''; // 格式化showModal

            if (add.length != 0) {
                addstr += '确认恢复(' + kcmc + ')';

                for (let i = 0; i < add.length; i++) {
                    addstr += '\n第' + add[i].zc + '周 周' + this.zhuanxq(add[i].xq) + ' ' + this.zhuanjc(add[i].jcdm);
                }

                addstr += '\n';
            }

            if (del.length != 0) {
                delstr += '确认屏蔽(' + kcmc + ')';

                for (let i = 0; i < del.length; i++) {
                    delstr += '\n第' + del[i].zc + '周 周' + this.zhuanxq(del[i].xq) + ' ' + this.zhuanjc(del[i].jcdm);
                }
            }

            var that = this;
            uni.showModal({
                title: '温馨提示',
                content: addstr + delstr,
                confirmText: '确认',
                cancelText: '再想想',

                success(res) {
                    if (res.confirm) {
                        uni.showLoading({
                            title: '更新中...'
                        });
                        var global_de = uni.getStorageSync('args').ConcealCurriculumLogs; // 处理屏蔽的课程

                        for (let i in del) {
                            global_de.push(del[i]);
                        } // 处理恢复的课程

                        for (let i in add) {
                            global_de.remove(add[i]);
                        }

                        that.update2Cloud(global_de);
                        var ll = that.ll;
                        ll[kcmc].zcxq = newweek;
                        that.setData({
                            ll
                        }); // 关闭详情

                        that.block_showFun();
                    }
                }
            });
        },

        update2Cloud(global_de) {
            let args = uni.getStorageSync('args');
            var that = this; // 更新数据库

            wx.cloud.callFunction({
                name: 'curriculum',
                data: {
                    ConcealCurriculumLogs: global_de,
                    username: args.username,
                    type: 'ConcealCurriculumLogs'
                },
                success: (res) => {
                    console.log(res);
                    uni.showToast({
                        title: '更新成功',
                        icon: 'none'
                    }); // 更新缓存 ConcealCurriculumLogs

                    args.ConcealCurriculumLogs = global_de;
                    uni.setStorageSync('args', args);
                    that.onLoadClone3389({});
                },
                fail: (err) => {
                    uni.showToast({
                        title: '保存失败(校园网关闭或者服务器异常)',
                        icon: 'none'
                    });
                }
            });
        },

        zhuanxq(e) {
            switch (e) {
                case '1':
                    return '一';

                case '2':
                    return '二';

                case '3':
                    return '三';

                case '4':
                    return '四';

                case '5':
                    return '五';

                case '6':
                    return '六';

                case '7':
                    return '日';
            }
        },

        zhuanjc(e) {
            switch (e) {
                case '0102':
                    return '1-2节';

                case '0304':
                    return '3-4节';

                case '0506':
                    return '5-6节';

                case '0708':
                    return '7-8节';

                case '0910':
                    return '9-10节';

                case '1112':
                    return '11-12节';
            }
        }
    }
};
</script>
<style>
@import '../../../template/showCommonPage/template.css';
page {
    flex: 1;
    width: 100%;
    background-color: #fff;
}

.container {
    display: flex;
    height: 100%;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
}
.all {
    /* position: relative; */
    margin-top: 10rpx;
    margin-bottom: 40rpx;
}

/* 自添加课程列表 */
.self {
    margin: 40rpx 20rpx;
}
.self_tip {
    text-align: center;
    font-size: 40rpx;
    color: #1cbbb4;
    margin-top: 30rpx;
}
.grade-title {
    flex: 1;
}
.grade-column {
    line-height: 60rpx;
    font-size: 28rpx;
    font-weight: 550;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.grade-rum {
    margin-top: 10rpx;
    font-size: 25rpx;
    line-height: 30rpx;
}
.grade-rum text {
    margin-right: 28rpx;
    color: #8a8a8a;
}

.grade-score {
    display: flex;
    align-items: center;
    margin: auto;
}
.grade-score label {
    padding: 14rpx 20rpx;
    border: 4rpx solid coral;
    color: coral;
    border-radius: 20rpx;
}

/* 学校课程 列表(块) */
.block {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 10rpx;
    margin-top: 25rpx;
    padding: 20rpx 35rpx;
    border-radius: 50rpx;
    box-shadow: 0rpx 0rpx 10rpx #e2e2e2;
    /* width: -webkit-fill-available; */
    width: 80%;
    height: 100rpx;
    /* overflow: hidden; */
}

.block_kcmc {
    font-size: 28rpx;
    font-weight: 550;
    line-height: 60rpx;
    width: 500rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.block_bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10rpx;
}
.block_bottom label {
    font-size: 24rpx;
    color: #8a8a8a;
    padding-right: 20rpx;
    min-width: 3rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.block_bottom .block_teacher {
    width: 400rpx;
}
.block_btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 7rem;
    border-radius: 10rpx 50rpx 50rpx 10rpx;
    box-shadow: 0rpx 0rpx 10rpx #e2e2e2;
    overflow: hidden;
}
.block_btn view {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
}
.block_btn_xiugai {
    background-color: orange;
}
.block_btn_pb {
    background-color: rgb(244, 67, 54);
}
.block_btn view > label {
    color: rgb(230, 230, 230);
    font-weight: 600;
    text-align: center;
    letter-spacing: 2rpx;
    width: 3rem;
}

/* 添加课表 */
view,
text,
scroll-view,
swiper,
button,
form,
input,
textarea,
label,
navigator,
image {
    box-sizing: content-box;
}
button {
    box-sizing: border-box;
}

.add,
.add_background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    font-family: unset;
}
.add_background {
    background-color: #000;
    opacity: 0.6;
    height: 100%;
}
.add_contain {
    position: relative;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 0;
    width: 100%;
    /* background-color: rgb(230,230,230); */
    background-color: #fff;
    border-radius: 50rpx;
    padding: 50rpx 0;
    z-index: 99999;
}
.add_title {
    padding-bottom: 50rpx;
    size: 18px;
    font-weight: 600;
}
/* 课名 + 教室 + 老师 */
.add_block {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgb(245, 245, 245);
    width: 80%;
    height: 80rpx;
    padding: 0 20rpx;
    border-radius: 20rpx;
    margin: 20rpx 0;
}
.add_block label {
    width: 20%;
    font-weight: 600;
    font-size: 14px;
}
.add_block view {
    margin-left: 50rpx;
    width: 60%;
    font-size: 15px;
}
/* 上课周数 */
.add_week_title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    height: 80rpx;
}
.add_week_title label {
    font-weight: 600;
    font-size: 14px;
}
.add_week {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    width: 85%;
}
.add_weekBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 50rpx;
    margin: 10rpx 0;
}
.add_weekBtn label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 100%;
    color: rgb(100, 100, 100);
    border: 1rpx rgba(200, 200, 200, 0.6) solid;
    border-radius: 20rpx;
}
.add_weekBtn_noSelect {
    color: rgb(100, 100, 100);
}
.add_weekBtn_select {
    background: rgb(8, 178, 255);
    color: rgb(245, 245, 245) !important;
    border: none !important;
}
/* 底部确认按钮 */
.add_btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 70rpx 0 50rpx;
    width: 85%;
}
.add_btn button {
    width: 45% !important;
    border-radius: 50rpx;
    color: gray;
    background-color: rgb(245, 245, 245);
    size: 16px;
}
.cansubmit {
    background-color: rgb(20, 205, 255) !important;
    color: #fff !important;
}
.add_btn button::after {
    border: none;
}
.add_show {
    animation: add_show 0.5s;
}
.add_hide {
    animation: add_hide 0.5s;
}
/*自定义动画*/
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
    .add {
        filter: invert(90%) !important;
    }
    .add_background {
        filter: invert(90%) !important;
    }
    .add_weekBtn label {
        filter: invert(80%) !important;
    }
    .block_kcmc {
        /* color: #EEE8AA; */
        filter: invert(90%);
    }
    .grade-column {
        filter: invert(1);
    }
    .iconfont {
        filter: invert(100%);
    }
    .weui-input {
        color: #fff;
        letter-spacing: 2rpx;
        filter: invert(20%);
    }
    .head-right {
        filter: invert(100%);
    }
    .head {
        background-color: rgb(13, 13, 13);
        box-shadow: 0 0 10px #3a3939;
    }
    .block {
        box-shadow: 0 0 10px #252424;
    }
}
</style>
