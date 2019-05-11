<template>
	<div>
		<a-spin v-if="hasload" />
		<a-card v-else title="申请修改学生主要信息页面">
			<a-form :form="myform" @submit="handleSubmit">
				<template>
					<AutoInput v-for="form in forms" :key="form.key" :Autoform="form"></AutoInput>
				</template>
				<a-form-item label="年级">
					<a-select>
						<a-select-options v-for="grade in grades" :value="grade.value" :key="grade.key">
							{{grade.label}}
						</a-select-options>
					</a-select>
				</a-form-item>
				<a-form-item label="主修专业">
					<a-select>
						<a-select-options v-for="major in majors" :value="major.value" :key="major.key">
							{{major.label}}
						</a-select-options>
					</a-select>
				</a-form-item>
				<a-form-item label="专业班级">
					<a-select>
						<a-select-options v-for="c in classes" :value="c.value" :key="c.key">
							{{c.label}}
						</a-select-options>
					</a-select>
				</a-form-item>
				<a-form-item label="政治面貌">
					<a-select>
						<a-select-options v-for="political in politicals" :value="political.value" :key="political.key">
							{{political.label}}
						</a-select-options>
					</a-select>
				</a-form-item>
				<a-form-item label="宿舍">
					<a-select>
						<a-select-options v-for="political in politicals" :value="political.value" :key="political.key">
							{{political.label}}
						</a-select-options>
					</a-select>
				</a-form-item>
				<a-button type="primary" html-type="submit">提交</a-button>
			</a-form>
		</a-card>
	</div>
</template>

<script>
	import AutoInput from '@/pages/components/autoCreateForm/AutoCreateForm'
	export default {
		data() {
			return {
				hasload: false,//是否加载完
				grades: [],//年级数据
				classes: [],//主修专业数据
				politicals: [],//政治面貌数据
				// 业务名称
				// 学号
				// 入学日期
				// 年级
				// 主修专业
				// 专业班级
				// 政治面貌（下拉框选择）
				// 宿舍
				// 住址
				// 通信地址
				// 申请理由
				myform: this.$form.createForm(this),
				forms: [{
						key: 1,
						label: "学号",
						type: "text",
						name: "stuNo",
						rules: {
							rules: [{
								required: true,
								message: "请输入学号",
								pattern: /^\d{20,20}$/g
							}],
							initialValue: "124124124"
						},
					},
					{
						key: 2,
						label: "入学日期",
						type: "date",
						name: "beginLearnDate",
						rules: {
							rules: [{
								required: true,
								max: 20,
								message: '请输入你的具体联系方式 80字符以内!',


							}],
							initialValue: "草泥马"
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
