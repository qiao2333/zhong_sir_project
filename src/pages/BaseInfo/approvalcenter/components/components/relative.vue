<template>
	<div>
		<p>亲属姓名{{info.relaName}}</p>
		<p>亲属关系{{relations[info.relationship]}}</p>
	</div>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
			},
		},
		data() {
			return {
				relations: [
					"母", "父", "兄", "弟", "姐", "妹", "其他"
				]
			}
		},
	}
</script>

<style>
</style>
