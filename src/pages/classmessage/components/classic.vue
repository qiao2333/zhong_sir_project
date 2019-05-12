<!--老师查看班级信息-->
<template>
	<div class="content" style="background-color: white;">
		<a-spin v-if="hasload==false" />
		<div v-else>
			<a-input-search  placeholder="输入班级" style="width: 200px" @search="onSearch" />
		<a-table :columns="columns" :dataSource="datas" :loading="loading" @change="handleTableChange()" bordered>
		</a-table>
		</div>
		
	</div>

</template>
<script>
	import ExportJsonExcel from 'js-export-excel';
	const columns = [{
		title: '学号',
		dataIndex: 'stu_no',
	},{
		title: '姓名',
		dataIndex: 'user_name',
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
				columns,
				hasload:false,
				loading: true
			}
		},
		mounted() {
			this.fetch()
		},
		methods: {
			fetch() {
				this.$axios.post('/chouti/aatest').then((res) => {
					const data = res.data
					this.datas = data.students
					console.log(data.students)
					this.loading = false
					this.hasload= true
				}).catch((err) => {
					console.log(err)
				})
			}
		},
		handleTableChange() {
			this.fetch()
		},
		onSearch(value) {
			console.log(value)
		}
	}
</script>