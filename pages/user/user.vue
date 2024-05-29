<template>
	<view class="userLayout pageBg">
		<view class="userInfo">
			<view class="fill" :style="{height:getnavBarHeight()+'px'}">
			
			
			</view>
			<view class="avator">
				<!-- 头像区域 -->
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>

			<view class="ip">
				100.100.222.222
			</view>

			<view class="address">
				来自于：浙江
			</view>
		</view>


		<view class="section">
			<view class="list">
				<navigator url="/pages/classify/classify" open-type="reLaunch">
					<view class="row">
						<view class="left">
							<uni-icons type="download-filled" size="20"></uni-icons>
							<view class="text">我的下载</view>
						</view>

						<view class="right">
							<view class="text">33</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>


					</view>
				</navigator>
				
				<navigator url="/pages/classify/classify" open-type="reLaunch">
					<view class="row">
						<view class="left">
							<uni-icons type="star-filled" size="20"></uni-icons>
							<view class="text">我的收藏</view>
						</view>

						<view class="right">
							<view class="text">33</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>

					</view>

				</navigator>
				
				<view class="row">
					<view class="left">
						<uni-icons type="phone-filled" size="20"></uni-icons>
						<view class="text">联系客服</view>
					</view>


					<!-- #ifdef MP -->
					<!-- 小程序的时候才展示联系客服 -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->


					<!-- #ifndef MP -->
					<!-- 环境不是小程序端的时候就会执行下面的编译内容 -->
					<button @click="clickcontent">拨打电话</button>
					<!-- #endif -->

					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>

				</view>
			</view>
		</view>
		<view class="section">
			<view class="list">
				<view class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="20"></uni-icons>
					</view>

				</view>
				<view class="row">
					<view class="left">
						<uni-icons type="help-filled" size="20"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="20"></uni-icons>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {getStatusBarHeight,getTitleBarHeight,getnavBarHeight,getLeftIcon} from "@/utils/system.js"
	
	function clickcontent() {
		// 调用拨打电话api
		uni.makePhoneCall({
			phoneNumber: "17879765153"
		})
	}
</script>

<style lang="scss">
	.userLayout {
		.userInfo {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50rpx 0;

			.avator {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.ip {
				font-size: 44rpx;
				color: #333;
				padding: 20rpx 0 5rpx;
			}

			.address {
				font-size: 28rpx;
				color: #aaa;

			}
		}
	}

	.section {
		// 这里有一种居中的思路 ，就是设置盒子宽度比整个设备宽度小多少，然后在指定外边距auto就可以实现在某个方向的左右均匀分配居中
		width: 690rpx;
		margin: 50rpx auto;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.06);

		.list {
			.row {
				display: flex;
				justify-content: space-between;
				padding: 0 30rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				position: relative;
				background-color: white;

				&:last-child {
					border-bottom: 0;
				}

				.left {
					display: flex;
					align-items: center;
					justify-content: center;

					.text {
						padding-left: 20rpx;
						color: #666;
					}
				}

				.right {
					display: flex;
					align-items: center;
					justify-content: center;

					.text {
						padding-left: 28rpx;
						color: #aaa;
					}
				}

				button {
					position: absolute;
					top: 0;
					left: 0;
					height: 100rpx;
					width: 100%;
					opacity: 0;
				}
			}

		}


	}

	// .pageBg {
	// 	background:
	// 		linear-gradient(to bottom, transparent, #fff 400rpx),
	// 		linear-gradient(to right, #beecd8 20%, #F4E2D8);
	// 	min-height: 80vh;
	// }
	@import "../../common/style/common-style.css";
</style>