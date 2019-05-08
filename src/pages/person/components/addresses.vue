<template>
	<div>
		<a-card title="用户地址表">
			<a-list bordered>
				<div slot="地址信息">Header</div>
				<a-list-item v-for="add in addresses" :key="add.id">
					<a slot="actions">修改</a>
					<a-list-item-meta :description="description(add)">
						<a slot="title">{{flag(add.flag)}}</a>
					</a-list-item-meta>
				</a-list-item>

			</a-list>
		</a-card>
	</div>
</template>

<script>
	export default {
		props: ['addresses', 'addrAreas', 'addrStreets', 'addrCities', 'addrStates', 'addrCountries'],
		data() {
			return {
				myAddress: [],
			}
		},
		methods: {
			description(add) {
				var country = this.Countries(add.country)
				var state = this.States(add.state)
				var city = this.Cities(add.city)
				var area = this.Areas(add.area)
				var street = this.Streets(add.street)
				var adds = {
					id: add.id,
					country: {
						id: add.country,
						val: country
					},
					state: {
						id: add.state,
						val: state
					},
					city: {
						id: add.city,
						val: city
					},
					area: {
						id: add.area,
						val: area
					},
					street: {
						id: add.street,
						val: street
					}
				}
				this.myAddress.push(adds)
				var s = '地址：' + country + state + city + area + street + '\n详细尾缀：' + add.detail + '邮政编码：' + add.zipCode + '手机号码：' +
					add.telephone

				return s
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
			// 0: 当前住址  1: 收件地址\\n2: 曾经住址  3: 通信地址\\n4: 办公地址
			flag(id) {
				var s = ''
				switch (id) {
					case 0:
						s = '当前住址';
						break;
					case 1:
						s = '收件地址';
						break;
					case 2:
						s = '曾经住址';
						break;
					case 3:
						s = '通信地址';
						break;
					case 4:
						s = '办公地址';
						break;
				}
				return s
			}

		},
	}
</script>

<style>
</style>
