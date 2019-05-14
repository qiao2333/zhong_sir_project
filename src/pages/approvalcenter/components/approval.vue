<!--
	作者：1558684603@qq.com
	时间：2019-05-10
	描述：业务名称，申请人姓名，申请时间，上一个审批人姓名，第几步审核，审批结果，按钮（详情）
		提供业务名称筛选（选择下拉框），审批结果，申请人姓名（模糊查询）
		审批中心的详情页面内容说明：显示业务名称，申请人姓名、（如果有旧的记录，就分别在左边和右边显示旧的、新的记录），
		中间下方申请理由，每一步的审核结果、审核人姓名、审核时间、按钮（确认通过）、按钮（不通过），通过或不通过的原因
-->
<template>
	<div>
		<a-spin v-if="hasload" />
		<div v-else>
			<a-input ></a-input>
			<a-table :columns="columns" :dataSource="datas">
				<template slot="infoType" slot-scope="infoType">
					{{infoType}}
				</template>
				<template slot="applyResult" slot-scope="applyResult">
					{{applyResult==0?"未通过":"通过"}}
				</template>
				<span slot="action" slot-scope="text, record">
					<a-button size="small" @click="showModal">明细</a-button>
				</span>
			</a-table>

			<a-modal title="Modal" :visible="modalvisible" @ok="hideModal" @cancel="hideModal" okText="确定" cancelText="取消">
				<a-tabs @change="callback" type="card">
					<a-tab-pane tab="历史记录" key="1">
						<a-list bordered :dataSource="data">
							<a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
						</a-list>
					</a-tab-pane>
					<a-tab-pane tab="审核结果" key="2">
						<div id="">
							<a-input placeholder="申请人姓名" /><br><br>
							<a-input placeholder="审核结果" /><br><br>
							<a-input placeholder="审核人" /><br><br>
							<a-input placeholder="审核时间" /><br><br>
							<a-textarea placeholder="申请理由" :autosize="{ minRows: 2, maxRows: 6 }" />
							<a-textarea placeholder="处理意见" :autosize="{ minRows: 2, maxRows: 6 }" />
							<a-button type="danger">不通过</a-button>
							<a-button type="primary">通过</a-button>
						</div>
					</a-tab-pane>
					<a-tab-pane tab="申请记录" key="3">
						<a-list bordered :dataSource="data">
							<a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
						</a-list>
					</a-tab-pane>
				</a-tabs>
			</a-modal>
		</div>
	</div>
</template>
<script>
	const columns = [{
		dataIndex: 'name',
		key: 'name',
		title: '申请人姓名',
		
	}, {
		dataIndex: 'infoType',
		key: 'infoType',
		title: '业务类型',
		scopedSlots: {
			customRender: 'infoType'
		},
	}, {
		title: '申请时间',
		dataIndex: 'startTime',
		key: 'startTime',
	}, {
		title: '上一个审批人姓名',
		dataIndex: 'checkWho',
		key: 'checkWho',
	}, {
		title: '第几步审核',
		dataIndex: 'next',
		key: 'next',
	}, {
		title: '审批结果',
		key: 'applyResult',
		dataIndex: 'applyResult',
		scopedSlots: {
			customRender: 'applyResult'
		},
	}, {
		title: '详情',
		key: 'action',
		scopedSlots: {
			customRender: 'action'
		},
	}];
	
	export default {
		props: {
		},
		data() {
			return {
				data:[],
				hasload:true,
				datas:[],
				infotypes:["联系方式","地址", "照片", "亲属", "学历", "简历", "学生信息", "教职工信息", "用户个人信息", "学生excel表", "职员excel表" ],
				count: 0,
				columns,
				visible: false,
				modalvisible: false,
				form: this.$form.createForm(this),
			}
		},
		mounted() {
			this.fetch()
		},
		methods: {
			fetch(){
				this.$axios.get("/approval").then((res)=>{
					console.log(res.data[0].approvalInfo)
					this.datas = res.data[0].approvalInfo
					this.hasload = false
				}).catch((err)=>{
					console.log(err)
				})
				
			},
			infoTypeflag(text){
				console.log(this.count++)
				var s = ''
				switch(text){
					
				}
				return s
			},
			showDrawer() {
				this.visible = true
			},
			showModal() {
				this.modalvisible = true
			},
			onClose() {
				this.visible = false
			},
			callback(key) {
				console.log(key)
			},
			hideModal() {
				this.modalvisible = false
			},
			handleChange(value) {
				console.log(`Selected: ${value}`);
			},
			popupScroll() {
				console.log('popupScroll')
			},
		},
	}
</script>
