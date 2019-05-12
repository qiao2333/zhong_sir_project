<template>
	<div>
		<a-card title="申请修改用户主信息页面">
		<a-form :form="myform" >
			<template>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
			</template>
		</a-form>
		</a-card>
	</div>
</template>

<script>
	import AutoInput from '@/pages/components/autoCreateForm/AutoCreateForm'
	export default {
		props: {
			oldvalue: {
				type: Object,
			},
		},
		data() {
			return {
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
							initialValue: this.oldvalue.userName
						},
					},
					{
						key: 2,
						label: "账号",
						type: "text",
						name: "name",
						rules: {
							rules: [{
								required: true,
								max: 20,
								message: '请输入你的账号!',
							}],
							initialValue: this.oldvalue.name
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
							initialValue: this.oldvalue.userSex
						},
						options:[
							{key:1,name:"女",value:0},
							{key:2,name:"男",value:1},
							{key:3,name:"不详",value:2},
						]
					},
					{
						key: 4,
						label: "申请理由",
						type: "textarea",
						name: "reason",
						rules: {
							rules: [{
								required: true,
								max: 20,
								message: '请输入你的申请理由 20字符以内!',
							}],
						},
					},
					
				],
			}
		},
		methods: {
			getValue() {
				return this.myform.getFieldsValue
			}
		},
		components: {
			AutoInput
		}

	}
</script>

<style>
</style>
