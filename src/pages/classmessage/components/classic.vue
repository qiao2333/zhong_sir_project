<template>
  <div class="content">
    <a-input-search
      placeholder="输入班级"
      style="width: 200px"
      @search="onSearch"
    />
    
  
	<a-card title="16软一">
	  <a-card-grid style="width:25%;textAlign:'center'">姓名</a-card-grid>
	  <a-card-grid style="width:25%;textAlign:'center'">学号</a-card-grid>
	  <a-card-grid style="width:25%;textAlign:'center'">性别</a-card-grid>
	  <a-card-grid style="width:25%;textAlign:'center'">宿舍</a-card-grid>
	  <a-card-grid style="width:25%;textAlign:'center'">乔哥</a-card-grid>
	  <a-card-grid style="width:25%;textAlign:'center'">201624133103</a-card-grid>
	  <a-card-grid style="width:25%;textAlign:'center'">男</a-card-grid>
	  <a-card-grid style="width:25%;textAlign:'center'">5区102</a-card-grid>
	  <a-card-grid style="width:25%;textAlign:'center'">{{user.user_name}}</a-card-grid>
	  <a-card-grid style="width:25%;textAlign:'center'">{{student.stu_no}}</a-card-grid>
	  <a-card-grid style="width:25%;textAlign:'center'">{{user.user_sex}}</a-card-grid>
	  <a-card-grid style="width:25%;textAlign:'center'">{{student.live_room}}</a-card-grid>
	</a-card>
</div>

</template>
<script>
import ExportJsonExcel from 'js-export-excel';
export default {
  methods: {
    onSearch (value) {
      console.log(value)
    },
  },
  data() {
			return {
				hasload: false,
				loading: true,
				student: {
					stu_no: "未加载",
					live_room: "未加载"
				},
				user: {
					user_name: "未加载",
					user_sex: "未加载",
				},
			}
		},
		mounted() {
			this.$axios.post('/classmessage/classic').then((res) => {
				const data = res.data
				this.student = data.data.student
				this.user = data.data.user
				this.hasload = true
				this.loading = false
			}).catch((err) => {
				console.log(err)
			})
		},
}
</script>

