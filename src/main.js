import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import less from 'less'
import ElementUI from 'element-ui'
import toast from '@/components/Toast.js'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/theme/index.css'
import store from '../src/store/index.js'

import CkElementUI from '@/components/index.js'
import confirm from '@/components/Confirm.js'
import baseInfo from './utils/config'

import './assets/style/global.css'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(less)
Vue.use(ElementUI)
Vue.use(CkElementUI)
Vue.prototype.$toast = toast
Vue.prototype.$confirm = confirm
Vue.prototype.$baseInfo = baseInfo

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
