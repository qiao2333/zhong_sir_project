<template>
	<div class="content" style="background-color: white;">
		<a-input-search @search="onSearch" placeholder="输入学号姓名搜索" style="width: 200px" />
		<a-table :columns="columns" :dataSource="datas1" :loading="loading" @change="handleTableChange()" bordered>
			<a slot="class_no" slot-scope="text" @click="toStudent(text)" >{{text}}</a>
			<span slot="customTitle">班级编号</span>
		</a-table>
	</div>

</template>
<script>
	const columns = [{
			dataIndex: 'class_no',
			key: 'class_no',
			slots: {
				title: 'customTitle'
			},
			scopedSlots: {
				customRender: 'class_no'
			},
		}, {
			title: '班级名称',
			dataIndex: 'class_name',
		}, {
			title: '班级人数',
			dataIndex: 'class_num',
		}, {
			title: '班主任',
			dataIndex: 'headmaster',
		}, {
			title: '班长',
			dataIndex: 'class_monitor',
		}
	];
	export default {
		data() {
			return {
				rows: 0,
				datas: [],
				datas1: [],
				hasload: false,
				columns,
				loading: true
			}
		},
		mounted() {
			this.fetch()
		},
		methods: {
			fetch() {
				this.$axios.post('/classmessage/classic_teacher').then((res) => {
					const data = res.data.data
					this.rows = data.rows
					this.datas = data.datas
					this.hasload = true
					this.loading = false
				}).catch((err) => {
					console.log(err)
				})
			},
			handleTableChange() {
				this.fetch()
			},
			onSearch(value, event) {
				var patt = /^\d{1,}$/;
				if(patt.test(value)) {
					this.datas1 = this.datas.filter(item => {
						if(item.class_no.toString().includes(value)) {
							return item
						}

					})
				} else {
					this.datas1 = this.datas.filter(item => {
						if(item.class_name.includes(value)) {
							return item
						}

					})
				}
			},
			toStudent(text){
				this.$router.push({path:'/home/classic_teacher_student',query:{classNo:text}})
			}
		},
	}
</script>