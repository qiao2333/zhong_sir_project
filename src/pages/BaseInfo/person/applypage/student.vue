<template>
	<div>
		<a-modal  :maskClosable="false" width="1000px" :footer="null" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title">申请修改学生主要信息页面</span>
			<a-form v-if="modal.visible" @submit="handleSubmit"  :form="myform" >
				<a-form-item label="学号">
					<a-input type="text" v-decorator="['stu_no',{rules: [{ required: true, message: '请输入正确的学号' }],initialValue:initValue.stuNo}]"/>
				</a-form-item>
				<a-form-item label="入学日期">
					<a-date-picker v-decorator="['begin_learn_date',{rules: [{ required: true, message: '入学日期不能为空' }],initialValue:initValue.beginLearnDate}]"
					 format="YYYY-MM-DD" />
				</a-form-item>
				<a-form-item label="年级">
					<a-input v-decorator="['grade',{rules: [{ required: true,pattern: /^\d{1,4}$/g, message: '请输入年级' }],initialValue:initValue.grade}]"></a-input>
				</a-form-item>
				<a-form-item label="主修专业">
					<a-select placeholder="请选择主修专业" allowClear v-decorator="['specialty_id',{rules: [{ required: true, message: '主修专业不能为空' }],initialValue:initValue.majorId}]"
					:filterOption="false" :options="forms.specialtyOptions">
					</a-select>
				</a-form-item>
				<a-form-item label="专业班级">
					<a-select allowClear  v-decorator="['class_id',{rules: [{ required: true, message: '专业班级不能为空' }],initialValue:initValue.classId}]"
					:options="forms.classOptions">
					</a-select>
				</a-form-item>
				<a-form-item label="政治面貌">
					<a-select allowClear v-decorator="['political_id',{rules: [{ required: true, message: '政治面貌不能为空' }],initialValue:initValue.politicalId}]"
					:options="forms.politicalOptions">
					</a-select>
				</a-form-item>
				<a-form-item label="宿舍">
					<a-select allowClear v-decorator="['live_room',{rules: [{ required: true, message: '宿舍不能为空' }],initialValue:initValue.liveRoom}]"
					:options="forms.live_roomOptions">
					</a-select>
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
			return {
				myform: this.$form.createForm(this),
				initValue:{
					begin_learn_date:null,
					grade:0,
					stu_no:0,
					specialtyOptions:0,
					class_id:0,
					political_id:0,
					live_room:0
				},
				modal:{
					visible:false,
				},
				forms:{
					live_roomOptions:null,
					politicalOptions:null,
					specialtyOptions:null,
					classOptions:null
				},
				
			}
		},
		methods: {
			showModal(info){
				this.initValue = {...info}
				this.initValue.beginLearnDate = this.$moment(info.beginLearnDate,'YYYY-MM-DD')
				this.modal.visible = true
			},
			searchSpecialty(value) {
				setTimeout(()=>{
					
				},3000)
				// this.$axios.get("").then((res)=>{
				// 	
				// }).catch((err)=>{
				// 	
				// })
			},
			handleCancel(){
				this.modal.visible = false
			},
			handleSubmit(){
				
			}
		},
	}
</script>

<style>
</style>
