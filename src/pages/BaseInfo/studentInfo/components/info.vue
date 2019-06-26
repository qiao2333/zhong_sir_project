<template>
	<div class="content" style="text-align: center;">
		<!-- 学号：{{students.stuNo}}
		姓名:{{users.userName}}
		身份证号码：{{users.identification}}
		入学日期：{{students.beginLearnDate}}
		主修专业：{{students.politicalId}}
		当前所在年级：{{students.grade}}
		性别:{{users.userSex}}
		联系电话:{{}}
		政治面貌:{{politicalAffiliations.political}}
		宿舍：{{}} -->
	</div>
</template>

<script>
	export default {
			data() {
				return {
					rows: 0,
					datas: [],
					datas1:[],
					columns,
					hasload: false,
					loading: true
				}
			},
			mounted() {
				this.fetch()
			},
			methods: {
				fetch() {
					this.$axios.post('/json/class/employee/class/allClassmates/1949').then((res) => {
						const data = res.data.data
	//					console.log(data)
						this.rows = data.rows
						this.datas = data.datas
						this.loading = false
						this.hasload = true
					}).catch((err) => {
						console.log(err)
					})
				},
		},
	}
</script>

<style>
</style>
