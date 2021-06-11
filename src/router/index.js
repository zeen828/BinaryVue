import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: () => import('@/views/Test.vue')
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/Logout.vue')
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/Page-404.vue')
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log('router.beforeEach')
//   next()
// })

export default router
