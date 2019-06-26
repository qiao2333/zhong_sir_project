<!--院长查看院级信息-->
<template>
	<div class="content" style="background-color: white;">
		<a-spin v-if="hasload == false" />
		<div v-else>
			<a-input-search @search="onSearch" placeholder="输入学号或姓名搜索" style="width: 200px" />
			<a-button type="primary" @click="showDrawer">高级筛选</a-button>
			<a-table rowKey="studentNo" :columns="columns" :dataSource="datas1" :loading="loading" @change="handleTableChange()"
			 bordered>
				<a slot="studentNo" slot-scope="text1" @click()="toStudentInfo(text1)">{{ text1 }}</a>
				<span slot="customTitle">学号</span>
				<span slot="action" slot-scope="text, record">
					<a-button size="small">学业成绩</a-button>
				</span>
				<span slot="action1" slot-scope="text, record">
					<a-button size="small">奖惩情况</a-button>
				</span>
			</a-table>
		</div>
		<HeightSearch ref="heightSearch" />
	</div>
</template>
<script>
	import HeightSearch from './HeightSearch'
	const columns = [{
			slots: {
				title: 'customTitle'
			},
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
			title: '联系电话',
			dataIndex: 'phone',
			key: 'phone'
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
				datas: [],
				datas1: [],
				columns,
				hasload: false,
				loading: true,
				visible: false,
			};
		},
		components: {
			HeightSearch
		},
		mounted() {
			// console.log(this.$route.query.code);
			this.fetch();
		},
		methods: {
			fetch() {
				this.axios.get('/json/employee/student/allClassmates/2106').then(res => {
						console.log(res.data.classmateBeans);
						this.datas = res.data.classmateBeans;
						this.loading = false;
						this.hasload = true;
					}).catch(err => {
						console.log(err);
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
			toStudentInfo(text1) {
				this.$router.push({
					path: '/home/baseinfo/studentInfo',
					query: {
						studentNo: text1
					}
				});
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
