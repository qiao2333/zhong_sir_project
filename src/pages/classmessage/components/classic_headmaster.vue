<!--查看所带班级（主修专业）所有学生的所有信息
查看所授课班级学生信息（看到所有这个教师授课的班级，同时看到这个班级里的所有学生，而且能看到这个学生的学号，姓名，通信方式和照片）-->
<template>
	<div class="content" style="background-color: white;">
		<a-dropdown-button @click="handleMenuClick">
			选择班级
			<a-menu slot="overlay" @click="handleMenuClick">
				<a-menu-item key="1">
					<a-icon type="user" />16软一</a-menu-item>
				<a-menu-item key="2">
					<a-icon type="user" />16软二</a-menu-item>
				<a-menu-item key="3">
					<a-icon type="user" />16软三</a-menu-item>
			</a-menu>
		</a-dropdown-button>
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
			scopedSlots: {
				customRender: 'stu_no'
			},
		}, {
			title: '姓名',
			dataIndex: 'user_name',
		}, {
			title: '性别',
			dataIndex: 'stu_sex',
		}, {
			title: '移动电话号码',
			dataIndex: 'stu_phone',
		}
	];
	export default {
		data() {
			return {
				rows: 0,
				datas: [],
				hasload: false,
				columns,
				loading: true
			}
		},
		mounted() {
			this.fetch()
		},
		methods: {
			handleButtonClick(e) {
				console.log('click left button', e);
			},
			handleMenuClick(e) {
				console.log('click', e);
			},
			fetch() {
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
		handleTableChange() {
			this.fetch()
		},
		onSearch(value) {
			console.log(value)
		}
	}
</script>