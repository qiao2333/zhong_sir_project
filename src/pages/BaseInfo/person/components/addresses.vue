<template>
	<div>
		<div>
			<a-card title="地址信息">
				<a-list bordered>
					<a-list-item v-for="(item, index) in address" :key="index">
							<a-button slot="actions" type="primary" :loading="applyreload" v-if="canUpdate" @click="showModal(item)">{{item[0]==null?'添加':'修改'}}</a-button>
							<a-list-item-meta >
								<a slot="title" >{{flags[item[8].flag]}}</a>
								<div slot="description" v-if="item[0] == null">
									没有该地址信息
								</div>
								<div v-else slot="description">
									地址:{{item[0].name + item[1].name  + item[2].name  + item[3].name +item[4].name }}<br />
									详细:{{item[5].detail}}<br />
									邮政编码:{{item[6].zip_code}}<br />
									联系电话:{{item[7].telephone}}<br />
								</div>
							</a-list-item-meta>
						
					</a-list-item>
				</a-list>
			</a-card>
			<div v-if="canUpdate">
				<Address v-if="!applyreload"  @tip="tip" ref="addressModal"></Address>
			</div>
		</div>
	</div>
</template>

<script>
	import Address from "@/pages/Baseinfo/person/applypage/Address"
	export default {
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
				address:null,
				count: 0,
				hasload: false,
				applyreload:false,
				modal:{
					visible: false,
				},
				flags:[
					'当前住址',
					'收件地址',
					'曾经住址',
					'通信地址',
					'办公地址',
				]
			}
		},
		components: {
			Address
		},
		mounted() {
			this.fetch(this.UserId)
		},
		methods: {	
			fetch(id){
				this.axios.get("json/address/getAddressInformation/" + id).then((res)=>{
					var objs = [[],[],[],[],[]]
					for (var i = 0; i < 5; i++){
						objs[i][8] = {flag:i}
					}
					if(res.data.code == 0){
						this.address = this.$lodash.unionWith(res.data.address,objs,function(value,other){
							return value[8].flag == other[8].flag
						})
					}else{
						this.address = objs
					}
				}).catch((err)=>{
					
				})
			},
			showModal(item) {
				this.applyreload = true
				setTimeout(()=>{
					this.applyreload = false
					var object = null
					if(item[0]!=null){
						object = {
							flag: item[8].flag,
							address: [item[0].code, item[1].code, item[2].code, item[3].code, item[4].code],
							detail: item[5].detail,
							zipCode: item[6].zip_code,
							telephone: item[7].telephone,
						}
					}else{
						object = {
							flag: item[8].flag,
						}
					}
					setTimeout(()=>{
						this.$refs.addressModal.showModal(object)
					},500)
				},1000)
			},
			handleCancel() {
				this.visible = false
			},
			handleOk() {
				this.visible = false
			},
			tip(data){
				this.$emit("tip",data)
			},
		},
	}
</script>

<style>
</style>
