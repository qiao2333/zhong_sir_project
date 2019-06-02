<template>
	<div>
		<p>国家:{{info.country}}</p>
		<p>省份:{{info.state}}</p>
		<p>城市:{{info.city}}</p>
		<p>城区:{{info.area}}</p>
		<p>街道:{{info.street}}</p>
		<p>具体尾缀:{{info.detail}}</p>
		<p>邮政编号:{{info.zipCode}}</p>
		<p>手机号码:{{info.telephone}}</p>
		<p>地址类型:{{flags[info.flag]}}</p>
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
				flags: [
					"当前住址","收件地址","曾经住址","通信地址","办公地址"
				]
			}
		},
	}
</script>

<style>
</style>
