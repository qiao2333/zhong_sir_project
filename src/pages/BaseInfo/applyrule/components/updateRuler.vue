<template>
	<div>
		<a-modal :footer="null" :maskClosable="false" width="1000px" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title" >修改审批步骤</span>
			<div v-if="modal.visible">
				<a-form :form="myform" @submit="handleOk">
					<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
					<a-button-group>
						<a-button html-type="submit">修改</a-button>
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
			AutoInput,
		},
		data() {
			return {
				myform: null,
				modal: {
					visible:false
				},
				id:0,
				index:0,
				load:true,
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
							initialValue: "",
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
							initialValue: "",
						},
						
					},
				],
			}
		},
		methods: {
			showModel(record,index) {
				this.forms[0].rules.initialValue = record.name
				this.forms[1].rules.initialValue = record.type
				this.id = record.id
				this.index = index
				this.myform = this.$form.createForm(this)
				this.load = true
				this.modal.visible = true
			},
			handleCancel(){
				this.modal.visible = false
			},
			handleOk(e){
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						this.$emit("update", this.myform.getFieldsValue(),this.id, this.index)
						this.modal.visible = false
					}
				});
			},
			
			
		},
	}
</script>

<style>
</style>
