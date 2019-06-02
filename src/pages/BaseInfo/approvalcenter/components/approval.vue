<template>
	<div>
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
				<a-select-option value="9">学生excel表</a-select-option>
				<a-select-option value="10">职员excel表</a-select-option>
			</a-select>
			<a-select v-model="searchResult" style="width: 120px" defaultValue="" placeholder="请选择审批结果">
				<a-select-option value="">未审批</a-select-option>
				<a-select-option value="true">已通过</a-select-option>
				<a-select-option value="false">不通过</a-select-option>
			</a-select>
			<a-button type="primary" @click="searchApproval()">搜索</a-button>
			<a-table rowKey="id" :columns="columns" :dataSource="datas">
				<template slot="result" slot-scope="result">
					{{result==0?"未通过":"通过"}}
				</template>
				<template slot="name" slot-scope="text,record">
				</template>
				<template slot="infoType" slot-scope="text,record">
					{{infotypes[record.infoType]}}
				</template>
				<span slot="action" slot-scope="text, record">
					<a-button size="small" @click="test(text)">测试</a-button>
					<a-button size="small" @click="showModal(record)">明细</a-button>
				</span>
			</a-table>

			<a-modal destroyOnClose :footer="null" :width="800" title="审批页面" :visible="modalvisible" @ok="hideModal" @cancel="hideModal"
			 okText="确定" cancelText="取消">
				<a-spin v-if="!infoget" />
				<div v-else>
					<a-row>
						<a-col :span="12">
							<a-card title="旧信息">
								<component :info="moreData.old_info" :is="currentComponent"></component>
							</a-card>
						</a-col>
						<a-col :span="12">
							<a-card title="新消息">
								<component :info="moreData.new_info" :is="currentComponent"></component>
							</a-card>
						</a-col>
					</a-row>
					<a-card title="申请人信息">
						<a-row>
							<a-col :span="12">
								<p>用户名:{{moreData.user_info.userName}}</p>
								<p>身份证号:{{moreData.user_info.identification}}</p>
								<p>用户性别:{{sexs[moreData.user_info.userSex]}}</p>
								<p>出生日期:{{moreData.user_info.userBirthday}}</p>
							</a-col>
							<a-col :span="12">
								<p>学校:{{moreData.user_info.universityId}}</p>
								<p>用户类型:{{types[moreData.user_info.userType]}}</p>
								<p>状态:{{states[moreData.user_info.status]}}</p>
								<p>注册日期:{{moreData.user_info.regist}}</p>
							</a-col>

							<a-col :span="24">
								<br />
								<hr />
								<div style="text-align: center;">
									申请原因:<br />
									{{moreData.reason}}
								</div>
							</a-col>
						</a-row>
					</a-card>
					<a-card title="审批记录">
						<a-list :dataSource="moreData.apply_approval">
							<a-list-item slot="renderItem" slot-scope="item, index">
								<a-list-item-meta :description="'审批意见:' + item.reason">
									<h3 slot="title">{{"第" + item.step + "步审批"}}</h3>
								</a-list-item-meta>
								<div>
									审批人:{{moreData.approversName[item.checkWho]}}<br />
									审批时间:{{item.checkTime}}<br />
									审批结果:{{item.result==true?"通过":"不通过"}}<br />
								</div>
							</a-list-item>
						</a-list>
					</a-card>

					<a-card title="审批">
						<a-row>
							<a-col span="20">
								<a-textarea style="height: 64px;" placeholder="请输入通过或不通过的理由" :autosize="{ minRows: 2, maxRows: 6 }" />
							</a-col>
							<a-col span="4">
								<a-button type="danger" @click="approvalSubmit(true)" block>不通过</a-button>
								<a-button type="primary" @click="approvalSubmit(false)" block>通过</a-button>
							</a-col>
						</a-row>
					</a-card>
				</div>
			</a-modal>
		</div>
	</div>
</template>
<script>
	const columns = [{
			dataIndex: 'userinfoApplyId',
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
			key: 'datetime',
		}, {
			title: '上一个审批人姓名',
			key: 'byWho',
		}, {
			title: '第几步审核',
			key: 'step',
		}, {
			title: '审批结果',
			key: 'result',
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
	import addressInfo from './components/address'
	import ecommInfo from './components/ecomm'
	import employeeInfo from './components/employee'
	import employeeExcelInfo from './components/employeeExcel'
	import employeeHistoryInfo from './components/employeeHistory'
	import learning_degreeInfo from './components/learning_degree'
	import personInfo from './components/person'
	import pictrueInfo from './components/pictrue'
	import relativeInfo from './components/relative'
	import studentInfo from './components/student'
	import studentExcelInfo from './components/studentExcel'
	export default {
		components: {
			addressInfo,
			ecommInfo,
			employeeInfo,
			employeeExcelInfo,
			employeeHistoryInfo,
			learning_degreeInfo,
			personInfo,
			pictrueInfo,
			relativeInfo,
			studentInfo,
			studentExcelInfo
		},
		data() {
			return {
				moreData: {
					user_info: null,
					new_info: null,
					old_info: null,
					apply_approval: [],
					approversName: [],
					Name: [],
					reason: "",
				},
				test1: "草你妈吗",
				mouduls: [
					"ecommInfo",
					"addressInfo",
					"pictrueInfo",
					"relativeInfo",
					"learning_degreeInfo",
					"employeeHistoryInfo",
					"studentInfo",
					"employeeInfo",
					"personInfo",
					"studentExcelInfo",
					"employeeExcelInfo",
				],
				currentComponent: "",
				sexs: ["女", "男", "不详"],
				types: ["游客（已注册，但身份未确认", "学生", "教职员工", "校外职员", "学生亲属", "系统运营者", "学校信息主管"],
				states: ["正常", "锁定", "作废"],
				infoget: false,
				datas: [],
				searchResult: "", //查询的业务名称
				searchType: "", //查询的业务类型
				infotypes: ["联系方式", "地址", "照片", "亲属", "学历", "简历", "学生信息", "教职工信息", "用户个人信息", "学生excel表", "职员excel表"],
				count: 0,
				columns,
				visible: false,
				modalvisible: false,
				form: this.$form.createForm(this),
			}
		},
		mounted() {},
		methods: {
			test(value) { //测试功能
				console.log(value)
			},
			openNotification(text) {
				this.$notification.open({
					message: '警告',
					description: text,
					icon: `<a-icon type = "frown" style = "color: red" / >`,
				});
			},
			async getMore(record) { //获取详细信息（新旧信息（如果旧信息没有就不显示）
				var success = false
				if (record.infoType == undefined) {
					openNotification("数据出现错误")
				} else {
					await this.$axios.get("/json/userinfoApplyApproval/getOldInfoAndNewInfoByApply/" + record.userinfoApplyId).then((
						res) => {
						console.log(res.data)
						this.moreData = res.data
						this.infoget = true
						success = true
					}).catch((err) => {
						console.log(err)
					})
				}
				if (success) {
					this.currentComponent = this.mouduls[record.infoType]
				}
				return success

			},
			approvalSubmit(ok,index) {
				if (ok) {
					this.$axios.post("/json/userinfoApply/commituserinfoApply/" + 1, {
						applyUserId: this.datas[index].applyUserId,
						byWho: this.datas[index].byWho,
						checkWho: this.datas[index].checkWho,
						infoType: this.datas[index].infoType,
						reason: this.moreData.reason,
						universityId: this.datas[index].universityId,
						userinfoApplyId: this.datas[index].userinfoApplyId
					}).then((res) => {
						console.log(res)
					}).catch((err) => {
						console.log(err)
					})
				} else {
					this.$axios.post("/json/userinfoApply/refuseuserinfoApply/" + 1,{
						applyUserId: this.datas[index].applyUserId,
						byWho: this.datas[index].byWho,
						checkWho: this.datas[index].checkWho,
						infoType: this.datas[index].infoType,
						reason: this.moreData.reason,
						universityId: this.datas[index].universityId,
						userinfoApplyId: this.datas[index].userinfoApplyId
					}).then((res) => {

					}).catch((err) => {
						console.log(err)
					})
				}


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
				this.$axios.post("/json/userinfoApplyApproval/getByRoleName", obj).then((res) => {
					console.log(res.data.apply_list)
					this.datas = res.data.apply_list
				}).catch((err) => {

				})
			},
			infoTypeflag(text) {
				console.log(this.count++)
				var s = ''
				switch (text) {

				}
				return s
			},
			showDrawer() {
				this.visible = true
			},
			async showModal(code) {
				var result = await this.getMore(code)
				if (result) {
					this.modalvisible = true
				}

			},
			onClose() {
				this.visible = false
			},
			callback(key) {
				console.log(key)
			},
			hideModal() {
				this.modalvisible = false
				this.infoget = false
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
