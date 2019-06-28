<template>
	<div class="content">
	<!-- 	用户类型： 0:游客（已注册，但身份未确认） 1:学生  2:教职员工 3:校外职员  
		4:学生亲属  5:系统运营者  6:学校信息主管 -->
		<div v-if="usertype == 0" style="height: 3000px;"  >
			<User @tip="tip"  :UserId="-1" :canUpdate="true"></User>
		</div>
		<div v-else-if="usertype == 1" style="height: 3000px;" >
			<Pictures @tip="tip"  :UserId="-1" :canUpdate="true"></Pictures>
			<User @tip="tip"  :UserId="-1" :canUpdate="false"></User>
			<Students @tip="tip"  :UserId="-1" :canUpdate="false"></Students>
			<Addresses @tip="tip" :UserId="-1" :canUpdate="false"></Addresses>
			<Relation @tip="tip" :usertype="usertype" :UserId="-1" :canUpdate="true"></Relation>
			<Ecomm @tip="tip" :UserId="-1" :canUpdate="true" ></Ecomm>
		</div>
		<div v-else-if="usertype ==2" style="height: 3000px;">
			<Pictures @tip="tip"  :UserId="-1" :canUpdate="true"></Pictures>
			<User @tip="tip"  :UserId="-1" :canUpdate="true"></User>
			<Employee @tip="tip" :UserId="-1" :canUpdate="true" ></Employee>
			<LearningDegree @tip="tip"  :UserId="-1" :canUpdate="true"/>
			<Ecomm @tip="tip" :UserId="-1" :canUpdate="true" ></Ecomm>
			<Addresses @tip="tip" :UserId="-1" :canUpdate="true" />
		</div>
		<div v-else-if="usertype ==6" style="height: 3000px;">
			<Pictures @tip="tip"  :UserId="-1" :canUpdate="true"></Pictures>
			<User @tip="tip"  :UserId="-1" :canUpdate="true"></User>
			<Employee @tip="tip" :UserId="-1" :canUpdate="true" ></Employee>
			<LearningDegree @tip="tip"  :UserId="-1" :canUpdate="true"/>
			<Ecomm @tip="tip" :UserId="-1" :canUpdate="true" ></Ecomm>
			<Addresses @tip="tip" :UserId="-1" :canUpdate="true" />
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
	import EmployeeHistory from './components/employeeHistory'
	export default{
		name:'Person',
		props: {
			usertype: {
				type: Number,
			},
		},
		components: {
			LearningDegree,
			Pictures,
			Students,
			User,
			Addresses,
			Employee,
			Relation,
			Ecomm,
			EmployeeHistory
		},
		data() {
			return {
			}
		},
		methods: {
			tip(data){
				this.$emit("tip",data)
			},
			getLoginInfo(){
				this.axios.get("/json/user/getLoginInfo").then((res)=>{
					console.log(res.data)
				}).catch((err)=>{
					console.log(err)
				})
			},
		},
		mounted() {
			console.log(this.usertype)
		},
		
	}
</script>

<style>
</style>
