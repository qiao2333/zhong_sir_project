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
			</div>
		</a-modal>
	</div>
</template>

<script>
	import addressInfo from '@/pages/BaseInfo/approvalcenter/components/components/address'
	import ecommInfo from '@/pages/BaseInfo/approvalcenter/components/components/ecomm'
	import employeeInfo from '@/pages/BaseInfo/approvalcenter/components/components/employee'
	import employeeExcelInfo from '@/pages/BaseInfo/approvalcenter/components/components/employeeExcel'
	import employeeHistoryInfo from '@/pages/BaseInfo/approvalcenter/components/components/employeeHistory'
	import learning_degreeInfo from '@/pages/BaseInfo/approvalcenter/components/components/learning_degree'
	import personInfo from '@/pages/BaseInfo/approvalcenter/components/components/person'
	import pictrueInfo from '@/pages/BaseInfo/approvalcenter/components/components/pictrue'
	import relativeInfo from '@/pages/BaseInfo/approvalcenter/components/components/relative'
	import studentInfo from '@/pages/BaseInfo/approvalcenter/components/components/student'
	import ExcelUpload from '@/pages/BaseInfo/approvalcenter/components/components/ExcelUpload'
		
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
			ExcelUpload
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
					"ExcelUpload",
					"ExcelUpload",
					"ExcelUpload",
					"ExcelUpload",
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
			getMore(record) {
				console.log(record)
				this.axios.get("/json/userinfoApplyApproval/getOldInfoAndNewInfoByApply/" + record.id).then((res) => {
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
				this.getMore(code)
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
