<template>
	<form @submit.prevent="handleSubmit()">
		<template  v-for='k in ks' >
			<div :key="k">
				用户名:<input type="text" :id="getclass('userName',k)" :name="getclass('userName',k)"/>
				密码:<input type="password" :id="getclass('password',k)" :name="getclass('password',k)"/>
			</div>
		</template>
		<a-button html-type='submit'>提交</a-button>
		<a-button html-type='button' @click='add()'>添加</a-button>
	</form>
</template>

<script>
	let index = 0
	export default {
		data() {
			return {
				ks :[],

			};
		},

		methods: {
			getclass(v,k){
				return v + k ;
			},
			handleSubmit() {
				var mydata = {
					userNames:[],
					passwords:[]
				}
				for (var k in this.ks){
					mydata.userNames = mydata.userNames.concat([$('#userName' + this.ks[k]).val()])
					mydata.passwords = mydata.passwords.concat([$('#password' + this.ks[k]).val()])
				}
				
				
				this.$axios.post('/regist',this.$qs.stringify({formdata:mydata})).then((res) =>{
					alert(res)
				}).catch((err)=>{
					alert(err)
				})
				
			},
			add(){
				this.ks = this.ks.concat([index++])
			}
		},


	};
</script>
<style>
		
	div:{
		border: #000000;
		background-color: #366097;
	}

</style>
