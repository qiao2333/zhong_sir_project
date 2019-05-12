<template>
	<div>
		<a-card title="用户亲属表">
			<a-list bordered itemLayout="horizontal" >
				<div slot="header">亲属信息</div>
				<div slot="footer"><a-button type="primary">添加</a-button></div>
				<a-list-item v-for="(item, index) in datas" :key="index">
					<a-list-item-meta :description="'亲属名称：' + item.name">
						<a-button slot="extra" @click="showModal(studentRelations[index])" >修改</a-button>
						<div slot="title">{{item.relationship}}</div>
					</a-list-item-meta >
					<div><a-button type="primary">详细</a-button><a-button type="danger">修改</a-button></div>
				</a-list-item>
			</a-list>
		</a-card>
		<a-modal width="1000px" @ok="handleOk" @cancel="handleCancel" :visible="visible">
			<StudentRelation ref="StudentRelation" v-if="visible" :oldvalue="oldvalue"></StudentRelation>
		</a-modal>
	</div>
</template>
<script>
	import StudentRelation from '@/pages/applypage/Student-relation'
	export default {
		props: ['studentRelations'],
		components: {
			StudentRelation
		},
		data() {
			return {
				datas:[],
				oldvalue:null,
				visible:false
			}
		},
		mounted(){
			for(var e of this.studentRelations){
				var object = {
					name: e.relaName,
					relationship: "亲属关系：" +  this.flag(e.relationship)
				}
				console.log(object)
				this.datas.push(object)
			}
		},
		methods: {
			// 根据ecomm表的flag返回电子通讯的类型
			flag(data){
				var s = ""
				switch(data){
					case 0:s = "母";break;
					case 1:s = "父";break;
					case 2:s = "兄";break;
					case 3:s = "弟";break;
					case 4:s = "姐";break;
					case 5:s = "妹";break;
					case 6:s = "其他";break;
				}
				return s
			},
			showModal(value){
				this.oldvalue = value
				this.visible = false
			},
			handleOk(){
				console.log(this.$refs.StudentRelation.myform.getFieldsValue())
				this.visible = false
			},
			handleCancel(){
				this.visible = false
			}
		},
	}
</script>

<style>
</style>
