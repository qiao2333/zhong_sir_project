<template>
	<div class="content">
		<div style="height: 1000px;">
			<a-row>
				<a-col span="6">
					<a-input v-model="searchMessage.name">
						<span slot="addonBefore">
							<a-icon type="user" />业务名称：</span>
					</a-input>
				</a-col>
				<a-col span="6">
					<a-input v-model="searchMessage.type">
						<span slot="addonBefore">
							<a-icon type="user" />业务类型：</span>
					</a-input>
				</a-col>
				<a-col>
					<a-button icon="search" type="primary" @click="search">搜索</a-button>
					<a-button  type="primary" @click="showAddRuler">添加</a-button>
				</a-col>
			</a-row>
			<a-row>
				<a-table rowKey="id" :columns="columns" :dataSource="data" bordered>
					<template slot="operation" slot-scope="text, record, index">
						<a-button-group>
							<a-button @click="showDetial(record.id)">详细</a-button>
							<a-button @click="showUpdate(record,index)">编辑</a-button>					
							<a-popconfirm cancelText="取消" okText="确定" @confirm="deleterule(record.id,index)" title="确定删除？">
								<a-icon slot="icon" type="question-circle-o" style="color: red" />
								<a-button type="danger">删除</a-button>
							</a-popconfirm>
						</a-button-group>
					</template>
				</a-table>
			</a-row>
			<AddRulerModal @submit="addRuler" ref="addrulermodal"/>
			<DetailModal @reload="reload" @tip="tip" ref="detailmodal" />
			<UpdateModal @update="updateRuler" @tip="tip" ref="updatemodal" />
		</div>
	</div>
</template>

<script>
	const columns = [{
		title: '编号',
		dataIndex: 'id',
		key: 'id',
	}, {
		title: '审批业务名称',
		dataIndex: 'name',
		key: 'name',
	}, {
		title: '业务类型',
		dataIndex: 'type',
		key: 'type',
	}, {
		title: '所需步数',
		dataIndex: 'stepCnt',
		key:'stepCnt',
	}, {
		title: '操作',
		dataIndex: 'operation',
		scopedSlots: { customRender: 'operation' },
	}]
	import AddRulerModal from './components/addRulerModal' 
	import DetailModal from './components/detailModal'
	import UpdateModal from './components/updateRuler'
	export default {
		name:'ApplyRuler',
		components: {
			AddRulerModal,
			DetailModal,
			UpdateModal
		},
		data() {
			return {
				data: [],
				columns,
				searchMessage:{
					type:'',
					name:''
				},
			}
		},
		mounted(){
			this.fetch({})
		},
		methods: {
			fetch(data) {
				this.axios.post("/json/approvalMain/getApprovalMains",data).then((res)=>{
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"搜索成功"})
						this.data = res.data.approvalMains
					}else{
						this.$emit("tip",{type:"error",text:"搜索失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			tip(data){
				this.$emit("tip",data)
			},
			showAddRuler(){
				this.$refs.addrulermodal.showModel()
			},
			showDetial(id){
				this.$refs.detailmodal.showModel(id)
			},
			showUpdate(record,index){
				this.$refs.updatemodal.showModel(record,index)
			},
			reload(){
				this.search()
			},
			deleterule(id,index){
				this.axios.delete("/json/approvalMain/approvalMain/" + id).then((res)=>{
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"删除成功"})
						this.reload()
					}else{
						this.$emit("tip",{type:"error",text:"删除失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			updateRuler(data,id,index){
				data.id = id
				this.axios.put("/json/approvalMain/approvalMain",data).then((res)=>{
					if(res.data.code == 0){
						this.$emit("tip",{type:"success",text:"修改成功"})
						this.reload()
					}else{
						this.$emit("tip",{type:"error",text:"修改失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			search(){
				var obj = new Object()
				if (this.searchMessage.name != ""){
					obj.name = this.searchMessage.name
				}
				if (this.searchMessage.type != ""){
					obj.type = this.searchMessage.type
				}
				this.fetch(obj)
			},
			addRuler(data){
				this.axios.post("/json/approvalMain/approvalMain",data).then((res)=>{
					switch (res.data.code){
						case 0:{
							this.$emit("tip",{type:"success",text:"添加成功"})
							this.reload()
						};break;
						case -2:{
							this.$emit("tip",{type:"error",text:"添加失败,该业务名称已存在"})
						}
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			}
		},
		
	}
</script>

<style>
</style>
