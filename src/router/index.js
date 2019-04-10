import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import Announcement from '@/pages/announcement/Announcement'
import StudentLeave from '@/pages/studentLeave/StudentLeave'


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
          path: 'studentLeave',
          name: 'StudentLeave',
          component: StudentLeave
        },

      ]
    }
  ]
})
