<template>
	<div>
		<p>具体内容{{info.content}}</p>
		<p>通信方式{{flags[info.flag]}}</p>
	</div>
</template>

<script>
	export default{
		props: {
			info: {
				type: Object,
			},
		},
		data() {
			return {
				flags: [
					"QQ号","微信号","电子邮箱","移动电话","办公室号码","家庭电话"
				],
			}
		},
	}
</script>

<style>
</style>
