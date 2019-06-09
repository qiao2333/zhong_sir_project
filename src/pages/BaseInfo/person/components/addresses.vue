<template>
	<div>
		<a-spin v-if="hasload == false" />
		<a-list v-else bordered>
			<div slot="地址信息">Header</div>
			<a-list-item v-for="(item, index) in address" :key="index">
				<a slot="actions" @click="showModal(addresses[index])">修改</a>
				<a-list-item-meta :description="item.description">
					<a slot="title" v-html="item.title"></a>
				</a-list-item-meta>
			</a-list-item>
		</a-list>
		<Address @tip="tip" ref="addressModal"></Address>
	</div>
</template>

<script>
	import Address from "@/pages/Baseinfo/person/applypage/Address"
	export default {
		props: ['addresses', 'addrAreas', 'addrStreets', 'addrCities', 'addrStates', 'addrCountries'],
		data() {
			return {
				address: [],
				count: 0,
				hasload: false,
				modal:{
					visible: false,
				},
				flags:[
					'当前住址',
					'收件地址',
					'曾经住址',
					'通信地址',
					'办公地址',
				]
			}
		},
		components: {
			Address
		},
		mounted() {
			for (var add of this.addresses) {
				var country = this.Countries(add.country)
				var state = this.States(add.state)
				var city = this.Cities(add.city)
				var area = this.Areas(add.area)
				var street = this.Streets(add.street)
				var adds = [add.country, add.state, add.city, add.area, add.street]
				var ad = {
					title: this.flags[add.flag],
					description: '地址：' + country + state + city + area + street + '  邮政编码：' + add.zipCode +
						'    手机号码：' +
						add.telephone
				}
				this.address.push(ad)
				this.hasload = true
			}
		},
		methods: {
			showModal(item) {
				var object = {
					address: [item.country, item.state, item.city, item.area, item.street],
					detail: item.detail,
					zipCode: item.zipCode,
					telephone: item.telephone,
				}
				this.$refs.addressModal.showModal(object)
			},
			handleCancel() {
				this.visible = false
			},
			handleOk() {
				this.visible = false
			},
			Areas(id) {
				for (var i = 0; i < this.addrAreas.length; i++) {
					if (id == this.addrAreas[i].id) {
						return this.addrAreas[i].areaZh
					}
				}
			},
			Streets(id) {
				for (var i = 0; i < this.addrStreets.length; i++) {
					if (id == this.addrStreets[i].id) {
						return this.addrStreets[i].streetZh
					}
				}
			},
			Cities(id) {
				for (var i = 0; i < this.addrCities.length; i++) {
					if (id == this.addrCities[i].id) {
						return this.addrCities[i].cityZh
					}
				}
			},
			States(id) {
				for (var i = 0; i < this.addrStates.length; i++) {
					if (id == this.addrStates[i].id) {
						return this.addrStates[i].stateZh
					}
				}
			},
			Countries(id) {
				for (var i = 0; i < this.addrCountries.length; i++) {
					if (id == this.addrCountries[i].id) {
						return this.addrCountries[i].countryZh
					}
				}
			},
			tip(data){
				this.$emit("tip",data)
			},
		},
	}
</script>

<style>
</style>
