/**
 * 封装上传图片到七牛云
 * @param {num} 上传的数量
 * @param {status}   true： 图片上传，false：视频上传 
 * @param {callback}  返回方法
 * 在main.js 全局引用：import $mUploadImage from '@/common/uploadImage'
 * 挂在：Vue.prototype.$mUploadImage = $mUploadImage;
 * 调用方法： this.$mUploadImage(1, true, res => {console.log(res)})
 */
import https from '@/utils/request.js'
import {
	getQiniuToken
} from '@/api/product.js'
import qiniuUploader from '@/common/qiniuUploader.js'

export const uploadImage = (num, status, callback) => {
	if (status) {
		uni.chooseImage({
			count: num, // 默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['camera', 'album'], //从相册选择、摄像头
			success: function(res) {
				uni.showLoading({
					title: '上传中'
				})

				res.tempFilePaths.forEach((filePath, index) => {
					https({
						url: getQiniuToken,
						method: 'POST',
						success: res => {
							let now_time = new Date().getTime();
							qiniuUploader.upload(
								filePath,
								(res) => {
									callback(res)
									uni.hideLoading()
								},
								(err) => {
									callback(err)
									uni.hideLoading()
								}, {
									region: 'NCN',
									uptoken: res.data,
									key: now_time,
									domain: 'https://*********', // 七牛云上传地址
								}
							)
						}
					})
				})
			}
		})
	} else {
		uni.chooseVideo({
			count: num,
			success: function(res) {
				uni.showLoading({
					title: '上传中'
				})
				let filePath = res.tempFilePath;
				https({
					url: getQiniuToken,
					method: 'POST',
					success: res => {
						let now_time = new Date().getTime();
						qiniuUploader.upload(
							filePath,
							(res) => {
								callback(res)
							},
							(err) => {
								callback(err)
							}, {
								region: 'NCN',
								uptoken: res.token,
								key: now_time,
								domain: 'https://*********', // 七牛云上传地址
							}
						)
					}
				})
			}
		})
	}
}


module.exports = uploadImage
