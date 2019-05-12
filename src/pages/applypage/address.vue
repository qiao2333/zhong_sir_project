<template>
	<div>
		<a-card title="申请修改地址页面">
		<a-form :form="myform" >
			<addressSelect :addressvalue="oldvalue.address"></addressSelect>
			<template>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
			</template>
		</a-form>
		</a-card>
	</div>
</template>

<script>
	import AutoInput from '@/pages/components/autoCreateForm/AutoCreateForm'
	import addressSelect from '@/pages/components/addressSelect/AddressSelectUpdate'
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
						label: "具体位置（详细尾缀）",
						type:"textarea",
						name:"detail",
						rules:{
							rules:[{
								required: true,
								max:20,
								message:'请输入你的具体位置 20字符以内'
							}],
							initialValue:this.oldvalue.detail
						},
					},
					{
						key: 2,
						label: "邮政编码",
						type: "text",
						name: "zipCode",
						rules: {
							rules: [{
								required: true,
								max: 16,
								pattern:/^[0-9]{6}$/,
								message: '请输入6位数字邮箱编码!',
							}],
							initialValue:this.oldvalue.zipCode
						},
					},
					{
						key:3,
						label: "收件人电话",
						type:"text",
						name:"telephone",
						rules:{
							rules:[{
								required: true,
								max: 13,
								pattern:/^\d$/,
								message: '请输入13位手机号!',
							}],
							initialValue:this.oldvalue.telephone
						},
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
						},
					},
					
				],
			}
		},
		components: {
			AutoInput,
			addressSelect
		}

	}
</script>

<style>
</style>
