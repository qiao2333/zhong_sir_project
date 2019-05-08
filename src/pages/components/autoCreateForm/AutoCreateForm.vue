<template>
	<div>
		<div v-if="form.type==='select'">
			<a-form-item :label="form.label" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-select style="width: 240px" v-decorator="[form.name,form.rules]">
					<template v-for="option in form.options">
						<a-select-option :key="option.key" :value="option.value">{{option.name}}</a-select-option>
					</template>
				</a-select>
			</a-form-item>
		</div>
		<div v-else-if="form.type==='radio'">

			<a-form-item :label="form.label" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-radio-group size="large" v-decorator="[ form.name,form.rules]">
					<template v-for="option in form.options">
						<a-radio-button :key="option.key" :value="option.value">{{option.name}}</a-radio-button>
					</template>
				</a-radio-group>
			</a-form-item>
		</div>
		<div v-else-if="form.type==='checkbox'">
			<a-form-item :label="form.label" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-checkbox-group :defaultValue="form.value" v-decorator="[form.name,form.rules]" style="width: 100%;">
					<template v-for="option in form.options">
						<a-checkbox :defaultChecked="option.check" :key="option.key" :value="option.value">
							{{option.name}}
						</a-checkbox>
					</template>
				</a-checkbox-group>
			</a-form-item>
		</div>
		<div v-else>
			<a-form-item :label="form.label" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-input :type="form.type" v-decorator="[form.name,form.rules]" />
			</a-form-item>
		</div>

	</div>
</template>

<script>
	export default {
		props: ['form'],
		data() {
			return {
				
			}
		},

	}
</script>

<style scoped>

</style>
