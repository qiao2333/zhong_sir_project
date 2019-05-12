<template>
	<div>
		<a-card title="用户亲属表">
			<a-list bordered itemLayout="horizontal" >
				<div slot="header">亲属信息</div>
				<div slot="footer"><a-button type="primary" @click="showModal(null,2)">添加</a-button></div>
				<a-list-item v-for="(item, index) in datas" :key="index">
					<a-list-item-meta :description="'亲属名称：' + item.name">
						<div slot="title">{{item.relationship}}</div>
					</a-list-item-meta >
					<div><a-button type="primary">详细</a-button><a-button type="danger" @click="showModal(studentRelations[index],1)" >修改</a-button></div>
				</a-list-item>
			</a-list>
		</a-card>
		<a-modal width="1000px" @ok="handleOk" @cancel="handleCancel" :visible="visible">
			<template v-if="AddOrUpdate">
				<StudentRelation ref="StudentRelation"  :oldvalue="oldvalue"></StudentRelation>
			</template>
			<template v-else>
				<AddStudentRelation ref="AddStudentRelation"></AddStudentRelation>
			</template>
		</a-modal>
	</div>
</template>
<script>
	import StudentRelation from '@/pages/applypage/Student-relation'
	import AddStudentRelation from '@/pages/applypage/Add-student-relation'
	export default {
		props: ['studentRelations'],
		components: {
			StudentRelation,
			AddStudentRelation
		},
		data() {
			return {
				datas:[],
				oldvalue:null,
				visible:false,
				AddOrUpdate:false
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
			showModal(value,chioce){
				if(chioce == 1){
					this.AddOrUpdate = true
					this.oldvalue = value
				}else{
					this.AddOrUpdate = false
				}
				
				this.visible = true
			},
			handleOk(){
				if(this.AddOrUpdate == 1){
					console.log(this.$refs.StudentRelation.myform.getFieldsValue())
				}else{
					console.log(this.$refs.AddStudentRelation.myform.getFieldsValue())
				}
				
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
