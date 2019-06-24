<!--查看教师信息-->
<template>
	<div >
		<div  style="height: 1000px;">
			<div v-if="hasGetClass">
				所教班级：
				<a-select @change="handleChange" style="width: 100%" :options="options" allowClear></a-select>
			</div>
			<a-table rowKey="userId" :columns="columns" :dataSource="datas" :loading="loading" 
			 bordered>
			</a-table>
		</div>
	</div>
</template>
<script>
	const columns = [{
			title: '学生学号',
			dataIndex: 'studentNo',
			key: 'studentNo'
		},
		{
			title: '学生姓名',
			dataIndex: 'studentName',
			key: 'studentName'
		},
		{
			title: '性别',
			dataIndex: 'sex',
			key: 'sex'
		},
		{
			title: '年级',
			dataIndex: 'grade',
			key: 'grade'
		},
		{
			title: '专业',
			dataIndex: 'specialty',
			key: 'specialty'
		},
		{
			title: '政治面貌',
			dataIndex: 'political',
			key: 'political'
		},
		{
			title: '班级',
			dataIndex: 'className',
			key: 'className'
		},
		{
			title: '岗位',
			dataIndex: 'position',
			key: 'position'
		},
		{
			title: '入学日期',
			dataIndex: 'beginLearnDate',
			key: 'beginLearnDate'
		},
	];
	export default {
		data() {
			return {
				rows: 0,
				datas: [],
				columns,
				hasGetClass:false,
				options:[],
				searchInput: null,
				searchText: '',
				loading: false,
				visible: false,
			};
		},
		mounted() {
			console.log('授课教师')
			this.fetch();
		},
		methods: {
			fetch() {
				this.axios.get('/json/class/employee/class/allClassmates').then((res) => {
						console.log(res.data);
						if(res.data.code == 0){
							var options = new Array()
							var data = res.data.classBeans
							for(var i in data){
								options.push({label:data[i].name, value:data[i].code})
							}
							this.options = options
							this.$emit('tip',{type:"success",text:'获取班级成功'})
							this.hasGetClass = true
						}
						else{
							this.$emit('tip',{type:"error",text:'获取信息失败'})
						}
					}).catch(err => {
						this.$emit('tip',{type:"warning",text:'发生未知错误'})
					});
			},
			async handleChange(value){
				this.loading = true
				if(value == undefined){
					this.datas = null,
					setTimeout(()=>{
						this.loading = false
					},1000)
					return
				}
				await this.getClassmate(value)
			},
			getClassmate(code){
				this.axios.get("/json/student/student/allClassmates/" + code).then((res)=>{
					if(res.data.code == 0){
						this.datas = res.data.classmateBeans
					}
				}).catch((err)=>{
					this.$emit("tip",{type:error,text:"发生未知错误"})
				}).then(()=>{
					this.loading = false
				})
			},
		}
	};
</script>
<style></style>
