<template>
	<div>
		<a-spin v-if="datas == null" />
		<div v-else>
			<a-card title="用户亲属表">
				<div slot="extra" v-if="canUpdate"><a-button type="primary" @click="showModal(null,2)">添加</a-button></div>
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
							<a-button type="primary">详细</a-button>
							<a-button v-if="canUpdate" type="danger" @click="showModal(item,1)" >修改</a-button>
						</div>
					</a-list-item>
				</a-list>
			</a-card>
			<StudentRelation v-if="canUpdate" @tip="tip" ref="StudentRelation" />
			<AddStudentRelation v-if="canUpdate" @tip="tip" ref="AddStudentRelation" />
		</div>
	</div>
</template>
<script>
	import StudentRelation from '@/pages/Baseinfo/person/applypage/Student-relation'
	import AddStudentRelation from '@/pages/Baseinfo/person/applypage/Add-student-relation'
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
		components: {
			StudentRelation,
			AddStudentRelation
		},
		data() {
			return {
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
				objectflags:{
					'母':'0',
					'父':'1',
					'兄':'2',
					'弟':'3',
					'姐':'4',
					'妹':'5',
					'其他':'6',
				}
			}
		},
		mounted(){
			this.fetch(this.UserId)
		},
		methods: {
			// 根据ecomm表的flag返回电子通讯的类型
			fetch(id){
				this.axios.get("/json/studentRelation/getStuRelation/" + id).then((res)=>{
					if (res.data.code == 0){
						this.datas = res.data.Relation.relationList
					}else{
						this.$emit("tip",{type:"error",text:"获取学生亲属信息失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
				
			},
			tip(data){
				this.$emit("tip",data)
			},
			showModal(value,chioce){
				if(chioce == 1){
					var obj = new Object()
					obj.relationship = Number(this.objectflags[value.relationType])
					obj.relaName = value.relationName
					this.$refs.StudentRelation.showModal(obj)
				}else{
					this.$refs.AddStudentRelation.showModal()
				}
			},
		},
	}
</script>

<style>
</style>
