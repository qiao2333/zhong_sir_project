<template>
	<div class="content">
	<!-- 	用户类型： 0:游客（已注册，但身份未确认） 1:学生  2:教职员工 3:校外职员  
		4:学生亲属  5:系统运营者  6:学校信息主管 -->
		<div v-if="UserType == 0" style="height: 2000px;"  >
			<User @tip="tip"  :UserId="UserId" :canUpdate="true"></User>
		</div>
		<div v-else-if="UserType == 1" style="height: 2000px;" >
			<Pictures @tip="tip"  :UserId="UserId" :canUpdate="true"></Pictures>
			<User @tip="tip"  :UserId="UserId" :canUpdate="true"></User>
			<Students @tip="tip"  :UserId="UserId" :canUpdate="true"></Students>
			<LearningDegree @tip="tip"  :UserId="UserId" :canUpdate="true"/>
			<Addresses @tip="tip" :UserId="UserId" :canUpdate="true"></Addresses>
			<Relation @tip="tip" :UserId="UserId" :canUpdate="true"></Relation>
			<Ecomm @tip="tip" :UserId="UserId" :canUpdate="true" ></Ecomm>
		</div>
		<div v-else-if="UserType ==2" style="height: 2000px;">
			<Pictures @tip="tip"  :UserId="UserId" :canUpdate="true"></Pictures>
			<User @tip="tip"  :UserId="UserId" :canUpdate="true"></User>
			<Employee @tip="tip" :UserId="UserId" :canUpdate="true" ></Employee>
			<LearningDegree @tip="tip"  :UserId="UserId" :canUpdate="true"/>
			<Ecomm @tip="tip" :UserId="UserId" :canUpdate="true" ></Ecomm>
		</div>
	</div>
</template>

<script>
	import LearningDegree from './components/learningDegree'
	import Pictures from './components/pictures'
	import User from './components/user'
	import Students from './components/students'
	import Addresses from './components/addresses'
	import Employee from './components/employees'
	import Relation from './components/relation'
	import Ecomm from './components/ecomms'
	export default{
		components: {
			LearningDegree,
			Pictures,
			Students,
			User,
			Addresses,
			Employee,
			Relation,
			Ecomm
		},
		data() {
			return {
				UserType:1,
				UserId:101,
			}
		},
		methods: {
			tip(data){
				this.$emit("tip",data)
			},
			getLoginInfo(){
				this.axios.get("json/user/getLoginInfo").then((res)=>{
					console.log(res.data)
				}).catch((err)=>{
					console.log(err)
				})
			},
		},
		mounted() {
			this.getLoginInfo()
		},
		
	}
</script>

<style>
</style>
