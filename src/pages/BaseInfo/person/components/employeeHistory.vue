<template>
	<div>
		<div>
			<a-card title="雇员简历信息">
				<a-button v-if="canUpdate" slot="extra" @click="showModal" >修改</a-button>
				<a-col :span="12">入职时间:{{employeeHistory.BeginTime}}</a-col>
				<a-col :span="12">离职时间:{{employeeHistory.EndTime}}</a-col>
				<a-col>简述:{{employeeHistory.Discript}}</a-col>
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
				type: Number,
				default:-1,
			},
			canUpdate:{
				type:Boolean,
			},
		},
		data() {
			return {
				employeeHistory:null,
				employeeHistoryBase:null,
			}
		},
		mounted(){
			this.fetch(this.UserId)
		},
		methods:{
			fetch(id){
				this.axios.get("json/employeeHistory/getEmployeeHistoryInformation/" + id).then((res)=>{
					if (res.data.code == 0){
						this.employeeHistory = res.data.employeeHistory
						this.employeeHistoryBase = res.data.employeeHistoryBase
					}else{
						this.$emit("tip",{type:"error",text:"获取简历信息失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
				
			},
			showModal(){
				this.$refs.employeeHistoryModal.showModal(this.employeeHistoryBase)
			},
			tip(data){
				this.$emit("tip",data)
			}
		}
	}
</script>

<style>
</style>
