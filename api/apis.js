import {request} from '@/utils/request.js'

export function apiGetBanner() { // 将 apiGetBanner 函数向外暴露，
	// return uni.request({ // 网络请求结果的promise对象，将其return出去，外部通过then 和catch方法执行对应的回调函数内容
	// 	url: "https://tea.qingnian8.com/api/bizhi/homeBanner",
	// 	header: {
	// 		"access-key": "ytw666"
	// 	}

	// })
	return request({url:"homeBanner",method:"POST"})
}
export function apigetDayRandom(){
		return request({url:"randomWall"})
}
export function apigetNotice(data={}){
	console.log("data",data)
	return request({url:"wallNewsList",data:data})

}


export function apigetClassify(data={}){
	return request({
		url:"classify",
		data:data
	})
}
