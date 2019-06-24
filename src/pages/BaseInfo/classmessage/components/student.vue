<template>
	<div class="content" style="background-color: white;">
		<a-spin v-if="hasload == false" />
		<div v-else style="height: 1000px;">
			<a-table :columns="columns" :dataSource="datas" :loading="loading" bordered>
				<div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class='custom-filter-dropdown'>
					<a-input v-ant-ref="c => searchInput = c" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
					 @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])" @pressEnter="() => handleSearch(selectedKeys, confirm)"
					 style="width: 188px; margin-bottom: 8px; display: block;" />
					<a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)" icon="search" size="small" style="width: 90px; margin-right: 8px">Search</a-button>
					<a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">Reset</a-button>
				</div>
				<a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : undefined }" />
				<template slot="customRender" slot-scope="text">
					<span v-if="searchText">
						<template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
							<mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</mark>
							<template v-else>{{fragment}}</template>
						</template>
					</span>
					<template v-else>{{text}}</template>
				</template>
			</a-table>
		</div>
	</div>
</template>
<script>
	const columns = [{
		title: '学号',
		key: 'stu_no',
		dataIndex: 'stu_no',
		scopedSlots: {
			filterDropdown: 'filterDropdown',
			filterIcon: 'filterIcon',
			customRender: 'customRender',
		},
		onFilter: (value, record) => {
			
		}
	}, {
		title: '姓名',
		key: 'name',
		dataIndex: 'name',
		scopedSlots: {
			filterDropdown: 'filterDropdown',
			filterIcon: 'filterIcon',
			customRender: 'customRender',
		},
		onFilter: (value, record) => {

		}
	}];
	export default {
		data() {
			return {
				rows: 0,
				datas: [],
				columns,
				hasload: false,
				loading: true,
			};
		},
		mounted() {
			this.fetch();
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
				this.axios.post('/json/student/student/allClassmates').then((res) => {
					console.log(res.data.code)
					if (res.data.code == 0) {
						var datas = new Array()
						var data = res.data.classmateMessages
						for(var i in  res.data.classmateMessages ){
							datas.push({key:i,stu_no:data[i].stuno,name:data[i].userName})
						}
						this.datas = datas
					} else {
						this.$emit('tip', {
							type: "error",
							text: '获取班级学生信息失败'
						})
					}
					this.loading = false;
					this.hasload = true;
					// this.datas = res.data.classmateBeans;

				}).catch((err) => {
					this.$emit('tip', {
						type: "warning",
						text: '发生未知错误'
					})
				});
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
