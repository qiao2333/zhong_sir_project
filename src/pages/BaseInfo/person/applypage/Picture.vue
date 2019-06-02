<template>
	<a-card title="申请修改照片页面">
		<a-form :form="myform" @submit="handleSubmit">
			<a-form-item>
				<a-upload >
					<img  alt="avatar" />
						<a-icon />
						<div class="ant-upload-text">Upload</div>
				</a-upload>
			</a-form-item>
			<template>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
			</template>
		</a-form>
	</a-card>
</template>

<script>
	import AutoInput from '@/pages/components/autoCreateForm/AutoCreateForm'
	export default {
		data() {
			return {
				myform: this.$form.createForm(this),
				forms: [{
						key: 1,
						label: "申请理由",
						type: "textarea",
						name: "reason",
						rules: {
							rules: [{
								required: true,
								max: 20,
								message: '请输入你的申请理由 20字符以内!',


							}],
							initialValue: "草泥马"
						},
					},

				],
			}
		},
		methods:{
			handleSubmit(){
				
			}
		},
		components: {
			AutoInput
		},
	}
</script>

<style>
</style>
