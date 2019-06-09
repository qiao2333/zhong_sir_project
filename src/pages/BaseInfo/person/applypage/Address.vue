<template>
	<div>
		<a-modal @cancel="handleCancel" :maskClosable="false" width="1000px" :footer="null" :visible="modal.visible">
		<span slot="title">申请修改地址页面</span>
		<a-form v-if="modal.visible" @submit="handleSubmit" :form="myform" >
			<addressSelect :addressvalue="address"></addressSelect>
			<template>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
			</template>
			<a-button-group>
				<a-button html-type="submit" type="primary">提交</a-button>
				<a-button type="danger" @click="handleCancel">关闭</a-button>
			</a-button-group>
		</a-form>
		</a-modal>
	</div>
</template>

<script>
	import AutoInput from '@/pages/Baseinfo/components/autoCreateForm/AutoCreateForm'
	import addressSelect from '@/pages/Baseinfo/components/addressSelect/AddressSelectUpdate'
	export default {
		data() {
			return {
				myform: this.$form.createForm(this),
				modal:{
					visible:false
				},
				address:null,
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
		},
		methods:{
			showModal(info){
				if(info!=null){
					this.address = info.address
					this.forms[0].rules.initialValue = info.detail
					this.forms[1].rules.initialValue = info.zipCode
					this.forms[2].rules.initialValue = info.telephone
				}
				this.modal.visible = true
			},
			handleCancel(){
				this.modal.visible = false
			},
			handleSubmit(){
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						console.log(this.myform.getFieldsValue())
						this.modal.visible = false
					}
				});
			}
		}

	}
</script>

<style>
</style>
