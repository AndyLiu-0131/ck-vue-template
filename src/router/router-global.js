export default [
  {
    path: '/login',
    name: '登录',
    meta: {
      bread: []
    },
    component: () => import('../globalPages/login/Index.vue')
  },
  {
    path: '*',
    name: 'notFound',
    redirect: '/notfound'
  }
]
