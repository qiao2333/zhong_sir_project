<template>
	<div>
		<a-modal :maskClosable="false" width="1000px" :footer="null" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title">亲属详细信息</span>
			<div>
				用户名：{{relation.user_name}}<br />
				性别：{{relation.user_sex}}<br />
				身份证：{{relation.identification}}<br />
				出生日期：{{relation.user_birthday}}<br />
			</div>
		</a-modal>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				relation:null,
				modal: {
					visible:false
				}
			}
		},
		methods: {
			showModal(info) {
				student
			}
		},
	}
</script>

<style>
</style>
