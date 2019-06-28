<!--查看教师信息-->
<template>
	<div>
		<div style="height: 1000px;">
			<div v-if="hasGetClass">
				所教班级：
				<a-select @change="handleChange" style="width: 100%" :options="options" allowClear></a-select>
			</div>
			<a-table rowKey="userId" :columns="columns" :dataSource="datas" :loading="loading" bordered>
				<div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class='custom-filter-dropdown'>
					<a-input v-ant-ref="c => searchInput = c" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
					 @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])" @pressEnter="() => handleSearch(selectedKeys, confirm)"
					 style="width: 188px; margin-bottom: 8px; display: block;" />
					<a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)" icon="search" size="small" style="width: 90px; margin-right: 8px">Search</a-button>
					<a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">Reset</a-button>
				</div>
				<a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : undefined }" />


				<a slot="studentNo" slot-scope="text,record" @click="toOtherPerson(record.userId)">{{text}}</a>

			</a-table>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				rows: 0,
				datas: [],
				columns: [{
						title: '学生学号',
						dataIndex: 'studentNo',
						key: 'studentNo',
						scopedSlots: {
							customRender: 'studentNo',
							filterDropdown: 'filterDropdown',
							filterIcon: 'filterIcon',
						},
						onFilter: (value, record) => record.studentNo.toString().toLowerCase().includes(value.toLowerCase()),
						onFilterDropdownVisibleChange: (visible) => {
							if (visible) {
								setTimeout(() => {
									this.searchInput.focus()
								})
							}
						},
					},
					{
						title: '学生姓名',
						dataIndex: 'studentName',
						key: 'studentName',
						scopedSlots: {
							filterDropdown: 'filterDropdown',
							filterIcon: 'filterIcon',
						},
						onFilter: (value, record) => record.studentName.toString().toLowerCase().includes(value.toLowerCase()),
						onFilterDropdownVisibleChange: (visible) => {
							if (visible) {
								setTimeout(() => {
									this.searchInput.focus()
								})
							}
						},
					},
					{
						title: '性别',
						dataIndex: 'sex',
						key: 'sex'
					},
					{
						title: '年级',
						dataIndex: 'grade',
						key: 'grade'
					},
					{
						title: '专业',
						dataIndex: 'specialty',
						key: 'specialty'
					},
					{
						title: '政治面貌',
						dataIndex: 'political',
						key: 'political'
					},
					{
						title: '班级',
						dataIndex: 'className',
						key: 'className'
					},
					{
						title: '岗位',
						dataIndex: 'position',
						key: 'position'
					},
					{
						title: '入学日期',
						dataIndex: 'beginLearnDate',
						key: 'beginLearnDate'
					},
				],
				searchInput: null,
				searchText: '',
				hasGetClass: false,
				options: [],
				loading: false,
				visible: false,
			};
		},
		mounted() {
			this.fetch();
		},
		methods: {
			handleSearch(selectedKeys, confirm) {
				confirm()
				this.searchText = selectedKeys[0]
			},

			handleReset(clearFilters) {
				clearFilters()
				this.searchText = ''
			},
			fetch() {
				this.$emit("reload",true)
				this.axios.get('/json/class/employee/class/allClassmates').then((res) => {
					if (res.data.code == 0) {
						var options = new Array()
						var data = res.data.classBeans
						for (var i in data) {
							options.push({
								label: data[i].name,
								value: data[i].code
							})
						}
						this.options = options
						this.$emit('tip', {
							type: "success",
							text: '获取班级成功'
						})
						this.hasGetClass = true
					} else {
						this.$emit('tip', {
							type: "error",
							text: '获取信息失败'
						})
					}
				}).catch(err => {
					this.$emit('tip', {
						type: "warning",
						text: '发生未知错误'
					})
				}).then(()=>{
					this.$emit("reload",false)
				})
			},
			async handleChange(value) {
				this.loading = true
				if (value == undefined) {
					this.datas = null,
						setTimeout(() => {
							this.loading = false
						}, 1000)
					return
				}
				await this.getClassmate(value)
			},
			toOtherPerson(userId) {
				console.log(userId)
				this.$router.push({
					name: 'otherPerson',
					params: {
						OtherPersonType: 1,
						OtherPersonId: userId,
						MyPersonType: 2
					}
				});
			},
			getClassmate(code) {
				this.$emit("reload",true)
				this.axios.get("/json/student/student/allClassmates/" + code).then((res) => {
					if (res.data.code == 0) {
						this.datas = res.data.classmateBeans
					}
				}).catch((err) => {
					this.$emit("tip", {
						type: error,
						text: "发生未知错误"
					})
				}).then(() => {
					this.$emit("reload",false)
					this.loading = false
				})
			},
		}
	};
</script>
<style></style>
