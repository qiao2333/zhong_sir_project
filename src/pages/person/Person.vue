<template>
	<div class="content">
		<div v-if="userinfo!=null" style="height: 2000px;" >
			<User v-if="userinfo.users != null" @showModal="showModal" :users="userinfo.users[0]"></User>
			<Employee v-if="userinfo.employees!=null" @showModal="showModal" :employees="userinfo.employees[0]"></Employee>
			<Students v-if="userinfo.students!=null" @showModal="showModal" :students="userinfo.students[0]"></Students>
			<Addresses v-if="userinfo.addresses!=null" @showModal="showModal" :addresses="userinfo.addresses" :addrAreas="userinfo.addrAreas" :addrStreets="userinfo.addrStreets" :addrCities="userinfo.addrCities" :addrStates="userinfo.addrStates" :addrCountries="userinfo.addrCountries"></Addresses>
			<Modal v-if="modalDisable==true" :visible="visible" :mydatas="mydatas" @ok="handleOk" @cancel="handleCancel"></Modal>
		</div>
	</div>
</template>

<script>
	import User from './components/user'
	import Students from './components/students'
	import Addresses from './components/addresses'
	import Employee from './components/employees'
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
			}
		},
		methods: {
			showModal(data) {
				this.mydatas = data
				this.modalDisable = true
				this.visible=true
			},
			handleCancel(){
				this.visible=false
				this.modalDisable=false
			},
			handleOk(){
				this.visible=false
				this.modalDisable=false
			}
		},
		mounted() {
			this.$axios.post('/person/student').then((res) => {
				const user_info = res.data.data
				console.log(user_info.userInfo)
				this.userinfo = user_info.userInfo
			}).catch((err) => {
				console.log(err)
			})
		},
		
	}
</script>

<style>
</style>
