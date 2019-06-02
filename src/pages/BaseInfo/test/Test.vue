<template>
	<div class="content">
		<addressSelect :addressvalue="null"></addressSelect>
	</div>
</template>
<script>
	import addressSelect from '@/pages/Baseinfo/components/addressSelect/AddressSelectUpdate'
	export default {
		data(){
			return{
			}
		},
		components:{
			addressSelect
		}
	}
</script>