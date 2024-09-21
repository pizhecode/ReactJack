import axios from 'axios'
import { getToken } from './token'
//axios的封装处理
//1 根域名配置
const request = axios.create({
  // baseURL: 'http://geek.itheima.net/v1_0',
  baseURL: 'http://localhost:8084',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 添加请求拦截器
request.interceptors.request.use((config)=> {
    //操作config，注入token
    // 1 获取token
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export { request }