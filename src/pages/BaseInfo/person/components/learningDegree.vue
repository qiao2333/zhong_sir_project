<template>
	<div>
		<a-spin v-if="info == null" />
		<div v-else>
			<a-card title="学历信息表">
				<a-button slot="extra" v-if="canUpdate" @click="showModal" >修改</a-button>
				<a-row>
					<a-col :span="8">开始时间:{{info.begin_time}}</a-col>
					<a-col :span="8">结束时间:{{info.end_time}}</a-col>
				</a-row>
				<a-row>
					<a-col :span="8">国家:{{info.country_id}}</a-col>
					<a-col :span="8">城市:{{info.city_id}}</a-col>
					<a-col :span="8">学校:{{info.school_id}}</a-col>
				</a-row>
				<a-row>
					<a-col :span="8">受教育程序:{{info.academic_id}}</a-col>
					<a-col :span="8">学历:{{info.degree_id}}</a-col>
				</a-row>
			</a-card>
			<LearningDegreeModal v-if="canUpdate" ref="learningDegreeModal"  />
		</div>
	</div>
</template>

<script>
	import LearningDegreeModal from '../applypage/Learning-degree'
	export default{
		props: {
			UserId:{
				type: Number,
				default:0
			},
			canUpdate: {
				type: Boolean,
			},
		},
		components: {
			LearningDegreeModal
		},
		mounted(){
			console.log(this.info)
		},
		data() {
			return {
				info:null
			}
		},
		methods: {
			fetch(id){
				this.axios.get("/json/student/getStudentInformation/" + id).then((res)=>{
					if (res.data.code == 0){
						console.log(res.data)
						this.studentInfo = res.data.studentInfo
						this.student = res.data.student
					}else{
						this.$emit("tip",{type:"error",text:"获取学生主信息失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
				
			},
			showModal() {
				var obj = {...this.info}
				var begin_time = this.$moment(this.info.begin_time,'YYYY-MM-DD HH:mm:ss')
				var end_time = this.$moment(this.info.end_time,'YYYY-MM-DD HH:mm:ss')
				obj.begin_time = begin_time
				obj.end_time = end_time
				this.$refs.learningDegreeModal.showModal(obj)
			}
		},
	}
</script>

<style>
</style>
