<template>
	<div>
		<a-modal @cancel="handleCancel" :maskClosable="false" width="1000px" :footer="null" :visible="modal.visible">
		<span slot="title">申请修改职员页面</span>
			<a-form v-if="modal.visible" :form="myform" @submit="handleSubmit">
				<a-form-item label="员工编号">
					<a-input v-decorator="['emp_no',{rules:[{required:true, message:'员工编号不能为空'}],initialValue:forms1.emp_no}]"/>
				</a-form-item>
				<a-form-item label="所属学院">
					<a-select  @change="SubChange" :filterOption="filterDepartment" showSearch allowClear optionFilterProp="children" placeholder="请选择所属学院" 
					v-decorator="['department_id',{rules: [{ required: true, message: '亲属名称不能为空' }],initialValue:forms1.department_id}]" :options="forms1.departmentOptions">
					<a-spin v-if="forms1.departmentFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<a-form-item label="所在科室">
					<a-select allowClear @dropdownVisibleChange="handleSubDepartments" :filterOption="false" placeholder="请选择所在科室"
					v-decorator="['subdepartment_id',{rules: [{ required: true, message: '亲属名称不能为空' }],initialValue:forms1.subdepartment_id}]" :options="forms1.subdepartmentOptions">
					<a-spin v-if="forms1.subdepartmentFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<a-form-item label="主修专业">
					<a-select allowClear showSearch :filterOption="false" placeholder="请选择主修专业" @search="handleDisciplineSearch"
					v-decorator="['disciplineId',{rules: [{ required: true, message: '亲属名称不能为空' }],initialValue:forms1.disciplineId}]" :options="forms1.disciplineOptions">
					<a-spin v-if="forms1.disciplineFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<a-form-item label="政治面貌">
					<a-select allowClear placeholder="搜索游客用户，根据姓名和身份证" 
					v-decorator="['politicalId',{rules: [{ required: true, message: '亲属名称不能为空' }],initialValue:forms1.politicalId}]" :options="forms1.politicalOptions">
					<a-spin v-if="forms1.politicalFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
				<a-button-group>
					<a-button :loading="isAxios" html-type="submit" type="primary">提交</a-button>
					<a-button type="danger" @click="handleCancel">关闭</a-button>
				</a-button-group>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
	import AutoInput from '@/pages/Baseinfo/components/autoCreateForm/AutoCreateForm'
	export default {
		data() {
			return {
				myform: this.$form.createForm(this),
				info:null,
				employeeinfo:null,
				schoolId:null,
				isAxios:false,
				modal:{
					visible:false
				},
				initValue:[
					'emp_no',
					'department_id',
					'subdepartment_id',
					'disciplineId',
					'politicalId',
					'positionId',
				],
				forms1:{
					emp_no:null,
					department_id:null,
					subdepartment_id:null,
					disciplineId:null,
					politicalId:null,
					positionId:null,
					departmentFetch:false,
					subdepartmentFetch:false,
					disciplineFetch:false,
					politicalFetch:false,
					positionFetch:false,
					departmentOptions:[],
					subdepartmentOptions:[],
					disciplineOptions:[],
					politicalOptions:[],
					positionOptions:[],
				},
				forms: [
					{
						key: 1,
						label: "申请理由",
						type: "textarea",
						name: "reason",
						rules: {
							rules: [{
								required: true,
								max: 20,
								message: '请输入你的申请理由 20字符以内!',


							}],
						},
					},

				],
			}
		},
		components: {
			AutoInput
		},
		methods: {
			async showModal(info,info2){
				console.log(info)
				this.employeeinfo = info2
				this.info = info
				this.forms1.department_id = info.department.id
				this.forms1.disciplineId = info.discipline.id
				this.forms1.disciplineOptions = [{label:info.discipline.name,value:info.discipline.id}]
				this.forms1.emp_no = info.employee_no
				this.forms1.politicalId = info.political.id
				this.forms1.politicalOptions = [{label:info.political.political,value:info.political.id}]
				this.forms1.subdepartment_id = info.subdepartment.id
				this.forms1.subdepartmentOptions = [{label:info.subdepartment.name,value:info.subdepartment.id}]
				await this.fetch()
				this.modal.visible = true
			},
			fetch(){
				this.axios.get("json/employee/getSometimeInfoForApply").then((res)=>{
					console.log(res.data)
					var arr1 = new Array()
					var data1 = res.data.political
					for (var i = 0; i < data1.length; i++){
						arr1.push({label:data1[i].political,value:data1[i].id})
					}
					var arr2 = new Array()
					
					var data2 = res.data.departments
					for (var i = 0; i < data2.length; i++){
						arr2.push({label:data2[i].name,value:data2[i].id})
					}
					this.schoolId = res.data.schoolId
					this.forms1.politicalOptions = arr1
					this.forms1.departmentOptions = arr2
				}).catch((err)=>{
					console.log(err)
				})
			},
			filterDepartment(input, option){
				return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
			},
			handleDisciplineSearch(value){
				this.forms1.disciplineFetch = true
				this.forms1.disciplineOptions = []
				this.axios.get("json/employee/getDisciplinesByName?name="+value).then((res)=>{
					if(res.data.code == 0){
						var data = res.data.disciplines
						var arr = new Array()
						for (var i = 0; i < data.length; i++){
							arr.push({label:data[i].name,value:data[i].id})
						}
						this.forms1.disciplineOptions = arr
					}
					console.log(res.data)
				}).catch((err)=>{
					console.log(err)
				}).then(()=>{
					this.forms1.disciplineFetch = false

				})
			},
			SubChange(){
				this.forms1.subdepartmentOptions = []
				this.myform.setFields( {subdepartment_id: { value: null, errors: [{ "message": "修改学院后请重新选择","field": "subdepartment_id"}] } })
			},
			handleCancel(){
				this.modal.visible = false
			},
			handleSubDepartments(open){
				if(open != true){
					return;
				}
				if (this.forms1.subdepartmentOptions.length > 0){
					return;
				}
				this.forms1.subdepartmentFetch = true
				var department_id = this.myform.getFieldValue("department_id")
				this.axios.get("json/employee/employee/getSubDepartments?schoolId=" + this.schoolId + "&departmentId=" + department_id).then((res)=>{
					console.log(res.data)
					if(res.data.code == 0){
						var data = res.data.Subdepartments
						var arr = new Array()
						for(var i = 0; i < data.length; i++){
							arr.push({label:data[i].name,value:data[i].id})
						}
						this.forms1.subdepartmentOptions = arr
					}
				}).catch((err)=>{
					console.log(err)
				}).then(()=>{
					this.forms1.subdepartmentFetch = false
				})
			},
			handleSubmit(e){
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						this.isAxios = true
						console.log(this.employeeinfo)
						console.log(this.myform.getFieldsValue())
						var formvalue = this.myform.getFieldsValue()
						var obj = new Object()
						obj.type = 7
						obj.reason = formvalue.reason
						obj.modifiedUserId = this.employeeinfo.userId
						obj.applyEmployee = {
							id: this.employeeinfo.id,
							empNo: formvalue.emp_no,
							departmentId: formvalue.department_id,
							subdepartmentId: formvalue.subdepartment_id,
							disciplineId: formvalue.disciplineId,
							politicalId: formvalue.politicalId,
						}
						
						
						
						this.axios.post("/json/userinfoApply/applyModifyNoneFile",obj).then((res)=>{
							console.log(res.data)
							if(res.code.code == 0){
								this.$emit("tip",{type:'success',text:'申请修改职员信息成功'})
							}else{
								this.$emit("tip",{type:'error',text:'申请修改职员信息失败'})
							}
						}).catch((err)=>{
							this.$emit("tip",{type:'warning',text:'发生未知错误'})
						}).then(()=>{
							this.isAxios = false
							this.modal.visible = false

						})
					}
				});
			}
		},

	}
</script>

<style>
</style>
