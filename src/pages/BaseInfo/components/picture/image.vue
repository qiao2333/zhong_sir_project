<template>
	<div>
		<div>
			<a-spin v-if="load"/>
			<div v-else>
				<img :style="MyStyle"  :src="imagepath" />
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props: {
			filepath: {
				type: String,
			},
			MyStyle:{
				type:String,
			}
		},
		data() {
			return {
				load: true,
				imagepath:null
			}
		},
		mounted(){
			this.fetch(this.filepath)
		},
		methods:{
			
			fetch(path){
				this.axios.get("/json/picture/getImage/" + path,{responseType: "arraybuffer"}).then(async (res)=>{
					var imagedata = res.data
					var img  = 'data:image/png;base64,' + btoa (new Uint8Array(imagedata).reduce( (imagedata, byte) => imagedata + String.fromCharCode(byte), ''))
					this.imagepath = img
					this.load = false
				}).catch((err)=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style>
</style>
