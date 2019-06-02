<template>
	<div>
		<p>文件简要说明:{{info.file_name}}</p>
		<a-button type="primary" @click="downloadFile">文件下载</a-button>
	</div>
</template>

<script>
	export default{
		props: {
			info: {
				type: Object,
			},
		},
		methods:{
			downloadFile(){
				
			}
		}
	}
</script>

<style>
</style>
