import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect: '/goods',
    children: [
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/home/children/goods/GoodsList.vue'),
        meta: {isShow: true,title:'商品列表'}
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/home/children/user/UserList.vue'),
        meta: {isShow: true,title:'用户列表'}
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('../views/home/children/role/RoleList.vue'),
        meta: {isShow: true,title:'角色列表'}
      },
      {
        path: '/authority',
        name: 'authority',
        component: () => import('../views/home/children/authority/AuthorityList.vue'),
        meta: {isShow: false,title:'权限列表'}
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/',
    redirect: '/home'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局路由守卫
router.beforeEach((to,from,next) => {
  const token:string | null = localStorage.getItem('token')
  if(!token && to.path != '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
