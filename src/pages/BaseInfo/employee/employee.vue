<!--查看教师信息-->
<template>
	<div class="content">
		<a-spin :spinning="reloading">
			<div  style="height: 1000px;">
				<div>
					<a-select options="options" allowClear></a-select>
				</div>
				<a-button type="primary" @click="showDrawer">高级筛选</a-button>
				<a-button type="primary" @click="fileUpload({type:12})" >批量添加职员</a-button>
				<a-button type="primary" @click="fileUpload({type:10})">批量修改职员</a-button>
				<a-table rowKey="employeeNo" :columns="columns" :dataSource="datas" :loading="loading" @change="handleTableChange()"
				 bordered>
					<a slot="employeeNo" slot-scope="text,record" @click="toStudentInfo(record)" >{{ text }}</a>
				</a-table>
			</div>
			<TeacherHeightSearch @heightSearch="HeightSearchMethod" ref="heightSearch" />
			<ExcelUploadApply @reload="reload" ref="ExcelUpload" />
		</a-spin>
	</div>
</template>
<script>
	import ExcelUploadApply from '../classmessage/components/ExcelUploadApply'
	import TeacherHeightSearch from './components/TeacherHeightSearch'
	const columns = [{
			title: '雇员编号',
			scopedSlots: {
				customRender: 'employeeNo'
			},
			dataIndex: 'employeeNo',
			key: 'employeeNo'
		},
		{
			title: '用户名',
			dataIndex: 'username',
			key: 'username'
		},
		{
			title: '学院',
			dataIndex: 'universityName',
			key: 'universityName'
		},
		{
			title: '岗位',
			dataIndex: 'positionName',
			key: 'positionName'
		},
		{
			title: '科室',
			dataIndex: 'subDepartmentName',
			key: 'subDepartmentName'
		},
		{
			title: '学院',
			dataIndex: 'departmentName',
			key: 'departmentName'
		},
	];
	export default {
		data() {
			return {
				reloading:false,
				rows: 0,
				datas: [],
				columns,
				options:[],
				loading: false,
				visible: false,
			};
		},
		components: {
			TeacherHeightSearch,
			ExcelUploadApply
		},
		mounted() {
			this.fetch();
		},
		
		methods: {
			fetch() {
				this.axios.get('/json/class/employee/class/allClassmates').then(res => {
						console.log(res.data);
						if(res.data.code == 0){
							var options = new Array()
							var data = res.data.classBeans
							for(var i in data){
								options.push({label:data[i].name, value:data[i].classId})
							}
							this.options = options
							this.$emit('tip',{type:"success",text:'获取信息成功'})
						}
						else{
							this.$emit('tip',{type:"error",text:'获取信息失败'})
						}
					}).catch(err => {
						this.$emit('tip',{type:"warning",text:'发生未知错误'})
					});
			},
			fileUpload(info){
				this.$refs.ExcelUpload.showModal(info)
			},
			handleTableChange() {
				this.fetch();
			},
			showDrawer() {
				this.$refs.heightSearch.opendrawer()
			},
			onClose() {
				this.visible = false;
			},
			toStudentInfo(record) {
				console.log(record)
				this.$router.push({
					name:'otherPerson',
					params:{
						OtherPersonType:2,
						OtherPersonId:record.userId,
						MyPersonType:2
					}
				});
			},
			reload(value){
				this.reloading = value
			},
			HeightSearchMethod(data){
				this.reload(true)
				var parms = new URLSearchParams()
				if(data.employeeName){
					parms.append('employeeName',data.employeeName)
				}
				if(data.subDepartmentNames){
					parms.append('subDepartmentNames',data.subDepartmentNames)
				}
				if(data.positionNames){
					parms.append('positionNames',data.positionNames)
				}
				if(data.departmentNames){
					parms.append('departmentNames',data.departmentNames)
				}
				console.log(data)
				this.axios.post("/json/employee/filter/allemployees",parms).then((res)=>{
					console.log(res)
					this.datas = res.data.employeeBean
				}).catch((err)=>{
					console.log(err)
				}).then(()=>{
					this.reload(false)
				})
			},
		}
	};
</script>
<style></style>
