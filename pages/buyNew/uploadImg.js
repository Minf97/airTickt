// 上传
import * as qiniu from './qiniu.min.js'
import * as api from './api'



export const qupload = (file, prefix = '') => {
	let options = {
		quality: 0.92,
		noCompressIfLarger: true
		// maxWidth: 1000,
		// maxHeight: 618
	}

	return new Promise((resolve, reject) => {
		let observer = {
			next(res) {
				// 接收上传进度信息
			},
			error(err) {
				// 上传错误后触发
				uni.showToast({
					title: err,
					icon: 'error',
					duration: 3000
				})
				reject(err)
			},
			complete(res) {
				// 接收上传完成后的后端返回信息
				resolve(res)
			}
		}

		uni.request({
			url: api.UP_TOKEN,
			method: 'GET',
			success: res => {
				if (file.name) {

					qiniu.compressImage(file, options).then(data => {
						let ext = file.name.split('.').pop()
						var observable = qiniu.upload(data.dist, prefix + (
								new Date()).getTime() + '.' + ext, res
							.uptoken, {}, {})
						observable.subscribe(observer) // 上传开始
					})
				} else {
					var observable = qiniu.upload(file, prefix + (new Date()).getTime() +
						'.jpg', res.uptoken, {}, {})
					observable.subscribe(observer) // 上传开始
				}
			},
			fail: err => {
				reject(err)
			}
		})

	})
}

export const getBaseUrl = (url) => {
	var reg = /^((\w+):\/\/([^/:]*)(?::(\d+))?)(.*)/
	reg.exec(url)
	return RegExp.$1
}

export const imgUrl = path => {
	// return `${process.env.WEBSITE}/storage/${path}`
	return `/storage/${path}`
}

export const keyMirror = (obj) => {
	let key
	let mirrored = {}
	if (obj && typeof obj === 'object') {
		for (key in obj) {
			if ({}.hasOwnProperty.call(obj, key)) {
				mirrored[key] = key
			}
		}
	}
	return mirrored
}
