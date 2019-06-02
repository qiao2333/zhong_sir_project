<template>
	<div class="content">
		<div v-if="userinfo!=null" style="height: 2000px;" >
			<User @tip="tip" v-if="userinfo.users != null"  :users="userinfo.users[0]"></User>
			<Employee @tip="tip" v-if="userinfo.employees!=null" :employees="userinfo.employees[0]"></Employee>
			<Students @tip="tip" v-if="userinfo.students!=null"  :students="userinfo.students[0]"></Students>
			<Addresses @tip="tip" v-if="userinfo.addresses!=null"  :addresses="userinfo.addresses" :addrAreas="userinfo.addrAreas" :addrStreets="userinfo.addrStreets" :addrCities="userinfo.addrCities" :addrStates="userinfo.addrStates" :addrCountries="userinfo.addrCountries"></Addresses>
			<Relation @tip="tip" v-if="userinfo.studentRelations.length > 0" :studentRelations="userinfo.studentRelations"></Relation>
			<Ecomm @tip="tip"  v-if="userinfo.ecomms.length > 0" :ecomms="userinfo.ecomms"></Ecomm>
		</div>
	</div>
</template>

<script>
	import User from './components/user'
	import Students from './components/students'
	import Addresses from './components/addresses'
	import Employee from './components/employees'
	import Relation from './components/relation'
	import Ecomm from './components/ecomms'
	export default{
		components: {
			Students,
			User,
			Addresses,
			Employee,
			Relation,
			Ecomm
		},
		data() {
			return {
				// userinfo: null,
				userinfo:{
					users:[
						{
							userName:"qiao233",
							identification:"44122394129312412123",
							userSex:1,
							userBirthday:"1843-12-3",
							regist:"1982-3-2",
							universityId:"肇庆学院",
							userType:2
						}
					],
					students:[
						{
							stuNo:"201624133103",
							beginLearnDate:"1998-10-23",
							grade:"16",
							classId:"23",
							majorId:"23",
							liveRoom:"G3-509",
							politicalId:"12",
						}
					],
					ecomms:[
						{
							content:"1170793857@qq.com",
							flag: 0
						},
						{
							content:"1170793857@qq.com",
							flag: 2
						},
						{
							content:"13169350037",
							flag: 3
						},
					],
					studentRelations:[],
				},
				mydatas:null,
				visible:false,
				modalDisable:false,
				oldvalue:null,
			}
		},
		methods: {
			tip(data){
				this.$emit("tip",data)
			}
		},
		mounted() {
			// this.$axios.get('/person').then((res) => {
			// 	const user_info = res.data[0]
			// 	this.userinfo = user_info.userInfo
			// }).catch((err) => {
			// 	console.log(err)
			// })
		},
		
	}
</script>

<style>
</style>
