<template>
	<div >
		<a-row>
			<a-col span="12">
				<span>文件简要说明:{{info.fileInfo}}</span>
			</a-col>
			<a-col span="12">
				<!-- <a-button @click="downloadFile(info.fileInfo)">下载文件</a-button> -->
				<a  :href="'/api/example/file/download?fileName=' + info.fileName">文件下载</a>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	export default{
		props: {
			info: {
				type: Object,
			},
		},
		methods: {
			downloadFile(data) {
				const blob = new Blob([data],{type:'application/vnd.ms-excel'})
				const a = document.getElementById('a_id')
				a.href = URL.createObjectURL(blob)
				a.download = 'download'
				a.click()
				URL.revokeObjectUrl(a.href)
			}
		},
	}
</script>

<style>
</style>
