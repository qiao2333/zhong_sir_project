<template>
	<!-- 员工编号，当前所属学院，当前所在科室，
	雇员简历，主修专业，政治面貌，行政岗位，
	当前住址，通信地址，学历 -->
	<div>
		<a-spin v-if="employees == null" />
		<div v-else>
			<a-card title="职员主要信息">
				<a-row>
					<a-card title="职员信息">
						<a-button v-if="canUpdate" slot="extra" @click="showModal" >修改</a-button>
						<a-row>
							<a-col :span="8">职员编号:{{employees.emp_no}}</a-col>
							<a-col :span="8">所属学院:{{employees.department_id}}</a-col>
							<a-col :span="8">所在科室:{{employees.subdepartment_id}}</a-col>
						</a-row>
						<a-row>
							<a-col :span="8">主修专业:{{employees.disciplineId}}</a-col>
							<a-col :span="8">政治面貌:{{employees.politicalId}}</a-col>
							<a-col :span="8">行政岗位:{{employees.positionId}}</a-col>
						</a-row>
					</a-card>
				</a-row>
			</a-card>
			<EmployeeModal v-if="canUpdate" @tip="tip" ref="employeeModal" />
			<EmployeeHistory v-if="canUpdate" @tip="tip" :employeeHistory="employees.employHistoryId"  />
		</div>
		
	</div>

</template>

<script>
	import EmployeeModal from '../applypage/Employee'
	import EmployeeHistory from './employeeHistory'
	export default{
		props: {
			UserId:{
				type: Number,
				default:0
			},
			canUpdate: {
				type: Boolean,
			},
		},
		data() {
			return {
				employees:null,
			}
		},
		components: {
			EmployeeModal,
			EmployeeHistory
		},
		methods: {
			fetch(id){
				this.axios.get("/json/student/getStudentInformation/" + id).then((res)=>{
					if (res.data.code == 0){
						console.log(res.data)
						this.studentInfo = res.data.studentInfo
						this.student = res.data.student
					}else{
						this.$emit("tip",{type:"error",text:"获取学生主信息失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
				
			},
			showModal(){
				this.$refs.employeeModal.showModal(this.employees)
			},
			tip(data){
				this.$emit("tip",data)
			},
		},
	}
</script>

<style>
</style>
