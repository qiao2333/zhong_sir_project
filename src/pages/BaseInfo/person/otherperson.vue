<template>
	<div class="content">
		<a-spin v-if="load" />
		<div v-else >
			<div v-if="OtherPersonType==0">
				<User @tip="tip"  :UserId="OtherPersonId" :canUpdate="false"></User>
			</div>
			<div v-else-if="OtherPersonType==1">
				<div v-if="MyPersonType == 1">
					<User @tip="tip"  :UserId="OtherPersonId" :canUpdate="false"></User>
					<Students @tip="tip"  :UserId="OtherPersonId" :canUpdate="false"></Students>
				</div>
				<div v-else-if="MyPersonType == 2">
					<Pictures @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"></Pictures>
					<User @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"></User>
					<Students @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"></Students>
					<Addresses @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"></Addresses>
					<Relation @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"></Relation>
					<Ecomm @tip="tip"  :UserId="OtherPersonId" :canUpdate="true" ></Ecomm>
				</div>
				<div v-else-if="MyPersonType == 4">
					<Pictures @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"></Pictures>
					<User @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"></User>
					<Students @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"></Students>
				</div>
			</div>
			<div v-else-if="OtherPersonType==2">
				<div v-if="MyPersonType == 2">
					<Pictures @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"></Pictures>
					<User @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"></User>
					<Employee @tip="tip"  :UserId="OtherPersonId" :canUpdate="true" ></Employee>
					<LearningDegree @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"/>
					<Addresses @tip="tip"  :UserId="OtherPersonId" :canUpdate="true"></Addresses>
					<Ecomm @tip="tip"  :UserId="OtherPersonId" :canUpdate="true" ></Ecomm>
				</div>
				<div v-if="MyPersonType == 6">
					<User @tip="tip"  :UserId="OtherPersonId" :canUpdate="false"></User>
					<Employee @tip="tip"  :UserId="OtherPersonId" :canUpdate="false" ></Employee>
					<LearningDegree @tip="tip"  :UserId="OtherPersonId" :canUpdate="false"/>
				</div>
				
			</div>
			<div v-else-if="OtherPersonType==3">
				
			</div>
			<div v-else-if="OtherPersonType==4">
				<User @tip="tip"  :UserId="OtherPersonId" :canUpdate="false"></User>
			</div>
			<div v-else-if="OtherPersonType==5">
				
			</div>
			<div v-else-if="OtherPersonType==6">
				
			</div>
		</div>
	</div>
</template>

<script>
	import LearningDegree from './components/learningDegree'
	import Pictures from './components/pictures'
	import User from './components/user'
	import Students from './components/students'
	import Addresses from './components/addresses'
	import Employee from './components/employees'
	import Relation from './components/relation'
	import Ecomm from './components/ecomms'
	export default{
		name:'otherPersonUnKeep',
		data() {
			return {
				OtherPersonType:0,
				OtherPersonId:0,
				MyPersonType:1,
				load:true,
			}
		},
		methods: {
			tip(data) {
				this.$emit("tip",data)
			}
		},
		mounted(){
			console.log(this.$route.params)
			console.log("别人的页面")
			this.OtherPersonType = this.$route.params.OtherPersonType
			this.OtherPersonId = this.$route.params.OtherPersonId
			this.MyPersonType = this.$route.params.MyPersonType
			this.load = false
		},
		components: {
			LearningDegree,
			Pictures,
			Students,
			User,
			Addresses,
			Employee,
			Relation,
			Ecomm
		},
	}
</script>

<style>
</style>
