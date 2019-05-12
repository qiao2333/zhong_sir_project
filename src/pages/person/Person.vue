<template>
	<div class="content">
		<div v-if="userinfo!=null" style="height: 2000px;" >
			<User v-if="userinfo.users != null"  :users="userinfo.users[0]"></User>
			<Employee v-if="userinfo.employees!=null" :employees="userinfo.employees[0]"></Employee>
			<Students v-if="userinfo.students!=null"  :students="userinfo.students[0]"></Students>
			<Addresses v-if="userinfo.addresses!=null"  :addresses="userinfo.addresses" :addrAreas="userinfo.addrAreas" :addrStreets="userinfo.addrStreets" :addrCities="userinfo.addrCities" :addrStates="userinfo.addrStates" :addrCountries="userinfo.addrCountries"></Addresses>
			<Relation v-if="userinfo.studentRelations.length > 0" :studentRelations="userinfo.studentRelations"></Relation>
			<Ecomm v-if="userinfo.ecomms.length > 0" :ecomms="userinfo.ecomms"></Ecomm>
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
				userinfo: null,
				mydatas:null,
				visible:false,
				modalDisable:false,
				oldvalue:null,
			}
		},
		methods: {
		},
		mounted() {
			this.$axios.get('/person').then((res) => {
				const user_info = res.data[0]
				this.userinfo = user_info.userInfo
			}).catch((err) => {
				console.log(err)
			})
		},
		
	}
</script>

<style>
</style>
