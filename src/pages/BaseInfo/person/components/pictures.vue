<template>
	<div>
		<a-spin v-if="header == null" />
		<div v-else>
			<a-card title="用户头像">
				
				<div v-if="header != ''">
					<Imager :MyStyle="'height: 300px;width: 300px;'" :filepath="header"/>
					<div slot="extra"><a-button v-if="canUpdate" type="primary" @click="showModal()">修改</a-button></div>
				</div>
				<div v-else style="height: 300px;width: 300px;text-align: center;" >
					用户暂时没有头像<a-button v-if="canUpdate" slot="extra" @click="showModal">上传</a-button>
				</div>
			</a-card>
			<Picture v-if="canUpdate" ref="picture"  />
		</div>
	</div>
</template>

<script>
	import Imager from '@/pages/BaseInfo/components/picture/image'
	import Picture from '../applypage/Picture'
	export default{
		props: {
			UserId:{
				type: Number,
				default:0
			},
			canUpdate: {
				type: Boolean,
			},
		},
		data() {
			return {
				header:null,
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
		mounted(){
			this.fetch(this.UserId)
		},
		methods: {
			fetch(id){
				this.axios.get("/json/student/getStudentInformation/" + id).then((res)=>{
					if (res.data.code == 0){
						
					}else{
						this.header = ''
						this.$emit("tip",{type:"error",text:"获取学生主信息失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
				
			},
			showModal() {
				this.$refs.picture.showModal()
			},
		},
	}
</script>

<style>
</style>
