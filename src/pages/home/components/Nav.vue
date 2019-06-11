<!--
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-12
 * @LastEditTime: 2019-04-12
 * @function: 左侧导航
 -->
<template>
	<div class="nav">
		<h4 class="nav-h4">教务管理系统</h4>
		<div class="side-bar">
			<a-menu mode="inline" theme="dark">
				<template v-for="item in navList">
					<a-menu-item v-if="!item.children" :key="item.key" @click="changeUrl(item.key)">
						<span>{{item.title}}</span>
					</a-menu-item>
					<sub-menu v-else :menu-info="item" :key="item.key" />
				</template>
			</a-menu>
		</div>
	</div>
</template>

<script>
	import SubMenu from './SubMenu.vue'
	export default {
		components: {
			'sub-menu': SubMenu,
		},
		data() {
			return {
				navList: [{
						key: 'onlineLeave', //作为跳转的地址（具有语义的单词拼接）
						title: '在线请假',
					},
					{

						key: 'baseinfo',

						title: '基本信息',

						children: [
							{
								key: 'person',
								title: '个人信息',
							}
							, {
								key: 'classmessage',
								title: '班级信息',
							}, {
								key: 'test',
								title: '测试页面'
							}
							, {
								key: 'applyresult',
								title: '申请结果',
							}, {
								key: 'chouti',
								title: '测试用的',
							}, {
								key: 'approvalcenter',
								title: '审批中心',
							},{
								key: 'baseinfo/studentInfo',
								title: '学生主要信息',
							},
							{
								key: 'applyrule',
								title: '审批规定'
							}
						]
					},
					{
						key: 'leaveRecord',
						title: '个人请假记录',
					},
					{
						key: 'leaveRecord2',
						title: '查看学生请假记录',
					},
					{
						key: 'leaveRecord3',
						title: '查看教师请假记录',
					},
					{
						key: 'stuAttendanceCheck',
						title: '考勤学生'
					},
					{
						key: 'teaAttendanceCheck',
						title: '考勤教师',
					},
					{
						key: 'permissionSetting',
						title: '权限设置',
						children: [{
								key: 'roleManage',
								title: '角色管理'
							},
							{
								key: 'userPermission',
								title: '用户授权'
							}
						]
					},
					{
						key: 'univManage',
						title: '系统管理',
						children: [{
							key: 'managerSetting',
							title: '管理员设置'

						}]
					},
					{
						key: 'lessonAplay',
						title: '调课补课停课申请',
						children: [{
								key: 'tuneAplay',
								title: '调课申请',
							},
							{
								key: 'addOrStopAplay',
								title: '停补课申请',
							}
						]
					},
					// {//一级菜单
					//   key: 'leaveRecords',
					//   title: '查看请假记录',
					// },
					// {//二级菜单
					//   key: 'menu3',
					//   title: 'menu3',
					//   children: [{
					//       key: 'menu3-item1',
					//       title: 'menu3-item1',
					//     },
					//     {
					//       key: 'menu3-item2',
					//       title: 'menu3-item2',
					//     },
					//   ],
					// },
					// {//三级菜单
					//   key: 'menu4',
					//   title: 'menu4',
					//   children: [{
					//       key: 'menu4-item1',
					//       title: 'menu4-item1',
					//       children: [{
					//           key: 'sub4-item1',
					//           title: 'sub4-item1',
					//         },
					//         {
					//           key: 'sub4-item2',
					//           title: "sub4-item2",
					//         },
					//         {
					//           key: 'sub4-item3',
					//           title: "sub4-item3",
					//         }
					//       ]
					//     },
					//     {
					//       key: 'menu4.2',
					//       title: 'menu4.2',
					//     }
					//   ],
					// },

				],
			}
		},
		methods: {
			changeUrl(url) {
				console.log(url)
				this.$router.push({
					name: url
				});
			}

		},

	}
</script>

<style scoped>
	.nav {
		width: 15%;
		/* min-width: 120px; */
		background: #2C3B48;
		color: rgba(255, 255, 255, .8);
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		overflow: hidden;
	}

	.nav-h4 {
		/* width: 100%; */
		height: 59px;
		min-width: 120px;
		line-height: 59px;
		text-align: center;
		color: #fff;
		font-weight: bold;
		border-bottom: 1px solid #4b545c;
	}

	.side-bar {
		width: 110%;
		height: 100vh;
		min-width: 120px;
		overflow-y: scroll;
		overflow-x: hidden;
		padding-bottom: 50%;
	}

	.ant-menu {
		background: #2C3B48 !important;
	}
</style>
