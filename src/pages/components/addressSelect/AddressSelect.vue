<template>
	<div>
		<a-cascader style="width: 500px;" :options="options" @change="onChange" :loadData="loadData" placeholder="Please select" changeOnSelect/>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: this.getCountry(),
				// // 是否启用
				// disableds: [false, true, true, true, true],
				// // 是否已经获取数据(避免多次获取数据)
				// hasGet: [false,false,false,false,false],
				// citiyDatas: null,
				// stateDatas: null,
				// countryDatas: null,
				// areaDatas: null,
				// streetDatas: null,
				// country: null,
				// state:null,
				// citiy:null,
				// area:null,
				// street:null
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
				
			    this.options = [...this.options]
			  }, 1000);
			},
			getCountry() {
				var datas =new Array()
				this.$axios.get('/json/addrCountry/addrCountrys/listAll').then((res) => {
					var countrys = res.data.addrCountrys
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
					var ds = res.data.addrStates
					
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
					var ds = res.data.addrStreets
						
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
					var ds = res.data.addrAreas
						
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
					var ds = res.data.addrCities
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
			// select_address(data){
			// 	var id = data
			// 	this.hasGet[id] = true
			// 	if(id + 1 > 4) return
			// 	this.clearDate(id+1)
			// 	this.disableds[id + 1] = false
			// },
			// // 清除地址数据
			// clearDate(id){
			// 	switch(id){
			// 		case 1: {this.stateDatas = null;this.hasGet[1] = false;this.disableds[1] = true};
			// 		case 2: {this.citiyDatas = null;this.hasGet[2] = false;this.disableds[2] = true};
			// 		case 3: {this.areaDatas = null;this.hasGet[3] = false;this.disableds[3] = true};
			// 		case 4: {this.streetDatas = null;this.hasGet[4] = false;this.disableds[4] = true};
			// 	}
			// }
		},
	}
</script>

<style>
</style>
