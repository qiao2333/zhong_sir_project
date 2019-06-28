<template>
	<div>
		<div>
			<a-card title="通信方式表">
				<a-list bordered>
					<div slot="通信信息">Header</div>
					<a-list-item v-for="(item, index) in ecomms" :key="index">
						<a-button slot="actions" v-if="canUpdate&&item.id!=null" :loading="applyreload" @click="showModal(ecomms[index])">修改</a-button>
						<a-button slot="actions" v-if="canUpdate&&item.id==null" :loading="applyreload" @click="showModal(ecomms[index])">添加</a-button>
						<a-list-item-meta>
							<span slot="description">
								{{item.content==null?'未完善':item.content}}
							</span>
							<span slot="title">{{flags[item.flag]}}</span>
						</a-list-item-meta>
					</a-list-item>
				</a-list>
			</a-card>
			<div v-if="canUpdate">
				<Ecomm v-if="!applyreload"  @tip="tip" ref="EcommModal"></Ecomm>
			</div>
		</div>
	</div>
</template>
<script>
	import Ecomm from '@/pages/Baseinfo/person/applypage/Ecomm'
	export default {
		components: {
			Ecomm
		},
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
				applyreload:false,
				ecomms:null,
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
			}
		},
		mounted() {
			this.fetch(this.UserId)
		},
		methods: {
			fetch(id){
				this.axios.get("/json/ecomm/getEcommInformation/" + id).then((res)=>{
					if(res.data.code == 0){
						var arr = new Array()
						var datas = res.data.ecomm
						var arr1 = [{flag:0},{flag:1},{flag:2},{flag:3},{flag:4},{flag:5}]
						this.ecomms = this.$lodash.unionWith(datas,arr1,function(value,other){
							return value.flag == other.flag
						})
					}else{
						this.ecomms= [{flag:0},{flag:1},{flag:2},{flag:3},{flag:4},{flag:5}]
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			showModal(value) {
				this.applyreload = true
				setTimeout(()=>{
					this.applyreload = false
					setTimeout(()=>{
						this.$refs.EcommModal.showModal(value)
					},500)
				},1000)

			},
			handleCancel() {
				this.modal.visible = false
			},
			tip(data){
				this.$emit("tip",data)
			},
			handleOk(data) {
				this.$emit("tip", {
					type: "success",//success   error   warning
					text: "提交电子信息申请表成功！" 
				})
				this.modal.visible = false
			}
		},
	}
</script>

<style>
</style>
