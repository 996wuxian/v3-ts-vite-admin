import request from '@/utils/request'

const module = '/user/'

interface ResponseData {
  totalCount?: string
  data?: Array<RowVO>
  code?: number
}

interface RowVO {
  id?: number
  name?: string
  age?: number
  gender?: string
  height?: string
  weight?: string
}

// 获取所有人员
export function QueryAll(params, showLoading: boolean = false) {
  return request<ResponseData>({
    method: 'get',
    url: module,
    params,
    showLoading
  })
}

// 新增
export function CreatePerson(data: RowVO, showLoading: boolean = false) {
  return request({
    method: 'post',
    url: module,
    data,
    showLoading
  })
}
// 修改
export function UpdatePerson(data, showLoading: boolean = false) {
  return request({
    method: 'patch',
    url: `${module}${data.id}`,
    data,
    showLoading
  })
}
// 删除
export function RemovePerson(data, showLoading: boolean = false) {
  return request({
    method: 'delete',
    url: `${module}${data.id}`,
    showLoading
  })
}
// 添加tag
export function addTag(data, showLoading: boolean = false) {
  return request({
    method: 'post',
    url: `${module}addTag`,
    data,
    showLoading
  })
}
// 添加人员信息
export function addUseInfo(data, showLoading: boolean = false) {
  return request({
    method: 'post',
    url: `${module}addUser`,
    data,
    showLoading
  })
}
