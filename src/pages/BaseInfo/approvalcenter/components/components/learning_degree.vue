<template>
	<div>
		<p>开始时间{{info.beginTime}}</p>
		<p>结束时间{{info.endTime}}</p>
		<p>国家{{info.countryId}}</p>
		<p>城市{{info.cityId}}</p>
		<p>学校{{info.schoolId}}</p>
		<p>教育程度{{info.academicId}}</p>
		<p>学历{{info.degreeId}}</p>
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
