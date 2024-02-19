import request from '@/utils/request'

const module = '/upload/'

// 上传图片和视频
export function Upload(data, showLoading: boolean = false) {
  return request<string | null>({
    method: 'post',
    url: module,
    showLoading,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 添加
export function AddFile(data, showLoading: boolean = false) {
  return request<string | null>({
    method: 'post',
    url: `${module}addFile`,
    showLoading,
    data
  })
}

// 查询所有
export function FindAll(showLoading: boolean = false) {
  return request<any[]>({
    method: 'get',
    url: module,
    showLoading
  })
}

// 查询文件
export function FindOne(params, showLoading: boolean = false) {
  return request<any>({
    method: 'get',
    url: `${module}${params}`,
    showLoading
  })
}

// 删除
export function DeleteFile(params, showLoading: boolean = false) {
  return request({
    method: 'delete',
    url: `${module}${params}`,
    showLoading
  })
}

// 导出
export function download(params, showLoading: boolean = false) {
  return request<any>({
    method: 'get',
    url: `${module}download/${params}`,
    showLoading
  })
}

// 上传文件
export function Album(data, showLoading: boolean = false) {
  return request<string | null>({
    method: 'post',
    url: `${module}album`,
    showLoading,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

interface response {
  code: number
  data: object
  message: string
}

// 直接下载
export function Export(showLoading: boolean = false) {
  return request<response>({
    method: 'get',
    url: `${module}export`,
    showLoading
  })
}

// 流方式下载
export function Stream(showLoading: boolean = false) {
  return request({
    method: 'get',
    url: `${module}stream`,
    showLoading
  })
}
