import axios from 'axios'
import config from '../utils/config'
import { getTokenInfo } from '../utils/publicFun'
// 创建axios实例
const baseUrl = config.BASE_URL
const requestTimeout = config.REQUEST_TIMEOUT
const service = axios.create({
  baseURL: baseUrl,
  timeout: requestTimeout // 请求超时时间
})
const serviIntercept = () => {
  if (!config.SERVICE_INTERCEPT) {
    return
  }
  // 请求拦截拦截器
  service.interceptors.request.use(
    config => {
      config.headers.userName = (() => {
        if (localStorage.userInfo) {
          return JSON.parse(localStorage.userInfo).userName
        } else {
          return ''
        }
      })()
      config.headers.userId = (() => {
        if (localStorage.userInfo) {
          return JSON.parse(localStorage.userInfo).userId
        } else {
          return ''
        }
      })()
      if (config.url !== 'sys-user-manager/pcLogin' && config.url !== 'token/getToken') {
        config.headers.token = (() => {
          if (getTokenInfo()) {
            return getTokenInfo()
          } else {
            // location.href = '/login'   // 这一步的作用是什么
            localStorage.removeItem('userInfo')
          }
        })()
      }
      return config
    },
    error => {
      console.log(error)
      Promise.reject(error)
    }
  )
  // 响应拦截
  service.interceptors.response.use(
    res => res,
    // 请求失败情况
    error => {
      const { response } = error
      if (response) {
        // 若状态码为 510 或者 401， 跳转至登录界面
        if (response.status === 510 || response.status === 401 || response.status === 512) {
          localStorage.userInfo = ''
          localStorage.tokenInfo = ''
          location.href = '/login'
        }
        return Promise.reject(response)
      } else {
        if (error.message) {
          console.log(error.message)
        } else {
          console.log('服务故障，请检查！')
        }
        return Promise.resolve()
      }
    })
}
// 响应拦截方法
serviIntercept()
export default service
