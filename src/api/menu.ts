import request from '@/utils/request'

const module = '/menu/'

// 获取所有菜单
export function QueryMenu(showLoading: boolean = false) {
  return request<any>({
    method: 'get',
    url: module,
    showLoading
  })
}
// 获取动态路由
export function QueryMenuRouters(showLoading: boolean = false) {
  return request<any>({
    method: 'get',
    url: `${module}queryMenuRouters`,
    showLoading
  })
}

// 新增菜单
export function CreateMenu(data, showLoading: boolean = false) {
  return request<any>({
    method: 'post',
    url: `${module}`,
    data,
    showLoading
  })
}
