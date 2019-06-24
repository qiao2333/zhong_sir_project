<template>
	<div>
		<div>
			<a-drawer title="职员高级筛选" @close="onClose" :visible="drawerOpen" width="560" :mask-closable="false">
				<a-form :visible="drawerOpen" @submit="handleSubmit" :form="myform">
					<a-form-item label="姓名">
						<a-input v-decorator="['employeeNames']" type="text" />
					</a-form-item>
					<a-collapse>
						<a-collapse-panel :forceRender="true" header="科室" key="1">
							<a-form-item>
								<a-checkbox-group v-decorator="['subDepartments']" :options="forms.subDepartOptions" />
							</a-form-item>
						</a-collapse-panel>
						<a-collapse-panel :forceRender="true" header="岗位" key="2">
							<a-form-item>
								<a-checkbox-group v-decorator="['positionNames']" :options="forms.positionOptions" />
							</a-form-item>
						</a-collapse-panel>
						<a-collapse-panel :forceRender="true" header="学院" key="3">
							<a-form-item>
								<a-checkbox-group v-decorator="['departmentNames']" :options="forms.departmentOptions" />
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
					subDepartOptions:[],
					positionOptions:[],
					departmentOptions:[],
				},
				drawerOpen: false,
				myform: this.$form.createForm(this),
			}
		},
		methods: {
			opendrawer() {
				this.axios.get("/json/employee/filter/all?userId=" + 2106).then((res) => {
					this.forms.pliticalOptions = res.data.filterMessage.politicalName
					this.forms.positionOptions = res.data.filterMessage.positionName
					this.forms.classNameOptions = res.data.filterMessage.className
					this.forms.gradeOptions = res.data.filterMessage.gradeName
					this.forms.specialtyOptions = res.data.filterMessage.specialtyName
					this.drawerOpen = true
				}).catch((err) => {
					console.log(err)
				})

			},
			onClose() {
				this.drawerOpen = false
			},
			handleSubmit(e) {
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						var obj = { ...values
						}
						obj = this.$lodash.omitBy(obj, this.$lodash.isEmpty)
						console.log(obj)
						this.$emit("heightSearch",obj)
					}
				});
			}

		},
	}
</script>

<style>
</style>
