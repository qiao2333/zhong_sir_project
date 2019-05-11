<template>

	<div>

		<a-dropdown>

			<a-menu slot="overlay" @click="handleMenuClick">

				<a-menu-item key="1">

					<a-icon type="user" />1st menu item</a-menu-item>

				<a-menu-item key="2">

					<a-icon type="user" />2nd menu item</a-menu-item>

				<a-menu-item key="3">

					<a-icon type="user" />3rd item</a-menu-item>

			</a-menu>

			<a-button style="margin-left: 8px">

				业务名称

				<a-icon type="down" />

			</a-button>

		</a-dropdown>

		<a-table :columns="columns" :dataSource="data">

			<a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>

			<span slot="customTitle"><a-icon type="smile-o" /> 姓名</span>

			<span slot="tags" slot-scope="tags">

      			<a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>

			</span>

			<span slot="action" slot-scope="text, record">

		      	<a-button size="small" @click="showModal">明细</a-button>

		    </span>

		</a-table>



		<a-modal title="Modal" :visible="visible" @ok="hideModal" okText="确认" cancelText="取消">

			<a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data">

				<a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>

			</a-table>

		</a-modal>



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

		title: '开始时间',

		dataIndex: 'age',

		key: 'age',

	}, {

		title: '结束时间',

		dataIndex: 'address',

		key: 'address',

	}, {

		title: '申请结果',

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



	const data = [{

		key: '1',

		name: 'John Brown',

		age: 32,

		address: 'New York No. 1 Lake Park',

		tags: ['nice', 'developer'],

	}, {

		key: '2',

		name: 'Jim Green',

		age: 42,

		address: 'London No. 1 Lake Park',

		tags: ['loser'],

	}, {

		key: '3',

		name: 'Joe Black',

		age: 32,

		address: 'Sidney No. 1 Lake Park',

		tags: ['cool', 'teacher'],

	}];



	export default {

		data() {

			return {

				data,

				columns,

				visible: false,

			}

		},

		methods: {

			showModal() {

				this.visible = true

			},

			hideModal() {

				this.visible = false

			}

		}

	}

</script>