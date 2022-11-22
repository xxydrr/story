import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '.'
import { getToken } from '~/utils/auth'
const whiteList = ['/login']
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  if (to.path !== from.path)
    NProgress.start()

  if (to.meta.redirect) {
    return next({
      path: to.meta.redirect as string,
    })
  }

  const hasToken = getToken()
  if (hasToken) {
    // 已登录
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    }
    else {
      const hasRoles = useUserStore().roles.length > 0
      if (hasRoles) {
        next()
      }
      else {
        try {
          const roles = await useUserStore().getInfo()
          const accessRoutes = await usePermissionStore().generateRoutes(roles)
          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        }
        catch (error) {
          // remove token and go to login page to re-login
          await useUserStore().logout()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  }
  else {
    // 未登录
    if (whiteList.includes(to.path)) {
      next()
    }
    else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => { NProgress.done() })
