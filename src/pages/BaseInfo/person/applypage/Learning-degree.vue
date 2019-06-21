<template>
	<div>
		<a-modal @cancel="handleCancel" :maskClosable="false" width="1000px" :footer="null" :visible="modal.visible">
			<span slot="title">申请修改雇员简历页面</span>
			<div v-if="modal.visible">
				<a-form :form="myform" @submit="submit">
					<a-form-item label="开始时间">
						<a-date-picker v-decorator="['begin_time',{rules: [{ required: true, message: '请输入开始时间' }],initialValue:initValue.beginTime}]"
						 format="YYYY-MM-DD HH:mm:ss" showTime />
					</a-form-item>
					<a-form-item label="结束时间">
						<a-date-picker v-decorator="['end_time',{rules: [{ required: true, message: '请输入结束时间' }],initialValue:initValue.endTime}]"
						 format="YYYY-MM-DD HH:mm:ss" showTime />
					</a-form-item>
					<a-form-item label="国家">
						<a-select allowClear @change="countrySelect" v-decorator="['country_id',{rules: [{ required: true, message: '请选择学校所在国家' }],initialValue:initValue.countryId}]"
						 :options="forms.countryOptions">
						</a-select>
					</a-form-item>
					<a-form-item  label="城市">
						<a-select showSearch allowClear v-decorator="['city_id',{rules: [{ required: true, message: '请选择学校所在城市' }],initialValue:initValue.cityId}]"
						 :options="forms.cityOptions" :disabled="forms.countrySelect" optionFilterProp="children" :filterOption="CityfilterOption"></a-select>
					</a-form-item>
					<a-form-item label="学校">
						<a-select allowClear v-decorator="['school_id',{rules: [{ required: true, message: '请选择学校' }],initialValue:initValue.schoolId}]"
						 :options="forms.schoolOptions" :disabled="forms.schoolSelect"></a-select>
					</a-form-item>
					<a-form-item label="受教育程度">
						<a-select allowClear v-decorator="['academic_id',{rules: [{ required: true, message: '请选择你的受教育程度' }],initialValue:initValue.academicId}]"
						 :options="forms.academicOptions"></a-select>
					</a-form-item>
					<a-form-item label="学历">
						<a-select allowClear v-decorator="['degree_id',{rules: [{ required: true, message: '请选择你的学历' }],initialValue:initValue.degreeId}]"
						 :options="forms.degreeOptions"></a-select>
					</a-form-item>
					<a-form-item label="申请理由">
						<a-input v-decorator="['degree_id',{rules: [{ required: true, message: '请输入你的申请理由' }]}]" html-type="textarea" />
					</a-form-item>
					<a-button-group>
						<a-button html-type="submit" type="primary">提交</a-button>
						<a-button type="danger" @click="handleCancel">关闭</a-button>
					</a-button-group>
				</a-form>
			</div>
		</a-modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				modal: {
					visible: false
				},
				info: {
					countries: [],
					cities: [],
					schools: [],
					academics: [],
					degrees: [],
				},
				initValue: {
					userId: 1,
					beginTime: null,
					endTime: null,
					countryId: 1,
					cityId: 1,
					schoolId: 1,
					academicId: 1,
					degreeId: 1
				},
				forms: {
					countrySelect: true,
					schoolSelect: true,
					countryOptions: [{
						value:1,
						label:"中国",
					},{
						value:2,
						label:"日本",
					},{
						value:3,
						label:"美国",
					},],
					cityOptions: [],
					schoolOptions: [],
					academicOptions: [],
					degreeOptions: [],
				},
				myform: null,
			}
		},
		methods: {
			changeDate(value) {
				return this.$moment(value,'YYYY-MM-DD HH:mm:ss');
			},
			showModal(info) {
				this.initValue = {...info}
				this.initValue.endTime = this.changeDate(info.endTime)
				this.initValue.beginTime = this.changeDate(info.beginTime)
				if(info.countryId != null){
					// this.getCountry()
					this.forms.countrySelect = false
				}
				if(info.cityId != null){
					// this.getCity(info.cityId)
					this.forms.schoolSelect = false
				}
				this.myform = this.$form.createForm(this)
				this.modal.visible = true
			},
			handleCancel() {
				this.modal.visible = false
			},
			getCountry(){
				// this.axios.get("/json/addrCountry/addrCountrys/listAll").then((res)=>{
				// 	if(res.data.code==0){
				// 		const data = res.data.addrCountrys
				// 		var options = new Array()
				// 		for(var i = 0; i < data.length; i++){
				// 			var obj = new Object()
				// 			obj.label = data[i].countryZh
				// 			obj.value = data[i].id
				// 			options.push(obj)
				// 		}
				// 		this.forms.countryOptions = options
				// 	}else{
				// 		this.$emit("tip",{type:"error",text:"信息获取失败"})
				// 		this.handleCancel()
				// 	}
				// }).catch((err)=>{
				// 	this.$emit("tip",{type:"warning",text:"发生未知错误"})
				// 	this.handleCancel()
				// })
			},
			getCity(value){
				this.axios.get("" + value).then((res)=>{
					if (res.data.code == 0){
						this.forms.cityOptions = res.data.xx
					}else{
						this.$emit("tip",{type:"error",text:"信息获取失败"})
						this.handleCancel()
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
					this.handleCancel()
				})
			},
			getSchool(value){
				this.axios.get("" + value).then((res)=>{
					
				}).catch((err)=>{
					
				})
			},
			countrySelect(value) {
				if (value != null) {
					this.forms.countrySelect = false
				} else {
					this.forms.countrySelect = true
				}
			},
			submit(e) {
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						this.$emit("submit", this.myform.getFieldsValue())
						this.modal.visible = false
					}
				});
			},
			CityfilterOption(input, option) {
				console.log(option)
				console.log(input)
				return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
		}

	}
</script>

<style>
</style>
