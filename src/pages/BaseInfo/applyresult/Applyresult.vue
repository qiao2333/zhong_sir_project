<template>
	<div class="content">
		<Apply @tip="tip"></Apply>
	</div>
</template>



<script>
	import Apply from './components/apply'
	export default{
		components: {
			Apply
		},
		methods: {
			tip(data) {
				this.$emit("tip",data)
			}
		},
	}
</script>

<style>
</style>