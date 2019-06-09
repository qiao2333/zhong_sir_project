<template>
	<div>
		<PictureImage :filepath="info.pictureName" />
	</div>
</template>

<script>
	import PictureImage from '@/pages/BaseInfo/components/picture/image'
	export default{
		props: {
			info: {
				type: Object,
			},
		},
		components: {
			PictureImage
		},
	}
</script>

<style>
</style>
