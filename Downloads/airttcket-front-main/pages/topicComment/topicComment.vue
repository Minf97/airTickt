<template>
	<view class="comments">
		<view class="b">
			<view class="item" v-for="(item, index) in comments" :key="item.id">
				<view class="info">
					<view class="user">
						<image :src="item.user_info.avatar || '/static/images/topicComment/user.png'" mode="aspectFill">
						</image>
						<text>{{ item.user_info.nickname }}</text>
					</view>
					<view class="time">{{ item.add_time }}</view>
				</view>

				<view class="comment">{{ item.content }}</view>

				<view class="imgs" v-if="item.pic_list.length > 0">
					<image class="img" :src="pitem.pic_url" v-for="(pitem, index1) in item.pic_list" :key="pitem.id">
					</image>
				</view>

				<!--<view class="customer-service" wx:if="{{item.commentReplyVO}}">
        <text class="u">小选回复：</text>
        <text class="c">{{item.commentReplyVO.replyContent}}</text>
      </view>-->
			</view>
		</view>
	</view>
</template>

<script>
	var app = getApp();

	var util = require('../../utils/util.js');

	var api = require('../../config/api.js');

	export default {
		data() {
			return {
				comments: [],
				allCommentList: [],
				picCommentList: [],
				typeId: 0,
				valueId: 0,
				showType: 0,
				allCount: 0,
				hasPicCount: 0,
				allPage: 1,
				picPage: 1,
				size: 20,

				pitem: {
					pic_url: '',
					id: ''
				}
			};
		},
		onLoad: function(options) {
			// 页面初始化 options为页面跳转所带来的参数
			this.setData({
				typeId: options.typeId,
				valueId: options.valueId
			});
			this.getCommentCount();
			this.getCommentList();
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
		onReachBottom: function() {
			console.log('onPullDownRefresh');

			if (this.showType == 0) {
				if (this.allCount / this.size < this.allPage) {
					return false;
				}

				this.setData({
					allPage: this.allPage + 1
				});
			} else {
				if (this.hasPicCount / this.size < this.picPage) {
					return false;
				}

				this.setData({
					picPage: this.picPage + 1
				});
			}

			this.getCommentList();
		},
		methods: {
			getCommentCount: function() {
				let that = this;
				util.request(api.CommentCount, {
					valueId: that.valueId,
					typeId: that.typeId
				}).then(function(res) {
					if (res.errno === 0) {
						that.setData({
							allCount: res.data.allCount,
							hasPicCount: res.data.hasPicCount
						});
					}
				});
			},

			getCommentList: function() {
				let that = this;
				util.request(api.CommentList, {
					valueId: that.valueId,
					typeId: that.typeId,
					size: that.size,
					page: that.showType == 0 ? that.allPage : that.picPage,
					showType: that.showType
				}).then(function(res) {
					if (res.errno === 0) {
						if (that.showType == 0) {
							const response = res.data.data;
							that.setData({
								allCommentList: that.allCommentList.concat(res.data.data),
								allPage: res.data.currentPage,
								comments: that.allCommentList.concat(res.data.data)
							});
						} else {
							that.setData({
								picCommentList: that.picCommentList.concat(res.data.data),
								picPage: res.data.currentPage,
								comments: that.picCommentList.concat(res.data.data)
							});
						}
					}
				});
			},

			switchTab: function() {
				this.setData({
					showType: this.showType == 1 ? 0 : 1
				});
				this.getCommentList();
			}
		}
	};
</script>
<style>
	.comments {
		width: 100%;
		height: auto;
		padding-left: 30rpx;
		background: #fff;
		margin: 20rpx 0;
	}

	.comments .b {
		height: auto;
		width: 720rpx;
	}

	.comments .b.no-h {
		margin-top: 0;
	}

	.comments .item {
		height: auto;
		width: 720rpx;
		overflow: hidden;
		border-bottom: 1px solid #d9d9d9;
		padding-bottom: 25rpx;
	}

	.comments .info {
		height: 127rpx;
		width: 100%;
		padding: 33rpx 0 27rpx 0;
		display: flex;
		flex-direction: row;
	}

	.comments .user {
		float: left;
		width: auto;
		height: 67rpx;
		line-height: 67rpx;
		font-size: 0;
		display: flex;
		flex-direction: row;
		flex: 2;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.comments .user image {
		float: left;
		width: 50rpx;
		height: 50rpx;
		margin-right: 17rpx;
		border-radius: 50%;
	}

	.comments .user text {
		display: inline-block;
		width: 70%;
		height: 66rpx;
		overflow: hidden;
		font-size: 29rpx;
		line-height: 66rpx;

	}

	.comments .time {
		display: block;
		float: right;
		width: auto;
		height: 67rpx;
		line-height: 67rpx;
		color: #7f7f7f;
		font-size: 25rpx;
		margin-right: 30rpx;
		flex: 2;
	}

	.comments .comment {
		width: 720rpx;
		padding-right: 30rpx;
		line-height: 45.8rpx;
		font-size: 29rpx;
		margin-bottom: 16rpx;
	}

	.comments .imgs {
		width: 720rpx;
		height: 150rpx;
		margin-bottom: 25rpx;
	}

	.comments .imgs .img {
		height: 150rpx;
		width: 150rpx;
		margin-right: 28rpx;
	}

	.comments .customer-service {
		width: 690rpx;
		height: auto;
		overflow: hidden;
		margin-top: 23rpx;
		background: rgba(0, 0, 0, 0.03);
		padding: 21rpx;
	}

	.comments .customer-service .u {
		font-size: 24rpx;
		color: #333;
		line-height: 37.5rpx;
	}

	.comments .customer-service .c {
		font-size: 24rpx;
		color: #999;
		line-height: 37.5rpx;
	}
</style>
