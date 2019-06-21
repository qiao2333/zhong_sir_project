<template>
	<div>
		<div v-if="headers == null">
			获取头像数据失败
		</div>
		<div v-else>
			<a-card title="用户头像">

				<a-row v-if="headers != null">
					<div v-for="(item, index) in headers" :key="item.id">
						<a-col span="12">
							<a-card  :title="item.flag?'生活照':'个人照'">
								<Imager  :MyStyle="'height: 300px;width: 300px;'" :filepath="item.pictureName" />
								<div slot="extra">
									<a-button v-if="canUpdate" type="primary" @click="showModal()">修改</a-button>
								</div>
							</a-card>
						</a-col>
						

					</div>


				</a-row>
				<div v-else style="height: 300px;width: 300px;text-align: center;">
					用户暂时没有头像<a-button v-if="canUpdate" slot="extra" @click="showModal">上传</a-button>
				</div>
			</a-card>
			<Picture v-if="canUpdate" ref="picture" />
		</div>
	</div>
</template>

<script>
	import Imager from '@/pages/BaseInfo/components/picture/image'
	import Picture from '../applypage/Picture'
	export default {
		props: {
			UserId: {
				type: Number,
				default: 0
			},
			canUpdate: {
				type: Boolean,
			},
		},
		data() {
			return {
				headers: null,
				modal: {
					visible: false,
					oldvalue: null,
				}
			}
		},
		components: {
			Imager,
			Picture
		},
		mounted() {
			this.fetch(this.UserId)
		},
		methods: {
			fetch(id) {
				this.axios.get("json/picture/getImageInformation/" + id).then((res) => {
					if (res.data.code == 0) {
						console.log(res.data)
						var Pictures = [{
							flag: false
						}, {
							flag: true
						}]
						var fuck = this.$lodash.unionWith(res.data.pictures, Pictures, function(v, o) {
							return o.flag == v.flag
						})
						this.headers = fuck
					} else {
						this.$emit("tip", {
							type: "error",
							text: "获取头像失败"
						})
					}
				}).catch((err) => {
					this.$emit("tip", {
						type: "warning",
						text: "发生未知错误"
					})
				})

			},
			showModal() {
				this.$refs.picture.showModal()
			},
		},
	}
</script>

<style>
</style>
