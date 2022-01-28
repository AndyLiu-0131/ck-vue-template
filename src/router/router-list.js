/*
  组件命名规则：大驼峰, 有明确层级关系。 示例：HelloWord.vue
  URL命名规则：一律小写，表现出层级关系
  meta中bread字段用以标注面包屑中的内容。多层关系用逗号分开。示例：bread:['个人中心','个人信息']  必填项
*/

import Home from '../pages/Home.vue'
import routerGlobal from './router-global.js' // 全局路由
const routerList = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          text: '首页',
          bread: ['首页']
        },
        component: () => import('../pages/index/Index.vue')
      },

      // not found
      {
        path: '/notfound',
        component: () => import('../globalPages/notfound/Index.vue')
      }
    ]
  },
  // 全局路由
  ...routerGlobal,
  {
    path: '/*',
    meta: {
      title: '404'
    },
    redirect: '/notfound'
  }
]

export default routerList
