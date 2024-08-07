import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
// 前置守卫
const whiteList = ['/login', '/404'] // 白名单
router.beforeEach(async(to, from, next) => {
  // 进度条
  nProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
      nProgress.done()
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login') // 中转到登录页
      nProgress.done()
    }
  }
})
// 后置守卫
router.afterEach(() => {
  nProgress.done()
})
