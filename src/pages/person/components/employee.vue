<template>
	<a-collapse v-model="activekey" v-if="hasload">
		<a-collapse-panel header="用户主信息表" key="1">
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
		</a-collapse-panel>
		<a-collapse-panel header="职员主要信息" key="2">
			<a-row>
				<a-col :span="8">员工编号:{{employee.emp_no}}</a-col>
				<a-col :span="8">所属学院:{{ employee.department_id}}</a-col>
				<a-col :span="8">所在科室:{{employee.subdepartment_id}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">主修专业:{{employee.discipline_id}}</a-col>
				<a-col :span="8">政治面貌:{{employee.political_id}}</a-col>
				<a-col :span="8">行政岗位:{{employee.position_id}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">入职时间:{{employee.begin_time}}</a-col>
				<a-col :span="8">离职时间:{{employee.end_time}}</a-col>
				<a-col :span="8">描述:{{employee.descript}}</a-col>
			</a-row>
		</a-collapse-panel>
		<a-collapse-panel header="职员通信信息" key="3">
			居住地址:
			<p>{{address.home_address}}</p>
			通信方式:
			<p>{{address.mail_address}}</p>
		</a-collapse-panel>
	</a-collapse>
</template>

<script>
	export default{
		data() {
			return {
				hasload: false,
				activekey: ['1'],
				address: {
					home_address: "未加载",
					mail_address: "未加载"
				},
				employee: {
					emp_no: "未加载",
					department_id: "未加载",
					subdepartment_id: "未加载",
					discipline_id: "未加载",
					political_id: "未加载",
					position_id: "未加载",
					begin_time: "未加载",
					end_time: "未加载",
					descript: '未加载'
				},
				user: {
					user_name: "未加载",
					identification: "未加载",
					user_sex: "未加载",
					user_birthday: "未加载 ",
					regist: "未加载",
					university_id: "未加载",
					user_type: "未加载",
					name: "未加载"
				},
			}
		},
		methods: {
			
		},
		mounted() {
			this.$axios.post('/person/employee').then((res) => {
				const data = res.data
				this.employee = data.data.employee
				this.user = data.data.user
				this.address = data.data.address
				this.hasload = true
			}).catch((err) => {
				console.log(err)
			})
		}
		
	}
</script>

<style>
</style>
