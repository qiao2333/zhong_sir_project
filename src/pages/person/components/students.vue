<template>
	<div>
<!-- 		用户姓名，身份证，性别，出生日，账号（user表中名为name的字段），密码，学校，用户类型，照片，地址，电子通信方式
学号，入学日期，当前院系，当前年级,，当前主修专业，当前班级专业，政治面貌，当前宿舍，当前地址，当前通讯地址。 -->
		<a-card title="学生主要信息">
			<a-button slot="extra" @click="showModal">修改</a-button>
			<a-row>
				<a-col :span="8">学号:{{students.stuNo}}</a-col>
				<a-col :span="8">入学日期:{{students.beginLearnDate}}</a-col>
				<a-col :span="8">当前年级:{{students.grade}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">当前班级:{{students.classId}}</a-col>
				<a-col :span="8">当前主修专业:{{students.majorId}}</a-col>
				<a-col :span="8">当前年级专业:{{students.politicalId}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">宿舍:{{students.liveRoom}}</a-col>
				<a-col :span="8">当前院校:等待接口</a-col>
				<a-col :span="8">政治面貌:{{students.politicalId}}</a-col>
			</a-row>
		</a-card>
	</div>
</template>

<script>
	export default{
		props: ['students'],
		data() {
			return {
				mydatas: {
					forms: [{
						key: 1,
						label: "用户名",
						type: "text",
						name: "user_name",
						rules:{rules: [{ required: true, message: '请输入你的用户名!' }]},
					},
					{
						key: 2,
						label: "身份证号",
						type: "text",
						name: "identification",
						rules:{rules: [{ required: true, message: '请输入你的身份证号!', pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/i }]}
					},
					{
						key: 3,
						label: "性别",
						type: "radio",
						name: "user_sex",
						rules:{rules: [{ required: true,message: '请选择你的性别!' }]},
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
						name: "user_birthday",
						rules:{rules: [{ required: true, message: '请输入你的出生日期!' }]},
					},
					{
						key: 5,
						label: "注册时间",
						type: "date",
						name: "regist",
						rules:{rules: [{ required: true, message: '请输入你的注册时间!' }]},
					},
				],
				title:"用户主信息修改申请"
				
				
				}
			}
		},
		methods: {
			showModal(){
				this.$emit('showModal',this.mydatas)
			}
		},
	}
</script>

<style>
</style>
