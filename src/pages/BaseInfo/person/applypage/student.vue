<template>
	<div>
		<a-modal  :maskClosable="false" width="1000px" :footer="null" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title">申请修改学生主要信息页面</span>
			<a-form v-if="modal.visible" @submit="handleSubmit"  :form="myform" >
				<a-form-item label="学号">
					<a-input type="text" v-decorator="['stuNo',{rules: [{ required: true, message: '请输入正确的学号' }],initialValue:initValue.stuNo}]"/>
				</a-form-item>
				<a-form-item label="入学日期">
					<a-date-picker showTime v-decorator="['beginLearnDate',{rules: [{ required: true, message: '入学日期不能为空' }],initialValue:initValue.beginLearnDate}]"
					 format="YYYY-MM-DD hh:mm:ss" />
				</a-form-item>
				<a-form-item  label="年级">
					<a-input @change="handleChange()" v-decorator="['grade',{rules: [{ required: true,pattern: /^\d{1,4}$/g, message: '请输入年级' }],initialValue:initValue.grade}]"></a-input>
				</a-form-item>
				<a-form-item label="主修专业">
					<a-select @change="handleChange()" @search="searchSpecialty" showSearch placeholder="请选择主修专业" allowClear v-decorator="['specialtyId',{rules: [{ required: true, message: '主修专业不能为空' }],initialValue:initValue.specialtyId}]"
					:filterOption="false" :options="forms.specialtyOptions">
					<a-spin v-if="forms.specialtyOptionsFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<a-form-item label="专业班级">
					<a-select @dropdownVisibleChange="getClass" allowClear  v-decorator="['classId',{rules: [{ required: true, message: '专业班级不能为空' }],initialValue:initValue.classId}]"
					:options="forms.classOptions">
					<a-spin v-if="forms.classOptionsFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<a-form-item label="政治面貌">
					<a-select allowClear v-decorator="['politicalId',{rules: [{ required: true, message: '政治面貌不能为空' }],initialValue:initValue.politicalId}]"
					:options="forms.politicalOptions">
					<a-spin v-if="forms.politicalOptionsFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<a-form-item label="申请理由">
					<a-input type="textarea" v-decorator="['reason',{rules: [{ required: true, message: '请输入申请理由' }]}]"/>
				</a-form-item>
				<a-button-group>
					<a-button html-type="submit" type="primary">提交</a-button>
					<a-button type="danger" @click="handleCancel()">关闭</a-button>
				</a-button-group>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
	export default{
		data() {
			this.searchSpecialty = this.$lodash.debounce(this.searchSpecialty, 800)
			this.handleChange = this.$lodash.debounce(this.handleChange, 800)
			return {
				myform: this.$form.createForm(this),
				studentInfo:null,
				initValue:{
					begin_learn_date:null,
					grade:0,
					stu_no:0,
					specialtyId:0,
					class_id:0,
					political_id:0,
				},
				modal:{
					visible:false,
				},
				forms:{
					politicalOptionsFetch:false,
					specialtyOptionsFetch:false,
					classOptionsFetch:false,
					politicalOptions:[],
					specialtyOptions:[],
					classOptions:[]
				},
				
			}
		},
		methods: {
			fetch(){
				this.axios.get("/json/student/getSometimeInfoForApply").then((res)=>{
					if(res.data.code == 0){
						console.log(res.data)
						this.forms.politicalOptionsFetch = true
						var arr2 = res.data.political
						var politicalOptions = new Array()
						for (var i = 0; i < arr2.length; i++){
							politicalOptions.push({label:arr2[i].political , value:arr2[i].id })
						}
						this.forms.politicalOptions = politicalOptions
						this.forms.politicalOptionsFetch = false
					}else{
						this.$emit("tip",{type:"error",text:"获取基本数据失败"})
					}
				}).catch((err)=>{
					console.log(err)
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			showModal(student,info){
				this.fetch()
				console.log(student)
				console.log(info)
				this.initValue = {...student}
				this.studentInfo = student
				this.forms.specialtyOptions.push({label:info.specialty,value:student.specialtyId})
				this.forms.classOptions.push({label:info.class,value:student.classId})
				this.initValue.beginLearnDate = this.$moment(student.beginLearnDate,'YYYY-MM-DD')
				this.modal.visible = true
			},
			handleChange(){
				this.forms.classOptions = []
				this.myform.setFields( {classId: { value: null, errors: [{ "message": "修改班级和专业后请重新选择","field": "class_id"}] } })
			},
			getClass(open){
				if(open){
					if (this.forms.classOptions.length > 0){
						return;
					}
					var grade = this.myform.getFieldValue("grade")
					var specialtyId = this.myform.getFieldValue("specialtyId")
					
					console.log(grade)
					console.log(specialtyId)
					if(!grade){
						return;
					}
					if(!specialtyId){
						return;
					}
					this.forms.classOptions = []
					this.forms.classOptionsFetch = true
					this.axios.post("/json/student/ajaxGetClassByGradeAndSpecialtyId",{specialtyId:specialtyId,grade:Number(grade)}).then((res)=>{
						if(res.data.code == 0){
							var classes =  res.data.classes
							var arr = new Array()
							for (var i = 0; i < classes.length; i++){
								arr.push({label:classes[i].name,value:classes[i].id})
							}
							this.forms.classOptions = arr
							this.forms.classOptionsFetch = false
						}else{
							this.$emit("tip",{type:"error",text:"获取班级失败"})
						}
						this.forms.classOptionsFetch = false
					}).catch((err)=>{
						this.$emit("tip",{type:"warning",text:"发生未知错误"})
					})
				}
			},
			searchSpecialty(value) {
				this.forms.specialtyOptionsFetch = true
				this.forms.specialtyOptions = []
				this.axios.post("/json/student/ajaxGetSpecialtiesBySchoolIdAndName",{specialtyName:value}).then((res)=>{
					if(res.data.code == 0){
						var specialties =  res.data.specialties
						var arr = new Array()
						for (var i = 0; i < specialties.length; i++){
							arr.push({label:specialties[i].name,value:specialties[i].id})
						}
						this.forms.specialtyOptions = arr
						this.forms.specialtyOptionsFetch = false
					}else{
						this.$emit("tip",{type:"error",text:"获取专业信息失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			handleCancel(){
				this.modal.visible = false
			},
			handleSubmit(e){
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						console.log(values)
						var obj = new Object()
						obj.type = 6
						obj.reason = values.reason
						obj.modifiedUserId = this.studentInfo.userId
						obj.applyStudent = {
							id: this.studentInfo.id,
							stuNo: values.stuNo,
							universityId:this.studentInfo.universityId,
							beginLearnDate:values.beginLearnDate.format('YYYY-MM-DD hh:mm:ss'),
							grade:values.grade,
							specialtyId:values.specialtyId,
							classId:values.classId,
							politicalId:values.politicalId,
						}
						this.axios.post("/json/userinfoApply/applyModifyNoneFile",obj).then((res)=>{
							console.log(res.data)
							if(res.data.code == 0){
								this.$emit('tip',{type:'success',text:'申请修改学历信息成功'})
							}else{
								this.$emit('tip',{type:'error',text:'申请修改学历信息失败'})
							}
						}).catch((err)=>{
							this.$emit('tip',{type:'warning',text:'发生未知错误'})
						}).then(()=>{
							this.isAxios = false
							this.modal.visible = false
						})
					}
				});
			},
		},
	}
</script>

<style>
</style>
