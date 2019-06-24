<template>
	<div>
		<p>用户名:{{info.userName}}</p>
		<p>身份证号:{{info.identification}}</p>
		<p>性别:{{sexs[info.userSex]}}</p>
		<p>出生日期:{{info.userBirthday}}</p>
		<p>账号:{{info.name}}</p>
		<p>用户类型:{{types[info.userType]}}</p>
		<p>账号状态:{{states[info.status]}}</p>
	</div>
</template>

<script>
	export default{
		props: {
			info: {
				type: Object,
			},
		},
		data() {
			return {
				sexs:["女","男","不详"],
				types:["游客（已注册，但身份未确认", "学生", "教职员工", "校外职员",  "学生亲属",  "系统运营者",  "学校信息主管"],
				states:["正常","锁定","作废"],
			}
		},
	}
</script>

<style>
</style>
