<template>
	<div>
		<a-card title="用户主信息表">
			<a-button slot="extra" @click="showModal" >修改</a-button>
			<a-row>
				<a-col :span="8">用户名:{{users.userName}}</a-col>
				<a-col :span="8">身份证:{{users.identification}}</a-col>
				<a-col :span="8">性别:{{users.userSex == '0' ? '女': (users.userSex == '1'? '男':'不详') }}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">出生日期:{{users.userBirthday}}</a-col>
				<a-col :span="8">注册时间:{{users.regist}}</a-col>
				<a-col :span="8">学校:{{users.universityId}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">用户类型:{{userTypes[users.userType]}}</a-col>
			</a-row>
		</a-card>
		<a-modal @cancel="handleCancel" :maskClosable="false" width="1000px" :footer="null" :visible="modal.visible">
			<UserInfo @submit="handleOk" @close="handleCancel" ref="UserInfo" v-if="modal.visible" :oldvalue="oldvalue"></UserInfo>
		</a-modal>
	</div>
</template>

<script>
	import UserInfo from "@/pages/Baseinfo/person/applypage/User-info"
	export default{
		props: ['users'],
		data() {
			return {
				modal:{
					visible:false,
				},
				userTypes:[
					'游客',
					'学生',
					'教职员工',
					'校外职员',
					'学生亲属',
					'系统运营者',
					'学校信息主管',
				],
				oldvalue:null,
			}
		},
		components: {
			UserInfo
		},
		methods: {
			showModal(){
				this.oldvalue = this.users
				this.modal.visible = true
			},
			formatDate(data){
				var s = data.replace(/\//g,"-");
				return s
			},
			handleCancel(){
				this.modal.visible = false
			},
			handleOk(data){
				console.log(data)
				this.modal.visible = false
			}
		},
		computed: {
		},
	}
</script>

<style>
</style>
