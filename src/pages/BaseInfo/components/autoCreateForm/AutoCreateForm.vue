<template>
	<div >
		<div v-if="Autoform.type==='select'">
			<a-form-item :label="Autoform.label" >
				<a-select style="width: 240px" v-decorator="[Autoform.name,Autoform.rules]">
					<template v-for="option in Autoform.options">
						<a-select-option :key="option.key" :value="option.value">{{option.name}}</a-select-option>
					</template>
				</a-select>
			</a-form-item>
		</div>
		<div v-else-if="Autoform.type==='radio'">
			<a-form-item :label="Autoform.label" >
				<a-radio-group size="large" v-decorator="[ Autoform.name,Autoform.rules]">
					<template v-for="option in Autoform.options">
						<a-radio-button :key="option.key" :value="option.value">{{option.name}}</a-radio-button>
					</template>
				</a-radio-group>
			</a-form-item>
		</div>
		<div v-else-if="Autoform.type==='checkbox'">
			<a-form-item :label="Autoform.label" >
				<a-checkbox-group  v-decorator="[Autoform.name,Autoform.rules]" style="width: 100%;">
					<template v-for="option in Autoform.options">
						<a-checkbox :defaultChecked="option.check" :key="option.key" :value="option.value">
							{{option.name}}
						</a-checkbox>
					</template>
				</a-checkbox-group>
			</a-form-item>
		</div>
		<div v-else>
			<a-form-item :label="Autoform.label" >
				<a-input :type="Autoform.type" v-decorator="[Autoform.name,Autoform.rules]" />
			</a-form-item>
		</div>

	</div>
</template>

<script>
	export default {
		name:"AutoForm",
		props: ['Autoform'],
		data() {
			return {
				
			}
		},

	}
</script>

<style scoped>

</style>
