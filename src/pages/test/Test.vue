<template>
	<div class="content">
		<a-form :form="myform" @submit="handleSubmit">
			<template>
				<AutoInput v-for="form in forms" :key="form.key" :form="form"></AutoInput>
			</template>
			<a-button type="primary" html-type="submit">提交</a-button>
		</a-form>

	</div>
</template>

<script>
	import AutoInput from '../components/autoCreateForm/AutoCreateForm.vue'
	export default {
		data() {
			return {
				formLayout: 'horizontal',
				myform: this.$form.createForm(this),
				forms: [{
						key: 1,
						label: "用户名",
						type: "text",
						name: "stu_name",
						rules:{rules: [{ required: true, message: '请输入你的用户名!' }]},
					},
					{
						key: 2,
						label: "密码",
						type: "password",
						name: "stu_password",
						rules:{rules: [{ required: true, message: '请输入你的密码!' }]},
					},
					{
						key: 3,
						label: "生日",
						type: "date",
						name: "stu_brithday",
						rules:{rules: [{ required: true, message: '请输入你的生日!' }]},
					},
					{
						key: 4,
						label: "年龄",
						type: "number",
						name: "stu_age",
						rules:{rules: [{ required: true, message: '请输入你的年龄!' }]},
					},
					{
						key: 5,
						label: "性别",
						type: "radio",
						name: "stu_sex",
						rules:{rules: [{ required: true, message: '请选择你的性别!' }]},
						options: [{
							key: 1,
							name: "男",
							value: "男"
						}, {
							key: 2,
							name: "女",
							value: "女"
						}]
					},
					{
						key: 6,
						label: "学习",
						type: "select",
						name: "stu_school",
						rules:{rules: [{ required: true, message: '请选择你的母校!' }]},
						options: [{
							key: 1,
							name: "肇庆学院",
							value: "肇庆学院"
						}, {
							key: 2,
							name: "沙头小学",
							value: "沙头小学"
						}]
					},
					{
						key: 7,
						label: "兴趣",
						type: "checkbox",
						name: "stu_habbies",
						rules:{rules: [{ required: true, message: '请选择你的兴趣!' }]},
						options: [{
							key: 1,
							name: "唱",
							value: "唱"
						}, {
							key: 2,
							name: "跳",
							value: "跳"
						}, {
							key: 3,
							name: "rape",
							value: "rape"
						}, {
							key: 4,
							name: "篮球",
							value: "篮球"
						}, {
							key: 5,
							name: "music",
							value: "music"
						}]
					}
				]
			}
		},
		components: {
			AutoInput
		},
		methods: {
			handleSubmit() {
				console.log(this.myform.getFieldsValue())
			}
		},
	}
</script>

<style scoped>
	input {
		border: #000080;
	}
</style>
