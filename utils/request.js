// 将unirequest进行分装

const BASE_URL = "https://tea.qingnian8.com/api/bizhi/"

export function request(config = {}) {
	let {
		url,
		method = "GET",
		data = {},
		header = {}
	} = config
	URL = BASE_URL + url
	header['access-key'] = "ytw666"
	return new Promise((resolve, reject) => {

		uni.request({
			// url: "https://tea.qingnian8.com/api/bizhi/homeBanner",
			// header: {
			// 	"access-key": "ytw666"
			// },
			url: URL,
			method: method, // 如果参数名和形参名一样，其实可以之写一个
			header: header,
			data: data,
			success: (res) => {
				if (res.data.errCode === 0) {
					resolve(res.data) // 将参数暴露给fulled状态即成功的回调函数.then 的第一个参数中间
				} else if (res.data.errCode === 400) {
					uni.showModal({
						title: "错误提示",
						content: res.data.errMsg,
						showCancel: false
					})
				} else {
					uni.showToast({
						title: res.data.errMsg,
						icon: "none"
					})
					reject(res) // 此时失败，参数内容暴露出去，传递个.catch的回调函数中间的第一个参数
				}
			},
			fail: (err) => {
				reject(err) // 失败的话执行reject 动作，那么这个promise 对象的状态就是rejected(已失败)
			}
		})


	})


}