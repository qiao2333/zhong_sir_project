<template>
	<div class="schoolmessage">
		<a-row :gutter="64">
			<a-col :span="6">学号：{{ message.stu_no }}</a-col>
			<a-col :span="6">姓名：{{ message.user_name }}</a-col>
			<a-col :span="6">入学日期：{{ message.begin_learn_date }}</a-col>
		</a-row>
		<a-row :gutter="64">
			<a-col :span="6">年级：{{ message.grade }}</a-col>
			<a-col :span="6">宿舍：{{ message.live_room }}</a-col>
		</a-row>
		<a-row :gutter="64">
			<a-col :span="6">性别：{{ message.user_sex }}</a-col>
			<a-col :span="6">所在校区：{{ message.university_id }}</a-col>
			<a-col :span="6">主修专业：{{ message.major_id }}</a-col>
		</a-row>
		<a-row :gutter="64">
			<a-col :span="6">邮箱：{{ message.mail_address }}</a-col>
			<a-col :span="6">用户类型：{{ message.user_type }}</a-col>
			<a-col :span="6">找回密码凭依：{{ message.name }}</a-col>
		</a-row>
		<button type="button" @click="update">更新</button>
	</div>
</template>

<script>
	export default{
		beforeCreate(){
			this.$axios.post('/user/login').then((res)=>{
				res = res.data
				const data = res.data
				this.message = data
			})
			.catch((error)=>{
				alert('error:' + error)
			})
		},
		data() {
			return {
				 message : {
					stu_no: "qiao",
					user_name: "qiao",
					begin_learn_date: "qiao",
					class_id: "qiao",
					grade: "qiao",
					live_room: "qiao",
					user_sex: "qiao",
					university_id: "qiao",
					major_id: "qiao",
					mail_address:"qiao",
					user_type:"qiao",
					name:"qiao"
				}
				
				
			}
		},
		methods: {
			update(){
				this.$axios.post('/user/login').then((res)=>{
					res = res.data
					const data = res.data
					this.message = data
				})
				.catch((error)=>{
					alert('error:' + error)
				})
			}
		},
	}
	
</script>

<style>
</style>
