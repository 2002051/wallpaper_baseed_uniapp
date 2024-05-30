<template>
	<!-- 预览页 -->
	<view class="preview">
		<swiper circular :current="currentIndex" @change="doChange">
			<swiper-item v-for="(item,index) in classList" :key="item._id">
				<image v-if="readImgs.includes(index)" @click="maskChange" :src="item.picurl" mode="aspec"></image>
			</swiper-item>

		</swiper>

		<view class="mask" v-if="maskState">
			<view class="goBack" :style="{top:getStatusBarHeight()+'px'}" @click="goBack">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>

			<view class="count">
				<!-- 3 / 9 -->
				{{currentIndex+1}}/{{classList.length}}
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
						{{currentInfo.score}}分
					</view>
				</view>
				<view class="box" @click="clickDownLoad">
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
							<text selectable>{{currentInfo._id}}</text>
						</view>
						<!-- 		<view class="row">
							<view class="label">
								壁纸分类：
							</view>
							<text selectable>{{currentInfo.tabs[1]}}</text>
						</view> -->
						<view class="row">
							<view class="label">
								发布者：
							</view>
							<text selectable>{{currentInfo.nickname}}</text>
						</view>
						<view class="row">
							<view class="label">
								评分：
							</view>
							<uni-rate v-model="currentInfo.score" touchable readonly />
							<text selectable>
								{{currentInfo.score}}分
							</text>
						</view>
						<view class="row">
							<view class="label">
								描述：
							</view>
							<text selectable>
								{{currentInfo.description}}
							</text>
						</view>

						<view class="row">
							<view class="label">
								标签：
							</view>
							<view class="value tabs">
								<view class="tab" v-for="tab in currentInfo.tabs">
									{{tab}}
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
						{{isScore?"已评分...":"壁纸评分"}}
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
					<button v-if="!isScore" @click="submitScore" type="default" size="mini" plain
						:disabled="!userScore">确认评分</button>
				</view>

			</view>



		</uni-popup>

	</view>


</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		getStatusBarHeight
	} from '@/utils/system.js'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		apiSetupScore
	} from "@/api/apis.js"

	const maskState = ref(true);
	const value = ref(4.5)
	const infoPopup = ref(null);
	const scorePopup = ref(null)
	const userScore = ref(0)
	const classList = ref([])
	const currentId = ref(null)
	const currentIndex = ref(0)
	const storgClassList = uni.getStorageSync("storgClassList") || [];
	const readImgs = ref([]);
	const currentInfo = ref(null)
	const isScore = ref(false)

	// 将缓存的数组中的图片链接处理成高清图片的链接
	classList.value = storgClassList.map(x => {
		return {
			...x,
			picurl: x.smallPicurl.replace("_small.webp", ".jpg")

		}
	})
	console.log("storgClassList", classList.value)


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
		if (currentInfo.value.userScore) {
			isScore.value = true
			userScore.value = currentInfo.value.userScore
		}

		scorePopup.value.open()
	}

	function clickscoreClose() {
		scorePopup.value.close()
		isScore.value = false
		userScore.value = 0

	}


	// 提价评分
	async function submitScore() {
		uni.showLoading({
			title: "提交评分中..."
		})
		let {
			classid,
			_id: wallId
		} = currentInfo.value

		let res = await apiSetupScore({
			classid: classid,
			wallId: wallId,
			userScore: userScore.value
		})
		if (res.errCode === 0) {
			uni.showToast({
				title: "评分成功",
			})
			uni.hideLoading()
			classList.value[currentIndex.value].userScore = userScore.value
			// 将用户评分的结果跟新到缓存中
			uni.setStorageSync("storgClassList", classList.value)
			userScore.value = 0;
			scorePopup.value.close()

		}


	}

	function goBack() {
		uni.navigateBack()
	}
	onLoad(function(e) {
		currentId.value = e.id
		let index = classList.value.findIndex((item) => {
			return item._id == currentId.value
		})
		// console.log("index", index)
		currentIndex.value = index
		currentInfo.value = classList.value[currentIndex.value] // 将当前展示的索引值对应的对象赋值给currentInfo
		readImgs.value.push(
			index <= 0 ? classList.value.length - 1 : index - 1,
			index,
			index >= classList.value.length - 1 ? 0 : index + 1
		)

	})

	function doChange(e) {

		currentIndex.value = e.detail.current
		console.log("e.detail.current", e.detail.current, classList.length - 1)
		currentInfo.value = classList.value[currentIndex.value]
		readImgs.value.push(
			e.detail.current <= 0 ? classList.value.length - 1 : e.detail.current - 1,
			e.detail.current,
			e.detail.current >= classList.value.length - 1 ? 0 : e.detail.current + 1
		)
		// console.log("readImgs.value", readImgs.value)
	}

	// 点击下载
	function clickDownLoad() {

		//#ifdef H5
		uni.showModal({
			content: "长按以保存壁纸",
			showCancel: false
		})
		// #endif
		//#ifndef H5
		uni.getImageInfo({
			src: currentInfo.value.picurl,
			success: (res) => {
				uni.showLoading({
					title:"下载中",
					mask:true
				})
				uni.saveImageToPhotosAlbum({
					filePath: res.path,
					success: x => {
						console.log("x!!!!!!", x)

					},
					fail: (err) => {
						console.log(err)
						if (err.errMsg === "saveImageToPhotosAlbum:fail cancel") {
							uni.showToast({
								title: "保存失败，请点击重新下载",
								icon: "none",
							})
							return;
						}
						uni.showModal({
							title: "提示",
							content: "需要授权保存相册",
							success: (res) => {
								if (res.confirm) {
									// console.log("确认授权了")
									uni.openSetting({
										success: (setting) => {
											console.log(setting)
											if (setting.authSetting[
													'scope.writePhotosAlbum'
													]) {
												uni.showToast({
													title: "授权成功",
													icon: "none"
												})
											} else {
												uni.showToast({
													title: "获取授权失败",
													icon: "none"
												})
											}
										}
									})
								}
							}
						})
					},
					complete() {
						uni.hideLoading()
					}

				})
			}

		})

		//#endif


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
				display: flex;
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
							white-space: nowrap;
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