<!--辅导员查看班级学生信息，与老师界面一样
院级学生信息-->
<template>
	<div class="content" style="background-color: white;">
		<a-input-search placeholder="输入学号或姓名搜索" style="width: 200px" @search="onSearch" />
		<a-button type="primary" @click="showDrawer">
			<a-icon type="plus" />高级筛选
		</a-button>
		<a-drawer title="高级筛选" :width="720" @close="onClose" :visible="visible" :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}">
			<div style="width: auto; height: 360px;">
				<a-form :form="form" layout="vertical" hideRequiredMark>
					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="学院">
								<a-select placeholder="输入你要搜索的学院名称">
									<a-select-option value="aa">肇庆学院</a-select-option>
									<a-select-option value="bb">清华大学</a-select-option>
									<a-select-option value="xiao">北京大学</a-select-option>
									<a-select-option value="mao">中山大学</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="年级">
								<a-select placeholder="输入你要搜索的年级">
									<a-select-option value="private">2018级</a-select-option>
									<a-select-option value="public">2017级</a-select-option>
									<a-select-option value="private">2016级</a-select-option>
									<a-select-option value="public">2015级</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="专业">
								<a-select placeholder="输入你要搜索的专业名称">
									<a-select-option value="aa">软件工程</a-select-option>
									<a-select-option value="bb">物联网工程</a-select-option>
									<a-select-option value="xiao">网络工程</a-select-option>
									<a-select-option value="mao">计算机科技</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="班级">
								<a-select placeholder="输入你要搜索的专业">
									<a-select-option value="private">软件工程一班</a-select-option>
									<a-select-option value="public">软件工程二班</a-select-option>
									<a-select-option value="public">软件工程三班</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<a-col :span="12">
							<a-form-item label="学号">
								<a-input placeholder="输入你要搜索的学生学号" />
							</a-form-item>
						</a-col>

						<a-col :span="12">
							<a-form-item label="姓名">
								<a-input placeholder="输入你要搜索的学生姓名" />
							</a-form-item>
						</a-col>

					</a-row>
				</a-form>
			</div>

			<div align="right">
				<a-button :style="{marginRight: '10px'}"  @click="onClose" size="large">
					取消
				</a-button>
				<a-button icon="search" @click="onClose" type="primary" size="large">搜索</a-button>
			</div>
		</a-drawer>
		<a-table :columns="columns" :dataSource="datas1" :loading="loading" @change="handleTableChange()" bordered>
		</a-table>
	</div>
</template>
<script>
	const columns = [{
			title: '学院',
			dataIndex: 'college_id',
		},
		{
			title: '年级',
			dataIndex: 'grade',
		},
		{
			title: '专业',
			dataIndex: 'major_id',
		},
		{
			title: '班级',
			dataIndex: 'class_id',
		},
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
		}, {
			title: '当前住址',
			dataIndex: 'home_address',
		}
	];
	export default {
		data() {
			return {
				form: this.$form.createForm(this),
				visible: false,
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

			showDrawer() {
				this.visible = true
			},
			onClose() {
				this.visible = false
			},
			fetch() {
				this.$axios.post('/classmessage/classic_college').then((res) => {
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
						if(item.stu_no.toString().includes(value)) {
							return item
						}

					})
				} else {
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