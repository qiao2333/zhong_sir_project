<template>
	<div class="content">
		<div style="width: auto;background: #fff;">
			<!--<label><strong> 下拉选择业务类型：</strong></label>-->
			<a-select  placeholder="点击选择搜索类型"  style="width: 15%" type="primary" size="large" @select="onSearch">
				<a-select-option value="0" >未审批</a-select-option>
				<a-select-option value="1" >已通过</a-select-option>
				<a-select-option value="2">未通过</a-select-option>
			</a-select>
		</div>
		<a-table :columns="columns" :dataSource="datas1">
			<span slot="action" slot-scope="text, record">
		      	<a-button size="small" @click="showModal">明细</a-button>
		    </span>
		</a-table>
		<a-modal title="申请结果详情" :visible="visible" @ok="hideModal" @cancel="hideModal" okText="确认" cancelText="取消">
			<PictureModal></PictureModal>
		</a-modal>
	</div>

</template>

<script>
	import PictureModal from "../components/picturemodal"
	const columns = [{
			title: '业务类型',
			dataIndex: 'type',
			key: 'type',

		},
		{
			title: '开始时间',
			dataIndex: 'start_time',
			key: 'start_time',
		}, {
			title: '结束时间',
			dataIndex: 'end_time',
			key: 'end_time',
		}, {
			title: '申请结果',
			key: 'result',
			dataIndex: 'result',
		}, {
			title: '详情',
			key: 'action',
			scopedSlots: {
				customRender: 'action'
			},
		}
	];

	export default {
		components: {
			PictureModal
		},
		data() {
			return {
				columns,
				visible: false,
				rows: 0,
				datas: [],
				datas1: [],
				hasload: false,
				loading: true
			}
		},
		mounted() {
			this.fetch()
		},
		methods: {
			fetch() {
				this.$axios.get('/json/userinfoApplyApproval/userinfoApplyApproval/listAll').then((res) => {
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"获取成功"})
						this.datas = res.data.userinfoApplyApprovals
					}else{
						this.$emit("tip",{type:"error",text:"获取失败"})
					}
					//					console.log(data)
					this.rows = data.rows
					this.datas = data.datas
					this.loading = false
					this.hasload = true
				}).catch((err) => {
					console.log(err)
				})
			},
			onSearch(value,Option) {
					this.datas1 = this.datas.filter(item => {
					if(item.type.includes(value)) {
						return item
					}
					
				})
			},
			handleTableChange() {
				this.fetch()
			},
			showModal() {
				this.visible = true
			},
			hideModal() {

				this.visible = false

			},
			callback(key) {
				console.log(key)
			},
			handleButtonClick(e) {
				console.log('click left button', e);
			},
		}

	}
</script>