<template>
	<div class="content">
		<a-tabs defaultActiveKey="1" @change="callback">
			<a-tab-pane tab="添加" key="1">Content of Tab Pane 1</a-tab-pane>
			<a-tab-pane tab="批量添加" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
</script>

<style>
</style>
