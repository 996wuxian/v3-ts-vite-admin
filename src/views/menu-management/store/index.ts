import { ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { arrayToTree } from '@/utils/tools'
import { cloneDeep } from 'lodash'

import { QueryMenu, CreateMenu } from '@/api/menu'
import { ElLoading, ElMessage } from 'element-plus'

const currentPage = ref(1)
const pageSize = ref(72)

const currentChange = (val: number) => {
  currentPage.value = val
}

const queryMenu = async () => {
  const loading = ElLoading.service({ fullscreen: true, text: '加载中...' })
  const { code, data } = await QueryMenu().finally(() => loading.close())
  if (code !== 200) return
  treeData.value = data
}

const treeData = ref([])

// task
const taskVisible = ref(false)
const form = ref<Menu>()
const $form = ref()

const taskOpen = (row = {} as Menu) => {
  form.value = {
    ...row,
    hidden: Boolean(Number(row.hidden)),
    parentMenuId: Number(row.parentMenuId)
  }
  taskVisible.value = true
}

const menuFilter = computed(() => {
  return arrayToTree<any>(
    cloneDeep(treeData.value.filter((item) => item.menuId !== form.value.menuId)),
    'menuId',
    'parentMenuId',
    'childWebMenu'
  )
})

// 图标
const iconsData = ref([])
for (const item in ElementPlusIconsVue) {
  iconsData.value.push(item)
}

const iconChoose = (item) => {
  form.value.icon = item
}

interface Menu {
  menuId: number
  title: string
  path: string
  name: string
  component: string
  redirect: string
  parentMenuId: number
  icon: string
  hidden: boolean
  children: Menu[]
  createdAt: string
  updatedAt: string
}

const createMenu = async () => {
  await $form.value.validate()
  form.value.parentMenuId = Number(form.value.parentMenuId?.toString()) || 0
  delete form.value.children
  delete form.value.createdAt
  delete form.value.updatedAt
  delete (form.value as any)._X_ROW_CHILD
  delete (form.value as any)._X_ROW_KEY
  const { code } = await CreateMenu(form.value)
  if (code !== 200) return
  ElMessage({
    type: 'success',
    message: '保存成功'
  })
  taskVisible.value = false
  queryMenu()
}

export const useMenuManagementStore = () => {
  return {
    queryMenu,
    taskOpen,
    $form,
    form,
    taskVisible,
    iconsData,
    currentPage,
    pageSize,
    currentChange,
    treeData,
    menuFilter,
    iconChoose,
    createMenu
  }
}
