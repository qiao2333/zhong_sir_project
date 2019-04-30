<template>
	<div>
		<form @submit.prevent="handleSubmit()">
			学号:<input type="text" name="stu_no" />
			姓名:<input type="text" name="user_name" />
			密码:<input type="text" name="pwd"/>
			年级:<input type="text" name="grade" />
			主修专业:<br />
			<select name="major" v-model="major">
				<option v-for="m in majors" :key="m" :value="m">m</option>
			</select>
			班级:<input type="text" name="class" />
			<a-button html-type="submit">提交</a-button>
		</form>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				stu_no: '',
				user_name: '',
				pwd: '',
				grade:'',
				major:'',
				class:''
			}
		},
		methods: {
			handleSubmit() {
				
			}
		},
	}
</script>

<style>
</style>
