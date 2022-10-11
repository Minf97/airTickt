<template>
    <!-- index.wxml -->

    <view class="all">
        <view class="head">
            <view class="total">
                <label>总分：</label>
                <text :style="'color:rgb(' + (total < 50 ? 200 + total : 250 - 21 * (total - 50)) + ',' + (total < 50 ? total * 4 + 40 : 240 + total) + ',40)'">{{ total }}</text>
            </view>

            <view class="sex">
                <label>女</label>
                <switch type="switch" @change="Setsex" :checked="true"></switch>
                <label>男</label>
            </view>
        </view>

        <view class="grade">
            <button id="1" :class="grade == 1 ? 'garde2' : 'garde1'" @tap.stop.prevent="gradeClick">大一</button>
            <button id="2" :class="grade == 2 ? 'garde2' : 'garde1'" @tap.stop.prevent="gradeClick">大二</button>
            <button id="3" :class="grade == 3 ? 'garde2' : 'garde1'" @tap.stop.prevent="gradeClick">大三</button>
            <button id="4" :class="grade == 4 ? 'garde2' : 'garde1'" @tap.stop.prevent="gradeClick">大四</button>
        </view>

        <block v-for="(item, index) in block" :key="index">
            <view class="block" v-if="item.sex == 2 || item.sex == sex">
                <label class="block_label" @tap="tips" :id="item.score" :data-power="item.power" :data-label="item.label">{{ item.label }}：</label>
                <view class="block_middle">
                    <input @input="item.input" type="digit" />
                    <text class="unit">{{ item.unit }}</text>
                </view>
                <view class="score">
                    <text v-if="score[item.score] != '' && score[item.score] != 0">{{ score[item.score] + ' 分' }}</text>
                </view>
            </view>
        </block>

        <view class="block" id="longrun">
            <label class="block_label" @tap="tips" id="longrun" data-power="0.2" :data-label="sex ? '1000m' : '800m'">{{ sex ? '1000m' : '800m' }}：</label>
            <view class="block_middle">
                <input style="width: 25%" placeholder="分" @input="minFun" type="number" />
                <text class="unit" style="width: 10%">'</text>
                <input style="width: 25%" placeholder=" 秒" @input="secondFun" type="number" />
                <text class="unit" style="width: 10%">"</text>
            </view>
            <view class="score">
                <text v-if="score.longrun != '' && score.longrun != 0">{{ score.longrun + ' 分' }}</text>
            </view>
        </view>

        <view class="last">
            <navigator class="last_navigator" :url="'./detail/detail?sex=' + sex">国家学生体质健康标准({{ sex ? '男' : '女' }})</navigator>
        </view>
    </view>
</template>

<script>
//index.js
//获取应用实例
const app = getApp();
export default {
    data() {
        return {
            grade: '',

            //年级
            sex: true,

            //性别    男:true  女:false
            tall: 0,

            //身高
            weight: 0,

            //体重
            volume: 0,

            //肺活量
            jump: 0,

            //跳远
            handlong: 0,

            //坐位体前屈
            ishandlong: false,

            //是否已填写
            shortrun: 0,

            //50m
            longrun: 0,

            //800、1000m
            min: 0,

            second: 0,
            sit_up: 0,

            //仰卧起坐
            pull_up: 0,

            //引体向上
            score: {
                fat: 0,
                //体脂
                tall: 0,
                //身高
                weight: 0,
                //体重
                volume: 0,
                //肺活量
                jump: 0,
                //跳远
                handlong: 0,
                //坐位体前屈
                shortrun: 0,
                //50m
                longrun: 0,
                //800、1000m
                sit_up: 0,
                //仰卧起坐
                pull_up: 0 //引体向上
            },

            total: 0,

            block: [
                {
                    label: '身高',
                    input: 'tall',
                    unit: 'cm',
                    score: 'tall',
                    sex: 2,
                    power: 0.15
                },
                {
                    label: '体重',
                    input: 'weight',
                    unit: 'kg',
                    score: 'fat',
                    sex: 2,
                    power: 0.15
                },
                {
                    label: '肺活量',
                    input: 'volume',
                    unit: 'ml',
                    score: 'volume',
                    sex: 2,
                    power: 0.15
                },
                {
                    label: '立定跳远',
                    input: 'jump',
                    unit: 'cm',
                    score: 'jump',
                    sex: 2,
                    power: 0.1
                },
                {
                    label: '坐位体前屈',
                    input: 'handlong',
                    unit: 'cm',
                    score: 'handlong',
                    sex: 2,
                    power: 0.1
                },
                {
                    label: '引体向上',
                    input: 'pull_up',
                    unit: '个',
                    score: 'pull_up',
                    sex: true,
                    power: 0.1
                },
                {
                    label: '仰卧起坐',
                    input: 'sit_up',
                    unit: '个',
                    score: 'sit_up',
                    sex: false,
                    power: 0.1
                },
                {
                    label: '50m',
                    input: 'shortrun',
                    unit: '"',
                    score: 'shortrun',
                    sex: 2,
                    power: 0.2
                }
            ],

            elementStyle: ''
        };
    },
    onLoad: function (e) {
        var that = this;
        uni.getSystemInfo({
            success: function (res) {
                that.setData({
                    elementStyle: 'width:' + res.windowWidth + 'px;' + 'min-height:' + res.windowHeight + 'px;'
                });
            }
        });
        uni.setStorageSync('state', 'onload');
        this.gradeClick({
            target: {
                id: 1
            }
        });
        uni.removeStorageSync('state');
    },
    methods: {
        tips(e) {
            var id = e.target.id;
            var text;

            if (id == 'tall' || id == 'fat') {
                text = '体脂\n权重为：' + e.target.dataset.power;
            } else {
                text = e.target.dataset.label + '\n' + '权重为：' + e.target.dataset.power;
            }

            uni.showToast({
                title: text,
                icon: 'none',
                duration: 2000
            });
        },

        /* 性别 */
        Setsex: function (e) {
            if (e.detail.value) {
                this.setData({
                    sex: e.detail.value,
                    //男：true 女：false
                    min: 0,
                    second: 0,
                    longrun: 0,
                    'score.longrun': 0,
                    sit_up: 0
                });
            }

            if (!e.detail.value) {
                this.setData({
                    sex: e.detail.value,
                    //男：true 女：false
                    min: 0,
                    second: 0,
                    longrun: 0,
                    'score.longrun': 0,
                    pull_up: 0
                });
            }

            this.update();
        },

        /* 年级 */
        gradeClick: function (e) {
            this.setData({
                grade: e.target.id
            });
            this.update();
        },

        /* 体脂 */
        tallFun: function (e) {
            if (e != undefined) {
                this.setData({
                    tall: Number(e.detail.value)
                });
            }

            var fat;

            if (this.tall != 0 && this.tall != '' && this.weight != 0 && this.weight != '') {
                fat = this.weight / ((this.tall * this.tall) / 10000);

                if (this.sex == true) {
                    //男生
                    if (fat >= 27.95) {
                        this.setData({
                            'score.fat': 60
                        });
                    }

                    if (23.95 <= fat < 27.95) {
                        this.setData({
                            'score.fat': 80
                        });
                    }

                    if (17.75 <= fat < 23.95) {
                        this.setData({
                            'score.fat': 100
                        });
                    }

                    if (fat < 17.75) {
                        this.setData({
                            'score.fat': 80
                        });
                    }
                }

                if (this.sex == false) {
                    //女生
                    if (fat >= 27.95) {
                        this.setData({
                            'score.fat': 60
                        });
                    }

                    if (23.95 <= fat < 27.95) {
                        this.setData({
                            'score.fat': 80
                        });
                    }

                    if (17.15 <= fat < 23.95) {
                        this.setData({
                            'score.fat': 100
                        });
                    }

                    if (fat < 17.15) {
                        this.setData({
                            'score.fat': 80
                        });
                    }
                }

                this.calculate();
            } else {
                this.setData({
                    'score.fat': 0
                });
                this.calculate();
            }
        },

        weightFun: function (e) {
            if (e != undefined) {
                this.setData({
                    weight: Number(e.detail.value)
                });
            }

            var fat;

            if (this.tall != 0 && this.tall != '' && this.weight != 0 && this.weight != '') {
                fat = this.weight / ((this.tall * this.tall) / 10000);

                if (this.sex == true) {
                    //男生
                    if (fat >= 27.95)
                        this.setData({
                            'score.fat': 60
                        });
                    else if (fat >= 23.95)
                        this.setData({
                            'score.fat': 80
                        });
                    else if (fat >= 17.75)
                        this.setData({
                            'score.fat': 100
                        });
                    else if (fat < 17.75) {
                        this.setData({
                            'score.fat': 80
                        });
                    }
                }

                if (this.sex == false) {
                    //女生
                    if (fat >= 27.95)
                        this.setData({
                            'score.fat': 60
                        });
                    else if (fat >= 23.95)
                        this.setData({
                            'score.fat': 80
                        });
                    else if (fat >= 17.15)
                        this.setData({
                            'score.fat': 100
                        });
                    else if (fat < 17.15) {
                        this.setData({
                            'score.fat': 80
                        });
                    }
                }

                this.calculate();
            } else {
                this.setData({
                    'score.fat': 0
                });
                this.calculate();
            }
        },

        /* 肺活量 */
        volumeFun: function (e) {
            if (e != undefined) {
                this.setData({
                    volume: Number(e.detail.value)
                });
            }

            var volume;

            if (this.sex == true) {
                //男生
                if (this.grade == 1 || this.grade == 2) {
                    //大一、大二
                    if (this.volume >= 4300) {
                        if (this.volume >= 5040) volume = 100;
                        else if (this.volume >= 4800) {
                            volume = Math.floor((this.volume - 4800) / 120) * 5 + 90;
                        } else {
                            volume = Math.floor((this.volume - 4300) / 250) * 5 + 80;
                        }
                    } else if (this.volume >= 3100) {
                        volume = Math.floor((this.volume - 3100) / 120) * 2 + 60;
                    } else if (this.volume >= 2300) {
                        volume = Math.floor((this.volume - 2300) / 160) * 10 + 10;
                    } else {
                        volume = 0;
                    }
                }

                if (this.grade == 3 || this.grade == 4) {
                    //大三、大四
                    if (this.volume >= 4400) {
                        if (this.volume >= 5140) volume = 100;
                        else if (this.volume >= 4900) {
                            volume = Math.floor((this.volume - 4900) / 120) * 5 + 90;
                        } else {
                            volume = Math.floor((this.volume - 4400) / 250) * 5 + 80;
                        }
                    } else if (this.volume >= 3200) {
                        volume = Math.floor((this.volume - 3200) / 120) * 2 + 60;
                    } else if (this.volume >= 2350) {
                        volume = Math.floor((this.volume - 2350) / 170) * 10 + 10;
                    } else {
                        volume = 0;
                    }
                }
            }

            if (this.sex == false) {
                //女生
                if (this.grade == 1 || this.grade == 2) {
                    if (this.volume >= 3000) {
                        if (this.volume >= 3400) volume = 100;
                        else if (this.volume >= 3300) {
                            volume = Math.floor((this.volume - 3300) / 50) * 5 + 90;
                        } else {
                            volume = Math.floor((this.volume - 3000) / 150) * 5 + 80;
                        }
                    } else if (this.volume >= 2000) {
                        volume = Math.floor((this.volume - 2000) / 100) * 2 + 60;
                    } else if (this.volume >= 1800) {
                        volume = Math.floor((this.volume - 1800) / 40) * 10 + 10;
                    } else {
                        volume = 0;
                    }
                }

                if (this.grade == 3 || this.grade == 4) {
                    if (this.volume >= 3050) {
                        if (this.volume >= 3450) volume = 100;
                        else if (this.volume >= 3350) {
                            volume = Math.floor((this.volume - 3350) / 50) * 5 + 90;
                        } else {
                            volume = Math.floor((this.volume - 3050) / 150) * 5 + 80;
                        }
                    } else if (this.volume >= 2050) {
                        volume = Math.floor((this.volume - 2050) / 100) * 2 + 60;
                    } else if (this.volume >= 1800) {
                        volume = Math.floor((this.volume - 1850) / 40) * 10 + 10;
                    } else {
                        volume = 0;
                    }
                }
            }

            this.setData({
                'score.volume': volume
            });
            this.calculate();
        },

        /* 跳远 */
        jumpFun: function (e) {
            if (e != undefined) {
                this.setData({
                    jump: Number(e.detail.value)
                });
            }

            var jump;

            if (this.sex == true) {
                //男生
                if (this.grade == 1 || this.grade == 2) {
                    //大一、大二
                    if (this.jump >= 248) {
                        if (this.jump >= 273) jump = 100;
                        else if (this.jump >= 268) jump = 95;
                        else if (this.jump >= 263) jump = 90;
                        else if (this.jump >= 256) jump = 85;
                        else if (this.jump >= 248) {
                            jump = 80;
                        }
                    } else if (this.jump >= 208) {
                        jump = Math.floor((this.jump - 208) / 4) * 2 + 60;
                    } else if (this.jump >= 183) {
                        jump = Math.floor((this.jump - 183) / 5) * 10 + 10;
                    } else {
                        jump = 0;
                    }
                }

                if (this.grade == 3 || this.grade == 4) {
                    //大三、大四
                    if (this.jump >= 250) {
                        if (this.jump >= 275) jump = 100;
                        else if (this.jump >= 270) jump = 95;
                        else if (this.jump >= 265) jump = 90;
                        else if (this.jump >= 258) jump = 85;
                        else if (this.jump >= 250) {
                            jump = 80;
                        }
                    } else if (this.jump >= 210) {
                        jump = Math.floor((this.jump - 210) / 4) * 2 + 60;
                    } else if (this.jump >= 185) {
                        jump = Math.floor((this.jump - 185) / 5) * 10 + 10;
                    } else {
                        jump = 0;
                    }
                }
            }

            if (this.sex == false) {
                //女生
                if (this.grade == 1 || this.grade == 2) {
                    //大一、大二
                    if (this.jump >= 181) {
                        if (this.jump >= 207) jump = 100;
                        else if (this.jump >= 201) jump = 95;
                        else if (this.jump >= 195) jump = 90;
                        else if (this.jump >= 188) jump = 85;
                        else if (this.jump >= 181) {
                            jump = 80;
                        }
                    } else if (this.jump >= 151) {
                        jump = Math.floor((this.jump - 151) / 3) * 2 + 60;
                    } else if (this.jump >= 126) {
                        jump = Math.floor((this.jump - 126) / 5) * 10 + 10;
                    } else {
                        jump = 0;
                    }
                }

                if (this.grade == 3 || this.grade == 4) {
                    //大三、大四
                    if (this.jump >= 182) {
                        if (this.jump >= 208) jump = 100;
                        else if (this.jump >= 202) jump = 95;
                        else if (this.jump >= 196) jump = 90;
                        else if (this.jump >= 189) jump = 85;
                        else if (this.jump >= 182) {
                            jump = 80;
                        }
                    } else if (this.jump >= 152) {
                        jump = Math.floor((this.jump - 152) / 3) * 2 + 60;
                    } else if (this.jump >= 127) {
                        jump = Math.floor((this.jump - 127) / 5) * 10 + 10;
                    } else {
                        jump = 0;
                    }
                }
            }

            this.setData({
                'score.jump': jump
            });
            this.calculate();
        },

        /* 体前屈 */
        handlongFun: function (e) {
            if (e != 'update') {
                this.setData({
                    ishandlong: true,
                    handlong: Number(e.detail.value)
                });

                if (e.detail.value == '') {
                    this.setData({
                        ishandlong: false
                    });
                }
            }

            var handlong;

            if (this.sex == true) {
                //男生
                if (this.grade == 1 || this.grade == 2) {
                    //大一、大二
                    if (this.handlong >= 17.7) {
                        if (this.handlong >= 24.9) handlong = 100;
                        else if (this.handlong >= 17.7) {
                            handlong = Math.floor((this.handlong - 17.7) / 1.8) * 5 + 80;
                        }
                    } else if (this.handlong >= 3.7) {
                        handlong = Math.floor((this.handlong - 3.7) / 1.4) * 2 + 60;
                    } else if (this.handlong >= -1.3) {
                        handlong = Math.floor((this.handlong + 1.3) / 1) * 10 + 10;
                    } else {
                        handlong = 0;
                    }
                }

                if (this.grade == 3 || this.grade == 4) {
                    //大三、大四
                    if (this.handlong >= 18.2) {
                        if (this.handlong >= 25.1) handlong = 100;
                        else if (this.handlong >= 21.5) handlong = Math.floor((this.handlong - 21.5) / 1.8) * 5 + 90;
                        else if (this.handlong >= 18.2) {
                            handlong = Math.floor((this.handlong - 18.2) / 1.7) * 5 + 80;
                        }
                    } else if (this.handlong >= 4.2) {
                        handlong = Math.floor((this.handlong - 4.2) / 1.4) * 2 + 60;
                    } else if (this.handlong >= -0.8) {
                        handlong = Math.floor((this.handlong + 0.8) / 1) * 10 + 10;
                    } else {
                        handlong = 0;
                    }
                }
            }

            if (this.sex == false) {
                //女生
                if (this.grade == 1 || this.grade == 2) {
                    //大一、大二
                    if (this.handlong >= 19) {
                        if (this.handlong >= 25.8) handlong = 100;
                        else if (this.handlong >= 22.2) handlong = Math.floor((this.handlong - 22.2) / 1.8) * 5 + 90;
                        else if (this.handlong >= 19) {
                            handlong = Math.floor((this.handlong - 19) / 1.6) * 5 + 80;
                        }
                    } else if (this.handlong >= 6) {
                        handlong = Math.floor((this.handlong - 6) / 1.3) * 2 + 60;
                    } else if (this.handlong >= 2) {
                        handlong = Math.floor((this.handlong - 2) / 0.8) * 10 + 10;
                    } else {
                        handlong = 0;
                    }
                }

                if (this.grade == 3 || this.grade == 4) {
                    //大三、大四
                    if (this.handlong >= 19.5) {
                        if (this.handlong >= 26.3) handlong = 100;
                        else if (this.handlong >= 24.4) handlong = 95;
                        else if (this.handlong >= 22.4) handlong = 90;
                        else if (this.handlong >= 21) handlong = 85;
                        else if (this.handlong >= 19.5) {
                            handlong = 80;
                        }
                    } else if (this.handlong >= 6.5) {
                        handlong = Math.floor((this.handlong - 6.5) / 1.3) * 2 + 60;
                    } else if (this.handlong >= 2.5) {
                        handlong = Math.floor((this.handlong - 2.5) / 0.8) * 10 + 10;
                    } else {
                        handlong = 0;
                    }
                }
            }

            if (!this.ishandlong) {
                handlong = 0;
            }

            this.setData({
                'score.handlong': handlong
            });
            this.calculate();
        },

        /* 仰卧起坐 */
        sit_upFun: function (e) {
            if (e != undefined) {
                this.setData({
                    sit_up: Number(e.detail.value)
                });
            }

            var sit_up;

            if (this.grade == 1 || this.grade == 2) {
                //大一、大二
                if (this.sit_up >= 46) {
                    if (this.sit_up >= 56) sit_up = 100;
                    else if (this.sit_up >= 52) sit_up = Math.floor((this.sit_up - 52) / 2) * 5 + 90;
                    else if (this.sit_up >= 46) {
                        sit_up = Math.floor((this.sit_up - 46) / 3) * 5 + 80;
                    }
                } else if (this.sit_up >= 26) {
                    sit_up = Math.floor((this.sit_up - 26) / 2) * 2 + 60;
                } else if (this.sit_up >= 16) {
                    sit_up = Math.floor((this.sit_up - 16) / 2) * 10 + 10;
                } else {
                    sit_up = 0;
                }
            }

            if (this.grade == 3 || this.grade == 4) {
                //大三、大四
                if (this.sit_up >= 47) {
                    if (this.sit_up >= 57) sit_up = 100;
                    else if (this.sit_up >= 53) sit_up = Math.floor((this.sit_up - 53) / 2) * 5 + 90;
                    else if (this.sit_up >= 47) {
                        sit_up = Math.floor((this.sit_up - 47) / 3) * 5 + 80;
                    }
                } else if (this.sit_up >= 27) {
                    sit_up = Math.floor((this.sit_up - 27) / 2) * 2 + 60;
                } else if (this.sit_up >= 17) {
                    sit_up = Math.floor((this.sit_up - 17) / 2) * 10 + 10;
                } else {
                    sit_up = 0;
                }
            }

            this.setData({
                'score.sit_up': sit_up
            });
            this.setData({
                total: (
                    this.score.fat * 0.15 +
                    this.score.volume * 0.15 +
                    this.score.jump * 0.1 +
                    this.score.handlong * 0.1 +
                    sit_up * 0.1 +
                    this.score.shortrun * 0.2 +
                    this.score.longrun * 0.2
                ).toFixed(2)
            });
        },

        /* 引体向上 */
        pull_upFun: function (e) {
            if (e != undefined) {
                this.setData({
                    pull_up: Number(e.detail.value)
                });
            }

            var pull_up;

            if (this.grade == 1 || this.grade == 2) {
                //大一、大二
                if (this.pull_up >= 19) pull_up = 100;
                else if (this.pull_up >= 15) {
                    pull_up = (this.pull_up - 15) * 5 + 80;
                } else if (this.pull_up >= 10) {
                    pull_up = (this.pull_up - 10) * 4 + 60;
                } else if (this.pull_up >= 5) {
                    pull_up = (this.pull_up - 5) * 10 + 10;
                } else {
                    pull_up = 0;
                }
            }

            if (this.grade == 3 || this.grade == 4) {
                //大三、大四
                if (this.pull_up >= 20) pull_up = 100;
                else if (this.pull_up >= 16) {
                    pull_up = (this.pull_up - 16) * 5 + 80;
                } else if (this.pull_up >= 11) {
                    pull_up = (this.pull_up - 11) * 4 + 60;
                } else if (this.pull_up >= 6) {
                    pull_up = (this.pull_up - 6) * 10 + 10;
                } else {
                    pull_up = 0;
                }
            }

            this.setData({
                'score.pull_up': pull_up
            });
            this.setData({
                total: (
                    this.score.fat * 0.15 +
                    this.score.volume * 0.15 +
                    this.score.jump * 0.1 +
                    this.score.handlong * 0.1 +
                    pull_up * 0.1 +
                    this.score.shortrun * 0.2 +
                    this.score.longrun * 0.2
                ).toFixed(2)
            });
        },

        /* 短跑50m */
        shortrunFun: function (e) {
            if (e != undefined) {
                this.setData({
                    shortrun: Number(e.detail.value)
                });
            }

            var shortrun;

            if (this.sex == true) {
                //男生
                if (this.grade == 1 || this.grade == 2) {
                    //大一、大二
                    if (this.shortrun > 10.1 || this.shortrun == 0) shortrun = 0;
                    else if (this.shortrun >= 9.1) {
                        shortrun = 60 - Math.ceil((this.shortrun - 9.1).toFixed(2) / 0.2) * 10;
                    } else if (this.shortrun >= 7.1) {
                        shortrun = 80 - Math.ceil((this.shortrun - 7.1).toFixed(2) / 0.2) * 2;
                    } else if (this.shortrun >= 6.7) {
                        shortrun = 100 - Math.ceil((this.shortrun - 6.7).toFixed(2) / 0.1) * 5;
                    } else {
                        shortrun = 100;
                    }
                }

                if (this.grade == 3 || this.grade == 4) {
                    //大三、大四
                    if (this.shortrun > 10) shortrun = 0;
                    else if (this.shortrun >= 9) {
                        shortrun = 60 - Math.ceil((this.shortrun - 9).toFixed(2) / 0.2) * 10;
                    } else if (this.shortrun >= 7) {
                        shortrun = 80 - Math.ceil((this.shortrun - 7).toFixed(2) / 0.2) * 2;
                    } else if (this.shortrun >= 6.6) {
                        shortrun = 100 - Math.ceil((this.shortrun - 6.6).toFixed(2) / 0.1) * 5;
                    } else {
                        shortrun = 100;
                    }
                }
            }

            if (this.sex == false) {
                //女生
                if (this.grade == 1 || this.grade == 2) {
                    //大一、大二
                    if (this.shortrun > 11.3) shortrun = 0;
                    else if (this.shortrun >= 10.3) {
                        shortrun = 60 - Math.ceil((this.shortrun - 10.3).toFixed(2) / 0.2) * 10;
                    } else if (this.shortrun >= 8.3) {
                        shortrun = 80 - Math.ceil((this.shortrun - 8.3).toFixed(2) / 0.2) * 2;
                    } else if (this.shortrun >= 7.7) {
                        shortrun = 90 - Math.ceil((this.shortrun - 7.7).toFixed(2) / 0.3) * 5;
                    } else if (this.shortrun >= 7.5) {
                        shortrun = 100 - Math.ceil((this.shortrun - 7.5).toFixed(2) / 0.1) * 5;
                    } else {
                        shortrun = 100;
                    }
                }

                if (this.grade == 3 || this.grade == 4) {
                    //大三、大四
                    if (this.shortrun > 11.2) shortrun = 0;
                    else if (this.shortrun >= 10.2) {
                        shortrun = 60 - Math.ceil((this.shortrun - 10.2).toFixed(2) / 0.2) * 10;
                    } else if (this.shortrun >= 8.2) {
                        shortrun = 80 - Math.ceil((this.shortrun - 8.2).toFixed(2) / 0.2) * 2;
                    } else if (this.shortrun > 7.6) {
                        shortrun = 90 - Math.ceil((this.shortrun - 7.6).toFixed(2) / 0.3) * 5;
                    } else if (this.shortrun >= 7.4) {
                        shortrun = 100 - Math.ceil((this.shortrun - 7.4).toFixed(2) / 0.1) * 5;
                    } else {
                        shortrun = 100;
                    }
                }
            }

            if (e != undefined && e.detail.value == 0) {
                shortrun = 0;
            }

            this.setData({
                'score.shortrun': shortrun
            }); // if (this.data.shortrun != 0)

            this.calculate();
        },

        /* 长跑800、1000 */
        minFun: function (e) {
            if (e != undefined) {
                this.setData({
                    min: e.detail.value,
                    longrun: Number(e.detail.value) * 60 + Number(this.second)
                });
            }

            this.longrunFun();
        },

        secondFun: function (e) {
            if (e != undefined) {
                this.setData({
                    second: e.detail.value,
                    longrun: Number(this.min) * 60 + Number(e.detail.value)
                });
            }

            this.longrunFun();
        },

        longrunFun: function (e) {
            var longrun;

            if (this.sex == true) {
                //男生
                if (this.grade == 1 || this.grade == 2) {
                    //大一、大二
                    if (this.longrun > 372) longrun = 0;
                    else if (this.longrun >= 272) {
                        longrun = 60 - Math.ceil((this.longrun - 272) / 20) * 10;
                    } else if (this.longrun >= 222) {
                        longrun = 80 - Math.ceil((this.longrun - 222) / 5) * 2;
                    } else if (this.longrun >= 207) {
                        longrun = 90 - Math.ceil((this.longrun - 207) / 7) * 5;
                    } else if (this.longrun >= 197) {
                        longrun = 100 - Math.ceil((this.longrun - 197) / 5) * 5;
                    } else {
                        longrun = 100;
                    }
                }

                if (this.grade == 3 || this.grade == 4) {
                    //大三、大四
                    if (this.longrun > 370) longrun = 0;
                    else if (this.longrun >= 270) {
                        longrun = 60 - Math.ceil((this.longrun - 270) / 20) * 10;
                    } else if (this.longrun >= 220) {
                        longrun = 80 - Math.ceil((this.longrun - 220) / 5) * 2;
                    } else if (this.longrun >= 205) {
                        longrun = 90 - Math.ceil((this.longrun - 205) / 7) * 5;
                    } else if (this.longrun >= 195) {
                        longrun = 100 - Math.ceil((this.longrun - 195) / 5) * 5;
                    } else {
                        longrun = 100;
                    }
                }
            }

            if (this.sex == false) {
                //女生
                if (this.grade == 1 || this.grade == 2) {
                    //大一、大二
                    if (this.longrun > 324) longrun = 0;
                    else if (this.longrun >= 274) {
                        longrun = 60 - Math.ceil((this.longrun - 274) / 10) * 10;
                    } else if (this.longrun >= 224) {
                        longrun = 80 - Math.ceil((this.longrun - 224) / 5) * 2;
                    } else if (this.longrun >= 210) {
                        longrun = 90 - Math.ceil((this.longrun - 210) / 7) * 5;
                    } else if (this.longrun >= 198) {
                        longrun = 100 - Math.ceil((this.longrun - 198) / 6) * 5;
                    } else {
                        longrun = 100;
                    }
                }

                if (this.grade == 3 || this.grade == 4) {
                    //大三、大四
                    if (this.longrun > 322) longrun = 0;
                    else if (this.longrun >= 272) {
                        longrun = 60 - Math.ceil((this.longrun - 272) / 10) * 10;
                    } else if (this.longrun >= 222) {
                        longrun = 80 - Math.ceil((this.longrun - 222) / 5) * 2;
                    } else if (this.longrun >= 208) {
                        longrun = 90 - Math.ceil((this.longrun - 208) / 7) * 5;
                    } else if (this.longrun >= 196) {
                        longrun = 100 - Math.ceil((this.longrun - 196) / 6) * 5;
                    } else {
                        longrun = 100;
                    }
                }
            }

            if (this.longrun == 0) {
                longrun = 0;
            }

            this.setData({
                'score.longrun': longrun
            }); // if (this.data.longrun != 0)

            this.calculate();
        },

        /* 计算统计 */
        calculate: function (e) {
            if (this.sex == true) {
                this.setData({
                    total: (
                        this.score.fat * 0.15 +
                        this.score.volume * 0.15 +
                        this.score.jump * 0.1 +
                        this.score.handlong * 0.1 +
                        this.score.pull_up * 0.1 +
                        this.score.shortrun * 0.2 +
                        this.score.longrun * 0.2
                    ).toFixed(2)
                });
            }

            if (this.sex == false) {
                this.setData({
                    total: (
                        this.score.fat * 0.15 +
                        this.score.volume * 0.15 +
                        this.score.jump * 0.1 +
                        this.score.handlong * 0.1 +
                        this.score.sit_up * 0.1 +
                        this.score.shortrun * 0.2 +
                        this.score.longrun * 0.2
                    ).toFixed(2)
                });
            }
        },

        /* 更新数据 */
        update: function (e) {
            this.tallFun();
            this.weightFun();
            this.volumeFun();
            this.jumpFun();

            if (uni.getStorageSync('state') == '') {
                this.handlongFun('update');
            }

            this.sit_upFun();
            this.pull_upFun();

            if (this.shortrun != 0) {
                this.shortrunFun();
            }

            if (this.longrun != 0) {
                this.longrunFun();
            }

            this.calculate();
        }
    }
};
</script>
<style>
/**index.wxss**/
Page {
    background-color: #fcfcfc;
}

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
    box-sizing: border-box;
}
switch,
checkbox,
radio {
    position: relative;
}

.all {
    border-top: 1rpx solid rgb(200, 200, 200);
}

.head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 35rpx 30rpx;
}

.total text {
    font-size: 50rpx;
    /* color: rgb(200, 40, 40);   */
    /* 0-50 */
    /* color: rgb(250, 246, 40);  */
    /* 50-60*/
    /* color: rgb(40, 250, 40);   */
}

/**性别**/
.sex {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.sex switch {
    margin-left: 10rpx;
    overflow: hidden;
    border-radius: 20px;
}

/*年级*/
.grade {
    display: flex;
    justify-content: space-evenly;
    padding: 20rpx;
    background-color: whitesmoke;
    border-top: 1rpx solid rgb(200, 200, 200);
}
.grade button {
    padding: 15rpx 0;
    margin: 20rpx;
    width: 150rpx !important;
}
button {
    line-height: 2;
    font-size: 16px;
    margin: 5rpx;
}
.garde1 {
    background-color: white;
}
.garde2 {
    background-color: rgb(60, 200, 60);
    color: white;
}

/* 块 */
.block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 35rpx 30rpx;
    border-top: 1rpx solid rgb(200, 200, 200);
}
.block_label {
    width: 30%;
}
.block_middle {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 45%;
}
.block_middle input {
    color: rgb(100, 100, 100);
    height: 50rpx;
    width: 35%;
    border-bottom: 1rpx solid rgb(200, 200, 200);
    text-align: center;
}
.unit {
    color: gray;
    font-size: 14px;
    padding-left: 10rpx;
    width: 15%;
    text-align: center;
}
.score {
    width: 25%;
    height: 100%;
    font-size: 15px;
    text-align: end;
    color: rgb(0, 200, 0);
}

/* 最后 */
.last {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    border-top: 1rpx solid rgb(200, 200, 200);
    height: 100rpx;
    margin-bottom: 50rpx;
}
.last_navigator {
    font-size: 300;
    border: rgb(216, 216, 216) 1rpx solid;
    border-radius: 50rpx;
    padding: 10rpx 50rpx;
}
</style>
