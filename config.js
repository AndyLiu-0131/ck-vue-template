const baseInfo = {
  BASE_TITLE: '五院体检档案管理系统',
  COMPANY_TITLE: '苏州同启苏沐软件有限公司',
  COPY_RIGHT: '苏州同启苏沐软件有限公司版权所有',
  LOGIN_OUT_TIME: 3600 * 3 * 1000,
  GET_TOKEN_AGIN: 3600 * 5 * 1000,
  ROUTER_INTERCEPT: true, // 是否开启路由拦截
  ROTER_WHITE_LIST: ['/login', '/authredirect', '/register', '/autuoLogin'], // 路由白名单
  SERVICE_INTERCEPT: true,
  REQUEST_TIMEOUT: 15000, // 请求超时时间
  SCOKET_HOST: 'ws://192.168.31.215:91/socketServer',
  BASE_URL: 'http://192.168.31.215:91/',
  APP_ENV: 'production'
}
export default baseInfo
