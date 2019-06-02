<template>
	<div style="height: auto;width: auto;">
		<div style="background-color: #ececec; padding: 20px;height: auto;width: auto;">
			<a-row>
				<a-col :span="12">
					<a-card title="添加学生亲属修改前" :bordered=false>
						<span>结束时间：</span>{{endtime}}
						<span>描述：</span>{{country}}
					</a-card>
				</a-col>

				<a-col :span="12">
					<a-card title="添加学生亲属修改后" :bordered=false>
						<span>结束时间：</span>{{endtime}}
						<span>描述：</span>{{country}}
					</a-card>
				</a-col>
			</a-row>
		</div>
		<div style="height: auto;">
			<a-table :columns="columns" :dataSource="data" bordered></a-table>
		</div>
		<div style="height: auto;width: auto;">
			<a-card title="申请理由">
				<p>card content</p>
				<p>card content</p>
				<p>card content</p>
			</a-card>
		</div>
	</div>

</template>

<script>
	const columns = [{
		title: '审核步骤',
		dataIndex: 'no',

	}, {
		title: '审批人姓名',
		dataIndex: 'name',
	}, {
		title: '审批结果',
		dataIndex: 'result',
	},{
		title: '审核时间',
		dataIndex: 'time',
	},{
		title: '审批人意见',
		dataIndex: 'suggest',
	}];

	const data = [{
		key: '1',
		no:'1',
		name: '杨雨萌',
		result: '通过',
		time: '2019-5-16',
		suggest:'情况属实，批准通过',
	}, {
		key: '2',
		no:'2',
		name: '大张',
		result: '通过',
		time: '2019-5-16',
		suggest:'情况属实，批准通过',
	}, {
		key: '3',
		no:'3',
		name: '小张',
		result: '通过',
		time: '2019-5-16',
		suggest:'情况属实，批准通过',
	}];

	export default {
		data() {
			return {
				data,
				columns,
			}
		}
	}
</script>

<style>
	th.column-money,
	td.column-money {
		text-align: right !important;
	}
</style>