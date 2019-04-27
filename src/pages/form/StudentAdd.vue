<template>
	<a-form :form="form" @submit="handleSubmit">

		<a-form-item label="学号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
			<a-input v-decorator="['grade',{rules: [{ required: true, message: '请输入学生的学号'}]}]" />
		</a-form-item>

		<a-form-item label="姓名" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
			<a-input v-decorator="['grade',{rules: [{ required: true, message: '请输入学生的姓名'}]}]" />
		</a-form-item>

		<a-form-item label="年级" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
			<a-input v-decorator="['grade',{rules: [{ required: true, message: '请输入学生的年级'}]}]" />
		</a-form-item>
		
		<a-form-item label="入学日期" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
			<a-date-picker placeholder="请选择入学日期"/>
		</a-form-item>


		<a-form-item :wrapper-col="{ span: 12, offset: 5 }">
			<a-button type="primary" html-type="submit">
				Submit
			</a-button>
		</a-form-item>
	</a-form>
</template>

<script>
	import GlobalData from '../data/GlobalData.vue'
	export default {
		data() {
			return {
				formLayout: 'horizontal',
				form: this.$form.createForm(this),
			};
		},
		methods: {
			fuck() {
				alert(GlobalData.majors);
			},
			handleSubmit(){
				alert("提交");
			},
		},

	};
</script>

<style>
</style>
