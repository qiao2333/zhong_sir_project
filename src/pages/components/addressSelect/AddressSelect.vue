<template>
	<div>
		<a-select :disabled="disableds[0]">
			<template v-if="disableds[0]" v-for="country in countryDatas">
				<a-select-option :key="country.id" :value="country.code">{{country.countryZh}}</a-select-option>
			</template>
		</a-select>
		<a-select :disabled="disableds[1]">
			<template v-if="disableds[1]" v-for="country in countryDatas">
				<a-select-option :key="country.id" :value="country.code">{{country.countryZh}}</a-select-option>
			</template>
		</a-select>
		<a-select :disabled="disableds[2]">
			<template v-if="disableds[2]" v-for="country in countryDatas">
				<a-select-option :key="country.id" :value="country.code">{{country.countryZh}}</a-select-option>
			</template>
		</a-select>
		<a-select :disabled="disableds[3]">
			<template v-if="disableds[3]" v-for="country in countryDatas">
				<a-select-option :key="country.id" :value="country.code">{{country.countryZh}}</a-select-option>
			</template>
		</a-select>
		<a-select :disabled="disableds[4]">
			<template v-if="disableds[4]" v-for="country in countryDatas">
				<a-select-option :key="country.id" :value="country.code">{{country.countryZh}}</a-select-option>
			</template>
		</a-select>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				disableds: [true, false, false, false, false],
				citiyDatas: [],
				stateDatas: [],
				countryDatas: [],
				areaDatas: [],
				streetDatas: []
			}
		},
		methods: {
			getCountry(id) {
				this.$axios.get('/json/addrCountry/addrCountrys/listAll').then((res) => {
					this.countryDatas = res.data.addrCountrys
				}).catch((err) => {
					console.log(err)
				})
			},
			getState(id) {
				this.$axios.get('/json/addrCountry/addrCountrys/listAll').then((res) => {
					this.stateDatas = res.data.addrStates
				}).catch((err) => {
					console.log(err)
				})
			},
			getStreet(id) {
				this.$axios.get('/json/addrCountry/addrCountrys/listAll').then((res) => {
					this.streetDatas = res.data.addrStreet
				}).catch((err) => {
					console.log(err)
				})
			},
			getArea(id) {
				this.$axios.get('/json/addrCountry/addrCountrys/listAll').then((res) => {
					this.areaDatas = res.data.addrAreas
				}).catch((err) => {
					console.log(err)
				})
			},
			getCity() {
				this.$axios.get('/json/addrCountry/addrCountrys/listAll').then((res) => {
					this.citiyDatas = res.data.addrCitys
				}).catch((err) => {
					console.log(err)
				})
			}
		},
	}
</script>

<style>
</style>
