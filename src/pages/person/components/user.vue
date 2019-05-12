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
				<a-col :span="8">用户类型:{{userTypeToString}}</a-col>
			</a-row>
		</a-card>
		<a-modal width="1000px" @ok="handleOk" @cancel="handleCancel" :visible="visible">
			<User_info ref="user_info" v-if="visible" :oldvalue="oldvalue"></User_info>
		</a-modal>
	</div>
</template>

<script>
	import User_info from "@/pages/applypage/User-info"
	export default{
		props: ['users'],
		data() {
			return {
				visible:false,
				oldvalue:null,
			}
		},
		components: {
			User_info
		},
		methods: {
			showModal(){
				this.oldvalue = this.users
				this.visible = true
			},
			formatDate(data){
				var s = data.replace(/\//g,"-");
				return s
			},
			handleCancel(){
				this.visible = false
			},
			handleOk(){
				console.log(this.$refs.user_info.myform.getFieldsValue())
				this.visible = false
			}
		},
		computed: {
			userTypeToString() {
				var data = this.users.userType
				var s = ''
				switch(data){
					case 0:s = '游客';break;
					case 1:s = '学生';break;
					case 2:s = '教职员工';break;
					case 3:s = '校外职员';break;
					case 4:s = '学生亲属';break;
					case 5:s = '系统运营者';break;
					case 6:s = '学校信息主管';break;
				}
				return s
			}
		},
	}
</script>

<style>
</style>
