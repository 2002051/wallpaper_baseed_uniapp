// 存储一些系统信息的js

let SYSTEM = uni.getSystemInfoSync();
export const getStatusBarHeight = () => SYSTEM.statusBarHeight || 15;

export const getTitleBarHeight = () => {
	// 胶囊按钮
	if (uni.getMenuButtonBoundingClientRect) {
		let {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect()
		let titleBarHeight = height + (top - getStatusBarHeight()) * 2
		return titleBarHeight;
	} else {
		return 40;
	}



}

export const getnavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()

export const getLeftIcon = () => {
	
	// #ifdef MP-TOUTIAO
	
	let {
		leftIcon: {
			left,
			width
		}
	} = tt.getCustomButtonBoundingClientRect()
	return left + parseInt(width) + 5
	// #endif
	return 0
}