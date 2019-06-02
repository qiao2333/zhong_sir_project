<template>
	<div>
		<a-spin v-if="hasOk==false" size="large" />
		<a-form-item v-else label="地址选择">
			<a-cascader v-decorator="['id',{initialValue:this.addressvalue},]" style="width: 500px;" :options="options" @change="onChange"
			 :loadData="loadData" placeholder="Please select" changeOnSelect />
		</a-form-item>
	</div>
</template>

<script>
	export default {
		props: {
			addressvalue: {
				type: Array,
				default: null
			},
		},
		data() {
			return {
				options: [],
				hasOk: false,
			}
		},
		methods: {
			onChange(value) {
				this.$emit("change", value)
			},
			loadData(selectedOptions) {
				console.log(selectedOptions)
				const targetOption = selectedOptions[selectedOptions.length - 1];
				targetOption.loading = true;
				switch (selectedOptions.length - 1) {
					case 0:
						this.getState(targetOption);
						break;
					case 1:
						this.getCity(targetOption);
						break;
					case 2:
						this.getArea(targetOption);
						break;
					case 3:
						this.getStreet(targetOption);
						break;
				}
				setTimeout(() => {
					this.options = [...this.options]
				}, 2000)
			},
			getCountry() {
				this.$axios.get('/json/addrCountry/addrCountrys/listAll').then((res) => {
					var datas = new Array()
					const countrys = res.data.addrCountrys
					for (var i = 0; i < countrys.length; i++) {
						var data = new Object()
						data.value = countrys[i].code
						data.label = countrys[i].countryZh
						data.isLeaf = false
						datas[i] = data
					}
					this.options = datas
					this.hasOk = true
				}).catch((err) => {
					console.log(err)
				})
			},
			getCountryData(code, children) {
				var datas = new Array()
				this.$axios.get('/json/addrCountry/addrCountrys/listAll').then((res) => {
					var countrys = res.data.addrCountrys
					for (var i = 0; i < countrys.length; i++) {
						var data = new Object()
						data.value = countrys[i].code
						data.label = countrys[i].countryZh
						data.isLeaf = false
						datas[i] = data
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
			},
			getState(targetOption) {
				
				var url = "/json/address/address/addrState/" + targetOption.value
				this.$axios.get(url).then((res) => {
					var datas = new Array()
					var states = res.data.addrStates
					for (var i = 0; i < states.length; i++) {
						var data = new Object()
						data.value = states[i].code
						data.label = states[i].stateZh
						data.code= states[i].code
						data.isLeaf = false
						datas[i] = data
					}
					targetOption.children = datas
					targetOption.loading = false;
				}).catch((err) => {
					console.log(err)
				})
			},
			getStateData(code) {
				var datas = new Array()
				var url = "/json/address/address/addrState/" + code
				this.$axios.get(url).then((res) => {
					var states = res.data.addrStates
					for (var i = 0; i < states.length; i++) {
						var data = new Object()
						data.value = states[i].code
						data.label = states[i].stateZh
						data.isLeaf = false
						datas[i] = data
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
			},
			getStreet(targetOption) {
				var url = "/json/address/address/addrStreet/" + targetOption.value
				this.$axios.get(url).then((res) => {
					var datas = new Array()
					var streets = res.data.addrStreets
					for (var i = 0; i < streets.length; i++) {
						var data = new Object()
						data.value = streets[i].code
						data.label = streets[i].streetZh
						datas[i] = data
					}
					targetOption.children = datas
					targetOption.loading = false;
				}).catch((err) => {
					console.log(err)
				})
			},
			getStreetData(code) {
				var datas = new Array()
				var url = "/json/address/address/addrStreet/" + code
				this.$axios.get(url).then((res) => {
					var streets = res.data.addrStreets
					for (var i = 0; i < streets.length; i++) {
						var data = new Object()
						data.value = streets[i].code
						data.label = streets[i].streetZh
						datas[i] = data
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
			},
			getArea(targetOption) {
				var url = "/json/address/address/addrArea/" + targetOption.value
				this.$axios.get(url).then((res) => {
					var datas = new Array()
					var areas = res.data.addrAreas
					for (var i = 0; i < areas.length; i++) {
						var data = new Object()
						data.value = areas[i].code
						data.label = areas[i].areaZh
						data.isLeaf = false
						datas[i] = data
					}
					targetOption.children = datas
					targetOption.loading = false;
				}).catch((err) => {
					console.log(err)
				})
			},
			getAreaData(code) {
				var datas = new Array()
				var url = "/json/address/address/addrArea/" + code
				this.$axios.get(url).then((res) => {
					var areas = res.data.addrAreas
					for (var i = 0; i < areas.length; i++) {
						var data = new Object()
						data.value = areas[i].code
						data.label = areas[i].areaZh
						datas[i] = data
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
			},
			getCity(targetOption) {
				var datas = new Array()
				var url = "/json/address/address/addrCity/" + targetOption.value
				this.$axios.get(url).then((res) => {
					var cities = res.data.addrCities
					for (var i = 0; i < cities.length; i++) {
						var data = new Object()
						data.value = cities[i].code
						data.label = cities[i].cityZh
						data.isLeaf = false
						datas[i] = data
					}
					targetOption.children = datas
					targetOption.loading = false;
				}).catch((err) => {
					console.log(err)
				})

				return datas
			},
			getCityData(code) {
				var datas = new Array()
				var url = "/json/address/address/addrCity/" + code
				this.$axios.get(url).then((res) => {
					var cities = res.data.addrCities
					for (var i = 0; i < cities.length; i++) {
						var data = new Object()
						data.value = cities[i].code
						data.label = cities[i].cityZh
						datas[i] = data
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
			},
			update(data) {


			}
		},

		mounted() {
			const data = this.addressvalue
			if (data == null) {
				this.getCountry()
				this.hasOk = true
				return
			}
			var countrys = this.getCountryData()
			var states = this.getStateData(data[0])
			var citys = this.getCityData(data[1])
			var areas = this.getAreaData(data[2])
			var streets = this.getStreetData(data[3])
			
			setTimeout(() => {
				for (var i = 0; i < countrys.length; i++) {
					if (countrys[i].value == data[0]) {
						var c = new Object()
						c.value = countrys[i].value
						c.label = countrys[i].label
						c.isLeaf = countrys[i].isLeaf
						c.children = states
						countrys[i] = c
						break
					}
				}
				for (var i = 0; i < states.length; i++) {
					if (states[i].value == data[1]) {
						var c = new Object()
						c.value = states[i].value
						c.label = states[i].label
						c.isLeaf = states[i].isLeaf
						c.children = citys
						states[i] = c
						break
					}

				}
				for (var i = 0; i < citys.length; i++) {
					if (citys[i].value == data[2]) {
						var c = new Object()
						c.value = citys[i].value
						c.label = citys[i].label
						c.isLeaf = citys[i].isLeaf
						c.children = areas
						citys[i] = c
						break
					}
				}
				for (var i = 0; i < areas.length; i++) {
					if (areas[i].value == data[3]) {
						var c = new Object()
						c.value = areas[i].value
						c.label = areas[i].label
						c.isLeaf = areas[i].isLeaf
						c.children = streets
						areas[i] = c
						break
					}
				}
				
				this.options = countrys
				this.hasOk = true
			}, 4000)
		}
	}
</script>

<style>
</style>
