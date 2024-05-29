<template>
	<!-- 公告详情 -->
	<view class="noticelayout"> 
		<view class="title">
			<view class="tag">
				<uni-tag :inverted="true" text="置顶" type="error" />	这个区域填写标题
			</view>
	<!-- 		<view class="uniui-font">
			
			</view> -->
			<view class="info">
				<view class="item">
					ytw
				</view>
				<view class="item">
					<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
				</view>
			</view>

			<view class="content">
				内容区域
			</view>

		</view>
	</view>

</template>

<script setup>

</script>

<style lang="scss" scoped>
.noticelayout{
	padding: 50rpx;
}
</style>