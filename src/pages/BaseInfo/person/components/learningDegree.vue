<template>
	<div>
		<a-card title="学历信息表">
			<a-button slot="extra" @click="showModal" >修改</a-button>
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
		<LearningDegreeModal ref="learningDegreeModal"  />
	</div>
</template>

<script>
	import LearningDegreeModal from '../applypage/Learning-degree'
	export default{
		props: {
			info: {
				type: Object,
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
			}
		},
		methods: {
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
