<template>
	<div>
		
	</div>

</template>
<script>
	export default {
		data() {
			return {
				values: [
					{
						key:1,
						value:1,
					},
					{
						key:2,
						value:2,
					},
					{
						key:3,
						value:3,
					}
				],
				test:3,
			}
		},
		components: {
			VNodes: {
				functional: true,
				render: (h, ctx) => ctx.props.vnodes
			}
		},
	}
</script>
