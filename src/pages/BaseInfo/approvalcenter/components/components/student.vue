<template>
	<div>
		<p>学号:{{info.student_no}}</p>
		<p>入学日期:{{info.begin_learn_date}}</p>
		<p>年级:{{info.grade}}</p>
		<p>主修专业:{{info.specialty}}</p>
		<p>班级:{{info.class}}</p>
		<p>政治面貌:{{info.political.political}}</p>
		<p>宿舍:{{info.live_room.name}}</p>
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
