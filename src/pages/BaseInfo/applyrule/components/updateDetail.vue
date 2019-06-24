<template>
	<div>
		<a-modal :footer="null" :maskClosable="false" width="1000px" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title" >修改审批规定</span>
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
				id:0,
				index:0,
				load:true,
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
							initialValue: "",
						},
					},
					{
						key:2,
						label: "角色",
						type:"select",
						name:"roleId",
						rules:{
							rules:[{
								required: true,
								
							}],
							initialValue: ""
						},
						options:null,
					},
				],
			}
		},
		methods: {
			showModel(record,index) {
				this.forms[0].rules.initialValue = record.name
				var arr = new Array()
				for (var i = 0; i < this.roles.length; i++){
					arr.push(new Object({key:i,name:this.roles[i].name,value:this.roles[i].id}))
				}
				this.forms[1].rules.initialValue = record.roleId
				this.forms[1].options = arr
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
