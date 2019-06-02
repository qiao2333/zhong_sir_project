<template>
	<div>
		<a-spin v-if="hasload == false" />
		<a-card title="用户地址表">
			<a-list bordered>
				<div slot="地址信息">Header</div>
				<a-list-item v-for="(item, index) in eco" :key="index">
					<a slot="actions" @click="showModal(ecomms[index])">修改</a>
					<a-list-item-meta :description="item.content">
						<a slot="title">{{item.title}}</a>
					</a-list-item-meta>
				</a-list-item>
			</a-list>
		</a-card>
		<a-modal @cancel="handleCancel" :maskClosable="false" width="1000px" :footer="null" :visible="modal.visible">
			<Ecomm @submit="handleOk" @close="handleCancel" ref="Ecomm" v-if="modal.visible" :oldvalue="oldvalue"></Ecomm>
		</a-modal>
	</div>
</template>
<script>
	import Ecomm from '@/pages/Baseinfo/person/applypage/Ecomm'
	export default {
		props: ['ecomms'],
		components: {
			Ecomm
		},
		data() {
			return {
				hasload: false,
				modal: {
					visible: false
				},
				flags: [
					"QQ号",
					"微信号",
					"电子邮箱",
					"移动电话号码",
					"办公室号码",
					"家庭电话",
				],
				oldvalue: null,
				eco: []
			}
		},
		mounted() {
			for (var e of this.ecomms) {
				var object = {
					content: e.content,
					title: this.flags[e.flag]
				}
				this.eco.push(object)
			}
			this.hasload = true
		},
		methods: {
			showModal(value) {
				this.oldvalue = value
				this.modal.visible = true
			},
			handleCancel() {
				this.modal.visible = false
			},
			handleOk(data) {
				this.$emit("tip", {
					type: "success",//success   error   warning
					text: "提交电子信息申请表成功！" 
				})
				console.log(data)
				this.modal.visible = false
			}
		},
	}
</script>

<style>
</style>
