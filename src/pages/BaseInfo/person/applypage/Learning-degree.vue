<template>
	<div>
		<a-card title="申请修改学历页面">
		<a-form :form="myform" @submit="handleSubmit">
			<template>
				<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
			</template>
			<a-form-item>
				<a-
			</a-form-item>
			<a-button type="primary" html-type="submit">提交</a-button>
		</a-form>
		</a-card>
	</div>
</template>

<script>
	import AutoInput from '@/pages/Baseinfo/components/autoCreateForm/AutoCreateForm'
	export default {
		data() {
			return {
				// 开始时间
				// 结束时间
				// 国家
				// 城市
				// 学校
				// 受教育程度（下拉框选择）
				// 学历（下拉框选择）
				// 申请理由
				myform: this.$form.createForm(this),
				forms: [
					{
						key:1,
						label: "开始时间",
						type:"date",
						name:"begintime",
						rules:{
							rules:[{
								required: true,
								message: '请输入你的开始时间'
							}],
							initialValue:"1996-3-5"
						},
					},
					{
						key:2,
						label: "结束时间",
						type:"date",
						name:"endtime",
						rules:{
							rules:[{
								required: true,
								message: '请输入你的结束时间'
							}],
							initialValue:"1996-3-5"
						},
					},
					
				],
			}
		},
		components: {
			AutoInput
		}

	}
</script>

<style>
</style>
