<template>
	<div>
		<a-modal :title="ExcelUploads[this.type].title">
			<a-upload :showUploadList="true" accept=".xlsx" :beforeUpload="uploadfile">
				<a-button>上传文件</a-button>
			</a-upload>
			<a-form-item :help="forms.fileInfo.text" :validate-status="forms.fileInfo.validateStatus" label="文件说明">
				<a-textarea @change="handleFileInfoChange" v-model="forms.fileInfo.value"></a-textarea>
			</a-form-item  >
			<a-form-item :help="forms.reason.text" :validate-status="forms.reason.validateStatus" label="申请理由">
				<a-textarea @change="handleReasonChange" v-model="forms.reason.value"></a-textarea>
			</a-form-item>
			<a-button @click="uploading()">上传</a-button>
		</a-modal>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				forms:{
					reason:{
						value:'',
						validateStatus:null,
						text:null
					},
					fileInfo:{
						value:'',
						validateStatus:null,
						text:null
					}
				},
				type:null,
				ExcelUploads: [
					{
						title:'申请批量更新学生账号',
						type:9
					},
					{
						title:'批量更新职员账号',
						type:10
					},
					{
						title:'批量添加学生账号',
						type:11
					},
					{
						title:'批量添加职员账号',
						type:12
					}
				]
			}
		},
		methods:{
			showModal(info){
				this.type = info.type - 9
			},
			handleReasonChange(value){
				var reason = this.forms.reason
				if(value.length > 40){
					reason.validateStatus = "error"
					reason.text = "文件说明不能超过40字符！"
					return 
				}
				
				reason.validateStatus = "success"
				reason.text = null
				return
			},
			handleFileInfoChange(value){
				var fileInfo = this.forms.fileInfo
				if(value.length > 40){
					fileInfo.validateStatus = "error"
					fileInfo.text = "文件说明不能超过40字符！"
					return 
				}
				
				fileInfo.validateStatus = "success"
				fileInfo.text = null
				return
				
			},
			uploadfile(file,filelist) {
				this.filedate =  file
				return false
			},
			uploading(item){
				if(this.forms.reason.value == ""){
					this.forms.reason.validateStatus = "error"
					this.forms.reason.text = '申请理由不能为空'
					return;
				}else if(this.forms.fileInfo.value == ""){
					this.forms.fileInfo.validateStatus = "error"
					this.forms.fileInfo.text = '文件说明不能为空'
					return;
				}
				var formDate = new FormData();
				formDate.append('file',this.filedate)
				formDate.append('reason',this.forms.reason.value)
				formDate.append('type',ExcelUploads[this.type].type)
				formDate.append('fileInfo',this.forms.fileInfo.value)
				formDate.append('id','-1')
				this.axios.post("/json/userinfoApply/applyModifyWithFile", formDate,{'Content-Type':'multipart/form-data'}).then((res=>{
					console.log(res.data)
				})).catch((err)=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style>
</style>
