<template>
	<div>
		<a-modal :visible="visible" :title="title" okText="提交" cancelText="取消" @cancel="() => {this.$emit('cancel')}"  @ok="() => {this.$emit('ok')}" >
			asdasdads
		</a-modal>
	</div>
</template>

<script>
	export default{
		props: ['visible','title' ],
	}
</script>

<style>
</style>
