<template>
	<div >
		<a-spin v-if="hasOk==false" size="large" />
		<a-cascader v-else style="width: 500px;" :defaultValue="addressvalue" :options="options" @change="onChange" :loadData="loadData" placeholder="Please select" changeOnSelect/>
	</div>
</template>

<script>
	export default {
		props:['addressvalue'],
		data() {
			return {
				options: null,
				hasOk :false
			}
		},
		methods: {
			onChange(value) {
			  console.log(value);
			},
			loadData(selectedOptions) {
			  const targetOption = selectedOptions[selectedOptions.length - 1];
			  targetOption.loading = true;
				switch (selectedOptions.length - 1){
					case 0:targetOption.children=this.getState(targetOption.value);break;
					case 1:targetOption.children=this.getCity(targetOption.value);break;
					case 2:targetOption.children=this.getArea(targetOption.value);break;
					case 3:targetOption.children=this.getStreet(targetOption.value);break;
				}
			  // load options lazily
			  setTimeout(() => {
			    targetOption.loading = false;
				
			  }, 1000);
			},
			getCountry() {
				var datas =new Array()
				this.$axios.get('/json/addrCountry/addrCountrys/listAll').then((res) => {
					const countrys = res.data.addrCountrys
					for (var i = 1; i < countrys.length; i++ ){
						var data = new Object()
						data.value = countrys[i].code
						data.label = countrys[i].countryZh
						data.isLeaf = false
						datas[i - 1] = data
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
			},
			getState(code) {
				var datas =new Array()
				var url = "/json/address/address/addrState/" + code
				this.$axios.get(url).then((res) => {
					const ds = res.data.addrStates
					
					for (var i = 1; i < ds.length; i++ ){
						var data = new Object()
						data.value = ds[i].code
						data.label = ds[i].stateZh
						data.isLeaf = false
						datas[i - 1] = data
					}
				}).catch((err) => {
					console.log(err)
				})
				return datas
				
			},
			getStreet(code) {
				var datas =new Array()
				var url = "/json/address/address/addrStreet/" + code
				this.$axios.get(url).then((res) => {
					const ds = res.data.addrStreets
						for (var i = 0; i < ds.length; i++ ){
							var data = new Object()
							data.value = ds[i].code
							data.label = ds[i].streetZh
							datas[i] = data
						}
					}).catch((err) => {
						console.log(err)
					})
					return datas
			},
			getArea(code) {
				var datas =new Array()
				var url = "/json/address/address/addrArea/" + code
				this.$axios.get(url).then((res) => {
					const ds = res.data.addrAreas
						
						for (var i = 0; i < ds.length; i++ ){
							var data = new Object()
							data.value = ds[i].code
							data.label = ds[i].areaZh
							data.isLeaf = false
							datas[i] = data
						}
					}).catch((err) => {
						console.log(err)
					})
					return datas
			},
			getCity(code) {
				var datas =new Array()
				var url = "/json/address/address/addrCity/" + code
				this.$axios.get(url).then((res) => {
					const ds = res.data.addrCities
						for (var i = 0; i < ds.length; i++ ){
							var data = new Object()
							data.value = ds[i].code
							data.label = ds[i].cityZh
							data.isLeaf = false
							datas[i] = data
						}
					}).catch((err) => {
						console.log(err)
					})
					return datas
			},
			update(data){
				
				
			}
		},
			
		mounted(){
			const data = this.addressvalue
			const countrys = this.getCountry()
			const states = this.getState(data[0])
			const citys = this.getCity(data[1])
			const areas = this.getArea(data[2])
			const streets = this.getStreet(data[3])
			setTimeout(()=>{
				for (var i= 0; i < countrys.length ; i++){
					if(countrys[i].value == data[0]){
						var c = new Object()
						c.value = countrys[i].value
						c.label = countrys[i].label
						c.isLeaf = countrys[i].isLeaf
						c.children = states
						countrys[i] = c
						break
					}
				}
				for (var i= 0; i < states.length ; i++){
					if(states[i].value == data[1]){
						var c = new Object()
						c.value = states[i].value
						c.label = states[i].label
						c.isLeaf = states[i].isLeaf
						c.children = citys
						states[i] = c
						break
					}
				}
				for (var i= 0; i < citys.length ; i++){
					if(citys[i].value == data[2]){
						var c = new Object()
						c.value = citys[i].value
						c.label = citys[i].label
						c.isLeaf = citys[i].isLeaf
						c.children = areas
						citys[i] = c
						break
					}
				}
				for (var i= 0; i < areas.length ; i++){
					if(areas[i].value == data[3]){
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
			},3000)
			
		}
	}
</script>

<style>
</style>
