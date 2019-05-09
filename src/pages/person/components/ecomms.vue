<template>
	<div>
		<a-card title="用户地址表">
			<a-list bordered>
				<div slot="地址信息">Header</div>
				<a-list-item v-for="ecomm in ecomms" :key="ecomm.id">
					<a slot="actions">修改</a>
					<a-list-item-meta :description="ecomm.content">
						<a slot="title">{{flag(ecomm.flag)}}</a>
					</a-list-item-meta>
				</a-list-item>

			</a-list>
		</a-card>
	</div>
</template>
<script>
	export default {
		props: ['ecomms'],
		data() {
			return {
				
			}
		},
		methods: {
			// 根据ecomm表的flag返回电子通讯的类型
			flag(data){
				var s = ""
				switch(data){
					case 0:s = "QQ号";break;
					case 1:s = "微信号";break;
					case 2:s = "电子邮箱";break;
					case 3:s = "移动电话号码";break;
					case 4:s = "办公室号码";break;
					case 5:s = "家庭电话";break;
				}
			}
		},
	}
</script>

<style>
</style>
