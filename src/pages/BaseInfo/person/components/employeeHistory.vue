<template>
	<div>
		<a-card title="雇员简历信息">
			<a-button slot="extra" @click="showModal" >修改</a-button>
			<a-col :span="8">入职时间:{{employeeHistory.begin_time}}</a-col>
			<a-col :span="8">离职时间:{{employeeHistory.end_time}}</a-col>
			<a-col>简述:{{employeeHistory.descript}}</a-col>
		</a-card>
		<EmployeeHistoryModal @tip="tip" ref="employeeHistoryModal" />
	</div>
</template>

<script>
	import EmployeeHistoryModal from '../applypage/EmployeeHistory'
	export default{
		components: {
			EmployeeHistoryModal
		},
		props: {
			employeeHistory: {
				type: Object,
			},
		},
		data() {
			return {
			}
		},
		methods:{
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
