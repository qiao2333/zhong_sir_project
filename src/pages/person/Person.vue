<template>
	<div class="content">
		<div v-if="userinfo!=null" style="height: 2000px;" >
			<User v-if="userinfo.users != null" @showModal="showModal(1)" :users="userinfo.users[0]"></User>
			<Employee v-if="userinfo.employees!=null" @showModal="showModal(2)" :employees="userinfo.employees[0]"></Employee>
			<Students v-if="userinfo.students!=null" @showModal="showModal(3)" :students="userinfo.students[0]"></Students>
			<Addresses v-if="userinfo.addresses!=null" @showModal="showModal(4)" :addresses="userinfo.addresses" :addrAreas="userinfo.addrAreas" :addrStreets="userinfo.addrStreets" :addrCities="userinfo.addrCities" :addrStates="userinfo.addrStates" :addrCountries="userinfo.addrCountries"></Addresses>
			<Relation v-if="userinfo.studentRelations.length > 0" :studentRelations="userinfo.studentRelations"></Relation>
			<Modal ref="modal" @ok="handleOk" :oldvalue="oldvalue" @cancel="handleCancel"></Modal>
		</div>
	</div>
</template>

<script>
	import User from './components/user'
	import Students from './components/students'
	import Addresses from './components/addresses'
	import Employee from './components/employees'
	import Relation from './components/relation'
	import Modal from './components/modal'
	export default{
		components: {
			Students,
			User,
			Addresses,
			Employee,
			Modal
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
			showModal(chioce){
				this.$refs.modal.select(chioce)
			}
		},
		mounted() {
			this.$axios.get('/json/user/userInfoListAll/2').then((res) => {
				const user_info = res.data
				this.userinfo = user_info.userInfo
			}).catch((err) => {
				console.log(err)
			})
		},
		
	}
</script>

<style>
</style>
