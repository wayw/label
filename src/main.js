// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import vueUpload from 'vue-upload-component'
// import {
//   Button, Select, Table, RadioGroup, Pagination,
//   Dialog, Checkbox, Tooltip, Form, Alert, Message,
//   Slider,
//   Input,
//   Icon, Upload
// } from 'element-ui'
import App from './App'
// import promise from 'es6-promise'

import axios from '@/utils/axios'

// mock test interface
// require('@/mock/')

import JsonExcel from 'vue-json-excel'
import store from './store/index'
import router from './router'
Vue.component('fileload', vueUpload)
// promise.polyfill()
var message = new Vue().$_message
axios.withCredentials = true
Vue.use(ElementUI)
// Vue.use(Button, Select, Table, RadioGroup, Input, Checkbox, Tooltip, Form, Pagination,
//   Dialog, Alert, Slider, Icon, Upload, Message)
Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  message,
  components: { App },
  template: '<App/>'
})
