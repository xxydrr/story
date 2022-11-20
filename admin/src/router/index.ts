import generatedRoutes from 'virtual:generated-pages'

import { setupLayouts } from 'virtual:generated-layouts'

import { createRouter, createWebHistory } from 'vue-router'

import Layout from '~/layouts/default.vue'
export const constantRoutes = setupLayouts(generatedRoutes.filter(route => route.meta?.layout === 'blank' || route.name === 'index'))

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('~/pages/home.vue'),
        name: 'Home',
        meta: {
          title: 'Home',
          roles: ['admin'],
        },
      },
    ],
  },
  {
    path: '/permission',
    component: Layout,
    name: 'Permission',
    meta: {
      title: 'Permission',
      roles: ['admin'],
    },
    children: [
      {
        path: 'test',
        component: () => import('~/pages/permission/test.vue'),
        name: 'PagePermission',
        meta: {
          title: 'Test',
          roles: ['admin'],
        },
      },
      {
        path: 'about',
        component: () => import('~/pages/permission/about.vue'),
        name: 'AboutPermission',
        meta: {
          title: 'About',
          roles: ['admin'],
        },
      },
    ],
  },
  {
    path: '/single',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('~/pages/single/index.vue'),
        name: 'SingleChild',
        meta: {
          title: 'Page SingleChild',
        },
      },
    ],
  },

]

export const router = createRouter({
  routes: constantRoutes,
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
