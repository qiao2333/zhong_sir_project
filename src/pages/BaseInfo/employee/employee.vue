<!--查看教师信息-->
<template>
	<div  style="background-color: white;">
		<div  style="height: 1000px;">
			<div>
				<a-select options="options" allowClear></a-select>
			</div>
			<a-table rowKey="employeeNo" :columns="columns" :dataSource="datas" :loading="loading" @change="handleTableChange()"
			 bordered>
				<a slot="employeeNo" slot-scope="text,record" >{{ text }}</a>
			</a-table>
		</div>
		<TeacherHeightSearch @heightSearch="HeightSearchMethod" ref="heightSearch" />
	</div>
</template>
<script>
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
				rows: 0,
				datas: [],
				columns,
				options:[],
				loading: false,
				visible: false,
			};
		},
		components: {
			TeacherHeightSearch
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
						OtherPersonType:1,
						OtherPersonId:record.studentId
					}
				});
			},
			HeightSearchMethod(data){
				console.log(data)
				this.axios.post("/json/employee/filter/allemployees",data).then((res)=>{
					console.log(res)
				}).catch((err)=>{
					console.log(err)
				})
			},
			onSearch(value, event) {
				var patt = /^\d{1,}$/;
				if (patt.test(value)) {
					this.datas1 = this.datas.filter(item => {
						if (item.studentNo.toString().includes(value)) {
							return item;
						}
					});
				} else {
					this.datas1 = this.datas.filter(item => {
						if (item.studentName.includes(value)) {
							return item;
						}
					});
				}
			}
		}
	};
</script>
<style></style>
