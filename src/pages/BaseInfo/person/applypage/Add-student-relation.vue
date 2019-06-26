<template>
	<div>
		<a-modal :maskClosable="false" width="1000px" :footer="null" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title">申请添加学生亲属页面</span>
			<a-form v-if="modal.visible" @submit="handleSubmit"   :form="myform">
				<a-form-item label="选择游客用户" >
					<a-select showSearch placeholder="搜索游客用户，根据姓名或身份证" :showArrow="false" :notFoundContent="null" @search="handleSearch" @change="handleChange" 
					v-decorator="['userName',{rules: [{ required: true, message: '入学日期不能为空' }]}]" :options="parentOptions">
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
		data() {
			return {
				data: [],
				myform: null,
				modal:{
					visible:false
				},
				parentOptions:[],
				forms: [{
						key: 1,
						label: "关系",
						type: "select",
						name: "relationship",
						rules: {
							rules: [{
								required: true,
							}],
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
			showModal(){
				this.myform = this.$form.createForm(this)
				this.modal.visible = true
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
			handleCancel(){
				this.modal.visible = false
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
