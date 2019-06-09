<template>
	<div>
		<a-card title="用户亲属表">
			<div slot="extra"><a-button type="primary" @click="showModal(null,2)">添加</a-button></div>
			<a-list bordered itemLayout="horizontal" >
				<div slot="header">亲属信息</div>
				
				<a-list-item v-for="(item, index) in datas" :key="index">
					<a-list-item-meta :description="'亲属名称：' + item.name">
						<div slot="title">{{item.relationship}}</div>
					</a-list-item-meta >
					<div><a-button type="primary">详细</a-button><a-button type="danger" @click="showModal(studentRelations[index],1)" >修改</a-button></div>
				</a-list-item>
			</a-list>
		</a-card>
		<StudentRelation @tip="tip" ref="StudentRelation" />
		<AddStudentRelation @tip="tip" ref="AddStudentRelation" />
	</div>
</template>
<script>
	import StudentRelation from '@/pages/Baseinfo/person/applypage/Student-relation'
	import AddStudentRelation from '@/pages/Baseinfo/person/applypage/Add-student-relation'
	export default {
		props: ['studentRelations'],
		components: {
			StudentRelation,
			AddStudentRelation
		},
		data() {
			return {
				datas:[],
				flags:[
					"母",
					"父",
					"兄",
					"弟",
					"姐",
					"妹",
					"其他"
				]
			}
		},
		mounted(){
			for(var e of this.studentRelations){
				var object = {
					name: e.relaName,
					relationship: "亲属关系：" +  this.flags[e.relationship]
				}
				this.datas.push(object)
			}
		},
		methods: {
			// 根据ecomm表的flag返回电子通讯的类型
			tip(data){
				this.$emit("tip",data)
			},
			showModal(value,chioce){
				if(chioce == 1){
					this.$refs.StudentRelation.showModal(value)
				}else{
					this.$refs.AddStudentRelation.showModal()
				}
			},
		},
	}
</script>

<style>
</style>
