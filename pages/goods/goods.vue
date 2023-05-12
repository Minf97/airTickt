<template>
	<view>
		<view class="container">
			<swiper class="goodsimgs" :indicator-dots="true" :autoplay="true" interval="3000" duration="1000">
				<swiper-item v-for="(item, index) in gallery" :key="item.id">
					<image :src="item.img_url" background-size="cover"></image>
				</swiper-item>
			</swiper>
			<!-- <view class="service-policy">
                <view class="item">30天无忧退货</view>
                <view class="item">48小时快速退款</view>
                <view class="item">满88元免邮费</view>
            </view> -->
			<view class="goods-info">
				<view class="c">
					<text class="name">{{ goods.name }}</text>
					<text class="desc">{{ goods.goods_brief }}</text>
					<text class="price">￥{{ goods.retail_price }}</text>
					<view class="brand" v-if="brand.name">
						<navigator :url="'../brandDetail/brandDetail?id=' + brand.brandId">
							<text>{{ brand.name }}</text>
						</navigator>
					</view>
				</view>
			</view>

			<view class="section-nav section-attr" @tap="switchAttrPop">
				<view class="t">请选择规格数量</view>
				<image class="i" src="/static/static/images/address_right.png" background-size="cover"></image>
			</view>
			<!--<view class="section-nav section-act">
      <view class="t">
        <view class="label">1个促销:</view>
        <view class="tag">万圣趴</view>
        <view class="text">全场满499，额外送糖果</view>
      </view>
      <image class="i" src="../../static/images/address_right.png" background-size="cover"></image>
    </view>-->
			<view class="comments" v-if="comment.count > 0">
				<view class="h">
					<navigator :url="'../comment/comment?valueId=' + goods.id + '&typeId=0'">
						<text class="t">评价({{ comment.count > 999 ? '999+' : comment.count }})</text>
						<text class="i">查看全部</text>
					</navigator>
				</view>
				<view class="b">
					<view class="item">
						<view class="info">
							<view class="user">
								<image :src="comment.data.avatar"></image>
								<text>{{ comment.data.nickname }}</text>
							</view>
							<view class="time">{{ comment.data.add_time }}</view>
						</view>
						<view class="content">
							{{ comment.data.content }}
						</view>
						<view class="imgs" v-if="comment.data.pic_list.length > 0">
							<image class="img" :src="item.pic_url" v-for="(item, index) in comment.data.pic_list"
								:key="item.id"></image>
						</view>
						<!-- <view class="spec">白色 2件</view> -->
					</view>
				</view>
			</view>
			<view class="goods-attr">
				<view class="t">商品参数</view>
				<view class="l">
					<view class="item" v-for="(item, index) in attribute" :key="item.name">
						<text class="left">{{ item.name }}</text>

						<text class="right">{{ item.value }}</text>
					</view>
				</view>
			</view>

			<view class="detail" style="background-color: #fff;">
				<!-- <template is="wxParse" :data="wxParseData:goodsDetail.nodes"/> -->
				<mp-html :content="article_goodsDetail"></mp-html>
			</view>

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

			<view class="related-goods" v-if="relatedGoods.length > 0">
				<view class="h">
					<view class="line"></view>
					<text class="title">大家都在看</text>
				</view>
				<view class="b">
					<view class="item" v-for="(item, index) in relatedGoods" :key="item.id">
						<navigator :url="'/pages/goods/goods?id=' + item.id">
							<image class="img" :src="item.list_pic_url" background-size="cover"></image>
							<text class="name">{{ item.name }}</text>
							<text class="price">￥{{ item.retail_price }}</text>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<view class="attr-pop-box" v-if="openAttr">
			<view class="attr-pop">
				<view class="close" @tap="closeAttr">
					<image class="icon" src="/static/static/images/icon_close.png"></image>
				</view>
				<view class="img-info">
					<image class="img" :src="gallery[0].img_url"></image>
					<view class="info">
						<view class="c">
							<view class="p">价格：￥{{ retail_price || goods.retail_price }}</view>
							<view class="a" v-if="productList.length > 0">已选择：{{ checkedSpecText }}</view>
						</view>
					</view>
				</view>

				<view class="spec-con">
					<view class="spec-item" v-for="(item, index) in specificationList" :key="item.specification_id">
						<view class="name">{{ item.name }}</view>
						<view class="values">
							<view v-if="item.name != '时间'">
								<view :class="'value ' + (vitem.checked ? 'selected' : '')" @tap="clickSkuValue"
									:data-value-id="vitem.id" :data-name-id="vitem.specification_id"
									v-for="(vitem, index1) in item.valueList" :key="vitem.id">
									{{ vitem.value }}
								</view>
							</view>

							<view v-if="item.name == '时间'">
								<uni-calendar ref="calendar" :selected="timearr" :insert="false" @close="closeCal"
									@confirm="confirm" />
								<view :class="'value ' + (chooseDate == '选择日期' ? '':'selected')"
									:style="chooseId == 0 ? 'border: 1px solid #ccc;color:#ccc' : ''"
									:data-value-id="vitem.id" :data-name-id="vitem.specification_id" @click="open">
									{{chooseDate}}
								</view>
							</view>
						</view>
					</view>

					<!-- <view class="number-item">
						<view class="name">数量</view>
						<view class="selnum">
							<view class="cut" @tap="cutNumber">-</view>
							<input :value="number" class="number" :disabled="true" type="number" />
							<view class="add" @tap="addNumber">+</view>
						</view>
					</view> -->
				</view>
			</view>
		</view>
		<view class="bottom-btn" :style="isShowFix ? 'bottom: 0rpx;' : 'bottom: -200rpx;'">
			<view class="l l-collect" @tap="addCannelCollect">
				<image class="icon" :src="collectBackImage"></image>
			</view>
			<view class="l l-cart">
				<view class="box">
					<text class="cart-count">{{ cartGoodsCount }}</text>
					<image @tap="openCartPage" class="icon" src="/static/static/images/ic_menu_shoping_nor.png"></image>
				</view>
			</view>
			<view class="c" style="opacity: 0">立即购买</view>
			<!-- <view class="r" @tap="addToCart">加入购物车</view> -->
			<view class="r" @tap="buy"
				:style="(chooseDate == '选择日期' || chooseId == 0) && buyText == '立即购买' && goods.category_id == 1036010  ? 'border: 1px solid #ccc;background-color: #fff;color:#ccc' : ''">
				{{buyText}}
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
				id: 0,
				retail_price: '',
				goods: {
					name: '',
					goods_brief: '',
					retail_price: '',
					id: ''
				},

				gallery: [],
				attribute: [],
				issueList: [],
				comment: [],

				brand: {
					name: '',
					brandId: ''
				},

				specificationList: [],
				productList: [],
				relatedGoods: [],
				cartGoodsCount: 0,
				userHasCollect: 0,
				number: 1,
				checkedSpecText: '请选择规格数量',
				openAttr: false,
				noCollectImage: '/static/static/images/icon_collect.png',
				hasCollectImage: '/static/static/images/icon_collect_checked.png',
				collectBackImage: '/static/static/images/icon_collect.png',
				avatar: '',
				nickname: '',
				add_time: '',
				content: '',
				pic_list: [],
				article_goodsDetail: '',
				img_url: '',

				vitem: {
					checked: false,
					id: '',
					specification_id: '',
					value: ''
				},
				buyText: "选择规格",
				chooseDate: "选择日期",

				chooseId: 0,
				ischoose: false,
				timearr: [],


				isShowFix: true
			};
		},
		onLoad: function(options) {
			// 页面初始化 options为页面跳转所带来的参数
			this.setData({
				id: parseInt(options.id) // id: 1181000
			});
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
		onReady: function() {
			// 页面渲染完成
		},
		onShow: function() {
			// 页面显示
		},
		onHide: function() {
			// 页面隐藏
		},
		onUnload: function() {
			// 页面关闭
		},
		methods: {
			getRetailPrice(productList, id) {
				for (let i = 0; i < productList.length; i++) {
					let product = productList[i];
					if (product.goods_specification_ids && product.goods_specification_ids.includes(id)) {
						return product.retail_price;
					}
				}
				return null;
			},
			getWeekendPrice(productList, id) {
				for (let i = 0; i < productList.length; i++) {
					let product = productList[i];
					if (product.goods_specification_ids && product.goods_specification_ids.includes(id)) {
						return product.weekend_price;
					}
				}
				return null;
			},
			open() {
				if (this.chooseId == 0) {
					// util.showErrorToast('请先选择规格')
					uni.showToast({
						title: '请先选择规格',
						icon: 'none',
						duration: 3000
					})
					return;
				}

				// 要寻找的id
				const id = this.findId();
				console.log(id, "要找的时间的id");
				const timearrCopy = this.timearrCopy;
				let result = timearrCopy.filter(item => {
					// return item.filter(value => value.id == id);
					// if (item.id == id) {
					// 	return item
					// }
					return item.id == id
				});

				console.log(result);

				// for (const i of result) {
				// 	if (i.length != 0) {
				// 		result = i;
				// 	}
				// }
				// console.log(id, specificationList, result);
				this.timearr = result;
				this.$refs.calendar[0].open();
				this.isShowFix = false;
			},
			naviTo() {
				uni.navigateTo({
					url: '/pages/shopping/checkoutNew/checkoutNew?category_id=' + this.goods.category_id +
						'&choosetime=' + this.chooseDate
				})
			},
			async buy() {
				if (this.buyText == "选择规格") {
					this.openAttr = true;
					this.buyText = "立即购买";
					return;
				}
				const chooseDate = this.chooseDate;
				const chooseId = this.chooseId;
				const buyText = this.buyText;

				if ((chooseDate == '选择日期' || chooseId == 0) && buyText == '立即购买' && this.goods.category_id ==
					1036010) {
					uni.showToast({
						title: '还没选择好噢',
						icon: 'none',
						duration: 3000
					})
					return;
				}
				uni.showLoading();

				try {
					// 删除购物车中的该类商品
					await this.productDlete();
					// 购物车置空
					await this.goodsClear();
					// 加入购物车
					let isWeekend = this.isWeekend(this.chooseDate)
					await this.addToCart(isWeekend);
					// 调起支付
				} catch (err) {
					console.log(err)
					util.showErrorToast(err.errMsg)
				}
			},

			// 加入购物车
			async addToCart(isWeekend) {
				let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
				// console.log(checkedProduct);
				// return;
				if (checkedProduct.length == 0) {
					uni.showToast({
						title: '没选择好噢~',
						icon: 'none',
						duration: 3000
					})
					return;
				}
				await util.request(
					api.CartAdd, {
						goodsId: this.id,
						// 该票的张数
						number: this.number,
						// 该票的id
						productId: checkedProduct[0].id,
						// category_id??
						category_id: this.goods.category_id,
						isWeekend,
						certification: JSON.stringify([{
							choosetime: this.chooseDate
						}])
					},
					'POST'
				).then(res => {
					let _res = res;

					if (_res.errno == 0) {
						this.naviTo();
					} else {
						uni.showToast({
							image: '/static/static/images/icon_error.png',
							title: _res.errmsg,
							mask: true
						});
					}
				});
			},

			// 购物车置空
			async goodsClear() {
				await util.request(
					api.goodsClear, {},
					'GET'
				)
			},

			// 删除购物车中的票类商品
			async productDlete() {
				await util.request(
					api.productDlete, {
						goods_id: this.id
					},
					'POST'
				)
			},

			// 调起支付
			submitOrder() {
				// if (this.addressId <= 0) {
				// 	util.showErrorToast('请选择收货地址');
				// 	return false;
				// }

				util.request(
					api.OrderSubmit, {
						addressId: this.addressId,
						couponId: this.couponId,
						// category_id??
						category_id: this.category_id,
						// 是否需要地址
						isNoNeedAddress: true,
						// 联系信息
						name: this.contactInfo.name,
						phone: this.contactInfo.phone,
						// 证件信息
						// certification: JSON.stringify(this.certificationInfo),

					},
					'POST'
				).then((res) => {
					if (res.errno === 0) {
						const orderId = res.data.orderInfo.id;
						pay.payOrder(parseInt(orderId))
							.then((res) => {
								uni.redirectTo({
									url: '/pages/payResult/payResult?status=1&orderId=' +
										orderId
								});
							})
							.catch((res) => {
								uni.redirectTo({
									url: '/pages/payResult/payResult?status=0&orderId=' +
										orderId
								});
							});
					} else {
						util.showErrorToast('下单失败');
					}
				}).catch(err => {
					util.showErrorToast('下单失败');
				})
			},
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
			closeCal(e) {
				console.log(e, 2333);
				this.isShowFix = true;
			},
			confirm(e) {
				// clog
				console.log(e.extraInfo, "什么情况");
				console.log(this.timearr, "这里错了？");
				this.chooseDate = e.fulldate;
				this.isShowFix = true;
				// this.retail_price = e.extraInfo.info.replace("￥", "");
				const event = {
					currentTarget: {
						dataset: {
							nameId: e.extraInfo.specification_id,
							valueId: this.timearr[0].id,
						}
					}
				}
				this.clickSkuValue(event, true);
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
						if (res.data.info.category_id == 1036010) {
							that.setData({
								buyText: "选择规格"
							})
						}
						const specificationList = res.data.specificationList;
						const shiJian = specificationList.filter(item => {
							return item.name == '时间'
						})
						// console.log(specificationList, shiJian);
						// shiJian 格式： [{},{}]
						let shiJianArr = [];
						for (let iitem of shiJian) {
							iitem = iitem.valueList.map(i => {
								// "xxx & xxx" => [xxx, xxx]
								const [day1, day2] = i.value.split("&");
								i.value = that.handleTime(day1, day2);
								console.log(i.id);
								const retail_price = that.getRetailPrice(res.data.productList, i.id)
								const weekend_price = that.getWeekendPrice(res.data.productList, i.id)
								i.value.map(j => {
									if (that.isWeekend(j)) {
										shiJianArr.push({
											value: j,
											date: j,
											id: i.id,
											specification_id: i.specification_id,
											name: i.name,
											goods_id: i.goods_id,
											info: ("￥" + weekend_price)
										})
									} else {
										shiJianArr.push({
											goods_id: i.goods_id,
											id: i.id,
											name: i.name,
											specification_id: i.specification_id,
											value: j,
											date: j,
											info: "￥" + retail_price
										})
									}
								})
							})
						}
						// for(let )
						// console.log(shiJianArr);
						// specificationList.forEach(item => {
						// 	if (item.name == '时间') {
						// 		item.valueList = shiJianArr;
						// 		console.log(item);
						// 	}
						// })
						// console.log(specificationList);

						specificationList.sort(function(a, b) {
							if (a.name === '时间') {
								return 1;
							} else {
								return -1;
							}
						});

						that.setData({
							goods: res.data.info,
							gallery: res.data.gallery,
							attribute: res.data.attribute,
							issueList: res.data.issue,
							comment: res.data.comment,
							brand: res.data.brand,
							specificationList: specificationList,
							// specificationListCopy: JSON.parse(JSON.stringify(specificationList)),
							productList: res.data.productList,
							userHasCollect: res.data.userHasCollect,
							timearr: shiJianArr,
							timearrCopy: shiJianArr
						});

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

			clickSkuValue: function(event, state = false) {
				let that = this;
				let specNameId = event.currentTarget.dataset.nameId;
				let specValueId = event.currentTarget.dataset.valueId; //判断是否可以点击
				!state && (this.chooseId = specValueId);
				// event function
				// if(event)
				// if(state) {
				// 	this.chooseDate = "选择日期";
				// }
				!state && (this.chooseDate = "选择日期");
				// this.specificationList = JSON.parse(JSON.stringify(this.specificationListCopy));
				//TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环

				let _specificationList = this.specificationList;
				// this. 
				// console.log(specValueId, "lkNCjwncjNJ");
				// for (let i = 0; i < _specificationList.length; i++) {
				// 	if (_specificationList[i].specification_id == specNameId) {
				// 		for (let j = 0; j < _specificationList[i].valueList.length; j++) {
				// 			if (_specificationList[i].valueList[j].id == specValueId) {
				// 				//如果已经选中，则反选
				// 				if (_specificationList[i].valueList[j].checked) {
				// 					_specificationList[i].valueList[j].checked = false;
				// 				} else {
				// 					_specificationList[i].valueList[j].checked = true;
				// 				}
				// 			} else {
				// 				_specificationList[i].valueList[j].checked = false;
				// 			}
				// 		}
				// 	}
				// }

				this.setData({
					specificationList: that.setChecked(_specificationList, specValueId, specNameId)
				}); //重新计算spec改变后的信息

				this.changeSpecInfo(); //重新计算哪些值不可以点击
			},

			findId() {
				const productList = this.productList;
				const id = this.chooseId;
				const result = productList.find(item => item.goods_specification_ids && item.goods_specification_ids.split(
					'_')[0] === String(id));
				if (result) {
					const otherId = result.goods_specification_ids.split('_')[1];
					// console.log(otherId); // 385
					return otherId
				}
			},

			//获取选中的规格信息
			getCheckedSpecValue: function() {
				let checkedValues = [];
				console.log(this.specificationList, 234)
				let _specificationList = this.specificationList;

				for (let i = 0; i < _specificationList.length; i++) {
					let _checkedObj = {
						nameId: _specificationList[i].specification_id,
						valueId: 0,
						valueText: ''
					};

					for (let j = 0; j < _specificationList[i].valueList.length; j++) {
						console.log(_specificationList[i].valueList[j]);
						if (_specificationList[i].valueList[j].checked) {
							_checkedObj.valueId = _specificationList[i].valueList[j].id;
							_checkedObj.valueText = _specificationList[i].valueList[j].value;
						}
					}

					checkedValues.push(_checkedObj);
				}

				return checkedValues;
			},
			setChecked(specificationList, id, nameId) {
				let targetSpecification = specificationList.find(item => item.specification_id === nameId);
				if (targetSpecification) {
					targetSpecification.valueList.forEach(item => {
						if (item.id === id) {
							item["checked"] = true;
							// console.log(item, "陌", id, nameId);
						} else {
							item["checked"] = false;
							// console.log(item, "佛", id, nameId);
						}
					});
				}
				return specificationList;
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
				console.log(231, this.getCheckedSpecValue())
				let checkedValue = this.getCheckedSpecValue().map(function(v) {
					return v.valueId;
				});
				console.log(233, checkedValue)
				return checkedValue.join('_');
			},

			changeSpecInfo: function() {
				let checkedNameValue = this.getCheckedSpecValue(); //设置选择的信息
				console.log(checkedNameValue);
				let that = this;
				let checkedValue = checkedNameValue
					.filter(function(v) {
						if (v.valueId != 0) {
							return true;
						} else {
							return false;
						}
					})
					.map(function(v) {
						console.log(v);
						if (v.nameId == 8) {
							return that.chooseDate
						}
						return v.valueText;
					});

				// console.log(checkedValue);


				this.retail_price = '此类暂时没有'
				let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());



				console.log(checkedProduct);

				if (checkedProduct.length > 0) {
					this.retail_price = checkedProduct[0].retail_price
				}

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
				console.log(123, key)

				if (this.productList.length === 1) {
					return this.productList
				}

				return this.productList.filter(function(v) {
					// console.log(v.goods_specification_ids, key)
					// console.log(v.goods_specification_ids.split('_').sort(), key.split('_').sort())
					if (v.goods_specification_ids && (JSON.stringify(v.goods_specification_ids.split('_')
							.sort()) === JSON.stringify(key.split(
							'_').sort()))) {
						return true;
					} else {
						return false;
					}
				});
			},

			switchAttrPop: function() {
				if (this.openAttr == false) {
					this.setData({
						openAttr: !this.openAttr,
						buyText: "立即购买"
					});
				}
			},

			closeAttr: function() {
				this.setData({
					openAttr: false,
					buyText: "选择规格"
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

			// addToCart: function() {
			// 	var that = this;

			// 	if (this.openAttr === false) {
			// 		//打开规格选择窗口
			// 		this.setData({
			// 			openAttr: !this.openAttr
			// 		});
			// 	} else {
			// 		//提示选择完整规格
			// 		if (!this.isCheckedAllSpec()) {
			// 			uni.showToast({
			// 				image: '/static/static/images/icon_error.png',
			// 				title: '请选择规格',
			// 				mask: true
			// 			});
			// 			return false;
			// 		} //根据选中的规格，判断是否有对应的sku信息

			// 		let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());


			// 		console.log(checkedProduct)
			// 		if (!checkedProduct || checkedProduct.length <= 0) {
			// 			//找不到对应的product信息，提示没有库存
			// 			uni.showToast({
			// 				image: '/static/static/images/icon_error.png',
			// 				title: '库存不足',
			// 				mask: true
			// 			});
			// 			return false;
			// 		} //验证库存

			// 		if (checkedProduct.goods_number < this.number) {
			// 			//找不到对应的product信息，提示没有库存
			// 			uni.showToast({
			// 				image: '/static/static/images/icon_error.png',
			// 				title: '库存不足',
			// 				mask: true
			// 			});
			// 			return false;
			// 		}

			// 		//添加到购物车
			// 		util.request(
			// 			api.CartAdd, {
			// 				goodsId: this.goods.id,
			// 				number: this.number,
			// 				productId: checkedProduct[0].id
			// 			},
			// 			'POST'
			// 		).then(function(res) {
			// 			let _res = res;

			// 			if (_res.errno == 0) {
			// 				uni.showToast({
			// 					title: '添加成功'
			// 				});
			// 				that.setData({
			// 					openAttr: !that.openAttr,
			// 					cartGoodsCount: _res.data.cartTotal.goodsCount
			// 				});
			// 			} else {
			// 				uni.showToast({
			// 					image: '/static/static/images/icon_error.png',
			// 					title: _res.errmsg,
			// 					mask: true
			// 				});
			// 			}
			// 		});
			// 	}
			// },

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
	@import url("./goods.css");
</style>
