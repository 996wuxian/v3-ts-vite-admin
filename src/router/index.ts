import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

import { setting } from '@/config/setting.config'

import { setupPermissions } from './permissions'

const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error-page/403.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      hidden: true
    }
  }
]

export const asyncRoutes = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页',
      levelHidden: true,
      icon: 'Menu',
      hidden: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          title: '首页',
          icon: 'Menu'
        }
      }
    ]
  },
  {
    path: '/plug-in-unit',
    name: 'PlugInUnit',
    component: Layout,
    meta: {
      title: '插件',
      icon: 'Menu',
      roles: ['admin', 'editor'],
      hidden: true
      // isKeepAlive: true
    },
    children: [
      {
        path: '/pdf',
        name: 'Pdf',
        component: () => import('@/views/pdf-js/PdfJs.vue'),
        meta: {
          title: 'Pdf',
          icon: 'Menu',
          roles: ['admin', 'editor']
          // isKeepAlive: true
        }
      },
      {
        path: '/codemirror-editor',
        name: 'CodemirrorEditor',
        component: () => import('@/views/codemirror-editor/CodemirrorEditor.vue'),
        meta: {
          title: 'CodemirrorEditor',
          icon: 'Menu',
          roles: ['admin', 'editor']
          // isKeepAlive: true
        }
      },
      {
        path: '/monaco-editor',
        name: 'MonacoEditor',
        component: () => import('@/views/monaco-editor/MonacoEditor.vue'),
        meta: {
          title: 'MonacoEditor',
          icon: 'Menu',
          roles: ['admin', 'editor']
          // isKeepAlive: true
        }
      },
      {
        path: '/excel',
        name: 'Excel',
        component: () => import('@/views/excel/Excel.vue'),
        meta: {
          title: 'XLSX',
          icon: 'Menu',
          roles: ['admin', 'editor']
          // isKeepAlive: true
        }
      },
      {
        path: '/echarts',
        name: 'Echarts',
        component: () => import('@/views/echarts/Echarts.vue'),
        meta: {
          title: 'Echarts',
          icon: 'Menu',
          roles: ['admin', 'editor']
          // isKeepAlive: true
        }
      }
    ]
  },
  // {
  //   path: '/order',
  //   name: 'Order',
  //   component: Layout,
  //   meta: {
  //     title: '订单管理',
  //     icon: 'Menu',
  //     // roles: ['admin', 'editor'],
  //     hidden: false
  //     // isKeepAlive: true
  //   },
  //   children: [
  //     {
  //       path: '/order-management',
  //       name: 'OrderManagement',
  //       component: () => import('@/views/order-management/OrderManagement.vue'),
  //       meta: {
  //         title: '订单管理',
  //         icon: 'Menu'
  //         // roles: ['admin', 'editor']
  //         // isKeepAlive: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/system-management',
    name: 'SystemManagement',
    meta: {
      title: '系统管理',
      icon: 'Menu',
      hidden: true
      // roles: ['admin']
      // isKeepAlive: true
    },
    component: Layout,
    children: [
      {
        path: '/role-management',
        name: 'RoleManagement',
        component: () => import('@/views/role-management/RoleManagement.vue'),
        meta: {
          title: '角色管理',
          icon: 'Menu',
          father: '系统管理',
          // roles: ['admin'],
          hidden: false
          // isKeepAlive: true
        }
      },
      {
        path: '/Menu-management',
        name: 'MenuManagement',
        component: () => import('@/views/menu-management/MenuManagement.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Menu',
          father: '系统管理',
          // roles: ['admin'],
          hidden: false
          // isKeepAlive: true
        }
      },
      {
        path: '/user-management',
        name: 'UserManagement',
        component: () => import('@/views/user-management/UserManagement.vue'),
        meta: {
          title: '用户管理',
          icon: 'Menu',
          father: '系统管理',
          // roles: ['admin'],
          hidden: false
          // isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NoFound',
    redirect: '/404',
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history: setting.isHashRouterMode ? createWebHashHistory() : createWebHistory(),
  routes: constantRoutes as RouteRecordRaw[]
})

export const addRouter = (routes: any) => {
  routes.forEach((route: any) => {
    if (!router.hasRoute(route.name)) router.addRoute(route as RouteRecordRaw)
    if (route.children) addRouter(route.children)
  })
}

export function setupRouter(app: any) {
  // 开发路由
  if (setting.authentication === 'intelligence') addRouter(asyncRoutes)
  // 后端路由
  setupPermissions(router)
  app.use(router)
  return router
}

export default router
