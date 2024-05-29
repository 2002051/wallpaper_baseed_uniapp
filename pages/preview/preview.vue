<template>
	<!-- 预览页 -->
	<view class="preview">
		<swiper circular>
			<swiper-item v-for="item in 5">
				<image @click="maskChange" src="../../common/images/classify2.jpg" mode="aspec"></image>
			</swiper-item>

		</swiper>

		<view class="mask" v-if="maskState">
			<view class="goBack" :style="{top:getStatusBarHeight()+'px'}" @click="goBack">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>

			<view class="count">
				3 / 9
			</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>


			<view class="date">
				<uni-dateformat :date="new Date()" format="MM日dd月"></uni-dateformat>
			</view>

			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="23"></uni-icons>
					<view class="text">
						信息
					</view>
				</view>
				<view class="box" @click="clickscorePopup">
					<uni-icons type="star" size="23"></uni-icons>
					<view class="text">
						分数
					</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">
						下载
					</view>
				</view>
			</view>
		</view>


		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view class="">

					</view>
					<view class="title">
						壁纸信息
					</view>
					<view class="close" @click="clickInfoClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y="true">
					<view class="content">
						<view class="row">
							<view class="label">
								壁纸ID:
							</view>
							<text selectable>999900019209910</text>
						</view>
						<view class="row">
							<view class="label">
								壁纸分类：
							</view>
							<text selectable>美女壁纸</text>
						</view>
						<view class="row">
							<view class="label">
								发布者：
							</view>
							<text selectable>余天王</text>
						</view>
						<view class="row">
							<view class="label">
								评分：
							</view>
							<uni-rate v-model="value" touchable readonly />
							<text selectable>
								5分
							</text>
						</view>
						<view class="row">
							<view class="label">
								标签：
							</view>
							<view class="value tabs">
								<view class="tab" v-for="item in 3">
									标签名
								</view>
							</view>


						</view>

						<view class="copyright">
							声明：本图片来自用户投稿，非商业使用，用于免费学习交流，如果侵权，可以拷贝被指ID举报到平台，管理将删除对应壁纸，维护您的权益
						</view>
					</view>



				</scroll-view>



			</view>
		</uni-popup>

		<!-- 评分弹窗 -->
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view class="title">
						壁纸评分
					</view>
					<view class="close" @click="clickscoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate v-model="userScore" @change="onchange" allow-half />
					<text class="text">{{userScore}}分</text>
				</view>

				<view class="footer">
					<button @click="submitScore" type="default" size="mini" plain :disabled="!userScore">确认评分</button>
				</view>

			</view>



		</uni-popup>

	</view>


</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {getStatusBarHeight} from '@/utils/system.js'
	const maskState = ref(true);
	const value = ref(4.5)
	const infoPopup = ref(null);
	const scorePopup = ref(null)
	const userScore = ref(0)
	
	// 点击info弹窗
	function clickInfo() {
		infoPopup.value.open();
	}

	function maskChange() {
		maskState.value = !maskState.value
	}

	function clickInfoClose() {
		infoPopup.value.close();
	}

	// 评分弹窗
	function clickscorePopup() {
		scorePopup.value.open()
	}

	function clickscoreClose() {
		scorePopup.value.close()
	}

	function submitScore() {
		console.log("评分了，评了：", userScore.value)
	}
	
	function goBack(){
		uni.navigateBack()
	}
	
</script>

<style lang="scss">
	.preview {
		width: 100%;
		height: 100vh; // 表示 高度占据	全屏

		swiper {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			&>view {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				width: fit-content; // 内部元素有多宽，自己就跟fff着拓展宽度
			}

			.goBack {
				width: 38px;
				height: 38px;
				background: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				margin-left: 0;
				border-radius: 100px;
				top: 0;
				backdrop-filter: blur(10rpx);
				border: 1px solid rgba(255, 255, 255, 0.3);
				display:flex;
				justify-content: center;
				align-items: center;
			}

			.count {

				top: 10vh;

				background-color: rgba(0, 0, 0, 0.3);
				font-size: 28rpx;
				color: #fff;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);

			}

			.time {
				top: calc(10vh + 80rpx);

				font-size: 28rpx;
				color: #ffffff;
				font-weight: 100;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				font-size: 140rpx;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);


			}

			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
				color: wheat;
			}

			.footer {
				background: rgba(255, 255, 255, 0.8);
				bottom: 10vh;
				width: 64vw;
				height: 120rpx;
				border-radius: 60rpx;
				color: #000;
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(10rpx);

				.box {
					display: flex;
					flex-direction: column;
					align-content: center;
					justify-content: center;
					padding: 2rpx 12rpx;

					.text {
						color: $text-font-color-2;
					}
				}
			}

		}

		.infoPopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;

			.popHeader {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					color: $text-font-color-2;
					font-size: 26rpx;
				}

				.close {
					padding: 5rpx;
					// border: 1px solid red;
				}
			}

			scroll-view {
				max-height: 60vh;

				.content {
					.row {
						display: flex;
						padding: 16rpx;
						font-size: 32rpx;
						line-height: 1.7em;

						.label {
							color: $text-font-color-3;
							text-align: right;
							font-size: 30rpx;
						}

						.value {
							flex: 1;
							width: 0;
						}

						.roteBox {
							display: flex;
							align-items: center;

							.score {
								font-size: 26rpx;
								color: $text-font-color-2;
								// padding-left: 10rpx;
							}
						}

						.tabs {
							display: flex;
							flex-wrap: wrap;

							.tab {
								border: 1px solid $uni-color-theme;
								color: $uni-color-theme;
								font-size: 22rpx;
								padding: 10rpx 30rpx;
								border-radius: 40rpx;
								line: height 1em;
								margin: 0 10rpx 10rpx 0;
							}
						}
					}
				}
			}
		}

		.scorePopup {
			background-color: #fff;
			padding: 30rpx;
			width: 70vw;
			border-radius: 30rpx;

			.popHeader {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					color: $text-font-color-2;
					font-size: 26rpx;
				}

				.close {
					padding: 5rpx;
					// border: 1px solid red;
				}
			}

			.content {
				padding: 30rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					color: #ffca3e;
					padding-left: 10rpx;
					width: 80rpx;
					line-height: 1em;
					text-align: right;
				}
			}

			.footer {
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.copyright {
		font-size: 28rpx;
		padding: 20rpx;
		background: #f6f6f6;
		border-radius: 10rpx;
		margin: 20rpx 0;
		line-height: 1.6em;
		color: #666;
	}
</style>