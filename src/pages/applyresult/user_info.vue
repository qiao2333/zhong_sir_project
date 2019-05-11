<template>
	<div>
		<a-card title="申请修改电子通信方式页面">
		<a-form :form="myform" @submit="handleSubmit">
			<template>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
			</template>
			<a-button type="primary" html-type="submit">提交</a-button>
		</a-form>
		</a-card>
	</div>
</template>

<script>
	import AutoInput from '@/pages/components/autoCreateForm/AutoCreateForm'
	export default {
		data() {
			return {
				// 用户姓名
				// 账号
				// 性别
				// 出生日期
				// 申请理由
				myform: this.$form.createForm(this),
				forms: [
					{
						key:1,
						label: "用户姓名",
						type:"text",
						name:"userName",
						rules:{
							rules:[{
								required: true,
								
							}],
						},
						options:[
							{key:1,name:"QQ号",value:0},
							{key:2,name:"微信号",value:1},
							{key:3,name:"电子邮箱",value:2},
							{key:4,name:"移动电话号码",value:3},
							{key:5,name:"办公室号码",value:4},
							{key:6,name:"家庭电话",value:5},
						]
					},
					{
						key: 2,
						label: "账号",
						type: "text",
						name: "content",
						rules: {
							rules: [{
								required: true,
								max: 20,
								message: '请输入你的账号!',
								
								
							}],
							initialValue:"草泥马"
						},
					},
					{
						key:3,
						label: "性别",
						type:"radio",
						name:"userSex",
						rules:{
							rules:[{
								required: true,
								
							}],
						},
						options:[
							{key:1,name:"女",value:0},
							{key:2,name:"男",value:1},
							{key:3,name:"不详",value:2},
						]
					},
					{
						key: 5,
						label: "申请理由",
						type: "textarea",
						name: "reason",
						rules: {
							rules: [{
								required: true,
								max: 20,
								message: '请输入你的申请理由 20字符以内!',
								
								
							}],
							initialValue:"草泥马"
						},
					},
					
				],
			}
		},
		components: {
			AutoInput
		}

	}
</script>

<style>
</style>
