// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import moment from 'moment'
import lodash from 'lodash'
import {Popconfirm,Spin,Cascader, Modal,Drawer, dropdown, List,Checkbox,Menu,Icon,Badge,message,DatePicker,Radio,Input,Select,Form,Upload,Tabs,Button,Row,Col,
Collapse,Card,Table} from 'ant-design-vue'
import "./assets/styles/css/reset.css"
import "./assets/styles/css/iconfont.css"
import './assets/styles/css/content.css'

//可以删除
import mock from 'mockjs'

Vue.use(Checkbox)
Vue.use(Popconfirm)
Vue.use(Spin)
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
Vue.prototype.$moment = moment;
Vue.prototype.$lodash = lodash;
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api'
Vue.prototype.$qs = qs;                //qs.stringify()将对象 序列化成URL的形式，以&进行拼接
Vue.prototype.axios = axios;         //axios结合vue-axios使用
Vue.prototype.$VueAxios = VueAxios;
Vue.prototype.$mock = mock; 
Vue.use({axios,VueAxios});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  
})
