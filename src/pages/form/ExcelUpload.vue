<template>
	<div>
		<a-upload name="file" :multiple="false" :action="action" :headers="headers" @change="handleChange">
			<a-button>
				<a-icon type="upload" /> 点击上传文件
			</a-button>
		</a-upload>
	</div>
</template>

<script>
	export default {
		props: {
			action: {
				type: String,
				default: ""
			},
		},
		data() {
			return {
				headers: {
					authorization: 'authorization-text',
				},
			}
		},
		methods: {
			handleChange(info) {
				if (info.file.status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (info.file.status === 'done') {
					this.$message.success(`${info.file.name} file uploaded successfully`);
				} else if (info.file.status === 'error') {
					this.$message.error(`${info.file.name} file upload failed.`);
				}
			},
		},
	}
</script>

<style>
</style>
