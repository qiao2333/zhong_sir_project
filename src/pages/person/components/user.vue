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
					forms: [{
						key: 1,
						label: "用户名",
						type: "text",
						name: "userName",
						rules:{rules: [{ required: true, message: '请输入你的用户名!' }],initialValue:this.users.userName},
					},
					{
						key: 2,
						label: "身份证号",
						type: "text",
						name: "identification",
						rules:{rules: [{ required: true, message: '请输入你的身份证号!', pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/i }],initialValue:this.users.identification}
					},
					{
						key: 3,
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
						key: 4,
						label: "出生日期",
						type: "date",
						name: "userBirthday",
						rules:{rules: [{ required: true, message: '请输入你的出生日期!' }],initialValue:this.formatDate(this.users.userBirthday)},
					},
					{
						key: 5,
						label: "注册时间",
						type: "datetime",
						name: "regist",
						rules:{rules: [{ required: true, message: '请输入你的注册时间!' }],initialValue:this.users.regist},
					},
					{
						key: 6,
						label: "学生类型",
						type: "select",
						name: "userType",
						rules:{rules: [{ required: true, message: '请输入你的学生类型!' }],initialValue:this.users.userType},
						options:[
							{key:1,name:"游客",value:0},
							{key:2,name:"学生",value:1},
							{key:3,name:"教职员工",value:2},
							{key:4,name:"校外职员",value:3},
							{key:5,name:"学生亲属",value:4},
							{key:6,name:"系统运营者",value:5},
							{key:7,name:"学校信息主管",value:6},
						]
					}
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
