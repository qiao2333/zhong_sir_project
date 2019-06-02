<template>
	<div>
		<a-card title="申请修改用户主信息页面">
		<a-form @submit="handleSubmit"  :form="myform" >
			<template>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
			</template>
			<a-button-group>
				<a-button html-type="submit" type="primary">提交</a-button>
				<a-button type="danger" @click="close">关闭</a-button>
			</a-button-group>
		</a-form>
		</a-card>
	</div>
</template>

<script>
	import AutoInput from '@/pages/Baseinfo/components/autoCreateForm/AutoCreateForm'
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
						key:2,
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
						key: 3,
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
			close(){
				this.$emit("close")
			},
			handleSubmit(e) {
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						this.$emit("submit", this.myform.getFieldsValue())
					}
				});
			},
		},
		components: {
			AutoInput
		}

	}
</script>

<style>
</style>
