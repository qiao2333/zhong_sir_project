<template>
	<a-modal @cancel="handleCancel" :maskClosable="false" width="400px" :footer="null" :visible="modal.visible">
		<span slot="title">申请修改学生{{info?'生活照':'个人照'}}</span>
		<div v-if="info != null">
			<div class="MyUpload">
				<a-upload :beforeUpload="beforeUpload" :showUploadList="false" @change="handleChange">
					<div v-if="imageUrl!=null">
						<img :src="imageUrl" />
					</div >
					<a-button v-else>上传图片</a-button>
				</a-upload>
			</div>
			<div>
				<a-form-item label="申请理由">
					<a-textarea v-model="reason" />
				</a-form-item>
			</div>
			<br />
			<a-button-group>
				<a-button html-type="submit" type="primary" @click="submit()">提交</a-button>
				<a-button type="danger" @click="handleCancel">关闭</a-button>
			</a-button-group>
		</div>
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
				reason:'',
				loading: false,
				imageUrl: null,
				info:null,
				file:null,
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
				var formDate = new FormData()
				formDate.append('file',this.file)
				formDate.append('flag',this.info.flag?1:0)
				formDate.append('reason',this.reason)
				formDate.append('id',this.info.id)
				formDate.append('type',2)
				this.axios.post("json/userinfoApply/applyModifyWithFile",formDate,{'Content-Type':'multipart/form-data'}).then((res)=>{
					if(res.data.code == 0){
						this.$emit("tip",{type:"success",text:"修改申请提交成功"})
					}else{
						this.$emit("tip",{type:"error",text:"修改申请提交失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
				this.modal.visible = false
			},
			showModal(info){
				console.log(info)
				this.info = info
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
				this.file = file
				return false
			},
		},
	}
</script>
<style scoped>
img{
	height: 100px;
	width: 100px;
}
.MyUpload{
	height: 120px;
	width: 120px;
	text-align: center;
	border: 1px solid #0000FF;
}
</style>
