<template>
  <div class="content">
	  <relation :studentRelations="studentRelations"></relation>
  </div>
  
</template>
<script>
	import relation from '@/pages/person/components/relation'
	export default{
		data() {
			return {
				studentRelations:[
					{
						relaName:"fuck",
						relationship:2
					},
					{
						relaName:"cao",
						relationship:3
					},
					{
						relaName:"rinima",
						relationship:1
					},
					{
						relaName:"草泥马",
						relationship:6
					},
					{
						relaName:"草泥马",
						relationship:6
					},
					
					
				]
			}
		},
		components: {
			relation 
		},
	}
</script>
