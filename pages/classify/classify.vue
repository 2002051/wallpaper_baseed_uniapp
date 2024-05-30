<template>
	<view class="classlayout">
		<custom-nav-bar title='分类'></custom-nav-bar>
		<view class="classify">

			<theme-item v-for="item in classifyList" :item="item" :key="item._id"></theme-item>

		</view>

	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	import {
		apigetClassify
	} from "@/api/apis.js"

	const classifyList = ref([])

	// 网络请求获取分类
	const getClassify = async function() {
		let res = await apigetClassify({
			// select: true,
			pageSize:15
		});
		classifyList.value = res.data
		console.log("classifyList.value", classifyList.value)

	}
	getClassify()
</script>

<style lang="scss">
	.classify {
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;
	}
</style>