import request from '@/utils/request'

const module = '/user/'

// 获取所有用户
export function QueryUsers(params, showLoading: boolean = false) {
  return request<any>({
    method: 'get',
    url: module,
    showLoading,
    params
  })
}

// 获取用户对应菜单
export function QueryUserMenu(params, showLoading: boolean = false) {
  return request<any>({
    method: 'get',
    url: `${module}roleMenu/${params}`,
    showLoading
  })
}

// 获取所有角色

export function QueryRoles(showLoading: boolean = false) {
  return request<any>({
    method: 'get',
    url: `${module}getRole/role`,
    showLoading
  })
}

interface LoginData {
  code?: string
  msg?: string
  token?: string
  userInfo?: object
}

// 登录
export function Login(data, showLoading: boolean = false) {
  return request<LoginData>({
    method: 'post',
    url: `${module}login`,
    data,
    showLoading
  })
}
