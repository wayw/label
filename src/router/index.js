import Vue from 'vue'
import Router from 'vue-router'
import util from '../utils/util'
Vue.use(Router)

var router = new Router({
  fallback: false,
  routes: [
    {
      path: '/',
      // name: 'Welcome',
      component: () => import('@/pages/login.vue')
    },
    {
      name: 'home',
      path: '/home',
      title: '我的任务',
      meta: { requiresAuth: true },
      component: () => import('@/pages/home.vue')

    },
    {
      name: 'taskpool',
      path: '/home/taskpool',
      component: () => import('@/pages/taskpool.vue')

    },
    // {
    //   name: 'mytask',
    //   title: '我的任务',
    //   path: '/home/main',
    //   component: () => import('@/pages/mytask.vue')
    // },
    {
      name: 'mydetails',
      path: '/home/mmain',
      component: () => import('@/pages/tasklabelmain.vue')
    },
    {
      path: '/login',
      component: () => import('@/pages/login.vue'),
      name: 'login',
      meta: {
        title: '登录',
        requiresAuth: false
      }
    },
    {
      path: '/task/newtask',
      component: () => import('@/pages/newtask.vue'),
      name: 'newtask'
    },
    {
      path: '/task/historytask',
      component: () => import('@/pages/historytask.vue'),
      name: 'historytask',
      title: '任务管理'
    },
    {
      path: '/taskassign',
      name: 'taskassign',
      component: () => import('@/pages/taskassign.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
  // mode:'history'
})

// 登录页面白名单处理.
const white = ['/login']
router.beforeEach((to, form, next) => {
  let userInfo = util.authorize()
  if (userInfo && userInfo.isLoad) {
    if (to.path === '/login' || to.path === '/') {
      next('/home/taskpool')
    } else {
      next()
    }
  } else if (white.includes(to.path)) {
    next()
  } else {
    next('/login')
  }
})

export default router
