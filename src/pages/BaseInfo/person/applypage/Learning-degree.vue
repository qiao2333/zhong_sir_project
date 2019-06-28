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
						<a-select allowClear v-decorator="['country_id',{rules: [{ required: true, message: '请选择学校所在国家' }],initialValue:initValue.countryId}]"
						 :options="forms.countryOptions">
						 <a-spin v-if="forms.countryOptionsFetch" slot="notFoundContent" size="small"/>
						</a-select>
					</a-form-item>
					<a-form-item  label="城市">
						<a-select showSearch @search="getCity" :filterOption="false" allowClear v-decorator="['city_id',{rules: [{ required: true, message: '请选择学校所在城市' }],initialValue:initValue.cityId}]"
						 :options="forms.cityOptions" ></a-select>
					</a-form-item>
					<a-form-item label="学校">
						<a-select allowClear v-decorator="['school_id',{rules: [{ required: true, message: '请选择学校' }],initialValue:initValue.schoolId}]"
						 :options="forms.schoolOptions" :disabled="forms.schoolSelect">
						 <a-spin v-if="forms.schoolOptionsFetch" slot="notFoundContent" size="small"/>
						 </a-select>
					</a-form-item>
					<a-form-item label="受教育程度">
						<a-select allowClear v-decorator="['academic_id',{rules: [{ required: true, message: '请选择你的受教育程度' }],initialValue:initValue.academicId}]"
						 :options="forms.academicOptions">
						 <a-spin v-if="forms.academicOptionsFetch" slot="notFoundContent" size="small"/>
						 </a-select>
					</a-form-item>
					<a-form-item label="学历">
						<a-select allowClear v-decorator="['degree_id',{rules: [{ required: true, message: '请选择你的学历' }],initialValue:initValue.degreeId}]"
						 :options="forms.degreeOptions">
						 <a-spin v-if="forms.degreeOptionsFetch" slot="notFoundContent" size="small"/>
						 </a-select>
					</a-form-item>
					<a-form-item label="申请理由">
						<a-textarea v-decorator="['reason',{rules: [{ required: true, message: '请输入你的申请理由' }]}]" ></a-textarea>
					</a-form-item>
					<a-button-group>
						<a-button :loading="isAxios" html-type="submit" type="primary">提交</a-button>
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
				isAxios:false,
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
					schoolOptionsFetch:false,
					academicOptionsFetch:false,
					degreeOptionsFetch:false,
					cityOptionsFetch:false,
					cityOptions: [],
					schoolOptions: [],
					academicOptions: [],
					degreeOptions: [],
				},
				myform: null,
			}
		},
		mounted(){
			this.fetch()
		},
		methods: {
			fetch(){
				this.axios.get("json/learningDegree/getSometimeInfoForApply").then((res)=>{
					if(res.data.code == 0){
						var data1 = res.data.academicDegrees
						var op1 = new Array()
						for(var i = 0;i < data1.length; i++){
							op1.push({label:data1[i].name,value:data1[i].id})
						}
						this.forms.degreeOptions = op1
						
						
						var data2 = res.data.academics 
						var op2 = new Array()
						for(var i = 0;i < data2.length; i++){
							op2.push({label:data2[i].name,value:data2[i].id})
						}
						this.forms.academicOptions = op2
						
						
						var data4 = res.data.universities
						var op4 = new Array()
						for(var i = 0;i < data4.length; i++){
							op4.push({label:data4[i].name,value:data4[i].id})
						}
						this.forms.schoolOptions = op4
					}
				}).catch((err)=>{
					console.log(err)
				})
			},
			changeDate(value) {
				return this.$moment(value,'YYYY-MM-DD HH:mm:ss');
			},
			showModal(info,o) {
				this.info = info
				this.initValue = {...info}
				this.forms.cityOptions = [{label:o.City,value:info.cityId}],
				console.log(this.forms.cityOptions)
				this.initValue.endTime = this.changeDate(info.endTime)
				this.initValue.beginTime = this.changeDate(info.beginTime)
				
				this.myform = this.$form.createForm(this)
				this.modal.visible = true
			},
			handleCancel() {
				this.modal.visible = false
			},
			getCountry(){
				this.axios.get("/json/addrCountry/addrCountrys/listAll").then((res)=>{
					if(res.data.code==0){
						const data = res.data.addrCountrys
						var options = new Array()
						for(var i = 0; i < data.length; i++){
							var obj = new Object()
							obj.label = data[i].countryZh
							obj.value = data[i].id
							options.push(obj)
						}
						this.forms.countryOptions = options
					}else{
						this.$emit("tip",{type:"error",text:"信息获取失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			getCity(value){
				this.forms.cityOptionsFetch = true
				this.forms.cityOptions = []
				this.axios.get("json/address/getCityByName?cityName=" + value).then((res)=>{
					if (res.data.code == 0){
						var citis = res.data.cities
						var datas = new Array()
						for (var i = 0; i < citis.length; i++){
							datas.push({label:citis[i].cityZh, value:citis[i].id})
						}
						console.log(datas)
						this.forms.cityOptions  = datas
					}else{
						this.$emit("tip",{type:"error",text:"信息获取失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				}).then(()=>{
					this.forms.cityOptionsFetch = false
				})
			},
			getSchool(value){
				this.axios.get("" + value).then((res)=>{
					
				}).catch((err)=>{
					
				})
			},
			submit(e) {
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						this.isAxios = true
						console.log(this.myform.getFieldsValue())
						var formvalue = this.myform.getFieldsValue()
						var obj = new Object()
						obj.type = 4
						obj.reason = formvalue.reason
						obj.modifiedUserId = this.info.userId
						obj.applyLearningDegree = {
							id: this.info.id,
							countryId: formvalue.country_id,
							cityId: formvalue.city_id,
							schoolId: formvalue.school_id,
							academicId: formvalue.academic_id,
							degreeId: formvalue.degree_id,
							beginTime:formvalue.begin_time.format('YYYY-MM-DD hh:mm:ss'),
							endTime: formvalue.end_time.format('YYYY-MM-DD hh:mm:ss'),
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
		}

	}
</script>

<style>
</style>
