<template>
	<div>
		<a-modal :footer="null" :maskClosable="false" :width="1000" title="审批页面" :visible="modal.visible" @ok="hideModal" @cancel="hideModal" okText="确定"
		 cancelText="取消">
			<a-spin v-if="!infoget" />
			<div v-else>
				<a-row>
					<template v-if="moreData.old_info==null">
						<a-col :span="24">
							<a-card title="消息">
								<component :info="moreData.new_info" :is="currentComponent"></component>
							</a-card>
						</a-col>
					</template>
					<template v-else>
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
					</template>

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
								审批人:{{moreData.approversName[index]}}<br />
								审批时间:{{item.checkTime}}<br />
								审批结果:{{item.result==true?"通过":"不通过"}}<br />
							</div>
						</a-list-item>
					</a-list>
				</a-card>
				<a-card title="审批">
					<a-row>
						<a-col span="20">
							<a-textarea v-model="postMessage.Reason" style="height: 64px;" placeholder="请输入通过或不通过的理由" :autosize="{ minRows: 2, maxRows: 6 }" />
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
</template>

<script>
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
					
				},
				postMessage:{
					Reason: "",
					flag:0,
					approval_id:0,
				},
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
				modal:{
					visible: false,
				},
				infoget: false,
				currentComponent: "",
				infotypes: ["联系方式", "地址", "照片", "亲属", "学历", "简历", "学生信息", "教职工信息", "用户个人信息", "学生excel表", "职员excel表"],
				sexs: ["女", "男", "不详"],
				types: ["游客（已注册，但身份未确认", "学生", "教职员工", "校外职员", "学生亲属", "系统运营者", "学校信息主管"],
				states: ["正常", "锁定", "作废"],
			}
		},
		methods: {
			getMore(record) { //获取详细信息（新旧信息（如果旧信息没有就不显示）
				this.axios.get("/json/userinfoApplyApproval/getOldInfoAndNewInfoByApply/" + record.userinfoApplyId).then((
					res) => {
					if (res.data.code == 0){
						this.moreData = res.data
						this.infoget = true
						this.$emit("tip",{type:"success",text:"获取详细信息成功"})
						this.currentComponent = this.mouduls[record.infoType]
						this.modal.visible = true
					}else{
						this.$emit("tip",{type:"error",text:"获取详细信息失败"})
						this.hideModal()
					}
				}).catch((err) => {
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			showModal(code) {
				console.log(code)
				this.postMessage.approval_id = code.id
				this.getMore(code)
			},
			approvalSubmit(ok) {
				this.postMessage.flag = ok?1:0
				this.axios.put("/json/student/judgeApply", this.postMessage).then((res) => {
					console.log(this.postMessage)
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"审批提交完毕"})
						this.$emit("reload")
					}else{
						this.$emit("tip",{type:"warning",text:"审批提交失败"})
					}
				}).catch((err) => {
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
				this.hideModal()
			},
			hideModal() {
				this.modal.visible = false
				this.infoget = false
			},
		},
	}
</script>

<style>
</style>
