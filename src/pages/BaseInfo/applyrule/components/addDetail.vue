<template>
	<div>
		<a-modal :footer="null" :maskClosable="false" width="1000px" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title" >添加审批步骤</span>
			<div v-if="modal.visible">
				<a-form :form="myform" @submit="handleOk">
					<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
					<a-button-group>
						<a-button html-type="submit">添加</a-button>
						<a-button @click="handleCancel">取消</a-button>
					</a-button-group>
				</a-form>
			</div>
		</a-modal>
	</div>
</template>

<script>
	import AutoInput from '@/pages/Baseinfo/components/autoCreateForm/AutoCreateForm'
	export default{
		components: {
			AutoInput
		},
		props: {
			roles: {
				type: Array,
			},
		},
		data() {
			return {
				myform: null,
				modal: {
					visible:false
				},
				forms: [
					{
						key:1,
						label: "审批步骤说明",
						type:"text",
						name:"name",
						rules:{
							rules:[{
								required: true,
								max:20,
								message:'请输入审批步骤说明，20字符以内!'
							}],
						},
					},
					{
						key: 2,
						label: "角色",
						type: "select",
						name: "roleId",
						rules: {
							rules: [{
								required: true,
								message: '请选择角色!',
							}],
							initialValue: null
						},
						options:null
					},
					
				],
			}
		},
		methods: {
			showModel() {
				var arr = new Array()
				for(var i = 0; i < this.roles.length; i++){
					var obj = new Object()
					obj.key = i
					obj.name=this.roles[i].description
					obj.value=this.roles[i].id
					arr.push(obj)
				}
				this.forms[1].options = arr
				this.forms[1].rules.initialValue = ""
				this.myform = this.$form.createForm(this)
				this.modal.visible = true
			},
			handleCancel(){
				this.modal.visible = false
			},
			handleOk(e){
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						this.$emit("add", this.myform.getFieldsValue())
						this.modal.visible = false
					}
				});
			},
			
		},
	}
</script>

<style>
</style>
