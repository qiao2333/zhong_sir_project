<template>
	<div>
		<div>
			<a-card title="用户亲属表">
				<div slot="extra" v-if="canUpdate"><a-button :loading="applyreload" type="primary" @click="showModal(null,2)">添加</a-button></div>
				<a-list bordered itemLayout="horizontal" >
					<div slot="header">亲属信息</div>
					<a-list-item v-for="(item, index) in datas" :key="index">
						<a-list-item-meta >
							<div slot="description">
								<p>亲属名称:{{item.relationName}}</p>
								<p>性别:{{item.relationSex}}</p>
							</div>
							<div slot="title">{{'亲属关系：' + item.relationType}}</div>
						</a-list-item-meta >
						<div>
							<a-button type="primary" @click="lookrelationInfo(item.relationUserId)" >详细</a-button>
							<a-button v-if="canUpdate" type="danger" @click="showModal(item,1)" >修改</a-button>
						</div>
					</a-list-item>
				</a-list>
			</a-card>
			<div v-if="canUpdate">
				<StudentRelation v-if="!applyreload" @tip="tip" ref="StudentRelation" />

			</div>
		</div>
	</div>
</template>
<script>
	import StudentRelation from '@/pages/Baseinfo/person/applypage/Student-relation'
	export default {
		props: {
			UserId:{
				type: Number,
				default:0
			},
			canUpdate: {
				type: Boolean,
			},
			usertype:{
				type:Number,
			}
		},
		components: {
			StudentRelation,
		},
		data() {
			return {
				applyreload:false,
				datas:null,
				flags:[
					"母",
					"父",
					"兄",
					"弟",
					"姐",
					"妹",
					"其他"
				],
				
			}
		},
		mounted(){
			this.fetch(this.UserId)
		},
		methods: {
			fetch(id){
				this.axios.get("/json/studentRelation/getStudentRelationInformation/" + id).then((res)=>{
					if (res.data.code == 0){
						console.log(res.data)
						this.datas = res.data.Relation.relationList
					}else{
						this.$emit("tip",{type:"error",text:"获取亲属信息失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			lookrelationInfo(userId){
				this.$router.push({name:'otherPerson',params:{OtherPersonType:4,OtherPersonId:userId,MyPersonType:this.usertype}})
			},
			tip(data){
				this.$emit("tip",data)
			},
			showModal(value,chioce){
				this.applyreload = true
				setTimeout(()=>{
					this.applyreload = false
					setTimeout(()=>{
						if(chioce == 1){
							this.$refs.StudentRelation.showModal(value)
						}else{
							this.$refs.StudentRelation.showModal(null)
						}
					},500)
					
				},1000)
				
			},
		},
	}
</script>

<style>
</style>
