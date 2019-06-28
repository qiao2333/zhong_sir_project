<template>
	<div>
		<div v-if="info==null">
			学历信息获取失败
		</div>
		<div v-else>
			<a-card title="学历信息表">
				<a-button slot="extra" v-if="canUpdate" @click="showModal" >修改</a-button>
				<a-row>
					<a-col :span="8">开始时间:{{info.BeginTime}}</a-col>
					<a-col :span="8">结束时间:{{info.EndTime}}</a-col>
				</a-row>
				<a-row>
					<a-col :span="8">国家:{{info.Country}}</a-col>
					<a-col :span="8">城市:{{info.City}}</a-col>
					<a-col :span="8">学校:{{info.School}}</a-col>
				</a-row>
				<a-row>
					<a-col :span="8">受教育程序:{{info.Acdemic}}</a-col>
					<a-col :span="8">学历:{{info.AcademicDegree}}</a-col>
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
				default:-1
			},
			canUpdate: {
				type: Boolean,
			},
		},
		components: {
			LearningDegreeModal
		},
		mounted(){
			this.fetch(this.UserId);
		},
		data() {
			return {
				info:null,
				infoBase:null,
			}
		},
		methods: {
			fetch(id){
				this.axios.get("/json/learningDegree/getLearningDegreeInformation/" + id).then((res)=>{
					if (res.data.code == 0){
						this.info = res.data.learningDegree
						this.infoBase = res.data.learningDegreeBase
					}else{
						this.$emit("tip",{type:"error",text:"获取学生主信息失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
				
			},
			showModal() {
				this.$refs.learningDegreeModal.showModal(this.infoBase,this.info)
			}
		},
	}
</script>

<style>
</style>
