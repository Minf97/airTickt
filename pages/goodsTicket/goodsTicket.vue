<template>
	<view>
		<view class="container">
			<!-- 轮播图 -->
			<swiper class="goodsimgs" :indicator-dots="true" :autoplay="true" interval="3000" duration="1000">
				<swiper-item v-for="(item, index) in gallery" :key="item.id">
					<image :src="item.img_url" background-size="cover"></image>
				</swiper-item>
			</swiper>

			<view class="box">

				<!-- 公众日门票 ，专业日门票 -->
				<view class="b1">
					<view :class="isZhuan ? 'gong' : 'zhuan'" @click="changeZp('gong')">公众日门票</view>
					<view :class="isZhuan ? 'zhuan' : 'gong'" @click="changeZp('zhuan')">专业日门票</view>
				</view>

				<!-- 专业日提示 -->
				<view class="zhuanTip">
					<view class="colorbox"></view>
					<view class="contenttip">{{ticketRi}}</view>
				</view>

				<!-- 票种 -->
				<view class="pType">
					<view>票 种</view>
					<view class="noActive" :class="ticketTypeIndex == index ? 'active' : '' "
						v-for="(item,index) in ticketTypeArr" @click="changeTicketType(index)">{{item}}</view>
				</view>

				<!-- 实物票提示 -->
				<view class="zhuanTip">
					<view class="colorbox"></view>
					<view class="contenttip">{{ticketTip}}</view>
				</view>

				<!-- 日期 -->
				<view class="pTypeDate">
					<view class="ddd">日 期</view>
					<uni-calendar ref="calendar" :selected="ticketTimeArr" :insert="false" @confirm="confirm" />
					<view class="chooseDate" @click="open"
						:style="chooseDate == '选择日期' ? '':'background-color: #e4a34d;color:#fff;'">{{chooseDate}}</view>
				</view>

				<!-- 单次票/多次票 -->
				<view class="pDan">
					<view class="pd" v-for="(item,index) in guigeArr">
						<view class="pd1">
							<view>{{item.guiGe}}</view>
							<image src="./xiangxia2.png" mode=""></image>
						</view>
						<view class="pd2" v-if="item.goods_number > 0">￥{{item.retail_price}}</view>
						<view class="pd2" v-if="item.goods_number == 0" style="color: #ccc;">已售罄</view>
						<view class="pd3" v-if="item.goods_number > 0">
							<view class="j" @click="jian(index)">-</view>
							<view class="count">{{item.chooseCount}}</view>
							<view class="j" @click="jia(index)">+</view>
						</view>
						<view class="pd3" v-if="item.goods_number == 0">
							<view class="j" style="color: #ccc">-</view>
							<view class="count">0</view>
							<view class="j" @click="toastNone">+</view>
						</view>
					</view>
				</view>

				<!-- 立即订购 -->
				<view class="buy" @click="dingGou">
					立即订购
				</view>

				<!-- 商品参数 -->
				<view class="detail" style="background-color: #fff;">
					<!-- <template is="wxParse" :data="wxParseData:goodsDetail.nodes"/> -->
					<mp-html :content="article_goodsDetail"></mp-html>
				</view>

				<!-- 常见问题 -->
				<view class="common-problem">
					<view class="h">
						<view class="line"></view>
						<text class="title">常见问题</text>
					</view>
					<view class="b">
						<view class="item" v-for="(item, index) in issueList" :key="item.id">
							<view class="question-box">
								<text class="spot"></text>
								<text class="question">{{ item.question }}</text>
							</view>

							<view class="answer">
								{{ item.answer }}
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	var app = getApp();

	var undefined;

	var util = require('../../utils/util.js');

	var api = require('../../config/api.js');

	export default {
		data() {
			return {
				// 所有的票
				ticketSort: {
					gong: [],
					zhuan: []
				},

				// 当前zp，当前票种，当前日期，所有的可选规格
				guigeArr: [],

				// 是否专业日标志位
				isZhuan: false,
				// 当前票种的下标
				ticketTypeIndex: 0,
				// 当前日期的下标
				ticketTimeIndex: 0,
				// 当前规格的下标
				ticketGuigeIndex: 0,
				article_goodsDetail: "",
				chooseDate: "选择日期",
			};
		},
		computed: {

			// 当前渲染的票数组
			ticketArr() {
				return this.isZhuan ? this.ticketSort['zhuan'] : this.ticketSort['gong']
			},

			// 公众日/专业日
			ticketRi() {
				const zhuan = '专业日：2022-11-08至2022-11-10；面向18岁以上成年人开放.';
				const gong = '公众日：2022-11-11至2022-11-13；面向所有人开放.';

				return this.isZhuan ? zhuan : gong
			},

			// 票种
			ticketTypeArr() {
				const arr = this.ticketArr;
				let tkArr = [];
				arr.map(item => {
					const pz = item.pz;
					if (tkArr.indexOf(pz) == -1) {
						tkArr.push(pz);
					}
				});
				return tkArr
			},

			// 实物票/电子票的提示文字
			ticketTip() {
				const {
					ticketTypeArr,
					ticketTypeIndex
				} = this;

				const shi = '实物票：凭门票和个人有效证件入场(顺丰包邮).';
				const dian = '电子票：大陆居民刷“身份证”入场；港澳台居民凭“通行证”入场';

				return ticketTypeArr[ticketTypeIndex] == '实物票' ? shi : dian
			},


			// 当前zp（公众票/普通），当前票种（电子票/实物票），所有的可选日期
			ticketTimeArr() {
				const ticketArr = this.ticketArr;
				const ticketTypeArr = this.ticketTypeArr;
				const ticketTypeIndex = this.ticketTypeIndex;

				const arr = this.ticketArr.filter(item => {
					return (item.pz == ticketTypeArr[ticketTypeIndex])
				})



				return arr.map(item => {
					Object.assign(item, {
						date: item.shiJian,
						info: "￥" + item.retail_price
					})
					return item
				})

				// let lastArr = [];

				// lastArr = arr.map(item => {
				// 	return {
				// 		shiJian: item.shiJian.split("&"),
				// 		retail_price: item.retail_price
				// 	}
				// });

				// // 要放入日历组件的数组
				// let selectedInfo = [];
				// for (const i of lastArr) {
				// 	const timearr = this.handleTime(i.shiJian[0], i.shiJian[1]);
				// 	const tmpArr = timearr.map(item => {
				// 		return {
				// 			date: item,
				// 			info: "￥" + i.retail_price
				// 		}
				// 	})
				// 	selectedInfo = [...selectedInfo, ...tmpArr];
				// }

				// return selectedInfo

			},

		},
		onLoad: function(options) {
			// 页面初始化 options为页面跳转所带来的参数
			this.setData({
				id: parseInt(options.id), // id: 1181000,
			});

			if (this.ticketSort['gong'].length == 0) {
				this.isZhuan = true;
			}

			var that = this;
			this.getGoodsInfo();
			util.request(api.CartGoodsCount).then(function(res) {
				if (res.errno === 0) {
					that.setData({
						cartGoodsCount: res.data.cartTotal.goodsCount
					});
				}
			});

		},
		methods: {
			handleTime(a, b) {
				let start = new Date(a);
				let end = new Date(b);
				const handle = (n) => {
					return n.toString().length > 1 ? n : `0${n}`
				}

				let result = [];
				while (start <= end) {
					let month = start.getMonth() + 1;
					let date = start.getDate();
					let year = start.getFullYear();
					result.push(`${year}-${handle(month)}-${handle(date)}`);
					start.setDate(start.getDate() + 1);
				}

				return result
				// console.log(result);

			},
			open() {
				console.log(this.$refs.calendar);
				this.$refs.calendar.open();
			},
			confirm(e) {
				// console.log(e);
				this.chooseDate = e.fulldate;
				this.guigeArr = this.getguigeArr()
				// this.setData({
				// 	guigeArr: this.getguigeArr(),
				// })
			},
			// 计算得到规格数组
			getguigeArr() {
				const ticketArr = this.ticketArr;
				const ticketTypeArr = this.ticketTypeArr;
				const ticketTypeIndex = this.ticketTypeIndex;
				const chooseDate = this.chooseDate;

				let arr = ticketArr.filter(item => {
					console.log(item.date, chooseDate);
					return item.pz == ticketTypeArr[ticketTypeIndex] && item.date == chooseDate
				})
				return arr = arr.map(item => {

					return {
						id: item.id,
						chooseCount: item.goods_number > 0 ? 1 : 0,
						guiGe: item.guiGe,
						goods_number: item.goods_number,
						retail_price: item.retail_price
					}
				})
			},
			// 立即订购
			dingGou() {
				// 购票数量 -- 规格
				const {
					guigeArr
				} = this;
				// 票种信息
				const {
					ticketTypeArr,
					ticketTypeIndex
				} = this;
				// 出行日期
				const {
					ticketTimeArr,
					ticketTimeIndex
				} = this;
				// 专业/普通
				const zp = this.isZhuan ? '专业日' : '公众日';

				const guigeArrCopy = guigeArr.filter(item => {
					return item.chooseCount > 0
				})
				if (guigeArrCopy.length == 0) {
					util.showErrorToast('没有选择商品呢');
					return
				}

				const data = {
					guigeArr: guigeArr,
					ticketType: ticketTypeArr[ticketTypeIndex],
					ticketTime: ticketTimeArr[ticketTimeIndex],
					zp: zp,
					choosetime: this.chooseDate
				}
				uni.setStorageSync('buyItem', JSON.stringify(data));



				wx.navigateTo({
					url: `../buy/buy?id=${this.id}&category_id=${this.goods.category_id}`
				})
			},
			// 减一
			jian(ticketGuigeIndex) {
				let guigeArr = this.guigeArr;
				if (guigeArr[ticketGuigeIndex].chooseCount == 0) {
					uni.showToast({
						title: '不能再减了噢~',
						duration: 2000,
						icon: 'none'
					})
					return;
				}
				guigeArr[ticketGuigeIndex].chooseCount -= 1;
				this.$set(this.guigeArr, ticketGuigeIndex, guigeArr[ticketGuigeIndex])
			},
			// 加一
			jia(ticketGuigeIndex) {
				let guigeArr = this.guigeArr;
				const item = guigeArr[ticketGuigeIndex];
				console.log(item.goods_number, item.chooseCount);
				if (item.goods_number < item.chooseCount + 1) {
					uni.showToast({
						title: '库存不足',
						duration: 2000,
						icon: 'none'
					})
					return;
				}
				item.chooseCount += 1;
				this.$set(this.guigeArr, ticketGuigeIndex, item);
			},
			toastNone() {
				uni.showToast({
					title: '已售罄~',
					duration: 2000,
					icon: 'none'
				})
			},
			// 切换专业/普通
			changeZp(type) {
				if (this.ticketSort[type].length > 0) {
					this.isZhuan = type == 'zhuan' ? true : false;
					this.setData({
						ticketTypeIndex: 0,
						ticketTimeIndex: 0,
						ticketGuigeIndex: 0,
					}, () => {
						this.setData({
							guigeArr: this.getguigeArr()
						})
					})
				} else {
					uni.showToast({
						title: '没有了噢~',
						duration: 2000,
						icon: 'none'
					})
				}
			},
			changeTicketType(index) {
				this.ticketTypeIndex = index;
				// 初始化票时间
				this.ticketTimeIndex = 0;
			},
			changeTicketTime(index) {
				this.ticketTimeIndex = index
			},


			initTicketArr() {
				let that = this;
				let ticketArr = [];

				that.productList.map(item => {

					// 将 goods_specification_ids 变成数组
					if (item.goods_specification_ids == null) {
						return;
					}

					let idsArr = item.goods_specification_ids.split("_");
					let valArr = [];

					that.specificationList.map(sf => valArr = [...valArr, ...sf.valueList]);
					console.log(valArr)
					let obj = {};
					// 对数组遍历寻找到对应的数据
					idsArr.map(ids => {
						valArr.map(val => {

							if (ids == val.id) {
								console.log(val)

								if (val.name == "规格") {
									obj["guiGe"] = val.value;
								}

								if (val.name == "日期" || val.name == "时间") {
									obj["shiJian"] = val.value;
								}

								if (val.name == "专业｜普通") {
									obj["zp"] = val.value;
								}

								if (val.name == "票种") {
									obj["pz"] = val.value;
								}
							}


							if (
								obj["guiGe"] &&
								obj["shiJian"] &&
								obj["zp"] &&
								obj["pz"]
							) {

								const [day1, day2] = obj.shiJian.split("&");
								const timearr = this.handleTime(day1, day2);
								const tmpArr = timearr.map(e => {
									if (this.isWeekend(e)) {
										return {
											guiGe: obj["guiGe"],
											shiJian: e,
											date: e,
											zp: obj["zp"],
											pz: obj["pz"],
											retail_price: item.weekend_price,
											goods_number: item.goods_number,
											id: item.id,
											info: ("￥" + item.weekend_price)
										}
									} else {
										return {
											guiGe: obj["guiGe"],
											shiJian: e,
											date: e,
											zp: obj["zp"],
											pz: obj["pz"],
											retail_price: item.retail_price,
											goods_number: item.goods_number,
											id: item.id,
											info: ("￥" + item.retail_price)
										}
										// return {
										// 	guiGe: obj["guiGe"],
										// 	shiJian: e,
										// 	date: e,
										// 	zp: obj["zp"],
										// 	pz: obj["pz"],
										// 	retail_price: item.retail_price,
										// 	goods_number: item.goods_number,
										// 	id: item.id,
										// }
									}
								})
								ticketArr = [...ticketArr, ...tmpArr];
								obj = {};
							}
						})


					})
				})

				let ticketSort = {
					gong: [],
					zhuan: []
				};

				ticketArr.map(item => {
					if (item.zp == '普通') {
						ticketSort['gong'] = [...ticketSort['gong'], item]
					} else {
						ticketSort['zhuan'] = [...ticketSort['zhuan'], item]
					}
				})

				console.log(ticketSort, "清洗出来的票")
				that.setData({
					ticketSort
				});
			},
			isWeekend(date) {
				const dayOfWeek = new Date(date).getDay();
				return dayOfWeek === 6 || dayOfWeek === 0;
			},
			getGoodsInfo: function() {
				let that = this;
				util.request(api.GoodsDetail, {
					id: that.id
				}).then(function(res) {
					if (res.errno === 0) {

						that.setData({
							goods: res.data.info,
							gallery: res.data.gallery,
							attribute: res.data.attribute,
							issueList: res.data.issue,
							comment: res.data.comment,
							brand: res.data.brand,
							specificationList: res.data.specificationList,
							productList: res.data.productList,
							userHasCollect: res.data.userHasCollect
						});

						that.initTicketArr();

						if (res.data.userHasCollect == 1) {
							that.setData({
								collectBackImage: that.hasCollectImage
							});
						} else {
							that.setData({
								collectBackImage: that.noCollectImage
							});
						}

						//WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that)
						that.article_goodsDetail = that.escape2Html(res.data.info.goods_desc);

						that.getGoodsRelated();
						that.setData({
							guigeArr: that.getguigeArr(),
						})
						console.log(that.guigeArr, that.gallery, 23333)
					}
				});
			},

			getGoodsRelated: function() {
				let that = this;
				util.request(api.GoodsRelated, {
					id: that.id
				}).then(function(res) {
					if (res.errno === 0) {
						that.setData({
							relatedGoods: res.data.goodsList
						});
					}
				});
			},

			clickSkuValue: function(event) {
				let that = this;
				let specNameId = event.currentTarget.dataset.nameId;
				let specValueId = event.currentTarget.dataset.valueId; //判断是否可以点击
				//TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环

				let _specificationList = this.specificationList;

				for (let i = 0; i < _specificationList.length; i++) {
					if (_specificationList[i].specification_id == specNameId) {
						for (let j = 0; j < _specificationList[i].valueList.length; j++) {
							if (_specificationList[i].valueList[j].id == specValueId) {
								//如果已经选中，则反选
								if (_specificationList[i].valueList[j].checked) {
									_specificationList[i].valueList[j].checked = false;
								} else {
									_specificationList[i].valueList[j].checked = true;
								}
							} else {
								_specificationList[i].valueList[j].checked = false;
							}
						}
					}
				}

				this.setData({
					specificationList: _specificationList
				}); //重新计算spec改变后的信息

				this.changeSpecInfo(); //重新计算哪些值不可以点击
			},

			//获取选中的规格信息
			getCheckedSpecValue: function() {
				let checkedValues = [];
				let _specificationList = this.specificationList;

				for (let i = 0; i < _specificationList.length; i++) {
					let _checkedObj = {
						nameId: _specificationList[i].specification_id,
						valueId: 0,
						valueText: ''
					};

					for (let j = 0; j < _specificationList[i].valueList.length; j++) {
						if (_specificationList[i].valueList[j].checked) {
							_checkedObj.valueId = _specificationList[i].valueList[j].id;
							_checkedObj.valueText = _specificationList[i].valueList[j].value;
						}
					}

					checkedValues.push(_checkedObj);
				}

				return checkedValues;
			},

			//根据已选的值，计算其它值的状态
			setSpecValueStatus: function() {},

			//判断规格是否选择完整
			isCheckedAllSpec: function() {
				return !this.getCheckedSpecValue().some(function(v) {
					if (v.valueId == 0) {
						return true;
					}
				});
			},

			getCheckedSpecKey: function() {
				let checkedValue = this.getCheckedSpecValue().map(function(v) {
					return v.valueId;
				});
				return checkedValue.join('_');
			},

			changeSpecInfo: function() {
				let checkedNameValue = this.getCheckedSpecValue(); //设置选择的信息

				let checkedValue = checkedNameValue
					.filter(function(v) {
						if (v.valueId != 0) {
							return true;
						} else {
							return false;
						}
					})
					.map(function(v) {
						return v.valueText;
					});

				if (checkedValue.length > 0) {
					this.setData({
						checkedSpecText: checkedValue.join('　')
					});
				} else {
					this.setData({
						checkedSpecText: '请选择规格数量'
					});
				}
			},

			getCheckedProductItem: function(key) {
				return this.productList.filter(function(v) {
					if (v.goods_specification_ids == key) {
						return true;
					} else {
						return false;
					}
				});
			},

			switchAttrPop: function() {
				if (this.openAttr == false) {
					this.setData({
						openAttr: !this.openAttr
					});
				}
			},

			closeAttr: function() {
				this.setData({
					openAttr: false
				});
			},

			addCannelCollect: function() {
				let that = this; //添加或是取消收藏

				util.request(
					api.CollectAddOrDelete, {
						typeId: 0,
						valueId: this.id
					},
					'POST'
				).then(function(res) {
					let _res = res;

					if (_res.errno == 0) {
						if (_res.data.type == 'add') {
							that.setData({
								collectBackImage: that.hasCollectImage
							});
						} else {
							that.setData({
								collectBackImage: that.noCollectImage
							});
						}
					} else {
						uni.showToast({
							image: '/static/static/images/icon_error.png',
							title: _res.errmsg,
							mask: true
						});
					}
				});
			},

			openCartPage: function() {
				uni.switchTab({
					url: '/pages/cart/cart'
				});
			},

			addToCart: function() {
				var that = this;

				if (this.openAttr === false) {
					//打开规格选择窗口
					this.setData({
						openAttr: !this.openAttr
					});
				} else {
					//提示选择完整规格
					if (!this.isCheckedAllSpec()) {
						uni.showToast({
							image: '/static/static/images/icon_error.png',
							title: '请选择规格',
							mask: true
						});
						return false;
					} //根据选中的规格，判断是否有对应的sku信息

					let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());

					if (!checkedProduct || checkedProduct.length <= 0) {
						//找不到对应的product信息，提示没有库存
						uni.showToast({
							image: '/static/static/images/icon_error.png',
							title: '库存不足',
							mask: true
						});
						return false;
					} //验证库存

					if (checkedProduct.goods_number < this.number) {
						//找不到对应的product信息，提示没有库存
						uni.showToast({
							image: '/static/static/images/icon_error.png',
							title: '库存不足',
							mask: true
						});
						return false;
					} //添加到购物车

					util.request(
						api.CartAdd, {
							goodsId: this.goods.id,
							number: this.number,
							productId: checkedProduct[0].id
						},
						'POST'
					).then(function(res) {
						let _res = res;

						if (_res.errno == 0) {
							uni.showToast({
								title: '添加成功'
							});
							that.setData({
								openAttr: !that.openAttr,
								cartGoodsCount: _res.data.cartTotal.goodsCount
							});
						} else {
							uni.showToast({
								image: '/static/static/images/icon_error.png',
								title: _res.errmsg,
								mask: true
							});
						}
					});
				}
			},

			cutNumber: function() {
				this.setData({
					number: this.number - 1 > 1 ? this.number - 1 : 1
				});
			},

			addNumber: function() {
				this.setData({
					number: this.number + 1
				});
			}
		}
	};
</script>
<style>
	@import url("./goodsTicket.css");
</style>
