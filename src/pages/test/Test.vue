<template>
  <div class="content">
	  <a-form :form="form">
		  <addStudent></addStudent>
	  </a-form>
  </div>
  
</template>
<script>
	import addStudent from '@/pages/person/applyresult/addStudent'
	export default{
		data() {
			return {
				form:this.$form.createForm(this),
			}
		},
		components: {
			addStudent
		},
	}
</script>
