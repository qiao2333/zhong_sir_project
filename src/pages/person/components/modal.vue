<template>
	<div>
		<a-modal :visible="visible" title="mydatas.title" okText="提交" cancelText="取消" @cancel="handleCancel"  @ok="handleOk" >
			<component v-bind:is="currentTabComponent"></component>
		</a-modal>
	</div>
</template>

<script>
	import AutoInput from '@/pages/components/autoCreateForm/AutoCreateForm.vue'
	import user_info from '@/pages/applypage/user_info'
	export default{
		data() {
			return {
				currentTabComponent:"",
				myform: this.$form.createForm(this),
				formLayout: 'horizontal',
				visible:false
			}
		},
		props: ['oldvalue','chioce'],
		components: {
			AutoInput
		},
		methods: {
			handleSubmit() {
				alert("fuck")
			},
			handleCancel(){
				
			},
			handleOk(){
				
			},
			select(chioce){
				switch(chioce){
					case 1:this.currentTabComponent = user_info ;break;
				}
				this.visible = true
				
			}
		},
		
		
	}
</script>

<style>
</style>
