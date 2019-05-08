<template>
	<div></div>
</template>

<script>
	export default{
		data() {
			return {
				
			forms2:[{
						key: 1,
						label: "学号",
						type: "text",
						name: "stu_no",
						rules:{rules: [{ required: true, message: '请输入你的学号!' }]},
					},
					{
						key: 2,
						label: "年级",
						type: "text",
						name: "grade",
						rules:{rules: [{ required: true, message: '请输入你的身份证号!', pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/i }]}
					},
					{
						key: 3,
						label: "性别",
						type: "radio",
						name: "user_sex",
						rules:{rules: [{ required: true,message: '请选择你的性别!' }]},
						options:[
							{key:1,name:"不详",value:2},
							{key:2,name:"男",value:1},
							{key:3,name:"女",value:0},
						]
					},
					{
						key: 4,
						label: "出生日期",
						type: "date",
						name: "user_birthday",
						rules:{rules: [{ required: true, message: '请输入你的出生日期!' }]},
					},
					{
						key: 5,
						label: "注册时间",
						type: "date",
						name: "regist",
						rules:{rules: [{ required: true, message: '请输入你的注册时间!' }]},
					},
				]
			}
		},
		
	}
</script>

<style>
</style>
