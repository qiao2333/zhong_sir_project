<template>
	<div >
		<a-card title="申请修改电子通信方式页面">
		<a-form :form="myform">
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
				// 业务名称
				// 具体联系方式
				// 联系方式类型
				// 申请理由
				myform: this.$form.createForm(this),
				forms: [
					{
						key:1,
						label: "联系方式类型",
						type:"select",
						name:"flag",
						rules:{
							rules:[{
								required: true,
								
							}],
							initialValue:this.oldvalue.flag
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
						label: "具体联系方式",
						type: "textarea",
						name: "content",
						rules: {
							rules: [{
								required: true,
								max: 20,
								message: '请输入你的具体联系方式 80字符以内!',
								
								
							}],
							initialValue:this.oldvalue.content
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
