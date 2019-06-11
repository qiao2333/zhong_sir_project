import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import Announcement from '@/pages/announcement/Announcement'
import StudentLeave from '@/pages/studentLeave/StudentLeave'
import Test from '@/pages/BaseInfo/test/Test'
import Person from '@/pages/BaseInfo/person/Person'
import Classmessage from '@/pages/BaseInfo/classmessage/Classmessage'
import Applyresult from '@/pages/BaseInfo/applyresult/Applyresult'
import Chouti from '@/pages/BaseInfo/chouti/Chouti'
import Approvalcenter from '@/pages/BaseInfo/approvalcenter/Approvalcenter'
import BaseInfo from '@/pages/BaseInfo/BaseInfo'
import ApplyRule from '@/pages/BaseInfo/applyrule/applyrule'
import OnlineLeave from '@/pages/onlineLeave/OnlineLeave'
import RoleManage from '@/pages/permissionSetting/RoleManage'
import UserPermission from '@/pages/permissionSetting/UserPermission'
import ManagerSetting from '@/pages/admin/Administrator'
import TuneAplay from '@/pages/lessonAplay/TuneAplay'
import AddOrStopAplay from '@/pages/lessonAplay/AddOrStopAplay'
import LeaveRecord from '@/pages/leaveRecord/LeaveRecord'
import LeaveRecord2 from '@/pages/leaveRecord/LeaveRecord2'
import LeaveRecord3 from '@/pages/leaveRecord/LeaveRecord3'
import StuAttendanceCheck from '@/pages/stuAttendanceCheck/StuAttendanceCheck'
import TeaAttendanceCheck from '@/pages/teaAttendanceCheck/TeaAttendanceCheck'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			children: [{
					path: 'baseinfo',
					name: '学生基础信息',
					component: BaseInfo,
					children: [{
							path: 'person',
							name: 'person',
							component: Person
						},
						{
							path: 'chouti',
							name: 'Chouti',
							component: Chouti
						},
						{
							path: 'test',
							name: 'Test',
							component: Test
						},
						{
							path: 'applyresult',
							name: 'applyresult',
							component: Applyresult
						},
						{
							path: 'approvalcenter',
							name: 'Approvalcenter',
							component: Approvalcenter
						},
						{
							path: 'classmessage',
							name: 'Classmessage',
							component: Classmessage
						},
						{
							path: 'applyrule',
							name: 'applyrule',
							component: ApplyRule
						}
					]
				},
				{
					path: 'announcement',
					name: 'Announcement',
					component: Announcement
				},
				{
					path: 'studentLeave',
					name: 'StudentLeave',
					component: StudentLeave
				},
				{
					path: 'announcement',
					name: 'announcement',
					component: Announcement
				},
				{
					path: 'onlineLeave',
					name: 'onlineLeave',
					component: OnlineLeave
				},
				{
					path: 'roleManage',
					name: 'roleManage',
					component: RoleManage
				},
				{
					path: 'userPermission',
					name: 'userPermission',
					component: UserPermission
				},
				{
					path: 'managerSetting',
					name: 'managerSetting',
					component: ManagerSetting
				},
				{
					path: 'tuneAplay',
					name: 'tuneAplay',
					component: TuneAplay
				},
				{
					path: 'addOrStopAplay',
					name: 'addOrStopAplay',
					component: AddOrStopAplay
				},
				{
					path: 'leaveRecord',
					name: 'leaveRecord',
					component: LeaveRecord
				},
				{
					path: 'leaveRecord2',
					name: 'leaveRecord2',
					component: LeaveRecord2
				},
				{
					path: 'leaveRecord3',
					name: 'leaveRecord3',
					component: LeaveRecord3
				},
				{
					path: 'stuAttendanceCheck',
					name: 'stuAttendanceCheck',
					component: StuAttendanceCheck
				},
				{
					path: 'teaAttendanceCheck',
					name: 'teaAttendanceCheck',
					component: TeaAttendanceCheck,
				},
			]
		}
	]
})
