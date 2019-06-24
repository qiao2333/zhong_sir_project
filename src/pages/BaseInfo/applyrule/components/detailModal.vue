<template>
	<div>
		<a-modal :footer="null" :maskClosable="false" width="1000px" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title">审批规定详情<a-button @click="showAddDetail">新增审批步骤</a-button></span>
			<div>
				<a-table rowKey="id" :columns="columns" :dataSource="data" bordered>
					<template slot="operation" slot-scope="text, record, index">
						<a-button @click="showUpdatedetail(record,index)">编辑</a-button>
						<a-popconfirm cancelText="取消" okText="确定" @confirm="deletedetail(record.id,index)" title="确定删除？">
							<a-icon slot="icon" type="question-circle-o" style="color: red" />
							<a-button :disabled="data.length == index + 1? false:true">删除</a-button>
						</a-popconfirm>
					</template>
					<template slot="step" slot-scope="text">
						<span>第{{text}}步</span>
					</template>
					<template slot="role" slot-scope="text, record, index">
						<span>{{rolesName[record.roleId]}}</span>
					</template>
				</a-table>
			</div>
			<a-button block type="danger" @click="handleCancel">关闭</a-button>
		</a-modal>
		<UpdateDetail @update="updateDetail" :roles="roles" ref="updatedetail" />
		<AddDetail @add="addDetail" :roles="roles" ref="adddetail" />
	</div>
</template>

<script>
	const columns = [{
		title: '编号',
		dataIndex: 'id',
		key: 'id',
	}, {
		title: '审批步骤说明',
		dataIndex: 'name',
		key: 'name',
	}, {
		title: '步骤',
		dataIndex: 'step',
		key: 'step',
		scopedSlots: {
			customRender: 'step'
		},
	}, {
		title: '角色',
		dataIndex: 'role',
		scopedSlots: {
			customRender: 'role'
		},
	}, {
		title: '操作',
		dataIndex: 'operation',
		scopedSlots: {
			customRender: 'operation'
		},
	}]
	import UpdateDetail from './updateDetail'
	import AddDetail from './addDetail'
	export default {
		data() {
			return {
				data: [],
				rolesName: null,
				columns,
				id:0,
				needReload:false,
				roles:null,
				modal: {
					visible: false,
				}
			}
		},
		components: {
			UpdateDetail,
			AddDetail
		},
		methods: {
			async showModel(id) {
				this.needReload = false
				await this.fetch(id)
				this.id = id
				this.modal.visible = true
			},
			fetch(id) {
				this.axios.get("/json/approvalStepIncharge/approvalStepIncharge/list/" + id).then((res) => {
					if (res.data.code == 0) {
						this.$emit("tip", {
							type: "success",
							text: "获取详情信息成功"
						})
						this.rolesOperation(res.data.roles)
						this.data = res.data.approvalStepIncharges
						this.roles = res.data.roles
					} else {
						this.$emit("tip", {
							type: "error",
							text: "获取信息错误"
						})
					}
				}).catch((err) => {
					this.$emit("tip", {
						type: "warning",
						text: "发生未知错误"
					})
				})
			},
			showUpdatedetail(record,index){
				this.$refs.updatedetail.showModel(record,index)
			},
			showAddDetail(){
				this.$refs.adddetail.showModel()
			},
			reload(){
				this.fetch(this.id)
			},
			addDetail(data,roleId){
				data.approvalMainId = this.id
				this.axios.post("/json/approvalStepIncharge/approvalStepIncharge",data).then((res)=>{
					if (res.data.code == 0) {
						this.$emit("tip", {
							type: "success",
							text: "添加成功",
						})
						this.needReload = true
						this.reload()
					} else {
						this.$emit("tip", {
							type: "error",
							text: "添加失败"
						})
					}
				}).catch((err)=>{
					this.$emit("tip", {
						type: "warning",
						text: "发生未知错误"
					})
				})
			},
			updateDetail(data,id,index){
				data.id = id
				this.axios.put("/json/approvalStepIncharge/approvalStepIncharge",data).then((res)=>{
					if (res.data.code == 0) {
						this.$emit("tip", {
							type: "success",
							text: "修改成功",
						})
						this.needReload = true
						this.reload()
					} else {
						this.$emit("tip", {
							type: "error",
							text: "删除失败"
						})
					}
				}).catch((err) => {
					this.$emit("tip", {
						type: "warning",
						text: "发生未知错误"
					})
				})
			},
			rolesOperation(roles) {
				var obj = new Object()
				for (var i = 0; i < roles.length; i++) {
					obj[roles[i].id] = roles[i].name
				}
				this.rolesName = obj
			},
			handleCancel() {
				if (this.needReload){
					this.$emit("reload")
				}
				this.modal.visible = false
			},
		},
	}
</script>

<style>
</style>
