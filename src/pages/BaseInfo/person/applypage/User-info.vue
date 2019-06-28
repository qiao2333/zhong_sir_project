<template>
	<div>
		<a-modal :maskClosable="false" width="1000px" :footer="null" @cancel="handleCancel" :visible="modal.visible">
		<span slot="title">申请修改用户主信息页面</span>
		<a-form v-if="modal.visible" @submit="handleSubmit"  :form="myform" >
			<template>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
			</template>
			<a-button-group>
				<a-button :loading="isAxios" html-type="submit" type="primary">提交</a-button>
				<a-button type="danger" @click="handleCancel">关闭</a-button>
			</a-button-group>
		</a-form>
		</a-modal>
	</div>
</template>

<script>
	import AutoInput from '@/pages/Baseinfo/components/autoCreateForm/AutoCreateForm'
	export default {
		data() {
			return {
				isAxios:false,
				myform: null,
				modal:{
					visible:false
				},
				forms: [
					{
						key:1,
						label: "用户姓名",
						type:"text",
						name:"userName",
						rules:{
							rules:[{
								required: true,
								message:"用户名不能为空"
							}],
							initialValue: null,
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
								message:"请至少选择一个性别"
							}],
							initialValue: null,
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
			showModal(info){
				this.forms[0].rules.initialValue = info.userName
				this.forms[1].rules.initialValue = info.userSex
				this.myform = this.$form.createForm(this)
				this.modal.visible = true
			},
			handleSubmit(e) {
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						console.log(this.myform.getFieldsValue())
						var fromvalue = this.myform.getFieldsValue()
						var obj = new Object()
						this.axios.post("/json/userinfoApply/applyModifyNoneFile",obj).then((res)=>{
							console.log(res.data)
							if(res.data.code == 0){
								this.$emit('tip',{type:'success',text:'申请修改学历信息成功'})
							}else{
								this.$emit('tip',{type:'error',text:'申请修改学历信息失败'})
							}
						}).catch((err)=>{
							this.$emit('tip',{type:'warning',text:'发生未知错误'})
						}).then(()=>{
							this.isAxios = false
							this.modal.visible = false
						})
					}
				});
			},
			handleCancel(){
				this.modal.visible = false
			}
		},
		components: {
			AutoInput
		}

	}
</script>

<style>
</style>
