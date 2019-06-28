<template>
	<div>
		<p>员工编号:{{info.employee_no}}</p>
		<p>所属学院:{{info.department}}</p>
		<p>所在科室:{{info.subdepartment}}</p>
		<p>主修专业:{{info.discipline}}</p>
		<p>政治面貌:{{info.political.political}}</p>
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
