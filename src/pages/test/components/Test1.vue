<template>
	<div>
		<a-modal title="Title" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
			<div v-if="chioce===1">
				<Update1></Update1>
			</div>
			<div v-else-if="chioce===2">
				<Update2></Update2>
			</div>
			<div v-else-if="chioce===3">
				<Update3></Update3>
			</div>
			<div v-else-if="chioce===4">
				<Update4></Update4>
			</div>
		</a-modal>
	</div>
</template>

<script>
	import Update1 from './update1'
	import Update2 from './update2'
	import Update3 from './update3'
	import Update4 from './update4'
	export default {
		props: ['choice'],
		data() {
			return {
				visible: false,
				confirmLoading: false,
			}
		},
		methods: {
			handleOk(data) {

			},
			handleCancel() {

			}
		},
	}
</script>

<style>
</style>
