<template>
	<!-- 员工编号，当前所属学院，当前所在科室，
	雇员简历，主修专业，政治面貌，行政岗位，
	当前住址，通信地址，学历 -->
	<div>
		<a-card title="职员主要信息">
			<a-button slot="extra" >修改</a-button>
			<a-row>
				<a-col :span="8">主修专业:{{employees.disciplineId}}</a-col>
				<a-col :span="8">政治面貌:{{employees.politicalId}}</a-col>
				<a-col :span="8">行政岗位:{{employees.positionId}}</a-col>
			</a-row>
			<EmployeeHistory :employeeHistory="employees.employHistoryId"  />
		</a-card>
	</div>

</template>

<script>
	import EmployeeHistory from './employeeHistory'
	export default{
		data() {
			return {
				modal:{
					visible: false
				}
			}
		},
		components: {
			EmployeeHistory
		},
		methods: {
			tip(data){
				this.$emit("tip",data)
			},
		},
	}
</script>

<style>
</style>
