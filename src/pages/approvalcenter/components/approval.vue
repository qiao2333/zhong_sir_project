<!--
	作者：1558684603@qq.com
	时间：2019-05-10
	描述：业务名称，申请人姓名，申请时间，上一个审批人姓名，第几步审核，审批结果，按钮（详情）
		提供业务名称筛选（选择下拉框），审批结果，申请人姓名（模糊查询）
		审批中心的详情页面内容说明：显示业务名称，申请人姓名、（如果有旧的记录，就分别在左边和右边显示旧的、新的记录），
		中间下方申请理由，每一步的审核结果、审核人姓名、审核时间、按钮（确认通过）、按钮（不通过），通过或不通过的原因
-->
<template>
	<div>
		<div>
			<a-button type="primary" @click="showDrawer">
				<a-icon type="plus" /> 高级筛选
			</a-button>
			<a-drawer title="高级筛选" :width="650" @close="onClose" :visible="visible" :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}">
				<a-form :form="form" @submit="handleSubmit" layout="vertical" hideRequiredMark>
					<a-form-item label="选择类型">
						<a-select mode="tags" :size="size" placeholder="Please select" :defaultValue="['a1', 'b2']" style="width: 400px" @change="handleChange">
							<a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
								{{(i + 9).toString(36) + i}}
							</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="审核结果">
						<a-select mode="tags" :size="size" placeholder="Please select" :defaultValue="['a1', 'b2']" style="width: 400px" @change="handleChange">
							<a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
								{{(i + 9).toString(36) + i}}
							</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="申请人">
						<a-input size="large" placeholder="large size" />
					</a-form-item>
					<a-form-item>
						<a-button html-type="submit" type="primary" icon="search">搜索</a-button>
					</a-form-item>
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
						Cancel
					</a-button>
					<a-button @click="onClose" type="primary">Submit</a-button>
				</div>
			</a-drawer>
		</div>
		<div>
			<a-table :columns="columns" :dataSource="data">
				<a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
				<span slot="customTitle"><a-icon type="smile-o" /> 申请人姓名</span>
				<span slot="tags" slot-scope="tags">
      			<a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
			</span>
				<span slot="action" slot-scope="text, record">
		      	<a-button size="small" @click="showModal">明细</a-button>
		    </span>
			</a-table>

			<a-modal title="Modal" :visible="visible" @ok="hideModal" @cancel="hideModal" okText="确定" cancelText="取消">
				<a-tabs @change="callback" type="card">
					<a-tab-pane tab="历史记录" key="1">
						<a-list bordered :dataSource="data">
							<a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
						</a-list>
					</a-tab-pane>
					<a-tab-pane tab="审核结果" key="2">
						<div id="">
							<a-input placeholder="申请人姓名" /><br><br>
							<a-input placeholder="审核结果" /><br><br>
							<a-input placeholder="审核人" /><br><br>
							<a-input placeholder="审核时间" /><br><br>
							<a-textarea placeholder="申请理由" :autosize="{ minRows: 2, maxRows: 6 }" />
							<a-textarea placeholder="处理意见" :autosize="{ minRows: 2, maxRows: 6 }" />
							<a-button type="danger">不通过</a-button>
							<a-button type="primary">通过</a-button>
						</div>
					</a-tab-pane>
					<a-tab-pane tab="申请记录" key="3">
						<a-list bordered :dataSource="data">
							<a-list-item slot="renderItem" slot-scope="item, index">{{item}}</a-list-item>
						</a-list>
					</a-tab-pane>
				</a-tabs>
			</a-modal>
		</div>
	</div>
</template>
<script>
	const columns = [{
		dataIndex: 'name',
		key: 'name',
		slots: {
			title: 'customTitle'
		},
		scopedSlots: {
			customRender: 'name'
		},
	}, {
		title: '申请时间',
		dataIndex: 'age',
		key: 'age',
	}, {
		title: '上一个审批人姓名',
		dataIndex: 'address',
		key: 'address',
	}, {
		title: '第几步审核',
		dataIndex: 'next',
		key: 'next',
	}, {
		title: '审批结果',
		key: 'tags',
		dataIndex: 'tags',
		scopedSlots: {
			customRender: 'tags'
		},
	}, {
		title: '详情',
		key: 'action',
		scopedSlots: {
			customRender: 'action'
		},
	}];
	const provinceData = ['Zhejiang', 'Jiangsu'];
	const cityData = {
		Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
		Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
	};

	const data = [{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		next: 'aa',
		tags: ['nice', 'developer'],

	}, {
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		next: 'aa',
		tags: ['loser'],
	}, {
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		next: 'aa',
		tags: ['cool', 'teacher'],
	}];

	export default {
		data() {
			return {
				data,
				columns,
				visible: false,
				provinceData,
				cityData,
				cities: cityData[provinceData[0]],
				secondCity: cityData[provinceData[0]][0],
				form: this.$form.createForm(this),
			}
		},
		methods: {
			showDrawer() {
				this.visible = true
			},
			showModal() {
				this.visible = true	
			},
//			onClose(){
//				this.visible = false
//			},
			callback(key) {
				console.log(key)
			},
			hideModal() {
				this.visible = false
			},
			handleProvinceChange(value) {
				this.cities = cityData[value]
				this.secondCity = cityData[value][0]
			},
			handleChange(value) {
				console.log(`Selected: ${value}`);
			},
			popupScroll() {
				console.log('popupScroll')
			},
		},
	}
</script>