<template>
	<div>
		<p>开始时间:{{info.beginTime}}</p>
		<p>结束时间:{{info.EndTime}}</p>
		<p>国家:{{info.country}}</p>
		<p>城市:{{info.city}}</p>
		<p>学校:{{info.school}}</p>
		<p>教育程度:{{info.academic}}</p>
		<p>学历:{{info.degree}}</p>
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
