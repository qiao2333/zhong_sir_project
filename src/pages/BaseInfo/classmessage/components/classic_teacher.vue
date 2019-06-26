<template>
	<div class="content" style="background-color: white;">
		<a-input-search @search="onSearch" placeholder="输入学号或姓名搜索" style="width: 200px" />
		<a-table rowKey="code" :columns="columns" :dataSource="datas" :loading="loading" @change="handleTableChange()" bordered>
			<a slot="code" slot-scope="text" @click="toStudent(text)" >{{text}}</a>
			<span slot="customTitle">班级编号</span>
		</a-table>
	</div>

</template>
<script>
	const columns = [{
			dataIndex: 'code',
			key: 'code',
			slots: {
				title: 'customTitle'
			},
			scopedSlots: {
				customRender: 'code'
			},
		}, {
			title: '班级名称',
			dataIndex: 'name',
		}, {
			title: '班级人数',
			dataIndex: 'number',
		}, {
			title: '班主任',
			dataIndex: 'headteacher',
		}, {
			title: '班长',
			dataIndex: 'moniter',
		}
	];
	export default {
		data() {
			return {
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
				this.axios.get('/json/class/employee/class/allClassmates/1949').then((res) => {
					this.datas.push(res.data.classBean)
					console.log(res.data.classBean)
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
				if (patt.test(value)) {
					this.datas1 = this.datas.filter(item => {
						if (item.code.toString().includes(value)) {
							return item;
						}
					});
				} else {
					this.datas1 = this.datas.filter(item => {
						if (item.name.includes(value)) {
							return item;
						}
					});
				}
			},
			toStudent(text){
				this.$router.push({path:'/home/baseinfo/chouti',query:{code:text}})
			}
		},
	}
</script>