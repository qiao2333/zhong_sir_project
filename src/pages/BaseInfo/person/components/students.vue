<template>
	<div>
		<div v-if="studentInfo==null">
			获取学生主要信息失败
		</div>
		<div v-else>
			<a-card title="学生主要信息">
				<a-button v-if="canUpdate" :loading="updateLoading" @click="showModal" slot="extra">修改</a-button>
				<a-row>
					<a-col :span="8">学号:{{studentInfo.student_no}}</a-col>
					<a-col :span="8">入学日期:{{studentInfo.begin_learn}}</a-col>
					<a-col :span="8">当前年级:{{studentInfo.grade}}</a-col>
				</a-row>
				<a-row>
					<a-col :span="8">当前班级:{{studentInfo.class}}</a-col>
					<a-col :span="8">当前主修专业:{{studentInfo.specialty}}</a-col>
					<a-col :span="8">政治面貌:{{studentInfo.political}}</a-col>
				</a-row>
			</a-card>
			<StudentModal v-if="studentmodalreload&&canUpdate" @tip="tip" ref="studentModal" />
		</div>
		
	</div>
</template>

<script>
	import StudentModal from '../applypage/student'
	export default{
		data() {
			return {
				updateLoading:false,
				studentmodalreload:true,
				studentInfo:null,
				students:null,
			}
		},
		props: {
			UserId:{
				type: Number,
				default:0
			},
			isOther:{
				type:Boolean,
			},
			canUpdate: {
				type: Boolean,
			},
		},
		components: {
			StudentModal
		},
		mounted(){
			this.fetch(this.UserId)
		},
		methods: {
			tip(data){
				this.$emit("tip",data)
			},
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
			showModal(){
				this.studentmodalreload = false
				setTimeout(()=>{
					this.studentmodalreload = true
				},500)
				this.updateLoading = true
				setTimeout(()=>{
					this.updateLoading = false
					this.$refs.studentModal.showModal(this.student,this.studentInfo)
				},500)

				
			},
		},
	}
</script>

<style>
</style>
