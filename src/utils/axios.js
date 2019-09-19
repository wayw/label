
import axios from 'axios'
import Vue from 'vue'
// import qs from 'qs';
import util from '@/utils/util'
import Model from '@/components/Model'
Vue.use(Model)
Vue.prototype.$axios = axios
var message = new Vue().$_message
// 192.168.2.21
// let baseURL = 'http://localhost:8000' // 最终域名
// let baseURL = 'http://172.18.49.167:88' /// 最终域名
let baseURL = 'http://172.18.233.80:8092'
// let baseURL = 'http://172.21.32.103:8091'
// let baseURL = 'http://172.18.49.169:8010'

const instance = axios.create({
  baseURL: baseURL,
  //  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
  headers: { 'Content-Type': 'application/json' },
  // timeout: 20000,
  withCredentials: true,
  transformRequest: [function (data) { // 向服务器发送前，修改请求数据，
    return data
  }]
})

// eslint-disable-next-line eqeqeq
if (process.env.NODE_ENV == 'development') {
  instance.defaults.baseURL = baseURL
  // eslint-disable-next-line eqeqeq
} else if (process.env.NODE_ENV == 'production') {
  instance.defaults.baseURL = baseURL
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么?
  // console.log(config)
  if (config.url.indexOf('/add') === -1) {
    config.data = JSON.stringify(config.data)
  }
  // console.log(config.data)
  return config
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response.data
  let status = response.status
  if (status === 200 || status === 304) {
    if (data.code === 200 || data.code === 0) {
      return Promise.resolve(data)
    } else {
      if (data.code === '0000201') {
        let userInfo = util.authorize()
        message.error('当前会话已超时，请重新登录')
        userInfo.isLoad = false
        util.setCookie('userinfo', JSON.stringify(userInfo), 30)
        window.location.href = '/index.html#/login'
      } else if (data.code !== 500) {
        if (data.msg === undefined) {
          return data
        }
        message.error(data.msg)
      }
      if (data.code === 401) {
        let userInfo = util.authorize()
        if (userInfo && userInfo.isLoad) {
          userInfo.isLoad = false
          util.setCookie('userinfo', JSON.stringify(userInfo), 30)
          window.location.href = '/#/login'
        } else {
          window.location.href = '/#/login'
        }
      }
      return Promise.reject(data)
    }
  } else {
    return Promise.reject(response)
  }
}, function (error) {
  return Promise.reject(error)
})

export default instance
