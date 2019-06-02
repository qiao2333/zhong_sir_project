<!--辅导员以上的查看院级学生信息-->
<template>
	<div class="content" style="background-color: white;">
		<a-input-search placeholder="输入学号姓名搜索" style="width: 200px" @search="onSearch" />
		<a-button type="primary" @click="showDrawer">
			<a-icon type="plus" />高级筛选
		</a-button>
		<a-drawer title="高级筛选" :width="720" @close="onClose" :visible="visible" :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}">
			<a-form :form="form" layout="vertical" hideRequiredMark>
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="学校">
							<a-select v-decorator="['owner', {
                  rules: [{ required: true, message: 'Please select an owner' }]
                }]" placeholder="Please a-s an owner">
								<a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
								<a-select-option value="mao">Maomao Zhou</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="年级">
							<a-select v-decorator="['type', {
                  rules: [{ required: true, message: 'Please choose the type' }]
                }]" placeholder="Please choose the type">
								<a-select-option value="private">Private</a-select-option>
								<a-select-option value="public">Public</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="专业">
							<a-select v-decorator="['approver', {
                  rules: [{ required: true, message: 'Please choose the approver' }]
                }]" placeholder="Please choose the approver">
								<a-select-option value="jack">Jack Ma</a-select-option>
								<a-select-option value="tom">Tom Liu</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>

					<a-col :span="12">
						<a-form-item label="班级">
							<a-select v-decorator="['approver', {
                  rules: [{ required: true, message: 'Please choose the approver' }]
                }]" placeholder="Please choose the approver">
								<a-select-option value="jack">Jack Ma</a-select-option>
								<a-select-option value="tom">Tom Liu</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>

				</a-row>
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="学号">
							<a-input v-decorator="['name', {
                  rules: [{ required: true, message: 'Please enter user name' }]
                }]" placeholder="Please enter user name" />
						</a-form-item>
					</a-col>

					<a-col :span="12">
						<a-form-item label="姓名">
							<a-input v-decorator="['name', {
                  rules: [{ required: true, message: 'Please enter user name' }]
                }]" placeholder="Please enter user name" />
						</a-form-item>
					</a-col>

				</a-row>
			</a-form>
			<div :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }">
				<a-button :style="{marginRight: '8px'}" @click="onClose">
					取消
				</a-button>
				<a-button @click="onClose" type="primary">提交</a-button>
			</div>
		</a-drawer>
		<a-table :columns="columns" :dataSource="datas" :loading="loading" @change="handleTableChange()" bordered>
		</a-table>
	</div>
</template>
<script>
	const columns = [{
			title: '学校',
			dataIndex: 'university_id',
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
		},
		{
			title: '历史信息',
			dataIndex: 'stu_history',
			scopedSlots: {
				customRender: 'stu_history'
			},
		}
	];
	export default {
		data() {
			return {
				form: this.$form.createForm(this),
				visible: false,
				rows: 0,
				datas: [],
				hasload: false,
				columns,
				loading: true
			}
		},
		methods: {

			showDrawer() {
				this.visible = true
			},
			onClose() {
				this.visible = false
			},
		},
	}
</script>