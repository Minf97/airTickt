<template>
	<view>
		<swiper class="container">

			<swiper-item :class="'curriRight '+(isAnimate ? 'curriRight_Animate' : '')" :animation="timetableAnimation"
				@touchmove.stop.prevent="catchtouchmove" :scroll-y="true">
				<!-- 头部 -->
				<view style="z-index:2; position:fixed; background-color: white;">
					<view :class="'head '+(theme ? 'head_theme' : '')">
						<!-- 状态栏 -->
						<view :style="'height: '+(statusBarHeight)+'px;'" />
						<!-- 导航栏 -->
						<view class="cur-week" :style="'height: '+(lineHeight)+'px;'">
							<view class="seeting-btn" @tap="seetingHandler">
								<image src="/static/images/more.png" style="width: 40rpx;height: 40rpx;"></image>
							</view>
							<view class="feedback-btn" @tap="feedbackHandler">
								<image src="/static/images/btn_feed@2x.png" style="width: 40rpx;height: 40rpx;"></image>
							</view>
							<text
								@tap="showCurriculumPoint">{{'第 ' + whichWeek + ' 周' === curWeek ? curWeek : '第 ' + whichWeek + ' 周(非本周)'}}</text>
							<text style="margin-left:10rpx" class="iconfont icon-open" @tap="showCurriculumPoint"></text>
						</view>
					</view>

					<!-- 课表弹出 -->
					<scroll-view :scroll-with-animation="true" class="weekscroll" :scroll-x="true"
						:scroll-into-view="'index'+(whichWeek)" v-if="(showscroll)">
						<!-- 显示一个周 -->
						<view :id="'index'+(index+3)" class="weekscroll_week_contain" v-for="(item,index) in (wlistPoint)" :key="index">



							<view @tap="clickWeek" :id="index"
								:class="'weekscroll_week '+(index+1 === whichWeek ? 'weekscroll_week_click' : '')">
								<view class="weekscroll_week_text">第{{index+1}}周</view>
								<!-- 显示一堆小圆点的容器 -->
								<view class="week_point">
									<view
										:style="'background-color: '+(item ? (item == 2 ? 'rgb(255, 153, 102)': 'rgb(56,201,153)') : '#D4D4D4')+';'"
										v-for="(item,index1) in (item)" :key="item.idx">
									</view>
								</view>
							</view>



						</view>
					</scroll-view>

					<!-- 首栏 月份+星期几 -->
					<view class="top">
						<text class="week">{{month}}\n月</text>
						<view :class="'top-text '+(dayOfWeek==(index+1)&&weekNow==whichWeek?'top-text-strong':'')"
							v-for="(item,index) in ([" 一","二","三","四","五","六","日"])" :key="item.unique">



							<view>周{{item}}</view>






							<view :class="'after-left '+(dayOfWeek==(index+1)&&weekNow==whichWeek?'after-left-strong':'')">{{arr[index]}}
							</view>



						</view>
					</view>
				</view>

				<!-- 填充 -->
				<view :style="'position: relative; padding-top: '+((statusBarHeight + lineHeight))+'px; width: 100%;'"></view>
				<!-- 这个填充的85被我改成了87，为使背景图片与上面无缝隙 2022.1.27 -->
				<view class="filler"
					:style="'position: relative; padding-top: '+((showscroll? 140: 0) + 80)+'rpx; width: 100%; background-color: #fff;'">
				</view>
				<!-- 课表 -->
				<view style="z-index: -1; background-color: #fff; " @touchstart="touchStart" @touchmove="touchMove"
					@touchend="touchEnd">

					<!-- 没有课时 -->
					<scroll-view class="kbScroll" :enhanced="true" :bounces="false" :show-scrollbar="false" v-if="wlist.length == 0"
						:scroll-y="true" :style="'height: '+(kbHeight)+'px;'">
						<!-- image背景图片 -->
						<image :src="backgroundUrl" class="backgroundUrl" mode="aspectFill" :style="'height: '+(kbHeight)+'px;'"></image>

						<!-- 当kbScroll高度超过693时，则给左侧时间栏高度kbScroll -->
						<view class="timeTableBox" :style="'height: '+(kbHeight > 693 ? kbHeight : '')+'px;'">
							<view class="timetable" :style="'height: '+(kbHeight > 693 ? kbHeight : '')+'px;'">
								<view style="z-index: 1;">
									<!-- 遮罩层 - 为修复 fixed 与 scroll-view 不兼容问题 -->
									<view class="curriLeft_background"></view>
									<view class="left" v-for="(item,index) in (scheduleLength)" :key="item.unique">



										<view>{{item}}</view>






										<view class="after-left1">{{courseTime[index]}}</view>



									</view>
								</view>
							</view>
						</view>

						<view class="txt">今天没有课，出去玩吧</view>
					</scroll-view>

					<!-- 有课时 -->
					<scroll-view :enhanced="true" :bounces="true" :show-scrollbar="false" class="kbScroll" v-if="wlist.length != 0"
						:scroll-y="true" :style="'height: '+(kbHeight)+'px;'">
						<!-- image背景图片 -->
						<image :src="backgroundUrl" class="backgroundUrl" mode="aspectFill" :style="'height: '+(kbHeight)+'px;'"></image>
						<!-- 套一个盒子 timeTableBox -->
						<view class="timetable" :style="'height: '+(kbHeight > 693 ? kbHeight : '')+'px;'">
							<view style="z-index: 1;">
								<!-- 遮罩层 - 为修复 fixed 与 scroll-view 不兼容问题 -->
								<view class="curriLeft_background"></view>
								<view class="left" v-for="(item,index) in (scheduleLength)" :key="item.unique">



									<view>{{item}}</view>






									<view class="after-left1">{{courseTime[index]}}</view>



								</view>
							</view>

							<!-- 课表 -->
							<view class="kbcontain" v-for="(item,index) in (wlist)" :key="item.unique">



								<view class="kb" @tap="showCardView" :data-index="index"
									:style="'top: '+((item.skjc-1)*110)+'rpx; left:'+((item.xqj-1)*100)+'rpx; height:'+(item.skcd*110-5)+'rpx; background-color:'+(colorArrays[index%20])+'; z-index:10'">
									<view class="smalltext">{{item.kcmc}}@{{item.jxcdmc}}
									</view>
								</view>






								<!-- Todo 重叠课程右上角三角形 -->






								<view v-if="isScheduled[index]&&hasData[item.Course_Time][item.Course_Start]>1" class="triangle-topright"
									:style="'margin-left:'+((item.Course_Time-1)*99+(item.Course_Time==3?78:77))+'rpx;margin-top:'+((item.Course_Start-1)*100+5)+'rpx;border-color: '+(colorArrays[item.Course_Color%20])+'; z-index:'+(1000*index)+';'">
								</view>



							</view>
						</view>

					</scroll-view>
					<!-- <view class='pd2' wx:if="{{wlist.length == 0}}"> </view> -->
				</view>
			</swiper-item>

			<!-- 添加课表功能 ↓ -->
			<view class="add" v-if="showAdd">
				<!-- 背景蒙版 -->
				<view class="add_background" @tap="feedbackHandler"></view>

				<view :class="'add_contain '+(add_style)">
					<view class="add_title">
						<text>课程添加</text>
					</view>

					<!-- 课程名称 -->
					<view class="add_block">
						<label>*课程名</label>
						<input @blur="setCPT" id="course" />
					</view>
					<!-- 教室 -->
					<view class="add_block">
						<label>教室</label>
						<input @blur="setCPT" id="place" />
					</view>
					<!-- 老师 -->
					<view class="add_block">
						<label>老师</label>
						<input @blur="setCPT" id="teacher" />
					</view>

					<!-- 星期 + 节数 -->
					<view class="add_wjs">

						<view class="add_wjs_block">
							<label class="add_wjs_block_title">星期</label>
							<!-- 选择星期 -->
							<picker mode="selector" @change="setCPT" :value="WeekIndex" :range="Week" class="add_picker" id="WeekIndex">
								<label>{{Week[WeekIndex]}}</label>
							</picker>
						</view>

						<view style="height:100%;text-align:center;color:rgb(200,200,200)">|</view>

						<view class="add_wjs_block">
							<label class="add_wjs_block_title">节数</label>
							<!-- 选择节数 -->
							<picker mode="multiSelector" @columnchange="ChangeSectionIndex" :value="sectionIndex" :range="section"
								class="add_picker">
								<text space="emsp">{{section[0][sectionIndex[0]]}} - {{section[0][sectionIndex[1]]}}</text>
							</picker>
						</view>


					</view>

					<!-- 上课周数 -->
					<view class="add_week_title">
						<label>上课周数</label>
					</view>
					<view class="add_week">
						<view class="add_weekBtn" v-for="(item,index) in (week)" :key="item.key">



							<label :id="index+1" @tap="changeWB" :class="week[index][1]?'add_weekBtn_select':'add_weekBtn_noSelect'">
								{{index+1}}
							</label>



						</view>

					</view>

					<!-- 按钮 -->
					<view class="add_btn">
						<button @tap="feedbackHandler">取 消</button>
						<button @tap="addSubmit" :class="addSubmitStyle?'cansubmit':''">保 存</button>
					</view>

				</view>

			</view>

			<!-- 背景蒙版 -->
			<view v-if="isAnimate" class="curriLeft_background" @tap="ggggg">

			</view>
			<!-- 设置 -->
			<view class="curriLeft" @touchstart="touchStartCurri" @touchmove="touchMoveCurri" @touchend="touchEndCurri"
				:animation="curriLeft">
				<!-- 填充 -->
				<view :style="'position: relative; padding-top: '+((statusBarHeight + lineHeight))+'px; width: 100%;'"></view>
				<view :style="'position: relative; padding-top: '+((showscroll? 140: 0) + 85)+'rpx; width: 100%;'"></view>

				<!-- <view class="topBox"></view> -->
				<!-- 设置页功能 -->
				<block v-for="(item,index) in (curriFunc)" :key="index">



					<view class="funcBox" @tap.stop.prevent="item.click" :id="'funcBox'+(index)">
						<!-- <image class="funcBoxIcon" src="{{item.icon}}"></image> -->
						<text>{{item.text}}</text>
					</view>



				</block>

			</view>
		</swiper>
	</view>
</template>

<script>
	const app = getApp();

	const time = require("../../utils/time.js");

	var startX;
	var endX;
	var startXCurri;
	var endXCurri;;
	var moveFlag;
	var moveFlagCurri = true;;

	var util = require("../../utils/util.js");

	export default {
		data() {
			return {
				statusBarHeight: getApp().globalData.statusBarHeight,
				lineHeight: getApp().globalData.lineHeight,
				rectHeight: getApp().globalData.rectHeight,
				curWeek: '第 ' + util.getweekString() + ' 周',
				colorArrays: ['#99CCFF', '#FFCC99', '#FFCCCC', '#CC6699', '#99CCCC', '#FF6666', '#CCCC66', '#66CC99', '#FF9966',
					'#66CCCC', '#6699CC', '#99CC99', '#669966', '#99CC99', '#99CCCC', '#66CCFF', '#CCCCFF', '#99CC66', '#CCCC99',
					'#FF9999'
				],
				scheduleLength: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],

				// 左侧课表长度 - 兜底
				courseTime: [ // 课表对应具体时间 - 兜底
					'8:00', '9:40', '10:00', '11:40', '14:30', '16:10', '16:20', '17:50', '19:40', '21:20', '22:05'
				],

				whichWeek: '0',
				wlist: [],
				dayOfWeek: new Date().getDay(),

				// 添加课表
				showAdd: false,

				week: [],

				// 周数
				section: [
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
				],

				sectionIndex: [0, 0],
				Week: ["一", "二", "三", "四", "五", "六", "七"],

				// 星期 [1,2,3,4,5,6,7]
				WeekIndex: 0,

				addSubmitStyle: false,
				showscroll: false,
				curriculumAll: [],

				// 用户添加/隐藏后，得到的课表
				curriFunc: [ // 课表功能
					{
						text: "导入最新课程",
						icon: "/static/pages/curriculum/images/x2.png",
						click: "importCurri"
					}, {
						text: "手动添加课程",
						icon: "/static/pages/curriculum/images/x3.png",
						click: "feedbackHandler"
					}, {
						text: "修改课程管理",
						icon: "/static/pages/curriculum/images/x4.png",
						click: "addCourseHandler"
					}, {
						text: "分享课程表",
						icon: "/static/pages/curriculum/images/x5.png",
						click: "shareCurri"
					}, {
						text: "自定义背景",
						icon: "/static/pages/curriculum/images/x6.png",
						click: "bgcCurri"
					}, {
						text: "重置背景",
						icon: "/static/pages/curriculum/images/considerBgc.png",
						click: "resetBgcCurri"
					}, {
						text: "返 回",
						icon: "/static/pages/curriculum/images/left.png",
						click: "seetingHandler"
					}
				],

				isAnimate: false,

				// 控制动效
				// CSS中使用变量
				backgroundUrl: '',

				// 主题控制
				theme: false,

				weekNow: "",
				kbHeight: "",
				month: "",
				arr: "",
				multiIndex: [],
				wlistPoint: "",
				add_style: "",
				timetableAnimation: "",
				curriLeft: ""
			};
		},
		onLoad: function(options) {
			let windowHeight = uni.getSystemInfoSync().windowHeight;
			let width = uni.getSystemInfoSync().windowWidth; // 屏幕高度 - (状态栏 + 头部) - 周次
			// +2 是为适配边框

			let kbHeight = windowHeight - (this.lineHeight + this.statusBarHeight) - 80 * (width / 750) + 2;
			let args = uni.getStorageSync('args');
			let scheduleLength = []; // 处理课表长度

			if (args.scheduleLength) {
				for (let i = 1; i <= args.scheduleLength; i++) {
					scheduleLength.push(i);
				}
			} else {
				scheduleLength = this.scheduleLength; // 兜底
			}

			this.setData({
				weekNow: util.getweekString(),
				courseTime: args.courseTime ? args.courseTime : this.courseTime,
				kbHeight,
				scheduleLength
			});
			console.log(`课表滑动区域高度：${kbHeight}px`);
			this.kb(util.getweekString()); // 从本地缓存获取backgroundUrl

			let fileUrl = uni.getStorageSync('curriBgc');
			let that = this;

			const getUrlFromLoad = fileUrl => {
				uni.getSavedFileList({
					success(res) {
						for (let i in res.fileList) {
							if (res.fileList[i].filePath == fileUrl) {
								that.setData({
									backgroundUrl: res.fileList[i].filePath
								});
							} else {
								'';
							}
						}
					}

				});
			}; // 渲染自定义背景


			if (fileUrl) {
				getUrlFromLoad(fileUrl);
			} else {
				'';
			} // 判断是否登录


			app.globalData.loginState();
		},
		onShow: function(options) {
			this.onShowClone3389(options);
		},
		onReady() {
			console.log("onready");
		},
		onShareAppMessage: function(res) {
			return {
				title: 'WE校园'
			};
		},
		methods: {
			onShowClone3389: function(options) {
				this.kb(util.getweekString());
				this.initWeek();
				this.initWlistPoint(); // 得到主题

				let theme = uni.getStorageSync("theme");
				this.setData({
					theme
				});
			},

			importCurri() {
				console.log('importCurri');
				uni.showToast({
					title: '开发中...敬请期待',
					icon: 'none'
				});
			},

			shareCurri() {
				console.log('shareCurri');
				uni.showToast({
					title: '开发中...敬请期待',
					icon: 'none'
				});
			},

			bgcCurri() {
				console.log('bgcCurri');
				let that = this;
				uni.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album'],

					success(res) {
						let fs = uni.getFileSystemManager();
						let FilePath = fs.saveFileSync(res.tempFiles[0].tempFilePath);
						uni.showLoading({
							title: '处理中...'
						}); // 重新渲染页面

						that.setData({
							backgroundUrl: FilePath
						});
						uni.setStorageSync('curriBgc', FilePath);
						uni.hideLoading(); // 关闭左侧界面

						that.seetingHandler();
					},

					fail(err) {
						console.log(err);
					}

				});
			},

			resetBgcCurri() {
				try {
					uni.removeStorageSync('curriBgc');
				} catch (e) {
					console.log(e);
				}

				this.setData({
					backgroundUrl: ''
				});
				uni.showToast({
					title: '已重置背景',
					icon: 'none'
				});
			},

			showCurriculumPoint: function() {
				this.setData({
					showscroll: !this.showscroll,
					whichWeek: this.whichWeek
				});
			},

			// 点击上面课表进行切换
			// clickWeek: function (e) {
			//   this.kb(this.data.whichWeek);
			//   this.setData({
			//     whichWeek: Number(e.currentTarget.id) + 1,
			//   })
			//   console.log(this.data.whichWeek)
			// },
			// 触摸开始事件
			touchStart: function(e) {
				startX = e.touches[0].pageX; // 获取触摸时的原点

				moveFlag = true;
			},

			// 触摸移动事件
			touchMove: function(e) {
				endX = e.touches[0].pageX; // 获取触摸时的原点

				if (moveFlag) {
					if (endX - startX > 50) {
						moveFlag = false;
						this.kb(this.whichWeek - 1);
					}

					if (startX - endX > 50) {
						moveFlag = false;
						this.kb(this.whichWeek + 1);
					}
				}
			},

			// 点击上面课表进行切换
			clickWeek: function(e) {
				// this.kb(this.data.whichWeek);
				this.setData({
					whichWeek: Number(e.currentTarget.id) + 1
				});
				this.kb(this.whichWeek);
				console.log(this.whichWeek);
			},

			// 触摸结束事件
			touchEnd: function(e) {
				// this.kb(this.data.whichWeek);
				console.log(this.whichWeek);
				moveFlag = true; // 回复滑动事件
			},

			// 日期切换处理函数  返回时间格式 YYYY-MM-DD
			showDate(n) {
				var date = new Date(uni.getStorageSync('configData').timeYear);
				date.setDate(date.getDate() + n);
				var month = date.getMonth() + 1;
				var day = date.getDate();

				if (day > 9) {
					day = day;
				} else {
					day = "0" + day;
				} // 格式化日期


				date = "" + month + "/" + day;
				return [month, date];
			},

			// 显示当前周的课表
			kb: function(whichWeek) {
				var that = this;
				let args = uni.getStorageSync('args'); // 处理上面日期

				if (whichWeek > 0) {
					whichWeek = whichWeek;
				} else {
					whichWeek = 1;
				}

				var whichWeek_now = (Number(whichWeek) - 1) * 7;
				var arr = [];

				if (whichWeek > '20' || whichWeek < '1') {
					uni.showModal({
						showCancel: false,
						title: '提示',
						content: '超过范围'
					});
					return null;
				}

				for (var i = 0; i < 7; i++) {
					var [month, date] = this.showDate(whichWeek_now + i);
					arr.push(date);

					if (i == 6) {
						this.setData({
							month
						});
					}
				} // var personalInformation = wx.getStorageSync('personalInformation')
				// var curriculum = personalInformation.curriculum;


				var curriculum = this.changeCurriculum(args.addCurriculumLogs, args.ConcealCurriculumLogs);
				var wlist = [];
				var zc = 0;

				for (let i in curriculum) {
					zc = curriculum[i].zc;

					if (zc == whichWeek) {
						var kcmcc = curriculum[i].kcmc;

						if ((curriculum[i].kcmc + curriculum[i].jxcdmc).length > 20) {
							kcmcc = kcmcc.substring(0, 17 - curriculum[i].jxcdmc.length) + "...";
						}

						wlist.push({
							xqj: curriculum[i].xq,
							skjc: Number(curriculum[i].jcdm.substr(0, 2)),
							skcd: Number(curriculum[i].jcdm.substr(-2)) - Number(curriculum[i].jcdm.substr(0, 2)) + 1,
							kcmc: kcmcc,
							jxcdmc: curriculum[i].jxcdmc,
							teacher: curriculum[i].teaxms
						});
					}
				} // console.log(wlist,"初始wlist");


				that.setData({
					arr,
					whichWeek,
					multiIndex: [Number(whichWeek) - 1, 0, 0, 0],
					wlist
				});
			},

			// 生成小绿点
			initWlistPoint() {
				var personalInformation = uni.getStorageSync('personalInformation');
				var curriculum = personalInformation.curriculum;
				let args = uni.getStorageSync('args'); // 处理自增课程与隐藏课程

				curriculum = this.changeCurriculum(args.addCurriculumLogs, args.ConcealCurriculumLogs); // 初始化小点点

				var wlistPoint = new Array();

				for (var i = 0; i < 20; i++) {
					wlistPoint[i] = new Array();

					for (var j = 0; j < 35; j++) {
						wlistPoint[i][j] = null;
					}
				} // 渲染绿色小点点


				for (let i in curriculum) {
					var zc = curriculum[i].zc;

					if (curriculum[i].jcdm) {
						let bright_skjc = Number(curriculum[i].jcdm.substr(0, 2)) + 1;

						if (wlistPoint[zc - 1]) {
							wlistPoint[zc - 1][(bright_skjc / 2 - 1) * 7 + Number(curriculum[i].xq) - 1] = 1;
						}
					}
				} // 渲染黄色小点点


				let addCurriculumLogs = uni.getStorageSync('args').addCurriculumLogs;

				for (let i in addCurriculumLogs) {
					let zc = addCurriculumLogs[i].zc;

					if (addCurriculumLogs[i].jcdm) {
						let bright_skjc = Number(addCurriculumLogs[i].jcdm.substr(0, 2)) + 1;
						wlistPoint[zc - 1][(bright_skjc / 2 - 1) * 7 + Number(addCurriculumLogs[i].xq) - 1] = 2;
					}
				} // 赋值


				this.setData({
					wlistPoint
				});
			},

			// 点击时显示toast
			showCardView: function(e) {
				uni.showToast({
					title: '教师:' + this.wlist[e.currentTarget.dataset.index].teacher + "\n" + '地点:' + this.wlist[e.currentTarget
						.dataset.index].jxcdmc,
					icon: 'none'
				});
			},

			// 跳转至 - 课表管理
			addCourseHandler: function(e) {
				uni.navigateTo({
					url: 'addcurriculum/addcurriculum'
				});
			},

			// 弹出 - 课表添加
			feedbackHandler: function(e) {
				var showAdd = this.showAdd;
				var that = this;

				if (showAdd) {
					this.setData({
						add_style: "add_hide"
					});
					setTimeout(() => {
						that.setData({
							showAdd: !showAdd
						});
					}, 200);
				} else {
					this.setData({
						add_style: "add_show",
						showAdd: !showAdd
					});
				}
			},

			ggggg() {
				console.log("111111");
			},

			// 弹出 - 设置页面
			seetingHandler: function(e) {
				console.log("已点击设置按钮"); // 封装 timetable 和 curriLeft 的动画

				const animationFunc = (px, scale, opacity1, opacity2, height, width) => {
					var timetableAnimation = uni.createAnimation({
						duration: 500,
						timingFunction: 'ease',
						delay: 100
					}).translateX(px).scale(scale).opacity(opacity1).height(height).step().export();
					var curriLeft = uni.createAnimation({
						duration: 400,
						timingFunction: 'ease',
						delay: 100
					}).translateX(px).translateY(-20).opacity(opacity2).step().export();
					this.setData({
						timetableAnimation,
						curriLeft,
						isAnimate: !this.isAnimate
					}); // this.data.isAnimate = !this.data.isAnimate;     // 更新 isAnimate 状态
				};

				if (this.isAnimate) {
					animationFunc("none", 1, 1, 0, "100%", "100%");
				} else {
					animationFunc(270, 0.88, 0.7, 1, "100%", 150);
				}
			},

			// 触摸开始事件
			touchStartCurri: function(e) {
				startXCurri = e.touches[0].pageX; // 获取触摸时的原点

				moveFlagCurri = true;
			},

			// 触摸移动事件
			touchMoveCurri: function(e) {
				endXCurri = e.touches[0].pageX; // 获取触摸时的原点

				if (moveFlagCurri) {
					if (startXCurri - endXCurri > 50) {
						moveFlagCurri = false;
						this.seetingHandler();
					}
				}
			},

			// 触摸结束事件
			touchEndCurri: function(e) {
				moveFlagCurri = true; // 回复滑动事件
			},

			catchtouchmove: function(e) {
				return false;
			},

			// 添加课表
			initWeek() {
				// 初始化"设置周数"
				var week = [];

				for (var i = 0; i < 18; i++) {
					week.push([false, false]); //week.push([false, 'color:gary'])
				}

				this.setData({
					week: week
				});
			},

			// 设置 课程、地点、老师、星期选择器、课程选择器
			setCPT(e) {
				this.setData({
					[e.target.id]: e.detail.value
				});
				this.checkSubmit();
			},

			// 节数选择器
			ChangeSectionIndex(e) {
				var index = this.sectionIndex; //修改第一列

				if (e.detail.column == 0) {
					index[e.detail.column] = e.detail.value;

					if (e.detail.value > index[1]) {
						//选择后，第一列>第二列
						index[1] = e.detail.value;
					}
				} //修改第二列
				else {
					if (e.detail.value < index[0]) {
						//选择后，第二列<第一列
						uni.showToast({
							title: '注意选择格式',
							icon: "none"
						});
					} else {
						index[e.detail.column] = e.detail.value;
					}
				}

				this.setData({
					sectionIndex: index
				});
				this.checkSubmit();
			},

			// 周数选择按钮
			changeWB(e) {
				let data = this.week;

				if (data[e.target.id - 1][0]) {
					data[e.target.id - 1][0] = false;
					data[e.target.id - 1][1] = false; // 'color: rgb(100, 100, 100);'
				} else {
					data[e.target.id - 1][0] = true;
					data[e.target.id - 1][1] = true; // "background:rgb(8, 178, 255);color:rgb(245,245,245);border:none;"
				}

				this.setData({
					week: data
				});
				this.checkSubmit();
			},

			// 新增课程按钮
			addSubmit(e) {
				let that = this;
				let args = uni.getStorageSync('args'); // args

				uni.showLoading({
					title: '处理中',
					mask: false
				});
				var week = [];

				for (var i = 0; i < 18; i++) {
					if (this.week[i][0]) {
						week.push(i + 1);
					}
				} // 检查填写是否为空


				if (this.course == null || this.course == "" || this.course == undefined) {
					this.showToast("课程名称不能为空");
				} else if (this.place == null || this.place == "" || this.place == undefined) {
					this.showToast("上课地点不能为空");
				} else if (this.teacher == null || this.teacher == "" || this.teacher == undefined) {
					this.showToast("任课老师不能为空");
				} else if (week == null || week == "" || week == undefined || week.length == 0) {
					this.showToast("请设置周数");
				} else {
					if (Number(this.sectionIndex[0] + 1) < 10) {
						var a = "0" + String(Number(this.sectionIndex[0] + 1));
					} else {
						var a = String(Number(this.sectionIndex[0] + 1));
					}

					if (Number(this.sectionIndex[1] + 1) < 10) {
						var b = "0" + String(Number(this.sectionIndex[1] + 1));
					} else {
						var b = String(Number(this.sectionIndex[1] + 1));
					}

					for (i = 0; i < week.length; i++) {
						var add = {
							'jcdm': a + b,
							'jxcdmc': this.place,
							'kcmc': this.course,
							'teaxms': this.teacher,
							'xq': time.formatDay(this.Week[this.WeekIndex]),
							'zc': String(week[i])
						};
						args["addCurriculumLogs"].push(add);
					} // console.log(args.addCurriculumLogs, 233);
					// 更新后台数据


					wx.cloud.callFunction({
						name: "curriculum",
						data: {
							type: "addCurriculumLogs",
							username: args.username,
							addCurriculumLogs: args.addCurriculumLogs
						},
						success: res => {
							console.log(res);
							uni.showToast({
								title: '添加成功',
								icon: 'none'
							}); // 更新本地缓存

							uni.setStorageSync('args', args);
							that.onShowClone3389({});
						},
						fail: err => {
							uni.showToast({
								title: '添加失败(校园网关闭或者服务器异常)',
								icon: 'none'
							});
						},

						complete() {
							that.setData({
								showAdd: !that.showAdd
							});
						}

					});
				}
			},

			// 处理课表增删
			changeCurriculum: function(addCurriculum, deCurriculum) {
				// console.log("进入函数");
				let allCurriculum = uni.getStorageSync('personalInformation').curriculum; // 开发模式没有课表

				if (!allCurriculum) {
					return;
				}

				if (deCurriculum) {
					for (var i = 0; i < deCurriculum.length; i++) {
						for (var g = 0; g < allCurriculum.length; g++) {
							if (!deCurriculum[i]) {
								continue;
							}

							if (deCurriculum[i].zc == "全部") {
								if (allCurriculum[g].kcmc == deCurriculum[i].kcmc) {
									allCurriculum.splice(g, 1);
									g--;
								}
							} else {
								if (allCurriculum[g].kcmc == deCurriculum[i].kcmc && allCurriculum[g].jcdm == deCurriculum[i].jcdm &&
									allCurriculum[g].zc == deCurriculum[i].zc && allCurriculum[g].xq == deCurriculum[i].xq) {
									allCurriculum.splice(g, 1);
									g--;
								}
							}
						}
					}
				}

				if (addCurriculum) {
					// console.log(addCurriculum,allCurriculum);
					for (var i = 0; i < addCurriculum.length; i++) {
						if (addCurriculum[i] != null) {
							allCurriculum.push(addCurriculum[i]);
						}
					}
				}

				return allCurriculum;
			},

			checkSubmit() {
				var week = [];

				for (var i = 0; i < 18; i++) {
					if (this.week[i][0]) {
						week.push(i + 1);
					}
				} // 检查填写是否为空


				if (this.course == null || this.course == "" || this.course == undefined || this.place == null || this.place ==
					"" || this.place == undefined || this.teacher == null || this.teacher == "" || this.teacher == undefined || week ==
					null || week == "" || week == undefined || week.length == 0) {
					this.setData({
						addSubmitStyle: false
					});
				} else {
					this.setData({
						addSubmitStyle: true
					});
				}
			},

			showToast(msg) {
				uni.showToast({
					title: msg,
					icon: "none"
				});
			}
		}
	};
</script>
<style>
	page {
		background-color: rgb(255, 255, 255);
		/* overflow-y: hidden; */
		overflow-y: hidden;
	}

	.container {
		background-color: rgb(122, 159, 204);
		position: relative;
		/* overflow: scroll; */
	}

	/* 头部 */
	.head_theme {
		background-image: linear-gradient(#bae4f5, #ffffff);
	}

	.cur-week {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		width: 750rpx;
	}

	.cur-week image {
		margin-left: 10rpx;
		width: 30rpx;
		height: 30rpx;
	}

	/* 课表选择 */
	.weekscroll {
		/* overflow-anchor:initial; */
		height: 140rpx;
		width: 750rpx;
		/* background-color: rgb(237, 237, 237); */
		background-color: #fff;
		white-space: nowrap;
	}

	.weekscroll_week_contain {
		display: inline-block;
		padding-left: 12rpx;
		width: 130rpx;
		font-size: 24rpx;
		text-align: center;
	}

	.weekscroll_week {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 15rpx;
		width: 120rpx;
		height: 128rpx;
		margin-top: 7rpx;
	}

	.weekscroll_week_click {
		background-color: rgb(188, 187, 193);
	}

	.week_point {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		width: 93%;
	}

	.week_point view {
		width: 13rpx;
		height: 13rpx;
		margin: 1.2%;
		border-radius: 100%;
	}



	.img-button {
		display: inline-block;
	}

	.img-button image {
		margin-top: 10%;
		width: 80%;
		height: 80%;
	}

	.add-course-btn {
		width: 52rpx;
		height: 52rpx;
		margin-left: 20rpx;
	}

	.seeting-btn {
		position: absolute;
		top: 18rpx;
		left: 0;
		width: 50rpx;
		height: 48rpx;
	}

	.feedback-btn {
		position: absolute;
		top: 18rpx;
		left: 60rpx;
		width: 50rpx;
		height: 48rpx;
		margin-left: 15rpx;
	}

	.week-selector {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 300rpx;
	}

	.pre-week-btn,
	.next-week-btn {
		width: rpx;
		height: 39rpx;
	}


	/* 星期 */
	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-top: 3rpx;
		width: 750rpx;
		border-bottom: 1rpx solid rgba(240, 240, 240, 0.5);
	}

	.week {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50rpx;
		font-size: 10pt;
		text-align: center;
		color: #6D7373;
	}

	.after-left {
		text-align: center;
		font-size: 8.5pt;
		justify-content: center;
		align-items: center;
		color: #aaa;
	}

	.after-left-strong {
		color: #73b4ef;
		font-weight: bold;
	}

	.top-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex-grow: 1;
		width: 100rpx;
		height: 75rpx;
		font-size: 11pt;
		color: #4d4d4d;
	}

	.top-text-strong {
		color: #73b4ef;
		font-weight: bold;
	}

	.backgroundUrl {
		position: fixed;
		/* left: 50rpx; */
		width: 100%;
		height: 100%;

	}

	/* 时间表 */
	.timetable {
		/* position: absolute; */
		display: flex;
		width: 100%;
		z-index: 1;
		background-color: #fff;
	}

	.left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 50rpx;
		height: 110rpx;
		font-size: 12pt;
		color: #4d4d4d;
		/* margin-bottom: 6rpx; */
	}

	.after-left1 {
		text-align: center;
		font-size: 7pt;
		justify-content: center;
		align-items: center;
		color: #aaa;
	}


	/* 课表 */
	.kbcontain {
		position: relative;
	}

	.kb {
		position: absolute;
		width: 96rpx;
		margin: 4rpx 2rpx 2rpx 2rpx;

		display: flex;
		align-items: center;

		border-radius: 5px;
	}

	.smalltext {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		font-size: 24rpx;
		color: #fff;
		font-weight: bold;
		padding: 0 10rpx;
		word-break: break-word;
	}


	/* 没课 */
	.wx-isclass {
		overflow: hidden;
		position: absolute;
		/* display: flex; */
		width: 100%;
		text-align: center;
		font-size: 40rpx;
		color: #1cbbb4;
		/* margin-top: 20rpx; */
		background-color: #fff;
		height: 100%;
	}

	.kbScroll .txt {
		position: absolute;
		top: 60rpx;
		left: 25%;
		z-index: 1;
		font-size: 40rpx;
		color: #1cbbb4;
	}

	.pd2 {
		justify-content: space-between;
		height: 100%;
		padding: 65vh 0;
		box-sizing: border-box;
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
		z-index: 99999999;
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

	.add_block input {
		margin-left: 50rpx;
		width: 60%;
	}

	/* 星期 + 节数 */
	.add_wjs {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 85%;
		margin: 20rpx 0;
		border-radius: 20rpx;
		background-color: rgb(245, 245, 245);
	}

	.add_wjs_block {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 49%;
		padding: 20rpx;
	}

	.add_wjs_block_title {
		font-weight: 600;
		font-size: 14px;
	}

	.add_picker {
		flex-grow: 1;
		text-align: center;
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
		justify-content: space-around;
		align-content: center;
		flex-wrap: wrap;
		width: 85%;
	}

	.add_weekBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 15%;
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
		animation: add_show .5s;
	}

	.add_hide {
		animation: add_hide .5s;
	}

	.timeTableBox {
		/* height: 100vh; */
		/* position:sticky; */
		background-color: #fff;
	}

	/* 设置 */
	.curriLeft {
		position: absolute;
		left: -270px;
		top: 20px;
		width: 488rpx;
		height: 100%;
		opacity: 0;
		color: rgb(233, 253, 253);
		z-index: 10;
	}

	.curriRight {
		box-shadow: -10rpx 0 30rpx 20rpx rgb(111, 149, 196);
	}

	.funcBox {
		border-bottom: 1rpx solid rgb(133, 95, 55, 0.2);
		line-height: 100rpx;
		z-index: 99999;
		/* width: 80%; */
	}

	.funcBoxIcon {
		width: 40rpx;
		height: 40rpx;
		margin-left: 30rpx;
		margin-top: 10rpx;
		padding-top: 10rpx;
	}

	.funcBox text {
		margin-left: 40rpx;
	}

	.curriLeft_background {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		/* background-color: #000; */
		/* opacity: 0.3; */
		z-index: 9;
	}

	.curriLeft .fontTtext {
		position: absolute;
		bottom: 10rpx;
		left: 50rpx;
		padding: 10rpx;
		border: 1rpx solid #fff;
		font-size: 30rpx;
		color: #fff;
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
		.container {
			/* 由于app.js，这里要取反颜色 */
			background-color: rgb(133, 96, 51);
		}

		.curriLeft {
			/* 由于app.js，这里要取反颜色 */
			color: #000;
		}

		.curriLeft .funcBox {
			border-bottom: 1rpx solid rgb(122, 160, 200, 0.2);
		}

		.curriRight {
			box-shadow: -10rpx 0 30rpx 20rpx rgb(160, 111, 51);
		}

		.add_weekBtn label {
			filter: invert(80%) !important;
		}

		.add_block input {
			filter: invert(0) !important;
			color: white;
		}

		.add_background {
			filter: invert(90%) !important;
		}

		/* 头部 */
		.head {
			background-color: rgb(245, 245, 245) !important;
		}

		.head_theme {
			background-color: rgb(245, 245, 245) !important;
			background-image: linear-gradient(#F5F5F5, #F5F5F5);
		}

		.top {
			background-color: rgb(245, 245, 245) !important;
			border-bottom: 1rpx solid rgba(32, 32, 32, 0.5);
		}

		/* 顶部选周 横向Scroll-view */
		.weekscroll {
			filter: invert(100%) !important;
			background-color: rgb(10, 10, 10) !important;
		}

		.weekscroll_week {
			filter: invert(100%) !important;
		}

		.weekscroll_week_click {
			background-color: #fff;
		}

		.weekscroll_week .week_point {
			filter: invert(100%) !important;
		}

		.weekscroll_week .weekscroll_week_text {
			filter: invert(50%) !important;
		}

		.top-text-strong,
		.after-left-strong {
			color: rgb(140, 75, 16);
			font-weight: bold;
		}

		.top {
			border-bottom: 1rpx solid rgb(245, 245, 245);
		}

		.filler {
			/* filter: invert(100%) !important; */
			background-color: rgb(245, 245, 245) !important;
			/* background-color: #000 ; */
		}

		/* 课表区域Scroll-view */
		.kbScroll {
			filter: invert(0%) !important;
		}

		.kbScroll .txt {
			filter: invert(100%) !important;
		}

		.kb {
			filter: invert(90%)
		}

		.backgroundUrl {
			background-color: rgb(10, 10, 10);
			filter: invert(100%) !important;
		}

	}
</style>