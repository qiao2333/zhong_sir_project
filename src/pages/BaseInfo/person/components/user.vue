<template>
	<div>
		<div>
			<a-card title="用户主信息表">
				<a-button v-if="canUpdate" :loading="applyreload" slot="extra" @click="showModal" >修改</a-button>
				<a-row>
					<a-col :span="8">用户名:{{users.userName}}</a-col>
					<a-col :span="8">身份证:{{users.identification}}</a-col>
					<a-col :span="8">性别:{{users.userSex == '0' ? '女': (users.userSex == '1'? '男':'不详') }}</a-col>
				</a-row>
				<a-row>
					<a-col :span="8">出生日期:{{users.userBirthday}}</a-col>
					<a-col :span="8">注册时间:{{users.regist}}</a-col>
					<a-col :span="8">学校:{{users.universityId}}</a-col>
				</a-row>
				<a-row>
					<a-col :span="8">用户类型:{{userTypes[users.userType]}}</a-col>
				</a-row>
			</a-card>
			<div v-if="canUpdate">
				<UserInfo v-if="!applyreload" @tip="tip" ref="UserInfo" ></UserInfo>

			</div>
		</div>
	</div>
</template>

<script>
	import UserInfo from "@/pages/Baseinfo/person/applypage/User-info"
	export default{
		props: {
			UserId:{
				type: Number,
				default:0
			},
			canUpdate: {
				type: Boolean,
			},
		},
		data() {
			return {
				users:null,
				applyreload:false,
				userTypes:[
					'游客',
					'学生',
					'教职员工',
					'校外职员',
					'学生亲属',
					'系统运营者',
					'学校信息主管',
				],
			}
		},
		components: {
			UserInfo
		},
		mounted(){
			this.fetch(this.UserId)
		},
		methods: {
			fetch(id){
				this.axios.get("/json/user/getUserInformation/" + id).then((res)=>{
					if(res.data.code==0){
						console.log(res.data)
						this.users = res.data.user
					}else{
						this.$emit("tip",{type:"error",text:"获取用户信息失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			showModal(){
				this.applyreload = true
				setTimeout(()=>{
					this.applyreload = false
					setTimeout(()=>{
						this.$refs.UserInfo.showModal(this.users)
					},500)
				},1000)
			},
			tip(data){
				this.$emit("tip",data)
			},
		},
	}
</script>

<style>
</style>
