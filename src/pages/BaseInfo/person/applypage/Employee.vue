<template>
	<div>
		<a-modal @cancel="handleCancel" :maskClosable="false" width="1000px" :footer="null" :visible="modal.visible">
		<span slot="title">申请修改职员页面</span>
			<a-form v-if="modal.visible" :form="myform" @submit="handleSubmit">
				<a-form-item label="员工编号">
					<a-input v-decorator="['emp_no',{rules:[{required:true, message:'员工编号不能为空'}],initialValue:forms1.emp_no}]"/>
				</a-form-item>
				<a-form-item label="所属学院">
					<a-select allowClear showSearch :filterOption="false" placeholder="请选择所属学院" @search="handleSearch"
					v-decorator="['department_id',{rules: [{ required: true, message: '亲属名称不能为空' }],initialValue:forms1.department_id}]" :options="forms1.departmentOptions">
					<a-spin v-if="forms1.departmentFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<a-form-item label="所在科室">
					<a-select allowClear showSearch :filterOption="false" placeholder="请选择所在科室" @search="handleSearch"
					v-decorator="['subdepartment_id',{rules: [{ required: true, message: '亲属名称不能为空' }],initialValue:forms1.subdepartment_id}]" :options="forms1.subdepartmentOptions">
					<a-spin v-if="forms1.subdepartmentFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<a-form-item label="主修专业">
					<a-select allowClear showSearch :filterOption="false" placeholder="请选择主修专业" @search="handleSearch"
					v-decorator="['disciplineId',{rules: [{ required: true, message: '亲属名称不能为空' }],initialValue:forms1.disciplineId}]" :options="forms1.disciplineOptions">
					<a-spin v-if="forms1.disciplineFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<a-form-item label="政治面貌">
					<a-select allowClear showSearch :filterOption="false" placeholder="搜索游客用户，根据姓名和身份证" @search="handleSearch"
					v-decorator="['politicalId',{rules: [{ required: true, message: '亲属名称不能为空' }],initialValue:forms1.politicalId}]" :options="forms1.politicalOptions">
					<a-spin v-if="forms1.politicalFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<a-form-item label="行政岗位">
					<a-select allowClear showSearch :filterOption="false" placeholder="搜索游客用户，根据姓名和身份证" @search="handleSearch"
					v-decorator="['positionId',{rules: [{ required: true, message: '亲属名称不能为空' }],initialValue:forms1.positionId}]" :options="forms1.positionOptions">
					<a-spin v-if="forms1.positionFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
				<a-button-group>
					<a-button html-type="submit" type="primary">提交</a-button>
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
			showModal(info){
				for (var s of this.initValue){
					this.forms1[s] = info[s]
				}
				this.modal.visible = true
			},
			handleCancel(){
				this.modal.visible = false
			},
			handleSearch(){
				
			},
			handleSubmit(){
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						console.log(this.myform.getFieldsValue())
						this.modal.visible = false
					}
				});
			}
		},

	}
</script>

<style>
</style>
