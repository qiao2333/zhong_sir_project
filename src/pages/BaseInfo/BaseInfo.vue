<template>
	<div>
		<routerView @tip="tip"></routerView>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		mounted() {
			
		},
		methods: {
			tip(data) {
				this.$message[data.type](data.text);
			},
		}
	}
</script>


<style>
</style>
