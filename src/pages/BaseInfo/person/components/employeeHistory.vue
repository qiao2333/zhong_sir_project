<template>
	<a-card title="雇员简历信息">
		<a-button slot="extra" >修改</a-button>
		<a-row>
			<a-col :span="8">员工编号:{{employees.id}}</a-col>
			<a-col :span="8">入职时间:{{employees.departmentId}}</a-col>
			<a-col :span="8">离职时间:{{employees.subdepartmentId}}</a-col>
		</a-row> 
		<a-row>
			<a-col :span="8">简述:{{employees.employHistoryId}}</a-col>
		</a-row>
	</a-card>
</template>

<script>
</script>

<style>
</style>
