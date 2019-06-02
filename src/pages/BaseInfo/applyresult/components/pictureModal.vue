<template>
	<div style="height: auto;width: auto;">
		<div style="background-color: #ececec; padding: 5px;height: auto;width: auto;">
			<a-row>
				<div style="height: auto; width: auto;">
					<a-col :span="12">
					<a-card title="图像修改前" :bordered=false>
					</a-card>
				</a-col>

				<a-col :span="12">
					<a-card title="图像修改后" :bordered=false>
					</a-card>
				</a-col>
				</div>
				
			</a-row>
		</div>
		<div style="height: auto;">
			<a-table :columns="columns" :dataSource="data" bordered></a-table>
		</div>
		<div style="height: auto;width: auto;">
			<a-card title="申请理由">
				<p>最近又长帅了，不修改照片认不出来！</p>
			</a-card>
		</div>
	</div>

</template>

<script>
	const columns = [
	{
		title: '用户类型',
		dataIndex: 'type',

	},{
		title: '申请人姓名',
		dataIndex: 'apply_name',

	},{
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
		type:'照片修改',
		apply_name:'莫又宽又圆',
		no:'1',
		name: '杨雨萌',
		result: '通过',
		time: '2019-5-16',
		suggest:'情况属实，批准通过',
	}, {
		key: '2',
		type:'照片修改',
		apply_name:'莫又宽又圆',
		no:'2',
		name: '杨雨萌',
		result: '通过',
		time: '2019-5-16',
		suggest:'情况属实，批准通过',
	}, {
		key: '3',
		type:'照片修改',
		apply_name:'莫又宽又圆',
		no:'3',
		name: '杨雨萌',
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