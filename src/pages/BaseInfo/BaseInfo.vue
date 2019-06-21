<template>
	<div>
		<keep-alive :exclude="/UnKeep$/">
			<routerView :usertype="usertype" @tip="tip"></routerView>
		</keep-alive>
	</div>
</template>

<script>
	export default {
		props: {
			usertype: {
				type: Number,
			},
		},
		data() {
			return {
				
			}
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
