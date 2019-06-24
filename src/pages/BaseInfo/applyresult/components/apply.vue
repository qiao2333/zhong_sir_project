<template>
	<div class="content">
		<div style="width: auto;background: #fff;">
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
			<a-button @click="search" type="primary" html-type="button">搜索</a-button>
		</div>
		<a-table :loading="tableloading" rowKey="id" :columns="columns" :dataSource="datas1">
			<span slot="infoType" slot-scope="text, record">{{types[text]}}</span>
			<span slot="action" slot-scope="text, record">
				<a-button size="small" @click="showApprovalModal(record)">明细</a-button>
			</span>
		</a-table>
		<applyResultModal @reload="reload" @tip="tip" ref="approvalModal" />
	</div>

</template>

<script>
	import applyResultModal from "./applyResultModal"
	const columns = [{
			title: '编号',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '业务类型',
			dataIndex: 'infoType',
			key: 'infoType',
			scopedSlots: { customRender: 'infoType' },
		},
		{
			title: '开始时间',
			dataIndex: 'startTime',
			key: 'startTime',
		}, {
			title: '结束时间',
			dataIndex: 'endTime',
			key: 'endTime',
		}, {
			title: '申请结果',
			key: 'applyResult',
			dataIndex: 'applyResult',
		}, {
			title: '详情',
			key: 'action',
			scopedSlots: {
				customRender: 'action'
			},
		}
	];

	export default {
		components: {
			applyResultModal
		},
		data() {
			return {
				columns,
				visible: false,
				datas: [],
				datas1: [],
				searchType: '',
				searchResult: '',
				tableloading: false,
				types: [
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
			}
		},
		methods: {
			fetch(data) {
				this.tableloading = true
				this.axios.post('json/userinfoApply/userinfoApplys/listAll', data).then((res) => {
					if (res.data.code == 0) {
						console.log(res.data)
						this.datas1 = res.data.userinfoApplys
					} else {
						this.$emit("tip", {
							type: "error",
							text: "获取失败"
						})
					}
				}).catch((err) => {
					console.log(err)
				}).then(() => {
					this.tableloading = false
				})
			},
			showApprovalModal(data) {
				this.$refs.approvalModal.showModal(data)
			},
			search() {
				var data = new Object()
				if (this.searchResult != '') {
					data.result = Boolean(this.searchResult)
				}
				if (this.searchType != '') {
					data.type = Number(this.searchType)
				}
				this.fetch(data)
			},
			reload() {

			},
			tip(data) {
				this.$emit("tip", data)
			},
		}

	}
</script>
