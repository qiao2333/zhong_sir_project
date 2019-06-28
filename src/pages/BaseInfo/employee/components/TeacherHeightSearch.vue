<template>
	<div>
		<div>
			<a-drawer title="职员高级筛选" @close="onClose" :visible="drawerOpen" width="560" :mask-closable="false">
				<a-form :visible="drawerOpen" @submit="handleSubmit" :form="myform">
					<a-form-item label="姓名">
						<a-input v-decorator="['employeeName']" type="text" />
					</a-form-item>
					<a-collapse>
						<a-collapse-panel :forceRender="true" header="科室" key="1">
							<a-form-item>
								<a-checkbox-group v-decorator="['subDepartmentNames']" :options="forms.subDepartmentName" />
							</a-form-item>
						</a-collapse-panel>
						<a-collapse-panel :forceRender="true" header="岗位" key="2">
							<a-form-item>
								<a-checkbox-group v-decorator="['positionNames']" :options="forms.positionName" />
							</a-form-item>
						</a-collapse-panel>
						<a-collapse-panel :forceRender="true" header="学院" key="3">
							<a-form-item>
								<a-checkbox-group v-decorator="['departmentNames']" :options="forms.departmentName" />
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
				forms:{
					departmentName:[],
					positionName:[],
					subDepartmentName:[]
				},
				drawerOpen: false,
				myform: this.$form.createForm(this),
			}
		},
		methods: {
			opendrawer() {
				this.axios.get("/json/employee/filter/employees/all").then((res) => {
					if(res.data.code == 0){
						this.forms.departmentName = res.data.filtermessage.departmentName
						this.forms.positionName = res.data.filtermessage.positionName
						this.forms.subDepartmentName = res.data.filtermessage.subDepartmentName
						this.drawerOpen = true
						this.$emit("tip",{type:'success',text:'获取筛选信息成功'})
					}else{
						this.$emit("tip",{type:'error',text:'获取筛选信息失败'})
					}
					
				}).catch((err) => {
					this.$emit("tip",{type:'warning',text:'发生未知错误'})
				})

			},
			onClose() {
				this.drawerClose()
			},
			drawerClose(){
				this.drawerOpen = false
			},
			handleSubmit(e) {
				e.preventDefault();
				this.myform.validateFields((err, values) => {
					if (!err) {
						var obj = { ...values}
						obj = this.$lodash.omitBy(obj, this.$lodash.isEmpty)
						console.log(obj)
						this.drawerClose()
						this.$emit("heightSearch",obj)
					}
				});
			}

		},
	}
</script>

<style>
</style>
