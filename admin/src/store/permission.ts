import { acceptHMRUpdate, defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '~/router'

function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route?.meta?.roles) {
    const rolesArr = route.meta.roles as string[]
    return roles.some(role => rolesArr.includes(role))
  }
  return true
}

function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children)
        tmp.children = filterAsyncRoutes(tmp.children, roles)

      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>()
  const addRoutes = ref<RouteRecordRaw[]>()
  function generateRoutes(roles: string[]) {
    let accessedRoutes: RouteRecordRaw[] = []
    if (roles.includes('admin'))
      accessedRoutes = asyncRoutes || []
    else
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)

    addRoutes.value = accessedRoutes
    routes.value = [...constantRoutes, ...accessedRoutes]
    return accessedRoutes
  }
  return {
    routes,
    generateRoutes,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot))
