<template>
	<div>
		<p>学号:{{info.stuNo}}</p>
		<p>入学日期:{{info.beginLearnDate}}</p>
		<p>年级:{{info.grade}}</p>
		<p>主修专业:{{info.specialtyId}}</p>
		<p>班级:{{info.classId}}</p>
		<p>政治面貌:{{info.politicalId}}</p>
		<p>宿舍:{{info.liveRoom}}</p>
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
