<template>
	<div v-if="hasload" style="height: 1000px; background-color: white;">
		<a-card title="用户主信息表">
			<a-button slot="extra" @click="showModal('用户主信息修改申请',1)" >修改</a-button>
			<a-row>
				<a-col :span="8">用户名:{{user.user_name}}</a-col>
				<a-col :span="8">身份证:{{ user.identification}}</a-col>
				<a-col :span="8">性别:{{user.user_sex}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">出生日期:{{user.user_birthday}}</a-col>
				<a-col :span="8">注册时间:{{user.regist}}</a-col>
				<a-col :span="8">学校:{{user.university_id}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">用户类型:{{user.user_type}}</a-col>
				<a-col :span="8">用户验证方式:{{user.name}}</a-col>
			</a-row>
		</a-card>
		<a-card title="学生主要信息">
			<a-button slot="extra" @click="showModal('学生主要信息修改申请',2)">修改</a-button>
			<a-row>
				<a-col :span="8">学号:{{student.stu_no}}</a-col>
				<a-col :span="8">年级:{{ student.grade}}</a-col>
				<a-col :span="8">班级:{{student.class_id}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">主修专业:{{student.major_id}}</a-col>
				<a-col :span="8">政治面貌:{{student.political_id}}</a-col>
				<a-col :span="8">宿舍:{{student.live_room}}</a-col>
			</a-row>
		</a-card>
		<a-card title="学生通信信息">
			<a-button slot="extra" @click="showModal('学生通信信息修改',3)">修改</a-button>
			居住地址:
			<p>{{address.home_address}}</p>
			通信方式:
			<p>{{address.mail_address}}</p>
		</a-card>
		<a-card title="学生亲属信息" :loading="loading">
			<a-button slot="extra" @click="showModal('学生亲属信息修改',4)">修改</a-button>
			<div v-for="family in student_relation" :key="family.id">
				关系：{{family.relationship}}
				亲属名称：{{family.rela_name}}
			</div>
		</a-card>
		<Modal v-if="modal_visible" :visible="modal_visible" :forms="forms" :title="modal_title" @ok="modalok" @cancel="modalclose"></Modal>
	</div>
</template>

<script>
	import Modal from './modal'
	import Form from '@/pages/components/autoCreateForm/forms/Form'
	export default {
		data() {
			return {
				modal_visible:false,
				modal_title:'',
				hasload: false,
				loading: true,
				myform: null,
				forms: [],
				userInfo:{}
			}
		},
		methods: {
			showModal(val,choice) {
				this.modal_title = val
				switch(choice){	
					case 1:this.forms = Form.data().forms1;break;
					case 2:this.forms = Form.data().forms2;break;
				}
				
				this.modal_visible = true
			},
			modalclose(){
				this.modal_visible = false
			},
			modalok(){
				
				this.modal_visible = false
			}
		},
		mounted() {
			this.$axios.post('/person/student').then((res) => {
				const user_info = res.data
				this.hasload = true
				this.loading = false
			}).catch((err) => {
				console.log(err)
			})
		},
		components: {
			Modal
		},
	
	}
</script>

<style>
</style>
