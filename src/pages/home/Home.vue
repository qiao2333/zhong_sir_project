<!--
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-12
 * @LastEditTime: 2019-04-12
 * @function: 整个页面的
 -->
<template>
	<div class="home" v-if="usertype != null">
		<Nav :usertype="usertype"></Nav>
		<Header></Header>
		<routerView :usertype="usertype"></routerView>
		<!-- <Footer></Footer> -->
	</div>
</template>

<script>
	import Nav from './components/Nav'
	import Header from './components/Header'
	import Footer from './components/Footer'
	export default {
		data() {
			return {
				usertype: null,
			}
		},
		components: {
			Nav,
			Header,
			Footer
		},
		mounted() {
			this.fetch()
		},
		methods: {
			fetch() {
				this.axios.get("/json/user/getLoginInfo").then((res) => {
					if(res.data.user == undefined){
						console.log("未注册")
						this.$router.push('/')
					}
					this.usertype = res.data.user.userType
				}).catch((err) => {
					console.log(err)
				})
			}
		},
	}
</script>

<style scoped>

</style>
