<template>
	<div>
		<div>
			<a-drawer title="高级筛选" @close="onClose" :visible="drawerOpen" width="560" :mask-closable="false">
				<a-form :visible="drawerOpen" @submit="handleSubmit" :form="myform">
					<a-form-item label="学号">
						<a-input v-decorator="['studentNo']" type="text" />
					</a-form-item>
					<a-form-item label="姓名">
						<a-input v-decorator="['studentName']" type="text" />
					</a-form-item>
					<a-form-item label="性别">
						<a-checkbox-group v-decorator="['user_sex']" :options="forms.user_sexOptions" />
					</a-form-item>
					<a-collapse>
						<a-collapse-panel :forceRender="true" header="年级" key="1">
							<a-form-item>
								<a-checkbox-group v-decorator="['grade']" :options="forms.gradeOptions" />
							</a-form-item>
						</a-collapse-panel>
						<a-collapse-panel :forceRender="true" header="专业" key="2">
							<a-form-item>
								<a-checkbox-group v-decorator="['specialty']" :options="forms.specialtyOptions" />
							</a-form-item>
						</a-collapse-panel>
						<a-collapse-panel :forceRender="true" header="班级" key="3">
							<a-form-item>
								<a-checkbox-group v-decorator="['className']"  :options="forms.classNameOptions" />
							</a-form-item>
						</a-collapse-panel>
						<a-collapse-panel :forceRender="true" header="岗位" key="4">
							<a-form-item>
								<a-checkbox-group v-decorator="['position']"  :options="forms.positionOptions" />
							</a-form-item>
						</a-collapse-panel>
						<a-collapse-panel :forceRender="true" header="政治面貌" key="5">
							<a-form-item>
								<a-checkbox-group v-decorator="['political']"  :options="forms.pliticalOptions" />
							</a-form-item>
						</a-collapse-panel>
					</a-collapse>
					<a-button :style="{ marginRight: '8px' }" @click="onClose">取消</a-button>
					<a-button html-type="submit" type="primary">查找</a-button>
				</a-form>

			</a-drawer>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				forms: {
					pliticalOptions: [{label:'团员',value:0},{label:'群众',value:1},{label:'党员',value:2}],
					positionOptions: [{label:'班长',value:0},{label:'学习委员',value:1},{label:'体育委员',value:2},],
					classNameOptions: [{label:'16软一',value:0},{label:'15科一',value:1},{label:'16软二',value:2}],
					gradeOptions: [{label:'2015',value:0},{label:'2016',value:1},{label:'2017',value:2}],
					specialtyOptions: [{label:'软件工程',value:0},{label:'大数据',value:1},{label:'计算机科学',value:2}],
					user_sexOptions: [{
						label: '男',
						value: 0
					}, {
						label: '女',
						value: 1
					}, {
						label: '不详',
						value: 2
					}],

				},
				drawerOpen: false,
				myform: this.$form.createForm(this),
			}
		},
		methods: {
			opendrawer() {
				this.drawerOpen = true
			},
			onClose() {
				this.drawerOpen = false
			},
			handleSubmit(e) {
				console.log("高级筛选中")
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						var obj = {...values}
						obj = this.$lodash.omitBy(obj,this.$lodash.isEmpty)
						console.log(obj)
					}
				});
			}

		},
	}
</script>

<style>
</style>
