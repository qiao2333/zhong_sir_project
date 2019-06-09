<template>
	<a-modal @cancel="handleCancel" :maskClosable="false" width="400px" :footer="null" :visible="modal.visible">
		<span slot="title">申请修改学生头像信息页面</span>
		<a-upload name="avatar" listType="picture-card" class="avatar-uploader" :showUploadList="false" action=""
		 :beforeUpload="beforeUpload" @change="handleChange">
				<div v-if="imageUrl">
					<a-card>
						<a-button slot="extra" type="danger" icon="close" @click.self.stop="deleteImage"></a-button>
						<img style="height: 300px;width: 300px;" :src="imageUrl" alt="avatar" />
					</a-card>
				</div>
				<div v-else>
					<div style="height: 300px;width: 300px;"><a-icon :type="loading ? 'loading' : 'plus'" />Upload</div>
				</div>
		</a-upload>
		<a-button-group>
			<a-button html-type="submit" type="primary">提交</a-button>
			<a-button type="danger" @click="handleCancel">关闭</a-button>
		</a-button-group>
	</a-modal>
</template>
<script>
	function getBase64(img, callback) {
		const reader = new FileReader()
		reader.addEventListener('load', () => callback(reader.result))
		reader.readAsDataURL(img)
	}
	export default {
		data() {
			return {
				modal:{
					visible:false
				},
				loading: false,
				imageUrl: '',
			}
		},
		methods: {
			handleCancel(){
				this.modal.visible = false
			},
			deleteImage(){
				this.imageUrl = null
			},
			submit(){
				this.$axios.post("").then((res)=>{
					if(res.data.code == 0){
						this.$emit("tip",{type:"success",text:"修改申请提交成功"})
					}else{
						this.$emit("tip",{type:"error",text:"修改申请提交失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			showModal(){
				this.modal.visible = true
			},
			handleChange(info) {
				console.log(info)
				getBase64(info.file, (imageUrl) => {
					this.imageUrl = imageUrl
					this.loading = false
				})
			},
			beforeUpload(file) {
				return false
			},
		},
	}
</script>
<style>

</style>
