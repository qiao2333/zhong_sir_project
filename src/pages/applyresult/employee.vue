<template>
	<div>
		<a-card title="申请修改雇员简历页面">
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
				// 结束时间
				// 描述
				// 申请理由
				myform: this.$form.createForm(this),
				forms: [
					{
						key:1,
						label: "结束时间",
						type:"date",
						name:"endTime",
						rules:{
							rules:[{
								required: true,
								message: "请输入雇佣结束时间！"
							}],
							initialValue:'2019-05-08'
						},
						
					},
					{
						key: 2,
						label: "描述",
						type: "textarea",
						name: "descript",
						rules: {
							rules: [{
								required: true,
								max: 100,
								message: '请输入描述内容 100字符以内!',
								
								
							}],
							initialValue:"草泥马"
						},
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
							initialValue:"草泥马"
						},
					},
					
				],
			}
		},
		components: {
			AutoInput
		},
		methods:{
			handleSubmit(){
				console.log(this.myform.getFieldsValue())
				
			}
		}

	}
</script>

<style>
</style>
