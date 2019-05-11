<template>
	<div>
		<a-modal :visible="visible" title="mydatas.title" okText="提交" cancelText="取消" @cancel="() => {this.$emit('cancel')}"  @ok="() => {this.$emit('ok')}" >
			<a-form :form="myform" @submit="handleSubmit">
				<template>
					<AutoInput v-for="form in mydatas.forms" :key="form.key" :form="form"></AutoInput>
				</template>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
	import AutoInput from '@/pages/components/autoCreateForm/AutoCreateForm.vue'
	export default{
		props: ['mydatas','visible'],
		data() {
			return {
				myform: this.$form.createForm(this),
				formLayout: 'horizontal',
			}
		},
		components: {
			AutoInput
		},
		methods: {
			handleSubmit() {
				alert("fuck")
			}
		},
		
		
	}
</script>

<style>
</style>
