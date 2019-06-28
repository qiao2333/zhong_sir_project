<!--院长查看院级信息-->
<template>
	<div>
		<a-spin v-if="hasload == false" />
		<div v-else>
			<a-input-search @search="onSearch()" placeholder="输入学号或姓名搜索" style="width: 200px" />
			<a-button type="primary" @click="showDrawer">高级筛选</a-button>
			<a-button type="primary" @click="fileUpload({type:11})" >批量添加学生</a-button>
			<a-button type="primary" @click="fileUpload({type:9})">批量修改学生</a-button>
			<a-table rowKey="studentNo" :columns="columns" :dataSource="datas" :loading="loading"  bordered>
				<a slot="studentNo" slot-scope="text1,record" @click="toStudentInfo(record)">{{ text1 }}</a>
				<span slot="action" slot-scope="text, record">
					<a-button size="small">学业成绩</a-button>
				</span>
				<span slot="action1" slot-scope="text, record">
					<a-button size="small">奖惩情况</a-button>
				</span>
			</a-table>
		</div>
		<StudentHeightSearch @heightSearch="HeightSearchMethod" ref="heightSearch" />
		<ExcelUploadApply ref="ExcelUpload" />
	</div>
</template>
<script>
	import ExcelUploadApply from './ExcelUploadApply'
	import StudentHeightSearch from './StudentHeightSearch'
	const columns = [{
			title: '学号',
			scopedSlots: {
				customRender: 'studentNo'
			},
			dataIndex: 'studentNo',
			key: 'studentNo'
		},
		{
			title: '姓名',
			dataIndex: 'studentName',
			key: 'studentName'
		},
		{
			title: '入学日期',
			dataIndex: 'beginLearnDate',
			key: 'beginLearnDate'
		},
		{
			title: '主修专业',
			dataIndex: 'specialty',
			key: 'specialty'
		},
		{
			title: '所在年级',
			dataIndex: 'grade',
			key: 'grade'
		},
		{
			title: '性别',
			dataIndex: 'sex',
			key: 'sex'
		},
		{
			title: '政治面貌',
			dataIndex: 'political',
			key: 'political'
		},
		{
			title: '岗位',
			dataIndex: 'position',
			key: 'position'
		},
		{
			title: '学业情况',
			scopedSlots: {
				customRender: 'action'
			}
		},
		{
			title: '奖惩情况',
			scopedSlots: {
				customRender: 'action1'
			}
		}
	];
	export default {
		data() {
			return {
				rows: 0,
				datas: [],
				datas1: [],
				columns,
				hasload: false,
				loading: true,
				visible: false,
			};
		},
		components: {
			StudentHeightSearch,
			ExcelUploadApply
		},
		mounted() {
			// console.log(this.$route.query.code);
			this.fetch();
		},
		methods: {
			fetch() {
				this.loading = false;
				this.hasload = true;
				// this.axios.get('/json/employee/filter/classmates/all').then(res => {
				// 		console.log(res.data.classmateBeans);
				// 		this.datas = res.data.classmateBeans;
				// 		this.loading = false;
				// 		this.hasload = true;
				// 	}).catch(err => {
				// 		console.log(err);
				// 	});
			},
			handleTableChange() {
				this.fetch();
			},
			fileUpload(info){
				this.$refs.ExcelUpload.showModal(info)
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
						OtherPersonId:record.userId,
						MyPersonType:2
					}
				});
			},
			HeightSearchMethod(data){
				console.log(data)
				var parms = new URLSearchParams()
				if(data.studentName){
					parms.append('studentName',data.studentName)
				}
				if(data.studentNo){
					parms.append('studentNo',data.studentName)
				}
				if(data.className){
					parms.append('classNames',data.className)
				}
				if(data.grade){
					parms.append('cyears',data.grade)
				}
				if(data.political){
					parms.append('politicals',data.political)
				}
				if(data.position){
					parms.append('positions',data.position)
				}
				if(data.specialty){
					parms.append('specialtys',data.specialty)
				}
				if(data.user_sex){
					parms.append('user_sex',data.user_sex)
				}
				this.$emit("reload",true)
				this.axios.post("/json/employee/filter/allClassmates",parms).then((res)=>{
					console.log(res)
					var classmateBeans = res.data.classmateBeans
					var evens = this.$lodash.remove(classmateBeans, function(value) {
					  return value.userId == null
					});
					this.datas = res.data.classmateBeans
				}).catch((err)=>{
					console.log(err)
				}).then(()=>{
					this.$emit("reload",false)
				})
			},
		}
	};
</script>
<style></style>
