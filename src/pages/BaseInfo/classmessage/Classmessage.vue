<template>
	<!-- 	用户类型： 0:游客（已注册，但身份未确认） 1:学生  2:教职员工 3:校外职员  
		4:学生亲属  5:系统运营者  6:学校信息主管 -->
	<div class="content">
		<div  style="background-color: white;height:1600px;">
			<div v-if="usertype == 1">
				<Student @tip="tip" />
			</div>
			<div v-else-if="usertype == 2">
				<a-tabs>
					<template v-for="(item) in positions">
						<a-tab-pane :tab="item.tab" :key="item.key">
							<component  @tip="tip" :is="item.component"></component>
						</a-tab-pane>
					</template>
				</a-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import Student from './components/student'
	import Teacher from './components/Teacher'
	import ClassTeacher from './components/classTeacher'
	import Leadership from './components/leadership'
	export default {
		name: 'Classmessage',
		components: {
			Teacher,
			ClassTeacher,
			Student,
			Leadership,
		},
		data() {
			return {
				position: [{tab:"授课教师",component:"Teacher",key:0},{tab:"班主任",component:"ClassTeacher",key:1},{tab:"辅导员",component:"Leadership",key:2}],
				positions:null,
			}
		},
		mounted() {
			this.fetch()
			// this.positions = [{tab:"授课教师",component:"Teacher",key:1},{tab:"班主任",component:"ClassTeacher",key:2},{tab:"领导",component:"Leadership",key:3}]
		},
		methods: {
			tip(data) {
				this.$emit('tip', data)
			},
			fetch() {
				this.axios.get("/json/user/getEmployeePositions").then((res) => {
					console.log(res.data);
					var postions = new Array();
					var data = res.data.employeeRoles
					for (var i = 0; i < data.length&& i < 3; i++){
						postions.push(this.position[data[i]]) 
					}
					this.positions = postions
					console.log(this.positions)
					
				}).catch((err) => {
					console.log(err);
				})
			}
		},
		props: {
			usertype: {
				type: Number,
			},
		},
	}
</script>

<style>
</style>
