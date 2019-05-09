// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import {Cascader, Modal,Drawer, dropdown, List,Checkbox,Menu,Icon,Badge,message,DatePicker,Radio,Input,Select,Form,Upload,Tabs,Button,Row,Col,
Collapse,Card,Table} from 'ant-design-vue'
import "./assets/styles/css/reset.css"
import "./assets/styles/css/iconfont.css"
import './assets/styles/css/content.css'

Vue.use(Cascader)
Vue.use(Modal);
Vue.use(List);
Vue.use(Table);
Vue.use(Card);
Vue.use(Collapse);
Vue.use(Row);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Input);
Vue.use(Form);
Vue.use(Upload);
Vue.use(Tabs);
Vue.use(Button);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Badge);
Vue.use(message);
Vue.use(dropdown);
Vue.prototype.$message = message;
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/json';//解决sessionId不一致问题：跨域共享session
Vue.prototype.$qs = qs;                //qs.stringify()将对象 序列化成URL的形式，以&进行拼接
Vue.prototype.$axios = axios;         //axios结合vue-axios使用
Vue.prototype.$VueAxios = VueAxios;
Vue.use({axios,VueAxios});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  
})
