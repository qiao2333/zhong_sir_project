<template>
	<div>
		<p>员工编号{{info.empNo}}</p>
		<p>所属学院{{info.departmentId}}</p>
		<p>所在科室{{info.subdepartmentId}}</p>
		<p>主修专业{{info.disciplineId}}</p>
		<p>政治面貌{{info.politicalId}}</p>
		<p>行政岗位{{info.positionId}}</p>
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
