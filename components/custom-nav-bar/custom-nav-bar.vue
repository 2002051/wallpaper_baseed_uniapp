<template>
	<view class="layout">
		<view class="navbar">
			<view class="stateBar" :style="{height:getStatusBarHeight()+'px'}">

			</view>
			<view class="titleBar" :style="{height:getTitleBarHeight()+'px',marginLeft:getLeftIcon()+'px'}">
				<view class="title">
					{{title}}
				</view>
				<view class="search">
					<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					<text class="text">搜索</text>

				</view>
			</view>

		</view>
<!-- {height:statusBarHeight+titelBarheight+'px'} -->
		<view class="fill" :style="{height:getnavBarHeight()+'px'}">


		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {getStatusBarHeight,getTitleBarHeight,getnavBarHeight,getLeftIcon} from "@/utils/system.js"

defineProps({
	title:{
		type:String,
		default:"壁纸"
	}
	
})


// let SYSTEM = uni.getSystemInfoSync();
// // console.log("系统信息",system)
// let statusBarHeight = ref(SYSTEM.statusBarHeight)

// let SYSTEM = uni.getSystemInfoSync();
// // console.log("系统信息",system)
// let statusBarHeight = ref(SYSTEM.statusBarHeight)



// let {top,height}= uni.getMenuButtonBoundingClientRect();   // 获取胶囊按钮的状态
// let titelBarheight = ref(height+(top-statusBarHeight.value)*2)
</script>

<style lang="scss" scoped>
	.layout { 
		.navbar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 10;
			background:
			linear-gradient(to bottom,transparent,#fff 400rpx),
			linear-gradient(to right,#beecdb 20%,#f4e2d8);
			
			.stateBar {
				// border: 1px solid red;
			}

			.titleBar {
				display: flex;
				padding: 10rpx 30rpx;
				// border: solid 1px #000;
				
				display: flex;
				align-items: center;

				.title {
					font-size: 22px;
					font-weight: 700;
					color: #000;
				}

				.search {
					width: 220rpx;
					height: 56rpx;
					border-radius: 60rpx;
					background: rgba(255, 255, 255, 0.4);
					border: 1px solid #fff;
					margin-left: 30rpx;
					color: #999;
					font-size: 28rpx;
					display: flex;
					align-items: center;

					.text {
						padding-left: 10rpx;
					}

					.icon {
						padding-left: 5rpx;
					}
				}

			}
		}

		.fill {}
	}
</style>