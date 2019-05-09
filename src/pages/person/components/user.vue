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
				<a-col :span="8">用户类型:{{userTypeToString(users.userType)}}</a-col>
			</a-row>
		</a-card>
	</div>
</template>

<script>
	export default{
		props: ['users'],
		data() {
			return {
				mydatas: {
					forms: [
					{
						key: 1,
						label: "性别",
						type: "radio",
						name: "userSex",
						rules:{rules: [{ required: true,message: '请选择你的性别!' }],initialValue:this.users.userSex},
						options:[
							{key:1,name:"不详",value:2},
							{key:2,name:"男",value:1},
							{key:3,name:"女",value:0},
						]
					},
					{
						key: 2,
						label: "出生日期",
						type: "date",
						name: "userBirthday",
						rules:{rules: [{ required: true, message: '请输入你的出生日期!' }],initialValue:this.formatDate(this.users.userBirthday)},
					},
				],
				title:"用户主信息修改申请"
				}
			}
		},
		methods: {
			userTypeToString(data) {
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
			},
			showModal(){
				console.log(this.mydatas)
				this.$emit('showModal',this.mydatas)
			},
			formatDate(data){
				var s = data.replace(/\//g,"-");
				return s
			}
		}
	}
</script>

<style>
</style>
