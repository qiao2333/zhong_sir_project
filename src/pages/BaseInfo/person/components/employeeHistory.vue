<template>
	<div>
		<a-spin v-if="employeeHistory" />
		<div v-else>
			<a-card title="雇员简历信息">
				<a-button v-if="canUpdate" slot="extra" @click="showModal" >修改</a-button>
				<a-col :span="12">入职时间:{{employeeHistory.begin_time}}</a-col>
				<a-col :span="12">离职时间:{{employeeHistory.end_time}}</a-col>
				<a-col>简述:{{employeeHistory.descript}}</a-col>
			</a-card>
			<EmployeeHistoryModal v-if="canUpdate" @tip="tip" ref="employeeHistoryModal" />
		</div>
	</div>
</template>

<script>
	import EmployeeHistoryModal from '../applypage/EmployeeHistory'
	export default{
		components: {
			EmployeeHistoryModal
		},
		props: {
			UserId: {
				type: Object,
			},
			canUpdate:{
				type:Boolean,
			},
		},
		data() {
			return {
				employeeHistory:null,
			}
		},
		mounted(){
			this.fetch(this.UserId)
		},
		methods:{
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
				this.$refs.employeeHistoryModal.showModal(this.employeeHistory)
			},
			tip(data){
				this.$emit("tip",data)
			}
		}
	}
</script>

<style>
</style>
