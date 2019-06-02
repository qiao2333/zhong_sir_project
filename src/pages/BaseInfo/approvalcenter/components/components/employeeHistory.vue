<template>
	<div>
		<p>开始时间{{info.beginTime}}</p>
		<p>结束时间{{info.endTime}}</p>
		<p>详细{{info.descript}}</p>
	</div>
</template>

<script>
	export default{
		props: {
			info: {
				type: Object,
			},
		},
	}
</script>

<style>
</style>
