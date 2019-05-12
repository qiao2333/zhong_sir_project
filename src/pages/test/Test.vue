<template>
	<div class="content">
		<Student :oldvalue="oldvalue"></Student>
	</div>
</template>
<script>
	import Student from '@/pages/applypage/Update-Student'
	export default {
		data(){
			return{
				oldvalue:{
					flag:2,
					content:"打开手机拨打110"
				}
			}
		},
		components:{
			Student
		}
	}
</script>