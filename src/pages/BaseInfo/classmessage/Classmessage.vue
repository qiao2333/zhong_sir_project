<template>
	<!-- 	用户类型： 0:游客（已注册，但身份未确认） 1:学生  2:教职员工 3:校外职员  
		4:学生亲属  5:系统运营者  6:学校信息主管 -->
	<div class="content">
		<Classic_college />
		<!-- <test /> -->
		<!-- <Student /> -->
		<!-- <Classic /> -->
		<!-- <Classic_teacher /> -->
		<!-- <Teacher /> -->
		<!-- <div v-if="Usertype == 1">
			<Classic />
		</div>
		<div v-else-if="Usertype == 2">
			<Classic_teacher />
		</div> -->
	</div>
</template>

<script>
	import test from './components/test'
	import Student from './components/student'
	import Teacher from './components/Teacher'
	import Classic from './components/classic'
	import Classic_teacher from './components/classic_teacher'
	import Classic_headmaster from './components/classic_headmaster'
	import Classic_college from './components/classic_college'
	import Classic_leader from './components/classic_leader'
	export default {
		name:'Classmessage',
		components: {
			Teacher,
			Classic,
			Classic_teacher,
			Classic_headmaster,
			Classic_college,
			Classic_leader,
			Student,
			test
		},
		mounted(){
			this.fetch()
		},
		methods: {
			fetch() {
				// this.axios.get("/json/user/getEmployeePositions").then((res)=>{
				// 	console.log(res.data);
				// }).catch((err)=>{
				// 	console.log(err);
				// })
			}
		},
		props: {
			usertype: {
				type: Number,
			},
		},
	}
</script>

<style>
</style>
