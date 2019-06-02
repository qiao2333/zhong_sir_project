<template>
	<div>
		<routerView @tip="tip"></routerView>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tipTypes:{
					success:"成功",
					error:"错误",
					info:"消息",
					warning:"提示"
				}
			}
		},
		methods: {
			tip(data) {
				this.$notification[data.type]({
					message: this.tipTypes[data.type],
					description: data.text,
				});
			},
		}
	}
</script>


<style>
</style>
