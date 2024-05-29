<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title='推荐'></custom-nav-bar>
		<view class="banner">
			<swiper circular indicator-dots indicator-color="rgba(0, 0, 0, 0.5)"
				indicator-active-color="rgba(255, 255, 255, 0.5)">
				<swiper-item v-for="item in bannerList" autoplay :key="item._id">
					<!-- <image :src="`../../static/images/banner${item}.jpg`" mode="aspectFill"></image> -->
					<image :src="item.picurl" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
	<!-- 公告区域 -->
	<view class="notice">
		<view class="left">
			<!-- <uni-icons type="sound-filled" size="20" color="#28B389"></uni-icons> -->
			<uni-icons type="sound-filled" size="20"></uni-icons>
			<text class="text">公告</text>
		</view>
		<view class="center">
			<swiper vertical autoplay interval="1500" duration="300" circular>
				<swiper-item v-for="item in noticeList" :key="item._id">
					<navigator url="/pages/notice/noticedetail"> {{item.title}}</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="right">
			<uni-icons type="right" size="16" color="#333"></uni-icons>
		</view>
	</view>

	<!-- 每日精选区域 -->
	<view class="select">
		<common-title>
			<template #name>每日推荐</template>
			<template #custom>
				<view class="date">
					<uni-icons type="calendar" size="20" color="$uni-color-theme"></uni-icons>
					<view class="text">
						<uni-dateformat :date="Date.now()" format="dd号"></uni-dateformat>
					</view>
				</view>
			</template>
		</common-title>
		<view class="content">
			<scroll-view scroll-x>
				<view class="box" v-for="item in randomList" :key="item._id">
					<!-- <navigator url="/pages/preview/preview"></navigator> -->
					<image :src="item.smallPicurl" mode="aspectFill" @click="gotoPreview"></image>

				</view>
			</scroll-view>
		</view>


	</view>

	<view class="theme">
		<common-title>
			<template #name>专题精选</template>
			<template #custom>
				<navigator url="" class="more">More+</navigator>
			</template>
		</common-title>

		<view class="content">
			<theme-item v-for="item in classifyList" :key="item._id" :item="item">
				<!-- 专题精选组件 -->
			</theme-item>
			<theme-item :isMore="true"></theme-item>
		</view>

	</view>


</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		apiGetBanner,
		apigetDayRandom,
		apigetNotice,
		apigetClassify
	} from "@/api/apis.js"

	const bannerList = ref([])
	const randomList = ref([])
	const noticeList = ref([])
	const classifyList = ref([])

	// 网络请求获取轮播图
	const getBanner = async function() { // 异步声明此函数
		console.log("获取banner")
		let res = await apiGetBanner();

		bannerList.value = res.data;

	}
	getBanner()

	// 网络请求获取每日推荐
	const getDayRandom = async function() {
		let res = await apigetDayRandom();

		randomList.value = res.data


		// console.log("randomList.value",randomList.value)
	}
	getDayRandom()

	// 网络请求获取公告
	const getNotice = async function() { // 异步声明此函数
		let res = await apigetNotice({
			select: true
		})
		console.log("res!", res)

		noticeList.value = res.data

	}
	getNotice()

	// 网络请求获取分类
	const getClassify = async function() {
		let res = await apigetClassify({select:true});
		classifyList.value = res.data
	}
	getClassify()

	function gotoPreview() {
		uni.navigateTo({
			url: "/pages/preview/preview"
		})
	}

	function gotoNotice() {
		uni.navigateTo({
			url: "/pages/noticedetail/noticedetail"
		})
	}
</script>

<style lang="scss" scoped>
	.homeLayout {

		.banner {
			width: 750rpx;
			padding: 30rpx 0;

			swiper {
				width: 750rpx;
				height: 340rpx;

				swiper-item {
					width: 100%;
					height: 100%;
					padding: 0 30rpx;

					image {
						border-radius: 10rpx;
						width: 100%;
						height: 100%;
					}

					;
				}
			}
		}
	}

	.notice {
		width: 690rpx;
		height: 80rpx;
		background-color: #ebebeb;
		margin: 0 auto;
		display: flex;
		border-radius: 80rpx;
		line-height: 80rpx;

		.left {
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			:deep() {
				.uni-icons {
					color: $uni-color-theme !important;
				}
			}


			.text {
				color: $uni-color-theme;
				font-weight: 600;
				font-size: 28rpx;
			}
		}

		.right {
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.center {
			flex: 1;

			swiper {
				height: 100%; // 高度继承父级

				swiper-item {
					height: 100%;
					font-size: 30rpx;
					//  超出一定长度的内容,用...表示
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

		}
	}

	.select {
		padding-top: 50rpx;

		.date {
			color: $uni-color-theme;
			display: flex;
			align-items: center;

			.text {
				margin-left: 5rpx;
			}
		}

		.content {
			width: 720rpx;
			margin-top: 30rpx;
			margin-left: 30rpx;

			scroll-view {
				white-space: nowrap;

				.box {
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 30rpx;

					// border: 5px solid red;
					image {
						width: 200rpx;
						height: 430rpx;
						border-radius: 10rpx;
					}

					;
				}

				.box:last-child {
					margin-right: 40rpx;
				}
			}

		}
	}

	.theme {
		padding: 50rpx 0;

		.more {
			font-size: 32rpx;
			color: #888;
		}

		.content {
			margin-top: 30rpx;
			padding: 0 30;
			display: grid;
			gap: 15rpx; // 网格布局调整间距
			grid-template-columns: repeat(3, 1fr); //每一行展示三个，平均分配
			// grid-template-rows: repeat(3, 100px);
		}
	}

	// .pageBg{
	// 	background-color: pink;
	// }
</style>