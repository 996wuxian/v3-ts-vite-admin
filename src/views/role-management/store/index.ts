import { ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { arrayToTree, treeToArray } from '@/utils/tools'
import { cloneDeep } from 'lodash'

import { QueryRoles, QueryUserMenu } from '@/api/user'
import { QueryMenu } from '@/api/menu'
import { ElLoading } from 'element-plus'
import { VxeTableEvents } from 'vxe-table'

// const queryForm = ref({
//   Page: 1,
//   PageSize: 10
// })

const iconsData = ref([])
for (const item in ElementPlusIconsVue) {
  iconsData.value.push(item)
}

const tableData = ref([])
const queryUserMenu: VxeTableEvents.CellClick = async ({ row }) => {
  const { code, data } = await QueryUserMenu(row.id)
  if (code !== 200) return

  const treeToArrayData = treeToArray(data, 'children')

  userTreeData.value = arrayToTreeFun(
    treeToArrayData.sort((a, b) => (a as any).menuId - (b as any).menuId)
  )
  checkedMenus.value = []
  getCheckedMenus(userTreeData.value)
}

const $tree = ref()
const treeData = ref([])
const userTreeData = ref([])

const queryData = async () => {
  const loading = ElLoading.service({ fullscreen: true, text: '加载中...' })
  const res = await Promise.all([QueryRoles(), QueryMenu()]).finally(() => loading.close())
  if (res.some((item) => item.code !== 200)) return
  tableData.value = res[0].data
  treeData.value = res[1].data

  queryUserMenu({ row: tableData.value[0] } as any)
}

const menuFilter = computed(() => {
  return arrayToTreeFun(treeData.value)
})

const arrayToTreeFun = (data) => {
  return arrayToTree<any>(
    cloneDeep(data.filter((item) => item.menuId !== form.value.menuId)),
    'menuId',
    'parentMenuId',
    'childWebMenu'
  )
}

const checkedMenus = ref([])

const getCheckedMenus = async (menus) => {
  for (const item of menus) {
    if (treeData.value.some((_item) => _item.menuId === item.menuId)) {
      checkedMenus.value.push(item.menuId)
    }

    if (item.childWebMenu && item.childWebMenu.length > 0) {
      getCheckedMenus(item.childWebMenu)
    }
  }
  checkedMenus.value = Array.from(new Set(checkedMenus.value))
  $tree.value.setCheckedKeys(checkedMenus.value, true)
}

const handleCheckChange = (data, checked) => {
  if (data.childWebMenu.length > 0) {
    data.childWebMenu.forEach((childNode) => {
      $tree.value.setChecked(childNode.menuId, checked)
    })
  }
}

const taskVisible = ref(false)
const $form = ref<any>([])
const form = ref<any>([])

const taskOpen = (row) => {
  console.log(row, 'row')
  form.value = {
    ...row
  }
  taskVisible.value = true
}

export const useRoleManagementStore = () => {
  return {
    queryData,
    taskOpen,
    $form,
    form,
    taskVisible,
    iconsData,
    tableData,
    queryUserMenu,
    $tree,
    treeData,
    menuFilter,
    checkedMenus,
    handleCheckChange
  }
}
