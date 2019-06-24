<template>
	<div v-if="info != null">
		<p>文件简要说明:{{info.fileInfo}}</p>
		<a-button type="primary" @click="downloadFile(info.fileName)">文件下载</a-button>
	</div>
</template>

<script>
	export default{
		props: {
			info: {
				type: Object,
				default:null,
			},
		},
		methods:{
			downloadFile(filename){
				this.axios.post("")
			}
		}
	}
</script>

<style>
</style>
