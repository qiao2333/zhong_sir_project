<template>
	<div class="content" style="background-color: white;">
		<a-spin v-if="hasload == false" />
		<div v-else style="height: 1000px;">
			<a-input-search @search="onSearch()" placeholder="请输入搜索的学号或姓名" style="width: 200px" />
			<a-button type="primary" @click="showDrawer">搜索</a-button>
			<a-table :columns="columns" :dataSource="datas" :loading="loading" @change="handleTableChange()" bordered>
				<div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
					<a-input v-ant-ref="c => searchInput = c" :placeholder="`按${column.title}搜索`" :value="selectedKeys[0]"
					 @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])" @pressEnter="() => handleSearch(selectedKeys, confirm)"
					 style="width: 188px; margin-bottom: 8px; display: block;" />
					<a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)" icon="search" size="small" style="width: 90px; margin-right: 8px">Search</a-button>
					<a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">Reset</a-button>
				</div>
				<a slot="employeeNo" slot-scope="text,record">{{ text }}</a>
				<template slot="customRender" slot-scope="text">
					{{text}}
				</template>
			</a-table>
		</div>
	</div>
</template>
<script>
	const columns = [{
			title: '学号',
			dataIndex: 'stu_no',
			scopedSlots: {
				filterDropdown: 'filterDropdown',
				filterIcon: 'filterIcon',
			}
		}, {
			title: '姓名',
			dataIndex: 'user_name',
		}, {
			title: '入学日期',
			dataIndex: 'begin_learn_date',
		}, {
			title: '主修专业',
			dataIndex: 'specialty_id',
		}, {
			title: '所在年级',
			dataIndex: 'grade',
		},
		{
			title: '性别',
			dataIndex: 'user_sex',
		},
		{
			title: '联系电话',
			dataIndex: 'phone',
		},
		{
			title: '政治面貌',
			dataIndex: 'political',
		}
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
		mounted() {
			// this.fetch();
			this.loading = false;
			this.hasload = true;
		},
		methods: {
			handleSearch(selectedKeys, confirm) {
				console.log(selectedKeys)
				confirm()
				this.searchText = selectedKeys[0]
			},

			handleReset(clearFilters) {
				clearFilters()
				this.searchText = ''
			},
			fetch() {
				this.axios.post('/json/employee/filter/allemployees').then(res => {
					console.log(res.data);
					if (res.data.code == 0) {
						var newdatas = new Array();
						for (var emp in res.data.employeeBean) {
							console.log(emp);
							var obj = res.data.employeeBean[emp];
							obj.key = emp;
							newdatas.push(obj)
						}
						this.datas = newdatas;
						this.loading = false;
						this.hasload = true;
					} else {
						this.$emit('tip', {
							type: "error",
							text: '��ȡ��Ϣʧ��'
						})
					}
					// this.datas = res.data.classmateBeans;

				}).catch(err => {
					this.$emit('tip', {
						type: "warning",
						text: '����δ֪����'
					})
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
					name: 'otherPerson',
					params: {
						OtherPersonType: 1,
						OtherPersonId: record.studentId
					}
				});
			},
			HeightSearchMethod(data) {
				console.log(data)
				this.axios.post("/json/employee/filter/allemployees", data).then((res) => {
					console.log(res)
				}).catch((err) => {
					console.log(err)
				})
			},
			onSearch(value, event) {
				var patt = /^\d{1,}$/;
				if (patt.test(value)) {
					this.datas1 = this.datas.filter(item => {
						if (item.studentNo.toString().includes(value)) {
							return item;
						} else if (item.userName.toString().includes(value)) {
							return item;
						}
					});
				}
			}
		}
	};
</script>
<style></style>
