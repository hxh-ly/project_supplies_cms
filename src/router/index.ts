import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/util/cache'
import { firstMenu } from '@/util/map-menu'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children: [] -> 根据userMenus来决定 -> children
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 导航守卫
router.beforeEach((to) => {
  //看有没有资格进入
  if (to.path !== '/login') {
    const token = localCache.getItem('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path == '/main') {
    console.log('%c process--跳转到主页', 'background:#aaa;color:#bada55', to)
    return firstMenu.url
  }
  //console.log(router.getRoutes())
  // console.log(to) // route对象
})
export default router
