<template>
  <div class="content">
	  <a-form :form="form">
		  <address_fuck :addressvalue="[]"></address_fuck>
	  </a-form>
  </div>
  
</template>
<script>
	import address_fuck from '@/pages/components/addressSelect/AddressSelectUpdate'
	export default{
		data() {
			return {
				form:this.$form.createForm(this),
			}
		},
		components: {
			address_fuck 
		},
	}
</script>
