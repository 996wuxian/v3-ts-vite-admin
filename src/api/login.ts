import request from '@/utils/request'

const module = '/user/'

// 获取验证码
export function QueryCode(showLoading: boolean = false) {
  return request<string | null>({
    method: 'get',
    url: `${module}code`,
    showLoading
  })
}

// 获取邮箱验证码
export function QueryEmailCode(params, showLoading: boolean = false) {
  return request<string | null>({
    method: 'get',
    url: `${module}emailCode`,
    params,
    showLoading
  })
}

// 获取二维码图片
export function QueryQrCode(showLoading: boolean = false) {
  return request<string | null>({
    method: 'get',
    url: `${module}qrCode`,
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
