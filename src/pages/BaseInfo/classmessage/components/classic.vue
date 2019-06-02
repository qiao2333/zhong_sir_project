<!--学生查看班级信息-->
<template>
	<div class="content" style="background-color: white;">
		<a-spin v-if="hasload==false" />
		<div v-else>
			<a-input-search @search="onSearch" placeholder="输入学号或姓名搜索" style="width: 200px" />
			<a-table :columns="columns" :dataSource="datas1" :loading="loading" @change="handleTableChange()" bordered>
			</a-table>
		</div>
	</div>
</template>
<script>
	const columns = [{
		title: '学号',
		dataIndex: 'stu_no',
	}, {
		title: '姓名',
		dataIndex: 'user_name',
	}
	, {
		title: '入学日期',
		dataIndex: 'begin_learn_date',
	}
	, {
		title: '主修专业',
		dataIndex: 'specialty_id',
	}
	, {
		title: '所在年级',
		dataIndex: 'grade',
	},
	{
		title: '性别',
		dataIndex: 'user_sex',
	}
	,
	{
		title: '联系电话',
		dataIndex: 'phone',
	}
	,
	{
		title: '政治面貌',
		dataIndex: 'political',
	}
	];

	//	"id": 1624,
	//    "userId": 2,
	//    "universityId": 0,
	//    "stuNo": "0",
	//    "beginLearnDate": "2019-05-09 08:12:47",
	//    "grade": "0",
	//    "majorId": 0,
	//    "classId": 0,
	//    "politicalId": 0,
	//    "liveRoom": 0,
	//    "homeAddress": 2,
	//    "mailAddress": 1,
	//    "datetime": "2019-05-09 08:13:00",
	//    "byWho": 1,
	//    "deleted": false
	export default {
		data() {
			return {
				rows: 0,
				datas: [],
				datas1:[],
				columns,
				hasload: false,
				loading: true
			}
		},
		mounted() {
			this.fetch()
		},
		methods: {
			fetch() {
				this.$axios.post('/classmessage/classic').then((res) => {
					const data = res.data.data
//					console.log(data)
					this.rows = data.rows
					this.datas = data.datas
					this.loading = false
					this.hasload = true
				}).catch((err) => {
					console.log(err)
				})
			},
			handleTableChange() {
				this.fetch()
			},
			onSearch(value,event) {
				var patt = /^\d{1,}$/;
				if(patt.test(value)){
					this.datas1 = this.datas.filter(item => {
					if(item.stu_no.toString().includes(value)) {
						return item
					}
					
				})
				}else{
					this.datas1 = this.datas.filter(item => {
					if(item.user_name.includes(value)) {
						return item
					}
					
				})
				}
				
				
			}
		},
		
	}
</script>
<style>
	
</style>