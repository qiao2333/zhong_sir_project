<template>
	<div>
		<a-modal :maskClosable="false" width="1000px" :footer="null" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title"></span>
			
			<a-button slot="footer" type="primary" block @click="handleCancel">关闭</a-button>
		</a-modal>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				modal:{
					visible:false
				}
			}
		},
		methods:{
			async showModal(info){
				this.modal.visible = true
			},
			fetch(value){
				this.$axios.get("" + value).then((res)=>{
					if (res.data.code == 0){
						
					}else{
						this.$emit("tip",{type:"error",text:"获取详细信息失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			
		}
	}
</script>

<style>
</style>
