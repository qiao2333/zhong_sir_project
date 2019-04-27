<!-- 添加或EXCEL批量添加 -->
<template>
	<div>
		<a-tabs defaultActiveKey="1">
			<a-tab-pane :tab="add_tab" key="1">
				<StudentAdd ></StudentAdd>
			</a-tab-pane>
			<a-tab-pane tab="Excel批量添加">
				<ExcelUpload action=""></ExcelUpload>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>


<script>
	import StudentAdd from '../form/StudentAdd'
	import ExcelUpload from '../form/ExcelUpload'
	export default {
		props: {
			add_tab: {
				type: String,
				default: ""
			},
		},
		
		components: {
			StudentAdd,
			ExcelUpload,
		},
	}
</script>

<style>
</style>
