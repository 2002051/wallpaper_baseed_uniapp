<!-- 类别详情 -->
<template>
	<view class="classlist">
		<view class="loadingLayout">
			<uni-load-more status="loading" v-if="!classifyList.length && !noData"></uni-load-more>
		</view>

		<view class="content">

			<navigator :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for="item in classifyList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>

		</view>
	</view>
</template>

<script setup>
	import {

		ref,

	} from 'vue';
	import {
		onLoad,
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		apigetClassifyList
	} from "@/api/apis.js"

	const classifyList = ref([])
	const classId = ref("")
	const pageNum = ref(1)
	const noData = ref(false)
	// 网络请求获取分类
	const getClassifyList = async function(page = 1) {
		uni.showLoading({
			title: "加载中..."
		})
		let res = await apigetClassifyList({
			classid: !!classId.value ? classId.value : "65237031189f860b7613acf4",
			pageNum: page
		});
		if (res.data.length === 0) {
			noData.value = true
			console.log("最后一次加载")
		}
		classifyList.value = [...classifyList.value, ...res.data]
		uni.setStorageSync("storgClassList",classifyList.value);
		uni.hideLoading()
	}

	// onload(e){
	// 	console.log(e)
	// }

	onLoad(function(e) {
		classId.value = e["id"]
		// console.log("classId.value",classId.value)  //65237031189f860b7613acf4
		getClassifyList()
		uni.setNavigationBarTitle({
			title: e["name"]
		})
	})
	onReachBottom(function(e) {
		if (noData.value) return;


		console.log("触底", e)
		pageNum.value += 1
		getClassifyList(pageNum.value)




	})
</script>

<style lang="scss">
	.classlist {
		.content {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 5rpx;

			.item {
				height: 440rpx;

				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>