<!--查看教师信息-->
<template>
	<div class="content" style="background-color: white;">
		<a-spin v-if="hasload == false" />
		<div v-else style="height: 1000px;">
			<a-input-search @search="onSearch()" placeholder="输入学号或姓名搜索" style="width: 200px" />
			<a-button type="primary" @click="showDrawer">高级筛选</a-button>
			<a-table rowKey="employeeNo" :columns="columns" :dataSource="datas" :loading="loading" @change="handleTableChange()"
			 bordered>
				<a slot="employeeNo" slot-scope="text,record" >{{ text }}</a>
			</a-table>
		</div>
		<TeacherHeightSearch @heightSearch="HeightSearchMethod" ref="heightSearch" />
	</div>
</template>
<script>
	import TeacherHeightSearch from './TeacherHeightSearch'
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
				hasload: false,
				loading: true,
				visible: false,
			};
		},
		components: {
			TeacherHeightSearch
		},
		mounted() {
			// console.log(this.$route.query.code);
			this.fetch();
		},
		methods: {
			fetch() {
				this.axios.post('/json/employee/filter/allemployees').then(res => {
						console.log(res.data);
						if(res.data.code ==0 ){
							var newdatas = new Array();
							for(var emp in res.data.employeeBean){
								console.log(emp);
								var obj = res.data.employeeBean[emp];
								obj.id = emp;
								newdatas.push(obj)
							}
							this.datas = newdatas;
							this.loading = false;
							this.hasload = true;
						}else{
							this.$emit('tip',{type:"error",text:'获取信息失败'})
						}
						// this.datas = res.data.classmateBeans;
						
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
