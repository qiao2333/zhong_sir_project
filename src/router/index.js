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
							name: 'Person',
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
							name: '申请结果',
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

			]
		}

	]
})
