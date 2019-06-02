<template>
	<div>
		<a-card title="申请添加学生页面">
			<a-form  :form="myform" @submit="handleSubmit">
				<a-form-item  label="学生账户信息表">
					<a-upload v-decorator="['upload', { }]" name="logo">
						<a-button>
							<a-icon type="upload" /> Click to upload
						</a-button>
					</a-upload>
				</a-form-item>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
				<a-button type="primary" html-type="submit">提交</a-button>
			</a-form>
		</a-card>
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
				forms: [{
						key: 1,
						label: "文件用途说明",
						type: "textarea",
						name: "flag",
						rules: {
							rules: [{
								required: true,
								max: 40,
								message: '简要说明在 40字符以内!',
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
			handleSubmit() {

			}
		},

	}
</script>

<style>
</style>
