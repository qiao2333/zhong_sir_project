<template>
	<div>
		<a-card title="申请修改学生亲属页面">
			<a-form :form="myform">
				<a-form-item label="选择游客用户" >
					<a-select showSearch placeholder="搜索游客用户，根据姓名和身份证" :showArrow="false" :notFoundContent="null" @search="handleSearch" @change="handleChange">
						<a-select-option v-for="d in data" :key="d.value">{{d.text}}</a-select-option>
					</a-select>
				</a-form-item>
				<template>
					<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
				</template>
			</a-form>
		</a-card>
	</div>
</template>

<script>
	import AutoInput from '@/pages/Baseinfo/components/autoCreateForm/AutoCreateForm'
	export default {
		props: {
			oldvalue: {
				type: Object,
			},
		},
		data() {
			return {
				data: [],
				myform: this.$form.createForm(this),
				forms: [{
						key: 1,
						label: "关系",
						type: "select",
						name: "relationship",
						rules: {
							rules: [{
								required: true,
							}],
							initialValue: this.oldvalue.relationship
						},
						options: [{
								key: 1,
								name: "母",
								value: 0
							},
							{
								key: 2,
								name: "父",
								value: 1
							},
							{
								key: 3,
								name: "兄",
								value: 2
							},
							{
								key: 4,
								name: "弟",
								value: 3
							},
							{
								key: 5,
								name: "姐",
								value: 4
							},
							{
								key: 6,
								name: "妹",
								value: 5
							},
							{
								key: 7,
								name: "其他",
								value: 6
							},
						]
					},
					{
						key: 2,
						label: "申请理由",
						type: "textarea",
						name: "reason",
						rules: {
							rules: [{
								required: true,
								max: 20,
								message: '请输入你的申请理由 20字符以内!',
							}],
						},
					},

				],
			}
		},
		components: {
			AutoInput
		},
		methods: {
			handleSearch() {

			},
			handleChange() {

			}
		},

	}
</script>

<style>
</style>
