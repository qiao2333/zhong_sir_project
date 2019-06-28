<template>
	<!-- 员工编号，当前所属学院，当前所在科室，
	雇员简历，主修专业，政治面貌，行政岗位，
	当前住址，通信地址，学历 -->
	<div>
		<div v-if="employees == null">
			职员信息获取失败
		</div>
		<div v-else>
			<a-card title="职员主要信息">
				<a-row>
					<a-card title="职员信息">
						<a-button v-if="canUpdate" slot="extra" @click="showModal" >修改</a-button>
						<a-row>
							<a-col :span="8">职员编号:{{employees.employee_no}}</a-col>
							<a-col :span="8">所属学院:{{employees.department.name}}</a-col>
							<a-col :span="8">所在科室:{{employees.subdepartment.name}}</a-col>
						</a-row>
						<a-row>
							<a-col :span="8">主修专业:{{employees.discipline.name}}</a-col>
							<a-col :span="8">政治面貌:{{employees.political.political}}</a-col>
						</a-row>
					</a-card>
				</a-row>
			</a-card>
			<EmployeeModal v-if="canUpdate" @tip="tip" ref="employeeModal" />
			<EmployeeHistory  @tip="tip" :UserId="UserId" :canUpdate="true" />
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
		filters: {
			politicals: function(value,lodash) {
				if(value){
					var obj = new Array();
					for (var i = 0; i< value.length; i++){
						obj.push(value[i].name)
					}
					return lodash.join(obj,'、')
				}
				return ''
			}
		},
		data() {
			return {
				employees:null,
				employeeBase:null,
			}
		},
		mounted(){
			this.fetch(this.UserId)
		},
		components: {
			EmployeeModal,
			EmployeeHistory
		},
		methods: {
			fetch(id){
				this.axios.get("/json/employee/getEmployeeInformation/" + id).then((res)=>{
					if (res.data.code == 0){
						this.employees = res.data.employee
						this.employeeBase = res.data.employeeBase
					}else{
						this.$emit("tip",{type:"error",text:"获取职员主信息失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
				
			},
			showModal(){
				this.$refs.employeeModal.showModal(this.employees,this.employeeBase)
			},
			tip(data){
				this.$emit("tip",data)
			},
		},
	}
</script>

<style>
</style>
