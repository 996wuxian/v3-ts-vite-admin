/**
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Session } from '@/utils/storage'
import { Router } from 'vue-router'
import useRoutesStore from '@/stores/modules/routes'
import useUserStore from '@/stores/modules/user'
import getPageTitle from '@/utils/pageTitle'
import { setting } from '@/config/setting.config'
import { ElMessage } from 'element-plus'

NProgress.configure({ showSpinner: false })

export function setupPermissions(router: Router) {
  const useRouter = useRoutesStore()
  const useUser = useUserStore()
  router.beforeEach(async (to: any, from: any, next: any) => {
    //设置页面title
    document.title = getPageTitle(to.meta.title)

    const token = Session.get('token')
    if (token) {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        // const hasRoles = useUser.userInfo.role
        const hasRoles = true
        if (hasRoles) {
          if (useRouter.routes.length) {
            await useRouter.setRoutes()
            next()
            NProgress.done()
          } else {
            // 获取动态路由
            try {
              await useRouter.setRoutes()
              next({ ...to, replace: true })
              NProgress.done()
            } catch (error) {
              console.log('error')
            }
          }
        } else {
          next()
          NProgress.done()
        }
      }
    } else {
      if (setting.routesWhiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        ElMessage({
          type: 'warning',
          message: '登录失效，请重新登录'
        })
        next(`/login`)
        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
