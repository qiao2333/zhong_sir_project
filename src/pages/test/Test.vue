<template>
  <div>
	  测试页面{{getSecond()}}
  </div>
</template>
<script>
export default {
  data() {
    return {
		
    }
  },
  methods: {
	  getSecond(){
		  this.$axios.get('/json/secondLevelDiscipline/secondLevelDisciplines/listAll').then((res)=>{
			  const data = res.data
			  console.log(data)
		  }).catch((err)=>{
			  console.log(err)
		  })
	  }
  }
}
</script>
