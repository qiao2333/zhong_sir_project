<template>
	<div>
		<a-card title="用户头像">
			<div v-if="header == ''">
				<Imager :MyStyle="'height: 300px;width: 300px;'" :filepath="header"/>
				<div slot="extra"><a-button type="primary" @click="showModal()">修改</a-button></div>
			</div>
			<div style="height: 300px;width: 300px;text-align: center;" v-else>
				用户暂时没有头像，请上传。
			</div>
			
		</a-card>
		<Picture ref="picture"  />
	</div>
</template>

<script>
	import Imager from '@/pages/BaseInfo/components/picture/image'
	import Picture from '../applypage/Picture'
	export default{
		props: {
			header: {
				type: Object,
			},
		},
		data() {
			return {
				modal: {
					visible:false,
					oldvalue:null,
				}
			}
		},
		components: {
			Imager,
			Picture
		},
		methods: {
			showModal() {
				this.$refs.picture.showModal()
			},
			handleCancel(){
				this.modal.visible = true

			},
			handleOk(){
				this.modal.visible = false
			}
		},
	}
</script>

<style>
</style>
