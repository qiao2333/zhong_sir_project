<template>
	<div class="content">
		<a-upload listType="picture-card" :showUploadList="true" multiple accept=".jpg" :beforeUpload="uploadfile">
			<a-button>上传文件</a-button>
		</a-upload>
		<a-button @click="uploading()">上传</a-button>

	</div>
	
</template>

<script>
	export default{
		data() {
			return {
				filedate
			}
		},
		methods: {
			uploadfile(file,filelist) {
				this.filedate =  file
				return false
			},
			uploading(){
				console.log(this.filedate)
				var formDate = new FormData();
				formDate.append('file',this.filedate)
				formDate.append('map[]',"caodan")
				formDate.append('map[]','fuck')
				this.axios.post("/json/userinfoApply/applyModify", formDate,{'Content-Type':'multipart/form-data'}).then((res=>{
					console.log(res.data)
				})).catch((err)=>{
					console.log(err)
				})
			}
		},
	}
	
</script>

<style>
</style>
