import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import Announcement from '@/pages/announcement/Announcement'
import StudentLeave from '@/pages/studentLeave/StudentLeave'
import Test from '@/pages/test/Test'
import Person from '@/pages/person/Person'
import Classmessage from '@/pages/classmessage/Classmessage'
import Applyresult from '@/pages/applyresult/Applyresult'
import Chouti from '@/pages/chouti/Chouti'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: 'announcement',
          name: 'Announcement',
          component: Announcement
        },
        {
          path: 'classmessage',
          name: 'Classmessage',
          component: Classmessage
        },
        {
          path: 'studentLeave',
          name: 'StudentLeave',
          component: StudentLeave
        },
        {
          path: 'person',
          name: 'Person',
          component: Person
        }£¬
		{
			path: 'applyresult',
			name: 'Applyresult',
			component: Applyresult
		},
		{
			path: 'chouti',
			name: 'Chouti',
			component: Chouti
		}£¬
		{
			path: 'test',
			name: 'Test',
			component: Test
		}      ]
    }
		
  ]
})
