<template>
	<div>
		<a-modal :maskClosable="false" width="1000px" :footer="null" @cancel="handleCancel" :visible="modal.visible">
			<span slot="title">申请修改学生亲属页面</span>
			<a-form @submit="handleSubmit" v-if="modal.visible" :form="myform">
				<a-form-item label="选择游客用户">
					<a-select allowClear showSearch :filterOption="false" placeholder="搜索游客用户，根据姓名和身份证" @search="handleSearch"
					v-decorator="['userName',{rules: [{ required: true, message: '亲属名称不能为空' }],initialValue:parentName}]" :options="parentOptions">
					<a-spin v-if="parentOptionsFetch" slot="notFoundContent" size="small"/>
					</a-select>
				</a-form-item>
				<template>
					<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
				</template>
				<a-button-group>
					<a-button html-type="submit" type="primary">提交</a-button>
					<a-button type="danger" @click="handleCancel()">关闭</a-button>
				</a-button-group>
			</a-form>
		</a-modal>
	</div>
</template> 

<script>
	import AutoInput from '@/pages/Baseinfo/components/autoCreateForm/AutoCreateForm'
	export default {
		props: {
			oldvalue: {
				type: Object,
			},
		},
		data() {
			this.handleSearch = this.$lodash.debounce(this.handleSearch, 2000)
			return {
				data: [],
				modal:{
					visible:false,
				},
				parentOptions:[],
				parentOptionsFetch:false,
				parentName:'',
				myform: null,
				id:-1,
				objectflags:{
					'母':0,
					'父':1,
					'兄':2,
					'弟':3,
					'姐':4,
					'妹':5,
					'其他':6,
				},
				forms: [{
						key: 1,
						label: "关系",
						type: "select",
						name: "relationship",
						rules: {
							rules: [{
								required: true,
								message:"请选择你与亲属的关系"
							}],
							initialValue: null
						},
						
						options: [{
								key: 1,
								name: "母",
								value: 0
							},
							{
								key: 2,
								name: "父",
								value: 1
							},
							{
								key: 3,
								name: "兄",
								value: 2
							},
							{
								key: 4,
								name: "弟",
								value: 3
							},
							{
								key: 5,
								name: "姐",
								value: 4
							},
							{
								key: 6,
								name: "妹",
								value: 5
							},
							{
								key: 7,
								name: "其他",
								value: 6
							},
						]
					},
					{
						key: 2,
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
				if(info!=null){
					this.forms[0].rules.initialValue = this.objectflags[info.relationType]
					this.parentOptions = [{value:info.relationUserId,label:info.relationName}]
					this.parentName = info.relationUserId + "|" + info.relationName
					this.id = info.id
				}
				setTimeout(()=>{
					this.myform = this.$form.createForm(this)
					this.modal.visible = true
				},1000)
				
			},
			handleCancel() {
				this.modal.visible = false
			},
			handleSubmit(e){
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						console.log(this.myform.getFieldsValue())
						var formvalue = this.myform.getFieldsValue()
						var rela = (formvalue.userName.split("|"))
						var obj = new Object()
						obj.type = 3
						obj.reason = formvalue.reason
						obj.applyStudentRelation = {
							id: this.id,
							relaName: rela[1],
							relaId: Number(rela[0]),
							relationship:formvalue.relationship,
						}
						this.axios.post("json/userinfoApply/applyModifyNoneFile",obj).then((res)=>{
							console.log(res.data)
							if(res.data.code == 0){
								this.$emit('tip',{type:'success',text:'申请修改地址信息成功'})
							}else{
								this.$emit('tip',{type:'error',text:'申请修改地址信息失败'})
							}
						}).catch((err)=>{
							this.$emit('tip',{type:'warning',text:'发生未知错误'})
						}).then(()=>{
							this.modal.visible = false
						})
					}
				});
				
			},
			handleSearch(value){
				this.parentOptionsFetch = true
				this.parentOptions = []
				var obj = new Object()
				if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)){
					obj.identity = value
				}else{
					obj.name = value
				}
				
				this.axios.post("/json/user/getTouristByNameAndIdentity",obj).then((res)=>{
					if(res.data.code == 0){
						var data = res.data.Tourist
						for(var i = 0; i < data.length; i++){
							console.log(data[i])
							this.parentOptions.push({label:data[i].userName + '|' + data[i].identification,value:data[i].id + "|" + data[i].userName})
						}
						console.log(this.parentOptions)
					}else{
						this.$emit("tip",{type:"error",text:"获取游客失败"})
					}
				}).catch((err)=>{
					console.log(err)
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				}).then(()=>{
					this.parentOptionsFetch = false
				})
			},
		},

	}
</script>

<style>
</style>
