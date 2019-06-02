<template>
	<div>
<!-- 		用户姓名，身份证，性别，出生日，账号（user表中名为name的字段），密码，学校，用户类型，照片，地址，电子通信方式
学号，入学日期，当前院系，当前年级,，当前主修专业，当前班级专业，政治面貌，当前宿舍，当前地址，当前通讯地址。 -->
		<a-card title="学生主要信息">
			<a-row>
				<a-col :span="8">学号:{{students.stuNo}}</a-col>
				<a-col :span="8">入学日期:{{students.beginLearnDate}}</a-col>
				<a-col :span="8">当前年级:{{students.grade}}</a-col>
			</a-row>
			<a-row>
				<a-col :span="8">当前班级:{{students.classId}}</a-col>
				<a-col :span="8">当前主修专业:{{students.majorId}}</a-col>
				<a-col :span="8">当前班级专业:等待接口</a-col>
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
			}
		},
		methods: {
		},
	}
</script>

<style>
</style>
