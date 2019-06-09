<template>
	<div>
		<a-modal :maskClosable="false" width="1000px" :footer="null" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title">申请修改学生亲属页面</span>
			<a-form @submit="handleSubmit" v-if="modal.visible" :form="myform">
				<a-form-item label="选择游客用户">
					<a-select id="userName" showSearch placeholder="搜索游客用户，根据姓名和身份证" :showArrow="false" :notFoundContent="null" @search="handleSearch"
					 @change="handleChange" v-decorator="['userName',{rules: [{ required: true, message: '亲属名称不能为空' }],initialValue:parentName}]" :options="parentOptions">
						<a-select-option v-for="d in data" :key="d.value">{{d.text}}</a-select-option>
					</a-select>
				</a-form-item>
				<template>
					<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
				</template>
				<a-button-group>
					<a-button html-type="submit" type="primary">提交</a-button>
					<a-button type="danger" @click="handleCancel()">关闭</a-button>
				</a-button-group>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
	import AutoInput from '@/pages/Baseinfo/components/autoCreateForm/AutoCreateForm'
	export default {
		props: {
			oldvalue: {
				type: Object,
			},
		},
		data() {
			return {
				data: [],
				modal:{
					visible:false,
				},
				parentOptions:[],
				parentName:'',
				myform: null,
				forms: [{
						key: 1,
						label: "关系",
						type: "select",
						name: "relationship",
						rules: {
							rules: [{
								required: true,
								message:"请选择你与亲属的关系"
							}],
							initialValue: null
						},
						options: [{
								key: 1,
								name: "母",
								value: 0
							},
							{
								key: 2,
								name: "父",
								value: 1
							},
							{
								key: 3,
								name: "兄",
								value: 2
							},
							{
								key: 4,
								name: "弟",
								value: 3
							},
							{
								key: 5,
								name: "姐",
								value: 4
							},
							{
								key: 6,
								name: "妹",
								value: 5
							},
							{
								key: 7,
								name: "其他",
								value: 6
							},
						]
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
				this.forms[0].rules.initialValue = info.relationship
				this.parentName = info.relaName
				this.myform = this.$form.createForm(this)
				this.modal.visible = true
			},
			handleCancel() {
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
				
			},
			handleChange(){
				
			},
			handleSearch(){
				
			},
		},

	}
</script>

<style>
</style>
