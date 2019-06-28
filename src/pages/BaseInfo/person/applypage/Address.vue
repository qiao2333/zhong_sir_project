<template>
	<div>
		<a-modal @cancel="handleCancel" :maskClosable="false" width="1000px" :footer="null" :visible="modal.visible">
		<span slot="title">申请修改地址页面</span>
		<a-form v-if="modal.visible" @submit="handleSubmit" :form="myform" >
			<a-form-item  label="地址选择">
				<addressSelect @change="handleAddressChange" :addressvalue="address"></addressSelect>
			</a-form-item>
			<template>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
			</template>
			<a-button-group>
				<a-button :loading="IsAxios" html-type="submit" type="primary">提交</a-button>
				<a-button type="danger" @click="handleCancel">关闭</a-button>
			</a-button-group>
		</a-form>
		</a-modal>
	</div>
</template>

<script>
	import AutoInput from '@/pages/Baseinfo/components/autoCreateForm/AutoCreateForm'
	import addressSelect from '@/pages/Baseinfo/components/addressSelect/AddressSelectUpdate1'
	export default {
		data() {
			return {
				myform: this.$form.createForm(this),
				modal:{
					visible:false
				},
				address:null,
				IsAxios:false,
				flag:-1,
				addresses:[],
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
								pattern:/^[0-9]{11}$/,
								message: '请输入11位手机号!',
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
			handleAddressChange(value){
				this.addresses = value
			},
			showModal(info){
				if(info!=null){
					this.flag = info.flag
					if(info.address){
						this.address = info.address
						this.forms[0].rules.initialValue = info.detail
						this.forms[1].rules.initialValue = info.zipCode
						this.forms[2].rules.initialValue = info.telephone
					}
					
				}
				this.modal.visible = true
			},
			handleCancel(){
				this.modal.visible = false
			},
			handleSubmit(e){
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						if(this.addresses.length < 5){
							this.$emit('tip',{type:'error',text:'请选择到底'})
							return
						}
						this.IsAxios = true
						var address = this.addresses
						var filevalue = this.myform.getFieldsValue()
						
						console.log(filevalue)
						var obj = new Object()
						obj.type = 1
						obj.reason = filevalue.reason
						obj.applyAddress = {
							id:-1,
							country: Number(address[0].split("|")[1]),
							state: Number(address[1].split("|")[1]),
							city: Number(address[2].split("|")[1]),
							area: Number(address[3].split("|")[1]),
							street: Number(address[4].split("|")[1]),
							detail: filevalue.detail,
							zipCode: Number(filevalue.zipCode),
							telephone: Number(filevalue.telephone),
							flag:this.flag
							
						}
						this.axios.post("/json/userinfoApply/applyModifyNoneFile",obj).then((res)=>{
							console.log(res.data)
							if(res.data.code == 0){
								this.$emit('tip',{type:'success',text:'申请修改地址信息成功'})
							}else{
								this.$emit('tip',{type:'error',text:'申请修改地址信息失败'})
							}
						}).catch((err)=>{
							this.$emit('tip',{type:'warning',text:'发生未知错误'})
						}).then(()=>{
							this.IsAxios = false
							this.modal.visible = false
						})
					}
				});
			}
		}

	}
</script>

<style>
</style>
