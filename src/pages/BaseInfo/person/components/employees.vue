<template>
	<!-- 员工编号，当前所属学院，当前所在科室，
	雇员简历，主修专业，政治面貌，行政岗位，
	当前住址，通信地址，学历 -->
	<div>
		<a-card title="职员主要信息">
			<a-button slot="extra" >修改</a-button>
			<a-row>
				<a-col :span="8">员工编号:{{employees.empNo}}</a-col>
				<a-col :span="8">当前所属学院:{{employees.departmentId}}</a-col>
				<a-col :span="8">当前所在科室:{{employees.subdepartmentId}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">雇员简历:{{employees.employHistoryId}}</a-col>
				<a-col :span="8">主修专业:{{employees.disciplineId}}</a-col>
				<a-col :span="8">政治面貌:{{employees.politicalId}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">行政岗位:{{employees.positionId}}</a-col>
				<a-col :span="8">学历:未实现</a-col>
			</a-row>
		</a-card>
		<a-modal @cancel="handleCancel" :maskClosable="false" width="1000px" :footer="null" :visible="modal.visible">
		</a-modal>
	</div>

</template>

<script>
	export default{
		data() {
			return {
				modal:{
					visible: false
				}
			}
		},
		methods: {
			handleCancel() {
				
			},
			handleOk(){
				
			}
		},
	}
</script>

<style>
</style>
