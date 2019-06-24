<template>
	<div class="content">
		<div style="height: 1000px;">
			<div>
				<a-select v-model="searchType" defaultValue="" style="width: 120px" placeholder="请选择审批类型">
					<a-select-option value="">所有</a-select-option>
					<a-select-option value="0">联系方式</a-select-option>
					<a-select-option value="1">地址</a-select-option>
					<a-select-option value="2">照片</a-select-option>
					<a-select-option value="3">亲属</a-select-option>
					<a-select-option value="4">学历</a-select-option>
					<a-select-option value="5">简历</a-select-option>
					<a-select-option value="6">学生信息</a-select-option>
					<a-select-option value="7">教职工信息</a-select-option>
					<a-select-option value="8">用户个人信息</a-select-option>
					<a-select-option value="9">批量更新学生账号</a-select-option>
					<a-select-option value="10">批量更新职员账号</a-select-option>
					<a-select-option value="11">批量添加学生账号</a-select-option>
					<a-select-option value="12">批量添加职员账号</a-select-option>
				</a-select>
				<a-select v-model="searchResult" style="width: 120px" defaultValue="" placeholder="请选择审批结果">
					<a-select-option value="">未审批</a-select-option>
					<a-select-option value="true">已通过</a-select-option>
					<a-select-option value="false">不通过</a-select-option>
				</a-select>
				<a-button type="primary" @click="searchApproval()">搜索</a-button>
				<a-table rowKey="id" :columns="columns" :dataSource="datas">
					<template slot="result" slot-scope="text,record">
						{{text==null?"未审批":(text==true?"通过":"不通过")}}
					</template>
					<template slot="name" slot-scope="text,record,index">
						{{userNames[index]}}
					</template>
					<template slot="step" slot-scope="text,record">
						第{{record.step}}步
					</template>
					<template slot="infoType" slot-scope="text,record">
						{{infotypes[record.infoType]}}
					</template>
					<span slot="action" slot-scope="text, record">
						<a-button size="small" @click="showApprovalModal(record)">明细</a-button>
					</span>
				</a-table>
			</div>
			<ApprovalModal @reload="reload" @tip="tip" ref="approvalModal" />
		</div>
	</div>
</template>
<script>
	const columns = [{
			key: 'userinfoApplyId',
			dataIndex: 'userinfoApplyId',
			title: '编号',
		},
		{
			dataIndex: 'name',
			key: 'name',
			title: '申请人姓名',
			scopedSlots: {
				customRender: 'name'
			},
		}, {
			dataIndex: 'infoType',
			key: 'infoType',
			title: '业务名称',
			scopedSlots: {
				customRender: 'infoType'
			},
		}, {
			title: '申请时间',
			dataIndex:'datetime',
		}, {
			dataIndex: 'step',
			key: 'step',
			title: '第几步审核',
			scopedSlots: {
				customRender: 'step'
			},
		}, {
			dataIndex: 'result',
			key: 'result',
			title: '审批结果',
			scopedSlots: {
				customRender: 'result'
			},
		}, {
			title: '详情',
			key: 'action',
			scopedSlots: {
				customRender: 'action'
			},
		}
	];
	import ApprovalModal from './components/approvalModal'
	export default {
		name:'Approvalcenter',
		components: {
			ApprovalModal
		},
		data() {
			return {
				sexs: ["女", "男", "不详"],
				types: ["游客（已注册，但身份未确认", "学生", "教职员工", "校外职员", "学生亲属", "系统运营者", "学校信息主管"],
				states: ["正常", "锁定", "作废"],
				datas: [],
				userNames:[],
				searchResult: "", //查询的业务名称
				searchType: "", //查询的业务类型
				infotypes: [
					'联系方式',
					'地址',
					'照片',
					'亲属',
					'学历',
					'简历',
					'学生信息',
					'教职工信息',
					'用户个人信息',
					'批量更新学生账号',
					'批量更新职员账号',
					'批量添加学生账号',
					'批量添加职员账号',
				],
				columns,
			}
		},
		mounted() {
			this.fetch({})
		},
		
		methods: {
			fetch(obj){
				this.axios.post("/json/userinfoApplyApproval/getByRoleName", obj).then((res) => {
					console.log(res.data.apply_list)
					this.datas = res.data.apply_list
					this.userNames = res.data.Name
					this.$emit("tip",{type:"success",text:"获取成功"})
				}).catch((err) => {
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			reload(){
				this.searchApproval()
			},
			tip(data){
				this.$emit("tip",data)
			},
			showApprovalModal(data){
				this.$refs.approvalModal.showModal(data)
			},
			searchApproval() {
				var obj = new Object()
				obj.universityId = 1
				if (this.searchType != "") {
					obj.infoType = Number(this.searchType)
				}
				if (this.searchResult != "") {
					if (this.searchResult == "true") {
						obj.result = true
					} else {
						obj.result = false
					}
				}
				this.fetch(obj)
			},
		},
	}
</script>
