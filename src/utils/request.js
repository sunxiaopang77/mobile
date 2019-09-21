/**
 * 请求模块：封装了 axios
 */
import axios from 'axios'
import JSONbig from 'json-bigint'
// // 《使用拦截器统一添加 token》2. 加载容器
import store from '@/store' // 在非组件模块中访问 Vuex 容器，那就谁用谁就直接加载

// 创建 axios 实例
// axios.create 的作用是克隆一个 axios 实例，它的作用和 axios 是一样的
// 假如一个应用中有多个不同的后台接口路径
//      http://api.a.com
//      http://api.b.com
// 当然，不仅仅是这个 baseURL，还有例如拦截器等都可以独立
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 配置处理后端返回的数据中包含超出 JavaScript 安全整数范围问题
request.defaults.transformResponse = [function (data) {
  // 假如 data 不是标准的 JSON 格式的字符串
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

// 配置 axios
// 请求拦截器
// 响应拦截器
// 。。。。
/**
 * 请求拦截器
 * 使用拦截器统一添加 token
 */
// 《使用拦截器统一添加 token》1. 添加拦截器
// 注意：为 request 添加拦截器
request.interceptors.request.use(function (config) {
  console.log('烂机器')
  // Do something before request is sent

  // 统一在请求头中添加 token，名字，数据
  // // 《使用拦截器统一添加 token》3. 添加 token
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

/**
 * 响应拦截器
 */
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

// 导出请求对象
export default request
