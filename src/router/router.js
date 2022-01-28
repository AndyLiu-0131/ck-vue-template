import Vue from 'vue'
import VueRouter from 'vue-router'
import routerList from './router-list.js'
import baseInfo from '../utils/config'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: routerList
})
const routerIntercept = () => {
  if (!baseInfo.ROUTER_INTERCEPT) {
    return false
  }
  const whiteList = baseInfo.ROTER_WHITE_LIST
  const treeToArray = (array, tree) => {
    tree.forEach(item => {
      if (item.path !== '/notfound' && item.path !== '/' && item.path !== '/login' && item.path !== '/autuoLogin') {
        array.push(item.path)
      }
      if (item.childNodes && item.childNodes.length > 0) {
        treeToArray(array, item.childNodes)
      }
    })
    return array
  }
  const menuList = localStorage.menuTree ? JSON.parse(localStorage.menuTree) : []
  const rightList = treeToArray([], menuList)
  router.beforeEach((to, from, next) => {
    document.title = baseInfo.BASE_TITLE + '-' + to.meta.text
    if (localStorage.tokenInfo && localStorage.userInfo) {
      if (to.path === '/login') {
        next({ path: '/' })
      }
      if (to.path === '/notfound' || to.path === '/') {
        next()
      } else {
        // eslint-disable-next-line no-unused-vars
        let hasRouter = 0
        rightList.forEach(item => {
          if (to.path.indexOf(item) !== -1) {
            hasRouter++
          }
        })
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
      }
    }
  })
}
routerIntercept()

export default router
