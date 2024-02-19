import request from '@/utils/request'

const module = '/auth/'

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

// 获取验证码
export function QueryCode(showLoading: boolean = false) {
  return request<string | null>({
    method: 'get',
    url: `${module}code`,
    showLoading
  })
}
