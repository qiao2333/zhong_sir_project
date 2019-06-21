<template>
	<div>
		<a-modal @cancel="handleCancel" :maskClosable="false" width="1000px" :footer="null" :visible="modal.visible">
		<span slot="title">申请修改职员雇历页面</span>
		<a-form :form="myform" @submit="handleSubmit">
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
	export default {
		data() {
			return {
				myform: this.$form.createForm(this),
				modal:{
					visible:false
				},
				forms: [
					{
						key:1,
						label: "开始时间",
						type:"date",
						name:"beginTime",
						showTime:true,
						format:'YYYY-MM-DD HH:mm:ss',
						rules:{
							rules:[{
								required: true,
								message: "请输入雇佣开始时间！"
							}],
						},
						
					},
					{
						key:2,
						label: "结束时间",
						type:"date",
						name:"endTime",
						showTime:true,
						format:'YYYY-MM-DD HH:mm:ss',
						rules:{
							rules:[{
								required: false,
								message: "请输入雇佣结束时间！"
							}],
						},
						
					},
					{
						key: 3,
						label: "描述",
						type: "textarea",
						name: "descript",
						
						rules: {
							rules: [{
								required: true,
								max: 100,
								message: '请输入描述内容 100字符以内!',
							}],
						},
					},
					{
						key: 4,
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
		},
		
		methods:{
			showModal(info){
				this.forms[0].rules.initialValue = this.changeDate(info.beginTime)
				this.forms[1].rules.initialValue = this.changeDate(info.endTime)
				this.forms[2].rules.initialValue = info.descript
				this.modal.visible = true
			},
			changeDate(value) {
				return this.$moment(value,'YYYY-MM-DD HH:mm:ss');
			},
			handleCancel(){
				this.modal.visible = false
			},
			handleSubmit(e){
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
