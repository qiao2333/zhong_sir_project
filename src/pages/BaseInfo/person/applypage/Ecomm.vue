<template>
	<div>
		<a-modal @cancel="handleCancel" :maskClosable="false" width="1000px" :footer="null" :visible="modal.visible">
		<span slot="title">申请修改电子通信方式页面</span>
			<h1>修改{{flags[flag]}}:</h1>
			<hr />
			<a-form v-if="modal.visible" @submit="handleSubmit" :form="myform">
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
				// 业务名称
				// 具体联系方式
				// 联系方式类型
				// 申请理由
				myform: this.$form.createForm(this),
				flag:null,
				flags:[
					"QQ号",
					"微信号",
					"电子邮箱",
					"移动电话号码",
					"办公室号码",
					"家庭电话",
				],
				modal:{
					visible:false
				},
				forms: [
					{
						key: 1,
						label: "具体联系方式",
						type: "textarea",
						name: "content",
						rules: {
							rules: [{
								required: true,
								max: 20,
								message: '请输入你的具体联系方式 80字符以内!',
								min: 1,

							}],
						},
					},
					{
						key: 2,
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
		methods: {
			showModal(info){
				this.flag = info.flag;
				this.forms[0].rules.initialValue = info.content
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
