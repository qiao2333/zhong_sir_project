<template>
	<div>
		<p>亲属姓名:{{info.relationName}}</p>
		<p>亲属关系:{{info.relationType}}</p>
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
			}
		},
	}
</script>

<style>
</style>
