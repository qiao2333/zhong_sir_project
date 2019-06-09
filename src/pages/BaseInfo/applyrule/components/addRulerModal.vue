<template>
	<div>
		<a-modal :footer="null" :maskClosable="false" width="1000px" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title" >添加审批规定</span>
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
		data() {
			return {
				myform: null,
				modal: {
					visible:false
				},
				forms: [
					{
						key:1,
						label: "审批业务名称",
						type:"text",
						name:"name",
						rules:{
							rules:[{
								required: true,
								max:20,
								message:'请输入审批业务名称，20字符以内!'
							}],
						},
					},
					{
						key: 2,
						label: "业务类型",
						type: "text",
						name: "type",
						rules: {
							rules: [{
								required: true,
								max: 15,
								message: '请输入业务的类型,15字符以内!',
							}],
						},
					},
					
				],
			}
		},
		methods: {
			showModel() {
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
						this.$emit("submit", this.myform.getFieldsValue())
						this.modal.visible = false
					}
				});
			},
			
		},
	}
</script>

<style>
</style>
