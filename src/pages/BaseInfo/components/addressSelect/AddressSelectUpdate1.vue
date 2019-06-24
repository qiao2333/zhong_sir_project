<template>
	<div>
		<a-spin :spinning="hasOk" size="large" >
			
			<a-cascader v-if="!hasOk"  :defaultValue="selectValue" style="width: 500px;" :options="options" @change="onChange" :loadData="loadData" placeholder="Please select" changeOnSelect />
		</a-spin>
	</div>
</template>

<script>
	export default {
		props: {
			addressvalue: {
				type: Array,
			},
		},
		data() {
			return {
				selectValue:[],
				options: [],
				hasOk: true,
			}
		},
		methods: {
			onChange(value) {
				console.log(value)
				this.$emit("change", value)
			},
			async loadData(selectedOptions) {
				const targetOption = selectedOptions[selectedOptions.length - 1];
				targetOption.loading = true;
				var data
				var value = Number(targetOption.value.split("|")[0])
				switch (selectedOptions.length - 1) {
					case 0:
						data = await this.getState(value);
						break;
					case 1:
						data = await this.getCity(value);
						break;
					case 2:
						data = await this.getArea(value);
						break;
					case 3:
						data = await this.getStreet(value);
						break;
				}
				setTimeout(function() {
					targetOption.loading = false
					targetOption.children = data
				}, 1000)

			},
			async getCountry() {
				var datas = new Array()
				await this.axios.get('/json/addrCountry/addrCountrys/listAll').then((res) => {
					const countrys = res.data.addrCountrys
					for (var i = 0; i < countrys.length; i++) {
						if(countrys[i].code!=null){
							var data = new Object()
							data.value = countrys[i].code + '|' + countrys[i].id
							data.label = countrys[i].countryZh
							data.isLeaf = false
							datas.push(data)
						}
						
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
			},
			async getState(code) {
				var datas = new Array()
				var url = "/json/address/address/addrState/" + code
				await this.axios.get(url).then((res) => {
					var states = res.data.addrStates
					for (var i = 0; i < states.length; i++) {
						var data = new Object()
						data.value = states[i].code + "|" + states[i].id
						data.label = states[i].stateZh
						data.isLeaf = false
						datas.push(data)
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
			},
			async getStreet(code) {
				var datas = new Array()
				var url = "/json/address/address/addrStreet/" + code
				await this.axios.get(url).then((res) => {
					var streets = res.data.addrStreets
					for (var i = 0; i < streets.length; i++) {
						var data = new Object()
						data.value = streets[i].code + "|" + streets[i].id
						data.label = streets[i].streetZh
						datas.push(data)
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
			},
			async getArea(code) {
				var datas = new Array()
				var url = "/json/address/address/addrArea/" + code
				await this.axios.get(url).then((res) => {
					var areas = res.data.addrAreas
					for (var i = 0; i < areas.length; i++) {
						var data = new Object()
						data.value = areas[i].code + "|" + areas[i].id
						data.label = areas[i].areaZh
						data.isLeaf = false
						datas.push(data)
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
			},
			async getCity(code) {
				var datas = new Array()
				var url = "/json/address/address/addrCity/" + code
				await this.axios.get(url).then((res) => {
					var cities = res.data.addrCities
					for (var i = 0; i < cities.length; i++) {
						var data = new Object()
						data.value = cities[i].code + "|" + cities[i].id
						data.label = cities[i].cityZh
						data.isLeaf = false
						datas.push(data)
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
			},
			deep(obj) {
				let objName1 = JSON.stringify(obj),objName2 = JSON.parse(objName1);
				return objName2
			},
			connect(data1, childrenValue) {
				var index = this.$lodash.findIndex(data1, function(data) {
					return childrenValue == Number( data.value.split("|")[0])
				})
				return index
			},
			async updateinfo(selectinfos) {
				var data1, data2, data3, data4, data5
				data1 = await this.getStreet(selectinfos[3])
				data2 = await this.getArea(selectinfos[2])
				data3 = await this.getCity(selectinfos[1])
				data4 = await this.getState(selectinfos[0])
				data5 = await this.getCountry()
				setTimeout(()=>{
					var newSelect = new Array()
					var index = 0
					index = this.connect(data5, selectinfos[0])
					newSelect.push(data5[index].value)
					data5[index].children = data4
					index = this.connect(data4, selectinfos[1])
					newSelect.push(data4[index].value)
					data4[index].children = data3
					index = this.connect(data3, selectinfos[2])
					newSelect.push(data3[index].value)
					data3[index].children = data2
					index = this.connect(data2, selectinfos[3])
					newSelect.push(data2[index].value)
					data2[index].children = data1
					index = this.connect(data1, selectinfos[4])
					newSelect.push(data1[index].value)
					this.options = data5
					this.selectValue = newSelect
					setTimeout(()=>{
						this.hasOk = false
					},3000)
				},1000)
				
			},


		},

		async mounted() {
			if (this.addressvalue == null) {
				var data =  await this.getCountry()
				this.selectValue = []
				setTimeout(()=>{
					this.options = data;
					this.hasOk = false
				},1000)
				return
			} else {
				this.updateinfo(this.addressvalue)
			}

		}
	}
</script>

<style>
</style>
