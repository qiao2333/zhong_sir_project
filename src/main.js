// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import {Menu,Icon,Badge,message} from 'ant-design-vue'
import "./assets/styles/css/reset.css"
import "./assets/styles/css/iconfont.css"
import './assets/styles/css/content.css'

Vue.use(Menu);
Vue.use(Icon);
Vue.use(Badge);
Vue.use(message);
Vue.prototype.$message = message
Vue.config.productionTip = false
axios.defaults.withCredentials = true //解决sessionId不一致问题：跨域共享session
Vue.prototype.$qs = qs                //qs.stringify()将对象 序列化成URL的形式，以&进行拼接
Vue.use(VueAxios,axios)               //axios结合vue-axios使用

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
