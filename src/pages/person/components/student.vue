<template>
	<div>
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
			<a-collapse-panel header="学生主要信息" key="2">
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
			</a-collapse-panel>
			<a-collapse-panel header="学生通信信息" key="3">
				居住地址:
				<p>{{address.home_address}}</p>
				通信方式:
				<p>{{address.mail_address}}</p>
			</a-collapse-panel>
			<a-collapse-panel header="学生亲属信息" key="4">
				<div v-for="family in student_relation" :key="family">
					关系：{{family.relationship}}
					亲属名称：{{family.rela_name}}
				</div>
			</a-collapse-panel>
		</a-collapse>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				hasload: false,
				activekey: ['1'],
				student_relation: [{
					"relationship": "未加载",
					"rela_name": "未加载"
				}],
				address: {
					home_address: "未加载",
					mail_address: "未加载"
				},
				student: {
					stu_no: "未加载",
					grade: "未加载",
					class_id: "未加载",
					major_id: "未加载",
					political_id: "未加载",
					live_room: "未加载"
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
		mounted() {
			this.$axios.post('/person').then((res) => {
				const data = res.data
				this.student_relation = data.data.student_relation
				this.student = data.data.student
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
