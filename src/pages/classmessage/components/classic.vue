<template>
	<div class="content" style="background-color: white;">
		<a-input-search placeholder="输入班级" style="width: 200px" @search="onSearch" />
		<a-table :columns="columns" :dataSource="datas" :loading="loading" @change="handleTableChange()" bordered>
		</a-table>
	</div>

</template>
<script>
	import ExportJsonExcel from 'js-export-excel';
	const columns = [
 	{
		title: '学号',
		dataIndex: 'stu_no',
		scopedSlots: { customRender: 'stu_no' },
	}, {
		title: '姓名',
		dataIndex: 'user_name',
	},{
		title: '性别',
		dataIndex: 'stu_sex',
	},{
		title: '移动电话号码',
		dataIndex: 'stu_phone',
	}
	];
	export default {
		methods: {
			onSearch(value) {
				console.log(value)
			},
		},
		data() {
			return {
				rows:0,
				datas:[],
				hasload: false,
				columns,
				loading:true
			}
		},
		mounted() {
			this.fetch()
		},
		methods: {
			fetch () {
				this.$axios.post('/classmessage/classic').then((res) => {
					const data = res.data.data
					this.rows = data.rows
					this.datas = data.datas
					this.hasload = true
					this.loading = false
				}).catch((err) => {
					console.log(err)
				})
			}
		},
		handleTableChange (){
			this.fetch()
		},
		onSearch (value) {

      console.log(value)

    }
	}
</script>
